import { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

/**
 * Global cursor-following radial spotlight + a smaller precise dot.
 * Casts a soft ambient glow that trails the cursor with spring physics.
 * Hidden entirely for touch / reduced-motion users.
 */
export default function CursorSpotlight() {
  const reduced = usePrefersReducedMotion()

  const x = useMotionValue(-500)
  const y = useMotionValue(-500)
  const glowX = useSpring(x, { stiffness: 120, damping: 20, mass: 0.5 })
  const glowY = useSpring(y, { stiffness: 120, damping: 20, mass: 0.5 })
  const dotX = useSpring(x, { stiffness: 500, damping: 30 })
  const dotY = useSpring(y, { stiffness: 500, damping: 30 })

  useEffect(() => {
    if (reduced) return
    // Skip on coarse pointers (touch).
    if (window.matchMedia('(pointer: coarse)').matches) return

    function onMove(e) {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [reduced, x, y])

  if (reduced) return null

  return (
    <>
      {/* Ambient trailing glow */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-30 hidden h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full md:block"
        style={{
          x: glowX,
          y: glowY,
          background:
            'radial-gradient(circle, rgba(34,211,238,0.10) 0%, rgba(168,85,247,0.06) 35%, transparent 70%)',
        }}
      />
      {/* Precise cursor dot */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[60] hidden h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon-cyan shadow-glow md:block"
        style={{ x: dotX, y: dotY }}
      />
    </>
  )
}
