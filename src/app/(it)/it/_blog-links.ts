/**
 * Link helper for guides that may or may not exist in Italian yet.
 *
 * The Italian blog is built guide by guide. Until a guide is translated, an
 * Italian page must not link to /it/blog/<slug> (404). It links to the English
 * guide instead and says so in the label.
 *
 * LIVE_IT_GUIDES is derived from the chunk data (every slug with a native
 * body), so every link built with itGuide() switches to the Italian URL
 * exactly when the guide exists.
 */
import { getItalianGuideSlugs } from './blog/data'

const LIVE_IT_SET: ReadonlySet<string> = new Set(getItalianGuideSlugs())
export const LIVE_IT_GUIDES: readonly string[] = [...LIVE_IT_SET]

export interface GuideLink {
  href: string
  /** Label with " (in inglese)" appended when only the English guide exists. */
  label: string
  inEnglish: boolean
}

/** Returns the Italian guide URL if it is live, otherwise the English one. */
export function itGuide(slug: string, label: string): GuideLink {
  const live = LIVE_IT_SET.has(slug)
  return live
    ? { href: `/it/blog/${slug}`, label, inEnglish: false }
    : { href: `/blog/${slug}`, label: `${label} (in inglese)`, inEnglish: true }
}

/** Just the href, for link lists that keep their own title field. */
export function itGuideHref(slug: string): string {
  return LIVE_IT_SET.has(slug) ? `/it/blog/${slug}` : `/blog/${slug}`
}

/** Suffix for a visible label next to a link built with itGuideHref. */
export function itGuideSuffix(slug: string): string {
  return LIVE_IT_SET.has(slug) ? '' : ' (in inglese)'
}
