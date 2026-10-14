/*
 * Per-segment text morph (behaviour measured from the original's "torph" TextMorph).
 *
 * Text is split into items (words + nbsp spaces, or graphemes when the string has no space).
 * On change, items are matched by id so shared words/letters stay and glide (FLIP), new items
 * fade/scale in from where their nearest surviving neighbour came from, and removed items are
 * pinned absolutely and fade/scale out travelling with their nearest surviving neighbour.
 * The root's width/height animate between the old and new size.
 *
 * Timing (measured live, 1440 + 390):
 *   all motion            400ms cubic-bezier(0.19, 1, 0.22, 1)
 *   enter                 translate(anchor delta) scale(.95) -> none; opacity 0->1 linear, 200ms after 100ms delay
 *   exit                  -> translate(anchor delta) scale(.95); opacity ->0 linear 100ms, then removed
 *   persisting item       translate(old - new) -> none
 *   runs of >= 6 entering/exiting items scale(.8) about the run centre; opacity 140ms (in) / 180ms (out)
 */

export const MORPH_MS = 400
export const MORPH_EASE = 'cubic-bezier(0.19, 1, 0.22, 1)'
const NBSP = ' '
const RUN = 6

const segmenters = {}
const segmenter = (gran) =>
  typeof Intl !== 'undefined' && Intl.Segmenter
    ? (segmenters[gran] ??= new Intl.Segmenter('en', { granularity: gran }))
    : null

function idPool() {
  const used = new Set()
  return {
    has: (id) => used.has(id),
    hold: (id) => used.add(id),
    claim(base) {
      if (!used.has(base)) {
        used.add(base)
        return base
      }
      let n = 1
      while (used.has(`${base}~${n}`)) n++
      used.add(`${base}~${n}`)
      return `${base}~${n}`
    },
  }
}

function pieces(text, byWord) {
  const s = segmenter(byWord ? 'word' : 'grapheme')
  if (s) return Array.from(s.segment(text), (x) => ({ str: x.segment, at: x.index }))
  const out = []
  let at = 0
  for (const ch of byWord ? text.split(/( )/) : Array.from(text)) {
    if (ch) out.push({ str: ch, at })
    at += ch.length
  }
  return out
}

/** Initial segmentation: ids are the segment text, de-duplicated with the offset. */
function freshSegments(text, pool = idPool()) {
  const out = []
  for (const { str, at } of pieces(text, text.includes(' '))) {
    if (str === ' ') out.push({ id: pool.claim(`space-${at}`), str: NBSP })
    else out.push({ id: pool.claim(pool.has(str) ? `${str}-${at}` : str), str })
  }
  return out
}

/** Longest common subsequence; returns matched index pairs [aIdx[], bIdx[]]. */
function lcs(a, b) {
  const n = a.length
  const m = b.length
  const t = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0))
  for (let i = n - 1; i >= 0; i--)
    for (let j = m - 1; j >= 0; j--) t[i][j] = a[i] === b[j] ? t[i + 1][j + 1] + 1 : Math.max(t[i + 1][j], t[i][j + 1])
  const ai = []
  const bi = []
  let i = 0
  let j = 0
  while (i < n && j < m) {
    if (a[i] === b[j]) {
      ai.push(i++)
      bi.push(j++)
    } else if (t[i + 1][j] >= t[i][j + 1]) i++
    else j++
  }
  return [ai, bi]
}

/** Count of matched entries before each index (keeps similarity matches in the same "slot"). */
const slots = (len, matched) => {
  const out = []
  let c = 0
  for (let i = 0; i < len; i++) {
    out.push(c)
    if (matched.has(i)) c++
  }
  return out
}

/**
 * Next segments for `text` given the previous segments, preserving ids of shared words / letters.
 * `splits` collects old single-item words that are broken into per-letter items (id -> segments).
 */
