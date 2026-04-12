/**
 * ══════════════════════════════════════════════════════════════
 *  TAX RETURN FORM — COMPREHENSIVE INVOICE TESTS
 *  20 invoices: JPEG, PNG, PDF, WebP, GIF, HEIC, screenshots
 *  from phone camera, PC, Mac — every combination
 * ══════════════════════════════════════════════════════════════
 */

// ── Magic bytes for every file type ──────────────────────────
const BYTES = {
  jpeg:       [0xFF, 0xD8, 0xFF, 0xE0, 0x00, 0x10, 0x4A, 0x46, ...Array(100).fill(0x80)],
  jpeg_exif:  [0xFF, 0xD8, 0xFF, 0xE1, 0x00, 0x18, 0x45, 0x78, ...Array(100).fill(0x70)], // EXIF JPEG (iPhone)
  png:        [0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, ...Array(100).fill(0x00)],
  pdf:        [0x25, 0x50, 0x44, 0x46, 0x2D, 0x31, 0x2E, 0x34, ...Array(100).fill(0x20)],
  webp:       [0x52, 0x49, 0x46, 0x46, 0x10, 0x00, 0x00, 0x00, 0x57, 0x45, 0x42, 0x50, ...Array(100).fill(0x00)],
  gif:        [0x47, 0x49, 0x46, 0x38, 0x39, 0x61, 0x01, 0x00, ...Array(100).fill(0x00)],
  heic:       [0x00, 0x00, 0x00, 0x18, 0x66, 0x74, 0x79, 0x70, 0x68, 0x65, 0x69, 0x63, ...Array(100).fill(0x00)],
  heif:       [0x00, 0x00, 0x00, 0x18, 0x66, 0x74, 0x79, 0x70, 0x68, 0x65, 0x69, 0x66, ...Array(100).fill(0x00)],
  screenshot_iphone: [0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, ...Array(300).fill(0xFF)], // iPhone screenshot
  screenshot_android:[0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, ...Array(300).fill(0xAB)], // Android screenshot
  screenshot_mac:    [0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, ...Array(300).fill(0xCD)], // Mac screenshot
  screenshot_win:    [0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, ...Array(300).fill(0xEF)], // Windows screenshot
  pdf_scan:   [0x25, 0x50, 0x44, 0x46, 0x2D, 0x31, 0x2E, 0x36, ...Array(200).fill(0x30)], // scanned PDF
  jpeg_scan:  [0xFF, 0xD8, 0xFF, 0xDB, 0x00, 0x43, 0x00, 0x08, ...Array(200).fill(0x60)], // scanned JPEG
}

function makeFile(bytes, mime, name) {
  return new File([new Uint8Array(bytes)], name, { type: mime })
}

// ── Mocks ─────────────────────────────────────────────────────
let lastSaved = null
let uploadedFiles = []

jest.mock('@vercel/postgres', () => {
  const sql = jest.fn((strings, ...vals) => {
    const q = strings.join('').trim().toUpperCase()
    if (q.startsWith('CREATE') || q.startsWith('ALTER')) return Promise.resolve({ rows: [] })
    if (q.startsWith('INSERT')) { lastSaved = vals; return Promise.resolve({ rows: [] }) }
    if (q.startsWith('UPDATE')) return Promise.resolve({ rows: [] })
    if (q.includes('SELECT') && q.includes('CRM_CLIENTS')) return Promise.resolve({ rows: [] })
    if (q.includes('SELECT')) return Promise.resolve({ rows: [] })
    return Promise.resolve({ rows: [] })
  })
  sql.query = jest.fn(() => Promise.resolve({ rows: [] }))
  return { sql }
})

jest.mock('@vercel/blob', () => ({
  put: jest.fn(async (path, _data, opts) => {
    uploadedFiles.push(path)
    return { url: `https://blob.vercel-storage.com/${path}` }
  }),
  del: jest.fn(async () => {}),
}))

