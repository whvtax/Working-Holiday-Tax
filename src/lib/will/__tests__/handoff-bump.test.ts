/**
 * Full audit, 11 Oct 2026, decision 1 (item 3): a handoff still open and
 * unanswered 24 hours after the holding line gets the bump (and the task goes
 * URGENT); 48 hours, the apology. Answered or closed, nothing is sent.
 */
const store = {
  reclaimStaleJobs: jest.fn().mockResolvedValue(0),
  getSetting: jest.fn(async (k: string) => (k === 'ai_mode' ? 'FULL_AUTO' : false)),
  setSetting: jest.fn().mockResolvedValue(undefined),
  dueJobs: jest.fn(),
  claimJob: jest.fn().mockResolvedValue(true),
  getCustomerById: jest.fn(),
  setJobStatus: jest.fn().mockResolvedValue(undefined),
  addJob: jest.fn().mockResolvedValue({ id: 'new' }),
  addTask: jest.fn(),
  addMessage: jest.fn(),
  audit: jest.fn().mockResolvedValue(undefined),
  listTemplates: jest.fn().mockResolvedValue([]),
  setState: jest.fn(),
  updateCustomer: jest.fn(),
  updateTask: jest.fn().mockResolvedValue(undefined),
  cancelJobsFor: jest.fn().mockResolvedValue(0),
  getMessageById: jest.fn(),
  findOpenTaskForCustomer: jest.fn(),
  listMessages: jest.fn().mockResolvedValue([]),
};
jest.mock('@/lib/will/store', () => ({ getStore: () => store }));
const deliverOut = jest.fn(async (..._a: unknown[]) => ({ ok: true }));
jest.mock('@/lib/will/channel', () => ({
  deliverOut: (...a: unknown[]) => (deliverOut as unknown as (...x: unknown[]) => unknown)(...a),
  sendWhatsAppText: jest.fn().mockResolvedValue({ ok: true }),
  wasAlreadySentVerbatim: jest.fn().mockResolvedValue(false),
}));
jest.mock('@/lib/will/service', () => ({ runDeferredAutoReply: jest.fn() }));

import { processDueJobs } from '@/lib/will/scheduler';
import { HANDOFF_BUMP_MSG, HANDOFF_APOLOGY_MSG } from '@/lib/will/i18n';

const customer = { id: 'c1', waId: '4915100000000', name: 'Kanna', state: 'PRICE_SENT', paid: false, aiPaused: false, isLegacy: false, optedOut: false, lang: 'de', income: 'TFN', lastCustomerMsgAt: '2026-10-10T09:00:00.000Z', estimatedRefundCents: null };
const job = (stage: 1 | 2) => ({ id: `b${stage}`, customerId: 'c1', kind: 'HANDOFF_BUMP', payload: { stage }, runAt: '2026-10-11T09:00:00.000Z', status: 'SCHEDULED', createdAt: '2026-10-10T09:00:00.000Z' });

beforeEach(() => {
  deliverOut.mockClear(); store.addJob.mockClear(); store.updateTask.mockClear(); store.audit.mockClear();
  jest.useFakeTimers().setSystemTime(new Date('2026-10-11T09:00:00.000Z'));
  store.getCustomerById.mockResolvedValue(customer);
  store.findOpenTaskForCustomer.mockResolvedValue({ id: 't1', customerId: 'c1', reason: 'Policy Guard blocked reply', severity: 'REVIEW', status: 'OPEN', createdAt: '2026-10-10T08:58:00.000Z' });
  store.listMessages.mockResolvedValue([
    { id: 'a', customerId: 'c1', direction: 'OUT', status: 'SENT', body: 'holding', createdAt: '2026-10-10T09:00:00.000Z', meta: { waTemplate: { name: 'handoff_holding_de', params: [] } } },
  ]);
});
afterEach(() => jest.useRealTimers());

