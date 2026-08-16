export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { getSupabase } from '@/lib/supabase'

/**
 * GET /api/form-settings
 *
 * Public, read-only. The tax form calls this at the moment Submit is pressed
 * to find out whether working-holiday-maker submissions are currently open
 * (see migration 014). Read at submit time rather than page load so flipping
 * the switch in the CRM takes effect immediately, without the client
 * reloading anything.
 *
 * Exposes one boolean and nothing else - no counts, no timestamps, no
 * operator name - since this endpoint is reachable by anyone.
 *
 * Fails closed: if the row or the database is unreachable we report the
 * default (blocked). Letting an unwanted submission through on a database
 * hiccup is worse than telling one eligible client to try again.
 */
export async function GET() {
  try {
    const sb = getSupabase()
    const { data, error } = await sb
      .from('form_settings')
      .select('allow_whm_submissions')
      .eq('id', 1)
      .single()

    if (error) throw error

    return NextResponse.json(
      { ok: true, allowWhmSubmissions: data?.allow_whm_submissions === true },
      { headers: { 'Cache-Control': 'no-store' } },
    )
  } catch (err) {
    console.error('[form-settings]', err)
    return NextResponse.json(
      { ok: true, allowWhmSubmissions: false },
      { headers: { 'Cache-Control': 'no-store' } },
    )
  }
}
