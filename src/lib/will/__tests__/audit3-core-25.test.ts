/**
 * audit3 core-25: one rejected send, one card on the board.
 *
 * deliverOut raises "WhatsApp send failed: ..." on every non-retryable
 * rejection, and three callers then raised a better-worded task for the same
 * failure right after it: the payment confirmation (service.ts), the Medicare
 * exemption line and the Google review ask (scheduler.ts). Jo saw two cards
 * per customer for one event, with different severities, the generic one
 * showing Meta's raw error.
 *
 * The fix is split across two mechanisms and this file pins BOTH ends
 * together, with the real deliverOut and the real fold:
 *   - service.ts hands its wording to deliverOut through `onFailure`, so the
 *     one task is written with the URGENT text in the first place
 *     (audit3-core-15 pins the wording);
 *   - the scheduler sites call raiseOrUpdateTask straight after deliverOut,
 *     which finds the card deliverOut just opened and rewrites it with the
 *     caller's reason, so the generic card never survives as a second one.
 */
import fs from 'node:fs';
import path from 'node:path';

type Task = { id: string; customerId: string; reason: string; severity: string; context: string | null; suggestedReply: string | null; status: string };
const tasks: Task[] = [];
const store = {
  addMessage: jest.fn(),
  setMessageStatus: jest.fn(),
  attachProviderId: jest.fn(),
  markCustomerRead: jest.fn(),
  audit: jest.fn(),
  getSetting: jest.fn(),
  addTask: jest.fn(async (t: Omit<Task, 'id' | 'status'>) => {
    const row = { ...t, id: `t${tasks.length + 1}`, status: 'OPEN' };
    tasks.push(row);
    return row;
  }),
  updateTask: jest.fn(async (id: string, patch: Partial<Task>) => {
    const row = tasks.find((t) => t.id === id);
    if (row) Object.assign(row, patch);
  }),
  findOpenTaskForCustomer: jest.fn(async (customerId: string) =>
    tasks.find((t) => t.customerId === customerId && t.status === 'OPEN') ?? null),
};
jest.mock('@/lib/will/store', () => ({ getStore: () => store }));

import { deliverOut } from '@/lib/will/channel';
import { raiseOrUpdateTask } from '@/lib/will/tasks';
import type { CustomerRow, Store } from '@/lib/will/store';

const foldStore = store as unknown as Pick<Store, 'addTask' | 'updateTask' | 'findOpenTaskForCustomer'>;

const customer = { id: 'c1', waId: '61400000001', name: 'Alex Smith', optedOut: false, lang: null, state: 'LODGED' } as CustomerRow;

const realFetch = global.fetch;
beforeEach(() => {
  tasks.length = 0;
  for (const fn of [store.addMessage, store.setMessageStatus, store.attachProviderId, store.markCustomerRead, store.audit, store.getSetting]) fn.mockReset();
  store.addTask.mockClear();
  store.updateTask.mockClear();
  store.findOpenTaskForCustomer.mockClear();
  store.addMessage.mockResolvedValue({ id: 'm1' });
  store.setMessageStatus.mockResolvedValue(undefined);
  store.audit.mockResolvedValue(undefined);
  store.getSetting.mockImplementation(async (key: string) =>
    key === 'wa_access_token' ? 'tok' : key === 'wa_phone_number_id' ? '123' : undefined);
  global.fetch = jest.fn().mockResolvedValue({
    ok: false, status: 400,
    json: async () => ({ error: { code: 131047, message: 'Re-engagement message' } }),
  }) as unknown as typeof fetch;
});
afterEach(() => { global.fetch = realFetch; });

describe('a scheduler site: deliverOut then raiseOrUpdateTask leaves ONE card, in the caller words', () => {
  it('the Medicare line', async () => {
    const body = 'Medicare exemption text';
    const out = await deliverOut(customer, body, 'AI', { waTemplate: { name: 'medicare' } });
    expect(out.ok).toBe(false);
    // deliverOut opened its safety-net card...
    expect(store.addTask).toHaveBeenCalledTimes(1);
    expect(tasks[0].reason).toMatch(/^WhatsApp send failed: /);
    // ...and the caller folds into it rather than adding a second one.
    await raiseOrUpdateTask(foldStore, customer, {
      reason: `The Medicare exemption message was not delivered: ${out.error ?? 'WhatsApp rejected it'}. If it needs the approved template, create "medicare" in WhatsApp Manager (no variables) and it sends itself next time.`,
      severity: 'REVIEW', newContext: body.slice(0, 300), suggestedReply: body,
    });
    expect(store.addTask).toHaveBeenCalledTimes(1);
    expect(store.updateTask).toHaveBeenCalledTimes(1);
    expect(tasks).toHaveLength(1);
    expect(tasks[0].reason).toMatch(/^The Medicare exemption message was not delivered/);
    expect(tasks[0].reason).not.toContain('WhatsApp send failed');
    expect(tasks[0].suggestedReply).toBe(body);
  });

  it('the review ask', async () => {
    const body = 'Review ask text';
    const out = await deliverOut(customer, body, 'AI');
    expect(out.ok).toBe(false);
    await raiseOrUpdateTask(foldStore, customer, {
      reason: 'The Google review ask could not be delivered: Alex has not written for over a day, so it needs the approved WhatsApp template "review_request", which does not exist yet in WhatsApp Manager. Create it there (no variables) and this sends itself next time.',
      severity: 'REVIEW', newContext: body.slice(0, 300), suggestedReply: body,
    });
    expect(tasks).toHaveLength(1);
    expect(tasks[0].reason).toMatch(/^The Google review ask could not be delivered/);
  });
});

describe('the three call sites are wired that way', () => {
  const scheduler = fs.readFileSync(path.join(__dirname, '..', 'scheduler.ts'), 'utf8');
  const service = fs.readFileSync(path.join(__dirname, '..', 'service.ts'), 'utf8');

  const between = (src: string, from: string, to: string) => {
    const a = src.indexOf(from);
    expect(a).toBeGreaterThan(-1);
    const b = src.indexOf(to, a);
    expect(b).toBeGreaterThan(a);
    return src.slice(a, b);
  };

  it('scheduler: Medicare and review failures fold with raiseOrUpdateTask, never store.addTask', () => {
    const medicare = between(scheduler, "if (job.kind === 'MEDICARE_INFO')", "if (job.kind === 'REVIEW_REQUEST')");
    expect(medicare).toMatch(/raiseOrUpdateTask\(store, customer, \{\s*reason: `The Medicare exemption message was not delivered/);
    expect(medicare).not.toContain('store.addTask(');
    const review = between(scheduler, "if (job.kind === 'REVIEW_REQUEST')", "await store.setJobStatus(job.id, 'DONE');\n        continue;\n      }\n\n");
    expect(review).toMatch(/raiseOrUpdateTask\(store, customer, \{\s*reason: missingTemplate/);
    expect(review).not.toContain('store.addTask(');
  });

  it('service: the payment confirmation raises through onFailure only', () => {
    const i = service.indexOf('PAID, BUT THEY HAVE NOT BEEN TOLD');
    expect(i).toBeGreaterThan(0);
    expect(service.slice(i - 400, i)).toContain('onFailure');
    expect(service.split('PAID, BUT THEY HAVE NOT BEEN TOLD').length).toBe(2);
  });
});
