// Owner actions from the dashboard. Hardened after audit:
// preconditions on message status, approval-time re-guard,
// template save-time guard, real kill switch, quick manual replies.
import { NextResponse } from 'next/server';
import { sessionValid } from '@/lib/will/auth';
import { getStore, CustomerRow } from '@/lib/will/store';
import { policyGuard } from '@/lib/will/policy-guard';
import { canTransition, ALL_STATES, isSalesState, POST_PAYMENT_STATES, CustomerState } from '@/lib/will/state-machine';
import { autoAdvanceToForm, getBank } from '@/lib/will/service';
import { reconcileSchedule, flowForState, FLOW_TEMPLATES, greetingName } from '@/lib/will/scheduler';
import { fillPlaceholders } from '@/lib/will/engine';
import { formatAUD } from '@/lib/will/config';
import { readJson } from '@/lib/will/http';
import { deliverOut, sendWhatsAppText, sendWhatsAppTemplate } from '@/lib/will/channel';
import { resolveAiMode } from '@/lib/will/mode';
import { suggestReply } from '@/lib/will/suggest';
import { APPROVED } from '@/lib/will/approved-messages';
import { canSendEstimate, stateAfterEstimate, composeEstimate } from '@/lib/will/estimate-send';
import { afterHumanReply } from '@/lib/will/after-reply';

export const dynamic = 'force-dynamic';

interface ActionBody {
  action: 'approve_message' | 'discard_message' | 'resolve_task' | 'mark_read' | 'toggle_ai'
  | 'update_template' | 'set_kill_switch' | 'set_ai_mode' | 'manual_reply' | 'send_task_reply' | 'send_template' | 'set_state' | 'add_template' | 'delete_template' | 'set_goal' | 'set_estimate' | 'send_estimate' | 'send_signature' | 'send_lodged' | 'retry_blocked' | 'send_followup' | 'delete_customer' | 'recover_lead' | 'create_task';
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
}

const bad = (msg: string, code = 400) => NextResponse.json({ error: msg }, { status: code });

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
 * Nothing is relaxed at send time: humanSend still refuses an unfilled
 * placeholder, and the guard still raises it on every real send.
 */
