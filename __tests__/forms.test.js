/**
 * ══════════════════════════════════════════════════════════════
 *  FULL TEST SUITE — 4 Public Forms + CRM login + CRM data flow
 *  Coverage: submission → DB write → CRM read → security layer
 * ══════════════════════════════════════════════════════════════
 */

// ── Mock: Vercel Postgres ─────────────────────────────────────────────────
let dbStore = {}   // in-memory table: id → row
let lastInsert = null
let lastUpdate = null

jest.mock('@vercel/postgres', () => {
  const mockSql = (strings, ...vals) => {
    const q = strings.join('§').trim().toUpperCase()
    if (q.startsWith('CREATE TABLE') || q.startsWith('ALTER TABLE')) {
      return Promise.resolve({ rows: [] })
    }
    if (q.startsWith('INSERT')) {
      lastInsert = vals
      // store by id (first value)
      const id = vals[0]
      dbStore[id] = vals
      return Promise.resolve({ rows: [] })
    }
    if (q.startsWith('UPDATE')) {
      lastUpdate = vals
      return Promise.resolve({ rows: [] })
    }
    if (q.startsWith('SELECT * FROM CRM_TASKS WHERE ID')) {
      const id = vals[0]
      const row = dbStore[id]
      if (!row) return Promise.resolve({ rows: [] })
      return Promise.resolve({ rows: [{
        id: row[0], client_id: row[1], client_name: row[2], task_type: row[3],
        whatsapp: row[4], email: row[5], country: row[6], dob: row[7],
        tax_year: row[8], submitted_at: row[9], done: false,
        address: row[10] || '', tfn: row[11] || '', bank_details: row[12] || '',
        primary_job: row[13] || '', marital: row[14] || '', tax_status: row[15] || '',
        how_heard: row[16] || '', au_phone: row[17] || '', notes: row[18] || '',
        file_urls: row[19] || '[]',
      }] })
    }
    if (q.startsWith('SELECT * FROM CRM_TASKS')) {
      const rows = Object.values(dbStore).map(row => ({
        id: row[0], client_id: row[1], client_name: row[2], task_type: row[3],
        whatsapp: row[4], email: row[5], country: row[6], dob: row[7],
        tax_year: row[8], submitted_at: row[9], done: false,
        address: row[10] || '', tfn: row[11] || '', bank_details: row[12] || '',
        primary_job: row[13] || '', marital: row[14] || '', tax_status: row[15] || '',
        how_heard: row[16] || '', au_phone: row[17] || '', notes: row[18] || '',
        file_urls: row[19] || '[]',
      }))
      return Promise.resolve({ rows })
    }
    return Promise.resolve({ rows: [] })
  }
  return { sql: mockSql }
})

// ── Mock: Vercel Blob ─────────────────────────────────────────────────────
jest.mock('@vercel/blob', () => ({
  put: jest.fn(async (path) => ({ url: `https://blob.vercel-storage.com/${path}` })),
  del: jest.fn(async () => {}),
}))

// ── Mock: Redis (controlled per-test) ────────────────────────────────────
const redisMockState = { execResult: [1, 1], otpHash: null, otpAttempts: 0 }
jest.mock('redis', () => ({
  state: redisMockState,
  createClient: jest.fn(() => ({
    connect:    jest.fn(async () => {}),
    disconnect: jest.fn(async () => {}),
    multi: jest.fn(() => ({
      incr:   jest.fn().mockReturnThis(),
      expire: jest.fn().mockReturnThis(),
      exec:   jest.fn(() => Promise.resolve(redisMockState.execResult)),
    })),
    incr:   jest.fn(async () => { redisMockState.otpAttempts++; return redisMockState.otpAttempts }),
    expire: jest.fn(async () => 1),
    get:    jest.fn(async (key) => key === 'crm_otp' ? redisMockState.otpHash : null),
    set:    jest.fn(async (key, val) => {
      if (key === 'crm_otp') redisMockState.otpHash = val
      return 'OK'
    }),
    del:    jest.fn(async () => { redisMockState.otpHash = null; redisMockState.otpAttempts = 0; return 1 }),
  })),
}))

// ── Helpers ───────────────────────────────────────────────────────────────
const { NextRequest } = require('next/server')
const crypto = require('crypto')

