import { buildSvtLlms } from '@/lib/svt/llms'
import { GUIDES_EN } from '@/lib/svt/content/guides-en'
import { BLOG_EN } from '@/lib/svt/content/blog-en'

describe('SVT llms.txt', () => {
  const txt = buildSvtLlms()
  it('lists every guide and article with its own URL', () => {
    for (const g of GUIDES_EN) expect(txt).toContain(`https://studentvisatax.com.au/${g.slug})`)
    for (const a of BLOG_EN) expect(txt).toContain(`https://studentvisatax.com.au/blog/${a.slug})`)
  })
  it('uses only the approved agent wording and promises no refund', () => {
    expect(txt).toContain('operates under the supervision of a registered tax agent')
    expect(txt).toContain('reviewed and signed off by a registered tax agent before it is lodged with the ATO')
    expect(txt).not.toMatch(/\bwe\s+are\s+(a\s+)?registered\s+tax\s+agent/i)
    expect(txt).not.toMatch(/guaranteed refund|you will get a refund/i)
  })
  it('never mentions the other brand', () => {
    expect(txt).not.toMatch(/working\s*holiday\s*tax|workingholidaytax|0424\s?513\s?998/i)
    // 417/462 may appear only inside an article line, as a visa type (the
    // DASP rate for super from a working holiday visa), never in the summary.
    expect(txt.split('## Guides')[0]).not.toMatch(/\b(417|462)\b/)
  })
  it('has no AI-style dashes', () => {
    expect(txt).not.toMatch(/[–—―]/)
  })
})

describe('SVT llms.txt languages and sources', () => {
  const txt = buildSvtLlms()
  it('lists the Chinese and Vietnamese pages too', () => {
    expect(txt).toContain('https://studentvisatax.com.au/zh/medicare)')
    expect(txt).toContain('https://studentvisatax.com.au/vi/blog/tax-return-deadline-31-october)')
  })
  it('never cites an ATO page as the source for our own price or process', () => {
    const pricing = txt.split('\n').find(l => l.includes('](https://studentvisatax.com.au/pricing)')) ?? ''
    expect(pricing).not.toContain('Source:')
  })
})
