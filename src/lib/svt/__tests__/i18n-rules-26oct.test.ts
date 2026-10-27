/**
 * Chinese and Vietnamese follow the same rules as English (CLAUDE.md):
 * the two approved ways to describe the agent, never "we are a registered tax
 * agent", residency always "may be", the locked fees, no AI, no refund promise.
 * And each language has the same structure as the English pages.
 */
import { homeZh } from '@/lib/svt/content/home-zh'
import { homeVi } from '@/lib/svt/content/home-vi'
import { GUIDES_ZH } from '@/lib/svt/content/guides-zh'
import { GUIDES_VI } from '@/lib/svt/content/guides-vi'
import { BLOG_ZH } from '@/lib/svt/content/blog-zh'
import { BLOG_VI } from '@/lib/svt/content/blog-vi'
import { checkBlogText, blogFor } from '@/lib/svt/content/blog-i18n'
import { checkGuideText, guidesFor } from '@/lib/svt/content/guides-i18n'
import { UI, localePath, basePath } from '@/lib/svt/i18n'
import { priceCheck } from '@/lib/svt/price-check'
import { payslipLines } from '@/lib/svt/payslip'
import { alternatesFor } from '@/lib/svt/pages'

const zh = JSON.stringify([homeZh, GUIDES_ZH, BLOG_ZH, UI.zh, payslipLines('zh'), priceCheck('500', 'both', 'zh')])
const vi = JSON.stringify([homeVi, GUIDES_VI, BLOG_VI, UI.vi, payslipLines('vi'), priceCheck('500', 'both', 'vi')])

