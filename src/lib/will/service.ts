// ============================================================
// Service layer: one entry point for an incoming customer
// message, shared by the simulator and the future WhatsApp
// webhook. Persists everything to the store.
// ============================================================
import { loadCustomRules } from './rules-store';
import { getStore, CustomerRow, CustomerState } from './store';
import { runEngine, AiMode, EngineOutcome } from './engine';
import { CustomerContext } from './playbook';
import { Turn } from './claude';
import { reconcileSchedule } from './scheduler';
import { detectLanguage } from './i18n';
import { retrieveKnowledge } from './knowledge';
import { deliverOut, fetchWaMedia } from './channel';
import { AUTOPILOT_REPLY_DELAY_SECONDS } from './config';
import { isIdentityQuestion } from './identity-question';
import { firstNameOf } from './text-normalize';
import { suggestReply } from './suggest';
import { APPROVED } from './approved-messages';
import { assessPaymentProofImage } from './claude';
import { resolveAiMode, requiresApproval } from './mode';
import { aiBudgetExhausted } from './ai-budget';

export interface HandleResult {
  outcome: EngineOutcome;
  customer: CustomerRow;
  pendingMessageId?: string;
}

const OPT_OUT = /\b(stop|unsubscribe|opt ?out|stop messaging me|leave me alone|remove me)\b/i;
const SALES_STATES: CustomerState[] = ['NEW_LEAD', 'QUALIFIED', 'PRICE_SENT', 'PAYMENT_PENDING'];

