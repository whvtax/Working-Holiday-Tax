/**
 * (audit, 10 Sept) A website questionnaire submitted moments before someone's
 * FIRST WhatsApp message left an open "Link to chat" task forever: the match
 * was only ever attempted once, at submission time, and nothing went back to
 * retry it once the very thing it was waiting for — a WhatsApp chat with that
 * number — actually showed up a few minutes later.
 *
 * Real Decision Log case: Gracie's questionnaire (+44 7495 247354) logged
 * "no WhatsApp customer has that number" at 01:46am; she sent her first
 * WhatsApp message ("Hi! I've just sent through my form") at 01:50am; the
 * task was still open hours later, needing a manual "Link to chat" click.
 *
 * resolvePendingFormLinkOnNewCustomer closes that gap: called wherever a
 * customer row is first created, it retries every open unmatched-questionnaire
 * task against that customer's number and, on a match, runs the exact same
 * path "Link to chat" runs.
 */
import { mkdtempSync, promises as fsp } from 'fs';
import os from 'os';
import path from 'path';
import type { Store } from '@/lib/will/store';

describe('resolvePendingFormLinkOnNewCustomer (real store)', () => {
  let store: Store;
  let dir: string;
  let cwdSpy: jest.SpyInstance;

  beforeEach(async () => {
    dir = mkdtempSync(path.join(os.tmpdir(), 'will-formlink-retry-'));
    cwdSpy = jest.spyOn(process, 'cwd').mockReturnValue(dir);
    jest.resetModules();
    const { FileStore } = await import('@/lib/will/store-file');
    store = new FileStore() as unknown as Store;
  });

  afterEach(async () => {
    cwdSpy.mockRestore();
    await fsp.rm(dir, { recursive: true, force: true }).catch(() => {});
  });

  it('auto-links the task the moment the matching customer is created, in any typed phone shape', async () => {
    const { notifyFormReceived, resolvePendingFormLinkOnNewCustomer } = await import('@/lib/will/form-link');

    // The form arrives first — no WhatsApp customer exists yet, exactly
    // Gracie's case (submission a few minutes ahead of her first message).
    const before = await notifyFormReceived('+44 7495 247354', 'graciekeers674@gmail.com', 'tax-return', 'No');
    expect(before.matched).toBe(false);

    const openBefore = (await store.listTasks()).filter((t) => t.status === 'OPEN' && t.customerId == null);
    expect(openBefore).toHaveLength(1);
    expect(openBefore[0].reason).toBe('Questionnaire submitted by a number that matches no WhatsApp chat');

    // She then messages on WhatsApp for the first time — a brand new Lead,
    // not yet paid, exactly Gracie's real situation. Her waId is the
    // WhatsApp-native digit shape, not the spaced form the website took.
    const customer = await store.createCustomer({ waId: '447495247354', name: 'Gracie', flag: '💬' });

    await resolvePendingFormLinkOnNewCustomer(store, customer);

    const openAfter = (await store.listTasks()).filter((t) => t.status === 'OPEN' && t.customerId == null);
    expect(openAfter).toHaveLength(0);

    const linked = await store.getCustomerById(customer.id);
    expect(linked?.formComplete).toBe(true);
  });

  it('never touches an unrelated open task for a different number', async () => {
    const { notifyFormReceived, resolvePendingFormLinkOnNewCustomer } = await import('@/lib/will/form-link');

    await notifyFormReceived('6765052475', 'fiebach460@gmail.com', 'tax-return', 'No');
    const customer = await store.createCustomer({ waId: '61411222333', name: 'Someone Else', flag: '💬' });

    await resolvePendingFormLinkOnNewCustomer(store, customer);

    const stillOpen = (await store.listTasks()).filter((t) => t.status === 'OPEN' && t.customerId == null);
    expect(stillOpen).toHaveLength(1);
  });

  it('is best-effort: a lookup failure must never be thrown back at the caller', async () => {
    const { resolvePendingFormLinkOnNewCustomer } = await import('@/lib/will/form-link');
    const brokenStore = { listTasks: async () => { throw new Error('boom'); } } as unknown as Store;
    const customer = await store.createCustomer({ waId: '61400000000', name: 'X', flag: '💬' });
    await expect(resolvePendingFormLinkOnNewCustomer(brokenStore, customer)).resolves.toBeUndefined();
  });
});
