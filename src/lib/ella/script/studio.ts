/**
 * The script studio (plan v2): a small team, in stages. Each stage is one
 * model call whose result is saved, so a run that ends picks up where it
 * stopped on the next run. Nothing is paid for video here.
 *
 *   1. research  facts table (hedges, sources), up to 5 scored ideas, the message;
 *                code has already picked the template and series from the blog
 *   2. draftA    a full script
 *   3. draftB    a second full script with a different hook
 *   4. judge     both drafts compared blind, twice in swapped order, on 6 criteria
 *   5. revise    at most one fix of the winner (blocking checks and judge notes)
 *
 * Code gates (validate.ts) block anything unsafe at every step. A script is
 * ready when the winner has no blocking issue and no score under 4.
 */
import type { SourceArticle } from '../library'
import { rank, readDraft, SCRIPT_TOOL, SCHEMA_TEXT } from './engine'
import type { Effort, JsonTool, Llm, LlmResult } from './llm'
import { BIBLE_VERSION, LIMITS } from './rules'
import type { Issue, ScriptDraft, ValidationContext } from './types'
import { validateScript } from './validate'

export const STUDIO_MAX_REWRITES = 1
/** About the longest one stage takes (the model thinks before it answers). */
export const STAGE_MS = 130_000
export const REVIEW_PASS = 4
export const STAGE_EFFORT: Effort = 'medium'

export type StudioPhase = 'research' | 'draftA' | 'draftB' | 'judge' | 'revise' | 'done'
/** Phases saved by the first studio, still in the database on deploy day. */
const LEGACY: Record<string, StudioPhase> = { write: 'draftA', review: 'judge', rewrite: 'revise' }

export interface ResearchFact { id: string; fact: string; blogLine: string; source: string; kind: 'fact' | 'tip'; hedge: string; softened: string }
export interface ResearchIdea { idea: string; surprise: number; stakes: number; clarity: number; safety: number; factIds: string[] }
export interface Research {
  facts: ResearchFact[]
  ideas: ResearchIdea[]
  chosen: { idea: string; why: string; coreMessage: string; keyTerm: string; audienceSlice: string; hookType: string; ctaType: string; payoff: string }
}

export const REVIEW_DIMENSIONS = ['hook', 'promise', 'clarity', 'sendable', 'cta', 'flow'] as const
export type ReviewDimension = (typeof REVIEW_DIMENSIONS)[number]
export interface Review {
  scores: Record<ReviewDimension, number>
  notes: Array<{ scene: number; dimension: string; problem: string; fix: string }>
  verdict: string
  /** Claims the judge found overstated, unhedged or not in the research: each one blocks. */
  accuracyProblems?: string[]
}

export interface StudioDraft { draft: ScriptDraft; issues: Issue[]; review?: Review }
export interface StudioLogEntry { phase: StudioPhase; at: string; seconds: number; ok: boolean; note: string }

/** Everything the studio needs to continue on a later run, saved after every stage. */
export interface StudioState {
  productionId: string
  slug: string
  pillar: string
  phase: StudioPhase
  ctx: ValidationContext
  recentKeyTerms: string[]
  testChange: string
  /** Picked by code from the blog (plan v2): MYTH_FLIP, CHECKLIST_3 or WHICH_ONE_ARE_YOU. */
  template?: string
  series?: string
  research?: Research
  drafts: StudioDraft[]
  rewrites: number
  failures: number
  log: StudioLogEntry[]
  startedAt: string
  updatedAt: string
}

export interface StudioSettings { bible: string; ellaLooks: string[]; learnings?: string }

export interface StudioStepResult { state: StudioState; usage: Array<{ model: string; inputTokens: number; outputTokens: number }> }

/** What the studio hands back once it is done. */
export interface StudioOutcome {
  draft: ScriptDraft | null
  issues: Issue[]
  passed: boolean
  attempts: number
}

// ── Schemas (JSON outputs: every object closed, every key required) ───────
const str = { type: 'string' }
const num = { type: 'number' }
const arr = (items: unknown) => ({ type: 'array', items })
const obj = (properties: Record<string, unknown>) => ({ type: 'object', additionalProperties: false, properties, required: Object.keys(properties) })

