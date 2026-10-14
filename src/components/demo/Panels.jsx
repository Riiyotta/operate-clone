import { useMemo } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useTarget } from './engine.jsx'
import { AVATARS } from './scripts.js'
import {
  CalendarIcon,
  CheckDone,
  CheckOpen,
  ClockIcon,
  CompassIcon,
  GmailIcon,
  GongIcon,
  HandshakeIcon,
  HollowayLogo,
  IdCardIcon,
  MemoryIcon,
  NegotiationIcon,
  ObjectiveIcon,
  QuotaIcon24,
  SlackIcon,
  SyncedIcon,
  TagIcon,
  TileBramble,
  TileFielded,
  TileHalden,
  TileHolloway,
  TileTideline,
} from './icons.jsx'

const EASE_OUT_CUBIC = [0.33, 1, 0.68, 1]
const EXPAND = { duration: 0.4, ease: [0.22, 1, 0.36, 1] }

/* ---------- shared bits ---------- */

const Title = ({ children }) => (
  <div className="text-[15px]/[24px] font-medium text-gray-900 md:text-[17px]/[24px] md:tracking-[-0.255px]">{children}</div>
)

const Tags = ({ items }) => (
  <div className="flex items-center gap-x-1.5">
    {items.map(({ icon, label }) => (
      <div
        key={label}
        className="flex items-center gap-x-1 rounded-md border-[0.5px] border-black/[0.02] bg-black/[0.03] py-[1.5px] pl-[3.5px] pr-[7.5px] md:py-[3.5px]"
      >
        {icon}
        <div className="text-[11px]/[14px] font-book text-gray-700 md:text-[12px]/[16px]">{label}</div>
      </div>
    ))}
  </div>
)

const Well = ({ className = '', children }) => (
  <div className={`rounded-2xl border border-black/[0.02] bg-black/[0.03] p-[3.5px] ${className}`}>{children}</div>
)

const WellHeader = ({ icon, label, meta }) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-x-1.5 md:gap-x-2">
      {icon}
      <div className="text-[12px]/[17px] font-book text-gray-700 md:text-[14px]/[20px]">{label}</div>
    </div>
    {meta && <div className="text-[12px]/[17px] text-gray-500">{meta}</div>}
  </div>
)

const SectionLabel = ({ children }) => (
  <div className="pl-2 text-[12px]/[17px] font-book text-gray-800 md:pl-3 md:text-[14px]/[20px]">{children}</div>
)

/* ---------- Monthly Quota ---------- */

const barBg = (color) => ({ background: `linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 100%), ${color}` })
const barLabel = 'absolute top-[calc(100%+6px)] text-[12px]/[17px] text-gray-500'
const LEGEND = [
  { color: '#117025', value: '$56k', label: 'booked' },
  { color: '#85C093', value: '$92k', label: 'commit' },
  { color: '#4184E7', value: '$121k', label: 'best case' },
]

