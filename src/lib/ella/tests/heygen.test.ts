import test from 'node:test'
import assert from 'node:assert/strict'
import { HeyGenClient } from '../video/heygen'

/** Records every request and answers like HeyGen. */
function client() {
  const sent: Array<{ url: string; body: Record<string, unknown> }> = []
  const fetchImpl = (async (url: string, init: RequestInit) => {
    sent.push({ url, body: typeof init.body === 'string' ? JSON.parse(init.body) : {} })
    const data = url.includes('/audio/tts') ? { audio_url: 'https://x/a.wav', duration: 3, original_characters: [] }
      : url.includes('/audio/sounds') ? [{ id: 'm', audio_url: 'https://x/m.wav', duration: 40 }]
      : { video_id: 'v1' }
    return new Response(JSON.stringify({ data }), { status: 200 })
  }) as unknown as typeof fetch
  return { c: new HeyGenClient({ apiKey: 'k', fetchImpl }), sent }
}

test('HeyGen voice: only fields HeyGen accepts (no plain output_format, boost 0 to 1)', async () => {
  const { c, sent } = client()
  await c.tts({ text: 'Hello.', voiceId: 'v' })
  const b = sent[0].body
  assert.equal(b.output_format, undefined, 'output_format is an object at HeyGen; a plain string is refused')
  assert.ok(Number(b.expressiveness_boost) >= 0 && Number(b.expressiveness_boost) <= 1)
  assert.equal(b.with_timestamps, true)
})

test('HeyGen avatar: Turbo, calm motion, vertical 1080 x 1920, prompt under 1200', async () => {
  const { c, sent } = client()
  await c.submitAvatar({ imageAssetId: 'i', audioAssetId: 'a', motionPrompt: 'x'.repeat(2000), idempotencyKey: 'k' })
  const b = sent[0].body
  assert.equal(b.model, 'heygen-avatar-6-turbo')
  assert.equal(b.motion_expressiveness, 'default', 'natural talking hands (Jo)')
  assert.deepEqual([b.output_width, b.output_height], [1080, 1920])
  assert.ok(String(b.motion_prompt).length <= 1200)
})

test('HeyGen music search reads either answer shape', async () => {
  const { c } = client()
  const m = await c.searchMusic('calm')
  assert.equal(m[0].url, 'https://x/m.wav')
})

test('HeyGen clip: prompt_enhancement is one of the words HeyGen accepts', async () => {
  const { c, sent } = client()
  await c.submitClip({ prompt: 'A hand places a bag on a bench.', duration: 5, resolution: '768p', idempotencyKey: 'k' })
  assert.ok(['turbo', 'quality', 'disabled', 'ultraquality'].includes(String(sent[0].body.prompt_enhancement)))
  assert.equal(typeof sent[0].body.duration, 'number')
})
