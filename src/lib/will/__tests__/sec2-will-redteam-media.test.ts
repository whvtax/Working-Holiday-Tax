/**
 * Round 2 red team (sec2-will-redteam): media download SSRF, token exposure and
 * content-type confusion. fetch is mocked; nothing leaves the machine.
 */
const getSetting = jest.fn().mockImplementation(async (k: string) => (/token/i.test(k) ? 'TEST_TOKEN_NOT_REAL' : undefined));
jest.mock('@/lib/will/store', () => ({ getStore: () => ({ getSetting, audit: jest.fn() }) }));
jest.mock('@/lib/will/auth', () => ({ sessionValid: jest.fn().mockResolvedValue(true) }));
jest.mock('@/lib/will/access-log', () => ({ recordDataRead: jest.fn(), shortHash: (s: string) => s.slice(0, 4) }));

import { fetchWaMedia } from '@/lib/will/channel';
import { GET } from '@/app/api/will/media/[id]/route';

type Call = { url: string; headers: Record<string, string> };
let calls: Call[];
function mockMeta(downloadUrl: string | undefined, file: { body?: string; mime?: string; length?: string } = {}) {
  calls = [];
  global.fetch = jest.fn(async (url: unknown, init?: { headers?: Record<string, string> }) => {
    const u = String(url);
    calls.push({ url: u, headers: init?.headers ?? {} });
    if (u.startsWith('https://graph.facebook.com/')) {
      return new Response(JSON.stringify({ url: downloadUrl, mime_type: file.mime ?? 'image/jpeg' }), { status: 200 });
    }
    const headers: Record<string, string> = { 'content-type': file.mime ?? 'image/jpeg' };
    if (file.length) headers['content-length'] = file.length;
    return new Response(file.body ?? 'BYTES', { status: 200, headers });
  }) as unknown as typeof fetch;
}
const hasAuth = (c: Call) => Object.keys(c.headers).some((k) => k.toLowerCase() === 'authorization');

beforeEach(() => { process.env.WHATSAPP_ACCESS_TOKEN = 'TEST_TOKEN_NOT_REAL'; });

describe('fetchWaMedia: SSRF and token exposure', () => {
  const REFUSED = [
    'http://lookaside.fbsbx.com/a', 'https://127.0.0.1/a', 'https://169.254.169.254/latest/meta-data', 'https://2130706433/a',
    'https://0x7f000001/a', 'https://[::1]/a', 'https://localhost/a', 'https://metadata/a', 'https://svc.internal/a',
    'https://lookaside.fbsbx.com:8443/a', 'https://user:pw@lookaside.fbsbx.com/a', 'file:///etc/passwd', 'gopher://x.com/a', 'javascript:alert(1)', 'not a url',
  ];
  for (const u of REFUSED) {
    it(`never follows ${u}`, async () => {
      mockMeta(u);
      const r = await fetchWaMedia('MEDIA12345');
      expect(r.ok).toBe(false);
      expect(calls.filter((c) => !c.url.startsWith('https://graph.facebook.com/'))).toHaveLength(0);
    });
  }
  it('a Meta CDN host gets the bearer token', async () => {
    mockMeta('https://lookaside.fbsbx.com/whatsapp_business/attachments/?mid=1');
    const r = await fetchWaMedia('MEDIA12345');
    expect(r.ok).toBe(true);
    expect(hasAuth(calls[1])).toBe(true);
  });
  it('look-alike hosts never receive the bearer token', async () => {
    for (const u of ['https://fbsbx.com.evil.example/a', 'https://evilfbsbx.com/a', 'https://lookaside.fbsbx.com.attacker.net/a', 'https://whatsapp.net.evil.io/a']) {
      mockMeta(u);
      await fetchWaMedia('MEDIA12345');
      for (const c of calls.slice(1)) expect(hasAuth(c)).toBe(false);
    }
  });
  it('the media id is URL-encoded into the lookup, so a path trick cannot change the endpoint', async () => {
    mockMeta(undefined);
    await fetchWaMedia('../../me/accounts?x=');
    expect(calls[0].url).not.toContain('/../');
    expect(calls[0].url).toContain('%2F');
  });
  it('refuses an oversized attachment on the declared length before reading it', async () => {
    mockMeta('https://lookaside.fbsbx.com/a', { length: String(500 * 1024 * 1024) });
    const r = await fetchWaMedia('MEDIA12345');
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.status).toBe(413);
  });
  it('without credentials nothing is fetched at all', async () => {
    delete process.env.WHATSAPP_ACCESS_TOKEN; delete process.env.WA_ACCESS_TOKEN;
    getSetting.mockResolvedValue(undefined);
    mockMeta('https://lookaside.fbsbx.com/a');
    const r = await fetchWaMedia('MEDIA12345');
    expect(r.ok).toBe(false);
    expect(calls).toHaveLength(0);
    getSetting.mockImplementation(async (k: string) => (/token/i.test(k) ? 'TEST_TOKEN_NOT_REAL' : undefined));
  });
});

describe('media route: content-type confusion', () => {
  const get = (id: string) => GET(new Request('http://x/api/will/media/' + id), { params: Promise.resolve({ id }) });
  it.each([
    ['image/svg+xml', '<svg onload="fetch(\'/api/will/actions\')"/>'],
    ['text/html', '<script>alert(1)</script>'],
    ['application/xhtml+xml', '<html/>'],
    ['text/xml', '<x/>'],
    ['application/javascript', 'alert(1)'],
    ['image/jpeg; charset=text/html', '<html>'],
    ['IMAGE/SVG+XML', '<svg/>'],
  ])('%s is never served inline', async (mime, body) => {
    mockMeta('https://lookaside.fbsbx.com/a', { mime, body });
    const res = await get('MEDIA12345');
    const inlineImage = /^image\/(jpeg|jpg|png|gif|webp|heic|heif|bmp)/.test(mime.toLowerCase().split(';')[0]);
    if (!inlineImage) {
      expect(res.headers.get('content-type')).toBe('application/octet-stream');
      expect(res.headers.get('content-disposition')).toMatch(/^attachment/);
    }
    expect(res.headers.get('x-content-type-options')).toBe('nosniff');
    expect(res.headers.get('content-security-policy')).toMatch(/sandbox/);
  });
  it('a real JPEG is inline but sandboxed', async () => {
    mockMeta('https://lookaside.fbsbx.com/a', { mime: 'image/jpeg' });
    const res = await get('MEDIA12345');
    expect(res.headers.get('content-disposition')).toMatch(/^inline/);
    expect(res.headers.get('content-security-policy')).toMatch(/default-src 'none'/);
  });
  it.each(['a', '../etc/passwd', 'x'.repeat(300), 'abc def', 'abc%2e%2e', 'id;rm'])('bad id %j is a 400', async (id) => {
    mockMeta('https://lookaside.fbsbx.com/a');
    const res = await GET(new Request('http://x/'), { params: Promise.resolve({ id }) });
    expect(res.status).toBe(400);
    expect(calls).toHaveLength(0);
  });
  it('an unauthenticated caller gets 401 and no Meta call', async () => {
    const auth = jest.requireMock('@/lib/will/auth') as { sessionValid: jest.Mock };
    auth.sessionValid.mockResolvedValueOnce(false);
    mockMeta('https://lookaside.fbsbx.com/a');
    const res = await get('MEDIA12345');
    expect(res.status).toBe(401);
    expect(calls).toHaveLength(0);
  });
});
