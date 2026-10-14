// Geometry for the hole-punched paper sheets (CLONE_SPEC §1 "Paper with punched holes").
// Produces the --hole-* custom properties consumed by the .holes-* classes in index.css.
// All numbers are the measured values from reference/live-dom-1440.html.

const INK = '#29211E'
const TAB_FILL = '#FAFAFA'
const HATCH = '#9D989B'
const DIAMOND = 'M12 0 L24 36 L12 72 L0 36 Z'

export const DEFAULT_PERIOD = 566.5 // px, target spacing of the tiled slot pairs
const PANEL_FIXED = 112.998 // px of sheet height not covered by the period tiling
const SLOT_CENTER = 55.499 // px, centre of the first slot-pair tile
const SLOT_GAP = 29.665 // px, offset of the second slot in a pair

const svgUrl = (w, h, body) =>
  `url("data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${body}</svg>`,
  )}")`

const slot = (y, cut) =>
  cut
    ? `<rect x="1" y="${y + 1}" width="16" height="19.333" rx="8"/>`
    : `<rect x="0.5" y="${y + 0.5}" width="17" height="20.333" rx="8.5" fill="none" stroke="${INK}"/>`

const IMG = {
  slotCut: svgUrl(18, 50.998, slot(0, true) + slot(SLOT_GAP, true)),
  slotRing: svgUrl(18, 50.998, slot(0, false) + slot(SLOT_GAP, false)),
  circleCut: svgUrl(18, 18, '<circle cx="9" cy="9" r="8"/>'),
  circleRing: svgUrl(18, 18, `<circle cx="9" cy="9" r="8.5" fill="none" stroke="${INK}"/>`),
  tab: svgUrl(47, 12, `<rect x="0.5" y="0.5" width="46" height="11" fill="${TAB_FILL}" stroke="${INK}"/>`),
  smCut: svgUrl(12, 12, '<circle cx="6" cy="6" r="5"/>'),
  smRing: svgUrl(12, 12, `<circle cx="6" cy="6" r="5.4" fill="none" stroke="${INK}" stroke-width="0.8"/>`),
  smTab: svgUrl(30, 8, `<rect x="0.4" y="0.4" width="29.2" height="7.2" fill="${TAB_FILL}" stroke="${INK}" stroke-width="0.8"/>`),
  hatch: svgUrl(24, 72, `<path d="${DIAMOND}" fill="none" stroke="${HATCH}" stroke-width="0.5"/>`),
}

// A layer = { image, size, position, repeat }
const single = (image, x, y) => ({ image, size: 'auto', position: `${x} ${y}`, repeat: 'no-repeat' })
const tiled = (image, width, x, centre, period = 'var(--hole-period)') => ({
  image,
  size: `${width}px ${period}`,
  position: `${x} top calc(${centre} - ${period} / 2)`,
  repeat: 'no-repeat repeat',
})
const hatchLayer = (position, scale = 1) => ({
  image: IMG.hatch,
  size: scale === 1 ? 'auto' : `${24 * scale}px ${72 * scale}px`,
  position,
  repeat: 'repeat',
})
const bothSides = (inset, make) => [make(`left ${inset}px`), make(`right ${inset}px`)]

const CIRCLE_CENTRE = `calc(${SLOT_CENTER}px + var(--hole-period) / 2)`
const tabCentre = (n) => 31 + SLOT_GAP * n + 9.6665