describe('legal wording', () => {
  it('Chinese: supervision and sign-off phrasing present, never "we are a tax agent"', () => {
    expect(zh).toContain('在注册税务代理人的监督下运营')
    expect(zh).toContain('在提交给 ATO 之前，由注册税务代理人审核并签字确认')
    expect(zh).not.toMatch(/我们(?:是|作为)(?:一[家名个])?(?:注册)?税务代理/)
    expect(zh).not.toMatch(/我们的(?:注册)?税务代理人/)
  })
  it('Vietnamese: supervision and sign-off phrasing present, never "we are a tax agent"', () => {
    expect(vi).toContain('Hoạt động dưới sự giám sát của một đại lý thuế đã đăng ký')
    expect(vi).toContain('xem xét và ký duyệt trước khi nộp cho ATO')
    expect(vi).not.toMatch(/chúng tôi là (?:một )?đại lý thuế/i)
    expect(vi).not.toMatch(/đại lý thuế của chúng tôi/i)
  })
  it('every sentence that mentions a registered tax agent uses an approved form (zh)', () => {
    const sentences = zh.split(/[。！？"]/).filter(x => x.includes('注册税务代理人') || x.includes('税务代理人'))
    expect(sentences.length).toBeGreaterThan(3)
    for (const x of sentences) {
      expect([x, /在注册税务代理人(?: \S+ (?:Pty Ltd )?)?的监督下运营|在注册税务代理人.*的监督下运营|由注册税务代理人审核并签字确认|委托注册税务代理人报税|注册税务代理人有一个提交计划|联系税务代理人|税务代理人编号/.test(x)]).toEqual([x, true])
    }
  })
  it('every sentence that mentions a registered tax agent uses an approved form (vi)', () => {
    const sentences = vi.split(/[.!?"]/).filter(x => /đại lý thuế/i.test(x))
    expect(sentences.length).toBeGreaterThan(3)
    for (const x of sentences) {
      expect([x, /dưới sự giám sát của một đại lý thuế đã đăng ký|được một đại lý thuế đã đăng ký xem xét và ký duyệt trước khi nộp cho ATO|Khai thuế qua đại lý thuế đã đăng ký|Đại lý thuế đã đăng ký có chương trình nộp hồ sơ|liên hệ đại lý thuế|mã số đại lý thuế/i.test(x)]).toEqual([x, true])
    }
  })
  it('no AI, no refund promise', () => {
    // "AI" in capitals only: in Vietnamese "ai" means "who".
    for (const t of [zh, vi]) {
      expect(t).not.toMatch(/\bAI\b/)
      expect(t).not.toMatch(/人工智能|机器人|trí tuệ nhân tạo|\bchatbot\b|\bbot\b/i)
    }
    expect(zh).not.toMatch(/保证(?:你)?(?:能)?(?:拿到)?退税/)
    expect(vi).not.toMatch(/(?:cam kết|đảm bảo) (?:bạn )?(?:được|có) (?:tiền )?hoàn thuế/i)
  })
  it('residency is "may be" in both languages, never a promise', () => {
    expect(zh).toContain('可能是税务居民')
    expect(zh).not.toMatch(/留学生(?:都|就)是税务居民/)
    expect(vi).toContain('có thể là người cư trú về thuế')
    expect(vi).not.toMatch(/du học sinh (?:đều |luôn )?là người cư trú về thuế/i)
  })
  it('only the locked fees appear', () => {
    for (const t of [zh, vi]) {
      for (const f of new Set(t.match(/\$\d{3}\b(?![.,]\d)/g) ?? [])) expect(['$220', '$385', '$150', '$70', /* LITO amounts, quoted from the ATO */ '$700', '$325', /* ATO tools threshold */ '$300']).toContain(f)
    }
  })
})

describe('no AI-style dashes (Jo, 26 Oct: never, in any language)', () => {
  it('no em dash, en dash, figure dash, horizontal bar or Chinese double dash in any SVT text', () => {
    const en = JSON.stringify([UI.en, guidesFor('en'), blogFor('en'), payslipLines('en'), priceCheck('500', 'both', 'en')])
    for (const t of [en, zh, vi]) expect(t.match(/.{0,30}[\u2012\u2013\u2014\u2015\u2E3A\u2E3B].{0,30}/g)).toBeNull()
  })
})

describe('structure', () => {
  it('every guide matches the English sections, blocks, questions and sources', () => {
    expect(checkGuideText('zh')).toEqual([])
    expect(checkGuideText('vi')).toEqual([])
    expect(checkBlogText('zh')).toEqual([])
    expect(checkBlogText('vi')).toEqual([])
  })
  it('blog official links are identical in every language', () => {
    const hrefs = (l: 'en' | 'zh' | 'vi') => blogFor(l).map(a => a.sources.map(s => s.href))
    expect(hrefs('zh')).toEqual(hrefs('en'))
    expect(hrefs('vi')).toEqual(hrefs('en'))
  })
  it('official links are identical in every language', () => {
    const hrefs = (l: 'en' | 'zh' | 'vi') => guidesFor(l).map(g => g.sources.map(s => s.href))
    expect(hrefs('zh')).toEqual(hrefs('en'))
    expect(hrefs('vi')).toEqual(hrefs('en'))
  })
  it('the price check message is in the reader language', () => {
    expect(priceCheck('485', 'abn', 'zh').message).toBe('你好，我是 485 签证，今年做了 Uber Eats 这类 ABN 工作。想问下可以帮我报税吗？')
    expect(priceCheck('500', 'tfn', 'vi').message).toBe('Chào bạn, mình đang có visa 500, năm nay mình đi làm có TFN. Bên bạn khai thuế giúp mình được không ạ?')
    expect(priceCheck('500', 'tfn', 'en').message).toBe('Hi, I am on a 500 visa and had jobs with a TFN this year. Can you do my tax return?')
  })
})

describe('paths and hreflang', () => {
  it('localePath and basePath are inverse', () => {
    for (const p of ['/', '/medicare', '/questions']) {
      for (const l of ['en', 'zh', 'vi'] as const) expect(basePath(localePath(l, p))).toBe(p)
    }
    expect(localePath('zh', '/')).toBe('/zh')
    expect(localePath('vi', '/medicare')).toBe('/vi/medicare')
  })
  it('translated pages list all three languages and x-default; legal pages none', () => {
    expect(alternatesFor('zh', '/medicare')).toEqual({
      canonical: '/zh/medicare',
      languages: { 'en-AU': '/medicare', 'zh-Hans': '/zh/medicare', vi: '/vi/medicare', 'x-default': '/medicare' },
    })
    expect(alternatesFor('en', '/privacy').languages).toBeUndefined()
  })
})
