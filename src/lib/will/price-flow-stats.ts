// ============================================================
// The price message A/B result (Jo, 18 Nov): which version leads to more payments.
//
//   A ("old")  one message: price, what is included, bank details, guarantee.
//   B ("new")  two messages: the steps first, bank details only after a "yes".
//
// A customer counts for the version of the FIRST price message they received
// (the audit row `instant_price_sent` carries it). Paid is the customer's own
// paid flag. Customers who got their price some other way are not counted.
// ============================================================
import type { AuditRow, CustomerRow } from './store';

export interface PriceFlowSide { sent: number; paid: number; rate: number | null }
export interface PriceFlowStats { a: PriceFlowSide; b: PriceFlowSide; enough: boolean; minPerSide: number }

/** Below this many customers per version the difference is not worth reading. */
export const PRICE_FLOW_MIN_PER_SIDE = 30;

export function priceFlowStats(audit: AuditRow[], customers: CustomerRow[]): PriceFlowStats {
  const firstVariant = new Map<string, { at: string; variant: 'old' | 'new' }>();
  for (const row of audit) {
    if (row.action !== 'instant_price_sent') continue;
    const d = row.detail as { customerId?: unknown; priceFlow?: unknown } | null;
    if (!d || typeof d.customerId !== 'string') continue;
    const variant = d.priceFlow === 'new' ? 'new' : d.priceFlow === 'old' ? 'old' : null;
    if (!variant) continue;
    const seen = firstVariant.get(d.customerId);
    if (!seen || row.at < seen.at) firstVariant.set(d.customerId, { at: row.at, variant });
  }
  const paidById = new Map(customers.map((c) => [c.id, c.paid === true]));
  const side = (v: 'old' | 'new'): PriceFlowSide => {
    let sent = 0, paid = 0;
    for (const [id, f] of firstVariant) {
      if (f.variant !== v || !paidById.has(id)) continue;
      sent++;
      if (paidById.get(id)) paid++;
    }
    return { sent, paid, rate: sent > 0 ? Math.round((paid / sent) * 1000) / 10 : null };
  };
  const a = side('old'), b = side('new');
  return { a, b, enough: a.sent >= PRICE_FLOW_MIN_PER_SIDE && b.sent >= PRICE_FLOW_MIN_PER_SIDE, minPerSide: PRICE_FLOW_MIN_PER_SIDE };
}
