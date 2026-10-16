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
GEN = json.load(open(os.path.join(REPO, "schema", "example.generated.pagespec.json"), encoding="utf-8"))
RULE = "GENERATION_MODE_CLONE_ISOLATION"


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
    return {"pageSpecVersion": "1.1.0", "mode": "clone", "template": tid, "route": route, "head": copy.deepcopy(t["head"]), "nodes": nodes}


MUT = []  # (name, expected layer, mutator, required marker in some error or None)


def m(name, layer, marker=None):
    def deco(fn):
        MUT.append((name, layer, fn, marker)); return fn
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
@m("schema: missing mode", "schema")
def _(s): del s["mode"]
@m("schema: invented mode value", "schema")
def _(s): s["mode"] = "generated"
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

# ---------------- generation mode (base: schema/example.generated.pagespec.json unless named "generation(clone):")
def gset(s, sec, path, val):
    o = node(s, sec)["content"]
    for k in path[:-1]: o = o[k]
    o[path[-1]] = val
def gref(s, sec, path, role, ref):
    gset(s, sec, path, {"assetRole": role, "assetRef": ref})
G = lambda name, marker=RULE: m("generation: " + name, "semantic", marker)

@G("Operate logo mark in the nav")
def _(s): gref(s, "shell.nav-sheet", ["logoMark"], "brand-logomark", "logo--mark")
@G("Operate logo mark in the footer")
def _(s): gref(s, "shell.footer-sheet", ["logoMark"], "brand-logomark", "logo--mark")
@G("Operate logo-trace loop")
def _(s): gref(s, "story.manifesto", ["logoTrace"], "brand-logo-trace", "logo-trace--loop")
@G("Operate wordmark text")
def _(s): gset(s, "shell.nav-sheet", ["wordmarkText"], "Operate")
@G("Operate wordmark in upper case (ticket brand)")
def _(s): gset(s, "story.manifesto", ["ticket", "brand"], "OPERATE")
@G("Operate company name in the copyright line")
def _(s): gset(s, "shell.footer-sheet", ["copyright"], "© 2027 Operate Machine Co. All rights reserved.")
@G("Operate name hidden with a zero-width character")
def _(s): gset(s, "shell.nav-sheet", ["wordmarkText"], "Oper​ate")
@G("Operate name in the page title")
def _(s): s["head"]["title"] = "Operate – Scheduling"
@G("integration logo (Slack) in the hero bubbles")
def _(s): gref(s, "hero.headline-integrations", ["integrationLogos", 3], "integration-logo", "integration--slack")
@G("integration logo (HubSpot) replacing the plus glyph")
def _(s): gref(s, "hero.headline-integrations", ["integrationLogos", 0], "integration-logo", "integration--hubspot")
@G("integration logo (Gong) well-formed but clone-only registry entry")
def _(s): gref(s, "hero.headline-integrations", ["integrationLogos", 2], "integration-logo", "integration--gong")
@G("third-party names in the integration screen-reader text")
def _(s): gset(s, "hero.headline-integrations", ["integrationSrText"], "Granola, Gong, Slack, Gmail, HubSpot and more")
@G("real demo avatar image")
def _(s): gref(s, "product.demo", ["people", 0], "demo-avatar-image", "avatar--demo-1")
@G("real-person avatar (celebrity name in the file) ")
def _(s): gref(s, "product.demo", ["people", 4], "demo-avatar-image", "avatar--demo-5")
@G("real person's name in copy")
def _(s): gset(s, "product.demo", ["workspaceName"], "Kierra Torres")
@G("real person's name in the composer placeholder, odd casing")
def _(s): gset(s, "product.demo", ["composerPlaceholder"], "Ask EMINEM about jobs...")
@G("proprietary Slack-conversation scene image")
def _(s): gref(s, "product.demo", ["conversationBackground"], "demo-scene-image", "scene--demo-slack")
@G("proprietary video poster (product screenshot)")
def _(s): gref(s, "overlay.video-lightbox", ["poster"], "video-poster", "poster--lightbox")
@G("proprietary footer still (desktop)")
def _(s): gref(s, "shell.footer-sheet", ["videoCard", "stillDesktop"], "footer-video-asset", "footer--still-desktop")
@G("proprietary footer still (mobile)")
def _(s): gref(s, "shell.footer-sheet", ["videoCard", "stillMobile"], "footer-video-asset", "footer--still-mobile")
@G("proprietary footer product footage loop")
def _(s): gref(s, "shell.footer-sheet", ["videoCard", "loop"], "footer-video-asset", "footer--loop")
@G("Operate background texture file")
def _(s): gref(s, "backdrop.animated-background", ["texture"], "background-texture", "texture--home-background")
@G("live video stream endpoint")
def _(s): gref(s, "overlay.video-lightbox", ["stream"], "lightbox-video-stream", "stream--lightbox-demo")
@G("sign-up submit endpoint of the source")
def _(s): gref(s, "form.sign-up-form", ["submitEndpoint"], "signup-submit-stub", "endpoint--signup-stub")
@G("real LinkedIn profile link")
def _(s): gref(s, "shell.footer-sheet", ["socialLinks", 0, "link"], "external-social-link", "social--linkedin")
@G("real X profile link")
def _(s): gref(s, "shell.footer-sheet", ["socialLinks", 1, "link"], "external-social-link", "social--x")
@G("LinkedIn label in the footer")
def _(s): gset(s, "shell.footer-sheet", ["socialLinks", 0, "label"], "LinkedIn")
@G("raw Operate URL in copy")
def _(s): gset(s, "hero.headline-integrations", ["introAfter"], "Read more at https://operate.so/sign-up today.")
@G("raw non-reserved URL that merely starts with example.com")
def _(s): gset(s, "hero.headline-integrations", ["introAfter"], "Read more at https://example.com.evil.io/x today.")
@G("bare domain in copy")
def _(s): gset(s, "hero.headline-integrations", ["introAfter"], "Visit fieldwork.io for the details.")
@G("protocol-relative CDN host in copy")
def _(s): gset(s, "hero.headline-integrations", ["introAfter"], "Loaded from //stream.mux.com/abc123.m3u8 for speed.")
@G("e-mail address at a live domain")
def _(s): gset(s, "form.sign-up-form", ["receivedMessage"], "Thanks! Write to sales@operate.so any time.")
@G("source URL in the page description")
def _(s): s["head"]["description"] = "A scheduling tool. See https://www.operate.so for the original."
@G("source headline reused verbatim")
def _(s): gset(s, "hero.headline-integrations", ["headline"], "Collaborative AI for frontier sales organizations")
@G("source intro sentence reused with different punctuation and case")
def _(s): gset(s, "hero.headline-integrations", ["introAfter"], "TO SURFACE WHERE EVERY DEAL STANDS AND WHAT’S NEXT - your team and your agents act on it together!")
@G("source manifesto paragraph embedded in a longer paragraph")
def _(s): gset(s, "story.manifesto", ["paragraphs", 3], "Intro. The relationships, the judgment calls, the close — that part has always been yours. We just built a better place to do it. Outro.")
@G("source page description reused")
def _(s): s["head"]["description"] = "Operate connects your sales data to surface where every deal stands and what's next. Your team and agents act together, and you run like a team twice your size."
@G("source ops-steps copy reused")
def _(s): gset(s, "product.ops-steps", ["intro"], "Your team brings the relationships and the judgment. We bring everything they need to act on it.")
@G("source form copy reused")
def _(s): gset(s, "form.sign-up-form", ["choiceGroups", 3, "label"], "What's the hardest part of keeping your deals moving right now?")
@G("unregistered assetRef in generation mode", None)
def _(s): gref(s, "product.demo", ["people", 1], "demo-avatar-image", "avatar--made-up-1")
@G("placeholder ref registered under a different role", None)
def _(s): gref(s, "product.demo", ["people", 1], "demo-avatar-image", "placeholder--brand-mark")
@m("generation(clone): the whole clone example relabelled mode=generation", "semantic", RULE)
def _(s): s["mode"] = "generation"

