/**
 * 30 Oct 2026: about twelve chats got fu_pre_24h/3d/7d or the winback AFTER
 * "not interested", "gone with someone else", "I'll pass", "I'll do it
 * myself". Once a lead who has not paid says they are leaving, everything
 * queued is cancelled, nothing new is scheduled, no winback is made, the lead
 * is closed. Also: the form's English auto text must not flip the language.
 */
type Row = { direction: 'IN' | 'OUT'; body: string; status: string; createdAt: string; author: string; meta?: Record<string, unknown> };
const messages: Row[] = [];
const settings = new Map<string, unknown>();
const customer: Record<string, unknown> = {};
const audit = jest.fn().mockResolvedValue(undefined);
const addJob = jest.fn().mockResolvedValue({ id: 'j' });
const setState = jest.fn().mockResolvedValue(true);
const cancelJobsFor = jest.fn().mockResolvedValue(0);
const updateCustomer = jest.fn();
jest.mock('@/lib/will/store', () => ({
  getStore: () => ({
    getCustomerByWaId: jest.fn().mockImplementation(async () => ({ ...customer })),
    getCustomerById: jest.fn().mockImplementation(async () => ({ ...customer })),
    createCustomer: jest.fn(),
    addMessage: jest.fn().mockImplementation(async (m: Row) => { messages.push({ ...m, status: m.status ?? 'SENT', createdAt: new Date().toISOString() }); return { id: `m${messages.length}`, ...m }; }),
    updateCustomer, findOpenTaskForCustomer: jest.fn().mockResolvedValue(null), addTask: jest.fn().mockResolvedValue({ id: 't' }), updateTask: jest.fn(),
    cancelJobsFor, audit, addJob, setState,
    getSetting: jest.fn().mockImplementation(async (k: string) => (k === 'ai_mode' ? 'FULL_AUTO' : settings.get(k))),
    setSetting: jest.fn().mockImplementation(async (k: string, v: unknown) => { settings.set(k, v); }),
    listMessages: jest.fn().mockImplementation(async () => messages.map((m, i) => ({ id: `m${i}`, customerId: 'c1', ...m }))),
    listTemplates: jest.fn().mockResolvedValue([]), listJobsForCustomer: jest.fn().mockResolvedValue([]),
    history: jest.fn().mockResolvedValue([]), listPendingOutbound: jest.fn().mockResolvedValue([]),
    bumpCounter: jest.fn().mockResolvedValue(false), getMessageById: jest.fn(),
  }),
}));
jest.mock('@/lib/will/channel', () => ({
  deliverOut: jest.fn().mockResolvedValue({ ok: true }),
  fetchWaMedia: jest.fn(),
}));
jest.mock('@/lib/will/knowledge', () => ({ retrieveKnowledge: jest.fn().mockResolvedValue([]) }));
jest.mock('@/lib/will/scheduler', () => ({ reconcileSchedule: jest.fn().mockResolvedValue(undefined) }));
const runEngine = jest.fn();
jest.mock('@/lib/will/engine', () => ({ ...jest.requireActual('@/lib/will/engine'), runEngine: (...a: unknown[]) => runEngine(...a) }));
import { handleIncoming } from '@/lib/will/service';
import { saysLeaving, declinedInChat } from '@/lib/will/followup-gate-30oct';

async function say(text: string) {
  messages.push({ direction: 'IN', author: 'CUSTOMER', body: text, status: 'SENT', createdAt: new Date().toISOString() });
  return handleIncoming('61400000001', text, 'FULL_AUTO');
}
beforeEach(() => {
  messages.length = 0; settings.clear(); jest.clearAllMocks();
  settings.set('decision_mode', 'will');
  Object.assign(customer, { id: 'c1', waId: '61400000001', name: 'Rochi', paid: false, state: 'PRICE_SENT', aiPaused: false, isLegacy: false, optedOut: false, lang: 'en', income: 'TFN', botOwned: true, formComplete: false, missingDocs: [], estimatedRefundCents: null });
  runEngine.mockReset().mockResolvedValue({ kind: 'queued', replyText: 'ok', decision: { action: 'reply', reply_text: 'ok', confidence: 1 } });
  messages.push({ direction: 'OUT', author: 'AI', body: 'The fee is $220 for a TFN return.', status: 'SENT', createdAt: new Date(Date.now() - 3600_000).toISOString() });
});

