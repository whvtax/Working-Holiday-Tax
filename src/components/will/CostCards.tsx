'use client';
// ============================================================
// The money, the way the Anthropic Console shows it (Jo, 24 Sep: "like the
// original Claude"): Spend this month, Prompt caching, Token volume, and a
// month-by-month chart. Exact numbers only. The bill (Admin API cost report)
// is the headline when the key is set; the ledger (our own token accounting,
// priced at list) is the breakdown, and the headline when there is no key.
// ============================================================
import type { UsageSummary } from '@/lib/will/ai-usage';
import type { CostReport } from '@/lib/will/cost-report';

const usd = (n: number) => `$${n.toFixed(2)}`;
const compact = (n: number) => n >= 1_000_000 ? `${(n / 1_000_000).toFixed(1)}M` : n >= 1000 ? `${(n / 1000).toFixed(1)}K` : String(n);
const monthLabel = (m: string) => new Date(`${m}-01T00:00:00Z`).toLocaleString('en-AU', { month: 'short', year: '2-digit', timeZone: 'UTC' });

function Bars({ values, color = '#1f8a5b', height = 44 }: { values: number[]; color?: string; height?: number }) {
  const max = Math.max(1, ...values);
  const w = 9, gap = 3;
  return (
    <svg width={values.length * (w + gap)} height={height} aria-hidden>
      {values.map((v, i) => {
        const h = Math.max(2, Math.round((v / max) * (height - 4)));
        return <rect key={i} x={i * (w + gap)} y={height - h} width={w} height={h} rx={2} fill={i === values.length - 1 ? color : '#c9d3cd'} />;
      })}
    </svg>
  );
}

export default function CostCards({ ledger, bill }: { ledger: UsageSummary; bill: CostReport }) {
  const now = new Date();
  const thisMonth = `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, '0')}`;
  const billThisMonth = bill.available ? bill.days.filter((d) => d.day.startsWith(thisMonth)).reduce((s, d) => s + d.usd, 0) : null;
  const ledgerThisMonth = ledger.byMonth.find((m) => m.month === thisMonth)?.usd ?? 0;
  const headline = billThisMonth != null ? billThisMonth : ledgerThisMonth;

  // last 7 days, oldest first, zero-filled
  const days: string[] = [];
  for (let i = 6; i >= 0; i--) { const d = new Date(now); d.setUTCDate(d.getUTCDate() - i); days.push(d.toISOString().slice(0, 10)); }
  const byDay = new Map(ledger.byDay.map((d) => [d.day, d]));
  const tokens7 = days.map((d) => byDay.get(d)?.tokens ?? 0);
  const cache7 = days.map((d) => byDay.get(d)?.cacheRead ?? 0);
  const total7 = tokens7.reduce((s, n) => s + n, 0);
  const cacheSaved7 = (() => {
    // saved over 7 days, at the window's blended rate
    const cr = cache7.reduce((s, n) => s + n, 0);
    const crAll = ledger.byDay.reduce((s, d) => s + d.cacheRead, 0);
    return crAll ? (ledger.cacheSavedUsd * cr) / crAll : 0;
  })();

  // monthly chart: bill months when available, else ledger months
  const months: { month: string; usd: number }[] = bill.available
    ? Object.entries(bill.days.reduce<Record<string, number>>((acc, d) => { const m = d.day.slice(0, 7); acc[m] = (acc[m] ?? 0) + d.usd; return acc; }, {}))
        .map(([month, v]) => ({ month, usd: Math.round(v * 100) / 100 })).sort((a, b) => a.month.localeCompare(b.month))
    : ledger.byMonth.map((m) => ({ month: m.month, usd: m.usd }));

  return (
    <div className="costcards">
      <div className="costcard">
        <div className="cc-head"><span>Spend this month</span><span className="cc-pill">{bill.available ? 'from your Anthropic bill' : 'measured from tokens'}</span></div>
        <div className="cc-big">{usd(headline)}</div>
        <div className="cc-sub">
          {bill.available
            ? `Will's own calls: ${usd(ledgerThisMonth)} · resets on the 1st`
            : `Invoice figure unavailable: ${bill.error ?? 'unknown'}`}
        </div>
      </div>

      <div className="costcard">
        <div className="cc-head"><span>Prompt caching</span><span className="cc-pill">{ledger.cacheHitRate}% hit rate</span></div>
        <div className="cc-big">~{usd(cacheSaved7)}</div>
        <div className="cc-sub">saved last 7 days</div>
        <div className="cc-spark"><Bars values={cache7} color="#2a6fd6" height={36} /></div>
      </div>

      <div className="costcard">
        <div className="cc-head"><span>Token volume</span></div>
        <div className="cc-big">{compact(total7)}</div>
        <div className="cc-sub">last 7 days</div>
        <div className="cc-spark"><Bars values={tokens7} height={36} /></div>
      </div>

      <div className="costcard costcard-wide">
        <div className="cc-head"><span>Paid to Claude, by month</span><span className="cc-pill">{bill.available ? 'invoice figures' : 'measured from tokens'}</span></div>
        {months.length === 0 ? (
          <div className="cc-sub">Nothing recorded yet. The ledger starts with the first call after this deploy.</div>
        ) : (
          <div className="cc-months">
            {months.map((m) => {
              const max = Math.max(1, ...months.map((x) => x.usd));
              return (
                <div key={m.month} className="cc-month">
                  <div className="cc-month-bar" style={{ height: `${Math.max(3, Math.round((m.usd / max) * 90))}px` }} />
                  <div className="cc-month-usd">{usd(m.usd)}</div>
                  <div className="cc-month-label">{monthLabel(m.month)}</div>
                </div>
              );
            })}
          </div>
        )}
        {ledger.byFeature.length > 0 && (
          <div className="cc-features">
            {ledger.byFeature.map((f) => (
              <div key={f.feature} className="costrow"><span>{FEATURE_LABEL[f.feature] ?? f.feature} <small>({f.calls} calls, {compact(f.inputTokens + f.outputTokens)} tokens)</small></span><b>{usd(f.usd)}</b></div>
            ))}
            {ledger.unpricedCalls > 0 && <div className="cc-sub">{ledger.unpricedCalls} calls used a model with no price on file; their tokens are counted, their cost is not. Add it via AI_PRICES_JSON.</div>}
            <div className="cc-sub">Breakdown over the last 92 days, from Will's own ledger.</div>
          </div>
        )}
      </div>
    </div>
  );
}

const FEATURE_LABEL: Record<string, string> = {
  decide: 'Will replies (decisions)', reviewer: 'Second-look reviewer', mining: 'Nightly Library mining',
  vision: 'Reading screenshots', assistant: 'Ask Will', suggest: 'Suggested replies', lost_leads: 'Lost-lead analysis', other: 'Other',
};
