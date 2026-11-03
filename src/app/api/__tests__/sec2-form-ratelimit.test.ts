/**
 * Security round 2 (R2-6): the TFN, ABN and super forms were 5 requests per IP per
 * 15 minutes, which locks out the sixth person in a hostel. Now 30 per IP and 5 per
 * hashed person. Synthetic data, all collaborators mocked.
 */
import { NextRequest } from 'next/server'

const limiter = jest.fn()
jest.mock('@/lib/rate-limit', () => ({ isRateLimited: (...a: unknown[]) => limiter(...a) }))
jest.mock('@/lib/db', () => ({ createTask: jest.fn().mockResolvedValue({}), findExistingClient: jest.fn().mockResolvedValue(null) }))
jest.mock('@/lib/upload', () => ({ uploadFiles: jest.fn().mockResolvedValue([]), UploadValidationError: class extends Error {} }))
jest.mock('@/lib/will/form-link', () => ({ notifyFormReceived: jest.fn().mockResolvedValue(undefined) }))
jest.mock('@/lib/will/store', () => ({ getStore: () => ({ audit: jest.fn() }) }))

import { POST as tfn } from '../tfn-form/route'
import { POST as abn } from '../abn-form/route'
import { POST as sup } from '../super-form/route'

const form = (url: string, phone: string, ip = '2001:db8:5:6:1:2:3:4') => {
  const fd = new FormData()
  for (const [k, v] of Object.entries({ firstName: 'Test', lastName: 'Person', email: 'test.person@example.invalid', whatsapp: phone })) fd.append(k, v)
  return new NextRequest(url, { method: 'POST', body: fd, headers: { host: 'workingholidaytax.com.au', 'x-real-ip': ip } })
}

describe.each([
  ['tfn-form', tfn],
  ['abn-form', abn],
  ['super-form', sup],
] as const)('%s', (name, handler) => {
  beforeEach(() => limiter.mockReset())

  it('checks a generous per-/64 ceiling first, then a per-person key that holds a hash', async () => {
    limiter.mockImplementation(async (_k: string, form: string) => form === name) // trip the per-person check
    const res = await handler(form(`http://workingholidaytax.com.au/api/${name}`, '+61 400 000 111'))
    expect(res.status).toBe(429)
    const [first, second] = limiter.mock.calls
    expect(first).toEqual(['2001:db8:5:6::/64', `${name}-ip`, 30])
    expect(second[1]).toBe(name)
    expect(String(second[0])).toMatch(/^2001:db8:5:6::\/64:[0-9a-f]{24}$/)
    expect(String(second[0])).not.toContain('400000111')
    expect(String(second[0])).not.toContain('example.invalid')
  })

  it('two different people behind one IP get different person keys (a hostel is not locked out)', async () => {
    limiter.mockImplementation(async (_k: string, f: string) => f === name)
    await handler(form(`http://workingholidaytax.com.au/api/${name}`, '+61 400 000 111', '203.0.113.5'))
    await handler(form(`http://workingholidaytax.com.au/api/${name}`, '+61 400 000 222', '203.0.113.5'))
    const personKeys = limiter.mock.calls.filter((c) => c[1] === name).map((c) => c[0])
    expect(personKeys).toHaveLength(2)
    expect(personKeys[0]).not.toBe(personKeys[1])
  })

  it('the per-IP ceiling alone still stops a single abuser', async () => {
    limiter.mockImplementation(async (_k: string, f: string) => f === `${name}-ip`)
    const res = await handler(form(`http://workingholidaytax.com.au/api/${name}`, '+61 400 000 111'))
    expect(res.status).toBe(429)
    expect(limiter).toHaveBeenCalledTimes(1)
  })
})
