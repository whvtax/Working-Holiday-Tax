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
  /** The second check's verdict on the draft, when it ran (service.ts, secondCheck). */
  secondCheck?: { verdict: string; note?: string };
  /** What Will would have needed to answer, when the caller knows. */
  missingFact?: string;
}

export const DIAGNOSTIC_HEADER = 'Why Will handed this over';

/** How many separate questions a customer message holds (question marks, plus
 *  question-style lines without one). Used to tell a multi-question message,
 *  where only the open point should go to the team, from a single question. */
export function countQuestions(text: string): number {
  const t = (text ?? '').trim();
  if (!t) return 0;
  const marks = (t.match(/[?？]/g) ?? []).length;
  if (marks > 0) return marks;
  const lines = t.split(/\n+/).filter((l) => /^(?:how|what|when|where|why|who|can|could|do|does|did|is|are|will|would|should)\b/i.test(l.trim()));
  return lines.length;
}

/** The named rule behind a handoff, in one short phrase for the owner. */
const NAMED_RULES: [RegExp, string][] = [
  [/master rule|not (?:completely )?confident/i, 'MASTER RULE (not confident)'],
  [/professional determination|residency|tax[- ]free threshold/i, 'professional determination (residency / tax position)'],
  [/refund|complaint|upset|angry/i, 'refund or complaint'],
  [/mygov/i, 'myGov troubleshooting'],
  [/conflicting instructions/i, 'conflicting instructions'],
  [/no approved answer|not in the library/i, 'no approved answer covers it'],
];

export interface HandoffWhy {
  rule: string;
  missingFact: string;
  secondCheck: string | null;
  guardCodes: string[];
  /** Several questions, Library answers available: a partial answer was possible. */
  partialPossible: boolean;
}

/** Deterministic "why Will did not answer": which rule, which missing fact,
 *  the second check's verdict, the guard code. Built only from what the
 *  engine and the model already hold, so it never needs a model call. */
export function explainWhyNot(d: DiagnosticInput): HandoffWhy {
  const guardCodes = d.guardViolations ?? [];
  const detail = (d.decision.task_detail ?? '');
  const engine = d.engineReason ?? '';
  let rule: string;
  if (guardCodes.length) rule = `Policy Guard (${guardCodes.join(', ')})`;
  else if (/^Model proposed invalid transition/i.test(engine)) rule = 'state machine (a jump the customer cannot confirm alone)';
  else if (/^Model proposed .* PAID but the customer did not/i.test(engine)) rule = 'payment is only the customer\'s report or a verified screenshot';
  else if (/^Second check held/i.test(engine)) rule = 'second check held the reply twice';
  else if (/\(paid\) wrote in and Will had nothing to say/i.test(engine)) rule = 'paid customers are never left in silence (Will chose to wait)';
  else if (engine) rule = `engine: ${engine.replace(/\.+$/, '').slice(0, 80)}`;
  else {
    const named = NAMED_RULES.find(([re]) => re.test(detail) || re.test(d.decision.task_reason ?? ''));
    if (named) rule = named[1];
    else if (typeof d.decision.confidence === 'number' && d.decision.confidence < 0.8) rule = `MASTER RULE (confidence ${Math.round(d.decision.confidence * 100)}% is under 80%)`;
    else rule = 'Will chose a handoff and named no rule';
  }

  let missingFact: string;
  if (d.missingFact) missingFact = d.missingFact;
  else if (d.knowledgeUsed.length) missingFact = 'none: the Library already covers it';
  else if (d.nearest) missingFact = `no Library answer (nearest "${d.nearest.intent}" scored ${d.nearest.score.toFixed(2)})`;
  else missingFact = 'no Library answer at all';

  let secondCheck: string | null = null;
  if (d.secondCheck) secondCheck = `${d.secondCheck.verdict}${d.secondCheck.note ? ` (${d.secondCheck.note.slice(0, 120)})` : ''}`;
  else if (/^Second check held/i.test(engine)) secondCheck = 'hold (twice)';
  else if (d.reviewNote && /second check|reviewer/i.test(d.reviewNote)) secondCheck = d.reviewNote.slice(0, 120);

  return {
    rule, missingFact, secondCheck, guardCodes,
    partialPossible: countQuestions(d.customerText) >= 2 && d.knowledgeUsed.length > 0,
  };
}

export function buildHandoffDiagnostic(d: DiagnosticInput): string {
  const lines: string[] = [];
  lines.push(`${DIAGNOSTIC_HEADER}:`);
  lines.push(`• Customer (${d.lang ?? 'lang unknown'}, stage ${d.state}, ${d.paid ? 'paid' : 'not paid'}, income ${d.income}) wrote: "${d.customerText.trim().slice(0, 300)}"`);

  // Who decided, and how sure.
  const conf = typeof d.decision.confidence === 'number' ? ` (confidence ${Math.round(d.decision.confidence * 100)}%)` : '';
  if (d.guardViolations?.length) {
    lines.push(`• Will wrote a reply and the Policy Guard refused it${conf}: ${d.guardViolations.map((v) => `${v} = ${describeViolation(v)}`).join('; ')}.`);
  } else if (d.engineReason) {
    lines.push(`• The engine held it${conf}: ${d.engineReason.replace(/\.+$/, '')}.`);
  } else {
    const firstSentence = (d.decision.task_detail ?? '').trim().split(/(?<=[.!?])\s/)[0]?.slice(0, 160);
    lines.push(`• Will chose not to answer${conf}: ${d.decision.task_reason ?? (firstSentence || 'no reason given')}.`);
  }

  // The four facts the owner needs to fix it, in one line.
  const why = explainWhyNot(d);
  lines.push(`• Why Will did not answer: rule = ${why.rule}; missing fact = ${why.missingFact}; second check = ${why.secondCheck ?? 'not run'}; guard code = ${why.guardCodes.length ? why.guardCodes.join(', ') : 'none'}.`);
  if (why.partialPossible) {
    lines.push(`• This message holds ${countQuestions(d.customerText)} questions and the Library covers at least one: the known parts could have been answered and only the open point handed over.`);
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
