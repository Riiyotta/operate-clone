Source: https://operate.so/

# Operate homepage: clone spec

Measured live with Playwright (Chromium) on 2026-10-14 at 1440x900, 1280x800 and 390x844. All px values below are computed values (getComputedStyle / getBoundingClientRect), not estimates. Y values are document-absolute at the given viewport width.

The original is a Next.js (Turbopack) app built with Tailwind **v4**. Its class names use v4 spacing, where 1 unit = 0.25rem = 4px, so `px-4.25` = 17px, `max-w-368.5` = 1474px and `h-14.5` = 58px. The clone runs Tailwind **v3**. In v3, write these values as arbitrary values (`px-[17px]`) or extend the theme. When a class string below comes from the original, the px value is always given next to it.

## Reference files (all in `reference/` (repo-relative))

| File | What it is |
|---|---|
| `screens/original-1440-full.png`, `original-1280-full.png`, `original-390-full.png` | Full-page screenshots of the original. They were taken at scroll 0, so the fixed background canvas shows its "top" band only, and the footer video thumbnail has not lazy-loaded. |
| `screens/demo/1440-chapter-{meeting,draft,slack,nextstep}.png` | Hero product-demo states at 1440 |
| `dom1440.json` | Every DOM node at 1440: tag, full class string (truncated at 400 chars), bounding box, own text, typography, and non-default layout, color and motion styles. Use it as the source of truth for any element this spec does not detail. |
| `dom1280.json`, `dom390.json` | Same data at 1280 and 390, with a smaller style subset |
| `live-dom-1440.html` | Live `document.documentElement.outerHTML` after hydration. It includes the exact inline `style` vars for the hole masks (`--hole-*`), `--home-you-holes`, and so on. |
| `svgs_inter_1440.json` | All inline SVG markup plus every interactive element: classes, computed colors, transition, innerHTML |
| `svgs/*.svg` + `svgs/index.json` | 59 deduplicated inline SVGs. index.json gives each one's class, location box and use count. |
| `assets.json` | Machine-readable asset list (`url`, `local`, `usedIn`, `downloaded`) |
| `assets/fonts`, `assets/images`, `assets/video` | Downloaded binary assets. Copy them to the `local` paths listed in assets.json. |
| `code/home-components.pretty.js` | De-minified original bundle `3ifqekj1vpa5w.js`: HomePanelHoles, HomeRuleCap, video lightbox, HomeFooterVideo, HomeLeadersTerm, HomeOpsSteps and **HomeUi (the whole hero product demo + timeline)**. Port logic from here; do not guess it. |
| `code/home-background-and-misc.pretty.js` | De-minified `02__31w3cya2q.js`. Contains **HomeBackground** (the animated canvas background) at the module that starts `937912`. |
| `saved_files/1zg31zkh_qyci.css`, `43u9x5jpbccvi.css` | Original CSS (Tailwind v4 output + @font-face) |

---

## 0. Global

### Breakpoints (Tailwind v4 defaults + custom)
- `sm` 640, `md` 768 (48rem), `lg` 1024 (64rem), `xl` 1280 (80rem), `2xl` 1536 (96rem)
- custom `home-you-wide`: `@media (min-width: 90rem)` (1440px)
- custom `min-[90rem]:` is also used once, in the footer
- At **1440**, `xl` and `home-you-wide` both apply. At **1280**, `xl` applies but `home-you-wide` does not. At **390**, only the base styles apply.

### Root CSS variables
```
:root { --home-intro-distance: 12vh; --home-you-logo-width: 230px; --home-rule: .8px; (rule images 0.8px) }
@media (min-width:48rem) { :root { --home-rule: 1.25px; (rule images 1.25px) } }
--home-rule-l: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='8' height='8'><rect width='1.25' height='8' fill='#117025'/></svg>")   (md+; 0.8 wide below md)
--home-rule-r: same but rect x='6.75' (x='7.2' width .8 below md)
--home-rule-t / --home-rule-b: horizontal versions (rect height 1.25 / y=6.75)
.home-rule-l { background-image: var(--home-rule-l); background-position:0 0; background-repeat:repeat-y; background-size:8px 8px }
.home-rule-x { background-image: var(--home-rule-l), var(--home-rule-r); background-position:0 0,100% 0; background-repeat:repeat-y; background-size:8px 8px }
.home-rule-r analogous; .home-rule-y = top+bottom horizontal rules
.home-strip-y { two 8x8 tiles with 0.8px #29211E lines at top (y=0) and bottom (y=7.2), repeat-x, positions 0 0 / 0 100% }
.max-md:home-outline { below md: 0.8px #29211E vertical lines at x=0.2 and x=7 tiles (draws the outline instead of a border) }
```
`HomeRuleCap` is a small square in rule color: `span.pointer-events-none.absolute size-1.25 (5px) md:size-2 (8px) bg-[#117025]`. It marks the ends of rules (the "dots" at the line corners in the screenshots).

### Fonts. All are self-hosted woff2 and all `font-display: swap`. Download links are in assets.json.
| family name | file | weight / style | used for |
|---|---|---|---|
| `denim` | Denim_Regular-s.p.3p2rpf-e0w2_y.woff2 | 400 normal | body default (`body.font-denim`), paragraphs, buttons |
| `denim` | Denim_RegularItalic-s.p.2-okkbg3i7rqs.woff2 | 400 italic | preloaded only. No italic text was measured on the homepage. |
| `denim` | Denim_SemiBold-s.p.0haakjq11jk4x.woff2 | **500 700** range | all `font-semibold` (600) headings, strong |
| `cinetype` (GT Cinetype) | GT_Cinetype_Regular-s.p.3542o7l2yeifo.woff2 | 400 | nav strip, ops-step detail lists, footer copyright, "Watch the video" card label, manifesto ticket labels |
| `muoto` (205TF Muoto Variable) | 205TF_Muoto_Variable-s.p.350syuw1smhk5.woff2 | 100 900 | hero product demo UI only (`section.font-muoto`). The weight "book" is **450** (`--font-weight-book:450`). |
| `geistMono` (Geist Mono Variable) | GeistMono_Variable-s.0i6gvwz98tw0u.woff2 | 100 900 | **not preloaded**. Loaded only when the demo reaches the Slack chapter. |
| `"Courier New", monospace` | system | | manifesto "ticket" values (2.0, A PROPER PLACE TO WORK, 2026, 1, B001) |

Fallback @font-face rules (copy them for CLS parity):
```
denim Fallback:     local(Arial); ascent-override:97.38%; descent-override:21.75%; line-gap-override:0%; size-adjust:97.46%
cinetype Fallback:  local(Arial); ascent-override:89.97%; descent-override:20.87%; line-gap-override:0%; size-adjust:107.82%
muoto Fallback:     local(Arial); ascent-override:91.19%; descent-override:22.8%;  line-gap-override:0%; size-adjust:105.28%
geistMono Fallback: local(Arial); ascent-override:76.43%; descent-override:22.43%; line-gap-override:0%; size-adjust:131.49%
font stacks: "denim","denim Fallback" / "cinetype","cinetype Fallback" / "muoto","muoto Fallback" / "geistMono","geistMono Fallback"
```
`main` has `font-feature-settings: 'liga' off` (`font-features-['liga'_off]`), and so does the nav strip. Every measured element has `font-variation-settings: normal`. No variation axes are set; weight comes from `font-weight`. `letter-spacing` is `normal` unless listed. The body wrapper has `tracking-normal`.

