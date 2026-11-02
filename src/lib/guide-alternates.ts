/**
 * hreflang for a guide (ADR 013). A language is listed only when that language
 * has a real, native page for the slug. Never an untranslated page.
 */
import { SITE_URL } from '@/lib/constants'
import { dePostTranslations } from '@/app/(de)/de/blog/data'
import { jaPostTranslations } from '@/app/(ja)/ja/blog/data'
import { hasFrenchGuide } from '@/app/(fr)/fr/blog/data'
import { hasItalianGuide } from '@/app/(it)/it/blog/data'
import { hasSpanishGuide } from '@/app/(es)/es/blog/data'

/** fr, it and es entries only, for pages that already manage their own en, de and ja entries. */
export function newLocaleGuideLanguages(slug: string): Record<string, string> {
  const out: Record<string, string> = {}
  if (hasFrenchGuide(slug)) out.fr = `${SITE_URL}/fr/blog/${slug}`
  if (hasItalianGuide(slug)) out.it = `${SITE_URL}/it/blog/${slug}`
  if (hasSpanishGuide(slug)) out.es = `${SITE_URL}/es/blog/${slug}`
  return out
}

/** Full hreflang map for a guide page of a new locale. */
export function newLocaleGuideAlternates(slug: string): Record<string, string> {
  return {
    'en-AU': `${SITE_URL}/blog/${slug}`,
    ...(dePostTranslations[slug]?.body ? { de: `${SITE_URL}/de/blog/${slug}` } : {}),
    ...(jaPostTranslations[slug]?.body ? { ja: `${SITE_URL}/ja/blog/${slug}` } : {}),
    ...newLocaleGuideLanguages(slug),
    'x-default': `${SITE_URL}/blog/${slug}`,
  }
}
