'use client'

import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const [isLight, setIsLight] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('theme')
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches
    const light = stored === 'light' || (!stored && prefersLight)
    setIsLight(light)
  }, [])

  const toggle = () => {
    const next = !isLight
    setIsLight(next)
    document.documentElement.classList.toggle('light', next)
    localStorage.setItem('theme', next ? 'light' : 'dark')
  }

  return (
    <button
      onClick={toggle}
      aria-label={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
      className="flex items-center justify-center w-8 h-8 rounded-lg text-muted hover:text-foreground hover:bg-surface-3 transition-colors duration-200 cursor-pointer"
    >
      <i className={`fa-solid ${isLight ? 'fa-moon' : 'fa-sun'} text-[15px]`} />
    </button>
  )
}
