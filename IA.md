# https://operate.so/ (local clone at /, /privacy, /terms, /sign-up, catch-all 404)

Source: https://operate.so/ (local clone at /, /privacy, /terms, /sign-up, catch-all 404)
Status: **measured-from-codebase** · production approved: **false**
5 routes · 4 templates · 18 unique sections

> Generated from `ia.json` by `build.mjs`. Edit the JSON, not this file.

## Shape of the site

The largest 3 templates (Legal document, Homepage, Sign-up (standalone)) account for 4 of 5 routes (80%). The remaining 1 routes span 1 template.

| template | routes | share |
|---|---:|---:|
| Legal document | 2 | 40% |
| Homepage | 1 | 20% |
| Sign-up (standalone) | 1 | 20% |
| 404 | 1 | 20% |

## Page chrome

**1 routes carry chrome = `binder-paper`** — Homepage.

**1 routes carry chrome = `background-only`** — Sign-up (standalone).

**2 routes carry chrome = `none`** — Legal document.

**1 routes carry chrome = `framework-default`** — 404.

## Sections by reuse

How widely a section is shared determines whether it belongs in a shared
component library or stays local to its page.

| section | category | templates | routes | implementation | scope |
|---|---|---:|---:|---|---|
| `backdrop.animated-background` | BACKDROP | 2 | 2 | `src/components/HomeBackground.jsx (+ src/lib/beadField.js)` | Behind the homepage and the standalone sign-up page (2 routes); its scroll progress freezes while the sign-up modal is pinned over the homepage. |
| `form.sign-up-form` | FORM | 2 | 2 | `src/components/signup/SignUpForm.jsx (+ SendingAnimation.jsx, src/lib/signupStub.js)` | Inside the homepage sign-up modal and on the standalone sign-up page (2 routes). |
| `overlay.leave-confirm` | OVERLAY | 2 | 2 | `src/components/signup/useSignUpCloseConfirm.jsx` | Wherever the sign-up form is shown (2 routes). |
| `legal.back-link` | LEGAL | 1 | 2 | `src/components/pages/LegalPage.jsx` | Both legal pages (2 routes). |
| `legal.document-header` | LEGAL | 1 | 2 | `src/components/pages/LegalPage.jsx` | Both legal pages (2 routes). |
| `legal.document-preamble` | LEGAL | 1 | 2 | `src/components/pages/LegalPage.jsx (blocks in src/pages/Privacy.jsx, src/pages/Terms.jsx)` | Both legal pages (2 routes). |
| `legal.document-section` | LEGAL | 1 | 2 | `src/components/pages/LegalPage.jsx (blocks in src/pages/Privacy.jsx, src/pages/Terms.jsx)` | Both legal pages (2 routes), repeated per H2. |
| `shell.binder-rails` | SHELL | 1 | 1 | `src/App.jsx (inline)` | Homepage only (1 route). |
| `shell.nav-sheet` | SHELL | 1 | 1 | `src/components/NavSheet.jsx` | Homepage only (1 route). |
| `shell.main-sheet` | SHELL | 1 | 1 | `src/App.jsx + src/components/shell/PanelHoles.jsx` | Homepage only (1 route). |
| `hero.headline-integrations` | HERO | 1 | 1 | `src/components/Hero.jsx (+ src/lib/integrationLogos.js)` | Homepage only (1 route). |
| `product.demo` | PRODUCT | 1 | 1 | `src/components/shell/DemoFrame.jsx > src/components/HomeUi.jsx (+ src/components/demo/*)` | Homepage only (1 route). |
| `product.ops-steps` | PRODUCT | 1 | 1 | `src/components/OpsSteps.jsx` | Homepage only (1 route). |
| `story.manifesto` | STORY | 1 | 1 | `src/components/Manifesto.jsx` | Homepage only (1 route). |
| `shell.footer-sheet` | SHELL | 1 | 1 | `src/components/FooterSheet.jsx` | Homepage only (1 route). |
| `overlay.video-lightbox` | OVERLAY | 1 | 1 | `src/components/VideoLightbox.jsx (+ src/lib/videoLightbox.js)` | Homepage only (1 route). |
| `overlay.sign-up-modal` | OVERLAY | 1 | 1 | `src/components/signup/SignUpModal.jsx` | Homepage only (1 route), when opened from 'Get started' / 'Try it out' / 'Talk to us'. |
| `system.not-found` | SYSTEM | 1 | 1 | `src/pages/NotFound.jsx` | Every unmatched path (1 catch-all route). |

**3 shared sections** appear in more than one template and belong in a component library.

