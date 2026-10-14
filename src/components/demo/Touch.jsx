import { useLayoutEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useDemo, useTarget } from './engine.jsx'
import { CHAPTERS, CHIPS, SLACK_DRAFT, activePanelFor, draftFor } from './scripts.js'
import { Caret, RevealReply } from './text.jsx'
import { Chips, DealRef, InlineAvatar, MetaRow, Wavy } from './ChatParts.jsx'
import { DraftText } from './Desktop.jsx'
import PanelStack from './Panels.jsx'
import Cursor from './Cursor.jsx'
import ChapterControl from './ChapterControl.jsx'
import RunFade from './RunFade.jsx'
import { PlusIcon, SendArrow, SlackIcon } from './icons.jsx'

const FADE = { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] } }

const DEAL_REPLY = [
  [
    { id: 'deal', node: <DealRef /> },
    ' is clear to start, just waiting on the signature. ',
    { id: 'kierra-avatar', node: <InlineAvatar className="size-3.5 translate-y-[2.5px]" /> },
    ' ',
    { id: 'kierra', node: <Wavy>Kierra</Wavy> },
    ' is your champion. Meeting in person could move it.',
  ],
]
const MEETING_REPLY = [['Coffee or lunch could work. Tell me what you have in mind and I’ll draft the invite.']]
const SLACK_BODY = [[SLACK_DRAFT]]
const NEXT_REPLY = [
  ['Sent. Back on ', { id: 'deal', node: <DealRef /> }, '. After tea, confirm kickoff with Kierra and nudge Cooper to sign. It’s in the deal plan as a suggestion.'],
]
const replyCls = 'flex flex-col gap-y-2 text-pretty text-[12px]/[19px] text-gray-800'

function Exchange({ kind }) {
  const { step, S } = useDemo()
  switch (kind) {
    case 'quota':
      return (
        <div className="pt-0.5">
          <div className="text-[13px]/[21px] font-medium text-gray-800">Final stretch</div>
          <div className="mt-1 text-pretty text-[12px]/[19px] text-gray-800">
            You’ve booked $56K toward your $90K September quota. Holloway is close, and Tideline and Fielded are coming up next.
          </div>
        </div>
      )
    case 'deal':
      return step >= S.DealReply ? <RevealReply reserve className={replyCls} step={S.DealReply} paragraphs={DEAL_REPLY} /> : null
    case 'meeting':
      return <RevealReply reserve className={replyCls} step={S.MeetingReply} paragraphs={MEETING_REPLY} />
    case 'slackDraft':
      return (
        <div className="pt-2.5">
          <div className="flex items-center gap-x-1.5">
            <SlackIcon />
            <div className="text-[12px]/[17px] font-book text-gray-800">Direct message to Kierra</div>
            <div className="font-geist-mono text-[12px]/[17px] tracking-[-0.24px] text-gray-500">draft</div>
          </div>
          <RevealReply reserve className={`mt-2 ${replyCls}`} step={S.SlackDraftOpen} paragraphs={SLACK_BODY} />
        </div>
      )
    case 'nextStep':
      return step >= S.NextStepReply ? <RevealReply reserve className={replyCls} step={S.NextStepReply} paragraphs={NEXT_REPLY} /> : null
    default:
      return null
  }
}

function TouchSend() {
  const { ref, hoverProps } = useTarget('composer-submit')
  return (
    <div ref={ref} data-pressed={hoverProps['data-pressed']} className="demo-green rounded-full p-1.5 transition-transform duration-[120ms] data-[pressed]:scale-[0.92]">
      <SendArrow />
    </div>
  )
}

function TouchSlackActions() {
  const { ref, hoverProps } = useTarget('slack-draft-send')
  return (
    <div className="flex items-center gap-x-1">
      <div className="px-2.5 py-[5px] text-[12px]/[17px] font-book text-gray-700">Discard</div>
      <div
        ref={ref}
        data-pressed={hoverProps['data-pressed']}
        className="demo-green rounded-full px-2.5 py-[5px] text-[12px]/[17px] font-book text-gray-200 transition-transform duration-[120ms] data-[pressed]:scale-[0.94]"
      >
        Send
      </div>
    </div>
  )
}

