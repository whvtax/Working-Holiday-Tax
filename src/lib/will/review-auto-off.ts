// ============================================================
// Auto-pause Will the moment Jo opens a customer's card in the CRM
// (Jo, 6 Sep — revised from an earlier "reached Review with everything sent"
// design he then reversed: "וויל לא נכבה גם אחרי שהלקוח מילא את השאלון ושילם,
// הוא נכבה כאשר אני נכנסתי לכרטיס הלקוח ב-CRM").
//
// The rule now is exactly this: opening the chat is Jo taking the wheel.
// Nothing about the customer's stage, payment, or Medicare/ABN status
// matters — every customer, the instant their card is opened.
//
// This reuses the existing aiPaused flag, so the manual "Take Over" /
// "Resume Will" toggle (toggle_ai) keeps working exactly as before, in
// either direction, on top of this: opening the card once more after Jo has
// resumed Will pauses it again (opening the card IS "taking the wheel"),
// and nothing here stops Jo from resuming Will again afterwards.
// ============================================================
import type { CustomerRow, Store } from './store';

/**
 * Switch Will off for this customer because Jo just opened their card.
 * Idempotent and safe to call on every open: a no-op once already paused.
 * Returns true when this call is the one that switched it off.
 */
export async function pauseWillOnCrmOpen(store: Store, customer: Pick<CustomerRow, 'id' | 'aiPaused'>): Promise<boolean> {
  if (customer.aiPaused) return false;
  await store.updateCustomer(customer.id, { aiPaused: true });
  await store.audit('system', 'will_auto_paused_on_crm_open', { customerId: customer.id });
  return true;
}
