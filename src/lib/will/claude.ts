// ============================================================
// Claude API client: one structured "decide" call per incoming
// customer message. Hardened: timeout, full error containment
// ("never an error to the customer"), strict output validation.
// Falls back to a deterministic mock when no ANTHROPIC_API_KEY.
// ============================================================
import { buildSystemPrompt, CustomerContext, LiveTemplates } from './playbook';
import { APPROVED } from './approved-messages';
import { CustomerState } from './state-machine';
import { getStore } from './store';
import { LostAnalysis, LOST_CATEGORIES, validateLostAnalysis } from './lost-leads';
import { claimsPayment } from './payment-claim';
import { stripDashes } from './text';

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
      task_reason: {
        type: 'string',
        description:
          'A SHORT headline, 5 to 8 words, naming what the customer wants. This is read in a '
          + 'notification list and a queue, so it must scan in one glance: "Asking if DASP is '
          + 'included", "Wants refund after paying", "Confused about myGov login". Never a '
          + 'paragraph, never your reasoning, never a summary of the conversation. Put any detail '
          + 'in suggested_reply instead.',
      },
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
      suggested_reply: typeof d.reply_text === 'string' ? stripDashes(d.reply_text) : undefined,
      confidence: conf,
    };
  }
  return {
    action: d.action,
    // Jo's rule, enforced not just requested: no em dash ever reaches a
    // customer, whatever the model wrote. stripDashes leaves ordinary hyphens
    // ("tax-return") untouched.
    reply_text: typeof d.reply_text === 'string' ? stripDashes(d.reply_text) : undefined,
    suggested_reply: typeof d.suggested_reply === 'string' ? stripDashes(d.suggested_reply) : undefined,
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

  // Pull the owner's current Library edits so a change made there reaches the
  // live model, not just the manual "Send Template" button. Best-effort: a
  // failed/slow DB read must never block a customer reply, so on any error
  // this falls back to the hardcoded APPROVED copy exactly as before.
  let liveTemplates: LiveTemplates | undefined;
  try {
    const templates = await getStore().listTemplates();
    liveTemplates = Object.fromEntries(templates.map((t) => [t.key, t.body]));
  } catch { /* fall back to APPROVED below */ }

  // Prompt caching (Anthropic billing email, 31 Aug): the big playbook is
  // identical across every customer message, so it goes in a cached block and
  // the per-customer profile + retrieved knowledge follow in an uncached block.
  // A cache_control breakpoint caches everything up to and including that block;
  // repeated calls then re-read the playbook from cache instead of paying full
  // input price for it each time.
  const { stable, dynamic } = buildSystemPrompt(ctx, liveTemplates);
  const body = JSON.stringify({
    model: process.env.CLAUDE_MODEL ?? 'claude-sonnet-4-5',
    max_tokens: 1024,
    system: [
      { type: 'text', text: stable, cache_control: { type: 'ephemeral' } },
      { type: 'text', text: dynamic },
    ],
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

// ============================================================
// Payment-proof verification: a customer sends a photo or document while a
// price is outstanding. Before that is ever trusted as "paid", the actual
// image is looked at — this is what stops a random photo (a question, an
// unrelated document, a screenshot of something else) from silently moving
// someone to Paid. Kind/stage alone are never enough on their own.
// ============================================================
export interface PaymentProofCheck { isProof: boolean; reason?: string }

const PROOF_TOOL = {
  name: 'assess',
  description: 'Your assessment of whether this attachment is genuine proof of payment.',
  input_schema: {
    type: 'object',
    properties: {
      is_payment_proof: {
        type: 'boolean',
        description: 'true ONLY if this clearly shows a completed bank transfer / PayID / card payment confirmation with an amount and either a reference, a bank name, or a "successful/completed" status. false for anything else, including a photo of a problem, a document, an ID, a receipt for something unrelated, or an image too unclear to tell.',
      },
      reason: { type: 'string', description: 'One short factual sentence on what the attachment actually shows.' },
    },
    required: ['is_payment_proof'],
  },
} as const;

const PROOF_SYSTEM = `You are checking a single attachment a customer sent on WhatsApp to a tax-return business, to decide whether it is genuine proof that THEY have just SENT US a payment for our fee.

TRUE only for a confirmation that a specific amount was PAID OUT / TRANSFERRED — a bank transfer "payment sent/successful" screen, a PayID confirmation, or a card payment success screen — showing the money has left their account (ideally to us).

Say FALSE for everything else, and in particular for these look-alikes, which are NOT a payment and must never be treated as one:
- a bank statement or account statement (a list of past transactions, or an account balance);
- a payslip, income statement, PAYG summary, or any record of money they RECEIVED;
- a screenshot showing only a balance, an account number, or bank details (someone sharing where their refund should go);
- an invoice, a form, an ID, a receipt for something unrelated, a photo of a document, or anything unclear.

A statement that lists transactions or shows a balance is the single most common false positive: it looks financial but proves no payment to us was made. When in doubt, say false — a real payment is confirmed by a person instead. Answer only by calling the assess tool.`;

/** Returns { isProof: false } on any failure (no key, network error, bad
 *  response, unreadable format) — never assume proof when uncertain; the
 *  caller falls back to a human looking at it. */
export async function assessPaymentProofImage(bytes: ArrayBuffer, mime: string): Promise<PaymentProofCheck> {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return { isProof: false, reason: 'no API key configured' };

  const base64 = Buffer.from(bytes).toString('base64');
  const normalizedMime = (mime || '').split(';')[0].trim().toLowerCase();
  const isImage = normalizedMime.startsWith('image/');
  const isPdf = normalizedMime === 'application/pdf';
  if (!isImage && !isPdf) return { isProof: false, reason: `unsupported file type for verification (${normalizedMime || 'unknown'})` };

  const content = isImage
    ? [{ type: 'image', source: { type: 'base64', media_type: normalizedMime, data: base64 } }]
    : [{ type: 'document', source: { type: 'base64', media_type: 'application/pdf', data: base64 } }];

  const body = JSON.stringify({
    model: process.env.CLAUDE_MODEL ?? 'claude-sonnet-4-5',
    max_tokens: 300,
    system: PROOF_SYSTEM,
    tools: [PROOF_TOOL],
    tool_choice: { type: 'tool', name: 'assess' },
    messages: [{ role: 'user', content: [...content, { type: 'text', text: 'Is this proof of payment?' }] }],
  });

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      signal: AbortSignal.timeout(20_000),
      headers: { 'x-api-key': key, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
      body,
    });
    if (!res.ok) return { isProof: false, reason: `vision check failed (${res.status})` };
    const data = await res.json();
    const tool = (data.content as Array<{ type: string; name?: string; input?: unknown }> | undefined)
      ?.find((bl) => bl.type === 'tool_use' && bl.name === 'assess');
    const input = tool?.input as { is_payment_proof?: unknown; reason?: unknown } | undefined;
    if (!input || typeof input.is_payment_proof !== 'boolean') return { isProof: false, reason: 'model returned no assessment' };
    return { isProof: input.is_payment_proof, reason: typeof input.reason === 'string' ? input.reason : undefined };
  } catch (e) {
    return { isProof: false, reason: e instanceof Error ? e.message : 'vision check unreachable' };
  }
}

// ============================================================
// General attachment reading: a customer sends a photo or document that is NOT
// a payment (a payslip, a bank document with their account details, a receipt,
// an ID, a screenshot of a question). Will cannot see images, so without this
// every one of them became an "attachment I can't read" handoff and a generic
// "thanks, I'll take a look" reply. This turns the image into a short, factual
// description of WHAT it shows, which is fed into Will's normal reply so it can
// answer in context (Jo, 31 Aug). Description only, never instructions: the
// text it returns is treated as data downstream.
// ============================================================
const DESCRIBE_SYSTEM = `You are describing, for a tax-return business's WhatsApp assistant, a single attachment a customer sent, so the assistant can reply in context. The assistant cannot see it; your description is all it gets.

Write ONE short, factual sentence (two at most) saying what the attachment is and the key detail that matters for a tax return, for example: "A payslip from <employer> showing gross pay and tax withheld", "A bank document showing the customer's name, BSB and account number", "A photo of a receipt for work boots", "A screenshot of the customer's question about Medicare", "An ID document (passport photo page)".

Rules: describe only what is actually visible. Do NOT include full bank account numbers, TFNs, passport numbers or other full sensitive identifiers — say the document TYPE and that it contains those details, not the digits. Do not give tax advice, do not decide anything, do not add instructions. If the image is unclear or you cannot tell what it is, say exactly "unclear". Answer only by calling the describe tool.`;

const DESCRIBE_TOOL = {
  name: 'describe',
  description: 'A short factual description of the attachment for the assistant.',
  input_schema: {
    type: 'object',
    properties: {
      description: { type: 'string', description: 'One or two short factual sentences, or "unclear".' },
    },
    required: ['description'],
  },
} as const;

/** A short factual description of a customer's image/PDF, or null on any failure
 *  (no key, unsupported type, network error, unreadable, or the model says it is
 *  unclear). Null always falls back to the existing "a person should look" path. */
export async function describeAttachment(bytes: ArrayBuffer, mime: string): Promise<string | null> {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return null;

  const base64 = Buffer.from(bytes).toString('base64');
  const normalizedMime = (mime || '').split(';')[0].trim().toLowerCase();
  const isImage = normalizedMime.startsWith('image/');
  const isPdf = normalizedMime === 'application/pdf';
  if (!isImage && !isPdf) return null;

  const content = isImage
    ? [{ type: 'image', source: { type: 'base64', media_type: normalizedMime, data: base64 } }]
    : [{ type: 'document', source: { type: 'base64', media_type: 'application/pdf', data: base64 } }];

  const body = JSON.stringify({
    model: process.env.CLAUDE_MODEL ?? 'claude-sonnet-4-5',
    max_tokens: 300,
    system: DESCRIBE_SYSTEM,
    tools: [DESCRIBE_TOOL],
    tool_choice: { type: 'tool', name: 'describe' },
    messages: [{ role: 'user', content: [...content, { type: 'text', text: 'Describe this attachment.' }] }],
  });

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      signal: AbortSignal.timeout(20_000),
      headers: { 'x-api-key': key, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
      body,
    });
    if (!res.ok) return null;
    const data = await res.json();
    const tool = (data.content as Array<{ type: string; name?: string; input?: unknown }> | undefined)
      ?.find((bl) => bl.type === 'tool_use' && bl.name === 'describe');
    const input = tool?.input as { description?: unknown } | undefined;
    const desc = typeof input?.description === 'string' ? input.description.trim() : '';
    if (!desc || /^unclear\.?$/i.test(desc)) return null;
    return desc.slice(0, 400);
  } catch {
    return null;
  }
}


