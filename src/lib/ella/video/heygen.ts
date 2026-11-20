/**
 * HeyGen API v3 client for Ella. Server side only.
 * Endpoints (developers.heygen.com, checked 19 Nov 2026):
 *   POST /v3/assets                      upload image or audio, returns asset_id
 *   POST /v3/models/audio/tts            Ella's voice, with character timestamps
 *   POST /v3/models/avatars              Avatar 6: photo + audio -> talking clip
 *   POST /v3/models/videos               heygen-video-1: prompt (+ first frame) -> clip
 *   GET  /v3/models/videos/{id}          status and signed video_url
 * Every submit sends an Idempotency-Key, so a retried request never pays twice.
 */

export type JobStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled'
export interface JobState { status: JobStatus; videoUrl?: string; duration?: number; failure?: string }
export interface TtsResult { audioUrl: string; duration: number; chars: Array<{ text: string; start: number; end: number }> }

export interface VideoProvider {
  uploadAsset(bytes: Uint8Array, filename: string): Promise<string>
  tts(input: { text: string; voiceId: string; model?: string }): Promise<TtsResult>
  submitAvatar(input: { imageAssetId: string; audioAssetId: string; motionPrompt: string; idempotencyKey: string }): Promise<string>
  submitClip(input: { prompt: string; firstFrameAssetId?: string; duration: number; resolution: '768p' | '1080p'; idempotencyKey: string }): Promise<string>
  getVideo(videoId: string): Promise<JobState>
}

const BASE = 'https://api.heygen.com'

export class HeyGenClient implements VideoProvider {
  constructor(private opts: { apiKey?: string; fetchImpl?: typeof fetch } = {}) {}

  private key(): string {
    const k = this.opts.apiKey ?? process.env.ELLA_HEYGEN_API_KEY
    if (!k) throw new Error('Missing ELLA_HEYGEN_API_KEY')
    return k
  }

  private async call<T>(path: string, init: RequestInit & { idempotencyKey?: string } = {}): Promise<T> {
    const headers: Record<string, string> = { 'x-api-key': this.key(), ...(init.headers as Record<string, string> | undefined) }
    if (init.idempotencyKey) headers['Idempotency-Key'] = init.idempotencyKey
    const res = await (this.opts.fetchImpl ?? fetch)(`${BASE}${path}`, { ...init, headers })
    const text = await res.text()
    if (!res.ok) throw new Error(`HeyGen ${path} failed: HTTP ${res.status} ${text.slice(0, 300)}`)
    return (text ? JSON.parse(text) : {}) as T
  }

  async uploadAsset(bytes: Uint8Array, filename: string): Promise<string> {
    const form = new FormData()
    form.append('file', new Blob([new Uint8Array(bytes)]), filename)
    const r = await this.call<{ data: { asset_id: string } }>('/v3/assets', { method: 'POST', body: form })
    return r.data.asset_id
  }

  async tts(input: { text: string; voiceId: string; model?: string }): Promise<TtsResult> {
    const r = await this.call<{ data: { audio_url: string; duration: number; original_characters?: Array<{ text: string; start_time: number; end_time: number }> } }>(
      '/v3/models/audio/tts', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ model: input.model ?? 'heygen-voice-1', voice_id: input.voiceId, text: input.text, language: 'en', with_timestamps: true }),
      })
    return {
      audioUrl: r.data.audio_url,
      duration: r.data.duration,
      chars: (r.data.original_characters ?? []).map(c => ({ text: c.text, start: c.start_time, end: c.end_time })),
    }
  }

  async submitAvatar(input: { imageAssetId: string; audioAssetId: string; motionPrompt: string; idempotencyKey: string }): Promise<string> {
    const r = await this.call<{ data: { video_id: string } }>('/v3/models/avatars', {
      method: 'POST',
      idempotencyKey: input.idempotencyKey,
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        model: 'heygen-avatar-6',
        reference_images: [{ type: 'asset_id', asset_id: input.imageAssetId }],
        audio: { type: 'asset_id', asset_id: input.audioAssetId },
        resolution: '1080p',
        motion_prompt: input.motionPrompt.slice(0, 1200),
        motion_expressiveness: 'default',
      }),
    })
    return r.data.video_id
  }

  async submitClip(input: { prompt: string; firstFrameAssetId?: string; duration: number; resolution: '768p' | '1080p'; idempotencyKey: string }): Promise<string> {
    const body: Record<string, unknown> = {
      model: 'heygen-video-1',
      mode: input.firstFrameAssetId ? 'image_to_video' : 'text_to_video',
      prompt: input.prompt,
      duration: Math.min(15, Math.max(5, Math.ceil(input.duration))),
      resolution: input.resolution,
    }
    if (input.firstFrameAssetId) body.image = { type: 'asset_id', asset_id: input.firstFrameAssetId }
    else body.aspect_ratio = '9:16'
    const r = await this.call<{ data: { video_id: string } }>('/v3/models/videos', {
      method: 'POST', idempotencyKey: input.idempotencyKey,
      headers: { 'content-type': 'application/json' }, body: JSON.stringify(body),
    })
    return r.data.video_id
  }

  async getVideo(videoId: string): Promise<JobState> {
    const r = await this.call<{ data: { status: JobStatus; video_url?: string; duration?: number; failure_message?: string } }>(
      `/v3/models/videos/${encodeURIComponent(videoId)}`)
    return { status: r.data.status, videoUrl: r.data.video_url, duration: r.data.duration, failure: r.data.failure_message }
  }
}
