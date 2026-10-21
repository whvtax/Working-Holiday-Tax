/**
 * The second receipt of one payment, on the real attachment path.
 * Jo, 21 Oct (+81 70 5498): see document-drop.ts, "The payment burst".
 */
const addMessage = jest.fn().mockResolvedValue({ id: 'm1' });
const addTask = jest.fn().mockResolvedValue({ id: 't1' });
const audit = jest.fn().mockResolvedValue(undefined);
const listPendingOutbound = jest.fn().mockResolvedValue([]);
const history = jest.fn().mockResolvedValue([]);
const customer: Record<string, unknown> = { id: 'c1', waId: '817054982881', name: 'R', state: 'FORM_PENDING', paid: true, lang: 'ja' };

jest.mock('@/lib/will/store', () => ({
  getStore: () => ({
    getCustomerByWaId: jest.fn().mockResolvedValue(customer),
    createCustomer: jest.fn().mockResolvedValue(customer),
    addMessage, addTask, audit, listPendingOutbound, history,
    findOpenTaskForCustomer: jest.fn().mockResolvedValue(null),
    updateTask: jest.fn().mockResolvedValue(undefined),
    setState: jest.fn().mockResolvedValue(true),
    getSetting: jest.fn().mockResolvedValue(null),
    setSetting: jest.fn().mockResolvedValue(undefined),
    listTemplates: jest.fn().mockResolvedValue([]),
  }),
}));

import { handleInboundNote } from '@/lib/will/service';

const photo = { media: { id: 'img2', kind: 'image', mime: 'image/jpeg' } };

beforeEach(() => {
  addMessage.mockClear(); addTask.mockClear(); audit.mockClear();
  listPendingOutbound.mockResolvedValue([]); history.mockResolvedValue([]);
});

it('a second receipt while the payment confirmation is queued: kept, no "got it all", no task', async () => {
  listPendingOutbound.mockResolvedValue([{ id: 'q1', status: 'QUEUED', meta: { paymentConfirmation: true } }]);
  await handleInboundNote('817054982881', '📷 [Photo]', photo);
  expect(addMessage).toHaveBeenCalledTimes(1); // stored in the thread
  expect(addTask).not.toHaveBeenCalled();
  expect(audit).toHaveBeenCalledWith('system', 'payment_burst_media_absorbed', expect.objectContaining({ customerId: 'c1' }));
});

it('a receipt a few minutes after the move to Paid is still the same payment', async () => {
  history.mockResolvedValue([{ customerId: 'c1', from: 'PAYMENT_PENDING', to: 'PAID', causedBy: 'SYSTEM', createdAt: new Date(Date.now() - 3 * 60_000).toISOString() }]);
  await handleInboundNote('817054982881', '📷 [Photo]', photo);
  expect(addTask).not.toHaveBeenCalled();
});

it('documents sent long after payment still get the normal document-drop task', async () => {
  history.mockResolvedValue([{ customerId: 'c1', from: 'PAYMENT_PENDING', to: 'PAID', causedBy: 'SYSTEM', createdAt: new Date(Date.now() - 2 * 3600_000).toISOString() }]);
  await handleInboundNote('817054982881', '📷 [Photo]', photo);
  expect(addTask).toHaveBeenCalledTimes(1);
  expect(addTask.mock.calls[0][0].context).toBe('1 file received after payment.');
});
