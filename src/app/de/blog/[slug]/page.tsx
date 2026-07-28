import { SITE_URL } from '@/lib/constants'
import { catLabelDe } from '@/lib/category-labels'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { guides, getCategoryColor } from '@/app/blog/data'
import GuideArticle from '@/app/blog/[slug]/GuideArticle'
import StickyBreadcrumbs from '@/app/blog/[slug]/StickyBreadcrumbs'
import CategoryHero from '@/app/blog/[slug]/CategoryHero'
import { getGermanGuide, getGermanCategoryMeta, deCategoryMeta, blogUI } from '../data'


const OG_BY_CATEGORY: Record<string, string> = {
  'TFN': '/assets/og/og-tfn.png',
  'ABN': '/assets/og/og-abn.png',
  'Tax Return': '/assets/og/og-tax-return.png',
  'Super': '/assets/og/og-super.png',
  'Work Rights': '/assets/og/og-work-rights.png',
  'Medicare & Other': '/assets/og/og-medicare.png',
}
function ogForCategory(category: string): string {
  return OG_BY_CATEGORY[category] ?? '/og-image.png'
}

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  // Generate for all English posts - German blog mirrors them
  return guides.map(g => ({ slug: g.slug }))
}

// Per-category keyword expansions - dynamically applied per blog post
const CATEGORY_KEYWORDS: Record<string, string[]> = {
  'TFN': [
    'TFN beantragen Working Holiday',
    'Steuernummer Australien Backpacker',
    'TFN 417 Visum',
    'TFN 462 Visum',
    'TFN für Steuerrückerstattung',
  ],
  'ABN': [
    'ABN Registrierung Working Holiday',
    'Australian Business Number Backpacker',
    'Selbstständig Australien WHV',
    'ABN 417 Visum',
    'ABN 462 Visum',
  ],
  'Tax Return': [
    'Steuerrückerstattung Australien Working Holiday',
    'WHV Steuererklärung',
    'Steuerrückerstattung 417 Visum',
    'Steuerrückerstattung 462 Visum',
    'Steuer zurück Australien Backpacker',
    'Steuererklärung Australien nach Rückkehr',
  ],
  'Super': [
    'Super-Rückerstattung Australien',
    'DASP Auszahlung Working Holiday',
    'Super zurückholen Australien Backpacker',
    'Departing Australia Superannuation Payment',
    'Super-Rückerstattung 417 Visum',
  ],
  'Work Rights': [
    'Arbeitsrechte Working Holiday Australien',
    'Fair Work Australien Backpacker',
    'Working Holiday Beschäftigung Australien',
    '417 Visum Arbeitsbedingungen',
    '462 Visum Arbeitsbedingungen',
  ],
  'Medicare & Other': [
    'Medicare Levy Befreiung Backpacker',
    'Medicare Working Holiday Visum',
    'RHCA Australien Deutsch',
    'Medicare Levy Befreiung 417',
    'Medicare Levy Befreiung 462',
  ],
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const result = getGermanGuide(params.slug)
  if (!result) return {}
  const { guide, isTranslated } = result
  const categoryKeywords = CATEGORY_KEYWORDS[guide.category] || []
  return {
    title: `${guide.title} | Working Holiday Tax`,
    description: guide.description,
    keywords: [
      // Core working holiday tax refund keywords (German)
      'Steuerrückerstattung Australien',
      'Working Holiday Steuer Australien',
      'Working Holiday Visum Australien',
      '417 Visum Australien',
      '462 Visum Australien',
      'Backpacker Steuer Australien',
      'WHM Steuer',
      'WHV Steuer',
      // Category-specific
      ...categoryKeywords,
      // Post-specific
      guide.category,
      guide.title,
    ],
    alternates: {
      // When the post body is still English (not yet translated), point the
      // canonical at the English source so Google doesn't index duplicate
      // English content under a /de/ URL.
      canonical: isTranslated
        ? `${SITE_URL}/de/blog/${guide.slug}`
        : `${SITE_URL}/blog/${guide.slug}`,
      languages: {
        'en-AU': `${SITE_URL}/blog/${guide.slug}`,
        'de': `${SITE_URL}/de/blog/${guide.slug}`,
        'ja': `${SITE_URL}/ja/blog/${guide.slug}`,
        'x-default': `${SITE_URL}/blog/${guide.slug}`,
      },
    },
    openGraph: {
      images: [{ url: `${SITE_URL}${ogForCategory(guide.category)}`, width: 1200, height: 630, alt: 'Working Holiday Tax Refund Australia' }],
      title: guide.title,
      description: guide.description,
      url: `${SITE_URL}/de/blog/${guide.slug}`,
      type: 'article',
      siteName: 'Working Holiday Tax',
      locale: 'de_DE',
    },
    twitter: {
      images: [`${SITE_URL}${ogForCategory(guide.category)}`],
      card: 'summary_large_image',
      title: guide.title,
      description: guide.description,
    },
    robots: {
      // Don't index untranslated (English-bodied) posts under /de - avoids
      // duplicate content. Still follow links so equity flows to the English original.
      index: isTranslated,
      follow: true,
      googleBot: {
        index: isTranslated,
        follow: true,
        'max-snippet': -1,
        'max-image-preview': 'large',
        'max-video-preview': -1,
      },
    },
  }
}

