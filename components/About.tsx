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
              Built for Production.<br />
              Not for Demo.
            </h2>

            <div className="space-y-5 text-[15px] text-muted leading-[1.85]">

              {/* Opening */}
              <p>
                I&apos;m Chibuzor Authur Okafor, and I design and build
                production AI systems that organizations can genuinely rely on. What shapes
                every decision I make is a conviction I arrived at early and have not found
                reason to abandon: software that matters has to be trustworthy, not just
                impressive, and that quality is something you engineer deliberately, from the
                first architectural choice through to how the system behaves under real
                conditions two years after launch.
              </p>

              {/* Journey */}
              <p>
                My path into software engineering was unconventional by any measure. I
                studied Soil Science at university, then spent several years working in
                hospitality before writing a line of production code. There was no formal
                computer science education and no roadmap to follow. What there was,
                consistently, was curiosity about how things work at a fundamental level and
                a willingness to stay with difficult problems until they gave way. I taught
                myself software engineering by building real things, reading extensively, and
                being honest about what I did not yet understand. The journey was neither
                fast nor straightforward, but every stage of it reinforced the same lesson:
                if you want to understand something deeply, build something with it.
              </p>

              {/* Soil Science and systems thinking */}
              <p>
                Studying Soil Science shaped the way I think about complexity more than I
                recognized at the time. The discipline requires understanding how
                interconnected systems behave over long periods, how a shift in one variable
                propagates through a network of dependencies to produce effects that are not
                obvious from the surface, and how systems degrade in ways that rarely
                announce themselves dramatically. It develops patience with things that are
                difficult to control and a habit of tracing root causes rather than treating
                symptoms. When I think about software architecture today, those same
                instincts are present: where are the hidden dependencies, where could this
                fail quietly over time, and what will it cost to maintain this system in
                three years?
              </p>

              {/* Current work */}
              <p>
                Today I design and deliver complete software systems, taking full ownership
                from initial architecture through development, deployment, and long-term
                operation. I enjoy owning the entire lifecycle because architecture only
                proves itself when the software is running in production and being used by
                real people. My work spans backend services, frontends, cloud infrastructure,
                databases, and the AI components that connect them into coherent products. I
                treat artificial intelligence not as a feature added at the end of a project
                but as an engineered component that must be designed, measured, and
                maintained with the same discipline as any other critical part of the system.
              </p>

              {/* Closing */}
              <p>
                What I find most meaningful about this work is not the technical complexity
                but the outcome it produces. Software that holds up over time, that keeps
                functioning as the business around it evolves, and that remains comprehensible
                to the people who maintain it years after its launch is a quiet but significant
                kind of accomplishment. Technology will keep changing. Building software people
                can genuinely depend on is the part I hope never does.
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
