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
import { normaliseWillText, firstNameOf } from './text-normalize';

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
  /** 'queued' is Autopilot: the reply is final, but it waits
   *  AUTOPILOT_REPLY_DELAY_SECONDS before it is transmitted. 'sent' is kept for
   *  paths that must go out immediately. */
  kind: 'sent' | 'queued' | 'pending_approval' | 'human_task' | 'silent';
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

// ============================================================
// Owner rule: never repeat the payment request + bank details. Once Will has sent
// them, it does not send them again unless the customer explicitly asks for them.
// The customer already has them in the thread; repeating reads as pushy and robotic.
// ============================================================
// "Bank details are present" — the concrete, language-independent signals: the
// BSB, the account number, or the "Payment details" label.
const BANK_DETAILS_RE = /\b0?62\s?692\b|\b81049952\b|payment details|bank details|bankverbindung|振込先/i;
// A single line that is part of the bank block, to be removed on a repeat.
const BANK_LINE_RE = /\b0?62\s?692\b|\b81049952\b|payment details|account name\s*:|^\s*bsb\b|^\s*account\s*:|quick screenshot|once paid|bankverbindung|振込先|口座/i;
// The customer explicitly asking for payment / bank details (then repeating is fine).
const CUSTOMER_ASKED_PAYMENT_RE = /\b(bank|bsb|account|pay|payment|transfer|deposit|screenshot|where.*(send|pay)|how.*(pay|transfer)|remind|again|details)\b|振込|支払|口座|bezahl|überweis|kontonummer/i;

/** Remove only the bank-detail lines from a message, leaving any surrounding text
 *  (a greeting, an answer) intact. Used when the details were already sent and the
 *  customer did not ask for them again. */
export function stripBankBlock(text: string): string {
  return text
    .split('\n')
    .filter((line) => !BANK_LINE_RE.test(line.trim()))
    .join('\n')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

export async function runEngine(input: EngineInput): Promise<EngineOutcome> {
  const { ctx, history, mode, bank } = input;

  // Owner emoji + name rules: at most one emoji and the customer's first name,
  // BOTH only in the opening message. This is the opening message when Will has
  // not sent anything in this conversation yet.
  const firstMessage = !history.some((t) => t.role === 'assistant');
  const custFirstName = firstNameOf(ctx.name);

  // Bank-repeat suppression: if the bank details were already sent earlier AND the
  // customer is not asking for them right now, strip them from any repeat.
  const bankAlreadySent = history.some((t) => t.role === 'assistant' && BANK_DETAILS_RE.test(t.text));
  const lastCustomerText = [...history].reverse().find((t) => t.role === 'customer')?.text ?? '';
  const suppressBankRepeat = bankAlreadySent && !CUSTOMER_ASKED_PAYMENT_RE.test(lastCustomerText);
  const applyBankRule = (t: string): string =>
    suppressBankRepeat && BANK_DETAILS_RE.test(t) ? stripBankBlock(t) : t;

  const decision = await decide(ctx, history);

  if (decision.action === 'human_task') {
    // Jo's rule: even when Will has no ready-made answer — it chose to hand off,
    // or its confidence was too low to act — it should STILL give you a proposed
    // reply to work from, instead of an empty task. But a proposal made in this
    // situation is NEVER sent on its own, in ANY mode: it is always a draft that
    // waits for your approval. So this returns 'pending_approval' unconditionally
    // (never 'sent'), regardless of Approval vs Autopilot.
    //
    // The proposal still has to clear the Policy Guard. If the model's own draft
    // breaks a hard rule (a made-up price, a myGov walkthrough, a personal tax
    // determination, an "are you a bot" answer), it is NOT offered as a one-click
    // send — it falls through to a plain task for you to handle by hand.
    const draft = (decision.suggested_reply ?? '').trim();
    if (draft) {
      // Owner rules: no dashes ever, and at most one emoji (opening only). Applied
      // to the model's prose BEFORE placeholders are filled, so a URL/bank value
      // inserted afterwards keeps any hyphen it legitimately needs. Then strip a
      // repeated bank block if the details were already sent.
      const text = applyBankRule(
        fillPlaceholders(normaliseWillText(draft, { firstMessage, firstName: custFirstName }), bank),
      );
      if (text.trim()) {
      const verdict = policyGuard(text, {
        ...input.guard,
        state: ctx.state,
        paid: ctx.paid,
        estimateFromTeam: ctx.estimatedRefundCents,
        isApprovedTemplate: false,
      });
      if (verdict.allowed) {
        // Will may ALSO suggest which pipeline stage to move the customer to
        // (Jo's rule). It is only a suggestion, applied when Jo approves the
        // draft — the same server-side transition check as a normal reply, so
        // an illegal jump is dropped rather than proposed.
        const suggestedState = decision.new_state && decision.new_state !== ctx.state
          && canTransition(ctx.state, decision.new_state) ? decision.new_state : undefined;
        return {
          kind: 'pending_approval',
          replyText: text,
          newState: suggestedState,
          stateChanged: !!suggestedState,
          decision,
        };
      }
      }
    }
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
  // Owner rules (no dashes ever; at most one emoji, opening only) applied to the
  // model's prose before filling, so links and bank details are never mangled.
  // Then strip a repeated bank block if the details were already sent.
  const text = applyBankRule(
    fillPlaceholders(normaliseWillText(decision.reply_text, { firstMessage, firstName: custFirstName }), bank),
  );
  // If the whole reply was just a repeat of the bank details, there is nothing
  // left worth sending — stay silent rather than send an empty message.
  if (!text.trim()) return { kind: 'silent', decision };
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
    // ── DELIBERATE SILENCE IS NOT A FAULT ────────────────────────────────
    //
    // Four of the guard's rules do not mean "Will wrote something unsafe".
    // They mean "Will is not the one talking here, on purpose":
    //
    //   AI_PAUSED_FOR_CUSTOMER   you replied yourself, so you have the wheel
    //   CUSTOMER_OPTED_OUT       they asked to be left alone
    //   LEGACY_CHAT_AI_DISABLED  an imported chat, yours by policy
    //   KILL_SWITCH_ACTIVE       you switched everything off
    //
    // Raising a task for these was noise, and it grew with the thing Jo does
    // most: the moment he answers a chat himself, every "thanks!", "perfect"
    // and 👍 that follows opened an item for him to close. Found 27 Aug on
    // Chloe (+1 657 258 1938) — he replied at 14:45, she wrote "Perfect,
    // thanks again!" at 14:49, and that courtesy line became a task.
    //
    // There is nothing to hand over: the conversation is already his, and the
    // message is already in the chat where he is reading it. So Will simply
    // stays quiet, which is what these rules were asking for in the first
    // place. Anything else in the verdict — a price, a determination, a myGov
    // walkthrough — still raises the task exactly as before, including when it
    // appears ALONGSIDE one of these four.
    const NOT_A_FAULT = new Set([
      'AI_PAUSED_FOR_CUSTOMER', 'CUSTOMER_OPTED_OUT',
      'LEGACY_CHAT_AI_DISABLED', 'KILL_SWITCH_ACTIVE',
    ]);
    if (verdict.violations.every((v) => NOT_A_FAULT.has(v))) {
      return { kind: 'silent', decision };
    }
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
    // Autopilot no longer answers instantly: 'queued' parks the finished reply
    // and the scheduler sends it a few minutes later (Jo, 25 Aug).
    kind: resolveAiMode(mode) === 'FULL_AUTO' ? 'queued' : 'pending_approval',
    replyText: text,
    newState,
    stateChanged: !!newState,
    decision,
  };
}
