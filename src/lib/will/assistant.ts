// ============================================================
// The in-CRM copilot ("Ask Will").
//
// A tool-use loop the OWNER talks to from the Overview tab. It can READ the
// system freely (search customers, read a conversation, see the pipeline, the
// open tasks, the winnable lost leads) and it can PROPOSE actions — move a
// customer along the pipeline, send a reply, open a task. It never MUTATES
// anything itself: every action it wants to take comes back as a proposal with
// a one-click button, and the click goes through the same hardened, guarded,
// audited /api/will/actions endpoint as every other owner action.
//
// Why propose-and-approve and not auto-run: this is a tax business. A message
// to the wrong person, or a stage moved by mistake, is a real-world problem
// with a real customer on the other end. The owner stays the one who presses
// send. The copilot does the reading, the thinking and the drafting.
//
// Same containment discipline as claude.ts: forced/bounded loop, timeout per
// call, one retry on transient errors, and no throw ever escapes — a failure
// returns a plain message the owner can read, never a 500.
// ============================================================
import { getStore, CustomerRow } from './store';
import { ALL_STATES, STAGE_GROUPS, STATE_LABELS, CustomerState } from './state-machine';
import { stripDashes } from './text';

export interface AssistantTurn { role: 'user' | 'assistant'; text: string }

/** A mutation the copilot wants to make. It is NOT executed here — the UI shows
 *  it as a card with an Approve button that calls /api/will/actions. */
export interface Proposal {
  /** Stable id so the UI can track which proposals were acted on. */
  id: string;
  kind: 'move_stage' | 'send_reply' | 'open_task';
  customerId: string;
  /** A human label for the card, e.g. the phone number and what will happen. */
  customerLabel: string;
  /** The customer's raw WhatsApp number, so the card can show just the number. */
  customerPhone: string;
  /** move_stage */
  toState?: CustomerState;
  toStateLabel?: string;
  /** send_reply / open_task */
  message?: string;
  /** open_task */
  reason?: string;
  /** The model's one-line justification, shown under the card. */
  why?: string;
}

export interface AssistantResult {
  ok: boolean;
  /** The copilot's written answer to the owner. */
  reply: string;
  proposals: Proposal[];
  mock?: boolean;
}

