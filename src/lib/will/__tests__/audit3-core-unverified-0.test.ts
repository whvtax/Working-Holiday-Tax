/**
 * Pins the fix for: "A phone reply that is a photo, PDF or voice note does
 * not close the task or discard the pending draft" (audit3, unverified[0]).
 *
 * extractEchoes() used to keep only `type === 'text'` coexistence echoes, so
 * an owner reply sent as a photo/PDF/voice note from the WhatsApp app never
 * became an echo, and the POST handler never ran afterHumanReply / discarded
 * the pending draft for it. It must now also surface non-text echoes (with a
 * placeholder body), while still ignoring `revoke` echoes and malformed rows.
 */
import { extractEchoes } from '@/app/api/will/webhook/route';

function payloadWithEchoes(message_echoes: unknown[]) {
  return {
    entry: [{ changes: [{ field: 'smb_message_echoes', value: { message_echoes } }] }],
  };
}

describe('extractEchoes: non-text coexistence echoes', () => {
  it('mirrors a photo echo with a placeholder body instead of dropping it', () => {
    const { echoes } = extractEchoes(payloadWithEchoes([
      { type: 'image', to: '61400000001', id: 'wamid.IMG1', image: { id: 'media1' } },
    ]));
    expect(echoes).toHaveLength(1);
    expect(echoes[0]).toMatchObject({ to: '61400000001', id: 'wamid.IMG1' });
    expect(echoes[0].body).toMatch(/photo/i);
  });

  it('mirrors a document echo and keeps the filename', () => {
    const { echoes } = extractEchoes(payloadWithEchoes([
      { type: 'document', to: '61400000002', id: 'wamid.DOC1', document: { id: 'media2', filename: 'estimate.pdf' } },
    ]));
    expect(echoes).toHaveLength(1);
    expect(echoes[0].body).toContain('estimate.pdf');
  });

  it('mirrors a voice note echo', () => {
    const { echoes } = extractEchoes(payloadWithEchoes([
      { type: 'voice', to: '61400000003', id: 'wamid.VOI1', voice: { id: 'media3' } },
    ]));
    expect(echoes).toHaveLength(1);
    expect(echoes[0].body).toMatch(/voice/i);
  });

  it('still keeps plain text echoes working as before', () => {
    const { echoes } = extractEchoes(payloadWithEchoes([
      { type: 'text', to: '61400000004', id: 'wamid.TXT1', text: { body: 'sorted, thanks' } },
    ]));
    expect(echoes).toEqual([{ to: '61400000004', id: 'wamid.TXT1', body: 'sorted, thanks' }]);
  });

  it('still routes revokes separately and never as an echo', () => {
    const { echoes, revokes } = extractEchoes(payloadWithEchoes([
      { type: 'revoke', revoke: { original_message_id: 'wamid.OLD1' } },
    ]));
    expect(echoes).toHaveLength(0);
    expect(revokes).toEqual(['wamid.OLD1']);
  });

  it('drops a media echo with no `to` or `id` rather than throwing', () => {
    const { echoes } = extractEchoes(payloadWithEchoes([
      { type: 'image', image: { id: 'media4' } },
    ]));
    expect(echoes).toHaveLength(0);
  });
});

describe('extractEchoes: reaction echoes carry structured data (audit, 14 Sep)', () => {
  // A heart Jo taps ON THE PHONE, on a customer's message, used to fall into
  // the generic non-text branch above and keep only placeholderFor's plain
  // string ("❤️  reacted to your message"). Dashboard.tsx paints a reaction
  // as a small badge on its TARGET bubble, but it can only do that from the
  // structured { emoji, to } shape — the same shape a customer's own reaction
  // already carries via the main `messages` field. Without it, an owner's
  // phone reaction always rendered as a standalone floating line, never
  // attached to anything, exactly what the structured path exists to avoid.
  it('carries emoji and the target message id, not just a placeholder body', () => {
    const { echoes } = extractEchoes(payloadWithEchoes([
      { type: 'reaction', to: '61400000005', id: 'wamid.REACT1', reaction: { emoji: '❤️', message_id: 'wamid.TARGET1' } },
    ]));
    expect(echoes).toHaveLength(1);
    expect(echoes[0]).toMatchObject({ to: '61400000005', id: 'wamid.REACT1' });
    expect(echoes[0].body).toBe('❤️  reacted to your message');
    expect(echoes[0].reaction).toEqual({ emoji: '❤️', to: 'wamid.TARGET1' });
  });

  it('carries a removed reaction (no emoji) the same way', () => {
    const { echoes } = extractEchoes(payloadWithEchoes([
      { type: 'reaction', to: '61400000006', id: 'wamid.REACT2', reaction: { message_id: 'wamid.TARGET2' } },
    ]));
    expect(echoes[0].body).toBe('removed their reaction');
    expect(echoes[0].reaction).toEqual({ emoji: null, to: 'wamid.TARGET2' });
  });

  it('drops a reaction echo with no `to` or `id` rather than throwing', () => {
    const { echoes } = extractEchoes(payloadWithEchoes([
      { type: 'reaction', reaction: { emoji: '👍', message_id: 'wamid.TARGET3' } },
    ]));
    expect(echoes).toHaveLength(0);
  });
});
