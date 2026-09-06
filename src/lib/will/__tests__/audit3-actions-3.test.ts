/**
 * Send Reply on a scheduler-raised task works outside the 24h window
 * (audit, 5 Sep).
 *
 * The Medicare, review-request and follow-up tasks carry the exact Library
 * body as their suggested reply and say "send it by hand", but the customer
 * has by construction been quiet for more than a day, so send_task_reply's
 * free-text path was refused for the window every time. When the draft IS a
 * Library body it now goes the way send_template goes: plain text inside the
 * window, the approved template of that key (with text fallback) outside it.
 * An edited draft is still free text and is still refused, as before.
 */
const DAY = 86400_000;
const MEDICARE = 'Quick one on Medicare. Because you do not have access to it, you can apply for the Medicare Levy Exemption and we sort it as part of your return.';
const FU = 'Hi {{1}}, just checking in about your tax return. Want me to get it moving?';

const customer = {
  id: 'c1', waId: '61400000001', name: 'Alex Smith', state: 'FORM_COMPLETE', paid: true,
  optedOut: false, isLegacy: false, aiPaused: false, lang: null,
  lastCustomerMsgAt: new Date(Date.now() - 3 * DAY).toISOString(), estimatedRefundCents: null,
};
const task = { id: 't1', customerId: 'c1', status: 'OPEN', reason: 'Medicare exemption message was not delivered', severity: 'REVIEW' };
const settings: Record<string, unknown> = {};
const store = {
  getCustomerById: jest.fn().mockImplementation(async () => ({ ...customer })),
  getSetting: jest.fn().mockImplementation(async (k: string) => settings[k]),
  listTasks: jest.fn().mockImplementation(async () => [{ ...task }]),
  // send_task_reply reads the one task by id (audit, 5 Sep).
  getTaskById: jest.fn().mockImplementation(async (id: string) => (id === task.id ? { ...task } : null)),
  // afterHumanReplyIndexed's indexed reads (audit3, 5 Sep): same rows the old
  // listTasks().filter(...) / listMessages() scan produced, just scoped to
  // this one customer.
  listOpenTasksForCustomer: jest.fn().mockImplementation(async (id: string) => (id === task.customerId ? [{ ...task }] : [])),
  listPendingOutbound: jest.fn().mockResolvedValue([]),
  listTemplates: jest.fn().mockResolvedValue([
    { id: 'x1', key: 'medicare', body: MEDICARE },
    { id: 'x2', key: 'fu_form_3d', body: FU },
  ]),
  listMessages: jest.fn().mockResolvedValue([]),
  markCustomerRead: jest.fn().mockResolvedValue(undefined),
  resolveTask: jest.fn().mockResolvedValue(undefined),
  setMessageStatus: jest.fn().mockResolvedValue(undefined),
  audit: jest.fn().mockResolvedValue(undefined),
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

const sendReply = (body: string) => POST(new Request('http://x/api/will/actions', {
  method: 'POST', headers: { 'content-type': 'application/json' },
  body: JSON.stringify({ action: 'send_task_reply', id: 't1', body }),
})).then((r) => r.json());

beforeEach(() => {
  customer.lastCustomerMsgAt = new Date(Date.now() - 3 * DAY).toISOString();
  for (const fn of Object.values(store)) (fn as jest.Mock).mockClear();
  deliverOut.mockClear();
  deliverOut.mockResolvedValue({ ok: true });
});

it('outside the window, the Library body leaves as the approved template of that key', async () => {
  const j = await sendReply(MEDICARE);
  expect(j.ok).toBe(true);
  expect(deliverOut).toHaveBeenCalledTimes(1);
  const [c, body, author, meta, tpl] = deliverOut.mock.calls[0];
  expect(c.id).toBe('c1');
  expect(body).toBe(MEDICARE);
  expect(author).toBe('HUMAN');
  expect(tpl).toEqual({ name: 'medicare', params: [], lang: null, fallbackToText: true });
  expect(meta).toEqual({ waTemplate: tpl });
  // The task is settled like any other answered task.
  expect(store.resolveTask).toHaveBeenCalledWith('t1');
});

it('a follow-up body with the greeting name filled in goes as that template with the name as {{1}}', async () => {
  const j = await sendReply(FU.replace('{{1}}', 'Alex'));
  expect(j.ok).toBe(true);
  const tpl = deliverOut.mock.calls[0][4];
  expect(tpl).toMatchObject({ name: 'fu_form_3d', params: ['Alex'], fallbackToText: true });
});

it('whitespace differences from the editor do not break the match', async () => {
  const j = await sendReply(`  ${MEDICARE.replace('. ', '.\n\n')}  `);
  expect(j.ok).toBe(true);
  expect(deliverOut.mock.calls[0][4]).toMatchObject({ name: 'medicare' });
});

it('an edited draft is still free text and still refused outside the window', async () => {
  const j = await sendReply(MEDICARE + ' Let me know.');
  expect(j.ok).toBeUndefined();
  expect(j.error).toMatch(/24h messaging window/);
  expect(deliverOut).not.toHaveBeenCalled();
  expect(store.resolveTask).not.toHaveBeenCalled();
});

it('inside the window nothing changes: the Library body goes as plain text', async () => {
  customer.lastCustomerMsgAt = new Date(Date.now() - 60_000).toISOString();
  const j = await sendReply(MEDICARE);
  expect(j.ok).toBe(true);
  const [, body, , meta, tpl] = deliverOut.mock.calls[0];
  expect(body).toBe(MEDICARE);
  expect(meta).toBeUndefined();
  expect(tpl).toBeUndefined();
});

it('inside the window an edited draft goes as plain text, as before', async () => {
  customer.lastCustomerMsgAt = new Date(Date.now() - 60_000).toISOString();
  const j = await sendReply('Hi Alex, all sorted, we will be in touch.');
  expect(j.ok).toBe(true);
  expect(deliverOut.mock.calls[0][4]).toBeUndefined();
});

it('a failed WhatsApp send still leaves the task open', async () => {
  deliverOut.mockResolvedValue({ ok: false, error: 'boom' });
  const j = await sendReply(MEDICARE);
  expect(j.error).toMatch(/boom/);
  expect(store.resolveTask).not.toHaveBeenCalled();
});
