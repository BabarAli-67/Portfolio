import { motion } from 'framer-motion'
import {
  BrainCircuit,
  Code2,
  Database,
  GraduationCap,
  LayoutTemplate,
  MapPin,
  Server,
  Sparkles,
  Wrench,
} from 'lucide-react'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'
import TiltCard, { TiltLayer } from './TiltCard'
import { useMagnetic } from '../hooks/useMagnetic'
import { education, profile, skillGroups } from '../data/resume'
import { getAccent } from '../lib/utils'

// Explicit map keeps lucide tree-shakeable (vs. a namespace import).
const ICONS = { Code2, Server, LayoutTemplate, BrainCircuit, Database, Wrench }

// A skill pill with a light magnetic pull.
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

      {/* Bio + education split */}
      <div className="mb-16 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Reveal className="lg:col-span-2">
          <div className="h-full rounded-3xl border border-border bg-card/50 p-8 backdrop-blur-sm">
            <p className="text-lg leading-relaxed text-muted">
              Strong foundation in <span className="text-ink">DSA</span>,{' '}
              <span className="text-ink">OOP</span>, and{' '}
              <span className="text-ink">database design</span>, with a track record of shipping
              full-stack features independently and in team settings. From{' '}
              <span className="text-neon-cyan">Backend-for-Frontend proxies</span> to{' '}
              <span className="text-neon-violet">hybrid AI matching engines</span>, I build systems
              that are secure, fast, and production-ready.
            </p>
            <div className="mt-6 flex items-center gap-2 font-mono text-sm text-faint">
              <MapPin className="h-4 w-4 text-neon-cyan" /> {profile.location}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <TiltCard max={10} glareAccent="#A855F7" className="h-full">
            <div className="flex h-full flex-col justify-between rounded-3xl border border-border bg-card/50 p-8 backdrop-blur-sm">
              <TiltLayer depth={40} className="flex items-start justify-between">
                <GraduationCap className="h-9 w-9 text-neon-violet" />
                <span className="font-mono text-[11px] uppercase tracking-widest text-faint">
                  {education.period}
                </span>
              </TiltLayer>
              <TiltLayer depth={25} className="mt-8">
                <h3 className="font-heading text-xl font-semibold text-ink">{education.degree}</h3>
                <p className="mt-2 text-sm text-muted">{education.school}</p>
                <p className="mt-1 font-mono text-xs text-faint">{education.location}</p>
              </TiltLayer>
            </div>
          </TiltCard>
        </Reveal>
      </div>

      {/* Skills grid */}
      <div id="skills" className="scroll-mt-24">
        <Reveal>
          <h3 className="mb-8 font-heading text-sm font-semibold uppercase tracking-[0.24em] text-faint">
            Technical Arsenal
          </h3>
        </Reveal>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((g, i) => (
            <SkillCard key={g.id} group={g} index={i} />
          ))}
        </div>
      </div>

      {/* Coursework */}
      <Reveal delay={0.1}>
        <div className="mt-10 rounded-3xl border border-border bg-card/40 p-6">
          <div className="mb-4 font-mono text-xs uppercase tracking-widest text-faint">
            Relevant Coursework
          </div>
          <div className="flex flex-wrap gap-2">
            {education.coursework.map((c) => (
              <span
                key={c}
                className="rounded-lg border border-border bg-white/[0.02] px-3 py-1.5 text-xs text-muted"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  )
}
