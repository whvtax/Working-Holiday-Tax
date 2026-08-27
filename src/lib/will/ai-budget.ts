// ============================================================
// The daily paid-AI spend ceiling, in one place.
//
// This used to live inside service.ts. It moved here unchanged so that a
// BACKGROUND job can spend against the same counter as the live reply path
// without importing service.ts — service.ts imports the scheduler, and the
// scheduler now runs the lost-lead analysis, so an import back into service.ts
// would close a cycle. Same key, same limit, same atomic function: one budget,
// not two that drift.
//
// service.ts re-exports the names below, so every existing importer
// (/api/will/system, the dashboard's cost card) keeps working untouched.
// ============================================================
import { getStore } from './store';

// COST-01: a soft global ceiling on paid AI calls per day. Configurable via
// the 'ai_daily_budget' setting; defaults high enough to never bother real
// traffic (5k customers/yr) but caps a runaway/abuse spend.
export const DEFAULT_AI_DAILY_BUDGET = 3000;

/** The counter key today's paid calls are counted against. Exported so the
 *  System & Costs card reads exactly the same key this spends against — a
 *  second copy of `toISOString().slice(0,10)` elsewhere would silently report a
 *  different day the moment either side changed its mind about timezones. */
export const aiCallsKeyPrefix = 'ai_calls:';
export const aiCallsKeyFor = (d: Date = new Date()) => aiCallsKeyPrefix + d.toISOString().slice(0, 10);

/** Today's cap, from the 'ai_daily_budget' setting.
 *  An explicit 0 means "stop spending", and must not be swallowed by `||`:
 *  the old expression turned a deliberate 0 back into the 3000 default, so the
 *  budget could not be used as an off switch. Exported so the dashboard shows
 *  the number this actually spends against rather than its own guess. */
export function resolveAiDailyBudget(raw: unknown): number {
  const configured = Number(raw);
  return raw != null && Number.isFinite(configured) && configured >= 0
    ? configured
    : DEFAULT_AI_DAILY_BUDGET;
}

/** Returns TRUE when today's budget is already spent — the caller must NOT make
 *  the paid call. Returns FALSE when a slot was reserved for this caller. */
export async function aiBudgetExhausted(): Promise<boolean> {
  const store = getStore();
  const budget = resolveAiDailyBudget(await store.getSetting('ai_daily_budget'));
  if (budget === 0) return true;

  const key = aiCallsKeyFor();

  // Atomic path (migration 029). The previous read-then-write advanced the
  // counter by ~1 instead of N under concurrency, because every serverless
  // instance read the same value before any of them wrote. That made the daily
  // cap ineffective on exactly the path it exists to protect: a paid model call
  // triggered by anyone who sends a WhatsApp message to the business number.
  if (typeof store.bumpCounter === 'function') return store.bumpCounter(key, budget);

  // Fallback for the dev file store, which is single-process by definition.
  const used = Number((await store.getSetting(key)) ?? 0);
  if (used >= budget) return true;
  await store.setSetting(key, used + 1);
  return false;
}
