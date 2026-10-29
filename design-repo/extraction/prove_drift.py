#!/usr/bin/env python3
"""Proves extraction/verify_all.py actually catches drift (MASTER-GUIDE 3.2 / 3.4 / 3.16 / 3.23, baseline R3/R5/R8/R9).

For each case: copy design-repo/ to a fresh scratch dir, inject ONE defect, run verify_all.py there (with --source-root
pointing at the real source project so citations, source ranges and policy evidence can be re-read) and require that
it exits non-zero AND that the named check prints FAIL. Controls: a clean copy passes; a copy run without any source
tree passes with the source-dependent checks downgraded to a WARN; a HERO between 1800 and 3000px only warns.

Usage: python3 extraction/prove_drift.py [--scratch DIR] [--source-root DIR]
       --scratch      where the scratch copies go (default: the OS temp dir); removed afterwards
       --source-root  the source project (default: the folder containing design-repo/, if it holds ia.json)
Exit 1 if any case is missed or any control misbehaves.
"""
import sys
sys.dont_write_bytecode = True

import json
import os
import re
import shutil
import subprocess
import tempfile

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def edit_json(root, rel, fn):
    p = os.path.join(root, rel)
    with open(p, encoding="utf-8") as f:
        d = json.load(f)
    fn(d)
    with open(p, "w", encoding="utf-8") as f:
        json.dump(d, f, indent=2, ensure_ascii=False)
        f.write("\n")


def edit_text(root, rel, old, new):
    """Replace an anchor that MUST exist, so a refactor cannot turn a case into a silent no-op."""
    p = os.path.join(root, rel)
    with open(p, encoding="utf-8") as f:
        t = f.read()
    if old not in t:
        raise SystemExit("prove_drift: anchor not found in %s: %r" % (rel, old[:80]))
    with open(p, "w", encoding="utf-8") as f:
        f.write(t.replace(old, new, 1))


def node(d, sec):
    return next(n for n in d["nodes"] if n["section"] == sec)


def set_h(d, route, sec, h, i=0):
    sh = d["sectionHeights"]
    rt = next(x for x in sh["routes"] if x["route"] == route)
    inst = [x for x in rt["sections"] if x["section"] == sec][i]
    rt["pageHeightPx"] += h - inst["heightPx"]
    inst["heightPx"] = h
    sh["sections"][sec]["maxHeightPx"] = max(x["heightPx"] for t in sh["routes"] for x in t["sections"] if x["section"] == sec)


AR, MV, POL, AL = "assets/asset-roles.json", "extraction/measured-values.json", "assets/generation-policy.json", "tokens/llm/component-allowlist.json"
SV, VA, WG = "schema/semantic_validate.py", "extraction/verify_all.py", "extraction/wrapper_gate.py"


def loosen_logo_everywhere(r):
    """Registry, allowlist mirror AND semantic_validate's pin all say generation-safe: only verify_all's own table objects."""
    edit_json(r, AR, lambda d: (d["roles"]["brand-logomark"].__setitem__("availability", "generation-safe"),
                                d["registeredAssets"]["logo--mark"].__setitem__("generationUse", "generation-safe")))
    edit_json(r, AL, lambda d: d["generationSafeAssetRoles"].append("brand-logomark"))
    edit_text(r, SV, '"brand-logomark": "clone-only", "brand-logo-trace": "clone-only", "demo-scene-image": "clone-only",',
              '"brand-logomark": "generation-safe", "brand-logo-trace": "clone-only", "demo-scene-image": "clone-only",')


def unpin_lightbox_everywhere(r):
    """Contract, allowlist AND semantic_validate's pin all flipped: only verify_all's own RETRIEVAL_PINNED objects."""
    def c(d):
        d["retrievalEligible"] = True
        d.pop("retrievalIneligibleReason", None)
    edit_json(r, "sections/overlay.video-lightbox.json", c)
    edit_json(r, AL, lambda d: d["retrievalIneligibleSections"].remove("overlay.video-lightbox"))
    edit_text(r, SV, '"overlay.video-lightbox", "shell.binder-rails"', '"shell.binder-rails"')
    edit_text(r, SV, 'RUNTIME_UI_RE = re.compile(r"overlay|', 'RUNTIME_UI_RE = re.compile(r"overlay-x|')


