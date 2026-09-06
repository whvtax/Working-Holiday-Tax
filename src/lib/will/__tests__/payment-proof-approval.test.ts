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

const reconcileSchedule = jest.fn().mockResolvedValue(undefined);
jest.mock('@/lib/will/scheduler', () => ({ reconcileSchedule: (...a: unknown[]) => reconcileSchedule(...a) }));

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

it('trusts the caption even when the vision check cannot read the picture', async () => {
  assessPaymentProofImage.mockResolvedValue({ isProof: false, reason: 'too blurry to tell' });

  await handlePaymentProofMedia('61400000001', '📷 [Photo] just paid it!', {
    media: { ...media, caption: 'just paid it!' },
  });

  // Jo, 3 Sep: the picture IS looked at now even when the words are there,
  // because reading the amount and the recipient off it is what lets a
  // verified payment go through with no task. When it cannot be read, the
  // words still carry the payment exactly as before.
  expect(assessPaymentProofImage).toHaveBeenCalled();
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

// ── The daily AI budget covers the vision check ─────────────────────────────
//
// Jo, 29 Aug: the customer's words never depend on the budget. Jo, 3 Sep: the
// picture is read whenever the budget allows, words or no words, because that
// is what verifies the amount and the recipient. On an exhausted budget the
// words alone still carry the payment (with the glance task).

it('a captioned screenshot on an exhausted budget is still trusted on the words', async () => {
  bumpCounter.mockResolvedValue(true); // budget fully exhausted
  const c = await handlePaymentProofMedia('61400000001', 'just paid it!', { media });

  expect(assessPaymentProofImage).not.toHaveBeenCalled(); // no paid call on an exhausted day
  expect(c).not.toBeNull(); // the customer's word is enough, budget or no budget
  expect(addTask).toHaveBeenCalledTimes(1);
  expect(addTask.mock.calls[0][0].reason).toMatch(/they said they paid/);
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

// ── Verified means no task (Jo, 3 Sep) ──────────────────────────────────────
//
// The vision check reads the amount, the recipient and the status. When they
// add up to our fee, in our account, completed, there is nothing for a person
// to check, so in Autopilot the payment is confirmed with NO task. Anything
// the picture could not show keeps the heads-up, and the heads-up names it.

const wise220 = {
  isProof: true,
  reason: 'Wise transfer confirmation',
  details: { amountAud: 220, recipient: 'Simple Tax Services', recipientIsUs: 'yes', status: 'completed' },
};

describe('a fully verified screenshot in Autopilot', () => {
  beforeEach(() => { getSetting.mockResolvedValue('FULL_AUTO'); });

  it('moves to Paid, sends the confirmation and opens NO task', async () => {
    assessPaymentProofImage.mockResolvedValue(wise220);
    reconcileSchedule.mockClear();
    await handlePaymentProofMedia('61400000001', '📷 [Photo] Erledigt :)', { media: { ...media, caption: 'Erledigt :)' } });

    expect(setState).toHaveBeenCalledWith('c1', 'PAID', 'SYSTEM');
    expect(deliverOut).toHaveBeenCalledTimes(1);
    expect(addTask).not.toHaveBeenCalled();
    expect(audit).toHaveBeenCalledWith('system', 'auto_paid_from_media', expect.objectContaining({ verified: true }));
    // Paid -> Form Pending just happened, so the form reminders are armed for
    // it (audit, 3 Sep: this path never reconciled, so no reminder was sent).
    expect(reconcileSchedule).toHaveBeenCalledTimes(1);
  });

  it('accepts the ABN fee and a few dollars of transfer loss', async () => {
    assessPaymentProofImage.mockResolvedValue({ ...wise220, details: { ...wise220.details, amountAud: 381.5 } });
    await handlePaymentProofMedia('61400000001', '📷 [Photo]', { media });
    expect(addTask).not.toHaveBeenCalled();
  });

  it('still raises the URGENT task when WhatsApp rejects the confirmation', async () => {
    assessPaymentProofImage.mockResolvedValue(wise220);
    deliverOut.mockResolvedValueOnce({ ok: false, error: 'outside the 24h window' });
    await handlePaymentProofMedia('61400000001', '📷 [Photo]', { media });
    // (audit, 5 Sep) The task is deliverOut's own, written with the caller's
    // onFailure wording, so the caller adds nothing itself: two cards for one
    // silence was the friction. deliverOut is mocked here, so the assertion
    // is on what it was handed.
    expect(addTask).not.toHaveBeenCalled();
    const opts = deliverOut.mock.calls[0][5] as { onFailure: { reason: (e?: string) => string; severity: string } };
    expect(opts.onFailure.severity).toBe('URGENT');
    expect(opts.onFailure.reason('outside the 24h window')).toContain('PAID, BUT THEY HAVE NOT BEEN TOLD');
  });
});

describe('a payment taken on trust keeps the heads-up, and says why', () => {
  beforeEach(() => { getSetting.mockResolvedValue('FULL_AUTO'); });

  // 4 Sep: the picture alone no longer decides it when the picture itself says
  // something else. The customer's WORD still does (that is Jo's trust rule and
  // it is unchanged, see the two cases below) — but a screenshot showing $150,
  // or no amount at all, with nothing typed under it, must not move anyone to
  // Paid or tell them "Payment received" for money that has not arrived.
  it('no AUD amount visible and nothing said: NOT Paid, task says what was shown', async () => {
    assessPaymentProofImage.mockResolvedValue({ ...wise220, details: { ...wise220.details, amountAud: null } });
    await handlePaymentProofMedia('61400000001', '📷 [Photo]', { media });
    expect(setState).not.toHaveBeenCalledWith('c1', 'PAID', 'SYSTEM');
    expect(deliverOut).not.toHaveBeenCalled();
    expect(addTask).toHaveBeenCalledTimes(1);
    expect(addTask.mock.calls[0][0].reason).toMatch(/does not match/);
    expect(addTask.mock.calls[0][0].context).toMatch(/no AUD amount is visible/);
  });

  it('a wrong amount and nothing said: NOT Paid, task says the amount', async () => {
    assessPaymentProofImage.mockResolvedValue({ ...wise220, details: { ...wise220.details, amountAud: 150 } });
    await handlePaymentProofMedia('61400000001', '📷 [Photo]', { media });
    expect(setState).not.toHaveBeenCalledWith('c1', 'PAID', 'SYSTEM');
    expect(addTask).toHaveBeenCalledTimes(1);
    expect(addTask.mock.calls[0][0].reason).toMatch(/\$150/);
    expect(addTask.mock.calls[0][0].context).toMatch(/not \$220 or \$385/);
  });

  it('the same wrong amount WITH "paid" typed under it is still trusted', async () => {
    assessPaymentProofImage.mockResolvedValue({ ...wise220, details: { ...wise220.details, amountAud: 150 } });
    await handlePaymentProofMedia('61400000001', '📷 [Photo] paid!', { media: { ...media, caption: 'paid!' } });
    expect(setState).toHaveBeenCalledWith('c1', 'PAID', 'SYSTEM');
    expect(addTask).toHaveBeenCalledTimes(1);
    expect(addTask.mock.calls[0][0].reason).toMatch(/they said they paid/);
  });

  it('a pending transfer: Paid on trust, task says pending', async () => {
    assessPaymentProofImage.mockResolvedValue({ ...wise220, details: { ...wise220.details, status: 'pending' } });
    await handlePaymentProofMedia('61400000001', '📷 [Photo]', { media });
    expect(addTask).toHaveBeenCalledTimes(1);
    expect(addTask.mock.calls[0][0].reason).toMatch(/pending/);
  });

  it('words plus an unreadable picture: Paid, task says the screenshot could not be read', async () => {
    assessPaymentProofImage.mockResolvedValue({ isProof: false, reason: 'too blurry to tell' });
    await handlePaymentProofMedia('61400000001', '📷 [Photo] paid!', { media: { ...media, caption: 'paid!' } });
    expect(setState).toHaveBeenCalledWith('c1', 'PAID', 'SYSTEM');
    expect(addTask).toHaveBeenCalledTimes(1);
    expect(addTask.mock.calls[0][0].reason).toMatch(/they said they paid/);
    expect(addTask.mock.calls[0][0].reason).toMatch(/could not be read/);
  });
});

describe('a payment that is demonstrably not ours never confirms on the picture alone', () => {
  beforeEach(() => { getSetting.mockResolvedValue('FULL_AUTO'); });

  it('a transfer to someone else falls through to the manual task', async () => {
    assessPaymentProofImage.mockResolvedValue({
      ...wise220, details: { amountAud: 220, recipient: 'Jane Citizen', recipientIsUs: 'no', status: 'completed' },
    });
    const c = await handlePaymentProofMedia('61400000001', '📷 [Photo]', { media });
    expect(c).toBeNull();
    expect(setState).not.toHaveBeenCalled();
    expect(deliverOut).not.toHaveBeenCalled();
    expect(audit).toHaveBeenCalledWith('system', 'payment_proof_rejected', expect.anything());
  });

  it('a failed transfer falls through to the manual task', async () => {
    assessPaymentProofImage.mockResolvedValue({ ...wise220, details: { ...wise220.details, status: 'failed' } });
    const c = await handlePaymentProofMedia('61400000001', '📷 [Photo]', { media });
    expect(c).toBeNull();
    expect(setState).not.toHaveBeenCalled();
  });

  it('but the words still win, with the mismatch spelled out on the task', async () => {
    assessPaymentProofImage.mockResolvedValue({
      ...wise220, details: { amountAud: 220, recipient: 'Jane Citizen', recipientIsUs: 'no', status: 'completed' },
    });
    await handlePaymentProofMedia('61400000001', '📷 [Photo] paid', { media: { ...media, caption: 'paid' } });
    expect(setState).toHaveBeenCalledWith('c1', 'PAID', 'SYSTEM');
    expect(addTask).toHaveBeenCalledTimes(1);
    expect(addTask.mock.calls[0][0].reason).toMatch(/Jane Citizen/);
  });
});
