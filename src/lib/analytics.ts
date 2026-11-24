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

/* ── AI search attribution (Oct 2026) ─────────────────────────────────────
 * Visitors arriving from ChatGPT, Perplexity, Copilot, Gemini or Claude are
 * the audience the AI search work is for, and GA4 lumps most of them into
 * "referral" or "direct". The first page of a session records which assistant
 * sent the visitor (from the referrer, or utm_source=chatgpt.com, which
 * ChatGPT appends), fires one ai_referral event, and every later event in the
 * session carries ai_source so WhatsApp clicks can be credited to it.
 * Stored in sessionStorage only, and every access is wrapped. */
const AI_SOURCES: Array<[RegExp, string]> = [
  [/(^|\.)(chatgpt\.com|chat\.openai\.com|openai\.com)$/i, 'chatgpt'],
  [/(^|\.)perplexity\.ai$/i, 'perplexity'],
  [/(^|\.)copilot\.microsoft\.com$/i, 'copilot'],
  [/(^|\.)gemini\.google\.com$/i, 'gemini'],
  [/(^|\.)claude\.ai$/i, 'claude'],
  [/(^|\.)you\.com$/i, 'you'],
  [/(^|\.)duckduckgo\.com$/i, ''], // ordinary search, deliberately not AI
]

export function detectAiSource(referrer: string, search: string): string {
  try {
    const utm = new URLSearchParams(search).get('utm_source') || ''
    for (const [re, name] of AI_SOURCES) if (name && re.test(utm)) return name
    if (!referrer) return ''
    const host = new URL(referrer).hostname
    for (const [re, name] of AI_SOURCES) if (re.test(host)) return name
  } catch { /* malformed referrer or URL */ }
  return ''
}

function aiSource(): string {
  try {
    const key = 'wht_ai_source'
    const stored = window.sessionStorage.getItem(key)
    if (stored !== null) return stored
    const found = detectAiSource(document.referrer, window.location.search)
    window.sessionStorage.setItem(key, found)
    if (found) window.gtag?.('event', 'ai_referral', { ai_source: found, page_path: window.location.pathname })
    return found
  } catch {
    return ''
  }
}

/** Called once on load by <Analytics/> so the referral is caught even without a click. */
export function initAiAttribution() {
  if (typeof window !== 'undefined') aiSource()
}

function send(event: string, params: Record<string, unknown> = {}, beacon = false) {
  try {
    if (typeof window === 'undefined') return
    const path = window.location?.pathname || ''
    const ai = aiSource()
    // transport_type 'beacon': the WhatsApp tap hands the visitor to another
    // app or page in the same instant, and a plain request can be cancelled
    // with the page. A beacon is queued by the browser and survives that.
    window.gtag?.('event', event, { page_path: path, ...(ai ? { ai_source: ai } : {}), ...params, ...(beacon ? { transport_type: 'beacon' } : {}) })
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
  lastWhatsAppSent = Date.now()
  send('whatsapp_click', {
    cta_position: p.position,
    topic: p.topic ?? 'general',
    language: p.lang ?? 'en',
    tier: p.tier ?? 'unknown',
  }, true)
}

/** When the last whatsapp_click went out, so the site-wide link listener in
 *  <Analytics/> does not count a tap a component already counted. */
let lastWhatsAppSent = 0

/** True for a link that opens a WhatsApp chat with a phone number (wa.me/<number>,
 *  api.whatsapp.com or whatsapp.com/send with phone=, or the whatsapp: app scheme with
 *  phone=). A "Share on WhatsApp" link (wa.me/?text=..., no number) is not an enquiry
 *  to us and is not counted as whatsapp_click. */
export function isWhatsAppHref(href: string | null | undefined): boolean {
  if (!href) return false
  if (/^https?:\/\/wa\.me\/\+?\d+(?:[/?#]|$)/i.test(href)) return true
  if (/^(?:https?:\/\/(?:api\.whatsapp\.com|(?:www\.)?whatsapp\.com)\/send|whatsapp:\/\/send)(?:[/?#]|$)/i.test(href)) {
    return /[?&]phone=\+?\d+/i.test(href)
  }
  return false
}

const SITE_LANGS = ['de', 'ja', 'fr', 'it', 'es', 'zh', 'vi']

/**
 * The site-wide catch for WhatsApp taps, called by <Analytics/> for every
 * click on a WhatsApp link, on both brands. Most WhatsApp links on the site
 * are plain links in server-rendered pages with no click handler of their
 * own, so before this only the handful of client components that called
 * trackWhatsApp were ever counted. Where a component already sent the event
 * for this tap (within the last second), nothing is sent twice.
 *
 * Only the placement, the page language and the topic the page set are sent.
 * The prefilled message text is never read or sent.
 */
export function trackWhatsAppLink(a: Element, now = Date.now()): boolean {
  try {
    if (now - lastWhatsAppSent < 1000) return false
    const pos = a.getAttribute('data-wa-pos')
      || (a.closest('.mobile-cta-bar, [data-sticky-wa]') ? 'sticky'
        : a.closest('.guide-cta') ? 'guide-end'
        : a.closest('nav, header') ? 'nav'
        : a.closest('footer') ? 'footer'
        : 'inline')
    const first = (typeof window !== 'undefined' ? window.location.pathname : '').split('/')[1] ?? ''
    trackWhatsApp({
      position: pos,
      topic: a.getAttribute('data-wa-topic') ?? undefined,
      lang: SITE_LANGS.includes(first) ? first : 'en',
    })
    return true
  } catch {
    return false
  }
}

/** Test hook: forget the last send so dedupe does not leak between tests. */
export function _resetWhatsAppDedupe() { lastWhatsAppSent = 0 }

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
  }, true)
}

/** Fired once per page at 75% depth. Separates real reading from a bounce. */
export function trackDepth(lang = 'en') {
  send('scroll_75', { language: lang })
}
