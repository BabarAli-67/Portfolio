import { motion } from 'framer-motion'
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
import { getAccent } from '../lib/utils'

// Explicit map keeps lucide tree-shakeable (vs. a namespace import).
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

export default function About() {
  return (
    <section id="about" className="relative mx-auto max-w-6xl scroll-mt-24 px-6 py-24 md:py-32">
      <SectionHeading
        eyebrow="About"
        title={<span className="text-gradient">Engineer who ships end-to-end</span>}
        lead={profile.summary}
      />

      {/* Skills grid + stack showcase */}
      <div id="skills" className="scroll-mt-24">
        <Reveal>
          <h3 className="mb-8 font-heading text-sm font-semibold uppercase tracking-[0.24em] text-faint">
            Technical Arsenal
          </h3>
        </Reveal>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_340px] lg:items-start lg:gap-10">
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
