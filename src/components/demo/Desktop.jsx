import { AnimatePresence, motion } from 'motion/react'
import { useDemo, useTarget } from './engine.jsx'
import { CHAPTERS, CHIPS, DRAFT, SLACK_DRAFT, AVATARS, activePanelFor, draftFor } from './scripts.js'
import { Caret, Entrance, RevealReply, TextMorph, TypedDraft } from './text.jsx'
import { Chips, DealRef, InlineAvatar, MetaRow, UserBubble, Wavy } from './ChatParts.jsx'
import PanelStack from './Panels.jsx'
import Cursor from './Cursor.jsx'
import ChapterControl from './ChapterControl.jsx'
import RunFade from './RunFade.jsx'
import {
  BellIcon,
  ChevronDown,
  ChevronDownLight,
  CopyIcon,
  FlagIcon,
  FunnelIcon,
  GmailIcon,
  HaldenSmall,
  HandshakeFillIcon,
  HomeIcon,
  HubSpotIcon,
  OperateMarkIcon,
  PaceIcon,
  PlusIcon,
  QuietIcon,
  QuotaIconActive,
  QuotaIconHeader,
  SearchIcon,
  SendArrow,
  SignpostIcon,
  SkillsIcon,
  SlackIcon,
  TasksIcon,
  WorkspaceLogo,
} from './icons.jsx'

/* ---------- Sidebar (xl only) ---------- */

const NAV = [
  {
    items: [
      { icon: <HomeIcon />, label: 'Home' },
      { icon: <TasksIcon />, label: 'Tasks', meta: '10' },
      { icon: <SkillsIcon />, label: 'Skills' },
    ],
  },
  {
    title: 'Private',
    items: [
      { icon: <QuotaIconActive />, label: 'Monthly Quota', active: true },
      { icon: <FlagIcon />, label: 'My renewals' },
    ],
  },
  {
    title: 'Team workspace',
    items: [
      { icon: <FunnelIcon />, label: 'Inbound ICP review' },
      { icon: <HandshakeFillIcon />, label: 'Weekly commit' },
      { icon: <HaldenSmall />, label: 'Halden', meta: '25K' },
    ],
  },
  {
    more: true,
    items: [
      { icon: <OperateMarkIcon />, label: 'Operate' },
      { label: 'Prep for Fielded' },
      { label: 'Brightline stalled' },
      { label: 'Draft email follow up' },
    ],
  },
]

