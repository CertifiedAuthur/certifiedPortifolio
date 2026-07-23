'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Reveal from './Reveal'

interface ProjectDetail {
  problem: string
  built: string
  highlights: string[]
}

interface Project {
  name: string
  image: string
  description: string
  stack: string[]
  url?: string
  contain?: boolean
  desktop?: boolean
  detail: ProjectDetail
}

const projects: Project[] = [
  {
    name: 'LearnVault',
    image: '/images/Learnvault_logo.png',
    contain: true,
    url: 'https://learnvault.academy',
    stack: ['Next.js', 'Go', 'Asynq', 'PostgreSQL', 'LiveKit', 'pgvector', 'Caddy', 'VPS'],
    description:
      'Production multi-tenant SaaS platform built end-to-end across eight integrated subsystems: custom auth with database-level tenant isolation, live classrooms via LiveKit with speaker diarization, AI-generated session summaries and quizzes, RAG-powered tutoring chatbot with pgvector, credit billing, async job processing with Asynq, and a unified PostgreSQL schema architected to support unlimited organizations from a single deployment.',
    detail: {
      problem:
        'Building a production-grade learning platform with live video, AI tutoring, and proper multi-tenancy means solving a dozen hard engineering problems simultaneously. Most teams bolt together disconnected third-party services that lack unified tenant boundaries and a coherent shared data model, resulting in fragile systems that break at the seams.',
      built:
        'Built every layer from scratch: custom authentication with database-level tenant isolation, live classrooms via LiveKit with speaker-diarized transcription piped into AI summary and quiz generation, a RAG-powered tutoring chatbot using pgvector for semantic retrieval, and a credit billing system, all sharing a single, cohesive PostgreSQL data model designed to scale to unlimited organizations.',
      highlights: [
        'Custom auth system with full per-organization tenant isolation enforced at the database level',
        'Live classrooms via LiveKit with concurrent session support and real-time speaker diarization piped directly into transcript generation',
        'AI-generated session summaries and quizzes automatically derived from live transcripts',
        'RAG tutoring chatbot backed by pgvector, enabling semantically accurate answers from session content',
        'Credit-based billing system with per-tenant usage metering across all AI features',
        'Unified PostgreSQL schema architected to support unlimited organizations from a single shared deployment',
        'Go backend with Asynq for reliable async job processing, decoupling AI workloads from request latency',
        'Deployed on VPS with Caddy as the reverse proxy and automatic TLS',
      ],
    },
  },
  {
    name: 'MailCheckr',
    image: '/images/mailcheckr_logo.png',
    contain: true,
    url: 'https://mcheckr.com',
    stack: ['Python', 'FastAPI', 'PostgreSQL', 'Redis', 'Celery', 'Next.js', 'Nginx', 'IMAP'],
    description:
      'Self-hosted distributed email aggregation system: direct IMAP sync engine monitoring multiple accounts simultaneously with zero credential exposure to third parties, multilingual financial classification, real-time Telegram alerts on critical transactions, resilient async processing with Celery and Redis, a PostgreSQL storage layer, and a full-stack Next.js dashboard. Deployed on VPS behind Nginx.',
    detail: {
      problem:
        'Monitoring financial emails across multiple accounts is tedious and error-prone. Existing solutions either require handing sensitive credentials to a third-party platform or rely on fragile browser scraping. There was no privacy-respecting, self-hosted option with intelligent classification and real-time alerting.',
      built:
        'Built a self-hosted email aggregation engine using direct IMAP connections, with multilingual financial email classification, real-time Telegram alerting on key transactions, Celery and Redis for resilient async processing, and a full-stack Next.js dashboard with filtering and search, entirely under the user\'s control, deployed on VPS behind Nginx.',
      highlights: [
        'Custom IMAP sync engine monitoring multiple email accounts simultaneously, with no third-party SDK dependencies and zero credential exposure',
        'Multilingual financial email classification detecting relevant transactions across multiple languages',
        'Real-time Telegram alerts triggered on critical financial transaction emails, typically within seconds of arrival',
        'Resilient async task processing with Celery and Redis, designed to recover from connection failures and clear backlogs automatically',
        'PostgreSQL storage layer retaining full email and event history for audit and review',
        'Full-stack Next.js dashboard with search, filtering, and per-account inbox views',
        'VPS deployment behind an Nginx reverse proxy with zero dependency on third-party email SaaS',
      ],
    },
  },
  {
    name: 'MailForge',
    image: '/images/mailforge-icon.png',
    contain: true,
    desktop: true,
    stack: ['Go', 'Wails v2', 'React', 'TypeScript', 'SQLite', 'WebView2', 'SMTP/IMAP'],
    description:
      'Native Windows desktop application for managing email campaigns across unlimited rotating SMTP accounts, with no per-email fees and no third-party credential exposure. Features an async send engine with pause/resume/cancel mid-campaign, self-healing circuit breakers per SMTP account, DKIM signing, bounce/complaint automation via IMAP/POP3, local open/click tracking, and full campaign history in a portable encrypted SQLite project file.',
    detail: {
      problem:
        'Bulk email SaaS platforms own your sending infrastructure, charge per email sent, throttle your volume, and store your SMTP credentials on their servers. The client needed complete control over their delivery pipeline: no per-email fees, no third-party data exposure, no rate limits they didn\'t set themselves, and full visibility into every send.',
      built:
        'Built a native Windows desktop application that moves the entire sending pipeline to the client\'s machine: SMTP rotation across unlimited accounts with self-healing circuit breakers, an async send engine with pause/resume/cancel, DKIM signing via in-app RSA key generation, IMAP/POP3 bounce and complaint automation, local open/click tracking, and a full reporting layer, all stored inside an encrypted, portable SQLite project file.',
      highlights: [
        'Unlimited SMTP accounts grouped into round-robin or weighted rotation pools, eliminating per-email sending fees',
        'Self-healing circuit breaker per account, auto-recovering after temporary failures without manual intervention',
        'Async send engine capable of handling campaigns of any size with pause, resume, and cancel at any point mid-campaign',
        'DKIM signing with in-app RSA key pair generation and formatted DNS record output',
        'Bounce and spam complaint automation via IMAP/POP3 polling, keeping lists clean without manual processing',
        'Local open/click tracking server eliminating third-party analytics dependencies and any associated per-event tracking fees',
        'SMTP credentials encrypted at rest using Windows DPAPI, never leaving the client\'s machine',
        'Portable .mfproj project file; one file holds an entire campaign, its configuration, and its complete send history',
      ],
    },
  },
]

