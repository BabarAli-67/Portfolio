import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Terminal } from 'lucide-react'
import { profile } from '../data/resume'

const MIN_DURATION_MS = 2300

/**
 * Full-screen branded preloader. Masks hydration + particle canvas warm-up,
 * then fades out once the minimum display time and window readiness are met.
 */
export default function Preloader() {
  const [visible, setVisible] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const start = performance.now()
    let raf = 0
    let finished = false

    // Prevent scroll jump while the overlay is up.
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const tick = (now) => {
      const elapsed = now - start
      // Ease toward ~92% until ready, then snap to 100% on exit prep.
      const t = Math.min(elapsed / MIN_DURATION_MS, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setProgress(Math.min(92, Math.round(eased * 92)))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    const tryFinish = () => {
      if (finished) return
      const elapsed = performance.now() - start
      const remaining = Math.max(0, MIN_DURATION_MS - elapsed)
      const domReady =
        document.readyState === 'complete' || document.readyState === 'interactive'

      if (!domReady) return

      window.setTimeout(() => {
        if (finished) return
        finished = true
        setProgress(100)
        // Brief beat at 100% before fade-out.
        window.setTimeout(() => setVisible(false), 180)
      }, remaining)
    }

    // Prefer window load; also poll readyState so soft reloads still resolve.
    if (document.readyState === 'complete') {
      tryFinish()
    } else {
      window.addEventListener('load', tryFinish, { once: true })
      // Fallback if load already fired or hangs on slow assets.
      const fallback = window.setTimeout(tryFinish, MIN_DURATION_MS + 400)
      return () => {
        finished = true
        cancelAnimationFrame(raf)
        window.removeEventListener('load', tryFinish)
        window.clearTimeout(fallback)
        document.body.style.overflow = prevOverflow
      }
    }

    return () => {
      finished = true
      cancelAnimationFrame(raf)
      window.removeEventListener('load', tryFinish)
      document.body.style.overflow = prevOverflow
    }
  }, [])

  // Restore scroll when overlay is gone.
  useEffect(() => {
    if (!visible) document.body.style.overflow = ''
  }, [visible])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          role="status"
          aria-live="polite"
          aria-label="Loading portfolio"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-base"
        >
          {/* Ambient brand glows */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.08),transparent_55%),radial-gradient(ellipse_at_bottom,rgba(168,85,247,0.07),transparent_50%)]"
          />

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex flex-col items-center gap-8 px-6"
          >
            {/* Brand mark */}
            <div className="flex items-center gap-3.5">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-neon-cyan to-neon-violet shadow-glow">
                <Terminal className="h-5 w-5 text-base" strokeWidth={2.5} />
              </span>
              <div className="font-mono text-sm text-muted md:text-base">
                <span className="text-neon-cyan">&gt;_</span>{' '}
                <span className="font-display text-xl font-bold tracking-tight text-ink md:text-2xl">
                  {profile.name}
                </span>
                <span className="ml-0.5 inline-block h-[1.1em] w-[2px] translate-y-[2px] animate-blink bg-neon-cyan align-middle" />
              </div>
            </div>

            {/* Progress track */}
            <div className="w-48 sm:w-56">
              <div className="mb-2 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
                <span>Initializing</span>
                <span className="text-neon-cyan">{progress}%</span>
              </div>
              <div className="h-[3px] overflow-hidden rounded-full bg-white/5">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-neon-cyan via-neon-violet to-neon-emerald"
                  initial={{ width: '0%' }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.15, ease: 'linear' }}
                />
              </div>
            </div>

            <p className="font-mono text-[11px] tracking-wide text-faint">
              boot · portfolio.system
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
