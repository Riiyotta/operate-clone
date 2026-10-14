/*
 * Sign-up (waitlist) form — CLONE_SPEC_PAGES §3.3–3.7.
 *
 * Spacing: the original redefines Tailwind's spacing unit to 0.25em inside the form, so every
 * spacing value here is written as an em arbitrary value (N × 0.25em). Base font 17px <md, 16px md+.
 * Validation: nothing until the first submit; afterwards every change revalidates (Base UI onSubmit mode).
 */
import { useEffect, useId, useRef, useState } from 'react'
import { submitSignUp } from '../../lib/signupStub.js'
import SendingAnimation from './SendingAnimation.jsx'

/* ───────── options (verbatim) ───────── */
const ROLE_OPTIONS = ['Founder / CEO', 'Sales leader (VP, Head of Sales)', 'Account executive', 'SDR / BDR', 'RevOps / Sales ops', 'Other']
const TEAM_SIZE_OPTIONS = ['0-1', '2–4', '5–50', '51–250', '251+']
const DEAL_OPTIONS = [
  'Keeping up with follow-ups',
  'Finding context across tools',
  'Knowing which deals need attention',
  'Stale CRM data',
  'Visibility into my team’s deals',
  'AI that doesn’t know our deals',
  'Something else',
]
const NOT_USING_AI = 'Not using AI yet'
const SOMETHING_ELSE = 'Something else'
const AI_OPTIONS = ['ChatGPT, Claude, or similar', 'AI features in our sales tools', 'Custom agents or workflows', SOMETHING_ELSE, NOT_USING_AI]
const OTHER = 'other'

const TEXT_FIELDS = ['name', 'email', 'socialHandle']
const FIELD_ORDER = ['name', 'email', 'socialHandle', 'role', 'salesTeamSize', 'aiUsage', 'dealChallenge']

// leave-confirmation mode per submit status (§3.8)
const DISMISSAL = { idle: 'confirm', sending: 'blocked', received: 'free', error: 'confirm' }

/* ───────── shared classes ───────── */
const FOCUS_TINT = 'focus-within:bg-waitlist-gray/20'
const BUTTON =
  'cursor-pointer px-[0.75em] py-[calc(6.5em/18)] rounded-[calc(12em/18)] border-[1.5px] border-waitlist-gray text-[1.125em] leading-[calc(21/18)]'
const ERROR = 'su-error ml-auto shrink-0 pr-[0.5em] pl-[0.75em] text-right'
const BARE = 'rounded-none bg-transparent shadow-none outline-none'
const CONTROL_FOCUS = 'outline-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-waitlist-gray'
const OPTION_LABEL = 'flex items-start gap-x-[0.875em] pl-[0.5em] text-pretty'
const LEGEND_ROW = 'su-cq flex min-h-[1.75em] flex-wrap items-center justify-between py-[0.25em] border-b border-waitlist-gray'
const OPTIONS_BOX = `flex flex-col gap-y-[0.375em] pt-[0.8125em] pb-[1.25em] ${FOCUS_TINT}`
const OTHER_TEXTAREA = `block [field-sizing:content] w-full min-w-0 resize-none ${BARE} placeholder:text-waitlist-light-green`
const INVALID_SELECTION = '[--selection-color:#B85725]'

/* ───────── keyboard / pointer helpers ───────── */
const ADVANCE_TYPES = new Set(['text', 'email', 'url'])

// Enter never submits from a text field: "next" moves to the next text-like field, otherwise blur.
function onFieldEnter(e) {
  if (e.key !== 'Enter' || e.nativeEvent.isComposing || e.keyCode === 229) return
  e.preventDefault()
  const el = e.currentTarget
  if (el.enterKeyHint !== 'next') return el.blur()
  const elements = Array.from(el.form?.elements ?? [])
  const next = elements
    .slice(elements.indexOf(el) + 1)
    .find((x) => x instanceof HTMLTextAreaElement || (x instanceof HTMLInputElement && ADVANCE_TYPES.has(x.type)))
  next ? next.focus() : el.blur()
}

