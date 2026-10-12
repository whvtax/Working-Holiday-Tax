/**
 * Full audit, 11 Oct 2026, decision 1: no customer message stays unanswered.
 *
 *  1. A paying customer never gets a "silent" decision: it becomes a task
 *     (and the holding line follows via HANDOFF_ACK). A bare "thanks" keeps
 *     its silence; an attachment-only burst too.
 *  2. The holding line names a real horizon ("usually within one business
 *     day") and invites the nudge; "shortly" is gone.
 *  3. After the holding line, HANDOFF_BUMP fires at 24h (bump, task URGENT)
 *     and 48h (apology), only while the task is still open and unanswered.
 *  4. With the kill switch on, the holding line still goes out from ingest,
 *     once per 12 hours, and a task opens.
 *  5. resolve_task refuses to close a customer's task when nothing was sent
 *     since it opened, unless noReplyNeeded is explicit.
 */
import { paidNeverSilent } from '@/lib/will/service';
import { HANDOFF_HOLDING_MSG, handoffBumpMessage, handoffBumpTemplateKey, HANDOFF_BUMP_MSG, HANDOFF_APOLOGY_MSG } from '@/lib/will/i18n';
import { APPROVED } from '@/lib/will/approved-messages';
import { seedTemplates } from '@/lib/will/seed';
import { readFileSync } from 'fs';
import { join } from 'path';

const base = { mode: 'FULL_AUTO' as const, paid: true, state: 'FORM_PENDING' as const, optedOut: false, isLegacy: false, aiPaused: false, alreadyStored: false };

describe('1. a paying customer is never left in silence', () => {
  it('converts a silent outcome for a paid customer into a task', () => {
    expect(paidNeverSilent({ ...base, outcomeKind: 'silent' })).toBe(true);
  });
  it('post-payment stage counts even when the paid flag drifted', () => {
    expect(paidNeverSilent({ ...base, paid: false, state: 'SIGNED', outcomeKind: 'silent' })).toBe(true);
  });
  it('a courtesy close ("thanks") keeps its silence', () => {
    expect(paidNeverSilent({ ...base, outcomeKind: 'silent', reviewNote: 'courtesy close: nothing to add, so nothing sent' })).toBe(false);
  });
  it('"Thankyou! X" after "your return is ready" gets no holding line, whatever the model said (Ivy, 11 Oct)', () => {
    expect(paidNeverSilent({ ...base, state: 'LODGED', outcomeKind: 'silent', text: 'Thankyou! X' })).toBe(false);
    expect(paidNeverSilent({ ...base, state: 'LODGED', outcomeKind: 'silent', text: 'Amazing thankyou !' })).toBe(false);
    expect(paidNeverSilent({ ...base, state: 'LODGED', outcomeKind: 'silent', text: 'Brilliant, cheers mate xx' })).toBe(false);
    expect(paidNeverSilent({ ...base, state: 'LODGED', outcomeKind: 'silent', text: 'Thanks! When will the refund land?' })).toBe(true);
  });
  it('an attachment-only burst is not a question left hanging', () => {
    expect(paidNeverSilent({ ...base, outcomeKind: 'silent', alreadyStored: true })).toBe(false);
  });
  it('a lead before payment is unchanged, and Approval mode is unchanged', () => {
    expect(paidNeverSilent({ ...base, paid: false, state: 'PRICE_SENT', outcomeKind: 'silent' })).toBe(false);
    expect(paidNeverSilent({ ...base, mode: 'SUPERVISED', outcomeKind: 'silent' })).toBe(false);
  });
  it('a reply that was sent is not touched', () => {
    expect(paidNeverSilent({ ...base, outcomeKind: 'sent' })).toBe(false);
  });
});

describe('2. the holding line promises a business day, not "shortly"', () => {
  it('in every language, and invites the nudge', () => {
    for (const [lang, text] of Object.entries(HANDOFF_HOLDING_MSG)) {
      expect(text).not.toMatch(/shortly|in Kürze|まもなく|en breve|très vite|a breve|em breve/);
      expect(text.length).toBeGreaterThan(40);
      expect(text).not.toMatch(/[—–]/);
      if (lang === 'en') expect(text).toContain('usually within one business day');
    }
    expect(APPROVED.handoff.holding).toBe(HANDOFF_HOLDING_MSG.en);
  });
  it('the bump and apology exist in all seven languages and are seeded into the Library', () => {
    expect(Object.keys(HANDOFF_BUMP_MSG)).toEqual(Object.keys(HANDOFF_HOLDING_MSG));
    expect(Object.keys(HANDOFF_APOLOGY_MSG)).toEqual(Object.keys(HANDOFF_HOLDING_MSG));
    expect(handoffBumpMessage(1, 'de')).toBe(HANDOFF_BUMP_MSG.de);
    expect(handoffBumpMessage(2, 'xx')).toBe(HANDOFF_APOLOGY_MSG.en);
    expect(handoffBumpTemplateKey(1, 'en')).toBe('handoff_bump');
    expect(handoffBumpTemplateKey(2, 'ja')).toBe('handoff_apology_ja');
    const keys = seedTemplates().map((t) => t.key);
    expect(keys).toEqual(expect.arrayContaining(['handoff_bump', 'handoff_bump_ja', 'handoff_apology', 'handoff_apology_de']));
  });
});

describe('3. the service and scheduler wiring (source-pinned)', () => {
  const service = readFileSync(join(__dirname, '..', 'service.ts'), 'utf8');
  const scheduler = readFileSync(join(__dirname, '..', 'scheduler.ts'), 'utf8');
  it('a silent outcome on a paid customer becomes a human_task before anything is sent', () => {
    expect(service).toMatch(/if \(paidNeverSilent\(\{/);
    expect(service).toMatch(/outcome = \{\s*\.\.\.outcome, kind: 'human_task'/);
  });
  it('the kill switch acknowledgement lives at ingest, not behind the paused scheduler', () => {
    const idx = service.indexOf('paused_ack_at:');
    const defer = service.indexOf('const armed = await armAutoReply(store, customer);');
    expect(idx).toBeGreaterThan(0);
    expect(idx).toBeLessThan(defer);
    expect(service).toMatch(/12 \* 60 \* 60 \* 1000/);
  });
  it('a successful holding line schedules the 24h bump, which schedules the 48h apology', () => {
    expect(scheduler).toMatch(/kind: 'HANDOFF_BUMP', payload: \{ stage: 1 \}/);
    expect(scheduler).toMatch(/kind: 'HANDOFF_BUMP', payload: \{ stage: 2 \}/);
    expect(scheduler).toMatch(/HANDOFF_BUMP_AFTER_MS = 24 \* 60 \* 60 \* 1000/);
    expect(scheduler).toMatch(/severity: 'URGENT'/);
  });
});
