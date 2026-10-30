/**
 * Jo, 22 Oct, 'will' mode at the service level: what reaches Will, and when.
 */
import { RESIDENCY_CHECK_MSG, FORM_RECEIVED_MSG } from '@/lib/will/i18n';

type Row = { direction: 'IN' | 'OUT'; body: string; status: string; createdAt: string; author: string; meta?: Record<string, unknown> };
const messages: Row[] = [];
const settings = new Map<string, unknown>();
const customer: Record<string, unknown> = {};
const audit = jest.fn().mockResolvedValue(undefined);
const addJob = jest.fn().mockResolvedValue({ id: 'j' });
jest.mock('@/lib/will/store', () => ({
  getStore: () => ({
    getCustomerByWaId: jest.fn().mockImplementation(async () => ({ ...customer })),
    getCustomerById: jest.fn().mockImplementation(async () => ({ ...customer })),
    createCustomer: jest.fn(),
    addMessage: jest.fn().mockImplementation(async (m: Row) => { messages.push({ ...m, status: m.status ?? 'SENT', createdAt: new Date().toISOString() }); return { id: `m${messages.length}`, ...m }; }),
    updateCustomer: jest.fn(), findOpenTaskForCustomer: jest.fn().mockResolvedValue(null), addTask: jest.fn().mockResolvedValue({ id: 't' }), updateTask: jest.fn(),
    cancelJobsFor: jest.fn().mockResolvedValue(0), audit, addJob, setState: jest.fn().mockResolvedValue(true),
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
  deliverOut: jest.fn().mockImplementation(async (_c: unknown, body: string) => {
    sent.push(body); messages.push({ direction: 'OUT', author: 'AI', body, status: 'SENT', createdAt: new Date().toISOString() });
    return { ok: true };
  }),
  fetchWaMedia: jest.fn(),
}));
jest.mock('@/lib/will/knowledge', () => ({ retrieveKnowledge: jest.fn().mockResolvedValue([]) }));
jest.mock('@/lib/will/scheduler', () => ({ reconcileSchedule: jest.fn().mockResolvedValue(undefined) }));
const runEngine = jest.fn();
jest.mock('@/lib/will/engine', () => ({ ...jest.requireActual('@/lib/will/engine'), runEngine: (...a: unknown[]) => runEngine(...a) }));
import { handleIncoming, runDeferredAutoReply } from '@/lib/will/service';

async function say(text: string) {
  messages.push({ direction: 'IN', author: 'CUSTOMER', body: text, status: 'SENT', createdAt: new Date().toISOString() });
  return handleIncoming('61400000001', text, 'FULL_AUTO');
}
beforeEach(() => {
  messages.length = 0; sent.length = 0; settings.clear(); audit.mockClear(); addJob.mockClear();
  settings.set('decision_mode', 'will');
  Object.assign(customer, { id: 'c1', waId: '61400000001', name: 'Rochi', paid: false, state: 'QUALIFIED', aiPaused: false, isLegacy: false, optedOut: false, lang: 'en', income: 'UNKNOWN', botOwned: true, formComplete: false, missingDocs: [], estimatedRefundCents: null });
  runEngine.mockReset().mockResolvedValue({ kind: 'queued', replyText: 'ok', decision: { action: 'reply', reply_text: 'ok', confidence: 1 } });
  messages.push({ direction: 'OUT', author: 'AI', body: 'Is it TFN only, or also ABN income?', status: 'SENT', createdAt: new Date(Date.now() - 60_000).toISOString() });
});

it('Rochi: "TFN" goes to Will at once (no timer), and the code sends no price of its own', async () => {
  const r = await say('TFN');
  expect(runEngine).toHaveBeenCalledTimes(1);
  expect(r.outcome.kind).not.toBe('deferred');
  expect(sent.some((b) => /062692/.test(b))).toBe(false);
  expect(audit).toHaveBeenCalledWith('assistant', 'will_fast_lane', expect.anything());
});

it('"What name do I put?" goes to Will at once too', async () => {
  await say('What account name do I put for the transfer?');
  expect(runEngine).toHaveBeenCalledTimes(1);
});

it('Sydney: TFN plus freelance UGC is not a clear choice: the normal timer, then Will reads it all', async () => {
  const r = await say('Only on TFN however I did do some freelance UGC work on the side as well');
  expect(r.outcome.kind).toBe('deferred');
  expect(runEngine).not.toHaveBeenCalled();
  expect(addJob).toHaveBeenCalledWith(expect.objectContaining({ kind: 'AUTO_REPLY' }));
});

it('legacy mode still sends the instant price from the code', async () => {
  settings.set('decision_mode', 'legacy');
  await say('TFN');
  expect(runEngine).not.toHaveBeenCalled();
  expect(sent.some((b) => /062692/.test(b))).toBe(true);
});

it('Alexandra: Will starts the residency questions, and her Yes/No answers carry them on', async () => {
  Object.assign(customer, { paid: true, state: 'FORM_COMPLETE' });
  messages.length = 0;
  messages.push({ direction: 'OUT', author: 'AI', body: RESIDENCY_CHECK_MSG.en.replace('{{1}}', 'Alexandra'), status: 'SENT', createdAt: new Date(Date.now() - 20 * 60_000).toISOString() });
  messages.push({ direction: 'IN', author: 'CUSTOMER', body: 'would that count as 6 months?', status: 'SENT', createdAt: new Date(Date.now() - 3 * 60_000).toISOString() });
  runEngine.mockResolvedValue({ kind: 'sent', replyText: 'intro 1/5', decision: { action: 'reply', reply_text: 'intro 1/5', confidence: 1, approved_key: 'residency_quiz_start' } });
  await runDeferredAutoReply(customer as never, { payload: { debounce: true, anchorAt: new Date(Date.now() - 3 * 60_000).toISOString() } as never, createdAt: new Date(Date.now() - 3 * 60_000).toISOString(), runAt: new Date().toISOString() });
  expect(settings.get('residency_quiz:c1')).toEqual(expect.objectContaining({ step: 0, answers: [] }));
  runEngine.mockClear();
  await say('Yes');
  expect(runEngine).not.toHaveBeenCalled();
  expect(sent[sent.length - 1]).toMatch(/^2\/6/);
});

it('a form report the confirmation already covered: in will mode Will decides (it is not skipped by the words)', async () => {
  Object.assign(customer, { paid: true, state: 'FORM_COMPLETE' });
  messages.length = 0;
  messages.push({ direction: 'IN', author: 'CUSTOMER', body: "Hi! I've just sent through my form 😊", status: 'SENT', createdAt: new Date(Date.now() - 6 * 60_000).toISOString() });
  messages.push({ direction: 'OUT', author: 'AI', body: FORM_RECEIVED_MSG.en, status: 'SENT', meta: { waTemplate: { name: 'form_received_en', params: [] } }, createdAt: new Date(Date.now() - 5 * 60_000).toISOString() });
  await runDeferredAutoReply(customer as never, { payload: { debounce: true, anchorAt: new Date(Date.now() - 6 * 60_000).toISOString() } as never, createdAt: new Date(Date.now() - 6 * 60_000).toISOString(), runAt: new Date().toISOString() });
  expect(runEngine).toHaveBeenCalled();
});
