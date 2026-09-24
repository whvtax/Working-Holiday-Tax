// ============================================================
// Exact Claude usage and cost (Jo, 24 Sep: "I want it exact, not ≈").
//
// Two sources, shown side by side on the System & Costs card:
//
//  1. THE LEDGER (this file + migration 042). Every paid call records the exact
//     token counts Anthropic returned, per feature and model, and the cost at
//     the published price list. This is what gives "how much does one Will
//     decision cost" and "what did the nightly mining cost this month".
//
//  2. THE BILL (cost-report.ts). With an Admin API key in the environment, the
//     organisation's own cost report is fetched: the number that ends up on
//     the invoice. It covers everything under the account, not just Will.
//
// Prices are per million tokens in US dollars, from platform.claude.com/docs/
// en/about-claude/pricing (read 24 Sep 2026). A model missing from the table
// records its tokens with cost NULL and the card says so, rather than
// inventing a figure. Override or extend without a deploy through
// AI_PRICES_JSON = {"claude-x":{"in":..,"out":..,"cacheWrite":..,"cacheRead":..}}.
// ============================================================
import { getStore } from './store';

export interface ModelPrice { in: number; out: number; cacheWrite: number; cacheRead: number }

export const MODEL_PRICES_USD_PER_MTOK: Record<string, ModelPrice> = {
  'claude-fable-5-1':  { in: 10, out: 50, cacheWrite: 12.5,  cacheRead: 0.25 },
  'claude-mythos-5-1': { in: 10, out: 50, cacheWrite: 12.5,  cacheRead: 0.25 },
  'claude-opus-5-5':   { in: 4,  out: 20, cacheWrite: 5,     cacheRead: 0.20 },
  'claude-sonnet-5':   { in: 2,  out: 10, cacheWrite: 2.5,   cacheRead: 0.20 },
  'claude-haiku-4-5':  { in: 1,  out: 5,  cacheWrite: 1.25,  cacheRead: 0.10 },
  'claude-fable-5':    { in: 10, out: 50, cacheWrite: 12.5,  cacheRead: 1 },
  'claude-mythos-5':   { in: 10, out: 50, cacheWrite: 12.5,  cacheRead: 1 },
  'claude-opus-5':     { in: 5,  out: 25, cacheWrite: 6.25,  cacheRead: 0.50 },
  'claude-opus-4-8':   { in: 5,  out: 25, cacheWrite: 6.25,  cacheRead: 0.50 },
  'claude-sonnet-4-6': { in: 3,  out: 15, cacheWrite: 3.75,  cacheRead: 0.30 },
  'claude-sonnet-4-5': { in: 3,  out: 15, cacheWrite: 3.75,  cacheRead: 0.30 },
  'claude-opus-4-1':   { in: 15, out: 75, cacheWrite: 18.75, cacheRead: 1.50 },
};

function priceTable(): Record<string, ModelPrice> {
  const raw = process.env.AI_PRICES_JSON;
  if (!raw) return MODEL_PRICES_USD_PER_MTOK;
  try {
    const extra = JSON.parse(raw) as Record<string, ModelPrice>;
    return { ...MODEL_PRICES_USD_PER_MTOK, ...extra };
  } catch { return MODEL_PRICES_USD_PER_MTOK; }
}

/** "claude-sonnet-4-5-20250929" and "claude-sonnet-4-5" price the same. */
export function priceFor(model: string): ModelPrice | null {
  const table = priceTable();
  if (table[model]) return table[model];
  const stripped = model.replace(/-\d{8}$/, '');
  if (table[stripped]) return table[stripped];
  // longest known key that the model name starts with
  const key = Object.keys(table).filter((k) => model.startsWith(k)).sort((a, b) => b.length - a.length)[0];
  return key ? table[key] : null;
}

export interface TokenUsage { input: number; output: number; cacheWrite: number; cacheRead: number }

/** Exact cost in USD for one call, or null when the model is unpriced. */
export function costUsd(model: string, u: TokenUsage): number | null {
  const p = priceFor(model);
  if (!p) return null;
  const usd = (u.input * p.in + u.output * p.out + u.cacheWrite * p.cacheWrite + u.cacheRead * p.cacheRead) / 1_000_000;
  return Math.round(usd * 1_000_000) / 1_000_000;
}

/** Read the token counts off a Messages API response body. Missing fields are 0. */
export function usageFromResponse(data: unknown): TokenUsage {
  const u = (data as { usage?: Record<string, unknown> } | null)?.usage ?? {};
  const n = (k: string) => { const v = Number(u[k]); return Number.isFinite(v) && v > 0 ? Math.round(v) : 0; };
  return { input: n('input_tokens'), output: n('output_tokens'), cacheWrite: n('cache_creation_input_tokens'), cacheRead: n('cache_read_input_tokens') };
}

export type AiFeature = 'decide' | 'reviewer' | 'mining' | 'vision' | 'assistant' | 'suggest' | 'lost_leads' | 'other';