def gen_logo_leak(d):
    node(d, "shell.nav-sheet")["content"]["logoMark"] = {"assetRole": "brand-logomark", "assetRef": "logo--mark"}


CASES = [
    # ---- parity, counts, closure (ported from the former prove_drift.sh)
    ("phantom allowlist entry (section with no contract file)", "allowlist parity: sections",
     lambda r: edit_json(r, AL, lambda d: d["sections"].append("hero.phantom"))),
    ("orphan contract file (no allowlist entry)", "allowlist parity: primitives",
     lambda r: edit_json(r, AL, lambda d: d["primitives"].remove("button"))),
    ("wrong manifest count", "manifest counts", lambda r: edit_json(r, "registry.manifest.json", lambda d: d["counts"].__setitem__("sections", 17))),
    ("allowlistVersion drift", "manifest allowlistVersion", lambda r: edit_json(r, "registry.manifest.json", lambda d: d.__setitem__("allowlistVersion", "9.9.9"))),
    ("pinned policy changed to a different-but-valid value", "asset-role closure + PINNED_POLICIES",
     lambda r: edit_json(r, AR, lambda d: d["roles"]["lightbox-video-stream"].__setitem__("generationPolicy", "may-generate-new"))),
    ("schema assetRole enum drifts from the registry", "schema assetRole enum",
     lambda r: edit_json(r, "schema/pagespec.schema.json", lambda d: d["definitions"]["assetRole"]["enum"].append("image"))),
    ("schema motion opened (additionalProperties true)", "all object schemas",
     lambda r: edit_json(r, "schema/pagespec.schema.json", lambda d: d["definitions"]["motion"].__setitem__("additionalProperties", True))),
    ("section contract edited without regenerating the schema branch", "schema section branches",
     lambda r: edit_json(r, "sections/hero.headline-integrations.json", lambda d: d["content"]["properties"]["headline"].__setitem__("x-maxWords", 99))),
    ("token catalog lists a phantom token", "token-catalog.json lists", lambda r: edit_json(r, "tokens/llm/token-catalog.json", lambda d: d["tokens"]["color"].append("color.green.phantom"))),
    ("absolute local path introduced", "no absolute local paths", lambda r: edit_text(r, "README.md", "# Operate design-repo", "# Operate design-repo\n/Us" + "ers/someone/design-repo")),
    ("entryPoint escaping the package", "manifest entryPoints", lambda r: edit_json(r, "registry.manifest.json", lambda d: d["entryPoints"].__setitem__("evidence", "../ia.json"))),
    # ---- R3 availability pins and substitutes
    ("registry availability edit: brand-logomark -> generation-safe", "every role has a closed availability",
     lambda r: edit_json(r, AR, lambda d: d["roles"]["brand-logomark"].__setitem__("availability", "generation-safe"))),
    ("registry availability set to an invented value", "every role has a closed availability",
     lambda r: edit_json(r, AR, lambda d: d["roles"]["integration-logo"].__setitem__("availability", "reference-only"))),
    ("registry + allowlist + semantic_validate pin loosened together (verify_all's own table still objects)", "every role has a closed availability", loosen_logo_everywhere),
    ("pin removed from verify_all.py (registry unchanged)", "every role has a closed availability",
     lambda r: edit_text(r, VA, '    "brand-logomark": "clone-only", "brand-logo-trace": "clone-only", "demo-scene-image": "clone-only",\n',
                         '    "brand-logo-trace": "clone-only", "demo-scene-image": "clone-only",\n')),
    ("pin removed from semantic_validate.py (registry unchanged)", "PINNED_AVAILABILITY in schema/semantic_validate.py",
     lambda r: edit_text(r, SV, '"brand-logomark": "clone-only", "brand-logo-trace": "clone-only", "demo-scene-image": "clone-only",',
                         '"brand-logo-trace": "clone-only", "demo-scene-image": "clone-only",')),
    ("clone-only asset reclassified as generation-safe", "registered assets",
     lambda r: edit_json(r, AR, lambda d: d["registeredAssets"]["logo--mark"].__setitem__("generationUse", "generation-safe"))),
    ("blocked integration logo loses its generation-safe placeholder", "registered assets",
     lambda r: edit_json(r, AR, lambda d: d["registeredAssets"].pop("placeholder--integration-b"))),
    ("placeholder URL points at a real host", "registered assets",
     lambda r: edit_json(r, AR, lambda d: d["registeredAssets"]["placeholder--stream"].__setitem__("placeholderUrl", "https://stream.mux.com/x.m3u8"))),
    ("substitute list emptied on a blocked role", "generationSafeSubstitutes",
     lambda r: edit_json(r, AR, lambda d: d["roles"]["integration-logo"].__setitem__("generationSafeSubstitutes", []))),
    ("substitute points at a clone-only role", "generationSafeSubstitutes",
     lambda r: edit_json(r, AR, lambda d: d["roles"]["demo-avatar-image"].__setitem__("generationSafeSubstitutes", ["brand-logomark"]))),
    ("brand-logomark made must-reuse-exact AND generation-safe", "brand-logomark / brand-logo-trace",
     lambda r: (edit_text(r, VA, '    "brand-logomark": "clone-only", "brand-logo-trace": "clone-only", "demo-scene-image": "clone-only",\n',
                          '    "brand-logomark": "generation-safe", "brand-logo-trace": "clone-only", "demo-scene-image": "clone-only",\n'))),
    # ---- R1/R2 generation mode
    ("generation policy stops blocking a demo-avatar person", "generation-policy blocks every demo-avatar person",
     lambda r: edit_json(r, POL, lambda d: d["blockedTerms"]["people"].__setitem__("terms", [t for t in d["blockedTerms"]["people"]["terms"] if t["term"] != "Eminem"]))),
    ("generation allowed to use clone-only assets", "generation-policy: categories",
     lambda r: edit_json(r, POL, lambda d: d["allowedAvailability"]["generation"].append("clone-only"))),
    ("generated example leaks an Operate asset", "schema/example.generated.pagespec.json: mode generation",
     lambda r: edit_json(r, "schema/example.generated.pagespec.json", gen_logo_leak)),
    ("generated legal example leaks a live URL in copy", "schema/example.generated.legal.pagespec.json: mode generation",
     lambda r: edit_json(r, "schema/example.generated.legal.pagespec.json", lambda d: d["head"].__setitem__("description", d["head"]["description"] + " See https://operate.so."))),
    ("generation-safe example for a template family deleted", "a generation-safe example PageSpec exists for every template family",
     lambda r: os.remove(os.path.join(r, "schema", "example.generated.sign-up.pagespec.json"))),
    ("a per-category generation rule dropped from the graph", "graph has the six per-category GENERATION_MODE_* rules",
     lambda r: edit_json(r, "compatibility/graph.json", lambda d: d.__setitem__("rules", [x for x in d["rules"] if x["id"] != "GENERATION_MODE_PERSON"]))),
    ("graph params category swapped between two rules", "graph has the six per-category GENERATION_MODE_* rules",
     lambda r: edit_json(r, "compatibility/graph.json", lambda d: next(x for x in d["rules"] if x["id"] == "GENERATION_MODE_URL")["params"].__setitem__("category", "COPY"))),
    ("validator stops enforcing generation mode (every category returns nothing)", "generation-mode enforcement probe",
     lambda r: edit_text(r, SV, "        return generation_findings(ctx, spec)[category]", "        return []")),
    ("validator stops checking hosts in generation mode (URL category only)", "generation-mode enforcement probe",
     lambda r: edit_text(r, SV, "        for host in _bad_hosts(_clean(s), pol):", "        for host in []:")),
    ("validator trusts the registry instead of its pin (pin lookup, placeholder-name and registered-role checks bypassed)", "generation-mode enforcement probe",
     lambda r: (edit_text(r, SV, "    pinned = PINNED_AVAILABILITY.get(role)\n", "    pinned = roles.get(role, {}).get(\"availability\")\n"),
                edit_text(r, SV, " or not ref.startswith(GENERATION_SAFE_REF_PREFIX):", ":"),
                edit_text(r, SV, "if x.get(\"role\") in PINNED_AVAILABILITY and PINNED_AVAILABILITY[x[\"role\"]] != \"generation-safe\":", "if False:"))),
    # ---- R7/R8 section contracts
    ("runtime-UI lightbox flipped to retrievalEligible true", "section contracts",
     lambda r: edit_json(r, "sections/overlay.video-lightbox.json", lambda d: (d.__setitem__("retrievalEligible", True), d.pop("retrievalIneligibleReason")))),
    ("content section (manifesto) marked ineligible", "section contracts",
     lambda r: edit_json(r, "sections/story.manifesto.json", lambda d: d.update({"retrievalEligible": False, "retrievalIneligibleReason": "Pretend the manifesto is utility chrome so it never reaches retrieval."}))),
    ("retrieval reason shortened below 30 characters", "section contracts",
     lambda r: edit_json(r, "sections/shell.binder-rails.json", lambda d: d.__setitem__("retrievalIneligibleReason", "layout only"))),
    ("retrieval pin removed from contract + allowlist + semantic_validate (verify_all's own table still objects)", "section contracts", unpin_lightbox_everywhere),
    ("allowlist retrieval mirror drifts", "section contracts", lambda r: edit_json(r, AL, lambda d: d["retrievalIneligibleSections"].append("story.manifesto"))),
    ("sign-up form re-classed FEATURE", "section contracts", lambda r: edit_json(r, "sections/form.sign-up-form.json", lambda d: d["semantic"].__setitem__("category", "FEATURE"))),
    ("unknown key added to source (closed schema)", "section contracts", lambda r: edit_json(r, "sections/hero.headline-integrations.json", lambda d: d["source"].__setitem__("selector", "section"))),
    ("legacy top-level category re-added", "section contracts", lambda r: edit_json(r, "sections/hero.headline-integrations.json", lambda d: d.__setitem__("category", "HERO"))),
    ("semantic.id differs from the contract id", "section contracts", lambda r: edit_json(r, "sections/product.demo.json", lambda d: d["semantic"].__setitem__("id", "product.video"))),
    ("source range shifted (in range, wrong lines)", "section source ranges", lambda r: edit_json(r, "sections/shell.nav-sheet.json", lambda d: d["source"].__setitem__("lines", "1-4"))),
    ("source tag that the range never renders", "section source ranges", lambda r: edit_json(r, "sections/story.manifesto.json", lambda d: d["source"].__setitem__("tag", "article"))),
    ("source file that does not exist", "section source ranges", lambda r: edit_json(r, "sections/hero.headline-integrations.json", lambda d: d["source"].__setitem__("file", "src/components/HeroSection.jsx"))),
    # ---- R9 wrapper gate
    ("HERO measured 3100px (page wrapper)", "wrapper gate:", lambda r: edit_json(r, MV, lambda d: set_h(d, "/", "hero.headline-integrations", 3100))),
    ("one legal section holds 65% of /terms", "wrapper gate:", lambda r: edit_json(r, MV, lambda d: set_h(d, "/terms", "legal.document-section", 22000, 9))),
    ("section measurement deleted", "wrapper gate:", lambda r: edit_json(r, MV, lambda d: d["sectionHeights"]["sections"].pop("product.ops-steps"))),
    ("sectionHeights block deleted", "wrapper gate:", lambda r: edit_json(r, MV, lambda d: d.pop("sectionHeights"))),
    ("measured at the wrong viewport", "wrapper gate:", lambda r: edit_json(r, MV, lambda d: d["sectionHeights"]["viewport"].__setitem__("width", 1280))),
    ("HERO 3100px with a whitelist entry whose justification is too short", "wrapper gate:",
     lambda r: (edit_json(r, MV, lambda d: set_h(d, "/", "hero.headline-integrations", 3100)),
                edit_json(r, "extraction/wrapper-whitelist.json", lambda d: d["entries"].append({"kind": "hero-height", "route": "/", "section": "hero.headline-integrations", "maxHeightPx": 3200,
                                                                                                    "reviewedBy": "drift-test (automated reviewer; not a human sign-off)", "attestation": "agent", "reviewedOn": "2026-10-29", "justification": "ok"})))),
    ("gate threshold loosened in wrapper_gate.py", "wrapper gate thresholds pinned", lambda r: edit_text(r, WG, "HERO_FAIL_PX = 3000", "HERO_FAIL_PX = 30000")),
    # ---- citations (need the source tree)
    ("out-of-range citation", "citation validity", lambda r: edit_json(r, "sections/hero.headline-integrations.json", lambda d: d["measuredFrom"].append("src/components/Hero.jsx:9999"))),
    ("in-range citation whose quoted text is no longer on that line", "citation spot-checks",
     lambda r: edit_json(r, MV, lambda d: d["spotChecks"][0].__setitem__("quote", "this text is not in the cited line"))),
    ("citation to a file that does not exist", "citation validity", lambda r: edit_json(r, "sections/shell.binder-rails.json", lambda d: d["measuredFrom"].append("src/nope.jsx:1"))),
    ("blocked term with an evidence line that does not contain it", "generation-policy evidence",
     lambda r: edit_json(r, POL, lambda d: d["blockedTerms"]["people"]["terms"][0].__setitem__("evidence", ["src/components/demo/Panels.jsx:1"]))),
    ("invented blocked host with made-up evidence", "generation-policy evidence",
     lambda r: edit_json(r, POL, lambda d: d["blockedHosts"]["hosts"].append({"host": "invented.example-live.com", "evidence": ["src/components/FooterSheet.jsx:10"]}))),
]
SOURCE_DEPENDENT = {"citation validity", "citation spot-checks", "section source ranges", "generation-policy evidence"}


