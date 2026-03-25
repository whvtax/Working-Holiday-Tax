import { put } from '@vercel/blob'

/**
 * Upload a File (from FormData) to Vercel Blob.
 * Returns the public URL, or null if the file is falsy.
 *
 * Files are stored under: uploads/<formType>/<taskId>/<originalName>
 */
export async function uploadFile(
  file: File | null,
  folder: string,
): Promise<string | null> {
  if (!file || file.size === 0) return null

  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_')
  const pathname = `${folder}/${Date.now()}_${safeName}`

  const blob = await put(pathname, file, {
    access: 'public',   // URL is guessable but unindexed — fine for internal CRM
    contentType: file.type || 'application/octet-stream',
  })

  return blob.url
}

/**
 * Upload multiple files and return an array of URLs (nulls filtered out).
 */
export async function uploadFiles(
  files: (File | null)[],
  folder: string,
): Promise<string[]> {
  const results = await Promise.all(files.map(f => uploadFile(f, folder)))
  return results.filter((u): u is string => u !== null)
}
