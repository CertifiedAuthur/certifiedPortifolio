import Reveal from './Reveal'

const services = [
  {
    icon: 'fa-solid fa-robot',
    title: 'AI Systems Integration',
    body: `I design and integrate AI capabilities into real production software: RAG pipelines,
      multi-agent orchestration with LangGraph, vector search with pgvector, and LLM-powered features
      via OpenAI and Anthropic APIs. AI becomes a reliable, scalable component of a larger system,
      not a standalone experiment.`,
  },
  {
    icon: 'fa-solid fa-code',
    title: 'Full-Stack Application Development',
    body: `End-to-end product engineering from first commit to live URL. I build backends with FastAPI
      or Go, frontends with Next.js and React, wire up databases, authentication, and background workers,
      then ship to production. You get a complete, working product, not a collection of disconnected parts.`,
  },
  {
    icon: 'fa-solid fa-server',
    title: 'Backend Engineering & API Design',
    body: `Scalable, well-structured backend systems built with FastAPI, Python, and Go. I design
      RESTful APIs, implement JWT and OAuth2 authentication, set up async task queues with Celery and
      Redis, configure WebSocket connections, and handle everything from data modeling to API versioning.`,
  },
  {
    icon: 'fa-solid fa-building',
    title: 'SaaS & Multi-Tenant Architecture',
    body: `I architect and build SaaS platforms with proper multi-tenancy from the ground up:
      tenant isolation, role-based access control, per-organization data boundaries, subscription
      and credit billing, and scalable PostgreSQL schemas designed to grow with your user base.`,
  },
  {
    icon: 'fa-solid fa-cloud',
    title: 'Cloud Infrastructure & Deployment',
    body: `Production deployment on AWS, GCP, and Vercel, configured properly. I set up VPS environments
      with Nginx reverse proxies, Docker containerization, environment management, CI/CD pipelines,
      and monitoring. Your application runs on infrastructure that's built to stay up.`,
  },
  {
    icon: 'fa-solid fa-gears',
    title: 'Intelligent Automation',
    body: `I build automation systems that do real work: email classification and alerting engines,
      AI-powered content scheduling and publishing pipelines, data sync workers, and multi-platform
      integrations. Built on Celery, Redis, and event-driven patterns for reliability at scale.`,
  },
]

export default function Services() {
  return (
    <section id="services" className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-6 sm:px-[8%]">
        <Reveal>
          <h2 className="section-title text-4xl sm:text-[3.5rem] font-semibold text-white mb-4">
            What I Build
          </h2>
          <p className="text-muted text-[15px] mb-14 max-w-xl">
            End-to-end engineering capabilities, from system design to production deployment.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {services.map(({ icon, title, body }, i) => (
            <Reveal key={title} delay={i * 0.1}>
              <div className="group bg-surface-3 rounded-xl p-8 text-[13px] font-light leading-relaxed text-muted transition-all duration-400 hover:-translate-y-2 hover:bg-accent hover:text-white cursor-default h-full">
                <i className={`${icon} text-4xl mb-6 block text-accent group-hover:text-white transition-colors duration-400`} />
                <h3 className="text-[17px] font-semibold text-white mb-3 transition-colors duration-400">
                  {title}
                </h3>
                <p className="leading-[1.75]">{body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
