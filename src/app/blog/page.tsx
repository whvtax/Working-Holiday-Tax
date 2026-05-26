import type { Metadata } from 'next'
import { guides, categoryMeta } from './data'
import BlogClient from './BlogClient'

export const metadata: Metadata = {
  title: 'Blog | Working Holiday Tax',
  description: 'Practical articles covering TFN, ABN, tax returns, superannuation, work rights and more - written for working holiday visa holders in Australia.',
  keywords: [
    'working holiday tax Australia',
    'working holiday visa blog',
    '417 visa tax',
    '462 visa tax',
    'backpacker tax Australia',
    'WHM tax blog',
    'DASP superannuation',
  ],
  alternates: {
    canonical: 'https://workingholidaytax.com.au/blog',
  },
  openGraph: {
    title: 'Blog | Working Holiday Tax',
    description: 'Everything you need to know about tax in Australia, explained simply.',
    url: 'https://workingholidaytax.com.au/blog',
    siteName: 'Working Holiday Tax',
    locale: 'en_AU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | Working Holiday Tax',
    description: 'Everything you need to know about tax in Australia, explained simply.',
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
    url: 'https://workingholidaytax.com.au/blog',
    inLanguage: 'en-AU',
    isPartOf: {
      '@type': 'WebSite',
      name: 'Working Holiday Tax',
      url: 'https://workingholidaytax.com.au',
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
        url: `https://workingholidaytax.com.au/blog/category/${c.slug}`,
        name: c.title,
      })),
    },
  }

  // BreadcrumbList for the blog hub.
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://workingholidaytax.com.au' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://workingholidaytax.com.au/blog' },
    ],
  }

  // Organization schema with key facts about the service.
  // Helps AI models give accurate answers about who we are when users ask.
  const orgLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Working Holiday Tax',
    url: 'https://workingholidaytax.com.au',
    logo: 'https://workingholidaytax.com.au/icon-512.png',
    description: 'Tax service for working holiday visa holders in Australia. TFN applications, tax returns, DASP super claims, and ABN registrations supervised by a registered tax agent.',
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
