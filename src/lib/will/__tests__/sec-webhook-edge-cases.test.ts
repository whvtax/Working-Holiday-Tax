/**
 * Security regression tests (sec-will-cron-ir): edge cases of the Meta webhook
 * signature check and the cron auth that the existing suites do not pin.
 * Synthetic payloads only. Store and engine are mocked, no network.
 */
import { createHmac } from 'crypto';

const handleIncoming = jest.fn().mockResolvedValue({});
jest.mock('@/lib/will/service', () => ({ handleIncoming: (...a: unknown[]) => handleIncoming(...a) }));

const claimInbound = jest.fn().mockResolvedValue(true);
const releaseInbound = jest.fn().mockResolvedValue(undefined);
const audit = jest.fn().mockResolvedValue(undefined);
const getSetting = jest.fn().mockImplementation(async (k: string) => (k === 'ai_mode' ? 'SUPERVISED' : undefined));
const isBlockedContact = jest.fn().mockResolvedValue(false);
jest.mock('@/lib/will/store', () => ({
  getStore: () => ({ claimInbound, releaseInbound, audit, getSetting, isBlockedContact }),
}));

import { GET, POST } from '@/app/api/will/webhook/route';

const SECRET = 'edge-app-secret';
const body = JSON.stringify({
  entry: [{ changes: [{ value: {
    contacts: [{ wa_id: '61400009999', profile: { name: 'T' } }],
    messages: [{ id: 'edge-1', from: '61400009999', type: 'text', text: { body: 'hello' } }],
  } }] }],
});
const goodSig = 'sha256=' + createHmac('sha256', SECRET).update(body, 'utf8').digest('hex');
const post = (headers: Record<string, string>, raw = body) =>
  POST(new Request('http://x/api/will/webhook', { method: 'POST', headers, body: raw }));

beforeEach(() => {
  jest.clearAllMocks();
  claimInbound.mockResolvedValue(true);
  process.env.META_APP_SECRET = SECRET;
  process.env.META_VERIFY_TOKEN = 'edge-verify';
});

describe('webhook signature edge cases', () => {
  it('rejects a request with no signature header', async () => {
    expect((await post({})).status).toBe(401);
    expect(handleIncoming).not.toHaveBeenCalled();
  });
  it('rejects a sha1= prefixed signature even when the digest is of the right body', async () => {
    const sha1 = createHmac('sha1', SECRET).update(body, 'utf8').digest('hex');
    expect((await post({ 'x-hub-signature-256': `sha1=${sha1}` })).status).toBe(401);
  });
  it('rejects a non-hex or truncated signature without throwing', async () => {
    expect((await post({ 'x-hub-signature-256': 'sha256=zzzz' })).status).toBe(401);
    expect((await post({ 'x-hub-signature-256': goodSig.slice(0, -2) })).status).toBe(401);
    expect((await post({ 'x-hub-signature-256': 'sha256=' })).status).toBe(401);
  });
  it('rejects a signature made with a different secret', async () => {
    const other = 'sha256=' + createHmac('sha256', 'other').update(body, 'utf8').digest('hex');
    expect((await post({ 'x-hub-signature-256': other })).status).toBe(401);
    expect(handleIncoming).not.toHaveBeenCalled();
  });
  it('accepts the correct signature (control)', async () => {
    expect((await post({ 'x-hub-signature-256': goodSig })).status).toBe(200);
  });
  it('rejects an oversized body before any processing', async () => {
    const big = 'x'.repeat(300 * 1024);
    const res = await post({ 'x-hub-signature-256': goodSig }, big);
    expect(res.status).toBe(413);
    expect(handleIncoming).not.toHaveBeenCalled();
  });
  it('a replayed identical signed delivery is processed once (claim gate)', async () => {
    claimInbound.mockResolvedValueOnce(true).mockResolvedValueOnce(false);
    await post({ 'x-hub-signature-256': goodSig });
    await post({ 'x-hub-signature-256': goodSig });
    expect(handleIncoming).toHaveBeenCalledTimes(1);
  });
  it('GET handshake fails closed when no verify token is configured', async () => {
    delete process.env.META_VERIFY_TOKEN;
    delete process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN;
    const res = await GET(new Request('http://x/api/will/webhook?hub.mode=subscribe&hub.verify_token=&hub.challenge=C'));
    expect(res.status).toBe(403);
    const res2 = await GET(new Request('http://x/api/will/webhook?hub.mode=subscribe&hub.challenge=C'));
    expect(res2.status).toBe(403);
  });
});
