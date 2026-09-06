/**
 * Same run_at, two timers: the LATER-CREATED one answers (audit3 core 39, 5 Sep).
 *
 * Core 32 made supersession strictly ordered (run_at, then id). Ids are random
 * UUIDs, so two timers armed in the same second by two webhook invocations
 * picked their survivor at random. created_at now sits between run_at and id:
 * the timer the later message armed is the one that answers, and there is still
 * exactly one survivor, never zero. Rows without created_at fall back to the id.
 */
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

const claimedAt = (j: typeof OLDER, createdAt?: string) => ({ ...claimed(j), createdAt });

describe('two timers with the same run_at (audit3 core 39)', () => {
  const RUN = '2026-09-03T10:02:43.000Z';
  // Ids chosen so the id tie-break alone would pick the WRONG one: 'z' > 'a'.
  const first = { ...OLDER, id: 'z-first', runAt: RUN, createdAt: '2026-09-03T10:00:43.100Z' };
  const second = { ...NEWER, id: 'a-second', runAt: RUN, createdAt: '2026-09-03T10:00:43.700Z' };

  it('the earlier-created run stands aside, even though its id sorts higher', async () => {
    listJobsForCustomer.mockResolvedValue([claimedAt(first, first.createdAt), claimedAt(second, second.createdAt)]);
    expect(await runDeferredAutoReply(customer as never, first)).toBe('superseded');
    expect(runEngine).not.toHaveBeenCalled();
  });

  it('the later-created run answers the whole burst once', async () => {
    listJobsForCustomer.mockResolvedValue([claimedAt(first, first.createdAt), claimedAt(second, second.createdAt)]);
    expect(await runDeferredAutoReply(customer as never, second)).toBe('sent');
    expect(deliverOut).toHaveBeenCalledTimes(1);
    expect(runEngine.mock.calls[0][0].history.map((h: { text: string }) => h.text)).toEqual(['hi', 'I need help with my tax return']);
    expect(audit).not.toHaveBeenCalledWith('assistant', 'auto_reply_superseded', expect.anything());
  });

  it('exactly one survivor: never both superseded, never both sent', async () => {
    const rows = [claimedAt(first, first.createdAt), claimedAt(second, second.createdAt)];
    listJobsForCustomer.mockResolvedValue(rows);
    const a = await runDeferredAutoReply(customer as never, first);
    thread.length = 2; deliverOut.mockClear(); runEngine.mockClear();
    const b = await runDeferredAutoReply(customer as never, second);
    expect([a, b].filter((r) => r === 'superseded')).toHaveLength(1);
    expect([a, b].filter((r) => r === 'sent')).toHaveLength(1);
  });

  it('no created_at on the rows: the id still breaks the tie as before', async () => {
    listJobsForCustomer.mockResolvedValue([claimedAt(first), claimedAt(second)]);
    expect(await runDeferredAutoReply(customer as never, { ...first, createdAt: null } as never)).toBe('sent');
    deliverOut.mockClear(); runEngine.mockClear();
    expect(await runDeferredAutoReply(customer as never, { ...second, createdAt: null } as never)).toBe('superseded');
  });

  it('the pre-send check agrees: the later-created run does not drop its reply', async () => {
    runEngine.mockImplementation(async () => {
      listJobsForCustomer.mockResolvedValue([claimedAt(first, first.createdAt), claimedAt(second, second.createdAt)]);
      return { kind: 'queued', replyText: 'Sure!', decision: { action: 'reply', confidence: 1 } };
    });
    expect(await runDeferredAutoReply(customer as never, second)).toBe('sent');
    expect(deliverOut).toHaveBeenCalledTimes(1);
  });
});
