/**
 * audit3 core-48: a Meta 5xx or a pre-response network error on a send is
 * transient, not permanent.
 *
 * postMessage marked a send retryable only for HTTP 429 and Meta's throttle
 * codes. A Graph API 500/502/503, a DNS miss or a reset connection came back
 * retryable:false, so deliverOut wrote the row FAILED and raised the
 * "not delivered" task, and decideAndAct escalated it to URGENT after it had
 * ALREADY advanced the stage and income. A 20 second Meta wobble became a
 * manual resend for Jo and a board a step ahead of the customer.
 *
 * Now: 5xx and pre-response network errors are retryable (deliverOut re-arms
 * or re-queues, no task); timeouts stay non-retryable because the message may
 * have gone; and the autopilot 'sent' branch applies state and income only
 * after deliverOut reports ok.
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

import { deliverOut, isPreResponseNetworkError } from '@/lib/will/channel';
import type { CustomerRow } from '@/lib/will/store';

const customer = { id: 'c1', waId: '61400000001', name: 'Alex', optedOut: false, lang: null, state: 'LEAD' } as unknown as CustomerRow;

const realFetch = global.fetch;
beforeEach(() => {
  for (const fn of Object.values(store)) (fn as jest.Mock).mockReset();
  store.addMessage.mockResolvedValue({ id: 'm1' });
  store.setMessageStatus.mockResolvedValue(undefined);
  store.audit.mockResolvedValue(undefined);
  store.addTask.mockResolvedValue({ id: 't1' });
  store.getSetting.mockImplementation(async (key: string) =>
    key === 'wa_access_token' ? 'tok' : key === 'wa_phone_number_id' ? '123' : null);
  process.env.WHATSAPP_ACCESS_TOKEN = 'tok';
  process.env.WHATSAPP_PHONE_NUMBER_ID = '123';
});
afterEach(() => { global.fetch = realFetch; });

const metaResponds = (status: number, body: unknown) => {
  global.fetch = jest.fn(async () => ({ ok: status < 400, status, json: async () => body })) as unknown as typeof fetch;
};
const fetchThrows = (e: Error) => {
  global.fetch = jest.fn(async () => { throw e; }) as unknown as typeof fetch;
};

describe('audit3 core-48: Meta 5xx is retryable, no task', () => {
  it.each([500, 502, 503])('HTTP %s comes back retryable and raises nothing', async (status) => {
    metaResponds(status, { error: { message: 'An unknown error occurred', code: 1 } });
    const res = await deliverOut(customer, 'hello', 'AI', undefined, undefined, {
      onFailure: { reason: () => 'x', severity: 'URGENT' },
    });
    expect(res.ok).toBe(false);
    expect(res.retryable).toBe(true);
    expect(res.error).toMatch(new RegExp(`meta ${status}`));
    expect(store.addTask).not.toHaveBeenCalled();
    expect(store.markCustomerRead).not.toHaveBeenCalled();
  });

  it('a 4xx that is not a throttle code is still permanent', async () => {
    metaResponds(400, { error: { message: 'Invalid parameter', code: 100 } });
    const res = await deliverOut(customer, 'hello', 'AI');
    expect(res.ok).toBe(false);
    expect(res.retryable).toBeFalsy();
  });
});

describe('audit3 core-48: pre-response network errors are retryable, timeouts are not', () => {
  it('Node "fetch failed" with ECONNRESET underneath is retryable', async () => {
    const e = new TypeError('fetch failed');
    (e as Error & { cause?: unknown }).cause = Object.assign(new Error('read ECONNRESET'), { code: 'ECONNRESET' });
    fetchThrows(e);
    const res = await deliverOut(customer, 'hello', 'AI', undefined, undefined, {
      onFailure: { reason: () => 'x', severity: 'URGENT' },
    });
    expect(res.ok).toBe(false);
    expect(res.retryable).toBe(true);
    expect(store.addTask).not.toHaveBeenCalled();
  });

  it('a timeout (the message may have gone) stays non-retryable', async () => {
    const e = new Error('The operation was aborted due to timeout');
    e.name = 'TimeoutError';
    fetchThrows(e);
    const res = await deliverOut(customer, 'hello', 'AI');
    expect(res.ok).toBe(false);
    expect(res.retryable).toBeFalsy();
  });

  it('classifies the common shapes', () => {
    expect(isPreResponseNetworkError(Object.assign(new Error('getaddrinfo ENOTFOUND graph.facebook.com'), { code: 'ENOTFOUND' }))).toBe(true);
    expect(isPreResponseNetworkError(Object.assign(new Error('connect ECONNREFUSED'), { code: 'ECONNREFUSED' }))).toBe(true);
    expect(isPreResponseNetworkError(new TypeError('fetch failed'))).toBe(true);
    expect(isPreResponseNetworkError(Object.assign(new Error('aborted'), { name: 'AbortError' }))).toBe(false);
    expect(isPreResponseNetworkError(Object.assign(new Error('timeout'), { name: 'TimeoutError' }))).toBe(false);
    expect(isPreResponseNetworkError(new Error('Unexpected token < in JSON'))).toBe(false);
    expect(isPreResponseNetworkError(null)).toBe(false);
  });
});

describe('audit3 core-48: the autopilot sent branch advances the board only after the send succeeded', () => {
  const src = fs.readFileSync(path.join(process.cwd(), 'src/lib/will/service.ts'), 'utf8');
  const branch = src.slice(src.indexOf("if (outcome.kind === 'sent' && outcome.replyText) {"), src.indexOf("} else if (outcome.kind === 'queued' && outcome.replyText) {"));

  it('setState and updateCustomer come after deliverOut and after the failure returns', () => {
    const deliver = branch.indexOf('await deliverOut(');
    const humanTask = branch.indexOf("kind: 'human_task'");
    const setState = branch.indexOf('store.setState(customer.id, outcome.newState');
    const income = branch.indexOf('store.updateCustomer(customer.id, { income: inc })');
    expect(deliver).toBeGreaterThan(-1);
    expect(humanTask).toBeGreaterThan(deliver);
    expect(setState).toBeGreaterThan(humanTask);
    expect(income).toBeGreaterThan(humanTask);
  });
});
