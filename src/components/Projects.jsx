import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
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

const DESC_LIMIT = 200
const DESC_COLOR = '#8593AC' // theme muted — force visible fill

/**
 * Truncates project body (paragraph + optional bullets) to DESC_LIMIT chars.
 * Bullets stay hidden until expanded; Code/tags/pipeline live outside this component.
 */
function ProjectDescription({ text, highlights = [], accent, className = '' }) {
  const [expanded, setExpanded] = useState(false)

  const bulletChars = useMemo(
    () => highlights.reduce((n, h) => n + h.length, 0),
    [highlights]
  )
  const needsToggle = text.length > DESC_LIMIT || bulletChars > 0

  const shownDesc = useMemo(() => {
    if (expanded) return text
    if (text.length > DESC_LIMIT) return `${text.slice(0, DESC_LIMIT).trimEnd()}…`
    return text
  }, [text, expanded])

  return (
    <div className={className}>
      <p
        className="text-sm leading-relaxed break-words sm:text-base sm:leading-relaxed"
        style={{ color: DESC_COLOR, WebkitTextFillColor: DESC_COLOR }}
      >
        {shownDesc}
      </p>

      {expanded && highlights.length > 0 && (
        <ul className="mt-4 space-y-3 sm:mt-5">
          {highlights.map((h) => (
            <li key={h} className="flex gap-3 text-sm leading-relaxed">
              <span
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ background: accent, boxShadow: `0 0 10px ${accent}` }}
              />
              <span
                className="min-w-0 break-words"
                style={{ color: DESC_COLOR, WebkitTextFillColor: DESC_COLOR }}
              >
                {h}
              </span>
            </li>
          ))}
        </ul>
      )}

      {needsToggle && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className="mt-2 font-heading text-sm font-semibold transition-opacity hover:opacity-90"
          style={{ color: accent }}
        >
          {expanded ? 'Read Less' : 'Read More'}
        </button>
      )}
    </div>
  )
}

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
      className={`shrink-0 rounded-full border px-3.5 py-2 font-heading text-xs font-medium transition-colors duration-300 sm:px-4 sm:text-sm ${
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
    <div className="relative mt-4 rounded-2xl border border-border bg-base/40 p-4 sm:mt-8 sm:p-6">
      <div className="mb-3 flex items-center justify-between gap-2 sm:mb-5">
        <div className="font-mono text-[11px] uppercase tracking-widest text-faint">
          Hybrid AI Matching Pipeline
        </div>
        <div className="font-mono text-[9px] uppercase tracking-wider text-faint sm:hidden">
          Swipe →
        </div>
      </div>

      {/* Mobile: horizontal snap carousel */}
      <div className="relative -mx-1 sm:hidden">
        <div
          className="flex snap-x snap-mandatory gap-0 overflow-x-auto px-1 pb-2 scrollbar-hide [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {pipeline.map((step, i) => {
            const Icon = PIPELINE_ICONS[step.icon] ?? Circle
            return (
              <div key={step.title} className="flex shrink-0 snap-start items-center">
                <div className="flex w-[4.75rem] flex-col items-center gap-1.5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-white/[0.03]">
                    <Icon className="h-4 w-4 text-neon-emerald" />
                  </span>
                  <div className="text-center">
                    <div className="font-heading text-[11px] font-semibold leading-tight text-ink">
                      {step.title}
                    </div>
                    <div className="font-mono text-[8px] uppercase tracking-wider text-faint">
                      {step.sub}
                    </div>
                  </div>
                </div>
                {i < pipeline.length - 1 && (
                  <div
                    aria-hidden="true"
                    className="mx-0.5 h-px w-5 shrink-0 bg-gradient-to-r from-neon-emerald/50 to-neon-emerald/10"
                  />
                )}
              </div>
            )
          })}
        </div>
        {/* Scroll hint dots */}
        <div className="mt-1 flex justify-center gap-1.5" aria-hidden="true">
          {pipeline.map((step) => (
            <span key={step.title} className="h-1 w-1 rounded-full bg-neon-emerald/40" />
          ))}
        </div>
      </div>

      {/* Desktop / tablet: original horizontal flow */}
      <div className="hidden items-center gap-4 sm:flex">
        {pipeline.map((step, i) => {
          const Icon = PIPELINE_ICONS[step.icon] ?? Circle
          return (
            <div key={step.title} className="flex flex-1 items-center gap-2">
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
                <div className="h-px flex-1 bg-gradient-to-r from-neon-emerald/40 to-transparent" />
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
        className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-3xl border border-border bg-card/50 p-4 backdrop-blur-sm transition-colors duration-300 hover:border-white/20 sm:p-6"
      >
        <div
          className="absolute inset-x-0 top-0 h-px opacity-60"
          style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
        />

        <TiltLayer depth={30} className="mb-3 flex min-w-0 flex-col gap-2 sm:mb-4 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
          <div className="min-w-0 flex-1">
            <h3 className="font-display text-xl font-bold leading-snug text-ink break-words sm:text-2xl">
              {project.name}
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-muted break-words">{project.tagline}</p>
          </div>
          <span
            className="w-fit shrink-0 rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider"
            style={{ background: `${accent}14`, color: accent }}
          >
            {project.status.split('·')[0].trim()}
          </span>
        </TiltLayer>

        <TiltLayer depth={20} className="min-w-0 flex-1">
          <ProjectDescription
            text={project.description}
            highlights={project.highlights}
            accent={accent}
          />

          <div className="mt-4 grid grid-cols-3 gap-1.5 sm:gap-2">
            {project.metrics.map((m) => (
              <div
                key={m.label}
                className="min-w-0 rounded-xl border border-border bg-white/[0.02] px-1.5 py-2 text-center sm:px-2"
              >
                <div className="font-heading text-xs font-semibold text-ink break-words sm:text-sm">
                  {m.value}
                </div>
                <div className="mt-0.5 font-mono text-[8px] uppercase tracking-wider text-faint sm:text-[9px]">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </TiltLayer>

        <TiltLayer depth={40} className="mt-4 min-w-0 sm:mt-5">
          <div className="mb-3 flex flex-wrap gap-1.5 sm:mb-4">
            {project.stack.map((s) => (
              <span
                key={s}
                className="rounded-md border border-border bg-white/[0.02] px-2 py-1 font-mono text-[10px] text-muted"
              >
                {s}
              </span>
            ))}
          </div>
          <div className="flex flex-col gap-2 border-t border-border pt-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4 sm:pt-4">
            {project.links.code ? (
              <a
                href={project.links.code}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 w-full items-center justify-center gap-1.5 rounded-xl border border-border bg-white/[0.02] px-3 font-heading text-sm font-medium text-muted transition-colors hover:text-ink sm:w-auto sm:justify-start sm:rounded-none sm:border-0 sm:bg-transparent sm:px-0 sm:min-h-0"
              >
                <Github className="h-4 w-4 shrink-0" /> Code
              </a>
            ) : null}
            <a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 w-full items-center justify-center gap-1.5 rounded-xl border border-border bg-white/[0.02] px-3 font-heading text-sm font-medium transition-colors sm:min-h-0 sm:w-auto sm:justify-start sm:rounded-none sm:border-0 sm:bg-transparent sm:px-0"
              style={{ color: accent }}
            >
              <ExternalLink className="h-4 w-4 shrink-0" /> Live Preview
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
      <div className="group relative min-w-0 overflow-hidden rounded-[1.5rem] border border-border bg-card/60 p-5 backdrop-blur-md sm:rounded-[2rem] sm:p-8 md:p-12">
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full blur-[100px]"
          style={{ background: `${accent}22` }}
        />
        <div className="relative grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-2 lg:items-center">
          <div className="min-w-0">
            <TiltLayer depth={25} className="mb-4 flex flex-wrap gap-2 sm:mb-5">
              {project.categories.map((c) => (
                <span
                  key={c}
                  className="rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-wider"
                  style={{ background: `${accent}14`, color: accent }}
                >
                  {c}
                </span>
              ))}
              <span className="rounded-full border border-border px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-faint break-words">
                {project.status}
              </span>
            </TiltLayer>

            <TiltLayer depth={45}>
              <h3 className="font-display text-[1.75rem] font-bold leading-tight text-ink break-words sm:text-4xl md:text-5xl">
                {project.name}
              </h3>
              <p className="mt-2 font-heading text-base text-muted break-words sm:text-lg">
                {project.tagline}
              </p>
            </TiltLayer>

            <TiltLayer depth={20}>
              <ProjectDescription
                text={project.description}
                highlights={project.highlights}
                accent={accent}
                className="mt-4 sm:mt-5"
              />
            </TiltLayer>

            <TiltLayer depth={35} className="mt-6 min-w-0 sm:mt-8">
              <div className="mb-3 flex flex-wrap gap-1.5 sm:mb-4">
                {project.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-md border border-border bg-white/[0.02] px-2 py-1 font-mono text-[10px] text-muted"
                  >
                    {s}
                  </span>
                ))}
              </div>
              <div className="flex flex-col gap-2 border-t border-border pt-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4 sm:pt-4">
                {project.links.code ? (
                  <a
                    href={project.links.code}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 w-full items-center justify-center gap-1.5 rounded-xl border border-border bg-white/[0.02] px-3 font-heading text-sm font-medium text-muted transition-colors hover:text-ink sm:w-auto sm:justify-start sm:rounded-none sm:border-0 sm:bg-transparent sm:px-0 sm:min-h-0"
                  >
                    <Github className="h-4 w-4 shrink-0" /> Code
                  </a>
                ) : null}
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 w-full items-center justify-center gap-1.5 rounded-xl border border-border bg-white/[0.02] px-3 font-heading text-sm font-medium transition-colors sm:min-h-0 sm:w-auto sm:justify-start sm:rounded-none sm:border-0 sm:bg-transparent sm:px-0"
                  style={{ color: accent }}
                >
                  <ExternalLink className="h-4 w-4 shrink-0" /> Live Preview
                </a>
              </div>
            </TiltLayer>
          </div>

          <TiltLayer depth={30} className="min-w-0">
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
    <section id="projects" className="relative mx-auto max-w-6xl scroll-mt-24 px-5 py-20 sm:px-6 sm:py-24 md:py-32">
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
        <div className="-mx-1 mb-8 flex gap-2 overflow-x-auto px-1 pb-1 scrollbar-hide sm:mb-10 sm:flex-wrap sm:overflow-visible sm:pb-0">
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
            className="mb-5 sm:mb-6"
          >
            <FeaturedCard project={featured} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grid — single column mobile, 2-col from md (desktop intact) */}
      <motion.div layout className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {filtered.map((p) => (
            <motion.div
              key={p.id}
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="min-w-0"
            >
              <ProjectCard project={p} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}
