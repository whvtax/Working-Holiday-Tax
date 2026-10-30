/**
 * 30 Oct 2026: (5) one confirmation per kind, the questionnaire line only with a
 * form in the system; (6) every outgoing link repaired; plus the pure helpers
 * (state machine, URL repair, "send it as text" line). No production data.
 */
const store = {
  addMessage: jest.fn(),
  setMessageStatus: jest.fn(),
  attachProviderId: jest.fn(),
  markCustomerRead: jest.fn(),
  audit: jest.fn(),
  addTask: jest.fn(),
  getSetting: jest.fn().mockResolvedValue(undefined),
  listMessages: jest.fn().mockResolvedValue([]),
  getCustomerById: jest.fn(),
};
jest.mock('@/lib/will/store', () => ({ getStore: () => store }));

import { deliverOut } from '@/lib/will/channel';
import type { CustomerRow } from '@/lib/will/store';
import { systemMessageKind, sameKindAlreadyOut, QUESTIONNAIRE_RECEIVED_RE } from '@/lib/will/system-message-guard';
import { repairBrandUrls, hasBrokenBrandUrl } from '@/lib/will/text-normalize';
import { canTransition } from '@/lib/will/state-machine';
import { textOnlyAsk, needsTextOnlyAsk, TEXT_ONLY_ASK } from '@/lib/will/text-only-reply';
import { PAYMENT_RECEIVED_MSG, FORM_RECEIVED_MSG } from '@/lib/will/i18n';
import { mentionsPaymentReceived } from '@/lib/will/payment-confirmation';

const customer = (over: Partial<CustomerRow> = {}) => ({ id: 'c1', waId: '61400000001', name: 'Alex', optedOut: false, lang: 'en', ...over } as CustomerRow);
const sent = (body: string, minutesAgo: number, meta?: Record<string, unknown>) => ({
  id: `m${minutesAgo}`, direction: 'OUT' as const, status: 'SENT' as const, body, meta, createdAt: new Date(Date.now() - minutesAgo * 60_000).toISOString(),
});

beforeEach(() => {
  for (const fn of Object.values(store)) (fn as jest.Mock).mockReset();
  store.addMessage.mockResolvedValue({ id: 'new' });
  store.setMessageStatus.mockResolvedValue(undefined);
  store.attachProviderId.mockResolvedValue(undefined);
  store.markCustomerRead.mockResolvedValue(undefined);
  store.audit.mockResolvedValue(undefined);
  store.addTask.mockResolvedValue({ id: 't1' });
  store.listMessages.mockResolvedValue([]);
  store.getSetting.mockResolvedValue(undefined);
  store.getCustomerById.mockResolvedValue({ id: 'c1', formComplete: true });
  delete process.env.WHATSAPP_TOKEN;
  delete process.env.WHATSAPP_PHONE_NUMBER_ID;
});

describe('5. one "Payment received" per payment (deliverOut)', () => {
  it('a second confirmation one minute after the first is skipped, even when worded differently', async () => {
    store.listMessages.mockResolvedValue([sent(PAYMENT_RECEIVED_MSG.en, 1)]);
    const res = await deliverOut(customer(), 'Payment received, thanks Sam!\n\nhttps://workingholidaytax.com.au/start', 'AI');
    expect(res).toEqual({ ok: true, error: 'already sent, skipped' });
    expect(store.addMessage).not.toHaveBeenCalled();
  });
  it('the Meta template version counts as the same confirmation', async () => {
    store.listMessages.mockResolvedValue([sent('Zahlung erhalten.\n\nBitte füll das Formular aus.', 2, { paymentConfirmation: true })]);
    const res = await deliverOut(customer(), PAYMENT_RECEIVED_MSG.en, 'AI', { paymentConfirmation: true });
    expect(res.error).toBe('already sent, skipped');
  });
  it('a confirmation three days later (another payment) is sent', async () => {
    store.listMessages.mockResolvedValue([sent(PAYMENT_RECEIVED_MSG.en, 3 * 24 * 60)]);
    const res = await deliverOut(customer(), PAYMENT_RECEIVED_MSG.en.replace('/start', '/start?x=1'), 'AI');
    expect(res.error).toBeUndefined();
    expect(store.addMessage).toHaveBeenCalled();
  });
  it('a person can still send it on purpose', async () => {
    store.listMessages.mockResolvedValue([sent(PAYMENT_RECEIVED_MSG.en, 1)]);
    const res = await deliverOut(customer(), 'Payment received, thanks!\n\nhttps://workingholidaytax.com.au/start', 'HUMAN');
    expect(res.error).toBeUndefined();
  });
});

