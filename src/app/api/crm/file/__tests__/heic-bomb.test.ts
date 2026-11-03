/** Round 2: a HEIC declaring an absurd pixel count is served as stored, never handed to the decoder. */
import { NextRequest } from 'next/server'

const download = jest.fn()
const convert = jest.fn().mockResolvedValue(new Uint8Array([0xff, 0xd8, 0xff]))
jest.mock('heic-convert', () => ({ __esModule: true, default: (...a: unknown[]) => convert(...a) }))
jest.mock('@/lib/crm-store', () => ({ validateSessionFresh: async (t?: string) => t === 'good' }))
jest.mock('@/lib/supabase', () => ({
  STORAGE_BUCKETS: { uploads: 'uploads' },
  getSupabase: () => ({ storage: { from: () => ({ download: (...a: unknown[]) => download(...a) }) } }),
}))
import { GET } from '../route'

function heic(w: number, h: number): Uint8Array {
  const b = Buffer.alloc(96)
  Buffer.from('ftypheic').copy(b, 4)
  Buffer.from('ispe').copy(b, 64); b.writeUInt32BE(w, 72); b.writeUInt32BE(h, 76)
  return new Uint8Array(b)
}
const call = () => GET(new NextRequest(`http://localhost/api/crm/file?url=${encodeURIComponent('https://proj.supabase.co/storage/v1/object/public/uploads/tax-form/selfie/1_ab_a.heic')}`, { headers: { cookie: 'crm_session=good' } }))
beforeAll(() => { process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://proj.supabase.co' })
beforeEach(() => { download.mockReset(); convert.mockClear() })

it('a normal HEIC is transcoded to JPEG', async () => {
  download.mockResolvedValue({ data: new Blob([heic(4032, 3024) as BlobPart], { type: 'image/heic' }), error: null })
  const res = await call()
  expect(convert).toHaveBeenCalledTimes(1)
  expect(res.headers.get('content-type')).toBe('image/jpeg')
})
it('a decompression bomb never reaches the decoder', async () => {
  download.mockResolvedValue({ data: new Blob([heic(60000, 60000) as BlobPart], { type: 'image/heic' }), error: null })
  const res = await call()
  expect(convert).not.toHaveBeenCalled()
  expect(res.status).toBe(200)
  expect(res.headers.get('content-type')).toBe('image/heic')
  expect(res.headers.get('x-content-type-options')).toBe('nosniff')
})