jest.mock('@/lib/rate-limit', () => ({ isRateLimited: jest.fn(() => Promise.resolve(false)) }))
jest.mock('@/lib/get-ip', () => ({ getClientIp: jest.fn(() => '1.2.3.4') }))

const { put } = require('@vercel/blob')

function makeReq(formData) {
  return new (require('next/server').NextRequest)('http://localhost/api/tax-form', {
    method: 'POST',
    body: formData,
    headers: { 'x-forwarded-for': '1.2.3.4' },
  })
}

// Base form data (no expenses)
function baseFd(overrides = {}) {
  const fd = new FormData()
  const data = {
    fullName: 'Jonas Dupont', dob: '1997-06-15',
    waNumber: '+32477123456', auPhone: '+61412345678',
    email: 'jonas@example.com', country: 'Belgium',
    taxYear: '2024-25', address: '42 Collins St Melbourne',
    tfn: '999888777', bankDetails: 'NAB — 083000 — 87654321',
    primaryJob: 'Chef', marital: 'Single',
    taxStatus: 'Australian resident for tax purposes',
    howHeard: 'Instagram',
    declared: '✓ I confirm all information is accurate.',
    declaredIncome: '✓ I declare all income disclosed.',
    hasAbn: 'No',
    ...overrides,
  }
  Object.entries(data).forEach(([k, v]) => fd.append(k, v))
  // Core files as pre-uploaded URLs (client-side already uploaded)
  fd.append('invoiceUrls', JSON.stringify([
    'https://blob.vercel-storage.com/tax-form/selfie.jpg',
    'https://blob.vercel-storage.com/tax-form/bank.pdf',
  ]))
  return fd
}

let POST_TAX

beforeAll(async () => {
  const route = await import('../src/app/api/tax-form/route.ts')
  POST_TAX = route.POST
})

beforeEach(() => {
  lastSaved = null
  uploadedFiles = []
  put.mockClear()
})

// ══════════════════════════════════════════════════════════════
//  BASIC SUBMISSION
// ══════════════════════════════════════════════════════════════
describe('📋 Tax return — basic submission', () => {
  test('✅ Submits successfully with no expenses', async () => {
    const res = await POST_TAX(makeReq(baseFd()))
    expect(res.status).toBe(200)
    expect((await res.json()).ok).toBe(true)
    expect(lastSaved[3]).toBe('tax-return')
  })

  test('✅ All core fields saved to DB', async () => {
    await POST_TAX(makeReq(baseFd()))
    expect(lastSaved[2]).toBe('Jonas Dupont')
    expect(lastSaved[5]).toBe('jonas@example.com')
    expect(lastSaved[8]).toBe('2024-25')
    expect(lastSaved[11]).toBe('999888777')
    expect(lastSaved[13]).toBe('Chef')
  })

  test('✅ Core file URLs preserved in fileUrls', async () => {
    await POST_TAX(makeReq(baseFd()))
    const urls = JSON.parse(lastSaved[19])
    expect(urls).toContain('https://blob.vercel-storage.com/tax-form/selfie.jpg')
    expect(urls).toContain('https://blob.vercel-storage.com/tax-form/bank.pdf')
  })

  test('✅ ABN=No saved correctly', async () => {
    await POST_TAX(makeReq(baseFd()))
    expect(lastSaved[18]).toContain('ABN: No')
  })
})

