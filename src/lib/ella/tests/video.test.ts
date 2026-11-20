import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mkdtemp, readFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { createCanvas, loadImage } from '@napi-rs/canvas'
import { loadSvtLibrary } from '../library-svt'
import { toRegistry } from '../registry'
import { EllaRepo } from '../store'
import { SqlEllaDb } from '../db'
import { BRAND } from '../video/brand'
import { buildEditPlan, displayText, headlineHighlight } from '../video/compose'
import { FakeHeyGen, fakeChars } from './fakes'
import { ffmpeg, LocalMediaStore, probe } from '../video/media'
import { captionPng, headlinePng } from '../video/overlays'
import { produceVideo, regenerateScene, type ProduceSettings } from '../video/produce'
import { parseVisionIssues, type VisionReviewer } from '../video/qa'
import { captionChunks, charsToWords, timeScenes, voiceText } from '../video/timing'
import { workedExample } from './fixtures/worked-example'
import { freshDb } from './helpers'

const script = workedExample()
test('character timings group into words and scenes follow the real voice', () => {
  const text = voiceText(script.scenes)
  const { chars, duration } = fakeChars(text)
  const words = charsToWords(chars)
  assert.equal(words.length, text.split(' ').length)
  assert.equal(words[4].text, 'A-B-N?')
  const timed = timeScenes(script.scenes, words, duration)
  assert.equal(timed.length, 8)
  assert.equal(timed[0].start, 0)
  for (let i = 1; i < timed.length; i++) assert.equal(timed[i].start, timed[i - 1].end, 'no gaps between scenes')
  assert.ok(Math.abs(timed.at(-1)!.end - (duration + 0.4)) < 0.02, 'the last scene holds a short tail after the CTA')
  assert.throws(() => timeScenes(script.scenes, words.slice(1), duration), /words/)
})

test('captions: up to 4 words, break at punctuation, acronyms shown as written', () => {
  const text = voiceText(script.scenes)
  const { chars, duration } = fakeChars(text)
  const timed = timeScenes(script.scenes, charsToWords(chars), duration)
  const chunks = captionChunks(timed, script.scenes)
  for (const c of chunks) assert.ok(c.text.split(' ').length <= 4, c.text)
  assert.equal(chunks[0].text, 'Getting paid')
  assert.equal(chunks[1].text, 'on an A-B-N?')
  assert.equal(displayText(chunks[1].text), 'on an ABN?')
  assert.deepEqual(chunks[0].highlight, ['paid'], 'the scene emphasis word is highlighted')
  for (let i = 1; i < chunks.length; i++) assert.ok(chunks[i].start >= chunks[i - 1].start)
  assert.equal(displayText('Comment your T-F-N'), 'Comment your TFN')
  assert.deepEqual(headlineHighlight('Plan for ABN tax', 'plan', 'A-B-N'), ['Plan'])
  assert.deepEqual(headlineHighlight('Paid on an ABN?', 'Listen', 'A-B-N'), ['ABN?'], 'falls back to the key term')
})

/** Counts pixels close to a colour in a PNG. */
async function countColour(png: Buffer, hex: string, tol = 12) {
  const img = await loadImage(png)
  const c = createCanvas(img.width, img.height)
  const ctx = c.getContext('2d')
  ctx.drawImage(img, 0, 0)
  const d = ctx.getImageData(0, 0, img.width, img.height).data
  const [r, g, b] = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16))
  let n = 0
  for (let i = 0; i < d.length; i += 4) if (d[i + 3] > 250 && Math.abs(d[i] - r) <= tol && Math.abs(d[i + 1] - g) <= tol && Math.abs(d[i + 2] - b) <= tol) n++
  return { n, w: img.width, h: img.height, data: d }
}

