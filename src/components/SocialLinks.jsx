import { Github, Linkedin, Mail } from 'lucide-react'
import { socials } from '../data/resume'
import { cn } from '../lib/utils'

function IconX({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.727-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </svg>
  )
}

function IconReddit({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.672-3.123 4.844-6.991 4.844-3.872 0-6.991-2.172-6.991-4.844 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.028l2.914.596a1.214 1.214 0 0 1 1.108-.701zM9.438 12.386c-.607 0-1.098.509-1.098 1.142s.491 1.142 1.098 1.142c.608 0 1.1-.509 1.1-1.142s-.492-1.142-1.1-1.142zm5.126 0c-.608 0-1.101.509-1.101 1.142s.493 1.142 1.101 1.142c.608 0 1.102-.509 1.102-1.142s-.494-1.142-1.102-1.142zm.629 3.89c.04.04-.04.146-.121.196-.734.461-1.778.693-2.992.693-1.206 0-2.262-.232-2.977-.693-.09-.05-.16-.156-.12-.196.04-.041.12-.04.16 0 .63.417 1.562.64 2.937.64 1.376 0 2.318-.223 2.953-.64.04-.04.12-.041.16 0z" />
    </svg>
  )
}

function IconQuora({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12.738 18.774c-1.775.742-3.57.743-4.812-.005-1.496-.905-2.306-2.772-2.306-4.938 0-3.205 1.938-6.114 4.99-6.114 3.052 0 4.99 2.91 4.99 6.114 0 1.51-.38 2.85-1.075 3.846l1.613 2.126c.55-.405 1.05-.89 1.486-1.45.92-1.18 1.447-2.71 1.447-4.522C19.071 7.472 15.95 4 12.11 4 8.27 4 5.148 7.472 5.148 13.881c0 2.31.754 4.3 2.055 5.615 1.006 1.016 2.36 1.532 3.925 1.532 1.13 0 2.22-.274 3.21-.78l-.6-1.474z" />
    </svg>
  )
}

const ICONS = {
  github: Github,
  linkedin: Linkedin,
  x: IconX,
  reddit: IconReddit,
  quora: IconQuora,
  email: Mail,
}

/**
 * Shared social icon row. `variant`:
 *  - "icon"  → compact square buttons (Hero / Footer)
 *  - "chip"  → wider labeled buttons (Contact)
 */
export default function SocialLinks({
  variant = 'icon',
  exclude = [],
  className,
  itemClassName,
}) {
  const items = socials.filter((s) => !exclude.includes(s.id))

  return (
    <div className={cn('flex flex-wrap items-center gap-2', className)}>
      {items.map(({ id, label, href }) => {
        const Icon = ICONS[id] ?? Mail
        const external = href.startsWith('http')
        return (
          <a
            key={id}
            href={href}
            target={external ? '_blank' : undefined}
            rel={external ? 'noreferrer' : undefined}
            aria-label={label}
            className={cn(
              variant === 'chip'
                ? 'inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-2xl border border-border px-3 text-sm text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-neon-violet/50 hover:text-neon-violet min-w-[7.5rem]'
                : 'flex h-11 w-11 items-center justify-center rounded-xl border border-border text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-neon-cyan/50 hover:text-neon-cyan',
              itemClassName
            )}
          >
            <Icon className="h-4 w-4" />
            {variant === 'chip' && <span className="font-heading text-sm">{label}</span>}
          </a>
        )
      })}
    </div>
  )
}
