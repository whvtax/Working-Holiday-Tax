import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { BLOG_EN } from '@/lib/svt/content/blog-en'
import { articleFor } from '@/lib/svt/content/blog-i18n'
import { LONG_EN, longArticleFor, longLocales, longToGuide } from '@/lib/svt/content/long/library'
import { svtMeta } from '@/lib/svt/page-meta'
import { DEADLINE_PASSED_NOTE, deadlinePassed } from '@/lib/svt/deadline'
import { UI, localePath, type SvtLocale } from '@/lib/svt/i18n'
import { GuidePage } from '../GuidePage'

/** Shared by /blog/[slug], /zh/blog/[slug] and /vi/blog/[slug]: the original
 *  articles in every language, plus each long-form article in the languages
 *  it has been written in. */
export const blogStaticParams = (locale: SvtLocale = 'en') => () => [
  ...BLOG_EN.map(a => ({ slug: a.slug })),
  ...LONG_EN.filter(a => longLocales(a.slug).includes(locale)).map(a => ({ slug: a.slug })),
]

export async function blogMetadata(locale: SvtLocale, params: Promise<{ slug: string }>): Promise<Metadata> {
  const slug = (await params).slug
  const a = articleFor(locale, slug)
  if (a) {
    const m = svtMeta(locale, `/blog/${a.slug}`, a.meta)
    return { ...m, openGraph: { ...m.openGraph, type: 'article', publishedTime: a.published, modifiedTime: a.updated } }
  }
  const l = longArticleFor(locale, slug)
  if (!l) return {}
  const m = svtMeta(locale, `/blog/${l.slug}`, { title: l.title, description: l.description })
  return { ...m, openGraph: { ...m.openGraph, type: 'article', publishedTime: l.published, modifiedTime: l.updated } }
}

export async function BlogArticle({ locale, params }: { locale: SvtLocale; params: Promise<{ slug: string }> }) {
  const slug = (await params).slug
  const section = { href: localePath(locale, '/blog'), label: UI[locale].blog.nav }
  const a = articleFor(locale, slug)
  // GuidePage writes the page markup (Article, breadcrumbs, questions).
  if (a) {
    // After 2 November the deadline article opens by saying the date has passed.
    const g = a.slug === 'tax-return-deadline-31-october' && deadlinePassed()
      ? { ...a, sections: [{ ...a.sections[0], blocks: [{ note: DEADLINE_PASSED_NOTE[locale] }, ...a.sections[0].blocks] }, ...a.sections.slice(1)] }
      : a
    return <GuidePage g={g} locale={locale} section={section} basePath={`/blog/${a.slug}`} />
  }
  const l = longArticleFor(locale, slug)
  if (!l) notFound()
  return <GuidePage g={longToGuide(l)} locale={locale} section={section} basePath={`/blog/${l.slug}`} article locales={longLocales(l.slug)} />
}
