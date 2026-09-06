/**
 * The chat composer can send a Library body outside the 24h window
 * (audit, 5 Sep).
 *
 * The Quick-fill chips (req_abn, req_expenses, req_doc, medicare) load the
 * exact Library body into the composer, which leaves as manual_reply. That
 * path was free text only, so once the customer had been quiet for a day it
 * was refused with "use an approved template", although the 24h banner
 * pointed the owner at exactly those chips and send_template (which nothing
 * in the UI calls) was built for this. manual_reply now recognises a Library
 * body the way send_task_reply does: plain text inside the window (unchanged),
 * the approved template of that key with text fallback outside it. Edited
 * text is still free text and is still refused outside the window.
 */
const DAY = 86400_000;
const MEDICARE = 'Quick one on Medicare. Because you do not have access to it, you can apply for the Medicare Levy Exemption and we sort it as part of your return.';
const REQ_ABN = 'Hi {{1}}, could you send me your ABN so I can add it to the return?';

const customer = {
  id: 'c1', waId: '61400000001', name: 'Alex Smith', state: 'FORM_COMPLETE', paid: true,
  optedOut: false, isLegacy: false, aiPaused: false, lang: null,
  lastCustomerMsgAt: new Date(Date.now() - 3 * DAY).toISOString(), estimatedRefundCents: null,
};
const settings: Record<string, unknown> = {};
const store = {
  getCustomerById: jest.fn().mockImplementation(async () => ({ ...customer })),
  getSetting: jest.fn().mockImplementation(async (k: string) => settings[k]),
  listTasks: jest.fn().mockResolvedValue([]),
  listTemplates: jest.fn().mockResolvedValue([
    { id: 'x1', key: 'medicare', body: MEDICARE },
    { id: 'x2', key: 'req_abn', body: REQ_ABN },
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

const manualReply = (body: string) => POST(new Request('http://x/api/will/actions', {
  method: 'POST', headers: { 'content-type': 'application/json' },
  body: JSON.stringify({ action: 'manual_reply', customerId: 'c1', body }),
})).then((r) => r.json());

beforeEach(() => {
  customer.lastCustomerMsgAt = new Date(Date.now() - 3 * DAY).toISOString();
  for (const fn of Object.values(store)) (fn as jest.Mock).mockClear();
  deliverOut.mockClear();
  deliverOut.mockResolvedValue({ ok: true });
});

it('outside the window, the Medicare Quick-fill leaves as the approved template of that key', async () => {
  const j = await manualReply(MEDICARE);
  expect(j.ok).toBe(true);
  expect(deliverOut).toHaveBeenCalledTimes(1);
  const [c, body, author, meta, tpl] = deliverOut.mock.calls[0];
  expect(c.id).toBe('c1');
  expect(body).toBe(MEDICARE);
  expect(author).toBe('HUMAN');
  expect(tpl).toEqual({ name: 'medicare', params: [], lang: null, fallbackToText: true });
  expect(meta).toEqual({ waTemplate: tpl });
  expect(store.audit).toHaveBeenCalledWith('owner', 'manual_reply', { customerId: 'c1' });
});

it('a {{1}} body with the greeting name filled in goes as that template with the name as {{1}}', async () => {
  const j = await manualReply(REQ_ABN.replace('{{1}}', 'Alex'));
  expect(j.ok).toBe(true);
  expect(deliverOut.mock.calls[0][4]).toMatchObject({ name: 'req_abn', params: ['Alex'], fallbackToText: true });
});

it('edited composer text is still free text and still refused outside the window', async () => {
  const j = await manualReply(MEDICARE + ' Let me know.');
  expect(j.ok).toBeUndefined();
  expect(j.error).toMatch(/24h messaging window/);
  expect(deliverOut).not.toHaveBeenCalled();
});

it('inside the window nothing changes: the Library body goes as plain text', async () => {
  customer.lastCustomerMsgAt = new Date(Date.now() - 60_000).toISOString();
  const j = await manualReply(MEDICARE);
  expect(j.ok).toBe(true);
  const [, body, , meta, tpl] = deliverOut.mock.calls[0];
  expect(body).toBe(MEDICARE);
  expect(meta).toBeUndefined();
  expect(tpl).toBeUndefined();
});

it('inside the window free text goes as plain text, as before', async () => {
  customer.lastCustomerMsgAt = new Date(Date.now() - 60_000).toISOString();
  const j = await manualReply('Hi Alex, all sorted, we will be in touch.');
  expect(j.ok).toBe(true);
  expect(deliverOut.mock.calls[0][4]).toBeUndefined();
});

it('a failed WhatsApp send is reported, not hidden', async () => {
  deliverOut.mockResolvedValue({ ok: false, error: 'boom' });
  const j = await manualReply(MEDICARE);
  expect(j.error).toMatch(/boom/);
});
