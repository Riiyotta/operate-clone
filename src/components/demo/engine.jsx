import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'

/*
 * Demo timeline engine.
 *
 * A script is an ordered list of steps: { id, duration, cursor?: { target, action? }, waitsFor?, estimate? }.
 * The engine holds the current step index and advances when, for the current step:
 *   1. the cursor's click (if any) has completed,
 *   2. the content it waits for (if any) has reported "finished",
 *   3. then `duration` ms have elapsed.
 * After the last step the run fades out (250ms), resets to step 0 and pauses (no auto-loop).
 */

// Every cursor click adds this much to a step's estimated length (pill fill timing).
export const CLICK_ESTIMATE = 700
// Default estimate for content a step waits on.
export const CONTENT_ESTIMATE = 800
// Typewriter speed (ms / character) and word-reveal speed (ms / token).
export const TYPE_MS = 32
export const REVEAL_MS = 25

export const typingEstimate = (text, from = '') => TYPE_MS * Math.max(text.length - from.length - 1, 0)

export const stepEstimate = (s) =>
  (s.duration ?? 0) + (s.cursor?.action ? CLICK_ESTIMATE : 0) + (s.waitsFor !== undefined ? s.estimate ?? CONTENT_ESTIMATE : 0)

/*
 * Starts a `ms` timer from the frame that first shows the current commit (its rAF), so each step is
 * on screen for its full duration. Passive effects can run before that frame; starting the clock
 * there would shave up to a frame off every step. Returns a canceller.
 */
function afterPaint(fn, ms) {
  let t = 0
  let raf = 0
  // rAF does not run in background tabs; fall back to a plain timer there.
  if (document.hidden) t = setTimeout(fn, ms)
  else
    raf = requestAnimationFrame(() => {
      t = setTimeout(fn, ms)
    })
  return () => {
    cancelAnimationFrame(raf)
    clearTimeout(t)
  }
}

const DemoContext = createContext(null)
const PointerContext = createContext({ hovered: null, pressed: null })

export const useDemo = () => useContext(DemoContext)
export const usePointer = () => useContext(PointerContext)

const isVisible = (el) => el.getBoundingClientRect().width > 0

