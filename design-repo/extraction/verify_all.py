#!/usr/bin/env python3
"""One-shot verification of the Operate design-repo.

Checks: self-containment (no absolute paths, entryPoints inside the repo), JSON well-formedness, Draft-07 schema
validity + examples (0 errors), schema/section sync, closed motion/objects, allowlist parity (both directions),
template <-> route <-> section coverage (+ ia.json when a source tree is present), graph-rule implementation parity,
token reference integrity + catalog/policy/theme drift, asset roles (PINNED_POLICIES, PINNED_AVAILABILITY cross-checked
with the registry and with schema/semantic_validate.py, generationSafeSubstitutes wired into every section field),
generation mode (six per-category rules, one generation-safe example per template family, an independent text scan,
a behavioural probe per category), section contracts (closed schema, source/semantic split, retrievalEligible pin),
the whole-page-wrapper gate (extraction/wrapper_gate.py, measured heights), manifest counts/versions recomputed from
disk, README/CHANGELOG count markers, and - when the source tree is present - citation validity, quote spot-checks,
section source ranges (tag + anchor re-read) and generation-policy evidence lines.

Usage:  python3 extraction/verify_all.py [--source-root DIR]
        (source root also from env DESIGN_REPO_SOURCE_ROOT; default: the folder containing design-repo/, if it
         looks like the source project). Exit code 0 == all hard checks passed.
Drift proofs (scratch-copy mutation tests): python3 extraction/prove_drift.py --scratch DIR
"""
import copy, glob, json, os, re, sys
from urllib.parse import urlparse

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(HERE)  # extraction/ -> repo root (never hardcoded)
sys.path.insert(0, os.path.join(REPO, "schema"))
sys.path.insert(0, HERE)
sys.dont_write_bytecode = True

PINNED_POLICIES = {  # compliance-critical roles pinned to ONE exact generationPolicy (not just enum membership)
    "brand-logomark": "must-reuse-exact", "brand-logo-trace": "must-reuse-exact",
    "integration-logo": "must-not-fabricate", "demo-avatar-image": "must-not-fabricate", "demo-scene-image": "must-not-fabricate",
    "footer-video-asset": "must-not-fabricate", "video-poster": "must-not-fabricate", "font-file": "must-not-fabricate",
    "lightbox-video-stream": "must-not-reuse-live-endpoint", "signup-submit-stub": "must-not-reuse-live-endpoint", "external-social-link": "must-not-reuse-live-endpoint",
    "placeholder-brand-mark": "generation-safe-placeholder", "placeholder-integration-glyph": "generation-safe-placeholder", "fictional-avatar": "generation-safe-placeholder",
    "placeholder-product-visual": "generation-safe-placeholder", "generated-background-texture": "generation-safe-placeholder", "placeholder-url": "generation-safe-placeholder",
}
# Asset-role availability, pinned here independently of assets/asset-roles.json AND of schema/semantic_validate.py
# (both are compared against this table). A real logo/wordmark is never generation-safe.
AVAILABILITY_ENUM = ["clone-only", "generation-safe", "blocked-for-generation"]
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
GENERATION_CATEGORIES = ["BRAND", "INTEGRATION_LOGO", "PERSON", "SCREENSHOT", "COPY", "URL"]
# Section contracts that must be retrievalEligible false (runtime UI, layout-only chrome, framework fallback).
RETRIEVAL_PINNED = ["backdrop.animated-background", "overlay.leave-confirm", "overlay.sign-up-modal", "overlay.video-lightbox",
                    "shell.binder-rails", "shell.main-sheet", "system.not-found"]
RUNTIME_UI_RE = re.compile(r"overlay|modal|dialog|drawer|cookie|consent|popup|toast|lightbox|preloader|cursor|confirm")
SEMANTIC_CATEGORIES = ["BACKDROP", "CONTENT", "CONVERSION", "FEATURE", "HERO", "NAVIGATION", "OVERLAY", "SHELL", "SYSTEM"]


def _gnode(s, sec):
    return next(n for n in s["nodes"] if n["section"] == sec)["content"]


def _p_brand(s): _gnode(s, "shell.nav-sheet")["logoMark"] = {"assetRole": "brand-logomark", "assetRef": "logo--mark"}
def _p_logo(s): _gnode(s, "hero.headline-integrations")["integrationLogos"][1] = {"assetRole": "integration-logo", "assetRef": "integration--slack"}
def _p_person(s): _gnode(s, "product.demo")["people"][0] = {"assetRole": "demo-avatar-image", "assetRef": "avatar--demo-1"}
def _p_shot(s): _gnode(s, "overlay.video-lightbox")["poster"] = {"assetRole": "video-poster", "assetRef": "poster--lightbox"}
def _p_copy(s): _gnode(s, "hero.headline-integrations")["headline"] = "Collaborative AI for frontier sales organizations"
def _p_url(s): s["head"]["description"] = "A fictional page. Original at https://operate.so/sign-up for reference."
GENERATION_PROBES = [("BRAND", _p_brand), ("INTEGRATION_LOGO", _p_logo), ("PERSON", _p_person), ("SCREENSHOT", _p_shot), ("COPY", _p_copy), ("URL", _p_url)]


def _reserved(url, pol):
    h = (urlparse(url).hostname or "").lower()
    u = pol["urls"]
    return any(h == x or h.endswith("." + x) for x in u["allowedHosts"]) or h.endswith(tuple(u["allowedHostSuffixes"]))
CIT = re.compile(r"([A-Za-z0-9_./\-]+\.(?:md|jsx|js|cjs|css|json|mjs|html)):(\d+)(?:-(\d+))?")

ABS1, ABS2 = "/Us" + "ers/", "/priv" + "ate/tmp"  # built at run time so this file itself holds no absolute path
PASSES, FAILS, WARNS = [], [], []


def ok(msg): PASSES.append(msg); print("PASS  " + msg)
def bad(msg): FAILS.append(msg); print("FAIL  " + msg)
def warn(msg): WARNS.append(msg); print("WARN  " + msg)
def check(cond, msg, detail=""):
    (ok if cond else bad)(msg + ("" if cond or not detail else " :: " + detail))


