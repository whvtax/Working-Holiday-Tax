/**
 * Decision 003. The brand is taken from the Host header on the server, never
 * from the body. An SVT submission is tagged 'svt' and does NOT trigger the
 * WHT WhatsApp confirmation; with the SVT line on, Mia confirms it instead.
 */
import { NextRequest } from 'next/server'

const createTask = jest.fn().mockResolvedValue({})
let brandSeen: string | null = null
const notifyFormReceived = jest.fn().mockImplementation(async () => { brandSeen = (await import('@/lib/will/brand-context')).currentBrand() })
const audit = jest.fn().mockResolvedValue(undefined)

jest.mock('@/lib/db', () => ({ createTask: (...a: unknown[]) => createTask(...a), findExistingClient: jest.fn().mockResolvedValue(null) }))
jest.mock('@/lib/rate-limit', () => ({ isRateLimited: jest.fn().mockResolvedValue(false) }))
jest.mock('@/lib/will/form-link', () => ({ notifyFormReceived: (...a: unknown[]) => notifyFormReceived(...a), medicareAnswerFor: () => null }))
jest.mock('@/lib/will/store', () => ({ getStore: () => ({ audit: (...a: unknown[]) => audit(...a) }) }))

import { POST } from '../route'

function req(host: string, extra: Record<string, string> = {}) {
  const fd = new FormData()
  for (const [k, v] of Object.entries({ fullName: 'Test Person', email: 'test@example.invalid', waNumber: '+61400000000', taxYear: '2025-26', ...extra })) fd.append(k, v)
  return new NextRequest(`http://${host}/api/tax-form`, { method: 'POST', body: fd, headers: { host } })
}

beforeEach(() => { createTask.mockClear(); notifyFormReceived.mockClear(); audit.mockClear() })

it('WHT host: task tagged wht and Will confirms as before', async () => {
  const res = await POST(req('workingholidaytax.com.au'))
  expect(res.status).toBe(200)
  expect(createTask.mock.calls[0][0].brand).toBe('wht')
  expect(notifyFormReceived).toHaveBeenCalledTimes(1)
})

it('SVT host: task tagged svt, no WHT WhatsApp message, audit for staff', async () => {
  const res = await POST(req('studentvisatax.com.au'))
  expect(res.status).toBe(200)
  expect(createTask.mock.calls[0][0].brand).toBe('svt')
  expect(notifyFormReceived).not.toHaveBeenCalled()
  expect(audit).toHaveBeenCalledWith('system', 'svt_form_received', expect.any(Object))
})

it('SVT host with the SVT line on: Mia confirms, inside the SVT brand (final review, 27 Oct)', async () => {
  process.env.SVT_WHATSAPP_PHONE_NUMBER_ID = 'SVT_ID'
  try {
    brandSeen = null
    const res = await POST(req('studentvisatax.com.au'))
    expect(res.status).toBe(200)
    expect(notifyFormReceived).toHaveBeenCalledTimes(1)
    expect(brandSeen).toBe('svt')
  } finally { delete process.env.SVT_WHATSAPP_PHONE_NUMBER_ID }
})

it('a brand field in the body is ignored', async () => {
  await POST(req('workingholidaytax.com.au', { brand: 'svt' }))
  expect(createTask.mock.calls[0][0].brand).toBe('wht')
  await POST(req('studentvisatax.com.au', { brand: 'wht' }))
  expect(createTask.mock.calls[1][0].brand).toBe('svt')
})

describe('extraNotes (SVT visa and course details)', () => {
  it('are appended to the task notes, sanitised and capped', async () => {
    const notes = JSON.stringify(['Visa: Student 500', 'Course 6 months or longer: Yes', '<script>x</script>', 'a'.repeat(500), 'five', 'six', 'seven'])
    await POST(req('studentvisatax.com.au', { extraNotes: notes }))
    const saved: string = createTask.mock.calls[0][0].notes
    expect(saved).toContain('Visa: Student 500')
    expect(saved).toContain('Course 6 months or longer: Yes')
    expect(saved).not.toContain('<script>')
    expect(saved).not.toContain('a'.repeat(201))
    expect(saved).not.toContain('seven')
  })
  it('garbage is ignored, not an error', async () => {
    const res = await POST(req('studentvisatax.com.au', { extraNotes: '{not json' }))
    expect(res.status).toBe(200)
  })
  it('WHT submissions without the field are unchanged', async () => {
    await POST(req('workingholidaytax.com.au'))
    expect(createTask.mock.calls[0][0].notes).toBe('')
  })
})
