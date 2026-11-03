// ============================================================
// The win-back decision: the prompt, the tool and the validator (Jo, 25 Oct).
// Pure, so it can be tested without a model and imported by claude.ts and
// winback-auto.ts without a cycle.
// ============================================================
import { stripDashes } from './text';
import { AGENT_PHRASES } from './approved-messages';
import { policyGuard } from './policy-guard';

export interface WinbackDecision {
  decision: 'never' | 'send';
  /** One sentence for Jo: why. */
  reason: string;
  /** The personal paragraph for {{2}} of winback_<lang>. Null for 'never'. */
  message: string | null;
  confidence: number;
}

/** Meta: a template parameter may not hold a line break, a tab or more than
 *  four spaces in a row. Kept well under Meta's limit so the whole message
 *  stays short on a phone. */
export const WINBACK_MESSAGE_MAX = 150;

export const WINBACK_SYSTEM = `You are Will, on the team at Working Holiday Tax, an Australian service that prepares and lodges tax returns for working holiday makers (backpackers). The fee is fixed: $220 for a TFN-only return, $385 with ABN income. Returns are prepared fully online, from anywhere.

You are reading ONE whole conversation with a lead that ended without them paying, about a month ago. Decide one thing: is there a real chance they would still use us? If yes, write the one message we send them.

DECISION "never" when the conversation shows they will not become a paying customer:
- they lodged this year's return themselves or with someone else, or already got it sorted;
- they asked us to stop, or were hostile or abusive;
- they were never a customer: a supplier pitching us, a job applicant, a wrong number, spam, a partner or friend only passing on details;
- there is nothing for us to lodge (no Australian income, not their tax year);
- they said a clear, final no and gave a reason that has not changed.
DECISION "send" otherwise. Silence is not a no: someone who went quiet after the price, was busy, wanted to think about it, wanted the refund figure first, was unsure about trust, or said "later" is a "send".

THE MESSAGE (only for "send"). It goes inside a fixed WhatsApp frame: before it "Hi {name}, it's the team at Working Holiday Tax 😊", after it "Just reply here and we'll pick it up." So write NO greeting, NO name, NO sign-off and NO "reply here".
- VERY short (Jo, 3 Nov: the old ones were far too long): ONE or TWO short sentences, no line breaks, at most ${WINBACK_MESSAGE_MAX} characters, so the whole WhatsApp message with its frame is about five lines. No value pitch, no explanation, no recap of what they said before.
- In the language they wrote in.
- Pick up exactly where their conversation stopped, so they can tell it was written for them ("Last time you were checking whether you had ABN income...", "You mentioned you'd sort it after payday..."). Use only facts from the conversation.
- Low pressure and easy to answer: end with ONE simple question they can answer in a few words ("Did you manage to get your return sorted in the end?", "Would you still like us to take care of it?").
- Do not sell: no value clause, no mention of the review or the tax agent.
- If they had a specific worry (the price, trust, timing, wanting the refund figure first), answer it gently in one clause with an honest fact (the fee is fixed; the review is what shows what applies to them). Never argue, and never repeat the argument they already turned down (if they refused to pay first, do not push paying first again; just ask if they would like to pick it up).
- Say only what THEY said. Never claim they were ready, wanted to go ahead, decided or agreed to anything unless their own words say so. Describe what happened neutrally ("you asked about the ABN price", "we sent the price over"), never as an intention of theirs.
- Mention a tax agent only with one of these exact phrases, in the language you write in, and never any other wording for it (never 税理士, Steuerberater, "registered agent", or "we are a registered tax agent"). Supervision phrase: en "${AGENT_PHRASES.supervision.en}", de "${AGENT_PHRASES.supervision.de}", ja "${AGENT_PHRASES.supervision.ja}". Signed-off phrase: en "${AGENT_PHRASES.signedOff.en}", de "${AGENT_PHRASES.signedOff.de}", ja "${AGENT_PHRASES.signedOff.ja}". Often it is better to leave the tax agent out of the message.
- Never say or imply anything about their visa, residency, tax residency, the tax-free threshold, Working Holiday Maker status or what they qualify for. Do not promise what will be claimed, covered or supported.
- If an earlier message from the team promised anything about superannuation or its timing, do not repeat it and do not mention super at all.
- Curiosity and helpfulness. Never guilt, urgency, "last chance", or fake scarcity.
- NEVER: a discount, a price or any dollar amount, a refund figure or promise, the refund guarantee, superannuation / super / pension / DASP (we do not offer it), a deadline or a date to beat, \"given up\" or \"gave up\" wording, a link, bank details, anything about AI or bots, an em dash or en dash, more than one emoji.

Return "reason": one plain sentence for the owner explaining the decision.`;

export const WINBACK_TOOL = {
  name: 'winback_decision',
  description: 'Record the win-back decision for this lead.',
  input_schema: {
    type: 'object',
    properties: {
      decision: { type: 'string', enum: ['never', 'send'] },
      reason: { type: 'string', description: 'One plain sentence for the owner: why.' },
      message: { type: 'string', description: 'Only for "send": the one personal paragraph, no greeting, no sign-off, no line breaks.' },
      confidence: { type: 'number', minimum: 0, maximum: 1 },
    },
    required: ['decision', 'reason', 'confidence'],
  },
} as const;