// ============================================================
// Mining: read REAL conversations, extract what customers ask, and draft
// polished professional answers in the approved voice. Never copies the
// agent's raw wording — it produces an improved, kind, correct version.
// ============================================================
export interface MinedEntry {
  intent: string; question: string; examples: string[];
  answer: string; keywords: string[]; tags: string[]; lang: string;
}

const MINE_TOOL = {
  name: 'knowledge_entries',
  description: 'The distilled question→answer knowledge learned from these conversations.',
  input_schema: {
    type: 'object',
    properties: {
      entries: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            intent: { type: 'string', description: 'short label, e.g. "refund timing"' },
            question: { type: 'string', description: "the customer's question in clear canonical form" },
            examples: { type: 'array', items: { type: 'string' }, description: 'real phrasings customers used' },
            answer: { type: 'string', description: 'the polished, professional, warm answer to send' },
            keywords: { type: 'array', items: { type: 'string' } },
            tags: { type: 'array', items: { type: 'string' } },
            lang: { type: 'string', description: "language code, usually 'en'" },
          },
          required: ['intent', 'question', 'answer'],
        },
      },
    },
    required: ['entries'],
  },
} as const;

const MINE_SYSTEM = `You are building a knowledge base for "Working Holiday Tax", an Australian tax service for Working Holiday Makers (backpackers), from real WhatsApp conversations.

These conversations are the business owner's OLD way of working. They are useful for ONE thing only: to see the distinct QUESTIONS and topics that CUSTOMERS raise. They are NOT a model for how to answer. Learn WHAT customers ask, never HOW the old agent replied.

Your job: extract each distinct customer question/topic, and for each recurring or important one, write ONE excellent answer to send in future.

CRITICAL RULES FOR THE ANSWERS:
- Do NOT copy or imitate the human agent's wording, tone, or approach. The old replies are often rushed, impatient or informal — that is exactly what we are replacing. Produce the OPPOSITE: warm, patient, professional, polite, genuinely helpful, concise.
- The company's approved messages, boundaries and prices always take precedence over anything in these old conversations. If an old reply conflicts with the boundaries below, ignore the old reply entirely.
- Stay within the business boundaries: fixed prices are $220 (TFN only) and $385 (TFN + ABN). Guarantee (all customers, TFN and TFN + ABN): if the customer GETS a refund smaller than the fee, we refund the difference, so the fee never costs more than the refund. It applies ONLY when there is an actual refund; if the customer owes tax or gets no refund, the fee is non-refundable and you must NEVER promise to refund it or say they are "never out of pocket". Payment is upfront. NEVER invent or negotiate prices, NEVER give personalised tax advice or determine residency/Medicare/deductions/refund amounts before payment, NEVER claim to be a bot/AI, NEVER use an em dash or en dash.
- Write answers in English.
- Merge duplicate questions into one entry; set examples to the real phrasings seen; set keywords to the important searchable words; set a short intent label.
- Only include genuine, reusable questions (skip one-off logistics tied to a single person).

Output strictly by calling the knowledge_entries tool.`;

