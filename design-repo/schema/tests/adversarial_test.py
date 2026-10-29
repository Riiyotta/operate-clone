#!/usr/bin/env python3
"""Adversarial suite: every mutation must be REJECTED (and by the expected layer / rule); every control must PASS.
Covers PageSpec mutations (schema, structure, assets, budgets), the six per-category generation-mode rules
(GENERATION_MODE_BRAND / _INTEGRATION_LOGO / _PERSON / _SCREENSHOT / _COPY / _URL, incl. normalisation evasions),
repository-level mutations of the validator context (registry availability loosened, retrievalEligible flips), and
the whole-page-wrapper gate (extraction/wrapper_gate.py) on mutated measurements.
Usage: python3 schema/tests/adversarial_test.py   (exit 0 only if all mutations rejected and all controls pass)"""
import copy, glob, json, os, sys

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(os.path.dirname(HERE))
sys.dont_write_bytecode = True
sys.path.insert(0, os.path.join(REPO, "schema"))
sys.path.insert(0, os.path.join(REPO, "extraction"))
import semantic_validate as sv  # noqa: E402
import wrapper_gate as wg  # noqa: E402

CTX = sv.load_context(REPO)
EX = json.load(open(os.path.join(REPO, "schema", "example.pagespec.json"), encoding="utf-8"))
GEN = json.load(open(os.path.join(REPO, "schema", "example.generated.pagespec.json"), encoding="utf-8"))
GENS = sorted(glob.glob(os.path.join(REPO, "schema", "example.generated*.pagespec.json")))
VERSION = EX["pageSpecVersion"]


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
    return {"pageSpecVersion": VERSION, "mode": "clone", "template": tid, "route": route, "head": copy.deepcopy(t["head"]), "nodes": nodes}


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
@m("structural: non-repeatable legal header duplicated", "semantic")
def _(s): s["nodes"].insert(2, copy.deepcopy(node(s, "legal.document-header")))
@m("structural: legal section repeated beyond its maxPerPage (15 > 14)", "semantic")
def _(s): s["nodes"] += [copy.deepcopy(node(s, "legal.document-section")) for _ in range(14)]
@m("structural: required legal section removed (header only)", "semantic")
def _(s): drop(s, "legal.document-section")
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
def _(s): node(s, "legal.document-section")["content"]["blocks"][0]["text"] = "x" * 1867
@m("runtime: legal section heading over its char limit", "semantic")
def _(s): node(s, "legal.document-section")["content"]["heading"] = "h" * 36
@m("runtime: legal hr carrying text", "semantic")
def _(s): node(s, "legal.document-section")["content"]["blocks"][3]["text"] = "nope"
@m("runtime: legal ul missing items", "semantic")
def _(s): del node(s, "legal.document-section")["content"]["blocks"][2]["items"]; node(s, "legal.document-section")["content"]["blocks"][2]["text"] = "t"
@m("schema: h2 block inside a legal section (the H2 is the heading field)", "schema")
def _(s): node(s, "legal.document-section")["content"]["blocks"].insert(0, {"type": "h2", "text": "Another heading"})
@m("schema: legal preamble with a heading block", "schema")
def _(s): node(s, "legal.document-preamble")["content"]["blocks"].insert(0, {"type": "h3", "text": "Heading"})
@m("schema: node-level retrievalEligible flip (not a PageSpec field)", "schema")
def _(s): node(s, "overlay.video-lightbox")["retrievalEligible"] = True

# ---------------- generation mode (base: schema/example.generated.pagespec.json unless named "generation(clone):")
def gset(s, sec, path, val):
    o = node(s, sec)["content"]
    for k in path[:-1]: o = o[k]
    o[path[-1]] = val
def gref(s, sec, path, role, ref):
    gset(s, sec, path, {"assetRole": role, "assetRef": ref})
G = lambda name, cat: m("generation: " + name, "semantic", "GENERATION_MODE_%s:" % cat if cat else None)

