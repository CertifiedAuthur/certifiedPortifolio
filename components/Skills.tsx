import Reveal from './Reveal'

interface SkillDomain {
  icon: string
  title: string
  prose: string
  tags: string[]
  span?: string
}

const domains: SkillDomain[] = [
  {
    icon: 'fa-solid fa-brain',
    title: 'AI & Intelligent Systems',
    span: 'lg:col-span-2',
    prose:
      'I design and integrate AI capabilities into production software at the systems level: RAG pipelines backed by pgvector, multi-agent orchestration with LangGraph, LLM integration via OpenAI and Anthropic APIs, and intelligent automation with observable evaluation loops. AI becomes a reliable, scalable component of a larger engineered system, not a standalone experiment.',
    tags: [
      'Large Language Models', 'RAG Architectures', 'LangGraph', 'LangChain',
      'Multi-Agent Systems', 'Prompt Engineering', 'pgvector', 'Embeddings',
      'OpenAI API', 'Anthropic API',
    ],
  },
  {
    icon: 'fa-solid fa-server',
    title: 'Backend Engineering',
    prose:
      'Scalable backend systems built with FastAPI and Go. RESTful APIs, JWT/OAuth2 authentication, async task queues with Celery and Redis, WebSocket connections, and everything from data modeling to API versioning and rate limiting.',
    tags: [
      'FastAPI', 'Python', 'Go', 'REST APIs',
      'Celery', 'Redis', 'WebSockets', 'JWT / OAuth2',
    ],
  },
  {
    icon: 'fa-solid fa-layer-group',
    title: 'Frontend Engineering',
    prose:
      'Production frontends with Next.js and React 19, TypeScript throughout, Tailwind CSS for styling, and Framer Motion for purposeful animation. Component architecture, responsive design, and performance optimization built in from the start.',
    tags: [
      'Next.js (App Router)', 'React 19', 'TypeScript', 'Tailwind CSS',
      'Framer Motion', 'Responsive Design',
    ],
  },
  {
    icon: 'fa-solid fa-sitemap',
    title: 'System Architecture',
    span: 'lg:col-span-2',
    prose:
      'Multi-tenant SaaS platforms, distributed systems, and event-driven architectures designed for real load. I design clean API boundaries, implement proper tenant isolation, model databases to grow, and make deliberate tradeoffs between consistency, availability, and complexity. Systems that ship and then stay up.',
    tags: [
      'Multi-Tenant SaaS', 'Distributed Systems', 'API Design',
      'Event-Driven Architecture', 'Scalability Patterns', 'Database Architecture',
    ],
  },
  {
    icon: 'fa-solid fa-database',
    title: 'Databases',
    prose:
      'PostgreSQL as the primary data store with pgvector for semantic search, Redis for caching and queues, and Supabase for rapid prototyping. Query optimization, proper indexing, migration management, and vector search at production scale.',
    tags: [
      'PostgreSQL', 'pgvector', 'Supabase', 'Redis',
      'Query Optimization', 'Vector Search', 'Migrations',
    ],
  },
  {
    icon: 'fa-solid fa-cloud',
    title: 'Cloud & Infrastructure',
    prose:
      'Production deployments on AWS, GCP, and Vercel, configured properly. VPS environments with Nginx reverse proxies, Docker containerization, CI/CD pipelines, environment management, and monitoring. Infrastructure built to stay up under real traffic.',
    tags: [
      'AWS (EC2, S3)', 'GCP', 'Vercel', 'Docker',
      'Linux / VPS', 'Nginx', 'CI/CD',
    ],
  },
  {
    icon: 'fa-solid fa-wrench',
    title: 'Dev Tooling',
    prose:
      'Git-based workflows, shell scripting, Docker Compose for local parity, and a testing mindset from unit to integration. Consistent, reproducible environments from local development to production.',
    tags: [
      'Git / GitHub', 'Docker Compose', 'Shell Scripting', 'Postman', 'VS Code',
    ],
  },
]

function SkillCard({ domain }: { domain: SkillDomain }) {
  return (
    <div className="bg-surface-2 rounded-xl p-7 border border-border hover:border-accent/35 transition-all duration-300 hover:-translate-y-1 cursor-default flex flex-col gap-5 h-full">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent/10 shrink-0">
          <i className={`${domain.icon} text-accent text-[17px]`} />
        </div>
        <h3 className="font-display font-bold text-[16px] text-foreground leading-tight">
          {domain.title}
        </h3>
      </div>

      <p className="text-[13px] text-muted leading-[1.75]">{domain.prose}</p>

      <div className="flex flex-wrap gap-1.5 mt-auto">
        {domain.tags.map((tag) => (
          <span
            key={tag}
            className="text-[11px] text-muted bg-surface-3 px-3 py-1 rounded-full border border-border leading-none"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-6 sm:px-[8%]">
        <Reveal>
          <span className="eyebrow text-accent block mb-5">Capabilities</span>
          <h2 className="font-display text-4xl sm:text-[3.25rem] font-bold text-foreground leading-tight mb-4">
            Engineering<br />
            Expertise
          </h2>
          <p className="text-muted text-[15px] mb-14 max-w-xl leading-relaxed">
            A full-spectrum engineering skill set. From intelligent AI systems to
            cloud infrastructure, every layer owned end to end.
          </p>
        </Reveal>

        {/* Bento grid: AI (wide) + Backend | Frontend + System Arch (wide) | 3 equal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {domains.map((domain, i) => (
            <Reveal key={domain.title} delay={i * 0.07} className={domain.span ?? ''}>
              <SkillCard domain={domain} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
