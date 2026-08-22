// ============================================================
// The engine: incoming customer message -> model decision ->
// state-machine validation -> Policy Guard -> outcome.
// Two modes only:
//   SUPERVISED  = the assistant drafts, the owner approves every send
//   FULL_AUTO   = the assistant sends; anything unclear goes to a human
// ============================================================
import { decide, Decision, Turn } from './claude';
import { CustomerContext } from './playbook';
import { policyGuard, GuardContext } from './policy-guard';
import { canTransition, CustomerState } from './state-machine';
import { resolveAiMode, type AiMode } from './mode';

// One definition, in ./mode, used by everything that decides whether a message
// may leave without the owner. Re-exported so existing importers are unaffected.
export type { AiMode };

export interface EngineInput {
  ctx: CustomerContext;
  guard: Omit<GuardContext, 'state' | 'paid' | 'estimateFromTeam' | 'isApprovedTemplate'>;
  history: Turn[];
  mode: AiMode;
  bank: { bsb: string; account: string };
}

export interface EngineOutcome {
  kind: 'sent' | 'pending_approval' | 'human_task' | 'silent';
  replyText?: string;
  newState?: CustomerState;
  stateChanged?: boolean;
  invalidTransition?: boolean;
  task?: { reason: string; severity: string; suggestedReply?: string };
  guardViolations?: string[];
  decision: Decision;
}

export function fillPlaceholders(
  text: string,
  bank: { bsb: string; account: string },
  extra?: { amount?: string; reviewLink?: string; document?: string },
): string {
  let out = text
    .replaceAll('{{BSB}}', bank.bsb)
    .replaceAll('{{ACCOUNT}}', bank.account);
  if (extra?.amount) out = out.replaceAll('{{AMOUNT}}', extra.amount);
  if (extra?.reviewLink) out = out.replaceAll('{{REVIEW_LINK}}', extra.reviewLink);
  if (extra?.document) out = out.replaceAll('{{DOCUMENT}}', extra.document);
  return out;
}

export async function runEngine(input: EngineInput): Promise<EngineOutcome> {
  const { ctx, history, mode, bank } = input;

  const decision = await decide(ctx, history);

  if (decision.action === 'human_task') {
    return {
      kind: 'human_task',
      decision,
      task: {
        reason: decision.task_reason ?? 'Assistant requested handoff',
        severity: decision.task_severity ?? 'REVIEW',
        suggestedReply: decision.suggested_reply,
      },
    };
  }
  if (decision.action === 'wait' || !decision.reply_text) {
    return { kind: 'silent', decision };
  }

  // --- state transition validation (server-side; the model only proposes) ---
  let newState: CustomerState | undefined;
  let invalidTransition = false;
  if (decision.new_state && decision.new_state !== ctx.state) {
    if (canTransition(ctx.state, decision.new_state)) {
      newState = decision.new_state;
    } else {
      invalidTransition = true;
    }
  }

  // A reply that presupposes a rejected state must never be sent (audit finding).
  if (invalidTransition) {
    return {
      kind: 'human_task',
      decision,
      invalidTransition: true,
      task: {
        reason: `Model proposed invalid transition ${ctx.state} -> ${decision.new_state}; reply held for review`,
        severity: 'CONFLICT',
        suggestedReply: decision.reply_text,
      },
    };
  }

  // --- fill system-owned placeholders, then guard the final text ---
  const text = fillPlaceholders(decision.reply_text, bank);
  const guardCtx: GuardContext = {
    ...input.guard,
    state: ctx.state,
    paid: ctx.paid,
    estimateFromTeam: ctx.estimatedRefundCents,
    isApprovedTemplate: false,
  };
  // The payment-confirmation turn may mention onboarding although paid flips now;
  // only relax when the customer was NOT already paid (audit finding).
  if (newState === 'PAID' && !ctx.paid) guardCtx.paid = false;

  const verdict = policyGuard(text, guardCtx);
  if (!verdict.allowed) {
    return {
      kind: 'human_task',
      decision,
      guardViolations: verdict.violations,
      task: {
        reason: `Policy Guard blocked reply: ${verdict.violations.join(', ')}`,
        severity: 'URGENT',
        suggestedReply: text,
      },
      newState,
      stateChanged: false,
    };
  }

  // H5: a free-form reply in a language the deterministic guard cannot cover is
  // never auto-sent. In Autopilot it is held for one-click human approval; in
  // Approval mode it already awaits approval. State still advances on approval.
  if (verdict.unguardedLanguage && resolveAiMode(mode) === 'FULL_AUTO') {
    return { kind: 'pending_approval', replyText: text, newState, stateChanged: !!newState, decision };
  }

  // FAIL SAFE: only the exact string 'FULL_AUTO' transmits. This used to read
  // `mode === 'SUPERVISED' ? 'pending_approval' : 'sent'`, which sent on every
  // value that was not exactly 'SUPERVISED' — one wrong string in the settings
  // row would have put live replies on autopilot silently, while the follow-up
  // queue kept looking gated. See lib/will/mode.ts.
  return {
    kind: resolveAiMode(mode) === 'FULL_AUTO' ? 'sent' : 'pending_approval',
    replyText: text,
    newState,
    stateChanged: !!newState,
    decision,
  };
}
