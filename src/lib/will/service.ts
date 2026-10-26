// ============================================================
// Service layer: one entry point for an incoming customer
// message, shared by the simulator and the future WhatsApp
// webhook. Persists everything to the store.
// ============================================================
import { getStore, CustomerRow, CustomerState, Store, MessageRow, JobRow } from './store';
import { reopenTarget, POST_PAYMENT_STATES, canTransition } from './state-machine';
import { runEngine, AiMode, EngineOutcome, customerAskedSomething } from './engine';
import { CustomerContext } from './playbook';
import { Turn } from './claude';
import { reviewDraft } from './reviewer';
import { confirmationAlreadyOut } from './payment-confirmation';
import { paragraphise } from './layout';
import { policyGuard } from './policy-guard';
import { reconcileSchedule, abnAnswersPendingKey } from './scheduler';
import { detectLanguage, FORM_RECEIVED_MSG, PAYMENT_RECEIVED_MSG, REQUEST_ABN_MSG, HANDOFF_HOLDING_MSG, paymentReceivedMessage, paymentReceivedTemplateKey, isPaymentReceivedDraft, metaTemplateLang, handoffHoldingMessage, handoffHoldingTemplateKey } from './i18n';
import { retrieveKnowledge, nearestKnowledge } from './knowledge';
import { buildHandoffDiagnostic, taskContextWithDiagnostic } from './handoff-diagnostic';
import { deliverOut, fetchWaMedia, wasAlreadySentVerbatim } from './channel';
import { reviewLink } from './review-asks';
import { readReviewAsks, patchReviewAsk, saysRefundLanded, isPositiveAck, REFERRAL_WINDOW_DAYS, saysRefundNotYet, refundNotYetMessage, REFUND_CHECKIN_RETRY_DAYS } from './review-asks';
import { referralMessage } from './i18n';
import { autopilotReplyDelaySeconds } from './config';
import { promisedUntil, formPromisedKey, signaturePromisedKey } from './promised-date';
import { resolvePendingFormLinkOnNewCustomer } from './form-link';
import { isIdentityQuestion } from './identity-question';
import { detectChoice, priceMessageFor, firstContactPriceMessage, hasPriceIn, priceMessageIn } from './instant-choice';
import { hasForeignIncome } from './foreign-income';
import { abnIntakeKey, readIntake, ABN_INTAKE_DONE_RE, intakeSummary } from './abn-intake';
import { alreadyCheckedReason, applyCheckedClause } from './already-checked';
import { isAccountNameQuestion, accountNameMessage } from './account-name';
import { customerNotInterested, looksLikeVendor, salesPromisedKey } from './stage-sync';
import { firstNameOf, cleanFirstName, isCourtesyLine, isThanksLine, isClosingOnly, hasQuestionOrRequest, containsThanks } from './text-normalize';
// Moved to text-normalize.ts so the engine can use it too without importing this
// file (service.ts imports the engine; a static import back would be a cycle).
// Re-exported here because this is where every caller and test already looks.
export { isCourtesyLine };
import { suggestReply } from './suggest';
import { assessPaymentProofImage, assessSuccessConfirmationImage, describeAttachment, PaymentProofCheck } from './claude';
import { verifyProofDetails, isNotOurPayment, pictureConfirmsPayment, describeProof, incomeFromAmount } from './payment-proof';
import { sanitize } from './playbook';
import { claimsPayment } from './payment-claim';
import { DECISION_MODE_KEY, resolveDecisionMode, isFastLane, type DecisionMode } from './will-decides';
import { residencyQuizKey, readQuiz, quizStep, quizAgain, quizIntro, quizLang, startsQuiz, isResidencyCheck, CHECK_WINDOW_MS as QUIZ_CHECK_WINDOW_MS, type QuizState } from './residency-quiz';
import { isAfterPayment, foldDocumentDrop, documentDropCount, documentDropReason, isPaymentBurst } from './document-drop';
import { resolveAiMode, requiresApproval } from './mode';
import { aiBudgetExhausted } from './ai-budget';
import { bumpCounterUnavailable, lastPersistError as sbLastPersistError } from './store-supabase';
import { isLongComplicatedMessage, HANDOFF_ACK_DELAY_MS } from './long-message';

export interface HandleResult {
  outcome: EngineOutcome;
  customer: CustomerRow;
  pendingMessageId?: string;
}

