// Test doubles shared by the Ella tests: a fake HeyGen that makes real (test
// pattern) video files with ffmpeg, and fake character timings for its voice.
import { join } from 'node:path'
import type { JobState, TtsResult, VideoProvider } from '../video/heygen'
import { ffmpeg } from '../video/media'

const PER_WORD = 0.36

/** Character timestamps for a text, as HeyGen TTS returns them. */
export function fakeChars(text: string, perWord = PER_WORD) {
  const out: Array<{ text: string; start: number; end: number }> = []
  let t = 0.05
  for (const w of text.split(' ')) {
    const step = perWord / w.length
    for (const ch of w) { out.push({ text: ch, start: t, end: t + step }); t += step }
    out.push({ text: ' ', start: t, end: t })
  }
  out.pop()
  return { chars: out, duration: t + 0.25 }
}


export class FakeHeyGen implements VideoProvider {
  calls = { tts: 0, upload: 0, avatar: 0, clip: 0, poll: 0 }
  jobs = new Map<string, { kind: 'avatar' | 'clip'; duration: number; colour: string; file?: string; failOnce?: boolean }>()
  assets = new Map<string, string>()
  failNextClip = false
  constructor(private dir: string) {}

  async tts(input: { text: string }): Promise<TtsResult> {
    this.calls.tts++
    const { chars, duration } = fakeChars(input.text)
    const file = join(this.dir, `tts-${this.calls.tts}.wav`)
    // A voice-like test tone: 220 Hz with a slow tremolo, never silent.
    await ffmpeg(['-f', 'lavfi', '-i', `sine=frequency=220:duration=${duration}`, '-af', 'tremolo=f=3:d=0.4,volume=0.4', '-ac', '1', '-ar', '44100', file])
    return { audioUrl: file, duration, chars }
  }
  async uploadAsset(_b: Uint8Array, filename: string) { this.calls.upload++; const id = `asset_${this.calls.upload}`; this.assets.set(id, filename); return id }
  async submitAvatar() {
    this.calls.avatar++
    const id = `av_${this.calls.avatar}`
    this.jobs.set(id, { kind: 'avatar', duration: 0, colour: 'testsrc2' })
    return id
  }
  async submitClip(i: { duration: number }) {
    this.calls.clip++
    const id = `clip_${this.calls.clip}`
    this.jobs.set(id, { kind: 'clip', duration: i.duration, colour: 'testsrc2', failOnce: this.failNextClip })
    this.failNextClip = false
    return id
  }
  async getVideo(id: string): Promise<JobState> {
    this.calls.poll++
    const j = this.jobs.get(id)!
    if (j.failOnce) return { status: 'failed', failure: 'test failure' }
    if (!j.file) {
      j.file = join(this.dir, `${id}.mp4`)
      const d = j.kind === 'avatar' ? 4.5 : j.duration
      // Avatar 6 at 1080p is near 9:16; clips at 768p are 432x768.
      const size = j.kind === 'avatar' ? '1080x1920' : '432x768'
      await ffmpeg(['-f', 'lavfi', '-i', `testsrc2=size=${size}:rate=30:duration=${d}`, '-f', 'lavfi', '-i', `sine=frequency=900:duration=${d}`,
        '-c:v', 'libx264', '-preset', 'ultrafast', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-shortest', j.file])
      return { status: 'processing' }
    }
    return { status: 'completed', videoUrl: j.file, duration: j.kind === 'avatar' ? 4.5 : j.duration }
  }
}

