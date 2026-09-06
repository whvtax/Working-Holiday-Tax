/**
 * Audit 3, lane core, finding 68 (5 Sep): cancelJobsFor must fail loud, not
 * report success while the stale job is still SCHEDULED.
 *
 * cancelJobsFor used to destructure only `data` from the update and return
 * `data?.length ?? 0` even when the UPDATE errored, so a failed cancel looked
 * exactly like "nothing was scheduled". Two places depended on that lie:
 *   - reconcileSchedule cancels the pending FOLLOW_UP/AUTO_CLOSE row and then
 *     calls addJob; if the cancel silently failed the old row was still
 *     SCHEDULED, addJob hit the one-pending-followup unique index, and it
 *     handed back that STALE row as if it were the new one, so a customer who
 *     had just replied was still nudged at the old time;
 *   - the "Stop chasing" action (set_followups, value:false) audited
 *     followups_stopped and returned ok:true while the follow-up kept running.
 * Mirrored on setJobStatus (3 Sep) for the same reason: fail loud so the
 * callers that already catch and audit (reconcile_failed_after_send,
 * manual_followup_not_recorded) or the actions route's top-level handler can
 * see the real failure instead of a false ok.
 */
type Call = { filters: Record<string, unknown> };

describe('SupabaseStore.cancelJobsFor', () => {
  const calls: Call[] = [];
  let failWith: string | null = null;
  let selectedRows: { id: string }[] = [];

  function chain(call: Call) {
    const q: Record<string, unknown> = {};
    const self = (k: string, v: unknown) => { call.filters[k] = v; return q; };
    q.update = (v: unknown) => self('update', v);
    q.eq = (k: string, v: unknown) => self(`eq:${k}`, v);
    q.in = (k: string, v: unknown) => self(`in:${k}`, v);
    q.select = () => {
      if (failWith) return Promise.resolve({ data: null, error: { message: failWith } });
      return Promise.resolve({ data: selectedRows, error: null });
    };
    return q;
  }

  jest.mock('@/lib/supabase', () => ({
    getSupabase: () => ({
      from: (table: string) => {
        const call: Call = { filters: { table } };
        calls.push(call);
        return chain(call);
      },
    }),
  }));

  beforeEach(() => { calls.length = 0; failWith = null; selectedRows = []; });

  it('returns the cancelled count on success', async () => {
    selectedRows = [{ id: 'j1' }, { id: 'j2' }];
    const { SupabaseStore } = await import('@/lib/will/store-supabase');
    const store = new SupabaseStore();
    await expect(store.cancelJobsFor('c1', ['FOLLOW_UP'])).resolves.toBe(2);
  });

  it('throws instead of reporting 0 cancelled when the UPDATE errors', async () => {
    failWith = 'connection reset';
    const { SupabaseStore } = await import('@/lib/will/store-supabase');
    const store = new SupabaseStore();
    await expect(store.cancelJobsFor('c1', ['FOLLOW_UP'])).rejects.toThrow(
      /cancelJobsFor failed: connection reset/,
    );
  });
});
