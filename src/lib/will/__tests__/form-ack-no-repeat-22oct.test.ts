/**
 * Jo, 22 Oct (+39 342): "Hi! I've just sent through my form 😊" got the
 * questionnaire acknowledgement, then Will's own second acknowledgement.
 */
import type { MessageRow } from '@/lib/will/store';
import { FORM_RECEIVED_MSG } from '@/lib/will/i18n';

const msg = (over: Partial<MessageRow>): MessageRow => ({
  id: 'm', customerId: 'c1', direction: 'IN', author: 'CUSTOMER', status: 'SENT', body: '', meta: {}, createdAt: new Date().toISOString(), ...over,
} as MessageRow);
const customer = { id: 'c1', waId: '393427320958', name: 'M', paid: true, state: 'FORM_COMPLETE', aiPaused: false, optedOut: false, isLegacy: false, lang: 'en', income: 'TFN', formComplete: true, missingDocs: [], estimatedRefundCents: null };
const thread: MessageRow[] = [];
const audit = jest.fn().mockResolvedValue(undefined);
jest.mock('@/lib/will/store', () => ({
  getStore: () => ({
    getCustomerByWaId: jest.fn().mockImplementation(async () => ({ ...customer })),
    getCustomerById: jest.fn().mockImplementation(async () => ({ ...customer })),
    listMessages: jest.fn().mockImplementation(async () => [...thread]),
    addMessage: jest.fn().mockResolvedValue({ id: 'x' }), audit,
    getSetting: jest.fn().mockImplementation(async (k: string) => (k === 'ai_mode' ? 'FULL_AUTO' : k === 'decision_mode' ? 'legacy' : undefined)),
    setState: jest.fn().mockResolvedValue(true), updateCustomer: jest.fn(), addJob: jest.fn().mockResolvedValue({ id: 'j' }),
    addTask: jest.fn().mockResolvedValue({ id: 't' }), setSetting: jest.fn(), findOpenTaskForCustomer: jest.fn().mockResolvedValue(null),
    cancelJobsFor: jest.fn().mockResolvedValue(0), bumpCounter: jest.fn().mockResolvedValue(false),
    listJobsForCustomer: jest.fn().mockResolvedValue([]), listTemplates: jest.fn().mockResolvedValue([]),
  }),
}));
jest.mock('@/lib/will/channel', () => ({ deliverOut: jest.fn().mockResolvedValue({ ok: true }), fetchWaMedia: jest.fn() }));
jest.mock('@/lib/will/knowledge', () => ({ retrieveKnowledge: jest.fn().mockResolvedValue([]) }));
jest.mock('@/lib/will/scheduler', () => ({ reconcileSchedule: jest.fn().mockResolvedValue(undefined) }));
const runEngine = jest.fn();
jest.mock('@/lib/will/engine', () => ({ runEngine: (...a: unknown[]) => runEngine(...a) }));
import { runDeferredAutoReply } from '@/lib/will/service';

const now = Date.now();
const iso = (minAgo: number) => new Date(now - minAgo * 60_000).toISOString();
const job = () => ({ payload: { debounce: true, anchorAt: iso(6) }, createdAt: iso(6), runAt: iso(0) });
const ack = () => msg({ id: 'a', direction: 'OUT', author: 'AI', body: FORM_RECEIVED_MSG.en, meta: { waTemplate: { name: 'form_received_en', params: [] } }, createdAt: iso(5) });

beforeEach(() => {
  thread.length = 0; audit.mockClear();
  runEngine.mockReset().mockResolvedValue({ kind: 'sent', replyText: 'x', decision: { action: 'reply', reply_text: 'x', confidence: 1 } });
});

it('her case: the acknowledgement already answered it, no second one', async () => {
  thread.push(msg({ id: '1', body: "Hi! I've just sent through my form 😊", createdAt: iso(6) }), ack());
  await runDeferredAutoReply(customer as never, job());
  expect(runEngine).not.toHaveBeenCalled();
  expect(audit).toHaveBeenCalledWith('assistant', 'auto_reply_covered_by_system_line', expect.anything());
});

it('a question sent with the form is still answered', async () => {
  thread.push(msg({ id: '1', body: 'Sent the form! When will I get the money?', createdAt: iso(6) }), ack());
  await runDeferredAutoReply(customer as never, job());
  expect(runEngine).toHaveBeenCalled();
});

it('a question without a question mark is still answered', async () => {
  thread.push(msg({ id: '1', body: "Sent the form, but I couldn't upload my payslip", createdAt: iso(6) }), ack());
  await runDeferredAutoReply(customer as never, job());
  expect(runEngine).toHaveBeenCalled();
});
