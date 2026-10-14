import { useEffect, useRef, useState } from 'react'
import { openVideoLightbox, preloadVideoPlayer, useVideoLightbox } from '../lib/videoLightbox.js'
import PanelHoles from './shell/PanelHoles.jsx'
import { LogoMark, RuleArc, RuleCap, ScaledArc, VRule } from './shell/Rules.jsx'

// CLONE_SPEC §8 — footer sheet.
const LINKS = [
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/operatehq', external: true },
  { label: 'X', href: 'https://x.com/operate_gtm', external: true },
]

const DOTTED_UNDERLINE = {
  width: 'calc(round(100%, 3px) + 1.5px)',
  borderBottom: '1.5px solid transparent',
  borderImage: 'repeating-linear-gradient(to right, transparent 0 1.5px, #117025 1.5px 3px)',
  borderImageSlice: 1,
}

// Label span: the original's global base gives every element border-color lab(0 0 0 / .1), so
// its transition-colors only ever animates color; pin that here so border-color doesn't follow
// currentColor (#117025 -> #e0e0e0) on hover.
function FooterLink({ label, href, external }) {
  return (
    <a
      className="group relative w-fit text-[12.8px]/[17px] text-waitlist-dark-green md:text-[16px]/[22px]"
      href={href}
      {...(external ? { target: '_blank' } : {})}
    >
      <span aria-hidden="true" className="pointer-events-none absolute left-0 top-[3px] h-[calc(100%-4px)]" style={DOTTED_UNDERLINE}>
        <span className="block h-full w-full bg-waitlist-dark-green opacity-0 transition-opacity duration-150 ease-out group-hover:opacity-100 group-focus-visible:opacity-100" />
      </span>
      <span className="relative border-[lab(0_0_0/0.1)] transition-colors duration-150 ease-out group-hover:text-waitlist-gray group-focus-visible:text-waitlist-gray">
        {label}
      </span>
    </a>
  )
}

// Muted loop that plays only while a mouse hovers the card (md+, no reduced motion).
function HoverVideo({ playing }) {
  const ref = useRef(null)
  useEffect(() => {
    const video = ref.current
    if (!video) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!playing || reduced) {
      video.pause()
      return
    }
    video.muted = true
    video.play().catch(() => {})
  }, [playing])

  return (
    <video
      ref={ref}
      aria-hidden="true"
      className="absolute inset-0 size-full rounded-[3px] object-cover motion-reduce:hidden max-md:hidden"
      src="/assets/footer-video-loop.mp4"
      muted
      loop
      playsInline
      preload="none"
      onLoadedMetadata={(e) => {
        e.currentTarget.currentTime = 0.25
      }}
    />
  )
}

function VideoCard() {
  const [hovered, setHovered] = useState(false)
  const frameRef = useRef(null)
  const { open } = useVideoLightbox()

  return (
    <button
      type="button"
      id="home-footer-video"
      aria-haspopup="dialog"
      aria-expanded={open}
      className="block w-[210px] cursor-pointer rounded-[6.5px] bg-video-card px-3 pb-[9px] pt-[10.5px] text-left md:w-[276px] md:px-[18px] md:pb-3 md:pt-3.5"
      onPointerEnter={(e) => {
        preloadVideoPlayer()
        if (e.pointerType === 'mouse') setHovered(true)
      }}
      onPointerLeave={() => setHovered(false)}
      onPointerDown={preloadVideoPlayer}
      onFocus={preloadVideoPlayer}
      onClick={(e) => openVideoLightbox({ trigger: e.currentTarget, morphEl: frameRef.current })}
    >
      <span className="flex items-center gap-x-[7.5px] md:gap-x-2.5">
        <span className="size-[9px] rounded-full bg-waitlist-dark-green md:size-3" />
        <span className="font-cinetype text-[11.24px]/[12.5px] tracking-[0.562px] text-waitlist-dark-green md:text-[14px]/[17px] md:tracking-[0.7px]">
          Watch the video
        </span>
      </span>
      <span ref={frameRef} className="mt-[7.5px] block bg-waitlist-light-green p-1.5 md:mt-[9px] md:p-2">
        <span className="relative block">
          {/* aspect-[256/155]: the original's next/image serves the 256w candidate at 1x, whose
              rounded 256x155 intrinsic ratio (not the 540x326 attrs) sizes the still: 224x135.625. */}
          <picture>
            <source media="(width < 48rem)" srcSet="/assets/home-footer-video-still-mobile.jpg" />
            <img
              alt=""
              loading="lazy"
              decoding="async"
              width="540"
              height="326"
              sizes="(min-width: 48rem) 228px, 174px"
              src="/assets/home-footer-video-still.jpg"
              className="aspect-[256/155] rounded-[3px]"
            />
          </picture>
          <HoverVideo playing={hovered} />
        </span>
      </span>
    </button>
  )
}

