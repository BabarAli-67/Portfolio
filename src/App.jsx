import { motion, useScroll, useSpring } from 'framer-motion'
import DeferredParticles from './components/DeferredParticles'
import CursorSpotlight from './components/CursorSpotlight'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Testimonials from './components/Testimonials'
import Education from './components/Education'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 })

  return (
    <div className="relative min-h-screen">
      {/* Particles: client-only + deferred — density/visuals unchanged */}
      <DeferredParticles />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 bg-grid-lines bg-[size:60px_60px] opacity-30 [mask-image:radial-gradient(ellipse_at_center,#000_20%,transparent_75%)]"
      />

      <CursorSpotlight />

      <motion.div
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[70] h-0.5 origin-left bg-gradient-to-r from-neon-cyan via-neon-violet to-neon-emerald"
      />

      <div className="relative z-10">
        <Navbar />

        <main>
          <Hero />
          <About />
          <Projects />
          <Experience />
          <Testimonials />
          <Education />
          <Contact />
        </main>

        <Footer />
      </div>
    </div>
  )
}
