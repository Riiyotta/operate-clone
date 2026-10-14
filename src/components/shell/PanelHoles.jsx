import { useId, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { FOLD, holeVars, mobileHoleVars, periodFor } from '../../lib/holes.js'

// Hole-punched paper layers for a sheet (CLONE_SPEC §1).
// Render as the FIRST child of a `relative isolate` sheet element.
//   variant 'bar'    → nav sheet   (bg #DCDCDC, holes switch at lg)
//   variant 'panel'  → main sheet  (bg paper, tiled slot pairs, holes switch at lg)
//   variant 'footer' → footer      (bg paper, folded corner, holes switch at md)

const PAPER = '#EBEBEB'

// Desktop folded corner (right edge, md+): 125×314 viewBox stretched to the sheet height.
const FOLD_EDGE = 'L102.85 38.31 A8 8 0 1 0 100.03 54.03 L53.45 313.56'
const FOLD_SHEET_FILL = `M0 0 L94.51 0 L96.4 -6.45 L110.58 -4.75 ${FOLD_EDGE} L53.37 314 L0 314`
const FOLD_SHEET_STROKE = `M0 0.5 L94.51 0.5 L96.4 -6.45 L110.58 -4.75 ${FOLD_EDGE} L53.37 313.5 L0 313.5`
const FOLD_FLAP = `M96.82 -6.4 L110.58 -4.75 ${FOLD_EDGE} L53.37 314.1 L1.7 300.69 L94.41 0.04 Z`
const FOLD_RING = { cx: 39, cy: 262.1 }
const FOLD_FLAP_WITH_HOLE = `${FOLD_FLAP} M${FOLD_RING.cx - 8} ${FOLD_RING.cy} a8 8 0 1 0 16 0 a8 8 0 1 0 -16 0 Z`

// Mobile folded corner (bottom-left, <md): 378×79 viewBox stretched to the sheet width.
const SM_FOLD_LINE = 'M0 79 L378 48'
const SM_FOLD_FLAP = 'M-3 58 L371.23 0.14 L378 48 L0 79 Z'

function FoldSvg({ className, children }) {
  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none absolute right-0 top-0 hidden h-full overflow-visible md:block ${className}`}
      style={{ width: 125 }}
      viewBox="0 0 125 314"
      preserveAspectRatio="none"
    >
      {children}
    </svg>
  )
}

function DesktopFold() {
  const patternId = useId()
  return (
    <>
      <FoldSvg className="-z-10">
        <path d={FOLD_SHEET_FILL} fill={PAPER} />
        <path d={FOLD_SHEET_STROKE} fill="none" stroke={FOLD.INK} vectorEffect="non-scaling-stroke" />
      </FoldSvg>
      <FoldSvg className="z-10">
        <defs>
          <pattern
            id={patternId}
            width="24"
            height="72"
            patternUnits="userSpaceOnUse"
            patternTransform="translate(97.64 -8.79) rotate(17.12)"
          >
            <path d={FOLD.DIAMOND} fill="none" stroke={FOLD.HATCH} strokeWidth="0.5" />
          </pattern>
        </defs>
        <path d={FOLD_FLAP_WITH_HOLE} fill={PAPER} fillRule="evenodd" />
        <path d={FOLD_FLAP_WITH_HOLE} fill={`url(#${patternId})`} fillRule="evenodd" />
        <path d={FOLD_FLAP} fill="none" stroke={FOLD.INK} vectorEffect="non-scaling-stroke" />
        <circle {...FOLD_RING} r="8.5" fill="none" stroke={FOLD.INK} vectorEffect="non-scaling-stroke" />
      </FoldSvg>
    </>
  )
}

function MobileFold() {
  const patternId = useId()
  const svgRef = useRef(null)
  const [width, setWidth] = useState(378)

  useLayoutEffect(() => {
    const el = svgRef.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => {
      if (entry.contentRect.width > 0) setWidth(entry.contentRect.width)
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // Keep the hatch undistorted while the viewBox stretches horizontally.
  const angle = (Math.atan2(31, width) * 180) / Math.PI
  const hatchTransform = `scale(${378 / width} 1) translate(-5.07 31.2) rotate(${-angle}) scale(0.625)`
  const cls = 'pointer-events-none absolute bottom-0 left-0 w-full overflow-visible md:hidden'

  return (
    <>
      <svg aria-hidden="true" className={`${cls} -z-10`} style={{ height: 79 }} viewBox="0 0 378 79" preserveAspectRatio="none">
        <path d={SM_FOLD_LINE} fill="none" stroke={FOLD.INK} strokeWidth="0.8" vectorEffect="non-scaling-stroke" />
      </svg>
      <svg ref={svgRef} aria-hidden="true" className={`${cls} z-10`} style={{ height: 79 }} viewBox="0 0 378 79" preserveAspectRatio="none">
        <defs>
          <pattern id={patternId} width="24" height="72" patternUnits="userSpaceOnUse" patternTransform={hatchTransform}>
            <path d={FOLD.DIAMOND} fill="none" stroke={FOLD.HATCH} strokeWidth="0.5" />
          </pattern>
        </defs>
        <path d={SM_FOLD_FLAP} fill={PAPER} />
        <path d={SM_FOLD_FLAP} fill={`url(#${patternId})`} />
        <path d={SM_FOLD_FLAP} fill="none" stroke={FOLD.INK} strokeWidth="0.8" vectorEffect="non-scaling-stroke" />
      </svg>
      <svg aria-hidden="true" className="pointer-events-none absolute z-10 size-3 md:hidden" style={{ right: 18, bottom: 40 }} viewBox="0 0 12 12">
        <circle cx="6" cy="6" r="5.4" fill={PAPER} stroke={FOLD.INK} strokeWidth="0.8" />
      </svg>
    </>
  )
}

export default function PanelHoles({ variant, bgClassName }) {
  const wrapperRef = useRef(null)
  const layerRef = useRef(null)
  const folded = variant === 'footer'
  const initialVars = useMemo(() => holeVars(variant), [variant])

  // Main sheet: re-space slot pairs to the sheet height and drop the small (mobile)
  // holes into the gaps between the sheet's sections.
  useLayoutEffect(() => {
    if (variant !== 'panel') return
    const wrapper = wrapperRef.current
    const layer = layerRef.current
    const sheet = wrapper?.parentElement
    if (!wrapper || !layer || !sheet) return

    const ro = new ResizeObserver(([entry]) => {
      const height = entry.borderBoxSize?.[0]?.blockSize ?? entry.contentRect.height
      wrapper.style.setProperty('--hole-period', `${periodFor(height)}px`)

      const sections = [...sheet.children].filter((el) => el !== wrapper && el instanceof HTMLElement)
      const gaps = []
      for (let i = 1; i < sections.length; i++) {
        const prev = sections[i - 1]
        const next = sections[i]
        gaps.push(Math.round((prev.offsetTop + prev.offsetHeight + next.offsetTop) / 2) - 1)
      }
      for (const [name, value] of Object.entries(mobileHoleVars('panel', gaps))) {
        wrapper.style.setProperty(name, value)
      }
    })
    ro.observe(layer)
    return () => ro.disconnect()
  }, [variant])

  const inset = folded ? 1 : 0
  const fold = folded ? 'holes-fold-clip' : ''

  return (
    <div ref={wrapperRef} aria-hidden="true" className={`contents ${folded ? 'holes-bp-md' : 'holes-bp-lg'}`} style={initialVars}>
      {folded && (
        <div className={`pointer-events-none absolute inset-0 -z-10 border max-md:home-outline md:border-stone-800 ${fold}`} />
      )}
      <div
        ref={layerRef}
        className={`holes-layer pointer-events-none absolute -z-10 ${folded ? 'inset-px' : 'inset-0'} ${fold} ${bgClassName}`}
      />
      {folded && <DesktopFold />}
      {folded && <MobileFold />}
      <div className="holes-tabs-desktop pointer-events-none absolute" style={{ top: inset, bottom: inset, width: 47, left: -30 + inset }} />
      <div className="holes-tabs-desktop pointer-events-none absolute" style={{ top: inset, bottom: inset, width: 47, right: -30 + inset }} />
      <div className="holes-tabs-mobile pointer-events-none absolute" style={{ top: inset, bottom: inset, width: 30, left: -16 + inset }} />
      <div className="holes-tabs-mobile pointer-events-none absolute" style={{ top: inset, bottom: inset, width: 30, right: -16 + inset }} />
    </div>
  )
}
