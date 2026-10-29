Source: https://operate.so/

# Operate secondary pages: clone spec

This file covers `/privacy`, `/terms`, `/sign-up` (as a standalone page and as the modal opened from the homepage) and the 404 page. Read it alongside `CLONE_SPEC.md` (the homepage spec). This file refers to that spec's tokens and components rather than repeating them.

All values were measured live with headless Playwright (Chromium, DPR 1) on 2026-10-14 at 1440x900, 1280x800 and 390x844. They are computed values from getComputedStyle and getBoundingClientRect. Y values are document-absolute.

## Reference files added by this pass

| Path (under `reference/` (repo-relative)) | What it is |
|---|---|
| `screens/pages/{privacy,terms,sign-up,404}-{1440,1280,390}-full.png` | Full-page screenshots. On sign-up the fixed background only paints the first viewport in a full-page capture, which is a screenshot artifact. |
| `screens/pages/states/signup-*.png`, `modal-*.png` | Sign-up states: focus, invalid, filled, sending (2 frames), error, leave-confirm dialog, and the modal opened from the homepage |
| `dom-pages/<page>-<width>.json` | Every DOM node with full class string, attributes, box, own text and non-default computed styles, plus all network requests and meta tags. Treat these as the source of truth for anything this spec does not detail. |
| `dom-pages/signup-states.json` | Raw measurements of the sign-up states, plus the captured server-action request headers and body |
| `code/signup-form.pretty.js` | De-minified sign-up form: option lists, server action reference, zod schema, field/choice components, checkbox SVG, status row, `SignUpForm`, and the confirm-close dialog |
| `code/signup-page-and-modal.pretty.js` | `SignUpView` (standalone page), `SignUpModal` (intercepted route over the homepage) and `ThemeColorOnScroll` (minified) |
| `code/home-fun-animation.pretty.js` | `HomeFunAnimation`, the animated logo "boom" shown while the form is submitting |
| `svgs-pages/*.svg` + `svgs-pages/index.json` | Back arrow, checked-checkbox glyph, gray logo mark, and an HTML snapshot of the submitting overlay SVG |
| `assets-pages.json` | Asset manifest. **These pages load no new binary assets**: no images, fonts or video beyond what `assets.json` already lists. That is why `assets-pages/` is empty and was not created. The 3 small SVGs have suggested targets under `public/assets/pages/`, but inlining them is preferred. |

## Routes found

Crawled every `a[href]` on each page, then probed common paths (and robots/sitemap) with curl:

- `/`: already built
- `/privacy`: 200
- `/terms`: 200
- `/sign-up`: 200. When reached by client navigation from `/`, Next.js intercepts the route and renders it as a modal over the homepage (see §3.9).
- Anything else returns the 404. Probed: `/robots.txt`, `/sitemap.xml`, `/login`, `/waitlist`, `/blog`, `/about`, `/careers`, `/pricing`, `/contact`, `/security`, `/home`. All return 404.
- In-page anchors on /privacy: `#7-cookies-and-similar-technologies` and `#9-retention`. **No element on the page has those ids** (the only id in the document is `script#_R_`), so in the original these links do nothing beyond changing the hash. To clone that faithfully, leave the headings without ids. To improve on it, add `id`s to the h2s (slug of the heading text).
- External links (not to clone): mailto:legal@operate.so, mailto:billing@operate.so, developers.google.com, myaccount.google.com, plus the homepage footer's LinkedIn and X links.

## Global behaviour shared by all pages (root layout)

- **ThemeColorOnScroll** runs on every route. `<meta name="theme-color">` starts at `#85C093`. When `scrollY > 100svh` (the threshold string `"100svh"` is resolved to px by measuring a hidden div), it becomes `#E0E0E0`. It switches back when scrolled above the threshold and restores the initial value on unmount. The listener is motion `useScroll`; a plain scroll listener plus resize and visualViewport resize listeners is equivalent. Verified on /privacy: `#85C093` at the top, `#E0E0E0` at scrollY 3000.
- `html { scroll-behavior: smooth }`. html background is `lab(98.96 0 0)`, about `#FCFCFC`. It is only visible in overscroll on the legal pages.
- Body classes are the same as the homepage: `bg-waitlist-gray (#E0E0E0) font-denim text-[1rem]`, with selection colors `--selection-background: var(--color-brand)` (`#006F19`) and `--selection-color: #E0E0E0`.
- Default body line-height computes to **22.857px at 16px**, a unitless ratio of 1.428571 (10/7). Elements that don't set leading inherit this ratio. For example, the 13px back link gets 18.57px.
- Analytics (PostHog under `/op/`, Vercel) load on every page. Ignore them.
- Page `<title>`s: `Privacy Policy — Operate`, `Terms of Service — Operate`, `Sign up — Operate` (em dash with spaces), and `404: This page could not be found.`
- Meta descriptions:
  - privacy: "How Operate collects, uses, and shares information, including data from connected Google services under the Google API Services User Data Policy."
  - terms: "The terms that govern your access to and use of Operate’s website, waitlist, and CRM application."
  - sign-up: "Join the Operate waitlist. Tell us a bit about you and your sales team."
  - 404: the homepage description, plus `robots: noindex`.
  - The other pages have `robots: index, follow`.
- og/twitter tags are identical to the homepage on every page: same og:title, og:image and og:url `https://operate.so`.

---

## 1. `/privacy` and `/terms` (one shared "legal document" template)

### 1.1 What is reused from the homepage and what is not

