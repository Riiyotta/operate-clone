#!/usr/bin/env node
/**
 * Optional re-measure tool: renders every route of the BUILT clone at 1440px, measures every section instance named in
 * extraction/measure-recipes.json and (with --write) stores the result in extraction/measured-values.json under
 * `sectionHeights`. extraction/wrapper_gate.py (run by verify_all.py) only reads that ledger, so verification needs no
 * browser; run this only to refresh the numbers after the clone changes.
 *
 *   (in the clone project)  npm ci
 *                           npx vite build --outDir <scratch dir>
 *                           npx vite preview --outDir <scratch dir> --port 5704
 *   PLAYWRIGHT_MODULE=<playwright's index.mjs, e.g. "$(npm root -g)/playwright/index.mjs"; unset = import 'playwright'>
 *   node design-repo/extraction/measure_sections.mjs --base http://localhost:5704 [--write]
 *
 * No machine path is stored in this repo: the browser module and base URL come from the environment / arguments.
 * Without --write it prints the measurements and writes nothing.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const arg = (n, d) => { const i = process.argv.indexOf(n); return i < 0 ? d : (process.argv[i + 1] ?? d); };
const BASE = String(arg('--base', 'http://localhost:5704')).replace(/\/$/, '');
const WRITE = process.argv.includes('--write');
const J = (rel) => JSON.parse(fs.readFileSync(path.join(ROOT, rel), 'utf8'));
const recipes = J('extraction/measure-recipes.json');
const templates = J('templates/templates.json');

const modRef = process.env.PLAYWRIGHT_MODULE || 'playwright';
const pw = await import(/^(\/|[A-Za-z]:\\)/.test(modRef) ? pathToFileURL(modRef).href : modRef);
const chromium = pw.chromium || pw.default.chromium;
const browser = await chromium.launch();
const problems = [];
const routesOut = [];

/** Runs inside the page: resolves entries to elements and returns their document-space boxes. */
const locate = ({ root, entries }) => {
  const base = document.querySelector(root);
  const out = [];
  const box = (el) => { const r = el.getBoundingClientRect(); return { top: Math.round(r.top + window.scrollY), height: Math.round(r.height), tag: el.tagName.toLowerCase(), position: getComputedStyle(el).position }; };
  entries.forEach((en, order) => {
    let els = [];
    if (en.path) {
      let el = base;
      for (const i of en.path) el = el && el.children[i - 1];
      if (el) els = [el];
    } else if (en.css) {
      els = en.each ? [...document.querySelectorAll(en.css)] : [document.querySelector(en.css)].filter(Boolean);
    }
    if (!els.length) out.push({ section: en.section, order, missing: en.path ? 'path ' + en.path.join('.') : en.css });
    els.forEach((el) => out.push({ section: en.section, order, ...box(el) }));
  });
  return { docH: Math.round(document.documentElement.scrollHeight), found: out };
};

