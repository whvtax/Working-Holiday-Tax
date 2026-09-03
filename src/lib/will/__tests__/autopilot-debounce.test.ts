/**
 * Autopilot waits, THEN reads, THEN answers (Jo, 3 Sep).
 *
 * The two-minute delay used to hold a reply that had already been written the
 * instant the first message landed. People write in bursts, so that reply
 * answered the first line of three. Now nothing is decided on arrival: a timer
 * is armed and re-armed by every message, and when it fires Will reads
 * everything the customer wrote since our last message and answers it once.
 *
 * Pinned here:
 *  - burstText joins the whole burst, oldest first, and ignores drafts;
 *  - a timer that fires after a NEWER message does nothing (that message owns
 *    the answer);
 *  - a timer that fires after somebody already answered does nothing;
 *  - a timer that fires cleanly sends ONE reply, applies the state it carried,
 *    and does not park anything QUEUED;
 *  - a customer who writes again while the model is thinking is not talked
 *    past: the reply is dropped at the last moment.
 */
import type { MessageRow } from '@/lib/will/store';

const msg = (over: Partial<MessageRow>): MessageRow => ({
  id: 'm', customerId: 'c1', direction: 'IN', author: 'CUSTOMER', status: 'SENT', body: '', meta: {},
  createdAt: '2026-09-03T10:00:00.000Z', ...over,
} as MessageRow);

// ── burstText is pure ────────────────────────────────────────────────────────
import { burstText } from '@/lib/will/service';

describe('what the deferred reply reads', () => {
  it('joins everything since our last message, oldest first', () => {
    const thread = [
      msg({ id: '1', body: 'hi', createdAt: '2026-09-03T09:00:00.000Z' }),
      msg({ id: '2', direction: 'OUT', author: 'AI', body: 'Hey! ...', createdAt: '2026-09-03T09:01:00.000Z' }),
      msg({ id: '3', body: 'I have a question', createdAt: '2026-09-03T10:00:00.000Z' }),
      msg({ id: '4', body: 'about my ABN income', createdAt: '2026-09-03T10:00:20.000Z' }),
      msg({ id: '5', body: 'do I need invoices?', createdAt: '2026-09-03T10:00:40.000Z' }),
    ];
    expect(burstText(thread)).toBe('I have a question\nabout my ABN income\ndo I need invoices?');
  });

  it('ignores drafts and discarded replies when looking for our last message', () => {
    const thread = [
      msg({ id: '1', body: 'first' }),
      msg({ id: '2', direction: 'OUT', author: 'AI', status: 'DISCARDED', body: 'never went' }),
      msg({ id: '3', body: 'second' }),
    ];
    expect(burstText(thread)).toBe('first\nsecond');
  });

  it('falls back to the latest inbound line when the burst is empty', () => {
    const thread = [
      msg({ id: '1', body: 'only line' }),
      msg({ id: '2', direction: 'OUT', author: 'HUMAN', body: 'answered' }),
    ];
    expect(burstText(thread)).toBe('only line');
    expect(burstText([])).toBe('');
  });
});

