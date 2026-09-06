/**
 * audit3 / sched-49: the tick budget reserves time for the job it is about to
 * start. An Autopilot timer claimed at second 44 of a 60s invocation was killed
 * mid-model-call, stayed CLAIMED with its attempt spent, and was retried (and
 * paid for) a tick later. Now a model-calling job is only claimed while a
 * normal slow run of it still fits before the wall; short jobs keep the plain
 * 45s budget, and the timers left behind are audited exactly as before.
 */
const store = {
  reclaimStaleJobs: jest.fn(),
  getSetting: jest.fn(),
  setSetting: jest.fn(),
  dueJobs: jest.fn(),
  claimJob: jest.fn(),
  getCustomerById: jest.fn(),
  setJobStatus: jest.fn(),
  setState: jest.fn(),
  audit: jest.fn(),
};
jest.mock('@/lib/will/store', () => ({ getStore: () => store }));
jest.mock('@/lib/will/channel', () => ({
  deliverOut: jest.fn().mockResolvedValue({ ok: true }),
  sendWhatsAppText: jest.fn().mockResolvedValue({ ok: true }),
}));
const runDeferredAutoReply = jest.fn();
jest.mock('@/lib/will/service', () => ({
  runDeferredAutoReply: (...a: unknown[]) => runDeferredAutoReply(...a),
}));

import { processDueJobs, tickCanStart, tickReservationMs } from '@/lib/will/scheduler';

const CUSTOMER = {
  id: 'c1', waId: '61400000001', name: 'Alex', state: 'NEW', paid: false,
  aiPaused: false, isLegacy: false, optedOut: false, lang: null,
  lastCustomerMsgAt: '2026-09-03T10:00:40.000Z', estimatedRefundCents: null,
};
const past = new Date(Date.now() - 1000).toISOString();
const TIMER = {
  id: 'j1', customerId: 'c1', kind: 'AUTO_REPLY' as const,
  payload: { debounce: true, anchorAt: '2026-09-03T10:00:40.000Z' },
  runAt: past, status: 'SCHEDULED' as const, createdAt: past,
};
const CLOSE = {
  id: 'j2', customerId: 'c1', kind: 'AUTO_CLOSE' as const,
  payload: {}, runAt: past, status: 'SCHEDULED' as const, createdAt: past,
};

const realNow = Date.now;
/** Once the batch is read, the first Date.now() is the tick's start and every
 *  later one is `elapsed` ms into it. */
function runTickAt(elapsedMs: number) {
  const base = realNow();
  let armed = false; let started = false;
  store.dueJobs.mockImplementation(async () => { armed = true; return [TIMER, CLOSE]; });
  jest.spyOn(Date, 'now').mockImplementation(() => {
    if (!armed) return base;
    if (!started) { started = true; return base; }
    return base + elapsedMs;
  });
  return processDueJobs();
}

beforeEach(() => {
  for (const fn of Object.values(store)) (fn as jest.Mock).mockReset();
  runDeferredAutoReply.mockReset().mockResolvedValue('sent');
  store.reclaimStaleJobs.mockResolvedValue(0);
  store.getSetting.mockResolvedValue(false);
  store.claimJob.mockResolvedValue(true);
  store.getCustomerById.mockResolvedValue(CUSTOMER);
  store.setJobStatus.mockResolvedValue(undefined);
  store.setState.mockResolvedValue(undefined);
  store.audit.mockResolvedValue(undefined);
});
afterEach(() => { jest.restoreAllMocks(); });

describe('audit3 sched-49: the tick reserves time for the job it starts', () => {
  it('a model-calling timer needs the bigger reservation, a short job the plain budget', () => {
    expect(tickReservationMs('AUTO_REPLY')).toBeGreaterThan(tickReservationMs('FOLLOW_UP'));
    // A timer at second 44 (the killed case) is left for the next tick.
    expect(tickCanStart('AUTO_REPLY', 44_000)).toBe(false);
    // One at the start of a tick, or a quarter of the way in, still runs.
    expect(tickCanStart('AUTO_REPLY', 0)).toBe(true);
    expect(tickCanStart('AUTO_REPLY', 15_000)).toBe(true);
    // Short jobs: same 45s line as before this change.
    expect(tickCanStart('FOLLOW_UP', 44_000)).toBe(true);
    expect(tickCanStart('AUTO_CLOSE', 45_500)).toBe(false);
  });

  it('35s into a tick the timer is left SCHEDULED, the short job still runs, and the leftover is audited', async () => {
    await runTickAt(35_000);
    expect(store.claimJob).not.toHaveBeenCalledWith('j1');
    expect(runDeferredAutoReply).not.toHaveBeenCalled();
    expect(store.claimJob).toHaveBeenCalledWith('j2');
    expect(store.setJobStatus).toHaveBeenCalledWith('j2', 'DONE');
    const budget = store.audit.mock.calls.filter((c) => c[1] === 'tick_budget_exhausted');
    expect(budget).toHaveLength(1);
    expect(budget[0][2].remaining).toBe(1);
  });

  it('10s into a tick both run and nothing is reported', async () => {
    await runTickAt(10_000);
    expect(runDeferredAutoReply).toHaveBeenCalledTimes(1);
    expect(store.setJobStatus).toHaveBeenCalledWith('j1', 'DONE');
    expect(store.setJobStatus).toHaveBeenCalledWith('j2', 'DONE');
    expect(store.audit.mock.calls.some((c) => c[1] === 'tick_budget_exhausted')).toBe(false);
  });
});
