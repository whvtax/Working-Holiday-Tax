/**
 * 25 Nov 2026: Coexistence `history` webhooks must never reach the live path.
 * Meta sends the media of history messages as field 'history' with a plain
 * top-level `messages` array, which looks exactly like a live message.
 */
import { createHmac } from 'crypto';

const handleIncoming = jest.fn().mockResolvedValue(undefined);
const handleInboundNote = jest.fn().mockResolvedValue(undefined);
const handlePaymentProofMedia = jest.fn().mockResolvedValue(null);
jest.mock('@/lib/will/service', () => ({
  handleIncoming: (...a: unknown[]) => handleIncoming(...a),
  handleInboundNote: (...a: unknown[]) => handleInboundNote(...a),
  handlePaymentProofMedia: (...a: unknown[]) => handlePaymentProofMedia(...a),
  applyMessageEdit: jest.fn().mockResolvedValue(undefined),
}));
const saveHistoryInbox = jest.fn().mockResolvedValue('inbox-1');
const markHistoryInbox = jest.fn().mockResolvedValue(undefined);
const audit = jest.fn().mockResolvedValue(undefined);
jest.mock('@/lib/will/store', () => ({
  getStore: () => ({
    audit: (...a: unknown[]) => audit(...a),
    getSetting: jest.fn(async (k: string) => (k === 'wa_phone_number_id' ? 'PHONE_ID' : k === 'wa_access_token' ? 'tok' : undefined)),
    claimInbound: jest.fn().mockResolvedValue(true),
    isBlockedContact: jest.fn().mockResolvedValue(false),
    getCustomerByWaId: jest.fn().mockResolvedValue(null),
    markDeliveryFailedByProviderId: jest.fn(),
    addTask: jest.fn(),
    saveHistoryInbox: (...a: unknown[]) => saveHistoryInbox(...a),
    markHistoryInbox: (...a: unknown[]) => markHistoryInbox(...a),
  }),
}));
jest.mock('@/lib/rate-limit', () => ({ isRateLimited: jest.fn().mockResolvedValue(false), getRedis: jest.fn().mockResolvedValue(null) }));

import { POST } from '@/app/api/will/webhook/route';

const SECRET = 'test-secret';
function signed(payload: unknown): Request {
  const raw = JSON.stringify(payload);
  const sig = 'sha256=' + createHmac('sha256', SECRET).update(raw, 'utf8').digest('hex');
  return new Request('http://x/api/will/webhook', { method: 'POST', headers: { 'x-hub-signature-256': sig, 'content-type': 'application/json' }, body: raw });
}
const now = () => String(Math.floor(Date.now() / 1000));
const historyMedia = { object: 'whatsapp_business_account', entry: [{ id: 'WABA', changes: [{ field: 'history', value: {
  messaging_product: 'whatsapp', metadata: { display_phone_number: '61424513998', phone_number_id: 'PHONE_ID' },
  messages: [{ from: '61400000001', id: 'wamid.hist.media', timestamp: now(), type: 'image', image: { id: 'MEDIA', mime_type: 'image/jpeg', caption: 'receipt' } }],
} }] }] };
const historyChunk = { object: 'whatsapp_business_account', entry: [{ id: 'WABA', changes: [{ field: 'history', value: {
  messaging_product: 'whatsapp', metadata: { display_phone_number: '61424513998', phone_number_id: 'PHONE_ID' },
  history: [{ metadata: { phase: 0, chunk_order: 1, progress: 100 }, threads: [{ id: '61400000001', messages: [{ from: '61400000001', id: 'wamid.hist.1', timestamp: now(), type: 'text', text: { body: 'paid' } }] }] }],
} }] }] };
const live = { object: 'whatsapp_business_account', entry: [{ changes: [{ field: 'messages', value: {
  messaging_product: 'whatsapp', metadata: { phone_number_id: 'PHONE_ID' },
  messages: [{ from: '61400000002', id: 'wamid.live.1', timestamp: now(), type: 'text', text: { body: 'Hi, can you do my tax return?' } }],
} }] }] };

