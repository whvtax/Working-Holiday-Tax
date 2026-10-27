/**
 * The long-form articles in every language, shaped as GuideContent so they
 * render with the same article template (GuidePage) as the original guides.
 */
import type { GuideBlock, GuideContent, GuideSection } from '../guides-en'
import type { SvtLocale } from '@/lib/svt/i18n'
import type { LongArticle, LongCategory, LongText } from './types'
import { LONG_EN } from './en'
import { LONG_ZH } from './zh'
import { LONG_VI } from './vi'

export { LONG_EN }
export type { LongArticle, LongCategory }

const TEXTS: Readonly<Record<Exclude<SvtLocale, 'en'>, Readonly<Record<string, LongText>>>> = { zh: LONG_ZH, vi: LONG_VI }

/** An article in a language, or undefined when it has no text there yet. */
export function longIn(locale: SvtLocale, a: LongArticle): LongArticle | undefined {
  if (locale === 'en') return a
  const t = TEXTS[locale][a.slug]
  return t ? { ...a, ...t } : undefined
}

export function longFor(locale: SvtLocale): readonly LongArticle[] {
  return LONG_EN.flatMap(a => { const x = longIn(locale, a); return x ? [x] : [] })
}

export const longArticleFor = (locale: SvtLocale, slug: string) => {
  const a = LONG_EN.find(x => x.slug === slug)
  return a ? longIn(locale, a) : undefined
}

/** Languages an article is published in. */
export function longLocales(slug: string): SvtLocale[] {
  const a = LONG_EN.find(x => x.slug === slug)
  if (!a) return []
  return (['en', 'zh', 'vi'] as const).filter(l => l === 'en' || !!TEXTS[l][slug])
}

const clean = (s: string) => s.replace(/\*\*(.+?)\*\*/g, '$1').trim()
const idOf = (s: string, used: Set<string>) => {
  let id = s.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-|-$/g, '').slice(0, 60) || 'section'
  while (used.has(id)) id += '-x'
  used.add(id)
  return id
}

/** The Markdown subset (paragraphs, "## " headings, "- " lists) as sections. */
export function parseBody(body: string): GuideSection[] {
  const sections: GuideSection[] = []
  const used = new Set<string>()
  let cur: { id: string; title: string; blocks: GuideBlock[] } | null = null
  let intro: GuideBlock[] = []
  const push = (b: GuideBlock) => (cur ? cur.blocks.push(b) : intro.push(b))
  for (const chunk of body.replace(/\r/g, '').split(/\n\s*\n/)) {
    const lines = chunk.split('\n').map(l => l.trim()).filter(Boolean)
    if (!lines.length) continue
    let i = 0
    while (i < lines.length) {
      const l = lines[i]
      if (l.startsWith('## ')) {
        if (cur) sections.push(cur)
        const title = clean(l.slice(3))
        cur = { id: idOf(title, used), title, blocks: [] }
        i++
      } else if (/^[-*] /.test(l)) {
        const items: string[] = []
        while (i < lines.length && /^[-*] /.test(lines[i])) { items.push(clean(lines[i].slice(2))); i++ }
        push({ list: items })
      } else {
        const para: string[] = []
        while (i < lines.length && !lines[i].startsWith('## ') && !/^[-*] /.test(lines[i])) { para.push(lines[i]); i++ }
        push({ p: clean(para.join(' ')) })
      }
    }
  }
  if (cur) sections.push(cur)
  // Paragraphs before the first heading open the first section.
  if (intro.length) {
    if (sections.length) sections[0] = { ...sections[0], blocks: [...intro, ...sections[0].blocks] }
    else sections.push({ id: 'article', title: '', blocks: intro })
    intro = []
  }
  return sections
}

/** Related reading: other articles in the same category, nearest first. */
function relatedOf(a: LongArticle): string[] {
  const same = LONG_EN.filter(x => x.category === a.category && x.slug !== a.slug)
  const i = LONG_EN.findIndex(x => x.slug === a.slug)
  return same
    .sort((x, y) => Math.abs(LONG_EN.indexOf(x) - i) - Math.abs(LONG_EN.indexOf(y) - i))
    .slice(0, 5)
    .map(x => `blog/${x.slug}`)
}

export function longToGuide(a: LongArticle): GuideContent {
  return {
    slug: a.slug,
    label: a.title,
    meta: { title: a.title, description: a.description },
    h1: { before: a.title, mark: '' },
    lead: a.description,
    sections: parseBody(a.body),
    faq: a.faq.map(f => ({ q: f.q, a: f.a })),
    sources: a.sources,
    related: relatedOf(a),
    short: { answer: a.answer },
    published: a.published,
    updated: a.updated,
  }
}
