// Lip sync (Jo, Nov 23): Ella's mouth must move exactly with the voice.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mkdtemp, readFile, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { render, type EditPlan } from '../video/compose'
import { audioLag, ffmpeg } from '../video/media'

const dir = () => mkdtemp(join(process.env.TEMPDIR ?? tmpdir(), 'ella-sync-'))

/** A "voice": tone bursts of uneven length and gaps, like syllables, as a WAV file. */
async function burstVoice(path: string, seconds: number) {
  const rate = 16000, pcm = Buffer.alloc(rate * seconds * 2)
  let t = 0.3, seed = 7
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647
  while (t < seconds - 0.5) {
    const len = 0.08 + rnd() * 0.3
    for (let i = Math.floor(t * rate); i < Math.floor((t + len) * rate); i++) pcm.writeInt16LE(Math.round(Math.sin(i / rate * 2 * Math.PI * 220) * 12000), i * 2)
    t += len + 0.05 + rnd() * 0.35
  }
  const raw = path + '.raw'
  await writeFile(raw, pcm)
  await ffmpeg(['-f', 's16le', '-ar', String(rate), '-ac', '1', '-i', raw, path])
}

test('the lip sync lock finds where the voice sits inside the take; a silent take gives 0', { timeout: 120_000 }, async () => {
  const d = await dir()
  const voice = join(d, 'voice.wav')
  await burstVoice(voice, 12)
  for (const delay of [0, 0.3]) {
    const take = join(d, `take-${delay}.mp4`)
    await ffmpeg(['-f', 'lavfi', '-i', 'color=c=gray:s=320x568:d=13:r=25', '-i', voice,
      '-filter_complex', `[1:a]adelay=${Math.round(delay * 1000)}:all=1,volume=0.4[a]`, '-map', '0:v', '-map', '[a]', '-shortest', '-c:v', 'libx264', '-preset', 'ultrafast', '-c:a', 'aac', take])
    const m = await audioLag(take, voice, join(d, `w-${delay}`))
    assert.ok(Math.abs(m.lag - delay) <= 0.02, `delay ${delay}: measured ${m.lag} (confidence ${m.confidence})`)
    assert.ok(m.confidence >= 0.5)
  }
  const silent = join(d, 'silent.mp4')
  await ffmpeg(['-f', 'lavfi', '-i', 'color=c=gray:s=320x568:d=5:r=25', '-c:v', 'libx264', '-preset', 'ultrafast', silent])
  assert.deepEqual(await audioLag(silent, voice, join(d, 'w-silent')), { lag: 0, confidence: 0 })
})

test('an Ella scene after a dissolve shows each frame of her take at its own second (no early start)', { timeout: 300_000 }, async () => {
  const d = await dir()
  // The take: black, with a white flash from 5.0 s to 5.3 s of its own time.
  const take = join(d, 'take.mp4')
  await ffmpeg(['-f', 'lavfi', '-i', 'color=c=black:s=1080x1920:d=9:r=30', '-vf', "drawbox=x=0:y=0:w=iw:h=ih:color=white:t=fill:enable='between(t,5,5.3)'",
    '-c:v', 'libx264', '-preset', 'ultrafast', '-pix_fmt', 'yuv420p', take])
  const black = join(d, 'black.mp4')
  await ffmpeg(['-f', 'lavfi', '-i', 'color=c=black:s=1080x1920:d=4:r=30', '-c:v', 'libx264', '-preset', 'ultrafast', '-pix_fmt', 'yuv420p', black])
  const voice = join(d, 'voice.wav')
  await ffmpeg(['-f', 'lavfi', '-i', 'anullsrc=r=48000:cl=mono', '-t', '8', voice])
  // Scene 1 (0-3 s) a clip, scene 2 (3-8 s) Ella cut from the take at its own seconds: the flash must show at 5.0 s.
  const plan: EditPlan = {
    duration: 8, captions: [], voicePath: voice,
    scenes: [
      { scene: 1, start: 0, end: 3, duration: 3, ellaInFrame: false, shot: 'clip', clipPath: black, offset: 0, headline: '', headlineHighlight: [] },
      { scene: 2, start: 3, end: 8, duration: 5, ellaInFrame: true, shot: 'ella', clipPath: take, offset: 3, zoom: 1, headline: '', headlineHighlight: [] },
    ],
  }
  const out = join(d, 'out.mp4')
  await render(plan, join(d, 'work'), out)
  // The brightness of every frame, at 30 fps.
  const raw = join(d, 'frames.gray')
  await ffmpeg(['-i', out, '-vf', 'scale=8:8,format=gray', '-r', '30', '-f', 'rawvideo', raw])
  const b = await readFile(raw)
  const frames = b.length / 64
  let first = -1
  for (let f = 0; f < frames; f++) { let s = 0; for (let i = 0; i < 64; i++) s += b[f * 64 + i]; if (s / 64 > 128) { first = f; break } }
  assert.ok(first >= 0, 'the flash is in the video')
  assert.ok(Math.abs(first / 30 - 5.0) <= 1 / 30 + 0.001, `flash at ${(first / 30).toFixed(3)} s, should be 5.000 s`)
})
