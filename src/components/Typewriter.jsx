import { useEffect, useState } from 'react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

// Cycling typewriter. On reduced motion it simply shows the first phrase.
export default function Typewriter({ words, className }) {
  const reduced = usePrefersReducedMotion()
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (reduced) {
      setText(words[0])
      return
    }
    const current = words[index % words.length]
    let delay = deleting ? 45 : 90

    if (!deleting && text === current) {
      delay = 1600
    } else if (deleting && text === '') {
      delay = 400
    }

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
  }, [text, deleting, index, words, reduced])

  return (
    <span className={className}>
      {text}
      <span className="ml-0.5 inline-block h-[0.9em] w-[3px] translate-y-[2px] animate-blink bg-neon-cyan align-middle" />
    </span>
  )
}
