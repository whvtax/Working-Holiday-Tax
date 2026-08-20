// Simulator endpoint: the owner plays the customer. Runs the EXACT
// pipeline the real channel will use, with strict input validation
// (fail closed: unknown mode = SUPERVISED).
import { NextResponse } from 'next/server';
import { sessionValid } from '@/lib/will/auth';
import { handleIncoming } from '@/lib/will/service';
import { AiMode } from '@/lib/will/engine';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  if (!sessionValid()) return NextResponse.json({ ok:false, error:'unauthorized' }, { status:401 });
  let body: { text?: unknown; mode?: unknown };
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'bad json' }, { status: 400 }); }

  if (typeof body.text !== 'string' || !body.text.trim() || body.text.length > 4000) {
    return NextResponse.json({ error: 'text must be a non-empty string up to 4000 chars' }, { status: 400 });
  }
  const mode: AiMode = body.mode === 'FULL_AUTO' ? 'FULL_AUTO' : 'SUPERVISED';

  const result = await handleIncoming('simulator', body.text, mode, {
    name: 'Simulator Customer',
    flag: '🧪',
  });
  return NextResponse.json({
    outcome: result.outcome,
    customer: result.customer,
    pendingMessageId: result.pendingMessageId,
    usingMock: !process.env.ANTHROPIC_API_KEY,
  });
}
