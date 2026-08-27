/**
 * The three pure decisions behind the Lost Leads report, pinned here because
 * each one is wrong in a way that is invisible on screen:
 *
 *  1. WHO COUNTS AS LOST. Calling a live lead "lost" writes a post-mortem about
 *     someone who is still deciding, which is how a report earns the right to be
 *     ignored. These tests hold the conservative line.
 *  2. OUTPUT VALIDATION. The model's JSON is never trusted. A half-formed answer
 *     must be REJECTED, not repaired into something that looks complete — an
 *     invented category pollutes the aggregate, which is the one number in this
 *     report Jo is meant to act on.
 *  3. AGGREGATION. Individually these are anecdotes; the ranking is the finding.
 */
import {
  lostVerdict, selectLostLeads, SILENCE_DAYS_UNTIL_LOST,
  validateLostAnalysis, aggregateCategories, leadTiming,
} from '@/lib/will/lost-leads';
import type { CustomerRow, MessageRow, StateHistoryRow } from '@/lib/will/store';

const NOW = new Date('2026-08-26T00:00:00.000Z');
const daysAgo = (n: number) => new Date(NOW.getTime() - n * 86400_000).toISOString();

const customer = (over: Partial<CustomerRow> = {}): CustomerRow => ({
  id: 'c1', waId: '61400000001', name: 'Alex', flag: '🇩🇪', state: 'PRICE_SENT',
  income: 'TFN', paid: false, formComplete: false, missingDocs: [], aiPaused: false,
  isLegacy: false, botOwned: true, optedOut: false, estimatedRefundCents: null,
  lastCustomerMsgAt: daysAgo(1), previousState: null, stateChangedAt: daysAgo(1),
  lastMessagePreview: null, lastMessageDirection: null, unread: false, unreadCount: 0,
  lastMessageAt: daysAgo(1), lang: 'de', createdAt: daysAgo(2),
  ...over,
} as CustomerRow);

// ────────────────────────────────────────────────────────────
describe('who counts as lost', () => {
  it('a lead who arrived an hour ago is NOT lost', () => {
    const v = lostVerdict(customer({
      state: 'NEW_LEAD',
      createdAt: new Date(NOW.getTime() - 3600_000).toISOString(),
      lastCustomerMsgAt: new Date(NOW.getTime() - 3600_000).toISOString(),
      lastMessageAt: new Date(NOW.getTime() - 3600_000).toISOString(),
      stateChangedAt: new Date(NOW.getTime() - 3600_000).toISOString(),
    }), NOW);
    expect(v.lost).toBe(false);
  });

  it('a lead quiet for one day short of the threshold is still live', () => {
    const v = lostVerdict(customer({ lastCustomerMsgAt: daysAgo(SILENCE_DAYS_UNTIL_LOST - 1) }), NOW);
    expect(v.lost).toBe(false);
    expect(v.quietDays).toBe(SILENCE_DAYS_UNTIL_LOST - 1);
  });

  it('a lead silent for the full threshold in a sales stage is lost', () => {
    const v = lostVerdict(customer({ lastCustomerMsgAt: daysAgo(SILENCE_DAYS_UNTIL_LOST) }), NOW);
    expect(v.lost).toBe(true);
    expect(v.trigger).toBe('silent');
  });

  it('NOT_INTERESTED is lost immediately — no waiting period, they said no', () => {
    const v = lostVerdict(customer({ state: 'NOT_INTERESTED', lastCustomerMsgAt: daysAgo(0) }), NOW);
    expect(v.lost).toBe(true);
    expect(v.trigger).toBe('declined');
  });

  it('an opt-out is lost immediately, whatever stage they are in', () => {
    const v = lostVerdict(customer({ optedOut: true, state: 'QUALIFIED', lastCustomerMsgAt: daysAgo(0) }), NOW);
    expect(v.lost).toBe(true);
    expect(v.trigger).toBe('opted_out');
  });

  it('WENT_COLD is lost — the scheduler only sets it after the whole cadence', () => {
    const v = lostVerdict(customer({ state: 'WENT_COLD' }), NOW);
    expect(v.lost).toBe(true);
    expect(v.trigger).toBe('auto_closed');
  });

  it('a paying customer is never lost, even sitting in a sales state', () => {
    expect(lostVerdict(customer({ paid: true, lastCustomerMsgAt: daysAgo(400) }), NOW).lost).toBe(false);
  });

  it('a customer past payment is never lost, even if paid is somehow false', () => {
    expect(lostVerdict(customer({ state: 'LODGED', lastCustomerMsgAt: daysAgo(400) }), NOW).lost).toBe(false);
  });

  it('an opted-out customer who already PAID is not a lost lead', () => {
    expect(lostVerdict(customer({ paid: true, optedOut: true }), NOW).lost).toBe(false);
  });

  it('NOT_RELEVANT is excluded — nothing was lost because nothing was there', () => {
    expect(lostVerdict(customer({ state: 'NOT_RELEVANT' }), NOW).lost).toBe(false);
  });

  it('a legacy contact is excluded — we do not hold their conversation', () => {
    expect(lostVerdict(customer({ isLegacy: true, state: 'NOT_INTERESTED' }), NOW).lost).toBe(false);
  });

  it('falls back through timestamps and treats a lead with none as LIVE, not lost', () => {
    const v = lostVerdict(customer({
      state: 'NEW_LEAD', lastCustomerMsgAt: null, lastMessageAt: null,
      stateChangedAt: null as unknown as string, createdAt: null as unknown as string,
    }), NOW);
    expect(v.lost).toBe(false);
  });

  it('uses createdAt when no message timestamps exist at all', () => {
    const v = lostVerdict(customer({
      state: 'NEW_LEAD', lastCustomerMsgAt: null, lastMessageAt: null,
      stateChangedAt: null as unknown as string, createdAt: daysAgo(60),
    }), NOW);
    expect(v.lost).toBe(true);
    expect(v.trigger).toBe('silent');
  });

  it('selectLostLeads returns only the lost ones, with their verdict', () => {
    const out = selectLostLeads([
      customer({ id: 'live', lastCustomerMsgAt: daysAgo(2) }),
      customer({ id: 'cold', state: 'WENT_COLD' }),
      customer({ id: 'won', paid: true }),
    ], NOW);
    expect(out.map((r) => r.customer.id)).toEqual(['cold']);
    expect(out[0].verdict.trigger).toBe('auto_closed');
  });
});

