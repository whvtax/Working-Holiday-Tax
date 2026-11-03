/**
 * Round 2 (sec2-forms-uploads): what the PUBLIC upload endpoint stores, tried the
 * way an attacker would. Local, synthetic bytes only; the bucket is a stub.
 */
import { NextRequest } from 'next/server'

const uploads: { path: string; type: string; size: number }[] = []
jest.mock('@/lib/supabase', () => ({
  STORAGE_BUCKETS: { uploads: 'uploads' },
  assertUploadsBucketPrivate: jest.fn().mockResolvedValue(undefined),
  getSupabase: () => ({
    storage: { from: () => ({
      upload: (path: string, body: ArrayBuffer, o: { contentType: string }) => { uploads.push({ path, type: o.contentType, size: body.byteLength }); return Promise.resolve({ error: null }) },
      getPublicUrl: (path: string) => ({ data: { publicUrl: `https://x.supabase.co/storage/v1/object/public/uploads/${path}` } }),
    }) },
  }),
}))
jest.mock('@/lib/rate-limit', () => ({ isRateLimited: jest.fn().mockResolvedValue(false), consumeByteBudget: jest.fn().mockResolvedValue(false) }))

import { POST, isHeifBrand } from '../route'

const bytes = (...a: (number | string)[]) => new Uint8Array(a.flatMap((x) => typeof x === 'string' ? [...Buffer.from(x, 'latin1')] : [x]))
const JPEG = bytes(0xff, 0xd8, 0xff, 0xe0, 0, 0, 0, 0, 0, 0, 0, 0)
const PNG = bytes(0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0, 0, 0, 0)
const PDF = bytes('%PDF-1.4\n', 0, 0, 0)
const GIF = bytes('GIF89a', 0, 0, 0, 0, 0, 0)
const WEBP = bytes('RIFF', 0, 0, 0, 0, 'WEBP')
const ftyp = (brand: string) => bytes(0, 0, 0, 0x18, 'ftyp', brand, 0, 0, 0, 0)

function up(body: Uint8Array | string, type: string, q = 'filename=a.jpg&kind=invoice', host = 'workingholidaytax.com.au') {
  return POST(new NextRequest(`http://${host}/api/tax-form/upload?${q}`, { method: 'POST', body: body as BodyInit, headers: { host, 'content-type': type } }))
}
beforeEach(() => { uploads.length = 0 })

describe('declared type must match the bytes', () => {
  it.each([
    ['PNG as jpeg', PNG, 'image/jpeg'], ['JPEG as png', JPEG, 'image/png'], ['PDF as jpeg', PDF, 'image/jpeg'],
    ['JPEG as pdf', JPEG, 'application/pdf'], ['GIF as webp', GIF, 'image/webp'], ['RIFF only as webp', bytes('RIFF', 0, 0, 0, 0, 'AVI '), 'image/webp'],
  ])('%s is refused', async (_n, body, type) => {
    expect((await up(body, type)).status).toBe(400)
    expect(uploads).toHaveLength(0)
  })

  it.each([
    ['SVG', '<svg xmlns="http://www.w3.org/2000/svg"><script>alert(1)</script></svg>', 'image/svg+xml'],
    ['SVG declared png', '<svg xmlns="http://www.w3.org/2000/svg"><script>alert(1)</script></svg>', 'image/png'],
    ['HTML declared jpeg', '<!doctype html><script>alert(1)</script>', 'image/jpeg'],
    ['HTML declared pdf', '<html><body onload=alert(1)>', 'application/pdf'],
    ['XML', '<?xml version="1.0"?><x/>', 'text/xml'], ['JS', 'alert(1)', 'application/javascript'],
    ['ZIP', 'PK\u0003\u0004', 'application/zip'], ['PHP declared jpeg', '<?php system($_GET[0]);', 'image/jpeg'],
    ['ELF declared pdf', '\u007fELF', 'application/pdf'], ['PE declared png', 'MZ\u0090\u0000', 'image/png'],
  ])('%s is refused', async (_n, body, type) => {
    expect((await up(body, type)).status).toBe(400)
    expect(uploads).toHaveLength(0)
  })

  it.each(['Image/PNG', 'image/png; charset=binary', 'image/PNG', 'multipart/form-data', ''])('content-type %j is not normalised into an allowed one', async (type) => {
    expect((await up(PNG, type)).status).toBe(400)
    expect(uploads).toHaveLength(0)
  })

  it('genuine files of every allowed type are stored with the declared type', async () => {
    for (const [b, t] of [[JPEG, 'image/jpeg'], [JPEG, 'image/jpg'], [PNG, 'image/png'], [PDF, 'application/pdf'], [GIF, 'image/gif'], [WEBP, 'image/webp'], [ftyp('heic'), 'image/heic'], [ftyp('mif1'), 'image/heif'], [ftyp('heic'), 'image/jpeg']] as const) {
      expect((await up(b, t)).status).toBe(200)
    }
    expect(uploads.map((u) => u.type)).toEqual(['image/jpeg', 'image/jpg', 'image/png', 'application/pdf', 'image/gif', 'image/webp', 'image/heic', 'image/heif', 'image/jpeg'])
  })
})

