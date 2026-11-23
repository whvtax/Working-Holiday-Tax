/**
 * The script studio (plan v2): a small team, in stages. Each stage is one
 * model call whose result is saved, so a run that ends picks up where it
 * stopped on the next run. Nothing is paid for video here.
 *
 *   1. research  facts table (hedges, sources), 3 scored ideas, the message;
 *                code has already picked the template and series from the blog
 *   2. draftA    a full script
 *   3. draftB    a second script, completely different (hook, approach, order)
 *   4. judge     one blind comparison on 6 criteria: picks the script to post and
 *                lists what the winner should take from the other one
 *   5. revise    a targeted fix of the winner: only what the judge and checks named
 *   6. panel, direct, caption (keyword research and SEO), advocate (risk notes only)
 *
 * Code gates (validate.ts) block anything unsafe at every step. A script is
 * ready when the winner has no blocking issue and no score under 4.
 */
import type { SourceArticle } from '../library'
import { CAPTION_EMOJIS, CAPTION_WORDS, captionEmojis, captionWords, finishCaptions } from './captions'
import { rank, readDraft, SCRIPT_TOOL, SCHEMA_TEXT } from './engine'
import { MODEL_CALL_TIMEOUT_MS, type Effort, type JsonTool, type Llm, type LlmResult } from './llm'
import { BIBLE_VERSION, LIMITS } from './rules'
import { shotOf, type Issue, type Scene, type ScriptDraft, type ValidationContext } from './types'
import { validateScript } from './validate'
import { countWords } from './text'

/**
 * Jo: times follow the real speaking rate. A script whose scene times run longer than its words need at that rate
 * gets its times shortened to the real speed. The words are never changed, and production times the real voice
 * from its audio anyway, so this only removes a planning mismatch the writer cannot always get right.
 */
export function fitTimes(d: ScriptDraft, wpm: number): ScriptDraft {
  const words = d.scenes.reduce((n, x) => n + countWords(x.voice ?? ''), 0)
  const planned = (words / wpm) * 60
  const total = d.scenes.at(-1)?.end ?? 0
  if (!words || !(planned > 0) || total <= planned + 3) return d
  const k = planned / total
  let t = 0
  const scenes = d.scenes.map(x => {
    const start = Math.round(t * 10) / 10
    t = start + Math.round((x.end - x.start) * k * 10) / 10
    return { ...x, start, end: Math.round(t * 10) / 10 }
  })
  return { ...d, scenes }
}

/** Fixes allowed: the judge's notes get one; a script that still fails an automatic check keeps being fixed, up to this many. */
export const STUDIO_MAX_REWRITES = 4
/** Candidate ideas the research lead must score (Jo, Nov 22: three, not five). */
export const RESEARCH_IDEAS = 3
/** About the longest one stage takes (the model thinks before it answers). */
export const STAGE_MS = 130_000
export const REVIEW_PASS = 4
export const STAGE_EFFORT: Effort = 'medium'

export type StudioPhase = 'research' | 'draftA' | 'draftB' | 'judge' | 'revise' | 'panel' | 'direct' | 'caption' | 'advocate' | 'done'
/** Phases saved by earlier studios, still in the database after a deploy. The five reviewers were replaced by the advocate. */
const LEGACY: Record<string, StudioPhase> = { write: 'draftA', review: 'judge', rewrite: 'revise', textreview: 'advocate' }

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
  /** The visual panel's notes and the director's log (what is sent to HeyGen and why). */
  panel?: PanelNotes
  directed?: boolean
  /** The keyword research and caption (candidates checked, kept keywords and why). */
  captionNotes?: { candidates: string[]; keywords: string[]; why: string }
  /** The judge's pick: what the winner should take from the other draft (A or B, the one not picked). */
  judgeTake?: { from: 'A' | 'B'; items: string[] }
  /** The script the judge did not pick, kept only so the fixer can take ideas from it. */
  otherDraft?: ScriptDraft
  /** The devil's advocate's risk notes for the learning tab. Notes only; nothing is changed by them. */
  advocate?: { risks: AdvocateRisk[]; summary: string }
  /** Times the whole studio started again from research because a script kept failing a check. */
  restarts?: number
  /** The step running right now, saved before its model call and cleared after it. */
  current?: { phase: StudioPhase; at: string }
  log: StudioLogEntry[]
  startedAt: string
  updatedAt: string
}

export interface StudioSettings { bible: string; ellaLooks: string[]; learnings?: string }

