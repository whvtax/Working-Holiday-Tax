/**
 * Jo, 22 Oct: the last keyword decisions move to Will in 'will' mode:
 * closing a lead, a vendor, "not yet" after lodgement, the referral line, and
 * the acknowledgement for files a paid customer sends.
 */
import { REVIEW_ASKS_SETTING } from '@/lib/will/review-asks';
import { renderApproved } from '@/lib/will/will-decides';

type Row = { direction: 'IN' | 'OUT'; body: string; status: string; createdAt: string; author: string; meta?: Record<string, unknown> };
const messages: Row[] = [];
const settings = new Map<string, unknown>();
const customer: Record<string, unknown> = {};
const audit = jest.fn().mockResolvedValue(undefined);
const addJob = jest.fn().mockResolvedValue({ id: 'j' });
const setState = jest.fn().mockResolvedValue(true);
const addTask = jest.fn().mockResolvedValue({ id: 't' });
jest.mock('@/lib/will/store', () => ({
  getStore: () => ({
    getCustomerByWaId: jest.fn().mockImplementation(async () => ({ ...customer })),
    getCustomerById: jest.fn().mockImplementation(async () => ({ ...customer })),
    createCustomer: jest.fn(),
    addMessage: jest.fn().mockImplementation(async (m: Row) => { messages.push({ ...m, status: m.status ?? 'SENT', createdAt: new Date().toISOString() }); return { id: `m${messages.length}`, ...m }; }),
    updateCustomer: jest.fn(), findOpenTaskForCustomer: jest.fn().mockResolvedValue(null), addTask, updateTask: jest.fn(),
    cancelJobsFor: jest.fn().mockResolvedValue(0), audit, addJob, setState,
    getSetting: jest.fn().mockImplementation(async (k: string) => (k === 'ai_mode' ? 'FULL_AUTO' : settings.get(k))),
    setSetting: jest.fn().mockImplementation(async (k: string, v: unknown) => { settings.set(k, v); }),
    listMessages: jest.fn().mockImplementation(async () => messages.map((m, i) => ({ id: `m${i}`, customerId: 'c1', ...m }))),
    listTemplates: jest.fn().mockResolvedValue([]), listJobsForCustomer: jest.fn().mockResolvedValue([]),
    history: jest.fn().mockResolvedValue([]), listPendingOutbound: jest.fn().mockResolvedValue([]),
    bumpCounter: jest.fn().mockResolvedValue(false), getMessageById: jest.fn(),
  }),
}));
const sent: string[] = [];
jest.mock('@/lib/will/channel', () => ({
  deliverOut: jest.fn().mockImplementation(async (_c: unknown, body: string) => { sent.push(body); return { ok: true }; }),
  fetchWaMedia: jest.fn().mockResolvedValue({ ok: false, error: 'not in test' }),
}));
jest.mock('@/lib/will/knowledge', () => ({ retrieveKnowledge: jest.fn().mockResolvedValue([]) }));
jest.mock('@/lib/will/scheduler', () => ({ reconcileSchedule: jest.fn().mockResolvedValue(undefined) }));
const runEngine = jest.fn();
jest.mock('@/lib/will/engine', () => ({ ...jest.requireActual('@/lib/will/engine'), runEngine: (...a: unknown[]) => runEngine(...a) }));
import { handleInboundNote, runDeferredAutoReply } from '@/lib/will/service';

const iso = (minAgo: number) => new Date(Date.now() - minAgo * 60_000).toISOString();
const fire = () => runDeferredAutoReply(customer as never, { payload: { debounce: true, anchorAt: iso(3) } as never, createdAt: iso(3), runAt: iso(0) });
beforeEach(() => {
  messages.length = 0; sent.length = 0; settings.clear(); audit.mockClear(); addJob.mockClear(); setState.mockClear(); addTask.mockClear();
  settings.set('decision_mode', 'will');
  Object.assign(customer, { id: 'c1', waId: '61400000001', name: 'Alex', paid: false, state: 'PRICE_SENT', aiPaused: false, isLegacy: false, optedOut: false, lang: 'en', income: 'TFN', botOwned: true, formComplete: false, missingDocs: [], estimatedRefundCents: null });
  runEngine.mockReset();
});

