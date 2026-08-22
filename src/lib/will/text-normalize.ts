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

// ============================================================
// Owner rule: Will's messages use at most ONE emoji, and only in the very first
// message of a conversation (a light opening greeting). Every message after that
// carries none. A wall of emojis reads as a bot/spam; a single warm one at hello
// reads as a person. This is enforced deterministically, not left to the model.
// ============================================================
// Matches a full emoji, including skin-tone modifiers and ZWJ sequences, plus a
// following variation selector or keycap, so a multi-codepoint emoji is removed
// whole rather than leaving orphaned selector characters behind.
const EMOJI = /[0-9#*]️?⃣|\p{Regional_Indicator}\p{Regional_Indicator}|\p{Extended_Pictographic}(?:️|[\u{1F3FB}-\u{1F3FF}])?(?:‍\p{Extended_Pictographic}(?:️|[\u{1F3FB}-\u{1F3FF}])?)*/gu;

/**
 * Enforce the emoji rule on Will-generated text.
 * @param allowOne when true (the opening message only) the FIRST emoji is kept
 *        and the rest removed; when false every emoji is removed.
 */
export function limitEmojis(input: string | null | undefined, allowOne: boolean): string {
  if (!input) return input ?? '';
  let seen = 0;
  const src = String(input);
  let s = src.replace(EMOJI, (m: string, offset: number) => {
    seen += 1;
    if (allowOne && seen === 1) return m;
    // People use an emoji as a sentence break ("understand 😊 Just make sure").
    // Simply deleting it jams the two sentences into a run-on ("understand Just").
    // If the emoji had whitespace on both sides, a letter/number before it with no
    // sentence punctuation, and an uppercase letter after it, drop a full stop in
    // its place so the sentences stay separated.
    const beforeRaw = src.slice(0, offset);
    const afterRaw = src.slice(offset + m.length);
    const spacedBoth = /\s$/.test(beforeRaw) && /^\s/.test(afterRaw);
    const prev = beforeRaw.replace(/\s+$/, '').slice(-1);
    const next = afterRaw.replace(/^\s+/, '').slice(0, 1);
    if (spacedBoth && /[A-Za-z0-9)]/.test(prev) && !/[.!?,:;]/.test(prev) && /[A-Z]/.test(next)) {
      return '.';
    }
    return '';
  });
  // Tidy the gaps a removed emoji leaves (double spaces, a space before a comma).
  s = s
    .replace(/[ \t]{2,}/g, ' ')
    .replace(/ +([,.!?;:])/g, '$1')
    .replace(/(^|\n)[ \t]+/g, '$1')
    .replace(/[ \t]+(\n|$)/g, '$1')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
  return s;
}

// ============================================================
// Owner rule: address the customer by their FIRST name only, and only in the
// opening message, never in every follow-up. The model is already told this, but
// this is the deterministic backstop for when it slips.
// ============================================================
/** The first word of a name ("Daniel Haas" -> "Daniel"), trimmed. '' if none. */
export function firstNameOf(name: string | null | undefined): string {
  if (!name) return '';
  return String(name).trim().split(/\s+/)[0] ?? '';
}

const NAME_ESCAPE = /[.*+?^${}()|[\]\\]/g;

/** Remove the customer's first name where it is used to ADDRESS them (a leading
 *  greeting, a leading vocative, or a trailing ", Name"), leaving the rest of the
 *  sentence intact. Used on every message after the opening one. Conservative on
 *  purpose: it does not touch the name mid-sentence, only the address forms. */
export function stripNameAddress(input: string | null | undefined, firstName: string | null | undefined): string {
  if (!input || !firstName) return input ?? '';
  const n = firstName.trim().replace(NAME_ESCAPE, '\\$&');
  if (!n) return String(input);
  let s = String(input);
  // "Hi Daniel," / "Hey Daniel!" / "Hello Daniel" -> keep the greeting, drop name.
  s = s.replace(new RegExp('^(\\s*)(hi|hey|hello|hiya|dear)\\s+' + n + '\\b[\\s!,.]*', 'i'), '$1$2, ');
  // Leading vocative: "Daniel, ..." -> "..."
  s = s.replace(new RegExp('^(\\s*)' + n + '\\s*[,!]\\s*', 'i'), '$1');
  // Trailing vocative: "... , Daniel." / "... Daniel!" at the very end -> drop name.
  s = s.replace(new RegExp('[,\\s]+' + n + '\\b\\s*([.!?]*)\\s*$', 'i'), '$1');
  // Tidy the seams.
  s = s
    .replace(/[ \t]{2,}/g, ' ')
    .replace(/ +([,.!?;:])/g, '$1')
    .replace(/(^|\n)[ \t]+/g, '$1')
    .replace(/[ \t]+(\n|$)/g, '$1')
    .trim();
  return s;
}

/** Convenience: all owner text rules applied together, in the right order — strip
 *  dashes, cap emojis, then (on non-opening messages) remove the name as address.
 *  `firstName` is the customer's first name; omit it to skip the name rule. */
export function normaliseWillText(
  input: string | null | undefined,
  opts: { firstMessage: boolean; firstName?: string | null },
): string {
  let s = limitEmojis(stripDashes(input), opts.firstMessage);
  if (!opts.firstMessage && opts.firstName) s = stripNameAddress(s, opts.firstName);
  return s;
}
