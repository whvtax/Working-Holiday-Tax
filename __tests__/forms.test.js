/**
 * ──────────────────────────────────────────────────────────────────────────
 * Unit tests for the LIVE code paths.
 * The app uses Supabase (not @vercel/postgres), so these tests target the real
 * library modules directly with minimal mocking. Run: npm test
 * ──────────────────────────────────────────────────────────────────────────
 */

// Must be set before requiring lib/supabase (read at call time, but be safe).
process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://testproj.supabase.co'

const { sanitiseField, sanitiseShort } = require('@/lib/sanitise')
const {
  hashPassword, verifyPassword, generateOtp, createSession, validateSession,
} = require('@/lib/crm-store')
const { isValidSupabaseStorageUrl } = require('@/lib/supabase')
const { getClientIp } = require('@/lib/get-ip')

describe('sanitise', () => {
  test('strips HTML tags', () => {
    expect(sanitiseField('<b>hi</b>')).toBe('hi')
    expect(sanitiseField('<script>x()</script>safe')).toBe('x()safe')
  })
  test('trims whitespace', () => { expect(sanitiseField('  hello  ')).toBe('hello') })
  test('caps length at 500 by default', () => {
    expect(sanitiseField('a'.repeat(600)).length).toBe(500)
  })
  test('null / undefined become empty string', () => {
    expect(sanitiseField(null)).toBe('')
    expect(sanitiseField(undefined)).toBe('')
  })
  test('sanitiseShort caps at 100', () => {
    expect(sanitiseShort('a'.repeat(200)).length).toBe(100)
  })
})

describe('crm-store: password + otp', () => {
  test('hashPassword is deterministic and verifyPassword matches', () => {
    const h = hashPassword('TestPassword123!@#')
    expect(typeof h).toBe('string')
    expect(verifyPassword('TestPassword123!@#', h)).toBe(true)
  })
  test('verifyPassword rejects a wrong password', () => {
    const h = hashPassword('TestPassword123!@#')
    expect(verifyPassword('not-the-password', h)).toBe(false)
  })
  test('generateOtp returns 8 digits', () => {
    for (let i = 0; i < 20; i++) expect(generateOtp()).toMatch(/^\d{8}$/)
  })
})

describe('crm-store: session tokens', () => {
  test('a freshly created session validates', () => {
    expect(validateSession(createSession())).toBe(true)
  })
  test('missing / malformed / tampered tokens are rejected', () => {
    expect(validateSession(undefined)).toBe(false)
    expect(validateSession('')).toBe(false)
    expect(validateSession('not-a-token')).toBe(false)
    expect(validateSession('abc.def')).toBe(false)
    const t = createSession()
    expect(validateSession(t + 'tamper')).toBe(false)
  })
})

describe('supabase storage URL validation', () => {
  test('accepts our own public uploads URL', () => {
    expect(isValidSupabaseStorageUrl(
      'https://testproj.supabase.co/storage/v1/object/public/uploads/tfn-form/x.jpg')).toBe(true)
  })
  test('rejects a different host', () => {
    expect(isValidSupabaseStorageUrl(
      'https://evil.example.com/storage/v1/object/public/uploads/x.jpg')).toBe(false)
  })
  test('rejects a path outside the uploads bucket', () => {
    expect(isValidSupabaseStorageUrl(
      'https://testproj.supabase.co/storage/v1/object/public/secrets/x.jpg')).toBe(false)
  })
  test('rejects non-https', () => {
    expect(isValidSupabaseStorageUrl(
      'http://testproj.supabase.co/storage/v1/object/public/uploads/x.jpg')).toBe(false)
  })
  test('rejects non-string', () => {
    expect(isValidSupabaseStorageUrl(null)).toBe(false)
  })
})

