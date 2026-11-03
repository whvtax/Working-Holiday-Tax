/** Security round 2 (sec2-cron-abuse): staff alert emails. Synthetic data, fetch is mocked. */
const mockStore = { audit: jest.fn(), getSetting: jest.fn(), setSetting: jest.fn() }
jest.mock('@/lib/will/store', () => ({ getStore: () => mockStore }))
import { sendSecurityEmail, checkNewDevice, requestInfo, describeDevice, foreignBankNumbers } from '@/lib/security-watch'

const saved = { to: process.env.CRM_ADMIN_EMAIL, key: process.env.RESEND_API_KEY }
beforeEach(() => { process.env.CRM_ADMIN_EMAIL = 'staff@example.invalid'; process.env.RESEND_API_KEY = 're_synthetic_key' })
afterEach(() => {
  jest.restoreAllMocks()
  if (saved.to === undefined) delete process.env.CRM_ADMIN_EMAIL; else process.env.CRM_ADMIN_EMAIL = saved.to
  if (saved.key === undefined) delete process.env.RESEND_API_KEY; else process.env.RESEND_API_KEY = saved.key
})

it('recipient comes only from the environment and the body is a JSON document (no header injection surface)', async () => {
  const spy = jest.spyOn(global, 'fetch').mockResolvedValue(new Response('{}', { status: 200 }))
  await sendSecurityEmail('Subject\r\nBcc: evil@example.invalid', '<p>x</p>')
  const [, init] = spy.mock.calls[0] as [string, RequestInit]
  const body = JSON.parse(String(init.body))
  expect(body.to).toEqual(['staff@example.invalid'])
  expect(body.reply_to).toBeUndefined()
  expect(Object.keys(init.headers as object).sort()).toEqual(['Authorization', 'Content-Type'])
})

it('sends nothing when the admin address or key is missing (fails quiet, never to a default recipient)', async () => {
  const spy = jest.spyOn(global, 'fetch').mockResolvedValue(new Response('{}', { status: 200 }))
  delete process.env.CRM_ADMIN_EMAIL
  await sendSecurityEmail('s', 'h')
  process.env.CRM_ADMIN_EMAIL = 'staff@example.invalid'; delete process.env.RESEND_API_KEY
  await sendSecurityEmail('s', 'h')
  expect(spy).not.toHaveBeenCalled()
})

it('a rejected send is now visible in the log, with the status only (no key, no recipient)', async () => {
  jest.spyOn(global, 'fetch').mockResolvedValue(new Response('{"message":"domain not verified"}', { status: 403 }))
  const err = jest.spyOn(console, 'error').mockImplementation(() => {})
  await sendSecurityEmail('s', 'h')
  expect(err).toHaveBeenCalledTimes(1)
  const logged = err.mock.calls.flat().join(' ')
  expect(logged).toContain('403')
  expect(logged).not.toContain('re_synthetic_key')
  expect(logged).not.toContain('staff@example.invalid')
})

it('a network failure never throws into the login path', async () => {
  jest.spyOn(global, 'fetch').mockRejectedValue(new Error('boom'))
  await expect(sendSecurityEmail('s', 'h')).resolves.toBeUndefined()
})

it('attacker-controlled request headers cannot inject HTML into the new-device email', async () => {
  mockStore.getSetting.mockResolvedValue([{ key: 'other', label: 'x', firstSeen: 'a', lastSeen: 'b' }])
  const req = new Request('https://x.test', { headers: {
    'user-agent': '<img src=x onerror=alert(1)> Chrome/1 Windows',
    'x-vercel-ip-city': encodeURIComponent('<script>alert(1)</script>'),
    'x-vercel-ip-country': '"><svg onload=1>',
  } })
  const info = requestInfo(req, '203.0.113.9')
  let html = ''
  await checkNewDevice(info, async (_s, h) => { html = h })
  expect(html).toContain('Someone just logged in')
  expect(html).not.toContain('<script>')
  expect(html).not.toContain('<svg')
  expect(html).not.toContain('<img')
  expect(describeDevice('<img src=x onerror=alert(1)> Chrome/1 Windows')).toBe('Chrome on Windows')
})

it('bank-number scanner is linear on hostile input', () => {
  const t0 = Date.now()
  foreignBankNumbers('account ' + '1 '.repeat(20000) + 'x' + ' BSB ' + '1'.repeat(50000))
  expect(Date.now() - t0).toBeLessThan(1500)
})
