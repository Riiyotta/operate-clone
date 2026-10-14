import { useRef, useSyncExternalStore } from 'react'
import { MotionConfig, useInView } from 'motion/react'
import { DemoProvider } from './demo/engine.jsx'
import { DESKTOP_SCRIPT, TOUCH_SCRIPT } from './demo/scripts.js'
import DesktopDemo from './demo/Desktop.jsx'
import TouchDemo from './demo/Touch.jsx'
import './demo/demo.css'

/*
 * Hero product demo (CLONE_SPEC.md §5).
 * Rendered by the shell inside <DemoFrame>'s app window (section, frame, outline/caps and app window
 * are the shell's). Everything here that is absolutely positioned — in-view sentinel, floating panel,
 * cursor layer, chapter control — resolves against the frame, as in the original DOM.
 */

const MD = '(min-width: 48rem)'
const subscribe = (cb) => {
  const mq = window.matchMedia(MD)
  mq.addEventListener('change', cb)
  return () => mq.removeEventListener('change', cb)
}
const useIsMd = () => useSyncExternalStore(subscribe, () => window.matchMedia(MD).matches, () => true)

export default function HomeUi() {
  const sentinel = useRef(null)
  // Sentinel: 1px line at the frame bottom (md+) / frame middle (mobile).
  // Starts once it is inside the viewport inset by 30% at the top and 48px at the bottom.
  const inView = useInView(sentinel, { once: true, margin: '-30% 0px -48px 0px' })
  const isMd = useIsMd()

  return (
    <MotionConfig reducedMotion="user">
      <div ref={sentinel} aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-1/2 h-px md:bottom-0 md:top-auto" />
      {isMd ? (
        <DemoProvider key="desktop" script={DESKTOP_SCRIPT} active={inView}>
          <DesktopDemo />
        </DemoProvider>
      ) : (
        <DemoProvider key="touch" script={TOUCH_SCRIPT} active={inView}>
          <TouchDemo />
        </DemoProvider>
      )}
    </MotionConfig>
  )
}
