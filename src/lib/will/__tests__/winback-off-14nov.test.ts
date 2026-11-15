/** Jo, 14 Nov: the automatic win-back is off completely. */
const store = {
  reclaimStaleJobs: jest.fn().mockResolvedValue(0), getSetting: jest.fn().mockResolvedValue(null), setSetting: jest.fn().mockResolvedValue(undefined),
  dueJobs: jest.fn(), claimJob: jest.fn().mockResolvedValue(true), setJobStatus: jest.fn(), audit: jest.fn().mockResolvedValue(undefined),
  addJob: jest.fn(), hasScheduledJobOfKind: jest.fn().mockResolvedValue(false), getCustomerById: jest.fn(),
};
jest.mock('@/lib/will/store', () => ({ getStore: () => store }));
const runWinbackPass = jest.fn();
jest.mock('@/lib/will/winback-auto', () => ({ runWinbackPass: (...a: unknown[]) => runWinbackPass(...a) }));
jest.mock('@/lib/will/channel', () => ({ deliverOut: jest.fn(), sendWhatsAppText: jest.fn(), wasAlreadySentVerbatim: jest.fn(), templateApprovedFor: jest.fn() }));
jest.mock('@/lib/will/service', () => ({ runDeferredAutoReply: jest.fn() }));
import { processDueJobs, ensureWinbackSoon, WINBACK_ENABLED } from '@/lib/will/scheduler';

it('is off', () => expect(WINBACK_ENABLED).toBe(false));

it('nothing is armed', async () => {
  await ensureWinbackSoon();
  expect(store.addJob).not.toHaveBeenCalled();
});

it('a pass already queued ends without running', async () => {
  store.dueJobs.mockResolvedValue([{ id: 'w1', customerId: null, kind: 'WINBACK', payload: {}, runAt: new Date().toISOString(), status: 'SCHEDULED', createdAt: new Date().toISOString() }]);
  await processDueJobs();
  expect(runWinbackPass).not.toHaveBeenCalled();
  expect(store.setJobStatus).toHaveBeenCalledWith('w1', 'DONE');
  expect(store.addJob).not.toHaveBeenCalled();
});
