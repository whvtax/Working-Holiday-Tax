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
    if (u.pathname.includes('..')) return false
    return validPrefixes.some(p => u.pathname.startsWith(p))
  } catch { return false }
}