### Color tokens (exact)
| token | value | where |
|---|---|---|
| deep green (page bg) | `#005C00` | `main` bg, background layer, `html/body` bg via `[body:has(&)]:bg-waitlist-deep-green` |
| dark green (ink) | `#117025` rgb(17,112,37) | all marketing text, rules, rule caps, primary button bg |
| light green | `#85C093` rgb(133,192,147) | canvas pattern dots, ticket card, video-card inner frame, theme-color meta |
| manifesto green panel | `#94BA9D` rgb(148,186,157) | "Software doesn't close deals" panel bg, logo bg (md only) |
| video card | `#77AA83` rgb(119,170,131) | footer "Watch the video" button bg, lightbox media bg |
| paper | `#EBEBEB` (waitlist-paper) | main sheet bg, footer sheet, binder rails, Watch-video button bg |
| nav sheet | `#DCDCDC` | nav strip sheet bg |
| strip | `#FAFAFA` at 60% (mobile) / 70% (lg) | nav inner strip |
| waitlist gray | `#E0E0E0` | primary button text + border, body bg class, link hover text |
| stone-800 | `#29211E` rgb(41,33,30) | sheet borders, step numbers + body copy in ops steps, ticket text, chapter controls |
| white | `#FFFFFF` | button hover bg; ops step header `bg-white/60` |
| demo frame | `#FCFCFC` outer, `#F7F7F7` inner app bg | product demo |
| demo grays (light theme; lab → hex) | gray-900 `#09352E`, 800 `#294D47`, 700 `#5F6D6B`, 600 `#71807E`, 500 `#9BA8A7`, 400 `#CAD3D2`, 300 `#E0E5E5`, 200 `#EDEFEF`, 100 `#F7F7F7`, 75 `#FCFCFC`, 50 `#FFFFFF` | demo UI text and borders |
| demo accent | `#008125` rgb(0,129,37) active nav item text; gradient `linear-gradient(180deg,#269600,#008125)` for send button + notification badge | demo |
| brand green-600 | `#006F19` | `::selection` background (`--selection-background: var(--color-brand)`, `--selection-color: #E0E0E0`) |
| lightbox backdrop | `rgba(0,0,0,.70)` below lg, `rgba(0,0,0,.50)` at lg+ | video lightbox |

`<meta name="theme-color" content="#85C093">`. Title: `Operate – Collaborative AI for frontier sales organizations`. og:description: "Operate connects your sales data to surface where every deal stands and what's next. Your team and agents act together, and you run like a team twice your size." og:image `/operate-og.png` 1200x630. The og:image alt is in `assets_raw1440.json`.

---

## 1. Page skeleton (1440 unless noted)

```
body.bg-waitlist-gray.font-denim.text-[1rem]
 └ div.isolate.size-full.tracking-normal
   └ main  (relative min-h-svh overflow-hidden bg-#005C00; display:grid; all children col-start-1 row-start-1 → stacked layers)
      ├ [fixed background layer]  pointer-events-none fixed inset-0 overflow-hidden   (aria-hidden)  → §2
      ├ div fixed inset-0 (marker that sets html/body bg to #005C00)
      └ div.page  relative mx-auto w-full max-w-[1474px] overflow-hidden px-3 (12px) lg:px-9.5 (38px)
          ├ binder rail L  (lg only) absolute top-0 left-3 (12px) h-full w-3 (12px) border 1px #29211E bg #EBEBEB
          ├ binder rail R  (lg only) absolute top-0 right-3 ...same
          └ div.column  flex flex-col gap-y-9 (36px) lg:gap-y-11 (44px) pt-15 (60px) lg:pt-11 (44px) pb-[calc(12vh*1.75)]
               ├ spacer  h-[calc(12vh-6rem)] lg:h-[calc(12vh-5.5rem)]   (1440x900: 20px; 1280x800: 8px; 390x844: 5px)
               ├ NAV SHEET  → §3
               ├ MAIN SHEET → §4–§7  (hero, product demo, "Getting Operational", manifesto)
               └ FOOTER SHEET → §8
```
Measured page heights are 3604 (1440x900), 3789 (1280x800) and 4012 (390x844). Bottom padding is `12vh*1.75`: 189px at 900h, 168px at 800h, 177.24px at 844h.

**Sheet x-extent:** at 1440 the column is x 38–1402 (width 1364), at 1280 it is 38–1242 (1204), and at 390 it is 12–378 (366). The binder rails sit at x 12–24 and 1416–1428 (1440).

