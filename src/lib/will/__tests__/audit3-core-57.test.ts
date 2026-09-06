/**
 * audit3 core 57 (5 Sep): a customer on Autopilot who pays by screenshot gets
 * the payment-received confirmation instantly. The deferred AUTO_REPLY timer
 * armed by the same burst still fires two minutes later, and burstText falls
 * back to the photo's own caption when nothing followed it, so a burst that is
 * nothing but the payment report ("paid!") reached decideAndAct and spent a
 * model call answering a question nobody asked, landing a second, redundant
 * bubble right under the confirmation.
 *
 * Pinned here:
 *  - a pure payment report ("here you go!") after the confirmation went out is
 *    treated as already answered: no model call, no second send;
 *  - a burst that also carries a real question still gets its answer, exactly
 *    as before (the 4 Sep rule is untouched).
 */
import type { MessageRow } from '@/lib/will/store';
import { PAYMENT_RECEIVED_MSG } from '@/lib/will/i18n';

const msg = (over: Partial<MessageRow>): MessageRow => ({
  id: 'm', customerId: 'c1', direction: 'IN', author: 'CUSTOMER', status: 'SENT', body: '', meta: {},
  createdAt: '2026-09-05T10:00:00.000Z', ...over,
} as MessageRow);

const customer = {
  id: 'c1', waId: '61400000001', name: 'Alex', paid: true, state: 'FORM_PENDING', aiPaused: false,
  optedOut: false, isLegacy: false, lang: 'en', income: null, formComplete: false, missingDocs: [],
  estimatedRefundCents: null, lastCustomerMsgAt: '2026-09-05T10:00:05.000Z',
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

const job = () => ({ payload: { debounce: true, anchorAt: '2026-09-05T09:59:59.000Z' }, createdAt: '2026-09-05T09:59:59.000Z', runAt: '2026-09-05T10:02:05.000Z' });

beforeEach(() => {
  thread.length = 0;
  addMessage.mockClear(); audit.mockClear(); deliverOut.mockClear(); runEngine.mockReset();
  runEngine.mockResolvedValue({
    kind: 'queued', replyText: 'Great, fill in the form when you can.',
    newState: 'FORM_PENDING', decision: { action: 'reply', confidence: 1 },
  });
});

it('a pure payment report after the confirmation is treated as answered: no model call, no second send', async () => {
  thread.push(
    msg({ id: '1', body: 'here you go!', createdAt: '2026-09-05T10:00:00.000Z' }),
    msg({
      id: '2', direction: 'OUT', author: 'AI', body: PAYMENT_RECEIVED_MSG.en,
      createdAt: '2026-09-05T10:00:02.000Z', meta: { system: true },
    }),
  );
  const what = await runDeferredAutoReply(customer as never, job());
  expect(what).toBe('answered');
  expect(runEngine).not.toHaveBeenCalled();
  expect(deliverOut).not.toHaveBeenCalled();
  expect(audit).toHaveBeenCalledWith('assistant', 'auto_reply_already_answered', expect.objectContaining({ reason: 'payment_report_only' }));
});

it('a real question riding with the payment report still gets its answer', async () => {
  thread.push(
    msg({ id: '1', body: 'here you go! also when will I get the refund?', createdAt: '2026-09-05T10:00:00.000Z' }),
    msg({
      id: '2', direction: 'OUT', author: 'AI', body: PAYMENT_RECEIVED_MSG.en,
      createdAt: '2026-09-05T10:00:02.000Z', meta: { system: true },
    }),
  );
  const what = await runDeferredAutoReply(customer as never, job());
  expect(what).toBe('sent');
  expect(runEngine).toHaveBeenCalledTimes(1);
  expect(deliverOut).toHaveBeenCalledTimes(1);
});
