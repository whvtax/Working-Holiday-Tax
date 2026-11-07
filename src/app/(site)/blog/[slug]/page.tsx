import { newLocaleGuideLanguages } from '@/lib/guide-alternates'
import { SITE_URL } from '@/lib/constants'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { guides, getGuideBySlug, getCategoryMeta } from '../data'
import GuideArticle from './GuideArticle'
import StickyBreadcrumbs from './StickyBreadcrumbs'
import { Section } from '@/components/wht/Section'
import { blocks, LinkRows } from '@/components/wht/Blocks'
import { blog, PageHead, ArticleMeta, CtaBand } from '@/components/wht/BlogBlocks'

import { isoGuideDate, guideModifiedIso, guideDateFromIso } from '@/lib/blog-dates'
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

/* ── Article-schema enrichment (29 Aug) ────────────────────────────────────
   The consolidation moved de and ja onto the shared LocaleGuidePage template,
   which ships articleBody, mentions, citation/isBasedOn, image and a full
   author entity. The English pages, which are the canonical, x-default,
   highest-traffic versions of every guide, were left on this bespoke file with
   a thinner Article node, so the site's source-authority signal was strongest
   in its two smaller languages and weakest in its largest. These three helpers
   mirror the shared template's exactly so English reaches parity. (The proper
   fix is to fold this file into the template with an `en` config; that is a
   larger change with its own HTML byte-verification, noted in the audit.) */
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

const KNOWS_ABOUT_EN = [
  'Australian tax law',
  'Working Holiday Visa (subclass 417, 462)',
  'Tax File Number (TFN)',
  'Australian Business Number (ABN)',
  'Superannuation and DASP',
  'Medicare levy',
  'Fair Work Australia',
]

