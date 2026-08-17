export const runtime = 'nodejs'
export const maxDuration = 60
export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { isRateLimited } from '@/lib/rate-limit'
import { getClientIp } from '@/lib/get-ip'
import { sanitiseField, sanitiseShort } from '@/lib/sanitise'
import { getSupabase, isValidSupabaseStorageUrl } from '@/lib/supabase'
import { resolveCompletionToken } from '@/lib/intake'

/**
 * GET /api/complete/<token>
 *
 * Tells form 2 whether the link is live, and who it belongs to - first name
 * and interface language, nothing more. Anything already on file stays on the
 * server: whoever holds this link should be able to *add* details, never to
 * *read* them.
 */
export async function GET(req: NextRequest, { params }: { params: Promise<{ token: string }> }) {
  // Rate limited as well as the POST. A 96-bit token isn't guessable, but an
  // unmetered lookup endpoint is still free reconnaissance.
  if (await isRateLimited(getClientIp(req), 'complete-lookup')) {
    return NextResponse.json({ ok: false, reason: 'rate_limited' }, { status: 429 })
  }

  const { token } = await params
  const state = await resolveCompletionToken(token)

  if (state.status !== 'ok') {
    return NextResponse.json({ ok: false, reason: state.status }, { status: 404 })
  }
  return NextResponse.json(
    { ok: true, firstName: state.firstName, lang: state.lang },
    { headers: { 'Cache-Control': 'no-store' } },
  )
}

/**
 * POST /api/complete/<token> - form 2.
 *
 * Merges the remaining fields into the SAME task form 1 created and promotes it
 * from 'lead' to 'tax-return', so the finished record is identical in shape to
 * one made through the original form - including the CRM download.
 *
 * Last value wins. Since form 2 can't be submitted with an empty field, an
 * empty value never overwrites a filled one. Anything that does change is
 * appended to notes with the old value, so a later dispute is answerable.
 */
export async function POST(req: NextRequest, { params }: { params: Promise<{ token: string }> }) {
  try {
    const ip = getClientIp(req)
    if (await isRateLimited(ip, 'complete-form')) {
      return NextResponse.json({ ok: false, error: 'rate_limited' }, { status: 429 })
    }

    const { token } = await params
    const state = await resolveCompletionToken(token)
    if (state.status !== 'ok') {
      return NextResponse.json({ ok: false, error: state.status }, { status: 404 })
    }

    const sb = getSupabase()
    const { data: existing, error: readErr } = await sb
      .from('crm_tasks')
      .select('notes, file_urls, address, marital, primary_job, how_heard, au_phone, email')
      .eq('id', state.taskId)
      .single()
    if (readErr || !existing) {
      return NextResponse.json({ ok: false, error: 'not_found' }, { status: 404 })
    }

    const formData = await req.formData()
    const email      = sanitiseShort(formData.get('email'))
    const auPhone    = sanitiseShort(formData.get('auPhone'))
    const address    = sanitiseField(formData.get('address'))
    const marital    = sanitiseShort(formData.get('marital'))
    const primaryJob = sanitiseField(formData.get('primaryJob'))
    const howHeard   = sanitiseShort(formData.get('howHeard'))
    const taxStatus  = sanitiseShort(formData.get('taxStatus'))
    const declared   = sanitiseField(formData.get('declared'))

    if (!email || !auPhone || !address || !taxStatus) {
      return NextResponse.json({ ok: false, error: 'missing_required_fields' }, { status: 400 })
    }

    // submitTaxForm posts the uploaded URLs under 'invoiceUrls' (the name the
    // original form has always used) - not 'fileUrls'. Reading the wrong key
    // silently loses the bank statement.
    const newFiles: string[] = (() => {
      const raw = formData.get('invoiceUrls')
      if (typeof raw !== 'string') return []
      try {
        const parsed: unknown = JSON.parse(raw)
        if (!Array.isArray(parsed)) return []
        return parsed.slice(0, 20).filter((u): u is string => typeof u === 'string')
      } catch { return [] }
    })().filter(isValidSupabaseStorageUrl)

    // Keep the selfie from form 1 alongside whatever form 2 added.
    const prevFiles: string[] = (() => {
      try {
        const p = JSON.parse((existing.file_urls as string) ?? '[]')
        return Array.isArray(p) ? p.filter((u): u is string => typeof u === 'string') : []
      } catch { return [] }
    })()
    const fileUrls = Array.from(new Set([...prevFiles, ...newFiles])).slice(0, 30)

    // Record only genuine changes, so the trail stays readable.
    const changes: string[] = []
    const track = (label: string, before: unknown, after: string) => {
      const b = String(before ?? '').trim()
      if (b && b !== after) changes.push(`${label}: "${b}" → "${after}"`)
    }
    track('Email', existing.email, email)
    track('AU phone', existing.au_phone, auPhone)
    track('Address', existing.address, address)
    track('Marital', existing.marital, marital)
    track('Job', existing.primary_job, primaryJob)

    const notes = [
      existing.notes as string,
      taxStatus ? `→ ${taxStatus}` : '',
      declared ? `→ ${declared}` : '',
      `✅ Form 2 completed ${new Date().toISOString().slice(0, 10)}`,
      changes.length ? `✏️ Updated — ${changes.join('; ')}` : '',
    ].filter(Boolean).join(' | ')

    const { error: updErr } = await sb
      .from('crm_tasks')
      .update({
        task_type:   'tax-return',
        email,
        au_phone:    auPhone,
        address,
        marital,
        primary_job: primaryJob,
        how_heard:   howHeard,
        tax_status:  taxStatus,
        notes,
        file_urls:   JSON.stringify(fileUrls),
        // Single use: the link dies the moment it's submitted.
        completion_token: null,
        token_used_at: new Date().toISOString(),
      })
      .eq('id', state.taskId)

    if (updErr) throw updErr

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[complete] FAILED:', err)
    return NextResponse.json({ ok: false, error: 'submission_failed' }, { status: 500 })
  }
}
