// src/lib/ai-reply-draft.ts
// ──────────────────────────────────────────────────────────────────────────
// Drafts a context-aware suggested reply for the tax agent to review in the
// CRM (Shadow Mode approval queue) — used as the fallback whenever a
// client's message doesn't match one of the compliance-critical scripted
// flows (pricing, residency, ABN). Reads the FULL conversation transcript
// first, so the draft reflects where this specific client actually is
// (e.g. "still waiting on a form field", "already asked this once",
// "just confirming something we already told them") instead of a generic
// "let me check and get back to you" every time.
//
// GUARDRAIL, same principle as ai-personalize.ts and the classifiers:
// - This is a DRAFT for a human to read, edit, or reject in the CRM —
//   Shadow Mode means nothing generated here reaches a real client without
//   a person approving it first.
// - Even so, the model is told never to invent a price, a legal/eligibility
//   claim, a timeframe, or any fact not already present in the transcript
//   it was given — if it doesn't know, it should draft a short, honest
//   "let me check on that specific thing and get back to you" instead of
//   guessing. This keeps drafts safe to skim-approve, not just safe to
//   send verbatim.
// - Any failure (API error, empty output, failed validation) falls back to
//   the original fixed holding line — the flow NEVER blocks or breaks
//   because drafting didn't work.
//
// Required env var: ANTHROPIC_API_KEY
// ──────────────────────────────────────────────────────────────────────────

import type { HistoryMessage } from '@/lib/wa-store'

const FALLBACK_LINE = "Great question! Let me just double check that for you and I'll get right back to you 🙌"
const MAX_LEN = 700

const SYSTEM_PROMPT = `You are drafting ONE WhatsApp reply for a tax agent at an Australian tax refund company for backpackers to review and send to a client. You are NOT sending this yourself — a human will read your draft, edit or reject it, in a review queue.

You will be given the full conversation transcript (oldest first) and the client's latest message. Before drafting anything:
1. Work out where this client actually is right now — e.g. mid-form, waiting on a document, asking something they've asked before, confused about a step, or asking something totally new.
2. Draft a short, warm, natural WhatsApp reply (1-4 sentences) that responds to their LATEST message in light of that context — not a generic "let me check" unless you genuinely have nothing else to go on.

Hard rules, no exceptions:
- NEVER state a price, a fee, a dollar amount, a specific eligibility/legal claim, or a promised timeframe UNLESS that exact fact already appears earlier in the transcript you were given. If it's not in the transcript, don't say it.
- NEVER invent information about their specific tax situation, ABN, visa, or refund amount that isn't already in the transcript.
- If the client's message genuinely needs a tax agent's judgment call (something specific to their numbers, situation, or a nuanced legal question), draft a short reply acknowledging their SPECIFIC question (not generic) and saying you'll confirm that for them — still personalised to what they actually asked, not word-for-word the same every time.
- Keep the tone warm, casual, and brief — matching a real WhatsApp conversation, not an email.
- Output ONLY the reply text. No explanation, no quotes, no labels, nothing else.`

export interface DraftReplyInput {
  history: HistoryMessage[]
  clientText: string
  stage: string
  hasAbn: boolean | null
}

export async function draftContextAwareReply(input: DraftReplyInput): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey || !input.clientText.trim()) return FALLBACK_LINE

  const transcript = input.history
    .slice(-60) // matches getMessageHistory's cap, kept here too in case a caller passes more
    .map(m => `${m.direction === 'inbound' ? 'Client' : 'Agent'}: ${m.body}`.slice(0, 500))
    .join('\n')

  const userContent =
    `Conversation stage: ${input.stage}${input.hasAbn ? ' (has ABN)' : ''}\n\n` +
    `Transcript so far:\n${transcript || '(no prior messages)'}\n\n` +
    `Client's latest message: "${input.clientText.slice(0, 500)}"`

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 220,
        system: SYSTEM_PROMPT,
        messages: [{ role: 'user', content: userContent }],
      }),
      signal: AbortSignal.timeout(12_000),
    })

    if (!res.ok) {
      console.error('[ai-reply-draft] Anthropic API error', res.status, await res.text().catch(() => ''))
      return FALLBACK_LINE
    }

    const data = await res.json()
    const text: string = data?.content?.[0]?.text?.trim() ?? ''

    return isSafe(text) ? text : FALLBACK_LINE
  } catch (err) {
    console.error('[ai-reply-draft]', err)
    return FALLBACK_LINE
  }
}

/**
 * Cheap-but-effective safety net, same principle as ai-personalize.ts:
 * even though the prompt forbids it, verify the model didn't slip in a
 * price or a percentage before this ever reaches the human review queue.
 * A URL check is deliberately NOT included here (unlike ai-personalize.ts)
 * since a legitimate reply might reasonably point back to the tax form
 * link the client was already sent earlier in the transcript.
 */
function isSafe(text: string): boolean {
  if (!text || text.length > MAX_LEN) return false
  const lower = text.toLowerCase()
  const forbidden = ['$', 'guarantee', '%']
  return !forbidden.some(f => lower.includes(f))
}
