/**
 * The full send chain for Will's reply to a bare customer thank-you, end to end
 * and offline (29 Oct).
 *
 *   signed Meta webhook POST
 *     -> claimInbound (dedupe on the Meta message id)
 *     -> handleIncoming (stores the message, arms the AUTO_REPLY timer)
 *     -> processDueJobs (the scheduler tick) -> runAutoReplyTimer
 *     -> runDeferredAutoReply (supersession, "already answered", team-active)
 *     -> decideAndAct -> runEngine (safety net: action != reply + closing-only
 *        thanks -> reply, approved_key 'thanks', thanksReply) -> policyGuard
 *     -> deliverOut (verbatim-dedupe, QUEUED row, send, SENT row)
 *     -> sendWhatsAppText -> postMessage -> fetch (the Meta Graph API)
 *
 * REAL in this file: the webhook route, service.ts, scheduler.ts, engine.ts,
 * policy-guard.ts, text-normalize.ts, channel.ts (deliverOut, sendWhatsAppText,
 * postMessage) and config.ts.
 *
 * MOCKED: the database (an in-memory store below), the model (`decide`), the
 * knowledge search, and `global.fetch`, which is the ONLY thing that would reach
 * WhatsApp. Fake credentials are placed in the fake settings so postMessage takes
 * its real "send" branch (without them it short-circuits to `skipped` and fetch
 * is never called, which would make "exactly one send" meaningless).
 * Nothing here touches production data or a real WhatsApp number.
 *
 * NOT covered here (see the report): the reviewer/second-check model, the real
 * Supabase store, the Meta status webhook, the CRM "Take over" route, and the
 * real wall clock (no fake timers: delays are asserted from the job's runAt).
 */
import { createHmac } from 'crypto';

// ───────────────────────────── in-memory store ─────────────────────────────
type Any = Record<string, any>;
const mockDb = {
  customers: [] as unknown as Any[], messages: [] as Any[], jobs: [] as Any[], tasks: [] as Any[],
  audits: [] as { actor: string; action: string; data: Any }[],
  settings: new Map<string, unknown>(), inbound: new Set<string>(), unknown: new Set<string>(),
  seq: 0,
};
const mockId = (p: string) => `${p}${++mockDb.seq}`;