function TouchComposer() {
  const { step, S } = useDemo()
  const input = useTarget('composer-input')
  const wrap = useRef(null)
  const focused = (step >= S.DraftFocus && step < S.PersonOpen) || (step >= S.TeaFocus && step < S.SlackDraftOpen)
  const draft = draftFor(step, S, 'SlackDraftOpen')
  const slackOpen = step >= S.SlackDraftOpen && step < S.NextStepSent
  const draftKey = draft && (draft.type === 'typing' ? `typing-${draft.step}` : draft.type)

  // Once the draft wraps past one line, give it the full composer width (actions drop to a 2nd row)
  useLayoutEffect(() => {
    const box = wrap.current
    const el = input.ref.current
    if (!box || !el) return
    delete box.dataset.wrapped
    if (!draftKey) return
    const ro = new ResizeObserver(() => {
      const lh = parseFloat(getComputedStyle(el).lineHeight)
      if (el.offsetHeight > 1.5 * lh) {
        box.dataset.wrapped = ''
        ro.disconnect()
      }
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [input.ref, draftKey])

  return (
    <div ref={wrap} className="demo-touch-composer grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-1.5 pb-[7px] pl-[7px] pr-[9px] pt-1">
      <div className="demo-touch-plus col-start-1 row-start-1 p-2">
        <PlusIcon />
      </div>
      <div ref={input.ref} className={`demo-touch-input col-start-2 row-start-1 text-[12px]/[17px] ${draft ? 'text-gray-900' : 'truncate text-gray-500'}`}>
        {draft ? (
          <DraftText draft={draft} focused={focused} />
        ) : (
          <>
            {focused && <Caret />}
            Ask about Quota...
          </>
        )}
      </div>
      <div className="demo-touch-actions col-start-3 row-start-1">{slackOpen ? <TouchSlackActions /> : <TouchSend />}</div>
    </div>
  )
}

function chipsFor(step, S) {
  if (step >= S.NextStepSuggestions) return CHIPS.next
  if (step >= S.SlackDraftOpen) return []
  if (step >= S.TeaType) return CHIPS.tea
  if (step >= S.PersonMorph) return CHIPS.person
  if (step >= S.MeetingSuggestions) return CHIPS.meeting
  if (step >= S.DealSuggestions) return CHIPS.deal
  return CHIPS.quota
}

function TouchChat() {
  const { step, S } = useDemo()
  const nav =
    step >= S.NextStepSent ? 'Holloway' : step >= S.SlackDraftOpen ? undefined : step >= S.PersonOpen ? 'Kierra Torres' : step >= S.DealOpen ? 'Holloway' : undefined
  const kind =
    step >= S.NextStepSent ? 'nextStep' : step >= S.SlackDraftOpen ? 'slackDraft' : step >= S.MeetingReply ? 'meeting' : step >= S.DealOpen ? 'deal' : 'quota'
  const chips = chipsFor(step, S)

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="relative isolate flex min-h-0 flex-1 flex-col justify-end overflow-hidden px-[15px]">
        <div className="flex shrink-0 grow flex-col">
          <div className="sticky top-0 z-[1]">
            <AnimatePresence initial={false} mode="popLayout">
              {nav && (
                <motion.div key={nav} className="bg-gray-100 pb-2 pt-1.5" {...FADE}>
                  <MetaRow>
                    Navigated to <span className="text-gray-600">{nav}</span>
                  </MetaRow>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <AnimatePresence initial={false} mode="popLayout">
            <motion.div key={kind} {...FADE}>
              <Exchange kind={kind} />
            </motion.div>
          </AnimatePresence>
          <Chips items={chips} className={`mt-auto ${chips.length > 0 ? 'pt-2' : ''}`} />
        </div>
      </div>
      <TouchComposer />
    </div>
  )
}

export default function TouchDemo() {
  const { step, S } = useDemo()
  return (
    <>
      <PanelStack active={activePanelFor(step, S)} suggested={step >= S.NextStepPlan} peek="bottom" />
      <RunFade className="flex min-h-0 flex-1 flex-col">
        <TouchChat />
      </RunFade>
      <Cursor variant="touch" />
      <ChapterControl chapters={CHAPTERS} className="absolute left-1/2 top-[calc(100%+1px)] mt-4 -translate-x-1/2" />
    </>
  )
}
