// ============================================================
// NOTHING AFTER A NO (Jo, 30 Oct).
//
// About twelve chats: fu_pre_24h/3d/7d and the winback arrived after "not
// interested", "gone with someone else", "I'll pass", "I'll do it myself",
// and a counter pitch followed "no thanks". Rule: when a customer who has not
// paid says they are leaving, EVERYTHING queued for them is cancelled, nothing
// new is ever scheduled, no winback is made, and the lead is closed.
//
// Idempotent and best effort: every step is attempted, none can throw.
// ============================================================
import type { CustomerRow, Store } from './store';
import { readWinbacks, WINBACKS_SETTING } from './winbacks';

type CloseStore = Pick<Store, 'cancelJobsFor' | 'setSetting' | 'getSetting' | 'setState' | 'audit'>;

const SALES: CustomerRow['state'][] = ['NEW_LEAD', 'QUALIFIED', 'PRICE_SENT', 'PAYMENT_PENDING'];
/** Job kinds that can still reach a customer who has said no. */
export const SALES_JOB_KINDS = ['FOLLOW_UP', 'AUTO_CLOSE', 'WINBACK', 'HANDOFF_BUMP'] as const;

export async function closeLeadAfterNo(
  store: CloseStore,
  customer: Pick<CustomerRow, 'id' | 'state' | 'paid'>,
  evidence: string,
): Promise<{ closed: boolean; cancelled: number }> {
  if (customer.paid) return { closed: false, cancelled: 0 };
  let cancelled = 0;
  try { cancelled = await store.cancelJobsFor(customer.id, [...SALES_JOB_KINDS]); } catch { /* keep going */ }
  // The winback pass reads this row: decision "never" ends the lead at Final
  // instead of messaging it in 30 days.
  try {
    const all = await readWinbacks(store as unknown as Store);
    const now = new Date().toISOString();
    all[customer.id] = { ...(all[customer.id] ?? {}), decision: 'never', decidedAt: now, reason: 'The customer said no.' };
    await store.setSetting(WINBACKS_SETTING, all);
  } catch { /* keep going */ }
  let closed = false;
  if (SALES.includes(customer.state)) {
    try { closed = !!(await store.setState(customer.id, 'NOT_INTERESTED', 'SYSTEM')); } catch { /* keep going */ }
  }
  await store.audit('system', 'lead_closed_after_no', { customerId: customer.id, state: customer.state, closed, cancelled, evidence: evidence.slice(0, 120) }).catch(() => undefined);
  return { closed, cancelled };
}
