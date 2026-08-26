/**
 * Photos, documents and reactions.
 *
 * Attachments were the single biggest source of escalations: the media id Meta
 * sends was thrown away, so a payment screenshot became the text "📷 [Photo]"
 * and could only be read by opening WhatsApp on a phone. Reactions were worse —
 * a thumbs up on one of our messages opened a "Will cannot read this" task.
 *
 * These tests pin both behaviours at the webhook boundary: the media descriptor
 * reaches the store, and a reaction is recorded without raising a task.
 */
import { createHmac } from 'crypto';

const handleIncoming = jest.fn().mockResolvedValue({});
const handleInboundNote = jest.fn().mockResolvedValue({});
// Payment-proof auto-detection (a separate feature, tested on its own in
// payment-proof.test.ts): default to "not eligible/not verified" here so
// every image/document in these tests falls through to the ordinary
// handleInboundNote path exactly as before that feature existed.
const handlePaymentProofMedia = jest.fn().mockResolvedValue(null);
jest.mock('@/lib/will/service', () => ({
  handleIncoming: (...a: unknown[]) => handleIncoming(...a),
  handleInboundNote: (...a: unknown[]) => handleInboundNote(...a),
  handlePaymentProofMedia: (...a: unknown[]) => handlePaymentProofMedia(...a),
}));

const claimInbound = jest.fn().mockResolvedValue(true);
const audit = jest.fn().mockResolvedValue(undefined);
const getSetting = jest.fn().mockImplementation(async (key: string) =>
  (key === 'ai_mode' ? 'SUPERVISED' : undefined));
jest.mock('@/lib/will/store', () => ({
  getStore: () => ({
    claimInbound, releaseInbound: jest.fn(), audit, getSetting,
    isBlockedContact: jest.fn().mockResolvedValue(false),
  }),
}));

import { POST } from '@/app/api/will/webhook/route';

const SECRET = 'test-app-secret';
let seq = 0;
const nextSender = () => `6140001${String(1000 + seq++)}`;

function post(messages: unknown[]) {
  const from = nextSender();
  const raw = JSON.stringify({
    entry: [{ changes: [{ value: {
      contacts: [{ wa_id: from, profile: { name: 'Test' } }],
      messages: (messages as Record<string, unknown>[]).map((m) => ({ from, ...m })),
    } }] }],
  });
  const sig = 'sha256=' + createHmac('sha256', SECRET).update(raw, 'utf8').digest('hex');
  return POST(new Request('http://x/api/will/webhook', {
    method: 'POST',
    headers: { 'x-hub-signature-256': sig, 'content-type': 'application/json' },
    body: raw,
  }));
}

const metaArg = () => handleInboundNote.mock.calls[0][2] as {
  media?: { id: string; kind: string; mime?: string; filename?: string; caption?: string };
  reaction?: { emoji: string | null; to?: string };
};

beforeAll(() => { process.env.META_APP_SECRET = SECRET; });
beforeEach(() => { handleInboundNote.mockClear(); handlePaymentProofMedia.mockClear(); claimInbound.mockClear(); });

describe('attachments reach the chat', () => {
  it('carries a photo id, mime and caption through to the store', async () => {
    await post([{
      id: 'wamid.img1', type: 'image',
      image: { id: '9981', mime_type: 'image/jpeg', caption: 'my payment' },
    }]);
    expect(handleInboundNote).toHaveBeenCalledTimes(1);
    expect(metaArg().media).toEqual({
      id: '9981', kind: 'image', mime: 'image/jpeg', filename: undefined, caption: 'my payment',
    });
  });

  it('carries a document filename through, so the link is named in the chat', async () => {
    await post([{
      id: 'wamid.doc1', type: 'document',
      document: { id: '7742', mime_type: 'application/pdf', filename: 'payslip.pdf' },
    }]);
    expect(metaArg().media).toMatchObject({ id: '7742', kind: 'document', filename: 'payslip.pdf' });
  });

  it('still stores the readable placeholder alongside the attachment', async () => {
    await post([{ id: 'wamid.img2', type: 'image', image: { id: '1', mime_type: 'image/jpeg' } }]);
    // The body is what a transcript and a 30-day-expired attachment fall back to.
    expect(handleInboundNote.mock.calls[0][1]).toContain('[Photo]');
  });

  it('leaves a message with no media id alone (no descriptor invented)', async () => {
    await post([{ id: 'wamid.unsup1', type: 'unsupported' }]);
    expect(metaArg().media).toBeUndefined();
  });
});

describe('reactions', () => {
  it('records the emoji rather than an unreadable placeholder', async () => {
    await post([{
      id: 'wamid.react1', type: 'reaction',
      reaction: { message_id: 'wamid.ours', emoji: '❤️' },
    }]);
    expect(metaArg().reaction).toEqual({ emoji: '❤️', to: 'wamid.ours' });
    expect(handleInboundNote.mock.calls[0][1]).toBe('❤️  reacted to your message');
  });

  it('handles a removed reaction (Meta sends the event with no emoji)', async () => {
    await post([{ id: 'wamid.react2', type: 'reaction', reaction: { message_id: 'wamid.ours' } }]);
    expect(metaArg().reaction).toEqual({ emoji: null, to: 'wamid.ours' });
    expect(handleInboundNote.mock.calls[0][1]).toBe('removed their reaction');
  });

  it('does not treat a reaction as text, so the model is never called on it', async () => {
    await post([{ id: 'wamid.react3', type: 'reaction', reaction: { emoji: '👍' } }]);
    expect(handleIncoming).not.toHaveBeenCalled();
  });
});
