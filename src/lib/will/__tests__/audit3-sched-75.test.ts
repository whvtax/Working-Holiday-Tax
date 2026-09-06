/**
 * Audit 3, lane sched, finding 75 (5 Sep): a throttled follow-up was marked
 * DONE before sending and never flipped back, so reconcileSchedule's
 * doneCount (scheduler.ts ~204) counted it as delivered even though nothing
 * went out. If the customer wrote back before the retry fired, the retry was
 * cancelled and the cadence resumed at seq+1 with one nudge silently never
 * sent. The re-queue itself was `addJob(...).catch(() => {})`, so a failed
 * insert was reported as "requeued" when the step was actually lost.
 *
 * Pinned here:
 *   - a successful requeue flips the original job to CANCELLED (so it drops
 *     out of doneCount) and still audits follow_up_throttled_requeued;
 *   - a requeue whose addJob throws leaves the original DONE (nothing
 *     resends) but audits follow_up_requeue_failed with the real error,
 *     instead of the old silent swallow.
 */
const store = {
  reclaimStaleJobs: jest.fn(),
  getSetting: jest.fn(),
  dueJobs: jest.fn(),
  claimJob: jest.fn(),
  getCustomerById: jest.fn(),
  setJobStatus: jest.fn(),
  getJob: jest.fn(),
  addJob: jest.fn(),
  addTask: jest.fn(),
  updateTask: jest.fn(),
  findOpenTaskForCustomer: jest.fn(),
  audit: jest.fn(),
  listTemplates: jest.fn(),
  setSetting: jest.fn(),
  getMessageById: jest.fn(),
};
jest.mock('@/lib/will/store', () => ({ getStore: () => store }));
jest.mock('@/lib/will/channel', () => ({
  deliverOut: jest.fn(),
  sendWhatsAppText: jest.fn().mockResolvedValue({ ok: true }),
}));
jest.mock('@/lib/will/config', () => ({
  ...jest.requireActual('@/lib/will/config'),
  withinQuietHours: () => true,
}));
jest.mock('@/lib/will/suggest', () => ({
  suggestReply: jest.fn().mockResolvedValue('suggested'),
}));
jest.mock('@/lib/will/service', () => ({ runDeferredAutoReply: jest.fn() }));

import { processDueJobs } from '@/lib/will/scheduler';
import { deliverOut } from '@/lib/will/channel';

const deliver = deliverOut as jest.Mock;

const customer = (id: string) => ({
  id, waId: `6140000${id}`, name: `Cust ${id}`, state: 'QUALIFIED', paid: false,
  aiPaused: false, isLegacy: false, optedOut: false, lang: null,
  lastCustomerMsgAt: '2026-09-05T08:55:00.000Z', estimatedRefundCents: null,
});
const followUp = (id: string, seq: number) => ({
  id: `f${id}${seq}`, customerId: id, kind: 'FOLLOW_UP' as const,
  payload: { templateKey: 'fu_pre_24h', seq, flow: 'prePayment' },
  runAt: '2026-09-05T09:00:00.000Z', status: 'SCHEDULED' as const, createdAt: '2026-09-05T09:00:00.000Z',
});

const auditKinds = () => store.audit.mock.calls.map((c) => c[1] as string);

beforeEach(() => {
  for (const fn of Object.values(store)) (fn as jest.Mock).mockReset();
  deliver.mockReset();
  store.reclaimStaleJobs.mockResolvedValue(0);
  store.getSetting.mockImplementation(async (k: string) => (k === 'ai_mode' ? 'FULL_AUTO' : false));
  store.claimJob.mockResolvedValue(true);
  store.getCustomerById.mockImplementation(async (id: string) => customer(id));
  store.setJobStatus.mockResolvedValue(undefined);
  store.addTask.mockResolvedValue({ id: 't1' });
  store.updateTask.mockResolvedValue(undefined);
  store.findOpenTaskForCustomer.mockResolvedValue(null);
  store.audit.mockResolvedValue(undefined);
  store.getJob.mockResolvedValue(null);
  store.listTemplates.mockResolvedValue([
    { key: 'fu_pre_24h', title: 'Pre 24h', body: 'Hi {{1}}, still keen to get your tax sorted?' },
  ]);
  store.dueJobs.mockResolvedValue([followUp('a', 0)]);
});

describe('scheduler FOLLOW_UP throttle requeue no longer leaves the step falsely DONE', () => {
  it('a successful requeue cancels the original DONE job so it drops out of doneCount', async () => {
    store.addJob.mockResolvedValue({ id: 'new' });
    deliver.mockResolvedValue({ ok: false, retryable: true, error: '429 rate limited' });
    const result = await processDueJobs();
    expect(result.deferred).toBe(1);
    // Marked DONE first (REL-02), then flipped to CANCELLED once the retry
    // job is safely in the store, in that order.
    const doneCall = store.setJobStatus.mock.calls.findIndex((c) => c[0] === 'fa0' && c[1] === 'DONE');
    const cancelledCall = store.setJobStatus.mock.calls.findIndex((c) => c[0] === 'fa0' && c[1] === 'CANCELLED');
    expect(doneCall).toBeGreaterThanOrEqual(0);
    expect(cancelledCall).toBeGreaterThan(doneCall);
    expect(auditKinds()).toContain('follow_up_throttled_requeued');
    expect(auditKinds()).not.toContain('follow_up_requeue_failed');
    // The cadence itself does not advance to seq+1 on a retryable throttle.
    expect(store.addJob).not.toHaveBeenCalledWith(expect.objectContaining({ payload: expect.objectContaining({ seq: 1 }) }));
  });

  it('a requeue insert that throws leaves the original DONE and audits the real loss instead of pretending it requeued', async () => {
    store.addJob.mockRejectedValue(new Error('db unavailable'));
    deliver.mockResolvedValue({ ok: false, retryable: true, error: '429 rate limited' });
    const result = await processDueJobs();
    expect(result.deferred).toBe(1);
    expect(store.setJobStatus).toHaveBeenCalledWith('fa0', 'DONE');
    expect(store.setJobStatus).not.toHaveBeenCalledWith('fa0', 'CANCELLED');
    expect(auditKinds()).not.toContain('follow_up_throttled_requeued');
    const failed = store.audit.mock.calls.find((c) => c[1] === 'follow_up_requeue_failed');
    expect(failed).toBeDefined();
    expect(failed![2]).toMatchObject({ customerId: 'a', template: 'fu_pre_24h', seq: 0, error: 'db unavailable' });
  });
});
