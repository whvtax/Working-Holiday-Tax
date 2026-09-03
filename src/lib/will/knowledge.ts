// ============================================================
// Knowledge retrieval (RAG). At answer time we pull the few most
// relevant learned Q&A entries and hand them to the model so it
// answers like your best agent — informed by real questions, in a
// polished approved voice. Lexical (keyword) scoring: no embedding
// key needed, upgradeable to pgvector later.
// ============================================================
import { getStore } from './store';
import { KnowledgeRow } from './store';
import { bridgeTokens } from './knowledge-i18n';

const STOP = new Set(('a an the and or but if of to in on for with is are am was were be been being do does did ' +
  'i you he she it we they me my your our their this that these those at as by from not no yes can could would ' +
  'should will just have has had how what when where why who which about please thanks thank hi hey hello ok okay').split(' '));

export function tokenize(text: string): string[] {
  return (text || '')
    .toLowerCase()
    .replace(/https?:\S+/g, ' ')
    .replace(/[^a-z0-9à-ÿÀ-￿ ]/gi, ' ')
    .split(/\s+/)
    .filter((w) => w.length >= 3 && !STOP.has(w));
}

export interface KnowledgeHit { intent: string; question: string; answer: string; score: number }

/** Score one entry against the message tokens (keyword overlap, weighted). */
function scoreEntry(k: KnowledgeRow, msgTokens: Set<string>): number {
  const bag = new Set<string>();
  for (const kw of k.keywords) tokenize(kw).forEach((t) => bag.add(t));
  tokenize(k.question).forEach((t) => bag.add(t));
  for (const ex of k.examples) tokenize(ex).forEach((t) => bag.add(t));
  let overlap = 0;
  for (const t of bag) if (msgTokens.has(t)) overlap++;
  if (overlap === 0) return 0;
  // Normalise by entry size so a huge entry doesn't always win; nudge by weight.
  return (overlap / Math.sqrt(bag.size || 1)) * (1 + Math.log10(1 + (k.weight || 1)));
}

/** Top-K active knowledge entries relevant to the customer's message. */
export async function retrieveKnowledge(message: string, opts?: { lang?: string; k?: number }): Promise<KnowledgeHit[]> {
  const k = opts?.k ?? 3;
  // The pack is indexed on English words. A German, Spanish, French, Italian,
  // Portuguese or Japanese message gains the English tokens its words stand
  // for (knowledge-i18n.ts), so it scores against the same entries an English
  // customer's would. Audit, 3 Sep: without this, DE 1/10, ES 2/10, JA 0/10
  // of the top questions found their learned answer.
  const tokens = new Set([...tokenize(message), ...bridgeTokens(message).flatMap((t) => (t.includes(' ') ? t.split(' ') : [t]))]);
  if (tokens.size === 0) return [];
  let entries: KnowledgeRow[];
  try {
    entries = await getStore().listKnowledge('active');
  } catch {
    return [];
  }
  const lang = opts?.lang;
  const scored = entries
    .filter((e) => !lang || e.lang === lang || e.lang === 'en') // prefer same language, fall back to en
    .map((e) => ({ e, score: scoreEntry(e, tokens) }))
    .filter((x) => x.score > 0.35) // relevance threshold
    .sort((a, b) => b.score - a.score)
    .slice(0, k);
  return scored.map(({ e, score }) => ({ intent: e.intent, question: e.question, answer: e.answer, score }));
}

/** Cheap keyword extractor for storing entries (used by the mining pipeline). */
export function extractKeywords(text: string, max = 12): string[] {
  const counts = new Map<string, number>();
  for (const t of tokenize(text)) counts.set(t, (counts.get(t) ?? 0) + 1);
  return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, max).map(([w]) => w);
}