**15 single-use sections** appear in exactly one template. Building these
as "reusable" components up front would be speculative — keep them page-local
until a second caller actually appears.

## Templates

### Homepage — `template.home`

1 route · `/` · chrome: **binder-paper**

| # | category | section | |
|---:|---|---|---|
| 1 | BACKDROP | `backdrop.animated-background` | shared ×2 |
| 2 | SHELL | `shell.binder-rails` | page-local |
| 3 | SHELL | `shell.nav-sheet` | page-local |
| 4 | SHELL | `shell.main-sheet` | page-local |
| 5 | HERO | `hero.headline-integrations` | page-local |
| 6 | PRODUCT | `product.demo` | page-local |
| 7 | PRODUCT | `product.ops-steps` | page-local |
| 8 | STORY | `story.manifesto` | page-local |
| 9 | SHELL | `shell.footer-sheet` | page-local |
| 10 | OVERLAY | `overlay.video-lightbox` | page-local |
| 11 | OVERLAY | `overlay.sign-up-modal` | page-local |
| 12 | FORM | `form.sign-up-form` | shared ×2 |
| 13 | OVERLAY | `overlay.leave-confirm` | shared ×2 |

### Sign-up (standalone) — `template.sign-up`

1 route · `/sign-up` · chrome: **background-only**

| # | category | section | |
|---:|---|---|---|
| 1 | BACKDROP | `backdrop.animated-background` | shared ×2 |
| 2 | FORM | `form.sign-up-form` | shared ×2 |
| 3 | OVERLAY | `overlay.leave-confirm` | shared ×2 |

### Legal document — `template.legal`

2 routes · `/privacy`, `/terms` · chrome: **none**

| # | category | section | |
|---:|---|---|---|
| 1 | LEGAL | `legal.back-link` | page-local |
| 2 | LEGAL | `legal.document-header` | page-local |
| 3 | LEGAL | `legal.document-preamble` | page-local |
| 4 | LEGAL | `legal.document-section` | page-local |

### 404 — `template.not-found`

1 route · `/* (any unmatched path)` · chrome: **framework-default**

| # | category | section | |
|---:|---|---|---|
| 1 | SYSTEM | `system.not-found` | page-local |

## Section reference

### BACKDROP

_Fixed, full-viewport decoration painted behind page content._

