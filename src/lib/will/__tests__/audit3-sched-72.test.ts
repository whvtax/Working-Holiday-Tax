/**
 * audit3 sched 72 (5 Sep): when runAutoReplyTimer's decision throws (store or
 * network, not the model), the URGENT task it raises used to carry
 * context: null. The Decision Log skips "What arrived" for an empty context,
 * so the card showed nothing the customer wrote and only the exception text,
 * quoted as if it were Will's own words. The task now carries what the
 * customer wrote since the timer's anchor, with the error appended after a
 * "Reviewer:" line (the same shape service.ts uses for a second pair of eyes)
 * instead of being the only content of the card.
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
  listMessages: jest.fn(),
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
  // Real burstText: the fix imports it the same way runDeferredAutoReply
  // itself does, so the reconstructed burst is the same shape either would use.
  burstText: jest.requireActual('@/lib/will/service').burstText,
}));

import { processDueJobs } from '@/lib/will/scheduler';

const CUSTOMER = {
  id: 'c1', waId: '61400000001', name: 'Alex', state: 'QUALIFIED', paid: false,
  aiPaused: false, isLegacy: false, optedOut: false, lang: null,
  lastCustomerMsgAt: '2026-09-03T10:00:40.000Z', estimatedRefundCents: null,
};

const TIMER = {
  id: 'j1', customerId: 'c1', kind: 'AUTO_REPLY' as const,
  payload: { debounce: true, anchorAt: '2026-09-03T10:00:00.000Z' },
  runAt: new Date(Date.now() - 1000).toISOString(), status: 'SCHEDULED' as const,
  createdAt: '2026-09-03T10:00:00.000Z',
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
  store.listMessages.mockResolvedValue([
    { id: 'm1', direction: 'OUT', status: 'SENT', body: 'Sure, one sec', createdAt: '2026-09-03T09:59:00.000Z' },
    { id: 'm2', direction: 'IN', status: 'SENT', body: 'is the ABN required', createdAt: '2026-09-03T10:00:10.000Z' },
    { id: 'm3', direction: 'IN', status: 'SENT', body: 'also how long does it take', createdAt: '2026-09-03T10:00:30.000Z' },
  ]);
});

it('carries what the customer wrote into the task context, error after a Reviewer line', async () => {
  runDeferredAutoReply.mockRejectedValue(new Error('supabase unreachable'));
  await processDueJobs();
  expect(store.addTask).toHaveBeenCalledTimes(1);
  const task = store.addTask.mock.calls[0][0];
  expect(task.severity).toBe('URGENT');
  // Reason text is untouched (owner's rule: wording does not change).
  expect(task.reason).toBe('Will could not answer this chat automatically (supabase unreachable). Please reply by hand.');
  expect(task.context).toContain('is the ABN required');
  expect(task.context).toContain('also how long does it take');
  expect(task.context).toMatch(/\n\nReviewer: supabase unreachable$/);
  // The outbound message before the burst is not the customer's own words.
  expect(task.context).not.toContain('Sure, one sec');
});

it('still raises the task (context null) when the store itself is the failure reading the burst', async () => {
  runDeferredAutoReply.mockRejectedValue(new Error('boom'));
  store.listMessages.mockRejectedValue(new Error('store down'));
  await processDueJobs();
  expect(store.addTask).toHaveBeenCalledTimes(1);
  const task = store.addTask.mock.calls[0][0];
  expect(task.context).toBeNull();
  expect(task.reason).toMatch(/could not answer this chat automatically/);
});
