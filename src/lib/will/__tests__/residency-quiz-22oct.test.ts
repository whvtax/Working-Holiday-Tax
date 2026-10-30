/**
 * Jo, 22 Oct (Alexandra +44 7479): a question in reply to the residency check
 * starts the five Yes/No questions from the form; 4+ Yes asks them to fill out
 * the questionnaire again, fewer says they are a Working Holiday Maker.
 */
import { RESIDENCY_CHECK_MSG } from '@/lib/will/i18n';
import { parseYesNo, startsQuiz, quizIntro, quizResult, lodgingYear, isResidencyCheck } from '@/lib/will/residency-quiz';

type Row = { direction: 'IN' | 'OUT'; body: string; status: string; createdAt: string; author: string };
const messages: Row[] = [];
const settings = new Map<string, unknown>();
const customer = { id: 'c1', waId: '447479289094', name: 'Alexandra', paid: true, state: 'FORM_COMPLETE', aiPaused: false, isLegacy: false, optedOut: false, lang: 'en', botOwned: true };
const addTask = jest.fn().mockResolvedValue({ id: 't1' });
const audit = jest.fn().mockResolvedValue(undefined);
jest.mock('@/lib/will/store', () => ({
  getStore: () => ({
    getCustomerByWaId: jest.fn().mockImplementation(async () => ({ ...customer })),
    getCustomerById: jest.fn().mockImplementation(async () => ({ ...customer })),
    createCustomer: jest.fn(),
    addMessage: jest.fn().mockImplementation(async (m: Row) => { messages.push({ ...m, status: 'SENT', createdAt: new Date().toISOString() }); return { id: `m${messages.length}` }; }),
    updateCustomer: jest.fn(), findOpenTaskForCustomer: jest.fn().mockResolvedValue(null), addTask, updateTask: jest.fn(),
    cancelJobsFor: jest.fn().mockResolvedValue(0), audit, addJob: jest.fn().mockResolvedValue({ id: 'j' }),
    getSetting: jest.fn().mockImplementation(async (k: string) => (k === 'ai_mode' ? 'FULL_AUTO' : settings.get(k))),
    setSetting: jest.fn().mockImplementation(async (k: string, v: unknown) => { settings.set(k, v); }),
    listMessages: jest.fn().mockImplementation(async () => messages.map((m, i) => ({ id: `m${i}`, customerId: 'c1', ...m }))),
    listTemplates: jest.fn().mockResolvedValue([]), listJobsForCustomer: jest.fn().mockResolvedValue([]),
  }),
}));
const sent: string[] = [];
jest.mock('@/lib/will/channel', () => ({
  deliverOut: jest.fn().mockImplementation(async (_c: unknown, body: string) => {
    sent.push(body);
    messages.push({ direction: 'OUT', author: 'AI', body, status: 'SENT', createdAt: new Date().toISOString() });
    return { ok: true };
  }),
  fetchWaMedia: jest.fn(),
}));
jest.mock('@/lib/will/knowledge', () => ({ retrieveKnowledge: jest.fn().mockResolvedValue([]) }));
jest.mock('@/lib/will/scheduler', () => ({ reconcileSchedule: jest.fn().mockResolvedValue(undefined) }));
const runEngine = jest.fn().mockResolvedValue({ kind: 'silent', decision: { action: 'wait', confidence: 1 } });
jest.mock('@/lib/will/engine', () => ({ runEngine: (...a: unknown[]) => runEngine(...a) }));
import { handleIncoming } from '@/lib/will/service';

const CHECK = RESIDENCY_CHECK_MSG.en.replace('{{1}}', 'Alexandra');
async function say(text: string) {
  messages.push({ direction: 'IN', author: 'CUSTOMER', body: text, status: 'SENT', createdAt: new Date().toISOString() });
  return handleIncoming('447479289094', text, 'FULL_AUTO');
}
beforeEach(() => {
  messages.length = 0; sent.length = 0; settings.clear(); addTask.mockClear(); runEngine.mockClear();
  settings.set('decision_mode', 'legacy'); // the quiz START here is the Rules-mode path
  messages.push({ direction: 'OUT', author: 'AI', body: CHECK, status: 'SENT', createdAt: new Date(Date.now() - 25 * 60_000).toISOString() });
});

