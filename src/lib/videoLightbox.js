// Tiny external store for the video lightbox (CLONE_SPEC §9).
// Triggers call openVideoLightbox(); <VideoLightbox> renders it; <HomeBackground>
// pauses its canvas while it is open.
import { useSyncExternalStore } from 'react'

let state = { open: false, trigger: null, morphEl: null, morph: false }
const listeners = new Set()

function set(next) {
  state = { ...state, ...next }
  listeners.forEach((fn) => fn())
}

export function subscribe(fn) {
  listeners.add(fn)
  return () => listeners.delete(fn)
}

export const getState = () => state

export function useVideoLightbox() {
  return useSyncExternalStore(subscribe, getState, getState)
}

// trigger: the clicked element (focus returns here on close)
// morphEl: element that morphs into the player via a view transition (footer card only;
//          the hero button opens without a morph, matching the original)
export function openVideoLightbox({ trigger, morphEl = null }) {
  if (state.open) return
  set({ open: true, trigger, morphEl, morph: Boolean(morphEl) })
}

export function closeVideoLightbox() {
  if (!state.open) return
  set({ open: false })
}

// Warm the player code on pointerenter / pointerdown / focus of a trigger.
let preloadPromise = null
export function preloadVideoPlayer() {
  if (!preloadPromise) preloadPromise = import('hls.js').catch(() => (preloadPromise = null))
  return preloadPromise
}
