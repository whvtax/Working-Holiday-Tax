/**
 * Form completion token (round 2 proposal AUTH-4 / F-1, NOT YET WIRED).
 *
 * WHY. The public questionnaire acts on whatever phone number its submitter
 * types: anyone who knows a customer's number can mark that customer's form
 * complete, stop their reminders and queue WhatsApp messages (round 1 F-1).
 * The fix is to bind a submission to the customer by a secret that only the
 * WhatsApp thread carries: the link Will sends is `.../tax-form?k=<token>`, the
 * form posts `k` back, and the server trusts the token, never the typed number.
 *
 * WHAT THE TOKEN IS. `v1.<payload>.<mac>`, both parts base64url.
 *   payload = JSON { c: customer id, b: brand, e: expiry (unix s), n: 8 random bytes }
 *   mac     = HMAC-SHA256(key, "whtax:form-completion:v1|" + payload part)
 * The key is FORM_TOKEN_SECRET (its own secret, never JWT_SECRET, so a token can
 * never be replayed as a session and the reverse). With no secret configured
 * nothing is signed and nothing verifies, so the feature fails closed.
 *
 * WHAT IT DELIBERATELY IS NOT. Not single use: a customer legitimately submits
 * again ("forgot a receipt") and the existing one-FORM_RECEIVED-job guard already
 * makes a resubmission harmless. Expiry (default 21 days) and the brand claim
 * bound it; a per-customer revoke time (setting `form_token_revoked_before:<id>`)
 * can kill every earlier token. It carries no PII: a customer id is an opaque
 * UUID, and the payload is signed, not encrypted, so nothing secret is in it.
 *
 * See security-assessment/proposals/form-completion-token/ for the wiring plan.
 */
import { createHmac, randomBytes, timingSafeEqual } from 'crypto'

export const FORM_TOKEN_TTL_SECONDS = 21 * 24 * 60 * 60
/** Hard upper bound accepted at verify time whatever a token claims. */
export const FORM_TOKEN_MAX_TTL_SECONDS = 60 * 24 * 60 * 60
const DOMAIN = 'whtax:form-completion:v1|'

export type TokenBrand = 'wht' | 'svt'

export type TokenPurpose = 'form' | 'fix'

/** `nonce` is the token's unique id: the single-use record is keyed on it.
 *  `purpose` 'fix' is a correction link (residency answers only). */
export interface FormTokenClaims { customerId: string; brand: TokenBrand; expiresAt: number; nonce: string; purpose: TokenPurpose }

export type FormTokenResult =
  | { ok: true; claims: FormTokenClaims }
  | { ok: false; reason: 'disabled' | 'malformed' | 'bad_signature' | 'expired' | 'wrong_brand' | 'too_long_lived' }

const b64u = (b: Buffer) => b.toString('base64url')

function key(secret: string | undefined): Buffer | null {
  const s = secret ?? process.env.FORM_TOKEN_SECRET
  // A short secret is treated as no secret: a token signed with "test" is a token anyone can forge.
  return s && s.length >= 32 ? Buffer.from(s, 'utf8') : null
}

function mac(k: Buffer, payloadPart: string): Buffer {
  return createHmac('sha256', k).update(DOMAIN + payloadPart).digest()
}

// ── Compact token (Jo, 3 Nov: "make the link as short as possible") ──────────────────────────
// 44 characters instead of about 230. Raw bytes, base64url, no dots:
//   customer id (UUID, 16 bytes) | expiry day (2 bytes, days since 2026-01-01) | nonce (6 bytes)
//   | flags (1 byte: bit 0 = correction link, bit 1 = student brand) | MAC (first 8 bytes of HMAC-SHA256)
// An 8-byte MAC is 64 bits: far beyond what the rate-limited endpoints could be brute-forced
// against. Customer ids that are not UUIDs, and every token already sent, use the longer v1 form.
const COMPACT_DOMAIN = 'whtax:form-completion:c1|'
const EPOCH_S = 1_767_225_600 // 2026-01-01T00:00:00Z
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
const COMPACT_RE = /^[A-Za-z0-9_-]{44}$/

function compactMac(k: Buffer, payload: Buffer): Buffer {
  return createHmac('sha256', k).update(COMPACT_DOMAIN).update(payload).digest().subarray(0, 8)
}

function signCompact(k: Buffer, customerId: string, brand: TokenBrand, expiresAtS: number, purpose?: TokenPurpose): string | null {
  if (!UUID_RE.test(customerId)) return null
  const day = Math.ceil((expiresAtS - EPOCH_S) / 86400)
  if (day < 0 || day > 0xffff) return null
  const payload = Buffer.alloc(25)
  Buffer.from(customerId.replace(/-/g, ''), 'hex').copy(payload, 0)
  payload.writeUInt16BE(day, 16)
  randomBytes(6).copy(payload, 18)
  payload[24] = (purpose === 'fix' ? 1 : 0) | (brand === 'svt' ? 2 : 0)
  return b64u(Buffer.concat([payload, compactMac(k, payload)]))
}

