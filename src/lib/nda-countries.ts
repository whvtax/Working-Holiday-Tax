/**
 * NDA (Non-Discrimination Agreement) country detection.
 *
 * Used to catch working-holiday visa holders from treaty countries who may
 * actually qualify for Australian *resident* tax rates (often a much bigger
 * refund) before they submit as "Working Holiday Maker" out of habit. The tax
 * form treats this combination as a hard stop so these cases get assessed
 * properly instead of being lodged on the wrong basis. It is NOT a legal
 * determination of residency status (the other conditions - 183 days,
 * ordinary residence, intention to live in Australia - still need to be
 * assessed separately).
 *
 * The "Home Country" field in the tax form is free text, not a dropdown, so
 * this matches common real-world spellings/aliases people actually type -
 * including German and Japanese country names, since the form UI is offered
 * in those languages.
 */
export const NDA_COUNTRIES = [
  'United Kingdom', 'Germany', 'Japan', 'Chile', 'Finland', 'Israel', 'Norway', 'Turkey',
] as const

const NDA_COUNTRY_PATTERNS: RegExp[] = [
  /\bchile\b/i,
  /チリ/,
  /\bfinland\b|\bfinnland\b/i,
  /フィンランド/,
  /\bgermany\b|\bdeutschland\b|\bgerman\b/i,
  /ドイツ/,
  /\bisrael\b/i,
  /イスラエル/,
  /ישראל/,
  /\bjapan\b/i,
  /日本/,
  /\bnorway\b|\bnorwegen\b/i,
  /ノルウェー/,
  /\bturkey\b|\bturkiye\b|\bt[üu]rkiye\b|\bt[üu]rkei\b/i,
  /トルコ/,
  /\b(united kingdom|u\.?k\.?|england|scotland|wales|northern ireland|britain|great britain|gro(ß|ss)britannien|vereinigtes k[öo]nigreich)\b/i,
  /イギリス|英国/,
]

export function isNdaCountry(raw: string | null | undefined): boolean {
  const v = (raw ?? '').trim()
  if (!v) return false
  return NDA_COUNTRY_PATTERNS.some(re => re.test(v))
}