function saveTimeViolations(violations: string[]): string[] {
  return violations.filter((v) => !v.startsWith('OUTSIDE_24H') && v !== 'PLACEHOLDER_LEFTOVER');
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
 *  (owner content is trusted, but a raw {{AMOUNT}} or a leaked key never goes out). */
async function humanSend(customer: CustomerRow, rawBody: string): Promise<{ error?: string; body?: string }> {
  const store = getStore();
  if (customer.optedOut) return { error: 'customer opted out' };
  if ((await store.getSetting('kill_switch')) === true) return { error: 'kill switch is on' };
  const last = customer.lastCustomerMsgAt ? new Date(customer.lastCustomerMsgAt).getTime() : 0;
  if (Date.now() - last > 24 * 60 * 60 * 1000) return { error: 'outside the 24h messaging window; use an approved template' };
  const reviewLink = (await store.getSetting('google_review_link')) as string | undefined;
  const amount = customer.estimatedRefundCents != null ? formatAUD(customer.estimatedRefundCents) : undefined;
  const body = fillPlaceholders(rawBody, await getBank(), { amount, reviewLink });
  if (/\{\{[A-Z_]+\}\}/.test(body)) return { error: 'message still has an unfilled placeholder (e.g. set the refund estimate first, or fill the document name)' };
  if (/(password|api.?key|access token|secret key|credentials)/i.test(body)) return { error: 'message looks like it contains a secret' };
  return { body: body.slice(0, 4000) };
}

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
      if (msg.direction !== 'OUT' || msg.status !== 'PENDING_APPROVAL') return bad('not a pending draft');

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
          reason: `Draft became invalid before approval: ${verdict.violations.join(', ')}`,
          severity: 'REVIEW', context: msg.body.slice(0, 200),
          // The blocked text itself is the most useful thing to show: the fix is
          // usually one sentence, and editing it beats writing a reply from
          // nothing. It is only a draft — sending it runs the guard again.
          suggestedReply: await suggestReply('', customer, 'draft_invalid', msg.body),
        });
        return NextResponse.json({ ok: false, blocked: verdict.violations });
      }

      // M4: if the draft presupposed a state change that is no longer valid
      // (the world moved on), do not send a message that assumes it happened.
      if (msg.meta?.proposedState && msg.meta.proposedState !== customer.state
          && !canTransition(customer.state, msg.meta.proposedState)) {
        await store.setMessageStatus(msg.id, 'BLOCKED');
        await store.addTask({
          customerId: customer.id, customerName: customer.name ?? customer.waId,
          reason: `Draft is stale: it assumed ${msg.meta.proposedState} but the customer is now ${customer.state}`,
          severity: 'REVIEW', context: msg.body.slice(0, 200), suggestedReply: msg.body,
        });
        return NextResponse.json({ ok: false, blocked: ['STALE_DRAFT'] });
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
      const wa = msg.meta?.waTemplate as { name?: string; params?: string[]; lang?: string | null } | undefined;
      const tx = wa?.name
        ? await sendWhatsAppTemplate(customer.waId, wa.name, wa.params ?? [], wa.lang ?? customer.lang)
        : await sendWhatsAppText(customer.waId, msg.body);
      if (!tx.ok) {
        await store.setMessageStatus(msg.id, 'FAILED');
        await store.audit('channel', 'send_failed', { id: msg.id, error: tx.error });
        return NextResponse.json({ ok: false, blocked: ['SEND_FAILED'], error: tx.error });
      }
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
      if (msg.meta?.proposedState && canTransition(customer.state, msg.meta.proposedState)) {
        await store.setState(customer.id, msg.meta.proposedState, 'HUMAN');
        if (msg.meta.proposedState === 'PAID') await autoAdvanceToForm(customer.id, await getBank());
      }
      if (msg.meta?.income) await store.updateCustomer(customer.id, { income: msg.meta.income });
      const fresh = await store.getCustomerById(customer.id);
      if (fresh) await reconcileSchedule(fresh);
      await store.audit('owner', 'draft_approved', { id: b.id });
      return NextResponse.json({ ok: true });
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
      if (!verdict.allowed) return NextResponse.json({ ok: false, blocked: verdict.violations }, { status: 422 });

      const waTemplate = { name: template.key, params: [firstName], lang: customer.lang };
      const out = await deliverOut(customer, body, 'HUMAN', { waTemplate }, waTemplate);
      if (!out.ok) return bad(`WhatsApp did not accept the message: ${out.error ?? 'unknown error'}`, 502);
      await afterHumanReply(store, customer.id);
      await store.audit('owner', 'followup_sent_manually', { customerId: customer.id, template: template.key });
      return NextResponse.json({ ok: true });
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
      if (m.direction !== 'OUT' || m.status !== 'PENDING_APPROVAL') return bad('not a pending draft');
      await store.setMessageStatus(m.id, 'DISCARDED');
      await store.audit('owner', 'draft_discarded', { id: b.id });
      return NextResponse.json({ ok: true });
    }

    case 'send_task_reply': {
      // Approve/edit the assistant's suggestion from a Human Task and send it,
      // without opening the chat. Sent as the owner (HUMAN), so guard content
      // rules don't apply, but hard gates do.
      if (!b.id || typeof b.body !== 'string' || !b.body.trim()) return bad('id and body required');
      const task = (await store.listTasks()).find((t) => t.id === b.id);
      if (!task || task.status !== 'OPEN' || !task.customerId) return bad('task not open', 404);
      const customer = await store.getCustomerById(task.customerId);
      if (!customer) return bad('customer gone', 404);
      const send = await humanSend(customer, b.body.trim());
      if (send.error) return bad(send.error);
      // Only resolve the task if the message actually went out. Before this the
      // send result was ignored, so a failed send still closed the task and the
      // customer was left unanswered with no trace on the board.
      const out = await deliverOut(customer, send.body!, 'HUMAN');
      if (!out.ok) return bad(`WhatsApp did not accept the message: ${out.error ?? 'unknown error'}`, 502);
      // Not only THIS task: everything open for this customer, and the unread
      // badge with it. Two tasks for one person answered by one message is one
      // conversation settled, not one and a half.
      await afterHumanReply(store, customer.id);
      await store.audit('owner', 'task_reply_sent', { taskId: task.id });
      return NextResponse.json({ ok: true });
    }

    case 'manual_reply': {
      // Quick manual message to any customer, no chat screen needed.
      // Per spec §9.1 a human send pauses the assistant for that chat.
      if (!b.customerId || typeof b.body !== 'string' || !b.body.trim()) return bad('customerId and body required');
      const customer = await store.getCustomerById(b.customerId);
      if (!customer) return bad('customer not found', 404);
      const send = await humanSend(customer, b.body.trim());
      if (send.error) return bad(send.error);
      // The send can fail at Meta (outside the 24h window, a bad token, a
      // rejected number). Before this check the result was ignored and the UI
      // reported success regardless, so a message that never reached the
      // customer looked sent. Now the real outcome is returned.
      const out = await deliverOut(customer, send.body!, 'HUMAN');
      if (!out.ok) return bad(`WhatsApp did not accept the message: ${out.error ?? 'unknown error'}`, 502);
      await store.updateCustomer(customer.id, { aiPaused: true });
      // Answering from the chat is the same signal as answering via the Tasks
      // screen: the customer has a reply now. Without this, a task only ever
      // closed if you used "Send Reply" on the Tasks card itself — replying
      // in the chat left it sitting open ("Needs a decision") even though it
      // was already handled, so it had to be dismissed by hand.
      await afterHumanReply(store, customer.id);
      await store.audit('owner', 'manual_reply', { customerId: customer.id });
      return NextResponse.json({ ok: true, aiPaused: true });
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
      const send = await humanSend(customer, template.body);
      if (send.error) return bad(send.error);
      const out = await deliverOut(customer, send.body!, 'HUMAN');
      if (!out.ok) return bad(`WhatsApp did not accept the message: ${out.error ?? 'unknown error'}`, 502);
      // The case Jo hit: sending the very template Will proposed, from the
      // chat, used to leave its task open in the Tasks tab.
      await afterHumanReply(store, customer.id);
      await store.audit('owner', 'template_sent_manually', { customerId: customer.id, template: template.key });
      return NextResponse.json({ ok: true });
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

    case 'resolve_task':
      if (!b.id) return bad('id required');
      await store.resolveTask(b.id);
      await store.audit('owner', 'task_resolved', { id: b.id });
      return NextResponse.json({ ok: true });

    case 'mark_read':
      if (!b.id) return bad('id required');
      await store.markCustomerRead(b.id);
      return NextResponse.json({ ok: true });

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
      if (!canSendEstimate(customer.state)) {
        return bad('the estimate can only be sent once the questionnaire is back');
      }

      const amountCents = Math.round(b.amountCents);
      // Filled here rather than in humanSend: the amount comes from this
      // request, and the customer's stored estimate is only written further
      // down, once the send has actually succeeded.
      const body = composeEstimate(
        await libraryBody('estimate_invoice', APPROVED.estimate_invoice),
        amountCents,
        invoiceUrl.toString(),
      );

      const send = await humanSend(customer, body);
      if (send.error) return bad(send.error);
      const out = await deliverOut(customer, send.body!, 'HUMAN');
      if (!out.ok) return bad(`WhatsApp did not accept the message: ${out.error ?? 'unknown error'}`, 502);

      await store.updateCustomer(customer.id, { estimatedRefundCents: amountCents, aiPaused: true });
      const nextState = stateAfterEstimate(customer.state);
      if (nextState) {
        await store.setState(customer.id, nextState, 'HUMAN');
        const fresh = await store.getCustomerById(customer.id);
        if (fresh) await reconcileSchedule(fresh);
      }
      await afterHumanReply(store, customer.id);
      await store.audit('owner', 'estimate_sent', { customerId: customer.id, amountCents, invoiceLink: invoiceUrl.toString() });
      return NextResponse.json({ ok: true });
    }

    case 'send_signature': {
      // "Send for Signature" button (Estimate stage): once the final review
      // is done and the actual return has been sent to the customer (by
      // email, per the approved wording) for them to sign, one click sends
      // the confirmation message and moves them straight to Signature.
      if (!b.customerId) return bad('customerId required');
      const customer = await store.getCustomerById(b.customerId);
      if (!customer) return bad('customer not found', 404);
      if (!['ESTIMATE_READY', 'FINAL_REVIEW'].includes(customer.state)) {
        return bad('signature can only be sent once the estimate stage is reached');
      }
      const send = await humanSend(customer, APPROVED.signature_ready);
      if (send.error) return bad(send.error);
      const out = await deliverOut(customer, send.body!, 'HUMAN');
      if (!out.ok) return bad(`WhatsApp did not accept the message: ${out.error ?? 'unknown error'}`, 502);
      await store.updateCustomer(customer.id, { aiPaused: true });
      await store.setState(customer.id, 'SIGNATURE_PENDING', 'HUMAN');
      const fresh = await store.getCustomerById(customer.id);
      if (fresh) await reconcileSchedule(fresh);
      await afterHumanReply(store, customer.id);
      await store.audit('owner', 'signature_sent', { customerId: customer.id });
      return NextResponse.json({ ok: true });
    }

    case 'send_lodged': {
      // "Mark Lodged" button (Signature stage): one click sends the lodged +
      // review-request confirmation, exactly as the owner worded it, and
      // moves the customer on to Completed. SIGNED is also accepted (already
      // marked signed some other way) so this stays idempotent either way.
      if (!b.customerId) return bad('customerId required');
      const customer = await store.getCustomerById(b.customerId);
      if (!customer) return bad('customer not found', 404);
      if (!['SIGNATURE_PENDING', 'SIGNED'].includes(customer.state)) {
        return bad('this can only be sent once the customer has signed');
      }
      const body = await libraryBody('lodged_confirmation', APPROVED.lodged_confirmation);
      const send = await humanSend(customer, body);
      if (send.error) return bad(send.error);
      const out = await deliverOut(customer, send.body!, 'HUMAN');
      if (!out.ok) return bad(`WhatsApp did not accept the message: ${out.error ?? 'unknown error'}`, 502);
      await store.updateCustomer(customer.id, { aiPaused: true });
      await store.setState(customer.id, 'LODGED', 'HUMAN');
      const fresh = await store.getCustomerById(customer.id);
      if (fresh) await reconcileSchedule(fresh);
      await afterHumanReply(store, customer.id);
      await store.audit('owner', 'lodged_sent', { customerId: customer.id });
      return NextResponse.json({ ok: true });
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
      if (cv.length) return NextResponse.json({ ok: false, blocked: cv }, { status: 422 });
      const row = await store.addTemplate({ category: b.category ?? 'Custom', title: b.title ?? 'Untitled message', body: b.body });
      await store.audit('owner', 'template_added', { id: row.id });
      return NextResponse.json({ ok: true, id: row.id });
    }
    case 'delete_template':
      if (!b.id) return bad('id required');
      await store.deleteTemplate(b.id);
      await store.audit('owner', 'template_deleted', { id: b.id });
      return NextResponse.json({ ok: true });


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
        return NextResponse.json({ ok: false, blocked: contentViolations }, { status: 422 });
      }
      await store.updateTemplate(b.id, b.body);
      await store.audit('owner', 'template_updated', { id: b.id });
      return NextResponse.json({ ok: true });
    }
  }
  return bad('bad action');
}
