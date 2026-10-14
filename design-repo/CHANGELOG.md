# Changelog

<!-- counts: tokens=195 primitives=9 components=11 sections=17 templates=4 routes=5 -->

## 1.0.0 (initial build)

Built from scratch in the documented order: tokens, primitives, components, sections, templates, compatibility graph, schema, example instance, semantic validator, adversarial tests, manifest/allowlist/docs.

- Tokens: 195 (every token cites tailwind.config.cjs, src/index.css, CLONE_SPEC.md, CLONE_SPEC_PAGES.md or clone source).
- 9 primitives, 11 components, 17 sections (ids reused from the source project's validated ia.json), 4 templates, 5 routes, 11 graph rules.
- Closed `assetRole` enum wired through schema + allowlist + example; per-role generationPolicy with 11 compliance roles pinned to exact values in verify_all.py.
- Motion schema closed to the evidence-grounded field set; every section const-locks its measured values and requires `reducedMotionFallback`.
- verify_all.py: allowlist parity, citation validity + quote spot-checks, manifest count recompute, schema/section sync, token/theme drift, pinned asset policies. extraction/prove_drift.sh proves each check fails on injected drift.
- Documented as structurally unusual: real company/licensing, placeholder legal copy, local-stub sign-up, stock 404, modal-as-overlay-state.
- Demo-derived values were re-checked against src/components/demo/** after the concurrent demo edits (see README known limits).
