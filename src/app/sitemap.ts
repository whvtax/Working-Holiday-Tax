import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/constants'

const routes = [
  { url: '/',                  priority: 1.0,  changeFrequency: 'monthly' },
  { url: '/tfn',               priority: 0.9,  changeFrequency: 'monthly' },
  { url: '/tax-return',        priority: 0.9,  changeFrequency: 'monthly' },
  { url: '/superannuation',    priority: 0.9,  changeFrequency: 'monthly' },
  { url: '/abn',               priority: 0.8,  changeFrequency: 'monthly' },
  { url: '/calculator',        priority: 0.8,  changeFrequency: 'monthly' },
  { url: '/tax-residency',     priority: 0.8,  changeFrequency: 'monthly' },
  { url: '/medicare',          priority: 0.7,  changeFrequency: 'monthly' },
  { url: '/contact',           priority: 0.7,  changeFrequency: 'monthly' },
  { url: '/client-agreement',  priority: 0.4,  changeFrequency: 'yearly'  },
  { url: '/privacy',           priority: 0.4,  changeFrequency: 'yearly'  },
] as const

export default function sitemap(): MetadataRoute.Sitemap {
  // Use a fixed date so crawlers don't see every page as "just modified" on each request.
  // Update this when content changes significantly.
  const lastModified = new Date('2025-07-01')
  return routes.map(r => ({
    url: `${SITE_URL}${r.url}`,
    lastModified,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }))
}
