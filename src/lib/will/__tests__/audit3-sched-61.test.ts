/**
 * Audit 3, lane sched, finding 61 (5 Sep): the System & Costs card used to read
 * the newest 500 will_audit rows and call that "recent". At volume that is a
 * few hours, not a day, so a send_failed at 11pm had scrolled off the card by
 * the time Jo opened the CRM at 8am and the "in the last 500 entries" caveat
 * read as a count when it was really an unpredictable time window.
 *
 * Pinned: /api/will/system now filters the fetched rows to a fixed 7 day
 * window (by `at`), so a fault stays on the card for a full week regardless
 * of how many other rows were written that day, and the response reports the
 * real row count actually used for the card.
 */
import type { AuditRow, Store } from '@/lib/will/store';

const audit = (actor: string, action: string, at: string): AuditRow =>
  ({ id: `${actor}-${action}-${at}`, actor, action, detail: { error: 'boom' }, at });

const NOW = new Date('2026-09-05T08:00:00.000Z');

function makeStore(rows: AuditRow[]): Store {
  return {
    getSetting: async () => null,
    listAudit: async () => rows,
    checkAuditLog: async () => ({ ok: true }),
  } as unknown as Store;
}

let store: Store;
jest.mock('@/lib/will/store', () => ({ getStore: () => store }));
jest.mock('@/lib/will/auth', () => ({ sessionValid: jest.fn().mockResolvedValue(true) }));

describe('/api/will/system fault window', () => {
  let realDateNow: () => number;

  beforeEach(() => {
    jest.resetModules();
    realDateNow = Date.now;
    Date.now = () => NOW.getTime();
  });

  afterEach(() => {
    Date.now = realDateNow;
  });

  it('keeps a fault from 11pm last night on the card the next morning', async () => {
    // An overnight send_failed, plus enough other rows overnight to blow past
    // the old 500 row cutoff well before reaching this one.
    const filler = Array.from({ length: 600 }, (_, i) =>
      audit('scheduler', 'tick_ok', new Date(NOW.getTime() - (i + 1) * 60_000).toISOString()));
    const overnightFault = audit('channel', 'send_failed', '2026-09-04T23:00:00.000Z');
    store = makeStore([...filler, overnightFault]);

    const { GET } = await import('@/app/api/will/system/route');
    const res = await GET();
    const body = await res.json();

    expect(body.faults.some((f: { key: string }) => f.key === 'send_failed')).toBe(true);
  });

  it('drops a fault older than the 7 day window', async () => {
    const staleFault = audit('channel', 'send_failed', '2026-08-20T23:00:00.000Z');
    store = makeStore([staleFault]);

    const { GET } = await import('@/app/api/will/system/route');
    const res = await GET();
    const body = await res.json();

    expect(body.faults.some((f: { key: string }) => f.key === 'send_failed')).toBe(false);
    expect(body.auditRowsRead).toBe(0);
  });

  it('reports the day window alongside the row count, not a row count alone', async () => {
    store = makeStore([]);
    const { GET } = await import('@/app/api/will/system/route');
    const res = await GET();
    const body = await res.json();

    expect(body.faultWindowDays).toBe(7);
    expect(typeof body.faultWindow).toBe('number');
  });
});
