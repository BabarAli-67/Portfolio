import { motion, useScroll, useSpring } from 'framer-motion'
import ParticleCanvas from './components/ParticleCanvas'
import CursorSpotlight from './components/CursorSpotlight'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 })

  return (
    <div className="relative min-h-screen">
      {/* Interactive physics background + subtle grid overlay */}
      <ParticleCanvas />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 bg-grid-lines bg-[size:60px_60px] opacity-40 [mask-image:radial-gradient(ellipse_at_center,#000_20%,transparent_75%)]"
      />

      {/* Cursor glow + dot */}
      <CursorSpotlight />

      {/* Scroll progress bar */}
      <motion.div
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[70] h-0.5 origin-left bg-gradient-to-r from-neon-cyan via-neon-violet to-neon-emerald"
      />

      <Navbar />

      <main>
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Contact />
      </main>

      <Footer />
    </div>
  )
}
