// src/lib/translate.ts
// ──────────────────────────────────────────────────────────────────────────
// Section 4 of the role doc: for German- and Japanese-speaking clients,
// messages are translated into natural, native-sounding language — not a
// literal, robotic translation. Originally done by a human rep pasting
// into a search engine; this automates that exact step.
//
// GUARDRAIL: unlike the classifiers elsewhere in this codebase, this DOES
// generate the text the client reads — but only as a translation of our
// own already-approved English script. It is never given a free hand to
// decide what to say, only how to say the same fixed message naturally.
// URLs, prices, and emoji are preserved exactly as instructed.
// ──────────────────────────────────────────────────────────────────────────

const JAPANESE_SYSTEM_PROMPT = `Translate the given English WhatsApp message into natural, native-level Japanese, as a young native Japanese speaker would actually text a friend — not a stiff, literal, textbook translation.

Rules:
- Translate ONLY what is given. Never add information, never answer questions, never change the meaning.
- Keep all URLs, dollar amounts, and emoji exactly as they appear in the original — do not translate or alter them.
- Keep the same line breaks / message structure.
- Output ONLY the Japanese translation, nothing else — no notes, no romaji, no explanation.`

const GERMAN_SYSTEM_PROMPT = `Translate the given English WhatsApp message into natural, native-level German, as a young native German speaker would actually text a friend — casual and warm, not stiff or overly formal (use "du", not "Sie").

Rules:
- Translate ONLY what is given. Never add information, never answer questions, never change the meaning.
- Keep all URLs, dollar amounts, and emoji exactly as they appear in the original — do not translate or alter them.
- Keep the same line breaks / message structure.
- Output ONLY the German translation, nothing else — no notes, no explanation.`

async function translate(systemPrompt: string, text: string): Promise<string> {
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
        system: systemPrompt,
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

/**
 * Translates one of our fixed scripts into natural Japanese. If anything
 * goes wrong (no API key, network error, empty response), falls back to
 * the original English text — sending the client an English message they
 * may need to translate themselves is a far better failure mode than
 * sending nothing, or blocking the whole conversation.
 */
export async function translateToNaturalJapanese(text: string): Promise<string> {
  return translate(JAPANESE_SYSTEM_PROMPT, text)
}

/** Same idea as translateToNaturalJapanese, for German. */
export async function translateToNaturalGerman(text: string): Promise<string> {
  return translate(GERMAN_SYSTEM_PROMPT, text)
}

// Unicode ranges for Hiragana, Katakana, and CJK (kanji) — enough to
// reliably flag "this message is in Japanese" without a full language
// detection library. Cheap and free — no API call.
const JAPANESE_PATTERN = /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]/

export function looksJapanese(text: string): boolean {
  return JAPANESE_PATTERN.test(text)
}

// German uses the Latin alphabet, so there's no unique script to detect
// the way Japanese has. This is a lightweight, free heuristic (umlauts /
// ß, or a handful of very common German words) rather than an AI call on
// every single message — good enough to catch the vast majority of real
// German messages from backpackers texting casually, without adding
// latency or cost to every English message (which is most of them).
const GERMAN_PATTERN = /[äöüß]|\b(ich|und|nicht|danke|bitte|hallo|wann|kann|habe|mein|meine|ist das|wie geht|guten tag)\b/i

export function looksGerman(text: string): boolean {
  return GERMAN_PATTERN.test(text)
}
