// ============================================================
// The reviewer: a second set of eyes over Will's decision, on the SAME rules
// Will works by, as an extra layer of protection (Jo, 29 Aug).
//
// It runs on the hardest and most exposed moments:
//   - Full Auto: before an auto reply leaves, the reviewer passes over it. It
//     can quietly fix it, or HOLD it so a person looks instead of it going out.
//   - Approval: it hands back its own corrected draft, so the version waiting
//     for the owner's approval is already the improved one.
//   - Any human task: it checks Will's suggested reply and improves it, and
//     leaves a short note on what it saw.
//
// It never sends and never decides alone. In Approval mode the owner still
// approves; in Full Auto a HOLD downgrades the message to a draft for a person.
// And it sits ON TOP of the deterministic policy guard, which is the hard,
// non-AI safety net and is unchanged: the reviewer adds judgement (correctness,
// tone, risk), it does not replace the guard.
//
// Fail-OPEN by construction: no key, a timeout, a bad response, or any throw
// returns { verdict: 'pass' }, so a reviewer problem can only ever leave Will's
// original decision exactly as it was. It never blocks a customer reply.
// ============================================================
import { APPROVED } from './approved-messages';
import { CustomerRow } from './store';
import { Turn } from './claude';
import { stripDashes } from './text';

export interface ReviewInput {
  customer: CustomerRow;
  history: Turn[];
  /** Will's proposed reply, or the suggested reply on a human task. */
  draft: string;
  mode: 'SUPERVISED' | 'FULL_AUTO';
  /** True when reviewing a human task's suggested reply rather than an outbound reply. */
  isTask: boolean;
}

export interface ReviewResult {
  verdict: 'pass' | 'revise' | 'hold';
  /** Present when verdict is 'revise': the corrected message, ready to use. */
  revised?: string;
  /** A short note for the owner on what the reviewer saw or changed. */
  note?: string;
}

const PASS: ReviewResult = { verdict: 'pass' };

const REVIEW_TOOL = {
  name: 'review',
  description: 'Your verdict on Will\'s proposed message.',
  input_schema: {
    type: 'object',
    properties: {
      verdict: {
        type: 'string',
        enum: ['pass', 'revise', 'hold'],
        description:
          'pass: the message is correct, safe and well written, send/keep it as is. '
          + 'revise: it is basically right but you are improving it (a factual slip, a rule bent, clumsy tone, an em dash); provide the corrected message. '
          + 'hold: it should NOT go out automatically, a person must look (a refund or cancellation, a complaint, an angry or confused customer, a claim about their specific tax or refund before payment, anything you are not sure about).',
      },
      revised: {
        type: 'string',
        description: 'Required when verdict is "revise": the full corrected message to send instead, in the customer\'s language, ready to go. Never an em dash or en dash. Never a refund figure or tax advice before payment. Never negotiate the fixed fee.',
      },
      note: {
        type: 'string',
        description: 'One short line for the business owner: what you saw or changed, or why you held it. Plain, no fluff.',
      },
    },
    required: ['verdict'],
  },
} as const;

