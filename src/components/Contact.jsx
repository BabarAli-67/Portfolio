import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, Loader2, Mail, MapPin, Phone, Send } from 'lucide-react'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'
import MagneticButton from './MagneticButton'
import SocialLinks from './SocialLinks'
import { profile } from '../data/resume'

const WA_NUMBER = '923090123027'

function buildWhatsAppUrl({ name, email, message }) {
  const text = [
    'Hi Babar — portfolio inquiry',
    '',
    `Name: ${name}`,
    `Email: ${email}`,
    '',
    'Message:',
    message,
  ].join('\n')

  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`
}

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

    const name = form.name.trim()
    const email = form.email.trim()
    const message = form.message.trim()
    if (!name || !email || !message) return

    setStatus('sending')

    // Brief success feedback, then open WhatsApp with a pre-filled inquiry.
    window.setTimeout(() => {
      const url = buildWhatsAppUrl({ name, email, message })
      window.open(url, '_blank', 'noopener,noreferrer')
      setStatus('sent')
      window.setTimeout(() => {
        setStatus('idle')
        setForm({ name: '', email: '', message: '' })
      }, 2400)
    }, 700)
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
        {/* Contact details — after form on mobile; left column on desktop */}
        <Reveal className="order-2 lg:order-1">
          <div className="flex h-full flex-col justify-between rounded-3xl border border-border bg-card/50 p-5 backdrop-blur-sm sm:p-8">
            <div className="space-y-3 sm:space-y-4">
              {contactItems.map(({ icon: Icon, label, href }) => {
                const isEmail = label.includes('@')
                const inner = (
                  <div className="flex min-w-0 items-center gap-3 rounded-2xl border border-border bg-white/[0.02] px-3 py-3 transition-colors duration-300 hover:border-neon-cyan/40 sm:gap-4 sm:px-4 sm:py-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-neon-cyan/10 text-neon-cyan sm:h-11 sm:w-11">
                      <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                    </span>
                    <span
                      title={label}
                      className={
                        isEmail
                          ? 'min-w-0 flex-1 whitespace-nowrap font-mono text-[11px] tracking-tight text-muted sm:text-sm sm:tracking-normal'
                          : 'min-w-0 flex-1 break-words font-mono text-xs text-muted sm:break-all sm:text-sm'
                      }
                    >
                      {label}
                    </span>
                  </div>
                )
                return href ? (
                  <a key={label} href={href} className="block min-w-0">
                    {inner}
                  </a>
                ) : (
                  <div key={label} className="min-w-0">
                    {inner}
                  </div>
                )
              })}
            </div>

            <SocialLinks variant="chip" exclude={['email']} className="mt-8" />
          </div>
        </Reveal>

        {/* Form — first on mobile; right column on desktop */}
        <Reveal delay={0.1} className="order-1 lg:order-2">
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

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              <p className="order-2 font-mono text-[11px] text-faint sm:order-1 sm:text-xs">
                Opens WhatsApp with your message — no data stored.
              </p>
              <MagneticButton
                type="submit"
                variant="primary"
                strength={0.5}
                className="order-1 w-full px-4 py-2.5 text-xs sm:order-2 sm:w-auto sm:min-w-[150px] sm:px-6 sm:py-3.5 sm:text-sm"
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
