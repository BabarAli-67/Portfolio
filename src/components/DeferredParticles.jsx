import { lazy, Suspense, useEffect, useState } from 'react'

/**
 * Vite SPA equivalent of next/dynamic(..., { ssr: false }):
 * - Code-splits the canvas so it is not on the critical JS path
 * - Mounts only after the first paint (client-only), so HTML/text/layout
 *   can paint immediately before the constellation warms up
 */
const ParticleCanvas = lazy(() => import('./ParticleCanvas'))

export default function DeferredParticles() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    let cancelled = false
    let idleId = 0
    let timeoutId = 0

    const enable = () => {
      if (!cancelled) setMounted(true)
    }

    // Under the preloader we can warm the canvas ASAP without risking flicker.
    const raf1 = requestAnimationFrame(() => {
      if (typeof window.requestIdleCallback === 'function') {
        idleId = window.requestIdleCallback(enable, { timeout: 200 })
      } else {
        timeoutId = window.setTimeout(enable, 50)
      }
    })

    return () => {
      cancelled = true
      cancelAnimationFrame(raf1)
      if (idleId && typeof window.cancelIdleCallback === 'function') {
        window.cancelIdleCallback(idleId)
      }
      if (timeoutId) window.clearTimeout(timeoutId)
    }
  }, [])

  return (
    <>
      {/* Cheap static backdrop so the page never looks empty pre-canvas */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_top,rgba(34,211,238,0.09),transparent_55%),radial-gradient(ellipse_at_bottom_right,rgba(168,85,247,0.09),transparent_55%)]"
      />
      {mounted && (
        <Suspense fallback={null}>
          <ParticleCanvas />
        </Suspense>
      )}
    </>
  )
}
