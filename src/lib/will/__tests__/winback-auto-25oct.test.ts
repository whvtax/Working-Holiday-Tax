/**
 * Jo, 25 Oct: the automatic win-back replaces the Lost Leads tab.
 * Closed 30 days after the last message: Will reads the whole chat and either
 * moves the lead to Final, or sends ONE personal message inside winback_<lang>.
 * 7 days with no reply, or closing again after replying: Final. Not Relevant
 * and opted-out: Final with no message. Max 10 a day, 2 a pass, evening window.
 */
import type { CustomerRow } from '@/lib/will/store';

const settings = new Map<string, unknown>();
const customers: CustomerRow[] = [];
const store = {
  allCustomers: jest.fn(async () => customers.map((c) => ({ ...c }))),
  getSetting: jest.fn(async (k: string) => settings.get(k)),
  setSetting: jest.fn(async (k: string, v: unknown) => { settings.set(k, JSON.parse(JSON.stringify(v ?? null))); }),
  setState: jest.fn(async (id: string, to: string) => {
    const c = customers.find((x) => x.id === id);
    if (!c || c.state === to) return false;
    c.state = to as CustomerRow['state']; c.stateChangedAt = new Date().toISOString();
    return true;
  }),
  cancelJobsFor: jest.fn(async () => 0),
  audit: jest.fn(async () => undefined),
};
jest.mock('@/lib/will/store', () => ({ getStore: () => store }));
const decideWinback = jest.fn();
jest.mock('@/lib/will/claude', () => ({ decideWinback: (...a: unknown[]) => decideWinback(...a) }));
jest.mock('@/lib/will/lost-analysis', () => ({ buildEvidence: jest.fn(async () => ({ evidence: { transcript: 'x' }, timing: {} })) }));
const budget = { exhausted: false };
jest.mock('@/lib/will/ai-budget', () => ({ aiBudgetExhausted: jest.fn(async () => budget.exhausted) }));
const deliverOut = jest.fn();
jest.mock('@/lib/will/channel', () => ({ deliverOut: (...a: unknown[]) => deliverOut(...a) }));
const window = { open: true };
jest.mock('@/lib/will/config', () => ({ withinQuietHours: () => window.open }));
jest.mock('@/lib/will/scheduler', () => ({ greetingName: (c: { name?: string | null }) => (c.name ?? 'there').split(' ')[0] }));

import { winbackPlan, runWinbackPass, WINBACK_DAILY_CAP, WINBACK_SENDS_PER_PASS } from '@/lib/will/winback-auto';
import { validateWinbackDecision, WINBACK_SYSTEM } from '@/lib/will/winback-decision';

const NOW = new Date('2026-10-25T09:00:00.000Z');
const daysAgo = (d: number) => new Date(NOW.getTime() - d * 86400_000).toISOString();
const cust = (over: Partial<CustomerRow>): CustomerRow => ({
  id: 'c1', waId: '61400', name: 'Lena Muller', state: 'WENT_COLD', paid: false, optedOut: false, isLegacy: false,
  lang: 'de', lastMessageAt: daysAgo(40), lastCustomerMsgAt: daysAgo(41), stateChangedAt: daysAgo(35), createdAt: daysAgo(60),
  ...over,
} as CustomerRow);

beforeEach(() => {
  settings.clear(); customers.length = 0; budget.exhausted = false; window.open = true;
  decideWinback.mockReset(); deliverOut.mockReset();
  deliverOut.mockResolvedValue({ ok: true });
  for (const f of Object.values(store)) (f as jest.Mock).mockClear();
  jest.useFakeTimers().setSystemTime(NOW);
});
afterEach(() => jest.useRealTimers());

