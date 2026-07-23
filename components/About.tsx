'use client'

import Image from 'next/image'
import Reveal from './Reveal'

export default function About() {
  return (
    <section id="about" className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-6 sm:px-[8%]">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">

          {/* Photo */}
          <Reveal direction="left" className="w-full lg:w-[36%] shrink-0">
            <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden">
              <Image
                src="/images/ppic.jpg"
                alt="Chibuzor Authur Okafor"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 36vw"
              />
            </div>
          </Reveal>

          {/* Bio */}
          <Reveal direction="right" className="flex-1 min-w-0">
            <span className="eyebrow text-accent block mb-5">About</span>
            <h2 className="font-display text-4xl sm:text-[3.25rem] font-bold leading-tight text-foreground mb-8">
              Engineer First.<br />
              Generalist Never.
            </h2>

            <div className="space-y-5 text-[15px] text-muted leading-[1.8]">
              <p>
                I&apos;m Chibuzor Authur Okafor, a Full-Stack AI Engineer and AI Systems Architect
                from Nigeria. My path started with a degree in Soil Science, moved through
                hospitality, and landed firmly in software engineering because I couldn&apos;t
                stop building things. My real calling is designing and shipping complete,
                intelligent systems from first commit to production deployment.
              </p>
              <p>
                Today I build end-to-end software products that combine scalable backends,
                modern frontends, cloud infrastructure, and AI capabilities into cohesive,
                production-ready solutions. I&apos;ve architected multi-tenant SaaS platforms,
                AI-powered content automation systems, distributed email aggregation engines,
                and intelligent workflow tools, always owning the full stack from database
                schema to deployed product.
              </p>
              <p>
                AI is central to my work: not as a marketing layer or a chatbot wrapper, but
                as an engineered component with proper RAG pipelines, multi-agent
                orchestration, evaluation loops, and observability. I care deeply about
                systems that are reliable, maintainable, and designed to grow. An AI feature
                that breaks under real load isn&apos;t a feature; it&apos;s technical debt.
              </p>
            </div>

            <div className="mt-10 pt-8 border-t border-border flex flex-wrap gap-4">
              <button
                onClick={() =>
                  document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })
                }
                className="bg-accent text-white px-8 py-3 rounded-md text-[14px] font-medium hover:opacity-90 transition-opacity duration-200 cursor-pointer"
              >
                See My Projects
              </button>
              <a
                href="/images/Okafor Authur Resume.pdf"
                download
                className="border border-border text-foreground px-8 py-3 rounded-md text-[14px] font-medium hover:border-accent hover:text-accent transition-colors duration-300"
              >
                Download CV
              </a>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  )
}
