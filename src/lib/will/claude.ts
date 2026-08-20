// ============================================================
// Claude API client: one structured "decide" call per incoming
// customer message. Hardened: timeout, full error containment
// ("never an error to the customer"), strict output validation.
// Falls back to a deterministic mock when no ANTHROPIC_API_KEY.
// ============================================================
import { buildSystemPrompt, CustomerContext } from './playbook';
import { APPROVED } from './approved-messages';
import { CustomerState } from './state-machine';

export interface Turn { role: 'customer' | 'assistant'; text: string }

export interface Decision {
  action: 'reply' | 'human_task' | 'wait';
  reply_text?: string;
  suggested_reply?: string; // draft for the human when action=human_task
  new_state?: CustomerState;
  task_reason?: string;
  task_severity?: 'URGENT' | 'REVIEW' | 'CONFLICT';
  confidence: number;
  mock?: boolean;
}

const STATES: CustomerState[] = ['NEW_LEAD', 'QUALIFIED', 'PRICE_SENT', 'PAYMENT_PENDING', 'PAID', 'FORM_PENDING', 'FORM_COMPLETE', 'DOCUMENTS_COMPLETE', 'UNDER_REVIEW', 'ESTIMATE_READY', 'FINAL_REVIEW', 'SIGNATURE_PENDING', 'SIGNED', 'LODGED', 'COMPLETED', 'NOT_INTERESTED', 'WENT_COLD', 'NOT_RELEVANT'];

const DECIDE_TOOL = {
  name: 'decide',
  description: 'Your single decision for this customer message.',
  input_schema: {
    type: 'object',
    properties: {
      action: { type: 'string', enum: ['reply', 'human_task', 'wait'] },
      reply_text: { type: 'string', description: 'The WhatsApp message to send, if action=reply.' },
      suggested_reply: { type: 'string', description: 'If action=human_task: your best draft answer for the team member to edit/approve.' },
      new_state: { type: 'string', enum: STATES, description: 'Set only when the customer state should change.' },
      task_reason: { type: 'string' },
      task_severity: { type: 'string', enum: ['URGENT', 'REVIEW', 'CONFLICT'] },
      confidence: { type: 'number', description: '0..1. Below 0.8 you must choose human_task.' },
    },
    required: ['action', 'confidence'],
  },
} as const;

const fallbackTask = (reason: string): Decision => ({
  action: 'human_task', task_reason: reason, task_severity: 'URGENT', confidence: 0,
});

function validateDecision(raw: unknown): Decision {
  const d = raw as Partial<Decision>;
  if (!d || typeof d !== 'object') return fallbackTask('Model returned non-object decision');
  if (d.action !== 'reply' && d.action !== 'human_task' && d.action !== 'wait') {
    return fallbackTask('Model returned invalid action');
  }
  const conf = typeof d.confidence === 'number' && d.confidence >= 0 && d.confidence <= 1 ? d.confidence : -1;
  if (conf < 0) return fallbackTask('Model returned invalid confidence');
  const newState = d.new_state && STATES.includes(d.new_state) ? d.new_state : undefined;
  if (d.action === 'reply' && (typeof d.reply_text !== 'string' || !d.reply_text.trim())) {
    return fallbackTask('Model chose reply without text');
  }
  if (conf < 0.8 && d.action !== 'human_task') {
    return {
      action: 'human_task',
      task_reason: 'Low confidence, suppressed automatic action',
      task_severity: 'REVIEW',
      suggested_reply: typeof d.reply_text === 'string' ? d.reply_text : undefined,
      confidence: conf,
    };
  }
  return {
    action: d.action,
    reply_text: typeof d.reply_text === 'string' ? d.reply_text : undefined,
    suggested_reply: typeof d.suggested_reply === 'string' ? d.suggested_reply : undefined,
    new_state: newState,
    task_reason: typeof d.task_reason === 'string' ? d.task_reason : undefined,
    task_severity: d.task_severity === 'URGENT' || d.task_severity === 'CONFLICT' ? d.task_severity : 'REVIEW',
    confidence: conf,
  };
}

/** History must start with a user turn, contain no empty bodies, and stay bounded. */
function apiMessages(history: Turn[]) {
  const trimmed = history.filter((t) => t.text.trim().length > 0).slice(-40);
  while (trimmed.length && trimmed[0].role !== 'customer') trimmed.shift();
  return trimmed.map((t) => ({
    role: t.role === 'customer' ? ('user' as const) : ('assistant' as const),
    content: t.text.slice(0, 4000),
  }));
}

