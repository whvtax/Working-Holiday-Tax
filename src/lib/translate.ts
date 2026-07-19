// src/lib/translate.ts
// ──────────────────────────────────────────────────────────────────────────
// Section 4 of the role doc: "For Japanese-speaking clients, messages are
// translated into natural, native-sounding Japanese — not a literal,
// robotic translation." Originally done by a human rep pasting into a
// search engine; this automates that exact step.
//
// GUARDRAIL: unlike the classifiers elsewhere in this codebase, this DOES
// generate the text the client reads — but only as a translation of our
// own already-approved English script. It is never given a free hand to
// decide what to say, only how to say the same fixed message naturally in
// Japanese. URLs, prices, and emoji are preserved exactly as instructed.
// ──────────────────────────────────────────────────────────────────────────

const SYSTEM_PROMPT = `Translate the given English WhatsApp message into natural, native-level Japanese, as a young native Japanese speaker would actually text a friend — not a stiff, literal, textbook translation.

Rules:
- Translate ONLY what is given. Never add information, never answer questions, never change the meaning.
- Keep all URLs, dollar amounts, and emoji exactly as they appear in the original — do not translate or alter them.
- Keep the same line breaks / message structure.
- Output ONLY the Japanese translation, nothing else — no notes, no romaji, no explanation.`

/**
 * Translates one of our fixed scripts into natural Japanese. If anything
 * goes wrong (no API key, network error, empty response), falls back to
 * the original English text — sending the client an English message they
 * may need to translate themselves is a far better failure mode than
 * sending nothing, or blocking the whole conversation.
 */
export async function translateToNaturalJapanese(text: string): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey || !text.trim()) return text

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
        max_tokens: 600,
        system: SYSTEM_PROMPT,
        messages: [{ role: 'user', content: text.slice(0, 2000) }],
      }),
      signal: AbortSignal.timeout(10_000),
    })
    if (!res.ok) {
      console.error('[translate] Anthropic API error', res.status)
      return text
    }
    const data = await res.json()
    const translated: string = (data?.content?.[0]?.text ?? '').trim()
    return translated || text
  } catch (err) {
    console.error('[translate]', err)
    return text
  }
}

// Unicode ranges for Hiragana, Katakana, and CJK (kanji) — enough to
// reliably flag "this message is in Japanese" without a full language
// detection library.
const JAPANESE_PATTERN = /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]/

export function looksJapanese(text: string): boolean {
  return JAPANESE_PATTERN.test(text)
}
