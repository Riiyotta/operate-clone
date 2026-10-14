// Animated "bead" background (CLONE_SPEC §2). Beads slide up and down thin dotted
// columns; blurred light-green bars sit behind them. Drawn only in the top band
// (scroll progress < .35) or the bottom band (> .65) and faded toward the page middle.

const LIGHT = '#85C093'
const DARK = '#117025'
const TICK_MS = 1000 / 60
const MAX_FRAME_MS = 1000 / 15

const BEAD_TYPES = ['circle', 'star', 'star-circle', 'dot', 'subcircle']
// 15 of 19 beads are plain circles
const BEAD_POOL = [...Array(15).fill('circle'), 'dot', 'star', 'star-circle', 'subcircle']

// Ease-in-out ramp used for the 24px iOS edge fade.
const EDGE_RAMP = [
  [0, 0], [0.1185, 0.028], [0.225, 0.104], [0.322, 0.216], [0.4125, 0.352], [0.5, 0.5],
  [0.5875, 0.648], [0.678, 0.784], [0.775, 0.896], [0.8815, 0.972], [1, 1],
]

const smoothstep = (a, b, x) => {
  const t = Math.min(Math.max((x - a) / (b - a), 0), 1)
  return t * t * (3 - 2 * t)
}

export function bandFor(progress) {
  const top = 1 - smoothstep(0, 0.35, progress)
  const bottom = smoothstep(0.65, 1, progress)
  if (top > 0) return { band: 'top', strength: top }
  if (bottom > 0) return { band: 'bottom', strength: bottom }
  return { band: null, strength: 0 }
}

// How much to erase at `depth` (fraction of the viewport away from the band's edge).
const eraseAmount = (depth, strength) => 1 - (1 - smoothstep(0.2, 0.5, depth)) * strength

function edgeRamp(distance) {
  const t = distance / 24
  if (t <= 0) return 0
  if (t >= 1) return 1
  for (let i = 1; i < EDGE_RAMP.length; i++) {
    const [x1, y1] = EDGE_RAMP[i]
    if (t > x1) continue
    const [x0, y0] = EDGE_RAMP[i - 1]
    return y0 + ((y1 - y0) * (t - x0)) / (x1 - x0)
  }
  return 1
}

