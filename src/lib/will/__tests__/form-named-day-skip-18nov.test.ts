/**
 * VERIFY-18nov, open item 3 (closed 18 Nov, Jo: one reminder, then it is the customer's
 * business). A customer at Form Pending who names a day for the form has engaged: the single
 * 6-hour reminder is SKIPPED, never moved to that day. The signature named-day write is gone.
 * Synthetic data only; nothing is sent.
 */
import { readFileSync } from 'fs';
import { join } from 'path';

const settings = new Map<string, unknown>();
const store = {
  reclaimStaleJobs: jest.fn().mockResolvedValue(0),
  getSetting: jest.fn(async (k: string) => (settings.has(k) ? settings.get(k) : (k === 'ai_mode' ? 'FULL_AUTO' : undefined))),
  setSetting: jest.fn(async (k: string, v: unknown) => { settings.set(k, v); }),
  dueJobs: jest.fn(),
  claimJob: jest.fn().mockResolvedValue(true),
  getCustomerById: jest.fn(),
  setJobStatus: jest.fn().mockResolvedValue(undefined),
  addJob: jest.fn().mockResolvedValue({ id: 'new' }),
  addTask: jest.fn().mockResolvedValue({ id: 't1' }),
  updateTask: jest.fn().mockResolvedValue(undefined),
  resolveTask: jest.fn().mockResolvedValue(undefined),
  addMessage: jest.fn().mockResolvedValue({ id: 'm-new' }),
  audit: jest.fn().mockResolvedValue(undefined),
  listTemplates: jest.fn().mockResolvedValue([]),
  setState: jest.fn(),
  updateCustomer: jest.fn(),
  cancelJobsFor: jest.fn().mockResolvedValue(0),
  getMessageById: jest.fn(),
  findOpenTaskForCustomer: jest.fn().mockResolvedValue(null),
  listMessages: jest.fn().mockResolvedValue([]),
  listCustomers: jest.fn().mockResolvedValue([]),
  listJobsForCustomer: jest.fn().mockResolvedValue([]),
  getJob: jest.fn().mockResolvedValue(null),
};
jest.mock('@/lib/will/store', () => ({ getStore: () => store }));
const deliverOut = jest.fn(async (..._a: unknown[]) => ({ ok: true }) as { ok: boolean; error?: string });
jest.mock('@/lib/will/channel', () => ({
  deliverOut: (...a: unknown[]) => (deliverOut as unknown as (...x: unknown[]) => unknown)(...a),
  templateApprovedFor: jest.fn(async () => true),
  sendWhatsAppText: jest.fn().mockResolvedValue({ ok: true }),
  sendWhatsAppTemplate: jest.fn().mockResolvedValue({ ok: true }),
  wasAlreadySentVerbatim: jest.fn().mockResolvedValue(false),
}));
jest.mock('@/lib/will/service', () => ({ runDeferredAutoReply: jest.fn() }));
jest.mock('@/lib/will/config', () => ({ ...jest.requireActual('@/lib/will/config'), withinQuietHours: () => true }));

import { processDueJobs } from '@/lib/will/scheduler';
import { APPROVED } from '@/lib/will/approved-messages';
import { formPromisedKey } from '@/lib/will/promised-date';
import * as promised from '@/lib/will/promised-date';

const NOW = new Date('2026-11-18T01:00:00.000Z');
const HOUR = 3_600_000;
const ago = (ms: number) => new Date(NOW.getTime() - ms).toISOString();
const customer = () => ({
  id: 'c1', waId: '61400000000', name: 'Sam', state: 'FORM_PENDING', paid: true, aiPaused: false, isLegacy: false, optedOut: false,
  lang: 'en', income: 'TFN', formComplete: false, lastCustomerMsgAt: ago(5 * HOUR), lastMessageAt: ago(5 * HOUR), stateChangedAt: ago(6 * HOUR),
  estimatedRefundCents: null,
});
const formJob = { id: 'f1', customerId: 'c1', kind: 'FOLLOW_UP', payload: { flow: 'form', templateKey: 'fu_form_6h', seq: 0 }, runAt: ago(0), status: 'SCHEDULED', createdAt: ago(6 * HOUR) };

beforeEach(() => {
  settings.clear();
  for (const f of [deliverOut, store.audit, store.addJob, store.setJobStatus]) (f as jest.Mock).mockClear();
  jest.useFakeTimers().setSystemTime(NOW);
  store.getCustomerById.mockResolvedValue(customer());
  store.dueJobs.mockResolvedValue([formJob]);
  store.listTemplates.mockResolvedValue([{ key: 'fu_form_6h', title: 'Form 6h', body: APPROVED.followups_form.h6, active: true }]);
});
afterEach(() => jest.useRealTimers());

describe('a named day for the form skips the 6-hour reminder', () => {
  it('named day in the future: nothing is sent, nothing is re-armed for that day', async () => {
    const wednesday = new Date(NOW.getTime() + 3 * 24 * HOUR).toISOString();
    settings.set(formPromisedKey('c1'), wednesday);
    await processDueJobs();
    expect(deliverOut).not.toHaveBeenCalled();
    expect(store.addJob).not.toHaveBeenCalledWith(expect.objectContaining({ runAt: wednesday }));
    expect(store.addJob).not.toHaveBeenCalledWith(expect.objectContaining({ kind: 'FOLLOW_UP', payload: expect.objectContaining({ templateKey: 'fu_form_6h' }) }));
    expect(store.setJobStatus).toHaveBeenCalledWith('f1', 'DONE');
    expect(store.audit).toHaveBeenCalledWith('scheduler', 'form_reminder_skipped_named_day', expect.objectContaining({ customerId: 'c1' }));
    expect(store.audit).not.toHaveBeenCalledWith('scheduler', 'form_reminder_deferred_promised_date', expect.anything());
  });

  it('a named day that has already passed still skips it (they engaged)', async () => {
    settings.set(formPromisedKey('c1'), ago(2 * HOUR));
    await processDueJobs();
    expect(deliverOut).not.toHaveBeenCalled();
  });

  it('no named day: the one reminder goes as free text while the window is open', async () => {
    await processDueJobs();
    expect(deliverOut).toHaveBeenCalledTimes(1);
    const [, body] = deliverOut.mock.calls[0] as [unknown, string];
    expect(body).toMatch(/Did you get a chance to fill out the form yet\?/);
  });
});

describe('the signature named-day write is deleted', () => {
  it('service.ts no longer writes it and promised-date.ts no longer exports its key', () => {
    const src = readFileSync(join(process.cwd(), 'src/lib/will/service.ts'), 'utf8');
    expect(src).not.toMatch(/signaturePromisedKey|signature_check_back_set/);
    expect((promised as Record<string, unknown>).signaturePromisedKey).toBeUndefined();
  });
});