const infinimail: Project = {
  name: 'InfiniMail',
  image: '/images/EmailGen.jpg',
  url: 'https://infinimail.certifiedaiautomation.com/',
  stack: ['Next.js', 'FastAPI', 'OpenAI', 'Python'],
  description:
    'Full-stack AI email generation platform that produces unique, personalized content for every recipient in a campaign, eliminating the manual bottleneck of writing individual emails at volume. Features custom campaign management, personalization token support, OpenAI integration, and a Next.js dashboard for previewing and launching high-volume outreach at scale.',
  detail: {
    problem:
      'Marketing teams running high-volume outreach campaigns face a content bottleneck: writing unique, personalized emails for hundreds of recipients manually is slow, inconsistent, and doesn\'t scale to the volume modern outreach requires.',
    built:
      'Built a full-stack AI email generation platform where teams define campaign parameters and the system generates personalized, contextually relevant content via LLM integration, with a campaign management layer and a Next.js dashboard to organize, preview, and launch campaigns at scale.',
    highlights: [
      'LLM-powered content generation producing unique, contextually personalized email copy for every individual recipient in a campaign',
      'Campaign management system with template customization, audience targeting, and full lifecycle control',
      'Personalization token support enabling per-recipient field substitution at generation time',
      'Real-time content preview in the dashboard before any campaign is launched',
      'FastAPI backend with direct OpenAI API integration for low-latency generation at scale',
      'Next.js frontend managing the complete campaign lifecycle from setup through send',
    ],
  },
}

