import { RuleCap } from './Rules.jsx'

// Product-demo container (CLONE_SPEC §5) — everything OUTSIDE the demo's app window.
// The demo (<HomeUi />) is passed as children and rendered directly inside the
// app-window div. That div is NOT positioned, so the demo's absolutely positioned
// pieces (in-view sentinel, floating panel `md:absolute md:top-12 ...`, cursor layer
// `absolute inset-0`, chapter control `absolute top-[calc(100%+1px)] left-1/2`)
// resolve against the frame, exactly like the original DOM.

// Mobile (<md) frame outline: rounded corners in stone-800 over a gray-400 outline.
function MobileOutlineCorners() {
  return (
    <>
      <path d="M0.4 16.5V16A15.6 15.6 0 0 1 16 0.4" />
      <line x1={32} x2="100%" y1={0.4} y2={0.4} transform="translate(-16 0)" />
      <svg className="overflow-visible" x="100%">
        <path d="M-16 0.4A15.6 15.6 0 0 1 -0.4 16V16.5" />
      </svg>
      <svg className="overflow-visible" y="100%">
        <path d="M0.4 -16.5V-16A15.6 15.6 0 0 0 16 -0.4" />
        <line x1={32} x2="100%" y1={-0.4} y2={-0.4} transform="translate(-16 0)" />
        <svg className="overflow-visible" x="100%">
          <path d="M-16 -0.4A15.6 15.6 0 0 0 -0.4 -16V-16.5" />
        </svg>
      </svg>
    </>
  )
}

function MobileOutline() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute -left-px -top-px h-[calc(100%+2px)] w-[calc(100%+2px)] overflow-visible md:hidden"
      fill="none"
      strokeWidth="0.8"
    >
      <g className="stroke-gray-400">
        <MobileOutlineCorners />
        <line x1={0.4} x2={0.4} y1={33} y2="100%" transform="translate(0 -16.5)" />
        <svg className="overflow-visible" x="100%">
          <line x1={-0.4} x2={-0.4} y1={33} y2="100%" transform="translate(0 -16.5)" />
        </svg>
      </g>
      <g className="stroke-stone-800">
        <MobileOutlineCorners />
      </g>
    </svg>
  )
}

export default function DemoFrame({ children }) {
  return (
    <section className="relative mt-[51px] font-muoto max-lg:pb-7 lg:mt-[53px] lg:home-rule-l lg:pl-[34px] lg:pr-[46px]">
      <RuleCap className="left-0 top-0 hidden lg:block" />
      <RuleCap className="right-0 top-0 hidden lg:block" />
      <div className="relative h-[713px] md:h-[711px] lg:h-[768px]">
        <div
          className={[
            'relative mx-auto size-full max-w-[1168px]',
            'rounded-2xl border border-transparent bg-gray-75',
            'shadow-[0_1px_2px_1px_#FFF_inset,0_4px_4px_-4px_rgba(0,0,0,0.14),0_1px_1px_-0.5px_rgba(0,0,0,0.08),0_12px_24px_-6px_rgba(0,0,0,0.08),0_8px_16px_-4px_rgba(0,0,0,0.10)]',
            'md:rounded-xl md:border-gray-400',
            'md:shadow-[0_4px_4px_-4px_rgba(0,0,0,0.14),0_1px_1px_-0.5px_rgba(0,0,0,0.08),0_12px_24px_-6px_rgba(0,0,0,0.08),0_8px_16px_-4px_rgba(0,0,0,0.10)]',
            'lg:p-6',
          ].join(' ')}
        >
          <MobileOutline />
          <div className="absolute -left-px -top-px hidden h-3 w-[calc(100%+2px)] rounded-t-xl border-x border-t border-stone-800 md:block" />
          <div className="absolute -bottom-px -left-px hidden h-3 w-[calc(100%+2px)] rounded-b-xl border-x border-b border-stone-800 md:block" />
          {/* App window — HomeUi fills this. */}
          <div className="flex size-full flex-col rounded-2xl bg-gray-100 md:rounded-xl lg:rounded-md lg:border lg:border-gray-200">
            {children}
          </div>
        </div>
      </div>
    </section>
  )
}
