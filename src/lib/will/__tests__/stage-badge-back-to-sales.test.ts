/**
 * Moving a PAID customer back into a sales stage by hand clears the paid flag
 * (Jo, 18 Sep, Miu +61 468 697 785).
 *
 * setState only sets `paid` on the way forward (a post-payment stage is the
 * proof of payment), so dragging Miu's badge from Signature back to New lead
 * left paid=true behind. The nightly consistency check then listed her every
 * night as "paid but in sales state NEW_LEAD" with only Jo's hand able to fix
 * it, while the paid flag silently suppressed the sales cadence her stage said
 * she was in. The badge is the owner's explicit override, so it is honoured in
 * both directions: back into sales means "not a paying client right now" and
 * the flag follows the stage, with an audit row saying so.
 *
 * The one-stage-at-a-time (non-forced) path is unchanged: it still refuses to
 * move a paid customer back into sales at all.
 */
const customer = {
  id: 'c1', waId: '61468697785', name: 'Miu', state: 'SIGNATURE_PENDING', paid: true, formComplete: true,
  optedOut: false, isLegacy: false, aiPaused: false, lang: 'ja',
  lastCustomerMsgAt: new Date(Date.now() - 2 * 86400_000).toISOString(), estimatedRefundCents: null,
};
const settings: Record<string, unknown> = {};
const store = {
  getCustomerById: jest.fn().mockImplementation(async () => ({ ...customer })),
  getSetting: jest.fn().mockImplementation(async (k: string) => settings[k]),
  setState: jest.fn().mockImplementation(async (_id: string, to: string) => { customer.state = to; return true; }),
  updateCustomer: jest.fn().mockImplementation(async (_id: string, patch: Record<string, unknown>) => { Object.assign(customer, patch); }),
  addTask: jest.fn().mockResolvedValue({ id: 't1' }),
  updateTask: jest.fn().mockResolvedValue(undefined),
  findOpenTaskForCustomer: jest.fn().mockResolvedValue(null),
  audit: jest.fn().mockResolvedValue(undefined),
  listTasks: jest.fn().mockResolvedValue([]),
  listMessages: jest.fn().mockResolvedValue([]),
  listTemplates: jest.fn().mockResolvedValue([]),
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

const move = (state: string, force = true) => POST(new Request('http://x/api/will/actions', {
  method: 'POST', headers: { 'content-type': 'application/json' },
  body: JSON.stringify({ action: 'set_state', customerId: 'c1', state, force }),
}));

beforeEach(() => {
  Object.assign(customer, { state: 'SIGNATURE_PENDING', paid: true });
  for (const fn of Object.values(store)) (fn as jest.Mock).mockClear();
});

it('badge move Signature -> New lead clears the paid flag and audits it', async () => {
  const j = await (await move('NEW_LEAD')).json();
  expect(j.ok).toBe(true);
  expect(store.setState).toHaveBeenCalledWith('c1', 'NEW_LEAD', 'HUMAN');
  expect(store.updateCustomer).toHaveBeenCalledWith('c1', { paid: false });
  expect(store.audit).toHaveBeenCalledWith('owner', 'paid_flag_cleared_by_stage_move', { customerId: 'c1', from: 'SIGNATURE_PENDING', to: 'NEW_LEAD' });
  expect(customer.paid).toBe(false);
});

it('badge move to another post-payment stage leaves the paid flag alone', async () => {
  const j = await (await move('UNDER_REVIEW')).json();
  expect(j.ok).toBe(true);
  expect(store.updateCustomer).not.toHaveBeenCalledWith('c1', expect.objectContaining({ paid: false }));
  expect(customer.paid).toBe(true);
});

it('badge move of an UNPAID lead between sales stages writes nothing about paid', async () => {
  Object.assign(customer, { state: 'PRICE_SENT', paid: false });
  const j = await (await move('QUALIFIED')).json();
  expect(j.ok).toBe(true);
  expect(store.updateCustomer).not.toHaveBeenCalledWith('c1', expect.objectContaining({ paid: expect.anything() }));
});

it('the ordinary (non-forced) path still refuses to move a paid customer back into sales', async () => {
  const res = await move('NEW_LEAD', false);
  expect(res.status).toBe(400);
  expect(store.setState).not.toHaveBeenCalled();
  expect(customer.paid).toBe(true);
});
