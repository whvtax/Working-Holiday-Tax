/**
 * Audit, 5 Sep (sched-14): the unmatched-questionnaire task has a real action.
 *
 * When the form's phone matched no WhatsApp chat, the task said "find the
 * customer in the CRM and mark their form complete by hand", and the CRM had
 * no such control: moving the stage badge only moved the badge. Now:
 *  - the matched path of notifyFormReceived is applyFormReceived, and the
 *    owner's "Link to chat" (action mark_form_received) calls that same
 *    function, so the two paths cannot diverge;
 *  - the unmatched task carries the number, email and Medicare answer in a
 *    shape parseUnmatchedFormTask reads back, so the Medicare message is not
 *    lost when the owner links the chat by hand.
 * Nothing said to the customer changes: the confirmation, the ABN questions
 * and the Medicare message are the same jobs the automatic match queues.
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
  // raiseOrFoldSystemTask's fold check (audit3 sched 60): no open card yet
  // in these tests, so it always falls through to addTask as before.
  listTasks: jest.fn().mockResolvedValue([]),
  updateTask: jest.fn().mockResolvedValue(undefined),
  getCustomerById: jest.fn().mockImplementation(async () => ({ ...customer })),
  setState: jest.fn().mockResolvedValue(true),
  findCustomerByPhone: jest.fn().mockImplementation(async () => null),
  // A before-payment "No" is remembered as a setting (audit3-sched-24).
  getSetting: jest.fn().mockResolvedValue(undefined),
  setSetting: jest.fn().mockResolvedValue(undefined),
};
jest.mock('@/lib/will/store', () => ({ getStore: () => store }));
import {
  notifyFormReceived, applyFormReceived, parseUnmatchedFormTask, unmatchedFormTaskContext, MEDICARE_DELAY_MS,
} from '@/lib/will/form-link';
import type { CustomerRow } from '@/lib/will/store';

const cust = () => ({ ...customer }) as unknown as CustomerRow;
const jobs = (kind: string) => store.addJob.mock.calls.map((c) => c[0] as { kind: string; runAt: string }).filter((j) => j.kind === kind);

beforeEach(() => {
  Object.assign(customer, { state: 'FORM_PENDING', formComplete: false });
  for (const fn of Object.values(store)) (fn as jest.Mock).mockClear();
  store.findCustomerByPhone.mockImplementation(async () => null);
});

describe('the unmatched task carries the submission and reads it back', () => {
  it('records number, email and the Medicare answer', async () => {
    await notifyFormReceived('07851 436936', 'ana@example.com', 'tax-return', 'No');
    expect(store.addTask).toHaveBeenCalledTimes(1);
    const task = store.addTask.mock.calls[0][0] as { customerId: null; context: string };
    expect(task.customerId).toBeNull();
    expect(parseUnmatchedFormTask(task.context)).toEqual({ waNumber: '07851 436936', email: 'ana@example.com', hasMedicare: 'No' });
    // No dead instruction, and it points at the control that exists.
    expect(task.context).not.toMatch(/by hand/);
    expect(task.context).toMatch(/Link to chat/);
  });

  it('reads back without an email or a Medicare answer', () => {
    expect(parseUnmatchedFormTask(unmatchedFormTaskContext('0424 513 998'))).toEqual({ waNumber: '0424 513 998', email: null, hasMedicare: null });
    expect(parseUnmatchedFormTask(unmatchedFormTaskContext('0424 513 998', null, ''))).toEqual({ waNumber: '0424 513 998', email: null, hasMedicare: null });
  });

  it('is null for any other task, so Link to chat only shows where it applies', () => {
    expect(parseUnmatchedFormTask(null)).toBeNull();
    expect(parseUnmatchedFormTask('')).toBeNull();
    expect(parseUnmatchedFormTask('Opened from the Overview assistant')).toBeNull();
    expect(parseUnmatchedFormTask('Medicare answer: "No". Something else')).toBeNull();
  });
});

describe('linking by hand runs the automatic path', () => {
  it('Form Pending: FORM_RECEIVED now and, for "No", MEDICARE_INFO 15 minutes out', async () => {
    const before = Date.now();
    const outcome = await applyFormReceived(cust(), { email: 'ana@example.com', hasMedicare: 'No', matchedOn: 'owner-link' });
    expect(outcome).toBe('queued');
    expect(jobs('FORM_RECEIVED')).toHaveLength(1);
    const med = jobs('MEDICARE_INFO');
    expect(med).toHaveLength(1);
    expect(new Date(med[0].runAt).getTime() - before).toBeGreaterThanOrEqual(MEDICARE_DELAY_MS - 1000);
    expect(store.audit).toHaveBeenCalledWith('system', 'form_received_queued',
      expect.objectContaining({ customerId: 'c1', email: 'a***@example.com', matchedOn: 'owner-link' }));
    // Nothing is set directly: the FORM_RECEIVED handler owns form_complete,
    // the stage move, the reminder cancel and the confirmation.
    expect(store.updateCustomer).not.toHaveBeenCalled();
    expect(store.setState).not.toHaveBeenCalled();
  });

  it('Paid works the same; "Yes" sends no Medicare message', async () => {
    Object.assign(customer, { state: 'PAID' });
    expect(await applyFormReceived(cust(), { hasMedicare: 'Yes' })).toBe('queued');
    expect(jobs('FORM_RECEIVED')).toHaveLength(1);
    expect(jobs('MEDICARE_INFO')).toHaveLength(0);
  });

  it('before payment: remembered only, nothing queued', async () => {
    Object.assign(customer, { state: 'PRICE_SENT' });
    expect(await applyFormReceived(cust(), { hasMedicare: 'No' })).toBe('remembered');
    expect(store.updateCustomer).toHaveBeenCalledWith('c1', { formComplete: true });
    expect(store.addJob).not.toHaveBeenCalled();
  });

  it('past the questionnaire: ignored and audited', async () => {
    Object.assign(customer, { state: 'REVIEW' });
    expect(await applyFormReceived(cust(), {})).toBe('ignored');
    expect(store.addJob).not.toHaveBeenCalled();
    expect(store.audit).toHaveBeenCalledWith('system', 'form_received_ignored', expect.anything());
  });

  it('the automatic match goes through the very same function', async () => {
    store.findCustomerByPhone.mockImplementation(async () => ({ ...customer }));
    await notifyFormReceived('61400000001', 'ana@example.com', 'tax-return', 'No');
    expect(jobs('FORM_RECEIVED')).toHaveLength(1);
    expect(jobs('MEDICARE_INFO')).toHaveLength(1);
    expect(store.addTask).not.toHaveBeenCalled();
    expect(store.audit).toHaveBeenCalledWith('system', 'form_received_queued', expect.objectContaining({ matchedOn: 'phone-tail-9' }));
  });
});

describe('wiring (source shape)', () => {
  const root = join(__dirname, '..', '..', '..');
  const route = readFileSync(join(root, 'app', 'api', 'will', 'actions', 'route.ts'), 'utf8');
  const dash = readFileSync(join(root, 'components', 'will', 'Dashboard.tsx'), 'utf8');
  const link = readFileSync(join(root, 'components', 'will', 'LinkFormTask.tsx'), 'utf8');

  it('mark_form_received exists and delegates to applyFormReceived, resolving the task', () => {
    expect(route).toMatch(/case 'mark_form_received'/);
    expect(route).toMatch(/applyFormReceived\(customer, \{[\s\S]*?hasMedicare: submitted\?\.hasMedicare/);
    expect(route).toMatch(/parseUnmatchedFormTask\(task\?\.context\)/);
    expect(route).toMatch(/if \(task && task\.status === 'OPEN'\) await store\.resolveTask\(task\.id\)/);
    expect(route).toMatch(/'form_linked_by_hand'/);
  });

  it('the Tasks board offers Link to chat on system tasks and it calls the action', () => {
    expect(dash).toMatch(/\{!t\.customerId && <LinkFormTask task=\{t\}/);
    expect(link).toMatch(/action: 'mark_form_received', customerId: c\.id, taskId: task\.id/);
    expect(link).toMatch(/\/api\/will\/search\?q=/);
    // Only where it applies: any other System task renders nothing.
    expect(link).toMatch(/if \(!submitted\) return null;/);
  });
});
