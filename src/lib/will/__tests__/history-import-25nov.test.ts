/**
 * Coexistence history import (25 Nov 2026): window, direction, order, dedupe,
 * idempotency, no customer changes, missing contacts, Meta's decline error,
 * time budget.
 */
import { importHistoryPayload, historyBody, importUnmatchedPending, historyImportEnabled } from '@/lib/will/history-import';
import type { MessageRow, CustomerRow, Store } from '@/lib/will/store';

const BIZ = '61424513998';
const CUST = '61400000001';
const T0 = 1_795_000_000; // disconnection moment used as the window start

function fakeStore(opts: { existing?: Partial<MessageRow>[]; processed?: string[] } = {}) {
  const customer = { id: 'c1', waId: CUST, name: 'Anna', state: 'NEW', paid: false, unread: false, unreadCount: 0, lastCustomerMsgAt: null, lastMessagePreview: null } as unknown as CustomerRow;
  const customerBefore = JSON.stringify(customer);
  const messages: MessageRow[] = (opts.existing ?? []).map((m, i) => ({ id: `e${i}`, customerId: 'c1', direction: 'IN', author: 'CUSTOMER', status: 'SENT', body: '', createdAt: new Date().toISOString(), ...m } as MessageRow));
  const processed = new Set(opts.processed ?? []);
  const claimed: string[] = [];
  const unmatched: Record<string, unknown>[] = [];
  let customers: Record<string, CustomerRow> = { [CUST]: customer };
  const store = {
    getCustomerByWaId: jest.fn(async (wa: string) => customers[wa] ?? null),
    saveHistoryUnmatched: jest.fn(async (rows: Record<string, unknown>[]) => { let n = 0; for (const r of rows) if (!unmatched.some((u) => u.messageId === r.messageId)) { unmatched.push({ ...r, importedAt: null }); n++; } return n; }),
    listHistoryUnmatched: jest.fn(async (o: { pendingOnly?: boolean } = {}) => unmatched.filter((u) => !o.pendingOnly || !u.importedAt)),
    markHistoryUnmatchedImported: jest.fn(async (ids: string[]) => { for (const u of unmatched) if (ids.includes(u.messageId as string)) u.importedAt = 'now'; }),
    listMessages: jest.fn(async () => messages.slice()),
    findMessageByProviderId: jest.fn(async (id: string) => messages.find((m) => m.meta?.providerId === id) ?? null),
    isProcessedInbound: jest.fn(async (id: string) => processed.has(id)),
    insertHistoricMessage: jest.fn(async (m: Omit<MessageRow, 'id' | 'createdAt'>, createdAt: string) => {
      const row = { ...m, id: `n${messages.length}`, createdAt } as MessageRow; messages.push(row); return row;
    }),
    claimInbound: jest.fn(async (id: string) => { claimed.push(id); processed.add(id); return true; }),
    // Anything that would change a customer or start automation must never be called:
    addMessage: jest.fn(), updateCustomer: jest.fn(), addTask: jest.fn(), setMessageStatus: jest.fn(), createCustomer: jest.fn(),
  };
  const addCustomer = (wa: string) => { customers = { ...customers, [wa]: { ...customer, id: `c-${wa}`, waId: wa } as CustomerRow }; };
  return { store: store as unknown as Store, raw: store, messages, claimed, customer, customerBefore, unmatched, addCustomer };
}

const msg = (id: string, from: string, ts: number, body: string, type = 'text') => ({
  from, id, timestamp: String(ts), type, ...(type === 'text' ? { text: { body } } : {}), history_context: { status: 'READ' },
});
function payload(threads: { id: string; messages: unknown[] }[], meta = { phase: 1, chunk_order: 1, progress: 40 }) {
  return { object: 'whatsapp_business_account', entry: [{ id: 'WABA', changes: [{ field: 'history', value: {
    messaging_product: 'whatsapp', metadata: { display_phone_number: BIZ, phone_number_id: 'PHONE_ID' },
    history: [{ metadata: meta, threads }],
  } }] }] };
}

const env = process.env;
beforeEach(() => { process.env = { ...env, WILL_HISTORY_IMPORT_FROM_TS: String(T0) }; });
afterAll(() => { process.env = env; });

