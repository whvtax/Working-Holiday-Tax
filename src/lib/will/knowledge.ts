// ============================================================
// Knowledge retrieval (RAG). At answer time we pull the few most
// relevant learned Q&A entries and hand them to the model so it
// answers like your best agent - informed by real questions, in a
// polished approved voice. Lexical (keyword) scoring: no embedding
// key needed, upgradeable to pgvector later.
// ============================================================
import { getStore } from './store';
import { KnowledgeRow } from './store';
import { bridgeTokens } from './knowledge-i18n';
import { currentBrand } from './brand-context';
import type { Brand } from '@/lib/brand';
import { isCourtesyLine, isThanksLine } from './text-normalize';

/** Decision 004, learning: one shared Library. An entry with no brand tag is
 *  for both assistants (everything learned so far, and everything learned
 *  from WHT chats). An entry learned from a Student Visa Tax chat carries the
 *  tag `brand:svt` and is used only for SVT; `brand:wht` works the same way.
 *  So Mia knows everything Will knows, plus what students taught her, and a
 *  student-only answer never reaches a WHT customer. */
export const BRAND_TAG_PREFIX = 'brand:';
export const brandTag = (b: Brand) => `${BRAND_TAG_PREFIX}${b}`;
export function usableFor(e: Pick<KnowledgeRow, 'tags'>, brand: Brand = currentBrand()): boolean {
  const tagged = (e.tags ?? []).filter((t) => t.startsWith(BRAND_TAG_PREFIX));
  return tagged.length === 0 || tagged.includes(brandTag(brand));
}

const STOP = new Set(('a an the and or but if of to in on for with is are am was were be been being do does did ' +
  'i you he she it we they me my your our their this that these those at as by from not no yes can could would ' +
  'should will just have has had how what when where why who which about please thanks thank hi hey hello ok okay ' +
  // 3 Nov: filler that carried a whole match on its own ("Thank you so much" pulled the pricing entry).
  'any some also there then here still again very really too well sure good morning afternoon ' +
  'evening great perfect cool nice sorry yeah yep nope get got let know see like want ' +
  // German, Spanish, French function words: they never name a topic, and without this
  // they inflate the message so a foreign question could not reach the threshold.
  'ich du er sie es wir ihr der die das den dem des ein eine einen einem einer und oder aber nicht kein keine ist sind war bin ' +
  'habe hat haben mein meine meinen mir mich auch noch schon dann dass ob wie wo wer was wenn mit von zu bei auf aus nach fur ' +
  'ist ja nein danke bitte hallo kann kannst konnen muss mussen soll sollen darf wurde werde wird gerade jetzt nur mal ' +
  'que los las del por con una uno para como pero muy mas yo mis ' +
  'les des une est pas pour dans que qui vous nous mon mes ').split(' '));

/** True for a kana / kanji / hangul character (scripts written without spaces). */
const CJK = /[぀-ヿ㐀-鿿가-힯]/;

export function tokenize(text: string): string[] {
  const clean = (text || '')
    .toLowerCase()
    .replace(/https?:\S+/g, ' ')
    .replace(/[^a-z0-9à-ÿÀ-￿ ]/gi, ' ');
  const out: string[] = [];
  for (const w of clean.split(/\s+/)) {
    if (!w) continue;
    if (!CJK.test(w)) {
      if (w.length >= 3 && !STOP.has(w)) out.push(w);
      continue;
    }
    // Japanese / Korean have no spaces, so a whole sentence used to be ONE token
    // that could never equal anything. Split each run of CJK characters into
    // overlapping pairs so a Japanese Library entry and a Japanese question
    // share tokens; Latin words glued to the run stay whole.
    const runs = w.match(/[぀-ヿ㐀-鿿가-힯]+|[^぀-ヿ㐀-鿿가-힯]+/g) ?? [];
    for (const r of runs) {
      if (CJK.test(r)) {
        if (r.length === 1) continue;
        // Pairs made only of hiragana are grammar (です, ます, たい, ませ): they
        // appear in every sentence and would match any Japanese entry.
        for (let i = 0; i + 1 < r.length; i++) {
          const pair = r.slice(i, i + 2);
          if (!/^[぀-ゟ]{2}$/.test(pair)) out.push(pair);
        }
      } else if (r.length >= 3 && !STOP.has(r)) out.push(r);
    }
  }
  return out;
}