function reviewSystem(): string {
  const o = APPROVED.objections;
  return `You are the reviewer for "Will", the WhatsApp assistant of Working Holiday Tax, an Australian tax service for Working Holiday Makers (backpackers). You are the second set of eyes on a message Will is about to send, or has drafted for a human. Judge it against the rules below and return a verdict with the review tool only.

You are NOT the safety net of last resort. A deterministic guard already blocks hard violations. Your job is judgement the guard cannot do: is this factually right, within the rules, in the right tone, and safe to send without a person.

THE RULES WILL WORKS BY (the message must obey all of these):
- Prices are fixed: $220 for a TFN-only return, $385 when there is also ABN income. Payment is upfront. Never invent, discount, or negotiate a price.
- The guarantee applies to ALL customers (TFN and TFN + ABN): if the customer GETS a refund smaller than the fee, we refund the difference. It applies ONLY when there is an actual refund. If the customer owes tax or gets no refund, the fee is non-refundable: a message that promises to refund the fee to someone who owes, or tells them they are "never out of pocket", is WRONG and must be held or corrected.
- Before a customer has paid: never quote or estimate a refund figure, and never give personalised tax advice (residency, Medicare, deductions). This is a professional obligation. A draft that does this is a HOLD, not a revise.
- Never claim or imply the business itself is a registered tax agent. Returns are reviewed and signed off by a registered tax agent. Do not reword or strengthen that credential.
- Never say or imply Will is a bot or AI.
- Never an em dash or en dash. Use a comma, a full stop, or a hyphen.
- Giving the bank details or the payment request is CORRECT whenever the customer asks for them. A message like "what are the bank details", "how do I pay", or "coordonnées bancaires pour effectuer le paiement" IS the customer asking, so sending the details is a PASS. The only thing to avoid is repeating them UNPROMPTED in the very next message when nobody asked; if that happens it is at most a "revise" that trims the repeat, and NEVER a "hold". Providing details the customer just asked for is never a reason to hold.
- The customer's language: the reply must be in the language the customer is writing in.

WHAT A GOOD REPLY LOOKS LIKE (Will's approved voice, for reference, do not copy blindly):
- Opening: warm, asks whether they have TFN only or also ABN income.
- Pricing answered plainly with the fixed fee, no negotiation.
- "How much will I get back?" before payment: ${o.o1_refund_before_pay}
- "Is this legit / are you registered?": ${APPROVED.legitimacy}
- A professional tax question before payment: ${o.o7_professional_question}

HOW TO DECIDE:
- Most good messages are a "pass". Do not rewrite a message that is already correct and in voice just to put your fingerprint on it.
- "revise" is for a real improvement: a wrong or risky fact, a rule quietly bent, a clumsy or robotic tone, a stray em dash. Give the corrected message in "revised", finished and in the customer's language.
- "hold" is for anything that should not leave automatically: refunds and cancellations, complaints, an upset or badly confused customer, a message that gives tax advice or a refund figure before payment, or a case you are genuinely unsure about. In Full Auto a hold stops the auto-send and puts it in front of a person. A message that simply gives the customer information they asked for (the bank details, the form link, the fixed price, the next step) is NOT one of these: that is a pass. Reserve "hold" for a real safety or judgement call, not for tidiness.
- Be a little more willing to "hold" in Full Auto (nobody else is checking) and a little more willing to just "revise" in Approval mode (a person is about to look anyway).`;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const MODEL = () => process.env.CLAUDE_ASSISTANT_MODEL ?? 'claude-haiku-4-5';

/** History for the reviewer: recent turns, oldest first, bounded. */
function reviewMessages(input: ReviewInput) {
  const turns = input.history.filter((t) => t.text.trim().length > 0).slice(-16);
  const convo = turns.map((t) => `${t.role === 'customer' ? 'Customer' : 'Will'}: ${t.text}`).join('\n');
  const header = input.isTask
    ? 'Will could not confidently handle this and raised it for a person. Review the SUGGESTED REPLY it drafted.'
    : `Will is about to ${input.mode === 'FULL_AUTO' ? 'send this automatically' : 'propose this for the owner to approve'}. Review it.`;
  const body = [
    header,
    `Customer stage: ${input.customer.state}. Paid: ${input.customer.paid}. Language: ${input.customer.lang ?? 'unknown'}.`,
    '',
    'CONVERSATION (oldest first):',
    convo || '(no earlier messages)',
    '',
    'WILL\'S PROPOSED MESSAGE:',
    input.draft,
  ].join('\n');
  return [{ role: 'user' as const, content: body.slice(0, 16000) }];
}

/**
 * Review one draft. Never throws; returns { verdict: 'pass' } on any failure so
 * Will's original decision is used unchanged.
 */
export async function reviewDraft(input: ReviewInput): Promise<ReviewResult> {
  // DISABLED by default (Jo, 31 Aug): the second-eyes reviewer wrote an
  // unnecessary summary under every task and held too much in Autopilot. It is
  // now OFF unless explicitly turned on with WILL_REVIEWER=on. Will's own
  // decision is used as-is; the deterministic policy guard is unchanged and
  // still blocks hard violations before anything sends.
  if (process.env.WILL_REVIEWER !== 'on') return PASS;
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return PASS;
  if (!input.draft || !input.draft.trim()) return PASS;

  const body = JSON.stringify({
    model: MODEL(),
    max_tokens: 900,
    system: reviewSystem(),
    tools: [REVIEW_TOOL],
    tool_choice: { type: 'tool', name: 'review' },
    messages: reviewMessages(input),
  });

  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        signal: AbortSignal.timeout(20_000),
        headers: { 'x-api-key': key, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
        body,
      });
      if (res.status === 429 || res.status >= 500) {
        if (attempt === 0) { await sleep(300 + Math.random() * 300); continue; }
        return PASS;
      }
      if (!res.ok) return PASS;
      const data = await res.json();
      const tool = (data.content as Array<{ type: string; name?: string; input?: unknown }> | undefined)
        ?.find((b) => b.type === 'tool_use' && b.name === 'review');
      const out = tool?.input as { verdict?: unknown; revised?: unknown; note?: unknown } | undefined;
      if (!out || (out.verdict !== 'pass' && out.verdict !== 'revise' && out.verdict !== 'hold')) return PASS;
      const note = typeof out.note === 'string' && out.note.trim() ? stripDashes(out.note.trim()).slice(0, 300) : undefined;
      if (out.verdict === 'revise') {
        const revised = typeof out.revised === 'string' ? stripDashes(out.revised.trim()) : '';
        // A "revise" with no usable text is treated as pass, not as an empty send.
        if (!revised) return { verdict: 'pass', note };
        return { verdict: 'revise', revised: revised.slice(0, 4000), note };
      }
      return { verdict: out.verdict, note };
    } catch {
      if (attempt === 0) { await sleep(300 + Math.random() * 300); continue; }
      return PASS;
    }
  }
  return PASS;
}
