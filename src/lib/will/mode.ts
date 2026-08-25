/**
 * The single definition of "is the assistant allowed to send on its own".
 *
 * WHY THIS FILE EXISTS
 *   `ai_mode` used to be read in two places that disagreed with each other:
 *
 *     engine.ts     kind: mode === 'SUPERVISED' ? 'pending_approval' : 'queued'
 *     scheduler.ts  return mode !== 'FULL_AUTO'
 *
 *   The first one fails OPEN. Any value that was not the exact string
 *   'SUPERVISED' — 'AUTOPILOT', 'full_auto', 'Autopilot', a stray boolean, a
 *   typo in a SQL console — meant live customer replies transmitted with no
 *   approval, while scheduled follow-ups kept landing in the approval queue. The
 *   dashboard would have looked like approval mode was working.
 *
 *   That is the wrong way round for the one rule this system must not break:
 *   nothing goes to a customer without the owner seeing it first. So there is
 *   now exactly one function that answers the question, it is used everywhere,
 *   and it recognises exactly one value as permission to send.
 *
 * THE RULE
 *   Autopilot requires the literal string 'FULL_AUTO'. Everything else —
 *   unset, null, empty, misspelled, wrong case, wrong type — is Approval mode.
 */
export type AiMode = 'SUPERVISED' | 'FULL_AUTO'

/**
 * Normalise whatever is stored under `ai_mode` into a mode that is safe to act
 * on. Deliberately strict: this does NOT trim, lowercase or otherwise "helpfully"
 * repair the value, because a value that needed repairing is a value nobody
 * deliberately set, and the safe answer to that is to ask the owner.
 */
export function resolveAiMode(raw: unknown): AiMode {
  return raw === 'FULL_AUTO' ? 'FULL_AUTO' : 'SUPERVISED'
}

/** True when a message must wait for the owner. The default, and the fallback. */
export function requiresApproval(raw: unknown): boolean {
  return resolveAiMode(raw) !== 'FULL_AUTO'
}
