// Local stand-in for the original `submitSignUp` server action (CLONE_SPEC_PAGES §3.6).
// No network request is made. Swap this function for a real endpoint later; keep the contract:
//   submitSignUp({ submissionId, answers }) → { status: 'accepted', bookingUrl? }
//                                           | { status: 'invalid', errors: { [field]: message } }
//                                           | anything else (treated as an error)
// Testing: add ?simulateError=1 to the URL to get the error state.

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export async function submitSignUp(payload) {
  if (import.meta.env.DEV) console.log('[sign-up stub] submitSignUp', payload)
  await delay(1200)
  if (new URLSearchParams(window.location.search).get('simulateError') === '1') return { status: 'error' }
  // Mirror the server-side schema checks the client can't express natively (§3.5).
  const { answers } = payload
  const errors = {}
  if (!answers.name || answers.name.length > 200) errors.name = 'Enter your name'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(answers.email) || answers.email.length > 254) errors.email = 'Enter a valid email'
  if (Object.keys(errors).length) return { status: 'invalid', errors }
  return { status: 'accepted' }
}