const FORBIDDEN = [
  /\b(?:super|superannuation|pension|dasp|rente|年金)\b|スーパーアニュエーション|年金/i,
  /\bBSB\b|\b0?62\s?692\b|81049952/i,
  /https?:\/\/|www\.|\.com\b|\.au\b/i,
  /\$\s?\d|\b\d+\s?(?:dollars?|aud|euros?)\b|\d+\s?ドル/i,
  /\bdiscount|\b\d+\s?%|rabatt|割引/i,
  /\b(?:bot|chatbot|ai|a\.i\.)\b|\bKI\b/,
  /guarantee|refund the difference|garantie|保証/i,
];
const GREETING = /^(?:hi|hey|hello|hallo|hej|salut|ciao|hola|こんにちは)\b/i;

// No deadline pressure in a win-back, ever (Jo, 25 Oct, point 7).
const DEADLINE_RE = /31\s*(?:st\s*)?(?:of\s+)?oct|october\s*31|31\.\s*oktober|10月31日|deadline|frist|締切|期限/i;

// 3 Nov (72h export): the personal line sits in a template parameter, so the
// policy guard never saw it. These are the checks it would apply, plus the
// wording that went wrong in the export. All of them reject, none repair.
const AGENT_MENTION = /tax\s+agent|registered\s+agent|tax\s+practitioner|タックスエージェント|税理士|税務代理|steuerberater|steuer-?agent|steuerbevollm[äa]chtigt|agente\s+(?:fiscal|tributario|de\s+impuestos)|agent\s+fiscal|comptable\s+agr[ée]/i;
const RESIDENCY = /\bresiden(?:t|cy|ce|ts)\b|non-?resident|tax[- ]free\s+threshold|working\s+holiday\s+mak|\bWHM\b|\b417\b|\b462\b|ans[äa]ssig|steuerlich\s+(?:ans|ans[äa]ssig)|steuerfreibetrag|居住者|非居住|課税最低|免税枠|ワーキングホリデーメーカー|visa\s+status/i;
const INTENT_CLAIM = /ready\s+to\s+(?:go\s+ahead|proceed|start|lodge)|(?:decided|wanted|agreed)\s+to\s+(?:go\s+ahead|proceed)|given\s+up|gave\s+up|aufgegeben|諦め/i;
const REFUND_PROMISE = /every\s+dollar|maximi[sz]e|get\s+(?:back\s+)?(?:all|every)|you(?:'re|\s+are)\s+owed|you(?:'ll|\s+will)\s+(?:get|receive)|r[üu]ckerstattung\s+(?:zu\s+)?maximier|還付(?:金)?を最大|can'?t\s+lose/i;
const GUARD_GATES = new Set(['KILL_SWITCH_ACTIVE', 'AI_PAUSED_FOR_CUSTOMER', 'CUSTOMER_OPTED_OUT', 'LEGACY_CHAT_AI_DISABLED', 'OUTSIDE_24H_WINDOW_NEEDS_TEMPLATE']);

/** Why this personal paragraph may not go out, or null when it may. Used when
 *  the model answers and again at the moment of sending (a stored paragraph
 *  may predate a rule). */
export function winbackHookProblem(message: string): string | null {
  if (!message) return 'empty';
  if (FORBIDDEN.some((re) => re.test(message))) return 'forbidden term';
  if (DEADLINE_RE.test(message)) return 'deadline';
  if (GREETING.test(message)) return 'greeting';
  const approved = [...Object.values(AGENT_PHRASES.supervision), ...Object.values(AGENT_PHRASES.signedOff)];
  let rest = message;
  for (const a of approved) rest = rest.split(a).join(' ');
  if (AGENT_MENTION.test(rest)) return 'agent wording not in the approved phrases';
  if (RESIDENCY.test(message)) return 'residency or visa wording';
  if (INTENT_CLAIM.test(message)) return 'claims an intention the customer never stated';
  if (REFUND_PROMISE.test(message)) return 'refund promise';
  try {
    const g = policyGuard(message, {
      state: 'NOT_INTERESTED', paid: false, aiPaused: false, killSwitch: false, optedOut: false, isLegacy: false,
      lastCustomerMsgAt: null, isApprovedTemplate: true, estimateFromTeam: null,
    });
    const hit = g.violations.filter((v) => !GUARD_GATES.has(v));
    if (hit.length) return `policy guard: ${hit.join(', ')}`;
  } catch { /* the guard must never be the reason a decision crashes */ }
  return null;
}

/** Never trust the shape; an unusable answer is rejected, not repaired. */
export function validateWinbackDecision(raw: unknown): WinbackDecision | null {
  if (!raw || typeof raw !== 'object') return null;
  const d = raw as Record<string, unknown>;
  if (d.decision !== 'never' && d.decision !== 'send') return null;
  if (typeof d.reason !== 'string' || !d.reason.trim()) return null;
  const confidence = typeof d.confidence === 'number' && d.confidence >= 0 && d.confidence <= 1 ? d.confidence : null;
  if (confidence == null) return null;
  const reason = stripDashes(d.reason.trim().replace(/\s+/g, ' ')).slice(0, 300);
  if (d.decision === 'never') return { decision: 'never', reason, message: null, confidence };

  if (typeof d.message !== 'string') return null;
  const message = stripDashes(d.message.replace(/[\r\n\t]+/g, ' ').replace(/ {2,}/g, ' ').trim());
  if (message.length < 20 || message.length > WINBACK_MESSAGE_MAX) return null;
  if (/\{\{|\}\}/.test(message)) return null;
  if (winbackHookProblem(message)) return null;
  return { decision: 'send', reason, message, confidence };
}
