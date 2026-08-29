import { SITE_URL } from '@/lib/constants'
import { catLabelJa } from '@/lib/category-labels'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { guides, getCategoryColor } from '@/app/(site)/blog/data'
import GuideArticle from '@/app/(site)/blog/[slug]/GuideArticle'
import StickyBreadcrumbs from '@/app/(site)/blog/[slug]/StickyBreadcrumbs'
import CategoryHero from '@/app/(site)/blog/[slug]/CategoryHero'

import { isoGuideDate, guideModifiedIso, formatGuideDateJa } from '@/lib/blog-dates'
import { getJapaneseGuide, jaCategoryMeta, blogUI } from '../data'
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
  // Generate for all English posts - Japanese blog mirrors them
  return guides.map(g => ({ slug: g.slug }))
}

// Per-category keyword expansions - dynamically applied per blog post
const CATEGORY_KEYWORDS: Record<string, string[]> = {
  'TFN': [
    'TFN 申請 ワーホリ',
    'タックスファイルナンバー 取得',
    'TFN 417ビザ',
    'TFN 462ビザ',
    'TFN タックスリターン 還付',
  ],
  'ABN': [
    'ABN 登録 ワーホリ',
    'Australian Business Number ワーホリ',
    'ワーホリ 個人事業主',
    'ABN 417ビザ',
    'ABN 462ビザ',
  ],
  'Tax Return': [
    'オーストラリア タックスリターン 還付金',
    'ワーホリ タックスリターン',
    'タックスリターン 還付 417ビザ',
    'タックスリターン 還付 462ビザ',
    'ワーホリ 帰国後 タックスリターン',
    'オーストラリア 確定申告 ワーホリ',
  ],
  'Super': [
    'スーパー 返金 オーストラリア',
    'DASP 申請',
    'スーパーアニュエーション 返金 ワーホリ',
    'Departing Australia Superannuation Payment',
    'スーパー 返金 417ビザ',
  ],
  'Work Rights': [
    'ワーホリ 労働者の権利 オーストラリア',
    'Fair Work オーストラリア ワーホリ',
    'ワーホリ 雇用条件',
    '417ビザ 労働条件',
    '462ビザ 労働条件',
  ],
  'Medicare & Other': [
    'メディケア 税 免除 ワーホリ',
    'メディケア ワーキングホリデー',
    'RHCA オーストラリア',
    'メディケア 免除 417ビザ',
    'メディケア 免除 462ビザ',
  ],
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const result = getJapaneseGuide(params.slug)
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
      // Core working holiday tax refund keywords (Japanese)
      'オーストラリア タックスリターン 還付金',
      'オーストラリア ワーホリ 税金',
      'ワーキングホリデービザ オーストラリア',
      '417ビザ オーストラリア',
      '462ビザ オーストラリア',
      'バックパッカー 税金 オーストラリア',
      'WHM 税金',
      'WHV 税金',
      // Category-specific
      ...categoryKeywords,
      // Post-specific
      guide.category,
      guide.title,
    ],
    alternates: {
      // When the post body is still English (not yet translated), point the
      // canonical at the English source so Google doesn't index duplicate
      // English content under a /ja/ URL.
      canonical: isTranslated
        ? `${SITE_URL}/ja/blog/${guide.slug}`
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
      url: `${SITE_URL}/ja/blog/${guide.slug}`,
      type: 'article',
      siteName: 'Working Holiday Tax',
      locale: 'ja_JP',
    },
    twitter: {
      images: [`${SITE_URL}${ogForCategory(guide.category)}`],
      card: 'summary_large_image',
      title: guide.title,
      description: guide.description,
    },
    robots: {
      // Don't index untranslated (English-bodied) posts under /ja - avoids
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
    path: '/ja/tfn',
    label: 'TFNと申告フォームについて当社がすること',
    blurb: '番号の取得は無料で10分です。金額を左右するのは雇用主に出す申告フォームで、そこを当社が担当します。',
  },
  'ABN': {
    path: '/ja/abn',
    label: 'ABNで請求していた場合に当社がすること',
    blurb: '給与と請求による収入は課税の扱いも申告書での位置も異なります。この切り分けを正しく行うことが実際の作業です。',
  },
  'Tax Return': {
    path: '/ja/tax-return',
    label: 'すべてのタックスリターンで当社が確認すること',
    blurb: '税務上の居住区分、誤った税率で引かれていた期間、メディケア税の扱い、そして実際にした仕事に対応する控除。',
  },
  'Super': {
    path: '/ja/superannuation',
    label: '出国前にスーパーについて当社がすること',
    blurb: 'カジュアル勤務ではスーパーが複数のファンドに分散します。TFNからすべての口座を探し、正しい順序で一度に申請します。',
  },
  'Medicare & Other': {
    path: '/ja/medicare',
    label: 'メディケア税について当社がすること',
    blurb: 'メディケア税は自動的に引かれます。免除には自分で申請する証明書が必要で、ワーホリの申告で最も見落とされやすい項目です。',
  },
  'Work Rights': {
    path: '/ja/tax-return',
    label: 'すべてのタックスリターンで当社が確認すること',
    blurb: '給与や労働時間に関わることは、たいていタックスリターンにも表れます。',
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
    // Get Japanese versions of related guides
    .map(x => {
      const result = getJapaneseGuide(x.g.slug)
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
   Same rewrite as the English template. The old extractor walked from a
   question H2 to the first non-empty line and stopped at the first bullet, so
   on the house pattern of question, colon terminated lead in, bullet list, it
   published the lead in and threw the answer away. The median published answer
   was 68 characters.

   It now reads the whole section as ordered blocks and joins them into one
   paragraph. Prose first. A list is pulled in only where it completes an open
   colon, or where the prose alone is too short to be an answer. Anything that
   still cannot produce a usable answer is omitted rather than published as a
   fragment.

   The length floor is measured in characters, so it is language aware:
   Japanese carries roughly twice the meaning per character, and a 150
   character floor would reject perfectly complete Japanese answers. Bodies
   that have not been translated yet are still English and are measured on the
   English floor.                                                            */

const FAQ_MIN_ANSWER_EN = 150
const FAQ_MIN_ANSWER_JA = 70
const FAQ_TARGET_ANSWER = 400
const FAQ_MAX_ANSWER = 900

/** Japanese text is far denser per character, so the floor moves with it. */
function faqMinAnswer(text: string): number {
  return /[぀-ヿ㐀-䶿一-鿿]/.test(text) ? FAQ_MIN_ANSWER_JA : FAQ_MIN_ANSWER_EN
}

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
  const cleaned = items.map(i => i.replace(/[;,.\s、。]+$/, '').trim()).filter(Boolean)
  if (cleaned.length === 0) return ''
  const japanese = /[぀-ヿ㐀-䶿一-鿿]/.test(cleaned.join(''))
  return japanese ? `${cleaned.join('、')}。` : `${cleaned.join('; ')}.`
}

function trimToSentence(text: string, max: number): string {
  if (text.length <= max) return text
  const slice = text.slice(0, max)
  const cut = Math.max(slice.lastIndexOf('. '), slice.lastIndexOf('。'), slice.lastIndexOf('! '), slice.lastIndexOf('? '))
  if (cut > max * 0.5) return slice.slice(0, cut + 1).trim()
  // A truncated Japanese answer ends with the ideographic full stop, not '.'.
  const ja = /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff]/.test(slice)
  if (ja) return `${slice.replace(/[\s、]+[^、。]*$/, '').trim()}。`
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
      if (t) blocks.push({ type: 'p', text: /[.:!?：。]$/.test(t) ? t : `${t}:` })
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

/** Japanese runs unspaced, so blocks are joined with nothing at all. */
const isJa = (t: string) => /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff]/.test(t)
const joinBlocks = (a: string, b: string) => (isJa(a) || isJa(b) ? `${a}${b}` : `${a} ${b}`)

function buildFaqAnswer(blocks: FaqBlock[]): string {
  let out = ''
  for (const b of blocks) {
    const openColon = /[:：]$/.test(out)
    if (out.length >= FAQ_TARGET_ANSWER && !openColon) break
    if (b.type === 'p') {
      out = out ? joinBlocks(out, b.text) : b.text
      continue
    }
    if (!openColon && out.length >= faqMinAnswer(out)) continue
    const rendered = listAsSentence(b.items)
    if (!rendered) continue
    out = out ? joinBlocks(out, rendered) : rendered
  }

  out = out.replace(/\s+/g, ' ').trim()
  if (/[:：]$/.test(out)) {
    const cut = Math.max(out.lastIndexOf('. '), out.lastIndexOf('。'))
    out = cut > 0 ? out.slice(0, cut + 1).trim() : ''
  }
  if (!out) return ''
  if (!/[.!?。！？]$/.test(out)) out += '。'
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
    if (!answer || answer.length < faqMinAnswer(answer)) continue

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

// Extract numbered steps for HowTo schema
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
      // For Japanese, use first 30 chars as name (Japanese chars are wider)
      const name = text.length > 30 ? text.substring(0, 27) + '...' : text
      steps.push({ name, text })
    }
  }
  return steps
}

