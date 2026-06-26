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
    { label: 'AI & Intelligent Systems',  sub: 'RAG, LangGraph, multi-agent systems, OpenAI, pgvector, embeddings, intelligent automation' },
    { label: 'Backend Engineering',        sub: 'FastAPI, Python, Go, REST APIs, Celery, Redis, WebSockets, JWT authentication'             },
    { label: 'Frontend Engineering',       sub: 'Next.js, React, TypeScript, Tailwind CSS, Framer Motion, component architecture'           },
    { label: 'System Architecture',        sub: 'Multi-tenant SaaS, distributed systems, API design, scalability patterns, event-driven'    },
    { label: 'Databases',                  sub: 'PostgreSQL, pgvector, Redis, query optimization, indexing, data modeling, migrations'       },
    { label: 'Cloud & Infrastructure',     sub: 'AWS, GCP, Vercel, Docker, Linux/VPS, Nginx, CI/CD, environment management'                },
  ],
  experience: [
    {
      label: 'Kuuka (2025 – 2026)',
      sub: 'AI Engineer, Contract. Built AI-driven supplier intelligence automation, multi-tenant campaign delivery platform, RBAC tenant isolation, CI/CD test coverage across 50+ endpoints, audit logging, and GDPR compliance infrastructure.',
    },
    {
      label: 'Possibl (2025)',
      sub: 'AI Engineer, Contract. Architected multi-agent conversational AI with LangChain and LangGraph; designed NL-to-SQL analytics pipeline with PostgreSQL checkpointing, automated memory summarization, and human-in-the-loop decision routing.',
    },
    {
      label: 'Zenovo AI (2024 – 2025)',
      sub: 'Applied AI Engineer, Contract. Built RAG platform on PostgreSQL and pgvector; automated RFQ/RFP proposal generation using multi-agent LLM orchestration, reducing preparation time by 70%; engineered async infrastructure with Redis and Celery.',
    },
    {
      label: 'Independent Clients (2024 – 2025)',
      sub: 'AI Engineer and ML Consultant. Delivered RAG knowledge retrieval systems using FAISS, Whisper transcription APIs on Linux, NL data exploration tools for Excel datasets, and document embedding pipelines for scalable knowledge bases.',
    },
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
              I&apos;m Chibuzor Authur Okafor, a Full-Stack AI Engineer and AI Systems Architect from Nigeria.
              My path started with a degree in Soil Science, moved through hospitality, and landed firmly in
              software engineering. My real calling: building complete, intelligent systems from the ground up.
              <br /><br />
              Today I design and ship end-to-end software products that combine scalable backends, modern
              frontends, cloud infrastructure, and AI capabilities into cohesive, production-ready solutions.
              I&apos;ve architected multi-tenant SaaS platforms, AI-powered content systems, distributed email
              aggregation engines, and intelligent automation tools, always owning the full stack from
              database schema to deployed product. Artificial intelligence is central to my work, but it&apos;s
              one component of larger engineered systems, not the whole picture.
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
