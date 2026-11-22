import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { PDFDocument } from 'pdf-lib'
import { loadSvtLibrary } from '../library-svt'
import { toRegistry } from '../registry'
import { listStartRuns, startRunPdf } from '../start-report'
import { studioKey } from '../stage1'
import { freshDb, repoOf } from './helpers'

const mig = (f: string) => readFileSync(join(process.cwd(), 'supabase', 'migrations', f), 'utf8')
const T0 = Date.parse('2026-11-22T00:00:00Z')
const at = (min: number) => new Date(T0 + min * 60_000).toISOString()

async function setup(withRange = true) {
  const db = await freshDb()
  await db.exec(mig('056_ella_trace.sql'))
  if (withRange) await db.exec(mig('057_ella_audit_range.sql'))
  const repo = repoOf(db)
  await repo.syncRegistry(toRegistry(loadSvtLibrary()).slice(0, 10).map(r => ({ ...r, excluded: false })))
  await db.exec('DELETE FROM ella_audit')
  const log = async (min: number, actor: string, action: string, detail: Record<string, unknown> = {}) => {
    await db.query('INSERT INTO ella_audit (at, actor, action, detail) VALUES ($1, $2, $3, $4::jsonb)', [at(min), actor, action, JSON.stringify(detail)])
  }
  /** A drawn blog, with its claim line at `min`. */
  const draw = async (min: number) => {
    const c = (await repo.claimBlog({}, [], 'test'))!
    await db.exec("DELETE FROM ella_audit WHERE action = 'claim'")
    await log(min, 'ella-stage1', 'claim', { slug: c.slug, production_id: c.productionId })
    return c.productionId
  }
  return { db, repo, log, draw }
}

test('a Start whose script gave up is listed as failed, with where and why; one that made a video is not', async () => {
  const { repo, log, draw } = await setup()
  // Start 1: the script fails its checks and gives up.
  await log(0, 'web', 'request:write_script', { body: { kind: 'write_script' } })
  const p1 = await draw(1)
  await repo.setStatus(p1, 'scripting')
  await repo.setSettings({ [studioKey(p1)]: { productionId: p1, slug: 's', pillar: 'x', phase: 'revise', log: [{ phase: 'draftA', at: at(3), seconds: 40, ok: false, note: 'time.short: voice ends at 22 s' }], drafts: [], rewrites: 4, failures: 2, startedAt: at(1), updatedAt: at(9) } })
  await log(9, 'ella-stage1', 'script_gave_up', { productionId: p1, reason: 'still failing time.short after 4 fixes' })
  await repo.setStatus(p1, 'needs_jo', { note: 'Gave up after 4 fixes' })
  await log(10, 'web', 'request:client_end', { reason: 'a step failed: script needs Jo' })
  // Start 2: a video reaches Ready to post.
  await log(30, 'web', 'request:write_script', { body: { kind: 'write_script' } })
  const p2 = await draw(31)
  await repo.setStatus(p2, 'video_ready')
  // Start 3: no blog drawn, long ago (the latest Start, but not fresh).
  await log(60, 'web', 'request:write_script', { body: { kind: 'write_script' } })
  await log(61, 'tick', 'tick:error', { error: 'HeyGen balance check: HTTP 401' })

  const { runs, partial } = await listStartRuns(repo, 30, T0 + 24 * 3600_000)
  assert.equal(partial, false)
  assert.equal(runs.length, 3)
  const [r3, r2, r1] = runs
  assert.equal(r1.outcome, 'failed'); assert.equal(r1.productionId, p1); assert.match(r1.where, /^Script/)
  assert.match(r1.reason, /Gave up after 4 fixes|time\.short/)
  assert.equal(r2.outcome, 'video')
  assert.equal(r3.outcome, 'failed'); assert.equal(r3.productionId, null); assert.match(r3.reason, /HTTP 401/); assert.equal(r3.where, 'Before the script')

  const pdf = await startRunPdf(repo, r1.id, { version: 'test', now: T0 + 24 * 3600_000, config: { heygenApiKey: 'SECRET-VALUE', bufferAhead: 1 } })
  assert.equal(pdf.outcome, 'failed')
  assert.match(pdf.filename, /^ella-start-2026-11-22-00-00-.*\.pdf$/)
  const bytes = Buffer.from(pdf.base64, 'base64')
  assert.ok(bytes.subarray(0, 5).toString() === '%PDF-')
  assert.ok((await PDFDocument.load(bytes)).getPageCount() >= 2)
  assert.ok(!bytes.toString('latin1').includes('SECRET-VALUE'), 'keys never reach the PDF')
})

test('a Start stopped by Jo says so; a fresh Start with nothing yet is still running', async () => {
  const { repo, log, draw } = await setup()
  await log(0, 'web', 'request:write_script', { body: { kind: 'write_script' } })
  const p = await draw(1)
  await log(5, 'jo', 'stop_all', { stopped: [p] })
  await repo.setStatus(p, 'cancelled', { note: 'Stopped by Jo' })
  await log(20, 'web', 'request:write_script', { body: { kind: 'write_script' } })
  const { runs } = await listStartRuns(repo, 30, T0 + 25 * 60_000)
  assert.equal(runs[0].outcome, 'running')
  assert.equal(runs[1].outcome, 'failed'); assert.match(runs[1].reason, /Stopped by Jo/)
})

test('without migration 057 the list still works from the latest log lines, and says it is partial', async () => {
  const { repo, log } = await setup(false)
  await log(0, 'web', 'request:write_script', { body: { kind: 'write_script' } })
  await log(1, 'web', 'failed:write_script', { error: 'ella_api_claim_blog failed: timeout' })
  const { runs, partial } = await listStartRuns(repo, 30, T0 + 3600_000)
  assert.equal(partial, true)
  assert.equal(runs.length, 1); assert.equal(runs[0].outcome, 'failed'); assert.match(runs[0].reason, /timeout/)
  const pdf = await startRunPdf(repo, runs[0].id, { version: 'test', now: T0 + 3600_000 })
  assert.ok(Buffer.from(pdf.base64, 'base64').length > 1000)
})
