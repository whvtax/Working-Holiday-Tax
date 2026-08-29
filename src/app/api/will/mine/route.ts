// Learning pipeline: POST real conversations, Will mines the questions customers
// ask and drafts polished professional answers (never copying raw wording), then
// stores them as DRAFT knowledge for you to review and approve in the Learning tab.
// Requires ANTHROPIC_API_KEY. Behind the CRM session.
import { NextResponse } from 'next/server';
import { sessionValid } from '@/lib/will/auth';
import { getStore } from '@/lib/will/store';
import { mineKnowledge } from '@/lib/will/claude';
import { extractKeywords } from '@/lib/will/knowledge';
import { isRateLimited } from '@/lib/rate-limit';
import { getClientIp } from '@/lib/get-ip';

export const dynamic = 'force-dynamic';
export const maxDuration = 300; // long-running mining

interface InMsg { role?: string; from?: string; sender?: string; text?: string; body?: string; message?: string }
interface InConv { messages?: InMsg[]; converted?: boolean; paid?: boolean }

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

export async function POST(req: Request) {
  if (!(await sessionValid())) return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ ok: false, error: 'ANTHROPIC_API_KEY not set — mining needs the model' }, { status: 400 });
  }
  // COST-03: mining fans out many paid model calls; cap how often it can run.
  if (await isRateLimited(getClientIp(req), 'will_mine', 5)) {
    return NextResponse.json({ ok: false, error: 'Mining was run too many times recently. Please wait a few minutes.' }, { status: 429 });
  }
  let payload: { conversations?: InConv[] };
  try { payload = await req.json(); } catch { return NextResponse.json({ ok: false, error: 'bad json' }, { status: 400 }); }
  const raw = Array.isArray(payload?.conversations) ? payload.conversations : [];
  if (raw.length === 0) return NextResponse.json({ ok: false, error: 'no conversations provided' }, { status: 400 });

  // Normalise many possible shapes into { messages:[{role,text}], converted }.
  // COST-03: cap conversations per request so total model time stays under
  // maxDuration; upload more in additional runs if needed.
  const conversations = raw.slice(0, 100).map((c) => ({
    converted: !!(c.converted ?? c.paid),
    messages: (Array.isArray(c.messages) ? c.messages : []).map((m) => {
      const who = (m.role ?? m.from ?? m.sender ?? '').toString().toLowerCase();
      const isCustomer = /cust|client|lead|user|in\b/.test(who) || who === '';
      return { role: isCustomer ? 'customer' : 'agent', text: (m.text ?? m.body ?? m.message ?? '').toString() };
    }).filter((m) => m.text.trim().length > 0),
  })).filter((c) => c.messages.length > 0);

  const mined = await mineKnowledge(conversations);

  // Dedupe against everything already stored, then persist as DRAFT for review.
  const existing = await getStore().listKnowledge();
  const seen = new Set(existing.map((e) => norm(e.question)));
  let stored = 0;
  for (const e of mined) {
    const key = norm(e.question);
    if (!key || seen.has(key)) continue;
    seen.add(key);
    await getStore().addKnowledge({
      intent: e.intent || e.question.slice(0, 60),
      question: e.question,
      examples: e.examples,
      answer: e.answer,
      keywords: e.keywords.length ? e.keywords : extractKeywords(`${e.question} ${e.examples.join(' ')}`),
      tags: e.tags,
      lang: e.lang || 'en',
      weight: 1,
      status: 'draft',
      source: 'mined',
    });
    stored++;
  }

  return NextResponse.json({ ok: true, conversations: conversations.length, mined: mined.length, stored });
}