function nextSegments(prev, text) {
  const splits = new Map()
  // previous words (runs between spaces)
  const oldWords = []
  let run = []
  const flush = () => {
    if (run.length) oldWords.push({ word: run.map((s) => s.str).join(''), segs: run })
    run = []
  }
  for (const s of prev) (s.str === NBSP ? flush() : run.push(s))
  flush()

  const spaced = text.includes(' ')
  if (oldWords.length <= 1 && !spaced) return { segs: freshSegments(text), splits }

  const words = []
  const gaps = []
  let gap = []
  for (const part of text.split(/( )/)) {
    if (part === ' ') gap.push(part)
    else if (part) {
      gaps.push(gap)
      words.push(part)
      gap = []
    }
  }
  const tail = gap
  const oldStr = oldWords.map((w) => w.word)
  const [oi, ni] = lcs(oldStr, words)
  const oldHit = new Set(oi)
  const newHit = new Set(ni)
  const exact = new Map(ni.map((n, k) => [n, oi[k]]))
  let oldFree = oldStr.map((_, i) => i).filter((i) => !oldHit.has(i))
  let newFree = words.map((_, i) => i).filter((i) => !newHit.has(i))
  // out-of-order exact matches
  const taken = new Set()
  for (const n of newFree)
    for (const o of oldFree)
      if (!taken.has(o) && words[n] === oldStr[o]) {
        exact.set(n, o)
        taken.add(o)
        break
      }
  oldFree = oldFree.filter((o) => !taken.has(o))
  newFree = newFree.filter((n) => !exact.has(n))
  // similar words in the same slot morph letter by letter
  const similar = new Map()
  const used = new Set()
  const oSlot = slots(oldStr.length, oldHit)
  const nSlot = slots(words.length, newHit)
  if (oldFree.length * newFree.length <= 2500)
    for (const n of newFree) {
      let best = -1
      let score = 0.4
      for (const o of oldFree) {
        if (used.has(o) || oSlot[o] !== nSlot[n]) continue
        const a = oldStr[o]
        const b = words[n]
        const s = a && b ? lcs(a.split(''), b.split(''))[0].length / Math.max(a.length, b.length) : 0
        if (s > score) {
          score = s
          best = o
        }
      }
      if (best >= 0) {
        similar.set(n, best)
        used.add(best)
      }
    }

  const pool = idPool()
  const plan = words.map((w, n) =>
    exact.has(n) ? { mode: 'keep', o: exact.get(n) } : similar.has(n) ? { mode: 'morph', o: similar.get(n) } : { mode: 'new' }
  )
  for (const p of plan) {
    if (p.mode === 'new') continue
    const ow = oldWords[p.o]
    if (p.mode === 'morph' && ow.segs.length === 1) for (let i = 0; i < ow.word.length; i++) pool.hold(`${ow.segs[0].id}:${i}`)
    else ow.segs.forEach((s) => pool.hold(s.id))
  }
  const letters = (ow) => {
    if (ow.segs.length !== 1 || ow.word.length <= 1) return ow.segs
    const id = ow.segs[0].id
    const out = ow.word.split('').map((ch, i) => ({ id: `${id}:${i}`, str: ch }))
    splits.set(id, out)
    return out
  }

  const segs = []
  let at = 0
  const spaces = (list) => {
    for (const _ of list) {
      segs.push({ id: pool.claim(`space-${at}`), str: NBSP })
      at++
    }
  }
  words.forEach((w, n) => {
    spaces(gaps[n] ?? (n > 0 ? [' '] : []))
    const p = plan[n]
    if (p.mode === 'keep') segs.push(...oldWords[p.o].segs)
    else if (p.mode === 'morph') {
      const ow = oldWords[p.o]
      const src = letters(ow)
      const [a, b] = lcs(ow.word.split(''), w.split(''))
      const carry = new Map()
      b.forEach((bj, k) => src[a[k]] && carry.set(bj, src[a[k]]))
      w.split('').forEach((ch, j) => segs.push({ id: carry.has(j) ? carry.get(j).id : pool.claim(`${w}~${j}`), str: ch }))
    } else segs.push({ id: pool.claim(w), str: w })
    at += w.length
  })
  spaces(tail)
  return { segs, splits }
}

/* ---------------- DOM side ---------------- */

const ITEM = 'data-morph-item'
const ID = 'data-morph-id'
const EXIT = 'data-morph-exiting'
const SR = 'data-morph-sr'

const translateOf = (el) => {
  const t = getComputedStyle(el).transform
  if (!t || t === 'none') return { x: 0, y: 0 }
  const m = new DOMMatrixReadOnly(t)
  return { x: m.m41, y: m.m42 }
}

/** Cancels running animations, returning the visual translate/opacity they had reached. */
function settle(el) {
  const { x, y } = translateOf(el)
  const opacity = Number(getComputedStyle(el).opacity)
  el.getAnimations().forEach((a) => a.cancel())
  return { x, y, opacity: Number.isNaN(opacity) ? 1 : opacity }
}

function makeItem(seg) {
  const el = document.createElement('span')
  el.setAttribute(ITEM, '')
  el.setAttribute(ID, seg.id)
  el.setAttribute('aria-hidden', 'true')
  el.style.display = 'inline-block'
  el.style.position = 'relative'
  el.textContent = seg.str
  return el
}

