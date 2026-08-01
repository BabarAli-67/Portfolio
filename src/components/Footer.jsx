import { ArrowUp, Github, Linkedin, Mail, Terminal } from 'lucide-react'
import MagneticButton from './MagneticButton'
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

        {/* Socials */}
        <div className="flex items-center gap-3">
          {[
            { icon: Github, href: profile.links.github, label: 'GitHub' },
            { icon: Linkedin, href: profile.links.linkedin, label: 'LinkedIn' },
            { icon: Mail, href: profile.links.email, label: 'Email' },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              aria-label={label}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-border text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-neon-cyan/50 hover:text-neon-cyan"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>

        {/* Back to top */}
        <MagneticButton onClick={scrollTop} variant="ghost" strength={0.5} aria-label="Back to top">
          Back to top <ArrowUp className="h-4 w-4" />
        </MagneticButton>
      </div>
    </footer>
  )
}
