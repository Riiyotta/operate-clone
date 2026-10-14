#!/usr/bin/env python3
"""Adversarial suite: every mutation must be REJECTED (and by the expected layer); every control must PASS.
Usage: python3 schema/tests/adversarial_test.py   (exit 0 only if all mutations rejected and all controls pass)"""
import copy, json, os, sys

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(os.path.dirname(HERE))
sys.path.insert(0, os.path.join(REPO, "schema"))
import semantic_validate as sv  # noqa: E402

CTX = sv.load_context(REPO)
EX = json.load(open(os.path.join(REPO, "schema", "example.pagespec.json"), encoding="utf-8"))


def node(spec, sec):
    return next(n for n in spec["nodes"] if n["section"] == sec)


def drop(spec, sec):
    spec["nodes"] = [n for n in spec["nodes"] if n["section"] != sec]


def synth(tid, route):
    t = CTX["templates"]["templates"][tid]
    nodes = []
    for n in t["nodes"]:
        s = CTX["sections"][n["section"]]
        nodes.append({"section": n["section"], "variant": n["variants"][0], "content": copy.deepcopy(s["exemplar"]["content"]), "motion": copy.deepcopy(s["exemplar"]["motion"])})
    return {"pageSpecVersion": "1.0.0", "template": tid, "route": route, "head": copy.deepcopy(t["head"]), "nodes": nodes}


MUT = []  # (name, expected layer, mutator)


def m(name, layer):
    def deco(fn):
        MUT.append((name, layer, fn)); return fn
    return deco


# ---------------- schema layer
@m("schema: invented template id", "schema")
def _(s): s["template"] = "template.pricing"
@m("schema: node missing required motion", "schema")
def _(s): del s["nodes"][0]["motion"]
@m("schema: invented section id (type alias)", "schema")
def _(s): s["nodes"][4]["section"] = "hero.rotating-word"
@m("schema: missing reducedMotionFallback", "schema")
def _(s): del node(s, "hero.headline-integrations")["motion"]["reducedMotionFallback"]
@m("schema: invented motion field (additionalProperties closed)", "schema")
def _(s): node(s, "hero.headline-integrations")["motion"]["inventedAnimation"] = "bounce"
@m("schema: invented assetRole 'image'", "schema")
def _(s): node(s, "hero.headline-integrations")["content"]["integrationLogos"][0]["assetRole"] = "image"
@m("schema: invented extra node property", "schema")
def _(s): s["nodes"][0]["style"] = {"color": "red"}
@m("schema: motion value off the measured const (hover 999ms)", "schema")
def _(s): node(s, "hero.headline-integrations")["motion"]["durationMs"] = 999
@m("schema: motion easing off the measured value", "schema")
def _(s): node(s, "product.ops-steps")["motion"]["easing"] = "ease-in-out"
@m("schema: extra content property", "schema")
def _(s): node(s, "hero.headline-integrations")["content"]["subtitle"] = "x"
@m("schema: valid-vocabulary role not allowed on this field", "schema")
def _(s): node(s, "hero.headline-integrations")["content"]["integrationLogos"][0] = {"assetRole": "brand-logomark", "assetRef": "logo--mark"}
@m("schema: malformed assetRef", "schema")
def _(s): node(s, "shell.nav-sheet")["content"]["logoMark"]["assetRef"] = "Some File.png"
@m("schema: missing required content field", "schema")
def _(s): del node(s, "hero.headline-integrations")["content"]["headline"]
@m("schema: missing head", "schema")
def _(s): del s["head"]
@m("schema: extra top-level property", "schema")
def _(s): s["theme"] = "dark"
@m("schema: wrong pageSpecVersion", "schema")
def _(s): s["pageSpecVersion"] = "2.0.0"
@m("schema: ops steps count not 4", "schema")
def _(s): node(s, "product.ops-steps")["content"]["steps"].pop()
@m("schema: variant not in the section's variant enum", "schema")
def _(s): node(s, "form.sign-up-form")["variant"] = "inline"
# ---------------- structural / template cross-reference
@m("structural: duplicate one-per-page hero", "semantic")
def _(s): s["nodes"].insert(5, copy.deepcopy(node(s, "hero.headline-integrations")))
@m("structural: required nav-sheet removed", "semantic")
def _(s): drop(s, "shell.nav-sheet")
@m("structural: fixed-position backdrop moved to the end", "semantic")
def _(s): s["nodes"].append(s["nodes"].pop(0))
@m("structural: declared template.sign-up but home node list", "semantic")
def _(s): s["template"] = "template.sign-up"; s["route"] = "/sign-up"
@m("structural: route not owned by the declared template", "semantic")
def _(s): s["route"] = "/privacy"
@m("structural: legal section placed on the homepage", "semantic")
def _(s): s["nodes"].append({"section": "legal.back-link", "variant": "default", "content": {"label": "← Back to Operate", "href": "/"}, "motion": {"pattern": "static", "trigger": "none", "reducedMotionFallback": "not-applicable"}})
@m("structural: standalone form variant on the homepage", "semantic")
def _(s): node(s, "form.sign-up-form")["variant"] = "standalone"
@m("structural: footer before hero (reordered)", "semantic")
def _(s):
    i, j = [n["section"] for n in s["nodes"]].index("hero.headline-integrations"), [n["section"] for n in s["nodes"]].index("shell.footer-sheet")
    s["nodes"][i], s["nodes"][j] = s["nodes"][j], s["nodes"][i]