const liveItems = (root) => Array.from(root.children).filter((c) => c.hasAttribute(ITEM) && !c.hasAttribute(EXIT))

/** Layout positions (without transforms) of live items, relative to the root. */
function layout(root) {
  const box = root.getBoundingClientRect()
  const out = {}
  for (const el of liveItems(root)) {
    const r = el.getBoundingClientRect()
    const t = translateOf(el)
    out[el.getAttribute(ID)] = { x: r.left - box.left - t.x, y: r.top - box.top - t.y }
  }
  return out
}

const delta = (from, to, id) => (from[id] && to[id] ? { x: from[id].x - to[id].x, y: from[id].y - to[id].y } : { x: 0, y: 0 })

/** Nearest id in `order` around index `i` that satisfies `ok`; `forward` picks the search direction tried first. */
function neighbour(i, order, ok, forward) {
  const look = (dir) => {
    for (let k = i + dir; k >= 0 && k < order.length; k += dir) if (ok(order[k])) return order[k]
    return null
  }
  return forward ? look(1) ?? look(-1) : look(-1) ?? look(1)
}

/** Consecutive runs (>= RUN) of elements in `list` that are in `set`. */
function runs(list, set) {
  const out = []
  let cur = []
  const end = () => {
    if (cur.length >= RUN) out.push(cur)
    cur = []
  }
  for (const el of list) (set.has(el) ? cur.push(el) : end())
  end()
  return out
}

/** transform-origin of each element so a run scales about its common centre. */
function runOrigins(els) {
  const rects = els.map((e) => e.getBoundingClientRect())
  const cx = (Math.min(...rects.map((r) => r.left)) + Math.max(...rects.map((r) => r.right))) / 2
  const cy = (Math.min(...rects.map((r) => r.top)) + Math.max(...rects.map((r) => r.bottom))) / 2
  return rects.map((r) => `${cx - r.left}px ${cy - r.top}px`)
}

