/**
 * 3 Nov, handoffs: 38 handed-over tasks in the 72 hour export, 36 with Library
 * answers at hand. Synthetic data only.
 */
jest.mock('@/lib/will/claude', () => {
  const actual = jest.requireActual('@/lib/will/claude');
  return { ...actual, decide: jest.fn() };
});
import { decide } from '@/lib/will/claude';
import { runEngine, toPartialAnswer, type EngineInput } from '@/lib/will/engine';
import { buildHandoffDiagnostic, explainWhyNot, countQuestions } from '@/lib/will/handoff-diagnostic';
import { explainHandoffReason, businessHoursBetween, holdingAckDue } from '@/lib/will/handoff-reasons';
import { afterHumanReplyIndexed, afterHumanReply } from '@/lib/will/after-reply';
import { WILL_DECIDES_PROMPT } from '@/lib/will/will-decides';
import type { Store, MessageRow } from '@/lib/will/store';
const decideMock = decide as jest.MockedFunction<typeof decide>;
beforeEach(() => decideMock.mockReset());

function input(text: string, over: Partial<EngineInput> = {}, lang = 'en'): EngineInput {
  return {
    ctx: { name: 'Sam', state: 'FORM_PENDING', income: 'TFN', paid: true, formComplete: false, missingDocs: [], estimatedRefundCents: null, lang, knowledge: [], decisionMode: 'will' },
    guard: { aiPaused: false, killSwitch: false, optedOut: false, isLegacy: false, lastCustomerMsgAt: new Date() },
    history: [{ role: 'assistant', text: 'Thanks, we have your form.' }, { role: 'customer', text }],
    mode: 'FULL_AUTO', bank: { bsb: '000000', account: '00000000' }, decisionMode: 'will', ...over,
  };
}
const DRAFT = "Yes, the bank statement is needed: an official document from your Australian bank with your name, BSB and account number.\n\nThe signature document comes by email once the review is done.\n\n[TEAM: how much the Medicare levy will be]";