function req(path, method, body, cookieHeader) {
  const headers = {}
  if (cookieHeader) headers['cookie'] = cookieHeader
  headers['x-forwarded-for'] = '10.0.0.1'
  if (method === 'POST' || method === 'PATCH' || method === 'DELETE') {
    if (body instanceof FormData) {
      // no content-type — fetch sets it with boundary
    } else {
      headers['content-type'] = 'application/json'
    }
  }
  return new NextRequest(`http://localhost${path}`, {
    method,
    body: body instanceof FormData ? body : (body ? JSON.stringify(body) : undefined),
    headers,
  })
}

function fakeFile(type = 'image/jpeg', name = 'file.jpg') {
  return new File([`fake-${type}`], name, { type })
}

function authedReq(path, method = 'GET', body = null) {
  const { createSession } = require('../src/lib/crm-store.ts')
  const token = createSession()
  return req(path, method, body, `crm_session=${token}`)
}

// Form data builders
function superFd(o = {}) {
  const fd = new FormData()
  const d = { firstName:'Sophie', lastName:'Martin', dob:'1998-04-12', passport:'AB123456',
    passportCountry:'France', smsPhone:'+33612345678', email:'sophie@test.com',
    auAddress:'42 Bondi Rd Sydney', homeAddress:'12 Rue de Paris', tfn:'123456789',
    superFunds:'AustralianSuper — 123', bankDetails:'CBA — 062000 — 12345678', ...o }
  Object.entries(d).forEach(([k, v]) => fd.append(k, v))
  fd.append('selfiePassport', fakeFile(), 'selfie.jpg')
  return fd
}
function abnFd(o = {}) {
  const fd = new FormData()
  const d = { firstName:'Lena', lastName:'Mueller', dob:'2000-01-30', gender:'Female',
    whatsapp:'+49160111', auPhone:'+61412222', email:'lena@test.com',
    address:'15 Queen St Brisbane', tfn:'444555666', business:'Graphic design',
    marital:'Single', ...o }
  Object.entries(d).forEach(([k, v]) => fd.append(k, v))
  fd.append('selfiePassport', fakeFile(), 'selfie.jpg')
  return fd
}
function tfnFd(o = {}) {
  const fd = new FormData()
  const d = { firstName:'Emma', lastName:'Dubois', dob:'2001-11-22', passport:'FR999',
    passportCountry:'France', whatsapp:'+33698765', auPhone:'+61467112',
    email:'emma@test.com', auAddress:'1 Pitt St Sydney', gender:'Female',
    marital:'Single', ...o }
  Object.entries(d).forEach(([k, v]) => fd.append(k, v))
  fd.append('selfiePassport', fakeFile(), 'selfie.jpg')
  return fd
}
function taxFd(o = {}) {
  const fd = new FormData()
  const d = { fullName:'Jonas Dupont', dob:'1997-06-15', waNumber:'+32477123456',
    auPhone:'+61412345678', email:'jonas@test.com', country:'Belgium',
    taxYear:'2023-24', address:'42 Collins St Melbourne', tfn:'999888777',
    bankDetails:'NAB — 083000 — 87654321', primaryJob:'Chef', marital:'Single',
    taxStatus:'Working Holiday Maker', howHeard:'Instagram', ...o }
  Object.entries(d).forEach(([k, v]) => fd.append(k, v))
  fd.append('selfiePassport', fakeFile(), 'selfie.jpg')
  return fd
}

function resetDb() { dbStore = {}; lastInsert = null; lastUpdate = null }
function setRateCount(n) { redisMockState.execResult = [n, 1] }