describe('5. the questionnaire confirmation (deliverOut)', () => {
  const ACK = FORM_RECEIVED_MSG.en;
  it('twice within the window: the second is skipped', async () => {
    store.listMessages.mockResolvedValue([sent(ACK, 1)]);
    expect((await deliverOut(customer(), ACK, 'AI')).error).toBe('already sent, skipped');
  });
  it('no form submission in the system: not sent', async () => {
    store.getCustomerById.mockResolvedValue({ id: 'c1', formComplete: false });
    const res = await deliverOut(customer(), ACK, 'AI');
    expect(res.error).toMatch(/no form submission/);
    expect(store.addMessage).not.toHaveBeenCalled();
    expect(store.audit).toHaveBeenCalledWith('channel', 'questionnaire_confirmation_blocked_no_form', expect.anything());
  });
  it('form in the system: sent', async () => {
    const res = await deliverOut(customer(), ACK, 'AI');
    expect(res.error).toBeUndefined();
    expect(store.addMessage).toHaveBeenCalled();
  });
  it('an ordinary reply is untouched', async () => {
    store.getCustomerById.mockResolvedValue({ id: 'c1', formComplete: false });
    const res = await deliverOut(customer(), 'Yes, you can send the passport photo here.', 'AI');
    expect(res.error).toBeUndefined();
  });
});

describe('kind detection', () => {
  it('payment confirmation in every language, questionnaire in every language', () => {
    for (const t of Object.values(PAYMENT_RECEIVED_MSG)) expect(systemMessageKind(t)).toBe('payment_received');
    for (const t of Object.values(FORM_RECEIVED_MSG)) expect(systemMessageKind(t)).toBe('questionnaire_received');
  });
  it('conditionals and ordinary text are not confirmations', () => {
    expect(systemMessageKind("Once we've received your questionnaire we will message you.")).toBeNull();
    expect(QUESTIONNAIRE_RECEIVED_RE.test('Please fill in the form.')).toBe(false);
    expect(systemMessageKind('Payment received isn\'t showing yet, can you send the receipt?')).toBeNull();
  });
  it('sameKindAlreadyOut honours the window and ignores unsent rows', () => {
    const old = sent(FORM_RECEIVED_MSG.en, 300);
    expect(sameKindAlreadyOut([old], 'questionnaire_received')).toBe(false);
    expect(sameKindAlreadyOut([{ ...sent(FORM_RECEIVED_MSG.en, 1), status: 'FAILED' as never }], 'questionnaire_received')).toBe(false);
    expect(sameKindAlreadyOut([sent(FORM_RECEIVED_MSG.en, 1)], 'questionnaire_received')).toBe(true);
  });
  it('mentionsPaymentReceived: own words yes, denials and conditionals no', () => {
    expect(mentionsPaymentReceived('Payment received, thank you!')).toBe(true);
    expect(mentionsPaymentReceived("We've received your payment.")).toBe(true);
    expect(mentionsPaymentReceived('Zahlung erhalten.')).toBe(true);
    expect(mentionsPaymentReceived("We haven't received your payment yet.")).toBe(false);
    expect(mentionsPaymentReceived('Once payment is received we send the form.')).toBe(false);
    expect(mentionsPaymentReceived('No worries, take your time.')).toBe(false);
  });
});

