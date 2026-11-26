import { test } from 'node:test'
import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { assignLook, ELLA_LOOKS, lookFile, nextLook, readRotation } from '../looks'
import { DEFAULT_CONFIG, mergeConfig } from '../config'

const ids = ELLA_LOOKS.map(l => l.id)

test('looks: every look has its photo in the assets folder and a unique id', () => {
  assert.equal(new Set(ids).size, ids.length)
  for (const l of ELLA_LOOKS) assert.ok(existsSync(join(process.cwd(), 'src/lib/ella/assets/character', l.file)), `missing ${l.file}`)
  assert.ok(ids.length >= 10)
})

test('looks: never the same look twice in a row, and a full cycle before any repeat', () => {
  let rot = readRotation(undefined)
  const given: string[] = []
  for (let i = 0; i < ids.length * 3; i++) {
    const r = assignLook(ids, rot, `p${i}`)
    rot = r.rotation
    given.push(r.lookId)
  }
  for (let i = 1; i < given.length; i++) assert.notEqual(given[i], given[i - 1], `repeat at ${i}`)
  for (let c = 0; c < 3; c++) {
    const cycle = given.slice(c * ids.length, (c + 1) * ids.length)
    assert.equal(new Set(cycle).size, ids.length, `cycle ${c} repeats a look`)
  }
})

test('looks: a video keeps its look on every later run', () => {
  const first = assignLook(ids, readRotation(undefined), 'prod-a')
  const again = assignLook(ids, first.rotation, 'prod-a')
  assert.equal(again.lookId, first.lookId)
  assert.equal(again.changed, false)
})

test('looks: drawn at random from what this cycle has not used; a new look joins the current cycle; one look is fine', () => {
  assert.equal(nextLook(['L1', 'L2', 'L3'], { history: ['L1', 'L2'], cycle: ['L1', 'L2'] }).lookId, 'L3')
  assert.equal(nextLook(['L1'], { history: ['L1'], cycle: ['L1'] }).lookId, 'L1')
  assert.notEqual(nextLook(['L1', 'L2'], { history: ['L2', 'L1'], cycle: ['L2', 'L1'] }).lookId, 'L1')
  const firsts = new Set<string>()
  for (let i = 0; i < 40; i++) firsts.add(assignLook(ids, readRotation(undefined), `x${i}`).lookId)
  assert.ok(firsts.size > 3, 'the first look is a real draw, not always the same')
  const r = nextLook(['A', 'B', 'C', 'D'], { history: ['A', 'B'], cycle: ['A', 'B'] }, () => 0.99)
  assert.equal(r.lookId, 'D'); assert.deepEqual(r.cycle, ['A', 'B', 'D'])
})

test('looks: the wardrobe comes from code even when an old one was saved', () => {
  const c = mergeConfig({ ellaLooks: [{ id: 'L1', path: 'looks/ella-master.png' }] })
  assert.deepEqual(c.ellaLooks, DEFAULT_CONFIG.ellaLooks)
  assert.equal(c.ellaLooks.length, ELLA_LOOKS.length)
  assert.equal(lookFile('looks/ella-L2.jpg'), 'ella-L2.jpg')
  assert.equal(lookFile('looks/unknown.png'), 'ella-master.png')
})
