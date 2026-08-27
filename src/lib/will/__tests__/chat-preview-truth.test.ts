/**
 * The chat list must never claim a customer received something they did not.
 *
 * THE BUG (26 Aug): addMessage() wrote last_message_preview for every row it
 * inserted, whatever the status. Will's drafts are inserted as
 * PENDING_APPROVAL (approval mode) or QUEUED (the held-back autopilot reply),
 * so the moment Will WROTE something, the chat list showed it as that
 * conversation's last message — before anyone approved it, and permanently if
 * the owner discarded it or the policy guard blocked it. The list Jo scans to
 * decide who still needs an answer was telling him a customer had been
 * answered when they had not.
 *
 * THE RULE, asserted below: only a message that actually went out, or one the
 * customer sent, may become the row preview. Both are stored as 'SENT'.
 */
import { promises as fsp } from 'fs';
import { mkdtempSync } from 'fs';
import os from 'os';
import path from 'path';
import type { Store } from '@/lib/will/store';

let store: Store;
let dir: string;
let cwdSpy: jest.SpyInstance;

beforeEach(async () => {
  // FileStore writes to <cwd>/.data/store.json, resolved once at import time —
  // so cwd is redirected to a throwaway directory BEFORE the dynamic import,
  // and the module registry is reset so each test gets a fresh file + cache.
  dir = mkdtempSync(path.join(os.tmpdir(), 'will-preview-'));
  cwdSpy = jest.spyOn(process, 'cwd').mockReturnValue(dir);
  jest.resetModules();
  const { FileStore } = await import('@/lib/will/store-file');
  store = new FileStore() as unknown as Store;
});

afterEach(async () => {
  cwdSpy.mockRestore();
  await fsp.rm(dir, { recursive: true, force: true }).catch(() => {});
});

async function newCustomer() {
  return store.createCustomer({ waId: '61400000123', name: 'Test Lead' });
}
const previewOf = async (id: string) => (await store.getCustomerById(id))?.lastMessagePreview ?? null;

it('an inbound message from the customer is the preview', async () => {
  const c = await newCustomer();
  await store.addMessage({ customerId: c.id, direction: 'IN', author: 'CUSTOMER', status: 'SENT', body: 'hi, how much is it?' });
  expect(await previewOf(c.id)).toBe('hi, how much is it?');
});

it('a draft awaiting approval does NOT become the preview', async () => {
  const c = await newCustomer();
  await store.addMessage({ customerId: c.id, direction: 'IN', author: 'CUSTOMER', status: 'SENT', body: 'hi, how much is it?' });
  await store.addMessage({ customerId: c.id, direction: 'OUT', author: 'AI', status: 'PENDING_APPROVAL', body: 'It is $220 for a TFN return.' });
  expect(await previewOf(c.id)).toBe('hi, how much is it?');
});

it('a discarded draft leaves the preview on the last real message', async () => {
  const c = await newCustomer();
  await store.addMessage({ customerId: c.id, direction: 'IN', author: 'CUSTOMER', status: 'SENT', body: 'hi, how much is it?' });
  const draft = await store.addMessage({ customerId: c.id, direction: 'OUT', author: 'AI', status: 'PENDING_APPROVAL', body: 'It is $220 for a TFN return.' });
  await store.setMessageStatus(draft.id, 'DISCARDED');
  expect(await previewOf(c.id)).toBe('hi, how much is it?');
});

it('a guard-blocked draft never appears as the preview', async () => {
  const c = await newCustomer();
  await store.addMessage({ customerId: c.id, direction: 'IN', author: 'CUSTOMER', status: 'SENT', body: 'can you do it cheaper?' });
  const draft = await store.addMessage({ customerId: c.id, direction: 'OUT', author: 'AI', status: 'PENDING_APPROVAL', body: 'Special deal, only $50 for you!' });
  await store.setMessageStatus(draft.id, 'BLOCKED');
  expect(await previewOf(c.id)).toBe('can you do it cheaper?');
});

it('a parked autopilot reply becomes the preview only when it is really sent', async () => {
  const c = await newCustomer();
  await store.addMessage({ customerId: c.id, direction: 'IN', author: 'CUSTOMER', status: 'SENT', body: 'hi, how much is it?' });
  // deliverOut and the autopilot path both write QUEUED first, then reconcile.
  const queued = await store.addMessage({ customerId: c.id, direction: 'OUT', author: 'AI', status: 'QUEUED', body: 'It is $220 for a TFN return.' });
  expect(await previewOf(c.id)).toBe('hi, how much is it?');
  await store.setMessageStatus(queued.id, 'SENT', { restamp: true });
  expect(await previewOf(c.id)).toBe('It is $220 for a TFN return.');
  expect((await store.getCustomerById(c.id))?.lastMessageDirection).toBe('OUT');
});

it('a send WhatsApp rejected falls back to the last message that landed', async () => {
  const c = await newCustomer();
  await store.addMessage({ customerId: c.id, direction: 'IN', author: 'CUSTOMER', status: 'SENT', body: 'hi, how much is it?' });
  const queued = await store.addMessage({ customerId: c.id, direction: 'OUT', author: 'AI', status: 'QUEUED', body: 'It is $220 for a TFN return.' });
  await store.setMessageStatus(queued.id, 'FAILED');
  expect(await previewOf(c.id)).toBe('hi, how much is it?');
});

it('a message the owner revoked in the WhatsApp app stops being the preview', async () => {
  const c = await newCustomer();
  await store.addMessage({ customerId: c.id, direction: 'IN', author: 'CUSTOMER', status: 'SENT', body: 'hi, how much is it?' });
  const sent = await store.addMessage({
    customerId: c.id, direction: 'OUT', author: 'HUMAN', status: 'SENT',
    body: 'Wrong chat, sorry', meta: { providerId: 'wamid.abc' },
  });
  expect(await previewOf(c.id)).toBe('Wrong chat, sorry');
  expect(await store.discardByProviderId('wamid.abc')).toBe(true);
  expect(await previewOf(c.id)).toBe('hi, how much is it?');
  expect((await store.getMessageById(sent.id))?.status).toBe('DISCARDED');
});

it('a conversation whose only outbound message is a draft shows nothing rather than the draft', async () => {
  const c = await newCustomer();
  const draft = await store.addMessage({ customerId: c.id, direction: 'OUT', author: 'AI', status: 'PENDING_APPROVAL', body: 'Draft nobody approved' });
  expect(await previewOf(c.id)).toBeNull();
  await store.setMessageStatus(draft.id, 'DISCARDED');
  expect(await previewOf(c.id)).toBeNull();
});

it('the unread badge still counts inbound messages, untouched by the preview rule', async () => {
  const c = await newCustomer();
  await store.addMessage({ customerId: c.id, direction: 'IN', author: 'CUSTOMER', status: 'SENT', body: 'one' });
  await store.addMessage({ customerId: c.id, direction: 'IN', author: 'CUSTOMER', status: 'SENT', body: 'two' });
  await store.addMessage({ customerId: c.id, direction: 'OUT', author: 'AI', status: 'PENDING_APPROVAL', body: 'draft' });
  const fresh = await store.getCustomerById(c.id);
  expect(fresh?.unreadCount).toBe(2);
  expect(fresh?.lastCustomerMsgAt).not.toBeNull();
  expect(fresh?.lastMessagePreview).toBe('two');
});
