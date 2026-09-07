/**
 * (Jo, 6 Sep) Wiring test: the `mark_read` HTTP action — fired by the CRM
 * whenever Jo opens a customer's card — must trigger pauseWillOnCrmOpen.
 * Separately, the manual `toggle_ai` action (Take Over / Resume Will) must
 * remain completely independent of this: it flips aiPaused directly, with
 * no involvement from review-auto-off at all.
 *
 * (Jo, 7 Sep) Two more actions live here: `mark_read_silent` — the badge-only
 * clear the dashboard's poll effect uses on whichever chat is merely
 * SELECTED, which must never pause Will — and `resume_all_leads`, the
 * one-off bulk fix for every Lead-stage chat the old shared 'mark_read'
 * action had already paused by accident.
 */
const leadCustomer = {
  id: 'c2', waId: '61400000002', name: 'Sam', state: 'NEW_LEAD', paid: false, formComplete: false,
  optedOut: false, aiPaused: true, isLegacy: false, lang: null, income: 'TFN',
};
const nonLeadCustomer = {
  id: 'c3', waId: '61400000003', name: 'Jamie', state: 'PAID', paid: true, formComplete: false,
  optedOut: false, aiPaused: true, isLegacy: false, lang: null, income: 'TFN',
};
const alreadyOnLead = {
  id: 'c4', waId: '61400000004', name: 'Robin', state: 'QUALIFIED', paid: false, formComplete: false,
  optedOut: false, aiPaused: false, isLegacy: false, lang: null, income: 'TFN',
};
const customer = {
  id: 'c1', waId: '61400000001', name: 'Alex', state: 'UNDER_REVIEW', paid: true, formComplete: true,
  optedOut: false, aiPaused: false, isLegacy: false, lang: null, income: 'TFN',
};
const store = {
  markCustomerRead: jest.fn().mockResolvedValue(undefined),
  getCustomerById: jest.fn().mockImplementation(async () => ({ ...customer })),
  updateCustomer: jest.fn().mockImplementation(async (_id: string, patch: Record<string, unknown>) => {
    const row = [customer, leadCustomer, nonLeadCustomer, alreadyOnLead].find((c) => c.id === _id);
    if (row) Object.assign(row, patch);
  }),
  listCustomers: jest.fn().mockImplementation(async () => [customer, leadCustomer, nonLeadCustomer, alreadyOnLead]),
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
  Object.assign(leadCustomer, { aiPaused: true, state: 'NEW_LEAD' });
  Object.assign(nonLeadCustomer, { aiPaused: true, state: 'PAID' });
  Object.assign(alreadyOnLead, { aiPaused: false, state: 'QUALIFIED' });
  for (const fn of Object.values(store)) (fn as jest.Mock).mockClear();
});

// (Jo, 8 Sep) Reversal of the 6 Sep rule: opening/reading a chat, from the
// CRM or the phone, must never by itself switch Will off any more. aiPaused
// is now touched ONLY by the explicit toggle_ai action (Take Over / Resume
// Will). mark_read is back to being badge-clearing only.
describe('mark_read no longer pauses Will on CRM open', () => {
  it('calls markCustomerRead but never pauses the customer', async () => {
    const res = await POST(req({ action: 'mark_read', id: 'c1' }));
    expect(res.status).toBe(200);
    expect(store.markCustomerRead).toHaveBeenCalledWith('c1');
    expect(store.updateCustomer).not.toHaveBeenCalled();
    expect(store.audit).not.toHaveBeenCalledWith('system', 'will_auto_paused_on_crm_open', expect.anything());
  });

  it('leaves an already-active customer active', async () => {
    Object.assign(customer, { aiPaused: false });
    const res = await POST(req({ action: 'mark_read', id: 'c1' }));
    expect(res.status).toBe(200);
    expect(store.updateCustomer).not.toHaveBeenCalled();
    expect(customer.aiPaused).toBe(false);
  });

  it('does not depend on stage, payment, or form status', async () => {
    Object.assign(customer, { state: 'NEW_LEAD', paid: false, formComplete: false, aiPaused: false });
    const res = await POST(req({ action: 'mark_read', id: 'c1' }));
    expect(res.status).toBe(200);
    expect(store.updateCustomer).not.toHaveBeenCalled();
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

// ── The actual bug (Jo, 7 Sep): "half the chats have Will off" ─────────────
// Dashboard.tsx had a poll-driven effect that cleared the unread badge on
// whichever chat was merely the SELECTED one by calling the SAME 'mark_read'
// action openChat() uses for a real click — so any customer who simply
// stayed selected while Jo browsed elsewhere got auto-paused the next time
// they texted, with no click involved at all. mark_read_silent is the fix:
// same badge clear, zero pause.
describe('mark_read_silent clears the badge and never touches aiPaused', () => {
  it('calls markCustomerRead but never updateCustomer/pauseWillOnCrmOpen', async () => {
    const res = await POST(req({ action: 'mark_read_silent', id: 'c1' }));
    expect(res.status).toBe(200);
    expect(store.markCustomerRead).toHaveBeenCalledWith('c1');
    expect(store.updateCustomer).not.toHaveBeenCalled();
    expect(store.audit).not.toHaveBeenCalledWith('system', 'will_auto_paused_on_crm_open', expect.anything());
  });

  it('requires an id, same as mark_read', async () => {
    const res = await POST(req({ action: 'mark_read_silent' }));
    expect(res.status).not.toBe(200);
  });
});

// One-off bulk fix: turn Will back on for every Lead-stage chat that was
// caught by the bug above.
describe('resume_all_leads', () => {
  it('resumes only paused customers currently in the Lead group', async () => {
    const res = await POST(req({ action: 'resume_all_leads' }));
    const body = await res.json();
    expect(res.status).toBe(200);
    expect(body.ok).toBe(true);
    expect(body.resumed).toBe(1); // only leadCustomer: paused + NEW_LEAD
    expect(leadCustomer.aiPaused).toBe(false);
  });

  it('does not touch a paused customer outside the Lead group', async () => {
    await POST(req({ action: 'resume_all_leads' }));
    expect(nonLeadCustomer.aiPaused).toBe(true); // PAID stage, left alone
  });

  it('does not touch a Lead-stage customer who was never paused', async () => {
    await POST(req({ action: 'resume_all_leads' }));
    expect(store.updateCustomer).not.toHaveBeenCalledWith('c4', expect.anything());
    expect(alreadyOnLead.aiPaused).toBe(false);
  });

  it('audits the bulk action with a count', async () => {
    await POST(req({ action: 'resume_all_leads' }));
    expect(store.audit).toHaveBeenCalledWith('owner', 'assistant_resumed_bulk_leads', { count: 1 });
  });
});