test('brand layers: exact SVT colours, lime only as a highlight, inside the safe zone', async () => {
  const head = headlinePng('Paid on an ABN?', ['ABN?'])
  const h = await countColour(head, BRAND.white)
  assert.equal(h.w, 1080); assert.equal(h.h, 1920)
  assert.ok(h.n > 10_000, 'white headline box')
  assert.ok((await countColour(head, BRAND.lime)).n > 2_000, 'lime highlighter behind the key word')
  assert.ok((await countColour(head, BRAND.ink)).n > 500, 'ink text')

  const cap = captionPng('So plan for your', ['plan'])
  assert.ok((await countColour(cap, BRAND.ink)).n > 10_000, 'ink caption box')
  assert.ok((await countColour(cap, BRAND.lime)).n > 200, 'emphasised word in lime on ink')

  for (const png of [head, cap, headlinePng('A much longer headline that must shrink to fit the zone', [])]) {
    const { data, w, h: H } = await countColour(png, BRAND.white)
    for (let y = 0; y < H; y++) for (let x = 0; x < w; x++) {
      if (data[(y * w + x) * 4 + 3] === 0) continue
      assert.ok(x >= BRAND.safe.left && x <= BRAND.safe.right && y >= BRAND.safe.top && y <= BRAND.safe.bottom,
        `drawn pixel at ${x},${y} is outside the safe zone`)
    }
  }
})

test('vision answers are parsed safely', () => {
  assert.deepEqual(parseVisionIssues('{"issues":[]}'), [])
  const [i] = parseVisionIssues('Here: {"issues":[{"second":4.2,"scene":2,"problem":"Six fingers","severity":"block"}]}')
  assert.equal(i.severity, 'block'); assert.equal(i.scene, 2); assert.equal(i.second, 4.2)
  assert.equal(parseVisionIssues('no json').length, 1)
})

// ── End to end: real ffmpeg, real Postgres (PGlite), a fake HeyGen ─────────────

const cleanVision: VisionReviewer = { async review(frames) { assert.ok(frames.length >= 8); return { issues: [], inputTokens: 100, outputTokens: 10, model: 'test' } } }

async function setup() {
  const db = await freshDb()
  const store = new EllaRepo(new SqlEllaDb(db))
  await store.syncRegistry(toRegistry(loadSvtLibrary()))
  const claim = (await store.claimBlog({}, [], 'test'))!
  const dir = await mkdtemp(join(tmpdir(), 'ella-e2e-'))
  const media = new LocalMediaStore(join(dir, 'store'))
  await media.put('looks/master.png', new Uint8Array(await readFile(join(process.cwd(), 'src/lib/ella/assets/character/ella-master.png'))))
  const provider = new FakeHeyGen(dir)
  const steps = store
  const settings: ProduceSettings = {
    productionId: claim.productionId, scriptVersion: 1, script, voiceId: 'voice_test', lookImagePath: 'looks/master.png',
    workDir: join(dir, 'work'), pollEveryMs: 1, maxUsd: 6,
  }
  const deps = { store, steps, provider, media, vision: cleanVision, download: async (u: string) => new Uint8Array(await readFile(u)), sleep: async () => {} }
  return { db, store, steps, provider, media, settings, deps }
}

test('end to end: approved script to a branded, checked 1080x1920 video', { timeout: 300_000 }, async () => {
  const { db, provider, media, settings, deps } = await setup()
  const r = await produceVideo(deps, settings)
  assert.equal(r.status, 'video_ready', JSON.stringify(r))
  const p = await probe(await media.localPath(r.videoPath))
  assert.equal(p.width, 1080); assert.equal(p.height, 1920); assert.ok(p.hasAudio)
  assert.ok(r.duration > 10 && r.duration < 35, `duration ${r.duration}`)
  assert.equal(r.issues.filter(i => i.severity === 'block').length, 0, JSON.stringify(r.issues))
  assert.deepEqual({ tts: provider.calls.tts, avatar: provider.calls.avatar, clip: provider.calls.clip }, { tts: 1, avatar: 3, clip: 5 })
  assert.ok(r.spentUsd > 0 && r.spentUsd <= 6)

  const st = await db.query<{ status: string }>('SELECT status FROM ella_productions WHERE id = $1', [settings.productionId])
  assert.equal(st.rows[0].status, 'video_ready')
  const rows = await db.query<{ n: number }>("SELECT count(*)::int AS n FROM ella_steps WHERE status = 'completed'")
  assert.equal(rows.rows[0].n, 9)

  // Running again pays for nothing: every step is reused.
  const again = await produceVideo(deps, settings)
  assert.equal(again.status, 'video_ready')
  assert.deepEqual({ tts: provider.calls.tts, avatar: provider.calls.avatar, clip: provider.calls.clip }, { tts: 1, avatar: 3, clip: 5 })

  // Regenerating scene 5 makes one new clip only.
  const re = await regenerateScene(deps, settings, 5)
  assert.equal(re.status, 'video_ready')
  assert.deepEqual({ tts: provider.calls.tts, avatar: provider.calls.avatar, clip: provider.calls.clip }, { tts: 1, avatar: 3, clip: 6 })
  const renders = await db.query<{ n: number }>('SELECT count(*)::int AS n FROM ella_renders WHERE production_id = $1', [settings.productionId])
  assert.equal(renders.rows[0].n, 3)

  // Brand check on a real frame: the headline box is drawn in SVT white and lime.
  const frame = join(settings.workDir, 'check.png')
  await ffmpeg(['-ss', '3.0', '-i', await media.localPath(r.videoPath), '-frames:v', '1', frame])
  const px = await countColour(await readFile(frame), BRAND.lime, 30)
  assert.ok(px.n > 1_000, 'lime highlight visible in the rendered video')
})

