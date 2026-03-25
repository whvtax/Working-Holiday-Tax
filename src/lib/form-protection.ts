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
