/** Jo, 29 Oct: at some stages Will stopped answering a bare thank-you. */
jest.mock('@/lib/will/claude', () => ({ ...jest.requireActual('@/lib/will/claude'), decide: jest.fn() }));
import { decide } from '@/lib/will/claude';
import { runEngine, EngineInput } from '@/lib/will/engine';
const decideMock = decide as jest.MockedFunction<typeof decide>;

const input = (state: string, paid: boolean, text: string): EngineInput => ({
  ctx: { name: 'Sam', state, income: 'TFN', paid, formComplete: paid, missingDocs: [], estimatedRefundCents: null, lang: 'en', knowledge: [], decisionMode: 'will' } as never,
  guard: { aiPaused: false, killSwitch: false, optedOut: false, isLegacy: false, lastCustomerMsgAt: new Date() },
  history: [{ role: 'assistant', text: 'Payment received. Please fill out this quick form.' }, { role: 'customer', text }],
  mode: 'FULL_AUTO', bank: { bsb: '062692', account: '81049952' }, decisionMode: 'will',
});

describe.each([['wait'], ['human_task']])('model chose %s on a bare thank-you', (action) => {
  it.each([['PAID'], ['FORM_COMPLETE'], ['PRICE_SENT']])('still answers in state %s', async (state) => {
    decideMock.mockResolvedValue({ action, confidence: 1, task_reason: 'x' } as never);
    const out = await runEngine(input(state, state !== 'PRICE_SENT', 'Thank you so much!'));
    expect(out.replyText).toMatch(/welcome|Anytime/i);
  });
});

it('a thank-you with a question is left to the model', async () => {
  decideMock.mockResolvedValue({ action: 'wait', confidence: 1 } as never);
  const out = await runEngine(input('PAID', true, 'Thanks! When will it be lodged?'));
  expect(out.replyText).toBeUndefined();
});

import { ALL_STATES as STATES } from '@/lib/will/state-machine';
describe('every stage', () => {
  it.each((STATES as readonly string[]).map((s) => [s]))('a bare thank-you is answered in %s', async (state) => {
    decideMock.mockResolvedValue({ action: 'wait', confidence: 1 } as never);
    for (const paid of [false, true]) {
      const out = await runEngine(input(state, paid, 'Thank you'));
      expect([state, paid, out.kind, out.replyText]).toEqual([state, paid, expect.stringMatching(/queued|pending_approval/), expect.stringMatching(/welcome|Anytime/i)]);
    }
  });
});
