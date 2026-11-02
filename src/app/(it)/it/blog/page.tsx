import { newLocaleLanguages } from '@/lib/locale-pages'
import { SITE_URL } from '@/lib/constants'
import type { Metadata } from 'next'
import BlogClient from '@/app/(site)/blog/BlogClient'
import { getItalianGuides, itCategoryMeta, blogUI } from './data'
import { NEW_LOCALE_CATEGORY_LABELS } from '@/lib/category-labels'
import { PagePhoto } from '@/components/wht/PagePhoto'
import { MobileCta } from '@/components/ui/MobileCta'
import { waUrl } from '@/lib/wa'

// Only guides with a native body are listed (ADR 013). With none, the index is noindex.
const hasGuides = getItalianGuides().length > 0

export const metadata: Metadata = {
  title: "Guide fiscali per il Working Holiday in Australia",
  description: "Guide su tax return, TFN, super (DASP) e ABN in Australia, scritte per chi ha un visto Working Holiday 417 o 462.",
  keywords: ["tax return Australia Working Holiday", "dichiarazione dei redditi Australia", "rimborso tasse Australia", "tasse Australia visto Working Holiday", "TFN Australia italiani", "come recuperare la superannuation", "DASP Australia", "ABN Australia Working Holiday", "visto 417 tasse", "visto 462 tasse", "blog tasse Australia", "Working Holiday Tax Australia"],
  alternates: {
    canonical: `${SITE_URL}/it/blog`,
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
    title: "Tasse in Australia per il Working Holiday: il blog",
    description: "Guide pratiche su tax return, TFN, super e ABN per chi è in Australia con il Working Holiday, spiegate in modo semplice.",
    url: `${SITE_URL}/it/blog`,
    siteName: 'Working Holiday Tax',
    locale: 'it_IT',
    type: 'website',
  },
  twitter: {
    images: [`${SITE_URL}/og-image.png`],
    card: 'summary_large_image',
    title: "Tasse in Australia per il Working Holiday: il blog",
    description: "Guide pratiche su tax return, TFN, super e ABN per chi è in Australia con il Working Holiday, spiegate in modo semplice.",
  },
  robots: {
    index: hasGuides,
    follow: true,
    googleBot: {
      index: hasGuides,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
    },
  },
}

export default function ItalianBlogPage() {
  const guides = getItalianGuides()
  // Card fields only: anything passed to BlogClient is serialised into the
  // client payload, and the article bodies are never rendered by the listing.
  const guideCards = guides.map(({ body: _body, ...card }) => card)

  const collectionLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: "Working Holiday Tax Blog (Italiano)",
    description: "Blog fiscale per chi ha un visto Working Holiday in Australia",
    url: `${SITE_URL}/it/blog`,
    inLanguage: 'it',
    isPartOf: { '@type': 'WebSite', name: 'Working Holiday Tax', url: `${SITE_URL}` },
    about: { '@type': 'Thing', name: "Tasse australiane per chi ha un visto Working Holiday" },
    audience: { '@type': 'Audience', name: "Titolari di visto Working Holiday in Australia (subclass 417 e 462)" },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: itCategoryMeta.length,
      itemListElement: itCategoryMeta.map((c, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `${SITE_URL}/it/blog/category/${c.slug}`,
        name: c.title,
      })),
    },
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: "Home", item: `${SITE_URL}/it` },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/it/blog` },
    ],
  }

  const orgLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Working Holiday Tax',
    url: `${SITE_URL}`,
    logo: `${SITE_URL}/icon-512.png`,
    description: "Servizio fiscale per chi ha un visto Working Holiday in Australia: richiesta del TFN, tax return, prelievo della super (DASP) e registrazione dell'ABN, a cura di specialisti dei working holiday maker.",
    areaServed: { '@type': 'Country', name: 'Australia' },
    knowsAbout: [
      "Richiesta del Tax File Number",
      "Registrazione dell'Australian Business Number",
      "Tax return annuali per working holiday maker",
      "Departing Australia Superannuation Payment (DASP)",
      "Esenzione dalla Medicare levy",
      "Diritti sul lavoro per chi ha un visto Working Holiday",
      "Visto subclass 417",
      "Visto subclass 462"
],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }} />
      <div style={{ background: '#fff', minHeight: '100vh' }}>
        <BlogClient
          guides={guideCards}
          photo={<PagePhoto page="tax-return" locale="it" />}
          lang="it"
          ui={blogUI}
          blogBasePath="/it/blog"
          homePath="/it"
          categoryBasePath="/it/blog/category"
          categorySlugs={Object.fromEntries(itCategoryMeta.map(c => [c.category, c.slug]))}
          visibleCategories={itCategoryMeta.map(c => c.category)}
          categoryLabels={NEW_LOCALE_CATEGORY_LABELS.it}
        />
      </div>
      <MobileCta href={waUrl({ topic: 'guide', lang: 'it' })} lang="it" topic="guide" />
    </>
  )
}