export async function mineKnowledge(
  conversations: { messages: { role: string; text: string }[]; converted?: boolean }[],
): Promise<MinedEntry[]> {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key || conversations.length === 0) return [];
  const out: MinedEntry[] = [];
  const BATCH = 12;
  for (let i = 0; i < conversations.length; i += BATCH) {
    const batch = conversations.slice(i, i + BATCH);
    const convText = batch.map((c, idx) =>
      `--- Conversation ${idx + 1}${c.converted ? ' (CONVERTED: customer paid)' : ''} ---\n` +
      c.messages.map((m) => `${m.role === 'customer' ? 'Customer' : 'Agent'}: ${m.text}`).join('\n'),
    ).join('\n\n');
    const body = JSON.stringify({
      model: process.env.CLAUDE_MODEL ?? 'claude-sonnet-4-5',
      max_tokens: 4096,
      system: MINE_SYSTEM,
      tools: [MINE_TOOL],
      tool_choice: { type: 'tool', name: 'knowledge_entries' },
      messages: [{ role: 'user', content: convText.slice(0, 60000) }],
    });
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        signal: AbortSignal.timeout(90_000),
        headers: { 'x-api-key': key, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
        body,
      });
      if (!res.ok) { if (res.status === 429 || res.status >= 500) { await sleep(800); } continue; }
      const data = await res.json();
      const tool = (data.content as Array<{ type: string; name?: string; input?: unknown }> | undefined)
        ?.find((bl) => bl.type === 'tool_use' && bl.name === 'knowledge_entries');
      const entries = (tool?.input as { entries?: MinedEntry[] } | undefined)?.entries;
      if (Array.isArray(entries)) {
        for (const e of entries) {
          if (!e?.question || !e?.answer) continue;
          out.push({
            intent: String(e.intent ?? '').slice(0, 80),
            question: String(e.question).slice(0, 400),
            examples: Array.isArray(e.examples) ? e.examples.slice(0, 8).map((s) => String(s).slice(0, 200)) : [],
            answer: String(e.answer).slice(0, 2000),
            keywords: Array.isArray(e.keywords) ? e.keywords.slice(0, 16).map((s) => String(s).slice(0, 40)) : [],
            tags: Array.isArray(e.tags) ? e.tags.slice(0, 8).map((s) => String(s).slice(0, 40)) : [],
            lang: (typeof e.lang === 'string' && e.lang.length <= 5) ? e.lang : 'en',
          });
        }
      }
    } catch { /* skip this batch, continue */ }
  }
  return out;
}

