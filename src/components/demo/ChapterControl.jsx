import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
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
  return transform === 'none' ? 1 : 1 + new DOMMatrixReadOnly(transform).m41 / 20
}
function animateFill(el, to, ms, easing = 'linear', from = readProgress(el)) {
  el.getAnimations().forEach((a) => a.cancel())
  el.style.transform = fillTransform(to)
  if (ms <= 0 || from === to) return
  const a = el.animate([{ transform: fillTransform(from) }, { transform: fillTransform(to) }], { duration: ms, easing })
  if (document.hidden) a.pause()
}

const triggerCls =
  'group relative block rounded-full outline-offset-2 outline-stone-800 focus-visible:outline focus-visible:outline-1'

function Pill({ index, label, active, reduced, registerFill, onClick, onHover }) {
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
      onFocus={onHover}
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

  // Tooltip (side bottom, offset 3px), follows the hovered trigger
  const group = useRef(null)
  const [tip, setTip] = useState({ kind: 'play', left: 0, open: false, instant: true })
  const showTip = (kind) => (e) => {
    const g = group.current?.getBoundingClientRect()
    const b = e.currentTarget.getBoundingClientRect()
    if (!g) return
    setTip((t) => ({ kind, left: b.left - g.left + b.width / 2, open: true, instant: !t.open }))
  }
  const hideTip = () => setTip((t) => ({ ...t, open: false }))
  const tipText = tip.kind === 'play' ? playLabel : chapters[tip.kind].label

  return (
    <div
      ref={group}
      role="group"
      aria-label="Demo chapters"
      className={`flex items-center gap-1 font-denim ${className}`}
      onPointerLeave={hideTip}
      onBlur={hideTip}
    >
      <button
        type="button"
        aria-label={playLabel}
        className={triggerCls}
        onPointerEnter={showTip('play')}
        onFocus={showTip('play')}
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
        />
      ))}
      <div
        aria-hidden="true"
        data-instant={tip.instant || undefined}
        className="demo-tip pointer-events-none absolute top-[calc(100%+3px)] z-10 -translate-x-1/2 select-none whitespace-nowrap rounded-[4px] bg-pill-gray px-[2.5px] py-px text-xs font-semibold uppercase text-stone-800"
        style={{ left: tip.left, opacity: tip.open ? 1 : 0 }}
      >
        {tipText}
      </div>
    </div>
  )
}