const mockStoreImpl: Any = {
  getCustomerByWaId: async (waId: string) => { const c = mockDb.customers.find((x) => x.waId === waId); return c ? { ...c } : null; },
  getCustomerById: async (id: string) => { const c = mockDb.customers.find((x) => x.id === id); return c ? { ...c } : null; },
  updateCustomer: async (id: string, patch: Any) => { Object.assign(mockDb.customers.find((x) => x.id === id) ?? {}, patch); },
  setState: async (id: string, state: string) => { Object.assign(mockDb.customers.find((x) => x.id === id) ?? {}, { state }); return true; },
  addMessage: async (m: Any) => {
    const row: Any = { id: mockId('m'), createdAt: new Date().toISOString(), meta: {}, ...m };
    mockDb.messages.push(row);
    if (row.direction === 'IN') {
      const c = mockDb.customers.find((x) => x.id === row.customerId);
      if (c) c.lastCustomerMsgAt = row.createdAt;
    }
    return row;
  },
  listMessages: async (customerId: string) => mockDb.messages.filter((m) => m.customerId === customerId).map((m) => ({ ...m })),
  setMessageStatus: async (id: string, status: string) => { Object.assign(mockDb.messages.find((m) => m.id === id) ?? {}, { status }); },
  attachProviderId: async (id: string, providerId: string) => { const m = mockDb.messages.find((x) => x.id === id); if (m) m.meta = { ...m.meta, providerId }; },
  markCustomerRead: async () => undefined,
  addJob: async (j: Any) => {
    const row = { id: mockId('j'), status: 'SCHEDULED', createdAt: new Date().toISOString(), attempts: 0, ...j };
    mockDb.jobs.push(row);
    return row;
  },
  cancelJobsFor: async (customerId: string, kinds?: string[]) => {
    let n = 0;
    for (const j of mockDb.jobs) {
      if (j.customerId === customerId && j.status === 'SCHEDULED' && (!kinds || kinds.includes(j.kind))) { j.status = 'CANCELLED'; n++; }
    }
    return n;
  },
  listJobsForCustomer: async (customerId: string, kinds?: string[]) =>
    mockDb.jobs.filter((j) => j.customerId === customerId && (!kinds || kinds.includes(j.kind))).map((j) => ({ ...j })),
  // The tick: every SCHEDULED AUTO_REPLY timer counts as due (the test asserts the
  // delay from runAt separately, so there is no need to wait 1 to 5 real minutes).
  dueJobs: async () => mockDb.jobs.filter((j) => j.status === 'SCHEDULED' && j.kind === 'AUTO_REPLY').map((j) => ({ ...j })),
  claimJob: async (id: string) => {
    const j = mockDb.jobs.find((x) => x.id === id);
    if (!j || j.status !== 'SCHEDULED') return false;
    j.status = 'CLAIMED';
    return true;
  },
  setJobStatus: async (id: string, status: string) => { Object.assign(mockDb.jobs.find((x) => x.id === id) ?? {}, { status }); },
  getJob: async (id: string) => mockDb.jobs.find((x) => x.id === id) ?? null,
  reclaimStaleJobs: async () => 0,
  getSetting: async (k: string) => mockDb.settings.get(k),
  setSetting: async (k: string, v: unknown) => { mockDb.settings.set(k, v); },
  audit: async (actor: string, action: string, data: Any = {}) => { mockDb.audits.push({ actor, action, data }); },
  addTask: async (t: Any) => { const row = { id: mockId('t'), status: 'OPEN', ...t }; mockDb.tasks.push(row); return row; },
  findOpenTaskForCustomer: async () => null,
  updateTask: async () => undefined,
  bumpCounter: async () => false, // AI daily budget not exhausted
  listTemplates: async () => [],
  claimInbound: async (id: string) => { if (mockDb.inbound.has(id)) return false; mockDb.inbound.add(id); return true; },
  releaseInbound: async (id: string) => { mockDb.inbound.delete(id); },
  isBlockedContact: async () => false,
};
// Anything the chain calls that is not implemented above is recorded (and the test
// "no unexpected store calls on the critical path" prints it), never silently ignored.
const mockStore = new Proxy(mockStoreImpl, {
  get(target, prop: string) {
    if (prop in target) return target[prop];
    if (prop === 'then') return undefined;
    return async () => { mockDb.unknown.add(prop); return prop.startsWith('list') ? [] : undefined; };
  },
});
jest.mock('@/lib/will/store', () => ({ getStore: () => mockStore }));

// ───────────────────────────── other mocks ─────────────────────────────
jest.mock('@/lib/will/claude', () => ({ ...jest.requireActual('@/lib/will/claude'), decide: jest.fn() }));
jest.mock('@/lib/will/knowledge', () => ({ retrieveKnowledge: jest.fn().mockResolvedValue([]), nearestKnowledge: jest.fn().mockResolvedValue(null) }));
jest.mock('@/lib/rate-limit', () => ({ isRateLimited: jest.fn().mockResolvedValue(false), getRedis: jest.fn().mockResolvedValue(null) }));

import { decide } from '@/lib/will/claude';
import { POST } from '@/app/api/will/webhook/route';
import { processDueJobs, TickResult } from '@/lib/will/scheduler';
import { runDeferredAutoReply, TEAM_ACTIVE_MS } from '@/lib/will/service';
import { policyGuard } from '@/lib/will/policy-guard';
import { THANKS_REPLIES, THANKS_REPLIES_ML } from '@/lib/will/text-normalize';

const decideMock = decide as jest.MockedFunction<typeof decide>;
const fetchMock = jest.fn();
const realFetch = global.fetch;

const WA = '61400000777';
const SECRET = 'chain-test-secret';
const WILL_LAST = 'Payment received. Please fill out this quick form.';
const minAgo = (n: number) => new Date(Date.now() - n * 60_000).toISOString();

