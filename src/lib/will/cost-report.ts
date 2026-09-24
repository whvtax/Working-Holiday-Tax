// ============================================================
// The bill itself: Anthropic's organisation cost report (Admin API).
//
// Needs ANTHROPIC_ADMIN_API_KEY (an Admin key from the Console, not the
// ordinary API key). Returns daily USD amounts for the whole organisation,
// which is what the invoice is built from. Without the key this returns
// { available: false } and the card shows the ledger alone.
//
// GET https://api.anthropic.com/v1/organizations/cost_report
//   starting_at (RFC 3339, required), ending_at, bucket_width=1d, limit<=31,
//   page=<next_page>. amount is a decimal STRING in USD.
// ============================================================

export interface CostReportDay { day: string; usd: number }
export interface CostReport {
  available: boolean;
  error?: string;
  days: CostReportDay[];
  /** Sum of the days returned. */
  totalUsd: number;
  fetchedAt: string;
}

interface Bucket { starting_at: string; ending_at: string; results: { amount: string; currency: string }[] }

export function sumBuckets(buckets: Bucket[]): CostReportDay[] {
  const out: CostReportDay[] = [];
  for (const b of buckets) {
    let usd = 0;
    for (const r of b.results ?? []) {
      if (r.currency && r.currency !== 'USD') continue;
      const v = Number(r.amount); if (Number.isFinite(v)) usd += v;
    }
    out.push({ day: b.starting_at.slice(0, 10), usd: Math.round(usd * 100) / 100 });
  }
  return out.sort((a, b) => a.day.localeCompare(b.day));
}

export async function fetchCostReport(startingAtIso: string, endingAtIso?: string): Promise<CostReport> {
  // An Admin key when there is one. Otherwise the ordinary key: per the docs a
  // personal key that is not scoped to a workspace is accepted by the Admin
  // API too, so on most accounts this works with no extra setup. An
  // individual (non-organisation) account has no Admin API at all; Anthropic
  // answers 401/403 and the card says so.
  const key = process.env.ANTHROPIC_ADMIN_API_KEY || process.env.ANTHROPIC_API_KEY;
  const fetchedAt = new Date().toISOString();
  if (!key) return { available: false, days: [], totalUsd: 0, fetchedAt, error: 'no API key is set' };
  const buckets: Bucket[] = [];
  let page: string | undefined;
  try {
    for (let i = 0; i < 6; i++) {
      const qs = new URLSearchParams({ starting_at: startingAtIso, bucket_width: '1d', limit: '31' });
      if (endingAtIso) qs.set('ending_at', endingAtIso);
      if (page) qs.set('page', page);
      const res = await fetch(`https://api.anthropic.com/v1/organizations/cost_report?${qs}`, {
        headers: { 'x-api-key': key, 'anthropic-version': '2023-06-01' },
        signal: AbortSignal.timeout(15_000),
      });
      if (!res.ok) {
        const text = await res.text().catch(() => '');
        const why = res.status === 401 || res.status === 403
          ? (process.env.ANTHROPIC_ADMIN_API_KEY
            ? 'Anthropic refused the Admin key'
            : 'your API key cannot read the bill (individual account, or a key scoped to a workspace); an Admin key or an organisation account is needed')
          : `cost report ${res.status}: ${text.slice(0, 160)}`;
        return { available: false, days: [], totalUsd: 0, fetchedAt, error: why };
      }
      const data = await res.json() as { data?: Bucket[]; has_more?: boolean; next_page?: string };
      buckets.push(...(data.data ?? []));
      if (!data.has_more || !data.next_page) break;
      page = data.next_page;
    }
  } catch (e) {
    return { available: false, days: [], totalUsd: 0, fetchedAt, error: (e as Error).message };
  }
  const days = sumBuckets(buckets);
  return { available: true, days, totalUsd: Math.round(days.reduce((s, d) => s + d.usd, 0) * 100) / 100, fetchedAt };
}