for (const [route, rec] of Object.entries(recipes.routes)) {
  const tpl = templates.templates[rec.template];
  if (!tpl || !tpl.routes.includes(route)) { problems.push(`${route}: recipe template ${rec.template} does not own this route`); continue; }
  const page = await browser.newPage({ viewport: recipes.viewport });
  await page.goto(BASE + (route === '*' ? '/page-that-does-not-exist' : route), { waitUntil: 'load' });
  await page.waitForTimeout(recipes.settleMs);
  const flow = await page.evaluate(locate, { root: recipes.root, entries: rec.inFlow });
  const oof = await page.evaluate(locate, { root: recipes.root, entries: rec.outOfFlow });
  for (const f of [...flow.found, ...oof.found]) if (f.missing) problems.push(`${route}: ${f.section} not found (${f.missing})`);
  // tile the in-flow starts: each runs to the next start; the first starts at 0, the last ends at the document end
  const starts = flow.found.filter((f) => !f.missing).sort((a, b) => a.top - b.top || a.order - b.order);
  const sections = starts.map((f, i) => ({
    section: f.section,
    heightPx: (i + 1 < starts.length ? starts[i + 1].top : flow.docH) - (i === 0 ? 0 : f.top),
    tag: f.tag,
    inFlow: true,
  }));
  for (const f of oof.found.filter((x) => !x.missing)) sections.push({ section: f.section, heightPx: f.height, tag: f.tag, inFlow: false, position: f.position });
  for (const ov of rec.overlays) {
    for (const st of ov.steps) {
      if (st.click) await page.click(st.click);
      if (st.fill) await page.fill(st.fill, st.text);
      if (st.press) await page.keyboard.press(st.press);
      await page.waitForTimeout(900);
    }
    const r = await page.evaluate(locate, { root: recipes.root, entries: [{ section: ov.section, css: ov.css }] });
    const f = r.found[0];
    if (f.missing || !(f.height > 0)) problems.push(`${route}: overlay ${ov.section} not rendered after its steps (${ov.css})`);
    else sections.push({ section: ov.section, heightPx: f.height, tag: f.tag, inFlow: false, position: f.position, openedBy: ov.steps.length ? 'steps' : 'already open' });
    if (ov.closeWith) { await page.keyboard.press(ov.closeWith); await page.waitForTimeout(900); }
  }
  const sum = sections.filter((s) => s.inFlow).reduce((a, s) => a + s.heightPx, 0);
  if (sum !== flow.docH) problems.push(`${route}: in-flow tiles sum to ${sum}px but the document is ${flow.docH}px`);
  routesOut.push({ route, template: rec.template, pageHeightPx: flow.docH, sections });
  await page.close();
}
const version = browser.version();
await browser.close();

const agg = {};
for (const rt of routesOut) for (const s of rt.sections) {
  const a = agg[s.section] || (agg[s.section] = { maxHeightPx: -1, route: null, instances: 0, inFlowSomewhere: false });
  a.instances += 1; a.inFlowSomewhere = a.inFlowSomewhere || s.inFlow;
  if (s.heightPx > a.maxHeightPx) { a.maxHeightPx = s.heightPx; a.route = rt.route; }
}
const ledger = {
  description: 'Rendered heights at 1440px of the built clone (vite build + vite preview), written by extraction/measure_sections.mjs from extraction/measure-recipes.json. routes: per route the page height and every measured section instance; in-flow instances tile the document (each runs from its start to the next start, margins included, so they sum to pageHeightPx); out-of-flow instances (fixed/absolute chrome and runtime overlays opened by recipe steps) take no page height. sections: per section the tallest instance. Read by extraction/wrapper_gate.py.',
  tool: 'extraction/measure_sections.mjs (playwright chromium ' + version + ')',
  viewport: recipes.viewport,
  measuredAt: new Date().toISOString().slice(0, 10),
  routesMeasured: routesOut.length,
  routes: routesOut,
  sections: Object.fromEntries(Object.keys(agg).sort().map((k) => [k, agg[k]])),
};
for (const rt of routesOut) {
  console.log(`${rt.route}  page ${rt.pageHeightPx}px`);
  for (const s of rt.sections) console.log(`   ${s.inFlow ? 'in-flow ' : 'overlay '} ${String(s.heightPx).padStart(6)}px  ${(100 * s.heightPx / rt.pageHeightPx).toFixed(1).padStart(5)}%  ${s.section}`);
}
problems.forEach((p) => console.log('PROBLEM ' + p));
if (WRITE) {
  if (problems.length) { console.error('refusing to write with problems'); process.exit(1); }
  const mvPath = path.join(ROOT, 'extraction', 'measured-values.json');
  const mv = JSON.parse(fs.readFileSync(mvPath, 'utf8'));
  mv.sectionHeights = ledger;
  fs.writeFileSync(mvPath, JSON.stringify(mv, null, 2) + '\n');
  console.log('wrote sectionHeights to extraction/measured-values.json');
}
process.exit(problems.length ? 1 : 0);
