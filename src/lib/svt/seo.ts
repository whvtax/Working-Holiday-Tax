import { SVT_PUBLIC } from '@/lib/svt/brand-public'
import { SVT_PAGES, SVT_LAST_CONTENT_UPDATE } from '@/lib/svt/pages'

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/** sitemap.xml for studentvisatax.com.au: indexable SVT pages only. */
export function buildSvtSitemap(): string {
  const base = SVT_PUBLIC.siteUrl
  const urls = SVT_PAGES.filter(p => p.indexable).map(p => [
    '  <url>',
    `    <loc>${esc(base + (p.path === '/' ? '' : p.path))}</loc>`,
    `    <lastmod>${p.lastmod ?? SVT_LAST_CONTENT_UPDATE}</lastmod>`,
    `    <changefreq>${p.changeFrequency}</changefreq>`,
    `    <priority>${p.priority.toFixed(1)}</priority>`,
    '  </url>',
  ].join('\n'))
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls,
    '</urlset>',
    '',
  ].join('\n')
}

/** robots.txt for studentvisatax.com.au. */
export function buildSvtRobots(): string {
  const base = SVT_PUBLIC.siteUrl
  return [
    'User-agent: *',
    'Allow: /',
    'Disallow: /api/',
    '',
    `Sitemap: ${base}/sitemap.xml`,
    '',
  ].join('\n')
}