const zorai: Project = {
  name: 'Zorai',
  image: '/images/Zorai_logo.png',
  contain: true,
  stack: ['Python', 'LangGraph', 'pgvector', 'Celery', 'FastAPI', 'Redis'],
  description:
    'Complete AI content operations system that eliminates manual content creation across four platforms simultaneously: knowledge ingestion with dual-mode retrieval (vector search combined with graph-based reasoning), LLM-generated posts tailored to the format and audience of each platform, human review before any publish, and Celery-based scheduling for fully automated distribution to X, LinkedIn, Substack, and Reddit.',
  detail: {
    problem:
      'Maintaining a consistent, high-quality presence across X, LinkedIn, Substack, and Reddit simultaneously demands constant content production, a creative and operational burden that consumes significant bandwidth and is nearly impossible to sustain manually without sacrificing quality or consistency.',
    built:
      'Built a complete AI content operations system: a knowledge ingestion pipeline indexes source material, dual-mode retrieval (vector search + graph-based reasoning) surfaces the most relevant content for each platform, LLM generation produces platform-specific posts, a human review workflow ensures quality before publish, and Celery-based scheduling handles automated multi-platform distribution.',
    highlights: [
      'Knowledge base ingestion and indexing pipeline with pgvector, making source material semantically searchable',
      'Dual-mode retrieval combining vector similarity search and graph-based reasoning to surface the most contextually relevant content',
      'Platform-specific post generation simultaneously targeting X, LinkedIn, Substack, and Reddit, each adapted to the distinct format and audience of that platform',
      'Human-in-the-loop review and approval workflow ensuring every post meets quality standards before any automated publish',
      'Celery-based scheduling reducing content distribution across all four platforms to a zero-touch operation after review',
      'LangGraph orchestration managing the full content generation pipeline from ingestion through scheduled publish',
    ],
  },
}