function getRelatedGuides(current: { slug: string; category: string }, count = 3) {
  const sameCategory = guides.filter(g => g.slug !== current.slug && g.category === current.category)
  const shuffled = [...sameCategory]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  // Get German versions of related guides
  return shuffled.slice(0, count).map(g => {
    const result = getGermanGuide(g.slug)
    return result ? result.guide : g
  })
}

function calcReadTime(body: string) {
  const words = body.trim().split(/\s+/).length
  return Math.max(1, Math.round(words / 200))
}

function calcWordCount(body: string) {
  return body.trim().split(/\s+/).length
}

function extractFAQs(body: string): Array<{ question: string; answer: string }> {
  const sections = body.split(/^## /m).slice(1)
  const faqs: Array<{ question: string; answer: string }> = []

  for (const section of sections) {
    const lines = section.split('\n')
    const heading = lines[0]?.trim() ?? ''
    if (!heading) continue
    if (!/[?]/.test(heading)) continue

    let answer = ''
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim()
      if (!line) {
        if (answer) break
        continue
      }
      if (line.startsWith('##') || line.startsWith('#')) break
      if (line.startsWith('-') || line.startsWith('*')) {
        if (!answer) continue
        break
      }
      answer = answer ? `${answer} ${line}` : line
      if (answer.length > 280) break
    }

    if (!answer) continue

    const cleanedAnswer = answer
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/\*\*([^*]+)\*\*/g, '$1')
      .replace(/\s+/g, ' ')
      .trim()

    faqs.push({ question: heading, answer: cleanedAnswer })
  }

  return faqs.slice(0, 10)
}

function getLeadParagraph(body: string): string {
  const firstParagraph = body.trim().split(/\n\n/)[0] ?? ''
  return firstParagraph
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\s+/g, ' ')
    .trim()
}

// Strip markdown to plain text (for articleBody)
function stripMarkdown(body: string): string {
  return body
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/^[-*]\s+/gm, '')
    .replace(/^\d+\.\s+/gm, '')
    .replace(/\s+/g, ' ')
    .trim()
}

// Extract numbered steps for HowTo schema (only for how-to posts)
function extractHowToSteps(body: string): Array<{ name: string; text: string }> {
  const steps: Array<{ name: string; text: string }> = []
  const lines = body.split('\n')
  for (const line of lines) {
    const m = /^(\d+)\.\s+(.+)$/.exec(line.trim())
    if (m) {
      const text = m[2]
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        .replace(/\*\*([^*]+)\*\*/g, '$1')
        .trim()
      // Use first 60 chars as step name, full text as text
      const name = text.length > 60 ? text.substring(0, 57) + '...' : text
      steps.push({ name, text })
    }
  }
  return steps
}

// Detect if post is a "how-to" by slug
function isHowToPost(slug: string): boolean {
  return slug.startsWith('how-to-') || slug.includes('how-to-')
}

// Detect if post is a Q&A type (starts with question word)
function isQuestionPost(slug: string, title: string): boolean {
  const titleLower = title.toLowerCase()
  return (
    titleLower.startsWith('what ') ||
    titleLower.startsWith('was ') ||
    titleLower.startsWith('when ') ||
    titleLower.startsWith('wann ') ||
    titleLower.startsWith('why ') ||
    titleLower.startsWith('warum ') ||
    titleLower.startsWith('can ') ||
    titleLower.startsWith('kann ') ||
    titleLower.startsWith('kannst ') ||
    titleLower.startsWith('do ') ||
    titleLower.startsWith('does ') ||
    titleLower.startsWith('should ') ||
    titleLower.startsWith('is ') ||
    titleLower.startsWith('are ') ||
    titleLower.startsWith('ist ') ||
    titleLower.startsWith('sind ') ||
    titleLower.startsWith('hast ') ||
    titleLower.startsWith('haben ') ||
    titleLower.startsWith('müssen ') ||
    titleLower.startsWith('musst ') ||
    titleLower.startsWith('brauchst ') ||
    titleLower.endsWith('?')
  )
}

