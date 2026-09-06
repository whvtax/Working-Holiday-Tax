/**
 * audit3 core-15: ONE task per rejected send, in the caller's words.
 *
 * deliverOut already raised "WhatsApp send failed: ..." on every non-retryable
 * rejection. The payment confirmation then added a second task for the same
 * failure ("PAID, BUT THEY HAVE NOT BEEN TOLD"), and the autopilot reply path
 * called raiseOrUpdateTask, which found deliverOut's fresh card and overwrote
 * it. Jo saw two cards per customer with the same reply, and Clear all counted
 * them twice.
 *
 * Now deliverOut takes an optional `onFailure` and writes its single task with
 * that wording; the two callers in service.ts pass it and raise nothing else.
 */
import fs from 'node:fs';
import path from 'node:path';

const store = {
  addMessage: jest.fn(),
  setMessageStatus: jest.fn(),
  attachProviderId: jest.fn(),
  markCustomerRead: jest.fn(),
  audit: jest.fn(),
  addTask: jest.fn(),
  getSetting: jest.fn(),
};
jest.mock('@/lib/will/store', () => ({ getStore: () => store }));

import { deliverOut } from '@/lib/will/channel';
import type { CustomerRow } from '@/lib/will/store';

const customer = { id: 'c1', waId: '61400000001', name: 'Alex', optedOut: false, lang: null } as CustomerRow;

const realFetch = global.fetch;
beforeEach(() => {
  for (const fn of Object.values(store)) (fn as jest.Mock).mockReset();
  store.addMessage.mockResolvedValue({ id: 'm1' });
  store.setMessageStatus.mockResolvedValue(undefined);
  store.audit.mockResolvedValue(undefined);
  store.addTask.mockResolvedValue({ id: 't1' });
  store.getSetting.mockImplementation(async (key: string) =>
    key === 'wa_access_token' ? 'tok' : key === 'wa_phone_number_id' ? '123' : undefined);
});
afterEach(() => { global.fetch = realFetch; });

const metaRejects = (code: number, status = 400) => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: false, status,
    json: async () => ({ error: { code, message: 'nope' } }),
  }) as unknown as typeof fetch;
};

describe('deliverOut with onFailure', () => {
  it('raises exactly one task, with the caller wording, severity and context', async () => {
    metaRejects(131047);
    const res = await deliverOut(customer, 'Payment received, thank you', 'AI', undefined, undefined, {
      onFailure: { reason: (e) => `PAID, BUT THEY HAVE NOT BEEN TOLD: ${e ?? 'unknown error'}`, severity: 'URGENT', context: 'the receipt' },
    });
    expect(res.ok).toBe(false);
    expect(store.addTask).toHaveBeenCalledTimes(1);
    const t = store.addTask.mock.calls[0][0];
    expect(t.reason).toMatch(/^PAID, BUT THEY HAVE NOT BEEN TOLD: /);
    expect(t.reason).not.toContain('WhatsApp send failed');
    expect(t.severity).toBe('URGENT');
    expect(t.context).toBe('the receipt');
    expect(t.suggestedReply).toBe('Payment received, thank you');
  });

  it('keeps the generic wording when no onFailure is given', async () => {
    metaRejects(131047);
    await deliverOut(customer, 'hello', 'AI');
    expect(store.addTask).toHaveBeenCalledTimes(1);
    expect(store.addTask.mock.calls[0][0].reason).toMatch(/^WhatsApp send failed: /);
    expect(store.addTask.mock.calls[0][0].severity).toBe('REVIEW');
  });

  it('a throttle still raises no task, whatever the caller passed', async () => {
    metaRejects(130429, 429);
    const res = await deliverOut(customer, 'hello', 'AI', undefined, undefined, {
      onFailure: { reason: 'should not appear', severity: 'URGENT' },
    });
    expect(res.retryable).toBe(true);
    expect(store.addTask).not.toHaveBeenCalled();
  });
});

describe('service.ts hands its wording to deliverOut instead of adding a second card', () => {
  const src = fs.readFileSync(path.join(__dirname, '..', 'service.ts'), 'utf8');

  it('the payment confirmation passes its task through onFailure and does not addTask on a rejection', () => {
    const i = src.indexOf('PAID, BUT THEY HAVE NOT BEEN TOLD');
    expect(i).toBeGreaterThan(0);
    // The wording lives inside the deliverOut call.
    const before = src.slice(Math.max(0, i - 400), i);
    expect(before).toContain('deliverOut(customer, confirmation');
    expect(before).toContain('onFailure');
    // And only once in the file: no separate addTask with the same reason.
    expect(src.split('PAID, BUT THEY HAVE NOT BEEN TOLD').length).toBe(2);
  });

  it('the autopilot reply passes its task through onFailure and no longer overwrites the card', () => {
    const i = src.indexOf("Will's reply was not delivered");
    expect(i).toBeGreaterThan(0);
    const before = src.slice(Math.max(0, i - 400), i);
    expect(before).toContain('deliverOut(customer, outcome.replyText');
    expect(before).toContain('onFailure');
    const after = src.slice(i, i + 800);
    expect(after).not.toContain('raiseOrUpdateTask');
  });
});
