import { useEffect, useMemo, useState } from 'react'
import { cn } from '../lib/utils'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

/**
 * Layout-stable typewriter: an invisible sizer locks height to the longest
 * phrase so typing/deleting never resizes the Hero (fixes mobile scroll jump).
 */
export default function Typewriter({ words, className, active = true }) {
  const reduced = usePrefersReducedMotion()
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  const longest = useMemo(
    () => words.reduce((a, b) => (a.length >= b.length ? a : b), words[0] ?? ''),
    [words]
  )

  useEffect(() => {
    if (reduced) {
      setText(words[0] ?? '')
      return
    }
    if (!active) return

    const current = words[index % words.length]
    let delay = text === '' && !deleting ? 0 : deleting ? 40 : 70

    if (!deleting && text === current) delay = 1400
    else if (deleting && text === '') delay = 280

    const t = setTimeout(() => {
      if (!deleting && text === current) {
        setDeleting(true)
      } else if (deleting && text === '') {
        setDeleting(false)
        setIndex((i) => (i + 1) % words.length)
      } else {
        setText((prev) =>
          deleting ? current.slice(0, prev.length - 1) : current.slice(0, prev.length + 1)
        )
      }
    }, delay)

    return () => clearTimeout(t)
  }, [text, deleting, index, words, reduced, active])

  useEffect(() => {
    if (!active && !reduced) {
      setText('')
      setDeleting(false)
      setIndex(0)
    }
  }, [active, reduced])

  return (
    <span className="relative block w-full">
      {/* Invisible sizer — reserves max wrapped height permanently */}
      <span className={cn('invisible block select-none', className)} aria-hidden="true">
        {longest}
      </span>
      {/* Color/gradient classes must live on this node — not a parent — or
          -webkit-text-fill-color:transparent inherits without background-clip
          and the typed text goes invisible on mobile production builds. */}
      <span
        className={cn('absolute inset-x-0 top-0 text-neon-cyan', className)}
        style={{ color: '#22D3EE' }}
      >
        {text}
        <span className="ml-0.5 inline-block h-[0.85em] w-[2px] translate-y-[2px] animate-blink bg-neon-cyan align-middle sm:w-[3px]" />
      </span>
    </span>
  )
}
