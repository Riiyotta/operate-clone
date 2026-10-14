import { motion } from 'motion/react'
import { useDemo } from './engine.jsx'

/* Fades the chat out at the end of a run and back in (remounted per run) after the rewind. */
export default function RunFade({ className, children }) {
  const { run, resetting } = useDemo()
  return (
    <motion.div
      key={run}
      className={className}
      initial={run !== 0 && { opacity: 0 }}
      animate={{ opacity: resetting ? 0 : 1 }}
      transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  )
}
