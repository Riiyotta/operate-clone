#!/usr/bin/env python3
"""Semantic validator for Operate PageSpecs.

Layer 1 (schema): Draft-07 validation against schema/pagespec.schema.json.
Layer 2 (semantic): everything JSON Schema cannot express -
  * the PageSpec's declared `template` is cross-referenced against that template's real node list
    (templates/templates.json): required nodes present, no sections outside the template, variants
    allowed per node, route belongs to the template;
  * rhythm/position rules from compatibility/graph.json (read at run time, severity respected);
  * per-instance word/character budgets (x-maxWords / x-maxChars) from each section contract;
  * assetRole/assetRef registry checks against assets/asset-roles.json;
  * required reducedMotionFallback on every node; legal block shape.

Usage: python3 schema/semantic_validate.py [pagespec.json ...]   (default: schema/example.pagespec.json)
"""
import json, os, sys, glob

# repo root = parent of schema/ (never hardcoded)
REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def _load(repo, rel):
    with open(os.path.join(repo, rel), encoding="utf-8") as f:
        return json.load(f)


def load_context(repo=REPO):
    sections = {}
    for p in sorted(glob.glob(os.path.join(repo, "sections", "*.json"))):
        d = json.load(open(p, encoding="utf-8"))
        sections[d["id"]] = d
    return {"templates": _load(repo, "templates/templates.json"), "graph": _load(repo, "compatibility/graph.json"),
            "assets": _load(repo, "assets/asset-roles.json"), "schema": _load(repo, "schema/pagespec.schema.json"), "sections": sections}


# ---------------------------------------------------------------- layer 1
def schema_errors(spec, ctx):
    from jsonschema import Draft7Validator
    v = Draft7Validator(ctx["schema"])
    out = []
    for e in sorted(v.iter_errors(spec), key=lambda e: list(map(str, e.absolute_path))):
        out.append("[schema] /%s: %s" % ("/".join(map(str, e.absolute_path)), e.message[:200]))
    return out


# ---------------------------------------------------------------- budgets
def _wc(s):
    return len(s.split())


def walk_budgets(schema, inst, path, errs):
    """Parallel walk of a content schema and an instance, enforcing x-maxWords / x-maxChars."""
    if not isinstance(schema, dict):
        return
    if isinstance(inst, str):
        if "x-maxWords" in schema and _wc(inst) > schema["x-maxWords"]:
            errs.append("[semantic] %s: %d words exceeds maxWords %d" % (path, _wc(inst), schema["x-maxWords"]))
        if "x-maxChars" in schema and len(inst) > schema["x-maxChars"]:
            errs.append("[semantic] %s: %d chars exceeds maxChars %d" % (path, len(inst), schema["x-maxChars"]))
    elif isinstance(inst, dict):
        for k, v in inst.items():
            sub = schema.get("properties", {}).get(k)
            if sub is not None:
                walk_budgets(sub, v, "%s/%s" % (path, k), errs)
    elif isinstance(inst, list):
        items = schema.get("items")
        for i, v in enumerate(inst):
            if isinstance(items, list):
                if i < len(items):
                    walk_budgets(items[i], v, "%s/%d" % (path, i), errs)
            elif items is not None:
                walk_budgets(items, v, "%s/%d" % (path, i), errs)


def find_assets(inst, path=""):
    if isinstance(inst, dict):
        if "assetRole" in inst and "assetRef" in inst:
            yield path, inst
        for k, v in inst.items():
            yield from find_assets(v, "%s/%s" % (path, k))
    elif isinstance(inst, list):
        for i, v in enumerate(inst):
            yield from find_assets(v, "%s/%d" % (path, i))


# ---------------------------------------------------------------- graph rules
RULES = {}


def rule(rid):
    def deco(fn):
        RULES[rid] = fn
        return fn
    return deco


def _secs(nodes):
    return [n.get("section") for n in nodes]


def _idx(nodes, sec):
    s = _secs(nodes)
    return s.index(sec) if sec in s else None


@rule("ONE_PER_PAGE")
def r_one(ctx, spec, nodes, p):
    out = []
    for sid in sorted(set(_secs(nodes))):
        c = ctx["sections"].get(sid, {}).get("constraints", {})
        if c.get("onePerPage") and _secs(nodes).count(sid) > 1:
            out.append("%s appears %d times but is onePerPage" % (sid, _secs(nodes).count(sid)))
    return out


