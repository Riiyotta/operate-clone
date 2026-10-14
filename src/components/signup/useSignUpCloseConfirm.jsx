/*
 * Leaving the sign-up form — CLONE_SPEC_PAGES §3.8.
 * A history guard entry ({ signUpCloseGuard: true }) catches the browser back button. Depending on the
 * form's dismissal mode, leave requests open the "Leave this form?" alertdialog (confirm), are ignored
 * (blocked, while sending) or go through immediately (free, after success).
 */
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { navigate } from '../../lib/navigation.js'
import { useFocusTrap } from './useFocusTrap.js'

const GUARD = 'signUpCloseGuard'
export const SIGN_UP_HOME_HREF = '/'

export const hasGuard = () => Boolean(window.history.state?.[GUARD])
function pushGuard() {
  if (!hasGuard()) window.history.pushState({ ...window.history.state, [GUARD]: true }, '')
}

const DIALOG_BUTTON = [
  'cursor-pointer px-[0.75em] py-[calc(6.5em/18)] rounded-[calc(12em/18)] border-[1.5px] border-waitlist-dark-green',
  'text-[1.125em] leading-[calc(21/18)]',
  'focus-visible:shadow-[0_0_0_2px_#EBEBEB,0_0_0_4px_#117025]',
].join(' ')

function ConfirmDialog({ onKeepEditing, onLeave }) {
  const popupRef = useRef(null)
  useFocusTrap(popupRef, true)

  useEffect(() => {
    const restore = document.activeElement
    popupRef.current?.querySelector('button')?.focus()
    return () => restore?.focus?.({ preventScroll: true })
  }, [])

  const onKeyDown = (e) => {
    if (e.key === 'Escape' && !e.nativeEvent.isComposing) {
      e.stopPropagation()
      onKeepEditing()
    }
  }

  return createPortal(
    <>
      <div
        className="fixed inset-0 z-50 before:absolute before:inset-0 before:bg-black/50 before:content-['']"
        onClick={onKeepEditing}
      />
      <div
        ref={popupRef}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="sign-up-leave-title"
        aria-describedby="sign-up-leave-description"
        tabIndex={-1}
        onKeyDown={onKeyDown}
        className={[
          'op-base fixed z-50 flex flex-col gap-y-[1.25em] outline-none',
          'rounded-[1px] border border-waitlist-dark-green bg-waitlist-paper',
          '[--selection-background:#117025] [--selection-color:#EBEBEB]',
          'font-denim text-[1rem] leading-[1.1875em] text-waitlist-dark-green',
          "[font-feature-settings:'liga'_0,'lnum','pnum']",
          'p-[1.75em]',
          'inset-x-[0.75rem] bottom-[max(0.75rem,env(safe-area-inset-bottom,0px))] mx-auto max-w-[28rem]',
          'md:inset-0 md:m-auto md:h-fit md:max-w-[25rem]',
        ].join(' ')}
      >
        <h2 id="sign-up-leave-title" className="text-pretty text-[1.125em] leading-[calc(21/18)]">
          Leave this form?
        </h2>
        <p id="sign-up-leave-description" className="-mt-[0.875em] text-pretty">
          Anything you've entered won't be saved.
        </p>
        <div className="grid auto-cols-fr grid-flow-col gap-x-[0.5em] md:flex md:justify-end">
          <button type="button" className={DIALOG_BUTTON} onClick={onKeepEditing}>
            Keep editing
          </button>
          <button
            type="button"
            className={`${DIALOG_BUTTON} bg-waitlist-dark-green text-waitlist-paper [--selection-background:#EBEBEB] [--selection-color:#117025]`}
            onClick={onLeave}
          >
            Leave
          </button>
        </div>
      </div>
    </>,
    document.body,
  )
}

export function useSignUpCloseConfirm({ onBack, dismissal = 'confirm' }) {
  const [pending, setPending] = useState(null) // the leave action awaiting confirmation
  const [lockedY, setLockedY] = useState(null)
  const leaving = useRef(false)
  const onBackRef = useRef(onBack)
  onBackRef.current = onBack
  const modeRef = useRef(dismissal)
  modeRef.current = dismissal

  // Keep the page still while the dialog is open.
  useEffect(() => {
    if (lockedY === null) return
    const hold = () => {
      if (window.scrollY !== lockedY) window.scrollTo({ top: lockedY, behavior: 'instant' })
    }
    hold()
    window.addEventListener('scroll', hold)
    return () => window.removeEventListener('scroll', hold)
  }, [lockedY])

  // Browser back: re-arm the guard and ask (or leave straight away when free).
  useEffect(() => {
    pushGuard()
    const onPopState = () => {
      if (hasGuard() || leaving.current) return
      if (modeRef.current === 'free') {
        leaving.current = true
        onBackRef.current()
        return
      }
      pushGuard()
      if (modeRef.current !== 'blocked') {
        setLockedY(window.scrollY)
        setPending(() => () => onBackRef.current())
      }
    }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const close = () => {
    setPending(null)
    setLockedY(null)
  }

  return {
    confirming: pending !== null,
    confirmClose(action) {
      if (modeRef.current === 'blocked') return
      if (modeRef.current === 'free') {
        leaving.current = true
        action()
        return
      }
      setLockedY(window.scrollY)
      setPending(() => action)
    },
    back() {
      leaving.current = true
      window.history.go(hasGuard() ? -2 : -1)
    },
    home() {
      leaving.current = true
      navigate(SIGN_UP_HOME_HREF, { replace: hasGuard() })
    },
    confirmDialog: pending ? (
      <ConfirmDialog
        onKeepEditing={close}
        onLeave={() => {
          leaving.current = true
          const action = pending
          close()
          action()
        }}
      />
    ) : null,
  }
}