it('"found someone cheaper": Will answers and closes the lead himself', async () => {
  messages.push({ direction: 'IN', author: 'CUSTOMER', body: 'Thanks but I found someone cheaper', status: 'SENT', createdAt: iso(3) });
  runEngine.mockResolvedValue({ kind: 'sent', replyText: 'No worries at all, all the best 😊', decision: { action: 'reply', reply_text: 'x', confidence: 1, new_state: 'NOT_INTERESTED' } });
  await fire();
  expect(runEngine).toHaveBeenCalled();
  expect(setState).toHaveBeenCalledWith('c1', 'NOT_INTERESTED', 'AI');
});

it('a vendor pitch: Will waits and marks it Not Relevant', async () => {
  Object.assign(customer, { state: 'NEW_LEAD' });
  messages.push({ direction: 'IN', author: 'CUSTOMER', body: 'Hi! We are a social media agency offering collaboration', status: 'SENT', createdAt: iso(3) });
  runEngine.mockResolvedValue({ kind: 'silent', decision: { action: 'wait', confidence: 1, new_state: 'NOT_RELEVANT' } });
  await fire();
  expect(setState).toHaveBeenCalledWith('c1', 'NOT_RELEVANT', 'AI');
  expect(sent).toHaveLength(0);
});

it('"not yet" after lodgement: Will\'s choice, and the check-in is re-armed', async () => {
  Object.assign(customer, { paid: true, state: 'LODGED' });
  settings.set(REVIEW_ASKS_SETTING, { c1: { checkinAt: iso(60), checkins: 1 } });
  messages.push({ direction: 'IN', author: 'CUSTOMER', body: 'Not yet unfortunately', status: 'SENT', createdAt: iso(3) });
  runEngine.mockResolvedValue({ kind: 'sent', replyText: 'x', decision: { action: 'reply', reply_text: 'x', confidence: 1, approved_key: 'refund_not_yet' } });
  await fire();
  expect(runEngine).toHaveBeenCalled();
  expect(addJob).toHaveBeenCalledWith(expect.objectContaining({ kind: 'REFUND_CHECKIN' }));
});

it('the referral line: Will\'s choice, recorded once', async () => {
  Object.assign(customer, { paid: true, state: 'COMPLETED' });
  settings.set(REVIEW_ASKS_SETTING, { c1: { askedAt: iso(120) } });
  messages.push({ direction: 'IN', author: 'CUSTOMER', body: 'Done! 👍', status: 'SENT', createdAt: iso(3) });
  runEngine.mockResolvedValue({ kind: 'sent', replyText: 'x', decision: { action: 'reply', reply_text: 'x', confidence: 1, approved_key: 'referral' } });
  await fire();
  expect((settings.get(REVIEW_ASKS_SETTING) as Record<string, { referralAt?: string }>).c1.referralAt).toBeTruthy();
});

it('files from a paid customer: no fixed "got it all"; the task opens and Will answers the batch', async () => {
  Object.assign(customer, { paid: true, state: 'FORM_COMPLETE' });
  await handleInboundNote('61400000001', '📄 [Document: payslip.pdf]', { media: { id: 'd1', kind: 'document', mime: 'application/pdf', filename: 'payslip.pdf' } });
  expect(sent).toHaveLength(0);
  expect(addTask).toHaveBeenCalled();
  expect(addJob).toHaveBeenCalledWith(expect.objectContaining({ kind: 'AUTO_REPLY' }));
});

it('rules mode keeps the old acknowledgement', async () => {
  settings.set('decision_mode', 'legacy');
  Object.assign(customer, { paid: true, state: 'FORM_COMPLETE' });
  await handleInboundNote('61400000001', '📄 [Document: payslip.pdf]', { media: { id: 'd1', kind: 'document', mime: 'application/pdf', filename: 'payslip.pdf' } });
  expect(sent[0]).toBe('Perfect, got it all, thank you 😊');
});

it('the new keys render Jo\'s wording', () => {
  const c = { state: 'LODGED' as const, lang: 'en', firstName: 'A', firstContact: false, lastWillText: '', foreign: false };
  expect(renderApproved('documents_received', c)).toBe('Perfect, got it all, thank you 😊');
  expect(renderApproved('refund_not_yet', c)).toBeTruthy();
  expect(renderApproved('referral', c)).toBeTruthy();
});