describe('6. every outgoing link carries the brand domain', () => {
  it('repairs workingholidaytax.com without .au, keeps correct links, swaps a retired slug', () => {
    expect(repairBrandUrls('Form: https://workingholidaytax.com/start')).toBe('Form: https://workingholidaytax.com.au/start');
    expect(repairBrandUrls('Form: workingholidaytax.com/start.')).toBe('Form: workingholidaytax.com.au/start.');
    expect(repairBrandUrls('https://workingholidaytax.com.au/start')).toBe('https://workingholidaytax.com.au/start');
    expect(repairBrandUrls('Https://workingholidaytax.com.au/tax-form')).toBe('Https://workingholidaytax.com.au/start');
    expect(repairBrandUrls('info@workingholidaytax.com.au')).toBe('info@workingholidaytax.com.au');
    expect(repairBrandUrls('see /tax-form-info')).toBe('see /tax-form-info');
    expect(hasBrokenBrandUrl('https://workingholidaytax.com/x')).toBe(true);
    expect(hasBrokenBrandUrl('https://workingholidaytax.com.au/start')).toBe(false);
  });
  it('deliverOut repairs the stored and sent text, for a draft and for a person', async () => {
    for (const author of ['AI', 'HUMAN'] as const) {
      store.addMessage.mockClear();
      await deliverOut(customer(), 'Please fill https://workingholidaytax.com/start', author);
      expect(store.addMessage.mock.calls[0][0].body).toBe('Please fill https://workingholidaytax.com.au/start');
    }
  });
});

describe('3. a verified payment can reach PAID from any sales state', () => {
  it.each(['NEW_LEAD', 'QUALIFIED', 'PRICE_SENT', 'PAYMENT_PENDING'] as const)('%s -> PAID', (s) => {
    expect(canTransition(s, 'PAID')).toBe(true);
  });
  it('closed and later states are unchanged', () => {
    expect(canTransition('NEW_LEAD', 'LODGED')).toBe(false);
    expect(canTransition('PAID', 'PAID')).toBe(false);
    expect(canTransition('NOT_INTERESTED', 'PAID')).toBe(false);
  });
});

describe('2. unsupported message types get one line, in their language', () => {
  it('a line for every language, no dash, a question', () => {
    for (const [lang, line] of Object.entries(TEXT_ONLY_ASK)) {
      expect(textOnlyAsk(lang)).toBe(line);
      expect(line).not.toMatch(/[—–―-]/);
      expect(line).toMatch(/[?？]$/);
    }
    expect(textOnlyAsk('en')).toBe('Could you send that as a text message?');
    expect(textOnlyAsk('xx')).toBe('Could you send that as a text message?');
    expect(textOnlyAsk(null)).toBe('Could you send that as a text message?');
  });
  it('voice, sticker and 131051 qualify; photos, documents, reactions and deleted messages do not', () => {
    expect(needsTextOnlyAsk({ media: { kind: 'audio' } })).toBe(true);
    expect(needsTextOnlyAsk({ media: { kind: 'voice' } })).toBe(true);
    expect(needsTextOnlyAsk({ media: { kind: 'sticker' } })).toBe(true);
    expect(needsTextOnlyAsk({ undecoded: { type: 'unsupported', errorCode: 131051 } })).toBe(true);
    expect(needsTextOnlyAsk({})).toBe(true);
    expect(needsTextOnlyAsk({ media: { kind: 'image' } })).toBe(false);
    expect(needsTextOnlyAsk({ media: { kind: 'document' } })).toBe(false);
    expect(needsTextOnlyAsk({ reaction: true })).toBe(false);
    expect(needsTextOnlyAsk({ undecoded: { type: 'revoke' }, revoked: true })).toBe(false);
    expect(needsTextOnlyAsk({ undecoded: { type: 'edit' } })).toBe(false);
  });
});

describe('6. the Xero link advice (Jo, 30 Oct: the temporary password is allowed)', () => {
  it('the Library seed gives the temporary password, the reset route and the screenshot fallback', async () => {
    const { readFileSync } = await import('fs');
    const src = readFileSync(require('path').join(__dirname, '..', 'knowledge-seed.ts'), 'utf8');
    expect(src).toContain('Xero may have created your account automatically. Try the password 123456789.');
    expect(src).toContain('Forgot password');
    expect(src).toContain('send me a screenshot');
  });
});
