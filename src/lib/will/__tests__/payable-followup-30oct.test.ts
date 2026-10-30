/**
 * 30 Oct 2026: "we'll message you in about two weeks" was promised to eight
 * customers who owe tax (due 4 to 10 Nov). The job already existed for Mark
 * Lodged with the outcome flag set; this pins that EVERY promised customer
 * has one job, that it fires once, and that it raises a task for Jo (it sends
 * nothing to the customer). Invented customers only.
 */
import { LODGED_PAYABLE_MSG as NEW_LODGED_PAYABLE_MSG } from '@/lib/will/i18n';

// The lodged text as it read until 30 Oct (it promised a message in two weeks). Customers who got it still keep their follow up.
const LODGED_PAYABLE_MSG = {
  en: "Your tax return has been lodged successfully! ✅\nWe'll message you again in about two weeks and walk you through how to pay. Nothing to do until then 😊",
  de: 'Deine Steuererklärung wurde erfolgreich eingereicht! ✅\nWir melden uns in etwa zwei Wochen wieder bei dir und erklären dir, wie du bezahlst. Bis dahin musst du nichts tun 😊',
  ja: 'あなたの確定申告書の提出が完了しました！✅\n約2週間後にこちらから改めてご連絡し、お支払い方法をご案内します。それまでは何もしていただく必要はありません😊',
};
import { ensurePayableFollowups, promiseTime, PAYABLE_PROMISE, payableRaisedKey, PAYABLE_FOLLOWUP_DAYS } from '@/lib/will/payable-followup-30oct';

const DAY = 86400_000;
const NOW = Date.UTC(2026, 9, 30, 10, 0);
const msg = (body: string, daysAgo: number, direction: 'OUT' | 'IN' = 'OUT') => ({ id: `m${daysAgo}`, customerId: 'x', direction, author: direction === 'OUT' ? 'AI' : 'CUSTOMER', status: 'SENT', body, createdAt: new Date(NOW - daysAgo * DAY).toISOString(), meta: {} });

function fakeStore(customers: Array<Record<string, unknown>>, chats: Record<string, ReturnType<typeof msg>[]>, existingJobs: Record<string, number> = {}, settings: Record<string, unknown> = {}) {
  return {
    allCustomers: jest.fn(async () => customers as never),
    listMessages: jest.fn(async (id: string) => (chats[id] ?? []) as never),
    listJobsForCustomer: jest.fn(async (id: string) => Array.from({ length: existingJobs[id] ?? 0 }, () => ({})) as never),
    addJob: jest.fn(async (_j: unknown) => ({ id: 'j' }) as never),
    getSetting: jest.fn(async (k: string) => settings[k]),
    audit: jest.fn().mockResolvedValue(undefined),
  };
}
const c = (id: string, over: Record<string, unknown> = {}) => ({ id, waId: `6140000${id}`, name: `Cust ${id}`, state: 'LODGED', paid: true, optedOut: false, isLegacy: false, outcome: null, estimatedRefundCents: null, ...over });

describe('the new lodged payable text makes no two week promise (Jo, 30 Oct)', () => {
  it('says 14 days, the ATO email and "message us" in en, de and ja, and matches no promise', () => {
    expect(NEW_LODGED_PAYABLE_MSG.en).toMatch(/within 14 days you will receive an email from the ATO with the payment request and how to pay/i);
    expect(NEW_LODGED_PAYABLE_MSG.en).toMatch(/message us here and we will send it to you directly/);
    expect(NEW_LODGED_PAYABLE_MSG.de).toMatch(/14 Tagen[^.]*E-Mail vom ATO/);
    expect(NEW_LODGED_PAYABLE_MSG.ja).toMatch(/14日以内にATOから/);
    for (const t of Object.values(NEW_LODGED_PAYABLE_MSG)) {
      expect(PAYABLE_PROMISE.test(t)).toBe(false);
      expect(t).not.toMatch(/two weeks|zwei Wochen|2週間/);
    }
    expect(promiseTime([msg(NEW_LODGED_PAYABLE_MSG.en, 13)] as never)).toBeNull();
  });
});

