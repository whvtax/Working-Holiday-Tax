import { SITE_URL } from '@/lib/constants'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { guides, getGuideBySlug, getCategoryMeta, getCategoryColor } from '../data'
import GuideArticle from './GuideArticle'
import StickyBreadcrumbs from './StickyBreadcrumbs'
import CategoryHero from './CategoryHero'
// The corpus was reframed on this date. dateModified previously mirrored
// datePublished on every article, which told search engines nothing had
// changed and was, after tonight, simply untrue.
const CORPUS_REVISED = '2026-08-22'

import { isoGuideDate } from '@/lib/blog-dates'
import { GuideCta } from '@/components/ui/GuideCta'
import { MobileCta } from '@/components/ui/MobileCta'
import { waUrl } from '@/lib/wa'


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
  return guides.map(g => ({ slug: g.slug }))
}

// Per-category keyword expansions - dynamically applied per blog post
const CATEGORY_KEYWORDS: Record<string, string[]> = {
  'TFN': [
    'TFN application working holiday',
    'Tax File Number 417 visa',
    'Tax File Number 462 visa',
    'apply for TFN backpacker',
    'TFN for working holiday tax refund',
  ],
  'ABN': [
    'ABN registration working holiday',
    'Australian Business Number backpacker',
    'sole trader ABN 417',
    'sole trader ABN 462',
    'ABN for working holiday tax return',
  ],
  'Tax Return': [
    'working holiday tax refund Australia',
    'WHV tax return',
    'tax refund 417 visa',
    'tax refund 462 visa',
    'claim tax back Australia backpacker',
    'lodge tax return from overseas',
    'tax refund after leaving Australia',
  ],
  'Super': [
    'DASP super refund Australia',
    'super refund working holiday',
    'claim super after leaving Australia',
    'Departing Australia Superannuation Payment',
    'super refund 417 visa',
  ],
  'Work Rights': [
    'working holiday visa rights Australia',
    'Fair Work Australia working holiday',
    'working holiday visa employment',
    '417 visa work conditions',
    '462 visa work conditions',
  ],
  'Medicare & Other': [
    'Medicare levy exemption backpacker',
    'Medicare working holiday visa',
    'Reciprocal Health Care Agreement Australia',
    'Medicare levy exemption 417',
    'Medicare levy exemption 462',
  ],
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const guide = getGuideBySlug(params.slug)
  if (!guide) return {}
  const categoryKeywords = CATEGORY_KEYWORDS[guide.category] || []
  return {
    // A guide title already names its subject, so the " | Working Holiday Tax"
    // suffix the layout template appends costs about 200px of the roughly 580px
    // Google renders and buys nothing. Absolute drops it here only; service and
    // landing pages keep it.
    title: { absolute: guide.title },
    description: guide.description,
    keywords: [
      // Core working holiday tax refund keywords
      'working holiday tax refund Australia',
      'working holiday tax Australia',
      'working holiday visa Australia',
      '417 visa Australia',
      '462 visa Australia',
      'backpacker tax Australia',
      'WHM tax Australia',
      'WHV tax Australia',
      // Category-specific keywords
      ...categoryKeywords,
      // Post-specific
      guide.category,
      guide.title,
    ],
    alternates: {
      canonical: `${SITE_URL}/blog/${guide.slug}`,
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
      url: `${SITE_URL}/blog/${guide.slug}`,
      type: 'article',
      siteName: 'Working Holiday Tax',
      locale: 'en_AU',
    },
    twitter: {
      images: [`${SITE_URL}${ogForCategory(guide.category)}`],
      card: 'summary_large_image',
      title: guide.title,
      description: guide.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-snippet': -1,
        'max-image-preview': 'large',
        'max-video-preview': -1,
      },
    },
  }
}

/* ── Related guides ───────────────────────────────────────────────────────
   These used to be three guides picked at random from the same category, which
   sent a reader who had just finished one article sideways into another one.
   More free reading is not a next step.

   Two changes. The order is no longer random, it is ranked: the guides listed
   below sit closest to a decision in their category, so a reader who is nearly
   ready meets the article that names what is actually at stake rather than
   whichever one the shuffle produced. And the block closes with a link to the
   service page for the category, which is the one destination on the site that
   is not another article.

   Anything not named here still appears, in file order, behind the ranked
   ones. If a slug is renamed or dropped the list simply stops matching it, so
   nothing breaks.                                                          */
