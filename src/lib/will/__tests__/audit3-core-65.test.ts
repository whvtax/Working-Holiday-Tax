// Finding 65 (audit3): afterHumanReplyIndexed still read the customer's whole
// MESSAGE_WINDOW (up to 1,000 messages) via listMessages just to find the two
// or three still-pending drafts to discard. listPendingOutbound is the
// filtered read for exactly that slice — this pins that the indexed path uses
// it, never listMessages, and still discards the right rows.
import type { Store } from '@/lib/will/store';

describe('afterHumanReplyIndexed: discards drafts via listPendingOutbound, not listMessages', () => {
  it('reads listPendingOutbound and discards every PENDING_APPROVAL/QUEUED row it returns', async () => {
    const { afterHumanReplyIndexed } = await import('@/lib/will/after-reply');
    const setMessageStatus = jest.fn().mockResolvedValue(undefined);
    const listPendingOutbound = jest.fn().mockResolvedValue([
      { id: 'm1', customerId: 'c1', direction: 'OUT', status: 'PENDING_APPROVAL' },
      { id: 'm2', customerId: 'c1', direction: 'OUT', status: 'QUEUED' },
    ]);
    // listMessages is deliberately absent: a call to it here would throw
    // "not a function", proving the indexed path never falls back to reading
    // the whole conversation window to find these rows.
    const fakeStore = {
      markCustomerRead: jest.fn().mockResolvedValue(undefined),
      listPendingOutbound,
      setMessageStatus,
      listOpenTasksForCustomer: jest.fn().mockResolvedValue([]),
      resolveTask: jest.fn().mockResolvedValue(undefined),
    } as unknown as Store;

    const r = await afterHumanReplyIndexed(fakeStore, 'c1');

    expect(listPendingOutbound).toHaveBeenCalledWith('c1');
    expect(setMessageStatus.mock.calls.map((c) => [c[0], c[1]]).sort()).toEqual([
      ['m1', 'DISCARDED'],
      ['m2', 'DISCARDED'],
    ]);
    expect(r.tasksResolved).toBe(0);
  });

  it('never throws when listPendingOutbound fails (best effort, same as before)', async () => {
    const { afterHumanReplyIndexed } = await import('@/lib/will/after-reply');
    const fakeStore = {
      markCustomerRead: jest.fn().mockResolvedValue(undefined),
      listPendingOutbound: jest.fn().mockRejectedValue(new Error('db down')),
      setMessageStatus: jest.fn(),
      listOpenTasksForCustomer: jest.fn().mockResolvedValue([]),
      resolveTask: jest.fn().mockResolvedValue(undefined),
    } as unknown as Store;

    await expect(afterHumanReplyIndexed(fakeStore, 'c1')).resolves.toEqual({ tasksResolved: 0 });
  });
});

describe('store-supabase.listPendingOutbound: filters in the database, not the whole conversation window', () => {
  it('queries will_messages by customer_id, direction OUT and the two pending statuses', async () => {
    const fs = await import('fs/promises');
    const path = await import('path');
    const src = await fs.readFile(path.join(__dirname, '..', 'store-supabase.ts'), 'utf8');
    expect(src).toMatch(
      /async listPendingOutbound\(customerId: string\)[\s\S]{0,300}\.eq\('customer_id', customerId\)[\s\S]{0,120}\.eq\('direction', 'OUT'\)[\s\S]{0,120}\.in\('status', \['PENDING_APPROVAL', 'QUEUED'\]\)/,
    );
  });
});
