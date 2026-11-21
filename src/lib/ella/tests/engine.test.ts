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
import { StudioLlm, studioResearch } from './fakes'
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
  const bad = workedExample(); bad.scenes[0].voice = 'If you work on an A-B-N in Australia as a student, please listen to this right now.'
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
  const out = await runStage1({ store, library: lib, llm: new StudioLlm() },
    { bible, ellaLooks: ['L1'], agentSignoffConfirmed: false, allowPrice: false })
  assert.equal(out.status, 'script_ready')
  const p = await db.query<{ status: string; key_term: string; hook_type: string; cta_type: string }>('SELECT status, key_term, hook_type, cta_type FROM ella_productions')
  assert.deepEqual(p.rows[0], { status: 'script_ready', key_term: 'A-B-N', hook_type: 'If you', cta_type: 'Send' })
  const s = await db.query<{ version: number; bible_version: string; passed: boolean }>('SELECT version, bible_version, passed FROM ella_scripts')
  assert.deepEqual(s.rows[0], { version: 1, bible_version: 'v2', passed: true })
  const u = await db.query<{ feature: string; input_tokens: number }>('SELECT feature, input_tokens FROM ella_ai_usage')
  assert.deepEqual(u.rows[0], { feature: 'video_script', input_tokens: 100 })

  // The library is now used up.
  const again = await runStage1({ store, library: lib, llm: new StudioLlm() },
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

test('the reply reader copes with prose, comments, trailing commas and says why it failed', async () => {
  const { readDraft } = await import('../script/engine')
  const json = JSON.stringify(workedExample())
  assert.ok(readDraft(json).draft, 'bare JSON')
  assert.ok(readDraft(`Step 1. Ideas...\nHere it is:\n\`\`\`json\n${json}\n\`\`\`\nDone.`).draft, 'fenced with prose around')
  assert.ok(readDraft(`Some notes {like this}.\n${json}\nThanks`).draft, 'prose with braces, no fence')
  const commented = json.replace('"coreMessage":', '"coreMessage": // 15 words or fewer\n').replace(/\]\}$/, '],}')
  assert.ok(readDraft(commented).draft, 'schema comments and trailing commas')
  assert.ok(readDraft('{"coreMessage": "a // b", "scenes": []}').draft?.coreMessage === 'a // b', 'slashes inside strings are kept')
  const cut = readDraft('```json\n' + json.slice(0, 400))
  assert.equal(cut.draft, null)
  assert.ok(cut.error && cut.error.length > 0)
})

test('no rewrite starts when it cannot finish before the server stops the run', async () => {
  let calls = 0
  const bad: Llm = { complete: async () => { calls++; return { text: 'not json', model: 'm', inputTokens: 1, outputTokens: 1 } } }
  let t = 0
  const inp = { ...input(), deadline: 150_000, now: () => t }
  const llm: Llm = { complete: async (a, b) => { t += 80_000; return bad.complete(a, b) } }
  const r = await generateScript(inp, llm)
  assert.equal(calls, 1, 'after 80 s only 70 s are left, less than one attempt')
  assert.equal(r.attempts, 1)
  assert.ok(r.issues.some(i => i.code === 'engine.time'))
  assert.ok(r.issues.some(i => i.code === 'engine.parse' && /Attempt 1/.test(i.message)))
})

test('the script is requested in the JSON outputs format and read from the answer text', async () => {
  let sent: Record<string, unknown> | undefined
  const fake = (async (_u: string, init: RequestInit) => {
    sent = JSON.parse(String(init.body))
    return new Response(JSON.stringify({ model: 'm', stop_reason: 'end_turn', usage: { input_tokens: 5, output_tokens: 7 },
      content: [{ type: 'thinking', thinking: 'plan the hook' }, { type: 'text', text: JSON.stringify(workedExample()) }] }), { status: 200 })
  }) as unknown as typeof fetch
  const { SCRIPT_TOOL, readDraft } = await import('../script/engine')
  const r = await new AnthropicLlm({ apiKey: 'k', model: 'm', fetchImpl: fake }).complete('s', 'u', { jsonTool: SCRIPT_TOOL })
  const fmt = (sent!.output_config as { format: { type: string; schema: { additionalProperties: boolean; required: string[] } } }).format
  assert.equal(fmt.type, 'json_schema')
  assert.equal(fmt.schema.additionalProperties, false)
  assert.ok(!('tool_choice' in sent!), 'forced tools are refused by some models')
  assert.ok(!fmt.schema.required.includes('lengthReason'))
  assert.equal(readDraft(r.text).draft?.scenes.length, 8, 'thinking is skipped, the answer is read')
  // Every object in the schema is closed, as the API requires.
  const open: string[] = []
  const walk = (n: unknown, at: string) => { if (n && typeof n === 'object') { const o = n as Record<string, unknown>; if (o.type === 'object' && o.additionalProperties !== false) open.push(at); for (const [k, v] of Object.entries(o)) walk(v, `${at}.${k}`) } }
  walk(fmt.schema, 'schema')
  assert.deepEqual(open, [])
})

