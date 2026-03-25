/**
 * blob-upload.ts — shared helper for uploading form files to Vercel Blob
 * Called from public form API routes (tax-form, tfn-form, super-form, abn-form)
 * after the task is created, to store files and record them in crm_client_files.
 *
 * SECURITY:
 *   - Only called server-side after validateUploadedFile() has already passed
 *   - blobPath scoped to client ID — no path traversal
 *   - Silently no-ops if BLOB_READ_WRITE_TOKEN is not set (dev mode)
 */

import { put } from '@vercel/blob'
import { sql } from '@vercel/postgres'
import { randomUUID } from 'crypto'

export interface FileToUpload {
  file: File
  label: string
}

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

export async function uploadTaskFiles(
  clientId: string,
  files: FileToUpload[]
): Promise<void> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.warn('[blob-upload] BLOB_READ_WRITE_TOKEN not set — skipping file upload')
    return
  }

  try {
    await ensureFilesTable()

    for (const { file, label } of files) {
      if (!file || file.size === 0) continue

      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 100)
      const blobPath = `crm/${clientId}/${randomUUID()}_${safeName}`

      const blob = await put(blobPath, file, {
        // NOTE: Vercel Blob free/pro plan only supports 'public' access.
        // All client file URLs are stored in DB and served only via the /files/view proxy
        // (which requires CRM auth), so direct URL guessing is the residual risk.
        // Set BLOB_PRIVATE=true in env and upgrade to an Advanced Blob plan to enable private blobs.
        access: process.env.BLOB_PRIVATE === 'true' ? 'private' : 'public',
        contentType: file.type,
      })

      const fileId = randomUUID()
      await sql`
        INSERT INTO crm_client_files (id, client_id, blob_url, label, file_name, file_size, mime_type, uploaded_at)
        VALUES (
          ${fileId}, ${clientId}, ${blob.url},
          ${label.slice(0, 100)}, ${file.name.slice(0, 255)},
          ${file.size}, ${file.type}, ${new Date().toISOString()}
        )
      `
    }
  } catch (err) {
    // Non-fatal — task was already created, just log
    console.error('[blob-upload] Failed to upload files:', err)
  }
}
