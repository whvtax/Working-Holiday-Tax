/**
 * The shared guide-article template for the LOCALIZED blogs (/de and /ja).
 *
 * WHY THIS EXISTS (29 Aug). The German and Japanese guide pages were two
 * ~1,000-line files that were 77% line-identical and 100% structure-identical.
 * Every template fix, every schema change and every SEO decision had to be
 * made twice, and the pair had already drifted apart in small ways nobody
 * chose. This file is the single template; each locale page is now a config
 * object plus ten lines of glue.
 *
 * THE RULE FOR EDITING. Everything that is the same in both languages lives
 * HERE. Everything that differs, differs ONLY through GuideLocaleConfig:
 * strings, date formatting, the guide getter, the FAQ text rules, and the
 * handful of typography knobs where Japanese legitimately needs different
 * line-heights. If you find yourself adding an `if (locale === ...)` in this
 * file, the branch belongs in the config instead.
 *
 * VERIFIED at extraction time by rebuilding and byte-comparing the built HTML
 * of all /de/blog/* and /ja/blog/* pages against the pre-refactor output.
 * The English blog page is intentionally NOT folded in yet: it is built from
 * separate components and has drifted further; folding it in is its own step
 * with the same verification.
 */
import { SITE_URL } from '@/lib/constants'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { guides, getCategoryColor } from '@/app/(site)/blog/data'
import GuideArticle from '@/app/(site)/blog/[slug]/GuideArticle'
import StickyBreadcrumbs from '@/app/(site)/blog/[slug]/StickyBreadcrumbs'
import CategoryHero from '@/app/(site)/blog/[slug]/CategoryHero'
import { isoGuideDate, guideModifiedIso } from '@/lib/blog-dates'
import { GuideCta } from '@/components/ui/GuideCta'
import { MobileCta } from '@/components/ui/MobileCta'
import { waUrl } from '@/lib/wa'

/* ── Types ─────────────────────────────────────────────────────────────── */

import type { Guide } from '@/app/(site)/blog/data'

export type LocalizedGuide = Guide & { reviewed?: string }

export interface GuideLocaleConfig {
  /** 'de' | 'ja' — the short code used in paths and GuideArticle. */
  locale: 'de' | 'ja'
  /** '/de' | '/ja' */
  basePath: string
  /** 'de_DE' | 'ja_JP' for OpenGraph. */
  ogLocale: string
  /** Returns the localized guide (translated or English fallback) for a slug. */
  getGuide: (slug: string) => { guide: LocalizedGuide; isTranslated: boolean } | null | undefined
  /** The locale's category meta list ({ category, slug, ... }). */
  categoryMeta: ReadonlyArray<{ category: string; slug: string }>
  /** Localized category display label. */
  catLabel: (category: string) => string
  /** Localized long-form date, e.g. formatGuideDateDe. */
  formatDate: (date: string) => string
  /** blogUI.englishOnlyNotice from the locale's data module. */
  englishOnlyNotice: string

  /* SEO */
  categoryKeywords: Record<string, string[]>
  coreKeywords: string[]
  /** Extra keywords joined into the Article LD (category is spliced in where the marker sits). */
  ldKeywords: (category: string) => string[]
  reviewedByDescription: string
  authorDescription: string
  knowsAbout: string[]
  audienceName: string
  aboutThingName: string
  serviceForCategory: Record<string, { path: string; label: string; blurb: string }>

  /* UI strings */
  homeLabel: string
  blogLabel: string
  publishedLabel: string
  reviewedLabel: string
  readTimeLabel: (minutes: number | undefined) => string
  whatsNextLabel: string
  whatWeDoLabel: string
  viewAllLabel: (categoryLabel: string) => string
  aside: { label: string; p1: string; p2: string }

  /* Typography knobs. Japanese text is denser and needs looser leading;
     these reproduce each locale's existing values exactly. */
  styles: {
    h1: { lineHeight: number; letterSpacing: string }
    leadLineHeight: number
    noticeLineHeight: number
    asideLabel: React.CSSProperties
    asideBodyLineHeight: number
    asideDateLineHeight: number
    relatedHeader: React.CSSProperties
    relatedTitleLineHeight: number
    relatedDescLineHeight: number
    serviceLabel: React.CSSProperties
  }

