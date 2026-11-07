import { newLocaleLanguages } from '@/lib/locale-pages'
import { SITE_URL } from '@/lib/constants'
import type { Metadata } from 'next'
import BlogClient from '@/app/(site)/blog/BlogClient'
import { getFrenchGuides, frCategoryMeta, blogUI } from './data'
import { NEW_LOCALE_CATEGORY_LABELS } from '@/lib/category-labels'
import { PagePhoto } from '@/components/wht/PagePhoto'
import { MobileCta } from '@/components/ui/MobileCta'
import { waUrl } from '@/lib/wa'

// Only guides with a native body are listed (ADR 013). With none, the index is noindex.
const hasGuides = getFrenchGuides().length > 0

export const metadata: Metadata = {
  title: "Guides impôts pour PVT en Australie",
  description: "Guides sur la tax return, le TFN, la super (DASP) et l'ABN en Australie, écrits pour les titulaires d'un visa vacances-travail 417 et 462.",
  keywords: ["tax return Australie PVT", "remboursement d'impôts Australie", "déclaration d'impôts Australie PVT", "impôts Australie visa vacances-travail", "TFN Australie PVT", "récupérer sa super Australie", "DASP Australie", "ABN Australie PVT", "visa 417 impôts", "visa 462 impôts", "blog impôts Australie PVT", "Working Holiday Tax Australie"],
  alternates: {
    canonical: `${SITE_URL}/fr/blog`,
    languages: {
      'en-AU': `${SITE_URL}/blog`,
      'de': `${SITE_URL}/de/blog`,
      'ja': `${SITE_URL}/ja/blog`,
      ...newLocaleLanguages('/blog'),
      'x-default': `${SITE_URL}/blog`,
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Guides impôts pour PVT en Australie' }],
    title: "Impôts en Australie pour PVT : le blog",
    description: "Des guides pratiques sur la tax return, le TFN, la super et l'ABN pour les PVT en Australie, expliqués simplement.",
    url: `${SITE_URL}/fr/blog`,
    siteName: 'Working Holiday Tax',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    images: [`${SITE_URL}/og-image.png`],
    card: 'summary_large_image',
    title: "Impôts en Australie pour PVT : le blog",
    description: "Des guides pratiques sur la tax return, le TFN, la super et l'ABN pour les PVT en Australie, expliqués simplement.",
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

export default function FrenchBlogPage() {
  const guides = getFrenchGuides()
  // Card fields only: anything passed to BlogClient is serialised into the
  // client payload, and the article bodies are never rendered by the listing.
  const guideCards = guides.map(({ body: _body, ...card }) => card)

  const collectionLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: "Working Holiday Tax Blog (Français)",
    description: "Blog fiscal pour les titulaires d'un visa vacances-travail en Australie",
    url: `${SITE_URL}/fr/blog`,
    inLanguage: 'fr',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    publisher: { '@id': `${SITE_URL}/#business` },
    about: { '@type': 'Thing', name: "Fiscalité australienne pour les titulaires d'un visa vacances-travail" },
    audience: { '@type': 'Audience', name: "Titulaires d'un visa vacances-travail en Australie (subclass 417 et 462)" },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: frCategoryMeta.length,
      itemListElement: frCategoryMeta.map((c, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `${SITE_URL}/fr/blog/category/${c.slug}`,
        name: c.title,
      })),
    },
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: "Accueil", item: `${SITE_URL}/fr` },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/fr/blog` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      
      <div style={{ background: '#fff', minHeight: '100vh' }}>
        <BlogClient
          guides={guideCards}
          photo={<PagePhoto page="tax-return" locale="fr" />}
          lang="fr"
          ui={blogUI}
          blogBasePath="/fr/blog"
          homePath="/fr"
          categoryBasePath="/fr/blog/category"
          categorySlugs={Object.fromEntries(frCategoryMeta.map(c => [c.category, c.slug]))}
          visibleCategories={frCategoryMeta.map(c => c.category)}
          categoryLabels={NEW_LOCALE_CATEGORY_LABELS.fr}
        />
      </div>
      <MobileCta href={waUrl({ topic: 'guide', lang: 'fr' })} lang="fr" topic="guide" />
    </>
  )
}
