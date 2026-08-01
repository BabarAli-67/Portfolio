import { Sparkles } from 'lucide-react'
import TiltCard, { TiltLayer } from './TiltCard'
import { stackGrid } from '../data/resume'
import { getAccent } from '../lib/utils'

/**
 * Interactive stack.config.ts showcase — 3D tilt card with tech tiles.
 * Lives in Technical Arsenal as the primary stack visual.
 */
export default function StackConfigCard({ className = '' }) {
  return (
    <TiltCard max={16} glareAccent="#22D3EE" className={className}>
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
          {stackGrid.map((t) => (
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
  )
}
