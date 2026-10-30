/** Jo, 28 Oct (Anna Whelan): a customer who only wants answers and will lodge
 *  herself gets one friendly boundary and the chat is closed. */
import { isFreeAdviceSeeker, FREE_ADVICE_BOUNDARY } from '@/lib/will/free-advice-seeker'
import { policyGuard } from '@/lib/will/policy-guard'

const seeker = (texts: string[], over: Partial<Parameters<typeof isFreeAdviceSeeker>[0]> = {}) =>
  isFreeAdviceSeeker({ paid: false, priceSent: true, lang: 'en', textsSincePrice: texts, ...over })

describe('who only wants answers', () => {
  it.each([
    "Okay thanks. Just checking, I know I owe the ATO money right now and if i do after my return is there an option with them to pay in installments?",
    "My myGov is linked to the ATO so I might just lodge it myself",
    "I'll do it myself, I just need to know what to include",
    'can I set up a payment plan with the ATO?',
  ])('yes: %s', (t) => expect(seeker([t])).toBe(true))

  it('two advice questions without buying', () => {
    expect(seeker(['Am I supposed to include my Irish income?', 'Should I declare the foreign tax I paid?'])).toBe(true)
  })
  it.each([
    ['one advice question only', ['Am I supposed to include my Irish income?'], {}],
    ['ready to pay', ['Ok thanks, paying now', 'Sent'], {}],
    ['already paid', ['I owe the ATO, installments?'], { paid: true }],
    ['price not sent yet', ['I owe the ATO, installments?'], { priceSent: false }],
    ['not English', ['I owe the ATO, installments?'], { lang: 'de' }],
    ['plain acknowledgement', ['Okay thank you'], {}],
  ] as const)('no: %s', (_n, texts, over) => expect(seeker([...texts], over as never)).toBe(false))
})

describe('the boundary message', () => {
  it('passes the guard before payment', () => {
    const v = policyGuard(FREE_ADVICE_BOUNDARY, {
      state: 'PRICE_SENT', paid: false, aiPaused: false, killSwitch: false, optedOut: false, isLegacy: false,
      lastCustomerMsgAt: new Date(), isApprovedTemplate: false, estimateFromTeam: null,
    })
    expect(v.violations).toEqual([])
  })
  it('has no dash and no AI mention', () => {
    expect(FREE_ADVICE_BOUNDARY).not.toMatch(/[—–]|\bAI\b|\bbot\b/i)
  })
})

jest.mock('@/lib/will/claude', () => ({ ...jest.requireActual('@/lib/will/claude'), decide: jest.fn() }))
import { runEngine, EngineInput } from '@/lib/will/engine'
import { APPROVED } from '@/lib/will/approved-messages'
import { decide } from '@/lib/will/claude'
const decideMock = decide as jest.MockedFunction<typeof decide>

const input = (history: EngineInput['history'], over: Partial<EngineInput['ctx']> = {}): EngineInput => ({
  ctx: { name: 'Anna', state: 'PRICE_SENT', income: 'TFN', paid: false, formComplete: false, missingDocs: [], estimatedRefundCents: null, lang: 'en', knowledge: [], decisionMode: 'will', ...over } as EngineInput['ctx'],
  guard: { aiPaused: false, killSwitch: false, optedOut: false, isLegacy: false, lastCustomerMsgAt: new Date() },
  history, mode: 'FULL_AUTO', bank: { bsb: '062692', account: '81049952' }, decisionMode: 'will',
})
const price = { role: 'assistant' as const, text: APPROVED.price_tfn }
const ask = { role: 'customer' as const, text: 'I know I owe the ATO money right now, can I pay in installments?' }

describe('in the engine', () => {
  it('sends one boundary and closes the chat, no task', async () => {
    const out = await runEngine(input([price, ask]))
    expect(out.kind).toBe('queued')
    expect(out.replyText).toBe(FREE_ADVICE_BOUNDARY)
    expect(out.newState).toBe('NOT_INTERESTED')
    expect(out.task).toBeUndefined()
  })
  it('stays silent once the boundary has been said', async () => {
    const out = await runEngine(input([price, ask, { role: 'assistant', text: FREE_ADVICE_BOUNDARY }, { role: 'customer', text: "ok I'll just lodge it myself then" }]))
    expect(out.kind).toBe('silent')
  })
  it('a customer who comes back ready to pay is not held to the old question', async () => {
    decideMock.mockResolvedValue({ action: 'reply', confidence: 1, reply_text: 'Great, just send a screenshot once paid.', new_state: 'PAYMENT_PENDING' } as never)
    const out = await runEngine(input([price, ask, { role: 'assistant', text: FREE_ADVICE_BOUNDARY }, { role: 'customer', text: 'ok, going ahead, paying now' }]))
    expect(out.kind).not.toBe('silent')
    expect(out.replyText).not.toBe(FREE_ADVICE_BOUNDARY)
  })
})
