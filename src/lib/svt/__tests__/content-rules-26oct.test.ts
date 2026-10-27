/**
 * Wording rules for every Student Visa Tax text (CLAUDE.md, Jo's legal rule).
 * Runs over the home copy, every guide and the price check.
 */
import { homeEn } from '@/lib/svt/content/home-en'
import { GUIDES_EN } from '@/lib/svt/content/guides-en'
import { BLOG_EN } from '@/lib/svt/content/blog-en'
import { PAYSLIP_LINES } from '@/lib/svt/payslip'
import { relatedLinks, SVT_PAGES } from '@/lib/svt/pages'

const allText = JSON.stringify([homeEn, GUIDES_EN, BLOG_EN, PAYSLIP_LINES])

describe('SVT wording rules', () => {
  it('never claims to be a registered tax agent', () => {
    expect(allText).not.toMatch(/\bwe\s+are\s+(a\s+)?registered\s+tax\s+agents?\b/i)
    expect(allText).not.toMatch(/\bour\s+registered\s+tax\s+agent\b/i)
    expect(allText).not.toMatch(/\b(?:we're|we are)\s+(?:a\s+)?(?:tax agents?|accountants?)\b/i)
    // Every mention of a registered tax agent uses one of the two approved phrasings.
    const mentions = allText.match(/[^."]*registered tax agent[^."]*/gi) ?? []
    expect(mentions.length).toBeGreaterThan(0)
    for (const m of mentions) {
      expect(/operates under the supervision of a registered tax agent|reviewed and signed off by a registered tax agent before it is lodged with the ATO|Lodge your tax return with a registered tax agent|Registered tax agents have a lodgment program/i.test(m)).toBe(true)
    }
  })
  it('never mentions AI or bots', () => {
    expect(allText).not.toMatch(/\b(AI|A\.I\.|artificial intelligence|chatbot|bot|automated assistant)\b/i)
  })
  it('never promises a refund', () => {
    expect(allText).not.toMatch(/guarantee(d)?\s+(a\s+|your\s+)?refund|you will get (a|your) refund|maximi[sz]e your refund/i)
  })
  it('residency is always "may be", never a promise', () => {
    expect(allText).not.toMatch(/students?[^."]{0,60}\bare (?:often |usually |always )?residents? for tax/i)
    expect(allText).toMatch(/may be (?:an Australian )?(?:a )?resident/i)
  })
  it('fees are the locked ones', () => {
    const fees = (allText.match(/\$\d{3}\b(?![.,]\d)/g) ?? []) // payslip sample amounts carry cents
    for (const f of new Set(fees)) expect(['$220', '$385', '$150', '$70', /* LITO amounts, quoted from the ATO */ '$700', '$325', /* ATO tools threshold */ '$300']).toContain(f)
  })
})

describe('guides', () => {
  it.each([...GUIDES_EN, ...BLOG_EN].map(g => [g.slug, g] as const))('%s is complete and in budget', (_slug, g) => {
    expect(g.meta.title.length).toBeLessThanOrEqual(60)
    expect(g.meta.description.length).toBeGreaterThanOrEqual(70)
    expect(g.meta.description.length).toBeLessThanOrEqual(170)
    expect(g.sections.length).toBeGreaterThan(0)
    expect(g.sources.length).toBeGreaterThan(0)
    for (const s of g.sources) expect(s.href).toMatch(/^https:\/\/(www\.|community\.)?(ato\.gov\.au|servicesaustralia\.gov\.au|tpb\.gov\.au|abr\.gov\.au|business\.gov\.au|fairwork\.gov\.au)\//)
    expect(relatedLinks(g.related)).toHaveLength(g.related.length)
    expect(g.related).not.toContain(g.slug)
    expect(g.related).not.toContain(`blog/${g.slug}`)
    // Headings in sentence case: no capitalised small words mid-heading.
    for (const sec of g.sections) expect(sec.title).not.toMatch(/\s(?:The|Of|And|To|For|With|Your|You)\s/)
  })
  it('slugs are unique, URL-safe and registered for the sitemap', () => {
    const slugs = GUIDES_EN.map(g => g.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
    for (const s of slugs) {
      expect(s).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
      expect(SVT_PAGES.some(p => p.path === `/${s}`)).toBe(true)
    }
  })
  it('no section id repeats within a page (anchor links stay unique)', () => {
    for (const g of GUIDES_EN) {
      const ids = g.sections.map(s => s.id)
      expect(new Set(ids).size).toBe(ids.length)
    }
  })
})