// ============================================================
// Lost-lead post-mortem: read one conversation that did NOT end in a payment
// and say honestly why, what should have been done differently, and whether it
// can still be recovered.
//
// FOR THE OWNER. The assessment itself (reason, fault, what should have been
// done) is private and never leaves this screen.
//
// ONE THING NOW CROSSES OVER (Jo, 28 Aug): `recovery_message`, the actual text
// to send a lead who could still come back. It is NOT sent from here. Pressing
// the button on the card raises an ordinary task in Will with that text as its
// suggested reply, so it is read, edited if needed, and sent by a person
// through the same policy guard as every other outbound message. Nothing this
// function returns can reach a customer without a human pressing send.
//
// Same hardening as decide() above: forced tool call, timeout, one retry with
// jitter on 429/5xx, and strict validation of the result (lost-leads.ts). A
// failure returns { error } rather than throwing, so the nightly job records it
// and moves to the next lead instead of dying halfway through the batch.
// ============================================================
export interface LostLeadEvidence {
  /** "Sarah (…123)" — never the full number, this ends up in a stored report. */
  label: string;
  stateLabel: string;
  /** Why the system considers this lead lost (declined / cold / silent …). */
  lostBecause: string;
  income: string;
  lang: string | null;
  /** Human summary of the timing, built by lost-analysis.ts. */
  timingSummary: string;
  /** The conversation, redacted, oldest first. */
  transcript: string;
  /** The state transitions with their timestamps. */
  stateHistory: string;
}

