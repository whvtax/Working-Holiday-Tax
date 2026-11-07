import { newLocaleLanguages } from '@/lib/locale-pages'
import { SITE_URL } from '@/lib/constants'
import type { Metadata } from 'next'
import { guides, categoryMeta } from './data'
import BlogClient from './BlogClient'
import { PagePhoto } from '@/components/wht/PagePhoto'
import { MobileCta } from '@/components/ui/MobileCta'
import { waUrl } from '@/lib/wa'

export const metadata: Metadata = {
  title: { absolute: 'Working holiday tax guides for 417 and 462 visa holders' },
  description: 'Guides to tax on a working holiday visa: TFN, ABN, tax returns and refunds, super and DASP, the Medicare levy and work rights for 417 and 462 holders.',
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
    languages: {
      'en-AU': `${SITE_URL}/blog`,
      'de': `${SITE_URL}/de/blog`,
      'ja': `${SITE_URL}/ja/blog`,
      ...newLocaleLanguages('/blog'),
      'x-default': `${SITE_URL}/blog`,
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Working Holiday Tax Refund Australia' }],
    title: 'Working Holiday Tax Refund Blog - WHV Tax Guides',
    description: 'Working holiday tax refund guides and tips for backpackers in Australia. Get the most from your WHV tax return.',
    url: `${SITE_URL}/blog`,
    siteName: 'Working Holiday Tax',
    locale: 'en_AU',
    type: 'website',
  },
  twitter: {
    images: [`${SITE_URL}/og-image.png`],
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

// Card fields only. Anything passed to BlogClient crosses into the client
// bundle, and the article bodies are megabytes the listing never renders.
const guideCards = guides.map(({ body: _body, ...card }) => card)

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
    isPartOf: { '@id': `${SITE_URL}/#website` },
    publisher: { '@id': `${SITE_URL}/#business` },
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

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <div style={{ background: '#fff', minHeight: '100vh' }}>
        <BlogClient guides={guideCards} photo={<PagePhoto page="tax-return" locale="en" />} />
      </div>
      <MobileCta href={waUrl({ topic: "guide", lang: "en" })} lang="en" topic="guide" />
    </>
  )
}
