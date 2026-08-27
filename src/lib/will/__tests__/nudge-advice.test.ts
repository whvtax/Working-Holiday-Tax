/**
 * Conversation-aware follow-up advice — the guards, not the model.
 *
 * The model's job is to have an opinion. This file pins what happens to that
 * opinion afterwards, because that is the part that decides what a real person
 * receives:
 *
 *   - a recommendation may only ever be an approved message from the
 *     customer's OWN flow — never invented, never borrowed from another stage,
 *   - a recommendation the model is not confident about does not change
 *     anything,
 *   - the transcript the model reads contains only messages the customer
 *     actually received.
 *
 * Every failure path here collapses to the same safe outcome: keep what the
 * cadence queued, which is exactly the behaviour that existed before any of
 * this was written.
 */
import {
  candidatesFor,
  resolveRecommendation,
  buildTranscript,
  MIN_CONFIDENCE_TO_SWAP,
} from '@/lib/will/nudge-advice';
import type { NudgeAdvice, NudgeCandidate } from '@/lib/will/claude';
import type { TemplateRow } from '@/lib/will/store';

// Only the four fields candidatesFor() reads. The rest of TemplateRow is
// irrelevant here and spelling it out would make these fixtures a maintenance
// job every time the row gains a column.
const tpl = (key: string, title: string, body = `body of ${key}`): TemplateRow =>
  ({ key, title, body, lang: 'en' } as unknown as TemplateRow);

const LIBRARY: TemplateRow[] = [
  tpl('fu_pre_24h', 'Pre-payment · 24h'),
  tpl('fu_pre_3d', 'Pre-payment · 3d'),
  tpl('fu_pre_7d', 'Pre-payment · 7d'),
  tpl('fu_form_6h', 'Form · 6h'),
  tpl('fu_sig_24h', 'Signature · 24h'),
];

const advice = (over: Partial<NudgeAdvice> = {}): NudgeAdvice => ({
  read: 'They asked about their visa and got a price instead.',
  why: 'This one answers the question they actually asked.',
  draft: null,
  confidence: 0.9,
  recommendedKey: 'fu_pre_3d',
  ...over,
});

const CANDIDATES: NudgeCandidate[] = candidatesFor('prePayment', LIBRARY);

describe('candidatesFor', () => {
  it('offers only the messages belonging to that flow', () => {
    expect(CANDIDATES.map((c) => c.key)).toEqual(['fu_pre_24h', 'fu_pre_3d', 'fu_pre_7d']);
  });

  it('never offers another stage\'s message', () => {
    // A "just sign and you're done" nudge to somebody who has not paid yet is
    // approved, well written, and completely wrong for them. The flow is what
    // guarantees the recommendation is at least about the right thing.
    const keys = candidatesFor('form', LIBRARY).map((c) => c.key);
    expect(keys).toEqual(['fu_form_6h']);
    expect(keys).not.toContain('fu_pre_24h');
  });

  it('skips a Library entry that exists but has no text', () => {
    const withBlank = [tpl('fu_pre_24h', 'Pre-payment · 24h', '   '), tpl('fu_pre_3d', 'Pre-payment · 3d')];
    expect(candidatesFor('prePayment', withBlank).map((c) => c.key)).toEqual(['fu_pre_3d']);
  });
});

describe('resolveRecommendation', () => {
  it('swaps when the model confidently prefers a different approved message', () => {
    const r = resolveRecommendation(advice(), 'fu_pre_24h', CANDIDATES);
    expect(r.key).toBe('fu_pre_3d');
    expect(r.changesQueued).toBe(true);
  });

  it('keeps the queued message when the model agrees with it', () => {
    // Agreeing with the cadence is the normal answer, not a failure.
    const r = resolveRecommendation(advice({ recommendedKey: 'fu_pre_24h' }), 'fu_pre_24h', CANDIDATES);
    expect(r.key).toBe('fu_pre_24h');
    expect(r.changesQueued).toBe(false);
    expect(r.candidate?.key).toBe('fu_pre_24h');
  });

  it('does NOT swap on low confidence, however good the reasoning sounds', () => {
    const r = resolveRecommendation(
      advice({ confidence: MIN_CONFIDENCE_TO_SWAP - 0.01 }),
      'fu_pre_24h',
      CANDIDATES,
    );
    expect(r.key).toBe('fu_pre_24h');
    expect(r.changesQueued).toBe(false);
  });

  it('discards a key that is not in the Library at all', () => {
    // The model is handed a candidate list and told not to leave it. This is
    // the check that does not rely on it having listened.
    const r = resolveRecommendation(advice({ recommendedKey: 'fu_invented_by_the_model' }), 'fu_pre_24h', CANDIDATES);
    expect(r.key).toBe('fu_pre_24h');
    expect(r.candidate).toBeNull();
    expect(r.changesQueued).toBe(false);
  });

  it('discards a real key that belongs to a different flow', () => {
    const r = resolveRecommendation(advice({ recommendedKey: 'fu_sig_24h' }), 'fu_pre_24h', CANDIDATES);
    expect(r.key).toBe('fu_pre_24h');
    expect(r.changesQueued).toBe(false);
  });

  it('discards a missing recommendation', () => {
    const r = resolveRecommendation(advice({ recommendedKey: null }), 'fu_pre_24h', CANDIDATES);
    expect(r.key).toBe('fu_pre_24h');
    expect(r.changesQueued).toBe(false);
  });
});

describe('buildTranscript', () => {
  const msg = (over: Record<string, unknown>) => ({
    status: 'SENT', direction: 'OUT', author: 'AI', body: 'hello',
    createdAt: '2026-08-01T00:00:00.000Z', meta: null, ...over,
  }) as Parameters<typeof buildTranscript>[0][number];

  it('includes only messages the customer actually received', () => {
    // A held draft, a guard-blocked reply and a failed send were all invisible
    // to the customer. Feeding them in would have the model explain someone's
    // silence by a message they never got.
    const out = buildTranscript([
      msg({ body: 'really sent', status: 'SENT' }),
      msg({ body: 'never approved', status: 'PENDING_APPROVAL' }),
      msg({ body: 'guard stopped this', status: 'BLOCKED' }),
      msg({ body: 'meta rejected this', status: 'FAILED' }),
      msg({ body: 'still queued', status: 'QUEUED' }),
    ]);
    expect(out).toContain('really sent');
    expect(out).not.toContain('never approved');
    expect(out).not.toContain('guard stopped this');
    expect(out).not.toContain('meta rejected this');
    expect(out).not.toContain('still queued');
  });

  it('reads oldest first, whatever order the store returned', () => {
    const out = buildTranscript([
      msg({ body: 'second', createdAt: '2026-08-02T00:00:00.000Z' }),
      msg({ body: 'first', createdAt: '2026-08-01T00:00:00.000Z' }),
    ]);
    expect(out.indexOf('first')).toBeLessThan(out.indexOf('second'));
  });

  it('labels who spoke', () => {
    const out = buildTranscript([
      msg({ body: 'what about my visa?', direction: 'IN', author: 'CUSTOMER' }),
      msg({ body: 'here is the price', direction: 'OUT', author: 'AI' }),
    ]);
    expect(out).toContain('Customer: what about my visa?');
    expect(out).toContain('Will: here is the price');
  });

  it('redacts long numbers and emails before they reach the model', () => {
    const out = buildTranscript([msg({ body: 'my TFN is 123456789 and email me at a@b.com' })]);
    expect(out).not.toContain('123456789');
    expect(out).not.toContain('a@b.com');
  });
});