export interface KnowledgeHit { intent: string; question: string; answer: string; score: number }

// ---- scoring -----------------------------------------------------------
// Old rule: overlap / sqrt(bag size). Two systematic failures (3 Nov audit):
//  1. A short question that names ONE specific word ("what is the password?")
//     lost to the size of the entry that contains it (0.30 against 0.35), while
//     a single COMMON word ("much", "so") on a tiny entry cleared the floor, so
//     small talk pulled answers.
//  2. Every shared word counted the same, so "claim", "pay" and "refund" (in a
//     third of the Library) outweighed the one word that identifies the entry.
// New rule: words are weighted by how rare they are across the Library (idf),
// and an entry scores on (a) how much of what the customer said it explains and
// (b) how much evidence, in rare-word terms, it shares. One rare word is enough;
// one common word never is. Scale kept: 0.35 floor, ~0.6 strong match.

/** Light English stemmer for matching only (stored keywords stay as written):
 *  lodged / lodging / lodgement / lodge, claims / claim, receipts / receipt. */
export function stem(t: string): string {
  if (t.length < 5 || CJK.test(t)) return t;
  let w = t;
  if (w.endsWith('ies') && w.length > 5) w = w.slice(0, -3) + 'y';
  else if (w.endsWith('ing') && w.length > 5) w = w.slice(0, -3);
  else if (w.endsWith('ed') && w.length > 4) w = w.slice(0, -2);
  else if (w.endsWith('es') && w.length > 5) w = w.slice(0, -2);
  else if (w.endsWith('s') && !w.endsWith('ss')) w = w.slice(0, -1);
  if (w.endsWith('ment') && w.length > 6) w = w.slice(0, -4);
  if (/([bdgmnprt])\1$/.test(w)) w = w.slice(0, -1); // submitt -> submit, plann -> plan
  if (w.endsWith('e') && w.length > 4) w = w.slice(0, -1);
  return w;
}
const stems = (text: string) => tokenize(text).map(stem);

interface Index { titles: Map<KnowledgeRow, Set<string>>; bags: Map<KnowledgeRow, Set<string>>; idf: Map<string, number>; n: number; meanIdf: number }

function buildIndex(entries: KnowledgeRow[]): Index {
  const bags = new Map<KnowledgeRow, Set<string>>();
  const titles = new Map<KnowledgeRow, Set<string>>();
  const df = new Map<string, number>();
  for (const k of entries) {
    const bag = new Set<string>();
    for (const kw of k.keywords ?? []) stems(kw).forEach((t) => bag.add(t));
    stems(k.question).forEach((t) => bag.add(t));
    for (const ex of k.examples ?? []) stems(ex).forEach((t) => bag.add(t));
    bags.set(k, bag);
    titles.set(k, new Set(stems(k.intent)));
    for (const t of bag) df.set(t, (df.get(t) ?? 0) + 1);
  }
  const n = Math.max(entries.length, 1);
  const idf = new Map<string, number>();
  for (const [t, d] of df) idf.set(t, Math.log(1 + n / d));
  let sum = 0;
  for (const v of idf.values()) sum += v;
  return { titles, bags, idf, n, meanIdf: idf.size ? sum / idf.size : 1 };
}

/** Weight of a message token: rare Library words count most, words the Library
 *  has never seen count a little (they are part of what was asked). */
const UNKNOWN_W = 1.2;
const BRIDGED_FACTOR = 0.85; // a bridged (translated) token is slightly less certain than a literal one