  /* Text-processing rules that differ between latin and CJK. */
  faq: FaqRules
  /** HowTo step name truncation length (60 latin, 30 CJK). */
  howToNameMax: number
  isQuestionPost: (slug: string, title: string) => boolean
  /** Locale-aware entity regexes for the Article LD `mentions`. */
  orgEntities: Array<{ match: RegExp; name: string; sameAs: string }>
  placeEntities: Array<{ match: RegExp; name: string; sameAs: string }>
  whvMention: RegExp
}

export interface FaqRules {
  minAnswer: (text: string) => number
  listAsSentence: (items: string[]) => string
  trimToSentence: (text: string, max: number) => string
  joinBlocks: (a: string, b: string) => string
  colonCut: (out: string) => number
  terminalPunctuation: (out: string) => string
  endsWithPunctuation: RegExp
  /** Ends-with test deciding whether a sub-heading needs a ':' appended. */
  headingColon: RegExp
}

/* ── Shared, locale-independent pieces ─────────────────────────────────── */

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

/** Every localized blog mirrors the English corpus one-to-one. */
export function localizedGuideStaticParams() {
  return guides.map(g => ({ slug: g.slug }))
}

/* Ranked rather than shuffled: the guides closest to a decision in their
   category lead, then file order, then the category's service page. Shared
   verbatim across locales, and it must stay that way: the ranking is an
   editorial decision about the ENGLISH corpus the localized blogs mirror. */
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