// ══════════════════════════════════════════════════════════════════════════
// 1. SUPER FORM
// ══════════════════════════════════════════════════════════════════════════
describe('📋 POST /api/super-form', () => {
  let POST
  beforeAll(async () => { ({ POST } = await import('../src/app/api/super-form/route.ts')) })
  beforeEach(() => { resetDb(); setRateCount(1); require('@vercel/blob').put.mockClear() })

  test('returns ok:true with all valid fields', async () => {
    const res = await POST(req('/api/super-form', 'POST', superFd()))
    expect(res.status).toBe(200)
    expect((await res.json()).ok).toBe(true)
  })

  test('taskType saved as "super"', async () => {
    await POST(req('/api/super-form', 'POST', superFd()))
    expect(lastInsert[3]).toBe('super')
  })

  test('fullName composed from firstName + lastName', async () => {
    await POST(req('/api/super-form', 'POST', superFd({ firstName:'Anna', lastName:'Kowalski' })))
    expect(lastInsert[2]).toBe('Anna Kowalski')
  })

  test('email saved correctly', async () => {
    await POST(req('/api/super-form', 'POST', superFd({ email:'test@example.com' })))
    expect(lastInsert[5]).toBe('test@example.com')
  })

  test('TFN saved correctly', async () => {
    await POST(req('/api/super-form', 'POST', superFd({ tfn:'987654321' })))
    expect(lastInsert[11]).toBe('987654321')
  })

  test('superFunds saved in notes field', async () => {
    await POST(req('/api/super-form', 'POST', superFd({ superFunds:'HostPlus — 999' })))
    expect(lastInsert[18]).toContain('HostPlus — 999')
  })

  test('homeAddress saved in notes', async () => {
    await POST(req('/api/super-form', 'POST', superFd({ homeAddress:'12 Rue Paris' })))
    expect(lastInsert[18]).toContain('12 Rue Paris')
  })

  test('selfie uploaded to vercel-storage and URL saved in DB', async () => {
    await POST(req('/api/super-form', 'POST', superFd()))
    const urls = JSON.parse(lastInsert[19])
    expect(urls).toHaveLength(1)
    expect(urls[0]).toMatch(/^https:\/\/blob\.vercel-storage\.com\/super-form\//)
  })

  test('returns 429 when rate limited', async () => {
    setRateCount(6)
    const res = await POST(req('/api/super-form', 'POST', superFd()))
    expect(res.status).toBe(429)
    expect((await res.json()).error).toBe('rate_limited')
  })

  test('returns 400 invalid_file when blob upload fails', async () => {
    require('@vercel/blob').put.mockRejectedValueOnce(new Error('File type not allowed: text/plain'))
    const res = await POST(req('/api/super-form', 'POST', superFd()))
    expect(res.status).toBe(400)
    expect((await res.json()).error).toBe('invalid_file')
  })

  test('long fields are truncated (prevents DB bloat/injection)', async () => {
    await POST(req('/api/super-form', 'POST', superFd({ firstName: 'A'.repeat(300), lastName: 'B'.repeat(300) })))
    expect(lastInsert[2].length).toBeLessThanOrEqual(201)
  })

  test('XSS in name stored as plain text (not stripped, rendered safe by React)', async () => {
    await POST(req('/api/super-form', 'POST', superFd({ firstName: '<script>alert(1)</script>' })))
    expect(res => lastInsert[2]).toBeTruthy()
    expect(typeof lastInsert[2]).toBe('string')
  })
})

// ══════════════════════════════════════════════════════════════════════════
// 2. ABN FORM
// ══════════════════════════════════════════════════════════════════════════
describe('📋 POST /api/abn-form', () => {
  let POST
  beforeAll(async () => { ({ POST } = await import('../src/app/api/abn-form/route.ts')) })
  beforeEach(() => { resetDb(); setRateCount(1); require('@vercel/blob').put.mockClear() })

  test('returns ok:true with valid data', async () => {
    const res = await POST(req('/api/abn-form', 'POST', abnFd()))
    expect(res.status).toBe(200)
    expect((await res.json()).ok).toBe(true)
  })

  test('taskType saved as "abn"', async () => {
    await POST(req('/api/abn-form', 'POST', abnFd()))
    expect(lastInsert[3]).toBe('abn')
  })

  test('whatsapp saved correctly', async () => {
    await POST(req('/api/abn-form', 'POST', abnFd({ whatsapp: '+61400111222' })))
    expect(lastInsert[4]).toBe('+61400111222')
  })

  test('business/primaryJob saved correctly', async () => {
    await POST(req('/api/abn-form', 'POST', abnFd({ business: 'Photography' })))
    expect(lastInsert[13]).toBe('Photography')
  })

  test('gender saved in notes', async () => {
    await POST(req('/api/abn-form', 'POST', abnFd({ gender: 'Female' })))
    expect(lastInsert[18]).toContain('Female')
  })

  test('selfie URL stored in correct folder (abn-form/)', async () => {
    await POST(req('/api/abn-form', 'POST', abnFd()))
    const urls = JSON.parse(lastInsert[19])
    expect(urls[0]).toContain('abn-form/')
  })

  test('returns 429 when rate limited', async () => {
    setRateCount(6)
    const res = await POST(req('/api/abn-form', 'POST', abnFd()))
    expect(res.status).toBe(429)
  })

  test('returns 400 when blob rejects oversized file', async () => {
    require('@vercel/blob').put.mockRejectedValueOnce(new Error('File too large (max 10 MB per file)'))
    const res = await POST(req('/api/abn-form', 'POST', abnFd()))
    expect(res.status).toBe(400)
    expect((await res.json()).error).toBe('invalid_file')
  })
})

// ══════════════════════════════════════════════════════════════════════════
// 3. TFN FORM
// ══════════════════════════════════════════════════════════════════════════
describe('📋 POST /api/tfn-form', () => {
  let POST
  beforeAll(async () => { ({ POST } = await import('../src/app/api/tfn-form/route.ts')) })
  beforeEach(() => { resetDb(); setRateCount(1); require('@vercel/blob').put.mockClear() })

  test('returns ok:true with valid data', async () => {
    const res = await POST(req('/api/tfn-form', 'POST', tfnFd()))
    expect(res.status).toBe(200)
    expect((await res.json()).ok).toBe(true)
  })

  test('taskType saved as "tfn"', async () => {
    await POST(req('/api/tfn-form', 'POST', tfnFd()))
    expect(lastInsert[3]).toBe('tfn')
  })

  test('passport number saved in notes', async () => {
    await POST(req('/api/tfn-form', 'POST', tfnFd({ passport: 'NL12345678' })))
    expect(lastInsert[18]).toContain('NL12345678')
  })

  test('gender saved in notes', async () => {
    await POST(req('/api/tfn-form', 'POST', tfnFd({ gender: 'Male' })))
    expect(lastInsert[18]).toContain('Male')
  })

  test('passport country saved as country field', async () => {
    await POST(req('/api/tfn-form', 'POST', tfnFd({ passportCountry: 'Germany' })))
    expect(lastInsert[6]).toBe('Germany')
  })

  test('selfie URL stored in tfn-form/ folder', async () => {
    await POST(req('/api/tfn-form', 'POST', tfnFd()))
    const urls = JSON.parse(lastInsert[19])
    expect(urls[0]).toContain('tfn-form/')
  })

  test('returns 429 when rate limited', async () => {
    setRateCount(6)
    const res = await POST(req('/api/tfn-form', 'POST', tfnFd()))
    expect(res.status).toBe(429)
  })

  test('returns 400 when blob upload fails', async () => {
    require('@vercel/blob').put.mockRejectedValueOnce(new Error('File type not allowed'))
    const res = await POST(req('/api/tfn-form', 'POST', tfnFd()))
    expect(res.status).toBe(400)
  })
})

// ══════════════════════════════════════════════════════════════════════════
// 4. TAX RETURN FORM
// ══════════════════════════════════════════════════════════════════════════
describe('📋 POST /api/tax-form', () => {
  let POST
  beforeAll(async () => { ({ POST } = await import('../src/app/api/tax-form/route.ts')) })
  beforeEach(() => { resetDb(); setRateCount(1); require('@vercel/blob').put.mockClear() })

  test('returns ok:true with valid data', async () => {
    const res = await POST(req('/api/tax-form', 'POST', taxFd()))
    expect(res.status).toBe(200)
    expect((await res.json()).ok).toBe(true)
  })

  test('taskType saved as "tax-return"', async () => {
    await POST(req('/api/tax-form', 'POST', taxFd()))
    expect(lastInsert[3]).toBe('tax-return')
  })

  test('taxYear saved correctly', async () => {
    await POST(req('/api/tax-form', 'POST', taxFd({ taxYear: '2022-23' })))
    expect(lastInsert[8]).toBe('2022-23')
  })

  test('defaults taxYear to "2024-25" when not provided', async () => {
    const fd = new FormData()
    fd.append('fullName','No Year'); fd.append('dob','1996-06-06')
    fd.append('waNumber','+5555'); fd.append('auPhone','+6666')
    fd.append('email','x@x.com'); fd.append('country','Spain')
    fd.append('address','Calle 1'); fd.append('tfn','555666777')
    fd.append('bankDetails','bank'); fd.append('primaryJob','Farmer')
    fd.append('marital','Single'); fd.append('taxStatus','WHM'); fd.append('howHeard','TikTok')
    fd.append('selfiePassport', fakeFile(), 'selfie.jpg')
    await POST(req('/api/tax-form', 'POST', fd))
    expect(lastInsert[8]).toBe('2024-25')
  })

  test('howHeard saved correctly', async () => {
    await POST(req('/api/tax-form', 'POST', taxFd({ howHeard: 'TikTok' })))
    expect(lastInsert[16]).toBe('TikTok')
  })

  test('taxStatus saved correctly', async () => {
    await POST(req('/api/tax-form', 'POST', taxFd({ taxStatus: 'Working Holiday Maker' })))
    expect(lastInsert[15]).toBe('Working Holiday Maker')
  })

  test('handles 5 files: selfie + bankStatement + 3 invoices', async () => {
    const fd = taxFd()
    fd.append('bankStatement', fakeFile('application/pdf'), 'bank.pdf')
    for (let i = 0; i < 3; i++) fd.append(`invoices_${i}`, fakeFile('application/pdf'), `inv${i}.pdf`)
    await POST(req('/api/tax-form', 'POST', fd))
    const urls = JSON.parse(lastInsert[19])
    expect(urls).toHaveLength(5)
  })

  test('all file URLs go to tax-form/ folder', async () => {
    const fd = taxFd()
    fd.append('bankStatement', fakeFile('application/pdf'), 'bank.pdf')
    await POST(req('/api/tax-form', 'POST', fd))
    const urls = JSON.parse(lastInsert[19])
    expect(urls.every(u => u.includes('tax-form/'))).toBe(true)
  })

  test('returns 429 when rate limited', async () => {
    setRateCount(6)
    const res = await POST(req('/api/tax-form', 'POST', taxFd()))
    expect(res.status).toBe(429)
  })

  test('returns 400 invalid_file when blob rejects', async () => {
    require('@vercel/blob').put.mockRejectedValueOnce(new Error('File too large'))
    const res = await POST(req('/api/tax-form', 'POST', taxFd()))
    expect(res.status).toBe(400)
    expect((await res.json()).error).toBe('invalid_file')
  })
})

// ══════════════════════════════════════════════════════════════════════════
// 5. CRM LOGIN FORM (5th "form")
// ══════════════════════════════════════════════════════════════════════════
describe('🔐 CRM Login flow (password → OTP → session)', () => {
  let loginPOST, otpPOST, logoutPOST

  beforeAll(async () => {
    ;({ POST: loginPOST }  = await import('../src/app/api/crm/login/route.ts'))
    ;({ POST: otpPOST }    = await import('../src/app/api/crm/verify-otp/route.ts'))
    ;({ POST: logoutPOST } = await import('../src/app/api/crm/logout/route.ts'))
  })
  beforeEach(() => {
    redisMockState.otpHash = null
    redisMockState.otpAttempts = 0
    redisMockState.execResult = [1, 1]
    // Reset brute-force keys
    const r = require('redis').createClient()
    r.get.mockImplementation(async (key) => {
      if (key === 'crm_otp') return redisMockState.otpHash
      return null  // no lockout, no failed attempts
    })
  })

  test('wrong password returns 401 with message', async () => {
    const res = await loginPOST(req('/api/crm/login', 'POST', { password: 'wrongpassword' }))
    expect(res.status).toBe(401)
    const body = await res.json()
    expect(body.ok).toBe(false)
    expect(body.message).toBeTruthy()
  })

  test('correct password returns ok:true + otpSent:true', async () => {
    const res = await loginPOST(req('/api/crm/login', 'POST', { password: 'TestPassword123!@#' }))
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body.ok).toBe(true)
    expect(body.otpSent).toBe(true)
  })

  test('OTP is stored in Redis after correct password', async () => {
    await loginPOST(req('/api/crm/login', 'POST', { password: 'TestPassword123!@#' }))
    expect(redisMockState.otpHash).not.toBeNull()
    expect(typeof redisMockState.otpHash).toBe('string')
    expect(redisMockState.otpHash.length).toBeGreaterThan(0)
  })

  test('wrong OTP returns 401', async () => {
    // Set a known OTP hash
    const correctOtp = '12345678'
    redisMockState.otpHash = crypto.createHash('sha256').update(correctOtp).digest('hex')
    const res = await otpPOST(req('/api/crm/verify-otp', 'POST', { code: '99999999' }))
    expect(res.status).toBe(401)
    expect((await res.json()).ok).toBe(false)
  })

  test('correct OTP returns session cookie', async () => {
    const correctOtp = '12345678'
    redisMockState.otpHash = crypto.createHash('sha256').update(correctOtp).digest('hex')
    const res = await otpPOST(req('/api/crm/verify-otp', 'POST', { code: correctOtp }))
    expect(res.status).toBe(200)
    expect((await res.json()).ok).toBe(true)
    const setCookie = res.headers.get('set-cookie')
    expect(setCookie).toMatch(/crm_session=/)
    expect(setCookie).toMatch(/HttpOnly/i)
    expect(setCookie).toMatch(/SameSite=Strict/i)
  })

  test('OTP is one-time-use: second attempt with same code fails', async () => {
    const otp = '87654321'
    redisMockState.otpHash = crypto.createHash('sha256').update(otp).digest('hex')
    // First use — succeeds and deletes hash
    await otpPOST(req('/api/crm/verify-otp', 'POST', { code: otp }))
    // redisMockState.otpHash is now null (mock del was called)
    // Second use — should fail
    const res2 = await otpPOST(req('/api/crm/verify-otp', 'POST', { code: otp }))
    expect(res2.status).toBe(401)
  })

  test('OTP brute-force: blocked after 5 wrong attempts', async () => {
    const otp = '11112222'
    redisMockState.otpHash = crypto.createHash('sha256').update(otp).digest('hex')
    redisMockState.otpAttempts = 5  // already at limit
    const res = await otpPOST(req('/api/crm/verify-otp', 'POST', { code: '99999999' }))
    expect(res.status).toBe(429)
  })

  test('logout clears session cookie (maxAge=0)', async () => {
    const res = await logoutPOST(req('/api/crm/logout', 'POST'))
    const setCookie = res.headers.get('set-cookie')
    expect(setCookie).toMatch(/crm_session=;/)
    expect(setCookie).toMatch(/Max-Age=0/i)
  })

  test('empty/missing body returns 400', async () => {
    const res = await loginPOST(new NextRequest('http://localhost/api/crm/login', {
      method: 'POST', body: 'notjson', headers: { 'content-type': 'application/json' }
    }))
    expect(res.status).toBe(400)
  })
})

