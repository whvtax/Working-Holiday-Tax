// Owner actions from the dashboard. Hardened after audit:
// preconditions on message status, approval-time re-guard,
// template save-time guard, real kill switch, quick manual replies.
import { NextResponse } from 'next/server';
import { sessionValid } from '@/lib/will/auth';
import { getStore, CustomerRow } from '@/lib/will/store';
import { policyGuard, registerLibraryBodies } from '@/lib/will/policy-guard';
import { canTransition, ALL_STATES, isSalesState, POST_PAYMENT_STATES, CustomerState } from '@/lib/will/state-machine';
import { autoAdvanceToForm, getBank, PAYMENT_PROOF_STATES, paymentReceivedBody } from '@/lib/will/service';
import { paymentReceivedTemplateKey } from '@/lib/will/i18n';
import { reconcileSchedule, restartSignatureCadenceFromNotice, followupsOffKey, flowForState, FLOW_TEMPLATES, greetingName } from '@/lib/will/scheduler';
import { fillPlaceholders } from '@/lib/will/engine';
import { formatAUD } from '@/lib/will/config';
import { readJson } from '@/lib/will/http';
import { deliverOut, sendWhatsAppText, sendWhatsAppTemplate } from '@/lib/will/channel';
import { resolveAiMode } from '@/lib/will/mode';
import { stripOperatorNote, suggestReply } from '@/lib/will/suggest';
import { APPROVED } from '@/lib/will/approved-messages';
import { stateAfterEstimate, composeEstimate } from '@/lib/will/estimate-send';
// afterHumanReplyIndexed resolves this customer's open tasks via the store's
// indexed listOpenTasksForCustomer instead of afterHumanReply's whole-table
// listTasks().filter(...): every send path here (Send Reply, manual, template,
// estimate/signature/lodged) was paying that scan on top of the read
// send_task_reply already fixed at getTaskById, above (audit3, 5 Sep).
import { afterHumanReplyIndexed as afterHumanReply } from '@/lib/will/after-reply';
import { applyFormReceived, parseUnmatchedFormTask } from '@/lib/will/form-link';
import { pauseWillOnCrmOpen } from '@/lib/will/review-auto-off';
import { explainSendError, describeViolations } from '@/lib/will/send-errors';
import { faultDismissedKey } from '@/lib/will/system-report';

export const dynamic = 'force-dynamic';

interface ActionBody {
  action: 'approve_message' | 'discard_message' | 'resolve_task' | 'mark_read' | 'toggle_ai'
  | 'update_template' | 'set_kill_switch' | 'set_ai_mode' | 'manual_reply' | 'send_task_reply' | 'send_template' | 'set_state' | 'add_template' | 'delete_template' | 'set_goal' | 'set_estimate' | 'send_estimate' | 'send_signature' | 'send_lodged' | 'retry_blocked' | 'send_followup' | 'delete_customer' | 'recover_lead' | 'create_task' | 'set_followups' | 'mark_form_received' | 'dismiss_fault';
  /** dismiss_fault only: the fault's stable key (SystemFault.key). */
  faultKey?: string;
  id?: string;
  customerId?: string;
  body?: string;
  value?: boolean;
  /** Approval / Autopilot. Separate from `value` because it is not a boolean. */
  mode?: string;
  state?: string;
  title?: string;
  category?: string;
  proposedBody?: string;
  goal?: number;
  amountCents?: number;
  /** send_estimate only. */
  invoiceLink?: string;
  /** set_state only: owner manual override — move to any stage, bypassing the
   *  one-step-at-a-time guardrails. */
  force?: boolean;
  /** create_task only: the task headline. `body`, if present, is its suggested reply. */
  reason?: string;
  /** mark_form_received only: the unmatched-questionnaire task being linked. */
  taskId?: string;
}

const bad = (msg: string, code = 400) => NextResponse.json({ error: msg }, { status: code });

/** "not a pending draft" said nothing about WHY (audit, 5 Sep): the usual
 *  reason is that the draft was already approved from another tab, or
 *  discarded, and the owner was left guessing whether the customer got it.
 *  Same refusal, same 400; the status is named. */
const DRAFT_STATUS_TEXT: Record<string, string> = {
  SENT: 'this draft was already sent',
  QUEUED: 'this draft is already being sent',
  SENDING: 'this draft is already being sent',
  DISCARDED: 'this draft was already discarded',
  BLOCKED: 'this draft was blocked by the Policy Guard; use Retry to put it back in the queue',
  FAILED: 'WhatsApp already rejected this draft; see the task on the board',
};
const notPendingDraft = (m: { direction: string; status: string }) => m.direction !== 'OUT'
  ? 'not a pending draft: this is a message from the customer, not a draft'
  : `not a pending draft: ${DRAFT_STATUS_TEXT[m.status] ?? `its status is ${m.status}`}`;

/**
 * The guard verdict, minus the two things that are only meaningful at SEND time.
 *
 * A template is judged before it is ever addressed to anyone, so:
 *  - OUTSIDE_24H_WINDOW: there is no conversation window to be outside of yet.
 *  - PLACEHOLDER_LEFTOVER: a placeholder is the POINT of a template. Without
 *    this, the four Library entries that carry one ({{DOCUMENT}}, {{AMOUNT}},
 *    {{REVIEW_LINK}}, {{INVOICE_LINK}}) could be read but never saved after an
 *    edit — "editable in the Library" was not true for exactly the messages
 *    that most need editing.
 *
 *  - REPLY_TOO_LONG: that rule caps the MODEL'S own prose so Will does not
 *    write essays. A Library message is the owner's deliberate wording, and
 *    the [opening] alone is ~580 characters; a rewrite of it that no longer
 *    matched the code copy sentence for sentence could not be saved at all
 *    (3 Sep). Every content rule (amounts, tax determinations, myGov steps,
 *    promises) still applies to a Library edit exactly as before.
 *
 * Nothing is relaxed at send time: humanSend still refuses an unfilled
 * placeholder, and the guard still raises it on every real send.
 */
function saveTimeViolations(violations: string[]): string[] {
  return violations.filter((v) =>
    !v.startsWith('OUTSIDE_24H') && v !== 'PLACEHOLDER_LEFTOVER' && v !== 'REPLY_TOO_LONG');
}

/** The owner's current wording for a Library entry, falling back to the
 *  approved constant if the Library cannot be read or the entry was deleted.
 *
 *  These two messages used to be typed inline right here, which meant they were
 *  the only customer-facing text in the system that was invisible in the
 *  Library and unchangeable without a deploy (Jo, 26 Aug). The text is
 *  unchanged; it simply comes from the editable copy now. */
async function libraryBody(key: string, fallback: string): Promise<string> {
  try {
    const t = (await getStore().listTemplates()).find((x) => x.key === key);
    return t && t.body.trim() ? t.body : fallback;
  } catch {
    return fallback;
  }
}

/** Final safety net for HUMAN-authored sends: fill placeholders, honour opt-out /
 *  kill switch / 24h window, and block leftover placeholders or secret/prompt leaks
 *  (owner content is trusted, but a raw {{AMOUNT}} or a leaked key never goes out).
 *
 *  Outside Meta's 24h customer-service window free text is rejected, so a plain
 *  send is refused there. The three fixed CRM messages (estimate, signature,
 *  lodged) have pre-approved Meta templates, so a caller that passes
 *  `templateBacked` is not refused: it gets `outsideWindow: true` back and sends
 *  the message as that template instead (Jo, 3 Sep). */
async function humanSend(
  customer: CustomerRow,
  rawBody: string,
  opts: { templateBacked?: boolean } = {},
): Promise<{ error?: string; body?: string; outsideWindow?: boolean }> {
  // A task's suggested reply may open with the "[Library answer, in English ...]"
  // operator note. It is for the owner, never the customer (audit, 5 Sep).
  rawBody = stripOperatorNote(rawBody);
  const store = getStore();
  if (customer.optedOut) return { error: 'customer opted out' };
  if ((await store.getSetting('kill_switch')) === true) return { error: 'kill switch is on' };
  const last = customer.lastCustomerMsgAt ? new Date(customer.lastCustomerMsgAt).getTime() : 0;
  const outsideWindow = Date.now() - last > 24 * 60 * 60 * 1000;
  if (outsideWindow && !opts.templateBacked) return { error: 'outside the 24h messaging window; use an approved template' };
  const reviewLink = (await store.getSetting('google_review_link')) as string | undefined;
  const amount = customer.estimatedRefundCents != null ? formatAUD(customer.estimatedRefundCents) : undefined;
  const body = fillPlaceholders(rawBody, await getBank(), { amount, reviewLink });
  // ANY leftover placeholder, not just {{UPPER_CASE}}: a Library body edited to
  // use {{1}} or {{name}} passed this check and reached the customer literally
  // (audit, 4 Sep). Every caller fills its own placeholders before this point.
  if (/\{\{[^}]{1,40}\}\}/.test(body)) return { error: 'message still has an unfilled placeholder (e.g. set the refund estimate first, fill the document name, or replace {{1}} with the first name)' };
  if (/(password|api.?key|access token|secret key|credentials)/i.test(body)) return { error: 'message looks like it contains a secret' };
  return { body: body.slice(0, 4000), outsideWindow };
}

