import { CORPUS_REVISED, guideModifiedIso, isoGuideDate } from '@/lib/blog-dates'

/**
 * guideModifiedIso is what every guide page's `dateModified` and every guide
 * URL's sitemap `<lastmod>` are built from, in all three languages. Google
 * drops the field outright when either of its two invariants is broken, so
 * they are pinned here rather than left to inspection.
 */
describe('guideModifiedIso', () => {
  const TODAY = '2026-08-26'

  it('uses the corpus revision date for a guide with no explicit review date', () => {
    expect(guideModifiedIso('2024-07-01', CORPUS_REVISED, undefined, TODAY)).toBe('2026-08-22')
  })

  it('prefers an explicit per-guide review date over the corpus date', () => {
    expect(guideModifiedIso('2024-07-01', CORPUS_REVISED, '3 September 2026', '2026-12-01'))
      .toBe('2026-09-03')
  })

  it('is never earlier than datePublished', () => {
    // A guide published after the corpus was revised must not claim it was
    // modified before it existed.
    expect(guideModifiedIso('2026-11-04', CORPUS_REVISED, undefined, TODAY)).toBe('2026-11-04')
    expect(guideModifiedIso('2026-11-04', CORPUS_REVISED, '1 August 2026', '2026-12-01'))
      .toBe('2026-11-04')
  })

  it('is never in the future', () => {
    expect(guideModifiedIso('2024-07-01', '2027-01-01', undefined, TODAY)).toBe(TODAY)
    expect(guideModifiedIso('2024-07-01', CORPUS_REVISED, '1 January 2030', TODAY)).toBe(TODAY)
  })

  it('falls back to the publication date when a date cannot be parsed', () => {
    expect(guideModifiedIso('2024-07-01', 'not a date', undefined, TODAY)).toBe('2024-07-01')
    expect(guideModifiedIso('2024-07-01', CORPUS_REVISED, 'sometime last winter', TODAY))
      .toBe('2024-07-01')
  })

  it('agrees with isoGuideDate on the corpus-wide default', () => {
    // The guide corpus is authored as "1 July 2024" strings; both call sites
    // (article page and sitemap) normalise through isoGuideDate first.
    expect(guideModifiedIso(isoGuideDate('1 July 2024'), CORPUS_REVISED, undefined, TODAY))
      .toBe(CORPUS_REVISED)
  })
})
