/**
 * /api/crm/clients/[id]/files
 * GET    — list files for a client
 * POST   — upload a new file (multipart/form-data, fields: "file", "label")
 * DELETE — delete a file by id (body: { fileId })
 *
 * SECURITY:
 *   - All methods require auth + CSRF (DELETE/POST) or auth (GET)
 *   - params.id validated against safe-chars regex
 *   - File validated via validateUploadedFile() — magic bytes + size + MIME
 *   - Blob stored in Vercel Blob (BLOB_READ_WRITE_TOKEN required)
 *   - DELETE verifies file belongs to this client before deleting
 */
import { NextRequest, NextResponse } from 'next/server'
import { requireAuth, requireAuthAndCsrf } from '@/lib/auth'
import { validateUploadedFile } from '@/lib/form-protection'
import { put, del } from '@vercel/blob'
import { sql } from '@vercel/postgres'
import { randomUUID } from 'crypto'

const SAFE_ID_RE = /^[A-Za-z0-9_-]+$/
const MAX_LABEL  = 100

async function ensureFilesTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS crm_client_files (
      id          TEXT PRIMARY KEY,
      client_id   TEXT NOT NULL,
      blob_url    TEXT NOT NULL,
      label       TEXT NOT NULL DEFAULT '',
      file_name   TEXT NOT NULL DEFAULT '',
      file_size   INTEGER NOT NULL DEFAULT 0,
      mime_type   TEXT NOT NULL DEFAULT '',
      uploaded_at TEXT NOT NULL DEFAULT ''
    )
  `
  await sql`CREATE INDEX IF NOT EXISTS idx_crm_client_files_client ON crm_client_files(client_id)`
}

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requireAuth(req)
  if (auth instanceof NextResponse) return auth
  if (!SAFE_ID_RE.test(params.id)) return NextResponse.json({ ok: false }, { status: 400 })

  try {
    await ensureFilesTable()
    const { rows } = await sql`
      SELECT id, client_id, blob_url, label, file_name, file_size, mime_type, uploaded_at
      FROM crm_client_files WHERE client_id = ${params.id} ORDER BY uploaded_at DESC
    `
    return NextResponse.json({ ok: true, files: rows })
  } catch (err) {
    console.error('[GET files]', err)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requireAuthAndCsrf(req)
  if (auth instanceof NextResponse) return auth
  if (!SAFE_ID_RE.test(params.id)) return NextResponse.json({ ok: false }, { status: 400 })

  const ct = req.headers.get('content-type') ?? ''
  if (!ct.includes('multipart/form-data')) {
    return NextResponse.json({ ok: false, error: 'multipart required' }, { status: 400 })
  }

  try {
    const formData = await req.formData()
    const file  = formData.get('file')
    const rawLabel = formData.get('label')
    const label = typeof rawLabel === 'string' ? rawLabel.slice(0, MAX_LABEL).trim() : ''

    if (!(file instanceof File) || file.size === 0) {
      return NextResponse.json({ ok: false, error: 'No file provided' }, { status: 400 })
    }

    const validation = await validateUploadedFile(file)
    if (!validation.ok) {
      return NextResponse.json({ ok: false, error: validation.reason }, { status: 400 })
    }

    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 100)
    const blobPath = `crm/${params.id}/${Date.now()}_${safeName}`

    const blob = await put(blobPath, file, {
      access: 'public',
      contentType: file.type,
    })

    await ensureFilesTable()
    const fileId = randomUUID()

    await sql`
      INSERT INTO crm_client_files (id, client_id, blob_url, label, file_name, file_size, mime_type, uploaded_at)
      VALUES (
        ${fileId}, ${params.id}, ${blob.url},
        ${label || file.name.slice(0, MAX_LABEL)}, ${file.name.slice(0, 255)},
        ${file.size}, ${file.type}, ${new Date().toISOString()}
      )
    `

    return NextResponse.json({
      ok: true,
      file: {
        id: fileId, client_id: params.id, blob_url: blob.url,
        label: label || file.name, file_name: file.name,
        file_size: file.size, mime_type: file.type,
        uploaded_at: new Date().toISOString(),
      }
    })
  } catch (err) {
    console.error('[POST files]', err)
    return NextResponse.json({ ok: false, error: 'Upload failed' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requireAuthAndCsrf(req)
  if (auth instanceof NextResponse) return auth
  if (!SAFE_ID_RE.test(params.id)) return NextResponse.json({ ok: false }, { status: 400 })

  try {
    const body = await req.json()
    const fileId = body?.fileId
    if (!fileId || typeof fileId !== 'string') {
      return NextResponse.json({ ok: false, error: 'invalid_file_id' }, { status: 400 })
    }

    await ensureFilesTable()

    const { rows } = await sql`
      SELECT blob_url FROM crm_client_files
      WHERE id = ${fileId} AND client_id = ${params.id}
    `
    if (!rows[0]) return NextResponse.json({ ok: false, error: 'not_found' }, { status: 404 })

    await del(rows[0].blob_url)
    await sql`DELETE FROM crm_client_files WHERE id = ${fileId} AND client_id = ${params.id}`

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[DELETE files]', err)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
