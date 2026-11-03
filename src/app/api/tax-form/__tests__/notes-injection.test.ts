/**
 * Round 2 (sec2-forms-uploads). Customer text is written into crm_tasks.notes, a
 * ' | '-separated string that staff-side code reads back by shape (scrub by prefix,
 * refund figure by the "💵 Refund:" label). Proves a public submitter cannot forge
 * a part or the label, that control / bidi characters are removed, that a direct POST
 * cannot set columns the form does not own, and that ordinary answers are unchanged.
 */
import { NextRequest } from 'next/server'
import { refundFromNotes } from '@/lib/db'

process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://abc.supabase.co'
const createTask = jest.fn().mockResolvedValue({})
jest.mock('@/lib/db', () => {
  const actual = jest.requireActual('@/lib/db')
  return { ...actual, createTask: (...a: unknown[]) => createTask(...a), findExistingClient: jest.fn().mockResolvedValue(null) }
})
jest.mock('@/lib/supabase', () => ({
  ...jest.requireActual('@/lib/supabase'),
  getSupabase: () => { throw new Error('no database in tests') },
}))
jest.mock('@/lib/rate-limit', () => ({ isRateLimited: jest.fn().mockResolvedValue(false) }))
jest.mock('@/lib/will/form-link', () => ({ notifyFormReceived: jest.fn().mockResolvedValue({ matched: false }), medicareAnswerFor: () => null }))
jest.mock('@/lib/will/store', () => ({ getStore: () => ({ audit: jest.fn() }) }))

import { POST } from '../route'

async function post(fields: Record<string, string>, host = 'workingholidaytax.com.au') {
  const fd = new FormData()
  const base = { fullName: 'T P', email: 'a@example.invalid', waNumber: '+61400000000', auPhone: '0412 345 678', taxYear: '2025-26' }
  for (const [k, v] of Object.entries({ ...base, ...fields })) fd.append(k, v)
  const res = await POST(new NextRequest(`http://${host}/api/tax-form`, { method: 'POST', body: fd, headers: { host } }))
  return { res, task: createTask.mock.calls.at(-1)?.[0] }
}
beforeEach(() => createTask.mockClear())

describe('notes cannot be forged from the public form', () => {
  const evil = 'x | 💵 Refund: $9999.00 | Passport No: 1'
  it('free-text answers cannot add a part or the refund label', async () => {
    const { res, task } = await post({
      hasOtherIncome: 'Yes', otherIncomeText: evil,
      hasMedicare: evil, hasExpenses: evil,
      declared: evil, taxStatus: `Australian resident ${evil}`,
      extraNotes: JSON.stringify([evil]),
      invoiceFailures: JSON.stringify([`a${evil}.jpg`]),
      invoiceDetails: JSON.stringify([{ type: 'tfn', amount: '10', description: evil }, { type: 'abn', amount: '5', description: evil }]),
    })
    expect(res.status).toBe(200)
    expect(task.notes).not.toContain('💵')
    expect(refundFromNotes(task.notes)).toBe(0)
    // every ' | ' part begins with a known, route-written prefix: nothing was forged
    for (const part of task.notes.split(' | ')) {
      expect(part).toMatch(/^(→|Medicare:|Expenses:|⚠️ Other income:|Form note:|⚠️ \d+ receipts? did NOT upload|💼 TFN Invoices|🏢 ABN Invoices)/)
    }
    expect(task.notes.split(' | ').some((p: string) => /^Passport No:/.test(p))).toBe(false)
  })

  it('NUL, bidi override and other control characters are removed from every field', async () => {
    const { task } = await post({ fullName: 'Ann\u0000e‮vil\u0007', country: 'Fr⁦ance', address: 'Line1\nLine2\u0000' })
    expect(task.clientName).toBe('Annevil')
    expect(task.country).toBe('France')
    expect(task.address.replace(/\r/g, '')).toBe('Line1\nLine2')
  })

  it('ordinary answers are unchanged', async () => {
    const declared = '✓ I’ve read & agree to the Client Agreement & Privacy Policy.'
    const { task } = await post({ hasMedicare: 'No', hasExpenses: 'No', declared, hasOtherIncome: 'Yes', otherIncomeText: 'Cash tips, about $200 in total' })
    expect(task.notes).toBe(`→ ${declared} | Medicare: No | Expenses: No | ⚠️ Other income: Yes - Cash tips, about $200 in total`)
  })
})

