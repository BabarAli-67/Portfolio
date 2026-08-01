import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

/**
 * Full-viewport interactive particle field.
 *
 * Physics:
 *  - Each node drifts with a small base velocity.
 *  - The cursor acts as a repulsion field: nodes within `mouseRadius` are
 *    pushed away, with force scaled by proximity AND cursor speed, so fast
 *    swipes visibly disperse / stretch the field.
 *  - Nearby nodes are linked with lines whose opacity falls off with distance,
 *    forming a living constellation. Links near the cursor glow brighter.
 */
export default function ParticleCanvas() {
  const canvasRef = useRef(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (reduced) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d', { alpha: true })

    let width = 0
    let height = 0
    let dpr = Math.min(window.devicePixelRatio || 1, 2)
    let particles = []
    let raf = 0

    const mouse = { x: -9999, y: -9999, px: -9999, py: -9999, speed: 0 }
    const COLORS = ['#22D3EE', '#A855F7', '#3B82F6', '#34D399']

    function resize() {
      width = canvas.clientWidth
      height = canvas.clientHeight
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      seed()
    }

    function seed() {
      // Density scales with viewport area, capped for performance.
      const count = Math.min(140, Math.floor((width * height) / 14000))
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.8 + 0.6,
        color: COLORS[(Math.random() * COLORS.length) | 0],
      }))
    }

    const mouseRadius = 150

    function step() {
      ctx.clearRect(0, 0, width, height)

      // Decay cursor speed each frame for a natural trail-off.
      mouse.speed *= 0.9

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Cursor repulsion, amplified by cursor speed.
        const dx = p.x - mouse.x
        const dy = p.y - mouse.y
        const dist = Math.hypot(dx, dy)
        if (dist < mouseRadius && dist > 0.01) {
          const force = (1 - dist / mouseRadius) * (1 + mouse.speed * 0.06)
          p.vx += (dx / dist) * force * 0.6
          p.vy += (dy / dist) * force * 0.6
        }

        // Integrate + gentle damping so the field settles after a swipe.
        p.x += p.vx
        p.y += p.vy
        p.vx *= 0.96
        p.vy *= 0.96

        // Keep a minimum drift so it never fully freezes.
        if (Math.abs(p.vx) < 0.05) p.vx += (Math.random() - 0.5) * 0.05
        if (Math.abs(p.vy) < 0.05) p.vy += (Math.random() - 0.5) * 0.05

        // Wrap around edges.
        if (p.x < -20) p.x = width + 20
        if (p.x > width + 20) p.x = -20
        if (p.y < -20) p.y = height + 20
        if (p.y > height + 20) p.y = -20

        // Draw node.
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = 0.65
        ctx.fill()
      }

      // Constellation links.
      ctx.globalAlpha = 1
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i]
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d = Math.hypot(dx, dy)
          if (d < 120) {
            const mid = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }
            const nearCursor = Math.hypot(mid.x - mouse.x, mid.y - mouse.y) < mouseRadius
            ctx.strokeStyle = nearCursor ? '#22D3EE' : '#3B5A8A'
            ctx.globalAlpha = (1 - d / 120) * (nearCursor ? 0.55 : 0.18)
            ctx.lineWidth = nearCursor ? 0.9 : 0.5
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      ctx.globalAlpha = 1
      raf = requestAnimationFrame(step)
    }

    function onMove(e) {
      mouse.px = mouse.x
      mouse.py = mouse.y
      mouse.x = e.clientX
      mouse.y = e.clientY
      const dvx = mouse.x - mouse.px
      const dvy = mouse.y - mouse.py
      mouse.speed = Math.min(40, Math.hypot(dvx, dvy))
    }

    function onLeave() {
      mouse.x = -9999
      mouse.y = -9999
    }

    resize()
    step()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseout', onLeave)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseout', onLeave)
    }
  }, [reduced])

  if (reduced) {
    // Static, calm gradient fallback for reduced-motion users.
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(34,211,238,0.08),transparent_55%),radial-gradient(ellipse_at_bottom_right,rgba(168,85,247,0.08),transparent_55%)]"
      />
    )
  }

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
    />
  )
}