// Owner's rule: a burst of messages (or attachments) from the same customer
// must fold into ONE open task, not one per message — sending 3-4 messages
// in a row used to open 3-4 tasks, and 20 invoice photos opened 20. If a
// task is already open for this customer, its context grows with what just
// arrived (capped, so it never grows without bound) and its suggested reply
// is regenerated against everything sent so far rather than only the latest
// message. Only opens a new task when none is open yet.
const MAX_TASK_CONTEXT = 2000;
async function raiseOrUpdateTask(
  store: ReturnType<typeof getStore>,
  customer: Pick<CustomerRow, 'id' | 'name' | 'waId'>,
  opts: { reason: string; severity: string; newContext: string; suggestedReply: string | null },
): Promise<void> {
  const existing = await store.findOpenTaskForCustomer(customer.id);
  if (existing) {
    const merged = existing.context ? `${existing.context}\n---\n${opts.newContext}` : opts.newContext;
    await store.updateTask(existing.id, {
      reason: opts.reason, severity: opts.severity,
      context: merged.length > MAX_TASK_CONTEXT ? merged.slice(merged.length - MAX_TASK_CONTEXT) : merged,
      suggestedReply: opts.suggestedReply,
    });
    return;
  }
  await store.addTask({
    customerId: customer.id, customerName: customer.name ?? customer.waId,
    reason: opts.reason, severity: opts.severity, context: opts.newContext, suggestedReply: opts.suggestedReply,
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
export function handleIncoming(
  waId: string,
  text: string,
  mode: AiMode,
  meta?: { name?: string; flag?: string },
): Promise<HandleResult> {
  const prev = chains.get(waId) ?? Promise.resolve();
  const next = prev.catch(() => {}).then(() => handleIncomingInner(waId, text, mode, meta));
  chains.set(waId, next.finally(() => { if (chains.get(waId) === next) chains.delete(waId); }));
  return next;
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
  meta?: { name?: string; flag?: string },
): Promise<HandleResult> {
  const store = getStore();

  let customer = await store.getCustomerByWaId(waId);
  const brandNew = !customer;
  if (!customer) {
    customer = await store.createCustomer({ waId, name: meta?.name ?? null, flag: meta?.flag ?? '💬' });
    await store.audit('system', 'customer_created', { waId });
  }

  await store.addMessage({
    customerId: customer.id, direction: 'IN', author: 'CUSTOMER', status: 'SENT', body: text,
  });

  // Remember the customer's language (used for deterministic auto-messages like
  // the "questionnaire received" confirmation; the live path already replies natively).
  const detected = detectLanguage(text);
  if (detected && customer.lang !== detected) {
    await store.updateCustomer(customer.id, { lang: detected });
    customer = { ...customer, lang: detected };
  }

  // Opt-out: mark, cancel everything, discard pending drafts, stay silent forever.
  if (OPT_OUT.test(text)) {
    await store.updateCustomer(customer.id, { optedOut: true });
    await store.cancelJobsFor(customer.id);
    for (const m of await store.listMessages(customer.id)) {
      if (m.status === 'PENDING_APPROVAL') await store.setMessageStatus(m.id, 'DISCARDED');
    }
    await store.audit('system', 'customer_opted_out', { customerId: customer.id });
    const c2 = await store.getCustomerByWaId(waId);
    return { outcome: { kind: 'silent', decision: { action: 'wait', confidence: 1 } }, customer: c2 ?? customer };
  }

  // ============================================================
  // NEW-CHATS-ONLY POLICY (owner decision):
  // The assistant handles brand-new leads only. Any pre-existing / imported
  // chat, and any previously-closed chat that returns, is routed straight to a
  // human: the assistant is paused for that chat and a task is opened once.
  // ============================================================
  const isClosed = ['NOT_INTERESTED', 'WENT_COLD', 'NOT_RELEVANT'].includes(customer.state);
  const existingChat = !brandNew && !customer.botOwned; // pre-existing / legacy / imported
  if (existingChat || isClosed) {
    // Owner's rule: a closed customer (Went Cold / Not Interested / Not
    // Relevant) who messages again — whenever, whatever they say, however
    // long it's been — is no longer closed. The pipeline stage moves them
    // straight back to Lead, full stop; the human-handoff below is a
    // separate, deliberate policy (the assistant never auto-replies to a
    // returning chat) and stays exactly as it was.
    if (isClosed) {
      await store.setState(customer.id, 'NEW_LEAD', 'SYSTEM');
      await store.audit('system', 'reactivated_to_lead', { customerId: customer.id, from: customer.state, trigger: 'inbound_message' });
      customer = (await store.getCustomerByWaId(waId)) ?? customer;
    }
    if (!customer.aiPaused) {
      await store.updateCustomer(customer.id, { aiPaused: true });
      await store.cancelJobsFor(customer.id);
      await store.audit('system', 'routed_to_human_existing_chat', { customerId: customer.id });
    }
    // Whether this is the first message that paused the AI or another one in
    // the same burst, fold it into the one open task instead of a new one.
    await raiseOrUpdateTask(store, customer, {
      reason: isClosed ? 'A previous customer messaged again, needs a human' : 'An existing chat sent a message, needs a human',
      severity: 'REVIEW', newContext: text,
      suggestedReply: await suggestReply(text, customer, 'returning_customer'),
    });
    const c2 = await store.getCustomerByWaId(waId);
    return { outcome: { kind: 'human_task', decision: { action: 'human_task', confidence: 1 } }, customer: c2 ?? customer };
  }

  // ============================================================
  // "Am I talking to a bot?" (owner rule): the assistant NEVER answers this.
  // Not a denial, not an admission, not a deflection, and not even a draft for
  // the team to approve, because a draft is one click away from being sent.
  // Checked HERE, before the model is called, so no reply ever exists. The chat
  // is handed to a human and the assistant steps out of it.
  // ============================================================
  if (isIdentityQuestion(text)) {
    if (!customer.aiPaused) {
      await store.updateCustomer(customer.id, { aiPaused: true });
      await store.cancelJobsFor(customer.id);
    }
    await store.addTask({
      customerId: customer.id, customerName: customer.name ?? waId,
      reason: 'Customer asked whether they are talking to a bot, needs a human reply',
      // THE ONE TASK WITH NO SUGGESTED REPLY, and deliberately so. Every other
      // handoff now arrives with a draft (Jo, 25 Aug), but the older owner rule
      // is narrower and stricter: no answer to "am I talking to a bot" may ever
      // exist, not even as a draft, because a draft is one click from being
      // sent. This answer has to be a person's own words.
      severity: 'REVIEW', context: text.slice(0, 200), suggestedReply: null,
    });
    await store.audit('policy_guard', 'identity_question_handoff', { customerId: customer.id });
    const c2 = await store.getCustomerByWaId(waId);
    return { outcome: { kind: 'human_task', decision: { action: 'human_task', confidence: 1 } }, customer: c2 ?? customer };
  }

  // Global kill switch: store everything, but the assistant stays silent.
  const killSwitch = (await store.getSetting('kill_switch')) === true;

  const msgs = await store.listMessages(customer.id);
  const history: Turn[] = msgs
    .filter((m) => m.status === 'SENT') // pending/discarded drafts are NOT delivered context
    .map((m) => ({ role: m.direction === 'IN' ? ('customer' as const) : ('assistant' as const), text: m.body }));

  // Owner's rule: more than 3 messages before payment means this lead needs a
  // person, not more automated back-and-forth — even in FULL_AUTO. Counts
  // every inbound message sent while unpaid (this one included, since it was
  // already stored above), not just ones that end in a question mark: by the
  // 4th message before a cent has changed hands, the conversation itself is
  // the signal, whatever the exact wording. Checked before the engine runs so
  // no 4th reply is ever drafted, let alone sent.
  if (!customer.paid) {
    const questionsBeforePayment = msgs.filter((m) => m.direction === 'IN').length;
    if (questionsBeforePayment > 3) {
      if (!customer.aiPaused) {
        await store.updateCustomer(customer.id, { aiPaused: true });
        await store.cancelJobsFor(customer.id);
      }
      await raiseOrUpdateTask(store, customer, {
        reason: `Customer sent ${questionsBeforePayment} messages before paying — needs a person, not more automated replies`,
        severity: 'REVIEW', newContext: text,
        suggestedReply: await suggestReply(text, customer, 'many_questions'),
      });
      await store.audit('policy_guard', 'many_questions_before_payment', { customerId: customer.id, count: questionsBeforePayment });
      const c2 = await store.getCustomerByWaId(waId);
      return { outcome: { kind: 'human_task', decision: { action: 'human_task', confidence: 1 } }, customer: c2 ?? customer };
    }
  }

  // COST-01: daily global cap on paid AI decisions. When the budget is spent,
  // hand the conversation to a human instead of calling the model.
  if (await aiBudgetExhausted()) {
    await raiseOrUpdateTask(store, customer, {
      reason: 'Daily AI limit reached, please reply to this customer manually',
      severity: 'REVIEW', newContext: text.slice(0, 200),
      suggestedReply: await suggestReply(text, customer, 'budget'),
    });
    await store.audit('policy_guard', 'ai_budget_exhausted', { customerId: customer.id });
    const c2 = await store.getCustomerByWaId(waId);
    return { outcome: { kind: 'human_task', decision: { action: 'human_task', confidence: 1 } }, customer: c2 ?? customer };
  }

  // RAG: pull the most relevant learned answers for this exact message.
  const knowledge = await retrieveKnowledge(text, { lang: customer.lang ?? undefined }).catch(() => []);
  const ctx: CustomerContext = {
    // Owner rule: the model only ever sees the FIRST name, so it can never address
    // the customer by surname even if a full name was captured from WhatsApp.
    name: firstNameOf(customer.name) || null, state: customer.state, income: customer.income,
    paid: customer.paid, formComplete: customer.formComplete,
    missingDocs: customer.missingDocs, estimatedRefundCents: customer.estimatedRefundCents,
    knowledge,
  };

  const bank = await getBank();
  const outcome = await runEngine({
    ctx, history, mode, bank,
    guard: {
      aiPaused: customer.aiPaused, killSwitch,
      optedOut: customer.optedOut, isLegacy: customer.isLegacy,
      lastCustomerMsgAt: customer.lastCustomerMsgAt ? new Date(customer.lastCustomerMsgAt) : new Date(),
      // Jo's own rules. Loaded here, once per incoming message, and spread into
      // every guard call the engine makes — so a rule he adds applies to the
      // very next reply without a deploy. A failed read means no custom rules
      // for this message rather than no reply (loadCustomRules never throws).
      customRules: await loadCustomRules(),
    },
  });

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

  if (outcome.kind === 'sent' && outcome.replyText) {
    // apply state + income ONLY when actually sent
    if (outcome.newState) {
      await store.setState(customer.id, outcome.newState, 'AI');
      if (outcome.newState === 'PAID') await autoAdvanceToForm(customer.id, bank);
    }
    const inc = inferIncome(outcome.replyText);
    if (inc) await store.updateCustomer(customer.id, { income: inc });
    await deliverOut(customer, outcome.replyText, 'AI');
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
      meta: { proposedState: outcome.newState, income: inc ?? undefined },
    });
    await store.addJob({
      customerId: customer.id, kind: 'AUTO_REPLY', payload: { messageId: m.id },
      runAt: new Date(Date.now() + AUTOPILOT_REPLY_DELAY_SECONDS * 1000).toISOString(),
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
      for (const pm of prior) {
        if (pm.direction === 'OUT' && pm.status === 'PENDING_APPROVAL') {
          await store.setMessageStatus(pm.id, 'DISCARDED');
        }
      }
    } catch { /* non-blocking: worst case a stale draft lingers, never a wrong send */ }
    // Defer the state/income change until the owner approves (stored on the message).
    const inc = inferIncome(outcome.replyText);
    const m = await store.addMessage({
      customerId: customer.id, direction: 'OUT', author: 'AI', status: 'PENDING_APPROVAL',
      body: outcome.replyText,
      meta: { proposedState: outcome.newState, income: inc ?? undefined },
    });
    pendingMessageId = m.id;
  } else if (outcome.kind === 'human_task' && outcome.task) {
    await raiseOrUpdateTask(store, customer, {
      reason: outcome.task.reason, severity: outcome.task.severity,
      newContext: text, suggestedReply: outcome.task.suggestedReply ?? null,
    });
    await store.audit('assistant', 'human_task_created', { reason: outcome.task.reason });
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

  const fresh = await store.getCustomerByWaId(waId);
  if (fresh) await reconcileSchedule(fresh);
  return { outcome, customer: fresh ?? customer, pendingMessageId };
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
    await store.setState(customer.id, 'NEW_LEAD', 'SYSTEM');
    await store.audit('system', 'reactivated_to_lead', { customerId: customer.id, from: customer.state, trigger: 'inbound_media' });
    customer = (await store.getCustomerByWaId(waId)) ?? customer;
  }
  await store.addMessage({
    customerId: customer.id, direction: 'IN', author: 'CUSTOMER', status: 'SENT', body,
    meta: (meta?.media || meta?.reaction)
      ? { ...(meta.media ? { media: meta.media } : {}), ...(meta.reaction ? { reaction: meta.reaction } : {}) }
      : undefined,
  });
  // A reaction needs no reply, so it does not open a task — it is shown in the
  // thread and that is the whole of it. Raising one here was what buried the
  // real "cannot read this" tasks under a pile of thumbs-ups.
  if (meta?.reaction) return (await store.getCustomerByWaId(waId)) ?? customer;
  // Owner's rule: 20 invoice photos in a row is ONE task to open, not 20 —
  // raiseOrUpdateTask folds this into whatever task is already open for this
  // customer instead of creating a fresh one per attachment.
  await raiseOrUpdateTask(store, customer, {
    reason: meta?.media
      ? 'Customer sent an attachment Will cannot read. Open the chat to view it and reply.'
      : 'Customer sent a message Will cannot read (voice note or unsupported type). Open WhatsApp to read it and reply.',
    severity: 'REVIEW', newContext: body,
    // Even here there is something worth proposing: an acknowledgement that the
    // attachment arrived, so the customer is not left on read while the owner
    // opens it.
    suggestedReply: await suggestReply('', customer, meta?.media ? 'attachment' : 'unreadable'),
  });
  const fresh = await store.getCustomerByWaId(waId);
  return fresh ?? customer;
}

/** After payment confirmation (form link just sent), move to FORM_PENDING so the form follow-ups run. */
export async function autoAdvanceToForm(customerId: string, _bank: { bsb: string; account: string }): Promise<void> {
  const store = getStore();
  const c = await store.getCustomerById(customerId);
  if (c && c.state === 'PAID') await store.setState(customerId, 'FORM_PENDING', 'SYSTEM');
}

/** States in which a payment is actually outstanding — matches the text-based
 *  "I paid" detection in claude.ts (`looksLikePayment` + `PAYABLE_STATES`).
 *  Kept separate rather than imported because claude.ts's copy is a mock-model
 *  implementation detail, not something the webhook layer should depend on. */
const PAYABLE_STATES: CustomerState[] = ['PRICE_SENT', 'PAYMENT_PENDING'];

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
 *  Returns null when the attachment does not qualify: no existing customer,
 *  already paid, not currently in a state where a price is outstanding, the
 *  file could not be downloaded from Meta, or the vision check did not
 *  confirm it as a payment. */
export async function handlePaymentProofMedia(
  waId: string,
  body: string,
  meta: { name?: string; media: { id: string; kind: string; mime?: string; filename?: string; caption?: string } },
): Promise<CustomerRow | null> {
  const store = getStore();
  const customer = await store.getCustomerByWaId(waId);
  // `optedOut` belongs in this condition exactly as it does on every other send
  // path: a customer who asked us to stop must not receive a "payment received"
  // reply, however that payment reached us.
  if (!customer || customer.optedOut || customer.paid || !PAYABLE_STATES.includes(customer.state)) return null;

  const fetched = await fetchWaMedia(meta.media.id);
  if (!fetched.ok) {
    await store.audit('system', 'payment_proof_check_skipped', { customerId: customer.id, reason: fetched.error });
    return null;
  }
  const check = await assessPaymentProofImage(fetched.body, fetched.mime || meta.media.mime || '');
  await store.audit('system', 'payment_proof_checked', { customerId: customer.id, isProof: check.isProof, reason: check.reason ?? null });
  if (!check.isProof) return null; // not confirmed as payment — falls through to the manual task

  await store.addMessage({
    customerId: customer.id, direction: 'IN', author: 'CUSTOMER', status: 'SENT', body,
    meta: { media: meta.media },
  });

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
      body: APPROVED.payment_received,
      // proposedState: 'PAID' is exactly what approve_message already knows
      // how to apply — same guard re-check, same PAID -> FORM_PENDING
      // cascade via autoAdvanceToForm, same reconcileSchedule — as any other
      // deferred-state draft. No new approval machinery needed here.
      meta: { proposedState: 'PAID' },
    });
    await store.addTask({
      customerId: customer.id, customerName: customer.name ?? meta.name ?? waId,
      reason: `Customer sent proof of payment${check.reason ? ` (${check.reason})` : ''}. A "payment received" reply is drafted and waiting for your approval — nothing has been sent or moved yet.`,
      severity: 'REVIEW', context: body, suggestedReply: null,
    });
    await store.audit('system', 'payment_proof_drafted', { customerId: customer.id, mediaKind: meta.media.kind, messageId: draft.id });
    return (await store.getCustomerByWaId(waId)) ?? customer;
  }

  await store.setState(customer.id, 'PAID', 'SYSTEM'); // also flips customer.paid = true
  const bank = await getBank();
  await autoAdvanceToForm(customer.id, bank);
  await deliverOut(customer, APPROVED.payment_received, 'AI');

  // A heads-up, not a to-do: the stage already moved itself. This exists so
  // the owner can glance at the photo and catch a wrong/fake one, not because
  // anything is waiting on them.
  await store.addTask({
    customerId: customer.id, customerName: customer.name ?? meta.name ?? waId,
    reason: `Customer sent proof of payment${check.reason ? ` (${check.reason})` : ''}. Moved to Paid automatically — worth a glance to confirm it looks right.`,
    severity: 'REVIEW', context: body, suggestedReply: null,
  });

  await store.audit('system', 'auto_paid_from_media', { customerId: customer.id, mediaKind: meta.media.kind });
  return (await store.getCustomerByWaId(waId)) ?? customer;
}

export { SALES_STATES };
