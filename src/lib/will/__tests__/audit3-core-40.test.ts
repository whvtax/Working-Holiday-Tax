/**
 * Audit 3, lane core, unverified finding 40 (5 Sep): bumpCounter fails closed
 * on ANY rpc error, so "the AI budget is exhausted" used to mean two very
 * different things: a real spend cap being hit, or the will_bump_counter
 * function being unreachable (migration 029 not run, a transient Supabase
 * error, a search_path issue). Both must still hand the conversation to a
 * human unchanged — that part is untouched — but the operator was always
 * told "raise the ai_daily_budget setting", which is wrong advice when the
 * budget was never the problem.
 *
 * Pinned here:
 *  - store-supabase.ts exports an additive bumpCounterUnavailable() that is
 *    true only when the last recorded persist error came from bumpCounter
 *    itself, not from a real "already spent" result;
 *  - service.ts's decideAndAct audits 'ai_budget_unavailable' (with the RPC
 *    error text) instead of 'ai_budget_exhausted' when that is the case,
 *    while the human handoff (task reason, severity, suggested reply) is
 *    byte-identical either way;
 *  - system-report.ts has a fault rule for the new audit action so the
 *    System & Costs card names the real cause instead of the budget.
 */
import * as sb from '@/lib/will/store-supabase';

type Mutable = { lastPersistError: string | null };

describe('bumpCounterUnavailable (core-40)', () => {
  afterEach(() => {
    (sb as unknown as Mutable).lastPersistError = null;
  });

  it('is false when nothing has failed', () => {
    expect(sb.bumpCounterUnavailable()).toBe(false);
  });

  it('is false when the last recorded error came from something else entirely', () => {
    (sb as unknown as Mutable).lastPersistError = 'pageAll will_customers: timeout';
    expect(sb.bumpCounterUnavailable()).toBe(false);
  });

  it('is true when the last recorded error came from bumpCounter itself (RPC missing/broken)', () => {
    (sb as unknown as Mutable).lastPersistError = 'bumpCounter: function will_bump_counter does not exist';
    expect(sb.bumpCounterUnavailable()).toBe(true);
  });
});

describe('decideAndAct budget-exhausted audit (core-40, source shape)', () => {
  const fs = require('fs');
  const path = require('path');
  const src = fs.readFileSync(path.join(__dirname, '..', 'service.ts'), 'utf8');

  it('imports bumpCounterUnavailable from store-supabase', () => {
    expect(src).toMatch(/bumpCounterUnavailable/);
  });

  it('audits ai_budget_unavailable (not ai_budget_exhausted) when the RPC itself failed', () => {
    expect(src).toMatch(/'ai_budget_unavailable'/);
    expect(src).toMatch(/unavailable\s*\?\s*'ai_budget_unavailable'\s*:\s*'ai_budget_exhausted'/);
  });

  it('captures the distinguishing flag before raiseOrUpdateTask makes its own store calls', () => {
    const idx = src.indexOf('bumpCounterUnavailable()');
    const taskIdx = src.indexOf('raiseOrUpdateTask(store, customer, {\n      reason: \'Daily AI limit reached');
    expect(idx).toBeGreaterThan(-1);
    expect(taskIdx).toBeGreaterThan(-1);
    expect(idx).toBeLessThan(taskIdx);
  });

  it('does not change the human handoff itself: same reason, severity and reply source', () => {
    expect(src).toMatch(/reason:\s*'Daily AI limit reached, please reply to this customer manually'/);
    expect(src).toMatch(/severity:\s*'REVIEW'/);
    expect(src).toMatch(/suggestReply\(text, customer, 'budget'\)/);
  });
});

describe('system-report fault rule for ai_budget_unavailable (core-40, source shape)', () => {
  const fs = require('fs');
  const path = require('path');
  const src = fs.readFileSync(path.join(__dirname, '..', 'system-report.ts'), 'utf8');

  it('adds a distinct fault rule alongside the existing ai_budget_exhausted one', () => {
    expect(src).toMatch(/key:\s*'ai_budget_unavailable'/);
    expect(src).toMatch(/is\('policy_guard',\s*'ai_budget_unavailable'\)/);
    expect(src).toMatch(/key:\s*'ai_budget_exhausted'/); // unchanged, still present
  });
});

describe('schemaHealth probes will_bump_counter (core-40, source shape)', () => {
  const fs = require('fs');
  const path = require('path');
  const src = fs.readFileSync(path.join(__dirname, '..', 'store-supabase.ts'), 'utf8');

  it('probes the RPC under a dedicated key that can never report the real day as spent', () => {
    expect(src).toMatch(/will_bump_counter'[^\n]*=>\s*this\.sb\(\)\.rpc\('will_bump_counter'/);
    expect(src).toMatch(/p_key:\s*'schema_probe'/);
  });
});
