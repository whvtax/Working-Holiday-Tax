// ============================================================
// Owner rule (absolute): Will must NEVER use a dash of any kind in anything it
// writes. No matter what it decides to say, when, or how often — forever, zero
// dashes. Em/en dashes especially are the single clearest "written by a bot"
// tell, and the owner wants them gone from every message Will generates.
//
// This is applied to Will's OWN generated prose only — never to the owner's
// manual typing, and never to a filled-in URL or email address (removing a dash
// from a link would break it). URLs and emails are stashed out before the dash
// pass and restored afterwards.
// ============================================================

// Every Unicode dash/hyphen that could appear in generated text.
const DASH_CLASS =
  '\\u002D' + // hyphen-minus
  '\\u058A' + // armenian hyphen
  '\\u05BE' + // hebrew maqaf
  '\\u1806' + // mongolian todo soft hyphen
  '\\u2010\\u2011\\u2012\\u2013\\u2014\\u2015' + // hyphen … horizontal bar
  '\\u2043' + // hyphen bullet
  '\\u2212' + // minus sign
  '\\u2E3A\\u2E3B' + // two/three-em dash
  '\\uFE58\\uFE63\\uFF0D'; // small/full-width variants

const ANY_DASH = new RegExp('[' + DASH_CLASS + ']', 'g');
// Dash used as punctuation: whitespace on at least one side -> becomes a comma.
const PUNCT_DASH_TRAIL = new RegExp('\\s*[' + DASH_CLASS + ']+\\s+', 'g'); // "word — word"
const PUNCT_DASH_LEAD = new RegExp('\\s+[' + DASH_CLASS + ']+', 'g'); // "word —word"
// A dash opening a line (a bullet) -> removed entirely.
const LINE_LEAD = new RegExp('(^|\\n)[ \\t]*[' + DASH_CLASS + ']+[ \\t]*', 'g');
// Links and emails must survive untouched (a hyphen in a URL is load-bearing).
const PROTECT = /\bhttps?:\/\/[^\s]+|\bwww\.[^\s]+|\b[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}/g;
// Private-use sentinels: never occur in real chat text, so restoring cannot
// collide with a plain number the way a bare " 0 " placeholder would.
const STASH_OPEN = '';
const STASH_CLOSE = '';

/**
 * Remove every dash from Will-generated text, leaving natural punctuation.
 * Guaranteed post-condition: the result contains no character in DASH_CLASS
 * (outside a protected URL/email).
 */
export function stripDashes(input: string | null | undefined): string {
  if (!input) return input ?? '';
  let s = String(input);

  // 1) Stash URLs / emails so their hyphens are never touched.
  const stash: string[] = [];
  s = s.replace(PROTECT, (m) => {
    stash.push(m);
    return STASH_OPEN + (stash.length - 1) + STASH_CLOSE;
  });

  // 2) Bullet dash at the start of a line -> gone.
  s = s.replace(LINE_LEAD, '$1');
  // 3) Punctuation dash (spaced) -> comma.
  s = s.replace(PUNCT_DASH_TRAIL, ', ');
  s = s.replace(PUNCT_DASH_LEAD, ', ');
  // 4) Hard guarantee: any dash still standing (intra-word) -> space.
  s = s.replace(ANY_DASH, ' ');

  // 5) Tidy the seams left behind.
  s = s
    .replace(/[ \t]{2,}/g, ' ')
    .replace(/ +([,.!?;:])/g, '$1')
    .replace(/,\s*,/g, ',')
    .replace(/(^|\n)[ \t]+/g, '$1')
    .replace(/[ \t]+(\n|$)/g, '$1');

  // 6) Restore the protected links/emails.
  s = s.replace(new RegExp(STASH_OPEN + '(\\d+)' + STASH_CLOSE, 'g'), (_, i) => stash[Number(i)] ?? '');
  return s;
}