@rule("TEMPLATE_ORDER")
def r_order(ctx, spec, nodes, p):
    t = ctx["templates"]["templates"].get(spec.get("template"))
    if not t:
        return []
    order = [n["section"] for n in t["nodes"]]
    last, out = -1, []
    for s in _secs(nodes):
        if s not in order:
            continue
        i = order.index(s)
        if i < last:
            out.append("%s is out of the declared template order" % s)
        last = max(last, i)
    return out


@rule("MUST_BE_FIRST")
def r_first(ctx, spec, nodes, p):
    out = []
    for sid, s in ctx["sections"].items():
        if s.get("constraints", {}).get("mustBeFirst") and sid in _secs(nodes) and _secs(nodes)[0] != sid:
            out.append("%s must be the first node" % sid)
    return out


@rule("SECTION_ALLOWED_TEMPLATES")
def r_allowed(ctx, spec, nodes, p):
    out = []
    for sid in _secs(nodes):
        a = ctx["sections"].get(sid, {}).get("constraints", {}).get("allowedTemplates")
        if a is not None and spec.get("template") not in a:
            out.append("%s is not allowed on %s (allowed: %s)" % (sid, spec.get("template"), ", ".join(a)))
    return out


@rule("MAIN_SHEET_CONTAINS_PAGE_SECTIONS")
def r_main(ctx, spec, nodes, p):
    out = []
    c = _idx(nodes, p["container"]); b = _idx(nodes, p["before"])
    for sec in p["contained"]:
        i = _idx(nodes, sec)
        if i is None:
            continue
        if c is None or i < c:
            out.append("%s must follow %s" % (sec, p["container"]))
        if b is not None and i > b:
            out.append("%s must precede %s" % (sec, p["before"]))
    return out


@rule("OVERLAYS_AFTER_FOOTER")
def r_overlays(ctx, spec, nodes, p):
    if spec.get("template") != p["template"]:
        return []
    a = _idx(nodes, p["after"])
    out = []
    for sec in p["overlays"]:
        i = _idx(nodes, sec)
        if i is not None and a is not None and i < a:
            out.append("%s must come after %s" % (sec, p["after"]))
    return out


@rule("FORM_NEEDS_MODAL_ON_HOME")
def r_formmodal(ctx, spec, nodes, p):
    if spec.get("template") == p["template"] and _idx(nodes, p["form"]) is not None and _idx(nodes, p["requires"]) is None:
        return ["%s on %s requires %s" % (p["form"], p["template"], p["requires"])]
    return []


@rule("LEAVE_CONFIRM_NEEDS_FORM")
def r_leave(ctx, spec, nodes, p):
    if _idx(nodes, p["dialog"]) is not None and _idx(nodes, p["requires"]) is None:
        return ["%s requires %s" % (p["dialog"], p["requires"])]
    return []


@rule("FORM_VARIANT_MATCHES_HOST")
def r_formvar(ctx, spec, nodes, p):
    want = p["variantByTemplate"].get(spec.get("template"))
    out = []
    for n in nodes:
        if n.get("section") == p["section"] and want and n.get("variant") != want:
            out.append("%s must use variant '%s' on %s" % (p["section"], want, spec.get("template")))
    return out


@rule("ONE_HERO")
def r_hero(ctx, spec, nodes, p):
    heroes = [s for s in _secs(nodes) if isinstance(s, str) and s.startswith(p["heroPrefix"])]
    out = []
    if len(heroes) > 1:
        out.append("more than one hero section: %s" % ", ".join(heroes))
    if heroes and spec.get("template") in p["exemptTemplates"]:
        out.append("%s is a hero-less template but has %s" % (spec.get("template"), heroes[0]))
    return out


@rule("FORM_PAIRED_WITH_LEAVE_CONFIRM")
def r_pair(ctx, spec, nodes, p):
    if _idx(nodes, p["form"]) is not None and _idx(nodes, p["dialog"]) is None:
        return ["%s present without %s" % (p["form"], p["dialog"])]
    return []


