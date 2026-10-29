# Operate clone — information architecture

Local React + Vite + Tailwind v3 replica of https://operate.so/ (`npm install && npm run dev` → http://localhost:5300).

## IA files

- `ia.json` — **the only IA file to hand-edit.** Templates, routes and sections; each section is defined once and referenced by id.
- `IA.md`, `matrix.csv` — **generated** from `ia.json`; do not edit.
- `validate.mjs`, `build.mjs` — generic scripts. After changing `ia.json`:

```bash
node validate.mjs && node build.mjs
```

## What the data shows

- 5 routes across 4 templates: homepage, standalone sign-up, a legal template shared by `/privacy` and `/terms`, and the catch-all 404. The legal template is the only one serving more than one route.
- Only 3 of 18 sections are shared across templates: the animated background, the sign-up form and its "Leave this form?" dialog. All three are shared by the homepage (through the sign-up modal) and the standalone `/sign-up` page. The other 15 are single-template and should stay page-local.
- The homepage carries 13 of the 18 sections, including all of the paper chrome. No other route has a nav or footer: legal pages use a plain reading layout, sign-up shows only the background, and the 404 is the stock Next.js page.
- The legal body is modelled per H2: `legal.document-preamble` (text before the first H2) and `legal.document-section` (one per H2, repeated 14 times on `/privacy` and 12 on `/terms`). A single body section would hold 96-98% of each legal page.
- The `/sign-up` modal is a state of the homepage (an intercepted route), not a separate template, so it appears as overlay sections on `template.home`. `/sign-up` counts as one route, the standalone page.

## Caveats

- Legal body text is placeholder copy with the original's structure, and the sign-up form submits only to a local stub.
- Operate's brand, copy, media and commercial fonts (Denim, GT Cinetype, Muoto) are only for local reference. Don't deploy this publicly.
