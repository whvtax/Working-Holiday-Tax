import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/constants'
import { guides, categoryMeta } from './blog/data'

const routes = [
  { url: '/',                          priority: 1.0,  changeFrequency: 'monthly' },
  // Primary services (high priority)
  { url: '/tfn',                       priority: 0.9,  changeFrequency: 'monthly' },
  { url: '/tax-return',                priority: 0.9,  changeFrequency: 'monthly' },
  { url: '/superannuation',            priority: 0.9,  changeFrequency: 'monthly' },
  { url: '/abn',                       priority: 0.8,  changeFrequency: 'monthly' },
  { url: '/calculator',                priority: 0.8,  changeFrequency: 'monthly' },
  { url: '/medicare',                  priority: 0.7,  changeFrequency: 'monthly' },
  // Blog hub
  { url: '/blog',                      priority: 0.85, changeFrequency: 'weekly'  },
  // Contact and supporting pages
  { url: '/contact',                   priority: 0.7,  changeFrequency: 'monthly' },
  // Informational pages
  { url: '/tax-residency',             priority: 0.6,  changeFrequency: 'yearly'  },
  { url: '/tax-residency-explained',   priority: 0.6,  changeFrequency: 'yearly'  },
  { url: '/payslip',                   priority: 0.5,  changeFrequency: 'yearly'  },
  { url: '/gst',                       priority: 0.5,  changeFrequency: 'yearly'  },
  { url: '/permanent-vs-casual',       priority: 0.5,  changeFrequency: 'yearly'  },
  // Legal
  { url: '/client-agreement',          priority: 0.4,  changeFrequency: 'yearly'  },
  { url: '/privacy',                   priority: 0.4,  changeFrequency: 'yearly'  },
] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = routes.map(r => ({
    url: `${SITE_URL}${r.url}`,
    lastModified: new Date(),
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }))

  const categoryPages: MetadataRoute.Sitemap = categoryMeta.map(c => ({
    url: `${SITE_URL}/blog/category/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const guidePages: MetadataRoute.Sitemap = guides.map(g => ({
    url: `${SITE_URL}/blog/${g.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }))

  return [...staticPages, ...categoryPages, ...guidePages]
}
