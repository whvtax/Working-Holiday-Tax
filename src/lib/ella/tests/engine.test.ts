import { test } from 'node:test'
import assert from 'node:assert/strict'
import { BIBLE_V1 } from '../script/bible'
import { loadSvtLibrary } from '../library-svt'
import { buildPrompts, generateScript } from '../script/engine'
import { AnthropicLlm, type Llm } from '../script/llm'
import { EllaRepo } from '../store'
import { SqlEllaDb } from '../db'
import { runStage1 } from '../stage1'
import { freshDb } from './helpers'
import { workedExample } from './fixtures/worked-example'

const bible = BIBLE_V1
const library = loadSvtLibrary()
const article = library.find(a => a.slug === 'tfn-vs-abn-international-students')!
const reply = (o: unknown) => '```json\n' + JSON.stringify(o) + '\n```'

class ScriptedLlm implements Llm {
  calls: Array<{ system: string; user: string }> = []
  constructor(private replies: string[]) {}
  async complete(system: string, user: string) {
    this.calls.push({ system, user })
    return { text: this.replies[Math.min(this.calls.length - 1, this.replies.length - 1)], model: 'test-model', inputTokens: 100, outputTokens: 50 }
  }
}

const input = () => ({
  bible, article, pillar: 'Work and income', ellaLooks: ['L1', 'L2'], testChange: 'none', recentKeyTerms: [],
  ctx: { articleText: article.text, articleCategory: article.category, previousHookType: null, recentCtaTypes: [], agentSignoffConfirmed: false, allowPrice: false },
})

test('the prompt carries the whole bible, the article, its sources and the gates', () => {
  const { system, user } = buildPrompts(input())
  assert.ok(system.includes('Ella script bible'))
  assert.ok(system.includes('## 19. Worked example'))
  assert.ok(user.includes(article.title))
  assert.ok(user.includes('statement-by-supplier-not-quoting-an-abn'))
  assert.ok(user.includes('do not mention WhatsApp anywhere'))
})

test('a failing draft is rewritten with the exact issues, then passes', async () => {
  const bad = workedExample(); bad.scenes[0].voice = 'If you work on an A-B-N, listen to this.'
  const llm = new ScriptedLlm([reply(bad), reply(workedExample())])
  const r = await generateScript(input(), llm)
  assert.equal(r.passed, true)
  assert.equal(r.attempts, 2)
  assert.ok(llm.calls[1].user.includes('[hook.long]'))
})

test('after 3 failed attempts the best draft goes to Jo with the reasons', async () => {
  const bad = workedExample(); bad.scenes[3].voice = 'Get your refund on your tax return.'
  const llm = new ScriptedLlm(['not json at all', reply(bad)])
  const r = await generateScript(input(), llm)
  assert.equal(r.passed, false)
  assert.equal(r.attempts, 3)
  assert.equal(llm.calls.length, 3)
  assert.ok(r.draft)
  assert.ok(r.issues.some(i => i.code === 'compliance'))
})

test('stage 1 end to end: draw, script, store, status', async () => {
  const db = await freshDb()
  const store = new EllaRepo(new SqlEllaDb(db))
  // Make the draw deterministic: only the example's article is in the registry.
  const lib = [article]
  const out = await runStage1({ store, library: lib, llm: new ScriptedLlm([reply(workedExample())]) },
    { bible, ellaLooks: ['L1'], agentSignoffConfirmed: false, allowPrice: false })
  assert.equal(out.status, 'script_ready')
  const p = await db.query<{ status: string; key_term: string; hook_type: string; cta_type: string }>('SELECT status, key_term, hook_type, cta_type FROM ella_productions')
  assert.deepEqual(p.rows[0], { status: 'script_ready', key_term: 'A-B-N', hook_type: 'If you', cta_type: 'Send' })
  const s = await db.query<{ version: number; bible_version: string; passed: boolean }>('SELECT version, bible_version, passed FROM ella_scripts')
  assert.deepEqual(s.rows[0], { version: 1, bible_version: 'v1', passed: true })
  const u = await db.query<{ feature: string; input_tokens: number }>('SELECT feature, input_tokens FROM ella_ai_usage')
  assert.deepEqual(u.rows[0], { feature: 'video_script', input_tokens: 100 })

  // The library is now used up.
  const again = await runStage1({ store, library: lib, llm: new ScriptedLlm([reply(workedExample())]) },
    { bible, ellaLooks: ['L1'], agentSignoffConfirmed: false, allowPrice: false })
  assert.equal(again.status, 'library_empty')
})

test('the model client sends the key in a header and never without one', async () => {
  let seen: RequestInit | undefined
  const fake = (async (_url: string, init: RequestInit) => {
    seen = init
    return new Response(JSON.stringify({ content: [{ type: 'text', text: 'hi' }], usage: { input_tokens: 3, output_tokens: 1 }, model: 'm' }))
  }) as unknown as typeof fetch
  const r = await new AnthropicLlm({ apiKey: 'k', model: 'm', fetchImpl: fake }).complete('s', 'u')
  assert.equal(r.text, 'hi')
  assert.equal((seen!.headers as Record<string, string>)['x-api-key'], 'k')
  const saved = process.env.ANTHROPIC_API_KEY; delete process.env.ANTHROPIC_API_KEY
  await assert.rejects(new AnthropicLlm({ model: 'm', fetchImpl: fake }).complete('s', 'u'), /Missing ANTHROPIC_API_KEY/)
  if (saved) process.env.ANTHROPIC_API_KEY = saved
})
