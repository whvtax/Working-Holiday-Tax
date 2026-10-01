/**
 * 24 Sep, 22:03: an inbound event with no `from` reached the customers table
 * as a null wa_id, failed three times and raised a "something went wrong"
 * task for nobody. A message with no sender has nobody to answer: it is
 * counted as unparseable and dropped at the webhook.
 */
import { createHmac } from 'crypto';

const handleIncoming = jest.fn().mockResolvedValue(undefined);
const audit = jest.fn().mockResolvedValue(undefined);
jest.mock('@/lib/will/service', () => ({
  handleIncoming: (...a: unknown[]) => handleIncoming(...a),
  handleInboundNote: jest.fn().mockResolvedValue(undefined),
  handlePaymentProofMedia: jest.fn().mockResolvedValue(null),
  applyMessageEdit: jest.fn().mockResolvedValue(undefined),
}));
jest.mock('@/lib/will/store', () => ({
  getStore: () => ({
    audit,
    getSetting: jest.fn().mockResolvedValue(undefined),
    claimInbound: jest.fn().mockResolvedValue(true),
    isBlockedContact: jest.fn().mockResolvedValue(false),
    getCustomerByWaId: jest.fn().mockResolvedValue(null),
    markDeliveryFailedByProviderId: jest.fn(),
    addTask: jest.fn(),
  }),
}));

import { POST } from '@/app/api/will/webhook/route';

const SECRET = 'test-secret';
function signed(payload: unknown): Request {
  const raw = JSON.stringify(payload);
  const sig = 'sha256=' + createHmac('sha256', SECRET).update(raw, 'utf8').digest('hex');
  return new Request('http://x/api/will/webhook', { method: 'POST', headers: { 'x-hub-signature-256': sig, 'content-type': 'application/json' }, body: raw });
}

beforeEach(() => { jest.clearAllMocks(); process.env.META_APP_SECRET = SECRET; });

it('an event with no sender is dropped and counted, never handed to the engine', async () => {
  const payload = { object: 'whatsapp_business_account', entry: [{ changes: [{ value: { messaging_product: 'whatsapp', messages: [
    { id: 'wamid.nosender', timestamp: String(Math.floor(Date.now() / 1000)), type: 'text', text: { body: 'Hi, I would like to ask about my Australian tax return.' } },
  ] } }] }] };
  const res = await POST(signed(payload));
  expect(res.status).toBe(200);
  expect(handleIncoming).not.toHaveBeenCalled();
  expect(audit).toHaveBeenCalledWith('channel', 'inbound_unparseable', expect.objectContaining({ count: 1 }));
});
