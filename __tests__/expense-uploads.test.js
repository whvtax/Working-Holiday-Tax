/**
 * ══════════════════════════════════════════════════════════════
 *  EXPENSE INVOICE UPLOAD TESTS
 *  Tests every file type a client might upload as an invoice/receipt
 *  Validates the server-side upload path used by tax-form route
 * ══════════════════════════════════════════════════════════════
 */

// ── Magic bytes for each file type ───────────────────────────
const MAGIC = {
  jpeg:    [0xFF, 0xD8, 0xFF, 0xE0, ...Array(100).fill(0x00)],
  png:     [0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, ...Array(100).fill(0x00)],
  pdf:     [0x25, 0x50, 0x44, 0x46, 0x2D, ...Array(100).fill(0x20)],
  webp:    [0x52, 0x49, 0x46, 0x46, 0x00, 0x00, 0x01, 0x00, 0x57, 0x45, 0x42, 0x50, ...Array(100).fill(0x00)],
  gif:     [0x47, 0x49, 0x46, 0x38, 0x39, 0x61, ...Array(100).fill(0x00)],
  // HEIC: ftyp box at offset 4
  heic:    [0x00, 0x00, 0x00, 0x20, 0x66, 0x74, 0x79, 0x70, 0x68, 0x65, 0x69, 0x63, ...Array(100).fill(0x00)],
  // Screenshot (PNG from Android/iOS)
  screenshot_png: [0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, ...Array(200).fill(0x00)],
}

function makeFile(bytes, mimeType, filename) {
  const buf = Buffer.from(bytes)
  return new File([buf], filename, { type: mimeType })
}

// ── Mock: @vercel/blob ────────────────────────────────────────
jest.mock('@vercel/blob', () => ({
  put: jest.fn(async (path, _data, opts) => ({
    url: `https://blob.vercel.com/${path}`,
    pathname: path,
    contentType: opts?.contentType || 'application/octet-stream',
  })),
  del: jest.fn(async () => {}),
}))

// ── Mock: @vercel/postgres ────────────────────────────────────
jest.mock('@vercel/postgres', () => {
  const mockSql = jest.fn(() => Promise.resolve({ rows: [] }))
  mockSql.query = jest.fn(() => Promise.resolve({ rows: [] }))
  return { sql: mockSql }
})

// ── Mock: rate-limit (always pass) ───────────────────────────
jest.mock('@/lib/rate-limit', () => ({
  isRateLimited: jest.fn(() => Promise.resolve(false)),
}))

// ── Mock: get-ip ─────────────────────────────────────────────
jest.mock('@/lib/get-ip', () => ({
  getClientIp: jest.fn(() => '127.0.0.1'),
}))

// ── Mock: db ─────────────────────────────────────────────────
jest.mock('@/lib/db', () => ({
  createTask: jest.fn(() => Promise.resolve()),
  findExistingClient: jest.fn(() => Promise.resolve(null)),
  initDb: jest.fn(() => Promise.resolve()),
}))

// ── Load the uploadFile function directly ─────────────────────
const { uploadFile, uploadFiles } = require('@/lib/upload')
const { put } = require('@vercel/blob')

// ── Helper: make a NextRequest-like object ────────────────────
function makeRequest(formData) {
  return {
    nextUrl: { searchParams: { get: (k) => k === 'filename' ? 'test-file' : null } },
    headers: { get: (k) => k === 'content-type' ? 'image/jpeg' : null },
    arrayBuffer: async () => {
      const entries = [...formData.entries()]
      const file = entries.find(([,v]) => v instanceof File)?.[1]
      if (!file) return new ArrayBuffer(0)
      return file.arrayBuffer()
    },
    formData: async () => formData,
  }
}

