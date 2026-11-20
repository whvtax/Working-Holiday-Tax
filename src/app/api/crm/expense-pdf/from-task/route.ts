export const runtime = 'nodejs'
// POST /api/crm/expense-pdf/from-task  body: { taskId }
// Internal only, CRM session required. Reads the invoice files on one CRM task,
// has the model read each one, and saves one PDF per tax year and kind under
// will-internal/. Nothing is shown to the customer, and nothing is deleted.
import { NextRequest, NextResponse } from 'next/server'
import { validateSessionFresh } from '@/lib/crm-store'
import { getSupabase, STORAGE_BUCKETS } from '@/lib/supabase'
import { recordDataRead, shortHash } from '@/lib/will/access-log'
import { storagePathFromUrl } from '@/lib/orphan-uploads'
import { extractInvoice } from '@/lib/will/invoice-extract'
import { buildYearPdfs, type SourceFile } from '@/lib/will/expense-from-task'

const ID_RE = /^[A-Za-z0-9_-]{1,80}$/
const MAX_FILES = 50

function mimeFromPath(path: string): string | null {
  const ext = path.split('.').pop()?.toLowerCase() ?? ''
  if (ext === 'pdf') return 'application/pdf'
  if (ext === 'png') return 'image/png'
  if (ext === 'jpg' || ext === 'jpeg') return 'image/jpeg'
  if (ext === 'webp') return 'image/webp'
  return null
}

export async function POST(req: NextRequest) {
  if (!(await validateSessionFresh(req.cookies.get('crm_session')?.value))) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }
  let body: Record<string, unknown>
  try { body = (await req.json()) as Record<string, unknown> } catch {
    return NextResponse.json({ error: 'invalid json' }, { status: 400 })
  }
  const taskId = typeof body.taskId === 'string' || typeof body.taskId === 'number' ? String(body.taskId) : ''
  if (!ID_RE.test(taskId)) return NextResponse.json({ error: 'bad taskId' }, { status: 400 })

  const sb = getSupabase()
  const { data: task, error } = await sb.from('crm_tasks').select('id,file_urls').eq('id', taskId).maybeSingle()
  if (error || !task) return NextResponse.json({ error: 'not found' }, { status: 404 })

  let urls: string[] = []
  try {
    const parsed = JSON.parse((task as { file_urls?: string | null }).file_urls ?? '[]')
    if (Array.isArray(parsed)) urls = parsed.filter((u): u is string => typeof u === 'string')
  } catch { urls = [] }

  const files: SourceFile[] = []
  const skipped: string[] = []
  for (const url of urls.slice(0, MAX_FILES)) {
    const path = storagePathFromUrl(url, STORAGE_BUCKETS.uploads)
    const mime = path ? mimeFromPath(path) : null
    if (!path || !mime) { skipped.push(path ?? 'unknown file'); continue }
    const { data, error: dlErr } = await sb.storage.from(STORAGE_BUCKETS.uploads).download(path)
    if (dlErr || !data) { skipped.push(path); continue }
    files.push({ name: path.split('/').pop() ?? 'file', bytes: await data.arrayBuffer(), mime })
  }

  try {
    const { built, unread } = await buildYearPdfs({
      customerId: taskId,
      files,
      extract: (bytes, mime) => extractInvoice(bytes, mime),
      upload: async (p, bytes, contentType) => {
        const { error: upErr } = await sb.storage.from(STORAGE_BUCKETS.uploads).upload(p, bytes, { contentType, upsert: true })
        if (upErr) throw new Error('upload failed')
      },
    })
    await recordDataRead(req, 'crm_file', { action: 'expense_pdf_from_task', taskHash: shortHash(taskId), built: built.length })
    const base = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
    const links = built.map((b) => ({
      label: `${b.category} ${b.taxYear} (${b.count})`,
      href: `/api/crm/file?url=${encodeURIComponent(`${base}/storage/v1/object/uploads/${b.path}`)}`,
    }))
    return NextResponse.json({ ok: true, built, links, unread, skipped })
  } catch {
    return NextResponse.json({ error: 'build failed' }, { status: 500 })
  }
}
