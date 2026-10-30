/**
 * Full audit, 11 Oct 2026, decision 8: what the team and the customer say
 * moves the board. Alex (45 "stuck" tasks after a hand-typed "payment
 * received"), Naatt ("not paid" three weeks after paying), Johanna / em /
 * Pippa / Kana (signature reminders after "lodged"), Abbas (a sales nudge
 * after "Don't write me"), a vendor (four sales templates), Luke (moved to
 * Paid because Will wrote "Payment received!" himself).
 */
import { teamConfirmsPayment, teamSaysLodged, customerNotInterested, looksLikeVendor } from '@/lib/will/stage-sync';
import { runEngine, EngineInput } from '@/lib/will/engine';
import { APPROVED } from '@/lib/will/approved-messages';
import { readFileSync } from 'fs';
import { join } from 'path';

jest.mock('@/lib/will/claude', () => ({ decide: jest.fn() }));
import { decide } from '@/lib/will/claude';
const decideMock = decide as jest.MockedFunction<typeof decide>;
beforeEach(() => decideMock.mockReset());

describe('1. the team confirms a payment, any wording', () => {
  it.each(['Payment received, thanks!', 'Got your payment, thank you 😊', 'Thanks, the transfer has come through.', 'Zahlung erhalten, danke!', 'お支払いを確認しました。', 'Pago recibido, gracias.'])('confirms: %s', (t) => expect(teamConfirmsPayment(t)).toBe(true));
  it.each(['Once the payment is received we start.', "We haven't received your payment yet.", 'Payment will be confirmed when it arrives.', 'Zahlung noch nicht eingegangen.', 'Here are the payment details: BSB 062692'])('does not: %s', (t) => expect(teamConfirmsPayment(t)).toBe(false));
});

describe('3. the team says it is lodged', () => {
  it.each(['Your return has been lodged with the ATO.', 'All done, lodged it this morning!', 'Return is lodged, the NOA comes in about two weeks.', 'Deine Steuererklärung wurde eingereicht.', '申告を提出しました。'])('lodged: %s', (t) => expect(teamSaysLodged(t)).toBe(true));
  it.each(["We'll lodge it once you sign.", 'Ready to be lodged after your signature.', "It hasn't been lodged yet.", 'Lodging is your legal obligation.'])('not yet: %s', (t) => expect(teamSaysLodged(t)).toBe(false));
});

describe('4. the customer closes the door', () => {
  it.each(['Not interested, thanks', "Don't write me", 'I found someone cheaper', 'I already lodged it myself', 'Changed my mind', 'this looks like a scam', 'Nicht mehr interessiert', 'No me interesa', '自分で提出しました'])('closes: %s', (t) => expect(customerNotInterested(t)).toBe(true));
  it.each(['Not sure yet, is it 220 for everything?', 'TFN please', 'I was interested in the ABN option', 'Can I pay later?'])('does not close: %s', (t) => expect(customerNotInterested(t)).toBe(false));
});

describe('5. a vendor is not a customer', () => {
  it('a social-media agency pitch', () => {
    expect(looksLikeVendor('Hi! We are a social media marketing agency and we can help you increase your leads and followers. Free audit for your business!')).toBe(true);
  });
  it('a backpacker who mentions a company is a customer', () => {
    expect(looksLikeVendor('Hi, I worked for a marketing agency on an ABN, can you do my tax return?')).toBe(false);
  });
});

describe('2. Will never confirms a payment the customer did not report', () => {
  it('Luke: the confirmation is stripped and the stage stays', async () => {
    decideMock.mockResolvedValueOnce({ action: 'reply', reply_text: "I'm sorry to hear that, take your time. Payment received!\n\nPlease fill out this quick form so we can start reviewing your situation.\n\nhttps://workingholidaytax.com.au/start", new_state: 'PAID', confidence: 0.9 });
    const input: EngineInput = {
      ctx: { name: 'Luke', state: 'PRICE_SENT', income: 'TFN', paid: false, formComplete: false, missingDocs: [], estimatedRefundCents: null, lang: 'en', knowledge: [] },
      guard: { aiPaused: false, killSwitch: false, optedOut: false, isLegacy: false, lastCustomerMsgAt: new Date() },
      history: [{ role: 'assistant', text: APPROVED.price_tfn }, { role: 'customer', text: "Sorry, my grandmother passed away this week, I'll sort the transfer when I'm back." }],
      mode: 'FULL_AUTO', bank: { bsb: '062692', account: '81049952' },
    };
    const out = await runEngine(input);
    expect(out.kind).not.toBe('sent');
    expect(out.newState).not.toBe('PAID');
    if (out.kind === 'queued') {
      expect(out.replyText).not.toMatch(/payment received|tax-form/i);
    }
  });
});

describe('6. a date the lead named pauses the sales nudges; wiring', () => {
  const service = readFileSync(join(__dirname, '..', 'service.ts'), 'utf8');
  const scheduler = readFileSync(join(__dirname, '..', 'scheduler.ts'), 'utf8');
  const actions = readFileSync(join(__dirname, '..', '..', '..', 'app', 'api', 'will', 'actions', 'route.ts'), 'utf8');
  it('ingest: not interested / vendor / promised date', () => {
    expect(service).toMatch(/customerNotInterested\(text\)/);
    expect(service).toMatch(/setState\(customer\.id, 'NOT_INTERESTED', 'SYSTEM'\)/);
    expect(service).toMatch(/looksLikeVendor\(text\)/);
    expect(service).toMatch(/salesPromisedKey\(customer\.id\)/);
  });
  it('scheduler: the pre-payment flow honours the promised date', () => {
    expect(scheduler).toMatch(/flow === 'form' \|\| flow === 'prePayment'/);
    expect(scheduler).toMatch(/sales_nudge_deferred_promised_date/);
  });
  it('actions: a team "payment received" or "lodged" moves the stage', () => {
    expect(actions).toMatch(/teamConfirmsPayment\(body\)/);
    expect(actions).toMatch(/teamSaysLodged\(body\)/);
    expect(actions).toMatch(/setState\(customer\.id, 'LODGED', 'HUMAN'\)/);
  });
});
