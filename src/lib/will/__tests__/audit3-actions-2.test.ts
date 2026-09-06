/**
 * Marking Paid by hand sends the form link (audit, 5 Sep).
 *
 * Every fallback in the payment path ends with "a person marks them Paid", and
 * the "screenshot does not match" task says the confirmation then goes out.
 * set_state -> PAID only ran the Paid -> Form Pending cascade: the reminders
 * were armed, the link was never sent, and six hours later the customer was
 * chased for a form they had not been given. Now the same approved
 * "payment received" line every automatic path sends goes out here too,
 * with the same silenced rules, and never twice.
 */
const customer = {
  id: 'c1', waId: '61400000001', name: 'Alex', state: 'PAYMENT_PENDING', paid: false,
  optedOut: false, isLegacy: false, aiPaused: false, lang: null,
  lastCustomerMsgAt: new Date(Date.now() - 2 * 86400_000).toISOString(), estimatedRefundCents: null,
};
const messages: Array<Record<string, unknown>> = [];
const settings: Record<string, unknown> = {};
const openTask: { id: string } | null = null;
const store = {
  getCustomerById: jest.fn().mockImplementation(async () => ({ ...customer })),
  getSetting: jest.fn().mockImplementation(async (k: string) => settings[k]),
  setState: jest.fn().mockImplementation(async (_id: string, to: string) => { customer.state = to; if (to === 'PAID') customer.paid = true; return true; }),
  updateCustomer: jest.fn().mockResolvedValue(undefined),
  addTask: jest.fn().mockResolvedValue({ id: 't1' }),
  updateTask: jest.fn().mockResolvedValue(undefined),
  findOpenTaskForCustomer: jest.fn().mockImplementation(async () => openTask),
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
import { PAYMENT_RECEIVED_MSG } from '@/lib/will/i18n';

const setPaid = (force = true) => POST(new Request('http://x/api/will/actions', {
  method: 'POST', headers: { 'content-type': 'application/json' },
  body: JSON.stringify({ action: 'set_state', customerId: 'c1', state: 'PAID', force }),
}));

beforeEach(() => {
  Object.assign(customer, { state: 'PAYMENT_PENDING', paid: false, aiPaused: false, isLegacy: false, optedOut: false, lang: null });
  messages.length = 0;
  for (const k of Object.keys(settings)) delete settings[k];
  for (const fn of Object.values(store)) (fn as jest.Mock).mockClear();
  deliverOut.mockClear();
  deliverOut.mockResolvedValue({ ok: true });
});

it('forced Paid from the stage badge sends the payment received line with the form link', async () => {
  const j = await (await setPaid(true)).json();
  expect(j.ok).toBe(true);
  expect(store.setState).toHaveBeenCalledWith('c1', 'PAID', 'HUMAN');
  expect(store.setState).toHaveBeenCalledWith('c1', 'FORM_PENDING', 'SYSTEM');
  expect(deliverOut).toHaveBeenCalledTimes(1);
  const [c, body, author, , tpl] = deliverOut.mock.calls[0];
  expect(c.id).toBe('c1');
  expect(body).toBe(PAYMENT_RECEIVED_MSG.en);
  expect(body).toContain('https://workingholidaytax.com.au/tax-form');
  expect(author).toBe('AI');
  // Outside the 24h window it must be able to go as the approved template.
  expect(tpl).toMatchObject({ name: 'payment_received', fallbackToText: true });
  expect(store.addTask).not.toHaveBeenCalled();
});

it('the one-step Paid move sends it too, in the customer language', async () => {
  customer.lang = 'de' as unknown as null;
  const j = await (await setPaid(false)).json();
  expect(j.ok).toBe(true);
  expect(deliverOut).toHaveBeenCalledTimes(1);
  expect(deliverOut.mock.calls[0][1]).toBe(PAYMENT_RECEIVED_MSG.de);
  expect(deliverOut.mock.calls[0][4]).toMatchObject({ name: 'payment_received_de' });
});

it('does not send it twice when the link already went out', async () => {
  messages.push({ direction: 'OUT', status: 'SENT', body: PAYMENT_RECEIVED_MSG.en });
  const j = await (await setPaid(true)).json();
  expect(j.ok).toBe(true);
  expect(deliverOut).not.toHaveBeenCalled();
  expect(store.addTask).not.toHaveBeenCalled();
});

it('a FAILED earlier attempt does not count as told', async () => {
  messages.push({ direction: 'OUT', status: 'FAILED', body: PAYMENT_RECEIVED_MSG.en });
  await setPaid(true);
  expect(deliverOut).toHaveBeenCalledTimes(1);
});

it('kill switch: nothing sent, one URGENT task with the confirmation ready to send', async () => {
  settings.kill_switch = true;
  const j = await (await setPaid(true)).json();
  expect(j.ok).toBe(true);
  expect(deliverOut).not.toHaveBeenCalled();
  expect(store.addTask).toHaveBeenCalledTimes(1);
  const t = store.addTask.mock.calls[0][0];
  expect(t.severity).toBe('URGENT');
  expect(t.suggestedReply).toBe(PAYMENT_RECEIVED_MSG.en);
  expect(t.reason).toContain('kill switch');
  // The stage still moved: paid by hand is paid.
  expect(store.setState).toHaveBeenCalledWith('c1', 'FORM_PENDING', 'SYSTEM');
});

it('AI paused: same, task instead of send', async () => {
  customer.aiPaused = true;
  await setPaid(true);
  expect(deliverOut).not.toHaveBeenCalled();
  expect(store.addTask).toHaveBeenCalledTimes(1);
  expect(store.addTask.mock.calls[0][0].reason).toContain('AI paused');
});

it('a rejected send raises the PAID, BUT THEY HAVE NOT BEEN TOLD task with the reply attached', async () => {
  deliverOut.mockResolvedValue({ ok: false, error: 'boom' });
  const j = await (await setPaid(true)).json();
  expect(j.ok).toBe(true);
  expect(store.addTask).toHaveBeenCalledTimes(1);
  const t = store.addTask.mock.calls[0][0];
  expect(t.reason).toContain('PAID, BUT THEY HAVE NOT BEEN TOLD');
  expect(t.reason).toContain('boom');
  expect(t.suggestedReply).toBe(PAYMENT_RECEIVED_MSG.en);
});

it('enriches the open task deliverOut just raised rather than adding a second card', async () => {
  deliverOut.mockResolvedValue({ ok: false, error: 'boom' });
  store.findOpenTaskForCustomer.mockResolvedValueOnce({ id: 't0' });
  await setPaid(true);
  expect(store.addTask).not.toHaveBeenCalled();
  expect(store.updateTask).toHaveBeenCalledWith('t0', expect.objectContaining({ severity: 'URGENT', suggestedReply: PAYMENT_RECEIVED_MSG.en }));
});

it('a non-Paid stage move sends nothing', async () => {
  const res = await POST(new Request('http://x/api/will/actions', {
    method: 'POST', headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ action: 'set_state', customerId: 'c1', state: 'QUALIFIED', force: true }),
  }));
  expect((await res.json()).ok).toBe(true);
  expect(deliverOut).not.toHaveBeenCalled();
  expect(store.listMessages).not.toHaveBeenCalled();
});
