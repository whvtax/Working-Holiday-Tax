/**
 * Jo, 9 Nov: the review flow is exactly two messages.
 *   1. "Hi {name} 😊 / Has your refund landed in your account yet?" (day 10).
 *      "No" -> the same question once more 4 days later. Silence -> nothing.
 *   2. Only after "yes": one short message with the Google review link.
 * No timed ask, no reminder, no opener written by the model, no template,
 * and Will never asks on his own.
 */
const store = {
  reclaimStaleJobs: jest.fn(), getSetting: jest.fn(), setSetting: jest.fn(), dueJobs: jest.fn(),
  claimJob: jest.fn(), getCustomerById: jest.fn(), setJobStatus: jest.fn(), getJob: jest.fn(),
  addJob: jest.fn(), addTask: jest.fn(), addMessage: jest.fn(), audit: jest.fn(), listTemplates: jest.fn(),
  setState: jest.fn(), updateCustomer: jest.fn(), cancelJobsFor: jest.fn(), getMessageById: jest.fn(),
  findOpenTaskForCustomer: jest.fn(), listMessages: jest.fn(), history: jest.fn(),
};
jest.mock('@/lib/will/store', () => ({ getStore: () => store }));
const deliverOut = jest.fn(async (..._a: unknown[]) => ({ ok: true }));
jest.mock('@/lib/will/channel', () => ({
  deliverOut: (...a: unknown[]) => (deliverOut as unknown as (...x: unknown[]) => unknown)(...a),
  sendWhatsAppText: jest.fn().mockResolvedValue({ ok: true }),
  wasAlreadySentVerbatim: jest.fn().mockResolvedValue(false),
  templateApprovedFor: jest.fn().mockResolvedValue(true),
}));
jest.mock('@/lib/will/service', () => ({ runDeferredAutoReply: jest.fn() }));

import fs from 'fs';
import path from 'path';
import { processDueJobs } from '@/lib/will/scheduler';
import { refundCheckinMessage, reviewAskShortMessage, refundNotYetMessage, REVIEW_ASK_SHORT_MSG, REFUND_CHECKIN_MSG } from '@/lib/will/review-asks';

const NOW = new Date('2026-11-09T03:00:00.000Z');
const customer = (over: Record<string, unknown> = {}) => ({
  id: 'c1', waId: '447000000001', name: 'Niamh Kelly', state: 'LODGED', paid: true, aiPaused: false,
  isLegacy: false, optedOut: false, lang: 'en', income: 'TFN', outcome: 'REFUND', estimatedRefundCents: null,
  lastCustomerMsgAt: new Date(NOW.getTime() - 5 * 60000).toISOString(), ...over,
});
const job = (kind: string, payload: Record<string, unknown> = {}) => ({ id: 'j1', customerId: 'c1', kind, payload, runAt: NOW.toISOString(), status: 'SCHEDULED', createdAt: NOW.toISOString() });

beforeEach(() => {
  for (const fn of Object.values(store)) (fn as jest.Mock).mockReset();
  deliverOut.mockClear();
  jest.useFakeTimers().setSystemTime(NOW);
  store.reclaimStaleJobs.mockResolvedValue(0);
  store.getSetting.mockImplementation(async (k: string) => (k === 'ai_mode' ? 'FULL_AUTO' : null));
  store.setSetting.mockResolvedValue(undefined);
  store.claimJob.mockResolvedValue(true);
  store.setJobStatus.mockResolvedValue(undefined);
  store.addJob.mockResolvedValue({ id: 'n' });
  store.audit.mockResolvedValue(undefined);
  store.listMessages.mockResolvedValue([]);
  store.history.mockResolvedValue([]);
  store.findOpenTaskForCustomer.mockResolvedValue(null);
  store.getCustomerById.mockResolvedValue(customer());
});
afterEach(() => jest.useRealTimers());

