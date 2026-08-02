import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { GraduationCap, MapPin } from 'lucide-react'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'
import { education } from '../data/resume'
import { getAccent } from '../lib/utils'

const ACCENT = 'violet'

function TimelineItem({ index }) {
  const accent = getAccent(ACCENT)
  return (
    <div className="relative pl-12 md:pl-16">
      {/* Node — same glow / ping treatment as Experience */}
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
        <div className="group rounded-3xl border border-border bg-card/50 p-6 backdrop-blur-sm transition-colors duration-300 hover:border-white/20 md:p-8">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span
                className="flex h-11 w-11 items-center justify-center rounded-xl"
                style={{ background: `${accent}14`, boxShadow: `inset 0 0 0 1px ${accent}33` }}
              >
                <GraduationCap className="h-5 w-5" style={{ color: accent }} />
              </span>
              <div>
                <h3 className="font-heading text-lg font-semibold text-ink">{education.degree}</h3>
                <p className="text-sm" style={{ color: accent }}>
                  {education.school}
                </p>
              </div>
            </div>
            <span className="rounded-full border border-border px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-faint">
              {education.period}
            </span>
          </div>

          <div className="mb-5 flex items-center gap-2 font-mono text-sm text-faint">
            <MapPin className="h-4 w-4" style={{ color: accent }} />
            {education.location}
          </div>

          <div>
            <div className="mb-3 font-mono text-[11px] uppercase tracking-widest text-faint">
              Relevant Coursework
            </div>
            {/* Mobile: 2-col compact grid; desktop: original wrap pills */}
            <div className="grid grid-cols-2 gap-2 md:flex md:flex-wrap md:gap-2">
              {education.coursework.map((c) => (
                <span
                  key={c}
                  className="flex min-h-[2.5rem] items-center justify-center rounded-lg border border-border bg-white/[0.02] px-2 py-2 text-center text-[11px] leading-snug text-muted break-words hyphens-auto md:min-h-0 md:justify-start md:px-3 md:py-1.5 md:text-left md:text-xs md:leading-normal"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  )
}

export default function Education() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 65%', 'end 60%'],
  })
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 })

  return (
    <section id="education" className="relative mx-auto max-w-5xl scroll-mt-24 px-6 py-24 md:py-32">
      <SectionHeading
        eyebrow="Education"
        title={<span className="text-gradient">Academic foundation</span>}
        lead="Formal training in computer science — algorithms, systems, and software engineering."
      />

      <div ref={ref} className="relative">
        {/* Track */}
        <div className="absolute left-2 top-0 h-full w-px bg-border md:left-3" />
        {/* Progress fill — same cyan → violet → emerald gradient */}
        <motion.div
          style={{ scaleY }}
          className="absolute left-2 top-0 h-full w-px origin-top bg-gradient-to-b from-neon-cyan via-neon-violet to-neon-emerald md:left-3"
        />

        <div className="space-y-8">
          <TimelineItem index={0} />
        </div>
      </div>
    </section>
  )
}
