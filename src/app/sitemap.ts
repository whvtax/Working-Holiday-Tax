import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/constants'
import { guides, categoryMeta } from './blog/data'
import { dePostTranslations } from './de/blog/data'
import { jaPostTranslations } from './ja/blog/data'

// A localized blog post is only "real" (indexable, sitemap-worthy) when it has a
// translated body. Title/description-only entries still render English bodies,
// which we now noindex + canonical to the English source, so they're excluded here.
const isDeTranslated = (slug: string) => !!dePostTranslations[slug]?.body
const isJaTranslated = (slug: string) => !!jaPostTranslations[slug]?.body

// Parse a guide date string ("1 July 2024") into a Date for accurate <lastmod>.
// Stable last-content-update date for static & category pages, so <lastmod>
// doesn't churn on every deploy (which a build-time new Date() would cause).
const LAST_CONTENT_UPDATE = new Date('2026-08-01')

function parseGuideDate(s: string): Date {
  const d = new Date(s)
  return isNaN(d.getTime()) ? new Date() : d
}

/**
 * Site map - includes English (default), German (/de) and Japanese (/ja) versions.
 * Each English URL gets matching /de and /ja entries. Search engines use these together
 * with hreflang tags on the pages themselves to serve the right language.
 *
 * Legal pages (client-agreement, privacy) stay English-only - they're not
 * translated and exist at a single URL.
 */
const routes = [
  { url: '/',                          priority: 1.0,  changeFrequency: 'monthly', translated: true  },
  // Primary services (high priority)
  { url: '/tfn',                       priority: 0.9,  changeFrequency: 'monthly', translated: true  },
  { url: '/tax-return',                priority: 0.9,  changeFrequency: 'monthly', translated: true  },
  { url: '/superannuation',            priority: 0.9,  changeFrequency: 'monthly', translated: true  },
  { url: '/abn',                       priority: 0.8,  changeFrequency: 'monthly', translated: true  },
  { url: '/calculator',                priority: 0.8,  changeFrequency: 'monthly', translated: true  },
  { url: '/medicare',                  priority: 0.7,  changeFrequency: 'monthly', translated: true  },
  { url: '/expenses',                  priority: 0.8,  changeFrequency: 'monthly', translated: true  },
  // Blog hub
  { url: '/blog',                      priority: 0.85, changeFrequency: 'weekly',  translated: true  },
  // Contact and supporting pages
  { url: '/contact',                   priority: 0.7,  changeFrequency: 'monthly', translated: true  },
  // Informational pages
  { url: '/tax-residency',             priority: 0.6,  changeFrequency: 'yearly',  translated: true  },
  // Legal (English only - not translated)
  { url: '/client-agreement',          priority: 0.4,  changeFrequency: 'yearly',  translated: false },
  { url: '/privacy',                   priority: 0.4,  changeFrequency: 'yearly',  translated: false },
] as const

export default function sitemap(): MetadataRoute.Sitemap {
  // English static pages
  const englishStatic = routes.map(r => ({
    url: `${SITE_URL}${r.url}`,
    lastModified: LAST_CONTENT_UPDATE,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }))

  // German static pages (mirrors English, excluding legal pages)
  const germanStatic = routes
    .filter(r => r.translated)
    .map(r => ({
      url: r.url === '/' ? `${SITE_URL}/de` : `${SITE_URL}/de${r.url}`,
      lastModified: LAST_CONTENT_UPDATE,
      changeFrequency: r.changeFrequency,
      priority: r.priority * 0.95, // Slight priority drop vs canonical English
    }))

  // Japanese static pages (mirrors English, excluding legal pages)
  const japaneseStatic = routes
    .filter(r => r.translated)
    .map(r => ({
      url: r.url === '/' ? `${SITE_URL}/ja` : `${SITE_URL}/ja${r.url}`,
      lastModified: LAST_CONTENT_UPDATE,
      changeFrequency: r.changeFrequency,
      priority: r.priority * 0.95,
    }))

  // English category pages
  const englishCategories: MetadataRoute.Sitemap = categoryMeta.map(c => ({
    url: `${SITE_URL}/blog/category/${c.slug}`,
    lastModified: LAST_CONTENT_UPDATE,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // German category pages
  const germanCategories: MetadataRoute.Sitemap = categoryMeta.map(c => ({
    url: `${SITE_URL}/de/blog/category/${c.slug}`,
    lastModified: LAST_CONTENT_UPDATE,
    changeFrequency: 'weekly' as const,
    priority: 0.76,
  }))

  // Japanese category pages
  const japaneseCategories: MetadataRoute.Sitemap = categoryMeta.map(c => ({
    url: `${SITE_URL}/ja/blog/category/${c.slug}`,
    lastModified: LAST_CONTENT_UPDATE,
    changeFrequency: 'weekly' as const,
    priority: 0.76,
  }))

  // English guide pages
  const englishGuides: MetadataRoute.Sitemap = guides.map(g => ({
    url: `${SITE_URL}/blog/${g.slug}`,
    lastModified: parseGuideDate(g.date),
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }))

  // German guide pages - only those with a translated body (others are noindex)
  const germanGuides: MetadataRoute.Sitemap = guides
    .filter(g => isDeTranslated(g.slug))
    .map(g => ({
      url: `${SITE_URL}/de/blog/${g.slug}`,
      lastModified: parseGuideDate(g.date),
      changeFrequency: 'monthly' as const,
      priority: 0.71,
    }))

  // Japanese guide pages - only those with a translated body (others are noindex)
  const japaneseGuides: MetadataRoute.Sitemap = guides
    .filter(g => isJaTranslated(g.slug))
    .map(g => ({
      url: `${SITE_URL}/ja/blog/${g.slug}`,
      lastModified: parseGuideDate(g.date),
      changeFrequency: 'monthly' as const,
      priority: 0.71,
    }))

  return [
    ...englishStatic,
    ...germanStatic,
    ...japaneseStatic,
    ...englishCategories,
    ...germanCategories,
    ...japaneseCategories,
    ...englishGuides,
    ...germanGuides,
    ...japaneseGuides,
  ]
}
