/** Decision 003: SVT uploads go under svt/ in the same private bucket. */
import { NextRequest } from 'next/server'

const uploads: string[] = []
jest.mock('@/lib/supabase', () => ({
  STORAGE_BUCKETS: { uploads: 'uploads' },
  assertUploadsBucketPrivate: jest.fn().mockResolvedValue(undefined),
  getSupabase: () => ({
    storage: {
      from: () => ({
        upload: (path: string) => { uploads.push(path); return Promise.resolve({ error: null }) },
        getPublicUrl: (path: string) => ({ data: { publicUrl: `https://x.supabase.co/storage/v1/object/public/uploads/${path}` } }),
        createSignedUrl: (path: string) => Promise.resolve({ data: { signedUrl: `https://x.supabase.co/storage/v1/object/sign/uploads/${path}` }, error: null }),
      }),
    },
  }),
}))
jest.mock('@/lib/rate-limit', () => ({ isRateLimited: jest.fn().mockResolvedValue(false), getRedis: jest.fn().mockResolvedValue(null) }))

import { POST } from '../route'

const PDF = new Uint8Array([0x25, 0x50, 0x44, 0x46, 0x2d, 0x31, 0x2e, 0x34, 0, 0, 0, 0])
const req = (host: string) => new NextRequest(`http://${host}/api/tax-form/upload?filename=pay.pdf&kind=invoice`, {
  method: 'POST', body: PDF, headers: { host, 'content-type': 'application/pdf' },
})

beforeEach(() => { uploads.length = 0 })

beforeAll(() => { process.env.SVT_FORMS_ENABLED = 'true' })
afterAll(() => { delete process.env.SVT_FORMS_ENABLED })

it('WHT upload path is unchanged', async () => {
  const res = await POST(req('workingholidaytax.com.au'))
  expect(res.status).toBe(200)
  expect(uploads[0]).toMatch(/^tax-form\/invoices\//)
})

it('SVT upload path is prefixed svt/', async () => {
  const res = await POST(req('studentvisatax.com.au'))
  expect(res.status).toBe(200)
  expect(uploads[0]).toMatch(/^svt\/tax-form\/invoices\//)
})

it('SVT upload is closed at runtime until SVT_FORMS_ENABLED is true (audit A09-1)', async () => {
  delete process.env.SVT_FORMS_ENABLED
  const res = await POST(req('studentvisatax.com.au'))
  expect(res.status).toBe(404)
  process.env.SVT_FORMS_ENABLED = 'true'
})
