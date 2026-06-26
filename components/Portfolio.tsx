import Image from 'next/image'
import Reveal from './Reveal'

interface Project {
  name: string
  image: string
  description: string
  stack: string[]
  url?: string
  contain?: boolean
}

const projects: Project[] = [
  {
    name: 'LearnVault',
    image: '/images/Learnvault_logo.png',
    contain: true,
    url: 'https://learnvault.academy',
    stack: ['Next.js', 'Go', 'Asynq', 'PostgreSQL', 'LiveKit', 'pgvector', 'Caddy', 'VPS'],
    description:
      'Production multi-tenant SaaS platform built end-to-end: custom auth with full tenant isolation, live classrooms via LiveKit, speaker-diarized transcription, AI-generated summaries and quizzes, RAG-powered tutoring with pgvector, credit billing system, and a PostgreSQL schema designed for unlimited organizations.',
  },
  {
    name: 'MailCheckr',
    image: '/images/mailcheckr_logo.png',
    contain: true,
    url: 'https://mcheckr.com',
    stack: ['Python', 'FastAPI', 'PostgreSQL', 'Redis', 'Celery', 'Next.js', 'Nginx', 'IMAP'],
    description:
      'Distributed email aggregation system built from scratch: IMAP sync engine, PostgreSQL storage layer, multilingual financial classification, real-time alerting via Telegram, async task processing with Celery and Redis, and a full-stack Next.js dashboard. Deployed on VPS with Nginx reverse proxy.',
  },
  {
    name: 'InfiniMail',
    image: '/images/EmailGen.jpg',
    url: 'https://infinimail.certifiedaiautomation.com/',
    stack: ['Next.js', 'FastAPI', 'OpenAI', 'Python'],
    description:
      'Full-stack AI email generation platform with custom campaign management, personalized content generation via LLM integration, and a Next.js frontend. Designed for marketing teams running high-volume outreach at scale.',
  },
]

const zorai: Project = {
  name: 'Zorai',
  image: '/images/Zorai_logo.png',
  contain: true,
  stack: ['Python', 'LangGraph', 'pgvector', 'Celery', 'FastAPI', 'Redis'],
  description:
    'Complete AI content operations system: knowledge ingestion, dual-mode retrieval combining vector search and graph-based reasoning, multi-platform post generation with human review workflow, Celery-based scheduling, and automated publishing to X, LinkedIn, Substack, and Reddit.',
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group relative rounded-xl overflow-hidden cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:-translate-y-1.5 hover:shadow-[0_8px_30px_rgba(255,0,79,0.2)] transition-all duration-300 bg-surface flex flex-col">
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
        <h3 className="text-[15px] font-semibold text-white">{project.name}</h3>
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
        className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-400 backdrop-blur-sm"
        style={{ background: 'linear-gradient(to bottom, rgba(8,8,8,0.92), rgba(255,0,79,0.9))' }}
      >
        <h3 className="text-lg font-semibold text-white mb-3">{project.name}</h3>
        <p className="text-[13px] leading-snug text-white/90 mb-5 line-clamp-6">{project.description}</p>
        {project.url ? (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-cyan text-bg text-[13px] font-semibold px-5 py-2.5 rounded-full hover:bg-white transition-colors duration-200"
          >
            <i className="fa-solid fa-arrow-up-right-from-square text-[11px]" />
            Visit App
          </a>
        ) : (
          <span className="inline-flex items-center gap-2 bg-white/20 text-white/70 text-[13px] font-semibold px-5 py-2.5 rounded-full cursor-default">
            <i className="fa-solid fa-clock text-[11px]" />
            Coming Soon
          </span>
        )}
      </div>
    </div>
  )
}

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-6 sm:px-[8%]">
        <Reveal>
          <h2 className="section-title text-4xl sm:text-[3.5rem] font-semibold text-white mb-4">
            Shipped Systems
          </h2>
          <p className="text-muted text-[15px] mb-14 max-w-xl">
            Production applications built end-to-end. Hover any card to see what&apos;s inside.
          </p>
        </Reveal>

        {/* Row 1: 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {projects.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.13}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>

        {/* Row 2: Zorai centred */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="hidden lg:block" />
          <Reveal delay={0.13}>
            <ProjectCard project={zorai} />
          </Reveal>
          <div className="hidden lg:block" />
        </div>

        <div className="text-center mt-14">
          <a
            href="https://certifiedauthur.github.io/AuthurTheAnalyst.github.io/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border border-accent text-white px-12 py-3.5 rounded-md text-[15px] font-medium hover:bg-accent transition-colors duration-300"
          >
            See More
          </a>
        </div>
      </div>
    </section>
  )
}
