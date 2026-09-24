// ============================================================
// WHY WILL HANDED THIS OVER (Jo, 24 Sep).
//
// A task used to carry a five-word headline and the customer's message. That
// says WHAT happened, never WHY, so the same handoff came back the next day.
// This block is written into the task context (and the Decision Log) at the
// moment Will gives up, in enough detail that a screenshot of the task is
// enough to fix the cause: add a Library answer, sharpen a rule, or accept
// that it is the team's call. Deterministic parts come from the engine (state,
// guard verdict, Library lookup); the model adds its own account in
// task_detail, which is for the owner only and never reaches a customer.
// ============================================================
import { describeViolation } from './send-errors';
import { KNOWLEDGE_THRESHOLD } from './knowledge';
import type { Decision } from './claude';

export interface DiagnosticInput {
  customerText: string;
  lang: string | null;
  state: string;
  paid: boolean;
  income: string;
  decision: Pick<Decision, 'action' | 'confidence' | 'task_reason' | 'task_detail'>;
  /** Library entries the engine handed to the model for this message. */
  knowledgeUsed: string[];
  /** The closest active entry when nothing passed the threshold. */
  nearest: { intent: string; score: number } | null;
  guardViolations?: string[];
  reviewNote?: string;
  /** The engine's own reason line when the model did not choose the handoff itself. */
  engineReason?: string;
}

export const DIAGNOSTIC_HEADER = 'Why Will handed this over';

export function buildHandoffDiagnostic(d: DiagnosticInput): string {
  const lines: string[] = [];
  lines.push(`${DIAGNOSTIC_HEADER}:`);
  lines.push(`• Customer (${d.lang ?? 'lang unknown'}, stage ${d.state}, ${d.paid ? 'paid' : 'not paid'}, income ${d.income}) wrote: "${d.customerText.trim().slice(0, 300)}"`);

  // Who decided, and how sure.
  const conf = typeof d.decision.confidence === 'number' ? ` (confidence ${Math.round(d.decision.confidence * 100)}%)` : '';
  if (d.guardViolations?.length) {
    lines.push(`• Will wrote a reply and the Policy Guard refused it${conf}: ${d.guardViolations.map((v) => `${v} = ${describeViolation(v)}`).join('; ')}.`);
  } else if (d.engineReason) {
    lines.push(`• The engine held it${conf}: ${d.engineReason}.`);
  } else {
    lines.push(`• Will chose not to answer${conf}: ${d.decision.task_reason ?? 'no reason given'}.`);
  }

  // Library.
  if (d.knowledgeUsed.length) {
    lines.push(`• Library: Will was given ${d.knowledgeUsed.length} matching answer${d.knowledgeUsed.length === 1 ? '' : 's'} (${d.knowledgeUsed.join(', ')}) and still handed over, so the gap is not a missing entry; it is the rule or the wording.`);
  } else if (d.nearest) {
    lines.push(`• Library: nothing matched. Nearest entry "${d.nearest.intent}" scored ${d.nearest.score.toFixed(2)} (needs ${KNOWLEDGE_THRESHOLD ?? 0.35}). If that entry is the right answer, add this phrasing to its examples; if not, this question has no Library answer yet.`);
  } else {
    lines.push('• Library: nothing matched at all, no entry shares a keyword with this message.');
  }

  if (d.reviewNote) lines.push(`• Reviewer: ${d.reviewNote}`);

  // The model's own account, already ending in a FIX: line when it followed the schema.
  const detail = (d.decision.task_detail ?? '').trim();
  if (detail) {
    lines.push(`• Will's account: ${detail}`);
  } else if (d.guardViolations?.length) {
    lines.push(`• FIX: the draft is attached; if the wording is fine, the rule that refused it is the thing to look at; if the rule is right, this is the team's call.`);
  } else {
    lines.push('• FIX: Will gave no detail. If this question should have an answer, add it to the Library in the customer\'s words.');
  }
  return lines.join('\n');
}

/** The task context = the customer's message, then the diagnostic block. The
 *  message stays first so the existing "what they wrote" rendering is unchanged. */
export function taskContextWithDiagnostic(customerText: string, diagnostic: string): string {
  return `${customerText}\n\n${diagnostic}`;
}
