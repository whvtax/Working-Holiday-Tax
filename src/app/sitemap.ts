import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/constants'
import { guides } from './guides/data'

const routes = [
  { url: '/',                  priority: 1.0,  changeFrequency: 'monthly' },
  { url: '/tfn',               priority: 0.9,  changeFrequency: 'monthly' },
  { url: '/tax-return',        priority: 0.9,  changeFrequency: 'monthly' },
  { url: '/superannuation',    priority: 0.9,  changeFrequency: 'monthly' },
  { url: '/abn',               priority: 0.8,  changeFrequency: 'monthly' },
  { url: '/calculator',        priority: 0.8,  changeFrequency: 'monthly' },
  { url: '/medicare',          priority: 0.7,  changeFrequency: 'monthly' },
  { url: '/guides',            priority: 0.85, changeFrequency: 'weekly'  },
  { url: '/contact',           priority: 0.7,  changeFrequency: 'monthly' },
  { url: '/tax-residency',      priority: 0.6,  changeFrequency: 'yearly'  },
  { url: '/client-agreement',  priority: 0.4,  changeFrequency: 'yearly'  },
  { url: '/privacy',           priority: 0.4,  changeFrequency: 'yearly'  },
] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = routes.map(r => ({
    url: `${SITE_URL}${r.url}`,
    lastModified: new Date(),
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }))

  const guidePages: MetadataRoute.Sitemap = guides.map(g => ({
    url: `${SITE_URL}/guides/${g.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }))

  return [...staticPages, ...guidePages]
}