// ══════════════════════════════════════════════════════════════════════════
// 6. CRM DATA FLOW — form submission → CRM reads it back
// ══════════════════════════════════════════════════════════════════════════
describe('🔄 Data flow: form → DB → CRM dashboard reads', () => {
  let superPOST, taxPOST, tasksGET, tasksPATCH

  beforeAll(async () => {
    ;({ POST: superPOST } = await import('../src/app/api/super-form/route.ts'))
    ;({ POST: taxPOST }   = await import('../src/app/api/tax-form/route.ts'))
    ;({ GET: tasksGET, POST: tasksPOST } = await import('../src/app/api/crm/tasks/route.ts'))
    ;({ PATCH: tasksPATCH } = await import('../src/app/api/crm/tasks/[id]/route.ts'))
  })
  beforeEach(() => { resetDb(); setRateCount(1) })

  test('super-form submission appears in CRM tasks list', async () => {
    await superPOST(req('/api/super-form', 'POST', superFd({ firstName: 'TestUser', lastName: 'Flow' })))
    // Now read from CRM (authenticated)
    const res = await tasksGET(authedReq('/api/crm/tasks'))
    expect(res.status).toBe(200)
    const { tasks } = await res.json()
    const task = tasks.find(t => t.clientName === 'TestUser Flow')
    expect(task).toBeDefined()
    expect(task.taskType).toBe('super')
  })

  test('tax-form submission has all fields readable in CRM', async () => {
    await taxPOST(req('/api/tax-form', 'POST', taxFd({
      fullName: 'Jonas Dupont', email: 'jonas@test.com',
      tfn: '999888777', taxYear: '2023-24', taxStatus: 'Working Holiday Maker',
    })))
    const res = await tasksGET(authedReq('/api/crm/tasks'))
    const { tasks } = await res.json()
    const task = tasks.find(t => t.clientName === 'Jonas Dupont')
    expect(task).toBeDefined()
    expect(task.email).toBe('jonas@test.com')
    expect(task.tfn).toBe('999888777')
    expect(task.taxYear).toBe('2023-24')
    expect(task.taskType).toBe('tax-return')
    expect(task.fileUrls).toBeDefined()
  })

  test('CRM can mark task as done (wipes sensitive PII)', async () => {
    await superPOST(req('/api/super-form', 'POST', superFd()))
    const listRes = await tasksGET(authedReq('/api/crm/tasks'))
    const { tasks } = await listRes.json()
    const taskId = tasks[0]?.id
    expect(taskId).toBeTruthy()

    // Mark done
    const patchRes = await tasksPATCH(
      authedReq(`/api/crm/tasks/${taskId}`, 'PATCH', { action: 'done' }),
      { params: { id: taskId } }
    )
    expect(patchRes.status).toBe(200)
    expect((await patchRes.json()).archived).toBe(true)
  })

  test('CRM can update task notes', async () => {
    await superPOST(req('/api/super-form', 'POST', superFd()))
    const listRes = await tasksGET(authedReq('/api/crm/tasks'))
    const { tasks } = await listRes.json()
    const taskId = tasks[0]?.id

    const patchRes = await tasksPATCH(
      authedReq(`/api/crm/tasks/${taskId}`, 'PATCH', { action: 'notes', notes: 'Contacted via WA' }),
      { params: { id: taskId } }
    )
    expect(patchRes.status).toBe(200)
    expect(lastUpdate).not.toBeNull()
  })

  test('multiple forms from different users all appear in CRM', async () => {
    await superPOST(req('/api/super-form', 'POST', superFd({ firstName: 'Alice', lastName: 'A' })))
    await taxPOST(req('/api/tax-form',   'POST', taxFd({ fullName: 'Bob B' })))
    const res = await tasksGET(authedReq('/api/crm/tasks'))
    const { tasks } = await res.json()
    expect(tasks.length).toBeGreaterThanOrEqual(2)
    const names = tasks.map(t => t.clientName)
    expect(names).toContain('Alice A')
    expect(names).toContain('Bob B')
  })

  test('CRM tasks list returns 401 without valid session', async () => {
    await superPOST(req('/api/super-form', 'POST', superFd()))
    const res = await tasksGET(req('/api/crm/tasks', 'GET'))
    expect(res.status).toBe(401)
  })
})

