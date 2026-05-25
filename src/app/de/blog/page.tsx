import type { Metadata } from 'next'
import BlogClient from '@/app/blog/BlogClient'
import { getGermanGuides, deCategoryMeta, blogUI } from './data'

export const metadata: Metadata = {
  title: 'Blog | Working Holiday Tax',
  description: 'Praktische Artikel über TFN, ABN, Steuererklärung, Super, Arbeitsrechte und mehr - geschrieben für Working Holiday Visum-Inhaber in Australien.',
  keywords: [
    'Working Holiday Tax Australien',
    'Working Holiday Visum Blog',
    '417 Visum Steuer',
    '462 Visum Steuer',
    'Backpacker Steuer Australien',
    'WHM Steuer Blog',
    'DASP Superannuation',
  ],
  alternates: {
    canonical: 'https://workingholidaytax.com.au/de/blog',
    languages: {
      'en-AU': 'https://workingholidaytax.com.au/blog',
      'de': 'https://workingholidaytax.com.au/de/blog',
      'x-default': 'https://workingholidaytax.com.au/blog',
    },
  },
  openGraph: {
    title: 'Blog | Working Holiday Tax',
    description: 'Alles, was du über Steuern in Australien wissen musst, einfach erklärt.',
    url: 'https://workingholidaytax.com.au/de/blog',
    siteName: 'Working Holiday Tax',
    locale: 'de_DE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | Working Holiday Tax',
    description: 'Alles, was du über Steuern in Australien wissen musst, einfach erklärt.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
    },
  },
}

export default function GermanBlogPage() {
  const guides = getGermanGuides()

  const collectionLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Working Holiday Tax Blog (Deutsch)',
    description: 'Steuer-Blog für Working Holiday Visum-Inhaber in Australien',
    url: 'https://workingholidaytax.com.au/de/blog',
    inLanguage: 'de',
    isPartOf: {
      '@type': 'WebSite',
      name: 'Working Holiday Tax',
      url: 'https://workingholidaytax.com.au',
    },
    about: {
      '@type': 'Thing',
      name: 'Australische Steuer für Working Holiday Visum-Inhaber',
    },
    audience: {
      '@type': 'Audience',
      name: 'Working Holiday Visum-Inhaber in Australien (Subclass 417 und 462)',
    },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: deCategoryMeta.length,
      itemListElement: deCategoryMeta.map((c, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `https://workingholidaytax.com.au/de/blog/category/${c.slug}`,
        name: c.title,
      })),
    },
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Startseite', item: 'https://workingholidaytax.com.au/de' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://workingholidaytax.com.au/de/blog' },
    ],
  }

  const orgLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Working Holiday Tax',
    url: 'https://workingholidaytax.com.au',
    logo: 'https://workingholidaytax.com.au/icon-512.png',
    description: 'Steuerservice für Working Holiday Visum-Inhaber in Australien. TFN-Anträge, Steuererklärungen, DASP Super-Auszahlungen und ABN-Registrierungen unter Aufsicht eines registrierten Steueragenten.',
    areaServed: { '@type': 'Country', name: 'Australia' },
    knowsAbout: [
      'Tax File Number Anträge',
      'Australian Business Number Registrierung',
      'Jährliche Steuererklärungen für Working Holiday Maker',
      'Departing Australia Superannuation Payment (DASP)',
      'Medicare Levy-Befreiung',
      'Working Holiday Visum Arbeitsrechte',
      'Subclass 417 Visum',
      'Subclass 462 Visum',
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }} />
      <main style={{ background: '#fff', minHeight: '100vh' }}>
        <BlogClient
          guides={guides}
          lang="de"
          ui={blogUI}
          blogBasePath="/de/blog"
          homePath="/de"
        />
      </main>
    </>
  )
}
