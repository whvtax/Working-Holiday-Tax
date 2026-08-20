// ============================================================
// Service layer: one entry point for an incoming customer
// message, shared by the simulator and the future WhatsApp
// webhook. Persists everything to the store.
// ============================================================
import { getStore, CustomerRow, CustomerState } from './store';
import { runEngine, AiMode, EngineOutcome, fillPlaceholders } from './engine';
import { CustomerContext } from './playbook';
import { Turn } from './claude';
import { reconcileSchedule } from './scheduler';
import { APPROVED } from './approved-messages';
import { detectLanguage } from './i18n';

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

  // Global kill switch: store everything, but the assistant stays silent.
  const killSwitch = (await store.getSetting('kill_switch')) === true;

  const msgs = await store.listMessages(customer.id);
  const history: Turn[] = msgs
    .filter((m) => m.status === 'SENT') // pending/discarded drafts are NOT delivered context
    .map((m) => ({ role: m.direction === 'IN' ? ('customer' as const) : ('assistant' as const), text: m.body }));

  const ctx: CustomerContext = {
    name: customer.name, state: customer.state, income: customer.income,
    paid: customer.paid, formComplete: customer.formComplete,
    missingDocs: customer.missingDocs, estimatedRefundCents: customer.estimatedRefundCents,
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

  // Income the model actually decided (only when it sent a price template).
  const inferIncome = (t: string): 'TFN' | 'TFN_ABN' | null =>
    t === fillPlaceholders(APPROVED.price_tfn_abn, bank) ? 'TFN_ABN'
      : t === fillPlaceholders(APPROVED.price_tfn, bank) ? 'TFN' : null;

  let pendingMessageId: string | undefined;

  if (outcome.kind === 'sent' && outcome.replyText) {
    // apply state + income ONLY when actually sent
    if (outcome.newState) {
      await store.setState(customer.id, outcome.newState, 'AI');
      if (outcome.newState === 'PAID') await autoAdvanceToForm(customer.id, bank);
    }
    const inc = inferIncome(outcome.replyText);
    if (inc) await store.updateCustomer(customer.id, { income: inc });
    await store.addMessage({ customerId: customer.id, direction: 'OUT', author: 'AI', status: 'SENT', body: outcome.replyText });
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

  const fresh = await store.getCustomerByWaId(waId);
  if (fresh) await reconcileSchedule(fresh);
  return { outcome, customer: fresh ?? customer, pendingMessageId };
}

/** After payment confirmation (form link just sent), move to FORM_PENDING so the form follow-ups run. */
export async function autoAdvanceToForm(customerId: string, _bank: { bsb: string; account: string }): Promise<void> {
  const store = getStore();
  const c = (await store.listCustomers()).find((x) => x.id === customerId);
  if (c && c.state === 'PAID') await store.setState(customerId, 'FORM_PENDING', 'SYSTEM');
}

export { SALES_STATES };
