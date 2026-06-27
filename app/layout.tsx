import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://certifiedauthur.com'),
  title: {
    default: 'Chibuzor Authur Okafor | Full-Stack AI Engineer',
    template: '%s | CertifiedAuthur',
  },
  description:
    'Full-Stack AI Engineer and AI Systems Architect from Nigeria. I design, build, and ship complete intelligent software systems: multi-tenant SaaS, scalable backends, AI-powered APIs, cloud infrastructure, and production frontends.',
  keywords: [
    'Full-Stack AI Engineer',
    'AI Systems Architect',
    'Founding Engineer',
    'Product Engineer',
    'SaaS Development',
    'Backend Engineer',
    'Next.js Developer',
    'FastAPI',
    'Python',
    'RAG',
    'LangGraph',
    'Multi-agent systems',
    'PostgreSQL',
    'Redis',
    'Docker',
    'AWS',
    'Cloud Infrastructure',
    'Multi-tenant SaaS',
    'API Design',
    'Nigeria',
    'CertifiedAuthur',
    'Chibuzor Okafor',
  ],
  authors: [{ name: 'Chibuzor Authur Okafor', url: 'https://certifiedauthur.com' }],
  creator: 'Chibuzor Authur Okafor',
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Chibuzor Authur Okafor | Full-Stack AI Engineer',
    description:
      'Full-Stack AI Engineer from Nigeria. Building complete intelligent software systems, from database schema to deployed frontend, with AI at the core.',
    images: [{ url: '/images/ppic.jpg', width: 800, height: 800, alt: 'Chibuzor Authur Okafor' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chibuzor Authur Okafor | Full-Stack AI Engineer',
    description: 'Full-Stack AI Engineer from Nigeria. SaaS, backends, cloud infra, and AI systems shipped end-to-end.',
    creator: '@AuthurOkafor',
    images: ['/images/ppic.jpg'],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Chibuzor Authur Okafor',
  alternateName: 'CertifiedAuthur',
  jobTitle: 'Full-Stack AI Engineer & AI Systems Architect',
  email: 'chibuzorauthur@gmail.com',
  telephone: '+2349036546571',
  address: { '@type': 'PostalAddress', addressCountry: 'NG' },
  sameAs: [
    'https://x.com/AuthurOkafor',
    'https://www.linkedin.com/in/chibuzor-okafor-0b9a92374',
    'https://www.instagram.com/official_certifiedauthur/',
  ],
  knowsAbout: [
    'Full-Stack Software Engineering',
    'AI Systems Architecture',
    'Backend Engineering',
    'Retrieval-Augmented Generation',
    'Multi-Agent Systems',
    'LangGraph',
    'SaaS Development',
    'Multi-Tenant Architecture',
    'API Design',
    'Python',
    'FastAPI',
    'Next.js',
    'React',
    'TypeScript',
    'PostgreSQL',
    'Redis',
    'Docker',
    'AWS',
    'GCP',
    'Cloud Infrastructure',
    'DevOps',
    'OpenAI APIs',
    'Product Engineering',
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} scroll-smooth`}>
      <head>
        <link rel="icon" type="image/png" href="/images/portfolio.png" />
        {/* Prevent FOUC: apply stored or system theme before first paint */}
        <script dangerouslySetInnerHTML={{ __html: `(function(){var s=localStorage.getItem('theme');var p=window.matchMedia('(prefers-color-scheme: light)').matches;if(s==='light'||(s===null&&p)){document.documentElement.classList.add('light');}})();` }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">
        {children}
        <Script
          src="https://kit.fontawesome.com/b1e0628663.js"
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />
      </body>
    </html>
  )
}
