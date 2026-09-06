/**
 * audit3 sched-30: after "Send for Signature", the signature nudges stay on the
 * notice clock (24h / 3d / 7d from the notice) through every later reconcile.
 *
 * Before: restartSignatureCadenceFromNotice armed nudge 1 at 24h, and the very
 * next reconcileSchedule (the customer's "great, thanks") cancelled it and
 * re-armed from schedulerConfig().signature, which carries the Done path's
 * three-day prep offset: nudge 1 landed four days after the reply. A second
 * press also hard-coded seq 0 and re-sent nudge 1 after it had already gone.
 *
 * The numbers themselves are untouched: 24h / 3d / 7d after the notice,
 * prep offset + 1d / 3d / 7d after Done.
 */
const store = {
  cancelJobsFor: jest.fn().mockResolvedValue(0),
  listJobsForCustomer: jest.fn().mockResolvedValue([]),
  history: jest.fn().mockResolvedValue([]),
  addJob: jest.fn().mockResolvedValue({ id: 'j1' }),
  audit: jest.fn().mockResolvedValue(undefined),
  getSetting: jest.fn().mockResolvedValue(undefined),
  setSetting: jest.fn().mockResolvedValue(undefined),
  getCustomerById: jest.fn(),
};
jest.mock('@/lib/will/store', () => ({ getStore: () => store }));

import { reconcileSchedule, restartSignatureCadenceFromNotice, signatureNoticeSentKey } from '@/lib/will/scheduler';
import { schedulerConfig, SIGNATURE_AFTER_NOTICE } from '@/lib/will/config';
import type { CustomerRow } from '@/lib/will/store';

const customer = {
  id: 'c1', waId: '61400000001', name: 'Alex', state: 'SIGNATURE_PENDING', paid: true,
  optedOut: false, aiPaused: false, isLegacy: false, lang: null, estimatedRefundCents: null, lastCustomerMsgAt: null,
} as unknown as CustomerRow;

const settings: Record<string, unknown> = {};
const armedDelaySec = () => {
  const job = store.addJob.mock.calls.map((c) => c[0]).find((j) => j.kind === 'FOLLOW_UP');
  return Math.round((new Date(job.runAt).getTime() - Date.now()) / 1000);
};

beforeEach(() => {
  for (const fn of Object.values(store)) (fn as jest.Mock).mockClear();
  for (const k of Object.keys(settings)) delete settings[k];
  store.getSetting.mockImplementation(async (k: string) => settings[k]);
  store.setSetting.mockImplementation(async (k: string, v: unknown) => { settings[k] = v; });
  store.listJobsForCustomer.mockResolvedValue([]);
  store.history.mockResolvedValue([]);
  store.getCustomerById.mockResolvedValue(customer);
});

describe('signature cadence clocks', () => {
  it('Done path (no notice): nudge 1 uses the prep offset, exactly as before', async () => {
    await reconcileSchedule(customer);
    expect(armedDelaySec()).toBe(schedulerConfig().signature[0]);
    expect(store.addJob.mock.calls[0][0].payload).toMatchObject({ flow: 'signature', seq: 0 });
  });

  it('Send for Signature arms nudge 1 at 24h from the notice and records the notice', async () => {
    await restartSignatureCadenceFromNotice('c1');
    expect(store.cancelJobsFor).toHaveBeenCalledWith('c1', ['FOLLOW_UP', 'AUTO_CLOSE']);
    expect(typeof settings[signatureNoticeSentKey('c1')]).toBe('string');
    expect(armedDelaySec()).toBe(SIGNATURE_AFTER_NOTICE[0]);
  });

  it('the customer replying after the notice keeps the notice clock (the finding)', async () => {
    await restartSignatureCadenceFromNotice('c1');
    store.addJob.mockClear();
    await reconcileSchedule(customer); // the inbound "great, thanks"
    expect(armedDelaySec()).toBe(SIGNATURE_AFTER_NOTICE[0]);
    expect(armedDelaySec()).not.toBe(schedulerConfig().signature[0]);
  });

  it('after nudge 1 has gone, a reply or a second press resumes at nudge 2 on the notice clock', async () => {
    await restartSignatureCadenceFromNotice('c1');
    store.listJobsForCustomer.mockResolvedValue([
      { id: 'j1', status: 'DONE', payload: { flow: 'signature', seq: 0 }, createdAt: new Date().toISOString() },
    ]);
    store.addJob.mockClear();
    await reconcileSchedule(customer);
    expect(store.addJob.mock.calls[0][0].payload).toMatchObject({ flow: 'signature', seq: 1 });
    expect(armedDelaySec()).toBe(SIGNATURE_AFTER_NOTICE[1]);

    store.addJob.mockClear();
    await restartSignatureCadenceFromNotice('c1'); // second press: no re-send of nudge 1
    expect(store.addJob.mock.calls[0][0].payload).toMatchObject({ flow: 'signature', seq: 1 });
  });

  it('a customer who comes back into Signature via Done after an old notice is on the prep clock again', async () => {
    settings[signatureNoticeSentKey('c1')] = new Date(Date.now() - 30 * 86400_000).toISOString();
    store.history.mockResolvedValue([
      { customerId: 'c1', from: 'FINAL_REVIEW', to: 'SIGNATURE_PENDING', causedBy: 'HUMAN', createdAt: new Date(Date.now() - 60_000).toISOString() },
    ]);
    await reconcileSchedule(customer);
    expect(armedDelaySec()).toBe(schedulerConfig().signature[0]);
  });

  it('the notice never arms anything for a customer whose follow-ups are switched off', async () => {
    settings['followups_off:c1'] = true;
    await restartSignatureCadenceFromNotice('c1');
    expect(store.addJob).not.toHaveBeenCalled();
  });
});