const POSTMORTEM_TOOL = {
  name: 'post_mortem',
  description: 'Your honest assessment of why this lead did not become a paying client.',
  input_schema: {
    type: 'object',
    properties: {
      reason: {
        type: 'string',
        description: 'One or two sentences: why THIS lead did not convert. Specific to this conversation, not a generic sales truism. If the conversation does not actually say why, say that plainly.',
      },
      category: {
        type: 'string',
        enum: [...LOST_CATEGORIES],
        description: 'The single closest bucket. Use "unclear" when the evidence genuinely does not support one of the others — a wrong bucket is worse than an honest "unclear", because these are counted and the counts are what the owner acts on.',
      },
      should_have_done: {
        type: 'string',
        description: 'The detailed part of this report, and the reason the owner reads it. Walk through the conversation and set out what specifically should have been done differently: which message, what was said, what should have been said instead, and what would probably have happened. Where more than one moment mattered, cover each in turn, earliest first. Be concrete enough that someone could act on it tomorrow without having to reread the chat. Several sentences, or a short paragraph per moment. If the honest answer is that nothing should have been done differently, write exactly that and explain what makes you sure of it from this conversation — that is a correct and complete answer, not a cop-out, and it must not be padded out into invented criticism.',
      },
      fault: {
        type: 'string',
        enum: ['OURS', 'PARTLY_OURS', 'NOT_OURS'],
        description: 'OURS: a mistake or omission on our side cost this lead. PARTLY_OURS: we could have done better but the outcome was likely anyway. NOT_OURS: nothing was done wrong, this lead was never going to convert.',
      },
      recoverable: {
        type: 'string',
        enum: ['YES', 'MAYBE', 'NO'],
        description: 'Could this specific person still become a client? NO for someone who asked us to stop, who has no Australian income to lodge, or who has already lodged elsewhere.',
      },
      recovery_action: {
        type: 'string',
        description: 'Required unless recoverable is NO: the one concrete move that would most likely win them back, in the owner\'s own hands. Not "follow up" — say what about, and why now. One or two sentences; this is the reasoning, not the message itself.',
      },
      recovery_message: {
        type: 'string',
        description: 'Required unless recoverable is NO: the actual WhatsApp message to send this person, word for word, ready to send. Write it to THIS conversation: pick up the specific thing they last said or asked, and answer it. Their language, not English, if that is what they wrote in. Warm, short, three lines at most, no greeting beyond a natural opener, no pressure and no discount. Never quote a refund figure, never give tax advice, never negotiate the fixed fee. Never use an em dash or en dash. Do not include placeholders of any kind: write the finished text.',
      },
      evidence_quote: {
        type: 'string',
        description: 'Optional: the single most telling line from the conversation, quoted verbatim, that supports your reason.',
      },
      confidence: { type: 'number', description: '0..1 — how well the conversation actually supports this reading.' },
    },
    required: ['reason', 'category', 'should_have_done', 'fault', 'recoverable', 'confidence'],
  },
} as const;

