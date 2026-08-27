/**
 * The 24-hour window, on the message that reopens it.
 *
 * FOUND IN PRODUCTION, 27 Aug, from a Decision Log card (+44 7482 783185): a
 * customer wrote, Will had a perfectly good reply ready, and the guard refused
 * it with OUTSIDE_24H_WINDOW_NEEDS_TEMPLATE — while the customer was sitting
 * there mid-conversation.
 *
 * THE CAUSE. handleIncoming() fetches the customer row, stores the inbound
 * message (which is what sets last_customer_msg_at), and then builds the guard
 * context from the row it fetched BEFORE the write. So the guard was told how
 * long the customer had been silent BEFORE they broke the silence. Anyone
 * returning after more than a day had the reply to their comeback message
 * refused.
 *
 * WHY IT MATTERED MORE THAN IT LOOKS. These are exactly the customers Will
 * exists to win back: go quiet, get a follow-up, reply. That reply was the one
 * Will could not answer.
 *
 * What is pinned: the guard is given the time of the message being processed,
 * so a returning customer is inside the window, while the rules that genuinely
 * do stop a reply are untouched.
 */
const messages: { direction: 'IN' | 'OUT'; body: string; status: string }[] = [];
const LONG_AGO = '2026-08-01T00:00:00.000Z'; // 26 days before the customer wrote back
const customer = {
  id: 'c1', waId: '61400000001', name: 'Niamh', paid: false, state: 'PRICE_SENT',
  aiPaused: false, optedOut: false, isLegacy: false, lang: null, botOwned: true,
  lastCustomerMsgAt: LONG_AGO, income: 'UNKNOWN', formComplete: false,
  missingDocs: [], estimatedRefundCents: null,
};

const addMessage = jest.fn().mockImplementation(async (m: { direction: 'IN' | 'OUT'; body: string }) => {
  messages.push({ ...m, status: 'SENT' });
  return { id: `m${messages.length}` };
});

jest.mock('@/lib/will/store', () => ({
  getStore: () => ({
    // Deliberately NOT refreshed after addMessage — this returns the same stale
    // row the real store would, which is the condition that caused the bug.
    getCustomerByWaId: jest.fn().mockImplementation(async () => ({ ...customer })),
    createCustomer: jest.fn(),
    addMessage,
    updateCustomer: jest.fn().mockResolvedValue(undefined),
    findOpenTaskForCustomer: jest.fn().mockResolvedValue(null),
    addTask: jest.fn().mockResolvedValue({ id: 't1' }),
    updateTask: jest.fn().mockResolvedValue(undefined),
    cancelJobsFor: jest.fn().mockResolvedValue(undefined),
    audit: jest.fn().mockResolvedValue(undefined),
    getSetting: jest.fn().mockResolvedValue(undefined),
    setSetting: jest.fn().mockResolvedValue(undefined),
    listMessages: jest.fn().mockImplementation(async () => messages.map((m, i) => ({
      id: `m${i + 1}`, customerId: 'c1', direction: m.direction,
      author: m.direction === 'IN' ? 'CUSTOMER' : 'AI', status: m.status,
      body: m.body, createdAt: LONG_AGO,
    }))),
  }),
}));
jest.mock('@/lib/will/knowledge', () => ({ retrieveKnowledge: jest.fn().mockResolvedValue([]) }));
jest.mock('@/lib/will/scheduler', () => ({ reconcileSchedule: jest.fn().mockResolvedValue(undefined) }));

const runEngine = jest.fn().mockResolvedValue({ kind: 'silent', decision: { action: 'wait', confidence: 1 } });
jest.mock('@/lib/will/engine', () => ({ runEngine: (...a: unknown[]) => runEngine(...a) }));

import { handleIncoming } from '@/lib/will/service';

beforeEach(() => {
  messages.length = 0;
  runEngine.mockClear();
  Object.assign(customer, { aiPaused: false, paid: false, lastCustomerMsgAt: LONG_AGO });
});

it('treats the message being processed as the last customer message', async () => {
  await handleIncoming('61400000001', 'Perfect thank you so much, I will do that this evening!', 'SUPERVISED');

  expect(runEngine).toHaveBeenCalledTimes(1);
  const { guard } = runEngine.mock.calls[0][0] as { guard: { lastCustomerMsgAt: Date } };

  // The whole bug in one assertion: this used to be 26 days old.
  const ageMs = Date.now() - guard.lastCustomerMsgAt.getTime();
  expect(ageMs).toBeLessThan(60_000);
  expect(guard.lastCustomerMsgAt.getTime()).toBeGreaterThan(new Date(LONG_AGO).getTime());
});

it('the guard, given that context, allows a free-form reply', async () => {
  // Proving the fix end-to-end rather than just checking a field: the same
  // context the engine receives, put through the real guard.
  const { policyGuard } = await import('@/lib/will/policy-guard');
  await handleIncoming('61400000001', 'thanks, will do tonight', 'SUPERVISED');
  const { guard } = runEngine.mock.calls[0][0] as { guard: { lastCustomerMsgAt: Date } };

  const verdict = policyGuard('Amazing, no rush at all! Just send a screenshot once you have paid.', {
    state: 'PRICE_SENT', paid: false, aiPaused: false, killSwitch: false,
    optedOut: false, isLegacy: false, isApprovedTemplate: false, estimateFromTeam: null,
    lastCustomerMsgAt: guard.lastCustomerMsgAt,
  });
  expect(verdict.violations).not.toContain('OUTSIDE_24H_WINDOW_NEEDS_TEMPLATE');
  expect(verdict.allowed).toBe(true);
});

it('still passes the other guard flags through untouched', async () => {
  Object.assign(customer, { aiPaused: true });
  await handleIncoming('61400000001', 'hello again', 'SUPERVISED');
  const { guard } = runEngine.mock.calls[0][0] as { guard: { aiPaused: boolean; optedOut: boolean; isLegacy: boolean } };
  // Widening the window must not have quietly widened anything else: a paused
  // chat is still paused, and the guard still knows it.
  expect(guard.aiPaused).toBe(true);
  expect(guard.optedOut).toBe(false);
  expect(guard.isLegacy).toBe(false);
});