function seededRandom(seed) {
  let h = 2166136261
  for (let i = 0; i < seed.length; i++) h = Math.imul(h ^ seed.charCodeAt(i), 16777619)
  let a = h >>> 0
  return () => {
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export const canvasHeightFor = (viewHeight) => Math.ceil(viewHeight / 2)

// Static layout derived from the measured size (deterministic per size).
export function createLayout({ width, height, viewHeight, mobile }) {
  const lineSize = mobile ? 0.8 : 1.5
  const lineGap = mobile ? 19.2 : 22
  const pitch = lineSize + lineGap
  const columns = Math.floor(width / pitch)
  const rand = seededRandom(`${width}:${height}:${mobile}`)

  const perView = Math.floor(viewHeight / 40)
  const lo = Math.min(5, perView)
  const hi = Math.min(8, perView)
  const coverage = (height / viewHeight) * 2
  const beadCounts = Array.from({ length: columns }, () =>
    Math.round((Math.floor(((rand() + rand()) * (hi - lo)) / 2) + lo) * coverage),
  )

  const barHeight = mobile ? 110 : 150
  const jitter = () => (2 * rand() - 1) * 0.08 * barHeight
  const bandHeight = canvasHeightFor(viewHeight)
  const bars = []
  for (const start of [0, height - bandHeight]) {
    for (let pair = 0; pair < Math.floor(columns / 2); pair++) {
      for (let y = start - barHeight + (pair % 2) * (barHeight / 2); y < start + bandHeight; y += barHeight) {
        if (rand() >= 0.7) continue
        bars.push({
          x: 2 * pair * pitch + lineSize + 3,
          y: y + jitter(),
          width: 2 * pitch - lineSize,
          height: barHeight + jitter(),
          opacity: 0.08 + 0.12 * rand(),
          fadesUp: rand() < 0.5,
          firm: bars.length % 12 === 0,
        })
      }
    }
  }

  return {
    width, height, viewHeight, lineSize, lineGap, columns, beadCounts, bars,
    radius: 6,
    radiusLarge: mobile ? 7 : 8,
    minSpeed: 0.2,
    maxSpeed: 1,
  }
}

function drawStarRays(ctx, r, x, y) {
  const len = r + 1
  const diag = len * Math.SQRT1_2
  ctx.strokeStyle = LIGHT
  ctx.lineWidth = 1.25
  for (const [dx, dy] of [[0, len], [len, 0], [diag, diag], [diag, -diag]]) {
    ctx.beginPath()
    ctx.moveTo(x - dx, y - dy)
    ctx.lineTo(x + dx, y + dy)
    ctx.stroke()
  }
}

function drawBead(ctx, type, outline, r, x, y) {
  const disc = (radius) => {
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, Math.PI * 2)
  }
  switch (type) {
    case 'star':
    case 'star-circle': {
      const core = type === 'star' ? 1.25 : 2.5
      if (outline) drawStarRays(ctx, r, x, y)
      disc(core)
      if (outline) {
        ctx.strokeStyle = LIGHT
        ctx.lineWidth = 2
        ctx.stroke()
      } else {
        ctx.fillStyle = type === 'star' ? DARK : LIGHT
        ctx.fill()
      }
      return
    }
    case 'dot':
    case 'subcircle': {
      disc(r)
      if (outline) {
        ctx.strokeStyle = LIGHT
        ctx.lineWidth = 3
        ctx.stroke()
        return
      }
      ctx.fillStyle = LIGHT
      ctx.fill()
      disc(type === 'dot' ? 2 : r - 1.25)
      ctx.fillStyle = DARK
      ctx.fill()
      return
    }
    default: {
      disc(r)
      if (outline) {
        ctx.strokeStyle = LIGHT
        ctx.lineWidth = 2
        ctx.stroke()
      } else {
        ctx.fillStyle = DARK
        ctx.fill()
      }
    }
  }
}

// One sprite sheet holding [outline, fill] for every bead type.
function buildSprites(radius, dpr) {
  const px = Math.ceil(2 * (radius + 3) * dpr)
  const size = px / dpr
  const sheet = document.createElement('canvas')
  sheet.width = px * BEAD_TYPES.length * 2
  sheet.height = px
  const ctx = sheet.getContext('2d')
  const slots = {}
  BEAD_TYPES.forEach((type, i) => {
    for (const outline of [true, false]) {
      const slot = 2 * i + (outline ? 0 : 1)
      ctx.setTransform(dpr, 0, 0, dpr, slot * px, 0)
      drawBead(ctx, type, outline, radius, size / 2, size / 2)
      slots[`${type}:${outline}`] = slot
    }
  })
  return { sheet, px, size, slots }
}

function createColumns(layout) {
  const { height, lineSize, lineGap, radiusLarge, minSpeed, maxSpeed, beadCounts } = layout
  const minY = -0.5 * height
  const maxY = 1.5 * height
  const safe = radiusLarge + 1
  return beadCounts.map((count, index) => {
    const speed = minSpeed + (maxSpeed - minSpeed) * Math.random()
    const beads = []
    for (let i = 0; i < count; i++) {
      let y
      do {
        y = Math.random() * (maxY - minY - 2 * safe) + minY + safe
      } while (beads.some((b) => Math.abs(b.y - y) < 2 * safe))
      beads.push({
        y,
        speed,
        direction: Math.random() < 0.5 ? 1 : -1,
        type: BEAD_POOL[Math.floor(Math.random() * BEAD_POOL.length)],
      })
    }
    return { x: (index + 1) * lineSize + (index + 0.5) * lineGap, minY, maxY, beads }
  })
}

export class BeadField {
  constructor({ layout, beadCanvas, barCanvas, dpr, edgeFade }) {
    this.layout = layout
    this.beadCanvas = beadCanvas
    this.barCanvas = barCanvas
    this.dpr = dpr
    this.edgeFade = edgeFade
    this.beadCtx = beadCanvas.getContext('2d')
    this.barCtx = barCanvas.getContext('2d')
    this.sprites = buildSprites(layout.radius, dpr)
    this.columns = createColumns(layout)
    this.bandHeight = canvasHeightFor(layout.viewHeight)
    this.currentBand = undefined
    this.barCache = null
    this.lastBars = null
    this.edgeGradients = {}
    this.nextY = new Float64Array(32)
    this.flip = new Uint8Array(32)
  }

  // Advance one 60Hz tick.
  step(speedMultiplier = 1) {
    const reach = this.layout.radius - 3
    const buffer = 4
    for (const column of this.columns) {
      const { beads, minY, maxY } = column
      const n = beads.length
      if (this.nextY.length < n) {
        this.nextY = new Float64Array(n)
        this.flip = new Uint8Array(n)
      }
      const next = this.nextY
      const flip = this.flip
      flip.fill(0, 0, n)
      for (let i = 0; i < n; i++) {
        const b = beads[i]
        next[i] = b.y + b.speed * b.direction * speedMultiplier
        if (next[i] > maxY - reach - buffer || next[i] < minY + reach + buffer) flip[i] = 1
      }
      for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
          if (Math.abs(next[i] - next[j]) >= 2 * reach) continue
          const a = beads[i]
          const b = beads[j]
          if (a.direction !== b.direction) {
            flip[i] = 1
            flip[j] = 1
          } else if (a.direction === -1) {
            flip[a.y < b.y ? j : i] = 1 // the trailing bead turns around
          } else {
            flip[a.y > b.y ? j : i] = 1
          }
        }
      }
      for (let i = 0; i < n; i++) {
        if (flip[i]) beads[i].direction *= -1
        else beads[i].y = next[i]
      }
    }
  }

  buildBarLayer(start) {
    const { width, bars } = this.layout
    const dpr = this.dpr
    const margin = 9
    const make = () => {
      const c = document.createElement('canvas')
      c.width = Math.ceil(width * dpr)
      c.height = Math.ceil((this.bandHeight + 2 * margin) * dpr)
      return c
    }
    const out = make()
    const scratch = make()
    const sctx = scratch.getContext('2d')
    const octx = out.getContext('2d')
    sctx.setTransform(dpr, 0, 0, dpr, 0, -(start - margin) * dpr)
    for (const bar of bars) {
      const g = bar.fadesUp
        ? sctx.createLinearGradient(0, bar.y + bar.height, 0, bar.y)
        : sctx.createLinearGradient(0, bar.y, 0, bar.y + bar.height)
      g.addColorStop(0, 'rgba(133, 192, 147, 0)')
      g.addColorStop(bar.firm ? 0.04 : 0.25, 'rgba(133, 192, 147, 1)')
      g.addColorStop(0.45, 'rgba(133, 192, 147, 1)')
      g.addColorStop(1, 'rgba(133, 192, 147, 0)')
      sctx.globalAlpha = bar.opacity
      sctx.fillStyle = g
      sctx.fillRect(bar.x, bar.y, bar.width, bar.height)
    }
    octx.setTransform(dpr, 0, 0, dpr, 0, 0)
    octx.filter = 'blur(3px)'
    octx.drawImage(scratch, 0, 0, scratch.width / dpr, scratch.height / dpr)
    return { canvas: out, margin }
  }

  drawBars(band, strength, start) {
    const ctx = this.barCtx
    const { width, viewHeight } = this.layout
    const dpr = this.dpr
    const L = this.bandHeight
    const end = start + L

    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.clearRect(0, 0, this.barCanvas.width, this.barCanvas.height)
    ctx.setTransform(dpr, 0, 0, dpr, 0, -start * dpr)

    if (this.barCache?.band !== band) this.barCache = { band, layer: this.buildBarLayer(start) }
    const { canvas, margin } = this.barCache.layer
    ctx.drawImage(canvas, 0, margin * dpr, canvas.width, L * dpr, 0, start, canvas.width / dpr, L)

    // Fade toward the middle of the page.
    const fade = ctx.createLinearGradient(0, start, 0, end)
    for (let i = 0; i <= 32; i++) {
      const t = i / 32
      const depth = ((band === 'top' ? t : 1 - t) * L) / viewHeight
      fade.addColorStop(t, `rgba(0, 0, 0, ${eraseAmount(depth, strength)})`)
    }
    ctx.globalCompositeOperation = 'destination-out'
    ctx.fillStyle = fade
    ctx.fillRect(0, start, width, L)

    if (this.edgeFade) {
      const edge = band === 'top' ? start : end
      const inner = band === 'top' ? edge + 24 : edge - 24
      if (!this.edgeGradients[band]) {
        const g = ctx.createLinearGradient(0, edge, 0, inner)
        for (const [t, v] of EDGE_RAMP) g.addColorStop(t, `rgba(0, 0, 0, ${1 - v})`)
        this.edgeGradients[band] = g
      }
      ctx.fillStyle = this.edgeGradients[band]
      ctx.fillRect(0, Math.min(edge, inner), width, 24)
    }
    ctx.globalCompositeOperation = 'source-over'
  }

  render(progress) {
    const { band, strength } = bandFor(progress)
    const bctx = this.beadCtx
    bctx.setTransform(1, 0, 0, 1, 0, 0)
    bctx.clearRect(0, 0, this.beadCanvas.width, this.beadCanvas.height)

    if (band !== this.currentBand) {
      for (const c of [this.beadCanvas, this.barCanvas]) {
        c.style.visibility = band ? '' : 'hidden'
        c.style.top = band === 'bottom' ? '' : '0'
        c.style.bottom = band === 'bottom' ? '0' : ''
      }
      this.currentBand = band
    }
    if (!band) return

    const { height, viewHeight, radiusLarge } = this.layout
    const L = this.bandHeight
    const start = band === 'top' ? 0 : height - L
    const end = start + L

    if (this.lastBars?.progress !== progress || this.lastBars.band !== band) {
      this.drawBars(band, strength, start)
      this.lastBars = { progress, band }
    }

    const dpr = this.dpr
    const { sheet, px, size, slots } = this.sprites
    const cull = radiusLarge + 2
    bctx.setTransform(dpr, 0, 0, dpr, 0, -start * dpr)
    for (const outline of [true, false]) {
      for (const column of this.columns) {
        for (const bead of column.beads) {
          if (bead.y < start - cull || bead.y > end + cull) continue
          const distance = band === 'top' ? bead.y - start : end - bead.y
          let alpha = 1 - eraseAmount(distance / viewHeight, strength)
          if (this.edgeFade) alpha *= edgeRamp(distance)
          if (alpha <= 0) continue
          bctx.globalAlpha = alpha
          const slot = slots[`${bead.type}:${outline}`]
          bctx.drawImage(sheet, slot * px, 0, px, px, column.x - size / 2, bead.y - size / 2, size, size)
        }
      }
    }
    bctx.globalAlpha = 1
  }
}

export { TICK_MS, MAX_FRAME_MS }
