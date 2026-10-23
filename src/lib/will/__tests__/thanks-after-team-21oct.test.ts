/**
 * Jo, 21 Oct (Janos +61 439): Jo sent "Your tax return has been lodged
 * successfully!" himself, Janos replied "Thanks!" seven minutes later, and
 * Will stayed silent because a person had written in the last 30 minutes.
 * A plain thank-you is answered anyway; real content still waits for the team.
 */

import type { MessageRow } from '@/lib/will/store';

const msg = (over: Partial<MessageRow>): MessageRow => ({
  id: 'm', customerId: 'c1', direction: 'IN', author: 'CUSTOMER', status: 'SENT', body: '', meta: {},
  createdAt: '2026-09-03T10:00:00.000Z', ...over,
} as MessageRow);

const customer = {
  id: 'c1', waId: '61400000001', name: 'Janos', paid: true, state: 'COMPLETED', aiPaused: false,
  optedOut: false, isLegacy: false, lang: 'en', income: null, formComplete: false, missingDocs: [],
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
const runEngine = jest.fn();
jest.mock('@/lib/will/engine', () => ({ runEngine: (...a: unknown[]) => runEngine(...a) }));

import { runDeferredAutoReply } from '@/lib/will/service';

const now = Date.now();
const iso = (minAgo: number) => new Date(now - minAgo * 60_000).toISOString();
const job = () => ({ payload: { debounce: true, anchorAt: iso(2) }, createdAt: iso(2), runAt: iso(0) });

beforeEach(() => {
  thread.length = 0;
  runEngine.mockReset().mockResolvedValue({ kind: 'sent', replyText: "You're very welcome! 😊", decision: { action: 'reply', reply_text: "You're very welcome! 😊", confidence: 1 } });
  audit.mockClear();
});

it('a plain thank-you after a team message is still answered', async () => {
  thread.push(
    msg({ id: '1', direction: 'OUT', author: 'HUMAN', body: 'Your tax return has been lodged successfully! ✅', createdAt: iso(9) }),
    msg({ id: '2', body: 'Thanks!', createdAt: iso(2) }),
  );
  await runDeferredAutoReply(customer as never, job());
  expect(runEngine).toHaveBeenCalled();
  expect(audit).not.toHaveBeenCalledWith('assistant', 'auto_reply_skipped_team_active', expect.anything());
});

it('a real question right after a team message still waits for the team', async () => {
  thread.push(
    msg({ id: '1', direction: 'OUT', author: 'HUMAN', body: 'Your tax return has been lodged successfully! ✅', createdAt: iso(9) }),
    msg({ id: '2', body: 'Thanks! When will the money arrive?', createdAt: iso(2) }),
  );
  await runDeferredAutoReply(customer as never, job());
  expect(runEngine).not.toHaveBeenCalled();
  // Jo, 22 Oct (Danielle): not dropped, re-armed for when the 30 minutes are up.
  expect(audit).toHaveBeenCalledWith('assistant', 'auto_reply_deferred_team_active', expect.objectContaining({ runAt: new Date(now - 9 * 60_000 + 31 * 60_000).toISOString() }));
});

it('Danielle: the deferred timer, once the 30 minutes are up, answers the question', async () => {
  thread.push(
    msg({ id: '1', direction: 'OUT', author: 'HUMAN', body: "You don't need to contact the ATO.", createdAt: iso(40) }),
    msg({ id: '2', body: 'Oh amazing. Is the eligibility check free?', createdAt: iso(18) }),
  );
  await runDeferredAutoReply(customer as never, { payload: { debounce: true, anchorAt: iso(18), attempt: 1 } as never, createdAt: iso(18), runAt: iso(0) });
  expect(runEngine).toHaveBeenCalled();
});

it('Jo answering inside the window still means Will says nothing', async () => {
  thread.push(
    msg({ id: '1', direction: 'OUT', author: 'HUMAN', body: 'x', createdAt: iso(40) }),
    msg({ id: '2', body: 'Is the eligibility check free?', createdAt: iso(18) }),
    msg({ id: '3', direction: 'OUT', author: 'HUMAN', body: "It's part of the review, $220.", createdAt: iso(10) }),
  );
  await runDeferredAutoReply(customer as never, { payload: { debounce: true, anchorAt: iso(18), attempt: 1 } as never, createdAt: iso(18), runAt: iso(0) });
  expect(runEngine).not.toHaveBeenCalled();
});

it('if Jo answered the thank-you himself, Will does not add a second one', async () => {
  thread.push(
    msg({ id: '1', direction: 'OUT', author: 'HUMAN', body: 'Lodged ✅', createdAt: iso(9) }),
    msg({ id: '2', body: 'Thanks!', createdAt: iso(2) }),
    msg({ id: '3', direction: 'OUT', author: 'HUMAN', body: 'Pleasure!', createdAt: iso(1) }),
  );
  await runDeferredAutoReply(customer as never, job());
  expect(runEngine).not.toHaveBeenCalled();
});