// ══════════════════════════════════════════════════════════════
//  20 INVOICES — EVERY FILE TYPE
// ══════════════════════════════════════════════════════════════
describe('🧾 Tax return — 20 invoices, every file type', () => {

  // Define all 20 invoice types a client might send
  const INVOICES = [
    // From phone camera
    { name: 'iphone_photo.jpg',      bytes: BYTES.jpeg,             mime: 'image/jpeg',       label: 'iPhone camera JPEG' },
    { name: 'iphone_heic.heic',      bytes: BYTES.heic,             mime: 'image/jpeg',       label: 'iPhone HEIC (normalised)' },
    { name: 'iphone_heif.heif',      bytes: BYTES.heif,             mime: 'image/jpeg',       label: 'iPhone HEIF (normalised)' },
    { name: 'iphone_screenshot.png', bytes: BYTES.screenshot_iphone,mime: 'image/png',        label: 'iPhone screenshot' },
    { name: 'android_photo.jpg',     bytes: BYTES.jpeg_exif,        mime: 'image/jpeg',       label: 'Android camera JPEG' },
    { name: 'android_webp.webp',     bytes: BYTES.webp,             mime: 'image/webp',       label: 'Android WebP' },
    { name: 'android_screenshot.png',bytes: BYTES.screenshot_android,mime:'image/png',        label: 'Android screenshot' },
    // From computer
    { name: 'mac_screenshot.png',    bytes: BYTES.screenshot_mac,   mime: 'image/png',        label: 'Mac screenshot' },
    { name: 'windows_screenshot.png',bytes: BYTES.screenshot_win,   mime: 'image/png',        label: 'Windows screenshot' },
    { name: 'invoice_pdf.pdf',       bytes: BYTES.pdf,              mime: 'application/pdf',  label: 'PDF invoice from PC' },
    { name: 'invoice_scan.pdf',      bytes: BYTES.pdf_scan,         mime: 'application/pdf',  label: 'Scanned PDF' },
    { name: 'receipt_scan.jpg',      bytes: BYTES.jpeg_scan,        mime: 'image/jpeg',       label: 'Scanned JPEG receipt' },
    { name: 'receipt_png.png',       bytes: BYTES.png,              mime: 'image/png',        label: 'PNG receipt from PC' },
    { name: 'receipt_gif.gif',       bytes: BYTES.gif,              mime: 'image/gif',        label: 'GIF receipt' },
    { name: 'receipt_webp.webp',     bytes: BYTES.webp,             mime: 'image/webp',       label: 'WebP receipt' },
    // Mixed naming (real-world messy filenames)
    { name: 'IMG_20240315_142233.jpg',bytes: BYTES.jpeg,            mime: 'image/jpeg',       label: 'Android timestamp filename' },
    { name: 'IMG_1492.JPG',          bytes: BYTES.jpeg,             mime: 'image/jpeg',       label: 'iPhone uppercase extension' },
    { name: 'receipt (1).pdf',       bytes: BYTES.pdf,              mime: 'application/pdf',  label: 'PDF with spaces' },
    { name: 'חשבונית_001.pdf',       bytes: BYTES.pdf,              mime: 'application/pdf',  label: 'PDF with Hebrew filename' },
    { name: 'invoice_final_v2.pdf',  bytes: BYTES.pdf,              mime: 'application/pdf',  label: 'PDF invoice final version' },
  ]

  test(`✅ All 20 invoice types upload successfully (TFN expenses)`, async () => {
    const fd = baseFd()

    // Create expense metadata for all 20 invoices as TFN expenses
    const tfnMeta = [
      { description: 'Work expenses batch', amount: '5000', fileCount: 20, index: 0 },
    ]
    fd.append('tfnExpenses', JSON.stringify(tfnMeta))

    // Append all 20 files
    INVOICES.forEach((inv, fi) => {
      fd.append(`tfnFile_0_${fi}`, makeFile(inv.bytes, inv.mime, inv.name))
    })

    const res = await POST_TAX(makeReq(fd))
    expect(res.status).toBe(200)
    expect((await res.json()).ok).toBe(true)

    // All 20 files should have been uploaded
    expect(put).toHaveBeenCalledTimes(20)

    // All URLs in DB
    const allUrls = JSON.parse(lastSaved[19])
    // 2 core + 20 expense = 22 total
    expect(allUrls.length).toBe(22)

    // Notes should contain expense info
    expect(lastSaved[18]).toContain('TFN Expenses:')
    expect(lastSaved[18]).toContain('Work expenses batch')
    expect(lastSaved[18]).toContain('20 file(s)')
  })

  test(`✅ Each invoice type uploads individually (TFN)`, async () => {
    for (const inv of INVOICES) {
      put.mockClear()
      lastSaved = null

      const fd = baseFd({ email: `test-${inv.name}@example.com` })
      const meta = [{ description: inv.label, amount: '100', fileCount: 1, index: 0 }]
      fd.append('tfnExpenses', JSON.stringify(meta))
      fd.append('tfnFile_0_0', makeFile(inv.bytes, inv.mime, inv.name))

      const res = await POST_TAX(makeReq(fd))
      expect(res.status).toBe(200, `Failed for: ${inv.label}`)
      expect(put).toHaveBeenCalledTimes(1, `put not called for: ${inv.label}`)
    }
  })

  test(`✅ Each invoice type uploads individually (ABN)`, async () => {
    for (const inv of INVOICES) {
      put.mockClear()
      lastSaved = null

      const fd = baseFd({
        email: `abn-${inv.name}@example.com`,
        hasAbn: 'Yes', abnNumber: '12345678901',
        abnIncome: '20000', abnWorkType: 'Construction',
      })
      fd.append('abnNumber', '12345678901')
      fd.append('abnIncome', '20000')
      fd.append('abnWorkType', 'Construction')

      const meta = [{ description: inv.label, amount: '200', fileCount: 1, index: 0 }]
      fd.append('abnExpenses', JSON.stringify(meta))
      fd.append('abnFile_0_0', makeFile(inv.bytes, inv.mime, inv.name))

      const res = await POST_TAX(makeReq(fd))
      expect(res.status).toBe(200, `Failed for ABN: ${inv.label}`)
      expect(put).toHaveBeenCalledTimes(1, `put not called for ABN: ${inv.label}`)
    }
  })
})

