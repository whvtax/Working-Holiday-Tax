/**
 * Silence is a bug (Will mission, 1 Nov). Same offline chain as thanks-send-chain-29oct:
 * webhook -> timer -> runDeferredAutoReply -> decideAndAct. The mocked model always
 * says "wait". Whatever the customer wrote, the chat must end with a reply or ONE
 * visible task, except where silence is deliberate (paused, opted out).
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
import { THANKS_REPLIES } from '@/lib/will/text-normalize';

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

const tasksFor = () => mockDb.tasks.filter((t) => t.customerId === 'c1' || t.customer_id === 'c1');
const everSpoke = () => fetchMock.mock.calls.length > 0 || tasksFor().length > 0 || mockDb.tasks.length > 0;

describe('no silence: a customer message always ends in a reply or a task', () => {
  it('a substantive question the model waits on is never dropped', async () => {
    seed({ state: 'FORM_PENDING' });
    await POST(webhook('Which questionnaire are we talking about? Where do I find it?'));
    await tick();
    expect(everSpoke()).toBe(true);
  });

  it('an UNPAID lead the model waits on is never dropped either', async () => {
    seed({ state: 'PRICE_SENT', paid: false });
    await POST(webhook('Can I split the fee over two payments?'));
    await tick();
    expect(everSpoke()).toBe(true);
  });

  it('a bare thank-you after the team wrote still gets the thank-you line', async () => {
    seed({ state: 'LODGED' }, { humanMinAgo: 10 });
    await POST(webhook('Thank you so much!'));
    await tick();
    expect(THANKS_REPLIES as readonly string[]).toContain(sentBodies()[0]);
  });

  it('a paused chat stays silent: no send, no task', async () => {
    seed({ aiPaused: true });
    await POST(webhook('Which questionnaire are we talking about?'));
    await tick();
    expect(fetchMock).not.toHaveBeenCalled();
    expect(mockDb.tasks.length).toBe(0);
  });
});
