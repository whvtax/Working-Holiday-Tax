// ============================================================
// SHORT PARAGRAPHS, ALWAYS (Jo, 23 Oct).
//
// "Any message with a fair amount of text must be split into paragraphs, not
// thrown at them as one block, in every language. How it looks matters even
// more than what it says." The playbook asks Will for it; this makes sure of
// it: a long block of prose is split at sentence ends into short paragraphs
// (two or three sentences each), with a blank line between them.
//
// Left alone: anything already in paragraphs that are short enough, anything
// with its own line structure (lists, bank details, a link on its own line),
// and Jo's approved messages (they are laid out already).
// ============================================================

/** Abbreviations whose full stop is not the end of a sentence. */
const ABBREV = /(?:^|[\s(])(?:e\.g|i\.e|etc|approx|vs|no|mr|mrs|ms|dr|st|z\.b|bzw|u\.a|d\.h|ca|ggf|inkl|evtl|nr|usw|z\.t|sr|jr|p\.s)\.$/i;

const CJK = /[぀-ヿ㐀-鿿＀-￯]/g;

function isCjk(text: string): boolean {
  const n = (text.match(CJK) ?? []).length;
  return n > text.length * 0.3;
}

/** Split one block of prose into sentences, keeping each sentence's own end. */
export function splitSentences(block: string): string[] {
  const out: string[] = [];
  let start = 0;
  for (let i = 0; i < block.length; i++) {
    const ch = block[i];
    if ('。！？'.includes(ch)) {
      // Japanese: the full-width stop ends the sentence; a closing bracket or
      // emoji straight after it stays with it.
      let j = i + 1;
      while (j < block.length && /[」』）)\s]|\p{Extended_Pictographic}/u.test(block[j])) j++;
      out.push(block.slice(start, j).trim());
      start = j;
      i = j - 1;
      continue;
    }
    if (ch === '.' || ch === '!' || ch === '?') {
      // Latin scripts: a stop (or several, or "?!"), optional closing quote or
      // emoji, then a space and a capital letter, a digit or an opening mark.
      let j = i + 1;
      while (j < block.length && /[.!?"'”’)]/.test(block[j])) j++;
      while (j < block.length && /\p{Extended_Pictographic}|️|‍/u.test(block[j])) j++;
      if (j >= block.length || !/\s/.test(block[j])) continue;
      let k = j;
      while (k < block.length && /\s/.test(block[k])) k++;
      if (k >= block.length) break;
      const next = block[k];
      if (!/[\p{Lu}\p{N}"“'¿¡(]|\p{Extended_Pictographic}/u.test(next)) continue;
      const before = block.slice(start, i + 1);
      if (ch === '.' && (ABBREV.test(before) || /\d\.$/.test(before) && /\d/.test(block[i + 1] ?? ''))) continue;
      // Inside a link: no sentence end.
      const lastSpace = before.lastIndexOf(' ');
      if (/https?:\/\//i.test(before.slice(lastSpace + 1))) continue;
      out.push(block.slice(start, j).trim());
      start = k;
      i = k - 1;
    }
  }
  const rest = block.slice(start).trim();
  if (rest) out.push(rest);
  return out.filter(Boolean);
}

/** Group sentences into short paragraphs. */
function regroup(sentences: string[], target: number, maxSentences: number, joiner: string): string[] {
  const paras: string[][] = [];
  let cur: string[] = [];
  let len = 0;
  for (const s of sentences) {
    if (cur.length > 0 && (len + s.length > target || cur.length >= maxSentences)) {
      paras.push(cur); cur = []; len = 0;
    }
    cur.push(s); len += s.length + 1;
  }
  if (cur.length) paras.push(cur);
  // A last paragraph of one very short sentence ("Any questions, just ask!")
  // reads fine on its own; one of a few words stuck to nothing does not.
  if (paras.length > 1) {
    const last = paras[paras.length - 1];
    if (last.length === 1 && last[0].length < 25) { paras[paras.length - 2].push(...last); paras.pop(); }
  }
  return paras.map((p) => p.join(joiner));
}

/**
 * Break any long block of prose into short paragraphs. Never changes a word,
 * only where the blank lines are.
 */
export function paragraphise(text: string): string {
  if (!text) return text;
  const cjk = isCjk(text);
  // How long a paragraph may run before it is split, and how long the new
  // ones aim to be. Japanese carries far more per character.
  const maxPara = cjk ? 110 : 260;
  const target = cjk ? 80 : 190;
  const maxSentences = cjk ? 2 : 3;
  const blocks = text.split(/\n{2,}/);
  const out = blocks.map((block) => {
    const b = block.trim();
    // Its own line structure (a list, bank details, a greeting line above
    // the body): already laid out, so it is left exactly as it is.
    if (b.includes('\n')) return block;
    if (b.length <= maxPara) return block;
    const sentences = splitSentences(b);
    if (sentences.length < 2) return block;
    // Japanese has no space between sentences; the Latin scripts do.
    return regroup(sentences, target, maxSentences, cjk ? '' : ' ').join('\n\n');
  });
  return out.join('\n\n');
}
