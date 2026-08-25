/**
 * A message Will cannot read still has to be visible and, when it needs one, has
 * to raise exactly one task — but a heart on one of our messages is not work.
 * Every reaction used to open a "Customer sent a message Will cannot read" task,
 * which is how the real ones ended up buried.
 */
const addMessage = jest.fn().mockResolvedValue({ id: 'm1' });
const addTask = jest.fn().mockResolvedValue({ id: 't1' });
const customer = { id: 'c1', waId: '61400000001', name: 'Alex' };
jest.mock('@/lib/will/store', () => ({
  getStore: () => ({
    getCustomerByWaId: jest.fn().mockResolvedValue(customer),
    createCustomer: jest.fn().mockResolvedValue(customer),
    addMessage, addTask,
    audit: jest.fn().mockResolvedValue(undefined),
  }),
}));

import { handleInboundNote } from '@/lib/will/service';

beforeEach(() => { addMessage.mockClear(); addTask.mockClear(); });

it('stores a photo with its media descriptor and raises one task', async () => {
  await handleInboundNote('61400000001', '📷 [Photo]', {
    media: { id: '55', kind: 'image', mime: 'image/jpeg' },
  });
  expect(addMessage).toHaveBeenCalledTimes(1);
  expect(addMessage.mock.calls[0][0].meta).toEqual({ media: { id: '55', kind: 'image', mime: 'image/jpeg' } });
  expect(addTask).toHaveBeenCalledTimes(1);
  // The attachment is on screen now, so the instruction points at the chat.
  expect(addTask.mock.calls[0][0].reason).toMatch(/Open the chat/);
});

it('stores a reaction and raises NO task', async () => {
  await handleInboundNote('61400000001', '❤️  reacted to your message', {
    reaction: { emoji: '❤️', to: 'wamid.ours' },
  });
  expect(addMessage).toHaveBeenCalledTimes(1);
  expect(addMessage.mock.calls[0][0].meta).toEqual({ reaction: { emoji: '❤️', to: 'wamid.ours' } });
  expect(addTask).not.toHaveBeenCalled();
});

it('still raises a task for a message with neither text nor a readable file', async () => {
  await handleInboundNote('61400000001', '📎 [Message — open WhatsApp to view]', {});
  expect(addTask).toHaveBeenCalledTimes(1);
  expect(addMessage.mock.calls[0][0].meta).toBeUndefined();
});
