import { INTEGRATION_LOGOS } from '../lib/integrationLogos.js'
import { openVideoLightbox, preloadVideoPlayer } from '../lib/videoLightbox.js'
import { RuleArc, RuleCap, ScaledArc } from './shell/Rules.jsx'

// CLONE_SPEC §4 — hero.
const BUBBLE_SHADOW =
  'shadow-[0_0_0_1.83px_#EBEBEB,0_7.33px_14.67px_-7.33px_rgba(0,0,0,0.12),0_0_1.83px_rgba(0,0,0,0.08),0_0_0_0.55px_rgba(0,0,0,0.08),0_0.92px_0.92px_-0.46px_rgba(0,0,0,0.06),0_1.83px_1.83px_-0.92px_rgba(0,0,0,0.08),inset_0_0.92px_1.83px_#fff]'

const BUTTON =
  'rounded-[10px] border px-3 py-[5.5px] text-[16px]/[19px] transition-colors duration-150 ease-out md:rounded-xl md:px-[15px] md:py-[7px] md:text-[18px]/[20px]'

function IntegrationBubbles() {
  return (
    <span className="whitespace-nowrap">
      (
      <span className="mx-[0.2em] inline-block">
        {INTEGRATION_LOGOS.map((svg, i) => (
          <span
            key={i}
            aria-hidden="true"
            className={`relative inline-block size-[0.9167em] rounded-full align-middle [&:not(:first-child)]:-ml-[0.1833em] ${BUBBLE_SHADOW} ${
              i === 0 ? 'bg-waitlist-paper' : 'bg-bubble'
            }`}
            dangerouslySetInnerHTML={{ __html: svg }}
          />
        ))}
      </span>
      <span className="sr-only">Granola, Gong, Slack, Gmail, HubSpot and more</span>
      )
    </span>
  )
}

export default function Hero() {
  return (
    <section>
      <div className="grid gap-y-6 md:grid-cols-2">
        {/* left cell */}
        <div className="relative px-[18px] py-[11px] home-rule-x md:px-7 md:pb-[30px] md:pt-1 md:home-rule-l lg:pb-[73px] lg:pt-5">
          <RuleCap className="left-0 top-0 hidden lg:block" />
          <RuleCap className="left-0 top-0 md:hidden" />
          <RuleCap className="bottom-0 right-0 md:hidden" />
          <RuleCap className="right-[18px] top-0 hidden xl:block" />
          <ScaledArc
            d="M1 0A1 1 0 0 1 0 1"
            className="right-[calc(18px+var(--home-rule)/2)] top-2 hidden aspect-square h-[calc(100%-8px-var(--home-rule)/2)] xl:block"
          />
          <h1 className="max-w-[400px] text-[36px]/[42px] font-semibold text-waitlist-dark-green md:text-[48px]/[56px]">
            Collaborative AI for frontier sales organizations
          </h1>
        </div>

        {/* right cell */}
        <div className="relative flex flex-col items-start gap-y-[22px] px-[18px] pt-1.5 home-rule-l md:px-[34px] md:pt-3.5 md:home-rule-x lg:gap-y-[51px] lg:pt-8 lg:home-rule-l">
          <RuleCap className="left-0 top-0 md:hidden" />
          <RuleCap className="bottom-0 right-[calc(85px+var(--home-rule)/2)] md:hidden" />
          <RuleArc bend="bottom" radius={90} className="right-[calc(var(--home-rule)/2)] top-0 h-[calc(100%-var(--home-rule)/2)] md:hidden" />
          <RuleCap className="bottom-0 left-0 hidden lg:block" />
          <RuleCap className="right-[calc(112px+var(--home-rule)/2)] top-0 hidden lg:block" />
          <RuleArc
            bend="top"
            radius={112}
            className="right-[calc(var(--home-rule)/2)] top-[calc(var(--home-rule)/2)] hidden h-[calc(100%-var(--home-rule)/2)] lg:block"
          />

          <p className="max-w-[488px] text-[16px]/[22px] text-waitlist-dark-green md:text-[20px]/[27px]">
            We connect to your sales data <IntegrationBubbles /> to surface where every deal stands and what’s next. Your team and
            your agents act on it together, and you run like a team twice your size.
          </p>

          <div className="flex flex-col-reverse items-start gap-2 [reading-flow:flex-visual] md:flex-row md:flex-wrap md:gap-1">
            <a
              className={`${BUTTON} border-waitlist-gray bg-waitlist-dark-green text-waitlist-gray hover:border-waitlist-dark-green hover:bg-white hover:text-waitlist-dark-green`}
              href="/sign-up"
            >
              Get started
            </a>
            <button
              type="button"
              aria-haspopup="dialog"
              className={`${BUTTON} border-waitlist-dark-green bg-waitlist-paper text-waitlist-dark-green hover:bg-white`}
              onPointerEnter={preloadVideoPlayer}
              onPointerDown={preloadVideoPlayer}
              onFocus={preloadVideoPlayer}
              onClick={(e) => openVideoLightbox({ trigger: e.currentTarget })}
            >
              Watch the video
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
