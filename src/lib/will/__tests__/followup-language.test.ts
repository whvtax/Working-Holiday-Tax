/**
 * Full audit, 11 Oct 2026, decision 9: scheduled nudges go out in the
 * customer's language or not at all, and a lead who already holds the bank
 * details gets the "details are above" nudge instead of the sales ones.
 */
const store = {
  reclaimStaleJobs: jest.fn().mockResolvedValue(0),
  getSetting: jest.fn(async (k: string) => (k === 'ai_mode' ? 'FULL_AUTO' : k === 'scheduler_quiet_hours' ? false : undefined)),
  setSetting: jest.fn().mockResolvedValue(undefined),
  dueJobs: jest.fn(),
  claimJob: jest.fn().mockResolvedValue(true),
  getCustomerById: jest.fn(),
  setJobStatus: jest.fn().mockResolvedValue(undefined),
  addJob: jest.fn().mockResolvedValue({ id: 'new' }),
  addTask: jest.fn(),
  addMessage: jest.fn(),
  audit: jest.fn().mockResolvedValue(undefined),
  listTemplates: jest.fn(),
  setState: jest.fn(),
  updateCustomer: jest.fn(),
  updateTask: jest.fn(),
  cancelJobsFor: jest.fn().mockResolvedValue(0),
  getMessageById: jest.fn(),
  findOpenTaskForCustomer: jest.fn().mockResolvedValue(null),
  listMessages: jest.fn().mockResolvedValue([]),
  listJobsForCustomer: jest.fn().mockResolvedValue([]),
  getJob: jest.fn().mockResolvedValue(null),
};
jest.mock('@/lib/will/store', () => ({ getStore: () => store }));
const deliverOut = jest.fn(async (..._a: unknown[]) => ({ ok: true }));
const templateApprovedFor = jest.fn(async (_name: string, _lang: string | null) => true as boolean | null);
jest.mock('@/lib/will/channel', () => ({
  deliverOut: (...a: unknown[]) => (deliverOut as unknown as (...x: unknown[]) => unknown)(...a),
  templateApprovedFor: (n: string, l: string | null) => templateApprovedFor(n, l),
  sendWhatsAppText: jest.fn().mockResolvedValue({ ok: true }),
  sendWhatsAppTemplate: jest.fn().mockResolvedValue({ ok: true }),
  wasAlreadySentVerbatim: jest.fn().mockResolvedValue(false),
}));
jest.mock('@/lib/will/service', () => ({ runDeferredAutoReply: jest.fn() }));
jest.mock('@/lib/will/config', () => ({ ...jest.requireActual('@/lib/will/config'), withinQuietHours: () => true }));

import { processDueJobs } from '@/lib/will/scheduler';
import { APPROVED } from '@/lib/will/approved-messages';

const customer = (over: Record<string, unknown> = {}) => ({
  id: 'c1', waId: '4915100000000', name: 'Jan', state: 'QUALIFIED', paid: false, aiPaused: false, isLegacy: false, optedOut: false,
  lang: 'de', income: 'TFN', lastCustomerMsgAt: '2026-10-09T09:00:00.000Z', estimatedRefundCents: null, ...over,
});
const job = (templateKey: string, seq = 0) => ({ id: 'f1', customerId: 'c1', kind: 'FOLLOW_UP', payload: { flow: 'prePayment', templateKey, seq }, runAt: '2026-10-11T08:00:00.000Z', status: 'SCHEDULED', createdAt: '2026-10-10T08:00:00.000Z' });

beforeEach(() => {
  deliverOut.mockClear(); templateApprovedFor.mockClear(); store.audit.mockClear(); store.addJob.mockClear();
  jest.useFakeTimers().setSystemTime(new Date('2026-10-11T08:00:00.000Z'));
  store.getCustomerById.mockResolvedValue(customer());
  store.listMessages.mockResolvedValue([]);
  store.listTemplates.mockResolvedValue([
    { key: 'fu_pre_24h', title: 'Pre 24h', body: APPROVED.followups_pre_payment.h24, active: true },
    { key: 'fu_pre_3d', title: 'Pre 3d', body: APPROVED.followups_pre_payment.d3, active: true },
    { key: 'fu_pre_7d', title: 'Pre 7d', body: APPROVED.followups_pre_payment.d7, active: true },
    { key: 'fu_price_sent', title: 'Price sent', body: APPROVED.followups_pre_payment.priceSent, active: true },
  ]);
});
afterEach(() => jest.useRealTimers());

