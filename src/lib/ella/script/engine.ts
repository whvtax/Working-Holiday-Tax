/**
 * Stage 1 script engine: one drawn blog in, one checked script out.
 * Runs the bible's recipe (section 17) through the model, then the automatic
 * checks (validate.ts). On failure it asks for a rewrite with the exact
 * issues, at most 3 attempts, then hands the best draft to Jo with reasons.
 */
import type { SourceArticle } from '../library'
import type { Llm } from './llm'
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
}

export interface EngineResult {
  draft: ScriptDraft | null
  issues: Issue[]
  passed: boolean
  attempts: number
  usage: Array<{ model: string; inputTokens: number; outputTokens: number }>
}

const SCHEMA = `Return ONLY one JSON object in a \`\`\`json block, with these fields:
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
Hard rules the checker enforces: scene 1 is the hook with Ella in frame, ending by ${LIMITS.hookEndsBy} s, 7 words or fewer (6 if it holds a number); the last scene is the CTA with Ella in frame, 8 words or fewer; every shot ${LIMITS.shotMin} to ${LIMITS.shotMax} s with no gaps; no voice line faster than ${LIMITS.maxSpeakingWpm} words per minute; total words fit the length at ${LIMITS.planningWpm} words per minute; spelled acronyms (A-B-N) count one word per letter; numbers spoken in words, never digits; every "blogLine" is copied exactly from the article; "fact" claims cite an official .gov.au URL taken from the article's sources; both captions contain "General information only, not tax advice." and only approved hashtags.`

export function buildPrompts(input: EngineInput, feedback: Issue[] = []): { system: string; user: string } {
  const a = input.article
  const system = [
    `You are Ella's script writer for Student Visa Tax. Follow the Ella script bible ${BIBLE_VERSION} below exactly.`,
    'If the blog and the bible disagree, the bible wins. Use only facts from the article. Never invent experiences, numbers, clients or stories.',
    'Target 25 to 35 seconds. One idea. Hook 7 words or fewer, 6 with a number. One CTA at the end, 8 words or fewer.',
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

export function parseDraft(text: string): ScriptDraft | null {
  const fenced = text.match(/```json\s*([\s\S]*?)```/)
  const raw = fenced ? fenced[1] : text.slice(text.indexOf('{'), text.lastIndexOf('}') + 1)
  try { return JSON.parse(raw) as ScriptDraft } catch { return null }
}

export async function generateScript(input: EngineInput, llm: Llm): Promise<EngineResult> {
  const usage: EngineResult['usage'] = []
  let best: { draft: ScriptDraft | null; issues: Issue[] } = { draft: null, issues: [{ code: 'engine.none', message: 'No draft produced' }] }
  let feedback: Issue[] = []

  for (let attempt = 1; attempt <= LIMITS.rewriteAttempts; attempt++) {
    const { system, user } = buildPrompts(input, feedback)
    const res = await llm.complete(system, user)
    usage.push({ model: res.model, inputTokens: res.inputTokens, outputTokens: res.outputTokens })
    const draft = parseDraft(res.text)
    const issues = draft
      ? validateScript(draft, input.ctx)
      : [{ code: 'engine.parse', message: 'The reply was not one valid JSON object' }]
    if (draft && (best.draft === null || issues.length < best.issues.length)) best = { draft, issues }
    if (draft && issues.length === 0) return { draft, issues, passed: true, attempts: attempt, usage }
    feedback = issues
  }
  return { draft: best.draft, issues: best.issues, passed: false, attempts: LIMITS.rewriteAttempts, usage }
}