export const RESEARCH_TOOL: JsonTool = {
  name: 'ella_research',
  description: 'Facts, ideas and the chosen message for one Ella video.',
  schema: obj({
    facts: arr(obj({ id: str, fact: str, blogLine: str, source: str, kind: { type: 'string', enum: ['fact', 'tip'] }, hedge: str, softened: str })),
    ideas: arr(obj({ idea: str, surprise: num, stakes: num, clarity: num, safety: num, factIds: arr(str) })),
    chosen: obj({ idea: str, why: str, coreMessage: str, keyTerm: str, audienceSlice: str, hookType: str, ctaType: str, payoff: str }),
  }),
}

const scoreObj = obj(Object.fromEntries(REVIEW_DIMENSIONS.map(d => [d, num])))
export const JUDGE_TOOL: JsonTool = {
  name: 'ella_judge',
  description: 'A blind comparison of two Ella scripts.',
  schema: obj({
    first: obj({ scores: scoreObj, notes: arr(obj({ scene: num, dimension: str, problem: str, fix: str })), accuracyProblems: arr(str) }),
    second: obj({ scores: scoreObj, notes: arr(obj({ scene: num, dimension: str, problem: str, fix: str })), accuracyProblems: arr(str) }),
    better: { type: 'string', enum: ['first', 'second'] },
    verdict: str,
  }),
}
export interface JudgeReply {
  first: { scores: Record<ReviewDimension, number>; notes: Review['notes']; accuracyProblems: string[] }
  second: { scores: Record<ReviewDimension, number>; notes: Review['notes']; accuracyProblems: string[] }
  better: 'first' | 'second'
  verdict: string
}

/** The three templates and what each beat must do (retention notes, plan v2). */
export const TEMPLATE_BEATS: Record<string, string> = {
  MYTH_FLIP: 'Hook states the myth as a question (0-3 s); "But here is the catch," turn by 8 s; the real rule with its hedge; one concrete case from the blog; the payoff restates the true rule; CTA: send it to a friend who believes the myth.',
  CHECKLIST_3: 'Hook names who must check (0-3 s); three checks, one per beat, each on a graphic card numbered 1/3, 2/3, 3/3, the most surprising last; payoff: "check these before you lodge"; CTA: save it.',
  WHICH_ONE_ARE_YOU: 'Hook asks which situation the viewer is in (0-3 s); path A in one or two sentences; path B in one or two sentences; the payoff tells each path what to do; CTA: follow the series or send it to a friend on the other path.',
}
const SERIES_FOR: Record<string, string> = { MYTH_FLIP: 'MYTH OR FACT', CHECKLIST_3: 'YOUR JOB YOUR TAX', WHICH_ONE_ARE_YOU: 'YOUR JOB YOUR TAX' }

