/**
 * Links from the French pages to French blog guides.
 *
 * A French guide is linked only once it is live. Until then the link points at
 * the English guide of the same slug and says so, so no link ever 404s.
 * LIVE_FR_GUIDES is derived from the chunk data (every slug with a native
 * body), so a guide is linked in French exactly when it exists.
 */
import { getFrenchGuideSlugs } from './blog/data'

export const LIVE_FR_GUIDES: ReadonlySet<string> = new Set(getFrenchGuideSlugs())

const NBSP = ' '

function resolve(slug: string, text: string): { href: string; text: string } {
  if (LIVE_FR_GUIDES.has(slug)) return { href: `/fr/blog/${slug}`, text }
  return { href: `/blog/${slug}`, text: `${text}${NBSP}(en anglais)` }
}

/** For link rows shaped { href, title }. */
export function frGuide(slug: string, title: string): { href: string; title: string } {
  const r = resolve(slug, title)
  return { href: r.href, title: r.text }
}

/** For link rows shaped { href, label }. */
export function frGuideLabel(slug: string, label: string): { href: string; label: string } {
  const r = resolve(slug, label)
  return { href: r.href, label: r.text }
}
