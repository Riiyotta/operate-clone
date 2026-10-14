/*
 * Shared "legal document" reading template for /privacy and /terms — CLONE_SPEC_PAGES §1.
 * Flat light-gray page, 768px column, no homepage furniture, no motion.
 *
 * Content is described with a tiny block DSL (see Privacy.jsx / Terms.jsx). Paragraph and list-item
 * bodies are PLACEHOLDER copy: each block declares the character count of the original block, and
 * `fill()` pads it with generic placeholder sentences so the page height matches the original.
 */

/* ───────── typography (spec §1.3) ───────── */
const INK = 'text-stone-800'
const BODY = `text-[15px]/[24px] ${INK} md:text-[16px]/[26px]`
const CLS = {
  h1: `font-denim text-[32px]/[38px] font-semibold ${INK} md:text-[44px]/[52px]`,
  h2: `mt-12 font-denim text-[24px]/[30px] font-semibold ${INK} md:mt-16 md:text-[28px]/[34px]`,
  h3: `mt-8 font-denim text-[18px]/[24px] font-semibold ${INK} md:mt-10 md:text-[20px]/[28px]`,
  p: `mt-4 ${BODY}`,
  ul: `mt-4 list-disc pl-6 [&>:not(:last-child)]:mb-2 ${BODY}`,
  ol: `mt-4 list-decimal pl-6 [&>:not(:last-child)]:mb-2 ${BODY}`,
  li: 'marker:text-stone-800/60',
  strong: `font-semibold ${INK}`,
  a: `${INK} underline decoration-1 underline-offset-2 [text-decoration-skip-ink:none] hover:decoration-stone-800/50`,
  code: `rounded bg-stone-800/[.08] px-1 py-0.5 font-cinetype text-[0.9em] ${INK}`,
  hr: 'my-10 border-t border-stone-800/15',
}

/* ───────── placeholder filler ───────── */
// Original generic sentences (not derived from Operate's policies). Picked greedily, starting at a
// per-block seed, until the block reaches its target length.
const BANK = [
  'This section is placeholder text and will be replaced with the final wording before publication.',
  'The provider describes here, in general terms, how the relevant practice applies to the service.',
  'Where applicable, the obligations in this section apply to both parties for the duration of the agreement.',
  'Nothing in this placeholder paragraph should be read as a statement of actual practice.',
  'Specific details, examples, and exceptions will be added once the final language has been reviewed.',
  'The provider may revise this section from time to time, and the revised version applies from its effective date.',
  'Capitalized terms used here have the meanings given to them elsewhere in this document.',
  'Each party remains responsible for complying with the laws and regulations that apply to it.',
  'Requests relating to this section can be sent using the contact details at the end of this document.',
  'Reasonable measures will be taken to keep the information described here accurate and current.',
  'This sample clause exists only to approximate the length of the final text.',
  'Additional terms may apply to particular features and will be presented when those features are used.',
  'Any time period mentioned here is illustrative and will be confirmed in the final version.',
  'Notice of material changes will be given in a manner appropriate to the circumstances.',
  'Customers may contact the provider with questions about how this section applies to their account.',
  'The final text will set out the categories involved, the purposes they serve, and any applicable limits.',
  'Placeholder language like this keeps the page layout stable while the final copy is prepared.',
  'Where a conflict arises, the more specific provision generally controls over the more general one.',
  'Details will be confirmed in the final text.',
  'This item is a placeholder.',
  'Specific examples will be listed here.',
  'The applicable limits will be described here.',
  'Related obligations are covered elsewhere.',
  'Further detail will follow in the final version.',
  'The service may change over time.',
  'Reasonable notice will be provided where required.',
]

function fill(n, seed) {
  const out = []
  let len = 0
  for (let k = 0; k < BANK.length * 2 && len < n - 12; k++) {
    const s = BANK[(seed + k * 7) % BANK.length]
    const add = s.length + (out.length ? 1 : 0)
    if (len + add <= n + 10) {
      out.push(s)
      len += add
    }
  }
  return out.join(' ')
}

/* ───────── DSL ───────── */
let seedCounter = 0
export const FILL = { fill: true }
export const A = (text, href) => ({ a: text, href })
export const B = (...parts) => ({ b: parts })
export const CODE = (text) => ({ code: text })

const textLength = (parts) =>
  parts.reduce((sum, part) => {
    if (typeof part === 'string') return sum + part.length
    if (part.a) return sum + part.a.length
    if (part.code) return sum + part.code.length
    if (part.b) return sum + textLength(part.b)
    return sum
  }, 0)

// Expand FILL markers so the block totals about `n` characters (appends one if none is given).
function withFiller(n, parts) {
  const seed = seedCounter++ * 5
  const list = parts.includes(FILL) ? parts : [...parts, ...(parts.length ? [' '] : []), FILL]
  const room = n - textLength(list.filter((part) => part !== FILL))
  return list.map((part) => (part === FILL ? (room > 8 ? fill(room, seed) : '') : part))
}

export const H2 = (text) => ({ t: 'h2', text })
export const H3 = (text) => ({ t: 'h3', text })
export const HR = { t: 'hr' }
export const P = (n, ...parts) => ({ t: 'p', parts: withFiller(n, parts) })
export const RAW = (...parts) => ({ t: 'p', parts }) // exact text, no filler
export const LI = (n, ...parts) => ({ parts: withFiller(n, parts) })
export const UL = (...items) => ({ t: 'ul', items })
export const OL = (...items) => ({ t: 'ol', items: items.map((text) => ({ parts: [text] })) })

/* ───────── rendering ───────── */
function Inline({ parts }) {
  return parts.map((part, i) => {
    if (typeof part === 'string') return part
    if (part.code) return <code key={i} className={CLS.code}>{part.code}</code>
    if (part.b)
      return (
        <strong key={i} className={CLS.strong}>
          <Inline parts={part.b} />
        </strong>
      )
    if (part.a) {
      const external = /^https?:/.test(part.href)
      return (
        <a key={i} className={CLS.a} href={part.href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
          {part.a}
        </a>
      )
    }
    return null
  })
}

function Block({ block }) {
  switch (block.t) {
    case 'h2':
      return <h2 className={CLS.h2}>{block.text}</h2>
    case 'h3':
      return <h3 className={CLS.h3}>{block.text}</h3>
    case 'hr':
      return <hr className={CLS.hr} />
    case 'ul':
    case 'ol': {
      const List = block.t
      return (
        <List className={CLS[block.t]}>
          {block.items.map((item, i) => (
            <li key={i} className={CLS.li}>
              <Inline parts={item.parts} />
            </li>
          ))}
        </List>
      )
    }
    default:
      return (
        <p className={CLS.p}>
          <Inline parts={block.parts} />
        </p>
      )
  }
}

export default function LegalPage({ title, effectiveDate, blocks }) {
  return (
    <main className="op-base min-h-svh bg-waitlist-gray">
      <div className="mx-auto max-w-3xl px-6 py-12 md:px-8 md:py-20">
        <div className="mb-8 md:mb-12">
          <a href="/" className="font-cinetype text-[13px] uppercase text-stone-800 [text-decoration-skip-ink:none]">
            ← Back to Operate
          </a>
        </div>
        <article className="pb-24">
          <h1 className={CLS.h1}>{title}</h1>
          <p className={CLS.p}>
            <strong className={CLS.strong}>Effective date:</strong> {effectiveDate}
          </p>
          {blocks.map((block, i) => (
            <Block key={i} block={block} />
          ))}
        </article>
      </div>
    </main>
  )
}
