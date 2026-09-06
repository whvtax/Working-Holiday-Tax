/**
 * Guard codes and Meta error strings no longer reach the owner bare (audit,
 * 5 Sep, finding actions/u19).
 *
 * The seven manual send buttons answered a Meta rejection with the raw text
 * ("meta 404: (#132001) Template name does not exist in the translation"),
 * the guard branches with bare codes, "not a pending draft" and "task not
 * open" with nothing about why. Now every one of them keeps the raw code
 * (the System card, the hand-off card and older tests key off it) and adds
 * what to do. Nothing the customer sees changes, and nothing is sent
 * differently: the same refusals, the same status codes, more words.
 */
import { explainSendError, describeViolation, describeViolations } from '@/lib/will/send-errors';

const NO_DASH = /(^|\s)[-–—](\s|$)/;

describe('explainSendError', () => {
  it('a missing template says which one to create in WhatsApp Manager, like the scheduler does', () => {
    const raw = 'meta 404: (#132001) Template name does not exist in the translation';
    const got = explainSendError(raw, 'signature');
    expect(got.startsWith(raw)).toBe(true);
    expect(got).toMatch(/approved WhatsApp template "signature"/);
    expect(got).toMatch(/does not exist yet in WhatsApp Manager\. Create it there/);
    expect(got).not.toMatch(NO_DASH);
  });
  it('a throttled send says try again in a few minutes; the marketing limit says tomorrow evening', () => {
    expect(explainSendError('meta 429: too many requests')).toMatch(/try again in a few minutes/);
    expect(explainSendError('meta 400: (#131056) pair rate limit')).toMatch(/try again in a few minutes/);
    expect(explainSendError('meta 400: (#131049) limit reached')).toMatch(/tomorrow evening/);
  });
  it('keeps the two hints the approve path already had, and passes an unknown error through untouched', () => {
    expect(explainSendError('meta 400: (#131047) re-engagement')).toMatch(/Send it as an approved template, or wait for the customer to write/);
    expect(explainSendError('meta 400: (#131026) not a WhatsApp user')).toMatch(/not on WhatsApp/);
    expect(explainSendError('meta 400: bad')).toBe('meta 400: bad');
    expect(explainSendError(undefined)).toBe('unknown error');
  });
});

describe('describeViolation(s)', () => {
  it('turns the guard codes into one sentence each, unknown codes stay visible as themselves', () => {
    expect(describeViolation('EM_DASH_FORBIDDEN')).toMatch(/dash/);
    expect(describeViolation('SALES_CONTENT_AFTER_PAYMENT')).toMatch(/already paid/);
    expect(describeViolation('OUTSIDE_24H_WINDOW_NEEDS_TEMPLATE')).toMatch(/approved WhatsApp template/);
    expect(describeViolation('FORBIDDEN_AMOUNT:99.00')).toMatch(/\$99\.00/);
    expect(describeViolation('SOME_FUTURE_CODE')).toBe('SOME_FUTURE_CODE');
    const text = describeViolations(['SALES_CONTENT_AFTER_PAYMENT', 'EM_DASH_FORBIDDEN', 'EM_DASH_FORBIDDEN']);
    expect(text).toMatch(/already paid.*dash/);
    expect(text.match(/dash/g)).toHaveLength(1);
    expect(text).not.toMatch(NO_DASH);
  });
});

// ---- the route itself ------------------------------------------------------

const customer = {
  id: 'c1', waId: '61400000001', name: 'Momo', state: 'PAID', paid: true,
  optedOut: false, isLegacy: false, aiPaused: false, lang: null,
  lastCustomerMsgAt: new Date(Date.now() - 3 * 86400_000).toISOString(), estimatedRefundCents: null,
};
const messages: Record<string, unknown> = {};
const tasks: Record<string, unknown> = {};
const store = {
  getMessageById: jest.fn().mockImplementation(async (id: string) => messages[id] ?? null),
  getTaskById: jest.fn().mockImplementation(async (id: string) => tasks[id] ?? null),
  getCustomerById: jest.fn().mockImplementation(async () => ({ ...customer })),
  getSetting: jest.fn().mockResolvedValue(undefined),
  listTemplates: jest.fn().mockResolvedValue([]),
  setMessageStatus: jest.fn().mockResolvedValue(undefined),
  claimMessageForSend: jest.fn().mockResolvedValue(true),
  findOpenTaskForCustomer: jest.fn().mockResolvedValue(null),
  updateTask: jest.fn().mockResolvedValue(undefined),
  addTask: jest.fn().mockResolvedValue({ id: 't1' }),
  audit: jest.fn().mockResolvedValue(undefined),
  markCustomerRead: jest.fn().mockResolvedValue(undefined),
  listMessages: jest.fn().mockResolvedValue([]),
  resolveTask: jest.fn().mockResolvedValue(undefined),
  cancelJobsFor: jest.fn().mockResolvedValue(0),
  listJobsForCustomer: jest.fn().mockResolvedValue([]),
  addJob: jest.fn().mockResolvedValue({ id: 'j1' }),
  updateCustomer: jest.fn().mockResolvedValue(undefined),
  setState: jest.fn().mockResolvedValue(undefined),
};
const deliverOut = jest.fn();
jest.mock('@/lib/will/store', () => ({ getStore: () => store }));
jest.mock('@/lib/will/auth', () => ({ sessionValid: jest.fn().mockResolvedValue(true) }));
jest.mock('@/lib/will/channel', () => ({
  sendWhatsAppText: jest.fn().mockResolvedValue({ ok: true }),
  sendWhatsAppTemplate: jest.fn().mockResolvedValue({ ok: true }),
  deliverOut: (...a: unknown[]) => deliverOut(...a),
}));
jest.mock('@/lib/will/suggest', () => ({
  stripOperatorNote: (s: string) => s,
  suggestReply: jest.fn().mockResolvedValue('suggested'),
}));

