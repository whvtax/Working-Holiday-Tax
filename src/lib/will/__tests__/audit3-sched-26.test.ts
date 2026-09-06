/**
 * Audit 3, lane sched, finding 26 (5 Sep): one open task per customer, also
 * for the tasks the scheduler raises.
 *
 * raiseOrUpdateTask used to be private to service.ts, so a follow-up refused
 * by the Policy Guard (a Library body with a leftover {{PLACEHOLDER}}) opened
 * a fresh card on every cadence step, for every customer in that flow, while
 * the cadence kept advancing. Pinned here:
 *   - the shared fold adds a task when none is open and grows the open one
 *     otherwise, with the reason, severity and suggested reply unchanged;
 *   - the scheduler's guard-blocked follow-up goes through that fold;
 *   - a store double without findOpenTaskForCustomer behaves as before.
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
  deliverOut: jest.fn().mockResolvedValue({ ok: true }),
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
import { raiseOrUpdateTask, MAX_TASK_CONTEXT } from '@/lib/will/tasks';
import * as fs from 'fs';
import * as path from 'path';

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

beforeEach(() => {
  for (const fn of Object.values(store)) (fn as jest.Mock).mockReset();
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
  // A bad Library entry: the placeholder was never filled in.
  store.listTemplates.mockResolvedValue([
    { key: 'fu_pre_24h', title: 'Pre 24h', body: 'Hi {{FIRST_NAME}}, still keen to get your tax sorted?' },
  ]);
});

describe('raiseOrUpdateTask (shared)', () => {
  const c = { id: 'c1', name: 'Ana', waId: '61400' };

  it('adds a task with the same fields when none is open', async () => {
    const res = await raiseOrUpdateTask(store as never, c, {
      reason: 'R', severity: 'REVIEW', newContext: 'ctx', suggestedReply: 'sr',
    });
    expect(store.addTask).toHaveBeenCalledTimes(1);
    expect(store.addTask).toHaveBeenCalledWith({
      customerId: 'c1', customerName: 'Ana', reason: 'R', severity: 'REVIEW', context: 'ctx', suggestedReply: 'sr',
    });
    expect(store.updateTask).not.toHaveBeenCalled();
    expect(res).toEqual({ id: 't1' });
  });

  it('grows the open task instead of adding a second one', async () => {
    store.findOpenTaskForCustomer.mockResolvedValue({ id: 'open1', context: 'first' });
    const res = await raiseOrUpdateTask(store as never, c, {
      reason: 'R2', severity: 'URGENT', newContext: 'second', suggestedReply: 'sr2',
    });
    expect(store.addTask).not.toHaveBeenCalled();
    expect(store.updateTask).toHaveBeenCalledWith('open1', {
      reason: 'R2', severity: 'URGENT', context: 'first\n---\nsecond', suggestedReply: 'sr2',
    });
    expect(res).toBeNull();
  });

  it('keeps the context capped and copes with a null context', async () => {
    store.findOpenTaskForCustomer.mockResolvedValue({ id: 'open1', context: 'x'.repeat(MAX_TASK_CONTEXT) });
    await raiseOrUpdateTask(store as never, c, { reason: 'R', severity: 'REVIEW', newContext: null, suggestedReply: null });
    expect((store.updateTask.mock.calls[0][1] as { context: string }).context.length).toBe(MAX_TASK_CONTEXT);
  });

  it('falls back to the customer number, then null, for the card name', async () => {
    await raiseOrUpdateTask(store as never, { id: 'c2', name: null, waId: '61499' }, { reason: 'R', severity: 'REVIEW', newContext: null, suggestedReply: null });
    expect(store.addTask.mock.calls[0][0].customerName).toBe('61499');
    await raiseOrUpdateTask(store as never, { id: 'c3', name: null, waId: null }, { reason: 'R', severity: 'REVIEW', newContext: null, suggestedReply: null });
    expect(store.addTask.mock.calls[1][0].customerName).toBeNull();
  });

  it('is a plain addTask against a store double without findOpenTaskForCustomer', async () => {
    const partial = { addTask: jest.fn().mockResolvedValue({ id: 'p' }), updateTask: jest.fn() };
    await raiseOrUpdateTask(partial as never, c, { reason: 'R', severity: 'REVIEW', newContext: 'ctx', suggestedReply: null });
    expect(partial.addTask).toHaveBeenCalledTimes(1);
  });
});

describe('scheduler: a guard-blocked follow-up folds into the open task', () => {
  it('opens one card for the first blocked step and grows it on the next', async () => {
    store.dueJobs.mockResolvedValue([followUp('a', 0)]);
    await processDueJobs();
    expect(store.addTask).toHaveBeenCalledTimes(1);
    expect(store.addTask.mock.calls[0][0]).toMatchObject({
      customerId: 'a', customerName: 'Cust a',
      reason: expect.stringContaining('Follow-up blocked by Policy Guard: '),
      severity: 'REVIEW', context: 'Pre 24h', suggestedReply: 'suggested',
    });
    expect(store.addTask.mock.calls[0][0].reason).toContain('PLACEHOLDER_LEFTOVER');
    // The cadence still advances, as before.
    expect(store.addJob).toHaveBeenCalledWith(expect.objectContaining({ kind: 'FOLLOW_UP', payload: expect.objectContaining({ seq: 1 }) }));

    // Next step, the card from the first is still open: no second card.
    store.addTask.mockClear();
    store.findOpenTaskForCustomer.mockResolvedValue({ id: 'open-a', context: 'Pre 24h' });
    store.dueJobs.mockResolvedValue([followUp('a', 1)]);
    await processDueJobs();
    expect(store.addTask).not.toHaveBeenCalled();
    expect(store.updateTask).toHaveBeenCalledTimes(1);
    expect(store.updateTask.mock.calls[0][0]).toBe('open-a');
    expect(store.updateTask.mock.calls[0][1]).toMatchObject({
      reason: expect.stringContaining('Follow-up blocked by Policy Guard: '), severity: 'REVIEW',
    });
  });
});

describe('source shape', () => {
  it('leaves no direct per-customer addTask in the scheduler', () => {
    const src = fs.readFileSync(path.join(process.cwd(), 'src/lib/will/scheduler.ts'), 'utf8');
    const direct = src.match(/store\.addTask\(\{/g) ?? [];
    // The nightly consistency notice also went through raiseOrFoldSystemTask
    // (audit3 sched #62, same day): its customerId: null was printed as if it
    // were a real customer, and folding it the same way as everything else
    // fixed that too. So no direct store.addTask({ calls remain here at all.
    expect(direct.length).toBe(0);
    expect(src).toMatch(/import \{[^}]*\braiseOrUpdateTask\b[^}]*\} from '\.\/tasks'/);
  });
});