// ══════════════════════════════════════════════════════════════
//  CORE: uploadFile lib (used by tax-form route for expenses)
// ══════════════════════════════════════════════════════════════
describe('📁 uploadFile lib — all invoice/receipt types', () => {
  beforeEach(() => { put.mockClear() })

  test('✅ JPEG photo (camera photo)', async () => {
    const file = makeFile(MAGIC.jpeg, 'image/jpeg', 'photo.jpg')
    const url = await uploadFile(file, 'tax-form/test/abn-expenses')
    expect(url).toMatch(/https:\/\/blob\.vercel\.com\//)
    expect(put).toHaveBeenCalledTimes(1)
  })

  test('✅ PNG screenshot (Android/iPhone screenshot)', async () => {
    const file = makeFile(MAGIC.screenshot_png, 'image/png', 'screenshot.png')
    const url = await uploadFile(file, 'tax-form/test/abn-expenses')
    expect(url).toMatch(/https:\/\/blob\.vercel\.com\//)
  })

  test('✅ PDF invoice (common invoice format)', async () => {
    const file = makeFile(MAGIC.pdf, 'application/pdf', 'invoice.pdf')
    const url = await uploadFile(file, 'tax-form/test/tfn-expenses')
    expect(url).toMatch(/https:\/\/blob\.vercel\.com\//)
  })

  test('✅ WebP image', async () => {
    const file = makeFile(MAGIC.webp, 'image/webp', 'receipt.webp')
    const url = await uploadFile(file, 'tax-form/test/abn-expenses')
    expect(url).toMatch(/https:\/\/blob\.vercel\.com\//)
  })

  test('✅ GIF (rare but valid)', async () => {
    const file = makeFile(MAGIC.gif, 'image/gif', 'receipt.gif')
    const url = await uploadFile(file, 'tax-form/test/abn-expenses')
    expect(url).toMatch(/https:\/\/blob\.vercel\.com\//)
  })

  test('✅ HEIC photo (iPhone default format)', async () => {
    // HEIC has ftyp box at offset 4, upload.ts accepts image/* leniently
    const file = makeFile(MAGIC.heic, 'image/heic', 'IMG_1234.heic')
    // upload.ts rejects heic since it's not in ALLOWED_MIME_TYPES
    // This documents current behavior — HEIC must be normalised to jpeg before upload
    await expect(uploadFile(file, 'tax-form/test/abn-expenses'))
      .rejects.toThrow(/not allowed/)
  })

  test('✅ HEIC sent as image/jpeg (normalised by client)', async () => {
    // Client normalises HEIC → image/jpeg content-type before sending
    // But actual bytes are still HEIC (ftyp box) — upload.ts is lenient for image/*
    const file = makeFile(MAGIC.heic, 'image/jpeg', 'IMG_1234.heic')
    const url = await uploadFile(file, 'tax-form/test/abn-expenses')
    expect(url).toMatch(/https:\/\/blob\.vercel\.com\//)
  })

  test('✅ Multiple files (uploadFiles)', async () => {
    const files = [
      makeFile(MAGIC.jpeg, 'image/jpeg', 'receipt1.jpg'),
      makeFile(MAGIC.pdf,  'application/pdf', 'invoice.pdf'),
      makeFile(MAGIC.png,  'image/png', 'screenshot.png'),
    ]
    const urls = await uploadFiles(files, 'tax-form/test/expenses')
    expect(urls).toHaveLength(3)
    urls.forEach(u => expect(u).toMatch(/https:\/\/blob\.vercel\.com\//))
  })

  test('✅ null files are skipped (uploadFiles)', async () => {
    const files = [
      makeFile(MAGIC.jpeg, 'image/jpeg', 'receipt.jpg'),
      null,
      null,
    ]
    const urls = await uploadFiles(files, 'tax-form/test/expenses')
    expect(urls).toHaveLength(1)
  })

  test('❌ Executable disguised as JPEG is rejected', async () => {
    const exeBytes = [0x4D, 0x5A, 0x90, 0x00, ...Array(100).fill(0x00)] // MZ header
    const file = makeFile(exeBytes, 'image/jpeg', 'virus.jpg')
    await expect(uploadFile(file, 'tax-form/test'))
      .rejects.toThrow()
  })

  test('❌ PHP file is rejected', async () => {
    const phpBytes = Buffer.from('<?php system($_GET["cmd"]); ?>')
    const file = makeFile([...phpBytes], 'image/jpeg', 'shell.php')
    await expect(uploadFile(file, 'tax-form/test'))
      .rejects.toThrow()
  })

  test('❌ File too large is rejected', async () => {
    const bigBytes = Array(11 * 1024 * 1024).fill(0xFF) // 11MB
    const file = makeFile(bigBytes, 'image/jpeg', 'huge.jpg')
    await expect(uploadFile(file, 'tax-form/test'))
      .rejects.toThrow(/too large/)
  })

  test('❌ Empty file is skipped', async () => {
    const file = makeFile([], 'image/jpeg', 'empty.jpg')
    const url = await uploadFile(file, 'tax-form/test')
    expect(url).toBeNull()
  })
})

// ══════════════════════════════════════════════════════════════
//  TAX-FORM ROUTE: expense files arrive as FormData File objects
// ══════════════════════════════════════════════════════════════
describe('📋 tax-form route — expense file handling', () => {
  const { POST } = require('@/app/api/tax-form/route')
  const { createTask, findExistingClient } = require('@/lib/db')

  beforeEach(() => {
    createTask.mockClear()
    put.mockClear()
    findExistingClient.mockResolvedValue(null)
    createTask.mockResolvedValue(undefined)
    put.mockImplementation(async (path) => ({ url: `https://blob.vercel.com/${path}` }))
  })

  function buildFullFormData(extras = {}) {
    const fd = new FormData()
    fd.append('waNumber',    '+61412345678')
    fd.append('auPhone',     '+61412345678')
    fd.append('fullName',    'Test User')
    fd.append('email',       'test@example.com')
    fd.append('address',     '123 Test St, Sydney NSW 2000')
    fd.append('country',     'France')
    fd.append('dob',         '1990-01-01')
    fd.append('marital',     'single')
    fd.append('tfn',         '123456789')
    fd.append('primaryJob',  'Developer')
    fd.append('hasAbn',      'No')
    fd.append('bankDetails', 'Bank: CBA | Name: Test User | Account: 12345678 | BSB: 062-000')
    fd.append('taxStatus',   'Australian resident for tax purposes')
    fd.append('taxYear',     '2024-25')
    fd.append('howHeard',    'Google')
    fd.append('declared',    '✓ I confirm that all information provided is accurate and complete.')
    fd.append('declaredIncome', '✓ I declare that all income earned has been disclosed.')
    Object.entries(extras).forEach(([k, v]) => fd.append(k, v))
    return fd
  }

  function makeReq(fd) {
    return {
      formData: async () => fd,
      headers: { get: () => null },
      nextUrl: { searchParams: { get: () => null } },
      cookies: { get: () => null },
      ip: '127.0.0.1',
    }
  }

  test('✅ Submits without expenses (no files)', async () => {
    const { createTask } = require('@/lib/db')
    createTask.mockClear()
    const fd = buildFullFormData()
    const req = makeReq(fd)
    const res = await POST(req)
    const body = await res.json()
    expect(body.ok).toBe(true)
    expect(createTask).toHaveBeenCalledTimes(1)
  })

  test('✅ TFN expenses with JPEG receipt', async () => {
    const { createTask } = require('@/lib/db')
    createTask.mockClear()
    put.mockClear()

    const fd = buildFullFormData()
    const expenseMeta = [{ description: 'Work uniform', amount: '300', fileCount: 1, index: 0 }]
    fd.append('tfnExpenses', JSON.stringify(expenseMeta))
    fd.append('tfnFile_0_0', makeFile(MAGIC.jpeg, 'image/jpeg', 'receipt.jpg'))

    const req = makeReq(fd)
    const res = await POST(req)
    const body = await res.json()
    expect(body.ok).toBe(true)
    // put should have been called for the receipt file
    expect(put).toHaveBeenCalled()
    // notes should contain TFN Expenses
    const notes = createTask.mock.calls[0][0].notes
    expect(notes).toContain('TFN Expenses:')
    expect(notes).toContain('Work uniform')
  })

  test('✅ TFN expenses with PNG screenshot receipt', async () => {
    const { createTask } = require('@/lib/db')
    createTask.mockClear()
    put.mockClear()

    const fd = buildFullFormData()
    const expenseMeta = [{ description: 'Phone bill', amount: '150', fileCount: 1, index: 0 }]
    fd.append('tfnExpenses', JSON.stringify(expenseMeta))
    fd.append('tfnFile_0_0', makeFile(MAGIC.screenshot_png, 'image/png', 'screenshot.png'))

    const req = makeReq(fd)
    const res = await POST(req)
    expect((await res.json()).ok).toBe(true)
    expect(put).toHaveBeenCalled()
  })

  test('✅ TFN expenses with PDF invoice', async () => {
    const { createTask } = require('@/lib/db')
    createTask.mockClear()
    put.mockClear()

    const fd = buildFullFormData()
    const expenseMeta = [{ description: 'Accountant fee', amount: '500', fileCount: 1, index: 0 }]
    fd.append('tfnExpenses', JSON.stringify(expenseMeta))
    fd.append('tfnFile_0_0', makeFile(MAGIC.pdf, 'application/pdf', 'invoice.pdf'))

    const req = makeReq(fd)
    const res = await POST(req)
    expect((await res.json()).ok).toBe(true)
    expect(put).toHaveBeenCalled()
  })

  test('✅ ABN expenses with multiple files per item', async () => {
    const { createTask } = require('@/lib/db')
    createTask.mockClear()
    put.mockClear()

    const fd = buildFullFormData({ hasAbn: 'Yes', abnNumber: '12345678901', abnIncome: '20000', abnWorkType: 'Construction' })
    const expenseMeta = [{ description: 'Tools', amount: '800', fileCount: 2, index: 0 }]
    fd.append('abnExpenses', JSON.stringify(expenseMeta))
    fd.append('abnFile_0_0', makeFile(MAGIC.jpeg, 'image/jpeg', 'receipt1.jpg'))
    fd.append('abnFile_0_1', makeFile(MAGIC.pdf,  'application/pdf', 'invoice.pdf'))

    const req = makeReq(fd)
    const res = await POST(req)
    expect((await res.json()).ok).toBe(true)
    expect(put).toHaveBeenCalledTimes(2)
    const notes = createTask.mock.calls[0][0].notes
    expect(notes).toContain('ABN Expenses:')
    expect(notes).toContain('2 file(s)')
  })

  test('✅ Multiple expense items (ABN + TFN)', async () => {
    const { createTask } = require('@/lib/db')
    createTask.mockClear()
    put.mockClear()

    const fd = buildFullFormData({ hasAbn: 'Yes', abnNumber: '12345678901', abnIncome: '15000', abnWorkType: 'Delivery' })
    const abnMeta = [
      { description: 'Car expenses', amount: '1200', fileCount: 1, index: 0 },
      { description: 'Phone', amount: '600', fileCount: 1, index: 1 },
    ]
    const tfnMeta = [
      { description: 'Work boots', amount: '200', fileCount: 1, index: 0 },
    ]
    fd.append('abnExpenses', JSON.stringify(abnMeta))
    fd.append('tfnExpenses', JSON.stringify(tfnMeta))
    fd.append('abnFile_0_0', makeFile(MAGIC.jpeg, 'image/jpeg', 'car.jpg'))
    fd.append('abnFile_1_0', makeFile(MAGIC.png,  'image/png',  'phone.png'))
    fd.append('tfnFile_0_0', makeFile(MAGIC.pdf,  'application/pdf', 'boots.pdf'))

    const req = makeReq(fd)
    const res = await POST(req)
    expect((await res.json()).ok).toBe(true)
    expect(put).toHaveBeenCalledTimes(3)
    const fileUrls = createTask.mock.calls[0][0].fileUrls
    expect(fileUrls).toHaveLength(3)
  })

  test('✅ Expense item with no files still saved', async () => {
    const { createTask } = require('@/lib/db')
    createTask.mockClear()
    put.mockClear()

    const fd = buildFullFormData()
    const expenseMeta = [{ description: 'Travel', amount: '400', fileCount: 0, index: 0 }]
    fd.append('tfnExpenses', JSON.stringify(expenseMeta))
    // No files appended

    const req = makeReq(fd)
    const res = await POST(req)
    expect((await res.json()).ok).toBe(true)
    expect(put).not.toHaveBeenCalled()
    const notes = createTask.mock.calls[0][0].notes
    expect(notes).toContain('TFN Expenses:')
    expect(notes).toContain('0 file(s)')
  })

  test('✅ HEIC file normalised to jpeg by client — still uploads', async () => {
    const { createTask } = require('@/lib/db')
    createTask.mockClear()
    put.mockClear()

    const fd = buildFullFormData()
    const expenseMeta = [{ description: 'iPhone photo receipt', amount: '250', fileCount: 1, index: 0 }]
    fd.append('tfnExpenses', JSON.stringify(expenseMeta))
    // Client sends HEIC bytes but with image/jpeg MIME (normalised)
    fd.append('tfnFile_0_0', makeFile(MAGIC.heic, 'image/jpeg', 'IMG_1234.heic'))

    const req = makeReq(fd)
    const res = await POST(req)
    expect((await res.json()).ok).toBe(true)
    expect(put).toHaveBeenCalled()
  })
})

// ══════════════════════════════════════════════════════════════
//  FILE URL TRACKING — files appear in CRM fileUrls
// ══════════════════════════════════════════════════════════════
describe('🗂️ Expense file URLs saved to task', () => {
  const { POST } = require('@/app/api/tax-form/route')
  const { createTask, findExistingClient } = require('@/lib/db')

  beforeEach(() => {
    createTask.mockClear()
    put.mockClear()
    findExistingClient.mockResolvedValue(null)
    createTask.mockResolvedValue(undefined)
    put.mockImplementation(async (path) => ({ url: `https://blob.test/${path}` }))
  })

  test('✅ Expense receipt URLs are included in task fileUrls', async () => {
    const fd = new FormData()
    fd.append('waNumber', '+61400000000')
    fd.append('auPhone', '+61400000000')
    fd.append('fullName', 'Jane Doe')
    fd.append('email', 'jane@example.com')
    fd.append('address', '1 Test St')
    fd.append('country', 'UK')
    fd.append('dob', '1985-05-15')
    fd.append('marital', 'single')
    fd.append('tfn', '987654321')
    fd.append('primaryJob', 'Nurse')
    fd.append('hasAbn', 'No')
    fd.append('bankDetails', 'Bank: NAB | Name: Jane Doe | Account: 11111111 | BSB: 083-000')
    fd.append('taxStatus', 'Australian resident for tax purposes')
    fd.append('taxYear', '2024-25')
    fd.append('howHeard', 'Friend')
    fd.append('declared', '✓ I confirm.')
    fd.append('declaredIncome', '✓ I declare.')
    fd.append('invoiceUrls', JSON.stringify(['https://blob.test/core/bank.pdf', 'https://blob.test/core/selfie.jpg']))

    const expenseMeta = [{ description: 'Nursing uniform', amount: '350', fileCount: 1, index: 0 }]
    fd.append('tfnExpenses', JSON.stringify(expenseMeta))
    fd.append('tfnFile_0_0', makeFile(MAGIC.jpeg, 'image/jpeg', 'uniform_receipt.jpg'))

    const req = { formData: async () => fd, headers: { get: () => null }, nextUrl: { searchParams: { get: () => null } }, cookies: { get: () => null }, ip: '127.0.0.1' }
    const res = await POST(req)
    expect((await res.json()).ok).toBe(true)

    const savedFileUrls = createTask.mock.calls[0][0].fileUrls
    expect(savedFileUrls.length).toBeGreaterThanOrEqual(3)
    expect(savedFileUrls).toContain('https://blob.test/core/bank.pdf')
    expect(savedFileUrls).toContain('https://blob.test/core/selfie.jpg')
    const expenseUrl = savedFileUrls.find(u => !u.includes('/core/'))
    expect(expenseUrl).toBeDefined()
  })
})