// ────────────────────────────────────────────────────────────
describe('timing — the part that is usually the whole story', () => {
  const msg = (over: Partial<MessageRow>): MessageRow => ({
    id: 'm', customerId: 'c1', direction: 'IN', author: 'CUSTOMER', status: 'SENT',
    body: 'hi', createdAt: daysAgo(20), ...over,
  } as MessageRow);
  const hist = (to: string, createdAt: string): StateHistoryRow => ({
    customerId: 'c1', from: 'QUALIFIED', to: to as StateHistoryRow['to'],
    causedBy: 'AI', createdAt,
  });

  it('reports zero replies after the price when they read it and vanished', () => {
    const t = leadTiming(
      customer({ lastCustomerMsgAt: daysAgo(30) }),
      [msg({ id: '1', createdAt: daysAgo(30) }), msg({ id: '2', direction: 'OUT', author: 'AI', createdAt: daysAgo(30) })],
      [hist('PRICE_SENT', daysAgo(30))],
      NOW,
    );
    expect(t.repliesAfterPrice).toBe(0);
    expect(t.priceSentAt).toBe(daysAgo(30));
  });

  it('counts the replies that came after the price and the hours to their last word', () => {
    const t = leadTiming(
      customer({}),
      [
        msg({ id: '1', createdAt: daysAgo(31) }),
        msg({ id: '2', direction: 'OUT', author: 'AI', createdAt: daysAgo(30) }),
        msg({ id: '3', createdAt: daysAgo(29) }),
      ],
      [hist('PRICE_SENT', daysAgo(30))],
      NOW,
    );
    expect(t.repliesAfterPrice).toBe(1);
    expect(t.hoursPriceToSilence).toBe(24);
  });

  it('ignores drafts that never reached the customer', () => {
    const t = leadTiming(
      customer({}),
      [
        msg({ id: '1', createdAt: daysAgo(30) }),
        msg({ id: '2', direction: 'OUT', author: 'AI', status: 'PENDING_APPROVAL', createdAt: daysAgo(29) }),
        msg({ id: '3', direction: 'OUT', author: 'AI', status: 'SENT', createdAt: daysAgo(28) }),
      ],
      [],
      NOW,
    );
    expect(t.ourMessagesAfterTheirLastWord).toBe(1);
  });

  it('uses the FIRST price, not a later re-quote', () => {
    const t = leadTiming(customer({}), [], [
      hist('PRICE_SENT', daysAgo(30)),
      hist('PRICE_SENT', daysAgo(10)),
    ], NOW);
    expect(t.priceSentAt).toBe(daysAgo(30));
  });
});

