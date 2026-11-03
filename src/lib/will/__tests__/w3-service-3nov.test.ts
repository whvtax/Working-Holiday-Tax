/**
 * 3 Nov, wave 3 integration: short payment is not Paid, a full payment still
 * is, and "only an employee" is never quoted the ABN price. Synthetic data.
 */
const customer: Record<string, unknown> = { id: 'c1', waId: '61400000001', name: 'Alex', paid: false, state: 'PRICE_SENT', optedOut: false, income: 'TFN', lang: 'en', aiPaused: false, isLegacy: false };
const addMessage = jest.fn().mockResolvedValue({ id: 'msg1' });
const addTask = jest.fn().mockResolvedValue({ id: 't1' });
const setState = jest.fn().mockResolvedValue(true);
const settings: Record<string, unknown> = { ai_mode: 'FULL_AUTO' };
const getSetting = jest.fn(async (k: string) => settings[k] ?? null);
const setSetting = jest.fn(async (k: string, v: unknown) => { settings[k] = v; });
const audit = jest.fn().mockResolvedValue(undefined);
jest.mock('@/lib/will/store', () => ({
  getStore: () => ({
    getCustomerByWaId: jest.fn().mockResolvedValue(customer),
    getCustomerById: jest.fn().mockResolvedValue(customer),
    addMessage, addTask, setState, getSetting, setSetting, audit,
    addJob: jest.fn().mockResolvedValue({ id: 'j1' }),
    bumpCounter: jest.fn().mockResolvedValue(false),
    listMessages: jest.fn().mockResolvedValue([]),
  }),
}));
const deliverOut = jest.fn().mockResolvedValue({ ok: true });
jest.mock('@/lib/will/channel', () => ({
  fetchWaMedia: jest.fn().mockResolvedValue({ ok: true, body: new ArrayBuffer(4), mime: 'image/jpeg' }),
  deliverOut: (...a: unknown[]) => deliverOut(...a),
}));
const assessPaymentProofImage = jest.fn();
jest.mock('@/lib/will/claude', () => ({ assessPaymentProofImage: (...a: unknown[]) => assessPaymentProofImage(...a) }));
jest.mock('@/lib/will/scheduler', () => ({ reconcileSchedule: jest.fn().mockResolvedValue(undefined) }));

import { handlePaymentProofMedia } from '@/lib/will/service';
import { detectChoice, abnStance } from '@/lib/will/instant-choice';
import { hasDash } from './w3-helpers-guard';

const media = { id: 'm1', kind: 'image', mime: 'image/jpeg' };
const proof = (amountAud: number) => ({
  isProof: true, reason: 'bank transfer',
  details: { amountAud, recipientIsUs: 'yes', status: 'completed' },
});

beforeEach(() => {
  addMessage.mockClear(); addTask.mockClear(); setState.mockClear(); deliverOut.mockClear(); audit.mockClear();
  for (const k of Object.keys(settings)) delete settings[k];
  settings.ai_mode = 'FULL_AUTO';
  customer.income = 'TFN'; customer.paid = false;
});

describe('short and over payments (3 Nov)', () => {
  it('a $150 payment is not Paid: one line asks for the rest', async () => {
    assessPaymentProofImage.mockResolvedValue(proof(150));
    await handlePaymentProofMedia('61400000001', 'I paid it now', { media });
    expect(setState).not.toHaveBeenCalled();
    expect(deliverOut).toHaveBeenCalledTimes(1);
    const line = String(deliverOut.mock.calls[0][1]);
    expect(line).toMatch(/\$220/);
    expect(hasDash(line)).toBe(false);
  });

  it('the same short total is only asked once', async () => {
    assessPaymentProofImage.mockResolvedValue(proof(150));
    await handlePaymentProofMedia('61400000001', 'I paid it now', { media });
    await handlePaymentProofMedia('61400000001', 'I paid it now', { media });
    expect(deliverOut).toHaveBeenCalledTimes(1);
  });

  it('the exact fee is still confirmed', async () => {
    assessPaymentProofImage.mockResolvedValue(proof(220));
    await handlePaymentProofMedia('61400000001', 'paid', { media });
    expect(setState).toHaveBeenCalledWith('c1', 'PAID', 'SYSTEM');
  });

  it('a payment that matches another fee is not called short', async () => {
    assessPaymentProofImage.mockResolvedValue(proof(385));
    await handlePaymentProofMedia('61400000001', 'paid', { media });
    expect(setState).toHaveBeenCalled();
  });

  it('an overpayment is confirmed and leaves a review task', async () => {
    assessPaymentProofImage.mockResolvedValue(proof(300));
    await handlePaymentProofMedia('61400000001', 'paid', { media });
    expect(setState).toHaveBeenCalled();
    expect(addTask.mock.calls.some((c) => /overpaid/.test(c[0].reason) && c[0].severity === 'REVIEW')).toBe(true);
  });
});

describe('ABN negations in the instant choice (3 Nov)', () => {
  it('an employee with no ABN is TFN', () => {
    expect(detectChoice('only an employee, no ABN', null)).toBe('TFN');
    expect(abnStance(['I was only an employee, no ABN'])).toBe('no_abn');
  });
  it('not self-employed is not an ABN', () => {
    expect(abnStance(['I am not self-employed'])).toBe('no_abn');
  });
  it('a real ABN is still an ABN', () => {
    expect(detectChoice('I drive for Uber', null)).toBe('TFN_ABN');
  });
});
