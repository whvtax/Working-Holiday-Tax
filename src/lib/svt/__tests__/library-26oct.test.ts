/** Decision 005: every page answers first and sits in exactly one topic. */
import { GUIDES_EN } from '@/lib/svt/content/guides-en'
import { BLOG_EN } from '@/lib/svt/content/blog-en'
import { guidesFor } from '@/lib/svt/content/guides-i18n'
import { blogFor } from '@/lib/svt/content/blog-i18n'
import { LIBRARY, SERVICE_PAGES, placeOf, readingMinutes } from '@/lib/svt/library'

const ALL = [...GUIDES_EN.map(g => g.slug), ...BLOG_EN.map(a => `blog/${a.slug}`)]

describe('library', () => {
  it('every guide and article is in exactly one topic, or is a service page', () => {
    const listed = LIBRARY.flatMap(t => t.pages)
    expect(new Set(listed).size).toBe(listed.length)
    for (const p of ALL) expect([p, listed.includes(p) !== SERVICE_PAGES.includes(p)]).toEqual([p, true])
    for (const p of listed) expect(ALL).toContain(p)
  })
  it('positions and neighbours are computed', () => {
    expect(placeOf('blog/tfn-declaration-two-jobs')).toEqual({ topic: 'TFN', index: 2, total: 3, prev: 'blog/apply-for-tfn-student-visa', next: 'tax-residency' })
    expect(placeOf('pricing')).toBeNull()
  })
  it('reading time is at least a minute and grows with the text', () => {
    expect(readingMinutes('a b c', false)).toBe(1)
    expect(readingMinutes(Array(900).fill('word').join(' '), false)).toBe(6)
    expect(readingMinutes('字'.repeat(900), true)).toBe(3)
  })
})

describe('short answers', () => {
  it.each(['en', 'zh', 'vi'] as const)('every page has one in %s, and the mark is in the answer', l => {
    for (const g of [...guidesFor(l), ...blogFor(l)]) {
      expect([g.slug, !!g.short]).toEqual([g.slug, true])
      if (g.short?.mark) expect(g.short.answer).toContain(g.short.mark)
      expect(!!(g.short?.form && g.short?.facts)).toBe(false)
      expect((g.short?.facts ?? []).length).toBeLessThanOrEqual(3)
    }
  })
})

import { PAGE_SCENE, SCENES } from '@/lib/svt/images'
describe('article photos', () => {
  it('every topic page has a scene, every scene exists and has alt text in every language', () => {
    for (const p of LIBRARY.flatMap(t => t.pages)) {
      expect([p, !!PAGE_SCENE[p]]).toEqual([p, true])
    }
    for (const id of new Set(Object.values(PAGE_SCENE))) {
      const sc = SCENES[id]
      expect([id, !!sc]).toEqual([id, true])
      for (const l of ['en', 'zh', 'vi'] as const) expect(sc!.alt[l].length).toBeGreaterThan(8)
    }
  })
})