// Detect if post is a "how-to" by slug
function isHowToPost(slug: string): boolean {
  return slug.startsWith('how-to-') || slug.includes('how-to-')
}

// Detect if post is a question (slug-based, since titles are translated)
function isQuestionPost(slug: string, title: string): boolean {
  // Original English question patterns from slug
  const questionSlugPatterns = [
    'what-', 'when-', 'why-', 'can-', 'do-you-', 'does-', 'should-',
    'is-', 'are-', 'will-', 'has-', 'have-', 'how-many-', 'how-much-',
    'how-long-',
  ]
  if (questionSlugPatterns.some(p => slug.startsWith(p))) return true
  // Japanese question markers in title
  if (title.includes('？') || title.includes('?')) return true
  if (title.endsWith('か')) return true
  return false
}

// Extract entity mentions from body for Article schema "mentions" field
function extractMentions(body: string, _category: string): Array<{ '@type': string; name: string; sameAs?: string }> {
  const mentions: Array<{ '@type': string; name: string; sameAs?: string }> = []

  // Australian government entities
  const orgEntities = [
    { match: /\bATO\b|Australian Taxation Office|オーストラリア税務署|オーストラリア国税局/, name: 'Australian Taxation Office', sameAs: 'https://www.ato.gov.au/' },
    { match: /Fair Work|フェアワーク/i, name: 'Fair Work Ombudsman', sameAs: 'https://www.fairwork.gov.au/' },
    { match: /\bABR\b|Australian Business Register/, name: 'Australian Business Register', sameAs: 'https://www.abr.gov.au/' },
    { match: /Services Australia|Medicare|メディケア/, name: 'Services Australia', sameAs: 'https://www.servicesaustralia.gov.au/' },
    { match: /Department of Home Affairs|内務省/, name: 'Department of Home Affairs', sameAs: 'https://www.homeaffairs.gov.au/' },
    { match: /myGov|MyGov/, name: 'myGov', sameAs: 'https://my.gov.au/' },
  ]
  for (const ent of orgEntities) {
    if (ent.match.test(body)) {
      mentions.push({ '@type': 'Organization', name: ent.name, sameAs: ent.sameAs })
    }
  }

  // Places (Japanese readers know cities in both English and Japanese forms)
  const placeEntities = [
    { match: /\bSydney\b|シドニー/, name: 'Sydney', sameAs: 'https://en.wikipedia.org/wiki/Sydney' },
    { match: /\bMelbourne\b|メルボルン/, name: 'Melbourne', sameAs: 'https://en.wikipedia.org/wiki/Melbourne' },
    { match: /\bBrisbane\b|ブリスベン/, name: 'Brisbane', sameAs: 'https://en.wikipedia.org/wiki/Brisbane' },
    { match: /\bPerth\b|パース/, name: 'Perth', sameAs: 'https://en.wikipedia.org/wiki/Perth' },
    { match: /\bAdelaide\b|アデレード/, name: 'Adelaide', sameAs: 'https://en.wikipedia.org/wiki/Adelaide' },
    { match: /\bDarwin\b|ダーウィン/, name: 'Darwin', sameAs: 'https://en.wikipedia.org/wiki/Darwin,_Northern_Territory' },
    { match: /\bCairns\b|ケアンズ/, name: 'Cairns', sameAs: 'https://en.wikipedia.org/wiki/Cairns' },
    { match: /\bCanberra\b|キャンベラ/, name: 'Canberra', sameAs: 'https://en.wikipedia.org/wiki/Canberra' },
    { match: /\bHobart\b|ホバート/, name: 'Hobart', sameAs: 'https://en.wikipedia.org/wiki/Hobart' },
    { match: /Gold Coast|ゴールドコースト/, name: 'Gold Coast', sameAs: 'https://en.wikipedia.org/wiki/Gold_Coast,_Queensland' },
  ]
  for (const ent of placeEntities) {
    if (ent.match.test(body)) {
      mentions.push({ '@type': 'Place', name: ent.name, sameAs: ent.sameAs })
    }
  }

  // Working Holiday Visa
  if (/Working Holiday|417|462|WHV|ワーキングホリデー|ワーホリ/.test(body)) {
    mentions.push({
      '@type': 'Thing',
      name: 'Working Holiday Visa (Australia)',
      sameAs: 'https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/work-holiday-417',
    })
  }

  return mentions
}

