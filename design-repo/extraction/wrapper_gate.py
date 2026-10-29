#!/usr/bin/env python3
"""wrapper_gate.py: automated whole-page-wrapper quality gate (run by extraction/verify_all.py; also runnable alone).

A section contract must describe ONE part of a page, never a whole page or article. The gate reads the rendered heights
recorded at 1440px in extraction/measured-values.json -> sectionHeights (written by the optional
extraction/measure_sections.mjs from the built clone) and applies:

  HERO height   a section whose semantic.category is HERO and is taller than 1800px WARNS; taller than 3000px FAILS
                unless a reviewed hero-height whitelist entry (route + section, maxHeightPx above the measured height) covers it.
  page share    on a page with at least 3 in-flow non-SHELL sections, one in-flow section instance holding more than 50% of
                the document height WARNS; more than 60% FAILS unless a reviewed page-share whitelist entry covers it.
                SHELL sections and out-of-flow elements (fixed/absolute chrome, runtime overlays) never count; pages with
                fewer than 3 in-flow non-SHELL sections are skipped and reported as skipped, never silently.
  missing data  a section contract, a template or a route without a measurement, a required template node missing from
                its route's measurement, or a measured section that is not a node of the route's template is an ERROR.
  viewport      measurements taken at any width other than 1440px are an ERROR.
  accounting    the in-flow heights of a route add up to its pageHeightPx (+-2px); sections.<id>.maxHeightPx equals the
                tallest measured instance.
  stale entries a whitelist entry that no longer covers a real finding FAILS, so the whitelist cannot grow silently.

The thresholds are pinned HERE in code and are not read from the data. A whitelisted finding still prints as a warning.
Whitelist: extraction/wrapper-whitelist.json. Every entry needs kind, route, section, maxHeightPx (and maxSharePct for
page-share), reviewedBy, attestation ("agent" or "human"), reviewedOn (YYYY-MM-DD) and a justification of 30+ characters.
An "agent" attestation is an automated reviewer's, NOT a human sign-off, and reviewedBy must say "not a human sign-off".

Usage:  python3 extraction/wrapper_gate.py [--root <design-repo dir>]      (exit 1 on any failure)
"""
import glob
import json
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)

HERO_WARN_PX = 1800
HERO_FAIL_PX = 3000
SHARE_WARN_PCT = 50.0
SHARE_FAIL_PCT = 60.0
MIN_SECTIONS = 3
VIEWPORT_WIDTH = 1440
SUM_TOLERANCE_PX = 2
MIN_JUSTIFICATION = 30
ENTRY_KEYS = {"kind", "route", "section", "maxHeightPx", "maxSharePct", "reviewedBy", "attestation", "reviewedOn", "justification"}
DATE_RE = re.compile(r"^\d{4}-\d{2}-\d{2}$")


def _int(x):
    return isinstance(x, int) and not isinstance(x, bool)


def _j(root, rel):
    with open(os.path.join(root, rel), encoding="utf-8") as f:
        return json.load(f)


def load_inputs(root=ROOT):
    contracts = {}
    for p in sorted(glob.glob(os.path.join(root, "sections", "*.json"))):
        d = json.load(open(p, encoding="utf-8"))
        contracts[d["id"]] = d
    templates = _j(root, "templates/templates.json")["templates"]
    sh = _j(root, "extraction/measured-values.json").get("sectionHeights")
    wl = _j(root, "extraction/wrapper-whitelist.json")
    return contracts, templates, sh, wl