# ---------------------------------------------------------------- layer 2
def semantic(spec, ctx):
    errs, warns = [], []
    tid = spec.get("template")
    t = ctx["templates"]["templates"].get(tid)
    nodes = [n for n in spec.get("nodes", []) if isinstance(n, dict)]
    if not t:
        return ["[semantic] unknown template %r" % tid], warns
    # route <-> template
    if spec.get("route") not in t["routes"]:
        errs.append("[semantic] route %r does not belong to %s (routes: %s)" % (spec.get("route"), tid, ", ".join(t["routes"])))
    # cross-reference nodes against the template's real node list
    tn = {n["section"]: n for n in t["nodes"]}
    present = _secs(nodes)
    for n in nodes:
        sec = n.get("section")
        if sec not in tn:
            errs.append("[semantic] section %s is not in %s's node list" % (sec, tid))
            continue
        if n.get("variant") not in tn[sec]["variants"]:
            errs.append("[semantic] %s variant %r not allowed by %s (allowed: %s)" % (sec, n.get("variant"), tid, ", ".join(tn[sec]["variants"])))
        if present.count(sec) > 1 and not tn[sec]["repeatable"]:
            errs.append("[semantic] %s is not repeatable in %s but appears %d times" % (sec, tid, present.count(sec)))
    for tnode in t["nodes"]:
        if tnode["required"] and tnode["section"] not in present:
            errs.append("[semantic] required section %s (slot %s) missing for %s" % (tnode["section"], tnode["slot"], tid))
    # graph rules (severity from the graph)
    for r in ctx["graph"]["rules"]:
        fn = RULES.get(r["id"])
        if fn is None:
            errs.append("[semantic] graph rule %s has no implementation" % r["id"])
            continue
        for m in fn(ctx, spec, nodes, r.get("params", {})):
            (errs if r["severity"] == "error" else warns).append("[%s] %s: %s" % ("semantic" if r["severity"] == "error" else "warn", r["id"], m))
    # per node: motion fallback, budgets, assets, legal blocks
    reg = ctx["assets"]["registeredAssets"]; roles = ctx["assets"]["roles"]
    for i, n in enumerate(nodes):
        sec = n.get("section"); contract = ctx["sections"].get(sec)
        base = "/nodes/%d(%s)" % (i, sec)
        mo = n.get("motion")
        if not isinstance(mo, dict) or not mo.get("reducedMotionFallback"):
            errs.append("[semantic] %s: motion.reducedMotionFallback is required" % base)
        if not contract:
            continue
        walk_budgets(contract["content"], n.get("content", {}), base + "/content", errs)
        for ap, a in find_assets(n.get("content", {}), base + "/content"):
            r = reg.get(a["assetRef"])
            if r is None:
                errs.append("[semantic] %s: assetRef %r is not registered in assets/asset-roles.json" % (ap, a["assetRef"]))
            elif r["role"] != a["assetRole"]:
                errs.append("[semantic] %s: assetRef %r is registered as role %r, not %r" % (ap, a["assetRef"], r["role"], a["assetRole"]))
            elif sec not in roles[a["assetRole"]]["usedBy"]:
                errs.append("[semantic] %s: role %s is not used by section %s" % (ap, a["assetRole"], sec))
        if sec == "legal.document-body":
            lim = contract["blockCharLimits"]
            for j, b in enumerate(n.get("content", {}).get("blocks", [])):
                typ = b.get("type"); bp = "%s/content/blocks/%d" % (base, j)
                if typ in ("h2", "h3", "p"):
                    if "text" not in b or "items" in b:
                        errs.append("[semantic] %s: %s needs text and no items" % (bp, typ))
                    elif len(b["text"]) > lim[typ]:
                        errs.append("[semantic] %s: %s text %d chars exceeds %d" % (bp, typ, len(b["text"]), lim[typ]))
                elif typ in ("ul", "ol"):
                    if "items" not in b or "text" in b:
                        errs.append("[semantic] %s: %s needs items and no text" % (bp, typ))
                    else:
                        for k, it in enumerate(b["items"]):
                            if len(it) > lim["li"]:
                                errs.append("[semantic] %s/items/%d: %d chars exceeds %d" % (bp, k, len(it), lim["li"]))
                elif typ == "hr" and ("text" in b or "items" in b):
                    errs.append("[semantic] %s: hr takes neither text nor items" % bp)
    walk_budgets(ctx["schema"]["properties"]["head"], spec.get("head", {}), "/head", errs)
    return errs, warns


def validate(spec, repo=REPO, ctx=None):
    """returns (errors, warnings); errors empty == valid."""
    ctx = ctx or load_context(repo)
    errs = schema_errors(spec, ctx)
    if errs:
        return errs, []
    return semantic(spec, ctx)


def main(argv):
    paths = argv[1:] or [os.path.join(REPO, "schema", "example.pagespec.json")]
    rc = 0
    for p in paths:
        spec = json.load(open(p, encoding="utf-8"))
        e, w = validate(spec)
        print("%s: %d error(s), %d warning(s)" % (os.path.basename(p), len(e), len(w)))
        for m in e + w:
            print("  " + m)
        rc |= 1 if e else 0
    return rc


if __name__ == "__main__":
    sys.exit(main(sys.argv))
