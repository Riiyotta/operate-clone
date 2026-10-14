import { useEffect } from 'react'

const TABBABLE = 'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

// Keep Tab / Shift+Tab inside `ref` while active (dialogs, §3.8–3.9).
export function useFocusTrap(ref, active) {
  useEffect(() => {
    if (!active) return
    const onKeyDown = (e) => {
      const root = ref.current
      if (e.key !== 'Tab' || !root) return
      const items = Array.from(root.querySelectorAll(TABBABLE)).filter((el) => !el.closest('[inert]') && el.getClientRects().length)
      if (!items.length) return e.preventDefault()
      const first = items[0]
      const last = items[items.length - 1]
      const current = document.activeElement
      if (!root.contains(current)) {
        e.preventDefault()
        ;(e.shiftKey ? last : first).focus()
      } else if (e.shiftKey && (current === first || current === root)) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && current === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown, true)
    return () => document.removeEventListener('keydown', onKeyDown, true)
  }, [ref, active])
}