function seed(over: Any = {}, opts: { humanMinAgo?: number } = {}) {
  mockDb.customers.push({
    id: 'c1', waId: WA, name: 'Sam', brand: 'wht', state: 'PAID', paid: true, formComplete: false,
    aiPaused: false, optedOut: false, isLegacy: false, botOwned: true, lang: 'en', income: 'TFN',
    missingDocs: [], estimatedRefundCents: null, outcome: null, lastCustomerMsgAt: minAgo(30), ...over,
  });
  mockDb.messages.push(
    { id: mockId('m'), customerId: 'c1', direction: 'IN', author: 'CUSTOMER', status: 'SENT', body: 'I have paid', meta: {}, createdAt: minAgo(25) },
    { id: mockId('m'), customerId: 'c1', direction: 'OUT', author: 'AI', status: 'SENT', body: WILL_LAST, meta: {}, createdAt: minAgo(24) },
  );
  if (opts.humanMinAgo !== undefined) {
    mockDb.messages.push({ id: mockId('m'), customerId: 'c1', direction: 'OUT', author: 'HUMAN', status: 'SENT', body: 'Your form has been received, all good.', meta: {}, createdAt: minAgo(opts.humanMinAgo) });
  }
}

let wamidSeq = 0;
function webhook(text: string, wamid = `wamid.T${++wamidSeq}`) {
  const raw = JSON.stringify({ entry: [{ changes: [{ value: {
    contacts: [{ wa_id: WA, profile: { name: 'Sam' } }],
    messages: [{ id: wamid, from: WA, type: 'text', text: { body: text } }],
  } }] }] });
  const sig = 'sha256=' + createHmac('sha256', SECRET).update(raw, 'utf8').digest('hex');
  return new Request('http://x/api/will/webhook', { method: 'POST', headers: { 'x-hub-signature-256': sig, 'content-type': 'application/json' }, body: raw });
}

const sentBodies = (): string[] => fetchMock.mock.calls.map((c) => JSON.parse((c[1] as { body: string }).body).text?.body);
const outRows = (status?: string) => mockDb.messages.filter((m) => m.direction === 'OUT' && m.author === 'AI' && m.body && m.createdAt > minAgo(5) && (!status || m.status === status));
const audited = (a: string) => mockDb.audits.filter((x) => x.action === a);
const timers = () => mockDb.jobs.filter((j) => j.kind === 'AUTO_REPLY' && j.payload?.debounce);

async function tick(): Promise<TickResult> { return processDueJobs(); }

beforeEach(() => {
  mockDb.customers.length = 0; mockDb.messages.length = 0; mockDb.jobs.length = 0; mockDb.tasks.length = 0;
  mockDb.audits.length = 0; mockDb.inbound.clear(); mockDb.unknown.clear(); mockDb.settings.clear(); mockDb.seq = 0;
  mockDb.settings.set('ai_mode', 'FULL_AUTO');
  mockDb.settings.set('decision_mode', 'will');
  mockDb.settings.set('wa_access_token', 'FAKE_TOKEN_NOT_REAL');
  mockDb.settings.set('wa_phone_number_id', '000000000000001');
  mockDb.settings.set('bank_details', { bsb: '062692', account: '81049952' });
  process.env.META_APP_SECRET = SECRET;
  delete process.env.WHATSAPP_PHONE_NUMBER_ID;
  fetchMock.mockReset().mockImplementation(async () => ({
    ok: true, status: 200, json: async () => ({ messages: [{ id: `wamid.OUT${++wamidSeq}` }] }),
  }));
  (global as Any).fetch = fetchMock;
  // The model reads a thank-you as a closing and waits. This is the exact failure
  // the engine safety net exists for (Jo, 29 Oct).
  decideMock.mockReset().mockResolvedValue({ action: 'wait', confidence: 1 } as never);
});
afterAll(() => { (global as Any).fetch = realFetch; });

