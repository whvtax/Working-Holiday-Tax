// POST /api/atlas/ask (decision 016). Read-only. Requires a CRM session.
import { NextResponse } from 'next/server';
import { sessionValid } from '@/lib/will/auth';
import { loadMorningReport } from '@/lib/atlas/load-report';
import { askAtlas, cleanHistory, ATLAS_MAX_QUESTION } from '@/lib/atlas/ask';
import { runAtlasTool } from '@/lib/atlas/run-tool';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  if (!(await sessionValid())) return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ ok: false, error: 'bad_json' }, { status: 400 }); }
  const raw = (body as { question?: unknown } | null)?.question;
  const question = typeof raw === 'string' ? raw.trim() : '';
  if (!question || question.length > ATLAS_MAX_QUESTION) {
    return NextResponse.json({ ok: false, error: 'bad_question' }, { status: 400 });
  }
  const history = cleanHistory((body as { history?: unknown }).history);
  const report = await loadMorningReport();
  const result = await askAtlas(question, report, history, { runTool: runAtlasTool });
  if (!result.ok) return NextResponse.json(result, { status: result.error === 'not_configured' ? 503 : 502 });
  return NextResponse.json(result);
}