// ══════════════════════════════════════════════════════════════
//  MULTIPLE EXPENSE ITEMS WITH MIXED FILES
// ══════════════════════════════════════════════════════════════
describe('🧾 Tax return — multiple expense items mixed files', () => {

  test('✅ 5 TFN items × 4 files each = 20 uploads', async () => {
    const fd = baseFd()
    const items = [
      { description: 'Work uniform', amount: '800', fileCount: 4, index: 0 },
      { description: 'Phone bill',   amount: '600', fileCount: 4, index: 1 },
      { description: 'Car expenses', amount: '1200',fileCount: 4, index: 2 },
      { description: 'Tools',        amount: '500', fileCount: 4, index: 3 },
      { description: 'Training',     amount: '400', fileCount: 4, index: 4 },
    ]
    fd.append('tfnExpenses', JSON.stringify(items))

    // Mix of file types for each item
    const fileTypes = [
      { bytes: BYTES.jpeg, mime: 'image/jpeg', ext: 'jpg' },
      { bytes: BYTES.png,  mime: 'image/png',  ext: 'png' },
      { bytes: BYTES.pdf,  mime: 'application/pdf', ext: 'pdf' },
      { bytes: BYTES.heic, mime: 'image/jpeg', ext: 'heic' },
    ]
    items.forEach((item, i) => {
      fileTypes.forEach((ft, fi) => {
        fd.append(`tfnFile_${i}_${fi}`, makeFile(ft.bytes, ft.mime, `receipt_${i}_${fi}.${ft.ext}`))
      })
    })

    const res = await POST_TAX(makeReq(fd))
    expect(res.status).toBe(200)
    expect(put).toHaveBeenCalledTimes(20)
    const allUrls = JSON.parse(lastSaved[19])
    expect(allUrls.length).toBe(22) // 2 core + 20 expense
    expect(lastSaved[18]).toContain('Work uniform')
    expect(lastSaved[18]).toContain('Phone bill')
    expect(lastSaved[18]).toContain('Car expenses')
  })

  test('✅ ABN + TFN expenses simultaneously, mixed file types', async () => {
    const fd = baseFd({ hasAbn: 'Yes' })
    fd.append('abnNumber', '98765432100')
    fd.append('abnIncome', '30000')
    fd.append('abnWorkType', 'Delivery driver')

    const abnItems = [
      { description: 'Car insurance', amount: '900', fileCount: 2, index: 0 },
      { description: 'Fuel receipts',amount: '1500', fileCount: 3, index: 1 },
    ]
    const tfnItems = [
      { description: 'Work laptop',  amount: '1200', fileCount: 2, index: 0 },
      { description: 'Internet bill',amount: '600',  fileCount: 1, index: 1 },
    ]
    fd.append('abnExpenses', JSON.stringify(abnItems))
    fd.append('tfnExpenses', JSON.stringify(tfnItems))

    // ABN item 0: JPEG + PDF
    fd.append('abnFile_0_0', makeFile(BYTES.jpeg, 'image/jpeg', 'car_ins.jpg'))
    fd.append('abnFile_0_1', makeFile(BYTES.pdf,  'application/pdf', 'car_ins.pdf'))
    // ABN item 1: PNG + HEIC + WebP
    fd.append('abnFile_1_0', makeFile(BYTES.png,  'image/png',  'fuel1.png'))
    fd.append('abnFile_1_1', makeFile(BYTES.heic, 'image/jpeg', 'fuel2.heic'))
    fd.append('abnFile_1_2', makeFile(BYTES.webp, 'image/webp', 'fuel3.webp'))
    // TFN item 0: Screenshot + PDF
    fd.append('tfnFile_0_0', makeFile(BYTES.screenshot_mac,  'image/png', 'laptop_receipt_mac.png'))
    fd.append('tfnFile_0_1', makeFile(BYTES.screenshot_win,  'image/png', 'laptop_receipt_win.png'))
    // TFN item 1: PDF
    fd.append('tfnFile_1_0', makeFile(BYTES.pdf,  'application/pdf', 'internet_bill.pdf'))

    const res = await POST_TAX(makeReq(fd))
    expect(res.status).toBe(200)
    expect(put).toHaveBeenCalledTimes(8) // 2+3+2+1
    const allUrls = JSON.parse(lastSaved[19])
    expect(allUrls.length).toBe(10) // 2 core + 8 expense
    expect(lastSaved[18]).toContain('ABN Expenses:')
    expect(lastSaved[18]).toContain('TFN Expenses:')
    expect(lastSaved[18]).toContain('Car insurance')
    expect(lastSaved[18]).toContain('Work laptop')
  })
})

