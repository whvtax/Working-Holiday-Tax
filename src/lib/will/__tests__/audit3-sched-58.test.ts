/**
 * audit3 sched-58: a resubmitted questionnaire must not queue a second
 * Medicare message.
 *
 * The customer stays in FORM_PENDING until the next tick, so a resubmit inside
 * that window (retry, "forgot a receipt", double click) used to create two
 * MEDICARE_INFO jobs and the handler sent the exemption message twice.
 * form-link.ts now checks the customer's existing jobs first: any MEDICARE_INFO
 * row, in any status, means skip; a SCHEDULED FORM_RECEIVED means skip that too.
 * A failed lookup falls open and queues exactly as before.
 */
const customer = {
  id: 'c1', waId: '61400000001', name: 'Alex', state: 'FORM_PENDING', paid: true, formComplete: false,
  optedOut: false, aiPaused: false, isLegacy: false, lang: null, income: 'TFN',
};
const store = {
  updateCustomer: jest.fn().mockResolvedValue(undefined),
  audit: jest.fn().mockResolvedValue(undefined),
  addJob: jest.fn().mockResolvedValue({ id: 'j1' }),
  addTask: jest.fn().mockResolvedValue(undefined),
  getCustomerById: jest.fn().mockImplementation(async () => ({ ...customer })),
  setState: jest.fn().mockResolvedValue(true),
  findCustomerByPhone: jest.fn().mockImplementation(async () => ({ ...customer })),
  getSetting: jest.fn().mockResolvedValue(undefined),
  setSetting: jest.fn().mockResolvedValue(undefined),
  listJobsForCustomer: jest.fn().mockResolvedValue([]),
};
jest.mock('@/lib/will/store', () => ({ getStore: () => store }));
import { notifyFormReceived, applyFormReceived } from '@/lib/will/form-link';

beforeEach(() => {
  Object.assign(customer, { state: 'FORM_PENDING' });
  for (const fn of Object.values(store)) (fn as jest.Mock).mockClear();
  store.listJobsForCustomer.mockResolvedValue([]);
});

const jobsOfKind = (kind: string) => store.addJob.mock.calls
  .map((c) => c[0] as { kind: string })
  .filter((j) => j.kind === kind);

it('first submission queues FORM_RECEIVED and MEDICARE_INFO, as before', async () => {
  await notifyFormReceived('61400000001', 'a@b.c', 'tax-return', 'No');
  expect(store.listJobsForCustomer).toHaveBeenCalledWith('c1', ['FORM_RECEIVED', 'MEDICARE_INFO']);
  expect(jobsOfKind('FORM_RECEIVED')).toHaveLength(1);
  expect(jobsOfKind('MEDICARE_INFO')).toHaveLength(1);
  expect(store.audit).toHaveBeenCalledWith('system', 'medicare_info_queued', expect.anything());
  expect(store.audit).toHaveBeenCalledWith('system', 'form_received_queued', expect.anything());
});

it('a resubmit inside the tick window queues neither twice', async () => {
  store.listJobsForCustomer.mockResolvedValue([
    { id: 'j1', customerId: 'c1', kind: 'FORM_RECEIVED', status: 'SCHEDULED', payload: {}, runAt: '' },
    { id: 'j2', customerId: 'c1', kind: 'MEDICARE_INFO', status: 'SCHEDULED', payload: { attempt: 0 }, runAt: '' },
  ]);
  const r = await applyFormReceived({ ...customer } as never, { hasMedicare: 'No' });
  expect(r).toBe('queued');
  expect(store.addJob).not.toHaveBeenCalled();
  expect(store.audit).toHaveBeenCalledWith('system', 'form_received_already_queued', { customerId: 'c1' });
  expect(store.audit).toHaveBeenCalledWith('system', 'medicare_info_already_queued', { customerId: 'c1' });
  expect(store.audit).not.toHaveBeenCalledWith('system', 'medicare_info_queued', expect.anything());
  // The submission is still recorded as received.
  expect(store.audit).toHaveBeenCalledWith('system', 'form_received_queued', expect.anything());
});

it('a Medicare message already sent in an earlier cycle (DONE) is never queued again', async () => {
  store.listJobsForCustomer.mockResolvedValue([
    { id: 'j2', customerId: 'c1', kind: 'MEDICARE_INFO', status: 'DONE', payload: { attempt: 0 }, runAt: '' },
  ]);
  await notifyFormReceived('61400000001', 'a@b.c', 'tax-return', 'No');
  expect(jobsOfKind('FORM_RECEIVED')).toHaveLength(1);
  expect(jobsOfKind('MEDICARE_INFO')).toHaveLength(0);
  expect(store.audit).toHaveBeenCalledWith('system', 'medicare_info_already_queued', { customerId: 'c1' });
});

it('a DONE FORM_RECEIVED from an earlier cycle does not block a fresh one', async () => {
  store.listJobsForCustomer.mockResolvedValue([
    { id: 'j1', customerId: 'c1', kind: 'FORM_RECEIVED', status: 'DONE', payload: {}, runAt: '' },
  ]);
  await notifyFormReceived('61400000001', 'a@b.c', 'tax-return', 'Yes');
  expect(jobsOfKind('FORM_RECEIVED')).toHaveLength(1);
});

it('a "Yes" with a prior Medicare job neither queues nor audits Medicare', async () => {
  store.listJobsForCustomer.mockResolvedValue([
    { id: 'j2', customerId: 'c1', kind: 'MEDICARE_INFO', status: 'DONE', payload: { attempt: 0 }, runAt: '' },
  ]);
  await notifyFormReceived('61400000001', 'a@b.c', 'tax-return', 'Yes');
  expect(jobsOfKind('MEDICARE_INFO')).toHaveLength(0);
  expect(store.audit).not.toHaveBeenCalledWith('system', 'medicare_info_already_queued', expect.anything());
});

it('a failed lookup falls open and queues exactly as before', async () => {
  store.listJobsForCustomer.mockRejectedValue(new Error('db down'));
  const r = await notifyFormReceived('61400000001', 'a@b.c', 'tax-return', 'No');
  expect(r).toEqual({ matched: true });
  expect(jobsOfKind('FORM_RECEIVED')).toHaveLength(1);
  expect(jobsOfKind('MEDICARE_INFO')).toHaveLength(1);
});