describe('get-ip: client IP extraction (DOS-02 hardened)', () => {
  test('prefers x-real-ip (trusted, unspoofable) over x-forwarded-for', () => {
    const req = new Request('http://x/', { headers: { 'x-real-ip': '3.3.3.3', 'x-forwarded-for': '1.1.1.1, 2.2.2.2' } })
    expect(getClientIp(req)).toBe('3.3.3.3')
  })
  test('uses x-real-ip when it is the only header', () => {
    const req = new Request('http://x/', { headers: { 'x-real-ip': '3.3.3.3' } })
    expect(getClientIp(req)).toBe('3.3.3.3')
  })
  test('falls back to the RIGHTMOST x-forwarded-for hop, not the spoofable leftmost', () => {
    const req = new Request('http://x/', { headers: { 'x-forwarded-for': '1.1.1.1, 2.2.2.2' } })
    expect(getClientIp(req)).toBe('2.2.2.2')
  })
  test('returns "unknown" when no IP headers are present', () => {
    expect(getClientIp(new Request('http://x/'))).toBe('unknown')
  })
})

describe('rate-limit: in-memory fallback when Redis is unavailable', () => {
  test('allows the first 5 requests then limits', async () => {
    delete process.env.REDIS_URL
    delete process.env.KV_URL
    const { isRateLimited } = require('@/lib/rate-limit')
    const ip = 'unit-test-' + Date.now()
    const out = []
    for (let i = 0; i < 7; i++) out.push(await isRateLimited(ip, 'unit-test-form'))
    expect(out[0]).toBe(false)   // 1st
    expect(out[4]).toBe(false)   // 5th (MAX_REQUESTS = 5)
    expect(out[5]).toBe(true)    // 6th → limited
    expect(out[6]).toBe(true)
  })
})

