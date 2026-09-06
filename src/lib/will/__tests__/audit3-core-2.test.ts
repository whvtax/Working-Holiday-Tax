/**
 * audit3 unverified[2], 5 Sep: raiseOrUpdateTask folded a second event into an
 * open task by overwriting reason, severity AND suggestedReply with whatever
 * the latest caller passed. Severity/reason folding was fixed earlier (see
 * inbound-note.test.ts, "does not downgrade"); this pins the suggestedReply
 * half: a caller with nothing new to suggest (a bare `null`) must not wipe a
 * draft the open task already had. The one caller that MUST always wipe it
 * ("are you a bot?" — a draft may never exist for that question, by owner
 * rule) sets forceNullSuggestedReply and keeps wiping.
 */
const findOpenTaskForCustomer = jest.fn().mockResolvedValue(null);
const addTask = jest.fn().mockResolvedValue({ id: 't1' });
const updateTask = jest.fn().mockResolvedValue(undefined);
const customer = { id: 'c1', waId: '61400000001', name: 'Alex', paid: false, state: 'PRICE_SENT', aiPaused: false, lang: null, botOwned: true };

jest.mock('@/lib/will/store', () => ({
  getStore: () => ({
    getCustomerByWaId: jest.fn().mockImplementation(async () => ({ ...customer })),
    getCustomerById: jest.fn().mockImplementation(async () => ({ ...customer })),
    createCustomer: jest.fn(),
    addMessage: jest.fn().mockResolvedValue({ id: 'm1' }),
    updateCustomer: jest.fn().mockResolvedValue(undefined),
    findOpenTaskForCustomer, addTask, updateTask,
    cancelJobsFor: jest.fn().mockResolvedValue(undefined),
    audit: jest.fn().mockResolvedValue(undefined),
    getSetting: jest.fn().mockResolvedValue(undefined),
    setSetting: jest.fn().mockResolvedValue(undefined),
    addJob: jest.fn().mockResolvedValue({ id: 'j1' }),
    listMessages: jest.fn().mockResolvedValue([]),
  }),
}));
jest.mock('@/lib/will/knowledge', () => ({ retrieveKnowledge: jest.fn().mockResolvedValue([]) }));
jest.mock('@/lib/will/scheduler', () => ({ reconcileSchedule: jest.fn().mockResolvedValue(undefined) }));
const runEngine = jest.fn();
jest.mock('@/lib/will/engine', () => ({ runEngine: (...a: unknown[]) => runEngine(...a) }));

import { handleIncoming } from '@/lib/will/service';

beforeEach(() => {
  findOpenTaskForCustomer.mockClear(); findOpenTaskForCustomer.mockResolvedValue(null);
  addTask.mockClear(); updateTask.mockClear(); runEngine.mockClear();
});

it('a human_task with no suggestedReply of its own does not wipe an existing draft', async () => {
  findOpenTaskForCustomer.mockResolvedValue({
    id: 'existing-task',
    context: 'earlier context',
    reason: 'Customer asked something the model could not answer confidently',
    severity: 'REVIEW',
    suggestedReply: 'Yes, that is covered, no problem at all',
  });
  runEngine.mockResolvedValue({
    kind: 'human_task',
    decision: { action: 'human_task', confidence: 1 },
    task: { reason: 'A different thing came up', severity: 'REVIEW' }, // no suggestedReply field
  });
  await handleIncoming('61400000001', 'something else entirely', 'SUPERVISED');
  expect(updateTask).toHaveBeenCalledTimes(1);
  const [id, patch] = updateTask.mock.calls[0];
  expect(id).toBe('existing-task');
  // The existing draft survives: this caller had nothing new to suggest, it
  // did not mean to blank the field.
  expect(patch.suggestedReply).toBe('Yes, that is covered, no problem at all');
});

it('"are you a bot" always wipes the draft, even folding into a task that had one', async () => {
  findOpenTaskForCustomer.mockResolvedValue({
    id: 'existing-task',
    context: 'earlier context',
    reason: 'Some other reason',
    severity: 'REVIEW',
    suggestedReply: 'A usable draft',
  });
  await handleIncoming('61400000001', 'am I talking to a bot?', 'SUPERVISED');
  expect(updateTask).toHaveBeenCalledTimes(1);
  const [id, patch] = updateTask.mock.calls[0];
  expect(id).toBe('existing-task');
  expect(patch.suggestedReply).toBeNull();
});
