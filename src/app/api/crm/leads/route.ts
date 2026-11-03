export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { recordDataRead } from '@/lib/will/access-log'
import { validateSessionFresh } from '@/lib/crm-store'
import { getLeads, setLeadUnsubscribed } from '@/lib/leads'
import { safeErr } from '@/lib/log-safe'
import { csvCell } from '@/lib/csv'

function auth(req: NextRequest) {
  return validateSessionFresh(req.cookies.get('crm_session')?.value)
}

/**
 * GET /api/crm/leads          → JSON, for the Leads tab
 * GET /api/crm/leads?csv=1    → CSV download, opens straight in Excel
 */
export async function GET(req: NextRequest) {
  if (!(await auth(req))) return NextResponse.json({ ok: false }, { status: 401 })

  try {
    const leads = await getLeads()
    const wantsCsv = new URL(req.url).searchParams.get('csv') === '1'

    if (!wantsCsv) {
      return NextResponse.json({ ok: true, leads, total: leads.length })
    }
    // Every lead's name, email and WhatsApp number leaves in one file: on the record (no values logged).
    await recordDataRead(req, 'leads_csv', { csv: true })

    // AUTH2-07: leave a trace of bulk downloads (best effort).
    try {
      const { getStore } = await import('@/lib/will/store')
      await getStore().audit('owner', 'bulk_export_downloaded', { kind: 'crm_leads_csv', rows: leads.length })
    } catch { /* never blocks the export */ }

    const header = ['Full name', 'Email', 'WhatsApp', 'Language', 'Source', 'Joined', 'Unsubscribed']
    const rows = leads.map(l => [
      l.fullName,
      l.email,
      // Leading apostrophe via csvCell's guard keeps Excel from turning
      // "+61424513998" into a formula or stripping the plus.
      l.whatsapp,
      l.lang,
      l.source,
      l.createdAt ? l.createdAt.slice(0, 10) : '',
      l.unsubscribed ? 'Yes' : '',
    ])

    const csv = [header, ...rows].map(r => r.map(csvCell).join(',')).join('\r\n')

    return new NextResponse(
      // UTF-8 BOM: without it Excel on Windows mangles accented names like
      // "Inès" and any Japanese text.
      '\uFEFF' + csv,
      {
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': `attachment; filename="leads_${new Date().toISOString().slice(0, 10)}.csv"`,
          'Cache-Control': 'no-store',
        },
      },
    )
  } catch (err) {
    console.error('[crm/leads GET]', safeErr(err))
    // Surface the real reason. This route is behind CRM auth, and a generic
    // "could not load" leaves you guessing between a missing table, a
    // permissions problem and a network fault.
    const message = err instanceof Error ? err.message : String(err)
    const missingTable = /relation .*crm_leads.* does not exist|schema cache/i.test(message)
    return NextResponse.json({
      ok: false,
      error: missingTable ? 'table_missing' : 'read_failed',
      detail: message,
    }, { status: 500 })
  }
}

/** POST - opt someone in or out. Body: { email, unsubscribed } */
export async function POST(req: NextRequest) {
  if (!(await auth(req))) return NextResponse.json({ ok: false }, { status: 401 })

  try {
    const body = await req.json().catch(() => ({}))
    if (typeof body.email !== 'string' || typeof body.unsubscribed !== 'boolean') {
      return NextResponse.json({ ok: false, error: 'invalid_body' }, { status: 400 })
    }
    await setLeadUnsubscribed(body.email, body.unsubscribed)
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[crm/leads POST]', safeErr(err))
    return NextResponse.json({ ok: false, error: 'write_failed' }, { status: 500 })
  }
}
