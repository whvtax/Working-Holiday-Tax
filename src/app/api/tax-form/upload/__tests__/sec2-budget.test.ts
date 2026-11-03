/** Security round 2 (R2-2): the upload route enforces the byte budget and refuses an oversized declared body before buffering it. */
import { NextRequest } from 'next/server'

const uploads: string[] = []
jest.mock('@/lib/supabase', () => ({
  STORAGE_BUCKETS: { uploads: 'uploads' },
  assertUploadsBucketPrivate: jest.fn().mockResolvedValue(undefined),
  getSupabase: () => ({ storage: { from: () => ({
    upload: (path: string) => { uploads.push(path); return Promise.resolve({ error: null }) },
    getPublicUrl: (path: string) => ({ data: { publicUrl: `https://x.supabase.co/p/${path}` } }),
  }) } }),
}))
const budget = jest.fn().mockResolvedValue(false)
jest.mock('@/lib/rate-limit', () => ({
  isRateLimited: jest.fn().mockResolvedValue(false),
  consumeByteBudget: (...a: unknown[]) => budget(...a),
}))

import { POST } from '../route'

const PDF = new Uint8Array([0x25, 0x50, 0x44, 0x46, 0x2d, 0x31, 0x2e, 0x34, 0, 0, 0, 0])
const mk = (headers: Record<string, string> = {}) => new NextRequest('http://workingholidaytax.com.au/api/tax-form/upload?filename=a.pdf&kind=bank', {
  method: 'POST', body: PDF, headers: { host: 'workingholidaytax.com.au', 'content-type': 'application/pdf', 'x-real-ip': '2001:db8:1:2::9', ...headers },
})
beforeEach(() => { uploads.length = 0; budget.mockClear(); budget.mockResolvedValue(false) })

it('a normal upload passes and is charged against the per-/64 bucket', async () => {
  const res = await POST(mk())
  expect(res.status).toBe(200)
  expect(budget).toHaveBeenCalledWith('tax-form-upload:2001:db8:1:2::/64', PDF.byteLength, 120 * 1024 * 1024, 900)
})

it('over budget: 429 and nothing is written to storage', async () => {
  budget.mockResolvedValue(true)
  const res = await POST(mk())
  expect(res.status).toBe(429)
  expect(uploads).toHaveLength(0)
})

it('a declared body over 10 MB is refused with the existing message, without touching the budget or storage', async () => {
  const res = await POST(mk({ 'content-length': String(25 * 1024 * 1024) }))
  expect(res.status).toBe(400)
  expect((await res.json()).error).toMatch(/too large/i)
  expect(budget).not.toHaveBeenCalled()
  expect(uploads).toHaveLength(0)
})