export function DemoProvider({ script, active, children }) {
  // index lookup: S.DealOpen -> number
  const S = useMemo(() => Object.fromEntries(script.map((s, i) => [s.id, i])), [script])
  const last = script.length - 1

  const [pos, setPos] = useState({ step: 0, settled: 0, clicked: null })
  const { step, settled, clicked } = pos
  const [paused, setPaused] = useState(false)
  const [resetting, setResetting] = useState(false)
  const [run, setRun] = useState(0)
  const [hovered, setHovered] = useState(null)
  const [pressed, setPressed] = useState(null)
  const [finished, setFinished] = useState(() => new Set())
  const [contentEnds, setContentEnds] = useState(() => new Map())

  const playing = active && !paused

  const finishClick = useCallback((s) => {
    setPos((p) => (p.step === s ? { ...p, clicked: s } : p))
  }, [])

  const jumpTo = useCallback((s) => {
    setResetting(false)
    setPos((p) => (p.step === s ? p : { step: s, settled: s, clicked: null }))
  }, [])

  const markFinished = useCallback((s, done) => {
    setFinished((prev) => {
      if (prev.has(s) === done) return prev
      const next = new Set(prev)
      done ? next.add(s) : next.delete(s)
      return next
    })
  }, [])

  const markContentEnd = useCallback((s, at) => {
    setContentEnds((prev) => {
      if (at === null ? !prev.has(s) : prev.get(s) === at) return prev
      const next = new Map(prev)
      at === null ? next.delete(s) : next.set(s, at)
      return next
    })
  }, [])

  // Cursor target registry: name -> Set<HTMLElement>
  const targets = useRef(new Map())
  const registerTarget = useCallback((name, el) => {
    const set = targets.current.get(name) ?? new Set()
    set.add(el)
    targets.current.set(name, set)
    return () => set.delete(el)
  }, [])
  const getTarget = useCallback((name) => [...(targets.current.get(name) ?? [])].find(isVisible) ?? null, [])
  const targetAt = useCallback((x, y) => {
    const hit = document.elementsFromPoint(x, y).find((el) => !el.closest('[data-demo-cursor-layer]'))
    if (!hit) return null
    for (const [name, els] of targets.current) for (const el of els) if (el.contains(hit)) return name
    return null
  }, [])

  // Step clock. A step that starts its timer as soon as it is entered waits for its first frame to
  // paint; a step that was waiting on a click / content starts its timer right when that resolves.
  const entered = useRef(-1)
  useEffect(() => {
    if (!playing || resetting) return
    const fresh = entered.current !== step
    entered.current = step
    const cur = script[step]
    if (cur.cursor?.action && clicked !== step) return
    if (cur.waitsFor !== undefined && !finished.has(S[cur.waitsFor])) return
    const advance = () => {
      if (step >= last) setResetting(true)
      else setPos((p) => ({ ...p, step: p.step + 1 }))
    }
    if (fresh) return afterPaint(advance, cur.duration ?? 0)
    const t = setTimeout(advance, cur.duration ?? 0)
    return () => clearTimeout(t)
  }, [playing, resetting, step, clicked, finished, script, S, last])

  // End of run: fade (250ms), rewind to step 0 and pause.
  useEffect(() => {
    if (!resetting) return
    const t = setTimeout(() => {
      entered.current = -1
      setResetting(false)
      setPaused(true)
      setPos({ step: 0, settled: 0, clicked: null })
      setRun((r) => r + 1)
    }, 250)
    return () => clearTimeout(t)
  }, [resetting])

  const cursor = script[step].cursor

  const value = useMemo(
    () => ({
      script,
      S,
      step,
      last,
      settled,
      playing,
      paused,
      setPaused,
      jumpTo,
      resetting,
      run,
      cursor,
      setHovered,
      setPressed,
      finishClick,
      markFinished,
      contentEnds,
      markContentEnd,
      registerTarget,
      getTarget,
      targetAt,
    }),
    [script, S, step, last, settled, playing, paused, jumpTo, resetting, run, cursor, finishClick, markFinished, contentEnds, markContentEnd, registerTarget, getTarget, targetAt]
  )
  const pointer = useMemo(() => ({ hovered, pressed }), [hovered, pressed])

  return (
    <DemoContext.Provider value={value}>
      <PointerContext.Provider value={pointer}>
        <div className="contents select-none">{children}</div>
      </PointerContext.Provider>
    </DemoContext.Provider>
  )
}

/** Registers an element as a cursor target; returns ref + hovered/pressed flags (rendered as data attributes). */
export function useTarget(name) {
  const { registerTarget } = useDemo()
  const { hovered, pressed } = usePointer()
  const ref = useRef(null)
  useEffect(() => {
    if (name && ref.current) return registerTarget(name, ref.current)
  }, [name, registerTarget])
  return {
    ref,
    hoverProps: {
      'data-hovered': (!!name && hovered === name) || undefined,
      'data-pressed': (!!name && pressed === name) || undefined,
    },
  }
}

/** Hooks a piece of progressive content (typing / reveal) into the clock. */
export function useContentClock(stepIndex) {
  const { markFinished, markContentEnd, settled } = useDemo()
  useEffect(
    () => () => {
      markFinished(stepIndex, false)
      markContentEnd(stepIndex, null)
    },
    [stepIndex, markFinished, markContentEnd]
  )
  const onStart = useCallback((ms) => markContentEnd(stepIndex, performance.now() + ms), [stepIndex, markContentEnd])
  const onComplete = useCallback(() => markFinished(stepIndex, true), [stepIndex, markFinished])
  return { onStart, onComplete, instant: stepIndex < settled }
}
