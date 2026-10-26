// ============================================================
// Win-back records (Jo, 24 Sep; automatic since 25 Oct).
//
// One small record per customer in the `winbacks` settings row: the
// automatic job's decision (never / send), the personal message, when it went
// out, and when the lead moved to Final (winback-auto.ts). The old manual
// win-backs sent from the Lost Leads tab live in the same row, so anyone who
// already got one is never messaged again.
// ============================================================
import type { Store } from './store';

export const WINBACKS_SETTING = 'winbacks';
/** How a win-back task is recognised in send_task_reply. */
export const WINBACK_REASON_PREFIX = 'Win-back:';

export interface WinbackRecord {
  queuedAt?: string;
  sentAt?: string;
  // ── Automatic win-back (Jo, 25 Oct, winback-auto.ts) ──
  /** When Will last read the conversation and decided. */
  decidedAt?: string;
  decision?: 'never' | 'send';
  /** One sentence for Jo: why. */
  reason?: string;
  /** The personal paragraph that goes into {{2}} of winback_<lang>. */
  message?: string;
  attempts?: number;
  failedAt?: string;
  error?: string;
  /** Sent by the automatic job (not the old manual button). */
  auto?: boolean;
  finalAt?: string;
  finalWhy?: string;
}
export type Winbacks = Record<string, WinbackRecord>;

export async function readWinbacks(store: Store): Promise<Winbacks> {
  const v = await store.getSetting(WINBACKS_SETTING).catch(() => null);
  return v && typeof v === 'object' ? (v as Winbacks) : {};
}

export async function markWinbackSent(store: Store, customerId: string, at = new Date().toISOString()): Promise<void> {
  const all = await readWinbacks(store);
  all[customerId] = { ...(all[customerId] ?? {}), queuedAt: all[customerId]?.queuedAt ?? at, sentAt: at };
  await store.setSetting(WINBACKS_SETTING, all);
}
