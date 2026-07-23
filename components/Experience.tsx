import Reveal from './Reveal'

const experience = [
  {
    period: '2025 – 2026',
    company: 'Kuuka',
    role: 'AI Engineer, Contract',
    highlights: [
      'Built AI-driven supplier intelligence automation and a multi-tenant campaign delivery platform from the ground up',
      'Implemented RBAC tenant isolation with CI/CD test coverage across 50+ endpoints',
      'Architected audit logging and GDPR compliance infrastructure for production deployment',
    ],
  },
  {
    period: '2025',
    company: 'Possibl',
    role: 'AI Engineer, Contract',
    highlights: [
      'Architected multi-agent conversational AI using LangChain and LangGraph with stateful memory',
      'Designed a NL-to-SQL analytics pipeline backed by PostgreSQL with conversation checkpointing',
      'Implemented automated memory summarization and human-in-the-loop decision routing',
    ],
  },
  {
    period: '2024 – 2025',
    company: 'Zenovo AI',
    role: 'Applied AI Engineer, Contract',
    highlights: [
      'Built a RAG platform on PostgreSQL and pgvector for intelligent RFQ/RFP proposal generation',
      'Reduced proposal preparation time by 70% through multi-agent LLM orchestration',
      'Engineered async infrastructure with Redis and Celery for reliable, production-grade processing',
    ],
  },
  {
    period: '2024 – 2025',
    company: 'Independent Clients',
    role: 'AI Engineer and ML Consultant',
    highlights: [
      'Delivered RAG knowledge retrieval systems using FAISS for enterprise-scale knowledge bases',
      'Built Whisper transcription pipelines deployed on Linux VPS infrastructure',
      'Created NL data exploration tools for Excel datasets and document embedding pipelines',
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
