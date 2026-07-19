// src/lib/knowledge-base.ts
// ──────────────────────────────────────────────────────────────────────────
// Role doc Section 8/9 — "Building a knowledge base: every question gets
// asked once." Once the tax agent answers a question the bot didn't know,
// it's saved here. Next time something similar comes in, the bot sends the
// EXACT saved answer instead of escalating again.
//
// GUARDRAIL, same principle as every other classifier in this codebase:
// the AI call here ONLY decides *whether an existing answer matches* — it
// never writes new client-facing text. The text that goes to the client is
// always the tax agent's own words, saved verbatim from a real reply.
// ──────────────────────────────────────────────────────────────────────────

import { getSupabase } from '@/lib/supabase'

interface KbEntry { id: number; question_text: string; answer_text: string; times_used: number }

const MATCH_SYSTEM_PROMPT = `You are matching a new customer question against a list of previously-answered questions, to see if an existing answer already covers it.

You'll be given the new question, then a numbered list of past questions. Reply with EXACTLY the number of the matching entry if one clearly covers the same thing, or the word "none" if nothing matches closely enough. Do not explain, do not add punctuation — just the number or "none".

Only match if the existing answer would genuinely and accurately answer the new question too. When in doubt, say "none" — a wrong match sends the client incorrect information, which is worse than asking a human again.`

/**
 * Looks for a past answer that covers this new question. Returns the saved
 * answer text (unmodified) if found, or null if nothing matches closely
 * enough — in which case the caller should fall back to flagging a human,
 * exactly as before this feature existed.
 */
export async function findKnowledgeBaseAnswer(clientText: string): Promise<{ id: number; answer: string } | null> {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey || !clientText.trim()) return null

  try {
    const sb = getSupabase()
    const { data } = await sb
      .from('wa_knowledge_base')
      .select('id, question_text, answer_text, times_used')
      .order('created_at', { ascending: false })
      .limit(50)

    const entries = (data ?? []) as KbEntry[]
    if (entries.length === 0) return null

    const list = entries.map((e, i) => `${i + 1}. ${e.question_text.slice(0, 200)}`).join('\n')
    const userMessage = `New question: "${clientText.slice(0, 500)}"\n\nPast questions:\n${list}`

    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 10,
        system: MATCH_SYSTEM_PROMPT,
        messages: [{ role: 'user', content: userMessage }],
      }),
      signal: AbortSignal.timeout(8_000),
    })
    if (!res.ok) return null

    const responseData = await res.json()
    const word: string = (responseData?.content?.[0]?.text ?? '').trim().toLowerCase()
    if (word === 'none') return null

    const index = parseInt(word, 10) - 1
    const match = entries[index]
    if (!match) return null

    // Usage tracking — not on the critical path but awaited anyway to
    // avoid a floating promise; failure here must never affect the match.
    try {
      await sb.from('wa_knowledge_base')
        .update({ times_used: match.times_used + 1, last_used_at: new Date().toISOString() })
        .eq('id', match.id)
    } catch { /* non-fatal */ }

    return { id: match.id, answer: match.answer_text }
  } catch (err) {
    console.error('[knowledge-base] match lookup failed', err)
    return null
  }
}

/**
 * Called when the tax agent answers a flagged question from the CRM —
 * saves it so the same question never needs escalating again.
 */
export async function saveKnowledgeBaseAnswer(questionText: string, answerText: string, createdBy?: string): Promise<void> {
  try {
    const sb = getSupabase()
    await sb.from('wa_knowledge_base').insert({
      question_text: questionText.slice(0, 1000),
      answer_text: answerText,
      created_by: createdBy ?? null,
    })
  } catch (err) {
    console.error('[knowledge-base] save failed', err)
  }
}
