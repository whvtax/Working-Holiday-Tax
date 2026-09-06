/**
 * audit3 core #44: a broken will_audit table must not read as "all clear".
 *
 * The Supabase client returns { error } instead of throwing, so audit() used to
 * drop every row without anyone knowing, and the diagnostics then read the
 * empty log as a quiet system. Pinned here:
 *  - audit() still never throws, but records the insert error in lastPersistError;
 *  - checkAuditLog() reports an unreadable table, and an empty table while
 *    customers were clearly messaging in the last day, as a fault;
 *  - the two diagnostic routes surface that fault instead of "nothing recorded".
 */
import fsp from 'fs/promises';
import path from 'path';

type Call = { table: string; op: string; args: unknown[] };

describe('SupabaseStore audit log health', () => {
  const calls: Call[] = [];
  let insertError: { message: string } | null = null;
  let probeError: { message: string } | null = null;
  let probeRows: { id: string }[] = [];
  let messagesLastDay = 0;

  function chain(table: string) {
    const q: Record<string, unknown> = {};
    const rec = (op: string, ...args: unknown[]) => { calls.push({ table, op, args }); return q; };
    q.insert = (...a: unknown[]) => { rec('insert', ...a); return Promise.resolve({ data: null, error: insertError }); };
    q.select = (...a: unknown[]) => {
      rec('select', ...a);
      const opts = a[1] as { head?: boolean } | undefined;
      if (table === 'will_messages' && opts?.head) {
        q.gte = () => Promise.resolve({ count: messagesLastDay, error: null });
      }
      return q;
    };
    q.order = () => q;
    q.limit = () => Promise.resolve({ data: probeError ? null : probeRows, error: probeError });
    return q;
  }

  jest.mock('@/lib/supabase', () => ({ getSupabase: () => ({ from: (t: string) => chain(t) }) }));

  beforeEach(() => {
    calls.length = 0; insertError = null; probeError = null; probeRows = []; messagesLastDay = 0;
    jest.resetModules();
  });

  it('audit() never throws but no longer hides a failed insert', async () => {
    insertError = { message: 'column "detail" does not exist' };
    const mod = await import('@/lib/will/store-supabase');
    const store = new mod.SupabaseStore();
    await expect(store.audit('channel', 'send_failed', { x: 1 })).resolves.toBeUndefined();
    expect(mod.lastPersistError).toBe('audit send_failed: column "detail" does not exist');
    expect(calls.find((c) => c.table === 'will_audit' && c.op === 'insert')?.args[0])
      .toEqual({ actor: 'channel', action: 'send_failed', detail: { x: 1 } });
  });

  it('checkAuditLog reports a table that cannot be read', async () => {
    probeError = { message: 'permission denied for table will_audit' };
    const { SupabaseStore } = await import('@/lib/will/store-supabase');
    const r = await new SupabaseStore().checkAuditLog();
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.error).toMatch(/cannot be read: permission denied/);
  });

  it('checkAuditLog is fine with an empty log on a genuinely quiet day', async () => {
    probeRows = []; messagesLastDay = 0;
    const { SupabaseStore } = await import('@/lib/will/store-supabase');
    expect(await new SupabaseStore().checkAuditLog()).toEqual({ ok: true });
  });

  it('checkAuditLog flags an empty log while customers were messaging', async () => {
    probeRows = []; messagesLastDay = 7;
    const mod = await import('@/lib/will/store-supabase');
    const r = await new mod.SupabaseStore().checkAuditLog();
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.error).toMatch(/empty although 7 message\(s\)/);
  });

  it('checkAuditLog is ok when the log has rows', async () => {
    probeRows = [{ id: 'a' }]; messagesLastDay = 99;
    const { SupabaseStore } = await import('@/lib/will/store-supabase');
    expect(await new SupabaseStore().checkAuditLog()).toEqual({ ok: true });
    expect(calls.some((c) => c.table === 'will_messages')).toBe(false);
  });
});

describe('diagnostic routes surface a broken decision log (source shape)', () => {
  const read = (rel: string) => fsp.readFile(path.join(__dirname, '..', '..', '..', rel), 'utf8');

  it('/api/will/system adds an explicit fault instead of reporting zero faults', async () => {
    const src = await read('app/api/will/system/route.ts');
    expect(src).toMatch(/store\.checkAuditLog/);
    expect(src).toMatch(/key: 'audit_log_not_written'/);
    expect(src).toMatch(/severity: 'critical'/);
  });

  it('/api/will/whatsapp/inbound-check says the log is broken before blaming Meta', async () => {
    const src = await read('app/api/will/whatsapp/inbound-check/route.ts');
    const probe = src.indexOf('store.checkAuditLog');
    const meta = src.indexOf('No inbound webhook has been recorded at all');
    expect(probe).toBeGreaterThan(-1);
    expect(probe).toBeLessThan(meta);
    expect(src).toMatch(/The decision log is not being written/);
  });
});
