/**
 * audit3 / actions / unverified[14]: a delivered message is never reported as
 * "Not sent".
 *
 * Every send action runs bookkeeping after WhatsApp accepted the message (mark
 * read, close the task, move the stage, audit). If one of those store writes
 * threw, the POST wrapper answered { ok:false, error:'action failed' } and the
 * dashboard printed "Not sent" for a message the customer already had, so the
 * operator pressed send again. Now: once the send succeeded the response is
 * ok:true; a bookkeeping failure is audited as post_send_bookkeeping_failed
 * (customerId + step) and carried back as `warning`. Nothing is sent twice and
 * nothing is worded differently. The happy path keeps the exact old shape.
 */
const customer = {
  id: 'c1', waId: '61400000000', name: 'Ana', lang: null, state: 'QUALIFIED', paid: false,
  aiPaused: false, optedOut: false, isLegacy: false, estimatedRefundCents: null,
  lastCustomerMsgAt: new Date().toISOString(),
};
const draft = { id: 'm1', customerId: 'c1', direction: 'OUT', status: 'PENDING_APPROVAL', body: 'Hello Ana, thanks for writing.', meta: {} };

const store = {
  getCustomerById: jest.fn().mockResolvedValue(customer),
  getMessageById: jest.fn().mockResolvedValue(draft),
  claimMessageForSend: jest.fn().mockResolvedValue(true),
  setMessageStatus: jest.fn().mockResolvedValue(undefined),
  updateCustomer: jest.fn().mockResolvedValue(undefined),
  setState: jest.fn().mockResolvedValue(undefined),
  listTemplates: jest.fn().mockResolvedValue([]),
  listMessages: jest.fn().mockResolvedValue([]),
  getSetting: jest.fn().mockResolvedValue(undefined),
  audit: jest.fn().mockResolvedValue(undefined),
  addJob: jest.fn().mockResolvedValue({ id: 'j1' }),
  cancelJobsFor: jest.fn().mockResolvedValue(undefined),
  setJobStatus: jest.fn().mockResolvedValue(undefined),
};
const afterHumanReply = jest.fn().mockResolvedValue(undefined);
const deliverOut = jest.fn().mockResolvedValue({ ok: true });
const sendWhatsAppText = jest.fn().mockResolvedValue({ ok: true });

jest.mock('@/lib/will/store', () => ({ getStore: () => store }));
jest.mock('@/lib/will/auth', () => ({ sessionValid: jest.fn().mockResolvedValue(true) }));
// route.ts imports the indexed variant (aliased locally to afterHumanReply,
// see actions/route.ts's afterHumanReplyIndexed import comment) — mocking only
// the plain name left the real import undefined and every "bookkeeping threw"
// assertion was actually observing that TypeError, not the injected failure
// (audit3, 5 Sep).
jest.mock('@/lib/will/after-reply', () => ({ afterHumanReplyIndexed: (...a: unknown[]) => afterHumanReply(...a) }));
jest.mock('@/lib/will/scheduler', () => ({
  ...jest.requireActual('@/lib/will/scheduler'),
  reconcileSchedule: jest.fn().mockResolvedValue(undefined),
  restartSignatureCadenceFromNotice: jest.fn().mockResolvedValue(undefined),
}));
jest.mock('@/lib/will/channel', () => ({
  sendWhatsAppText: (...a: unknown[]) => sendWhatsAppText(...a),
  sendWhatsAppTemplate: jest.fn().mockResolvedValue({ ok: true }),
  deliverOut: (...a: unknown[]) => deliverOut(...a),
}));

import { POST } from '@/app/api/will/actions/route';

const post = (body: Record<string, unknown>) => POST(new Request('http://x/api/will/actions', {
  method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body),
}));

beforeEach(() => {
  for (const fn of Object.values(store)) (fn as jest.Mock).mockClear();
  afterHumanReply.mockReset().mockResolvedValue(undefined);
  deliverOut.mockClear();
  sendWhatsAppText.mockClear();
});

describe('a delivered message is reported as sent even when the bookkeeping after it fails', () => {
  it('manual_reply: store failure after deliverOut -> ok:true + warning, audited, sent once', async () => {
    afterHumanReply.mockRejectedValue(new Error('supabase timeout'));
    const res = await post({ action: 'manual_reply', customerId: 'c1', body: 'Hi Ana, I will look at this today.' });
    const j = await res.json();
    expect(res.status).toBe(200);
    expect(j.ok).toBe(true);
    expect(j.aiPaused).toBe(false);
    expect(j.warning).toMatch(/^Sent\./);
    expect(j.warning).not.toMatch(/[-–—]/);
    expect(deliverOut).toHaveBeenCalledTimes(1);
    expect(store.audit).toHaveBeenCalledWith('owner', 'post_send_bookkeeping_failed',
      expect.objectContaining({ customerId: 'c1', step: 'manual_reply', error: 'supabase timeout' }));
  });

  it('manual_reply happy path keeps the exact old response shape (no warning key)', async () => {
    const j = await (await post({ action: 'manual_reply', customerId: 'c1', body: 'Hi Ana, all good.' })).json();
    expect(j).toEqual({ ok: true, aiPaused: false });
    expect(store.audit).toHaveBeenCalledWith('owner', 'manual_reply', { customerId: 'c1' });
    expect(store.audit).not.toHaveBeenCalledWith('owner', 'post_send_bookkeeping_failed', expect.anything());
  });

  it('approve_message: the message went out, marking it SENT failed -> still ok:true, no second send', async () => {
    store.setMessageStatus.mockRejectedValueOnce(new Error('row lock'));
    const res = await post({ action: 'approve_message', id: 'm1' });
    const j = await res.json();
    expect(res.status).toBe(200);
    expect(j.ok).toBe(true);
    expect(j.warning).toBeDefined();
    expect(sendWhatsAppText).toHaveBeenCalledTimes(1);
    expect(store.audit).toHaveBeenCalledWith('owner', 'post_send_bookkeeping_failed',
      expect.objectContaining({ customerId: 'c1', step: 'approve_message' }));
    expect(store.audit).not.toHaveBeenCalledWith('owner', 'action_unhandled_error', expect.anything());
  });

  it('approve_message happy path is unchanged', async () => {
    const j = await (await post({ action: 'approve_message', id: 'm1' })).json();
    expect(j).toEqual({ ok: true });
    expect(store.setMessageStatus).toHaveBeenCalledWith('m1', 'SENT', { restamp: true });
    expect(store.audit).toHaveBeenCalledWith('owner', 'draft_approved', expect.objectContaining({ id: 'm1', customerId: 'c1' }));
  });

  it('a WhatsApp rejection is still a real failure, exactly as before', async () => {
    deliverOut.mockResolvedValueOnce({ ok: false, error: 'boom' });
    const res = await post({ action: 'manual_reply', customerId: 'c1', body: 'Hi Ana.' });
    expect(res.status).toBe(502);
    expect(await res.json()).toEqual({ error: 'WhatsApp did not accept the message: boom' });
    expect(afterHumanReply).not.toHaveBeenCalled();
  });
});

describe('every send case goes through afterSend (source shape)', () => {
  it('the eight send actions wrap their post-send bookkeeping', () => {
    const fs = require('fs');
    const src = fs.readFileSync(require.resolve('@/app/api/will/actions/route'), 'utf8') as string;
    for (const step of ['approve_message', 'send_followup', 'send_task_reply', 'manual_reply', 'send_template', 'send_estimate', 'send_signature', 'send_lodged']) {
      expect(src).toContain(`afterSend(customer.id, '${step}'`);
    }
  });
});
