/**
 * Round 2 (sec2-api-svt): URLs that Meta's API returns are untrusted before we
 * send the WhatsApp bearer token to them. Synthetic token, mocked fetch.
 */
import { isSafeOutboundHttpsUrl, isMetaHost, isGraphPagingUrl } from '../meta-url'

describe('isSafeOutboundHttpsUrl', () => {
  it.each([
    'https://lookaside.fbsbx.com/whatsapp_business/attachments/?mid=1',
    'https://scontent.whatsapp.net/v/t61/x.enc',
    'https://cdn.example.com/a.jpg',
  ])('allows %s', (u) => expect(isSafeOutboundHttpsUrl(u)).toBe(true))

  it.each([
    'http://lookaside.fbsbx.com/x',
    'https://user:pw@lookaside.fbsbx.com/x',
    'https://lookaside.fbsbx.com:8443/x',
    'https://169.254.169.254/latest/meta-data/',
    'https://127.0.0.1/x',
    'https://2130706433/x',
    'https://0x7f000001/x',
    'https://[::1]/x',
    'https://localhost/x',
    'https://metadata/x',
    'https://db.internal/x',
    'https://printer.local/x',
    'file:///etc/passwd',
    'ftp://x.example.com/a',
    'not a url',
    '',
  ])('refuses %j', (u) => expect(isSafeOutboundHttpsUrl(u)).toBe(false))
})

describe('isMetaHost (the bearer token may go here)', () => {
  it.each(['https://lookaside.fbsbx.com/a', 'https://graph.facebook.com/v21.0/x', 'https://scontent.xx.fbcdn.net/a', 'https://mmg.whatsapp.net/a'])('yes %s', (u) => expect(isMetaHost(u)).toBe(true))
  it.each([
    'https://evil.com/a', 'https://facebook.com.evil.com/a', 'https://evilfacebook.com/a', 'https://fbsbx.com.evil.io/a',
    'http://graph.facebook.com/a', 'https://graph.facebook.com:444/a', 'https://whatsapp.net@evil.com/a',
  ])('no %s', (u) => expect(isMetaHost(u)).toBe(false))
})

describe('isGraphPagingUrl', () => {
  it('only graph.facebook.com over https', () => {
    expect(isGraphPagingUrl('https://graph.facebook.com/v21.0/1/message_templates?after=x')).toBe(true)
    for (const u of ['https://evil.com/x', 'https://lookaside.fbsbx.com/x', 'http://graph.facebook.com/x', 'https://graph.facebook.com.evil.com/x']) {
      expect(isGraphPagingUrl(u)).toBe(false)
    }
  })
})

describe('fetchWaMedia', () => {
  const realFetch = global.fetch
  const SYN_TOKEN = 'SYNTHETIC_TOKEN_FOR_TEST'
  beforeEach(() => {
    process.env.WHATSAPP_ACCESS_TOKEN = SYN_TOKEN
    process.env.WHATSAPP_PHONE_NUMBER_ID = '000000000000000'
  })
  afterEach(() => { global.fetch = realFetch; jest.resetModules() })

  function mockFetch(downloadUrl: string) {
    const calls: Array<{ url: string; auth: string | null }> = []
    global.fetch = jest.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input)
      const headers = new Headers(init?.headers as HeadersInit)
      calls.push({ url, auth: headers.get('authorization') })
      if (url.startsWith('https://graph.facebook.com/')) {
        return new Response(JSON.stringify({ url: downloadUrl, mime_type: 'image/jpeg' }), { status: 200 })
      }
      return new Response(new Uint8Array([1, 2, 3]), { status: 200, headers: { 'content-type': 'image/jpeg' } })
    }) as unknown as typeof fetch
    return calls
  }

  async function run(downloadUrl: string) {
    jest.doMock('../store', () => ({ getStore: () => ({ getSetting: async () => undefined }) }))
    const calls = mockFetch(downloadUrl)
    const { fetchWaMedia } = await import('../channel')
    const res = await fetchWaMedia('1234')
    return { res, calls }
  }

  it('a Meta host gets the token and the bytes come back', async () => {
    const { res, calls } = await run('https://lookaside.fbsbx.com/whatsapp_business/attachments/?mid=1')
    expect(res.ok).toBe(true)
    expect(calls[1].auth).toBe(`Bearer ${SYN_TOKEN}`)
  })

  it.each(['http://lookaside.fbsbx.com/x', 'https://169.254.169.254/latest/meta-data/', 'https://localhost/x', 'https://127.0.0.1:8080/x'])(
    'refuses %s without making the request',
    async (u) => {
      const { res, calls } = await run(u)
      expect(res.ok).toBe(false)
      expect(calls).toHaveLength(1) // only the Graph lookup, never the hostile URL
    },
  )

  it('a safe non-Meta host is still downloaded, but never receives the token', async () => {
    const { res, calls } = await run('https://cdn.example.com/a.jpg')
    expect(res.ok).toBe(true)
    expect(calls[1].url).toBe('https://cdn.example.com/a.jpg')
    expect(calls[1].auth).toBeNull()
  })
})
