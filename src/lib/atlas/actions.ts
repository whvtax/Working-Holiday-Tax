// Atlas proposals (decision 016 follow-up). Atlas never runs a change itself:
// it proposes one, the user approves it in the chat, and only then does the
// server hand it to the same action handler the CRM uses (its guards and audit
// apply). This file validates a proposal and maps it to that handler's body.
import { ALL_STATES } from '@/lib/will/state-machine';

export const PROPOSAL_KINDS = ['resolve_task', 'send_reply', 'set_state'] as const;
export type ProposalKind = (typeof PROPOSAL_KINDS)[number];

export interface AtlasProposal {
  kind: ProposalKind;
  summary: string;
  taskId?: string;
  customerId?: string;
  body?: string;
  state?: string;
}

const MAX_BODY = 1000;
const MAX_SUMMARY = 300;
const str = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

/** Returns a clean proposal, or null if the model sent something we do not allow. */
export function cleanProposal(input: unknown): AtlasProposal | null {
  if (!input || typeof input !== 'object') return null;
  const r = input as Record<string, unknown>;
  const kind = r.kind;
  if (kind !== 'resolve_task' && kind !== 'send_reply' && kind !== 'set_state') return null;
  const summary = str(r.summary, MAX_SUMMARY);
  if (!summary) return null;
  if (kind === 'resolve_task') {
    const taskId = str(r.taskId, 80);
    return taskId ? { kind, summary, taskId } : null;
  }
  if (kind === 'send_reply') {
    const customerId = str(r.customerId, 80);
    const body = str(r.body, MAX_BODY);
    return customerId && body ? { kind, summary, customerId, body } : null;
  }
  const customerId = str(r.customerId, 80);
  const state = str(r.state, 40);
  if (!customerId || !(ALL_STATES as readonly string[]).includes(state)) return null;
  return { kind, summary, customerId, state };
}

/** The body the existing /api/will/actions handler expects for this proposal. */
export function toWillAction(p: AtlasProposal): Record<string, unknown> {
  if (p.kind === 'resolve_task') return { action: 'resolve_task', id: p.taskId };
  if (p.kind === 'send_reply') return { action: 'manual_reply', customerId: p.customerId, body: p.body };
  return { action: 'set_state', customerId: p.customerId, state: p.state };
}