it('imports nothing when the window is not set (safe default)', async () => {
  delete process.env.WILL_HISTORY_IMPORT_FROM_TS;
  const f = fakeStore();
  const r = await importHistoryPayload(payload([{ id: CUST, messages: [msg('w1', CUST, T0 + 10, 'hi')] }]), { store: f.store, ourPhoneId: 'PHONE_ID' });
  expect(r.windowSet).toBe(false);
  expect(r.counts.added).toBe(0);
  expect(r.counts.outsideWindow).toBe(1);
  expect(f.raw.insertHistoricMessage).not.toHaveBeenCalled();
});

it('imports in-window messages both ways, with original times, oldest first, and claims their ids', async () => {
  const f = fakeStore();
  const r = await importHistoryPayload(payload([{ id: CUST, messages: [
    msg('w3', BIZ, T0 + 300, 'We can do it, send your payslips'),   // sent by hand from the phone
    msg('w2', CUST, T0 + 100, 'Can you do my tax return?'),
    msg('w0', CUST, T0 - 3600, 'old message already in Will'),       // before the window
  ] }]), { store: f.store, ourPhoneId: 'PHONE_ID' });
  expect(r.counts).toMatchObject({ received: 3, inWindow: 2, outsideWindow: 1, added: 2, alreadyExisting: 0, failed: 0 });
  const added = f.messages.filter((m) => m.meta?.channel === 'history');
  expect(added.map((m) => [m.direction, m.author, m.body])).toEqual([
    ['IN', 'CUSTOMER', 'Can you do my tax return?'],
    ['OUT', 'HUMAN', 'We can do it, send your payslips'],
  ]);
  expect(added[0].createdAt).toBe(new Date((T0 + 100) * 1000).toISOString());
  expect(added.every((m) => m.status === 'SENT' && m.meta?.providerId)).toBe(true);
  expect(f.claimed).toEqual(['w2', 'w3']);
});

it('changes no customer field and starts no automation', async () => {
  const f = fakeStore();
  await importHistoryPayload(payload([{ id: CUST, messages: [msg('w1', CUST, T0 + 10, 'paid')] }]), { store: f.store, ourPhoneId: 'PHONE_ID' });
  expect(JSON.stringify(f.customer)).toBe(f.customerBefore);
  for (const fn of ['addMessage', 'updateCustomer', 'addTask', 'setMessageStatus', 'createCustomer'] as const) expect(f.raw[fn]).not.toHaveBeenCalled();
});

it('skips by WhatsApp id only; the same text under another id is imported and flagged, never dropped', async () => {
  const f = fakeStore({
    existing: [
      { meta: { providerId: 'dupId' }, body: 'x' },
      { direction: 'OUT', author: 'AI', body: 'Thanks Anna, here is your estimate', createdAt: new Date((T0 + 500 + 60) * 1000).toISOString() },
    ],
    processed: ['liveId'],
  });
  const r = await importHistoryPayload(payload([{ id: CUST, messages: [
    msg('dupId', CUST, T0 + 10, 'x'),
    msg('liveId', CUST, T0 + 20, 'arrived live before'),
    msg('apiId', BIZ, T0 + 500, 'Thanks Anna, here is your estimate'),
  ] }]), { store: f.store, ourPhoneId: 'PHONE_ID' });
  expect(r.counts).toMatchObject({ inWindow: 3, added: 1, alreadyExisting: 2, possibleDuplicate: 1 });
  const flagged = f.messages.filter((m) => m.meta?.channel === 'history');
  expect(flagged).toHaveLength(1);
  expect((flagged[0].meta as Record<string, unknown>).possibleDuplicate).toBe(true);
});

it('two real messages with the same text and different ids are both kept', async () => {
  const f = fakeStore();
  const r = await importHistoryPayload(payload([{ id: CUST, messages: [msg('ok1', CUST, T0 + 10, 'ok'), msg('ok2', CUST, T0 + 40, 'ok')] }]), { store: f.store, ourPhoneId: 'PHONE_ID' });
  expect(r.counts.added).toBe(2);
  expect(f.messages.filter((m) => m.body === 'ok')).toHaveLength(2);
});

it('is idempotent: importing the same payload twice adds nothing the second time', async () => {
  const f = fakeStore();
  const p = payload([{ id: CUST, messages: [msg('a', CUST, T0 + 1, 'one'), msg('b', BIZ, T0 + 2, 'two')] }]);
  const first = await importHistoryPayload(p, { store: f.store, ourPhoneId: 'PHONE_ID' });
  const second = await importHistoryPayload(p, { store: f.store, ourPhoneId: 'PHONE_ID' });
  expect(first.counts.added).toBe(2);
  expect(second.counts).toMatchObject({ added: 0, alreadyExisting: 2 });
  expect(f.messages.filter((m) => m.meta?.channel === 'history')).toHaveLength(2);
});

