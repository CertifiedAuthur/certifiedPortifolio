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
    default: 'Chibuzor Authur Okafor | AI & Machine Learning Engineer',
    template: '%s | CertifiedAuthur',
  },
  description:
    'Machine Learning & AI Engineer from Nigeria specialising in RAG systems, multi-agent architectures, and production-grade AI applications. Certified in Google Data Analytics, IBM AI Engineering, and more.',
  keywords: [
    'Machine Learning Engineer',
    'AI Engineer',
    'Nigeria',
    'RAG',
    'LangGraph',
    'Multi-agent systems',
    'FastAPI',
    'Next.js',
    'OpenAI',
    'Python',
    'CertifiedAuthur',
    'Chibuzor Okafor',
  ],
  authors: [{ name: 'Chibuzor Authur Okafor', url: 'https://certifiedauthur.com' }],
  creator: 'Chibuzor Authur Okafor',
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Chibuzor Authur Okafor | AI & Machine Learning Engineer',
    description:
      'Machine Learning & AI Engineer from Nigeria. Building RAG systems, multi-agent architectures, and AI-powered applications.',
    images: [{ url: '/images/ppic.jpg', width: 800, height: 800, alt: 'Chibuzor Authur Okafor' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chibuzor Authur Okafor | AI & Machine Learning Engineer',
    description: 'ML & AI Engineer from Nigeria — RAG, multi-agent systems, FastAPI, Next.js.',
    creator: '@AuthurOkafor',
    images: ['/images/ppic.jpg'],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Chibuzor Authur Okafor',
  alternateName: 'CertifiedAuthur',
  jobTitle: 'Machine Learning & AI Engineer',
  email: 'chibuzorauthur@gmail.com',
  telephone: '+2349036546571',
  address: { '@type': 'PostalAddress', addressCountry: 'NG' },
  sameAs: [
    'https://x.com/AuthurOkafor',
    'https://www.linkedin.com/in/chibuzor-okafor-0b9a92374',
    'https://www.instagram.com/official_certifiedauthur/',
  ],
  knowsAbout: [
    'Machine Learning',
    'AI Engineering',
    'Retrieval-Augmented Generation',
    'LangGraph',
    'Python',
    'FastAPI',
    'Next.js',
    'OpenAI APIs',
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} scroll-smooth`}>
      <head>
        <link rel="icon" type="image/png" href="/images/portfolio.png" />
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
