/**
 * 30 Oct 2026: (4) "Payment received" only after a payment, (5) the
 * questionnaire confirmation only when the form is in, and (7) a thank-you is
 * always answered, in the customer's language, after a handoff too.
 * No production data: every sentence is written for the test.
 */
jest.mock('@/lib/will/claude', () => ({ ...jest.requireActual('@/lib/will/claude'), decide: jest.fn() }));
import { decide } from '@/lib/will/claude';
import { runEngine, EngineInput } from '@/lib/will/engine';
const decideMock = decide as jest.MockedFunction<typeof decide>;

const LINK = 'https://workingholidaytax.com.au/start';
const CONFIRM = `Payment received.\n\nPlease fill out this quick form so we can start reviewing your situation.\n\nOnce you've submitted it, we'll go through everything and get back to you within 24 hours.\n\n${LINK}`;

const input = (o: { state: string; paid: boolean; text: string; formComplete?: boolean; lastWill?: string; lang?: string }): EngineInput => ({
  ctx: { name: 'Sam', state: o.state, income: 'TFN', paid: o.paid, formComplete: o.formComplete ?? o.paid, missingDocs: [], estimatedRefundCents: null, lang: o.lang ?? 'en', knowledge: [], decisionMode: 'will' } as never,
  guard: { aiPaused: false, killSwitch: false, optedOut: false, isLegacy: false, lastCustomerMsgAt: new Date() },
  history: [{ role: 'assistant', text: o.lastWill ?? 'Great! Here are the payment details.' }, { role: 'customer', text: o.text }],
  mode: 'FULL_AUTO', bank: { bsb: '062692', account: '81049952' }, decisionMode: 'will',
});

beforeEach(() => decideMock.mockReset());

describe('4. no "Payment received" without a payment', () => {
  it.each([
    ["I'll pay next week"],
    ['my bank is calling back'],
    ["I'm not able to confirm the payment"],
  ])('%s', async (text) => {
    decideMock.mockResolvedValue({ action: 'reply', reply_text: CONFIRM, new_state: 'PAID', confidence: 1 } as never);
    const out = await runEngine(input({ state: 'PRICE_SENT', paid: false, text }));
    expect(out.newState).not.toBe('PAID');
    expect(out.replyText ?? '').not.toMatch(/payment received/i);
    expect(out.replyText ?? '').not.toContain('/start');
  });

  it('own-words variants are removed too, the rest of the reply stays', async () => {
    decideMock.mockResolvedValue({ action: 'reply', reply_text: `No problem at all, take your time.\n\nPayment received, thank you!\n\n${LINK}`, new_state: 'PAID', confidence: 1 } as never);
    const out = await runEngine(input({ state: 'PRICE_SENT', paid: false, text: "I'll pay next week" }));
    expect(out.replyText).toMatch(/take your time/);
    expect(out.replyText).not.toMatch(/payment received/i);
    expect(out.replyText).not.toContain('/start');
    expect(out.newState).not.toBe('PAID');
  });

  it('a payment that WAS reported keeps its confirmation', async () => {
    decideMock.mockResolvedValue({ action: 'reply', reply_text: CONFIRM, new_state: 'PAID', confidence: 1 } as never);
    const out = await runEngine(input({ state: 'PRICE_SENT', paid: false, text: 'I have paid' }));
    expect(out.replyText).toMatch(/payment received/i);
  });

  it('NEW_LEAD -> PAID is no longer an invalid transition when the customer reports a payment', async () => {
    decideMock.mockResolvedValue({ action: 'reply', reply_text: CONFIRM, new_state: 'PAID', confidence: 1 } as never);
    const out = await runEngine(input({ state: 'NEW_LEAD', paid: false, text: 'all paid :)' }));
    expect(out.invalidTransition).toBeFalsy();
    expect(out.kind).not.toBe('human_task');
  });
});