const ORG_ENTITIES: Array<{ match: RegExp; name: string; sameAs: string }> = [
  { match: /\bATO\b|Australian Taxation Office/, name: 'Australian Taxation Office', sameAs: 'https://www.ato.gov.au/' },
  { match: /Fair Work/i, name: 'Fair Work Ombudsman', sameAs: 'https://www.fairwork.gov.au/' },
  { match: /\bABR\b|Australian Business Register/, name: 'Australian Business Register', sameAs: 'https://www.abr.gov.au/' },
  { match: /Services Australia|Medicare/, name: 'Services Australia', sameAs: 'https://www.servicesaustralia.gov.au/' },
  { match: /Department of Home Affairs/i, name: 'Department of Home Affairs', sameAs: 'https://www.homeaffairs.gov.au/' },
  { match: /myGov|MyGov/, name: 'myGov', sameAs: 'https://my.gov.au/' },
]
const PLACE_ENTITIES: Array<{ match: RegExp; name: string; sameAs: string }> = [
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
function extractMentions(body: string): Array<{ '@type': string; name: string; sameAs?: string }> {
  const mentions: Array<{ '@type': string; name: string; sameAs?: string }> = []
  for (const e of ORG_ENTITIES) if (e.match.test(body)) mentions.push({ '@type': 'Organization', name: e.name, sameAs: e.sameAs })
  for (const e of PLACE_ENTITIES) if (e.match.test(body)) mentions.push({ '@type': 'Place', name: e.name, sameAs: e.sameAs })
  if (/Working Holiday|417|462|WHV/.test(body)) {
    mentions.push({ '@type': 'Thing', name: 'Working Holiday Visa (Australia)', sameAs: 'https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/work-holiday-417' })
  }
  return mentions
}
function getRelevantCitations(slug: string, category: string): Array<{ name: string; url: string }> {
  const c: Array<{ name: string; url: string }> = []
  const s = slug.toLowerCase()
  if (s.includes('tfn')) c.push({ name: 'ATO - Tax file number (TFN)', url: 'https://www.ato.gov.au/individuals/tax-file-number/' })
  if (s.includes('abn')) c.push({ name: 'Australian Business Register (ABR)', url: 'https://www.abr.gov.au/' })
  if (s.includes('tax-return') || s.includes('lodge') || s.includes('refund') || category === 'Tax Return') c.push({ name: 'ATO - Lodging your tax return', url: 'https://www.ato.gov.au/individuals/lodging-your-tax-return/' })
  if (s.includes('super') || s.includes('dasp') || category === 'Super') c.push({ name: 'ATO - Departing Australia superannuation payment (DASP)', url: 'https://www.ato.gov.au/individuals/super/withdrawing-and-using-your-super/departing-australia-superannuation-payment-dasp/' })
  if (s.includes('medicare')) c.push({ name: 'Services Australia - Medicare', url: 'https://www.servicesaustralia.gov.au/medicare' })
  if (s.includes('award') || s.includes('minimum-wage') || s.includes('fair-work') || s.includes('penalty-rate') || s.includes('casual') || s.includes('unpaid') || s.includes('wage') || category === 'Work Rights') c.push({ name: 'Fair Work Ombudsman', url: 'https://www.fairwork.gov.au/' })
  if (s.includes('backpacker-tax') || s.includes('working-holiday-tax') || s.includes('working-holiday-visa-tax') || s.includes('tax-free-threshold') || s.includes('second-third-year')) c.push({ name: 'ATO - Working holiday makers', url: 'https://www.ato.gov.au/individuals/coming-to-australia-or-going-overseas/in-detail/coming-to-australia/working-holiday-makers/' })
  return c
}

interface Props {
  params: Promise<{ slug: string }>
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
  const guide = getGuideBySlug((await params).slug)
  if (!guide) return {}
  const categoryKeywords = CATEGORY_KEYWORDS[guide.category] || []
  // The search result title can differ from the H1 (seoTitle); the H1 stays guide.title.
  const metaTitle = guide.seoTitle ?? guide.title
  return {
    // A guide title already names its subject, so the " | Working Holiday Tax"
    // suffix the layout template appends costs about 200px of the roughly 580px
    // Google renders and buys nothing. Absolute drops it here only; service and
    // landing pages keep it.
    title: { absolute: metaTitle },
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
        ...newLocaleGuideLanguages(guide.slug),
        'x-default': `${SITE_URL}/blog/${guide.slug}`,
      },
    },
    openGraph: {
      images: [{ url: `${SITE_URL}${ogForCategory(guide.category)}`, width: 1200, height: 630, alt: 'Working Holiday Tax Refund Australia' }],
      title: metaTitle,
      description: guide.description,
      url: `${SITE_URL}/blog/${guide.slug}`,
      type: 'article',
      siteName: 'Working Holiday Tax',
      locale: 'en_AU',
    },
    twitter: {
      images: [`${SITE_URL}${ogForCategory(guide.category)}`],
      card: 'summary_large_image',
      title: metaTitle,
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
    // Seasonal: from 1 November the 31 October deadline has passed, so a late
    // return and lodging from overseas lead. The deadline guide is moved back
    // to the top from 1 July to 31 October by seasonalTaxReturnOrder() below.
    'late-tax-return-penalty-working-holiday',
    'how-to-lodge-tax-return-from-overseas',
    'tax-return-deadline-31-october-working-holiday',
    'diy-tax-return-vs-tax-agent-working-holiday',
    'tax-residency-working-holiday-makers',
    'tax-deductions-working-holiday-makers',
    'multiple-jobs-tax-return-working-holiday',
  ],
  'Super': [
    // 'best-way-to-claim-super-leaving-australia' was merged into /superannuation
    // and 301-redirects there, so it is no longer listed.
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
    label: 'Working holiday tax return: what we check before lodging',
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
    label: 'Working holiday tax return: what we check before lodging',
    blurb: 'If any of this affected your pay or your hours, it usually shows up in your tax return as well.',
  },
}

/**
 * TFN and Medicare guides hold most of the site's impressions, and their own
 * service pages (/tfn, /medicare) are not where the weeks at 45% or the levy
 * are actually settled. Both are settled on the tax return, so these two
 * categories get a second service row pointing at it.
 */
const TAX_RETURN_BRIDGE: Record<string, { path: string; label: string; blurb: string }> = {
  'TFN': {
    path: '/tax-return',
    label: 'Working holiday tax return: what we check before lodging',
    blurb: 'The weeks withheld at 45% and the Medicare levy are both settled on the return.',
  },
  'Medicare & Other': {
    path: '/tax-return',
    label: 'Working holiday tax return: what we check before lodging',
    blurb: 'The weeks withheld at 45% and the Medicare levy are both settled on the return.',
  },
}