// ── The script studio ─────────────────────────────────────────────────────
import { advanceStudio, newStudio, studioOutcome, STAGE_MS } from '../script/studio'

const studioState = () => newStudio({ productionId: 'p1', slug: article.slug, pillar: 'Work and income', recentKeyTerms: [], testChange: 'none', ctx: input().ctx }, new Date('2026-11-20T00:00:00Z'))
const settings = { bible, ellaLooks: ['L1'] }

test('studio: research, two drafts and a blind judge make a ready script with its research and scores', async () => {
  const llm = new StudioLlm()
  const r = await advanceStudio({ state: studioState(), article, settings, llm })
  assert.equal(r.state.phase, 'done')
  assert.deepEqual(llm.calls.map(c => c.stage), ['ella_research', 'ella_script', 'ella_script', 'ella_judge', 'ella_judge', 'ella_panel', 'ella_direct', 'ella_caption'])
  assert.ok(llm.calls[5].user.includes('Viewer psychologist') && llm.calls[5].user.includes('AI video prompt engineer'), 'the panel has its experts')
  assert.ok(llm.calls[1].user.includes('RESEARCH (already approved'), 'the writer works from the research')
  assert.ok(llm.calls[2].user.includes('SECOND draft'), 'draft B is told to use a different hook')
  assert.ok(llm.calls[1].user.includes('Template '), 'the writer gets the template beats')
  // The judge sees both orders, so a first-place bias cancels out.
  assert.ok(llm.calls[3].user.indexOf('FIRST SCRIPT') < llm.calls[3].user.indexOf('SECOND SCRIPT'))
  const out = studioOutcome(r.state)
  assert.equal(out.passed, true)
  const studio = (out.draft as unknown as { studio: { research: unknown; review: { scores: Record<string, number> }; log: unknown[]; template: string } }).studio
  assert.ok(studio.research && studio.review.scores.hook === 5 && studio.log.length === 7)
  assert.ok(studio.template)
  assert.equal(r.usage.length, 8)
})

test('studio: a failing script that a fix makes clean stops fixing at once', async () => {
  const bad = workedExample(); bad.scenes[1].voice = 'You are a tax resident.'
  const llm = new StudioLlm({ scripts: [JSON.stringify(bad), JSON.stringify(bad), JSON.stringify(workedExample())] })
  const r = await advanceStudio({ state: studioState(), article, settings, llm })
  assert.equal(r.state.rewrites, 1)
  assert.equal(studioOutcome(r.state).passed, true)
})

test('studio: a weak judge score gets exactly one fix with the judge notes', async () => {
  const llm = new StudioLlm({ reviews: [3] })
  const r = await advanceStudio({ state: studioState(), article, settings, llm })
  assert.deepEqual(llm.calls.map(c => c.stage), ['ella_research', 'ella_script', 'ella_script', 'ella_judge', 'ella_judge', 'ella_script', 'ella_panel', 'ella_direct', 'ella_caption'])
  assert.ok(llm.calls[5].user.includes('Join the sentences.') && llm.calls[5].user.includes('YOUR LAST DRAFT'))
  assert.equal(r.state.rewrites, 1)
  assert.equal(studioOutcome(r.state).passed, true)
})

test('studio: a script that fails a check keeps being fixed, up to 4 times, and never shows as ready', async () => {
  const bad = workedExample(); bad.scenes[1].voice = 'You are a tax resident.'
  const llm = new StudioLlm({ scripts: [JSON.stringify(bad)] })
  const r = await advanceStudio({ state: studioState(), article, settings, llm })
  assert.equal(r.state.rewrites, 4)
  const out = studioOutcome(r.state)
  assert.equal(out.passed, false)
  assert.ok(out.issues.some(i => i.code === 'compliance'))
})

