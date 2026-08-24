/**
 * GA4 event helpers.
 *
 * Before this file existed the property tracked seven blog reading events and
 * not one conversion, which made "which page brings us leads" unanswerable.
 * The site has exactly one conversion action, the tap through to WhatsApp, so
 * that is what is measured, with enough context to compare pages, languages,
 * placements and service tiers against each other.
 *
 * Everything is wrapped: analytics must never be able to break a link.
 */

// Window.gtag and Window.dataLayer are already declared in src/app/blog/analytics.ts.
// Declaring them a second time here would conflict, so this file just uses them.

function send(event: string, params: Record<string, unknown> = {}) {
  try {
    if (typeof window === 'undefined') return
    const path = window.location?.pathname || ''
    window.gtag?.('event', event, { page_path: path, ...params })
  } catch {
    /* never let a measurement failure surface to the visitor */
  }
}

/** Where on the page the WhatsApp link sat. Keep these values stable. */
export type WaPosition =
  | 'hero'
  | 'inline'
  | 'section'
  | 'sticky'
  | 'footer'
  | 'guide-end'
  | 'guide-inline'
  | 'nav'
  | 'calculator-result'

/** The site's single key event. Mark it as a conversion in GA4. */
export function trackWhatsApp(p: {
  position: WaPosition | string
  topic?: string
  lang?: string
  tier?: string
}) {
  send('whatsapp_click', {
    cta_position: p.position,
    topic: p.topic ?? 'general',
    language: p.lang ?? 'en',
    tier: p.tier ?? 'unknown',
  })
}

/** The visitor said which service level they are, before opening the chat. */
export function trackTier(tier: string, lang = 'en') {
  send('tier_selected', { tier, language: lang })
}

/** The calculator produced a figure. Measures whether the tool earns its place. */
export function trackCalculator(p: { lang?: string; hasAbn?: boolean }) {
  send('calculator_complete', {
    language: p.lang ?? 'en',
    has_abn: p.hasAbn ? 'yes' : 'no',
  })
}

/** A guide reader engaged with the end of article or in body CTA. */
export function trackGuideCta(p: { slug: string; category?: string; lang?: string; position?: string }) {
  send('guide_cta_click', {
    guide_slug: p.slug,
    guide_category: p.category ?? 'unknown',
    language: p.lang ?? 'en',
    cta_position: p.position ?? 'guide-end',
  })
}

/** Fired once per page at 75% depth. Separates real reading from a bounce. */
export function trackDepth(lang = 'en') {
  send('scroll_75', { language: lang })
}
