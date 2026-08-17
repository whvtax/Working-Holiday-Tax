export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { validateSession } from '@/lib/crm-store'
import { getLeads, setLeadUnsubscribed } from '@/lib/leads'

function auth(req: NextRequest) {
  return validateSession(req.cookies.get('crm_session')?.value)
}

/**
 * GET /api/crm/leads          → JSON, for the Leads tab
 * GET /api/crm/leads?csv=1    → CSV download, opens straight in Excel
 */
export async function GET(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ ok: false }, { status: 401 })

  try {
    const leads = await getLeads()
    const wantsCsv = new URL(req.url).searchParams.get('csv') === '1'

    if (!wantsCsv) {
      return NextResponse.json({ ok: true, leads, total: leads.length })
    }

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
    console.error('[crm/leads GET]', err)
    return NextResponse.json({ ok: false, error: 'read_failed' }, { status: 500 })
  }
}

/** POST — opt someone in or out. Body: { email, unsubscribed } */
export async function POST(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ ok: false }, { status: 401 })

  try {
    const body = await req.json().catch(() => ({}))
    if (typeof body.email !== 'string' || typeof body.unsubscribed !== 'boolean') {
      return NextResponse.json({ ok: false, error: 'invalid_body' }, { status: 400 })
    }
    await setLeadUnsubscribed(body.email, body.unsubscribed)
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[crm/leads POST]', err)
    return NextResponse.json({ ok: false, error: 'write_failed' }, { status: 500 })
  }
}

/**
 * Escapes one CSV cell.
 *
 * The leading-character guard matters: a name starting with =, +, - or @ is
 * interpreted as a formula by Excel, which is both a display bug and a known
 * injection vector. Prefixing a quote makes Excel treat it as text.
 */
function csvCell(value: string): string {
  const v = String(value ?? '')
  const guarded = /^[=+\-@\t\r]/.test(v) ? `'${v}` : v
  return `"${guarded.replace(/"/g, '""')}"`
}
