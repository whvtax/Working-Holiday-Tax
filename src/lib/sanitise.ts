// Sanitise user input - trim, strip HTML-ish markup, cap length.
// SANITISE-06: the old `/<[^>]*>/g` strip missed UNCLOSED tags (e.g.
// `<img src=x onerror=...` with no closing `>`). We now also strip a dangling
// tag that runs to end-of-string. We deliberately do NOT HTML-entity-encode
// here: these values are rendered through React, which escapes on output, and
// encoding at storage would double-encode (e.g. "O'Brien" -> "O&#39;Brien").
// The real XSS boundary is escaped rendering; this is cosmetic defence.
//
// Round 2: control characters are removed as well. A NUL byte makes Postgres
// refuse the whole INSERT (a 500 and a noisy audit row for a request the caller
// built on purpose), and the bidirectional override / isolate characters let a
// name such as "‮evil" render reversed in the CRM card. Tab, newline and
// carriage return are kept because the address fields are multi-line.
const CONTROL_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F‎‏‪-‮⁦-⁩﻿]/g

export function sanitiseField(value: unknown, maxLength = 500): string {
  if (value == null) return ''
  return String(value).replace(CONTROL_CHARS, '').trim().replace(/<[^>]*(?:>|$)/g, '').slice(0, maxLength)
}

export function sanitiseShort(value: unknown): string {
  return sanitiseField(value, 100)
}

/**
 * Customer-authored text that is going to be written INTO crm_tasks.notes.
 *
 * `notes` is one string of ' | '-separated parts that staff-side code reads
 * back by shape: markTaskDone and deleteTaskAndArchive split it on ' | ' and drop
 * parts by prefix (so "Passport No:" is scrubbed after Done), and the archive step
 * reads the refund figure with /💵 Refund:\s*\$.../ from ANYWHERE in the string.
 * A public submitter who can type a ' | ' or the 💵 label into a free-text answer
 * therefore forges a part the scrub keeps, or the refund figure written to the
 * permanent client record. Here the separator, the label glyph and line breaks are
 * neutralised and whitespace is collapsed; ordinary prose is unchanged.
 */
export function sanitiseNote(value: unknown, maxLength = 500): string {
  return sanitiseField(value, maxLength)
    .replace(/\|/g, '/')
    .replace(/💵/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

export function sanitiseNoteShort(value: unknown): string {
  return sanitiseNote(value, 100)
}
