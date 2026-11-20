/**
 * /api/tax-form with free text in another language (decision 017, 18 Nov 2026).
 *
 * The task is saved with the customer's ORIGINAL words in every field. When the
 * model answers, an English line is added to the notes next to them. When the
 * model fails in any way, the task is saved exactly as it was before this
 * feature existed. Synthetic data, all collaborators mocked.
 */
import { NextRequest } from 'next/server'

const transport = jest.fn()
const createTask = jest.fn()
jest.mock('@/lib/will/llm-transport', () => ({ anthropicMessages: (...a: unknown[]) => transport(...a) }))
jest.mock('@/lib/will/ai-usage', () => ({ recordAiUsage: jest.fn() }))
jest.mock('@/lib/rate-limit', () => ({ isRateLimited: jest.fn().mockResolvedValue(false) }))
jest.mock('@/lib/db', () => ({ createTask: (...a: unknown[]) => createTask(...a), findExistingClient: jest.fn().mockResolvedValue(null) }))
jest.mock('@/lib/will/form-link', () => ({
  notifyFormReceived: jest.fn().mockResolvedValue(undefined),
  notifyFormReceivedForCustomer: jest.fn().mockResolvedValue(undefined),
  recordUnverifiedFormSubmission: jest.fn().mockResolvedValue(undefined),
  medicareAnswerFor: () => 'no',
}))
jest.mock('@/lib/will/store', () => ({ getStore: () => ({ audit: jest.fn().mockResolvedValue(undefined), getSetting: jest.fn().mockResolvedValue(null), setSetting: jest.fn().mockResolvedValue(undefined) }) }))

import { POST } from '../tax-form/route'

const FIELDS: Record<string, string> = {
  waNumber: '+49 151 00000000', auPhone: '0400 000 111', fullName: 'Test Person', email: 'test.person@example.invalid',
  address: '1 Example St, Sydney NSW 2000', country: 'Deutschland', dob: '1999-01-02', marital: 'Single',
  hasMedicare: 'No', tfn: '000000000', primaryJob: 'Kellnerin im Café', hasExpenses: 'No',
  hasOtherIncome: 'Yes', otherIncomeText: 'Zinsen und Mieteinnahmen',
  taxStatus: 'Australian resident for tax purposes', taxYear: '2025-26', howHeard: 'über eine Freundin',
  declared: '✓ I’ve read & agree to the Client Agreement & Privacy Policy.', formLang: 'de',
}

const post = (over: Record<string, string> = {}) => {
  const fd = new FormData()
  for (const [k, v] of Object.entries({ ...FIELDS, ...over })) fd.append(k, v)
  return POST(new NextRequest('http://workingholidaytax.com.au/api/tax-form', {
    method: 'POST', body: fd, headers: { host: 'workingholidaytax.com.au', 'x-real-ip': '203.0.113.9', origin: 'https://workingholidaytax.com.au' },
  }))
}
const saved = () => createTask.mock.calls[0][0] as Record<string, string>
const reply = (answers: unknown) => ({ ok: true, json: () => Promise.resolve({ content: [{ type: 'tool_use', name: 'english', input: { answers } }] }) })

const KEY = process.env.ANTHROPIC_API_KEY
beforeEach(() => {
  transport.mockReset(); createTask.mockReset(); createTask.mockResolvedValue({})
  process.env.ANTHROPIC_API_KEY = 'synthetic-key-for-tests'
})
afterAll(() => { if (KEY === undefined) delete process.env.ANTHROPIC_API_KEY; else process.env.ANTHROPIC_API_KEY = KEY })

