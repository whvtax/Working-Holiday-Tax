// src/lib/supabase.ts
// ──────────────────────────────────────────────────────────────────────────
// Supabase client - server-side only (uses service role key)
// Used by API routes for CRM operations and file uploads.
// ──────────────────────────────────────────────────────────────────────────

import { createClient, SupabaseClient } from '@supabase/supabase-js'

let _supabase: SupabaseClient | null = null

/**
 * Returns a singleton Supabase client configured with service role permissions.
 * Service role bypasses Row-Level Security and is for server-side use only.
 *
 * Required env vars:
 *   - NEXT_PUBLIC_SUPABASE_URL: e.g. https://xxxxx.supabase.co
 *   - SUPABASE_SERVICE_ROLE_KEY: secret service role key (never expose to client)
 */
export function getSupabase(): SupabaseClient {
  if (_supabase) return _supabase

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url) throw new Error('Missing env var: NEXT_PUBLIC_SUPABASE_URL')
  if (!key) throw new Error('Missing env var: SUPABASE_SERVICE_ROLE_KEY')

  _supabase = createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
    global: {
      // CRITICAL: explicitly disable caching on every request this client
      // makes. We were relying on each route's `dynamic = 'force-dynamic'`
      // export to propagate Next.js's no-store behaviour down into
      // @supabase/supabase-js's internal fetch calls, but evidence from
      // production (identical requests returning stale results only for
      // certain column selections, unaffected by redeploys, env var
      // changes, or a PostgREST schema cache reload) points to those
      // internal fetches being cached somewhere outside our route's
      // control. Forcing `cache: 'no-store'` here removes that layer
      // entirely, regardless of the cause.
      fetch: (input: RequestInfo | URL, init?: RequestInit) =>
        fetch(input, { ...init, cache: 'no-store' }),
    },
  })

  return _supabase
}

/**
 * Storage bucket names. Created once in Supabase dashboard.
 */
export const STORAGE_BUCKETS = {
  uploads: 'uploads', // form submissions: TFN, ABN, tax, super
} as const

/**
 * FAIL-CLOSED bucket-privacy guard.
 * The "uploads" bucket holds identity documents (passports, selfies, bank
 * details) and MUST be private - files are served only to authenticated CRM
 * sessions via /api/crm/file. Previously this relied solely on a manual
 * dashboard checklist step; if anyone flipped the bucket to public, every
 * document would be reachable by URL with no auth.
 *
 * This asserts the bucket is private at runtime and refuses to upload if it is
 * not. Result is cached for the warm instance lifetime so it costs one extra
 * call per cold start. Fails CLOSED: any uncertainty (public bucket, or an
 * error reading bucket metadata) throws and blocks the upload.
 */
let _bucketPrivacyVerified = false
export async function assertUploadsBucketPrivate(): Promise<void> {
  if (_bucketPrivacyVerified) return
  const sb = getSupabase()
  const { data, error } = await sb.storage.getBucket(STORAGE_BUCKETS.uploads)
  if (error || !data) {
    throw new Error(`Cannot verify uploads bucket privacy: ${error?.message ?? 'bucket not found'}`)
  }
  if (data.public) {
    // Fail closed - never upload sensitive identity docs into a public bucket.
    throw new Error('SECURITY: "uploads" bucket is PUBLIC. It must be private. Aborting upload.')
  }
  _bucketPrivacyVerified = true
}

/**
 * Returns true if URL points at an object in OUR Supabase Storage "uploads"
 * bucket. Accepts public, signed and neutral object paths - the stored value
 * is only used as a reference key (files are streamed via /api/crm/file using
 * the service role), so we must not *depend* on the "public" path segment.
 * Used to validate URLs received from clients before storing in DB (anti-SSRF).
 */
export function isValidSupabaseStorageUrl(url: string): boolean {
  if (typeof url !== 'string' || !url.startsWith('https://')) return false
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  if (!supabaseUrl) return false
  const bucket = STORAGE_BUCKETS.uploads
  const validPrefixes = [
    `/storage/v1/object/public/${bucket}/`,
    `/storage/v1/object/sign/${bucket}/`,
    `/storage/v1/object/${bucket}/`,
  ]
  try {
    const u = new URL(url)
    const allowed = new URL(supabaseUrl)
    if (u.hostname !== allowed.hostname) return false
    // A traversal SEGMENT, not any two dots: a customer file name such as
    // "scan..pdf" is legitimate and used to be dropped silently by this check.
    if (/(^|\/)\.{1,2}(\/|$)/.test(u.pathname)) return false
    return validPrefixes.some(p => u.pathname.startsWith(p))
  } catch { return false }
}

/**
 * Stricter variant for URLs that arrive on the PUBLIC, unauthenticated tax-form
 * submission (`invoiceUrls`).
 *
 * `isValidSupabaseStorageUrl` accepts ANY object in the uploads bucket, which is
 * right for staff-entered tasks but too wide for an anonymous caller: the
 * bucket also holds every other customer's passport, bank statement and
 * TFN/ABN/super-form upload, and a URL stored on a task is later used as the key
 * for CRM file access and for deletion when the task is marked done. So a
 * public submission may only reference objects the public upload endpoint
 * itself creates for this brand (`tax-form/...`, or `svt/tax-form/...`), reached
 * through the public object path that endpoint returns.
 *
 * The URL parser collapses `.` / `..` / `%2e` segments, so the prefix is checked
 * on the normalised path; the raw string is also refused if it still carries a
 * traversal marker, a query, a fragment or a backslash, because the RAW string
 * is what gets stored.
 */
export function isPublicFormUploadUrl(url: string, brand: 'wht' | 'svt'): boolean {
  if (!isValidSupabaseStorageUrl(url)) return false
  if (/(\/\.{1,2}(\/|$)|%2e|%2f|%5c|\\|\?|#)/i.test(url)) return false
  const folder = brand === 'svt' ? 'svt/tax-form/' : 'tax-form/'
  try {
    const u = new URL(url)
    return u.pathname.startsWith(`/storage/v1/object/public/${STORAGE_BUCKETS.uploads}/${folder}`)
  } catch { return false }
}
