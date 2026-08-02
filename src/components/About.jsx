import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  BrainCircuit,
  Code2,
  Database,
  LayoutTemplate,
  Server,
  Sparkles,
  Wrench,
} from 'lucide-react'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'
import TiltCard, { TiltLayer } from './TiltCard'
import StackConfigCard from './StackConfigCard'
import { useMagnetic } from '../hooks/useMagnetic'
import { profile, skillGroups } from '../data/resume'
import { cn, getAccent } from '../lib/utils'

const ICONS = { Code2, Server, LayoutTemplate, BrainCircuit, Database, Wrench }

function MagneticPill({ label, accent }) {
  const { ref, x, y, handleMove, handleLeave } = useMagnetic(0.4)
  return (
    <motion.span
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x, y }}
      className="cursor-default rounded-full border border-border bg-white/[0.03] px-3 py-1.5 font-mono text-xs text-muted transition-colors duration-300 hover:text-ink"
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `${getAccent(accent)}66`
        e.currentTarget.style.color = getAccent(accent)
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.borderColor = ''
        e.currentTarget.style.color = ''
      }}
    >
      {label}
    </motion.span>
  )
}

function SkillPanel({ group, compact = false }) {
  const Icon = ICONS[group.icon] ?? Sparkles
  const accent = getAccent(group.accent)
  return (
    <div
      className={cn(
        'flex flex-col rounded-3xl border border-border bg-card/50 backdrop-blur-sm',
        compact ? 'p-5' : 'h-full p-6'
      )}
    >
      <div className="mb-4 flex items-center gap-3">
        <span
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-border sm:h-12 sm:w-12"
          style={{ background: `${accent}14`, boxShadow: `inset 0 0 0 1px ${accent}33` }}
        >
          <Icon className="h-5 w-5" style={{ color: accent }} />
        </span>
        <h3 className="font-heading text-base font-semibold text-ink sm:text-lg">{group.title}</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {group.skills.map((s) => (
          <MagneticPill key={s} label={s} accent={group.accent} />
        ))}
      </div>
    </div>
  )
}

function SkillCard({ group, index }) {
  const Icon = ICONS[group.icon] ?? Sparkles
  const accent = getAccent(group.accent)
  return (
    <Reveal delay={index * 0.06}>
      <TiltCard max={12} glareAccent={accent} className="h-full">
        <div className="group flex h-full flex-col rounded-3xl border border-border bg-card/50 p-6 backdrop-blur-sm transition-colors duration-300 hover:border-white/20">
          <TiltLayer depth={45} className="mb-5 flex items-center gap-3">
            <span
              className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border transition-all duration-300"
              style={{ background: `${accent}14`, boxShadow: `inset 0 0 0 1px ${accent}33` }}
            >
              <Icon className="h-5 w-5" style={{ color: accent }} />
            </span>
            <h3 className="font-heading text-lg font-semibold text-ink">{group.title}</h3>
          </TiltLayer>
          <TiltLayer depth={25} className="flex flex-wrap gap-2">
            {group.skills.map((s) => (
              <MagneticPill key={s} label={s} accent={group.accent} />
            ))}
          </TiltLayer>
        </div>
      </TiltCard>
    </Reveal>
  )
}

/** Mobile-only: horizontal category tabs + one compact panel */
function MobileArsenal() {
  const [activeId, setActiveId] = useState(skillGroups[0]?.id)
  const active = skillGroups.find((g) => g.id === activeId) ?? skillGroups[0]
  const accent = getAccent(active.accent)

  return (
    <div className="space-y-4 md:hidden">
      <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 scrollbar-hide">
        {skillGroups.map((g) => {
          const isActive = g.id === active.id
          const a = getAccent(g.accent)
          return (
            <button
              key={g.id}
              type="button"
              onClick={() => setActiveId(g.id)}
              className={cn(
                'shrink-0 rounded-full border px-3.5 py-2 font-heading text-xs font-medium transition-colors duration-200',
                isActive
                  ? 'border-transparent text-base'
                  : 'border-border bg-white/[0.02] text-muted'
              )}
              style={
                isActive
                  ? { background: a, boxShadow: `0 0 20px -6px ${a}` }
                  : undefined
              }
            >
              {g.title}
            </button>
          )
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.22 }}
          style={{ boxShadow: `0 0 40px -24px ${accent}` }}
          className="rounded-3xl"
        >
          <SkillPanel group={active} compact />
        </motion.div>
      </AnimatePresence>

      <StackConfigCard className="mx-auto w-full max-w-sm" />
    </div>
  )
}

export default function About() {
  return (
    <section id="about" className="relative mx-auto max-w-6xl scroll-mt-24 px-6 py-24 md:py-32">
      <SectionHeading
        eyebrow="About"
        title={<span className="text-gradient">Engineer who ships end-to-end</span>}
        lead={profile.summary}
      />

      <div id="skills" className="scroll-mt-24">
        <Reveal>
          <h3 className="mb-6 font-heading text-sm font-semibold uppercase tracking-[0.24em] text-faint md:mb-8">
            Technical Arsenal
          </h3>
        </Reveal>

        {/* Mobile: tabs + single panel */}
        <MobileArsenal />

        {/* Tablet / desktop: original grid (unchanged) */}
        <div className="hidden grid-cols-1 gap-8 md:grid lg:grid-cols-[1fr_340px] lg:items-start lg:gap-10">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {skillGroups.map((g, i) => (
              <SkillCard key={g.id} group={g} index={i} />
            ))}
          </div>

          <Reveal delay={0.12} className="lg:sticky lg:top-28">
            <StackConfigCard className="mx-auto w-full max-w-sm lg:max-w-none" />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