// Pressing on an option row focuses its radio/checkbox without a visible ring.
function onOptionsMouseDown(e) {
  const target = e.target
  if (!(target instanceof Element) || target.closest('input, textarea')) return
  e.preventDefault()
  target.closest('label')?.querySelector('[role="radio"], [role="checkbox"]')?.focus({ focusVisible: false })
}

function submitFrom(el) {
  const form = el.closest('form')
  form?.querySelector('button[type="submit"]')?.click()
}

/* ───────── pieces ───────── */
function QuestionLabel({ number, label, required, hint }) {
  return (
    <span className="flex items-baseline">
      <span aria-hidden="true" className="w-[2.125em] shrink-0 ps-[0.5em]">
        {number}.
      </span>
      <span className="text-pretty">
        {label}
        {required && <span aria-hidden="true">{'\u00a0*'}</span>}
        {hint}
      </span>
    </span>
  )
}

function TextField({ number, name, label, required, type = 'text', placeholder, enterKeyHint = 'next', value, error, onChange, inputRef, ...attrs }) {
  const id = useId()
  const invalid = Boolean(error)
  return (
    <div
      data-invalid={invalid ? '' : undefined}
      className={`su-cq flex min-h-[1.75em] flex-wrap items-center py-[0.25em] border-b border-waitlist-gray ${
        invalid ? `bg-copper ${INVALID_SELECTION}` : FOCUS_TINT
      }`}
    >
      <label id={`${id}-label`} htmlFor={id} className="mr-[0.5em] min-w-[8em] shrink-0">
        <QuestionLabel number={number} label={label} required={required} />
      </label>
      <input
        ref={inputRef}
        id={id}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        enterKeyHint={enterKeyHint}
        aria-invalid={invalid || undefined}
        value={value}
        onChange={onChange}
        onKeyDown={onFieldEnter}
        className={`min-w-0 flex-1 self-stretch truncate ${BARE} ${
          invalid ? 'placeholder:text-waitlist-gray/70' : 'placeholder:text-waitlist-light-green'
        }`}
        {...attrs}
      />
      {invalid && <div className={ERROR}>{error}</div>}
    </div>
  )
}

function OtherAnswer({ name, ariaLabel, value, onChange, className }) {
  return (
    <div className={className}>
      <textarea
        rows={1}
        name={name}
        aria-label={ariaLabel}
        placeholder="Your answer (optional)"
        enterKeyHint="done"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onFieldEnter}
        className={OTHER_TEXTAREA}
      />
    </div>
  )
}

