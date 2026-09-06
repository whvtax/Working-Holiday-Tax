// ============================================================
// Service layer: one entry point for an incoming customer
// message, shared by the simulator and the future WhatsApp
// webhook. Persists everything to the store.
// ============================================================
import { getStore, CustomerRow, CustomerState, Store, MessageRow, JobRow } from './store';
import { reopenTarget } from './state-machine';
import { runEngine, AiMode, EngineOutcome } from './engine';
import { CustomerContext } from './playbook';
import { Turn } from './claude';
import { reconcileSchedule, abnAnswersPendingKey } from './scheduler';
import { maybeAutoOffWill } from './review-auto-off';
import { detectLanguage, FORM_RECEIVED_MSG, PAYMENT_RECEIVED_MSG, REQUEST_ABN_MSG, HANDOFF_HOLDING_MSG, paymentReceivedMessage, paymentReceivedTemplateKey, formReceivedMessage, formReceivedTemplateKey, isPaymentReceivedDraft } from './i18n';
import { retrieveKnowledge } from './knowledge';
import { deliverOut, fetchWaMedia } from './channel';
import { autopilotReplyDelaySeconds } from './config';
import { isIdentityQuestion } from './identity-question';
import { firstNameOf, cleanFirstName, isCourtesyLine } from './text-normalize';
// Moved to text-normalize.ts so the engine can use it too without importing this
// file (service.ts imports the engine; a static import back would be a cycle).
// Re-exported here because this is where every caller and test already looks.
export { isCourtesyLine };
import { suggestReply } from './suggest';
import { assessPaymentProofImage, describeAttachment, PaymentProofCheck } from './claude';
import { verifyProofDetails, isNotOurPayment, describeProof } from './payment-proof';
import { sanitize } from './playbook';
import { claimsPayment } from './payment-claim';
import { isAfterPayment, foldDocumentDrop, documentDropCount, documentDropReason } from './document-drop';
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
  const isClosed = ['NOT_INTERESTED', 'WENT_COLD', 'NOT_RELEVANT'].includes(customer.state);
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

  const ackKey = formReceivedTemplateKey(customer.lang);
  let body = formReceivedMessage(customer.lang);
  try {
    const t = (await store.listTemplates()).find((x) => x.key === ackKey);
    if (t?.body?.trim()) body = t.body;
  } catch { /* the code copy is the fallback */ }
  if (/\{\{[^}]{1,40}\}\}/.test(body)) {
    await store.audit('system', 'form_ack_held', { customerId: customer.id, reason: 'placeholder left in the Library text' });
    return;
  }
  const template = { name: ackKey, params: [], lang: customer.lang, fallbackToText: true };
  const out = await deliverOut(customer, body, 'AI', { waTemplate: template }, template);
  await store.audit('system', out.ok ? 'form_ack_sent_after_abn' : 'form_ack_failed_after_abn', {
    customerId: customer.id, error: out.ok ? undefined : out.error, answered: text.slice(0, 120),
  });
  if (out.ok) {
    // The ABN answers just genuinely went through — if they had already
    // reached Review and Medicare (if owed) had already sent, this is the
    // piece that was missing, so re-check now rather than waiting for
    // another trigger that may never come (Jo, 6 Sep).
    const fresh = await store.getCustomerById(customer.id);
    if (fresh) await maybeAutoOffWill(store, fresh).catch(() => { /* best effort */ });
  }
}

/** Customer text quoted into the profile block: prompt structure stripped, and
 *  capped. Same idea as playbook.sanitize, with room for a sentence. */
