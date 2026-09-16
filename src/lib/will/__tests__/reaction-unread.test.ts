/**
 * Jo, 14 Sep: a customer's emoji reaction (heart, thumbs up, etc.) on a
 * message we sent used to mark the chat unread and bold it in the list,
 * exactly like a real inbound message — even though there's nothing to
 * reply to. addMessage() now skips the unread bump specifically for a
 * reaction (meta.reaction present), in both store implementations.
 */
import { mkdtempSync, promises as fsp } from 'fs';
import os from 'os';
import path from 'path';
import type { Store } from '@/lib/will/store';

describe('a reaction does not mark the chat unread (FileStore)', () => {
  let store: Store;
  let dir: string;
  let cwdSpy: jest.SpyInstance;

  beforeEach(async () => {
    dir = mkdtempSync(path.join(os.tmpdir(), 'will-reaction-unread-'));
    cwdSpy = jest.spyOn(process, 'cwd').mockReturnValue(dir);
    jest.resetModules();
    const { FileStore } = await import('@/lib/will/store-file');
    store = new FileStore() as unknown as Store;
  });

  afterEach(async () => {
    cwdSpy.mockRestore();
    await fsp.rm(dir, { recursive: true, force: true }).catch(() => {});
  });

  it('a real inbound message DOES mark the chat unread (control case)', async () => {
    const c = await store.createCustomer({ waId: '61400000001', name: 'Alex', flag: '💬' });
    await store.addMessage({ customerId: c.id, direction: 'IN', author: 'CUSTOMER', status: 'SENT', body: 'Hi!' });
    const after = await store.getCustomerById(c.id);
    expect(after?.unread).toBe(true);
    expect(after?.unreadCount).toBe(1);
  });

  it('a heart reaction on our message does NOT mark the chat unread', async () => {
    const c = await store.createCustomer({ waId: '61400000002', name: 'Sam', flag: '💬' });
    await store.addMessage({
      customerId: c.id, direction: 'IN', author: 'CUSTOMER', status: 'SENT',
      body: '❤️ reacted to your message', meta: { reaction: { emoji: '❤️', to: 'wamid.OUT1' } },
    });
    const after = await store.getCustomerById(c.id);
    expect(after?.unread).toBe(false);
    expect(after?.unreadCount).toBe(0);
    // Still counts as recent activity for ordering purposes.
    expect(after?.lastCustomerMsgAt).toBeTruthy();
  });

  it('a real message after a reaction still bumps the badge normally', async () => {
    const c = await store.createCustomer({ waId: '61400000003', name: 'Robin', flag: '💬' });
    await store.addMessage({
      customerId: c.id, direction: 'IN', author: 'CUSTOMER', status: 'SENT',
      body: '👍 reacted to your message', meta: { reaction: { emoji: '👍' } },
    });
    await store.addMessage({ customerId: c.id, direction: 'IN', author: 'CUSTOMER', status: 'SENT', body: 'Actually, one more question' });
    const after = await store.getCustomerById(c.id);
    expect(after?.unread).toBe(true);
    expect(after?.unreadCount).toBe(1);
  });
});
