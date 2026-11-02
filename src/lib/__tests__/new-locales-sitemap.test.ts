/**
 * ADR 013: /fr, /it and /es are live. The sitemap, the language switcher and
 * the hreflang maps list a page only when it exists: static pages from the
 * allowlists, flagship pages from LOCALE_ONLY_ROUTES (canonical only), and the
 * blog from each language's chunk data.
 */
import fs from 'fs'
import path from 'path'
import sitemap from '@/app/sitemap'
import robots from '@/app/robots'
import {
  FR_PAGES, IT_PAGES, ES_PAGES, NEW_LOCALES, LOCALE_ONLY_ROUTES, LOCALE_PAGES,
  hasLocalePage, newLocaleLanguages, isLocaleOnlyRoute,
} from '@/lib/locale-pages'
import { LOCALE_GUIDE_SLUGS } from '@/lib/locale-guide-slugs'
import { getFrenchGuideSlugs, getFrenchSitemapPaths } from '@/app/(fr)/fr/blog/data'
import { getItalianGuideSlugs, getItalianSitemapPaths } from '@/app/(it)/it/blog/data'
import { getSpanishGuideSlugs, getSpanishSitemapPaths } from '@/app/(es)/es/blog/data'
import { LIVE_FR_GUIDES } from '@/app/(fr)/fr/_blog-links'
import { LIVE_IT_GUIDES } from '@/app/(it)/it/_blog-links'
import { LIVE_ES_GUIDES } from '@/app/(es)/es/_blog-links'
import { SITE_URL } from '@/lib/constants'

const SLUGS = { fr: getFrenchGuideSlugs, it: getItalianGuideSlugs, es: getSpanishGuideSlugs }
const SITEMAP_PATHS = { fr: getFrenchSitemapPaths, it: getItalianSitemapPaths, es: getSpanishSitemapPaths }
const FLAGSHIP = { fr: '/tax-return-australie-pvt', it: '/dichiarazione-redditi-australia', es: '/devolucion-impuestos-australia' } as const
const urlOf = (l: string, p: string) => (p === '/' ? `${SITE_URL}/${l}` : `${SITE_URL}/${l}${p}`)
const sitemapUrls = new Set(sitemap().map((e) => e.url))

describe('new locale allowlists', () => {
  it('lists the 17 static pages in each language', () => {
    for (const pages of [FR_PAGES, IT_PAGES, ES_PAGES]) {
      expect(pages).toHaveLength(17)
      expect(pages).toContain('/')
      expect(pages).toContain('/expenses/fifo')
    }
  })

  it.each(NEW_LOCALES)('every /%s allowlisted route has a page file', (l) => {
    for (const p of LOCALE_PAGES[l]) {
      const dir = path.join(process.cwd(), 'src/app', `(${l})`, l, p === '/' ? '' : p)
      expect(fs.existsSync(path.join(dir, 'page.tsx'))).toBe(true)
    }
  })

  it.each(NEW_LOCALES)('the %s flagship page is locale-only, canonical only, with no hreflang twin', (l) => {
    expect(LOCALE_ONLY_ROUTES[l]).toEqual([FLAGSHIP[l]])
    expect(LOCALE_PAGES[l]).not.toContain(FLAGSHIP[l])
    expect(isLocaleOnlyRoute(FLAGSHIP[l])).toBe(true)
    for (const other of NEW_LOCALES) expect(hasLocalePage(other, FLAGSHIP[l])).toBe(false)
    expect(newLocaleLanguages(FLAGSHIP[l])).toEqual({})
    const file = fs.readFileSync(path.join(process.cwd(), 'src/app', `(${l})`, l, FLAGSHIP[l], 'page.tsx'), 'utf8')
    expect(file).not.toMatch(/languages\s*:/)
  })
})

describe('guide data is the single source of truth', () => {
  it.each(NEW_LOCALES)('LOCALE_GUIDE_SLUGS.%s matches the chunk data (regenerate the list if this fails)', (l) => {
    expect([...LOCALE_GUIDE_SLUGS[l]].sort()).toEqual([...SLUGS[l]()].sort())
  })

  it('LIVE_xx_GUIDES are derived from the chunks', () => {
    expect([...LIVE_FR_GUIDES].sort()).toEqual([...getFrenchGuideSlugs()].sort())
    expect([...LIVE_IT_GUIDES].sort()).toEqual([...getItalianGuideSlugs()].sort())
    expect([...LIVE_ES_GUIDES].sort()).toEqual([...getSpanishGuideSlugs()].sort())
  })
})

describe('sitemap', () => {
  it('has no duplicate URLs', () => {
    const all = sitemap().map((e) => e.url)
    expect(new Set(all).size).toBe(all.length)
  })

  it.each(NEW_LOCALES)('lists every /%s page, the flagship, the blog index, categories and guides', (l) => {
    for (const p of LOCALE_PAGES[l]) expect(sitemapUrls.has(urlOf(l, p))).toBe(true)
    expect(sitemapUrls.has(urlOf(l, FLAGSHIP[l]))).toBe(true)
    const blog = SITEMAP_PATHS[l]()
    expect(blog).toContain('/blog')
    expect(blog.filter((p) => p.startsWith('/blog/category/'))).toHaveLength(6)
    for (const p of blog) expect(sitemapUrls.has(urlOf(l, p))).toBe(true)
  })

  it.each(NEW_LOCALES)('lists nothing else under /%s', (l) => {
    const expected = new Set([
      ...LOCALE_PAGES[l], ...LOCALE_ONLY_ROUTES[l], ...SITEMAP_PATHS[l](),
    ].map((p) => urlOf(l, p)))
    const hits = sitemap()
      .map((e) => e.url)
      .filter((u) => new RegExp(`^${SITE_URL}/${l}(/|$)`).test(u))
    expect(hits.length).toBe(expected.size)
    for (const u of hits) expect(expected.has(u)).toBe(true)
  })
})

describe('hreflang helper', () => {
  it('lists fr, it and es twins for every shared static page, with absolute URLs', () => {
    for (const p of FR_PAGES) {
      expect(newLocaleLanguages(p)).toEqual({
        fr: urlOf('fr', p), it: urlOf('it', p), es: urlOf('es', p),
      })
    }
  })

  it('lists nothing for routes without a twin', () => {
    for (const p of ['/start', '/privacy', '/client-agreement', '/uk-working-holiday-tax', '/blog/not-a-guide']) {
      expect(newLocaleLanguages(p)).toEqual({})
    }
  })

  it('knows the blog index, the categories (incl. the medicare slug) and real guides', () => {
    for (const l of NEW_LOCALES) {
      expect(hasLocalePage(l, '/blog')).toBe(true)
      expect(hasLocalePage(l, '/blog/category/medicare-and-other')).toBe(true)
      expect(hasLocalePage(l, `/blog/${SLUGS[l]()[0]}`)).toBe(true)
      expect(hasLocalePage(l, '/blog/definitely-not-a-guide')).toBe(false)
    }
  })
})

describe('robots', () => {
  it.each(['fr', 'it', 'es'] as const)('disallows the hidden form slug under /%s', (l) => {
    const rules = robots().rules
    const first = Array.isArray(rules) ? rules[0] : rules
    expect(first.disallow).toContain(`/${l}/y8vwp4bf7`)
  })
})
