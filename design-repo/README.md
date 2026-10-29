# Operate design-repo

<!-- counts: tokens=195 primitives=9 components=11 sections=18 templates=4 routes=5 -->

A machine-validated PageSpec system for composing pages in the visual language of the Operate marketing site (a local React 18 + Vite + Tailwind v3 replica of operate.so). Built per the design-repo build guide: tokens, primitives, components, sections, templates, compatibility graph, schema, example instances, semantic validator, adversarial tests, manifest/allowlist.

Status: `design-review-pending`, `productionApproved: false` (see `registry.manifest.json`). Version 1.2.0.

## Read this first: real company, licensing

The source is a real, live company site. Operate's wordmark/logo mark/logo-trace, copy, product media, demo avatar images, third-party integration logos (other companies' trademarks) and three commercial fonts (Denim, GT Cinetype, 205TF Muoto; Geist Mono is SIL OFL) are proprietary or licensed. A generator MUST NOT generate or reproduce real logos, real people's photos or names, third-party trademarks, Operate's proprietary copy/media or its fonts. `schema/example.pagespec.json` carries the real homepage copy only as a faithful reference instance for validation; do not republish it. Do not publish this repository.

## Two modes: `clone` vs `generation`

Every PageSpec declares a required, closed `mode`:

- `clone` - reference reconstruction of the Operate site. May reference clone-only and blocked-for-generation assets and the source copy (`schema/example.pagespec.json`).
- `generation` - an original page for any other property. One generation-safe example per template family: `schema/example.generated.pagespec.json` (home), `example.generated.sign-up.pagespec.json`, `example.generated.legal.pagespec.json`, `example.generated.not-found.pagespec.json` (fictional brand "Fieldwork", original copy, placeholder assets, reserved-domain links only).

In mode `generation`, six graph rules (implemented in `schema/semantic_validate.py`, policy in `assets/generation-policy.json`) each report one category:

