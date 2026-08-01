import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowUpRight,
  Circle,
  Database,
  ExternalLink,
  Github,
  ScanEye,
  Sparkles,
  TextSelect,
  Upload,
} from 'lucide-react'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'
import TiltCard, { TiltLayer } from './TiltCard'
import { useMagnetic } from '../hooks/useMagnetic'
import { pipeline, projectFilters, projects } from '../data/resume'
import { getAccent } from '../lib/utils'

// Explicit map keeps lucide tree-shakeable (vs. a namespace import).
const PIPELINE_ICONS = { Upload, ScanEye, TextSelect, Sparkles, Database }

function FilterButton({ label, active, onClick }) {
  const { ref, x, y, handleMove, handleLeave } = useMagnetic(0.35)
  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x, y }}
      className={`rounded-full border px-4 py-2 font-heading text-sm font-medium transition-colors duration-300 ${
        active
          ? 'border-neon-cyan/60 bg-neon-cyan/10 text-neon-cyan'
          : 'border-border text-muted hover:text-ink'
      }`}
    >
      {label}
    </motion.button>
  )
}

function Pipeline() {
  return (
    <div className="relative mt-8 rounded-2xl border border-border bg-base/40 p-6">
      <div className="mb-5 font-mono text-[11px] uppercase tracking-widest text-faint">
        Hybrid AI Matching Pipeline
      </div>
      <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
        {pipeline.map((step, i) => {
          const Icon = PIPELINE_ICONS[step.icon] ?? Circle
          return (
            <div key={step.title} className="flex flex-1 items-center gap-4 sm:flex-col sm:gap-2">
              <div className="group/step flex flex-col items-center gap-2">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-white/[0.03] transition-all duration-300 group-hover/step:border-neon-emerald/50 group-hover/step:bg-neon-emerald/10">
                  <Icon className="h-5 w-5 text-neon-emerald" />
                </span>
                <div className="text-center">
                  <div className="font-heading text-xs font-semibold text-ink">{step.title}</div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-faint">
                    {step.sub}
                  </div>
                </div>
              </div>
              {i < pipeline.length - 1 && (
                <div className="hidden h-px flex-1 bg-gradient-to-r from-neon-emerald/40 to-transparent sm:block" />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function ProjectCard({ project }) {
  const accent = getAccent(project.accent)
  return (
    <TiltCard max={12} glareAccent={accent} className="h-full">
      <motion.div
        layout
        className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card/50 p-6 backdrop-blur-sm transition-colors duration-300 hover:border-white/20"
      >
        {/* top accent line */}
        <div
          className="absolute inset-x-0 top-0 h-px opacity-60"
          style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
        />

        <TiltLayer depth={30} className="mb-4 flex items-start justify-between">
          <div>
            <h3 className="font-display text-2xl font-bold text-ink">{project.name}</h3>
            <p className="mt-1 text-sm text-muted">{project.tagline}</p>
          </div>
          <span
            className="whitespace-nowrap rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider"
            style={{ background: `${accent}14`, color: accent }}
          >
            {project.status.split('·')[0].trim()}
          </span>
        </TiltLayer>

        <TiltLayer depth={20} className="flex-1">
          <p className="text-sm leading-relaxed text-muted">{project.description}</p>

          <div className="mt-4 grid grid-cols-3 gap-2">
            {project.metrics.map((m) => (
              <div key={m.label} className="rounded-xl border border-border bg-white/[0.02] px-2 py-2 text-center">
                <div className="font-heading text-sm font-semibold text-ink">{m.value}</div>
                <div className="mt-0.5 font-mono text-[9px] uppercase tracking-wider text-faint">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </TiltLayer>

        <TiltLayer depth={40} className="mt-5">
          <div className="mb-4 flex flex-wrap gap-1.5">
            {project.stack.map((s) => (
              <span
                key={s}
                className="rounded-md border border-border bg-white/[0.02] px-2 py-1 font-mono text-[10px] text-muted"
              >
                {s}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-4 border-t border-border pt-4">
            <a
              href={project.links.code}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 font-heading text-sm font-medium text-muted transition-colors hover:text-ink"
            >
              <Github className="h-4 w-4" /> Code
            </a>
            <a
              href={project.links.demo}
              className="inline-flex items-center gap-1.5 font-heading text-sm font-medium transition-colors"
              style={{ color: accent }}
            >
              <ExternalLink className="h-4 w-4" /> Live Preview
            </a>
          </div>
        </TiltLayer>
      </motion.div>
    </TiltCard>
  )
}

function FeaturedCard({ project }) {
  const accent = getAccent(project.accent)
  return (
    <TiltCard max={8} glareAccent={accent}>
      <div className="group relative overflow-hidden rounded-[2rem] border border-border bg-card/60 p-8 backdrop-blur-md md:p-12">
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full blur-[100px]"
          style={{ background: `${accent}22` }}
        />
        <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <TiltLayer depth={25} className="mb-5 flex flex-wrap gap-2">
              {project.categories.map((c) => (
                <span
                  key={c}
                  className="rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-wider"
                  style={{ background: `${accent}14`, color: accent }}
                >
                  {c}
                </span>
              ))}
              <span className="rounded-full border border-border px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-faint">
                {project.status}
              </span>
            </TiltLayer>

            <TiltLayer depth={45}>
              <h3 className="font-display text-4xl font-bold text-ink md:text-5xl">{project.name}</h3>
              <p className="mt-2 font-heading text-lg text-muted">{project.tagline}</p>
            </TiltLayer>

            <TiltLayer depth={20}>
              <p className="mt-5 text-base leading-relaxed text-muted">{project.description}</p>
              <ul className="mt-6 space-y-3">
                {project.highlights.map((h) => (
                  <li key={h} className="flex gap-3 text-sm leading-relaxed text-muted">
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ background: accent, boxShadow: `0 0 10px ${accent}` }}
                    />
                    {h}
                  </li>
                ))}
              </ul>
            </TiltLayer>

            <TiltLayer depth={35} className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={project.links.code}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl px-5 py-3 font-heading text-sm font-semibold text-base"
                style={{ background: accent }}
              >
                View Case Study <ArrowUpRight className="h-4 w-4" />
              </a>
              <div className="flex flex-wrap gap-1.5">
                {project.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-md border border-border bg-white/[0.02] px-2 py-1 font-mono text-[10px] text-muted"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </TiltLayer>
          </div>

          <TiltLayer depth={30}>
            <Pipeline />
          </TiltLayer>
        </div>
      </div>
    </TiltCard>
  )
}

export default function Projects() {
  const [filter, setFilter] = useState('All')
  const featured = projects.find((p) => p.featured)

  const filtered = useMemo(() => {
    const rest = projects.filter((p) => !p.featured)
    if (filter === 'All') return rest
    return rest.filter((p) => p.categories.includes(filter))
  }, [filter])

  const featuredVisible = filter === 'All' || featured?.categories.includes(filter)

  return (
    <section id="projects" className="relative mx-auto max-w-6xl scroll-mt-24 px-6 py-24 md:py-32">
      <SectionHeading
        eyebrow="Selected Work"
        title={
          <>
            <span className="text-gradient">Projects that</span>{' '}
            <span className="text-gradient-neon">shipped</span>
          </>
        }
        lead="Production platforms and AI-driven systems, built end-to-end — from architecture through deployment."
      />

      {/* Filters */}
      <Reveal>
        <div className="mb-10 flex flex-wrap gap-2.5">
          {projectFilters.map((f) => (
            <FilterButton
              key={f.value}
              label={f.label}
              active={filter === f.value}
              onClick={() => setFilter(f.value)}
            />
          ))}
        </div>
      </Reveal>

      {/* Featured */}
      <AnimatePresence mode="popLayout">
        {featured && featuredVisible && (
          <motion.div
            key="featured"
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <FeaturedCard project={featured} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grid */}
      <motion.div layout className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {filtered.map((p) => (
            <motion.div
              key={p.id}
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <ProjectCard project={p} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}
