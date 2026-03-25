/**
 * session-edge.ts — Edge Runtime-compatible session validation
 *
 * Uses the Web Crypto API (SubtleCrypto) instead of Node's `crypto` module,
 * which is not fully supported in the Vercel Edge Runtime used by middleware.ts.
 *
 * ONLY import this file from middleware.ts or other Edge Runtime contexts.
 * All other server-side code should continue using crm-store.ts (Node runtime).
 */

export type SessionPayload = { exp: number; jti: string }

async function getHmacKey(): Promise<CryptoKey> {
  const secret = process.env.JWT_SECRET
  if (!secret) throw new Error('JWT_SECRET environment variable is not set')
  const enc = new TextEncoder()
  return crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['verify']
  )
}

/** base64url → Uint8Array */
function b64urlDecode(s: string): Uint8Array {
  const padded = s.replace(/-/g, '+').replace(/_/g, '/').padEnd(
    s.length + (4 - (s.length % 4)) % 4, '='
  )
  const bin = atob(padded)
  return Uint8Array.from(bin, c => c.charCodeAt(0))
}

/**
 * Validates a session token using Web Crypto (Edge-compatible).
 * Returns the payload if valid, null otherwise.
 */
export async function parseSessionEdge(token: string | undefined): Promise<SessionPayload | null> {
  if (!token) return null
  try {
    const dot = token.lastIndexOf('.')
    if (dot < 0) return null

    const payload = token.slice(0, dot)
    const sig = token.slice(dot + 1)

    const key = await getHmacKey()
    const enc = new TextEncoder()

    const sigBytes = b64urlDecode(sig)
    const valid = await crypto.subtle.verify(
      'HMAC',
      key,
      sigBytes.buffer as ArrayBuffer,
      enc.encode(payload)
    )
    if (!valid) return null

    const parsed: SessionPayload = JSON.parse(
      new TextDecoder().decode(b64urlDecode(payload))
    )
    if (Date.now() >= parsed.exp) return null
    return parsed
  } catch {
    return null
  }
}
