import test from 'node:test'
import assert from 'node:assert/strict'
import { applyEdit, ClaudeEditor, EDITOR_TOOL } from '../video/editor'
import { buildEditPlan } from '../video/compose'
import { workedExample } from './fixtures/worked-example'
import type { Llm } from '../script/llm'

const d = workedExample()
const timed = d.scenes.map(s => ({ scene: s.scene, start: s.start, end: s.end, ellaInFrame: s.ellaInFrame, words: [] }))
const clips = Object.fromEntries(d.scenes.filter(s => s.shot === 'clip').map(s => [s.scene, `/c${s.scene}.mp4`]))
const plan = () => buildEditPlan({ scenes: d.scenes, timed: timed as never, clips, take: '/take.mp4', voicePath: '/v.mp3', keyTerm: d.keyTerm })

test('editor: safe choices are applied, unsafe ones fall back to the default', () => {
  const p = plan()
  const ella = p.scenes.filter(s => s.shot === 'ella').map(s => s.scene)
  const out = applyEdit(p, d.scenes, [
    { scene: ella[0], zoom: 1.1, headline: 'Paid on an ABN?', why: 'hook' },          // no punch-in on the hook
    { scene: ella[1], zoom: 1.1, headline: '', why: 'keep the face clear' },          // allowed
    { scene: ella[2], zoom: 1.1, headline: 'Get your refund fast now', why: 'bad' },  // refund words: ignored
    { scene: 4, zoom: 1.1, headline: 'Card text', why: 'card' },                      // a card keeps its card, no zoom
  ])
  const by = (n: number) => out.scenes.find(s => s.scene === n)!
  assert.equal(by(ella[0]).zoom, 1)
  assert.equal(by(ella[1]).zoom, 1.1)
  assert.equal(by(ella[1]).headline, '')
  assert.notEqual(by(ella[2]).headline, 'Get your refund fast now')
  assert.equal(by(4).headline, '')
  assert.ok(by(4).graphic)
})

test('editor: a hedged line keeps its hedge on screen', () => {
  const p = plan()
  const hedged = d.scenes.find(s => /\busually\b/i.test(s.onScreen) && s.shot !== 'graphic')!
  const out = applyEdit(p, d.scenes, [{ scene: hedged.scene, zoom: 1, headline: 'No tax taken', why: '' }])
  assert.notEqual(out.scenes.find(s => s.scene === hedged.scene)!.headline, 'No tax taken')
})

test('editor: Claude gets the cut and the problems, and answers in the edit schema', async () => {
  let seen = ''
  const llm: Llm = { complete: async (_s, u, o) => {
    seen = u
    assert.equal(o?.jsonTool?.name, EDITOR_TOOL.name)
    return { text: JSON.stringify({ decisions: [{ scene: 3, zoom: 1.1, headline: '', why: 'face' }], summary: 'Clean.' }), model: 'm', inputTokens: 1, outputTokens: 1 }
  } }
  const r = await new ClaudeEditor(llm).plan({ plan: plan(), scenes: d.scenes, problems: ['scene 3: headline covers her face'] })
  assert.ok(seen.includes('headline covers her face'))
  assert.equal(r.decisions[0].scene, 3)
})