def J(rel):
    with open(os.path.join(REPO, rel), encoding="utf-8") as f:
        return json.load(f)


def all_files():
    out = []
    for root, _, files in os.walk(REPO):
        for f in files:
            out.append(os.path.join(root, f))
    return sorted(out)


def leaves(o, prefix=""):
    if isinstance(o, dict):
        if "$value" in o:
            yield prefix, o
        else:
            for k, v in o.items():
                yield from leaves(v, prefix + "." + k if prefix else k)


def strings(o):
    if isinstance(o, str): yield o
    elif isinstance(o, dict):
        for v in o.values(): yield from strings(v)
    elif isinstance(o, list):
        for v in o: yield from strings(v)


def source_root(argv):
    cand = None
    if "--source-root" in argv:
        cand = argv[argv.index("--source-root") + 1]
    cand = cand or os.environ.get("DESIGN_REPO_SOURCE_ROOT") or os.path.dirname(REPO)
    return cand if os.path.isfile(os.path.join(cand, "CLONE_SPEC.md")) or os.path.isfile(os.path.join(cand, "ia.json")) else None


def main(argv):
    files = all_files()
    rel = lambda p: os.path.relpath(p, REPO)
    # ---- self-containment
    hits = []
    for p in files:
        if os.path.basename(p) == ".DS_Store":
            hits.append(rel(p)); continue
        try: txt = open(p, encoding="utf-8").read()
        except UnicodeDecodeError: continue
        if ABS1 in txt or ABS2 in txt: hits.append(rel(p))
    check(not hits, "no absolute local paths or .DS_Store in the repo", ", ".join(hits))
    jsons = {}
    for p in files:
        if p.endswith(".json"):
            try: jsons[rel(p)] = json.load(open(p, encoding="utf-8"))
            except Exception as e: bad("invalid JSON %s: %s" % (rel(p), e))
    ok("%d JSON files parse" % len(jsons))
    man = J("registry.manifest.json")
    ep = man.get("entryPoints", {})
    badep = [v for v in ep.values() if ".." in v.split("/") or os.path.isabs(v) or not os.path.exists(os.path.join(REPO, v))]
    check(ep and not badep, "manifest entryPoints are all inside the repo and exist (%d)" % len(ep), ", ".join(badep))
    for need in ["extraction/prove_drift.py", "extraction/wrapper_gate.py", "extraction/measure_sections.mjs", "extraction/measure-recipes.json", "extraction/wrapper-whitelist.json", "schema/section-contract.schema.json", "schema/tests/adversarial_test.py", "schema/semantic_validate.py"]:
        check(os.path.exists(os.path.join(REPO, need)), "referenced script exists: " + need)

    # ---- load
    tpl, graph, ad = J("templates/templates.json"), J("compatibility/graph.json"), J("assets/asset-roles.json")
    sch, allow = J("schema/pagespec.schema.json"), J("tokens/llm/component-allowlist.json")
    secs = {J(os.path.relpath(p, REPO))["id"]: J(os.path.relpath(p, REPO)) for p in sorted(glob.glob(os.path.join(REPO, "sections", "*.json")))}
    prims = sorted(J(os.path.relpath(p, REPO))["id"] for p in glob.glob(os.path.join(REPO, "primitives", "*.json")))
    comps = sorted(J(os.path.relpath(p, REPO))["id"] for p in glob.glob(os.path.join(REPO, "components", "*.json")))

    # ---- allowlist parity (both directions)
    for kind, on_disk in [("primitives", prims), ("components", comps), ("sections", sorted(secs)), ("templates", sorted(tpl["templates"])), ("routes", sorted(tpl["routes"]))]:
        a = sorted(allow[kind]); d = sorted(on_disk)
        check(a == d, "allowlist parity: %s (%d)" % (kind, len(d)), "phantom=%s orphan=%s" % (sorted(set(a) - set(d)), sorted(set(d) - set(a))))
    facing = sorted(r for r, v in ad["roles"].items() if v["pageSpecFacing"])
    check(sorted(allow["assetRoles"]) == facing, "allowlist parity: assetRoles == pageSpecFacing roles in assets/asset-roles.json")
    check(sorted(sch["definitions"]["assetRole"]["enum"]) == facing, "schema assetRole enum == pageSpecFacing roles (closed enum wired through schema + allowlist)")
    nodeprops = sorted(sch["properties"]["nodes"]["items"]["properties"].keys())
    check(sorted(allow["nodePropertiesSettable"]) == nodeprops, "allowlist nodePropertiesSettable == schema node properties")
    check(sorted(allow["pagePropertiesSettable"]) == sorted(sch["properties"].keys()), "allowlist pagePropertiesSettable == schema top-level properties")
    mprops = sorted(sch["definitions"]["motion"]["properties"].keys())
    check(sorted(allow["motionPropertiesSettable"]) == mprops, "allowlist motionPropertiesSettable == schema motion properties")

    # ---- schema validity, example, sync, closure
    try:
        from jsonschema import Draft7Validator
    except ImportError:
        bad("jsonschema is not installed"); return finish(argv)
    Draft7Validator.check_schema(sch); ok("pagespec.schema.json is a valid Draft-07 schema")
    ex = J("schema/example.pagespec.json")
    n_err = len(list(Draft7Validator(sch).iter_errors(ex)))
    check(n_err == 0, "Draft-07 validation of example.pagespec.json: %d errors" % n_err)
    import semantic_validate as sv
    ctx = sv.load_context(REPO)
    e, w = sv.validate(ex, REPO, ctx)
    check(not e and not w, "semantic validation of example.pagespec.json: %d errors, %d warnings" % (len(e), len(w)), "; ".join(e + w)[:300])
    gxs = [J(os.path.relpath(p, REPO)) for p in sorted(glob.glob(os.path.join(REPO, "schema", "example.generated*.pagespec.json")))]
    check(ex["mode"] == "clone" and gxs and all(g["mode"] == "generation" for g in gxs) and sch["properties"]["mode"]["enum"] == ["clone", "generation"] == allow["generationModes"] and "mode" in sch["required"],
          "mode is required and closed: schema/allowlist modes == [clone, generation]; clone example is mode clone, every generated example is mode generation")
    check(all(g["pageSpecVersion"] == ex["pageSpecVersion"] for g in gxs) and ex["pageSpecVersion"] == sch["properties"]["pageSpecVersion"]["const"] == man["pageSpecVersion"], "pageSpecVersion agrees across schema, all examples and manifest (schema const is the enforcement)")
    for tid, t in tpl["templates"].items():
        for r in t["routes"]:
            nodes = [{"section": n["section"], "variant": n["variants"][0], "content": secs[n["section"]]["exemplar"]["content"], "motion": secs[n["section"]]["exemplar"]["motion"]} for n in t["nodes"]]
            e, _ = sv.validate({"pageSpecVersion": man["pageSpecVersion"], "mode": "clone", "template": tid, "route": r, "head": t["head"], "nodes": nodes}, REPO, ctx)
            check(not e, "section exemplars compose a valid %s page at %s" % (tid, r), "; ".join(e)[:300])
    branches = {b["if"]["properties"]["section"]["const"]: b["then"]["properties"] for b in sch["properties"]["nodes"]["items"]["allOf"]}
    sync = [sid for sid, s in secs.items() if sid not in branches or branches[sid]["content"] != s["content"] or branches[sid]["motion"] != s["motion"]["schema"] or branches[sid]["variant"]["enum"] != [v["id"] for v in s["variants"]]]
    check(not sync and sorted(branches) == sorted(secs) and sch["properties"]["nodes"]["items"]["properties"]["section"]["enum"] == sorted(secs), "schema section branches are in sync with sections/*.json", ", ".join(sync))
    check(sch["properties"]["template"]["enum"] == sorted(tpl["templates"]), "schema template enum == templates.json")
    loose = []
    def walk(o, path=""):
        if isinstance(o, dict):
            if o.get("additionalProperties") is True: loose.append(path)
            if "properties" in o and isinstance(o["properties"], dict) and o.get("type") == "object" and o.get("additionalProperties") is not False and "const" not in o: loose.append(path + "(open)")
            for k, v in o.items(): walk(v, path + "/" + k)
        elif isinstance(o, list):
            for i, v in enumerate(o): walk(v, "%s/%d" % (path, i))
    walk(sch)
    for sid, s in secs.items(): walk(s["content"], sid + "/content"); walk(s["motion"]["schema"], sid + "/motion")
    check(not loose, "all object schemas (incl. motion) are closed: no additionalProperties:true, none left open", ", ".join(loose[:5]))
    nofb = [sid for sid, s in secs.items() if "reducedMotionFallback" not in s["motion"]["schema"]["required"]]
    check(not nofb, "every section motion schema requires reducedMotionFallback", ", ".join(nofb))

    # ---- templates / routes / sections coverage
    used = {n["section"] for t in tpl["templates"].values() for n in t["nodes"]}
    check(used == set(secs), "every section is used by a template and every template node is a real section", "unused=%s unknown=%s" % (sorted(set(secs) - used), sorted(used - set(secs))))
    rmap = {}
    for tid, t in tpl["templates"].items():
        for r in t["routes"]: rmap.setdefault(r, []).append(tid)
    check(all(len(v) == 1 for v in rmap.values()) and {r: v[0] for r, v in rmap.items()} == tpl["routes"], "route coverage is 1:1 (every route assigned to exactly one template)", str(rmap))
    bad_allowed = []
    for sid, s in secs.items():
        listed = sorted(tid for tid, t in tpl["templates"].items() if sid in [n["section"] for n in t["nodes"]])
        if sorted(s["constraints"]["allowedTemplates"]) != listed: bad_allowed.append(sid)
    check(not bad_allowed, "each section's allowedTemplates == templates that list it", ", ".join(bad_allowed))
    # ---- graph <-> validator
    gids = [r["id"] for r in graph["rules"]]
    check(sorted(gids) == sorted(sv.RULES), "graph rule ids == rules implemented in semantic_validate.py", "graph-only=%s validator-only=%s" % (sorted(set(gids) - set(sv.RULES)), sorted(set(sv.RULES) - set(gids))))
    check(all(r["severity"] in ("error", "warn") for r in graph["rules"]) and any(r["severity"] == "warn" for r in graph["rules"]), "graph rules carry severity error|warn (both used)")
    # ---- tokens
    flat, groups = {}, {}
    def add(root, prefix, group):
        for p, v in leaves(root):
            flat[prefix + p] = v; groups.setdefault(group, []).append(prefix + p)
    c = J("tokens/00-foundation/color.json"); ty = J("tokens/00-foundation/typography.json")
    add(c, "color.", "color"); add(ty["fontFamily"], "fontFamily.", "fontFamily"); add(ty["fontWeight"], "fontWeight.", "fontWeight"); add(ty["fontSize"], "fontSize.", "fontSize")
    add(J("tokens/00-foundation/radius.json"), "radius.", "radius"); add(J("tokens/00-foundation/spacing.json"), "spacing.", "spacing"); add(J("tokens/00-foundation/breakpoint.json"), "breakpoint.", "breakpoint")
    add(J("tokens/00-foundation/elevation.json"), "elevation.", "elevation"); add(J("tokens/00-foundation/icon-size.json"), "iconSize.", "iconSize")
    mo = J("tokens/00-foundation/motion.json"); add(mo["duration"], "motion.duration.", "duration"); add(mo["easing"], "motion.easing.", "easing")
    foundation_n = len(flat)
    sem, comp, lay = J("tokens/10-semantic/semantic.json"), J("tokens/20-component/component.json"), J("tokens/30-layout/layout.json")
    add(sem, "semantic.", "semantic"); add(comp, "component.", "component"); add(lay, "layout.", "layout")
    cat = J("tokens/llm/token-catalog.json")["tokens"]
    check({k: sorted(v) for k, v in groups.items()} == {k: sorted(v) for k, v in cat.items()}, "token-catalog.json lists exactly the tokens on disk")
    pol = J("tokens/llm/token-policy.json")
    check(set(pol["rawValueRestrictions"]) <= set(cat), "token-policy category names are real catalog keys", str(set(pol["rawValueRestrictions"]) - set(cat)))
    unres = []
    def res(v, seen=()):
        while isinstance(v, str) and v.startswith("{") and v.endswith("}"):
            if v[1:-1] not in flat: unres.append(v); return None
            v = flat[v[1:-1]]["$value"]
        return v
    theme = J("tokens/themes/light.json")["resolved"]
    want = {}
    for p, v in list(leaves(sem)) + list(leaves(comp)):
        pass
    for pre, root in [("semantic.", sem), ("component.", comp)]:
        for p, v in leaves(root): want[pre + p] = {"ref": v["$value"], "value": res(v["$value"])}
    check(not unres, "every semantic/component token reference resolves to a foundation token", ", ".join(unres))
    check(want == theme, "themes/light.json equals a fresh resolution of semantic+component tokens")
    nocite = [p for p, v in flat.items() if not v.get("measuredFrom")]
    check(not nocite, "every token carries at least one citation", ", ".join(nocite[:5]))
    badtok = []
    for kind, d in [("primitives", "primitives"), ("components", "components")]:
        for p in glob.glob(os.path.join(REPO, d, "*.json")):
            o = json.load(open(p, encoding="utf-8"))
            for t in o["tokens"]:
                if t not in flat: badtok.append("%s:%s" % (o["id"], t))
            if not o.get("measuredFrom"): badtok.append("%s:no-citation" % o["id"])
    check(not badtok, "primitive/component token references resolve and carry citations", ", ".join(badtok))
    nocs = [sid for sid, s in secs.items() if not s.get("measuredFrom") or not s["motion"]["exemplar"]]
    check(not nocs, "every section carries citations and a motion exemplar", ", ".join(nocs))
    # ---- asset roles: policy pins, availability pins (independent of the registry), substitutes
    pe = set(ad["policyEnum"]); bad_roles = []
    for r, v in ad["roles"].items():
        if v["generationPolicy"] not in pe: bad_roles.append(r + ":policy-not-in-enum")
        if v["compliancePinned"] != (r in PINNED_POLICIES): bad_roles.append(r + ":pinned-flag-mismatch")
        if r in PINNED_POLICIES and v["generationPolicy"] != PINNED_POLICIES[r]: bad_roles.append("%s:pinned-to-%s-but-is-%s" % (r, PINNED_POLICIES[r], v["generationPolicy"]))
        if "Operate" not in v["licensing"] or "placeholder" not in v["licensing"].lower(): bad_roles.append(r + ":licensing-text")
        for u in v["usedBy"]:
            if u not in secs: bad_roles.append("%s:usedBy-unknown-%s" % (r, u))
    for ref, a in ad["registeredAssets"].items():
        if a["role"] not in ad["roles"]: bad_roles.append(ref + ":unknown-role")
    check(not bad_roles, "asset-role closure + PINNED_POLICIES (exact policy values, not just enum membership)", ", ".join(bad_roles))
    check(set(PINNED_POLICIES) == {r for r, v in ad["roles"].items() if v["compliancePinned"]}, "every compliancePinned role is in PINNED_POLICIES")
    AV = list(ad["availabilityEnum"])
    check(AV == AVAILABILITY_ENUM, "availabilityEnum is exactly %s" % AVAILABILITY_ENUM, str(AV))
    bad_av = ["%s:%r" % (r, v.get("availability")) for r, v in ad["roles"].items() if v.get("availability") not in AVAILABILITY_ENUM]
    bad_av += ["%s:not-pinned-in-verify_all" % r for r in ad["roles"] if r not in PINNED_AVAILABILITY]
    bad_av += ["%s:pinned-%s-registry-%s" % (r, PINNED_AVAILABILITY[r], ad["roles"][r].get("availability")) for r in PINNED_AVAILABILITY if r in ad["roles"] and ad["roles"][r].get("availability") != PINNED_AVAILABILITY[r]]
    bad_av += ["%s:pinned-role-missing-from-registry" % r for r in PINNED_AVAILABILITY if r not in ad["roles"]]
    check(not bad_av, "every role has a closed availability equal to PINNED_AVAILABILITY in verify_all.py (%d roles)" % len(ad["roles"]), ", ".join(bad_av[:6]))
    check(sorted(allow.get("generationSafeAssetRoles", [])) == sorted(r for r, v in PINNED_AVAILABILITY.items() if v == "generation-safe"),
          "allowlist generationSafeAssetRoles == the roles pinned generation-safe", str(allow.get("generationSafeAssetRoles")))
    check(dict(sv.PINNED_AVAILABILITY) == PINNED_AVAILABILITY, "PINNED_AVAILABILITY in schema/semantic_validate.py == the copy in verify_all.py",
          "differs: %s" % sorted(k for k in set(PINNED_AVAILABILITY) | set(sv.PINNED_AVAILABILITY) if PINNED_AVAILABILITY.get(k) != sv.PINNED_AVAILABILITY.get(k)))
    check(all(PINNED_AVAILABILITY.get(r) == "clone-only" and PINNED_POLICIES.get(r) == "must-reuse-exact" for r in ("brand-logomark", "brand-logo-trace")),
          "brand-logomark / brand-logo-trace: must-reuse-exact applies in mode clone only (availability pinned clone-only)")
    facing_roles = {r: v for r, v in ad["roles"].items() if v["pageSpecFacing"]}
    nocat = sorted(r for r in facing_roles if r not in sv.ROLE_LEAK_CATEGORY or sv.ROLE_LEAK_CATEGORY[r] not in sv.GENERATION_CATEGORIES)
    check(not nocat, "every PageSpec-facing role maps to a generation-mode rule category (ROLE_LEAK_CATEGORY)", ", ".join(nocat))
    bad_sub = []
    for r, v in ad["roles"].items():
        subs = v.get("generationSafeSubstitutes")
        if not isinstance(subs, list): bad_sub.append(r + ":no-generationSafeSubstitutes"); continue
        if PINNED_AVAILABILITY.get(r) == "generation-safe":
            if subs: bad_sub.append(r + ":generation-safe-role-has-substitutes")
            if not any(r in (ad["roles"][o].get("generationSafeSubstitutes") or []) for o in ad["roles"]): bad_sub.append(r + ":substitutes-nothing")
            continue
        if v["pageSpecFacing"] and not subs: bad_sub.append(r + ":clone-only/blocked-role-without-substitute")
        if not v["pageSpecFacing"] and not subs and not v.get("generationSafeSubstitutesNote"): bad_sub.append(r + ":empty-substitutes-without-note")
        for s_ in subs:
            if PINNED_AVAILABILITY.get(s_) != "generation-safe": bad_sub.append("%s:substitute-%s-not-generation-safe" % (r, s_))
            elif not set(v["usedBy"]) <= set(ad["roles"][s_]["usedBy"]): bad_sub.append("%s:substitute-%s-not-usable-in-%s" % (r, s_, sorted(set(v["usedBy"]) - set(ad["roles"][s_]["usedBy"]))))
            if sv.ROLE_LEAK_CATEGORY.get(s_) != sv.ROLE_LEAK_CATEGORY.get(r): bad_sub.append("%s:substitute-%s-other-category" % (r, s_))
    check(not bad_sub, "generationSafeSubstitutes: every clone-only/blocked PageSpec-facing role names generation-safe stand-in roles usable in all its sections", ", ".join(bad_sub[:6]))
    reg = ad["registeredAssets"]; pol = J("assets/generation-policy.json"); bad_g = []
    for ref, a in reg.items():
        role_av = PINNED_AVAILABILITY.get(a["role"])
        if a.get("generationUse") != role_av: bad_g.append("%s:generationUse-%s-but-role-%s" % (ref, a.get("generationUse"), role_av))
        if role_av == "generation-safe":
            if not ref.startswith(sv.GENERATION_SAFE_REF_PREFIX): bad_g.append(ref + ":generation-safe-ref-not-placeholder--")
            pf = reg.get(a.get("placeholderFor") or "")
            if pf is None or PINNED_AVAILABILITY.get(pf["role"]) == "generation-safe": bad_g.append(ref + ":placeholderFor")
            elif a["role"] not in ad["roles"][pf["role"]]["generationSafeSubstitutes"]: bad_g.append(ref + ":role-is-not-a-substitute-of-the-replaced-asset")
            if a.get("measuredFrom") or a.get("license") or not a["source"].startswith("(no file"): bad_g.append(ref + ":placeholder-points-at-real-source")
            if "placeholderUrl" in a and not _reserved(a["placeholderUrl"], pol): bad_g.append(ref + ":placeholderUrl-not-reserved")
            if a["role"] == "placeholder-url" and "placeholderUrl" not in a: bad_g.append(ref + ":placeholder-url-without-placeholderUrl")
        else:
            if ref.startswith(sv.GENERATION_SAFE_REF_PREFIX): bad_g.append(ref + ":real-asset-named-placeholder--")
            if "placeholderFor" in a or "placeholderUrl" in a: bad_g.append(ref + ":real-asset-has-placeholder-fields")
            if ad["roles"][a["role"]]["pageSpecFacing"] and not any(b.get("placeholderFor") == ref for b in reg.values()): bad_g.append(ref + ":no-generation-safe-placeholder")
    for role, r in facing_roles.items():
        if not any(a["role"] == role for a in reg.values()): bad_g.append(role + ":role-has-no-registered-asset")
    check(not bad_g, "registered assets: generationUse == pinned role availability; generation-safe assets are placeholder--* stand-ins (substitute role, no file, reserved URLs); every real PageSpec asset has one", ", ".join(bad_g[:6]))
    unw = []
    def asset_fields(o, sid, path=""):
        if isinstance(o, dict):
            props = o.get("properties", {})
            if "assetRole" in props and "allOf" in props["assetRole"]:
                en = props["assetRole"]["allOf"][1]["enum"]
                for r_ in en:
                    for s_ in ad["roles"].get(r_, {}).get("generationSafeSubstitutes", []):
                        if s_ not in en: unw.append("%s%s:%s-misses-substitute-%s" % (sid, path, r_, s_))
                if not any(PINNED_AVAILABILITY.get(r_) == "generation-safe" for r_ in en): unw.append("%s%s:no-generation-safe-role" % (sid, path))
                refs = props.get("assetRef", {}).get("enum")
                if refs is not None:
                    if any(x not in reg for x in refs): unw.append("%s%s:unregistered-ref" % (sid, path))
                    if not any(reg[x]["role"] == r_ for x in refs if x in reg for r_ in en if PINNED_AVAILABILITY.get(r_) == "generation-safe"): unw.append("%s%s:no-generation-safe-ref" % (sid, path))
            for k, v in o.items(): asset_fields(v, sid, path + "/" + k)
        elif isinstance(o, list):
            for i, v in enumerate(o): asset_fields(v, sid, "%s/%d" % (path, i))
    for sid, s in secs.items(): asset_fields(s["content"], sid)
    check(not unw, "every asset field in the section schemas accepts the generation-safe substitute roles (and a registered placeholder ref) of every role it accepts", ", ".join(unw[:4]))
    # ---- generation policy: categories, coverage
    cats = {g["category"] for g in pol["blockedTerms"].values()} | {pol["blockedHosts"]["category"]}
    check(cats <= set(sv.GENERATION_CATEGORIES) and set(pol["allowedAvailability"]) == {"clone", "generation"} and pol["allowedAvailability"]["generation"] == ["generation-safe"],
          "generation-policy: categories are generation rule categories; mode 'generation' allows only generation-safe availability")
    gids = {r["id"]: r for r in graph["rules"]}
    miss_rules = [c for c in sv.GENERATION_CATEGORIES if ("GENERATION_MODE_" + c) not in gids or gids["GENERATION_MODE_" + c]["severity"] != "error" or gids["GENERATION_MODE_" + c]["params"] != {"mode": "generation", "category": c}]
    check(not miss_rules and list(sv.GENERATION_CATEGORIES) == GENERATION_CATEGORIES, "graph has the six per-category GENERATION_MODE_* rules (error, mode generation) pinned in code: %s" % ", ".join(GENERATION_CATEGORIES), ", ".join(miss_rules))
    names = lambda src: re.sub(r"[-_]", " ", os.path.splitext(os.path.basename(src))[0]).lower()
    terms = {t["term"].lower() for g in pol["blockedTerms"].values() for t in g["terms"]}
    miss = [r for r, a in reg.items() if a["role"] == "demo-avatar-image" and names(a["source"]) not in terms]
    miss += [r for r, a in reg.items() if a["role"] == "integration-logo" and r.split("--")[1] != "more" and r.split("--")[1] not in terms]
    miss += [t for t in ("operate", "operate.so") if t not in terms]
    check(not miss, "generation-policy blocks every demo-avatar person (from asset file names), every integration brand and Operate's name/domain", ", ".join(miss))
    # ---- generation-safe examples: one per template family, schema + semantic + independent text scan
    gx_files = sorted(os.path.relpath(p, REPO) for p in glob.glob(os.path.join(REPO, "schema", "example.generated*.pagespec.json")))
    fam = {}
    for gf in gx_files:
        gx_ = J(gf)
        fam.setdefault(gx_.get("template"), []).append(gf)
        n_err = len(list(Draft7Validator(sch).iter_errors(gx_)))
        e, w = sv.validate(gx_, REPO, ctx)
        check(n_err == 0 and not e and not w and gx_.get("mode") == "generation", "%s: mode generation, Draft-07 %d errors, semantic %d errors / %d warnings" % (gf, n_err, len(e), len(w)), "; ".join(e + w)[:300])
        gtxt = open(os.path.join(REPO, gf), encoding="utf-8").read()
        low = gtxt.lower()
        leak = [x for x in ["Operate", "OPERATE"] if x in gtxt] + [t for t in sorted(terms) if t != "operate" and re.search(r"(?<![a-z0-9])%s(?![a-z0-9])" % re.escape(t), low)]
        hosts = set(re.findall(r"https?://([^/\"\s]+)", gtxt)) | set(re.findall(r"[\w.+-]+@([\w.-]+)", gtxt))
        leak += sorted(h for h in hosts if not _reserved("https://" + h, pol))
        refs_ = {a["assetRef"] for n in gx_["nodes"] for _, a in sv.find_assets(n["content"])}
        notsafe = sorted(r for r in refs_ if PINNED_AVAILABILITY.get(reg.get(r, {}).get("role")) != "generation-safe")
        check(not leak and not notsafe, "%s (independent text scan): no Operate/third-party/person terms, no real hosts, only generation-safe assets (%d refs)" % (gf, len(refs_)), "leak=%s notsafe=%s" % (leak, notsafe))
    check(sorted(fam) == sorted(tpl["templates"]), "a generation-safe example PageSpec exists for every template family (%d)" % len(fam), "missing: %s" % sorted(set(tpl["templates"]) - set(fam)))
    # ---- behavioural probe: the validator still enforces mode generation, per category (and leaves clone alone)
    gbase = J("schema/example.generated.pagespec.json")
    probe_fail = []
    for cat_, mut in GENERATION_PROBES:
        sp = copy.deepcopy(gbase); mut(sp)
        e, _ = sv.validate(sp, REPO, ctx)
        if not any(("GENERATION_MODE_" + cat_ + ":") in x for x in e): probe_fail.append(cat_)
    lctx = copy.deepcopy(ctx); lctx["_gen"] = {}  # registry loosened in memory: the validator must still follow its pin
    lctx["assets"]["roles"]["brand-logomark"]["availability"] = "generation-safe"
    lctx["assets"]["registeredAssets"]["logo--mark"]["generationUse"] = "generation-safe"
    sp = copy.deepcopy(gbase); _p_brand(sp)
    e, _ = sv.validate(sp, REPO, lctx)
    if not any("GENERATION_MODE_BRAND:" in x for x in e): probe_fail.append("registry-loosened-logo-accepted")
    e, _ = sv.validate(copy.deepcopy(ex), REPO, ctx)
    if e: probe_fail.append("clone-example-rejected")
    check(not probe_fail, "generation-mode enforcement probe: one injected leak per category is rejected by its own rule (%s); a logo is still rejected when only the registry is loosened; the clone example still passes" % ", ".join(c for c, _ in GENERATION_PROBES), ", ".join(probe_fail))
    # ---- section contracts: closed schema, source/semantic split, honest classing, retrieval pin
    csch = J("schema/section-contract.schema.json")
    Draft7Validator.check_schema(csch)
    probs = []
    if csch.get("additionalProperties") is not False or any(csch["properties"][k].get("additionalProperties") is not False for k in ("semantic", "source")):
        probs.append("section-contract.schema.json must stay closed at the top level and on semantic/source")
    if csch["properties"]["semantic"]["properties"]["category"].get("enum") != SEMANTIC_CATEGORIES:
        probs.append("section-contract.schema.json category enum differs from SEMANTIC_CATEGORIES pinned in verify_all.py")
    if csch["properties"]["retrievalEligible"].get("type") != "boolean" or csch["properties"]["retrievalIneligibleReason"].get("minLength") != 30:
        probs.append("section-contract.schema.json must keep retrievalEligible a boolean and the reason at 30+ characters")
    cv = Draft7Validator(csch)
    for sid, c in sorted(secs.items()):
        for e_ in cv.iter_errors(c):
            probs.append("sections/%s.json: /%s: %s" % (sid, "/".join(map(str, e_.absolute_path)), e_.message[:120]))
        sem_, src_ = c.get("semantic") or {}, c.get("source") or {}
        if sem_.get("id") != sid: probs.append("%s: semantic.id %r must equal the contract id" % (sid, sem_.get("id")))
        if src_.get("id") == sem_.get("id"): probs.append("%s: source.id and semantic.id must differ" % sid)
        if "category" in c: probs.append("%s: the old free-form category field must be gone (semantic.category is the single taxonomy)" % sid)
        cat_ = sem_.get("category"); prefix = sid.split(".")[0]
        if prefix == "hero" and cat_ != "HERO": probs.append("%s: a page-opening block must be HERO" % sid)
        if cat_ == "HERO" and prefix != "hero": probs.append("%s: classed HERO but not a hero.* section" % sid)
        if prefix == "form" and cat_ != "CONVERSION": probs.append("%s: a sign-up/waitlist form must be CONVERSION, found %s" % (sid, cat_))
        if cat_ == "FEATURE" and re.search(r"story|manifesto|legal|article|blog|news|changelog", sid): probs.append("%s: editorial/legal content must not be FEATURE" % sid)
        elig, reason = c.get("retrievalEligible"), c.get("retrievalIneligibleReason")
        pinned, runtime_ui = sid in RETRIEVAL_PINNED, bool(RUNTIME_UI_RE.search(sid))
        if not isinstance(elig, bool): probs.append("%s: retrievalEligible must be a closed boolean" % sid); continue
        if (pinned or runtime_ui) and elig is not False: probs.append("%s is pinned/runtime UI but retrievalEligible is %r" % (sid, elig))
        if runtime_ui and not pinned: probs.append("%s looks like runtime UI and must be in RETRIEVAL_PINNED of verify_all.py" % sid)
        if elig is False and not pinned: probs.append("%s is retrievalEligible false but not pinned (false is reserved for runtime UI / layout-only)" % sid)
        if elig is False and (not isinstance(reason, str) or len(reason.strip()) < 30): probs.append("%s: retrievalEligible false needs a 30+ character reason" % sid)
        if elig is True and reason is not None: probs.append("%s: a reason is only allowed when retrievalEligible is false" % sid)
    for sid in RETRIEVAL_PINNED:
        if sid not in secs: probs.append("pinned retrieval-ineligible section %s has no contract" % sid)
    if sorted(allow.get("retrievalIneligibleSections", [])) != sorted(RETRIEVAL_PINNED): probs.append("allowlist retrievalIneligibleSections differs from RETRIEVAL_PINNED")
    if allow.get("sectionSemanticCategories") != {s: c["semantic"]["category"] for s, c in sorted(secs.items()) if isinstance(c.get("semantic"), dict)}: probs.append("allowlist sectionSemanticCategories differs from the contracts")
    if sorted(sv.RETRIEVAL_INELIGIBLE_PINNED) != sorted(RETRIEVAL_PINNED) or list(sv.SEMANTIC_CATEGORIES) != SEMANTIC_CATEGORIES: probs.append("schema/semantic_validate.py pins (RETRIEVAL_INELIGIBLE_PINNED / SEMANTIC_CATEGORIES) differ from verify_all.py")
    if sv.RUNTIME_UI_RE.pattern != RUNTIME_UI_RE.pattern: probs.append("RUNTIME_UI_RE differs between semantic_validate.py and verify_all.py")
    check(not probs, "section contracts: closed schema/section-contract.schema.json, source/semantic split, honest classing, retrievalEligible pinned (%d contracts, %d ineligible)" % (len(secs), len(RETRIEVAL_PINNED)), "; ".join(probs[:5]))
    # ---- wrapper gate (thresholds pinned here and in wrapper_gate.py)
    import wrapper_gate as wg
    pins = {"HERO_WARN_PX": 1800, "HERO_FAIL_PX": 3000, "SHARE_WARN_PCT": 50.0, "SHARE_FAIL_PCT": 60.0, "MIN_SECTIONS": 3, "VIEWPORT_WIDTH": 1440, "MIN_JUSTIFICATION": 30}
    drift = ["%s=%r" % (k, getattr(wg, k, None)) for k, v in pins.items() if getattr(wg, k, None) != v]
    check(not drift, "wrapper gate thresholds pinned in code (HERO 1800 warn / 3000 fail, share 50% warn / 60% fail, >= 3 sections, 1440px)", ", ".join(drift))
    wf, ww, wi = wg.check_wrapper_gate(REPO)
    for x in ww: warn("wrapper gate: " + x)
    sh_ = J("extraction/measured-values.json").get("sectionHeights") or {}
    check(not wf, "wrapper gate: measured at %spx, %d routes, %d sections, 0 failures (%d warnings; %s)" % ((sh_.get("viewport") or {}).get("width"), len(sh_.get("routes") or []), len(sh_.get("sections") or {}), len(ww), "; ".join(wi) or "no skips"), "; ".join(wf[:4]))
    # ---- manifest counts / versions
    counts = {"tokens": {"foundation": foundation_n, "semantic": len(list(leaves(sem))), "component": len(list(leaves(comp))), "layout": len(list(leaves(lay)))},
              "primitives": len(prims), "components": len(comps), "sections": len(secs), "templates": len(tpl["templates"]), "routes": len(tpl["routes"]),
              "assetRoles": len(ad["roles"]), "registeredAssets": len(ad["registeredAssets"]), "graphRules": len(graph["rules"])}
    counts["tokens"]["total"] = sum(counts["tokens"].values())
    check(man["counts"] == counts, "manifest counts == counts recomputed from disk", "manifest=%s disk=%s" % (man["counts"], counts))
    check(man["allowlistVersion"] == allow["version"], "manifest allowlistVersion == allowlist version (machine-checked)")
    check("versionFieldNote" in man and man["productionApproved"] is False and man["status"] == "design-review-pending", "manifest status/approval flags and versionFieldNote present")
    for doc in ["README.md", "CHANGELOG.md"]:
        txt = open(os.path.join(REPO, doc), encoding="utf-8").read()
        m = re.search(r"<!-- counts: (.*?) -->", txt)
        got = dict(kv.split("=") for kv in m.group(1).split()) if m else {}
        flatc = {"tokens": counts["tokens"]["total"], "primitives": counts["primitives"], "components": counts["components"], "sections": counts["sections"], "templates": counts["templates"], "routes": counts["routes"]}
        check(got == {k: str(v) for k, v in flatc.items()}, "%s count marker matches disk" % doc, str(got))
    rd = open(os.path.join(REPO, "README.md"), encoding="utf-8").read()
    mrow = re.search(r"\| Asset roles / registered assets \| (\d+) / (\d+) \|", rd); grow = re.search(r"\| Graph rules \| (\d+) \|", rd)
    check(bool(mrow and grow) and (int(mrow.group(1)), int(mrow.group(2)), int(grow.group(1))) == (counts["assetRoles"], counts["registeredAssets"], counts["graphRules"]), "README asset-role / registered-asset / graph-rule table matches disk")
    # ---- ia.json + citations (need a source tree)
    root = source_root(argv)
    if not root:
        warn("no source tree found (sibling of design-repo or --source-root): ia.json cross-check, citation-range, quote spot-check, section source-range and generation-policy evidence checks SKIPPED")
    else:
        ia = json.load(open(os.path.join(root, "ia.json"), encoding="utf-8"))
        bad_ia = []
        if sorted(ia["sections"]) != sorted(secs): bad_ia.append("section ids differ")
        for it in ia["templates"]:
            t = tpl["templates"].get(it["id"])
            if not t or [n["section"] for n in t["nodes"]] != it["sections"]: bad_ia.append(it["id"] + ":sections")
            elif sorted(r if not r.startswith("/*") else "*" for r in it["routes"]) != sorted(t["routes"]): bad_ia.append(it["id"] + ":routes")
        check(not bad_ia and len(ia["templates"]) == len(tpl["templates"]), "templates/sections/routes match ia.json in the source tree", ", ".join(bad_ia))
        badc, n = [], 0
        cache = {}
        def nlines(p):
            if p not in cache:
                fp = os.path.join(root, p)
                cache[p] = open(fp, encoding="utf-8").read().split("\n") if os.path.isfile(fp) else None
            return cache[p]
        for rp, o in jsons.items():
            for s in strings(o):
                for m in CIT.finditer(s):
                    path, a, b = m.group(1), int(m.group(2)), int(m.group(3) or m.group(2))
                    n += 1
                    ls = nlines(path)
                    if ls is None: badc.append("%s -> missing file %s" % (rp, path))
                    elif a < 1 or b < a or b > len(ls): badc.append("%s -> %s:%d-%d exceeds %d lines" % (rp, path, a, b, len(ls)))
        check(not badc, "citation validity: %d citations resolve inside real files/line ranges" % n, "; ".join(badc[:4]) + (" (+%d more)" % (len(badc) - 4) if len(badc) > 4 else ""))
        wrong = []
        for sc in J("extraction/measured-values.json")["spotChecks"]:
            m = CIT.fullmatch(sc["citation"])
            path, a, b = m.group(1), int(m.group(2)), int(m.group(3) or m.group(2))
            ls = nlines(path)
            if ls is None or not any(sc["quote"] in l for l in ls[a - 1:b]): wrong.append("%s !~ %r" % (sc["citation"], sc["quote"][:50]))
        check(not wrong, "citation spot-checks: %d quoted texts still present at their cited lines" % len(J("extraction/measured-values.json")["spotChecks"]), "; ".join(wrong[:4]) + (" (+%d more)" % (len(wrong) - 4) if len(wrong) > 4 else ""))
        # source ranges of the section contracts, re-read from the real files
        bad_src = []
        for sid, c in sorted(secs.items()):
            s_ = c.get("source") or {}
            ls = nlines(s_.get("file", ""))
            m = re.fullmatch(r"(\d+)-(\d+)", str(s_.get("lines", "")))
            if ls is None: bad_src.append("%s: source.file %r missing" % (sid, s_.get("file"))); continue
            if not m or int(m.group(1)) < 1 or int(m.group(2)) < int(m.group(1)) or int(m.group(2)) > len(ls): bad_src.append("%s: source.lines %r out of range (%d lines)" % (sid, s_.get("lines"), len(ls))); continue
            body = "\n".join(ls[int(m.group(1)) - 1:int(m.group(2))])
            if not re.search(r"<%s[\s>/]" % re.escape(s_.get("tag", "")), body): bad_src.append("%s: <%s> not rendered in %s:%s" % (sid, s_.get("tag"), s_["file"], s_["lines"]))
            if s_.get("anchor", "\0") not in body: bad_src.append("%s: anchor %r not in %s:%s" % (sid, s_.get("anchor"), s_["file"], s_["lines"]))
            if s_["file"] not in c.get("implementedBy", []): bad_src.append("%s: source.file is not one of implementedBy" % sid)
        check(not bad_src, "section source ranges re-read from the real files: range valid, root tag and anchor present (%d contracts)" % len(secs), "; ".join(bad_src[:4]))
        # generation-policy evidence: every blocked term / host is on its cited source line
        bad_ev = []
        items = [(t["term"], ev) for g in J("assets/generation-policy.json")["blockedTerms"].values() for t in g["terms"] for ev in t["evidence"]]
        items += [(h["host"], ev) for h in J("assets/generation-policy.json")["blockedHosts"]["hosts"] for ev in h["evidence"]]
        for term, ev in items:
            m = CIT.fullmatch(ev)
            ls = nlines(m.group(1)) if m else None
            if not m or ls is None or int(m.group(2)) > len(ls) or not any(term.lower() in l.lower() for l in ls[int(m.group(2)) - 1:int(m.group(3) or m.group(2))]): bad_ev.append("%s @ %s" % (term, ev))
        check(not bad_ev, "generation-policy evidence: %d blocked terms/hosts re-read on their cited source lines (patterns derived from the real source)" % len(items), "; ".join(bad_ev[:4]))
    return finish(argv)


def finish(argv):
    print("\nRESULT: %s  (%d passed, %d failed, %d warnings)" % ("PASS" if not FAILS else "FAIL", len(PASSES), len(FAILS), len(WARNS)))
    return 1 if FAILS else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
