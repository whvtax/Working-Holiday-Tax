// Owner actions from the dashboard. Hardened after audit:
// preconditions on message status, approval-time re-guard,
// template save-time guard, real kill switch, quick manual replies.
import { NextResponse } from 'next/server';
import { sessionValid } from '@/lib/will/auth';
import { getStore, CustomerRow } from '@/lib/will/store';
import { policyGuard } from '@/lib/will/policy-guard';
import { canTransition, ALL_STATES, isSalesState, POST_PAYMENT_STATES, CustomerState } from '@/lib/will/state-machine';
import { autoAdvanceToForm, getBank } from '@/lib/will/service';
import { reconcileSchedule } from '@/lib/will/scheduler';
import { fillPlaceholders } from '@/lib/will/engine';
import { formatAUD } from '@/lib/will/config';
import { readJson } from '@/lib/will/http';
import { deliverOut, sendWhatsAppText, sendWhatsAppTemplate } from '@/lib/will/channel';
import { resolveAiMode } from '@/lib/will/mode';

export const dynamic = 'force-dynamic';

interface ActionBody {
  action: 'approve_message' | 'discard_message' | 'resolve_task' | 'mark_read' | 'toggle_ai'
  | 'update_template' | 'reset_simulator' | 'set_kill_switch' | 'set_ai_mode' | 'manual_reply' | 'send_task_reply' | 'send_template' | 'set_state' | 'add_template' | 'delete_template' | 'approve_suggestion' | 'dismiss_suggestion' | 'set_variant_b' | 'set_goal' | 'set_estimate';
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
  /** set_state only: owner manual override — move to any stage, bypassing the
   *  one-step-at-a-time guardrails. */
  force?: boolean;
}

const bad = (msg: string, code = 400) => NextResponse.json({ error: msg }, { status: code });

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

export async function POST(req: Request) {
  if (!sessionValid()) return NextResponse.json({ ok:false, error:'unauthorized' }, { status:401 });
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
      const verdict = policyGuard(msg.body, {
        state: customer.state, paid: customer.paid, aiPaused: false, killSwitch,
        optedOut: customer.optedOut, isLegacy: customer.isLegacy,
        lastCustomerMsgAt: customer.lastCustomerMsgAt ? new Date(customer.lastCustomerMsgAt) : null,
        isApprovedTemplate: false, estimateFromTeam: customer.estimatedRefundCents,
      });
      if (!verdict.allowed) {
        await store.setMessageStatus(msg.id, 'BLOCKED');
        await store.addTask({
          customerId: customer.id, customerName: customer.name ?? customer.waId,
          reason: `Draft became invalid before approval: ${verdict.violations.join(', ')}`,
          severity: 'REVIEW', context: msg.body.slice(0, 200), suggestedReply: null,
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
      await store.resolveTask(task.id);
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
      await store.audit('owner', 'template_sent_manually', { customerId: customer.id, template: template.key });
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

    case 'add_template': {
      if (typeof b.body !== 'string' || !b.body.trim()) return bad('body required');
      if (b.body.length > 5000) return bad('too long');
      const verdict = policyGuard(b.body, {
        state: 'PRICE_SENT', paid: false, aiPaused: false, killSwitch: false,
        optedOut: false, isLegacy: false, lastCustomerMsgAt: new Date(),
        isApprovedTemplate: false, estimateFromTeam: null,
      });
      const cv = verdict.violations.filter((v) => !v.startsWith('OUTSIDE_24H'));
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

    case 'approve_suggestion': {
      if (!b.id) return bad('id required');
      const sug = (await store.listSuggestions()).find((s) => s.id === b.id);
      if (!sug) return bad('suggestion not found', 404);
      const body = (typeof b.body === 'string' && b.body.trim()) ? b.body : sug.proposedBody;
      const verdict = policyGuard(body, {
        state: 'PRICE_SENT', paid: false, aiPaused: false, killSwitch: false,
        optedOut: false, isLegacy: false, lastCustomerMsgAt: new Date(),
        isApprovedTemplate: false, estimateFromTeam: null,
      });
      const cv = verdict.violations.filter((v) => !v.startsWith('OUTSIDE_24H'));
      if (cv.length) return NextResponse.json({ ok: false, blocked: cv }, { status: 422 });
      await store.addTemplate({ category: 'FAQ · Operational', title: sug.title.slice(0, 60), body });
      await store.setSuggestionStatus(sug.id, 'APPROVED');
      await store.audit('owner', 'suggestion_approved', { id: sug.id });
      return NextResponse.json({ ok: true });
    }
    case 'dismiss_suggestion':
      if (!b.id) return bad('id required');
      await store.setSuggestionStatus(b.id, 'DISMISSED');
      return NextResponse.json({ ok: true });
    case 'set_variant_b': {
      if (!b.id) return bad('id required');
      const variant = typeof b.body === 'string' && b.body.trim() ? b.body : null;
      // H2: guard the B variant at save time, exactly like update_template,
      // so the scheduler can't later send unguarded content as an "approved template".
      if (variant) {
        if (variant.length > 5000) return bad('too long');
        const verdict = policyGuard(variant, {
          state: 'PRICE_SENT', paid: false, aiPaused: false, killSwitch: false,
          optedOut: false, isLegacy: false, lastCustomerMsgAt: new Date(),
          isApprovedTemplate: false, estimateFromTeam: null,
        });
        const cv = verdict.violations.filter((v) => !v.startsWith('OUTSIDE_24H'));
        if (cv.length) return NextResponse.json({ ok: false, blocked: cv }, { status: 422 });
      }
      await store.setVariantB(b.id, variant);
      await store.audit('owner', 'variant_b_set', { id: b.id });
      return NextResponse.json({ ok: true });
    }

    case 'set_goal': {
      // L1: validate the goal is a sane percentage.
      const g = typeof b.goal === 'number' && Number.isFinite(b.goal) ? Math.min(100, Math.max(0, Math.round(b.goal))) : null;
      await store.setSetting('conversion_goal', g);
      await store.audit('owner', 'goal_set', { goal: g });
      return NextResponse.json({ ok: true, goal: g });
    }

    case 'reset_simulator':
      await store.deleteCustomerByWaId('simulator');
      await store.audit('owner', 'simulator_reset');
      return NextResponse.json({ ok: true });

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
      const contentViolations = verdict.violations.filter((v) => !v.startsWith('OUTSIDE_24H'));
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
