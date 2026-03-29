import { put, head } from '@vercel/blob'

const ALLOWED_MIME_TYPES = new Set([
  'image/jpeg', 'image/png', 'image/webp', 'image/gif',
  'application/pdf',
])
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024 // 10 MB per file

/**
 * Upload a File (from FormData) to Vercel Blob with private access.
 * Returns the blob URL (not publicly accessible — requires a signed download URL).
 * Throws if the file type or size is not allowed.
 *
 * Files are stored under: uploads/<formType>/<taskId>/<originalName>
 */
export async function uploadFile(
  file: File | null,
  folder: string,
): Promise<string | null> {
  if (!file || file.size === 0) return null

  // Validate MIME type against allowlist
  if (!ALLOWED_MIME_TYPES.has(file.type)) {
    throw new Error(`File type not allowed: ${file.type}`)
  }

  // Validate file size
  if (file.size > MAX_FILE_SIZE_BYTES) {
    throw new Error(`File too large (max 10 MB per file)`)
  }

  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_')
  const pathname = `${folder}/${Date.now()}_${safeName}`

  const blob = await put(pathname, file, {
    access: 'public',   // Vercel Blob free tier requires public; swap to 'private' on Pro
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
