// Test doubles shared by the Ella tests: a fake HeyGen that makes real (test
// pattern) video files with ffmpeg, and fake character timings for its voice.
import { join } from 'node:path'
import type { JobState, TtsResult, VideoProvider } from '../video/heygen'
import { ffmpeg } from '../video/media'
import type { CompleteOpts, Llm, LlmResult } from '../script/llm'
import type { Research, Review } from '../script/studio'
import { workedExample } from './fixtures/worked-example'

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
  /** While true, every provider job stays "processing" (a slow HeyGen). */
  holdJobs = false
  /** The last voice length: the avatar take lip-syncs the whole voice, so it is as long. */
  lastVoice = 4.5
  avatarInputs: Array<{ motionPrompt: string }> = []
  constructor(private dir: string) {}

  async tts(input: { text: string }): Promise<TtsResult> {
    this.calls.tts++
    const { chars, duration } = fakeChars(input.text)
    this.lastVoice = duration
    const file = join(this.dir, `tts-${this.calls.tts}.wav`)
    // A voice-like test tone: 220 Hz with a slow tremolo, never silent.
    await ffmpeg(['-f', 'lavfi', '-i', `sine=frequency=220:duration=${duration}`, '-af', 'tremolo=f=3:d=0.4,volume=0.4', '-ac', '1', '-ar', '44100', file])
    return { audioUrl: file, duration, chars }
  }
  async uploadAsset(_b: Uint8Array, filename: string) { this.calls.upload++; const id = `asset_${this.calls.upload}`; this.assets.set(id, filename); return id }
  async submitAvatar(i?: { motionPrompt: string }) {
    this.calls.avatar++
    if (i) this.avatarInputs.push({ motionPrompt: i.motionPrompt })
    const id = `av_${this.calls.avatar}`
    this.jobs.set(id, { kind: 'avatar', duration: this.lastVoice, colour: 'testsrc2' })
    return id
  }
  /** Next clip submit fails like a dropped connection (we cannot know if HeyGen took it). */
  dropNextSubmit = false
  keys: string[] = []
  async submitClip(i: { duration: number; idempotencyKey?: string }) {
    if (i.idempotencyKey) this.keys.push(i.idempotencyKey)
    if (this.dropNextSubmit) { this.dropNextSubmit = false; throw new Error('HeyGen /v3/models/videos failed: HTTP 503 upstream') }
    this.calls.clip++
    const id = `clip_${this.calls.clip}`
    this.jobs.set(id, { kind: 'clip', duration: i.duration, colour: 'testsrc2', failOnce: this.failNextClip })
    this.failNextClip = false
    return id
  }
  musicSearches: string[] = []
  async searchMusic(query: string) {
    this.musicSearches.push(query)
    const file = join(this.dir, 'music.wav')
    await ffmpeg(['-y', '-f', 'lavfi', '-i', 'sine=frequency=330:duration=12', '-ac', '2', '-ar', '44100', file])
    return [{ id: 'm1', url: file, duration: 30 }]
  }

  async getVideo(id: string): Promise<JobState> {
    this.calls.poll++
    const j = this.jobs.get(id)!
    if (j.failOnce) return { status: 'failed', failure: 'test failure' }
    if (this.holdJobs) return { status: 'processing' }
    if (!j.file) {
      j.file = join(this.dir, `${id}.mp4`)
      const d = j.duration
      // Avatar 6 at 1080p is near 9:16; clips at 768p are 432x768.
      const size = j.kind === 'avatar' ? '1080x1920' : '432x768'
      await ffmpeg(['-f', 'lavfi', '-i', `testsrc2=size=${size}:rate=30:duration=${d}`, '-f', 'lavfi', '-i', `sine=frequency=900:duration=${d}`,
        '-c:v', 'libx264', '-preset', 'ultrafast', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-shortest', j.file])
      return { status: 'processing' }
    }
    return { status: 'completed', videoUrl: j.file, duration: j.duration }
  }
}


// ── A fake model for the script studio: answers each stage in its own format ──

export function studioResearch(): Research {
  const d = workedExample()
  return {
    facts: d.claims.map((c, i) => ({ id: `f${i + 1}`, fact: c.text, blogLine: c.blogLine, source: c.source, kind: c.kind, hedge: /usually/.test(c.text) ? 'usually' : 'none', softened: c.text })),
    ideas: d.ideas.map(i => ({ ...i, factIds: ['f1'] })),
    chosen: { idea: d.ideas[0].idea, why: 'Highest score', coreMessage: d.coreMessage, keyTerm: d.keyTerm, audienceSlice: d.audienceSlice, hookType: d.hookType, ctaType: d.ctaType, payoff: "That's how you plan for A-B-N tax." },
  }
}
export const studioReview = (score = 5): Review => ({
  scores: { hook: score, promise: score, clarity: score, sendable: score, cta: score, flow: score },
  notes: score < 5 ? [{ scene: 2, dimension: 'flow', problem: 'Choppy.', fix: 'Join the sentences.' }] : [],
  verdict: score >= 4 ? 'Post it.' : 'Rewrite.',
})

/** The judge gives both scripts the same score and prefers the first shown. */
export const studioJudge = (score = 5) => {
  const r = studioReview(score)
  return { first: { scores: r.scores, notes: r.notes, accuracyProblems: [] }, second: { scores: r.scores, notes: r.notes, accuracyProblems: [] }, better: 'first', verdict: r.verdict }
}

/** Research, then the given scripts in order, then reviews in order (the last one repeats). */
export class StudioLlm implements Llm {
  calls: Array<{ stage: string; system: string; user: string }> = []
  constructor(private o: { scripts?: string[]; reviews?: number[]; research?: string } = {}) {}
  async complete(system: string, user: string, opts?: CompleteOpts): Promise<LlmResult> {
    const stage = opts?.jsonTool?.name ?? 'plain'
    this.calls.push({ stage, system, user })
    const n = this.calls.filter(c => c.stage === stage).length - 1
    const pick = <T>(xs: T[] | undefined, fallback: T) => (xs && xs.length ? xs[Math.min(n, xs.length - 1)] : fallback)
    const text = stage === 'ella_research' ? (this.o.research ?? JSON.stringify(studioResearch()))
      : stage === 'ella_judge' ? JSON.stringify(studioJudge(pick(this.o.reviews, 5)))
      : stage === 'ella_panel' ? JSON.stringify({ notes: [{ expert: 'Viewer psychologist', scene: 2, note: 'Show relief, not worry.' }], summary: 'Calm, real, one action per shot.' })
      : stage === 'ella_direct' ? JSON.stringify({ scenes: workedExample().scenes.filter(x => x.shot !== 'graphic').map(x => ({ scene: x.scene, visual: x.visual, action: x.action, syncWord: x.syncWord, shotPrompt: x.shotPrompt, continuity: x.continuity })), summary: 'One small student kitchen, soft morning light.' })
      : pick(this.o.scripts, JSON.stringify(workedExample()))
    return { text, model: 'test-model', inputTokens: 100, outputTokens: 50, stopReason: 'end_turn' }
  }
}
