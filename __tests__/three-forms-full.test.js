/**
 * ══════════════════════════════════════════════════════════════
 *  FULL FLOW TESTS — Super / ABN / TFN forms
 *  Every form → API → DB → CRM dashboard reads → Reviewer reads
 *  File types: JPEG, PNG, PDF, WebP, GIF, HEIC
 * ══════════════════════════════════════════════════════════════
 */

// ── Magic bytes ───────────────────────────────────────────────
const BYTES = {
  jpeg:  [0xFF, 0xD8, 0xFF, 0xE0, ...Array(50).fill(0x00)],
  png:   [0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, ...Array(50).fill(0x00)],
  pdf:   [0x25, 0x50, 0x44, 0x46, 0x2D, 0x31, 0x2E, 0x34, ...Array(50).fill(0x20)],
  webp:  [0x52, 0x49, 0x46, 0x46, 0x10, 0x00, 0x00, 0x00, 0x57, 0x45, 0x42, 0x50, ...Array(50).fill(0x00)],
  gif:   [0x47, 0x49, 0x46, 0x38, 0x39, 0x61, ...Array(50).fill(0x00)],
  heic:  [0x00, 0x00, 0x00, 0x18, 0x66, 0x74, 0x79, 0x70, 0x68, 0x65, 0x69, 0x63, ...Array(50).fill(0x00)],
  screenshot: [0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, ...Array(200).fill(0xAB)],
}

function makeFile(bytes, mime, name) {
  return new File([new Uint8Array(bytes)], name, { type: mime })
}

// ── Mocks ─────────────────────────────────────────────────────
let dbRows = {}
let lastSaved = null

jest.mock('@vercel/postgres', () => {
  const sql = jest.fn((strings, ...vals) => {
    const q = strings.join('').trim().toUpperCase()
    if (q.startsWith('CREATE') || q.startsWith('ALTER')) return Promise.resolve({ rows: [] })
    if (q.startsWith('INSERT')) {
      lastSaved = vals
      dbRows[vals[0]] = vals
      return Promise.resolve({ rows: [] })
    }
    if (q.startsWith('UPDATE')) return Promise.resolve({ rows: [] })
    if (q.includes('WHERE ID')) {
      const row = dbRows[vals[0]]
      if (!row) return Promise.resolve({ rows: [] })
      return Promise.resolve({ rows: [{ id: row[0], client_id: row[1], client_name: row[2], task_type: row[3], whatsapp: row[4], email: row[5], country: row[6], dob: row[7], tax_year: row[8], submitted_at: row[9], done: false, address: row[10]||'', tfn: row[11]||'', bank_details: row[12]||'', primary_job: row[13]||'', marital: row[14]||'', tax_status: row[15]||'', how_heard: row[16]||'', au_phone: row[17]||'', notes: row[18]||'', file_urls: row[19]||'[]', reviewer_note: '', review_status: 'pending' }] })
    }
    if (q.includes('SELECT') && q.includes('CRM_TASKS')) {
      const rows = Object.values(dbRows).map(row => ({ id: row[0], client_id: row[1], client_name: row[2], task_type: row[3], whatsapp: row[4], email: row[5], country: row[6], dob: row[7], tax_year: row[8], submitted_at: row[9], done: false, address: row[10]||'', tfn: row[11]||'', bank_details: row[12]||'', primary_job: row[13]||'', marital: row[14]||'', tax_status: row[15]||'', how_heard: row[16]||'', au_phone: row[17]||'', notes: row[18]||'', file_urls: row[19]||'[]', reviewer_note: '', review_status: 'pending' }))
      return Promise.resolve({ rows })
    }
    if (q.includes('SELECT') && q.includes('CRM_CLIENTS')) return Promise.resolve({ rows: [] })
    return Promise.resolve({ rows: [] })
  })
  sql.query = jest.fn(() => Promise.resolve({ rows: [] }))
  return { sql }
})

