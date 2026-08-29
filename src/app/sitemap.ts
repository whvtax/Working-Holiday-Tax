import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/constants'
import { guides, categoryMeta } from '@/app/(site)/blog/data'
import { dePostTranslations } from '@/app/(de)/de/blog/data'
import { jaPostTranslations } from '@/app/(ja)/ja/blog/data'
import { isoGuideDate, guideModifiedIso } from '@/lib/blog-dates'

// A localized blog post is only "real" (indexable, sitemap-worthy) when it has a
// translated body. Title/description-only entries still render English bodies,
// which we now noindex + canonical to the English source, so they're excluded here.
const isDeTranslated = (slug: string) => !!dePostTranslations[slug]?.body
const isJaTranslated = (slug: string) => !!jaPostTranslations[slug]?.body

// Stable last-content-update date for static & category pages, so <lastmod>
// doesn't churn on every deploy (which a build-time new Date() would cause).
const LAST_CONTENT_UPDATE = new Date('2026-08-01')

/**
 * <lastmod> for a guide URL, in any language.
 *
 * This used to be the guide's English *publication* date for all three
 * locales, so a German or Japanese translation written in August 2026
 * advertised a lastmod of July 2024 - and disagreed with nothing, because
 * dateModified on the page said the same wrong thing. Both now come from the
 * same helper, so the sitemap and the Article schema for a URL always match.
 */
function guideLastMod(dateString: string): Date {
  return new Date(guideModifiedIso(isoGuideDate(dateString)))
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
  { url: '/expenses/delivery-drivers', priority: 0.75, changeFrequency: 'monthly', translated: true  },
  { url: '/expenses/hospitality',      priority: 0.75, changeFrequency: 'monthly', translated: true  },
  { url: '/expenses/farm-work',        priority: 0.75, changeFrequency: 'monthly', translated: true  },
  { url: '/expenses/construction',     priority: 0.75, changeFrequency: 'monthly', translated: true  },
  { url: '/expenses/labouring',        priority: 0.75, changeFrequency: 'monthly', translated: true  },
  { url: '/expenses/cleaners',         priority: 0.75, changeFrequency: 'monthly', translated: true  },
  { url: '/expenses/fifo',             priority: 0.75, changeFrequency: 'monthly', translated: true  },
  // Blog hub
  { url: '/blog',                      priority: 0.85, changeFrequency: 'weekly',  translated: true  },
  // Contact and supporting pages
  { url: '/contact',                   priority: 0.7,  changeFrequency: 'monthly', translated: true  },
  { url: '/about',                     priority: 0.6,  changeFrequency: 'monthly', translated: true  },
  // Informational pages
  { url: '/uk-working-holiday-tax',    priority: 0.7,  changeFrequency: 'monthly', translated: false },
  // Legal pages (translated versions exist at /de and /ja)
  { url: '/client-agreement',          priority: 0.4,  changeFrequency: 'yearly',  translated: true  },
  { url: '/privacy',                   priority: 0.4,  changeFrequency: 'yearly',  translated: true  },
] as const

// The Medicare category uses a different slug in the DE/JA routes
// (EN: medicare-and-other, DE/JA: medicare) - map when building localized URLs.
const localizedCategorySlug = (slug: string) =>
  slug === 'medicare-and-other' ? 'medicare' : slug

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
    url: `${SITE_URL}/de/blog/category/${localizedCategorySlug(c.slug)}`,
    lastModified: LAST_CONTENT_UPDATE,
    changeFrequency: 'weekly' as const,
    priority: 0.76,
  }))

  // Japanese category pages
  const japaneseCategories: MetadataRoute.Sitemap = categoryMeta.map(c => ({
    url: `${SITE_URL}/ja/blog/category/${localizedCategorySlug(c.slug)}`,
    lastModified: LAST_CONTENT_UPDATE,
    changeFrequency: 'weekly' as const,
    priority: 0.76,
  }))

  // English guide pages
  const englishGuides: MetadataRoute.Sitemap = guides.map(g => ({
    url: `${SITE_URL}/blog/${g.slug}`,
    lastModified: guideLastMod(g.date),
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }))

  // German guide pages - only those with a translated body (others are noindex)
  const germanGuides: MetadataRoute.Sitemap = guides
    .filter(g => isDeTranslated(g.slug))
    .map(g => ({
      url: `${SITE_URL}/de/blog/${g.slug}`,
      lastModified: guideLastMod(g.date),
      changeFrequency: 'monthly' as const,
      priority: 0.71,
    }))

  // Japanese guide pages - only those with a translated body (others are noindex)
  const japaneseGuides: MetadataRoute.Sitemap = guides
    .filter(g => isJaTranslated(g.slug))
    .map(g => ({
      url: `${SITE_URL}/ja/blog/${g.slug}`,
      lastModified: guideLastMod(g.date),
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
