/**
 * End to end on the real file store (Jo, 25 Oct): closed leads 30+ days old,
 * one pass, the model and WhatsApp mocked. Checks the real store writes:
 * states, the winbacks settings row, and the state history.
 */
import os from 'os';
import path from 'path';
import { mkdtempSync } from 'fs';

const dir = mkdtempSync(path.join(os.tmpdir(), 'winback-it-'));
const cwd = process.cwd;
jest.spyOn(process, 'cwd').mockImplementation(() => dir);
const decideWinback = jest.fn();
jest.mock('@/lib/will/claude', () => ({ decideWinback: (...a: unknown[]) => decideWinback(...a) }));
jest.mock('@/lib/will/ai-budget', () => ({ aiBudgetExhausted: async () => false }));
const deliverOut = jest.fn(async () => ({ ok: true }));
jest.mock('@/lib/will/channel', () => ({ deliverOut: (...a: unknown[]) => deliverOut(...(a as [])) }));
jest.mock('@/lib/will/config', () => ({ ...jest.requireActual('@/lib/will/config'), withinQuietHours: () => true }));

afterAll(() => { (process.cwd as jest.Mock).mockRestore?.(); void cwd; });

it('a real pass over the file store', async () => {
  const { getStore } = await import('@/lib/will/store');
  const { runWinbackPass } = await import('@/lib/will/winback-auto');
  const store = getStore();
  const old = new Date(Date.now() - 40 * 86400_000).toISOString();
  const mk = async (wa: string, name: string, state: 'WENT_COLD' | 'NOT_INTERESTED' | 'NOT_RELEVANT') => {
    const c = await store.createCustomer({ waId: wa, name } as never);
    await store.addMessage({ customerId: c.id, direction: 'IN', author: 'CUSTOMER', status: 'SENT', body: 'How much is it?' } as never);
    await store.setState(c.id, 'PRICE_SENT', 'AI');
    await store.setState(c.id, state, 'SYSTEM');
    await store.updateCustomer(c.id, { lastMessageAt: old, lastCustomerMsgAt: old } as never);
    return c.id;
  };
  const spam = await mk('61400000001', 'Spam Co', 'NOT_RELEVANT');
  const gone = await mk('61400000002', 'Tom Jones', 'NOT_INTERESTED');
  const send = await mk('61400000003', 'Lena Muller', 'WENT_COLD');
  decideWinback.mockImplementation(async (ev: { label: string }) => (/Tom/.test(ev.label)
    ? { decision: 'never', reason: 'Lodged with another agent.', message: null, confidence: 0.9 }
    : { decision: 'send', reason: 'Went quiet after the price.', message: 'Last time you asked about the price and then got busy. Would you still like us to take care of your return?', confidence: 0.8 }));

  const s = await runWinbackPass(Date.now(), 60_000);
  expect(s.sent).toBe(1);
  expect((await store.getCustomerById(spam))!.state).toBe('FINAL');
  expect((await store.getCustomerById(gone))!.state).toBe('FINAL');
  expect((await store.getCustomerById(gone))!.previousState).toBe('PRICE_SENT');
  expect((await store.getCustomerById(send))!.state).toBe('WENT_COLD');
  const wb = (await store.getSetting('winbacks')) as Record<string, { sentAt?: string; decision?: string; finalWhy?: string }>;
  expect(wb[send].sentAt).toBeTruthy();
  expect(wb[gone].finalWhy).toBe('never');
  expect(wb[spam].finalWhy).toBe('not_relevant');

  // A second pass the same day sends nothing new and changes nothing.
  deliverOut.mockClear();
  const s2 = await runWinbackPass(Date.now(), 60_000);
  expect(s2.sent).toBe(0);
  expect(deliverOut).not.toHaveBeenCalled();
});
