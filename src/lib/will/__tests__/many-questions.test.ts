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

const addJob = jest.fn().mockResolvedValue({ id: 'j1' });
jest.mock('@/lib/will/store', () => ({
  getStore: () => ({
    getCustomerByWaId: jest.fn().mockImplementation(async () => ({ ...customer })),
    getCustomerById: jest.fn().mockImplementation(async () => ({ ...customer })),
    createCustomer: jest.fn(),
    addMessage, updateCustomer, findOpenTaskForCustomer, addTask, updateTask,
    cancelJobsFor, audit, getSetting, setSetting, addJob,
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
  runEngine.mockClear(); addJob.mockClear();
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
    await handleIncoming('61400000001', t, 'SUPERVISED');
  }
  expect(runEngine).toHaveBeenCalledTimes(6); // every one reached the engine
  expect(addTask).not.toHaveBeenCalled();
  expect(updateCustomer).not.toHaveBeenCalledWith('c1', { aiPaused: true });
});

it('on Autopilot the same exchange arms the two-minute timer instead of deciding now', async () => {
  // Jo, 3 Sep: wait first, then read everything, then answer once. So the
  // engine is NOT called when the message lands; a timer is (re)armed each
  // time, the previous one cancelled, and the decision runs when it fires.
  for (const t of ['hi', 'I have a question', 'about my tax return']) {
    // eslint-disable-next-line no-await-in-loop
    const r = await handleIncoming('61400000001', t, 'FULL_AUTO');
    expect(r.outcome.kind).toBe('deferred');
  }
  expect(runEngine).not.toHaveBeenCalled();
  expect(addJob).toHaveBeenCalledTimes(3);
  expect(cancelJobsFor).toHaveBeenCalledWith('c1', ['AUTO_REPLY']);
  const job = addJob.mock.calls[2][0];
  expect(job.kind).toBe('AUTO_REPLY');
  expect(job.payload.debounce).toBe(true);
  expect(new Date(job.runAt).getTime()).toBeGreaterThan(Date.now() + 100 * 1000);
  expect(addTask).not.toHaveBeenCalled();
});

// Jo, 4 Sep, from the Decision Log: Ami wrote 37 DIFFERENT messages before
// paying, ending with "That's totally fine, thank you for confirming!", and the
// count alone called that stuck and handed her to a person. The customer who
// came not intending to pay asks exactly like that, and staying patient with
// her is the job. So volume is no longer the signal; a repeating line is.
it('a long, engaged conversation before payment is never stopped', async () => {
  for (let i = 0; i < 40; i++) {
    // eslint-disable-next-line no-await-in-loop
    await handleIncoming('61400000001', `a different question number ${i + 1}`, 'SUPERVISED');
  }
  expect(runEngine).toHaveBeenCalledTimes(40);
  expect(addTask).not.toHaveBeenCalled();
});

it('the SAME message arriving over and over is stopped and named, without pausing Will', async () => {
  // Five of the last six identical: an automated sender or a stuck loop.
  for (let i = 0; i < 5; i++) {
    // eslint-disable-next-line no-await-in-loop
    await handleIncoming('61400000001', 'hello?', 'SUPERVISED');
  }
  addJob.mockClear();
  const before = (runEngine as jest.Mock).mock.calls.length;
  const result = await handleIncoming('61400000001', 'hello?', 'FULL_AUTO');

  expect(runEngine).toHaveBeenCalledTimes(before); // the engine is NOT called again
  expect(addJob).not.toHaveBeenCalled();           // and no timer is armed either
  expect(result.outcome.kind).toBe('human_task');
  expect(updateCustomer).not.toHaveBeenCalledWith('c1', { aiPaused: true });
  // In production raiseOrUpdateTask folds these into the ONE open task per
  // customer; here the store is a mock, so only the wording is asserted.
  expect(addTask).toHaveBeenCalled();
  expect(addTask.mock.calls[addTask.mock.calls.length - 1][0].reason).toMatch(/looping/i);
});

it('a paid customer is never stopped by this rule, however many messages', async () => {
  Object.assign(customer, { paid: true, state: 'PAID' });
  for (const t of ['a', 'b', 'c', 'd', 'e']) {
    // eslint-disable-next-line no-await-in-loop
    await handleIncoming('61400000001', t, 'SUPERVISED');
  }
  expect(runEngine).toHaveBeenCalledTimes(5);
  expect(addTask).not.toHaveBeenCalled();
});

it('applies in SUPERVISED mode too, not just FULL_AUTO', async () => {
  for (let i = 0; i < 6; i++) {
    // eslint-disable-next-line no-await-in-loop
    await handleIncoming('61400000001', 'is anyone there', 'SUPERVISED');
  }
  expect(addTask).toHaveBeenCalled();
});
