/**
 * Locale independent parts of the guide and category configs for /fr, /it and
 * /es (latin script, same typography knobs as German). Each locale page file
 * supplies only its own strings and keywords.
 */
import type { GuideLocaleConfig, FaqRules } from '@/components/blog/LocaleGuidePage'
import type { CategoryLocaleConfig } from '@/components/blog/LocaleCategoryPage'
import { hasLocalePage, type NewLocale } from '@/lib/locale-pages'

/** '/tfn' becomes '/fr/tfn' only when that page is live in the locale, else the English path. */
export function localePath(locale: NewLocale, path: string): string {
  return hasLocalePage(locale, path) ? `/${locale}${path}` : path
}

export const LATIN_FAQ_RULES: FaqRules = {
  minAnswer: () => 150,
  listAsSentence: (items) => {
    const cleaned = items.map(i => i.replace(/[;,.\s]+$/, '').trim()).filter(Boolean)
    return cleaned.length > 0 ? `${cleaned.join('; ')}.` : ''
  },
  trimToSentence: (text, max) => {
    if (text.length <= max) return text
    const slice = text.slice(0, max)
    const cut = Math.max(slice.lastIndexOf('. '), slice.lastIndexOf('! '), slice.lastIndexOf('? '))
    if (cut > max * 0.5) return slice.slice(0, cut + 1).trim()
    return `${slice.replace(/\s+\S*$/, '').trim()}.`
  },
  joinBlocks: (a, b) => `${a} ${b}`,
  colonCut: (out) => out.lastIndexOf('. '),
  terminalPunctuation: () => '.',
  endsWithPunctuation: /[.!?]$/,
  headingColon: /[.:!?]$/,
}

export const LATIN_GUIDE_STYLES: GuideLocaleConfig['styles'] = {
  h1: { lineHeight: 1.1, letterSpacing: '-0.03em' },
  leadLineHeight: 1.62,
  noticeLineHeight: 1.6,
  asideLabel: { fontSize: '10.5px', fontWeight: 700, color: '#0B5240', letterSpacing: '0.15em', textTransform: 'uppercase' },
  asideBodyLineHeight: 1.65,
  asideDateLineHeight: 1.6,
  relatedHeader: { fontSize: '10.5px', fontWeight: 700, color: '#0B5240', letterSpacing: '0.15em', textTransform: 'uppercase' },
  relatedTitleLineHeight: 1.35,
  relatedDescLineHeight: 1.6,
  serviceLabel: { fontSize: '10.5px', fontWeight: 700, color: '#0B5240', letterSpacing: '0.12em' },
}

export const LATIN_CATEGORY_STYLES: CategoryLocaleConfig['styles'] = {
  countBadge: (color) => ({ fontSize: '10.5px', letterSpacing: '0.15em', color, textTransform: 'uppercase', fontWeight: 600 }),
  h1: { lineHeight: 1.1, letterSpacing: '-0.03em', maxWidth: '720px' },
  introP: { lineHeight: 1.65, maxWidth: '640px' },
  coversHeadingLineHeight: 1.25,
  coversPLineHeight: 1.8,
  cardTitleLineHeight: 1.35,
  cardDescLineHeight: 1.65,
  faqKicker: (color) => ({ fontSize: '10.5px', fontWeight: 700, color, letterSpacing: '0.15em', textTransform: 'uppercase' }),
  faqHeadingLetterSpacing: '-0.025em',
  faqAnswerLineHeight: 1.75,
}

export const ORG_ENTITIES: GuideLocaleConfig['orgEntities'] = [
  { match: /\bATO\b|Australian Taxation Office/, name: 'Australian Taxation Office', sameAs: 'https://www.ato.gov.au/' },
  { match: /Fair Work|Fairwork/i, name: 'Fair Work Ombudsman', sameAs: 'https://www.fairwork.gov.au/' },
  { match: /\bABR\b|Australian Business Register/, name: 'Australian Business Register', sameAs: 'https://www.abr.gov.au/' },
  { match: /Services Australia|Medicare/, name: 'Services Australia', sameAs: 'https://www.servicesaustralia.gov.au/' },
  { match: /Department of Home Affairs/i, name: 'Department of Home Affairs', sameAs: 'https://www.homeaffairs.gov.au/' },
  { match: /myGov|MyGov/, name: 'myGov', sameAs: 'https://my.gov.au/' },
]

export const PLACE_ENTITIES: GuideLocaleConfig['placeEntities'] = [
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

export const WHV_MENTION = /Working Holiday|Work and Holiday|vacances-travail|PVT|417|462/
