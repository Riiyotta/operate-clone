import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { CLICK_ESTIMATE, CONTENT_ESTIMATE, stepEstimate, useDemo } from './engine.jsx'
import { PauseGlyph, PlayGlyph } from './icons.jsx'

const IN_OUT_CUBIC = [0.65, 0, 0.35, 1]
const PILL = { duration: 0.65, ease: IN_OUT_CUBIC }
const PILL_CSS_EASE = `cubic-bezier(${IN_OUT_CUBIC.join(', ')})`

// Fill progress p (0..1) maps to translateX((p - 1) * 20px)
const fillTransform = (p) => `translateX(${(p - 1) * 20}px)`
const readProgress = (el) => {
  const { transform } = getComputedStyle(el)
  if (transform !== 'none') return 1 + new DOMMatrixReadOnly(transform).m41 / 20
  // Not rendered yet (no computed transform): fall back to the inline value instead of reading "full"
  const m = /translateX\((-?[\d.]+)px\)/.exec(el.style.transform)
  return m ? 1 + +m[1] / 20 : 0
}
function animateFill(el, to, ms, easing = 'linear', from = readProgress(el)) {
  el.getAnimations().forEach((a) => a.cancel())
  el.style.transform = fillTransform(to)
  if (ms <= 0 || from === to) return
  const a = el.animate([{ transform: fillTransform(from) }, { transform: fillTransform(to) }], { duration: ms, easing, fill: 'both' })
  if (document.hidden) a.pause()
}

const TIP_CLOSE_DELAY = 200
const TIP_EXIT_MS = 150

// Containing block of a <body>-portalled absolute element, in viewport coordinates.
function bodyOrigin() {
  const b = document.body
  const cs = getComputedStyle(b)
  if (cs.position === 'static' && cs.transform === 'none' && cs.filter === 'none' && cs.contain === 'none') {
    const h = document.documentElement.getBoundingClientRect()
    return { x: h.left, y: h.top }
  }
  const r = b.getBoundingClientRect()
  return { x: r.left + b.clientLeft, y: r.top + b.clientTop }
}

/*
 * Chapter tooltip. The positioner centres the popup under the anchor and glides (left/top, 250ms
 * out-cubic) when it moves to another trigger, snapping on first open. The popup fades in/out over
 * 150ms out-cubic; on a hop the previous label fades out over the new one.
 */
