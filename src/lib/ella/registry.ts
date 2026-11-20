/**
 * Turns the library into registry rows: pillar, exclusions, content hash.
 * Rules come from the Ella script bible, sections 5 and 14.
 */
import { contentHash, type SourceArticle } from './library'

export const PILLARS = [
  'Myth vs fact',
  'Before you lodge',
  'Deadlines',
  'Work and income',
  'Trust and safety',
] as const
export type Pillar = (typeof PILLARS)[number]

/** Bible section 5: target content mix (default, Jo can change). */
export const TARGET_MIX: Readonly<Record<Pillar, number>> = {
  'Myth vs fact': 0.30,
  'Before you lodge': 0.25,
  'Deadlines': 0.15,
  'Work and income': 0.20,
  'Trust and safety': 0.10,
}

/** Bible section 14: internal, legal and sales pages are never drawn. */
export const EXCLUDED_SLUGS: Readonly<Record<string, string>> = {
  'pricing': 'sales page',
  'how-it-works': 'sales page',
  'about': 'sales page',
  'superannuation': 'service page',
}

export function pillarFor(a: SourceArticle): Pillar {
  const s = a.slug
  if (/scam|fake|fraud/.test(s)) return 'Trust and safety'
  if (/myth|true-or-false/.test(s)) return 'Myth vs fact'
  if (/deadline|late|31-october|penalt|past-years|missed|overdue/.test(s)) return 'Deadlines'
  if (['TFN', 'ABN', 'Work', 'Super'].includes(a.category)) return 'Work and income'
  return 'Before you lodge'
}

export interface RegistryEntry {
  slug: string
  kind: SourceArticle['kind']
  title: string
  category: string
  pillar: Pillar
  contentHash: string
  updated: string
  excluded: boolean
  excludeReason: string | null
}

export function toRegistry(library: readonly SourceArticle[]): RegistryEntry[] {
  return library.map(a => ({
    slug: a.slug,
    kind: a.kind,
    title: a.title,
    category: a.category,
    pillar: pillarFor(a),
    contentHash: contentHash(a),
    updated: a.updated,
    excluded: a.slug in EXCLUDED_SLUGS,
    excludeReason: EXCLUDED_SLUGS[a.slug] ?? null,
  }))
}

/**
 * Weight per pillar for the draw: pillars below their target share in the
 * recent episodes weigh more. With no history every pillar weighs its target.
 */
export function pillarWeights(recentPillars: readonly string[]): Record<Pillar, number> {
  const out = {} as Record<Pillar, number>
  const n = recentPillars.length
  for (const p of PILLARS) {
    const target = TARGET_MIX[p]
    if (n === 0) { out[p] = target; continue }
    const actual = recentPillars.filter(x => x === p).length / n
    // Below target: up to 3x; above target: down to 0.25x.
    out[p] = Math.round(Math.min(3, Math.max(0.25, target / Math.max(actual, 0.05))) * target * 1000) / 1000
  }
  return out
}

/** Key terms used as the core message in the last 10 episodes, for the skip filter. */
export function recentKeyTerms(recent: ReadonlyArray<{ keyTerm: string | null }>): string[] {
  return [...new Set(recent.slice(0, 10)
    .map(r => {
      const t = (r.keyTerm ?? '').trim().toLowerCase()
      // A spelled acronym ("A-B-N") matches slugs as "abn"; words match as "tax-residency".
      if (/^[a-z](-[a-z])+$/.test(t)) return t.replace(/-/g, '')
      return t.replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
    })
    .filter(Boolean))]
}