def validate_whitelist(wl):
    F = []
    if not isinstance(wl, dict) or not isinstance(wl.get("entries"), list):
        return ["wrapper-whitelist.json must be an object with an entries list"]
    seen = set()
    for i, e in enumerate(wl["entries"]):
        where = "whitelist entry %d" % i
        if not isinstance(e, dict):
            F.append("%s is not an object" % where); continue
        extra = set(e) - ENTRY_KEYS
        if extra:
            F.append("%s has unknown keys %s" % (where, sorted(extra)))
        kind = e.get("kind")
        if kind not in ("hero-height", "page-share"):
            F.append("%s: kind must be hero-height or page-share" % where); continue
        need = ["route", "section", "maxHeightPx", "reviewedBy", "attestation", "reviewedOn", "justification"] + (["maxSharePct"] if kind == "page-share" else [])
        for k in need:
            if k not in e:
                F.append("%s (%s) is missing %s" % (where, kind, k))
        if not isinstance(e.get("reviewedBy"), str) or not e.get("reviewedBy", "").strip():
            F.append("%s: reviewedBy must be a non-empty string" % where)
        if e.get("attestation") not in ("agent", "human"):
            F.append('%s: attestation must be "agent" or "human"' % where)
        elif e.get("attestation") == "agent" and "not a human sign-off" not in str(e.get("reviewedBy", "")):
            F.append('%s: an agent attestation must say "not a human sign-off" in reviewedBy' % where)
        if not isinstance(e.get("justification"), str) or len(e["justification"].strip()) < MIN_JUSTIFICATION:
            F.append("%s: justification must be at least %d characters" % (where, MIN_JUSTIFICATION))
        if not isinstance(e.get("reviewedOn"), str) or not DATE_RE.match(e.get("reviewedOn", "")):
            F.append("%s: reviewedOn must be YYYY-MM-DD" % where)
        if not _int(e.get("maxHeightPx")) or e.get("maxHeightPx", 0) <= 0:
            F.append("%s: maxHeightPx must be a positive integer" % where)
        if kind == "page-share" and (not isinstance(e.get("maxSharePct"), (int, float)) or isinstance(e.get("maxSharePct"), bool) or not 0 < e.get("maxSharePct", 0) <= 100):
            F.append("%s: maxSharePct must be a number in (0, 100]" % where)
        key = (kind, e.get("route"), e.get("section"))
        if key in seen:
            F.append("%s: duplicate of an earlier entry %s" % (where, key))
        seen.add(key)
    return F


