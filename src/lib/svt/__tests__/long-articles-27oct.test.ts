/**
 * The long-form article library (Jo, 27 Oct). Same wording rules as every SVT
 * text (CLAUDE.md), plus shape and SEO budgets, for every article in every
 * language it is published in.
 */
import { LONG_EN, longFor, longLocales, longToGuide, parseBody } from '@/lib/svt/content/long/library'
import { LONG_ZH } from '@/lib/svt/content/long/zh'
import { LONG_VI } from '@/lib/svt/content/long/vi'
import { BLOG_EN } from '@/lib/svt/content/blog-en'
import { GUIDES_EN } from '@/lib/svt/content/guides-en'
import { SVT_PAGES, relatedLinks } from '@/lib/svt/pages'

const OFFICIAL = /^https:\/\/(?:[a-z0-9-]+\.)*gov\.au\//

const textOf = (a: { title: string; description: string; answer: string; body: string; faq: ReadonlyArray<{ q: string; a: string }> }) =>
  [a.title, a.description, a.answer, a.body, ...a.faq.flatMap(f => [f.q, f.a])].join('\n')

describe('long-form articles: wording (every language)', () => {
  const all = (['en', 'zh', 'vi'] as const).flatMap(l => longFor(l).map(a => [l, a.slug, a] as const))
  ;(all.length ? it.each(all) : it.skip.each(all))('%s %s', (_l, _s, a) => {
    const t = textOf(a)
    expect(t).not.toMatch(/[—–―]|——/)
    expect(t).not.toMatch(/working\s*holiday\s*tax|workingholidaytax|backpacker/i)
    expect(t).not.toMatch(/\bwe\s+are\s+(a\s+)?registered\s+tax\s+agents?\b|\bour\s+registered\s+tax\s+agent\b|\b(?:we're|we are)\s+(?:a\s+)?(?:tax agents?|accountants?)\b/i)
    expect(t).not.toMatch(/\b(AI|A\.I\.|artificial intelligence|chatbot|ChatGPT)\b/)
    expect(t).not.toMatch(/guarantee(d)?\s+(a\s+|your\s+)?refund|you will get (a|your) refund|maximi[sz]e your refund/i)
    expect(t).not.toMatch(/students?[^.\n]{0,60}\bare (?:often |usually |always )?(?:Australian )?residents? for tax/i)
    expect(t).not.toMatch(/\$\s?(?!220\b|385\b)\d{3}\s*(?:per return|a return|for a return)/i)
    expect(t).not.toMatch(/`|\$\{|<[a-z]/)
  })
})

describe('long-form articles: shape (English)', () => {
  const en = LONG_EN.map(a => [a.slug, a] as const)
  ;(en.length ? it.each(en) : it.skip.each(en))('%s', (_s, a) => {
    expect(a.slug).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    expect(a.title.length).toBeLessThanOrEqual(80)
    expect(a.description.length).toBeGreaterThanOrEqual(80)
    expect(a.description.length).toBeLessThanOrEqual(200)
    expect(a.answer.length).toBeGreaterThan(30)
    expect(a.body.split(/\s+/).length).toBeGreaterThanOrEqual(600)
    const sections = parseBody(a.body)
    expect(sections.length).toBeGreaterThanOrEqual(4)
    for (const s of sections) expect(s.blocks.length).toBeGreaterThan(0)
    expect(a.faq.length).toBeGreaterThanOrEqual(2)
    expect(a.sources.length).toBeGreaterThanOrEqual(1)
    for (const s of a.sources) expect(s.href).toMatch(OFFICIAL)
    const g = longToGuide(a)
    expect(relatedLinks(g.related)).toHaveLength(g.related.length)
    expect(SVT_PAGES.some(p => p.path === `/blog/${a.slug}`)).toBe(true)
  })
  it('slugs are unique across the whole site', () => {
    const slugs = [...LONG_EN.map(a => a.slug), ...BLOG_EN.map(a => a.slug), ...GUIDES_EN.map(g => g.slug)]
    expect(new Set(slugs).size).toBe(slugs.length)
  })
  it('translations exist only for English articles, and carry every field', () => {
    for (const [l, texts] of [['zh', LONG_ZH], ['vi', LONG_VI]] as const) {
      for (const [slug, t] of Object.entries(texts)) {
        expect(LONG_EN.some(a => a.slug === slug)).toBe(true)
        expect(longLocales(slug)).toContain(l)
        expect(t.title && t.description && t.answer && t.body).toBeTruthy()
        expect(parseBody(t.body).length).toBeGreaterThanOrEqual(3)
      }
    }
  })
})
