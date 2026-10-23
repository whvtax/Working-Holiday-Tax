/**
 * Jo, 22 Oct (Nicole +44 7500): "Hi I was looking to complete a free
 * eligibility check for my tax return. Thank you", her FIRST message, got
 * "You're very welcome! 😊".
 */
jest.mock('@/lib/will/claude', () => ({ decide: jest.fn() }));
import { decide } from '@/lib/will/claude';
import { runEngine, EngineInput } from '@/lib/will/engine';
import { isClosingOnly } from '@/lib/will/text-normalize';
const decideMock = decide as jest.MockedFunction<typeof decide>;
const NICOLE = 'Hi I was looking to complete a free eligibility check for my tax return. Thank you';

function input(history: EngineInput['history']): EngineInput {
  return {
    ctx: { name: 'Nicole', state: 'NEW_LEAD', income: 'UNKNOWN', paid: false, formComplete: false, missingDocs: [], estimatedRefundCents: null, lang: 'en', knowledge: [] },
    guard: { aiPaused: false, killSwitch: false, optedOut: false, isLegacy: false, lastCustomerMsgAt: new Date() },
    history, mode: 'FULL_AUTO', bank: { bsb: '062692', account: '81049952' },
  };
}
beforeEach(() => decideMock.mockReset().mockResolvedValue({ action: 'reply', confidence: 1, reply_text: 'Hey Nicole! 😊 Happy to help.' }));

it.each([
  NICOLE,
  "Hi, I'd like to do my tax return, thanks",
  'Hello, interested in your service, thank you',
  'Hi, I want to get my refund sorted, thanks!',
])('"%s" is a request, not a closing', (t) => expect(isClosingOnly(t)).toBe(false));

it('still: a plain thank-you, and a thank-you that names a topic, are closings', () => {
  expect(isClosingOnly('Thank you so much!')).toBe(true);
  expect(isClosingOnly('Thank you, the refund is lodged')).toBe(true);
});

it('her first message goes to Will, never to the canned line', async () => {
  const out = await runEngine(input([{ role: 'customer', text: NICOLE }]));
  expect(decideMock).toHaveBeenCalled();
  expect(out.replyText ?? '').not.toMatch(/very welcome/i);
});

it('a first message that is ONLY "thank you" still goes to Will (nothing of ours to thank for)', async () => {
  await runEngine(input([{ role: 'customer', text: 'Thank you!' }]));
  expect(decideMock).toHaveBeenCalled();
});

it('after we have written, a plain thank-you still gets the line with no model call', async () => {
  const out = await runEngine(input([{ role: 'assistant', text: 'Here is the link.' }, { role: 'customer', text: 'Thank you!' }]));
  expect(decideMock).not.toHaveBeenCalled();
  expect(out.replyText).toBe("You're very welcome! 😊");
});
