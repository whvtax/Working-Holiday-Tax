/**
 * Shared loader for the chunked blogs of the new locales (/fr, /it, /es), ADR 013.
 *
 * Unlike /de and /ja, a guide exists in these locales ONLY when a native body
 * is present in one of the chunk files (src/app/(fr)/fr/blog/chunks/NN.ts and
 * the it and es twins). There is no English fallback and no "not translated"
 * notice: a slug with no chunk entry is not listed on the blog index, in the
 * category pages, in generateStaticParams, in related guides, in hreflang or
 * in the sitemap helpers, and its URL is a 404.
 *
 * The English guide supplies slug, category, date; the chunk supplies title,
 * description and body. Internal links inside a body are authored with the
 * English path and rewritten here to the locale path only when that page
 * exists in the locale.
 */
import { guides as enGuides, categoryMeta as enCategoryMeta, type Guide, type Category } from '@/app/(site)/blog/data'
import { hasLocalePage, type NewLocale } from '@/lib/locale-pages'

export type GuideChunk = Record<string, { title: string; description: string; body: string }>

/** Merge chunk files. A later chunk wins over an earlier one for the same slug. Entries without a title or body are dropped. */
export function mergeChunks(chunks: ReadonlyArray<GuideChunk>): GuideChunk {
  const merged: GuideChunk = {}
  for (const chunk of chunks) {
    for (const [slug, entry] of Object.entries(chunk)) {
      if (!entry || !entry.title?.trim() || !entry.body?.trim()) continue
      merged[slug] = entry
    }
  }
  return merged
}

/**
 * Rewrites internal markdown links `](/path)` in a guide body.
 *  - /blog/<slug> and /blog/category/<slug>: locale path when that guide or
 *    category is listed in the locale, else the English path.
 *  - /blog: locale path when the locale lists at least one guide.
 *  - any other site path: locale path only when the page is in the locale's
 *    allowlist (src/lib/locale-pages.ts), else the English path.
 * Anchors (#...) and query strings are kept. External and relative links are untouched.
 */
export function localizeBodyLinks(
  body: string,
  locale: NewLocale,
  exists: { guide: (slug: string) => boolean; category: (slug: string) => boolean; anyGuide: boolean },
): string {
  return body.replace(/\]\((\/[^)\s]*)\)/g, (whole, href: string) => {
    const m = /^([^?#]*)([?#].*)?$/.exec(href)
    const path = (m?.[1] ?? href).replace(/(.)\/$/, '$1')
    const tail = m?.[2] ?? ''
    if (path === `/${locale}` || path.startsWith(`/${locale}/`)) return whole

    let local = false
    const guide = /^\/blog\/([^/]+)$/.exec(path)
    const category = /^\/blog\/category\/([^/]+)$/.exec(path)
    if (category) local = exists.category(category[1])
    else if (path === '/blog') local = exists.anyGuide
    else if (guide) local = exists.guide(guide[1])
    else local = hasLocalePage(locale, path)

    if (!local) return whole
    return `](${path === '/' ? `/${locale}` : `/${locale}${path}`}${tail})`
  })
}

function readMinutes(body: string): number {
  return Math.max(1, Math.round(body.trim().split(/\s+/).length / 200))
}

export interface LocaleBlog {
  locale: NewLocale
  hasGuide: (slug: string) => boolean
  /** The localized guide, or undefined when the locale has no native body for the slug. */
  getGuide: (slug: string) => { guide: Guide; isTranslated: true } | undefined
  /** Listed guides, in English corpus order. */
  getGuides: () => Guide[]
  getSlugs: () => string[]
  /** Categories (English enum) that have at least one listed guide. */
  getListedCategories: () => Category[]
  /** Site paths ('/blog/<slug>', '/blog/category/<slug>') ready to feed the locale allowlist or the sitemap. */
  getSitemapPaths: () => string[]
}

export function createLocaleBlog(locale: NewLocale, merged: GuideChunk): LocaleBlog {
  const hasGuide = (slug: string) => Object.prototype.hasOwnProperty.call(merged, slug) && enGuides.some(g => g.slug === slug)
  const listedEn = enGuides.filter(g => hasGuide(g.slug))
  const listedCategories = new Set<Category>(listedEn.map(g => g.category))
  const categorySlugs = new Set(enCategoryMeta.filter(c => listedCategories.has(c.category)).map(c => c.slug))
  const exists = {
    guide: hasGuide,
    category: (slug: string) => categorySlugs.has(slug),
    anyGuide: listedEn.length > 0,
  }

  const cache = new Map<string, Guide>()
  const build = (en: Guide): Guide => {
    const hit = cache.get(en.slug)
    if (hit) return hit
    const c = merged[en.slug]
    const body = localizeBodyLinks(c.body, locale, exists)
    const guide: Guide = { ...en, title: c.title, description: c.description, body, readTime: readMinutes(body) }
    cache.set(en.slug, guide)
    return guide
  }

  return {
    locale,
    hasGuide,
    getGuide: (slug) => {
      const en = listedEn.find(g => g.slug === slug)
      return en ? { guide: build(en), isTranslated: true } : undefined
    },
    getGuides: () => listedEn.map(build),
    getSlugs: () => listedEn.map(g => g.slug),
    getListedCategories: () => enCategoryMeta.map(c => c.category).filter(c => listedCategories.has(c)),
    getSitemapPaths: () => [
      ...listedEn.map(g => `/blog/${g.slug}`),
      ...enCategoryMeta.filter(c => listedCategories.has(c.category)).map(c => `/blog/category/${c.slug}`),
      ...(listedEn.length > 0 ? ['/blog'] : []),
    ],
  }
}