const quoteForPrompt = (v: string): string =>
  (v || '').replace(/[\r\n{}#`<>*_|]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 160);

async function buildBackstory(store: Store, customer: CustomerRow, msgs: MessageRow[]): Promise<string> {
  const parts: string[] = [];
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
    const closes = hist.filter((h) => ['NOT_INTERESTED', 'WENT_COLD', 'NOT_RELEVANT'].includes(h.to));
    const reopens = hist.filter((h) => !!h.from && ['NOT_INTERESTED', 'WENT_COLD', 'NOT_RELEVANT'].includes(h.from));
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
  const ctx: CustomerContext = {
    // Owner rule: the model only ever sees the FIRST name, so it can never address
    // the customer by surname even if a full name was captured from WhatsApp.
    // The cleaned first name (a leading emoji, ALL CAPS, a company or a phone
    // number as the profile name all read as "no name"), so the model never
    // greets "Hey 🌸!" or "Hey SYDNEY!" (audit, 3 Sep). Same cleaner the
    // deterministic opening uses.
    name: cleanFirstName(firstNameOf(customer.name)) || null, state: customer.state, income: customer.income,
    paid: customer.paid, formComplete: customer.formComplete,
    missingDocs: customer.missingDocs, estimatedRefundCents: customer.estimatedRefundCents,
    lang: customer.lang,
    backstory: await buildBackstory(store, customer, msgs).catch(() => ''),
    knowledge,
  };

  const bank = await getBank();
  const outcome = await runEngine({
    ctx, history, mode, bank,
    guard: {
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
    },
  });

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
  if (paymentClaimForcesPaid({
    paid: customer.paid, state: customer.state,
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
    const has385 = /\$\s?385\b/.test(t);
    const has220 = /\$\s?220\b/.test(t);
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
    const out = await deliverOut(customer, outcome.replyText, 'AI', undefined, undefined, {
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
    const m = await store.addMessage({
      customerId: customer.id, direction: 'OUT', author: 'AI', status: 'PENDING_APPROVAL',
      body: outcome.replyText,
      meta: { proposedState: outcome.newState, income: inc ?? undefined, review: outcome.reviewNote },
    });
    pendingMessageId = m.id;
  } else if (outcome.kind === 'human_task' && outcome.task) {
    // Carry the reviewer's note into the task context so the owner sees what the
    // second set of eyes noticed, alongside the message that triggered the task.
    const taskContext = outcome.reviewNote ? `${text}\n\nReviewer: ${outcome.reviewNote}` : text;
    await raiseOrUpdateTask(store, customer, {
      reason: outcome.task.reason, severity: outcome.task.severity,
      newContext: taskContext, suggestedReply: outcome.task.suggestedReply ?? null,
    });
    await store.audit('assistant', 'human_task_created', { reason: outcome.task.reason });
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
  if ((outcome.kind === 'human_task' || outcome.kind === 'pending_approval')
      && mode === 'FULL_AUTO'
      && isLongComplicatedMessage(text)) {
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
export function burstText(msgs: MessageRow[]): string {
  const sent = msgs.filter((m) => m.status === 'SENT');
  let lastOut = -1;
  for (let i = sent.length - 1; i >= 0; i--) {
    if (sent[i].direction === 'OUT') { lastOut = i; break; }
  }
  const burst = sent.slice(lastOut + 1).filter((m) => m.direction === 'IN').map((m) => m.body.trim()).filter(Boolean);
  if (burst.length) return burst.join('\n');
  const lastIn = [...sent].reverse().find((m) => m.direction === 'IN');
  return lastIn?.body ?? '';
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
  const text = burstText(msgs);
  if (!text.trim()) return 'skipped';
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
  if (paymentConfirmationSent && !/[?？]/.test(text) && claimsPayment(text, { hasAttachment: true })) {
    await store.audit('assistant', 'auto_reply_already_answered', { customerId: customer.id, anchorAt, reason: 'payment_report_only' });
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
  const { outcome } = await decideAndAct(store, customer, text, mode, { killSwitch, sendNow: mode === 'FULL_AUTO', anchorAt, jobId: job.id, jobRunAt: job.runAt, jobCreatedAt: job.createdAt });
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
  const wasClosed = ['NOT_INTERESTED', 'WENT_COLD', 'NOT_RELEVANT'].includes(customer.state);
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
  if (meta?.media && isAfterPayment(customer.state)) {
    const ack = await suggestReply('', customer, 'documents_after_payment');
    await raiseOrUpdateTask(store, customer, {
      reason: documentDropReason(1), severity: 'REVIEW', newContext: body,
      fold: (existing) => foldDocumentDrop(existing, body),
      reasonFor: (context) => documentDropReason(documentDropCount(context)),
      suggestedReply: ack,
    });
    // ── AND ACTUALLY SAY IT (Hannah, +44 7944 741456, 4 Sep) ────────────────
    //
    // The acknowledgement was written, attached to the task, and then waited
    // for Jo to click it. So a customer who did exactly what we asked — sent
    // their documents — sat on read until somebody was at the CRM, which on
    // that night meant overnight. There is nothing in this line to get wrong:
    // no amount, no tax, no promise, no next step of theirs. On Autopilot it
    // goes on its own; the task still opens, because the files themselves do
    // need collecting.
    //
    // ONCE PER DROP, not once per file: fifty invoices are one arrival. A
    // timestamp in settings is enough — no column, and it survives a restart.
    if (!customer.optedOut && !customer.aiPaused && !customer.isLegacy && ack) {
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
          // the deferred reply must not read it as "already answered"
          // (audit3 core 52, 5 Sep).
          await deliverOut(customer, ack, 'AI', { system: true });
          await store.audit('system', 'documents_acknowledged', { customerId: customer.id });
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
  await raiseOrUpdateTask(store, customer, {
    reason: meta?.media
      ? 'Customer sent an attachment Will cannot read. Open the chat to view it and reply.'
      : meta?.undecoded
        ? `WhatsApp delivered an event with no readable text${metaDetail ? ` (${metaDetail})` : ''}. It may not be a message from the customer at all. Open WhatsApp to check.`
        : 'Customer sent a voice note. Open WhatsApp to listen and reply.',
    severity: 'REVIEW', newContext: body,
    // Even here there is something worth proposing: an acknowledgement that the
    // attachment arrived, so the customer is not left on read while the owner
    // opens it.
    suggestedReply: await suggestReply('', customer, meta?.media ? 'attachment' : 'unreadable'),
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
  const said = claimsPayment(meta.media.caption, { hasAttachment: true })
    || claimsPayment(body, { hasAttachment: true });
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
  if (!said && check.details && !verification.verified) {
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
  const out = await deliverOut(customer, confirmation, 'AI', { system: true }, undefined, {
    onFailure: {
      reason: (e) => `PAID, BUT THEY HAVE NOT BEEN TOLD. The payment was confirmed (${trustedBecause}) and they are moved to Paid, but WhatsApp rejected the confirmation: ${e ?? 'unknown error'}. Send it yourself, they are sitting in silence after paying.`,
      severity: 'URGENT', context: body,
    },
  });
  if (!out.ok) {
    await store.audit('channel', 'payment_received_send_failed', {
      customerId: customer.id, error: out.error ?? 'unknown error',
    }).catch(() => { /* the store is a likely thing to have just failed */ });
  }

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
