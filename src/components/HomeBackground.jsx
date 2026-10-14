import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { BeadField, MAX_FRAME_MS, TICK_MS, bandFor, canvasHeightFor, createLayout } from '../lib/beadField.js'
import { useVideoLightbox } from '../lib/videoLightbox.js'
import { easeInOutQuad } from '../lib/easing.js'

// CLONE_SPEC §2 — fixed animated background behind the sheets.
// Layers: deep-green + texture (overlay 20%), dotted column pattern, then two canvases
// (blurred bars + beads) that only render while scroll progress is < .35 or > .65.

const maxDpr = () => Math.min(window.devicePixelRatio || 1, 2)

function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches)
  useEffect(() => {
    const mql = window.matchMedia(query)
    const onChange = () => setMatches(mql.matches)
    onChange()
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [query])
  return matches
}

function usePageVisible() {
  const [visible, setVisible] = useState(() => document.visibilityState !== 'hidden')
  useEffect(() => {
    const onChange = () => setVisible(document.visibilityState !== 'hidden')
    document.addEventListener('visibilitychange', onChange)
    return () => document.removeEventListener('visibilitychange', onChange)
  }, [])
  return visible
}

// Measured size of the pattern box, settled 150ms after changes.
function useSettledSize(ref) {
  const [size, setSize] = useState(null)
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    let timer = 0
    let first = true
    const ro = new ResizeObserver(([entry]) => {
      const next = { width: entry.contentRect.width, height: entry.contentRect.height }
      if (!next.width || !next.height) return
      clearTimeout(timer)
      if (first) {
        first = false
        setSize(next)
      } else {
        timer = setTimeout(() => setSize(next), 150)
      }
    })
    ro.observe(el)
    return () => {
      ro.disconnect()
      clearTimeout(timer)
    }
  }, [ref])
  return size
}

// Scroll progress 0..1 kept in a ref (no re-renders).
function useScrollProgress() {
  const progress = useRef(0)
  useEffect(() => {
    let range = 0
    const read = () => {
      // frozen while the sign-up modal pins the homepage column (CLONE_SPEC_PAGES §3.9)
      if (document.querySelector('[data-sign-up-pinned]')) return
      progress.current = range > 0 ? Math.min(Math.max(window.scrollY / range, 0), 1) : 0
    }
    const measure = () => {
      range = document.documentElement.scrollHeight - window.innerHeight
      read()
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(document.body)
    window.addEventListener('resize', measure)
    window.addEventListener('scroll', read, { passive: true })
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
      window.removeEventListener('scroll', read)
    }
  }, [])
  return progress
}

// speedMultiplier, eased toward `target` like the original's motion value:
// 2.5s when slowing, 2s when speeding, cubic-bezier(.455,.03,.515,.955). Read per tick via ref.
function useEasedSpeed(target) {
  const value = useRef(target)
  useEffect(() => {
    const from = value.current
    if (from === target) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      value.current = target
      return
    }
    const duration = target < from ? 2500 : 2000
    const start = performance.now()
    let raf = 0
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1)
      value.current = from + (target - from) * easeInOutQuad(t)
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target])
  return value
}

function BeadCanvases({ size, mobile, playing, speedMultiplier }) {
  const speed = useEasedSpeed(speedMultiplier)
  const barRef = useRef(null)
  const beadRef = useRef(null)
  const progress = useScrollProgress()
  const [layout, setLayout] = useState(null)

  // Regenerate the layout on width change, or when the viewport grows past the
  // 200px headroom (so mobile URL-bar resizes don't reshuffle everything).
  useEffect(() => {
    setLayout((prev) => {
      if (prev && prev.width === size.width && size.height <= prev.height && prev.mobile === mobile) return prev
      return { ...createLayout({ width: size.width, height: size.height + 200, viewHeight: size.height, mobile }), mobile }
    })
  }, [size, mobile])

  const fieldRef = useRef(null)

  // Build the field (canvas sizes, sprites, bead positions) once per layout.
  useLayoutEffect(() => {
    const barCanvas = barRef.current
    const beadCanvas = beadRef.current
    if (!layout || !barCanvas || !beadCanvas) return
    const dpr = maxDpr()
    const h = canvasHeightFor(layout.viewHeight)
    for (const c of [barCanvas, beadCanvas]) {
      c.width = layout.width * dpr
      c.height = h * dpr
      c.style.width = `${layout.width}px`
      c.style.height = `${h}px`
    }
    fieldRef.current = new BeadField({
      layout,
      barCanvas,
      beadCanvas,
      dpr,
      edgeFade: CSS.supports('-webkit-touch-callout', 'none'),
    })
    fieldRef.current.render(progress.current)
  }, [layout, progress])

  // Drive it: rAF only while a band is visible, the tab is visible and the lightbox is closed.
  useEffect(() => {
    const field = fieldRef.current
    if (!field) return
    const draw = () => field.render(progress.current)

    // Reduced motion: static frame, redrawn on scroll.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      let raf = 0
      const onScroll = () => {
        cancelAnimationFrame(raf)
        raf = requestAnimationFrame(draw)
      }
      draw()
      window.addEventListener('scroll', onScroll, { passive: true })
      return () => {
        cancelAnimationFrame(raf)
        window.removeEventListener('scroll', onScroll)
      }
    }

    if (!playing) return
    draw()

    let raf = 0
    let running = false
    let last = 0
    let pending = 0
    let lastProgress = -1
    const inBand = () => bandFor(progress.current).band !== null

    const frame = (now) => {
      if (!inBand()) {
        running = false
        draw()
        return
      }
      pending += Math.min(now - last, MAX_FRAME_MS)
      last = now
      let ticks = 0
      while (pending >= TICK_MS) {
        field.step(speed.current)
        pending -= TICK_MS
        ticks++
      }
      if (ticks > 0 || progress.current !== lastProgress) {
        draw()
        lastProgress = progress.current
      }
      raf = requestAnimationFrame(frame)
    }
    const start = () => {
      if (running || !inBand()) return
      running = true
      last = performance.now()
      pending = 0
      raf = requestAnimationFrame(frame)
    }
    const onScroll = () => {
      if (!running) draw()
      start()
    }
    start()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
    }
  }, [layout, playing, progress, speed])

  return (
    <div className="absolute left-0 top-0 size-full">
      <canvas ref={barRef} className="absolute left-0" />
      <canvas ref={beadRef} className="absolute left-0" />
    </div>
  )
}

export default function HomeBackground({ speedMultiplier = 1 }) {
  const measureRef = useRef(null)
  const size = useSettledSize(measureRef)
  const mobile = useMediaQuery('(max-width: 767.98px)')
  const pageVisible = usePageVisible()
  const { open: lightboxOpen } = useVideoLightbox()

  return (
    <>
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="ios-edge-fade absolute inset-0 isolate bg-waitlist-deep-green">
          <div
            className="size-full bg-repeat opacity-20 mix-blend-overlay"
            style={{ backgroundImage: 'url(/assets/home-background-texture.png)', backgroundSize: '1470px 100px' }}
          />
        </div>
        <div className="home-bg-pattern relative mx-auto h-full">
          <div ref={measureRef} className="relative h-full w-full">
            {size && <BeadCanvases size={size} mobile={mobile} playing={pageVisible && !lightboxOpen} speedMultiplier={speedMultiplier} />}
          </div>
        </div>
      </div>
      {/* sets html/body background to deep green while the page is mounted */}
      <div aria-hidden="true" data-home-deep-green="" className="pointer-events-none fixed inset-0" />
    </>
  )
}
