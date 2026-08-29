/**
 * The live scheduled-follow-ups page (replaced "Regenerate report").
 *
 * What this pins:
 *  - it is session-guarded exactly like its sibling routes,
 *  - only SCHEDULED FOLLOW_UP jobs appear (never an auto-close, an autopilot
 *    reply, the nightly job, or one that has already been sent or cancelled),
 *  - rows are joined to the customer and ordered by when they will send,
 *  - a job whose customer is gone is dropped rather than rendered as a blank.
 */
const sessionValid = jest.fn().mockReturnValue(true);
jest.mock('@/lib/will/auth', () => ({ sessionValid: async () => sessionValid() }));

let jobs: Record<string, unknown>[] = [];
let customers: Record<string, unknown>[] = [];
let templates: Record<string, unknown>[] = [];
jest.mock('@/lib/will/store', () => ({
  getStore: () => ({
    listJobs: async () => jobs,
    listCustomers: async () => customers,
    listTemplates: async () => templates,
  }),
}));

import { GET } from '@/app/api/will/followups/route';

const job = (over: Record<string, unknown>) => ({
  id: 'j', customerId: 'c1', kind: 'FOLLOW_UP', status: 'SCHEDULED',
  payload: { templateKey: 'fu_pre_24h', seq: 0, flow: 'prePayment' },
  runAt: '2026-09-01T00:00:00.000Z', createdAt: '2026-08-26T00:00:00.000Z', ...over,
});

beforeEach(() => {
  sessionValid.mockReturnValue(true);
  customers = [
    { id: 'c1', waId: '+61400000001', name: 'Marco', state: 'PRICE_SENT', lang: 'it' },
    { id: 'c2', waId: '+61400000002', name: null, state: 'FORM_PENDING', lang: null },
  ];
  templates = [
    { key: 'fu_pre_24h', title: 'Pre-payment · 24h', body: 'Hi {{1}}, just checking in on your tax return.' },
    { key: 'fu_form_6h', title: 'Form · 6h', body: 'Hi {{1}}, your form is still waiting for you.' },
  ];
  jobs = [];
});

async function body() {
  const res = await GET();
  return res.json();
}

it('refuses a caller with no CRM session', async () => {
  sessionValid.mockReturnValue(false);
  const res = await GET();
  expect(res.status).toBe(401);
  expect((await res.json()).ok).toBe(false);
});

it('lists only follow-ups that are still scheduled', async () => {
  jobs = [
    job({ id: 'keep-1' }),
    job({ id: 'sent', status: 'DONE' }),
    job({ id: 'cancelled', status: 'CANCELLED' }),
    job({ id: 'claimed', status: 'CLAIMED' }),
    job({ id: 'autoclose', kind: 'AUTO_CLOSE', payload: {} }),
    job({ id: 'autoreply', kind: 'AUTO_REPLY', payload: { messageId: 'm1' } }),
    job({ id: 'nightly', kind: 'NIGHTLY', customerId: null, payload: {} }),
  ];
  const b = await body();
  expect(b.rows.map((r: { jobId: string }) => r.jobId)).toEqual(['keep-1']);
});

it('orders by when it will send, soonest first', async () => {
  jobs = [
    job({ id: 'later', runAt: '2026-09-05T00:00:00.000Z' }),
    job({ id: 'soonest', runAt: '2026-08-27T00:00:00.000Z' }),
    job({ id: 'middle', runAt: '2026-09-01T00:00:00.000Z' }),
  ];
  const b = await body();
  expect(b.rows.map((r: { jobId: string }) => r.jobId)).toEqual(['soonest', 'middle', 'later']);
});

it('joins the customer and names the message that will be sent', async () => {
  jobs = [job({ id: 'j1', customerId: 'c2', payload: { templateKey: 'fu_form_6h', seq: 1, flow: 'form' } })];
  const [row] = (await body()).rows;
  expect(row).toMatchObject({
    customerId: 'c2', waId: '+61400000002', state: 'FORM_PENDING',
    flow: 'form', seq: 1, templateKey: 'fu_form_6h', templateTitle: 'Form · 6h',
  });
});

it('still lists a follow-up whose Library entry was deleted', async () => {
  // The scheduler skips it and moves the cadence on; the owner should see that
  // it is queued rather than have it silently vanish from the page.
  jobs = [job({ id: 'j1', payload: { templateKey: 'deleted_key', seq: 0, flow: 'prePayment' } })];
  const [row] = (await body()).rows;
  expect(row.templateKey).toBe('deleted_key');
  expect(row.templateTitle).toBeNull();
  expect(row.body).toBeNull();
});

// ── The message text itself (Jo, 27 Aug: "add what you're actually going to
//    send me in the nudge") ────────────────────────────────────────────────
// The row shows the DELIVERED text, not the raw template, so that what is on
// screen is what lands on someone's phone. The substitution must match
// scheduler.ts exactly or the preview becomes a lie.

it('returns the message with {{1}} already filled in, as the customer will see it', async () => {
  jobs = [job({ id: 'j1', customerId: 'c1' })];
  const [row] = (await body()).rows;
  expect(row.body).toBe('Hi Marco, just checking in on your tax return.');
  expect(row.body).not.toContain('{{1}}');
});

it('falls back to the same neutral greeting the scheduler uses when there is no name', async () => {
  // greetingName() answers 'there' for a customer with no WhatsApp profile
  // name, because Meta rejects an empty template parameter. The preview has to
  // show that same word, not a blank or the raw placeholder.
  jobs = [job({ id: 'j1', customerId: 'c2', payload: { templateKey: 'fu_form_6h', seq: 0, flow: 'form' } })];
  const [row] = (await body()).rows;
  expect(row.body).toBe('Hi there, your form is still waiting for you.');
});

it('treats an empty Library body as nothing to preview', async () => {
  templates = [{ key: 'fu_pre_24h', title: 'Pre-payment · 24h', body: '   ' }];
  jobs = [job({ id: 'j1', customerId: 'c1' })];
  const [row] = (await body()).rows;
  expect(row.body).toBeNull();
});

it('drops a job whose customer no longer exists', async () => {
  jobs = [job({ id: 'orphan', customerId: 'gone' }), job({ id: 'ok' })];
  expect((await body()).rows.map((r: { jobId: string }) => r.jobId)).toEqual(['ok']);
});
