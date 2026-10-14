import { typingEstimate } from './engine.jsx'

// Composer copy (shared by both layouts)
const DRAFT_BEFORE = 'Draft a Slack message to Kierra suggesting '
const DRAFT_AFTER = ' this week'
export const DRAFT = {
  before: DRAFT_BEFORE,
  after: DRAFT_AFTER,
  coffee: `${DRAFT_BEFORE}coffee${DRAFT_AFTER}`,
  tea: `${DRAFT_BEFORE}tea${DRAFT_AFTER}`,
  message: `${DRAFT_BEFORE}tea${DRAFT_AFTER}, and ask if anything is holding up the kickoff.`,
}
export const SLACK_DRAFT =
  'Hi Kierra! Would you be up for tea sometime this week? I’d love to hear how things are looking on your side, and whether there’s anything I can help move along before kickoff.'

const click = (target) => ({ target, action: 'click' })
const hover = (target) => ({ target })

// Desktop (md+) script — 29 steps
export const DESKTOP_SCRIPT = [
  { id: 'Quota', duration: 1200 },
  { id: 'DealClick', duration: 150, cursor: click('suggestion-deal') },
  { id: 'DealMessage', duration: 420, cursor: hover('suggestion-deal') },
  { id: 'DealOpen', duration: 300, cursor: hover('suggestion-deal') },
  { id: 'DealReply', duration: 500, cursor: hover('suggestion-deal') },
  { id: 'DealSuggestions', duration: 570, cursor: hover('suggestion-deal'), waitsFor: 'DealReply' },
  { id: 'MeetingClick', duration: 150, cursor: click('suggestion-meeting') },
  { id: 'MeetingMessage', duration: 600, cursor: hover('suggestion-meeting') },
  { id: 'MeetingReply', duration: 200, cursor: hover('suggestion-meeting') },
  { id: 'MeetingSuggestions', duration: 600, cursor: hover('suggestion-meeting'), waitsFor: 'MeetingReply' },
  { id: 'DraftClick', duration: 0, cursor: click('composer-input') },
  { id: 'DraftFocus', duration: 400, cursor: hover('composer-input') },
  { id: 'DraftType', duration: 300, cursor: hover('composer-input'), waitsFor: 'DraftType', estimate: typingEstimate(DRAFT.coffee) },
  { id: 'PersonClick', duration: 150, cursor: click('panel-deal-person') },
  { id: 'PersonOpen', duration: 1000, cursor: hover('panel-deal-person') },
  { id: 'PersonMorph', duration: 700, cursor: hover('panel-deal-person') },
  { id: 'TeaClick', duration: 0, cursor: click('composer-input') },
  { id: 'TeaFocus', duration: 300, cursor: hover('composer-input') },
  { id: 'TeaType', duration: 600, cursor: hover('composer-input'), waitsFor: 'TeaType', estimate: typingEstimate(DRAFT.message, DRAFT.tea) },
  { id: 'SlackDraftClick', duration: 150, cursor: click('composer-submit') },
  { id: 'SlackDraftMessage', duration: 600, cursor: hover('composer-submit') },
  { id: 'SlackDraftReply', duration: 200, cursor: hover('composer-submit') },
  { id: 'SlackDraftSuggestions', duration: 300, cursor: hover('composer-submit'), waitsFor: 'SlackDraftReply' },
  { id: 'SlackDraftOpen', duration: 1600, cursor: hover('composer-submit') },
  { id: 'NextStepClick', duration: 150, cursor: click('slack-draft-send') },
  { id: 'NextStepSent', duration: 900 },
  { id: 'NextStepReply', duration: 500 },
  { id: 'NextStepSuggestions', duration: 400, waitsFor: 'NextStepReply' },
  { id: 'NextStepPlan', duration: 3000 },
]

