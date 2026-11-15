// Ask Atlas (decision 016). Answers a question from the data passed in this
// request only. Read-only: this module never writes anything.
import { anthropicMessages } from '@/lib/will/llm-transport';
import { recordAiUsage } from '@/lib/will/ai-usage';
import { stripDashes } from '@/lib/will/text-normalize';
import type { MorningReport } from '@/lib/will/morning-report';

export const ATLAS_MAX_QUESTION = 1000;
export const ATLAS_MAX_HISTORY = 12;
export const ATLAS_MAX_TURN = 2000;

export type AtlasTurn = { role: 'user' | 'assistant'; content: string };

/** Keeps the last turns the client sent, trimmed, in strict user/assistant
 *  order, starting with a user turn. Anything malformed is dropped. */
export function cleanHistory(input: unknown): AtlasTurn[] {
  if (!Array.isArray(input)) return [];
  const out: AtlasTurn[] = [];
  for (const t of input.slice(-ATLAS_MAX_HISTORY)) {
    if (!t || typeof t !== 'object') continue;
    const role = (t as { role?: unknown }).role;
    const content = (t as { content?: unknown }).content;
    if (role !== 'user' && role !== 'assistant') continue;
    if (typeof content !== 'string' || !content.trim()) continue;
    const want = out.length === 0 ? 'user' : out[out.length - 1].role === 'user' ? 'assistant' : 'user';
    if (role !== want) continue;
    out.push({ role, content: content.trim().slice(0, ATLAS_MAX_TURN) });
  }
  // A trailing user turn would leave two user messages in a row; drop it.
  if (out.length && out[out.length - 1].role === 'user') out.pop();
  return out;
}

export const ATLAS_SYSTEM = [
  'You are Atlas, the assistant inside the Working Holiday Tax CRM. The team talks with you like a colleague.',
  'The DATA block in the latest user message is the only source of facts about customers, tasks and numbers. Earlier turns are conversation only; if they disagree with DATA, DATA wins.',
  'You may talk about anything in the system: what the numbers mean, what looks urgent or wrong, what to do next, and the trade-offs. When you give a view or a suggestion, say it is your judgement.',
  'Do not use outside knowledge, the web, or guesses. For general tax or visa questions that are not in the DATA, say you can only speak to the company data and that a registered tax agent should confirm.',
  'If the answer is not in the DATA, say plainly that the data does not have it. Do not invent names, numbers or dates.',
  'Sources that are not connected yet (bank lines, payment amounts, ATO dates, Mia, Instagram, TikTok) are not in the DATA; say so when asked about them.',
  'The DATA covers the last 24 hours only. Say so when that matters to the answer.',
  'You cannot change anything in the system. Atlas is read-only.',
  'Reply in the same language as the latest question. Talk the way a sharp colleague would in a chat: natural, direct, no headings, no boilerplate. Answer fully when the question needs it, and ask one short follow-up when you need to know more.',
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

export async function askAtlas(question: string, report: MorningReport, history: AtlasTurn[] = []): Promise<AskResult> {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return { ok: false, error: 'not_configured' };
  const model = process.env.CLAUDE_MODEL ?? 'claude-sonnet-4-5';
  const body = JSON.stringify({
    model,
    max_tokens: 1200,
    system: ATLAS_SYSTEM,
    messages: [
      ...history,
      {
        role: 'user',
        content: `DATA:\n${JSON.stringify(atlasData(report), null, 2)}\n\nQUESTION:\n${question}`,
      },
    ],
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
