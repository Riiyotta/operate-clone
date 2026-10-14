import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'

// "Submitting…" overlay animation — the homepage logo animation in its Boom state, logo held still,
// rings only (CLONE_SPEC_PAGES §3.10). viewBox 344x205, line #E0E0E0, fill #117025.
//
// Rings: visible for 1500ms, exit over 750ms (ease-out-quint) + 400ms pause, then re-enter
// (rx/ry spring bounce .9 / 1.5s, opacity 400ms ease-out-quint). Reduced motion: static, rings shown.

const EASE_OUT_QUINT = [0.23, 1, 0.32, 1]
const EXIT = { duration: 0.75, ease: EASE_OUT_QUINT }
const ENTER_OPACITY = { duration: 0.4, ease: EASE_OUT_QUINT }
const VISIBLE_MS = 1500
const HIDDEN_MS = EXIT.duration * 1000 + 400

const ANGLE = 37.61
const LINE = '#E0E0E0'
const FILL = '#117025'

// Logo outline made of the three tilted ellipses (still pose), as rendered in the original.
const LOGO_D =
  'M 123.99163055419922 77.65679168701172 C 124.57163055419922 80.82679168701172 128.3144482421875 82.70371978759766 130.4344482421875 80.27371978759766 A 41.55 78.95 37.61 0 1 215.30313110351562 67.281982421875 C 215.84313110351562 70.541982421875 219.7395703125 72.08684143066407 221.8095703125 69.49684143066406 A 48.575 92.175 37.61 1 1 190.54153442382812 148.44175720214844 C 190.35153442382813 145.02175720214845 186.12737609863282 143.48908203125 183.8573760986328 146.05908203125 A 41.55 78.95 37.61 0 1 99.47747802734375 154.93179321289062 C 99.16747802734375 151.66179321289061 95.28231597900391 149.87881408691408 93.0223159790039 152.26881408691406 A 37.495 71.155 37.61 1 1 123.99163055419922 77.65679168701172 Z'

// Two dashed rings per logo ellipse: target radii, start scale (enter), end scale (exit).
const RINGS = [
  { cx: 72.1, cy: 119.1, rx: 26.4, ry: 57.3, from: 0.75, to: 1.05, dash: '0 5.4 18.7 18.6 30.3 27' },
  { cx: 72.1, cy: 119.1, rx: 50.2, ry: 84.3, from: 1.05, to: 0.95, dash: '0 12.6 13.8 32.3 12 29.3' },
  { cx: 157.6, cy: 112.65, rx: 28.4, ry: 66, from: 0.75, to: 1.05, dash: '0 15.8 13.6 34.9 14.3 21.4' },
  { cx: 157.6, cy: 112.65, rx: 54.2, ry: 92, from: 1.05, to: 0.95, dash: '0 5.9 6.2 8.7 5.8 28.6 22.7 22.1' },
  { cx: 258.6, cy: 101.3, rx: 34.5, ry: 79.2, from: 0.75, to: 1.05, dash: '0 0 11.1 12.1 6.8 33 37' },
  { cx: 258.6, cy: 101.3, rx: 61.2, ry: 104.9, from: 1.05, to: 0.95, dash: '0 0 8.8 18 2.6 41.5 5.5 18.1 19.8 5.5' },
]

function Rings() {
  return RINGS.map((ring) => (
    <motion.ellipse
      key={ring.dash}
      cx={ring.cx}
      cy={ring.cy}
      initial={{ opacity: 0, rx: ring.rx * ring.from, ry: ring.ry * ring.from }}
      animate={{ opacity: 1, rx: ring.rx, ry: ring.ry }}
      exit={{ opacity: 0, rx: ring.rx * ring.to, ry: ring.ry * ring.to, transition: EXIT }}
      transition={{ type: 'spring', bounce: 0.9, duration: 1.5, opacity: ENTER_OPACITY }}
      transform={`rotate(${ANGLE}, ${ring.cx}, ${ring.cy})`}
      strokeDasharray={ring.dash}
      stroke={LINE}
      pathLength="100"
      strokeWidth="1.5"
    />
  ))
}

export default function SendingAnimation({ className }) {
  const still = useReducedMotion() ?? false
  const [rings, setRings] = useState(true)

  useEffect(() => {
    if (still) return
    const timer = window.setTimeout(() => setRings((on) => !on), rings ? VISIBLE_MS : HIDDEN_MS)
    return () => window.clearTimeout(timer)
  }, [rings, still])

  return (
    <svg className={`overflow-visible ${className}`} width="344" height="205" fill="none" viewBox="0 0 344 205">
      <path className="relative" strokeWidth="1.5" stroke={LINE} fill={FILL} d={LOGO_D} />
      <AnimatePresence initial={!still}>{(rings || still) && <Rings key="boom" />}</AnimatePresence>
    </svg>
  )
}