const env = process.env;
beforeEach(() => {
  jest.clearAllMocks();
  process.env = { ...env, META_APP_SECRET: SECRET, WILL_HISTORY_IMPORT_ENABLED: 'true' };
  delete process.env.WILL_HISTORY_IMPORT_FROM_TS;
  delete process.env.WILL_MIN_MESSAGE_TS;
});
afterAll(() => { process.env = env; });

it('a history media webhook (field history, top-level messages) runs no live automation', async () => {
  const res = await POST(signed(historyMedia));
  expect(res.status).toBe(200);
  expect(handleIncoming).not.toHaveBeenCalled();
  expect(handleInboundNote).not.toHaveBeenCalled();
  expect(handlePaymentProofMedia).not.toHaveBeenCalled();
  expect(saveHistoryInbox).toHaveBeenCalledTimes(1);
});

it('a history chunk is backed up raw before anything else and runs no automation', async () => {
  const res = await POST(signed(historyChunk));
  expect(res.status).toBe(200);
  expect(saveHistoryInbox).toHaveBeenCalledWith(expect.objectContaining({ field: 'history', phase: 0, chunkOrder: 1, progress: 100 }));
  expect(handleIncoming).not.toHaveBeenCalled();
  expect(handleInboundNote).not.toHaveBeenCalled();
  // No window set: nothing imported, so the backup row stays unprocessed for replay.
  expect(markHistoryInbox).not.toHaveBeenCalled();
  expect(audit).toHaveBeenCalledWith('channel', 'history_import', expect.objectContaining({ windowSet: false }));
});

it('if the backup cannot be written, Meta is asked to redeliver (500)', async () => {
  saveHistoryInbox.mockRejectedValueOnce(new Error('relation "will_history_inbox" does not exist'));
  const res = await POST(signed(historyChunk));
  expect(res.status).toBe(500);
  expect(audit).toHaveBeenCalledWith('channel', 'history_backup_failed', expect.anything());
});

it('live messages keep working exactly as before, separately from history', async () => {
  const res = await POST(signed(live));
  expect(res.status).toBe(200);
  expect(handleIncoming).toHaveBeenCalledTimes(1);
  expect(saveHistoryInbox).not.toHaveBeenCalled();
});

it('a large signed history chunk (over the 256 KB live cap) is accepted, a large live body is not', async () => {
  const bigThread = { id: '61400000001', messages: Array.from({ length: 3000 }, (_, i) => ({ from: '61400000001', id: `wamid.big.${i}`, timestamp: '1700000000', type: 'text', text: { body: 'x'.repeat(100) } })) };
  const big = JSON.parse(JSON.stringify(historyChunk));
  big.entry[0].changes[0].value.history[0].threads = [bigThread];
  expect(JSON.stringify(big).length).toBeGreaterThan(256 * 1024);
  expect((await POST(signed(big))).status).toBe(200);
  expect(saveHistoryInbox).toHaveBeenCalledTimes(1);
  const bigLive = JSON.parse(JSON.stringify(live));
  bigLive.entry[0].changes[0].value.messages[0].text.body = 'x'.repeat(300 * 1024);
  expect((await POST(signed(bigLive))).status).toBe(413);
});

it('switched off (WILL_HISTORY_IMPORT_ENABLED not true): no backup, no import, live path unaffected', async () => {
  process.env.WILL_HISTORY_IMPORT_ENABLED = 'false';
  expect((await POST(signed(historyChunk))).status).toBe(200);
  expect((await POST(signed(historyMedia))).status).toBe(200);
  expect(saveHistoryInbox).not.toHaveBeenCalled();
  expect(handleIncoming).not.toHaveBeenCalled();
  expect(handleInboundNote).not.toHaveBeenCalled();
  expect(audit).toHaveBeenCalledWith('channel', 'history_ignored_disabled', expect.anything());
  expect((await POST(signed(live))).status).toBe(200);
  expect(handleIncoming).toHaveBeenCalledTimes(1);
});
