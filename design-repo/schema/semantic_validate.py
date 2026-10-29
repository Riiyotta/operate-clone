#!/usr/bin/env python3
"""Semantic validator for Operate PageSpecs.

Layer 1 (schema): Draft-07 validation against schema/pagespec.schema.json.
Layer 2 (semantic): everything JSON Schema cannot express -
  * the PageSpec's declared `template` is cross-referenced against that template's real node list
    (templates/templates.json): required nodes present, no sections outside the template, variants
    allowed per node, repeat caps (constraints.maxPerPage), route belongs to the template;
  * rhythm/position rules from compatibility/graph.json (read at run time, severity respected);
  * per-instance word/character budgets (x-maxWords / x-maxChars) from each section contract;
  * assetRole/assetRef registry checks against assets/asset-roles.json;
  * required reducedMotionFallback on every node; legal block shape;
  * mode 'generation': six per-category rules GENERATION_MODE_BRAND / _INTEGRATION_LOGO / _PERSON / _SCREENSHOT /
    _COPY / _URL. Assets are judged by PINNED_AVAILABILITY below (pinned in code, cross-checked with the registry);
    text is matched against assets/generation-policy.json after normalisation (NFKC, zero-width removal, curly
    quotes/dashes to ASCII, case folding). Detection is string-based; see the policy's $description for its limits;
  * RETRIEVAL_ELIGIBILITY_PINNED: repository-level pin on the section contracts' retrievalEligible flag.

Usage: python3 schema/semantic_validate.py [pagespec.json ...]   (default: schema/example.pagespec.json)
"""
import json, os, re, sys, glob, unicodedata

# repo root = parent of schema/ (never hardcoded)
REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# ---------------------------------------------------------------- pins (independent of the registry files)
# Asset-role availability, pinned here AND in extraction/verify_all.py; verify_all checks the two tables and
# assets/asset-roles.json agree. A role is usable in mode 'generation' only when this table says generation-safe.
PINNED_AVAILABILITY = {
    "brand-logomark": "clone-only", "brand-logo-trace": "clone-only", "demo-scene-image": "clone-only",
    "footer-video-asset": "clone-only", "video-poster": "clone-only", "background-texture": "clone-only",
    "integration-logo": "blocked-for-generation", "demo-avatar-image": "blocked-for-generation",
    "lightbox-video-stream": "blocked-for-generation", "signup-submit-stub": "blocked-for-generation",
    "external-social-link": "blocked-for-generation", "font-file": "blocked-for-generation",
    "placeholder-brand-mark": "generation-safe", "placeholder-integration-glyph": "generation-safe",
    "fictional-avatar": "generation-safe", "placeholder-product-visual": "generation-safe",
    "generated-background-texture": "generation-safe", "placeholder-url": "generation-safe",
}
# Which generation-mode rule reports a role (real roles and the substitutes that stand in for them).
ROLE_LEAK_CATEGORY = {
    "brand-logomark": "BRAND", "brand-logo-trace": "BRAND", "placeholder-brand-mark": "BRAND",
    "integration-logo": "INTEGRATION_LOGO", "placeholder-integration-glyph": "INTEGRATION_LOGO",
    "demo-avatar-image": "PERSON", "fictional-avatar": "PERSON",
    "demo-scene-image": "SCREENSHOT", "video-poster": "SCREENSHOT", "footer-video-asset": "SCREENSHOT",
    "background-texture": "SCREENSHOT", "placeholder-product-visual": "SCREENSHOT", "generated-background-texture": "SCREENSHOT",
    "lightbox-video-stream": "URL", "signup-submit-stub": "URL", "external-social-link": "URL", "placeholder-url": "URL",
    "font-file": "BRAND",
}
GENERATION_CATEGORIES = ("BRAND", "INTEGRATION_LOGO", "PERSON", "SCREENSHOT", "COPY", "URL")
GENERATION_SAFE_REF_PREFIX = "placeholder--"
# Sections that are layout-only, runtime UI or a framework fallback: retrievalEligible must be false.
RETRIEVAL_INELIGIBLE_PINNED = ("backdrop.animated-background", "overlay.leave-confirm", "overlay.sign-up-modal",
                               "overlay.video-lightbox", "shell.binder-rails", "shell.main-sheet", "system.not-found")
