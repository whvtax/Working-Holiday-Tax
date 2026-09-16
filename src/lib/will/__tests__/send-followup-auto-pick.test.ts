/**
 * send_followup with no template id: "send whatever follow-up is due for
 * this customer right now" (Jo, 15 Sep).
 *
 * Backend need: pausing Will (the kill switch) freezes every follow-up
 * clock, and on resume the scheduler works through the backlog a few jobs
 * per tick rather than all at once — so a customer who was due days ago
 * might not actually be reached for a while. This lets the owner press one
 * button and fire "the correct step for their stage" immediately, without
 * first having to look up which template key that is.
 *
 * Preference order: the template key from the customer's currently-armed
 * FOLLOW_UP job (that IS "their stage" — reconcileSchedule set its seq the
 * last time anything about them changed), falling back to the first step of
 * their flow's sequence only when nothing is armed at all.
 */
const customer = {
  id: 'c1', waId: '61400000000', name: 'Ana', lang: null, state: 'QUALIFIED', paid: false,
  aiPaused: false, optedOut: false, isLegacy: false, estimatedRefundCents: null,
  lastCustomerMsgAt: new Date().toISOString(),
};
const templates = [
  { key: 'fu_pre_24h', title: '24h', body: 'Hi {{1}}, still keen?' },
  { key: 'fu_pre_3d', title: '3d', body: 'Hi {{1}}, checking in.' },
  { key: 'fu_pre_7d', title: '7d', body: 'Hi {{1}}, last message from me.' },
];

const store = {
  getCustomerById: jest.fn().mockResolvedValue(customer),
  listTemplates: jest.fn().mockResolvedValue(templates),
  listJobsForCustomer: jest.fn().mockResolvedValue([]),
  getSetting: jest.fn().mockResolvedValue(undefined),
  audit: jest.fn().mockResolvedValue(undefined),
  addJob: jest.fn().mockResolvedValue({ id: 'j1' }),
  cancelJobsFor: jest.fn().mockResolvedValue(undefined),
  setJobStatus: jest.fn().mockResolvedValue(undefined),
  listMessages: jest.fn().mockResolvedValue([]),
};
const afterHumanReply = jest.fn().mockResolvedValue(undefined);
const deliverOut = jest.fn().mockResolvedValue({ ok: true });

jest.mock('@/lib/will/store', () => ({ getStore: () => store }));
jest.mock('@/lib/will/auth', () => ({ sessionValid: jest.fn().mockResolvedValue(true) }));
jest.mock('@/lib/will/after-reply', () => ({ afterHumanReplyIndexed: (...a: unknown[]) => afterHumanReply(...a) }));
jest.mock('@/lib/will/scheduler', () => ({
  ...jest.requireActual('@/lib/will/scheduler'),
  reconcileSchedule: jest.fn().mockResolvedValue(undefined),
  restartSignatureCadenceFromNotice: jest.fn().mockResolvedValue(undefined),
}));
jest.mock('@/lib/will/channel', () => ({
  sendWhatsAppText: jest.fn().mockResolvedValue({ ok: true }),
  sendWhatsAppTemplate: jest.fn().mockResolvedValue({ ok: true }),
  deliverOut: (...a: unknown[]) => deliverOut(...a),
}));

import { POST } from '@/app/api/will/actions/route';

function req(body: Record<string, unknown>) {
  return new Request('http://x/api/will/actions', { method: 'POST', body: JSON.stringify(body) });
}

beforeEach(() => {
  jest.clearAllMocks();
  store.getCustomerById.mockResolvedValue(customer);
  store.listTemplates.mockResolvedValue(templates);
  store.listJobsForCustomer.mockResolvedValue([]);
  store.addJob.mockResolvedValue({ id: 'j1' });
  deliverOut.mockResolvedValue({ ok: true });
});

describe('send_followup auto-picks the due template when no id is given', () => {
  it('uses the template key from the currently armed FOLLOW_UP job', async () => {
    store.listJobsForCustomer.mockResolvedValue([
      { id: 'j9', customerId: 'c1', kind: 'FOLLOW_UP', status: 'SCHEDULED', payload: { templateKey: 'fu_pre_3d', seq: 1, flow: 'prePayment' } },
    ]);
    const res = await POST(req({ action: 'send_followup', customerId: 'c1' }));
    expect(res.status).toBe(200);
    expect(deliverOut).toHaveBeenCalledWith(customer, expect.stringContaining('checking in'), 'HUMAN', expect.anything(), expect.objectContaining({ name: 'fu_pre_3d' }));
  });

  it('falls back to the first step of the sequence when nothing is armed', async () => {
    store.listJobsForCustomer.mockResolvedValue([]);
    const res = await POST(req({ action: 'send_followup', customerId: 'c1' }));
    expect(res.status).toBe(200);
    expect(deliverOut).toHaveBeenCalledWith(customer, expect.stringContaining('still keen'), 'HUMAN', expect.anything(), expect.objectContaining({ name: 'fu_pre_24h' }));
  });

  it('ignores an armed job for a DIFFERENT flow than the one their current stage maps to', async () => {
    store.listJobsForCustomer.mockResolvedValue([
      { id: 'j9', customerId: 'c1', kind: 'FOLLOW_UP', status: 'SCHEDULED', payload: { templateKey: 'fu_form_6h', seq: 0, flow: 'form' } },
    ]);
    const res = await POST(req({ action: 'send_followup', customerId: 'c1' }));
    expect(res.status).toBe(200);
    // QUALIFIED maps to prePayment, so the stale 'form' job is ignored and the
    // sequence starts fresh for the flow that actually applies now.
    expect(deliverOut).toHaveBeenCalledWith(customer, expect.stringContaining('still keen'), 'HUMAN', expect.anything(), expect.objectContaining({ name: 'fu_pre_24h' }));
  });

  it('an explicit id still works exactly as before (backwards compatible)', async () => {
    const res = await POST(req({ action: 'send_followup', customerId: 'c1', id: 'fu_pre_7d' }));
    expect(res.status).toBe(200);
    expect(deliverOut).toHaveBeenCalledWith(customer, expect.stringContaining('last message'), 'HUMAN', expect.anything(), expect.objectContaining({ name: 'fu_pre_7d' }));
  });

  it('gives a clear reason for a customer whose stage has no cadence at all', async () => {
    store.getCustomerById.mockResolvedValue({ ...customer, state: 'PAID' });
    const res = await POST(req({ action: 'send_followup', customerId: 'c1' }));
    const json = await res.json();
    expect(res.status).toBe(400);
    expect(json.error).toMatch(/not at a stage/i);
    expect(deliverOut).not.toHaveBeenCalled();
  });
});
