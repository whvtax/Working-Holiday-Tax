/** 3 Nov: send failures are classified, repaired once, escalated once. Synthetic data only. */
import { classifySendError, retryPlan, planRepair, criticalSystemKind, recordSendFailure, SEND_FAILURE_PREFIX } from '@/lib/will/send-failure-30oct';
import { explainSendError } from '@/lib/will/send-errors';
import { unrepairedCritical } from '@/lib/will/system-message-guard';

type Task = { id: string; customerId: string | null; customerName: string | null; reason: string; severity: string; context: string | null; suggestedReply: string | null; status: 'OPEN' };
function fakeStore() {
  const tasks: Task[] = [];
  const store = {
    audit: jest.fn().mockResolvedValue(undefined),
    cancelJobsFor: jest.fn().mockResolvedValue(2),
    addTask: jest.fn(async (t: Omit<Task, 'id' | 'status'>) => { const r = { id: `t${tasks.length + 1}`, status: 'OPEN' as const, ...t }; tasks.push(r); return r as never; }),
    updateTask: jest.fn(async (id: string, p: Partial<Task>) => { Object.assign(tasks.find((t) => t.id === id)!, p); }),
    findOpenTaskForCustomer: jest.fn(async (id: string) => (tasks.find((t) => t.customerId === id) as never) ?? null),
  };
  return { store, tasks };
}
const PAY = 'Payment received.\n\nPlease fill out this quick form: https://example.test/tax-form?t=abc';

describe('classification', () => {
  it('maps the new Meta codes', () => {
    expect(classifySendError('meta 400: (#130403) blocked').kind).toBe('blocked_by_customer');
    expect(classifySendError('meta 400: (#131049) ecosystem').kind).toBe('ecosystem');
    expect(classifySendError('meta 500: (#131000) something went wrong').kind).toBe('retryable');
    expect(classifySendError('meta 400: (#131047) re-engagement').kind).toBe('outside_window');
  });
  it('owner text for 130403 and 131049', () => {
    expect(explainSendError('meta 400: (#130403) x')).toMatch(/blocked/);
    expect(explainSendError('meta 400: (#131049) x')).toMatch(/held this message back/);
  });
  it('never retried by the old plan', () => {
    expect(retryPlan('blocked_by_customer', { hasTemplate: true, inWindow: true })).toBe('none');
    expect(retryPlan('ecosystem', { hasTemplate: true, inWindow: true })).toBe('none');
    expect(retryPlan('retryable', { hasTemplate: true, inWindow: true })).toBe('wait');
  });
});

describe('critical message kinds', () => {
  it('recognises the messages a customer waits on', () => {
    expect(criticalSystemKind(PAY)).toBe('payment_received');
    expect(criticalSystemKind('Please send your ABN invoices or a payment summary.')).toBe('abn_request');
    expect(criticalSystemKind('Here is your link https://example.test/tax-form')).toBe('form_link');
    expect(criticalSystemKind('Still with the team.', { waTemplate: { name: 'handoff_bump' } })).toBe('handoff_ack');
    expect(criticalSystemKind('Thanks, got it')).toBeNull();
  });
});

describe('planRepair', () => {
  const base = { critical: 'payment_received' as const, hasTemplate: true, inWindow: true, attempts: 0, alreadyEscalated: false };
  it('blocked customers are closed quietly', () => expect(planRepair({ ...base, kind: 'blocked_by_customer' })).toBe('close_quietly'));
  it('template missing inside the window falls back to free text, outside escalates', () => {
    expect(planRepair({ ...base, kind: 'no_template' })).toBe('retry_text');
    expect(planRepair({ ...base, kind: 'no_template', inWindow: false })).toBe('escalate_once');
  });
  it('window error uses the template when there is one', () => {
    expect(planRepair({ ...base, kind: 'outside_window', inWindow: false })).toBe('retry_template');
    expect(planRepair({ ...base, kind: 'outside_window', inWindow: false, hasTemplate: false })).toBe('escalate_once');
  });
  it('transient failures retry a bounded number of times, then escalate exactly once', () => {
    expect(planRepair({ ...base, kind: 'retryable' })).toBe('retry_later');
    expect(planRepair({ ...base, kind: 'retryable', attempts: 2 })).toBe('escalate_once');
    expect(planRepair({ ...base, kind: 'retryable', attempts: 2, alreadyEscalated: true })).toBe('already_escalated');
  });
  it('131049 is never retried', () => expect(planRepair({ ...base, kind: 'ecosystem' })).toBe('escalate_once'));
  it('a non critical transient failure retries then stops', () => {
    expect(planRepair({ ...base, critical: null, kind: 'retryable' })).toBe('retry_later');
    expect(planRepair({ ...base, critical: null, kind: 'outside_window' })).toBe('nothing');
  });
});

