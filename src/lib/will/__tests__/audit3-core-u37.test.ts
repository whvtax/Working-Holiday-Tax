/**
 * audit3 core unverified #37: a failed lost-lead post-mortem upsert used to
 * be swallowed silently.
 *
 * upsertLostAnalysis() recorded the Supabase error in lastPersistError but
 * resolved normally, so the nightly job's .catch(...) that logs
 * 'lost_analysis_store_failed' could never fire, and the pass kept spending
 * paid model calls on the rest of the batch even though nothing was being
 * stored. Pinned here:
 *  - upsertLostAnalysis now throws when Supabase reports an error;
 *  - runLostLeadAnalysis logs 'lost_analysis_store_failed' and stops the
 *    batch (marks the pass incomplete) instead of moving on to the next lead.
 */

type Audit3Core37Call = { table: string; op: string; args: unknown[] };

describe('SupabaseStore.upsertLostAnalysis', () => {
  const calls: Audit3Core37Call[] = [];
  let upsertError: { message: string } | null = null;

  function chain(table: string) {
    const q: Record<string, unknown> = {};
    q.upsert = (...a: unknown[]) => {
      calls.push({ table, op: 'upsert', args: a });
      return Promise.resolve({ data: null, error: upsertError });
    };
    return q;
  }

  jest.mock('@/lib/supabase', () => ({ getSupabase: () => ({ from: (t: string) => chain(t) }) }));

  beforeEach(() => { calls.length = 0; upsertError = null; jest.resetModules(); });

  const row = {
    customerId: 'c1', state: 'PRICE_SENT', triggerKind: 'silent', quietDays: 10,
    hoursPriceToSilence: null, status: 'OK', error: null, attempts: 1, reason: 'r',
    category: 'price', shouldHaveDone: 's', fault: 'NOT_OURS', recoverable: 'NO',
    recoveryAction: null, recoveryMessage: null, evidenceQuote: null, confidence: 0.5,
    analysedAt: '2026-09-05T00:00:00.000Z',
  } as const;

  it('resolves quietly on success, same as before', async () => {
    const mod = await import('@/lib/will/store-supabase');
    const store = new mod.SupabaseStore();
    await expect(store.upsertLostAnalysis(row as never)).resolves.toBeUndefined();
    expect(mod.lastPersistError).toBeNull();
  });

  it('now throws (instead of silently swallowing) when Supabase reports an error', async () => {
    upsertError = { message: 'permission denied for table will_lost_analysis' };
    const mod = await import('@/lib/will/store-supabase');
    const store = new mod.SupabaseStore();
    // Supabase's error is a plain object, not an Error instance, so assert
    // on the rejection's shape rather than jest's Error-typed toThrow().
    await expect(store.upsertLostAnalysis(row as never)).rejects.toMatchObject({
      message: expect.stringContaining('permission denied'),
    });
    expect(mod.lastPersistError).toBe('upsertLostAnalysis: permission denied for table will_lost_analysis');
  });
});

describe('runLostLeadAnalysis stops the batch when storing a verdict fails', () => {
  const store = {
    getSetting: jest.fn(),
    setSetting: jest.fn(),
    allCustomers: jest.fn(),
    listLostAnalyses: jest.fn(),
    listMessages: jest.fn(),
    history: jest.fn(),
    upsertLostAnalysis: jest.fn(),
    audit: jest.fn(),
  };
  jest.mock('@/lib/will/store', () => ({ getStore: () => store }));
  jest.mock('@/lib/will/ai-budget', () => ({ aiBudgetExhausted: () => Promise.resolve(false) }));
  jest.mock('@/lib/will/lost-leads', () => ({
    selectLostLeads: (customers: { id: string; state: string }[]) =>
      customers.map((c) => ({ customer: c })),
    leadTiming: () => ({
      priceSentAt: '2026-09-01T00:00:00.000Z', lastCustomerMsgAt: '2026-09-01T00:00:00.000Z',
      hoursPriceToSilence: 96, repliesAfterPrice: 0, ourMessagesAfterTheirLastWord: 1, quietDays: 10,
    }),
    lostVerdict: () => ({ trigger: 'silent', why: 'went quiet' }),
    TRIGGER_LABELS: { silent: 'Went quiet' },
  }));
  jest.mock('@/lib/will/claude', () => ({
    analyseLostLead: async () => ({
      reason: 'r', category: 'price', shouldHaveDone: 's', fault: 'NOT_OURS',
      recoverable: 'NO', recoveryAction: null, recoveryMessage: null,
      evidenceQuote: null, confidence: 0.5,
    }),
  }));
  jest.mock('@/lib/will/digest', () => ({
    redactSensitive: (s: string) => s,
    shortLabel: () => 'C',
  }));

  beforeEach(() => {
    for (const fn of Object.values(store)) (fn as jest.Mock).mockReset();
    store.getSetting.mockResolvedValue(null);
    store.setSetting.mockResolvedValue(undefined);
    store.allCustomers.mockResolvedValue([{ id: 'a', state: 'PRICE_SENT' }, { id: 'b', state: 'PRICE_SENT' }]);
    store.listLostAnalyses.mockResolvedValue([]);
    store.listMessages.mockResolvedValue([]);
    store.history.mockResolvedValue([]);
    store.audit.mockResolvedValue(undefined);
  });

  it('logs lost_analysis_store_failed and does not spend on the next lead', async () => {
    store.upsertLostAnalysis.mockRejectedValue(new Error('permission denied'));
    const { runLostLeadAnalysis } = await import('@/lib/will/lost-analysis');
    const outcome = await runLostLeadAnalysis(Date.now(), 60_000);

    expect(store.upsertLostAnalysis).toHaveBeenCalledTimes(1);
    expect(store.audit).toHaveBeenCalledWith('nightly', 'lost_analysis_store_failed', expect.objectContaining({
      customerId: 'a', error: expect.stringContaining('permission denied'),
    }));
    expect(outcome).toBe('incomplete');
    // The day key must not be written on an incomplete pass, so tonight's
    // remaining leads are retried rather than skipped until tomorrow.
    expect(store.setSetting).not.toHaveBeenCalledWith('lost_analysis_last_day', expect.anything());
  });
});
