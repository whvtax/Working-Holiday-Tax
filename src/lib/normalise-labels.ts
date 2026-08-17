/**
 * Canonical labels for free-text fields.
 *
 * Country and "how did you hear about us" are typed by the client, so the same
 * answer arrives in a dozen spellings: Japan / JAPAN / japan, United Kingdom /
 * United kingdom / England, ChatGPT / Chat GPT / Chat GBT / ChatGP / Chatgpt.
 * The CRM filters listed every one of them as its own category, which made them
 * close to useless - eighteen ChatGPT variants at one client each instead of one
 * entry at eighteen.
 *
 * These functions group the variants for display and filtering only. The value
 * the client typed is never modified: the original stays in the database, so
 * nothing is lost and the mapping can be changed or removed at any time.
 */

/** Lowercase, collapse whitespace, drop punctuation. */
function key(value: string): string {
  return (value ?? '')
    .toLowerCase()
    .replace(/[.,_/\\()'"-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * Country names, including the ones clients write in their own language
 * (Deutschland, Australien) and the constituent countries of the UK, which the
 * ATO treats as United Kingdom.
 */
const COUNTRY_MAP: Record<string, string> = {
  'uk': 'United Kingdom',
  'u k': 'United Kingdom',
  'gb': 'United Kingdom',
  'gbr': 'United Kingdom',
  'england': 'United Kingdom',
  'scotland': 'United Kingdom',
  'wales': 'United Kingdom',
  'northern ireland': 'United Kingdom',
  'great britain': 'United Kingdom',
  'britain': 'United Kingdom',
  'united kingdom': 'United Kingdom',

  'germany': 'Germany',
  'deutschland': 'Germany',
  'german': 'Germany',
  'de': 'Germany',

  'japan': 'Japan',
  'nippon': 'Japan',
  'nihon': 'Japan',
  '日本': 'Japan',
  'jp': 'Japan',

  'australia': 'Australia',
  'australien': 'Australia',
  'australien deutschland': 'Australia',
  'au': 'Australia',
  'aus': 'Australia',

  'ireland': 'Ireland',
  'eire': 'Ireland',
  'republic of ireland': 'Ireland',

  'united states': 'United States',
  'usa': 'United States',
  'us': 'United States',
  'america': 'United States',

  'norway': 'Norway',
  'norge': 'Norway',
  'chile': 'Chile',
  'finland': 'Finland',
  'suomi': 'Finland',
  'israel': 'Israel',
  'turkey': 'Turkey',
  'turkiye': 'Turkey',
  'türkiye': 'Turkey',
  'france': 'France',
  'italy': 'Italy',
  'italia': 'Italy',
  'spain': 'Spain',
  'españa': 'Spain',
  'espana': 'Spain',
  'netherlands': 'Netherlands',
  'holland': 'Netherlands',
  'nederland': 'Netherlands',
  'canada': 'Canada',
  'taiwan': 'Taiwan',
  'south korea': 'South Korea',
  'korea': 'South Korea',
  'hong kong': 'Hong Kong',
  'belgium': 'Belgium',
  'austria': 'Austria',
  'österreich': 'Austria',
  'osterreich': 'Austria',
  'switzerland': 'Switzerland',
  'sweden': 'Sweden',
  'denmark': 'Denmark',
  'poland': 'Poland',
  'czech republic': 'Czech Republic',
  'czechia': 'Czech Republic',
  'estonia': 'Estonia',
  'lithuania': 'Lithuania',
  'latvia': 'Latvia',
  'slovakia': 'Slovakia',
  'slovenia': 'Slovenia',
  'hungary': 'Hungary',
  'portugal': 'Portugal',
  'greece': 'Greece',
  'malta': 'Malta',
  'cyprus': 'Cyprus',
  'argentina': 'Argentina',
  'brazil': 'Brazil',
  'peru': 'Peru',
  'ecuador': 'Ecuador',
  'vietnam': 'Vietnam',
  'indonesia': 'Indonesia',
  'thailand': 'Thailand',
  'philippines': 'Philippines',
  'india': 'India',
  'china': 'China',
  'mongolia': 'Mongolia',
  'new zealand': 'New Zealand',
  'south africa': 'South Africa',
}

/**
 * Where clients say they found us. Matched by prefix as well as exact value,
 * because the ChatGPT family in particular arrives in every possible spelling
 * and new ones keep appearing.
 */
const SOURCE_EXACT: Record<string, string> = {
  'friend': 'Friend',
  'freind': 'Friend',
  'friends': 'Friend',
  'a friend': 'Friend',
  'word of mouth': 'Friend',
  'mate': 'Friend',
  'google': 'Google',
  'google search': 'Google',
  'internet': 'Online search',
  'online': 'Online search',
  'web': 'Online search',
  'website': 'Online search',
  'search': 'Online search',
  'partner': 'Partner',
  'hostel': 'Partner',
  'agent': 'Partner',
  'work': 'Colleague',
  'colleague': 'Colleague',
  'employer': 'Colleague',
  'ai': 'ChatGPT / AI',
  'facebook': 'Facebook',
  'fb': 'Facebook',
  'reddit': 'Reddit',
  'youtube': 'YouTube',
  'whatsapp': 'WhatsApp',
  'email': 'Email',
  'flyer': 'Flyer',
  'poster': 'Flyer',
}

/** Checked in order: the first prefix that matches wins. */
const SOURCE_PREFIX: [string, string][] = [
  ['chat gpt', 'ChatGPT / AI'],
  ['chatgpt', 'ChatGPT / AI'],
  ['chat gbt', 'ChatGPT / AI'],
  ['chatgbt', 'ChatGPT / AI'],
  ['chat gp', 'ChatGPT / AI'],
  ['chatgp', 'ChatGPT / AI'],
  ['gpt', 'ChatGPT / AI'],
  ['open ai', 'ChatGPT / AI'],
  ['openai', 'ChatGPT / AI'],
  ['gemini', 'ChatGPT / AI'],
  ['claude', 'ChatGPT / AI'],
  ['copilot', 'ChatGPT / AI'],
  ['instagram', 'Instagram'],
  ['insta', 'Instagram'],
  ['ig', 'Instagram'],
  ['tik tok', 'TikTok'],
  ['tiktok', 'TikTok'],
  ['tik', 'TikTok'],
  ['google', 'Google'],
  ['friend', 'Friend'],
  ['facebook', 'Facebook'],
  ['youtube', 'YouTube'],
  ['reddit', 'Reddit'],
  ['hostel', 'Partner'],
  ['partner', 'Partner'],
]

/**
 * Canonical country name, or the original value if it isn't recognised.
 *
 * Unrecognised values are returned untouched rather than dropped or bucketed
 * into "Other": a country nobody thought of is still real data, and hiding it
 * would be worse than an extra row in the filter.
 */
export function canonicalCountry(value: string | null | undefined): string {
  const raw = (value ?? '').trim()
  if (!raw) return ''
  return COUNTRY_MAP[key(raw)] ?? raw
}

/** Canonical "how did you hear about us", or the original value. */
export function canonicalSource(value: string | null | undefined): string {
  const raw = (value ?? '').trim()
  if (!raw) return ''
  const k = key(raw)

  const exact = SOURCE_EXACT[k]
  if (exact) return exact

  for (const [prefix, label] of SOURCE_PREFIX) {
    if (k.startsWith(prefix)) return label
  }
  return raw
}

/**
 * Groups values into canonical buckets with a count each, sorted biggest first
 * so the filter list opens on what actually matters.
 */
export function groupByCanonical(
  values: (string | null | undefined)[],
  canonical: (v: string | null | undefined) => string,
): { label: string; count: number }[] {
  const counts = new Map<string, number>()
  for (const v of values) {
    const label = canonical(v)
    if (!label) continue
    counts.set(label, (counts.get(label) ?? 0) + 1)
  }
  return Array.from(counts, ([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label))
}