describe('what counts as leaving', () => {
  it.each([
    "I'll pass, thanks", 'Not this time, sorry', "I'm going with someone else", 'I will do it myself', 'not interested',
    'Danke, ich habe es schon selbst gemacht', 'kein Interesse mehr', '他で申し込むことにしました', '自分でやります', 'Merci, pas intéressé', 'Grazie, non mi interessa',
  ])('"%s" is a no', (t) => expect(saysLeaving(t)).toBe(true));
  it.each([
    'How do I pay? I am going with the TFN option', 'Which option should I go with?', 'Can you do it for someone else too?', 'ok thanks', 'I decided to go with you guys',
  ])('"%s" is not a no', (t) => expect(saysLeaving(t)).toBe(false));
  it('a no followed by a real message means they came back; a thank you after it does not', () => {
    const m = (b: string, author = 'CUSTOMER', direction: 'IN' | 'OUT' = 'IN') => ({ direction, author, status: 'SENT', body: b, createdAt: new Date().toISOString(), meta: {} });
    expect(declinedInChat([m('not interested') , m('thanks', 'CUSTOMER')] as never)).not.toBeNull();
    expect(declinedInChat([m('not interested'), m('Actually how do I pay?')] as never)).toBeNull();
  });
});

describe('at the door (service.ts)', () => {
  it('a lead who says they will do it themselves is closed at once, whatever the decision mode, and everything queued is cancelled', async () => {
    await say("Thanks but I'll do it myself");
    expect(setState).toHaveBeenCalledWith('c1', 'NOT_INTERESTED', 'SYSTEM');
    expect(cancelJobsFor).toHaveBeenCalledWith('c1', expect.arrayContaining(['FOLLOW_UP', 'AUTO_CLOSE', 'WINBACK']));
    const wb = settings.get('winbacks') as Record<string, { decision?: string }>;
    expect(wb.c1.decision).toBe('never');
    expect(audit).toHaveBeenCalledWith('system', 'lead_closed_after_no', expect.objectContaining({ customerId: 'c1' }));
  });
  it('legacy mode closes it too', async () => {
    settings.set('decision_mode', 'legacy');
    await say('Not interested, going elsewhere');
    expect(setState).toHaveBeenCalledWith('c1', 'NOT_INTERESTED', 'SYSTEM');
  });
  it('a buying message that contains a leaving fragment is not closed', async () => {
    await say('I decided to go with the TFN option, how do I pay?');
    expect(setState).not.toHaveBeenCalledWith('c1', 'NOT_INTERESTED', 'SYSTEM');
  });
  it('a PAID customer is never closed by these words', async () => {
    Object.assign(customer, { paid: true, state: 'FORM_PENDING' });
    await say("I'll do the form myself later, not interested in the extras");
    expect(setState).not.toHaveBeenCalled();
  });
});

describe('the language is not flipped by the form button text', () => {
  it('German stays German after "Hi! I\'ve just sent through my form"', async () => {
    Object.assign(customer, { lang: 'de', state: 'FORM_PENDING', paid: true });
    await say("Hi! I've just sent through my form 😊");
    expect(updateCustomer).not.toHaveBeenCalledWith('c1', { lang: 'en' });
  });
  it('a customer stored as English who writes German is corrected and the correction is persisted', async () => {
    messages.push({ direction: 'IN', author: 'CUSTOMER', body: 'Hallo, ich habe eine Frage zur Steuer und zur Rückerstattung', status: 'SENT', createdAt: new Date(Date.now() - 1000).toISOString() });
    await say("Hi! I've just sent through my form 😊");
    expect(updateCustomer).toHaveBeenCalledWith('c1', { lang: 'de' });
  });
});
