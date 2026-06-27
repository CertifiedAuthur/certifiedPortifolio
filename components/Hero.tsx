'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

const roles = [
  'Full-Stack AI Engineer',
  'AI Systems Architect',
  'Founding Engineer',
  'Product Engineer',
]

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)

  useEffect(() => {
    const t = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length)
    }, 2800)
    return () => clearInterval(t)
  }, [])

  return (
    <section
      id="header"
      className="relative w-full h-screen flex items-center"
      style={{
        backgroundImage: 'url(/images/prof.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Overlay — always dark so hero text stays readable in both themes */}
      <div className="absolute inset-0 bg-[rgba(8,8,8,0.65)]" />

      <div className="relative z-10 w-full px-6 sm:px-[8%] max-w-7xl mx-auto">
        {/* Cycling role */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-2 text-xl sm:text-2xl font-medium text-muted mb-4"
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={roleIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
            >
              {roles[roleIndex]}
            </motion.span>
          </AnimatePresence>
          <span className="cursor" aria-hidden />
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl sm:text-7xl font-bold leading-tight text-white"
        >
          Hi, I&apos;m{' '}
          <span className="text-accent">Okafor</span>
          <br />
          Authur From Nigeria
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.72, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 text-[15px] sm:text-[17px] text-muted max-w-xl leading-relaxed"
        >
          I design, build, and ship complete intelligent software systems: architecture,
          scalable backends, production frontends, and cloud deployment.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.92, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <button
            onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-block bg-accent text-white px-10 py-3.5 rounded-md text-[15px] font-medium hover:opacity-90 transition-opacity duration-200 cursor-pointer"
          >
            View My Work
          </button>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-block border border-white/30 text-white px-10 py-3.5 rounded-md text-[15px] font-medium hover:border-accent hover:text-accent transition-colors duration-300 cursor-pointer"
          >
            Get In Touch
          </button>
        </motion.div>
      </div>
    </section>
  )
}
