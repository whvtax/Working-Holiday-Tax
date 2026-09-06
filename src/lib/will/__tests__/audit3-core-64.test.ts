/**
 * store.humanOutMessages() is the slice monthlyConversion's "Will did it all"
 * share actually needs (HUMAN-authored, outbound, not discarded/blocked) —
 * previously the /api/will/insights/monthly route read allMessages(), every
 * message row in the system, just to filter down to this (audit, 5 Sep).
 *
 * Pinned against the file store, which is the real Store implementation this
 * suite can exercise without a database: the filter must match exactly what
 * monthly-conversion.ts's own firstHumanAt loop checks.
 */
import { mkdtempSync, promises as fsp } from 'fs';
import os from 'os';
import path from 'path';
import type { Store } from '@/lib/will/store';

let store: Store;
let dir: string;
let cwdSpy: jest.SpyInstance;

beforeEach(async () => {
  dir = mkdtempSync(path.join(os.tmpdir(), 'will-humanout-'));
  cwdSpy = jest.spyOn(process, 'cwd').mockReturnValue(dir);
  jest.resetModules();
  const { FileStore } = await import('@/lib/will/store-file');
  store = new FileStore() as unknown as Store;
});

afterEach(async () => {
  cwdSpy.mockRestore();
  await fsp.rm(dir, { recursive: true, force: true }).catch(() => {});
});

describe('humanOutMessages', () => {
  it('keeps only HUMAN-authored outbound messages, dropping AI, SYSTEM and inbound rows', async () => {
    const c = await store.createCustomer({ waId: '61400000900' });
    await store.addMessage({ customerId: c.id, direction: 'IN', author: 'CUSTOMER', status: 'SENT', body: 'hi' });
    await store.addMessage({ customerId: c.id, direction: 'OUT', author: 'AI', status: 'SENT', body: 'auto reply' });
    await store.addMessage({ customerId: c.id, direction: 'OUT', author: 'SYSTEM', status: 'SENT', body: 'system note' });
    const human = await store.addMessage({ customerId: c.id, direction: 'OUT', author: 'HUMAN', status: 'SENT', body: 'Jo here' });

    const rows = await store.humanOutMessages();
    const ids = rows.map((m) => m.id);
    expect(ids).toEqual([human.id]);
  });

  it('drops a HUMAN/OUT message that was discarded or blocked, same as monthlyConversion\'s own check', async () => {
    const c = await store.createCustomer({ waId: '61400000901' });
    await store.addMessage({ customerId: c.id, direction: 'OUT', author: 'HUMAN', status: 'DISCARDED', body: 'revoked' });
    await store.addMessage({ customerId: c.id, direction: 'OUT', author: 'HUMAN', status: 'BLOCKED', body: 'blocked' });
    const kept = await store.addMessage({ customerId: c.id, direction: 'OUT', author: 'HUMAN', status: 'SENT', body: 'kept' });

    const rows = await store.humanOutMessages();
    expect(rows.map((m) => m.id)).toEqual([kept.id]);
  });
});