// ────────────────────────────────────────────────────────────
// Tools the model can call. READ tools run server-side and feed their result
// back into the loop. PROPOSE tools record a Proposal and return an
// acknowledgement; nothing is mutated.
// ────────────────────────────────────────────────────────────
const TOOLS = [
  {
    name: 'search_customers',
    description: 'Find customers by phone number, name, or words from their last message. Returns id, phone, stage, language, and their last message so you can pick the right person. Use this first whenever the owner names a customer.',
    input_schema: {
      type: 'object',
      properties: { query: { type: 'string', description: 'A phone number, a name, or a keyword.' } },
      required: ['query'],
    },
  },
  {
    name: 'get_conversation',
    description: 'Read the recent WhatsApp conversation with one customer, plus their current stage, language, paid status and refund estimate. Use this before advising on how to answer someone or before proposing a reply, so your advice fits what was actually said.',
    input_schema: {
      type: 'object',
      properties: {
        customer_id: { type: 'string' },
        limit: { type: 'number', description: 'How many recent messages to read (default 25, max 60).' },
      },
      required: ['customer_id'],
    },
  },
  {
    name: 'pipeline_overview',
    description: 'Get the live count of customers in every pipeline stage (Lead, Assessment Paid, Review, Lodgement Payment, In Progress, Signature, Completed, Closed) and the total. Use this for "how is the pipeline", weekly reviews, or to decide where to look.',
    input_schema: { type: 'object', properties: {} },
  },
  {
    name: 'list_stage',
    description: 'List the customers currently in one pipeline stage group, newest activity first. Stage group ids: sales (Lead), onb (Assessment Paid), rev (Review), pay2 (Lodgement Payment, paid the assessment and saw their result but has not paid to lodge, high-intent), ready (In Progress), sig (Signature), done (Completed), closed (Closed). Use this for a weekly sweep of who is sitting where.',
    input_schema: {
      type: 'object',
      properties: {
        group: { type: 'string', enum: STAGE_GROUPS.map((g) => g.id) },
        limit: { type: 'number', description: 'Max customers to return (default 30, max 80).' },
      },
      required: ['group'],
    },
  },
  {
    name: 'list_open_tasks',
    description: 'List the tasks currently open for the owner (things waiting on a human decision or reply).',
    input_schema: { type: 'object', properties: {} },
  },
  {
    name: 'list_recoverable_leads',
    description: 'List leads that did not convert but the nightly assessment judged still winnable, with the reason and the ready-to-send win-back message. Use this for "who else can we help".',
    input_schema: { type: 'object', properties: {} },
  },
  {
    name: 'library_overview',
    description: 'See what Will\'s answer Library (knowledge base) already covers: the active entries by topic, plus how many drafts are waiting. Use this when advising what to add to the Library, or to spot a topic customers ask about that is not covered yet.',
    input_schema: { type: 'object', properties: {} },
  },
  {
    name: 'propose_move_stage',
    description: 'Propose moving a customer to a different pipeline stage. This does NOT move them, it shows the owner a one-click button. Only propose a move you can justify from the conversation or the facts.',
    input_schema: {
      type: 'object',
      properties: {
        customer_id: { type: 'string' },
        to_state: { type: 'string', enum: ALL_STATES },
        reason: { type: 'string', description: 'One short line: why this move.' },
      },
      required: ['customer_id', 'to_state', 'reason'],
    },
  },
  {
    name: 'propose_reply',
    description: 'Propose a WhatsApp reply to send a customer. This does NOT send, it shows the owner the message with a one-click Send button, which they can edit first. Write the finished message in the customer\'s language. Never quote a refund figure or give personalised tax advice before payment, never negotiate the fixed fee, never use an em dash or en dash.',
    input_schema: {
      type: 'object',
      properties: {
        customer_id: { type: 'string' },
        message: { type: 'string', description: 'The exact message to send, ready to go.' },
        reason: { type: 'string', description: 'One short line: why this reply.' },
      },
      required: ['customer_id', 'message'],
    },
  },
  {
    name: 'propose_open_task',
    description: 'Propose opening a task for the owner (a reminder to handle something), optionally with a suggested reply. This does NOT create the task, it shows a one-click button.',
    input_schema: {
      type: 'object',
      properties: {
        customer_id: { type: 'string' },
        reason: { type: 'string', description: 'Short headline of what needs handling.' },
        suggested_reply: { type: 'string', description: 'Optional draft message for the task.' },
      },
      required: ['customer_id', 'reason'],
    },
  },
] as const;

