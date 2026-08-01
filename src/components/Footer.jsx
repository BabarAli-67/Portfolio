import { ArrowUp, Terminal } from 'lucide-react'
import MagneticButton from './MagneticButton'
import SocialLinks from './SocialLinks'
import { profile } from '../data/resume'

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-6 py-14 md:flex-row md:justify-between">
        {/* Brand */}
        <div className="flex flex-col items-center gap-2 md:items-start">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-neon-cyan to-neon-violet">
              <Terminal className="h-4 w-4 text-base" strokeWidth={2.5} />
            </span>
            <span className="font-display text-lg font-bold">{profile.name}</span>
          </div>
          <p className="text-center font-mono text-xs text-faint md:text-left">
            © {year} · {profile.title} · Built with React, Tailwind & Framer Motion.
          </p>
        </div>

        <SocialLinks itemClassName="h-10 w-10" />

        <MagneticButton onClick={scrollTop} variant="ghost" strength={0.5} aria-label="Back to top">
          Back to top <ArrowUp className="h-4 w-4" />
        </MagneticButton>
      </div>
    </footer>
  )
}
