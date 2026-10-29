# Changelog

<!-- counts: tokens=195 primitives=9 components=11 sections=18 templates=4 routes=5 -->

## 1.2.0 (generation-safety revision 2 + baseline R7/R8/R9)

Review items, verified against 1.1.0 before changing anything:

- Explicit `mode` (clone | generation): already required and closed in 1.1.0; kept. pageSpecVersion 1.2.0 (asset-role enum and legal sections changed).
- Generation-mode blocking: 1.1.0 had one umbrella rule (`GENERATION_MODE_CLONE_ISOLATION`) that judged assets by the registry's per-asset `generationUse`. Replaced by six per-category rules `GENERATION_MODE_BRAND` / `_INTEGRATION_LOGO` / `_PERSON` / `_SCREENSHOT` / `_COPY` / `_URL`. Assets are judged by `PINNED_AVAILABILITY` in `schema/semantic_validate.py` (a registry edit alone cannot loosen it), plus the `placeholder--` naming and registered-role checks.
- `assets/generation-policy.json`: every blocked term and host now carries an evidence citation into the clone source, re-read by `verify_all.py`. Added terms found in the source and missing before: the owner avatar's real-person alt text, demo contacts, Google, Operate's social handles, source hosts (linkedin.com, x.com, stream.mux.com, googleapis.com, developers.google.com, myaccount.google.com). Normalisation now also maps curly quotes/primes and Unicode dashes to ASCII and rejects any non-lower-case spelling of "Operate". Detection is string-based; no human has reviewed the patterns.
- Generation-safe alternatives are now real roles (1.1.0 had placeholders registered under the real roles and `placeholderSubstitute` prose): `placeholder-brand-mark`, `placeholder-integration-glyph`, `fictional-avatar`, `placeholder-product-visual`, `generated-background-texture`, `placeholder-url` (reserved `*.example.invalid` URLs). The 24 placeholder assets moved to them; every section field accepts the substitutes of every role it accepts.
- `assets/asset-roles.json`: closed `availability` (clone-only | generation-safe | blocked-for-generation) on all 18 roles, `generationSafeSubstitutes` on every role; `brand-logomark` / `brand-logo-trace` stay `must-reuse-exact` but are availability `clone-only` (mode clone only). `PINNED_AVAILABILITY` in both `verify_all.py` and `semantic_validate.py`, cross-checked with each other, the registry and the allowlist mirror.
- Generation-safe examples: one per template family (home, sign-up, legal, not-found); 1.1.0 had the home one only.
- Adversarial suite: 102 -> 149 checks (per-category markers; normalisation evasions; registry-loosened and retrieval repo-level cases; wrapper-gate cases). `extraction/prove_drift.py --scratch DIR` replaces `prove_drift.sh`: 56 drift cases + 3 controls (availability edit, pin removed from either file, validator stops enforcing generation mode or trusts the registry, retrieval flips, gate thresholds, evidence lines, ...).

Baseline gaps closed (the baseline audit reported 10 pass / 11 fail on 1.1.0):

- R7: every section contract has `source` {id, tag, file, lines, anchor} and `semantic` {id, category}; closed `schema/section-contract.schema.json`; `verify_all.py` re-reads every source range (tag + anchor). The free-form `category` field is gone; `form.sign-up-form` is CONVERSION, `story.manifesto` and legal prose are CONTENT, the product demo and ops steps are FEATURE.
- R8: closed boolean `retrievalEligible` on every contract; 7 false with a 30+ character reason (three overlays, backdrop, binder rails, main-sheet container, stock 404), pinned in both validators (graph rule `RETRIEVAL_ELIGIBILITY_PINNED`) and mirrored in the allowlist.
- R9: `extraction/wrapper_gate.py` wired into `verify_all.py`, thresholds pinned in code; heights measured at 1440px from the built clone (vite build + vite preview) by `extraction/measure_sections.mjs` (recipes in `extraction/measure-recipes.json`, browser module from `PLAYWRIGHT_MODULE`). The measurement showed `legal.document-body` holding 96.5% of /privacy and 98.0% of /terms, so it was decomposed into `legal.document-preamble` + `legal.document-section` (one per H2; root `ia.json` updated and IA.md / matrix.csv regenerated with build.mjs). Whitelist empty.
- Graph rules 12 -> 18, asset roles 12 -> 18, sections 17 -> 18.

## 1.1.0 (generation-safety revision)

- PageSpec 1.1.0: required `mode` (`clone` | `generation`); allowlist `pagePropertiesSettable` + `generationModes`; allowlist and repository versions bumped to 1.1.0.
- `assets/asset-roles.json`: every asset classed `clone-only` | `generation-safe` | `blocked-for-generation` (`generationUseEnum`); 24 generation-safe placeholders (brand mark/trace, integration glyphs, fictional avatars, scene, texture, footer/poster frames, reserved-domain stream/endpoint/profile links) each linked by `placeholderFor`.
- New `assets/generation-policy.json` (blocked Operate/third-party/real-person terms, reserved URL hosts, copy-reuse corpus rules) and graph rule `GENERATION_MODE_CLONE_ISOLATION` (12 rules), implemented in `schema/semantic_validate.py`.
- Section schemas: pinned clone asset refs and demo chapter labels now admit a generation-safe alternative (`enum` instead of `const`).
- New `schema/example.generated.pagespec.json` (fictional brand and copy, placeholder assets, no live links).
- Adversarial suite: 42 generation-mode mutations (Operate logo, integration logo, real-person/avatar, product screenshot/media, source URL/endpoint, source copy, obfuscation) plus generation-mode controls. verify_all.py: class/placeholder closure, policy coverage, independent scan of the generated example, README table counts; prove_drift.sh: matching drift cases.

## 1.0.0 (initial build)

Built from scratch in the documented order: tokens, primitives, components, sections, templates, compatibility graph, schema, example instance, semantic validator, adversarial tests, manifest/allowlist/docs.

- Tokens: 195 (every token cites tailwind.config.cjs, src/index.css, CLONE_SPEC.md, CLONE_SPEC_PAGES.md or clone source).
- 9 primitives, 11 components, 17 sections (ids reused from the source project's validated ia.json), 4 templates, 5 routes, 11 graph rules.
- Closed `assetRole` enum wired through schema + allowlist + example; per-role generationPolicy with 11 compliance roles pinned to exact values in verify_all.py.
- Motion schema closed to the evidence-grounded field set; every section const-locks its measured values and requires `reducedMotionFallback`.
- verify_all.py: allowlist parity, citation validity + quote spot-checks, manifest count recompute, schema/section sync, token/theme drift, pinned asset policies. extraction/prove_drift.sh proves each check fails on injected drift.
- Documented as structurally unusual: real company/licensing, placeholder legal copy, local-stub sign-up, stock 404, modal-as-overlay-state.
- Demo-derived values were re-checked against src/components/demo/** after the concurrent demo edits (see README known limits).