def run_verify(root, source_root):
    p = subprocess.run([sys.executable, "-B", os.path.join(root, "extraction", "verify_all.py"), "--source-root", source_root],
                       stdout=subprocess.PIPE, stderr=subprocess.STDOUT, universal_newlines=True)
    return p.returncode, p.stdout


def fresh_copy(parent):
    dst = os.path.join(tempfile.mkdtemp(dir=parent), "design-repo")
    shutil.copytree(REPO, dst, ignore=shutil.ignore_patterns("__pycache__", "*.pyc", ".DS_Store"))
    return dst


def main(argv):
    source_root = os.path.abspath(argv[argv.index("--source-root") + 1]) if "--source-root" in argv else os.path.dirname(REPO)
    scratch = os.path.abspath(argv[argv.index("--scratch") + 1]) if "--scratch" in argv else None
    if scratch:
        os.makedirs(scratch, exist_ok=True)
    parent = tempfile.mkdtemp(prefix="operate-drift-", dir=scratch)
    have_source = os.path.isfile(os.path.join(source_root, "ia.json")) and os.path.isdir(os.path.join(source_root, "src"))
    bad = skipped = 0
    try:
        rc, out = run_verify(fresh_copy(parent), source_root)
        ok = rc == 0
        bad += not ok
        print("%s  control: clean copy passes verify_all.py (rc=%d)" % ("PASS" if ok else "FAIL", rc))
        if not ok:
            print(out)
        empty = tempfile.mkdtemp(dir=parent)
        rc, out = run_verify(fresh_copy(parent), empty)
        ok = rc == 0 and "WARN  no source tree found" in out
        bad += not ok
        print("%s  control: no source tree -> citation/source/evidence checks downgraded to WARN, run still passes (rc=%d)" % ("PASS" if ok else "FAIL", rc))
        root = fresh_copy(parent)
        edit_json(root, MV, lambda d: set_h(d, "/", "hero.headline-integrations", 1900))
        rc, out = run_verify(root, source_root)
        ok = rc == 0 and re.search(r"^WARN  wrapper gate: HERO hero.headline-integrations is 1900px", out, re.M) is not None
        bad += not ok
        print("%s  control: HERO at 1900px only warns (rc=%d)" % ("PASS" if ok else "FAIL", rc))
        for name, check, inject in CASES:
            if check in SOURCE_DEPENDENT and not have_source:
                skipped += 1
                print("SKIP   %s (needs the source tree)" % name)
                continue
            root = fresh_copy(parent)
            inject(root)
            rc, out = run_verify(root, source_root)
            failed = [l for l in out.splitlines() if l.startswith("FAIL  ") and check in l]
            ok = rc != 0 and bool(failed)
            bad += not ok
            print("%s  %s" % ("CAUGHT" if ok else "MISSED", name))
            print("        " + (failed[0][:180] if ok else "expected a FAIL line containing %r (rc=%d)" % (check, rc)))
    finally:
        shutil.rmtree(parent, ignore_errors=True)
    print("\nprove_drift: %d drift cases (%d skipped: no source tree) + 3 controls, %d problem(s)" % (len(CASES), skipped, bad))
    return 1 if bad else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
