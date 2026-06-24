'use client'

import Image from 'next/image'
import { useState } from 'react'
import Reveal from './Reveal'

type Tab = 'skills' | 'experience' | 'education'

const tabs: { id: Tab; label: string }[] = [
  { id: 'skills',     label: 'Skills'     },
  { id: 'experience', label: 'Experience' },
  { id: 'education',  label: 'Education'  },
]

const content: Record<Tab, { label: string; sub: string }[]> = {
  skills: [
    { label: 'Machine Learning',    sub: 'Model development & deployment'         },
    { label: 'AI Engineering',      sub: 'RAG, multi-agent systems, LangGraph'    },
    { label: 'Backend Development', sub: 'FastAPI, Python, Go, PostgreSQL'        },
    { label: 'Frontend',            sub: 'Next.js, React, TypeScript, Tailwind'   },
  ],
  experience: [
    { label: '2024',  sub: 'Data Scientist at NUPAT'                              },
    { label: '2024',  sub: 'Machine Learning / AI Engineer at NUPAT'             },
    { label: '2024',  sub: 'Freelance AI Engineer — RAG, LangGraph, chatbots deployed on AWS, GCP, Vercel' },
  ],
  education: [
    { label: '2023',  sub: 'BSc Soil Science, Nnamdi Azikiwe University'         },
    { label: '2023',  sub: 'Google Data Analytics, Google'                       },
    { label: '2024',  sub: 'Google Advanced Data Analytics, Google'              },
    { label: '2024',  sub: 'IBM AI Engineering, IBM'                             },
    { label: '2024',  sub: 'Python & Statistics for Financial Analysis, Google'  },
  ],
}

export default function About() {
  const [active, setActive] = useState<Tab>('skills')

  return (
    <section id="about" className="py-20 sm:py-28 text-muted">
      <div className="max-w-7xl mx-auto px-6 sm:px-[8%]">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">

          {/* Photo */}
          <Reveal direction="left" className="w-full lg:w-[38%] shrink-0">
            <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden">
              <Image
                src="/images/ppic.jpg"
                alt="Chibuzor Authur Okafor"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 38vw"
              />
            </div>
          </Reveal>

          {/* Bio */}
          <Reveal direction="right" className="flex-1 min-w-0">
            <h2 className="section-title text-4xl sm:text-[3.5rem] font-semibold text-white leading-tight mb-6">
              About Me
            </h2>
            <p className="text-[15px] leading-relaxed mb-8">
              Hi, I&apos;m Chibuzor Authur Okafor, a Machine Learning &amp; AI Engineer from Nigeria with a
              passion for building intelligent, human-centered systems. My journey began with a degree in
              Soil Science from Nnamdi Azikiwe University, then shifted through the hospitality industry
              where I picked up essential soft skills that still guide my approach today.
              <br /><br />
              I&apos;m certified in Google Data Analytics, Google Advanced Data Analytics, IBM AI Engineering,
              and Python for Financial Analysis. I work with tools like SQL, Python, R, FastAPI, Streamlit,
              OpenAI APIs, and Google Cloud Platform. What really excites me is crafting smart applications
              using Retrieval-Augmented Generation (RAG) and building multi-agent systems with LangGraph.
            </p>

            {/* Tabs */}
            <div className="flex gap-8 mb-8">
              {tabs.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => setActive(id)}
                  className={`relative text-[15px] font-medium cursor-pointer transition-colors pb-2
                    after:absolute after:left-0 after:bottom-0 after:h-[3px] after:bg-accent after:rounded-full after:transition-all after:duration-300
                    ${active === id
                      ? 'text-white after:w-1/2'
                      : 'text-muted hover:text-white after:w-0'
                    }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <ul className="space-y-3">
              {content[active].map(({ label, sub }, i) => (
                <li key={i} className="text-[14px]">
                  <span className="text-accent font-semibold">{label}</span>
                  <br />
                  {sub}
                </li>
              ))}
            </ul>
          </Reveal>

        </div>
      </div>
    </section>
  )
}
