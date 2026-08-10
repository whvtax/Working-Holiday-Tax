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