describe('isNdaCountry: matches official names and common real-world spellings', () => {
  const { isNdaCountry } = require('@/lib/nda-countries')

  test('matches official country names', () => {
    expect(isNdaCountry('Germany')).toBe(true)
    expect(isNdaCountry('Japan')).toBe(true)
    expect(isNdaCountry('Israel')).toBe(true)
    expect(isNdaCountry('Chile')).toBe(true)
    expect(isNdaCountry('Finland')).toBe(true)
    expect(isNdaCountry('Norway')).toBe(true)
    expect(isNdaCountry('Turkey')).toBe(true)
    expect(isNdaCountry('United Kingdom')).toBe(true)
  })

  test('matches common UK aliases people actually type', () => {
    expect(isNdaCountry('UK')).toBe(true)
    expect(isNdaCountry('U.K.')).toBe(true)
    expect(isNdaCountry('GB')).toBe(true)
    expect(isNdaCountry('England')).toBe(true)
    expect(isNdaCountry('Scotland')).toBe(true)
    expect(isNdaCountry('Wales')).toBe(true)
    expect(isNdaCountry('Northern Ireland')).toBe(true)
    expect(isNdaCountry('Britain')).toBe(true)
    expect(isNdaCountry('Great Britain')).toBe(true)
  })

  test('matches Germany aliases', () => {
    expect(isNdaCountry('Deutschland')).toBe(true)
    expect(isNdaCountry('german')).toBe(true)
  })

  // The form is offered in German, so German spellings arrive in the free-text
  // home-country field. These were all missed by the copy that used to run.
  test('matches German-language country names, accented and unaccented', () => {
    expect(isNdaCountry('Großbritannien')).toBe(true)
    expect(isNdaCountry('Grossbritannien')).toBe(true)
    expect(isNdaCountry('Vereinigtes Königreich')).toBe(true)
    expect(isNdaCountry('Vereinigtes Konigreich')).toBe(true)
    expect(isNdaCountry('Finnland')).toBe(true)
    expect(isNdaCountry('Norwegen')).toBe(true)
    expect(isNdaCountry('Türkei')).toBe(true)
    expect(isNdaCountry('Turkei')).toBe(true)
  })

  // The form is offered in Japanese. The copy that used to run recognised only
  // 日本 out of all of these - a Japanese client typing ドイツ was not detected.
  test('matches Japanese country names', () => {
    expect(isNdaCountry('イギリス')).toBe(true)
    expect(isNdaCountry('英国')).toBe(true)
    expect(isNdaCountry('ドイツ')).toBe(true)
    expect(isNdaCountry('日本')).toBe(true)
    expect(isNdaCountry('チリ')).toBe(true)
    expect(isNdaCountry('フィンランド')).toBe(true)
    expect(isNdaCountry('イスラエル')).toBe(true)
    expect(isNdaCountry('ノルウェー')).toBe(true)
    expect(isNdaCountry('トルコ')).toBe(true)
  })

  test('matches native-language and endonym spellings', () => {
    expect(isNdaCountry('Suomi')).toBe(true)
    expect(isNdaCountry('Norge')).toBe(true)
    expect(isNdaCountry('Nippon')).toBe(true)
    expect(isNdaCountry('Türkiye')).toBe(true)
    expect(isNdaCountry('Turkiye')).toBe(true)
    expect(isNdaCountry('ישראל')).toBe(true)
  })

  test('is case-insensitive and tolerates surrounding text', () => {
    expect(isNdaCountry('germany')).toBe(true)
    expect(isNdaCountry('GERMANY')).toBe(true)
    expect(isNdaCountry('gErMaNy')).toBe(true)
    expect(isNdaCountry('TÜRKIYE')).toBe(true)
    expect(isNdaCountry('großbritannien')).toBe(true)
    expect(isNdaCountry('  Japan  ')).toBe(true)
    expect(isNdaCountry('I am from Israel')).toBe(true)
  })

  test('tolerates stray whitespace: tabs, newlines and doubled spaces', () => {
    expect(isNdaCountry('\tNorway\n')).toBe(true)
    expect(isNdaCountry('United  Kingdom')).toBe(true)
    expect(isNdaCountry('United\tKingdom')).toBe(true)
    expect(isNdaCountry('  Deutschland  ')).toBe(true)
    // Ideographic space, which a Japanese IME produces.
    expect(isNdaCountry('　日本　')).toBe(true)
  })

  test('does not match non-NDA countries', () => {
    expect(isNdaCountry('Ireland')).toBe(false)
    expect(isNdaCountry('France')).toBe(false)
    expect(isNdaCountry('United States')).toBe(false)
    expect(isNdaCountry('Canada')).toBe(false)
    expect(isNdaCountry('South Korea')).toBe(false)
    expect(isNdaCountry('Austria')).toBe(false)
    expect(isNdaCountry('Österreich')).toBe(false)
    expect(isNdaCountry('Iceland')).toBe(false)
    expect(isNdaCountry('Netherlands')).toBe(false)
    expect(isNdaCountry('Republic of Ireland')).toBe(false)
    expect(isNdaCountry('アイルランド')).toBe(false)
    expect(isNdaCountry('フランス')).toBe(false)
    expect(isNdaCountry('韓国')).toBe(false)
  })

  // Short codes and country names must match whole words only, or a long
  // non-NDA name containing them becomes a false hit.
  test('short codes and country names never match inside a longer word', () => {
    expect(isNdaCountry('Ukraine')).toBe(false)
    expect(isNdaCountry('GBP')).toBe(false)
    expect(isNdaCountry('Israelite')).toBe(false)
    expect(isNdaCountry('Germanic')).toBe(false)
    expect(isNdaCountry('Chilean')).toBe(false)
    expect(isNdaCountry('Turkeys')).toBe(false)
  })

  test('handles empty / null / undefined input', () => {
    expect(isNdaCountry('')).toBe(false)
    expect(isNdaCountry('   ')).toBe(false)
    expect(isNdaCountry('\t\n')).toBe(false)
    expect(isNdaCountry(null)).toBe(false)
    expect(isNdaCountry(undefined)).toBe(false)
  })

  // Guards the rule that the merge must not have changed WHICH countries are
  // on the list - only how many spellings of each are recognised.
  test('covers exactly the eight countries on the list, and no others', () => {
    const { NDA_COUNTRIES } = require('@/lib/nda-countries')
    expect([...NDA_COUNTRIES].sort()).toEqual([
      'Chile', 'Finland', 'Germany', 'Israel', 'Japan', 'Norway', 'Turkey', 'United Kingdom',
    ])
    for (const name of NDA_COUNTRIES) expect(isNdaCountry(name)).toBe(true)
  })
})