it('a German lead with no German template gets nothing, quietly, and the cadence moves on', async () => {
  templateApprovedFor.mockResolvedValueOnce(false);
  store.dueJobs.mockResolvedValue([job('fu_pre_24h')]);
  await processDueJobs();
  expect(deliverOut).not.toHaveBeenCalled();
  expect(store.addTask).not.toHaveBeenCalled();
  expect(store.audit).toHaveBeenCalledWith('scheduler', 'follow_up_skipped_no_template_in_language', expect.objectContaining({ template: 'fu_pre_24h', lang: 'de' }));
  expect(store.addJob).toHaveBeenCalledWith(expect.objectContaining({ kind: 'FOLLOW_UP' }));
});

it('with the German template approved, it goes out in German', async () => {
  store.dueJobs.mockResolvedValue([job('fu_pre_24h')]);
  await processDueJobs();
  expect(deliverOut).toHaveBeenCalledTimes(1);
  expect(templateApprovedFor).toHaveBeenCalledWith('fu_pre_24h', 'de');
  expect(deliverOut.mock.calls[0][4]).toEqual(expect.objectContaining({ name: 'fu_pre_24h', lang: 'de' }));
});

it('when approval cannot be known (test mode), the nudge still goes', async () => {
  templateApprovedFor.mockResolvedValueOnce(null);
  store.dueJobs.mockResolvedValue([job('fu_pre_24h')]);
  await processDueJobs();
  expect(deliverOut).toHaveBeenCalledTimes(1);
});

it('a lead who already has the bank details gets "the details are above", once', async () => {
  store.getCustomerById.mockResolvedValue(customer({ state: 'PRICE_SENT', lang: 'en' }));
  store.listMessages.mockResolvedValue([{ id: 'p', customerId: 'c1', direction: 'OUT', status: 'SENT', body: APPROVED.price_tfn, createdAt: '2026-10-09T10:00:00.000Z', meta: {} }]);
  store.dueJobs.mockResolvedValue([job('fu_pre_24h')]);
  await processDueJobs();
  expect(deliverOut).toHaveBeenCalledTimes(1);
  expect(deliverOut.mock.calls[0][1]).toMatch(/did the transfer go through on your end/);
  expect(deliverOut.mock.calls[0][4]).toEqual(expect.objectContaining({ name: 'fu_price_sent' }));

  // The 3d step: already nudged, so skipped.
  deliverOut.mockClear();
  store.listMessages.mockResolvedValue([
    { id: 'p', customerId: 'c1', direction: 'OUT', status: 'SENT', body: APPROVED.price_tfn, createdAt: '2026-10-09T10:00:00.000Z', meta: {} },
    { id: 'n', customerId: 'c1', direction: 'OUT', status: 'SENT', body: 'Hi Jan, whenever you are ready', createdAt: '2026-10-10T08:00:00.000Z', meta: { waTemplate: { name: 'fu_price_sent', params: ['Jan'] } } },
  ]);
  store.dueJobs.mockResolvedValue([job('fu_pre_3d', 1)]);
  await processDueJobs();
  expect(deliverOut).not.toHaveBeenCalled();
  expect(store.audit).toHaveBeenCalledWith('scheduler', 'follow_up_skipped_price_sent_already_nudged', expect.anything());
});

it('the 7d door-closer is untouched for a lead with the bank details', async () => {
  store.getCustomerById.mockResolvedValue(customer({ state: 'PRICE_SENT', lang: 'en' }));
  store.dueJobs.mockResolvedValue([job('fu_pre_7d', 2)]);
  await processDueJobs();
  expect(deliverOut.mock.calls[0][4]).toEqual(expect.objectContaining({ name: 'fu_pre_7d' }));
});