RUNTIME_UI_RE = re.compile(r"overlay|modal|dialog|drawer|cookie|consent|popup|toast|lightbox|preloader|cursor|confirm")
SEMANTIC_CATEGORIES = ("BACKDROP", "CONTENT", "CONVERSION", "FEATURE", "HERO", "NAVIGATION", "OVERLAY", "SHELL", "SYSTEM")


def _load(repo, rel):
    with open(os.path.join(repo, rel), encoding="utf-8") as f:
        return json.load(f)


def load_context(repo=REPO):
    sections = {}
    for p in sorted(glob.glob(os.path.join(repo, "sections", "*.json"))):
        d = json.load(open(p, encoding="utf-8"))
        sections[d["id"]] = d
    policy = _load(repo, "assets/generation-policy.json")
    return {"templates": _load(repo, "templates/templates.json"), "graph": _load(repo, "compatibility/graph.json"),
            "assets": _load(repo, "assets/asset-roles.json"), "schema": _load(repo, "schema/pagespec.schema.json"), "sections": sections,
            "allowlist": _load(repo, "tokens/llm/component-allowlist.json"),
            "policy": policy, "cloneCorpus": _clone_corpus(repo, sections, policy), "_gen": {}}


# ---------------------------------------------------------------- generation-mode helpers
_ZW = dict.fromkeys(map(ord, "​‌‍⁠﻿­᠎"), None)
_ASCII = str.maketrans({"‘": "'", "’": "'", "‚": "'", "‛": "'", "′": "'", "´": "'", "`": "'",
                        "“": '"', "”": '"', "„": '"', "‟": '"', "″": '"', "«": '"', "»": '"',
                        "‐": "-", "‑": "-", "‒": "-", "–": "-", "—": "-", "―": "-", "−": "-"})


def _clean(s):  # keeps case and punctuation (for case-sensitive and URL matching)
    return unicodedata.normalize("NFKC", s).translate(_ZW).translate(_ASCII)


def _norm(s):
    """_clean + case folded, punctuation->space, whitespace collapsed."""
    return " ".join(re.sub(r"[^\w]+", " ", _clean(s).casefold()).split())


def _text_leaves(o, path=""):
    """(path, str) for every string in the instance except assetRole/assetRef values (checked separately)."""
    if isinstance(o, str):
        yield path, o
    elif isinstance(o, dict):
        for k, v in o.items():
            if k in ("assetRole", "assetRef"):
                continue
            yield from _text_leaves(v, "%s/%s" % (path, k))
    elif isinstance(o, list):
        for i, v in enumerate(o):
            yield from _text_leaves(v, "%s/%d" % (path, i))


def _clone_corpus(repo, sections, policy):
    """normalised source strings of >= minWords words, derived from the real clone copy (never hand-listed)."""
    n = policy["copyReuse"]["minWords"]
    allowed = {_norm(x) for x in policy["copyReuse"]["allowedCopy"]}
    srcs = [s["exemplar"]["content"] for s in sections.values()]
    ex = os.path.join(repo, "schema", "example.pagespec.json")
    if os.path.exists(ex):
        spec = json.load(open(ex, encoding="utf-8"))
        srcs += [spec.get("head", {}), [x.get("content", {}) for x in spec.get("nodes", [])]]
    srcs += [t.get("head", {}) for t in _load(repo, "templates/templates.json")["templates"].values()]
    out = set()
    for src in srcs:
        for _, s in _text_leaves(src):
            ns = _norm(s)
            if len(ns.split()) >= n and ns not in allowed:
                out.add(ns)
    return out


_URL_RES = [re.compile(r"(?:[a-z][a-z0-9+.-]*:)?//([^\s/?#\"'<>]+)", re.I),            # scheme:// and //host
            re.compile(r"\bmailto:([^\s\"'<>]+)", re.I),
            re.compile(r"[\w.+-]+@([\w-]+(?:\.[\w-]+)+)"),                            # e-mail
            re.compile(r"\b(www\.[\w.-]+)", re.I),
            re.compile(r"\b((?:[a-z0-9-]+\.)+(?:com|net|org|io|so|ai|co|app|dev|xyz|me|us|uk|de|fr|gg|tv|ly|sh|cloud|link)\b)", re.I)]