// ── the timer firing, through the real service with a mocked store ──────────
const customer = {
  id: 'c1', waId: '61400000001', name: 'Alex', paid: false, state: 'QUALIFIED', aiPaused: false,
  optedOut: false, isLegacy: false, lang: null, income: null, formComplete: false, missingDocs: [],
  estimatedRefundCents: null, lastCustomerMsgAt: '2026-09-03T10:00:40.000Z',
};
const thread: MessageRow[] = [];
const addMessage = jest.fn().mockImplementation(async (m: Partial<MessageRow>) => {
  const row = msg({ id: `m${thread.length + 1}`, createdAt: new Date().toISOString(), ...m });
  thread.push(row);
  return row;
});
const setState = jest.fn().mockResolvedValue(true);
const updateCustomer = jest.fn().mockResolvedValue(undefined);
const addJob = jest.fn().mockResolvedValue({ id: 'j1' });
const addTask = jest.fn().mockResolvedValue({ id: 't1' });
const audit = jest.fn().mockResolvedValue(undefined);
const getSetting = jest.fn().mockImplementation(async (k: string) => (k === 'ai_mode' ? 'FULL_AUTO' : undefined));
/** The customer's AUTO_REPLY jobs as the store sees them at fire time. */
const listJobsForCustomer = jest.fn().mockResolvedValue([]);
jest.mock('@/lib/will/store', () => ({
  getStore: () => ({
    getCustomerByWaId: jest.fn().mockImplementation(async () => ({ ...customer })),
    getCustomerById: jest.fn().mockImplementation(async () => ({ ...customer })),
    listMessages: jest.fn().mockImplementation(async () => [...thread]),
    addMessage, setState, updateCustomer, addJob, addTask, audit, getSetting,
    setSetting: jest.fn().mockResolvedValue(undefined),
    findOpenTaskForCustomer: jest.fn().mockResolvedValue(null),
    cancelJobsFor: jest.fn().mockResolvedValue(0),
    bumpCounter: jest.fn().mockResolvedValue(false),
    listJobsForCustomer: (...a: unknown[]) => listJobsForCustomer(...a),
  }),
}));
const deliverOut = jest.fn().mockResolvedValue({ ok: true });
jest.mock('@/lib/will/channel', () => ({
  deliverOut: (...a: unknown[]) => deliverOut(...a),
  fetchWaMedia: jest.fn(),
}));
jest.mock('@/lib/will/knowledge', () => ({ retrieveKnowledge: jest.fn().mockResolvedValue([]) }));
const reconcileSchedule = jest.fn().mockResolvedValue(undefined);
jest.mock('@/lib/will/scheduler', () => ({ reconcileSchedule: (...a: unknown[]) => reconcileSchedule(...a) }));
const runEngine = jest.fn();
jest.mock('@/lib/will/engine', () => ({ runEngine: (...a: unknown[]) => runEngine(...a) }));

import { runDeferredAutoReply } from '@/lib/will/service';

const job = (anchorAt: string | null) => ({ payload: { debounce: true, anchorAt }, createdAt: anchorAt, runAt: '2026-09-03T10:02:40.000Z' });

beforeEach(() => {
  thread.length = 0;
  thread.push(
    msg({ id: '1', body: 'hi', createdAt: '2026-09-03T10:00:00.000Z' }),
    msg({ id: '2', body: 'I need help with my tax return', createdAt: '2026-09-03T10:00:40.000Z' }),
  );
  customer.lastCustomerMsgAt = '2026-09-03T10:00:40.000Z';
  customer.state = 'QUALIFIED';
  listJobsForCustomer.mockReset(); listJobsForCustomer.mockResolvedValue([]);
  addMessage.mockClear(); setState.mockClear(); updateCustomer.mockClear(); addJob.mockClear();
  addTask.mockClear(); audit.mockClear(); deliverOut.mockClear(); runEngine.mockReset();
  runEngine.mockResolvedValue({
    kind: 'queued', replyText: 'Hey Alex! Of course, happy to help. Which option suits you?',
    newState: 'QUALIFIED', decision: { action: 'reply', confidence: 1 },
  });
  getSetting.mockImplementation(async (k: string) => (k === 'ai_mode' ? 'FULL_AUTO' : undefined));
});

