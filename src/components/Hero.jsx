import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import MagneticButton from './MagneticButton'
import Typewriter from './Typewriter'
import SocialLinks from './SocialLinks'
import { marqueeBottom, marqueeTop, profile } from '../data/resume'

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

function Avatar() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="relative mx-auto flex w-full max-w-[320px] items-center justify-center lg:max-w-[380px]"
    >
      {/* Soft ambient glow behind the portrait */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-[8%] rounded-full bg-neon-cyan/20 blur-[48px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-[18%] rounded-full bg-neon-violet/15 blur-[36px]"
      />

      {/* Gradient ring + portrait */}
      <div className="animate-float relative aspect-square w-full">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-neon-cyan via-neon-violet to-neon-pink p-[3px] shadow-glow">
          <div className="relative h-full w-full overflow-hidden rounded-full bg-surface p-1.5">
            <img
              src={profile.avatar}
              alt={`${profile.name} — ${profile.title}`}
              width={380}
              height={380}
              className="h-full w-full rounded-full object-cover object-top"
              decoding="async"
            />
            {/* Soft vignette so the studio white bg blends into the dark UI */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-1.5 rounded-full shadow-[inset_0_0_40px_12px_rgba(5,6,11,0.35)]"
            />
          </div>
        </div>

        {/* Subtle inner rim highlight */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-white/10"
        />
      </div>
    </motion.div>
  )
}

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-28 md:pt-24 md:pb-32">
      {/* Ambient glows */}
      <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-neon-cyan/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 bottom-10 h-96 w-96 rounded-full bg-neon-violet/10 blur-[120px]" />

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        {/* Left: copy — vertically centered with avatar */}
        <div className="flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-7 inline-flex w-fit items-center gap-2 rounded-full border border-border bg-white/[0.03] px-3.5 py-1.5 text-xs font-medium text-muted"
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
            <SocialLinks className="ml-1" />
          </motion.div>
        </div>

        {/* Right: circular portrait */}
        <div className="order-first flex items-center justify-center lg:order-last">
          <Avatar />
        </div>
      </div>

      {/* Marquees pinned to hero base */}
      <div className="absolute inset-x-0 bottom-6 hidden flex-col gap-3 md:flex">
        <Marquee items={marqueeTop} />
        <Marquee items={marqueeBottom} reverse />
      </div>
    </section>
  )
}