/** Evidence floor, in idf units: roughly "one word that appears in 3 or fewer
 *  entries, or two or three common ones". A single common word ("transfer",
 *  "refund", "claim") never pulls an answer on its own; one distinctive word
 *  ("password", "passport", "wise") does. */
const MIN_EVIDENCE = 2.2;
const MIN_EVIDENCE_SHORT = 3.4;
/** One typical content word (in about 7 of 150 entries) is worth 1.0. */
const IDF_UNIT = 3.0;

function scoreEntry(k: KnowledgeRow, msg: Map<string, number>, ix: Index): number {
  const bag = ix.bags.get(k) ?? new Set<string>();
  let evidence = 0, weighted = 0, total = 0, hits = 0;
  // A very short question ("what is the password?") has one distinctive word
  // and nothing else to go on, so that word may count for more than it can in a
  // long message, where one rare word shared by accident must not decide.
  const cap = msg.size <= 2 ? 1.6 : 1.0;
  for (const [t, f] of msg) {
    const idf = ix.idf.get(t);
    total += (idf ?? UNKNOWN_W) * f;
    if (!bag.has(t)) continue;
    hits++;
    evidence += (idf ?? 0) * f;
    weighted += Math.min(cap, Math.max(0.5, (idf ?? 0) / IDF_UNIT)) * f;
  }
  // One or two words is all the customer gave us: a single common word is not
  // a question ("Which transfer?", "Thank you so much"), so demand a distinctive one.
  if (hits === 0 || evidence < (msg.size <= 2 ? MIN_EVIDENCE_SHORT : MIN_EVIDENCE)) return 0;
  const coverage = evidence / total;
  // The entry's own title (its intent) is the most reliable statement of what it
  // answers: when the message says all of it ("pay after refund"), prefer it over
  // a neighbour that shares only some words.
  const title = ix.titles.get(k);
  let titleBonus = 1;
  if (title && title.size >= 2 && [...title].every((t) => msg.has(t))) titleBonus = 1.3;
  // Same shape as the old rule (overlap / sqrt(entry size), nudged by weight),
  // with rare words counting more than common ones and a mild reward for
  // explaining most of what was said.
  return (weighted / Math.pow(bag.size || 1, 0.45)) * (0.7 + 0.3 * coverage) * titleBonus * (1 + Math.log10(1 + (k.weight || 1)));
}

/** Words the shared bridge (knowledge-i18n.ts) does not carry yet, found in the
 *  3 Nov export. Same shape: foreign term -> English tokens the Library uses. */
const EXTRA_BRIDGE: Record<string, string[]> = {
  nach: ['after'], namen: ['name', 'account'], kontoname: ['account', 'name'], kontoinhaber: ['account', 'name'], empfanger: ['account', 'name', 'payee'], kontoauszug: ['bank', 'statement'], kontoauszuge: ['bank', 'statement'], kontoauszugen: ['bank', 'statement'],
  markieren: ['highlight'], markiert: ['highlight'], adresse: ['address'], telefonnummer: ['phone', 'number'], handynummer: ['phone', 'number', 'mobile'],
  onlinebanking: ['bank', 'login', 'access'], banking: ['bank'], australische: ['australian'], australischer: ['australian'], australischen: ['australian'], australisch: ['australian'],
  frist: ['deadline'], abgabefrist: ['deadline'], stichtag: ['deadline'], spat: ['late'], fertig: ['done'], dauert: ['long'], lange: ['long'],
  beinhaltet: ['include'], enthalten: ['include'], inklusive: ['include'], rechnung: ['invoices'], quittung: ['receipts'], beleg: ['receipts'],
  zuruck: ['back'], uberweisen: ['transfer', 'pay'], gutschrift: ['refund'], erhalte: ['receive'], bekomme: ['receive'], bekommen: ['receive'],
  plazo: ['deadline'], echeance: ['deadline'], scadenza: ['deadline'], prazo: ['deadline'],
};
const EXTRA_JA: [string, string[]][] = [
  ['電話番号', ['phone', 'number']], ['入金', ['arrive', 'money', 'account']], ['受け取', ['receive']], ['締め切り', ['deadline']], ['締切', ['deadline']], ['期限', ['deadline']],
  ['住所', ['address']], ['明細書', ['statement', 'bank']], ['取引明細', ['statement', 'bank']], ['ハイライト', ['highlight']], ['マーカー', ['highlight']],
  ['パートナー', ['partner']], ['夫', ['partner']], ['妻', ['partner']], ['彼氏', ['partner']], ['彼女', ['partner']], ['二人', ['two', 'both']], ['ワーホリ', ['working', 'holiday']],
  ['届かない', ['arrive']], ['届き', ['arrive']], ['SMS', ['sms', 'phone']], ['認証', ['verify', 'login']],
];
const deaccent = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ß/g, 'ss');

