import Reveal from './Reveal'

interface Domain {
  icon: string
  title: string
  tags: string[]
  wide?: boolean
}

const domains: Domain[] = [
  {
    icon: 'fa-solid fa-brain',
    title: 'AI & Intelligent Systems',
    wide: true,
    tags: [
      'Large Language Models', 'RAG Architectures', 'LangGraph', 'LangChain',
      'Multi-Agent Systems', 'Prompt Engineering', 'pgvector', 'Embeddings',
      'OpenAI API', 'Anthropic API', 'Intelligent Automation', 'AI API Integration',
    ],
  },
  {
    icon: 'fa-solid fa-server',
    title: 'Backend Engineering',
    tags: [
      'FastAPI', 'Python', 'Go', 'REST APIs',
      'Celery', 'Redis', 'WebSockets', 'JWT / OAuth2',
      'Async Workers', 'IMAP / Email Protocols',
    ],
  },
  {
    icon: 'fa-solid fa-layer-group',
    title: 'Frontend Engineering',
    tags: [
      'Next.js (App Router)', 'React 19', 'TypeScript', 'Tailwind CSS',
      'Framer Motion', 'Responsive Design', 'Component Architecture', 'State Management',
    ],
  },
  {
    icon: 'fa-solid fa-sitemap',
    title: 'System Architecture',
    wide: true,
    tags: [
      'Multi-Tenant SaaS', 'Distributed Systems', 'API Design & Versioning',
      'Event-Driven Architecture', 'Microservices Concepts', 'Scalability Patterns',
      'Product Engineering', 'Database Architecture',
    ],
  },
  {
    icon: 'fa-solid fa-database',
    title: 'Databases',
    tags: [
      'PostgreSQL', 'pgvector', 'Supabase', 'Redis', 'Query Optimization',
      'Indexing & Performance', 'Data Modeling', 'Migrations', 'Vector Search',
    ],
  },
  {
    icon: 'fa-solid fa-cloud',
    title: 'Cloud & Infrastructure',
    wide: true,
    tags: [
      'AWS (EC2, S3)', 'GCP', 'Vercel', 'Docker',
      'Linux / VPS', 'Nginx', 'Reverse Proxies', 'CI/CD',
      'Environment Management', 'Production Monitoring',
    ],
  },
  {
    icon: 'fa-solid fa-wrench',
    title: 'Development Tools',
    tags: [
      'Git / GitHub', 'Testing & Debugging', 'Linting & Formatting',
      'VS Code', 'Postman', 'Docker Compose', 'Shell Scripting',
    ],
  },
]

function SkillCard({ domain }: { domain: Domain }) {
  return (
    <div
      className={`skill-card bg-surface-2 rounded-xl p-7 border border-border hover:border-accent/40 transition-all duration-300 hover:-translate-y-1 cursor-default${domain.wide ? ' lg:col-span-2' : ''}`}
    >
      <div className="flex items-center gap-3 mb-5">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent/10 shrink-0">
          <i className={`${domain.icon} text-accent text-[18px]`} />
        </div>
        <h3 className="text-[15px] font-semibold text-white">{domain.title}</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {domain.tags.map((tag) => (
          <span
            key={tag}
            className="text-[12px] text-muted bg-surface-3 px-3 py-1 rounded-full border border-border leading-none"
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
          <h2 className="section-title text-4xl sm:text-[3.5rem] font-semibold text-white mb-4">
            Engineering Expertise
          </h2>
          <p className="text-muted text-[15px] mb-14 max-w-xl">
            A full-spectrum engineering skill set, from intelligent systems to cloud infrastructure.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {domains.map((domain, i) => (
            <Reveal key={domain.title} delay={i * 0.08}>
              <SkillCard domain={domain} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
