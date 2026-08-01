import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, Terminal, X } from 'lucide-react'
import MagneticButton from './MagneticButton'
import { useMagnetic } from '../hooks/useMagnetic'
import { profile } from '../data/resume'
import { cn } from '../lib/utils'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
]

function MagneticLink({ label, href, onClick }) {
  const { ref, x, y, handleMove, handleLeave } = useMagnetic(0.5)
  return (
    <motion.a
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x, y }}
      className="relative px-1 py-1 font-heading text-sm font-medium text-muted transition-colors hover:text-ink"
    >
      {label}
    </motion.a>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
    >
      <nav
        className={cn(
          'flex w-full max-w-6xl items-center justify-between rounded-2xl px-4 py-3 transition-all duration-500 md:px-6',
          scrolled ? 'glass-strong shadow-glow-soft' : 'border border-transparent bg-transparent'
        )}
      >
        {/* Brand */}
        <a href="#top" className="group flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-neon-cyan to-neon-violet text-base transition-transform duration-300 group-hover:rotate-[18deg]">
            <Terminal className="h-4 w-4 text-base" strokeWidth={2.5} />
          </span>
          <span className="font-display text-lg font-bold tracking-tight">{profile.name}</span>
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <MagneticLink key={l.href} {...l} />
          ))}
          <MagneticButton href="#contact" variant="primary" strength={0.5} className="px-5 py-2.5">
            Let's Talk
          </MagneticButton>
        </div>

        {/* Mobile toggle */}
        <button
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-lg glass text-ink md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-x-4 top-20 z-50 flex flex-col gap-1 rounded-2xl glass-strong p-3 md:hidden"
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 font-heading text-base text-muted transition-colors hover:bg-white/5 hover:text-ink"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-1 rounded-xl bg-neon-cyan px-4 py-3 text-center font-heading font-semibold text-base"
            >
              Let's Talk
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
