import Reveal from './Reveal'
import { cn } from '../lib/utils'

// Consistent eyebrow + title + optional lead for every section.
export default function SectionHeading({ eyebrow, title, lead, align = 'left', id }) {
  const centered = align === 'center'
  return (
    <div id={id} className={cn('mb-14 md:mb-20', centered && 'mx-auto max-w-3xl text-center')}>
      {eyebrow && (
        <Reveal>
          <span className="mb-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.28em] text-neon-cyan">
            <span className="h-px w-6 bg-neon-cyan/60" />
            {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal delay={0.08}>
        <h2 className="font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
          {title}
        </h2>
      </Reveal>
      {lead && (
        <Reveal delay={0.16}>
          <p className={cn('mt-5 max-w-2xl text-lg leading-relaxed text-muted', centered && 'mx-auto')}>
            {lead}
          </p>
        </Reveal>
      )}
    </div>
  )
}
