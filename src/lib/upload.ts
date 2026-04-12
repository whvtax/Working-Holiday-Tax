import { put, del } from '@vercel/blob'

const ALLOWED_MIME_TYPES = new Set([
  'image/jpeg', 'image/png', 'image/webp', 'image/gif',
  'application/pdf',
])
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024 // 10 MB per file
const MAX_FILENAME_LENGTH = 200

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
  const text = new TextDecoder('utf-8', { fatal: false }).decode(bytes.slice(0, 512)).toLowerCase()
  if (text.includes('<script') || text.includes('<?php') || text.includes('javascript:')) return true
  return false
}

async function validateFileContents(file: File): Promise<void> {
  const bytes = await readMagicBytes(file)

  if (containsDangerousPattern(bytes)) {
    throw new Error('File contains potentially dangerous content and cannot be uploaded.')
  }

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

  if (file.type === 'image/webp') {
    const webpMarker = [0x57, 0x45, 0x42, 0x50] // WEBP
    const markerMatch = webpMarker.every((b, i) => bytes[8 + i] === b)
    if (!markerMatch) {
      throw new Error('File content does not match declared type (image/webp).')
    }
  }
}

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

  if (file.name.length > MAX_FILENAME_LENGTH) {
    throw new Error('File name too long.')
  }

  await validateFileContents(file)

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
 */
export async function uploadFiles(
  files: (File | null)[],
  folder: string,
): Promise<string[]> {
  const results = await Promise.all(files.map(f => uploadFile(f, folder)))
  return results.filter((u): u is string => u !== null)
}

export async function deleteFiles(urls: string[]): Promise<void> {
  const validUrls = urls.filter(u => typeof u === 'string' && u.startsWith('https://'))
  if (validUrls.length === 0) return
  try {
    await del(validUrls)
  } catch (err) {
    console.error('[deleteFiles] Failed to delete blobs:', err)
  }
}
