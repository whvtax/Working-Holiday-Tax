/**
 * The two brands that share this codebase.
 *
 * Routing (which host serves which pages) lives in config/brand-routing.js,
 * because next.config.js needs it at build time. This module is the runtime
 * side: server code that records or varies by brand calls `brandFromHost`
 * with the request's Host header. The brand is NEVER taken from the request
 * body, a query string or anything else the client controls apart from the
 * host the request was routed by.
 *
 * Customer-facing separation (Jo, 26 Oct): neither brand mentions or links to
 * the other anywhere a customer can see. Keep each brand's details here and
 * read them from here; never hard-code the other brand into shared copy.
 */
import routing from '../../config/brand-routing'
import { SVT_PUBLIC } from './svt/brand-public'

export type Brand = 'wht' | 'svt'

export const BRAND_IDS: readonly Brand[] = ['wht', 'svt'] as const

export interface BrandConfig {
  id: Brand
  name: string
  domain: string
  siteUrl: string
  email: string
  /** Display phone. SVT's is a PLACEHOLDER until the new WhatsApp number
   *  exists (DEPLOYMENT_CHECKLIST.md, Student Visa Tax launch). */
  phone: string
  /** wa.me number: country code, no plus, no leading zero. */
  whatsappNumber: string
  /** True while the number is not a real, live WhatsApp line. The launch
   *  check (DEPLOYMENT_CHECKLIST.md) fails while any brand has this set. */
  whatsappIsPlaceholder: boolean
  locales: readonly string[]
  defaultLocale: string
}

export const BRANDS: Readonly<Record<Brand, BrandConfig>> = {
  wht: {
    id: 'wht',
    name: 'Working Holiday Tax',
    domain: 'workingholidaytax.com.au',
    siteUrl: 'https://workingholidaytax.com.au',
    email: 'info@workingholidaytax.com.au',
    phone: '0424 513 998',
    whatsappNumber: '61424513998',
    whatsappIsPlaceholder: false,
    locales: ['en-AU', 'de', 'ja'],
    defaultLocale: 'en-AU',
  },
  svt: {
    ...SVT_PUBLIC,
    locales: ['en-AU', 'zh-CN', 'vi'],
    defaultLocale: 'en-AU',
  },
}

export const SVT_HOSTS: readonly string[] = routing.SVT_HOSTS

/** Host header → brand. Port and case are ignored, exactly like the router.
 *  Anything that is not an SVT host is WHT, so the live brand's behaviour
 *  never depends on a host list being right. */
export function brandFromHost(host: string | null | undefined): Brand {
  if (!host) return 'wht'
  const hostname = host.split(':', 1)[0].trim().toLowerCase()
  return SVT_HOSTS.includes(hostname) ? 'svt' : 'wht'
}

/** Narrow an unknown value (a database row, a JSON field) to a Brand. */
export function isBrand(value: unknown): value is Brand {
  return value === 'wht' || value === 'svt'
}

/** A wa.me link for a brand, with an optional prefilled message. */
export function whatsappUrl(brand: Brand, text?: string): string {
  const base = `https://wa.me/${BRANDS[brand].whatsappNumber}`
  return text ? `${base}?text=${encodeURIComponent(text)}` : base
}
