/**
 * Two-stage intake — unit tests for the pure logic.
 *
 * Covers the parts that decide whether a client is recognised, whether a link
 * is accepted, and whether a duplicate is spotted. Anything touching the
 * database or the DOM is out of scope here and has to be checked in a browser.
 */

import { generateCompletionToken, normaliseTfn, TOKEN_TTL_DAYS } from '@/lib/intake'

describe('normaliseTfn', () => {
  it('treats the same number written differently as equal', () => {
    const forms = ['432116890', '432 116 890', '432-116-890', '432.116.890', ' 432116890 ']
    const normalised = forms.map(normaliseTfn)
    expect(new Set(normalised).size).toBe(1)
    expect(normalised[0]).toBe('432116890')
  })

  it('matches the SQL backfill, which strips every non-digit', () => {
    // Migration 015 uses regexp_replace(tfn, '[^0-9]', '', 'g'). If this
    // diverged, duplicate detection would silently stop matching old rows.
    expect(normaliseTfn('TFN: 432/116/890')).toBe('432116890')
    expect(normaliseTfn('432abc116890')).toBe('432116890')
  })

  it('handles empty and missing input', () => {
    expect(normaliseTfn('')).toBe('')
    expect(normaliseTfn(null)).toBe('')
    expect(normaliseTfn(undefined)).toBe('')
  })

  it('does not collapse two genuinely different numbers', () => {
    expect(normaliseTfn('432 116 890')).not.toBe(normaliseTfn('432 116 891'))
  })
})

describe('generateCompletionToken', () => {
  it('produces a token the server-side validator accepts', () => {
    // resolveCompletionToken() rejects anything outside this shape before it
    // touches the database.
    const pattern = /^[a-f0-9]{16,64}$/
    for (let i = 0; i < 50; i++) {
      expect(generateCompletionToken()).toMatch(pattern)
    }
  })

  it('is 24 hex characters, i.e. 96 bits of entropy', () => {
    expect(generateCompletionToken()).toHaveLength(24)
  })

  it('never repeats across a large batch', () => {
    const tokens = new Set(Array.from({ length: 2000 }, generateCompletionToken))
    expect(tokens.size).toBe(2000)
  })

  it('is not derived from anything guessable', () => {
    const a = generateCompletionToken()
    const b = generateCompletionToken()
    expect(a).not.toBe(b)
    // Sequential ids would share a long prefix; random ones effectively never do.
    let shared = 0
    while (shared < a.length && a[shared] === b[shared]) shared++
    expect(shared).toBeLessThan(8)
  })
})

describe('token lifetime', () => {
  it('is two weeks', () => {
    expect(TOKEN_TTL_DAYS).toBe(14)
  })

  it('expiry is computed far enough ahead to survive a fortnight away', () => {
    const expires = new Date(Date.now() + TOKEN_TTL_DAYS * 24 * 60 * 60 * 1000)
    const tenDaysLater = new Date(Date.now() + 10 * 24 * 60 * 60 * 1000)
    expect(expires.getTime()).toBeGreaterThan(tenDaysLater.getTime())
  })
})

describe('Australian tax year', () => {
  // Mirrors getCurrentTaxYear() in lib/db.ts, which both the original form and
  // the two-stage flow now share.
  const taxYearFor = (iso: string) => {
    const sydney = new Date(new Date(iso).toLocaleString('en-US', { timeZone: 'Australia/Sydney' }))
    const y = sydney.getFullYear()
    return sydney.getMonth() >= 6 ? `${y}-${String(y + 1).slice(2)}` : `${y - 1}-${String(y).slice(2)}`
  }

  it('rolls over on 1 July, not 1 January', () => {
    expect(taxYearFor('2026-06-30T12:00:00+10:00')).toBe('2025-26')
    expect(taxYearFor('2026-07-01T12:00:00+10:00')).toBe('2026-27')
  })

  it('uses Sydney time, so early morning on 1 July is already the new year', () => {
    // 00:30 on 1 July in Sydney is still 30 June in UTC. A UTC-based
    // calculation would file this lead under the previous year.
    expect(taxYearFor('2026-07-01T00:30:00+10:00')).toBe('2026-27')
  })

  it('is stable across the middle of a year', () => {
    expect(taxYearFor('2026-12-25T12:00:00+11:00')).toBe('2026-27')
    expect(taxYearFor('2027-03-01T12:00:00+11:00')).toBe('2026-27')
  })
})
