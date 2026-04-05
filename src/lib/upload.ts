import { put, del } from '@vercel/blob'

const ALLOWED_MIME_TYPES = new Set([
  'image/jpeg', 'image/png', 'image/webp', 'image/gif',
  'application/pdf',
])
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024 // 10 MB per file
const MAX_FILENAME_LENGTH = 200

/**
 * Magic-byte signatures for allowed file types.
 * We read the first bytes of every uploaded file and verify they match
 * the declared MIME type. This prevents:
 *  - Disguised executables (.exe renamed to .jpg)
 *  - HTML/JS files renamed as images (XSS via blob URL)
 *  - ZIP bombs or other polyglot files
 *
 * Reference: https://en.wikipedia.org/wiki/List_of_file_signatures
 */
const MAGIC_SIGNATURES: { mime: string; offset: number; bytes: number[] }[] = [
  // JPEG: FF D8 FF
  { mime: 'image/jpeg',       offset: 0, bytes: [0xFF, 0xD8, 0xFF] },
  // PNG: 89 50 4E 47 0D 0A 1A 0A
  { mime: 'image/png',        offset: 0, bytes: [0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A] },
  // WEBP: 52 49 46 46 ?? ?? ?? ?? 57 45 42 50 (RIFF....WEBP)
  { mime: 'image/webp',       offset: 0, bytes: [0x52, 0x49, 0x46, 0x46] },
  // GIF87a / GIF89a
  { mime: 'image/gif',        offset: 0, bytes: [0x47, 0x49, 0x46, 0x38] },
  // PDF: %PDF
  { mime: 'application/pdf',  offset: 0, bytes: [0x25, 0x50, 0x44, 0x46] },
]

/**
 * Suspicious byte patterns that should NEVER appear in legitimate image/PDF files.
 * Checking the first 1KB catches most polyglot/embedded attacks.
 */
const DANGEROUS_PATTERNS = [
  // PHP tags
  [0x3C, 0x3F, 0x70, 0x68, 0x70],  // <?php
  // HTML script tags (case-insensitive check done separately)
  [0x3C, 0x73, 0x63, 0x72, 0x69, 0x70, 0x74], // <script
  // ELF (Linux executable)
  [0x7F, 0x45, 0x4C, 0x46],
  // PE (Windows .exe / .dll)
  [0x4D, 0x5A],
  // ZIP (could contain malicious files)
  // Note: DOCX/XLSX are ZIPs but we don't accept those formats anyway
]

async function readMagicBytes(file: File, length = 1024): Promise<Uint8Array> {
  const slice = file.slice(0, length)
  const buffer = await slice.arrayBuffer()
  return new Uint8Array(buffer)
}

function matchesMagicBytes(bytes: Uint8Array, signature: { offset: number; bytes: number[] }): boolean {
  for (let i = 0; i < signature.bytes.length; i++) {
    if (bytes[signature.offset + i] !== signature.bytes[i]) return false
  }
  return true
}

function containsDangerousPattern(bytes: Uint8Array): boolean {
  outer: for (const pattern of DANGEROUS_PATTERNS) {
    for (let i = 0; i <= bytes.length - pattern.length; i++) {
      let match = true
      for (let j = 0; j < pattern.length; j++) {
        if (bytes[i + j] !== pattern[j]) { match = false; break }
      }
      if (match) return true
    }
  }
  // Also check for <script (case-insensitive) in first 1KB as text
  const text = new TextDecoder('utf-8', { fatal: false }).decode(bytes.slice(0, 512)).toLowerCase()
  if (text.includes('<script') || text.includes('<?php') || text.includes('javascript:')) return true
  return false
}

/**
 * Validate a file using magic-byte inspection.
 * Throws a descriptive error if validation fails.
 */
