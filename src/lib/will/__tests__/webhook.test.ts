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

const textPayload = (id: string, phoneId?: string) => ({
  entry: [{ changes: [{ value: {
    ...(phoneId ? { metadata: { phone_number_id: phoneId } } : {}),
    contacts: [{ wa_id: '61400000000', profile: { name: 'Test' } }],
    messages: [{ id, from: '61400000000', type: 'text', text: { body: 'hello' } }],
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

  it('releases the claim if processing throws (so Meta retry reprocesses)', async () => {
    handleIncoming.mockRejectedValueOnce(new Error('boom'));
    const res = await POST(signed(textPayload('err1')));
    expect(res.status).toBe(200); // still ack
    expect(releaseInbound).toHaveBeenCalledWith('err1');
  });
});
