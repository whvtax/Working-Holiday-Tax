/**
 * Jo, 23 Oct (+49 160 8730398): "Zahlung erhalten" twice, five minutes apart,
 * once as text with the link and once as the template with the button.
 * And (+44 7472): "Is there a link I can leave you a review?" went to a person.
 */
jest.mock('@/lib/will/claude', () => ({ ...jest.requireActual('@/lib/will/claude'), decide: jest.fn() }));
import { decide } from '@/lib/will/claude';
import { runEngine, EngineInput } from '@/lib/will/engine';
import { confirmationAlreadyOut, looksLikePaymentConfirmation } from '@/lib/will/payment-confirmation';
import { PAYMENT_RECEIVED_MSG } from '@/lib/will/i18n';
import { renderApproved } from '@/lib/will/will-decides';
import { policyGuard } from '@/lib/will/policy-guard';
const decideMock = decide as jest.MockedFunction<typeof decide>;

const now = Date.now();
const row = (over: Record<string, unknown>) => ({ id: 'x', direction: 'OUT', status: 'SENT', body: '', meta: {}, createdAt: new Date(now - 5 * 60_000).toISOString(), ...over }) as never;

describe('a confirmation is recognised by what it is, not its exact words', () => {
  it('both versions of the German one', () => {
    expect(looksLikePaymentConfirmation(PAYMENT_RECEIVED_MSG.de)).toBe(true);
    expect(looksLikePaymentConfirmation('Zahlung erhalten.\n\nBitte fülle dieses kurze Formular aus, damit wir ...')).toBe(true);
    expect(looksLikePaymentConfirmation('Danke! Ich gebe es ans Team weiter.')).toBe(false);
  });
  it('his case: the text one went, so the queued template one is a duplicate', () => {
    const msgs = [row({ id: 'a', body: PAYMENT_RECEIVED_MSG.de }), row({ id: 'b', status: 'QUEUED', meta: { paymentConfirmation: true }, body: 'Zahlung erhalten.\n\nBitte fülle ...' })];
    expect(confirmationAlreadyOut(msgs, { exceptId: 'b' })).toBe(true);
  });
  it('a confirmation still waiting in the queue counts for the other door', () => {
    const msgs = [row({ id: 'b', status: 'QUEUED', meta: { paymentConfirmation: true } })];
    expect(confirmationAlreadyOut(msgs, { includePending: true })).toBe(true);
    expect(confirmationAlreadyOut(msgs)).toBe(false);
  });
  it('nothing older than two days counts', () => {
    expect(confirmationAlreadyOut([row({ body: PAYMENT_RECEIVED_MSG.en, createdAt: new Date(now - 3 * 86400_000).toISOString() })])).toBe(false);
  });
});

function input(history: EngineInput['history'], paid: boolean): EngineInput {
  return {
    ctx: { name: 'Lena', state: paid ? 'FORM_PENDING' : 'PAYMENT_PENDING', income: 'TFN', paid, formComplete: false, missingDocs: [], estimatedRefundCents: null, lang: 'de', knowledge: [], decisionMode: 'will' },
    guard: { aiPaused: false, killSwitch: false, optedOut: false, isLegacy: false, lastCustomerMsgAt: new Date() },
    history, mode: 'FULL_AUTO', bank: { bsb: '062692', account: '81049952' }, decisionMode: 'will',
  };
}

it('Will does not write a second confirmation for a customer already told', async () => {
  decideMock.mockResolvedValue({ action: 'reply', confidence: 1, reply_text: PAYMENT_RECEIVED_MSG.de } as never);
  const out = await runEngine(input([{ role: 'assistant', text: PAYMENT_RECEIVED_MSG.de }, { role: 'customer', text: 'Ist überwiesen' }], true));
  expect(out.kind).toBe('silent');
});

describe('the review link', () => {
  it('Will picks it and the customer gets the thanks and the link', async () => {
    decideMock.mockResolvedValue({ action: 'reply', confidence: 1, reply_text: 'x', approved_key: 'review_link' } as never);
    const out = await runEngine({ ...input([{ role: 'assistant', text: 'Your tax return has been lodged successfully! ✅' }, { role: 'customer', text: 'Thank you so much! My tax return has come through. Is there a link I can leave you a review? ☺️' }], true), ctx: { ...input([], true).ctx, lang: 'en', state: 'COMPLETED' } });
    expect(out.replyText).toMatch(/^Thank you so much, that means a lot to us! 😊 Here's the link: https:\/\//);
  });
  it('passes the guard in all three languages', () => {
    for (const lang of ['en', 'de', 'ja']) {
      const line = renderApproved('review_link', { state: 'COMPLETED', lang, firstName: null, firstContact: false, lastWillText: '', foreign: false })!;
      const v = policyGuard(line, { state: 'COMPLETED', paid: true, aiPaused: false, killSwitch: false, optedOut: false, isLegacy: false, lastCustomerMsgAt: new Date(), isApprovedTemplate: true, estimateFromTeam: null });
      expect({ lang, v: v.violations }).toEqual({ lang, v: [] });
    }
  });
});
