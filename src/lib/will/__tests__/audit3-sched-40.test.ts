/**
 * audit3 sched-40: "Stop chasing" cannot be undone by the tick itself.
 *
 * Before: only reconcileSchedule read the per-customer off switch. The tick
 * armed the next step directly through scheduleFollowUp after a send, a missing
 * template, a guard block or a crash, and the FOLLOW_UP send path checked
 * state / optedOut / aiPaused / paid but never the switch. So a press of the
 * button while that customer's nudge was CLAIMED (the route cancels only
 * SCHEDULED rows) let the tick finish the send and re-arm the cadence Jo had
 * just switched off.
 *
 * Now: scheduleFollowUp returns without arming when the switch is on (covers
 * every direct caller at once), and a FOLLOW_UP that is already sitting
 * SCHEDULED is CANCELLED at fire time rather than sent. A customer whose
 * follow-ups are on is untouched: same template, same delay, same next step.
 */
const store = {
  reclaimStaleJobs: jest.fn(),
  getSetting: jest.fn(),
  setSetting: jest.fn(),
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
  listJobsForCustomer: jest.fn(),
  history: jest.fn(),
};
jest.mock('@/lib/will/store', () => ({ getStore: () => store }));

const deliverOut = jest.fn();
jest.mock('@/lib/will/channel', () => ({
  deliverOut: (...a: unknown[]) => deliverOut(...a),
  sendWhatsAppText: jest.fn().mockResolvedValue({ ok: true }),
}));
jest.mock('@/lib/will/policy-guard', () => ({
  policyGuard: () => ({ allowed: true, violations: [] }),
  registerLibraryBodies: () => {},
}));
// Inside the sending window, so the test does not depend on the wall clock.
jest.mock('@/lib/will/config', () => ({
  ...jest.requireActual('@/lib/will/config'),
  withinQuietHours: () => true,
}));

import { processDueJobs, scheduleFollowUp, followupsOffKey } from '@/lib/will/scheduler';
import { schedulerConfig } from '@/lib/will/config';

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

const settings: Record<string, unknown> = {};

beforeEach(() => {
  for (const fn of Object.values(store)) (fn as jest.Mock).mockReset();
  deliverOut.mockReset();
  for (const k of Object.keys(settings)) delete settings[k];
  settings['ai_mode'] = 'FULL_AUTO';
  store.getSetting.mockImplementation(async (k: string) => settings[k]);
  store.setSetting.mockImplementation(async (k: string, v: unknown) => { settings[k] = v; });
  store.reclaimStaleJobs.mockResolvedValue(0);
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
  store.getJob.mockResolvedValue({ ...JOB, status: 'DONE' });
  store.listJobsForCustomer.mockResolvedValue([]);
  store.history.mockResolvedValue([]);
  deliverOut.mockResolvedValue({ ok: true });
});

describe('scheduleFollowUp honours the per-customer off switch', () => {
  it('arms nothing at all (not even the auto-close) while follow-ups are off', async () => {
    settings[followupsOffKey('c1')] = true;
    await scheduleFollowUp('c1', 'prePayment', 1);
    await scheduleFollowUp('c1', 'prePayment', schedulerConfig().prePayment.length);
    expect(store.addJob).not.toHaveBeenCalled();
  });

  it('arms exactly as before when the switch is off or was switched back on', async () => {
    settings[followupsOffKey('c1')] = false;
    await scheduleFollowUp('c1', 'prePayment', 1);
    expect(store.addJob).toHaveBeenCalledTimes(1);
    const job = store.addJob.mock.calls[0][0];
    expect(job.kind).toBe('FOLLOW_UP');
    expect(job.payload).toMatchObject({ flow: 'prePayment', seq: 1 });
    expect(Math.round((new Date(job.runAt).getTime() - Date.now()) / 1000)).toBe(schedulerConfig().prePayment[1]);
  });
});

describe('the FOLLOW_UP send path honours the per-customer off switch', () => {
  it('a job already SCHEDULED when Stop chasing was pressed is cancelled at fire time, not sent', async () => {
    settings[followupsOffKey('c1')] = true;
    const r = await processDueJobs();
    expect(deliverOut).not.toHaveBeenCalled();
    expect(store.setJobStatus).toHaveBeenCalledWith('j1', 'CANCELLED');
    expect(store.addJob).not.toHaveBeenCalled();
    expect(r.sent).toEqual([]);
  });

  it('the switch pressed mid-send stops the tick re-arming the next step (the finding)', async () => {
    // Jo presses the button while the nudge is CLAIMED: the route has cancelled
    // the SCHEDULED rows (there are none), the setting flips, and the send that
    // was already past the eligibility check completes.
    deliverOut.mockImplementation(async () => {
      settings[followupsOffKey('c1')] = true;
      return { ok: true };
    });
    await processDueJobs();
    expect(deliverOut).toHaveBeenCalledTimes(1);
    expect(store.addJob).not.toHaveBeenCalled();
  });

  it('a customer whose follow-ups are on is sent to and moved to the next step as before', async () => {
    const r = await processDueJobs();
    expect(deliverOut).toHaveBeenCalledTimes(1);
    expect(store.setJobStatus).toHaveBeenCalledWith('j1', 'DONE');
    expect(store.addJob).toHaveBeenCalledTimes(1);
    expect(store.addJob.mock.calls[0][0].payload).toMatchObject({ flow: 'prePayment', seq: 1 });
    expect(r.sent).toEqual(['Alex · First nudge']);
  });
});
