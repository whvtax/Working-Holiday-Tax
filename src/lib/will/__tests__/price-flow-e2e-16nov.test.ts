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

const decideMock = decide as jest.MockedFunction<typeof decide>;
const fetchMock = jest.fn();
const realFetch = global.fetch;

const WA = '61400000777';
const SECRET = 'chain-test-secret';
const minAgo = (n: number) => new Date(Date.now() - n * 60_000).toISOString();


let wamidSeq = 0;
function webhook(text: string, wamid = `wamid.T${++wamidSeq}`) {
  const raw = JSON.stringify({ entry: [{ changes: [{ value: {
    contacts: [{ wa_id: WA, profile: { name: 'Sam' } }],
    messages: [{ id: wamid, from: WA, type: 'text', text: { body: text } }],
  } }] }] });
  const sig = 'sha256=' + createHmac('sha256', SECRET).update(raw, 'utf8').digest('hex');
  return new Request('http://x/api/will/webhook', { method: 'POST', headers: { 'x-hub-signature-256': sig, 'content-type': 'application/json' }, body: raw });
}

/** 18 Nov: the payment details are queued behind a 3 to 5 minute pause, not sent at once. */
const queuedBodies = (): string[] => mockDb.messages.filter((m: Any) => m.direction === 'OUT' && m.status === 'QUEUED').map((m: Any) => m.body as string);
const sentBodies = (): string[] => fetchMock.mock.calls.map((c) => JSON.parse((c[1] as { body: string }).body).text?.body);


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

// ───────────────────── the new two-message price flow, end to end ─────────────────────
const OPENER = 'Hey! 😊 Happy to help.\n\nQuick one so I point you to the right option: did you work for employers on a TFN only, or also on an ABN (Uber, delivery, contracting)?';

function seedOpening(variant: 'old' | 'new') {
  mockDb.settings.set('decision_mode', 'legacy');
  mockDb.settings.set('price_flow_variant', variant);
  mockDb.customers.push({
    id: 'c1', waId: WA, name: 'Sam', brand: 'wht', state: 'QUALIFIED', paid: false, formComplete: false,
    aiPaused: false, optedOut: false, isLegacy: false, botOwned: true, lang: 'en', income: null,
    missingDocs: [], estimatedRefundCents: null, outcome: null, lastCustomerMsgAt: minAgo(2),
  });
  mockDb.messages.push(
    { id: mockId('m'), customerId: 'c1', direction: 'OUT', author: 'AI', status: 'SENT', body: OPENER, meta: {}, createdAt: minAgo(3) },
  );
}

