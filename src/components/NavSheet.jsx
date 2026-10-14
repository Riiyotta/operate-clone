import PanelHoles from './shell/PanelHoles.jsx'
import { LogoMark } from './shell/Rules.jsx'

// CLONE_SPEC §3 — nav sheet. Not sticky; no menu; "Try it out" is lg+ only.
export default function NavSheet() {
  return (
    <div className="relative isolate h-[34px] border max-md:home-outline md:border-stone-800 lg:h-[58px]">
      <PanelHoles variant="bar" bgClassName="bg-nav-sheet" />
      <div
        className={[
          'absolute inset-x-[31px] top-1/2 flex h-[19px] -translate-y-1/2 items-center justify-between',
          'bg-strip/60 px-3 home-strip-y',
          "font-cinetype text-[11.2px]/[19.2px] uppercase tracking-[0.05em] text-waitlist-dark-green [font-feature-settings:'liga'_off]",
          'lg:inset-x-[50px] lg:h-6 lg:bg-strip/70 lg:px-[22px] lg:text-[14px]/[24px] lg:home-rule-y',
        ].join(' ')}
      >
        <span className="lg:pl-0.5">Operate</span>
        <LogoMark className="h-2.5 w-5 lg:absolute lg:left-1/2 lg:h-[13px] lg:w-[25px] lg:-translate-x-1/2" />
        <a className="hidden lg:block" href="/sign-up">
          <span aria-hidden="true">˗ˏˋ </span>Try it out<span aria-hidden="true"> ˎˊ-</span>
        </a>
      </div>
    </div>
  )
}
