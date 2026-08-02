import { useMemo, useRef, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { Briefcase, ChevronDown } from 'lucide-react'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'
import { experience } from '../data/resume'
import { getAccent } from '../lib/utils'

const CHAR_LIMIT = 200

function splitPoints(points, limit = CHAR_LIMIT) {
  const total = points.reduce((n, p) => n + p.length, 0)
  if (total <= limit) {
    return { preview: points, rest: [], needsToggle: false }
  }

  const preview = []
  let used = 0
  for (const p of points) {
    // Keep at least one bullet; stop once we'd exceed the budget.
    if (preview.length > 0 && used + p.length > limit) break
    preview.push(p)
    used += p.length
  }

  return {
    preview,
    rest: points.slice(preview.length),
    needsToggle: preview.length < points.length,
  }
}

function ExperiencePoints({ points, accent }) {
  const [expanded, setExpanded] = useState(false)
  const { preview, rest, needsToggle } = useMemo(() => splitPoints(points), [points])

  return (
    <div>
      <ul className="space-y-3">
        {preview.map((p) => (
          <li key={p} className="flex gap-3 text-sm leading-relaxed text-muted">
            <span
              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ background: accent }}
            />
            <span className="min-w-0 break-words">{p}</span>
          </li>
        ))}
      </ul>

      {needsToggle && (
        <>
          {/* Height-animated remainder — preview bullets stay put (no jump) */}
          <motion.div
            initial={false}
            animate={{
              height: expanded ? 'auto' : 0,
              opacity: expanded ? 1 : 0,
            }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <ul className="mt-3 space-y-3">
              {rest.map((p) => (
                <li key={p} className="flex gap-3 text-sm leading-relaxed text-muted">
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ background: accent }}
                  />
                  <span className="min-w-0 break-words">{p}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            className="mt-4 inline-flex items-center gap-1.5 font-heading text-sm font-semibold transition-colors hover:opacity-90"
            style={{ color: accent }}
          >
            {expanded ? 'Read Less' : 'Read More'}
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
            />
          </button>
        </>
      )}
    </div>
  )
}

function TimelineItem({ item, index }) {
  const accent = getAccent(item.accent)
  return (
    <div className="relative pl-12 md:pl-16">
      <motion.span
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.5, delay: 0.1, type: 'spring', stiffness: 200, damping: 12 }}
        className="absolute left-2 top-1.5 flex h-6 w-6 -translate-x-1/2 items-center justify-center md:left-3"
      >
        <span
          className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-40"
          style={{ background: accent }}
        />
        <span
          className="relative h-3.5 w-3.5 rounded-full border-2 border-base"
          style={{ background: accent, boxShadow: `0 0 16px ${accent}` }}
        />
      </motion.span>

      <Reveal delay={index * 0.05}>
        <div className="group rounded-3xl border border-border bg-card/50 p-5 backdrop-blur-sm transition-colors duration-300 hover:border-white/20 sm:p-6 md:p-8">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <span
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                style={{ background: `${accent}14`, boxShadow: `inset 0 0 0 1px ${accent}33` }}
              >
                <Briefcase className="h-5 w-5" style={{ color: accent }} />
              </span>
              <div className="min-w-0">
                <h3 className="font-heading text-base font-semibold text-ink break-words sm:text-lg">
                  {item.role}
                </h3>
                <p className="text-sm break-words" style={{ color: accent }}>
                  {item.company} · {item.mode}
                </p>
              </div>
            </div>
            <span className="rounded-full border border-border px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-faint">
              {item.period}
            </span>
          </div>

          <ExperiencePoints points={item.points} accent={accent} />
        </div>
      </Reveal>
    </div>
  )
}

export default function Experience() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 65%', 'end 60%'],
  })
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 })

  return (
    <section id="experience" className="relative mx-auto max-w-5xl scroll-mt-24 px-5 py-20 sm:px-6 sm:py-24 md:py-32">
      <SectionHeading
        eyebrow="Career"
        title={<span className="text-gradient">Experience</span>}
        lead="Where I've built, shipped, and optimized in production settings."
      />

      <div ref={ref} className="relative">
        <div className="absolute left-2 top-0 h-full w-px bg-border md:left-3" />
        <motion.div
          style={{ scaleY }}
          className="absolute left-2 top-0 h-full w-px origin-top bg-gradient-to-b from-neon-cyan via-neon-violet to-neon-emerald md:left-3"
        />

        <div className="space-y-8">
          {experience.map((item, i) => (
            <TimelineItem key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
