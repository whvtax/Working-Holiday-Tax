/**
 * audit3 core 52 (5 Sep): the "already answered" check in runDeferredAutoReply
 * recognised a system line only by the first 40 characters of the CODE
 * constants (PAYMENT_RECEIVED_MSG / FORM_RECEIVED_MSG). What actually goes out
 * is the Library row, so a reworded variant in any language stopped matching,
 * counted as a real reply, and the question sent next to the form or the
 * screenshot was dropped silently.
 *
 * Pinned here:
 *  - a reworded confirmation carrying `meta.waTemplate` is not an answer;
 *  - a reworded free text send carrying `meta.system` is not an answer;
 *  - an old row with neither flag still matches by text, now including the
 *    ABN and holding lines;
 *  - a human send is an answer whatever meta it carries;
 *  - the two free text deterministic sends in service.ts pass `system: true`.
 */
import fs from 'fs';
import path from 'path';
import type { MessageRow } from '@/lib/will/store';
import { REQUEST_ABN_MSG } from '@/lib/will/i18n';

const msg = (over: Partial<MessageRow>): MessageRow => ({
  id: 'm', customerId: 'c1', direction: 'IN', author: 'CUSTOMER', status: 'SENT', body: '', meta: {},
  createdAt: '2026-09-03T10:00:00.000Z', ...over,
} as MessageRow);

const customer = {
  id: 'c1', waId: '61400000001', name: 'Alex', paid: true, state: 'FORM_PENDING', aiPaused: false,
  optedOut: false, isLegacy: false, lang: 'de', income: null, formComplete: false, missingDocs: [],
  estimatedRefundCents: null, lastCustomerMsgAt: '2026-09-03T10:00:40.000Z',
};
const thread: MessageRow[] = [];
const addMessage = jest.fn().mockImplementation(async (m: Partial<MessageRow>) => {
  const row = msg({ id: `m${thread.length + 1}`, createdAt: new Date().toISOString(), ...m });
  thread.push(row);
  return row;
});
const audit = jest.fn().mockResolvedValue(undefined);
const getSetting = jest.fn().mockImplementation(async (k: string) => (k === 'ai_mode' ? 'FULL_AUTO' : undefined));
jest.mock('@/lib/will/store', () => ({
  getStore: () => ({
    getCustomerByWaId: jest.fn().mockImplementation(async () => ({ ...customer })),
    getCustomerById: jest.fn().mockImplementation(async () => ({ ...customer })),
    listMessages: jest.fn().mockImplementation(async () => [...thread]),
    addMessage, audit, getSetting,
    setState: jest.fn().mockResolvedValue(true),
    updateCustomer: jest.fn().mockResolvedValue(undefined),
    addJob: jest.fn().mockResolvedValue({ id: 'j1' }),
    addTask: jest.fn().mockResolvedValue({ id: 't1' }),
    setSetting: jest.fn().mockResolvedValue(undefined),
    findOpenTaskForCustomer: jest.fn().mockResolvedValue(null),
    cancelJobsFor: jest.fn().mockResolvedValue(0),
    bumpCounter: jest.fn().mockResolvedValue(false),
    listJobsForCustomer: jest.fn().mockResolvedValue([]),
    listTemplates: jest.fn().mockResolvedValue([]),
  }),
}));
const deliverOut = jest.fn().mockResolvedValue({ ok: true });
jest.mock('@/lib/will/channel', () => ({
  deliverOut: (...a: unknown[]) => deliverOut(...a),
  fetchWaMedia: jest.fn(),
}));
jest.mock('@/lib/will/knowledge', () => ({ retrieveKnowledge: jest.fn().mockResolvedValue([]) }));
jest.mock('@/lib/will/scheduler', () => ({ reconcileSchedule: jest.fn().mockResolvedValue(undefined) }));
const runEngine = jest.fn();
jest.mock('@/lib/will/engine', () => ({ runEngine: (...a: unknown[]) => runEngine(...a) }));

import { runDeferredAutoReply } from '@/lib/will/service';

const job = () => ({ payload: { debounce: true, anchorAt: '2026-09-03T10:00:40.000Z' }, createdAt: '2026-09-03T10:00:40.000Z', runAt: '2026-09-03T10:02:40.000Z' });

