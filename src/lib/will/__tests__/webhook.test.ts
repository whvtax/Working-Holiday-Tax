/**
 * TEST-01: security-critical coverage for the public WhatsApp webhook —
 * the one endpoint the internet can reach. Verifies the GET verification
 * handshake, HMAC signature enforcement (accept / reject / tampered /
 * missing-secret fail-closed), and that the atomic idempotency claim gates
 * processing (a duplicate delivery does not re-invoke the engine).
 *
 * The store and the engine are mocked so no DB or model is touched.
 */
import { createHmac } from 'crypto';

// ---- mocks ----
const handleIncoming = jest.fn().mockResolvedValue({});
jest.mock('@/lib/will/service', () => ({ handleIncoming: (...a: unknown[]) => handleIncoming(...a) }));

const claimInbound = jest.fn().mockResolvedValue(true);
const releaseInbound = jest.fn().mockResolvedValue(undefined);
const audit = jest.fn().mockResolvedValue(undefined);
// Key-aware on purpose. The webhook now resolves the phone number id through
// resolveWaCreds(), which reads wa_access_token / wa_phone_number_id from the
// store before falling back to the env vars. A blanket mock that answered
// 'SUPERVISED' to every key made the store look like it held a stored phone id
// of "SUPERVISED", which then beat the env id and dropped every message.
const getSetting = jest.fn().mockImplementation(async (key: string) =>
  (key === 'ai_mode' ? 'SUPERVISED' : undefined));
const isBlockedContact = jest.fn().mockResolvedValue(false);
jest.mock('@/lib/will/store', () => ({
  getStore: () => ({ claimInbound, releaseInbound, audit, getSetting, isBlockedContact }),
}));

import { GET, POST } from '@/app/api/will/webhook/route';

const SECRET = 'test-app-secret';
const VERIFY = 'test-verify-token';

function signed(bodyObj: unknown, secret = SECRET) {
  const raw = JSON.stringify(bodyObj);
  const sig = 'sha256=' + createHmac('sha256', secret).update(raw, 'utf8').digest('hex');
  return new Request('http://x/api/will/webhook', {
    method: 'POST',
    headers: { 'x-hub-signature-256': sig, 'content-type': 'application/json' },
    body: raw,
  });
}

// The per-sender inbound throttle (PER_SENDER_MAX) is real and its in-memory
// fallback persists across tests in this file, so every test that must actually
// reach the engine uses a DISTINCT sender. Sharing one number silently drops the
// 13th message onwards and makes assertions fail for a reason that has nothing
// to do with what is being tested.
let _senderSeq = 0;
const nextSender = () => `6140000${String(1000 + _senderSeq++)}`;

const textPayload = (id: string, phoneId?: string, from = nextSender()) => ({
  entry: [{ changes: [{ value: {
    ...(phoneId ? { metadata: { phone_number_id: phoneId } } : {}),
    contacts: [{ wa_id: from, profile: { name: 'Test' } }],
    messages: [{ id, from, type: 'text', text: { body: 'hello' } }],
  } }] }],
});

beforeEach(() => {
  jest.clearAllMocks();
  claimInbound.mockResolvedValue(true);
  isBlockedContact.mockResolvedValue(false);
  // Key-aware (see the definition above): 'SUPERVISED' only for ai_mode, so the
  // stored-credential lookup in resolveWaCreds() correctly finds nothing and
  // falls back to the env vars this suite sets.
  getSetting.mockImplementation(async (key: string) => (key === 'ai_mode' ? 'SUPERVISED' : undefined));
  process.env.META_APP_SECRET = SECRET;
  process.env.META_VERIFY_TOKEN = VERIFY;
});

