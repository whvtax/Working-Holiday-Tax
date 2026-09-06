/**
 * Audit 3, lane sched, finding 53 (5 Sep): the LOST_ANALYSIS job no longer
 * re-queues itself for ever.
 *
 * After any outcome other than 'incomplete' the handler called
 * ensureLostAnalysisSoon(). The job it had just processed was DONE, so the
 * existence check saw nothing and inserted another run two minutes out; that
 * run hit the day key, returned 'already_run', and queued the next. Around 720
 * no-op will_jobs rows a day, permanently. Pinned here:
 *   - 'done', 'already_run', 'nothing_to_do', 'budget_exhausted' and a crash
 *     queue nothing;
 *   - 'incomplete' still comes back three minutes later, exactly as before;
 *   - the job itself is still marked DONE and the run still gets the tick's
 *     remaining budget.
 */
const store = {
  reclaimStaleJobs: jest.fn(),
  getSetting: jest.fn(),
  setSetting: jest.fn(),
  dueJobs: jest.fn(),
  claimJob: jest.fn(),
  getCustomerById: jest.fn(),
  setJobStatus: jest.fn(),
  getJob: jest.fn(),
  addJob: jest.fn(),
  addTask: jest.fn(),
  addMessage: jest.fn(),
  audit: jest.fn(),
  listTemplates: jest.fn(),
  setState: jest.fn(),
  updateCustomer: jest.fn(),
  cancelJobsFor: jest.fn(),
  hasScheduledJobOfKind: jest.fn(),
};
jest.mock('@/lib/will/store', () => ({ getStore: () => store }));
jest.mock('@/lib/will/channel', () => ({
  deliverOut: jest.fn().mockResolvedValue({ ok: true }),
  sendWhatsAppText: jest.fn().mockResolvedValue({ ok: true }),
}));
jest.mock('@/lib/will/service', () => ({ runDeferredAutoReply: jest.fn() }));

const runLostLeadAnalysis = jest.fn();
jest.mock('@/lib/will/lost-analysis', () => ({
  runLostLeadAnalysis: (...a: unknown[]) => (runLostLeadAnalysis as unknown as (...x: unknown[]) => unknown)(...a),
}));

import { processDueJobs } from '@/lib/will/scheduler';

const lostJob = () => ({
  id: 'j1', customerId: null, kind: 'LOST_ANALYSIS' as const, payload: {},
  runAt: '2026-09-05T09:00:00.000Z', status: 'SCHEDULED' as const, createdAt: '2026-09-05T09:00:00.000Z',
});
const queued = () => store.addJob.mock.calls.map(([j]) => j).filter((j) => j.kind === 'LOST_ANALYSIS');

beforeEach(() => {
  for (const fn of Object.values(store)) (fn as jest.Mock).mockReset();
  runLostLeadAnalysis.mockReset();
  jest.useFakeTimers().setSystemTime(new Date('2026-09-05T09:00:00.000Z'));
  store.reclaimStaleJobs.mockResolvedValue(0);
  store.getSetting.mockResolvedValue(false);
  store.claimJob.mockResolvedValue(true);
  store.setJobStatus.mockResolvedValue(undefined);
  store.addJob.mockResolvedValue({ id: 'new' });
  store.audit.mockResolvedValue(undefined);
  store.listTemplates.mockResolvedValue([]);
  // The old bug depended on this returning false: the job just run is DONE.
  store.hasScheduledJobOfKind.mockResolvedValue(false);
  store.dueJobs.mockResolvedValue([lostJob()]);
});
afterEach(() => jest.useRealTimers());

describe('LOST_ANALYSIS after a finished run', () => {
  it.each(['done', 'already_run', 'nothing_to_do', 'budget_exhausted'])(
    "'%s' marks the job DONE and queues nothing", async (outcome) => {
      runLostLeadAnalysis.mockResolvedValue(outcome);
      await processDueJobs();
      expect(runLostLeadAnalysis).toHaveBeenCalledTimes(1);
      expect(store.setJobStatus).toHaveBeenCalledWith('j1', 'DONE');
      expect(queued()).toHaveLength(0);
      expect(store.hasScheduledJobOfKind).not.toHaveBeenCalled();
    },
  );

  it('a crash is recorded, the job is DONE, and nothing is queued (the next close or nightly retries)', async () => {
    runLostLeadAnalysis.mockRejectedValue(new Error('boom'));
    await processDueJobs();
    expect(store.audit).toHaveBeenCalledWith('nightly', 'lost_analysis_crashed', { error: 'boom' });
    expect(store.setJobStatus).toHaveBeenCalledWith('j1', 'DONE');
    expect(queued()).toHaveLength(0);
  });

  it("'incomplete' still resumes three minutes later, exactly as before", async () => {
    runLostLeadAnalysis.mockResolvedValue('incomplete');
    await processDueJobs();
    expect(store.setJobStatus).toHaveBeenCalledWith('j1', 'DONE');
    expect(queued()).toEqual([expect.objectContaining({
      customerId: null, kind: 'LOST_ANALYSIS', payload: {},
      runAt: '2026-09-05T09:03:00.000Z',
    })]);
  });

  it('the run is still handed what is left of the tick budget', async () => {
    runLostLeadAnalysis.mockResolvedValue('done');
    await processDueJobs();
    const [nowMs, budget] = runLostLeadAnalysis.mock.calls[0] as [number, number];
    expect(nowMs).toBe(Date.now());
    expect(budget).toBeGreaterThanOrEqual(2_000);
  });
});
