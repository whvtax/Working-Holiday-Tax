import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { loadSvtLibrary } from '../library-svt'
import { toRegistry } from '../registry'
import { EllaRepo } from '../store'
import { SqlEllaDb } from '../db'
import { freshDb, MIGRATION } from './helpers'

const registry = toRegistry(loadSvtLibrary())
const eligible = registry.filter(r => !r.excluded).length

test('migration runs twice without error and locks every Ella table', async () => {
  const db = await freshDb()
  await db.exec(readFileSync(MIGRATION, 'utf8'))
  const r = await db.query<{ relname: string; relrowsecurity: boolean }>(
    "SELECT relname, relrowsecurity FROM pg_class WHERE relname LIKE 'ella\\_%' AND relkind = 'r' ORDER BY relname")
  assert.equal(r.rows.length, 14)
  for (const row of r.rows) assert.equal(row.relrowsecurity, true, row.relname)
  const anon = await db.query<{ ok: boolean }>("SELECT has_table_privilege('anon', 'ella_productions', 'SELECT') AS ok")
  assert.equal(anon.rows[0].ok, false)
  const fn = await db.query<{ ok: boolean }>("SELECT has_function_privilege('anon', 'ella_claim_blog(jsonb, text[], text)', 'EXECUTE') AS ok")
  assert.equal(fn.rows[0].ok, false)
  // Every Ella function is closed to anon and open to the server role only.
  const open = await db.query<{ n: number }>(`SELECT count(*)::int AS n FROM pg_proc p WHERE p.proname LIKE 'ella\\_%'
    AND (has_function_privilege('anon', p.oid, 'EXECUTE') OR has_function_privilege('authenticated', p.oid, 'EXECUTE'))`)
  assert.equal(open.rows[0].n, 0)
  const api = await db.query<{ n: number }>(`SELECT count(*)::int AS n FROM pg_proc p WHERE p.proname LIKE 'ella\\_api\\_%'
    AND has_function_privilege('service_role', p.oid, 'EXECUTE')`)
  assert.ok(api.rows[0].n >= 30)
})

test('every eligible blog is drawn exactly once, then the library is empty with one alert', async () => {
  const db = await freshDb()
  const store = new EllaRepo(new SqlEllaDb(db))
  assert.equal(await store.syncRegistry(registry), registry.length)
  const drawn: string[] = []
  // Fire draws in parallel batches; the unique claim key must keep them apart.
  while (true) {
    const batch = await Promise.all(Array.from({ length: 8 }, () => store.claimBlog({}, [], 'test')))
    const got = batch.filter(Boolean).map(c => c!.slug)
    drawn.push(...got)
    if (got.length < 8) break
  }
  assert.equal(drawn.length, eligible)
  assert.equal(new Set(drawn).size, eligible, 'no blog was drawn twice')
  for (const slug of ['pricing', 'how-it-works', 'about', 'superannuation']) assert.ok(!drawn.includes(slug))

  assert.equal(await store.claimBlog({}, [], 'test'), null)
  assert.equal(await store.claimBlog({}, [], 'test'), null)
  const alerts = await db.query<{ n: number }>("SELECT count(*)::int AS n FROM ella_alerts WHERE kind = 'library_empty'")
  assert.equal(alerts.rows[0].n, 1, 'one alert per empty event, never repeated')
})

test('a new article after the library ran out is drawn and makes a new alert next time', async () => {
  const db = await freshDb()
  const store = new EllaRepo(new SqlEllaDb(db))
  const small = registry.slice(0, 3).map(r => ({ ...r, excluded: false }))
  await store.syncRegistry(small)
  for (let i = 0; i < 3; i++) assert.ok(await store.claimBlog({}, [], 't'))
  assert.equal(await store.claimBlog({}, [], 't'), null)
  await store.syncRegistry([...small, { ...registry[5], excluded: false }])
  const c = await store.claimBlog({}, [], 't')
  assert.equal(c?.slug, registry[5].slug)
  assert.equal(await store.claimBlog({}, [], 't'), null)
  // Blog-drawn events are alerts too now; this test is about the library-empty alert only.
  const n = await db.query<{ n: number }>("SELECT count(*)::int AS n FROM ella_alerts WHERE kind = 'library_empty'")
  assert.equal(n.rows[0].n, 2)
})

test('only a cancelled production can release its blog, and the release is logged', async () => {
  const db = await freshDb()
  const store = new EllaRepo(new SqlEllaDb(db))
  await store.syncRegistry(registry.slice(0, 1).map(r => ({ ...r, excluded: false })))
  const c = (await store.claimBlog({}, [], 't'))!
  assert.equal(await store.releaseSlug(c.slug, 'jo'), false, 'not cancelled yet')
  await store.setStatus(c.productionId, 'cancelled')
  assert.equal(await store.releaseSlug(c.slug, 'jo'), true)
  const again = await store.claimBlog({}, [], 't')
  assert.equal(again?.slug, c.slug)
  const log = await db.query<{ action: string }>("SELECT action FROM ella_audit ORDER BY id")
  assert.deepEqual(log.rows.map(r => r.action), ['claim', 'release', 'claim'])
})

test('recent key terms are skipped while other blogs remain, then the filter drops', async () => {
  const store = new EllaRepo(new SqlEllaDb(await freshDb()))
  const abn = registry.filter(r => r.slug.includes('abn') && !r.excluded).slice(0, 2)
  const other = registry.filter(r => !r.slug.includes('abn') && !r.excluded).slice(0, 2)
  await store.syncRegistry([...abn, ...other])
  const first = [(await store.claimBlog({}, ['abn'], 't'))!, (await store.claimBlog({}, ['abn'], 't'))!]
  for (const c of first) assert.ok(!c.slug.includes('abn'), c.slug)
  const third = await store.claimBlog({}, ['abn'], 't')
  assert.ok(third?.slug.includes('abn'), 'filter dropped when nothing else is left')
})

test('pillar weights steer the draw', async () => {
  const store = new EllaRepo(new SqlEllaDb(await freshDb()))
  await store.syncRegistry(registry)
  const picks: string[] = []
  for (let i = 0; i < 40; i++) picks.push((await store.claimBlog({ 'Trust and safety': 1000, 'Deadlines': 1000 }, [], 't'))!.pillar)
  const favoured = picks.filter(p => p === 'Trust and safety' || p === 'Deadlines').length
  const available = registry.filter(r => !r.excluded && (r.pillar === 'Trust and safety' || r.pillar === 'Deadlines')).length
  assert.ok(favoured >= Math.min(available, 40) - 2, `favoured ${favoured} of 40, ${available} available`)
})
