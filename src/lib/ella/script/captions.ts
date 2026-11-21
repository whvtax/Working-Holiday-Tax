/**
 * The caption finisher (plan v2): code, not the model, owns the fixed parts of
 * every caption, so they are always exactly right.
 *   - The disclaimer line is always the same and always present.
 *   - At most 4 hashtags, approved ones only, in their original order, on the
 *     last line.
 * The model writes the words people read; this function never changes them.
 */
import { APPROVED_HASHTAGS, DISCLAIMER, LIMITS } from './rules'
import type { ScriptDraft } from './types'

// Jo's rule: AI is marked only with the platform toggle, never in the caption.
export const FULL_DISCLAIMER = `${DISCLAIMER} Check ato.gov.au for your situation.`

export function finishCaption(text: string): string {
  const raw = String(text ?? '')
  const approved = new Set<string>(APPROVED_HASHTAGS)
  const tags = [...new Set((raw.match(/#[A-Za-z0-9_]+/g) ?? []).map(t => t.toLowerCase()))].filter(t => approved.has(t)).slice(0, LIMITS.hashtagsMax)
  const body = raw
    .replace(/#[A-Za-z0-9_]+/g, '')
    .replace(/Ella is an AI presenter\.?/gi, '')
    .split(DISCLAIMER).join('')
    .replace(/Check ato\.gov\.au for your situation\.?/gi, '')
    .split('\n').map(l => l.replace(/[ \t]+/g, ' ').trim()).filter(Boolean).join('\n')
  return [body, FULL_DISCLAIMER, tags.join(' ')].filter(Boolean).join('\n')
}

/** Finishes both captions of a draft in place and returns it. */
export function finishCaptions<T extends Pick<ScriptDraft, 'captions'>>(d: T): T {
  if (d?.captions) {
    d.captions.instagram = finishCaption(d.captions.instagram)
    d.captions.tiktok = finishCaption(d.captions.tiktok)
  }
  return d
}
