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
  /** Jo, Nov 23: the legal entity, shown in the footer so Meta's business verification can match the site. */
  legalName: 'SIMPLE TAX SERVICES PTY LTD',
  /** Mia's own WhatsApp number (Jo, 20 Nov 2026): a separate line in SVT's own
   *  Meta account. It is real, so it also goes into SVT structured data. */
  phone: '0431 667 124',
  whatsappNumber: '61431667124',
  whatsappIsPlaceholder: false,
  /** GA4 property "Student Visa Tax" (its own account, Jo, 27 Oct). Public by nature. */
  gaMeasurementId: 'G-YHFJYVG620',
  /** Google Business Profile "Student Visa Tax", review link (Jo, 27 Oct). */
  googleReviewUrl: 'https://g.page/r/CW65-TcfMaArECE/review',
  /**
   * The real Google rating, set by hand once the first reviews exist, e.g.
   * { score: '5.0', count: 3 }. While it is null the badge shows no score and
   * no stars (a rating that does not exist must never be displayed).
   */
  googleRating: null as null | { score: string; count: number },
} as const

/** A wa.me link to the SVT number, with an optional prefilled message. */
export function svtWhatsappUrl(text?: string): string {
  const base = `https://wa.me/${SVT_PUBLIC.whatsappNumber}`
  // Every SVT message names Student Visa Tax. SVT has its own number since 20 Nov,
  // but a chat that ever reaches Will's number is still recognised and handed over.
  const body = !text ? 'Hi Student Visa Tax' : /student visa tax/i.test(text) ? text : `Student Visa Tax: ${text}`
  return `${base}?text=${encodeURIComponent(body)}`
}
