/*
 * Minimal client router (history.pushState / popstate) — CLONE_SPEC_PAGES "Routes found".
 *
 *   /          → the homepage tree (<App/>), unchanged
 *   /privacy   → legal template
 *   /terms     → legal template
 *   /sign-up   → standalone sign-up page on direct load; a modal over the mounted homepage when
 *                opened by clicking a /sign-up link on "/" (Next.js intercepted route, §3.9)
 *   *          → stock Next.js 404
 *
 * Same-origin <a href> clicks are intercepted at the document, so the existing homepage links
 * (nav "Try it out", hero/footer "Get started", manifesto "Talk to us", footer Privacy/Terms) need no edits.
 */
import { useEffect, useLayoutEffect } from 'react'
import { isModalSession, useLocation } from './lib/navigation.js'
import App from './App.jsx'
import Privacy from './pages/Privacy.jsx'
import Terms from './pages/Terms.jsx'
import SignUp from './pages/SignUp.jsx'
import NotFound from './pages/NotFound.jsx'
import SignUpModal from './components/signup/SignUpModal.jsx'

/* ───────── <head> per route ───────── */

const HOME_TITLE = document.title
const HOME_DESCRIPTION = document.querySelector('meta[name="description"]')?.getAttribute('content') ?? ''

const HEAD = {
  home: { title: HOME_TITLE, description: HOME_DESCRIPTION, robots: null },
  privacy: {
    title: 'Privacy Policy — Operate',
    description:
      'How Operate collects, uses, and shares information, including data from connected Google services under the Google API Services User Data Policy.',
    robots: 'index, follow',
  },
  terms: {
    title: 'Terms of Service — Operate',
    description: 'The terms that govern your access to and use of Operate’s website, waitlist, and CRM application.',
    robots: 'index, follow',
  },
  signup: {
    title: 'Sign up — Operate',
    description: 'Join the Operate waitlist. Tell us a bit about you and your sales team.',
    robots: 'index, follow',
  },
  notfound: { title: '404: This page could not be found.', description: HOME_DESCRIPTION, robots: 'noindex' },
}

function setMeta(name, content) {
  let el = document.querySelector(`meta[name="${name}"]`)
  if (content == null) {
    el?.remove()
    return
  }
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('name', name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function useHead(route) {
  useLayoutEffect(() => {
    const head = HEAD[route]
    document.title = head.title
    setMeta('description', head.description)
    setMeta('robots', head.robots)
  }, [route])
}

/* ───────── ThemeColorOnScroll (root layout, every route) ───────── */
// theme-color #85C093 → #E0E0E0 once scrollY > 100svh; back on scroll up; initial value restored on unmount.

function measureLength(value) {
  const probe = document.createElement('div')
  probe.style.cssText = `position:absolute;visibility:hidden;pointer-events:none;height:${value}`
  document.body.appendChild(probe)
  const h = probe.getBoundingClientRect().height
  probe.remove()
  return h > 0 ? h : Math.min(window.innerHeight, document.documentElement.clientHeight)
}

function useThemeColorOnScroll({ scrolledColor = '#E0E0E0', threshold = '100svh' } = {}) {
  useEffect(() => {
    const meta = document.querySelector('meta[name="theme-color"]')
    if (!meta) return
    const initial = meta.getAttribute('content') ?? '#85C093'
    let current = initial
    let limit = 0
    const set = (color) => {
      if (color === current) return
      meta.setAttribute('content', color)
      current = color
    }
    const update = () => set(window.scrollY > limit ? scrolledColor : initial)
    const remeasure = () => {
      limit = measureLength(threshold)
      update()
    }
    remeasure()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', remeasure)
    window.visualViewport?.addEventListener('resize', remeasure)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', remeasure)
      window.visualViewport?.removeEventListener('resize', remeasure)
      meta.setAttribute('content', initial)
    }
  }, [scrolledColor, threshold])
}

/* ───────── scroll on navigation ───────── */
// push → top (like a Next.js <Link>); pop → the position saved when we left that entry.
// The sign-up modal handles its own pin/restore (§3.9), so modal transitions are skipped here.

let lastPath = null
let lastModal = false

function useNavigationScroll(loc, modal) {
  useLayoutEffect(() => {
    const changed = loc.path !== lastPath
    const leavingModal = lastModal && !modal
    lastPath = loc.path
    lastModal = modal
    if (!changed || modal || leavingModal || loc.nav === 'init') return
    if (loc.nav === 'pop') {
      const y = loc.state?.__scrollY
      if (typeof y === 'number') window.scrollTo({ top: y, behavior: 'instant' })
      return
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [loc, modal])
}

/* ───────── routes ───────── */

function matchRoute(path) {
  switch (path) {
    case '/':
      return 'home'
    case '/privacy':
      return 'privacy'
    case '/terms':
      return 'terms'
    case '/sign-up':
      return 'signup'
    default:
      return 'notfound'
  }
}

export default function Router() {
  const loc = useLocation()
  const route = matchRoute(loc.path)
  const modal = route === 'signup' && Boolean(loc.state?.signUpModal) && isModalSession()

  // An intercepted /sign-up (modal over "/") keeps the homepage <head>, as Next.js does.
  useHead(modal ? 'home' : route)
  useThemeColorOnScroll()
  useNavigationScroll(loc, modal)

  if (route === 'home' || modal) {
    // Same element shape for "/" and the modal so the homepage stays mounted underneath.
    return (
      <>
        <App />
        {modal ? <SignUpModal /> : null}
      </>
    )
  }
  if (route === 'privacy') return <Privacy />
  if (route === 'terms') return <Terms />
  if (route === 'signup') return <SignUp />
  return <NotFound />
}
