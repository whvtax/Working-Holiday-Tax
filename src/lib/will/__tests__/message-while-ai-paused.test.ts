/**
 * (Jo, 6 Sep) Once Will is switched off for a customer — by hand, or by the
 * new auto-off-at-Review rule — an inbound message from them must:
 *   (a) still be stored in the chat, exactly as always (proven by every
 *       other inbound test; not re-proven here),
 *   (b) get NO auto-reply, draft, or send of any kind from Will, and
 *   (c) open (or fold into) a task for Jo, so he actually sees it.
 *
 * Before this change the AI_PAUSED_FOR_CUSTOMER guard violation produced a
 * bare 'silent' outcome with nothing else happening — a message could arrive
 * on a paused chat and nobody would ever be told.
 */
const customer = {
  id: 'c1', waId: '61400000001', name: 'Alex', paid: true, state: 'UNDER_REVIEW',
  aiPaused: true, optedOut: false, isLegacy: false, lang: null, botOwned: false,
  lastCustomerMsgAt: new Date().toISOString(), income: 'TFN', formComplete: true,
  missingDocs: [], estimatedRefundCents: null,
};

const messages: { direction: 'IN' | 'OUT'; body: string }[] = [];
const addMessage = jest.fn().mockImplementation(async (m: { direction: 'IN' | 'OUT'; body: string }) => {
  messages.push(m);
  return { id: `m${messages.length}` };
});
const addTask = jest.fn().mockResolvedValue({ id: 't1' });
const updateTask = jest.fn().mockResolvedValue(undefined);
const findOpenTaskForCustomer = jest.fn().mockResolvedValue(null);

jest.mock('@/lib/will/store', () => ({
  getStore: () => ({
    getCustomerByWaId: jest.fn().mockImplementation(async () => ({ ...customer })),
    getCustomerById: jest.fn().mockImplementation(async () => ({ ...customer })),
    createCustomer: jest.fn(),
    addMessage,
    updateCustomer: jest.fn().mockResolvedValue(undefined),
    findOpenTaskForCustomer,
    addTask,
    updateTask,
    cancelJobsFor: jest.fn().mockResolvedValue(undefined),
    audit: jest.fn().mockResolvedValue(undefined),
    getSetting: jest.fn().mockResolvedValue(undefined),
    setSetting: jest.fn().mockResolvedValue(undefined),
    listMessages: jest.fn().mockResolvedValue([]),
    listTemplates: jest.fn().mockResolvedValue([]),
  }),
}));
jest.mock('@/lib/will/knowledge', () => ({ retrieveKnowledge: jest.fn().mockResolvedValue([]) }));
jest.mock('@/lib/will/scheduler', () => ({ reconcileSchedule: jest.fn().mockResolvedValue(undefined), abnAnswersPendingKey: (id: string) => `abn_answers_pending:${id}` }));

const runEngine = jest.fn().mockResolvedValue({
  kind: 'silent',
  guardViolations: ['AI_PAUSED_FOR_CUSTOMER'],
  decision: { action: 'wait', confidence: 1 },
});
jest.mock('@/lib/will/engine', () => ({ runEngine: (...a: unknown[]) => runEngine(...a) }));

import { handleIncoming } from '@/lib/will/service';

beforeEach(() => {
  messages.length = 0;
  runEngine.mockClear();
  addTask.mockClear();
  updateTask.mockClear();
  findOpenTaskForCustomer.mockClear();
  findOpenTaskForCustomer.mockResolvedValue(null);
});

it('a paused customer writing in gets no reply from Will, but a task opens', async () => {
  const { outcome } = await handleIncoming('61400000001', 'Hey, any update?', 'SUPERVISED');

  expect(outcome.kind).toBe('silent');
  // The message is stored like any other inbound message.
  expect(messages).toHaveLength(1);
  expect(messages[0]).toMatchObject({ direction: 'IN', body: 'Hey, any update?' });
  // A task opens for Jo — this is the one thing that used to be missing.
  expect(addTask).toHaveBeenCalledTimes(1);
  const task = addTask.mock.calls[0][0];
  expect(task.customerId).toBe('c1');
  expect(task.reason).toMatch(/wrote in while Will is switched off/i);
  expect(task.suggestedReply).toBeNull();
});

it('a second message while still paused folds into the same open task instead of opening a new one', async () => {
  findOpenTaskForCustomer.mockResolvedValue({ id: 't1', context: 'Hey, any update?' });
  await handleIncoming('61400000001', 'Hello? anyone there', 'SUPERVISED');

  expect(addTask).not.toHaveBeenCalled();
  expect(updateTask).toHaveBeenCalledTimes(1);
  expect(updateTask.mock.calls[0][0]).toBe('t1');
});

it('the Decision Log classifier recognises the new reason (never falls through to "add it to the Library")', async () => {
  const { explainHandoffReason, isTemplateShaped } = await import('@/lib/will/handoff-reasons');
  await handleIncoming('61400000001', 'Hey, any update?', 'SUPERVISED');
  const reason = addTask.mock.calls[0][0].reason as string;
  const e = explainHandoffReason(reason);
  expect(e.kind).not.toBe('other');
  expect(isTemplateShaped(reason)).toBe(false);
});
