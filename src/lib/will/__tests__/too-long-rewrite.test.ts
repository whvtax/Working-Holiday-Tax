/**
 * A reply refused only for length is rewritten short, not turned into a task.
 *
 * Helena (+44 7984, 4 Sep): "can your registered agent assess my residency and
 * the Addy case before lodging?" got a correct answer that ran to five
 * paragraphs. The guard refused it (REPLY_TOO_LONG) and Jo got a task for an
 * answer that only needed cutting. Jo's rule: before payment every detailed
 * tax story gets three or four lines, acknowledge, "that is exactly what our
 * review covers", next step. So the engine asks the model ONCE to say the same
 * thing short; if that clears the guard it goes; if not, pre-payment falls to
 * the approved "we check that as part of the review" line; only post-payment
 * does it remain a task.
 */
import { runEngine, EngineInput } from '@/lib/will/engine';

jest.mock('@/lib/will/claude', () => ({ decide: jest.fn() }));
import { decide } from '@/lib/will/claude';
const decideMock = decide as jest.MockedFunction<typeof decide>;

const ESSAY = [
  'Hi Helena!',
  'Yes, absolutely. Assessing your tax residency and whether you are entitled to be treated as an Australian resident (rather than automatically under the 15% WHM rate) is exactly what we do as part of the review. The Addy case is one of the factors our tax agent considers when reviewing UK citizens in your situation.',
  'Your residency depends on your individual circumstances, including things like your length of stay, intention, living arrangements and ties to Australia, so it is reviewed properly rather than assumed.',
  'That assessment happens once we start the review (after payment), and you will get the outcome before anything is lodged, so you know exactly how you are being treated and why.',
  'It is also worth knowing that the review covers your Medicare position and every deduction you are entitled to, and that the whole process is handled online so you do not need to be in Australia for any of it.',
  'Would you like me to talk you through how the service works?',
].join('\n\n');

const SHORT = 'Hi Helena!\n\nYes, that is exactly what our tax agent assesses as part of the review: your residency and whether the WHM rate applies to you, before anything is lodged.\n\nWhich option suits you, TFN or TFN + ABN?';

function input(over: Partial<EngineInput> = {}): EngineInput {
  return {
    ctx: {
      name: 'Helena', state: 'NEW_LEAD', income: 'UNKNOWN', paid: false,
      formComplete: false, missingDocs: [], estimatedRefundCents: null, lang: 'en', knowledge: [],
    },
    guard: { aiPaused: false, killSwitch: false, optedOut: false, isLegacy: false, lastCustomerMsgAt: new Date() },
    history: [
      { role: 'assistant', text: 'Hey! 😊 Of course, we would be happy to help. Which option suits you?' },
      { role: 'customer', text: 'Before I pay, can your registered tax agent assess whether I was a resident and whether the Addy case applies?' },
    ],
    mode: 'FULL_AUTO',
    bank: { bsb: '062692', account: '81049952' },
    ...over,
  };
}

beforeEach(() => decideMock.mockReset());

it('an essay is rewritten short once and the short version goes out', async () => {
  decideMock
    .mockResolvedValueOnce({ action: 'reply', reply_text: ESSAY, confidence: 0.9 })
    .mockResolvedValueOnce({ action: 'reply', reply_text: SHORT, confidence: 0.9 });
  const out = await runEngine(input());
  expect(decideMock).toHaveBeenCalledTimes(2);
  expect(decideMock.mock.calls[1][2]?.rewriteHint).toMatch(/TOO LONG/);
  expect(out.kind).toBe('queued');
  // Not the opening message, so the name greeting line is dropped by the normaliser.
  expect(out.replyText).toBe(SHORT.replace('Hi Helena!\n\n', ''));
  expect(out.task).toBeUndefined();
  expect(out.reviewNote).toMatch(/rewrote it short/);
});

it('pre-payment, a rewrite that is still too long falls to the approved review line, not a task', async () => {
  decideMock
    .mockResolvedValueOnce({ action: 'reply', reply_text: ESSAY, confidence: 0.9 })
    .mockResolvedValueOnce({ action: 'reply', reply_text: ESSAY + '\n\n' + ESSAY, confidence: 0.9 });
  const out = await runEngine(input());
  expect(out.kind).toBe('queued');
  expect(out.task).toBeUndefined();
  expect(out.replyText).toMatch(/review/i);
  expect(out.guardViolations).toContain('REPLY_TOO_LONG');
});

it('post-payment, a reply that stays too long after the rewrite is still a task', async () => {
  decideMock
    .mockResolvedValueOnce({ action: 'reply', reply_text: ESSAY, confidence: 0.9 })
    .mockResolvedValueOnce({ action: 'reply', reply_text: ESSAY + '\n\n' + ESSAY, confidence: 0.9 });
  const out = await runEngine(input({ ctx: { ...input().ctx, state: 'UNDER_REVIEW', paid: true } }));
  expect(out.kind).toBe('human_task');
  expect(decideMock).toHaveBeenCalledTimes(2);
});

it('a reply with a real violation besides length is not rewritten, it is a task', async () => {
  decideMock.mockResolvedValueOnce({ action: 'reply', reply_text: ESSAY + '\n\nYour refund should be around $1,800.', confidence: 0.9 });
  const out = await runEngine(input());
  expect(decideMock).toHaveBeenCalledTimes(1);
  expect(out.kind).toBe('human_task');
});
