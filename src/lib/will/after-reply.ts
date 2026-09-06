// ============================================================
// What must be true the moment the owner answers somebody.
//
// THE RULE (Jo, 28 Aug). The Tasks tab and the chat are two views of ONE
// conversation, so answering in either place has to settle both:
//
//   * the chat stops being bold and loses its unread count, exactly as it does
//     on your own phone when you reply from it, and
//   * every open task for that customer closes, because the thing the task was
//     asking for has just been done.
//
// WHAT WAS ACTUALLY HAPPENING. Each send path had grown its own half of this.
// manual_reply and send_task_reply closed the tasks. approve_message marked the
// chat read. send_template, send_estimate, send_signature and send_lodged did
// neither. So sending the very template Will proposed, from the chat, left its
// task sitting in the Tasks tab under "Needs a decision" for a customer who had
// already been answered, and approving a draft left the task open too.
//
// A board that shows work which is already done is worse than a board with
// nothing on it: the owner learns to scroll past it, and then a real one goes
// unnoticed in the same list.
//
// BEST EFFORT, ALWAYS. This runs AFTER WhatsApp has accepted the message. The
// message is gone; it cannot be unsent. So nothing in here may throw and turn a
// delivered reply into a failed request that gets sent a second time. A badge
// that stays bold is a nuisance; a customer receiving the same message twice is
// not.
// ============================================================
import type { Store } from './store';

export interface AfterReply {
  /** How many open tasks this reply closed. */
  tasksResolved: number;
}

// afterHumanReply below still resolves tasks via `listTasks().filter(...)` —
// every open task plus the recent resolved ones, contexts included — to find
// the handful for one customer. The store already grew an indexed
// `listOpenTasksForCustomer` for exactly this call (store.ts, audit 5 Sep),
// but nothing was ever switched over to it. This is that switch, kept as a
// separate export (the "actions" lane's send paths call it instead of
// afterHumanReply) so nothing outside that lane has to change today
// (audit3, 5 Sep). Same contract, same best-effort/never-throw shape.
//
// It also used to pull the customer's full MESSAGE_WINDOW (up to 1,000 rows)
// just to find the two or three still-pending drafts to discard — the other
// half of this same finding. `listPendingOutbound` is the filtered read for
// exactly that slice, so every human reply stops dragging the whole
// conversation through the connection to close one customer's task (audit3,
// 5 Sep).
export async function afterHumanReplyIndexed(store: Store, customerId: string): Promise<AfterReply> {
  try {
    await store.markCustomerRead(customerId);
  } catch {
    // The badge is bookkeeping. The message is already delivered.
  }
  try {
    const stale = await store.listPendingOutbound(customerId);
    await Promise.all(stale.map((m) => store.setMessageStatus(m.id, 'DISCARDED').catch(() => { /* per message */ })));
  } catch {
    // Best effort: a leftover draft is a nuisance, never a reason to fail a
    // reply that has already been delivered.
  }
  try {
    const open = await store.listOpenTasksForCustomer(customerId);
    await Promise.all(open.map((t) => store.resolveTask(t.id).catch(() => { /* per task */ })));
    return { tasksResolved: open.length };
  } catch {
    return { tasksResolved: 0 };
  }
}

export async function afterHumanReply(store: Store, customerId: string): Promise<AfterReply> {
  try {
    await store.markCustomerRead(customerId);
  } catch {
    // The badge is bookkeeping. The message is already delivered.
  }
  // Discard any of Will's OWN drafts still waiting for this customer. The owner
  // has just answered in person, so a draft awaiting approval (Approval mode) or
  // an autopilot reply still parked in its send delay (QUEUED) is now stale.
  //
  // THIS IS WHY AN ALREADY-HANDLED CHAT CAME BACK (Jo, 31 Aug). Closing the task
  // was only half of it: the pending draft stayed under "Needs a decision", so
  // the same conversation reappeared on the next refresh, and approving that
  // draft would have sent a second answer on top of the owner's. A queued
  // autopilot reply is dropped safely too: the AUTO_REPLY job only sends a
  // message that is still QUEUED, so a DISCARDED one simply never goes out.
  try {
    const msgs = await store.listMessages(customerId);
    const stale = msgs.filter((m) =>
      m.direction === 'OUT' && (m.status === 'PENDING_APPROVAL' || m.status === 'QUEUED'));
    await Promise.all(stale.map((m) => store.setMessageStatus(m.id, 'DISCARDED').catch(() => { /* per message */ })));
  } catch {
    // Best effort: a leftover draft is a nuisance, never a reason to fail a
    // reply that has already been delivered.
  }
  try {
    const open = (await store.listTasks()).filter((t) => t.customerId === customerId && t.status === 'OPEN');
    await Promise.all(open.map((t) => store.resolveTask(t.id).catch(() => { /* per task */ })));
    return { tasksResolved: open.length };
  } catch {
    return { tasksResolved: 0 };
  }
}
