/**
 * The scheduler side of the Autopilot two-minute timer (Jo, 3 Sep).
 *
 * An AUTO_REPLY job carrying `debounce` has no reply attached: when it is due,
 * the loop hands the customer to the service (runDeferredAutoReply), which
 * reads the whole burst and answers once. Pinned here: the hand-off happens,
 * the job ends DONE (or CANCELLED when a newer message took over), an opted-out
 * customer never reaches the service, and a crash inside the decision becomes
 * an URGENT task instead of a silent FAILED row. The older messageId shape is
 * still handled by its own branch, so a reply queued before the deploy goes out.
 */
const store = {
  reclaimStaleJobs: jest.fn(),
  getSetting: jest.fn(),
  dueJobs: jest.fn(),
  claimJob: jest.fn(),
  getCustomerById: jest.fn(),
  setJobStatus: jest.fn(),
  getJob: jest.fn(),
  addTask: jest.fn(),
  audit: jest.fn(),
  getMessageById: jest.fn(),
  setMessageStatus: jest.fn(),
};
jest.mock('@/lib/will/store', () => ({ getStore: () => store }));
jest.mock('@/lib/will/channel', () => ({
  deliverOut: jest.fn().mockResolvedValue({ ok: true }),
  sendWhatsAppText: jest.fn().mockResolvedValue({ ok: true }),
}));
jest.mock('@/lib/will/config', () => ({
  ...jest.requireActual('@/lib/will/config'),
  withinQuietHours: () => true,
}));

const runDeferredAutoReply = jest.fn();
jest.mock('@/lib/will/service', () => ({
  runDeferredAutoReply: (...a: unknown[]) => runDeferredAutoReply(...a),
}));

import { processDueJobs } from '@/lib/will/scheduler';

const CUSTOMER = {
  id: 'c1', waId: '61400000001', name: 'Alex', state: 'QUALIFIED', paid: false,
  aiPaused: false, isLegacy: false, optedOut: false, lang: null,
  lastCustomerMsgAt: '2026-09-03T10:00:40.000Z', estimatedRefundCents: null,
};

const TIMER = {
  id: 'j1', customerId: 'c1', kind: 'AUTO_REPLY' as const,
  payload: { debounce: true, anchorAt: '2026-09-03T10:00:40.000Z' },
  runAt: new Date(Date.now() - 1000).toISOString(), status: 'SCHEDULED' as const,
  createdAt: '2026-09-03T10:00:40.000Z',
};

beforeEach(() => {
  for (const fn of Object.values(store)) (fn as jest.Mock).mockReset();
  runDeferredAutoReply.mockReset();
  store.reclaimStaleJobs.mockResolvedValue(0);
  store.getSetting.mockImplementation(async (k: string) => (k === 'ai_mode' ? 'FULL_AUTO' : false));
  store.dueJobs.mockResolvedValue([TIMER]);
  store.claimJob.mockResolvedValue(true);
  store.getCustomerById.mockResolvedValue(CUSTOMER);
  store.setJobStatus.mockResolvedValue(undefined);
  store.addTask.mockResolvedValue({ id: 't1' });
  store.audit.mockResolvedValue(undefined);
  store.getJob.mockResolvedValue(null);
});

it('hands the due timer to the service and ends the job DONE when it sent', async () => {
  runDeferredAutoReply.mockResolvedValue('sent');
  const r = await processDueJobs();
  expect(runDeferredAutoReply).toHaveBeenCalledTimes(1);
  expect(runDeferredAutoReply.mock.calls[0][0].id).toBe('c1');
  expect(runDeferredAutoReply.mock.calls[0][1].payload.anchorAt).toBe('2026-09-03T10:00:40.000Z');
  expect(store.setJobStatus).toHaveBeenCalledWith('j1', 'DONE');
  expect(r.sent).toEqual(['Alex · autopilot reply']);
});

it('ends CANCELLED when a newer message took the answer over', async () => {
  runDeferredAutoReply.mockResolvedValue('superseded');
  await processDueJobs();
  expect(store.setJobStatus).toHaveBeenCalledWith('j1', 'CANCELLED');
});

it('never reaches the service for a customer who opted out', async () => {
  store.getCustomerById.mockResolvedValue({ ...CUSTOMER, optedOut: true });
  await processDueJobs();
  expect(runDeferredAutoReply).not.toHaveBeenCalled();
  expect(store.setJobStatus).toHaveBeenCalledWith('j1', 'CANCELLED');
});

it('a crash inside the decision becomes an URGENT task, not silence', async () => {
  runDeferredAutoReply.mockRejectedValue(new Error('supabase unreachable'));
  await processDueJobs();
  expect(store.addTask).toHaveBeenCalledTimes(1);
  const task = store.addTask.mock.calls[0][0];
  expect(task.severity).toBe('URGENT');
  expect(task.reason).toMatch(/could not answer this chat automatically/);
  expect(task.reason).toMatch(/supabase unreachable/);
  expect(store.setJobStatus).toHaveBeenCalledWith('j1', 'FAILED');
});

it('an older messageId job still takes the queued-message branch', async () => {
  store.dueJobs.mockResolvedValue([{ ...TIMER, id: 'j2', payload: { messageId: 'm9' } }]);
  store.getMessageById.mockResolvedValue(null); // already dealt with
  await processDueJobs();
  expect(runDeferredAutoReply).not.toHaveBeenCalled();
  expect(store.setJobStatus).toHaveBeenCalledWith('j2', 'DONE');
});
