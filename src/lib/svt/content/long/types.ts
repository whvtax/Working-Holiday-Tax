/**
 * The long-form article library for Student Visa Tax (Jo, 27 Oct 2026:
 * "everything relevant to students from the WHT library must be here").
 *
 * One English entry per article; Chinese and Vietnamese are separate texts
 * keyed by the same slug (written natively, never line-by-line). An article
 * without a text in a language is simply not published in that language.
 *
 * `body` is a small Markdown subset, rendered by LongArticlePage:
 *   - paragraphs separated by a blank line
 *   - "## Heading" for sections (each becomes a table-of-contents entry)
 *   - "- item" lines for bullet lists
 *   - **bold** inside a line
 * No other Markdown, no HTML, no links inside the body (sources go in
 * `sources`), no backticks.
 */
export type LongCategory = 'TFN' | 'Tax return' | 'Deductions' | 'Work' | 'ABN' | 'Super' | 'Medicare'

export interface LongArticle {
  /** URL slug under /blog/. Lowercase, hyphens, unique across the site. */
  slug: string
  category: LongCategory
  /** ISO dates. */
  published: string
  updated: string
  /** H1 and the page title (<= 70 characters is best). */
  title: string
  /** Meta description and the lead under the title (140-170 characters). */
  description: string
  /** The direct answer, 1-2 sentences, shown first in a box (AI engines quote it). */
  answer: string
  body: string
  faq: ReadonlyArray<{ q: string; a: string }>
  /** Official sources only (ato.gov.au, fairwork.gov.au, servicesaustralia.gov.au, abr.gov.au...). */
  sources: ReadonlyArray<{ label: string; href: string }>
}

/** A translation: the words only. Slug, category, dates and sources come
 *  from the English entry. */
export interface LongText {
  title: string
  description: string
  answer: string
  body: string
  faq: ReadonlyArray<{ q: string; a: string }>
}