**None of the homepage furniture appears here.** There is no nav sheet, footer sheet, paper/holes system, binder rails or HomeBackground canvas. It is a flat light-gray reading page. The only shared items are the font families (denim, cinetype), the color `stone-800 #29211E`, and the page bg token `waitlist-gray #E0E0E0`. There are no images and no SVGs.

### 1.2 Layout

```
main.min-h-svh.bg-waitlist-gray                         bg #E0E0E0, full width
 └ div.mx-auto.max-w-3xl.px-6.py-12.md:px-8.md:py-20     max-width 768px, centered
    ├ div.mb-8.md:mb-12                                   back-link row
    │  └ a[href="/"]  "← Back to Operate"
    └ article.pb-24                                       padding-bottom 96px
       ├ h1, p (effective date), intro p's / ol
       └ repeated: h2, (h3, p | ul | ol)*, [hr on /terms]
```

| | 1440 | 1280 | 390 |
|---|---|---|---|
| container (`max-w-3xl`) | x336 w768, padding 80px 32px | x256 w768, padding 80px 32px | x0 w390, padding 48px 24px |
| content column | x368 w704 | x288 w704 | x24 w342 |
| back link row | y80 h22.8, margin-bottom 48 | same | y48 h22.8, margin-bottom 32 |
| article top | y150.8 | y150.8 | y102.8 |
| page height /privacy | 7407 | 7407 | 9549 |
| page height /terms | 12711 | 12711 | 17569 |

The only breakpoint is `md` (768px). From md up, the values are the same at 1440 and 1280 because the column is capped at 768px.

### 1.3 Typography and colors (all text is `#29211E` stone-800)

| Role | Classes (original, Tailwind v4) | <md (390) | md+ (1440/1280) | Weight / family |
|---|---|---|---|---|
| Back link `a[href="/"]` | `font-cinetype text-[13px] text-stone-800 uppercase [text-decoration-skip-ink:none]` | 13px / 18.57px | same | cinetype 400, uppercase. Box 124.7x16. **No underline, no hover style.** |
| h1 | `font-denim text-[32px]/[38px] font-semibold md:text-[44px]/[52px]` | 32/38 | 44/52 | denim 600, letter-spacing normal |
| Effective-date p | same as body p, with `<strong class="font-semibold">Effective date:</strong>` + " July 1, 2026" | | | |
| h2 | `mt-12 md:mt-16 font-denim text-[24px]/[30px] font-semibold md:text-[28px]/[34px]` | 24/30, mt 48 | 28/34, mt 64 | denim 600 |
| h3 | `mt-8 md:mt-10 font-denim text-[18px]/[24px] font-semibold md:text-[20px]/[28px]` | 18/24, mt 32 | 20/28, mt 40 | denim 600 |
| p | `mt-4 text-[15px]/[24px] md:text-[16px]/[26px]` | 15/24, mt 16 | 16/26, mt 16 | denim 400 |
| ul | `mt-4 list-disc space-y-2 pl-6` + p typography | padding-left 24, li gap 8 | same | |
| ol (terms only) | `mt-4 list-decimal space-y-2 pl-6` + p typography | same | same | |
| li | `marker:text-stone-800/60` | marker color rgba(41,33,30,.6) | | |
| strong | `font-semibold text-stone-800` | | | denim 600 (the 500–700 SemiBold file) |
| inline link | `text-stone-800 underline decoration-1 underline-offset-2 [text-decoration-skip-ink:none] hover:decoration-stone-800/50` | | | 1px underline, offset 2px, skip-ink none. **Hover:** only `text-decoration-color` changes to rgba(41,33,30,.5). No transition (instant). External links get `target=_blank rel="noopener noreferrer"`. |
| code (privacy scopes) | `rounded bg-stone-800/8 px-1 py-0.5 font-cinetype text-[0.9em]` | 13.5px | 14.4px | cinetype. bg rgba(41,33,30,.08), padding 2px 4px, radius 4px. Always wrapped in `<strong>`, so it computes as weight 600 (synthetic bold on cinetype). |
| hr (terms only) | `my-10 border-t-1 border-stone-800/15` | margin 40 0, 1px rgba(41,33,30,.15) | same | Comes after every numbered section, before the next h2. The hr's 40px bottom margin collapses with the h2's top margin, so the gap is 64px md+ / 48px mobile. |

Spacing rhythm: every block element uses `mt-*` only, with no bottom margins. The article's first child (h1) has no top margin. The vertical order is 64/48 above h2, 40/32 above h3, 16 above p/ul/ol, and 8 between li.

### 1.4 Content structure for placeholder copy (do not transcribe the legal text)

Write placeholder legal copy whose character counts per block roughly match the numbers below, so the page heights match. In the lists below, `P:n` is a paragraph of about n characters, `UL/li k` is a list with k items, `s`/`a`/`c` are the counts of strong/link/code elements inside, and section totals are character counts.

