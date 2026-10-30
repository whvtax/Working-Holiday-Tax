/**
 * Every public Student Visa Tax page, in one list. The SVT sitemap is built
 * from it, so a page that is not listed here is not advertised to search
 * engines. `indexable: false` keeps a page out of the sitemap (and the page
 * itself must also carry robots noindex).
 *
 * Paths are the PUBLIC paths on studentvisatax.com.au, never /svt-site/...
 */
import { GUIDES_EN } from '@/lib/svt/content/guides-en'
import { guidesFor } from '@/lib/svt/content/guides-i18n'
import { BLOG_EN } from '@/lib/svt/content/blog-en'
import { blogFor } from '@/lib/svt/content/blog-i18n'
import { LONG_EN, longArticleFor, longLocales } from '@/lib/svt/content/long/library'
import { LOCALE_META, SVT_LOCALES, UI, localePath, type SvtLocale } from '@/lib/svt/i18n'

export interface SvtPage {
  path: string
  priority: number
  changeFrequency: 'weekly' | 'monthly' | 'yearly'
  indexable: boolean
  /** ISO date the content last changed; the site date when not set. */
  lastmod?: string
}

/** The blog hub changes whenever an article does. */
const BLOG_LASTMOD = [...BLOG_EN, ...LONG_EN].map(a => a.updated).sort().at(-1)

export const SVT_PAGES: readonly SvtPage[] = [
  { path: '/', priority: 1.0, changeFrequency: 'monthly', indexable: true },
  ...GUIDES_EN.map(g => ({ path: `/${g.slug}`, priority: g.slug === 'pricing' ? 0.9 : 0.8, changeFrequency: 'monthly' as const, indexable: true, lastmod: g.updated })),
  { path: '/contact', priority: 0.6, changeFrequency: 'monthly', indexable: true },
  { path: '/blog', priority: 0.7, changeFrequency: 'weekly', indexable: true, lastmod: BLOG_LASTMOD },
  ...BLOG_EN.map(a => ({ path: `/blog/${a.slug}`, priority: 0.6, changeFrequency: 'monthly' as const, indexable: true, lastmod: a.updated })),
  ...LONG_EN.map(a => ({ path: `/blog/${a.slug}`, priority: 0.6, changeFrequency: 'monthly' as const, indexable: true, lastmod: a.updated })),
  // Chinese and Vietnamese versions of every translated page.
  ...(['zh', 'vi'] as const).flatMap(l => [
    { path: `/${l}`, priority: 0.9, changeFrequency: 'monthly' as const, indexable: true },
    ...GUIDES_EN.map(g => ({ path: `/${l}/${g.slug}`, priority: 0.7, changeFrequency: 'monthly' as const, indexable: true, lastmod: g.updated })),
    { path: `/${l}/contact`, priority: 0.5, changeFrequency: 'monthly' as const, indexable: true },
    { path: `/${l}/blog`, priority: 0.6, changeFrequency: 'weekly' as const, indexable: true, lastmod: BLOG_LASTMOD },
    ...BLOG_EN.map(a => ({ path: `/${l}/blog/${a.slug}`, priority: 0.5, changeFrequency: 'monthly' as const, indexable: true, lastmod: a.updated })),
    ...LONG_EN.filter(a => longLocales(a.slug).includes(l)).map(a => ({ path: `/${l}/blog/${a.slug}`, priority: 0.5, changeFrequency: 'monthly' as const, indexable: true, lastmod: a.updated })),
  ]),
  // Legal pages share their text with the other brand: noindex, so not listed (Jo, 27 Oct).
  { path: '/client-agreement', priority: 0.3, changeFrequency: 'yearly', indexable: false },
  { path: '/privacy', priority: 0.3, changeFrequency: 'yearly', indexable: false },
]

/** Stable date so <lastmod> does not churn on every deploy. */
export const SVT_LAST_CONTENT_UPDATE = '2026-10-26'

/** Main navigation, in a language. */
export function navFor(locale: SvtLocale = 'en'): Array<{ href: string; label: string }> {
  const t = UI[locale].nav
  return [
    // Order (Jo, 27 Oct): what it is and what it costs first, then the
    // reading, and contact last next to the WhatsApp button.
    { href: localePath(locale, '/how-it-works'), label: t.howItWorks },
    { href: localePath(locale, '/pricing'), label: t.pricing },
    { href: localePath(locale, '/blog'), label: UI[locale].blog.nav },
    { href: localePath(locale, '/contact'), label: t.contact },
  ]
}
export const SVT_NAV = navFor('en')

/** Guides listed in the footer and the mobile menu, in a language. */
export function guideLinksFor(locale: SvtLocale = 'en'): Array<{ href: string; label: string }> {
  return guidesFor(locale).filter(g => !['pricing', 'how-it-works'].includes(g.slug)).map(g => ({ href: localePath(locale, `/${g.slug}`), label: g.label }))
}
export const SVT_GUIDE_LINKS = guideLinksFor('en')

/** Resolve related-guide slugs to links; unknown slugs are dropped. */
export function relatedLinks(slugs: readonly string[], locale: SvtLocale = 'en'): Array<{ href: string; label: string }> {
  const guides = guidesFor(locale)
  return slugs.flatMap(slug => {
    // The questions page was removed (Jo, 27 Oct); questions live on each guide.
    if (slug === 'questions') return []
    if (slug.startsWith('blog/')) {
      const a = blogFor(locale).find(x => x.slug === slug.slice(5))
      if (a) return [{ href: localePath(locale, `/${slug}`), label: a.label }]
      const l = longArticleFor(locale, slug.slice(5))
      return l ? [{ href: localePath(locale, `/${slug}`), label: l.title }] : []
    }
    const g = guides.find(x => x.slug === slug)
    return g ? [{ href: localePath(locale, `/${g.slug}`), label: g.label }] : []
  })
}

/** Languages with live pages (English, Chinese, Vietnamese). */
export const SVT_LIVE_LOCALES: ReadonlyArray<{ code: SvtLocale; label: string; lang: string }> =
  SVT_LOCALES.map(code => ({ code, label: LOCALE_META[code].label, lang: LOCALE_META[code].htmlLang }))

/** Pages that exist in every language (legal pages are English only). */
export const TRANSLATED_PATHS: readonly string[] = ['/', ...GUIDES_EN.map(g => `/${g.slug}`), '/contact', '/blog', ...BLOG_EN.map(a => `/blog/${a.slug}`)]

/** hreflang alternates and canonical for a language-free path. */
export function alternatesFor(locale: SvtLocale, path: string) {
  // A long-form article exists only in the languages it has been written in.
  const long = path.startsWith('/blog/') ? longLocales(path.slice(6)) : []
  const langs: readonly SvtLocale[] = long.length ? long : TRANSLATED_PATHS.includes(path) ? SVT_LOCALES : []
  return {
    canonical: localePath(locale, path),
    languages: langs.length > 1
      ? { ...Object.fromEntries(langs.map(l => [LOCALE_META[l].hreflang, localePath(l, path)])), 'x-default': localePath('en', path) }
      : undefined,
  }
}
