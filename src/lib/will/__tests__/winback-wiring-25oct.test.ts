/** Jo, 25 Oct: the win-back job in the scheduler, the Final state, the morning
 *  report tile, and the Lost Leads tab gone. */
import fs from 'fs';
import path from 'path';

const store = {
  reclaimStaleJobs: jest.fn(), getSetting: jest.fn(), setSetting: jest.fn(), dueJobs: jest.fn(), claimJob: jest.fn(),
  getCustomerById: jest.fn(), setJobStatus: jest.fn(), getJob: jest.fn(), addJob: jest.fn(), addTask: jest.fn(),
  addMessage: jest.fn(), audit: jest.fn(), listTemplates: jest.fn(), setState: jest.fn(), updateCustomer: jest.fn(),
  cancelJobsFor: jest.fn(), hasScheduledJobOfKind: jest.fn(),
};
jest.mock('@/lib/will/store', () => ({ getStore: () => store }));
jest.mock('@/lib/will/channel', () => ({ deliverOut: jest.fn().mockResolvedValue({ ok: true }), sendWhatsAppText: jest.fn().mockResolvedValue({ ok: true }) }));
jest.mock('@/lib/will/service', () => ({ runDeferredAutoReply: jest.fn() }));
const runWinbackPass = jest.fn();
jest.mock('@/lib/will/winback-auto', () => ({ runWinbackPass: (...a: unknown[]) => runWinbackPass(...a) }));

import { processDueJobs } from '@/lib/will/scheduler';
import { ALL_STATES, CLOSED_STATES, STAGE_GROUPS, STATE_LABELS, canTransition, reopenTarget } from '@/lib/will/state-machine';
import { buildMorningReport } from '@/lib/will/morning-report';
import type { CustomerRow } from '@/lib/will/store';

const job = (kind: string) => ({ id: 'j1', customerId: null, kind, payload: {}, runAt: '2026-10-25T09:00:00.000Z', status: 'SCHEDULED', createdAt: '2026-10-25T09:00:00.000Z' });
const queued = () => store.addJob.mock.calls.map(([j]) => j).filter((j) => j.kind === 'WINBACK');
const summary = (over: object) => ({ ranAt: '', finals: 0, decided: 0, never: 0, toSend: 0, sent: 0, failed: 0, remainingDecisions: 0, remainingSends: 0, budgetExhausted: false, incomplete: false, ...over });

beforeEach(() => {
  for (const fn of Object.values(store)) (fn as jest.Mock).mockReset();
  runWinbackPass.mockReset();
  jest.useFakeTimers().setSystemTime(new Date('2026-10-25T09:00:00.000Z'));
  store.reclaimStaleJobs.mockResolvedValue(0);
  store.getSetting.mockResolvedValue(false);
  store.claimJob.mockResolvedValue(true);
  store.addJob.mockResolvedValue({ id: 'new' });
  store.audit.mockResolvedValue(undefined);
  store.listTemplates.mockResolvedValue([]);
  store.hasScheduledJobOfKind.mockResolvedValue(false);
  store.setSetting.mockResolvedValue(undefined);
  store.setJobStatus.mockResolvedValue(undefined);
});
afterEach(() => jest.useRealTimers());

describe('the WINBACK job', () => {
  it('runs one pass with what is left of the tick and queues nothing when all is done', async () => {
    store.dueJobs.mockResolvedValue([job('WINBACK')]);
    runWinbackPass.mockResolvedValue(summary({}));
    await processDueJobs();
    const [nowMs, budget] = runWinbackPass.mock.calls[0];
    expect(nowMs).toBe(Date.now());
    expect(budget).toBeGreaterThanOrEqual(2_000);
    expect(store.setJobStatus).toHaveBeenCalledWith('j1', 'DONE');
    expect(queued()).toHaveLength(0);
  });
  it('more decisions: back in three minutes', async () => {
    store.dueJobs.mockResolvedValue([job('WINBACK')]);
    runWinbackPass.mockResolvedValue(summary({ remainingDecisions: 4 }));
    await processDueJobs();
    expect(queued()).toEqual([expect.objectContaining({ runAt: '2026-10-25T09:03:00.000Z' })]);
  });
  it('the AI budget spent: nothing more today', async () => {
    store.dueJobs.mockResolvedValue([job('WINBACK')]);
    runWinbackPass.mockResolvedValue(summary({ remainingDecisions: 4, budgetExhausted: true }));
    await processDueJobs();
    expect(queued()).toHaveLength(0);
  });
  it('a crash is recorded and the job is closed', async () => {
    store.dueJobs.mockResolvedValue([job('WINBACK')]);
    runWinbackPass.mockRejectedValue(new Error('boom'));
    await processDueJobs();
    expect(store.audit).toHaveBeenCalledWith('system', 'winback_pass_crashed', { error: 'boom' });
    expect(store.setJobStatus).toHaveBeenCalledWith('j1', 'DONE');
  });
  it('an old LOST_ANALYSIS job is closed and replaced by a win-back pass', async () => {
    store.dueJobs.mockResolvedValue([job('LOST_ANALYSIS')]);
    await processDueJobs();
    expect(store.setJobStatus).toHaveBeenCalledWith('j1', 'DONE');
    expect(queued()).toHaveLength(1);
    expect(runWinbackPass).not.toHaveBeenCalled();
  });
});