// ────────────────────────────────────────────────────────────
describe('validating what the model returned', () => {
  const good = {
    reason: 'They saw the $385 quote and never replied again.',
    category: 'silence_after_price',
    should_have_done: 'The follow-up should have led with the guarantee, not repeated the number.',
    fault: 'PARTLY_OURS',
    recoverable: 'MAYBE',
    recovery_action: 'One message about the refund guarantee, before the October deadline.',
    evidence_quote: 'ok let me think about it',
    confidence: 0.8,
  };

  it('accepts a complete answer', () => {
    const v = validateLostAnalysis(good);
    expect(v).not.toBeNull();
    expect(v!.category).toBe('silence_after_price');
    expect(v!.recoveryAction).toContain('guarantee');
  });

  it('accepts the honest "nothing was done wrong" answer', () => {
    const v = validateLostAnalysis({
      ...good, fault: 'NOT_OURS', recoverable: 'NO',
      category: 'not_eligible', recovery_action: undefined,
      should_have_done: 'Nothing. They had no Australian income to lodge.',
    });
    expect(v).not.toBeNull();
    expect(v!.fault).toBe('NOT_OURS');
    expect(v!.recoveryAction).toBeNull();
  });

  it('drops a recovery action that contradicts recoverable = NO', () => {
    const v = validateLostAnalysis({ ...good, recoverable: 'NO' });
    expect(v!.recoveryAction).toBeNull();
  });

  it('rejects a category that is not in the closed list', () => {
    expect(validateLostAnalysis({ ...good, category: 'vibes' })).toBeNull();
  });

  it('rejects a claimed-recoverable lead with no action to recover it', () => {
    expect(validateLostAnalysis({ ...good, recoverable: 'YES', recovery_action: '   ' })).toBeNull();
  });

  it('rejects a missing or empty reason', () => {
    expect(validateLostAnalysis({ ...good, reason: '' })).toBeNull();
    expect(validateLostAnalysis({ ...good, reason: undefined })).toBeNull();
  });

  it('rejects a missing should_have_done', () => {
    expect(validateLostAnalysis({ ...good, should_have_done: undefined })).toBeNull();
  });

  it('rejects an invalid fault or recoverable value', () => {
    expect(validateLostAnalysis({ ...good, fault: 'MAYBE_OURS' })).toBeNull();
    expect(validateLostAnalysis({ ...good, recoverable: 'PROBABLY' })).toBeNull();
  });

  it('rejects a confidence that is missing or out of range', () => {
    expect(validateLostAnalysis({ ...good, confidence: undefined })).toBeNull();
    expect(validateLostAnalysis({ ...good, confidence: 1.4 })).toBeNull();
    expect(validateLostAnalysis({ ...good, confidence: '0.9' })).toBeNull();
  });

  it('rejects a non-object', () => {
    expect(validateLostAnalysis(null)).toBeNull();
    expect(validateLostAnalysis('sure thing')).toBeNull();
    expect(validateLostAnalysis(42)).toBeNull();
  });

  it('clips runaway text rather than storing an essay', () => {
    const v = validateLostAnalysis({ ...good, reason: 'x'.repeat(5000) });
    expect(v!.reason.length).toBe(400);
  });
});

// ────────────────────────────────────────────────────────────
describe('aggregation — where the pattern actually shows up', () => {
  const a = (category: string, recoverable = 'NO', fault = 'NOT_OURS') =>
    ({ category, recoverable, fault }) as Parameters<typeof aggregateCategories>[0][number];

  it('ranks categories by frequency, most common first', () => {
    const out = aggregateCategories([
      a('silence_after_price'), a('price'), a('silence_after_price'),
      a('silence_after_price'), a('price'), a('diy'),
    ]);
    expect(out.map((c) => [c.category, c.n])).toEqual([
      ['silence_after_price', 3], ['price', 2], ['diy', 1],
    ]);
  });

  it('reports share as a whole percent of everything analysed', () => {
    const out = aggregateCategories([a('price'), a('price'), a('diy'), a('trust')]);
    expect(out[0].share).toBe(50);
  });

  it('counts recoverable and our-fault within each category', () => {
    const out = aggregateCategories([
      a('price', 'YES', 'OURS'),
      a('price', 'MAYBE', 'PARTLY_OURS'),
      a('price', 'NO', 'NOT_OURS'),
    ]);
    expect(out[0]).toMatchObject({ n: 3, recoverable: 2, ourFault: 2 });
  });

  it('breaks ties alphabetically so the order is stable between renders', () => {
    expect(aggregateCategories([a('trust'), a('diy')]).map((c) => c.category)).toEqual(['diy', 'trust']);
    expect(aggregateCategories([a('diy'), a('trust')]).map((c) => c.category)).toEqual(['diy', 'trust']);
  });

  it('ignores a category outside the closed list rather than inventing a bucket', () => {
    expect(aggregateCategories([a('price'), a('nonsense')])).toHaveLength(1);
  });

  it('returns nothing at all when nothing has been analysed', () => {
    expect(aggregateCategories([])).toEqual([]);
  });
});
