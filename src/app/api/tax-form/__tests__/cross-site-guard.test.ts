/** Round 2 (F-12): a page on another site cannot drive the public form endpoints through a visitor's browser. */
import { NextRequest } from 'next/server'

const createTask = jest.fn().mockResolvedValue({})
jest.mock('@/lib/db', () => ({ createTask: (...a: unknown[]) => createTask(...a), findExistingClient: jest.fn().mockResolvedValue(null) }))
jest.mock('@/lib/rate-limit', () => ({ isRateLimited: jest.fn().mockResolvedValue(false), consumeByteBudget: jest.fn().mockResolvedValue(false) }))
jest.mock('@/lib/will/form-link', () => ({ notifyFormReceived: jest.fn().mockResolvedValue({ matched: false }), medicareAnswerFor: () => null }))
jest.mock('@/lib/will/store', () => ({ getStore: () => ({ audit: jest.fn() }) }))
jest.mock('@/lib/upload', () => ({ ...jest.requireActual('@/lib/upload'), uploadFiles: jest.fn().mockResolvedValue([]) }))
jest.mock('@/lib/supabase', () => ({
  ...jest.requireActual('@/lib/supabase'), STORAGE_BUCKETS: { uploads: 'uploads' },
  assertUploadsBucketPrivate: jest.fn().mockResolvedValue(undefined),
  getSupabase: () => ({ storage: { from: () => ({ upload: () => Promise.resolve({ error: null }), getPublicUrl: () => ({ data: { publicUrl: 'https://x/y' } }) }) } }),
}))

import { POST as taxForm } from '../route'
import { POST as upload } from '../upload/route'
import { POST as tfn } from '../../tfn-form/route'
import { POST as abn } from '../../abn-form/route'
import { POST as sup } from '../../super-form/route'

const form = () => { const fd = new FormData(); for (const [k, v] of Object.entries({ fullName: 'T P', firstName: 'T', lastName: 'P', email: 'a@example.invalid', waNumber: '+61400000000', auPhone: '0412 345 678', whatsapp: '+61400000000', taxYear: '2025-26' })) fd.append(k, v); return fd }
const post = (h: (r: NextRequest) => Promise<Response>, path: string, site?: string) =>
  h(new NextRequest(`http://workingholidaytax.com.au${path}`, { method: 'POST', body: form(), headers: { host: 'workingholidaytax.com.au', ...(site ? { 'sec-fetch-site': site } : {}) } }))

const routes: [string, (r: NextRequest) => Promise<Response>, string][] = [['tax-form', taxForm, '/api/tax-form'], ['tfn', tfn, '/api/tfn-form'], ['abn', abn, '/api/abn-form'], ['super', sup, '/api/super-form']]
describe.each(routes)('%s', (_n, h, path) => {
  beforeEach(() => createTask.mockClear())
  it('refuses a cross-site browser request and writes nothing', async () => {
    const res = await post(h, path, 'cross-site')
    expect(res.status).toBe(403)
    expect(createTask).not.toHaveBeenCalled()
  })
  it.each(['same-origin', 'same-site', 'none', undefined])('allows %s', async (site) => {
    expect((await post(h, path, site)).status).toBe(200)
  })
})
it('the upload endpoint refuses cross-site too', async () => {
  const res = await upload(new NextRequest('http://workingholidaytax.com.au/api/tax-form/upload', { method: 'POST', body: new Uint8Array([1]), headers: { host: 'workingholidaytax.com.au', 'content-type': 'image/png', 'sec-fetch-site': 'cross-site' } }))
  expect(res.status).toBe(403)
})