function ProjectCard({
  project,
  onClick,
}: {
  project: Project
  onClick: () => void
}) {
  return (
    <div
      onClick={onClick}
      className="group relative rounded-xl overflow-hidden cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:-translate-y-1.5 hover:shadow-[0_8px_30px_rgba(255,0,79,0.2)] transition-all duration-300 bg-surface flex flex-col"
    >
      {/* Image */}
      <div className="relative w-full h-[220px] bg-surface overflow-hidden shrink-0">
        <Image
          src={project.image}
          alt={project.name}
          fill
          className={`transition-transform duration-500 group-hover:scale-105 ${
            project.contain ? 'object-contain p-5' : 'object-cover'
          }`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Card footer: name + stack */}
      <div className="px-5 pt-4 pb-5 flex flex-col gap-3 flex-1">
        <h3 className="font-display font-bold text-[15px] text-foreground">{project.name}</h3>
        <div className="flex flex-wrap gap-1.5">
          {project.stack.map((tag) => (
            <span
              key={tag}
              className="text-[11px] text-muted bg-surface-3 px-2.5 py-0.5 rounded-full border border-border leading-none"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Hover overlay */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm"
        style={{ background: 'linear-gradient(to bottom, rgba(8,8,8,0.92), rgba(255,0,79,0.9))' }}
      >
        <h3 className="font-display font-bold text-lg text-white mb-3">{project.name}</h3>
        <p className="text-[13px] leading-snug text-white/90 mb-5 line-clamp-4">{project.description}</p>
        <span className="inline-flex items-center gap-2 bg-white/15 text-white text-[12px] font-medium px-4 py-2 rounded-full border border-white/25">
          <i className="fa-solid fa-up-right-and-down-left-from-center text-[10px]" />
          View Details
        </span>
      </div>
    </div>
  )
}

function DrawerContent({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between px-7 py-4 border-b border-border shrink-0">
        <button
          onClick={onClose}
          aria-label="Go back"
          className="w-9 h-9 flex items-center justify-center rounded-lg text-muted hover:text-foreground hover:bg-surface-3 transition-colors duration-200 cursor-pointer group"
        >
          <i className="fa-solid fa-arrow-left text-[16px] group-hover:-translate-x-0.5 transition-transform duration-200" />
        </button>
        <button
          onClick={onClose}
          aria-label="Close panel"
          className="w-8 h-8 flex items-center justify-center rounded-lg text-muted hover:text-foreground hover:bg-surface-3 transition-colors duration-200 cursor-pointer"
        >
          <i className="fa-solid fa-xmark text-[17px]" />
        </button>
      </div>

      {/* Scrollable body */}
      <div className="overflow-y-auto flex-1">
        {/* Project image */}
        <div className="relative w-full h-[220px] bg-surface-2 shrink-0">
          <Image
            src={project.image}
            alt={project.name}
            fill
            className={project.contain ? 'object-contain p-10' : 'object-cover'}
            sizes="540px"
          />
        </div>

        <div className="px-7 py-7 space-y-7">
          {/* Name + stack */}
          <div>
            <h2 className="font-display font-bold text-[22px] text-foreground mb-4">{project.name}</h2>
            <div className="flex flex-wrap gap-1.5">
              {project.stack.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] text-muted bg-surface-3 px-2.5 py-1 rounded-full border border-border leading-none"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="border-t border-border" />

          {/* The Problem */}
          <div>
            <p className="text-[10px] font-semibold text-accent uppercase tracking-[0.16em] mb-2.5">
              The Problem
            </p>
            <p className="text-[14px] text-muted leading-[1.75]">{project.detail.problem}</p>
          </div>

          {/* What I Built */}
          <div>
            <p className="text-[10px] font-semibold text-accent uppercase tracking-[0.16em] mb-2.5">
              What I Built
            </p>
            <p className="text-[14px] text-muted leading-[1.75]">{project.detail.built}</p>
          </div>

          {/* Key Highlights */}
          <div>
            <p className="text-[10px] font-semibold text-accent uppercase tracking-[0.16em] mb-3">
              Key Highlights
            </p>
            <ul className="space-y-2.5">
              {project.detail.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-3 text-[14px] text-muted leading-snug">
                  <i className="fa-solid fa-check text-accent text-[10px] mt-[4px] shrink-0" />
                  {h}
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-border" />

          {/* CTA */}
          <div className="pb-2">
            {project.url ? (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-accent text-white px-6 py-3 rounded-lg text-[14px] font-medium hover:opacity-90 transition-opacity duration-200"
              >
                <i className="fa-solid fa-arrow-up-right-from-square text-[12px]" />
                Visit App
              </a>
            ) : project.desktop ? (
              <span className="inline-flex items-center gap-2 bg-surface-3 border border-border text-muted text-[14px] font-medium px-6 py-3 rounded-lg cursor-default">
                <i className="fa-solid fa-lock text-[12px]" />
                Private Client Project
              </span>
            ) : (
              <span className="inline-flex items-center gap-2 bg-surface-3 border border-border text-muted text-[14px] font-medium px-6 py-3 rounded-lg cursor-default">
                <i className="fa-solid fa-clock text-[12px]" />
                Coming Soon
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default function Portfolio() {
  const [active, setActive] = useState<Project | null>(null)

  useEffect(() => {
    if (!active) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setActive(null) }
    document.addEventListener('keydown', onKey)
    // position:fixed preserves scroll position on mobile (overflow:hidden alone causes snap-to-top on iOS)
    const scrollY = window.scrollY
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollY}px`
    document.body.style.width = '100%'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      window.scrollTo(0, scrollY)
    }
  }, [active])

  return (
    <section id="portfolio" className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-6 sm:px-[8%]">
        <Reveal>
          <span className="eyebrow text-accent block mb-5">Projects</span>
          <h2 className="font-display text-4xl sm:text-[3.25rem] font-bold text-foreground leading-tight mb-4">
            Shipped Systems
          </h2>
          <p className="text-muted text-[15px] mb-14 max-w-xl leading-relaxed">
            Production applications built end-to-end. Click any card for the full engineering breakdown.
          </p>
        </Reveal>

        {/* Row 1: 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {projects.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.13}>
              <ProjectCard project={p} onClick={() => setActive(p)} />
            </Reveal>
          ))}
        </div>

        {/* Row 2: InfiniMail + Zorai centred */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:max-w-[66.667%] mx-auto">
          <Reveal delay={0.1}>
            <ProjectCard project={infinimail} onClick={() => setActive(infinimail)} />
          </Reveal>
          <Reveal delay={0.2}>
            <ProjectCard project={zorai} onClick={() => setActive(zorai)} />
          </Reveal>
        </div>

        <div className="text-center mt-14">
          <a
            href="https://certifiedauthur.github.io/AuthurTheAnalyst.github.io/"
            className="inline-block border border-accent text-foreground px-12 py-3.5 rounded-md text-[15px] font-medium hover:bg-accent hover:text-white transition-colors duration-300"
          >
            See More
          </a>
        </div>
      </div>

      {/* Detail drawer: backdrop fades, panel slides, both animate exit */}
      <AnimatePresence>
        {active && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/65 backdrop-blur-[2px] z-[60]"
            onClick={() => setActive(null)}
          >
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="absolute inset-y-0 right-0 w-full sm:w-[500px] lg:w-[540px] bg-surface border-l border-border flex flex-col overflow-hidden"
            >
              <DrawerContent project={active} onClose={() => setActive(null)} />
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