export interface StudioStepResult { state: StudioState; usage: Array<{ model: string; inputTokens: number; outputTokens: number }>; stopped?: boolean }

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
  description: 'One comparison of two Ella scripts: the one to post, its fixes, and what it should take from the other.',
  schema: obj({
    first: obj({ scores: scoreObj, notes: arr(obj({ scene: num, dimension: str, problem: str, fix: str })), accuracyProblems: arr(str) }),
    second: obj({ scores: scoreObj, notes: arr(obj({ scene: num, dimension: str, problem: str, fix: str })), accuracyProblems: arr(str) }),
    better: { type: 'string', enum: ['first', 'second'] },
    verdict: str,
    takeFromOther: arr(str),
  }),
}
export interface JudgeReply {
  first: { scores: Record<ReviewDimension, number>; notes: Review['notes']; accuracyProblems: string[] }
  second: { scores: Record<ReviewDimension, number>; notes: Review['notes']; accuracyProblems: string[] }
  better: 'first' | 'second'
  verdict: string
  /** Up to three strong lines or ideas from the script that was NOT picked, for the fixer to add to the winner. */
  takeFromOther: string[]
}

// ── The devil's advocate (Jo, Nov 22): one agent, risk notes only, for the learning tab ──
export interface AdvocateRisk { where: string; risk: string; why: string }
export const ADVOCATE_TOOL: JsonTool = {
  name: 'ella_advocate',
  description: 'The devil\'s advocate: the strongest reasons this video could fail. Notes only.',
  schema: obj({ risks: arr(obj({ where: str, risk: str, why: str })), summary: str }),
}
const isAdvocate = (v: unknown): v is { risks: AdvocateRisk[]; summary: string } => !!v && typeof v === 'object' && Array.isArray((v as { risks: unknown }).risks)
export function advocatePrompts(s: StudioSettings, d: ScriptDraft) {
  const user = [
    'THE SCRIPT WORDS (final voice lines, scene by scene):', JSON.stringify(d.scenes.map(x => ({ scene: x.scene, voice: x.voice, onScreen: x.onScreen }))), '',
    'THE CAPTION:', d.captions.instagram, '',
    'You are the devil\'s advocate. Your job is to find the strongest reasons this short video could fail with an international student, and to say why.',
    'Look for: a hook a viewer scrolls past, a line that is unclear to an IELTS 5.5 listener, a claim a regulator or a tax agent could challenge, a caption keyword that promises more than the video says, a line that could make someone anxious, a comment that would be hard to answer.',
    'Write notes only. Do not rewrite the script or the caption. Give at most 5 risks, the most serious first. where: "scene 3" or "caption". risk: one short line quoting the words. why: one short line.',
    'summary: one sentence on the main risk, or "No serious risk found." if none.',
  ].join('\n')
  return { system: systemPrompt(s, 'the devil\'s advocate'), user }
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
  // The bible comes first and is the same text for every stage, so the model's prompt cache can reuse it.
  // Only the short role lines after it differ from stage to stage.
  return [
    '=== ELLA SCRIPT BIBLE ===', s.bible, '=== END OF BIBLE ===', '',
    `You are ${role} for Ella, the AI presenter of Student Visa Tax. Follow the Ella script bible ${BIBLE_VERSION} above exactly.`,
    'If the blog and the bible disagree, the bible wins. Use only facts from the article. Never invent experiences, numbers, clients or stories.',
    'Think as long as you need, then reply with only the JSON object asked for.',
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
    `- ideas: exactly ${RESEARCH_IDEAS} candidate ideas, scored 1 to 5 on surprise, stakes, clarity and safety (section 6), each listing the fact ids it uses.`,
    '- chosen: the winning idea and why it beats the others, the core message (15 words or fewer, about ONE thing only, never two things joined by "and" or "or"), the key term as spoken (for example "A-B-N"), the audience slice, the hook type and CTA type (sections 9 and 10, never the previous hook type), and the payoff line the hook will promise.',
  ].join('\n')
  return { system: systemPrompt(s, 'the research lead'), user }
}

/**
 * The checker's rules (Jo, Nov 22): the writer and the fixer work to these from the first line,
 * so a draft is not written against them afterwards. There is no separate final check after them.
 */
const CHECKER_RULES = [
  '- hook: names the viewer or situation, opens one question, would stop a student scrolling in the first second',
  '- promise: the payoff answers exactly what the hook asked',
  '- clarity: one idea an IELTS 5.5 listener gets on first hearing, one term explained once',
  '- sendable: a student would send it to a friend or save it',
  '- cta: one soft ask that follows from the message',
  '- flow: sounds like a calm friend talking, not a list; the tone of each line fits its job',
  '- accuracy: every claim keeps its hedge (may, can, usually, some) and is in the research; nothing overstated',
]