jest.mock('@vercel/blob', () => ({
  put: jest.fn(async (path, _data, opts) => ({ url: `https://blob.vercel-storage.com/${path}` })),
  del: jest.fn(async () => {}),
}))

jest.mock('@/lib/rate-limit', () => ({ isRateLimited: jest.fn(() => Promise.resolve(false)) }))
jest.mock('@/lib/get-ip', () => ({ getClientIp: jest.fn(() => '1.2.3.4') }))

const { put } = require('@vercel/blob')

function makeReq(path, method, formData, cookie = '') {
  const headers = { 'x-forwarded-for': '1.2.3.4' }
  if (cookie) headers['cookie'] = cookie
  return new (require('next/server').NextRequest)(`http://localhost${path}`, {
    method, body: formData, headers,
  })
}

beforeEach(() => { dbRows = {}; lastSaved = null; put.mockClear() })

// ══════════════════════════════════════════════════════════════
//  1. SUPER FORM — full flow
// ══════════════════════════════════════════════════════════════
describe('🏦 Super form — full flow to CRM', () => {
  let POST_SUPER, getTasks

  beforeAll(async () => {
    const superRoute = await import('../src/app/api/super-form/route.ts')
    POST_SUPER = superRoute.POST
    const db = await import('../src/lib/db.ts')
    getTasks = db.getTasks
  })

  function superFd(overrides = {}) {
    const fd = new FormData()
    const data = {
      firstName: 'Sophie', lastName: 'Martin', dob: '1998-04-12',
      passport: 'AB123456', passportCountry: 'France',
      smsPhone: '+33612345678', email: 'sophie@example.com',
      auAddress: '42 Bondi Rd Sydney', homeAddress: '12 Rue de Paris',
      tfn: '123456789', superFunds: 'AustralianSuper — 123',
      bankDetails: 'CBA — 062000 — 12345678', ...overrides,
    }
    Object.entries(data).forEach(([k, v]) => fd.append(k, v))
    return fd
  }

  test('✅ JPEG selfie — submits ok, saved to DB, appears in CRM', async () => {
    const fd = superFd()
    fd.append('selfiePassport', makeFile(BYTES.jpeg, 'image/jpeg', 'selfie.jpg'))
    const res = await POST_SUPER(makeReq('/api/super-form', 'POST', fd))
    expect(res.status).toBe(200)
    expect((await res.json()).ok).toBe(true)
    expect(lastSaved[3]).toBe('super')
    expect(lastSaved[2]).toBe('Sophie Martin')
    const urls = JSON.parse(lastSaved[19])
    expect(urls[0]).toContain('super-form/')
  })

  test('✅ PNG selfie — accepted', async () => {
    const fd = superFd({ email: 'png@example.com' })
    fd.append('selfiePassport', makeFile(BYTES.png, 'image/png', 'selfie.png'))
    const res = await POST_SUPER(makeReq('/api/super-form', 'POST', fd))
    expect(res.status).toBe(200)
    expect(put).toHaveBeenCalled()
  })

  test('✅ PDF selfie — accepted', async () => {
    const fd = superFd({ email: 'pdf@example.com' })
    fd.append('selfiePassport', makeFile(BYTES.pdf, 'application/pdf', 'passport.pdf'))
    const res = await POST_SUPER(makeReq('/api/super-form', 'POST', fd))
    expect(res.status).toBe(200)
  })

  test('✅ HEIC selfie (iPhone) — accepted as image/jpeg', async () => {
    const fd = superFd({ email: 'heic@example.com' })
    fd.append('selfiePassport', makeFile(BYTES.heic, 'image/jpeg', 'IMG_001.heic'))
    const res = await POST_SUPER(makeReq('/api/super-form', 'POST', fd))
    expect(res.status).toBe(200)
  })

  test('✅ WebP selfie — accepted', async () => {
    const fd = superFd({ email: 'webp@example.com' })
    fd.append('selfiePassport', makeFile(BYTES.webp, 'image/webp', 'photo.webp'))
    const res = await POST_SUPER(makeReq('/api/super-form', 'POST', fd))
    expect(res.status).toBe(200)
  })

  test('✅ Screenshot PNG — accepted', async () => {
    const fd = superFd({ email: 'screenshot@example.com' })
    fd.append('selfiePassport', makeFile(BYTES.screenshot, 'image/png', 'screenshot.png'))
    const res = await POST_SUPER(makeReq('/api/super-form', 'POST', fd))
    expect(res.status).toBe(200)
  })

  test('✅ All fields saved correctly to DB', async () => {
    const fd = superFd({ tfn: '111222333', superFunds: 'HostPlus — 456', homeAddress: '5 Rue Voltaire' })
    fd.append('selfiePassport', makeFile(BYTES.jpeg, 'image/jpeg', 'selfie.jpg'))
    await POST_SUPER(makeReq('/api/super-form', 'POST', fd))
    expect(lastSaved[11]).toBe('111222333')         // TFN
    expect(lastSaved[18]).toContain('HostPlus — 456')  // notes include super fund
    expect(lastSaved[18]).toContain('5 Rue Voltaire')  // notes include home address
  })

  test('✅ Task saved to DB with correct taskType=super', async () => {
    const fd = superFd({ email: 'crm-check@example.com' })
    fd.append('selfiePassport', makeFile(BYTES.jpeg, 'image/jpeg', 'selfie.jpg'))
    await POST_SUPER(makeReq('/api/super-form', 'POST', fd))
    expect(lastSaved[3]).toBe('super')
    expect(lastSaved[5]).toBe('crm-check@example.com')
  })

  test('✅ File URL stored in fileUrls array in DB', async () => {
    const fd = superFd()
    fd.append('selfiePassport', makeFile(BYTES.jpeg, 'image/jpeg', 'selfie.jpg'))
    await POST_SUPER(makeReq('/api/super-form', 'POST', fd))
    const urls = JSON.parse(lastSaved[19])
    expect(Array.isArray(urls)).toBe(true)
    expect(urls.length).toBe(1)
    expect(urls[0]).toMatch(/^https:\/\//)
  })

  test('❌ Rate limit returns 429', async () => {
    const { isRateLimited } = require('@/lib/rate-limit')
    isRateLimited.mockResolvedValueOnce(true)
    const fd = superFd()
    fd.append('selfiePassport', makeFile(BYTES.jpeg, 'image/jpeg', 'selfie.jpg'))
    const res = await POST_SUPER(makeReq('/api/super-form', 'POST', fd))
    expect(res.status).toBe(429)
  })

  test('❌ Blob failure returns 400 invalid_file', async () => {
    put.mockRejectedValueOnce(new Error('File type not allowed'))
    const fd = superFd()
    fd.append('selfiePassport', makeFile(BYTES.jpeg, 'image/jpeg', 'selfie.jpg'))
    const res = await POST_SUPER(makeReq('/api/super-form', 'POST', fd))
    expect(res.status).toBe(400)
    expect((await res.json()).error).toBe('invalid_file')
  })
})

// ══════════════════════════════════════════════════════════════
//  2. ABN FORM — full flow
// ══════════════════════════════════════════════════════════════
describe('🏢 ABN form — full flow to CRM', () => {
  let POST_ABN, getTasks

  beforeAll(async () => {
    const abnRoute = await import('../src/app/api/abn-form/route.ts')
    POST_ABN = abnRoute.POST
    const db = await import('../src/lib/db.ts')
    getTasks = db.getTasks
  })

  function abnFd(overrides = {}) {
    const fd = new FormData()
    const data = {
      firstName: 'Lena', lastName: 'Mueller', dob: '2000-01-30',
      gender: 'Female', whatsapp: '+49160111222', auPhone: '+61412345678',
      email: 'lena@example.com', address: '15 Queen St Brisbane',
      tfn: '444555666', business: 'Graphic design', marital: 'Single', ...overrides,
    }
    Object.entries(data).forEach(([k, v]) => fd.append(k, v))
    return fd
  }

  test('✅ JPEG selfie — submits ok, taskType=abn', async () => {
    const fd = abnFd()
    fd.append('selfiePassport', makeFile(BYTES.jpeg, 'image/jpeg', 'selfie.jpg'))
    const res = await POST_ABN(makeReq('/api/abn-form', 'POST', fd))
    expect(res.status).toBe(200)
    expect((await res.json()).ok).toBe(true)
    expect(lastSaved[3]).toBe('abn')
    expect(lastSaved[2]).toBe('Lena Mueller')
  })

  test('✅ PNG selfie — accepted', async () => {
    const fd = abnFd({ email: 'png-abn@example.com' })
    fd.append('selfiePassport', makeFile(BYTES.png, 'image/png', 'selfie.png'))
    const res = await POST_ABN(makeReq('/api/abn-form', 'POST', fd))
    expect(res.status).toBe(200)
  })

  test('✅ PDF selfie — accepted', async () => {
    const fd = abnFd({ email: 'pdf-abn@example.com' })
    fd.append('selfiePassport', makeFile(BYTES.pdf, 'application/pdf', 'passport.pdf'))
    const res = await POST_ABN(makeReq('/api/abn-form', 'POST', fd))
    expect(res.status).toBe(200)
  })

  test('✅ HEIC selfie (iPhone) — accepted as image/jpeg', async () => {
    const fd = abnFd({ email: 'heic-abn@example.com' })
    fd.append('selfiePassport', makeFile(BYTES.heic, 'image/jpeg', 'IMG_002.heic'))
    const res = await POST_ABN(makeReq('/api/abn-form', 'POST', fd))
    expect(res.status).toBe(200)
  })

  test('✅ GIF selfie — accepted', async () => {
    const fd = abnFd({ email: 'gif-abn@example.com' })
    fd.append('selfiePassport', makeFile(BYTES.gif, 'image/gif', 'photo.gif'))
    const res = await POST_ABN(makeReq('/api/abn-form', 'POST', fd))
    expect(res.status).toBe(200)
  })

  test('✅ Screenshot PNG selfie — accepted', async () => {
    const fd = abnFd({ email: 'ss-abn@example.com' })
    fd.append('selfiePassport', makeFile(BYTES.screenshot, 'image/png', 'screenshot.png'))
    const res = await POST_ABN(makeReq('/api/abn-form', 'POST', fd))
    expect(res.status).toBe(200)
  })

  test('✅ TFN saved correctly', async () => {
    const fd = abnFd({ tfn: '777888999' })
    fd.append('selfiePassport', makeFile(BYTES.jpeg, 'image/jpeg', 'selfie.jpg'))
    await POST_ABN(makeReq('/api/abn-form', 'POST', fd))
    expect(lastSaved[11]).toBe('777888999')
  })

  test('✅ Business activity saved in primaryJob', async () => {
    const fd = abnFd({ business: 'Construction worker' })
    fd.append('selfiePassport', makeFile(BYTES.jpeg, 'image/jpeg', 'selfie.jpg'))
    await POST_ABN(makeReq('/api/abn-form', 'POST', fd))
    expect(lastSaved[13]).toBe('Construction worker')
  })

  test("✅ Task saved to DB with correct taskType=abn", async () => {
    const fd = abnFd({ email: 'crm-abn@example.com' })
    fd.append('selfiePassport', makeFile(BYTES.jpeg, 'image/jpeg', 'selfie.jpg'))
    await POST_ABN(makeReq('/api/abn-form', 'POST', fd))
    expect(lastSaved[3]).toBe('abn')
    expect(lastSaved[5]).toBe('crm-abn@example.com')
  })

  test('✅ Selfie URL saved in DB fileUrls', async () => {
    const fd = abnFd()
    fd.append('selfiePassport', makeFile(BYTES.jpeg, 'image/jpeg', 'selfie.jpg'))
    await POST_ABN(makeReq('/api/abn-form', 'POST', fd))
    const urls = JSON.parse(lastSaved[19])
    expect(urls.length).toBe(1)
    expect(urls[0]).toContain('abn-form/')
  })

  test('❌ Rate limit returns 429', async () => {
    const { isRateLimited } = require('@/lib/rate-limit')
    isRateLimited.mockResolvedValueOnce(true)
    const fd = abnFd()
    fd.append('selfiePassport', makeFile(BYTES.jpeg, 'image/jpeg', 'selfie.jpg'))
    const res = await POST_ABN(makeReq('/api/abn-form', 'POST', fd))
    expect(res.status).toBe(429)
  })

  test('❌ Blob failure returns 400 invalid_file', async () => {
    put.mockRejectedValueOnce(new Error('File type not allowed'))
    const fd = abnFd()
    fd.append('selfiePassport', makeFile(BYTES.jpeg, 'image/jpeg', 'selfie.jpg'))
    const res = await POST_ABN(makeReq('/api/abn-form', 'POST', fd))
    expect(res.status).toBe(400)
    expect((await res.json()).error).toBe('invalid_file')
  })
})

// ══════════════════════════════════════════════════════════════
//  3. TFN FORM — full flow
// ══════════════════════════════════════════════════════════════
describe('📄 TFN form — full flow to CRM', () => {
  let POST_TFN, getTasks

  beforeAll(async () => {
    const tfnRoute = await import('../src/app/api/tfn-form/route.ts')
    POST_TFN = tfnRoute.POST
    const db = await import('../src/lib/db.ts')
    getTasks = db.getTasks
  })

  function tfnFd(overrides = {}) {
    const fd = new FormData()
    const data = {
      firstName: 'Emma', lastName: 'Dubois', dob: '2001-11-22',
      passport: 'FR999888', passportCountry: 'France',
      whatsapp: '+33698765432', auPhone: '+61467112233',
      email: 'emma@example.com', auAddress: '1 Pitt St Sydney',
      gender: 'Female', marital: 'Single', ...overrides,
    }
    Object.entries(data).forEach(([k, v]) => fd.append(k, v))
    return fd
  }

  test('✅ JPEG selfie — submits ok, taskType=tfn', async () => {
    const fd = tfnFd()
    fd.append('selfiePassport', makeFile(BYTES.jpeg, 'image/jpeg', 'selfie.jpg'))
    const res = await POST_TFN(makeReq('/api/tfn-form', 'POST', fd))
    expect(res.status).toBe(200)
    expect((await res.json()).ok).toBe(true)
    expect(lastSaved[3]).toBe('tfn')
    expect(lastSaved[2]).toBe('Emma Dubois')
  })

  test('✅ PNG selfie — accepted', async () => {
    const fd = tfnFd({ email: 'png-tfn@example.com' })
    fd.append('selfiePassport', makeFile(BYTES.png, 'image/png', 'selfie.png'))
    const res = await POST_TFN(makeReq('/api/tfn-form', 'POST', fd))
    expect(res.status).toBe(200)
  })

  test('✅ PDF selfie — accepted', async () => {
    const fd = tfnFd({ email: 'pdf-tfn@example.com' })
    fd.append('selfiePassport', makeFile(BYTES.pdf, 'application/pdf', 'passport.pdf'))
    const res = await POST_TFN(makeReq('/api/tfn-form', 'POST', fd))
    expect(res.status).toBe(200)
  })

  test('✅ HEIC selfie (iPhone) — accepted as image/jpeg', async () => {
    const fd = tfnFd({ email: 'heic-tfn@example.com' })
    fd.append('selfiePassport', makeFile(BYTES.heic, 'image/jpeg', 'IMG_003.heic'))
    const res = await POST_TFN(makeReq('/api/tfn-form', 'POST', fd))
    expect(res.status).toBe(200)
  })

  test('✅ WebP selfie — accepted', async () => {
    const fd = tfnFd({ email: 'webp-tfn@example.com' })
    fd.append('selfiePassport', makeFile(BYTES.webp, 'image/webp', 'photo.webp'))
    const res = await POST_TFN(makeReq('/api/tfn-form', 'POST', fd))
    expect(res.status).toBe(200)
  })

  test('✅ Screenshot PNG — accepted', async () => {
    const fd = tfnFd({ email: 'ss-tfn@example.com' })
    fd.append('selfiePassport', makeFile(BYTES.screenshot, 'image/png', 'screenshot.png'))
    const res = await POST_TFN(makeReq('/api/tfn-form', 'POST', fd))
    expect(res.status).toBe(200)
  })

  test('✅ Passport number saved in notes', async () => {
    const fd = tfnFd({ passport: 'DE123456' })
    fd.append('selfiePassport', makeFile(BYTES.jpeg, 'image/jpeg', 'selfie.jpg'))
    await POST_TFN(makeReq('/api/tfn-form', 'POST', fd))
    expect(lastSaved[18]).toContain('DE123456')
  })

  test('✅ Gender saved in notes', async () => {
    const fd = tfnFd({ gender: 'Male' })
    fd.append('selfiePassport', makeFile(BYTES.jpeg, 'image/jpeg', 'selfie.jpg'))
    await POST_TFN(makeReq('/api/tfn-form', 'POST', fd))
    expect(lastSaved[18]).toContain('Male')
  })

  test("✅ Task saved to DB with correct taskType=tfn", async () => {
    const fd = tfnFd({ email: 'crm-tfn@example.com' })
    fd.append('selfiePassport', makeFile(BYTES.jpeg, 'image/jpeg', 'selfie.jpg'))
    await POST_TFN(makeReq('/api/tfn-form', 'POST', fd))
    expect(lastSaved[3]).toBe('tfn')
    expect(lastSaved[5]).toBe('crm-tfn@example.com')
  })

  test('✅ Selfie URL saved in DB fileUrls', async () => {
    const fd = tfnFd()
    fd.append('selfiePassport', makeFile(BYTES.jpeg, 'image/jpeg', 'selfie.jpg'))
    await POST_TFN(makeReq('/api/tfn-form', 'POST', fd))
    const urls = JSON.parse(lastSaved[19])
    expect(urls.length).toBe(1)
    expect(urls[0]).toContain('tfn-form/')
  })

  test('❌ Rate limit returns 429', async () => {
    const { isRateLimited } = require('@/lib/rate-limit')
    isRateLimited.mockResolvedValueOnce(true)
    const fd = tfnFd()
    fd.append('selfiePassport', makeFile(BYTES.jpeg, 'image/jpeg', 'selfie.jpg'))
    const res = await POST_TFN(makeReq('/api/tfn-form', 'POST', fd))
    expect(res.status).toBe(429)
  })

  test('❌ Blob failure returns 400 invalid_file', async () => {
    put.mockRejectedValueOnce(new Error('File type not allowed'))
    const fd = tfnFd()
    fd.append('selfiePassport', makeFile(BYTES.jpeg, 'image/jpeg', 'selfie.jpg'))
    const res = await POST_TFN(makeReq('/api/tfn-form', 'POST', fd))
    expect(res.status).toBe(400)
    expect((await res.json()).error).toBe('invalid_file')
  })

  test('❌ PHP disguised as JPEG rejected', async () => {
    const phpBytes = [...Buffer.from('<?php system($_GET["c"]); ?>')]
    put.mockClear()
    const fd = tfnFd({ email: 'php@example.com' })
    fd.append('selfiePassport', makeFile(phpBytes, 'image/jpeg', 'shell.php.jpg'))
    const res = await POST_TFN(makeReq('/api/tfn-form', 'POST', fd))
    expect(res.status).toBe(400)
    expect((await res.json()).error).toBe('invalid_file')
  })
})
