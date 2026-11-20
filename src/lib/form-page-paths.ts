/**
 * The public paths of the tax form pages, per brand and locale (decision 017).
 *
 * These URLs can carry a personal form token (?k=), so both documents hand
 * this list to <Analytics untagged> and the pages are never sent to Google
 * Analytics. One list, so a new locale cannot be added to the pages and
 * forgotten here: a test compares it with the page folders on disk.
 */
import formPaths from '../../config/form-paths'

/** Locale prefixes the WHT form and residency step live under (English has none). */
export const WHT_FORM_LOCALES = ['de', 'ja', 'es', 'fr', 'it', 'pt', 'zh', 'vi'] as const
/** Locale prefixes the SVT form lives under (English has none). */
export const SVT_FORM_LOCALES = ['zh', 'vi', 'de', 'ja', 'es', 'fr', 'it', 'pt'] as const

const WHT_SLUGS: readonly string[] = [formPaths.WHT['tax-form'], formPaths.WHT['tax-residency']]

export const WHT_TOKEN_FORM_PATHS: readonly string[] = WHT_SLUGS.flatMap((slug) => [
  `/${slug}`, ...WHT_FORM_LOCALES.map((l) => `/${l}/${slug}`),
])

/** Prefix match in <Analytics>, so the residency step under each form is covered. */
export const SVT_FORM_PAGE_PATHS: readonly string[] = [
  `/${formPaths.SVT.form}`, ...SVT_FORM_LOCALES.map((l) => `/${l}/${formPaths.SVT.form}`),
]
