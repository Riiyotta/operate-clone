import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal, flushSync } from 'react-dom'
import { closeVideoLightbox, getState, preloadVideoPlayer, useVideoLightbox } from '../lib/videoLightbox.js'

// CLONE_SPEC §9 — video lightbox.
// • Footer card: View Transitions morph (card frame ↔ media box, crossfade both), 300ms.
// • Hero button ("instant opener" on the original): opens and closes instantly — no fade,
//   backdrop transition 0ms — and the 250ms outline reveal starts right away.
// • Footer card whose frame is off-screen at close: instant close too (as the original).
// • No View Transitions support: 300ms ease-out-quint fade for the footer card; reduced motion: none.
const STREAM = 'https://stream.mux.com/ZJ2kA019R02spnwybJHpUcXw02wND01GeCnbtplh3rHCXcg.m3u8'
const POSTER = '/assets/video-poster.webp'
const DURATION = 300
const MORPH_NAME = 'lightbox-morph'
const VT_START_DELAY = 15 // ms; see the footer-morph effect

const canMorph = () =>
  typeof document !== 'undefined' &&
  typeof document.startViewTransition === 'function' &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches

const inViewport = (el) => {
  if (!el?.isConnected) return false
  const r = el.getBoundingClientRect()
  return r.bottom > 0 && r.top < window.innerHeight && r.right > 0 && r.left < window.innerWidth
}

// Attach the HLS stream (hls.js; native HLS only without MSE).
function useHlsSource(videoRef, active) {
  useEffect(() => {
    const video = videoRef.current
    if (!active || !video) return
    let hls = null
    let cancelled = false
    // Prefer MSE playback via hls.js (as mux-player does); native HLS only where MSE is missing
    // (iOS). Chromium may answer "maybe" for application/vnd.apple.mpegurl yet fail to load it.
    const nativeHls = () => {
      if (!cancelled && video.canPlayType('application/vnd.apple.mpegurl')) video.src = STREAM
    }
    preloadVideoPlayer().then((mod) => {
      const Hls = mod?.default
      if (cancelled) return
      if (!Hls?.isSupported()) return nativeHls()
      hls = new Hls({ capLevelToPlayerSize: false })
      // min-resolution="720p": start on the lowest rendition that is at least 720p tall.
      hls.on(Hls.Events.MANIFEST_PARSED, (_e, data) => {
        const idx = data.levels.findIndex((l) => l.height >= 720)
        if (idx >= 0) hls.startLevel = idx
      })
      hls.loadSource(STREAM)
      hls.attachMedia(video)
    })
    return () => {
      cancelled = true
      hls?.destroy()
      video.removeAttribute('src')
      video.load()
    }
  }, [videoRef, active])
}

function CloseGlyph() {
  return (
    <svg aria-hidden="true" viewBox="0 0 10 10" fill="currentColor" className="size-2.5">
      <path d="M1.5 10 0 8.5 3.5 5 0 1.5 1.5 0 5 3.5 8.5 0 10 1.5 6.5 5 10 8.5 8.5 10 5 6.5 1.5 10Z" />
    </svg>
  )
}

