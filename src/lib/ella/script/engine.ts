/**
 * Stage 1 script engine: one drawn blog in, one checked script out.
 * Runs the bible's recipe (section 17) through the model, then the automatic
 * checks (validate.ts). On failure it asks for a rewrite with the exact
 * issues, at most 3 attempts, then hands the best draft to Jo with reasons.
 */
import type { SourceArticle } from '../library'
import type { JsonTool, Llm } from './llm'
import { BIBLE_VERSION, LIMITS } from './rules'
import type { Issue, ScriptDraft, ValidationContext } from './types'
import { validateScript } from './validate'

export interface EngineInput {
  bible: string
  article: SourceArticle
  pillar: string
  ctx: ValidationContext
  ellaLooks: string[]
  testChange: string
  recentKeyTerms: string[]
  /** What this account's own numbers say so far (learn.ts). A tie-breaker, never above a bible rule. */
  learnings?: string
  /** Epoch ms. A rewrite starts only if a whole attempt still fits before it (the server stops at 5 minutes). */
  deadline?: number
  now?: () => number
}

const str = { type: 'string' }
const num = { type: 'number' }
/** The script as a tool call: the model fills this object and writes nothing else. */
export const SCRIPT_TOOL: JsonTool = {
  name: 'submit_script',
  description: 'Submit the finished Ella script. Every field as described in the instructions.',
  schema: {
    type: 'object',
    required: ['ideas', 'coreMessage', 'keyTerm', 'audienceSlice', 'pillar', 'hookType', 'hookOptions', 'ctaType', 'ellaLook', 'scenes', 'claims', 'captions', 'testChangeApplied'],
    properties: {
      ideas: { type: 'array', maxItems: 5, items: { type: 'object', properties: { idea: str, surprise: num, stakes: num, clarity: num, safety: num } } },
      coreMessage: str, keyTerm: str, audienceSlice: str, pillar: str, hookType: str,
      hookOptions: { type: 'array', items: str }, ctaType: str, ellaLook: str,
      scenes: { type: 'array', items: { type: 'object', properties: {
        scene: num, start: num, end: num, ellaInFrame: { type: 'boolean' }, voice: str, emphasis: str, onScreen: str, visual: str,
        action: str, syncWord: str, shotPrompt: str, continuity: str, claimRef: str } } },
      claims: { type: 'array', items: { type: 'object', properties: { id: str, text: str, blogLine: str, kind: { type: 'string', enum: ['fact', 'tip'] }, source: str } } },
      captions: { type: 'object', properties: { instagram: str, tiktok: str } },
      testChangeApplied: str, lengthReason: str,
    },
  },
}

/** About the longest one script attempt takes. */
export const ATTEMPT_MS = 100_000

export interface EngineResult {
  draft: ScriptDraft | null
  issues: Issue[]
  passed: boolean
  attempts: number
  usage: Array<{ model: string; inputTokens: number; outputTokens: number }>
}

const SCHEMA = `Submit the script with the submit_script tool (one JSON object, nothing else), with these fields:
{
  "ideas": [{"idea": string, "surprise": 1-5, "stakes": 1-5, "clarity": 1-5, "safety": 1-5}],   // up to 5
  "coreMessage": string,            // 15 words or fewer
  "keyTerm": string,                // as spoken, e.g. "A-B-N"
  "audienceSlice": string,
  "pillar": string,
  "hookType": "If you" | "Common mistake" | "Myth vs fact" | "One number" | "Yes or no question" | "Deadline" | "Show first",
  "hookOptions": [string, string, string],
  "ctaType": "Send" | "Save" | "Comment" | "Follow" | "WhatsApp",
  "ellaLook": string,               // one of the approved look IDs
  "scenes": [{
    "scene": number, "start": number, "end": number, "ellaInFrame": boolean,
    "voice": string, "emphasis": string, "onScreen": string, "visual": string,
    "action": string, "syncWord": string,
    "shotPrompt": "STYLE: ...\\nSUBJECT: ...\\nACTION: ...\\nSETTING: ...\\nCAMERA: ...\\nLIGHT: ...",
    "continuity": string, "claimRef": string   // a claim id or "none"
  }],
  "claims": [{"id": string, "text": string, "blogLine": string, "kind": "fact" | "tip", "source": string}],
  "captions": {"instagram": string, "tiktok": string},
  "testChangeApplied": string,
  "lengthReason": string            // only if over ${LIMITS.targetMax} seconds
}
The // notes above explain the fields; never copy them into the JSON. Run the recipe steps silently: write no notes, no plan and no text outside the tool call.
Hard rules the checker enforces: scene 1 is the hook with Ella in frame, ending by ${LIMITS.hookEndsBy} s, 7 words or fewer (6 if it holds a number); the last scene is the CTA with Ella in frame, 8 words or fewer; every shot ${LIMITS.shotMin} to ${LIMITS.shotMax} s with no gaps; no voice line faster than ${LIMITS.maxSpeakingWpm} words per minute; total words fit the length at ${LIMITS.planningWpm} words per minute; spelled acronyms (A-B-N) count one word per letter; numbers spoken in words, never digits; every "blogLine" is copied exactly from the article; "fact" claims cite an official .gov.au URL taken from the article's sources; both captions contain "General information only, not tax advice." and only approved hashtags.
Voice flow (section 7a): write the whole voice-over first as one short talk, then cut it into scenes. Every scene's voice ends with "." "?" or ","; a sentence runs across at most 2 scenes and is cut only at its one comma; at most ${LIMITS.maxSceneWords} words per scene; every sentence ${LIMITS.sentenceWords} words or fewer across scenes; body sentences average ${LIMITS.bodyMeanWords} words or more; at least one sentence runs across a scene cut; scene 1 and the scene before the CTA end a sentence; question marks only in the hook and the CTA; no one-word sentences; only . , ? and apostrophes in voice lines; every scene whose claim is hedged keeps a hedge word in its voice and on-screen text.`