/** The seven manual send buttons answered a Meta rejection with the raw
 *  string ("meta 404: (#132001) Template name does not exist in the
 *  translation"), which the Done modal and the card alerts print as-is, and
 *  the guard branches answered with bare codes ("SALES_CONTENT_AFTER_PAYMENT,
 *  EM_DASH_FORBIDDEN") that the toast joins with commas (audit, 5 Sep).
 *  explainSendError keeps the raw text and adds what to do (the scheduler's
 *  own "create it in WhatsApp Manager" sentence for a missing template);
 *  the guard branches keep their `blocked` codes (the hand-off card and the
 *  tests key off them) and add `blockedText` next to them. Owner-facing only;
 *  nothing here reaches a customer and nothing is sent differently. */
const notAccepted = (error: string | undefined, templateName?: string) =>
  bad(`WhatsApp did not accept the message: ${explainSendError(error, templateName)}`, 502);
// `error` carries the same sentence because the existing Approve and
// follow-up toasts show `error` when present and only fall back to joining
// the codes: the wording changes in the toast without touching the client.
const guardBlocked = (violations: string[], status?: number) => {
  const blockedText = describeViolations(violations);
  return NextResponse.json(
    { ok: false, blocked: violations, blockedText, error: blockedText },
    status ? { status } : undefined,
  );
};

/** The Library entry a human draft IS, if it is one: the trimmed text equals a
 *  Library body exactly, either as written or with {{1}} filled with the
 *  customer's greeting name (the shape the scheduler's follow-up tasks carry).
 *  Returns the Meta template of that key, ready for deliverOut.
 *
 *  Almost every task the scheduler raises (Medicare held or not delivered,
 *  review ask, follow-up held by the guard, the webhook's "did not deliver"
 *  card) is by construction outside the 24h window and carries the exact
 *  Library body as its suggested reply with "send it by hand". The Send Reply
 *  button then went through humanSend as free text and was refused for the
 *  window, and the chat composer refused for the same reason, so the one card
 *  the system asked the owner to act on could not be acted on from the board
 *  (audit, 5 Sep). When the draft is a Library body it now leaves exactly as
 *  send_template already sends it: plain text inside the window (unchanged),
 *  the approved template of that key with text fallback outside it. Same
 *  words reach the customer either way; an edited draft is still free text
 *  and still refused outside the window, as before. */
const squash = (s: string) => s.replace(/\s+/g, ' ').trim();
async function libraryTemplateFor(
  customer: CustomerRow,
  draft: string,
): Promise<{ name: string; params: string[]; lang: CustomerRow['lang']; fallbackToText: true } | null> {
  let templates: Array<{ key: string; body: string }> = [];
  try { templates = await getStore().listTemplates(); } catch { return null; }
  const want = squash(draft);
  if (!want) return null;
  const firstName = greetingName(customer);
  for (const t of templates) {
    if (!t.body.trim()) continue;
    const raw = squash(t.body);
    if (raw === want) {
      return { name: t.key, params: [], lang: customer.lang, fallbackToText: true };
    }
    if (/\{\{1\}\}/.test(t.body) && squash(t.body.replace(/\{\{1\}\}/g, firstName)) === want) {
      return { name: t.key, params: [firstName], lang: customer.lang, fallbackToText: true };
    }
  }
  return null;
}

/** Marking a customer Paid BY HAND (the stage badge, or the "mark them Paid"
 *  instruction on a payment task) used to run only the Paid -> Form Pending
 *  cascade: the form reminders were armed but the form link itself was never
 *  sent, so six hours later the customer was chased for a form they had not
 *  been given (audit, 5 Sep). Every automatic path sends the approved
 *  "payment received" line at this moment; this makes the manual path do the
 *  same, with the same silenced rules the screenshot path honours (kill
 *  switch / AI paused / legacy / opted out -> a one-click task instead of a
 *  send). A customer who already has the link in a SENT message (e.g. the
 *  approve_message path, or the model's own reply carried it) gets nothing
 *  twice. The owner may be marking Paid a day after the customer last wrote,
 *  so it goes as the Library-keyed template with text fallback, exactly like
 *  the other "may or may not have written recently" system lines. */
const FORM_LINK_RE = /workingholidaytax\.com\.au\/tax-form/i;
async function sendPaymentConfirmationIfMissing(customer: CustomerRow): Promise<void> {
  const store = getStore();
  const alreadyTold = (await store.listMessages(customer.id)).some((m) =>
    m.direction === 'OUT' && m.status === 'SENT' && FORM_LINK_RE.test(m.body ?? ''));
  if (alreadyTold) return;
  const confirmation = await paymentReceivedBody(store, customer.lang);
  const killSwitch = (await store.getSetting('kill_switch')) === true;
  const silenced = killSwitch || customer.aiPaused || customer.isLegacy || customer.optedOut;
  const why = killSwitch ? ' (kill switch)' : customer.aiPaused ? ' (AI paused)' : customer.isLegacy ? ' (legacy chat)' : customer.optedOut ? ' (opted out)' : '';
  const raise = async (reason: string) => {
    // One card per customer: deliverOut may already have raised its generic
    // "WhatsApp send failed" task for this same send, so enrich it.
    const open = await store.findOpenTaskForCustomer(customer.id);
    if (open) {
      await store.updateTask(open.id, { reason, severity: 'URGENT', suggestedReply: confirmation });
    } else {
      await store.addTask({
        customerId: customer.id, customerName: customer.name ?? customer.waId,
        reason, severity: 'URGENT', context: 'Marked Paid by hand.', suggestedReply: confirmation,
      });
    }
  };
  if (silenced) {
    await raise(`Marked Paid by hand, but Will is switched off on this chat${why}, so the confirmation with the form link was not sent. Send it yourself.`);
    await store.audit('owner', 'payment_received_not_sent', { customerId: customer.id, reason: killSwitch ? 'kill_switch' : customer.aiPaused ? 'ai_paused' : customer.isLegacy ? 'legacy' : 'opted_out', via: 'set_state' });
    return;
  }
  const out = await deliverOut(customer, confirmation, 'AI', undefined, {
    name: paymentReceivedTemplateKey(customer.lang), params: [], lang: customer.lang, fallbackToText: true,
  });
  if (!out.ok) {
    await store.audit('channel', 'payment_received_send_failed', { customerId: customer.id, error: out.error ?? 'unknown error', via: 'set_state' }).catch(() => {});
    await raise(`PAID, BUT THEY HAVE NOT BEEN TOLD. Marked Paid by hand, but WhatsApp rejected the confirmation with the form link: ${out.error ?? 'unknown error'}. Send it yourself, they are sitting in silence after paying.`);
    return;
  }
  await store.audit('owner', 'payment_received_sent_on_manual_paid', { customerId: customer.id }).catch(() => {});
}

/** Owner-facing, never sent to a customer: the toast when the message reached
 *  WhatsApp but a CRM write after it failed. */
const SENT_BOOKKEEPING_WARNING = 'Sent. The CRM could not finish updating the chat; refresh to check the stage and task.';

/** Bookkeeping that runs AFTER WhatsApp accepted a message (mark read, close
 *  the task, move the stage, re-arm the cadence, audit). Once the customer has
 *  the message the response must say so: these writes used to run bare, so a
 *  store hiccup here escaped to the POST wrapper and the dashboard printed
 *  "Not sent: action failed" for a message that had been delivered, and the
 *  natural reaction was to press send again, which is the duplicate the wrapper
 *  exists to prevent (audit, 5 Sep). Nothing here changes what is sent or
 *  written: the same steps run in the same order; a failure is audited with the
 *  step that broke and the send is still reported as sent, with a warning the
 *  dashboard can show. Returns the warning, or undefined when all went well. */
async function afterSend(customerId: string, step: string, fn: () => Promise<void>): Promise<string | undefined> {
  try {
    await fn();
    return undefined;
  } catch (e) {
    const error = e instanceof Error ? e.message.slice(0, 300) : String(e).slice(0, 300);
    await getStore().audit('owner', 'post_send_bookkeeping_failed', { customerId, step, error }).catch(() => { /* the message is out either way */ });
    return SENT_BOOKKEEPING_WARNING;
  }
}
/** `{ ok: true, warning }` only when there is one, so every existing reader of
 *  the plain `{ ok: true }` shape is unchanged. */
const sentJson = (warning: string | undefined, extra: Record<string, unknown> = {}) =>
  NextResponse.json(warning ? { ok: true, ...extra, warning } : { ok: true, ...extra });

/** Every owner action goes through this endpoint, including the ones that send a
 *  message. An unhandled throw here returns Next's raw HTML 500, which the
 *  dashboard cannot parse — so a send that actually reached the customer can
 *  surface to the operator as an unexplained failure, and get sent again. The
 *  wrapper below turns any escape into structured JSON the client can read. */
