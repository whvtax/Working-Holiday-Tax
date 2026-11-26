import { test } from 'node:test'
import assert from 'node:assert/strict'
import { loadSvtLibrary } from '../library-svt'
import { EXCLUDED_SLUGS, pillarWeights, recentKeyTerms, toRegistry, PILLARS } from '../registry'

test('the live SVT library has 188 unique English articles (155 long, 23 blog, 10 guides)', () => {
  const lib = loadSvtLibrary()
  assert.equal(lib.length, 188)
  assert.equal(lib.filter(a => a.kind === 'long').length, 155)
  assert.equal(lib.filter(a => a.kind === 'blog').length, 23)
  assert.equal(lib.filter(a => a.kind === 'guide').length, 10)
  assert.equal(new Set(lib.map(a => a.slug)).size, 188)
  for (const a of lib) assert.ok(a.text.length > 200, `${a.slug} has text`)
})

test('sales and service pages are excluded; 184 can be drawn', () => {
  const reg = toRegistry(loadSvtLibrary())
  const excluded = reg.filter(r => r.excluded).map(r => r.slug).sort()
  assert.deepEqual(excluded, Object.keys(EXCLUDED_SLUGS).sort())
  assert.equal(reg.filter(r => !r.excluded).length, 184)
})

test('every article gets a known pillar and a stable hash', () => {
  const a = toRegistry(loadSvtLibrary())
  const b = toRegistry(loadSvtLibrary())
  for (const r of a) assert.ok((PILLARS as readonly string[]).includes(r.pillar), r.slug)
  assert.deepEqual(a.map(r => r.contentHash), b.map(r => r.contentHash))
})

test('pillar weights favour pillars below their target share', () => {
  const w = pillarWeights(Array(10).fill('Work and income'))
  assert.ok(w['Myth vs fact'] > w['Work and income'])
  const none = pillarWeights([])
  assert.equal(none['Myth vs fact'], 0.3)
})

test('recent key terms match slug spelling', () => {
  assert.deepEqual(recentKeyTerms([{ keyTerm: 'A-B-N' }, { keyTerm: 'Tax residency' }, { keyTerm: null }]), ['abn', 'tax-residency'])
})