// Extract entity mentions from body for Article schema "mentions" field
// Helps AI engines understand the entities (places, organizations) discussed
function extractMentions(body: string, category: string): Array<{ '@type': string; name: string; sameAs?: string }> {
  const mentions: Array<{ '@type': string; name: string; sameAs?: string }> = []
  const lowerBody = body.toLowerCase()

  // Australian government entities (always relevant)
  const orgEntities = [
    { match: /\bATO\b|Australian Taxation Office|Finanzamt/, name: 'Australian Taxation Office', sameAs: 'https://www.ato.gov.au/' },
    { match: /Fair Work|Fairwork/i, name: 'Fair Work Ombudsman', sameAs: 'https://www.fairwork.gov.au/' },
    { match: /\bABR\b|Australian Business Register/, name: 'Australian Business Register', sameAs: 'https://www.abr.gov.au/' },
    { match: /Services Australia|Medicare/, name: 'Services Australia', sameAs: 'https://www.servicesaustralia.gov.au/' },
    { match: /Department of Home Affairs|Heimatministerium/i, name: 'Department of Home Affairs', sameAs: 'https://www.homeaffairs.gov.au/' },
    { match: /myGov|MyGov/, name: 'myGov', sameAs: 'https://my.gov.au/' },
    { match: /Tax Practitioners Board|TPB/, name: 'Tax Practitioners Board', sameAs: 'https://www.tpb.gov.au/' },
  ]
  for (const ent of orgEntities) {
    if (ent.match.test(body)) {
      mentions.push({ '@type': 'Organization', name: ent.name, sameAs: ent.sameAs })
    }
  }

  // Australian places mentioned
  const placeEntities = [
    { match: /\bSydney\b/, name: 'Sydney', sameAs: 'https://en.wikipedia.org/wiki/Sydney' },
    { match: /\bMelbourne\b/, name: 'Melbourne', sameAs: 'https://en.wikipedia.org/wiki/Melbourne' },
    { match: /\bBrisbane\b/, name: 'Brisbane', sameAs: 'https://en.wikipedia.org/wiki/Brisbane' },
    { match: /\bPerth\b/, name: 'Perth', sameAs: 'https://en.wikipedia.org/wiki/Perth' },
    { match: /\bAdelaide\b/, name: 'Adelaide', sameAs: 'https://en.wikipedia.org/wiki/Adelaide' },
    { match: /\bDarwin\b/, name: 'Darwin', sameAs: 'https://en.wikipedia.org/wiki/Darwin,_Northern_Territory' },
    { match: /\bCairns\b/, name: 'Cairns', sameAs: 'https://en.wikipedia.org/wiki/Cairns' },
    { match: /\bCanberra\b/, name: 'Canberra', sameAs: 'https://en.wikipedia.org/wiki/Canberra' },
    { match: /\bHobart\b/, name: 'Hobart', sameAs: 'https://en.wikipedia.org/wiki/Hobart' },
    { match: /Gold Coast/, name: 'Gold Coast', sameAs: 'https://en.wikipedia.org/wiki/Gold_Coast,_Queensland' },
  ]
  for (const ent of placeEntities) {
    if (ent.match.test(body)) {
      mentions.push({ '@type': 'Place', name: ent.name, sameAs: ent.sameAs })
    }
  }

  // Working Holiday Visa is the canonical topic
  if (/Working Holiday|417|462|WHV/.test(body)) {
    mentions.push({
      '@type': 'Thing',
      name: 'Working Holiday Visa (Australia)',
      sameAs: 'https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/work-holiday-417',
    })
  }

  return mentions
}