# --- Operate logo / brand leakage -> GENERATION_MODE_BRAND
@G("Operate logo mark in the nav", "BRAND")
def _(s): gref(s, "shell.nav-sheet", ["logoMark"], "brand-logomark", "logo--mark")
@G("Operate logo mark in the footer", "BRAND")
def _(s): gref(s, "shell.footer-sheet", ["logoMark"], "brand-logomark", "logo--mark")
@G("Operate logo-trace loop", "BRAND")
def _(s): gref(s, "story.manifesto", ["logoTrace"], "brand-logo-trace", "logo-trace--loop")
@G("Operate wordmark text", "BRAND")
def _(s): gset(s, "shell.nav-sheet", ["wordmarkText"], "Operate")
@G("Operate wordmark in upper case (ticket brand)", "BRAND")
def _(s): gset(s, "story.manifesto", ["ticket", "brand"], "OPERATE")
@G("Operate wordmark in mixed case", "BRAND")
def _(s): gset(s, "shell.nav-sheet", ["wordmarkText"], "oPeRaTe")
@G("Operate wordmark in full-width letters (NFKC)", "BRAND")
def _(s): gset(s, "shell.nav-sheet", ["wordmarkText"], "Ｏｐｅｒａｔｅ")
@G("Operate company name in the copyright line", "BRAND")
def _(s): gset(s, "shell.footer-sheet", ["copyright"], "© 2027 Operate Machine Co. All rights reserved.")
@G("Operate name hidden with a zero-width character", "BRAND")
def _(s): gset(s, "shell.nav-sheet", ["wordmarkText"], "Oper​ate")
@G("Operate name hidden with a soft hyphen", "BRAND")
def _(s): gset(s, "shell.nav-sheet", ["wordmarkText"], "Oper­ate")
@G("Operate possessive with a curly apostrophe", "BRAND")
def _(s): gset(s, "hero.headline-integrations", ["introBefore"], "Built on Operate’s planner")
@G("Operate name in the page title", "BRAND")
def _(s): s["head"]["title"] = "Operate – Scheduling"
# --- integration-logo / third-party mark leakage -> GENERATION_MODE_INTEGRATION_LOGO
@G("integration logo (Slack) in the hero bubbles", "INTEGRATION_LOGO")
def _(s): gref(s, "hero.headline-integrations", ["integrationLogos", 3], "integration-logo", "integration--slack")
@G("integration logo (HubSpot) replacing the plus glyph", "INTEGRATION_LOGO")
def _(s): gref(s, "hero.headline-integrations", ["integrationLogos", 0], "integration-logo", "integration--hubspot")
@G("integration logo (Gong) well-formed blocked registry entry", "INTEGRATION_LOGO")
def _(s): gref(s, "hero.headline-integrations", ["integrationLogos", 2], "integration-logo", "integration--gong")
@G("integration logo (Granola)", "INTEGRATION_LOGO")
def _(s): gref(s, "hero.headline-integrations", ["integrationLogos", 1], "integration-logo", "integration--granola")
@G("third-party names in the integration screen-reader text", "INTEGRATION_LOGO")
def _(s): gset(s, "hero.headline-integrations", ["integrationSrText"], "Granola, Gong, Slack, Gmail, HubSpot and more")
@G("third-party mark as a demo chapter label", "INTEGRATION_LOGO")
def _(s): gset(s, "product.demo", ["chapterLabels", 3], "Slack")
@G("LinkedIn label in the footer", "INTEGRATION_LOGO")
def _(s): gset(s, "shell.footer-sheet", ["socialLinks", 0, "label"], "LinkedIn")
@G("third-party mark with a zero-width joiner", "INTEGRATION_LOGO")
def _(s): gset(s, "hero.headline-integrations", ["introBefore"], "Works with Hub‍Spot")
# --- real / source-demo people -> GENERATION_MODE_PERSON
@G("real demo avatar image", "PERSON")
def _(s): gref(s, "product.demo", ["people", 0], "demo-avatar-image", "avatar--demo-1")
@G("real-person avatar (celebrity name in the file)", "PERSON")
def _(s): gref(s, "product.demo", ["people", 4], "demo-avatar-image", "avatar--demo-5")
@G("source person's name in copy", "PERSON")
def _(s): gset(s, "product.demo", ["workspaceName"], "Kierra Torres")
@G("real person's name in the composer placeholder, odd casing", "PERSON")
def _(s): gset(s, "product.demo", ["composerPlaceholder"], "Ask EMINEM about jobs...")
@G("owner avatar's real-person alt text", "PERSON")
def _(s): gset(s, "product.demo", ["composerPlaceholder"], "Ask Marshall Mathers...")
@G("source demo contact name", "PERSON")
def _(s): gset(s, "hero.headline-integrations", ["introBefore"], "Chase Holloway signs today")
# --- proprietary product screenshots / media -> GENERATION_MODE_SCREENSHOT
@G("proprietary Slack-conversation scene image", "SCREENSHOT")
def _(s): gref(s, "product.demo", ["conversationBackground"], "demo-scene-image", "scene--demo-slack")
@G("proprietary video poster (product screenshot)", "SCREENSHOT")
def _(s): gref(s, "overlay.video-lightbox", ["poster"], "video-poster", "poster--lightbox")
@G("proprietary footer still (desktop)", "SCREENSHOT")
def _(s): gref(s, "shell.footer-sheet", ["videoCard", "stillDesktop"], "footer-video-asset", "footer--still-desktop")
@G("proprietary footer still (mobile)", "SCREENSHOT")
def _(s): gref(s, "shell.footer-sheet", ["videoCard", "stillMobile"], "footer-video-asset", "footer--still-mobile")
@G("proprietary footer product footage loop", "SCREENSHOT")
def _(s): gref(s, "shell.footer-sheet", ["videoCard", "loop"], "footer-video-asset", "footer--loop")
@G("Operate background texture file", "SCREENSHOT")
def _(s): gref(s, "backdrop.animated-background", ["texture"], "background-texture", "texture--home-background")
# --- real / live URLs and endpoints -> GENERATION_MODE_URL
@G("live video stream endpoint", "URL")
def _(s): gref(s, "overlay.video-lightbox", ["stream"], "lightbox-video-stream", "stream--lightbox-demo")
@G("sign-up submit endpoint of the source", "URL")
def _(s): gref(s, "form.sign-up-form", ["submitEndpoint"], "signup-submit-stub", "endpoint--signup-stub")
@G("real LinkedIn profile link", "URL")
def _(s): gref(s, "shell.footer-sheet", ["socialLinks", 0, "link"], "external-social-link", "social--linkedin")
@G("real X profile link", "URL")
def _(s): gref(s, "shell.footer-sheet", ["socialLinks", 1, "link"], "external-social-link", "social--x")
@G("raw Operate URL in copy", "URL")
def _(s): gset(s, "hero.headline-integrations", ["introAfter"], "Read more at https://operate.so/sign-up today.")
@G("source LinkedIn company URL in copy", "URL")
def _(s): gset(s, "hero.headline-integrations", ["introAfter"], "Follow www.linkedin.com/company/acme for news.")
@G("source X handle in copy", "URL")
def _(s): gset(s, "hero.headline-integrations", ["introAfter"], "Say hi to operate_gtm on social media.")
@G("source Google API host in copy", "URL")
def _(s): gset(s, "hero.headline-integrations", ["introAfter"], "Scopes like https://www.googleapis.com/auth/x are requested.")
@G("raw non-reserved URL that merely starts with example.com", "URL")
def _(s): gset(s, "hero.headline-integrations", ["introAfter"], "Read more at https://example.com.evil.io/x today.")
@G("bare domain in copy", "URL")
def _(s): gset(s, "hero.headline-integrations", ["introAfter"], "Visit fieldwork.io for the details.")
@G("protocol-relative CDN host in copy", "URL")
def _(s): gset(s, "hero.headline-integrations", ["introAfter"], "Loaded from //stream.mux.com/abc123.m3u8 for speed.")
@G("e-mail address at a live domain", "URL")
def _(s): gset(s, "form.sign-up-form", ["receivedMessage"], "Thanks! Write to sales@operate.so any time.")
@G("source URL in the page description", "URL")
def _(s): s["head"]["description"] = "A scheduling tool. See https://www.operate.so for the original."
# --- source-specific copy -> GENERATION_MODE_COPY
@G("source headline reused verbatim", "COPY")
def _(s): gset(s, "hero.headline-integrations", ["headline"], "Collaborative AI for frontier sales organizations")
@G("source intro sentence reused with different punctuation and case", "COPY")
def _(s): gset(s, "hero.headline-integrations", ["introAfter"], "TO SURFACE WHERE EVERY DEAL STANDS AND WHAT’S NEXT - your team and your agents act on it together!")
@G("source manifesto paragraph embedded in a longer paragraph", "COPY")
def _(s): gset(s, "story.manifesto", ["paragraphs", 3], "Intro. The relationships, the judgment calls, the close — that part has always been yours. We just built a better place to do it. Outro.")
@G("source page description reused", "COPY")
def _(s): s["head"]["description"] = "Operate connects your sales data to surface where every deal stands and what's next. Your team and agents act together, and you run like a team twice your size."
@G("source ops-steps copy reused", "COPY")
def _(s): gset(s, "product.ops-steps", ["intro"], "Your team brings the relationships and the judgment. We bring everything they need to act on it.")
@G("source form copy reused (curly apostrophe)", "COPY")
def _(s): gset(s, "form.sign-up-form", ["choiceGroups", 3, "label"], "What’s the hardest part of keeping your deals moving right now?")
@G("source demo workspace name", "COPY")
def _(s): gset(s, "product.demo", ["workspaceName"], "Quietwork")
# --- registry integrity in generation mode
@G("unregistered assetRef in generation mode", None)
def _(s): gref(s, "product.demo", ["people", 1], "fictional-avatar", "placeholder--made-up-1")
@G("placeholder ref registered under a different substitute role", None)
def _(s): gref(s, "product.demo", ["people", 1], "fictional-avatar", "placeholder--brand-mark")
@G("generation-safe role paired with a real asset ref", None)
def _(s): gref(s, "shell.nav-sheet", ["logoMark"], "placeholder-brand-mark", "logo--mark")
@m("generation(clone): the whole clone example relabelled mode=generation", "semantic", "GENERATION_MODE_")
def _(s): s["mode"] = "generation"