export default function VideoLightbox() {
  const { open } = useVideoLightbox()
  const [mounted, setMounted] = useState(false)
  const [shown, setShown] = useState(false) // drives the opacity fade
  const [instant, setInstant] = useState(false) // true while a view transition owns the animation
  const [revealed, setRevealed] = useState(false) // media outline turns #117025
  const [posterHidden, setPosterHidden] = useState(false)
  // Native controls only once playback has actually started (the original's mux-player shows
  // just the poster — no control bar, no centre button — until it plays).
  const [hasPlayed, setHasPlayed] = useState(false)
  const [pendingOpen, setPendingOpen] = useState(false)
  const [morphPending, setMorphPending] = useState(false) // footer morph: mounted at 0, VT not yet swapped in

  const dialogRef = useRef(null)
  const mediaRef = useRef(null)
  const videoRef = useRef(null)
  const closeRef = useRef(null)
  const timerRef = useRef(0)

  useHlsSource(videoRef, mounted)

  // Autoplay request; if the stream isn't attached yet (play aborted by the HLS load), retry on
  // canplay. If autoplay is refused, keep the poster; a click on the media starts playback.
  const wantPlay = useRef(false)
  const play = useCallback(() => {
    const video = videoRef.current
    if (!video) return
    wantPlay.current = true
    video
      .play()
      ?.then(() => (wantPlay.current = false))
      .catch((err) => {
        if (err?.name !== 'AbortError') wantPlay.current = false
      })
  }, [])

  const afterOpen = useCallback(() => {
    setInstant(false)
    // Flush the transparent outline so the 250ms outline-color reveal actually transitions.
    if (mediaRef.current) getComputedStyle(mediaRef.current).outlineColor
    setRevealed(true)
    // Original (ramka) focuses the dialog container itself (tabindex=-1, outline-none), not Close.
    dialogRef.current?.focus({ preventScroll: true })
    play()
  }, [play])

  // Open / close sequencing.
  useLayoutEffect(() => {
    clearTimeout(timerRef.current)
    const { morph, morphEl, trigger } = getState()

    if (open) {
      if (morph && morphEl && canMorph()) {
        // As the original: the dialog mounts at opacity 0 synchronously on click (so the frame
        // the old snapshot is taken from has it in the DOM but invisible); the view transition
        // is started from the effect below once that commit has landed.
        setInstant(true)
        setShown(false)
        setMounted(true)
        setMorphPending(true)
      } else if (!morph || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        // instant open; completion runs once the dialog is committed
        setInstant(true)
        setMounted(true)
        setShown(true)
        setPendingOpen(true)
      } else {
        setInstant(false)
        setMounted(true)
        // let the 0-opacity frame paint, then fade in
        requestAnimationFrame(() => requestAnimationFrame(() => setShown(true)))
        timerRef.current = setTimeout(afterOpen, DURATION)
      }
      return
    }

    if (!mounted) return
    const video = videoRef.current
    if (video) {
      video.pause()
      video.currentTime = 0
    }
    wantPlay.current = false
    setPendingOpen(false)
    setMorphPending(false)
    setPosterHidden(false)
    setHasPlayed(false)
    setRevealed(false)
    const restoreFocus = () => trigger?.isConnected && trigger.focus({ preventScroll: true })

    if (morph && morphEl && canMorph() && inViewport(morphEl)) {
      if (mediaRef.current) mediaRef.current.style.viewTransitionName = MORPH_NAME
      const vt = document.startViewTransition(() => {
        flushSync(() => {
          setInstant(true)
          setShown(false)
          setMounted(false)
        })
        morphEl.style.viewTransitionName = MORPH_NAME
      })
      vt.finished.finally(() => {
        morphEl.style.viewTransitionName = ''
        setInstant(false)
        restoreFocus()
      })
    } else if (!morph || canMorph() || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // instant close: hero opener, or footer card scrolled out of view
      setInstant(true)
      setShown(false)
      setMounted(false)
      requestAnimationFrame(restoreFocus)
    } else {
      setShown(false)
      timerRef.current = setTimeout(() => {
        setMounted(false)
        restoreFocus()
      }, DURATION)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  // Footer morph: the original's click handler blocks ~15ms rendering the player before it calls
  // startViewTransition, so its old snapshot is taken on the first frame >=15ms after the click
  // (with the opacity-0 dialog already in the DOM). Starting the transition after the same 15ms
  // keeps the morph and the 250ms outline reveal on the original's clock. The update callback
  // flips the dialog to opacity 1 and hands the morph name from the card frame to the media box.
  useLayoutEffect(() => {
    if (!morphPending) return
    const timer = setTimeout(() => {
      const { morphEl, open: isOpen } = getState()
      if (!morphEl || !isOpen) return setMorphPending(false)
      morphEl.style.viewTransitionName = MORPH_NAME
      const vt = document.startViewTransition(() => {
        morphEl.style.viewTransitionName = ''
        if (!getState().open) return
        flushSync(() => {
          setShown(true)
          setMorphPending(false)
        })
        if (mediaRef.current) mediaRef.current.style.viewTransitionName = MORPH_NAME
      })
      vt.finished.finally(() => {
        if (mediaRef.current) mediaRef.current.style.viewTransitionName = ''
        if (getState().open) afterOpen()
      })
    }, VT_START_DELAY)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [morphPending])

  // Scroll lock, Escape, focus trap (held off while the footer morph's opacity-0 dialog waits
  // for the old snapshot, so the lock never shows up in it).
  const locked = mounted && !morphPending
  useEffect(() => {
    if (!locked) return
    const html = document.documentElement
    const prevOverflow = html.style.overflow
    html.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        closeVideoLightbox()
      } else if (e.key === 'Tab' && dialogRef.current) {
        const items = [...dialogRef.current.querySelectorAll('button, video[controls]')]
        if (!items.length) return
        const first = items[0]
        const last = items[items.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      html.style.overflow = prevOverflow
      document.removeEventListener('keydown', onKey)
    }
  }, [locked])

  useEffect(() => {
    if (!pendingOpen || !mounted) return
    setPendingOpen(false)
    afterOpen()
  }, [pendingOpen, mounted, afterOpen])

  useEffect(() => () => clearTimeout(timerRef.current), [])

  if (!mounted) return null

  const fade = instant
    ? 'transition-none'
    : 'transition-opacity duration-300 ease-out-quint motion-reduce:transition-none'

  return createPortal(
    <>
      <div aria-hidden="true" className={`fixed inset-0 z-50 bg-black/70 lg:bg-black/50 ${fade} ${shown ? 'opacity-100' : 'opacity-0'}`} />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Watch the video"
        tabIndex={-1}
        className={`fixed inset-0 z-50 grid select-none place-items-center overflow-hidden overscroll-contain py-[calc(0.75rem+2.75rem)] outline-none [scrollbar-gutter:stable] ${fade} ${
          shown ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={(e) => {
          if (!mediaRef.current?.contains(e.target)) closeVideoLightbox()
        }}
      >
        <button
          ref={closeRef}
          type="button"
          aria-label="Close"
          className="fixed right-[calc(0.75rem+env(safe-area-inset-right))] top-[calc(0.75rem+env(safe-area-inset-top))] flex size-11 items-center justify-center text-waitlist-gray"
          onClick={closeVideoLightbox}
        >
          <CloseGlyph />
        </button>
        <div className="lightbox-media-box aspect-video">
          <div
            ref={mediaRef}
            onClick={() => {
              const video = videoRef.current
              if (video && !hasPlayed && video.paused) play()
            }}
            className={`grid size-full overflow-hidden bg-video-card outline outline-1 ${
              revealed
                ? 'outline-waitlist-dark-green transition-[outline-color] duration-[250ms] ease-out-quint motion-reduce:transition-none'
                : 'outline-transparent'
            }`}
          >
            <video
              ref={videoRef}
              className="col-start-1 row-start-1 size-full bg-video-card [accent-color:#117025]"
              controls={hasPlayed}
              playsInline
              preload="metadata"
              poster={POSTER}
              title="Operate CRM Demo"
              onCanPlay={() => wantPlay.current && play()}
              onPlaying={() => {
                setPosterHidden(true)
                setHasPlayed(true)
              }}
            />
            <img
              alt=""
              src={POSTER}
              width="1920"
              height="1080"
              decoding="sync"
              className={`pointer-events-none relative col-start-1 row-start-1 size-full object-cover ${posterHidden ? 'invisible' : ''}`}
            />
          </div>
        </div>
      </div>
    </>,
    document.body,
  )
}
