import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { BLOG_EN } from '@/lib/svt/content/blog-en'
import { articleFor } from '@/lib/svt/content/blog-i18n'
import { svtMeta } from '@/lib/svt/page-meta'
import { UI, localePath, type SvtLocale } from '@/lib/svt/i18n'
import { GuidePage } from '../GuidePage'

/** Shared by /blog/[slug], /zh/blog/[slug] and /vi/blog/[slug]. */
export const blogStaticParams = () => BLOG_EN.map(a => ({ slug: a.slug }))

export async function blogMetadata(locale: SvtLocale, params: Promise<{ slug: string }>): Promise<Metadata> {
  const a = articleFor(locale, (await params).slug)
  if (!a) return {}
  const m = svtMeta(locale, `/blog/${a.slug}`, a.meta)
  return { ...m, openGraph: { ...m.openGraph, type: 'article', publishedTime: a.published, modifiedTime: a.updated } }
}

export async function BlogArticle({ locale, params }: { locale: SvtLocale; params: Promise<{ slug: string }> }) {
  const a = articleFor(locale, (await params).slug)
  if (!a) notFound()
  // GuidePage writes the page markup (Article, breadcrumbs, questions).
  return <GuidePage g={a} locale={locale} section={{ href: localePath(locale, '/blog'), label: UI[locale].blog.nav }} basePath={`/blog/${a.slug}`} />
}
