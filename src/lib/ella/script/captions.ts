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

/** Jo, Nov 23: one fixed place on every post, Instagram and TikTok, written in the caption by code. */
export const LOCATION_LINE = '\u{1F4CD} Sydney CBD'

export function finishCaption(text: string): string {
  const raw = String(text ?? '')
  const approved = new Set<string>(APPROVED_HASHTAGS)
  const tags = [...new Set((raw.match(/#[A-Za-z0-9_]+/g) ?? []).map(t => t.toLowerCase()))].filter(t => approved.has(t)).slice(0, LIMITS.hashtagsMax)
  const body = raw
    .replace(/#[A-Za-z0-9_]+/g, '')
    .replace(/Ella is an AI presenter\.?/gi, '')
    .split(DISCLAIMER).join('')
    .replace(/Check ato\.gov\.au for your situation\.?/gi, '')
    // The place line is added again below, once, so a caption finished twice never carries it twice.
    .split(LOCATION_LINE).join('')
    // Jo: never a full stop before an emoji (the emoji takes its place).
    .replace(/\.[ \t]*(?=\p{Extended_Pictographic})/gu, '')
    .split('\n').map(l => l.replace(/[ \t]+/g, ' ').trim())
    // Keep the writer's paragraphs (one empty line between them), drop stray empty lines.
    .join('\n').replace(/\n{3,}/g, '\n\n').trim()
  // How it reads on the apps (Jo): paragraphs, then the note, then the hashtags alone on the last line.
  return [body, LOCATION_LINE, FULL_DISCLAIMER, tags.join(' ')].filter(Boolean).join('\n\n')
}

/** Finishes both captions of a draft in place and returns it. */
export function finishCaptions<T extends Pick<ScriptDraft, 'captions'>>(d: T): T {
  if (d?.captions) {
    // Jo: the same caption and hashtags on Instagram and TikTok.
    d.captions.instagram = finishCaption(d.captions.instagram)
    d.captions.tiktok = d.captions.instagram
  }
  return d
}
