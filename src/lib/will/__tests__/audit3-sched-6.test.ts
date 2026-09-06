/**
 * Audit 3, lane sched, finding 6 (5 Sep): a waiting customer goes before a
 * nudge to a silent one.
 *
 * Every follow-up that comes due during the day is re-queued to 19:00, so the
 * 19:00 batch used to be a wall of FOLLOW_UP rows that all sorted ahead of the
 * two-minute Autopilot timer of anyone who wrote at 18:58. Pinned here:
 *   - the timers run BEFORE any follow-up in the same batch, whatever run_at says;
 *   - up to four timers run at the same time, never more; follow-ups stay serial;
 *   - the Library and the mode are read once per tick for the follow-ups;
 *   - nothing about WHAT is sent changes (same template, same params, same
 *     next step armed).
 */
const store = {
  reclaimStaleJobs: jest.fn(),
  getSetting: jest.fn(),
  dueJobs: jest.fn(),
  claimJob: jest.fn(),
  getCustomerById: jest.fn(),
  setJobStatus: jest.fn(),
  getJob: jest.fn(),
  addJob: jest.fn(),
  addTask: jest.fn(),
  audit: jest.fn(),
  listTemplates: jest.fn(),
  setSetting: jest.fn(),
  getMessageById: jest.fn(),
};
jest.mock('@/lib/will/store', () => ({ getStore: () => store }));

const events: string[] = [];
const deliverOut = jest.fn(async (c: { id: string }) => { events.push(`followup:${c.id}`); return { ok: true }; });
jest.mock('@/lib/will/channel', () => ({
  deliverOut: (...a: unknown[]) => (deliverOut as unknown as (...x: unknown[]) => unknown)(...a),
  sendWhatsAppText: jest.fn().mockResolvedValue({ ok: true }),
}));
jest.mock('@/lib/will/config', () => ({
  ...jest.requireActual('@/lib/will/config'),
  withinQuietHours: () => true,
}));

let inFlight = 0;
let peakInFlight = 0;
const runDeferredAutoReply = jest.fn(async (c: { id: string }) => {
  inFlight++;
  peakInFlight = Math.max(peakInFlight, inFlight);
  events.push(`reply:${c.id}`);
  await new Promise((r) => setTimeout(r, 15));
  inFlight--;
  return 'sent';
});
jest.mock('@/lib/will/service', () => ({
  runDeferredAutoReply: (...a: unknown[]) => (runDeferredAutoReply as unknown as (...x: unknown[]) => unknown)(...a),
}));

import { processDueJobs } from '@/lib/will/scheduler';

const customer = (id: string) => ({
  id, waId: `6140000${id}`, name: `Cust ${id}`, state: 'QUALIFIED', paid: false,
  aiPaused: false, isLegacy: false, optedOut: false, lang: null,
  lastCustomerMsgAt: '2026-09-05T08:55:00.000Z', estimatedRefundCents: null,
});
const followUp = (id: string, runAt: string) => ({
  id: `f${id}`, customerId: id, kind: 'FOLLOW_UP' as const,
  payload: { templateKey: 'fu_pre_24h', seq: 0, flow: 'prePayment' },
  runAt, status: 'SCHEDULED' as const, createdAt: runAt,
});
const timer = (id: string, runAt: string) => ({
  id: `t${id}`, customerId: id, kind: 'AUTO_REPLY' as const,
  payload: { debounce: true, anchorAt: runAt },
  runAt, status: 'SCHEDULED' as const, createdAt: runAt,
});

beforeEach(() => {
  for (const fn of Object.values(store)) (fn as jest.Mock).mockReset();
  events.length = 0; inFlight = 0; peakInFlight = 0;
  runDeferredAutoReply.mockClear();
  deliverOut.mockClear();
  store.reclaimStaleJobs.mockResolvedValue(0);
  store.getSetting.mockImplementation(async (k: string) => (k === 'ai_mode' ? 'FULL_AUTO' : false));
  store.claimJob.mockResolvedValue(true);
  store.getCustomerById.mockImplementation(async (id: string) => customer(id));
  store.setJobStatus.mockResolvedValue(undefined);
  store.addJob.mockResolvedValue({ id: 'new' });
  store.addTask.mockResolvedValue({ id: 't1' });
  store.audit.mockResolvedValue(undefined);
  store.getJob.mockResolvedValue(null);
  store.listTemplates.mockResolvedValue([
    { key: 'fu_pre_24h', title: 'Pre 24h', body: 'Hi {{1}}, still keen to get your tax sorted?' },
  ]);
});

