// ============================================================
// Service layer: one entry point for an incoming customer
// message, shared by the simulator and the future WhatsApp
// webhook. Persists everything to the store.
// ============================================================
import { getStore, CustomerRow, CustomerState } from './store';
import { runEngine, AiMode, EngineOutcome } from './engine';
import { CustomerContext } from './playbook';
import { Turn } from './claude';
import { reconcileSchedule } from './scheduler';
import { detectLanguage } from './i18n';
import { retrieveKnowledge } from './knowledge';
import { deliverOut } from './channel';
import { isIdentityQuestion } from './identity-question';

export interface HandleResult {
  outcome: EngineOutcome;
  customer: CustomerRow;
  pendingMessageId?: string;
}

const OPT_OUT = /\b(stop|unsubscribe|opt ?out|stop messaging me|leave me alone|remove me)\b/i;
const SALES_STATES: CustomerState[] = ['NEW_LEAD', 'QUALIFIED', 'PRICE_SENT', 'PAYMENT_PENDING'];

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

// COST-01: a soft global ceiling on paid AI decisions per day. Configurable via
// the 'ai_daily_budget' setting; defaults high enough to never bother real
// traffic (5k customers/yr) but caps a runaway/abuse spend. Returns true when
// the budget for today is already spent (caller then hands off to a human).
const DEFAULT_AI_DAILY_BUDGET = 3000;
async function aiBudgetExhausted(): Promise<boolean> {
  const store = getStore();
  const budget = Number((await store.getSetting('ai_daily_budget')) ?? 0) || DEFAULT_AI_DAILY_BUDGET;
  const day = new Date().toISOString().slice(0, 10);
  const key = 'ai_calls:' + day;
  const used = Number((await store.getSetting(key)) ?? 0);
  if (used >= budget) return true;
  await store.setSetting(key, used + 1);
  return false;
}

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
    if (!customer.aiPaused) {
      await store.updateCustomer(customer.id, { aiPaused: true });
      await store.cancelJobsFor(customer.id);
      await store.addTask({
        customerId: customer.id, customerName: customer.name ?? waId,
        reason: isClosed ? 'A previous customer messaged again, needs a human' : 'An existing chat sent a message, needs a human',
        severity: 'REVIEW', context: text, suggestedReply: null,
      });
      await store.audit('system', 'routed_to_human_existing_chat', { customerId: customer.id });
    }
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

  // COST-01: daily global cap on paid AI decisions. When the budget is spent,
  // hand the conversation to a human instead of calling the model.
  if (await aiBudgetExhausted()) {
    await store.addTask({
      customerId: customer.id, customerName: customer.name ?? waId,
      reason: 'Daily AI limit reached, please reply to this customer manually',
      severity: 'REVIEW', context: text.slice(0, 200), suggestedReply: null,
    });
    await store.audit('policy_guard', 'ai_budget_exhausted', { customerId: customer.id });
    const c2 = await store.getCustomerByWaId(waId);
    return { outcome: { kind: 'human_task', decision: { action: 'human_task', confidence: 1 } }, customer: c2 ?? customer };
  }

  // RAG: pull the most relevant learned answers for this exact message.
  const knowledge = await retrieveKnowledge(text, { lang: customer.lang ?? undefined }).catch(() => []);
  const ctx: CustomerContext = {
    name: customer.name, state: customer.state, income: customer.income,
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
  } else if (outcome.kind === 'pending_approval' && outcome.replyText) {
    // Defer the state/income change until the owner approves (stored on the message).
    const inc = inferIncome(outcome.replyText);
    const m = await store.addMessage({
      customerId: customer.id, direction: 'OUT', author: 'AI', status: 'PENDING_APPROVAL',
      body: outcome.replyText,
      meta: { proposedState: outcome.newState, income: inc ?? undefined },
    });
    pendingMessageId = m.id;
  } else if (outcome.kind === 'human_task' && outcome.task) {
    await store.addTask({
      customerId: customer.id, customerName: customer.name ?? waId,
      reason: outcome.task.reason, severity: outcome.task.severity,
      context: text, suggestedReply: outcome.task.suggestedReply ?? null,
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

/** After payment confirmation (form link just sent), move to FORM_PENDING so the form follow-ups run. */
export async function autoAdvanceToForm(customerId: string, _bank: { bsb: string; account: string }): Promise<void> {
  const store = getStore();
  const c = await store.getCustomerById(customerId);
  if (c && c.state === 'PAID') await store.setState(customerId, 'FORM_PENDING', 'SYSTEM');
}

export { SALES_STATES };
