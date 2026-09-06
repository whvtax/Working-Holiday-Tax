/**
 * The Medicare exemption message sends itself (Jo, 4 Sep).
 *
 * "Do you have access to Medicare in Australia?" = No, on the questionnaire, is
 * exactly the group that can apply for the Medicare Levy Exemption. Nobody
 * should have to notice that and send it by hand. So the form submission queues
 * a MEDICARE_INFO job for 15 minutes later, and the scheduler sends the Library
 * entry `medicare` as the approved template of that name.
 *
 * 15 minutes, not immediately: the questionnaire acknowledgement (or, for a
 * TFN+ABN customer, the ABN questions) goes on the next tick, and two messages
 * landing together read as a blast.
 */
import { readFileSync } from 'fs';
import { join } from 'path';

const customer = {
  id: 'c1', waId: '61400000001', name: 'Alex', state: 'FORM_PENDING', paid: true, formComplete: false,
  optedOut: false, aiPaused: false, isLegacy: false, lang: null, income: 'TFN',
};
const store = {
  updateCustomer: jest.fn().mockResolvedValue(undefined),
  audit: jest.fn().mockResolvedValue(undefined),
  addJob: jest.fn().mockResolvedValue({ id: 'j1' }),
  addTask: jest.fn().mockResolvedValue(undefined),
  getCustomerById: jest.fn().mockImplementation(async () => ({ ...customer })),
  setState: jest.fn().mockResolvedValue(true),
  findCustomerByPhone: jest.fn().mockImplementation(async () => ({ ...customer })),
  // The before-payment branch now remembers a "No" as a setting (audit, 5 Sep).
  getSetting: jest.fn().mockResolvedValue(undefined),
  setSetting: jest.fn().mockResolvedValue(undefined),
};
jest.mock('@/lib/will/store', () => ({ getStore: () => store }));
import { notifyFormReceived, noMedicare, MEDICARE_DELAY_MS } from '@/lib/will/form-link';

beforeEach(() => {
  Object.assign(customer, { state: 'FORM_PENDING' });
  for (const fn of Object.values(store)) (fn as jest.Mock).mockClear();
});

const medicareJobs = () => store.addJob.mock.calls
  .map((c) => c[0] as { kind: string; runAt: string })
  .filter((j) => j.kind === 'MEDICARE_INFO');

describe('who gets it', () => {
  it('"No" queues it, 15 minutes out', async () => {
    const before = Date.now();
    await notifyFormReceived('61400000001', 'a@b.c', 'tax-return', 'No');
    const jobs = medicareJobs();
    expect(jobs).toHaveLength(1);
    const delay = new Date(jobs[0].runAt).getTime() - before;
    expect(delay).toBeGreaterThanOrEqual(MEDICARE_DELAY_MS - 1000);
    expect(delay).toBeLessThan(MEDICARE_DELAY_MS + 60_000);
    expect(store.audit).toHaveBeenCalledWith('system', 'medicare_info_queued', expect.anything());
  });

  it('"Yes" does not', async () => {
    await notifyFormReceived('61400000001', 'a@b.c', 'tax-return', 'Yes');
    expect(medicareJobs()).toHaveLength(0);
  });

  it('an unanswered or unrecognised field does not', async () => {
    for (const v of ['', '   ', null, undefined, 'maybe', 'nope', 'N']) {
      await notifyFormReceived('61400000001', 'a@b.c', 'tax-return', v as string | null);
    }
    expect(medicareJobs()).toHaveLength(0);
  });

  it('the questionnaire still works when nothing is passed at all', async () => {
    await notifyFormReceived('61400000001', 'a@b.c');
    expect(store.addJob).toHaveBeenCalledWith(expect.objectContaining({ kind: 'FORM_RECEIVED' }));
    expect(medicareJobs()).toHaveLength(0);
  });

  it('a lead who fills the form BEFORE paying gets nothing yet, but the "No" is remembered', async () => {
    Object.assign(customer, { state: 'PRICE_SENT' });
    await notifyFormReceived('61400000001', 'a@b.c', 'tax-return', 'No');
    expect(medicareJobs()).toHaveLength(0);
    // Replayed by the FORM_RECEIVED handler once they pay (audit3-sched-24).
    expect(store.setSetting).toHaveBeenCalledWith('medicare_no:c1', true);
  });

  it('the super / TFN / ABN application forms never trigger it', async () => {
    for (const k of ['super', 'tfn', 'abn'] as const) {
      await notifyFormReceived('61400000001', 'a@b.c', k, 'No');
    }
    expect(medicareJobs()).toHaveLength(0);
  });
});

describe('noMedicare', () => {
  it('is only an explicit no', () => {
    expect(noMedicare('No')).toBe(true);
    expect(noMedicare('no')).toBe(true);
    expect(noMedicare(' NO ')).toBe(true);
    expect(noMedicare('Yes')).toBe(false);
    expect(noMedicare('')).toBe(false);
    expect(noMedicare(null)).toBe(false);
    expect(noMedicare(undefined)).toBe(false);
  });
});

describe('the scheduler handler', () => {
  const scheduler = readFileSync(join(process.cwd(), 'src/lib/will/scheduler.ts'), 'utf8');
  const handler = (() => {
    const start = scheduler.indexOf("if (job.kind === 'MEDICARE_INFO')");
    const end = scheduler.indexOf("if (job.kind === 'REVIEW_REQUEST')", start);
    expect(start).toBeGreaterThan(-1);
    return scheduler.slice(start, end);
  })();

  it('sends the Library entry for the customer language (`medicare` in English), with the code copy as the fallback', () => {
    // audit3-sched-35: the key is medicare / medicare_<lang>, English verbatim.
    expect(handler).toMatch(/const medicareKey = medicareTemplateKey\(customer\.lang\)/);
    expect(handler).toMatch(/x\.key === medicareKey/);
    expect(handler).toMatch(/APPROVED\.medicare_exemption/);
    expect(handler).toMatch(/medicareMessage\(customer\.lang\)/);
  });

  it('goes as the approved template, falling back to text', () => {
    expect(handler).toMatch(/name: medicareKey, params: \[\], lang: customer\.lang, fallbackToText: true/);
  });

  it('runs through the Policy Guard and hands a violation to a human', () => {
    expect(handler).toMatch(/policyGuard\(body,/);
    expect(handler).toMatch(/Medicare exemption message held by the Policy Guard/);
  });

  it('stands aside while the ABN answers are still outstanding, but not forever', () => {
    expect(handler).toMatch(/abnAnswersPendingKey\(customer\.id\)/);
    expect(handler).toMatch(/attempt < 8/);
    expect(handler).toMatch(/attempt: attempt \+ 1/);
  });

  it('respects opt-out, legacy imports and Approval mode', () => {
    expect(handler).toMatch(/!customer\.optedOut && !customer\.isLegacy/);
    expect(handler).toMatch(/if \(await inApprovalMode\(\)\)/);
  });

  it('a failed delivery becomes a task rather than silence', () => {
    expect(handler).toMatch(/The Medicare exemption message was not delivered/);
    expect(handler).toMatch(/medicare_info_failed/);
  });
});

it('the tax-return form actually passes the answer through', () => {
  const route = readFileSync(join(process.cwd(), 'src/app/api/tax-form/route.ts'), 'utf8');
  expect(route).toMatch(/notifyFormReceived\(whatsapp, email, 'tax-return', sanitiseShort\(formData\.get\('hasMedicare'\)\)\)/);
});
