import { useRef } from 'react'
import { useSpring } from 'framer-motion'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

/**
 * Magnetic physics: an element snaps slightly toward the cursor while hovered,
 * then springs back to rest on leave. Returns a ref, motion values, and the
 * pointer handlers to spread onto the element.
 *
 * @param {number} strength  How far (0-1) the element follows the cursor.
 */
export function useMagnetic(strength = 0.35) {
  const ref = useRef(null)
  const reduced = usePrefersReducedMotion()

  const config = { stiffness: 220, damping: 16, mass: 0.35 }
  const x = useSpring(0, config)
  const y = useSpring(0, config)

  function handleMove(e) {
    if (reduced || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const relX = e.clientX - (rect.left + rect.width / 2)
    const relY = e.clientY - (rect.top + rect.height / 2)
    x.set(relX * strength)
    y.set(relY * strength)
  }

  function handleLeave() {
    x.set(0)
    y.set(0)
  }

  return { ref, x, y, handleMove, handleLeave }
}
