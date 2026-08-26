/**
 * Owner's rule: more than 3 messages from a customer before they pay means
 * a person should take over — even in FULL_AUTO mode. This is checked before
 * the engine ever runs, so a 4th automated reply is never drafted, let alone
 * sent, regardless of what ai_mode is set to.
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

it('the 4th message before payment stops and opens a task, even in FULL_AUTO', async () => {
  await handleIncoming('61400000001', 'question one', 'FULL_AUTO');
  await handleIncoming('61400000001', 'question two', 'FULL_AUTO');
  await handleIncoming('61400000001', 'question three', 'FULL_AUTO');
  expect(runEngine).toHaveBeenCalledTimes(3); // first 3 go through normally

  const result = await handleIncoming('61400000001', 'question four', 'FULL_AUTO');

  expect(runEngine).toHaveBeenCalledTimes(3); // the engine is NOT called a 4th time
  expect(result.outcome.kind).toBe('human_task');
  expect(updateCustomer).toHaveBeenCalledWith('c1', { aiPaused: true });
  expect(addTask).toHaveBeenCalledTimes(1);
  expect(addTask.mock.calls[0][0].reason).toMatch(/4 messages before paying/);
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
  await handleIncoming('61400000001', 'q1', 'SUPERVISED');
  await handleIncoming('61400000001', 'q2', 'SUPERVISED');
  await handleIncoming('61400000001', 'q3', 'SUPERVISED');
  const result = await handleIncoming('61400000001', 'q4', 'SUPERVISED');
  expect(result.outcome.kind).toBe('human_task');
  expect(addTask).toHaveBeenCalledTimes(1);
});
