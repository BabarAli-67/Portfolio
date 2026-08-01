import { motion } from 'framer-motion'
import { useMagnetic } from '../hooks/useMagnetic'
import { cn } from '../lib/utils'

/**
 * Button / link with magnetic pull toward the cursor. Renders as <a> when
 * `href` is provided, otherwise <button>. The inner label counter-shifts
 * slightly for a subtle parallax depth cue.
 */
export default function MagneticButton({
  children,
  href,
  variant = 'primary',
  strength = 0.4,
  className,
  onClick,
  ...rest
}) {
  const { ref, x, y, handleMove, handleLeave } = useMagnetic(strength)

  const base =
    'relative inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-heading font-semibold tracking-wide transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-base cursor-pointer'

  const variants = {
    primary:
      'bg-neon-cyan text-base hover:bg-white shadow-glow',
    ghost:
      'glass text-ink hover:border-neon-cyan/60 hover:text-neon-cyan',
    outline:
      'border border-border text-ink hover:border-neon-violet/60 hover:text-neon-violet',
  }

  const MotionTag = href ? motion.a : motion.button

  return (
    <MotionTag
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x, y }}
      className={cn(base, variants[variant], className)}
      {...rest}
    >
      <motion.span style={{ x, y }} className="pointer-events-none inline-flex items-center gap-2">
        {children}
      </motion.span>
    </MotionTag>
  )
}
