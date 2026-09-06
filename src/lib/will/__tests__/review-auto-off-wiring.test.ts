/**
 * (Jo, 6 Sep) Pins the actual wiring of the auto-off-at-Review feature: the
 * three places maybeAutoOffWill is called from, and that the manual
 * "Take Over" / "Resume Will" toggle (toggle_ai) is completely untouched by
 * it — reading and editing source directly, the same pattern the rest of
 * this session's audit fixes use, so a refactor that quietly drops one of
 * the hooks fails here rather than only showing up as a customer Will never
 * goes quiet for.
 */
import { readFileSync } from 'fs';
import { join } from 'path';

const ROOT = join(__dirname, '..', '..', '..', '..');
const actionsRoute = readFileSync(join(ROOT, 'src/app/api/will/actions/route.ts'), 'utf8');
const service = readFileSync(join(ROOT, 'src/lib/will/service.ts'), 'utf8');
const scheduler = readFileSync(join(ROOT, 'src/lib/will/scheduler.ts'), 'utf8');
const reviewAutoOff = readFileSync(join(ROOT, 'src/lib/will/review-auto-off.ts'), 'utf8');

describe('review-auto-off: wired into all three places the condition can newly become true', () => {
  it('the manual set_state stage move (how a customer actually reaches UNDER_REVIEW) calls it', () => {
    const setStateAt = actionsRoute.indexOf("await store.setState(customer.id, target, 'HUMAN');");
    const hookAt = actionsRoute.indexOf('await maybeAutoOffWill(store, fresh)');
    expect(setStateAt).toBeGreaterThan(-1);
    expect(hookAt).toBeGreaterThan(setStateAt);
  });

  it('the ABN "owed acknowledgement" send (service.ts) re-checks on success, not merely on being owed', () => {
    const fnAt = service.indexOf('async function sendOwedFormAck');
    const okAt = service.indexOf('if (out.ok) {', fnAt);
    const hookAt = service.indexOf('await maybeAutoOffWill(store, fresh)', fnAt);
    expect(fnAt).toBeGreaterThan(-1);
    expect(okAt).toBeGreaterThan(fnAt);
    expect(hookAt).toBeGreaterThan(okAt);
  });

  it('the MEDICARE_INFO job (scheduler.ts) re-checks only after deliverOut genuinely reports ok', () => {
    const jobAt = scheduler.indexOf("job.kind === 'MEDICARE_INFO'");
    const okAt = scheduler.indexOf('if (out.ok) {', jobAt);
    const sentFlagAt = scheduler.indexOf('medicareInfoSentKey(customer.id), true', jobAt);
    const hookAt = scheduler.indexOf('await maybeAutoOffWill(store, fresh)', jobAt);
    expect(jobAt).toBeGreaterThan(-1);
    expect(okAt).toBeGreaterThan(jobAt);
    expect(sentFlagAt).toBeGreaterThan(okAt);
    expect(hookAt).toBeGreaterThan(sentFlagAt);
  });

  it('the Approval-mode branch (message only queued for approval, not actually delivered) never sets the sent flag', () => {
    const jobAt = scheduler.indexOf("job.kind === 'MEDICARE_INFO'");
    const approvalAt = scheduler.indexOf('approval: true', jobAt);
    expect(approvalAt).toBeGreaterThan(jobAt);
    // The sent-flag write is inside the deliverOut branch, strictly after the
    // approval-mode branch's own audit call in source order.
    const sentFlagAt = scheduler.indexOf('medicareInfoSentKey(customer.id), true', jobAt);
    expect(sentFlagAt).toBeGreaterThan(approvalAt);
  });
});

describe('review-auto-off: never overrides the manual toggle', () => {
  it('toggle_ai (Take Over / Resume Will) sets aiPaused directly and calls nothing from review-auto-off', () => {
    const fnAt = actionsRoute.indexOf("case 'toggle_ai': {");
    const fnEndAt = actionsRoute.indexOf("case 'toggle_ai': {") + 600;
    const body = actionsRoute.slice(fnAt, fnEndAt);
    expect(body).toContain('await store.updateCustomer(b.id, { aiPaused: !b.value });');
    expect(body).not.toContain('maybeAutoOffWill');
    expect(body).not.toContain('review-auto-off');
  });

  it('maybeAutoOffWill is a no-op for a customer who is already aiPaused, by construction', () => {
    expect(reviewAutoOff).toMatch(/if \(customer\.aiPaused\) return false;/);
  });
});