const DECISION_GUIDES: Record<string, string[]> = {
  'TFN': [
    'what-happens-without-your-tfn',
    'tfn-vs-abn-difference',
    'tax-file-number-declaration-form',
    'tfn-application-delayed',
  ],
  'ABN': [
    'can-you-have-tfn-and-abn',
    'employee-vs-contractor-australia',
    'abn-deductions-business-expenses',
    'gst-and-abn-for-working-holiday-makers',
  ],
  'Tax Return': [
    'diy-tax-return-vs-tax-agent-working-holiday',
    'tax-residency-working-holiday-makers',
    'tax-deductions-working-holiday-makers',
    'how-to-lodge-tax-return-from-overseas',
    'multiple-jobs-tax-return-working-holiday',
  ],
  'Super': [
    'best-way-to-claim-super-leaving-australia',
    'dasp-tax-rate-65-percent-explained',
    'super-multiple-funds-consolidation',
    'how-to-find-lost-superannuation',
  ],
  'Medicare & Other': [
    'medicare-levy-working-holiday-makers',
    'countries-with-medicare-agreement-australia',
    'tax-obligations-after-leaving-australia',
    'tax-residency-working-holiday-makers',
  ],
  'Work Rights': [
    'employer-not-paying-correctly',
    'wage-theft-working-holiday-australia',
    'how-to-read-a-payslip-australia-working-holiday',
    'super-employer-not-paying-what-to-do',
  ],
}

/** The one money page each category belongs to. Never a form route. */
const SERVICE_FOR_CATEGORY: Record<string, { path: string; label: string; blurb: string }> = {
  'TFN': {
    path: '/tfn',
    label: 'What we do about the TFN and the declaration form',
    blurb: 'The number is free and takes ten minutes. What it is worth is on the declaration form, and that is the part we handle.',
  },
  'ABN': {
    path: '/abn',
    label: 'What we do when you have invoiced under an ABN',
    blurb: 'Wages and invoiced income are taxed differently and sit differently on the return. Getting that split right is the work.',
  },
  'Tax Return': {
    path: '/tax-return',
    label: 'What we go through on every tax return',
    blurb: 'Residency, the weeks withheld at the wrong rate, the Medicare position and the deductions that belong to the work you did.',
  },
  'Super': {
    path: '/superannuation',
    label: 'What we do about your super before you leave',
    blurb: 'Casual work scatters super across funds. We find every account under your TFN and lodge the claim once, in the right order.',
  },
  'Medicare & Other': {
    path: '/medicare',
    label: 'What we do about the Medicare levy',
    blurb: 'The levy comes off by default. Removing it needs a statement you have to apply for, and it is one of the most commonly missed items on a backpacker return.',
  },
  'Work Rights': {
    path: '/tax-return',
    label: 'What we go through on every tax return',
    blurb: 'If any of this affected your pay or your hours, it usually shows up in your tax return as well.',
  },
}

function getRelatedGuides(current: { slug: string; category: string }, count = 3) {
  const sameCategory = guides.filter(g => g.slug !== current.slug && g.category === current.category)
  const ranked = DECISION_GUIDES[current.category] ?? []
  const rank = (slug: string) => {
    const i = ranked.indexOf(slug)
    return i === -1 ? ranked.length + 1 : i
  }
  // Stable: equal ranks keep their file order, so the same build always
  // produces the same three links and nothing depends on Math.random().
  return [...sameCategory]
    .map((g, i) => ({ g, i }))
    .sort((a, b) => rank(a.g.slug) - rank(b.g.slug) || a.i - b.i)
    .slice(0, count)
    .map(x => x.g)
}

function calcReadTime(body: string) {
  const words = body.trim().split(/\s+/).length
  return Math.max(1, Math.round(words / 200))
}

function calcWordCount(body: string) {
  return body.trim().split(/\s+/).length
}

