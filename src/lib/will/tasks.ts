// ============================================================
// One open task per customer, wherever the task is raised.
//
// Owner's rule: a burst of events for the same customer must fold into ONE
// open task, not one per event. service.ts has folded its own tasks this way
// since the message-burst fix, but the scheduler, the form endpoint and the
// webhook still called store.addTask directly, so a follow-up refused by the
// Policy Guard (a bad Library placeholder, say) opened a fresh card on EVERY
// cadence step for EVERY customer in that flow, and a customer who already
// had a handoff card got a second and a third instead of the first one
// growing (audit, 5 Sep). This module is the shared fold. It imports only the
// Store type, so anything may use it without an import cycle.
//
// Behaviour is identical to the private helper in service.ts: when no task is
// open for the customer this is a plain addTask with the same fields, so the
// reason, severity and suggested reply the owner sees never change. Only a
// SECOND event for the same customer differs: it updates the open card.
// ============================================================
import type { Store, TaskRow } from './store';

export const MAX_TASK_CONTEXT = 2000;

export interface RaiseTaskOpts {
  reason: string;
  severity: string;
  newContext: string | null;
  suggestedReply: string | null;
  /**
   * Replace the growing transcript with something computed from it, rather
   * than appending to it. Receives the open task's context, or null when this
   * is the first event of the burst.
   */
  fold?: (existing: string | null) => string;
  /** The reason line, when it depends on the folded context (a count). */
  reasonFor?: (context: string) => string;
}

/**
 * Raise a task for `customer`, or grow the one already open for them.
 *
 * A task with no customer (a system-wide notice) has nothing to fold into and
 * is always added. Returns the task row from addTask when one was created, or
 * null when an existing card was updated instead.
 */
export async function raiseOrUpdateTask(
  store: Pick<Store, 'addTask' | 'updateTask'> & Partial<Pick<Store, 'findOpenTaskForCustomer'>>,
  // waId may be null for a customer the caller could not load (the stranded
  // sweep), in which case the card carries no name, exactly as before.
  customer: { id: string; name: string | null; waId: string | null },
  opts: RaiseTaskOpts,
): Promise<TaskRow | null> {
  // Both real stores implement findOpenTaskForCustomer; the guard is for the
  // partial store doubles in the test suite, which then behave as before.
  const existing = typeof store.findOpenTaskForCustomer === 'function'
    ? await store.findOpenTaskForCustomer(customer.id)
    : null;
  if (existing) {
    const merged = opts.fold
      ? opts.fold(existing.context)
      : existing.context
        ? (opts.newContext ? `${existing.context}\n---\n${opts.newContext}` : existing.context)
        : (opts.newContext ?? '');
    const context = merged.length > MAX_TASK_CONTEXT ? merged.slice(merged.length - MAX_TASK_CONTEXT) : merged;
    await store.updateTask(existing.id, {
      reason: opts.reasonFor ? opts.reasonFor(context) : opts.reason,
      severity: opts.severity,
      context,
      suggestedReply: opts.suggestedReply,
    });
    return null;
  }
  const fresh = opts.fold ? opts.fold(null) : opts.newContext;
  return store.addTask({
    customerId: customer.id, customerName: customer.name ?? customer.waId ?? null,
    reason: opts.reasonFor ? opts.reasonFor(fresh ?? '') : opts.reason,
    severity: opts.severity, context: fresh, suggestedReply: opts.suggestedReply,
  });
}

// ============================================================
// One open card per SYSTEM notice, too (audit3 sched 60, 5 Sep).
//
// raiseOrUpdateTask folds per customer, so a task with no customer (the
// nightly consistency check, an unmatched questionnaire) was always added.
// The nightly check reports the one issue the 5 Sep repair cannot fix, "paid
// but in sales state", which persists until someone moves the stage: the same
// names produced a fresh card every night, one per day, and none of them had
// an Open Chat because there is no customer to open. An unmatched
// questionnaire submitted twice from the same number did the same. This folds
// such a notice into the open card that already describes it, and lets the
// caller close that card when the condition it described is gone.
//
// Wording is untouched: the first raise is a plain addTask with the same
// fields. Only a repeat updates the existing card instead of stacking.
// ============================================================

export interface FoldSystemTaskOpts {
  /** Picks the open customer-less card this notice belongs to. */
  match: (task: TaskRow) => boolean;
  reason: string;
  severity: string;
  context: string | null;
  suggestedReply: string | null;
}

async function openSystemTasks(store: Pick<Store, 'listTasks'>, match: (t: TaskRow) => boolean): Promise<TaskRow[]> {
  const all = await store.listTasks();
  return all.filter((t) => t.status === 'OPEN' && t.customerId == null && match(t));
}

/**
 * Raise a customer-less task, or refresh the one already open for the same
 * notice so it tracks the current state instead of stacking one per run.
 * Returns the row from addTask when one was created, null when updated.
 */
export async function raiseOrFoldSystemTask(
  store: Pick<Store, 'addTask' | 'updateTask' | 'listTasks'>,
  opts: FoldSystemTaskOpts,
): Promise<TaskRow | null> {
  const [existing] = await openSystemTasks(store, opts.match);
  if (existing) {
    await store.updateTask(existing.id, {
      reason: opts.reason, severity: opts.severity,
      context: opts.context, suggestedReply: opts.suggestedReply,
    });
    return null;
  }
  return store.addTask({
    customerId: null, customerName: null,
    reason: opts.reason, severity: opts.severity,
    context: opts.context, suggestedReply: opts.suggestedReply,
  });
}

/**
 * Close every open customer-less card matching `match`: the condition it
 * described no longer holds, so the owner has nothing left to do on it.
 * Returns how many were resolved.
 */
export async function resolveSystemTasks(
  store: Pick<Store, 'listTasks' | 'resolveTask'>,
  match: (task: TaskRow) => boolean,
): Promise<number> {
  const open = await openSystemTasks(store, match);
  for (const t of open) await store.resolveTask(t.id);
  return open.length;
}
