import { SITE_URL } from '@/lib/constants'
import type { Metadata } from 'next'
import { guides, categoryMeta } from './data'
import BlogClient from './BlogClient'

export const metadata: Metadata = {
  title: 'Working Holiday Tax Refund Blog - WHV Tax Guides for Backpackers',
  description: 'Working holiday tax refund guides for backpackers in Australia. Practical articles on WHV tax returns, refund amounts, TFN, ABN, super refund (DASP), 417/462 visa tax - everything you need to claim your Australian tax refund.',
  keywords: [
    'working holiday tax refund blog',
    'WHV tax refund guide Australia',
    'backpacker tax refund blog',
    'how to get tax refund Australia working holiday',
    'Australian tax refund tips backpacker',
    'WHV tax return guide',
    'working holiday tax Australia',
    'working holiday visa blog',
    '417 visa tax refund',
    '462 visa tax refund',
    'backpacker tax Australia',
    'WHM tax blog',
    'DASP superannuation refund',
    'tax refund advice working holiday',
  ],
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
  openGraph: {
    title: 'Working Holiday Tax Refund Blog - WHV Tax Guides',
    description: 'Working holiday tax refund guides and tips for backpackers in Australia. Get the most from your WHV tax return.',
    url: `${SITE_URL}/blog`,
    siteName: 'Working Holiday Tax',
    locale: 'en_AU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Working Holiday Tax Refund Blog - WHV Tax Guides',
    description: 'Working holiday tax refund guides for backpackers in Australia.',
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

export default function BlogPage() {
  // CollectionPage schema for the blog hub, with ItemList of all category pages.
  // Helps AI search engines understand the structure and find category-specific content.
  const collectionLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Working Holiday Tax Blog',
    description: 'Tax blog for working holiday visa holders in Australia',
    url: `${SITE_URL}/blog`,
    inLanguage: 'en-AU',
    isPartOf: {
      '@type': 'WebSite',
      name: 'Working Holiday Tax',
      url: `${SITE_URL}`,
    },
    about: {
      '@type': 'Thing',
      name: 'Australian tax for working holiday visa holders',
    },
    audience: {
      '@type': 'Audience',
      name: 'Working holiday visa holders in Australia (subclass 417 and 462)',
    },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: categoryMeta.length,
      itemListElement: categoryMeta.map((c, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `${SITE_URL}/blog/category/${c.slug}`,
        name: c.title,
      })),
    },
  }

  // BreadcrumbList for the blog hub.
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}` },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
    ],
  }

  // Organization schema with key facts about the service.
  // Helps AI models give accurate answers about who we are when users ask.
  const orgLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Working Holiday Tax',
    url: `${SITE_URL}`,
    logo: `${SITE_URL}/icon-512.png`,
    description: 'Tax service for working holiday visa holders in Australia. TFN applications, tax returns, DASP super claims, and ABN registrations handled under the supervision of a registered tax agent.',
    areaServed: {
      '@type': 'Country',
      name: 'Australia',
    },
    knowsAbout: [
      'Tax File Number applications',
      'Australian Business Number registration',
      'Annual tax returns for working holiday makers',
      'Departing Australia Superannuation Payment (DASP)',
      'Medicare Levy exemption',
      'Working holiday visa work rights',
      'Subclass 417 visa',
      'Subclass 462 visa',
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }} />
      <main style={{ background: '#fff', minHeight: '100vh' }}>
        <BlogClient guides={guides} />
      </main>
    </>
  )
}
