/**
 * ADR 013 blog scaffold: chunk loader, link rewriting, and writer rules
 * (no dashes, no unapproved agent claims, no AI mentions) for fr, it, es.
 */
import { localizeBodyLinks, mergeChunks, createLocaleBlog } from '@/lib/locale-blog'
import { frChunks } from '@/app/(fr)/fr/blog/data'
import { itChunks } from '@/app/(it)/it/blog/data'
import { esChunks } from '@/app/(es)/es/blog/data'
import { guides as enGuides } from '@/app/(site)/blog/data'

const exists = { guide: (s: string) => s === 'what-is-a-tfn', category: (s: string) => s === 'tfn', anyGuide: true }

describe('localizeBodyLinks', () => {
  it('rewrites only guides and categories that exist in the locale', () => {
    const body = '[a](/blog/what-is-a-tfn) [b](/blog/other-guide) [c](/blog/category/tfn#x) [d](/blog/category/abn) [e](/blog)'
    expect(localizeBodyLinks(body, 'fr', exists)).toBe(
      '[a](/fr/blog/what-is-a-tfn) [b](/blog/other-guide) [c](/fr/blog/category/tfn#x) [d](/blog/category/abn) [e](/fr/blog)',
    )
  })
  it('keeps English paths for site pages that are not in the locale allowlist', () => {
    expect(localizeBodyLinks('[t](/start) [c](/privacy)', 'es', exists)).toBe('[t](/start) [c](/privacy)')
  })
  it('rewrites site pages that are on the locale allowlist (all 17 are live)', () => {
    expect(localizeBodyLinks('[t](/tax-return) [c](/calculator)', 'es', exists)).toBe('[t](/es/tax-return) [c](/es/calculator)')
  })
  it('leaves external links alone', () => {
    expect(localizeBodyLinks('[x](https://www.ato.gov.au/)', 'it', exists)).toBe('[x](https://www.ato.gov.au/)')
  })
})

describe('mergeChunks', () => {
  it('drops entries without a title or body', () => {
    expect(Object.keys(mergeChunks([{ a: { title: 'T', description: 'd', body: 'b' }, b: { title: '', description: '', body: '' } }]))).toEqual(['a'])
  })
  it('lists only slugs that have a chunk entry', () => {
    const blog = createLocaleBlog('fr', mergeChunks([{ 'what-is-a-tfn': { title: 'T', description: 'd', body: 'b' } }]))
    expect(blog.getSlugs()).toEqual(['what-is-a-tfn'])
    expect(blog.getGuide('can-you-have-tfn-and-abn')).toBeUndefined()
    expect(blog.getListedCategories()).toEqual(['TFN'])
  })
})

describe.each([['fr', frChunks], ['it', itChunks], ['es', esChunks]] as const)('%s chunks', (_l, chunks) => {
  it('are keyed by real English slugs', () => {
    const slugs = new Set(enGuides.map(g => g.slug))
    for (const k of Object.keys(chunks)) expect(slugs.has(k)).toBe(true)
  })
  it('contain no em dash, en dash or horizontal bar', () => {
    expect(JSON.stringify(chunks)).not.toMatch(/[—–―]/)
  })
  it('never claim to be a registered tax agent or mention AI', () => {
    const t = JSON.stringify(chunks)
    expect(t).not.toMatch(/\b(IA|AI|bot|chatbot|intelligenza artificiale|inteligencia artificial|intelligence artificielle)\b/)
    expect(t).not.toMatch(/(nous sommes|siamo|somos) (un |une |uno |una )?(agent|agente)/i)
  })
})
