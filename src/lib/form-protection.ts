/**
 * form-protection.ts — SECURITY FIXES:
 *   - Rate limiting moved to Redis (global across all serverless instances)
 *   - isValidPhone() is now exported AND used (was defined but never called)
 *   - TFN format validation added (Australian format: NNN NNN NNN)
 *   - HEIC/HEIF magic-byte check implemented (ftyp box at offset 4)
 *   - Rate limit check falls back to in-memory if Redis unavailable
 */

import { NextRequest } from 'next/server'
import { createClient } from 'redis'

// ── Rate limiting — Redis-backed (global across instances) ─────────────────

const RATE_WINDOW_SECS = 60
const RATE_MAX_PER_IP  = 5

// In-memory fallback if Redis is unavailable
type RateBucket = { count: number; windowStart: number }
const fallbackBuckets = new Map<string, RateBucket>()

async function isRateLimitedRedis(ip: string): Promise<boolean> {
  let redis
  try {
    redis = createClient({ url: process.env.REDIS_URL })
    await redis.connect()
    const key   = `form_rate:${ip}`
    const count = await redis.incr(key)
    if (count === 1) await redis.expire(key, RATE_WINDOW_SECS)
    return count > RATE_MAX_PER_IP
  } catch {
    return false  // Redis unavailable — fall through to in-memory
  } finally {
    try { if (redis) await redis.disconnect() } catch {}
  }
}

function isRateLimitedMemory(ip: string): boolean {
  const now    = Date.now()
  const bucket = fallbackBuckets.get(ip)
  if (!bucket || now - bucket.windowStart > RATE_WINDOW_SECS * 1000) {
    fallbackBuckets.set(ip, { count: 1, windowStart: now })
    return false
  }
  bucket.count++
  return bucket.count > RATE_MAX_PER_IP
}

export async function isRateLimited(req: NextRequest): Promise<boolean> {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    'unknown'

  if (process.env.REDIS_URL) {
    const limited = await isRateLimitedRedis(ip)
    if (limited) return true
    // Also apply in-memory as secondary guard
  }
  return isRateLimitedMemory(ip)
}

// ── Honeypot check ─────────────────────────────────────────────────────────

export function isHoneypotFilled(formData: FormData): boolean {
  const honeypot = formData.get('website')
  return typeof honeypot === 'string' && honeypot.trim().length > 0
}

// ── Sanitization ───────────────────────────────────────────────────────────

export function sanitizeString(value: unknown, maxLength = 500): string {
  if (typeof value !== 'string') return ''
  // eslint-disable-next-line no-control-regex
  return value.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '').slice(0, maxLength)
}

// ── Validators ─────────────────────────────────────────────────────────────

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const PHONE_RE = /^\+?[\d\s\-().]{7,20}$/
const DATE_RE  = /^\d{4}-\d{2}-\d{2}$/
const TFN_RE   = /^\d{3}\s\d{3}\s\d{3}$|^\d{8,9}$/  // NNN NNN NNN or 8-9 digits

export function isValidEmail(v: string): boolean {
  return EMAIL_RE.test(v.trim())
}

export function isValidPhone(v: string): boolean {
  return v.trim() === '' || PHONE_RE.test(v.trim())
}

export function isValidDate(v: string): boolean {
  if (!DATE_RE.test(v)) return false
  const d = new Date(v)
  return !isNaN(d.getTime())
}

export function isValidTfn(v: string): boolean {
  return v.trim() === '' || TFN_RE.test(v.trim())
}

// ── Form field extraction ──────────────────────────────────────────────────

export function getField(formData: FormData, key: string, maxLength = 500): string {
  return sanitizeString(formData.get(key), maxLength)
}

// ── File upload validation ─────────────────────────────────────────────────

const ALLOWED_MIME_TYPES = new Set([
  'image/jpeg', 'image/jpg', 'image/png', 'image/webp',
  'image/heic', 'image/heif', 'application/pdf',
])

const MAGIC_SIGNATURES: Array<{ bytes: number[]; mime: string }> = [
  { bytes: [0xFF, 0xD8, 0xFF],             mime: 'image/jpeg' },
  { bytes: [0x89, 0x50, 0x4E, 0x47],       mime: 'image/png'  },
  { bytes: [0x52, 0x49, 0x46, 0x46],       mime: 'image/webp' },
  { bytes: [0x25, 0x50, 0x44, 0x46],       mime: 'application/pdf' },
]

// HEIC/HEIF: ftyp box starts at byte offset 4 (bytes 4-7 = 0x66 0x74 0x79 0x70)
const FTYP_SIGNATURE = [0x66, 0x74, 0x79, 0x70]  // 'ftyp' in ASCII

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024 // 10 MB

export type FileValidationResult = { ok: true } | { ok: false; reason: string }

export async function validateUploadedFile(file: File): Promise<FileValidationResult> {
  if (file.size > MAX_FILE_SIZE_BYTES) {
    return { ok: false, reason: `File too large. Maximum size is ${MAX_FILE_SIZE_BYTES / 1024 / 1024} MB.` }
  }
  if (file.size === 0) {
    return { ok: false, reason: 'File is empty.' }
  }

  const declaredMime = file.type.toLowerCase()
  if (!ALLOWED_MIME_TYPES.has(declaredMime)) {
    return { ok: false, reason: 'Invalid file type. Only images (JPEG, PNG, WEBP, HEIC) and PDF are allowed.' }
  }

  try {
    // Read first 12 bytes — enough for JPEG/PNG/WEBP/PDF + HEIC ftyp at offset 4
    const slice  = file.slice(0, 12)
    const buffer = await slice.arrayBuffer()
    const bytes  = new Uint8Array(buffer)

    const isHeic = declaredMime === 'image/heic' || declaredMime === 'image/heif'

    if (isHeic) {
      // HEIC/HEIF: check ftyp box at offset 4
      const ftypMatch = FTYP_SIGNATURE.every((b, i) => bytes[4 + i] === b)
      if (!ftypMatch) {
        return { ok: false, reason: 'File content does not match HEIC/HEIF format.' }
      }
    } else {
      const signatureMatch = MAGIC_SIGNATURES.some(sig =>
        sig.bytes.every((b, i) => bytes[i] === b)
      )
      if (!signatureMatch) {
        return { ok: false, reason: 'File content does not match its declared type. Upload may be corrupted or disguised.' }
      }
    }
  } catch {
    return { ok: false, reason: 'Could not read file for validation.' }
  }

  return { ok: true }
}