// ══════════════════════════════════════════════════════════════
//  NOTES CLEANLINESS — no structured data in admin notes
// ══════════════════════════════════════════════════════════════
describe('📝 Tax return — Internal notes are clean', () => {

  test('✅ Notes field contains no raw expense data visible to admin', async () => {
    const fd = baseFd()
    const tfnItems = [
      { description: 'Uniform', amount: '300', fileCount: 1, index: 0 },
      { description: 'Phone',   amount: '200', fileCount: 1, index: 1 },
    ]
    fd.append('tfnExpenses', JSON.stringify(tfnItems))
    fd.append('tfnFile_0_0', makeFile(BYTES.jpeg, 'image/jpeg', 'uniform.jpg'))
    fd.append('tfnFile_1_0', makeFile(BYTES.pdf,  'application/pdf', 'phone.pdf'))
    await POST_TAX(makeReq(fd))

    const rawNotes = lastSaved[18]

    // Structured data IS in raw notes (for CRM display)
    expect(rawNotes).toContain('TFN Expenses:')

    // But extractUserNotes (simulated here) strips it all
    const parts = rawNotes.split(' | ')
    const userVisible = parts.filter(p => {
      const t = p.trim()
      if (!t) return false
      if (p.startsWith('📝 ')) return false
      if (t.match(/^(→|ABN:|ABN Number:|ABN Income:|ABN Work Type:|ABN Expenses:|TFN Expenses:|I confirm|I declare)/i)) return false
      if (t.match(/^\$[\d,.]+ AUD/)) return false
      if (t.match(/^\d+ file/)) return false
      return true
    })
    // Nothing should leak through to admin notes textarea
    expect(userVisible.join('')).toBe('')
  })

  test('✅ Reviewer note (📝) kept separate from admin notes', async () => {
    const fd = baseFd()
    await POST_TAX(makeReq(fd))
    const rawNotes = lastSaved[18]
    // No reviewer notes injected on submission
    expect(rawNotes).not.toContain('📝 ')
  })
})

