/**
 * Student Visa Tax's public details, and NOTHING about the other brand.
 *
 * SVT pages and client components import from here, never from
 * '@/lib/brand' (which holds both brands): whatever a client component
 * imports ships in the browser, and an SVT page must not carry WHT's name,
 * domain or number in its JavaScript (e2e "scripts loaded by each brand").
 * '@/lib/brand' builds its SVT entry from this file, so there is one source.
 */
export const SVT_PUBLIC = {
  id: 'svt',
  name: 'Student Visa Tax',
  domain: 'studentvisatax.com.au',
  siteUrl: 'https://studentvisatax.com.au',
  email: 'info@studentvisatax.com.au',
  /** PLACEHOLDER until the new WhatsApp number exists (DEPLOYMENT_CHECKLIST.md). */
  phone: '04123123123',
  /** wa.me number, placeholder derived from the phone above. */
  whatsappNumber: '614123123123',
  whatsappIsPlaceholder: true,
  /** GA4 property "Student Visa Tax" (its own account, Jo, 27 Oct). Public by nature. */
  gaMeasurementId: 'G-YHFJYVG620',
  /** Google Business Profile "Student Visa Tax", review link (Jo, 27 Oct). */
  googleReviewUrl: 'https://g.page/r/CW65-TcfMaArECE/review',
} as const

/** A wa.me link to the SVT number, with an optional prefilled message. */
export function svtWhatsappUrl(text?: string): string {
  const base = `https://wa.me/${SVT_PUBLIC.whatsappNumber}`
  return text ? `${base}?text=${encodeURIComponent(text)}` : base
}
