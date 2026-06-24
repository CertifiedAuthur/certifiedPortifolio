import Reveal from './Reveal'

const services = [
  {
    icon: 'fa-solid fa-code',
    title: 'Machine Learning',
    body: `As a Machine Learning Engineer, I specialise in building intelligent systems that leverage data
      to drive decision-making and automation. My services include data preprocessing, model development,
      and deployment — focusing on predictive analytics, natural language processing, and computer vision.
      I help businesses transform complex data into actionable insights and achieve scalable solutions.`,
  },
  {
    icon: 'fa-brands fa-app-store-ios',
    title: 'Artificial Intelligence',
    body: `I design and build intelligent systems beyond traditional automation — specialising in
      Retrieval-Augmented Generation (RAG), multi-agent systems with LangGraph, and tool-using
      assistants. I work across JavaScript, Next.js, and Python and deploy anywhere: Vercel, AWS,
      GCP, or GitHub Pages. From data prep to model deployment, I help unlock the full potential of AI.`,
  },
]

export default function Services() {
  return (
    <section id="services" className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-6 sm:px-[8%]">
        <Reveal>
          <h2 className="section-title text-4xl sm:text-[3.5rem] font-semibold text-white mb-14">
            My Services
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map(({ icon, title, body }, i) => (
            <Reveal key={title} delay={i * 0.13}>
              <div className="group bg-surface-3 rounded-xl p-10 text-[13px] font-light leading-relaxed text-muted transition-all duration-500 hover:-translate-y-2.5 hover:bg-accent hover:text-white cursor-default h-full">
                <i className={`${icon} text-5xl mb-8 block transition-colors duration-500`} />
                <h3 className="text-2xl font-medium text-white mb-4 transition-colors duration-500">
                  {title}
                </h3>
                <p>{body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
