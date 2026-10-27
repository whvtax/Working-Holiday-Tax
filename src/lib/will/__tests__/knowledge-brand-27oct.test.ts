/**
 * Decision 004, learning: one shared Library. Untagged entries serve both
 * assistants; an entry tagged brand:svt serves only Mia (SVT), brand:wht only
 * Will. WHT behaviour is unchanged because no existing entry carries a tag.
 */
import { brandTag, usableFor } from '@/lib/will/knowledge'
import { withBrand } from '@/lib/will/brand-context'

describe('knowledge entries by brand', () => {
  it('an untagged entry is used by both brands (everything Will has learned reaches Mia)', () => {
    expect(usableFor({ tags: [] }, 'wht')).toBe(true)
    expect(usableFor({ tags: ['payment'] }, 'svt')).toBe(true)
  })
  it('an entry learned from a student chat is for SVT only', () => {
    const e = { tags: ['residency', brandTag('svt')] }
    expect(usableFor(e, 'svt')).toBe(true)
    expect(usableFor(e, 'wht')).toBe(false)
  })
  it('an entry marked WHT-only never reaches a student', () => {
    const e = { tags: [brandTag('wht')] }
    expect(usableFor(e, 'wht')).toBe(true)
    expect(usableFor(e, 'svt')).toBe(false)
  })
  it('defaults to the brand of the current work, and to WHT when none is set', async () => {
    const e = { tags: [brandTag('svt')] }
    expect(usableFor(e)).toBe(false)
    expect(await withBrand('svt', async () => usableFor(e))).toBe(true)
  })
})
