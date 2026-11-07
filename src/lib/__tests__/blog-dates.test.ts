import { CORPUS_REVISED, guideModifiedIso, isoGuideDate, localePublishedIso, guideDateFromIso, NEW_LOCALE_LIVE } from '@/lib/blog-dates'

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

/**
 * fr / it / es guides mirror the English slugs and used to inherit the English
 * publication date, so a French guide written in November 2026 said it was
 * published in July 2024 (5 Nov 2026 audit).
 */
describe('localePublishedIso and guideDateFromIso', () => {
  it('floors fr, it and es at the day that language went live', () => {
    for (const l of ['fr', 'it', 'es']) {
      expect(localePublishedIso(l, '1 July 2024')).toBe(NEW_LOCALE_LIVE[l as 'fr' | 'it' | 'es'])
    }
  })

  it('leaves en, de and ja on the authored date', () => {
    for (const l of ['en', 'de', 'ja']) expect(localePublishedIso(l, '1 July 2024')).toBe('2024-07-01')
  })

  it('keeps an authored date that is later than the launch', () => {
    expect(localePublishedIso('fr', '20 December 2026')).toBe('2026-12-20')
  })

  it('round-trips an ISO date into the authored shape', () => {
    expect(guideDateFromIso('2026-11-03')).toBe('3 November 2026')
    expect(isoGuideDate(guideDateFromIso('2024-07-01'))).toBe('2024-07-01')
    expect(guideDateFromIso('not a date')).toBe('not a date')
  })
})