@m("structural: overlay placed before the footer", "semantic")
def _(s):
    n = s["nodes"].pop([x["section"] for x in s["nodes"]].index("overlay.video-lightbox")); s["nodes"].insert(8, n)
@m("structural: form without its modal on home", "semantic")
def _(s): drop(s, "overlay.sign-up-modal")
@m("structural: leave-confirm without the form", "semantic")
def _(s): drop(s, "form.sign-up-form")
@m("structural: extra section on the 404 template", "semantic")
def _(s): s["nodes"].append(copy.deepcopy(EX["nodes"][2]))
@m("structural: hero on the hero-less legal template", "semantic")
def _(s): s["nodes"].insert(0, copy.deepcopy(node(EX, "hero.headline-integrations")))
@m("structural: non-repeatable legal body duplicated", "semantic")
def _(s): s["nodes"].append(copy.deepcopy(s["nodes"][-1]))
@m("structural: required legal header removed", "semantic")
def _(s): drop(s, "legal.document-header")
# ---------------- asset registry
@m("assets: well-formed but unregistered assetRef (hero logo)", "semantic")
def _(s): node(s, "hero.headline-integrations")["content"]["integrationLogos"][0]["assetRef"] = "integration--unknown"
@m("assets: well-formed but unregistered assetRef (demo avatar)", "semantic")
def _(s): node(s, "product.demo")["content"]["people"][0]["assetRef"] = "avatar--demo-99"
@m("assets: registered ref declared with the wrong role", "semantic")
def _(s): node(s, "hero.headline-integrations")["content"]["integrationLogos"][0] = {"assetRole": "integration-logo", "assetRef": "avatar--demo-1"}
@m("assets: unregistered external social link", "semantic")
def _(s): node(s, "shell.footer-sheet")["content"]["socialLinks"][0]["link"]["assetRef"] = "social--facebook"
# ---------------- runtime budgets
@m("runtime: hero headline over maxWords", "semantic")
def _(s): node(s, "hero.headline-integrations")["content"]["headline"] = "word " * 30
@m("runtime: manifesto paragraph over maxWords", "semantic")
def _(s): node(s, "story.manifesto")["content"]["paragraphs"][0] = "lorem " * 80
@m("runtime: head title over maxWords", "semantic")
def _(s): s["head"]["title"] = "title " * 20
@m("runtime: legal paragraph over maxChars", "semantic")
def _(s): node(s, "legal.document-body")["content"]["blocks"][1]["text"] = "x" * 1867
@m("runtime: legal h2 over its char limit", "semantic")
def _(s): node(s, "legal.document-body")["content"]["blocks"][0]["text"] = "h" * 36
@m("runtime: legal hr carrying text", "semantic")
def _(s): node(s, "legal.document-body")["content"]["blocks"][4]["text"] = "nope"
@m("runtime: legal ul missing items", "semantic")
def _(s): del node(s, "legal.document-body")["content"]["blocks"][3]["items"]; node(s, "legal.document-body")["content"]["blocks"][3]["text"] = "t"

