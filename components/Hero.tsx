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
      {/* Directional overlay: denser left (text) fades toward right (photo visible) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(105deg, rgba(8,8,8,0.91) 0%, rgba(8,8,8,0.76) 52%, rgba(8,8,8,0.52) 100%)',
        }}
      />

      <div className="relative z-10 w-full px-6 sm:px-[8%] max-w-7xl mx-auto">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-4 mb-7"
        >
          <span className="eyebrow text-white/45">Chibuzor Authur Okafor</span>
          <span className="block h-px w-10 bg-accent shrink-0" />
          <span className="eyebrow text-accent">Available for Work</span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 44 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-bold text-white leading-[0.92]"
          style={{ fontSize: 'clamp(54px, 9.5vw, 104px)' }}
        >
          I Build AI<br />
          Systems That<br />
          <span className="text-accent">Actually Ship.</span>
        </motion.h1>

        {/* Cycling role subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.56, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-2 mt-6"
          style={{ fontSize: 'clamp(15px, 2vw, 19px)' }}
        >
          <span className="text-white/55 font-light">
            <AnimatePresence mode="wait">
              <motion.span
                key={roleIndex}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28 }}
              >
                {roles[roleIndex]}
              </motion.span>
            </AnimatePresence>
          </span>
          <span className="cursor" aria-hidden />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.72, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 text-[15px] sm:text-[17px] text-white/68 max-w-lg leading-relaxed"
        >
          Production backends, intelligent pipelines, multi-tenant SaaS, cloud
          infrastructure, and modern frontends. Full stack. From Nigeria.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.88, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <button
            onClick={() =>
              document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })
            }
            className="bg-accent text-white px-10 py-3.5 rounded-md text-[15px] font-medium hover:opacity-90 transition-opacity duration-200 cursor-pointer"
          >
            View My Work
          </button>
          <button
            onClick={() =>
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
            }
            className="border border-white/30 text-white px-10 py-3.5 rounded-md text-[15px] font-medium hover:border-accent hover:text-accent transition-colors duration-300 cursor-pointer"
          >
            Get In Touch
          </button>
        </motion.div>
      </div>

      {/* Bottom bar: social links + availability indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 1.1 }}
        className="absolute bottom-8 left-0 right-0 px-6 sm:px-[8%] max-w-7xl mx-auto"
      >
        <div className="flex items-center gap-6 text-[12px] text-white/32 tracking-wide">
          <a
            href="https://github.com/CertifiedAuthur"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white/65 transition-colors duration-200 cursor-pointer flex items-center gap-1.5"
          >
            <i className="fa-brands fa-github" />
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/chibuzor-okafor-0b9a92374"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white/65 transition-colors duration-200 cursor-pointer flex items-center gap-1.5"
          >
            <i className="fa-brands fa-linkedin" />
            LinkedIn
          </a>
          <a
            href="https://x.com/AuthurOkafor"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white/65 transition-colors duration-200 cursor-pointer flex items-center gap-1.5"
          >
            <i className="fa-brands fa-x-twitter" />
            Twitter
          </a>
          <span className="ml-auto flex items-center gap-2 text-white/45">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400" />
            Open to Opportunities
          </span>
        </div>
      </motion.div>
    </section>
  )
}