describe('GET verification handshake', () => {
  it('echoes the challenge when the verify token matches', async () => {
    const res = await GET(new Request(`http://x/api/will/webhook?hub.mode=subscribe&hub.verify_token=${VERIFY}&hub.challenge=CHALLENGE123`));
    expect(res.status).toBe(200);
    expect(await res.text()).toBe('CHALLENGE123');
  });
  it('rejects a wrong verify token', async () => {
    const res = await GET(new Request('http://x/api/will/webhook?hub.mode=subscribe&hub.verify_token=WRONG&hub.challenge=X'));
    expect(res.status).toBe(403);
  });
});

describe('POST HMAC signature enforcement', () => {
  it('accepts a correctly-signed payload and processes it', async () => {
    const res = await POST(signed(textPayload('m1')));
    expect(res.status).toBe(200);
    expect(handleIncoming).toHaveBeenCalledTimes(1);
  });

  it('rejects a tampered body (signature mismatch) with 401 and does not process', async () => {
    const req = signed(textPayload('m2'));
    const tampered = new Request('http://x/api/will/webhook', {
      method: 'POST', headers: req.headers, body: JSON.stringify(textPayload('DIFFERENT')),
    });
    const res = await POST(tampered);
    expect(res.status).toBe(401);
    expect(handleIncoming).not.toHaveBeenCalled();
  });

  it('fails CLOSED (401) when the app secret is not configured', async () => {
    delete process.env.META_APP_SECRET;
    delete process.env.WHATSAPP_APP_SECRET;
    const res = await POST(signed(textPayload('m3')));
    expect(res.status).toBe(401);
    expect(handleIncoming).not.toHaveBeenCalled();
  });
});

describe('WH-01: phone number id routing', () => {
  afterEach(() => { delete process.env.WHATSAPP_PHONE_NUMBER_ID; });
  it('drops a valid-HMAC delivery addressed to a DIFFERENT phone number id', async () => {
    process.env.WHATSAPP_PHONE_NUMBER_ID = '999999999';
    const res = await POST(signed(textPayload('w1', '111111111')));
    expect(res.status).toBe(200);
    expect(handleIncoming).not.toHaveBeenCalled();
  });
  it('processes a delivery to OUR phone number id', async () => {
    process.env.WHATSAPP_PHONE_NUMBER_ID = '999999999';
    const res = await POST(signed(textPayload('w2', '999999999')));
    expect(res.status).toBe(200);
    expect(handleIncoming).toHaveBeenCalledTimes(1);
  });

  // CONFIG-02 regression. The Connect page stores the phone number id in the DB,
  // where it OVERRIDES the env var for SENDING. The webhook used to read only
  // the env var, so connecting through that page could point outbound at a new
  // id while inbound kept matching the old one — every incoming message silently
  // discarded, no error logged anywhere. Both directions must agree.
  it('honours a phone number id stored in the DB over the env var', async () => {
    process.env.WHATSAPP_PHONE_NUMBER_ID = '999999999';       // stale env value
    getSetting.mockImplementation(async (key: string) => {
      if (key === 'ai_mode') return 'SUPERVISED';
      if (key === 'wa_phone_number_id') return '448522015011534';  // what Connect saved
      return undefined;
    });

    // Addressed to the STORED id: must be processed.
    const good = await POST(signed(textPayload('w3', '448522015011534')));
    expect(good.status).toBe(200);
    expect(handleIncoming).toHaveBeenCalledTimes(1);

    // Addressed to the stale ENV id: must be rejected, not silently accepted.
    handleIncoming.mockClear();
    const stale = await POST(signed(textPayload('w4', '999999999')));
    expect(stale.status).toBe(200);
    expect(handleIncoming).not.toHaveBeenCalled();
  });
});

