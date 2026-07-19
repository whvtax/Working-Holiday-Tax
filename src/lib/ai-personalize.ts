// src/lib/ai-personalize.ts
// ──────────────────────────────────────────────────────────────────────────
// Generates ONE short, personalised acknowledgment line for the opening
// message (role doc Section 10.1), reflecting whatever the client actually
// wrote — while the rest of the message stays the fixed, approved script.
//
// GUARDRAILS (do not weaken these — see role doc Section 7 "Never" rules):
//   - The model is told, explicitly and repeatedly, to ONLY acknowledge —
//     never to answer a question, quote a price, or give any tax/process
//     information. That's still 100% the fixed script's job.
//   - Output is validated after the fact: length-capped, and rejected if it
//     contains a dollar sign, a URL, or the word "guarantee" (cheap but
//     effective net against the model slipping in real content).
//   - Any failure (API error, empty output, failed validation) falls back
//     to the original fixed line ("Yes, we'd love to help.") — the flow
//     NEVER blocks or breaks because personalisation didn't work.
//
// Required env var: ANTHROPIC_API_KEY
// ──────────────────────────────────────────────────────────────────────────

const FALLBACK_LINE = "Yes, we'd love to help."
const MAX_LEN = 140

const SYSTEM_PROMPT = `You write ONE short acknowledgment line for a WhatsApp customer service opener at an Australian tax refund company for backpackers.

Rules, no exceptions:
- Read the client's message and write a single warm, natural sentence (under 15 words) that shows you read THEIR specific message.
- Never answer any question they asked. Never mention a price, a dollar amount, a timeframe, a URL, or any tax/process detail.
- Never make a promise or guarantee of any kind.
- Do not use their name (it's added separately).
- Output ONLY the one line. No greeting, no quotes, no explanation, nothing else.

Example:
Client wrote: "hey how much do you guys charge for tax returns"
Good output: Happy to help you sort out your tax return!
Bad output: We charge $220! (contains a price — forbidden)

Client wrote: "is this legit? saw you on tiktok"
Good output: Totally fair to check us out first!
Bad output: Yes we're 100% legit and registered! (makes a claim — forbidden)`

export async function personalizeOpeningLine(clientMessage: string): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey || !clientMessage.trim()) return FALLBACK_LINE

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
        max_tokens: 60,
        system: SYSTEM_PROMPT,
        messages: [{ role: 'user', content: `Client wrote: "${clientMessage.slice(0, 500)}"` }],
      }),
      signal: AbortSignal.timeout(8_000),
    })

    if (!res.ok) {
      console.error('[ai-personalize] Anthropic API error', res.status, await res.text().catch(() => ''))
      return FALLBACK_LINE
    }

    const data = await res.json()
    const text: string = data?.content?.[0]?.text?.trim() ?? ''

    return isSafe(text) ? text : FALLBACK_LINE
  } catch (err) {
    console.error('[ai-personalize]', err)
    return FALLBACK_LINE
  }
}

/**
 * Cheap-but-effective safety net: even though the prompt forbids it, verify
 * the model didn't slip in a price, link, or promise before we ever send
 * this to a real client.
 */
function isSafe(text: string): boolean {
  if (!text || text.length > MAX_LEN) return false
  const lower = text.toLowerCase()
  const forbidden = ['$', 'http://', 'https://', 'www.', 'guarantee', 'promise', '%']
  return !forbidden.some(f => lower.includes(f))
}
