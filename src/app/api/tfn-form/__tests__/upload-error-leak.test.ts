/**
 * The public TFN / ABN / super routes must not echo internal upload errors
 * (storage provider text, the bucket-privacy guard) to an anonymous caller.
 * A customer-actionable rejection (wrong type, too big) still reaches them.
 */
import { NextRequest } from 'next/server'
import { UploadValidationError } from '@/lib/upload'

const uploadFiles = jest.fn()
jest.mock('@/lib/db', () => ({ createTask: jest.fn().mockResolvedValue({}), findExistingClient: jest.fn().mockResolvedValue(null) }))
jest.mock('@/lib/rate-limit', () => ({ isRateLimited: jest.fn().mockResolvedValue(false) }))
jest.mock('@/lib/upload', () => {
  const actual = jest.requireActual('@/lib/upload')
  return { ...actual, uploadFiles: (...a: unknown[]) => uploadFiles(...a) }
})
jest.mock('@/lib/will/form-link', () => ({ notifyFormReceived: jest.fn().mockResolvedValue({ matched: false }) }))

import { POST as tfn } from '../route'
import { POST as abn } from '../../abn-form/route'
import { POST as sup } from '../../super-form/route'

function req(path: string) {
  const fd = new FormData()
  for (const [k, v] of Object.entries({ firstName: 'A', lastName: 'B', email: 'a@example.invalid', whatsapp: '+61400000000' })) fd.append(k, v)
  return new NextRequest(`http://workingholidaytax.com.au${path}`, { method: 'POST', body: fd })
}

const cases: [string, (r: NextRequest) => Promise<Response>, string][] = [
  ['tfn', tfn, '/api/tfn-form'], ['abn', abn, '/api/abn-form'], ['super', sup, '/api/super-form'],
]

describe.each(cases)('%s-form upload errors', (_n, handler, path) => {
  beforeEach(() => { uploadFiles.mockReset(); jest.spyOn(console, 'error').mockImplementation(() => {}) })
  afterEach(() => jest.restoreAllMocks())

  it('internal errors become a generic 500 with no detail', async () => {
    for (const msg of ['SECURITY: "uploads" bucket is PUBLIC. It must be private. Aborting upload.', 'Upload failed: Bucket not found (uploads)', 'Cannot verify uploads bucket privacy: JWT expired']) {
      uploadFiles.mockRejectedValueOnce(new Error(msg))
      const res = await handler(req(path))
      const text = await res.text()
      expect(res.status).toBe(500)
      expect(text).not.toMatch(/bucket|uploads|SECURITY|JWT|Upload failed/i)
      expect(JSON.parse(text)).toEqual({ ok: false, error: 'submission_failed' })
    }
  })

  it('a customer-actionable rejection is still returned as invalid_file', async () => {
    uploadFiles.mockRejectedValueOnce(new UploadValidationError('File too large (max 10 MB per file)'))
    const res = await handler(req(path))
    expect(res.status).toBe(400)
    expect(await res.json()).toEqual({ ok: false, error: 'invalid_file', message: 'File too large (max 10 MB per file)' })
  })
})