describe('the promise is recognised in every wording we use', () => {
  it('English, German and Japanese lodged payable texts, and a human typing it', () => {
    for (const t of [LODGED_PAYABLE_MSG.en, LODGED_PAYABLE_MSG.de, LODGED_PAYABLE_MSG.ja, "We'll message you again in about two weeks, nothing to do till then"]) expect(PAYABLE_PROMISE.test(t)).toBe(true);
    expect(PAYABLE_PROMISE.test('Your refund should arrive within 14 business days')).toBe(false);
    expect(promiseTime([msg('hello', 20), msg(LODGED_PAYABLE_MSG.en, 13)] as never)).toBe(new Date(NOW - 13 * DAY).toISOString());
  });
});

describe('ensurePayableFollowups: every promised customer who owes has exactly one job', () => {
  it('schedules 14 days after the promise; when that date has passed, on the next tick', async () => {
    const store = fakeStore(
      [c('01', { outcome: 'PAYABLE' }), c('02', { outcome: 'PAYABLE' })],
      { '01': [msg(LODGED_PAYABLE_MSG.en, 3)], '02': [msg(LODGED_PAYABLE_MSG.en, 20)] },
    );
    const r = await ensurePayableFollowups(store, NOW);
    expect(r).toEqual({ checked: 2, scheduled: 2 });
    const [first, second] = store.addJob.mock.calls.map((x) => x[0] as unknown as { customerId: string; kind: string; runAt: string });
    expect(first).toMatchObject({ customerId: '01', kind: 'PAYABLE_FOLLOWUP' });
    expect(new Date(first.runAt).getTime()).toBe(NOW - 3 * DAY + PAYABLE_FOLLOWUP_DAYS * DAY);
    expect(new Date(second.runAt).getTime()).toBe(NOW + 60_000);
  });
  it('finds an owing customer whose outcome flag was never set, from the text in the chat', async () => {
    const store = fakeStore([c('03')], { '03': [msg('Your return is ready. The estimated amount payable to the ATO is $450.', 15), msg(LODGED_PAYABLE_MSG.en, 14)] });
    expect((await ensurePayableFollowups(store, NOW)).scheduled).toBe(1);
  });
  it('is idempotent: an existing job, an already raised task, or a second run adds nothing', async () => {
    const store = fakeStore(
      [c('04', { outcome: 'PAYABLE' }), c('05', { outcome: 'PAYABLE' })],
      { '04': [msg(LODGED_PAYABLE_MSG.en, 5)], '05': [msg(LODGED_PAYABLE_MSG.en, 5)] },
      { '04': 1 }, { [payableRaisedKey('05')]: '2026-10-29T00:00:00.000Z' },
    );
    expect((await ensurePayableFollowups(store, NOW)).scheduled).toBe(0);
    expect(store.addJob).not.toHaveBeenCalled();
  });
  it('never for a customer who is owed a refund, who was not given the promise, or who opted out', async () => {
    const store = fakeStore(
      [c('06', { outcome: 'REFUND' }), c('07', { outcome: 'PAYABLE' }), c('08', { outcome: 'PAYABLE', optedOut: true }), c('09', { state: 'FORM_PENDING', outcome: 'PAYABLE' })],
      { '06': [msg(LODGED_PAYABLE_MSG.en, 5)], '07': [msg('Your tax return has been lodged', 5)], '08': [msg(LODGED_PAYABLE_MSG.en, 5)], '09': [msg(LODGED_PAYABLE_MSG.en, 5)] },
    );
    expect((await ensurePayableFollowups(store, NOW)).scheduled).toBe(0);
  });
});

// ── the job itself, through the scheduler tick ───────────────────────────────
const tstore = {
  reclaimStaleJobs: jest.fn().mockResolvedValue(0),
  getSetting: jest.fn(),
  setSetting: jest.fn().mockResolvedValue(undefined),
  dueJobs: jest.fn(), claimJob: jest.fn().mockResolvedValue(true), getCustomerById: jest.fn(),
  setJobStatus: jest.fn().mockResolvedValue(undefined), addJob: jest.fn(), addTask: jest.fn().mockResolvedValue({ id: 't1' }),
  updateTask: jest.fn(), audit: jest.fn().mockResolvedValue(undefined), cancelJobsFor: jest.fn(),
  findOpenTaskForCustomer: jest.fn().mockResolvedValue(null), listMessages: jest.fn().mockResolvedValue([]),
  listJobsForCustomer: jest.fn().mockResolvedValue([]), listTemplates: jest.fn().mockResolvedValue([]),
};
jest.mock('@/lib/will/store', () => ({ getStore: () => tstore }));
const deliverOut = jest.fn();
jest.mock('@/lib/will/channel', () => ({
  deliverOut: (...a: unknown[]) => deliverOut(...a), templateApprovedFor: jest.fn(), sendWhatsAppText: jest.fn(), sendWhatsAppTemplate: jest.fn(), wasAlreadySentVerbatim: jest.fn(),
}));
jest.mock('@/lib/will/service', () => ({ runDeferredAutoReply: jest.fn() }));
import { processDueJobs } from '@/lib/will/scheduler';