// Per-variant layer builders. `kind` is 'cut' (mask) or 'ring' (outline drawing).
const VARIANTS = {
  bar: {
    desktop: (kind) => [
      ...bothSides(14, (x) => single(kind === 'cut' ? IMG.circleCut : IMG.circleRing, x, 'top 50%')),
      ...(kind === 'ring' ? [hatchLayer('left 0 top 0')] : []),
    ],
    desktopTabs: () => [single(IMG.tab, 'left 0', 'top 50%')],
    mobile: (kind) => [
      ...bothSides(11, (x) => single(kind === 'cut' ? IMG.smCut : IMG.smRing, x, 'top 50%')),
      ...(kind === 'ring' ? [hatchLayer('left -1px top -1px', 0.625)] : []),
    ],
    mobileTabs: () => [single(IMG.smTab, 'left 0', 'top 50%')],
  },
  panel: {
    desktop: (kind) => [
      ...bothSides(14, (x) => tiled(kind === 'cut' ? IMG.slotCut : IMG.slotRing, 18, x, `${SLOT_CENTER}px`)),
      ...bothSides(14, (x) => tiled(kind === 'cut' ? IMG.circleCut : IMG.circleRing, 18, x, CIRCLE_CENTRE)),
    ],
    desktopTabs: () => [
      tiled(IMG.tab, 47, 'left 0', CIRCLE_CENTRE),
      tiled(IMG.tab, 47, 'left 0', `${tabCentre(0)}px`, 'calc(var(--hole-period) * 2)'),
      tiled(IMG.tab, 47, 'left 0', `calc(${tabCentre(1)}px + var(--hole-period))`, 'calc(var(--hole-period) * 2)'),
    ],
    // `gaps` = y positions (px from sheet top) halfway between consecutive sections
    mobile: (kind, gaps) =>
      ['top 14px', ...gaps.map((g) => `top ${g - 6}px`), 'bottom 14px'].flatMap((y) =>
        bothSides(11, (x) => single(kind === 'cut' ? IMG.smCut : IMG.smRing, x, y)),
      ),
    mobileTabs: (gaps) =>
      ['top 16px', ...gaps.map((g) => `top ${g - 4}px`), 'bottom 16px'].map((y) => single(IMG.smTab, 'left 0', y)),
  },
  footer: {
    desktop: (kind) => {
      const img = kind === 'cut' ? IMG.circleCut : IMG.circleRing
      return [single(img, 'left 14px', 'top 37px'), single(img, 'left 14px', 'bottom 30.4px')]
    },
    desktopTabs: () => [single(IMG.tab, 'left 0', 'top 40px'), single(IMG.tab, 'left 0', 'bottom 33.4px')],
    mobile: (kind) => bothSides(11, (x) => single(kind === 'cut' ? IMG.smCut : IMG.smRing, x, 'top 14px')),
    mobileTabs: () => [single(IMG.smTab, 'left 0', 'top 16px'), single(IMG.smTab, 'left 0', 'bottom 11px')],
  },
}

const join = (layers, key) => layers.map((l) => l[key]).join(', ')

const layerVars = (prefix, layers) => ({
  [`--${prefix}-image`]: join(layers, 'image'),
  [`--${prefix}-size`]: join(layers, 'size'),
  [`--${prefix}-position`]: join(layers, 'position'),
  [`--${prefix}-repeat`]: join(layers, 'repeat'),
})

// Mask = full sheet minus every hole shape.
const maskVars = (prefix, holes) => ({
  ...layerVars(prefix, [
    { image: 'linear-gradient(#000 0 0)', size: '100% 100%', position: 'left 0 top 0', repeat: 'no-repeat' },
    ...holes,
  ]),
  [`--${prefix}-composite`]: ['subtract', ...holes.map(() => 'add')].join(', '),
})

export function mobileHoleVars(variant, gaps = []) {
  const v = VARIANTS[variant]
  return {
    ...maskVars('hole-sm-mask', v.mobile('cut', gaps)),
    ...layerVars('hole-sm-ring', v.mobile('ring', gaps)),
    ...layerVars('hole-sm-tab', v.mobileTabs(gaps)),
  }
}

export function holeVars(variant) {
  const v = VARIANTS[variant]
  return {
    '--hole-period': `${DEFAULT_PERIOD}px`,
    ...maskVars('hole-mask', v.desktop('cut')),
    ...layerVars('hole-ring', v.desktop('ring')),
    ...layerVars('hole-tab', v.desktopTabs()),
    ...mobileHoleVars(variant, []),
    '--hole-fold-clip': 'inset(0 124px 0 0)',
    '--hole-sm-fold-clip': 'polygon(0 0, 100% 0, 100% calc(100% - 31px), 0 100%)',
  }
}

// Spread the slot pairs evenly along the panel height (≈ every 566.5px).
export function periodFor(sheetHeight) {
  const span = sheetHeight + 2 - PANEL_FIXED
  const count = Math.max(1, Math.round(span / DEFAULT_PERIOD))
  return span / count
}

export const FOLD = { INK, HATCH, DIAMOND }