/** From 1 July to 31 October the lodgement deadline is the most time-sensitive guide, so it leads. */
function decisionOrder(category: string): string[] {
  const ranked = DECISION_GUIDES[category] ?? []
  if (category !== 'Tax Return') return ranked
  const month = new Date().getMonth() // 0 = January, 6 = July, 9 = October
  const deadline = 'tax-return-deadline-31-october-working-holiday'
  if (month >= 6 && month <= 9 && ranked.includes(deadline)) {
    return [deadline, ...ranked.filter(s => s !== deadline)]
  }
  return ranked
}

/*
 * Related guides (tech-005, Nov 2026). The old version sorted the whole
 * category by the decision list and took the top three, so every guide in a
 * category showed the same three links and the highest-impression guides got
 * no links from other guides at all. Now each guide shows one decision guide,
 * rotated by position so the decision guides share the load, plus its nearest
 * neighbours in the same category by file position. Every guide therefore
 * receives related links from the guides next to it. Deterministic: the same
 * build always produces the same links.
 */
function getRelatedGuides(current: { slug: string; category: string }, count = 3) {
  const inCategory = guides.filter(g => g.category === current.category)
  const pos = inCategory.findIndex(g => g.slug === current.slug)
  const others = inCategory.filter(g => g.slug !== current.slug)
  if (others.length === 0) return []
  const picked: typeof guides = []
  const add = (g: (typeof guides)[number] | undefined) => {
    if (g && g.slug !== current.slug && !picked.some(p => p.slug === g.slug)) picked.push(g)
  }

  const ranked = decisionOrder(current.category)
    .map(slug => others.find(g => g.slug === slug))
    .filter((g): g is (typeof guides)[number] => Boolean(g))
  if (ranked.length > 0) add(ranked[Math.max(pos, 0) % ranked.length])

  // Nearest neighbours: next, previous, then further out, wrapping round.
  const n = inCategory.length
  for (let step = 1; picked.length < count && step < n; step++) {
    const base = Math.max(pos, 0)
    add(inCategory[(base + step) % n])
    if (picked.length < count) add(inCategory[(base - step + n) % n])
  }
  return picked.slice(0, count)
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

export default async function GuidePage({ params }: Props) {
  const guide = getGuideBySlug((await params).slug)
  if (!guide) notFound()

  const categoryInfo = getCategoryMeta(guide.category)
  const relatedGuides = getRelatedGuides(guide)
  const readTime = calcReadTime(guide.body)
  const wordCount = calcWordCount(guide.body)
  const faqs = extractFAQs(guide.body)
  const leadParagraph = getLeadParagraph(guide.body)
  const fullBody = stripMarkdown(guide.body)
  const mentions = extractMentions(guide.body)
  const citations = getRelevantCitations(guide.slug, guide.category)
  const service = SERVICE_FOR_CATEGORY[guide.category]
  const bridge = TAX_RETURN_BRIDGE[guide.category]

  // `reviewed` is optional and may not be populated on a given guide yet, so
  // it is read defensively. Where it is absent the page shows a publication
  // date only and never labels it as an update.
  const reviewedDate = (guide as { reviewed?: string }).reviewed
  const publishedIso = isoGuideDate(guide.date)
  // The corpus was reframed on CORPUS_REVISED, and until now nothing read
  // that constant: dateModified mirrored datePublished on every article, so
  // guides revised in August 2026 told search engines they had not been
  // touched since July 2024. guideModifiedIso applies the per-guide `reviewed`
  // date where one exists, falls back to the corpus revision date, and clamps
  // the result so it is never before publication and never in the future.
  const modifiedIso = guideModifiedIso(publishedIso, undefined, reviewedDate)
  // tech-006: the visible "Updated" date is the same value as dateModified and
  // the sitemap lastmod, and only shows when it is later than publication.
  const updatedLabel = modifiedIso > publishedIso ? guideDateFromIso(modifiedIso) : null

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title,
    name: guide.title,
    description: guide.description,
    abstract: leadParagraph,
    articleSection: guide.category,
    articleBody: fullBody,
    image: {
      '@type': 'ImageObject',
      url: `${SITE_URL}${ogForCategory(guide.category)}`,
      width: 1200,
      height: 630,
    },
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
      description: 'Australian tax service specialising in Working Holiday Makers (visa subclasses 417 and 462).',
      knowsAbout: KNOWS_ABOUT_EN,
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
    ...(citations.length > 0 && {
      citation: citations.map(c => ({ '@type': 'CreativeWork', name: c.name, url: c.url })),
      isBasedOn: citations.map(c => c.url),
    }),
    ...(mentions.length > 0 && { mentions }),
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
    isPartOf: { '@id': `${SITE_URL}/#website` },
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

      <div className={blocks.underHeader} style={{ background: '#fff', minHeight: '100dvh' }}>

        {/* Sticky breadcrumbs (appear after scrolling past the header) */}
        {categoryInfo && (
          <StickyBreadcrumbs
            category={categoryInfo.category}
            categorySlug={categoryInfo.slug}
            title={guide.title}
          />
        )}

        <PageHead
          titleId="article-title"
          crumbsLabel="Breadcrumb"
          crumbs={[
            { label: 'Home', href: '/' },
            { label: 'Blog', href: '/blog' },
            ...(categoryInfo ? [{ label: categoryInfo.category, href: `/blog/category/${categoryInfo.slug}` }] : []),
            { label: guide.title },
          ]}
          top={
            /* "Last updated" was showing the publication date, so 77 of 154
               guides told a reader in 2026 that a tax page had been updated
               one or two financial years ago. Publication and review are shown
               separately. */
            <ArticleMeta
              chip={categoryInfo ? { href: `/blog/category/${categoryInfo.slug}`, label: guide.category } : undefined}
              parts={[`Published ${guide.date}`, ...(updatedLabel ? [`Updated ${updatedLabel}`] : []), `${readTime} min read`]}
            />
          }
          title={guide.title}
          lead={guide.description}
          leadClassName="guide-lead"
        />

        <div className={blog.wrap}>
          <article className={blog.article} itemScope itemType="https://schema.org/Article">
            <meta itemProp="headline" content={guide.title} />
            <meta itemProp="datePublished" content={publishedIso} />
            <meta itemProp="dateModified" content={modifiedIso} />
            <meta itemProp="author" content="Working Holiday Tax" />
            <GuideArticle guide={guide} />
          </article>

          {/* About this guide. Says who wrote it and who checked it. It describes
              only what the registered tax agent does with the work and never says
              Working Holiday Tax is one. No invented author, no photo. */}
          <aside aria-labelledby="about-this-guide" className={blog.about}>
            <p id="about-this-guide" className={blog.aboutLabel}>
              About this guide
            </p>
            <p>
              Written by the Working Holiday Tax team, who work with 417 and 462 visa holders and nothing else, and checked against current ATO and Fair Work guidance. General information, not personal tax advice.
            </p>
            <p>
              Tax returns are reviewed and signed off by a registered tax agent before they are lodged with the ATO.
            </p>
            <p className={blog.aboutDate}>
              Published {guide.date}{updatedLabel ? ` · Updated ${updatedLabel}` : ''}
            </p>
          </aside>
        </div>

        {/* Where to go next */}
        {relatedGuides.length > 0 && (
          <Section tone="pale" title="Where to go next" titleId="related-title">
            <LinkRows
              items={[
                ...relatedGuides.map(g => ({
                  href: `/blog/${g.slug}`,
                  eyebrow: `${g.category} · ${g.readTime} min read`,
                  title: g.title,
                  desc: g.description,
                })),
                /* The one link here that is not another article. */
                ...(service ? [{ href: service.path, eyebrow: 'What we do', title: service.label, desc: service.blurb }] : []),
                ...(bridge && bridge.path !== service?.path ? [{ href: bridge.path, eyebrow: 'What we do', title: bridge.label, desc: bridge.blurb }] : []),
              ]}
            />
            {categoryInfo && (
              <Link href={`/blog/category/${categoryInfo.slug}`} className={blocks.textLink}>
                View all {categoryInfo.category} articles →
              </Link>
            )}
          </Section>
        )}

        {/* The close. */}
        <CtaBand>
          <GuideCta
            category={guide.category}
            slug={guide.slug}
            lang="en"
            title={guide.title}
          />
        </CtaBand>

        {/* The sticky CTA bar is fixed at the bottom of the viewport and
            renders no spacer of its own, so without this the last paragraph of
            every guide is read through a translucent white bar. */}
        <div
          aria-hidden="true"
          className="md:hidden"
          style={{ height: 'calc(84px + env(safe-area-inset-bottom, 0px))' }}
        />

      </div>
      <MobileCta href={waUrl({ topic: "guide", lang: "en" })} lang="en" topic="guide" />
    </>
  )
}
