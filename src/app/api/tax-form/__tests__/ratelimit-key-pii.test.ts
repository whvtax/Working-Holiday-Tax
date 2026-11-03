/** The per-person rate-limit key lives in Redis, so it must not contain the
 *  customer's phone number or email (security review, data protection). */
import { NextRequest } from 'next/server'

const isRateLimited = jest.fn().mockResolvedValue(false)
jest.mock('@/lib/db', () => ({ createTask: jest.fn().mockResolvedValue({}), findExistingClient: jest.fn().mockResolvedValue(null) }))
jest.mock('@/lib/rate-limit', () => ({ isRateLimited: (...a: unknown[]) => isRateLimited(...a) }))
jest.mock('@/lib/will/form-link', () => ({ notifyFormReceived: jest.fn().mockResolvedValue(undefined), medicareAnswerFor: () => null }))
jest.mock('@/lib/will/store', () => ({ getStore: () => ({ audit: jest.fn() }) }))

import { POST } from '../route'

function req(extra: Record<string, string> = {}) {
  const fd = new FormData()
  for (const [k, v] of Object.entries({ fullName: 'Test Person', email: 'test.person@example.invalid', waNumber: '+61 400 000 111', auPhone: '0412 345 678', taxYear: '2025-26', ...extra })) fd.append(k, v)
  return new NextRequest('http://workingholidaytax.com.au/api/tax-form', { method: 'POST', body: fd, headers: { host: 'workingholidaytax.com.au', 'x-real-ip': '203.0.113.9' } })
}

beforeEach(() => isRateLimited.mockClear())

it('the per-person key holds a hash, not the phone number or email', async () => {
  const res = await POST(req())
  expect(res.status).toBe(200)
  const keys = isRateLimited.mock.calls.map(c => String(c[0]))
  const perPerson = keys.find((_, i) => isRateLimited.mock.calls[i][1] === 'tax-form')!
  expect(perPerson).toMatch(/^[0-9a-f:.]+:[0-9a-f]{24}$/)
  expect(perPerson).not.toContain('400000111')
  expect(perPerson).not.toContain('example.invalid')
})

it('the same person always maps to the same key, a different person to a different one', async () => {
  await POST(req()); await POST(req()); await POST(req({ waNumber: '+61 400 000 222' }))
  const k = isRateLimited.mock.calls.filter(c => c[1] === 'tax-form').map(c => c[0])
  expect(k[0]).toBe(k[1])
  expect(k[2]).not.toBe(k[0])
})
