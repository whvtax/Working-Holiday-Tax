/**
 * A questionnaire that arrives BEFORE payment is remembered (audit, 3 Sep).
 *
 * The site link is public, so some leads fill the form first and pay after.
 * The form used to be ignored at that stage; "Payment received" then asked
 * them to fill it in, Form Pending armed the 6h/3d/7d reminders, and nothing
 * ever marked it complete unless they submitted it a second time. Now the
 * early submission sets formComplete (no stage move, no message, so the
 * phone-match exposure stays one flag), and the Paid cascade replays the
 * FORM_RECEIVED step: confirmation, ABN questions, reminders cancelled.
 */
const customer = {
  id: 'c1', waId: '61400000001', name: 'Alex', state: 'PRICE_SENT', paid: false, formComplete: false,
  optedOut: false, aiPaused: false, isLegacy: false, lang: null,
};
const store = {
  updateCustomer: jest.fn().mockImplementation(async (_id: string, patch: Record<string, unknown>) => { Object.assign(customer, patch); }),
  audit: jest.fn().mockResolvedValue(undefined),
  addJob: jest.fn().mockResolvedValue({ id: 'j1' }),
  getCustomerById: jest.fn().mockImplementation(async () => ({ ...customer })),
  setState: jest.fn().mockImplementation(async (_id: string, to: string) => { customer.state = to; return true; }),
  findCustomerByPhone: jest.fn().mockImplementation(async () => ({ ...customer })),
};
jest.mock('@/lib/will/store', () => ({ getStore: () => store }));
import { notifyFormReceived } from '@/lib/will/form-link';
import { autoAdvanceToForm } from '@/lib/will/service';

beforeEach(() => {
  Object.assign(customer, { state: 'PRICE_SENT', paid: false, formComplete: false });
  for (const fn of Object.values(store)) (fn as jest.Mock).mockClear();
});

it('before payment: remembered as formComplete, nothing queued, nothing moved', async () => {
  const r = await notifyFormReceived('61400000001', 'a@b.c');
  expect(r.matched).toBe(true);
  expect(customer.formComplete).toBe(true);
  expect(store.addJob).not.toHaveBeenCalled();
  expect(store.setState).not.toHaveBeenCalled();
  expect(store.audit).toHaveBeenCalledWith('system', 'form_received_before_payment', expect.anything());
});

it('after paying: the Paid cascade replays FORM_RECEIVED instead of chasing the form', async () => {
  Object.assign(customer, { state: 'PAID', paid: true, formComplete: true });
  await autoAdvanceToForm('c1', { bsb: '062692', account: '81049952' });
  expect(store.setState).toHaveBeenCalledWith('c1', 'FORM_PENDING', 'SYSTEM');
  expect(store.addJob).toHaveBeenCalledWith(expect.objectContaining({ kind: 'FORM_RECEIVED', customerId: 'c1' }));
});

it('after paying with no form yet: Form Pending and no replay', async () => {
  Object.assign(customer, { state: 'PAID', paid: true, formComplete: false });
  await autoAdvanceToForm('c1', { bsb: '062692', account: '81049952' });
  expect(store.setState).toHaveBeenCalledWith('c1', 'FORM_PENDING', 'SYSTEM');
  expect(store.addJob).not.toHaveBeenCalled();
});
