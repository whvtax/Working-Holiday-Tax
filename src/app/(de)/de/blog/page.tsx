import { SITE_URL } from '@/lib/constants'
import type { Metadata } from 'next'
import BlogClient from '@/app/(site)/blog/BlogClient'
import { getGermanGuides, deCategoryMeta, blogUI } from './data'
import { MobileCta } from '@/components/ui/MobileCta'
import { waUrl } from '@/lib/wa'

export const metadata: Metadata = {
  title: 'Steuer-Guides für Work and Travel',
  description: 'Artikel zu Steuererklärung, TFN, Super (DASP) und ABN in Australien, geschrieben für Working Holiday Maker auf 417 und 462.',
  keywords: [
    'Steuerrückerstattung Australien Blog',
    'WHV Steuerrückerstattung Guide',
    'Backpacker Steuer zurück Australien Blog',
    'Steuer zurückholen Australien Ratgeber',
    'Working Holiday Maker Steuer Blog',
    'WHV Steuererklärung Anleitung',
    'Working Holiday Tax Australien',
    'Working Holiday Visum Blog',
    '417 Visum Steuer',
    '462 Visum Steuer',
    'Backpacker Steuer Australien',
    'WHM Steuer Blog',
    'DASP Superannuation',
    'Steuerrückerstattung Tipps Working Holiday',
  ],
  alternates: {
    canonical: `${SITE_URL}/de/blog`,
    languages: {
      'en-AU': `${SITE_URL}/blog`,
      'de': `${SITE_URL}/de/blog`,
      'ja': `${SITE_URL}/ja/blog`,
      'x-default': `${SITE_URL}/blog`,
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Working Holiday Tax Refund Australia' }],
    title: 'Steuerrückerstattung Australien Blog: WHV Steuer-Guides',
    description: 'Praktische Artikel über Steuerrückerstattung in Australien für Working Holiday Maker. So holst du dir deine Steuern zurück.',
    url: `${SITE_URL}/de/blog`,
    siteName: 'Working Holiday Tax',
    locale: 'de_DE',
    type: 'website',
  },
  twitter: {
    images: [`${SITE_URL}/og-image.png`],
    card: 'summary_large_image',
    title: 'Steuerrückerstattung Australien Blog: WHV Guides',
    description: 'Praktische Artikel zur Steuerrückerstattung in Australien für Backpacker.',
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
  // Card fields only: anything passed to BlogClient is serialised into the
  // client payload, and the article bodies are never rendered by the listing.
  const guideCards = guides.map(({ body: _body, ...card }) => card)

  const collectionLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Working Holiday Tax Blog (Deutsch)',
    description: 'Steuerblog für Working Holiday Visuminhaber in Australien',
    url: `${SITE_URL}/de/blog`,
    inLanguage: 'de',
    isPartOf: {
      '@type': 'WebSite',
      name: 'Working Holiday Tax',
      url: `${SITE_URL}`,
    },
    about: {
      '@type': 'Thing',
      name: 'Australische Steuer für Working Holiday Visuminhaber',
    },
    audience: {
      '@type': 'Audience',
      name: 'Working Holiday Visuminhaber in Australien (Subclass 417 und 462)',
    },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: deCategoryMeta.length,
      itemListElement: deCategoryMeta.map((c, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `${SITE_URL}/de/blog/category/${c.slug}`,
        name: c.title,
      })),
    },
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Startseite', item: `${SITE_URL}/de` },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/de/blog` },
    ],
  }

  const orgLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Working Holiday Tax',
    url: `${SITE_URL}`,
    logo: `${SITE_URL}/icon-512.png`,
    description: 'Steuerservice für Working Holiday Visuminhaber in Australien. TFN-Anträge, Steuererklärungen, DASP Superauszahlungen und ABN-Registrierungen von Working-Holiday-Spezialisten abgewickelt.',
    areaServed: { '@type': 'Country', name: 'Australia' },
    knowsAbout: [
      'Tax File Number Anträge',
      'Australian Business Number Registrierung',
      'Jährliche Steuererklärungen für Working Holiday Maker',
      'Departing Australia Superannuation Payment (DASP)',
      'Medicare-Levy-Befreiung',
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
          guides={guideCards}
          lang="de"
          ui={blogUI}
          blogBasePath="/de/blog"
          homePath="/de"
          categoryBasePath="/de/blog/category"
          // The German Medicare hub is /medicare where English uses
          // /medicare-and-other, so the filter pills get this locale's own
          // slugs rather than reusing the English ones.
          categorySlugs={Object.fromEntries(deCategoryMeta.map(c => [c.category, c.slug]))}
        />
      </main>
      <MobileCta href={waUrl({ topic: "guide", lang: "de" })} lang="de" topic="guide" />
    </>
  )
}
