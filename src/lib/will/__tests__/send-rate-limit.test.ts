/**
 * trySendBudget: at most SEND_RATE_LIMIT (10) outbound customer-facing sends
 * in any rolling 20-second window (~30/minute), independent of tick
 * frequency or DUE_JOBS_BATCH (Jo, 16 Sep — the WhatsApp Business account
 * itself was restricted by Meta for "spam, automated or bulk messaging",
 * most plausibly from a backlog sending many messages back to back in one
 * tick; started at 8/minute, loosened the same day once that felt
 * overcautious for the size of the backlog being worked through).
 *
 * A refusal never drops anything — the caller leaves that job SCHEDULED, so
 * it is simply picked up on a later tick once the window has room again.
 */
import { mkdtempSync, promises as fsp } from 'fs';
import os from 'os';
import path from 'path';
import type { Store } from '@/lib/will/store';

describe('trySendBudget (real store)', () => {
  let store: Store;
  let dir: string;
  let cwdSpy: jest.SpyInstance;

  beforeEach(async () => {
    dir = mkdtempSync(path.join(os.tmpdir(), 'will-sendrate-'));
    cwdSpy = jest.spyOn(process, 'cwd').mockReturnValue(dir);
    jest.resetModules();
    const { FileStore } = await import('@/lib/will/store-file');
    store = new FileStore() as unknown as Store;
  });

  afterEach(async () => {
    cwdSpy.mockRestore();
    await fsp.rm(dir, { recursive: true, force: true }).catch(() => {});
  });

  it('allows the first 10 sends in a fresh window', async () => {
    const { trySendBudget } = await import('@/lib/will/scheduler');
    for (let i = 0; i < 10; i++) {
      expect(await trySendBudget(store)).toBe(true);
    }
  });

  it('refuses the 11th send within the same 20s window', async () => {
    const { trySendBudget } = await import('@/lib/will/scheduler');
    for (let i = 0; i < 10; i++) await trySendBudget(store);
    expect(await trySendBudget(store)).toBe(false);
    expect(await trySendBudget(store)).toBe(false);
  });

  it('allows sends again once the window rolls over', async () => {
    const { trySendBudget } = await import('@/lib/will/scheduler');
    const realNow = Date.now;
    let now = realNow();
    jest.spyOn(Date, 'now').mockImplementation(() => now);
    try {
      for (let i = 0; i < 10; i++) await trySendBudget(store);
      expect(await trySendBudget(store)).toBe(false);
      now += 21_000;
      expect(await trySendBudget(store)).toBe(true);
    } finally {
      (Date.now as jest.Mock).mockRestore();
    }
  });

  it('is a no-op-safe best effort: a getSetting failure still allows the send rather than blocking everything', async () => {
    const { trySendBudget } = await import('@/lib/will/scheduler');
    const broken = {
      getSetting: async () => { throw new Error('db down'); },
      setSetting: async () => { throw new Error('db down'); },
    } as unknown as Store;
    await expect(trySendBudget(broken)).resolves.toBe(true);
  });
});
