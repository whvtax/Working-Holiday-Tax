import { put, del } from '@vercel/blob'

const ALLOWED_MIME_TYPES = new Set([
  'image/jpeg', 'image/png', 'image/webp', 'image/gif',
  'application/pdf',
])
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024 // 10 MB per file

/**
 * Upload a File (from FormData) to Vercel Blob.
 * Returns the blob URL.
 * Throws if the file type or size is not allowed.
 */
export async function uploadFile(
  file: File | null,
  folder: string,
): Promise<string | null> {
  if (!file || file.size === 0) return null

  if (!ALLOWED_MIME_TYPES.has(file.type)) {
    throw new Error(`File type not allowed: ${file.type}`)
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    throw new Error(`File too large (max 10 MB per file)`)
  }

  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_')
  const pathname = `${folder}/${Date.now()}_${safeName}`

  const blob = await put(pathname, file, {
    access: 'public',
    contentType: file.type,
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

/**
 * Delete a list of Blob URLs permanently from Vercel Blob storage.
 * Silently ignores invalid or empty URLs.
 */
export async function deleteFiles(urls: string[]): Promise<void> {
  const validUrls = urls.filter(u => typeof u === 'string' && u.startsWith('https://'))
  if (validUrls.length === 0) return
  try {
    await del(validUrls)
  } catch (err) {
    console.error('[deleteFiles] Failed to delete blobs:', err)
  }
}