export function buildPrompts(input: EngineInput, feedback: Issue[] = []): { system: string; user: string } {
  const a = input.article
  const system = [
    `You are Ella's script writer for Student Visa Tax. Follow the Ella script bible ${BIBLE_VERSION} below exactly.`,
    'If the blog and the bible disagree, the bible wins. Use only facts from the article. Never invent experiences, numbers, clients or stories.',
    'Target 25 to 35 seconds. One idea. Hook 7 words or fewer, 6 with a number. One CTA at the end, 8 words or fewer.',
    'Ella talks like a calm friend: join linked facts with "so", "and" or "but" and one comma, end a sentence only when an idea ends, and never use filler or sales phrases.',
    '', '=== ELLA SCRIPT BIBLE ===', input.bible,
  ].join('\n')

  const user = [
    `ARTICLE (slug ${a.slug}, ${a.kind}, category ${a.category}, pillar ${input.pillar}, updated ${a.updated})`,
    `Title: ${a.title}`,
    'Official sources:', ...a.sources.map(s => `- ${s.label}: ${s.href}`),
    '', a.text, '',
    'CONTEXT',
    `- Approved Ella looks: ${input.ellaLooks.join(', ')}`,
    `- Previous episode hook type: ${input.ctx.previousHookType ?? 'none'}`,
    `- Recent CTA types, newest first: ${input.ctx.recentCtaTypes.join(', ') || 'none'}`,
    `- Key terms used in the last ${LIMITS.keyTermLookback} episodes (prefer another): ${input.recentKeyTerms.join(', ') || 'none'}`,
    `- Test change to apply: ${input.testChange}`,
    `- What has worked on this account so far (use only to choose between options the bible allows): ${input.learnings || 'not enough data yet'}`,
    `- WhatsApp allowed: ${input.ctx.agentSignoffConfirmed ? 'yes' : 'no (do not mention WhatsApp anywhere)'}`,
    `- Price in captions: ${input.ctx.allowPrice ? 'allowed' : 'off'}`,
    '', SCHEMA,
    ...(feedback.length ? ['', 'YOUR LAST DRAFT FAILED THESE CHECKS. Fix every one and return the whole JSON again:',
      ...feedback.map(i => `- [${i.code}]${i.scene ? ` scene ${i.scene}` : ''}: ${i.message}`)] : []),
  ].join('\n')
  return { system, user }
}

/** Best draft first: fewest compliance and claim problems, then fewest other blocking issues. Warnings never count. */
export function rank(issues: readonly Issue[]): number {
  const blocking = issues.filter(i => i.severity !== 'warn')
  const serious = blocking.filter(i => i.code.startsWith('compliance') || i.code.startsWith('claim.') || i.code.startsWith('gate.')).length
  return serious * 1000 + blocking.length
}

/**
 * Reads the script out of the model's reply. Tolerates a ```json fence or none,
 * prose before or after, // comments copied from the schema and trailing commas.
 * Returns why it failed, so Jo sees the real reason instead of "no draft".
 */
