/**
 * What the System & Costs card is allowed to say.
 *
 * Two promises are load-bearing here and both are asserted:
 *  - a dollar figure is ALWAYS an estimate at a stated rate, never presented as
 *    measured spend (nothing in this system reads Anthropic's billing);
 *  - a fault carries the provider's own error text, truncated but never
 *    swallowed, plus when it last happened and how many times.
 */
import { summariseAiUsage, faultsFromAudit, ASSUMED_USD_PER_DECISION } from '@/lib/will/system-report';
import type { AuditRow } from '@/lib/will/store';

const audit = (actor: string, action: string, detail: unknown, at: string): AuditRow =>
  ({ id: `${actor}-${action}-${at}`, actor, action, detail, at });

describe('Claude usage', () => {
  const counters = [
    { key: 'ai_calls:2026-08-24', value: 10 },
    { key: 'ai_calls:2026-08-25', value: 5 },
    { key: 'ai_calls:2026-08-26', value: 3 },
  ];

  it('reports today, the total, and the span the total covers', () => {
    const u = summariseAiUsage(counters, { todayKey: '2026-08-26', budgetToday: 3000, usingMock: false });
    expect(u.callsToday).toBe(3);
    expect(u.callsTotal).toBe(18);
    expect(u.daysRecorded).toBe(3);
    expect(u.firstDay).toBe('2026-08-24');
    expect(u.lastDay).toBe('2026-08-26');
    expect(u.budgetToday).toBe(3000);
  });

  it('never claims the dollar figure is measured', () => {
    const u = summariseAiUsage(counters, { todayKey: '2026-08-26', budgetToday: 3000, usingMock: false });
    expect(u.measured).toBe(false);
    expect(u.assumedUsdPerCall).toBe(ASSUMED_USD_PER_DECISION);
    expect(u.estimatedUsd).toBeCloseTo(18 * ASSUMED_USD_PER_DECISION, 5);
  });

  it('is zero, not a guess, when nothing has been counted', () => {
    const u = summariseAiUsage([], { todayKey: '2026-08-26', budgetToday: 3000, usingMock: true });
    expect(u.callsToday).toBe(0);
    expect(u.callsTotal).toBe(0);
    expect(u.estimatedUsd).toBe(0);
    expect(u.firstDay).toBeNull();
  });

  it('ignores any other setting that happens to share the prefix shape', () => {
    const u = summariseAiUsage(
      [{ key: 'ai_calls:not-a-date', value: 999 }, { key: 'ai_calls:2026-08-26', value: 2 }],
      { todayKey: '2026-08-26', budgetToday: 10, usingMock: false },
    );
    expect(u.callsTotal).toBe(2);
    expect(u.daysRecorded).toBe(1);
  });
});

describe('system faults', () => {
  it('groups repeats, keeps the newest error text and the newest time', () => {
    const faults = faultsFromAudit([
      audit('channel', 'send_failed', { error: 'newest: (#131047) Message failed to send' }, '2026-08-26T10:00:00.000Z'),
      audit('channel', 'send_failed', { error: 'older: token expired' }, '2026-08-25T10:00:00.000Z'),
      audit('owner', 'task_resolved', { id: 'x' }, '2026-08-26T11:00:00.000Z'),
    ]);
    expect(faults).toHaveLength(1);
    expect(faults[0].count).toBe(2);
    expect(faults[0].error).toMatch(/newest/);
    expect(faults[0].lastAt).toBe('2026-08-26T10:00:00.000Z');
    expect(faults[0].component).toMatch(/WhatsApp/);
    expect(faults[0].severity).toBe('critical');
    // Every fault must say what it means and what to do — that is the whole
    // point of the card being screenshot-able.
    expect(faults[0].meaning.length).toBeGreaterThan(20);
    expect(faults[0].action.length).toBeGreaterThan(20);
  });

  it('ignores ordinary audit rows — only failures are faults', () => {
    expect(faultsFromAudit([
      audit('channel', 'inbound_received', { id: '1' }, '2026-08-26T10:00:00.000Z'),
      audit('assistant', 'decision', { action: 'sent' }, '2026-08-26T10:01:00.000Z'),
      audit('owner', 'manual_reply', { customerId: 'c1' }, '2026-08-26T10:02:00.000Z'),
    ])).toEqual([]);
  });

  it('truncates a huge error but marks it rather than swallowing the tail silently', () => {
    const long = 'x'.repeat(1000);
    const [f] = faultsFromAudit([audit('channel', 'inbound_dead_letter', { error: long }, '2026-08-26T10:00:00.000Z')]);
    expect(f.error.length).toBeLessThan(300);
    expect(f.error).toMatch(/truncated/);
  });

  it('says so when a failure carries no error text at all', () => {
    const [f] = faultsFromAudit([audit('policy_guard', 'inbound_rate_limited', { from: '61•••001', scope: 'sender' }, '2026-08-26T10:00:00.000Z')]);
    expect(f.error).toMatch(/no error text/i);
    expect(f.severity).toBe('warning');
  });

  it('puts the failures a customer felt above the ones they did not', () => {
    const faults = faultsFromAudit([
      audit('nightly', 'daily_digest_failed', { error: 'resend 401' }, '2026-08-26T12:00:00.000Z'),
      audit('channel', 'send_failed', { error: 'token expired' }, '2026-08-26T09:00:00.000Z'),
    ]);
    expect(faults.map((f) => f.severity)).toEqual(['critical', 'warning']);
  });

  it('folds the three ways the nightly digest can fail into one entry', () => {
    const faults = faultsFromAudit([
      audit('nightly', 'daily_digest_failed', { error: 'a' }, '2026-08-24T12:00:00.000Z'),
      audit('nightly', 'daily_digest_crashed', { error: 'b' }, '2026-08-25T12:00:00.000Z'),
      audit('nightly', 'daily_digest_mine_failed', { error: 'c' }, '2026-08-26T12:00:00.000Z'),
    ]);
    expect(faults).toHaveLength(1);
    expect(faults[0].count).toBe(3);
    expect(faults[0].error).toBe('c');
  });
});