// Map slug/category to relevant official citations (ATO, Fair Work, etc.)
function getRelevantCitations(slug: string, category: string): Array<{ name: string; url: string }> {
  const citations: Array<{ name: string; url: string }> = []
  const slugLower = slug.toLowerCase()

  // TFN posts → ATO TFN page
  if (slugLower.includes('tfn')) {
    citations.push({ name: 'ATO - Tax file number (TFN)', url: 'https://www.ato.gov.au/individuals/tax-file-number/' })
  }
  // ABN posts → ABR
  if (slugLower.includes('abn')) {
    citations.push({ name: 'Australian Business Register (ABR)', url: 'https://www.abr.gov.au/' })
  }
  // Tax return / lodge / refund → ATO lodging
  if (slugLower.includes('tax-return') || slugLower.includes('lodge') || slugLower.includes('refund') || category === 'Tax Return') {
    citations.push({ name: 'ATO - Lodging your tax return', url: 'https://www.ato.gov.au/individuals/lodging-your-tax-return/' })
  }
  // Super / DASP
  if (slugLower.includes('super') || slugLower.includes('dasp') || category === 'Super') {
    citations.push({ name: 'ATO - Departing Australia superannuation payment (DASP)', url: 'https://www.ato.gov.au/individuals/super/withdrawing-and-using-your-super/departing-australia-superannuation-payment-dasp/' })
  }
  // Medicare
  if (slugLower.includes('medicare')) {
    citations.push({ name: 'Services Australia - Medicare', url: 'https://www.servicesaustralia.gov.au/medicare' })
  }
  // Work rights / Fair Work
  if (slugLower.includes('award') || slugLower.includes('minimum-wage') || slugLower.includes('fair-work') ||
      slugLower.includes('penalty-rate') || slugLower.includes('casual') || slugLower.includes('unpaid') ||
      slugLower.includes('wage') || category === 'Work Rights') {
    citations.push({ name: 'Fair Work Ombudsman', url: 'https://www.fairwork.gov.au/' })
  }
  // Backpacker tax rate
  if (slugLower.includes('backpacker-tax') || slugLower.includes('working-holiday-tax')) {
    citations.push({ name: 'ATO - Working holiday makers', url: 'https://www.ato.gov.au/individuals/coming-to-australia-or-going-overseas/in-detail/coming-to-australia/working-holiday-makers/' })
  }

  return citations
}

