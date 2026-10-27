/**
 * Jo, 26 Oct: never an AI-style dash, in any language, in content or design.
 * If a dash is really needed it is the ordinary hyphen (-).
 */
import { stripDashes } from '@/lib/will/text'

describe('stripDashes, every language', () => {
  it('English clause dashes become commas, ranges stay ranges', () => {
    expect(stripDashes('Hi Holly — I want to clarify')).toBe('Hi Holly, I want to clarify')
    expect(stripDashes('years 2019–2023')).toBe('years 2019-2023')
  })
  it('the Chinese double dash becomes a full-width comma, not ", , "', () => {
    expect(stripDashes('我们会帮你报税——一般 24 小时内回复')).toBe('我们会帮你报税，一般 24 小时内回复')
    expect(stripDashes('確認しました—ありがとうございます')).toBe('確認しました、ありがとうございます')
  })
  it('a run of dashes, or a horizontal bar, is one comma', () => {
    expect(stripDashes('Danke —— wir melden uns')).toBe('Danke, wir melden uns')
    expect(stripDashes('Cảm ơn ― chúng tôi sẽ trả lời')).toBe('Cảm ơn, chúng tôi sẽ trả lời')
  })
  it('the ordinary hyphen is untouched', () => {
    expect(stripDashes('TFN-only, 24-hour, tax-free')).toBe('TFN-only, 24-hour, tax-free')
  })
})
