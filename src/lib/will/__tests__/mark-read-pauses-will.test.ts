/**
 * (Jo, 6 Sep) Wiring test: the `mark_read` HTTP action — fired by the CRM
 * whenever Jo opens a customer's card — must trigger pauseWillOnCrmOpen.
 * Separately, the manual `toggle_ai` action (Take Over / Resume Will) must
 * remain completely independent of this: it flips aiPaused directly, with
 * no involvement from review-auto-off at all.
 */
const customer = {
  id: 'c1', waId: '61400000001', name: 'Alex', state: 'UNDER_REVIEW', paid: true, formComplete: true,
  optedOut: false, aiPaused: false, isLegacy: false, lang: null, income: 'TFN',
};
const store = {
  markCustomerRead: jest.fn().mockResolvedValue(undefined),
  getCustomerById: jest.fn().mockImplementation(async () => ({ ...customer })),
  updateCustomer: jest.fn().mockImplementation(async (_id: string, patch: Record<string, unknown>) => { Object.assign(customer, patch); }),
  audit: jest.fn().mockResolvedValue(undefined),
};
jest.mock('@/lib/will/store', () => ({ getStore: () => store }));
jest.mock('@/lib/will/auth', () => ({ sessionValid: () => true }));
jest.mock('@/lib/will/scheduler', () => ({ reconcileSchedule: jest.fn().mockResolvedValue(undefined) }));

import { POST } from '@/app/api/will/actions/route';

function req(body: Record<string, unknown>) {
  return new Request('http://x/api/will/actions', {
    method: 'POST',
    headers: { 'content-type': 'application/json', cookie: 'session=x' },
    body: JSON.stringify(body),
  });
}

beforeEach(() => {
  Object.assign(customer, { aiPaused: false });
  for (const fn of Object.values(store)) (fn as jest.Mock).mockClear();
});

describe('mark_read pauses Will on CRM open', () => {
  it('calls markCustomerRead as before, then pauses Will for that customer', async () => {
    const res = await POST(req({ action: 'mark_read', id: 'c1' }));
    expect(res.status).toBe(200);
    expect(store.markCustomerRead).toHaveBeenCalledWith('c1');
    expect(store.updateCustomer).toHaveBeenCalledWith('c1', { aiPaused: true });
    expect(store.audit).toHaveBeenCalledWith('system', 'will_auto_paused_on_crm_open', { customerId: 'c1' });
  });

  it('is a no-op pause when the customer is already paused, but mark_read still succeeds', async () => {
    Object.assign(customer, { aiPaused: true });
    const res = await POST(req({ action: 'mark_read', id: 'c1' }));
    expect(res.status).toBe(200);
    expect(store.markCustomerRead).toHaveBeenCalledWith('c1');
    expect(store.updateCustomer).not.toHaveBeenCalled();
  });

  it('does not depend on stage, payment, or form status', async () => {
    Object.assign(customer, { state: 'NEW_LEAD', paid: false, formComplete: false, aiPaused: false });
    const res = await POST(req({ action: 'mark_read', id: 'c1' }));
    expect(res.status).toBe(200);
    expect(store.updateCustomer).toHaveBeenCalledWith('c1', { aiPaused: true });
  });
});

describe('toggle_ai remains untouched by this change', () => {
  it('resumes Will (value: true -> aiPaused: false) with no review-auto-off involvement', async () => {
    // Simulate the manual toggle turning Will back on after the auto-pause.
    Object.assign(customer, { aiPaused: true });
    const res = await POST(req({ action: 'toggle_ai', id: 'c1', value: true }));
    expect(res.status).toBe(200);
    expect(store.updateCustomer).toHaveBeenCalledWith('c1', { aiPaused: false });
    expect(customer.aiPaused).toBe(false);
    // toggle_ai must not itself call audit with the auto-pause event.
    expect(store.audit).not.toHaveBeenCalledWith('system', 'will_auto_paused_on_crm_open', expect.anything());
    expect(store.audit).toHaveBeenCalledWith('owner', 'assistant_resumed', { customerId: 'c1' });
  });

  it('manually pausing (value: false -> aiPaused: true) also stays independent of review-auto-off', async () => {
    Object.assign(customer, { aiPaused: false });
    const res = await POST(req({ action: 'toggle_ai', id: 'c1', value: false }));
    expect(res.status).toBe(200);
    expect(store.updateCustomer).toHaveBeenCalledWith('c1', { aiPaused: true });
    expect(store.audit).toHaveBeenCalledWith('owner', 'assistant_paused', { customerId: 'c1' });
    expect(store.audit).not.toHaveBeenCalledWith('system', 'will_auto_paused_on_crm_open', expect.anything());
  });
});
