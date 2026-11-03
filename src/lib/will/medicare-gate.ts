// ============================================================
// MEDICARE GATE (Jo, 3 Nov). Pure, no I/O.
//
// Evidence (72h export): the Medicare Levy Exemption script went to a working
// holiday maker who needed none, the same template was sent 10 times, "In
// progress" screenshots were handed to the team, the team chased the exemption
// three times, and the deferral job looped every 20 minutes behind a busy chat.
//
// This decides ONLY whether the exemption script may go out and how long a
// deferral may run. It states nothing about entitlement: whether someone needs
// an exemption is the team's call, never Will's.
// ============================================================

export interface MedicareFacts {
  /** What the questionnaire answered to "access to Medicare": 'no', 'yes' or unknown. */
  formAnswer?: 'no' | 'yes' | 'unknown' | null;
  /** The customer is on a working holiday visa (417 / 462). Unknown counts as true (be cautious). */
  workingHolidayMaker?: boolean | null;
  /** The team explicitly set "send the exemption script" for this customer. */
  teamSetExemption?: boolean;
  /** How many times the exemption script was already sent to this customer. */
  scriptsSent?: number;
  /** The customer already sent a Medicare screenshot or said they applied. */
  screenshotReceived?: boolean;
  /** The customer said they cannot or will not apply. */
  declined?: boolean;
  /** Customer opted out or Will is paused. */
  paused?: boolean;
}

export type MedicareGateReason =
  | 'ok' | 'paused' | 'already_sent' | 'screenshot_received' | 'declined'
  | 'form_not_no' | 'working_holiday_maker';

export interface MedicareGateResult { send: boolean; reason: MedicareGateReason }

export function medicareGate(f: MedicareFacts): MedicareGateResult {
  if (f.paused) return { send: false, reason: 'paused' };
  // Once only, whatever else is true: ten identical sends came from re-queues.
  if ((f.scriptsSent ?? 0) >= 1) return { send: false, reason: 'already_sent' };
  if (f.screenshotReceived) return { send: false, reason: 'screenshot_received' };
  if (f.declined) return { send: false, reason: 'declined' };
  // The team's explicit setting wins over the visa rule, but not over the checks above.
  if (f.teamSetExemption) return { send: true, reason: 'ok' };
  if (f.formAnswer !== 'no') return { send: false, reason: 'form_not_no' };
  // Never for a working holiday maker unless the team set it (unknown = treated as one).
  if (f.workingHolidayMaker !== false) return { send: false, reason: 'working_holiday_maker' };
  return { send: true, reason: 'ok' };
}

/** Deferral policy for the busy-chat loop: back off, and stop after a few tries. */
export const MEDICARE_MAX_DEFERRALS = 3;
const BACKOFF_MIN = [30, 90, 240];

export type MedicareDeferral =
  | { action: 'defer'; delayMinutes: number }
  | { action: 'give_up' };

/** attempt = number of deferrals already made. After the cap: give up quietly (one team note, no more jobs). */
export function medicareDeferral(attempt: number): MedicareDeferral {
  if (attempt >= MEDICARE_MAX_DEFERRALS) return { action: 'give_up' };
  return { action: 'defer', delayMinutes: BACKOFF_MIN[Math.max(0, attempt)] ?? 240 };
}

/** A Medicare "In progress" screenshot is a normal status, not a task. */
export function isMedicareInProgressNote(text: string | null | undefined): boolean {
  return /\bin progress\b/i.test(text ?? '') || /\bpending\b.*\bmedicare\b|\bmedicare\b.*\bpending\b/i.test(text ?? '');
}
