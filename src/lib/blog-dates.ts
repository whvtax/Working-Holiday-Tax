/**
 * Guide dates are authored as English strings like "29 July 2026".
 * Schema.org (datePublished/dateModified) expects ISO 8601, and the DE/JA
 * pages should show the date in their own language rather than raw English.
 * All three helpers fall back to the input string if it doesn't match the
 * expected "D Month YYYY" shape, so a malformed date never breaks a page.
 */

const MONTHS: Record<string, number> = {
  january: 1, february: 2, march: 3, april: 4, may: 5, june: 6,
  july: 7, august: 8, september: 9, october: 10, november: 11, december: 12,
}

const MONTHS_DE = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember']

function parseGuideDateParts(s: string): { d: number; m: number; y: number } | null {
  const match = /^(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})$/.exec((s || '').trim())
  if (!match) return null
  const m = MONTHS[match[2].toLowerCase()]
  if (!m) return null
  return { d: parseInt(match[1], 10), m, y: parseInt(match[3], 10) }
}

/** "29 July 2026" → "2026-07-29" (ISO 8601 for schema.org). */
export function isoGuideDate(s: string): string {
  const p = parseGuideDateParts(s)
  if (!p) return s
  return `${p.y}-${String(p.m).padStart(2, '0')}-${String(p.d).padStart(2, '0')}`
}

/** "29 July 2026" → "29. Juli 2026". */
export function formatGuideDateDe(s: string): string {
  const p = parseGuideDateParts(s)
  if (!p) return s
  return `${p.d}. ${MONTHS_DE[p.m - 1]} ${p.y}`
}

/** "29 July 2026" → "2026年7月29日". */
export function formatGuideDateJa(s: string): string {
  const p = parseGuideDateParts(s)
  if (!p) return s
  return `${p.y}年${p.m}月${p.d}日`
}

/**
 * The date the guide corpus was last revised, in all three languages.
 *
 * This lived as an unread private constant in each of the three
 * `blog/[slug]/page.tsx` files. It is the one date the codebase actually
 * substantiates for a corpus-wide revision, so it lives here once and is
 * imported by the three article pages and by the sitemap, which have to agree:
 * an Article saying dateModified 2026-08-22 while the sitemap says lastmod
 * 2024-07-01 for the same URL is worse than either alone.
 *
 * Only move this when the corpus is actually revised again.
 */
export const CORPUS_REVISED = '2026-08-22'

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/

/** Today as "YYYY-MM-DD", in UTC so it does not shift with the build machine. */
function todayIso(): string {
  return new Date().toISOString().slice(0, 10)
}

/**
 * The dateModified / lastmod for one guide, as an ISO date.
 *
 * Precedence: an explicit per-guide `reviewed` date beats the corpus-wide
 * revision date, which beats the publication date.
 *
 * Two invariants, both of which schema.org requires and Google enforces by
 * dropping the field when they are broken:
 *   - never earlier than datePublished;
 *   - never in the future.
 * Anything that does not parse as an ISO date falls back to the publication
 * date, so a malformed constant understates the revision rather than
 * asserting a date that cannot be justified.
 *
 * ISO dates sort lexicographically, so plain string comparison is correct here.
 */
export function guideModifiedIso(
  publishedIso: string,
  revisedIso: string = CORPUS_REVISED,
  reviewedDate?: string,
  today: string = todayIso(),
): string {
  const candidate = reviewedDate ? isoGuideDate(reviewedDate) : revisedIso
  if (!ISO_DATE.test(candidate) || !ISO_DATE.test(publishedIso)) return publishedIso
  const notFuture = ISO_DATE.test(today) && candidate > today ? today : candidate
  return notFuture < publishedIso ? publishedIso : notFuture
}