**`backdrop.animated-background`** — Deep-green (#005C00) fixed background: texture image, green dot pattern and two Canvas 2D bead/bar layers whose visibility follows scroll progress (top band below 0.35, hidden 0.35–0.65, bottom band above 0.65).

· Behind the homepage and the standalone sign-up page (2 routes); its scroll progress freezes while the sign-up modal is pinned over the homepage. · appears on 2 routes · implemented by `src/components/HomeBackground.jsx (+ src/lib/beadField.js)`

### SHELL

_The binder-paper chrome of the homepage: rails, hole-punched sheets that frame the content._

**`shell.binder-rails`** — Two thin vertical paper rails (12px, stone-800 border) running the full page height at the left and right edges, shown at lg+ only.

· Homepage only (1 route). · appears on 1 routes · implemented by `src/App.jsx (inline)`

**`shell.nav-sheet`** — Standalone hole-punched paper strip acting as the header: OPERATE wordmark, centred logo mark, and a desktop-only 'Try it out' link to /sign-up. Not sticky; scrolls with the page.

· Homepage only (1 route). · appears on 1 routes · implemented by `src/components/NavSheet.jsx`

**`shell.main-sheet`** — The large hole-punched paper sheet (CSS mask + mask-composite subtract, ResizeObserver-computed --hole-period) that contains the hero, demo, ops steps and manifesto.

· Homepage only (1 route). · appears on 1 routes · implemented by `src/App.jsx + src/components/shell/PanelHoles.jsx`

**`shell.footer-sheet`** — Folded-corner paper footer: hover-to-play video card that morphs into the video lightbox, dotted-underline links (Privacy, Terms, LinkedIn, X), 'Get started' and the copyright line.

· Homepage only (1 route). · appears on 1 routes · implemented by `src/components/FooterSheet.jsx`

### HERO

_Page-opening headline block with primary calls to action._

**`hero.headline-integrations`** — H1 headline, a paragraph with six inline integration-logo bubbles, and two CTAs: 'Get started' (opens sign-up modal) and 'Watch the video' (opens the video lightbox with an instant open).

· Homepage only (1 route). · appears on 1 routes · implemented by `src/components/Hero.jsx (+ src/lib/integrationLogos.js)`

### PRODUCT

_Blocks that explain or demonstrate how the product works._

**`product.demo`** — Framed fake-app product demo: a scripted, non-looping timeline (Quota, Meeting, Draft, Slack, Next step chapters) with fake cursor, typed text, per-character text morphs, a floating panel stack and a clickable chapter control; starts when scrolled into view; separate touch layout below 48rem.

· Homepage only (1 route). · appears on 1 routes · implemented by `src/components/shell/DemoFrame.jsx > src/components/HomeUi.jsx (+ src/components/demo/*)`

**`product.ops-steps`** — 'Getting Operational with AI': four numbered steps whose active dot follows the scroll (last step with top ≤ 50vh is active).

· Homepage only (1 route). · appears on 1 routes · implemented by `src/components/OpsSteps.jsx`

### STORY

_Brand narrative / manifesto content._

**`story.manifesto`** — 'Software doesn't close deals. You do.' green punched panel with CSS multi-column text, a ticket card, a 'Talk to us' link and the self-animating logo-trace-loop SVG (static still under reduced motion).

· Homepage only (1 route). · appears on 1 routes · implemented by `src/components/Manifesto.jsx`

### OVERLAY

_Dialogs and modals layered over a route without changing its underlying page._

**`overlay.video-lightbox`** — Full-screen video dialog streaming the Mux HLS video via hls.js; opens instantly from the hero button or via a View Transitions morph from the footer card; poster held until playback starts.

· Homepage only (1 route). · appears on 1 routes · implemented by `src/components/VideoLightbox.jsx (+ src/lib/videoLightbox.js)`

**`overlay.sign-up-modal`** — Intercepted-route modal: clicking a /sign-up link on the homepage pushes /sign-up, pins and hides the page column over the still-visible background, and hosts the sign-up form; closing restores / and its scroll.

· Homepage only (1 route), when opened from 'Get started' / 'Try it out' / 'Talk to us'. · appears on 1 routes · implemented by `src/components/signup/SignUpModal.jsx`

**`overlay.leave-confirm`** — 'Leave this form?' alert dialog (Keep editing / Leave) raised by Back, Escape, outside click or browser back while the sign-up form has unsaved input; bottom sheet on mobile.

· Wherever the sign-up form is shown (2 routes). · appears on 2 routes · implemented by `src/components/signup/useSignUpCloseConfirm.jsx`

### FORM

_Interactive data-entry blocks._

**`form.sign-up-form`** — Green waitlist form card: seven questions (name, work email, social handle, role, team size, AI usage, hardest part) with 'Other' reveals, client validation with copper error rows, and sending ('Submitting…'), error and thank-you states. Submits to a local stub only — never to a network endpoint.

· Inside the homepage sign-up modal and on the standalone sign-up page (2 routes). · appears on 2 routes · implemented by `src/components/signup/SignUpForm.jsx (+ SendingAnimation.jsx, src/lib/signupStub.js)`

### LEGAL

_Long-form legal document reading layout._

**`legal.back-link`** — Small GT Cinetype uppercase '← Back to Operate' link above the document.

· Both legal pages (2 routes). · appears on 2 routes · implemented by `src/components/pages/LegalPage.jsx`

**`legal.document-header`** — Document H1 title plus the 'Effective date:' line.

· Both legal pages (2 routes). · appears on 2 routes · implemented by `src/components/pages/LegalPage.jsx`

**`legal.document-preamble`** — The paragraphs (and, on /terms, the plain ordered table of contents) between the effective-date line and the first H2, in the 768px column on #E0E0E0. Placeholder copy with the original's structure — replace before launch.

· Both legal pages (2 routes). · appears on 2 routes · implemented by `src/components/pages/LegalPage.jsx (blocks in src/pages/Privacy.jsx, src/pages/Terms.jsx)`

**`legal.document-section`** — One heading-bounded part of the legal document: its H2 plus the H3s, paragraphs, lists, inline code and (terms only) closing horizontal rule up to the next H2. Repeats once per H2 (14 on /privacy, 12 on /terms). Placeholder copy with the original's structure — replace before launch.

· Both legal pages (2 routes), repeated per H2. · appears on 2 routes · implemented by `src/components/pages/LegalPage.jsx (blocks in src/pages/Privacy.jsx, src/pages/Terms.jsx)`

### SYSTEM

_Framework-provided pages outside the site's own design._

**`system.not-found`** — Stock Next.js 404: white page, system font, '404 | This page could not be found.' with a divider; dark-scheme variant.

· Every unmatched path (1 catch-all route). · appears on 1 routes · implemented by `src/pages/NotFound.jsx`
