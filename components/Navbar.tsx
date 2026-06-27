'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import ThemeToggle from './ThemeToggle'

const sections = ['header', 'about', 'skills', 'services', 'portfolio', 'contact']
const labels   = ['Home', 'About', 'Skills', 'Services', 'Work', 'Contact']

export default function Navbar() {
  const [active, setActive]     = useState('header')
  const [open, setOpen]         = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id) })
      },
      { threshold: 0.4 }
    )
    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { obs.disconnect(); window.removeEventListener('scroll', onScroll) }
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setOpen(false)
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-bg/95 backdrop-blur-md shadow-lg shadow-black/10' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-[8%] flex items-center justify-between h-16 sm:h-20">
        <Image src="/images/logo01.png" alt="CertifiedAuthur logo" width={120} height={40} priority />

        {/* Desktop links + toggle */}
        <div className="hidden sm:flex items-center gap-8">
          <ul className="flex items-center gap-8">
            {sections.map((id, i) => (
              <li key={id}>
                <button
                  onClick={() => scrollTo(id)}
                  className={`relative text-[15px] font-medium tracking-wide transition-colors duration-200 cursor-pointer
                    after:absolute after:left-0 after:-bottom-1 after:h-[3px] after:bg-accent after:rounded-full after:transition-all after:duration-300
                    ${active === id
                      ? 'text-foreground after:w-full'
                      : 'text-muted hover:text-foreground after:w-0 hover:after:w-full'
                    }`}
                >
                  {labels[i]}
                </button>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </div>

        {/* Mobile: toggle + hamburger */}
        <div className="flex items-center gap-3 sm:hidden">
          <ThemeToggle />
          <button
            className="text-foreground text-2xl cursor-pointer"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <i className={`fa-solid ${open ? 'fa-xmark' : 'fa-bars'}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`sm:hidden overflow-hidden transition-all duration-300 bg-surface-3 ${
          open ? 'max-h-80 py-4' : 'max-h-0'
        }`}
      >
        {sections.map((id, i) => (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            className={`block w-full text-left px-8 py-3 text-[15px] font-medium transition-colors cursor-pointer ${
              active === id ? 'text-accent' : 'text-muted hover:text-foreground'
            }`}
          >
            {labels[i]}
          </button>
        ))}
      </div>
    </nav>
  )
}