// The permanent, baked-in profile of the business and the owner. This is in
// the system prompt on EVERY turn, so the copilot never has to be told who we
// are from scratch, whatever a single chat remembers. The owner can add to it
// without a redeploy: a stored `assistant_profile` setting is appended below at
// runtime (see runAssistant), so "what I like / what I want" can grow over time.
const ABOUT = `ABOUT US (this is always true, you never need to be told it again)
- The business is "Working Holiday Tax" (WHV Tax), workingholidaytax.com.au: an Australian tax service for Working Holiday Makers (backpackers on 417/462 visas) and other temporary residents.
- What we do for customers: lodge their Australian tax return, and help claim their superannuation (DASP) after they leave Australia. Returns are reviewed and signed off by a registered tax agent. The business itself is not the registered tax agent, and you never imply it is.
- Pricing is two steps: a $110 Tax Assessment paid first (non-refundable, covers the review whatever the outcome), then a separate Preparation & Lodgement fee only if the customer decides to lodge (an additional $110 for TFN, so $220 all up; an additional $275 with ABN, so $385 all up). There is NO refund guarantee.
- Customers are international and write in many languages (English, Spanish, German, Japanese and more). They reach us on WhatsApp, where "Will" answers them. You are the owner's side of the same system.
- The business is growing fast, heading for thousands of customers a year, so the owner cares about what scales: spotting who is stuck, who is worth chasing, and what is slipping through.

ABOUT THE OWNER (Jo)
- Jo owns and runs the business. He speaks Hebrew and usually writes to you in Hebrew; reply in Hebrew unless he writes in another language.
- He wants short, direct answers. No filler, no long essays, no restating his question back to him. Give the answer, then any one-click actions.
- He cares a lot about safety: a wrong message to a real customer is a real problem, so you propose and he approves. He would rather you flag a doubt than act on a guess.
- His standing rule: never an em dash or en dash, anywhere. He has asked for this many times.
- The customer voice he wants from Will is warm, patient, professional and human, never robotic and never admitting to being a bot.

WHAT JO USES YOU FOR
- Advice on how to handle a specific customer or conversation.
- A read on the pipeline and where his attention is worth spending.
- Weekly-style sweeps: go over the customers and surface who else can be helped or recovered.
- Doing things in the system on his say-so: moving a customer along the pipeline, drafting or sending a reply, opening a task.

THE GOALS YOU ARE WORKING TOWARD (this is the business's standing agenda, hold it in mind every time)
- Turn leads into paying clients. The stated target is that every genuine lead converts, so a warm lead going quiet is a loss to chase, not to shrug at.
- Keep every customer moving through the pipeline. Nobody should sit stuck: a lead who got a price and went silent, someone who paid but never sent the form, a return waiting on a signature. Spot them and say so.
- Never lose a winnable lead to silence. Follow up, or recover the ones the nightly assessment marks winnable.
- Protect the customer experience: fast, warm, professional answers, never robotic.
- Grow Will's answer Library so it handles more on its own. When you see a real question customers ask that the Library does not cover well, flag it as something to add.
- Flag anything that needs a human, early: a refund or cancellation, a complaint, an angry or confused customer, a sensitive case, or anything Will could not confidently handle. These are the things that cost the business if they sit.
- Everything scales toward thousands of customers, so favour what saves Jo time and catches what would otherwise slip.

WHEN YOU RUN THE OPEN-TASKS SWEEP (the automatic scan that fills the Open tasks column, or "go over everyone")
- You are a CONVERSION agent. Your one goal is to turn people into paying clients. Scan two places: the CLOSED / lost leads (use list_recoverable_leads, which already read each closed conversation and decided who is still winnable and with what message), and the LEADS still in the pipeline that do NOT already have a scheduled follow-up (already_being_followed_up = false).
- For each such customer, judge from the evidence whether they can still be converted. If yes, propose ONE card carrying the ready message that would try to convert them: for a closed / out-of-window customer use propose_open_task with the win-back message as suggested_reply (a closed customer is outside WhatsApp's 24 hour window, so a direct send is blocked and a task is how Jo sends it); for a lead inside the window a propose_reply is fine. If you conclude they cannot be converted, DO NOT include them, and never invent a customer or a reason to fill space.
- EVERY card MUST carry the finished message AND a one-line reason (why this customer, what the opening is). Never a bare card with just a number.
- Skip anyone with already_being_followed_up = true, there is nothing to do there.
- Cards only, no prose, no markdown, no list. If, after really scanning, there is nobody left who can be converted, return NO cards and instead write exactly one honest line that you scanned the closed and the leads and there is no one left to convert. Never pad it and never make one up.`;