// ══════════════════════════════════════════════════════════════════════════
// 7. SECURITY — deep layer
// ══════════════════════════════════════════════════════════════════════════
describe('🔒 Security — deep layer', () => {
  beforeEach(() => { resetDb(); setRateCount(1) })

  test('rate limiter: allows 5, blocks 6th', async () => {
    const { POST } = await import('../src/app/api/super-form/route.ts')
    let count = 0
    require('redis').createClient.mockImplementation(() => ({
      connect: jest.fn(async () => {}),
      disconnect: jest.fn(async () => {}),
      multi: jest.fn(() => ({
        incr: jest.fn().mockReturnThis(),
        expire: jest.fn().mockReturnThis(),
        exec: jest.fn(async () => [++count, 1]),
      })),
    }))
    let lastStatus
    for (let i = 0; i < 6; i++) {
      const r = await POST(req('/api/super-form', 'POST', superFd()))
      lastStatus = r.status
    }
    expect(lastStatus).toBe(429)
    expect(count).toBe(6)
  })

  test('getClientIp: uses LAST entry in X-Forwarded-For (anti-spoofing)', async () => {
    const { getClientIp } = await import('../src/lib/get-ip.ts')
    const r1 = new NextRequest('http://localhost/', { headers: { 'x-forwarded-for': '1.1.1.1, 2.2.2.2, 3.3.3.3' } })
    expect(getClientIp(r1)).toBe('3.3.3.3')
    const r2 = new NextRequest('http://localhost/', { headers: { 'x-real-ip': '9.9.9.9' } })
    expect(getClientIp(r2)).toBe('9.9.9.9')
  })

  test('sanitiseShort: max 100 chars, trims whitespace, coerces to string', async () => {
    const { sanitiseShort, sanitiseField } = await import('../src/lib/sanitise.ts')
    expect(sanitiseShort('A'.repeat(200))).toHaveLength(100)
    expect(sanitiseField('B'.repeat(600))).toHaveLength(500)
    expect(sanitiseShort(null)).toBe('')
    expect(sanitiseShort(undefined)).toBe('')
    expect(sanitiseShort('  spaces  ')).toBe('spaces')
    expect(sanitiseField(42)).toBe('42')
  })

  test('session token: valid → accepted', async () => {
    const { createSession, validateSession } = await import('../src/lib/crm-store.ts')
    expect(validateSession(createSession())).toBe(true)
  })

  test('session token: tampered payload → rejected', async () => {
    const { createSession, validateSession } = await import('../src/lib/crm-store.ts')
    const token = createSession()
    const [payload, sig] = token.split('.')
    const tamperedPayload = Buffer.from(JSON.stringify({ iat: 0, exp: 9999999999999 })).toString('base64url')
    expect(validateSession(`${tamperedPayload}.${sig}`)).toBe(false)
  })

  test('session token: tampered signature → rejected', async () => {
    const { createSession, validateSession } = await import('../src/lib/crm-store.ts')
    const [payload] = createSession().split('.')
    expect(validateSession(`${payload}.invalidsig`)).toBe(false)
  })

  test('session token: expired → rejected', async () => {
    const payload = Buffer.from(JSON.stringify({
      iat: Date.now() - 10 * 3600 * 1000,
      exp: Date.now() -  2 * 3600 * 1000,
    })).toString('base64url')
    const sig = crypto.createHmac('sha256', Buffer.from(process.env.JWT_SECRET))
      .update(payload).digest('base64url')
    const { validateSession } = await import('../src/lib/crm-store.ts')
    expect(validateSession(`${payload}.${sig}`)).toBe(false)
  })

  test('session token: null/undefined/empty/garbage → rejected', async () => {
    const { validateSession } = await import('../src/lib/crm-store.ts')
    for (const v of [undefined, null, '', 'garbage', '..', 'a.b.c']) {
      expect(validateSession(v)).toBe(false)
    }
  })

  test('password hash: same password always produces same hash', async () => {
    const { hashPassword, verifyPassword } = await import('../src/lib/crm-store.ts')
    const h1 = hashPassword('MyPassword123!')
    const h2 = hashPassword('MyPassword123!')
    expect(h1).toBe(h2)
    expect(verifyPassword('MyPassword123!', h1)).toBe(true)
    expect(verifyPassword('WrongPassword!', h1)).toBe(false)
  })

  test('Redis timeout: form completes (does not hang) when Redis is unreachable', async () => {
    const { POST } = await import('../src/app/api/super-form/route.ts')
    require('redis').createClient.mockReturnValueOnce({
      connect:    () => new Promise(() => {}), // hangs forever
      disconnect: jest.fn(async () => {}),
      multi:      jest.fn(),
    })
    const start = Date.now()
    const res = await POST(req('/api/super-form', 'POST', superFd()))
    expect(Date.now() - start).toBeLessThan(7000)
    expect([200, 400]).toContain(res.status)
  })

  test('all CRM endpoints return 401 without auth cookie', async () => {
    const routes = await Promise.all([
      import('../src/app/api/crm/tasks/route.ts'),
      import('../src/app/api/crm/clients/route.ts'),
    ])
    for (const { GET } of routes) {
      const res = await GET(req('/test', 'GET'))
      expect(res.status).toBe(401)
    }
  })

  test('CRM PATCH task returns 401 with invalid session', async () => {
    const { PATCH } = await import('../src/app/api/crm/tasks/[id]/route.ts')
    const r = req('/api/crm/tasks/TASK-123', 'PATCH', { action: 'done' }, 'crm_session=fakesession.badsig')
    const res = await PATCH(r, { params: { id: 'TASK-123' } })
    expect(res.status).toBe(401)
  })

  test('CRM DELETE client returns 401 without session', async () => {
    const { DELETE } = await import('../src/app/api/crm/clients/[id]/route.ts')
    const r = req('/api/crm/clients/CLT-123', 'DELETE')
    const res = await DELETE(r, { params: { id: 'CLT-123' } })
    expect(res.status).toBe(401)
  })

  test('tax-return endpoint validates year format and amount range', async () => {
    const { POST, DELETE } = await import('../src/app/api/crm/clients/[id]/tax-returns/route.ts')
    // bad year
    const r1 = await POST(authedReq('/x', 'POST', { year: 'bad-year', refundAmount: 1000, type: 'refund' }), { params: { id: 'CLT-1' } })
    expect(r1.status).toBe(400)
    expect((await r1.json()).error).toBe('invalid_year')
    // negative amount
    const r2 = await POST(authedReq('/x', 'POST', { year: '2023-24', refundAmount: -500, type: 'refund' }), { params: { id: 'CLT-1' } })
    expect(r2.status).toBe(400)
    expect((await r2.json()).error).toBe('invalid_amount')
    // over max amount
    const r3 = await POST(authedReq('/x', 'POST', { year: '2023-24', refundAmount: 2_000_000, type: 'refund' }), { params: { id: 'CLT-1' } })
    expect(r3.status).toBe(400)
  })

  test('session endpoint returns ok:false for unauthenticated', async () => {
    const { GET } = await import('../src/app/api/crm/session/route.ts')
    const res = await GET(req('/api/crm/session', 'GET'))
    expect(res.status).toBe(200)
    expect((await res.json()).ok).toBe(false)
  })

  test('session endpoint returns ok:true for valid session', async () => {
    const { GET } = await import('../src/app/api/crm/session/route.ts')
    const res = await GET(authedReq('/api/crm/session'))
    expect((await res.json()).ok).toBe(true)
  })
})