export function createMorph(root) {
  let prev = []
  let current = null
  let sizeAnim = null
  const timing = (extra) => ({ duration: MORPH_MS, easing: MORPH_EASE, fill: 'both', ...extra })

  const setText = (text) => {
    let sr = root.querySelector(`:scope > [${SR}]`)
    if (!sr) {
      sr = document.createElement('span')
      sr.setAttribute(SR, '')
      Object.assign(sr.style, {
        position: 'absolute',
        width: '1px',
        height: '1px',
        margin: '-1px',
        overflow: 'hidden',
        clipPath: 'inset(50%)',
        whiteSpace: 'pre',
        userSelect: 'none',
      })
      root.prepend(sr)
    }
    sr.textContent = text
  }

  function render(text, animate) {
    setText(text)
    if (!animate || !prev.length) {
      sizeAnim?.cancel()
      sizeAnim = null
      root.getAnimations().forEach((a) => a.cancel())
      Array.from(root.children).forEach((c) => c.hasAttribute(ITEM) && c.remove())
      prev = freshSegments(text)
      prev.forEach((s) => root.append(makeItem(s)))
      return
    }

    const { segs, splits } = nextSegments(prev, text)
    const before = { w: parseFloat(getComputedStyle(root).width), h: parseFloat(getComputedStyle(root).height) }

    // break whole-word items into letters where a word morphs letter by letter
    for (const el of liveItems(root)) {
      const parts = splits.get(el.getAttribute(ID))
      if (!parts) continue
      parts.forEach((p) => el.before(makeItem(p)))
      el.remove()
    }

    const oldPos = layout(root)
    const oldItems = liveItems(root)
    const oldOrder = oldItems.map((e) => e.getAttribute(ID))
    const nextIds = new Set(segs.map((s) => s.id))
    const leaving = oldItems.filter((e) => !nextIds.has(e.getAttribute(ID)))
    const leavingSet = new Set(leaving)
    const exitAnchor = new Map()
    const stays = new Set(oldOrder.filter((id) => nextIds.has(id)))
    oldItems.forEach((el, i) => leavingSet.has(el) && exitAnchor.set(el, neighbour(i, oldOrder, (id) => stays.has(id), true)))

    // pin leaving items where they are
    const pinned = leaving.map((el) => {
      const t = translateOf(el)
      const box = { left: el.offsetLeft + t.x, top: el.offsetTop + t.y, w: el.offsetWidth, h: el.offsetHeight }
      const { opacity } = settle(el)
      return { el, box, opacity }
    })
    for (const { el, box, opacity } of pinned) {
      el.setAttribute(EXIT, '')
      Object.assign(el.style, {
        position: 'absolute',
        pointerEvents: 'none',
        left: `${box.left}px`,
        top: `${box.top}px`,
        width: `${box.w}px`,
        height: `${box.h}px`,
        opacity: String(opacity),
      })
    }

    // rebuild live items in the new order
    const keep = new Map()
    for (const el of liveItems(root)) {
      keep.set(el.getAttribute(ID), el)
      el.remove()
    }
    Array.from(root.childNodes).forEach((n) => n.nodeType === Node.TEXT_NODE && n.remove())
    for (const s of segs) {
      let el = keep.get(s.id)
      if (el) {
        el.style.transformOrigin = ''
        el.textContent = s.str
      } else el = makeItem(s)
      root.append(el)
    }
    const newPos = layout(root)

    // entering + persisting items
    const order = segs.map((s) => s.id)
    const present = liveItems(root)
    const entering = new Set(present.filter((e) => !oldPos[e.getAttribute(ID)]))
    const grouped = new Set()
    for (const group of runs(present, entering)) {
      const origins = runOrigins(group)
      group.forEach((el, i) => {
        grouped.add(el)
        settle(el)
        el.style.transformOrigin = origins[i]
        el.animate([{ transform: 'scale(0.8)' }, { transform: 'none' }], timing())
        el.animate([{ opacity: 0 }, { opacity: 1 }], timing({ duration: MORPH_MS * 0.35, easing: 'linear' }))
      })
    }
    const survivor = (id) => !!oldPos[id]
    present.forEach((el) => {
      if (grouped.has(el)) return
      const id = el.getAttribute(ID)
      const fresh = entering.has(el)
      const ref = fresh ? neighbour(order.indexOf(id), order, survivor, false) : id
      const d = ref ? delta(oldPos, newPos, ref) : { x: 0, y: 0 }
      const now = settle(el)
      el.animate(
        [{ transform: `translate(${d.x + now.x}px, ${d.y + now.y}px) scale(${fresh ? 0.95 : 1})` }, { transform: 'none' }],
        timing()
      )
      const from = fresh && now.opacity >= 1 ? 0 : now.opacity
      if (from < 1)
        el.animate(
          [{ opacity: from }, { opacity: 1 }],
          timing({ duration: MORPH_MS * (fresh ? 0.5 : 0.25), delay: fresh ? MORPH_MS * 0.25 : 0, easing: 'linear' })
        )
    })

    // leaving items
    const exitGrouped = new Set()
    for (const group of runs(oldItems, leavingSet)) {
      const origins = runOrigins(group)
      group.forEach((el, i) => {
        exitGrouped.add(el)
        el.style.transformOrigin = origins[i]
        el.animate([{ transform: 'scale(0.8)', offset: 1 }], timing())
        el.animate([{ opacity: 0, offset: 1 }], timing({ duration: MORPH_MS * 0.45, easing: 'linear' })).onfinish = () => el.remove()
      })
    }
    for (const el of leaving) {
      if (exitGrouped.has(el)) continue
      const ref = exitAnchor.get(el)
      const d = ref ? delta(newPos, oldPos, ref) : { x: 0, y: 0 }
      el.animate([{ transform: `translate(${d.x}px, ${d.y}px) scale(0.95)`, offset: 1 }], timing())
      el.animate([{ opacity: 0, offset: 1 }], timing({ duration: MORPH_MS * 0.25, easing: 'linear' })).onfinish = () => el.remove()
    }

    // root size
    sizeAnim?.cancel()
    const after = { w: parseFloat(getComputedStyle(root).width), h: parseFloat(getComputedStyle(root).height) }
    if (before.w && before.h && (Math.abs(before.w - after.w) > 0.5 || Math.abs(before.h - after.h) > 0.5)) {
      const a = root.animate(
        [
          { width: `${before.w}px`, height: `${before.h}px` },
          { width: `${after.w}px`, height: `${after.h}px` },
        ],
        timing()
      )
      a.onfinish = () => a.cancel()
      sizeAnim = a
    } else sizeAnim = null

    prev = segs
  }

  return {
    update(text, animate = true) {
      if (text === current) return
      current = text
      render(text, animate)
    },
    destroy() {
      sizeAnim?.cancel()
      root.getAnimations().forEach((a) => a.cancel())
      root.replaceChildren()
    },
  }
}
