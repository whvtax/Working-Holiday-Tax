/**
 * Jo, 22 Oct: the second check before a reply Will wrote himself leaves
 * ('will' mode). revise -> the better text (if it passes the guard); hold ->
 * Will writes again; held twice -> a task. Jo's exact wording is not reviewed.
 */
type Row = { direction: 'IN' | 'OUT'; body: string; status: string; createdAt: string; author: string };
const messages: Row[] = [];
const settings = new Map<string, unknown>();
const customer: Record<string, unknown> = {};
const addTask = jest.fn().mockResolvedValue({ id: 't' });
jest.mock('@/lib/will/store', () => ({
  getStore: () => ({
    getCustomerByWaId: jest.fn().mockImplementation(async () => ({ ...customer })),
    getCustomerById: jest.fn().mockImplementation(async () => ({ ...customer })),
    addMessage: jest.fn().mockImplementation(async (m: Row) => ({ id: 'x', ...m })), updateCustomer: jest.fn(),
    findOpenTaskForCustomer: jest.fn().mockResolvedValue(null), addTask, updateTask: jest.fn(),
    cancelJobsFor: jest.fn().mockResolvedValue(0), audit: jest.fn().mockResolvedValue(undefined), addJob: jest.fn().mockResolvedValue({ id: 'j' }),
    setState: jest.fn().mockResolvedValue(true),
    getSetting: jest.fn().mockImplementation(async (k: string) => (k === 'ai_mode' ? 'FULL_AUTO' : settings.get(k))),
    setSetting: jest.fn().mockImplementation(async (k: string, v: unknown) => { settings.set(k, v); }),
    listMessages: jest.fn().mockImplementation(async () => messages.map((m, i) => ({ id: `m${i}`, customerId: 'c1', ...m }))),
    listTemplates: jest.fn().mockResolvedValue([]), listJobsForCustomer: jest.fn().mockResolvedValue([]),
    history: jest.fn().mockResolvedValue([]), listPendingOutbound: jest.fn().mockResolvedValue([]),
    bumpCounter: jest.fn().mockResolvedValue(false), getMessageById: jest.fn(),
  }),
}));
jest.mock('@/lib/will/channel', () => ({ deliverOut: jest.fn().mockResolvedValue({ ok: true }), fetchWaMedia: jest.fn() }));
jest.mock('@/lib/will/knowledge', () => ({ retrieveKnowledge: jest.fn().mockResolvedValue([]) }));
jest.mock('@/lib/will/scheduler', () => ({ reconcileSchedule: jest.fn().mockResolvedValue(undefined) }));
const runEngine = jest.fn();
jest.mock('@/lib/will/engine', () => ({ ...jest.requireActual('@/lib/will/engine'), runEngine: (...a: unknown[]) => runEngine(...a) }));
const reviewDraft = jest.fn();
jest.mock('@/lib/will/reviewer', () => ({ reviewDraft: (...a: unknown[]) => reviewDraft(...a) }));
import { decideAndAct } from '@/lib/will/service';
import { getStore } from '@/lib/will/store';

const queued = (text: string, extra: Record<string, unknown> = {}) => ({ kind: 'queued', replyText: text, decision: { action: 'reply', reply_text: text, confidence: 1, ...extra } });
beforeEach(() => {
  messages.length = 0; settings.clear(); addTask.mockClear(); runEngine.mockReset(); reviewDraft.mockReset();
  settings.set('decision_mode', 'will');
  Object.assign(customer, { id: 'c1', waId: '61400000001', name: 'Alex', paid: false, state: 'PRICE_SENT', aiPaused: false, isLegacy: false, optedOut: false, lang: 'en', income: 'TFN', botOwned: true, formComplete: false, missingDocs: [], estimatedRefundCents: null });
  messages.push({ direction: 'IN', author: 'CUSTOMER', body: 'Can I pay by card?', status: 'SENT', createdAt: new Date().toISOString() });
});
const go = () => decideAndAct(getStore(), customer as never, 'Can I pay by card?', 'FULL_AUTO', { killSwitch: false });

it('pass: Will\'s reply goes as written', async () => {
  runEngine.mockResolvedValue(queued('Only bank transfer for now, sorry.'));
  reviewDraft.mockResolvedValue({ verdict: 'pass' });
  const { outcome } = await go();
  expect(outcome.replyText).toBe('Only bank transfer for now, sorry.');
});

it('revise: the better version goes', async () => {
  runEngine.mockResolvedValue(queued('Only bank transfer for now — sorry.'));
  reviewDraft.mockResolvedValue({ verdict: 'revise', revised: 'At the moment we only take bank transfer.' });
  const { outcome } = await go();
  expect(outcome.replyText).toBe('At the moment we only take bank transfer.');
});

it('revise that breaks a hard rule is ignored', async () => {
  runEngine.mockResolvedValue(queued('Only bank transfer for now.'));
  reviewDraft.mockResolvedValue({ verdict: 'revise', revised: 'Only bank transfer, and your refund will be $1,800!' });
  const { outcome } = await go();
  expect(outcome.replyText).toBe('Only bank transfer for now.');
});

it('hold: Will writes it again, and the second version goes if it passes', async () => {
  runEngine.mockResolvedValueOnce(queued('first')).mockResolvedValueOnce(queued('second'));
  reviewDraft.mockResolvedValueOnce({ verdict: 'hold', note: 'promises timing' }).mockResolvedValueOnce({ verdict: 'pass' });
  const { outcome } = await go();
  expect(runEngine).toHaveBeenCalledTimes(2);
  expect(runEngine.mock.calls[1][0].reviewHint).toContain('promises timing');
  expect(outcome.replyText).toBe('second');
});

it('held twice: a task for the team, with the draft', async () => {
  runEngine.mockResolvedValueOnce(queued('first')).mockResolvedValueOnce(queued('second'));
  reviewDraft.mockResolvedValue({ verdict: 'hold', note: 'complaint' });
  const { outcome } = await go();
  expect(outcome.kind).toBe('human_task');
  expect(addTask).toHaveBeenCalledWith(expect.objectContaining({ reason: expect.stringMatching(/^Second check held Will's reply twice/) }));
});

it('Jo\'s exact wording (an approved key) is not reviewed', async () => {
  runEngine.mockResolvedValue(queued("You're very welcome! 😊", { approved_key: 'thanks' }));
  await go();
  expect(reviewDraft).not.toHaveBeenCalled();
});

it('rules mode: no second check', async () => {
  settings.set('decision_mode', 'legacy');
  runEngine.mockResolvedValue(queued('x'));
  await go();
  expect(reviewDraft).not.toHaveBeenCalled();
});