// Mobile (<md, touch) script — 24 steps
export const TOUCH_SCRIPT = [
  { id: 'Quota', duration: 1200 },
  { id: 'DealClick', duration: 150, cursor: click('suggestion-deal') },
  { id: 'DealOpen', duration: 300, cursor: hover('suggestion-deal') },
  { id: 'DealReply', duration: 500, cursor: hover('suggestion-deal') },
  { id: 'DealSuggestions', duration: 570, cursor: hover('suggestion-deal'), waitsFor: 'DealReply' },
  { id: 'MeetingClick', duration: 150, cursor: click('suggestion-meeting') },
  { id: 'MeetingReply', duration: 200, cursor: hover('suggestion-meeting') },
  { id: 'MeetingSuggestions', duration: 600, cursor: hover('suggestion-meeting'), waitsFor: 'MeetingReply' },
  { id: 'DraftClick', duration: 0, cursor: click('composer-input') },
  { id: 'DraftFocus', duration: 400, cursor: hover('composer-input') },
  { id: 'DraftType', duration: 300, cursor: hover('composer-input'), waitsFor: 'DraftType', estimate: typingEstimate(DRAFT.coffee) },
  { id: 'PersonClick', duration: 150, cursor: click('panel-deal-person') },
  { id: 'PersonOpen', duration: 1000, cursor: hover('panel-deal-person') },
  { id: 'PersonMorph', duration: 700, cursor: hover('panel-deal-person') },
  { id: 'TeaClick', duration: 0, cursor: click('composer-input') },
  { id: 'TeaFocus', duration: 300, cursor: hover('composer-input') },
  { id: 'TeaType', duration: 600, cursor: hover('composer-input'), waitsFor: 'TeaType', estimate: typingEstimate(DRAFT.message, DRAFT.tea) },
  { id: 'SlackDraftClick', duration: 150, cursor: click('composer-submit') },
  { id: 'SlackDraftOpen', duration: 1000, cursor: hover('composer-submit'), waitsFor: 'SlackDraftOpen' },
  { id: 'NextStepClick', duration: 150, cursor: click('slack-draft-send') },
  { id: 'NextStepSent', duration: 300 },
  { id: 'NextStepReply', duration: 500 },
  { id: 'NextStepSuggestions', duration: 400, waitsFor: 'NextStepReply' },
  { id: 'NextStepPlan', duration: 3000 },
]

// Chapter pills: label + first step id
export const CHAPTERS = [
  { label: 'Quota', start: 'Quota' },
  { label: 'Meeting', start: 'MeetingClick' },
  { label: 'Draft', start: 'PersonClick' },
  { label: 'Slack', start: 'SlackDraftClick' },
  { label: 'Next step', start: 'NextStepClick' },
]

// Suggestion chip sets (ids persist across sets so the "first" chip morphs its label)
export const CHIPS = {
  quota: [
    { id: 'first', label: 'Unblock Holloway’s signature', target: 'suggestion-deal' },
    { id: 'second', label: 'Review open deals' },
    { id: 'third', label: 'Plan my path to $90k' },
  ],
  deal: [
    { id: 'first', label: 'Suggest meeting in person', target: 'suggestion-meeting' },
    { id: 'second', label: 'Draft a follow-up' },
  ],
  meeting: [
    { id: 'first', label: 'Draft an invite' },
    { id: 'second', label: 'Draft a follow-up' },
    { id: 'third', label: 'Review deal history' },
  ],
  person: [
    { id: 'first', label: 'Find a place nearby' },
    { id: 'second', label: 'Review past conversations' },
  ],
  tea: [{ id: 'first', label: 'Find a place nearby' }],
  slack: [{ id: 'first', label: 'Make it shorter' }],
  next: [
    { id: 'first', label: 'Add to plan' },
    { id: 'second', label: 'Set a reminder' },
    { id: 'third', label: 'Draft the follow-up' },
  ],
}

/** Which side panel is on top of the stack for a given step. */
export const activePanelFor = (step, S) =>
  step >= S.NextStepSent ? 'deal' : step >= S.PersonOpen ? 'person' : step >= S.DealOpen ? 'deal' : 'quota'

/** Composer draft state for a step. `end` is the step where the draft leaves the composer. */
export function draftFor(step, S, end) {
  if (step >= S[end]) return undefined
  if (step >= S.TeaType) return { type: 'typing', step: S.TeaType, text: DRAFT.message, from: DRAFT.tea }
  if (step >= S.PersonClick) return { type: 'morph', word: step >= S.PersonMorph ? 'tea' : 'coffee' }
  if (step >= S.DraftType) return { type: 'typing', step: S.DraftType, text: DRAFT.coffee, from: '' }
  return undefined
}

export const AVATARS = {
  kierra: '/assets/demo/kierra-torres.png',
  cooper: '/assets/demo/cooper-franci.png',
  emery: '/assets/demo/emery-botosh.png',
  alfredo: '/assets/demo/alfredo-bergson.png',
  owner: '/assets/demo/eminem.png',
  slackBg: '/assets/demo/slack-background.png',
}