describe('ISO base media container (ftyp) is not automatically an image (round 2)', () => {
  it.each(['isom', 'mp42', 'M4A ', 'qt  ', '3gp4', 'avif'])('major brand %s is refused as heic, heif and jpeg', async (brand) => {
    for (const t of ['image/heic', 'image/heif', 'image/jpeg']) expect((await up(ftyp(brand), t)).status).toBe(400)
    expect(uploads).toHaveLength(0)
  })
  it.each(['heic', 'heix', 'hevc', 'hevx', 'heim', 'heis', 'mif1', 'msf1'])('HEIF brand %s is accepted', (brand) => {
    expect(isHeifBrand(brand)).toBe(true)
  })
})

describe('polyglots and appended content are stored inert', () => {
  it('a JPEG with HTML appended is accepted only as image/jpeg (served nosniff + sandbox CSP by /api/crm/file)', async () => {
    const poly = new Uint8Array([...JPEG, ...Buffer.from('<html><script>alert(1)</script></html>')])
    expect((await up(poly, 'image/jpeg')).status).toBe(200)
    expect(uploads[0].type).toBe('image/jpeg')
    expect((await up(poly, 'text/html')).status).toBe(400)
  })
  it('a PDF carrying JavaScript objects is stored as application/pdf, never text/html', async () => {
    const pdf = new Uint8Array([...PDF, ...Buffer.from('1 0 obj<</S/JavaScript/JS(app.alert(1))>>endobj')])
    expect((await up(pdf, 'application/pdf')).status).toBe(200)
    expect(uploads[0].type).toBe('application/pdf')
  })
  it('script or PE signature at offset 0 is refused even behind a valid type header', async () => {
    expect((await up(bytes('<script>', 0, 0, 0, 0, 0), 'image/jpeg')).status).toBe(400)
  })
})

describe('object name', () => {
  const path = async (q: string) => { expect((await up(JPEG, 'image/jpeg', q)).status).toBe(200); return uploads.at(-1)!.path }
  it.each([
    '../../../etc/passwd', '..%2f..%2fsecret.jpg', '%2e%2e/%2e%2e/x.jpg', '..\\..\\win.jpg', 'a/b/c.jpg', '/abs/x.jpg', 'x.jpg\u0000.php',
    'a'.repeat(400) + '.jpg', '', '....', '.htaccess', 'con.jpg', '<img src=x onerror=1>.jpg', 'x.jpg%00.php', 'é‮gpj.exe',
  ])('filename %j cannot escape the folder or carry a separator', async (name) => {
    const p = await path(`filename=${encodeURIComponent(name)}&kind=invoice`)
    expect(p).toMatch(/^tax-form\/invoices\/\d+_[0-9a-f]{8}_[A-Za-z0-9._-]{0,80}$/)
    expect(p).not.toMatch(/\.\.|\\|\u0000/)
    expect(p.split('/').length).toBe(3)
  })
  it('kind is an enum; anything else lands in the default folder', async () => {
    expect(await path('filename=a.jpg&kind=bank')).toMatch(/^tax-form\/bank\//)
    expect(await path('filename=a.jpg&kind=selfie')).toMatch(/^tax-form\/selfie\//)
    expect(await path('filename=a.jpg&kind=../../crm')).toMatch(/^tax-form\/invoices\//)
    expect(await path('filename=a.jpg&kind=bank&kind=../x')).toMatch(/^tax-form\/bank\//)
  })
  it('the brand prefix comes from the host only, never from a header, query or body', async () => {
    process.env.SVT_FORMS_ENABLED = 'true'
    const r = await POST(new NextRequest('http://workingholidaytax.com.au/api/tax-form/upload?filename=a.jpg&brand=svt&folder=svt/tax-form', {
      method: 'POST', body: JPEG, headers: { host: 'workingholidaytax.com.au', 'content-type': 'image/jpeg', 'x-brand': 'svt', 'x-forwarded-host': 'studentvisatax.com.au', 'x-original-host': 'studentvisatax.com.au' },
    }))
    expect(r.status).toBe(200)
    expect(uploads[0].path).toMatch(/^tax-form\/invoices\//)
    delete process.env.SVT_FORMS_ENABLED
  })
  it('two uploads of the same name never overwrite each other', async () => {
    const a = await path('filename=same.jpg'); const b = await path('filename=same.jpg')
    expect(a).not.toBe(b)
  })
})

describe('size', () => {
  it('exactly 10 MB passes, one byte more is refused', async () => {
    const ok = new Uint8Array(10 * 1024 * 1024); ok.set(JPEG)
    expect((await up(ok, 'image/jpeg')).status).toBe(200)
    const big = new Uint8Array(10 * 1024 * 1024 + 1); big.set(JPEG)
    expect((await up(big, 'image/jpeg')).status).toBe(400)
  })
  it('an empty body is not stored', async () => {
    expect((await up(new Uint8Array(0), 'image/jpeg')).status).toBe(400)
    expect(uploads).toHaveLength(0)
  })
})