BASE = {  # which base spec each mutation starts from
    "structural: declared template.sign-up but home node list": "home", "structural: extra section on the 404 template": "nf",
    "structural: hero on the hero-less legal template": "legal", "structural: non-repeatable legal body duplicated": "legal", "structural: required legal header removed": "legal",
    "structural: leave-confirm without the form": "home",
}
LEGAL_ONLY = {n for n, b in BASE.items() if b == "legal"} | {"runtime: legal paragraph over maxChars", "runtime: legal h2 over its char limit", "runtime: legal hr carrying text", "runtime: legal ul missing items"}


def base_for(name):
    if name in LEGAL_ONLY:
        return synth("template.legal", "/privacy")
    if BASE.get(name) == "nf":
        return synth("template.not-found", "*")
    return copy.deepcopy(EX)


def main():
    fails, total = 0, 0
    print("== mutations (each must be rejected by the expected layer) ==")
    for name, layer, fn in MUT:
        spec = base_for(name)
        fn(spec)
        errs, _ = sv.validate(spec, REPO, CTX)
        total += 1
        ok = bool(errs) and any(e.startswith("[%s]" % layer) for e in errs)
        fails += 0 if ok else 1
        print("%s  %s  -> %s" % ("PASS" if ok else "FAIL", name, (errs[0][:110] if errs else "ACCEPTED (bad)")))
    print("== controls (must produce zero errors) ==")
    controls = [("example.pagespec.json (template.home)", copy.deepcopy(EX))]
    for tid, t in CTX["templates"]["templates"].items():
        for r in t["routes"]:
            controls.append(("synthesized from section exemplars: %s @ %s" % (tid, r), synth(tid, r)))
    for name, spec in controls:
        errs, _ = sv.validate(spec, REPO, CTX)
        total += 1
        ok = not errs
        fails += 0 if ok else 1
        print("%s  %s%s" % ("PASS" if ok else "FAIL", name, "" if ok else "  -> " + errs[0]))
    # warn-severity control: removing the optional leave-confirm yields a warning, never an error
    s = copy.deepcopy(EX); drop(s, "overlay.leave-confirm")
    errs, warns = sv.validate(s, REPO, CTX)
    total += 1
    ok = not errs and any("FORM_PAIRED_WITH_LEAVE_CONFIRM" in w for w in warns)
    fails += 0 if ok else 1
    print("%s  control: severity respected (leave-confirm omitted -> warn only; errors=%d warns=%d)" % ("PASS" if ok else "FAIL", len(errs), len(warns)))
    # both-directions control for a corrected rule: sign-up template has NO hero and passes; home with a hero passes
    s = synth("template.sign-up", "/sign-up")
    errs, _ = sv.validate(s, REPO, CTX)
    total += 1
    ok = not errs and not any(n["section"].startswith("hero.") for n in s["nodes"])
    fails += 0 if ok else 1
    print("%s  control: hero-less template accepted by ONE_HERO exemption (read from compatibility/graph.json)" % ("PASS" if ok else "FAIL"))
    print("\n%d checks, %d failed" % (total, fails))
    return 1 if fails else 0


if __name__ == "__main__":
    sys.exit(main())
