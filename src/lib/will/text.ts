// ============================================================
// Small, dependency-free text helpers for anything the model writes
// before it reaches a customer or a stored report.
//
// This module imports NOTHING from the rest of the app on purpose: both
// claude.ts and lost-leads.ts use it, and claude.ts already imports
// lost-leads.ts, so a shared helper had to live somewhere neither of them
// pulls in transitively.
// ============================================================

/**
 * Remove em dashes and en dashes from model-written text.
 *
 * Jo's rule, said many times: Will never uses an em dash. The system prompt
 * already asks for that, but a language model cannot be *told* never to emit a
 * character and be relied on — one slips through every so often ("Hi Holly —
 * I want to clarify…") and it is the single thing that makes a warm WhatsApp
 * message read as machine-written. So this is enforced deterministically after
 * generation rather than only requested before it.
 *
 * Only the em dash (—) and en dash (–) are touched. The ordinary hyphen (-) is
 * left exactly as it is: "tax-return", "TFN-only", "24-hour" are correct and
 * Jo is not objecting to them.
 *
 *   "Hi Holly — I want to clarify"  -> "Hi Holly, I want to clarify"
 *   "the fee — $220 — is upfront"   -> "the fee, $220, is upfront"
 *   "years 2019–2023"               -> "years 2019-2023"   (a range stays a range)
 */
export function stripDashes(input: string): string {
  if (!input) return input;
  return input
    // A dash sitting between two numbers is a range (2019–2023, 9–5): keep it
    // as a plain hyphen rather than turning it into a comma.
    .replace(/(\d)\s*[—–]\s*(\d)/g, '$1-$2')
    // A dash used as a clause break, with a space on at least one side
    // ("Holly — I", "fee—$220"): a comma is how the same sentence reads without
    // it. Collapse the surrounding spaces into a single ", ".
    .replace(/\s*[—–]\s*/g, ', ')
    // Any stray double space the substitutions may have produced.
    .replace(/[ \t]{2,}/g, ' ')
    // Never leave a dangling ", " before a newline or at the very end.
    .replace(/,\s*(\n)/g, '$1')
    .replace(/,\s*$/g, '')
    .trimEnd();
}
