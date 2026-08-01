import { motion } from 'framer-motion'
import { ArrowUpRight, Github, Linkedin, Mail, Sparkles } from 'lucide-react'
import MagneticButton from './MagneticButton'
import Typewriter from './Typewriter'
import CountUp from './CountUp'
import TiltCard, { TiltLayer } from './TiltCard'
import { marqueeBottom, marqueeTop, profile, stats } from '../data/resume'
import { getAccent } from '../lib/utils'

const gridTech = [
  { label: 'Node.js', accent: 'emerald' },
  { label: 'React', accent: 'cyan' },
  { label: 'MongoDB', accent: 'emerald' },
  { label: 'Express', accent: 'blue' },
  { label: 'Gemini', accent: 'violet' },
  { label: 'FastAPI', accent: 'emerald' },
  { label: 'Next.js', accent: 'cyan' },
  { label: 'Docker', accent: 'blue' },
  { label: 'YOLOv8', accent: 'pink' },
]

function Marquee({ items, reverse }) {
  const doubled = [...items, ...items]
  return (
    <div className="group relative flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
      <div
        className={`flex shrink-0 gap-3 pr-3 ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'} group-hover:[animation-play-state:paused]`}
      >
        {doubled.map((t, i) => (
          <span
            key={`${t}-${i}`}
            className="whitespace-nowrap rounded-lg border border-border bg-white/[0.02] px-4 py-2 font-mono text-xs text-muted"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden pt-28 md:pt-24">
      {/* Ambient glows */}
      <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-neon-cyan/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 bottom-10 h-96 w-96 rounded-full bg-neon-violet/10 blur-[120px]" />

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-14 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        {/* Left: copy */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-border bg-white/[0.03] px-3.5 py-1.5 text-xs font-medium text-muted"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon-emerald opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-neon-emerald" />
            </span>
            Available for new opportunities
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="font-display text-5xl font-extrabold leading-[1.02] tracking-tight md:text-7xl"
          >
            <span className="text-gradient">Hi, I'm {profile.name.split(' ')[0]}</span>
            <br />
            <Typewriter words={profile.roles} className="text-gradient-neon" />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-7 max-w-xl text-lg leading-relaxed text-muted"
          >
            {profile.title} · {profile.subtitle}. I architect high-performance backend systems and
            weave AI/ML models — Gemini, YOLOv8, OCR — into production pipelines that ship.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <MagneticButton href="#projects" variant="primary">
              Explore Work <ArrowUpRight className="h-4 w-4" />
            </MagneticButton>
            <MagneticButton href="#contact" variant="ghost">
              Get in Touch
            </MagneticButton>
            <div className="ml-1 flex items-center gap-2">
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
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-border text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-neon-cyan/50 hover:text-neon-cyan"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mt-12 grid max-w-lg grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4"
          >
            {stats.map((s) => (
              <div key={s.label}>
                <div className="font-display text-3xl font-bold text-ink md:text-4xl">
                  <CountUp value={s.value} prefix={s.prefix} suffix={s.suffix} />
                </div>
                <div className="mt-1 text-[11px] font-medium uppercase tracking-widest text-faint">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: floating 3D tech grid */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative hidden lg:block"
        >
          <TiltCard max={16} glareAccent="#22D3EE" className="animate-float">
            <div className="relative rounded-3xl border border-border bg-card/60 p-6 shadow-glow-soft backdrop-blur-xl">
              <TiltLayer depth={20} className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-2 font-mono text-xs text-muted">
                  <Sparkles className="h-3.5 w-3.5 text-neon-cyan" />
                  stack.config.ts
                </div>
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-neon-pink/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-neon-cyan/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-neon-emerald/70" />
                </div>
              </TiltLayer>

              <TiltLayer depth={55} className="grid grid-cols-3 gap-3">
                {gridTech.map((t) => (
                  <div
                    key={t.label}
                    className="group/tile flex aspect-square flex-col items-center justify-center gap-2 rounded-2xl border border-border bg-white/[0.02] transition-colors duration-300 hover:bg-white/[0.06]"
                    style={{ '--a': getAccent(t.accent) }}
                  >
                    <span
                      className="h-2.5 w-2.5 rounded-full transition-all duration-300 group-hover/tile:scale-150"
                      style={{ background: 'var(--a)', boxShadow: '0 0 14px var(--a)' }}
                    />
                    <span className="text-center font-mono text-[11px] text-muted transition-colors group-hover/tile:text-ink">
                      {t.label}
                    </span>
                  </div>
                ))}
              </TiltLayer>

              <TiltLayer depth={30} className="mt-5 rounded-2xl border border-border bg-white/[0.02] px-4 py-3">
                <div className="flex items-center justify-between font-mono text-[11px]">
                  <span className="text-faint">$ npm run build</span>
                  <span className="text-neon-emerald">✓ shipped</span>
                </div>
              </TiltLayer>
            </div>
          </TiltCard>
        </motion.div>
      </div>

      {/* Marquees pinned to hero base */}
      <div className="absolute inset-x-0 bottom-6 hidden flex-col gap-3 md:flex">
        <Marquee items={marqueeTop} />
        <Marquee items={marqueeBottom} reverse />
      </div>
    </section>
  )
}