// ══════════════════════════════════════════════════════════════
//  EDGE CASES
// ══════════════════════════════════════════════════════════════
describe('🔧 Tax return — edge cases', () => {

  test('✅ Expense item with 0 files still saved to notes', async () => {
    const fd = baseFd()
    fd.append('tfnExpenses', JSON.stringify([{ description: 'Parking', amount: '150', fileCount: 0, index: 0 }]))
    const res = await POST_TAX(makeReq(fd))
    expect(res.status).toBe(200)
    expect(put).not.toHaveBeenCalled()
    expect(lastSaved[18]).toContain('Parking')
    expect(lastSaved[18]).toContain('0 file(s)')
  })

  test('✅ Empty expense list — no notes added', async () => {
    const fd = baseFd()
    fd.append('tfnExpenses', JSON.stringify([]))
    const res = await POST_TAX(makeReq(fd))
    expect(res.status).toBe(200)
    expect(lastSaved[18]).not.toContain('TFN Expenses:')
  })

  test('✅ Rate limit returns 429', async () => {
    const { isRateLimited } = require('@/lib/rate-limit')
    isRateLimited.mockResolvedValueOnce(true)
    const res = await POST_TAX(makeReq(baseFd()))
    expect(res.status).toBe(429)
  })

  test('✅ Blob failure during expense upload returns 500', async () => {
    put.mockRejectedValueOnce(new Error('Blob storage error'))
    const fd = baseFd()
    fd.append('tfnExpenses', JSON.stringify([{ description: 'Test', amount: '100', fileCount: 1, index: 0 }]))
    fd.append('tfnFile_0_0', makeFile(BYTES.jpeg, 'image/jpeg', 'receipt.jpg'))
    const res = await POST_TAX(makeReq(fd))
    expect(res.status).toBe(500)
  })

  test('✅ Very long description handled safely', async () => {
    const fd = baseFd()
    const longDesc = 'A'.repeat(500)
    fd.append('tfnExpenses', JSON.stringify([{ description: longDesc, amount: '100', fileCount: 0, index: 0 }]))
    const res = await POST_TAX(makeReq(fd))
    expect(res.status).toBe(200)
  })

  test('✅ taxYear defaults to 2024-25 when missing', async () => {
    const fd = baseFd({ taxYear: '' })
    const res = await POST_TAX(makeReq(fd))
    expect(res.status).toBe(200)
    expect(lastSaved[8]).toBe('2024-25')
  })

  test('✅ ABN=Yes with expenses and TFN expenses together', async () => {
    const fd = baseFd({ hasAbn: 'Yes' })
    fd.append('abnNumber', '11122233344')
    fd.append('abnIncome', '25000')
    fd.append('abnWorkType', 'Farming')
    fd.append('abnExpenses', JSON.stringify([{ description: 'Equipment', amount: '2000', fileCount: 1, index: 0 }]))
    fd.append('tfnExpenses', JSON.stringify([{ description: 'Clothing', amount: '400', fileCount: 1, index: 0 }]))
    fd.append('abnFile_0_0', makeFile(BYTES.pdf, 'application/pdf', 'equipment.pdf'))
    fd.append('tfnFile_0_0', makeFile(BYTES.png, 'image/png', 'clothing.png'))
    const res = await POST_TAX(makeReq(fd))
    expect(res.status).toBe(200)
    expect(put).toHaveBeenCalledTimes(2)
    expect(lastSaved[18]).toContain('ABN Expenses:')
    expect(lastSaved[18]).toContain('TFN Expenses:')
    expect(lastSaved[18]).toContain('ABN: Yes')
    expect(lastSaved[18]).toContain('11122233344')
  })
})
