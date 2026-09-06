/**
 * Audit 3, lane sched, finding 33 (5 Sep): a follow-up WhatsApp refused for
 * good is no longer reported as sent.
 *
 * After deliverOut the scheduler only looked at `!ok && retryable`; a
 * non-retryable failure (template missing in Meta, wrong param count, dead
 * token) fell through to the "follow_up_sent" audit and the tick's `sent`
 * list. Pinned here:
 *   - ok send: audited follow_up_sent, listed in `sent`, no `failed`;
 *   - non-retryable failure: audited follow_up_failed with the error, listed in
 *     `failed`, NOT in `sent`, and the cadence still advances (H6);
 *   - retryable failure: unchanged, re-queued and counted as deferred.
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
  store.addJob.mockResolvedValue({ id: 'new' });
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

describe('scheduler FOLLOW_UP reports the real send outcome', () => {
  it('a delivered follow-up is audited and listed as sent, with no failed list', async () => {
    deliver.mockResolvedValue({ ok: true });
    const result = await processDueJobs();
    expect(result.sent).toEqual(['Cust a · Pre 24h']);
    expect(result.failed).toBeUndefined();
    expect(auditKinds()).toContain('follow_up_sent');
    expect(auditKinds()).not.toContain('follow_up_failed');
    expect(store.addJob).toHaveBeenCalledWith(expect.objectContaining({ kind: 'FOLLOW_UP', payload: expect.objectContaining({ seq: 1 }) }));
  });

  it('a non-retryable failure is audited as failed, listed in failed, and the cadence still advances', async () => {
    deliver.mockResolvedValue({ ok: false, retryable: false, error: '132001 Template name does not exist' });
    const result = await processDueJobs();
    expect(result.sent).toEqual([]);
    expect(result.failed).toEqual(['Cust a · Pre 24h']);
    expect(auditKinds()).not.toContain('follow_up_sent');
    const failed = store.audit.mock.calls.find((c) => c[1] === 'follow_up_failed');
    expect(failed).toBeDefined();
    expect(failed![2]).toMatchObject({ customerId: 'a', template: 'fu_pre_24h', seq: 0, error: '132001 Template name does not exist' });
    // H6: the next step is still scheduled.
    expect(store.addJob).toHaveBeenCalledWith(expect.objectContaining({ kind: 'FOLLOW_UP', payload: expect.objectContaining({ seq: 1 }) }));
    expect(result.deferred).toBe(0);
  });

  it('a retryable failure is still re-queued for the same step and counted as deferred', async () => {
    deliver.mockResolvedValue({ ok: false, retryable: true, error: '429 rate limited' });
    const result = await processDueJobs();
    expect(result.sent).toEqual([]);
    expect(result.failed).toBeUndefined();
    expect(result.deferred).toBe(1);
    expect(auditKinds()).toContain('follow_up_throttled_requeued');
    expect(auditKinds()).not.toContain('follow_up_failed');
    expect(store.addJob).toHaveBeenCalledWith(expect.objectContaining({ kind: 'FOLLOW_UP', payload: expect.objectContaining({ seq: 0 }) }));
    expect(store.addJob).not.toHaveBeenCalledWith(expect.objectContaining({ payload: expect.objectContaining({ seq: 1 }) }));
  });
});