describe('idempotency gate', () => {
  it('skips processing when the message id was already claimed', async () => {
    claimInbound.mockResolvedValue(false); // duplicate delivery
    const res = await POST(signed(textPayload('dup')));
    expect(res.status).toBe(200);
    expect(handleIncoming).not.toHaveBeenCalled();
  });

  // REL-03. This test previously asserted `status === 200` on the failure path
  // and was titled "so Meta retry reprocesses" — which is exactly what a 200
  // prevents. Meta only redelivers a webhook it did NOT receive a 2xx for, so
  // acking a failure destroyed the message and made the releaseInbound call
  // above it meaningless. The bug was pinned by its own test; that is why it
  // survived. A dropped enquiry is the most expensive failure this system has.
  it('asks Meta to redeliver when processing throws, and releases the claim', async () => {
    handleIncoming.mockRejectedValueOnce(new Error('boom'));
    const res = await POST(signed(textPayload('err1')));
    expect(res.status).toBe(500);                      // non-2xx => Meta retries
    expect(releaseInbound).toHaveBeenCalledWith('err1'); // so the retry can re-run it
  });

  it('still acks 200 when every message succeeded', async () => {
    const res = await POST(signed(textPayload('ok1')));
    expect(res.status).toBe(200);
    expect(releaseInbound).not.toHaveBeenCalled();
  });

  it('keeps asking for redelivery while the failure persists', async () => {
    // Redis is unavailable under test, so noteInboundFailure returns 1 every
    // time and the retry budget is never exhausted. That is the deliberate
    // fail-open — "when in doubt, ask Meta to try again" — and it is asserted
    // here rather than papered over, because a drop costs a customer and a
    // duplicate costs one wasted engine call.
    handleIncoming.mockRejectedValue(new Error('permanent'));
    try {
      for (let i = 0; i < 3; i++) {
        const res = await POST(signed(textPayload(`perm${i}`)));
        expect(res.status).toBe(500);
      }
    } finally {
      handleIncoming.mockResolvedValue({});
    }
  });

  it('a failure in one message does not stop the others being processed', async () => {
    handleIncoming
      .mockRejectedValueOnce(new Error('boom'))
      .mockResolvedValueOnce({});
    const from = nextSender();
    const payload = {
      entry: [{ changes: [{ value: {
        contacts: [{ wa_id: from, profile: { name: 'Test' } }],
        messages: [
          { id: 'm1', from, type: 'text', text: { body: 'first' } },
          { id: 'm2', from, type: 'text', text: { body: 'second' } },
        ],
      } }] }],
    };
    const res = await POST(signed(payload));
    expect(handleIncoming).toHaveBeenCalledTimes(2); // the good one still ran
    expect(res.status).toBe(500);                    // and the bad one is retried
    expect(releaseInbound).toHaveBeenCalledWith('m1');
    expect(releaseInbound).not.toHaveBeenCalledWith('m2'); // its claim stands
  });
});

// ── REL-03 / approval mode: the value stored in ai_mode decides whether a
// customer can receive a message the owner never saw. Anything unrecognised
// must mean "ask first".
describe('ai_mode is resolved safely before it reaches the engine', () => {
  const modeArg = () => (handleIncoming.mock.calls[0] as unknown[])[2];

  it('passes SUPERVISED through', async () => {
    getSetting.mockImplementation(async (k: string) => (k === 'ai_mode' ? 'SUPERVISED' : undefined));
    await POST(signed(textPayload('mode1')));
    expect(modeArg()).toBe('SUPERVISED');
  });

  it('passes FULL_AUTO through', async () => {
    getSetting.mockImplementation(async (k: string) => (k === 'ai_mode' ? 'FULL_AUTO' : undefined));
    await POST(signed(textPayload('mode2')));
    expect(modeArg()).toBe('FULL_AUTO');
  });

  it.each(['AUTOPILOT', 'full_auto', 'Autopilot', 'FULL AUTO', '', true, 1, null, undefined])(
    'treats %p as approval mode, never as permission to send', async (stored) => {
      getSetting.mockImplementation(async (k: string) => (k === 'ai_mode' ? stored : undefined));
      await POST(signed(textPayload(`mode-${String(stored)}`)));
      expect(modeArg()).toBe('SUPERVISED');
    });
});
