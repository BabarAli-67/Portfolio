import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, Github, Linkedin, Loader2, Mail, MapPin, Phone, Send } from 'lucide-react'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'
import MagneticButton from './MagneticButton'
import { profile } from '../data/resume'

function Field({ label, name, type = 'text', value, onChange, textarea, required }) {
  const [focused, setFocused] = useState(false)
  const active = focused || value.length > 0
  const Tag = textarea ? 'textarea' : 'input'
  return (
    <div className="relative">
      <Tag
        id={name}
        name={name}
        type={type}
        required={required}
        value={value}
        rows={textarea ? 5 : undefined}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="peer w-full resize-none rounded-2xl border border-border bg-white/[0.02] px-4 pb-3 pt-6 text-sm text-ink outline-none transition-colors duration-300 placeholder-transparent focus:border-neon-cyan/60"
        placeholder={label}
      />
      <label
        htmlFor={name}
        className={`pointer-events-none absolute left-4 font-mono uppercase tracking-wider transition-all duration-200 ${
          active ? 'top-2 text-[10px] text-neon-cyan' : 'top-4 text-xs text-faint'
        }`}
      >
        {label}
      </label>
      {/* Animated focus ring */}
      <span
        className={`pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300 ${
          focused ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ boxShadow: '0 0 0 1px rgba(34,211,238,0.4), 0 0 28px -6px rgba(34,211,238,0.5)' }}
      />
    </div>
  )
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | sent

  const update = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const onSubmit = (e) => {
    e.preventDefault()
    if (status !== 'idle') return
    setStatus('sending')
    // Simulate submission physics, then hand off to the user's mail client.
    setTimeout(() => {
      setStatus('sent')
      const subject = encodeURIComponent(`Portfolio inquiry from ${form.name || 'a visitor'}`)
      const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`)
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
      setTimeout(() => {
        setStatus('idle')
        setForm({ name: '', email: '', message: '' })
      }, 2600)
    }, 1100)
  }

  const contactItems = [
    { icon: Mail, label: profile.email, href: profile.links.email },
    { icon: Phone, label: profile.phone, href: `tel:${profile.phone.replace(/\s/g, '')}` },
    { icon: MapPin, label: profile.location, href: null },
  ]

  return (
    <section id="contact" className="relative mx-auto max-w-6xl scroll-mt-24 px-6 py-24 md:py-32">
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-neon-cyan/10 blur-[120px]" />

      <SectionHeading
        eyebrow="Contact"
        align="center"
        title={
          <>
            <span className="text-gradient">Let's build something</span>{' '}
            <span className="text-gradient-neon">amazing</span>
          </>
        }
        lead="Open to full-stack and backend roles, freelance builds, and AI-integration projects. Drop a message — I reply fast."
      />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.2fr]">
        {/* Left: direct contact */}
        <Reveal>
          <div className="flex h-full flex-col justify-between rounded-3xl border border-border bg-card/50 p-8 backdrop-blur-sm">
            <div className="space-y-4">
              {contactItems.map(({ icon: Icon, label, href }) => {
                const inner = (
                  <div className="flex items-center gap-4 rounded-2xl border border-border bg-white/[0.02] px-4 py-4 transition-colors duration-300 hover:border-neon-cyan/40">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-neon-cyan/10 text-neon-cyan">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="break-all font-mono text-sm text-muted">{label}</span>
                  </div>
                )
                return href ? (
                  <a key={label} href={href} className="block">
                    {inner}
                  </a>
                ) : (
                  <div key={label}>{inner}</div>
                )
              })}
            </div>

            <div className="mt-8 flex gap-3">
              {[
                { icon: Github, href: profile.links.github, label: 'GitHub' },
                { icon: Linkedin, href: profile.links.linkedin, label: 'LinkedIn' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex h-12 flex-1 items-center justify-center gap-2 rounded-2xl border border-border text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-neon-violet/50 hover:text-neon-violet"
                >
                  <Icon className="h-4 w-4" /> {label}
                </a>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Right: form */}
        <Reveal delay={0.1}>
          <form
            onSubmit={onSubmit}
            className="rounded-3xl border border-border bg-card/50 p-8 backdrop-blur-sm"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Your Name" name="name" value={form.name} onChange={update} required />
              <Field
                label="Email"
                name="email"
                type="email"
                value={form.email}
                onChange={update}
                required
              />
            </div>
            <div className="mt-4">
              <Field
                label="Message"
                name="message"
                value={form.message}
                onChange={update}
                textarea
                required
              />
            </div>

            <div className="mt-6 flex items-center justify-between gap-4">
              <p className="font-mono text-xs text-faint">
                Sends via your mail client — no data stored.
              </p>
              <MagneticButton
                type="submit"
                variant="primary"
                strength={0.5}
                className="min-w-[150px]"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {status === 'idle' && (
                    <motion.span
                      key="idle"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="inline-flex items-center gap-2"
                    >
                      Send Message <Send className="h-4 w-4" />
                    </motion.span>
                  )}
                  {status === 'sending' && (
                    <motion.span
                      key="sending"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="inline-flex items-center gap-2"
                    >
                      Sending <Loader2 className="h-4 w-4 animate-spin" />
                    </motion.span>
                  )}
                  {status === 'sent' && (
                    <motion.span
                      key="sent"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="inline-flex items-center gap-2"
                    >
                      Sent <Check className="h-4 w-4" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </MagneticButton>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
