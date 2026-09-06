/**
 * (Jo, 6 Sep) Once a customer has paid, filled the questionnaire, reached
 * Review, and — only where it applies to them — the Medicare exemption
 * message has genuinely SENT and the ABN answers have genuinely arrived,
 * Will is switched off for that customer for good. Jo was explicit on three
 * points, each pinned by a test group below:
 *
 *  1. This must be a real code check that the Medicare/ABN messages were
 *     actually SENT — never an inference from reaching a pipeline stage.
 *  2. It applies to every customer, TFN and TFN + ABN alike, no exceptions.
 *  3. It never overrides the manual "Take Over" / "Resume Will" toggle: an
 *     already-paused customer is left alone, and nothing here stops that
 *     toggle from turning Will back on for one specific customer afterwards.
 */
import { reviewAutoOffReady, maybeAutoOffWill } from '@/lib/will/review-auto-off';
import { abnAnswersPendingKey } from '@/lib/will/scheduler';
import { medicareAppliesKey, medicareInfoSentKey } from '@/lib/will/form-link';
import type { CustomerRow } from '@/lib/will/store';

function makeCustomer(over: Partial<CustomerRow> = {}): CustomerRow {
  return {
    id: 'c1', waId: '61400000001', name: 'Alex', flag: '🇦🇺',
    state: 'UNDER_REVIEW', income: 'TFN', paid: true, formComplete: true,
    missingDocs: [], aiPaused: false, isLegacy: false, botOwned: false, optedOut: false,
    estimatedRefundCents: null, lastCustomerMsgAt: null, previousState: null,
    stateChangedAt: new Date().toISOString(), lastMessagePreview: null,
    lastMessageDirection: null, unread: false,
    ...over,
  } as CustomerRow;
}

function makeStore(settings: Record<string, unknown> = {}) {
  const audit = jest.fn();
  const updateCustomer = jest.fn();
  return {
    getSetting: jest.fn(async (k: string) => (k in settings ? settings[k] : undefined)),
    setSetting: jest.fn(),
    updateCustomer,
    audit,
  } as any;
}

describe('review-auto-off: the readiness check itself', () => {
  it('not ready before payment or before the form is complete', async () => {
    const store = makeStore();
    expect(await reviewAutoOffReady(store, makeCustomer({ paid: false }))).toBe(false);
    expect(await reviewAutoOffReady(store, makeCustomer({ formComplete: false }))).toBe(false);
  });

  it('not ready before Review is reached, even fully paid and formed up', async () => {
    const store = makeStore();
    for (const state of ['PAID', 'FORM_PENDING', 'FORM_COMPLETE', 'DOCUMENTS_COMPLETE'] as CustomerRow['state'][]) {
      expect(await reviewAutoOffReady(store, makeCustomer({ state }))).toBe(false);
    }
  });

  it('ready at UNDER_REVIEW, ESTIMATE_READY or FINAL_REVIEW for a plain TFN customer with no Medicare exemption', async () => {
    const store = makeStore();
    for (const state of ['UNDER_REVIEW', 'ESTIMATE_READY', 'FINAL_REVIEW'] as CustomerRow['state'][]) {
      expect(await reviewAutoOffReady(store, makeCustomer({ state, income: 'TFN' }))).toBe(true);
    }
  });

  it('a TFN_ABN customer is NOT ready while abnAnswersPendingKey is still true — a real, stage-independent check', async () => {
    const store = makeStore({ [abnAnswersPendingKey('c1')]: true });
    expect(await reviewAutoOffReady(store, makeCustomer({ income: 'TFN_ABN' }))).toBe(false);
  });

  it('a TFN_ABN customer IS ready once the ABN pending flag has been cleared (answers genuinely arrived)', async () => {
    const store = makeStore({ [abnAnswersPendingKey('c1')]: false });
    expect(await reviewAutoOffReady(store, makeCustomer({ income: 'TFN_ABN' }))).toBe(true);
  });

  it('a customer whose Medicare exemption applies is NOT ready until the send is genuinely confirmed — reaching Review is not enough', async () => {
    const store = makeStore({ [medicareAppliesKey('c1')]: true });
    expect(await reviewAutoOffReady(store, makeCustomer())).toBe(false);
  });

  it('ready once the Medicare exemption message is confirmed sent', async () => {
    const store = makeStore({ [medicareAppliesKey('c1')]: true, [medicareInfoSentKey('c1')]: true });
    expect(await reviewAutoOffReady(store, makeCustomer())).toBe(true);
  });

  it('someone the exemption does not apply to is never blocked on it', async () => {
    const store = makeStore(); // medicareAppliesKey never set
    expect(await reviewAutoOffReady(store, makeCustomer())).toBe(true);
  });

  it('both conditions apply together for a TFN_ABN customer who also needs the exemption', async () => {
    const store = makeStore({
      [abnAnswersPendingKey('c1')]: false,
      [medicareAppliesKey('c1')]: true,
      [medicareInfoSentKey('c1')]: false,
    });
    expect(await reviewAutoOffReady(store, makeCustomer({ income: 'TFN_ABN' }))).toBe(false);
  });
});

describe('review-auto-off: applying it (maybeAutoOffWill)', () => {
  it('switches aiPaused on and audits it, once the condition is genuinely met', async () => {
    const store = makeStore();
    const changed = await maybeAutoOffWill(store, makeCustomer());
    expect(changed).toBe(true);
    expect(store.updateCustomer).toHaveBeenCalledWith('c1', { aiPaused: true });
    expect(store.audit).toHaveBeenCalledWith('system', 'will_auto_paused_at_review', expect.objectContaining({ customerId: 'c1' }));
  });

  it('does nothing when the condition is not yet met', async () => {
    const store = makeStore({ [medicareAppliesKey('c1')]: true });
    const changed = await maybeAutoOffWill(store, makeCustomer());
    expect(changed).toBe(false);
    expect(store.updateCustomer).not.toHaveBeenCalled();
  });

  it('never touches a customer already paused — including one Jo has manually taken over — no exceptions rule applies to switching OFF, never to re-pausing', async () => {
    const store = makeStore();
    const changed = await maybeAutoOffWill(store, makeCustomer({ aiPaused: true }));
    expect(changed).toBe(false);
    expect(store.updateCustomer).not.toHaveBeenCalled();
  });

  it('applies uniformly to a TFN-only customer with no ABN and no Medicare exemption at all', async () => {
    const store = makeStore();
    const changed = await maybeAutoOffWill(store, makeCustomer({ income: 'TFN' }));
    expect(changed).toBe(true);
  });

  it('applies uniformly to a TFN_ABN customer once their ABN answers are in', async () => {
    const store = makeStore({ [abnAnswersPendingKey('c1')]: false });
    const changed = await maybeAutoOffWill(store, makeCustomer({ income: 'TFN_ABN' }));
    expect(changed).toBe(true);
  });
});
