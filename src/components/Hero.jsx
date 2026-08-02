import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import MagneticButton from './MagneticButton'
import Typewriter from './Typewriter'
import SocialLinks from './SocialLinks'
import { marqueeBottom, marqueeTop, profile } from '../data/resume'

function Marquee({ items, reverse }) {
  const doubled = [...items, ...items]
  return (
    <div className="group relative w-full overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
      <div
        className={`flex w-max shrink-0 gap-3 pr-3 ${
          reverse ? 'animate-marquee-reverse' : 'animate-marquee'
        } group-hover:[animation-play-state:paused]`}
      >
        {doubled.map((t, i) => (
          <span
            key={`${t}-${i}`}
            className="whitespace-nowrap rounded-lg border border-border bg-white/[0.02] px-3 py-1.5 font-mono text-[11px] text-muted sm:px-4 sm:py-2 sm:text-xs"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}

function Avatar({ introReady = true }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: introReady ? 1 : 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="relative mx-auto aspect-square w-[min(72vw,260px)] sm:w-[min(60vw,300px)] lg:w-full lg:max-w-[360px]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-[10%] rounded-full bg-neon-cyan/20 blur-[40px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-[18%] rounded-full bg-neon-violet/15 blur-[32px]"
      />

      <div className="relative h-full w-full">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-neon-cyan via-neon-violet to-neon-pink p-[3px] shadow-glow">
          <div className="h-full w-full overflow-hidden rounded-full bg-surface p-1.5">
            <img
              src={profile.avatar}
              alt={`${profile.name} — ${profile.title}`}
              width={360}
              height={360}
              className="h-full w-full rounded-full object-cover object-top"
              decoding="async"
              fetchPriority="high"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-1.5 rounded-full shadow-[inset_0_0_40px_12px_rgba(5,6,11,0.35)]"
            />
          </div>
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-white/10"
        />
      </div>
    </motion.div>
  )
}

export default function Hero({ introReady = true }) {
  return (
    <section
      id="top"
      className="relative isolate flex w-full flex-col overflow-x-clip pt-24 sm:pt-28"
    >
      {/* Ambient glows — decorative only */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-16 -z-10 h-72 w-72 rounded-full bg-neon-cyan/10 blur-[100px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-24 -z-10 h-72 w-72 rounded-full bg-neon-violet/10 blur-[100px]"
      />

      {/* Main content — stable flex stack; no absolute children that alter scroll height */}
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-5 pb-8 sm:gap-12 sm:px-6 sm:pb-10 lg:flex-row lg:items-center lg:gap-16 lg:pb-14 lg:pt-4">
        {/* Copy */}
        <div className="flex w-full min-w-0 flex-1 flex-col gap-5 sm:gap-6 lg:max-w-[58%]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: introReady ? 1 : 0 }}
            transition={{ duration: 0.45 }}
            className="inline-flex w-fit max-w-full items-center gap-2 rounded-full border border-border bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-muted"
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon-emerald opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-neon-emerald" />
            </span>
            Available for new opportunities
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: introReady ? 1 : 0 }}
            transition={{ duration: 0.5, delay: introReady ? 0.05 : 0 }}
            className="flex flex-col gap-3"
          >
            <h1 className="font-display text-[clamp(1.85rem,7.5vw,4.5rem)] font-extrabold leading-[1.15] tracking-tight text-balance">
              <span className="text-gradient">Hi, I'm {profile.name.split(' ')[0]}</span>
            </h1>
            <p className="font-display text-[clamp(1.15rem,4.8vw,2.75rem)] font-bold leading-[1.25] tracking-tight text-balance">
              <Typewriter
                words={profile.roles}
                active={introReady}
                className="hero-typewriter"
              />
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: introReady ? 1 : 0 }}
            transition={{ duration: 0.5, delay: introReady ? 0.1 : 0 }}
            className="max-w-xl text-[0.95rem] leading-relaxed text-muted sm:text-lg"
          >
            {profile.title} · {profile.subtitle}. I architect high-performance backend systems and
            weave AI/ML models — Gemini, YOLOv8, OCR — into production pipelines that ship.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: introReady ? 1 : 0 }}
            transition={{ duration: 0.5, delay: introReady ? 0.15 : 0 }}
            className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
          >
            <div className="flex flex-wrap items-center gap-3">
              <MagneticButton href="#projects" variant="primary">
                Explore Work <ArrowUpRight className="h-4 w-4" />
              </MagneticButton>
              <MagneticButton href="#contact" variant="outline">
                Let's Talk
              </MagneticButton>
            </div>
            <SocialLinks />
          </motion.div>
        </div>

        {/* Avatar — second on mobile, right column on desktop */}
        <div className="flex w-full shrink-0 justify-center lg:w-[42%] lg:justify-end">
          <Avatar introReady={introReady} />
        </div>
      </div>

      {/* Tech tickers — always in document flow (no absolute) to prevent scroll thrash */}
      <div className="mt-2 flex w-full flex-col gap-2.5 pb-8 sm:gap-3 sm:pb-10 md:pb-12">
        <Marquee items={marqueeTop} />
        <Marquee items={marqueeBottom} reverse />
      </div>
    </section>
  )
}
