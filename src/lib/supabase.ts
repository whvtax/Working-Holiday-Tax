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
 * Returns true if URL is from our Supabase Storage public bucket.
 * Used to validate URLs received from clients before storing in DB.
 */
export function isValidSupabaseStorageUrl(url: string): boolean {
  if (typeof url !== 'string' || !url.startsWith('https://')) return false
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  if (!supabaseUrl) return false
  try {
    const u = new URL(url)
    const allowed = new URL(supabaseUrl)
    return u.hostname === allowed.hostname && u.pathname.startsWith('/storage/v1/object/public/uploads/')
  } catch { return false }
}
