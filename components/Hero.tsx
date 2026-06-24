'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

const roles = [
  'Machine Learning Engineer',
  'AI Engineer',
  'RAG Specialist',
  'Multi-Agent Builder',
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
      {/* Overlay */}
      <div className="absolute inset-0 bg-bg/60" />

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

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10"
        >
          <button
            onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-block border border-accent text-white px-10 py-3.5 rounded-md text-[15px] font-medium hover:bg-accent transition-colors duration-300 cursor-pointer"
          >
            View My Work
          </button>
        </motion.div>
      </div>
    </section>
  )
}
