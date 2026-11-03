/**
 * /api/crm/file: object-path hardening (security review, uploads and data).
 * Auth is unchanged; this only covers what happens to the `url` parameter
 * after a valid CRM session.
 */
import { NextRequest } from 'next/server'

const download = jest.fn()
jest.mock('@/lib/crm-store', () => ({ validateSessionFresh: async (t?: string) => t === 'good' }))
jest.mock('@/lib/supabase', () => ({
  STORAGE_BUCKETS: { uploads: 'uploads' },
  getSupabase: () => ({ storage: { from: () => ({ download: (...a: unknown[]) => download(...a) }) } }),
}))

import { GET } from '../route'

const BASE = 'https://proj.supabase.co/storage/v1/object/public/uploads/'
const call = (url: string, cookie = 'good') =>
  GET(new NextRequest(`http://localhost/api/crm/file?url=${encodeURIComponent(url)}`, { headers: { cookie: `crm_session=${cookie}` } }))

beforeAll(() => { process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://proj.supabase.co' })
beforeEach(() => download.mockReset())

it('no session: 401 and storage is never touched', async () => {
  const res = await call(BASE + 'tax-form/bank/a.pdf', 'bad')
  expect(res.status).toBe(401)
  expect(download).not.toHaveBeenCalled()
})

it('a normal object path is downloaded and served with no-store and nosniff', async () => {
  download.mockResolvedValue({ data: new Blob([new Uint8Array([0x25, 0x50, 0x44, 0x46])], { type: 'application/pdf' }), error: null })
  const res = await call(BASE + 'tax-form/bank/1_ab12cd34_statement.pdf')
  expect(res.status).toBe(200)
  expect(download).toHaveBeenCalledWith('tax-form/bank/1_ab12cd34_statement.pdf')
  expect(res.headers.get('cache-control')).toBe('private, no-store')
  expect(res.headers.get('x-content-type-options')).toBe('nosniff')
})

// The WHATWG URL parser already collapses literal and %2e dot segments; what
// survives to decodeURIComponent is the encoded-slash and encoded-backslash form.
it('percent-encoded traversal is refused before storage is called', async () => {
  for (const evil of ['%2e%2e%2fsecret.pdf', 'tax-form%2f%2E%2E%2f%2E%2E%2fx.pdf', '%2e%2e%5csecret.pdf', '%2fetc%2fpasswd']) {
    const res = await call(BASE + evil)
    expect(res.status).toBe(403)
  }
  expect(download).not.toHaveBeenCalled()
})

it('a malformed percent escape is a 403, not an unhandled exception', async () => {
  const res = await call(BASE + 'tax-form/%E0%A4%A.pdf')
  expect(res.status).toBe(403)
  expect(download).not.toHaveBeenCalled()
})

it('a foreign host is refused', async () => {
  const res = await call('https://evil.example/storage/v1/object/public/uploads/x.pdf')
  expect(res.status).toBe(403)
})