export default function FooterSheet() {
  return (
    <div className="relative isolate px-[17px] pb-[34px] pt-10 md:pr-[74px] lg:px-[74px] lg:pb-12 lg:pt-12">
      <PanelHoles variant="footer" bgClassName="bg-waitlist-paper" />
      <footer className="relative grid gap-y-6 md:grid-cols-2">
        {/* links cell — first in DOM, visually right at md+ */}
        <div className="relative flex flex-col justify-between px-[17px] pt-[5px] home-rule-x md:order-1 md:px-7 md:pt-2.5 md:home-rule-r">
          <RuleCap className="left-0 top-0 md:hidden" />
          <RuleCap className="bottom-0 right-0 md:hidden" />
          <div className="flex justify-between">
            <div className="flex flex-col gap-y-0.5">
              {LINKS.map((link) => (
                <FooterLink key={link.label} {...link} />
              ))}
            </div>
            <div className="md:mt-[9px]">
              <a
                className="inline-block rounded-[9.5px] border border-waitlist-gray bg-waitlist-dark-green px-3 py-[5.5px] text-[16px]/[19px] text-waitlist-gray transition-colors duration-150 ease-out hover:border-waitlist-dark-green hover:bg-white hover:text-waitlist-dark-green md:rounded-xl md:px-[15px] md:py-[7px] md:text-[18px]/[20px]"
                href="/sign-up"
              >
                Get started
              </a>
            </div>
          </div>
          <div className="mt-6 flex items-center gap-x-1.5">
            <LogoMark className="h-[13px] w-auto md:h-4" />
            <div className="font-cinetype text-[11.2px]/[13px] text-waitlist-dark-green xl:text-[14px]/[17px]">
              © 2026 Operate Machine Co. All rights reserved.
            </div>
          </div>
        </div>

        <VRule className="left-1/2 top-0 hidden h-full -translate-x-1/2 md:block" />

        {/* video cell */}
        <div className="relative px-[17px] pb-11 pt-2.5 home-rule-l md:px-7 md:pb-2.5 md:pt-2">
          <RuleCap className="right-[calc(85px+var(--home-rule)/2)] top-0 md:hidden" />
          <RuleArc
            bend="top"
            radius={90}
            className="right-[calc(var(--home-rule)/2)] top-[calc(var(--home-rule)/2)] h-[calc(100%-var(--home-rule)/2)] md:hidden"
          />
          <RuleCap className="bottom-0 left-0 md:hidden" />
          <VideoCard />
        </div>

        <RuleCap className="left-1/2 top-0 -ml-[calc(var(--home-rule)/2)] hidden md:block" />
        <RuleCap className="right-0 top-8 hidden lg:block" />
        <div className="absolute bottom-0 right-[calc(50%+18px)] top-0 hidden aspect-square min-[1440px]:block">
          <ScaledArc
            d="M0 0A1 1 0 0 1 1 1"
            className="bottom-0 left-0 right-[calc(var(--home-rule)/2)] top-[calc(var(--home-rule)/2)]"
          />
          <RuleCap className="-left-2 top-0" />
        </div>
      </footer>
    </div>
  )
}