import { POST } from '@/app/api/will/actions/route';

const post = (body: Record<string, unknown>) => POST(new Request('http://x/api/will/actions', {
  method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body),
}));

beforeEach(() => {
  for (const fn of Object.values(store)) (fn as jest.Mock).mockClear();
  deliverOut.mockReset();
  for (const k of Object.keys(messages)) delete messages[k];
  for (const k of Object.keys(tasks)) delete tasks[k];
});

describe('the manual send buttons explain a Meta rejection', () => {
  it('send_signature outside the window with no "signature" template in Meta says to create it', async () => {
    deliverOut.mockResolvedValue({ ok: false, error: 'meta 404: (#132001) Template name does not exist in the translation' });
    const res = await post({ action: 'send_signature', customerId: 'c1' });
    const j = await res.json();
    expect(res.status).toBe(502);
    expect(j.error).toMatch(/^WhatsApp did not accept the message: meta 404: \(#132001\)/);
    expect(j.error).toMatch(/approved WhatsApp template "signature", which does not exist yet in WhatsApp Manager/);
    expect(j.error).not.toMatch(NO_DASH);
    // Same behaviour: nothing recorded as sent, no state change.
    expect(store.setState).not.toHaveBeenCalled();
  });
  it('a throttled send says to try again; an unknown rejection is passed through as before', async () => {
    deliverOut.mockResolvedValue({ ok: false, error: 'meta 429: too many requests', retryable: true });
    let j = await (await post({ action: 'send_lodged', customerId: 'c1' })).json();
    expect(j.error).toMatch(/try again in a few minutes/);
    deliverOut.mockResolvedValue({ ok: false, error: 'meta 400: bad' });
    j = await (await post({ action: 'send_lodged', customerId: 'c1' })).json();
    expect(j.error).toBe('WhatsApp did not accept the message: meta 400: bad');
  });
});

describe('a guard refusal keeps the codes and adds the words', () => {
  it('approve_message: blocked codes stay, blockedText and error say what to change, the task reason keeps its prefix', async () => {
    messages.m1 = {
      id: 'm1', customerId: 'c1', direction: 'OUT', author: 'AI', status: 'PENDING_APPROVAL',
      body: 'Our service costs $99 — sign up today and get your refund fast!', meta: {}, createdAt: new Date().toISOString(),
    };
    const res = await post({ action: 'approve_message', id: 'm1' });
    const j = await res.json();
    expect(j.ok).toBe(false);
    expect(j.blocked).toEqual(expect.arrayContaining(['EM_DASH_FORBIDDEN']));
    expect(j.blocked.every((c: string) => /^[A-Z_0-9:.]+$/.test(c))).toBe(true);
    expect(j.blockedText).toMatch(/dash/);
    expect(j.error).toBe(j.blockedText);
    expect(j.blockedText).not.toMatch(NO_DASH);
    expect(store.setMessageStatus).toHaveBeenCalledWith('m1', 'BLOCKED');
    const task = store.addTask.mock.calls[0][0];
    expect(task.reason).toMatch(/^Draft became invalid before approval: [A-Z_0-9:., ]+\. .*dash/);
  });
});

describe('context-free refusals now say why', () => {
  it('discard_message / approve_message on a draft that was already sent or discarded', async () => {
    messages.m2 = { id: 'm2', customerId: 'c1', direction: 'OUT', author: 'AI', status: 'SENT', body: 'x', meta: {}, createdAt: new Date().toISOString() };
    messages.m3 = { id: 'm3', customerId: 'c1', direction: 'OUT', author: 'AI', status: 'DISCARDED', body: 'x', meta: {}, createdAt: new Date().toISOString() };
    let res = await post({ action: 'discard_message', id: 'm2' });
    expect(res.status).toBe(400);
    expect((await res.json()).error).toMatch(/^not a pending draft: this draft was already sent/);
    res = await post({ action: 'approve_message', id: 'm3' });
    expect(res.status).toBe(400);
    expect((await res.json()).error).toMatch(/^not a pending draft: this draft was already discarded/);
    expect(store.setMessageStatus).not.toHaveBeenCalled();
  });
  it('send_task_reply on a closed task says it was answered from the chat and where to send the reply', async () => {
    tasks.t9 = { id: 't9', customerId: 'c1', status: 'RESOLVED' };
    const res = await post({ action: 'send_task_reply', id: 't9', body: 'hello' });
    expect(res.status).toBe(404);
    expect((await res.json()).error).toMatch(/^task not open: this task is already closed \(answered from the chat, or dismissed\); open the chat to send this/);
    expect(deliverOut).not.toHaveBeenCalled();
  });
});