function getRelatedGuides(cfg: GuideLocaleConfig, current: { slug: string; category: string }, count = 3) {
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
    .map(x => {
      const result = cfg.getGuide(x.g.slug)
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
   Reads each question-H2 section as ordered blocks and joins them into one
   paragraph: prose first, a list only where it completes an open colon or the
   prose alone is too short. Anything that still cannot produce a usable
   answer is omitted rather than published as a fragment. Everything that is
   sensitive to the writing system (answer floors, list joining, sentence
   trimming, terminal punctuation) comes from cfg.faq, so German keeps its
   latin rules and Japanese its CJK ones, exactly as before the merge.     */

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

type FaqBlock = { type: 'p'; text: string } | { type: 'list'; items: string[] }

function sectionBlocks(lines: string[], headingColonPattern: RegExp): FaqBlock[] {
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
      if (t) blocks.push({ type: 'p', text: headingColonPattern.test(t) ? t : `${t}:` })
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

function buildFaqAnswer(rules: FaqRules, blocks: FaqBlock[]): string {
  let out = ''
  for (const b of blocks) {
    const openColon = /[:：]$/.test(out)
    if (out.length >= FAQ_TARGET_ANSWER && !openColon) break
    if (b.type === 'p') {
      out = out ? rules.joinBlocks(out, b.text) : b.text
      continue
    }
    if (!openColon && out.length >= rules.minAnswer(out)) continue
    const rendered = rules.listAsSentence(b.items)
    if (!rendered) continue
    out = out ? rules.joinBlocks(out, rendered) : rendered
  }

  out = out.replace(/\s+/g, ' ').trim()
  if (/[:：]$/.test(out)) {
    const cut = rules.colonCut(out)
    out = cut > 0 ? out.slice(0, cut + 1).trim() : ''
  }
  if (!out) return ''
  if (!rules.endsWithPunctuation.test(out)) out += rules.terminalPunctuation(out)
  return rules.trimToSentence(out, FAQ_MAX_ANSWER)
}

/** Matches the id GuideArticle gives every H2, so each answer can be deep linked. */
function headingAnchor(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function extractFAQs(cfg: GuideLocaleConfig, body: string): Array<{ question: string; answer: string; anchor: string }> {
  const sections = body.split(/^## /m).slice(1)
  const faqs: Array<{ question: string; answer: string; anchor: string }> = []

  for (const section of sections) {
    const lines = section.split('\n')
    const rawHeading = lines[0]?.trim() ?? ''
    const heading = cleanInline(rawHeading)
    if (!heading || !/[?？]/.test(heading)) continue

    const answer = buildFaqAnswer(cfg.faq, sectionBlocks(lines, cfg.faq.headingColon))
    if (!answer || answer.length < cfg.faq.minAnswer(answer)) continue

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

function extractHowToSteps(body: string, nameMax: number): Array<{ name: string; text: string }> {
  const steps: Array<{ name: string; text: string }> = []
  const lines = body.split('\n')
  for (const line of lines) {
    const m = /^(\d+)\.\s+(.+)$/.exec(line.trim())
    if (m) {
      const text = m[2]
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        .replace(/\*\*([^*]+)\*\*/g, '$1')
        .trim()
      const name = text.length > nameMax ? text.substring(0, nameMax - 3) + '...' : text
      steps.push({ name, text })
    }
  }
  return steps
}

function isHowToPost(slug: string): boolean {
  return slug.startsWith('how-to-') || slug.includes('how-to-')
}

function extractMentions(cfg: GuideLocaleConfig, body: string): Array<{ '@type': string; name: string; sameAs?: string }> {
  const mentions: Array<{ '@type': string; name: string; sameAs?: string }> = []
  for (const ent of cfg.orgEntities) {
    if (ent.match.test(body)) {
      mentions.push({ '@type': 'Organization', name: ent.name, sameAs: ent.sameAs })
    }
  }
  for (const ent of cfg.placeEntities) {
    if (ent.match.test(body)) {
      mentions.push({ '@type': 'Place', name: ent.name, sameAs: ent.sameAs })
    }
  }
  if (cfg.whvMention.test(body)) {
    mentions.push({
      '@type': 'Thing',
      name: 'Working Holiday Visa (Australia)',
      sameAs: 'https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/work-holiday-417',
    })
  }
  return mentions
}

/* Official citations by slug/category. Identical in every locale: the sources
   are Australian government pages that exist only in English. */
function getRelevantCitations(slug: string, category: string): Array<{ name: string; url: string }> {
  const citations: Array<{ name: string; url: string }> = []
  const slugLower = slug.toLowerCase()

  if (slugLower.includes('tfn')) {
    citations.push({ name: 'ATO - Tax file number (TFN)', url: 'https://www.ato.gov.au/individuals/tax-file-number/' })
  }
  if (slugLower.includes('abn')) {
    citations.push({ name: 'Australian Business Register (ABR)', url: 'https://www.abr.gov.au/' })
  }
  if (slugLower.includes('tax-return') || slugLower.includes('lodge') || slugLower.includes('refund') || category === 'Tax Return') {
    citations.push({ name: 'ATO - Lodging your tax return', url: 'https://www.ato.gov.au/individuals/lodging-your-tax-return/' })
  }
  if (slugLower.includes('super') || slugLower.includes('dasp') || category === 'Super') {
    citations.push({ name: 'ATO - Departing Australia superannuation payment (DASP)', url: 'https://www.ato.gov.au/individuals/super/withdrawing-and-using-your-super/departing-australia-superannuation-payment-dasp/' })
  }
  if (slugLower.includes('medicare')) {
    citations.push({ name: 'Services Australia - Medicare', url: 'https://www.servicesaustralia.gov.au/medicare' })
  }
  if (slugLower.includes('award') || slugLower.includes('minimum-wage') || slugLower.includes('fair-work') ||
      slugLower.includes('penalty-rate') || slugLower.includes('casual') || slugLower.includes('unpaid') ||
      slugLower.includes('wage') || category === 'Work Rights') {
    citations.push({ name: 'Fair Work Ombudsman', url: 'https://www.fairwork.gov.au/' })
  }
  if (slugLower.includes('backpacker-tax') || slugLower.includes('working-holiday-tax')) {
    citations.push({ name: 'ATO - Working holiday makers', url: 'https://www.ato.gov.au/individuals/coming-to-australia-or-going-overseas/in-detail/coming-to-australia/working-holiday-makers/' })
  }

  return citations
}

/* ── Metadata ──────────────────────────────────────────────────────────── */

export function buildGuideMetadata(cfg: GuideLocaleConfig, slug: string): Metadata {
  const result = cfg.getGuide(slug)
  if (!result) return {}
  const { guide, isTranslated } = result
  const categoryKeywords = cfg.categoryKeywords[guide.category] || []
  return {
    // A guide title already names its subject, so the " | Working Holiday Tax"
    // suffix the layout template appends costs about 200px of the roughly 580px
    // Google renders and buys nothing. Absolute drops it here only; service and
    // landing pages keep it.
    title: { absolute: guide.title },
    description: guide.description,
    keywords: [
      ...cfg.coreKeywords,
      ...categoryKeywords,
      guide.category,
      guide.title,
    ],
    alternates: {
      // When the post body is still English (not yet translated), point the
      // canonical at the English source so Google doesn't index duplicate
      // English content under a localized URL.
      canonical: isTranslated
        ? `${SITE_URL}${cfg.basePath}/blog/${guide.slug}`
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
      url: `${SITE_URL}${cfg.basePath}/blog/${guide.slug}`,
      type: 'article',
      siteName: 'Working Holiday Tax',
      locale: cfg.ogLocale,
    },
    twitter: {
      images: [`${SITE_URL}${ogForCategory(guide.category)}`],
      card: 'summary_large_image',
      title: guide.title,
      description: guide.description,
    },
    robots: {
      // Don't index untranslated (English-bodied) posts under the localized
      // path - avoids duplicate content. Still follow links so equity flows
      // to the English original.
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

/* ── The page ──────────────────────────────────────────────────────────── */

export function LocalizedGuidePage({ cfg, slug }: { cfg: GuideLocaleConfig; slug: string }) {
  const result = cfg.getGuide(slug)
  if (!result) notFound()
  const { guide, isTranslated } = result

  const categoryInfo = cfg.categoryMeta.find(c => c.category === guide.category)
  const categoryColors = getCategoryColor(guide.category)
  const relatedGuides = getRelatedGuides(cfg, guide)
  const readTime = calcReadTime(guide.body)
  const wordCount = calcWordCount(guide.body)
  const faqs = extractFAQs(cfg, guide.body)
  const leadParagraph = getLeadParagraph(guide.body)
  const fullBody = stripMarkdown(guide.body)
  const howToSteps = isTranslated && isHowToPost(guide.slug) ? extractHowToSteps(guide.body, cfg.howToNameMax) : []
  const citations = getRelevantCitations(guide.slug, guide.category)
  const mentions = extractMentions(cfg, guide.body)
  const service = cfg.serviceForCategory[guide.category]

  // `reviewed` is optional and may not be populated on a given guide yet, so
  // it is read defensively. Where it is absent the page shows a publication
  // date only and never labels it as an update.
  const reviewedDate = guide.reviewed
  const publishedIso = isoGuideDate(guide.date)
  // guideModifiedIso applies the per-guide `reviewed` date where one exists,
  // falls back to the corpus revision date, and clamps the result so it is
  // never before publication and never in the future.
  const modifiedIso = guideModifiedIso(publishedIso, undefined, reviewedDate)

  // inLanguage reflects the BODY: untranslated posts are still English.
  const articleLang = isTranslated ? cfg.locale : 'en-AU'

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
      description: cfg.reviewedByDescription,
    },
    author: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#business`,
      name: 'Working Holiday Tax',
      url: `${SITE_URL}`,
      description: cfg.authorDescription,
      knowsAbout: cfg.knowsAbout,
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#business`,
      name: 'Working Holiday Tax',
      url: `${SITE_URL}`,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/icon-512.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}${cfg.basePath}/blog/${guide.slug}` },
    audience: { '@type': 'Audience', name: cfg.audienceName },
    about: [
      { '@type': 'Thing', name: cfg.aboutThingName },
      { '@type': 'Thing', name: guide.category },
    ],
    ...(mentions.length > 0 && { mentions }),
    keywords: cfg.ldKeywords(guide.category).join(', '),
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

  const howToLd = (howToSteps.length >= 2 && isTranslated) ? {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: guide.title,
    description: guide.description,
    inLanguage: cfg.locale,
    totalTime: `PT${readTime}M`,
    step: howToSteps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
      url: `${SITE_URL}${cfg.basePath}/blog/${guide.slug}#step-${i + 1}`,
    })),
  } : null

  // QAPage removed, 29 Aug. It was emitted on the de/ja question-form guides
  // and on no English one, so the same URL declared three page types at once
  // (WebPage + FAQPage + QAPage) while its English twin declared two, and the
  // de and ja predicates did not even agree with each other (51 vs 54 pages).
  // QAPage is defined for pages where users submit and vote on answers; these
  // are editorial guides with none, which on a YMYL site is the shape Google
  // issues manual actions for. The FAQPage node already carries the
  // question-and-answer content and `speakable` already marks the H1 and lead,
  // so nothing is lost by dropping it.

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: cfg.homeLabel, item: `${SITE_URL}${cfg.basePath}` },
      { '@type': 'ListItem', position: 2, name: cfg.blogLabel, item: `${SITE_URL}${cfg.basePath}/blog` },
      ...(categoryInfo
        ? [{ '@type': 'ListItem', position: 3, name: categoryInfo.category, item: `${SITE_URL}${cfg.basePath}/blog/category/${categoryInfo.slug}` }]
        : []),
      { '@type': 'ListItem', position: categoryInfo ? 4 : 3, name: guide.title, item: `${SITE_URL}${cfg.basePath}/blog/${guide.slug}` },
    ],
  }

  const faqLd = (faqs.length > 0 && isTranslated) ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: cfg.locale,
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
        // Every H2 carries a slugified id, so each answer gets a deep link to
        // the exact passage. The slug rule strips everything that is not a
        // latin letter or digit, so a fully Japanese heading yields nothing to
        // link to and the url is left off rather than pointing at a bare hash.
        ...(f.anchor ? { url: `${SITE_URL}${cfg.basePath}/blog/${guide.slug}#${f.anchor}` } : {}),
      },
    })),
  } : null

  const webPageLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}${cfg.basePath}/blog/${guide.slug}`,
    url: `${SITE_URL}${cfg.basePath}/blog/${guide.slug}`,
    name: guide.title,
    description: guide.description,
    inLanguage: articleLang,
    isPartOf: { '@type': 'WebSite', name: 'Working Holiday Tax', url: `${SITE_URL}` },
    primaryImageOfPage: { '@type': 'ImageObject', url: `${SITE_URL}${ogForCategory(guide.category)}` },
    speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.guide-lead'] },
  }

  const S = cfg.styles

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
      {/* Guide route only.
          The language banner is fixed at bottom 16px with z-index 70 and the
          sticky CTA bar is fixed at bottom 0 with z-index 60, so on a phone the
          banner lands squarely on top of the bar and hides the only conversion
          control on the page from exactly the visitors it is meant to help.
          This lifts the banner clear of the bar from inside the guide template;
          scoped to these routes and to phones. */}
      <style dangerouslySetInnerHTML={{ __html: `@media (max-width: 767px){body > div[role="dialog"]{bottom:calc(88px + env(safe-area-inset-bottom, 0px)) !important}}` }} />

      <div style={{ paddingTop: '68px', background: '#fff', minHeight: '100dvh' }}>

        {categoryInfo && (
          <StickyBreadcrumbs
            category={categoryInfo.category}
            categorySlug={categoryInfo.slug}
            title={guide.title}
            basePath={cfg.basePath}
            homeLabel={cfg.homeLabel}
            blogLabel={cfg.blogLabel}
          />
        )}

        <div style={{ background: categoryColors.bg }}>
          <div style={{ padding: '12px 0' }}>
            <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px', display: 'flex', gap: '10px', alignItems: 'center', fontSize: '13px', color: '#4C6459', flexWrap: 'wrap' }}>
              <Link href={cfg.basePath} style={{ color: '#587066', textDecoration: 'none' }}>{cfg.homeLabel}</Link>
              <span>/</span>
              <Link href={`${cfg.basePath}/blog`} style={{ color: '#587066', textDecoration: 'none' }}>{cfg.blogLabel}</Link>
              <span>/</span>
              {categoryInfo && (
                <>
                  <Link href={`${cfg.basePath}/blog/category/${categoryInfo.slug}`} style={{ color: '#587066', textDecoration: 'none' }}>
                    {cfg.catLabel(categoryInfo.category)}
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
                        href={`${cfg.basePath}/blog/category/${categoryInfo.slug}`}
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
                        {cfg.catLabel(guide.category)}
                      </Link>
                      <span style={{ color: 'rgba(0,0,0,0.15)' }}>·</span>
                    </>
                  )}
                  {/* Publication and review shown separately: "last updated"
                      used to show the publication date, which on many guides
                      was one to two tax years old. That was not true. */}
                  <span style={{ fontSize: '13px', color: '#4C6459' }}>{cfg.publishedLabel}{cfg.formatDate(guide.date)}</span>
                  {reviewedDate && (
                    <>
                      <span aria-hidden="true" style={{ color: '#CDE3DB' }}>·</span>
                      <span style={{ fontSize: '13px', color: '#4C6459' }}>{cfg.reviewedLabel}{cfg.formatDate(reviewedDate)}</span>
                    </>
                  )}
                  <span aria-hidden="true" style={{ color: '#CDE3DB' }}>·</span>
                  <span style={{ fontSize: '13px', color: '#4C6459' }}>{cfg.readTimeLabel(readTime)}</span>
                </div>

                <h1
                  className="font-serif font-black"
                  style={{ fontSize: 'clamp(28px, 4.5vw, 42px)', lineHeight: S.h1.lineHeight, letterSpacing: S.h1.letterSpacing, marginBottom: '1rem', color: '#080F0D' }}
                >
                  {guide.title}
                </h1>

                <p className="guide-lead" style={{ fontSize: 'clamp(16.5px, 1.5vw, 18px)', color: '#2A3C34', lineHeight: S.leadLineHeight, marginBottom: '0', fontWeight: 400 }}>
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
              <p style={{ fontSize: '13px', color: '#7A4A00', lineHeight: S.noticeLineHeight, margin: 0 }}>
                {cfg.englishOnlyNotice}
              </p>
            </div>
          )}

          <article style={{ padding: '2rem 0 3rem 0' }} itemScope itemType="https://schema.org/Article">
            <meta itemProp="headline" content={guide.title} />
            <meta itemProp="datePublished" content={publishedIso} />
            <meta itemProp="dateModified" content={modifiedIso} />
            <meta itemProp="author" content="Working Holiday Tax" />
            <GuideArticle guide={guide} locale={cfg.locale} />
          </article>

          {/* About this guide. Replaces the single grey "Written by Working
              Holiday Tax" line, the weakest possible trust signal on a money
              topic. The text describes only what the registered tax agent does
              with the work and never says Working Holiday Tax is one itself.
              No invented author name, no photo, no invented person. */}
          <aside
            aria-labelledby="about-this-guide"
            style={{ maxWidth: '780px', margin: '0 0 2rem 0', padding: '18px 20px', border: '1px solid #E2EFE9', borderRadius: '12px', background: '#F7F9F8' }}
          >
            <p id="about-this-guide" style={{ ...S.asideLabel, margin: '0 0 8px' }}>
              {cfg.aside.label}
            </p>
            <p style={{ fontSize: '15px', color: '#2A3C34', lineHeight: S.asideBodyLineHeight, margin: 0, fontWeight: 400 }}>
              {cfg.aside.p1}
            </p>
            <p style={{ fontSize: '15px', color: '#2A3C34', lineHeight: S.asideBodyLineHeight, margin: '10px 0 0', fontWeight: 400 }}>
              {cfg.aside.p2}
            </p>
            <p style={{ fontSize: '13px', color: '#4C6459', lineHeight: S.asideDateLineHeight, margin: '12px 0 0', fontWeight: 400 }}>
              {cfg.publishedLabel}{cfg.formatDate(guide.date)}{reviewedDate ? ` · ${cfg.reviewedLabel.trim()} ${cfg.formatDate(reviewedDate)}` : ''}
            </p>
          </aside>

          {/* The close. Until this shipped, guide pages carried no conversion
              path in any language while taking most of the site's traffic. */}
          <GuideCta
            category={guide.category}
            slug={guide.slug}
            lang={cfg.locale}
            title={guide.title}
          />

          {relatedGuides.length > 0 && (
            <div style={{ borderTop: '1px solid #E2EFE9', paddingTop: '2.5rem', paddingBottom: '3rem', maxWidth: '780px' }}>
              <p style={{ ...S.relatedHeader, marginBottom: '1.25rem' }}>
                {cfg.whatsNextLabel}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {relatedGuides.map(g => {
                  const gColors = getCategoryColor(g.category)
                  return (
                    <Link key={g.slug} href={`${cfg.basePath}/blog/${g.slug}`} style={{ textDecoration: 'none' }} className="related-link">
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
                            {cfg.catLabel(g.category)}
                          </span>
                          <span style={{ fontSize: '13px', color: '#4C6459' }}>{cfg.readTimeLabel(g.readTime)}</span>
                        </div>
                        <p style={{ fontSize: '15px', fontWeight: 600, color: '#0B5240', marginBottom: '6px', lineHeight: S.relatedTitleLineHeight }}>
                          {g.title}
                        </p>
                        <p style={{ fontSize: '13px', color: '#4C6459', lineHeight: S.relatedDescLineHeight, margin: 0, fontWeight: 400 }}>
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
                      <p style={{ ...S.serviceLabel, margin: '0 0 8px' }}>
                        {cfg.whatWeDoLabel}
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
                    href={`${cfg.basePath}/blog/category/${categoryInfo.slug}`}
                    style={{ fontSize: '15px', color: '#0B5240', fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '8px 0' }}
                  >
                    {cfg.viewAllLabel(cfg.catLabel(categoryInfo.category))}
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

      </div>
      <MobileCta href={waUrl({ topic: 'guide', lang: cfg.locale })} lang={cfg.locale} topic="guide" />
    </>
  )
}
