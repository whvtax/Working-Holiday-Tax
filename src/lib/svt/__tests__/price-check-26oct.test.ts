import { priceCheck, VISAS, WORKS } from '@/lib/svt/price-check'
import { whatsappUrl, BRANDS } from '@/lib/brand'

describe('SVT price check (locked canvas behaviour)', () => {
  it('TFN jobs only is $220; any ABN work is $385', () => {
    for (const v of VISAS) {
      expect(priceCheck(v.id, 'tfn').price).toBe(220)
      expect(priceCheck(v.id, 'abn').price).toBe(385)
      expect(priceCheck(v.id, 'both').price).toBe(385)
    }
  })
  it('formats the price for display', () => {
    expect(priceCheck('500', 'tfn').priceLabel).toBe('$220')
    expect(priceCheck('500', 'both').priceLabel).toBe('$385')
  })
  it('writes the WhatsApp opening message from the choices', () => {
    expect(priceCheck('500', 'tfn').message).toBe('Hi, I am on a 500 visa and had jobs with a TFN this year. Can you do my tax return?')
    expect(priceCheck('485', 'abn').message).toBe('Hi, I am on a 485 visa and had ABN work like Uber Eats this year. Can you do my tax return?')
    expect(priceCheck('other', 'both').message).toBe('Hi, I am on another visa and had TFN jobs and ABN work this year. Can you do my tax return?')
  })
  it('never promises a price for other visas; it is confirmed first', () => {
    expect(priceCheck('other', 'tfn').note).toBe('Tell us your visa and we will confirm the price before you pay.')
    expect(priceCheck('500', 'tfn').note).toBe('We confirm your price on WhatsApp before you pay.')
  })
  it('links to the SVT WhatsApp number with the message prefilled', () => {
    const r = priceCheck('500', 'tfn')
    expect(r.whatsappHref).toBe(whatsappUrl('svt', r.message))
    expect(r.whatsappHref.startsWith(`https://wa.me/${BRANDS.svt.whatsappNumber}?text=`)).toBe(true)
    expect(decodeURIComponent(r.whatsappHref.split('text=')[1])).toBe(r.message)
  })
  it('rejects values that are not on the list (falls back to the defaults)', () => {
    // @ts-expect-error: an unexpected value from outside the type system
    expect(priceCheck('999', 'x').price).toBe(220)
    expect(WORKS.map(w => w.id)).toEqual(['tfn', 'abn', 'both'])
  })
  it('never says AI, bot, or promises a refund', () => {
    for (const v of VISAS) for (const w of WORKS) {
      const r = priceCheck(v.id, w.id)
      for (const t of [r.message, r.note]) expect(t).not.toMatch(/\b(AI|bot|guarantee(d)? (a )?refund)\b/i)
    }
  })
})