function extraBridge(message: string): string[] {
  const out: string[] = [];
  for (const [term, toks] of EXTRA_JA) if (message.includes(term)) out.push(...toks);
  for (const w of deaccent((message || '').toLowerCase()).replace(/[^a-z0-9 ]/g, ' ').split(/\s+/)) {
    const hit = EXTRA_BRIDGE[w] ?? EXTRA_BRIDGE[w.replace(/(en|es|er|n|s|e)$/, '')];
    if (hit) out.push(...hit);
  }
  return out;
}

function messageTokens(message: string): Map<string, number> {
  const m = new Map<string, number>();
  for (const t of stems(message)) m.set(t, 1);
  for (const b of [...bridgeTokens(message), ...extraBridge(message)].flatMap((t) => (t.includes(' ') ? t.split(' ') : [t])).map(stem)) {
    if (!m.has(b)) m.set(b, BRIDGED_FACTOR);
  }
  return m;
}

/** Split a message into its separate questions / statements so each can find its
 *  own entry. "Is the fee GST included? And can I pay after the refund?" is two
 *  questions; scored as one bag, the entry for one buried the other. */
export function splitQuestions(message: string): string[] {
  const parts = (message || '')
    .split(/[?？!！。\n]+|(?<=\.)\s+|\s+(?:and also|und auch|y tambien|et aussi)\s+|\s+(?:and|und|y|et)\s+(?=(?:can|could|do|does|is|are|will|what|when|how|why|where|which|kann|muss|ist|wie|was|wann|puedo|est)\b)/i)
    .map((p) => p.trim())
    .filter((p) => tokenize(p).length >= 1);
  return parts.length > 1 ? parts.slice(0, 4) : [];
}

/** Long digit strings in an answer (BSB, account and phone numbers; fees are
 *  shorter). Two entries that both give such numbers but not the same ones
 *  contradict each other (3 Nov: three different phone numbers and two payee
 *  details across the Library), and the model must not see both. */
export function contactNumbers(answer: string): Set<string> {
  const out = new Set<string>();
  const t = (answer || '').replace(/(\d)[ -](?=\d)/g, '$1');
  for (const m of t.matchAll(/\+?\d{6,13}/g)) out.add(m[0].replace(/^\+?61/, '0'));
  return out;
}
export function contradicts(a: string, b: string): boolean {
  const x = contactNumbers(a), y = contactNumbers(b);
  if (x.size === 0 || y.size === 0) return false;
  for (const n of x) if (y.has(n)) return false;
  return true;
}