def evaluate(contracts, templates, sh, wl):
    """Pure check. Returns (failures, warnings, info)."""
    F, W, I = [], [], []
    F.extend(validate_whitelist(wl))
    entries = wl.get("entries", []) if isinstance(wl, dict) and isinstance(wl.get("entries"), list) else []
    if not isinstance(sh, dict):
        return F + ["no sectionHeights in extraction/measured-values.json: a missing measurement is an error (run extraction/measure_sections.mjs --write)"], W, I
    if (sh.get("viewport") or {}).get("width") != VIEWPORT_WIDTH:
        F.append("sectionHeights must be measured at a %dpx viewport, found %r" % (VIEWPORT_WIDTH, (sh.get("viewport") or {}).get("width")))
    routes, sections = sh.get("routes"), sh.get("sections") or {}
    if not isinstance(routes, list) or not routes:
        return F + ["sectionHeights.routes is missing or empty: no page was measured"], W, I
    route_tpl = {r: tid for tid, t in templates.items() for r in t["routes"]}

    # ---- missing / inconsistent data is an error
    for sid in sorted(contracts):
        s = sections.get(sid)
        if not isinstance(s, dict) or not _int(s.get("maxHeightPx")) or s["maxHeightPx"] <= 0:
            F.append("no measurement for section %s (sectionHeights.sections): a missing measurement is an error" % sid)
    for sid in sorted(set(sections) - set(contracts)):
        F.append("sectionHeights measures %s, which has no contract" % sid)
    measured_routes, inst_max = set(), {}
    for rt in routes:
        route = rt.get("route") if isinstance(rt, dict) else None
        tid = route_tpl.get(route)
        if tid is None:
            F.append("measured route %r is not a route of any template" % route); continue
        if rt.get("template") != tid:
            F.append("%s: measured template %r != templates.json %r" % (route, rt.get("template"), tid))
        measured_routes.add(route)
        secs = rt.get("sections")
        if not _int(rt.get("pageHeightPx")) or rt["pageHeightPx"] <= 0 or not isinstance(secs, list) or not secs:
            F.append("%s: no valid pageHeightPx / sections (missing measurement)" % route); continue
        nodes = {n["section"]: n for n in templates[tid]["nodes"]}
        got = [x.get("section") for x in secs if isinstance(x, dict)]
        for sid in sorted(set(got) - set(nodes)):
            F.append("%s: measured section %s is not a node of %s" % (route, sid, tid))
        for sid, n in nodes.items():
            if n["required"] and sid not in got:
                F.append("%s: required node %s of %s has no measurement" % (route, sid, tid))
        for x in secs:
            if not isinstance(x, dict) or not _int(x.get("heightPx")) or x["heightPx"] <= 0 or not isinstance(x.get("inFlow"), bool):
                F.append("%s: a section instance has no valid heightPx > 0 / inFlow: %s" % (route, x)); continue
            inst_max[x["section"]] = max(inst_max.get(x["section"], 0), x["heightPx"])
        flow = sum(x["heightPx"] for x in secs if isinstance(x, dict) and x.get("inFlow") is True and _int(x.get("heightPx")))
        if abs(flow - rt["pageHeightPx"]) > SUM_TOLERANCE_PX:
            F.append("%s: in-flow section heights add up to %dpx but the page is %dpx" % (route, flow, rt["pageHeightPx"]))
    for r in sorted(set(route_tpl) - measured_routes):
        F.append("route %s (%s) has no measurement" % (r, route_tpl[r]))
    for sid, s in sorted(sections.items()):
        if sid in inst_max and isinstance(s, dict) and s.get("maxHeightPx") != inst_max[sid]:
            F.append("sectionHeights.sections.%s.maxHeightPx %r != the tallest measured instance %d" % (sid, s.get("maxHeightPx"), inst_max[sid]))
    if F:
        return F, W, I  # thresholds are meaningless on incomplete data

    used = set()

    def entry_for(kind, route, section):
        for i, e in enumerate(entries):
            if isinstance(e, dict) and (e.get("kind"), e.get("route"), e.get("section")) == (kind, route, section):
                return i, e
        return None, None

    cat = lambda sid: (contracts.get(sid, {}).get("semantic") or {}).get("category")
    for rt in routes:
        route, total = rt["route"], rt["pageHeightPx"]
        flow = [x for x in rt["sections"] if x["inFlow"]]
        for x in flow:  # ---- HERO height
            if cat(x["section"]) != "HERO":
                continue
            h = x["heightPx"]
            i, e = entry_for("hero-height", route, x["section"])
            if h > HERO_FAIL_PX:
                if e is None:
                    F.append("HERO %s is %dpx tall on %s (> %d): a whole-page wrapper, not a hero. Decompose it or add a reviewed hero-height whitelist entry" % (x["section"], h, route, HERO_FAIL_PX))
                elif h >= e["maxHeightPx"]:
                    used.add(i); F.append("HERO %s is %dpx tall on %s but its whitelist maxHeightPx is %d" % (x["section"], h, route, e["maxHeightPx"]))
                else:
                    used.add(i); W.append("HERO %s is %dpx tall on %s (> %d), whitelisted up to %dpx by %s (%s)" % (x["section"], h, route, HERO_FAIL_PX, e["maxHeightPx"], e["reviewedBy"], e["attestation"]))
            elif h > HERO_WARN_PX:
                W.append("HERO %s is %dpx tall on %s (> %d)" % (x["section"], h, route, HERO_WARN_PX))
                if e is not None:
                    used.add(i)
        body = [x for x in flow if cat(x["section"]) != "SHELL"]  # ---- page share
        if len(body) < MIN_SECTIONS:
            I.append("share rule skipped on %s: %d in-flow non-SHELL section(s), the rule needs %d" % (route, len(body), MIN_SECTIONS))
            continue
        for x in body:
            share = 100.0 * x["heightPx"] / total
            if share <= SHARE_WARN_PCT:
                continue
            i, e = entry_for("page-share", route, x["section"])
            msg = "%s is %dpx of the %dpx page %s: %.1f%% of the page height" % (x["section"], x["heightPx"], total, route, share)
            if share > SHARE_FAIL_PCT:
                if e is None:
                    F.append("%s (> %d%%): a whole-page wrapper. Decompose it or add a reviewed page-share whitelist entry" % (msg, SHARE_FAIL_PCT))
                elif share >= e["maxSharePct"] or x["heightPx"] >= e["maxHeightPx"]:
                    used.add(i); F.append("%s, over the whitelisted ceiling (%s%% / %dpx)" % (msg, e["maxSharePct"], e["maxHeightPx"]))
                else:
                    used.add(i); W.append("%s (> %d%%), whitelisted by %s (%s)" % (msg, SHARE_FAIL_PCT, e["reviewedBy"], e["attestation"]))
            else:
                W.append("%s (> %d%%)" % (msg, SHARE_WARN_PCT))
                if e is not None:
                    used.add(i)
    for i, e in enumerate(entries):
        if isinstance(e, dict) and i not in used:
            F.append("stale whitelist entry %d (%s %s %s): it no longer covers a real finding; remove it" % (i, e.get("kind"), e.get("route"), e.get("section")))
    return F, W, I


def check_wrapper_gate(root=ROOT):
    try:
        return evaluate(*load_inputs(root))
    except (OSError, ValueError, KeyError) as e:
        return ["wrapper gate inputs unreadable: %s" % e], [], []


def main(argv):
    root = os.path.abspath(argv[argv.index("--root") + 1]) if "--root" in argv else ROOT
    F, W, I = check_wrapper_gate(root)
    for x in F:
        print("FAIL", x)
    for x in W:
        print("warn", x)
    for x in I:
        print("info", x)
    print("wrapper gate: %d failure(s), %d warning(s)" % (len(F), len(W)))
    return 1 if F else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