def _host_ok(host, pol):
    h = host.split("@")[-1].split(":")[0].strip(".").lower()
    u = pol["urls"]
    return any(h == x or h.endswith("." + x) for x in u["allowedHosts"]) or any(h.endswith(x) for x in u["allowedHostSuffixes"])


def _bad_hosts(s, pol):
    out = []
    for rx in _URL_RES:
        for m in rx.finditer(s):
            if not _host_ok(m.group(1), pol):
                out.append(m.group(1))
    return sorted(set(out))


def _term_hits(raw, pol):
    """[(category, term)] for every blocked term found in raw (after normalisation)."""
    hits = []
    clean, folded = _clean(raw), _norm(raw)
    for grp in pol["blockedTerms"].values():
        for t in grp["terms"]:
            term, mode = t["term"], t["match"]
            if mode == "not-lowercase":
                for m in re.finditer(r"(?<!\w)%s(?!\w)" % re.escape(term), clean, re.I):
                    if m.group(0) != m.group(0).lower():
                        hits.append((grp["category"], term)); break
            elif re.search(r"(?<!\w)%s(?!\w)" % re.escape(_norm(term)), folded):
                hits.append((grp["category"], term))
    return hits


def _source_host(host, pol):
    h = host.split("@")[-1].split(":")[0].strip(".").lower()
    for x in pol["blockedHosts"]["hosts"]:
        if h == x["host"] or h.endswith("." + x["host"]):
            return x["host"]
    return None


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


def _asset_generation_problem(ctx, a):
    """None if the asset may be used in mode 'generation', else (category, reason). The pin decides first."""
    roles, reg = ctx["assets"]["roles"], ctx["assets"]["registeredAssets"]
    role, ref = a.get("assetRole"), a.get("assetRef")
    cat = ROLE_LEAK_CATEGORY.get(role, "BRAND")
    pinned = PINNED_AVAILABILITY.get(role)
    if pinned is None:
        return cat, "role %r has no pinned availability in schema/semantic_validate.py" % role
    if pinned != "generation-safe":
        return cat, "role %r is pinned %s" % (role, pinned)
    r, x = roles.get(role, {}), reg.get(ref)
    if r.get("availability") != pinned:
        return cat, "role %r is pinned generation-safe but the registry says %r (registry and pin disagree)" % (role, r.get("availability"))
    if x is None:
        return None  # unregistered refs are reported by the registry check
    if x.get("generationUse") != "generation-safe" or not ref.startswith(GENERATION_SAFE_REF_PREFIX):
        return cat, "asset %r is not a generation-safe placeholder (generationUse %r)" % (ref, x.get("generationUse"))
    if x.get("role") in PINNED_AVAILABILITY and PINNED_AVAILABILITY[x["role"]] != "generation-safe":
        return ROLE_LEAK_CATEGORY.get(x["role"], cat), "asset %r is registered under %s role %r" % (ref, PINNED_AVAILABILITY[x["role"]], x["role"])
    return None


