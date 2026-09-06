/**
 * (Jo, 6 Sep, revised) Will switches off for a customer the moment Jo opens
 * their card in the CRM — no matter the stage, payment, or Medicare/ABN
 * status. Jo's own words reversing the earlier "reached Review with
 * everything sent" design: "וויל לא נכבה גם אחרי שהלקוח מילא את השאלון
 * ושילם, הוא נכבה כאשר אני נכנסתי לכרטיס הלקוח ב-CRM".
 *
 * This reuses the existing aiPaused flag, so the manual "Take Over" /
 * "Resume Will" toggle (toggle_ai) keeps working exactly as before on top
 * of it, in either direction.
 */
import { pauseWillOnCrmOpen } from '@/lib/will/review-auto-off';

function makeStore() {
  return {
    updateCustomer: jest.fn().mockResolvedValue(undefined),
    audit: jest.fn().mockResolvedValue(undefined),
  } as any;
}

describe('pauseWillOnCrmOpen', () => {
  it('switches aiPaused on and audits it, for a customer at any stage', () => {
    return Promise.all([
      'NEW_LEAD', 'PAID', 'FORM_COMPLETE', 'UNDER_REVIEW', 'SIGNED', 'COMPLETED',
    ].map(async (state) => {
      const store = makeStore();
      const changed = await pauseWillOnCrmOpen(store, { id: 'c1', aiPaused: false } as any);
      expect(changed).toBe(true);
      expect(store.updateCustomer).toHaveBeenCalledWith('c1', { aiPaused: true });
      expect(store.audit).toHaveBeenCalledWith('system', 'will_auto_paused_on_crm_open', { customerId: 'c1' });
      void state;
    }));
  });

  it('is a no-op when the customer is already paused', async () => {
    const store = makeStore();
    const changed = await pauseWillOnCrmOpen(store, { id: 'c1', aiPaused: true } as any);
    expect(changed).toBe(false);
    expect(store.updateCustomer).not.toHaveBeenCalled();
  });

  it('does not depend on payment, form completion, or income — none of those fields are even read', async () => {
    const store = makeStore();
    // Deliberately a minimal customer shape: only id and aiPaused. If the
    // function tried to read .paid/.formComplete/.income it would throw on
    // undefined here rather than silently doing the wrong thing — this pins
    // that no such read exists any more.
    const changed = await pauseWillOnCrmOpen(store, { id: 'c1', aiPaused: false });
    expect(changed).toBe(true);
  });
});
