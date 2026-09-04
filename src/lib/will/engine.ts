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
import { claimsPayment } from './payment-claim';
import { professionalQuestionMessage } from './i18n';
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
   *  paths that must go out immediately. 'deferred' is never produced by the
   *  engine: the service returns it on Autopilot when NO reply was written yet,
   *  because the two-minute timer was armed instead (Jo, 3 Sep: wait first,
   *  then read everything the customer wrote, then answer once). */
  kind: 'sent' | 'queued' | 'pending_approval' | 'human_task' | 'silent' | 'deferred';
  replyText?: string;
  newState?: CustomerState;
  stateChanged?: boolean;
  invalidTransition?: boolean;
  task?: { reason: string; severity: string; suggestedReply?: string };
  guardViolations?: string[];
  /** Set by the reviewer pass in service.ts (second set of eyes): a short note
   *  on what it saw or changed. Stored on the message/task so the owner sees it. */
  reviewNote?: string;
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
// "THE BANK DETAILS ARE ACTUALLY HERE" — the numbers, nothing else.
//
// Audit, 4 Sep, and it was the worst bug in the file: this used to match the
// PHRASE "payment details" too, so an ordinary sentence promising them
// ("once you pick an option I'll send you the payment details") counted as the
// details having been sent. The very next message, the real price message with
// the BSB and the account number, was then treated as a REPEAT and stripped —
// so the customer was asked to pay and given no account to pay into.
//
// The account number and the BSB are language-independent and unambiguous, and
// they are the only thing that means the customer actually has what they need.
const BANK_DETAILS_RE = /\b0?62\s?692\b|\b81049952\b/;
// A single line that is part of the bank block, to be removed on a repeat.
// Every language Will speaks, because a German or Spanish repeat used to lose
// only the numbers and keep the sentence introducing them, leaving "Here are
// the payment details:" with nothing under it (audit, 4 Sep).
const BANK_LINE_RE = new RegExp([
  '\\b0?62\\s?692\\b', '\\b81049952\\b',
  // the labels, in every language
  'payment details', 'bank details', 'account name\\s*:', '^\\s*bsb\\b', '^\\s*account\\s*:',
  'zahlungsdetails', 'bankverbindung', 'kontoinhaber', 'kontonummer', '^\\s*blz\\b',
  'datos de pago', 'datos bancarios', 'titular de la cuenta', 'n[úu]mero de cuenta',
  'coordonn[ée]es bancaires', 'd[ée]tails de paiement', 'titulaire du compte', 'num[ée]ro de compte',
  'dati (?:di|per il) pagamento', 'dati bancari', 'intestatario', 'numero di conto',
  'dados (?:de|para o) pagamento', 'dados banc[áa]rios', 'titular da conta', 'n[úu]mero da conta',
  '振込先', '口座名義', '口座番号', '支店番号',
  // the closing line that belongs to the same block
  'quick screenshot', 'send us a screenshot', 'once paid', "once you['’]?ve made the payment",
  'sobald du bezahlt hast', 'schick(?:e)? uns (?:einfach )?(?:einen )?screenshot',
  'una vez (?:que )?(?:hayas )?pagado', 'env[íi]anos (?:una )?captura',
  'une fois (?:que tu as |le )?pay[ée]', 'envoie[- ]nous (?:une )?capture',
  'una volta (?:che hai )?pagato', 'mandaci (?:uno )?screenshot',
  'assim que (?:tiveres )?pago', 'envia[- ]nos (?:uma )?captura',
  'お支払い(?:が)?完了(?:し)?たら', 'スクリーンショット(?:を)?(?:送|お送り)',
  // The guarantee line belongs to the price message and goes with it. Left
  // behind, the "repeat" became a message consisting of nothing but the
  // guarantee, tacked onto a conversation that was about something else, which
  // is precisely what Jo banned on 3 Sep (audit, 4 Sep).
  'if your refund is less than', 'refund the difference', 'if you owe money to the ato',
  'wenn deine r[üu]ckerstattung', 'differenz', 'falls du dem ato',
  'si tu reembolso es (?:menor|inferior)', 'la diferencia', 'si le debes',
  'si ton remboursement est', 'la diff[ée]rence', 'si tu dois de l',
  'se il tuo rimborso [èe]', 'la differenza', 'se devi (?:dei soldi|pagare)',
  'se o teu reembolso for', 'a diferen[çc]a', 'se dever(?:es)? dinheiro',
  '還付(?:金|額)が.*少ない', '差額', 'ATOに.*支払う',
].join('|'), 'i');
// The customer explicitly asking for payment / bank details (then repeating is
// fine). English was covered; es/fr/it/pt/ja were not, so "Podes reenviar os
// dados bancários?" was read as NOT asking and the answer arrived with the
// numbers stripped out of it (audit, 4 Sep).
const CUSTOMER_ASKED_PAYMENT_RE = new RegExp([
  '\\b(?:bank|bsb|account|pay|payment|transfer|deposit|screenshot|remind|again|details)\\b',
  'where.*(?:send|pay)', 'how.*(?:pay|transfer)',
  'bezahl', '[üu]berweis', 'kontonummer', 'kontodaten', 'bankverbindung', 'wohin.*(?:geld|zahlen|überweisen)', 'zahlungsdetails',
  'pagar', 'pago', 'transferencia', 'cuenta', 'datos bancarios', 'datos de pago', 'ad[óo]nde.*(?:pago|enviar)', 'd[óo]nde.*pag',
  'payer', 'paiement', 'virement', 'compte', 'coordonn[ée]es bancaires', 'o[ùu].*(?:payer|envoyer)',
  'pagare', 'pagamento', 'bonifico', 'conto', 'dati bancari', 'dove.*(?:pago|pagare|inviare)',
  'pagar', 'pagamento', 'transfer[êe]ncia', 'conta', 'dados banc[áa]rios', 'onde.*(?:pago|pagar|enviar)',
  '振込', '支払', '口座', '送金', 'どこ(?:に|へ).*(?:払|振込|送金)',
].join('|'), 'i');

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
  // Everything the customer has written since WE last said anything, not only
  // their last line. On Autopilot a burst is answered as one message, so "hey,
  // one more thing / can you resend the bank details? / thanks!" hid the ask
  // behind the "thanks!" and the numbers were stripped out (audit, 4 Sep).
  let lastAssistantIdx = -1;
  for (let i = history.length - 1; i >= 0; i--) if (history[i].role === 'assistant') { lastAssistantIdx = i; break; }
  const burstSinceOurs = history.slice(lastAssistantIdx + 1).filter((t) => t.role === 'customer').map((t) => t.text);
  const customerBurst = burstSinceOurs.length
    ? burstSinceOurs.join('\n')
    : ([...history].reverse().find((t) => t.role === 'customer')?.text ?? '');
  const suppressBankRepeat = bankAlreadySent && !CUSTOMER_ASKED_PAYMENT_RE.test(customerBurst);
  const applyBankRule = (t: string): string =>
    suppressBankRepeat && BANK_DETAILS_RE.test(t) ? stripBankBlock(t) : t;

  const decision = await decide(ctx, history);

  if (decision.action === 'human_task') {
    // TYPE 2 (Jo, 31 Aug): a human_task is a PROBLEM that needs a person — a
    // handoff, low confidence, a refund/cancellation, something not in the
    // library. It is ALWAYS a manual task, in BOTH modes (Approval and
    // Autopilot). It is NEVER auto-sent and NEVER shown as a green "just
    // approve" reply, because that green lane is only for a confident normal
    // reply (type 1). Will still attaches its best draft to the task, so the
    // owner has one-click "Send Reply" to work from — but it stays a task.
    //
    // The attached draft is the cleaned, guard-passed version when it clears the
    // Policy Guard; if the draft breaks a hard rule it is left as the raw draft
    // for the owner to fix by hand.
    let suggestedReply: string | undefined = decision.suggested_reply;
    const draft = (decision.suggested_reply ?? '').trim();
    if (draft) {
      // Owner rules: no dashes ever, and at most one emoji (opening only). Applied
      // to the model's prose BEFORE placeholders are filled, so a URL/bank value
      // inserted afterwards keeps any hyphen it legitimately needs. Then strip a
      // repeated bank block if the details were already sent.
      const text = applyBankRule(
        fillPlaceholders(normaliseWillText(draft, { firstMessage, firstName: custFirstName }), bank),
      );
      // The CLEANED text either way. It used to fall back to the model's raw
      // prose when the guard refused it, so the draft in the task box could
      // carry three emojis, "Hi Daniel," on a non-opening turn and an unfilled
      // {{PLACEHOLDER}}, one click from being sent (audit, 4 Sep). The task
      // still says why the reply was held; what the owner sends is normalised.
      if (text.trim()) suggestedReply = text;
    }
    return {
      kind: 'human_task',
      decision,
      task: {
        reason: decision.task_reason ?? 'Assistant requested handoff',
        severity: decision.task_severity ?? 'REVIEW',
        suggestedReply,
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

  // A rejected state jump is not, by itself, a reason to hand a good reply to a
  // human (Jo, 31 Aug: "the answer is excellent, why did it become a task?").
  // The common case is a customer who runs ahead of the pipeline: at PRICE_SENT
  // they message "I've sent my form", and the model over-shoots to FORM_COMPLETE.
  // The state machine only walks one step at a time, so the jump is invalid, but
  // the warm holding reply ("got it, the team will get back to you") is perfectly
  // safe to send. So: DROP the invalid state change, keep the current valid
  // state, and let the reply go out normally through the guard below.
  //
  // The exception is a jump INTO a state that CONFIRMS something only we can
  // verify: money received (PAID), a signed return (SIGNED), a lodgement
  // (LODGED/COMPLETED). We must never let the customer's word alone flip those,
  // because the reply then falsely confirms payment or lodgement. Those stay a
  // human CONFLICT task exactly as before.
  const UNVERIFIABLE_CONFIRM_STATES: CustomerState[] = ['PAID', 'SIGNED', 'LODGED', 'COMPLETED'];
  if (invalidTransition && decision.new_state && UNVERIFIABLE_CONFIRM_STATES.includes(decision.new_state)) {
    return {
      kind: 'human_task',
      decision,
      invalidTransition: true,
      task: {
        reason: `Model proposed invalid transition ${ctx.state} -> ${decision.new_state}; reply held for review`,
        severity: 'CONFLICT',
        // Normalised, not raw: this is a one-click "Send Reply" (audit, 4 Sep).
        suggestedReply: applyBankRule(fillPlaceholders(normaliseWillText(decision.reply_text, { firstMessage, firstName: custFirstName }), bank)),
      },
    };
  }
  // Any other invalid jump is neutralised: the reply proceeds, the state does not
  // advance (newState stays undefined). invalidTransition is recorded on the
  // outcome for the audit trail but no longer forces a task.

  // A VALID jump into PAID is still the model's word, and the model's word is
  // not money. Jo's rule is "trust the CUSTOMER": the deterministic payment
  // claim (payment-claim.ts, every language) or a verified screenshot is what
  // moves someone to Paid, never a reply that happens to carry new_state PAID.
  // Audit, 3 Sep: a customer at PRICE_SENT asking "can I pay by card?" could be
  // answered "Perfect, thanks! Please fill out the form" with new_state PAID
  // and, on Autopilot, be moved to Paid, sent the form link and handed to the
  // team with no money received. So a proposed PAID with no payment report in
  // anything the customer wrote since our last message is held as a CONFLICT
  // task with the draft attached, exactly like an invalid jump into PAID.
  if (newState === 'PAID' && !ctx.paid) {
    let lastAssistant = -1;
    for (let i = history.length - 1; i >= 0; i--) if (history[i].role === 'assistant') { lastAssistant = i; break; }
    const sinceOurs = history.slice(lastAssistant + 1).filter((t) => t.role === 'customer');
    const burst = sinceOurs.length ? sinceOurs : history.filter((t) => t.role === 'customer').slice(-1);
    if (!burst.some((t) => claimsPayment(t.text))) {
      return {
        kind: 'human_task',
        decision,
        invalidTransition: true,
        task: {
          reason: `Model proposed ${ctx.state} -> PAID but the customer did not report a payment; reply held for review`,
          severity: 'CONFLICT',
          suggestedReply: applyBankRule(fillPlaceholders(normaliseWillText(decision.reply_text, { firstMessage, firstName: custFirstName }), bank)),
        },
      };
    }
  }

  // --- fill system-owned placeholders, then guard the final text ---
  // Owner rules (no dashes ever; at most one emoji, opening only) applied to the
  // model's prose before filling, so links and bank details are never mangled.
  // Then strip a repeated bank block if the details were already sent.
  // If the whole reply was just a repeat of the bank details, there is nothing
  // left worth sending — stay silent rather than send an empty message.
  if (!applyBankRule(
    fillPlaceholders(normaliseWillText(decision.reply_text, { firstMessage, firstName: custFirstName }), bank),
  ).trim()) return { kind: 'silent', decision };
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

  let text = applyBankRule(
    fillPlaceholders(normaliseWillText(decision.reply_text, { firstMessage, firstName: custFirstName }), bank),
  );
  let verdict = policyGuard(text, guardCtx);
  let rewriteNote: string | undefined;

  // ── TOO LONG IS NOT A REASON TO STOP (Jo, 4 Sep) ─────────────────────
  //
  // Helena (+44 7984, 4 Sep): a correct answer to "can your agent assess my
  // residency and the Addy case before lodging?" was refused for REPLY_TOO_LONG
  // and became a task. The answer itself was fine; it was an essay. Jo's rule:
  // before payment every such question gets the same short shape, three or
  // four lines that acknowledge what they wrote, say it is exactly what the
  // review covers, and end with the next step. So when length is the ONLY
  // fault, Will is asked once to rewrite the same answer short, and that
  // rewrite goes through the same guard. Only if that still fails does the
  // approved "we check that as part of the review" line (pre-payment) or a
  // task (post-payment) follow.
  const LENGTH_ONLY = new Set(['REPLY_TOO_LONG', 'AI_PAUSED_FOR_CUSTOMER', 'CUSTOMER_OPTED_OUT', 'LEGACY_CHAT_AI_DISABLED', 'KILL_SWITCH_ACTIVE']);
  if (!verdict.allowed && verdict.violations.includes('REPLY_TOO_LONG') && verdict.violations.every((v) => LENGTH_ONLY.has(v))) {
    const retry = await decide(ctx, history, {
      rewriteHint: `Your previous reply was refused because it was TOO LONG. Send the SAME answer again, rewritten to at most 3 short lines plus one closing line with the next step: a first line that shows you read what they wrote, one line that says it is exactly what our review covers (no explanation of how, no teaching, no examples, no dates, no second scenario, no list), then the next step for their current stage. Under 60 words. Keep the same language, action and new_state.\n\nPrevious reply, for reference only:\n"""\n${decision.reply_text.slice(0, 1500)}\n"""`,
      timeoutMs: 12_000,
    });
    if (retry.action === 'reply' && retry.reply_text) {
      const shorter = applyBankRule(
        fillPlaceholders(normaliseWillText(retry.reply_text, { firstMessage, firstName: custFirstName }), bank),
      );
      const shorterVerdict = policyGuard(shorter, guardCtx);
      if (shorter.trim() && shorterVerdict.allowed) {
        rewriteNote = 'Will\'s first draft was too long; he rewrote it short and that version went.';
        text = shorter;
        verdict = shorterVerdict;
      }
    }
  }

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

    // ── THE SAFE ANSWER INSTEAD OF A TASK (Jo, 3 Sep) ────────────────────
    //
    // Before payment, a customer asks the question every customer asks:
    // "so do you think I'll get money back?", "am I a resident?", "do I pay
    // Medicare?". The model sometimes answers it ("you can apply for a
    // Medicare Levy Exemption, which would save you around 2%"), the guard
    // stops it as a TAX_DETERMINATION, and Jo gets an URGENT task whose
    // right answer he already approved months ago: objection #7, "that is
    // exactly what we check as part of the review". So when the ONLY thing
    // wrong with a pre-payment reply is that it determined something (or was
    // long while doing so), Will sends #7 in the customer's language and the
    // chat keeps moving. Every other violation (an invented price, a refund
    // promise, a myGov walkthrough, a placeholder) is still a task: those
    // have no approved stand-in.
    // 4 Sep: the same stand-in also covers a pre-payment reply that is STILL
    // too long after the rewrite above. Jo: before payment the answer to any
    // detailed tax story is the same, "that is exactly what our review
    // covers", so a long draft is not worth a task either.
    const DETERMINATION_ONLY = new Set(['TAX_DETERMINATION', 'REPLY_TOO_LONG']);
    if (!ctx.paid
        && (verdict.violations.includes('TAX_DETERMINATION') || verdict.violations.includes('REPLY_TOO_LONG'))
        && verdict.violations.every((v) => DETERMINATION_ONLY.has(v) || NOT_A_FAULT.has(v))) {
      const safe = professionalQuestionMessage(ctx.lang);
      const safeVerdict = policyGuard(safe, guardCtx);
      if (safeVerdict.allowed) {
        return {
          kind: resolveAiMode(mode) === 'FULL_AUTO' ? 'queued' : 'pending_approval',
          replyText: safe,
          decision: { ...decision, reply_text: safe, new_state: undefined },
          guardViolations: verdict.violations,
          reviewNote: `Will's own draft was held (${verdict.violations.join(', ')}); the approved "we check that as part of the review" answer went instead.`,
          newState: undefined,
          stateChanged: false,
        };
      }
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

  // LANGUAGE NO LONGER HOLDS A GREEN REPLY (Jo, 1 Sep). A reply that passed the
  // guard is a "green" reply and, on Autopilot, sends on its own whatever the
  // language: English, German, Japanese, French, it makes no difference. This
  // used to hold every non-English reply for approval, because the guard's
  // lexical rules were English-only, so a clean foreign reply could not be
  // verified. The guard's MONEY rules (a refund figure, a non-fixed price, a
  // foreign-currency amount) are number/symbol based and already fire in every
  // language, and the phrase rules (refund-the-fee / out-of-pocket promise,
  // discounts) have been extended to the languages Will speaks, so a foreign
  // reply is now genuinely checked rather than merely held. `unguardedLanguage`
  // is still returned for the audit trail; it no longer gates the send.

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
    invalidTransition,
    decision: rewriteNote ? { ...decision, reply_text: text } : decision,
    reviewNote: rewriteNote,
  };
}
