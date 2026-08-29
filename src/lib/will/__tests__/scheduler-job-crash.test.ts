/**
 * The scheduler's job loop had one bare `catch { setJobStatus(job.id, 'FAILED') }`.
 * Three things were wrong with it, and all three reached the customer:
 *
 *  1. A FOLLOW_UP is marked DONE *before* it is transmitted (REL-02: an
 *     at-least-once replay must not re-deliver a nudge). So by the time anything
 *     could throw, the customer may already have the message. Flipping DONE back
 *     to FAILED made `reconcileSchedule`'s done-count read the step as never
 *     delivered, and the cadence queued the same template again — the customer
 *     received the same follow-up twice.
 *  2. The catch was completely silent: no log, no audit. Every scheduler crash
 *     was invisible.
 *  3. It ended the cadence, unlike the missing-template and guard-blocked
 *     branches right above it, which both schedule the next step.
 */
const store = {
  reclaimStaleJobs: jest.fn(),
  getSetting: jest.fn(),
  dueJobs: jest.fn(),
  claimJob: jest.fn(),
  getCustomerById: jest.fn(),
  listTemplates: jest.fn(),
  setJobStatus: jest.fn(),
  getJob: jest.fn(),
  addJob: jest.fn(),
  addTask: jest.fn(),
  audit: jest.fn(),
  setState: jest.fn(),
  cancelJobsFor: jest.fn(),
  updateCustomer: jest.fn(),
};
jest.mock('@/lib/will/store', () => ({ getStore: () => store }));

const deliverOut = jest.fn();
jest.mock('@/lib/will/channel', () => ({
  deliverOut: (...a: unknown[]) => deliverOut(...a),
  sendWhatsAppText: jest.fn().mockResolvedValue({ ok: true }),
}));

// Not what is under test here: let every message through so the loop reaches
// the transmission step where the crash happens.
jest.mock('@/lib/will/policy-guard', () => ({
  policyGuard: () => ({ allowed: true, violations: [] }),
}));

// Also not under test: the quiet-hours gate is time-of-day dependent, so mock
// it to "inside the sending window" and keep the rest of config real. Without
// this the test flakes purely on the wall clock, taking the defer-to-morning
// branch instead of the send branch it is written to exercise.
jest.mock('@/lib/will/config', () => ({
  ...jest.requireActual('@/lib/will/config'),
  withinQuietHours: () => true,
}));

import { processDueJobs } from '@/lib/will/scheduler';

const CUSTOMER = {
  id: 'c1', waId: '61400000001', name: 'Alex', state: 'PRICE_SENT', paid: false,
  aiPaused: false, isLegacy: false, optedOut: false, lang: null,
  lastCustomerMsgAt: null, estimatedRefundCents: null,
};

const JOB = {
  id: 'j1', customerId: 'c1', kind: 'FOLLOW_UP' as const,
  payload: { templateKey: 'followup_1', seq: 0, flow: 'prePayment' as const },
  runAt: new Date(Date.now() - 1000).toISOString(), status: 'SCHEDULED' as const,
  createdAt: new Date().toISOString(),
};

beforeEach(() => {
  for (const fn of Object.values(store)) (fn as jest.Mock).mockReset();
  deliverOut.mockReset();

  store.reclaimStaleJobs.mockResolvedValue(0);
  // kill_switch off; ai_mode FULL_AUTO so the follow-up transmits rather than
  // going to the approval queue.
  store.getSetting.mockImplementation(async (k: string) => (k === 'ai_mode' ? 'FULL_AUTO' : false));
  store.dueJobs.mockResolvedValue([JOB]);
  store.claimJob.mockResolvedValue(true);
  store.getCustomerById.mockResolvedValue(CUSTOMER);
  store.listTemplates.mockResolvedValue([
    { id: 't1', key: 'followup_1', category: 'followup', title: 'First nudge', body: 'Hi {{1}}, just checking in.', requiresMeta: false, versions: 1, updatedAt: '' },
  ]);
  store.setJobStatus.mockResolvedValue(undefined);
  store.addJob.mockResolvedValue({ id: 'j2' });
  store.addTask.mockResolvedValue({ id: 'task1' });
  store.audit.mockResolvedValue(undefined);
  // The job reached DONE before the send, which is the whole point.
  store.getJob.mockResolvedValue({ ...JOB, status: 'DONE' });

  deliverOut.mockRejectedValue(new Error('network died mid-send'));
});

describe('a job that crashes after it was already DONE', () => {
  it('is not downgraded to FAILED', async () => {
    await processDueJobs();
    expect(store.setJobStatus).toHaveBeenCalledWith('j1', 'DONE');
    // This is the line that caused the double-send.
    expect(store.setJobStatus).not.toHaveBeenCalledWith('j1', 'FAILED');
  });

  it('audits the crash instead of swallowing it', async () => {
    await processDueJobs();
    expect(store.audit).toHaveBeenCalledWith(
      'scheduler', 'job_crashed',
      expect.objectContaining({ jobId: 'j1', kind: 'FOLLOW_UP', alreadyDone: true }),
    );
  });

  it('still schedules the next step in the sequence', async () => {
    await processDueJobs();
    expect(store.addJob).toHaveBeenCalledWith(expect.objectContaining({
      customerId: 'c1', kind: 'FOLLOW_UP',
      payload: expect.objectContaining({ seq: 1, flow: 'prePayment' }),
    }));
  });

  it('does not throw out of the tick', async () => {
    await expect(processDueJobs()).resolves.toBeDefined();
  });
});

describe('a job that crashes before it completed', () => {
  beforeEach(() => { store.getJob.mockResolvedValue({ ...JOB, status: 'CLAIMED' }); });

  it('is still marked FAILED, as it always was', async () => {
    // Crash earlier than the send, while the job is still CLAIMED.
    store.listTemplates.mockRejectedValue(new Error('db unreachable'));
    await processDueJobs();
    expect(store.setJobStatus).toHaveBeenCalledWith('j1', 'FAILED');
  });

  it('records alreadyDone:false in the audit line', async () => {
    store.listTemplates.mockRejectedValue(new Error('db unreachable'));
    await processDueJobs();
    expect(store.audit).toHaveBeenCalledWith(
      'scheduler', 'job_crashed', expect.objectContaining({ alreadyDone: false }),
    );
  });
});
