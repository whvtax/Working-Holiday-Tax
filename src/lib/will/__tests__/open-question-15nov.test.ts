import { openCustomerQuestion, followUpBlock } from '../followup-gate-30oct';

type M = { direction: 'IN' | 'OUT'; author: 'CUSTOMER' | 'AI' | 'HUMAN' | 'SYSTEM'; status: 'SENT'; body: string; createdAt: string; meta?: Record<string, unknown> };
const cust = { paid: false, state: 'NEW', outcome: null, estimatedRefundCents: null } as never;
const inMsg = (body: string, t: number): M => ({ direction: 'IN', author: 'CUSTOMER', status: 'SENT', body, createdAt: `2026-11-10T00:${String(t).padStart(2, '0')}:00Z` });
const will = (body: string, t: number, author: 'AI' | 'HUMAN' | 'SYSTEM' = 'AI', meta?: M['meta']): M => ({ direction: 'OUT', author, status: 'SENT', body, createdAt: `2026-11-10T00:${String(t).padStart(2, '0')}:00Z`, meta });

describe('15 Nov: an unanswered customer question blocks automatic nudges', () => {
  test('a question with no reply is open and blocks a pre-payment nudge', () => {
    const msgs = [will('Hi! Quick question: TFN only or ABN too?', 1), inMsg('How much is it?', 2)];
    expect(openCustomerQuestion(msgs)).toBe('How much is it?');
    expect(followUpBlock(cust, 'prePayment', msgs)?.block).toMatch(/asked a question nobody has answered yet/);
  });

  test('a human reply after the question closes it', () => {
    const msgs = [inMsg('How much is it?', 1), will('It is $220 for TFN only.', 2, 'HUMAN')];
    expect(openCustomerQuestion(msgs)).toBeNull();
    expect(followUpBlock(cust, 'prePayment', msgs)).toBeNull();
  });

  test('an automatic nudge after the question does not count as an answer', () => {
    const msgs = [inMsg('Does this include a video call?', 1), will('Hi, still interested?', 2, 'AI', { waTemplate: { name: 'fu_pre_24h' } })];
    expect(openCustomerQuestion(msgs)).toBe('Does this include a video call?');
  });

  test('a plain statement is not a question', () => {
    const msgs = [will('Quick question: TFN only?', 1), inMsg('Yes TFN only, thanks', 2)];
    expect(openCustomerQuestion(msgs)).toBeNull();
  });

  test('a thank-you after a question is not an open question', () => {
    const msgs = [inMsg('Is it free?', 1), will('It is not free, the fee is $220.', 2, 'AI'), inMsg('Thanks', 3)];
    expect(openCustomerQuestion(msgs)).toBeNull();
  });
});