it('answers the waiting customers before any follow-up, even when the follow-ups came due first', async () => {
  store.dueJobs.mockResolvedValue([
    followUp('a', '2026-09-05T09:00:00.000Z'),
    followUp('b', '2026-09-05T09:00:00.000Z'),
    followUp('c', '2026-09-05T09:00:00.000Z'),
    timer('z', '2026-09-05T09:00:30.000Z'),
  ]);
  const r = await processDueJobs();
  expect(events[0]).toBe('reply:z');
  expect(events.slice(1)).toEqual(['followup:a', 'followup:b', 'followup:c']);
  expect(r.processed).toBe(4);
  expect(r.sent).toEqual(expect.arrayContaining(['Cust z · autopilot reply', 'Cust a · Pre 24h']));
  // The follow-up itself is unchanged: same template, same {{1}}, next step armed.
  const [c, body, author, , waTemplate] = deliverOut.mock.calls[0] as unknown as [{ id: string }, string, string, unknown, { name: string; params: string[] }];
  expect(c.id).toBe('a');
  expect(author).toBe('AI');
  expect(body).toBe('Hi Cust, still keen to get your tax sorted?');
  expect(waTemplate).toEqual({ name: 'fu_pre_24h', params: ['Cust'], lang: null });
  expect(store.addJob).toHaveBeenCalledTimes(3);
  expect(store.addJob.mock.calls[0][0].payload).toEqual({ templateKey: 'fu_pre_3d', seq: 1, flow: 'prePayment' });
});

it('runs the timers a few at a time, never more than four, and every one of them', async () => {
  store.dueJobs.mockResolvedValue(['1', '2', '3', '4', '5', '6', '7'].map((id) => timer(id, '2026-09-05T09:00:00.000Z')));
  const r = await processDueJobs();
  expect(runDeferredAutoReply).toHaveBeenCalledTimes(7);
  expect(peakInFlight).toBeGreaterThan(1);
  expect(peakInFlight).toBeLessThanOrEqual(4);
  expect(r.processed).toBe(7);
  for (const id of ['1', '2', '3', '4', '5', '6', '7']) expect(store.setJobStatus).toHaveBeenCalledWith(`t${id}`, 'DONE');
});

it('a timer whose claim is lost, or whose customer opted out, is handled exactly as before', async () => {
  store.dueJobs.mockResolvedValue([timer('1', '2026-09-05T09:00:00.000Z'), timer('2', '2026-09-05T09:00:00.000Z')]);
  store.claimJob.mockImplementation(async (id: string) => id !== 't1');
  store.getCustomerById.mockImplementation(async (id: string) => ({ ...customer(id), optedOut: id === '2' }));
  const r = await processDueJobs();
  expect(runDeferredAutoReply).not.toHaveBeenCalled();
  expect(r.processed).toBe(1);
  expect(store.setJobStatus).toHaveBeenCalledWith('t2', 'CANCELLED');
  expect(store.setJobStatus).not.toHaveBeenCalledWith('t1', expect.anything());
});

it('reads the Library and the mode once per tick for the follow-ups, not once per job', async () => {
  store.dueJobs.mockResolvedValue(['a', 'b', 'c', 'd', 'e'].map((id) => followUp(id, '2026-09-05T09:00:00.000Z')));
  await processDueJobs();
  expect(deliverOut).toHaveBeenCalledTimes(5);
  expect(store.listTemplates).toHaveBeenCalledTimes(1);
  expect(store.getSetting.mock.calls.filter(([k]) => k === 'ai_mode')).toHaveLength(1);
});

it('follow-ups still go one after another', async () => {
  let fuInFlight = 0; let fuPeak = 0;
  deliverOut.mockImplementation(async (c: { id: string }) => {
    fuInFlight++; fuPeak = Math.max(fuPeak, fuInFlight);
    await new Promise((r) => setTimeout(r, 5));
    fuInFlight--; events.push(`followup:${c.id}`); return { ok: true };
  });
  store.dueJobs.mockResolvedValue(['a', 'b', 'c'].map((id) => followUp(id, '2026-09-05T09:00:00.000Z')));
  await processDueJobs();
  expect(fuPeak).toBe(1);
  expect(events).toEqual(['followup:a', 'followup:b', 'followup:c']);
});

it('the other customer-facing jobs (questionnaire acknowledgement, holding line) also go before follow-ups', async () => {
  store.dueJobs.mockResolvedValue([
    followUp('a', '2026-09-05T09:00:00.000Z'),
    { id: 'h1', customerId: 'h', kind: 'HANDOFF_ACK' as const, payload: {}, runAt: '2026-09-05T09:00:10.000Z', status: 'SCHEDULED' as const, createdAt: '2026-09-05T08:30:00.000Z' },
  ]);
  const seen: string[] = [];
  store.claimJob.mockImplementation(async (id: string) => { seen.push(id); return true; });
  await processDueJobs();
  expect(seen).toEqual(['h1', 'fa']);
});