/** Code, not the model, picks the template from what the blog contains (plan v2). */
export function chooseTemplate(a: Pick<SourceArticle, 'title' | 'text'>): { template: string; series: string } {
  const t = `${a.title}\n${a.text}`
  const term = /^(what is|what's|what does)\b|\bmeaning\b|\bexplained\b/i.test(a.title)
  if (/\bmyth|\bis it true|\btrue or false|\bcommon mistake|\bwrong\b/i.test(t)) return { template: 'MYTH_FLIP', series: 'MYTH OR FACT' }
  const ifs = (t.match(/\bif you\b/gi) ?? []).length
  if (ifs >= 2) return { template: 'WHICH_ONE_ARE_YOU', series: term ? 'TAX WORD' : SERIES_FOR.WHICH_ONE_ARE_YOU }
  return { template: 'CHECKLIST_3', series: term ? 'TAX WORD' : SERIES_FOR.CHECKLIST_3 }
}

// ── Prompts ───────────────────────────────────────────────────────────────
function systemPrompt(s: StudioSettings, role: string): string {
  return [
    `You are ${role} for Ella, the AI presenter of Student Visa Tax. Follow the Ella script bible ${BIBLE_VERSION} below exactly.`,
    'If the blog and the bible disagree, the bible wins. Use only facts from the article. Never invent experiences, numbers, clients or stories.',
    'Think as long as you need, then reply with only the JSON object asked for.',
    '', '=== ELLA SCRIPT BIBLE ===', s.bible,
  ].join('\n')
}

function articleBlock(a: SourceArticle, pillar: string): string {
  return [
    `ARTICLE (slug ${a.slug}, ${a.kind}, category ${a.category}, pillar ${pillar}, updated ${a.updated})`,
    `Title: ${a.title}`,
    'Official sources:', ...a.sources.map(x => `- ${x.label}: ${x.href}`),
    '', a.text,
  ].join('\n')
}

function contextBlock(st: StudioState, s: StudioSettings): string {
  return [
    'CONTEXT',
    `- Approved Ella looks: ${s.ellaLooks.join(', ')}`,
    `- Previous episode hook type: ${st.ctx.previousHookType ?? 'none'} (do not repeat it)`,
    `- Recent CTA types, newest first: ${st.ctx.recentCtaTypes.join(', ') || 'none'}`,
    `- Key terms used in the last ${LIMITS.keyTermLookback} episodes (prefer another): ${st.recentKeyTerms.join(', ') || 'none'}`,
    `- Test change to apply: ${st.testChange}`,
    `- What has worked on this account so far (only to choose between options the bible allows): ${s.learnings || 'not enough data yet'}`,
    `- WhatsApp allowed: ${st.ctx.agentSignoffConfirmed ? 'yes' : 'no (do not mention WhatsApp anywhere)'}`,
    `- Price in captions: ${st.ctx.allowPrice ? 'allowed' : 'off'}`,
  ].join('\n')
}

export function researchPrompts(st: StudioState, a: SourceArticle, s: StudioSettings) {
  const user = [
    articleBlock(a, st.pillar), '', contextBlock(st, s), '',
    'YOUR JOB NOW: recipe steps 1 to 8 only (section 17). Do not write the script yet.',
    '- facts: every fact the video could use, as a table. "blogLine" is copied word for word from the article. "source" is the official .gov.au URL from the article sources for a fact, or "Habit tip from the blog" for a tip. "hedge" is the hedge word the fact needs (usually, may, can) or "none". "softened" is the fact rewritten for speech with its hedge, never overstated (for example "nobody takes tax out" becomes "tax is usually not taken out"). Ids f1, f2, ...',
    '- ideas: up to 5 candidate ideas, scored 1 to 5 on surprise, stakes, clarity and safety (section 6), each listing the fact ids it uses.',
    '- chosen: the winning idea and why it beats the others, the core message (15 words or fewer), the key term as spoken (for example "A-B-N"), the audience slice, the hook type and CTA type (sections 9 and 10, never the previous hook type), and the payoff line the hook will promise.',
  ].join('\n')
  return { system: systemPrompt(s, 'the research lead'), user }
}

function writeUser(st: StudioState, a: SourceArticle, s: StudioSettings, extra: string[]): string {
  return [
    articleBlock(a, st.pillar), '', contextBlock(st, s), '',
    'RESEARCH (already approved; build the script from it):',
    JSON.stringify(st.research),
    '',
    'YOUR JOB NOW: recipe steps 9 to 16. Write the whole voice-over first as one short spoken take (section 7a), then cut it into scenes and direct each scene.',
    '- Use only the facts in the research. Every claim in "claims" is one research fact: same blogLine word for word, same source, and its text keeps the hedge.',
    '- "ideas" repeats the research ideas with their scores. Use the chosen core message, key term, hook type and CTA type.',
    `- Template ${st.template ?? 'CHECKLIST_3'}: ${TEMPLATE_BEATS[st.template ?? 'CHECKLIST_3']}`,
    `- Series: ${st.series ?? 'YOUR JOB YOUR TAX'} (set "template" and "series" to exactly these).`,
    '- Ella is in frame in the hook, the payoff and the CTA, 50 to 65% of the time. Numbers, dates, lists and definitions go on graphic cards. Use AI clips (as many as look natural, 3 to 4 seconds each, nothing overdone) to SHOW the action Ella is talking about in that moment; keep them simple and real, nothing exaggerated.',
    '',
    SCHEMA_TEXT,
    ...extra,
  ].join('\n')
}

export function writePrompts(st: StudioState, a: SourceArticle, s: StudioSettings, variant: 'A' | 'B' = 'A') {
  const other = st.drafts[0]?.draft
  const extra = variant === 'B' && other
    ? ['', `This is the SECOND draft. Use a different hook from the first draft ("${other.scenes[0]?.voice ?? ''}", hook type ${other.hookType}): a different hook type or a different angle on the same core message. Everything else follows the same rules.`]
    : []
  return { system: systemPrompt(s, 'the script writer'), user: writeUser(st, a, s, extra) }
}

export function rewritePrompts(st: StudioState, a: SourceArticle, s: StudioSettings, from: StudioDraft) {
  const blocking = from.issues.filter(i => i.severity !== 'warn')
  const notes = from.review?.notes ?? []
  return {
    system: systemPrompt(s, 'the script writer, doing a rewrite'),
    user: writeUser(st, a, s, [
      '',
      'YOUR LAST DRAFT:',
      JSON.stringify(from.draft),
      '',
      'FIX EVERY POINT BELOW and return the whole JSON again. Keep what already works.',
      ...(blocking.length ? ['Automatic checks that failed (each one blocks the script):', ...blocking.map(i => `- [${i.code}]${i.scene ? ` scene ${i.scene}` : ''}: ${i.message}`)] : []),
      ...(notes.length ? ['Judge notes:', ...notes.map(n => `- scene ${n.scene || 'all'} (${n.dimension}): ${n.problem} Fix: ${n.fix}`)] : []),
      ...(from.review?.accuracyProblems?.length ? ['Accuracy problems (each blocks the script):', ...from.review.accuracyProblems.map(x => `- ${x}`)] : []),
    ]),
  }
}

export function judgePrompts(st: StudioState, a: SourceArticle, s: StudioSettings, first: StudioDraft, second: StudioDraft) {
  const checks = (d: StudioDraft) => {
    const b = d.issues.filter(i => i.severity !== 'warn')
    return b.length ? b.map(i => `[${i.code}]${i.scene ? ` scene ${i.scene}` : ''} ${i.message}`).join(' | ') : 'all passed'
  }
  const user = [
    articleBlock(a, st.pillar), '',
    'RESEARCH:', JSON.stringify(st.research), '',
    'FIRST SCRIPT:', JSON.stringify(first.draft), `Automatic checks: ${checks(first)}`, '',
    'SECOND SCRIPT:', JSON.stringify(second.draft), `Automatic checks: ${checks(second)}`, '',
    'YOUR JOB: compare the two scripts as a strict short-video editor. Read each voice-over aloud in your head as one take. A 5 means a top creator would post it as it is.',
    'Score each script 1 to 5 on:',
    '- hook: names the viewer or situation, opens one question, would stop a student scrolling in the first second',
    '- promise: the payoff answers exactly what the hook asked',
    '- clarity: one idea an IELTS 5.5 listener gets on first hearing, one term explained once',
    '- sendable: a student would send it to a friend or save it',
    '- cta: one soft ask that follows from the message',
    '- flow: sounds like a calm friend talking, not a list',
    'For each score under 5, add a note quoting the line, with the scene number (0 for the whole script) and the exact fix.',
    'accuracyProblems: every claim that is overstated, loses its hedge or is not in the research. Empty if none.',
    'better: which script you would post. verdict: one sentence why.',
  ].join('\n')
  return { system: systemPrompt(s, 'the judge'), user }
}

// ── The studio ────────────────────────────────────────────────────────────
export function newStudio(row: { productionId: string; slug: string; pillar: string; ctx: ValidationContext; recentKeyTerms: string[]; testChange: string; template?: string; series?: string }, now: Date): StudioState {
  const at = now.toISOString()
  return { ...row, phase: 'research', drafts: [], rewrites: 0, failures: 0, log: [], startedAt: at, updatedAt: at }
}

const parse = <T>(r: LlmResult, check: (v: unknown) => v is T): { value: T | null; why: string } => {
  const peek = r.text.replace(/\s+/g, ' ').trim()
  if (r.stopReason === 'max_tokens') return { value: null, why: `the reply was cut off at ${r.outputTokens} tokens${peek ? '' : ' (all of it spent thinking)'}` }
  try {
    const v = JSON.parse(r.text) as unknown
    return check(v) ? { value: v, why: '' } : { value: null, why: `the JSON has the wrong shape: "${peek.slice(0, 120)}"` }
  } catch (e) { return { value: null, why: `${(e as Error).message}${peek ? `: "${peek.slice(0, 120)}"` : ' (empty reply)'}` } }
}
const isResearch = (v: unknown): v is Research => !!v && typeof v === 'object' && Array.isArray((v as Research).facts) && Array.isArray((v as Research).ideas) && !!(v as Research).chosen
const isJudge = (v: unknown): v is JudgeReply => !!v && typeof v === 'object' && !!(v as JudgeReply).first?.scores && !!(v as JudgeReply).second?.scores

export const minScore = (r?: Review) => (r ? Math.min(...REVIEW_DIMENSIONS.map(d => Number(r.scores[d]) || 0)) : 0)
const reviewOk = (r?: Review) => minScore(r) >= REVIEW_PASS && !(r?.accuracyProblems?.length)
const blockingOf = (d: StudioDraft) => d.issues.filter(i => i.severity !== 'warn')

/** Best draft first: fewest serious and blocking issues, then the best weakest review score. */
export function bestDraft(drafts: StudioDraft[]): StudioDraft | null {
  if (!drafts.length) return null
  return [...drafts].sort((a, b) => rank(a.issues) - rank(b.issues) || minScore(b.review) - minScore(a.review))[0]
}

/**
 * Runs studio stages until the script is done or the next stage would not
 * finish before the deadline. Always runs at least one stage.
 */
export async function advanceStudio(
  input: { state: StudioState; article: SourceArticle; settings: StudioSettings; llm: Llm; deadline?: number; now?: () => number },
): Promise<StudioStepResult> {
  const now = input.now ?? Date.now
  const st: StudioState = structuredClone(input.state)
  if (LEGACY[st.phase]) st.phase = LEGACY[st.phase]
  if (!st.template) Object.assign(st, chooseTemplate(input.article))
  const usage: StudioStepResult['usage'] = []
  const { article: a, settings: s, llm } = input
  let first = true

  while (st.phase !== 'done') {
    if (!first && input.deadline !== undefined && input.deadline - now() < STAGE_MS) break
    first = false
    const t = now()
    const phase = st.phase
    const done = (ok: boolean, note: string) => {
      st.log.push({ phase, at: new Date(t).toISOString(), seconds: Math.round((now() - t) / 1000), ok, note })
      st.updatedAt = new Date(now()).toISOString()
      if (ok) st.failures = 0
      else if (++st.failures >= 3) st.phase = 'done'
    }
    const call = async (p: { system: string; user: string }, tool: JsonTool) => {
      // Medium effort: each stage is one focused job, so deep thinking is not needed and would eat the reply budget.
      const r = await llm.complete(p.system, p.user, { jsonTool: tool, effort: STAGE_EFFORT })
      usage.push({ model: r.model, inputTokens: r.inputTokens, outputTokens: r.outputTokens })
      return r
    }
    const writeDraft = async (prompts: { system: string; user: string }) => {
      const r = await call(prompts, SCRIPT_TOOL)
      const { draft, error } = readDraft(r.text)
      if (!draft) return { error: `The script could not be read: ${r.stopReason === 'max_tokens' ? `cut off at ${r.outputTokens} tokens` : error}` }
      draft.template ??= st.template as ScriptDraft['template']
      draft.series ??= st.series as ScriptDraft['series']
      return { d: { draft, issues: validateScript(draft, st.ctx) } as StudioDraft }
    }
    const stage = async () => {
      if (phase === 'research') {
        const { value, why } = parse(await call(researchPrompts(st, a, s), RESEARCH_TOOL), isResearch)
        if (value) { st.research = value; st.phase = 'draftA'; done(true, `${value.facts.length} facts, ${value.ideas.length} ideas; ${st.template}, ${st.series}; chosen: ${value.chosen.coreMessage}`) }
        else done(false, `Research could not be read: ${why}`)
        return
      }
      if (phase === 'draftA' || phase === 'draftB') {
        const r = await writeDraft(writePrompts(st, a, s, phase === 'draftA' ? 'A' : 'B'))
        if (!r.d) { done(false, r.error!); return }
        st.drafts.push(r.d)
        st.phase = phase === 'draftA' ? 'draftB' : 'judge'
        const b = blockingOf(r.d)
        done(true, `Draft ${phase === 'draftA' ? 'A' : 'B'}: "${r.d.draft.scenes[0]?.voice ?? ''}"; automatic checks ${b.length ? `found ${b.length} problem${b.length > 1 ? 's' : ''}` : 'all passed'}`)
        return
      }
      if (phase === 'judge') {
        const [A, B] = st.drafts
        if (!B) { A.review = undefined; st.phase = 'revise'; done(true, 'Only one draft; skipping the comparison'); return }
        // Blind and twice, in swapped order, so the judge's preference for whichever comes first cancels out.
        const r1 = parse(await call(judgePrompts(st, a, s, A, B), JUDGE_TOOL), isJudge)
        const r2 = parse(await call(judgePrompts(st, a, s, B, A), JUDGE_TOOL), isJudge)
        if (!r1.value || !r2.value) { done(false, `The judge could not be read: ${r1.why || r2.why}`); return }
        const merge = (x: JudgeReply['first'], y: JudgeReply['first']): Review => ({
          scores: Object.fromEntries(REVIEW_DIMENSIONS.map(k => [k, Math.round(((Number(x.scores[k]) || 0) + (Number(y.scores[k]) || 0)) * 5) / 10])) as Review['scores'],
          notes: [...x.notes, ...y.notes],
          accuracyProblems: [...new Set([...(x.accuracyProblems ?? []), ...(y.accuracyProblems ?? [])])],
          verdict: '',
        })
        A.review = merge(r1.value.first, r2.value.second)
        B.review = merge(r1.value.second, r2.value.first)
        const votesA = (r1.value.better === 'first' ? 1 : 0) + (r2.value.better === 'second' ? 1 : 0)
        const total = (r?: Review) => REVIEW_DIMENSIONS.reduce((n, k) => n + (r?.scores[k] ?? 0), 0)
        const pickA = rank(A.issues) !== rank(B.issues) ? rank(A.issues) < rank(B.issues) : votesA !== 1 ? votesA === 2 : total(A.review) >= total(B.review)
        const win = pickA ? A : B
        win.review!.verdict = (pickA ? r1.value.verdict : r2.value.verdict) || ''
        st.drafts = pickA ? [A, B] : [B, A]
        const pass = blockingOf(win).length === 0 && reviewOk(win.review)
        st.phase = pass ? 'done' : 'revise'
        done(true, `Draft ${pickA ? 'A' : 'B'} wins (${votesA === 1 ? 'split vote' : `${pickA ? votesA : 2 - votesA} of 2 votes`}); lowest score ${minScore(win.review)} of 5. ${pass ? 'Ready.' : 'One fix.'}`)
        return
      }
      if (phase === 'revise') {
        const win = st.drafts[0]
        const r = await writeDraft(rewritePrompts(st, a, s, win))
        st.rewrites++
        st.phase = 'done'
        if (!r.d) { done(false, `${r.error}; keeping the judged draft`); st.phase = 'done'; return }
        // The fix is kept only if it is not worse on the checks; it inherits the judged scores minus what it fixed.
        if (rank(r.d.issues) <= rank(win.issues)) {
          r.d.review = win.review ? { ...win.review, notes: [], accuracyProblems: [], scores: Object.fromEntries(REVIEW_DIMENSIONS.map(k => [k, Math.max(REVIEW_PASS, win.review!.scores[k])])) as Review['scores'] } : undefined
          st.drafts.unshift(r.d)
          done(true, `Fixed draft kept: automatic checks ${blockingOf(r.d).length ? `still find ${blockingOf(r.d).length}` : 'all pass'}`)
        } else done(true, 'The fix was worse on the checks; keeping the judged draft')
        return
      }
    }
    try { await stage() } catch (e) {
      // A failed call is one failed stage; the work saved before it is kept.
      done(false, `Model call failed: ${String((e as Error)?.message ?? e).slice(0, 300)}`)
    }
  }
  return { state: st, usage }
}

/** The final script and its status once the studio is done. */
export function studioOutcome(st: StudioState): StudioOutcome {
  // After the judge the winner (or its fix) is first; before it, the best by the checks.
  const best = st.drafts[0]?.review ? st.drafts[0] : bestDraft(st.drafts)
  const attempts = st.drafts.length
  if (!best) {
    const last = [...st.log].reverse().find(l => !l.ok)
    return { draft: null, issues: [{ code: 'studio.failed', message: last ? last.note : 'No draft produced' }], passed: false, attempts }
  }
  const issues = [...best.issues]
  if (best.review && !reviewOk(best.review))
    for (const n of best.review.notes) issues.push({ code: `review.${n.dimension}`, message: `${n.problem} Fix: ${n.fix}`, scene: n.scene || undefined })
  const passed = blockingOf(best).length === 0 && reviewOk(best.review)
  // The research, review and work log travel with the script so Atlas can show them.
  if (best.review?.accuracyProblems?.length) for (const x of best.review.accuracyProblems) issues.push({ code: 'review.accuracy', message: x })
  const draft = { ...best.draft, studio: { research: st.research, review: best.review, log: st.log, drafts: st.drafts.length, template: st.template, series: st.series } } as ScriptDraft
  return { draft, issues, passed, attempts }
}

export const STUDIO_STAGES_LABEL: Record<StudioPhase, string> = {
  research: 'Research: facts and ideas', draftA: 'Writing draft A', draftB: 'Writing draft B', judge: 'The judge compares both', revise: 'One fix', done: 'Done',
}