**/privacy**: h1 "Privacy Policy", "Effective date: July 1, 2026". Total about 12.6k characters. 14 h2, 11 h3, 35 p, 7 ul / 32 li, 27 strong, 11 links, 6 code.
- Intro: P:28 (date) · P:452/a1 (link "operate.so", external) · P:165/a1 (link "Terms of Service" → /terms) · P:40/a1 ("Questions? Email us at legal@operate.so.")
- `1. What this Privacy Policy covers`: P:479
- `2. Personal Data`: P:165, then 6 h3 each followed by one P: "Marketing site (operate.so)" P:193/s1 · "Account and profile" P:304/s1 · "Customer Content" P:302 · "Connected Google services" P:232 · "Connected Slack data" P:203 · "Automatically collected information" P:292/a1 (link "Section 7" → `#7-cookies-and-similar-technologies`)
- `3. How we use information`: P:37 + UL li8 (648 chars)
- `4. Connected Google services`: P:103 · h3 "Scopes we request" P:86/a1 + UL li5 (1026 chars; each li starts with `<strong><code>https://www.googleapis.com/auth/…</code></strong>`; li 3 holds two scopes joined by "and") · h3 "Data we receive and store" P:480 · h3 "Limited Use" P:155/a1 + UL li4 (828) · h3 "AI and machine learning" P:268/s1 + UL li2/s2 (326) · h3 "Disconnecting and revoking access" P:280/a2 (one link → `#9-retention`)
- `5. How we share information`: P:82 + UL li5 (1248; each li opens with a bold lead-in)
- `6. How we use AI models`: P:430
- `7. Cookies and similar technologies`: P:326 · P:114
- `8. Your choices and rights`: P:8 ("You can:") + UL li4/s4/a1 (455) + P:278
- `9. Retention`: P:129 + UL li4/s4 (499)
- `10. International transfers`: P:290
- `11. Security`: P:267
- `12. Children`: P:296/a1
- `13. Changes to this policy`: P:263
- `14. Contact us`: P:68 · P "**Operate Machine, Co.**" · P "2261 Market Street STE 86910" · P "San Francisco, CA 94114" · P link "legal@operate.so". This is a postal block made of separate `<p>`s, each with mt-4.

**/terms**: h1 "Terms of Service", "Effective date: April 28, 2026". Total about 26.5k characters. 11 h2 (10 numbered + "Contact"), 37 h3, 47 p, 1 ol (10 li), 10 hr, 36 strong, 8 links.
- Intro: P:30 (date) · P:442/s2 · P:362/s1 · **OL li10, a plain non-linked table of contents** listing the section names: The Service, Restrictions, Third-Party Applications, Payment Obligations, Term and Termination, Warranties and Disclaimers, Limitation of Liability, Confidentiality, Data, General Terms. There is **no hr between the intro and section 1**.
- Every h3 is numbered `N.M Title` and is followed by exactly one long P. Each numbered section ends with an `hr`.
  - `1. The Service`: 1.1 Service Description P:800/s6/a1 · 1.2 Customer's Subscription P:512/s3 · 1.3 Operate's Ownership P:545/s1 · 1.4 Permissions P:906/s2
  - `2. Restrictions`: 2.1 Customer's Responsibilities P:324 · 2.2 Use Restrictions P:1866 · 2.3 API Access Restrictions P:324/s1
  - `3. Third-Party Applications`: no h3; P:1062/s2 · P:234/a2
  - `4. Payment Obligations`: 4.1 Fees P:613/s1 · 4.2 Payment P:1024/s2 · 4.3 Taxes P:557/s1 · 4.4 Failure to Pay P:682
  - `5. Term and Termination`: 5.1 Agreement Term and Renewals P:1038/s3/a1 · 5.2 Termination P:279 · 5.3 Effect of Termination P:1052 · 5.4 Survival P:278
  - `6. Warranties and Disclaimers`: 6.1 Warranties P:281 · 6.2 Warranty Disclaimer P:685
  - `7. Limitation of Liability`: no h3; P:870
  - `8. Confidentiality`: 8.1 Definition P:1077/s3 · 8.2 Protection and Use of Confidential Information P:943/s1 · 8.3 Compelled Access or Disclosure P:323 · 8.4 Feedback P:603/s1
  - `9. Data`: 9.1 User Information P:996/s1 · 9.2 User Submissions P:387 · 9.3 Service Data P:536/s1 · 9.4 AI and Machine Learning P:755/s1 · 9.5 Data Protection P:487/s1/a1
  - `10. General Terms`: 10.1 Publicity 178 · 10.2 Force Majeure 372 · 10.3 Changes 438/a1 · 10.4 Relationship of the Parties 172 · 10.5 No Third-Party Beneficiaries 162 · 10.6 Email Communications 463/a1 · 10.7 Amendment and Waivers 377 · 10.8 Severability 357 · 10.9 Assignment 613 · 10.10 Governing Law and Venue 885 · 10.11 Entire Agreement 238. The hr follows this section too.
  - `Contact` (unnumbered h2): the same 4-line postal block as privacy, without the leading sentence.
- Links in terms: operate.so (external), the Google API policy, /privacy, mailto:billing@operate.so, https://operate.so/terms (absolute self-link), mailto:legal@operate.so.

### 1.5 Motion and states

- No load animations (`document.getAnimations()` is empty), no scroll effects, no sticky elements and no table of contents behaviour.
- Hover: inline links change decoration color only (instant). The back link has no hover. Focus uses the browser default outline.
- Mobile: same template at 15/24 body; nothing hides or reorders.

---

## 2. 404 (any unknown path, e.g. `/does-not-exist`)

The site uses the **stock Next.js not-found page, with no custom styling**. HTTP status 404. Clone it as-is:

```html
<div style="font-family:system-ui,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji';height:100vh;text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center">
  <div>
    <style>body{color:#000;background:#fff;margin:0}.next-error-h1{border-right:1px solid rgba(0,0,0,.3)}@media (prefers-color-scheme:dark){body{color:#fff;background:#000}.next-error-h1{border-right:1px solid rgba(255,255,255,.3)}}</style>
    <h1 class="next-error-h1" style="display:inline-block;margin:0 20px 0 0;padding:0 23px 0 0;font-size:24px;font-weight:500;vertical-align:top;line-height:49px">404</h1>
    <div style="display:inline-block"><h2 style="font-size:14px;font-weight:400;line-height:49px;margin:0">This page could not be found.</h2></div>
  </div>
</div>
```

