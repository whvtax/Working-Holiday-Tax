// src/lib/abn-classifier.ts
// ──────────────────────────────────────────────────────────────────────────
// Section 10.3 of the role doc — the ABN income branch:
//   "If the client has no income yet from the ABN ('just registered') —
//    once the form is completed, they move straight to Ready. If there's
//    actual income, receipts/invoices are required first."
//
// Same guardrail as the other classifiers in this codebase: this ONLY
// returns a category label, never client-facing text. "unclear" always
// falls through to a human rather than guessing on a billing-relevant
// distinction.
// ──────────────────────────────────────────────────────────────────────────

export type AbnIncomeStatus = 'no_income_yet' | 'has_income' | 'unclear'

const SYSTEM_PROMPT = `The client was asked these questions about ABN work:
- What kind of work did you do under the ABN?
- What was your total income from it?
- Do you have any invoices or records of that income?
- Did you have any expenses? If so, do you have receipts or invoices for them?

Classify their free-text reply. Reply with EXACTLY ONE WORD, nothing else:
- no_income_yet — they've registered the ABN but haven't earned anything from it yet (e.g. "just registered", "haven't started", "none so far")
- has_income    — they report any actual income amount or work done under the ABN, even a small one
- unclear       — doesn't actually answer, or too ambiguous to tell`

export async function classifyAbnIncome(text: string): Promise<AbnIncomeStatus> {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey || !text.trim()) return 'unclear'

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
        system: SYSTEM_PROMPT,
        messages: [{ role: 'user', content: text.slice(0, 1000) }],
      }),
      signal: AbortSignal.timeout(8_000),
    })
    if (!res.ok) return 'unclear'
    const data = await res.json()
    const word: string = (data?.content?.[0]?.text ?? '').trim().toLowerCase()
    if (word === 'no_income_yet' || word === 'has_income') return word
    return 'unclear'
  } catch (err) {
    console.error('[abn-classifier]', err)
    return 'unclear'
  }
}
