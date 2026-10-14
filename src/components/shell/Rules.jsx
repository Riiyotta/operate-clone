// Shared "ruled paper" decorations (CLONE_SPEC §0 HomeRuleCap, §4/§7/§8 arcs and rules).

// Square cap marking the end of a rule: 5px (<md) / 8px (md+), #117025.
export function RuleCap({ className = '' }) {
  return <span aria-hidden="true" className={`pointer-events-none absolute size-[5px] bg-waitlist-dark-green md:size-2 ${className}`} />
}

// Quarter arc of `radius` px that continues into a vertical line.
//   bend 'top'    → arc at the top, then the line runs down (svgs/04, svgs/57)
//   bend 'bottom' → line runs down, then the arc at the bottom (svgs/02, svgs/49)
//   side 'left'   → mirrored horizontally
export function RuleArc({ bend, radius: r, side = 'right', className = '' }) {
  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none absolute overflow-visible ${side === 'left' ? '-scale-x-100' : ''} ${className}`}
      fill="none"
      stroke="#117025"
      style={{ width: r, strokeWidth: 'var(--home-rule)' }}
    >
      {bend === 'bottom' ? (
        <>
          <line x1={r} x2={r} y1={r - 1} y2="100%" transform={`translate(0 ${-(r - 1)})`} />
          <svg className="overflow-visible" y="100%">
            <path d={`M${r} ${-r}A${r} ${r} 0 0 1 0 0`} />
          </svg>
        </>
      ) : (
        <>
          <path d={`M0 0A${r} ${r} 0 0 1 ${r} ${r}`} />
          <line x1={r} x2={r} y1={r - 1} y2="100%" />
        </>
      )}
    </svg>
  )
}

// Quarter circle that scales with its box (viewBox 0 0 1 1). `d` picks the orientation.
export function ScaledArc({ d, className = '' }) {
  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none absolute overflow-visible ${className}`}
      fill="none"
      preserveAspectRatio="none"
      viewBox="0 0 1 1"
    >
      <path d={d} stroke="#117025" style={{ strokeWidth: 'var(--home-rule)' }} vectorEffect="non-scaling-stroke" />
    </svg>
  )
}

// Full-height vertical rule drawn as an SVG rect (0.8px <md, 1.25px md+).
export function VRule({ className = '' }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute w-[var(--home-rule)] ${className}`}>
      <svg className="absolute inset-0 size-full overflow-visible">
        <rect className="md:hidden" width="0.8" height="100%" fill="#117025" />
        <rect className="hidden md:block" width="1.25" height="100%" fill="#117025" />
      </svg>
    </div>
  )
}

// Operate logo mark (svgs/00 + svgs/56), viewBox 0 0 32 16.
export function LogoMark({ className = '' }) {
  return (
    <svg className={className} width="32" height="16" fill="none" viewBox="0 0 32 16" aria-hidden="true">
      <path
        fill="#117025"
        d="M28.58.029c-2.37-.295-5.59 1.695-8.004 4.723a.39.39 0 0 1-.688-.179c-.21-1.257-.949-2.104-2.181-2.258-1.89-.235-4.411 1.226-6.42 3.521a.39.39 0 0 1-.675-.188c-.2-1.106-.864-1.849-1.959-1.985-2.31-.287-5.668 2.236-7.499 5.637s-1.441 6.39.87 6.677c1.596.2 3.692-.944 5.439-2.791a.39.39 0 0 1 .67.23c.137 1.423.892 2.393 2.22 2.559 1.87.233 4.358-1.194 6.355-3.448a.39.39 0 0 1 .68.237c.1 1.78.99 3.006 2.61 3.207 2.99.372 7.337-2.895 9.707-7.297S31.571.401 28.58.03"
      />
    </svg>
  )
}
