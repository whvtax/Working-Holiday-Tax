/**
 * Approving a "payment received" draft from a pre-price stage (audit, 3 Sep).
 *
 * Approval mode. A customer was quoted in the chat (still QUALIFIED) and sends
 * the receipt captioned "paid". handlePaymentProofMedia drafts the confirmation
 * with proposedState PAID and opens a task. Approve then refused it: QUALIFIED
 * -> PAID is not a one-step walk in the state machine, so the draft was marked
 * STALE_DRAFT, a second task appeared, nothing was sent and the customer stayed
 * in Lead with paid=false. The screenshot path accepts a receipt from any
 * pre-payment sales stage (PAYMENT_PROOF_STATES); Approve now accepts the same.
 */
const customer = {
  id: 'c1', waId: '61400000001', name: 'Alex', state: 'QUALIFIED', paid: false,
  optedOut: false, isLegacy: false, aiPaused: false, lang: null,
  lastCustomerMsgAt: new Date().toISOString(), estimatedRefundCents: null,
};
const draft = {
  id: 'm1', customerId: 'c1', direction: 'OUT', author: 'AI', status: 'PENDING_APPROVAL',
  body: 'Payment received!\n\nPlease fill out this quick form so we can start reviewing your situation:\n\nhttps://workingholidaytax.com.au/tax-form\n\nOnce you\'ve submitted it, we\'ll go through everything and get back to you within 24 hours.',
  meta: { proposedState: 'PAID' }, createdAt: new Date().toISOString(),
};
const store = {
  getMessageById: jest.fn().mockResolvedValue(draft),
  getCustomerById: jest.fn().mockImplementation(async () => ({ ...customer })),
  getSetting: jest.fn().mockResolvedValue(undefined),
  setMessageStatus: jest.fn().mockResolvedValue(undefined),
  claimMessageForSend: jest.fn().mockResolvedValue(true),
  setState: jest.fn().mockImplementation(async (_id: string, to: string) => { customer.state = to; if (to === 'PAID') customer.paid = true; return true; }),
  updateCustomer: jest.fn().mockResolvedValue(undefined),
  addTask: jest.fn().mockResolvedValue({ id: 't1' }),
  audit: jest.fn().mockResolvedValue(undefined),
  markCustomerRead: jest.fn().mockResolvedValue(undefined),
  listTasks: jest.fn().mockResolvedValue([]),
  listMessages: jest.fn().mockResolvedValue([]),
  resolveTask: jest.fn().mockResolvedValue(undefined),
  cancelJobsFor: jest.fn().mockResolvedValue(0),
  listJobsForCustomer: jest.fn().mockResolvedValue([]),
  addJob: jest.fn().mockResolvedValue({ id: 'j1' }),
};
jest.mock('@/lib/will/store', () => ({ getStore: () => store }));
jest.mock('@/lib/will/auth', () => ({ sessionValid: jest.fn().mockResolvedValue(true) }));
jest.mock('@/lib/will/channel', () => ({
  sendWhatsAppText: jest.fn().mockResolvedValue({ ok: true }),
  sendWhatsAppTemplate: jest.fn().mockResolvedValue({ ok: true }),
  deliverOut: jest.fn().mockResolvedValue({ ok: true }),
}));

import { POST } from '@/app/api/will/actions/route';

const approve = () => POST(new Request('http://x/api/will/actions', {
  method: 'POST', headers: { 'content-type': 'application/json' },
  body: JSON.stringify({ action: 'approve_message', id: 'm1' }),
}));

beforeEach(() => {
  Object.assign(customer, { state: 'QUALIFIED', paid: false });
  for (const fn of Object.values(store)) (fn as jest.Mock).mockClear();
});

it('approves the payment draft from QUALIFIED: sent, Paid, then Form Pending', async () => {
  const res = await approve();
  const j = await res.json();
  expect(j.ok).toBe(true);
  expect(store.setMessageStatus).toHaveBeenCalledWith('m1', 'SENT', expect.anything());
  expect(store.setState).toHaveBeenCalledWith('c1', 'PAID', 'HUMAN');
  expect(store.setState).toHaveBeenCalledWith('c1', 'FORM_PENDING', 'SYSTEM');
  expect(store.addTask).not.toHaveBeenCalled();
});

it('approves it from NEW_LEAD as well', async () => {
  Object.assign(customer, { state: 'NEW_LEAD' });
  const j = await (await approve()).json();
  expect(j.ok).toBe(true);
  expect(store.setState).toHaveBeenCalledWith('c1', 'PAID', 'HUMAN');
});

it('still refuses a genuinely stale draft (already paid, now under review)', async () => {
  Object.assign(customer, { state: 'UNDER_REVIEW', paid: true });
  const j = await (await approve()).json();
  expect(j.ok).toBe(false);
  expect(j.blocked).toEqual(['STALE_DRAFT']);
  expect(store.setState).not.toHaveBeenCalled();
});