const POSTMORTEM_SYSTEM = `You are an experienced sales and client-service reviewer looking at ONE conversation from "Working Holiday Tax", an Australian tax agency serving Working Holiday Makers (backpackers). A tax return is a fixed fee: $220 for TFN-only, $385 when there is also an ABN. Payment is upfront, and there is a guarantee for all customers that if the customer gets a refund smaller than the fee, the difference is refunded; it applies only when there is an actual refund, and if the customer owes tax or gets no refund the fee is non-refundable. The team cannot give personalised tax advice, quote a refund figure, or decide residency before someone has paid: that is a professional obligation, not a sales choice.

This lead did NOT pay. You are writing a private post-mortem for the business owner. It will never be shown or sent to the customer, so write for the owner, plainly.

BE HONEST ABOVE ALL ELSE. A large share of leads that do not convert were never going to: a backpacker with no Australian income, someone who already lodged, a wrong number, a person who simply stopped answering with no reason given. When that is the truth, say so — "nothing was done wrong, this lead was never going to convert" is a complete and correct answer, and you should give it whenever it fits. Do NOT manufacture a fault to have something to report. A post-mortem that always finds fault is worse than useless: the owner will stop reading it, and the real failures will be buried among invented ones.

Equally, do not soften a real failure. If a question went unanswered, if a reply took days, if the price landed with no context and nobody followed up, if an objection was met with a script instead of an answer — name it, and name the message where it happened.

The timing is often the whole story. Someone who read the price and never typed again is a different failure from someone who argued about it over three days, and both are different from someone who was still asking questions when the conversation stopped.

What "should have been done differently" must be concrete and inside the rules above. Never suggest discounting, negotiating the fixed price, quoting a refund amount before payment, or giving tax advice before payment — those are not available and suggesting them makes the report unusable.

TWO OF THE FIELDS ARE THE WORK, AND THE REST IS CONTEXT FOR THEM.

The should_have_done field is where the thinking goes. Do not summarise: go through the conversation and show your reasoning, message by message where it matters. The owner is trying to stop the same thing happening to the next twenty leads, so vague advice is worth nothing to him and a precise account of one wrong sentence is worth a great deal. And when the truth is that nothing would have changed the outcome, say that clearly instead of reaching for something.

The recovery_message field is a message that a person will read on their phone. Write it as one, not as a description of one. It has to sound like the same person who was already talking to them, pick up where that conversation actually stopped, and give them a reason to answer that is about their situation rather than about our sales process. Somebody who asked us to stop, or who has nothing to lodge, gets no message at all: set recoverable to NO and leave it out.

Answer only by calling the post_mortem tool.`;

/** Returns the validated analysis, or `{ error }` on any failure — no key, a
 *  timeout, a bad status, a truncated response, or output that did not pass
 *  validation. Never throws. */
