/**
 * Service hubs (services-en.ts: /tfn, /superannuation) in Chinese and
 * Vietnamese. Same mechanism as guides-i18n.ts: the STRUCTURE (slug, section
 * ids, block kinds, sources, related) is the English hub; a language file
 * supplies only the words (services-zh.ts, services-vi.ts).
 *
 * A hub has a /zh or /vi page, hreflang alternate, sitemap entry and menu
 * link exactly when that language has a text for it here (hubLocales).
 */
import type { SvtLocale } from '@/lib/svt/i18n'
import type { GuideContent } from './guides-en'
import { checkTexts, localize, type GuideText } from './guides-i18n'
import { SERVICE_HUBS_EN, serviceHubEn } from './services-en'
import { SERVICE_HUBS_ZH } from './services-zh'
import { SERVICE_HUBS_VI } from './services-vi'

const TEXTS: Readonly<Record<Exclude<SvtLocale, 'en'>, Readonly<Record<string, GuideText>>>> = {
  zh: SERVICE_HUBS_ZH,
  vi: SERVICE_HUBS_VI,
}

/** The hub for a language, or undefined when it has no text in that language. */
export function serviceHubFor(locale: SvtLocale, slug: string): GuideContent | undefined {
  const en = serviceHubEn(slug)
  if (!en || locale === 'en') return en
  return TEXTS[locale][slug] ? localize([en], TEXTS[locale])[0] : undefined
}

/** Languages a hub exists in (English always first). */
export function hubLocales(slug: string): SvtLocale[] {
  if (!serviceHubEn(slug)) return []
  return ['en', ...(['zh', 'vi'] as const).filter(l => !!TEXTS[l][slug])]
}

/** Problems with a language's hub texts against the English hub shape. */
export const checkServiceHubText = (locale: Exclude<SvtLocale, 'en'>) =>
  checkTexts(SERVICE_HUBS_EN.filter(h => !!TEXTS[locale][h.slug]), TEXTS[locale])
