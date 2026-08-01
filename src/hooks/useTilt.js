import { useRef } from 'react'
import { useMotionValue, useSpring, useTransform } from 'framer-motion'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

/**
 * 3D perspective tilt. Tracks the cursor over the element and produces spring
 * rotateX / rotateY values plus a normalized pointer position (px, py in 0-1)
 * that children can consume via useTransform to separate along the Z-axis.
 *
 * @param {number} max  Maximum tilt in degrees.
 */
export function useTilt(max = 14) {
  const ref = useRef(null)
  const reduced = usePrefersReducedMotion()

  // Raw normalized pointer (-0.5 .. 0.5), centered on the card.
  const mx = useMotionValue(0)
  const my = useMotionValue(0)

  const springCfg = { stiffness: 200, damping: 18, mass: 0.4 }
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [max, -max]), springCfg)
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-max, max]), springCfg)

  // 0-1 pointer position for glare / spotlight children.
  const px = useTransform(mx, [-0.5, 0.5], [0, 1])
  const py = useTransform(my, [-0.5, 0.5], [0, 1])

  function handleMove(e) {
    if (reduced || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    mx.set((e.clientX - rect.left) / rect.width - 0.5)
    my.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  function handleLeave() {
    mx.set(0)
    my.set(0)
  }

  return { ref, rotateX, rotateY, px, py, mx, my, handleMove, handleLeave, reduced }
}