/** Top-K active knowledge entries relevant to the customer's message. */
export async function retrieveKnowledge(message: string, opts?: { lang?: string; k?: number }): Promise<KnowledgeHit[]> {
  const k = opts?.k ?? 3;
  // The pack is indexed on English words. A German, Spanish, French, Italian,
  // Portuguese or Japanese message gains the English tokens its words stand
  // for (knowledge-i18n.ts), so it scores against the same entries an English
  // customer's would. Audit, 3 Sep: without this, DE 1/10, ES 2/10, JA 0/10
  // of the top questions found their learned answer.
  // A thank-you or other closing line asks nothing; it must not pull an answer.
  if (isCourtesyLine(message) || isThanksLine(message)) return [];
  const whole = messageTokens(message);
  if (whole.size === 0) return [];
  let entries: KnowledgeRow[];
  try {
    entries = (await getStore().listKnowledge('active')).filter((e) => usableFor(e));
  } catch {
    return [];
  }
  const lang = opts?.lang;
  const ix = buildIndex(entries);
  const pool = entries.filter((e) => !lang || e.lang === lang || e.lang === 'en'); // prefer same language, fall back to en
  const best = new Map<KnowledgeRow, number>();
  const rank = (tokens: Map<string, number>, floor: number) =>
    pool.map((e) => ({ e, score: scoreEntry(e, tokens, ix) })).filter((x) => x.score > floor).sort((a, b) => b.score - a.score);
  const ranked = rank(whole, KNOWLEDGE_THRESHOLD);
  for (const x of ranked) best.set(x.e, x.score);
  // Multi-part question: the best entry for EACH part gets a place before the
  // runners-up of the whole message do.
  const first: KnowledgeRow[] = [];
  const parts = splitQuestions(message);
  if (parts.length > 0) {
    for (const p of parts) {
      const top = rank(messageTokens(p), KNOWLEDGE_THRESHOLD)[0];
      if (!top) continue;
      if (!best.has(top.e) || best.get(top.e)! < top.score) best.set(top.e, Math.max(top.score, best.get(top.e) ?? 0));
      if (!first.includes(top.e)) first.push(top.e);
    }
  }
  const order = [...first.sort((a, b) => best.get(b)! - best.get(a)!), ...[...best.keys()].filter((e) => !first.includes(e)).sort((a, b) => best.get(b)! - best.get(a)!)];
  // Keep the better of two entries that give different bank or phone numbers.
  const kept: KnowledgeRow[] = [];
  for (const e of order) if (!kept.some((o) => contradicts(o.answer, e.answer))) kept.push(e);
  return kept.slice(0, k).map((e) => ({ intent: e.intent, question: e.question, answer: e.answer, score: best.get(e)! }));
}

/** The single closest active entry, with its score, even when it is below the
 *  live threshold. For the handoff diagnostic only (Jo, 24 Sep): "the nearest
 *  Library answer was X at 0.21, threshold 0.35" tells the owner whether the
 *  fix is a new entry or better keywords on an existing one. */
export async function nearestKnowledge(message: string, opts?: { lang?: string }): Promise<{ intent: string; question: string; score: number } | null> {
  if (isCourtesyLine(message) || isThanksLine(message)) return null;
  const tokens = messageTokens(message);
  if (tokens.size === 0) return null;
  let entries: KnowledgeRow[];
  try { entries = (await getStore().listKnowledge('active')).filter((e) => usableFor(e)); } catch { return null; }
  const lang = opts?.lang;
  const ix = buildIndex(entries);
  let best: { intent: string; question: string; score: number } | null = null;
  for (const e of entries) {
    if (lang && e.lang !== lang && e.lang !== 'en') continue;
    const score = scoreEntry(e, tokens, ix);
    if (score > 0 && (!best || score > best.score)) best = { intent: e.intent, question: e.question, score };
  }
  return best;
}
export const KNOWLEDGE_THRESHOLD = 0.3;

/** Cheap keyword extractor for storing entries (used by the mining pipeline). */
export function extractKeywords(text: string, max = 12): string[] {
  const counts = new Map<string, number>();
  for (const t of tokenize(text)) counts.set(t, (counts.get(t) ?? 0) + 1);
  return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, max).map(([w]) => w);
}
