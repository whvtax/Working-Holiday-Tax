/**
 * Jo's standing rule (18 Nov, decision 018): before any paid Meta template, the same words go as
 * free text while the 24-hour window is open. Approving a held draft (approve_message) sent the
 * template stored on the draft whatever the window, so a follow-up, a form confirmation or a
 * payment confirmation drafted in approval mode and approved minutes later cost a template.
 * Now a draft whose template says the body IS its wording (fallbackToText) goes as free text
 * inside the window (the form link on its button), and as the template only after it closes.
 * A draft template without fallbackToText is unchanged (audit3-actions-63 pins that).
 */
const customer = {
  id: 'c1', waId: '61400000001', name: 'Momo', state: 'PRICE_SENT', paid: false,
  optedOut: false, isLegacy: false, aiPaused: false, lang: null as string | null, brand: 'wht',
  lastCustomerMsgAt: new Date(Date.now() - 60_000).toISOString(), estimatedRefundCents: null,
};
const followUp = {
  id: 'm1', customerId: 'c1', direction: 'OUT', author: 'AI', status: 'PENDING_APPROVAL',
  body: 'Hi Momo😊\nDid the transfer go through on your end?',
  meta: { waTemplate: { name: 'fu_price_sent', params: ['Momo'], lang: null, fallbackToText: true } },
  createdAt: new Date().toISOString(),
};
const store = {
  getMessageById: jest.fn().mockResolvedValue(followUp),
  getCustomerById: jest.fn().mockImplementation(async () => ({ ...customer })),
  getSetting: jest.fn().mockResolvedValue(undefined),
  listTemplates: jest.fn().mockResolvedValue([]),
  setMessageStatus: jest.fn().mockResolvedValue(undefined),
  claimMessageForSend: jest.fn().mockResolvedValue(true),
  findOpenTaskForCustomer: jest.fn().mockResolvedValue(null),
  updateTask: jest.fn().mockResolvedValue(undefined),
  addTask: jest.fn().mockResolvedValue({ id: 't1' }),
  setState: jest.fn().mockResolvedValue(true),
  updateCustomer: jest.fn().mockResolvedValue(undefined),
  audit: jest.fn().mockResolvedValue(undefined),
  markCustomerRead: jest.fn().mockResolvedValue(undefined),
  listTasks: jest.fn().mockResolvedValue([]),
  listMessages: jest.fn().mockResolvedValue([]),
  resolveTask: jest.fn().mockResolvedValue(undefined),
  cancelJobsFor: jest.fn().mockResolvedValue(0),
  listJobsForCustomer: jest.fn().mockResolvedValue([]),
  addJob: jest.fn().mockResolvedValue({ id: 'j1' }),
};
const sendWhatsAppTemplate = jest.fn();
const sendWhatsAppText = jest.fn();
const sendWhatsAppCtaUrl = jest.fn();
jest.mock('@/lib/will/store', () => ({ getStore: () => store }));
jest.mock('@/lib/will/auth', () => ({ sessionValid: jest.fn().mockResolvedValue(true) }));
jest.mock('@/lib/will/channel', () => ({
  ...jest.requireActual('@/lib/will/channel'),
  sendWhatsAppText: (...a: unknown[]) => sendWhatsAppText(...a),
  sendWhatsAppTemplate: (...a: unknown[]) => sendWhatsAppTemplate(...a),
  sendWhatsAppCtaUrl: (...a: unknown[]) => sendWhatsAppCtaUrl(...a),
  deliverOut: jest.fn().mockResolvedValue({ ok: true }),
}));
jest.mock('@/lib/will/scheduler', () => ({
  ...jest.requireActual('@/lib/will/scheduler'),
  reconcileSchedule: jest.fn().mockResolvedValue(undefined),
}));

import { POST } from '@/app/api/will/actions/route';

const approve = () => POST(new Request('http://x/api/will/actions', {
  method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ action: 'approve_message', id: 'm1' }),
})).then((r) => r.json());

beforeEach(() => {
  for (const fn of Object.values(store)) (fn as jest.Mock).mockClear();
  store.getMessageById.mockResolvedValue(followUp);
  customer.lastCustomerMsgAt = new Date(Date.now() - 60_000).toISOString();
  for (const f of [sendWhatsAppTemplate, sendWhatsAppText, sendWhatsAppCtaUrl]) { f.mockReset(); f.mockResolvedValue({ ok: true }); }
});

it('inside the window: free text, no template', async () => {
  const j = await approve();
  expect(j.ok).toBe(true);
  expect(sendWhatsAppText).toHaveBeenCalledWith('61400000001', followUp.body, 'wht');
  expect(sendWhatsAppTemplate).not.toHaveBeenCalled();
});

it('outside the window: the template, as before', async () => {
  customer.lastCustomerMsgAt = new Date(Date.now() - 30 * 3600_000).toISOString();
  const j = await approve();
  expect(j.ok).toBe(true);
  expect(sendWhatsAppTemplate).toHaveBeenCalledWith('61400000001', 'fu_price_sent', ['Momo'], null, { brand: 'wht' });
  expect(sendWhatsAppText).not.toHaveBeenCalled();
});

it('inside the window, if Meta refuses the text, the template follows', async () => {
  sendWhatsAppText.mockResolvedValue({ ok: false, error: 'meta 400: bad' });
  const j = await approve();
  expect(j.ok).toBe(true);
  expect(sendWhatsAppTemplate).toHaveBeenCalledTimes(1);
});

it('a payment confirmation inside the window goes with the form link on its button', async () => {
  store.getMessageById.mockResolvedValue({
    ...followUp,
    body: 'Payment received, thank you!\n\nPlease fill out this short form so we can start your tax return:\nhttps://workingholidaytax.com.au/start\n\nOnce submitted our team will review everything and update you here.',
    meta: { system: true, paymentConfirmation: true, waTemplate: { name: 'payment_received', params: [], lang: null, fallbackToText: true } },
  });
  const j = await approve();
  expect(j.ok).toBe(true);
  expect(sendWhatsAppCtaUrl).toHaveBeenCalledTimes(1);
  expect(sendWhatsAppCtaUrl.mock.calls[0][3]).toBe('https://workingholidaytax.com.au/start');
  expect(sendWhatsAppTemplate).not.toHaveBeenCalled();
});

it('a draft template without fallbackToText keeps going as the template', async () => {
  store.getMessageById.mockResolvedValue({ ...followUp, meta: { waTemplate: { name: 'fu_price_sent', params: ['Momo'], lang: null } } });
  await approve();
  expect(sendWhatsAppTemplate).toHaveBeenCalledTimes(1);
  expect(sendWhatsAppText).not.toHaveBeenCalled();
});
