import { SITE_URL } from '@/lib/constants'
import { catLabelDe } from '@/lib/category-labels'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { guides, getCategoryColor } from '@/app/blog/data'
import GuideArticle from '@/app/blog/[slug]/GuideArticle'
import StickyBreadcrumbs from '@/app/blog/[slug]/StickyBreadcrumbs'
import CategoryHero from '@/app/blog/[slug]/CategoryHero'
// The corpus was reframed on this date. dateModified previously mirrored
// datePublished on every article, which told search engines nothing had
// changed and was, after tonight, simply untrue.
const CORPUS_REVISED = '2026-08-22'

import { isoGuideDate, formatGuideDateDe } from '@/lib/blog-dates'
import { getGermanGuide, getGermanCategoryMeta, deCategoryMeta, blogUI } from '../data'
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
    'DASP-Auszahlung Working Holiday',
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
    // A guide title already names its subject, so the " | Working Holiday Tax"
    // suffix the layout template appends costs about 200px of the roughly 580px
    // Google renders and buys nothing. Absolute drops it here only; service and
    // landing pages keep it.
    title: { absolute: guide.title },
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

/* ── Related guides ───────────────────────────────────────────────────────
   Ranked rather than shuffled. The guides named below sit closest to a
   decision in their category, so a reader who is nearly ready meets the
   article that names what is at stake rather than whichever three the random
   draw produced. The block then closes with the service page for the
   category, which is the one link out of the blog. Anything not named still
   appears, in file order, behind the ranked ones.                          */
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
    path: '/de/tfn',
    label: 'Was wir bei TFN und Erklärungsformular übernehmen',
    blurb: 'Die Nummer ist kostenlos und dauert zehn Minuten. Entscheidend ist das Formular beim Arbeitgeber, und genau das übernehmen wir.',
  },
  'ABN': {
    path: '/de/abn',
    label: 'Was wir machen, wenn du über eine ABN abgerechnet hast',
    blurb: 'Lohn und Rechnungseinkommen werden unterschiedlich besteuert und stehen anders in der Erklärung. Diese Aufteilung richtig zu setzen ist die eigentliche Arbeit.',
  },
  'Tax Return': {
    path: '/de/tax-return',
    label: 'Was wir bei jeder Steuererklärung durchgehen',
    blurb: 'Steuerlicher Wohnsitz, Wochen mit dem falschen Steuersatz, die Medicare-Frage und die Abzüge, die zu deiner echten Arbeit gehören.',
  },
  'Super': {
    path: '/de/superannuation',
    label: 'Was wir vor deiner Abreise mit deiner Super machen',
    blurb: 'Gelegenheitsarbeit verteilt die Super auf mehrere Fonds. Wir finden jedes Konto über deine TFN und stellen den Antrag einmal, in der richtigen Reihenfolge.',
  },
  'Medicare & Other': {
    path: '/de/medicare',
    label: 'Was wir bei der Medicare Levy machen',
    blurb: 'Die Levy wird standardmäßig abgezogen. Für die Befreiung brauchst du eine Bescheinigung, die beantragt werden muss, und sie wird bei Backpacker-Erklärungen am häufigsten übersehen.',
  },
  'Work Rights': {
    path: '/de/tax-return',
    label: 'Was wir bei jeder Steuererklärung durchgehen',
    blurb: 'Wenn davon etwas deinen Lohn oder deine Stunden betroffen hat, taucht es meistens auch in deiner Steuererklärung auf.',
  },
}

function getRelatedGuides(current: { slug: string; category: string }, count = 3) {
  const sameCategory = guides.filter(g => g.slug !== current.slug && g.category === current.category)
  const ranked = DECISION_GUIDES[current.category] ?? []
  const rank = (slug: string) => {
    const i = ranked.indexOf(slug)
    return i === -1 ? ranked.length + 1 : i
  }
  return [...sameCategory]
    .map((g, i) => ({ g, i }))
    .sort((a, b) => rank(a.g.slug) - rank(b.g.slug) || a.i - b.i)
    .slice(0, count)
    // Get German versions of related guides
    .map(x => {
      const result = getGermanGuide(x.g.slug)
      return result ? result.guide : x.g
    })
}

function calcReadTime(body: string) {
  const words = body.trim().split(/\s+/).length
  return Math.max(1, Math.round(words / 200))
}

function calcWordCount(body: string) {
  return body.trim().split(/\s+/).length
}

/* ── FAQ extraction ───────────────────────────────────────────────────────
   Same rewrite as the English template, and it matters here for the same
   reason. The old extractor walked from a question H2 to the first non-empty
   line and stopped at the first bullet, so on the house pattern of question,
   colon terminated lead in, bullet list, it published the lead in and threw
   the answer away. The median published answer was 68 characters.

   It now reads the whole section as ordered blocks and joins them into one
   paragraph. Prose first. A list is pulled in only where it completes an open
   colon, or where the prose alone is too short to be an answer. Anything that
   still cannot produce a usable answer is omitted rather than published as a
   fragment, because a fragment teaches an engine that the page answers
   nothing.                                                                 */

