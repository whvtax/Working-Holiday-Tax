// src/lib/upload.ts
// ──────────────────────────────────────────────────────────────────────────
// File upload utilities - Supabase Storage implementation
// All security checks (magic bytes, dangerous patterns) preserved.
// ──────────────────────────────────────────────────────────────────────────

import { getSupabase, STORAGE_BUCKETS, assertUploadsBucketPrivate } from '@/lib/supabase'
import crypto from 'crypto'

const ALLOWED_MIME_TYPES = new Set([
  'image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif',
  'image/heic', 'image/heif',
  'application/pdf',
])
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024 // 10 MB per file
const MAX_FILENAME_LENGTH = 200

const MAGIC_SIGNATURES: { mime: string; offset: number; bytes: number[] }[] = [
  // JPEG: FF D8 FF
  { mime: 'image/jpeg',       offset: 0, bytes: [0xFF, 0xD8, 0xFF] },
  { mime: 'image/jpg',        offset: 0, bytes: [0xFF, 0xD8, 0xFF] },
  // PNG: 89 50 4E 47 0D 0A 1A 0A
  { mime: 'image/png',        offset: 0, bytes: [0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A] },
  // WEBP: 52 49 46 46 ?? ?? ?? ?? 57 45 42 50 (RIFF....WEBP)
  { mime: 'image/webp',       offset: 0, bytes: [0x52, 0x49, 0x46, 0x46] },
  // GIF87a / GIF89a
  { mime: 'image/gif',        offset: 0, bytes: [0x47, 0x49, 0x46, 0x38] },
  // PDF: %PDF
  { mime: 'application/pdf',  offset: 0, bytes: [0x25, 0x50, 0x44, 0x46] },
  // HEIC/HEIF: bytes 4-7 contain 'ftyp' box marker (offset 4)
  { mime: 'image/heic',       offset: 4, bytes: [0x66, 0x74, 0x79, 0x70] },
  { mime: 'image/heif',       offset: 4, bytes: [0x66, 0x74, 0x79, 0x70] },
]

const DANGEROUS_PATTERNS = [
  // PHP tags
  [0x3C, 0x3F, 0x70, 0x68, 0x70],  // <?php
  // HTML script tags
  [0x3C, 0x73, 0x63, 0x72, 0x69, 0x70, 0x74], // <script
  // ELF (Linux executable)
  [0x7F, 0x45, 0x4C, 0x46],
  // PE (Windows .exe / .dll)
  [0x4D, 0x5A],
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
  for (const pattern of DANGEROUS_PATTERNS) {
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

/**
 * Upload a single file to Supabase Storage.
 * Returns a public URL on success, null if no file provided.
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

  if (file.name.length > MAX_FILENAME_LENGTH) {
    throw new Error('File name too long.')
  }

  await validateFileContents(file)

  // Fail closed: never write identity docs into a public bucket.
  await assertUploadsBucketPrivate()

  const safeName = file.name
    .replace(/[^a-zA-Z0-9._-]/g, '_')
    .slice(0, 80)
  // Random suffix prevents path collisions if two files arrive in the same
  // millisecond (e.g. parallel uploads from one form).
  const pathname = `${folder}/${Date.now()}_${crypto.randomUUID().slice(0, 8)}_${safeName}`

  const sb = getSupabase()
  const arrayBuffer = await file.arrayBuffer()

  const { error: uploadError } = await sb.storage
    .from(STORAGE_BUCKETS.uploads)
    .upload(pathname, arrayBuffer, {
      contentType: file.type,
      cacheControl: '3600',
      upsert: false,
    })

  if (uploadError) {
    throw new Error(`Upload failed: ${uploadError.message}`)
  }

  // Build the canonical object reference. The bucket is PRIVATE (now enforced at
  // runtime by assertUploadsBucketPrivate above), so this URL is used only as a
  // stable reference key stored in the DB - it does NOT resolve publicly. Files
  // are streamed to authenticated CRM sessions via /api/crm/file (service role).
  const { data: { publicUrl } } = sb.storage
    .from(STORAGE_BUCKETS.uploads)
    .getPublicUrl(pathname)

  return publicUrl
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
 * Uploads a raw buffer (e.g. an image or PDF a client sent on WhatsApp,
 * already downloaded via downloadMedia() in lib/whatsapp.ts) to Supabase
 * Storage. Separate from uploadFile() above because that one validates a
 * browser File object from a form; this one starts from bytes we already
 * fetched server-side. Same magic-byte and size checks apply — WhatsApp
 * media is still untrusted input.
 */
export async function uploadWhatsappMedia(
  buffer: Buffer,
  mimeType: string,
  conversationId: string,
): Promise<string | null> {
  if (!ALLOWED_MIME_TYPES.has(mimeType)) {
    console.error('[uploadWhatsappMedia] rejected mime type', mimeType)
    return null
  }
  if (buffer.length === 0 || buffer.length > MAX_FILE_SIZE_BYTES) {
    console.error('[uploadWhatsappMedia] rejected size', buffer.length)
    return null
  }

  const bytes = new Uint8Array(buffer.buffer, buffer.byteOffset, Math.min(buffer.length, 1024))
  if (containsDangerousPattern(bytes)) {
    console.error('[uploadWhatsappMedia] rejected: dangerous content pattern')
    return null
  }
  const signatures = MAGIC_SIGNATURES.filter(s => s.mime === mimeType)
  const validSignature = signatures.length === 0 || signatures.some(sig => matchesMagicBytes(bytes, sig))
  if (!validSignature) {
    console.error('[uploadWhatsappMedia] rejected: content does not match declared mime type', mimeType)
    return null
  }

  await assertUploadsBucketPrivate()

  const ext = mimeType.split('/')[1]?.replace('jpeg', 'jpg') ?? 'bin'
  const pathname = `whatsapp/${conversationId}/${Date.now()}_${crypto.randomUUID().slice(0, 8)}.${ext}`

  const sb = getSupabase()
  const { error: uploadError } = await sb.storage
    .from(STORAGE_BUCKETS.uploads)
    .upload(pathname, buffer, { contentType: mimeType, cacheControl: '3600', upsert: false })

  if (uploadError) {
    console.error('[uploadWhatsappMedia] upload failed', uploadError.message)
    return null
  }

  const { data: { publicUrl } } = sb.storage.from(STORAGE_BUCKETS.uploads).getPublicUrl(pathname)
  return publicUrl
}

/**
 * Delete files from Supabase Storage by their public URLs.
 * Extracts the storage path from URLs and removes them.
 */
export async function deleteFiles(urls: string[]): Promise<void> {
  const validUrls = urls.filter(u => typeof u === 'string' && u.startsWith('https://'))
  if (validUrls.length === 0) return

  const sb = getSupabase()
  // Extract storage paths from Supabase public URLs
  // Format: https://xxx.supabase.co/storage/v1/object/public/uploads/folder/file.jpg
  const paths = validUrls
    .map(url => {
      const marker = `/storage/v1/object/public/${STORAGE_BUCKETS.uploads}/`
      const idx = url.indexOf(marker)
      if (idx === -1) return null
      return url.slice(idx + marker.length)
    })
    .filter((p): p is string => p !== null)

  if (paths.length === 0) return

  try {
    await sb.storage.from(STORAGE_BUCKETS.uploads).remove(paths)
  } catch (err) {
    console.error('[deleteFiles] Failed to delete files:', err)
  }
}