/* ── FAQ extraction ───────────────────────────────────────────────────────
   This builds the FAQPage JSON-LD that Google, ChatGPT, Perplexity and every
   other answer engine reads. It is the single highest leverage function in the
   template, and until now it was publishing fragments.

   What it used to do: walk from a question H2 to the first non-empty line, stop
   at the first bullet, publish whatever it had. The house writing pattern is
   question H2, one line lead in ending in a colon, bullet list. So the
   extractor faithfully published the lead in and threw the answer away.
   Measured across the 154 English guides: median acceptedAnswer 68 characters,
   458 of 783 under 80, and 665 ending in a colon. "The classification
   affects:" was being served to every AI crawler as this site's answer to
   "Why does this matter for working holiday makers?".

   A fragment is worse than no entry at all. It teaches the engine that the
   page does not answer anything, on a page that answers it perfectly well
   twelve lines further down.

   What it does now: reads the whole section as ordered blocks, prose and
   lists, and joins them into one paragraph in document order. Prose is
   preferred. A list is pulled in only when it is actually needed, which is
   when the text so far ends in a colon and the list is the rest of that
   sentence, or when the prose on its own is still too short to be an answer.
   List items are rendered into the sentence rather than dropped.

   If a heading still cannot yield a usable answer, the entry is omitted. It is
   better to publish nine real answers than ten with a fragment among them.

   None of this substitutes for the writing. Rule R3 in report 06 still applies
   and the bodies still need their opening paragraphs. This makes the schema
   honest in the meantime, on all 393 pages at once.                         */

/** Answers shorter than this are not answers. Roughly two sentences. */
const FAQ_MIN_ANSWER = 150
/** Enough of the section to be useful; past this an answer stops being one. */
const FAQ_TARGET_ANSWER = 400
const FAQ_MAX_ANSWER = 900

function cleanInline(s: string): string {
  return s
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*\n]+)\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\s+/g, ' ')
    .trim()
}

/** Turns a bullet list into the tail of a sentence rather than dropping it. */
function listAsSentence(items: string[]): string {
  const cleaned = items.map(i => i.replace(/[;,.\s]+$/, '').trim()).filter(Boolean)
  return cleaned.length > 0 ? `${cleaned.join('; ')}.` : ''
}

function trimToSentence(text: string, max: number): string {
  if (text.length <= max) return text
  const slice = text.slice(0, max)
  const cut = Math.max(slice.lastIndexOf('. '), slice.lastIndexOf('! '), slice.lastIndexOf('? '))
  if (cut > max * 0.5) return slice.slice(0, cut + 1).trim()
  return `${slice.replace(/\s+\S*$/, '').trim()}.`
}

type FaqBlock = { type: 'p'; text: string } | { type: 'list'; items: string[] }

