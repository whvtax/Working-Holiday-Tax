// ============================================================
// The win-back decision: the prompt, the tool and the validator (Jo, 25 Oct).
// Pure, so it can be tested without a model and imported by claude.ts and
// winback-auto.ts without a cycle.
// ============================================================
import { stripDashes } from './text';

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
export const WINBACK_MESSAGE_MAX = 360;

export const WINBACK_SYSTEM = `You are Will, on the team at Working Holiday Tax, an Australian service that prepares and lodges tax returns for working holiday makers (backpackers). The fee is fixed: $220 for a TFN-only return, $385 with ABN income. Returns are reviewed and signed off under a registered tax agent, fully online, from anywhere.

You are reading ONE whole conversation with a lead that ended without them paying, about a month ago. Decide one thing: is there a real chance they would still use us? If yes, write the one message we send them.

DECISION "never" when the conversation shows they will not become a paying customer:
- they lodged this year's return themselves or with someone else, or already got it sorted;
- they asked us to stop, or were hostile or abusive;
- they were never a customer: a supplier pitching us, a job applicant, a wrong number, spam, a partner or friend only passing on details;
- there is nothing for us to lodge (no Australian income, not their tax year);
- they said a clear, final no and gave a reason that has not changed.
DECISION "send" otherwise. Silence is not a no: someone who went quiet after the price, was busy, wanted to think about it, wanted the refund figure first, was unsure about trust, or said "later" is a "send".

THE MESSAGE (only for "send"). It goes inside a fixed WhatsApp frame: before it "Hi {name}, it's the team at Working Holiday Tax 😊", after it "Just reply here and we'll pick it up." So write NO greeting, NO name, NO sign-off and NO "reply here".
- ONE short paragraph, no line breaks, two or three short sentences, at most ${WINBACK_MESSAGE_MAX} characters.
- In the language they wrote in.
- Pick up exactly where their conversation stopped, so they can tell it was written for them ("Last time you were checking whether you had ABN income...", "You mentioned you'd sort it after payday..."). Use only facts from the conversation.
- Low pressure and easy to answer: end with ONE simple question they can answer in a few words ("Did you manage to get your return sorted in the end?", "Would you still like us to take care of it?").
- Show the value in their terms in at most one clause: a professional review so nothing they are entitled to is missed, done fully online from wherever they are.
- If they had a specific worry (the price, trust, timing, wanting the refund figure first), answer it gently in one clause with an honest fact (the fee is fixed; a registered tax agent signs off every return; the review is what shows exactly what they are entitled to). Never argue.
- Curiosity and helpfulness. Never guilt, urgency, "last chance", or fake scarcity.
- NEVER: a discount, a price or any dollar amount, a refund figure or promise, the refund guarantee, superannuation / super / pension / DASP (we do not offer it), a deadline or a date to beat, a link, bank details, anything about AI or bots, an em dash or en dash, more than one emoji.

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
  if (GREETING.test(message)) return null;
  if (FORBIDDEN.some((re) => re.test(message))) return null;
  if (DEADLINE_RE.test(message)) return null;
  if (/\{\{|\}\}/.test(message)) return null;
  return { decision: 'send', reason, message, confidence };
}
