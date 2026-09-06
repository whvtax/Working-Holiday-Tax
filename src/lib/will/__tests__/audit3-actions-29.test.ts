/**
 * Moving an already-paid customer back to Paid does not re-run the payment
 * cascade (audit, 5 Sep).
 *
 * The forced set_state -> PAID branch ran autoAdvanceToForm no matter where
 * the customer came from. A customer corrected from Review back to Paid was
 * pushed on to Form Pending, and because their questionnaire was already in,
 * a fresh FORM_RECEIVED job re-sent the "received" line or the ABN questions,
 * and the badge read "Review" again on refresh. Now the cascade only runs for
 * a first payment (previous stage a sales or closed one); a customer already
 * in a post-payment stage stays exactly where the owner put them.
 */
const customer = {
  id: 'c1', waId: '61400000001', name: 'Alex', state: 'UNDER_REVIEW', paid: true, formComplete: true,
  optedOut: false, isLegacy: false, aiPaused: false, lang: null,
  lastCustomerMsgAt: new Date(Date.now() - 2 * 86400_000).toISOString(), estimatedRefundCents: null,
};
const messages: Array<Record<string, unknown>> = [
  { id: 'm1', direction: 'OUT', status: 'SENT', body: 'Payment received. https://workingholidaytax.com.au/tax-form', createdAt: new Date().toISOString() },
];
const settings: Record<string, unknown> = {};
const store = {
  getCustomerById: jest.fn().mockImplementation(async () => ({ ...customer })),
  getSetting: jest.fn().mockImplementation(async (k: string) => settings[k]),
  setState: jest.fn().mockImplementation(async (_id: string, to: string) => { customer.state = to; if (to === 'PAID') customer.paid = true; return true; }),
  updateCustomer: jest.fn().mockResolvedValue(undefined),
  addTask: jest.fn().mockResolvedValue({ id: 't1' }),
  updateTask: jest.fn().mockResolvedValue(undefined),
  findOpenTaskForCustomer: jest.fn().mockResolvedValue(null),
  audit: jest.fn().mockResolvedValue(undefined),
  listTasks: jest.fn().mockResolvedValue([]),
  listMessages: jest.fn().mockImplementation(async () => messages),
  listTemplates: jest.fn().mockResolvedValue([]),
  cancelJobsFor: jest.fn().mockResolvedValue(0),
  listJobsForCustomer: jest.fn().mockResolvedValue([]),
  addJob: jest.fn().mockResolvedValue({ id: 'j1' }),
};
jest.mock('@/lib/will/store', () => ({ getStore: () => store }));
jest.mock('@/lib/will/auth', () => ({ sessionValid: jest.fn().mockResolvedValue(true) }));
const deliverOut = jest.fn().mockResolvedValue({ ok: true });
jest.mock('@/lib/will/channel', () => ({
  sendWhatsAppText: jest.fn().mockResolvedValue({ ok: true }),
  sendWhatsAppTemplate: jest.fn().mockResolvedValue({ ok: true }),
  deliverOut: (...a: unknown[]) => deliverOut(...a),
}));

import { POST } from '@/app/api/will/actions/route';

const setPaid = () => POST(new Request('http://x/api/will/actions', {
  method: 'POST', headers: { 'content-type': 'application/json' },
  body: JSON.stringify({ action: 'set_state', customerId: 'c1', state: 'PAID', force: true }),
}));

beforeEach(() => {
  Object.assign(customer, { state: 'UNDER_REVIEW', paid: true, formComplete: true });
  for (const fn of Object.values(store)) (fn as jest.Mock).mockClear();
  deliverOut.mockClear();
});

it('Review -> Paid by hand: stays in Paid, no FORM_RECEIVED replay, nothing sent', async () => {
  const j = await (await setPaid()).json();
  expect(j.ok).toBe(true);
  expect(store.setState).toHaveBeenCalledTimes(1);
  expect(store.setState).toHaveBeenCalledWith('c1', 'PAID', 'HUMAN');
  expect(store.setState).not.toHaveBeenCalledWith('c1', 'FORM_PENDING', 'SYSTEM');
  expect(customer.state).toBe('PAID');
  expect(store.addJob).not.toHaveBeenCalledWith(expect.objectContaining({ kind: 'FORM_RECEIVED' }));
  expect(deliverOut).not.toHaveBeenCalled();
});

it('first payment by hand still runs the cascade (unchanged)', async () => {
  Object.assign(customer, { state: 'PAYMENT_PENDING', paid: false, formComplete: false });
  messages.length = 0;
  const j = await (await setPaid()).json();
  expect(j.ok).toBe(true);
  expect(store.setState).toHaveBeenCalledWith('c1', 'PAID', 'HUMAN');
  expect(store.setState).toHaveBeenCalledWith('c1', 'FORM_PENDING', 'SYSTEM');
  expect(deliverOut).toHaveBeenCalledTimes(1);
});