describe('the Final state', () => {
  it('exists, is closed, is red and comes after Closed', () => {
    expect(ALL_STATES).toContain('FINAL');
    expect(CLOSED_STATES).toContain('FINAL');
    expect(STATE_LABELS.FINAL).toBe('Final');
    const ids = STAGE_GROUPS.map((g) => g.id);
    expect(ids.indexOf('final')).toBe(ids.indexOf('closed') + 1);
    expect(STAGE_GROUPS.find((g) => g.id === 'final')!.color).toBe('#c0392b');
    expect(canTransition('NOT_INTERESTED', 'FINAL')).toBe(true);
    expect(canTransition('WENT_COLD', 'FINAL')).toBe(true);
    expect(canTransition('PRICE_SENT', 'FINAL')).toBe(false);
  });
  it('a Final lead who writes again is a new lead', () => {
    expect(reopenTarget({ paid: false, previousState: 'PRICE_SENT' })).toBe('NEW_LEAD');
  });
  it('every place that lists the closed states knows Final', () => {
    const files = ['src/lib/will/service.ts', 'src/lib/will/channel.ts', 'src/lib/will/scheduler.ts', 'src/lib/will/store-supabase.ts',
      'src/lib/will/store-file.ts', 'src/app/api/will/actions/route.ts', 'src/components/will/Dashboard.tsx'];
    for (const f of files) {
      const s = fs.readFileSync(path.join(process.cwd(), f), 'utf8');
      expect([f, /\['NOT_INTERESTED', 'WENT_COLD', 'NOT_RELEVANT'\]/.test(s)]).toEqual([f, false]);
    }
  });
  it('the win-back send does not reopen the lead (only their reply does)', () => {
    const ch = fs.readFileSync(path.join(process.cwd(), 'src/lib/will/channel.ts'), 'utf8');
    expect(ch).toContain("&& meta?.winback !== true) {");
  });
});

it('the morning report counts the win-backs', () => {
  const now = Date.parse('2026-10-25T09:00:00.000Z');
  const h = (n: number) => new Date(now - n * 3600_000).toISOString();
  const c = (id: string, over: Partial<CustomerRow>) => ({ id, waId: id, name: id, state: 'WENT_COLD', paid: false, optedOut: false, createdAt: h(2000), ...over } as CustomerRow);
  const r = buildMorningReport({
    now, tasks: [], messages: [], history: [],
    customers: [
      c('sent', { lastCustomerMsgAt: h(800) }),
      c('replied', { state: 'NEW_LEAD', lastCustomerMsgAt: h(2) }),
      c('final', { state: 'FINAL' }),
      c('queued', {}),
      c('won', { state: 'PAID', paid: true, lastCustomerMsgAt: h(100) }),
    ],
    winbacks: {
      sent: { sentAt: h(3) },
      replied: { sentAt: h(30) },
      final: { sentAt: h(200), finalAt: h(5) },
      queued: { decision: 'send', decidedAt: h(1) },
      won: { sentAt: h(300) },
    },
  });
  expect(r.winback).toEqual({ sent: 1, replied: 1, toFinal: 1, waitingReply: 1, queued: 1, wonBackPaid: 1 });
});

it('the Lost Leads tab, its route and its button are gone; the playbook knows a win-back reply', () => {
  const dash = fs.readFileSync(path.join(process.cwd(), 'src/components/will/Dashboard.tsx'), 'utf8');
  expect(dash).not.toContain("view === 'lost'");
  expect(dash).not.toContain('/api/will/lost');
  expect(fs.existsSync(path.join(process.cwd(), 'src/app/api/will/lost/route.ts'))).toBe(false);
  expect(fs.readFileSync(path.join(process.cwd(), 'src/app/api/will/actions/route.ts'), 'utf8')).not.toContain("case 'recover_lead'");
  expect(fs.readFileSync(path.join(process.cwd(), 'src/lib/will/playbook.ts'), 'utf8')).toContain('A REPLY TO OUR WIN-BACK');
  expect(fs.readFileSync(path.join(process.cwd(), 'src/components/will/MorningReport.tsx'), 'utf8')).toContain('Win-backs');
});
