// The in-CRM copilot endpoint. The owner's chat on the Overview tab posts its
// conversation here; the tool-use loop in lib/will/assistant.ts reads the
// system, answers, and returns any action proposals for one-click approval.
//
// Read-and-propose only: this endpoint never mutates. When the owner presses a
// proposal button the client calls /api/will/actions, which is the single
// hardened, guarded, audited path for every owner action.
import { NextResponse } from 'next/server';
import { sessionValid } from '@/lib/will/auth';
import { readJson } from '@/lib/will/http';
import { runAssistant, AssistantTurn } from '@/lib/will/assistant';
import { getStore } from '@/lib/will/store';

export const dynamic = 'force-dynamic';

interface Body { messages?: { role?: string; text?: string }[] }

export async function POST(req: Request) {
  if (!(await sessionValid())) return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  // Same defence-in-depth CSRF check as the actions endpoint.
  const origin = req.headers.get('origin');
  if (origin) {
    try { if (new URL(origin).host !== new URL(req.url).host) return NextResponse.json({ ok: false, error: 'bad origin' }, { status: 403 }); }
    catch { /* malformed origin header: ignore */ }
  }
  const parsed = await readJson<Body>(req);
  if ('error' in parsed) return NextResponse.json({ ok: false, error: parsed.error }, { status: parsed.code });

  const raw = Array.isArray(parsed.value.messages) ? parsed.value.messages : [];
  const history: AssistantTurn[] = raw
    .map((m) => ({ role: m.role === 'assistant' ? 'assistant' as const : 'user' as const, text: String(m.text ?? '') }))
    .filter((m) => m.text.trim().length > 0)
    .slice(-24);
  if (history.length === 0) return NextResponse.json({ ok: false, error: 'no message' }, { status: 400 });

  try {
    const result = await runAssistant(history);
    try { await getStore().audit('owner', 'assistant_turn', { proposals: result.proposals.length, ok: result.ok }); } catch { /* non-fatal */ }
    return NextResponse.json(result);
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ ok: false, reply: 'Something went wrong on my side. Please try again.', proposals: [], detail: message.slice(0, 200) }, { status: 500 });
  }
}
