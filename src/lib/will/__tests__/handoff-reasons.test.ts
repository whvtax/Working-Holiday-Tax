/**
 * Every handoff reason the codebase raises must produce the two sentences the
 * Decision Log is built from (Jo, 27 Aug):
 *
 *   The customer wrote "…" and because <because>, Will passed it to you.
 *   To stop this happening again: <prevent>
 *
 * What these pin:
 *   - every real reason string is recognised (an unrecognised one silently
 *     falls back to "Will had no approved answer", which would be a lie about
 *     a failed send or an unreadable file),
 *   - `because` is grammatical in that sentence: lower case, no full stop,
 *   - nothing is told to go and write a template when a template cannot fix it,
 *   - a genuinely unclassified question still points at the Library.
 *
 * The strings below are the reason text as the report groups it —
 * `reason.replace(/:.*$/, '').slice(0, 60)` — which is why they are truncated.
 */
import { explainHandoffReason, isTemplateShaped } from '@/lib/will/handoff-reasons';

// Every reason the codebase raises, as it reaches the card. (audit, 5 Sep) This
// list had gone stale and hid the drift it exists to catch; it is now the live
// strings, and audit3-core-4.test.ts reads them out of the source directly.
const REAL_REASONS: [string, string][] = [
  ['engine.ts', 'Policy Guard blocked reply'],
  ['scheduler.ts (autopilot)', 'Autopilot reply blocked before sending'],
  ['scheduler.ts (follow-up)', 'Follow-up blocked by Policy Guard'],
  ['actions (approval)', 'Draft became invalid before approval'],
  ['actions (stale)', 'Draft is stale'],
  ['service.ts (media)', 'Customer sent an attachment Will cannot read. Open the chat t'],
  ['service.ts (voice)', 'Customer sent a voice note. Open WhatsApp to listen and reply.'],
  ['service.ts (undecoded)', 'WhatsApp delivered an event with no readable text (type=unkno'],
  ['service.ts (identity)', 'Customer asked whether they are talking to a bot, needs a huma'],
  ['service.ts (loop)', 'The same message keeps arriving in this chat, so it is loopin'],
  ['service.ts (ceiling)', 'Customer sent 81 messages before paying — this conversation i'],
  ['service.ts (send)', "Will's reply was not delivered"],
  ['channel.ts (send)', 'WhatsApp send failed'],
  ['webhook (status)', 'WhatsApp did not deliver this message'],
  ['webhook (dead letter)', 'A WhatsApp message could not be processed after 3 attempts an'],
  ['scheduler.ts (auto-reply)', 'Will could not answer this chat automatically (boom). Please '],
  ['scheduler.ts (stuck send)', 'A reply may not have reached this customer — it got stuck whi'],
  ['scheduler.ts (medicare guard)', 'Medicare exemption message held by the Policy Guard'],
  ['scheduler.ts (medicare send)', 'The Medicare exemption message was not delivered'],
  ['scheduler.ts (review guard)', 'Review request held by the Policy Guard'],
  ['store-supabase.ts (job)', 'A scheduled follow up failed three times and has been given u'],
  ['service.ts (budget)', 'Daily AI limit reached, please reply to this customer manually'],
  ['engine.ts (transition)', 'Model proposed invalid transition PRICE_SENT -> LODGED; reply '],
  ['engine.ts (paid)', 'Model proposed PRICE_SENT -> PAID but the customer did not rep'],
  ['service.ts (payment mismatch)', 'Payment screenshot does not match'],
  ['service.ts (payment drafted)', 'Customer confirmed payment (a screenshot).  A "payment receive'],
  ['service.ts (payment, Will off)', 'They paid (a screenshot) and are moved to Paid, but Will is s'],
  ['service.ts (payment, send failed)', 'PAID, BUT THEY HAVE NOT BEEN TOLD. The payment was confirmed '],
  ['service.ts (payment auto)', 'Customer confirmed payment (a screenshot). Moved to Paid autom'],
  ['document-drop.ts', 'Paid customer sent 2 files. Nothing to answer, just collect th'],
  ['scheduler.ts (nightly)', 'Nightly consistency check found 2 issue(s)'],
];

describe('explainHandoffReason', () => {
  it.each(REAL_REASONS)('recognises the reason raised in %s', (_where, reason) => {
    const e = explainHandoffReason(reason);
    expect(e.kind).not.toBe('other');
    expect(e.label.length).toBeGreaterThan(0);
    expect(e.because.length).toBeGreaterThan(0);
    expect(e.prevent.length).toBeGreaterThan(0);
  });

  // The clause is dropped into the middle of a sentence, so a stray capital or
  // a trailing full stop shows up on screen as broken English. A proper noun is
  // the one legitimate capital — "WhatsApp itself refused…" is correct.
  const PROPER_NOUNS = /^(Will|WhatsApp|Meta|Autopilot)\b/;
  it.each(REAL_REASONS)('gives a because-clause that reads mid-sentence for %s', (_where, reason) => {
    const { because } = explainHandoffReason(reason);
    if (!PROPER_NOUNS.test(because)) {
      expect(because[0]).toBe(because[0].toLowerCase());
    }
    expect(because.endsWith('.')).toBe(false);
  });

  it('does not tell you to write a template for something a template cannot fix', () => {
    const notTemplateShaped = [
      'Customer sent an attachment Will cannot read. Open the chat t',
      'Customer sent a voice note. Open WhatsApp to listen and reply.',
      'Policy Guard blocked reply',
      'WhatsApp send failed',
      "Will's reply was not delivered",
      'WhatsApp did not deliver this message',
      'Customer confirmed payment (a screenshot).',
      'Customer asked whether they are talking to a bot, needs a huma',
    ];
    for (const r of notTemplateShaped) {
      expect(isTemplateShaped(r)).toBe(false);
      expect(explainHandoffReason(r).prevent.toLowerCase()).not.toMatch(/add (an? )?(approved )?(answer|template) to the library/);
    }
  });

  it('still points an unrecognised, recurring question at the Library', () => {
    const e = explainHandoffReason('Customer asked something nobody has classified yet');
    expect(e.kind).toBe('other');
    expect(e.prevent.toLowerCase()).toContain('library');
  });

  it('never throws on empty or odd input', () => {
    expect(() => explainHandoffReason('')).not.toThrow();
    expect(explainHandoffReason('').label.length).toBeGreaterThan(0);
  });
});
