import { memo, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { REVEAL_MS, TYPE_MS, useContentClock, useDemo } from './engine.jsx'
import { createMorph } from './morph.js'

const EASE_OUT_QUAD = [0.25, 0.46, 0.45, 0.94]
const EASE_OUT_CUBIC = [0.33, 1, 0.68, 1]

/* Blinking 1px caret */
const BLINK = { opacity: [1, 1, 0, 0], transition: { duration: 1, times: [0, 0.5, 0.5, 1], repeat: Infinity } }
export function Caret({ blinking = true }) {
  const reduced = useReducedMotion()
  return (
    <motion.span
      aria-hidden="true"
      className="-mr-px inline-block h-[1.15em] w-px bg-gray-900 align-[-0.2em]"
      animate={blinking && !reduced ? BLINK : { opacity: 1 }}
    />
  )
}

/* Chat entrance: fade + rise, skipped for content before a jump target */
export function Entrance({ step, children }) {
  const { settled } = useDemo()
  const instant = step < settled
  return (
    <motion.div
      initial={instant ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05, duration: 0.3, ease: EASE_OUT_QUAD }}
    >
      {children}
    </motion.div>
  )
}

/* Typewriter: one character per 32ms, starting after `from` */
function Typewriter({ text, from = '', instant, onStart, onComplete }) {
  const reduced = useReducedMotion()
  const skip = !!reduced || !!instant
  const [count, setCount] = useState(from.length)
  const shown = skip ? text.length : count

  useEffect(() => {
    onStart?.(skip ? 0 : TYPE_MS * Math.max(text.length - from.length - 1, 0))
    if (skip) return
    let raf = 0
    let t0
    const tick = (now) => {
      t0 ??= now
      const n = Math.min(text.length, from.length + Math.floor((now - t0) / TYPE_MS) + 1)
      setCount(n)
      if (n < text.length) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [skip, text, from, onStart])

  useEffect(() => {
    if (shown === text.length) onComplete?.()
  }, [shown, text, onComplete])

  return (
    <>
      {text.slice(0, shown)}
      <Caret blinking={shown === text.length} />
    </>
  )
}

export function TypedDraft({ step, text, from }) {
  const { onStart, onComplete, instant } = useContentClock(step)
  return <Typewriter text={text} from={from} instant={instant} onStart={onStart} onComplete={onComplete} />
}

/*
 * Word-by-word reveal. `paragraphs` is an array of paragraphs; each paragraph is an array of
 * strings and { id, node } inline elements. One token is revealed every 25ms, each fading in over 300ms.
 * `reserve` keeps unrevealed tokens in layout (invisible) so the block does not grow.
 */
const Token = memo(function Token({ token, revealed, instant }) {
  return (
    <>
      {token.lead}
      <motion.span
        initial={instant ? false : { opacity: 0 }}
        animate={{ opacity: revealed ? 1 : 0 }}
        transition={{ duration: 0.3, ease: EASE_OUT_CUBIC }}
      >
        {token.node}
      </motion.span>
    </>
  )
})

function tokenize(paragraphs) {
  let offset = 0
  return paragraphs.map((para, pi) => {
    const tokens = []
    let lead = ''
    for (const part of para) {
      if (typeof part !== 'string') {
        tokens.push({ id: part.id, lead, node: part.node })
        lead = ''
        continue
      }
      for (const piece of part.split(/(\s+)/)) {
        if (!piece) continue
        if (/^\s+$/.test(piece)) lead += piece
        else {
          tokens.push({ id: `w${pi}.${tokens.length}`, lead, node: piece })
          lead = ''
        }
      }
    }
    const out = { id: String(pi), tokens, offset }
    offset += tokens.length
    return out
  })
}

function Reveal({ paragraphs, reserve, instant, onStart, onComplete, className }) {
  const reduced = useReducedMotion()
  const skip = !!reduced || !!instant
  const blocks = useMemo(() => tokenize(paragraphs), [paragraphs])
  const total = blocks.reduce((n, b) => n + b.tokens.length, 0)
  const [count, setCount] = useState(0)
  const shown = skip ? total : count

  useEffect(() => {
    onStart?.(skip ? 0 : REVEAL_MS * Math.max(total - 1, 0))
    if (skip) return
    let raf = 0
    let t0
    const tick = (now) => {
      t0 ??= now
      const n = Math.min(total, Math.floor((now - t0) / REVEAL_MS) + 1)
      setCount(n)
      if (n < total) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [skip, total, onStart])

  useEffect(() => {
    if (shown === total) onComplete?.()
  }, [shown, total, onComplete])

  return (
    <div className={className}>
      {blocks
        .filter((b) => reserve || b.offset < shown)
        .map((b) => (
          <p key={b.id}>
            {(reserve ? b.tokens : b.tokens.slice(0, shown - b.offset)).map((t, i) => (
              <Token key={t.id} token={t} revealed={b.offset + i < shown} instant={skip} />
            ))}
          </p>
        ))}
    </div>
  )
}

export function RevealReply({ step, paragraphs, reserve, className }) {
  const { onStart, onComplete, instant } = useContentClock(step)
  return <Reveal className={className} paragraphs={paragraphs} reserve={reserve} instant={instant} onStart={onStart} onComplete={onComplete} />
}


/*
 * TextMorph: per-item morph (see morph.js). Words / letters shared between the old and new
 * string stay and glide; the rest fade + scale in/out; the box width follows (400ms out-expo-ish).
 */
export function TextMorph({ children, className = '' }) {
  const text = String(children)
  const ref = useRef(null)
  const engine = useRef(null)
  const reduced = useReducedMotion()
  useLayoutEffect(() => {
    const m = createMorph(ref.current)
    engine.current = m
    m.update(text, false)
    return () => {
      engine.current = null
      m.destroy()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useLayoutEffect(() => {
    engine.current?.update(text, !reduced)
  }, [text, reduced])
  return <span ref={ref} data-morph-root="" className={`relative inline-block whitespace-nowrap align-top ${className}`} />
}
