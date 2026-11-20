/**
 * The nightly consistency card on the Decision Log (Jo, 18 Sep).
 *
 * runNightly encodes one `id|name|text` line per affected customer into that
 * task's context (audit3 sched 62), but the Dashboard never read it: Jo saw
 * the raw "99320275-...|Miu|paid but in sales state NEW_LEAD" line quoted as
 * if Miu had typed it, with no way to open her chat. The parser now lives in
 * handoff-reasons.ts (client-safe) and the card renders one row per customer,
 * each with its own "Open this chat" button and a plain-English explanation.
 */
import fs from 'node:fs';
import path from 'node:path';
import { parseNightlyIssues, describeNightlyIssue, isNightlyCheckReason, parseNightlyIssueLine } from '@/lib/will/handoff-reasons';
import { parseNightlyIssueLine as fromScheduler } from '@/lib/will/scheduler';

const CONTEXT = [
  '99320275-242d-49bc-9c77-ee2bad1b825b|Miu|paid but in sales state NEW_LEAD',
  'aaaaaaaa-0000-0000-0000-000000000001|Ben|in SIGNATURE_PENDING but not marked paid',
  '---',
  'Miu: paid but in sales state NEW_LEAD | Ben: in SIGNATURE_PENDING but not marked paid',
].join('\n');

describe('parseNightlyIssues', () => {
  it('returns one row per customer with the real id, ignoring the sentence block after ---', () => {
    expect(parseNightlyIssues(CONTEXT)).toEqual([
      { id: '99320275-242d-49bc-9c77-ee2bad1b825b', name: 'Miu', text: 'paid but in sales state NEW_LEAD' },
      { id: 'aaaaaaaa-0000-0000-0000-000000000001', name: 'Ben', text: 'in SIGNATURE_PENDING but not marked paid' },
    ]);
  });

  it('is empty for an ordinary handoff context (a customer message is never mistaken for a row)', () => {
    expect(parseNightlyIssues('what about my super? | can I claim it')).toEqual([]);
    expect(parseNightlyIssues(null)).toEqual([]);
  });

  it('scheduler.ts re-exports the same parser, so the audit3 sched 62 test still holds', () => {
    expect(fromScheduler).toBe(parseNightlyIssueLine);
  });
});

describe('describeNightlyIssue', () => {
  it('turns the paid-but-sales line into what it means and the two possible fixes', () => {
    const d = describeNightlyIssue('paid but in sales state NEW_LEAD');
    expect(d).toMatch(/marked as paid/);
    expect(d).toMatch(/new lead stage/);
    expect(d).toMatch(/if they really paid, move them/);
    expect(d).toMatch(/if they never paid, this flag was set by mistake/);
    expect(d).not.toMatch(/NEW_LEAD/);
  });

  it('turns the unrepaired not-marked-paid line into the manual fix', () => {
    expect(describeNightlyIssue('in SIGNATURE_PENDING but not marked paid')).toMatch(/mark them paid by hand/);
  });

  it('passes an unknown text through unchanged', () => {
    expect(describeNightlyIssue('something new')).toBe('something new');
  });
});

describe('the Decision Log card', () => {
  const src = fs.readFileSync(path.join(__dirname, '..', '..', '..', 'components', 'will', 'Dashboard.tsx'), 'utf8');

  it('recognises the nightly reason', () => {
    expect(isNightlyCheckReason('Nightly consistency check found 1 issue(s)')).toBe(true);
    expect(isNightlyCheckReason("Will's reply was not delivered")).toBe(false);
  });

  it('renders one row per customer with its own Open this chat button, and never quotes the raw id line', () => {
    expect(src).toMatch(/parseNightlyIssues\(t\.context\)/);
    expect(src).toMatch(/nightlyIssues\.map\(\(issue\)/);
    expect(src).toMatch(/openChat\(issue\.id\)/);
    expect(src).toMatch(/describeNightlyIssue\(issue\.text\)/);
    // The raw context is not fed to the "What arrived" quotes for this card.
    expect(src).toMatch(/const wrote = nightlyIssues\.length > 0 \? \[\] :/);
  });
});
