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

// ── 3 Nov: what a customer's answer to a win-back means ──────────────────────
// The win-back ends with one question ("Did you manage to get your return
// sorted?"). In the 72h export "No I didn't" got two days of silence. The
// engine uses these two pure helpers to answer such a reply at once.

/** A win-back is "open" for this long after it went out: a reply in this
 *  window is an answer to it, not a fresh enquiry. */
export const WINBACK_ANSWER_WINDOW_DAYS = 14;

export function winbackIsOpen(rec: WinbackRecord | undefined, now: Date = new Date()): boolean {
  const sent = rec?.sentAt ? new Date(rec.sentAt).getTime() : NaN;
  return Number.isFinite(sent) && now.getTime() - sent >= 0 && now.getTime() - sent <= WINBACK_ANSWER_WINDOW_DAYS * 86_400_000;
}

const STILL_NEEDS = /^\s*(?:no+(?:pe)?|not\s+yet|not\s+(?:done|sorted|lodged)|(?:i\s+)?(?:did\s*n[o']?t|didn'?t|haven'?t|have\s+not|hasn'?t)|still\s+(?:need|waiting|to\s+do)|nein|noch\s+nicht|noch\s+nichts|nicht\s+gemacht|いいえ|まだ|していません)(?![a-z])[\s\S]{0,60}$/i;
const DONE = /\b(?:yes|yep|yeah|sorted|done|lodged|filed|submitted|got\s+(?:it\s+)?(?:sorted|done)|used\s+(?:someone|another)|did\s+it\s+(?:myself|elsewhere)|ja|erledigt|schon\s+gemacht|はい|済み|終わ)/i;

/** still_needs: they have not got it done (a warm lead, answer now);
 *  done: they did it (close politely); unclear: leave it to the normal path. */
export function winbackReplyKind(text: string | null | undefined): 'still_needs' | 'done' | 'unclear' {
  const t = (text ?? '').replace(/\s+/g, ' ').trim();
  if (!t || t.length > 120 || /[?？]/.test(t)) return 'unclear';
  if (STILL_NEEDS.test(t) && !/\b(?:don'?t|do\s+not)\s+(?:want|need)|not\s+interested|no\s+thanks/i.test(t)) return 'still_needs';
  if (DONE.test(t)) return 'done';
  return 'unclear';
}
