// Scene times follow the real speaking rate (Jo, Nov 22): a script whose times run long for its words is re-timed; its words never change.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { fitTimes } from '../script/studio'
import type { ScriptDraft } from '../script/types'

const ten = 'one two three four five six seven eight nine ten'
const draft = (end: number): ScriptDraft => ({ scenes: [
  { scene: 1, start: 0, end: end / 2, voice: ten.split(' ').slice(0, 5).join(' ') },
  { scene: 2, start: end / 2, end, voice: ten.split(' ').slice(5).join(' ') },
] }) as unknown as ScriptDraft

test('fit times: a script whose times run long for its words is shortened to the real speed, words unchanged', () => {
  const d = draft(10) // 10 words at 100 wpm = 6 s, the script says 10 s
  const out = fitTimes(d, 100)
  assert.equal(out.scenes.map(x => x.voice).join(' '), d.scenes.map(x => x.voice).join(' '))
  assert.equal(out.scenes.at(-1)!.end, 6)
  assert.equal(out.scenes[1].start, out.scenes[0].end, 'scenes stay contiguous')
})

test('fit times: times that already match the words are left alone', () => {
  const d = draft(7)
  assert.equal(fitTimes(d, 100), d)
})
