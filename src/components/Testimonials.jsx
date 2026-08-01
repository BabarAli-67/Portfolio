import { useState } from 'react'
import { ArrowUpRight, Quote } from 'lucide-react'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'
import TiltCard, { TiltLayer } from './TiltCard'
import { testimonials } from '../data/resume'
import { getAccent } from '../lib/utils'

function ClientAvatar({ name, src, accent }) {
  const [failed, setFailed] = useState(false)
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()

  return (
    <div
      className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full p-[2px]"
      style={{ background: `linear-gradient(135deg, ${accent}, #22D3EE)` }}
    >
      <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-surface">
        {!failed ? (
          <img
            src={src}
            alt={name}
            width={56}
            height={56}
            className="h-full w-full object-cover"
            onError={() => setFailed(true)}
          />
        ) : (
          <span className="font-display text-sm font-bold text-ink">{initials}</span>
        )}
      </div>
    </div>
  )
}

function TestimonialCard({ item, index }) {
  const accent = getAccent(item.accent)
  return (
    <Reveal delay={index * 0.08}>
      <TiltCard max={10} glareAccent={accent} className="h-full">
        <figure
          className="group relative overflow-hidden rounded-3xl border border-border bg-card/50 p-8 backdrop-blur-sm transition-colors duration-300 hover:border-white/20 md:p-10"
          style={{ boxShadow: `0 0 50px -24px ${accent}66` }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-35 blur-[90px] transition-opacity duration-500 group-hover:opacity-55"
            style={{ background: accent }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-px opacity-70"
            style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
          />

          <TiltLayer depth={35}>
            <Quote
              className="mb-6 h-10 w-10 opacity-80"
              style={{ color: accent }}
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </TiltLayer>

          <TiltLayer depth={25}>
            <blockquote>
              <p className="font-heading text-lg leading-relaxed text-ink md:text-xl md:leading-[1.65]">
                <span
                  className="mr-1 font-display text-4xl leading-none"
                  style={{ color: `${accent}99` }}
                  aria-hidden="true"
                >
                  “
                </span>
                {item.quote}
                <span
                  className="ml-0.5 font-display text-4xl leading-none"
                  style={{ color: `${accent}99` }}
                  aria-hidden="true"
                >
                  ”
                </span>
              </p>
            </blockquote>
          </TiltLayer>

          <TiltLayer depth={45} className="mt-8 border-t border-border pt-6">
            <figcaption className="flex flex-wrap items-center gap-4">
              <ClientAvatar name={item.name} src={item.avatar} accent={accent} />
              <div className="min-w-0 flex-1">
                <div className="font-heading text-base font-semibold text-ink md:text-lg">
                  {item.name}
                </div>
                <div className="mt-0.5 text-sm text-muted">
                  Representing{' '}
                  <span className="font-medium" style={{ color: accent }}>
                    {item.company}
                  </span>
                </div>
              </div>
              <a
                href={item.website}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-white/[0.02] px-4 py-2.5 font-mono text-xs text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-neon-cyan/50 hover:text-neon-cyan"
              >
                {item.websiteLabel}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </figcaption>
          </TiltLayer>
        </figure>
      </TiltCard>
    </Reveal>
  )
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative mx-auto max-w-5xl scroll-mt-24 px-6 py-24 md:py-32">
      <SectionHeading
        eyebrow="Testimonials"
        title={
          <>
            <span className="text-gradient">What clients</span>{' '}
            <span className="text-gradient-neon">say</span>
          </>
        }
        lead="Feedback from partners who've shipped production work with me."
      />

      <div className="space-y-6">
        {testimonials.map((item, i) => (
          <TestimonialCard key={item.id} item={item} index={i} />
        ))}
      </div>
    </section>
  )
}
