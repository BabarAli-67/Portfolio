import { createContext, useContext } from 'react'
import { motion, motionValue, useMotionTemplate, useTransform } from 'framer-motion'
import { useTilt } from '../hooks/useTilt'
import { cn } from '../lib/utils'

// Shares the card's live pointer position with nested layers.
const TiltContext = createContext(null)

// Stable zero source for layers rendered outside an active tilt (reduced motion).
const ZERO = motionValue(0)

/**
 * 3D perspective tilt container. Tilts toward the cursor and exposes a context
 * so child <TiltLayer> elements can separate along the Z-axis for a
 * multi-layer "depth explosion" effect. A pointer-tracked glare sits on top.
 */
export default function TiltCard({ children, max = 14, glareAccent = '#22D3EE', className }) {
  const tilt = useTilt(max)
  const { ref, rotateX, rotateY, px, py, handleMove, handleLeave, reduced } = tilt

  // Glare follows the pointer across the surface.
  const glareX = useTransform(px, [0, 1], ['0%', '100%'])
  const glareY = useTransform(py, [0, 1], ['0%', '100%'])
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, ${glareAccent}22 0%, transparent 45%)`

  if (reduced) {
    return <div className={cn('relative', className)}>{children}</div>
  }

  return (
    <TiltContext.Provider value={tilt}>
      <div className="perspective-1000">
        <motion.div
          ref={ref}
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
          style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
          className={cn('group/tilt relative preserve-3d', className)}
        >
          {children}
          {/* Pointer-tracked glare */}
          <motion.div
            aria-hidden="true"
            style={{ background: glare, z: 1 }}
            className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/tilt:opacity-100"
          />
        </motion.div>
      </div>
    </TiltContext.Provider>
  )
}

/**
 * A child layer that floats toward the viewer on hover. `depth` (px) controls
 * how far along Z it separates; higher = closer to the screen. It also shifts
 * subtly with the pointer for genuine parallax.
 */
export function TiltLayer({ children, depth = 40, className, style }) {
  const tilt = useContext(TiltContext)

  const isActive = Boolean(tilt)
  // Hooks must run unconditionally; fall back to a stable zero source when inert.
  const translateX = useTransform(tilt?.mx ?? ZERO, [-0.5, 0.5], [-depth * 0.25, depth * 0.25])
  const translateY = useTransform(tilt?.my ?? ZERO, [-0.5, 0.5], [-depth * 0.25, depth * 0.25])

  if (!isActive) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      style={{ x: translateX, y: translateY, z: depth, transformStyle: 'preserve-3d', ...style }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
