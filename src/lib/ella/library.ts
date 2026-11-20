/**
 * Ella reads the SVT blog library. Read only: nothing here writes to the site.
 *
 * The site keeps its English articles in code (three collections). This file
 * turns them into one flat shape Ella can draw from and write scripts from.
 * The site's own types are not imported, so Ella does not depend on them
 * changing; only the fields below are used.
 */
import { createHash } from 'node:crypto'

export type ArticleKind = 'long' | 'blog' | 'guide'

export interface SourceArticle {
  slug: string
  kind: ArticleKind
  title: string
  category: string
  updated: string
  /** The short direct answer, when the article has one. */
  answer: string
  /** All readable text: answer, lead, body, FAQ. Used for facts and grounding. */
  text: string
  sources: ReadonlyArray<{ label: string; href: string }>
}

type Faq = ReadonlyArray<{ q: string; a: string }> | undefined
type Block = { p?: string; list?: readonly string[]; note?: string }

interface LongLike {
  slug: string; category: string; updated: string; title: string; description: string
  answer: string; body: string; faq: ReadonlyArray<{ q: string; a: string }>
  sources: ReadonlyArray<{ label: string; href: string }>
}
interface GuideLike {
  slug: string; updated: string; label: string
  meta: { title: string; description: string }
  lead: string
  sections: ReadonlyArray<{ title: string; blocks: readonly Block[] }>
  faq?: ReadonlyArray<{ q: string; a: string }>
  short?: { answer: string }
  sources: ReadonlyArray<{ label: string; href: string }>
  category?: string
}

const faqText = (faq: Faq) => (faq ?? []).map(f => `${f.q}\n${f.a}`).join('\n\n')

function blocksText(sections: GuideLike['sections']): string {
  return sections.map(s => [
    `## ${s.title}`,
    ...s.blocks.map(b => b.p ?? b.note ?? (b.list ? b.list.map(i => `- ${i}`).join('\n') : '')),
  ].join('\n\n')).join('\n\n')
}

export function fromLong(a: LongLike): SourceArticle {
  return {
    slug: a.slug, kind: 'long', title: a.title, category: a.category, updated: a.updated,
    answer: a.answer,
    text: [a.answer, a.body, faqText(a.faq)].join('\n\n'),
    sources: a.sources,
  }
}

export function fromGuide(g: GuideLike, kind: 'blog' | 'guide'): SourceArticle {
  const answer = g.short?.answer ?? ''
  return {
    slug: g.slug, kind, title: g.meta.title, category: g.category ?? 'Guide', updated: g.updated,
    answer,
    text: [answer, g.lead, blocksText(g.sections), faqText(g.faq)].filter(Boolean).join('\n\n'),
    sources: g.sources,
  }
}

export function buildLibrary(input: {
  long: readonly LongLike[]
  blog: readonly GuideLike[]
  guides: readonly GuideLike[]
}): SourceArticle[] {
  const all = [
    ...input.long.map(fromLong),
    ...input.blog.map(b => fromGuide(b, 'blog')),
    ...input.guides.map(g => fromGuide(g, 'guide')),
  ]
  const seen = new Set<string>()
  for (const a of all) {
    if (seen.has(a.slug)) throw new Error(`Duplicate slug in library: ${a.slug}`)
    seen.add(a.slug)
  }
  return all
}

export const contentHash = (a: SourceArticle) =>
  createHash('sha256').update(`${a.title}\n${a.text}`).digest('hex').slice(0, 32)
