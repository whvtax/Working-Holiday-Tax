/**
 * audit, 5 Sep: deliverOut's free-text fallback for a missing Meta template.
 *
 * Meta accepts a free text to a customer OUTSIDE the 24h window with a 200 and
 * a wamid, and only reports the 131047 rejection an hour later through the
 * status webhook. So when the template behind a review request or Medicare
 * line did not exist, the fallback "succeeded", the caller audited it as sent,
 * the CRM showed two ticks, and the caller's task naming the missing template
 * never fired. Pinned here:
 *
 *  1. INSIDE the window the fallback is untouched: the same text goes out as
 *     free text and the send is ok.
 *  2. OUTSIDE the window no free text is attempted; the row is FAILED, the
 *     result names the missing template, and the audit says why.
 */
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

const HOUR = 60 * 60 * 1000;
const customer = (over: Partial<CustomerRow> = {}) => ({
  id: 'c1', waId: '61400000001', name: 'Alex', optedOut: false, lang: null, state: 'LODGED', ...over,
} as CustomerRow);

const template = { name: 'review_request', params: [] as string[], lang: null, fallbackToText: true };

let fetchMock: jest.Mock;
const realFetch = global.fetch;

beforeEach(() => {
  for (const fn of Object.values(store)) (fn as jest.Mock).mockReset();
  store.addMessage.mockResolvedValue({ id: 'm1' });
  store.setMessageStatus.mockResolvedValue(undefined);
  store.attachProviderId.mockResolvedValue(undefined);
  store.markCustomerRead.mockResolvedValue(undefined);
  store.audit.mockResolvedValue(undefined);
  store.addTask.mockResolvedValue({ id: 't1' });
  store.getSetting.mockImplementation(async (key: string) =>
    key === 'wa_access_token' ? 'tok' : key === 'wa_phone_number_id' ? '123' : undefined);
  // Meta: the template does not exist; a free text is "accepted" (which is
  // exactly what it does outside the window too, before failing later).
  fetchMock = jest.fn().mockImplementation(async (_url: string, init: { body: string }) => {
    const payload = JSON.parse(init.body) as { type: string };
    if (payload.type === 'template') {
      return {
        ok: false, status: 400,
        json: async () => ({ error: { code: 132001, message: 'Template name does not exist in the translation' } }),
      };
    }
    return { ok: true, status: 200, json: async () => ({ messages: [{ id: 'wamid.text' }] }) };
  });
  global.fetch = fetchMock as unknown as typeof fetch;
});

afterEach(() => { global.fetch = realFetch; });

const sentTypes = () => fetchMock.mock.calls.map((c) => (JSON.parse(c[1].body) as { type: string }).type);

describe('missing template, customer wrote within 24h: unchanged free-text fallback', () => {
  it('sends the same text as free text and reports ok', async () => {
    const c = customer({ lastCustomerMsgAt: new Date(Date.now() - 2 * HOUR).toISOString() });
    const res = await deliverOut(c, 'Would you leave us a review?', 'AI', { waTemplate: template }, template);
    expect(res.ok).toBe(true);
    expect(sentTypes()).toEqual(['template', 'text']);
    expect(store.setMessageStatus).toHaveBeenCalledWith('m1', 'SENT');
    expect(store.audit).toHaveBeenCalledWith('channel', 'template_missing_sent_as_text', expect.objectContaining({ template: 'review_request' }));
  });
});

describe('missing template, customer quiet for days: the doomed free text is not attempted', () => {
  it('returns ok:false naming the template, marks the row FAILED, sends no text', async () => {
    const c = customer({ lastCustomerMsgAt: new Date(Date.now() - 3 * 24 * HOUR - HOUR).toISOString() });
    const res = await deliverOut(c, 'Would you leave us a review?', 'AI', { waTemplate: template }, template);
    expect(res.ok).toBe(false);
    expect(res.retryable).toBeFalsy();
    expect(res.error).toMatch(/template "review_request" is not in WhatsApp Manager/);
    expect(res.error).toMatch(/3 days ago/);
    expect(sentTypes()).toEqual(['template']);
    expect(store.setMessageStatus).toHaveBeenCalledWith('m1', 'FAILED');
    // Nothing "sent": the chat must not be marked read for a message that never left.
    expect(store.markCustomerRead).not.toHaveBeenCalled();
  });

  it('audits the refusal under its own name, not as "sent as text"', async () => {
    const c = customer({ lastCustomerMsgAt: new Date(Date.now() - 3 * 24 * HOUR).toISOString() });
    await deliverOut(c, 'x', 'AI', { waTemplate: template }, template);
    expect(store.audit).toHaveBeenCalledWith('channel', 'template_missing_outside_window', expect.objectContaining({ template: 'review_request' }));
    expect(store.audit).not.toHaveBeenCalledWith('channel', 'template_missing_sent_as_text', expect.anything());
  });

  it('a customer who never wrote (web form only) counts as outside the window', async () => {
    const c = customer({ lastCustomerMsgAt: null });
    const res = await deliverOut(c, 'x', 'AI', { waTemplate: template }, template);
    expect(res.ok).toBe(false);
    expect(res.error).toMatch(/more than a day ago/);
    expect(sentTypes()).toEqual(['template']);
  });

  it("the caller's task pattern still recognises the error as a missing template", async () => {
    // scheduler.ts review-request branch: /131047|24|window|template/i
    const c = customer({ lastCustomerMsgAt: null });
    const res = await deliverOut(c, 'x', 'AI', { waTemplate: template }, template);
    expect(/131047|24|window|template/i.test(res.error ?? '')).toBe(true);
  });
});

describe('a genuine template rejection that is not "missing" is untouched', () => {
  it('a 131047 on the template itself is reported as before, with no text attempt', async () => {
    fetchMock.mockImplementation(async () => ({
      ok: false, status: 400, json: async () => ({ error: { code: 131047, message: 'Re-engagement message' } }),
    }));
    const c = customer({ lastCustomerMsgAt: null });
    const res = await deliverOut(c, 'x', 'AI', { waTemplate: template }, template);
    expect(res.ok).toBe(false);
    expect(res.error).toMatch(/Re-engagement/);
    expect(sentTypes()).toEqual(['template']);
  });
});