describe('winbackPlan: who gets what', () => {
  it('never touches paid customers, legacy contacts or live leads', () => {
    expect(winbackPlan(cust({ paid: true }), undefined, NOW).kind).toBe('skip');
    expect(winbackPlan(cust({ isLegacy: true }), undefined, NOW).kind).toBe('skip');
    expect(winbackPlan(cust({ state: 'PRICE_SENT' }), undefined, NOW).kind).toBe('skip');
    expect(winbackPlan(cust({ state: 'FINAL' }), undefined, NOW).kind).toBe('skip');
  });
  it('Not Relevant and opted out go straight to Final, no message', () => {
    expect(winbackPlan(cust({ state: 'NOT_RELEVANT', lastMessageAt: daysAgo(1) }), undefined, NOW)).toEqual({ kind: 'final', why: 'not_relevant' });
    expect(winbackPlan(cust({ optedOut: true }), undefined, NOW)).toEqual({ kind: 'final', why: 'opted_out' });
  });
  it('waits 30 days from the last message, whoever wrote it', () => {
    expect(winbackPlan(cust({ lastMessageAt: daysAgo(29) }), undefined, NOW).kind).toBe('wait');
    expect(winbackPlan(cust({ lastMessageAt: daysAgo(30) }), undefined, NOW).kind).toBe('decide');
    expect(winbackPlan(cust({ state: 'NOT_INTERESTED' }), undefined, NOW).kind).toBe('decide');
  });
  it('after the win-back: 7 days without a reply, or closing again, is Final', () => {
    expect(winbackPlan(cust({ stateChangedAt: daysAgo(35) }), { sentAt: daysAgo(3) }, NOW).kind).toBe('wait');
    expect(winbackPlan(cust({ stateChangedAt: daysAgo(35) }), { sentAt: daysAgo(7) }, NOW)).toEqual({ kind: 'final', why: 'no_reply' });
    expect(winbackPlan(cust({ state: 'NOT_INTERESTED', stateChangedAt: daysAgo(1) }), { sentAt: daysAgo(3) }, NOW)).toEqual({ kind: 'final', why: 'closed_again' });
  });
  it('one win-back per person, ever: an old manual one counts too', () => {
    expect(winbackPlan(cust({ stateChangedAt: daysAgo(80) }), { queuedAt: daysAgo(90), sentAt: daysAgo(60) }, NOW).kind).toBe('final');
  });
  it('a decision stands for its conversation; new messages since mean a new decision', () => {
    expect(winbackPlan(cust({}), { decision: 'never', decidedAt: daysAgo(1) }, NOW)).toEqual({ kind: 'final', why: 'never' });
    expect(winbackPlan(cust({}), { decision: 'send', message: 'x'.repeat(30), decidedAt: daysAgo(1) }, NOW).kind).toBe('send');
    expect(winbackPlan(cust({ lastMessageAt: daysAgo(31) }), { decision: 'send', message: 'x'.repeat(30), decidedAt: daysAgo(50) }, NOW).kind).toBe('decide');
  });
  it('a failed assessment waits a day, and after three goes to Final', () => {
    expect(winbackPlan(cust({}), { attempts: 1, failedAt: daysAgo(0.1), decidedAt: daysAgo(0.1) }, NOW).kind).toBe('wait');
    expect(winbackPlan(cust({}), { attempts: 1, failedAt: daysAgo(1), decidedAt: daysAgo(1) }, NOW).kind).toBe('decide');
    expect(winbackPlan(cust({}), { attempts: 3, failedAt: daysAgo(1), decidedAt: daysAgo(1) }, NOW)).toEqual({ kind: 'final', why: 'not_assessable' });
  });
});

describe('the message Will may write', () => {
  const ok = { decision: 'send', reason: 'Went quiet after the price.', confidence: 0.8,
    message: "Last time you were checking whether your Uber work counts as ABN income. Did you manage to get your return sorted in the end?" };
  it('accepts one short personal paragraph and flattens line breaks', () => {
    const v = validateWinbackDecision({ ...ok, message: ok.message.replace('. ', '.\n\n') });
    expect(v?.message).toBe(ok.message);
    expect(v?.message).not.toMatch(/\n/);
  });
  it.each([
    ['a greeting', 'Hi Lena! Did you manage to get your return sorted in the end?'],
    ['a price', 'It is still only $220 for your return. Would you still like us to take care of it?'],
    ['super / pension', 'We can also help with your super. Would you still like us to take care of it?'],
    ['a deadline', 'The 31 October deadline is close. Would you still like us to take care of it?'],
    ['a link', 'Have a look at workingholidaytax.com.au again. Would you still like us to take care of it?'],
    ['bank details', 'The BSB is 062692 as before. Would you still like us to take care of it?'],
    ['a discount', 'We can do 10% off this week. Would you still like us to take care of it?'],
    ['the guarantee', 'If your refund is less than our fee we refund the difference. Interested?'],
  ])('rejects %s', (_label, message) => {
    expect(validateWinbackDecision({ ...ok, message })).toBeNull();
  });
  it('rejects a message that is too long, and accepts "never" without one', () => {
    expect(validateWinbackDecision({ ...ok, message: 'word '.repeat(100) })).toBeNull();
    expect(validateWinbackDecision({ decision: 'never', reason: 'Lodged with another agent.', confidence: 0.9 })).toEqual({ decision: 'never', reason: 'Lodged with another agent.', message: null, confidence: 0.9 });
  });
  it('the prompt carries Jo\'s rules', () => {
    for (const s of ['Silence is not a no', 'NO greeting', 'superannuation / super / pension / DASP', 'ONE simple question', 'in the language they wrote in']) {
      expect(WINBACK_SYSTEM.toLowerCase()).toContain(s.toLowerCase());
    }
  });
});

