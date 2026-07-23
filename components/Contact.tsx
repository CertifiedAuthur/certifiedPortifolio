'use client'

import { useState } from 'react'
import Reveal from './Reveal'

type Status = 'idle' | 'sending' | 'success' | 'error'

const socials = [
  { href: 'https://web.facebook.com/profile.php?id=100095382873499', icon: 'fa-brands fa-facebook' },
  { href: 'https://x.com/AuthurOkafor',                              icon: 'fa-brands fa-x-twitter' },
  { href: 'https://www.instagram.com/official_certifiedauthur/',     icon: 'fa-brands fa-instagram' },
  { href: 'https://www.linkedin.com/in/chibuzor-okafor-0b9a92374',  icon: 'fa-brands fa-linkedin'  },
]

const openTo = [
  'Full-time and contract AI engineering roles at product companies and startups',
  'Technical architecture consulting and system design engagements',
  'Founding engineer roles where AI is a core part of the product',
  'Long-term technical partnerships on SaaS platforms, AI systems, and backend infrastructure',
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

          {/* Left: info */}
          <Reveal direction="left" className="w-full lg:w-[38%] shrink-0">
            <span className="eyebrow text-accent block mb-5">Contact</span>
            <h2 className="font-display text-4xl sm:text-[3.25rem] font-bold text-foreground leading-tight mb-6">
              Let&apos;s Work<br />
              Together
            </h2>

            <p className="text-muted text-[15px] leading-relaxed mb-8">
              If you are building an AI-powered product, integrating intelligent systems into
              an existing platform, or looking for an engineer who can own the work from
              architecture through deployment and long-term operation, I want to hear what
              you are working on.
            </p>

            {/* Open to */}
            <div className="mb-8">
              <p className="text-[12px] font-semibold text-foreground uppercase tracking-[0.15em] mb-4 font-display">
                Currently open to
              </p>
              <ul className="space-y-2.5">
                {openTo.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[14px] text-muted leading-relaxed">
                    <i className="fa-solid fa-check text-accent text-[10px] mt-[5px] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3 text-[15px] text-muted mb-8">
              <p className="flex items-center gap-3">
                <i className="fa-solid fa-paper-plane text-accent text-xl w-6" />
                chibuzorauthur@gmail.com
              </p>
              <p className="flex items-center gap-3">
                <i className="fa-solid fa-phone text-accent text-xl w-6" />
                +2349036546571
              </p>
            </div>

            <div className="flex gap-4 mb-8">
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
              className="inline-block bg-accent text-white px-8 py-3 rounded-md text-[14px] font-medium hover:opacity-90 transition-opacity duration-200"
            >
              Download CV
            </a>
          </Reveal>

          {/* Right: form */}
          <Reveal direction="right" className="flex-1 min-w-0">
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full bg-surface-3 border-2 border-border text-foreground placeholder-muted rounded-lg px-4 py-3.5 text-[15px] outline-none focus:border-accent transition-colors duration-200"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full bg-surface-3 border-2 border-border text-foreground placeholder-muted rounded-lg px-4 py-3.5 text-[15px] outline-none focus:border-accent transition-colors duration-200"
              />
              <textarea
                name="message"
                rows={7}
                placeholder="Tell me what you're building..."
                value={form.message}
                onChange={handleChange}
                required
                className="w-full bg-surface-3 border-2 border-border text-foreground placeholder-muted rounded-lg px-4 py-3.5 text-[15px] outline-none focus:border-accent transition-colors duration-200 resize-none"
              />
              <button
                type="submit"
                disabled={status === 'sending'}
                className="bg-accent text-white px-14 py-3.5 rounded-md text-[16px] font-medium hover:opacity-90 transition-opacity duration-200 disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed"
              >
                {status === 'sending' ? 'Sending...' : 'Send Message'}
              </button>

              {status === 'success' && (
                <p className="text-[14px] text-green-400">
                  Message sent. I&apos;ll get back to you soon.
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