### "Paper with punched holes" system (HomePanelHoles)
Each sheet (nav, main, footer) gets a `div.contents` containing these layers:
1. A bg layer `absolute -z-10 inset-0` (nav `bg-[#DCDCDC]`, main and footer `bg-waitlist-paper`). Its **mask** punches holes through the sheet. The mask is `linear-gradient(#000 0 0)` minus hole shapes, using `mask-composite: subtract, add...`. The layer's **background-image** draws thin #29211E rings around the holes.
2. Two "tab strips", 47px wide at lg+, at `left:-30px` and `right:-30px`. They tile a 47x12 SVG (rect fill #FAFAFA, stroke #29211E) to draw the binder ring tabs that cross the rails.
3. Below lg (md for the footer) there are smaller variants: 30px strips at -16px, 12px holes, and 30x8 tabs.

Hole geometry (from code, `reference/code/home-components.pretty.js` lines 1–45):
- **bar** (nav): an 18px circle hole at left 14px and right 14px, vertically centered. Mobile: 12px circle (r=5 cut, ring r=5.4 stroke .8) at 11px.
- **panel** (main sheet): a pair of rounded-rect slots 18x20.333 (rx 8.5), stacked at y and y+29.665. They are tiled every `--hole-period`, plus single 18px circles. `--hole-period` = (sheetHeight + 2 − 112.998) / round(that/566.5), computed by a ResizeObserver. Default is 566.5px.
- **footer**: circles at top 37px and bottom 30.4px. It has a **folded corner**: `--hole-fold-clip: inset(0 124px 0 0)` (md+) and `--hole-sm-fold-clip: polygon(0 0,100% 0,100% calc(100% - 31px),0 100%)` (<md), plus SVG overlays for the fold. The fold is a 125x314 viewBox path with a diagonal hatch pattern (24x72 diamond `M12 0 L24 36 L12 72 L0 36 Z`, stroke #9D989B 0.5, rotate 17.12°) and a ring circle at (39, 262.1) r 8.5. The SVGs are saved as `svgs/51-*`–`55-*`.
- Exact computed `--hole-*` custom properties are in the inline `style` attributes in `live-dom-1440.html`. Copy them verbatim, or port `HomePanelHoles`.

---

## 2. Fixed animated background (HomeBackground)

Layer stack, all `pointer-events-none`, `aria-hidden`, `fixed inset-0 overflow-hidden`:
1. `div.isolate.absolute.inset-0 bg-[#005C00]`. On iOS (`supports-[-webkit-touch-callout:none]`) it also gets `.mask-edge-fade`, a 1.5rem top and bottom fade. Inside is `div.size-full bg-repeat opacity-20 mix-blend-overlay` with background `home-background-texture.png` (2940x200 source) at `background-size:1470px 100px`, delivered via `image-set(1x w=1920, 2x w=3840)`.
2. Pattern container, horizontally centered: `w = round(down, 100% - size, patternSize) + size`. Measured widths are 1435 (1440), 1271 (1280) and 381 (390), at left 3, 5 and 5. Background is a repeating tiny-dot SVG:
   - desktop (md+): `<svg width="23.5" height="4.5"><rect width="1.5" height="1.5" fill="rgb(133,192,147)"/></svg>`, so columns of 1.5px dots every 23.5px horizontally and 4.5px vertically
   - mobile: `<svg width="20" height="2.8"><rect width="0.8" height="0.8" fill="rgb(133,192,147)"/></svg>`
3. Inside the container, **two canvases**, each 1435x450 CSS px at 1440 (dpr capped at 2): circlesCanvas and rectanglesCanvas.

Canvas behaviour (ported from `code/home-background-and-misc.pretty.js`, function `N`/`S`/`HomeBackground`):
- Columns: `floor(width/(lineSize+lineGap))`. Desktop lineSize 1.5 and gap 22, mobile 0.8 and 19.2. Each column holds 5–8 moving "beads" (seeded random), with sizes radius 6 and radiusLarge 8 (7 on mobile).
- Bead types, chosen randomly: 15 of 19 are Circle (dark #117025 fill with #85C093 2px ring), plus Dot, Star, StarCircle and Subcircle (drawn with #85C093/#117025). Each is pre-rendered to a sprite sheet.
- Beads slide vertically along their column at speed 0.2–1 px per 16.67ms tick, random direction. They reverse on collision (radius−3) and at the bounds (−0.5h to 1.5h). `speedMultiplier` eases with cubic-bezier(.455,.03,.515,.955): 2.5s when slowing, 2s when speeding.
- Blurred light-green gradient rectangles (blur 3px, opacity 0.08–0.20, heights 150px desktop / 110px mobile) sit behind the beads.
- **Scroll-driven visibility:** `p = scrollY / (scrollHeight − innerHeight)`. Canvases render only in the **top band** (p < 0.35, canvases anchored `top:0`) and the **bottom band** (p > 0.65, anchored `bottom:0`). Between those they get `visibility:hidden`. Verified: at 1440, p 0–0.30 → top, 0.36–0.64 → hidden, 0.70–1.0 → bottom. Band strength = 1 − smoothstep(0, .35, p) (top) or smoothstep(.65, 1, p) (bottom). Each canvas is ceil(viewHeight/2) tall and fades out toward the page middle via a destination-out gradient.
- Animation runs on rAF only while a band is visible, the page is in view, and the video lightbox is closed. With `prefers-reduced-motion` it draws static frames on scroll.
- The pattern and canvases are visible only through the gaps around the sheets: above the nav sheet, between sheets, and below the footer.

---

## 3. Nav sheet (not sticky; it scrolls with the page, and there is no scroll-dependent nav behaviour)

| | 1440 | 1280 | 390 |
|---|---|---|---|
| sheet box | x38 y108 w1364 h58 | x38 y96 w1204 h58 | x12 y101 w366 h34 |
| classes | `relative isolate h-8.5 (34px) lg:h-14.5 (58px) border-1 max-md:home-outline md:border-stone-800` | | |
| inner strip | x89 y125 w1262 h24 | x89 y113 w1102 h24 | x44 y109 w302 h19 |

Inner strip: `absolute inset-x-[31px] lg:inset-x-[50px] top-1/2 -translate-y-1/2 flex items-center justify-between h-4.75 (19px) lg:h-6 (24px) bg-[#FAFAFA]/60 lg:bg-[#FAFAFA]/70 home-strip-y lg:home-rule-y px-3 (12px) lg:px-5.5 (22px) font-cinetype text-[11.2px]/[19.2px] lg:text-[14px]/[24px] tracking-[0.05em] text-[#117025] uppercase`. Measured letter-spacing is 0.7px at 14px.

Contents, left to right:
- `span.lg:pl-0.5` **"Operate"** (rendered uppercase OPERATE)
- the logo mark SVG (`svgs/00-operate-logo-mark-navbar.svg`, viewBox 0 0 32 16, fill #117025). Size `h-2.5 w-5` (10x20) on mobile and `lg:h-3.25 lg:w-6.25` (13x25) at lg. At lg it is absolutely centered (`lg:absolute lg:left-1/2 lg:-translate-x-1/2`); measured at x708 y131 w25 h13 (1440). On mobile it is the right-hand item in the flex row.
- `a[href=/sign-up].hidden.lg:block`: `<span aria-hidden>˗ˏˋ </span>Try it out<span aria-hidden> ˎˊ-</span>`. It renders as "˗ˏˋ TRY IT OUT ˎˊ-", x1208 w121 at 1440. It has **no hover style**.

**Mobile nav:** there is no hamburger and no menu. Below lg the strip shows only "OPERATE" and the logo mark, and "Try it out" is hidden. The only CTAs on mobile are the hero buttons and the footer "Get started".

---

## 4. Main sheet + hero

Main sheet: `relative isolate border-1 max-md:home-outline md:border-stone-800 px-4.25 (17px) pt-12 (48px) pb-8 (32px) lg:pt-24.25 (97px) lg:px-18.5 (74px)`.
- 1440: x38 y210 w1364 h2844; content box x113–1327 (width 1214)
- 1280: y198 h3062; content width 1054
- 390: y171 h3204; padding 48/17/32; content x30–360 (width 330)

### Hero `<section>` (1440: x113 y308 w1214 h261)
`div.grid gap-y-6 (24px) md:grid-cols-2`. Columns are 607px + 607px at 1440 and 527 + 527 at 1280. Below md it is one column of 330 with a 24px row gap.

**Left cell** `relative px-4.5 py-2.75 home-rule-x md:px-7 md:pt-1 md:pb-7.5 md:home-rule-l lg:pt-5 lg:pb-18.25`. Computed padding: 20px 28px 73px at lg; 11px 18px at 390.
- Rule caps at top-left (lg), and at top-right (xl, `right-4.5`).
- Decorative quarter-arc SVG (xl only), `svgs/01-*`: 252x252 at x449 y316. Class `top-2 right-[calc(18px+var(--home-rule)/2)] aspect-square h-[calc(100%-8px-var(--home-rule)/2)]`. It is a radius-sized arc, stroke #117025, stroke-width `var(--home-rule)`.
- **h1** "Collaborative AI for frontier sales organizations": `max-w-100 (400px) font-semibold text-[#117025] text-[36px]/[42px] md:text-[48px]/[56px]`.
  - 1440: x141 y328 w400 h168 (3 lines)
  - 390: x48 y231 w294 h126, 36/42 (3 lines)

**Right cell** `relative flex flex-col items-start px-4.5 pt-1.5 gap-y-5.5 (22px) home-rule-l md:home-rule-x md:px-8.5 (34px) md:pt-3.5 lg:gap-y-12.75 (51px) lg:home-rule-l lg:pt-8 (32px)`.
- Rule caps: bottom-left (lg) and top `right-[calc(112px+rule/2)]` (lg).
- Arc SVG `svgs/04-*`: 112x260 at x1214 y309 (lg). Path `M0 0A112 112 0 0 1 112 112` plus a vertical line from y111 to 100%, stroke #117025. The mobile variant is `svgs/02-*` (radius 90, 90x210 at 390).
- **p** `max-w-122 (488px) text-[#117025] text-[16px]/[22px] md:text-xl/[27px] (20/27)`. Box at 1440: x754 y340 w488 h108. Copy:
  > We connect to your sales data (〈6 overlapping logo bubbles〉) to surface where every deal stands and what’s next. Your team and your agents act on it together, and you run like a team twice your size.

  The bubbles sit inside `span.whitespace-nowrap`: "(" + `span.mx-[0.2em].inline-block` + ")". Each bubble is `span.relative.inline-block size-[0.9167em] rounded-full align-middle not-first:-ml-[0.1833em]`: 18.33px at 20px font, overlap −3.666px; 15px at 16px. Bubble shadow: `0 0 0 1.83px #EBEBEB, 0 7.33px 14.67px -7.33px rgba(0,0,0,.12), 0 0 1.83px rgba(0,0,0,.08), 0 0 0 .55px rgba(0,0,0,.08), 0 .92px .92px -.46px rgba(0,0,0,.06), 0 1.83px 1.83px -.92px rgba(0,0,0,.08), inset 0 .92px 1.83px #fff`. The first bubble's bg is #EBEBEB; the others' are #F6F6F6 (see live DOM per bubble). The bubble SVGs are `svgs/05..10-hero-integration-logo-1..6.svg` in DOM order: 1 = "+" (stroke #9BA8A7), then the integration logos. The sr-only text reads "Granola, Gong, Slack, Gmail, HubSpot and more".
- **Buttons row** `flex flex-col-reverse items-start gap-2 (8px) md:flex-row md:flex-wrap md:gap-1 (4px)`. On mobile, "Watch the video" is visually above "Get started" (flex-col-reverse; `[reading-flow:flex-visual]`).
  - **Get started** `a[href=/sign-up]`: px-3 py-[5.5px] rounded-[10px] border-1 text-[16px]/[19px]; md: px-3.75 (15px) py-1.75 (7px) rounded-xl (12px) text-[18px]/[20px]; bg #117025, text #E0E0E0, border #E0E0E0. **Hover:** bg #FFFFFF, text #117025, border #117025. Box 1440: x754 y499 w121 h36. 390: w105 h32.
  - **Watch the video** `button[aria-haspopup=dialog]`: same metrics, bg #EBEBEB, text #117025, border #117025. **Hover:** bg #FFFFFF. Box 1440: x879 w158 h36. 390: w138 h32. Click opens the video lightbox (§9). pointerenter, pointerdown and focus preload the player.
  - Transition on both: `color, background-color, border-color, outline-color, text-decoration-color, fill, stroke 150ms cubic-bezier(0,0,.2,1)`.

---

## 5. Product demo section (HomeUi)

`section.relative.font-muoto mt-12.75 (51px) lg:mt-13.25 (53px) max-lg:pb-7 (28px) lg:home-rule-l lg:pr-11.5 (46px) lg:pl-8.5 (34px)`. It has rule caps at top-left and top-right (lg).
- 1440: section x113 y622 w1214 h768; frame x147 w1134 h768
- 1280: frame w974
- 390: frame x30 y653 w330 h713

**Frame** (height `h-178.25` = 713 mobile, `md:h-177.75` = 711, `lg:h-192` = 768): `relative mx-auto max-w-292 (1168px) size-full rounded-2xl (16px) md:rounded-xl (12px) border-1 border-transparent md:border-gray-400 (#CAD3D2) bg-[#FCFCFC] lg:p-6 (24px)`.
- Shadow (md+): `0 4px 4px -4px rgba(0,0,0,.14), 0 1px 1px -.5px rgba(0,0,0,.08), 0 12px 24px -6px rgba(0,0,0,.08), 0 8px 16px -4px rgba(0,0,0,.10)`. Mobile adds `0 1px 2px 1px #FFF inset` first.
- md+: two 12px-tall caps (`rounded-t-xl` / `rounded-b-xl`, 1px #29211E border on three sides) at the top and bottom edges create the "binder clip" outline. Mobile instead uses an SVG outline (`svgs/11-*` to `15-*`).
- **App window** `size-full flex flex-col rounded-2xl bg-[#F7F7F7] md:rounded-xl lg:rounded-md (6px) lg:border lg:border-gray-200 (#EDEFEF)`. Box 1440: x172 y647 w1084 h718.
- Desktop grid: `grid h-full grid-cols-[1fr_372px] lg:grid-cols-[1fr_304px] xl:grid-cols-[246px_1fr_302px]`. Measured columns are 246 / 534 / 302 at 1440 and 246 / 374 / 302 at 1280.
  - **Sidebar** (xl only), p-1.75 (7px). Rows: workspace header "Quietwork" (14/20, weight 450, ls −0.14px, #09352E) with chevron, search icon and bell with a gradient badge "4" (9px, white, 14px circle). Nav rows are 32px tall (px-2 py-1.5, gap-x-2, 16px icons, 14/20 weight 400, ls −0.14px, #5F6D6B): Home, Tasks (meta "10" 12/17 #9BA8A7), Skills. Section labels are 12/17 weight 450, ls 0.12px, #9BA8A7, px-2 py-[3.5px], h24: Private / Team workspace. The rest: Monthly Quota (active: #008125, weight 450), My renewals; Inbound ICP review, Weekly commit, Halden (meta "25K"); Operate group: Prep for Fielded, Brightline stalled, Draft email follow up; "See all" (pl-8). Groups have gap-y-6 (24px) and rows gap-y-0.5 (2px).
  - **Chat column** px-4 xl:px-10 (40px). Sticky header "Quota" (13/19, weight 450, ls −0.13px, #09352E) with 16px icon, py-1.75, bg #F7F7F7, and a 24px fade below it. Messages use `flex flex-col gap-y-8`. Assistant text is 14/23 #294D47. The user bubble is right-aligned (`max-w-[min(24rem,80%)] px-3 py-[7.5px] rounded-[10px] border-[0.5px] bg rgba(0,129,37,.05)`). The "Checked 3 sources" list is 12/17, with #71807E source names and #9BA8A7 details. "Final stretch" is 14/23 weight 500. The insight card has three items, each a label at 12/17 #71807E plus a value at 14/20 #294D47. Suggestion chips: `px-2.5 py-[3.5px] rounded-full bg-black/3 shadow-[0_0_0_0.5px_rgba(0,0,0,0.08)_inset] text-[11px]/[17px]` (computed 12px weight 450 #71807E); hover (`data-hovered`) bg-black/6; transition bg and scale 120ms cubic-bezier(.4,0,.2,1). The composer is rounded 24px, bg #FCFCFC, p-2, h48, with placeholder "Ask about Quota..." (15/21 #9BA8A7). The send button is 32px round with gradient #269600→#008125; hover brightness 110%; transition filter and scale 120ms.
  - **Floating panel**: `md:absolute md:top-12 md:-right-3 md:w-[384px] md:h-173 lg:top-26 (104px) lg:-right-14 (−56px)`. It is intentionally wider than the frame and overflows past the frame's right edge. Box 1440: x952 y727 w384 h692. Inner card: `rounded-xl md:rounded-2xl bg-white` with shadow `0 4px 4px -4px rgba(0,0,0,.14), 0 1px 1px -.5px rgba(0,0,0,.08), 0 0 0 .5px rgba(0,0,0,.16), 0 12px 24px -6px rgba(0,0,0,.08), 0 8px 16px -4px rgba(0,0,0,.10)` and a 16px white fade at the bottom. Content is the Monthly Quota panel: title 17/24 weight 500, ls −0.255px. The Objective box sits in `rounded-2xl bg-black/3 border-black/2 p-[3.5px]`, followed by a progress bar card ($0 / Pace / $90k; $56k booked, $92k commit, $121k best case). Then "Commit $36k": Holloway $18k "Contract out for signature · Closes Sep 15", Tideline $12k "Verbal yes · In security review", Bramble $6k "Pricing agreed · Closes Sep 26". Then "Best case $29k": Fielded $4k "Gone quiet 9 days · Closes Sep 24", Halden $25k "Champion aligned · Needs exec sign-off". Rows have 24px icon tiles (rounded 7.5px).
- **Mobile (<md)**: a different "touch" layout (`sx`/`sh` in code). The panel stacks on top (`h-132` = 528px, padding 3.5 3.5 15.5), with the chat and composer below (183px). The fake cursor is a 20px ring (`size-5 rounded-full border border-black/24`), not an arrow. See `screens/original-390-full.png`.
- All copy for every chapter is in `code/home-components.pretty.js` (search for the text, e.g. "Unblock Holloway"). The four chapter screenshots show the later states. Don't retype the copy from screenshots; copy it from the code.

### Chapter control (below the frame)
`div[role=group][aria-label="Demo chapters"].flex.items-center.gap-1 (4px).font-denim.absolute.top-[calc(100%+1px)].left-1/2.-translate-x-1/2.mt-4 (16px)`. At 1440 it sits at x658 y1406, width 112.
- Play/pause button: a 12x12 SVG (`svgs/47-demo-chapter-pause-icon.svg`, a #29211E circle with #D9D9D9 bars).
- 5 chapter pills: **Quota, Meeting, Draft, Slack, Next step**. Each is `span.relative.block.h-3 (12px).overflow-hidden.rounded-full.border-1.border-stone-800.bg-[#D9D9D9]`.
  - The width animates 12 → 32px when the pill becomes active (motion `transition tD`).
  - The active pill contains a fill `span.absolute.top-0.left-0.h-2.w-7.rounded-full.bg-stone-800` whose `translateX` goes linearly from −20px to 0 over the chapter's duration (WAAPI). Inside it, an inner wrapper scales 0.5 → 1 on enter.
  - Inactive pills show a 4px dot at 3px,3px: opacity 0 → 1 on hover/focus, 150ms.
- Tooltip (Base UI popover): side bottom, offset 3. `rounded-[4px] bg-[#D9D9D9] px-[2.5px] py-px font-denim text-xs (12px) font-semibold uppercase #29211E`, showing the chapter label or Play/Pause. Opacity transition 150ms ease-out-cubic; position transition 250ms.

### Demo timeline (measured live at 1440, plus code)
- The demo **starts only when it scrolls into view**: `useInView(sentinel, {once:true, margin:"-30% 0px -48px 0px"})`. The sentinel is a 1px line at the frame bottom (md+) or the frame's vertical middle (mobile). At 1440x900 it did **not** start at scrollY 500 and **did** start at scrollY 800.
- Step tables `n6` (desktop) and `su` (mobile) define each step's duration, cursor target and action. Every click adds 700ms. Typed text waits for a content estimate.
- Measured chapter lengths at 1440 (from pill-fill sampling): Quota ≈ 5.2s, Meeting ≈ 5.3s, Draft ≈ 6.8s, Slack ≈ 3.8s, Next step ≈ 6.0s. One full run ≈ 26.3s.
- After the last step, the run resets with a 0.25s opacity fade (`tH`: initial opacity 0, ease [.25,.46,.45,.94]). The demo then shows the Quota state with the control showing **Play**. **It does not auto-loop** (observed: it stayed stopped for more than 15s).
- A fake cursor (`svgs/46-demo-fake-cursor.svg`, 16x22, drop-shadow 0 1px 2px rgba(0,0,0,.24)) moves between targets. Its press is a scale of about 0.89–0.98. It is driven by motion values; see the `ef`/cursor code around lines 925–1000.
- Message entrance: `initial {opacity:0, y:12} → {opacity:1, y:0}` with `{delay:.05, duration:.3, ease:[.25,.46,.45,.94]}`. Other variants: `{opacity:0, y:10, filter:"blur(6px)"} → {opacity:1, y:0, blur(0)}`; panel stacking `{opacity:1, y: o*r*c, scale: 1-.0625*r, filter: blur(.25*r px)}` (depth stack of panels); panel transition `{duration:.625, ease:[.33,1,.68,1]}` with opacity `{duration:.25}`; `ei = {duration:.4, ease:[.22,1,.36,1]}`; chips `r1 = {delay:.06, duration:.24, ease:[.22,1,.36,1]}`.
- Number morphing uses a NumberFlow-like class (`rJ`: duration 400ms, ease cubic-bezier(.19,1,.22,1)). Layout morphs use WAAPI with 300ms cubic-bezier(.77,0,.175,1).
- `prefers-reduced-motion`: the demo is wrapped in `MotionConfig reducedMotion="user"`, and the pill fills jump instantly.
- Avatars (`home-ui-*.png`) and the Slack background image are lazy-loaded during the chapters. Geist Mono also loads at that point.

**Recommendation for Build:** port `HomeUi` and its dependencies from `code/home-components.pretty.js` (lines ~805–2410) using React + `framer-motion` (the original uses motion/framer-motion). Re-deriving it by eye will not be pixel-faithful.

---

## 6. "Getting Operational with AI" (ops steps)

Wrapper `div.mt-12.5 (50px) md:mt-17 (68px) lg:mt-24 (96px)`. Inner `relative home-rule-x md:grid md:grid-cols-[280px_1fr] xl:grid-cols-[280px_1fr_280px] 2xl:grid-cols-[311.5px_1fr_311.5px]`. Rule caps sit at top-left and bottom-right (lg).

| | 1440 | 1280 | 390 |
|---|---|---|---|
| block box | x113 y1486 w1214 h800 | y1474 w1054 h944 | x30 y1444 w330 h1050 |
| columns | 280 / 654 / 280 | 280 / 494 / 280 | single column |

**Left column** `px-4.5 pt-2.75 md:px-7 (28px) md:pt-5 (20px) md:home-rule-r`:
- **h2** "Getting Operational with AI": `text-[24px]/[1] md:text-[32px]/[36px] font-semibold text-pretty text-[#117025]`. 1440 box: x141 y1506 w224 h108 (3 lines). 390: 24/24, one line, h24.
- **p** "Your team brings the relationships and the judgment. We bring everything they need to act on it.": `mt-4 (16px) md:mt-6.5 (26px) max-w-92 (368px) md:max-w-61.25 (245px) text-[16px]/[22px] md:text-[20px]/[27px] text-pretty #117025`.
- **Talk to us** link (`a[href=/sign-up]`) inside `div.relative.w-fit.mt-6 (24px)`, with a rule cap at `top-1/2` to its left (the cap extends to the rule):
  - Classes: `block px-[6.75px] py-[3.75px] rounded-lg (8px) border-[1.25px] border-[#117025] text-[14px]/[16px] text-[#117025] uppercase`. Computed border is 1px at 1x DPR.
  - Box 87x26. **Hover:** bg #FFFFFF, 150ms ease-out.

**Middle column** `relative px-4.5 pt-12 (48px) md:px-7 md:pt-6 (24px)`, with a rule cap at bottom-left (lg). `ol.flex.flex-col.gap-y-6.25 (25px) md:gap-y-7.5 (30px) pb-7 (28px) md:pb-9 (36px)`. Each `li` contains:
- **Header bar** `flex items-center gap-x-3.5 (14px) pr-1.25 pl-0.75 pt-px pb-0.5 md:pt-[1.5px] md:pr-1.5 md:pb-[0.5px] border-y-1 border-stone-800 bg-white/60`. Height is 26px at md+ and 20px on mobile.
  - Number `span` "1." etc.: `text-[14.5px]/[1] md:text-[18px]/[22px] text-stone-800` (denim 400)
  - **h3** title: `text-[14.5px]/[1] md:text-[18px]/[22px] font-semibold text-[#117025]`
  - Status ring `ml-auto size-2.5 (10px) md:size-3 (12px) rounded-full border-1 border-stone-800`, containing a dot `size-1.5 (6px) md:size-1.75 (7px) bg-stone-800`
- **Body** `pt-3.25 (13px) md:pt-3.75 (15px) pl-1.25 (5px)`:
  - **p** `text-[16px]/[22px] md:text-[20px]/[27px] text-stone-800`, starting with `<strong class=font-semibold>` (headline) + " " + description
  - Details row `mt-[12.5px] md:mt-4 (16px) flex items-start gap-x-1.25 md:gap-x-1.5 text-[#117025]`. It holds a label pill (`px-0.5 md:px-0.75 rounded-[3px] border-1 border-[#117025] text-[9.6px]/[11px] md:text-[12px]/[14px] font-semibold uppercase`), then a 3px right-pointing CSS triangle (`border-y-[3px] border-l-[3px] border-y-transparent border-l-[#117025]`), then a `font-cinetype text-[11px]/[calc(14/11)] md:text-[14px]/[calc(14/11)]` item list joined with " · ".
- Copy:
  1. **The Map**: **See your pipeline clearly.** We shadow your sales reps and managers to learn how your team sells. Together, we identify friction worth removing and ideas worth playbooking. Label `clarity`: Where deals stall · What wins deals · Where to focus
  2. **The Plan**: **Give your team more ways to win.** From CRM updates to follow-ups, we decide together what runs on its own, what goes to an agent, and what stays with your reps. Label `capacity`: More selling time · Broader coverage · Consistent follow-through
  3. **The Build**: **Keep every deal moving.** We connect your whole stack (CRM, calls, inbox, and more). Then we bring specialized agents into the deals your team is working, so the right context shows up right when it's needed. Label `momentum`: Prepared for every call · Earlier risk signals · Faster deal progress
  4. **The Rollout**: **Watch the results compound.** We stay involved as Operate learns your business, running it against real deals, fixing what's off, and tracking progress with you as coverage grows. Label `impact`: More wins · Stronger adoption · Better retention
- 1440 li header y-positions: 1510, 1695, 1881, 2094. Paragraph boxes are 593 wide.

**Right column** (xl only) `xl:px-7 xl:py-6 xl:home-rule-l`, with a rule cap at top-left. It contains `div.size-full.bg-repeat` with background `<svg width="3.5" height="24"><rect width="1" height="1" fill="#117025"/></svg>`, which draws dotted horizontal "ruled lines" (224x752 at 1440).

**Scroll motion (HomeOpsSteps):** this is the scroll-tracked "active step". On every scroll change (motion `useScroll` + `useMotionValueEvent`) and on resize, the active index becomes the last `li` whose `getBoundingClientRect().top <= 0.5 * innerHeight` (−1 if none). The active li's ring dot is `scale-100 opacity-100`; the others are `scale-0 opacity-0`. Transition: `scale, opacity 200ms cubic-bezier(.23,1,.32,1)` (ease-out-quint). There is no other reveal animation in this section.

---

## 7. Manifesto: "Software doesn't close deals. You do."

`section.@container.relative mt-12 (48px) md:mt-16 (64px) pt-18 (72px) pb-21 (84px) md:pt-35 (140px) md:pb-28 (112px) home-you-wide:pt-27.75 (111px) home-you-wide:pb-22.75 (91px) text-[#117025] text-[15px]/[20px] xl:text-[18px]/[24px]`.
- 1440: x113 y2350 w1214 h671. 1280: y2482 h745. 390: x30 y2542 w330 h800.

Layers:
1. **Green panel** `absolute top-6.25 (25px) -right-4.25 bottom-6.25 -left-4.25 (−17px) xl:top-24.75 (99px) xl:-right-7 xl:bottom-24.75 xl:-left-7 (−28px) bg-[#94BA9D]`. Box 1440: x85 y2449 w1270 h473. At lg+ it is masked with `--home-you-holes`: four radial-gradient holes (r 7.5→8px feather) at `calc(50% ± 24px) 61px` and `calc(50% ± 24px) calc(100% - 61px)`, composite intersect. These are the punched "binder holes" visible in the panel.
2. **Vertical rules** (1px SVG rects, #117025, width = --home-rule):
   - right edge, always
   - left edge below lg
   - at home-you-wide: at left 1/4 (x416), 1/2 (x719, with a top cap) and 3/4 (x1023, top half only, bottom cap)
   - at xl but not home-you-wide (1280): at 1/3 (x464) and 2/3 (x815)
   - at md–xl: one at 1/2
   - at lg+: a mirrored arc (`svgs/49-*`, `-scale-x-100`, radius 112) on the left, with a cap at bottom `left-[calc(112px+rule/2)]`
   - caps at right-bottom (lg)
3. **Ticket card** (inside an overlay with the same inset as the panel), `absolute top-2.25 right-2.25 md:top-3 md:right-3`. Classes: `px-1.5 pt-2 pb-0.75 md:px-2 (8px) md:pt-2.75 (11px) md:pb-1 (4px) rounded-[3px] md:rounded (4px) bg-[#85C093] text-stone-800`. Box 1440: x1182 y2461 w161 h95; 390: x240 y2576 w128 h78.
   - Top row: "OPERATE" `font-cinetype text-[14.5px]/[22px] md:text-[18px]/[20px]`, then "2.0" `font-['Courier_New'] text-[9.6px]/[11px] md:text-[12px]/[14px] font-light`
   - hr `border-t-[0.5px] border-stone-800 -mt-1 md:-mt-0.5`
   - "Subject" `font-cinetype text-[7.2px]/[9px] md:text-[9px]/[11px]`
   - "A PROPER PLACE TO WORK" `Courier New text-[8.75px]/[10px] md:text-[10.958px]/[12px] mt-[3.5px] md:mt-1.5`
   - hr `mt-0.75 md:mt-1`
   - `dl.grid.grid-cols-3.divide-x-[0.5px].divide-current` with three cells (`pb-0.5`, second and third `pl-0.5`). Each cell is dt (cinetype 7.2/9 → 9/11) over dd (Courier 9.6/11 → 12/14, mt .5px): Date / 2026, Vol. / 1, Ref. / B001.
4. **Content** `relative px-4.5 md:px-7 xl:pt-18.25 (73px) xl:pb-21 (84px) home-you-wide:grid home-you-wide:grid-cols-4 home-you-wide:gap-x-14 (56px)`. At 1440 the grid is 4 × 247.5px.
   - Text block `home-you-wide:col-span-3` (855px at 1440), with `--home-you-bounce-height: 0px` (base and home-you-wide) or `calc(16rem*228/420)` = 138.97px (md to below home-you-wide).
   - Inner `relative columns-1 md:columns-2 xl:columns-3 gap-x-14 (56px) [column-fill:balance]`. These are **CSS multi-column**: paragraphs flow across columns, e.g. "...no matter how well organized or | how fully automated, storage rooms...". Column width is 247.5 (1440), 295.3 (1280) and 294 (390, one column).
   - **h2** `relative font-semibold whitespace-pre text-[#117025] text-[24px]/[30px] xl:text-[32px]/[36px] mb-7 (28px) md:mb-10 (40px) xl:-mt-3 (−12px) xl:mb-8 (32px) break-inside-avoid break-after-avoid`. Its four lines are block spans `h-[1lh]` with staggered indents:
     - "Software" (no indent)
     - "doesn't" `ml-13.5 (54px) xl:ml-11.5 (46px)`
     - "close deals." `ml-22.25 (89px) md:ml-23 (92px)`
     - "You do." `mt-2 (8px) md:mt-7 (28px)`

     It has a rule cap at `top-2 -left-7` (lg).
   - Paragraphs:
     1. `mb-7 md:mb-5 xl:mb-6 text-pretty`: "So it's strange that sales teams revolve around CRMs that were never built for you. They were built for storing things. And no matter how well organized or how fully automated, storage rooms were never the point."
     2. Same classes: "We think you deserve **a proper place to work.** Call it a workshop, a studio, a lab, a kitchen. Wherever you do your best work. Same materials, same tools, but intentionally prepared and arranged. Everything exactly where your hand expects it."
     3. `mb-5 xl:mb-6`: "A place like that remembers what you can't, surfaces what matters, keeps you on pace."
     4. "The relationships, the judgment calls, the close — that part has always been yours. We just built a better place to do it."

     Paragraphs 1 and 2 have, **below md only**, a 12px #EBEBEB circle `::before` centered at `-top-5` (−20px), mimicking binder holes between paragraphs.
   - Spacer `div.break-inside-avoid.pt-10 (40px) xl:pt-12 (48px)` > `div.h-[calc(2lh+var(--home-you-bounce-height))]`
   - Signature block: an absolute grid `inset-x-0 bottom-(--home-you-bounce-height) grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-14 pb-2`. It contains `p.relative.w-fit.md:col-start-2.xl:col-start-3`: `<strong class="block h-lh font-semibold">Team Operate</strong><time class="block h-lh">09.30.26</time>`, plus `<picture><img src=/home/logo-trace-loop.svg>`.
     - Logo img width is `calc(var(--home-you-logo-width)*428/420)`. Measured sizes: 234x125 at 1440, 261x139 at 1280, 128x68 at 390.
     - Its position uses container-query units; the exact `left`/`bottom` calc per breakpoint is in the img class in dom1440.json / live-dom.
     - md (below home-you-wide): `top-full`, `w-[calc(16rem*228/420... )]`, `bg-[#94BA9D]`.
     - Mobile: `--home-you-logo-width: clamp(7.5rem,38cqw,8.125rem)`.
     - Boxes: 1440 x938 y2726; 1280 x841 y2884; 390 x185 y3184.

---

## 8. Footer sheet

Wrapper `div.relative.isolate px-4.25 pt-10 (40px) pb-8.5 (34px) md:pr-18.5 lg:pt-12 (48px) lg:px-18.5 (74px) lg:pb-12 (48px)`, using HomePanelHoles variant `footer` (folded corner at the right on md+, at the bottom-left on mobile).
- Boxes: 1440 x38 y3098 w1364 h317. 390 x12 y3411 w366 h425.

`footer.relative.grid.gap-y-6 (24px) md:grid-cols-2`. Columns are 608 + 608 at 1440 (footer x112 w1216). DOM order is links cell first, then video cell; at md+ the **links cell is visually on the right** (`md:order-1`).

**Video cell** (left on desktop) `relative px-4.25 pt-2.5 pb-11 home-rule-l md:px-7 md:pt-2 md:pb-2.5`:
- **Watch the video** card `button.block.w-52.5 (210px) md:w-69 (276px) cursor-pointer text-left px-3 pt-[10.5px] pb-2.25 md:px-4.5 md:pt-3.5 md:pb-3 rounded-[6.5px] bg-[#77AA83]`. Box 1440: x140 y3154 w276 h203; 390: w210 h157.
  - Label row: `flex items-center gap-x-[7.5px] md:gap-x-2.5`. A dot `size-2.25 (9px) md:size-3 (12px) rounded-full bg-[#117025]`, then text "Watch the video" `font-cinetype text-[11.24px]/[12.5px] tracking-[0.562px] md:text-[14px]/[17px] md:tracking-[0.7px] text-[#117025]`.
  - Frame `mt-[7.5px] md:mt-2.25 block p-1.5 (6px) md:p-2 (8px) bg-[#85C093]` containing a picture: still image 224x135 (desktop) / 174x105 (mobile), `rounded-[3px]`, sizes "(min-width: 48rem) 228px, 174px". Over it is a `<video src=/home/footer-video-loop.mp4 muted loop playsInline preload=none>` `absolute inset-0 object-cover rounded-[3px] motion-reduce:hidden max-md:hidden`.
  - **Hover (mouse only):** the video plays. On leave it pauses. There are no other hover styles.
  - Click opens the lightbox and morphs from the card (`crossfade: both`).
- Mobile: a radius-90 arc SVG at top-right (`svgs/57-*`), plus caps.
- At ≥90rem (1440): an extra 221x221 square `hidden min-[90rem]:block absolute top-0 right-[calc(50%+18px)] bottom-0 aspect-square` holding an arc SVG (`svgs/58-*`), and a cap at `-left-2`.

**Links cell** (right) `relative px-4.25 pt-1.25 md:px-7 md:pt-2.5 home-rule-x md:home-rule-r flex flex-col justify-between`:
- Row `flex justify-between`:
  - Link list `flex flex-col gap-y-0.5 (2px)`: **Privacy** (/privacy), **Terms** (/terms), **LinkedIn** (https://www.linkedin.com/company/operatehq), **X** (https://x.com/operate_gtm). Classes: `group relative w-fit text-[#117025] text-[12.8px]/[17px] md:text-[16px]/[22px]` (denim 400).
    - Each link has a **dotted underline**: an absolutely positioned span `top-[3px] left-0 h-[calc(100%-4px)]`, `width: calc(round(100%, 3px) + 1.5px)`, `border-bottom: 1.5px solid transparent`, `border-image: repeating-linear-gradient(to right, transparent 0 1.5px, #117025 1.5px 3px) 1`.
    - **Hover/focus-visible:** an inner span (#117025 fill) goes opacity 0 → 1 and the text color goes #117025 → #E0E0E0, both 150ms cubic-bezier(0,0,.2,1). The result is a green highlight block with light text.
  - **Get started** `a[href=/sign-up]` in `div.md:mt-2.25 (9px)`. Classes: `inline-block px-3 py-[5.5px] md:px-3.75 md:py-1.75 rounded-[9.5px] md:rounded-xl border-1 border-[#E0E0E0] bg-[#117025] text-[#E0E0E0] text-[16px]/[19px] md:text-[18px]/[20px]`. **Hover:** border #117025, bg #FFFFFF, text #117025 (150ms). Box 1440: x1179 y3165 w121 h36.
- Bottom row `mt-6 (24px) flex items-center gap-x-1.5 (6px)`: the logo mark SVG (`svgs/56-operate-logo-mark-footer.svg`, `h-3.25 (13px) md:h-4 (16px) w-auto`, 32x16 at 1440), then "© 2026 Operate Machine Co. All rights reserved." `font-cinetype text-[#117025] text-[11.2px]/[13px] xl:text-[14px]/[17px]`.
- Center divider: at md+, a 1px rule at left-1/2 (x719) with a cap at the top, and a cap at `top-8 right-0` (lg).

---

## 9. Video lightbox (opened by both "Watch the video" buttons)

- `div[role=dialog][aria-modal][aria-label="Watch the video"]`: `fixed inset-0 z-50 grid place-items-center py-[calc(0.75rem+2.75rem)] overflow-hidden`.
- Backdrop `fixed inset-0 bg-black/70 lg:bg-black/50` with an opacity transition (and pull-to-close progress).
- Media box `aspect-video`. Width is `min(100%, (100dvh-7rem)*16/9)`; at lg it is `min(min(100%,92.125rem)-100px, (100dvh-7rem)*16/9)`. Measured at 1440x900: x50 y73 w1340 h754.
  - Media wrapper `bg-[#77AA83]` with a 1px outline that becomes `#117025` once revealed (outline-color 250ms ease-out-quint).
  - `<mux-player playback-id="ZJ2kA019R02spnwybJHpUcXw02wND01GeCnbtplh3rHCXcg" accent-color="#117025" min-resolution="720p" poster=".../thumbnail.webp?width=1920&time=0">` with `--media-background-color:#77AA83; --center-controls:none`. The poster `<img>` is layered over it.
- Close button: fixed at top-right `0.75rem + safe-area`, 44x44, with a white-ish (#E0E0E0) 10px "X" glyph (path in `svgs_inter`/live DOM).
- Open/close is a **view-transition morph** from the trigger (custom "ramka" lightbox library): duration 300ms, easing `cubic-bezier(.23,1,.32,1)` (ease-out-quint). The crossfade variant is used for the footer card. While the lightbox is open, the background canvas pauses.
- Not measured: video playback UI internals (the Mux web component's shadow DOM).

---

## 10. Motion summary

| What | Trigger | Values |
|---|---|---|
| Background canvas beads + blurred rects | continuous rAF while in the top/bottom scroll bands | §2 |
| Background band switching | scroll progress p | top band p<.35, hidden .35–.65, bottom band p>.65 |
| Hero product demo | in view once (`margin -30% 0 -48px 0`) | §5. Plays one ~26s run, then stops on Quota with Play. |
| Chapter pill fill | per step, WAAPI linear translateX −20→0 | pill width 12↔32 via motion |
| Ops-step active dot | scroll; li top ≤ 50vh | scale/opacity 200ms cubic-bezier(.23,1,.32,1) |
| logo-trace-loop.svg | CSS inside the SVG, infinite | 7.875s cycle: dash-draw line 0–28.6%, dot follows path, logo fill visible 29.6%–97.9% (steps(1,end)), sparkles, wrapper fade 0–3.2% in and 91.5–97.9% out, pop scale. Reduced motion shows the static logo. **Use the SVG file as-is via `<img>`.** |
| Footer card video | mouse hover | play/pause, currentTime starts at 0.25 |
| Buttons/links | hover | 150ms cubic-bezier(0,0,.2,1) color/bg/border (values in §4, §6, §8) |
| Demo chips / send | data-hovered | 120ms cubic-bezier(.4,0,.2,1) |
| Lightbox | click | 300ms view-transition morph, ease-out-quint |

- **No** entrance animations run on page load for the marketing content: hero, headings and sections are static. `document.getAnimations()` was empty at load.
- There are **no** scroll-triggered fade/slide reveals on sections, **no** marquee/ticker, **no** sticky/pinned sections, and **no** sticky nav.
- **Libraries detected:** `motion` / framer-motion (useScroll, useMotionValueEvent, useInView, AnimatePresence, motion.div, animate), Base UI (Popover for tooltips), Mux Player (`@mux/mux-player-react` 3.5.3), and a custom lightbox "ramka" using the View Transitions API. Everything else is native Canvas 2D, WAAPI and CSS keyframes.
- **Not present:** GSAP / ScrollTrigger (the "ScrollTrigger" strings in the bundles are the lightbox's own `scrollTriggerIntoView` option, not GSAP), Lenis, three.js, WebGL. Analytics: PostHog (proxied at /op/) and Vercel insights. Ignore both.

Easing tokens from the CSS: ease-out `cubic-bezier(0,0,.2,1)`; in-out `(.4,0,.2,1)`; out-quint `(.23,1,.32,1)`; out-cubic `(.33,1,.68,1)`; out-quad `(.25,.46,.45,.94)`; in-out-cubic `(.65,0,.35,1)`; in-out-quart `(.77,0,.175,1)`.

---

## 11. Mobile (390) differences, collected

- Page padding is 12px (lg 38px). The binder rails are hidden; holes and tabs use the small variants (12px holes, 30px tab strips at −16px). Sheet outlines are drawn by `home-outline` background lines (0.8px) instead of a 1px border. `--home-rule` is 0.8px and the caps are 5px.
- Column top padding is 60px with 36px gaps. Nav sheet is 34px tall; strip 19px tall, 11.2px/19.2px text, inset 31px; no "Try it out"; logo at the right end.
- Main sheet padding is 48 17 32.
- Hero is one column. h1 is 36/42; paragraph 16/22; buttons are stacked with **Watch the video above Get started** (gap 8), each 32px tall at 16/19.
- The demo uses the touch layout (§5), 713px tall, with a ring cursor.
- Ops section: one column. h2 is 24/24; intro paragraph 16/22, max-w 368; step headers 14.5px/1, 20px tall; body 16/22; details 11px; ol gap 25px; middle column pt 48px. The right dotted column is hidden.
- Manifesto: one column. 15/20 body, h2 24/30. Paragraphs 1 and 2 get 12px paper-colored "hole" dots above them. No panel hole mask (lg only). Ticket card is 128x78. Logo is 128x68, bottom-right inside the panel.
- Footer: stacked. Links cell first (links 12.8/17; Get started 16/19, 32px tall), then the video card (210 wide; still image only, **no hover video** below md). The folded corner is at the bottom-left via `--hole-sm-fold-clip` plus the bottom SVG (79px tall), with a 12px ring at right 18 / bottom 40.

---

## 12. Things that could not be measured, or are deliberately left to code

- Canvas-rendered background: pixel output is random per load (seeded by width:height:isMobile). It can only be matched by porting the algorithm, not by measurement.
- Mux player internals (shadow DOM controls) and the HLS stream itself were not downloaded. Use the playback id.
- The per-step demo copy and exact sub-element styles across all 24–29 timeline steps were not individually measured. They are fully defined in `code/home-components.pretty.js`; the screenshots in `screens/demo/` are visual checks.
- Denim RegularItalic is preloaded, but no italic usage was found on the homepage.