describe('the wording', () => {
  it('message 1 is exactly Jo\'s', () => {
    expect(refundCheckinMessage('en', 'Niamh')).toBe('Hi Niamh 😊\nHas your refund landed in your account yet?');
  });
  it('message 2 is one short line and the link', () => {
    expect(reviewAskShortMessage('en', 'https://g.page/r/X/review')).toBe('Great to hear! Could you please leave us a short Google review? It would really help us!\nhttps://g.page/r/X/review');
  });
  it('every language, no dashes, no leftover placeholder', () => {
    for (const lang of Object.keys(REVIEW_ASK_SHORT_MSG)) {
      expect(Object.keys(REFUND_CHECKIN_MSG)).toContain(lang);
      for (const t of [reviewAskShortMessage(lang, 'https://g.page/r/X/review'), refundCheckinMessage(lang, 'Lou'), refundNotYetMessage(lang)]) {
        expect(t).not.toMatch(/[–—―]|\{\{/);
      }
    }
  });
  it('"not yet" makes no promise to write again', () => {
    for (const lang of Object.keys(REVIEW_ASK_SHORT_MSG)) expect(refundNotYetMessage(lang)).not.toMatch(/check in again|nochmal|また|vuelvo|reviens|riscrivo|volto/i);
  });
});

describe('the ask, after "yes"', () => {
  it('goes out once, as free text with the link, and nothing is queued after it', async () => {
    store.dueJobs.mockResolvedValue([job('REVIEW_REQUEST', { trigger: 'refund_received' })]);
    await processDueJobs();
    expect(deliverOut).toHaveBeenCalledTimes(1);
    const [, body, , meta, tpl] = deliverOut.mock.calls[0] as unknown[];
    expect(body).toBe(reviewAskShortMessage('en', 'https://g.page/r/CaWt4kV0UmY-EBM/review'));
    expect((meta as { waTemplate?: unknown }).waTemplate).toBeUndefined();
    expect(tpl).toBeUndefined();
    expect(store.addJob).not.toHaveBeenCalled();
  });
  it('a job from the old flow (21-day timer) sends nothing', async () => {
    store.dueJobs.mockResolvedValue([job('REVIEW_REQUEST', { trigger: 'timer' })]);
    await processDueJobs();
    expect(deliverOut).not.toHaveBeenCalled();
  });
  it('outside the 24h window it sends nothing and raises no task', async () => {
    store.getCustomerById.mockResolvedValue(customer({ lastCustomerMsgAt: new Date(NOW.getTime() - 30 * 3600e3).toISOString() }));
    store.dueJobs.mockResolvedValue([job('REVIEW_REQUEST', { trigger: 'refund_received' })]);
    await processDueJobs();
    expect(deliverOut).not.toHaveBeenCalled();
    expect(store.addTask).not.toHaveBeenCalled();
  });
  it('never to someone who owes tax', async () => {
    store.getCustomerById.mockResolvedValue(customer({ outcome: 'PAYABLE' }));
    store.dueJobs.mockResolvedValue([job('REVIEW_REQUEST', { trigger: 'refund_received' })]);
    await processDueJobs();
    expect(deliverOut).not.toHaveBeenCalled();
  });
  it('never twice: a review link already in the chat stops it', async () => {
    store.listMessages.mockResolvedValue([{ id: 'm', customerId: 'c1', direction: 'OUT', author: 'AI', status: 'SENT', body: 'Could you please leave us a short Google review? https://g.page/r/CaWt4kV0UmY-EBM/review', createdAt: '2026-11-08T00:00:00.000Z' }]);
    store.dueJobs.mockResolvedValue([job('REVIEW_REQUEST', { trigger: 'refund_received' })]);
    await processDueJobs();
    expect(deliverOut).not.toHaveBeenCalled();
  });
});

it('no reminder: an old REVIEW_REMIND job sends nothing', async () => {
  store.getSetting.mockImplementation(async (k: string) => (k === 'ai_mode' ? 'FULL_AUTO' : k === 'review_asks' ? { c1: { askedAt: '2026-11-01T00:00:00.000Z' } } : null));
  store.dueJobs.mockResolvedValue([job('REVIEW_REMIND')]);
  await processDueJobs();
  expect(deliverOut).not.toHaveBeenCalled();
});

it('no template for the ask or the reminder is expected in Meta any more', () => {
  const { EXPECTED_META_TEMPLATES } = jest.requireActual('@/lib/will/channel') as typeof import('@/lib/will/channel');
  expect(EXPECTED_META_TEMPLATES.some((t) => /^review_(ask|remind)/.test(t.name))).toBe(false);
  expect(EXPECTED_META_TEMPLATES.some((t) => t.name === 'refund_checkin')).toBe(true);
});

it('wiring: lodged queues no timed ask; Will stays silent on "it landed"; Will never asks himself', () => {
  const root = path.join(process.cwd(), 'src');
  const actions = fs.readFileSync(path.join(root, 'app/api/will/actions/route.ts'), 'utf8');
  expect(actions).not.toMatch(/kind: 'REVIEW_REQUEST'/);
  const service = fs.readFileSync(path.join(root, 'lib/will/service.ts'), 'utf8');
  expect(service).toContain('if ((yesToCheckin || saysRefundLanded(text)) && !hasQuestionOrRequest(text)');
  const pb = fs.readFileSync(path.join(root, 'lib/will/playbook.ts'), 'utf8');
  expect(pb).toContain('# GOOGLE REVIEWS: NEVER YOURS (Jo, 9 Nov');
});
