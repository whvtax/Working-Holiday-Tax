// ============================================================
// THE TWO WEEK PROMISE TO A CUSTOMER WHO OWES TAX (Jo, 30 Oct).
//
// The lodged message for a customer who owes the ATO says "we'll message you
// again in about two weeks and walk you through how to pay". Eight customers
// were told that (payments due 4 to 10 Nov) and nothing was scheduled behind
// the promise for those whose outcome flag was not set when Mark Lodged was
// pressed, or whose message was typed by the team.
//
// The job itself already exists (PAYABLE_FOLLOWUP, 14 days after Mark Lodged,
// an URGENT task for Jo with the opening line ready; nothing is sent to the
// customer). This module makes sure EVERY customer who was given the promise
// has one, exactly once:
//   - scan the chat for the promise (our own words, any language we use);
//   - the customer must owe (outcome, estimate, or payable text in the chat);
//   - no PAYABLE_FOLLOWUP job in any status, and not already raised;
//   - run at promise time + 14 days, or on the next tick when that is past.
// Run from the nightly pass; idempotent.
// ============================================================
import type { CustomerRow, MessageRow, Store } from './store';
import { customerOwesTax } from './followup-gate-30oct';

export const PAYABLE_FOLLOWUP_DAYS = 14;
export const payableRaisedKey = (customerId: string) => `payable_followup_raised:${customerId}`;

/** "We'll message you again in about two weeks", as our texts word it. */
export const PAYABLE_PROMISE = /(?:message|contact|write to|be in touch with|get back to) you(?: again)? in (?:about |around |roughly )?(?:two|2) weeks|in etwa zwei Wochen wieder|約2週間後にこちらから/i;

type JobStore = Pick<Store, 'allCustomers' | 'listMessages' | 'listJobsForCustomer' | 'addJob' | 'getSetting' | 'audit'>;

export function promiseTime(messages: readonly Pick<MessageRow, 'direction' | 'status' | 'body' | 'createdAt'>[]): string | null {
  let at: string | null = null;
  for (const m of messages) {
    if (m.direction === 'OUT' && (m.status ?? 'SENT') === 'SENT' && PAYABLE_PROMISE.test(m.body ?? '')) at = m.createdAt;
  }
  return at;
}

export async function ensurePayableFollowups(store: JobStore, nowMs: number = Date.now()): Promise<{ checked: number; scheduled: number }> {
  let checked = 0;
  let scheduled = 0;
  const customers: CustomerRow[] = await store.allCustomers();
  for (const c of customers) {
    if (c.optedOut || c.isLegacy) continue;
    if (!['LODGED', 'COMPLETED', 'SIGNED'].includes(c.state)) continue;
    checked++;
    try {
      const msgs = await store.listMessages(c.id);
      const promised = promiseTime(msgs);
      if (!promised || !customerOwesTax(c, msgs)) continue;
      if ((await store.getSetting(payableRaisedKey(c.id))) != null) continue;
      const jobs = await store.listJobsForCustomer(c.id, ['PAYABLE_FOLLOWUP']);
      if (jobs.length > 0) continue;
      const due = new Date(promised).getTime() + PAYABLE_FOLLOWUP_DAYS * 86400_000;
      await store.addJob({
        customerId: c.id, kind: 'PAYABLE_FOLLOWUP', payload: {},
        runAt: new Date(Math.max(due, nowMs + 60_000)).toISOString(),
      });
      await store.audit('scheduler', 'payable_followup_scheduled', { customerId: c.id, promisedAt: promised, runAt: new Date(Math.max(due, nowMs + 60_000)).toISOString() }).catch(() => undefined);
      scheduled++;
    } catch { /* one customer must not stop the sweep */ }
  }
  return { checked, scheduled };
}
