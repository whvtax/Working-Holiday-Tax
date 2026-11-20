export const runtime = 'nodejs'
// POST /api/crm/expense-pdf
// Internal only. Builds one category PDF for a customer and tax year from the
// rows Jo types in, and saves it under will-internal/ in the private uploads
// bucket. Requires a valid CRM session. The storage path is built here, never
// taken from the request, so a caller cannot write to any other location.
import { NextRequest, NextResponse } from 'next/server'
import { validateSessionFresh } from '@/lib/crm-store'
import { getSupabase, STORAGE_BUCKETS } from '@/lib/supabase'
import { recordDataRead, shortHash } from '@/lib/will/access-log'
import { saveCategoryPdf, parseItems } from '@/lib/will/expense-pdf'

const ID_RE = /^[A-Za-z0-9_-]{1,80}$/
const YEAR_RE = /^\d{4}-\d{2}$/

export async function POST(req: NextRequest) {
  if (!(await validateSessionFresh(req.cookies.get('crm_session')?.value))) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }
  let body: Record<string, unknown>
  try {
    body = (await req.json()) as Record<string, unknown>
  } catch {
    return NextResponse.json({ error: 'invalid json' }, { status: 400 })
  }
  const customerId = typeof body.customerId === 'string' ? body.customerId : ''
  const taxYear = typeof body.taxYear === 'string' ? body.taxYear : ''
  const category = typeof body.category === 'string' ? body.category.trim() : ''
  if (!ID_RE.test(customerId)) return NextResponse.json({ error: 'bad customerId' }, { status: 400 })
  if (!YEAR_RE.test(taxYear)) return NextResponse.json({ error: 'bad taxYear' }, { status: 400 })
  if (category.length < 1 || category.length > 60) return NextResponse.json({ error: 'bad category' }, { status: 400 })

  const parsed = parseItems(body.items)
  if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 400 })

  const sb = getSupabase()
  try {
    const { path, skippedReceipts } = await saveCategoryPdf(
      async (p, bytes, contentType) => {
        const { error } = await sb.storage
          .from(STORAGE_BUCKETS.uploads)
          .upload(p, bytes, { contentType, upsert: true })
        if (error) throw new Error('upload failed')
      },
      { category, taxYear, customerId, items: parsed.items },
    )
    // Customer data went into this file: log who built it (hash of the path, never the path).
    await recordDataRead(req, 'crm_file', { action: 'expense_pdf', pathHash: shortHash(path) })
    return NextResponse.json({ ok: true, path, skippedReceipts })
  } catch {
    return NextResponse.json({ error: 'save failed' }, { status: 500 })
  }
}