- Copy, exactly: **"404"** and **"This page could not be found."**
- Boxes: at 1440, the group is x579 y425.5 w282 h49 (h1 w69.3, then the h2 w192.7 starting at x668.3). At 390, h1 x54 y397.5 and h2 x143.3. The group is centered in a 100vh flex column.
- The inline `<style>` overrides the body's `bg-waitlist-gray`, so the page is white (#fff) with black text, or #000/#fff under dark mode. No nav, footer, background canvas or links. Title `404: This page could not be found.`, `robots: noindex`. The fonts are still preloaded by the root layout but unused.
- In the React clone, a catch-all route that renders this markup is enough. If the dev server cannot return a 404 status, that is acceptable.

---

## 3. `/sign-up`: the waitlist form

### 3.1 What is reused from the homepage and what is not

| Piece | On /sign-up? |
|---|---|
| **HomeBackground** (fixed #005C00 layer + texture + dot pattern + 2 canvases), CLONE_SPEC §2 | **Yes, the identical component**: same classes, same 1435/1270.5/380.8 pattern widths, same canvases (1435x450 at 1440; 1270x400 at 1280; 380x422 at 390). Its scroll-band logic runs against this page's own height (1410 at 1440x900, so the page does scroll). |
| `main` | `relative min-h-svh overflow-hidden bg-waitlist-deep-green (#005C00) font-features-['liga'_off]`, plus the marker div that sets html/body bg to #005C00 (same as home) |
| Nav sheet, main sheet, footer sheet, holes/tab strips, binder rails, rule caps | **No** |
| Logo mark SVG | Yes, same path as `svgs/00-*`, but the fill is overridden to #E0E0E0 and it is sized in em (`svgs-pages/signup-logo-mark-gray.svg`) |
| Button shape | **New** outline style (§3.5), not the homepage pill buttons |

### 3.2 Page layout

```
main (as above)
 ├ HomeBackground
 └ div.relative  padding: pt calc(1.5rem + safe-top) / pr,pl calc(.75rem + safe-x) / pb calc(.75rem + safe-bottom);
                 md: px 12px, py 60px (md:py-15);  lg: py 177px (lg:py-44.25)
    └ form.mx-auto.max-w-198 (792px)   ← SignUpForm
```

| | 1440x900 | 1280x800 | 390x844 |
|---|---|---|---|
| wrapper padding | 177px 12px | 177px 12px | 24px 12px 12px |
| form box | x324 y177 w792 h1056 | x244 y177 w792 h1056 | x12 y24 w366 h1163.8 |
| form inner (content) | x360 w720 | x280 w720 | x30 w330 |
| doc height | 1410 | 1410 | 1199.8 |

At 768–1023px (md, not lg) the vertical padding is 60px.

### 3.3 The form box and em-based spacing (important for Tailwind v3)

`form` classes: `relative mx-auto max-w-198 px-4 pt-3.75 pb-6.75 md:px-8.75 md:pt-8 rounded-[1px] border-1 border-waitlist-gray bg-waitlist-dark-green leading-[1.1875em] text-waitlist-gray [--spacing:0.25em] text-[1.0625rem] md:text-[1rem] font-features-['liga'_off,'lnum','pnum'] [--selection-background:white] [--selection-color:var(--color-waitlist-dark-green)]`, with `novalidate` and `aria-labelledby="sign-up-title"`.

- The form **redefines the Tailwind spacing unit to 0.25em** (`--spacing: 0.25em`), so every spacing utility inside it scales with font size. The base font is **17px below md and 16px at md+**, with line-height 1.1875em (20.1875px / 19px). In v3, write every inner spacing value as an **em** arbitrary value, using `N × 0.25em`, as listed below.
- Form: bg `#117025`, text `#E0E0E0`, border 1px `#E0E0E0`, radius 1px. Padding is `0.9375em 1em 1.6875em` below md (15.94/17/28.69px). At md+ it is `2em 2.1875em 1.6875em` (32px 35px 27px). Font features: `font-feature-settings: "liga" 0, "lnum", "pnum"`. Text selection: white background, #117025 text.
- Font: denim everywhere (400; checked option labels use 600). No cinetype or muoto on this page.

Vertical structure at 1440, absolute y values:

| y | element |
|---|---|
| 177 | form top border |
| 210 | header row (Back + logo), h19, margin-bottom .75em (12) |
| 241–264 | title band `min-h-5.75 (1.4375em) border-y-1` (h23) containing the h1 (h21) |
| 264–292 | 1. Name row (h28 incl. 1px bottom border) |
| 292–320 | 2. Work email |
| 320–348 | 3. Social handle |
| 348–554 | 4. Your role group (legend 28 + options 177 + 1px border) |
| 554–735 | 5. Team size group |
| 735–916 | 6. AI usage group (checkboxes) |
| 916–1147 | 7. Deal challenge group |
| 1147–1205 | footer: status + Submit (pt 1.375em = 22) |
| 1233 | form bottom (pb 27) |

### 3.4 Elements, copy and exact styles

All copy below is verbatim. "em" values are relative to the form font size (16px md+ / 17px mobile).

**Header row** `div.mb-3 flex items-center justify-between ps-1 pe-[0.835em]` (margin-bottom .75em; padding-left .25em; padding-right .835em = 13.36px):
- Left: `div[inert while sending]` > `button[type=button]` (on the standalone page) or Base UI `Dialog.Close` (in the modal). Classes `flex w-fit items-center gap-1.5 -mx-2 -my-3 px-2 py-3`, which give a hit area of .5em/.75em padding cancelled by negative margins. Box at 1440: x356 y198 w70 h43.
  - Content: the glyph span `inline-flex h-3 w-3.5` (0.75em x 0.875em = 12x14px), holding the back arrow SVG (`svgs-pages/signup-back-arrow.svg`, viewBox 0 0 14 12, stroke currentColor 1.5, overflow visible). Then a gap of .375em (6px), then **"Back"**.
  - No hover style, no transition. Cursor pointer.
- Right: `span.flex[aria-hidden]` > logo mark SVG `h-[0.8013em] w-[1.6026em]` (12.8x25.6 at 16px; 13.6x27.2 at 17px), path fill #E0E0E0. Box at 1440: x1041 y213.
- **h1#sign-up-title** "First, tell us a bit about you": inside `div.min-h-5.75 border-y-1 border-waitlist-gray` (1px top and bottom #E0E0E0). Classes `text-[1.125em] leading-[calc(21/18)] text-balance ps-2 md:px-2 md:text-center`. That gives 18px/21px, weight 400, centered at md+. Below md it is **left-aligned** at 19.125px/22.31px with padding-left .5em.

**Text field row** (Name, Work email, Social handle). Base UI `Field.Root` → `div.@container flex min-h-7 flex-wrap items-center py-[0.25em] border-b-1 border-waitlist-gray focus-within:bg-waitlist-gray/20 data-invalid:bg-copper data-invalid:focus-within:bg-copper`:
- Row min-height 1.75em, padding .25em 0 (4px), bottom border 1px #E0E0E0. Measured h28 at 1440 and h29.8 at 390.
- `label.mr-2 min-w-32 shrink-0`: margin-right .5em, min-width 8em (128px / 136px). It contains:
  - a number span `w-8.5 shrink-0 ps-2` (2.125em wide, padding-left .5em) with text "1.", aria-hidden
  - a label span `text-pretty`: label text plus `<span aria-hidden> *</span>` when required
- `input.min-w-0 flex-1 self-stretch truncate rounded-none bg-transparent shadow-none outline-none`. Placeholder color **#85C093** (`placeholder:text-waitlist-light-green`). In an invalid row the placeholder becomes `rgba(224,224,224,.7)`. Caret #E0E0E0. Input box at 1440: x496 w584 h19.

| # | label | name | type | required | placeholder | autocomplete / other attrs |
|---|---|---|---|---|---|---|
| 1 | Name * | `name` | text | yes | Your name | `autocomplete=name enterkeyhint=next` |
| 2 | Work email * | `email` | email | yes | Your work email | `autocomplete=email enterkeyhint=next` |
| 3 | Social handle | `socialHandle` | text | no | LinkedIn or X | `autocapitalize=none autocorrect=off spellcheck=false enterkeyhint=done` |

Pressing **Enter** in a field (when not composing) calls `preventDefault`. If the field's `enterKeyHint` is `next`, focus moves to the next text, email or url input or textarea in the form; otherwise the field blurs. Enter never submits from a text field (function `mR` in the code file).

**Choice group** (4, 5, 7 are radios; 6 is checkboxes). Base UI `Field.Root.group/choice` > `Fieldset.Root.border-b-1 border-waitlist-gray` (`role=radiogroup aria-required` / `role=group`):
- Legend row `@container flex min-h-7 flex-wrap items-center justify-between py-[0.25em] border-b-1 border-waitlist-gray group-data-invalid/choice:bg-copper`. Same number and label spans as text fields, with no `min-w-32`.
- Options container `flex flex-col gap-y-1.5 pt-3.25 pb-5 focus-within:bg-waitlist-gray/20`: gap .375em (6px), padding-top .8125em (13px), padding-bottom 1.25em (20px). A `mousedown` on the option area (outside inputs) calls preventDefault and focuses that label's radio or checkbox without a visible ring (function `mL`).
- Each option: `div.flex flex-col gap-y-1.5` > `label.flex items-start gap-x-3.5 pl-2 text-pretty has-data-checked:font-semibold`. That is a gap of .875em (14px) and padding-left .5em (8px). **The checked option's label turns semibold (600).** Row height 19px, pitch 25px at 1440.
  - **Radio**: `span[role=radio].flex size-3 shrink-0 items-center justify-center mt-[0.21875em] rounded-full border-1 border-waitlist-gray outline-offset-2 outline-waitlist-gray focus-visible:outline-1`. It is a 12px circle (12.75px at 17px) with a 1px #E0E0E0 border and a 3.5px top offset. When checked, the indicator is `span.size-1.75 rounded-full bg-waitlist-gray`: a 7px #E0E0E0 dot. A hidden native `input[type=radio]` carries name and value.
  - **Checkbox** (Q6): same box but `relative` with `rounded-[0.125em]` (2px). When checked, the indicator `span.absolute -inset-px` contains `svgs-pages/signup-checkbox-checked.svg` (filled 12x12 rx2 #E0E0E0 square with a knocked-out check).
  - Keyboard focus (`:focus-visible`): 1px solid #E0E0E0 outline at 2px offset. The options container also gets `rgba(224,224,224,.2)` from focus-within.
  - No hover styles anywhere, and no transitions.
- "Other"/"Something else" free-text: when the radio with value `other` is selected in Q4 or Q7, or the "Something else" checkbox in Q6 is checked, a `textarea rows=1` is inserted right under that option. It is wrapped in `Field.Root.pr-2 pl-8.5` (Q4/Q7) or `ps-8.5 pe-2` (Q6), i.e. 2.125em left / .5em right. Textarea classes: `block field-sizing-content w-full min-w-0 resize-none rounded-none bg-transparent shadow-none outline-none placeholder:text-waitlist-light-green`. Placeholder **"Your answer (optional)"**. aria-labels: "Your role: Other (optional)", "AI usage: Something else (optional)", and "What's the hardest part of keeping your deals moving right now?: Something else (optional)". Names `roleOther`, `aiUsageOther` and `dealChallengeOther`. Enter blurs it (enterKeyHint done). Box at 1440: x394 w678 h19.

| # | legend | name | type | options (label → submitted value) |
|---|---|---|---|---|
| 4 | Your role * | `role` | radio, required | Founder / CEO · Sales leader (VP, Head of Sales) · Account executive · SDR / BDR · RevOps / Sales ops · Other (value `other`, reveals textarea) |
| 5 | How many people sell at your company? * | `salesTeamSize` | radio, required | 0-1 (ASCII hyphen) · 2–4 · 5–50 · 51–250 · 251+ (en dashes) |
| 6 | How is your sales team using AI today? * | `aiUsage` | checkbox group, min 1 | ChatGPT, Claude, or similar · AI features in our sales tools · Custom agents or workflows · Something else (reveals textarea) · Not using AI yet |
| 7 | What's the hardest part of keeping your deals moving right now? * | `dealChallenge` | radio, required | Keeping up with follow-ups · Finding context across tools · Knowing which deals need attention · Stale CRM data · Visibility into my team’s deals · AI that doesn’t know our deals · Something else (value `other`, reveals textarea) |

Note the typographic apostrophes: "team’s" and "doesn’t" in Q7 options use U+2019, but the Q7 legend "What's" uses an ASCII apostrophe.

**Q6 hint**: Q6's legend has a hint whose placement depends on the legend row's container width, with a 29em breakpoint:
- Container ≥ 29em (desktop): `p.ml-auto pr-2 text-white/60` **"Select all that apply"** sits right-aligned in the legend row. Color rgba(255,255,255,.6). Box at 1440: x936.6 w143.4.
- Container < 29em (mobile): an inline `span` **" (Select all that apply)"** follows the label text and wraps to the second line. Box at 390: x66 y643.
- Both are hidden while the group is invalid.
- Exclusivity: checking **"Not using AI yet"** clears all other boxes. Checking any other box clears "Not using AI yet". Verified live.

**Footer / status row** `div[tabindex=-1].flex items-center justify-end gap-3.75 pe-2 pt-5.5 outline-none`: gap .9375em (15px), padding-right .5em, padding-top 1.375em (22px).
- `p[role=status][aria-live=polite].min-w-0 flex-1 text-right text-waitlist-feedback`. Color `#C8E3CE` (color-mix of #85C093 with 55% white). It is empty when idle.
- Submit `button[type=submit]`: `px-[0.75em] py-[calc(6.5em/18)] rounded-[calc(12em/18)] border-[1.5px] border-waitlist-gray text-[1.125em] leading-[calc(21/18)]`. That gives 18px/21px text, padding 6.5px 13.5px, radius 12px, transparent bg, #E0E0E0 text, **1.5px** #E0E0E0 border (Chromium at DPR 1 renders it as 1px). Box at 1440: x987 y1169 w85 h36; at 390: w90.2 h38.1 at 19.125px. Text **"Submit"**. **No hover style** (verified: identical computed values on hover). Cursor pointer.

### 3.5 Validation and error states

The form uses Base UI `Form` with `validationMode: onSubmit` and `novalidate`. Nothing is validated until the first submit. After that, Base UI revalidates each field as it changes.

On submit with errors:
- The invalid **text field row** gets bg **copper `#B85725`** (`lab(49.13 37.82 46.51)`), including while focused. Its placeholder turns `rgba(224,224,224,.7)`. Selection color becomes copper.
- An invalid **choice group** gets the copper bg on its **legend row only**. The options area stays green.
- An error message is appended inside the row: `Field.Error.ml-auto shrink-0 pr-2 pl-3 text-right @max-[29em]:basis-full`. Padding is .5em right and .75em left, color #E0E0E0 at body size. On narrow containers (<29em, i.e. mobile) it wraps to its own full-width line, right-aligned, which makes the row taller.
- Messages (exact text, all lowercase):
  - required text field or radio group: **"required"**
  - email typeMismatch: **"check the email"**
  - url typeMismatch: "check the link" (no url field exists)
  - any other invalid state: "check your answer"
  - Q6 empty: **"choose at least one"**
- Focus moves to the first invalid control (the Name input in the empty-form case).
- Screenshots: `screens/pages/states/signup-1440-invalid.png` and `signup-390-invalid.png`. At 390 the doc height grows to 1301 because the error lines wrap.

Server-side zod schema (in `code/signup-form.pretty.js`): name trimmed, 1–200 characters ("Enter your name"); email trimmed, max 254, lowercased, valid email; `roleOther`/`socialHandle`/`dealChallengeOther` trimmed, max 2000, default ""; aiUsage between 1 and 5 entries, with "Not using AI yet" allowed only on its own. If the server returns `{status:"invalid", errors}`, those errors are mapped onto the fields and focus moves to the first `[aria-invalid=true]`.

### 3.6 What submit actually does

- It calls a **Next.js Server Action**. It is not a fetch to a third-party provider, and there is no Typeform, HubSpot, Formspree or similar embed. The action is named `submitSignUp`, with action id `4005ae79c0e159cf171abe5af6cfc768222eda86ff`.
- Captured request (intercepted and aborted by Playwright, so nothing was sent to the server):
  - `POST https://operate.so/sign-up`
  - headers: `accept: text/x-component`, `content-type: text/plain;charset=UTF-8`, `next-action: 4005ae79…`, `next-router-state-tree: …`
  - body: a JSON array holding one argument:
    ```json
    [{"submissionId":"<crypto.randomUUID()>","answers":{"name":"…","email":"…","role":"other","roleOther":"","socialHandle":"","salesTeamSize":"2–4","dealChallenge":"Stale CRM data","dealChallengeOther":"","aiUsage":["Custom agents or workflows"]}}]
    ```
  - The client normalises the answers with the zod schema before sending. `roleOther`/`dealChallengeOther` are blanked unless their value is `other`; `aiUsageOther` is only included when "Something else" is checked and has text; aiUsage is ordered by the option list. The same `submissionId` is reused when re-submitting identical answers (idempotency).
- Response contract, from the client code: `{status:"accepted", bookingUrl?: string}`, `{status:"invalid", errors}`, or anything else, which is treated as an error.
- **Clone guidance:** there is no backend. Implement `submitSignUp` as a local async stub, for example a 1.2s delay that resolves `{status:"accepted"}`, behind one function so a real endpoint can be dropped in later. Keep the payload shape above.

### 3.7 Submit lifecycle states (from code; sending and error verified live)

States: `idle → sending → received | error | (invalid → idle)`.

| state | status text (`role=status`) | button | other |
|---|---|---|---|
| idle | "" | "Submit" (submit) | |
| sending | "Submitting…" (`sr-only`, i.e. visually hidden) | "Submitting…": `type=button disabled data-disabled`, same classes + **opacity .5** | Fields wrapper and Back button are `inert` and `aria-busy`. An **overlay** `div[aria-hidden].absolute -inset-px cursor-wait rounded-[1px] border-1 border-waitlist-gray bg-[rgb(41_33_30/0.3)]` covers the whole form. It holds the **HomeFunAnimation** (see Motion), `fixed top-1/2 left-1/2 w-[14.34em] h-auto -translate-1/2`: 229.4x136.7px at 16px, 243.8x145.3 at 17px, centered in the viewport. Leaving is blocked; Esc and outside clicks do nothing. |
| received (no bookingUrl) | **"Thank you! We’ll be in touch."** | **"Close"** button (`type=button`). On the standalone page it does `router.push("/")`; in the modal it closes the dialog. | Fields inert, wrapper `cursor-not-allowed`. Dismissal is "free": Back, Esc and outside clicks leave without confirmation. |
| received (with bookingUrl) | **"Thank you! You sound like a great fit."** | `a[href=bookingUrl]` **"Redirecting…"** at opacity .5 | After **2400ms**: `window.location.assign(bookingUrl)` |
| error | **"Something went wrong."** in #C8E3CE, right-aligned, filling the row (x360 w600 at 1440) | **"Try again"** (submit; retries with the same action) | Verified by aborting the request: `signup-1440-error.png` |

The status row receives focus (`tabindex=-1`) whenever the status leaves idle.

### 3.8 Leaving the form: confirm dialog

- **Triggers:** the Back button; pressing **Escape** anywhere (not while IME composing); a **click on the page outside the form** (pointerdown and click both outside the form, inside `main`); and the browser back button (a `history.pushState` guard with `signUpCloseGuard: true` catches `popstate`).
- **Behaviour by dismissal mode:**
  - idle/error ("confirm"): opens the dialog. The page scroll position is locked while it is open.
  - sending ("blocked"): ignored.
  - received ("free"): leaves immediately.
- Leaving goes back in history if `navigation.canGoBack`, otherwise `router.push("/")`. `SIGN_UP_HOME_HREF = "/"`.
- **Dialog** (Base UI `Dialog`, `role=alertdialog`, modal):
  - Backdrop: `fixed inset-0` with a `::before` overlay of `bg-black/50` (rgba(0,0,0,.5)).
  - Popup: `fixed flex flex-col gap-y-5 rounded-[1px] border-1 border-waitlist-dark-green bg-waitlist-paper font-denim text-[1rem] leading-[1.1875em] text-waitlist-dark-green [--spacing:0.25em] p-7`, with font features liga off, lnum, pnum. That is bg #EBEBEB, 1px #117025 border, text #117025, padding 28px, gap 20px.
  - Position:
    - Mobile: a bottom sheet with `inset-x-[0.75rem] bottom-[max(0.75rem,env(safe-area-inset-bottom))] mx-auto max-w-[28rem]`. Measured at 390: x12 y672 w366 h160.
    - md+: centered with `md:inset-0 md:m-auto md:h-fit md:max-w-[25rem]`. Measured at 1440: x520 y370 w400 h160.
  - Title (h2) **"Leave this form?"**: 18px/21px, weight 400.
  - Description **"Anything you've entered won't be saved."** (ASCII apostrophes): 16/19, `-mt-3.5` (−14px, pulling it up to 7px below the title).
  - Buttons row: `grid auto-cols-fr grid-flow-col gap-x-2` (equal halves, 8px gap) on mobile; `md:flex md:justify-end` on desktop. Both buttons are `px-[0.75em] py-[calc(6.5em/18)] rounded-[calc(12em/18)] border-[1.5px] border-waitlist-dark-green text-[1.125em] leading-[calc(21/18)]`, with focus-visible `box-shadow: 0 0 0 2px #EBEBEB, 0 0 0 4px #117025`.
    - **"Keep editing"**: outline; transparent bg, #117025 text. Closes the dialog.
    - **"Leave"**: solid; bg #117025, text #EBEBEB.
    - At 1440: Keep editing x683 w125.9 h36, Leave x817 w73.9. At 390: each is 150 wide.
  - No open/close animation classes: it appears instantly.
  - Screenshots: `states/signup-1440-dialog.png`, `states/signup-390-dialog.png`.

### 3.9 /sign-up as an intercepted modal over the homepage

When the user clicks any `/sign-up` link on the homepage (hero "Get started", nav "Try it out", footer "Get started"), Next.js renders **`SignUpModal`** through a parallel `@modal` slot instead of navigating away. The URL becomes `/sign-up` but the homepage stays mounted underneath. Visually it looks the same as the standalone page.

- Base UI `Dialog.Root defaultOpen modal="trap-focus"`, portalled:
  - `Dialog.Backdrop.fixed inset-0 z-50`: transparent, used only to catch clicks.
  - `Dialog.Viewport.absolute inset-x-0 top-0 z-50` with **the same padding classes as the standalone wrapper** (177px top at lg).
  - `Dialog.Popup[data-sign-up-dialog].mx-auto max-w-198 outline-none` holding the same `SignUpForm`.
- On open, the homepage's page column (`div[data-sign-up-page]`, the `max-w-368.5` wrapper from CLONE_SPEC §1):
  1. gets `--sign-up-page-top: <its current rect top>px`, e.g. `-400px` when scrolled 400
  2. gets `data-sign-up-pinned`, which applies `position:fixed; inset-x:0; top:var(--sign-up-page-top)`
  3. is hidden by `sign-up-open:invisible`, defined as `body:has([data-sign-up-dialog][data-open]) * { visibility:hidden }` on that element
  4. the window then scrolls to 0 (instant)
- So the **homepage sheets disappear and only the HomeBackground stays visible behind the form**. HomeBackground freezes its scroll-progress value while `[data-sign-up-pinned]` exists; the code is in `code/home-background-and-misc.pretty.js`, the line containing `data-sign-up-pinned`. On close the attribute is removed and the previous scroll position is restored instantly.
- Opening is **instant**: no fade or scale. Frame sampling showed opacity 1 and transform none from the first frame the dialog existed, about 120ms after the click.
- In the modal, Back is `Dialog.Close`, routed through the same confirm logic. "Leave" closes the dialog and then calls `history.back()`. After that the URL is `/` and the homepage is visible again (verified).
- On desktop (not touch, not `pointer: coarse`), the first input is focused 25ms after open.
- **Clone guidance:** in React Router, render `/sign-up` with a `location.state.backgroundLocation` modal pattern, or simply render the sign-up page as a route. Pinning and hiding the home page column is needed only for the modal variant. If the modal is not implemented, a normal route navigation looks almost identical, because both show only the background plus the form.

### 3.10 Motion on /sign-up

| What | Trigger | Values |
|---|---|---|
| HomeBackground | as on home | CLONE_SPEC §2. On this page canvases start in the top band at scroll 0. Measured after scrolling to 600 of 510 max: bottom band (`bottom:0px`). |
| Submitting animation (HomeFunAnimation, state `Boom`) | status = sending | SVG viewBox 344x205 (3 tilted ellipse "rings" around the logo; line color #E0E0E0, fill #117025; `labels:false`, `logoStill:true`). The logo stays still. The **rings toggle on a timer**: visible for **1500ms**, then exit over **750ms** with `cubic-bezier(.23,1,.32,1)` (ease-out-quint), plus a **400ms** pause, then re-enter with opacity over **400ms** on the same easing. Measured cycle: about 2.67s, with ring opacity 0→1 by about 330ms and 1→0 between 1.4s and 2.0s. With reduced motion it is static (still, rings shown). Port it from `code/home-fun-animation.pretty.js` (motion `AnimatePresence`). A static snapshot is in `svgs-pages/signup-sending-overlay-snapshot.html`. |
| Option/field focus tint | focus-within | instant bg rgba(224,224,224,.2) |
| Checked label weight | checked | instant 400→600 |
| Everything else | | no transitions, no hover styles, no load animations (`getAnimations()` empty at load) |

### 3.11 Mobile (390) differences, collected

- Wrapper padding 24/12/12. The form spans 12→378 with 1px borders. Base font 17px, so every em value scales by 17/16.
- Form padding 15.94px top, 17px sides, 28.69px bottom.
- h1 is left-aligned, 19.125px/22.31px, padding-left 9.56px.
- Text-field label column is 136px (8em); the input fills the remaining 185.5px.
- Long legends wrap ("How many people sell at / your company? *"). The Q6 hint becomes the inline "(Select all that apply)" on the second line.
- Error messages wrap below the label as a full-width, right-aligned line.
- Submit: 90.2x38.1, font 19.125px, radius 12.75px.
- The confirm dialog is a bottom sheet with equal-width buttons.

---

## 4. Things that could not be measured, or are left to code

- The success (`received`) state could not be reached without submitting real data to the production server action, so it was not triggered. Its copy and behaviour come from the client code (§3.7).
- What the server does with the submission (storage or CRM) is server-side and not observable.
- The exact frame-by-frame paths of HomeFunAnimation are computed in JS. Port the module rather than tracing it.
- The 404 dark-mode colors come from the inline CSS. They were not screenshot-verified because the headless browser ran in light mode.
- Legal page body text was intentionally not transcribed (per instructions). Use placeholder copy that matches §1.4.