export async function POST(req: Request) {
  try {
    return await handlePost(req);
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    try {
      await getStore().audit('owner', 'action_unhandled_error', { error: message });
    } catch { /* the store is the most likely thing that just failed */ }
    return NextResponse.json(
      { ok: false, error: 'action failed', detail: message.slice(0, 300) },
      { status: 500 },
    );
  }
}

async function handlePost(req: Request) {
  if (!(await sessionValid())) return NextResponse.json({ ok:false, error:'unauthorized' }, { status:401 });
  // APPSEC-05: defence-in-depth CSRF check on this state-changing endpoint (on
  // top of SameSite=Strict on crm_session). Reject a cross-origin Origin; allow
  // when the header is absent (same-origin fetches and some clients omit it).
  const origin = req.headers.get('origin');
  if (origin) {
    try { if (new URL(origin).host !== new URL(req.url).host) return bad('bad origin', 403); }
    catch { /* malformed origin header: ignore */ }
  }
  const store = getStore();
  const parsed = await readJson<ActionBody>(req);
  if ('error' in parsed) return bad(parsed.error, parsed.code);
  const b = parsed.value;

  switch (b.action) {
    case 'approve_message': {
      if (!b.id) return bad('id required');
      const msg = await store.getMessageById(b.id);
      const customer = msg ? await store.getCustomerById(msg.customerId) : null;
      if (!msg || !customer) return bad('message not found', 404);
      if (msg.direction !== 'OUT' || msg.status !== 'PENDING_APPROVAL') return bad(notPendingDraft(msg));

      // Re-run the guard against the customer's CURRENT reality (audit finding:
      // the world may have changed since the draft was written).
      const killSwitch = (await store.getSetting('kill_switch')) === true;
      // A draft queued by the scheduler carries the approved WhatsApp template
      // it will be transmitted as, and the send below picks its transport from
      // exactly this field. The guard has to be told the same thing, or it
      // judges a template as if it were free-form text.
      //
      // This was hardcoded false, which made every scheduled follow-up
      // impossible to approve. A follow-up is sent precisely because the
      // customer has been quiet for 24 hours or more, so it is always outside
      // Meta's customer-service window: the guard raised
      // OUTSIDE_24H_WINDOW_NEEDS_TEMPLATE every time, marked the draft BLOCKED
      // and opened a task, so the nudge could never be sent.
      const isApprovedTemplate = !!(msg.meta?.waTemplate as { name?: string } | undefined)?.name;
      // The guard must recognise Jo's LIVE Library wording here exactly as it
      // does when the draft was written (decide() registers it); this process
      // may be a different serverless instance that has never seen it, and
      // his own long Library text came back as REPLY_TOO_LONG on approval
      // (audit, 3 Sep).
      try { registerLibraryBodies((await store.listTemplates()).map((t) => t.body)); } catch { /* best effort */ }
      const verdict = policyGuard(msg.body, {
        state: customer.state, paid: customer.paid, aiPaused: false, killSwitch,
        optedOut: customer.optedOut, isLegacy: customer.isLegacy,
        lastCustomerMsgAt: customer.lastCustomerMsgAt ? new Date(customer.lastCustomerMsgAt) : null,
        isApprovedTemplate, estimateFromTeam: customer.estimatedRefundCents,
      });
      if (!verdict.allowed) {
        await store.setMessageStatus(msg.id, 'BLOCKED');
        await store.addTask({
          customerId: customer.id, customerName: customer.name ?? customer.waId,
          // Codes first (the hand-off card keys off this prefix), then what
          // each one means, so the card says what to change (audit, 5 Sep).
          reason: `Draft became invalid before approval: ${verdict.violations.join(', ')}. ${describeViolations(verdict.violations)}`,
          severity: 'REVIEW', context: msg.body.slice(0, 200),
          // The blocked text itself is the most useful thing to show: the fix is
          // usually one sentence, and editing it beats writing a reply from
          // nothing. It is only a draft — sending it runs the guard again.
          suggestedReply: await suggestReply('', customer, 'draft_invalid', msg.body),
        });
        return guardBlocked(verdict.violations);
      }

      // M4: if the draft presupposed a state change that is no longer valid
      // (the world moved on), do not send a message that assumes it happened.
      //
      // One transition is allowed here that the state machine's one-step walk
      // does not list: a confirmed payment from ANY pre-payment sales stage.
      // The screenshot path already accepts a receipt from NEW_LEAD/QUALIFIED
      // (PAYMENT_PROOF_STATES, Jo 31 Aug: the price was quoted in the chat, not
      // by the price message), and in Approval mode it drafts "payment
      // received" with proposedState PAID. That draft could then never be
      // approved: QUALIFIED -> PAID is not a listed step, so Approve blocked
      // it as STALE_DRAFT and the customer stayed in Lead with paid=false
      // (audit, 3 Sep). Same rule in both places now.
      const proposed = msg.meta?.proposedState;
      const allowedStep = (to: CustomerState) => canTransition(customer.state, to)
        || (to === 'PAID' && !customer.paid && PAYMENT_PROOF_STATES.includes(customer.state));
      if (proposed && proposed !== customer.state && !allowedStep(proposed)) {
        await store.setMessageStatus(msg.id, 'BLOCKED');
        await store.addTask({
          customerId: customer.id, customerName: customer.name ?? customer.waId,
          reason: `Draft is stale: it assumed ${proposed} but the customer is now ${customer.state}`,
          severity: 'REVIEW', context: msg.body.slice(0, 200), suggestedReply: msg.body,
        });
        return guardBlocked(['STALE_DRAFT']);
      }

      // RACE-02: atomically claim the draft (PENDING_APPROVAL -> QUEUED) so a
      // double-click or two operators cannot both transmit the same message.
      const claimed = await store.claimMessageForSend(msg.id);
      if (!claimed) return bad('draft already handled', 409);

      // Transmit the approved draft to WhatsApp, then record the result. In test
      // mode (no channel credentials) this is a no-op and the draft is marked SENT.
      // A draft queued by the scheduler carries the approved template it must go
      // out as, because it is deliberately reaching someone who has been quiet
      // for a day or more and free-form text is rejected outside Meta's 24h
      // window. Conversation replies carry nothing and go as plain text.
      const wa = msg.meta?.waTemplate as { name?: string; params?: string[]; lang?: string | null; fallbackToText?: boolean } | undefined;
      let tx = wa?.name
        ? await sendWhatsAppTemplate(customer.waId, wa.name, wa.params ?? [], wa.lang ?? customer.lang)
        : await sendWhatsAppText(customer.waId, msg.body);
      // A system line drafted with a template Jo has not created in Meta goes
      // as the same text (see deliverOut's fallbackToText), so approving it
      // does not fail on a template that was only ever optional.
      if (!tx.ok && wa?.fallbackToText && /does not exist|not exist|132001|template/i.test(tx.error ?? '')) {
        tx = await sendWhatsAppText(customer.waId, msg.body);
      }
      if (!tx.ok) {
        // Meta throttling is "try again later", not a failure (audit, 5 Sep).
        // channel.ts marks 429 / 4 / 80007 / 131056 / 130429 / 131049 as
        // retryable and the scheduler re-queues its own sends on exactly these;
        // this branch marked the draft FAILED, which retry_blocked never
        // revives and which raises no task, so a follow-up approved in a busy
        // morning was simply gone (Momo, per-person marketing limit 131049,
        // 4 Sep). Put the draft back in the queue instead, so the operator
        // approves it again when the limit clears. Nothing is sent, nothing
        // is worded differently.
        if (tx.retryable) {
          await store.setMessageStatus(msg.id, 'PENDING_APPROVAL');
          await store.audit('channel', 'send_throttled', { id: msg.id, customerId: customer.id, error: tx.error });
          const marketingLimit = /131049/.test(tx.error ?? '');
          return NextResponse.json({
            ok: false, retryable: true,
            error: marketingLimit
              ? 'WhatsApp has hit this customer’s daily marketing limit; the draft is still in the queue, approve it again tomorrow evening'
              : 'WhatsApp is throttling right now; the draft is still in the queue, approve it again in a few minutes',
          });
        }
        await store.setMessageStatus(msg.id, 'FAILED');
        // customerId + template so the System card's "WhatsApp send" row can
        // say whom it concerned (audit, 5 Sep); `id` kept for older readers.
        await store.audit('channel', 'send_failed', {
          id: msg.id, messageId: msg.id, customerId: customer.id, template: wa?.name ?? null, error: tx.error,
        });
        const explained = explainSendError(tx.error, wa?.name);
        // A real rejection: the same one-per-customer "WhatsApp send failed"
        // task deliverOut raises, so the text is on the board with the reason
        // and can be sent from there. Before, the only trace was a red toast.
        // A rejected "payment received" draft is the auto path's failed send
        // in Approval mode (audit, 5 Sep): the owner's Approve IS the payment
        // confirmation, so the deferred PAID step is applied exactly as
        // handlePaymentProof keeps its state changes on a rejected send, and
        // the card is the same URGENT "PAID, BUT THEY HAVE NOT BEEN TOLD" one
        // with the confirmation ready to send. Before, the customer stayed
        // unpaid, the pre-payment nudges kept going, and the open payment task
        // still read "drafted and waiting for your approval".
        const paymentDraft = proposed === 'PAID' && proposed !== customer.state && allowedStep(proposed);
        if (paymentDraft) {
          await store.setState(customer.id, 'PAID', 'HUMAN');
          await autoAdvanceToForm(customer.id, await getBank());
          const fresh = await store.getCustomerById(customer.id);
          if (fresh) await reconcileSchedule(fresh);
          await store.audit('channel', 'payment_received_send_failed', { customerId: customer.id, error: tx.error ?? 'unknown error', via: 'approve_message' }).catch(() => {});
        }
        const failReason = paymentDraft
          ? `PAID, BUT THEY HAVE NOT BEEN TOLD. You approved the payment and they are moved to Paid, but WhatsApp rejected the confirmation: ${explained}. Send it yourself, they are sitting in silence after paying.`
          : `WhatsApp send failed: ${explained}`;
        const severity = paymentDraft ? 'URGENT' : 'REVIEW';
        const open = await store.findOpenTaskForCustomer(customer.id);
        if (open) {
          await store.updateTask(open.id, { reason: failReason, severity, suggestedReply: msg.body });
        } else {
          await store.addTask({
            customerId: customer.id, customerName: customer.name ?? customer.waId,
            reason: failReason, severity, context: msg.body.slice(0, 200), suggestedReply: msg.body,
          });
        }
        // The toast shows `error` verbatim: with the hint it says what to do.
        return NextResponse.json({ ok: false, blocked: ['SEND_FAILED'], error: explained });
      }
      // From here the customer HAS the message: see afterSend (audit, 5 Sep).
      const warning = await afterSend(customer.id, 'approve_message', async () => {
      // restamp: the draft may have waited minutes or hours for approval. The
      // customer receives it NOW, so its shown time must be now — otherwise it
      // displays the old draft time and sits above newer customer messages.
      await store.setMessageStatus(msg.id, 'SENT', { restamp: true });
      // Approving a draft IS engaging with the conversation — you read what they
      // wrote, you read the proposed answer, you sent it. So the chat stops
      // being unread, exactly as it does when you reply from your own phone.
      //
      // deliverOut() has done this for every HUMAN send since it was written,
      // but this branch transmits directly (a queued follow-up has to go as its
      // approved WhatsApp template, which deliverOut's plain-text path cannot
      // do), so it never inherited the behaviour. The result was chats staying
      // bold with a green "1" on them after they had been answered — Jo, 27 Aug,
      // and it is worse than cosmetic: an unread badge that lies is a list you
      // stop trusting, and then a real unread message gets missed in it.
      // Both halves of "this conversation has been answered": the badge, and
      // the task that was asking for the answer. See lib/will/after-reply.ts.
      await afterHumanReply(store, customer.id);
      // Apply the state/income change that was deferred until approval.
      if (proposed && proposed !== customer.state && allowedStep(proposed)) {
        await store.setState(customer.id, proposed, 'HUMAN');
        if (proposed === 'PAID') await autoAdvanceToForm(customer.id, await getBank());
      }
      if (msg.meta?.income) await store.updateCustomer(customer.id, { income: msg.meta.income });
      const fresh = await store.getCustomerById(customer.id);
      if (fresh) await reconcileSchedule(fresh);
      // customerId on every owner row, so the audit trail can be followed by
      // person and not only by message id (audit, 5 Sep).
      await store.audit('owner', 'draft_approved', { id: b.id, customerId: customer.id, template: wa?.name ?? null });
      });
      return sentJson(warning);
    }

    case 'send_followup': {
      // Send one of the scheduled nudges by hand, from inside the chat, after
      // reading the conversation. The scheduler sends these on a timer; this is
      // the same message on the owner's judgement instead.
      //
      // It cannot go through the normal manual-send path: a follow-up exists
      // because the customer has been quiet, so it is always outside Meta's 24h
      // window and free-form text is refused there. It goes as the approved
      // WhatsApp template, exactly as the scheduler sends it.
      if (!b.customerId || !b.id) return bad('customerId and template key required');
      const customer = await store.getCustomerById(b.customerId);
      if (!customer) return bad('customer not found', 404);

      const flow = flowForState(customer.state);
      const allowed = flow ? FLOW_TEMPLATES[flow] : [];
      if (!allowed.includes(b.id)) return bad('that follow-up does not belong to this stage');

      const template = (await store.listTemplates()).find((t) => t.key === b.id);
      if (!template) return bad('template not found', 404);

      if (customer.optedOut) return bad('customer opted out');
      if ((await store.getSetting('kill_switch')) === true) return bad('kill switch is on');

      const firstName = greetingName(customer);
      const body = template.body.replace(/\{\{1\}\}/g, firstName);

      const verdict = policyGuard(body, {
        state: customer.state, paid: customer.paid, aiPaused: false, killSwitch: false,
        optedOut: customer.optedOut, isLegacy: customer.isLegacy,
        lastCustomerMsgAt: customer.lastCustomerMsgAt ? new Date(customer.lastCustomerMsgAt) : null,
        isApprovedTemplate: true, estimateFromTeam: customer.estimatedRefundCents,
      });
      if (!verdict.allowed) return guardBlocked(verdict.violations, 422);

      const waTemplate = { name: template.key, params: [firstName], lang: customer.lang };
      const out = await deliverOut(customer, body, 'HUMAN', { waTemplate }, waTemplate);
      if (!out.ok) return notAccepted(out.error, waTemplate?.name);
      // From here the customer HAS the message: see afterSend (audit, 5 Sep).
      const warning = await afterSend(customer.id, 'send_followup', async () => {
      await afterHumanReply(store, customer.id);
      // A nudge sent by hand IS that step of the cadence, so it is recorded as
      // a delivered step and the sequence continues from the next one. It used
      // to be invisible to the scheduler, which sent the identical template
      // again on its own timer, so the customer got the same nudge twice in a
      // day, both metered (audit, 3 Sep). Cancel the pending step first: the
      // one-pending-follow-up index would otherwise hand back that row.
      try {
        await store.cancelJobsFor(customer.id, ['FOLLOW_UP', 'AUTO_CLOSE']);
        const seq = allowed.indexOf(template.key);
        const done = await store.addJob({
          customerId: customer.id, kind: 'FOLLOW_UP',
          payload: { templateKey: template.key, seq, flow: flow ?? undefined },
          runAt: new Date().toISOString(),
        });
        await store.setJobStatus(done.id, 'DONE');
        const fresh = await store.getCustomerById(customer.id);
        if (fresh) await reconcileSchedule(fresh);
      } catch (e) {
        await store.audit('scheduler', 'manual_followup_not_recorded', {
          customerId: customer.id, template: template.key,
          error: e instanceof Error ? e.message.slice(0, 200) : String(e).slice(0, 200),
        }).catch(() => { /* the message is out either way */ });
      }
      await store.audit('owner', 'followup_sent_manually', { customerId: customer.id, template: template.key });
      });
      return sentJson(warning);
    }

    case 'retry_blocked': {
      // Put a BLOCKED draft back in the approval queue.
      //
      // Needed because of the bug above: scheduled follow-ups were judged as
      // free-form text at approval time, so they were marked BLOCKED and the
      // draft was consumed. The scheduler had already advanced the sequence, so
      // nothing re-queued them and there was no route left to send them at all.
      //
      // This does not bypass anything. The draft goes back to PENDING_APPROVAL
      // and has to pass the guard again on approval, exactly like any other.
      if (!b.customerId) return bad('customerId required');
      const customer = await store.getCustomerById(b.customerId);
      if (!customer) return bad('customer not found', 404);
      const blocked = (await store.listMessages(customer.id))
        .filter((m) => m.direction === 'OUT' && m.status === 'BLOCKED')
        .sort((a, c) => new Date(c.createdAt).getTime() - new Date(a.createdAt).getTime())[0];
      if (!blocked) return bad('no blocked draft for this customer', 404);
      await store.setMessageStatus(blocked.id, 'PENDING_APPROVAL');
      await store.audit('owner', 'blocked_draft_requeued', { id: blocked.id, customerId: customer.id });
      return NextResponse.json({ ok: true, id: blocked.id });
    }

    case 'discard_message': {
      if (!b.id) return bad('id required');
      const m = await store.getMessageById(b.id);
      if (!m) return bad('message not found', 404);
      if (m.direction !== 'OUT' || m.status !== 'PENDING_APPROVAL') return bad(notPendingDraft(m));
      await store.setMessageStatus(m.id, 'DISCARDED');
      await store.audit('owner', 'draft_discarded', { id: b.id, customerId: m.customerId });
      return NextResponse.json({ ok: true });
    }

    case 'send_task_reply': {
      // Approve/edit the assistant's suggestion from a Human Task and send it,
      // without opening the chat. Sent as the owner (HUMAN), so guard content
      // rules don't apply, but hard gates do.
      if (!b.id || typeof b.body !== 'string' || !b.body.trim()) return bad('id and body required');
      // One indexed row, not listTasks() (every open task plus the recent
      // resolved ones, contexts included) scanned for one id: that read was
      // part of the wait behind the greyed Send Reply button (audit, 5 Sep).
      // Same rule as before: only an OPEN task with a customer can be answered.
      const task = await store.getTaskById(b.id);
      // Say WHY it is not open (audit, 5 Sep): the card is usually closed
      // because the customer was answered from the chat, and the reply typed
      // on it is lost on the next refresh, so the owner needs to know where
      // to send it instead. Same rule, same 404.
      if (!task || task.status !== 'OPEN' || !task.customerId) {
        return bad(!task
          ? 'task not open: this task no longer exists'
          : task.status !== 'OPEN'
            ? 'task not open: this task is already closed (answered from the chat, or dismissed); open the chat to send this'
            : 'task not open: this task has no customer to reply to', 404);
      }
      const customer = await store.getCustomerById(task.customerId);
      if (!customer) return bad('customer gone', 404);
      // A draft that IS a Library body goes the way send_template goes (see
      // libraryTemplateFor): outside the window as the approved template of
      // that key, so the scheduler's own "send it by hand" tasks can be sent
      // from the board (audit, 5 Sep). Anything else is free text, as before.
      const draft = b.body.trim();
      const library = await libraryTemplateFor(customer, draft);
      const send = await humanSend(customer, draft, { templateBacked: !!library });
      if (send.error) return bad(send.error);
      const waTemplate = library && send.outsideWindow ? library : undefined;
      // Only resolve the task if the message actually went out. Before this the
      // send result was ignored, so a failed send still closed the task and the
      // customer was left unanswered with no trace on the board.
      const out = await deliverOut(customer, send.body!, 'HUMAN', waTemplate ? { waTemplate } : undefined, waTemplate);
      if (!out.ok) return notAccepted(out.error, waTemplate?.name);
      // Not only THIS task: everything open for this customer, and the unread
      // badge with it. Two tasks for one person answered by one message is one
      // conversation settled, not one and a half.
      // From here the customer HAS the message: see afterSend (audit, 5 Sep).
      const warning = await afterSend(customer.id, 'send_task_reply', async () => {
        await afterHumanReply(store, customer.id);
        // customerId alongside taskId: a task id alone cannot be traced back to
        // a person once the task is resolved (audit3, 5 Sep).
        await store.audit('owner', 'task_reply_sent', { taskId: task.id, customerId: customer.id });
      });
      return sentJson(warning);
    }

    case 'manual_reply': {
      // Quick manual message to any customer, no chat screen needed.
      //
      // A manual reply NO LONGER pauses the assistant (Jo, 31 Aug: "never turn
      // off Will, even if I stepped in manually — Will keeps the conversation").
      // A quick line from the owner used to silence Will for that chat for good,
      // and the lead then went cold with nothing chasing it. Taking over is now
      // a deliberate choice: the per-chat "Will Active / Paused" toggle is still
      // there for when the owner really wants the wheel. Genuinely sensitive
      // threads (refunds, complaints, an upset customer) still route to a human
      // task and are held, so this does not let Will talk over those.
      if (!b.customerId || typeof b.body !== 'string' || !b.body.trim()) return bad('customerId and body required');
      const customer = await store.getCustomerById(b.customerId);
      if (!customer) return bad('customer not found', 404);
      // Same rule as send_task_reply (audit, 5 Sep): the Quick-fill chips drop
      // the exact Library body (req_abn, req_expenses, req_doc, medicare) into
      // the composer and it left here as free text, so the 24h banner's own
      // advice ("use one of the template buttons above") was refused by the
      // very buttons it pointed at. A composer text that IS a Library body now
      // goes the way send_template goes: unchanged plain text inside the
      // window, the approved template of that key (text fallback) outside it.
      // Edited text is still free text and is still refused outside the window.
      const draft = b.body.trim();
      const library = await libraryTemplateFor(customer, draft);
      const send = await humanSend(customer, draft, { templateBacked: !!library });
      if (send.error) return bad(send.error);
      const waTemplate = library && send.outsideWindow ? library : undefined;
      // The send can fail at Meta (outside the 24h window, a bad token, a
      // rejected number). Before this check the result was ignored and the UI
      // reported success regardless, so a message that never reached the
      // customer looked sent. Now the real outcome is returned.
      const out = await deliverOut(customer, send.body!, 'HUMAN', waTemplate ? { waTemplate } : undefined, waTemplate);
      if (!out.ok) return notAccepted(out.error, waTemplate?.name);
      // Answering from the chat is the same signal as answering via the Tasks
      // screen: the customer has a reply now, so mark the chat read and close
      // any open task for them — WITHOUT pausing Will.
      // From here the customer HAS the message: see afterSend (audit, 5 Sep).
      const warning = await afterSend(customer.id, 'manual_reply', async () => {
        await afterHumanReply(store, customer.id);
        await store.audit('owner', 'manual_reply', { customerId: customer.id });
      });
      return sentJson(warning, { aiPaused: customer.aiPaused });
    }

    case 'send_template': {
      // One-click send of an approved service template (Medicare, ABN, etc.).
      // H1: fill placeholders and run the human-send safety net so a raw
      // {{AMOUNT}}/{{DOCUMENT}} or a secret never reaches the customer.
      if (!b.customerId || !b.id) return bad('customerId and template id required');
      const customer = await store.getCustomerById(b.customerId);
      if (!customer) return bad('customer not found', 404);
      const template = (await store.listTemplates()).find((t) => t.id === b.id || t.key === b.id);
      if (!template) return bad('template not found', 404);
      // templateBacked: a Library message is one Jo has (or can have) as an
      // approved Meta template under the SAME key, so it must not be refused
      // just because the customer last wrote more than 24 hours ago — `medicare`
      // in particular is sent days after the questionnaire (Jo, 4 Sep). Outside
      // the window it goes as the approved template of that name; if no such
      // template exists in Meta yet, fallbackToText re-sends the same wording as
      // free text, so a key Jo has not created costs nothing.
      const send = await humanSend(customer, template.body, { templateBacked: true });
      if (send.error) return bad(send.error);
      const waTemplate = send.outsideWindow
        ? { name: template.key, params: [], lang: customer.lang, fallbackToText: true }
        : undefined;
      const out = await deliverOut(customer, send.body!, 'HUMAN', waTemplate ? { waTemplate } : undefined, waTemplate);
      if (!out.ok) return notAccepted(out.error, waTemplate?.name);
      // The case Jo hit: sending the very template Will proposed, from the
      // chat, used to leave its task open in the Tasks tab.
      // From here the customer HAS the message: see afterSend (audit, 5 Sep).
      const warning = await afterSend(customer.id, 'send_template', async () => {
        await afterHumanReply(store, customer.id);
        await store.audit('owner', 'template_sent_manually', { customerId: customer.id, template: template.key });
      });
      return sentJson(warning);
    }

    case 'recover_lead': {
      // The button on a lost-lead card. The post-mortem judged this person
      // still winnable and wrote the message to send them; this puts that
      // message in front of the owner as an ordinary task, in the same place
      // as every other thing waiting for him.
      //
      // IT DOES NOT SEND. Jo, 28 Aug: "a button I press and it goes over to
      // Will, to tasks and a draft". A win-back is the most delicate message
      // this system produces, written about somebody who already said no or
      // went quiet, so it is read by a person before it goes anywhere. The
      // send path from the task is the ordinary one, guard included.
      if (!b.customerId) return bad('customerId required');
      const customer = await store.getCustomerById(b.customerId);
      if (!customer) return bad('customer not found', 404);
      if (customer.optedOut) return bad('this person asked us to stop messaging them');

      const analysis = (await store.listLostAnalyses()).find((r) => r.customerId === customer.id);
      if (!analysis || analysis.status !== 'OK') return bad('this lead has not been assessed yet');
      if (analysis.recoverable === 'NO') return bad('the assessment says this lead cannot be recovered');
      const draft = analysis.recoveryMessage?.trim();
      if (!draft) return bad('the assessment did not write a message for this lead');

      const existing = await store.findOpenTaskForCustomer(customer.id);
      const reason = 'Win-back: the assessment says this lead is still worth a message. Read it, change anything you want, send it.';
      const context = analysis.reason;
      if (existing) {
        // One task per customer, same rule as everywhere else.
        await store.updateTask(existing.id, { reason, severity: 'REVIEW', context, suggestedReply: draft });
      } else {
        await store.addTask({
          customerId: customer.id, customerName: customer.name ?? customer.waId,
          reason, severity: 'REVIEW', context, suggestedReply: draft,
        });
      }
      await store.audit('owner', 'lost_lead_recovery_queued', { customerId: customer.id });
      return NextResponse.json({ ok: true });
    }

    case 'create_task': {
      // Open a task for the owner from the Overview copilot's "open task"
      // proposal. This only writes an internal reminder — nothing is sent to
      // the customer. Any suggested reply carried here is a draft: it is sent,
      // if at all, from the Tasks screen through send_task_reply, which runs the
      // full human-send guard. One task per customer, same rule as everywhere.
      if (!b.customerId || typeof b.reason !== 'string' || !b.reason.trim()) return bad('customerId and reason required');
      const customer = await store.getCustomerById(b.customerId);
      if (!customer) return bad('customer not found', 404);
      const reason = b.reason.trim().slice(0, 300);
      const suggestedReply = typeof b.body === 'string' && b.body.trim() ? b.body.trim().slice(0, 4000) : null;
      const existing = await store.findOpenTaskForCustomer(customer.id);
      if (existing) {
        await store.updateTask(existing.id, { reason, severity: 'REVIEW', context: 'Opened from the Overview assistant', suggestedReply });
      } else {
        await store.addTask({
          customerId: customer.id, customerName: customer.name ?? customer.waId,
          reason, severity: 'REVIEW', context: 'Opened from the Overview assistant', suggestedReply,
        });
      }
      await store.audit('owner', 'assistant_task_created', { customerId: customer.id });
      return NextResponse.json({ ok: true });
    }

    case 'mark_form_received': {
      // "Link to chat" on an unmatched-questionnaire task (audit, 5 Sep). The
      // task used to say "mark their form complete by hand" and the CRM had no
      // such control: moving the stage badge only moved the badge. This runs
      // the SAME path an automatic phone match runs (applyFormReceived): form
      // complete, reminders cancelled, confirmation or ABN questions in the
      // customer's language, and the Medicare message if the form said "No".
      // Nothing new is said to the customer; the owner just picks the chat.
      if (!b.customerId) return bad('customerId required');
      const customer = await store.getCustomerById(b.customerId);
      if (!customer) return bad('customer not found', 404);
      // Single-row read; see send_task_reply (audit, 5 Sep).
      const task = b.taskId ? (await store.getTaskById(b.taskId)) ?? undefined : undefined;
      const submitted = parseUnmatchedFormTask(task?.context);
      const outcome = await applyFormReceived(customer, {
        email: submitted?.email ?? null,
        hasMedicare: submitted?.hasMedicare ?? null,
        matchedOn: 'owner-link',
      });
      if (task && task.status === 'OPEN') await store.resolveTask(task.id);
      await store.audit('owner', 'form_linked_by_hand', {
        customerId: customer.id, taskId: task?.id ?? null, outcome, state: customer.state,
      });
      return NextResponse.json({ ok: true, outcome });
    }

    case 'resolve_task':
      if (!b.id) return bad('id required');
      await store.resolveTask(b.id);
      // The row used to carry only the task id (audit, 5 Sep); the customer
      // is looked up best effort so the trail can be read by person.
      // Single-row read, not the whole task table (audit, 5 Sep).
      const resolvedFor = await store.getTaskById(b.id).then((t) => t?.customerId ?? null).catch(() => null);
      await store.audit('owner', 'task_resolved', { id: b.id, customerId: resolvedFor });
      return NextResponse.json({ ok: true });

    case 'mark_read': {
      if (!b.id) return bad('id required');
      await store.markCustomerRead(b.id);
      // Opening the chat is Jo taking the wheel (Jo, 6 Sep): Will switches
      // off for this customer right here, every time, no matter the stage.
      // Reuses aiPaused, so the manual Take Over / Resume Will toggle keeps
      // working exactly as before on top of this.
      const opened = await store.getCustomerById(b.id);
      if (opened) await pauseWillOnCrmOpen(store, opened).catch(() => { /* best effort: mark_read itself must not fail */ });
      return NextResponse.json({ ok: true });
    }

    case 'delete_customer': {
      // Permanently remove a chat/customer and everything tied to it (messages,
      // tasks, state history, scheduled jobs) — for test/simulator leftovers or
      // any chat that should never have counted as a real lead. This does not
      // touch anything on WhatsApp; it only clears our own records.
      if (!b.customerId) return bad('customerId required');
      const customer = await store.getCustomerById(b.customerId);
      if (!customer) return bad('customer not found', 404);
      await store.cancelJobsFor(customer.id);
      await store.deleteCustomerByWaId(customer.waId);
      await store.audit('owner', 'customer_deleted', { customerId: b.customerId, waId: customer.waId });
      return NextResponse.json({ ok: true });
    }

    case 'toggle_ai': {
      if (!b.id) return bad('id required');
      await store.updateCustomer(b.id, { aiPaused: !b.value });
      // L3: resuming the assistant re-arms the follow-up cadence that was
      // cancelled while paused.
      const c = await store.getCustomerById(b.id);
      if (c && b.value) await reconcileSchedule(c);
      await store.audit('owner', b.value ? 'assistant_resumed' : 'assistant_paused', { customerId: b.id });
      return NextResponse.json({ ok: true });
    }

    // The Approval / Autopilot switch. It previously changed nothing but React
    // state, so the dashboard showed a mode the system had never been told
    // about — and approval mode held only because the settings row happened to
    // be absent. Now it is a real, audited, persisted decision.
    //
    // Only the two known values are accepted, and anything else is refused
    // rather than stored, because every reader treats an unrecognised value as
    // "ask the owner" and a stored typo would be a mode nobody chose.
    case 'set_ai_mode': {
      if (b.mode !== 'SUPERVISED' && b.mode !== 'FULL_AUTO') return bad('unknown mode');
      const mode = resolveAiMode(b.mode);
      await store.setSetting('ai_mode', mode);
      await store.audit('owner', mode === 'FULL_AUTO' ? 'ai_mode_autopilot' : 'ai_mode_approval', { mode });
      return NextResponse.json({ ok: true, mode });
    }

    case 'set_kill_switch':
      await store.setSetting('kill_switch', b.value === true);
      await store.audit('owner', b.value ? 'kill_switch_on' : 'kill_switch_off');
      return NextResponse.json({ ok: true });

    // Dismiss a System Faults card (Jo, 6 Sep): "I've dealt with this, clear
    // it". Not a delete — there is no row to delete, the card is a live
    // grouping of recent audit rows — so this records WHEN it was dismissed.
    // A fresh occurrence of the same fault after that time has a newer
    // lastAt and reappears on its own; see applyFaultDismissals.
    case 'dismiss_fault': {
      if (!b.faultKey) return bad('faultKey required');
      await store.setSetting(faultDismissedKey(b.faultKey), new Date().toISOString());
      await store.audit('owner', 'fault_dismissed', { faultKey: b.faultKey });
      return NextResponse.json({ ok: true });
    }

    case 'set_followups': {
      // Per-customer follow-up switch (Jo, 29 Aug). Turn the follow-up cadence
      // ON for one customer, e.g. a returning lead or someone you took over and
      // handled by hand and now want chased again; or turn it OFF to stop
      // chasing this one person. Turning it on also resumes Will for the chat,
      // because a follow-up cannot go out while Will is paused for that customer.
      if (!b.customerId) return bad('customerId required');
      const customer = await store.getCustomerById(b.customerId);
      if (!customer) return bad('customer not found', 404);
      if (b.value === true) {
        await store.setSetting(followupsOffKey(customer.id), false);
        if (customer.aiPaused) await store.updateCustomer(customer.id, { aiPaused: false });
        const fresh = await store.getCustomerById(customer.id);
        if (fresh) await reconcileSchedule(fresh);
        const armed = flowForState((fresh ?? customer).state) != null && !(fresh ?? customer).optedOut;
        await store.audit('owner', 'followups_started', { customerId: customer.id });
        return NextResponse.json({ ok: true, armed });
      }
      // Remembered, not just cancelled: reconcileSchedule reads this on every
      // inbound message and state change (audit, 4 Sep).
      await store.setSetting(followupsOffKey(customer.id), true);
      await store.cancelJobsFor(customer.id, ['FOLLOW_UP', 'AUTO_CLOSE']);
      await store.audit('owner', 'followups_stopped', { customerId: customer.id });
      return NextResponse.json({ ok: true, armed: false });
    }

    case 'set_state': {
      // Manual stage move by the owner. H3: validate against the state enum.
      // H4: never let a paid customer be pushed back into the sales flow.
      if (!b.customerId || !b.state) return bad('customerId and state required');
      const customer = await store.getCustomerById(b.customerId);
      if (!customer) return bad('customer not found', 404);
      if (!ALL_STATES.includes(b.state as CustomerState)) return bad('unknown state');
      const target = b.state as CustomerState;
      if (target === customer.state) return NextResponse.json({ ok: true });
      // Owner manual override (the clickable stage badge): move a customer to ANY
      // stage, forward or back, no questions asked. This is a deliberate human
      // action from the CRM, so the step-by-step guardrails below are bypassed.
      if (b.force === true) {
        await store.setState(customer.id, target, 'HUMAN');
        // Paid by hand is paid: the same Paid -> Form Pending cascade every
        // automatic path does, so the form reminders exist for this customer
        // too (audit, 3 Sep: a customer marked Paid from the stage menu sat in
        // Paid with no reminder ever sent).
        //
        // Only for a FIRST payment though (audit, 5 Sep): a customer moved
        // BACK to Paid from a later stage (Review -> Paid to correct a badge)
        // has already been through this cascade. Running it again pushed them
        // on to Form Pending, and with the questionnaire already in, queued a
        // second FORM_RECEIVED: the customer got the "received" line or the
        // ABN questions twice and the badge read "Review" again on refresh
        // instead of the "Paid" the owner chose. The stage badge itself is
        // still honoured for these customers; the confirmation-if-missing
        // check stays because it is already idempotent.
        if (target === 'PAID') {
          if (!POST_PAYMENT_STATES.includes(customer.state)) {
            await autoAdvanceToForm(customer.id, await getBank());
          }
          // The form link goes with it, as on every automatic path (audit, 5 Sep).
          await sendPaymentConfirmationIfMissing(customer);
        }
        const f = await store.getCustomerById(customer.id);
        if (f) await reconcileSchedule(f);
        return NextResponse.json({ ok: true });
      }
      const isClosed = ['NOT_INTERESTED', 'WENT_COLD', 'NOT_RELEVANT'].includes(target);
      // A paid customer can only move forward within the service flow or be closed,
      // never back into sales (spec §5).
      if ((customer.paid || POST_PAYMENT_STATES.includes(customer.state)) && isSalesState(target)) {
        return bad('a paid customer cannot be moved back into the sales flow');
      }
      const forward = canTransition(customer.state, target);
      const wasClosed = ['NOT_INTERESTED', 'WENT_COLD', 'NOT_RELEVANT'].includes(customer.state);
      const reopen = wasClosed && target === (customer.previousState ?? 'QUALIFIED');
      // Owner may step one stage forward, close a customer, or reopen a closed one.
      // Arbitrary multi-stage skips are rejected (they corrupt reporting & flow).
      if (!forward && !isClosed && !reopen) {
        return bad('that stage jump is not allowed; move one stage at a time');
      }
      await store.setState(customer.id, target, 'HUMAN');
      if (target === 'PAID') {
        await autoAdvanceToForm(customer.id, await getBank());
        await sendPaymentConfirmationIfMissing(customer);
      }
      const fresh = await store.getCustomerById(customer.id);
      if (fresh) await reconcileSchedule(fresh);
      return NextResponse.json({ ok: true });
    }

    case 'set_estimate': {
      // M1: set the team-approved refund estimate so the estimate message can
      // fill {{AMOUNT}} and pass the guard. State-gated to the review stages.
      if (!b.customerId || typeof b.amountCents !== 'number' || !Number.isFinite(b.amountCents) || b.amountCents < 0) {
        return bad('customerId and a valid amountCents required');
      }
      const customer = await store.getCustomerById(b.customerId);
      if (!customer) return bad('customer not found', 404);
      if (!['UNDER_REVIEW', 'ESTIMATE_READY', 'FINAL_REVIEW', 'DOCUMENTS_COMPLETE'].includes(customer.state)) {
        return bad('estimate can only be set during review');
      }
      await store.updateCustomer(customer.id, { estimatedRefundCents: Math.round(b.amountCents) });
      await store.audit('owner', 'estimate_set', { customerId: customer.id, amountCents: Math.round(b.amountCents) });
      return NextResponse.json({ ok: true });
    }

    case 'send_estimate': {
      // The "Send Estimate + Invoice" button on a Review chat, and the Done
      // button on a CRM task: one step instead of set_estimate + compose +
      // send + move-stage separately. Composes the fixed message, sends it,
      // records the estimate, and moves the customer to Signature.
      //
      // WHY SIGNATURE AND NOT ESTIMATE READY (Jo, 28 Aug). This is pressed at
      // the end of the work, not in the middle of it: the return is finished,
      // the amount is known, the invoice is raised. There is nothing left for
      // the customer to be "in review" for, so the pipeline moves them to
      // Signature and the signature follow-ups take it from there.
      //
      // ONE MESSAGE, NOT TWO. The estimate message is the only thing sent.
      // send_signature's wording ("I've emailed it to you for review and
      // signature") is a claim about an email that has not been sent yet at
      // this moment, so it stays on its own button.
      //
      // Someone already AT Signature or beyond is a correction resend: the
      // message goes again and the stage is left exactly where it is, so
      // fixing a typo in an amount can never drag a signed return backwards.
      if (!b.customerId || typeof b.amountCents !== 'number' || !Number.isFinite(b.amountCents) || b.amountCents < 0) {
        return bad('customerId and a valid amountCents required');
      }
      if (typeof b.invoiceLink !== 'string' || !b.invoiceLink.trim()) return bad('invoiceLink required');
      let invoiceUrl: URL;
      try { invoiceUrl = new URL(b.invoiceLink.trim()); } catch { return bad('invoiceLink must be a valid URL'); }
      if (invoiceUrl.protocol !== 'http:' && invoiceUrl.protocol !== 'https:') return bad('invoiceLink must be a valid URL');

      const customer = await store.getCustomerById(b.customerId);
      if (!customer) return bad('customer not found', 404);
      // No pipeline-stage gate (Jo, 30 Aug). The owner can send the estimate and
      // invoice from ANY stage: this is a deliberate manual action with a typed
      // amount and a typed invoice link, and the completed CRM task is itself the
      // proof the work is done - so whatever stage the linked WhatsApp chat
      // happens to sit at must not block it. stateAfterEstimate still leaves
      // anyone already at Signature or beyond exactly where they are (a
      // correction resend never drags a signed return backwards); everyone else
      // lands at Signature.

      const amountCents = Math.round(b.amountCents);
      // Filled here rather than in humanSend: the amount comes from this
      // request, and the customer's stored estimate is only written further
      // down, once the send has actually succeeded.
      const body = composeEstimate(
        await libraryBody('estimate_invoice', APPROVED.estimate_invoice),
        amountCents,
        invoiceUrl.toString(),
      );

      const send = await humanSend(customer, body, { templateBacked: true });
      if (send.error) return bad(send.error);
      // Outside the 24h window this goes as the pre-approved Meta template
      // `estimate_invoice` ({{1}} = amount, {{2}} = invoice link); inside it,
      // the Library wording goes as free text. Same text either way.
      const waTemplate = send.outsideWindow
        ? { name: 'estimate_invoice', params: [formatAUD(amountCents), invoiceUrl.toString()], lang: customer.lang }
        : undefined;
      const out = await deliverOut(customer, send.body!, 'HUMAN', waTemplate ? { waTemplate } : undefined, waTemplate);
      if (!out.ok) return notAccepted(out.error, waTemplate?.name);

      // Will is never auto-paused (Jo, 31 Aug): the estimate goes out but Will
      // stays active on the chat and keeps handling the customer.
      // From here the customer HAS the message: see afterSend (audit, 5 Sep).
      const warning = await afterSend(customer.id, 'send_estimate', async () => {
        await store.updateCustomer(customer.id, { estimatedRefundCents: amountCents });
        const nextState = stateAfterEstimate(customer.state);
        if (nextState) {
          await store.setState(customer.id, nextState, 'HUMAN');
          const fresh = await store.getCustomerById(customer.id);
          if (fresh) await reconcileSchedule(fresh);
        }
        await afterHumanReply(store, customer.id);
        await store.audit('owner', 'estimate_sent', { customerId: customer.id, amountCents, invoiceLink: invoiceUrl.toString() });
      });
      return sentJson(warning);
    }

    case 'send_signature': {
      // "Send for Signature" button: once the actual return has been emailed to
      // the customer for them to sign, one click sends the "ready for signature"
      // confirmation.
      //
      // Two entry points share this. The Will Dashboard presses it while the
      // customer is still at the estimate stage, so it also moves them to
      // Signature. The CRM Done card presses it AFTER the Done flow has already
      // sent the estimate + invoice and moved them to Signature, so here it must
      // NOT move them: it only sends the notice and leaves them exactly where
      // they are (Jo, 31 Aug: "the customer doesn't move in the pipe").
      if (!b.customerId) return bad('customerId required');
      const customer = await store.getCustomerById(b.customerId);
      if (!customer) return bad('customer not found', 404);
      // Jo, 4 Sep: the button decides. Wherever the customer sits in the pipe,
      // sending "your tax return is ready for signature" from the CRM moves
      // them to Signature, because the return really has been emailed to them.
      // The old stage gate refused the click for anyone not already at the
      // estimate stage, which meant the message Jo had just sent by hand and
      // the pipeline disagreed.
      const sigBody = await libraryBody('signature', APPROVED.signature_ready);
      const send = await humanSend(customer, sigBody, { templateBacked: true });
      if (send.error) return bad(send.error);
      // Outside the 24h window: the pre-approved Meta template `signature` (no
      // variables). Inside it: the Library wording as free text.
      const waTemplate = send.outsideWindow ? { name: 'signature', params: [], lang: customer.lang } : undefined;
      const out = await deliverOut(customer, send.body!, 'HUMAN', waTemplate ? { waTemplate } : undefined, waTemplate);
      if (!out.ok) return notAccepted(out.error, waTemplate?.name);
      // Will is never auto-paused (Jo, 31 Aug): the "ready for signature" note
      // goes out but Will stays active on the chat.
      // Only move if they were still upstream; a customer already at Signature
      // stays put so the pipeline position does not change on this click.
      // From here the customer HAS the message: see afterSend (audit, 5 Sep).
      const warning = await afterSend(customer.id, 'send_signature', async () => {
        if (customer.state !== 'SIGNATURE_PENDING') await store.setState(customer.id, 'SIGNATURE_PENDING', 'HUMAN');
        await store.audit('owner', 'signature_stage_forced', { customerId: customer.id, from: customer.state });
        const fresh = await store.getCustomerById(customer.id);
        if (fresh) await reconcileSchedule(fresh);
        await afterHumanReply(store, customer.id);
        // LAST, because reconcileSchedule above re-arms the signature cadence with
        // the three-day prep offset that belongs to the Done path. The customer has
        // the return in their inbox NOW, so the nudges run 24h / 3d / 7d from this
        // click (audit, 4 Sep: nudge one landed four days after the notice).
        await restartSignatureCadenceFromNotice(customer.id).catch(() => { /* the notice is what matters */ });
        await store.audit('owner', 'signature_sent', { customerId: customer.id });
      });
      return sentJson(warning);
    }

    case 'send_lodged': {
      // "Mark Lodged" button (Signature stage): one click sends the lodged +
      // review-request confirmation, exactly as the owner worded it, and
      // moves the customer on to Completed. SIGNED is also accepted (already
      // marked signed some other way) so this stays idempotent either way.
      if (!b.customerId) return bad('customerId required');
      const customer = await store.getCustomerById(b.customerId);
      if (!customer) return bad('customer not found', 404);
      // Same rule as the signature button (Jo, 4 Sep): the click is the truth.
      // A customer moved to Completed by hand, or still at Estimate when the
      // return was lodged, could not be marked lodged at all before this.
      const body = await libraryBody('lodged_confirmation', APPROVED.lodged_confirmation);
      const send = await humanSend(customer, body, { templateBacked: true });
      if (send.error) return bad(send.error);
      // Outside the 24h window: the pre-approved Meta template
      // `lodged_confirmation` (no variables). Inside it: free text.
      const waTemplate = send.outsideWindow ? { name: 'lodged_confirmation', params: [], lang: customer.lang } : undefined;
      const out = await deliverOut(customer, send.body!, 'HUMAN', waTemplate ? { waTemplate } : undefined, waTemplate);
      if (!out.ok) return notAccepted(out.error, waTemplate?.name);
      // Will is never auto-paused (Jo, 31 Aug): the lodged note goes out but
      // Will stays active on the chat.
      // From here the customer HAS the message: see afterSend (audit, 5 Sep).
      let filedUnderClients = false;
      const warning = await afterSend(customer.id, 'send_lodged', async () => {
        await store.setState(customer.id, 'LODGED', 'HUMAN');
        // Ask for a Google review 1 hour later, as its own warmer message (Jo, 31
        // Aug): the lodgement note no longer carries the ask; the REVIEW_REQUEST
        // job sends it once, a little after the good news lands.
        await store.addJob({
          customerId: customer.id, kind: 'REVIEW_REQUEST', payload: {},
          runAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
        }).catch(() => { /* never let the review nudge block marking lodged */ });
        const fresh = await store.getCustomerById(customer.id);
        if (fresh) await reconcileSchedule(fresh);
        await afterHumanReply(store, customer.id);
        // Lodged IS the end of the job, from whichever button it was pressed
        // (Jo, 3 Sep). From the CRM card the client transfer happened in the
        // browser; pressed inside Will's chat it did not happen at all, so the
        // card stayed in Done (audit, 4 Sep). Filing it here covers both.
        try {
          const { archiveTaskByPhone } = await import('@/lib/db');
          filedUnderClients = !!(await archiveTaskByPhone(customer.waId));
        } catch { /* never let the CRM half block marking lodged */ }
        await store.audit('owner', 'lodged_sent', { customerId: customer.id, filedUnderClients });
      });
      return sentJson(warning, { filedUnderClients });
    }

    case 'add_template': {
      if (typeof b.body !== 'string' || !b.body.trim()) return bad('body required');
      if (b.body.length > 5000) return bad('too long');
      const verdict = policyGuard(b.body, {
        state: 'PRICE_SENT', paid: false, aiPaused: false, killSwitch: false,
        optedOut: false, isLegacy: false, lastCustomerMsgAt: new Date(),
        isApprovedTemplate: false, estimateFromTeam: null,
      });
      const cv = saveTimeViolations(verdict.violations);
      if (cv.length) return guardBlocked(cv, 422);
      const row = await store.addTemplate({ category: b.category ?? 'Custom', title: b.title ?? 'Untitled message', body: b.body });
      await store.audit('owner', 'template_added', { id: row.id });
      return NextResponse.json({ ok: true, id: row.id });
    }
    case 'delete_template': {
      if (!b.id) return bad('id required');
      // Deleting stays possible, but a follow-up step must not vanish quietly
      // (audit, 5 Sep): when a FOLLOW_UP job finds no template the scheduler
      // skips that step (H6) and nothing else says so, so every customer in
      // that flow silently misses the nudge until someone runs Sync library
      // from file. The audit row now names the key, a follow-up key also
      // writes a row the System card turns into a warning, and the reply
      // tells the caller which step it just removed. Nothing the customer
      // sees changes; the gap is just visible now.
      const doomed = (await store.listTemplates()).find((t) => t.id === b.id) ?? null;
      const followUpStep = !!doomed && Object.values(FLOW_TEMPLATES).some((keys) => keys.includes(doomed.key));
      await store.deleteTemplate(b.id);
      await store.audit('owner', 'template_deleted', { id: b.id, key: doomed?.key ?? null, title: doomed?.title ?? null, followUpStep });
      if (followUpStep && doomed) {
        await store.audit('owner', 'follow_up_template_deleted', {
          id: b.id, key: doomed.key, title: doomed.title,
          note: `Follow-up step "${doomed.key}" (${doomed.title}) was deleted from the Library. Every customer due that step is skipped until it is restored with Sync library from file.`,
        });
      }
      return NextResponse.json({ ok: true, key: doomed?.key ?? null, followUpStep });
    }


    case 'set_goal':
      // The lead→paid target is fixed at 100% (owner decision) — it is never
      // negotiated down, in the UI or here. Kept as an explicit rejection
      // rather than a silent no-op, and as a distinct action from the old
      // "set any percentage" version so a stale client request fails loudly.
      return bad('the goal is fixed at 100% and cannot be changed', 403);

    case 'update_template': {
      if (!b.id || typeof b.body !== 'string') return bad('id and body required');
      if (b.body.length > 5000) return bad('template too long');
      // Save-time guard (audit finding): an edited template must not smuggle
      // forbidden content past the approved-template exemption later.
      const verdict = policyGuard(b.body, {
        state: 'PRICE_SENT', paid: false, aiPaused: false, killSwitch: false,
        optedOut: false, isLegacy: false, lastCustomerMsgAt: new Date(),
        isApprovedTemplate: false, estimateFromTeam: null,
      });
      const contentViolations = saveTimeViolations(verdict.violations);
      if (contentViolations.length) {
        return guardBlocked(contentViolations, 422);
      }
      // Keep the wording being replaced (audit, 5 Sep): the store overwrites
      // `body` in place and only bumps the version counter, so after a
      // mistaken edit, or after Sync reverts an owner edit to the code copy,
      // the previous text was gone and had to be retyped from memory. The
      // audit row now carries before/after (and the key, so a follow-up step
      // can be found without the id); the Library modal can list these and
      // restore one by calling update_template again, through the same
      // save-time guard above. Storage, sends and rules are unchanged.
      const current = (await store.listTemplates()).find((t) => t.id === b.id) ?? null;
      await store.updateTemplate(b.id, b.body);
      const version = current ? current.versions + 1 : null;
      await store.audit('owner', 'template_updated', {
        id: b.id, key: current?.key ?? null, title: current?.title ?? null,
        before: current?.body ?? null, after: b.body, version,
      });
      return NextResponse.json({ ok: true, key: current?.key ?? null, version });
    }
  }
  return bad('bad action');
}
