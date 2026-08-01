import { motion } from 'framer-motion'

// Scroll-triggered reveal. Fades + rises into view once, respecting the
// staggered `delay`. Framer Motion automatically honors prefers-reduced-motion
// for transform-based animations when the OS setting is on.
export default function Reveal({ children, delay = 0, y = 28, className, as = 'div' }) {
  const MotionTag = motion[as] ?? motion.div
  return (
    <MotionTag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </MotionTag>
  )
}
