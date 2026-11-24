/**
 * Word counting the way the bible counts: a spelled acronym such as A-B-N is
 * one word per letter (s9). Numbers written in digits count as one word but
 * are flagged, because Ella says numbers in words (s7).
 */

const ACRONYM = /^[A-Za-z](?:-[A-Za-z])+$/
const NUMBER_WORDS = /\b(zero|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety|hundred|thousand|million|percent|first|second|third|fourth|fifth|thirty-first)\b/i

export function tokens(text: string): string[] {
  return text
    .replace(/[“”"“”]/g, ' ')
    .split(/\s+/)
    .map(t => t.replace(/^[^\w$#]+|[^\w%]+$/g, ''))
    .filter(Boolean)
}

export function countWords(text: string): number {
  let n = 0
  for (const t of tokens(text)) n += ACRONYM.test(t) ? t.split('-').length : 1
  return n
}

export function hasNumber(text: string): boolean {
  return /\d/.test(text) || NUMBER_WORDS.test(text)
}

export function sentences(text: string): string[] {
  return text.split(/(?<=[.?!])\s+/).map(s => s.trim()).filter(Boolean)
}

export const wpm = (words: number, seconds: number) => (seconds > 0 ? (words / seconds) * 60 : Infinity)

/** Lower-case, spelled acronyms joined, punctuation dropped: for matching a key term. */
export function norm(text: string): string {
  return text
    .toLowerCase()
    .replace(/\b([a-z])-(?=[a-z]\b)/g, '$1')
    .replace(/[^a-z0-9$% ]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

/** Plain-text grounding check: is this blog line really in the article? */
export function containsLine(haystack: string, line: string): boolean {
  const n = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, ' ').replace(/\s+/g, ' ').trim()
  const needle = n(line)
  return needle.length > 0 && n(haystack).includes(needle)
}

/** Curly quotes and apostrophes straightened, so word bans cannot be bypassed. */
export const straight = (text: string) => text.replace(/[‘’]/g, "'").replace(/[“”]/g, '"')