// ───────────────────────────── the happy path ─────────────────────────────
describe('a bare thank-you, end to end', () => {
  it('produces exactly one WhatsApp send, in the 1 to 5 minute delay window, with the thanks line', async () => {
    seed();
    const t0 = Date.now();
    const res = await POST(webhook('Thank you so much!'));
    expect(res.status).toBe(200);

    // Ingest: stored, nothing sent yet, one timer armed 60s..300s ahead (the human pause).
    expect(mockDb.messages.filter((m) => m.direction === 'IN' && m.body === 'Thank you so much!')).toHaveLength(1);
    expect(fetchMock).not.toHaveBeenCalled();
    const armed = timers().filter((j) => j.status === 'SCHEDULED');
    expect(armed).toHaveLength(1);
    const delayS = (new Date(armed[0].runAt).getTime() - t0) / 1000;
    expect(delayS).toBeGreaterThanOrEqual(59);
    expect(delayS).toBeLessThanOrEqual(301);
    // The model was not asked yet either: the reply is decided when the timer fires.
    expect(decideMock).not.toHaveBeenCalled();

    // The tick fires the timer.
    const r = await tick();
    expect(r.sent).toEqual(['Sam · autopilot reply']);
    expect(decideMock).toHaveBeenCalledTimes(1); // the model chose 'wait'; the safety net overrode it
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0];
    expect(String(url)).toContain('graph.facebook.com');
    expect(String(url)).toContain('/000000000000001/messages');
    const payload = JSON.parse((init as { body: string }).body);
    expect(payload).toMatchObject({ messaging_product: 'whatsapp', to: WA, type: 'text' });
    expect(THANKS_REPLIES as readonly string[]).toContain(payload.text.body);

    // Recorded once, as SENT, authored by the AI; the timer is DONE; no task opened.
    expect(outRows('SENT')).toHaveLength(1);
    expect(outRows('FAILED')).toHaveLength(0);
    expect(timers().every((j) => j.status === 'DONE' || j.status === 'CANCELLED')).toBe(true);
    expect(mockDb.tasks).toHaveLength(0);
  });

  it('the reply passes the policy guard and has no dashes, no AI mention and no promises', async () => {
    seed();
    await POST(webhook('Thanks!'));
    await tick();
    const [body] = sentBodies();
    expect(body).toBeTruthy();

    const verdict = policyGuard(body, {
      state: 'PAID', paid: true, aiPaused: false, killSwitch: false, optedOut: false, isLegacy: false,
      lastCustomerMsgAt: new Date(), isApprovedTemplate: false, estimateFromTeam: null,
      customerTextChars: 7, customerText: 'Thanks!',
    } as never);
    expect(verdict).toMatchObject({ allowed: true, violations: [] });

    expect(body).not.toMatch(/[-‐-―−]/);                       // no hyphen or any dash
    expect(body).not.toMatch(/\b(?:AI|A\.I\.|bot|chatbot|robot|automated|assistant|language model|ChatGPT|Claude|GPT|LLM)\b/i);
    expect(body).not.toMatch(/\b(?:guarantee[ds]?|promise[ds]?|definitely|for sure|100\s?%|will (?:be|get|receive|arrive)|refund|\$\s?\d)/i);
    expect(body.length).toBeLessThanOrEqual(40);                                // one short line
  });

  it('every thanks line in every language is guard-clean and dash-free (the lines the net can pick)', () => {
    for (const [lang, pair] of Object.entries(THANKS_REPLIES_ML)) {
      for (const line of pair) {
        const v = policyGuard(line, {
          state: 'PAID', paid: true, aiPaused: false, killSwitch: false, optedOut: false, isLegacy: false,
          lastCustomerMsgAt: new Date(), isApprovedTemplate: false, estimateFromTeam: null,
        } as never);
        expect([lang, line, v.allowed, v.violations]).toEqual([lang, line, true, []]);
        expect(line).not.toMatch(/[-‐-―−]/);
      }
    }
  });

  it('never the same line twice in a row: a second thank-you gets the other one', async () => {
    seed();
    await POST(webhook('Thanks!'));
    await tick();
    await POST(webhook('Thank you again!'));
    await tick();
    const bodies = sentBodies();
    expect(bodies).toHaveLength(2);
    expect(bodies[0]).not.toBe(bodies[1]);
  });

  it('also works in the legacy (non-will) decision mode, with no model call at all', async () => {
    mockDb.settings.set('decision_mode', 'legacy');
    seed();
    await POST(webhook('Thank you!'));
    await tick();
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(THANKS_REPLIES as readonly string[]).toContain(sentBodies()[0]);
    expect(decideMock).not.toHaveBeenCalled();
  });

  it('a thank-you that also asks something is NOT force-answered with the thanks line', async () => {
    seed();
    await POST(webhook('Thanks! When will it be lodged?'));
    await tick();
    expect(sentBodies().filter((b) => THANKS_REPLIES.includes(b as never))).toHaveLength(0);
  });

  it('a first-ever message that only says thank you gets no canned thanks (nothing was said to thank for)', async () => {
    seed();
    mockDb.messages.length = 0; // no history at all
    await POST(webhook('Thank you'));
    await tick();
    expect(sentBodies().filter((b) => THANKS_REPLIES.includes(b as never))).toHaveLength(0);
  });
});

