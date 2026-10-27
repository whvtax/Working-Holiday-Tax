import type { Metadata } from 'next'
import { GUIDES_EN } from '@/lib/svt/content/guides-en'
import { guideFor } from '@/lib/svt/content/guides-i18n'
import { svtMeta } from '@/lib/svt/page-meta'
import type { SvtLocale } from '@/lib/svt/i18n'

/** Shared by the /[slug], /zh/[slug] and /vi/[slug] routes. */
export const guideStaticParams = () => GUIDES_EN.map(g => ({ slug: g.slug }))

export async function guideMetadata(locale: SvtLocale, params: Promise<{ slug: string }>): Promise<Metadata> {
  const g = guideFor(locale, (await params).slug)
  return g ? svtMeta(locale, `/${g.slug}`, g.meta) : {}
}
