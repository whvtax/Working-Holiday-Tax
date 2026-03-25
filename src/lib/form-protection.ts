/**
 * form-protection.ts
 * Server-side utilities for public form submissions:
 *   - In-memory rate limiting per IP (falls back gracefully if IP unavailable)
 *   - Input sanitization / length capping
 *   - Honeypot field check
 *   - Basic field validation (email, phone, date)
 */

import { NextRequest } from 'next/server'

// ── Rate limiting ──────────────────────────────────────────────────────────
// Simple sliding-window counter stored in module memory.
// On Vercel each serverless instance tracks its own window; this is
// intentional — it limits per-instance burst while remaining stateless.
// For strict global rate limiting, replace with a Redis counter.

type RateBucket = { count: number; windowStart: number }
const rateBuckets = new Map<string, RateBucket>()

const RATE_WINDOW_MS   = 60 * 1000  // 1 minute window
const RATE_MAX_PER_IP  = 5           // max submissions per IP per window

/** Returns true if the IP is over the rate limit. */
export function isRateLimited(req: NextRequest): boolean {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    'unknown'

  const now    = Date.now()
  const bucket = rateBuckets.get(ip)

  if (!bucket || now - bucket.windowStart > RATE_WINDOW_MS) {
    // Start a new window
    rateBuckets.set(ip, { count: 1, windowStart: now })
    return false
  }

  bucket.count++
  if (bucket.count > RATE_MAX_PER_IP) return true

  return false
}

// ── Honeypot check ─────────────────────────────────────────────────────────

/**
 * Returns true if the honeypot field is filled (bot signal).
 * The honeypot field must be named "website" in the form and kept hidden via CSS.
 */
export function isHoneypotFilled(formData: FormData): boolean {
  const honeypot = formData.get('website')
  return typeof honeypot === 'string' && honeypot.trim().length > 0
}

// ── Sanitization ───────────────────────────────────────────────────────────

/** Strip control characters and limit string length. */
export function sanitizeString(value: unknown, maxLength = 500): string {
  if (typeof value !== 'string') return ''
  // Strip null bytes and other control characters (keep tabs/newlines for notes)
  // eslint-disable-next-line no-control-regex
  return value.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '').slice(0, maxLength)
}

// ── Validators ─────────────────────────────────────────────────────────────

const EMAIL_RE   = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const PHONE_RE   = /^\+?[\d\s\-().]{7,20}$/
const DATE_RE    = /^\d{4}-\d{2}-\d{2}$/

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

// ── Form field extraction ──────────────────────────────────────────────────

/** Safe helper: get a sanitized string field from FormData. */
export function getField(formData: FormData, key: string, maxLength = 500): string {
  return sanitizeString(formData.get(key), maxLength)
}

// ── File upload validation ─────────────────────────────────────────────────

/** Allowed MIME types for uploaded files */
const ALLOWED_MIME_TYPES = new Set([
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/heic',
  'image/heif',
  'application/pdf',
])

/** Magic byte signatures for allowed file types */
const MAGIC_SIGNATURES: Array<{ bytes: number[]; mime: string }> = [
  { bytes: [0xFF, 0xD8, 0xFF],             mime: 'image/jpeg' },   // JPEG
  { bytes: [0x89, 0x50, 0x4E, 0x47],       mime: 'image/png'  },   // PNG
  { bytes: [0x52, 0x49, 0x46, 0x46],       mime: 'image/webp' },   // WEBP (RIFF header)
  { bytes: [0x25, 0x50, 0x44, 0x46],       mime: 'application/pdf' }, // PDF (%PDF)
]

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024 // 10 MB

export type FileValidationResult =
  | { ok: true }
  | { ok: false; reason: string }

/**
 * Validates an uploaded File object:
 *   1. Checks the declared MIME type against the allowlist.
 *   2. Reads the first 8 bytes and checks magic byte signatures.
 *   3. Enforces a 10 MB size limit.
 *
 * Must be called in a server action or API route — never client-side only.
 */
export async function validateUploadedFile(file: File): Promise<FileValidationResult> {
  // 1. Size check
  if (file.size > MAX_FILE_SIZE_BYTES) {
    return { ok: false, reason: `File too large. Maximum size is ${MAX_FILE_SIZE_BYTES / 1024 / 1024} MB.` }
  }

  if (file.size === 0) {
    return { ok: false, reason: 'File is empty.' }
  }

  // 2. Declared MIME type check
  const declaredMime = file.type.toLowerCase()
  if (!ALLOWED_MIME_TYPES.has(declaredMime)) {
    return { ok: false, reason: 'Invalid file type. Only images (JPEG, PNG, WEBP, HEIC) and PDF are allowed.' }
  }

  // 3. Magic byte check — read first 8 bytes and verify signature
  try {
    const slice = file.slice(0, 8)
    const buffer = await slice.arrayBuffer()
    const bytes = new Uint8Array(buffer)

    const signatureMatch = MAGIC_SIGNATURES.some(sig =>
      sig.bytes.every((b, i) => bytes[i] === b)
    )

    // HEIC/HEIF: magic bytes are at offset 4 ('ftyp'), more complex — skip deep check
    // but still accept if declared MIME is heic/heif and file is non-empty (checked above)
    const isHeic = declaredMime === 'image/heic' || declaredMime === 'image/heif'

    if (!signatureMatch && !isHeic) {
      return { ok: false, reason: 'File content does not match its declared type. Upload may be corrupted or disguised.' }
    }
  } catch {
    return { ok: false, reason: 'Could not read file for validation.' }
  }

  return { ok: true }
}
