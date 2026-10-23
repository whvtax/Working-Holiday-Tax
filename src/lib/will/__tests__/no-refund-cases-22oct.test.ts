/**
 * Jo, 22 Oct (+44 7809): "In what cases would there be no refund?", right
 * after the price message, got "Yes, that's definitely one of the many things
 * we check before we lodge your tax return, so leave that with us. 😊".
 */
jest.mock('@/lib/will/claude', () => ({ decide: jest.fn() }));
import { decide } from '@/lib/will/claude';
import { runEngine, EngineInput, fitStockLine } from '@/lib/will/engine';
import { NO_REFUND_CASES_Q, NO_REFUND_CASES_MSG, PRE_PAYMENT_CHECK_MSG } from '@/lib/will/i18n';
import { policyGuard } from '@/lib/will/policy-guard';
import { APPROVED } from '@/lib/will/approved-messages';
const decideMock = decide as jest.MockedFunction<typeof decide>;

function input(q: string, lang = 'en'): EngineInput {
  return {
    ctx: { name: 'Tom', state: 'PRICE_SENT', income: 'TFN', paid: false, formComplete: false, missingDocs: [], estimatedRefundCents: null, lang, knowledge: [] },
    guard: { aiPaused: false, killSwitch: false, optedOut: false, isLegacy: false, lastCustomerMsgAt: new Date() },
    history: [{ role: 'assistant', text: APPROVED.price_tfn }, { role: 'customer', text: q }],
    mode: 'FULL_AUTO', bank: { bsb: '062692', account: '81049952' },
  };
}
beforeEach(() => decideMock.mockReset());

it.each([
  'In what cases would there be no refund?',
  'When would there be no refund?',
  'what do you mean by no refund?',
  'In welchen Fällen gibt es keine Rückerstattung?',
  'どんな場合に還付がないですか？',
])('"%s" is the no-refund question', (q) => expect(NO_REFUND_CASES_Q.test(q)).toBe(true));

it.each(['Will I get a refund?', 'How much will my refund be?', 'Is there a refund if I owe tax?'])('"%s" is not', (q) => expect(NO_REFUND_CASES_Q.test(q)).toBe(false));

it('his case gets a real answer, without the model', async () => {
  const out = await runEngine(input('In what cases would there be no refund?'));
  expect(decideMock).not.toHaveBeenCalled();
  expect(out.replyText).toBe(NO_REFUND_CASES_MSG.en);
  expect(out.replyText).not.toMatch(/^Yes/);
});

it('the answer passes the policy guard before payment, in all three languages', () => {
  for (const line of Object.values(NO_REFUND_CASES_MSG)) {
    const v = policyGuard(line, { state: 'PRICE_SENT', paid: false, aiPaused: false, killSwitch: false, optedOut: false, isLegacy: false, lastCustomerMsgAt: new Date(), isApprovedTemplate: true, estimateFromTeam: null });
    expect(v.violations).toEqual([]);
  }
});

describe('the stock line only says "Yes," to a yes/no question', () => {
  it('drops it for what/which/when/how', () => {
    expect(fitStockLine(PRE_PAYMENT_CHECK_MSG.en, 'Which deductions can I claim?')).toBe("That's definitely one of the many things we check before we lodge your tax return, so leave that with us. 😊");
    expect(fitStockLine(PRE_PAYMENT_CHECK_MSG.de, 'Welche Abzüge kann ich geltend machen?')).toMatch(/^Das ist/);
  });
  it('keeps it for a yes/no question', () => {
    expect(fitStockLine(PRE_PAYMENT_CHECK_MSG.en, 'Am I a resident for tax?')).toBe(PRE_PAYMENT_CHECK_MSG.en);
  });
  it('leaves any other text alone', () => {
    expect(fitStockLine('Yes, you can pay by bank transfer.', 'How do I pay?')).toBe('Yes, you can pay by bank transfer.');
  });
});