test('a failed provider job is recorded, and the next run retries only that scene', { timeout: 300_000 }, async () => {
  const { db, provider, settings, deps } = await setup()
  provider.failNextClip = true
  const r = await produceVideo(deps, settings)
  assert.equal(r.status, 'failed')
  const failed = await db.query<{ n: number }>("SELECT count(*)::int AS n FROM ella_steps WHERE status = 'failed'")
  assert.equal(failed.rows[0].n, 1)
  const st = await db.query<{ status: string }>('SELECT status FROM ella_productions WHERE id = $1', [settings.productionId])
  assert.equal(st.rows[0].status, 'video_needs_jo')
  const before = { ...provider.calls }
  const r2 = await produceVideo(deps, settings)
  assert.equal(r2.status, 'video_ready', JSON.stringify(r2))
  assert.equal(provider.calls.clip - before.clip, 1, 'only the failed scene is submitted again')
  assert.equal(provider.calls.avatar - before.avatar, 0)
  assert.equal(provider.calls.tts - before.tts, 0)
})

test('the spending cap stops paid calls before they are made', { timeout: 120_000 }, async () => {
  const { provider, settings, deps } = await setup()
  const r = await produceVideo(deps, { ...settings, maxUsd: 0.5 })
  assert.equal(r.status, 'failed')
  if (r.status === 'failed') assert.match(r.error, /Spending cap/)
  assert.ok(r.spentUsd <= 0.5, `spent ${r.spentUsd}`)
  assert.ok(provider.calls.avatar + provider.calls.clip < 8, 'calls stop at the first one that would cross the cap')
})

test('a blocking QA problem sends the video to Jo, with the second and the scene', { timeout: 300_000 }, async () => {
  const { settings, deps } = await setup()
  const strict: VisionReviewer = { async review() { return { issues: [{ second: 9.1, scene: 4, check: 'vision', problem: 'Extra finger', severity: 'block' }], inputTokens: 1, outputTokens: 1, model: 't' } } }
  const r = await produceVideo({ ...deps, vision: strict }, settings)
  assert.equal(r.status, 'video_needs_jo')
  assert.ok('issues' in r && r.issues.some(i => i.scene === 4 && i.second === 9.1))
})

test('the edit plan never leaves a gap and matches the voice length', () => {
  const text = voiceText(script.scenes)
  const { chars, duration } = fakeChars(text)
  const timed = timeScenes(script.scenes, charsToWords(chars), duration)
  const clips = Object.fromEntries(script.scenes.map(s => [s.scene, `/x/${s.scene}.mp4`]))
  const plan = buildEditPlan({ scenes: script.scenes, timed, clips, voicePath: '/x/v.wav', keyTerm: script.keyTerm })
  assert.ok(Math.abs(plan.duration - (duration + 0.4)) < 0.02)
  assert.equal(plan.scenes[0].headline, 'Paid on an ABN?', 'the hook headline stays: no caption repeats it')
  assert.equal(plan.scenes[1].headline, 'ABN: usually no tax taken')
  const texts = plan.captions.map(c => c.text)
  assert.ok(texts.includes('Send this to'), texts.join(' | '))
  assert.ok(texts.includes('a friend who delivers.'), texts.join(' | '))
  for (const c of texts) assert.ok(!/ (a|the|an)$/i.test(c), `chunk ends on an article: ${c}`)
  assert.ok(plan.captions.every(c => !/[A-Z]-[A-Z]/.test(c.text)), 'captions never show spelled acronyms')
})