// A German confirmation Jo reworded in the Library: nothing like the code constant.
const REWORDED_DE = 'Super, dein Fragebogen ist angekommen. Wir melden uns bald mit den nächsten Schritten.';

beforeEach(() => {
  thread.length = 0;
  thread.push(
    msg({ id: '1', body: 'hier ist das Formular', createdAt: '2026-09-03T10:00:00.000Z' }),
    msg({ id: '2', body: 'und wann bekomme ich das Geld?', createdAt: '2026-09-03T10:00:40.000Z' }),
  );
  addMessage.mockClear(); audit.mockClear(); deliverOut.mockClear(); runEngine.mockReset();
  runEngine.mockResolvedValue({
    kind: 'queued', replyText: 'Normalerweise dauert es etwa zwei Wochen.',
    newState: 'FORM_PENDING', decision: { action: 'reply', confidence: 1 },
  });
});

describe('a system line is recognised by how it was sent, not by its words', () => {
  it('a reworded Library confirmation sent as a template is NOT an answer: the question still gets its reply', async () => {
    thread.push(msg({
      id: '3', direction: 'OUT', author: 'AI', body: REWORDED_DE, createdAt: '2026-09-03T10:01:00.000Z',
      meta: { waTemplate: { name: 'form_received_de', params: [], lang: 'de' } },
    }));
    const what = await runDeferredAutoReply(customer as never, job());
    expect(what).toBe('sent');
    expect(runEngine).toHaveBeenCalledTimes(1);
    expect(deliverOut).toHaveBeenCalledTimes(1);
    expect(audit).not.toHaveBeenCalledWith('assistant', 'auto_reply_already_answered', expect.anything());
  });

  it('a reworded free text confirmation flagged `system` is NOT an answer either', async () => {
    thread.push(msg({
      id: '3', direction: 'OUT', author: 'AI', body: REWORDED_DE, createdAt: '2026-09-03T10:01:00.000Z',
      meta: { system: true },
    }));
    const what = await runDeferredAutoReply(customer as never, job());
    expect(what).toBe('sent');
    expect(deliverOut).toHaveBeenCalledTimes(1);
  });

  it('an unflagged row from before the deploy still matches by text, the ABN line included', async () => {
    thread.push(msg({
      id: '3', direction: 'OUT', author: 'AI', body: REQUEST_ABN_MSG.en, createdAt: '2026-09-03T10:01:00.000Z', meta: {},
    }));
    const what = await runDeferredAutoReply(customer as never, job());
    expect(what).toBe('sent');
    expect(deliverOut).toHaveBeenCalledTimes(1);
  });

  it('an unflagged, unrecognised AI line is still a real answer (unchanged)', async () => {
    thread.push(msg({
      id: '3', direction: 'OUT', author: 'AI', body: 'Normalerweise etwa zwei Wochen.', createdAt: '2026-09-03T10:01:00.000Z', meta: {},
    }));
    const what = await runDeferredAutoReply(customer as never, job());
    expect(what).toBe('answered');
    expect(runEngine).not.toHaveBeenCalled();
    expect(deliverOut).not.toHaveBeenCalled();
  });

  it('a human send is always a real answer, whatever meta it carries', async () => {
    thread.push(msg({
      id: '3', direction: 'OUT', author: 'HUMAN', body: REWORDED_DE, createdAt: '2026-09-03T10:01:00.000Z',
      meta: { waTemplate: { name: 'form_received_de', params: [], lang: 'de' } },
    }));
    const what = await runDeferredAutoReply(customer as never, job());
    expect(what).toBe('answered');
    expect(deliverOut).not.toHaveBeenCalled();
  });
});

describe('the free text deterministic sends carry the flag', () => {
  const src = fs.readFileSync(path.join(__dirname, '..', 'service.ts'), 'utf8');

  it('the payment received confirmation and the documents acknowledgement pass system: true', () => {
    expect(src).toContain("deliverOut(customer, confirmation, 'AI', { system: true }");
    expect(src).toContain("deliverOut(customer, ack, 'AI', { system: true })");
  });

  it('the answered check reads the flags, not only the text', () => {
    const i = src.indexOf('auto_reply_already_answered');
    const before = src.slice(Math.max(0, i - 1500), i);
    expect(before).toContain('m.meta?.waTemplate');
    expect(before).toContain('m.meta?.system === true');
    expect(before).toContain("m.author !== 'HUMAN'");
  });
});
