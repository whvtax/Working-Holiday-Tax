/**
 * w2 (3 Nov): silence while the team is active, and the second check's revise
 * verdict. Synthetic data only.
 */
import type { MessageRow } from '@/lib/will/store';

const msg = (over: Partial<MessageRow>): MessageRow => ({
  id: 'm', customerId: 'c1', direction: 'IN', author: 'CUSTOMER', status: 'SENT', body: '', meta: {},
  createdAt: new Date().toISOString(), ...over,
} as MessageRow);

const customer = {
  id: 'c1', waId: '61400000001', name: 'Test', paid: true, state: 'PAID', aiPaused: false,
  optedOut: false, isLegacy: false, lang: 'en', income: null, formComplete: false, missingDocs: [],
  estimatedRefundCents: null, lastCustomerMsgAt: new Date().toISOString(),
};
let thread: MessageRow[] = [];
const settings = new Map<string, unknown>([['ai_mode', 'FULL_AUTO']]);
const audit = jest.fn().mockResolvedValue(undefined);
const addJob = jest.fn().mockResolvedValue({ id: 'j1' });
const addTask = jest.fn().mockResolvedValue({ id: 't1' });
jest.mock('@/lib/will/store', () => ({
  getStore: () => ({
    getCustomerByWaId: async () => ({ ...customer }),
    getCustomerById: async () => ({ ...customer }),
    listMessages: async () => [...thread],
    addMessage: async (m: Partial<MessageRow>) => msg(m),
    audit, addJob, addTask,
    getSetting: async (k: string) => settings.get(k),
    setSetting: async (k: string, v: unknown) => { settings.set(k, v); },
    setState: jest.fn().mockResolvedValue(true),
    updateCustomer: jest.fn().mockResolvedValue(undefined),
    findOpenTaskForCustomer: jest.fn().mockResolvedValue(null),
    updateTask: jest.fn().mockResolvedValue(undefined),
    cancelJobsFor: jest.fn().mockResolvedValue(0),
    bumpCounter: jest.fn().mockResolvedValue(false),
    listJobsForCustomer: jest.fn().mockResolvedValue([]),
    listTemplates: jest.fn().mockResolvedValue([]),
  }),
}));
const deliverOut = jest.fn().mockResolvedValue({ ok: true });
jest.mock('@/lib/will/channel', () => ({
  deliverOut: (...a: unknown[]) => deliverOut(...a),
  fetchWaMedia: jest.fn(),
}));
jest.mock('@/lib/will/knowledge', () => ({ retrieveKnowledge: jest.fn().mockResolvedValue([]) }));
jest.mock('@/lib/will/scheduler', () => ({ reconcileSchedule: jest.fn().mockResolvedValue(undefined) }));
jest.mock('@/lib/will/engine', () => ({ runEngine: jest.fn() }));
const reviewDraft = jest.fn();
jest.mock('@/lib/will/reviewer', () => ({ reviewDraft: (...a: unknown[]) => reviewDraft(...a) }));

import { runDeferredAutoReply, secondCheck } from '@/lib/will/service';

const iso = (minAgo: number) => new Date(Date.now() - minAgo * 60_000).toISOString();

beforeEach(() => {
  jest.clearAllMocks();
  settings.clear(); settings.set('ai_mode', 'FULL_AUTO');
  thread = [];
});

describe('team-active branch', () => {
  const run = (anchorMinAgo: number, attempt: number) =>
    runDeferredAutoReply({ ...customer } as never, { payload: { debounce: true, anchorAt: iso(anchorMinAgo), attempt } as never, createdAt: iso(anchorMinAgo), runAt: iso(0) });

  it('a question that waited past the (configurable) window gets one holding line and a task', async () => {
    process.env.WILL_TEAM_ACTIVE_ACK_MIN = '3';
    thread = [
      msg({ id: 'a', direction: 'OUT', author: 'HUMAN', body: 'Hi', createdAt: iso(10) }),
      msg({ id: 'b', body: 'When will it be done?', createdAt: iso(5) }),
    ];
    await run(5, 1);
    expect(deliverOut).toHaveBeenCalledTimes(1);
    expect(addTask).toHaveBeenCalled();
    // a repeat inside 12h does not send a second line
    await run(5, 2);
    expect(deliverOut).toHaveBeenCalledTimes(1);
    delete process.env.WILL_TEAM_ACTIVE_ACK_MIN;
  });

  it('a fresh question (waited 2 min) is deferred silently, no ack yet', async () => {
    thread = [
      msg({ id: 'a', direction: 'OUT', author: 'HUMAN', body: 'Hi', createdAt: iso(10) }),
      msg({ id: 'b', body: 'When will it be done?', createdAt: iso(2) }),
    ];
    await run(2, 0);
    expect(deliverOut).not.toHaveBeenCalled();
    expect(addJob).toHaveBeenCalled();
  });

  it('deferral cap reached: ack and a task instead of silence', async () => {
    thread = [
      msg({ id: 'a', direction: 'OUT', author: 'HUMAN', body: 'Hi', createdAt: iso(10) }),
      msg({ id: 'b', body: 'Is this ok?', createdAt: iso(3) }),
    ];
    const out = await run(3, 6);
    expect(out).toBe('answered');
    expect(addJob).not.toHaveBeenCalled();
    expect(deliverOut).toHaveBeenCalledTimes(1);
    expect(addTask).toHaveBeenCalled();
  });
});

describe('second check revise', () => {
  const outcome = () => ({ kind: 'queued' as const, replyText: 'ORIGINAL', decision: { action: 'reply' as const, reply_text: 'ORIGINAL', confidence: 1 } });
  const call = (o: ReturnType<typeof outcome>) =>
    secondCheck({ audit } as never, { ...customer } as never, [], 'FULL_AUTO' as never, o as never,
      { state: 'PAID', paid: true, estimatedRefundCents: null } as never);

  it('a usable revision replaces the text', async () => {
    reviewDraft.mockResolvedValue({ verdict: 'revise', revised: 'Better text', note: 'n' });
    const o = outcome();
    expect((await call(o)).verdict).toBe('revised');
    expect(o.replyText).toBe('Better text');
  });

  it('a revision that fails the guard never lets the original through', async () => {
    reviewDraft.mockResolvedValue({ verdict: 'revise', revised: 'You will get a refund of $500 guaranteed', note: 'n' });
    const o = outcome();
    const r = await call(o);
    expect(r.verdict).not.toBe('pass');
    expect(o.replyText).toBe('ORIGINAL');
  });

  it('revise without revised text is a hold, not a pass', async () => {
    reviewDraft.mockResolvedValue({ verdict: 'revise', note: 'n' });
    expect((await call(outcome())).verdict).toBe('hold');
  });
});
