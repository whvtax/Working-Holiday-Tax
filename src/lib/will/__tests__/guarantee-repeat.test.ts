/**
 * 29 Sep (+46 70 889 88 40): "so is the cost 220 for you and then I pay 300
 * for the refund?" got the guarantee again, word for word, one message after
 * the price message that carries it. The guarantee belongs to the price
 * message; a repeat in an ordinary reply is dropped in code.
 */
import { stripGuarantee, runEngine, EngineInput } from '@/lib/will/engine';
import { APPROVED } from '@/lib/will/approved-messages';

jest.mock('@/lib/will/claude', () => ({ decide: jest.fn() }));
import { decide } from '@/lib/will/claude';
const decideMock = decide as jest.MockedFunction<typeof decide>;

const G = "If your tax refund is less than our fee, we'll refund the difference. If there's no refund, our full fee applies.";

it('strips both guarantee sentences and tidies the paragraph', () => {
  const t = `No, $220 is the total, there's nothing else to pay.\n\n${G}\n\nJust send a screenshot once paid and we'll get started!`;
  expect(stripGuarantee(t)).toBe("No, $220 is the total, there's nothing else to pay.\n\nJust send a screenshot once paid and we'll get started!");
});

it('a reply after the price message loses the repeated guarantee; the price message itself keeps it', async () => {
  const input: EngineInput = {
    ctx: { name: 'Erik', state: 'PRICE_SENT', income: 'TFN', paid: false, formComplete: false, missingDocs: [], estimatedRefundCents: null, lang: 'en', knowledge: [] },
    guard: { aiPaused: false, killSwitch: false, optedOut: false, isLegacy: false, lastCustomerMsgAt: new Date() },
    history: [
      { role: 'assistant', text: APPROVED.opening },
      { role: 'customer', text: 'TFN' },
      { role: 'assistant', text: APPROVED.price_tfn },
      { role: 'customer', text: 'So is the cost 220 for you for the lodge and then i pay the 300 for the tax refund?' },
    ],
    mode: 'FULL_AUTO',
    bank: { bsb: '062692', account: '81049952' },
  };
  decideMock.mockResolvedValue({ action: 'reply', reply_text: `No, $220 is the total, there's nothing else to pay. Your refund comes to you in full.\n\n${G}\n\nJust send a screenshot once paid and we'll get started!`, confidence: 0.9 });
  const out = await runEngine(input);
  expect(out.kind).toBe('queued');
  expect(out.replyText).not.toMatch(/refund the difference|full fee applies/);
  expect(out.replyText).toMatch(/\$220 is the total/);
});
