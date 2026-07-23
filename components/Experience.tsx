import Reveal from './Reveal'

const experience = [
  {
    period: '2025 – 2026',
    company: 'Kuuka',
    role: 'AI Engineer, Contract',
    highlights: [
      'Delivered AI-driven supplier intelligence automation and multi-tenant campaign infrastructure from scratch, enabling multiple client organizations to operate with strict data isolation on a single shared platform',
      'Secured 50+ production endpoints with RBAC-enforced tenant isolation and full CI/CD test coverage, enabling confident deployment across a multi-tenant environment',
      'Architected GDPR-compliant audit logging that shipped to production without post-deployment compliance remediation',
    ],
  },
  {
    period: '2025',
    company: 'Possibl',
    role: 'AI Engineer, Contract',
    highlights: [
      'Designed a multi-agent conversational AI system with stateful memory using LangChain and LangGraph, enabling sessions that maintain full context across extended exchanges',
      'Built a natural language to SQL analytics pipeline over PostgreSQL, allowing non-technical users to query structured data in plain English without writing a single query',
      'Implemented automated memory summarization and human-in-the-loop decision routing, keeping AI responses within defined boundaries under real production conditions',
    ],
  },
  {
    period: '2024 – 2025',
    company: 'Zenovo AI',
    role: 'Applied AI Engineer, Contract',
    highlights: [
      'Built a RAG-powered proposal generation platform on PostgreSQL and pgvector, enabling teams to produce intelligent, context-aware RFQ and RFP responses automatically',
      'Reduced proposal preparation time by 70% through multi-agent LLM orchestration, turning a multi-day manual process into an automated workflow',
      'Engineered async processing infrastructure with Redis and Celery, decoupling generation workloads from request latency for reliable production throughput',
    ],
  },
  {
    period: '2024 – 2025',
    company: 'Independent Clients',
    role: 'AI Engineer and ML Consultant',
    highlights: [
      'Delivered RAG knowledge retrieval systems using FAISS, enabling enterprise clients to surface accurate information from large internal knowledge bases through semantic search',
      'Built Whisper-based transcription pipelines on Linux VPS, converting audio content to searchable structured text and eliminating the need for manual transcription',
      'Created natural language data exploration tools for Excel datasets and document embedding pipelines, allowing non-technical stakeholders to query and analyze structured data in plain English',
    ],
  },
]

export default function Experience() {
  return (
    <section id="experience" className="py-20 sm:py-28 bg-surface-2">
      <div className="max-w-7xl mx-auto px-6 sm:px-[8%]">

        <Reveal>
          <span className="eyebrow text-accent block mb-5">Experience</span>
          <h2 className="font-display text-4xl sm:text-[3.25rem] font-bold text-foreground leading-tight mb-4">
            Where I&apos;ve Built<br />
            Real AI Systems
          </h2>
          <p className="text-muted text-[15px] mb-16 max-w-xl leading-relaxed">
            Contract engagements building production AI infrastructure for companies
            across industries. Every role was a full-stack responsibility.
          </p>
        </Reveal>

        <div>
          {experience.map((item, i) => (
            <Reveal key={item.company} delay={i * 0.1}>
              <div className="flex flex-col md:flex-row gap-6 md:gap-12 py-9 border-t border-border">
                {/* Left: period, company, role */}
                <div className="md:w-[260px] shrink-0">
                  <span className="text-[11px] text-muted font-mono tracking-[0.12em] uppercase">
                    {item.period}
                  </span>
                  <h3 className="font-display font-bold text-[21px] text-foreground mt-1 leading-tight">
                    {item.company}
                  </h3>
                  <p className="text-accent text-[13px] font-medium mt-1.5">{item.role}</p>
                </div>

                {/* Right: achievement bullets */}
                <ul className="flex-1 space-y-3 pt-0 md:pt-7">
                  {item.highlights.map((h, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-3 text-[14px] text-muted leading-[1.7]"
                    >
                      <span className="text-accent shrink-0 mt-[6px] text-[7px]">■</span>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
          {/* Terminal border */}
          <div className="border-t border-border" />
        </div>

      </div>
    </section>
  )
}
