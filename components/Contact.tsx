'use client'

import { useState } from 'react'
import Reveal from './Reveal'

type Status = 'idle' | 'sending' | 'success' | 'error'

const socials = [
  { href: 'https://web.facebook.com/profile.php?id=100095382873499', icon: 'fa-brands fa-facebook' },
  { href: 'https://x.com/AuthurOkafor',                              icon: 'fa-brands fa-x-twitter' },
  { href: 'https://www.instagram.com/official_certifiedauthur/',     icon: 'fa-brands fa-instagram' },
  {
    href: 'https://www.linkedin.com/in/chibuzor-okafor-0b9a92374',
    icon: 'fa-brands fa-linkedin',
  },
]

export default function Contact() {
  const [form, setForm]     = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<Status>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('https://formspree.io/f/xrbydndb', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
    setTimeout(() => setStatus('idle'), 5000)
  }

  return (
    <section id="contact" className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-6 sm:px-[8%]">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">

          {/* Left — info */}
          <Reveal direction="left" className="w-full lg:w-[35%] shrink-0">
            <h2 className="section-title text-4xl sm:text-[3.5rem] font-semibold text-white mb-8">
              Contact Me
            </h2>

            <div className="space-y-4 text-[15px] text-muted">
              <p className="flex items-center gap-3">
                <i className="fa-solid fa-paper-plane text-accent text-xl w-6" />
                chibuzorauthur@gmail.com
              </p>
              <p className="flex items-center gap-3">
                <i className="fa-solid fa-phone text-accent text-xl w-6" />
                +2349036546571
              </p>
            </div>

            <div className="flex gap-4 mt-8">
              {socials.map(({ href, icon }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted text-2xl hover:text-accent hover:-translate-y-1.5 transition-all duration-300"
                >
                  <i className={icon} />
                </a>
              ))}
            </div>

            <a
              href="/images/Okafor Authur Resume.pdf"
              download
              className="inline-block mt-10 bg-accent text-white px-8 py-3 rounded-md text-[14px] font-medium hover:opacity-90 transition-opacity duration-200"
            >
              Download CV
            </a>
          </Reveal>

          {/* Right — form */}
          <Reveal direction="right" className="flex-1 min-w-0">
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full bg-surface-3 border-2 border-border text-white placeholder-muted rounded-lg px-4 py-3.5 text-[15px] outline-none focus:border-accent transition-colors duration-200"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full bg-surface-3 border-2 border-border text-white placeholder-muted rounded-lg px-4 py-3.5 text-[15px] outline-none focus:border-accent transition-colors duration-200"
              />
              <textarea
                name="message"
                rows={6}
                placeholder="Your Message"
                value={form.message}
                onChange={handleChange}
                required
                className="w-full bg-surface-3 border-2 border-border text-white placeholder-muted rounded-lg px-4 py-3.5 text-[15px] outline-none focus:border-accent transition-colors duration-200 resize-none"
              />
              <button
                type="submit"
                disabled={status === 'sending'}
                className="bg-accent text-white px-14 py-3.5 rounded-md text-[16px] font-medium hover:opacity-90 transition-opacity duration-200 disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed"
              >
                {status === 'sending' ? 'Sending…' : 'Submit'}
              </button>

              {status === 'success' && (
                <p className="text-[14px] text-green-400">
                  Message sent! I&apos;ll get back to you soon.
                </p>
              )}
              {status === 'error' && (
                <p className="text-[14px] text-accent">
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
          </Reveal>

        </div>
      </div>
    </section>
  )
}