describe('new price flow (A/B), end to end', () => {
  it('old setting: the TFN choice gets the one-message price with bank details, as today', async () => {
    seedOpening('old');
    await POST(webhook('TFN only'));
    const bodies = sentBodies();
    expect(bodies.some((b) => /BSB: 062692/.test(b))).toBe(true);
    expect(bodies.some((b) => /(?:Shall I|Want me to) send the payment details\?/.test(b))).toBe(false);
  });

  it('new setting: the TFN choice gets the steps message and NO bank details yet', async () => {
    seedOpening('new');
    await POST(webhook('TFN only'));
    const bodies = sentBodies();
    expect(bodies.some((b) => /Here's how it works:/.test(b) && /(?:Shall I|Want me to) send the payment details\?/.test(b))).toBe(true);
    expect(bodies.some((b) => /BSB|Account:/.test(b))).toBe(false);
  });

  it('new setting: "yes" after the steps message sends the bank details, once', async () => {
    seedOpening('new');
    await POST(webhook('TFN only'));
    await POST(webhook('yes'));
    expect(sentBodies().some((b) => /BSB: 062692/.test(b))).toBe(false); // not at once: three to five minutes later
    const bodies = queuedBodies();
    const detail = bodies.filter((b) => /BSB: 062692/.test(b) && /Account: 81049952/.test(b));
    expect(detail).toHaveLength(1);
    expect(detail[0]).toMatch(/Send a screenshot once paid/);
  });

  it('new setting: a second "yes" does not send the bank details again', async () => {
    seedOpening('new');
    await POST(webhook('TFN only'));
    await POST(webhook('yes'));
    await POST(webhook('yes'));
    const detail = [...sentBodies(), ...queuedBodies()].filter((b) => /BSB: 062692/.test(b));
    expect(detail).toHaveLength(1);
  });

  it('new setting: a question instead of "yes" gets no bank details', async () => {
    seedOpening('new');
    await POST(webhook('TFN only'));
    await POST(webhook('how long does it take?'));
    expect(sentBodies().some((b) => /BSB|Account:/.test(b))).toBe(false);
  });
});

describe('new price flow (A/B), TFN + ABN, end to end', () => {
  it('new setting: the ABN choice gets the steps message with $385, the business schedule line, and NO bank details', async () => {
    seedOpening('new');
    await POST(webhook('I also have ABN income'));
    const bodies = sentBodies();
    const steps = bodies.find((b) => /TFN \+ ABN option/.test(b));
    expect(steps).toBeDefined();
    expect(steps).toMatch(/Pay \$385\./);
    expect(steps).toMatch(/including your ABN income and expenses/);
    expect(steps).toMatch(/(?:Shall I|Want me to) send the payment details\?\s*$/);
    expect(bodies.some((b) => /BSB|Account:/.test(b))).toBe(false);
  });

  it('new setting: "yes" after the ABN steps sends the same bank details, once, and no refund-difference wording (ABN fee is fixed)', async () => {
    seedOpening('new');
    await POST(webhook('I also have ABN income'));
    await POST(webhook('yes'));
    expect(sentBodies().some((b) => /BSB: 062692/.test(b))).toBe(false); // not at once: three to five minutes later
    const bodies = queuedBodies();
    const detail = bodies.filter((b) => /BSB: 062692/.test(b) && /Account: 81049952/.test(b));
    expect(detail).toHaveLength(1);
    expect(detail[0]).not.toMatch(/refund the difference/);
  });

  it('old setting: the ABN choice still gets the one-message $385 price with bank details', async () => {
    seedOpening('old');
    await POST(webhook('I also have ABN income'));
    const bodies = sentBodies();
    expect(bodies.some((b) => /\$385/.test(b) && /BSB: 062692/.test(b))).toBe(true);
  });
});

// ───────────── 18 Nov (decision 018): flow B in every language, end to end ─────────────
function seedOpeningIn(lang: string, brand: 'wht' | 'svt' = 'wht') {
  seedOpening('new');
  Object.assign(mockDb.customers[0], { lang, brand });
}

describe('flow B in the customer\'s language (Jo, 18 Nov: the standard for every language)', () => {
  it('Japanese: the TFN choice gets the Japanese steps, "はい" queues the Japanese payment details with $220', async () => {
    seedOpeningIn('ja');
    await POST(webhook('TFNのみです'));
    const steps = sentBodies().find((b) => /振込先をお送りしましょうか？\s*$/.test(b ?? ''));
    expect(steps).toBeDefined();
    expect(steps).toMatch(/\$220/);
    expect(sentBodies().some((b) => /062692/.test(b ?? ''))).toBe(false);
    await POST(webhook('はい、お願いします'));
    const detail = queuedBodies().filter((b) => /BSB：062692/.test(b));
    expect(detail).toHaveLength(1);
    expect(detail[0]).toContain('金額：$220');
    expect(detail[0]).toContain('口座番号：81049952');
  });

  it('Chinese: the ABN choice gets the Chinese steps with $385, "好的" queues the Chinese details with $385', async () => {
    seedOpeningIn('zh');
    await POST(webhook('我有ABN收入'));
    const steps = sentBodies().find((b) => /要我把付款信息发给你吗？\s*$/.test(b ?? ''));
    expect(steps).toBeDefined();
    expect(steps).toMatch(/\$385/);
    await POST(webhook('好的'));
    const detail = queuedBodies().filter((b) => /BSB: 062692/.test(b));
    expect(detail).toHaveLength(1);
    expect(detail[0]).toMatch(/^太好了，付款信息如下：/);
    expect(detail[0]).toContain('Amount: $385');
  });

  it('German with foreign income: the steps quote $330 with no guarantee, "ja" queues the details with $330', async () => {
    seedOpeningIn('de');
    mockDb.messages.push({ id: mockId('m'), customerId: 'c1', direction: 'IN', author: 'CUSTOMER', status: 'RECEIVED', body: 'Ich hatte auch Einkommen aus Deutschland', meta: {}, createdAt: minAgo(2) });
    await POST(webhook('nur TFN'));
    const steps = sentBodies().find((b) => /Soll ich dir die Zahlungsdaten schicken\?\s*$/.test(b ?? ''));
    expect(steps).toBeDefined();
    expect(steps).toMatch(/\$330/);
    expect(steps).not.toMatch(/Differenz/);
    await POST(webhook('ja'));
    const detail = queuedBodies().filter((b) => /BSB: 062692/.test(b));
    expect(detail).toHaveLength(1);
    expect(detail[0]).toContain('Betrag: $330');
  });

  it('a question instead of a yes, in Spanish, gets no bank details', async () => {
    seedOpeningIn('es');
    await POST(webhook('solo TFN'));
    await POST(webhook('¿cuánto tarda?'));
    expect([...sentBodies(), ...queuedBodies()].some((b) => /062692/.test(b ?? ''))).toBe(false);
  });
});