function writeUser(st: StudioState, a: SourceArticle, s: StudioSettings, extra: string[]): string {
  return [
    articleBlock(a, st.pillar), '', contextBlock(st, s), '',
    'RESEARCH (already approved; build the script from it):',
    JSON.stringify(st.research),
    '',
    'THE CHECK YOUR SCRIPT MUST PASS (Jo, Nov 22: applied while you write, not after):',
    ...CHECKER_RULES,
    '',
    'YOUR JOB NOW: recipe steps 9 to 16. Write the whole voice-over first as one short spoken take (section 7a), then cut it into scenes and direct each scene.',
    '- Use only the facts in the research. Every claim in "claims" is one research fact: same blogLine word for word, same source, and its text keeps the hedge.',
    '- "ideas" repeats the research ideas with their scores. Use the chosen core message, key term, hook type and CTA type.',
    `- Template ${st.template ?? 'CHECKLIST_3'}: ${TEMPLATE_BEATS[st.template ?? 'CHECKLIST_3']}`,
    `- Series: ${st.series ?? 'YOUR JOB YOUR TAX'} (set "template" and "series" to exactly these).`,
    ...(st.ctx.wpm ? [
      `- LENGTH (Jo): Ella's finished voice speaks about ${st.ctx.wpm} words per minute. Set every scene's start and end at that speed. The video runs ${st.ctx.minSeconds ?? 30} to 38 seconds, so the voice-over has about ${Math.ceil(((st.ctx.minSeconds ?? 30) + 1) * st.ctx.wpm / 60)} to ${Math.floor(38 * st.ctx.wpm / 60)} words. Never shorter.`,
    ] : []),
    '- ONE MESSAGE (Jo): the whole video is about ONE thing. Never two topics joined by "and" or "or" (not "cash pay or tips": choose one). Every scene serves that one message.',
    '- HOOK (Jo): any kind (a doubt, a myth, a choice, a surprising fact) but always asked as a question that ends with "?", so Ella says it in a question tone. It speaks straight to the viewer with "you" or "your" and names their exact situation, in 12 words or fewer, worded differently every time. Not "Got cash tips?" but "Working in Australia as an international student and paid in cash?"',
    '- TONE OF EACH LINE (Jo): punctuation is how the voice knows the tone. The hook is a question ("?"). Facts are calm statements ending in ".". The answer (payoff) is a short, sure statement ending in ".", said like the answer to the hook. The last line is a clear, warm closing sentence ending in ".", so the viewer hears that the video is over. Never end on a comma or a half thought. But keep it human: a warm friend talking, with contractions (you\'re, it\'s, don\'t), varied sentence length and natural joins (so, and, but); never a row of short choppy sentences that sounds like a robot reading a list.',
    '- Ella is in frame in the hook, the payoff and the CTA, about half the time. Numbers, dates, lists and definitions go on graphic cards. Use AI clips, at least 3 and usually 3 or 4 (3 to 4 seconds each, nothing overdone), to SHOW the action Ella is talking about in that moment; keep them simple and real.',
    '',
    SCHEMA_TEXT,
    ...extra,
  ].join('\n')
}

export function writePrompts(st: StudioState, a: SourceArticle, s: StudioSettings, variant: 'A' | 'B' = 'A') {
  const other = st.drafts[0]?.draft
  const extra = variant === 'B' && other
    ? ['', [
      `This is the SECOND draft, and it must be completely different from the first one ("${other.scenes[0]?.voice ?? ''}", hook type ${other.hookType}).`,
      `- Its hookType must not be ${other.hookType}, and its first line must not repeat the first draft's hook.`,
      '- Take a different approach to the same core message: if the first draft starts from the rule, start from the student\'s situation, or the other way round.',
      '- Change the order of the points and the examples inside the template, and write a different closing line.',
      '- Shared with the first draft: only the facts, the core message, the key term, the template and the series. Do not reuse a sentence from it.',
    ].join('\n')]
    : []
  return { system: systemPrompt(s, 'the script writer'), user: writeUser(st, a, s, extra) }
}

/**
 * A targeted fix (Jo, Nov 22): the editor changes only what the list names.
 * Everything else stays word for word, so a fix never rewrites a script that already works.
 */
