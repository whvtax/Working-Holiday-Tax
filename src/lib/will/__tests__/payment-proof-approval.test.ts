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
const setState = jest.fn().mockResolvedValue(true);
const getSetting = jest.fn().mockResolvedValue('SUPERVISED');
const audit = jest.fn().mockResolvedValue(undefined);
jest.mock('@/lib/will/store', () => ({
  getStore: () => ({
    getCustomerByWaId: jest.fn().mockResolvedValue(customer),
    getCustomerById: jest.fn().mockResolvedValue(customer),
    addMessage, addTask, setState, getSetting, audit,
    // The AI daily budget is consulted before the vision check now. Without
    // these the budget lookup throws and the whole handler dies.
    setSetting: jest.fn().mockResolvedValue(undefined),
    bumpCounter: (...a: unknown[]) => bumpCounter(...a),
  }),
}));

const bumpCounter = jest.fn().mockResolvedValue(false); // false = a slot was reserved
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
  // Reset the RETURN VALUES too, not just the call counts. A test that makes
  // the download fail used to leak that into every test after it, which is the
  // kind of green-then-mysteriously-red that costs an hour to find.
  fetchWaMedia.mockResolvedValue({ ok: true, body: new ArrayBuffer(4), mime: 'image/jpeg' });
  assessPaymentProofImage.mockResolvedValue({ isProof: true, reason: 'bank transfer confirmation' });
  bumpCounter.mockReset(); bumpCounter.mockResolvedValue(false);
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

// ── Two routes to trust (Jo, 27 Aug) ────────────────────────────────────────
// Either the customer says they paid, or the screenshot shows it. Either one
// alone is enough. Before this, the picture decided on its own — so a real
// payment with an unreadable screenshot fell through to a manual task while
// the words "just paid it!" sat in the caption being ignored.

it('trusts the caption, without asking the vision check at all', async () => {
  assessPaymentProofImage.mockResolvedValue({ isProof: false, reason: 'too blurry to tell' });

  await handlePaymentProofMedia('61400000001', '📷 [Photo] just paid it!', {
    media: { ...media, caption: 'just paid it!' },
  });

  // Not merely trusted despite the picture — the picture is never looked at,
  // because a paid answer cannot become more paid and this is a paid API call.
  expect(assessPaymentProofImage).not.toHaveBeenCalled();
  expect(addMessage).toHaveBeenCalledWith(expect.objectContaining({ status: 'PENDING_APPROVAL' }));
  expect(addTask).toHaveBeenCalledTimes(1);
  expect(addTask.mock.calls[0][0].reason).toMatch(/they said they paid/);
});

it('trusts the words even when the photo cannot be downloaded from Meta', async () => {
  // The customer's word does not depend on us being able to read their picture.
  fetchWaMedia.mockResolvedValue({ ok: false, error: 'media expired' });

  const result = await handlePaymentProofMedia('61400000001', '📷 [Photo] transferred this morning', {
    media: { ...media, caption: 'transferred this morning' },
  });

  expect(result).not.toBeNull();
  expect(addTask).toHaveBeenCalledTimes(1);
});

it('still trusts a confirmed screenshot when nothing was typed', async () => {
  assessPaymentProofImage.mockResolvedValue({ isProof: true, reason: 'PayID receipt' });

  await handlePaymentProofMedia('61400000001', '📷 [Photo]', { media });

  expect(assessPaymentProofImage).toHaveBeenCalled();
  expect(addTask.mock.calls[0][0].reason).toMatch(/PayID receipt/);
});

it('does NOT trust a caption that is asking about paying', async () => {
  // The one thing that must not happen: a customer who has not paid getting the
  // form, the thank-you, and a return started for them.
  assessPaymentProofImage.mockResolvedValue({ isProof: false, reason: 'a screenshot of a form' });

  const result = await handlePaymentProofMedia('61400000001', '📷 [Photo] how do I pay this?', {
    media: { ...media, caption: 'how do I pay this?' },
  });

  expect(result).toBeNull();       // falls through to the normal manual task
  expect(addTask).not.toHaveBeenCalled();
});

// ── The daily AI budget now covers the vision check ────────────────────────
//
// Jo, 29 Aug: read what the customer WROTE first; only reach for the picture
// when there is nothing to read. These two tests pin the consequence of that
// ordering, which is what makes the budget gate safe to add at all.

it('a captioned screenshot never touches the budget or the vision check', async () => {
  bumpCounter.mockResolvedValue(true); // budget fully exhausted
  const c = await handlePaymentProofMedia('61400000001', 'just paid it!', { media });

  expect(bumpCounter).not.toHaveBeenCalled();
  expect(assessPaymentProofImage).not.toHaveBeenCalled();
  expect(c).not.toBeNull(); // the customer's word is enough, budget or no budget
});

it('a caption-less screenshot on an exhausted budget goes to a human, not to nothing', async () => {
  bumpCounter.mockResolvedValue(true);
  const c = await handlePaymentProofMedia('61400000001', '📷 [Photo]', { media });

  // No paid call was made.
  expect(assessPaymentProofImage).not.toHaveBeenCalled();
  // Nothing was decided, sent or moved.
  expect(setState).not.toHaveBeenCalled();
  expect(deliverOut).not.toHaveBeenCalled();
  // null is the "a person must look at this" path, the same one a picture we
  // cannot download takes. It is not silence.
  expect(c).toBeNull();
  expect(audit).toHaveBeenCalledWith('system', 'payment_proof_check_skipped',
    expect.objectContaining({ reason: expect.stringContaining('budget') }));
});

it('a broken budget lookup does not block a payment', async () => {
  bumpCounter.mockRejectedValue(new Error('store down'));
  await handlePaymentProofMedia('61400000001', '📷 [Photo]', { media });

  // Behaviour identical to before the gate existed: the check still runs.
  expect(assessPaymentProofImage).toHaveBeenCalled();
});