function Tooltip({ anchor, open, instant, hop, prev, text }) {
  const pos = useRef(null)
  const popup = useRef(null)
  useLayoutEffect(() => {
    let raf = 0
    let last = ''
    const place = () => {
      const el = pos.current
      if (el && anchor?.isConnected && popup.current) {
        const a = anchor.getBoundingClientRect()
        const o = bodyOrigin()
        const left = a.left + a.width / 2 - popup.current.getBoundingClientRect().width / 2 - o.x
        const top = a.bottom + 3 - o.y
        const key = `${left.toFixed(2)},${top.toFixed(2)}`
        if (key !== last) {
          last = key
          el.style.left = `${left}px`
          el.style.top = `${top}px`
        }
      }
      raf = requestAnimationFrame(place)
    }
    place()
    return () => cancelAnimationFrame(raf)
  }, [anchor, open, text, hop])

  return createPortal(
    <div ref={pos} aria-hidden="true" data-instant={instant || undefined} className="demo-tip-pos pointer-events-none absolute left-0 top-0 z-50 w-max select-none">
      <div
        ref={popup}
        data-open={open || undefined}
        className="demo-tip rounded-[4px] bg-pill-gray px-[2.5px] py-px font-denim text-[12px]/[14px] font-semibold uppercase text-stone-800"
      >
        <div className="relative">
          {prev && (
            <div key={`p${prev.id}`} className="demo-tip-prev absolute left-0 top-0">
              {prev.text}
            </div>
          )}
          <div key={`c${hop}`} className={prev ? 'demo-tip-in' : undefined}>
            {text}
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}

const triggerCls =
  'group relative block rounded-full outline-offset-2 outline-stone-800 focus-visible:outline focus-visible:outline-1'

function Pill({ index, label, active, reduced, registerFill, onClick, onHover, onUnhover, onBlur }) {
  const fill = useRef(null)
  const setFill = useCallback(
    (el) => {
      fill.current = el
      registerFill(index, el)
    },
    [index, registerFill]
  )

  // Leaving the active state: drain the fill back to 0 alongside the exit transition
  useLayoutEffect(() => {
    if (!active && fill.current) animateFill(fill.current, 0, reduced ? 0 : PILL.duration * 1000, PILL_CSS_EASE)
  }, [active, reduced])

  return (
    <button
      type="button"
      aria-label={label}
      aria-current={active ? 'step' : undefined}
      className={triggerCls}
      onClick={onClick}
      onPointerEnter={onHover}
      onPointerLeave={onUnhover}
      onFocus={onHover}
      onBlur={onBlur}
    >
      <motion.span
        className="relative block h-3 overflow-hidden rounded-full border border-stone-800 bg-pill-gray"
        initial={false}
        animate={{ width: active ? 32 : 12 }}
        transition={PILL}
      >
        <AnimatePresence initial={false}>
          {active && (
            <motion.span
              className="absolute inset-px origin-[4px_50%] overflow-hidden rounded-full"
              initial={{ scale: 0.5 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={PILL}
            >
              <span ref={setFill} className="absolute left-0 top-0 h-2 w-7 rounded-full bg-stone-800" style={{ transform: fillTransform(0) }} />
            </motion.span>
          )}
        </AnimatePresence>
        {!active && (
          <span className="absolute left-[3px] top-[3px] size-1 rounded-full bg-stone-800 opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100" />
        )}
      </motion.span>
    </button>
  )
}

export default function ChapterControl({ chapters, className }) {
  const { script, S, step, last, contentEnds, playing, paused, setPaused, jumpTo } = useDemo()
  const ended = step >= last && script[last].duration === undefined
  const starts = chapters.map((c) => S[c.start])
  const current = Math.max(starts.findLastIndex((s) => s <= step), 0)
  const reduced = !!useReducedMotion()
  const fills = useRef([])
  const registerFill = useCallback((i, el) => {
    fills.current[i] = el
  }, [])

  // Pause pill animations while the tab is hidden
  useEffect(() => {
    const onVis = () => {
      for (const el of fills.current) for (const a of el?.getAnimations() ?? []) document.hidden ? a.pause() : a.play()
    }
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [])

  const prevStep = useRef(step)
  const stepClock = useRef(null)
  useLayoutEffect(() => {
    const before = prevStep.current
    prevStep.current = step
    const el = fills.current[current]
    if (!el) return
    const first = starts[current]
    const end = starts[current + 1] ?? last + 1
    let from = readProgress(el)
    // Jumped (not a normal advance): recompute progress from step estimates
    if (step !== before && step !== before + 1) {
      let total = 0
      let done = 0
      for (let s = first; s < end; s++) {
        const e = stepEstimate(script[s])
        total += e
        if (s < step) done += e
      }
      from = total > 0 ? done / total : 0
    }
    const run = (to, ms) => animateFill(el, to, reduced ? 0 : ms, 'linear', from)
    if (ended) return void run(1, 300)
    if (!playing) {
      stepClock.current = null
      run(from, 0)
      return
    }
    if (stepClock.current?.step !== step) stepClock.current = { step, time: performance.now() }
    const t0 = stepClock.current.time
    const cur = script[step]
    const clickEnd = t0 + (cur.cursor?.action ? CLICK_ESTIMATE : 0)
    const contentEnd =
      cur.waitsFor === undefined ? t0 : contentEnds.get(S[cur.waitsFor]) ?? t0 + (cur.estimate ?? CONTENT_ESTIMATE)
    let remaining = Math.max(Math.max(clickEnd, contentEnd) + (cur.duration ?? 0) - performance.now(), 0)
    for (let s = step + 1; s < end; s++) remaining += stepEstimate(script[s])
    run(1, remaining)
  }, [step, current, chapters, script, S, last, ended, playing, reduced, contentEnds]) // eslint-disable-line react-hooks/exhaustive-deps

  const showPause = !paused && !ended
  const playLabel = showPause ? 'Pause' : 'Play'

  // Tooltip (side bottom, offset 3px): portalled to <body>, follows the hovered trigger.
  const [tip, setTip] = useState({ kind: 'play', anchor: null, open: false, mounted: false, instant: true, hop: 0, prev: null })
  const closeTimer = useRef(0)
  const unmountTimer = useRef(0)
  useEffect(
    () => () => {
      clearTimeout(closeTimer.current)
      clearTimeout(unmountTimer.current)
    },
    []
  )
  const labelOf = (kind) => (kind === 'play' ? playLabel : chapters[kind].label)
  const showTip = (kind) => (e) => {
    const anchor = e.currentTarget
    clearTimeout(closeTimer.current)
    clearTimeout(unmountTimer.current)
    setTip((t) => {
      if (t.open && t.kind === kind) return t
      // Closed (or closing): appear in place. Open on another trigger: glide over and cross-fade the label.
      if (!t.open) return { ...t, kind, anchor, open: true, mounted: true, instant: true, prev: null }
      return { ...t, kind, anchor, instant: false, hop: t.hop + 1, prev: { id: t.hop, text: labelOf(t.kind) } }
    })
  }
  const hideTip = (delay) => () => {
    clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => {
      setTip((t) => (t.open ? { ...t, open: false } : t))
      clearTimeout(unmountTimer.current)
      unmountTimer.current = setTimeout(() => setTip((t) => (t.open ? t : { ...t, mounted: false, prev: null })), TIP_EXIT_MS)
    }, delay)
  }
  const tipText = labelOf(tip.kind)

  return (
    <div
      role="group"
      aria-label="Demo chapters"
      className={`flex items-center gap-1 font-denim ${className}`}
    >
      <button
        type="button"
        aria-label={playLabel}
        className={triggerCls}
        onPointerEnter={showTip('play')}
        onPointerLeave={hideTip(TIP_CLOSE_DELAY)}
        onFocus={showTip('play')}
        onBlur={hideTip(0)}
        onClick={() => {
          if (ended) {
            jumpTo(S[chapters[0].start])
            setPaused(false)
          } else setPaused(!paused)
        }}
      >
        {showPause ? <PauseGlyph /> : <PlayGlyph />}
      </button>
      {chapters.map((c, i) => (
        <Pill
          key={c.start}
          index={i}
          label={c.label}
          active={i === current}
          reduced={reduced}
          registerFill={registerFill}
          onClick={() => jumpTo(S[c.start])}
          onHover={showTip(i)}
          onUnhover={hideTip(TIP_CLOSE_DELAY)}
          onBlur={hideTip(0)}
        />
      ))}
      {tip.mounted && <Tooltip anchor={tip.anchor} open={tip.open} instant={tip.instant} hop={tip.hop} prev={tip.prev} text={tipText} />}
    </div>
  )
}
