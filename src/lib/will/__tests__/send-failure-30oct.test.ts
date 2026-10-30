/**
 * 30 Oct 2026: Meta send failures. 131042 (unsettled WhatsApp bill), 130497
 * (restricted country), plain text outside the 24 hour window. Recorded,
 * retried the right way, and ONE urgent task per customer, not one per message.
 */
import { classifySendError, retryPlan, recordSendFailure, SEND_FAILURE_PREFIX } from '@/lib/will/send-failure-30oct';

type Task = { id: string; customerId: string | null; customerName: string | null; reason: string; severity: string; context: string | null; suggestedReply: string | null; status: 'OPEN' | 'RESOLVED' };
function fakeStore() {
  const tasks: Task[] = [];
  const store = {
    audit: jest.fn().mockResolvedValue(undefined),
    cancelJobsFor: jest.fn().mockResolvedValue(3),
    addTask: jest.fn(async (t: Omit<Task, 'id' | 'status'>) => { const row = { id: `t${tasks.length + 1}`, status: 'OPEN' as const, ...t }; tasks.push(row); return row as never; }),
    updateTask: jest.fn(async (id: string, patch: Partial<Task>) => { Object.assign(tasks.find((t) => t.id === id)!, patch); }),
    findOpenTaskForCustomer: jest.fn(async (id: string) => (tasks.find((t) => t.customerId === id && t.status === 'OPEN') as never) ?? null),
  };
  return { store, tasks };
}

describe('classification', () => {
  it('reads the Meta code out of the error text or the code field', () => {
    expect(classifySendError('meta 400: (#131042) Business eligibility payment issue')).toEqual({ code: 131042, kind: 'billing' });
    expect(classifySendError('meta 400: restricted', 130497)).toEqual({ code: 130497, kind: 'restricted_country' });
    expect(classifySendError('meta 400: (#131047) Re-engagement message').kind).toBe('outside_window');
    expect(classifySendError('template "x" is not in WhatsApp Manager and the customer last wrote 3 days ago, so free text cannot reach them').kind).toBe('outside_window');
    expect(classifySendError('meta 404: (#132001) Template name does not exist in the translation').kind).toBe('no_template');
    expect(classifySendError('no_language_variant: the customer writes in fr').kind).toBe('no_language_variant');
    expect(classifySendError('socket hang up').kind).toBe('other');
  });
});

describe('retry plan: plain text versus template', () => {
  it('outside the window only a template can arrive; with none, nothing is retried', () => {
    expect(retryPlan('outside_window', { hasTemplate: true, inWindow: false })).toBe('template');
    expect(retryPlan('outside_window', { hasTemplate: false, inWindow: false })).toBe('none');
  });
  it('a missing template falls back to text only inside the window', () => {
    expect(retryPlan('no_template', { hasTemplate: true, inWindow: true })).toBe('text');
    expect(retryPlan('no_template', { hasTemplate: true, inWindow: false })).toBe('none');
  });
  it('the billing hold waits and goes again; restricted country and withheld English are never retried', () => {
    expect(retryPlan('billing', { hasTemplate: true, inWindow: false })).toBe('wait');
    expect(retryPlan('restricted_country', { hasTemplate: true, inWindow: true })).toBe('none');
    expect(retryPlan('no_language_variant', { hasTemplate: true, inWindow: true })).toBe('none');
  });
});

describe('one urgent task per customer', () => {
  it('five failed messages to one customer make one urgent task, grown not repeated', async () => {
    const { store, tasks } = fakeStore();
    for (let i = 0; i < 5; i++) {
      await recordSendFailure(store, { customerId: 'c1', customerName: 'Sam', messageId: `m${i}`, error: 'meta 400: (#131047) Re-engagement message', body: `follow up ${i}`, templateName: `fu_${i}`, via: 'status' });
    }
    expect(store.addTask).toHaveBeenCalledTimes(1);
    expect(tasks).toHaveLength(1);
    expect(tasks[0].severity).toBe('URGENT');
    expect(tasks[0].reason.startsWith(SEND_FAILURE_PREFIX)).toBe(true);
    expect(tasks[0].context).toContain('follow up 4');
    expect(store.audit).toHaveBeenCalledTimes(5);
    expect(store.audit).toHaveBeenCalledWith('channel', 'send_failure_recorded', expect.objectContaining({ customerId: 'c1', code: 131047, kind: 'outside_window' }));
  });
  it('two customers get one task each', async () => {
    const { store, tasks } = fakeStore();
    await recordSendFailure(store, { customerId: 'a', customerName: 'A', error: '(#130497)', body: 'x', via: 'send' });
    await recordSendFailure(store, { customerId: 'b', customerName: 'B', error: '(#130497)', body: 'y', via: 'send' });
    await recordSendFailure(store, { customerId: 'a', customerName: 'A', error: '(#130497)', body: 'z', via: 'send' });
    expect(tasks.map((t) => t.customerId)).toEqual(['a', 'b']);
  });
  it('130497 also cancels the customer\'s pending follow-ups, because every one would fail the same way', async () => {
    const { store } = fakeStore();
    const r = await recordSendFailure(store, { customerId: 'c1', customerName: 'Sam', error: 'meta 400: (#130497) Business account is restricted from messaging users in this country', body: 'hi', via: 'send' });
    expect(r.kind).toBe('restricted_country');
    expect(store.cancelJobsFor).toHaveBeenCalledWith('c1', expect.arrayContaining(['FOLLOW_UP', 'WINBACK']));
  });
  it('a customer who already has an open handoff task gets the failure added to it, made urgent, reason kept', async () => {
    const { store, tasks } = fakeStore();
    tasks.push({ id: 'h1', customerId: 'c1', customerName: 'Sam', reason: 'Customer asked about the ATO', severity: 'REVIEW', context: 'asked', suggestedReply: 'draft', status: 'OPEN' });
    const r = await recordSendFailure(store, { customerId: 'c1', customerName: 'Sam', error: '(#131047)', body: 'late reply', via: 'status' });
    expect(r).toMatchObject({ taskRaised: false, folded: true });
    expect(tasks).toHaveLength(1);
    expect(tasks[0]).toMatchObject({ reason: 'Customer asked about the ATO', severity: 'URGENT', suggestedReply: 'draft' });
    expect(tasks[0].context).toContain('late reply');
  });
  it('131042 is recorded per customer but raises no per customer task (the account level alert is the webhook\'s)', async () => {
    const { store, tasks } = fakeStore();
    const r = await recordSendFailure(store, { customerId: 'c1', customerName: 'Sam', error: 'meta 400: (#131042) payment issue', body: 'hi', via: 'send' });
    expect(r).toMatchObject({ kind: 'billing', taskRaised: false });
    expect(tasks).toHaveLength(0);
    expect(store.audit).toHaveBeenCalledWith('channel', 'send_failure_recorded', expect.objectContaining({ code: 131042, kind: 'billing' }));
  });
});
