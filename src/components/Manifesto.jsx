import { RuleArc, RuleCap, VRule } from './shell/Rules.jsx'

// CLONE_SPEC §7 — "Software doesn't close deals. You do."

// Four punched binder holes in the green panel (lg+).
const PANEL_HOLES = [
  'radial-gradient(circle at calc(50% - 24px) 61px, transparent 7.5px, #000 8px)',
  'radial-gradient(circle at calc(50% + 24px) 61px, transparent 7.5px, #000 8px)',
  'radial-gradient(circle at calc(50% - 24px) calc(100% - 61px), transparent 7.5px, #000 8px)',
  'radial-gradient(circle at calc(50% + 24px) calc(100% - 61px), transparent 7.5px, #000 8px)',
].join(', ')

const PANEL_INSET = '-left-[17px] -right-[17px] bottom-[25px] top-[25px] xl:-left-7 xl:-right-7 xl:bottom-[99px] xl:top-[99px]'

// Small paper-coloured "hole" above paragraphs 1 and 2 (below md only).
const PARAGRAPH_HOLE =
  "relative max-md:before:absolute max-md:before:-top-5 max-md:before:left-1/2 max-md:before:size-3 max-md:before:-translate-x-1/2 max-md:before:rounded-full max-md:before:bg-waitlist-paper max-md:before:content-['']"

const LOGO_CLASSES = [
  'absolute h-auto max-w-none',
  'max-md:[--home-you-logo-width:clamp(7.5rem,38cqw,8.125rem)]',
  'w-[calc(var(--home-you-logo-width)_*_428_/_420)]',
  'left-[calc(50%_+_50cqw_-_10.125px_-_213.4_*_var(--home-you-logo-width)_/_420)]',
  'bottom-[calc(-7.27_*_var(--home-you-logo-width)_/_420)]',
  'md:bottom-auto md:top-full md:left-[calc(-4_*_16rem_/_420)] md:w-[calc(16rem_*_428_/_420)] md:bg-manifesto',
  'home-you-wide:top-auto home-you-wide:w-[calc(var(--home-you-logo-width)_*_428_/_420)]',
  'home-you-wide:left-[calc(25cqw_-_28px_-_var(--home-rule)_/_6_-_156.1_*_var(--home-you-logo-width)_/_420)]',
  'home-you-wide:bottom-[calc(-9px_-_7.27_*_var(--home-you-logo-width)_/_420)] home-you-wide:bg-transparent',
].join(' ')