describe('recordSendFailure', () => {
  it('130403 raises no task, cancels follow-ups and leaves a note', async () => {
    const { store, tasks } = fakeStore();
    const r = await recordSendFailure(store, { customerId: 'c1', customerName: 'Sam', error: 'meta 400: (#130403) blocked', body: 'hi', via: 'status' });
    expect(r.taskRaised).toBe(false);
    expect(tasks).toHaveLength(0);
    expect(store.cancelJobsFor).toHaveBeenCalled();
    expect(store.audit).toHaveBeenCalledWith('channel', 'send_failure_blocked_by_customer_closed', expect.anything());
  });
  it('131049 repeated makes one task and does not touch it again', async () => {
    const { store, tasks } = fakeStore();
    for (let i = 0; i < 4; i++) await recordSendFailure(store, { customerId: 'c1', customerName: 'Sam', error: 'meta 400: (#131049) x', body: `m${i}`, via: 'send' });
    expect(tasks).toHaveLength(1);
    expect(store.updateTask).not.toHaveBeenCalled();
  });
  it('131047 repeated: still one task per customer', async () => {
    const { store, tasks } = fakeStore();
    for (let i = 0; i < 3; i++) await recordSendFailure(store, { customerId: 'c1', customerName: 'Sam', error: 'meta 400: (#131047) x', body: `m${i}`, via: 'send' });
    expect(tasks).toHaveLength(1);
    expect(store.addTask).toHaveBeenCalledTimes(1);
  });
  it('a failed payment confirmation is escalated exactly once', async () => {
    const { store, tasks } = fakeStore();
    for (let i = 0; i < 3; i++) await recordSendFailure(store, { customerId: 'c1', customerName: 'Sam', error: 'socket closed', body: PAY, via: 'send' });
    expect(tasks).toHaveLength(1);
    expect(tasks[0].reason.startsWith(SEND_FAILURE_PREFIX)).toBe(true);
    expect(tasks[0].reason).toMatch(/payment confirmation with the form link/);
    expect(tasks[0].severity).toBe('URGENT');
  });
  it('a critical failure folds into an unrelated open task once', async () => {
    const { store, tasks } = fakeStore();
    tasks.push({ id: 't0', customerId: 'c1', customerName: 'Sam', reason: 'Customer asked about Medicare', severity: 'REVIEW', context: 'q', suggestedReply: null, status: 'OPEN' });
    await recordSendFailure(store, { customerId: 'c1', customerName: 'Sam', error: 'x', body: PAY, via: 'send' });
    await recordSendFailure(store, { customerId: 'c1', customerName: 'Sam', error: 'x', body: PAY, via: 'send' });
    expect(tasks).toHaveLength(1);
    expect(store.updateTask).toHaveBeenCalledTimes(1);
    expect(tasks[0].severity).toBe('URGENT');
  });
});

describe('unrepairedCritical', () => {
  const now = Date.parse('2026-11-03T12:00:00Z');
  const row = (id: string, status: string, body: string, ago: number, author = 'AI') => ({ id, direction: 'OUT' as const, status: status as never, body, meta: undefined, createdAt: new Date(now - ago).toISOString(), author });
  const H = 3600_000;
  it('finds a failed payment confirmation with nothing delivered after it', () => {
    const r = unrepairedCritical([row('a', 'FAILED', PAY, 30 * H)], { now });
    expect(r.map((x) => x.kind)).toEqual(['payment_received']);
  });
  it('a discarded confirmation counts too', () => {
    expect(unrepairedCritical([row('a', 'DISCARDED', PAY, 2 * H)], { now })).toHaveLength(1);
  });
  it('is not reported once a confirmation was delivered, or when a person sent it', () => {
    expect(unrepairedCritical([row('a', 'FAILED', PAY, 30 * H), row('b', 'SENT', PAY, 20 * H)], { now })).toHaveLength(0);
    expect(unrepairedCritical([row('a', 'FAILED', PAY, 30 * H, 'HUMAN')], { now })).toHaveLength(0);
  });
  it('ignores old rows and fresh queued rows', () => {
    expect(unrepairedCritical([row('a', 'FAILED', PAY, 10 * 24 * H)], { now })).toHaveLength(0);
    expect(unrepairedCritical([row('a', 'QUEUED', PAY, 60_000)], { now })).toHaveLength(0);
  });
});