async function validateFileContents(file: File): Promise<void> {
  const bytes = await readMagicBytes(file)

  // 1. Check for dangerous patterns regardless of declared type
  if (containsDangerousPattern(bytes)) {
    throw new Error('File contains potentially dangerous content and cannot be uploaded.')
  }

  // 2. Verify magic bytes match the declared MIME type
  const signatures = MAGIC_SIGNATURES.filter(s => s.mime === file.type)
  if (signatures.length === 0) {
    // No signature defined for this type — already blocked by ALLOWED_MIME_TYPES check
    throw new Error(`File type not allowed: ${file.type}`)
  }

  const validSignature = signatures.some(sig => matchesMagicBytes(bytes, sig))
  if (!validSignature) {
    throw new Error(
      `File content does not match declared type (${file.type}). ` +
      `Please upload a genuine image or PDF file.`
    )
  }

  // 3. WEBP-specific: verify WEBP marker at offset 8
  if (file.type === 'image/webp') {
    const webpMarker = [0x57, 0x45, 0x42, 0x50] // WEBP
    const markerMatch = webpMarker.every((b, i) => bytes[8 + i] === b)
    if (!markerMatch) {
      throw new Error('File content does not match declared type (image/webp).')
    }
  }
}

/**
 * Upload a File (from FormData) to Vercel Blob.
 * Returns the blob URL.
 * Throws if the file type, size, or content is not allowed.
 */
export async function uploadFile(
  file: File | null,
  folder: string,
): Promise<string | null> {
  if (!file || file.size === 0) return null

  // 1. MIME type allowlist
  if (!ALLOWED_MIME_TYPES.has(file.type)) {
    throw new Error(`File type not allowed: ${file.type}`)
  }

  // 2. File size limit
  if (file.size > MAX_FILE_SIZE_BYTES) {
    throw new Error(`File too large (max 10 MB per file)`)
  }

  // 3. Filename length (prevents path traversal edge cases)
  if (file.name.length > MAX_FILENAME_LENGTH) {
    throw new Error('File name too long.')
  }

  // 4. Magic-byte validation (content inspection)
  await validateFileContents(file)

  // 5. Sanitise filename before storing
  const safeName = file.name
    .replace(/[^a-zA-Z0-9._-]/g, '_')
    .slice(0, 80)
  const pathname = `${folder}/${Date.now()}_${safeName}`

  const blob = await put(pathname, file, {
    access: 'public',
    contentType: file.type,
  })

  return blob.url
}

/**
 * Upload multiple files and return an array of URLs (nulls filtered out).
 * Files are validated in parallel for speed, then uploaded in batches of 5
 * to avoid overwhelming the Vercel Blob API.
 */
export async function uploadFiles(
  files: (File | null)[],
  folder: string,
): Promise<string[]> {
  const validFiles = files.filter((f): f is File => !!f && f.size > 0)

  // Validate all files in parallel first (magic-byte checks are CPU-bound, not network)
  await Promise.all(validFiles.map(async f => {
    if (!ALLOWED_MIME_TYPES.has(f.type)) throw new Error(`File type not allowed: ${f.type}`)
    if (f.size > MAX_FILE_SIZE_BYTES) throw new Error(`File too large (max 10 MB per file)`)
    if (f.name.length > MAX_FILENAME_LENGTH) throw new Error('File name too long.')
    await validateFileContents(f)
  }))

  // Upload in batches of 5 — client-side uploads now handle invoices in parallel
  // Server-side batches are only bank statement + selfie (2-3 files max)
  const BATCH = 5
  const urls: string[] = []
  for (let i = 0; i < validFiles.length; i += BATCH) {
    const batch = validFiles.slice(i, i + BATCH)
    const batchResults = await Promise.all(batch.map(async f => {
      const safeName = f.name.replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 80)
      const pathname = `${folder}/${Date.now()}_${Math.random().toString(36).slice(2,7)}_${safeName}`
      const blob = await put(pathname, f, { access: 'public', contentType: f.type })
      return blob.url
    }))
    urls.push(...batchResults)
    // Minimal pause between batches
    if (i + BATCH < validFiles.length) {
      await new Promise(r => setTimeout(r, 50))
    }
  }
  return urls
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
