/**
 * NDA (Non-Discrimination Agreement) country detection.
 *
 * Used to nudge working-holiday visa holders who may actually qualify for
 * Australian *resident* tax rates (often a much bigger refund) instead of
 * defaulting to "Working Holiday Maker" out of habit. This is a soft UI
 * signal only - it never blocks submission and is NOT a legal determination
 * of residency status (the other conditions - 183 days, ordinary residence,
 * intention to live in Australia - still need to be assessed separately).
 *
 * The "Home Country" field in the tax form is free text, not a dropdown, so
 * this matches common real-world spellings/aliases people actually type
 * rather than requiring the exact official country name.
 */
export const NDA_COUNTRIES = [
  'United Kingdom', 'Germany', 'Japan', 'Chile', 'Finland', 'Israel', 'Norway', 'Turkey',
] as const

const NDA_COUNTRY_PATTERNS: RegExp[] = [
  /\bchile\b/i,
  /\bfinland\b/i,
  /\bgermany\b|\bdeutschland\b|\bgerman\b/i,
  /\bisrael\b/i,
  /\bjapan\b/i,
  /\bnorway\b/i,
  /\bturkey\b|\bturkiye\b|\bt[üu]rkiye\b/i,
  /\b(united kingdom|u\.?k\.?|england|scotland|wales|northern ireland|britain|great britain)\b/i,
]

export function isNdaCountry(raw: string | null | undefined): boolean {
  const v = (raw ?? '').trim()
  if (!v) return false
  return NDA_COUNTRY_PATTERNS.some(re => re.test(v))
}