| Rule | Rejects |
|---|---|
| `GENERATION_MODE_BRAND` | roles `brand-logomark`, `brand-logo-trace`; the name "Operate" in any casing other than the lower-case verb, "Operate Machine", `operate.so` |
| `GENERATION_MODE_INTEGRATION_LOGO` | role `integration-logo`; Granola, Gong, Slack, Gmail, HubSpot, LinkedIn, Google, Mux in text |
| `GENERATION_MODE_PERSON` | role `demo-avatar-image`; names the source shows (the five avatar names, the owner avatar's real-person alt text, demo contacts) |
| `GENERATION_MODE_SCREENSHOT` | roles `demo-scene-image`, `video-poster`, `footer-video-asset`, `background-texture` (product screenshots/media) |
| `GENERATION_MODE_COPY` | any string of 5+ words contained in (or containing) the source copy corpus (derived at run time from the real exemplars, the clone example and template heads); the demo's fictional companies |
| `GENERATION_MODE_URL` | roles `lightbox-video-stream`, `signup-submit-stub`, `external-social-link`; Operate's social handles; any absolute URL, bare domain, `www.` host or e-mail whose host is not reserved (`example.com/.org/.net`, `.invalid`, `.test`, `.example`); source hosts are named in the message |

Every blocked term and host carries an evidence citation into the clone source (`path:line`); `verify_all.py` re-reads each line and fails if the term is not there. Text is normalised before matching (NFKC, zero-width and soft-hyphen characters removed, curly quotes/primes and Unicode dashes mapped to ASCII, case folding). **Detection is string-based**: it does not catch homoglyphs from other scripts, paraphrase, translation, or anything inside an image. **No human has reviewed the pinned patterns**; they were derived by grepping the clone source.

## Asset roles: clone-only / generation-safe / blocked-for-generation

`assets/asset-roles.json` gives every role a closed `availability`:

| Availability | Roles | Meaning |
|---|---|---|
| `clone-only` (this repo's name for reference-only) | brand-logomark, brand-logo-trace, demo-scene-image, footer-video-asset, video-poster, background-texture | Operate-owned; mode `clone` only. `brand-logomark`/`brand-logo-trace` are `must-reuse-exact` **in clone mode only**, never usable in generation mode |
| `blocked-for-generation` | integration-logo, demo-avatar-image, lightbox-video-stream, signup-submit-stub, external-social-link, font-file | third-party marks, source person artwork, live endpoints/profiles, licensed fonts |
| `generation-safe` | placeholder-brand-mark, placeholder-integration-glyph, fictional-avatar, placeholder-product-visual, generated-background-texture, placeholder-url | stand-ins with no file in this repo; URLs only on reserved domains |

Every clone-only/blocked PageSpec-facing role lists its stand-ins in `generationSafeSubstitutes`, and every section field that accepts a role also accepts its substitutes (checked by `verify_all.py`). Availability is pinned in code twice, `PINNED_AVAILABILITY` in `extraction/verify_all.py` and in `schema/semantic_validate.py`; both are compared with each other and with the registry, and the validator decides generation-mode admissibility from its pin, so editing the registry alone cannot loosen it. Generation-safe assets are named `placeholder--*` and name the real asset they replace in `placeholderFor`.

## Sections: provenance, taxonomy, retrieval, wrapper gate

- Every section contract has `source` {id, tag, file, lines, anchor} (provenance; `verify_all.py` re-reads the range and requires the root tag and anchor in it) and `semantic` {id, category} (the AI-facing taxonomy: BACKDROP, CONTENT, CONVERSION, FEATURE, HERO, NAVIGATION, OVERLAY, SHELL, SYSTEM). Closed schema: `schema/section-contract.schema.json`.
- `retrievalEligible` is a closed boolean; 7 sections are false with a 30+ character reason (the three runtime overlays, the fixed backdrop, the binder rails, the main-sheet container, the stock 404). The list is pinned in both validators and mirrored in the allowlist.
- `extraction/wrapper_gate.py` (run by `verify_all.py`) reads heights measured at 1440px from the built clone (`extraction/measured-values.json` `sectionHeights`; re-measure with `extraction/measure_sections.mjs`): HERO > 1800px warns, > 3000px fails; one in-flow non-SHELL section > 50% of its page warns, > 60% fails (pages with fewer than 3 such sections are skipped and reported). Thresholds are pinned in code. `extraction/wrapper-whitelist.json` is empty.
- The measurement exposed the legal pages: the former `legal.document-body` held 96.5% of /privacy and 98.0% of /terms. It is now `legal.document-preamble` (opening paragraphs / table of contents) plus `legal.document-section` (one per H2, repeatable, max 14); the largest part is 24.9% of its page.

## Structurally unusual (documented, not normalised away)

- /privacy and /terms body text is ORIGINAL PLACEHOLDER copy with the original's structure; it is not Operate's legal text.
- Sign-up submits to a local stub only (`src/lib/signupStub.js` in the source project): no real endpoint; the booking-link redirect variant is not implemented; the original's live server action is deliberately not recorded.
- 404 is the stock Next.js page (framework-default chrome), outside the design system (`template.not-found`).
- The sign-up modal is an overlay state of `template.home` (sections `overlay.sign-up-modal`, `form.sign-up-form` variant `modal`, `overlay.leave-confirm`), not a route. The standalone `/sign-up` is `template.sign-up` (form variant `standalone`).
- `shell.main-sheet` is the paper sheet that frames hero, demo, ops steps and manifesto; its contract and its measured height cover only its own chrome (top padding), the framed sections are their own contracts.

## Contents (counts recomputed from disk by verify_all.py)

| Layer | Count |
|---|---|
| Tokens (foundation / semantic / component / layout) | 195 (149 / 22 / 11 / 13) |
| Primitives | 9 |
| Components | 11 |
| Sections | 18 |
| Templates | 4 |
| Routes | 5 |
| Asset roles / registered assets | 18 / 54 |
| Graph rules | 18 |

```
tokens/{00-foundation,10-semantic,20-component,30-layout,themes,llm}/
primitives/  components/  sections/  templates/templates.json  compatibility/graph.json
assets/{asset-roles.json, generation-policy.json}
schema/{pagespec.schema.json, section-contract.schema.json, example.pagespec.json, example.generated*.pagespec.json, semantic_validate.py, tests/adversarial_test.py}
extraction/{measured-values.json, verify_all.py, prove_drift.py, wrapper_gate.py, wrapper-whitelist.json, measure_sections.mjs, measure-recipes.json}
registry.manifest.json  README.md  CHANGELOG.md
```

## How a PageSpec is checked

`schema/semantic_validate.py` runs two layers. (1) Draft-07 validation against `schema/pagespec.schema.json` (closed everywhere; per-section content/motion branches generated from `sections/*.json`). (2) Semantic rules. The semantic layer **cross-references the PageSpec's declared `template` against that template's real node list** in `templates/templates.json`: the route must belong to the template; every node's section must be in the template's node list with an allowed variant; every `required` node must be present; non-repeatable nodes may not repeat and repeatable ones respect `maxPerPage`; relative order must follow the template. It then applies `compatibility/graph.json` (severity `error` or `warn`, rule params read at run time so the graph and the validator cannot diverge), word/character budgets (`x-maxWords`/`x-maxChars`), the asset registry (assetRef registered with the declared role, role used by that section), legal-block shape, the six generation-mode rules and the retrieval-eligibility pin.

## Run

```
python3 schema/semantic_validate.py [spec.json ...]          # default: the clone example
python3 schema/tests/adversarial_test.py                      # every mutation rejected, every control passes
python3 extraction/verify_all.py [--source-root DIR]          # parity, pins, gate, counts, citations (source checks WARN-skip without a source tree)
python3 extraction/wrapper_gate.py                            # the gate alone
python3 extraction/prove_drift.py [--scratch DIR]             # scratch-copy mutations prove verify_all.py catches drift
# re-measure (optional, needs a browser): in the clone project
#   npm ci && npx vite build --outDir <scratch> && npx vite preview --outDir <scratch> --port 5704
#   PLAYWRIGHT_MODULE="$(npm root -g)/playwright/index.mjs" node design-repo/extraction/measure_sections.mjs --base http://localhost:5704 --write
```

Requires python3 and `jsonschema` (Draft 7). Evidence citations (`path:line[-line]`) are relative to the source project and are listed with quoted spot-checks in `extraction/measured-values.json`; they are checked only when a source tree is available.

## Known limits

- Generation-mode detection is string-based (see above) and the patterns were not reviewed by a human.
- The per-step copy of the product demo's scripted timeline is not a PageSpec field (it is fixed internal content of `product.demo`, defined in the source's `src/components/demo/`); demo-derived values are spot-checked by quote against the current files.
- `reducedMotionFallback` values are generation requirements; the original has no prefers-reduced-motion handling for most sections (the demo, background, lightbox, logo-trace and sending animation do have one; cited per section).
- Legal `maxItems`/`maxChars`/`maxPerPage` are observed maxima of the placeholder structure.
- Section heights were measured on the clone, not the live site; no live-vs-clone parity number is claimed here.
- Canvas bead positions are random per load; only the algorithm is reproducible.
