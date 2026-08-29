/**
 * Server-side customer search: a WhatsApp number typed into the box finds its
 * customer however old the conversation is, and however the number is typed.
 *
 * This is Jo's rule, 29 Aug: "search has to work on the WhatsApp number — I type
 * a number and it finds it." The dashboard's own window is bounded; this search
 * is not, so it is the only thing that reaches an old conversation, exactly like
 * scrolling back to a ten-year-old WhatsApp chat.
 */
import { mkdtempSync, promises as fsp } from 'fs';
import os from 'os';
import path from 'path';
import type { Store } from '@/lib/will/store';

let store: Store;
let dir: string;
let cwdSpy: jest.SpyInstance;

beforeEach(async () => {
  dir = mkdtempSync(path.join(os.tmpdir(), 'will-search-'));
  cwdSpy = jest.spyOn(process, 'cwd').mockReturnValue(dir);
  jest.resetModules();
  const { FileStore } = await import('@/lib/will/store-file');
  store = new FileStore() as unknown as Store;
});

afterEach(async () => {
  cwdSpy.mockRestore();
  await fsp.rm(dir, { recursive: true, force: true }).catch(() => {});
});

async function seed() {
  const a = await store.createCustomer({ waId: '491767611234', name: 'Anna Fischer' });
  const b = await store.createCustomer({ waId: '61412345678', name: 'Liam Walsh' });
  const c = await store.createCustomer({ waId: '353871234567', name: 'Saoirse Byrne' });
  return { a, b, c };
}

describe('searchCustomers', () => {
  it('finds a customer by the full WhatsApp number', async () => {
    const { a } = await seed();
    const res = await store.searchCustomers('491767611234');
    expect(res.map((r) => r.id)).toContain(a.id);
  });

  it('finds a customer by a partial number (a middle slice of the digits)', async () => {
    const { a } = await seed();
    const res = await store.searchCustomers('176761');
    expect(res.map((r) => r.id)).toContain(a.id);
  });

  it('finds a stored 49176… when the number is typed with a local trunk zero (0176…)', async () => {
    const { a } = await seed();
    const res = await store.searchCustomers('01767611234');
    expect(res.map((r) => r.id)).toContain(a.id);
  });

  it('ignores spaces and punctuation in the typed number', async () => {
    const { b } = await seed();
    const res = await store.searchCustomers('+61 412 345 678');
    expect(res.map((r) => r.id)).toContain(b.id);
  });

  it('finds a customer by name', async () => {
    const { c } = await seed();
    const res = await store.searchCustomers('saoirse');
    expect(res.map((r) => r.id)).toContain(c.id);
  });

  it('returns nothing for a number that matches no one', async () => {
    await seed();
    expect(await store.searchCustomers('999888777')).toEqual([]);
  });

  it('returns nothing for an empty query', async () => {
    await seed();
    expect(await store.searchCustomers('')).toEqual([]);
  });
});
