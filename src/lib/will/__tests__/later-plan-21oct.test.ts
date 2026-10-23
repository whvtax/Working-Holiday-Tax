/**
 * Jo, 21 Oct (+44 7479): "Okay thank you! Will complete this after work",
 * right after the payment confirmation and form button, got no reply at all.
 */
jest.mock('@/lib/will/claude', () => ({ decide: jest.fn() }));
import { decide } from '@/lib/will/claude';
import { runEngine, EngineInput } from '@/lib/will/engine';
import { isLaterPlan, laterPlanReply } from '@/lib/will/later-plan';
import { policyGuard } from '@/lib/will/policy-guard';
import type { CustomerState } from '@/lib/will/state-machine';
const decideMock = decide as jest.MockedFunction<typeof decide>;

function input(customer: string, state: CustomerState, lang: string | null = 'en'): EngineInput {
  return {
    ctx: { name: 'Sophie', state, income: 'TFN', paid: state === 'FORM_PENDING', formComplete: false, missingDocs: [], estimatedRefundCents: null, lang, knowledge: [] },
    guard: { aiPaused: false, killSwitch: false, optedOut: false, isLegacy: false, lastCustomerMsgAt: new Date() },
    history: [{ role: 'assistant', text: 'Payment received.\n\nPlease fill out this quick form so we can start reviewing your situation.' }, { role: 'customer', text: customer }],
    mode: 'FULL_AUTO',
    bank: { bsb: '062692', account: '81049952' },
  };
}
beforeEach(() => decideMock.mockReset());

describe('isLaterPlan', () => {
  it.each([
    'Okay thank you! Will complete this after work',
    "I'll do it tonight",
    "Thanks, I'll fill it in tomorrow",
    "I'll pay after work",
    'Danke, mache ich heute Abend',
    'ありがとうございます、仕事の後で記入します',
    'Gracias, lo hago esta noche',
  ])('"%s" is a plan', (t) => expect(isLaterPlan(t)).toBe(true));
  it.each([
    'Can I do it later?',
    "I'll do it tonight but I can't find my TFN",
    'I start work tomorrow',
    'I can pay now',
    'Thanks!',
    "I've decided to go with someone else, I'll do it with them",
  ])('"%s" is not', (t) => expect(isLaterPlan(t)).toBe(false));
});

describe('the reply', () => {
  it('her case: the form link, without the model', async () => {
    const out = await runEngine(input('Okay thank you! Will complete this after work', 'FORM_PENDING'));
    expect(decideMock).not.toHaveBeenCalled();
    expect(out.kind).toBe('queued');
    expect(out.replyText).toBe("No worries 😊 Here's the link whenever you're ready: https://workingholidaytax.com.au/tax-form");
  });
  it('waiting on the payment: the screenshot line', () => {
    expect(laterPlanReply('PRICE_SENT', 'en')).toMatch(/screenshot/);
  });
  it('in their language', () => {
    expect(laterPlanReply('FORM_PENDING', 'ja')).toContain('ご記入');
    expect(laterPlanReply('PAYMENT_PENDING', 'de')).toContain('Screenshot');
  });
  it('every line passes the policy guard in every stage', () => {
    for (const state of ['PRICE_SENT', 'PAYMENT_PENDING', 'FORM_PENDING', 'UNDER_REVIEW'] as CustomerState[]) {
      for (const lang of ['en', 'de', 'ja', 'es', 'fr', 'it', 'pt']) {
        const line = laterPlanReply(state, lang);
        const v = policyGuard(line, { state, paid: !['PRICE_SENT', 'PAYMENT_PENDING'].includes(state), aiPaused: false, killSwitch: false, optedOut: false, isLegacy: false, lastCustomerMsgAt: new Date(), isApprovedTemplate: true, estimateFromTeam: null });
        expect({ state, lang, v: v.violations }).toEqual({ state, lang, v: [] });
      }
    }
  });
  it('a plan with a question still goes to the model', async () => {
    decideMock.mockResolvedValue({ action: 'reply', confidence: 1, reply_text: 'Your TFN is on your payslip.' });
    await runEngine(input("I'll do it tonight, where do I find my TFN?", 'FORM_PENDING'));
    expect(decideMock).toHaveBeenCalled();
  });
});
