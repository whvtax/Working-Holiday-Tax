/**
 * audit3 / sched-27: the System & Costs faults card must see every failure
 * that is written to will_audit, not just the original eight. Before this,
 * Meta's asynchronous delivery failures (the commonest failure of all) and a
 * scheduler crashing on every tick both produced a clean card.
 *
 * One row per actor/action pair that the code actually writes, asserting it
 * lands on the card under the expected component with its real error text.
 */
import { faultsFromAudit } from '@/lib/will/system-report';
import type { AuditRow } from '@/lib/will/store';

const audit = (actor: string, action: string, detail: unknown, at = '2026-09-05T10:00:00.000Z'): AuditRow =>
  ({ id: `${actor}-${action}-${at}`, actor, action, detail, at });

const cases: [actor: string, action: string, key: string, severity: 'critical' | 'warning'][] = [
  ['channel', 'delivery_failed', 'delivery_failed', 'critical'],
  ['channel', 'auto_reply_send_failed', 'will_reply_failed', 'critical'],
  ['channel', 'payment_received_send_failed', 'will_reply_failed', 'critical'],
  ['assistant', 'auto_reply_failed', 'will_reply_failed', 'critical'],
  ['scheduler', 'job_crashed', 'scheduled_message_failed', 'warning'],
  ['scheduler', 'job_dead_lettered', 'scheduled_message_failed', 'warning'],
  ['scheduler', 'stranded_outbound_swept', 'scheduled_message_failed', 'warning'],
  ['system', 'medicare_info_failed', 'scheduled_message_failed', 'warning'],
  ['system', 'review_request_failed', 'scheduled_message_failed', 'warning'],
  ['assistant', 'handoff_ack_failed', 'scheduled_message_failed', 'warning'],
  ['assistant', 'handoff_ack_crashed', 'scheduled_message_failed', 'warning'],
  ['scheduler', 'tick_budget_exhausted', 'scheduler_tick_failed', 'warning'],
  ['scheduler', 'tick_read_failed', 'scheduler_tick_failed', 'warning'],
  ['scheduler', 'ensure_nightly_failed', 'scheduler_tick_failed', 'warning'],
  ['scheduler', 'ensure_digest_failed', 'scheduler_tick_failed', 'warning'],
  ['channel', 'send_bookkeeping_failed', 'bookkeeping_failed', 'warning'],
  ['scheduler', 'reconcile_failed_after_send', 'bookkeeping_failed', 'warning'],
  ['system', 'message_customer_update_failed', 'bookkeeping_failed', 'warning'],
  ['system', 'form_notify_failed', 'web_form_failed', 'warning'],
  ['system', 'public_form_failed', 'web_form_failed', 'warning'],
];

describe('audit3 sched-27: every recorded failure reaches the faults card', () => {
  it.each(cases)('%s/%s appears as %s (%s) with its error text', (actor, action, key, severity) => {
    const [f, ...rest] = faultsFromAudit([audit(actor, action, { error: `real text for ${action}` })]);
    expect(rest).toHaveLength(0);
    expect(f.key).toBe(key);
    expect(f.severity).toBe(severity);
    expect(f.error).toBe(`real text for ${action}`);
    expect(f.meaning.length).toBeGreaterThan(20);
    expect(f.action.length).toBeGreaterThan(20);
    // Owner rule: no dashes in wording that ends up on a screen.
    expect(`${f.component} ${f.meaning} ${f.action}`).not.toMatch(/[–—]| - /);
  });

  it('shows the out of window callback the way the webhook records it', () => {
    const [f] = faultsFromAudit([audit('channel', 'delivery_failed', {
      customerId: 'c1', messageId: 'm1', providerId: 'wamid.x', code: 131047,
      error: 'meta 131047: Re-engagement message (customer has not written in the last 24 hours)',
    })]);
    expect(f.component).toMatch(/WhatsApp delivery/);
    expect(f.error).toMatch(/131047/);
    expect(f.action).toMatch(/131047/);
  });

  it('surfaces the tick budget note, which is written as `note` rather than `error`', () => {
    const [f] = faultsFromAudit([audit('scheduler', 'tick_budget_exhausted', {
      processed: 40, remaining: 12,
      note: 'Stopped after 50s with 12 due job(s) not yet processed; they remain SCHEDULED and run on the next tick.',
    })]);
    expect(f.error).toMatch(/12 due job/);
  });

  it('folds a scheduler crashing on every tick into one growing row, criticals still first', () => {
    const faults = faultsFromAudit([
      audit('scheduler', 'job_crashed', { error: 'relation will_jobs does not exist' }, '2026-09-05T10:00:00.000Z'),
      audit('scheduler', 'job_crashed', { error: 'relation will_jobs does not exist' }, '2026-09-05T10:01:00.000Z'),
      audit('scheduler', 'job_dead_lettered', { jobId: 'j1', kind: 'FOLLOWUP', attempts: 5 }, '2026-09-05T10:02:00.000Z'),
      audit('channel', 'delivery_failed', { error: 'meta 131026: not on WhatsApp' }, '2026-09-05T09:00:00.000Z'),
    ]);
    expect(faults.map((f) => f.key)).toEqual(['delivery_failed', 'scheduled_message_failed']);
    expect(faults[1].count).toBe(3);
    // The dead letter row carries no text; the newest row with text wins.
    expect(faults[1].error).toMatch(/will_jobs/);
  });

  it('still ignores the success and skip rows that sit beside these failures', () => {
    expect(faultsFromAudit([
      audit('assistant', 'handoff_ack_sent', { customerId: 'c1' }),
      audit('assistant', 'handoff_ack_skipped', { reason: 'already answered' }),
      audit('assistant', 'handoff_ack_held', { reason: 'placeholder' }),
      audit('scheduler', 'job_done', { jobId: 'j1' }),
      audit('channel', 'delivery_status', { status: 'delivered' }),
    ])).toEqual([]);
  });
});
