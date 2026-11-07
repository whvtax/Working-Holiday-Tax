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

const MONTHS_FR = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre']
const MONTHS_IT = ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre']
const MONTHS_ES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']

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

/** "1 July 2024" → "1er juillet 2024" (French uses 1er for the first, plain numerals after). */
export function formatGuideDateFr(s: string): string {
  const p = parseGuideDateParts(s)
  if (!p) return s
  return `${p.d === 1 ? '1er' : p.d} ${MONTHS_FR[p.m - 1]} ${p.y}`
}

/** "1 July 2024" → "1 luglio 2024" (Italian months are lower case). */
export function formatGuideDateIt(s: string): string {
  const p = parseGuideDateParts(s)
  if (!p) return s
  return `${p.d} ${MONTHS_IT[p.m - 1]} ${p.y}`
}

/** "1 July 2024" → "1 de julio de 2024". */
export function formatGuideDateEs(s: string): string {
  const p = parseGuideDateParts(s)
  if (!p) return s
  return `${p.d} de ${MONTHS_ES[p.m - 1]} de ${p.y}`
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

/** "2026-11-03" → "3 November 2026", the authored shape every formatGuideDate* helper reads. */
const MONTHS_EN = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
export function guideDateFromIso(iso: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || '')
  if (!m) return iso
  const month = MONTHS_EN[parseInt(m[2], 10) - 1]
  if (!month) return iso
  return `${parseInt(m[3], 10)} ${month} ${m[1]}`
}

/**
 * The date the French, Italian and Spanish sections went live (ADR 013).
 *
 * Their guides mirror the English slugs and used to inherit the English
 * publication date, so a French guide written in November 2026 claimed, on
 * the page and in its Article schema, to have been published in July 2024.
 * A localized version cannot predate its own launch, so this is the floor
 * for datePublished (and therefore for dateModified and sitemap lastmod).
 *
 * Move a value only if the launch date of that language is corrected.
 */
export const NEW_LOCALE_LIVE: Record<'fr' | 'it' | 'es', string> = {
  fr: '2026-11-03',
  it: '2026-11-03',
  es: '2026-11-03',
}

/**
 * datePublished for a guide in a given language, as an ISO date.
 * en / de / ja: the authored date. fr / it / es: the authored date, but never
 * earlier than the day that language went live.
 */
export function localePublishedIso(locale: string, date: string): string {
  const iso = isoGuideDate(date)
  const floor = (NEW_LOCALE_LIVE as Record<string, string | undefined>)[locale]
  if (!floor || !ISO_DATE.test(iso)) return iso
  return iso < floor ? floor : iso
}

/**
 * <lastmod> for static pages (home, service, expense, contact, about,
 * category and blog index pages) in every language. Titles, descriptions and
 * page copy were reworked across all six languages on this date.
 *
 * scripts/generate-llms.mjs reads this constant from this file, so the two
 * sitemaps cannot disagree. Move it when those pages actually change.
 */
export const PAGES_REVISED = '2026-11-05'
