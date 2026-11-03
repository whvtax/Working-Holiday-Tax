import fs from 'fs'
import path from 'path'
import { residencyCheckMessage, residencyPersonalLink, RESIDENCY_CHECK_MSG } from '@/lib/will/i18n'
import { verifyFormToken, signFixToken } from '@/lib/will/form-token'

const SECRET = 'synthetic-test-secret-0123456789abcdef-xyz'

describe('residency check carries the customer\'s own link (Jo, 3 Nov)', () => {
  it('builds the link per language, with the token', () => {
    expect(residencyPersonalLink('en', 'abc')).toBe('https://workingholidaytax.com.au/y8vwp4bf7?k=abc')
    expect(residencyPersonalLink('de', 'abc')).toBe('https://workingholidaytax.com.au/de/y8vwp4bf7?k=abc')
    expect(residencyPersonalLink('ja', 'abc')).toBe('https://workingholidaytax.com.au/ja/y8vwp4bf7?k=abc')
    expect(residencyPersonalLink('es', null)).toBe('https://workingholidaytax.com.au/y8vwp4bf7')
  })
  it('puts the personal link in the message instead of the public one', () => {
    for (const l of ['en', 'de', 'ja'] as const) {
      const link = residencyPersonalLink(l, 'tok')
      const m = residencyCheckMessage(l, 'Sam', link)
      expect(m).toContain(link)
      expect(m.match(/y8vwp4bf7/g)).toHaveLength(1)
    }
    expect(residencyCheckMessage('en', 'Sam')).toBe(RESIDENCY_CHECK_MSG.en.replace('{{1}}', 'Sam'))
  })
  it('the token is a one-time fix token for that customer', () => {
    const k = signFixToken('cust-1', 'wht', SECRET)!
    expect(verifyFormToken(k, 'wht', { secret: SECRET })).toMatchObject({ ok: true, claims: { customerId: 'cust-1', purpose: 'fix' } })
  })
  it('is on by default and can be switched off', () => {
    const src = fs.readFileSync(path.join(process.cwd(), 'src/lib/will/scheduler.ts'), 'utf8')
    expect(src).toMatch(/process\.env\.RESIDENCY_CHECK_PERSONAL_LINK !== 'false'/)
    expect(src).toMatch(/params: link \? \[firstName, link\] : \[firstName\]/)
  })
})
