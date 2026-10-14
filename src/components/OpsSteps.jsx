import { useCallback, useEffect, useRef, useState } from 'react'
import { RuleCap } from './shell/Rules.jsx'

// CLONE_SPEC §6 — "Getting Operational with AI".
const STEPS = [
  {
    title: 'The Map',
    headline: 'See your pipeline clearly.',
    description:
      'We shadow your sales reps and managers to learn how your team sells. Together, we identify friction worth removing and ideas worth playbooking.',
    label: 'clarity',
    items: ['Where deals stall', 'What wins deals', 'Where to focus'],
  },
  {
    title: 'The Plan',
    headline: 'Give your team more ways to win.',
    description:
      'From CRM updates to follow-ups, we decide together what runs on its own, what goes to an agent, and what stays with your reps.',
    label: 'capacity',
    items: ['More selling time', 'Broader coverage', 'Consistent follow-through'],
  },
  {
    title: 'The Build',
    headline: 'Keep every deal moving.',
    description:
      "We connect your whole stack (CRM, calls, inbox, and more). Then we bring specialized agents into the deals your team is working, so the right context shows up right when it's needed.",
    label: 'momentum',
    items: ['Prepared for every call', 'Earlier risk signals', 'Faster deal progress'],
  },
  {
    title: 'The Rollout',
    headline: 'Watch the results compound.',
    description:
      "We stay involved as Operate learns your business, running it against real deals, fixing what's off, and tracking progress with you as coverage grows.",
    label: 'impact',
    items: ['More wins', 'Stronger adoption', 'Better retention'],
  },
]

const RULED_LINES =
  'url(\'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="3.5" height="24"><rect width="1" height="1" fill="%23117025"/></svg>\')'

// Active step = last <li> whose top has crossed the viewport's vertical middle.
function useActiveStep(itemsRef) {
  const [active, setActive] = useState(-1)
  const update = useCallback(() => {
    const threshold = 0.5 * window.innerHeight
    let index = -1
    itemsRef.current.forEach((el, i) => {
      if (el && el.getBoundingClientRect().top <= threshold) index = i
    })
    setActive(index)
  }, [itemsRef])

  useEffect(() => {
    let raf = requestAnimationFrame(update)
    // The original reads scroll through motion's useScroll, which applies on the next frame.
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(update)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', update)
    }
  }, [update])

  return active
}

function StepList() {
  const itemsRef = useRef([])
  const active = useActiveStep(itemsRef)

  return (
    <ol className="flex flex-col gap-y-[25px] pb-7 md:gap-y-[30px] md:pb-9">
      {STEPS.map((step, i) => (
        <li key={step.title} ref={(el) => (itemsRef.current[i] = el)}>
          <div className="flex items-center gap-x-3.5 border-y border-stone-800 bg-white/60 pb-0.5 pl-[3px] pr-[5px] pt-px md:pb-[0.5px] md:pr-1.5 md:pt-[1.5px]">
            <span className="text-[14.5px]/[1] text-stone-800 md:text-[18px]/[22px]">{i + 1}.</span>
            <h3 className="text-[14.5px]/[1] font-semibold text-waitlist-dark-green md:text-[18px]/[22px]">{step.title}</h3>
            <div aria-hidden="true" className="relative ml-auto size-2.5 shrink-0 rounded-full border border-stone-800 md:size-3">
              <div
                className={`absolute left-1/2 top-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-stone-800 transition-[transform,opacity] duration-200 ease-out-quint md:size-[7px] ${
                  i === active ? 'scale-100' : 'scale-0 opacity-0'
                }`}
              />
            </div>
          </div>
          <div className="pl-[5px] pt-[13px] md:pt-[15px]">
            <p className="text-[16px]/[22px] text-stone-800 md:text-[20px]/[27px]">
              <strong className="font-semibold">{step.headline}</strong> {step.description}
            </p>
            <div className="mt-[12.5px] flex items-start gap-x-[5px] text-waitlist-dark-green md:mt-4 md:gap-x-1.5">
              <span className="flex h-[1lh] shrink-0 items-center gap-x-[5px] text-[11px]/[calc(14/11)] md:gap-x-1.5 md:text-[14px]/[calc(14/11)]">
                <span className="shrink-0 rounded-[3px] border border-waitlist-dark-green px-0.5 text-[9.6px]/[11px] font-semibold uppercase md:px-[3px] md:text-[12px]/[14px]">
                  {step.label}
                </span>
                <span aria-hidden="true" className="shrink-0 border-y-[3px] border-l-[3px] border-y-transparent border-l-waitlist-dark-green" />
              </span>
              <span className="font-cinetype text-[11px]/[calc(14/11)] md:text-[14px]/[calc(14/11)]">{step.items.join(' · ')}</span>
            </div>
          </div>
        </li>
      ))}
    </ol>
  )
}

export default function OpsSteps() {
  return (
    <div className="mt-[50px] md:mt-[68px] lg:mt-24">
      <div className="relative home-rule-x md:grid md:grid-cols-[280px_1fr] xl:grid-cols-[280px_1fr_280px] 2xl:grid-cols-[311.5px_1fr_311.5px]">
        <div className="px-[18px] pt-[11px] md:px-7 md:pt-5 md:home-rule-r">
          <div>
            <h2 className="text-pretty text-[24px]/[1] font-semibold text-waitlist-dark-green md:text-[32px]/[36px]">
              Getting Operational with AI
            </h2>
            <p className="mt-4 max-w-[368px] text-pretty text-[16px]/[22px] text-waitlist-dark-green md:mt-[26px] md:max-w-[245px] md:text-[20px]/[27px]">
              Your team brings the relationships and the judgment. We bring everything they need to act on it.
            </p>
            <div className="relative mt-6 w-fit">
              <RuleCap className="-left-7 top-1/2 hidden -translate-y-1/2 lg:block" />
              <RuleCap className="-left-[18px] top-1/2 -translate-y-1/2 md:hidden" />
              <a
                className="block rounded-lg border-[1.25px] border-waitlist-dark-green px-[6.75px] py-[3.75px] text-[14px]/[16px] uppercase text-waitlist-dark-green transition-colors duration-150 ease-out hover:bg-white"
                href="/sign-up"
              >
                Talk to us
              </a>
            </div>
          </div>
        </div>

        <div className="relative px-[18px] pt-12 md:px-7 md:pt-6">
          <RuleCap className="-left-[var(--home-rule)] bottom-0 hidden lg:block" />
          <StepList />
        </div>

        <div className="relative hidden xl:block xl:px-7 xl:py-6 xl:home-rule-l">
          <RuleCap className="left-0 top-0" />
          <div aria-hidden="true" className="hidden size-full bg-repeat xl:block" style={{ backgroundImage: RULED_LINES }} />
        </div>

        <RuleCap className="left-0 top-0 hidden lg:block" />
        <RuleCap className="bottom-0 right-0 hidden lg:block" />
        <RuleCap className="left-0 top-0 md:hidden" />
        <RuleCap className="bottom-0 right-0 md:hidden" />
      </div>
    </div>
  )
}
