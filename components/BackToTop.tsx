'use client'

import { useEffect, useState } from 'react'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 420)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className={`fixed bottom-7 right-7 w-11 h-11 rounded-full bg-accent text-white flex items-center justify-center shadow-[0_4px_18px_rgba(255,0,79,0.5)] transition-all duration-300 cursor-pointer z-50 hover:bg-white hover:text-accent
        ${visible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'}`}
    >
      <i className="fa-solid fa-arrow-up text-sm" />
    </button>
  )
}
