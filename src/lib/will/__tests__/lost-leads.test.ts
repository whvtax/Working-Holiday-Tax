/**
 * Who counts as lost and the timing of a lost lead: the evidence the
 * automatic win-back reads (Jo, 25 Oct). These tests hold the conservative line.
 */
import {
  lostVerdict, selectLostLeads, SILENCE_DAYS_UNTIL_LOST, leadTiming,
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
