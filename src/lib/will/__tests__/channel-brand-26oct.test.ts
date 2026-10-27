/**
 * Decision 004: the customer's brand decides the words AND the number.
 *  - WHT: unchanged, from the WHT number id.
 *  - SVT: rebranded words, recorded as sent, from the SVT number id only;
 *    no SVT number configured = refused, never the WHT number.
 *  - Templates: the SVT twin (_svt).
 *  - A message carrying the other brand is refused at the last step.
 */
const store = {
  addMessage: jest.fn(), setMessageStatus: jest.fn(), attachProviderId: jest.fn(), markCustomerRead: jest.fn(),
  audit: jest.fn(), addTask: jest.fn(), getSetting: jest.fn(), listMessages: jest.fn().mockResolvedValue([]),
}
jest.mock('@/lib/will/store', () => ({ getStore: () => store }))

import { deliverOut, sendWhatsAppText } from '@/lib/will/channel'
import type { CustomerRow } from '@/lib/will/store'

const customer = (over: Partial<CustomerRow> = {}) => ({
  id: 'c1', waId: '61400000001', name: 'Alex', optedOut: false, lang: null, state: 'NEW_LEAD',
  lastCustomerMsgAt: new Date().toISOString(), ...over,
} as CustomerRow)

let fetchMock: jest.Mock
const realFetch = global.fetch
const env = process.env

beforeEach(() => {
  for (const fn of Object.values(store)) (fn as jest.Mock).mockReset()
  store.listMessages.mockResolvedValue([])
  store.addMessage.mockResolvedValue({ id: 'm1' })
  store.getSetting.mockImplementation(async (k: string) => (k === 'wa_access_token' ? 'tok' : k === 'wa_phone_number_id' ? 'WHT_ID' : undefined))
  fetchMock = jest.fn().mockResolvedValue({ ok: true, status: 200, json: async () => ({ messages: [{ id: 'wamid.1' }] }) })
  global.fetch = fetchMock as unknown as typeof fetch
  process.env = { ...env }
  delete process.env.SVT_WHATSAPP_PHONE_NUMBER_ID
})
afterEach(() => { global.fetch = realFetch; process.env = env })

const sent = () => fetchMock.mock.calls.map(c => ({ url: c[0] as string, payload: JSON.parse((c[1] as { body: string }).body) }))

it('WHT: words unchanged, WHT number id', async () => {
  const body = 'Form: https://workingholidaytax.com.au/tax-form'
  const res = await deliverOut(customer(), body, 'AI')
  expect(res.ok).toBe(true)
  expect(sent()[0].url).toContain('/WHT_ID/messages')
  expect(sent()[0].payload.text.body).toBe(body)
  expect(store.addMessage.mock.calls[0][0].body).toBe(body)
})

it('SVT with no SVT number configured: refused, nothing sent, never the WHT number', async () => {
  const res = await deliverOut(customer({ brand: 'svt' }), 'Hello from the team at Working Holiday Tax', 'AI')
  expect(res.ok).toBe(false)
  expect(fetchMock).not.toHaveBeenCalled()
})

it('SVT: rebranded words, recorded as sent, SVT number id', async () => {
  process.env.SVT_WHATSAPP_PHONE_NUMBER_ID = 'SVT_ID'
  const res = await deliverOut(customer({ brand: 'svt' }), "Hi, it's the team at Working Holiday Tax. Form: https://workingholidaytax.com.au/tax-form", 'AI')
  expect(res.ok).toBe(true)
  const s = sent()[0]
  expect(s.url).toContain('/SVT_ID/messages')
  expect(s.payload.text.body).toBe("Hi, it's the team at Student Visa Tax. Form: https://studentvisatax.com.au/tax-form")
  expect(store.addMessage.mock.calls[0][0].body).toBe(s.payload.text.body)
})

it('SVT templates use the _svt twin, unless confirmed shareable', async () => {
  process.env.SVT_WHATSAPP_PHONE_NUMBER_ID = 'SVT_ID'
  await deliverOut(customer({ brand: 'svt' }), 'Your return is lodged.', 'AI', undefined, { name: 'lodged', params: ['Alex'] })
  expect(sent()[0].payload.template.name).toBe('lodged_svt')
  process.env.SVT_SHARED_TEMPLATES = 'signature'
  await deliverOut(customer({ brand: 'svt' }), 'Please sign.', 'AI', undefined, { name: 'signature', params: [] })
  expect(sent()[1].payload.template.name).toBe('signature')
})

it('the last step refuses a message carrying the other brand', async () => {
  const res = await sendWhatsAppText('61400000001', 'See studentvisatax.com.au', 'wht')
  expect(res.ok).toBe(false)
  expect(res.error).toMatch(/blocked/)
  expect(fetchMock).not.toHaveBeenCalled()
})
