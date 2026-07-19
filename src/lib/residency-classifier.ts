// src/lib/residency-classifier.ts
// ──────────────────────────────────────────────────────────────────────────
// Section 10.6 of the role doc — parsing the client's free-text reply to
// the 3-question residency check into a structured yes/no/unclear result.
//
// GUARDRAIL, same principle as ai-personalize.ts: this model call ONLY
// returns a classification (a single word), never client-facing text. It
// cannot write anything a client will see. If the model is unsure, it must
// say so — we fall through to a human instead of guessing on something
// that decides eligibility.
// ──────────────────────────────────────────────────────────────────────────

export type Intent = 'self_lodge' | 'use_service' | 'unclear'
export type ResidencyAnswer = 'all_yes' | 'not_all_yes' | 'unclear'

const INTENT_SYSTEM_PROMPT = `Classify the client's WhatsApp reply to this exact question: "Just to check - are you planning to lodge this yourself, or would you like to use our service?"

Reply with EXACTLY ONE WORD, nothing else:
- self_lodge  — they want to do it themselves / on their own / via myGov
- use_service — they want to use the company's service / want help
- unclear     — genuinely ambiguous, off-topic, or doesn't answer the question`

const RESIDENCY_SYSTEM_PROMPT = `The client was asked three yes/no questions in one message:
1. Is your ordinary place of residence in Australia?
2. Do you have an intention to live in Australia?
3. Have you established ongoing ties to Australia (home, ongoing employment, or personal connections)?

Classify their free-text reply. Reply with EXACTLY ONE WORD, nothing else:
- all_yes      — a clear yes to all three
- not_all_yes  — a clear no (or mixed) on any of the three
- unclear      — doesn't actually answer, or too ambiguous to tell`

async function classify(systemPrompt: string, userText: string): Promise<string | null> {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey || !userText.trim()) return null

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
        max_tokens: 10,
        system: systemPrompt,
        messages: [{ role: 'user', content: userText.slice(0, 1000) }],
      }),
      signal: AbortSignal.timeout(8_000),
    })
    if (!res.ok) return null
    const data = await res.json()
    const word: string = (data?.content?.[0]?.text ?? '').trim().toLowerCase()
    return word || null
  } catch (err) {
    console.error('[residency-classifier]', err)
    return null
  }
}

export async function classifyLodgeIntent(text: string): Promise<Intent> {
  const word = await classify(INTENT_SYSTEM_PROMPT, text)
  if (word === 'self_lodge' || word === 'use_service') return word
  return 'unclear'
}

export async function classifyResidencyAnswer(text: string): Promise<ResidencyAnswer> {
  const word = await classify(RESIDENCY_SYSTEM_PROMPT, text)
  if (word === 'all_yes' || word === 'not_all_yes') return word
  return 'unclear'
}