describe('runWinbackPass', () => {
  it('moves Not Relevant and "never" to Final, and sends the personal message inside the template', async () => {
    customers.push(
      cust({ id: 'spam', state: 'NOT_RELEVANT', lastMessageAt: daysAgo(2) }),
      cust({ id: 'never', name: 'Tom' }),
      cust({ id: 'send', name: 'Lena Muller', lang: 'de' }),
    );
    decideWinback.mockImplementation(async () => (decideWinback.mock.calls.length === 1
      ? { decision: 'never', reason: 'Lodged with another agent.', message: null, confidence: 0.9 }
      : { decision: 'send', reason: 'Went quiet after the price.', message: 'Du wolltest damals noch klären, ob dein Uber-Einkommen als ABN zählt. Hat das mit deiner Steuererklärung inzwischen geklappt?', confidence: 0.8 }));
    const s = await runWinbackPass(NOW.getTime(), 60_000);
    expect(customers.find((c) => c.id === 'spam')!.state).toBe('FINAL');
    expect(s.decided).toBe(2);
    expect(s.sent).toBe(1);
    const finalIds = customers.filter((c) => c.state === 'FINAL').map((c) => c.id).sort();
    expect(finalIds).toEqual(['never', 'spam']);
    const [c, body, author, meta, tpl] = deliverOut.mock.calls[0];
    expect(c.id).toBe('send');
    expect(author).toBe('AI');
    expect(meta).toMatchObject({ winback: true });
    expect(tpl).toMatchObject({ name: 'winback_de', params: ['Lena', expect.stringContaining('Uber')] });
    expect(body).toContain('Hi Lena, hier ist das Team von Working Holiday Tax');
    const rec = (settings.get('winbacks') as Record<string, { sentAt?: string; auto?: boolean }>).send;
    expect(rec.sentAt).toBeTruthy();
    expect(rec.auto).toBe(true);
    expect(customers.find((c) => c.id === 'send')!.state).toBe('WENT_COLD'); // stays closed until they reply
    expect(store.cancelJobsFor).toHaveBeenCalledWith('send', ['FOLLOW_UP', 'AUTO_CLOSE']);
  });

  it('never a burst: two per pass, ten per day, and only in the evening window', async () => {
    for (let i = 0; i < 15; i++) customers.push(cust({ id: `c${i}`, name: `N${i}` }));
    decideWinback.mockResolvedValue({ decision: 'send', reason: 'r', message: 'Last time you were deciding between the two options. Would you still like us to take care of it?', confidence: 0.7 });
    window.open = false;
    let s = await runWinbackPass(NOW.getTime(), 60_000);
    expect(s.sent).toBe(0);
    expect(s.remainingSends).toBe(15);
    window.open = true;
    let total = 0;
    for (let pass = 0; pass < 10; pass++) {
      s = await runWinbackPass(NOW.getTime(), 60_000);
      expect(s.sent).toBeLessThanOrEqual(WINBACK_SENDS_PER_PASS);
      total += s.sent;
    }
    expect(total).toBe(WINBACK_DAILY_CAP);
    expect(s.remainingSends).toBe(0);
  });

  it('a template WhatsApp refuses stops the day instead of failing for everyone', async () => {
    customers.push(cust({ id: 'a' }), cust({ id: 'b' }));
    decideWinback.mockResolvedValue({ decision: 'send', reason: 'r', message: 'Last time you were deciding between the two options. Would you still like us to take care of it?', confidence: 0.7 });
    deliverOut.mockResolvedValue({ ok: false, error: 'template not approved' });
    const s = await runWinbackPass(NOW.getTime(), 60_000);
    expect(deliverOut).toHaveBeenCalledTimes(1);
    expect(s.sent).toBe(0);
    const opts = deliverOut.mock.calls[0][5];
    expect(opts.onFailure.reason('template not approved')).toMatch(/^Win-back did not go out/);
  });

  it('stops on the AI budget and records a failed assessment for a retry tomorrow', async () => {
    customers.push(cust({ id: 'a' }), cust({ id: 'b' }), cust({ id: 'c', lastMessageAt: daysAgo(31) }));
    decideWinback.mockResolvedValue({ decision: 'never', reason: 'Did it themselves.', message: null, confidence: 0.9 });
    decideWinback.mockResolvedValueOnce({ error: 'Claude API error 500' });
    budget.exhausted = false;
    const s1 = await runWinbackPass(NOW.getTime(), 60_000);
    expect(s1.failed).toBeGreaterThanOrEqual(1);
    const rec = (settings.get('winbacks') as Record<string, { attempts?: number; failedAt?: string }>).a;
    expect(rec.attempts).toBe(1);
    customers.push(cust({ id: 'd' }));
    budget.exhausted = true;
    decideWinback.mockClear();
    const s2 = await runWinbackPass(NOW.getTime(), 60_000);
    expect(s2.budgetExhausted).toBe(true);
    expect(decideWinback).not.toHaveBeenCalled();
  });
});

describe('the pass stays inside the tick (26 Oct)', () => {
  it('does not start a model call that cannot finish in the time left', async () => {
    customers.push(cust({ id: 'late' }));
    decideWinback.mockResolvedValue({ decision: 'never', reason: 'r', message: null, confidence: 0.9 });
    const s = await runWinbackPass(NOW.getTime(), 10_000);
    expect(decideWinback).not.toHaveBeenCalled();
    expect(s.incomplete).toBe(true);
    expect(s.remainingDecisions).toBe(1);
  });
});