const SYSTEM = `You are Will's copilot: an assistant INSIDE the WHV Tax CRM that the business owner (Jo) talks to directly. "Will" is the WhatsApp assistant that talks to customers; you are the owner-facing helper that sits beside it.

${ABOUT}

WHAT YOU DO
- Answer the owner's questions and give advice: how to handle a customer, what a conversation needs, where the pipeline stands, who is worth chasing.
- Read the system yourself using the tools before you answer. Do not guess a customer's stage or what they said, look it up.
- When something should change, PROPOSE it with a propose_* tool. You never move a customer, send a message, or open a task directly. Each proposal becomes a one-click button the owner presses (and can edit first). This is deliberate: this is a tax business with real customers, and the owner stays the one who presses send.

THE PIPELINE (stage groups): Lead -> Assessment Paid -> Review -> Lodgement Payment -> In Progress -> Signature -> Completed, with Closed off to the side. "Lodgement Payment" (LODGEMENT_PENDING) is the customer who paid the $110 assessment and saw their result but has not yet paid the lodgement fee, a high-intent second-payment lead worth chasing. Individual states within them: ${ALL_STATES.join(', ')}.

BUSINESS RULES YOU MUST RESPECT (they apply to anything you propose sending a customer)
- Two-step pricing: a $110 Tax Assessment first, then a separate lodgement fee only if they go ahead (an additional $110 for TFN, $220 all up; an additional $275 with ABN, $385 all up). Never invent, discount, or negotiate a price.
- There is NO refund guarantee. Never propose a message that says we top up or refund the difference, that the fee never costs more than the refund, or that the customer is never out of pocket. The reassurance is that the $110 assessment shows the customer their full outcome before they commit to lodging.
- Before a customer has paid, never quote a refund figure and never give personalised tax advice (residency, Medicare, deductions). That is a professional obligation, not a sales choice.
- Never claim or imply the business itself is a registered tax agent. Returns are reviewed and signed off by a registered tax agent; do not reword or overstate that.
- Never use an em dash or an en dash anywhere. Use a comma, a full stop, or a hyphen.

STYLE, AND THIS MATTERS A LOT
- Reply in the SAME LANGUAGE the owner writes to you in. The owner usually writes Hebrew, so reply in Hebrew unless he writes to you in another language.
- THE ACTION CARDS ARE THE ANSWER, NOT YOUR TEXT. When something can be done, do NOT describe it in prose. Turn it into a propose_* card (propose_reply, propose_move_stage, propose_open_task) so the owner sees a small box with the ready result and a one-click Send / Move / Open button. "Send this message to Nick, [Send]" as a card beats a paragraph explaining that Nick is waiting.
- Keep your written text to ONE short line, or none at all when the cards speak for themselves. No essays, no walls of text, no recap of what you read.
- PLAIN TEXT ONLY. Never use markdown: no asterisks for bold, no bullet lists, no headings, no numbered lists. Just plain short sentences. The owner's screen shows your text raw, so markdown looks like broken punctuation.
- If there is nothing to act on, say so in one short reassuring line (for example "הכל על המסלול, אין משהו דחוף כרגע") and stop. Do not invent work to fill space.
- When you propose a customer reply, write the finished message in the CUSTOMER's language (from get_conversation), not the owner's.
- If you are not sure which customer the owner means, ask, or search and confirm, rather than acting on the wrong one.`;

// The copilot runs on a FAST model on purpose (Jo, 29 Aug: "fast thinking, not
// deep"). Haiku answers in a second or two, which is what an owner talking to a
// chat expects, and the mutating actions are propose-and-approve anyway so the
// safety does not ride on the model's depth. Overridable per deployment; falls
// back to Will's own model only if someone clears the default.
const MODEL = () => process.env.CLAUDE_ASSISTANT_MODEL ?? 'claude-haiku-4-5';
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

function phoneLabel(c: CustomerRow): string {
  return c.name ? `${c.name} (${c.waId})` : c.waId;
}

/** Strip the markdown the owner's chat shows raw (asterisks, headings, bullet and
 *  numbered list markers, backticks), so a stray "**bold**" or "- item" never
 *  lands as broken punctuation. Plain, readable text is what the bubble renders.
 *  Applied to the copilot's own reply only, never to a proposed customer message. */
