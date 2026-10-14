import { AnimatePresence, motion } from 'motion/react'
import { useTarget } from './engine.jsx'
import { TextMorph } from './text.jsx'
import { AVATARS } from './scripts.js'
import { HollowayLogo, ReturnIcon } from './icons.jsx'

const CHIP_IN = { delay: 0.06, duration: 0.24, ease: [0.22, 1, 0.36, 1] }
const CHIP_OUT = { duration: 0.16, ease: 'easeOut' }

function Chip({ label, target }) {
  const { ref, hoverProps } = useTarget(target)
  return (
    <motion.div
      ref={ref}
      {...hoverProps}
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1, transition: CHIP_IN }}
      exit={{ opacity: 0, scale: 0.94, transition: CHIP_OUT }}
      className="demo-chip shrink-0 overflow-hidden text-nowrap rounded-full bg-black/[0.03] px-2.5 py-[3.5px] text-[11px]/[17px] font-book text-gray-600 transition-[background-color,scale] duration-[120ms] data-[hovered]:bg-black/[0.06] data-[pressed]:[scale:0.96] md:shrink md:truncate md:text-[12px]/[17px]"
    >
      <TextMorph>{label}</TextMorph>
    </motion.div>
  )
}

export function Chips({ items, className = '' }) {
  return (
    <div className={className}>
      <div className="flex items-center gap-x-1.5">
        <AnimatePresence initial={false}>
          {items.map(({ id, ...chip }) => (
            <Chip key={id} {...chip} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

export function UserBubble({ children }) {
  return (
    <div className="flex justify-end">
      <div className="demo-bubble max-w-[min(24rem,80%)] rounded-[10px] border-[0.5px] border-[rgba(0,153,51,0.02)] px-3 py-[7.5px] text-[14px]/[23px] text-gray-800">
        {children}
      </div>
    </div>
  )
}

export function MetaRow({ icon = <ReturnIcon />, children }) {
  return (
    <div className="flex items-center gap-x-1.5">
      {icon}
      <div className="text-[12px]/[17px] text-gray-500">{children}</div>
    </div>
  )
}

export const Wavy = ({ children }) => <span className="demo-wavy">{children}</span>

export const DealRef = () => (
  <span>
    <HollowayLogo size={16} className="demo-logo-tile-sm mb-[2.5px] mr-[4.5px] inline-block rounded-[5px]" />
    <Wavy>DEAL-132 · Holloway</Wavy>
  </span>
)

export const InlineAvatar = ({ className }) => (
  <span className={`relative inline-block rounded-full ${className}`}>
    <img className="block size-full rounded-full" src={AVATARS.kierra} alt="Kierra" width="64" height="64" />
    <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.04)]" />
  </span>
)