function verifyCompact(token: string, k: Buffer, expectedBrand: TokenBrand, nowS: number): FormTokenResult {
  const raw = Buffer.from(token, 'base64url')
  if (raw.length !== 33) return { ok: false, reason: 'malformed' }
  const payload = raw.subarray(0, 25)
  const given = raw.subarray(25)
  const want = compactMac(k, payload)
  if (given.length !== want.length || !timingSafeEqual(given, want)) return { ok: false, reason: 'bad_signature' }
  const hex = payload.subarray(0, 16).toString('hex')
  const customerId = `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`
  const expiresAt = EPOCH_S + payload.readUInt16BE(16) * 86400
  const flags = payload[24]
  const brand: TokenBrand = flags & 2 ? 'svt' : 'wht'
  if (expiresAt <= nowS) return { ok: false, reason: 'expired' }
  if (expiresAt - nowS > FORM_TOKEN_MAX_TTL_SECONDS) return { ok: false, reason: 'too_long_lived' }
  if (brand !== expectedBrand) return { ok: false, reason: 'wrong_brand' }
  return { ok: true, claims: { customerId, brand, expiresAt, nonce: b64u(payload.subarray(18, 24)), purpose: flags & 1 ? 'fix' : 'form' } }
}


export function signFormToken(
  input: { customerId: string; brand: TokenBrand; ttlSeconds?: number; now?: number; purpose?: TokenPurpose },
  secret?: string,
): string | null {
  const k = key(secret)
  if (!k || !input.customerId) return null
  const now = Math.floor((input.now ?? Date.now()) / 1000)
  const compact = signCompact(k, input.customerId, input.brand, now + (input.ttlSeconds ?? FORM_TOKEN_TTL_SECONDS), input.purpose)
  if (compact) return compact
  const payload = b64u(Buffer.from(JSON.stringify({
    c: input.customerId, b: input.brand, e: now + (input.ttlSeconds ?? FORM_TOKEN_TTL_SECONDS), n: b64u(randomBytes(8)),
    ...(input.purpose === 'fix' ? { p: 'fix' } : {}),
  })))
  return `v1.${payload}.${b64u(mac(k, payload))}`
}

export function verifyFormToken(
  token: unknown,
  expectedBrand: TokenBrand,
  opts: { secret?: string; now?: number } = {},
): FormTokenResult {
  const k = key(opts.secret)
  if (!k) return { ok: false, reason: 'disabled' }
  if (typeof token !== 'string' || token.length > 512) return { ok: false, reason: 'malformed' }
  if (COMPACT_RE.test(token)) return verifyCompact(token, k, expectedBrand, Math.floor((opts.now ?? Date.now()) / 1000))
  const parts = token.split('.')
  if (parts.length !== 3 || parts[0] !== 'v1' || !/^[A-Za-z0-9_-]+$/.test(parts[1]) || !/^[A-Za-z0-9_-]+$/.test(parts[2])) {
    return { ok: false, reason: 'malformed' }
  }
  // MAC first, over the exact bytes received, before anything is parsed.
  const given = Buffer.from(parts[2], 'base64url')
  const want = mac(k, parts[1])
  if (given.length !== want.length || !timingSafeEqual(given, want)) return { ok: false, reason: 'bad_signature' }

  let p: { c?: unknown; b?: unknown; e?: unknown; n?: unknown; p?: unknown }
  try { p = JSON.parse(Buffer.from(parts[1], 'base64url').toString('utf8')) } catch { return { ok: false, reason: 'malformed' } }
  if (typeof p.c !== 'string' || !p.c || (p.b !== 'wht' && p.b !== 'svt') || typeof p.e !== 'number' || !Number.isFinite(p.e)) {
    return { ok: false, reason: 'malformed' }
  }
  const now = Math.floor((opts.now ?? Date.now()) / 1000)
  if (p.e <= now) return { ok: false, reason: 'expired' }
  if (p.e - now > FORM_TOKEN_MAX_TTL_SECONDS) return { ok: false, reason: 'too_long_lived' }
  if (p.b !== expectedBrand) return { ok: false, reason: 'wrong_brand' }
  if (typeof p.n !== 'string' || !p.n) return { ok: false, reason: 'malformed' }
  return { ok: true, claims: { customerId: p.c, brand: p.b, expiresAt: p.e, nonce: p.n, purpose: p.p === 'fix' ? 'fix' : 'form' } }
}

/**
 * The send-side entry point: sign a token for this customer and put it on every
 * form link in `body`. Returns `body` unchanged when no secret is configured, so
 * the patch is inert until FORM_TOKEN_SECRET is set.
 */
export function withFormCompletionToken(body: string, customerId: string, brand: TokenBrand, formLink: RegExp): string {
  if (!formLink.test(body)) return body
  return addTokenToFormLinks(body, signFormToken({ customerId, brand }), formLink)
}

/**
 * Add `?k=<token>` to every bare form link in an outbound WhatsApp text.
 * `formLink` is the brand's own form regex; a link that already has a query
 * string is left alone. Returns the text unchanged when no secret is set.
 */
export function addTokenToFormLinks(text: string, token: string | null, formLink: RegExp): string {
  if (!token) return text
  const g = new RegExp(formLink.source + '(?![?\\w/-])', formLink.flags.includes('g') ? formLink.flags : formLink.flags + 'g')
  return text.replace(g, (m) => `${m}?k=${token}`)
}

/** Where "this link has been used" is recorded (one Will setting per token). */
export const formTokenUsedKey = (nonce: string) => `form_token_used:${nonce}`;

/** A correction link: same signature, purpose 'fix', shorter life (7 days). */
export function signFixToken(customerId: string, brand: TokenBrand, secret?: string): string | null {
  return signFormToken({ customerId, brand, purpose: 'fix', ttlSeconds: 7 * 24 * 60 * 60 }, secret)
}