def generation_findings(ctx, spec):
    """{category: [message]} for a mode 'generation' PageSpec (memoised per spec object)."""
    key = id(spec)
    if key in ctx["_gen"] and ctx["_gen"][key][0] is spec:
        return ctx["_gen"][key][1]
    pol, out = ctx["policy"], {c: [] for c in GENERATION_CATEGORIES}
    nodes = [n for n in spec.get("nodes", []) if isinstance(n, dict)]
    for i, n in enumerate(nodes):
        base = "/nodes/%d(%s)" % (i, n.get("section"))
        for ap, a in find_assets(n.get("content", {}), base + "/content"):
            prob = _asset_generation_problem(ctx, a)
            if prob:
                out[prob[0]].append("%s: asset %r (role %s) may not be used in mode 'generation': %s; use a generation-safe substitute role (assets/asset-roles.json generationSafeSubstitutes)" % (ap, a.get("assetRef"), a.get("assetRole"), prob[1]))
    leaves = list(_text_leaves(spec.get("head", {}), "/head")) + [lf for i, n in enumerate(nodes) for lf in _text_leaves(n.get("content", {}), "/nodes/%d(%s)/content" % (i, n.get("section")))]
    for path, s in leaves:
        for cat, term in _term_hits(s, pol):
            out[cat].append("%s: blocked source term %r in mode 'generation'" % (path, term))
        for host in _bad_hosts(_clean(s), pol):
            src = _source_host(host, pol)
            out["URL"].append("%s: %s %r (use a relative path or a reserved .invalid/.test/example.* host)" % (path, "source host" if src else "real or non-placeholder URL/host", host))
        ns = _norm(s)
        if len(ns.split()) >= pol["copyReuse"]["minWords"]:
            for c in ctx["cloneCorpus"]:
                if c in ns or ns in c:
                    out["COPY"].append("%s: reuses source-specific Operate copy (%r...) in mode 'generation'" % (path, c[:48]))
                    break
    ctx["_gen"][key] = (spec, out)
    return out


def _generation_rule(category):
    def fn(ctx, spec, nodes, p):
        if spec.get("mode") != p["mode"] or p.get("category") != category:
            return [] if spec.get("mode") != p["mode"] else ["graph params category %r does not match rule category %s" % (p.get("category"), category)]
        return generation_findings(ctx, spec)[category]
    return fn


for _c in GENERATION_CATEGORIES:
    RULES["GENERATION_MODE_" + _c] = _generation_rule(_c)


@rule("RETRIEVAL_ELIGIBILITY_PINNED")
def r_retrieval(ctx, spec, nodes, p):
    out, allow = [], ctx.get("allowlist", {})
    for sid, c in sorted(ctx["sections"].items()):
        elig, reason = c.get("retrievalEligible"), c.get("retrievalIneligibleReason")
        pinned, runtime_ui = sid in RETRIEVAL_INELIGIBLE_PINNED, bool(RUNTIME_UI_RE.search(sid))
        if not isinstance(elig, bool):
            out.append("%s: retrievalEligible must be a closed boolean, got %r" % (sid, elig)); continue
        if (pinned or runtime_ui) and elig is not False:
            out.append("%s is runtime UI or layout-only and must be retrievalEligible false" % sid)
        if runtime_ui and not pinned:
            out.append("%s looks like runtime UI but is not in RETRIEVAL_INELIGIBLE_PINNED of schema/semantic_validate.py" % sid)
        if elig is False and not pinned:
            out.append("%s is retrievalEligible false but not pinned; false is reserved for runtime UI and layout-only sections" % sid)
        if elig is False and (not isinstance(reason, str) or len(reason.strip()) < 30):
            out.append("%s: retrievalEligible false needs a reason of at least 30 characters" % sid)
        if elig is True and reason is not None:
            out.append("%s: retrievalIneligibleReason is only allowed when retrievalEligible is false" % sid)
    for sid in RETRIEVAL_INELIGIBLE_PINNED:
        if sid not in ctx["sections"]:
            out.append("pinned retrieval-ineligible section %s has no contract" % sid)
    if sorted(allow.get("retrievalIneligibleSections", [])) != sorted(RETRIEVAL_INELIGIBLE_PINNED):
        out.append("allowlist retrievalIneligibleSections %s != pinned %s" % (allow.get("retrievalIneligibleSections"), sorted(RETRIEVAL_INELIGIBLE_PINNED)))
    return out


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
    for sec in sorted(set(s for s in present if s in tn)):
        cap = ctx["sections"].get(sec, {}).get("constraints", {}).get("maxPerPage")
        if isinstance(cap, int) and present.count(sec) > cap:
            errs.append("[semantic] %s appears %d times, more than its maxPerPage %d" % (sec, present.count(sec), cap))
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
        if sec in ("legal.document-preamble", "legal.document-section"):
            lim = contract["blockCharLimits"]
            for j, b in enumerate(n.get("content", {}).get("blocks", [])):
                typ = b.get("type"); bp = "%s/content/blocks/%d" % (base, j)
                if typ in ("h3", "p"):
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
