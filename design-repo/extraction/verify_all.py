#!/usr/bin/env python3
"""One-shot verification of the Operate design-repo.

Checks: self-containment (no absolute paths, entryPoints inside the repo), JSON well-formedness, Draft-07
schema validity + example validation (0 errors), schema/section sync, closed motion/objects, allowlist parity
(both directions), template <-> route <-> section coverage (+ ia.json when a source tree is present),
graph-rule implementation parity, token reference integrity + catalog/policy/theme drift, asset-role closure
with PINNED_POLICIES, manifest counts/versions recomputed from disk, README/CHANGELOG count markers,
citation validity + quote spot-checks against the source tree (WARN and skip when no source tree).

Usage:  python3 extraction/verify_all.py [--source-root DIR]
        (source root also from env DESIGN_REPO_SOURCE_ROOT; default: the folder containing design-repo/, if it
         looks like the source project). Exit code 0 == all hard checks passed.
Drift proofs (scratch-copy mutation tests): extraction/prove_drift.sh
"""
import glob, json, os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(HERE)  # extraction/ -> repo root (never hardcoded)
sys.path.insert(0, os.path.join(REPO, "schema"))

PINNED_POLICIES = {  # compliance-critical roles pinned to ONE exact generationPolicy (not just enum membership)
    "brand-logomark": "must-reuse-exact", "brand-logo-trace": "must-reuse-exact",
    "integration-logo": "must-not-fabricate", "demo-avatar-image": "must-not-fabricate", "demo-scene-image": "must-not-fabricate",
    "footer-video-asset": "must-not-fabricate", "video-poster": "must-not-fabricate", "font-file": "must-not-fabricate",
    "lightbox-video-stream": "must-not-reuse-live-endpoint", "signup-submit-stub": "must-not-reuse-live-endpoint", "external-social-link": "must-not-reuse-live-endpoint",
}
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
    for need in ["extraction/prove_drift.sh", "schema/tests/adversarial_test.py", "schema/semantic_validate.py"]:
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
    for tid, t in tpl["templates"].items():
        for r in t["routes"]:
            nodes = [{"section": n["section"], "variant": n["variants"][0], "content": secs[n["section"]]["exemplar"]["content"], "motion": secs[n["section"]]["exemplar"]["motion"]} for n in t["nodes"]]
            e, _ = sv.validate({"pageSpecVersion": "1.0.0", "template": tid, "route": r, "head": t["head"], "nodes": nodes}, REPO, ctx)
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
    # ---- asset roles
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
    # ---- ia.json + citations (need a source tree)
    root = source_root(argv)
    if not root:
        warn("no source tree found (sibling of design-repo or --source-root): ia.json cross-check, citation-range and quote spot-checks SKIPPED")
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
    return finish(argv)


def finish(argv):
    print("\nRESULT: %s  (%d passed, %d failed, %d warnings)" % ("PASS" if not FAILS else "FAIL", len(PASSES), len(FAILS), len(WARNS)))
    return 1 if FAILS else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