export async function analyseLostLead(
  ev: LostLeadEvidence,
): Promise<LostAnalysis | { error: string }> {
  const key = process.env.ANTHROPIC_API_KEY;
  // No mock fallback here on purpose. decide() mocks because a customer is
  // waiting and silence is not an option; a report can simply say it has not
  // been generated, which is true. Inventing a post-mortem would be worse than
  // an empty page.
  if (!key) return { error: 'No Anthropic API key configured' };

  const userContent = [
    `Lead: ${ev.label}`,
    `Stage when the conversation stopped: ${ev.stateLabel}`,
    `Why the system counts this lead as lost: ${ev.lostBecause}`,
    `Income type on file: ${ev.income}`,
    `Language: ${ev.lang ?? 'unknown'}`,
    '',
    'TIMING',
    ev.timingSummary,
    '',
    'STATE HISTORY',
    ev.stateHistory || '(no transitions recorded)',
    '',
    'CONVERSATION (oldest first; long numbers and emails are redacted)',
    ev.transcript || '(no messages on file)',
  ].join('\n');

  const body = JSON.stringify({
    model: process.env.CLAUDE_MODEL ?? 'claude-sonnet-4-5',
    max_tokens: 1024,
    system: POSTMORTEM_SYSTEM,
    tools: [POSTMORTEM_TOOL],
    tool_choice: { type: 'tool', name: 'post_mortem' },
    messages: [{ role: 'user', content: userContent.slice(0, 60000) }],
  });

  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        signal: AbortSignal.timeout(45_000),
        headers: { 'x-api-key': key, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
        body,
      });
      if (res.status === 429 || res.status >= 500) {
        if (attempt === 0) { await sleep(400 + Math.random() * 400); continue; }
        return { error: `Claude API error ${res.status}` };
      }
      if (!res.ok) return { error: `Claude API error ${res.status}` };
      const data = await res.json();
      if (data.stop_reason === 'max_tokens') return { error: 'Model response truncated' };
      const tool = (data.content as Array<{ type: string; name?: string; input?: unknown }> | undefined)
        ?.find((bl) => bl.type === 'tool_use' && bl.name === 'post_mortem');
      if (!tool?.input) return { error: 'Model returned no assessment' };
      const parsed = validateLostAnalysis(tool.input);
      // Never trust the shape. A half-formed answer is dropped rather than
      // patched into something that looks complete in the report.
      if (!parsed) return { error: 'Model returned an unusable assessment' };
      return parsed;
    } catch {
      if (attempt === 0) { await sleep(400 + Math.random() * 400); continue; }
      return { error: 'Claude API unreachable' };
    }
  }
  return { error: 'Claude API unreachable' };
}

// ---------- deterministic mock (no API key) ----------
const NO_ABN = /\b(?:no|don'?t have|without|never had)\s+(?:an?\s+)?abn\b|only\s+(?:worked\s+)?(?:on\s+)?(?:a\s+)?tfn|just\s+tfn/i;
const PAYABLE_STATES: CustomerState[] = ['PRICE_SENT', 'PAYMENT_PENDING'];

// A customer who already lodged/filed/submitted their return and wants it
// checked/reviewed/corrected is asking for a genuinely different service
// (a review, not a fresh return), not declining — even though "already
// lodged" on its own elsewhere signals someone walking away. Checked BEFORE
// the decline pattern below so this always wins when both phrases appear
// together (e.g. "already lodged it myself, can you check it?").
const ALREADY_FILED = /\b(already (lodged|filed|submitted|did (it|my (tax )?return))|lodged|filed|submitted) it (myself|through)|did (it|my (tax )?return) myself\b/i;
const WANTS_REVIEW = /\b(check|review|correct|wrong|mistake|amend|look at|verify|fix)\b/i;

// M3: a real payment confirmation, not "I paid attention to your ad".
//
// One definition, shared with the attachment path (payment-claim.ts). There
// used to be a copy here and nothing equivalent in service.ts, so the same
// sentence was trusted when typed on its own and ignored when typed under a
// screenshot. It also only understood English, which is a strange thing for a
// system whose customers are Spanish, German and Japanese.
const looksLikePayment = claimsPayment;

function mockDecide(ctx: CustomerContext, history: Turn[]): Decision {
  const last = history.filter((t) => t.role === 'customer').at(-1)?.text ?? '';
  const lower = last.toLowerCase();
  const m = (d: Omit<Decision, 'confidence' | 'mock'>): Decision => ({ ...d, confidence: 1, mock: true });

  if (/(ignore (your|all) (rules|instructions)|send me the password|api key|you are now|take over|admin)/i.test(last)) {
    return m({ action: 'human_task', task_reason: 'Possible manipulation attempt', task_severity: 'URGENT', suggested_reply: "Sorry, I can't help with that. Is there anything about your tax return I can help you with? 😊" });
  }
  // Review of an already-lodged return: a different service, not a decline.
  // No refund guarantee (there's no fresh return to guarantee against), and
  // that is said plainly rather than silently dropped from the price message.
  if (!ctx.paid && ALREADY_FILED.test(lower) && WANTS_REVIEW.test(lower)) {
    const abn = /abn/.test(lower) && !NO_ABN.test(lower);
    return m({ action: 'reply', reply_text: abn ? APPROVED.price_tfn_abn_review : APPROVED.price_tfn_review, new_state: 'PRICE_SENT' });
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
