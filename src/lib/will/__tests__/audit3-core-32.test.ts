/**
 * Two concurrently claimed timers for one customer must not cancel each other
 * (audit3 core 32, 5 Sep).
 *
 * Two messages seconds apart on two lambdas could leave two SCHEDULED
 * AUTO_REPLY timers. When both were due and two ticks ran at once, each claimed
 * one, each saw the other CLAIMED row as "a newer timer", both returned
 * 'superseded', and the burst was never answered. Supersession is now ordered:
 * a rival counts only if it is STRICTLY newer (run_at, then id), so exactly one
 * of the two survives and answers the whole burst. A rival with no run_at is
 * still treated as newer, as before.
 *
 * The database side (migration 040, a partial unique index mirroring 034) is
 * pinned by a source-shape check.
 */
import fs from 'fs';
import path from 'path';
import type { MessageRow } from '@/lib/will/store';

const msg = (over: Partial<MessageRow>): MessageRow => ({
  id: 'm', customerId: 'c1', direction: 'IN', author: 'CUSTOMER', status: 'SENT', body: '', meta: {},
  createdAt: '2026-09-03T10:00:00.000Z', ...over,
} as MessageRow);

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
const audit = jest.fn().mockResolvedValue(undefined);
const getSetting = jest.fn().mockImplementation(async (k: string) => (k === 'ai_mode' ? 'FULL_AUTO' : undefined));
const listJobsForCustomer = jest.fn().mockResolvedValue([]);
jest.mock('@/lib/will/store', () => ({
  getStore: () => ({
    getCustomerByWaId: jest.fn().mockImplementation(async () => ({ ...customer })),
    getCustomerById: jest.fn().mockImplementation(async () => ({ ...customer })),
    listMessages: jest.fn().mockImplementation(async () => [...thread]),
    addMessage, audit, getSetting,
    setState: jest.fn().mockResolvedValue(true),
    updateCustomer: jest.fn().mockResolvedValue(undefined),
    addJob: jest.fn().mockResolvedValue({ id: 'j1' }),
    addTask: jest.fn().mockResolvedValue({ id: 't1' }),
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
jest.mock('@/lib/will/scheduler', () => ({ reconcileSchedule: jest.fn().mockResolvedValue(undefined) }));
const runEngine = jest.fn();
jest.mock('@/lib/will/engine', () => ({ runEngine: (...a: unknown[]) => runEngine(...a) }));

import { runDeferredAutoReply } from '@/lib/will/service';

const OLDER = { id: 'j-older', payload: { debounce: true, anchorAt: '2026-09-03T10:00:40.000Z' }, createdAt: '2026-09-03T10:00:40.000Z', runAt: '2026-09-03T10:02:40.000Z' };
const NEWER = { id: 'j-newer', payload: { debounce: true, anchorAt: '2026-09-03T10:00:43.000Z' }, createdAt: '2026-09-03T10:00:43.000Z', runAt: '2026-09-03T10:02:43.000Z' };
const claimed = (j: typeof OLDER) => ({ id: j.id, kind: 'AUTO_REPLY', status: 'CLAIMED', payload: j.payload, runAt: j.runAt });

beforeEach(() => {
  thread.length = 0;
  thread.push(
    msg({ id: '1', body: 'hi', createdAt: '2026-09-03T10:00:40.000Z' }),
    msg({ id: '2', body: 'I need help with my tax return', createdAt: '2026-09-03T10:00:43.000Z' }),
  );
  listJobsForCustomer.mockReset(); listJobsForCustomer.mockResolvedValue([]);
  addMessage.mockClear(); audit.mockClear(); deliverOut.mockClear(); runEngine.mockReset();
  runEngine.mockResolvedValue({
    kind: 'queued', replyText: 'Hey Alex! Of course, happy to help.',
    newState: 'QUALIFIED', decision: { action: 'reply', confidence: 1 },
  });
});

describe('two timers claimed at once for the same customer', () => {
  it('the OLDER run stands aside for the newer CLAIMED one', async () => {
    listJobsForCustomer.mockResolvedValue([claimed(OLDER), claimed(NEWER)]);
    const what = await runDeferredAutoReply(customer as never, OLDER);
    expect(what).toBe('superseded');
    expect(runEngine).not.toHaveBeenCalled();
    expect(deliverOut).not.toHaveBeenCalled();
  });

  it('the NEWER run does NOT stand aside for the older CLAIMED one: it answers the whole burst once', async () => {
    listJobsForCustomer.mockResolvedValue([claimed(OLDER), claimed(NEWER)]);
    const what = await runDeferredAutoReply(customer as never, NEWER);
    expect(what).toBe('sent');
    expect(deliverOut).toHaveBeenCalledTimes(1);
    expect(runEngine).toHaveBeenCalledTimes(1);
    expect(runEngine.mock.calls[0][0].history.map((h: { text: string }) => h.text)).toEqual(['hi', 'I need help with my tax return']);
    expect(audit).not.toHaveBeenCalledWith('assistant', 'auto_reply_superseded', expect.anything());
  });

  it('same run_at: the id breaks the tie so exactly one survives', async () => {
    const a = { ...OLDER, id: 'a', runAt: NEWER.runAt };
    const b = { ...NEWER, id: 'b', runAt: NEWER.runAt };
    listJobsForCustomer.mockResolvedValue([claimed(a), claimed(b)]);
    expect(await runDeferredAutoReply(customer as never, a)).toBe('superseded');
    deliverOut.mockClear(); runEngine.mockClear();
    expect(await runDeferredAutoReply(customer as never, b)).toBe('sent');
  });

  it('a rival with no run_at still counts as newer (unchanged)', async () => {
    listJobsForCustomer.mockResolvedValue([{ id: 'j2', kind: 'AUTO_REPLY', status: 'SCHEDULED', payload: { debounce: true } }]);
    expect(await runDeferredAutoReply(customer as never, OLDER)).toBe('superseded');
  });

  it('the pre-send check uses the same ordering: an older claimed rival does not drop the reply', async () => {
    runEngine.mockImplementation(async () => {
      listJobsForCustomer.mockResolvedValue([claimed(OLDER), claimed(NEWER)]);
      return { kind: 'queued', replyText: 'Sure!', decision: { action: 'reply', confidence: 1 } };
    });
    expect(await runDeferredAutoReply(customer as never, NEWER)).toBe('sent');
    expect(deliverOut).toHaveBeenCalledTimes(1);
  });
});

describe('the database keeps one pending timer per customer', () => {
  it('migration 040 adds a partial unique index on AUTO_REPLY debounce timers, mirroring 034', () => {
    const sql = fs.readFileSync(path.join(process.cwd(), 'supabase/migrations/040_one_pending_auto_reply.sql'), 'utf8');
    expect(sql).toMatch(/CREATE UNIQUE INDEX IF NOT EXISTS will_jobs_one_pending_auto_reply/);
    expect(sql).toMatch(/WHERE kind = 'AUTO_REPLY' AND status = 'SCHEDULED' AND \(payload->>'debounce'\) = 'true'/);
    // Duplicates already produced by the race are cleared first, keeping the earliest.
    expect(sql).toMatch(/DELETE FROM will_jobs a/);
  });
});
