/**
 * Jo, 14 Sep: automated messages (payment received, questionnaire received,
 * Medicare exemption, lodged, and any resend of one of these) must never go
 * out twice. The concrete case: "ist überwiesen" produced two "Zahlung
 * erhalten!" confirmations three minutes apart, because a retry mechanism
 * believed the first send had failed when it had actually gone through.
 *
 * wasAlreadySentVerbatim is the general check every automatic resend path
 * now calls first: was this exact text already SENT to this customer? If
 * so, skip. This only covers automatic resends — it must never stop Will (or
 * a human) from sending the same canned text again because the CUSTOMER
 * explicitly asked for it a second time; that goes through a normal reply,
 * not one of these resend paths, so it never reaches this check at all.
 */
import { mkdtempSync, promises as fsp } from 'fs';
import os from 'os';
import path from 'path';
import type { Store } from '@/lib/will/store';

describe('wasAlreadySentVerbatim (real store)', () => {
  let store: Store;
  let dir: string;
  let cwdSpy: jest.SpyInstance;

  beforeEach(async () => {
    dir = mkdtempSync(path.join(os.tmpdir(), 'will-dedup-'));
    cwdSpy = jest.spyOn(process, 'cwd').mockReturnValue(dir);
    jest.resetModules();
    const { FileStore } = await import('@/lib/will/store-file');
    store = new FileStore() as unknown as Store;
  });

  afterEach(async () => {
    cwdSpy.mockRestore();
    await fsp.rm(dir, { recursive: true, force: true }).catch(() => {});
  });

  it('is false when nothing has been sent yet', async () => {
    const { wasAlreadySentVerbatim } = await import('@/lib/will/channel');
    const c = await store.createCustomer({ waId: '61400000001', name: 'Alex', flag: '💬' });
    expect(await wasAlreadySentVerbatim(store, c.id, 'Zahlung erhalten!')).toBe(false);
  });

  it('is true once the exact same text has been SENT', async () => {
    const { wasAlreadySentVerbatim } = await import('@/lib/will/channel');
    const c = await store.createCustomer({ waId: '61400000002', name: 'Meg', flag: '💬' });
    await store.addMessage({ customerId: c.id, direction: 'OUT', author: 'AI', status: 'SENT', body: 'Zahlung erhalten!\n\nBitte fülle das Formular aus.' });
    expect(await wasAlreadySentVerbatim(store, c.id, 'Zahlung erhalten!\n\nBitte fülle das Formular aus.')).toBe(true);
  });

  it('is insensitive to case and whitespace differences (still the same message)', async () => {
    const { wasAlreadySentVerbatim } = await import('@/lib/will/channel');
    const c = await store.createCustomer({ waId: '61400000003', name: 'Pippa', flag: '💬' });
    await store.addMessage({ customerId: c.id, direction: 'OUT', author: 'AI', status: 'SENT', body: 'Payment received!   Great news.' });
    expect(await wasAlreadySentVerbatim(store, c.id, 'payment received! great news.')).toBe(true);
  });

  it('ignores a message that only got as far as QUEUED or FAILED, never actually SENT', async () => {
    const { wasAlreadySentVerbatim } = await import('@/lib/will/channel');
    const c = await store.createCustomer({ waId: '61400000004', name: 'Robin', flag: '💬' });
    await store.addMessage({ customerId: c.id, direction: 'OUT', author: 'AI', status: 'QUEUED', body: 'Your tax return has been lodged successfully!' });
    await store.addMessage({ customerId: c.id, direction: 'OUT', author: 'AI', status: 'FAILED', body: 'Your tax return has been lodged successfully!' });
    expect(await wasAlreadySentVerbatim(store, c.id, 'Your tax return has been lodged successfully!')).toBe(false);
  });

  it('ignores an inbound (customer) message with matching text', async () => {
    const { wasAlreadySentVerbatim } = await import('@/lib/will/channel');
    const c = await store.createCustomer({ waId: '61400000005', name: 'Sam', flag: '💬' });
    await store.addMessage({ customerId: c.id, direction: 'IN', author: 'CUSTOMER', status: 'SENT', body: 'ist überwiesen' });
    expect(await wasAlreadySentVerbatim(store, c.id, 'ist überwiesen')).toBe(false);
  });

  it('is false for a different message entirely, so a genuinely new confirmation still goes out', async () => {
    const { wasAlreadySentVerbatim } = await import('@/lib/will/channel');
    const c = await store.createCustomer({ waId: '61400000006', name: 'Jan', flag: '💬' });
    await store.addMessage({ customerId: c.id, direction: 'OUT', author: 'AI', status: 'SENT', body: "Great, we've received your questionnaire! ✅" });
    expect(await wasAlreadySentVerbatim(store, c.id, 'Payment received! 🎉')).toBe(false);
  });
});
