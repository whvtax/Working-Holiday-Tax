import { newLocaleLanguages } from '@/lib/locale-pages'
import { SITE_URL } from '@/lib/constants'
import type { Metadata } from 'next'
import BlogClient from '@/app/(site)/blog/BlogClient'
import { getSpanishGuides, esCategoryMeta, blogUI } from './data'
import { NEW_LOCALE_CATEGORY_LABELS } from '@/lib/category-labels'
import { PagePhoto } from '@/components/wht/PagePhoto'
import { MobileCta } from '@/components/ui/MobileCta'
import { waUrl } from '@/lib/wa'

// Only guides with a native body are listed (ADR 013). With none, the index is noindex.
const hasGuides = getSpanishGuides().length > 0

export const metadata: Metadata = {
  title: "Guías de impuestos para working holiday en Australia",
  description: "Guías sobre tax return, TFN, super (DASP) y ABN en Australia, escritas para quienes tienen una visa working holiday 462 o 417.",
  keywords: ["devolución de impuestos Australia", "tax return Australia working holiday", "declaración de impuestos Australia", "impuestos Australia visa working holiday", "TFN Australia", "cómo recuperar la superannuation", "DASP Australia", "ABN Australia working holiday", "visa 462 impuestos", "visa 417 impuestos", "blog impuestos Australia", "Working Holiday Tax Australia"],
  alternates: {
    canonical: `${SITE_URL}/es/blog`,
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
    title: "Impuestos en Australia para working holiday: el blog",
    description: "Guías prácticas sobre tax return, TFN, super y ABN para quienes están en Australia con una visa working holiday, explicadas con claridad.",
    url: `${SITE_URL}/es/blog`,
    siteName: 'Working Holiday Tax',
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    images: [`${SITE_URL}/og-image.png`],
    card: 'summary_large_image',
    title: "Impuestos en Australia para working holiday: el blog",
    description: "Guías prácticas sobre tax return, TFN, super y ABN para quienes están en Australia con una visa working holiday, explicadas con claridad.",
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

export default function SpanishBlogPage() {
  const guides = getSpanishGuides()
  // Card fields only: anything passed to BlogClient is serialised into the
  // client payload, and the article bodies are never rendered by the listing.
  const guideCards = guides.map(({ body: _body, ...card }) => card)

  const collectionLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: "Working Holiday Tax Blog (Español)",
    description: "Blog de impuestos para quienes tienen una visa working holiday en Australia",
    url: `${SITE_URL}/es/blog`,
    inLanguage: 'es',
    isPartOf: { '@type': 'WebSite', name: 'Working Holiday Tax', url: `${SITE_URL}` },
    about: { '@type': 'Thing', name: "Impuestos australianos para quienes tienen una visa working holiday" },
    audience: { '@type': 'Audience', name: "Titulares de visa working holiday en Australia (subclass 462 y 417)" },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: esCategoryMeta.length,
      itemListElement: esCategoryMeta.map((c, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `${SITE_URL}/es/blog/category/${c.slug}`,
        name: c.title,
      })),
    },
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: "Inicio", item: `${SITE_URL}/es` },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/es/blog` },
    ],
  }

  const orgLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Working Holiday Tax',
    url: `${SITE_URL}`,
    logo: `${SITE_URL}/icon-512.png`,
    description: "Servicio de impuestos para quienes tienen una visa working holiday en Australia: solicitud del TFN, tax return, retiro de la super (DASP) y registro del ABN, a cargo de especialistas en working holiday makers.",
    areaServed: { '@type': 'Country', name: 'Australia' },
    knowsAbout: [
      "Solicitud del Tax File Number",
      "Registro del Australian Business Number",
      "Tax return anual para working holiday makers",
      "Departing Australia Superannuation Payment (DASP)",
      "Exención de la Medicare levy",
      "Derechos laborales de quienes tienen una visa working holiday",
      "Visa subclass 462",
      "Visa subclass 417"
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
          photo={<PagePhoto page="tax-return" locale="es" />}
          lang="es"
          ui={blogUI}
          blogBasePath="/es/blog"
          homePath="/es"
          categoryBasePath="/es/blog/category"
          categorySlugs={Object.fromEntries(esCategoryMeta.map(c => [c.category, c.slug]))}
          visibleCategories={esCategoryMeta.map(c => c.category)}
          categoryLabels={NEW_LOCALE_CATEGORY_LABELS.es}
        />
      </div>
      <MobileCta href={waUrl({ topic: 'guide', lang: 'es' })} lang="es" topic="guide" />
    </>
  )
}
