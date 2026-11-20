/**
 * Files and ffmpeg. Provider download links are temporary, so every result is
 * copied into Ella's own storage the moment it is ready.
 */
import { execFile } from 'node:child_process'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { getSupabase } from '@/lib/supabase'
import { ffmpegBinary } from './paths'

export interface MediaStore {
  put(path: string, bytes: Uint8Array): Promise<string>
  get(path: string): Promise<Uint8Array>
  /** A local file path for ffmpeg (downloads to a temp dir if the store is remote). */
  localPath(path: string): Promise<string>
  /** A time-limited link (Instagram and TikTok fetch the video from it). */
  signedUrl(path: string, seconds: number): Promise<string>
}

export class LocalMediaStore implements MediaStore {
  constructor(private root: string) {}
  async put(path: string, bytes: Uint8Array) {
    const full = join(this.root, path)
    await mkdir(dirname(full), { recursive: true })
    await writeFile(full, bytes)
    return path
  }
  async get(path: string) { return new Uint8Array(await readFile(join(this.root, path))) }
  async localPath(path: string) { return join(this.root, path) }
  async signedUrl(path: string) { return `file://${join(this.root, path)}` }
}

/** Production storage: a PRIVATE Supabase bucket ("ella"). */
export class SupabaseMediaStore implements MediaStore {
  constructor(private bucket = 'ella', private tmp = join(tmpdir(), 'ella-media')) {}
  private client() { return getSupabase().storage.from(this.bucket) }
  async put(path: string, bytes: Uint8Array) {
    const type = path.endsWith('.mp4') ? 'video/mp4' : path.endsWith('.wav') ? 'audio/wav' : path.endsWith('.mp3') ? 'audio/mpeg' : path.endsWith('.png') ? 'image/png' : 'application/octet-stream'
    const { error } = await this.client().upload(path, bytes, { upsert: true, contentType: type })
    if (error) throw new Error(`Storage upload failed for ${path}: ${error.message}`)
    return path
  }
  async get(path: string) {
    const { data, error } = await this.client().download(path)
    if (error || !data) throw new Error(`Storage download failed for ${path}: ${error?.message ?? 'no data'}`)
    return new Uint8Array(await data.arrayBuffer())
  }
  async localPath(path: string) {
    const full = join(this.tmp, path)
    if (!existsSync(full)) {
      await mkdir(dirname(full), { recursive: true })
      await writeFile(full, await this.get(path))
    }
    return full
  }
  async signedUrl(path: string, seconds: number) {
    const { data, error } = await this.client().createSignedUrl(path, seconds)
    if (error || !data) throw new Error(`Signed link failed for ${path}: ${error?.message ?? 'no data'}`)
    return data.signedUrl
  }
}

export type Downloader = (url: string) => Promise<Uint8Array>
export const httpDownload: Downloader = async url => {
  const r = await fetch(url)
  if (!r.ok) throw new Error(`Download failed: HTTP ${r.status}`)
  return new Uint8Array(await r.arrayBuffer())
}

export function ffmpeg(args: string[], timeoutMs = 600_000): Promise<{ stdout: string; stderr: string }> {
  return new Promise((resolve, reject) => {
    execFile(ffmpegBinary(), ['-hide_banner', '-y', ...args], { maxBuffer: 64 * 1024 * 1024, timeout: timeoutMs },
      (err, stdout, stderr) => (err ? reject(new Error(`ffmpeg failed: ${String(stderr).slice(-800)}`)) : resolve({ stdout, stderr })))
  })
}

/** Cuts [start, end) seconds out of an audio file as WAV (for one Ella scene). */
export async function sliceAudio(input: string, start: number, end: number, output: string) {
  await mkdir(dirname(output), { recursive: true })
  await ffmpeg(['-ss', start.toFixed(3), '-to', end.toFixed(3), '-i', input, '-ac', '1', '-ar', '44100', output])
}

export interface Probe { duration: number; width?: number; height?: number; hasAudio: boolean; fps?: number }

/** Reads duration, size and audio presence from ffmpeg's own header output. */
export async function probe(input: string): Promise<Probe> {
  let stderr = ''
  try { await ffmpeg(['-i', input, '-f', 'null', '-t', '0', '-']) } catch (e) { stderr = String(e) }
  if (!stderr) stderr = (await ffmpeg(['-i', input, '-f', 'null', '-t', '0', '-'])).stderr
  const d = stderr.match(/Duration: (\d+):(\d+):([\d.]+)/)
  const v = stderr.match(/Video: [^\n]*?, (\d{2,5})x(\d{2,5})/)
  const f = stderr.match(/(\d+(?:\.\d+)?) fps/)
  return {
    duration: d ? Number(d[1]) * 3600 + Number(d[2]) * 60 + Number(d[3]) : 0,
    width: v ? Number(v[1]) : undefined,
    height: v ? Number(v[2]) : undefined,
    hasAudio: /Audio: /.test(stderr),
    fps: f ? Number(f[1]) : undefined,
  }
}

/** Saves one frame at a time point as JPEG (for the visual review). */
export async function frameAt(input: string, t: number, output: string) {
  await mkdir(dirname(output), { recursive: true })
  await ffmpeg(['-ss', t.toFixed(2), '-i', input, '-frames:v', '1', '-vf', 'scale=540:-2', '-q:v', '4', output])
}