it('keeps messages from new numbers in full, creates nothing, and imports them later once the contact exists', async () => {
  const f = fakeStore();
  const NEW = '61499999999';
  const p = payload([{ id: NEW, messages: [msg('n1', NEW, T0 + 5, 'new lead, can you help?'), msg('n2', BIZ, T0 + 60, 'Yes, send me your details')] }]);
  const r = await importHistoryPayload(p, { store: f.store, ourPhoneId: 'PHONE_ID' });
  expect(r.counts).toMatchObject({ noCustomer: 2, savedForLater: 2, added: 0 });
  expect(r.missingContacts).toEqual([NEW]);
  expect(f.unmatched.map((u) => [u.messageId, u.direction, u.body, u.ts])).toEqual([['n1', 'IN', 'new lead, can you help?', T0 + 5], ['n2', 'OUT', 'Yes, send me your details', T0 + 60]]);
  expect(f.unmatched[0].raw).toMatchObject({ id: 'n1', type: 'text' });
  expect(f.raw.createCustomer).not.toHaveBeenCalled();
  // a repeat delivery stores nothing twice
  const again = await importHistoryPayload(p, { store: f.store, ourPhoneId: 'PHONE_ID' });
  expect(again.counts.savedForLater).toBe(0);
  // still no customer: stays pending
  expect(await importUnmatchedPending(f.store)).toMatchObject({ pending: 2, imported: 0, stillNoCustomer: 2 });
  // contact now exists: imported with original times, then not again
  f.addCustomer(NEW);
  expect(await importUnmatchedPending(f.store)).toMatchObject({ pending: 2, imported: 2 });
  const imported = f.messages.filter((m) => m.customerId === `c-${NEW}`);
  expect(imported.map((m) => [m.direction, m.createdAt])).toEqual([['IN', new Date((T0 + 5) * 1000).toISOString()], ['OUT', new Date((T0 + 60) * 1000).toISOString()]]);
  expect(await importUnmatchedPending(f.store)).toMatchObject({ pending: 0, imported: 0 });
});

it('the master switch is on only for the exact value true', () => {
  for (const [v, on] of [['true', true], ['TRUE', true], ['false', false], ['', false], ['1', false]] as const) {
    process.env.WILL_HISTORY_IMPORT_ENABLED = v;
    expect(historyImportEnabled()).toBe(on);
  }
  delete process.env.WILL_HISTORY_IMPORT_ENABLED;
  expect(historyImportEnabled()).toBe(false);
});

it('skips reactions and records Meta\'s "history sharing turned off" error', async () => {
  const f = fakeStore();
  const p = payload([{ id: CUST, messages: [{ from: CUST, id: 'r1', timestamp: String(T0 + 3), type: 'reaction', reaction: { emoji: '👍' } }] }]);
  (p.entry[0].changes[0].value.history[0] as Record<string, unknown>).errors = [{ code: 2593109, title: 'History sync is turned off by the business from the WhatsApp Business App' }];
  const r = await importHistoryPayload(p, { store: f.store, ourPhoneId: 'PHONE_ID' });
  expect(r.counts.skippedType).toBe(1);
  expect(r.errors[0].code).toBe(2593109);
});

it('ignores history for a phone number id that is not ours', async () => {
  const f = fakeStore();
  const r = await importHistoryPayload(payload([{ id: CUST, messages: [msg('x', CUST, T0 + 1, 'hi')] }]), { store: f.store, ourPhoneId: 'ANOTHER_ID' });
  expect(r.counts.received).toBe(0);
});

it('defers the rest when the time budget is used up (finished later by replay)', async () => {
  const f = fakeStore();
  const r = await importHistoryPayload(payload([{ id: CUST, messages: [msg('a', CUST, T0 + 1, 'one')] }]), { store: f.store, ourPhoneId: 'PHONE_ID', deadlineMs: Date.now() - 1 });
  expect(r.partial).toBe(true);
  expect(r.counts.deferred).toBe(1);
  expect(r.counts.added).toBe(0);
});

it('shows media and documents as readable placeholders', () => {
  expect(historyBody({ type: 'media_placeholder' })).toContain('Media');
  expect(historyBody({ type: 'image', image: { caption: 'payslip' } })).toBe('🖼️ [Photo] payslip');
  expect(historyBody({ type: 'reaction' })).toBeNull();
});
