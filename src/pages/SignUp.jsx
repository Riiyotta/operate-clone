// Standalone /sign-up page (direct load) — CLONE_SPEC_PAGES §3.1–3.8.
import { useEffect, useRef, useState } from 'react'
import HomeBackground from '../components/HomeBackground.jsx'
import SignUpForm from '../components/signup/SignUpForm.jsx'
import { SIGN_UP_WRAPPER } from '../components/signup/layout.js'
import { hasGuard, useSignUpCloseConfirm } from '../components/signup/useSignUpCloseConfirm.jsx'

// The original checks navigation.canGoBack, which is always true once the guard entry exists (and
// history.go(-2) then does nothing on a fresh tab). Require a real entry before the guarded page.
function canGoBack() {
  const index = window.navigation?.currentEntry?.index
  return typeof index === 'number' && index >= (hasGuard() ? 2 : 1)
}

export default function SignUp() {
  const outsidePress = useRef(false)
  const formRef = useRef(null)
  const [closing, setClosing] = useState(false)
  const [dismissal, setDismissal] = useState('confirm')

  const confirm = useSignUpCloseConfirm({
    dismissal,
    onBack: () => {
      if (canGoBack()) {
        setClosing(true)
        confirm.back()
      } else goHome()
    },
  })

  const goHome = () => {
    setClosing(true)
    confirm.home()
  }
  const requestClose = () => {
    if (!closing) confirm.confirmClose(goHome)
  }

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape' && !e.isComposing && !confirm.confirming) requestClose()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  })

  const isOutside = (e) => e.target instanceof Node && e.currentTarget.contains(e.target) && !formRef.current?.contains(e.target)

  return (
    <main
      className="op-base relative min-h-svh overflow-hidden bg-waitlist-deep-green [font-feature-settings:'liga'_off]"
      onPointerDown={(e) => {
        outsidePress.current = isOutside(e)
      }}
      onClick={(e) => {
        if (outsidePress.current && isOutside(e)) requestClose()
      }}
    >
      <HomeBackground />
      <div inert={closing ? '' : undefined} className={`relative ${SIGN_UP_WRAPPER}`}>
        <SignUpForm
          formRef={formRef}
          className="mx-auto"
          onBack={requestClose}
          onSubmitted={goHome}
          onDismissalChange={setDismissal}
        />
      </div>
      {confirm.confirmDialog}
    </main>
  )
}
