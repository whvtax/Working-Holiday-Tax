/**
 * Guides in every language. The STRUCTURE (slug, section ids, block kinds,
 * official source links, related guides) is always the English one; a
 * language file supplies only the words. So a section, a source or a related
 * link can never drift between languages. checkGuideText (tested) proves
 * every language matches the English shape block for block.
 */
import type { FaqItem } from '@/components/svt/Faq'
import { GUIDES_EN, type GuideBlock, type GuideContent, type ShortAnswer } from './guides-en'
import { GUIDES_ZH } from './guides-zh'
import { GUIDES_VI } from './guides-vi'
import type { SvtLocale } from '@/lib/svt/i18n'

export interface GuideText {
  label: string
  meta: { title: string; description: string }
  h1: { before: string; mark: string; after?: string }
  lead: string
  sections: Readonly<Record<string, { title: string; blocks: readonly GuideBlock[] }>>
  faq?: readonly FaqItem[]
  /** One label per English source, in the same order. */
  sourceLabels: readonly string[]
  short?: ShortAnswer
}

const TEXTS: Readonly<Record<Exclude<SvtLocale, 'en'>, Readonly<Record<string, GuideText>>>> = { zh: GUIDES_ZH, vi: GUIDES_VI }

/** Problems with a set of language texts against the English shape. */
export function checkTexts(en: readonly GuideContent[], texts: Readonly<Record<string, GuideText>>): string[] {
  const out: string[] = []
  for (const g of en) {
    const t = texts[g.slug]
    if (!t) { out.push(`${g.slug}: missing`); continue }
    const enIds = g.sections.map(s => s.id)
    const ids = Object.keys(t.sections)
    if (enIds.join(',') !== ids.join(',')) out.push(`${g.slug}: sections ${ids.join(',')} != ${enIds.join(',')}`)
    for (const s of g.sections) {
      const ts = t.sections[s.id]
      if (!ts) continue
      const kinds = (b: readonly GuideBlock[]) => b.map(x => ('p' in x ? 'p' : 'list' in x ? `list${x.list.length}` : 'note')).join(',')
      if (kinds(s.blocks) !== kinds(ts.blocks)) out.push(`${g.slug}/${s.id}: blocks ${kinds(ts.blocks)} != ${kinds(s.blocks)}`)
    }
    if ((g.faq?.length ?? 0) !== (t.faq?.length ?? 0)) out.push(`${g.slug}: faq count`)
    if (g.sources.length !== t.sourceLabels.length) out.push(`${g.slug}: source labels`)
    // Decision 005: the answer box has the same shape and the same facts in
    // every language (rows answered the same way, figures identical).
    if (!!g.short !== !!t.short) out.push(`${g.slug}: short answer present in one language only`)
    if (g.short && t.short) {
      const rows = (x: ShortAnswer) => (x.form?.rows ?? []).map(r => r.answer).join(',')
      if (rows(g.short) !== rows(t.short)) out.push(`${g.slug}: short answer form rows differ`)
      // The numbers must match; the words around them are translated ("6 months", "6 个月").
      const figs = (x: ShortAnswer) => (x.facts ?? []).map(f => (f.figure.match(/[$%]|\d[\d,.]*/g) ?? []).join(' ')).join('|')
      if (figs(g.short) !== figs(t.short)) out.push(`${g.slug}: short answer figures differ`)
      if (t.short.mark && !t.short.answer.includes(t.short.mark)) out.push(`${g.slug}: short answer mark not in the answer`)
    }
  }
  for (const slug of Object.keys(texts)) if (!en.some(g => g.slug === slug)) out.push(`${slug}: not in English`)
  return out
}

export const checkGuideText = (locale: Exclude<SvtLocale, 'en'>) => checkTexts(GUIDES_EN, TEXTS[locale])

/** English structure + a language's words. Anything not translated stays English. */
export function localize<T extends GuideContent>(en: readonly T[], texts: Readonly<Record<string, GuideText>>): T[] {
  return en.map(g => {
    const t = texts[g.slug]
    if (!t) return g
    return {
      ...g,
      label: t.label,
      meta: t.meta,
      h1: t.h1,
      lead: t.lead,
      sections: g.sections.map(s => ({ id: s.id, title: t.sections[s.id]?.title ?? s.title, blocks: t.sections[s.id]?.blocks ?? s.blocks })),
      faq: t.faq ?? g.faq,
      short: t.short ?? g.short,
      sources: g.sources.map((s, i) => ({ href: s.href, label: t.sourceLabels[i] ?? s.label })),
    }
  })
}

/** Guides for a language: English structure + that language's words. */
export function guidesFor(locale: SvtLocale): readonly GuideContent[] {
  return locale === 'en' ? GUIDES_EN : localize(GUIDES_EN, TEXTS[locale])
}

export const guideFor = (locale: SvtLocale, slug: string) => guidesFor(locale).find(g => g.slug === slug)
