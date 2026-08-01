import { useEffect, useState } from 'react'

// Reactively tracks the user's prefers-reduced-motion setting so heavy
// animations (canvas physics, tilt, magnetism) can be disabled gracefully.
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return reduced
}
