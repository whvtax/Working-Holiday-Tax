/**
 * Audit, 5 Sep (sched-24): a Medicare "No" on a questionnaire that arrives
 * BEFORE payment is not lost.
 *
 * Before: the before-payment branch stored only formComplete and threw the
 * hasMedicare answer away. The Paid cascade replays FORM_RECEIVED with an
 * empty payload, so nothing ever queued MEDICARE_INFO for exactly the people
 * Jo said should get the exemption message on their own. Now the "No" is
 * remembered as a setting next to the flag, and the scheduler's FORM_RECEIVED
 * handler, on the replay that wins the transition, queues MEDICARE_INFO with
 * the same 15 minute spacing and clears the setting. Same message, same
 * timing after the acknowledgement, same stand-aside for pending ABN answers.
 */
import { readFileSync } from 'fs';
import { join } from 'path';

const customer = {
  id: 'c1', waId: '61400000001', name: 'Alex', state: 'PRICE_SENT', paid: false, formComplete: false,
  optedOut: false, aiPaused: false, isLegacy: false, lang: null, income: 'TFN',
};
const settings = new Map<string, unknown>();
const store = {
  updateCustomer: jest.fn().mockImplementation(async (_id: string, patch: Record<string, unknown>) => { Object.assign(customer, patch); }),
  audit: jest.fn().mockResolvedValue(undefined),
  addJob: jest.fn().mockResolvedValue({ id: 'j1' }),
  addTask: jest.fn().mockResolvedValue(undefined),
  getCustomerById: jest.fn().mockImplementation(async () => ({ ...customer })),
  setState: jest.fn().mockImplementation(async (_id: string, to: string) => { customer.state = to; return true; }),
  findCustomerByPhone: jest.fn().mockImplementation(async () => ({ ...customer })),
  getSetting: jest.fn().mockImplementation(async (k: string) => settings.get(k)),
  setSetting: jest.fn().mockImplementation(async (k: string, v: unknown) => { settings.set(k, v); }),
};
jest.mock('@/lib/will/store', () => ({ getStore: () => store }));
import { notifyFormReceived, medicareNoKey, MEDICARE_DELAY_MS } from '@/lib/will/form-link';

const medicareJobs = () => store.addJob.mock.calls
  .map((c) => c[0] as { kind: string; runAt: string })
  .filter((j) => j.kind === 'MEDICARE_INFO');

beforeEach(() => {
  Object.assign(customer, { state: 'PRICE_SENT', paid: false, formComplete: false });
  settings.clear();
  for (const fn of Object.values(store)) (fn as jest.Mock).mockClear();
});

describe('before payment, form-link remembers the "No"', () => {
  it('as a setting next to the formComplete flag, with nothing queued or sent yet', async () => {
    const r = await notifyFormReceived('61400000001', 'a@b.c', 'tax-return', 'No');
    expect(r.matched).toBe(true);
    expect(customer.formComplete).toBe(true);
    expect(settings.get(medicareNoKey('c1'))).toBe(true);
    expect(store.addJob).not.toHaveBeenCalled();
    expect(store.setState).not.toHaveBeenCalled();
    expect(store.audit).toHaveBeenCalledWith('system', 'medicare_no_remembered', { customerId: 'c1' });
  });

  it('"Yes" or a blank answer leaves no setting behind', async () => {
    for (const v of ['Yes', '', null, undefined]) {
      Object.assign(customer, { formComplete: false });
      await notifyFormReceived('61400000001', 'a@b.c', 'tax-return', v as string | null);
    }
    expect(settings.has(medicareNoKey('c1'))).toBe(false);
    expect(store.setSetting).not.toHaveBeenCalled();
  });

  it('after payment the normal path still queues it directly, and only records that the exemption applies (Jo, 6 Sep: needed so the auto-off-at-Review check can tell "applies" from "not applicable")', async () => {
    Object.assign(customer, { state: 'FORM_PENDING', paid: true });
    await notifyFormReceived('61400000001', 'a@b.c', 'tax-return', 'No');
    expect(medicareJobs()).toHaveLength(1);
    expect(store.setSetting).toHaveBeenCalledWith('medicare_applies:c1', true);
    expect(store.setSetting).not.toHaveBeenCalledWith(medicareNoKey('c1'), expect.anything());
  });
});

describe('the FORM_RECEIVED handler replays it', () => {
  const scheduler = readFileSync(join(process.cwd(), 'src/lib/will/scheduler.ts'), 'utf8');
  const handler = (() => {
    const start = scheduler.indexOf("if (job.kind === 'FORM_RECEIVED')");
    const end = scheduler.indexOf("if (job.kind === 'MEDICARE_INFO')", start);
    expect(start).toBeGreaterThan(-1);
    return scheduler.slice(start, end);
  })();

  it('reads the remembered "No", clears it, and queues MEDICARE_INFO 15 minutes out', () => {
    expect(handler).toMatch(/await store\.getSetting\(medicareNoKey\(customer\.id\)\)\) === true/);
    expect(handler).toMatch(/await store\.setSetting\(medicareNoKey\(customer\.id\), false\)/);
    expect(handler).toMatch(/kind: 'MEDICARE_INFO',\s*payload: \{ attempt: 0 \},\s*runAt: new Date\(Date\.now\(\) \+ MEDICARE_DELAY_MS\)/);
    expect(handler).toMatch(/medicare_info_queued/);
  });

  it('only after the transition is won, so two replays cannot both queue it', () => {
    const wonAt = handler.indexOf("await store.setState(customer.id, 'FORM_COMPLETE', 'SYSTEM')");
    const replayAt = handler.indexOf('medicareNoKey(customer.id)');
    expect(wonAt).toBeGreaterThan(-1);
    expect(replayAt).toBeGreaterThan(wonAt);
  });

  it('a setting read that fails cannot stop the acknowledgement', () => {
    expect(handler).toMatch(/medicare_no_replay_failed/);
  });

  it('the 15 minute spacing is the one form-link uses', () => {
    expect(MEDICARE_DELAY_MS).toBe(15 * 60 * 1000);
    expect(scheduler).toMatch(/import \{ medicareNoKey, medicareInfoSentKey, MEDICARE_DELAY_MS \} from '\.\/form-link'/);
  });
});
