/**
 * The chat list pages through EVERY conversation (WhatsApp-style infinite
 * scroll), and the pipeline totals come from a real count, not the size of the
 * loaded window. Both are what let the dashboard hold 5,000 customers and more
 * without the list truncating or the numbers lying.
 *
 * The file store ships with seed data, so these assert on containment and on
 * deltas rather than absolute totals — the behaviour, not the fixture.
 */
import { mkdtempSync, promises as fsp } from 'fs';
import os from 'os';
import path from 'path';
import type { Store } from '@/lib/will/store';

let store: Store;
let dir: string;
let cwdSpy: jest.SpyInstance;

beforeEach(async () => {
  dir = mkdtempSync(path.join(os.tmpdir(), 'will-chatpage-'));
  cwdSpy = jest.spyOn(process, 'cwd').mockReturnValue(dir);
  jest.resetModules();
  const { FileStore } = await import('@/lib/will/store-file');
  store = new FileStore() as unknown as Store;
});

afterEach(async () => {
  cwdSpy.mockRestore();
  await fsp.rm(dir, { recursive: true, force: true }).catch(() => {});
});

/** A customer with a real last message, so it qualifies for the chat list. */
async function withMessage(waId: string) {
  const c = await store.createCustomer({ waId });
  await store.addMessage({ customerId: c.id, direction: 'IN', author: 'CUSTOMER', status: 'SENT', body: 'hi' });
  return c;
}

describe('listChatPage', () => {
  it('lists a customer that has a message, and never one that has none', async () => {
    const withMsg = await withMessage('61400000001');
    const noMsg = await store.createCustomer({ waId: '61400000002' });
    const ids = (await store.listChatPage(0, 1000)).map((c) => c.id);
    expect(ids).toContain(withMsg.id);
    expect(ids).not.toContain(noMsg.id);
  });

  it('paginates with no overlap and no gaps: the pages together equal one full read', async () => {
    for (let i = 0; i < 5; i++) await withMessage('6140000010' + i);
    const full = (await store.listChatPage(0, 1000)).map((c) => c.id);
    // Walk it in pages of 2 and reassemble.
    const walked: string[] = [];
    for (let off = 0; ; off += 2) {
      const page = await store.listChatPage(off, 2);
      walked.push(...page.map((c) => c.id));
      if (page.length < 2) break;
    }
    expect(walked).toEqual(full);                 // same order, no overlap, no gaps
    expect(new Set(walked).size).toBe(full.length); // every id exactly once
  });

  it('narrows to a set of states: includes a matching chat, excludes a non-matching one', async () => {
    const a = await withMessage('61400000021');
    const b = await withMessage('61400000022'); // stays a pre-payment lead
    await store.setState(a.id, 'PAID', 'SYSTEM');
    const paidIds = (await store.listChatPage(0, 1000, { states: ['PAID', 'FORM_PENDING'] })).map((c) => c.id);
    expect(paidIds).toContain(a.id);
    expect(paidIds).not.toContain(b.id);
  });
});

describe('countInStates', () => {
  it('moves the count by exactly the number of customers put into those states', async () => {
    const paidStates: ['PAID', 'FORM_PENDING'] = ['PAID', 'FORM_PENDING'];
    const before = await store.countInStates(paidStates);
    const a = await store.createCustomer({ waId: '61400000031' });
    const b = await store.createCustomer({ waId: '61400000032' });
    await store.createCustomer({ waId: '61400000033' }); // left as a lead
    await store.setState(a.id, 'PAID', 'SYSTEM');
    await store.setState(b.id, 'FORM_PENDING', 'SYSTEM');
    expect(await store.countInStates(paidStates)).toBe(before + 2);
    expect(await store.countInStates([])).toBe(0);
  });
});
