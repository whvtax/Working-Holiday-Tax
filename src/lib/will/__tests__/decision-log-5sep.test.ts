/**
 * Two things off the Decision Log of 4–5 Sep that were repeating.
 *
 * 1. "in SIGNED but not marked paid" — 38 customers in ONE night. Only a move
 *    to PAID ever set the flag, so a customer sent to Signature from any stage
 *    (Jo's button), moved to Lodged by hand, or imported mid-flow kept
 *    paid=false forever. Beyond the noise, `paid` is what keeps the SALES
 *    follow-ups away from a paying customer.
 *
 * 2. Momo (+61 485 509 462): meta 131049, Meta's per-person MARKETING limit.
 *    Not a broken template and nothing in the chat to fix, so it must not
 *    become a "not delivered" task — and retrying in 30 minutes just fails
 *    again, because that limit resets on a daily cycle.
 */
import { readFileSync } from 'fs';
import { join } from 'path';
import { POST_PAYMENT_STATES } from '@/lib/will/state-machine';

const read = (p: string) => readFileSync(join(process.cwd(), p), 'utf8');

describe('reaching a post-payment stage marks them paid', () => {
  it('in the Supabase store', () => {
    const s = read('src/lib/will/store-supabase.ts');
    expect(s).toMatch(/if \(POST_PAYMENT_STATES\.includes\(to\)\) upd\.paid = true;/);
    expect(s).not.toMatch(/if \(to === 'PAID'\) upd\.paid = true;/);
  });

  it('and in the file store, so the two cannot drift', () => {
    const s = read('src/lib/will/store-file.ts');
    expect(s).toMatch(/if \(POST_PAYMENT_STATES\.includes\(to\)\) c\.paid = true;/);
    expect(s).not.toMatch(/if \(to === 'PAID'\) c\.paid = true;/);
  });

  it('and the stages that count are every stage past the money', () => {
    expect(POST_PAYMENT_STATES).toContain('SIGNATURE_PENDING');
    expect(POST_PAYMENT_STATES).toContain('SIGNED');
    expect(POST_PAYMENT_STATES).toContain('LODGED');
    expect(POST_PAYMENT_STATES).toContain('COMPLETED');
    expect(POST_PAYMENT_STATES).not.toContain('PRICE_SENT');
  });
});

describe('the nightly check repairs the flag instead of listing it every night', () => {
  const nightly = (() => {
    const s = read('src/lib/will/scheduler.ts');
    const start = s.indexOf('export async function runNightly');
    // Anchor on the orphan sweep, which reads SCHEDULED rows only since
    // audit3 sched 54 (5 Sep); guard so a moved anchor fails loudly instead of
    // slicing to the end of the file.
    const end = s.indexOf('const jobs = typeof store.listScheduledJobs', start);
    if (end < 0) throw new Error('orphan sweep anchor not found in runNightly');
    return s.slice(start, end);
  })();

  it('writes the flag rather than pushing an issue', () => {
    expect(nightly).toMatch(/await store\.updateCustomer\(c\.id, \{ paid: true \}\)/);
    expect(nightly).toMatch(/paid_flag_repaired/);
  });

  it('but a failed repair is still reported', () => {
    expect(nightly).toMatch(/but not marked paid/);
  });

  it('and "paid but in a sales state" is still left for a person', () => {
    // The ambiguous direction: it can mean a wrong stage OR a wrong flag.
    expect(nightly).toMatch(/paid but in sales state/);
  });
});

describe("Meta's per-person marketing limit", () => {
  it('131049 is retryable, so it never becomes a task', () => {
    expect(read('src/lib/will/channel.ts')).toMatch(/code === 130429 \|\| code === 131049/);
  });

  it('and it waits for the next evening window, not 30 minutes', () => {
    const s = read('src/lib/will/scheduler.ts');
    expect(s).toMatch(/const marketingLimit = \/131049\/\.test\(sent\.error \?\? ''\);/);
    expect(s).toMatch(/\? deferToMorning\(new Date\(\)\)/);
    expect(s).toMatch(/meta_marketing_limit_131049/);
  });
});
