// Location store + navigate() + same-origin link interception for the client router (src/router.jsx).
import { useSyncExternalStore } from 'react'

export const normalize = (pathname) => (pathname.length > 1 ? pathname.replace(/\/+$/, '') || '/' : pathname)

let snapshot = read('init')
const listeners = new Set()

function read(nav) {
  return { path: normalize(window.location.pathname), search: window.location.search, state: window.history.state, nav }
}

function emit(nav) {
  snapshot = read(nav)
  listeners.forEach((fn) => fn())
}

function subscribe(fn) {
  listeners.add(fn)
  return () => listeners.delete(fn)
}

window.addEventListener('popstate', () => emit('pop'))

export function useLocation() {
  return useSyncExternalStore(subscribe, () => snapshot)
}

// True once a /sign-up modal was opened in this document. History state survives reloads, but a
// reload of /sign-up must render the standalone page (as Next.js does), so the flag lives in memory.
let modalSession = false

export const isModalSession = () => modalSession

export function navigate(to, { replace = false, state = null } = {}) {
  const url = new URL(to, window.location.href)
  // remember where we were so popstate can restore it
  window.history.replaceState({ ...window.history.state, __scrollY: window.scrollY }, '')
  const next = state ? { ...state } : {}
  if (next.signUpModal) modalSession = true
  const href = url.pathname + url.search + url.hash
  if (replace) window.history.replaceState(next, '', href)
  else window.history.pushState(next, '', href)
  emit(replace ? 'replace' : 'push')
}

document.addEventListener('click', (e) => {
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
  const a = e.target instanceof Element ? e.target.closest('a[href]') : null
  if (!a || (a.target && a.target !== '_self') || a.hasAttribute('download')) return
  const url = new URL(a.href, window.location.href)
  if (url.origin !== window.location.origin) return
  // in-page anchors (e.g. /privacy's "#7-cookies-…") keep the browser's default hash behaviour
  if (url.hash && normalize(url.pathname) === normalize(window.location.pathname)) return
  e.preventDefault()
  const fromHome = normalize(window.location.pathname) === '/'
  const toSignUp = normalize(url.pathname) === '/sign-up'
  navigate(url.pathname + url.search + url.hash, { state: fromHome && toSignUp ? { signUpModal: true } : null })
})