export default function GermanGuidePage({ params }: Props) {
  const result = getGermanGuide(params.slug)
  if (!result) notFound()
  const { guide, isTranslated } = result

  // Look up German category meta by category name → find slug
  const categoryInfo = deCategoryMeta.find(c => c.category === guide.category)
  const categoryColors = getCategoryColor(guide.category)
  const relatedGuides = getRelatedGuides(guide)
  const readTime = calcReadTime(guide.body)
  const wordCount = calcWordCount(guide.body)
  const faqs = extractFAQs(guide.body)
  const leadParagraph = getLeadParagraph(guide.body)
  const fullBody = stripMarkdown(guide.body)
  const howToSteps = isTranslated && isHowToPost(guide.slug) ? extractHowToSteps(guide.body) : []
  const citations = getRelevantCitations(guide.slug, guide.category)
  const mentions = extractMentions(guide.body, guide.category)

  // Set inLanguage based on whether body is German or still English
  const articleLang = isTranslated ? 'de' : 'en-AU'

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title,
    name: guide.title,
    description: guide.description,
    abstract: leadParagraph,
    articleSection: guide.category,
    articleBody: fullBody,
    wordCount,
    timeRequired: `PT${readTime}M`,
    inLanguage: articleLang,
    datePublished: guide.date,
    dateModified: guide.date,
    author: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#business`,
      name: 'Working Holiday Tax',
      url: `${SITE_URL}`,
      description: 'Service unter Aufsicht eines registrierten australischen Steueragenten, spezialisiert auf Working Holiday Maker (Visumklassen 417 und 462).',
      knowsAbout: [
        'Australisches Steuerrecht',
        'Working Holiday Visum (Subclass 417, 462)',
        'Tax File Number (TFN)',
        'Australian Business Number (ABN)',
        'Superannuation und DASP',
        'Medicare Levy',
        'Fair Work Australia',
      ],
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#business`,
      name: 'Working Holiday Tax',
      url: `${SITE_URL}`,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/icon-512.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/de/blog/${guide.slug}` },
    audience: { '@type': 'Audience', name: 'Working Holiday Visuminhaber in Australien (Subclass 417 und 462)' },
    about: [
      { '@type': 'Thing', name: 'Working Holiday Visum Australien' },
      { '@type': 'Thing', name: guide.category },
    ],
    ...(mentions.length > 0 && { mentions }),
    keywords: [
      'Working Holiday Tax',
      'Australien',
      '417 Visum',
      '462 Visum',
      guide.category,
      'Backpacker Steuer',
    ].join(', '),
    ...(citations.length > 0 && {
      citation: citations.map(c => ({
        '@type': 'CreativeWork',
        name: c.name,
        url: c.url,
      })),
      isBasedOn: citations.map(c => c.url),
    }),
    speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.guide-lead'] },
  }

  // HowTo schema - for "how to" posts with numbered steps
  const howToLd = (howToSteps.length >= 2 && isTranslated) ? {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: guide.title,
    description: guide.description,
    inLanguage: 'de',
    totalTime: `PT${readTime}M`,
    step: howToSteps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
      url: `${SITE_URL}/de/blog/${guide.slug}#step-${i + 1}`,
    })),
  } : null

  // QAPage schema - for "What/How/Why/Can/Is..." question posts
  const qaPageLd = (isTranslated && isQuestionPost(guide.slug, guide.title) && !howToLd) ? {
    '@context': 'https://schema.org',
    '@type': 'QAPage',
    inLanguage: 'de',
    mainEntity: {
      '@type': 'Question',
      name: guide.title,
      text: guide.title,
      answerCount: 1,
      acceptedAnswer: {
        '@type': 'Answer',
        text: leadParagraph,
        inLanguage: 'de',
        author: { '@type': 'Organization', name: 'Working Holiday Tax' },
        upvoteCount: 1,
        url: `${SITE_URL}/de/blog/${guide.slug}`,
      },
    },
  } : null

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Startseite', item: `${SITE_URL}/de` },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/de/blog` },
      ...(categoryInfo
        ? [{ '@type': 'ListItem', position: 3, name: categoryInfo.category, item: `${SITE_URL}/de/blog/category/${categoryInfo.slug}` }]
        : []),
      { '@type': 'ListItem', position: categoryInfo ? 4 : 3, name: guide.title, item: `${SITE_URL}/de/blog/${guide.slug}` },
    ],
  }

  const faqLd = (faqs.length > 0 && isTranslated) ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: 'de',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  } : null

  const webPageLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}/de/blog/${guide.slug}`,
    url: `${SITE_URL}/de/blog/${guide.slug}`,
    name: guide.title,
    description: guide.description,
    inLanguage: articleLang,
    isPartOf: { '@type': 'WebSite', name: 'Working Holiday Tax', url: `${SITE_URL}` },
    primaryImageOfPage: { '@type': 'ImageObject', url: `${SITE_URL}${ogForCategory(guide.category)}` },
    speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.guide-lead'] },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      {faqLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      )}
      {howToLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }} />
      )}
      {qaPageLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(qaPageLd) }} />
      )}
      <main style={{ paddingTop: '68px', background: '#fff', minHeight: '100vh' }}>

        {categoryInfo && (
          <StickyBreadcrumbs
            category={categoryInfo.category}
            categorySlug={`/de/blog/category/${categoryInfo.slug}`}
            title={guide.title}
          />
        )}

        <div style={{ background: categoryColors.bg }}>
          <div style={{ padding: '12px 0' }}>
            <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px', display: 'flex', gap: '6px', alignItems: 'center', fontSize: '12px', color: 'rgba(10,15,13,0.45)', flexWrap: 'wrap' }}>
              <Link href="/de" style={{ color: '#587066', textDecoration: 'none' }}>Startseite</Link>
              <span>/</span>
              <Link href="/de/blog" style={{ color: '#587066', textDecoration: 'none' }}>Blog</Link>
              <span>/</span>
              {categoryInfo && (
                <>
                  <Link href={`/de/blog/category/${categoryInfo.slug}`} style={{ color: '#587066', textDecoration: 'none' }}>
                    {catLabelDe(categoryInfo.category)}
                  </Link>
                  <span>/</span>
                </>
              )}
              <span style={{ color: '#8AADA3', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '50%' }}>{guide.title}</span>
            </div>
          </div>

          <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '1.5rem 20px 3rem' }}>
            <div className="article-hero-layout">
              <div className="article-hero-content">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem', flexWrap: 'wrap' }}>
                  {categoryInfo && (
                    <>
                      <Link
                        href={`/de/blog/category/${categoryInfo.slug}`}
                        style={{
                          fontSize: '11px',
                          padding: '4px 12px',
                          borderRadius: '100px',
                          background: '#fff',
                          color: categoryColors.text,
                          fontWeight: 600,
                          textDecoration: 'none',
                          letterSpacing: '0.02em',
                          border: `1px solid ${categoryColors.border}`,
                        }}
                      >
                        {catLabelDe(guide.category)}
                      </Link>
                      <span style={{ color: 'rgba(0,0,0,0.15)' }}>·</span>
                    </>
                  )}
                  <span style={{ fontSize: '12px', color: 'rgba(10,15,13,0.55)' }}>Zuletzt aktualisiert: {guide.date}</span>
                  <span style={{ color: 'rgba(0,0,0,0.15)' }}>·</span>
                  <span style={{ fontSize: '12px', color: 'rgba(10,15,13,0.55)' }}>{readTime} Min. Lesezeit</span>
                </div>

                <h1
                  className="font-serif font-black"
                  style={{ fontSize: 'clamp(28px, 4.5vw, 42px)', lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: '1rem', color: '#080F0D' }}
                >
                  {guide.title}
                </h1>

                <p className="guide-lead" style={{ fontSize: 'clamp(16px, 1.5vw, 18px)', color: 'rgba(10,15,13,0.7)', lineHeight: 1.6, marginBottom: '0', fontWeight: 300 }}>
                  {guide.description}
                </p>
              </div>

              <div className="article-hero-image">
                <CategoryHero category={guide.category} title={guide.title} />
              </div>
            </div>
          </div>
        </div>

        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px' }}>

          {/* Translation notice - shown only when post body is still in English */}
          {!isTranslated && (
            <div style={{
              marginTop: '2rem',
              padding: '14px 18px',
              background: '#FFF8E7',
              border: '1px solid #FCD980',
              borderRadius: '12px',
              display: 'flex',
              gap: '10px',
              alignItems: 'flex-start',
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: '2px' }}>
                <circle cx="12" cy="12" r="9" stroke="#C47E10" strokeWidth="1.6"/>
                <path d="M12 7v6M12 16h.01" stroke="#C47E10" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
              <p style={{ fontSize: '13px', color: '#7A4A00', lineHeight: 1.6, margin: 0 }}>
                {blogUI.englishOnlyNotice}
              </p>
            </div>
          )}

          <article style={{ padding: '2rem 0 3rem 0' }} itemScope itemType="https://schema.org/Article">
            <meta itemProp="headline" content={guide.title} />
            <meta itemProp="datePublished" content={guide.date} />
            <meta itemProp="author" content="Working Holiday Tax" />
            <GuideArticle guide={guide} locale="de" />
          </article>

          <p style={{ fontSize: '12.5px', color: '#8AADA3', fontWeight: 500, maxWidth: '780px', margin: '0 0 2rem 0' }}>
            Written by Working Holiday Tax
          </p>

          {relatedGuides.length > 0 && (
            <div style={{ borderTop: '1px solid #E2EFE9', paddingTop: '2.5rem', paddingBottom: '3rem', maxWidth: '780px' }}>
              <p style={{ fontSize: '11px', fontWeight: 600, color: '#2FA880', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
                Auch lesenswert
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {relatedGuides.map(g => {
                  const gColors = getCategoryColor(g.category)
                  return (
                    <Link key={g.slug} href={`/de/blog/${g.slug}`} style={{ textDecoration: 'none' }} className="related-link">
                      <div style={{ border: '1px solid #E2EFE9', borderRadius: '12px', padding: '1.1rem 1.4rem', transition: 'border-color 0.2s ease, transform 0.2s ease' }} className="related-card">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                          <span style={{
                            fontSize: '10px',
                            padding: '2px 8px',
                            borderRadius: '100px',
                            background: gColors.bg,
                            color: gColors.text,
                            fontWeight: 600,
                            letterSpacing: '0.02em',
                            border: `1px solid ${gColors.border}`,
                          }}>
                            {catLabelDe(g.category)}
                          </span>
                          <span style={{ fontSize: '11px', color: '#8AADA3' }}>{g.readTime} Min. Lesezeit</span>
                        </div>
                        <p style={{ fontSize: '14.5px', fontWeight: 600, color: '#0B5240', marginBottom: '6px', lineHeight: 1.3 }}>
                          {g.title}
                        </p>
                        <p style={{ fontSize: '12.5px', color: '#587066', lineHeight: 1.6, margin: 0, fontWeight: 300 }}>
                          {g.description}
                        </p>
                      </div>
                    </Link>
                  )
                })}
              </div>

              {categoryInfo && (
                <div style={{ marginTop: '24px' }}>
                  <Link
                    href={`/de/blog/category/${categoryInfo.slug}`}
                    style={{ fontSize: '13px', color: '#0B5240', fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                  >
                    Alle {catLabelDe(categoryInfo.category)}-Artikel ansehen →
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>

      </main>
    </>
  )
}
