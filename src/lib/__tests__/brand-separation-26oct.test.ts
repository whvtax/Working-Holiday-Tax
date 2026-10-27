/**
 * Jo, 26 Oct: the two brands are fully separate to customers. Neither brand's
 * customer-facing code may name or link to the other. This scans the source
 * trees that render each brand; the rendered-HTML check is in
 * e2e/brand-isolation.spec.ts.
 *
 * Shared, behind-the-scenes modules that legitimately hold BOTH brands'
 * details (brand.ts, legal/brands.ts, config/) are not scanned here; they are
 * what the separation is built from.
 */
import fs from 'fs'
import path from 'path'
import { buildSvtRobots, buildSvtSitemap } from '@/lib/svt/seo'
import { BRANDS } from '@/lib/brand'
import { SVT_PAGES } from '@/lib/svt/pages'
import { GUIDES_EN } from '@/lib/svt/content/guides-en'
import { BLOG_EN } from '@/lib/svt/content/blog-en'

const ROOT = path.join(__dirname, '../../..')

function files(dir: string): string[] {
  const abs = path.join(ROOT, dir)
  if (!fs.existsSync(abs)) return []
  return fs.readdirSync(abs, { withFileTypes: true }).flatMap(e => {
    const rel = path.join(dir, e.name)
    if (e.isDirectory()) return e.name === '__tests__' ? [] : files(rel)
    return /\.(tsx?|css|json|md|txt|svg)$/.test(e.name) ? [rel] : []
  })
}

const WHT_MARKS = /working\s*holiday\s*tax|workingholidaytax|0424\s?513\s?998|61424513998|backpacker/i
const SVT_MARKS = /student\s*visa\s*tax|studentvisatax/i

describe('Student Visa Tax code never names Working Holiday Tax', () => {
  const svtFiles = [...files('src/app/(svt)'), ...files('src/app/(svt-zh)'), ...files('src/app/(svt-vi)'), ...files('src/components/svt'), ...files('src/lib/svt'), ...files('src/lib/i18n/svt'), ...files('public/svt-assets')]
  it('has files to check', () => expect(svtFiles.length).toBeGreaterThan(0))
  it.each(svtFiles)('%s', f => {
    expect(fs.readFileSync(path.join(ROOT, f), 'utf8')).not.toMatch(WHT_MARKS)
  })
  it('no SVT file imports the two-brand module (its WHT details would ship to the browser)', () => {
    const offenders = svtFiles.filter(f => /\.tsx?$/.test(f) && /from '@\/lib\/brand'/.test(fs.readFileSync(path.join(ROOT, f), 'utf8')))
    expect(offenders).toEqual([])
  })
  it('robots and sitemap point only at the SVT domain', () => {
    for (const txt of [buildSvtRobots(), buildSvtSitemap()]) {
      expect(txt).not.toMatch(WHT_MARKS)
      for (const url of (txt.match(/https?:\/\/[^\s<"]+/g) ?? []).filter(u => !u.startsWith('http://www.sitemaps.org/'))) expect(url.startsWith(BRANDS.svt.siteUrl)).toBe(true)
    }
  })
})

describe('Working Holiday Tax code never names Student Visa Tax', () => {
  const whtFiles = [
    ...files('src/app/(site)'), ...files('src/app/(de)'), ...files('src/app/(ja)'),
    ...files('src/components').filter(f => !f.startsWith(path.join('src/components', 'svt'))),
    ...files('public').filter(f => !f.startsWith(path.join('public', 'svt-assets'))),
  ]
  it('has files to check', () => expect(whtFiles.length).toBeGreaterThan(100))
  it('no WHT page, component or public file mentions SVT', () => {
    const hits = whtFiles.filter(f => SVT_MARKS.test(fs.readFileSync(path.join(ROOT, f), 'utf8')))
    expect(hits).toEqual([])
  })
  it('WHT sitemap and robots stay on the WHT domain', () => {
    for (const f of ['src/app/sitemap.ts', 'src/app/robots.ts']) {
      expect(fs.readFileSync(path.join(ROOT, f), 'utf8')).not.toMatch(SVT_MARKS)
    }
  })
})

describe('SVT robots and sitemap', () => {
  it('robots blocks the API and links the SVT sitemap', () => {
    const r = buildSvtRobots()
    expect(r).toContain('Disallow: /api/')
    expect(r).toContain('Sitemap: https://studentvisatax.com.au/sitemap.xml')
  })
  it('sitemap is valid XML and lists exactly the indexable SVT pages', () => {
    const s = buildSvtSitemap()
    expect(s.startsWith('<?xml version="1.0" encoding="UTF-8"?>')).toBe(true)
    expect(s).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')
    const locs = [...s.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1])
    expect(locs).toEqual(SVT_PAGES.filter(p => p.indexable).map(p => BRANDS.svt.siteUrl + (p.path === '/' ? '' : p.path)))
    expect(locs).toContain('https://studentvisatax.com.au')
  })
  it('every page in the registry exists in the SVT app tree', () => {
    const guideSlugs = new Set([...GUIDES_EN.map(g => `/${g.slug}`), ...BLOG_EN.map(a => `/blog/${a.slug}`)])
    for (const p of SVT_PAGES) {
      const m = p.path.match(/^\/(zh|vi)(\/.*)?$/)
      const group = m ? `(svt-${m[1]})` : '(svt)'
      const rest = m ? (m[2] ?? '/') : p.path
      const dir = path.join(ROOT, 'src/app', group, 'svt-site', m ? m[1] : '', rest === '/' ? '' : rest)
      expect([p.path, fs.existsSync(path.join(dir, 'page.tsx')) || guideSlugs.has(rest)]).toEqual([p.path, true])
    }
  })
})
