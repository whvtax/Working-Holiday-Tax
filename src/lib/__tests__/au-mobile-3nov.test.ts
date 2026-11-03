import { isAuMobile } from '@/lib/validate'

describe('isAuMobile (Jo, 3 Nov)', () => {
  it('accepts real Australian mobiles in common formats', () => {
    for (const v of ['0412 345 678', '0412345678', '+61 412 345 678', '61412345678', '(04) 1234-5678']) expect(isAuMobile(v)).toBe(true)
  })
  it('rejects partial, foreign or landline numbers', () => {
    for (const v of ['', '04', '0412', '+44 7700 900123', '02 9999 9999', '0312345678']) expect(isAuMobile(v)).toBe(false)
  })
})
