// Ask Atlas (decision 016). Answers a question from the data passed in this
// request only. Read-only: this module never writes anything.
import { anthropicMessages } from '@/lib/will/llm-transport';
import { recordAiUsage } from '@/lib/will/ai-usage';
import { stripDashes } from '@/lib/will/text-normalize';
import type { MorningReport } from '@/lib/will/morning-report';

export const ATLAS_MAX_QUESTION = 500;

export const ATLAS_SYSTEM = [
  'You are Atlas, the internal assistant for the Working Holiday Tax CRM.',
  'Answer only from the DATA block in the user message. Do not use outside knowledge, the web, or guesses.',
  'If the answer is not in the DATA, say plainly that the data does not have it. Do not invent names, numbers or dates.',
  'Sources that are not connected yet (bank lines, payment amounts, ATO dates, Mia, Instagram, TikTok) are not in the DATA; say so when asked about them.',
  'The DATA covers the last 24 hours only. Say so when that matters to the answer.',
  'Reply in the same language as the question. Keep it short: a few sentences or a short list.',
  'Never use em dashes or en dashes.',
].join('\n');

/** The part of the report that goes to the model. Counts and the customers
 *  who are waiting or stuck. No TFN, passport, bank or address fields exist
 *  in the report, so none can be sent. */
export function atlasData(r: MorningReport) {
  const person = (p: MorningReport['waitingOnUs'][number]) => ({
    name: p.name, hoursWaiting: p.hours, lastMessage: p.preview, stage: p.stage,
  });
  return {
    windowHours: r.windowHours,
    generatedAt: r.generatedAt,
    newLeads: r.newLeads,
    paidInWindow: r.paid,
    lodgedInWindow: r.lodged,
    handledByWill: r.handledByWill,
    handledByTeam: r.handledByTeam,
    openTasks: r.openTasks,
    blockedTasks: r.blocked,
    waitingOnUs: r.waitingOnUs.map(person),
    stuckAfterPayment: r.stuckAfterPayment.map(person),
    notConnected: ['bank lines', 'payment amounts', 'ATO due dates', 'Mia (SVT)', 'Instagram', 'TikTok'],
  };
}

export type AskResult = { ok: true; answer: string } | { ok: false; error: string };

export async function askAtlas(question: string, report: MorningReport): Promise<AskResult> {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return { ok: false, error: 'not_configured' };
  const model = process.env.CLAUDE_MODEL ?? 'claude-sonnet-4-5';
  const body = JSON.stringify({
    model,
    max_tokens: 600,
    system: ATLAS_SYSTEM,
    messages: [{
      role: 'user',
      content: `DATA:\n${JSON.stringify(atlasData(report), null, 2)}\n\nQUESTION:\n${question}`,
    }],
  });
  let res: Response;
  try {
    res = await anthropicMessages({
      method: 'POST',
      signal: AbortSignal.timeout(20_000),
      headers: { 'x-api-key': key, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
      body,
    });
  } catch {
    return { ok: false, error: 'unavailable' };
  }
  if (!res.ok) return { ok: false, error: 'unavailable' };
  const data = await res.json();
  recordAiUsage('atlas', model, data);
  const text = (data.content as Array<{ type: string; text?: string }> | undefined)
    ?.filter((b) => b.type === 'text' && typeof b.text === 'string')
    .map((b) => b.text)
    .join('\n')
    .trim();
  if (!text) return { ok: false, error: 'empty' };
  return { ok: true, answer: stripDashes(text) };
}