describe('5. the questionnaire confirmation needs a form, and never answers a question', () => {
  const RECEIVED = "Great, we've received your questionnaire! ✅\nWe'll now go through everything and get back to you soon.";
  it('not submitted: the line is removed, the answer stays', async () => {
    decideMock.mockResolvedValue({ action: 'reply', reply_text: `${RECEIVED}\n\nYes, you can send the passport photo here in the chat.`, confidence: 1 } as never);
    const out = await runEngine(input({ state: 'FORM_PENDING', paid: true, formComplete: false, text: 'Can I send my passport photo here?' }));
    expect(out.replyText).toMatch(/passport photo here/);
    expect(out.replyText).not.toMatch(/received your questionnaire/i);
  });
  it('not submitted and nothing else to say: no false confirmation goes out', async () => {
    decideMock.mockResolvedValue({ action: 'reply', reply_text: RECEIVED, confidence: 1 } as never);
    const out = await runEngine(input({ state: 'FORM_PENDING', paid: true, formComplete: false, text: 'I think I filled it in yesterday' }));
    expect(out.replyText ?? '').not.toMatch(/received your questionnaire/i);
  });
  it('submitted but the message is a question: the question is answered, not confirmed', async () => {
    decideMock.mockResolvedValue({ action: 'reply', reply_text: `${RECEIVED}\n\nIt usually takes a day or two to go through everything.`, confidence: 1 } as never);
    const out = await runEngine(input({ state: 'FORM_COMPLETE', paid: true, formComplete: true, text: 'How long will it take?' }));
    expect(out.replyText).toMatch(/day or two/);
    expect(out.replyText).not.toMatch(/received your questionnaire/i);
  });
  it('a conditional promise is not the confirmation', async () => {
    decideMock.mockResolvedValue({ action: 'reply', reply_text: "Once we've received your questionnaire, we'll go through everything and message you here.", confidence: 1 } as never);
    const out = await runEngine(input({ state: 'FORM_PENDING', paid: true, formComplete: false, text: 'what happens after the form?' }));
    expect(out.replyText).toMatch(/Once we've received your questionnaire/);
  });
});

describe('7. a thank-you is answered in every state, after a handoff too, in their language', () => {
  const HOLDING = "I've passed this to the team and they will come back to you here.";
  const cases: Array<[string, string, string, RegExp]> = [
    ['Thank you so much', 'en', 'en', /welcome|Anytime/i],
    ['ありがとうございます', 'ja', 'ja', /どういたしまして|いつでも/],
    ['Danke', 'de', 'de', /gerne|Jederzeit/i],
    ['ok alles klar danke noch mal', 'de', 'de', /gerne|Jederzeit/i],
  ];
  describe.each(['PAID', 'FORM_COMPLETE', 'UNDER_REVIEW', 'PRICE_SENT'])('stage %s', (state) => {
    it.each(cases)('%s (stored language %s)', async (text, lang) => {
      for (const action of ['wait', 'human_task']) {
        decideMock.mockResolvedValue({ action, confidence: 1, task_reason: 'x' } as never);
        const out = await runEngine(input({ state, paid: state !== 'PRICE_SENT', text, lang, lastWill: HOLDING }));
        expect([text, state, action, out.kind]).toEqual([text, state, action, expect.stringMatching(/queued|pending_approval/)]);
        expect(out.replyText).toMatch(cases.find((c) => c[0] === text)![3]);
      }
    });
  });
  it('a customer whose stored language is English but who wrote in Japanese gets Japanese', async () => {
    decideMock.mockResolvedValue({ action: 'human_task', confidence: 1, task_reason: 'x' } as never);
    const out = await runEngine(input({ state: 'PAID', paid: true, text: 'ありがとうございます', lang: 'en', lastWill: HOLDING }));
    expect(out.replyText).toMatch(/どういたしまして|いつでも/);
  });
  it('a thank-you with a question is still left to the model', async () => {
    decideMock.mockResolvedValue({ action: 'wait', confidence: 1 } as never);
    const out = await runEngine(input({ state: 'PAID', paid: true, text: 'Thanks! When will it be lodged?', lastWill: HOLDING }));
    expect(out.replyText).toBeUndefined();
  });
});

describe('6. the guarantee is dropped for a customer it does not cover, not turned into a handoff', () => {
  const G = "If your tax refund is less than our fee, we'll refund the difference. If there's no refund, our full fee applies.";
  it('an already-lodged review customer', async () => {
    decideMock.mockResolvedValue({ action: 'reply', reply_text: `Happy to help with that.\n\n${G}`, confidence: 1 } as never);
    const out = await runEngine(input({ state: 'PRICE_SENT', paid: false, text: 'I already lodged it but got a notice of debt' }));
    expect(out.kind).not.toBe('human_task');
    expect(out.replyText ?? '').not.toMatch(/refund the difference/);
  });
  it('an ordinary TFN customer keeps it', async () => {
    decideMock.mockResolvedValue({ action: 'reply', reply_text: `Happy to help with that.\n\n${G}`, confidence: 1 } as never);
    const out = await runEngine(input({ state: 'PRICE_SENT', paid: false, text: 'what if my refund is small?' }));
    expect(out.replyText ?? '').toMatch(/refund the difference/);
  });
});
