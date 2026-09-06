/**
 * audit3 / actions / unverified[12], scheduler half: a follow-up step whose
 * template is missing at send time (not just the moment it is deleted) must
 * also leave a trace.
 *
 * route.ts already audits `follow_up_template_deleted` when the owner deletes
 * a follow-up step, and system-report.ts already turns a `scheduler` /
 * `follow_up_template_missing` row into the same warning card (see
 * audit3-actions-u12.test.ts). What was still missing is the scheduler
 * actually writing that row when a FOLLOW_UP job finds no template at send
 * time (a bad Sync from file, a renamed key, not necessarily a delete). H6
 * (skip this step, keep the cadence going) is unchanged; only the missing
 * step is now visible instead of silent.
 */
const store = {
  reclaimStaleJobs: jest.fn(),
  getSetting: jest.fn(),
  dueJobs: jest.fn(),
  claimJob: jest.fn(),
  getCustomerById: jest.fn(),
  setJobStatus: jest.fn(),
  getJob: jest.fn(),
  addJob: jest.fn(),
  addTask: jest.fn(),
  audit: jest.fn(),
  listTemplates: jest.fn(),
  setSetting: jest.fn(),
  getMessageById: jest.fn(),
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

import { processDueJobs } from '@/lib/will/scheduler';
import { faultsFromAudit } from '@/lib/will/system-report';

const customer = (id: string) => ({
  id, waId: `6140000${id}`, name: `Cust ${id}`, state: 'QUALIFIED', paid: false,
  aiPaused: false, isLegacy: false, optedOut: false, lang: null,
  lastCustomerMsgAt: '2026-09-05T08:55:00.000Z', estimatedRefundCents: null,
});
const followUp = (id: string, templateKey: string, runAt: string) => ({
  id: `f${id}`, customerId: id, kind: 'FOLLOW_UP' as const,
  payload: { templateKey, seq: 0, flow: 'prePayment' },
  runAt, status: 'SCHEDULED' as const, createdAt: runAt,
});

beforeEach(() => {
  for (const fn of Object.values(store)) (fn as jest.Mock).mockReset();
  store.reclaimStaleJobs.mockResolvedValue(0);
  store.getSetting.mockImplementation(async (k: string) => (k === 'ai_mode' ? 'FULL_AUTO' : false));
  store.claimJob.mockResolvedValue(true);
  store.getCustomerById.mockImplementation(async (id: string) => customer(id));
  store.setJobStatus.mockResolvedValue(undefined);
  store.addJob.mockResolvedValue({ id: 'new' });
  store.addTask.mockResolvedValue({ id: 't1' });
  store.audit.mockResolvedValue(undefined);
  store.getJob.mockResolvedValue(null);
  // The Library no longer has the key this job asks for.
  store.listTemplates.mockResolvedValue([
    { key: 'fu_pre_3d', title: 'Pre 3d', body: 'Still keen, {{1}}?' },
  ]);
});

it('a FOLLOW_UP job whose template is gone is failed, the cadence still advances, and a fault row is written', async () => {
  store.dueJobs.mockResolvedValue([followUp('a', 'fu_pre_24h', '2026-09-05T09:00:00.000Z')]);
  const r = await processDueJobs();

  // H6 is untouched: the step is skipped, not the whole cadence.
  expect(store.setJobStatus).toHaveBeenCalledWith('fa', 'FAILED');
  expect(store.addJob).toHaveBeenCalledTimes(1);
  expect(store.addJob.mock.calls[0][0].payload).toEqual({ templateKey: 'fu_pre_3d', seq: 1, flow: 'prePayment' });
  expect(r.processed).toBe(1);

  // The new part of the finding: the gap is now recorded.
  const missing = store.audit.mock.calls.find((c) => c[1] === 'follow_up_template_missing');
  expect(missing).toBeDefined();
  expect(missing![0]).toBe('scheduler');
  expect(missing![2]).toMatchObject({ customerId: 'a', templateKey: 'fu_pre_24h' });
  expect(String(missing![2].note)).toContain('fu_pre_24h');

  // And the System card already knows what to do with that row.
  const faults = faultsFromAudit([
    { id: 'r1', actor: missing![0] as string, action: 'follow_up_template_missing', detail: missing![2], at: '2026-09-05T09:00:00.000Z' },
  ]);
  expect(faults).toHaveLength(1);
  expect(faults[0].severity).toBe('warning');
  expect(faults[0].error).toContain('fu_pre_24h');
});