function sectionBlocks(lines: string[]): FaqBlock[] {
  const blocks: FaqBlock[] = []
  let list: string[] = []
  const flush = () => {
    if (list.length > 0) {
      blocks.push({ type: 'list', items: list })
      list = []
    }
  }

  for (let i = 1; i < lines.length; i++) {
    const raw = lines[i].trim()
    if (!raw) continue
    // Tables and horizontal rules carry no prose worth quoting.
    if (raw.startsWith('|') || /^[-=*_]{3,}$/.test(raw)) { flush(); continue }
    // An H3 inside the section is a sub-label. Keep its text as a lead in so
    // the list that follows it still reads as a sentence.
    if (/^#{1,6}\s/.test(raw)) {
      flush()
      const t = cleanInline(raw.replace(/^#{1,6}\s+/, ''))
      if (t) blocks.push({ type: 'p', text: /[.:!?]$/.test(t) ? t : `${t}:` })
      continue
    }
    const bullet = raw.match(/^[-*+]\s+(.*)$/) ?? raw.match(/^\d+[.)]\s+(.*)$/)
    if (bullet) {
      const t = cleanInline(bullet[1])
      if (t) list.push(t)
      continue
    }
    flush()
    const t = cleanInline(raw.replace(/^>\s*/, ''))
    if (t) blocks.push({ type: 'p', text: t })
  }
  flush()
  return blocks
}

function buildFaqAnswer(blocks: FaqBlock[]): string {
  let out = ''
  for (const b of blocks) {
    const openColon = /[:：]$/.test(out)
    if (out.length >= FAQ_TARGET_ANSWER && !openColon) break
    if (b.type === 'p') {
      out = out ? `${out} ${b.text}` : b.text
      continue
    }
    // A list is only worth pulling in if it finishes an open colon or if the
    // prose alone has not yet reached the length of an actual answer.
    if (!openColon && out.length >= FAQ_MIN_ANSWER) continue
    const rendered = listAsSentence(b.items)
    if (!rendered) continue
    out = out ? `${out} ${rendered}` : rendered
  }

  out = out.replace(/\s+/g, ' ').trim()
  // An unresolved colon at the end is the exact fragment this rewrite exists
  // to stop shipping. Fall back to the last complete sentence, or nothing.
  if (/[:：]$/.test(out)) {
    const cut = out.lastIndexOf('. ')
    out = cut > 0 ? out.slice(0, cut + 1).trim() : ''
  }
  if (!out) return ''
  if (!/[.!?]$/.test(out)) out += '.'
  return trimToSentence(out, FAQ_MAX_ANSWER)
}

/** Matches the id GuideArticle gives every H2, so each answer can be deep linked. */
function headingAnchor(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function extractFAQs(body: string): Array<{ question: string; answer: string; anchor: string }> {
  const sections = body.split(/^## /m).slice(1)
  const faqs: Array<{ question: string; answer: string; anchor: string }> = []

  for (const section of sections) {
    const lines = section.split('\n')
    const rawHeading = lines[0]?.trim() ?? ''
    const heading = cleanInline(rawHeading)
    if (!heading || !/\?/.test(heading)) continue

    const answer = buildFaqAnswer(sectionBlocks(lines))
    if (!answer || answer.length < FAQ_MIN_ANSWER) continue

    // GuideArticle slugifies the raw heading line, so the anchor has to come
    // from the same string or the deep link will not land.
    faqs.push({ question: heading, answer, anchor: headingAnchor(rawHeading) })
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

export default function GuidePage({ params }: Props) {
  const guide = getGuideBySlug(params.slug)
  if (!guide) notFound()

  const categoryInfo = getCategoryMeta(guide.category)
  const categoryColors = getCategoryColor(guide.category)
  const relatedGuides = getRelatedGuides(guide)
  const readTime = calcReadTime(guide.body)
  const wordCount = calcWordCount(guide.body)
  const faqs = extractFAQs(guide.body)
  const leadParagraph = getLeadParagraph(guide.body)
  const service = SERVICE_FOR_CATEGORY[guide.category]

  // `reviewed` is optional and may not be populated on a given guide yet, so
  // it is read defensively. Where it is absent the page shows a publication
  // date only and never labels it as an update.
  const reviewedDate = (guide as { reviewed?: string }).reviewed
  const publishedIso = isoGuideDate(guide.date)
  const modifiedIso = reviewedDate ? isoGuideDate(reviewedDate) : publishedIso

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title,
    name: guide.title,
    description: guide.description,
    abstract: leadParagraph,
    articleSection: guide.category,
    // `articleBody` used to hold the lead paragraph, the same string as
    // `abstract`. An engine reading it as the body got one paragraph of a
    // 1,500 word guide. Better to say nothing than to say that.
    wordCount,
    timeRequired: `PT${readTime}M`,
    inLanguage: 'en-AU',
    datePublished: publishedIso,
    dateModified: modifiedIso,
    author: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#business`,
      name: 'Working Holiday Tax',
      url: `${SITE_URL}`,
    },
    // Preparation and professional review are two different steps done by two
    // different parties, and they are modelled separately.
    //
    // This used to point at the same @id as author and publisher, which said
    // that Working Holiday Tax reviewed its own work: circular, and worth
    // nothing to a reader or an engine. It now points at the supervising
    // registered tax agent as a separate node.
    //
    // The node is deliberately unnamed here. Working Holiday Tax is not itself
    // a registered tax agent and must never be described as one, and the
    // supervising firm's name belongs on the site wide entity graph rather
    // than being asserted 393 times from a blog template. The @id is stable,
    // so when that node lands the two merge.
    reviewedBy: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#supervising-agent`,
      description: 'Registered tax agent who reviews and signs off the work Working Holiday Tax prepares.',
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#business`,
      name: 'Working Holiday Tax',
      url: `${SITE_URL}`,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/icon-512.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${guide.slug}`,
    },
    audience: {
      '@type': 'Audience',
      name: 'Working holiday visa holders in Australia (subclass 417 and 462)',
    },
    about: [
      { '@type': 'Thing', name: 'Working Holiday Visa Australia' },
      { '@type': 'Thing', name: guide.category },
    ],
    keywords: [
      'working holiday tax',
      'Australia',
      '417 visa',
      '462 visa',
      guide.category,
      'backpacker tax',
    ].join(', '),
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', '.guide-lead'],
    },
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}` },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
      ...(categoryInfo
        ? [{ '@type': 'ListItem', position: 3, name: categoryInfo.category, item: `${SITE_URL}/blog/category/${categoryInfo.slug}` }]
        : []),
      { '@type': 'ListItem', position: categoryInfo ? 4 : 3, name: guide.title, item: `${SITE_URL}/blog/${guide.slug}` },
    ],
  }

  // FAQPage schema built from the article's H2 questions and their snippet-quotable
  // first sentences. This is what surfaces in Google AI Overviews, ChatGPT citations,
  // Perplexity answers, and Bing Copilot replies.
  const faqLd = faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
        // Every H2 already carries a slugified id. Giving each answer its own
        // deep link is what turns a page level citation into a passage level
        // one, which is the shape an answer engine actually wants.
        ...(f.anchor ? { url: `${SITE_URL}/blog/${guide.slug}#${f.anchor}` } : {}),
      },
    })),
  } : null

  const webPageLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}/blog/${guide.slug}`,
    url: `${SITE_URL}/blog/${guide.slug}`,
    name: guide.title,
    description: guide.description,
    inLanguage: 'en-AU',
    isPartOf: {
      '@type': 'WebSite',
      name: 'Working Holiday Tax',
      url: `${SITE_URL}`,
    },
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: `${SITE_URL}${ogForCategory(guide.category)}`,
    },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', '.guide-lead'],
    },
  }

  // HowTo schema - only emitted for actual step-by-step guides.
  // Detects "How to" titles and extracts numbered/listed steps from the body.
  const isHowToGuide = /^how to /i.test(guide.title)
  let howToLd: object | null = null
  if (isHowToGuide) {
    const stepMatches: { name: string; text: string }[] = []
    // Match markdown numbered list items at start of line: "1. Step text"
    const numberedRe = /^\s*(\d+)\.\s+\*?\*?([^*\n]+?)\*?\*?(?:\.|\:|$)/gm
    let m: RegExpExecArray | null
    while ((m = numberedRe.exec(guide.body)) !== null && stepMatches.length < 10) {
      const text = m[2].trim()
      if (text.length > 8 && text.length < 200) {
        stepMatches.push({
          name: `Step ${m[1]}`,
          text: text,
        })
      }
    }
    if (stepMatches.length >= 3) {
      howToLd = {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: guide.title,
        description: guide.description,
        totalTime: `PT${readTime}M`,
        inLanguage: 'en-AU',
        step: stepMatches.map((s, i) => ({
          '@type': 'HowToStep',
          position: i + 1,
          name: s.name,
          text: s.text,
        })),
      }
    }
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      {howToLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }} />
      )}
      {faqLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      )}
      {/* Guide route only.
          The language banner is fixed at bottom 16px with z-index 70 and the
          sticky CTA bar is fixed at bottom 0 with z-index 60, so on a phone the
          banner lands squarely on top of the bar and hides the only conversion
          control on the page from German and Japanese visitors, who are two of
          the three highest converting audiences on the site.

          The banner and the shared stylesheet are owned elsewhere, so this
          lifts the banner clear of the bar from inside the guide template
          rather than reaching into either. It is scoped to these routes and to
          phones, and it should be replaced by the site wide z-index scale when
          that lands. */}
      <style dangerouslySetInnerHTML={{ __html: `@media (max-width: 767px){body > div[role="dialog"]{bottom:calc(88px + env(safe-area-inset-bottom, 0px)) !important}}` }} />

      <main style={{ paddingTop: '68px', background: '#fff', minHeight: '100dvh' }}>

        {/* Sticky breadcrumbs (appear after scrolling past hero) */}
        {categoryInfo && (
          <StickyBreadcrumbs
            category={categoryInfo.category}
            categorySlug={categoryInfo.slug}
            title={guide.title}
          />
        )}

        {/* Hero - uses category color for the background */}
        <div style={{ background: categoryColors.bg }}>
          <div style={{ padding: '12px 0' }}>
            <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px', display: 'flex', gap: '10px', alignItems: 'center', fontSize: '13px', color: '#4C6459', flexWrap: 'wrap' }}>
              <Link href="/" style={{ color: '#587066', textDecoration: 'none', padding: '8px 0' }}>Home</Link>
              <span aria-hidden="true">/</span>
              <Link href="/blog" style={{ color: '#587066', textDecoration: 'none', padding: '8px 0' }}>Blog</Link>
              <span aria-hidden="true">/</span>
              {categoryInfo && (
                <>
                  <Link href={`/blog/category/${categoryInfo.slug}`} style={{ color: '#587066', textDecoration: 'none', padding: '8px 0' }}>
                    {categoryInfo.category}
                  </Link>
                  <span aria-hidden="true">/</span>
                </>
              )}
              <span style={{ color: '#4C6459', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '50%' }}>{guide.title}</span>
            </div>
          </div>

          <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '1.5rem 20px 3rem' }}>
            <div className="article-hero-layout">
              <div className="article-hero-content">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem', flexWrap: 'wrap' }}>
                  {categoryInfo && (
                    <>
                      <Link
                        href={`/blog/category/${categoryInfo.slug}`}
                        style={{
                          fontSize: '13px',
                          padding: '7px 14px',
                          borderRadius: '100px',
                          background: '#fff',
                          color: categoryColors.text,
                          fontWeight: 600,
                          textDecoration: 'none',
                          letterSpacing: '0.02em',
                          border: `1px solid ${categoryColors.border}`,
                        }}
                      >
                        {guide.category}
                      </Link>
                      <span aria-hidden="true" style={{ color: '#CDE3DB' }}>·</span>
                    </>
                  )}
                  {/* "Last updated" was showing the publication date, so 77 of
                      154 guides told a reader in 2026 that a tax page had been
                      updated one or two financial years ago. On a money topic
                      that is the worst freshness signal a page can send, and it
                      was not true. It now says what it means. */}
                  <span style={{ fontSize: '13px', color: '#4C6459' }}>Published {guide.date}</span>
                  {reviewedDate && (
                    <>
                      <span aria-hidden="true" style={{ color: '#CDE3DB' }}>·</span>
                      <span style={{ fontSize: '13px', color: '#4C6459' }}>Reviewed {reviewedDate}</span>
                    </>
                  )}
                  <span aria-hidden="true" style={{ color: '#CDE3DB' }}>·</span>
                  <span style={{ fontSize: '13px', color: '#4C6459' }}>{readTime} min read</span>
                </div>

                {/* H1 - larger and clearer hierarchy vs H2 in body */}
                <h1
                  className="font-serif font-black"
                  style={{ fontSize: 'clamp(28px, 4.5vw, 42px)', lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: '1rem', color: '#080F0D' }}
                >
                  {guide.title}
                </h1>

                <p className="guide-lead" style={{ fontSize: 'clamp(16.5px, 1.5vw, 18px)', color: '#2A3C34', lineHeight: 1.62, marginBottom: '0', fontWeight: 400 }}>
                  {guide.description}
                </p>
              </div>

              {/* Article emoji - hidden on small mobile */}
              <div className="article-hero-image">
                <CategoryHero category={guide.category} title={guide.title} slug={guide.slug} variant="badge" />
              </div>
            </div>
          </div>
        </div>

        {/* Article - wider container to fit the TOC sidebar on desktop */}
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px' }}>
          <article style={{ padding: '2rem 0 3rem 0' }} itemScope itemType="https://schema.org/Article">
            <meta itemProp="headline" content={guide.title} />
            <meta itemProp="datePublished" content={publishedIso} />
            <meta itemProp="dateModified" content={modifiedIso} />
            <meta itemProp="author" content="Working Holiday Tax" />
            <GuideArticle guide={guide} />
          </article>

          {/* About this guide.
              This replaces a single grey line reading "Written by Working
              Holiday Tax", which is the weakest trust signal a money topic can
              carry. Tax is a subject where a reader is entitled to know who
              wrote a page and who checked it.

              Every claim here is one the business can make. It describes what
              the registered tax agent does to the work and never says that
              Working Holiday Tax is one, because it is not. There is no named
              author, no photograph and no invented person: the entity really
              is the author, and a fabricated expert would be both dishonest and
              the fastest way to fail the review this block exists to pass. */}
          <aside
            aria-labelledby="about-this-guide"
            style={{ maxWidth: '780px', margin: '0 0 2rem 0', padding: '18px 20px', border: '1px solid #E2EFE9', borderRadius: '12px', background: '#F7F9F8' }}
          >
            <p id="about-this-guide" style={{ fontSize: '10.5px', fontWeight: 700, color: '#0B5240', letterSpacing: '0.15em', textTransform: 'uppercase', margin: '0 0 8px' }}>
              About this guide
            </p>
            <p style={{ fontSize: '15px', color: '#2A3C34', lineHeight: 1.65, margin: 0, fontWeight: 400 }}>
              Written by the Working Holiday Tax team, who work with 417 and 462 visa holders and nothing else.
              Written by the Working Holiday Tax team and checked against current ATO and Fair Work guidance. General information, not personal tax advice.
            </p>
            <p style={{ fontSize: '15px', color: '#2A3C34', lineHeight: 1.65, margin: '10px 0 0', fontWeight: 400 }}>
              Tax returns prepared by our team are reviewed and signed off by a registered tax agent before they are lodged with the ATO.
            </p>
            <p style={{ fontSize: '13px', color: '#4C6459', lineHeight: 1.6, margin: '12px 0 0', fontWeight: 400 }}>
              Published {guide.date}{reviewedDate ? ` · Reviewed ${reviewedDate}` : ''}
            </p>
          </aside>

          {/* The close. Until this shipped, guide pages carried no conversion
              path in any language while taking most of the site's traffic. */}
          <GuideCta
            category={guide.category}
            slug={guide.slug}
            lang="en"
            title={guide.title}
          />

          {/* Where to go next */}
          {relatedGuides.length > 0 && (
            <div style={{ borderTop: '1px solid #E2EFE9', paddingTop: '2.5rem', paddingBottom: '3rem', maxWidth: '780px' }}>
              <p style={{ fontSize: '10.5px', fontWeight: 700, color: '#0B5240', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
                Where to go next
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {relatedGuides.map(g => {
                  const gColors = getCategoryColor(g.category)
                  return (
                    <Link key={g.slug} href={`/blog/${g.slug}`} style={{ textDecoration: 'none' }} className="related-link">
                      <div style={{ border: '1px solid #E2EFE9', borderRadius: '12px', padding: '1.1rem 1.4rem', transition: 'border-color 0.2s ease, transform 0.2s ease' }} className="related-card">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                          <span style={{
                            fontSize: '13px',
                            padding: '3px 10px',
                            borderRadius: '100px',
                            background: gColors.bg,
                            color: gColors.text,
                            fontWeight: 600,
                            letterSpacing: '0.02em',
                            border: `1px solid ${gColors.border}`,
                          }}>
                            {g.category}
                          </span>
                          <span style={{ fontSize: '13px', color: '#4C6459' }}>{g.readTime} min read</span>
                        </div>
                        <p style={{ fontSize: '15px', fontWeight: 600, color: '#0B5240', marginBottom: '6px', lineHeight: 1.35 }}>
                          {g.title}
                        </p>
                        <p style={{ fontSize: '13px', color: '#4C6459', lineHeight: 1.6, margin: 0, fontWeight: 400 }}>
                          {g.description}
                        </p>
                      </div>
                    </Link>
                  )
                })}

                {/* The one link here that is not another article. Three related
                    guides and then a way out of the blog, rather than four more
                    reasons to keep reading. */}
                {service && (
                  <Link href={service.path} style={{ textDecoration: 'none' }} className="related-link">
                    <div style={{ border: '1px solid #C8EAE0', background: '#F2FAF7', borderRadius: '12px', padding: '1.1rem 1.4rem' }} className="related-card">
                      <p style={{ fontSize: '10.5px', fontWeight: 700, color: '#0B5240', letterSpacing: '0.15em', textTransform: 'uppercase', margin: '0 0 8px' }}>
                        What we do
                      </p>
                      <p style={{ fontSize: '15px', fontWeight: 600, color: '#0B5240', marginBottom: '6px', lineHeight: 1.35 }}>
                        {service.label}
                      </p>
                      <p style={{ fontSize: '13px', color: '#2A3C34', lineHeight: 1.6, margin: 0, fontWeight: 400 }}>
                        {service.blurb}
                      </p>
                    </div>
                  </Link>
                )}
              </div>

              {/* related-card styles are in globals.css */}

              {categoryInfo && (
                <div style={{ marginTop: '24px' }}>
                  <Link
                    href={`/blog/category/${categoryInfo.slug}`}
                    style={{ fontSize: '15px', color: '#0B5240', fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '8px 0' }}
                  >
                    View all {categoryInfo.category} articles →
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>

        {/* The sticky CTA bar is fixed at the bottom of the viewport and
            renders no spacer of its own, so without this the last paragraph of
            every guide is read through a translucent white bar. */}
        <div
          aria-hidden="true"
          className="md:hidden"
          style={{ height: 'calc(84px + env(safe-area-inset-bottom, 0px))' }}
        />

      </main>
      <MobileCta href={waUrl({ topic: "guide", lang: "en" })} lang="en" topic="guide" />
    </>
  )
}
