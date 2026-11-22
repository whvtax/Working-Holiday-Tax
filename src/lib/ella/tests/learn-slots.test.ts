import { test } from 'node:test'
import assert from 'node:assert/strict'
import { proposeSlots } from '../learn'

const cur = [{ dow: 0, time: '18:30' }, { dow: 2, time: '19:30' }, { dow: 4, time: '19:30' }]
// 2026-11-24 is a Tuesday. 19:30 Sydney = 08:30 UTC (AEDT, UTC+11).
const row = (iso: string, reach: number) => ({ checkpoint: '7d', publishedAt: iso, reach, views: reach, shares: 0, saves: 0, comments: 0, likes: 0, follows: 0 }) as never

test('learning proposes slots only after enough videos, and never drops below the current count', () => {
  const few = proposeSlots([row('2026-11-24T08:30:00Z', 100)], cur)
  assert.equal(few.ready, false)
  assert.deepEqual(few.proposed, cur)
  const many = Array.from({ length: 12 }, (_, i) => row('2026-11-24T08:30:00Z', 100 + i))
  const p = proposeSlots(many, cur)
  assert.equal(p.ready, true)
  assert.equal(p.proposed.length, cur.length)
  assert.ok(p.proposed.some(x => x.dow === 2 && x.time === '19:30'))
})