test('studio: an accuracy problem found by the judge blocks the script', async () => {
  const llm = new StudioLlm()
  const orig = llm.complete.bind(llm)
  llm.complete = async (s, u, o) => {
    const r = await orig(s, u, o)
    if (o?.jsonTool?.name === 'ella_judge') { const j = JSON.parse(r.text); j.first.accuracyProblems = ['Scene 3 drops the hedge.']; j.second.accuracyProblems = ['Scene 3 drops the hedge.']; r.text = JSON.stringify(j) }
    return r
  }
  const r = await advanceStudio({ state: studioState(), article, settings, llm })
  assert.equal(r.state.rewrites, 1, 'it gets its one fix')
})

test('studio: it stops between stages when time runs out and carries on next run from the saved state', async () => {
  let t = 0
  const llm = new StudioLlm()
  const slow = { complete: async (...a: Parameters<StudioLlm['complete']>) => { t += 90_000; return llm.complete(...a) } }
  const r1 = await advanceStudio({ state: studioState(), article, settings, llm: slow, deadline: 90_000 + STAGE_MS - 1, now: () => t })
  assert.equal(r1.state.phase, 'draftA', 'only research fitted')
  const saved = JSON.parse(JSON.stringify(r1.state))
  const r2 = await advanceStudio({ state: saved, article, settings, llm: slow, now: () => t })
  assert.equal(r2.state.phase, 'done')
  assert.equal(llm.calls.filter(c => c.stage === 'ella_research').length, 1, 'research is not paid for twice')
})

test('studio: a script saved by the old studio on deploy day carries on', async () => {
  const st = { ...studioState(), phase: 'write' as never, research: studioResearch() }
  const r = await advanceStudio({ state: st, article, settings, llm: new StudioLlm() })
  assert.equal(r.state.phase, 'done')
  assert.equal(studioOutcome(r.state).passed, true)
})

test('code picks the template and series from the blog', async () => {
  const { chooseTemplate } = await import('../script/studio')
  assert.equal(chooseTemplate({ title: 'Is it true students never pay tax?', text: '' }).template, 'MYTH_FLIP')
  assert.equal(chooseTemplate({ title: 'ABN or TFN', text: 'If you work for yourself... If you work for a company...' }).template, 'WHICH_ONE_ARE_YOU')
  const t = chooseTemplate({ title: 'What is a TFN?', text: 'Get one before work.' })
  assert.deepEqual(t, { template: 'CHECKLIST_3', series: 'TAX WORD' })
})

test('studio: an unreadable stage is retried, three failures in a row stop it with the reason', async () => {
  const llm = new StudioLlm({ research: 'not json' })
  const r = await advanceStudio({ state: studioState(), article, settings, llm })
  assert.equal(r.state.phase, 'done')
  assert.equal(llm.calls.length, 3)
  const out = studioOutcome(r.state)
  assert.equal(out.draft, null)
  assert.match(out.issues[0].message, /Research could not be read/)
  assert.ok(studioResearch().facts.length > 0)
})

test('studio stages ask for medium thinking, so thinking never eats the whole reply', async () => {
  let sent: Record<string, unknown> | undefined
  const fake = (async (_u: string, init: RequestInit) => {
    sent = JSON.parse(String(init.body))
    return new Response(JSON.stringify({ model: 'm', stop_reason: 'end_turn', usage: {}, content: [{ type: 'text', text: '{}' }] }), { status: 200 })
  }) as unknown as typeof fetch
  const { RESEARCH_TOOL, STAGE_EFFORT } = await import('../script/studio')
  await new AnthropicLlm({ apiKey: 'k', model: 'm', fetchImpl: fake }).complete('s', 'u', { jsonTool: RESEARCH_TOOL, effort: STAGE_EFFORT })
  const oc = sent!.output_config as { effort: string; format: { type: string } }
  assert.equal(oc.effort, 'medium')
  assert.equal(oc.format.type, 'json_schema')
  assert.ok(!('thinking' in sent!), 'no thinking budget: Sonnet 5.5 refuses it')
})

test('stage 1: a script that still breaks a rule starts again from research, and after that the blog is given up as a system problem', async () => {
  const { STUDIO_RESTARTS } = await import('../stage1')
  assert.equal(STUDIO_RESTARTS, 2)
})