export function rewritePrompts(st: StudioState, _a: SourceArticle, s: StudioSettings, from: StudioDraft) {
  const blocking = from.issues.filter(i => i.severity !== 'warn')
  const notes = from.review?.notes ?? []
  // The ideas to take from the other draft are offered once, on the first fix.
  const take = st.rewrites === 0 && st.judgeTake?.items.length ? st.judgeTake : null
  const user = [
    'RESEARCH (the approved facts, for any accuracy fix):', JSON.stringify(st.research?.facts ?? []), '',
    `THE SCRIPT TO FIX (template ${st.template}, series ${st.series}):`, JSON.stringify(from.draft), '',
    ...(take ? [
      `THE JUDGE CHOSE THIS SCRIPT. Add these ideas from the other draft (draft ${take.from === 'A' ? 'B' : 'A'}) where they fit, in the winner's own words:`,
      ...take.items.map(x => `- ${x}`), '',
      'THE OTHER DRAFT (read it for the ideas above only; do not copy it whole):', JSON.stringify(st.otherDraft ?? null), '',
    ] : []),
    'FIX ONLY THE POINTS BELOW. Change nothing else:',
    ...(blocking.length ? ['Automatic checks that failed (each one blocks the script):', ...blocking.map(i => `- [${i.code}]${i.scene ? ` scene ${i.scene}` : ''}: ${i.message}`)] : []),
    ...(notes.length ? ['Judge notes:', ...notes.map(n => `- scene ${n.scene || 'all'} (${n.dimension}): ${n.problem} Fix: ${n.fix}`)] : []),
    ...(from.review?.accuracyProblems?.length ? ['Accuracy problems (each blocks the script):', ...from.review.accuracyProblems.map(x => `- ${x}`)] : []),
    '',
    'THE CHECK THE FIXED SCRIPT MUST PASS:', ...CHECKER_RULES, '',
    'RULES FOR THIS FIX: every scene, line, caption and field that is not named above stays word for word the same. Keep the template, the series, the core message and the key term. Respect every length limit and every rule in the bible.',
    'Return the whole JSON in the schema below, with only the named points changed.',
    '',
    SCHEMA_TEXT,
  ].join('\n')
  return { system: systemPrompt(s, 'the script editor, making a targeted fix'), user }
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
    `- any replacement text you suggest must obey the limits (on-screen text at most ${LIMITS.onScreenWords} words, hook at most ${LIMITS.hookWords} words): count the words of each suggestion before you write it`,
    '- flow: sounds like a calm friend talking, not a list; the tone of each line fits its job (the hook sounds like a question, facts calm, the answer sure, the last line clearly closes the video)',
    'For each score under 5, add a note quoting the line, with the scene number (0 for the whole script) and the exact fix.',
    'accuracyProblems: every claim that is overstated, loses its hedge or is not in the research. Empty if none.',
    'better: which script you would post. verdict: one sentence why.',
    'takeFromOther: the 1 to 3 strongest lines or ideas in the script you did NOT pick that the winner should borrow, each quoted with its scene number, e.g. "scene 4: \'Check your course dates first.\' (a clearer payoff)". Empty if the winner needs nothing. The two scripts are different on purpose: judge which approach serves the viewer better, not which is more familiar.',
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
// ── The visual panel and director (Jo, Nov 21) ───────────────────────────
/** Five experts look at every shot from their angle; then the director writes what HeyGen gets. */
export const PANEL_EXPERTS = [
  { id: 'cinematographer', title: 'Cinematographer and visual director', brief: 'Framing, light, lens, camera move, one clear action per shot, continuity of room, props and colours across shots, what reads in a 9:16 phone frame in under 3 seconds.' },
  { id: 'growth', title: 'Instagram Reels and TikTok growth marketer', brief: 'Scroll-stopping first frame, pattern breaks every 2 to 4 seconds, native creator look (not stock, not ad), what makes a student send it to a friend.' },
  { id: 'psychology', title: 'Viewer psychologist', brief: 'Attention and emotion of an anxious international student: relief, curiosity, trust; which image calms or worries; what makes the idea stick; never fear or shame.' },
  { id: 'prompting', title: 'AI video prompt engineer', brief: 'What current image-to-video models do well and badly: simple physical actions, hands at medium distance, no text or numbers in the footage, no faces in close-up, exact timing of the action on the spoken word, and wording that avoids warping.' },
  { id: 'compliance', title: 'Tax compliance and brand safety reviewer', brief: 'Nothing in the picture may look official or like an agent: no ATO or government logos, documents, forms, screens with numbers, cash, money piles, or tax agent badges. Nothing that promises a refund. Keep every shot neutral, calm and true to the script.' },
] as const
export interface PanelNotes {
  notes: Array<{ expert: string; scene: number; note: string }>
  summary: string
  director?: string
}
export const PANEL_TOOL: JsonTool = {
  name: 'ella_panel',
  description: 'Expert notes on the visuals of one short video.',
  schema: obj({ notes: arr(obj({ expert: str, scene: num, note: str })), summary: str }),
}
export const DIRECT_TOOL: JsonTool = {
  name: 'ella_direct',
  description: 'The final shot instructions for the video models.',
  schema: obj({
    scenes: arr(obj({ scene: num, visual: str, action: str, syncWord: str, shotPrompt: str, continuity: str })),
    summary: str,
  }),
}
const isPanel = (v: unknown): v is PanelNotes => !!v && typeof v === 'object' && Array.isArray((v as PanelNotes).notes)
const isDirect = (v: unknown): v is { scenes: Array<Pick<Scene, 'scene' | 'visual' | 'action' | 'syncWord' | 'shotPrompt' | 'continuity'>>; summary: string } =>
  !!v && typeof v === 'object' && Array.isArray((v as { scenes: unknown[] }).scenes)

function shotsBlock(d: ScriptDraft) {
  return d.scenes.map(sc => ({ scene: sc.scene, seconds: `${sc.start}-${sc.end}`, shot: shotOf(sc), voice: sc.voice, emphasis: sc.emphasis, onScreen: sc.onScreen, visual: sc.visual, action: sc.action, syncWord: sc.syncWord, shotPrompt: sc.shotPrompt, continuity: sc.continuity }))
}
export function panelPrompts(s: StudioSettings, d: ScriptDraft, onlyExpert?: string) {
  const experts = onlyExpert ? PANEL_EXPERTS.filter(e => e.id === onlyExpert) : PANEL_EXPERTS
  const user = [
    'THE APPROVED SCRIPT (words are final; you work only on the pictures):', JSON.stringify(shotsBlock(d)), '',
    `You are ${onlyExpert ? 'one expert' : `a panel of ${PANEL_EXPERTS.length} experts`}. Each expert looks at EVERY scene from their own angle:`,
    ...experts.map(e => `- ${e.title}: ${e.brief}`),
    '',
    'For "clip" scenes: say exactly what to show and how, so it matches the spoken words at that second.',
    'For "ella" scenes: Ella is one continuous take at her desk; note only her small gesture and expression on the sync word (at most 3 gestures in the whole video).',
    'For "graphic" scenes: nothing to film; skip them.',
    'notes: one item per useful point, with the expert name and scene number. summary: the three most important changes.',
  ].join('\n')
  return { system: systemPrompt(s, 'the visual panel'), user }
}
export function directPrompts(s: StudioSettings, d: ScriptDraft, panel: PanelNotes) {
  const user = [
    'THE APPROVED SCRIPT:', JSON.stringify(shotsBlock(d)), '',
    'THE PANEL NOTES:', JSON.stringify(panel), '',
    'YOU ARE THE DIRECTOR. Write the final instructions for every "clip" and "ella" scene (leave "graphic" scenes out).',
    'shotPrompt for a clip, in this exact shape, rich and specific (80 to 160 words):',
    'STYLE: photoreal phone footage, natural light, shallow depth of field, vertical 9:16, real creator look.',
    'SUBJECT: who or what, exact objects, materials and colours (blank paper, plain phone screens; no text, numbers, logos or money in close-up).',
    'ACTION: one simple physical action, landing at about N seconds on the word "<syncWord>".',
    'SETTING: the same small student room or kitchen as the other clips, time of day, props.',
    'CAMERA: shot size, lens feel, locked or slow push-in.',
    'LIGHT: direction and quality.',
    'MOOD: the feeling the viewer should get (calm, relief, curiosity).',
    'For an "ella" scene: shotPrompt "", and action is her one small gesture or expression on the sync word.',
    'Keep every scene number and keep the words of the script unchanged. summary: one sentence on the visual plan.',
  ].join('\n')
  return { system: systemPrompt(s, 'the director'), user }
}

// ── The devil's advocate is the advocatePrompts above. The caption step is the SEO research step. ──

// ── The caption and keyword research (Jo, Nov 22: this stage is the SEO research) ──
export const CAPTION_TOOL: JsonTool = {
  name: 'ella_caption',
  description: 'Keyword research, then the post caption for Instagram and TikTok.',
  schema: obj({ candidates: arr(str), caption: str, keywords: arr(str), why: str }),
}
const isCaption = (v: unknown): v is { candidates: string[]; caption: string; keywords: string[]; why: string } => !!v && typeof v === 'object' && typeof (v as { caption: unknown }).caption === 'string'
export function captionPrompts(s: StudioSettings, d: ScriptDraft, retry?: { words: number; emojis?: number; caption: string }) {
  const user = [
    'THE FINISHED SCRIPT:', JSON.stringify({ coreMessage: d.coreMessage, keyTerm: d.keyTerm, hook: d.scenes[0]?.voice, voice: d.scenes.map(x => x.voice).join(' '), cta: d.scenes.at(-1)?.voice, current: d.captions.instagram }), '',
    'You are a team doing the keyword research and writing ONE caption used on both Instagram and TikTok:',
    '- Step 1, keyword research (Social search SEO specialist): list 8 to 10 phrases an international student would type into Instagram, TikTok, Google or ChatGPT about this exact message. Use the visa (500 or 485), the country the student studies in, and the tax words students search (tax return, TFN, ABN, Medicare levy, lodge, tax resident). Put them in "candidates".',
    '- Step 2, choose: keep the 3 to 5 phrases that match this video\'s one message best and that people really search for. Put them in "keywords", and say in "why" in one sentence why these won.',
    '- Step 3, write the caption. The first line carries the top keyword phrase in plain words. One clear answer sentence that ChatGPT or Google could quote (AI answer-engine specialist): the key term explained once, the country and visa named.',
    '- Copywriter for international students (IELTS 5.5 English): warm, short, human.',
    '- Keyword research here uses knowledge only (no live search volume). Never invent a number for search volume.',
    '',
    'Write the caption exactly like this, with real line breaks:',
    'Line 1: the hook as a question, with the main keyword phrase and one fitting emoji at the end. It must work alone, because only the first line shows before "more".',
    '(empty line)',
    '2 or 3 very short paragraphs (1 or 2 sentences each), separated by empty lines: the answer, what to do, one hedge (may, usually). One fitting emoji in at most two of them. 3 or 4 emojis in the whole caption, never more.',
    '(empty line)',
    'The CTA line (save, send or follow) with one emoji.',
    `LENGTH (Jo): ${CAPTION_WORDS.min} to ${CAPTION_WORDS.max} words in total for everything you write (line 1, the paragraphs and the CTA line). Emojis do not count. Count the words before you answer.`,
    'Rules: no hashtags (code adds them), no disclaimer (code adds it), no price, no refund promise, never say tax agent, no em or en dashes, no "link in bio", no place or location line (Instagram tags the place itself).',
    ...(retry ? ['', `YOUR LAST CAPTION HAD ${retry.words} WORDS AND ${retry.emojis ?? 0} EMOJIS. Rewrite it to ${CAPTION_WORDS.min} to ${CAPTION_WORDS.max} words with ${CAPTION_EMOJIS.min} or ${CAPTION_EMOJIS.max} emojis (one at the end of line 1, one on the CTA line), same message and keywords:`, retry.caption] : []),
    'keywords: the 3 to 5 search phrases you used. why: one sentence.',
  ].join('\n')
  return { system: systemPrompt(s, 'the caption team'), user }
}

const isJudge = (v: unknown): v is JudgeReply => !!v && typeof v === 'object' && !!(v as JudgeReply).first?.scores && !!(v as JudgeReply).second?.scores

export const minScore = (r?: Review) => (r ? Math.min(...REVIEW_DIMENSIONS.map(d => Number(r.scores[d]) || 0)) : 0)
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
  input: { state: StudioState; article: SourceArticle; settings: StudioSettings; llm: Llm; deadline?: number; now?: () => number; onStep?: (state: StudioState) => Promise<void>; stopped?: () => Promise<boolean> },
): Promise<StudioStepResult> {
  const now = input.now ?? Date.now
  const st: StudioState = structuredClone(input.state)
  if (LEGACY[st.phase]) st.phase = LEGACY[st.phase]
  if (!st.template) Object.assign(st, chooseTemplate(input.article))
  const usage: StudioStepResult['usage'] = []
  const { article: a, settings: s, llm } = input
  let first = true

  while (st.phase !== 'done') {
    // Jo pressed Stop: no further stage is started (the stage in hand has already finished).
    if (input.stopped && (await input.stopped())) return { state: st, usage, stopped: true }
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
      // The call must end before the run's own deadline; otherwise the platform kills it mid-call and the same stage is retried forever.
      const left = input.deadline !== undefined ? input.deadline - now() - 15_000 : Infinity
      const r = await llm.complete(p.system, p.user, { jsonTool: tool, effort: STAGE_EFFORT, timeoutMs: Math.max(30_000, Math.min(MODEL_CALL_TIMEOUT_MS, left)) })
      usage.push({ model: r.model, inputTokens: r.inputTokens, outputTokens: r.outputTokens })
      return r
    }
    const writeDraft = async (prompts: { system: string; user: string }) => {
      const r = await call(prompts, SCRIPT_TOOL)
      const { draft: parsed, error } = readDraft(r.text)
      if (!parsed) return { error: `The script could not be read: ${r.stopReason === 'max_tokens' ? `cut off at ${r.outputTokens} tokens` : error}` }
      const draft = st.ctx.wpm ? fitTimes(parsed, st.ctx.wpm) : parsed
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
        // Draft B must be written after draft A: it is told to use a different hook from A.
        const r = await writeDraft(writePrompts(st, a, s, phase === 'draftA' ? 'A' : 'B'))
        if (!r.d) { done(false, r.error!); return }
        // Jo (Nov 22): the checks run on each draft at once, and a draft that breaks a rule is fixed on the spot,
        // before the judge sees it. A fix is kept only if it is not worse. Two tries per draft, with their own count.
        let d: StudioDraft = r.d
        for (let tries = 0; blockingOf(d).length && tries < 2; tries++) {
          const fixed = await writeDraft(rewritePrompts(st, a, s, d))
          if (fixed.d && rank(fixed.d.issues) <= rank(d.issues)) d = fixed.d
        }
        st.drafts.push(d)
        st.phase = phase === 'draftA' ? 'draftB' : 'judge'
        const b = blockingOf(d)
        done(true, `Draft ${phase === 'draftA' ? 'A' : 'B'}: "${d.draft.scenes[0]?.voice ?? ''}"; automatic checks ${b.length ? `found ${b.length} problem${b.length > 1 ? 's' : ''}` : 'all passed'}`)
        return
      }
      if (phase === 'judge') {
        const [A, B] = st.drafts
        if (!B) { A.review = undefined; st.phase = 'revise'; done(true, 'Only one draft; skipping the comparison'); return }
        // One comparison (Jo, Nov 22). The automatic checks come first: a script that breaks a rule never beats one that does not.
        // Only when both pass the same checks does the judge's pick decide.
        const r = parse(await call(judgePrompts(st, a, s, A, B), JUDGE_TOOL), isJudge)
        if (!r.value) { done(false, `The judge could not be read: ${r.why}`); return }
        const j = r.value
        const toReview = (x: JudgeReply['first'], verdict: string): Review => ({
          scores: Object.fromEntries(REVIEW_DIMENSIONS.map(k => [k, Number(x.scores[k]) || 0])) as Review['scores'],
          notes: x.notes ?? [],
          accuracyProblems: x.accuracyProblems ?? [],
          verdict,
        })
        A.review = toReview(j.first, j.better === 'first' ? (j.verdict || '') : '')
        B.review = toReview(j.second, j.better === 'second' ? (j.verdict || '') : '')
        const pickA = rank(A.issues) !== rank(B.issues) ? rank(A.issues) < rank(B.issues) : j.better === 'first'
        const win = pickA ? A : B
        const other = pickA ? B : A
        st.judgeTake = { from: pickA ? 'B' : 'A', items: (j.takeFromOther ?? []).slice(0, 3) }
        st.otherDraft = other.draft
        st.drafts = pickA ? [A, B] : [B, A]
        const pass = blockingOf(win).length === 0
        st.phase = pass ? 'done' : 'revise'
        done(true, `Draft ${pickA ? 'A' : 'B'} wins (judge: ${j.better === 'first' ? 'A' : 'B'}${rank(A.issues) !== rank(B.issues) ? ', checks decided' : ''}); lowest score ${minScore(win.review)} of 5; ${st.judgeTake.items.length} idea(s) to take from the other. ${pass ? 'Ready.' : 'One fix.'}`)
        return
      }
      if (phase === 'panel') {
        // Each expert reviews the same script on their own, all five at once; their notes are merged.
        const reads = await Promise.all(PANEL_EXPERTS.map(e => call(panelPrompts(s, st.drafts[0].draft, e.id), PANEL_TOOL)))
        const parts = reads.map(r => parse(r, isPanel))
        const got = parts.filter(p => p.value).map(p => p.value!)
        const value: PanelNotes | null = got.length ? { notes: got.flatMap(g => g.notes), summary: got.map(g => g.summary).join(' ').slice(0, 600) } : null
        const why = parts.find(p => !p.value)?.why ?? ''
        if (!value) { done(false, `The panel could not be read: ${why}`); if (st.failures >= 2) { st.directed = true; st.phase = 'done' } return }
        st.panel = value
        st.phase = 'direct'
        done(true, `Visual panel: ${value.notes.length} notes. ${value.summary}`.slice(0, 400))
        return
      }
      if (phase === 'direct') {
        const { value, why } = parse(await call(directPrompts(s, st.drafts[0].draft, st.panel!), DIRECT_TOOL), isDirect)
        st.directed = true
        st.phase = 'caption'
        if (!value) { done(false, `The director could not be read: ${why}; keeping the writer's shots`); return }
        const win = st.drafts[0]
        const next: ScriptDraft = structuredClone(win.draft)
        for (const x of value.scenes) {
          const sc = next.scenes.find(k => k.scene === Number(x.scene))
          if (!sc || shotOf(sc) === 'graphic') continue
          for (const f of ['visual', 'action', 'syncWord', 'continuity'] as const) if (typeof x[f] === 'string' && x[f].trim()) sc[f] = x[f].trim()
          if (shotOf(sc) === 'clip' && typeof x.shotPrompt === 'string' && x.shotPrompt.trim()) sc.shotPrompt = x.shotPrompt.trim()
        }
        // The new pictures must still pass every automatic check; otherwise the writer's shots stay.
        const issues = validateScript(next, st.ctx)
        if (rank(issues) <= rank(win.issues)) {
          st.drafts[0] = { ...win, draft: next, issues }
          st.panel = { ...st.panel!, director: value.summary }
          done(true, `Director: ${value.summary}`.slice(0, 400))
        } else done(true, 'The director\'s shots broke a check; keeping the writer\'s shots')
        return
      }
      if (phase === 'advocate') {
        // One devil's advocate. Its notes go to the learning tab only; the words are not changed by code or by the advocate.
        st.phase = 'done'
        const { value, why } = parse(await call(advocatePrompts(s, st.drafts[0].draft), ADVOCATE_TOOL), isAdvocate)
        if (!value) { done(false, `The devil's advocate could not be read: ${why}`); return }
        st.advocate = { risks: value.risks.slice(0, 5), summary: value.summary ?? '' }
        done(true, `Advocate: ${st.advocate.risks.length} risk(s). ${st.advocate.summary}`.slice(0, 300))
        return
      }
      if (phase === 'caption') {
        st.phase = 'advocate'
        let { value, why } = parse(await call(captionPrompts(s, st.drafts[0].draft), CAPTION_TOOL), isCaption)
        // Jo, Nov 23: an unreadable answer used to leave the writer's caption (no emojis, no paragraphs). One more try first.
        if (!value) ({ value, why } = parse(await call(captionPrompts(s, st.drafts[0].draft), CAPTION_TOOL), isCaption))
        if (!value) { done(false, `The keyword research could not be read: ${why}; keeping the writer's caption`); return }
        // Jo, Nov 23: 40 to 50 words and 3 or 4 emojis. One more try when either is out; the try closer is kept. Never blocks the video.
        const off = (c: string) => {
          const n = captionWords(c), e = captionEmojis(c)
          const w = n < CAPTION_WORDS.min ? CAPTION_WORDS.min - n : n > CAPTION_WORDS.max ? n - CAPTION_WORDS.max : 0
          const m = e < CAPTION_EMOJIS.min ? CAPTION_EMOJIS.min - e : e > CAPTION_EMOJIS.max ? e - CAPTION_EMOJIS.max : 0
          return w + m * 10
        }
        if (off(value.caption)) {
          const again = parse(await call(captionPrompts(s, st.drafts[0].draft, { words: captionWords(value.caption), emojis: captionEmojis(value.caption), caption: value.caption }), CAPTION_TOOL), isCaption)
          if (again.value && off(again.value.caption) < off(value.caption)) value = again.value
        }
        const win = st.drafts[0]
        const next: ScriptDraft = structuredClone(win.draft)
        next.captions = { instagram: value.caption, tiktok: value.caption }
        finishCaptions(next)
        const issues = validateScript(next, st.ctx)
        if (rank(issues) <= rank(win.issues)) {
          st.drafts[0] = { ...win, draft: next, issues }
          st.captionNotes = { candidates: value.candidates ?? [], keywords: value.keywords ?? [], why: value.why ?? '' }
          done(true, `Keywords: ${(value.keywords ?? []).join(', ')}`.slice(0, 300))
        } else done(true, "The new caption broke a check; keeping the writer's caption")
        return
      }
      if (phase === 'revise') {
        const win = st.drafts[0]
        const r = await writeDraft(rewritePrompts(st, a, s, win))
        st.rewrites++
        // Jo: a script never reaches him with a failed check. Keep fixing while one fails, up to the limit.
        // Jo (Nov 22): keep fixing while an automatic check OR the expert review still fails (the final verdict needs both).
        const again = () => { st.phase = blockingOf(st.drafts[0]).length && st.rewrites < STUDIO_MAX_REWRITES ? 'revise' : 'done' }
        if (!r.d) { done(false, `${r.error}; keeping the judged draft`); again(); return }
        // The fix is kept only if it is not worse on the checks; it inherits the judged scores minus what it fixed.
        if (rank(r.d.issues) <= rank(win.issues)) {
          r.d.review = win.review ? { ...win.review, notes: [], accuracyProblems: [], scores: Object.fromEntries(REVIEW_DIMENSIONS.map(k => [k, Math.max(REVIEW_PASS, win.review!.scores[k])])) as Review['scores'] } : undefined
          st.drafts.unshift(r.d)
          done(true, `Fix ${st.rewrites}: automatic checks ${blockingOf(r.d).length ? `still find ${blockingOf(r.d).length}` : 'all pass'}`)
        } else done(true, `Fix ${st.rewrites} was worse on the checks; keeping the better draft`)
        again()
        return
      }
    }
    // Save "running now" before the model call, so the board shows the real step while it works.
    st.current = { phase, at: new Date(t).toISOString() }
    await input.onStep?.(st)
    try { await stage() } catch (e) {
      // A failed call is one failed stage; the work saved before it is kept.
      done(false, `Model call failed: ${String((e as Error)?.message ?? e).slice(0, 300)}`)
    }
    st.current = undefined
    // A clean script gets the visual panel and the director before it is done.
    if ((st.phase as StudioPhase) === 'done' && !st.directed && st.drafts[0] && !blockingOf(st.drafts[0]).length && st.failures < 3) st.phase = 'panel'
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
  const passed = blockingOf(best).length === 0
  // The research, review and work log travel with the script so Atlas can show them.
  const draft = { ...best.draft, studio: { research: st.research, review: best.review, log: st.log, drafts: st.drafts.length, template: st.template, series: st.series, panel: st.panel, advocate: st.advocate, judgeTake: st.judgeTake, captionNotes: st.captionNotes } } as ScriptDraft
  return { draft, issues, passed, attempts }
}

export const STUDIO_STAGES_LABEL: Record<StudioPhase, string> = {
  research: 'Research: facts and ideas', draftA: 'Writing draft A', draftB: 'Writing draft B', judge: 'The judge compares both', revise: 'Fixing',
  panel: 'Visual panel: 4 experts', direct: 'The director writes the shots', caption: 'Keyword research and caption', advocate: "Devil's advocate: risk notes", done: 'Done',
}