export async function decide(ctx: CustomerContext, history: Turn[]): Promise<Decision> {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return mockDecide(ctx, history);

  const body = JSON.stringify({
    model: process.env.CLAUDE_MODEL ?? 'claude-sonnet-4-5',
    max_tokens: 1024,
    system: buildSystemPrompt(ctx),
    tools: [DECIDE_TOOL],
    tool_choice: { type: 'tool', name: 'decide' },
    messages: apiMessages(history),
  });

  // M10: one retry with backoff on transient (429 / 5xx / network); a persistent
  // failure falls back to a human task, never an error to the customer.
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        signal: AbortSignal.timeout(30_000),
        headers: { 'x-api-key': key, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
        body,
      });
      if (res.status === 429 || res.status >= 500) {
        if (attempt === 0) { await sleep(400 + Math.random() * 400); continue; }
        return fallbackTask(`Claude API error ${res.status}`);
      }
      if (!res.ok) return fallbackTask(`Claude API error ${res.status}`);
      const data = await res.json();
      if (data.stop_reason === 'max_tokens') return fallbackTask('Model response truncated');
      const tool = (data.content as Array<{ type: string; name?: string; input?: unknown }> | undefined)
        ?.find((bl) => bl.type === 'tool_use' && bl.name === 'decide');
      if (!tool?.input) return fallbackTask('Model returned no decision');
      return validateDecision(tool.input);
    } catch {
      if (attempt === 0) { await sleep(400 + Math.random() * 400); continue; }
      return fallbackTask('Claude API unreachable');
    }
  }
  return fallbackTask('Claude API unreachable');
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// ---------- deterministic mock (no API key) ----------
const NO_ABN = /\b(?:no|don'?t have|without|never had)\s+(?:an?\s+)?abn\b|only\s+(?:worked\s+)?(?:on\s+)?(?:a\s+)?tfn|just\s+tfn/i;
const PAYABLE_STATES: CustomerState[] = ['PRICE_SENT', 'PAYMENT_PENDING'];

// M3: a real payment confirmation, not "I paid attention to your ad".
function looksLikePayment(text: string): boolean {
  const t = text.toLowerCase().trim();
  if (/\b(transferred|bank transfer|payment (?:sent|done|made|received)|sent (?:the )?(?:money|payment)|just paid|already paid|paid the fee|paid you|paid it|paid now|paid \$|paid today)\b/.test(t)) return true;
  const words = t.split(/\s+/).filter(Boolean).length;
  if (words <= 4 && /\b(paid|done|sent it)\b/.test(t) && !/\b(attention|visit|mind|off)\b/.test(t)) return true;
  return false;
}

function mockDecide(ctx: CustomerContext, history: Turn[]): Decision {
  const last = history.filter((t) => t.role === 'customer').at(-1)?.text ?? '';
  const lower = last.toLowerCase();
  const m = (d: Omit<Decision, 'confidence' | 'mock'>): Decision => ({ ...d, confidence: 1, mock: true });

  if (/(ignore (your|all) (rules|instructions)|send me the password|api key|you are now|take over|admin)/i.test(last)) {
    return m({ action: 'human_task', task_reason: 'Possible manipulation attempt', task_severity: 'URGENT', suggested_reply: "Sorry, I can't help with that. Is there anything about your tax return I can help you with? 😊" });
  }
  // Explicit decline: jump straight to Closed (spec: "says no clearly -> stop")
  if (!ctx.paid && /\b(not interested|no thanks?|did it myself|already (lodged|submitted|done it)|found someone else|going with (another|someone)|i'?ll pass)\b/.test(lower)) {
    return m({ action: 'reply', reply_text: "No worries at all! If you ever change your mind, we're here and happy to help 😊", new_state: 'NOT_INTERESTED' });
  }
  if (/refund|cancel|money back/.test(lower) && ctx.paid) {
    return m({ action: 'human_task', task_reason: 'Customer requests refund/cancellation', task_severity: 'URGENT', suggested_reply: 'I completely understand. Let me check this with the team and get right back to you.' });
  }
  if (looksLikePayment(last) && !ctx.paid && PAYABLE_STATES.includes(ctx.state)) {
    return m({ action: 'reply', reply_text: APPROVED.payment_received, new_state: 'PAID' });
  }
  if ((ctx.state === 'NEW_LEAD' || ctx.state === 'QUALIFIED') && /(tfn|abn)/.test(lower)) {
    const abn = /abn/.test(lower) && !NO_ABN.test(lower);
    return m({ action: 'reply', reply_text: abn ? APPROVED.price_tfn_abn : APPROVED.price_tfn, new_state: 'PRICE_SENT' });
  }
  if (ctx.state === 'NEW_LEAD') {
    return m({ action: 'reply', reply_text: APPROVED.opening, new_state: 'QUALIFIED' });
  }
  if (/expensive|cheaper|too much/.test(lower)) {
    return m({ action: 'reply', reply_text: APPROVED.objections.o5_too_expensive });
  }
  if (/refund.*before|how much.*refund|estimate/.test(lower)) {
    return m({ action: 'reply', reply_text: APPROVED.objections.o1_refund_before_pay });
  }
  if (/mygov/.test(lower)) {
    return m({ action: 'reply', reply_text: APPROVED.objections.o4_mygov });
  }
  if (/legit|scam|registered/.test(lower)) {
    return m({ action: 'reply', reply_text: APPROVED.legitimacy });
  }
  if (/resident|medicare|claim|deduct/.test(lower) && !ctx.paid) {
    return m({ action: 'reply', reply_text: APPROVED.objections.o7_professional_question });
  }
  return m({
    action: 'human_task',
    task_reason: 'No confident match for this message',
    task_severity: 'REVIEW',
    suggested_reply: "Thanks for your message! Let me double check this for you and get back to you shortly 😊",
  });
}
