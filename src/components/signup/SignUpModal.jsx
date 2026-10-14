/*
 * /sign-up opened from the homepage — CLONE_SPEC_PAGES §3.9 (Next.js intercepted route).
 * The homepage stays mounted: its page column ([data-sign-up-page]) is pinned at its current offset and
 * hidden, the window jumps to the top, and only HomeBackground shows behind the form. Instant, no animation.
 * Closing goes back in history to "/" and restores the previous scroll position.
 */
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import SignUpForm from './SignUpForm.jsx'
import { SIGN_UP_WRAPPER } from './layout.js'
import { useFocusTrap } from './useFocusTrap.js'
import { useSignUpCloseConfirm } from './useSignUpCloseConfirm.jsx'

function Popup({ confirm, close, setDismissal }) {
  const popupRef = useRef(null)
  useFocusTrap(popupRef, !confirm.confirming)

  // pin + hide the homepage column, jump to top; undo on close
  useLayoutEffect(() => {
    const page = document.querySelector('[data-sign-up-page]')
    if (!page) return
    const scrollY = window.scrollY
    page.style.setProperty('--sign-up-page-top', `${page.getBoundingClientRect().top}px`)
    page.dataset.signUpPinned = ''
    window.scrollTo({ top: 0, behavior: 'instant' })
    return () => {
      delete page.dataset.signUpPinned
      window.scrollTo({ top: scrollY, behavior: 'instant' })
    }
  }, [])

  // focus the popup, then (desktop pointers only) the first input 25ms later
  useEffect(() => {
    const popup = popupRef.current
    popup?.focus({ preventScroll: true })
    if (window.matchMedia('(pointer: coarse)').matches) return
    const timer = window.setTimeout(() => {
      if (document.activeElement === popup) popup.querySelector('input')?.focus()
    }, 25)
    return () => window.clearTimeout(timer)
  }, [])

  // Escape → leave request (the confirm dialog handles its own Escape)
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape' && !e.isComposing && !confirm.confirming) confirm.confirmClose(close)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  })

  const outside = (e) => {
    if (e.target === e.currentTarget && !confirm.confirming) confirm.confirmClose(close)
  }

  return createPortal(
    <>
      {/* Backdrop: transparent, only catches outside presses */}
      <div className="fixed inset-0 z-50" onClick={outside} />
      {/* Viewport */}
      <div className={`op-base absolute inset-x-0 top-0 z-50 ${SIGN_UP_WRAPPER}`} onClick={outside}>
        <div
          ref={popupRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="sign-up-title"
          tabIndex={-1}
          data-sign-up-dialog=""
          data-open=""
          className="mx-auto max-w-[792px] outline-none"
        >
          <SignUpForm onBack={() => confirm.confirmClose(close)} onSubmitted={close} onDismissalChange={setDismissal} />
          {confirm.confirmDialog}
        </div>
      </div>
    </>,
    document.body,
  )
}

export default function SignUpModal() {
  const [open, setOpen] = useState(true)
  const [dismissal, setDismissal] = useState('confirm')
  const close = useCallback(() => setOpen(false), [])
  const confirm = useSignUpCloseConfirm({ onBack: close, dismissal })

  // closed → leave the intercepted route (Leave / Close / free dismissal)
  const backRef = useRef(confirm.back)
  backRef.current = confirm.back
  useEffect(() => {
    if (!open) backRef.current()
  }, [open])

  return open ? <Popup confirm={confirm} close={close} setDismissal={setDismissal} /> : null
}