function Sidebar({ className }) {
  return (
    <div className={`p-[7px] ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-2 py-1.5 pl-2">
          <WorkspaceLogo />
          <div className="flex items-center gap-x-0.5">
            <div className="text-[14px]/[20px] font-book tracking-[-0.14px] text-gray-900">Quietwork</div>
            <ChevronDown />
          </div>
        </div>
        <div className="flex gap-x-1">
          <div className="p-2">
            <SearchIcon />
          </div>
          <div className="relative p-2">
            <BellIcon />
            <div className="demo-green-badge absolute right-0.5 top-0.5 flex size-3.5 items-center justify-center rounded-full text-[9px]/[calc(1.25/0.875)] font-book tracking-[0.09px] text-white">
              4
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex flex-col gap-y-6">
        {NAV.map(({ title, items, more }, gi) => (
          <div key={gi} className="flex flex-col gap-y-0.5">
            {title && <div className="px-2 py-[3.5px] text-[12px]/[17px] font-book tracking-[0.12px] text-gray-500">{title}</div>}
            <div className="flex flex-col gap-y-0.5">
              {items.map(({ icon, label, meta, active }) => (
                <div key={label} className="flex items-center gap-x-2 px-2 py-1.5">
                  <div className="size-4">{icon}</div>
                  <div className={`text-[14px]/[20px] tracking-[-0.14px] ${active ? 'font-book text-demo-accent' : 'text-gray-700'}`}>{label}</div>
                  {meta && <div className="pt-0.5 text-[12px]/[17px] text-gray-500">{meta}</div>}
                </div>
              ))}
            </div>
            {more && <div className="py-[3.5px] pl-8 pr-2 text-[12px]/[17px] tracking-[-0.12px] text-gray-500">See all</div>}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ---------- Chat history (static Quota exchange) ---------- */

const SOURCES = [
  { icon: <HubSpotIcon />, action: 'Checked HubSpot', result: '5 open deals, $65k in play' },
  { icon: <GmailIcon />, action: 'Read Gmail', result: 'Holloway contract thread, Fielded quiet since Sep 6' },
  { icon: <SlackIcon />, action: 'Read Slack', result: '#holloway' },
]
const INSIGHTS = [
  { icon: <PaceIcon />, title: 'Ahead of pace', text: '+$11k against $45k pace.' },
  { icon: <QuietIcon />, title: 'Biggest risk, 9 days quiet', text: 'Fielded’s $4k has gone silent since Sep 6.' },
  { icon: <SignpostIcon />, title: 'Next decision', text: 'Chase Holloway’s signature today, or nudge Fielded first.' },
]

function QuotaHistory() {
  return (
    <>
      <div className="text-pretty text-[14px]/[23px] text-gray-800">That takes commit to $36k.</div>
      <UserBubble>Catch me up on my quota.</UserBubble>
      <div className="flex flex-col gap-y-1">
        <div className="flex items-center gap-x-1">
          <ChevronDownLight />
          <div className="text-[12px]/[17px] font-book text-gray-500">Checked 3 sources</div>
        </div>
        <div className="ml-2 flex flex-col gap-y-2 border-l-[0.5px] border-black/[0.12] pl-3 pt-1">
          {SOURCES.map(({ icon, action, result }) => (
            <div key={action} className="flex items-center gap-x-1">
              {icon}
              <div className="text-nowrap text-[12px]/[17px] text-gray-600">{action}</div>
              <div className="truncate text-[12px]/[17px] text-gray-500">{result}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-y-3">
        <div className="text-[14px]/[23px] font-medium text-gray-800">Final stretch</div>
        <div className="text-pretty text-[14px]/[23px] text-gray-800">
          You’ve booked $56K toward your $90K September quota. Holloway is close, and Tideline and Fielded are coming up next.
        </div>
        <div className="flex flex-col gap-y-4 rounded-2xl bg-black/[0.02] p-4">
          {INSIGHTS.map(({ icon, title, text }) => (
            <div key={title} className="flex flex-col gap-y-1">
              <div className="flex items-center gap-x-2">
                {icon}
                <div className="text-[12px]/[17px] text-gray-600">{title}</div>
              </div>
              <div className="text-pretty pl-6 text-[14px]/[20px] text-gray-800">{text}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

/* ---------- Scripted exchanges ---------- */

const DEAL_REPLY = [
  ['The last conversation on ', { id: 'deal', node: <DealRef /> }, ' went well. The team is ready to get started, but the signature is still outstanding.'],
  [
    'Legal, security, and procurement are clear, so we’re waiting on the signature and kickoff. ',
    { id: 'kierra-avatar', node: <InlineAvatar className="size-4 translate-y-[2.5px]" /> },
    ' ',
    { id: 'kierra', node: <Wavy>Kierra</Wavy> },
    ' is your champion; an in-person catch-up could help surface anything still holding things up.',
  ],
]
const MEETING_REPLY = [['Coffee or lunch could work. Tell me what you have in mind and I’ll draft the invite.']]
const SLACK_REPLY = [['Here’s a draft for Kierra, ready in the composer. Send it, or change anything first.']]
const NEXT_REPLY = [
  [
    'Sent. Back on ',
    { id: 'deal', node: <DealRef /> },
    '. Once tea is on the calendar, the next step is to follow up with Kierra on the kickoff date and nudge Cooper on the signature. I’ve added it to the deal plan as a suggestion.',
  ],
]
const replyCls = 'flex flex-col gap-y-4 pr-5 text-[14px]/[23px] text-gray-800'

function Exchanges() {
  const { step, S } = useDemo()
  return (
    <>
      {step >= S.DealMessage && (
        <Entrance step={S.DealMessage}>
          <UserBubble>Unblock Holloway’s signature.</UserBubble>
        </Entrance>
      )}
      {step >= S.DealOpen && (
        <div>
          <MetaRow>
            Navigated to <span className="text-gray-600">Holloway</span>
          </MetaRow>
          {step >= S.DealReply && <RevealReply className={`mt-3 ${replyCls}`} step={S.DealReply} paragraphs={DEAL_REPLY} />}
        </div>
      )}
      {step >= S.MeetingMessage && (
        <Entrance step={S.MeetingMessage}>
          <UserBubble>Let’s follow up with their team and suggest meeting in person.</UserBubble>
        </Entrance>
      )}
      {step >= S.MeetingReply && <RevealReply className={replyCls} step={S.MeetingReply} paragraphs={MEETING_REPLY} />}
      {step >= S.PersonOpen && (
        <MetaRow>
          Navigated to <span className="text-gray-600">Kierra Torres</span>
        </MetaRow>
      )}
      {step >= S.SlackDraftMessage && (
        <Entrance step={S.SlackDraftMessage}>
          <UserBubble>{DRAFT.message}</UserBubble>
        </Entrance>
      )}
      {step >= S.SlackDraftReply && <RevealReply className={replyCls} step={S.SlackDraftReply} paragraphs={SLACK_REPLY} />}
      {step >= S.NextStepSent && (
        <div>
          <MetaRow icon={<SlackIcon />}>
            Sent to <span className="text-gray-600">Kierra</span> on Slack
          </MetaRow>
          {step >= S.NextStepReply && <RevealReply className={`mt-3 ${replyCls}`} step={S.NextStepReply} paragraphs={NEXT_REPLY} />}
        </div>
      )}
    </>
  )
}

/* ---------- Composer ---------- */

const GROW = { duration: 0.48, ease: [0.22, 1, 0.36, 1] }
const GROW_IN = { delay: 0.12, duration: 0.42, ease: [0.22, 1, 0.36, 1] }

export function DraftText({ draft, focused }) {
  if (draft.type === 'typing') return <TypedDraft key={draft.step} step={draft.step} text={draft.text} from={draft.from} />
  return (
    <>
      {DRAFT.before}
      <TextMorph>{draft.word}</TextMorph>
      {DRAFT.after}
      {focused && <Caret />}
    </>
  )
}

function SendButton() {
  const { ref, hoverProps } = useTarget('composer-submit')
  return (
    <div
      ref={ref}
      {...hoverProps}
      className="demo-green rounded-full p-2 transition-[filter,transform] duration-[120ms] data-[hovered]:brightness-110 data-[pressed]:scale-[0.92]"
    >
      <SendArrow />
    </div>
  )
}

function SlackActions() {
  const { ref, hoverProps } = useTarget('slack-draft-send')
  return (
    <div className="flex items-center gap-x-1.5">
      <div className="px-3 py-1.5 text-[14px]/[20px] font-book tracking-[0.14px] text-gray-700">Discard</div>
      <div
        ref={ref}
        {...hoverProps}
        className="demo-green rounded-full px-3 py-1.5 text-[14px]/[20px] font-book tracking-[0.14px] text-gray-200 transition-[filter,transform] duration-[120ms] data-[hovered]:brightness-110 data-[pressed]:scale-[0.94]"
      >
        Send
      </div>
    </div>
  )
}

function SlackDraftCard() {
  return (
    <div className="px-2 pb-6 pt-1.5">
      <div className="flex items-center gap-x-2">
        <SlackIcon />
        <div className="flex items-center gap-x-1.5">
          <div className="text-[14px]/[20px] font-book text-gray-800">Direct message to Kierra</div>
          <div className="font-geist-mono text-[14px]/[20px] tracking-[-0.28px] text-gray-500">draft</div>
        </div>
        <div className="ml-auto">
          <CopyIcon />
        </div>
      </div>
      <div className="relative mt-3.5 rounded-xl bg-black/[0.03] px-4 py-3">
        <div className="absolute inset-0">
          <img className="absolute inset-0 size-full rounded-xl bg-black/[0.03] object-cover" src={AVATARS.slackBg} alt="" width="1824" height="372" />
          <div className="absolute inset-0 rounded-xl border-[0.5px] border-black/[0.02]" />
        </div>
        <p className="relative text-pretty text-[14px]/[23px] tracking-[0.14px] text-gray-800">{SLACK_DRAFT}</p>
      </div>
    </div>
  )
}

function Composer() {
  const { step, S } = useDemo()
  const input = useTarget('composer-input')
  const focused = (step >= S.DraftFocus && step < S.PersonOpen) || (step >= S.TeaFocus && step < S.SlackDraftMessage)
  const draft = draftFor(step, S, 'SlackDraftMessage')
  const slackOpen = step >= S.SlackDraftOpen && step < S.NextStepSent

  return (
    <motion.div className="demo-composer flex flex-col bg-gray-75 p-2" initial={false} animate={{ borderRadius: slackOpen ? 16 : 24 }} transition={GROW}>
      <AnimatePresence initial={false}>
        {slackOpen && (
          <motion.div key="takeover" className="overflow-hidden" initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0, opacity: 0 }} transition={GROW}>
            <motion.div initial={{ opacity: 0, y: 10, filter: 'blur(6px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={GROW_IN}>
              <SlackDraftCard />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex items-end gap-x-2">
        <div className="p-2">
          <PlusIcon />
        </div>
        <div ref={input.ref} className={`min-w-0 flex-1 py-[5.5px] text-[15px]/[21px] ${draft ? 'text-gray-900' : 'text-gray-500'}`}>
          {draft ? (
            <DraftText draft={draft} focused={focused} />
          ) : (
            <div className="truncate">
              {focused && <Caret />}
              Ask about Quota...
            </div>
          )}
        </div>
        {slackOpen ? <SlackActions /> : <SendButton />}
      </div>
    </motion.div>
  )
}

/* ---------- Chat column ---------- */

function chipsFor(step, S) {
  if (step >= S.NextStepSuggestions) return CHIPS.next
  if (step >= S.SlackDraftSuggestions) return CHIPS.slack
  if (step >= S.TeaType) return CHIPS.tea
  if (step >= S.PersonMorph) return CHIPS.person
  if (step >= S.MeetingSuggestions) return CHIPS.meeting
  if (step >= S.DealSuggestions) return CHIPS.deal
  return CHIPS.quota
}

function ChatColumn() {
  const { step, S } = useDemo()
  return (
    <div className="isolate flex h-full flex-col justify-end overflow-hidden px-4 xl:px-10">
      <div className="sticky top-0 z-[1] bg-gray-100 py-[7px]">
        <div className="demo-header-fade absolute left-0 top-full h-6 w-full" />
        <div className="flex items-center gap-x-2 py-[6.5px]">
          <QuotaIconHeader />
          <div className="text-[13px]/[19px] font-book tracking-[-0.13px] text-gray-900">Quota</div>
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-end">
        <div className="relative pb-[15px]">
          <div className="flex flex-col gap-y-8">
            <QuotaHistory />
            <Exchanges />
          </div>
          <div className="flex flex-col gap-y-3 pt-10">
            <Chips items={chipsFor(step, S)} className="lg:mx-2" />
            <Composer />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function DesktopDemo() {
  const { step, S } = useDemo()
  return (
    <>
      <div className="grid h-full grid-cols-[1fr_372px] lg:grid-cols-[1fr_304px] xl:grid-cols-[246px_1fr_302px]">
        <Sidebar className="hidden xl:block" />
        <RunFade className="h-full min-h-0 min-w-0">
          <ChatColumn />
        </RunFade>
        <div />
      </div>
      <PanelStack active={activePanelFor(step, S)} delay={0.3} suggested={step >= S.NextStepPlan} />
      <Cursor />
      <ChapterControl chapters={CHAPTERS} className="absolute left-1/2 top-[calc(100%+1px)] mt-[46px] -translate-x-1/2 xl:mt-4" />
    </>
  )
}
