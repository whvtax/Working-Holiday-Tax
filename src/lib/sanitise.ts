// Sanitise user input - trim, strip HTML-ish markup, cap length.
// SANITISE-06: the old `/<[^>]*>/g` strip missed UNCLOSED tags (e.g.
// `<img src=x onerror=...` with no closing `>`). We now also strip a dangling
// tag that runs to end-of-string. We deliberately do NOT HTML-entity-encode
// here: these values are rendered through React, which escapes on output, and
// encoding at storage would double-encode (e.g. "O'Brien" -> "O&#39;Brien").
// The real XSS boundary is escaped rendering; this is cosmetic defence.
export function sanitiseField(value: unknown, maxLength = 500): string {
  if (value == null) return ''
  return String(value).trim().replace(/<[^>]*(?:>|$)/g, '').slice(0, maxLength)
}

export function sanitiseShort(value: unknown): string {
  return sanitiseField(value, 100)
}