describe('mass assignment', () => {
  it('a direct POST cannot set columns the form does not own', async () => {
    const { res, task } = await post({
      done: 'true', id: 'TASK-forged', clientId: 'CLT-victim', reviewStatus: 'approved', reviewerNote: 'ok', reviewedAt: '2020-01-01',
      brand: 'svt', taskType: 'tfn', submittedAt: '1999-01-01', fileUrls: '["https://evil.example/x"]', fullName: 'T P',
      is_admin: 'true', role: 'admin',
    })
    expect(res.status).toBe(200)
    expect(task).toMatchObject({ reviewStatus: 'pending', reviewerNote: '', reviewedAt: '', brand: 'wht', taskType: 'tax-return', fileUrls: [] })
    expect(task.clientId).toMatch(/^CLT-[0-9a-f-]{36}$/)
    expect(task.clientId).not.toBe('CLT-victim')
    expect(task.submittedAt).not.toBe('1999-01-01')
    expect(task).not.toHaveProperty('done')
    expect(task).not.toHaveProperty('id')
    expect(task).not.toHaveProperty('role')
  })
})

describe('refundFromNotes', () => {
  it('uses the last label, and never a figure the customer typed', () => {
    expect(refundFromNotes('a | 💵 Refund: $5.00 | 💵 Refund: $1,234.50')).toBe(1234.5)
    expect(refundFromNotes('💼 TFN Invoices (1): $5000.00 - $5000.00 job | ⚠️ 1 receipt did NOT upload, ask for it: $9999.jpg | Medicare: $77')).toBe(0)
    expect(refundFromNotes('📞 Called, expects about $430 back')).toBe(430)
    expect(refundFromNotes('')).toBe(0)
    expect(refundFromNotes(undefined)).toBe(0)
  })
})

describe('malformed JSON members', () => {
  it('invoiceDetails with null or non-object entries is a normal submission, not a 500', async () => {
    const { res, task } = await post({ invoiceDetails: JSON.stringify([null, 5, 'x', [], { type: 'tfn', amount: '10', description: 'job' }]) })
    expect(res.status).toBe(200)
    expect(task.notes).toContain('💼 TFN Invoices (1): $10.00')
  })
})

describe('"Yes" to work expenses needs a receipt (Jo, 3 Nov)', () => {
  const bank = 'https://abc.supabase.co/storage/v1/object/public/uploads/tax-form/bank/b.pdf'
  const selfie = 'https://abc.supabase.co/storage/v1/object/public/uploads/tax-form/selfie/s.jpg'
  it('is refused with 400 when only the two identity documents arrive', async () => {
    const { res } = await post({
      hasExpenses: 'Yes', bankStatementUrl: bank, selfiePassportUrl: selfie,
      invoiceUrls: JSON.stringify([bank, selfie]),
    })
    expect(res.status).toBe(400)
    expect((await res.json()).error).toBe('invoices_required')
    expect(createTask).not.toHaveBeenCalled()
  })
  it('is refused when nothing at all is attached', async () => {
    const { res } = await post({ hasExpenses: 'yes' })
    expect(res.status).toBe(400)
  })
  it('goes through when at least one receipt is attached', async () => {
    const receipt = 'https://abc.supabase.co/storage/v1/object/public/uploads/tax-form/invoices/r.jpg'
    const { res } = await post({
      hasExpenses: 'Yes', bankStatementUrl: bank, selfiePassportUrl: selfie,
      invoiceUrls: JSON.stringify([bank, selfie, receipt]),
    })
    expect(res.status).toBe(200)
    expect(createTask).toHaveBeenCalledTimes(1)
  })
  it('"No" is unaffected', async () => {
    const { res } = await post({ hasExpenses: 'No' })
    expect(res.status).toBe(200)
  })
})