// Map slug/category to relevant official citations
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

export default function JapaneseGuidePage({ params }: Props) {
  const result = getJapaneseGuide(params.slug)
  if (!result) notFound()
  const { guide, isTranslated } = result

  // Look up Japanese category meta by category name → find slug
  const categoryInfo = jaCategoryMeta.find(c => c.category === guide.category)
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
  // The corpus was reframed on CORPUS_REVISED, and until now nothing read
  // that constant: dateModified mirrored datePublished on every article, so
  // guides revised in August 2026 told search engines they had not been
  // touched since July 2024. guideModifiedIso applies the per-guide `reviewed`
  // date where one exists, falls back to the corpus revision date, and clamps
  // the result so it is never before publication and never in the future.
  const modifiedIso = guideModifiedIso(publishedIso, undefined, reviewedDate)

  // Set inLanguage based on whether body is Japanese or still English
  const articleLang = isTranslated ? 'ja' : 'en-AU'

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
      description: 'Working Holiday Taxが作成した内容を確認し承認する登録税理士（registered tax agent）。',
    },
    author: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#business`,
      name: 'Working Holiday Tax',
      url: `${SITE_URL}`,
      description: 'ワーキングホリデーメーカー（ビザサブクラス417・462）の税務サポートを専門とするオーストラリアのサービスです。',
      knowsAbout: [
        'オーストラリア税法',
        'ワーキングホリデービザ（サブクラス417・462）',
        'タックスファイルナンバー（TFN）',
        'オーストラリアビジネスナンバー（ABN）',
        'スーパーアニュエーション・DASP',
        'メディケア税',
        'フェアワーク（Fair Work Australia）',
      ],
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#business`,
      name: 'Working Holiday Tax',
      url: `${SITE_URL}`,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/icon-512.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/ja/blog/${guide.slug}` },
    audience: { '@type': 'Audience', name: 'オーストラリアのワーキングホリデービザ保持者（サブクラス417・462）' },
    about: [
      { '@type': 'Thing', name: 'オーストラリアのワーキングホリデービザ' },
      { '@type': 'Thing', name: guide.category },
    ],
    ...(mentions.length > 0 && { mentions }),
    keywords: [
      'Working Holiday Tax',
      'オーストラリア',
      '417ビザ',
      '462ビザ',
      guide.category,
      'バックパッカー 税金',
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
    inLanguage: 'ja',
    totalTime: `PT${readTime}M`,
    step: howToSteps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
      url: `${SITE_URL}/ja/blog/${guide.slug}#step-${i + 1}`,
    })),
  } : null

  // QAPage schema - for question-style posts
  const qaPageLd = (isTranslated && isQuestionPost(guide.slug, guide.title) && !howToLd) ? {
    '@context': 'https://schema.org',
    '@type': 'QAPage',
    inLanguage: 'ja',
    mainEntity: {
      '@type': 'Question',
      name: guide.title,
      text: guide.title,
      answerCount: 1,
      acceptedAnswer: {
        '@type': 'Answer',
        text: leadParagraph,
        inLanguage: 'ja',
        author: { '@type': 'Organization', name: 'Working Holiday Tax' },
        // No upvoteCount. It was hard coded to 1, which is a fabricated
        // engagement signal on a page that has no votes at all.
        url: `${SITE_URL}/ja/blog/${guide.slug}`,
      },
    },
  } : null

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'ホーム', item: `${SITE_URL}/ja` },
      { '@type': 'ListItem', position: 2, name: 'ブログ', item: `${SITE_URL}/ja/blog` },
      ...(categoryInfo
        ? [{ '@type': 'ListItem', position: 3, name: categoryInfo.category, item: `${SITE_URL}/ja/blog/category/${categoryInfo.slug}` }]
        : []),
      { '@type': 'ListItem', position: categoryInfo ? 4 : 3, name: guide.title, item: `${SITE_URL}/ja/blog/${guide.slug}` },
    ],
  }

  const faqLd = (faqs.length > 0 && isTranslated) ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: 'ja',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
        // Every H2 carries a slugified id, so each answer gets a deep link to
        // the exact passage, which is what turns a page level citation into a
        // passage level one. The slug rule strips everything that is not a
        // latin letter or a digit, so a fully Japanese heading yields nothing
        // to link to and the url is left off rather than pointing at a bare
        // hash.
        ...(f.anchor ? { url: `${SITE_URL}/ja/blog/${guide.slug}#${f.anchor}` } : {}),
      },
    })),
  } : null

  const webPageLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}/ja/blog/${guide.slug}`,
    url: `${SITE_URL}/ja/blog/${guide.slug}`,
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
            basePath="/ja"
            homeLabel="ホーム"
            blogLabel="ブログ"
          />
        )}

        <div style={{ background: categoryColors.bg }}>
          <div style={{ padding: '12px 0' }}>
            <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px', display: 'flex', gap: '10px', alignItems: 'center', fontSize: '13px', color: '#4C6459', flexWrap: 'wrap' }}>
              <Link href="/ja" style={{ color: '#587066', textDecoration: 'none' }}>ホーム</Link>
              <span>/</span>
              <Link href="/ja/blog" style={{ color: '#587066', textDecoration: 'none' }}>ブログ</Link>
              <span>/</span>
              {categoryInfo && (
                <>
                  <Link href={`/ja/blog/category/${categoryInfo.slug}`} style={{ color: '#587066', textDecoration: 'none' }}>
                    {catLabelJa(categoryInfo.category)}
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
                        href={`/ja/blog/category/${categoryInfo.slug}`}
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
                        {catLabelJa(guide.category)}
                      </Link>
                      <span style={{ color: 'rgba(0,0,0,0.15)' }}>·</span>
                    </>
                  )}
                  {/* 「最終更新」は公開日を表示していたため、1年から2年前の
                      日付が更新日として出ていました。事実と違うので、公開日と
                      確認日を分けて表示します。 */}
                  <span style={{ fontSize: '13px', color: '#4C6459' }}>公開日 {formatGuideDateJa(guide.date)}</span>
                  {reviewedDate && (
                    <>
                      <span aria-hidden="true" style={{ color: '#CDE3DB' }}>·</span>
                      <span style={{ fontSize: '13px', color: '#4C6459' }}>確認日 {formatGuideDateJa(reviewedDate)}</span>
                    </>
                  )}
                  <span aria-hidden="true" style={{ color: '#CDE3DB' }}>·</span>
                  <span style={{ fontSize: '13px', color: '#4C6459' }}>{readTime}分で読めます</span>
                </div>

                <h1
                  className="font-serif font-black"
                  style={{ fontSize: 'clamp(28px, 4.5vw, 42px)', lineHeight: 1.2, letterSpacing: '-0.02em', marginBottom: '1rem', color: '#080F0D' }}
                >
                  {guide.title}
                </h1>

                <p className="guide-lead" style={{ fontSize: 'clamp(16.5px, 1.5vw, 18px)', color: '#2A3C34', lineHeight: 1.8, marginBottom: '0', fontWeight: 400 }}>
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
              <p style={{ fontSize: '13px', color: '#7A4A00', lineHeight: 1.75, margin: 0 }}>
                {blogUI.englishOnlyNotice}
              </p>
            </div>
          )}

          <article style={{ padding: '2rem 0 3rem 0' }} itemScope itemType="https://schema.org/Article">
            <meta itemProp="headline" content={guide.title} />
            <meta itemProp="datePublished" content={publishedIso} />
            <meta itemProp="dateModified" content={modifiedIso} />
            <meta itemProp="author" content="Working Holiday Tax" />
            <GuideArticle guide={guide} locale="ja" />
          </article>

          {/* このガイドについて。
              これまでは「Written by Working Holiday Tax」という一行だけで、
              お金に関わるテーマとしては最も弱い信頼シグナルでした。
              登録税理士が「作業に対して何をするか」だけを書き、当社自身が
              登録税理士であるとは決して書きません。実在しない著者名も
              写真も作りません。 */}
          <aside
            aria-labelledby="about-this-guide"
            style={{ maxWidth: '780px', margin: '0 0 2rem 0', padding: '18px 20px', border: '1px solid #E2EFE9', borderRadius: '12px', background: '#F7F9F8' }}
          >
            <p id="about-this-guide" style={{ fontSize: '13px', fontWeight: 700, color: '#0B5240', letterSpacing: '0.08em', margin: '0 0 8px' }}>
              このガイドについて
            </p>
            <p style={{ fontSize: '15px', color: '#2A3C34', lineHeight: 1.85, margin: 0, fontWeight: 400 }}>
              417・462ビザ保持者だけを専門に扱うWorking Holiday Taxチームが執筆し、ATOおよびFair Workの最新ガイダンスに基づいて確認しています。一般的な情報であり、個別の税務アドバイスではありません。
            </p>
            <p style={{ fontSize: '15px', color: '#2A3C34', lineHeight: 1.85, margin: '10px 0 0', fontWeight: 400 }}>
              申告書は、ATOへ提出する前に登録税理士が確認し、承認します。
            </p>
            <p style={{ fontSize: '13px', color: '#4C6459', lineHeight: 1.7, margin: '12px 0 0', fontWeight: 400 }}>
              公開日 {formatGuideDateJa(guide.date)}{reviewedDate ? ` · 確認日 ${formatGuideDateJa(reviewedDate)}` : ''}
            </p>
          </aside>

          {/* The close. Until this shipped, guide pages carried no conversion
              path in any language while taking most of the site's traffic. */}
          <GuideCta
            category={guide.category}
            slug={guide.slug}
            lang="ja"
            title={guide.title}
          />

          {relatedGuides.length > 0 && (
            <div style={{ borderTop: '1px solid #E2EFE9', paddingTop: '2.5rem', paddingBottom: '3rem', maxWidth: '780px' }}>
              <p style={{ fontSize: '13px', fontWeight: 700, color: '#0B5240', letterSpacing: '0.08em', marginBottom: '1.25rem' }}>
                次に読むもの
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {relatedGuides.map(g => {
                  const gColors = getCategoryColor(g.category)
                  return (
                    <Link key={g.slug} href={`/ja/blog/${g.slug}`} style={{ textDecoration: 'none' }} className="related-link">
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
                            {catLabelJa(g.category)}
                          </span>
                          <span style={{ fontSize: '13px', color: '#4C6459' }}>{g.readTime}分で読めます</span>
                        </div>
                        <p style={{ fontSize: '15px', fontWeight: 600, color: '#0B5240', marginBottom: '6px', lineHeight: 1.45 }}>
                          {g.title}
                        </p>
                        <p style={{ fontSize: '13px', color: '#4C6459', lineHeight: 1.8, margin: 0, fontWeight: 400 }}>
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
                      <p style={{ fontSize: '13px', fontWeight: 700, color: '#0B5240', letterSpacing: '0.08em', margin: '0 0 8px' }}>
                        当社がすること
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
                    href={`/ja/blog/category/${categoryInfo.slug}`}
                    style={{ fontSize: '15px', color: '#0B5240', fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '8px 0' }}
                  >
                    {catLabelJa(categoryInfo.category)}の記事をすべて見る →
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
      <MobileCta href={waUrl({ topic: "guide", lang: "ja" })} lang="ja" topic="guide" />
    </>
  )
}
