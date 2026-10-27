import type { Metadata } from 'next'
import { alternatesFor } from '@/lib/svt/pages'
import { LOCALE_META, localePath, type SvtLocale } from '@/lib/svt/i18n'

/** Above this many characters the " | Student Visa Tax" suffix would push an
 *  English or Vietnamese title past what search results show, so it is left
 *  out (the brand is still in og:site_name). */
const SUFFIX_MAX = 40
/** Chinese characters are about twice as wide as Latin letters. */
const SUFFIX_MAX_ZH = 20

/** Title, description, canonical, hreflang and Open Graph for an SVT page. */
export function svtMeta(locale: SvtLocale, path: string, m: { title: string; description: string; absoluteTitle?: boolean }): Metadata {
  return {
    title: m.absoluteTitle ? { absolute: `${m.title} | Student Visa Tax` }
      : m.title.length > (locale === 'zh' ? SUFFIX_MAX_ZH : SUFFIX_MAX) ? { absolute: m.title }
      : m.title,
    description: m.description,
    alternates: alternatesFor(locale, path),
    openGraph: {
      title: m.title, description: m.description, url: localePath(locale, path), locale: LOCALE_META[locale].ogLocale,
      siteName: 'Student Visa Tax', type: 'website',
      // Drawn from the home page's words by scripts/svt-og-images.mjs.
      images: [{ url: `/svt-assets/og/og-${locale}.png`, width: 1200, height: 630, alt: m.title }],
    },
    twitter: { card: 'summary_large_image', title: m.title, description: m.description, images: [`/svt-assets/og/og-${locale}.png`] },
  }
}