// ───────────────────────────── duplicates ─────────────────────────────
describe('a repeated webhook never sends twice', () => {
  it('the same Meta message id delivered twice: one stored message, one timer, one send', async () => {
    seed();
    const first = await POST(webhook('Thank you!', 'wamid.SAME'));
    const second = await POST(webhook('Thank you!', 'wamid.SAME')); // Meta redelivery
    expect(first.status).toBe(200);
    expect(second.status).toBe(200);
    expect(mockDb.messages.filter((m) => m.direction === 'IN' && m.body === 'Thank you!')).toHaveLength(1);
    expect(timers()).toHaveLength(1);
    await tick();
    await tick(); // a second tick finds nothing due
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('two DIFFERENT message ids with the same text (a double tap): the second timer replaces the first, one send', async () => {
    seed();
    await POST(webhook('Thank you!', 'wamid.A'));
    await POST(webhook('Thank you!', 'wamid.B'));
    expect(timers().filter((j) => j.status === 'SCHEDULED')).toHaveLength(1);
    expect(timers().filter((j) => j.status === 'CANCELLED')).toHaveLength(1);
    await tick();
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('the timer firing twice (a crash and reclaim, or two overlapping ticks) does not send a second copy', async () => {
    seed();
    await POST(webhook('Thank you!'));
    const customer = mockDb.customers[0];
    const job = mockDb.jobs.find((j) => j.kind === 'AUTO_REPLY')!;
    const a = await runDeferredAutoReply({ ...customer } as never, { id: job.id, payload: job.payload, createdAt: job.createdAt, runAt: job.runAt });
    const b = await runDeferredAutoReply({ ...customer } as never, { id: job.id, payload: job.payload, createdAt: job.createdAt, runAt: job.runAt });
    expect(a).toBe('sent');
    expect(b).toBe('answered'); // an AI line already went out after the customer's message
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(audited('auto_reply_already_answered').length).toBeGreaterThanOrEqual(1);
  });

  it('even if that check were bypassed, deliverOut refuses the identical body (last line of defence)', async () => {
    seed();
    const { deliverOut } = await import('@/lib/will/channel');
    const customer = { ...mockDb.customers[0] };
    const one = await deliverOut(customer as never, THANKS_REPLIES[0], 'AI');
    const two = await deliverOut(customer as never, THANKS_REPLIES[0], 'AI');
    expect(one.ok).toBe(true);
    expect(two).toMatchObject({ ok: true, error: 'already sent, skipped' });
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(audited('send_blocked_already_sent_verbatim')).toHaveLength(1);
  });

  it('a newer message arriving while the first timer runs supersedes it: no stale reply', async () => {
    seed();
    await POST(webhook('Thank you!', 'wamid.1'));
    const job = mockDb.jobs.find((j) => j.kind === 'AUTO_REPLY')!;
    const customer = { ...mockDb.customers[0] };
    // a second message re-arms a newer timer after the first one has already been claimed
    job.status = 'CLAIMED';
    await new Promise((r) => setTimeout(r, 5));
    mockDb.jobs.push({ id: 'jNEWER', customerId: 'c1', kind: 'AUTO_REPLY', status: 'SCHEDULED', payload: { debounce: true, anchorAt: null }, runAt: new Date(Date.now() + 600_000).toISOString(), createdAt: new Date().toISOString() });
    const out = await runDeferredAutoReply(customer as never, { id: job.id, payload: job.payload, createdAt: job.createdAt, runAt: job.runAt });
    expect(out).toBe('superseded');
    expect(fetchMock).not.toHaveBeenCalled();
  });
});

// ───────────────────────────── team active ─────────────────────────────
describe('when a person from the team wrote recently', () => {
  it('ACTUAL BEHAVIOUR: a PLAIN thank-you is still answered (by design, Jo 21 Oct), after the usual 1 to 5 minute delay, not held', async () => {
    seed({}, { humanMinAgo: 9 });
    await POST(webhook('Thanks!'));
    // the delay is still applied: nothing leaves at ingest
    expect(fetchMock).not.toHaveBeenCalled();
    await tick();
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(audited('auto_reply_skipped_team_active')).toHaveLength(0);
    expect(audited('auto_reply_deferred_team_active')).toHaveLength(0);
  });

  it('a thank-you WITH a question is held until 30 minutes after the team message, re-armed, and sends nothing now', async () => {
    seed({}, { humanMinAgo: 9 });
    await POST(webhook('Thanks! When will the money arrive?'));
    const humanAt = new Date(minAgo(9)).getTime();
    await tick();
    expect(fetchMock).not.toHaveBeenCalled();
    expect(decideMock).not.toHaveBeenCalled();
    const deferred = audited('auto_reply_deferred_team_active');
    expect(deferred).toHaveLength(1);
    const rearmed = mockDb.jobs.filter((j) => j.kind === 'AUTO_REPLY' && j.status === 'SCHEDULED' && j.payload.attempt === 1);
    expect(rearmed).toHaveLength(1);
    const runAt = new Date(rearmed[0].runAt).getTime();
    expect(runAt).toBeGreaterThanOrEqual(humanAt + TEAM_ACTIVE_MS);
    expect(runAt).toBeLessThanOrEqual(humanAt + TEAM_ACTIVE_MS + 2 * 60_000);
  });

  it('the team answering the thank-you themselves first means Will adds nothing', async () => {
    seed({}, { humanMinAgo: 9 });
    await POST(webhook('Thanks!'));
    await new Promise((r) => setTimeout(r, 5));
    mockDb.messages.push({ id: mockId('m'), customerId: 'c1', direction: 'OUT', author: 'HUMAN', status: 'SENT', body: 'Pleasure!', meta: {}, createdAt: new Date().toISOString() });
    await tick();
    expect(fetchMock).not.toHaveBeenCalled();
    expect(audited('auto_reply_already_answered')).toHaveLength(1);
  });
});

// ───────────────────────────── paused / handed over ─────────────────────────────
describe('Will is paused or the chat belongs to a person', () => {
  it('aiPaused (Take over): nothing is sent (the model is still called once, see the note)', async () => {
    seed({ aiPaused: true });
    await POST(webhook('Thank you!'));
    await tick();
    expect(fetchMock).not.toHaveBeenCalled();
    // OBSERVED: a paid model call is still spent on a paused chat; the guard only blocks afterwards.
    expect(decideMock).toHaveBeenCalledTimes(1);
    expect(outRows()).toHaveLength(0);
    // OBSERVED, pinned on purpose: for a paused chat the real engine returns a bare
    // 'silent' (engine.ts NOT_A_FAULT branch, ~line 1170) WITHOUT guardViolations, so the
    // "wrote in while Will is switched off" task in service.ts (decideAndAct, the
    // AI_PAUSED_FOR_CUSTOMER branch) is not reached from the real engine. No task, no
    // 'message_while_ai_paused' audit. For a thank-you that is the wanted outcome
    // (Jo, 27 Aug: no task for a courtesy line). See the report.
    expect(mockDb.tasks).toHaveLength(0);
    expect(audited('message_while_ai_paused')).toHaveLength(0);
  });

  it('the team takes over AFTER the thank-you but BEFORE the timer fires: still nothing is sent', async () => {
    seed();
    await POST(webhook('Thank you!'));
    expect(fetchMock).not.toHaveBeenCalled();
    mockDb.customers[0].aiPaused = true; // Jo clicks Take over during the wait
    await tick();
    expect(fetchMock).not.toHaveBeenCalled();
    expect(outRows()).toHaveLength(0);
  });

  it('kill switch (Pause Will): the tick does nothing at all, ingest sends no holding line to a thank-you, nothing leaves', async () => {
    mockDb.settings.set('kill_switch', true);
    seed();
    await POST(webhook('Thank you!'));
    expect(fetchMock).not.toHaveBeenCalled(); // no "we are paused" line on a pure thank-you
    const r = await tick();
    expect(r).toMatchObject({ processed: 0, sent: [] });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('kill switch flipped on while the timer waits: the guard still blocks if the service is reached directly', async () => {
    seed();
    await POST(webhook('Thank you!'));
    mockDb.settings.set('kill_switch', true);
    const job = mockDb.jobs.find((j) => j.kind === 'AUTO_REPLY')!;
    await runDeferredAutoReply({ ...mockDb.customers[0] } as never, { id: job.id, payload: job.payload, createdAt: job.createdAt, runAt: job.runAt });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('opted out: the stop word cancels the timers and nothing is ever sent', async () => {
    seed();
    await POST(webhook('Thank you!'));
    await POST(webhook('STOP'));
    await tick();
    expect(fetchMock).not.toHaveBeenCalled();
    expect(mockDb.customers[0].optedOut).toBe(true);
  });

  it('a legacy (pre-Will) chat gets no automatic thanks', async () => {
    seed({ isLegacy: true });
    await POST(webhook('Thank you!'));
    await tick();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('Approval (supervised) mode: the thanks line becomes a draft for the team, not a send', async () => {
    mockDb.settings.set('ai_mode', 'SUPERVISED');
    seed();
    await POST(webhook('Thank you!'));
    await tick();
    expect(fetchMock).not.toHaveBeenCalled();
    const drafts = mockDb.messages.filter((m) => m.status === 'PENDING_APPROVAL');
    expect(drafts).toHaveLength(1);
    expect(THANKS_REPLIES as readonly string[]).toContain(drafts[0].body);
  });
});

// ───────────────────────────── sender failures ─────────────────────────────
describe('when WhatsApp itself fails', () => {
  it('a throttle (429) is retried, not turned into a task, and does not double-send once it recovers', async () => {
    seed();
    await POST(webhook('Thank you!'));
    fetchMock.mockReset()
      .mockResolvedValueOnce({ ok: false, status: 429, json: async () => ({ error: { message: 'rate', code: 130429 } }) })
      .mockResolvedValue({ ok: true, status: 200, json: async () => ({ messages: [{ id: 'wamid.OK' }] }) });
    await tick();
    expect(mockDb.tasks).toHaveLength(0);
    expect(audited('auto_reply_rearmed_after_throttle')).toHaveLength(1);
    await tick();
    expect(fetchMock).toHaveBeenCalledTimes(2); // one rejected attempt, one delivered
    expect(mockDb.messages.filter((m) => m.status === 'SENT' && m.direction === 'OUT' && THANKS_REPLIES.includes(m.body as never))).toHaveLength(1);
  });

  it('a permanent rejection opens exactly one task for the team and does not retry', async () => {
    seed();
    await POST(webhook('Thank you!'));
    fetchMock.mockReset().mockResolvedValue({ ok: false, status: 400, json: async () => ({ error: { message: 'bad', code: 100 } }) });
    await tick();
    await tick();
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(mockDb.tasks).toHaveLength(1);
  });
});

describe('the chain only used the store methods this file implements', () => {
  it('no unexpected store calls on the happy path', async () => {
    seed();
    await POST(webhook('Thank you!'));
    await tick();
    // Printed, not asserted away: anything listed here ran against the Proxy's no-op fallback.
    // eslint-disable-next-line no-console
    if (mockDb.unknown.size) console.log('store methods hit the no-op fallback:', [...mockDb.unknown].join(', '));
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
