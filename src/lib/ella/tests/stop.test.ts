// Stop rules (Jo, Nov 22): Stop halts everything in progress; Start resumes; scheduled runs wait for Start.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { haltsRun, stopped } from '../stop'

test('stop: nothing is halted before any Stop', () => {
  assert.equal(haltsRun(0, 0, 1_000), false)
})

test('stop: a run that began before the Stop is halted, even after a later Start', () => {
  assert.equal(haltsRun(2_000, 1_500, 1_000), true, 'in flight when Stop was pressed')
  assert.equal(haltsRun(2_000, 3_000, 1_000), true, 'an old request never resumes')
})

test('stop: a scheduled run after the Stop waits until Start is pressed', () => {
  assert.equal(haltsRun(2_000, 0, 2_500), true, 'no Start since the Stop')
  assert.equal(haltsRun(2_000, 1_500, 2_500), true, 'the last Start was before the Stop')
})

test('stop: a run started by Start after the Stop goes on', () => {
  assert.equal(haltsRun(2_000, 2_400, 2_500), false)
})

test('stop: the settings reader decides the same way', async () => {
  const repo = { settings: async () => ({ ella_stop_at: 2_000, ella_start_at: 1_500 }) }
  assert.equal(await stopped(repo, 1_000), true)
  assert.equal(await stopped(repo, 2_500), true)
  const none = { settings: async () => ({}) }
  assert.equal(await stopped(none, 1_000), false)
})