describe('/api/tax-form: English for free text, next to the original', () => {
  it('the baseline: what is saved when the model is not configured', async () => {
    delete process.env.ANTHROPIC_API_KEY
    const res = await post()
    expect(res.status).toBe(200)
    expect(transport).not.toHaveBeenCalled()
    expect(saved().primaryJob).toBe('Kellnerin im Café')
    expect(saved().notes).toContain('⚠️ Other income: Yes - Zinsen und Mieteinnahmen')
    expect(saved().notes).not.toContain('(translated)')
  })

  it('the model call throwing: the form still saves exactly as the baseline', async () => {
    delete process.env.ANTHROPIC_API_KEY
    await post()
    const baseline = { ...saved(), submittedAt: '', clientId: '' }
    createTask.mockClear()

    process.env.ANTHROPIC_API_KEY = 'synthetic-key-for-tests'
    transport.mockRejectedValue(new Error('model unavailable'))
    const res = await post()
    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ ok: true })
    expect(transport).toHaveBeenCalledTimes(1)
    expect(createTask).toHaveBeenCalledTimes(1)
    expect({ ...saved(), submittedAt: '', clientId: '' }).toEqual(baseline)
  })

  it.each([
    ['an error status', () => Promise.resolve({ ok: false, status: 500, json: () => Promise.resolve({}) })],
    ['an odd answer', () => Promise.resolve({ ok: true, json: () => Promise.resolve({ content: 'nope' }) })],
    ['a synchronous throw', () => { throw new Error('boom') }],
  ])('%s from the model: saved, no translated line', async (_name, impl) => {
    transport.mockImplementation(impl as () => unknown)
    const res = await post()
    expect(res.status).toBe(200)
    expect(saved().primaryJob).toBe('Kellnerin im Café')
    expect(saved().notes).not.toContain('(translated)')
  })

  it('when the model answers, the English is ADDED to the notes and every original field is unchanged', async () => {
    transport.mockResolvedValue(reply([
      { field: 'primaryJob', english: 'Waitress in a café' },
      { field: 'otherIncomeText', english: 'Interest and rental income' },
      { field: 'howHeard', english: 'Through a friend' },
    ]))
    const res = await post()
    expect(res.status).toBe(200)
    const t = saved()
    // Originals, exactly as typed.
    expect(t.primaryJob).toBe('Kellnerin im Café')
    expect(t.notes).toContain('⚠️ Other income: Yes - Zinsen und Mieteinnahmen')
    expect(t.clientName).toBe('Test Person')
    expect(t.address).toBe('1 Example St, Sydney NSW 2000')
    expect(t.marital).toBe('Single')
    expect(t.taxStatus).toBe('Australian resident for tax purposes')
    // The English, next to them.
    expect(t.notes).toContain('Occupation (translated): Waitress in a café')
    expect(t.notes).toContain('Other income (translated): Interest and rental income')
    expect(t.notes).toContain('How heard (translated): Through a friend')
    // Names, the address, the TFN, the phone and the email are never sent.
    const sent = String(transport.mock.calls[0][0].body)
    for (const secret of ['Test Person', 'Example St', '000000000', '151 00000000', 'example.invalid', '1999-01-02']) expect(sent).not.toContain(secret)
  })

  it('English answers on the English form make no model call', async () => {
    const res = await post({ primaryJob: 'Barista', otherIncomeText: 'interest', howHeard: 'Instagram', country: 'United Kingdom', formLang: 'en' })
    expect(res.status).toBe(200)
    expect(transport).not.toHaveBeenCalled()
    expect(saved().notes).not.toContain('(translated)')
  })

  it('the other-income text is only translated when the answer is Yes', async () => {
    transport.mockResolvedValue(reply([]))
    await post({ hasOtherIncome: 'No', primaryJob: 'Barista', howHeard: 'Instagram', country: 'Germany' })
    expect(transport).not.toHaveBeenCalled()
  })

  it('a made-up formLang value cannot do anything but trigger the cheap check', async () => {
    transport.mockResolvedValue(reply([]))
    const res = await post({ formLang: '<script>alert(1)</script>', primaryJob: 'Barista', otherIncomeText: 'interest', howHeard: 'Instagram', country: 'Germany' })
    expect(res.status).toBe(200)
    expect(JSON.stringify(saved())).not.toContain('script')
  })
})
