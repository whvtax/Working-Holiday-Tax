/** invoiceUrls on the public tax form: only this brand's public-upload objects are kept. */
import { NextRequest } from 'next/server'

process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://abc.supabase.co'
const createTask = jest.fn().mockResolvedValue({})
jest.mock('@/lib/db', () => ({ createTask: (...a: unknown[]) => createTask(...a), findExistingClient: jest.fn().mockResolvedValue(null) }))
jest.mock('@/lib/rate-limit', () => ({ isRateLimited: jest.fn().mockResolvedValue(false) }))
jest.mock('@/lib/will/form-link', () => ({ notifyFormReceived: jest.fn().mockResolvedValue({ matched: false }), medicareAnswerFor: () => null }))
jest.mock('@/lib/will/store', () => ({ getStore: () => ({ audit: jest.fn() }) }))

import { POST } from '../route'

const b = 'https://abc.supabase.co/storage/v1/object/public/uploads'
it('drops other customers\' objects and cross-brand objects, keeps its own', async () => {
  const urls = [`${b}/tax-form/bank/1_a_ok.pdf`, `${b}/tfn-form/CLT-victim/1_a_passport.jpg`, `${b}/svt/tax-form/bank/1_a_svt.pdf`, `${b}/tax-form/../tfn-form/CLT-victim/x.jpg`, 'https://evil.example/x.jpg']
  const fd = new FormData()
  for (const [k, v] of Object.entries({ fullName: 'T P', email: 'a@example.invalid', waNumber: '+61400000000', auPhone: '0412 345 678', taxYear: '2025-26', invoiceUrls: JSON.stringify(urls) })) fd.append(k, v)
  const res = await POST(new NextRequest('http://workingholidaytax.com.au/api/tax-form', { method: 'POST', body: fd, headers: { host: 'workingholidaytax.com.au' } }))
  expect(res.status).toBe(200)
  expect(createTask.mock.calls[0][0].fileUrls).toEqual([`${b}/tax-form/bank/1_a_ok.pdf`])
})