describe('pieces', () => {
  it('the tax year being lodged', () => {
    expect(lodgingYear(new Date('2026-10-22'))).toEqual({ start: 2025, end: 2026 });
    expect(lodgingYear(new Date('2026-03-01'))).toEqual({ start: 2024, end: 2025 });
  });
  it('recognises the check in every language', () => {
    for (const m of Object.values(RESIDENCY_CHECK_MSG)) expect(isResidencyCheck(m)).toBe(true);
  });
  it.each([
    'I lived in aus for 6 months in feb 2023 and was there for 4 months this year would that account as living in aus for 6 months or more?',
    "I'm not sure", 'No, I think I might be a resident', 'Ich bin mir nicht sicher', 'よくわからないです',
  ])('"%s" starts the questions', (t) => expect(startsQuiz(t)).toBe(true));
  it.each(['Yes, still correct', 'Yes that is correct thanks', 'Ja, stimmt', 'はい、正しいです'])('"%s" closes the topic', (t) => expect(startsQuiz(t)).toBe(false));
  it.each([['Yes', true], ['yep!', true], ['No', false], ['not sure', false], ['Ja', true], ['Nein', false], ['はい', true], ['いいえ', false], ['Is it?', null], ['I lived in Sydney', null]])('"%s" -> %s', (t, v) => {
    expect(parseYesNo(t as string)).toBe(v);
  });
});

it('her case: the intro explains the tax year and asks question 1', async () => {
  await say('I lived in aus for 6 months in feb 2023 and was there for 4 months this year would that account as living in aus for 6 months or more?');
  expect(runEngine).not.toHaveBeenCalled();
  expect(sent[0]).toContain('1 July 2025 to 30 June 2026');
  expect(sent[0]).toContain('1/6: During that tax year, did you live in Australia for 6 months or more?');
});

it('4 of 6 Yes: fill out the questionnaire again, no task', async () => {
  await say('not sure?');
  for (const a of ['Yes', 'Yes', 'Yes', 'No', 'Yes', 'No']) await say(a);
  expect(sent).toHaveLength(7);
  expect(sent[1]).toMatch(/^2\/6/);
  expect(sent[6]).toBe(quizResult('en', 4));
  expect(sent[6]).toContain('Please fill out the questionnaire again with the correct details');
  expect(addTask).not.toHaveBeenCalled();
});

it('fewer than 4: Working Holiday Maker, the team takes it from here, no task', async () => {
  await say('not sure');
  for (const a of ['No', 'Yes', 'No', 'Yes', 'No', 'No']) await say(a);
  expect(sent[6]).toBe("Great, it looks like you count as a Working Holiday Maker for tax, so your answer stays as it is 😊 The team will double-check it and take it from here.");
  expect(addTask).not.toHaveBeenCalled();
});

it('a reply that is not Yes or No gets the question again', async () => {
  await say('not sure');
  await say('hmm');
  expect(sent[1]).toMatch(/^Just a Yes or No for this one/);
  expect(sent[1]).toContain('1/6');
});

it('"Yes, still correct" does not start anything', async () => {
  await say('Yes, still correct');
  expect(sent).toHaveLength(0);
});

it('German customer gets the German questions', async () => {
  Object.assign(customer, { lang: 'de' });
  messages[0].body = RESIDENCY_CHECK_MSG.de.replace('{{1}}', 'Hanna');
  await say('Ich bin mir nicht sicher');
  expect(sent[0]).toContain('1. Juli 2025 bis 30. Juni 2026');
  Object.assign(customer, { lang: 'en' });
});

it('the intro passes nothing it should not: no amounts', () => {
  expect(quizIntro('en')).not.toMatch(/\$/);
});