function plainText(s: string): string {
  return s
    .replace(/[*_`]{1,3}/g, '')                       // bold/italic/code markers
    .replace(/^\s{0,3}#{1,6}\s+/gm, '')               // headings
    .replace(/^\s*[-*+]\s+/gm, '')                    // bullet markers
    .replace(/^\s*\d+[.)]\s+/gm, '')                  // numbered markers
    .replace(/\n{3,}/g, '\n\n')                        // collapse blank runs
    .trim();
}

function customerBrief(c: CustomerRow, followupSet?: Set<string>): Record<string, unknown> {
  return {
    id: c.id,
    phone: c.waId,
    name: c.name ?? null,
    stage: STATE_LABELS[c.state],
    state: c.state,
    paid: c.paid,
    language: c.lang ?? 'unknown',
    opted_out: c.optedOut,
    // Signed: positive is a refund, negative is tax payable (two-step model).
    outcome_estimate: c.estimatedRefundCents != null
      ? `$${(Math.abs(c.estimatedRefundCents) / 100).toFixed(2)} ${c.estimatedRefundCents < 0 ? 'payable' : 'refund'}`
      : null,
    last_message: c.lastMessagePreview ?? null,
    last_message_at: c.lastMessageAt ?? null,
    // True when an automatic follow-up nudge is already SCHEDULED (not yet sent)
    // for this customer. They are already being chased, so in a proactive review
    // do not surface them as needing action, the nudge is on its way.
    already_being_followed_up: followupSet ? followupSet.has(c.id) : undefined,
  };
}

// ────────────────────────────────────────────────────────────
// Read-tool execution. Each returns a small JSON-able object. Any error is
// caught and returned as { error } so the loop keeps going.
// ────────────────────────────────────────────────────────────
async function runReadTool(name: string, input: Record<string, unknown>, followupSet: Set<string>): Promise<unknown> {
  const store = getStore();
  try {
    switch (name) {
      case 'search_customers': {
        const q = String(input.query ?? '').trim();
        if (!q) return { error: 'empty query' };
        const rows = await store.searchCustomers(q, 20);
        return { count: rows.length, customers: rows.map((c) => customerBrief(c, followupSet)) };
      }
      case 'get_conversation': {
        const id = String(input.customer_id ?? '');
        const c = await store.getCustomerById(id);
        if (!c) return { error: 'customer not found' };
        const limit = Math.min(Math.max(Number(input.limit) || 25, 1), 60);
        const msgs = (await store.listMessages(id)).slice(-limit);
        return {
          customer: customerBrief(c, followupSet),
          messages: msgs.map((m) => ({
            from: m.author === 'CUSTOMER' ? 'customer' : m.author === 'HUMAN' ? 'owner' : m.author === 'AI' ? 'will' : 'system',
            direction: m.direction,
            status: m.status,
            text: m.body?.slice(0, 1200) ?? '',
            at: m.createdAt,
          })),
        };
      }
      case 'pipeline_overview': {
        const total = await store.countCustomers();
        const groups: Record<string, number> = {};
        for (const g of STAGE_GROUPS) groups[g.label] = await store.countInStates([...g.states] as CustomerState[]);
        return { total_customers: total, by_stage: groups };
      }
      case 'list_stage': {
        const gid = String(input.group ?? '');
        const g = STAGE_GROUPS.find((x) => x.id === gid);
        if (!g) return { error: 'unknown stage group' };
        const limit = Math.min(Math.max(Number(input.limit) || 30, 1), 80);
        const all = await store.listCustomers();
        const rows = all
          .filter((c) => (g.states as readonly string[]).includes(c.state))
          .sort((a, b) => (b.lastMessageAt ?? '').localeCompare(a.lastMessageAt ?? ''))
          .slice(0, limit);
        return { group: g.label, count: rows.length, customers: rows.map((c) => customerBrief(c, followupSet)) };
      }
      case 'list_open_tasks': {
        const tasks = (await store.listTasks()).filter((t) => t.status === 'OPEN');
        return {
          count: tasks.length,
          tasks: tasks.slice(0, 40).map((t) => ({
            id: t.id, customer_id: t.customerId, customer: t.customerName,
            reason: t.reason, severity: t.severity, suggested_reply: t.suggestedReply ?? null,
          })),
        };
      }
      case 'list_recoverable_leads': {
        const rows = (await store.listLostAnalyses()).filter(
          (r) => r.status === 'OK' && r.recoverable !== 'NO' && r.recoveryMessage?.trim(),
        );
        const out = [];
        for (const r of rows.slice(0, 25)) {
          const c = await store.getCustomerById(r.customerId);
          if (!c || c.optedOut) continue;
          out.push({
            customer_id: r.customerId, phone: c.waId, name: c.name ?? null,
            stage: STATE_LABELS[c.state], recoverable: r.recoverable,
            reason: r.reason, win_back_message: r.recoveryMessage,
          });
        }
        return { count: out.length, leads: out };
      }
      case 'library_overview': {
        const active = await store.listKnowledge('active');
        const drafts = await store.listKnowledge('draft');
        return {
          active_count: active.length,
          draft_count: drafts.length,
          active_topics: active.slice(0, 60).map((k) => ({ intent: k.intent, question: k.question })),
        };
      }
      default:
        return { error: 'unknown tool' };
    }
  } catch (e) {
    return { error: e instanceof Error ? e.message : 'tool failed' };
  }
}

// ────────────────────────────────────────────────────────────
// Propose-tool handling: validate against reality, build a Proposal, and return
// the acknowledgement the model sees. A proposal the owner could not act on
// (unknown customer, unknown state) is rejected here rather than shown.
// ────────────────────────────────────────────────────────────
async function runProposeTool(
  name: string,
  input: Record<string, unknown>,
  proposals: Proposal[],
  idCounter: { n: number },
): Promise<unknown> {
  const store = getStore();
  const id = String(input.customer_id ?? '');
  const c = id ? await store.getCustomerById(id) : null;
  if (!c) return { error: 'customer not found; search first and use the exact id' };
  const pid = `p${++idCounter.n}`;
  if (name === 'propose_move_stage') {
    const to = String(input.to_state ?? '') as CustomerState;
    if (!ALL_STATES.includes(to)) return { error: 'unknown state' };
    if (to === c.state) return { error: `already in ${STATE_LABELS[to]}` };
    proposals.push({
      id: pid, kind: 'move_stage', customerId: c.id, customerLabel: phoneLabel(c), customerPhone: c.waId,
      toState: to, toStateLabel: STATE_LABELS[to], why: stripDashes(String(input.reason ?? '')),
    });
    return { proposed: true, note: `Shown to the owner as a one-click button: move ${phoneLabel(c)} to ${STATE_LABELS[to]}.` };
  }
  if (name === 'propose_reply') {
    const msg = stripDashes(String(input.message ?? '').trim());
    if (!msg) return { error: 'empty message' };
    if (c.optedOut) return { error: 'this customer opted out; a reply cannot be sent' };
    proposals.push({
      id: pid, kind: 'send_reply', customerId: c.id, customerLabel: phoneLabel(c), customerPhone: c.waId,
      message: msg.slice(0, 4000), why: stripDashes(String(input.reason ?? '')),
    });
    return { proposed: true, note: `Shown to the owner as an editable message with a one-click Send button.` };
  }
  if (name === 'propose_open_task') {
    const reason = stripDashes(String(input.reason ?? '').trim());
    if (!reason) return { error: 'empty reason' };
    proposals.push({
      id: pid, kind: 'open_task', customerId: c.id, customerLabel: phoneLabel(c), customerPhone: c.waId,
      reason: reason.slice(0, 300),
      message: input.suggested_reply ? stripDashes(String(input.suggested_reply)).slice(0, 4000) : undefined,
      why: undefined,
    });
    return { proposed: true, note: `Shown to the owner as a one-click "open task" button.` };
  }
  return { error: 'unknown tool' };
}

const PROPOSE_NAMES = new Set(['propose_move_stage', 'propose_reply', 'propose_open_task']);

type ApiMessage = { role: 'user' | 'assistant'; content: unknown };

/** History from the UI, mapped to API messages. Starts on a user turn, bounded. */
function seedMessages(history: AssistantTurn[]): ApiMessage[] {
  const trimmed = history.filter((t) => t.text.trim().length > 0).slice(-24);
  while (trimmed.length && trimmed[0].role !== 'user') trimmed.shift();
  return trimmed.map((t) => ({ role: t.role, content: t.text.slice(0, 6000) }));
}

async function callApi(key: string, system: string, messages: ApiMessage[]): Promise<{ ok: true; data: unknown } | { ok: false; error: string }> {
  const body = JSON.stringify({
    // Roomy enough for a full sweep, a briefing can propose many action cards at
    // once and each carries a ready message, so a tight cap would truncate the
    // list. Haiku stays fast even at this size.
    model: MODEL(), max_tokens: 3200, system, tools: TOOLS, messages,
  });
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        signal: AbortSignal.timeout(40_000),
        headers: { 'x-api-key': key, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
        body,
      });
      if (res.status === 429 || res.status >= 500) {
        if (attempt === 0) { await sleep(500 + Math.random() * 500); continue; }
        return { ok: false, error: `Claude API error ${res.status}` };
      }
      if (!res.ok) return { ok: false, error: `Claude API error ${res.status}` };
      return { ok: true, data: await res.json() };
    } catch {
      if (attempt === 0) { await sleep(500 + Math.random() * 500); continue; }
      return { ok: false, error: 'Claude API unreachable' };
    }
  }
  return { ok: false, error: 'Claude API unreachable' };
}

interface ContentBlock { type: string; text?: string; id?: string; name?: string; input?: Record<string, unknown> }

/**
 * Run one owner turn of the copilot. Loops through tool calls (bounded) and
 * returns the written answer plus any action proposals. Never throws.
 */
export async function runAssistant(history: AssistantTurn[]): Promise<AssistantResult> {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return mockAssistant(history);

  const messages = seedMessages(history);
  if (messages.length === 0) return { ok: true, reply: 'What would you like help with?', proposals: [] };

  // The owner can extend the baked-in profile without a redeploy: whatever is
  // stored under `assistant_profile` is appended to the permanent system
  // prompt. Best-effort, so a slow or failing store read never blocks an answer.
  let system = SYSTEM;
  try {
    const extra = await getStore().getSetting('assistant_profile');
    if (typeof extra === 'string' && extra.trim()) {
      system = `${SYSTEM}\n\nMORE FROM THE OWNER (added by Jo himself, treat as authoritative about us and his preferences):\n${extra.trim().slice(0, 6000)}`;
    }
  } catch { /* use the baked-in profile alone */ }

  // Who already has an automatic follow-up scheduled (not yet sent). The copilot
  // is told, so in a proactive review it does not surface a customer who is
  // already being chased, the nudge is on its way. Snapshotted once per turn.
  const followupSet = new Set<string>(await getStore().customerIdsWithScheduledFollowup().catch(() => []));

  const proposals: Proposal[] = [];
  const idCounter = { n: 0 };
  // Kept tight so a question resolves in a couple of fast round-trips, not a
  // long chain. Haiku is quick, but every extra step is another network hop.
  const MAX_STEPS = 5;

  for (let step = 0; step < MAX_STEPS; step++) {
    const r = await callApi(key, system, messages);
    if (!r.ok) {
      return { ok: false, reply: `I could not reach the assistant just now (${r.error}). Please try again in a moment.`, proposals };
    }
    const data = r.data as { content?: ContentBlock[]; stop_reason?: string };
    const content = data.content ?? [];
    const toolUses = content.filter((b) => b.type === 'tool_use');

    if (data.stop_reason !== 'tool_use' || toolUses.length === 0) {
      const text = content.filter((b) => b.type === 'text').map((b) => b.text ?? '').join('\n').trim();
      return { ok: true, reply: plainText(stripDashes(text)) || 'Done.', proposals };
    }

    // Record the assistant turn (with its tool_use blocks) verbatim so the
    // follow-up tool_result turn is well-formed.
    messages.push({ role: 'assistant', content });

    const results: unknown[] = [];
    for (const tu of toolUses) {
      const out = PROPOSE_NAMES.has(tu.name ?? '')
        ? await runProposeTool(tu.name!, tu.input ?? {}, proposals, idCounter)
        : await runReadTool(tu.name!, tu.input ?? {}, followupSet);
      results.push({ type: 'tool_result', tool_use_id: tu.id, content: JSON.stringify(out).slice(0, 12000) });
    }
    messages.push({ role: 'user', content: results });
  }

  // Ran out of steps: ask the model for a final written answer with tools off,
  // so a long tool chain still ends in something the owner can read.
  const body = JSON.stringify({ model: MODEL(), max_tokens: 1200, system, messages });
  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST', signal: AbortSignal.timeout(40_000),
      headers: { 'x-api-key': key, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' }, body,
    });
    if (res.ok) {
      const data = await res.json() as { content?: ContentBlock[] };
      const text = (data.content ?? []).filter((b) => b.type === 'text').map((b) => b.text ?? '').join('\n').trim();
      if (text) return { ok: true, reply: plainText(stripDashes(text)), proposals };
    }
  } catch { /* fall through */ }
  return { ok: true, reply: 'I looked into it but ran long. Ask me again, or narrow it to one customer.', proposals };
}

// ---------- deterministic mock (no API key, e.g. tests / local) ----------
function mockAssistant(history: AssistantTurn[]): AssistantResult {
  const last = history.filter((t) => t.role === 'user').at(-1)?.text ?? '';
  return {
    ok: true, mock: true, proposals: [],
    reply: last.trim()
      ? 'The assistant is not connected to a model in this environment, so I cannot look anything up right now. Set ANTHROPIC_API_KEY to enable it.'
      : 'What would you like help with?',
  };
}
