/**
 * Email normalisation — the "one person, one row" guarantee.
 *
 * Must stay in step with crm_norm_email() in migration 017. If the two ever
 * disagree, unsubscribes stop finding their row and duplicates creep back in.
 */

import { normaliseEmail, normalisePhone } from '@/lib/leads'

describe('normaliseEmail — addresses that are the same inbox', () => {
  it('collapses the five ways one Gmail address gets written', () => {
    const variants = [
      'john.smith@gmail.com',
      'johnsmith@gmail.com',
      'john.smith+tax@gmail.com',
      'John.Smith@Gmail.com',
      'john.smith@googlemail.com',
      '  JohnSmith+2027@GOOGLEMAIL.com  ',
    ]
    const normalised = variants.map(normaliseEmail)
    expect(new Set(normalised).size).toBe(1)
    expect(normalised[0]).toBe('johnsmith@gmail.com')
  })

  it('strips a plus alias on any provider', () => {
    expect(normaliseEmail('emily+whv@outlook.com')).toBe('emily@outlook.com')
    expect(normaliseEmail('emily+a+b@yahoo.com')).toBe('emily@yahoo.com')
  })

  it('lowercases and trims', () => {
    expect(normaliseEmail('  Emily@Example.COM ')).toBe('emily@example.com')
  })
})

describe('normaliseEmail — addresses that are NOT the same inbox', () => {
  it('keeps dots outside Gmail, where they are significant', () => {
    // On most providers john.smith@ and johnsmith@ are two different people.
    expect(normaliseEmail('john.smith@outlook.com')).toBe('john.smith@outlook.com')
    expect(normaliseEmail('john.smith@outlook.com'))
      .not.toBe(normaliseEmail('johnsmith@outlook.com'))
  })

  it('does not merge different people on the same domain', () => {
    expect(normaliseEmail('emily@gmail.com')).not.toBe(normaliseEmail('emilyb@gmail.com'))
  })

  it('does not merge the same local part across domains', () => {
    expect(normaliseEmail('emily@gmail.com')).not.toBe(normaliseEmail('emily@outlook.com'))
  })
})

describe('normaliseEmail — edge cases', () => {
  it('handles empty and missing input without throwing', () => {
    expect(normaliseEmail('')).toBe('')
    expect(normaliseEmail(null)).toBe('')
    expect(normaliseEmail(undefined)).toBe('')
  })

  it('leaves a string with no @ alone rather than mangling it', () => {
    expect(normaliseEmail('not-an-email')).toBe('not-an-email')
  })

  it('is stable: normalising twice changes nothing', () => {
    const once = normaliseEmail('John.Smith+tax@Googlemail.com')
    expect(normaliseEmail(once)).toBe(once)
  })

  it('a returning client next year lands on their existing row', () => {
    const firstVisit  = normaliseEmail('Emily.Watson@gmail.com')
    const yearLater   = normaliseEmail('emilywatson+2027@googlemail.com')
    expect(yearLater).toBe(firstVisit)
  })
})

describe('normalisePhone — the same number written differently', () => {
  it('collapses every way one WhatsApp number gets typed', () => {
    const variants = [
      '+44 7712 445901',
      '0044 7712 445901',
      '447712445901',
      '+447712445901',
      '  +44-7712-445901  ',
      '(+44) 7712 445901',
    ]
    const normalised = variants.map(normalisePhone)
    expect(new Set(normalised).size).toBe(1)
    expect(normalised[0]).toBe('447712445901')
  })

  it('keeps genuinely different numbers apart', () => {
    expect(normalisePhone('+44 7712 445901')).not.toBe(normalisePhone('+44 7712 445902'))
  })

  it('returns empty for anything too short to identify a person', () => {
    // Matching on a fragment would merge unrelated people.
    expect(normalisePhone('12345')).toBe('')
    expect(normalisePhone('0412')).toBe('')
    expect(normalisePhone('')).toBe('')
    expect(normalisePhone(null)).toBe('')
    expect(normalisePhone(undefined)).toBe('')
  })

  it('is stable: normalising twice changes nothing', () => {
    const once = normalisePhone('+44 7712 445901')
    expect(normalisePhone(once)).toBe(once)
  })

  it('a returning client with a new email but the same phone is one person', () => {
    // The trigger falls back to the number when the email does not match.
    expect(normalisePhone('0044 7712 445901')).toBe(normalisePhone('+447712445901'))
  })
})
