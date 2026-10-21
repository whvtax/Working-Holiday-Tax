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

function send(event: string, params: Record<string, unknown> = {}) {
  try {
    if (typeof window === 'undefined') return
    const path = window.location?.pathname || ''
    const ai = aiSource()
    window.gtag?.('event', event, { page_path: path, ...(ai ? { ai_source: ai } : {}), ...params })
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