function Progress() {
  return (
    <div className="demo-inner-card rounded-xl bg-white p-2 md:px-3 md:pt-3">
      <div className="relative">
        <div className="demo-bar-track h-3 w-full rounded-full" />
        <div className="absolute left-0 top-0 h-full w-[93.08%]">
          <div className="demo-bar-fill relative size-full rounded-full" style={barBg('#4184E7')}>
            <div className={`${barLabel} left-0`}>$0</div>
          </div>
          <div className="absolute right-[25.62%] top-1/2 z-10 -translate-y-1/2 translate-x-1/2">
            <div className="demo-bar-marker h-4 w-0.5 rounded-full bg-gray-100" />
          </div>
          <div className={`${barLabel} right-[25.62%] translate-x-1/2`}>$90k</div>
        </div>
        <div className="absolute left-0 top-0 h-full w-[74%]">
          <div className="demo-bar-fill size-full rounded-full" style={barBg('#85C093')} />
        </div>
        <div className="absolute left-0 top-0 h-full w-[43.08%]">
          <div className="demo-bar-fill size-full rounded-full" style={barBg('#117025')} />
          <div className="absolute right-[19.64%] top-1/2 -translate-y-1/2 translate-x-1/2">
            <div className="demo-bar-marker size-1.5 rounded-full bg-gray-100" />
          </div>
          <div className={`${barLabel} right-[19.64%] translate-x-1/2`}>Pace</div>
        </div>
      </div>
      <hr className="mt-[30px] border-t-[0.5px] border-black/[0.08] md:mt-[35px]" />
      <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-0.5 md:gap-x-2.5">
        {LEGEND.map(({ color, value, label }) => (
          <div key={label} className="flex items-center">
            <div className="demo-bar-fill size-2 shrink-0 rounded-[3px]" style={barBg(color)} />
            <div className="ml-1 text-[11px]/[15px] text-gray-700 md:text-[12px]/[17px]">{value}</div>
            <div className="ml-0.5 text-[11px]/[15px] text-gray-500 md:text-[12px]/[17px]">{label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function DealGroup({ title, value, deals }) {
  return (
    <div>
      <div className="flex items-center gap-x-2 pl-2 md:pl-3">
        <div className="text-[12px]/[17px] font-book text-gray-800 md:text-[14px]/[20px]">{title}</div>
        <div className="text-[12px]/[17px] text-gray-700">{value}</div>
      </div>
      <div className="mt-1.5">
        {deals.map(({ logo, name, status, stage, value: v }) => (
          <div key={name} className="flex gap-x-2 px-2 py-1.5 md:gap-x-3 md:px-3 md:py-2">
            <div className="flex size-9 items-center justify-center rounded-lg bg-black/[0.04] shadow-[0_0_0_0.5px_rgba(0,0,0,0.04)_inset] md:size-10 md:rounded-[10px]">
              {logo}
            </div>
            <div className="flex flex-1 flex-col gap-y-[3px]">
              <div className="text-[12px]/[17px] text-gray-800 md:text-[14px]/[20px]">{name}</div>
              <div className="flex gap-x-1 text-[11px]/[15px] text-gray-700 md:gap-x-1.5 md:text-[12px]/[17px]">
                <div>{status}</div>
                <div>·</div>
                <div className="flex-1 truncate">{stage}</div>
              </div>
            </div>
            <div className="text-[12px]/[17px] text-gray-800 md:text-[14px]/[20px]">{v}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function QuotaPanel() {
  return (
    <div className="pb-2">
      <div className="p-3 md:p-4">
        <div className="flex items-center gap-x-2.5">
          <div className="demo-quota-icon rounded-md bg-white">
            <QuotaIcon24 />
          </div>
          <Title>Monthly Quota</Title>
        </div>
        <Well className="mt-3 md:mt-4">
          <div className="flex flex-col gap-y-2.5 px-2 pb-2 pt-[7.5px] md:gap-y-3.5 md:px-3 md:pb-3 md:pt-2.5">
            <WellHeader icon={<ObjectiveIcon />} label="Objective" />
            <div className="text-pretty text-[12px]/[19px] text-gray-800 md:text-[14px]/[20px]">
              Close $90K in new business by the end of September. Track attainment daily and keep the highest-value open deals moving.
            </div>
          </div>
          <Progress />
        </Well>
      </div>
      <div className="mt-[12.5px] px-1 md:mt-4">
        <DealGroup
          title="Commit"
          value="$36k"
          deals={[
            { logo: <TileHolloway />, name: 'Holloway', status: 'Contract out for signature', stage: 'Closes Sep 15', value: '$18k' },
            { logo: <TileTideline />, name: 'Tideline', status: 'Verbal yes', stage: 'In security review', value: '$12k' },
            { logo: <TileBramble />, name: 'Bramble', status: 'Pricing agreed', stage: 'Closes Sep 26', value: '$6k' },
          ]}
        />
        <hr className="mx-2 my-[15.5px] border-t-[0.5px] border-black/[0.12] md:mx-0 md:my-6" />
        <DealGroup
          title="Best case"
          value="$29k"
          deals={[
            { logo: <TileFielded />, name: 'Fielded', status: 'Gone quiet 9 days', stage: 'Closes Sep 24', value: '$4k' },
            { logo: <TileHalden />, name: 'Halden', status: 'Champion aligned', stage: 'Needs exec sign-off', value: '$25k' },
          ]}
        />
      </div>
    </div>
  )
}

/* ---------- Holloway (deal) ---------- */

const TODOS = [
  { task: 'Send final contract to Holloway', done: true, due: '3w ago' },
  { task: 'Confirm legal sign-off', done: true, due: '2w ago' },
  { task: 'Chase signature after Sep 15', done: true, due: '2d ago' },
  { task: 'Book kickoff on signing', done: false, due: 'Today' },
]
const SUGGESTED = { task: 'Follow up with Kierra after tea', done: false, due: 'Suggested', suggested: true }

const PEOPLE = [
  { src: AVATARS.kierra, name: 'Kierra Torres', title: 'Co-Founder & COO', label: 'Champion', target: 'panel-deal-person' },
  { src: AVATARS.cooper, name: 'Cooper Franci', title: 'Co-Founder & CEO', label: 'Decision maker' },
  { src: AVATARS.emery, name: 'Emery Botosh', title: 'Senior Revenue Manager' },
  { src: AVATARS.alfredo, name: 'Alfredo Bergson', title: 'Legal' },
]

function Todo({ task, done, due, suggested }) {
  return (
    <div className="flex items-center justify-between border-b-[0.5px] border-black/[0.08] pb-1.5 pr-2 pt-[6.5px] md:pb-[7.5px] md:pt-2">
      <div className="flex items-center gap-x-2">
        <div>{done ? <CheckDone /> : <CheckOpen />}</div>
        <div className={`text-[12px]/[19px] text-gray-600 md:text-[14px]/[24px] ${done ? 'line-through' : ''}`}>{task}</div>
      </div>
      <div className={`text-[12px]/[16px] ${suggested ? 'text-demo-accent' : done ? 'text-gray-500' : 'text-gray-700'}`}>{due}</div>
    </div>
  )
}

function Person({ src, name, title, label, target }) {
  const { ref, hoverProps } = useTarget(target)
  return (
    <div
      ref={ref}
      {...hoverProps}
      className="flex items-center gap-x-2 rounded-lg px-2 py-[7.5px] transition-colors duration-[120ms] data-[hovered]:bg-black/[0.04] data-[pressed]:bg-black/[0.06] md:px-3 md:py-2"
    >
      <div className="relative size-4">
        <img className="size-full rounded-full" src={src} alt={name} width="64" height="64" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-full border-[0.5px] border-black/[0.04]" />
      </div>
      <div className="flex min-w-0 items-center gap-x-1.5 whitespace-nowrap text-[11px]/[15px] text-gray-600 md:text-[12px]/[17px]">
        <div className="text-[12px]/[17px] text-gray-700 md:text-[14px]/[24px]">{name}</div>
        <div>·</div>
        <div>{title}</div>
        {label && (
          <>
            <div>·</div>
            <div className="truncate">{label}</div>
          </>
        )}
      </div>
    </div>
  )
}

function DealPanel({ suggested }) {
  return (
    <div className="pb-2">
      <div className="p-3 md:p-4">
        <div className="flex items-center gap-x-2.5">
          <HollowayLogo className="demo-logo-tile-flat rounded-lg" />
          <div className="flex items-center gap-x-1.5">
            <Title>Holloway</Title>
            <SyncedIcon />
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between md:mt-4">
          <Tags
            items={[
              { icon: <NegotiationIcon />, label: 'Negotiation' },
              { icon: <TagIcon />, label: '$18k' },
              { icon: <CalendarIcon />, label: '6 Aug' },
            ]}
          />
          <img className="demo-owner-avatar size-5 rounded-full" src={AVATARS.owner} alt="Marshall Mathers" width="80" height="80" />
        </div>
        <Well className="mt-1.5 md:mt-2">
          <div className="flex flex-col gap-y-2.5 px-2 pb-2 pt-[7.5px] md:gap-y-3.5 md:px-3 md:pb-3 md:pt-2.5">
            <WellHeader icon={<CompassIcon />} label="Deal plan" meta="2d ago via slack" />
            <div className="text-pretty text-[12px]/[19px] text-gray-800 md:text-[14px]/[20px]">
              <p>Holloway is ready to get started. All known checks are clear. The contract is with Cooper for signature.</p>
              <p className="mt-2.5 md:mt-5">Done when: signed contract back and kickoff on the calendar.</p>
            </div>
          </div>
          <div className="demo-inner-card mt-1 rounded-xl bg-white md:mt-0">
            <div className="flex flex-col px-3">
              {TODOS.map((t) => (
                <Todo key={t.task} {...t} />
              ))}
              <AnimatePresence initial={false}>
                {suggested && (
                  <motion.div
                    key="suggested"
                    className="overflow-hidden"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={EXPAND}
                  >
                    <Todo {...SUGGESTED} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </Well>
      </div>
      <div className="mt-[12.5px] px-1 md:mt-4">
        <SectionLabel>People</SectionLabel>
        <div className="mt-1.5 md:mt-[7px]">
          {PEOPLE.map((p) => (
            <Person key={p.name} {...p} />
          ))}
        </div>
      </div>
    </div>
  )
}

/* ---------- Kierra Torres (person) ---------- */

const PERSON_LISTS = [
  {
    title: 'Sources',
    items: [
      { icon: <GmailIcon tall />, title: 'Replied on the security summary', meta: '2d' },
      { icon: <GongIcon />, title: 'Led the rollout planning call', meta: '1w' },
      { icon: <SlackIcon tall />, title: 'Quoted by Cooper in #holloway', meta: '2w' },
    ],
  },
  {
    title: 'Related',
    items: [
      { icon: <NegotiationIcon tall />, title: 'DEAL-132', meta: '$18k' },
      { icon: <HollowayLogo size={16} className="demo-logo-tile-sm rounded-[5px]" />, title: 'Holloway', meta: 'Account' },
    ],
  },
]

function PersonPanel() {
  return (
    <div className="pb-2">
      <div className="p-3 md:p-4">
        <div className="flex items-center gap-x-2.5">
          <div className="relative">
            <img className="size-6 rounded-full" src={AVATARS.kierra} alt="Kierra Torres" width="64" height="64" />
            <div className="absolute inset-0 rounded-full border-[0.5px] border-black/[0.12]" />
          </div>
          <div className="flex items-center gap-x-1.5">
            <Title>Kierra Torres</Title>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between md:mt-4">
          <Tags
            items={[
              { icon: <IdCardIcon />, label: 'COO' },
              { icon: <HandshakeIcon />, label: 'Champion' },
              { icon: <ClockIcon />, label: '7:31 AM' },
            ]}
          />
          <HollowayLogo className="demo-logo-tile-person size-5 rounded-[6.25px] md:size-6 md:rounded-[7.5px]" />
        </div>
        <Well className="mt-1.5 md:mt-2">
          <div className="flex flex-col gap-y-2.5 px-2 pb-1 pt-[7.5px] md:gap-y-3.5 md:px-3 md:pb-2 md:pt-2.5">
            <WellHeader icon={<MemoryIcon />} label="Memory" meta="2d ago via slack" />
            <ul className="demo-bullets space-y-1.5 text-pretty text-[12px]/[17px] text-gray-800 md:space-y-3 md:text-[14px]/[20px]">
              <li>Prefers tea to coffee.</li>
              <li>Prefers Thursday calls — mornings, before her exec sync.</li>
              <li>Wants the SSO details in writing before anything goes to IT review.</li>
            </ul>
          </div>
        </Well>
      </div>
      <div className="mt-[12.5px] px-1 md:mt-4">
        {PERSON_LISTS.map(({ title, items }, i) => (
          <div key={title}>
            {i > 0 && <hr className="mx-2 my-[15px] border-[0.5px] border-black/[0.12] md:mx-3 md:my-[23px]" />}
            <SectionLabel>{title}</SectionLabel>
            <div className="mt-1.5 md:mt-[7px]">
              {items.map(({ icon, title: t, meta }) => (
                <div key={t} className="flex items-center gap-x-2 px-2 py-1.5 md:px-3 md:py-2.5">
                  {icon}
                  <div className="flex items-center gap-x-1.5 md:gap-x-2">
                    <div className="text-[12px]/[17px] text-gray-700 md:text-[14px]/[20px]">{t}</div>
                    <div className="text-[12px]/[17px] text-gray-500 md:text-[14px]/[20px]">{meta}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ---------- Stack ---------- */

const ORDER = ['quota', 'deal', 'person']
const PEEK = {
  // desktop: older panels peek out above; mobile: below
  top: { origin: 'origin-top', dir: -1, depthOffset: 12, padding: 'p-[3.5px]' },
  bottom: { origin: 'origin-bottom', dir: 1, depthOffset: 6, padding: 'px-[3.5px] pt-[3.5px] pb-[15.5px]' },
}

function Card({ children }) {
  return (
    <div className="demo-panel-card relative overflow-hidden rounded-xl bg-white md:rounded-2xl">
      {children}
      <div className="demo-fade-white absolute bottom-0 left-0 h-4 w-full" />
    </div>
  )
}

export default function PanelStack({ active, delay = 0, suggested = false, peek = 'top' }) {
  const { origin, dir, depthOffset, padding } = PEEK[peek]
  const enterY = -(24 * dir)
  const top = ORDER.indexOf(active)
  const transition = { delay, duration: 0.625, ease: EASE_OUT_CUBIC, opacity: { delay, duration: 0.25, ease: EASE_OUT_CUBIC } }
  const deal = useMemo(() => <DealPanel suggested={suggested} />, [suggested])
  const content = { quota: <QuotaPanel />, deal, person: <PersonPanel /> }

  return (
    <div
      className={`grid h-[528px] grid-rows-[minmax(0,1fr)] *:col-start-1 *:row-start-1 md:absolute md:-right-3 md:top-12 md:h-[692px] md:w-[384px] md:p-0 lg:-right-14 lg:top-[104px] ${padding}`}
    >
      <AnimatePresence initial={false}>
        {ORDER.slice(0, top + 1).map((name, i) => {
          const depth = top - i
          return (
            <motion.div
              key={name}
              className={`grid grid-rows-[minmax(0,1fr)] will-change-[transform,opacity,filter] ${origin}`}
              initial={{ opacity: 0, y: enterY, filter: 'blur(0px)' }}
              animate={{ opacity: 1, y: dir * depth * depthOffset, scale: 1 - 0.0625 * depth, filter: `blur(${0.25 * depth}px)` }}
              exit={{ opacity: 0, y: enterY }}
              transition={transition}
            >
              <Card>{content[name]}</Card>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