const FAQ_MIN_ANSWER = 150
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
    if (raw.startsWith('|') || /^[-=*_]{3,}$/.test(raw)) { flush(); continue }
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
    if (!openColon && out.length >= FAQ_MIN_ANSWER) continue
    const rendered = listAsSentence(b.items)
    if (!rendered) continue
    out = out ? `${out} ${rendered}` : rendered
  }

  out = out.replace(/\s+/g, ' ').trim()
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
    if (!heading || !/[?？]/.test(heading)) continue

    const answer = buildFaqAnswer(sectionBlocks(lines))
    if (!answer || answer.length < FAQ_MIN_ANSWER) continue

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
  const service = SERVICE_FOR_CATEGORY[guide.category]

  // `reviewed` is optional and may not be populated on a given guide yet, so
  // it is read defensively. Where it is absent the page shows a publication
  // date only and never labels it as an update.
  const reviewedDate = (guide as { reviewed?: string }).reviewed
  const publishedIso = isoGuideDate(guide.date)
  const modifiedIso = reviewedDate ? isoGuideDate(reviewedDate) : publishedIso

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
    datePublished: publishedIso,
    dateModified: modifiedIso,
    // Preparation and professional review are two different steps done by two
    // different parties, so they are modelled separately rather than pointing
    // reviewedBy at the author's own @id. The node is deliberately unnamed
    // here: Working Holiday Tax is not itself a registered tax agent and must
    // never be described as one, and the supervising firm's name belongs on
    // the site wide entity graph. The @id is stable, so the two merge when
    // that node lands.
    reviewedBy: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#supervising-agent`,
      description: 'Registrierter Steuerberater, der die von Working Holiday Tax vorbereitete Arbeit prüft und freigibt.',
    },
    author: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#business`,
      name: 'Working Holiday Tax',
      url: `${SITE_URL}`,
      description: 'Auf Working Holiday Maker (Visumklassen 417 und 462) spezialisierter australischer Steuerservice.',
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
        // No upvoteCount. It was hard coded to 1, which is a fabricated
        // engagement signal on a page that has no votes at all.
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
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
        // Every H2 already carries a slugified id, so each answer gets a deep
        // link to the exact passage. That is what turns a page level citation
        // into a passage level one.
        ...(f.anchor ? { url: `${SITE_URL}/de/blog/${guide.slug}#${f.anchor}` } : {}),
      },
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
      {/* Guide route only.
          The language banner is fixed at bottom 16px with z-index 70 and the
          sticky CTA bar is fixed at bottom 0 with z-index 60, so on a phone the
          banner lands squarely on top of the bar and hides the only conversion
          control on the page from exactly the visitors it is meant to help.

          The banner and the shared stylesheet are owned elsewhere, so this
          lifts the banner clear of the bar from inside the guide template
          rather than reaching into either. Scoped to these routes and to
          phones, and to be replaced by the site wide z-index scale. */}
      <style dangerouslySetInnerHTML={{ __html: `@media (max-width: 767px){body > div[role="dialog"]{bottom:calc(88px + env(safe-area-inset-bottom, 0px)) !important}}` }} />

      <main style={{ paddingTop: '68px', background: '#fff', minHeight: '100dvh' }}>

        {categoryInfo && (
          <StickyBreadcrumbs
            category={categoryInfo.category}
            categorySlug={categoryInfo.slug}
            title={guide.title}
            basePath="/de"
            homeLabel="Startseite"
            blogLabel="Blog"
          />
        )}

        <div style={{ background: categoryColors.bg }}>
          <div style={{ padding: '12px 0' }}>
            <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px', display: 'flex', gap: '10px', alignItems: 'center', fontSize: '13px', color: '#4C6459', flexWrap: 'wrap' }}>
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
                        href={`/de/blog/category/${categoryInfo.slug}`}
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
                        {catLabelDe(guide.category)}
                      </Link>
                      <span style={{ color: 'rgba(0,0,0,0.15)' }}>·</span>
                    </>
                  )}
                  {/* "Zuletzt aktualisiert" zeigte das Veröffentlichungsdatum
                      an, also stand bei vielen Ratgebern ein ein bis zwei
                      Steuerjahre altes Datum als Aktualisierung. Das war nicht
                      wahr. Jetzt stehen Veröffentlichung und Prüfung getrennt. */}
                  <span style={{ fontSize: '13px', color: '#4C6459' }}>Veröffentlicht {formatGuideDateDe(guide.date)}</span>
                  {reviewedDate && (
                    <>
                      <span aria-hidden="true" style={{ color: '#CDE3DB' }}>·</span>
                      <span style={{ fontSize: '13px', color: '#4C6459' }}>Geprüft {formatGuideDateDe(reviewedDate)}</span>
                    </>
                  )}
                  <span aria-hidden="true" style={{ color: '#CDE3DB' }}>·</span>
                  <span style={{ fontSize: '13px', color: '#4C6459' }}>{readTime} Min. Lesezeit</span>
                </div>

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

              <div className="article-hero-image">
                <CategoryHero category={guide.category} title={guide.title} slug={guide.slug} variant="badge" />
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
            <meta itemProp="datePublished" content={publishedIso} />
            <meta itemProp="dateModified" content={modifiedIso} />
            <meta itemProp="author" content="Working Holiday Tax" />
            <GuideArticle guide={guide} locale="de" />
          </article>

          {/* Über diesen Ratgeber.
              Ersetzt die einzelne graue Zeile "Written by Working Holiday
              Tax", die bei einem Geldthema das schwächste denkbare
              Vertrauenssignal ist. Der Text beschreibt nur, was der
              registrierte Steuerberater mit der Arbeit macht, und sagt nie, dass
              Working Holiday Tax selbst einer ist. Kein erfundener Autorenname,
              kein Foto, keine erfundene Person. */}
          <aside
            aria-labelledby="about-this-guide"
            style={{ maxWidth: '780px', margin: '0 0 2rem 0', padding: '18px 20px', border: '1px solid #E2EFE9', borderRadius: '12px', background: '#F7F9F8' }}
          >
            <p id="about-this-guide" style={{ fontSize: '10.5px', fontWeight: 700, color: '#0B5240', letterSpacing: '0.15em', textTransform: 'uppercase', margin: '0 0 8px' }}>
              Über diesen Ratgeber
            </p>
            <p style={{ fontSize: '15px', color: '#2A3C34', lineHeight: 1.65, margin: 0, fontWeight: 400 }}>
              Geschrieben vom Team von Working Holiday Tax, das ausschließlich mit Inhabern von 417- und 462-Visa arbeitet,
              und anhand der aktuellen Vorgaben von ATO und Fair Work geprüft. Allgemeine Informationen, keine persönliche Steuerberatung.
            </p>
            <p style={{ fontSize: '15px', color: '#2A3C34', lineHeight: 1.65, margin: '10px 0 0', fontWeight: 400 }}>
              Steuererklärungen, die unser Team vorbereitet, werden vor der Einreichung beim ATO von einem registrierten Steuerberater geprüft und freigegeben.
            </p>
            <p style={{ fontSize: '13px', color: '#4C6459', lineHeight: 1.6, margin: '12px 0 0', fontWeight: 400 }}>
              Veröffentlicht {formatGuideDateDe(guide.date)}{reviewedDate ? ` · Geprüft ${formatGuideDateDe(reviewedDate)}` : ''}
            </p>
          </aside>

          {/* The close. Until this shipped, guide pages carried no conversion
              path in any language while taking most of the site's traffic. */}
          <GuideCta
            category={guide.category}
            slug={guide.slug}
            lang="de"
            title={guide.title}
          />

          {relatedGuides.length > 0 && (
            <div style={{ borderTop: '1px solid #E2EFE9', paddingTop: '2.5rem', paddingBottom: '3rem', maxWidth: '780px' }}>
              <p style={{ fontSize: '10.5px', fontWeight: 700, color: '#0B5240', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
                Wie es weitergeht
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {relatedGuides.map(g => {
                  const gColors = getCategoryColor(g.category)
                  return (
                    <Link key={g.slug} href={`/de/blog/${g.slug}`} style={{ textDecoration: 'none' }} className="related-link">
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
                            {catLabelDe(g.category)}
                          </span>
                          <span style={{ fontSize: '13px', color: '#4C6459' }}>{g.readTime} Min. Lesezeit</span>
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

                {/* The one link here that is not another article. */}
                {service && (
                  <Link href={service.path} style={{ textDecoration: 'none' }} className="related-link">
                    <div style={{ border: '1px solid #C8EAE0', background: '#F2FAF7', borderRadius: '12px', padding: '1.1rem 1.4rem' }} className="related-card">
                      <p style={{ fontSize: '10.5px', fontWeight: 700, color: '#0B5240', letterSpacing: '0.12em', margin: '0 0 8px' }}>
                        Was wir machen
                      </p>
                      <p style={{ fontSize: '15px', fontWeight: 600, color: '#0B5240', marginBottom: '6px', lineHeight: 1.45 }}>
                        {service.label}
                      </p>
                      <p style={{ fontSize: '13px', color: '#2A3C34', lineHeight: 1.7, margin: 0, fontWeight: 400 }}>
                        {service.blurb}
                      </p>
                    </div>
                  </Link>
                )}
              </div>

              {categoryInfo && (
                <div style={{ marginTop: '24px' }}>
                  <Link
                    href={`/de/blog/category/${categoryInfo.slug}`}
                    style={{ fontSize: '15px', color: '#0B5240', fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '8px 0' }}
                  >
                    Alle {catLabelDe(categoryInfo.category)}-Artikel ansehen →
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
      <MobileCta href={waUrl({ topic: "guide", lang: "de" })} lang="de" topic="guide" />
    </>
  )
}