it('23h after the last message: sends the bump as free text in the customer language, marks the task URGENT, schedules nothing more', async () => {
  store.getCustomerById.mockResolvedValue({ ...customer, lastCustomerMsgAt: '2026-10-10T10:00:00.000Z' });
  store.dueJobs.mockResolvedValue([job(1)]);
  await processDueJobs();
  expect(deliverOut).toHaveBeenCalledTimes(1);
  expect(deliverOut.mock.calls[0][1]).toBe(HANDOFF_BUMP_MSG.de);
  // Jo, 18 Nov: Will only, never a Meta template.
  expect(deliverOut.mock.calls[0][3]).toEqual({ system: true });
  expect(deliverOut.mock.calls[0][4]).toBeUndefined();
  expect(store.updateTask).toHaveBeenCalledWith('t1', expect.objectContaining({ severity: 'URGENT', reason: expect.stringMatching(/^WAITING 24h: /) }));
  expect(store.addJob).not.toHaveBeenCalled();
});

it('an old 48h apology job still in the queue sends nothing (Jo, 18 Nov: removed)', async () => {
  store.dueJobs.mockResolvedValue([job(2)]);
  await processDueJobs();
  expect(deliverOut).not.toHaveBeenCalled();
  expect(store.addJob).not.toHaveBeenCalled();
  void HANDOFF_APOLOGY_MSG;
});

it('stays quiet when the team already answered', async () => {
  store.listMessages.mockResolvedValue([
    { id: 'h', customerId: 'c1', direction: 'OUT', author: 'HUMAN', status: 'SENT', body: 'Here is the answer', createdAt: '2026-10-10T15:00:00.000Z', meta: {} },
  ]);
  store.dueJobs.mockResolvedValue([job(1)]);
  await processDueJobs();
  expect(deliverOut).not.toHaveBeenCalled();
  expect(store.audit).toHaveBeenCalledWith('assistant', 'handoff_bump_skipped', expect.objectContaining({ reason: 'already answered' }));
});

it('stays quiet when the task was closed', async () => {
  store.findOpenTaskForCustomer.mockResolvedValue(null);
  store.dueJobs.mockResolvedValue([job(1)]);
  await processDueJobs();
  expect(deliverOut).not.toHaveBeenCalled();
});

it('moves with the customer: a newer message pushes the bump to 23h after it', async () => {
  store.getCustomerById.mockResolvedValue({ ...customer, lastCustomerMsgAt: '2026-10-11T08:00:00.000Z' });
  store.dueJobs.mockResolvedValue([job(1)]);
  await processDueJobs();
  expect(deliverOut).not.toHaveBeenCalled();
  expect(store.addJob).toHaveBeenCalledWith(expect.objectContaining({ kind: 'HANDOFF_BUMP', payload: { stage: 1 }, runAt: '2026-10-12T07:00:00.000Z' }));
});

it('outside the 24h window the bump is skipped (free text only) and the task still goes URGENT', async () => {
  store.dueJobs.mockResolvedValue([job(1)]);
  await processDueJobs();
  expect(deliverOut).not.toHaveBeenCalled();
  expect(store.audit).toHaveBeenCalledWith('assistant', 'handoff_bump_skipped', expect.objectContaining({ reason: 'outside the 24h window (free text only)' }));
  expect(store.updateTask).toHaveBeenCalledWith('t1', expect.objectContaining({ severity: 'URGENT' }));
  expect(store.addJob).not.toHaveBeenCalled();
});

it('the holding line itself chains the first bump 23h after the customer\'s last message', async () => {
  store.getCustomerById.mockResolvedValue({ ...customer, lastCustomerMsgAt: '2026-10-11T08:30:00.000Z' });
  store.listMessages.mockResolvedValue([]);
  store.dueJobs.mockResolvedValue([{ id: 'ack', customerId: 'c1', kind: 'HANDOFF_ACK', payload: {}, runAt: '2026-10-11T09:00:00.000Z', status: 'SCHEDULED', createdAt: '2026-10-11T08:58:00.000Z' }]);
  await processDueJobs();
  expect(deliverOut).toHaveBeenCalledTimes(1);
  expect(store.cancelJobsFor).toHaveBeenCalledWith('c1', ['HANDOFF_BUMP']);
  const bump = store.addJob.mock.calls.find((c) => c[0].kind === 'HANDOFF_BUMP');
  expect(bump).toBeTruthy();
  expect(bump![0].runAt).toBe('2026-10-12T07:30:00.000Z');
});
