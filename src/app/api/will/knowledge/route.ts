// Knowledge base management for the Learning tab: list entries, approve a draft
// (make it active so Will starts using it), edit, dismiss, delete, or add manually.
import { NextResponse } from 'next/server';
import { readJson } from '@/lib/will/http';
import { sessionValid } from '@/lib/will/auth';
import { getStore } from '@/lib/will/store';
import { extractKeywords } from '@/lib/will/knowledge';
import { KNOWLEDGE_SEED } from '@/lib/will/knowledge-seed';

export const dynamic = 'force-dynamic';

export async function GET() {
  if (!(await sessionValid())) return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  const all = await getStore().listKnowledge();
  return NextResponse.json({
    ok: true,
    drafts: all.filter((k) => k.status === 'draft'),
    active: all.filter((k) => k.status === 'active'),
    archived: all.filter((k) => k.status === 'archived'),
  });
}

export async function POST(req: Request) {
  if (!(await sessionValid())) return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  type KnowledgeBody = {
    action?: string; id?: string; question?: string; answer?: string; intent?: string;
    status?: string; overwrite?: boolean;
    entries?: Array<{
      intent?: string; question?: string; answer?: string; examples?: string[];
      keywords?: string[]; tags?: string[]; lang?: string; weight?: number;
    }>;
  };
  // readJson enforces the 64KB body ceiling (H9). This route parsed the body
  // raw and accepted an unbounded entries[] array, so the hardening item that
  // helper exists for had reached exactly one of the sixteen routes that needed
  // it. Knowledge entries also feed straight into the model prompt, so an
  // uncapped answer inflates the token cost of every reply that retrieves it.
  const parsed = await readJson<KnowledgeBody>(req);
  if ('error' in parsed) return NextResponse.json({ ok: false, error: parsed.error }, { status: parsed.code });
  const b = parsed.value;
  const store = getStore();
  switch (b.action) {
    case 'import_starter': {
      // One-click load of the bundled curated pack (KNOWLEDGE_SEED).
      //
      // Default (overwrite:false): idempotent add. Existing questions are
      // skipped, so it is safe to click twice, and it never touches an entry a
      // human has since edited in the CRM.
      //
      // Sync mode (overwrite:true): the seed file is the source of truth. An
      // existing question is UPDATED so its answer, examples, keywords and tags
      // match the seed, and a new one is added. This is what makes the workflow
      // "edit knowledge-seed.ts, deploy, click Sync" actually reach Will, whose
      // library lives in the DB, not in this file. Status and weight are left
      // exactly as they are, so a paused entry stays paused and manual entries
      // (a different question) are never removed.
      const status = b.status === 'draft' ? 'draft' : 'active';
      const overwrite = b.overwrite === true;
      const existing = await store.listKnowledge();
      const byQuestion = new Map(existing.map((k) => [(k.question || '').trim().toLowerCase(), k]));
      let imported = 0, updated = 0, skipped = 0;
      for (const e of KNOWLEDGE_SEED) {
        const q = e.question.trim();
        const key = q.toLowerCase();
        const hit = byQuestion.get(key);
        if (hit) {
          if (!overwrite) { skipped++; continue; }
          await store.updateKnowledge(hit.id, {
            intent: e.intent || hit.intent,
            examples: e.examples || [],
            answer: e.answer,
            keywords: e.keywords && e.keywords.length ? e.keywords : extractKeywords(q),
            tags: e.tags || [],
            lang: e.lang || 'en',
          });
          updated++;
          continue;
        }
        const row = await store.addKnowledge({
          intent: e.intent || q.slice(0, 60), question: q, examples: e.examples || [],
          answer: e.answer, keywords: e.keywords && e.keywords.length ? e.keywords : extractKeywords(q),
          tags: e.tags || [], lang: e.lang || 'en', weight: 1,
          status: status as 'active' | 'draft' | 'archived', source: 'mined',
        });
        byQuestion.set(key, row);
        imported++;
      }
      return NextResponse.json({ ok: true, imported, updated, skipped, total: KNOWLEDGE_SEED.length });
    }
    case 'import': {
      // Bulk load a curated knowledge pack (e.g. will_knowledge_seed.json).
      // Skips entries whose question already exists so re-running is safe.
      if (!Array.isArray(b.entries)) return NextResponse.json({ ok: false, error: 'entries[] required' }, { status: 400 });
      // AI-INJECT-01: arbitrary bulk-imported entries land as DRAFT for review by
      // default (they feed the model's prompt, so an unreviewed poisoned entry is
      // an injection risk). Only activate immediately if the caller opts in.
      const status = b.status === 'active' ? 'active' : 'draft';
      const existing = await store.listKnowledge();
      const seen = new Set(existing.map((k) => (k.question || '').trim().toLowerCase()));
      let imported = 0, skipped = 0;
      for (const e of b.entries) {
        const q = (e.question || '').trim();
        const a = (e.answer || '').trim();
        if (!q || !a) { skipped++; continue; }
        if (seen.has(q.toLowerCase())) { skipped++; continue; }
        await store.addKnowledge({
          intent: e.intent || q.slice(0, 60),
          question: q,
          examples: Array.isArray(e.examples) ? e.examples : [],
          answer: a,
          keywords: Array.isArray(e.keywords) && e.keywords.length ? e.keywords : extractKeywords(q),
          tags: Array.isArray(e.tags) ? e.tags : [],
          lang: e.lang || 'en',
          weight: typeof e.weight === 'number' ? e.weight : 1,
          status: status as 'active' | 'draft' | 'archived',
          source: 'mined',
        });
        seen.add(q.toLowerCase());
        imported++;
      }
      return NextResponse.json({ ok: true, imported, skipped });
    }
    case 'approve': if (b.id) await store.setKnowledgeStatus(b.id, 'active'); break;
    case 'dismiss': if (b.id) await store.setKnowledgeStatus(b.id, 'archived'); break;
    case 'delete':  if (b.id) await store.deleteKnowledge(b.id); break;
    case 'edit':
      if (b.id) {
        const patch: Record<string, unknown> = {};
        if (typeof b.answer === 'string') patch.answer = b.answer.slice(0, 4000);
        if (typeof b.question === 'string') { patch.question = b.question; patch.keywords = extractKeywords(b.question); }
        if (typeof b.intent === 'string') patch.intent = b.intent;
        await store.updateKnowledge(b.id, patch);
      }
      break;
    case 'add':
      if (b.question && b.answer) {
        await store.addKnowledge({
          intent: b.intent || b.question.slice(0, 60), question: b.question, examples: [],
          answer: b.answer.slice(0, 4000), keywords: extractKeywords(b.question), tags: [], lang: 'en',
          weight: 1, status: 'active', source: 'manual',
        });
      }
      break;
    default: return NextResponse.json({ ok: false, error: 'unknown action' }, { status: 400 });
  }
  return NextResponse.json({ ok: true });
}
