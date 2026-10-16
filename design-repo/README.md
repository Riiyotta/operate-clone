# Operate design-repo

<!-- counts: tokens=195 primitives=9 components=11 sections=17 templates=4 routes=5 -->

A machine-validated PageSpec system for composing pages in the visual language of the Operate marketing site (a local React 18 + Vite + Tailwind v3 replica of operate.so). Built per the design-repo build guide: tokens, primitives, components, sections, templates, compatibility graph, schema, example instance, semantic validator, adversarial tests, manifest/allowlist.

Status: `design-review-pending`, `productionApproved: false` (see `registry.manifest.json`).

## Read this first: real company, licensing

The source is a real, live company site. Operate's wordmark/logo mark/logo-trace, copy, product media, demo avatar images (fictional people, but Operate's art), third-party integration logos (other companies' trademarks) and three commercial fonts (Denim, GT Cinetype, 205TF Muoto; Geist Mono is SIL OFL) are proprietary or licensed. `assets/asset-roles.json` defines a closed `assetRole` enum, a per-role `generationPolicy`, licensing text and a `placeholderSubstitute`. A generator MUST NOT generate or reproduce real logos, real people's photos, third-party trademarks, Operate's proprietary copy/media or its fonts; pages for any other property use placeholder or brand-neutral substitutes. `schema/example.pagespec.json` carries the real homepage copy only as a faithful reference instance for validation; do not republish it. Do not publish this repository.

## Two modes: `clone` vs `generation`

Every PageSpec declares `mode`:

- `clone` — reference reconstruction of the Operate site. May reference clone-only assets and the source copy (`schema/example.pagespec.json`).
- `generation` — an original page for any other property (`schema/example.generated.pagespec.json`: fictional brand and copy, placeholder assets, no live links). Rule `GENERATION_MODE_CLONE_ISOLATION` (graph + `semantic_validate.py`, policy in `assets/generation-policy.json`) rejects: assets not classed `generation-safe`; Operate's name/domain; third-party marks (integration brands, social labels); real/demo people; source copy of 5+ words (corpus derived from the real section exemplars, so it cannot drift); any real URL, domain or e-mail (relative paths and reserved `.invalid`/`.test`/`example.*` hosts are fine).

`assets/asset-roles.json` gives every registered asset a `generationUse`: `clone-only` (Operate-owned logo/trace, product media, texture), `blocked-for-generation` (integration logos, demo avatars, live stream/endpoint/profiles, fonts) or `generation-safe` (placeholder counterparts, each with `placeholderFor`). The English verb "operate" stays usable; the name "Operate" does not.

## Structurally unusual (documented, not normalised away)

- /privacy and /terms body text is ORIGINAL PLACEHOLDER copy with the original's structure; it is not Operate's legal text.
- Sign-up submits to a local stub only (`src/lib/signupStub.js` in the source project): no real endpoint; the booking-link redirect variant is not implemented; the original's live server action is deliberately not recorded.
- 404 is the stock Next.js page (framework-default chrome), outside the design system (`template.not-found`).
- The sign-up modal is an overlay state of `template.home` (sections `overlay.sign-up-modal`, `form.sign-up-form` variant `modal`, `overlay.leave-confirm`), not a route. The standalone `/sign-up` is `template.sign-up` (form variant `standalone`).
- The original's de-minified proprietary JS is not copied here; behaviour is cited from the specs and the clone's own source.

## Contents (counts recomputed from disk by verify_all.py)

| Layer | Count |
|---|---|
| Tokens (foundation / semantic / component / layout) | 195 (149 / 22 / 11 / 13) |
| Primitives | 9 |
| Components | 11 |
| Sections | 17 |
| Templates | 4 |
| Routes | 5 |
| Asset roles / registered assets | 12 / 54 |
| Graph rules | 12 |

```
tokens/{00-foundation,10-semantic,20-component,30-layout,themes,llm}/
primitives/  components/  sections/  templates/templates.json  compatibility/graph.json
assets/{asset-roles.json, generation-policy.json}
schema/{pagespec.schema.json, example.pagespec.json, example.generated.pagespec.json, semantic_validate.py, tests/adversarial_test.py}
extraction/{measured-values.json, verify_all.py, prove_drift.sh}
registry.manifest.json  README.md  CHANGELOG.md
```

## How a PageSpec is checked

`schema/semantic_validate.py` runs two layers. (1) Draft-07 validation against `schema/pagespec.schema.json` (closed everywhere; per-section content/motion branches generated from `sections/*.json`). (2) Semantic rules. The semantic layer **cross-references the PageSpec's declared `template` against that template's real node list** in `templates/templates.json`: the route must belong to the template; every node's section must be in the template's node list with an allowed variant; every `required` node must be present; non-repeatable nodes may not repeat; relative order must follow the template. It then applies `compatibility/graph.json` (severity `error` or `warn`, rule params and exemptions read at run time so the graph and the validator cannot diverge), word/character budgets (`x-maxWords`/`x-maxChars`), the asset registry (assetRef must be registered with the declared role), legal-block shape and, for `mode: "generation"`, the clone-isolation rule above.

## Run

```
python3 schema/semantic_validate.py [spec.json ...]      # default: the example
python3 schema/tests/adversarial_test.py                  # every mutation rejected, every control passes
python3 extraction/verify_all.py [--source-root DIR]      # parity, closure, counts, citations (citations skipped with a WARN if no source tree)
bash extraction/prove_drift.sh [SOURCE_ROOT]              # scratch-copy mutations prove verify_all.py catches drift
```

Requires python3 and `jsonschema` (Draft 7). Evidence citations (`path:line[-line]`) are relative to the source project and are listed with quoted spot-checks in `extraction/measured-values.json`; they are checked only when a source tree is available.

## Known limits

- The per-step copy of the product demo's scripted timeline is not a PageSpec field (it is fixed internal content of `product.demo`, defined in the source's `src/components/demo/`). That directory was still being edited by another agent while this repo was built; demo-derived values (typewriter 32ms/char, word reveal 25ms/word, text morph 400ms, cursor easing, panel stack 625ms, pill 650ms, composer takeover 480ms) are spot-checked by quote against the current files.
- `reducedMotionFallback` values are generation requirements; the original has no prefers-reduced-motion handling for most sections (the demo, background, lightbox, logo-trace and sending animation do have one; cited per section).
- Legal `maxItems`/`maxChars` are observed maxima from the spec's character counts of the placeholder structure.
- Canvas bead positions are random per load; only the algorithm is reproducible.
