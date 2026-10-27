/**
 * The one way Will calls the model (decision 004). For a Student Visa Tax
 * conversation the system prompt is rebranded (name, site, audience) and the
 * student rules are appended; for WHT the request goes out exactly as built.
 */
import { currentBrand } from './brand-context'
import { rebrandPrompt, SVT_PROMPT_ADDENDUM } from './brand-voice'

export const ANTHROPIC_MESSAGES_URL = 'https://api.anthropic.com/v1/messages'

type SystemBlock = { type: string; text?: string; [k: string]: unknown }

/** Exported for tests: the body as it will be sent for the current brand. */
export function brandBody(body: RequestInit['body']): RequestInit['body'] {
  const brand = currentBrand()
  if (brand !== 'svt' || typeof body !== 'string') return body
  let parsed: { system?: string | SystemBlock[] } & Record<string, unknown>
  try { parsed = JSON.parse(body) } catch { return body }
  if (typeof parsed.system === 'string') {
    parsed.system = rebrandPrompt(parsed.system, brand)
  } else if (Array.isArray(parsed.system)) {
    // Rebrand every text block; the student rules are appended once, to the
    // last block, so a cached first block stays a stable prefix per brand.
    const blocks = parsed.system
    const lastText = blocks.map((b, i) => (typeof b.text === 'string' ? i : -1)).filter(i => i >= 0).pop()
    parsed.system = blocks.map((b, i) => {
      if (typeof b.text !== 'string') return b
      const re = rebrandPrompt(b.text, brand)
      return { ...b, text: i === lastText ? re : re.replace(/\n\nSTUDENT VISA TAX \([\s\S]*$/, '') }
    })
  } else {
    parsed.system = SVT_PROMPT_ADDENDUM.trim()
  }
  return JSON.stringify(parsed)
}

export function anthropicMessages(init: RequestInit): Promise<Response> {
  const body = brandBody(init.body)
  return fetch(ANTHROPIC_MESSAGES_URL, body === init.body ? init : { ...init, body })
}
