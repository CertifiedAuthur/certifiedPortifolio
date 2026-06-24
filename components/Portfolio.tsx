import Image from 'next/image'
import Reveal from './Reveal'

interface Project {
  name: string
  image: string
  description: string
  url?: string
  contain?: boolean
}

const projects: Project[] = [
  {
    name: 'LearnVault',
    image: '/images/Learnvault_logo.png',
    contain: true,
    url: 'https://learnvault.academy',
    description:
      'A production-grade multi-tenant SaaS platform transforming recorded sessions into AI-powered intelligence. Features live classes via LiveKit, speaker-diarized transcription, AI-generated summaries and quizzes, RAG-powered tutoring with pgvector, credit billing, and full tenant isolation across unlimited organizations.',
  },
  {
    name: 'MailCheckr',
    image: '/images/mailcheckr_logo.png',
    contain: true,
    url: 'https://mcheckr.com',
    description:
      'A full-stack email aggregation and alerting platform that centralizes multiple IMAP mailboxes, auto-syncs into PostgreSQL, classifies financially relevant emails using multilingual keyword logic, and delivers real-time Telegram and email notifications via FastAPI, Celery, Redis, and a Next.js dashboard.',
  },
  {
    name: 'InfiniMail App',
    image: '/images/EmailGen.jpg',
    url: 'https://infinimail.certifiedaiautomation.com/',
    description:
      'An AI-powered email generation platform that creates personalized, professional emails for marketing campaigns, customer outreach, and business communications.',
  },
]

const zorai: Project = {
  name: 'Zorai',
  image: '/images/Zorai_logo.png',
  contain: true,
  description:
    'An AI-powered content operations platform that turns personal knowledge into publishable assets. Combines vector and graph retrieval, multi-platform post generation, human review, Celery-based scheduling, and publishing across X, LinkedIn, Substack, and Reddit.',
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group relative rounded-xl overflow-hidden cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:-translate-y-1.5 hover:shadow-[0_8px_30px_rgba(255,0,79,0.2)] transition-all duration-300">
      {/* Image */}
      <div className="relative w-full h-[280px] bg-surface overflow-hidden">
        <Image
          src={project.image}
          alt={project.name}
          fill
          className={`transition-transform duration-500 group-hover:scale-110 ${
            project.contain ? 'object-contain p-5' : 'object-cover'
          }`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-sm"
        style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.88), rgba(255,0,79,0.88))' }}
      >
        <h3 className="text-lg font-semibold text-white mb-3">{project.name}</h3>
        <p className="text-[13px] leading-snug text-white/90 mb-5 line-clamp-5">{project.description}</p>
        {project.url ? (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-cyan text-bg text-[13px] font-semibold px-5 py-2.5 rounded-full hover:bg-white transition-colors duration-200"
          >
            <i className="fa-solid fa-external-link-alt text-[11px]" />
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
          <h2 className="section-title text-4xl sm:text-[3.5rem] font-semibold text-white mb-14">
            My Work
          </h2>
        </Reveal>

        {/* Row 1 — 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {projects.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.13}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>

        {/* Row 2 — Zorai centred */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
            See more
          </a>
        </div>
      </div>
    </section>
  )
}