export function readDraft(text: string): { draft: ScriptDraft | null; error?: string } {
  const candidates: string[] = []
  for (const m of text.matchAll(/```(?:json)?\s*([\s\S]*?)```/g)) candidates.push(m[1])
  candidates.push(...balancedObjects(text))
  let lastError = 'no JSON object found in the reply'
  for (const c of candidates) {
    for (const src of [c, clean(c)]) {
      try {
        const v = JSON.parse(src) as ScriptDraft
        if (v && typeof v === 'object' && Array.isArray(v.scenes)) return { draft: v }
        lastError = 'the JSON has no "scenes" list'
      } catch (e) { lastError = (e as Error).message }
    }
  }
  return { draft: null, error: lastError }
}

export function parseDraft(text: string): ScriptDraft | null { return readDraft(text).draft }

/** Drops // comments outside strings and commas before a closing bracket. */
function clean(src: string): string {
  let out = '', inStr = false
  for (let i = 0; i < src.length; i++) {
    const ch = src[i]
    if (inStr) { out += ch; if (ch === '\\') { out += src[++i] ?? '' } else if (ch === '"') inStr = false; continue }
    if (ch === '"') { inStr = true; out += ch; continue }
    if (ch === '/' && src[i + 1] === '/') { while (i < src.length && src[i] !== '\n') i++; out += '\n'; continue }
    out += ch
  }
  return out.replace(/,(\s*[}\]])/g, '$1')
}

/** Every top-level {...} span in the text, longest first. */
function balancedObjects(text: string): string[] {
  const found: string[] = []
  let depth = 0, start = -1, inStr = false
  for (let i = 0; i < text.length; i++) {
    const ch = text[i]
    if (inStr) { if (ch === '\\') i++; else if (ch === '"') inStr = false; continue }
    if (ch === '"' && depth > 0) { inStr = true; continue }
    if (ch === '{') { if (depth === 0) start = i; depth++ }
    else if (ch === '}' && depth > 0) { depth--; if (depth === 0) found.push(text.slice(start, i + 1)) }
  }
  return found.sort((a, b) => b.length - a.length)
}

export async function generateScript(input: EngineInput, llm: Llm): Promise<EngineResult> {
  const usage: EngineResult['usage'] = []
  let best: { draft: ScriptDraft | null; issues: Issue[] } = { draft: null, issues: [{ code: 'engine.none', message: 'No draft produced' }] }
  let feedback: Issue[] = []

  const now = input.now ?? Date.now
  let attempts = 0
  for (let attempt = 1; attempt <= LIMITS.rewriteAttempts; attempt++) {
    if (attempt > 1 && input.deadline !== undefined && input.deadline - now() < ATTEMPT_MS) {
      best = { ...best, issues: [...best.issues, { code: 'engine.time', message: `Stopped after ${attempt - 1} attempt${attempt > 2 ? 's' : ''}: no time left for another rewrite in this run.`, severity: 'warn' }] }
      break
    }
    attempts = attempt
    const { system, user } = buildPrompts(input, feedback)
    const res = await llm.complete(system, user, { jsonTool: SCRIPT_TOOL })
    usage.push({ model: res.model, inputTokens: res.inputTokens, outputTokens: res.outputTokens })
    const { draft, error } = readDraft(res.text)
    const why = res.stopReason === 'max_tokens'
      ? `the reply was cut off at ${res.outputTokens} tokens before the JSON ended`
      : `${error}${res.stopReason ? ` (stop reason: ${res.stopReason})` : ''}`
    const peek = res.text.replace(/\s+/g, ' ').trim()
    const sample = peek ? ` The reply began: "${peek.slice(0, 160)}"` : ' The reply was empty.'
    const issues: Issue[] = draft
      ? validateScript(draft, input.ctx)
      : [{ code: 'engine.parse', message: `Attempt ${attempt}: the reply could not be read as the script JSON: ${why}.${sample} Submit only the submit_script tool call.` }]
    const blocking = issues.filter(i => i.severity !== 'warn')
    if (draft && (best.draft === null || rank(issues) < rank(best.issues))) best = { draft, issues }
    else if (!draft && best.draft === null) best = { draft: null, issues }
    if (draft && blocking.length === 0) return { draft, issues, passed: true, attempts: attempt, usage }
    // Only blocking issues go back to the model; warnings are kept for Jo.
    feedback = blocking
  }
  return { draft: best.draft, issues: best.issues, passed: false, attempts, usage }
}
