/**
 * Live pages of the new language sections (/fr, /it, /es), ADR 013.
 *
 * The allowlists feed the sitemap, the language switcher, the mobile language
 * banner and the hreflang maps, so none of them ever points at a thin or
 * missing page. A page is on its list only when its copy has passed the
 * review pipeline. Paths are the English path with no locale prefix, for
 * example '/tfn' or '/expenses/fifo'; '/' is the locale home.
 *
 * Blog pages are not listed by hand: the index, the category hubs and every
 * guide come from the chunk data (see locale-guide-slugs.ts and the
 * get*SitemapPaths helpers in each blog/data.ts). hasLocalePage() knows both.
 */
import { SITE_URL } from '@/lib/constants'
import { LOCALE_GUIDE_SLUGS, LOCALE_CATEGORY_SLUGS } from '@/lib/locale-guide-slugs'

export type NewLocale = 'fr' | 'it' | 'es'

export const NEW_LOCALES: readonly NewLocale[] = ['fr', 'it', 'es']

/** The 17 static pages that exist in all three new languages. */
const STATIC_PAGES: readonly string[] = [
  '/', '/about', '/contact', '/calculator', '/tfn', '/abn', '/tax-return',
  '/superannuation', '/medicare', '/expenses',
  '/expenses/delivery-drivers', '/expenses/hospitality', '/expenses/farm-work',
  '/expenses/construction', '/expenses/labouring', '/expenses/cleaners', '/expenses/fifo',
]

export const FR_PAGES: readonly string[] = STATIC_PAGES
export const IT_PAGES: readonly string[] = STATIC_PAGES
export const ES_PAGES: readonly string[] = STATIC_PAGES

export const LOCALE_PAGES: Readonly<Record<NewLocale, readonly string[]>> = {
  fr: FR_PAGES,
  it: IT_PAGES,
  es: ES_PAGES,
}

/**
 * Routes that exist ONLY in one language (for example a flagship page written
 * for one market). Switching from one of these to another language falls back
 * to that language's home page, because there is no twin to land on.
 */
export const LOCALE_ONLY_ROUTES: Readonly<Record<NewLocale, readonly string[]>> = {
  fr: ['/tax-return-australie-pvt'],
  it: ['/dichiarazione-redditi-australia'],
  es: ['/devolucion-impuestos-australia'],
}

/**
 * True when the English-path route has a live page in this locale: a static
 * page on the allowlist, the blog index, a category hub or a guide with a
 * native body. Flagship (locale-only) routes are not twins of anything and
 * are not counted here; see LOCALE_ONLY_ROUTES.
 */
export function hasLocalePage(locale: NewLocale, path: string): boolean {
  const clean = path.length > 1 ? path.replace(/\/$/, '') : path
  if (LOCALE_PAGES[locale].includes(clean)) return true
  if (clean === '/blog') return LOCALE_GUIDE_SLUGS[locale].length > 0
  const cat = /^\/blog\/category\/([^/]+)$/.exec(clean)
  if (cat) return LOCALE_CATEGORY_SLUGS.includes(cat[1] === 'medicare' ? 'medicare-and-other' : cat[1])
  const guide = /^\/blog\/([^/]+)$/.exec(clean)
  if (guide) return LOCALE_GUIDE_SLUGS[locale].includes(guide[1])
  return false
}

/**
 * hreflang entries (fr, it, es) for an English-path route, only for the
 * languages that have a real twin. Spread into the `languages` map of the
 * en, de, ja, fr, it and es versions of the page so every cluster is symmetric.
 */
export function newLocaleLanguages(path: string): Record<string, string> {
  const out: Record<string, string> = {}
  for (const l of NEW_LOCALES) {
    if (hasLocalePage(l, path)) out[l] = path === '/' ? `${SITE_URL}/${l}` : `${SITE_URL}/${l}${path}`
  }
  return out
}

/** Routes that exist in at least one new locale only (no English twin). */
export function isLocaleOnlyRoute(path: string): boolean {
  return NEW_LOCALES.some(l => LOCALE_ONLY_ROUTES[l].includes(path))
}