BASE = {  # which base spec each mutation starts from
    "structural: declared template.sign-up but home node list": "home", "structural: extra section on the 404 template": "nf",
    "structural: hero on the hero-less legal template": "legal", "structural: required legal header removed": "legal",
    "structural: leave-confirm without the form": "home",
}
LEGAL_ONLY = {n for n, b in BASE.items() if b == "legal"} | {n for n, *_ in MUT if "legal" in n and n.startswith(("runtime:", "schema:"))} | {
    "structural: non-repeatable legal header duplicated", "structural: legal section repeated beyond its maxPerPage (15 > 14)", "structural: required legal section removed (header only)"}


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
    # every generation-safe example (one per template family) passes
    for gp in GENS:
        g = json.load(open(gp, encoding="utf-8"))
        errs, warns = sv.validate(g, REPO, CTX); total += 1; ok = not errs and not warns and g["mode"] == "generation"; fails += 0 if ok else 1
        print("%s  control: %s (%s, mode generation) passes" % ("PASS" if ok else "FAIL", os.path.basename(gp), g["template"]) + ("" if ok else "  -> " + (errs + warns)[0][:140]))

    # ---------------- repository-level mutations (validator context): each must be rejected by the named rule
    def ctx_case(label, mutate_ctx, spec, marker):
        nonlocal total, fails
        c = copy.deepcopy(CTX); c["_gen"] = {}; mutate_ctx(c)
        errs, _ = sv.validate(copy.deepcopy(spec), REPO, c)
        total += 1; ok = any(marker in e for e in errs); fails += 0 if ok else 1
        print("%s  repo: %s  -> %s" % ("PASS" if ok else "FAIL", label, next((e[:120] for e in errs if marker in e), "ACCEPTED (bad)")))

    def loosen_logo(c):
        c["assets"]["roles"]["brand-logomark"]["availability"] = "generation-safe"
        c["assets"]["registeredAssets"]["logo--mark"]["generationUse"] = "generation-safe"
    leak = copy.deepcopy(GEN); gref(leak, "shell.nav-sheet", ["logoMark"], "brand-logomark", "logo--mark")
    ctx_case("registry edited: brand-logomark + logo--mark marked generation-safe; the pin still rejects it", loosen_logo, leak, "GENERATION_MODE_BRAND:")
    def tighten_ph(c):
        c["assets"]["roles"]["placeholder-brand-mark"]["availability"] = "clone-only"
    ctx_case("registry and pin disagree on a substitute role (registry says clone-only)", tighten_ph, GEN, "GENERATION_MODE_BRAND:")
    def rename_ph(c):
        a = c["assets"]["registeredAssets"].pop("placeholder--avatar-1"); c["assets"]["registeredAssets"]["avatar--fake-1"] = a
    s2 = copy.deepcopy(GEN); gref(s2, "product.demo", ["people", 0], "fictional-avatar", "avatar--fake-1")
    ctx_case("generation-safe asset not named placeholder--*", rename_ph, s2, "GENERATION_MODE_PERSON:")
    def flip_contract(c): c["sections"]["overlay.video-lightbox"]["retrievalEligible"] = True; c["sections"]["overlay.video-lightbox"].pop("retrievalIneligibleReason")
    ctx_case("contract: runtime-UI lightbox flipped to retrievalEligible true", flip_contract, EX, "RETRIEVAL_ELIGIBILITY_PINNED:")
    def flip_allow(c): c["allowlist"]["retrievalIneligibleSections"].remove("overlay.sign-up-modal")
    ctx_case("allowlist: modal dropped from retrievalIneligibleSections", flip_allow, EX, "RETRIEVAL_ELIGIBILITY_PINNED:")
    def content_false(c): c["sections"]["story.manifesto"]["retrievalEligible"] = False; c["sections"]["story.manifesto"]["retrievalIneligibleReason"] = "Marked ineligible although it is real page content."
    ctx_case("contract: content section (manifesto) marked ineligible", content_false, EX, "RETRIEVAL_ELIGIBILITY_PINNED:")
    def short_reason(c): c["sections"]["shell.binder-rails"]["retrievalIneligibleReason"] = "layout"
    ctx_case("contract: ineligible section with a reason under 30 characters", short_reason, EX, "RETRIEVAL_ELIGIBILITY_PINNED:")
    def new_dialog(c):
        d = copy.deepcopy(c["sections"]["system.not-found"]); d["id"] = "overlay.cookie-consent"; d["retrievalEligible"] = True; d.pop("retrievalIneligibleReason", None)
        c["sections"]["overlay.cookie-consent"] = d
    ctx_case("contract: new runtime-UI section (cookie consent) not pinned and eligible", new_dialog, EX, "RETRIEVAL_ELIGIBILITY_PINNED:")

    # ---------------- wrapper gate (extraction/wrapper_gate.py) on mutated measurements
    contracts, templates, sh0, wl0 = wg.load_inputs(REPO)
    def gate_case(label, mut, expect_fail, warn_marker=None):
        nonlocal total, fails
        sh, wl, cs = copy.deepcopy(sh0), copy.deepcopy(wl0), copy.deepcopy(contracts)
        mut(sh, wl, cs)
        F, W, _ = wg.evaluate(cs, templates, sh, wl)
        ok = bool(F) if expect_fail else (not F and (warn_marker is None or any(warn_marker in w for w in W)))
        total += 1; fails += 0 if ok else 1
        print("%s  gate: %s  -> %s" % ("PASS" if ok else "FAIL", label, (F[0][:120] if F else (W[0][:120] if W else "no findings"))))
    def route(sh, r): return next(x for x in sh["routes"] if x["route"] == r)
    def set_h(sh, r, sec, h, i=0):
        rt = route(sh, r); inst = [x for x in rt["sections"] if x["section"] == sec][i]
        rt["pageHeightPx"] += h - inst["heightPx"]; inst["heightPx"] = h
        sh["sections"][sec]["maxHeightPx"] = max(x["heightPx"] for t in sh["routes"] for x in t["sections"] if x["section"] == sec)
    gate_case("control: the recorded measurements pass", lambda sh, wl, cs: None, False)
    gate_case("HERO 1900px warns but does not fail", lambda sh, wl, cs: set_h(sh, "/", "hero.headline-integrations", 1900), False, "HERO hero.headline-integrations is 1900px")
    gate_case("HERO 3100px fails (no whitelist)", lambda sh, wl, cs: set_h(sh, "/", "hero.headline-integrations", 3100), True)
    def hero_wl(sh, wl, cs):
        set_h(sh, "/", "hero.headline-integrations", 3100)
        wl["entries"].append({"kind": "hero-height", "route": "/", "section": "hero.headline-integrations", "maxHeightPx": 3200, "reviewedBy": "adversarial-test (automated reviewer; not a human sign-off)", "attestation": "agent", "reviewedOn": "2026-10-29", "justification": "Synthetic entry used only by the adversarial suite to prove the whitelist path."})
    gate_case("control: HERO 3100px with a valid reviewed whitelist entry only warns", hero_wl, False, "whitelisted")
    def hero_wl_nojust(sh, wl, cs):
        hero_wl(sh, wl, cs); wl["entries"][-1]["justification"] = "too short"
    gate_case("whitelist entry with a justification under 30 characters fails", hero_wl_nojust, True)
    def hero_wl_human(sh, wl, cs):
        hero_wl(sh, wl, cs); wl["entries"][-1]["reviewedBy"] = "claude-agent"
    gate_case("agent attestation that does not say 'not a human sign-off' fails", hero_wl_human, True)
    def hero_wl_cap(sh, wl, cs):
        hero_wl(sh, wl, cs); wl["entries"][-1]["maxHeightPx"] = 3050
    gate_case("whitelist cap below the measured height fails", hero_wl_cap, True)
    def stale(sh, wl, cs):
        wl["entries"].append({"kind": "page-share", "route": "/privacy", "section": "legal.document-section", "maxHeightPx": 9000, "maxSharePct": 99, "reviewedBy": "adversarial-test (automated reviewer; not a human sign-off)", "attestation": "agent", "reviewedOn": "2026-10-29", "justification": "Stale entry that exempts nothing at the recorded heights."})
    gate_case("stale whitelist entry fails", stale, True)
    gate_case("majority share: one legal section at 70% of /terms fails", lambda sh, wl, cs: set_h(sh, "/terms", "legal.document-section", 26000, 9), True)
    gate_case("share 55% of /privacy warns but does not fail", lambda sh, wl, cs: set_h(sh, "/privacy", "legal.document-section", 6800, 3), False, "legal.document-section is 6800px")
    def whole_body(sh, wl, cs):
        rt = route(sh, "/privacy"); keep = [x for x in rt["sections"] if x["section"] != "legal.document-section"]
        body = sum(x["heightPx"] for x in rt["sections"] if x["section"] == "legal.document-section")
        rt["sections"] = keep + [{"section": "legal.document-section", "heightPx": body, "tag": "h2", "inFlow": True}]
        sh["sections"]["legal.document-section"]["maxHeightPx"] = max(body, sh["sections"]["legal.document-section"]["maxHeightPx"])
    gate_case("the pre-1.2.0 whole legal body as one section (96% of /privacy) fails", whole_body, True)
    def missing(sh, wl, cs):
        del sh["sections"]["story.manifesto"]
    gate_case("missing measurement for a section contract fails", missing, True)
    def missing_route(sh, wl, cs):
        sh["routes"] = [x for x in sh["routes"] if x["route"] != "/terms"]
    gate_case("missing measurement for a route fails", missing_route, True)
    def missing_node(sh, wl, cs):
        rt = route(sh, "/"); rt["sections"] = [x for x in rt["sections"] if x["section"] != "product.demo"]
    gate_case("required template node missing from its route's measurement fails", missing_node, True)
    gate_case("measured at a 1280px viewport fails", lambda sh, wl, cs: sh["viewport"].update(width=1280), True)
    gate_case("in-flow heights that do not add up to the page fails", lambda sh, wl, cs: route(sh, "/").update(pageHeightPx=route(sh, "/")["pageHeightPx"] + 400), True)
    gate_case("no sectionHeights at all fails", lambda sh, wl, cs: sh.clear(), True)
    print("\n%d checks, %d failed" % (total, fails))
    return 1 if fails else 0


if __name__ == "__main__":
    sys.exit(main())
