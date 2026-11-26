/**
 * Files and ffmpeg. Provider download links are temporary, so every result is
 * copied into Ella's own storage the moment it is ready.
 */
import { execFile } from 'node:child_process'
import { mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises'
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
  /** Every file under a folder, with its full path (for cleaning up raw materials). */
  list?(prefix: string): Promise<string[]>
  /** Deletes files; missing ones are ignored. */
  remove?(paths: string[]): Promise<void>
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
  async list(prefix: string) {
    const out: string[] = []
    const walk = async (rel: string) => {
      let entries: Array<{ name: string; isDirectory(): boolean }> = []
      try { entries = await readdir(join(this.root, rel), { withFileTypes: true }) } catch { return }
      for (const e of entries) e.isDirectory() ? await walk(`${rel}/${e.name}`) : out.push(`${rel}/${e.name}`)
    }
    await walk(prefix.replace(/\/$/, ''))
    return out
  }
  async remove(paths: string[]) { for (const p of paths) await rm(join(this.root, p), { force: true }) }
}

/** Production storage: a PRIVATE Supabase bucket ("ella"). */
export class SupabaseMediaStore implements MediaStore {
  constructor(private bucket = 'ella', private tmp = join(tmpdir(), 'ella-media')) {}
  private client() { return getSupabase().storage.from(this.bucket) }
  async put(path: string, bytes: Uint8Array) {
    const type = path.endsWith('.mp4') ? 'video/mp4' : path.endsWith('.wav') ? 'audio/wav' : path.endsWith('.mp3') ? 'audio/mpeg' : path.endsWith('.png') ? 'image/png' : /\.jpe?g$/.test(path) ? 'image/jpeg' : 'application/octet-stream'
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
  async list(prefix: string) {
    const out: string[] = []
    const walk = async (folder: string, depth: number) => {
      const { data, error } = await this.client().list(folder, { limit: 1000 })
      if (error) throw new Error(`Storage list failed for ${folder}: ${error.message}`)
      // A folder comes back without an id; files have one.
      for (const e of data ?? []) e.id ? out.push(`${folder}/${e.name}`) : depth < 3 && await walk(`${folder}/${e.name}`, depth + 1)
    }
    await walk(prefix.replace(/\/$/, ''), 0)
    return out
  }
  async remove(paths: string[]) {
    for (let i = 0; i < paths.length; i += 100) {
      const { error } = await this.client().remove(paths.slice(i, i + 100))
      if (error) throw new Error(`Storage delete failed: ${error.message}`)
    }
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

export interface Probe { duration: number; width?: number; height?: number; hasAudio: boolean; fps?: number }

/** Reads duration, size and audio presence from ffmpeg's own header output. */
export async function probe(input: string): Promise<Probe> {
  const args = ['-i', input, '-f', 'null', '-t', '0', '-']
  // One ffmpeg run reads the header; a second run only if the first gave nothing.
  let stderr = ''
  try { stderr = (await ffmpeg(args)).stderr } catch (e) { stderr = String(e) }
  if (!stderr) stderr = (await ffmpeg(args)).stderr
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

/**
 * Lip sync lock (Jo, Nov 23). How many seconds later the voice is heard in Ella's take than in the voice file
 * (positive: the take runs late). Found by matching the loudness shape of the two sound tracks, 10 ms at a
 * time, over the first 30 s. Returns 0 when the take has no sound or the match is not clear.
 */
export async function audioLag(take: string, voice: string, workDir: string, maxLag = 1): Promise<{ lag: number; confidence: number }> {
  await mkdir(workDir, { recursive: true })
  const rate = 8000, hop = 80 // 10 ms windows
  const env = async (input: string, name: string) => {
    const out = join(workDir, `${name}.s16`)
    await ffmpeg(['-i', input, '-t', '30', '-vn', '-ac', '1', '-ar', String(rate), '-f', 's16le', out])
    const b = await readFile(out)
    const n = Math.floor(b.length / 2 / hop)
    const e = new Float64Array(n)
    for (let k = 0; k < n; k++) { let s = 0; for (let j = 0; j < hop; j++) s += Math.abs(b.readInt16LE((k * hop + j) * 2)); e[k] = s / hop }
    // Zero mean, unit spread, so loudness differences between the two files do not matter.
    const m = e.reduce((a, x) => a + x, 0) / (n || 1)
    const sd = Math.sqrt(e.reduce((a, x) => a + (x - m) ** 2, 0) / (n || 1)) || 1
    return e.map(x => (x - m) / sd)
  }
  let a: Float64Array, b: Float64Array
  try { a = await env(voice, 'sync-voice'); b = await env(take, 'sync-take') } catch { return { lag: 0, confidence: 0 } } // no sound in the take
  if (a.length < 100 || b.length < 100) return { lag: 0, confidence: 0 }
  const L = Math.round(maxLag * 100)
  let best = 0, bestK = 0
  for (let k = -L; k <= L; k++) {
    let s = 0, c = 0
    for (let i = Math.max(0, -k); i < a.length && i + k < b.length; i++) { s += a[i] * b[i + k]; c++ }
    const r = c > 50 ? s / c : 0
    if (r > best) { best = r; bestK = k }
  }
  return best >= 0.5 ? { lag: bestK / 100, confidence: Math.round(best * 100) / 100 } : { lag: 0, confidence: Math.round(best * 100) / 100 }
}

/** Saves one frame at a time point as JPEG (for the visual review). */
export async function frameAt(input: string, t: number, output: string) {
  await mkdir(dirname(output), { recursive: true })
  await ffmpeg(['-ss', t.toFixed(2), '-i', input, '-frames:v', '1', '-vf', 'scale=540:-2', '-q:v', '4', output])
}
