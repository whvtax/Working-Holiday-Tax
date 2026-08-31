/**
 * The pre-payment message count — now a RUNAWAY GUARD, not a sales rule.
 *
 * WHAT IT USED TO BE. Any 4th inbound message before payment paused Will and
 * handed the chat to a person. It counted every inbound message, including the
 * customer's own answers to Will's qualifying questions ("only TFN", "yes"), so
 * it fired hardest on the conversations that were going BEST and stopped Will
 * one step before he could send the price.
 *
 * JO'S CALL, 27 Aug: before payment the answer to everything is the same
 * answer — yes, of course we can help, it is part of the review. So there is no
 * pre-payment question that needs a person, and when this fired he stepped in
 * to type what Will would have typed anyway.
 *
 * WHAT IT IS NOW. Twenty-five inbound messages before payment. A real sales
 * conversation never comes near that; something looping does. These tests pin
 * both halves: a normal qualifying exchange is NEVER interrupted, and a genuine
 * runaway still stops and still pauses Will.
 */
const messages: { direction: 'IN' | 'OUT'; body: string; status: string }[] = [];
const customer = { id: 'c1', waId: '61400000001', name: 'Alex', paid: false, state: 'PRICE_SENT', aiPaused: false, lang: null, botOwned: true };

const addMessage = jest.fn().mockImplementation(async (m: { direction: 'IN' | 'OUT'; body: string }) => {
  messages.push({ ...m, status: 'SENT' });
  return { id: `m${messages.length}` };
});
const updateCustomer = jest.fn().mockImplementation(async (_id: string, patch: Record<string, unknown>) => {
  Object.assign(customer, patch);
});
const findOpenTaskForCustomer = jest.fn().mockResolvedValue(null);
const addTask = jest.fn().mockResolvedValue({ id: 't1' });
const updateTask = jest.fn().mockResolvedValue(undefined);
const cancelJobsFor = jest.fn().mockResolvedValue(undefined);
const audit = jest.fn().mockResolvedValue(undefined);
const getSetting = jest.fn().mockResolvedValue(undefined);
const setSetting = jest.fn().mockResolvedValue(undefined);

jest.mock('@/lib/will/store', () => ({
  getStore: () => ({
    getCustomerByWaId: jest.fn().mockImplementation(async () => ({ ...customer })),
    createCustomer: jest.fn(),
    addMessage, updateCustomer, findOpenTaskForCustomer, addTask, updateTask,
    cancelJobsFor, audit, getSetting, setSetting,
    listMessages: jest.fn().mockImplementation(async () => messages.map((m, i) => ({ id: `m${i + 1}`, customerId: 'c1', direction: m.direction, author: m.direction === 'IN' ? 'CUSTOMER' : 'AI', status: m.status, body: m.body, createdAt: '2026-08-25T00:00:00.000Z' }))),
  }),
}));
jest.mock('@/lib/will/knowledge', () => ({ retrieveKnowledge: jest.fn().mockResolvedValue([]) }));
jest.mock('@/lib/will/scheduler', () => ({ reconcileSchedule: jest.fn().mockResolvedValue(undefined) }));
const runEngine = jest.fn().mockResolvedValue({ kind: 'silent', decision: { action: 'wait', confidence: 1 } });
jest.mock('@/lib/will/engine', () => ({ runEngine: (...a: unknown[]) => runEngine(...a) }));

import { handleIncoming } from '@/lib/will/service';

beforeEach(() => {
  messages.length = 0;
  Object.assign(customer, { paid: false, state: 'PRICE_SENT', aiPaused: false });
  addMessage.mockClear(); updateCustomer.mockClear(); findOpenTaskForCustomer.mockClear();
  findOpenTaskForCustomer.mockResolvedValue(null);
  addTask.mockClear(); updateTask.mockClear(); cancelJobsFor.mockClear(); audit.mockClear();
  runEngine.mockClear();
});

it('a normal qualifying exchange is never interrupted', async () => {
  // The exact shape that used to break: a question, then two one-word answers
  // to Will's own questions. Under the old rule the 4th of these paused Will.
  for (const t of [
    'Hi, I would like to ask about my Australian tax return.',
    'I am having a problem with the Adjustments section, can you help?',
    'only TFN',
    'yes',
    'ok great',
    'sounds good',
  ]) {
    // eslint-disable-next-line no-await-in-loop
    await handleIncoming('61400000001', t, 'FULL_AUTO');
  }
  expect(runEngine).toHaveBeenCalledTimes(6); // every one reached the engine
  expect(addTask).not.toHaveBeenCalled();
  expect(updateCustomer).not.toHaveBeenCalledWith('c1', { aiPaused: true });
});

it('a genuine runaway still stops and raises a task, but never pauses Will', async () => {
  // Jo, 31 Aug: Will is NEVER auto-paused. A stuck loop still raises a task for a
  // person, but Will is not switched off for the customer.
  for (let i = 0; i < 25; i++) {
    // eslint-disable-next-line no-await-in-loop
    await handleIncoming('61400000001', `message ${i + 1}`, 'FULL_AUTO');
  }
  expect(runEngine).toHaveBeenCalledTimes(25); // 25 is still fine
  expect(addTask).not.toHaveBeenCalled();

  const result = await handleIncoming('61400000001', 'message 26', 'FULL_AUTO');

  expect(runEngine).toHaveBeenCalledTimes(25); // the engine is NOT called again
  expect(result.outcome.kind).toBe('human_task');
  expect(updateCustomer).not.toHaveBeenCalledWith('c1', { aiPaused: true });
  expect(addTask).toHaveBeenCalledTimes(1);
  expect(addTask.mock.calls[0][0].reason).toMatch(/26 messages before paying/);
});

it('a paid customer is never stopped by this rule, however many messages', async () => {
  Object.assign(customer, { paid: true, state: 'PAID' });
  for (const t of ['a', 'b', 'c', 'd', 'e']) {
    // eslint-disable-next-line no-await-in-loop
    await handleIncoming('61400000001', t, 'FULL_AUTO');
  }
  expect(runEngine).toHaveBeenCalledTimes(5);
  expect(addTask).not.toHaveBeenCalled();
});

it('applies in SUPERVISED mode too, not just FULL_AUTO', async () => {
  for (let i = 0; i < 26; i++) {
    // eslint-disable-next-line no-await-in-loop
    await handleIncoming('61400000001', `q${i + 1}`, 'SUPERVISED');
  }
  // The 26th is the one that trips it, in either mode.
  expect(addTask).toHaveBeenCalledTimes(1);
});
