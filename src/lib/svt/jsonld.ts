import { SVT_PUBLIC } from '@/lib/svt/brand-public'

/** JSON for a <script type="application/ld+json">. `<`, `>` and `&` are
 *  escaped so no string in the data can close the script element. */
export function jsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c').replace(/>/g, '\\u003e').replace(/&/g, '\\u0026')
}

/** Organisation markup for SVT. No telephone while the number is a
 *  placeholder, and no social profiles until SVT has its own. */
/** A price as shown on the site: AUD, GST included. */
const offer = (name: string, price: string) => ({
  '@type': 'Offer', name, itemOffered: { '@type': 'Service', name }, price, priceCurrency: 'AUD',
  priceSpecification: { '@type': 'PriceSpecification', price, priceCurrency: 'AUD', valueAddedTaxIncluded: true },
})

export function svtOrganization() {
  const svt = SVT_PUBLIC
  return {
    '@context': 'https://schema.org',
    // Organization, not ProfessionalService: a LocalBusiness type would need a street address.
    '@type': 'Organization',
    '@id': `${svt.siteUrl}/#business`,
    name: svt.name,
    url: svt.siteUrl,
    email: svt.email,
    ...(svt.whatsappIsPlaceholder ? {} : { telephone: `+${svt.whatsappNumber}` }),
    logo: `${svt.siteUrl}/svt-assets/favicon.svg`,
    image: `${svt.siteUrl}/svt-assets/og/og-en.png`,
    // Fixed legal wording only: the agent supervises, it does not own the business.
    description: 'Tax returns for international students and graduates in Australia on 500 and 485 visas. Operates under the supervision of a registered tax agent.',
    areaServed: { '@type': 'Country', name: 'Australia' },
    knowsLanguage: ['en', 'zh-Hans', 'vi'],
    makesOffer: [
      offer('Tax return (TFN income)', '220'),
      offer('Tax return with ABN income', '385'),
    ],
  }
}

/** The business, by reference: every page links its markup to the one
 *  Organization defined (on the same page) by svtOrganization(). */
export const SVT_BUSINESS_REF = { '@id': `${SVT_PUBLIC.siteUrl}/#business` }
/** The business by reference, with its name and URL inline (Google's Article guidelines). */
const SVT_BUSINESS_INLINE = { ...SVT_BUSINESS_REF, '@type': 'Organization', name: SVT_PUBLIC.name, url: SVT_PUBLIC.siteUrl }

/** The site, so search and answer engines name it "Student Visa Tax" and
 *  tie every page to it. */
export const SVT_WEBSITE_REF = { '@id': `${SVT_PUBLIC.siteUrl}/#website` }
export function svtWebsite() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    ...SVT_WEBSITE_REF,
    url: SVT_PUBLIC.siteUrl,
    name: SVT_PUBLIC.name,
    alternateName: SVT_PUBLIC.domain,
    inLanguage: ['en-AU', 'zh-Hans', 'vi'],
    publisher: SVT_BUSINESS_REF,
  }
}

/** Markup for one guide or article page. Topic pages are Articles with
 *  dates; service pages are a WebPage (or the AboutPage). */
export function guidePageSchema(p: {
  url: string; title: string; description: string; inLanguage: string
  published: string; updated: string; image: string; kind: 'Article' | 'WebPage' | 'AboutPage'
  /** The official pages the content is checked against. */
  citations?: readonly string[]
}) {
  const base = { '@context': 'https://schema.org', '@type': p.kind, '@id': `${p.url}#page`, url: p.url, inLanguage: p.inLanguage, datePublished: p.published, dateModified: p.updated, isPartOf: SVT_WEBSITE_REF }
  return p.kind === 'Article'
    ? { ...base, headline: p.title, description: p.description, mainEntityOfPage: p.url, image: p.image, author: SVT_BUSINESS_INLINE, publisher: SVT_BUSINESS_INLINE, ...(p.citations?.length ? { citation: p.citations } : {}) }
    : { ...base, name: p.title, description: p.description, publisher: SVT_BUSINESS_REF }
}

export function breadcrumbList(items: ReadonlyArray<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((x, i) => ({ '@type': 'ListItem', position: i + 1, name: x.name, item: x.url })),
  }
}

export function faqPage(items: ReadonlyArray<{ q: string; a: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(i => ({ '@type': 'Question', name: i.q, acceptedAnswer: { '@type': 'Answer', text: i.a } })),
  }
}
