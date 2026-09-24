// ============================================================
// Win-back tracking (Jo, 24 Sep).
//
// Until now a lost lead's card had no memory: pressing "send this to Tasks"
// opened a draft, the message went out, and the card looked exactly as it did
// before, button included. A week later the same person could be messaged
// again. This keeps one small record per customer:
//
//   queuedAt  the button was pressed (a draft exists in Tasks)
//   sentAt    the win-back actually reached WhatsApp (send_task_reply on a
//             task whose reason starts with "Win-back:")
//
// From those two timestamps and the customer's own last message the report
// derives one of four states for the card: draft waiting, waiting for a reply,
// won back (they wrote after the win-back), or gave up (14 days of silence
// after it). Stored as one settings row, not a table: a few hundred entries
// at most, read once per report.
// ============================================================
import type { Store } from './store';

export const WINBACKS_SETTING = 'winbacks';
export const WINBACK_GIVE_UP_DAYS = 14;
/** How a win-back task is recognised in send_task_reply. */
export const WINBACK_REASON_PREFIX = 'Win-back:';

export interface WinbackRecord { queuedAt: string; sentAt?: string }
export type Winbacks = Record<string, WinbackRecord>;

export async function readWinbacks(store: Store): Promise<Winbacks> {
  const v = await store.getSetting(WINBACKS_SETTING).catch(() => null);
  return v && typeof v === 'object' ? (v as Winbacks) : {};
}

export async function markWinbackQueued(store: Store, customerId: string, at = new Date().toISOString()): Promise<void> {
  const all = await readWinbacks(store);
  all[customerId] = { ...(all[customerId] ?? {}), queuedAt: at };
  await store.setSetting(WINBACKS_SETTING, all);
}

export async function markWinbackSent(store: Store, customerId: string, at = new Date().toISOString()): Promise<void> {
  const all = await readWinbacks(store);
  all[customerId] = { queuedAt: all[customerId]?.queuedAt ?? at, sentAt: at };
  await store.setSetting(WINBACKS_SETTING, all);
}

export type WinbackStatus =
  | { kind: 'none' }
  | { kind: 'draft'; queuedAt: string }
  | { kind: 'waiting'; sentAt: string; days: number }
  | { kind: 'gave_up'; sentAt: string; days: number }
  | { kind: 'won_back'; sentAt: string; repliedAt: string };

const DAY = 24 * 60 * 60 * 1000;

/** Pure. `lastCustomerMsgAt` is the customer's own last message, if any. */
export function winbackStatus(rec: WinbackRecord | undefined, lastCustomerMsgAt: string | null | undefined, now = new Date()): WinbackStatus {
  if (!rec) return { kind: 'none' };
  if (!rec.sentAt) return { kind: 'draft', queuedAt: rec.queuedAt };
  const sent = new Date(rec.sentAt).getTime();
  const replied = lastCustomerMsgAt ? new Date(lastCustomerMsgAt).getTime() : 0;
  if (replied > sent) return { kind: 'won_back', sentAt: rec.sentAt, repliedAt: lastCustomerMsgAt as string };
  const days = Math.max(0, Math.floor((now.getTime() - sent) / DAY));
  if (days >= WINBACK_GIVE_UP_DAYS) return { kind: 'gave_up', sentAt: rec.sentAt, days };
  return { kind: 'waiting', sentAt: rec.sentAt, days };
}
