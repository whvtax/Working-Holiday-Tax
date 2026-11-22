// The Log tab (Jo, Nov 22): every action, tick, step and studio stage is written to the audit trail.
// Writing a trace line never stops the work, and secrets are removed before anything is stored.

export interface TraceSink { audit(actor: string, action: string, detail: Record<string, unknown>): Promise<void> }

const SECRET_KEY = /secret|token|password|authorization|cookie|apikey|api_key/i
const MAX_STRING = 4000
const MAX_DEPTH = 6

/** A copy that can be stored: no secret-looking keys, long strings cut short, shallow depth. */
export function sanitize(value: unknown, depth = 0): unknown {
  if (value === null || value === undefined) return value
  if (typeof value === 'string') return value.length > MAX_STRING ? `${value.slice(0, MAX_STRING)} ...(${value.length} chars)` : value
  if (typeof value !== 'object') return value
  if (depth >= MAX_DEPTH) return '(nested)'
  if (Array.isArray(value)) return value.slice(0, 200).map(x => sanitize(x, depth + 1))
  const out: Record<string, unknown> = {}
  for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
    out[k] = SECRET_KEY.test(k) ? '(removed)' : sanitize(v, depth + 1)
  }
  return out
}

export async function trace(sink: TraceSink, actor: string, action: string, detail: Record<string, unknown>): Promise<void> {
  try { await sink.audit(actor, action, sanitize(detail) as Record<string, unknown>) } catch { /* the log never stops the work */ }
}
