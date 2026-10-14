import { useEffect, useRef } from 'react'
import { animate, motion, useMotionValue, useReducedMotion } from 'motion/react'
import { useDemo, usePointer } from './engine.jsx'

const MOVE_EASE = [0.42, 0, 0.12, 1]
const HOVER_TRACK_MS = 1500

/*
 * Fake cursor. Glides along a gently curved (quadratic) path to the centre of the current step's
 * target, then "clicks" (press 40ms after arrival, release 120ms later) when the step asks for it.
 * pointer variant = arrow (desktop), touch variant = 20px ring (mobile).
 */
export default function Cursor({ variant = 'pointer' }) {
  const touch = variant === 'touch'
  const { step, cursor, getTarget, targetAt, setHovered, setPressed, finishClick } = useDemo()
  const { pressed } = usePointer()
  const reduced = useReducedMotion()
  const layer = useRef(null)
  const shown = useRef(false)
  const lastTarget = useRef(null)
  const lastHover = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const opacity = useMotionValue(0)

  useEffect(() => {
    let timer
    let raf = 0
    let cancelled = false
    let arrived = false
    const running = []

    const syncHover = () => {
      if (touch) return
      const box = layer.current?.getBoundingClientRect()
      const name = box && shown.current ? targetAt(box.left + x.get(), box.top + y.get()) : null
      if (name !== lastHover.current) {
        lastHover.current = name
        setHovered(name)
      }
    }

    if (!cursor) {
      shown.current = false
      lastTarget.current = null
      syncHover()
      const a = animate(opacity, 0, { duration: 0.2 })
      return () => a.stop()
    }

    const { target, action } = cursor
    const stay = !action && shown.current && lastTarget.current === target
    lastTarget.current = target

    const wait = (ms) => new Promise((r) => (timer = setTimeout(r, ms)))
    const centre = () => {
      const l = layer.current
      const el = getTarget(target)
      if (!l || !el) return null
      const a = l.getBoundingClientRect()
      const b = el.getBoundingClientRect()
      return { x: b.left + b.width / 2 - a.left, y: b.top + b.height / 2 - a.top }
    }
    const onResize = () => {
      if (!arrived) return
      const p = centre()
      if (p) {
        x.set(p.x)
        y.set(p.y)
      }
      syncHover()
    }
    window.addEventListener('resize', onResize)

    ;(async () => {
      let dest = stay ? null : centre()
      // a click target may mount a frame later — wait for it
      if (!dest && action === 'click') {
        dest = await new Promise((resolve) => {
          const look = () => {
            const p = centre()
            if (p) return resolve(p)
            raf = requestAnimationFrame(look)
          }
          raf = requestAnimationFrame(look)
        })
      }
      if (cancelled) return

      if (dest) {
        if (!shown.current) {
          // first appearance: enter from below-right of the target
          shown.current = true
          x.set(dest.x + 48)
          y.set((layer.current?.offsetHeight ?? dest.y) + 16)
        }
        running.push(animate(opacity, 1, { duration: 0.2 }))
        const from = { x: x.get(), y: y.get() }
        let to = dest
        const dist = Math.hypot(to.x - from.x, to.y - from.y)
        if (dist > 1) {
          const move = animate(0, 1, {
            duration: reduced ? 0 : Math.min(Math.max(0.3 + dist / 850, 0.38), 1.06),
            ease: MOVE_EASE,
            onUpdate: (t) => {
              to = centre() ?? to
              const dx = to.x - from.x
              const dy = to.y - from.y
              const bend = dx >= 0 ? 0.12 : -0.12
              const cx = from.x + dx / 2 - dy * bend
              const cy = from.y + dy / 2 + dx * bend
              const u = 1 - t
              x.set(u * u * from.x + 2 * u * t * cx + t * t * to.x)
              y.set(u * u * from.y + 2 * u * t * cy + t * t * to.y)
              syncHover()
            },
          })
          running.push(move)
          await move
          if (cancelled) return
        }
      }

      arrived = true
      if (!touch) {
        const until = performance.now() + HOVER_TRACK_MS
        const track = (now) => {
          syncHover()
          if (now < until) raf = requestAnimationFrame(track)
        }
        raf = requestAnimationFrame(track)
      }

      if (action === 'click') {
        await wait(40)
        if (cancelled) return
        setPressed(target)
        await wait(120)
        if (cancelled) return
        setPressed(null)
        finishClick(step)
      }
    })()

    return () => {
      cancelled = true
      running.forEach((a) => a.stop())
      clearTimeout(timer)
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      setPressed(null)
    }
  }, [step, cursor, getTarget, targetAt, setHovered, setPressed, finishClick, reduced, touch, x, y, opacity])

  return (
    <div ref={layer} data-demo-cursor-layer="" aria-hidden="true" className="absolute inset-0 z-50">
      <motion.div
        className="pointer-events-none absolute left-0 top-0"
        style={{ x, y, opacity }}
        animate={{ scale: pressed ? 0.85 : 1 }}
        transition={{ duration: 0.12 }}
      >
        {touch ? (
          <div
            className={`absolute -left-2.5 -top-2.5 size-5 rounded-full border border-black/[0.24] shadow-[0_0_0_1px_rgba(255,255,255,0.4)] transition-colors duration-[120ms] ${
              pressed ? 'bg-black/[0.32]' : 'bg-black/[0.16]'
            }`}
          />
        ) : (
          <svg
            className="-translate-x-px -translate-y-px drop-shadow-[0_1px_2px_rgba(0,0,0,0.24)]"
            width="16"
            height="22"
            viewBox="0 0 16 22"
            fill="none"
          >
            <path d="M1 1v16.5l4.1-3.8 2.7 6.2 2.7-1.2-2.6-6.1H13.5L1 1Z" fill="#1C1917" stroke="#fff" strokeWidth="1.25" strokeLinejoin="round" />
          </svg>
        )}
      </motion.div>
    </div>
  )
}
