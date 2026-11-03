// src/lib/log-safe.ts
// ──────────────────────────────────────────────────────────────────────────
// Error text that is safe to write to Vercel logs.
//
// A PostgREST error object carries `details` and `hint`. For a constraint
// violation the details are the offending ROW ("Failing row contains (...)")
// or the offending KEY ("Key (email)=(a@b.c) already exists."), which on
// crm_tasks means a TFN, a bank account or a passport number landing in a log
// that is retained by Vercel and visible to anyone with project access.
//
// safeErr() keeps what an engineer needs (error class, SQLSTATE code, the
// message) and drops everything else. It never returns details, hint, the
// request body or a stack, and it masks the two Postgres patterns above even
// when they appear inside `message`.
// ──────────────────────────────────────────────────────────────────────────

const MAX = 300

function scrub(s: string): string {
  return s
    // "Failing row contains (a, b, c)" : the whole row
    .replace(/Failing row contains\s*\([\s\S]*?\)(?=\s*\.?\s*$|\s*\.\s)/gi, 'Failing row contains (redacted)')
    .replace(/Failing row contains[\s\S]*/gi, 'Failing row contains (redacted)')
    // "Key (col)=(value) already exists" : the value
    .replace(/Key \(([^)]*)\)=\(([\s\S]*?)\)(?= (?:already|is not|conflicts)|\.|$)/gi, 'Key ($1)=(redacted)')
    // invalid input syntax for type x: "value"
    .replace(/(invalid input syntax for [^:]*:\s*)"[\s\S]*?"/gi, '$1"redacted"')
    // Long digit runs (TFN 8-9 digits, BSB/account, phone numbers)
    .replace(/\d[\d\s-]{4,}\d/g, '[digits]')
    // E-mail addresses
    .replace(/[^\s@"'<>()]+@[^\s@"'<>()]+\.[^\s@"'<>()]+/g, '[email]')
}

export function safeErr(err: unknown): string {
  if (err === null || err === undefined) return 'unknown error'
  if (typeof err === 'string') return scrub(err).slice(0, MAX)
  if (typeof err !== 'object') return String(err).slice(0, 40)
  const o = err as { name?: unknown; code?: unknown; message?: unknown }
  const name = typeof o.name === 'string' && o.name ? o.name : 'Error'
  const code = typeof o.code === 'string' || typeof o.code === 'number' ? ` code=${String(o.code).slice(0, 20)}` : ''
  const msg = typeof o.message === 'string' ? scrub(o.message).slice(0, MAX) : ''
  return `${name.slice(0, 40)}${code}${msg ? `: ${msg}` : ''}`
}