export interface AiUsageRow {
  id?: string; at: string; feature: AiFeature | string; model: string;
  inputTokens: number; outputTokens: number; cacheWriteTokens: number; cacheReadTokens: number;
  costUsd: number | null; customerId?: string | null;
}

/** Record one paid call. Fire-and-forget at every call site: a ledger failure
 *  must never fail the customer-facing call it describes. */
export function recordAiUsage(feature: AiFeature, model: string, data: unknown, customerId?: string | null): void {
  try {
    const u = usageFromResponse(data);
    if (u.input + u.output + u.cacheWrite + u.cacheRead === 0) return;
    const store = getStore();
    if (!store.addAiUsage) return;
    const modelUsed = (data as { model?: string } | null)?.model || model;
    void store.addAiUsage({
      at: new Date().toISOString(), feature, model: modelUsed,
      inputTokens: u.input, outputTokens: u.output, cacheWriteTokens: u.cacheWrite, cacheReadTokens: u.cacheRead,
      costUsd: costUsd(modelUsed, u), customerId: customerId ?? null,
    }).catch(() => undefined);
  } catch { /* never */ }
}

// ────────────────────────────────────────────────────────────
// Summaries for the card and the chart. Pure.
// ────────────────────────────────────────────────────────────

export interface UsageSummary {
  /** Sum of every priced call in the window. */
  totalUsd: number;
  calls: number;
  /** Calls whose model had no price on file (tokens known, cost unknown). */
  unpricedCalls: number;
  byFeature: { feature: string; calls: number; usd: number; inputTokens: number; outputTokens: number }[];
  byDay: { day: string; usd: number; calls: number; tokens: number; cacheRead: number; uncachedInput: number }[];
  byMonth: { month: string; usd: number; calls: number }[];
  /** Prompt caching over the whole window: share of input that was served
   *  from cache, and what that saved against paying full input price. */
  cacheHitRate: number;
  cacheSavedUsd: number;
}

const dayOf = (iso: string, tz: string) => new Intl.DateTimeFormat('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit', timeZone: tz }).format(new Date(iso));

export function summariseUsage(rows: AiUsageRow[], tz = 'Australia/Melbourne'): UsageSummary {
  const feat = new Map<string, { calls: number; usd: number; inputTokens: number; outputTokens: number }>();
  const day = new Map<string, { usd: number; calls: number; tokens: number; cacheRead: number; uncachedInput: number }>();
  let cacheRead = 0, uncachedInput = 0, cacheSaved = 0;
  const month = new Map<string, { usd: number; calls: number }>();
  let totalUsd = 0, unpriced = 0;
  for (const r of rows) {
    const usd = r.costUsd ?? 0;
    if (r.costUsd == null) unpriced++;
    totalUsd += usd;
    const f = feat.get(r.feature) ?? { calls: 0, usd: 0, inputTokens: 0, outputTokens: 0 };
    f.calls++; f.usd += usd; f.inputTokens += r.inputTokens; f.outputTokens += r.outputTokens; feat.set(r.feature, f);
    const d = dayOf(r.at, tz);
    const dd = day.get(d) ?? { usd: 0, calls: 0, tokens: 0, cacheRead: 0, uncachedInput: 0 };
    dd.usd += usd; dd.calls++; dd.tokens += r.inputTokens + r.outputTokens + r.cacheWriteTokens + r.cacheReadTokens;
    dd.cacheRead += r.cacheReadTokens; dd.uncachedInput += r.inputTokens + r.cacheWriteTokens; day.set(d, dd);
    cacheRead += r.cacheReadTokens; uncachedInput += r.inputTokens + r.cacheWriteTokens;
    const p = priceFor(r.model);
    if (p) cacheSaved += (r.cacheReadTokens * (p.in - p.cacheRead)) / 1_000_000;
    const m = d.slice(0, 7);
    const mm = month.get(m) ?? { usd: 0, calls: 0 }; mm.usd += usd; mm.calls++; month.set(m, mm);
  }
  const r2 = (n: number) => Math.round(n * 100) / 100;
  return {
    totalUsd: r2(totalUsd), calls: rows.length, unpricedCalls: unpriced,
    byFeature: [...feat.entries()].map(([feature, v]) => ({ feature, calls: v.calls, usd: r2(v.usd), inputTokens: v.inputTokens, outputTokens: v.outputTokens })).sort((a, b) => b.usd - a.usd),
    byDay: [...day.entries()].map(([d, v]) => ({ day: d, usd: r2(v.usd), calls: v.calls, tokens: v.tokens, cacheRead: v.cacheRead, uncachedInput: v.uncachedInput })).sort((a, b) => a.day.localeCompare(b.day)),
    byMonth: [...month.entries()].map(([m, v]) => ({ month: m, usd: r2(v.usd), calls: v.calls })).sort((a, b) => a.month.localeCompare(b.month)),
    cacheHitRate: cacheRead + uncachedInput > 0 ? Math.round((cacheRead / (cacheRead + uncachedInput)) * 100) : 0,
    cacheSavedUsd: r2(cacheSaved),
  };
}
