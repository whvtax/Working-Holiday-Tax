/**
 * The Tasks tab and the chat are two views of one conversation.
 *
 * THE RULE (Jo, 28 Aug). Answering in either place has to settle both: the chat
 * stops being bold and loses its unread count, and every open task for that
 * customer closes.
 *
 * WHAT WAS BROKEN. Each send path had grown its own half. manual_reply and
 * send_task_reply closed tasks; approve_message marked the chat read;
 * send_template, send_estimate, send_signature and send_lodged did neither. So
 * sending the very template Will proposed, from the chat, left its task sitting
 * in the Tasks tab for a customer who had already been answered.
 *
 * THE PART THAT MATTERS MOST IS THE LAST TEST. This runs after WhatsApp has
 * accepted the message. Nothing in here may throw, because the caller turns a
 * throw into a failed request, and a failed request is one the owner sends
 * again. A stale badge is a nuisance; the same message arriving twice is not.
 */
import { afterHumanReply } from '@/lib/will/after-reply';
import type { Store, TaskRow, MessageRow } from '@/lib/will/store';

const task = (over: Partial<TaskRow>): TaskRow => ({
  id: 't1', customerId: 'c1', customerName: null, reason: 'r', severity: 'REVIEW',
  context: null, suggestedReply: null, status: 'OPEN', createdAt: '2026-08-28T00:00:00.000Z',
  ...over,
});

const msg = (over: Partial<MessageRow>): MessageRow => ({
  id: 'm1', customerId: 'c1', direction: 'OUT', author: 'AI', status: 'SENT',
  body: 'x', createdAt: '2026-08-28T00:00:00.000Z', meta: {}, ...over,
} as unknown as MessageRow);

function fakeStore(tasks: TaskRow[], messages: MessageRow[] = []) {
  const markCustomerRead = jest.fn().mockResolvedValue(undefined);
  const resolveTask = jest.fn().mockResolvedValue(undefined);
  const listTasks = jest.fn().mockResolvedValue(tasks);
  const listMessages = jest.fn().mockResolvedValue(messages);
  const setMessageStatus = jest.fn().mockResolvedValue(undefined);
  return {
    store: { markCustomerRead, resolveTask, listTasks, listMessages, setMessageStatus } as unknown as Store,
    markCustomerRead, resolveTask, listTasks, listMessages, setMessageStatus,
  };
}

describe('answering somebody settles both views', () => {
  it('clears the unread badge', async () => {
    const f = fakeStore([]);
    await afterHumanReply(f.store, 'c1');
    expect(f.markCustomerRead).toHaveBeenCalledWith('c1');
  });

  it('closes every open task for that customer, not just one', async () => {
    // Two tasks for one person answered by one message is one conversation
    // settled, not one and a half.
    const f = fakeStore([task({ id: 'a' }), task({ id: 'b' })]);
    const r = await afterHumanReply(f.store, 'c1');
    expect(f.resolveTask.mock.calls.map((c) => c[0]).sort()).toEqual(['a', 'b']);
    expect(r.tasksResolved).toBe(2);
  });

  it('leaves other customers alone', async () => {
    const f = fakeStore([task({ id: 'mine' }), task({ id: 'theirs', customerId: 'c2' })]);
    await afterHumanReply(f.store, 'c1');
    expect(f.resolveTask).toHaveBeenCalledTimes(1);
    expect(f.resolveTask).toHaveBeenCalledWith('mine');
  });

  it('leaves tasks that are already resolved alone', async () => {
    const f = fakeStore([task({ id: 'done', status: 'RESOLVED' })]);
    const r = await afterHumanReply(f.store, 'c1');
    expect(f.resolveTask).not.toHaveBeenCalled();
    expect(r.tasksResolved).toBe(0);
  });

  it('does nothing loudly when there is nothing to do', async () => {
    const f = fakeStore([]);
    const r = await afterHumanReply(f.store, 'c1');
    expect(r.tasksResolved).toBe(0);
  });
});

describe('it discards Will\'s stale drafts so the chat does not come back', () => {
  it('discards a pending approval and a queued autopilot reply, nothing else', async () => {
    // The owner has just answered in person. A draft awaiting approval and an
    // autopilot reply still in its delay are now stale: leaving them is exactly
    // why an already-handled chat reappeared under "Needs a decision".
    const f = fakeStore([], [
      msg({ id: 'pending', status: 'PENDING_APPROVAL' }),
      msg({ id: 'queued', status: 'QUEUED' }),
      msg({ id: 'alreadySent', status: 'SENT' }),
      msg({ id: 'inbound', direction: 'IN', author: 'CUSTOMER', status: 'PENDING_APPROVAL' }),
    ]);
    await afterHumanReply(f.store, 'c1');
    expect(f.setMessageStatus.mock.calls.map((c) => c[0]).sort()).toEqual(['pending', 'queued']);
    expect(f.setMessageStatus).toHaveBeenCalledWith('pending', 'DISCARDED');
    expect(f.setMessageStatus).toHaveBeenCalledWith('queued', 'DISCARDED');
  });

  it('still closes the task even if the draft cleanup throws', async () => {
    const f = fakeStore([task({ id: 'a' })]);
    (f.listMessages as jest.Mock).mockRejectedValue(new Error('db down'));
    const r = await afterHumanReply(f.store, 'c1');
    expect(r.tasksResolved).toBe(1);
    expect(f.resolveTask).toHaveBeenCalledWith('a');
  });
});

describe('it can never fail the send that just succeeded', () => {
  it('survives the badge write throwing', async () => {
    const f = fakeStore([task({})]);
    (f.markCustomerRead as jest.Mock).mockRejectedValue(new Error('db down'));
    await expect(afterHumanReply(f.store, 'c1')).resolves.toEqual({ tasksResolved: 1 });
    // And it still got on with the rest.
    expect(f.resolveTask).toHaveBeenCalled();
  });

  it('survives the task list throwing', async () => {
    const f = fakeStore([]);
    (f.listTasks as jest.Mock).mockRejectedValue(new Error('db down'));
    await expect(afterHumanReply(f.store, 'c1')).resolves.toEqual({ tasksResolved: 0 });
  });

  it('survives one task refusing to close', async () => {
    const f = fakeStore([task({ id: 'a' }), task({ id: 'b' })]);
    (f.resolveTask as jest.Mock).mockRejectedValueOnce(new Error('row locked'));
    await expect(afterHumanReply(f.store, 'c1')).resolves.toEqual({ tasksResolved: 2 });
    expect(f.resolveTask).toHaveBeenCalledTimes(2);
  });
});
