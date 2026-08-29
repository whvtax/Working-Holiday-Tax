/**
 * Vendor-neutral analytics tracker for the blog.
 * Pushes events to window.dataLayer (GA4/GTM), window.plausible (Plausible), and window.posthog (PostHog) if available.
 * Safe to call unconditionally - if no provider is loaded, the call is a no-op.
 *
 * Events:
 *   blog_search        - user typed in the search box (debounced)
 *   blog_search_no_results - search returned 0 results
 *   blog_category_filter - user clicked a category pill
 *   blog_article_open  - user clicked into an article
 *   blog_helpful_feedback - user clicked Yes/No on helpful widget
 *   blog_share         - user clicked a share button
 *   blog_toc_click     - user clicked a TOC item
 */

type EventName =
  | 'blog_search'
  | 'blog_search_no_results'
  | 'blog_category_filter'
  | 'blog_article_open'
  | 'blog_helpful_feedback'
  | 'blog_share'
  | 'blog_toc_click'

interface EventProps {
  [key: string]: string | number | boolean | undefined
}

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>
    plausible?: (event: string, options?: { props?: Record<string, unknown> }) => void
    posthog?: {
      capture: (event: string, props?: Record<string, unknown>) => void
    }
    gtag?: (command: string, eventName: string, params?: Record<string, unknown>) => void
  }
}

/**
 * Track a custom event. Fans out to whichever provider is loaded.
 * No-op on server. No-op if no provider is present.
 */
export function trackEvent(event: EventName, props?: EventProps): void {
  if (typeof window === 'undefined') return

  try {
    // GTM / GA4 via dataLayer
    if (window.dataLayer) {
      window.dataLayer.push({ event, ...props })
    }

    // GA4 direct (if gtag is loaded)
    if (typeof window.gtag === 'function') {
      window.gtag('event', event, props)
    }

    // Plausible
    if (typeof window.plausible === 'function') {
      window.plausible(event, props ? { props } : undefined)
    }

    // PostHog
    if (window.posthog && typeof window.posthog.capture === 'function') {
      window.posthog.capture(event, props)
    }
  } catch (e) {
    // Never break the UI because of analytics
    if (process.env.NODE_ENV === 'development') {
      console.warn('Analytics error:', e)
    }
  }
}

/**
 * Debounced search tracking. Avoids firing on every keystroke.
 */
let searchTimer: ReturnType<typeof setTimeout> | null = null
export function trackSearchDebounced(query: string, resultCount: number, delayMs = 1000): void {
  if (searchTimer) clearTimeout(searchTimer)
  searchTimer = setTimeout(() => {
    if (!query.trim()) return
    trackEvent('blog_search', { query, result_count: resultCount })
    if (resultCount === 0) {
      trackEvent('blog_search_no_results', { query })
    }
  }, delayMs)
}