BASE = {  # which base spec each mutation starts from
    "structural: declared template.sign-up but home node list": "home", "structural: extra section on the 404 template": "nf",
    "structural: hero on the hero-less legal template": "legal", "structural: non-repeatable legal body duplicated": "legal", "structural: required legal header removed": "legal",
    "structural: leave-confirm without the form": "home",
}
LEGAL_ONLY = {n for n, b in BASE.items() if b == "legal"} | {"runtime: legal paragraph over maxChars", "runtime: legal h2 over its char limit", "runtime: legal hr carrying text", "runtime: legal ul missing items"}


def base_for(name):
    if name.startswith("generation: "):
        return copy.deepcopy(GEN)
    if name in LEGAL_ONLY:
        return synth("template.legal", "/privacy")
    if BASE.get(name) == "nf":
        return synth("template.not-found", "*")
    return copy.deepcopy(EX)


def main():
    fails, total = 0, 0
    print("== mutations (each must be rejected by the expected layer) ==")
    for name, layer, fn, marker in MUT:
        spec = base_for(name)
        fn(spec)
        errs, _ = sv.validate(spec, REPO, CTX)
        total += 1
        ok = bool(errs) and any(e.startswith("[%s]" % layer) for e in errs) and (marker is None or any(marker in e for e in errs))
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

    # generation-mode controls (must pass: the rule rejects leakage, not generation itself)
    def gen_control(label, mut):
        nonlocal total, fails
        s = copy.deepcopy(GEN); mut(s)
        errs, _ = sv.validate(s, REPO, CTX)
        total += 1; ok = not errs; fails += 0 if ok else 1
        print("%s  control: %s%s" % ("PASS" if ok else "FAIL", label, "" if ok else "  -> " + errs[0][:140]))
    gen_control("generation example (original copy, placeholder assets, no live links)", lambda s: None)
    gen_control("English verb 'operate' stays usable in generation mode", lambda s: gset(s, "hero.headline-integrations", ["introBefore"], "We help crews operate smoothly"))
    gen_control("reserved-domain URLs (example.invalid / example.com) allowed in copy", lambda s: gset(s, "hero.headline-integrations", ["introAfter"], "Docs live at https://example.invalid/docs and https://www.example.com/help for now."))
    gen_control("relative internal paths allowed", lambda s: gset(s, "hero.headline-integrations", ["primaryCta", "href"], "/sign-up"))
    s = synth("template.not-found", "*"); s["mode"] = "generation"; s["head"] = {"title": "Not found", "description": "The requested page is missing.", "robots": "noindex"}
    errs, _ = sv.validate(s, REPO, CTX); total += 1; ok = not errs; fails += 0 if ok else 1
    print("%s  control: generation-mode 404 page keeps the framework-stock message%s" % ("PASS" if ok else "FAIL", "" if ok else "  -> " + errs[0][:140]))
    # clone mode is unaffected by the generation rule: the clone example (real logos, real copy) passes as mode=clone
    errs, _ = sv.validate(copy.deepcopy(EX), REPO, CTX); total += 1; ok = not errs and EX["mode"] == "clone"; fails += 0 if ok else 1
    print("%s  control: clone example with real Operate assets/copy passes in mode=clone" % ("PASS" if ok else "FAIL"))
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
