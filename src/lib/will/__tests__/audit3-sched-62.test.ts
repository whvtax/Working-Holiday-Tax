/**
 * Audit 3, lane sched, finding 62 (5 Sep): the nightly consistency check
 * raises a customer-less task (customerId: null), so Dashboard.tsx quoted its
 * context ("Alice: paid but in sales state QUALIFIED") as if Alice had
 * written it, and had no Open Chat button because there is no customer on
 * the row to open.
 *
 * Fix pinned here: the card's context still starts with the exact sentence
 * the owner reads today (unchanged, after the `---` separator), but is now
 * prefixed with one machine-readable `id|name|text` line per affected
 * customer, built and read by buildNightlyIssueContext / parseNightlyIssueLine
 * (scheduler.ts) — so a future customer-less-task view can resolve each name
 * to a real chat instead of only printing it. Nothing about the reason
 * wording, the fold (raiseOrFoldSystemTask) or the "found N issue(s)" text
 * changes: audit3-sched-60's pins on those stay valid.
 */
import { readFileSync } from 'fs';
import path from 'path';
import { buildNightlyIssueContext, parseNightlyIssueLine } from '@/lib/will/scheduler';

const read = (p: string) => readFileSync(path.join(process.cwd(), p), 'utf8');

describe('buildNightlyIssueContext / parseNightlyIssueLine (real behaviour)', () => {
  it('round-trips id, name and text for each affected customer', () => {
    const rows = [
      { id: 'cust-1', name: 'Alice', text: 'paid but in sales state QUALIFIED' },
      { id: 'cust-2', name: 'Bob', text: 'in SIGNED but not marked paid' },
    ];
    const issues = rows.map((r) => `${r.name}: ${r.text}`);
    const context = buildNightlyIssueContext(rows, issues);

    const [machine, summary] = context.split('\n---\n');
    expect(summary).toBe(issues.join(' | ')); // the sentence the owner already reads, untouched

    const lines = machine.split('\n').map(parseNightlyIssueLine);
    expect(lines).toEqual([
      { id: 'cust-1', name: 'Alice', text: 'paid but in sales state QUALIFIED' },
      { id: 'cust-2', name: 'Bob', text: 'in SIGNED but not marked paid' },
    ]);
  });

  it('keeps a colon inside the free-text part intact (only the first two pipes are structural)', () => {
    const line = 'cust-9|Nguyen Van A|paid but in sales state: PRICE_SENT';
    expect(parseNightlyIssueLine(line)).toEqual({
      id: 'cust-9', name: 'Nguyen Van A', text: 'paid but in sales state: PRICE_SENT',
    });
  });

  it('returns null for a line with no customer id (defensive, should not occur)', () => {
    expect(parseNightlyIssueLine('')).toBeNull();
  });

  it('produces the same summary sentence whether or not any rows were affected', () => {
    expect(buildNightlyIssueContext([], ['Alice: paid but in sales state QUALIFIED']))
      .toMatch(/\n---\nAlice: paid but in sales state QUALIFIED$/);
  });
});

describe('runNightly wiring uses the parseable context, folded exactly as before', () => {
  const nightly = (() => {
    const s = read('src/lib/will/scheduler.ts');
    const start = s.indexOf('export async function runNightly');
    return s.slice(start);
  })();

  it('builds affectedCustomers alongside the plain issues list', () => {
    expect(nightly).toMatch(/affectedCustomers\.push\(\{ customer: c, text \}\)/);
  });

  it('still folds through raiseOrFoldSystemTask with the unchanged reason (audit3 sched 60)', () => {
    expect(nightly).toMatch(/raiseOrFoldSystemTask\(store,\s*\{/);
    expect(nightly).toMatch(/`Nightly consistency check found \$\{issues\.length\} issue\(s\)`/);
  });

  it('builds the context through buildNightlyIssueContext instead of a bare issues.join', () => {
    expect(nightly).toMatch(/context: buildNightlyIssueContext\(/);
  });
});