describe('partial answers', () => {
  it('toPartialAnswer drops the marker, keeps the answers, adds one hold line', () => {
    const p = toPartialAnswer(DRAFT, 'en');
    expect(p?.open).toEqual(['how much the Medicare levy will be']);
    expect(p?.reply).toMatch(/bank statement is needed/);
    expect(p?.reply).not.toMatch(/\[TEAM/);
    expect(p?.reply).toMatch(/checking the rest with the team/);
  });
  it('nothing left to send, no marker, or no hold line for the language: null', () => {
    expect(toPartialAnswer('Hi!\n\n[TEAM: everything]', 'en')).toBeNull();
    expect(toPartialAnswer('A long answer with enough words to count as real content here.', 'en')).toBeNull();
    expect(toPartialAnswer(DRAFT, 'vi')).toBeNull();
  });
  it('a multi-question handoff sends the known parts and raises a task for the open one only', async () => {
    decideMock.mockResolvedValue({ action: 'human_task', confidence: 0.9, task_reason: 'Asks Medicare levy amount', suggested_reply: DRAFT } as never);
    const out = await runEngine(input('Do I need the bank statement? When does the signature document come? How much is my Medicare levy?', { partialAnswer: true }));
    expect(out.kind).toBe('queued');
    expect(out.replyText).toMatch(/bank statement/);
    expect(out.replyText).not.toMatch(/\[TEAM/);
    expect(out.followUpTask?.reason).toMatch(/Open part of a multi-question message/);
    expect(explainHandoffReason(out.followUpTask!.reason).label).toMatch(/open point/i);
  });
  it('off by default: the whole message still goes to the team', async () => {
    decideMock.mockResolvedValue({ action: 'human_task', confidence: 0.9, task_reason: 'x', suggested_reply: DRAFT } as never);
    const out = await runEngine(input('Do I need the bank statement? How much is my Medicare levy?'));
    expect(out.kind).toBe('human_task');
    expect(out.followUpTask).toBeUndefined();
  });
  it('an upset customer is never split', async () => {
    decideMock.mockResolvedValue({ action: 'human_task', confidence: 0.9, task_reason: 'x', suggested_reply: DRAFT } as never);
    const out = await runEngine(input('Still waiting, this is ridiculous. Where is my form? How much is the levy?', { partialAnswer: true }));
    expect(out.kind).toBe('human_task');
  });
  it('the prompt tells Will to hand over only the open point, without dashes', () => {
    expect(WILL_DECIDES_PROMPT).toMatch(/SEVERAL QUESTIONS IN ONE MESSAGE/);
    expect(WILL_DECIDES_PROMPT).not.toMatch(/[–—―]/);
  });
});

describe('richer "why Will did not answer"', () => {
  const base = {
    customerText: 'Can I claim flights? What is the fee?', lang: 'en', state: 'QUALIFIED', paid: false, income: 'TFN',
    decision: { action: 'human_task' as const, confidence: 0.6 },
    knowledgeUsed: [] as string[], nearest: { intent: 'deductions', score: 0.2 },
  };
  it('names rule, missing fact, second check and guard code on one line', () => {
    const d = buildHandoffDiagnostic({ ...base, guardViolations: ['FORBIDDEN_AMOUNT:440.00'], secondCheck: { verdict: 'hold', note: 'wrong fee' }, knowledgeUsed: ['fee'] });
    expect(d).toMatch(/Why Will did not answer: rule = Policy Guard \(FORBIDDEN_AMOUNT:440\.00\); missing fact = none: the Library already covers it; second check = hold \(wrong fee\); guard code = FORBIDDEN_AMOUNT:440\.00\./);
  });
  it('a low-confidence model handoff names the master rule and the Library gap', () => {
    const w = explainWhyNot(base);
    expect(w.rule).toMatch(/MASTER RULE \(confidence 60%/);
    expect(w.missingFact).toMatch(/nearest "deductions" scored 0\.20/);
    expect(w.secondCheck).toBeNull();
  });
  it('flags that a partial answer was possible and avoids a double full stop', () => {
    const d = buildHandoffDiagnostic({ ...base, knowledgeUsed: ['fee'], nearest: null, engineReason: 'Lars (paid) wrote in and Will had nothing to say. Reply by hand.' });
    expect(d).toMatch(/holds 2 questions and the Library covers at least one/);
    expect(d).not.toMatch(/\.\./);
  });
  it('uses the first sentence of task_detail when there is no reason', () => {
    const d = buildHandoffDiagnostic({ ...base, decision: { action: 'human_task', confidence: 0.9, task_detail: 'Wants a custom tax ruling. FIX: the team\'s call.' } });
    expect(d).toMatch(/Will chose not to answer \(confidence 90%\): Wants a custom tax ruling\./);
  });
  it('counts questions', () => {
    expect(countQuestions('a? b? c?')).toBe(3);
    expect(countQuestions('how much\nwhen does it arrive')).toBe(2);
  });
});

describe('holding line: once, and again after 4 business hours', () => {
  // 2026-11-02 is a Monday; Sydney is UTC+11 in November.
  const at = (iso: string) => new Date(iso);
  it('counts only Sydney weekday 09:00-17:00', () => {
    expect(businessHoursBetween(at('2026-11-02T00:00:00Z'), at('2026-11-02T03:00:00Z'))).toBe(3); // 11:00-14:00
    expect(businessHoursBetween(at('2026-11-06T07:00:00Z'), at('2026-11-09T00:00:00Z'))).toBe(2); // Fri 18:00 Sydney to Mon 11:00 = Mon 09-11 = 2h
  });
  it('first, none, repeat', () => {
    const now = at('2026-11-02T06:30:00Z'); // Mon 17:30 Sydney
    expect(holdingAckDue({ taskOpen: true, lastAckAt: null, lastCustomerAt: now, lastTeamReplyAt: null, now })).toBe('first');
    const ack = at('2026-11-02T00:00:00Z'); // Mon 11:00
    expect(holdingAckDue({ taskOpen: true, lastAckAt: ack, lastCustomerAt: at('2026-11-02T01:00:00Z'), lastTeamReplyAt: null, now: at('2026-11-02T03:00:00Z') })).toBe('none'); // 3h
    expect(holdingAckDue({ taskOpen: true, lastAckAt: ack, lastCustomerAt: at('2026-11-02T04:30:00Z'), lastTeamReplyAt: null, now: at('2026-11-02T04:31:00Z') })).toBe('repeat'); // 4.5h
    expect(holdingAckDue({ taskOpen: true, lastAckAt: ack, lastCustomerAt: at('2026-11-02T04:30:00Z'), lastTeamReplyAt: at('2026-11-02T04:00:00Z'), now: at('2026-11-02T04:31:00Z') })).toBe('none');
    expect(holdingAckDue({ taskOpen: true, lastAckAt: ack, lastCustomerAt: at('2026-11-01T20:00:00Z'), lastTeamReplyAt: null, now: at('2026-11-02T04:31:00Z') })).toBe('none'); // no new message
    expect(holdingAckDue({ taskOpen: false, lastAckAt: null, lastCustomerAt: now, lastTeamReplyAt: null, now })).toBe('none');
  });
});

describe('after a human reply, stale drafts never go out', () => {
  const m = (id: string, status: MessageRow['status']) => ({ id, customerId: 'c1', direction: 'OUT', author: 'AI', status, body: 'Perfect!', createdAt: 'x', meta: {} }) as unknown as MessageRow;
  function store(live: Record<string, MessageRow['status']>) {
    const setMessageStatus = jest.fn().mockResolvedValue(undefined);
    const cancelJobsFor = jest.fn().mockResolvedValue(1);
    const s = {
      markCustomerRead: jest.fn().mockResolvedValue(undefined),
      listPendingOutbound: jest.fn().mockResolvedValue(Object.keys(live).map((id) => m(id, 'QUEUED'))),
      listMessages: jest.fn().mockResolvedValue(Object.keys(live).map((id) => m(id, 'QUEUED'))),
      getMessageById: jest.fn(async (id: string) => m(id, live[id])),
      setMessageStatus, cancelJobsFor,
      listOpenTasksForCustomer: jest.fn().mockResolvedValue([]), listTasks: jest.fn().mockResolvedValue([]), resolveTask: jest.fn(),
    } as unknown as Store;
    return { s, setMessageStatus, cancelJobsFor };
  }
  it.each([['indexed', afterHumanReplyIndexed], ['full', afterHumanReply]] as const)('%s: discards live drafts, leaves a message that was just sent, cancels the reply timer', async (_n, fn) => {
    const f = store({ a: 'QUEUED', b: 'SENT' });
    await fn(f.s, 'c1');
    expect(f.setMessageStatus).toHaveBeenCalledWith('a', 'DISCARDED');
    expect(f.setMessageStatus).not.toHaveBeenCalledWith('b', 'DISCARDED');
    expect(f.cancelJobsFor).toHaveBeenCalledWith('c1', ['AUTO_REPLY']);
  });
});
