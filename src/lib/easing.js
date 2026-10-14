// CSS-style cubic-bezier timing functions for JS-driven motion.

export function cubicBezier(x1, y1, x2, y2) {
  const ax = 3 * x1 - 3 * x2 + 1
  const bx = 3 * x2 - 6 * x1
  const cx = 3 * x1
  const ay = 3 * y1 - 3 * y2 + 1
  const by = 3 * y2 - 6 * y1
  const cy = 3 * y1
  const sampleX = (t) => ((ax * t + bx) * t + cx) * t
  const sampleY = (t) => ((ay * t + by) * t + cy) * t
  const slopeX = (t) => (3 * ax * t + 2 * bx) * t + cx

  const solveT = (x) => {
    let t = x
    for (let i = 0; i < 8; i++) {
      const err = sampleX(t) - x
      if (Math.abs(err) < 1e-6) return t
      const d = slopeX(t)
      if (Math.abs(d) < 1e-6) break
      t -= err / d
    }
    // bisection fallback
    let lo = 0
    let hi = 1
    t = x
    while (hi - lo > 1e-6) {
      if (sampleX(t) < x) lo = t
      else hi = t
      t = (lo + hi) / 2
    }
    return t
  }

  return (x) => (x <= 0 ? 0 : x >= 1 ? 1 : sampleY(solveT(x)))
}

// easeInOutQuad-ish token used by the background speed ramp (original: [.455,.03,.515,.955]).
export const easeInOutQuad = cubicBezier(0.455, 0.03, 0.515, 0.955)