describe('when the timer fires', () => {
  it('reads the whole burst and sends ONE reply, right away, nothing queued', async () => {
    const what = await runDeferredAutoReply(customer as never, job('2026-09-03T10:00:40.000Z'));
    expect(what).toBe('sent');
    expect(runEngine).toHaveBeenCalledTimes(1);
    // The engine was handed the burst, not the last line alone.
    const history = runEngine.mock.calls[0][0].history as { role: string; text: string }[];
    expect(history.map((h) => h.text)).toEqual(['hi', 'I need help with my tax return']);
    expect(deliverOut).toHaveBeenCalledTimes(1);
    expect(deliverOut.mock.calls[0][1]).toMatch(/happy to help/);
    // Nothing parked for a later tick: the wait already happened.
    expect(addMessage).not.toHaveBeenCalledWith(expect.objectContaining({ status: 'QUEUED' }));
    expect(addJob).not.toHaveBeenCalled();
  });

  it('applies the state the reply carries, at send time, and re-arms the cadence for it', async () => {
    runEngine.mockResolvedValue({
      kind: 'queued', replyText: 'Perfect! The total is $220.', newState: 'PRICE_SENT',
      decision: { action: 'reply', confidence: 1 },
    });
    reconcileSchedule.mockClear();
    await runDeferredAutoReply(customer as never, job('2026-09-03T10:00:40.000Z'));
    expect(setState).toHaveBeenCalledWith('c1', 'PRICE_SENT', 'AI');
    expect(updateCustomer).toHaveBeenCalledWith('c1', { income: 'TFN' });
    // The follow-ups belong to the stage the customer is in AFTER the reply,
    // so the cadence is reconciled once the state has moved, not only when
    // the message arrived two minutes earlier.
    expect(reconcileSchedule).toHaveBeenCalledTimes(1);
  });

  it('does nothing when a newer text re-armed the timer (a newer SCHEDULED job exists)', async () => {
    listJobsForCustomer.mockResolvedValue([{ id: 'j2', kind: 'AUTO_REPLY', status: 'SCHEDULED', payload: { debounce: true } }]);
    const what = await runDeferredAutoReply(customer as never, job('2026-09-03T10:00:40.000Z'));
    expect(what).toBe('superseded');
    expect(runEngine).not.toHaveBeenCalled();
    expect(deliverOut).not.toHaveBeenCalled();
  });

  it('a reaction or voice note in between does NOT cancel the answer', async () => {
    // Stored as an inbound message (lastCustomerMsgAt moves) but arms no timer:
    // the question still gets its reply (audit, 3 Sep).
    customer.lastCustomerMsgAt = '2026-09-03T10:01:30.000Z';
    thread.push(msg({ id: '3', body: '👍 [Reaction]', createdAt: '2026-09-03T10:01:30.000Z' }));
    const what = await runDeferredAutoReply(customer as never, job('2026-09-03T10:00:40.000Z'));
    expect(what).toBe('sent');
    expect(deliverOut).toHaveBeenCalledTimes(1);
  });

  it('does nothing when somebody already answered', async () => {
    thread.push(msg({ id: '3', direction: 'OUT', author: 'HUMAN', body: 'Jo here, on it', createdAt: '2026-09-03T10:01:00.000Z' }));
    const what = await runDeferredAutoReply(customer as never, job('2026-09-03T10:00:40.000Z'));
    expect(what).toBe('answered');
    expect(runEngine).not.toHaveBeenCalled();
    expect(deliverOut).not.toHaveBeenCalled();
  });

  it('drops the reply if the customer wrote again while the model was thinking', async () => {
    // The supersession check runs again right before the send: the new text
    // armed a fresh SCHEDULED timer while the model was working.
    runEngine.mockImplementation(async () => {
      listJobsForCustomer.mockResolvedValue([{ id: 'j2', kind: 'AUTO_REPLY', status: 'SCHEDULED', payload: { debounce: true } }]);
      return { kind: 'queued', replyText: 'Sure!', decision: { action: 'reply', confidence: 1 } };
    });
    const what = await runDeferredAutoReply(customer as never, job('2026-09-03T10:00:40.000Z'));
    expect(what).toBe('decided');
    expect(deliverOut).not.toHaveBeenCalled();
    expect(audit).toHaveBeenCalledWith('assistant', 'auto_reply_superseded', expect.objectContaining({ customerId: 'c1' }));
  });

  it('writes a draft instead of sending if the mode was switched to Approval meanwhile', async () => {
    getSetting.mockImplementation(async (k: string) => (k === 'ai_mode' ? 'SUPERVISED' : undefined));
    runEngine.mockResolvedValue({ kind: 'pending_approval', replyText: 'Sure!', decision: { action: 'reply', confidence: 1 } });
    const what = await runDeferredAutoReply(customer as never, job('2026-09-03T10:00:40.000Z'));
    expect(what).toBe('decided');
    expect(runEngine.mock.calls[0][0].mode).toBe('SUPERVISED');
    expect(deliverOut).not.toHaveBeenCalled();
    expect(addMessage).toHaveBeenCalledWith(expect.objectContaining({ status: 'PENDING_APPROVAL' }));
  });

  it('a human task from the model is still a task, never a send', async () => {
    runEngine.mockResolvedValue({
      kind: 'human_task', task: { reason: 'Customer asks for a refund figure', severity: 'REVIEW' },
      decision: { action: 'human_task', confidence: 1 },
    });
    const what = await runDeferredAutoReply(customer as never, job('2026-09-03T10:00:40.000Z'));
    expect(what).toBe('decided');
    expect(addTask).toHaveBeenCalledTimes(1);
    expect(deliverOut).not.toHaveBeenCalled();
  });

  it('a customer who opted out is skipped', async () => {
    const what = await runDeferredAutoReply({ ...customer, optedOut: true } as never, job('2026-09-03T10:00:40.000Z'));
    expect(what).toBe('skipped');
    expect(runEngine).not.toHaveBeenCalled();
  });
});