// Opt-out (audit, 3 Sep). The old rule was `\bstop\b` anywhere, so "Can I stop
// my ABN and still get a refund?" opted a lead out for good: no reply, every
// follow-up cancelled, and "customer opted out" when Jo tried to answer. Now
// either an explicit phrase (any language Will speaks) anywhere in the
// message, or the bare word as the WHOLE message ("STOP", "Stopp.", "やめて").
const OPT_OUT_EXPLICIT = /\b(?:unsubscribe|opt ?out|stop (?:messaging|texting|contacting|writing to|sending)(?: me| messages)?|leave me alone|remove me|take me off|don'?t (?:message|text|contact|write to) me|no more messages|please stop (?:messaging|texting|contacting)(?: me)?)\b|\b(?:bitte )?(?:nicht mehr schreiben|keine nachrichten mehr|h[öo]r auf(?:,)? mir zu schreiben|schreib(?:t)? mir nicht mehr)|\bno me (?:escribas|escriban|contactes|mandes) (?:m[áa]s)|\bdejen? de (?:escribirme|contactarme|mandarme)|\barr[êe]te(?:z)? de m['’]?[ée]crire|\bne m['’]?[ée]cri(?:s|vez) plus|\bsmetti(?:la)? di scrivermi|\bnon scrivermi pi[ùu]|\bpar[ae]m? de me (?:mandar|escrever|contactar)|\bn[ãa]o me (?:escrevas|escrevam|contactes|mandes) mais|配信停止|もう連絡しないで|連絡しないでください|メッセージを止めて|送らないでください/i;
const OPT_OUT_BARE = /^\s*(?:stop|stopp|unsubscribe|basta|arr[êe]te|やめて|停止)\s*[.!]*\s*$/i;
export const isOptOut = (text: string) => OPT_OUT_EXPLICIT.test(text) || OPT_OUT_BARE.test(text);
const SALES_STATES: CustomerState[] = ['NEW_LEAD', 'QUALIFIED', 'PRICE_SENT', 'PAYMENT_PENDING'];

// Owner's rule: a burst of messages (or attachments) from the same customer
// must fold into ONE open task, not one per message — sending 3-4 messages
// in a row used to open 3-4 tasks, and 20 invoice photos opened 20. If a
// task is already open for this customer, its context grows with what just
// arrived (capped, so it never grows without bound) and its suggested reply
// is regenerated against everything sent so far rather than only the latest
// message. Only opens a new task when none is open yet.
const MAX_TASK_CONTEXT = 2000;
// Same order the dashboard sorts by (Dashboard.tsx SEV_RANK): URGENT is the
// most severe, then CONFLICT, then REVIEW, then anything else.
const SEVERITY_RANK: Record<string, number> = { URGENT: 0, CONFLICT: 1, REVIEW: 2 };
const severityRank = (s: string) => SEVERITY_RANK[s] ?? 3;
async function raiseOrUpdateTask(
  store: ReturnType<typeof getStore>,
  customer: Pick<CustomerRow, 'id' | 'name' | 'waId'>,
  opts: {
    reason: string; severity: string; newContext: string; suggestedReply: string | null;
    /**
     * Replace the growing transcript with something computed from it, rather
     * than appending to it. Used by the after-payment document drop, where the
     * useful context is "12 files received" and NOT twelve copies of
     * "📄 [Document]". Receives the open task's context, or null when this is
     * the first message of the burst.
     */
    fold?: (existing: string | null) => string;
    /** The reason line, when it depends on the folded context (a count). */
    reasonFor?: (context: string) => string;
    /**
     * (audit, 5 Sep) A folded caller passing `suggestedReply: null` used to wipe
     * out a perfectly usable draft the existing task already had — e.g. a
     * document-drop task with an acknowledgement drafted, folded into by an
     * unrelated null-reply caller, left with no draft and Send Reply disabled.
     * The one caller that MUST wipe it (the "are you a bot" question, which by
     * owner rule may never carry a draft even when it folds into a task that
     * had one) sets this flag; every other null just means "I have nothing new
     * to suggest", so the existing draft is kept.
     */
    forceNullSuggestedReply?: boolean;
  },
): Promise<void> {
  const existing = await store.findOpenTaskForCustomer(customer.id);
  if (existing) {
    const merged = opts.fold
      ? opts.fold(existing.context)
      : existing.context ? `${existing.context}\n---\n${opts.newContext}` : opts.newContext;
    const context = merged.length > MAX_TASK_CONTEXT ? merged.slice(merged.length - MAX_TASK_CONTEXT) : merged;
    const newReason = opts.reasonFor ? opts.reasonFor(context) : opts.reason;
    // (audit, 5 Sep) Folding a later message in used to overwrite severity and
    // reason unconditionally: a customer waiting on an URGENT "reply was not
    // delivered" task who then sent a photo got quietly downgraded to an amber
    // REVIEW headlined about the attachment, with the "they are waiting" reason
    // gone. Keep the more severe of the two, and when the reason actually
    // changes, keep the earlier one as a second line instead of dropping it
    // (reasonFor computes its own line from the full context already, so it is
    // left as-is).
    const reason = !opts.reasonFor && existing.reason && existing.reason !== newReason
      ? `${newReason}\n(earlier: ${existing.reason})`.slice(0, MAX_TASK_CONTEXT)
      : newReason;
    const severity = severityRank(existing.severity) <= severityRank(opts.severity) ? existing.severity : opts.severity;
    const suggestedReply = opts.suggestedReply !== null
      ? opts.suggestedReply
      : opts.forceNullSuggestedReply ? null : (existing.suggestedReply ?? null);
    await store.updateTask(existing.id, {
      reason,
      severity,
      context,
      suggestedReply,
    });
    return;
  }
  const fresh = opts.fold ? opts.fold(null) : opts.newContext;
  await store.addTask({
    customerId: customer.id, customerName: customer.name ?? customer.waId,
    reason: opts.reasonFor ? opts.reasonFor(fresh) : opts.reason,
    severity: opts.severity, context: fresh, suggestedReply: opts.suggestedReply,
  });
}

export async function getBank(): Promise<{ bsb: string; account: string }> {
  const store = getStore();
  const s = (await store.getSetting('bank_details')) as { bsb?: string; account?: string } | undefined;
  return { bsb: s?.bsb ?? '000-000', account: s?.account ?? '00000000' };
}

// H7: serialize all processing per customer so two rapid inbound messages can
// never interleave read-modify-write on the shared store (duplicate follow-ups,
// double state advance). In-process mutex; a shared store would use a row lock.
const chains = new Map<string, Promise<unknown>>();

/**
 * Run `fn` after everything else already queued for this customer.
 *
 * Extracted from handleIncoming so the payment-proof path can join the SAME
 * queue. It was outside it, and the gap is real: WhatsApp delivers a batch, so
 * a customer who sends the transfer screenshot and the PDF receipt one after
 * the other has both arrive together. Both read `customer.paid` as false before
 * either writes PAID, both pass the gate, and the customer is told "payment
 * received" twice, with the form link twice behind it.
 *
 * Every other inbound path has been serialised per customer since H7 for
 * exactly this reason. This is the one that was not.
 */
function queueForCustomer<T>(waId: string, fn: () => Promise<T>): Promise<T> {
  const prev = chains.get(waId) ?? Promise.resolve();
  const next = prev.catch(() => {}).then(fn);
  chains.set(waId, next.finally(() => { if (chains.get(waId) === next) chains.delete(waId); }));
  return next;
}

/** The customer just spoke, so the follow-up timer restarts from now, whatever
 *  else happened to the message (a task, a reopen, a budget stop). Best effort:
 *  the message is already stored and answered or escalated by the time this
 *  runs, so a scheduling error is audited, never thrown. */
async function restartCadence(store: Store, waId: string, fallback: CustomerRow): Promise<CustomerRow> {
  const fresh = await store.getCustomerByWaId(waId);
  if (fresh) {
    try { await reconcileSchedule(fresh); } catch (e) {
      await store.audit('scheduler', 'reconcile_failed_after_send', {
        customerId: fresh.id,
        error: e instanceof Error ? e.message.slice(0, 200) : String(e).slice(0, 200),
      }).catch(() => { /* the store is the likely thing that just failed */ });
    }
  }
  return fresh ?? fallback;
}

export function handleIncoming(
  waId: string,
  text: string,
  mode: AiMode,
  meta?: { name?: string; flag?: string; providerId?: string },
): Promise<HandleResult> {
  return queueForCustomer(waId, () => handleIncomingInner(waId, text, mode, meta));
}

// COST-01: the daily paid-AI ceiling now lives in ai-budget.ts, so a background
// job (the nightly lost-lead analysis) can spend against the SAME counter
// without importing this file — service.ts imports the scheduler, and the
// scheduler runs that job, so the import would close a cycle. Nothing about the
// budget changed: same setting, same key, same atomic function.
//
// Re-exported here because /api/will/system and the dashboard's cost card
// already import these three names from '@/lib/will/service'.
export {
  DEFAULT_AI_DAILY_BUDGET, aiCallsKeyPrefix, aiCallsKeyFor, resolveAiDailyBudget,
} from './ai-budget';

async function handleIncomingInner(
  waId: string,
  text: string,
  mode: AiMode,
  meta?: { name?: string; flag?: string; providerId?: string },
  // Set when the caller has ALREADY stored the inbound message (the image path:
  // handleInboundNote stored the photo, described it, and is now reusing this
  // reply pipeline with the description as `text`). We must not store a second
  // message, and must not run language detection on our own English
  // description — the customer's language is whatever they wrote in before.
  opts?: { alreadyStored?: boolean },
): Promise<HandleResult> {
  const store = getStore();

  let customer = await store.getCustomerByWaId(waId);
  if (!customer) {
    customer = await store.createCustomer({ waId, name: meta?.name ?? null, flag: meta?.flag ?? '💬' });
    await store.audit('system', 'customer_created', { waId });
    await resolvePendingFormLinkOnNewCustomer(store, customer);
  }

  if (!opts?.alreadyStored) {
    await store.addMessage({
      customerId: customer.id, direction: 'IN', author: 'CUSTOMER', status: 'SENT', body: text,
      // The customer's own WhatsApp message id, so a reaction the customer later
      // puts ON this message can be matched back to THIS bubble and rendered in its
      // corner — instead of failing to match and being pinned to one of our
      // messages. (Meta gives the reaction the target message's id in `to`.)
      meta: meta?.providerId ? { providerId: meta.providerId } : {},
    });
  }

  // Remember the customer's language (used for deterministic auto-messages like
  // the "questionnaire received" confirmation; the live path already replies natively).
  // LOCK the conversation language, and only ever change it on a CONFIDENT read.
  // The old code set the language on ANY keyword hit, so one stray foreign word
  // ("dove", "para") flipped an English chat to Spanish, and every reply then
  // followed the wrong stored language. Now: a confident reading establishes the
  // language the first time and can switch it only when the customer clearly
  // writes in another language (a confident English message reclaims a chat that
  // had drifted). An ambiguous message never touches it.
  const detected = opts?.alreadyStored ? null : detectLanguage(text);
  // SETTING a language the customer does not have yet takes one clear foreign
  // signal ("Olá, quero saber o preço"); SWITCHING one they already have takes
  // a confident read, so a single "Danke!" in an English chat cannot move it
  // (audit, 4 Sep: half the Latin-language customers never got a language at
  // all, and every deterministic message they received was in English).
  const enough = customer.lang ? detected?.confident : (detected?.enoughToSet ?? detected?.confident);
  if (detected?.lang && enough && detected.lang !== customer.lang) {
    await store.updateCustomer(customer.id, { lang: detected.lang });
    await store.audit('system', 'language_set', { customerId: customer.id, from: customer.lang, to: detected.lang });
    customer = { ...customer, lang: detected.lang };
  }

  // Opt-out: mark, cancel everything, discard pending drafts, stay silent forever.
  // Only on the customer's OWN words: an attachment arrives here as our vision
  // description (alreadyStored), and a payslip from "Stop N Go Cafe" or a
  // photo of a bus stop must not opt somebody out forever (audit, 3 Sep).
  if (!opts?.alreadyStored && isOptOut(text)) {
    await store.updateCustomer(customer.id, { optedOut: true });
    await store.cancelJobsFor(customer.id);
    for (const m of await store.listMessages(customer.id)) {
      if (m.status === 'PENDING_APPROVAL') await store.setMessageStatus(m.id, 'DISCARDED');
    }
    await store.audit('system', 'customer_opted_out', { customerId: customer.id });
    const c2 = await store.getCustomerByWaId(waId);
    return { outcome: { kind: 'silent', decision: { action: 'wait', confidence: 1 } }, customer: c2 ?? customer };
  }

  // ── THE CUSTOMER CLOSED THE DOOR, OR IS NOT A CUSTOMER (11 Oct, decision 8) ──
  //
  // "Not interested", "found someone cheaper", "did it myself", "scam",
  // "don't write me": the stage moves to Not Interested and every scheduled
  // nudge is cancelled (Abbas got a sales template after "Don't write me";
  // julia, Aya and Sabrina the same). Will may still answer the message
  // itself (an objection gets its approved answer), but nothing chases them.
  // A vendor pitching us on their first message is Not Relevant and gets no
  // reply at all (a social-media agency received four sales templates).
  // Jo, 22 Oct: in 'will' mode closing a lead (not interested, a vendor) is
  // Will's decision from the whole chat (new_state); only the "after payday"
  // date below is still read here, because it only moves a reminder.
  let preMode: DecisionMode = 'legacy';
  try { preMode = resolveDecisionMode(await store.getSetting(DECISION_MODE_KEY)); } catch { preMode = 'legacy'; }
  if (!opts?.alreadyStored && !customer.paid && SALES_STATES.includes(customer.state)) {
    if (preMode !== 'will' && customerNotInterested(text)) {
      try {
        await store.setState(customer.id, 'NOT_INTERESTED', 'SYSTEM');
        await store.cancelJobsFor(customer.id, ['FOLLOW_UP']);
        await store.audit('system', 'closed_by_customer_words', { customerId: customer.id, text: text.slice(0, 120) });
        const cNI = await store.getCustomerByWaId(waId);
        if (cNI) customer = cNI;
      } catch { /* the reply below still goes */ }
    } else if (preMode !== 'will' && customer.state === 'NEW_LEAD' && looksLikeVendor(text)) {
      const priorIn = (await store.listMessages(customer.id)).filter((m) => m.direction === 'IN');
      if (priorIn.length <= 1) {
        try {
          await store.setState(customer.id, 'NOT_RELEVANT', 'SYSTEM');
          await store.cancelJobsFor(customer.id);
          await store.audit('system', 'vendor_marked_not_relevant', { customerId: customer.id, text: text.slice(0, 120) });
        } catch { /* nothing else to do */ }
        const cNR = await store.getCustomerByWaId(waId);
        return { outcome: { kind: 'silent', decision: { action: 'wait', confidence: 1 } }, customer: cNR ?? customer };
      }
    } else {
      // "After payday", "in two weeks", "on the weekend": the sales nudges
      // wait until the day after the date they named (the form flow has had
      // this since 1 Oct; anti, Olivia and Hannah were nudged before theirs).
      const until = promisedUntil(text);
      if (until) {
        await store.setSetting(salesPromisedKey(customer.id), until).catch(() => undefined);
        await store.audit('system', 'sales_nudges_paused_until', { customerId: customer.id, until }).catch(() => undefined);
      }
    }
  }

  // ── "I'LL FILL IT IN ON WEDNESDAY" (1 Oct, 72-hour audit, Laura) ─────────
  //
  // A customer at Form Pending who names a day is making a promise we accept;
  // the form reminders stay quiet until that day has passed (scheduler.ts,
  // the form flow). Deterministic, in the customer's own words; nothing else
  // about the message changes.
  if (!opts?.alreadyStored && customer.state === 'FORM_PENDING') {
    const until = promisedUntil(text);
    if (until) {
      await store.setSetting(formPromisedKey(customer.id), until).catch(() => undefined);
      await store.audit('system', 'form_reminders_paused_until', { customerId: customer.id, until }).catch(() => undefined);
    }
  }
  // 14 Oct (Jo): the same for the signature: "when do you think you'll have a
  // moment to sign it? I'll check back with you then".
  if (!opts?.alreadyStored && customer.state === 'SIGNATURE_PENDING') {
    const until = promisedUntil(text);
    if (until) {
      await store.setSetting(signaturePromisedKey(customer.id), until).catch(() => undefined);
      await store.audit('system', 'signature_check_back_set', { customerId: customer.id, until }).catch(() => undefined);
    }
  }

  // ── THE ACKNOWLEDGEMENT A TFN + ABN CUSTOMER IS STILL OWED (Jo, 4 Sep) ────
  //
  // They filled the questionnaire and were sent the three ABN questions on
  // their own, without "we've received your questionnaire" in front of them:
  // that line says we are going through everything now, and while we are
  // waiting on their ABN answers it is not true yet. This is where it becomes
  // true. The moment they send the answers, the acknowledgement goes.
  //
  // Best effort and out of the way of everything else: it never blocks the
  // reply, and a courtesy line ("ok!", "👍") is not an answer, so it does not
  // trigger it.
  if (!opts?.alreadyStored && !isCourtesyLine(text)) {
    await sendOwedFormAck(store, customer, text).catch(() => { /* the reply matters more */ });
  }

  // ============================================================
  // WILL HANDLES EXISTING CHATS TOO (owner decision, Jo 30 Aug):
  // The old rule routed EVERY pre-existing / imported chat straight to a human,
  // which left real live leads (asking prices, sending details) sitting as tasks
  // while Will had already drafted a good answer it was not allowed to send. Now
  // Will treats an existing chat like any other lead and answers it.
  //
  // Two protections stay in place:
  //  - A truly imported history stays silent: the policy guard fail-closes on
  //    isLegacy (LEGACY_CHAT_AI_DISABLED), so Will still never messages a legacy
  //    chat even though it flows past here.
  //  - A previously-CLOSED chat that comes back is still handed to a human on its
  //    first message (below): it is reopened to Lead, Will is paused for it, and
  //    one task is raised, because a returning "no thanks" deserves a person's
  //    eyes before the assistant speaks again.
  // ============================================================
  const isClosed = ['NOT_INTERESTED', 'WENT_COLD', 'NOT_RELEVANT', 'FINAL'].includes(customer.state);
  if (isClosed) {
    // A closed customer (Went Cold / Not Interested / Not Relevant) who messages
    // again is no longer closed: reopen (to Lead, or for a paid customer back
    // to the stage they were closed from, see reopenTarget), then hand this
    // first message to a human rather than auto-replying to someone who had
    // said no.
    const target = reopenTarget(customer);
    await store.setState(customer.id, target, 'SYSTEM');
    await store.audit('system', 'reactivated_to_lead', { customerId: customer.id, from: customer.state, to: target, trigger: 'inbound_message' });
    customer = (await store.getCustomerByWaId(waId)) ?? customer;
    // WHO ACTUALLY NEEDS A PERSON HERE (Jo, 4 Sep, from the Decision Log).
    // Marina, a COMPLETED customer, wrote "Yes, all good" and that became a
    // task. It is a courtesy line at the end of a finished job: there is
    // nothing for anyone to do with it, and the card is noise on the board.
    //
    // The one return that does deserve eyes is somebody who told us NO and has
    // come back: how that is answered matters, and it is not a script. A
    // customer who simply went quiet, or a finished customer saying thanks, is
    // an ordinary conversation and Will handles it like any other.
    // EVERY MESSAGE TAKES THE SAME PATH (Jo, 4 Sep). Whoever wrote and whatever
    // their history, Will waits the two minutes, reads the WHOLE chat, works out
    // who this is, and answers accordingly. A returning customer used to stop
    // here as a task, which meant the one conversation that most needs context
    // was the one Will never got to read. The profile now carries the return
    // itself ("RETURNING CUSTOMER: they went quiet and were closed, then came
    // back"), so the reply knows what it is picking up.
    await store.audit('system', 'returning_customer_handled_by_will', {
      customerId: customer.id, from: customer.state, courtesy: isCourtesyLine(text),
    });
  }

  // ============================================================
  // "Am I talking to a bot?" (owner rule): the assistant NEVER answers this.
  // Not a denial, not an admission, not a deflection, and not even a draft for
  // the team to approve, because a draft is one click away from being sent.
  // Checked HERE, before the model is called, so no reply ever exists. The chat
  // is handed to a human and the assistant steps out of it.
  // ============================================================
  if (isIdentityQuestion(text)) {
    // Will is never auto-paused (Jo, 31 Aug). This specific "are you a bot"
    // message still goes to a human with no draft, but Will stays active for the
    // customer's next messages.
    await raiseOrUpdateTask(store, customer, {
      reason: 'Customer asked whether they are talking to a bot, needs a human reply',
      // THE ONE TASK WITH NO SUGGESTED REPLY, and deliberately so. Every other
      // handoff now arrives with a draft (Jo, 25 Aug), but the older owner rule
      // is narrower and stricter: no answer to "am I talking to a bot" may ever
      // exist, not even as a draft, because a draft is one click from being
      // sent. This answer has to be a person's own words. Folded into the one
      // open task per customer (raiseOrUpdateTask) so asking twice never stacks.
      severity: 'REVIEW', newContext: text.slice(0, 200), suggestedReply: null,
      forceNullSuggestedReply: true,
    });
    await store.audit('policy_guard', 'identity_question_handoff', { customerId: customer.id });
    // Cancel any Autopilot timer already armed for this customer. Without this
    // the question could be the SECOND message of a burst: the timer fired two
    // minutes later, the model saw "how much do you charge? / wait, am I
    // talking to a bot?" as one text, and answered both, auto-sending exactly
    // the answer this rule exists to prevent (audit, 4 Sep).
    await store.cancelJobsFor(customer.id, ['AUTO_REPLY']).catch(() => 0);
    const c2 = await restartCadence(store, waId, customer);
    return { outcome: { kind: 'human_task', decision: { action: 'human_task', confidence: 1 } }, customer: c2 };
  }

  // Global kill switch: store everything, but the assistant stays silent.
  const killSwitch = (await store.getSetting('kill_switch')) === true;

  const msgs = await store.listMessages(customer.id);
  // ── Runaway guard (was: "more than 3 messages before payment") ────────────
  //
  // THE OLD RULE. Any 4th inbound message before payment paused Will and handed
  // the chat to a person. It counted every inbound message, which meant it
  // counted the customer's ANSWERS to Will's own qualifying questions:
  //
  //     Will: did you work on a TFN, or also an ABN?   customer: "only TFN"
  //     Will: do you still have an Australian account?  customer: "yes"
  //
  // Two of the four messages were replies Will asked for. The rule fired on the
  // word "yes", paused Will one step before the price, and opened a task whose
  // canned wording was "Thanks for all the questions" — to a customer who had
  // asked one. It fired hardest on the BEST conversations, because a lead who
  // answers promptly reaches four messages faster than one who dawdles.
  //
  // JO'S CALL, 27 Aug, and the reasoning is his: before payment the answer to
  // everything is the same answer — yes, of course we can help, that is part of
  // the review. So there is no pre-payment question that needs a person, and
  // when this fired he stepped in to type what Will would have typed anyway.
  //
  // WHAT IT IS NOW. Not a sales rule any more — a loop guard. Twenty-five
  // inbound messages before payment is not a conversation, it is something
  // stuck: a reply loop, an automated sender, or a genuinely lost customer who
  // should have had a person long ago. The webhook's rate limit catches a fast
  // loop; this catches a slow one, over days, that no rate limit would see.
  //
  // A real sales conversation never comes near it. If it ever fires, it means
  // what it says.
  // WHAT THIS IS FOR, RESTATED (Jo, 4 Sep, from the Decision Log). Ami wrote 37
  // messages before paying and the 37th was "That's totally fine, thank you for
  // confirming!" — a customer who is engaged, polite and nearly there. The count
  // alone called that "stuck" and handed her to a person.
  //
  // Jo's rule for the customer who came NOT intending to pay is that they ask a
  // lot, one question after another, and the whole job is to stay patient with
  // them. So VOLUME IS NOT THE SIGNAL: a long conversation before payment is
  // the normal shape of the best leads, not a fault. What this catches is an
  // actual LOOP — the same line arriving over and over, an automated sender on
  // the other end — plus an absolute ceiling far above any real conversation.
  const MAX_INBOUND_BEFORE_PAYMENT = 80;
  if (!customer.paid) {
    const inbound = msgs.filter((m) => m.direction === 'IN');
    const questionsBeforePayment = inbound.length;
    // A loop: of the last six things they sent, at most two are different.
    const norm = (t: string) => t.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
    const recent = inbound.slice(-6).map((m) => norm(m.body ?? '')).filter(Boolean);
    const looping = recent.length >= 5 && new Set(recent).size <= 2;
    if (looping || questionsBeforePayment > MAX_INBOUND_BEFORE_PAYMENT) {
      // Will is never auto-paused (Jo, 31 Aug). A stuck loop still raises a task
      // for a human, but Will is not switched off for this customer.
      await raiseOrUpdateTask(store, customer, {
        reason: looping
          ? 'The same message keeps arriving in this chat, so it is looping rather than progressing'
          : `Customer sent ${questionsBeforePayment} messages before paying — this conversation is stuck, not progressing`,
        severity: 'REVIEW', newContext: text,
        suggestedReply: await suggestReply(text, customer, 'many_questions'),
      });
      await store.audit('policy_guard', 'many_questions_before_payment', { customerId: customer.id, count: questionsBeforePayment });
      const c2 = await restartCadence(store, waId, customer);
      return { outcome: { kind: 'human_task', decision: { action: 'human_task', confidence: 1 } }, customer: c2 };
    }
  }

  // ── Decide now, or decide in two minutes ─────────────────────────────────
  //
  // Jo, 3 Sep: on Autopilot the two-minute wait is FOR READING, not for
  // holding. People write in bursts ("hi", "I have a question", "about my
  // tax return..."), and a reply written the instant the first line landed
  // answers the first line. So nothing is decided here on Autopilot: a timer is
  // armed (and re-armed by every further message), and when it fires Will
  // reads everything they wrote and answers it all, once. In Approval mode the
  // draft is still written now, because there the owner's click is the wait.
  // ── THE ACCOUNT NAME, AT ONCE (11 Oct, full audit, decision 4) ───────────
  //
  // "What name do I put?" arrives while the customer is standing at the
  // bank. Neta got "Simple Tax Services" from the model, Laura and Marta
  // "Working Holiday Tax". The answer is fixed text in their language and
  // goes out now, from the code, with no pause and no model.
  // Jo, 22 Oct: in 'will' mode none of the instant answers below decide what
  // is said; Will does (an urgent message just skips the timer, further down).
  let handleMode: DecisionMode = 'legacy';
  try { handleMode = resolveDecisionMode(await store.getSetting(DECISION_MODE_KEY)); } catch { handleMode = 'legacy'; }
  if (handleMode !== 'will' && mode === 'FULL_AUTO' && !killSwitch && !opts?.alreadyStored && !customer.aiPaused && !customer.isLegacy && isAccountNameQuestion(text)) {
    try {
      const body = accountNameMessage(customer.lang);
      const out = await deliverOut(customer, body, 'AI', undefined, undefined, {
        onFailure: { reason: 'The account-name answer was not delivered. They are at the bank, waiting.', severity: 'URGENT', context: text.slice(0, 200) },
      });
      if (out.ok) {
        try { await store.cancelJobsFor(customer.id, ['AUTO_REPLY']); } catch { /* nothing armed yet */ }
        await store.audit('assistant', 'account_name_answered', { customerId: customer.id, lang: customer.lang ?? null }).catch(() => {});
        const freshA = await store.getCustomerByWaId(waId);
        return {
          outcome: { kind: 'sent', replyText: body, decision: { action: 'reply', reply_text: body, confidence: 1 } },
          customer: freshA ?? customer,
        };
      }
    } catch (e) {
      await store.audit('assistant', 'account_name_answer_failed', { customerId: customer.id, error: (e as Error).message?.slice(0, 200) }).catch(() => {});
    }
  }

  // ── THE RESIDENCY CHECK, IN THE CHAT (Jo, 22 Oct, Alexandra +44 7479) ────
  // A question or doubt in reply to the residency double-check starts the
  // same five Yes/No questions as the form; each answer gets the next one,
  // and the fifth gets Jo's result line. See residency-quiz.ts.
  if (mode === 'FULL_AUTO' && !killSwitch && !opts?.alreadyStored && !customer.aiPaused && !customer.isLegacy && !customer.optedOut) {
    try {
      const qKey = residencyQuizKey(customer.id);
      const quiz = readQuiz(await store.getSetting(qKey));
      let reply: string | null = null;
      let next: QuizState | null = quiz;
      let done: { yes: number; answers: boolean[] } | null = null;
      if (quiz) {
        const step = quizStep(quiz, text);
        if (step === 'not_an_answer') {
          // A real question goes to Will and the quiz waits for the answer;
          // anything short that is not Yes/No gets the question again.
          if (!/[?？]/.test(text) && text.length <= 80) reply = quizAgain(quiz.lang, quiz.answers.length);
        } else {
          reply = step.reply; next = step.next; done = step.done ?? null;
        }
      } else if (handleMode !== 'will' && startsQuiz(text)) {
        const recent = await store.listMessages(customer.id);
        const lastOut = [...recent].reverse().find((m) => m.direction === 'OUT' && m.status === 'SENT');
        if (lastOut && isResidencyCheck(lastOut.body) && Date.now() - new Date(lastOut.createdAt).getTime() <= QUIZ_CHECK_WINDOW_MS) {
          const lang = quizLang(customer.lang);
          reply = quizIntro(lang);
          next = { step: 0, answers: [], startedAt: new Date().toISOString(), lang };
        }
      }
      if (reply) {
        const out = await deliverOut(customer, reply, 'AI', { system: true });
        if (out.ok) {
          await store.setSetting(qKey, next);
          try { await store.cancelJobsFor(customer.id, ['AUTO_REPLY']); } catch { /* nothing armed */ }
          await store.audit('assistant', done ? 'residency_quiz_done' : 'residency_quiz_step', {
            customerId: customer.id, step: next?.step ?? 5, ...(done ? { yes: done.yes, answers: done.answers } : {}),
          }).catch(() => {});
          if (done && done.yes >= 4) {
            await store.addTask({
              customerId: customer.id, customerName: customer.name ?? waId,
              reason: `Residency check in the chat: ${done.yes} of 5 Yes. Told they look like an Australian tax resident and asked to fill out the questionnaire again with the correct details.`,
              severity: 'REVIEW',
              context: done.answers.map((a, i) => `${i + 1}. ${a ? 'Yes' : 'No'}`).join('\n'),
              suggestedReply: null,
            }).catch(() => {});
          }
          const freshQ = await store.getCustomerByWaId(waId);
          return {
            outcome: { kind: 'sent', replyText: reply, decision: { action: 'reply', reply_text: reply, confidence: 1 } },
            customer: freshQ ?? customer,
          };
        }
      }
    } catch (e) {
      await store.audit('assistant', 'residency_quiz_failed', { customerId: customer.id, error: (e as Error).message?.slice(0, 200) }).catch(() => {});
    }
  }

  // ── THE CHOICE IS THE "YES": price message at once (11 Oct, decision 3) ──
  //
  // A short, clear answer to the opening question ("TFN", "also Uber", "yes")
  // from an English-speaking lead who has not got the bank details yet is
  // answered from the code, now, with the approved price message for that
  // track. No model, no two-minute pause: Rochi and Jack were lost in that
  // pause. Anything else goes through Will as before.
  if (handleMode !== 'will' && mode === 'FULL_AUTO' && !killSwitch && !opts?.alreadyStored && !customer.paid && !customer.aiPaused && !customer.isLegacy
      && SALES_STATES.includes(customer.state) && ((customer.lang ?? 'en') === 'en' || hasPriceIn(customer.lang))) {
    try {
      const prior = await store.listMessages(customer.id);
      const bankSent = prior.some((m) => m.direction === 'OUT' && m.status === 'SENT' && /\b0?62\s?692\b|\b81049952\b/.test(m.body ?? ''));
      const lastWill = [...prior].reverse().find((m) => m.direction === 'OUT' && m.status === 'SENT')?.body ?? null;
      const track = bankSent ? null : detectChoice(text, lastWill);
      if (track) {
        // First contact (nothing from us yet): greeting + "looks like the TFN
        // option is the right fit" (Jo, 11 Oct). Otherwise the plain price message.
        const firstContact = !prior.some((m) => m.direction === 'OUT' && m.status === 'SENT');
        // Foreign income anywhere in what they wrote: +$110 (Jo, 12 Oct).
        const foreign = hasForeignIncome([...prior.filter((m) => m.direction === 'IN').map((m) => m.body), text]);
        const checkedReason = alreadyCheckedReason([...prior.filter((m) => m.direction === 'IN').map((m) => m.body), text]);
        // 16 Oct (Jo): German and Japanese get their own approved price
        // message. Foreign income and "already checked" in those languages go
        // through Will (null here), the English ones are adjusted in code.
        const price: string | null = hasPriceIn(customer.lang)
          ? (foreign || checkedReason ? null : priceMessageIn(customer.lang, track, firstContact, cleanFirstName(firstNameOf(customer.name))))
          : applyCheckedClause(firstContact ? firstContactPriceMessage(track, cleanFirstName(firstNameOf(customer.name)), foreign) : priceMessageFor(track, foreign), checkedReason);
        if (price) {
        const out = await deliverOut(customer, price, 'AI', { proposedState: 'PRICE_SENT' }, undefined, {
          onFailure: { reason: 'The price message was not delivered after the customer chose a track. They are waiting.', severity: 'URGENT', context: text.slice(0, 200) },
        });
        if (out.ok) {
          try { await store.cancelJobsFor(customer.id, ['AUTO_REPLY']); } catch { /* nothing armed yet */ }
          if (customer.state !== 'PRICE_SENT') await store.setState(customer.id, 'PRICE_SENT', 'AI').catch(() => false);
          await store.updateCustomer(customer.id, { income: track }).catch(() => {});
          await store.audit('assistant', 'instant_price_sent', { customerId: customer.id, track, choice: text.slice(0, 80) }).catch(() => {});
          const fresh1 = await store.getCustomerByWaId(waId);
          if (fresh1) {
            try { await reconcileSchedule(fresh1); } catch (e) {
              await store.audit('scheduler', 'reconcile_failed_after_send', { customerId: customer.id, error: e instanceof Error ? e.message.slice(0, 200) : String(e).slice(0, 200) }).catch(() => {});
            }
          }
          return {
            outcome: { kind: 'sent', replyText: price, newState: 'PRICE_SENT', stateChanged: customer.state !== 'PRICE_SENT', decision: { action: 'reply', reply_text: price, new_state: 'PRICE_SENT', confidence: 1 } },
            customer: fresh1 ?? customer,
          };
        }
        }
      }
    } catch (e) {
      await store.audit('assistant', 'instant_price_failed', { customerId: customer.id, error: (e as Error).message?.slice(0, 200) }).catch(() => {});
    }
  }

  // ── WILL DECIDES, AT ONCE, WHEN THEY ARE WAITING (Jo, 22 Oct) ──────────────
  // 'will' mode: someone standing at the bank ("what name do I put?") or who
  // just chose a track is not made to wait the 1-5 minutes. The words only
  // decide WHEN Will is asked; what is said is Will's decision.
  if (handleMode === 'will' && mode === 'FULL_AUTO' && !killSwitch && !opts?.alreadyStored && !customer.aiPaused && !customer.isLegacy && !customer.optedOut) {
    try {
      const recentF = await store.listMessages(customer.id);
      const lastWillF = [...recentF].reverse().find((m) => m.direction === 'OUT' && m.status === 'SENT')?.body ?? null;
      if (isFastLane(text, lastWillF)) {
        try { await store.cancelJobsFor(customer.id, ['AUTO_REPLY']); } catch { /* nothing armed yet */ }
        await store.audit('assistant', 'will_fast_lane', { customerId: customer.id }).catch(() => {});
        const { outcome: fastOutcome } = await decideAndAct(store, customer, text, mode, { killSwitch, sendNow: true });
        const freshF = await store.getCustomerByWaId(waId);
        if (freshF) { try { await reconcileSchedule(freshF); } catch { /* best effort, the reply is out */ } }
        return { outcome: fastOutcome, customer: freshF ?? customer };
      }
    } catch (e) {
      await store.audit('assistant', 'will_fast_lane_failed', { customerId: customer.id, error: (e as Error).message?.slice(0, 200) }).catch(() => {});
    }
  }

  // ── Will is paused for everyone: the customer still hears something ──────
  //
  // 11 Oct (full audit, decision 1): with the kill switch on, the scheduler
  // does nothing, so the timer armed below never fires and nothing else
  // would ever reach the customer. 65 hours of zero output on 11 to 13 Sep
  // lost nine of twelve leads. The holding line is fixed text, not the
  // model: it goes out right here, at most once per customer per 12 hours,
  // plus one task per customer so the team sees who is waiting.
  if (killSwitch && mode === 'FULL_AUTO' && !opts?.alreadyStored && !customer.aiPaused && !customer.isLegacy && !isCourtesyLine(text) && !isClosingOnly(text)) {
    try {
      const key = `paused_ack_at:${customer.id}`;
      const last = Number((await store.getSetting(key)) ?? 0);
      if (Date.now() - last > 12 * 60 * 60 * 1000) {
        await store.setSetting(key, Date.now());
        const body = await paidHoldingBody(store, customer.lang);
        const tpl = { name: handoffHoldingTemplateKey(metaTemplateLang(customer.lang)), params: [], lang: customer.lang, fallbackToText: true };
        const out = await deliverOut(customer, body, 'AI', { system: true, waTemplate: tpl }, tpl);
        await store.audit('assistant', out.ok ? 'paused_ack_sent' : 'paused_ack_failed', { customerId: customer.id, error: out.ok ? undefined : out.error }).catch(() => {});
      }
      await raiseOrUpdateTask(store, customer, {
        reason: `${customer.name ?? customer.waId} wrote in while Will is paused (kill switch). Reply by hand.`,
        severity: 'REVIEW', newContext: text.slice(0, 300), suggestedReply: null,
      });
    } catch { /* the message is stored either way */ }
  }

  if (mode === 'FULL_AUTO') {
    const armed = await armAutoReply(store, customer);
    await store.audit('assistant', 'decision', {
      action: 'deferred', fromState: customer.state, newState: null, knowledgeUsed: [],
      guard: { blocked: false }, preview: null, customerId: customer.id, runAt: armed.runAt,
    });
    // The follow-up cadence still moves on every inbound (a lead who is
    // talking is not a lead to chase), same as the immediate path below.
    const fresh0 = await store.getCustomerByWaId(waId);
    if (fresh0) {
      try { await reconcileSchedule(fresh0); } catch (e) {
        await store.audit('scheduler', 'reconcile_failed_after_send', {
          customerId: customer.id,
          error: e instanceof Error ? e.message.slice(0, 200) : String(e).slice(0, 200),
        }).catch(() => { /* the store is the likely thing that just failed */ });
      }
    }
    return {
      outcome: { kind: 'deferred', decision: { action: 'wait', confidence: 1 } },
      customer: fresh0 ?? customer,
    };
  }

  const { outcome, pendingMessageId } = await decideAndAct(store, customer, text, mode, { killSwitch });

  // ── AFTER THE CUSTOMER HAS THE MESSAGE, NOTHING MAY THROW ────────────────
  //
  // The reply may already have been transmitted several lines above. Arming the
  // follow-up cadence ends in store.addJob(), which throws on any Supabase
  // error, and that throw propagated all the way out to the webhook. The
  // webhook read it as "this message failed", released the idempotency claim
  // and returned 500, so Meta redelivered and the whole function ran again from
  // the top: a second engine call, a second deliverOut, and the customer got
  // the same answer twice.
  //
  // A missing follow-up is a small, visible problem. A duplicate reply is not
  // recoverable, so this is best effort and the outcome stands either way.
  const fresh = await store.getCustomerByWaId(waId);
  if (fresh) {
    try {
      await reconcileSchedule(fresh);
    } catch (e) {
      await store.audit('scheduler', 'reconcile_failed_after_send', {
        customerId: customer.id,
        error: e instanceof Error ? e.message.slice(0, 200) : String(e).slice(0, 200),
      }).catch(() => { /* the store is the likely thing that just failed */ });
    }
  }
  return { outcome, customer: fresh ?? customer, pendingMessageId };
}

// ============================================================
// THE DECISION, separated from the ingest so it can run at two different
// moments: right away (Approval mode, and every path that already has a
// human waiting), or two minutes after the customer's LAST message on
// Autopilot (runDeferredAutoReply below), reading the whole burst at once.
// ============================================================
export interface DecideOpts {
  killSwitch: boolean;
  /** Set by the deferred Autopilot path: send the reply NOW instead of parking
   *  it QUEUED, and drop it if the customer wrote again after `anchorAt`. */
  sendNow?: boolean;
  /** The customer's last-message time the deferred reply was armed on. */
  anchorAt?: string | null;
  /** The AUTO_REPLY job this run belongs to, so the supersession check does not
   *  read the run's own claimed row as a rival timer. */
  jobId?: string;
  /** Its run_at, so only a STRICTLY newer timer counts as a rival (audit3
   *  core 32, 5 Sep). */
  jobRunAt?: string;
  /** Its created_at, the second tie-break (audit3 core 39, 5 Sep). */
  jobCreatedAt?: string | null;
  /** 11 Oct: the burst being answered is nothing but attachments (their vision
   *  descriptions). The documents path has already acknowledged those, so a
   *  "wait" on them is not a paying customer left in silence. */
  attachmentsOnly?: boolean;
}

/**
 * WHO THIS CUSTOMER IS, in one line, for the top of the prompt.
 *
 * Jo, 4 Sep: whatever arrives, and from whoever, Will waits two minutes and
 * reads the WHOLE chat before it writes, so it knows which customer it has and
 * never answers a person with history as if they were new. The transcript
 * window carries the recent turns; this carries everything the window cannot:
 * when they first wrote, how much has been said, whether they went cold or said
 * no and came back, and whether they have already paid.
 */
/**
 * Send the "we've received your questionnaire" line that a TFN + ABN customer
 * has been owed since they were asked the ABN questions (Jo, 4 Sep).
 *
 * Fires on their first real answer, whatever it says: they have now sent what
 * we were waiting for, so the acknowledgement is finally true. Sent once, then
 * the flag is cleared. A message that is only courtesy never gets here (the
 * caller checks), and neither does a paused, legacy or opted-out chat.
 */
async function sendOwedFormAck(store: Store, customer: CustomerRow, text: string): Promise<void> {
  if (customer.income !== 'TFN_ABN') return;
  if (customer.optedOut || customer.aiPaused || customer.isLegacy) return;
  const key = abnAnswersPendingKey(customer.id);
  if ((await store.getSetting(key)) !== true) return;
  // Clear FIRST: two messages landing on two instances must not both send it.
  await store.setSetting(key, false);

  // 16 Oct (Jo): the ABN answers no longer end the conversation with "we've
  // received your questionnaire". They START the ABN intake: Will now collects
  // the income, expenses and documents step by step (abn-intake.ts), and the
  // acknowledgement is his closing line once everything is in.
  await store.setSetting(abnIntakeKey(customer.id), { startedAt: new Date().toISOString() });
  await store.audit('system', 'abn_intake_started', { customerId: customer.id, answered: text.slice(0, 120) });
}

/** Customer text quoted into the profile block: prompt structure stripped, and
 *  capped. Same idea as playbook.sanitize, with room for a sentence. */
const quoteForPrompt = (v: string): string =>
  (v || '').replace(/[\r\n{}#`<>*_|]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 160);

async function buildBackstory(store: Store, customer: CustomerRow, msgs: MessageRow[]): Promise<string> {
  const parts: string[] = [];
  try {
    const intake = readIntake(await store.getSetting(abnIntakeKey(customer.id)));
    if (intake) parts.push(`ABN INTAKE IN PROGRESS (since ${intake.startedAt.slice(0, 10)}): collect their ABN paperwork step by step, as in "ABN INTAKE" in your instructions`);
  } catch { /* no flag, no block */ }
  const sent = msgs.filter((m) => m.status === 'SENT');
  const inbound = sent.filter((m) => m.direction === 'IN');
  const first = sent[0];
  if (first) {
    const days = Math.floor((Date.now() - new Date(first.createdAt).getTime()) / 86400000);
    parts.push(days <= 0
      ? 'first wrote to us today'
      : `first wrote to us ${days} day${days === 1 ? '' : 's'} ago`);
  }
  if (inbound.length) parts.push(`${inbound.length} message${inbound.length === 1 ? '' : 's'} from them so far`);

  // The stage history says what actually happened, including the returns.
  try {
    const hist = await store.history(customer.id);
    const closes = hist.filter((h) => ['NOT_INTERESTED', 'WENT_COLD', 'NOT_RELEVANT', 'FINAL'].includes(h.to));
    const reopens = hist.filter((h) => !!h.from && ['NOT_INTERESTED', 'WENT_COLD', 'NOT_RELEVANT', 'FINAL'].includes(h.from));
    if (closes.length && reopens.length) {
      const last = closes[closes.length - 1];
      const label = last.to === 'NOT_INTERESTED' ? 'said they were not interested'
        : last.to === 'WENT_COLD' ? 'went quiet and was closed'
          : 'was closed as not relevant';
      parts.push(`RETURNING CUSTOMER: they ${label}, and then came back and wrote again. Do not greet them as new and do not remind them they said no`);
    }
    if (hist.some((h) => h.to === 'PAID')) parts.push('they have already paid us');
    if (hist.some((h) => h.to === 'LODGED' || h.to === 'COMPLETED')) parts.push('a return has already been lodged for them');
  } catch { /* the profile is still useful without it */ }

  // The very first thing they ever asked is usually the whole story.
  const firstIn = inbound[0];
  if (firstIn && inbound.length > 3) {
    parts.push(`their first message to us was: "${quoteForPrompt(firstIn.body)}"`);
  }
  return parts.join('; ');
}

/** Decision 1 of the full audit (11 Oct): when a "silent" outcome must become
 *  a task plus the holding line instead. Pure, so it is testable. */
export function paidNeverSilent(a: {
  outcomeKind: EngineOutcome['kind']; reviewNote?: string | null; mode: AiMode;
  paid: boolean; state: CustomerState; optedOut: boolean; isLegacy: boolean; aiPaused: boolean; alreadyStored: boolean;
  text?: string | null;
}): boolean {
  if (a.outcomeKind !== 'silent') return false;
  if (a.mode !== 'FULL_AUTO') return false;
  if (a.optedOut || a.isLegacy || a.aiPaused || a.alreadyStored) return false;
  if (/^courtesy close/i.test(a.reviewNote ?? '')) return false;
  // 11 Oct: Ivy (+61 409 870 288) wrote "Thankyou! X" after "your tax return is
  // ready" and got "I've passed this to the team". The model chose to wait (the
  // right call) but without the courtesy note, so the silence was converted.
  // Whatever the model said, a courtesy line gets no holding line: there is
  // nothing to answer.
  if (a.text !== undefined && a.text !== null && (isCourtesyLine(a.text) || isThanksLine(a.text) || isClosingOnly(a.text))) return false;
  // Jo, 12 Oct ("100% thank you" got the holding line): Will's own judgement
  // that there is nothing to answer is trusted, unless the customer actually
  // asked or wrote something substantial. Only then does silence become a
  // task (and the holding line).
  if (a.text !== undefined && a.text !== null && !customerAskedSomething(a.text)) return false;
  const postPayment = a.paid || POST_PAYMENT_STATES.includes(a.state);
  return postPayment;
}

async function paidHoldingBody(store: Store, lang?: string | null): Promise<string> {
  const key = handoffHoldingTemplateKey(lang);
  try {
    const templates = await store.listTemplates();
    const t = templates.find((x) => x.key === key) ?? templates.find((x) => x.key === 'handoff_holding');
    if (t?.body?.trim() && !/\{\{[A-Z_]+\}\}/.test(t.body)) return t.body;
  } catch { /* constant below */ }
  return handoffHoldingMessage(lang);
}

/** One pass of the second check over an outcome. Mutates the outcome on a
 *  usable revise (only if the revised text still passes the Policy Guard).
 *  'hold' tells the caller to ask Will again. */
async function secondCheck(
  store: Store, customer: CustomerRow, history: Turn[], mode: AiMode, outcome: EngineOutcome, ctx: CustomerContext,
): Promise<{ verdict: 'pass' | 'revised' | 'hold' | 'skip'; note?: string }> {
  const r = await reviewDraft({
    customer, history, draft: outcome.replyText ?? '',
    mode: resolveAiMode(mode) === 'FULL_AUTO' ? 'FULL_AUTO' : 'SUPERVISED', isTask: false, willMode: true,
  });
  await store.audit('assistant', 'second_check', { customerId: customer.id, verdict: r.verdict, note: r.note ?? null }).catch(() => {});
  if (r.verdict === 'revise' && r.revised) {
    const v = policyGuard(r.revised, {
      aiPaused: customer.aiPaused, killSwitch: false, optedOut: customer.optedOut, isLegacy: customer.isLegacy,
      lastCustomerMsgAt: new Date(), state: ctx.state, paid: ctx.paid, estimateFromTeam: ctx.estimatedRefundCents, isApprovedTemplate: false,
    });
    if (v.allowed) {
      const laidOut = paragraphise(r.revised);
      outcome.replyText = laidOut; if (outcome.decision) outcome.decision.reply_text = laidOut;
      return { verdict: 'revised', note: r.note };
    }
    return { verdict: 'pass', note: r.note };
  }
  return { verdict: r.verdict === 'hold' ? 'hold' : 'pass', note: r.note };
}

export async function decideAndAct(
  store: Store,
  customer: CustomerRow,
  text: string,
  mode: AiMode,
  opts: DecideOpts,
): Promise<{ outcome: EngineOutcome; pendingMessageId?: string }> {
  const killSwitch = opts.killSwitch;
  const msgs = await store.listMessages(customer.id);
  const history: Turn[] = msgs
    .filter((m) => m.status === 'SENT') // pending/discarded drafts are NOT delivered context
    .map((m) => ({
      role: m.direction === 'IN' ? ('customer' as const) : ('assistant' as const),
      text: m.body,
      // Mark outbound messages a human on the team sent, so the model can see
      // where the owner has already stepped in (Jo, 31 Aug).
      author: m.direction === 'OUT' ? (m.author === 'HUMAN' ? ('HUMAN' as const) : ('AI' as const)) : undefined,
    }));

  // ── After lodgement (Jo, 24 Sep): two moments handled without the model ──
  // 1. "The refund landed" pulls the Google review ask forward to now (it
  //    was scheduled 14 days out as a fallback). Will still answers the
  //    message normally below; the ask itself goes out from the scheduler a
  //    few minutes later, after Will has judged the conversation.
  // 2. A short positive reply to the ask ("done", "sure", 👍) gets the one
  //    referral line, once, inside the window. That IS the reply, so it
  //    returns here rather than calling the model for a second answer.
  if (['SIGNED', 'LODGED', 'COMPLETED'].includes(customer.state) && !customer.optedOut && !customer.isLegacy && !killSwitch) {
    try {
      const rec = (await readReviewAsks(store))[customer.id];
      // 'will' mode: "not yet" and the referral line are Will's choice
      // (approved keys refund_not_yet / referral, side effects below). The
      // pull-forward of the review ask on "it landed" only moves a timer.
      const lodgedWill = resolveDecisionMode(await store.getSetting(DECISION_MODE_KEY).catch(() => null)) === 'will';
      // 11 Oct (review system): "not yet" to the refund check-in gets one
      // calm line and a second check-in four days later. That IS the reply.
      if (!lodgedWill && rec?.checkinAt && !rec.askedAt && !rec.skippedAt && !saysRefundLanded(text) && saysRefundNotYet(text)) {
        const body = refundNotYetMessage(customer.lang);
        if ((rec.checkins ?? 0) < 2) {
          await store.cancelJobsFor(customer.id, ['REFUND_CHECKIN']).catch(() => 0);
          await store.addJob({ customerId: customer.id, kind: 'REFUND_CHECKIN', payload: { attempt: rec.checkins ?? 1 }, runAt: new Date(Date.now() + REFUND_CHECKIN_RETRY_DAYS * 86400000).toISOString() }).catch(() => {});
        }
        if (mode === 'FULL_AUTO') {
          const out = await deliverOut(customer, body, 'AI', { system: true });
          await store.audit('system', 'refund_checkin_not_yet', { customerId: customer.id, ok: out.ok }).catch(() => {});
          return { outcome: { kind: 'silent', decision: { action: 'wait', confidence: 1 } } };
        }
        const m = await store.addMessage({ customerId: customer.id, direction: 'OUT', author: 'AI', status: 'PENDING_APPROVAL', body, meta: { system: true } });
        return { outcome: { kind: 'pending_approval', decision: { action: 'reply', reply_text: body, confidence: 1 }, replyText: body }, pendingMessageId: m.id };
      }
      if (!rec?.askedAt && !rec?.skippedAt && saysRefundLanded(text)) {
        await store.cancelJobsFor(customer.id, ['REVIEW_REQUEST', 'REFUND_CHECKIN']).catch(() => 0);
        await store.addJob({
          customerId: customer.id, kind: 'REVIEW_REQUEST', payload: { trigger: 'refund_received' },
          runAt: new Date(Date.now() + 3 * 60 * 1000).toISOString(),
        });
        await store.audit('system', 'review_ask_pulled_forward', { customerId: customer.id });
      }
      if (!lodgedWill && rec?.askedAt && !rec.referralAt && isPositiveAck(text)
          && Date.now() - new Date(rec.askedAt).getTime() < REFERRAL_WINDOW_DAYS * 24 * 60 * 60 * 1000) {
        const body = referralMessage(customer.lang);
        if (mode === 'FULL_AUTO') {
          const out = await deliverOut(customer, body, 'AI', { system: true });
          if (out.ok) await patchReviewAsk(store, customer.id, { referralAt: new Date().toISOString() });
          await store.audit('system', 'referral_sent', { customerId: customer.id, ok: out.ok });
          return { outcome: { kind: 'silent', decision: { action: 'wait', confidence: 1 } } };
        }
        const m = await store.addMessage({
          customerId: customer.id, direction: 'OUT', author: 'AI', status: 'PENDING_APPROVAL', body,
          meta: { review: 'Referral line after a positive reply to the review ask (Jo, 24 Sep).' },
        });
        await patchReviewAsk(store, customer.id, { referralAt: new Date().toISOString() });
        await store.audit('system', 'referral_drafted', { customerId: customer.id });
        return { outcome: { kind: 'pending_approval', decision: { action: 'reply', reply_text: body, confidence: 1 }, replyText: body }, pendingMessageId: m.id };
      }
    } catch { /* the review ask is a bonus; never block the reply */ }
  }

  // COST-01: daily global cap on paid AI decisions. When the budget is spent,
  // hand the conversation to a human instead of calling the model.
  if (await aiBudgetExhausted()) {
    // (audit, 5 Sep) Read this BEFORE raiseOrUpdateTask runs — that call makes
    // its own store round-trips, which overwrite lastPersistError with their
    // own (usually successful, null-ing) result. Distinguishing "the RPC
    // that guards the budget is unreachable" from "the budget is really
    // spent" only works if it is captured right here.
    const unavailable = bumpCounterUnavailable();
    const rpcError = unavailable ? sbLastPersistError : null;
    await raiseOrUpdateTask(store, customer, {
      reason: 'Daily AI limit reached, please reply to this customer manually',
      severity: 'REVIEW', newContext: text.slice(0, 200),
      suggestedReply: await suggestReply(text, customer, 'budget'),
    });
    await store.audit(
      'policy_guard',
      unavailable ? 'ai_budget_unavailable' : 'ai_budget_exhausted',
      unavailable ? { customerId: customer.id, error: rpcError } : { customerId: customer.id },
    );
    return { outcome: { kind: 'human_task', decision: { action: 'human_task', confidence: 1 } } };
  }

  // RAG: pull the most relevant learned answers for this exact message.
  const knowledge = await retrieveKnowledge(text, { lang: customer.lang ?? undefined }).catch(() => []);
  // Jo, 22 Oct: 'will' = Will decides every message (will-decides.ts).
  let decisionMode: DecisionMode = 'legacy';
  try { decisionMode = resolveDecisionMode(await store.getSetting(DECISION_MODE_KEY)); } catch { decisionMode = 'legacy'; }
  const ctx: CustomerContext = {
    // Owner rule: the model only ever sees the FIRST name, so it can never address
    // the customer by surname even if a full name was captured from WhatsApp.
    // The cleaned first name (a leading emoji, ALL CAPS, a company or a phone
    // number as the profile name all read as "no name"), so the model never
    // greets "Hey 🌸!" or "Hey SYDNEY!" (audit, 3 Sep). Same cleaner the
    // deterministic opening uses.
    name: cleanFirstName(firstNameOf(customer.name)) || null, state: customer.state, income: customer.income,
    paid: customer.paid, formComplete: customer.formComplete,
    missingDocs: customer.missingDocs, estimatedRefundCents: customer.estimatedRefundCents, outcome: customer.outcome ?? null,
    lang: customer.lang,
    backstory: await buildBackstory(store, customer, msgs).catch(() => ''),
    knowledge,
    decisionMode,
  };

  const bank = await getBank();
  const engineGuard = {
      aiPaused: customer.aiPaused, killSwitch,
      optedOut: customer.optedOut, isLegacy: customer.isLegacy,
      // ── WE ARE INSIDE THE 24-HOUR WINDOW. BY DEFINITION. ──────────────
      //
      // This read `customer.lastCustomerMsgAt`, and `customer` is the row that
      // was fetched at the TOP of this function — before addMessage() stored
      // the message we are answering right now. So the timestamp was the one
      // BEFORE this one, and the guard was being told how long the customer had
      // been quiet BEFORE they broke the silence.
      //
      // For anyone who came back after more than a day, that produced
      // OUTSIDE_24H_WINDOW_NEEDS_TEMPLATE on the reply to the message that
      // reopened the window. The block was real: the reply was refused, a task
      // was raised, and a person had to answer by hand. Found 27 Aug from a
      // Decision Log card Jo sent (+44 7482 783185) whose reply was refused for
      // exactly this while the customer was mid-conversation.
      //
      // It landed hardest on the customers Will exists to win back — the ones
      // who go quiet, get a follow-up, and reply. Their first reply back was
      // the one that could not be answered automatically.
      //
      // We are processing an inbound message from this customer at this moment.
      // That IS the last customer message time, and Meta's window opens on it.
      lastCustomerMsgAt: new Date(),
  };
  let outcome = await runEngine({ ctx, history, mode, bank, decisionMode, guard: engineGuard });

  // ── THE SECOND CHECK (Jo, 22 Oct) ─────────────────────────────────────────
  // 'will' mode: before a reply Will wrote himself leaves, the reviewer reads
  // it against the same rules. revise: the better version goes, if it still
  // passes the Policy Guard. hold: Will writes it once more with the reason;
  // only if that is held too does it become a task. Jo's exact wording
  // (approved_key) is not reviewed. Any reviewer failure leaves Will's reply
  // exactly as it was (reviewer.ts is fail-open).
  if (decisionMode === 'will' && outcome.replyText && !outcome.decision?.approved_key
      && (outcome.kind === 'queued' || outcome.kind === 'pending_approval')) {
    try {
      const checked = await secondCheck(store, customer, history, mode, outcome, ctx);
      if (checked.verdict === 'hold') {
        const firstDraft = outcome.replyText;
        const review = checked.note;
        const again = await runEngine({
          ctx, history, mode, bank, decisionMode, guard: engineGuard,
          reviewHint: `A second check held your previous reply${review ? ` because: ${review}` : ''}. Write it again so that it no longer has that problem, or hand it to the team if it should not be answered automatically.\n\nPrevious reply, for reference only:\n"""\n${(firstDraft ?? '').slice(0, 1500)}\n"""`,
        });
        const second = again.replyText && (again.kind === 'queued' || again.kind === 'pending_approval')
          ? await secondCheck(store, customer, history, mode, again, ctx)
          : { verdict: 'skip' as const };
        if (second.verdict === 'hold') {
          outcome = {
            kind: 'human_task', decision: { ...again.decision, action: 'human_task' },
            task: { reason: `Second check held Will's reply twice${second.note ? `: ${second.note}` : ''}`, severity: 'REVIEW', suggestedReply: again.replyText },
          };
        } else {
          outcome = again;
        }
      }
    } catch { /* fail-open: Will's reply stands */ }
  }

  // Will chose to start the residency questions (will mode): the quiz state
  // is armed so the customer's Yes/No answers are read by residency-quiz.ts.
  if (outcome.decision?.approved_key === 'residency_quiz_start' && outcome.replyText
      && (outcome.kind === 'queued' || outcome.kind === 'sent' || outcome.kind === 'pending_approval')) {
    await store.setSetting(residencyQuizKey(customer.id), {
      step: 0, answers: [], startedAt: new Date().toISOString(), lang: quizLang(customer.lang),
    }).catch(() => undefined);
    await store.audit('assistant', 'residency_quiz_started_by_will', { customerId: customer.id }).catch(() => {});
  }
  // The side effects that went with the old keyword lines, now that Will
  // chose them (Jo, 22 Oct).
  if (decisionMode === 'will' && outcome.replyText && (outcome.kind === 'queued' || outcome.kind === 'sent' || outcome.kind === 'pending_approval')) {
    try {
      if (outcome.decision?.approved_key === 'refund_not_yet') {
        const rec = (await readReviewAsks(store))[customer.id];
        if ((rec?.checkins ?? 0) < 2) {
          await store.cancelJobsFor(customer.id, ['REFUND_CHECKIN']).catch(() => 0);
          await store.addJob({ customerId: customer.id, kind: 'REFUND_CHECKIN', payload: { attempt: rec?.checkins ?? 1 }, runAt: new Date(Date.now() + REFUND_CHECKIN_RETRY_DAYS * 86400000).toISOString() }).catch(() => {});
        }
      } else if (outcome.decision?.approved_key === 'referral') {
        await patchReviewAsk(store, customer.id, { referralAt: new Date().toISOString() });
      } else if (outcome.decision?.approved_key === 'residency_resident' || outcome.decision?.approved_key === 'residency_whm') {
        // Same ending as the five questions in the chat: a quiz in progress is
        // closed, and the resident result tells the team a new form is coming.
        await store.setSetting(residencyQuizKey(customer.id), null).catch(() => undefined);
        await store.audit('assistant', 'residency_result_by_will', { customerId: customer.id, result: outcome.decision.approved_key }).catch(() => {});
        if (outcome.decision.approved_key === 'residency_resident') {
          await store.addTask({
            customerId: customer.id, customerName: customer.name ?? customer.waId,
            reason: 'Residency check in the chat: the customer counted 4 or more of the 5 points themselves. Told they look like an Australian tax resident and asked to fill out the questionnaire again with the correct details.',
            severity: 'REVIEW', context: text.slice(0, 500), suggestedReply: null,
          }).catch(() => {});
        }
      } else if (outcome.decision?.approved_key === 'payment_link_ready') {
        // Jo, 25 Oct: the team sends the card payment link by hand.
        await raiseOrUpdateTask(store, customer, {
          reason: `PAYMENT LINK: send a card payment link to ${customer.name ?? customer.waId}. Full name as they wrote it: "${text.replace(/\s+/g, ' ').trim().slice(0, 80)}"`,
          severity: 'URGENT', newContext: text.slice(0, 300), suggestedReply: null,
        });
        await store.cancelJobsFor(customer.id, ['FOLLOW_UP']).catch(() => 0);
      } else if (outcome.decision?.approved_key === 'review_link') {
        // The link Jo set in the CRM, if it differs from the default; and the
        // scheduled review ask is not sent on top of this one.
        const link = await reviewLink(store);
        if (outcome.replyText && !outcome.replyText.includes(link)) outcome.replyText = outcome.replyText.replace(/https:\/\/\S+$/, link);
        await patchReviewAsk(store, customer.id, { askedAt: new Date().toISOString() });
        await store.cancelJobsFor(customer.id, ['REVIEW_REQUEST']).catch(() => 0);
      }
    } catch { /* the reply matters more than the bookkeeping */ }
  }
  // Will closed the lead without a reply (a vendor) or with one (not
  // interested): the stage moves and nothing chases them.
  if (decisionMode === 'will' && (outcome.decision?.new_state === 'NOT_RELEVANT' || outcome.decision?.new_state === 'NOT_INTERESTED')
      && customer.state !== outcome.decision.new_state && !customer.paid && canTransition(customer.state, outcome.decision.new_state)) {
    try {
      await store.setState(customer.id, outcome.decision.new_state, 'AI');
      await store.cancelJobsFor(customer.id, ['FOLLOW_UP']);
      await store.audit('assistant', 'lead_closed_by_will', { customerId: customer.id, to: outcome.decision.new_state });
    } catch { /* the reply already stands */ }
  }

  // ── A paying customer is never left in silence (11 Oct, full audit) ──────
  //
  // Decision 1 of the 386-conversation audit: Simon waited 23 hours after
  // paying ("Done! Helloo? Hey? Hello?"), Tomeka five days, Ｓ and なる four
  // and nine days, because Will decided "wait" (or was switched off) and no
  // task was open, so nobody saw them. From now on a customer who has paid
  // and writes anything that is not a bare thank-you gets, at minimum, a
  // task for the team plus the holding line (HANDOFF_ACK, minutes later).
  // "Thanks" / "ok" / 👍 keep their silence (Jo, 1 Oct: nothing to add,
  // nothing sent). A vision description of an attachment is not a message
  // that needs an answer here (the documents path acknowledges files).
  // 16 Oct (Jo): the ABN intake is complete when Will sends the closing line.
  // The intake ends and the team gets one task with what came in.
  if (outcome.replyText && ABN_INTAKE_DONE_RE.test(outcome.replyText)) {
    try {
      const intake = readIntake(await store.getSetting(abnIntakeKey(customer.id)));
      if (intake) {
        await store.setSetting(abnIntakeKey(customer.id), null);
        await raiseOrUpdateTask(store, customer, {
          reason: `ABN PAPERWORK COLLECTED: ${customer.name ?? customer.waId} has sent their ABN income, expenses and documents. Ready to prepare the return.`,
          severity: 'REVIEW', newContext: intakeSummary(msgs, intake.startedAt), suggestedReply: null,
        });
        await store.audit('system', 'abn_intake_complete', { customerId: customer.id });
      }
    } catch { /* the closing line still goes; the team sees the chat */ }
  }

  if (paidNeverSilent({
    outcomeKind: outcome.kind, reviewNote: outcome.reviewNote, mode,
    paid: customer.paid, state: customer.state, optedOut: customer.optedOut, isLegacy: customer.isLegacy,
    aiPaused: customer.aiPaused, alreadyStored: !!opts.attachmentsOnly, text,
  })) {
    await store.audit('assistant', 'paid_customer_silent_converted', {
      customerId: customer.id, state: customer.state, violations: outcome.guardViolations ?? [],
    }).catch(() => {});
    outcome = {
      ...outcome, kind: 'human_task',
      task: {
        reason: killSwitch
          ? `${customer.name ?? customer.waId} (paid) wrote in while Will is paused. Reply by hand.`
          : `${customer.name ?? customer.waId} (paid) wrote in and Will had nothing to say. Reply by hand.`,
        severity: 'REVIEW', suggestedReply: undefined,
      },
    };
  }

  // ── "They said they paid" — moves the stage in EVERY language. ────────────
  //
  // Jo, 29 Aug: whatever language the customer wrote in, the moment the
  // "payment received" step happens they must move to Paid. That already worked
  // for a screenshot (handlePaymentProofMedia) and it worked in English by text,
  // but a text-only "ich habe bezahlt" / "支払いました" moved the stage ONLY if
  // the model happened to set new_state itself — which it did reliably in
  // English and not in every language. So the move is no longer left to the
  // model's memory: if the customer plainly reports a payment (claimsPayment
  // covers EN/ES/PT/DE/IT/FR/JA and refuses "it was declined" and questions) and
  // a payment is actually outstanding, the Paid transition is attached to
  // whatever reply Will produced. The existing machinery then applies it exactly
  // as before — on auto-send, on approval of the draft, or when the delayed
  // autopilot reply goes out — including the Paid -> Form Pending cascade. This
  // is the same trust rule as the screenshot path, made language-proof.
  // One payment, one confirmation (Jo, 23 Oct, +49 160): the screenshot may
  // have confirmed this payment while this reply was being written. Read the
  // customer as they are NOW, and never confirm a second time.
  let paidNow = customer.paid;
  let alreadyConfirmed = false;
  try {
    paidNow = (await store.getCustomerById(customer.id))?.paid ?? customer.paid;
    alreadyConfirmed = confirmationAlreadyOut(await store.listMessages(customer.id), { includePending: true });
  } catch { /* fall back to the row we had */ }
  if (!alreadyConfirmed && paymentClaimForcesPaid({
    paid: paidNow, state: customer.state,
    outcomeKind: outcome.kind, outcomeNewState: outcome.newState,
    hasReply: !!outcome.replyText, text,
  })) {
    outcome.newState = 'PAID';
    outcome.stateChanged = true;
    await store.audit('system', 'payment_claim_advanced_stage', {
      customerId: customer.id, from: customer.state, lang: customer.lang ?? null,
    }).catch(() => {});
    // The forced move exists for the case where the model answered
    // conversationally ("Danke! Ich sage dem Team Bescheid") without the form.
    // Paid cascades to Form Pending and arms the form reminders, so a reply
    // with no form link left the customer chased for a form they never got.
    // The screenshot route always sends the approved payment received body;
    // this route now does the same when the model's reply lacks the link
    // (audit, 5 Sep). Same Library first helper, same text, nothing new.
    const withForm = withPaymentReceivedIfNoForm(outcome.replyText, await paymentReceivedBody(store, customer.lang));
    if (withForm !== outcome.replyText) {
      outcome.replyText = withForm;
      await store.audit('system', 'payment_received_appended', {
        customerId: customer.id, lang: customer.lang ?? null,
      }).catch(() => {});
    }
  }

  // ── Second set of eyes: REMOVED ──────────────────────────────────────────
  //
  // Jo, 31 Aug: "completely, completely disable the agent that writes the
  // unnecessary summary under the task." The reviewer wrote a note on every task
  // and draft (often plain wrong, e.g. accusing Will of giving tax advice it did
  // not give) and held too much in Autopilot. It is gone from the send path
  // entirely, not just gated behind a flag, so no reviewer note can ever be
  // attached to a message or a task again.
  //
  // The deterministic Policy Guard is UNCHANGED and still blocks every hard
  // violation (refund figures, tax determinations, myGov help, price changes)
  // before anything is sent. That is the safety net; the AI reviewer was only an
  // extra layer, and the owner did not want it.

  // AI-04: infer the quoted product from the fee actually present in the reply,
  // not exact-string-equality with the template (the model is told to adapt the
  // opening wording, which broke exact matching). $385 => TFN+ABN, $220 => TFN.
  // If BOTH appear (e.g. a generic pricing explainer) it is ambiguous => null,
  // so we never mislabel income from a message that merely lists both prices.
  const inferIncome = (t: string): 'TFN' | 'TFN_ABN' | null => {
    const has385 = /\$\s?(?:385|495)\b/.test(t);
    const has220 = /\$\s?(?:220|330)\b/.test(t);
    if (has385 && !has220) return 'TFN_ABN';
    if (has220 && !has385) return 'TFN';
    return null;
  };

  let pendingMessageId: string | undefined;

  // The deferred Autopilot reply goes out now, not into the queue: the wait
  // already happened. Right before it leaves, one more look at the clock: if
  // the customer wrote again while the model was thinking, this answer is to
  // an older version of the conversation. The newer message armed its own
  // timer, so drop this one rather than talk past them.
  if (opts.sendNow && outcome.kind === 'queued') {
    if (await supersededByNewerTimer(store, customer.id, { id: opts.jobId, runAt: opts.jobRunAt, createdAt: opts.jobCreatedAt })) {
      await store.audit('assistant', 'auto_reply_superseded', { customerId: customer.id, anchorAt: opts.anchorAt ?? null });
      return { outcome: { kind: 'silent', decision: outcome.decision } };
    }
    outcome.kind = 'sent';
  }

  // NEVER A SILENT REPEAT (Jo, 24 Oct, +353 85): she corrected "I never
  // worked under an ABN. Just TFN" and Will produced the very same $385
  // message he had sent two minutes earlier. deliverOut drops an AI message
  // that already went out word for word, so she got nothing at all and
  // nobody knew. A reply to a new message that only repeats what was already
  // sent goes to the team instead, with what she wrote.
  if (outcome.replyText && (outcome.kind === 'sent' || outcome.kind === 'queued' || outcome.kind === 'pending_approval')
      && !['thanks', 'documents_received'].includes(outcome.decision?.approved_key ?? '')) {
    try {
      if (await wasAlreadySentVerbatim(store, customer.id, outcome.replyText)) {
        await store.audit('assistant', 'reply_repeats_sent_message', { customerId: customer.id, preview: outcome.replyText.slice(0, 120) });
        await raiseOrUpdateTask(store, customer, {
          reason: 'Will was about to repeat a message he already sent, word for word, in answer to a new message. They are waiting for a reply.',
          severity: 'REVIEW', newContext: text.slice(0, 500), suggestedReply: null,
        });
        return { outcome: { ...outcome, kind: 'human_task' } };
      }
    } catch { /* the normal path still runs */ }
  }

  if (outcome.kind === 'sent' && outcome.replyText) {
    // apply state + income ONLY when actually sent, which means AFTER
    // deliverOut reports ok, not before it is attempted (audit, 5 Sep): the
    // stage and income used to move here first, so a send Meta rejected left
    // the board a step ahead of what the customer had actually received. The
    // queued path in the scheduler already applies them after the send; this
    // branch now does the same.
    // deliverOut REPORTS a rejection, it does not throw. Discarding that made a
    // throttled or refused autopilot send read as "· autopilot reply" on the
    // tick while the customer got nothing (audit, 4 Sep). A non-retryable
    // rejection is deliverOut's one task, written here in Will's words
    // (audit, 5 Sep: this used to raiseOrUpdateTask AFTER deliverOut had
    // already opened its own card, which overwrote that card's reason; the
    // retryable case never reaches a task at all, it re-arms below).
    //
    // Jo, 17 Sep: "I want the button every time, always" — when this reply is
    // the payment confirmation (outcome.newState === 'PAID'), it now also
    // tries the Meta-approved template (metaTemplateLang: English/German/
    // Japanese), same as the manual "Mark Paid" button and the trusted
    // auto-detect path (handlePaymentProofMedia, further down this file).
    // fallbackToText keeps this exactly as safe as before when the template
    // is not yet approved for this language: deliverOut still sends
    // outcome.replyText as free text. KNOWN TRADE-OFF, on Jo's instruction:
    // outcome.replyText here is the model's own live reply, which can
    // legitimately combine the confirmation with an answer to something else
    // the customer asked in the same breath — when the template attempt DOES
    // succeed, the customer receives Meta's fixed confirmation wording only,
    // not that extra content. It is not lost from the chat record (still
    // logged as this message's body), only from what reaches their phone
    // this send.
    const isPaymentConfirmation = outcome.newState === 'PAID';
    const out = await deliverOut(customer, outcome.replyText, 'AI', undefined,
      isPaymentConfirmation
        ? { name: paymentReceivedTemplateKey(metaTemplateLang(customer.lang)), params: [], lang: customer.lang, fallbackToText: true }
        : undefined,
      {
        onFailure: {
          reason: (e) => `Will's reply was not delivered: ${e ?? 'WhatsApp rejected it'}. They are waiting with no answer.`,
          severity: 'URGENT', context: text.slice(0, 200),
        },
      });
    if (!out.ok) {
      await store.audit('channel', 'auto_reply_send_failed', {
        customerId: customer.id, error: out.error ?? 'unknown error', retryable: !!out.retryable,
      }).catch(() => { /* the store is a likely thing to have just failed */ });
      if (out.retryable) {
        // A throttle or a transient Meta error is not a reason to hand the chat
        // to a person: it is a reason to try again in a minute. The timer is
        // re-armed with the same anchor, so the next run answers the same burst
        // (it will not be treated as answered, because nothing was sent).
        await armAutoReply(store, customer).catch(() => { /* the task below is the backstop */ });
        await store.audit('assistant', 'auto_reply_rearmed_after_throttle', { customerId: customer.id }).catch(() => {});
        return { outcome: { ...outcome, kind: 'silent' } };
      }
      return { outcome: { ...outcome, kind: 'human_task' } };
    }
    if (outcome.newState) {
      await store.setState(customer.id, outcome.newState, 'AI');
      if (outcome.newState === 'PAID') await autoAdvanceToForm(customer.id, bank);
    }
    const inc = inferIncome(outcome.replyText);
    if (inc) await store.updateCustomer(customer.id, { income: inc });
  } else if (outcome.kind === 'queued' && outcome.replyText) {
    // Autopilot with a human pause. The reply is finished and correct now, but
    // it does not leave for AUTOPILOT_REPLY_DELAY_SECONDS: an instant answer
    // reads as a machine. It is parked as QUEUED so it is visible in the chat
    // and can be discarded, and the scheduler transmits it when the time comes.
    //
    // Nothing about the customer changes yet. The state and income the reply
    // presupposes are recorded on the message and applied at the moment it is
    // actually sent, exactly as the approval path does, so a reply that never
    // goes out cannot leave the pipeline advanced.
    const inc = inferIncome(outcome.replyText);
    const m = await store.addMessage({
      customerId: customer.id, direction: 'OUT', author: 'AI', status: 'QUEUED',
      body: outcome.replyText,
      meta: { proposedState: outcome.newState, income: inc ?? undefined, review: outcome.reviewNote },
    });
    await store.addJob({
      customerId: customer.id, kind: 'AUTO_REPLY', payload: { messageId: m.id },
      runAt: new Date(Date.now() + autopilotReplyDelaySeconds() * 1000).toISOString(),
    });
    pendingMessageId = m.id;
  } else if (outcome.kind === 'pending_approval' && outcome.replyText) {
    // This new draft was written against the FULL conversation (every message the
    // customer has sent so far). Any earlier draft still awaiting approval saw
    // less, so it is now stale — discard it. That leaves exactly ONE current
    // proposal, sitting at the bottom of the thread, instead of a stale one
    // stranded above messages it never read.
    try {
      const prior = await store.listMessages(customer.id);
      const pendingDrafts = prior.filter((pm) => pm.direction === 'OUT' && pm.status === 'PENDING_APPROVAL');
      // One of those drafts is not stale: the "payment received" confirmation
      // the screenshot path drafted in Approval mode (proposedState PAID). It
      // answers the receipt, not the customer's question, so the customer
      // typing "when will I hear back?" after the receipt produced a second
      // draft that discarded it silently: Jo approved the visible answer, the
      // customer stayed unpaid at PRICE_SENT and the open payment task pointed
      // at a draft that no longer existed (audit, 5 Sep). Fold it into the new
      // draft instead: PAID is carried forward and the identical confirmation
      // is appended when the reply lacks the form link, the same helper the
      // typed "I paid" route already uses. One draft, one approval, and the
      // customer receives exactly the same words on it.
      if (!customer.paid && outcome.newState !== 'PAID') {
        const confirmation = await paymentReceivedBody(store, customer.lang);
        const carried = pendingDrafts.find((pm) => isPaymentReceivedDraft(pm, [confirmation]));
        if (carried) {
          outcome.newState = 'PAID';
          outcome.stateChanged = true;
          outcome.replyText = withPaymentReceivedIfNoForm(outcome.replyText, confirmation);
          await store.audit('system', 'payment_received_carried_forward', {
            customerId: customer.id, from: carried.id,
          }).catch(() => {});
        }
      }
      for (const pm of pendingDrafts) {
        await store.setMessageStatus(pm.id, 'DISCARDED');
      }
    } catch { /* non-blocking: worst case a stale draft lingers, never a wrong send */ }
    // Defer the state/income change until the owner approves (stored on the message).
    const inc = inferIncome(outcome.replyText);
    // Jo, 17 Sep: "I want the button every time, always" — the approve action
    // (actions/route.ts) already knows how to send a draft's meta.waTemplate
    // when present, exactly like a scheduled system line; it was simply never
    // given one for this draft, so a Jo-approved payment confirmation always
    // went out as plain text. Same metaTemplateLang capping, same
    // fallbackToText safety net, same KNOWN TRADE-OFF as the live-send branch
    // above (outcome.replyText can combine the confirmation with an answer to
    // something else the customer asked; a successful template send only
    // delivers Meta's fixed confirmation wording, not that extra content).
    const waTemplate = outcome.newState === 'PAID'
      ? { name: paymentReceivedTemplateKey(metaTemplateLang(customer.lang)), params: [], lang: customer.lang, fallbackToText: true }
      : undefined;
    const m = await store.addMessage({
      customerId: customer.id, direction: 'OUT', author: 'AI', status: 'PENDING_APPROVAL',
      body: outcome.replyText,
      meta: { proposedState: outcome.newState, income: inc ?? undefined, review: outcome.reviewNote, waTemplate },
    });
    pendingMessageId = m.id;
  } else if (outcome.kind === 'human_task' && outcome.task) {
    // WHY (Jo, 24 Sep): the task carries a full account of why Will could not
    // answer, so a screenshot of it is enough to fix the cause. See
    // handoff-diagnostic.ts. The reviewer's note rides inside it.
    const decision = outcome.decision;
    const modelChose = decision.action === 'human_task' && !outcome.guardViolations?.length;
    const nearest = knowledge.length ? null : await Promise.resolve().then(() => nearestKnowledge(text, { lang: customer.lang ?? undefined })).catch(() => null);
    const diagnostic = buildHandoffDiagnostic({
      customerText: text, lang: customer.lang, state: customer.state, paid: customer.paid, income: customer.income,
      decision, knowledgeUsed: knowledge.map((k) => k.intent), nearest,
      guardViolations: outcome.guardViolations, reviewNote: outcome.reviewNote,
      engineReason: modelChose ? undefined : outcome.task.reason,
    });
    const taskContext = taskContextWithDiagnostic(text, diagnostic);
    await raiseOrUpdateTask(store, customer, {
      reason: outcome.task.reason, severity: outcome.task.severity,
      newContext: taskContext, suggestedReply: outcome.task.suggestedReply ?? null,
    });
    await store.audit('assistant', 'human_task_created', { reason: outcome.task.reason, diagnostic });
  } else if (outcome.kind === 'silent' && outcome.guardViolations?.includes('AI_PAUSED_FOR_CUSTOMER')) {
    // Will is switched off for this customer — either Jo took the wheel by
    // hand, or the auto-off-at-Review rule fired (Jo, 6 Sep). Either way the
    // message is already stored above like any other; Will stays completely
    // silent (no draft, no auto-reply of any kind) and a task opens (or
    // folds into the one already open) so Jo sees it and picks it up himself.
    await raiseOrUpdateTask(store, customer, {
      reason: `${customer.name ?? customer.waId} wrote in while Will is switched off for them — reply by hand.`,
      severity: 'REVIEW', newContext: text.slice(0, 300), suggestedReply: null,
    });
    await store.audit('assistant', 'message_while_ai_paused', { customerId: customer.id });
  }

  // ── The long message that is now waiting on a person ─────────────────────
  //
  // Jo, 28 Aug: somebody who writes eight paragraphs and gets silence has no
  // way to tell whether it even arrived. If he has not answered within half an
  // hour, the approved holding line goes out by itself.
  //
  // THE TWO CONDITIONS, BOTH REQUIRED. Only for a long, complicated message,
  // and only on Autopilot. In Approval mode nothing reaches a customer without
  // him, and quietly making an exception to that would be the worst kind of
  // surprise. The job itself checks again at fire time that he has still not
  // replied, so answering in the first ten minutes cancels it in effect.
  //
  // 1 Oct (72-hour audit): the courtesy was limited to long messages, so 30+
  // customers whose question was handed to a person heard NOTHING for 2 to
  // 70 hours (Naatt 41 h on an angry estimate dispute, Simon 23 h after
  // paying, Reo 36 h on a first enquiry). On Autopilot, EVERY handoff now
  // sends the bridge line, with the same 1 to 5 minute delay as a reply, so
  // the customer knows a person has it. A long message handed off in
  // Approval mode keeps the old half-hour courtesy.
  if (outcome.kind === 'human_task' && mode === 'FULL_AUTO' && !isClosingOnly(text)) {
    try {
      await store.addJob({
        customerId: customer.id, kind: 'HANDOFF_ACK', payload: {},
        runAt: new Date(Date.now() + autopilotReplyDelaySeconds() * 1000).toISOString(),
      });
    } catch { /* the task is raised either way; the acknowledgement is a courtesy */ }
  } else if (outcome.kind === 'pending_approval' && mode === 'FULL_AUTO' && isLongComplicatedMessage(text)) {
    try {
      await store.addJob({
        customerId: customer.id, kind: 'HANDOFF_ACK', payload: {},
        runAt: new Date(Date.now() + HANDOFF_ACK_DELAY_MS).toISOString(),
      });
    } catch { /* the task is raised either way; the acknowledgement is a courtesy */ }
  }
  if (outcome.guardViolations?.length) {
    await store.audit('policy_guard', 'reply_blocked', { violations: outcome.guardViolations });
  }

  // Decision log: one structured entry per handled message, so the owner can see
  // WHAT Will decided, WHICH learned answers it drew on, and the guard verdict.
  await store.audit('assistant', 'decision', {
    action: outcome.kind,
    fromState: customer.state,
    newState: outcome.newState ?? null,
    knowledgeUsed: knowledge.map((k) => k.intent),
    guard: outcome.guardViolations?.length ? { blocked: true, violations: outcome.guardViolations } : { blocked: false },
    preview: outcome.replyText ? outcome.replyText.slice(0, 160) : null,
    customerId: customer.id,
  });

  return { outcome, pendingMessageId };
}

/** Another timer owns the answer now: a newer TEXT message re-armed one
 *  (armAutoReply cancels the SCHEDULED predecessor, but a timer that is
 *  already running when the message lands has to notice by itself). This is
 *  deliberately NOT "a newer inbound message exists": a 👍 reaction, a voice
 *  note or a sticker between the question and the timer is stored as an
 *  inbound message too, and reading those as supersession dropped the reply
 *  with nothing to replace it, so the question was never answered (audit,
 *  3 Sep). Only a text arms a timer, so only a newer timer supersedes. */
async function supersededByNewerTimer(
  store: Store, customerId: string, self?: { id?: string; runAt?: string; createdAt?: string | null },
): Promise<boolean> {
  try {
    const jobs = await store.listJobsForCustomer(customerId, ['AUTO_REPLY']);
    // CLAIMED counts too (audit, 4 Sep). Two ticks can run at once — the Vercel
    // cron and the dashboard's own tick, or two warm instances — and each can
    // claim one of two timers armed a moment apart. Looking only for SCHEDULED
    // meant neither run saw the other, both called the model, and the customer
    // got two replies to the same burst. `self.id` keeps a run from reading
    // its own claimed row as a rival.
    //
    // STRICTLY newer, not merely "another" (audit3 core 32, 5 Sep). With two
    // CLAIMED timers and no ordering, each run saw the other as its rival,
    // both stood aside, both rows went CANCELLED, and the burst was never
    // answered: no reply, no task, two audit lines nobody reads. Ordering by
    // run_at (then created_at, then id as the last tie-break) means exactly
    // one of the two survives. A rival with no run_at is treated as newer, the
    // same as before.
    //
    // created_at sits between run_at and id (audit3 core 39, 5 Sep): ids are
    // random UUIDs, so with equal run_at (two webhook invocations in the same
    // second) the id alone picked a winner at random. The later-created timer
    // is the one the later message armed, so it is the one that should answer.
    // Both orderings still leave exactly one survivor.
    const stamp = (s?: string | null) => (s ? new Date(s).getTime() : NaN);
    const selfRunAt = stamp(self?.runAt);
    const selfCreatedAt = stamp(self?.createdAt);
    const isNewer = (j: JobRow) => {
      if (Number.isNaN(selfRunAt) || !j.runAt) return true;
      const t = stamp(j.runAt);
      if (Number.isNaN(t) || t > selfRunAt) return true;
      if (t < selfRunAt) return false;
      const c = stamp(j.createdAt);
      if (!Number.isNaN(c) && !Number.isNaN(selfCreatedAt) && c !== selfCreatedAt) return c > selfCreatedAt;
      return !self?.id || j.id > self.id;
    };
    return jobs.some((j) => (j.status === 'SCHEDULED' || j.status === 'CLAIMED')
      && !!j.payload.debounce && j.id !== self?.id && isNewer(j));
  } catch {
    return false; // a store hiccup must not silence a reply that is ready
  }
}

/** The text a deferred reply answers: everything the customer wrote since we
 *  last said anything, oldest first, so a burst reads as one message. Falls
 *  back to the latest inbound line when the thread has no outbound at all. */
export function burstMessages(msgs: MessageRow[]): MessageRow[] {
  const sent = msgs.filter((m) => m.status === 'SENT');
  let lastOut = -1;
  for (let i = sent.length - 1; i >= 0; i--) {
    if (sent[i].direction === 'OUT') { lastOut = i; break; }
  }
  const burst = sent.slice(lastOut + 1).filter((m) => m.direction === 'IN' && m.body.trim());
  if (burst.length) return burst;
  const lastIn = [...sent].reverse().find((m) => m.direction === 'IN');
  return lastIn ? [lastIn] : [];
}

export function burstText(msgs: MessageRow[]): string {
  return burstMessages(msgs).map((m) => m.body.trim()).join('\n');
}

/**
 * Arm (or re-arm) the Autopilot reply timer for this customer.
 *
 * One pending timer per customer: every new message cancels the previous one
 * and starts the two minutes again, so the reply is written only once the
 * customer has been quiet for AUTOPILOT_REPLY_DELAY_SECONDS. The anchor is the
 * customer's last-message time as the STORE recorded it (same clock the
 * supersession check reads), never this process's own clock.
 */
export async function armAutoReply(store: Store, customer: CustomerRow): Promise<{ runAt: string; anchorAt: string | null }> {
  try { await store.cancelJobsFor(customer.id, ['AUTO_REPLY']); } catch { /* a stale timer is dropped at fire time anyway */ }
  const fresh = await store.getCustomerById(customer.id);
  const anchorAt = fresh?.lastCustomerMsgAt ? new Date(fresh.lastCustomerMsgAt).toISOString() : null;
  // Each reply waits its own length; see autopilotReplyDelaySeconds.
  const runAt = new Date(Date.now() + autopilotReplyDelaySeconds() * 1000).toISOString();
  await store.addJob({
    customerId: customer.id, kind: 'AUTO_REPLY', payload: { debounce: true, anchorAt }, runAt,
  });
  return { runAt, anchorAt };
}

/**
 * The timer fired: read everything the customer wrote and answer it, once.
 *
 * Called by the scheduler for an AUTO_REPLY job carrying `debounce`. Everything
 * is re-checked at this moment rather than assumed from two minutes ago: a
 * newer message (its own timer will answer), a reply that already went out (Jo
 * or a template got there first), opt-out, and the mode as it is NOW (switched
 * to Approval in the meantime means a draft, not a send).
 */
/** Words that make a burst more than "here it is / done": a problem, a second
 *  request, a question without a question mark. Used only to decide whether a
 *  system acknowledgement already covered the customer's message. */
const MORE_THAN_A_REPORT = /\b(?:but|also|another|when|how|what|where|why|which|can|could|should|need|problem|issue|error|wrong|missing|forgot|help|not|don'?t|didn'?t|can'?t|cannot|question|aber|auch|wann|wie|warum|problem|fehler|nicht|pero|tambi[ée]n|cu[áa]ndo|mais|aussi|quand|ma|anche|quando|mas|tamb[ée]m)\b|でも|問題|エラー|できない|いつ|どう|なぜ|また|それと/i;

/** How long after a person on our side writes Will stays out of the chat. */
export const TEAM_ACTIVE_MS = 30 * 60 * 1000;

export async function runDeferredAutoReply(
  customer: CustomerRow,
  job: { id?: string; payload: { anchorAt?: string | null }; createdAt?: string | null; runAt: string },
): Promise<'sent' | 'superseded' | 'answered' | 'skipped' | 'decided'> {
  const store = getStore();
  const anchorAt = job.payload.anchorAt ?? null;
  if (customer.optedOut) return 'skipped';
  if (await supersededByNewerTimer(store, customer.id, { id: job.id, runAt: job.runAt, createdAt: job.createdAt })) {
    await store.audit('assistant', 'auto_reply_superseded', { customerId: customer.id, anchorAt });
    return 'superseded';
  }
  const msgs = await store.listMessages(customer.id);
  const since = anchorAt ? new Date(anchorAt).getTime() : new Date(job.createdAt ?? job.runAt).getTime();
  // "Somebody already answered this burst" — but only a REAL answer. A
  // deterministic system line (the payment-received confirmation, the
  // questionnaire acknowledgement, the review request) answers its own trigger,
  // not the customer's question: "here you go, just paid, and how long until
  // the money lands?" plus a screenshot used to end with only "Payment
  // received", the question dropped silently with no task (audit, 4 Sep).
  //
  // Recognised by how it was SENT, not by its words (audit3 core 52, 5 Sep).
  // The text match compared the row against the code constants, but what
  // actually goes out is the Library row for the customer's language, so the
  // moment Jo reworded one variant that language's confirmation stopped
  // matching, counted as a real reply, and "sent the form, also when will I
  // get the money?" was answered with the acknowledgement alone. Every
  // deterministic send now carries `meta.waTemplate` (the Library-keyed
  // sends) or `meta.system` (the two free-text ones), so any language and any
  // wording is seen for what it is. The text match stays only for rows
  // written before this deploy, widened to the ABN and holding lines. A human
  // send is always a real answer, whatever meta it carries.
  const SYSTEM_LINES = [
    ...Object.values(PAYMENT_RECEIVED_MSG), ...Object.values(FORM_RECEIVED_MSG),
    ...Object.values(REQUEST_ABN_MSG), ...Object.values(HANDOFF_HOLDING_MSG),
  ].map((t) => t.slice(0, 40).toLowerCase());
  const isSystemLine = (m: MessageRow) => m.author !== 'HUMAN'
    && (!!m.meta?.waTemplate || m.meta?.system === true
      || SYSTEM_LINES.some((p) => (m.body ?? '').slice(0, 40).toLowerCase() === p));
  const answered = msgs.some((m) => m.direction === 'OUT' && m.status === 'SENT'
    && new Date(m.createdAt).getTime() >= since && !isSystemLine(m));
  if (answered) {
    await store.audit('assistant', 'auto_reply_already_answered', { customerId: customer.id, anchorAt });
    return 'answered';
  }
  // 1 Oct (72-hour audit, Laura +353 87): "Got it, thank you! The team will
  // review all of these receipts" landed BETWEEN two messages the team was
  // typing in a live conversation. When a person on our side has written in
  // the last 30 minutes, the chat is theirs: Will stays out of it.
  //
  // Jo, 21 Oct (Janos +61 439): Jo sent "Your tax return has been lodged
  // successfully!" himself, Janos answered "Thanks!" seven minutes later, and
  // nobody replied: the 30-minute rule held Will back and opened no task. A
  // plain thank-you is not a live conversation to stay out of. It gets Will's
  // one short line (still after the usual delay, and still not if Jo answers
  // it himself first: the "answered" check above). Anything with substance
  // still waits for the team.
  const text = burstText(msgs);
  if (!text.trim()) return 'skipped';
  const plainThanks = isClosingOnly(text) && containsThanks(text);
  const teamActive = msgs.some((m) => m.direction === 'OUT' && m.author === 'HUMAN'
    && Date.now() - new Date(m.createdAt).getTime() < TEAM_ACTIVE_MS);
  if (teamActive && !plainThanks) {
    // Jo, 22 Oct (Danielle +44 7930): Jo answered at 15:44, she asked "Is
    // the eligibility check free?" at 16:06, and nothing ever answered it:
    // this check stood Will aside and nothing was scheduled. Will still stays
    // out of a live conversation, but the question is not dropped: the timer
    // is re-armed for the moment the 30 minutes since Jo's last message are
    // up. If Jo answers first, the "answered" check above skips it.
    const lastHumanAt = Math.max(...msgs
      .filter((m) => m.direction === 'OUT' && m.author === 'HUMAN')
      .map((m) => new Date(m.createdAt).getTime()));
    const deferrals = Number((job.payload as { attempt?: number }).attempt ?? 0); // capped, so a chat Jo keeps writing in cannot re-arm forever
    if (Number.isFinite(lastHumanAt) && deferrals < 6) {
      const runAt = new Date(lastHumanAt + TEAM_ACTIVE_MS + 60 * 1000).toISOString();
      try {
        await store.addJob({
          customerId: customer.id, kind: 'AUTO_REPLY',
          payload: { debounce: true, anchorAt, attempt: deferrals + 1 }, runAt,
        });
        await store.audit('assistant', 'auto_reply_deferred_team_active', { customerId: customer.id, anchorAt, runAt });
        return 'skipped';
      } catch { /* fall through to the old behaviour: stay out */ }
    }
    await store.audit('assistant', 'auto_reply_skipped_team_active', { customerId: customer.id, anchorAt });
    return 'answered';
  }
  // A screenshot payment confirms instantly and this timer still fires two
  // minutes later on the same burst. burstText falls back to the photo's own
  // caption when nothing followed it, so a burst that is nothing but the
  // payment report ("paid!", the receipt's caption) reached decideAndAct and
  // spent a model call answering a question nobody asked, landing a second,
  // redundant bubble right under the confirmation. Only a pure report is
  // skipped here: a "?" anywhere in the burst still falls through to the
  // model as before (audit3 core 57, 5 Sep).
  const PAYMENT_RECEIVED_PREFIXES = Object.values(PAYMENT_RECEIVED_MSG).map((t) => t.slice(0, 40).toLowerCase());
  const paymentConfirmationSent = msgs.some((m) => m.direction === 'OUT' && m.status === 'SENT'
    && m.author !== 'HUMAN' && new Date(m.createdAt).getTime() >= since
    && (m.meta?.waTemplate?.name?.startsWith('payment_received')
      || PAYMENT_RECEIVED_PREFIXES.some((p) => (m.body ?? '').slice(0, 40).toLowerCase() === p)));
  let deferredMode: DecisionMode = 'legacy';
  try { deferredMode = resolveDecisionMode(await store.getSetting(DECISION_MODE_KEY)); } catch { deferredMode = 'legacy'; }
  // In 'will' mode the two checks below (decided by the words) are Will's to
  // make: he sees the confirmation right above and chooses to wait or answer.
  if (deferredMode !== 'will' && paymentConfirmationSent && !/[?？]/.test(text) && claimsPayment(text, { hasAttachment: true })) {
    await store.audit('assistant', 'auto_reply_already_answered', { customerId: customer.id, anchorAt, reason: 'payment_report_only' });
    return 'answered';
  }
  // Jo, 22 Oct (+39 342): "Hi! I've just sent through my form 😊" got the
  // questionnaire acknowledgement at 20:10 and then, at 20:15, Will's own
  // "Thanks! The team will now review everything and get back to you soon."
  // A system line is not counted as an answer above, on purpose, so a QUESTION
  // sent with the form is still answered. But when the burst is only the
  // report the system line already answered (no question, nothing else asked
  // or wrong), a second acknowledgement is just a repeat.
  const coveredBySystemLine = msgs.some((m) => m.direction === 'OUT' && m.status === 'SENT'
    && new Date(m.createdAt).getTime() >= since && isSystemLine(m));
  if (deferredMode !== 'will' && coveredBySystemLine && text.length <= 200 && !/[?？]/.test(text) && !MORE_THAN_A_REPORT.test(text)) {
    await store.audit('assistant', 'auto_reply_covered_by_system_line', { customerId: customer.id, anchorAt });
    return 'answered';
  }
  // The owner's absolute rule, re-checked on the WHOLE burst: no answer to
  // "am I talking to a bot?" may exist, not even as a draft. At ingest it is
  // checked per message; here it is checked on everything the customer wrote
  // in the window, so the question cannot ride in on a second message
  // (audit, 4 Sep).
  if (isIdentityQuestion(text)) {
    await raiseOrUpdateTask(store, customer, {
      reason: 'Customer asked whether they are talking to a bot, needs a human reply',
      severity: 'REVIEW', newContext: text.slice(0, 200), suggestedReply: null,
      forceNullSuggestedReply: true,
    });
    await store.audit('policy_guard', 'identity_question_handoff', { customerId: customer.id, from: 'burst' });
    return 'decided';
  }
  const mode = resolveAiMode(await store.getSetting('ai_mode'));
  const killSwitch = (await store.getSetting('kill_switch')) === true;
  const attachmentsOnly = burstMessages(msgs).every((m) => !!m.meta?.media);
  const { outcome } = await decideAndAct(store, customer, text, mode, { killSwitch, sendNow: mode === 'FULL_AUTO', anchorAt, jobId: job.id, jobRunAt: job.runAt, jobCreatedAt: job.createdAt, attachmentsOnly });
  // The stage may have just moved (a price sent, a payment confirmed and the
  // form requested), and the follow-up cadence belongs to the NEW stage: a
  // customer who was just asked for the form needs the form reminders, not
  // the pre-payment ones. Same best-effort rule as the immediate path.
  const fresh = await store.getCustomerById(customer.id);
  if (fresh) {
    try { await reconcileSchedule(fresh); } catch (e) {
      await store.audit('scheduler', 'reconcile_failed_after_send', {
        customerId: customer.id,
        error: e instanceof Error ? e.message.slice(0, 200) : String(e).slice(0, 200),
      }).catch(() => { /* the store is the likely thing that just failed */ });
    }
  }
  return outcome.kind === 'sent' ? 'sent' : 'decided';
}

// ============================================================
// A customer message Will cannot read as text: a photo, a voice note, or a
// Coexistence `unsupported` payload with no recoverable body. Will never replies
// to these (there is nothing to reason about), but the customer must stay
// visible: create the contact if new, drop the placeholder into the thread, and
// raise ONE task so a human opens WhatsApp and answers. Deliberately does NOT run
// the AI engine, the daily budget, or the returning-contact filter — a task is
// safe for any sender, and the whole point is that nothing gets lost.
// ============================================================
export async function handleInboundNote(
  waId: string,
  body: string,
  meta?: {
    name?: string;
    /** The attachment, when the message carried one. Stored on the message so
     *  the dashboard can show the actual photo or document instead of only the
     *  "[Photo]" placeholder. */
    media?: { id: string; kind: string; mime?: string; filename?: string; caption?: string };
    /** Set when the message is a reaction to one of ours. A reaction is not
     *  something a human needs to answer, so it is recorded in the thread and
     *  raises no task. */
    reaction?: { emoji: string | null; to?: string };
    /**
     * What Meta actually called this, for a message that carried no text and no
     * media. Jo, 27 Aug: a customer edited a typo, Meta delivered the edit as a
     * bodiless event, and the card could only say "voice note or unsupported
     * type" — which was wrong (it was neither) and told nobody anything.
     *
     * The type and the error code were already written to will_audit and were
     * unreadable without SQL. They now travel to the task as well, so the next
     * occurrence explains itself on the Decision Log card and the exact cause
     * can be fixed rather than guessed at.
     */
    undecoded?: { type?: string; errorCode?: number | null; errorTitle?: string | null };
    /** The customer's WhatsApp message id, so a reaction they later add to this
     *  photo/document can be matched back to its bubble. Not stored on a reaction
     *  event itself (that carries its target in `reaction.to`). */
    providerId?: string;
  },
): Promise<CustomerRow> {
  const store = getStore();
  let customer = await store.getCustomerByWaId(waId);
  if (!customer) {
    try {
      customer = await store.createCustomer({ waId, name: meta?.name ?? null, flag: '💬' });
      await store.audit('system', 'customer_created', { waId });
      await resolvePendingFormLinkOnNewCustomer(store, customer);
    } catch {
      // This path runs outside the per-customer mutex, so a text message for the
      // same brand-new number can create the row a moment earlier and win the
      // wa_id UNIQUE constraint. That is not an error: re-fetch the row the other
      // write created and carry on, so the note is still stored, never dropped.
      customer = await store.getCustomerByWaId(waId);
      if (!customer) throw new Error('customer create raced and re-fetch failed');
    }
  }
  // Same rule as the text path (handleIncoming): a closed customer (Went
  // Cold / Not Interested / Not Relevant) who sends anything at all — a
  // photo, a voice note, a document — is no longer closed and moves straight
  // back to Lead. A bare reaction (👍 on an old message) is too small a
  // signal to count as "messaged again", so it is excluded.
  const wasClosed = ['NOT_INTERESTED', 'WENT_COLD', 'NOT_RELEVANT', 'FINAL'].includes(customer.state);
  if (wasClosed && !meta?.reaction) {
    const target = reopenTarget(customer);
    await store.setState(customer.id, target, 'SYSTEM');
    await store.audit('system', 'reactivated_to_lead', { customerId: customer.id, from: customer.state, to: target, trigger: 'inbound_media' });
    customer = (await store.getCustomerByWaId(waId)) ?? customer;
  }
  await store.addMessage({
    customerId: customer.id, direction: 'IN', author: 'CUSTOMER', status: 'SENT', body,
    meta: (meta?.media || meta?.reaction || (meta?.providerId && !meta?.reaction))
      ? {
          ...(meta.media ? { media: meta.media } : {}),
          ...(meta.reaction ? { reaction: meta.reaction } : {}),
          // A reaction event stores its target in reaction.to, not providerId.
          ...(meta.providerId && !meta.reaction ? { providerId: meta.providerId } : {}),
        }
      : undefined,
  });
  // A reaction needs no reply, so it does not open a task — it is shown in the
  // thread and that is the whole of it. Raising one here was what buried the
  // real "cannot read this" tasks under a pile of thumbs-ups.
  if (meta?.reaction) return (await store.getCustomerByWaId(waId)) ?? customer;
  // Owner's rule: 20 invoice photos in a row is ONE task to open, not 20 —
  // raiseOrUpdateTask folds this into whatever task is already open for this
  // customer instead of creating a fresh one per attachment.
  // The two cases were one reason string, which made a voice note and a
  // WhatsApp event Meta could not render look like the same problem. They are
  // not: one needs somebody to listen to it, the other is usually not a message
  // from the customer at all. Where Meta told us what it was, the reason says
  // so — that is the line that turns the next card into a diagnosis.
  // Jo, 28 Aug: files arriving from someone who has ALREADY PAID are not a
  // problem to solve, they are the paperwork we asked for. Six of the sixteen
  // cards on the board that morning were one paid customer's document drop
  // rendered as an emergency: fifty lines of "📄 [Document: OptusInvoice.pdf]"
  // under a reason that read like something had gone wrong. That collapses to
  // one small task with a count, and a short acknowledgement so they are not
  // left on read while the owner works through the pile.
  // 16 Oct (Jo): during the ABN intake, a file is part of the conversation:
  // Will reads it (below) and answers in context, acknowledging it and asking
  // for the next missing thing, instead of the generic "got it all" + task.
  let intakeActive = false;
  try { intakeActive = !!readIntake(await store.getSetting(abnIntakeKey(customer.id))); } catch { intakeActive = false; }
  // 20 Oct (Hannah, +49 176: four files, and a question about tax on her
  // T-shirt and monthly fees). A file with a question in its caption is not
  // paperwork alone, so it goes to the normal answer path instead of the drop.
  if (meta?.media && hasQuestionOrRequest(body)) intakeActive = true; // a question with the file is answered, not dropped
  if (meta?.media && isAfterPayment(customer.state) && !intakeActive) {
    // Jo, 21 Oct (+81 70 5498): a second screenshot of the SAME payment, sent
    // while the "payment received" reply is still waiting its few minutes, is
    // not paperwork. It used to get "完璧です、すべて受け取りました" at once,
    // ahead of the payment confirmation, plus a "Paid customer sent a file"
    // task. Now it is kept in the thread and nothing else: the confirmation
    // (with the form link) answers it. See isPaymentBurst in document-drop.ts.
    let burst = false;
    try {
      const pendingOutbound = typeof store.listPendingOutbound === 'function'
        ? await store.listPendingOutbound(customer.id) : [];
      const history = typeof store.history === 'function' ? await store.history(customer.id) : [];
      burst = isPaymentBurst({ pendingOutbound, history });
    } catch { burst = false; }
    if (burst) {
      await store.audit('system', 'payment_burst_media_absorbed', { customerId: customer.id, kind: meta.media.kind });
      return (await store.getCustomerByWaId(waId)) ?? customer;
    }
    const ack = await suggestReply('', customer, 'documents_after_payment');

    // Jo, 15 Sep: a paid customer sending proof that something they applied
    // for (a Medicare exemption, an MES, any myGov/Services Australia form)
    // went through does not need a person to open it — Claude can see a
    // "Success" screen as well as a person can. Real case: an MES
    // application-submitted screenshot opened a "Paid customer sent a file"
    // REVIEW card for something that needed no review at all. Gated the same
    // way the payment-proof check is: never on a budget-exhausted day, never
    // when the media cannot be downloaded, and an uncertain/failed answer
    // from the model falls straight through to the ordinary task below —
    // this only ever REMOVES a task, never invents a reason to skip one.
    let skipTask = false;
    try {
      if (!(await aiBudgetExhausted())) {
        const fetched = await fetchWaMedia(meta.media.id);
        if (fetched.ok) {
          const confirmation = await assessSuccessConfirmationImage(fetched.body, fetched.mime || meta.media.mime || '');
          await store.audit('system', 'success_confirmation_checked', {
            customerId: customer.id, isConfirmation: confirmation.isConfirmation, reason: confirmation.reason ?? null,
          });
          skipTask = confirmation.isConfirmation;
        }
      }
    } catch { /* the ordinary document-drop task below is the fallback */ }

    if (!skipTask) {
      await raiseOrUpdateTask(store, customer, {
        reason: documentDropReason(1), severity: 'REVIEW', newContext: body,
        fold: (existing) => foldDocumentDrop(existing, body),
        reasonFor: (context) => documentDropReason(documentDropCount(context)),
        suggestedReply: ack,
      });
    }
    // ── AND ACTUALLY SAY IT (Hannah, +44 7944 741456, 4 Sep) ────────────────
    //
    // The acknowledgement was written, attached to the task, and then waited
    // for Jo to click it. So a customer who did exactly what we asked — sent
    // their documents — sat on read until somebody was at the CRM, which on
    // that night meant overnight. There is nothing in this line to get wrong:
    // no amount, no tax, no promise, no next step of theirs. On Autopilot it
    // goes on its own; the task still opens (unless skipTask above), because
    // the files themselves do need collecting.
    //
    // ONCE PER DROP, not once per file: fifty invoices are one arrival. A
    // timestamp in settings is enough — no column, and it survives a restart.
    // 'will' mode (Jo, 22 Oct): no fixed "got it all". The files are part of
    // the conversation (their captions too) and Will answers the batch once,
    // after the usual wait: the acknowledgement, or the question asked with it.
    let docsWill = false;
    try { docsWill = resolveDecisionMode(await store.getSetting(DECISION_MODE_KEY)) === 'will'; } catch { docsWill = false; }
    if (docsWill && !customer.optedOut && !customer.aiPaused && !customer.isLegacy) {
      const docMode = resolveAiMode(await store.getSetting('ai_mode'));
      if (docMode === 'FULL_AUTO') {
        try { await armAutoReply(store, customer); } catch { /* the task is open either way */ }
        await store.audit('system', 'documents_left_to_will', { customerId: customer.id }).catch(() => {});
      }
    } else if (!customer.optedOut && !customer.aiPaused && !customer.isLegacy && ack) {
      try {
        const killSwitch = (await store.getSetting('kill_switch')) === true;
        const autopilot = !requiresApproval(await store.getSetting('ai_mode'));
        const key = `doc_ack_at:${customer.id}`;
        const last = Number((await store.getSetting(key)) ?? 0);
        const fresh = Date.now() - last > 2 * 60 * 60 * 1000;
        if (!killSwitch && autopilot && fresh) {
          // Written BEFORE the send, so two files arriving at once cannot both
          // pass the check and acknowledge twice.
          await store.setSetting(key, Date.now());
          // `system`: this answers the files, not a question sent with them;
          // the deferred reply must not read it as \"already answered\"
          // (audit3 core 52, 5 Sep).
          await deliverOut(customer, ack, 'AI', { system: true });
          await store.audit('system', 'documents_acknowledged', { customerId: customer.id, taskSkipped: skipTask });
        }
      } catch { /* the task is already open; the courtesy line is a bonus */ }
    }
    const paidFresh = await store.getCustomerByWaId(waId);
    return paidFresh ?? customer;
  }

  // ── Read the image/PDF and let Will reply in context (Jo, 31 Aug) ─────────
  // A photo or document that is NOT a payment used to always become a "Will
  // cannot read this" task with a generic "thanks, I'll take a look". Will
  // cannot see images, so now we describe the attachment with vision and feed
  // that description into the SAME reply pipeline a text message uses: in
  // Autopilot Will answers it automatically (the deterministic Policy Guard
  // still blocks anything unsafe), in Approval mode it drafts a context-aware
  // reply. Only real
  // images/PDFs (not voice notes or undecoded events), budget permitting; any
  // failure falls through to the existing task below, so nothing is ever lost.
  const mediaMime = (meta?.media?.mime || '').toLowerCase();
  const readableAttachment = !!meta?.media && !!process.env.ANTHROPIC_API_KEY
    && (mediaMime.startsWith('image/') || mediaMime === 'application/pdf');
  if (readableAttachment) {
    let overBudget = true;
    try { overBudget = await aiBudgetExhausted(); } catch { overBudget = false; }
    if (!overBudget) {
      const fetched = await fetchWaMedia(meta!.media!.id);
      if (fetched.ok) {
        const desc = await describeAttachment(fetched.body, fetched.mime || meta!.media!.mime || '');
        if (desc) {
          const framed = meta!.media!.caption
            ? `[The customer sent an image with the caption "${sanitize(meta!.media!.caption)}". The image shows: ${desc}]`
            : `[The customer sent an image. It shows: ${desc}]`;
          // Recorded as an incoming turn so the model answers it; the photo
          // bubble above it keeps the actual thumbnail.
          await store.addMessage({
            customerId: customer.id, direction: 'IN', author: 'SYSTEM', status: 'SENT', body: framed,
          });
          await store.audit('system', 'attachment_described', { customerId: customer.id, kind: mediaMime });
          const mode = resolveAiMode(await store.getSetting('ai_mode'));
          await handleIncomingInner(waId, framed, mode, { name: meta?.name }, { alreadyStored: true });
          return (await store.getCustomerByWaId(waId)) ?? customer;
        }
      }
    }
  }

  const u = meta?.undecoded;
  const metaDetail = u
    ? [u.type ? `type=${u.type}` : null, u.errorCode ? `error=${u.errorCode}` : null, u.errorTitle]
      .filter(Boolean).join(' ')
    : '';
  // The customer deleted a message before it could be read (WhatsApp "Delete
  // for everyone", Meta's `type: 'revoke'`). Unlike the generic undecoded
  // case below — which is honestly unsure whether a message from the customer
  // arrived at all — this one is certain one did, so neither the task's
  // reason nor the suggested reply should claim otherwise ("may not be a
  // message from them", "it didn't come through on my end").
  const revoked = u?.type === 'revoke';
  if (revoked) {
    // A deleted message is only worth a task when the customer also has an
    // earlier message still open (19 Oct, Hannah: a German question was never
    // answered because the deletion was handled alone). With nothing open,
    // Will stays silent: the customer changed their mind, there is nothing to answer.
    const thread = await store.listMessages(customer.id);
    let lastOut = -1;
    for (let i = thread.length - 1; i >= 0; i--) if (thread[i].direction === 'OUT') { lastOut = i; break; }
    const openIn = thread.slice(lastOut + 1).filter((m) =>
      m.direction === 'IN' && !!m.body && !/\[Message deleted by sender\]/.test(m.body));
    if (openIn.length === 0) {
      await store.audit('system', 'revoked_nothing_open', { customerId: customer.id }).catch(() => {});
      return customer;
    }
  }
  await raiseOrUpdateTask(store, customer, {
    reason: meta?.media
      ? 'Customer sent an attachment Will cannot read. Open the chat to view it and reply.'
      : revoked
        ? 'Customer deleted a message, and an earlier one is still open: read the chat and reply to that.'
        : meta?.undecoded
          ? `WhatsApp delivered an event with no readable text${metaDetail ? ` (${metaDetail})` : ''}. It may not be a message from the customer at all. Open WhatsApp to check.`
          : 'Customer sent a voice note. Open WhatsApp to listen and reply.',
    severity: 'REVIEW', newContext: body,
    // Even here there is something worth proposing: an acknowledgement that the
    // attachment arrived, so the customer is not left on read while the owner
    // opens it.
    // A deleted message gets no canned reply: the open message above needs the
    // real answer, and an English placeholder for a German customer was the
    // bug Hannah's chat showed.
    suggestedReply: revoked ? null : await suggestReply('', customer, meta?.media ? 'attachment' : 'unreadable'),
  });
  const fresh = await store.getCustomerByWaId(waId);
  // A voice note or an unreadable attachment is still the customer talking:
  // the follow-up timer restarts from now, exactly as it does for a text
  // message. Without this, a lead who sent a voice note at hour 23 was nudged
  // with "still want us to take a look?" an hour later, while their message
  // sat unanswered in a task (audit, 3 Sep). Best effort, as everywhere.
  if (fresh) {
    try { await reconcileSchedule(fresh); } catch (e) {
      await store.audit('scheduler', 'reconcile_failed_after_send', {
        customerId: customer.id,
        error: e instanceof Error ? e.message.slice(0, 200) : String(e).slice(0, 200),
      }).catch(() => { /* the store is the likely thing that just failed */ });
    }
  }
  return fresh ?? customer;
}

/** After payment confirmation (form link just sent), move to FORM_PENDING so the
 *  form follow-ups run. A customer who already sent the questionnaire before
 *  paying (form-link.ts remembers it as formComplete) goes straight on to
 *  FORM_COMPLETE, so the form reminders never chase a form we already have. */
export async function autoAdvanceToForm(customerId: string, _bank: { bsb: string; account: string }): Promise<void> {
  const store = getStore();
  const c = await store.getCustomerById(customerId);
  if (!c || c.state !== 'PAID') return;
  await store.setState(customerId, 'FORM_PENDING', 'SYSTEM');
  if (c.formComplete) {
    // The questionnaire is already in: run the same FORM_RECEIVED step the
    // form submission would have triggered now, so the customer gets the
    // "received" confirmation and the ABN questions, the form reminders are
    // cancelled, and the stage moves on to Form Complete.
    await store.addJob({ customerId, kind: 'FORM_RECEIVED', payload: {}, runAt: new Date().toISOString() });
    await store.audit('system', 'form_received_before_payment_applied', { customerId }).catch(() => {});
  }
}

/** States in which a payment is actually outstanding — matches the text-based
 *  "I paid" detection in claude.ts (`looksLikePayment` + `PAYABLE_STATES`).
 *  Kept separate rather than imported because claude.ts's copy is a mock-model
 *  implementation detail, not something the webhook layer should depend on. */
const PAYABLE_STATES: CustomerState[] = ['PRICE_SENT', 'PAYMENT_PENDING'];

/** States in which a customer might send a PAYMENT SCREENSHOT — wider than
 *  PAYABLE_STATES on purpose (Jo, 31 Aug). A real case: the price was quoted in
 *  the back-and-forth rather than sent as the formal price message, so the
 *  customer sat at QUALIFIED (or NEW_LEAD) when she paid $220 and sent the bank
 *  receipt. The old gate only ran the payment-proof vision check at
 *  PRICE_SENT / PAYMENT_PENDING, so an obvious payment landed as an "attachment
 *  I can't read" task. Widening the gate is safe because the vision check
 *  itself confirms the image really is a payment before anything moves, and in
 *  Supervised mode it only drafts the "payment received" reply for approval.
 *  Excludes already-paid and closed/declined states (a closed customer's media
 *  is reactivated to Lead on the ordinary path first). */
export const PAYMENT_PROOF_STATES: CustomerState[] = ['NEW_LEAD', 'QUALIFIED', 'PRICE_SENT', 'PAYMENT_PENDING'];

/**
 * Should a plain-text payment claim force the Paid transition onto Will's reply,
 * regardless of the language the customer wrote in and regardless of whether the
 * model set the state itself?
 *
 * TRUE only when ALL of these hold:
 *   - the customer is not already paid, and is in a state where a payment is
 *     actually outstanding (PRICE_SENT / PAYMENT_PENDING);
 *   - Will actually produced a reply that is going out (sent now, queued for a
 *     short delay, or drafted for approval) — never on a wait or a human-task
 *     escalation, where there is no reply to carry the transition;
 *   - the model did not already move them to Paid (nothing to backfill);
 *   - the message reads as a payment REPORT, not a question and not a failure,
 *     which is exactly what claimsPayment decides (EN/ES/PT/DE/IT/FR/JA, with a
 *     guard against "it was declined").
 *
 * This mirrors the screenshot path (handlePaymentProofMedia), which already
 * trusts a captioned "paid" in any language: the two doors to Paid now behave
 * the same, so the stage never depends on which one the customer used or which
 * language they used.
 */
export function paymentClaimForcesPaid(opts: {
  paid: boolean;
  state: CustomerState;
  outcomeKind: string;
  outcomeNewState?: CustomerState;
  hasReply: boolean;
  text: string;
}): boolean {
  return !opts.paid
    && PAYABLE_STATES.includes(opts.state)
    && opts.outcomeNewState !== 'PAID'
    && (opts.outcomeKind === 'sent' || opts.outcomeKind === 'queued' || opts.outcomeKind === 'pending_approval')
    && opts.hasReply
    && claimsPayment(opts.text);
}

/** The form link every "payment received" confirmation carries. */
const TAX_FORM_URL_RE = /workingholidaytax\.com\.au\/tax-form/i;

/** When the Paid move is forced onto a reply the model wrote itself, that reply
 *  must carry the form link, because Paid cascades to Form Pending and the form
 *  reminders start. If the link is missing, the customer's own approved
 *  payment received body (the one the screenshot route sends) is appended after
 *  the model's words; if it is already there, the reply is returned untouched
 *  (audit, 5 Sep). Pure so it can be pinned in a test. */
export function withPaymentReceivedIfNoForm(replyText: string | undefined, confirmation: string): string {
  const reply = (replyText ?? '').trim();
  if (TAX_FORM_URL_RE.test(reply)) return replyText ?? '';
  if (!reply) return confirmation;
  return `${reply}\n\n${confirmation}`;
}

/** Owner's rule: we trust the customer — but only once the attachment is
 *  actually confirmed to show a payment. A photo or document sent while a
 *  price is outstanding is looked at by Claude's vision (assessPaymentProofImage)
 *  before anything moves: only a clear payment confirmation (bank transfer,
 *  PayID, card success screen) is trusted, exactly like the customer typing
 *  "paid" would be, and moves them straight from Lead to Paid with no manual
 *  review gate (payment_received reply, then on to FORM_PENDING). Anything
 *  else the customer sends — a question, an unrelated document, a photo of a
 *  problem, an unclear image — is NOT proof, and falls through to the normal
 *  "cannot read this" handoff task instead.
 *
 *  Jo, 3 Sep: the vision check also reads the amount, the recipient and the
 *  status. When they add up to our fee in our account, completed, the payment
 *  is VERIFIED and no task is raised at all; when something is not visible the
 *  stage still moves on trust and a heads-up task names what to glance at.
 *
 *  Returns null when the attachment does not qualify: no existing customer,
 *  already paid, not currently in a state where a price is outstanding, the
 *  file could not be downloaded from Meta, or the vision check did not
 *  confirm it as a payment. */
export function handlePaymentProofMedia(
  waId: string,
  body: string,
  meta: { name?: string; media: { id: string; kind: string; mime?: string; filename?: string; caption?: string } },
): Promise<CustomerRow | null> {
  // Serialised with every other message from this customer. See
  // queueForCustomer: two attachments in one delivery could both pass the
  // "has this customer already paid?" gate before either answered it.
  return queueForCustomer(waId, () => handlePaymentProofMediaInner(waId, body, meta));
}

/** The "payment received" confirmation for THIS customer: their language's
 *  Library row first, then the English row, then the code copy. Was hardcoded
 *  English and ignored the Library entirely (audit, 4 Sep). */
export async function paymentReceivedBody(store: Store, lang?: string | null): Promise<string> {
  const key = paymentReceivedTemplateKey(lang);
  try {
    const templates = await store.listTemplates();
    const row = templates.find((t) => t.key === key)
      ?? (key !== 'payment_received' ? templates.find((t) => t.key === 'payment_received') : undefined);
    if (row?.body?.trim() && !/\{\{[A-Z_]+\}\}/.test(row.body)) return row.body;
  } catch { /* the constant is the honest fallback */ }
  return paymentReceivedMessage(lang);
}

async function handlePaymentProofMediaInner(
  waId: string,
  body: string,
  meta: { name?: string; media: { id: string; kind: string; mime?: string; filename?: string; caption?: string } },
): Promise<CustomerRow | null> {
  const store = getStore();
  const customer = await store.getCustomerByWaId(waId);
  // `optedOut` belongs in this condition exactly as it does on every other send
  // path: a customer who asked us to stop must not receive a "payment received"
  // reply, however that payment reached us.
  if (!customer || customer.optedOut || customer.paid || !PAYMENT_PROOF_STATES.includes(customer.state)) return null;

  // ── ROUTE 1: they said it. ────────────────────────────────────────────────
  // Jo, 27 Aug: at the payment step we trust the customer, and most people send
  // the screenshot AND type "paid" under it. This case used to be decided by
  // the picture alone, so a real payment with a blurry crop, a bank app in
  // Japanese, or a file Meta would not hand us fell through to a manual task
  // while the words "just paid it!" sat in the caption being ignored.
  //
  // Checked BEFORE the download, so it also covers the case where the media
  // fetch itself fails — the customer's word does not depend on us being able
  // to read their picture.
  // The attachment is right here, so the caption is read with the lower bar:
  // "here you go" under a receipt is a payment report (Jo, 4 Sep).
  let said = claimsPayment(meta.media.caption, { hasAttachment: true })
    || claimsPayment(body, { hasAttachment: true });
  // 12 Oct (+61 402 077 188): "I can send you the receipt I got and just tell
  // me what this actually means" with her ATO lodgement PDF. "receipt" next to
  // an attachment counted as "she says she paid", overrode the picture, and
  // she got "Payment received". Weak words ("receipt", "here you go") only
  // carry a payment when the picture could not be read; when it WAS read and
  // is not a payment, only an explicit report ("paid", "transferred") does.
  const saidExplicitly = claimsPayment(meta.media.caption) || claimsPayment(body);
  if (said) {
    await store.audit('system', 'payment_claimed_in_words', {
      customerId: customer.id, from: meta.media.caption ? 'caption' : 'body',
    });
  }

  // ── ROUTE 2: the picture shows it. ────────────────────────────────────────
  // Jo, 3 Sep: the picture is read EVERY time we can afford it, whether or not
  // they also typed "paid". It used to be skipped once the words were there,
  // to save the call, and the saving cost Jo a task per payment: with nothing
  // read off the picture there was nothing to confirm the amount and the
  // recipient with, so every confirmed payment ended as "worth a glance". Now
  // the vision check returns the amount, the recipient and the status, and
  // when those add up to our fee in our account the payment is confirmed with
  // no task at all (verifyProofDetails). The words still decide on their own
  // whenever the picture cannot be read: a paid answer never becomes less paid.
  //
  // THE DAILY AI BUDGET APPLIES HERE TOO, and this is the only place in the
  // system where that had never been checked — while being the most expensive
  // call the system makes. Left ungated, a bad day of attachments could spend
  // the budget through the one door that does not have a lock on it.
  //
  // On a budget-exhausted day the ordinary case (a screenshot captioned
  // "paid") is unaffected: the words carry it, with the glance task. What is
  // left is the caption-less screenshot, and that does not get quietly
  // dropped — it returns null, which is the same path as a picture we cannot
  // download, and lands as a task for a person to open. A payment is never
  // silently NOT confirmed; it is confirmed by a human instead of a model.
  //
  // The budget lookup itself must never be what stops a payment being
  // confirmed, so a throw inside it is read as "not exhausted" and the check
  // proceeds exactly as it did before this gate existed. A metering failure is
  // allowed to cost money; it is not allowed to cost a customer.
  let overBudget = false;
  try { overBudget = await aiBudgetExhausted(); } catch { overBudget = false; }
  let check: PaymentProofCheck = { isProof: false };
  if (overBudget) {
    await store.audit('system', 'payment_proof_check_skipped', {
      customerId: customer.id,
      reason: said ? 'daily AI budget exhausted; trusting their words' : 'daily AI budget exhausted; sent to a human instead',
    });
    if (!said) return null;
  } else {
    const fetched = await fetchWaMedia(meta.media.id);
    if (!fetched.ok) {
      await store.audit('system', 'payment_proof_check_skipped', { customerId: customer.id, reason: fetched.error });
      if (!said) return null;
    } else {
      check = await assessPaymentProofImage(fetched.body, fetched.mime || meta.media.mime || '');
      await store.audit('system', 'payment_proof_checked', {
        customerId: customer.id, isProof: check.isProof, reason: check.reason ?? null, details: check.details ?? null,
      });
      if (!check.isProof && said && !saidExplicitly) {
        await store.audit('system', 'payment_words_overruled_by_picture', { customerId: customer.id, reason: check.reason ?? null });
        said = false;
      }
      // A payment, but demonstrably not ours (another recipient) or not done
      // (failed): the picture alone must never confirm it. Their words still
      // can, and then the task carries this verdict so the mismatch is seen.
      if (check.isProof && check.details && isNotOurPayment(check.details)) {
        await store.audit('system', 'payment_proof_rejected', {
          customerId: customer.id, reason: describeProof(check.details),
        });
        check = { isProof: false, reason: `the screenshot shows a payment of ${describeProof(check.details)}`, details: check.details };
      }
    }
  }

  // Either route is enough on its own.
  if (!said && !check.isProof) return null; // neither — falls through to the manual task

  // Fully verified means our fee, to our account, completed, read off the
  // picture. Anything short of that moves the stage on trust and says exactly
  // what could not be checked.
  const verification = check.details
    ? verifyProofDetails(check.details)
    : { verified: false, unverified: [said ? 'the screenshot could not be read' : 'nothing could be read off the screenshot'] };
  const shown = check.details ? describeProof(check.details) : null;
  const trustedBecause = verification.verified
    ? `the screenshot shows ${shown}`
    : said
      ? `they said they paid${shown ? `; the screenshot shows ${shown}` : ''}`
      : (check.reason ?? 'the screenshot shows a payment');
  const unverifiedNote = verification.verified ? '' : ` Not verified from the picture: ${verification.unverified.join('; ')}.`;

  await store.addMessage({
    customerId: customer.id, direction: 'IN', author: 'CUSTOMER', status: 'SENT', body,
    meta: { media: meta.media },
  });

  // ── A PICTURE THAT DOES NOT SHOW OUR PAYMENT IS NOT A PAYMENT ────────────
  //
  // Jo, 3 Sep: a screenshot showing our fee, to our account, completed, is
  // approved automatically and raises no task. The other half of that rule was
  // missing (audit, 4 Sep): a picture showing $150, or a transfer still
  // PENDING, or a recipient that is not visible, was also auto-confirmed —
  // the customer was moved to Paid and told "Payment received" for money that
  // had not arrived.
  //
  // The customer's WORD still moves them (that is the trust rule and it stays).
  // What is refused here is the picture DECIDING it on its own when the picture
  // itself says something different. Nothing is lost: the message is in the
  // thread, the task says exactly what the screenshot showed, and one click
  // sends the confirmation if Jo recognises the payment.
  // Only when the picture was actually READ and contradicts our payment. A
  // proof the model recognised but could not break down (no structured details
  // at all) keeps the old behaviour: trusted, with the heads-up task.
  if (!said && check.details && !verification.verified && !pictureConfirmsPayment(check.details)) {
    await store.addTask({
      customerId: customer.id, customerName: customer.name ?? meta.name ?? waId,
      reason: `Payment screenshot does not match: ${shown ?? 'nothing could be read off it'}. Nothing has been sent and they have NOT been moved to Paid.`,
      severity: 'REVIEW',
      context: `${body}\n\nWhat the screenshot showed: ${shown ?? 'unreadable'}.\nWhy it was not accepted: ${verification.unverified.join('; ')}.\nIf this is a real payment, mark them Paid and the confirmation goes out.`,
      suggestedReply: null,
    });
    await store.audit('system', 'payment_proof_not_accepted', {
      customerId: customer.id, shown: shown ?? null, unverified: verification.unverified,
    });
    return (await store.getCustomerByWaId(waId)) ?? customer;
  }

  // The receipt says which service was bought (28 Sep, Laurine +33 7 81:
  // $385 paid, income still unknown, form got the plain acknowledgement
  // instead of the ABN questions). Set it from the amount read off the
  // picture, before the stage moves, so the FORM_RECEIVED job sees it.
  const boughtIncome = incomeFromAmount(check.details?.amountAud ?? null);
  if (boughtIncome && customer.income !== boughtIncome && typeof store.updateCustomer === 'function') {
    await store.updateCustomer(customer.id, { income: boughtIncome });
    await store.audit('system', 'income_set_from_receipt', { customerId: customer.id, income: boughtIncome, amountAud: check.details?.amountAud ?? null });
  }

  // Same rule as every other AI-authored reply: SUPERVISED means nothing
  // reaches the customer, and nothing about the pipeline moves, until the
  // owner approves it — a confirmed payment photo is not an exception to
  // that just because it arrived automatically. Previously this always sent
  // immediately and moved the stage regardless of ai_mode, which was
  // effectively treating it as pre-approved before the owner ever saw it.
  const mode = resolveAiMode(await store.getSetting('ai_mode'));
  if (requiresApproval(mode)) {
    const draft = await store.addMessage({
      customerId: customer.id, direction: 'OUT', author: 'AI', status: 'PENDING_APPROVAL',
      body: await paymentReceivedBody(store, customer.lang),
      // proposedState: 'PAID' is exactly what approve_message already knows
      // how to apply — same guard re-check, same PAID -> FORM_PENDING
      // cascade via autoAdvanceToForm, same reconcileSchedule — as any other
      // deferred-state draft. No new approval machinery needed here.
      meta: { proposedState: 'PAID' },
    });
    await store.addTask({
      customerId: customer.id, customerName: customer.name ?? meta.name ?? waId,
      reason: `Customer confirmed payment (${trustedBecause}).${unverifiedNote} A "payment received" reply is drafted and waiting for your approval — nothing has been sent or moved yet.`,
      severity: 'REVIEW', context: body, suggestedReply: null,
    });
    await store.audit('system', 'payment_proof_drafted', { customerId: customer.id, mediaKind: meta.media.kind, messageId: draft.id, verified: verification.verified });
    return (await store.getCustomerByWaId(waId)) ?? customer;
  }

  // setState now reports whether THIS call performed the PAID transition. On
  // false, another serverless instance already confirmed the same payment (two
  // Meta deliveries for one customer landing on two warm instances), so it has
  // already sent the "payment received" message and advanced the stage. Sending
  // again here is exactly the duplicate the in-process mutex cannot prevent
  // across instances. Return the current row without re-sending. The same-
  // instance case is still covered by queueForCustomer upstream.
  const won = await store.setState(customer.id, 'PAID', 'SYSTEM'); // also flips customer.paid = true
  if (!won) {
    await store.audit('system', 'payment_confirmed_by_other_instance', { customerId: customer.id });
    return (await store.getCustomerByWaId(waId)) ?? customer;
  }
  const bank = await getBank();
  await autoAdvanceToForm(customer.id, bank);

  // THE RESULT OF THE SEND IS NOT OPTIONAL READING.
  //
  // deliverOut returns { ok:false } on a rejected send; it does not throw. That
  // return was discarded, so a customer could be moved to Paid and then to
  // Form Pending, be told NOTHING, and get a task saying the opposite: "Moved
  // to Paid automatically, worth a glance to confirm it looks right."
  //
  // Meta does not redeliver, the form reminders start chasing a form the
  // customer was never asked for, and from their side they paid and we went
  // silent. The state changes are correct and deliberately stay; what changes
  // is that the task now tells the truth about the message.
  // The kill switch, a per-chat AI pause, a legacy chat and an opted-out
  // customer all mean "Will does not talk here", and this send used to walk
  // past every one of them (audit, 4 Sep). The confirmation still MATTERS, so
  // it is not dropped: the stage stays Paid and Jo gets it as a one-click task.
  const confirmation = await paymentReceivedBody(store, customer.lang);
  const killSwitch = (await store.getSetting('kill_switch')) === true;
  const silenced = killSwitch || customer.aiPaused || customer.isLegacy;
  if (silenced) {
    await store.addTask({
      customerId: customer.id, customerName: customer.name ?? meta.name ?? waId,
      reason: `They paid (${trustedBecause}) and are moved to Paid, but Will is switched off on this chat${killSwitch ? ' (kill switch)' : customer.aiPaused ? ' (AI paused)' : ' (legacy chat)'}, so nothing was sent. Send the confirmation yourself.`,
      severity: 'URGENT', context: body, suggestedReply: confirmation,
    });
    await store.audit('system', 'payment_received_not_sent', { customerId: customer.id, reason: killSwitch ? 'kill_switch' : customer.aiPaused ? 'ai_paused' : 'legacy' });
    return (await store.getCustomerByWaId(waId)) ?? customer;
  }
  // The rejected-send task is deliverOut's, in these words (audit, 5 Sep: it
  // was added a second time below, so Jo had two cards for one silence).
  // `system`: the confirmation answers the payment, not a question sent with
  // the screenshot; without the flag the deferred reply read a reworded
  // Library variant as a real answer and dropped the question (audit3 core
  // 52, 5 Sep).
  // Jo, 17 Sep, "the button every time": confirmation is always the exact
  // canonical text (paymentReceivedBody above), never a model-composed
  // combined reply, so attaching the Meta template here (metaTemplateLang,
  // fallbackToText) has none of the "loses extra content" risk that applies
  // to the live-reply branch elsewhere in this file — safe in every case.
  // NOT INSTANTLY (Jo, 25 Sep, +81 90: the receipt landed at 13:41 and the
  // "Payment received" answer showed 13:41, like a robot). The confirmation
  // waits the same one-to-five minutes every other Will reply waits
  // (autopilotReplyDelaySeconds), parked QUEUED and sent by the existing
  // AUTO_REPLY{messageId} job. The stage moved already (above); only the
  // words wait. The scheduler knows this row is the payment confirmation
  // (meta.paymentConfirmation): it never discards it as stale when the
  // customer writes again in the meantime, sends it through the Meta
  // template with the Start Here button, and raises the URGENT "paid but not
  // told" task itself if the send fails.
  const queued = await store.addMessage({
    customerId: customer.id, direction: 'OUT', author: 'AI', status: 'QUEUED', body: confirmation,
    meta: {
      system: true, paymentConfirmation: true, trustedBecause,
      waTemplate: { name: paymentReceivedTemplateKey(metaTemplateLang(customer.lang)), params: [], lang: customer.lang },
    },
  });
  await store.addJob({
    customerId: customer.id, kind: 'AUTO_REPLY', payload: { messageId: queued.id },
    runAt: new Date(Date.now() + autopilotReplyDelaySeconds() * 1000).toISOString(),
  });
  await store.audit('system', 'payment_received_queued', { customerId: customer.id, messageId: queued.id }).catch(() => {});
  const out = { ok: true as const, retryable: false as const, messageId: queued.id as string | undefined, error: undefined as string | undefined };

  // The task, and when there is none.
  //
  // A customer who paid and heard nothing is the most urgent thing on the
  // board, so a rejected send is always a task, with the reply ready to send
  // in one click rather than retyped.
  //
  // Otherwise: a payment the picture VERIFIED (our fee, our account, completed)
  // raises nothing. Jo, 3 Sep: the model read the receipt; asking him to read
  // it again was the task he did not want. Only a payment taken on trust, with
  // something the picture could not show, gets the heads-up, and the heads-up
  // says what that something was.
  // A throttled or transient rejection (429/5xx) is not a person's job to
  // retype: deliverOut raises no task for it (channel.ts) on the assumption
  // that "the caller reschedules" — which nothing here ever did (audit3 core
  // 55, 5 Sep). The confirmation sat FAILED with no retry and no card at all,
  // which is worse than the double-card bug this file already fixed. It is
  // resent the same way the text-autopilot path resents a throttled reply:
  // parked as QUEUED again and picked up by the existing AUTO_REPLY{messageId}
  // job the scheduler already knows how to run (scheduler.ts). That attempt
  // raises its own task if it fails again, so nothing is silently dropped.
  if (!out.ok && out.retryable && out.messageId) {
    await store.setMessageStatus(out.messageId, 'QUEUED', { restamp: true }).catch(() => { /* the resend job re-checks status anyway */ });
    await store.addJob({
      customerId: customer.id, kind: 'AUTO_REPLY', payload: { messageId: out.messageId },
      runAt: new Date(Date.now() + autopilotReplyDelaySeconds() * 1000).toISOString(),
    }).catch(() => { /* the FAILED message is still visible in the thread as a backstop */ });
    await store.audit('assistant', 'payment_received_send_rearmed', { customerId: customer.id }).catch(() => {});
  } else if (!out.ok) {
    // Already on the board: deliverOut raised it with the wording above.
  } else if (!verification.verified) {
    await store.addTask({
      customerId: customer.id, customerName: customer.name ?? meta.name ?? waId,
      reason: `Customer confirmed payment (${trustedBecause}).${unverifiedNote} Moved to Paid automatically. Worth a glance to confirm it looks right.`,
      severity: 'REVIEW',
      context: body,
      suggestedReply: null,
    });
  }

  await store.audit('system', 'auto_paid_from_media', {
    customerId: customer.id, mediaKind: meta.media.kind, verified: verification.verified, shown: shown ?? null,
  });

  // The customer just moved Paid -> Form Pending, and the form reminders (6h,
  // 3d, 7d) belong to that stage. Nothing armed them on this path (audit,
  // 3 Sep): a screenshot-confirmed payment on Autopilot sat in Form Pending
  // with no reminder ever sent, and was only chased again if they wrote first.
  // Best effort, same as every other reconcile after a send.
  const after = await store.getCustomerByWaId(waId);
  if (after) {
    try { await reconcileSchedule(after); } catch (e) {
      await store.audit('scheduler', 'reconcile_failed_after_send', {
        customerId: customer.id,
        error: e instanceof Error ? e.message.slice(0, 200) : String(e).slice(0, 200),
      }).catch(() => { /* the store is the likely thing that just failed */ });
    }
  }
  return after ?? customer;
}

export { SALES_STATES };