function TicketCard() {
  return (
    <div className={`pointer-events-none absolute ${PANEL_INSET}`}>
      <div className="absolute right-[9px] top-[9px] flex flex-col rounded-[3px] bg-waitlist-light-green px-1.5 pb-[3px] pt-2 text-stone-800 md:right-3 md:top-3 md:rounded md:px-2 md:pb-1 md:pt-[11px]">
        <div className="flex items-baseline justify-between">
          <span className="font-cinetype text-[14.5px]/[22px] md:text-[18px]/[20px]">OPERATE</span>
          <span className="font-courier text-[9.6px]/[11px] font-light md:text-[12px]/[14px]">2.0</span>
        </div>
        <hr className="-mt-1 border-t-[0.5px] border-stone-800 md:-mt-0.5" />
        <span className="font-cinetype text-[7.2px]/[9px] md:text-[9px]/[11px]">Subject</span>
        <span className="mt-[3.5px] font-courier text-[8.75px]/[10px] md:mt-1.5 md:text-[10.958px]/[12px]">A PROPER PLACE TO WORK</span>
        <hr className="mt-[3px] border-t-[0.5px] border-stone-800 md:mt-1" />
        <dl className="grid grid-cols-3 [&>:not(:last-child)]:border-r-[0.5px] [&>:not(:last-child)]:border-current">
          {[
            ['Date', '2026'],
            ['Vol.', '1'],
            ['Ref.', 'B001'],
          ].map(([term, value], i) => (
            <div key={term} className={i === 0 ? 'pb-0.5' : 'pb-0.5 pl-0.5'}>
              <dt className="font-cinetype text-[7.2px]/[9px] md:text-[9px]/[11px]">{term}</dt>
              <dd className="mt-[0.5px] font-courier text-[9.6px]/[11px] md:text-[12px]/[14px]">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}

export default function Manifesto() {
  return (
    <section className="relative mt-12 pb-[84px] pt-[72px] text-[15px]/[20px] text-waitlist-dark-green [container-type:inline-size] md:mt-16 md:pb-28 md:pt-[140px] xl:text-[18px]/[24px] home-you-wide:pb-[91px] home-you-wide:pt-[111px]">
      {/* green panel */}
      <div
        className={`absolute bg-manifesto ${PANEL_INSET} lg:[mask-composite:intersect] lg:[mask-image:var(--home-you-holes)]`}
        style={{ '--home-you-holes': PANEL_HOLES }}
      />

      {/* rules + caps */}
      <VRule className="bottom-0 left-0 top-0 lg:hidden" />
      <RuleArc
        bend="bottom"
        side="left"
        radius={112}
        className="left-[calc(var(--home-rule)/2)] top-0 hidden h-[calc(100%-var(--home-rule)/2)] lg:block"
      />
      <RuleCap className="bottom-0 left-[calc(112px+var(--home-rule)/2)] hidden lg:block" />
      <VRule className="right-0 top-0 h-full" />
      <RuleCap className="bottom-0 right-0 hidden lg:block" />
      <RuleCap className="left-0 top-0 md:hidden" />
      <RuleCap className="bottom-0 right-0 md:hidden" />
      <VRule className="left-1/2 top-0 hidden h-full -translate-x-1/2 md:block xl:hidden" />
      <VRule className="left-1/3 top-0 hidden h-full -translate-x-1/3 xl:block home-you-wide:hidden" />
      <VRule className="left-2/3 top-0 hidden h-full -translate-x-2/3 xl:block home-you-wide:hidden" />
      <VRule className="left-1/4 top-0 hidden h-full -translate-x-1/3 home-you-wide:block" />
      <VRule className="left-2/4 top-0 hidden h-full -translate-x-2/3 home-you-wide:block" />
      <RuleCap className="left-2/4 top-0 hidden home-you-wide:block" />
      <VRule className="left-3/4 top-0 hidden h-1/2 -translate-x-2/3 home-you-wide:block" />
      <RuleCap className="bottom-0 left-3/4 hidden home-you-wide:block" />

      {/* content */}
      <div className="relative px-[18px] md:px-7 xl:pb-[84px] xl:pt-[73px] home-you-wide:grid home-you-wide:grid-cols-4 home-you-wide:gap-x-14">
        <div className="relative [--home-you-bounce-height:0px] md:[--home-you-bounce-height:calc(16rem*228/420)] home-you-wide:col-span-3 home-you-wide:[--home-you-bounce-height:0px]">
          <div className="relative columns-1 gap-x-14 [column-fill:balance] md:columns-2 xl:columns-3">
            <h2 className="relative mb-7 whitespace-pre text-[24px]/[30px] font-semibold text-waitlist-dark-green break-inside-avoid break-after-avoid md:mb-10 xl:-mt-3 xl:mb-8 xl:text-[32px]/[36px]">
              <RuleCap className="-left-7 top-2 hidden lg:block" />
              <span className="block h-[1lh]">Software</span>
              <span className="ml-[54px] block h-[1lh] xl:ml-[46px]">doesn't</span>
              <span className="ml-[89px] block h-[1lh] md:ml-[92px]">close deals.</span>
              <span className="mt-2 block h-[1lh] md:mt-7">You do.</span>
            </h2>
            <p className={`${PARAGRAPH_HOLE} mb-7 text-pretty md:mb-5 xl:mb-6`}>
              So it's strange that sales teams revolve around CRMs that were never built for you. They were built for storing things.
              And no matter how well organized or how fully automated, storage rooms were never the point.
            </p>
            <p className={`${PARAGRAPH_HOLE} mb-5 text-pretty xl:mb-6`}>
              We think you deserve <strong className="font-semibold">a proper place to work.</strong> Call it a workshop, a studio, a
              lab, a kitchen. Wherever you do your best work. Same materials, same tools, but intentionally prepared and arranged.
              Everything exactly where your hand expects it.
            </p>
            <p className="mb-5 text-pretty xl:mb-6">
              A place like that remembers what you can't, surfaces what matters, keeps you on pace.
            </p>
            <p className="text-pretty">
              The relationships, the judgment calls, the close — that part has always been yours. We just built a better place to do
              it.
            </p>
            <div aria-hidden="true" className="break-inside-avoid pt-10 xl:pt-12">
              <div className="h-[calc(2lh+var(--home-you-bounce-height))]" />
            </div>
          </div>

          {/* signature */}
          <div className="absolute inset-x-0 bottom-[var(--home-you-bounce-height)] grid grid-cols-1 gap-x-14 pb-2 md:grid-cols-2 xl:grid-cols-3">
            <p className="relative w-fit md:col-start-2 xl:col-start-3">
              <strong className="block h-[1lh] font-semibold">Team Operate</strong>
              <time className="block h-[1lh]" dateTime="2026-09-30">
                09.30.26
              </time>
              {/* Self-animating SVG (7.875s CSS loop inside the file); static still for reduced motion. */}
              <picture>
                <source media="(prefers-reduced-motion: reduce)" srcSet="/assets/logo-trace-still.svg" />
                <img alt="" loading="lazy" decoding="async" width="428" height="228" className={LOGO_CLASSES} src="/assets/logo-trace-loop.svg" />
              </picture>
            </p>
          </div>
        </div>
      </div>

      <TicketCard />
    </section>
  )
}