function RadioGroup({ number, name, label, options, otherLabel, value, onChange, error, other, onOtherChange, groupRef }) {
  const id = useId()
  const invalid = Boolean(error)
  const values = options.map((option) => (option === otherLabel ? OTHER : option))
  const tabbable = value != null ? value : values[0]

  const onKeyDown = (e, index) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      return submitFrom(e.currentTarget)
    }
    if (e.key === ' ') {
      e.preventDefault()
      return onChange(values[index])
    }
    const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key]
    if (!step) return
    e.preventDefault()
    const next = (index + step + values.length) % values.length
    onChange(values[next])
    groupRef.current?.querySelectorAll('[role="radio"]')[next]?.focus()
  }

  return (
    <div data-invalid={invalid ? '' : undefined}>
      <div ref={groupRef} role="radiogroup" aria-required="true" aria-labelledby={`${id}-legend`} className="border-b border-waitlist-gray">
        <div id={`${id}-legend`} className={`${LEGEND_ROW} ${invalid ? `bg-copper ${INVALID_SELECTION}` : ''}`}>
          <QuestionLabel number={number} label={label} required />
          {invalid && <div className={ERROR}>{error}</div>}
        </div>
        <div className={OPTIONS_BOX} onMouseDown={onOptionsMouseDown}>
          {options.map((option, index) => {
            const optionValue = values[index]
            const checked = value === optionValue
            return (
              <div key={option} className="flex flex-col gap-y-[0.375em]">
                <label id={`${id}-${index}`} className={`${OPTION_LABEL} ${checked ? 'font-semibold' : ''}`} onClick={() => onChange(optionValue)}>
                  <span
                    role="radio"
                    aria-checked={checked}
                    aria-required="true"
                    aria-labelledby={`${id}-${index}`}
                    aria-invalid={invalid || undefined}
                    tabIndex={optionValue === tabbable ? 0 : -1}
                    data-checked={checked ? '' : undefined}
                    data-unchecked={checked ? undefined : ''}
                    onKeyDown={(e) => onKeyDown(e, index)}
                    className={`mt-[0.21875em] flex size-[0.75em] shrink-0 items-center justify-center rounded-full border border-waitlist-gray shadow-none ${CONTROL_FOCUS}`}
                  >
                    {checked && <span className="size-[0.4375em] rounded-full bg-waitlist-gray" />}
                  </span>
                  {option}
                </label>
                {option === otherLabel && checked && (
                  <OtherAnswer
                    name={`${name}Other`}
                    ariaLabel={`${label}: ${otherLabel} (optional)`}
                    value={other}
                    onChange={onOtherChange}
                    className="pr-[0.5em] pl-[2.125em]"
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function CheckedGlyph() {
  const mask = useId()
  return (
    <svg aria-hidden="true" viewBox="0 0 12 12" className="size-full">
      <mask id={mask}>
        <rect width="12" height="12" fill="white" />
        <path d="M2.5 6.25 4.85 8.6 9.5 3.4" fill="none" stroke="black" strokeWidth="1.5" strokeLinecap="square" />
      </mask>
      <rect width="12" height="12" rx="2" fill="currentColor" mask={`url(#${mask})`} />
    </svg>
  )
}

function AiUsageGroup({ number, value, onChange, error, other, onOtherChange, groupRef }) {
  const id = useId()
  const invalid = Boolean(error)
  const label = 'How is your sales team using AI today?'

  // "Not using AI yet" is exclusive (§3.4).
  const toggle = (option) => {
    const next = value.includes(option) ? value.filter((v) => v !== option) : [...value, option]
    onChange(next.includes(NOT_USING_AI) && !value.includes(NOT_USING_AI) ? [NOT_USING_AI] : next.filter((v) => v !== NOT_USING_AI))
  }

  return (
    <div data-invalid={invalid ? '' : undefined}>
      <div ref={groupRef} role="group" aria-labelledby={`${id}-legend`} aria-describedby={invalid ? undefined : `${id}-hint`} className="border-b border-waitlist-gray">
        <div id={`${id}-legend`} className={`${LEGEND_ROW} gap-x-[0.5em] ${invalid ? `bg-copper ${INVALID_SELECTION}` : ''}`}>
          <QuestionLabel
            number={number}
            label={label}
            required
            hint={
              !invalid && (
                <span aria-hidden="true" className="su-hint-narrow text-white/60">
                  {' (Select all that apply)'}
                </span>
              )
            }
          />
          {!invalid && (
            <p id={`${id}-hint`} className="su-hint-wide ml-auto pr-[0.5em] text-white/60">
              Select all that apply
            </p>
          )}
          {invalid && <div className={ERROR}>{error}</div>}
        </div>
        <div className={OPTIONS_BOX} onMouseDown={onOptionsMouseDown}>
          {AI_OPTIONS.map((option, index) => {
            const checked = value.includes(option)
            return (
              <div key={option} className="flex flex-col gap-y-[0.375em]">
                <label id={`${id}-${index}`} className={`${OPTION_LABEL} ${checked ? 'font-semibold' : ''}`} onClick={() => toggle(option)}>
                  <span
                    role="checkbox"
                    aria-checked={checked}
                    aria-labelledby={`${id}-${index}`}
                    aria-invalid={invalid || undefined}
                    tabIndex={0}
                    data-checked={checked ? '' : undefined}
                    data-unchecked={checked ? undefined : ''}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        submitFrom(e.currentTarget)
                      } else if (e.key === ' ') {
                        e.preventDefault()
                        toggle(option)
                      }
                    }}
                    className={`relative mt-[0.21875em] flex size-[0.75em] shrink-0 items-center justify-center rounded-[0.125em] border border-waitlist-gray shadow-none ${CONTROL_FOCUS}`}
                  >
                    {checked && (
                      <span className="absolute -inset-px">
                        <CheckedGlyph />
                      </span>
                    )}
                  </span>
                  {option}
                </label>
                {option === SOMETHING_ELSE && checked && (
                  <OtherAnswer
                    name="aiUsageOther"
                    ariaLabel="AI usage: Something else (optional)"
                    value={other}
                    onChange={onOtherChange}
                    className="ps-[2.125em] pe-[0.5em]"
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function BackArrow() {
  return (
    <svg aria-hidden="true" viewBox="0 0 14 12" fill="none" stroke="currentColor" strokeWidth="1.5" overflow="visible" className="size-full">
      <path d="M14 6H0M6.5 12 0 6l6.5-6" />
    </svg>
  )
}

function LogoMark() {
  return (
    <svg className="h-[0.8013em] w-[1.6026em] [&_path]:fill-waitlist-gray" width="32" height="16" fill="none" viewBox="0 0 32 16">
      <path
        fill="#117025"
        d="M28.58.029c-2.37-.295-5.59 1.695-8.004 4.723a.39.39 0 0 1-.688-.179c-.21-1.257-.949-2.104-2.181-2.258-1.89-.235-4.411 1.226-6.42 3.521a.39.39 0 0 1-.675-.188c-.2-1.106-.864-1.849-1.959-1.985-2.31-.287-5.668 2.236-7.499 5.637s-1.441 6.39.87 6.677c1.596.2 3.692-.944 5.439-2.791a.39.39 0 0 1 .67.23c.137 1.423.892 2.393 2.22 2.559 1.87.233 4.358-1.194 6.355-3.448a.39.39 0 0 1 .68.237c.1 1.78.99 3.006 2.61 3.207 2.99.372 7.337-2.895 9.707-7.297S31.571.401 28.58.03"
      />
    </svg>
  )
}

function StatusRow({ status, onDone }) {
  const ref = useRef(null)
  useEffect(() => {
    if (status !== 'idle') ref.current?.focus()
  }, [status])

  const text = { idle: '', sending: 'Submitting…', received: 'Thank you! We’ll be in touch.', error: 'Something went wrong.' }[status]
  return (
    <div ref={ref} tabIndex={-1} className="flex items-center justify-end gap-[0.9375em] pe-[0.5em] pt-[1.375em] outline-none">
      <p role="status" aria-live="polite" className={`min-w-0 flex-1 text-right text-waitlist-feedback ${status === 'sending' ? 'sr-only' : ''}`}>
        {text}
      </p>
      <div className="shrink-0">
        {status === 'idle' && (
          <button type="submit" className={BUTTON}>
            Submit
          </button>
        )}
        {status === 'sending' && (
          <button type="button" disabled data-disabled="" className={`${BUTTON} opacity-50`}>
            Submitting…
          </button>
        )}
        {status === 'received' && (
          <button type="button" className={BUTTON} onClick={onDone}>
            Close
          </button>
        )}
        {status === 'error' && (
          <button type="submit" className={BUTTON}>
            Try again
          </button>
        )}
      </div>
    </div>
  )
}

/* ───────── validation + payload ───────── */
const EMPTY = {
  name: '',
  email: '',
  socialHandle: '',
  role: null,
  roleOther: '',
  salesTeamSize: null,
  aiUsage: [],
  aiUsageOther: '',
  dealChallenge: null,
  dealChallengeOther: '',
}

function textError(input, serverError) {
  if (!input) return null
  const { validity } = input
  if (validity.valueMissing) return 'required'
  if (validity.typeMismatch) return input.type === 'email' ? 'check the email' : 'check the link'
  if (!validity.valid || serverError) return 'check your answer'
  return null
}

// Client-side normalisation, mirroring the original's schema transform (§3.6).
function normalizeAnswers(v) {
  const aiUsageOther = v.aiUsageOther.trim()
  return {
    name: v.name.trim(),
    email: v.email.trim().toLowerCase(),
    role: v.role,
    roleOther: v.role === OTHER ? v.roleOther.trim() : '',
    socialHandle: v.socialHandle.trim(),
    salesTeamSize: v.salesTeamSize,
    dealChallenge: v.dealChallenge,
    dealChallengeOther: v.dealChallenge === OTHER ? v.dealChallengeOther.trim() : '',
    ...(v.aiUsage.includes(SOMETHING_ELSE) && aiUsageOther ? { aiUsageOther } : {}),
    aiUsage: AI_OPTIONS.filter((option) => v.aiUsage.includes(option)),
  }
}

const uuid = () =>
  window.crypto?.randomUUID?.() ??
  'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
  })

/* ───────── form ───────── */
export default function SignUpForm({ formRef, className = '', onBack, closing = false, onSubmitted, onDismissalChange }) {
  const [values, setValues] = useState(EMPTY)
  const [status, setStatus] = useState('idle')
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})
  const [serverErrors, setServerErrors] = useState({})
  const inputs = { name: useRef(null), email: useRef(null), socialHandle: useRef(null) }
  const groups = { role: useRef(null), salesTeamSize: useRef(null), aiUsage: useRef(null), dealChallenge: useRef(null) }
  const lastPayload = useRef(null)
  const attempt = useRef(0)

  const blocked = DISMISSAL[status] === 'blocked'
  const fieldsInert = status === 'sending' || status === 'received'

  useEffect(() => {
    onDismissalChange?.(DISMISSAL[status])
  }, [status, onDismissalChange])

  const validate = (v, server = serverErrors) => {
    const next = {}
    for (const name of TEXT_FIELDS) {
      const message = textError(inputs[name].current, server[name])
      if (message) next[name] = message
    }
    if (!v.role) next.role = 'required'
    if (!v.salesTeamSize) next.salesTeamSize = 'required'
    if (!v.aiUsage.length) next.aiUsage = 'choose at least one'
    else if (server.aiUsage) next.aiUsage = server.aiUsage
    if (!v.dealChallenge) next.dealChallenge = 'required'
    return next
  }

  const focusFirstInvalid = (errs) => {
    const first = FIELD_ORDER.find((name) => errs[name])
    if (!first) return
    if (inputs[first]) return inputs[first].current?.focus()
    groups[first].current?.querySelector('[tabindex="0"]')?.focus()
  }

  const update = (name, value) => {
    const next = { ...values, [name]: value }
    // "Other" answers are dropped when their option is deselected (the textarea unmounts).
    if (name === 'role' && value !== OTHER) next.roleOther = ''
    if (name === 'dealChallenge' && value !== OTHER) next.dealChallengeOther = ''
    if (name === 'aiUsage' && !value.includes(SOMETHING_ELSE)) next.aiUsageOther = ''
    setValues(next)
    let server = serverErrors
    if (server[name]) {
      server = { ...server }
      delete server[name]
      setServerErrors(server)
    }
    if (submitted) setErrors(validate(next, server))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (status === 'sending' || status === 'received') return
    const errs = validate(values)
    setSubmitted(true)
    setErrors(errs)
    if (Object.keys(errs).length) {
      focusFirstInvalid(errs)
      return
    }

    const answers = normalizeAnswers(values)
    // same submissionId when re-submitting identical answers (idempotency)
    if (!lastPayload.current || JSON.stringify(lastPayload.current.answers) !== JSON.stringify(answers)) {
      lastPayload.current = { submissionId: uuid(), answers }
    }
    const id = ++attempt.current
    setServerErrors({})
    setStatus('sending')
    try {
      const result = await submitSignUp(lastPayload.current)
      if (id !== attempt.current) return
      if (result?.status === 'invalid') {
        const server = result.errors ?? {}
        setServerErrors(server)
        setStatus('idle')
        requestAnimationFrame(() => {
          const errs2 = validate(values, server)
          setErrors(errs2)
          focusFirstInvalid(errs2)
        })
        return
      }
      if (result?.status !== 'accepted') return setStatus('error')
      // bookingUrl redirect variant ("Thank you! You sound like a great fit." → Redirecting…) not implemented
      setStatus('received')
    } catch (err) {
      console.error('Sign-up failed', err)
      if (id === attempt.current) setStatus('error')
    }
  }

  return (
    <form
      ref={formRef}
      noValidate
      aria-labelledby="sign-up-title"
      onSubmit={onSubmit}
      className={[
        'relative max-w-[49.5em] rounded-[1px] border border-waitlist-gray bg-waitlist-dark-green text-waitlist-gray',
        'px-[1em] pb-[1.6875em] pt-[0.9375em] md:px-[2.1875em] md:pt-[2em]',
        'text-[1.0625rem] leading-[1.1875em] md:text-[1rem]',
        "[font-feature-settings:'liga'_0,'lnum','pnum']",
        '[--selection-background:white] [--selection-color:#117025]',
        className,
      ].join(' ')}
    >
      <div className="mb-[0.75em] flex items-center justify-between pe-[0.835em] ps-[0.25em]">
        <div inert={blocked ? '' : undefined}>
          <button
            type="button"
            onClick={onBack}
            className="-mx-[0.5em] -my-[0.75em] flex w-fit cursor-pointer items-center gap-[0.375em] px-[0.5em] py-[0.75em]"
          >
            <span data-glyph="" className="inline-flex h-[0.75em] w-[0.875em] min-w-0 shrink-0 items-center justify-center">
              <BackArrow />
            </span>
            Back
          </button>
        </div>
        <span aria-hidden="true" className="flex">
          <LogoMark />
        </span>
      </div>

      <div className="min-h-[1.4375em] border-y border-waitlist-gray">
        <h1 id="sign-up-title" className="text-balance ps-[0.5em] text-[1.125em] leading-[calc(21/18)] md:px-[0.5em] md:text-center">
          First, tell us a bit about you
        </h1>
      </div>

      <div className={status === 'received' ? 'cursor-not-allowed' : ''}>
        <div inert={fieldsInert ? '' : undefined} aria-busy={blocked}>
          <TextField
            number={1}
            name="name"
            label="Name"
            required
            placeholder="Your name"
            autoComplete="name"
            inputRef={inputs.name}
            value={values.name}
            error={errors.name}
            onChange={(e) => update('name', e.target.value)}
          />
          <TextField
            number={2}
            name="email"
            label="Work email"
            type="email"
            required
            placeholder="Your work email"
            autoComplete="email"
            inputRef={inputs.email}
            value={values.email}
            error={errors.email}
            onChange={(e) => update('email', e.target.value)}
          />
          <TextField
            number={3}
            name="socialHandle"
            label="Social handle"
            placeholder="LinkedIn or X"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            enterKeyHint="done"
            inputRef={inputs.socialHandle}
            value={values.socialHandle}
            error={errors.socialHandle}
            onChange={(e) => update('socialHandle', e.target.value)}
          />
          <RadioGroup
            number={4}
            name="role"
            label="Your role"
            options={ROLE_OPTIONS}
            otherLabel="Other"
            groupRef={groups.role}
            value={values.role}
            error={errors.role}
            onChange={(v) => update('role', v)}
            other={values.roleOther}
            onOtherChange={(v) => update('roleOther', v)}
          />
          <RadioGroup
            number={5}
            name="salesTeamSize"
            label="How many people sell at your company?"
            options={TEAM_SIZE_OPTIONS}
            groupRef={groups.salesTeamSize}
            value={values.salesTeamSize}
            error={errors.salesTeamSize}
            onChange={(v) => update('salesTeamSize', v)}
          />
          <AiUsageGroup
            number={6}
            groupRef={groups.aiUsage}
            value={values.aiUsage}
            error={errors.aiUsage}
            onChange={(v) => update('aiUsage', v)}
            other={values.aiUsageOther}
            onOtherChange={(v) => update('aiUsageOther', v)}
          />
          <RadioGroup
            number={7}
            name="dealChallenge"
            label="What's the hardest part of keeping your deals moving right now?"
            options={DEAL_OPTIONS}
            otherLabel="Something else"
            groupRef={groups.dealChallenge}
            value={values.dealChallenge}
            error={errors.dealChallenge}
            onChange={(v) => update('dealChallenge', v)}
            other={values.dealChallengeOther}
            onOtherChange={(v) => update('dealChallengeOther', v)}
          />
        </div>
      </div>

      <StatusRow status={status} onDone={onSubmitted} />

      {blocked && (
        <div aria-hidden="true" className="absolute -inset-px cursor-wait rounded-[1px] border border-waitlist-gray bg-[rgb(41_33_30/0.3)]">
          <SendingAnimation className="fixed left-1/2 top-1/2 h-auto w-[14.34em] -translate-x-1/2 -translate-y-1/2" />
        </div>
      )}
    </form>
  )
}