describe('the job fires once, raises one urgent task for Jo and sends nothing to the customer', () => {
  const settings = new Map<string, unknown>();
  beforeEach(() => {
    jest.clearAllMocks(); settings.clear();
    tstore.getSetting.mockImplementation(async (k: string) => (k === 'ai_mode' ? 'FULL_AUTO' : settings.get(k)));
    tstore.setSetting.mockImplementation(async (k: string, v: unknown) => { settings.set(k, v); });
    tstore.getCustomerById.mockResolvedValue({ ...c('11', { outcome: 'PAYABLE' }), id: 'c11', lang: 'en', brand: 'wht' });
    tstore.listMessages.mockResolvedValue([msg(LODGED_PAYABLE_MSG.en, 13)]);
    tstore.dueJobs.mockResolvedValue([{ id: 'j1', customerId: 'c11', kind: 'PAYABLE_FOLLOWUP', payload: {}, runAt: new Date().toISOString(), status: 'SCHEDULED', createdAt: new Date().toISOString() }]);
  });
  it('first run raises the task; a second job for the same customer does nothing', async () => {
    await processDueJobs();
    expect(tstore.addTask).toHaveBeenCalledTimes(1);
    expect(tstore.addTask).toHaveBeenCalledWith(expect.objectContaining({ customerId: 'c11', severity: 'URGENT', reason: expect.stringMatching(/ATO PAYMENT INSTRUCTIONS DUE/) }));
    expect(settings.has(payableRaisedKey('c11'))).toBe(true);
    await processDueJobs();
    expect(tstore.addTask).toHaveBeenCalledTimes(1);
    expect(deliverOut).not.toHaveBeenCalled();
    expect(tstore.setJobStatus).toHaveBeenCalledWith('j1', 'DONE');
  });
  it('a customer who got the NEW lodged text (no two week promise) raises no task up front (Jo, 30 Oct)', async () => {
    tstore.listMessages.mockResolvedValue([msg(NEW_LODGED_PAYABLE_MSG.en, 13)]);
    await processDueJobs();
    expect(tstore.addTask).not.toHaveBeenCalled();
    expect(deliverOut).not.toHaveBeenCalled();
  });
  it('a customer who is owed a refund (outcome corrected since) raises nothing', async () => {
    tstore.getCustomerById.mockResolvedValue({ ...c('11', { outcome: 'REFUND' }), id: 'c11', lang: 'en', brand: 'wht' });
    await processDueJobs();
    expect(tstore.addTask).not.toHaveBeenCalled();
  });
});

describe('Mark Lodged (route wiring)', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const route = require('fs').readFileSync(require('path').join(__dirname, '..', '..', '..', 'app', 'api', 'will', 'actions', 'route.ts'), 'utf8') as string;
  it('chooses the payable wording from the outcome flag AND the chat, and schedules the 14 day job for it', () => {
    expect(route).toMatch(/const payable = lodgedVariant\(customer, await store\.listMessages\(customer\.id\)/);
    expect(route).toMatch(/if \(payable\) \{[\s\S]{0,200}kind: 'PAYABLE_FOLLOWUP'[\s\S]{0,80}14 \* 24 \* 60 \* 60 \* 1000/);
    expect(route).toMatch(/lodgedKey = payable \? lodgedPayableTemplateKey/);
  });
  it('the nightly pass backfills the promise for anyone the button missed', () => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const sched = require('fs').readFileSync(require('path').join(__dirname, '..', 'scheduler.ts'), 'utf8') as string;
    expect(sched).toMatch(/export async function runNightly[\s\S]{0,2500}ensurePayableFollowups\(store\)/);
  });
});
