/**
 * Audit 3, lane sched, finding 76 (5 Sep): the Library is read from the
 * database once per TICK for the follow-up jobs (audit3 sched 6), but
 * FORM_RECEIVED, MEDICARE_INFO, REVIEW_REQUEST, HANDOFF_ACK and the legacy
 * AUTO_REPLY branch each still called store.listTemplates() themselves, so a
 * batch mixing those kinds still paid for the whole Library table over and
 * over inside one 45s tick. Pinned here: however many of these jobs are due
 * in the same tick, store.listTemplates() is called at most once, and every
 * job still sends the same text as before.
 */
const store = {
  reclaimStaleJobs: jest.fn(),
  getSetting: jest.fn(),
  setSetting: jest.fn(),
  dueJobs: jest.fn(),
  claimJob: jest.fn(),
  getCustomerById: jest.fn(),
  setJobStatus: jest.fn(),
  getJob: jest.fn(),
  addJob: jest.fn(),
  addTask: jest.fn(),
  addMessage: jest.fn(),
  audit: jest.fn(),
  listTemplates: jest.fn(),
  setState: jest.fn(),
  updateCustomer: jest.fn(),
  cancelJobsFor: jest.fn(),
  getMessageById: jest.fn(),
  findOpenTaskForCustomer: jest.fn(),
  listMessages: jest.fn(),
};
jest.mock('@/lib/will/store', () => ({ getStore: () => store }));

const deliverOut = jest.fn(async (..._args: unknown[]) => ({ ok: true }));
jest.mock('@/lib/will/channel', () => ({
  deliverOut: (...a: unknown[]) => (deliverOut as unknown as (...x: unknown[]) => unknown)(...a),
  sendWhatsAppText: jest.fn().mockResolvedValue({ ok: true }),
}));
jest.mock('@/lib/will/service', () => ({ runDeferredAutoReply: jest.fn() }));

import { processDueJobs } from '@/lib/will/scheduler';
import { formReceivedTemplateKey, medicareTemplateKey, reviewRequestTemplateKey, handoffHoldingTemplateKey } from '@/lib/will/i18n';

const customer = (over: Record<string, unknown> = {}) => ({
  id: 'c1', waId: '61400000001', name: 'Ana', state: 'FORM_PENDING', paid: true,
  aiPaused: false, isLegacy: false, optedOut: false, lang: null, income: 'TFN',
  lastCustomerMsgAt: '2026-09-05T08:55:00.000Z', estimatedRefundCents: null,
  ...over,
});

beforeEach(() => {
  for (const fn of Object.values(store)) (fn as jest.Mock).mockReset();
  deliverOut.mockClear();
  jest.useFakeTimers().setSystemTime(new Date('2026-09-05T09:00:00.000Z'));
  store.reclaimStaleJobs.mockResolvedValue(0);
  store.getSetting.mockImplementation(async (k: string) => (k === 'ai_mode' ? 'FULL_AUTO' : false));
  store.claimJob.mockResolvedValue(true);
  store.setJobStatus.mockResolvedValue(undefined);
  store.addJob.mockResolvedValue({ id: 'new' });
  store.audit.mockResolvedValue(undefined);
  store.setState.mockResolvedValue(true);
  store.findOpenTaskForCustomer.mockResolvedValue(null);
  store.listMessages.mockResolvedValue([]);
  store.listTemplates.mockResolvedValue([
    { key: formReceivedTemplateKey(null), title: 'Form received', body: 'Got your form, thanks.' },
    { key: medicareTemplateKey(null), title: 'Medicare', body: 'Medicare exemption info.' },
    { key: reviewRequestTemplateKey(null), title: 'Review request', body: 'Could you leave us a review?' },
    { key: handoffHoldingTemplateKey(null), title: 'Holding', body: 'Hang tight, we are on it.' },
  ]);
  store.getCustomerById.mockResolvedValue(customer());
});
afterEach(() => jest.useRealTimers());

it('reads the Library once per tick across a mixed batch, not once per job', async () => {
  store.dueJobs.mockResolvedValue([
    { id: 'j1', customerId: 'c1', kind: 'FORM_RECEIVED', payload: {}, runAt: '2026-09-05T09:00:00.000Z', status: 'SCHEDULED', createdAt: '2026-09-05T09:00:00.000Z' },
    { id: 'j2', customerId: 'c2', kind: 'MEDICARE_INFO', payload: { attempt: 0 }, runAt: '2026-09-05T09:00:00.000Z', status: 'SCHEDULED', createdAt: '2026-09-05T09:00:00.000Z' },
    {
      id: 'j3', customerId: 'c3', kind: 'REVIEW_REQUEST', payload: {},
      runAt: '2026-09-05T09:00:00.000Z', status: 'SCHEDULED', createdAt: '2026-09-05T09:00:00.000Z',
    },
    { id: 'j4', customerId: 'c4', kind: 'HANDOFF_ACK', payload: {}, runAt: '2026-09-05T09:00:10.000Z', status: 'SCHEDULED', createdAt: '2026-09-05T08:30:00.000Z' },
  ]);
  // Each job's own customer, in the state that branch actually acts on.
  store.getCustomerById.mockImplementation(async (id: string) => {
    if (id === 'c3') return customer({ id: 'c3', state: 'LODGED' });
    return customer({ id });
  });
  store.findOpenTaskForCustomer.mockResolvedValue({ id: 'task1' });

  await processDueJobs();

  expect(store.listTemplates).toHaveBeenCalledTimes(1);
  // Same wording as before: each Library body was used, not the code fallback.
  const bodies = deliverOut.mock.calls.map((c) => c[1]);
  expect(bodies).toEqual(expect.arrayContaining([
    'Got your form, thanks.',
    'Medicare exemption info.',
    'Could you leave us a review?',
    'Hang tight, we are on it.',
  ]));
});
