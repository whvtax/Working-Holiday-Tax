/**
 * VERIFY-18nov, open item 2 (closed 18 Nov): the older Library rows `estimate` ("Hey! We've now
 * gone through...") and `lodged` ("lodged successfully! ... refund should arrive") were not the
 * locked texts and could be sent by hand, the second one to a customer who owes tax. They are
 * gone from the seed, Sync deletes them from a live Library, and the team's send buttons refuse
 * the refund wording for a customer who owes tax. Synthetic data only; nothing is sent.
 */
const customer = {
  id: 'c1', waId: '61400000000', name: 'Ana', lang: null, state: 'COMPLETED', paid: true, outcome: 'PAYABLE',
  aiPaused: false, optedOut: false, isLegacy: false, estimatedRefundCents: null, lastCustomerMsgAt: new Date().toISOString(),
};
const libraryRows = [
  { id: 't1', key: 'lodged_confirmation', body: 'Your tax return has been lodged! ✅\nYour refund should arrive in your bank account within 14 business days.' },
  { id: 't2', key: 'lodged_payable', body: "Your tax return has been lodged! ✅\nWithin 14 days the ATO will email you a payment request.\nIf it doesn't arrive, message us here and we'll send it to you." },
];
const store = {
  getCustomerById: jest.fn(async () => customer),
  listTemplates: jest.fn(async () => libraryRows),
  listMessages: jest.fn(async () => []),
  getSetting: jest.fn(async () => undefined),
  updateCustomer: jest.fn(async () => undefined),
  audit: jest.fn(async () => undefined),
  addJob: jest.fn(async () => ({ id: 'j1' })),
  cancelJobsFor: jest.fn(async () => undefined),
  setJobStatus: jest.fn(async () => undefined),
};
const deliverOut = jest.fn(async () => ({ ok: true }));
jest.mock('@/lib/will/store', () => ({ getStore: () => store }));
jest.mock('@/lib/will/auth', () => ({ sessionValid: jest.fn().mockResolvedValue(true) }));
jest.mock('@/lib/will/after-reply', () => ({ afterHumanReplyIndexed: jest.fn().mockResolvedValue(undefined) }));
jest.mock('@/lib/will/scheduler', () => ({ ...jest.requireActual('@/lib/will/scheduler'), reconcileSchedule: jest.fn().mockResolvedValue(undefined) }));
jest.mock('@/lib/will/channel', () => ({
  sendWhatsAppText: jest.fn().mockResolvedValue({ ok: true }),
  sendWhatsAppTemplate: jest.fn().mockResolvedValue({ ok: true }),
  deliverOut: (...a: unknown[]) => (deliverOut as unknown as (...x: unknown[]) => unknown)(...a),
}));

import { POST } from '@/app/api/will/actions/route';
import { seedTemplates, OBSOLETE_TEMPLATE_KEYS } from '@/lib/will/seed';
import { APPROVED } from '@/lib/will/approved-messages';
import { refundWordingMessage } from '@/lib/will/followup-gate-30oct';
import { LANGS, LODGED_CONFIRMATION_MSG, LODGED_PAYABLE_MSG, ESTIMATE_INVOICE_MSG, ESTIMATE_PAYABLE_MSG } from '@/lib/will/i18n';

const post = (body: Record<string, unknown>) => POST(new Request('http://x/api/will/actions', {
  method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body),
}));
beforeEach(() => { deliverOut.mockClear(); customer.outcome = 'PAYABLE'; });

describe('the old estimate and lodged rows are gone', () => {
  it('the seed has neither row, and Sync deletes them from a live Library', () => {
    const keys = seedTemplates().map((r) => r.key);
    expect(keys).not.toContain('estimate');
    expect(keys).not.toContain('lodged');
    expect(OBSOLETE_TEMPLATE_KEYS).toEqual(expect.arrayContaining(['estimate', 'lodged']));
    expect(seedTemplates().some((r) => /lodged successfully|We've now gone through all your details/.test(r.body))).toBe(false);
  });
  it('APPROVED no longer carries the old wording, the locked texts are still there', () => {
    expect((APPROVED as Record<string, unknown>).estimate_ready).toBeUndefined();
    expect((APPROVED as Record<string, unknown>).lodged).toBeUndefined();
    const keys = seedTemplates().map((r) => r.key);
    for (const k of ['estimate_invoice', 'estimate_payable', 'lodged_confirmation', 'lodged_payable']) expect(keys).toContain(k);
  });
});

describe('refund wording is recognised in every language, payable wording is not', () => {
  it.each(LANGS)('%s', (l) => {
    expect(refundWordingMessage(null, LODGED_CONFIRMATION_MSG[l])).toBe(true);
    expect(refundWordingMessage(null, ESTIMATE_INVOICE_MSG[l].replace('{{AMOUNT}}', '$1,234'))).toBe(true);
    expect(refundWordingMessage(null, LODGED_PAYABLE_MSG[l])).toBe(false);
    expect(refundWordingMessage(null, ESTIMATE_PAYABLE_MSG[l].replace('{{AMOUNT}}', '$1,234'))).toBe(false);
  });
  it('by Library key too, including the retired `lodged`', () => {
    for (const k of ['lodged', 'lodged_confirmation', 'lodged_confirmation_de', 'estimate_invoice_ja', 'refund_checkin_vi']) expect(refundWordingMessage(k, '')).toBe(true);
    for (const k of ['lodged_payable', 'estimate_payable_de', 'signature']) expect(refundWordingMessage(k, '')).toBe(false);
  });
});

describe('the team cannot send the refund wording to a customer who owes tax', () => {
  it('send_template with the refund lodged row is refused, nothing goes out', async () => {
    const res = await post({ action: 'send_template', customerId: 'c1', id: 't1' });
    expect(res.status).toBe(400);
    expect((await res.json()).error).toMatch(/owes tax/);
    expect(deliverOut).not.toHaveBeenCalled();
  });
  it('the same text typed or pasted into the composer is refused too', async () => {
    const res = await post({ action: 'manual_reply', customerId: 'c1', body: libraryRows[0].body });
    expect(res.status).toBe(400);
    expect(deliverOut).not.toHaveBeenCalled();
  });
  it('the payable lodged row still goes out', async () => {
    const res = await post({ action: 'send_template', customerId: 'c1', id: 't2' });
    expect(res.status).toBe(200);
    expect(deliverOut).toHaveBeenCalledTimes(1);
  });
  it('a refund customer still gets the refund lodged row', async () => {
    customer.outcome = 'REFUND';
    const res = await post({ action: 'send_template', customerId: 'c1', id: 't1' });
    expect(res.status).toBe(200);
    expect(deliverOut).toHaveBeenCalledTimes(1);
  });
});
