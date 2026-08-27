/**
 * Payment-proof auto-detection (service.ts's handlePaymentProofMedia) used
 * to send the "payment received" confirmation and move the customer to Paid
 * immediately, no matter what ai_mode was set to — effectively treating a
 * confirmed payment photo as pre-approved before the owner ever saw it, the
 * one case in the whole engine that bypassed SUPERVISED. This pins the fix:
 * SUPERVISED must produce a draft awaiting approval and leave the pipeline
 * exactly where it was, same as every other AI-authored reply; only
 * FULL_AUTO may send and move the stage on its own.
 */
const customer = { id: 'c1', waId: '61400000001', name: 'Alex', paid: false, state: 'PRICE_SENT', optedOut: false };
const addMessage = jest.fn().mockResolvedValue({ id: 'msg1' });
const addTask = jest.fn().mockResolvedValue({ id: 't1' });
const setState = jest.fn().mockResolvedValue(undefined);
const getSetting = jest.fn().mockResolvedValue('SUPERVISED');
const audit = jest.fn().mockResolvedValue(undefined);
jest.mock('@/lib/will/store', () => ({
  getStore: () => ({
    getCustomerByWaId: jest.fn().mockResolvedValue(customer),
    getCustomerById: jest.fn().mockResolvedValue(customer),
    addMessage, addTask, setState, getSetting, audit,
  }),
}));

const fetchWaMedia = jest.fn().mockResolvedValue({ ok: true, body: new ArrayBuffer(4), mime: 'image/jpeg' });
const deliverOut = jest.fn().mockResolvedValue({ ok: true });
jest.mock('@/lib/will/channel', () => ({
  fetchWaMedia: (...a: unknown[]) => fetchWaMedia(...a),
  deliverOut: (...a: unknown[]) => deliverOut(...a),
}));

const assessPaymentProofImage = jest.fn().mockResolvedValue({ isProof: true, reason: 'bank transfer confirmation' });
jest.mock('@/lib/will/claude', () => ({
  assessPaymentProofImage: (...a: unknown[]) => assessPaymentProofImage(...a),
}));

jest.mock('@/lib/will/scheduler', () => ({ reconcileSchedule: jest.fn().mockResolvedValue(undefined) }));

import { handlePaymentProofMedia } from '@/lib/will/service';

const media = { id: 'm1', kind: 'image', mime: 'image/jpeg' };

beforeEach(() => {
  addMessage.mockClear(); addTask.mockClear(); setState.mockClear();
  deliverOut.mockClear(); audit.mockClear(); assessPaymentProofImage.mockClear();
  getSetting.mockResolvedValue('SUPERVISED');
  customer.optedOut = false;
});

it('SUPERVISED: drafts the confirmation and does NOT send or move the stage', async () => {
  await handlePaymentProofMedia('61400000001', '📷 [Photo]', { media });

  // The inbound photo is always recorded regardless of mode.
  expect(addMessage).toHaveBeenCalledWith(expect.objectContaining({ direction: 'IN' }));
  // The reply is a DRAFT, not a live send.
  expect(addMessage).toHaveBeenCalledWith(expect.objectContaining({
    direction: 'OUT', status: 'PENDING_APPROVAL', meta: { proposedState: 'PAID' },
  }));
  expect(deliverOut).not.toHaveBeenCalled();
  expect(setState).not.toHaveBeenCalled();
});

it('FULL_AUTO: sends immediately and moves the stage', async () => {
  getSetting.mockResolvedValue('FULL_AUTO');
  await handlePaymentProofMedia('61400000001', '📷 [Photo]', { media });

  expect(deliverOut).toHaveBeenCalledTimes(1);
  expect(setState).toHaveBeenCalledWith('c1', 'PAID', 'SYSTEM');
  // No PENDING_APPROVAL draft in this mode.
  expect(addMessage).not.toHaveBeenCalledWith(expect.objectContaining({ status: 'PENDING_APPROVAL' }));
});

it('an unrecognised/missing ai_mode setting fails safe to SUPERVISED (no send)', async () => {
  getSetting.mockResolvedValue(undefined);
  await handlePaymentProofMedia('61400000001', '📷 [Photo]', { media });
  expect(deliverOut).not.toHaveBeenCalled();
  expect(setState).not.toHaveBeenCalled();
});

/**
 * This was the ONLY send path in the system that did not check `optedOut`
 * before reaching the customer: someone who had asked us to stop still got a
 * "payment received" reply if they sent a photo. The check belongs in the entry
 * condition, alongside `paid` and the payable-states test, so nothing further
 * down the function runs at all.
 */
describe('a customer who opted out is never messaged, in any mode', () => {
  it('FULL_AUTO: does not send, does not move the stage, does not open a task', async () => {
    getSetting.mockResolvedValue('FULL_AUTO');
    customer.optedOut = true;
    const result = await handlePaymentProofMedia('61400000001', '📷 [Photo]', { media });

    expect(result).toBeNull();
    expect(deliverOut).not.toHaveBeenCalled();
    expect(setState).not.toHaveBeenCalled();
    expect(addTask).not.toHaveBeenCalled();
  });

  it('SUPERVISED: does not even draft a reply for approval', async () => {
    customer.optedOut = true;
    await handlePaymentProofMedia('61400000001', '📷 [Photo]', { media });
    expect(addMessage).not.toHaveBeenCalled();
  });

  it('bails before spending a paid vision call on the attachment', async () => {
    customer.optedOut = true;
    await handlePaymentProofMedia('61400000001', '📷 [Photo]', { media });
    expect(assessPaymentProofImage).not.toHaveBeenCalled();
  });
});
