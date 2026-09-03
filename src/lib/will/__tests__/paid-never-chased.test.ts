/**
 * A paid customer is never chased with the sales cadence (spec §5, audit 3 Sep).
 *
 * The one way a paid customer lands in a sales stage is the owner's force move
 * from the stage badge. That move is deliberate and stays allowed; what must
 * not follow it is fu_pre_24h ("still want us to take a look at your tax
 * situation?") going to somebody who has paid, then the 7-day "last message
 * from me", then an auto-close to Went Cold. Pinned in both places the cadence
 * can start: reconcileSchedule (arming) and the FOLLOW_UP job (firing).
 */
const store = {
  cancelJobsFor: jest.fn().mockResolvedValue(0),
  listJobsForCustomer: jest.fn().mockResolvedValue([]),
  history: jest.fn().mockResolvedValue([]),
  addJob: jest.fn().mockResolvedValue({ id: 'j1' }),
  audit: jest.fn().mockResolvedValue(undefined),
  getSetting: jest.fn().mockResolvedValue(undefined),
  setSetting: jest.fn().mockResolvedValue(undefined),
  reclaimStaleJobs: jest.fn().mockResolvedValue(0),
  dueJobs: jest.fn().mockResolvedValue([]),
  claimJob: jest.fn().mockResolvedValue(true),
  getCustomerById: jest.fn(),
  setJobStatus: jest.fn().mockResolvedValue(undefined),
  listTemplates: jest.fn().mockResolvedValue([]),
  getJob: jest.fn().mockResolvedValue(null),
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

import { reconcileSchedule, processDueJobs } from '@/lib/will/scheduler';
import type { CustomerRow } from '@/lib/will/store';

const base = {
  id: 'c1', waId: '61400000001', name: 'Alex', optedOut: false, aiPaused: false, isLegacy: false,
  lang: null, estimatedRefundCents: null, lastCustomerMsgAt: null,
} as unknown as CustomerRow;

beforeEach(() => {
  for (const fn of Object.values(store)) (fn as jest.Mock).mockClear();
  store.listJobsForCustomer.mockResolvedValue([]);
  store.getSetting.mockImplementation(async (k: string) => (k === 'ai_mode' ? 'FULL_AUTO' : false));
});

describe('arming', () => {
  it('an unpaid lead in a sales stage gets the pre-payment cadence', async () => {
    await reconcileSchedule({ ...base, state: 'NEW_LEAD', paid: false } as CustomerRow);
    expect(store.addJob).toHaveBeenCalledWith(expect.objectContaining({ kind: 'FOLLOW_UP', payload: expect.objectContaining({ flow: 'prePayment' }) }));
  });

  it('a PAID customer force-moved to Lead gets nothing', async () => {
    await reconcileSchedule({ ...base, state: 'NEW_LEAD', paid: true } as CustomerRow);
    expect(store.addJob).not.toHaveBeenCalled();
  });

  it('a paid customer still gets the form cadence, which is theirs', async () => {
    await reconcileSchedule({ ...base, state: 'FORM_PENDING', paid: true } as CustomerRow);
    expect(store.addJob).toHaveBeenCalledWith(expect.objectContaining({ payload: expect.objectContaining({ flow: 'form' }) }));
  });
});

describe('firing', () => {
  it('a pre-payment follow-up already armed is cancelled at fire time for a paid customer', async () => {
    store.dueJobs.mockResolvedValue([{
      id: 'j9', customerId: 'c1', kind: 'FOLLOW_UP',
      payload: { templateKey: 'fu_pre_24h', seq: 0, flow: 'prePayment' },
      runAt: new Date(Date.now() - 1000).toISOString(), status: 'SCHEDULED', createdAt: new Date().toISOString(),
    }]);
    store.getCustomerById.mockResolvedValue({ ...base, state: 'PRICE_SENT', paid: true });
    store.listTemplates.mockResolvedValue([{ id: 't', key: 'fu_pre_24h', category: 'x', title: 'x', body: 'Hi {{1}}, still keen?' }]);
    await processDueJobs();
    expect(store.setJobStatus).toHaveBeenCalledWith('j9', 'CANCELLED');
  });
});

// ── A reopened lead starts a fresh cadence (audit, 3 Sep) ───────────────────
describe('a reopened lead', () => {
  const done = (seq: number, createdAt: string) => ({
    id: `d${seq}`, customerId: 'c1', kind: 'FOLLOW_UP', status: 'DONE',
    payload: { templateKey: `fu_pre_${seq}`, seq, flow: 'prePayment' }, runAt: createdAt, createdAt,
  });

  it('is chased from nudge #1 again, not sent straight to auto-close', async () => {
    store.listJobsForCustomer.mockResolvedValue([
      done(0, '2026-08-01T00:00:00.000Z'), done(1, '2026-08-04T00:00:00.000Z'), done(2, '2026-08-11T00:00:00.000Z'),
    ]);
    store.history.mockResolvedValue([
      { customerId: 'c1', from: 'PRICE_SENT', to: 'WENT_COLD', causedBy: 'SYSTEM', createdAt: '2026-08-18T00:00:00.000Z' },
      { customerId: 'c1', from: 'WENT_COLD', to: 'NEW_LEAD', causedBy: 'SYSTEM', createdAt: '2026-09-01T00:00:00.000Z' },
    ]);
    await reconcileSchedule({ ...base, state: 'QUALIFIED', paid: false } as CustomerRow);
    expect(store.addJob).toHaveBeenCalledWith(expect.objectContaining({ kind: 'FOLLOW_UP', payload: expect.objectContaining({ seq: 0 }) }));
  });

  it('a lead who was never closed keeps the high-water mark', async () => {
    store.listJobsForCustomer.mockResolvedValue([done(0, '2026-08-01T00:00:00.000Z'), done(1, '2026-08-04T00:00:00.000Z')]);
    store.history.mockResolvedValue([{ customerId: 'c1', from: 'NEW_LEAD', to: 'PRICE_SENT', causedBy: 'AI', createdAt: '2026-08-01T00:00:00.000Z' }]);
    await reconcileSchedule({ ...base, state: 'PRICE_SENT', paid: false } as CustomerRow);
    expect(store.addJob).toHaveBeenCalledWith(expect.objectContaining({ payload: expect.objectContaining({ seq: 2 }) }));
  });
});
