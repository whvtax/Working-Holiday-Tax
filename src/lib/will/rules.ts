// ============================================================
// The rules Will is held to — the built-in ones, in plain English, and the
// ones Jo adds himself.
//
// WHY THIS FILE EXISTS
//   policy-guard.ts is the enforcement, and it is written for correctness, not
//   for reading: forty regular expressions with the bypasses they were built to
//   close documented above each one. Nobody should have to read that to answer
//   "what is Will actually not allowed to say?".
//
//   So this is the catalogue. Every built-in rule appears here with the same id
//   the guard reports when it fires, a name, what it stops, and a message it
//   would refuse. The ids are the contract between the two files, and a test
//   pins that neither side can grow a rule the other has never heard of.
//
// ── YOUR OWN RULES ─────────────────────────────────────────────────────────
//   A rule Jo adds is a list of phrases that must never appear in a message to
//   a customer, with a name. Deliberately not a regular expression: a regex box
//   in a dashboard is a way to write, at two in the morning, something that
//   silently blocks every message in the system, and there would be no way to
//   tell that from a rule that simply never matches.
//
//   THE ONE INVARIANT, AND IT IS THE WHOLE SAFETY ARGUMENT:
//   a custom rule can only ever ADD a violation. There is no shape of custom
//   rule — malformed, empty, enormous, contradictory — that can allow a message
//   the built-in rules refuse. Adding rules can therefore only make Will more
//   cautious, never less, and the worst case is messages piling up for approval
//   rather than something wrong reaching a customer.
// ============================================================
// NOTHING IS IMPORTED HERE, AND THAT IS DELIBERATE.
//
// The Rules tab is a client component, and this file is what it reads the
// catalogue from. The moment this imports the store, the browser bundle
// inherits store.ts -> store-file.ts -> `fs`, and the page stops building.
// Reading and writing the stored rules therefore lives in rules-store.ts,
// which is server-side only. Everything here is pure: data, types, and two
// functions over strings.

// ---------- the built-in rules, in plain English ----------

export type RuleGroup = 'money' | 'advice' | 'identity' | 'channel' | 'style' | 'safety';

export interface BuiltInRule {
  /** The code the guard reports in `violations` when this fires. A rule whose
   *  violations carry a value (a price, a rule name) is listed by its stem, so
   *  `FORBIDDEN_AMOUNT:50.00` is found here under `FORBIDDEN_AMOUNT`. */
  id: string;
  group: RuleGroup;
  name: string;
  /** What it stops, in a sentence Jo would say. */
  what: string;
  /** A message this rule would refuse. Real phrasing, so the rule is concrete. */
  example: string;
}

export const RULE_GROUP_LABELS: Record<RuleGroup, string> = {
  money: 'Money',
  advice: 'Tax advice',
  identity: 'Who Will is',
  channel: 'WhatsApp’s own rules',
  style: 'How Will writes',
  safety: 'Safety',
};

export const BUILT_IN_RULES: BuiltInRule[] = [
  // ── Money ────────────────────────────────────────────────────────────────
  {
    id: 'FORBIDDEN_AMOUNT',
    group: 'money',
    name: 'Only your real prices may be named',
    what: 'The only amounts Will may state are $220, $385 and $110 for a phone consultation — and only before the customer has paid. Any other figure is refused, including one written in words, in another currency, or in another alphabet’s digits.',
    example: '“Our special rate for you is one hundred dollars.”',
  },
  {
    id: 'PRICE_NEGOTIATION',
    group: 'money',
    name: 'No discounts, no deals',
    what: 'Will may never offer a discount, a special price, a one-time offer or anything “just for you”. Price is yours to move, not his.',
    example: '“I can do it for 150 if you sign up today.”',
  },
  {
    id: 'NON_DOLLAR_CURRENCY',
    group: 'money',
    name: 'Prices are in Australian dollars only',
    what: 'A price converted into euros, pounds, yen or anything else is refused even when the number is right — a conversion is a promise about an exchange rate nobody made.',
    example: '“That’s about 130 euros.”',
  },
  {
    id: 'SALES_CONTENT_AFTER_PAYMENT',
    group: 'money',
    name: 'No selling after they have paid',
    what: 'Once someone has paid, Will may not mention the fee, the price, a guarantee or being out of pocket again — even using your own approved wording. They already bought.',
    example: '“Remember our guarantee covers the difference.” (to a paid customer)',
  },
  {
    id: 'REFUND_OR_CANCEL_PROMISE',
    group: 'money',
    name: 'Will cannot promise their money back',
    what: 'Refunding what a customer paid you, or cancelling on them, is your decision. Will may not offer either.',
    example: '“No problem, we’ll refund your payment.”',
  },

  // ── Tax advice ───────────────────────────────────────────────────────────
  {
    id: 'TAX_DETERMINATION',
    group: 'advice',
    name: 'Will never rules on someone’s tax',
    what: 'No telling a customer they are a resident or non-resident, that they can claim something, that Medicare applies to them, or what their refund will be — including a hedge like “roughly 3,800”. That call is the tax agent’s, and it is worth more after payment, not less.',
    example: '“Based on your payslips you should get around 3,800 back.”',
  },
  {
    id: 'DIY_INSTRUCTIONS',
    group: 'advice',
    name: 'No do-it-yourself instructions',
    what: 'Will may not walk anyone through lodging their own return. They came to you so they would not have to.',
    example: '“You can just lodge it yourself, here are the steps.”',
  },
  {
    id: 'MYGOV_TROUBLESHOOTING',
    group: 'advice',
    name: 'Never instruct anyone on myGov or the ATO',
    what: 'Will may reassure — “you never need to touch myGov, we handle it” — but may never give a step: no logging in, linking, creating an ID, applying for a Medicare statement. Checked clause by clause, so a reassurance cannot be used to smuggle a walkthrough into the same sentence.',
    example: '“Go to my.gov.au, click Link a service, then enter your TFN.”',
  },

  // ── Who Will is ──────────────────────────────────────────────────────────
  {
    id: 'AI_IDENTITY_ANSWER',
    group: 'identity',
    name: 'Will never answers “are you a bot?”',
    what: 'Not with yes, not with no, not even as a draft you could send with one click. The question hands the chat to you and Will steps out of it. This answer has to be in a person’s own words.',
    example: '“Haha, real person here 😊”',
  },

  // ── WhatsApp’s own rules ─────────────────────────────────────────────────
  {
    id: 'OUTSIDE_24H_WINDOW_NEEDS_TEMPLATE',
    group: 'channel',
    name: 'After 24 hours of silence, only approved templates',
    what: 'This one is WhatsApp’s, not yours. More than 24 hours after the customer’s last message, Meta rejects free text — only a template approved in WhatsApp Manager goes through. It is why every follow-up is a Library message and never something written on the spot.',
    example: 'Any freshly written message to someone who last wrote three days ago.',
  },
  {
    id: 'CUSTOMER_OPTED_OUT',
    group: 'channel',
    name: 'Nothing to someone who opted out',
    what: 'A customer who asked to be left alone is never messaged again by Will, at any stage, for any reason.',
    example: 'Any message at all to a customer who replied “stop”.',
  },
  {
    id: 'AI_PAUSED_FOR_CUSTOMER',
    group: 'channel',
    name: 'Nothing while Will is paused on that chat',
    what: 'Once a chat is handed to a person, Will stays out of it until you let him back in.',
    example: 'Any automatic reply in a chat you have taken over.',
  },
  {
    id: 'LEGACY_CHAT_AI_DISABLED',
    group: 'channel',
    name: 'Will only handles brand-new leads',
    what: 'Imported and previously closed chats are yours. Will never writes into one.',
    example: 'Any reply to a customer who existed before Will did.',
  },
  {
    id: 'KILL_SWITCH_ACTIVE',
    group: 'channel',
    name: 'The kill switch stops everything',
    what: 'When the kill switch is on, no message reaches any customer, from any path — replies, follow-ups, approvals. One switch, no exceptions.',
    example: 'Every outgoing message, while it is on.',
  },

  // ── How Will writes ──────────────────────────────────────────────────────
  {
    id: 'EM_DASH_FORBIDDEN',
    group: 'style',
    name: 'No dashes',
    what: 'Your rule: a long dash reads as written-by-a-machine on WhatsApp. Any of — – ― − in an outgoing message stops it.',
    example: '“Sure — I’ll check that for you.”',
  },
  {
    id: 'REPLY_TOO_LONG',
    group: 'style',
    name: 'Replies stay short',
    what: 'Will’s own wording is capped at about 450 characters. Your approved messages are not counted, however long they are — this only catches a reply that has turned into an essay.',
    example: 'A four-paragraph explanation of residency rules.',
  },

  // ── Safety ───────────────────────────────────────────────────────────────
  {
    id: 'PLACEHOLDER_LEFTOVER',
    group: 'safety',
    name: 'No unfilled placeholders',
    what: 'A message still containing {{SOMETHING}} never sends. The customer would see the machinery.',
    example: '“Hi {{FIRST_NAME}}, your return is ready.”',
  },
  {
    id: 'PROMPT_ECHO',
    group: 'safety',
    name: 'Will never quotes his own instructions',
    what: 'If a reply starts repeating the rules Will was given — the master rules, the approved messages, the system prompt — it is stopped. That is a customer trying to get Will to show his workings.',
    example: '“My operating rules say I cannot state a price.”',
  },
  {
    id: 'SENSITIVE_CONTENT',
    group: 'safety',
    name: 'No passwords, keys or credentials',
    what: 'Any message containing a password, an API key, an access token or admin credentials is refused outright.',
    example: '“The admin password is …”',
  },
  {
    id: 'CUSTOM_RULE',
    group: 'safety',
    name: 'Your own rules',
    what: 'Every rule you add below. Will refuses any message containing one of your phrases, exactly as if it were built in.',
    example: 'Whatever you tell it never to say.',
  },
];

/** The catalogue keyed by id, for looking up a violation code the guard reported. */
export const RULE_BY_ID = new Map(BUILT_IN_RULES.map((r) => [r.id, r]));

/** `FORBIDDEN_AMOUNT:50.00` and `CUSTOM_RULE:Never mention crypto` both carry a
 *  value after the colon. The catalogue is keyed by the stem. */
export const ruleIdOf = (violation: string) => violation.split(':')[0];

/** Explain a violation code the guard reported, or null when it is not a rule
 *  this catalogue knows — which a test makes sure cannot happen. */
export const explainViolation = (violation: string) => RULE_BY_ID.get(ruleIdOf(violation)) ?? null;

// ---------- the rules Jo adds ----------

export interface CustomRule {
  id: string;
  /** What Jo calls it. Shown in the task when the rule fires. */
  label: string;
  /** Phrases that must never appear in a message to a customer. */
  phrases: string[];
  enabled: boolean;
  createdAt: string;
}

/** Where the list lives. A setting rather than a table on purpose: it is a
 *  short list read on every send, it belongs to the business rather than to any
 *  customer, and it needs no migration to exist. */
export const CUSTOM_RULES_KEY = 'custom_rules';

export const MAX_CUSTOM_RULES = 40;
export const MAX_PHRASES_PER_RULE = 20;
export const MAX_PHRASE_LENGTH = 120;
/** A one- or two-character phrase would match inside ordinary words and block
 *  everything. The shortest thing worth banning is a short word. */
export const MIN_PHRASE_LENGTH = 3;

/**
 * Read whatever is stored and return only what is definitely a usable rule.
 *
 * Written to be paranoid rather than strict: this runs on the send path, and a
 * setting that has been hand-edited into something odd must degrade to "fewer
 * rules", never to a throw that stops Will replying to anybody. Anything
 * unrecognisable is dropped silently and the rest still apply.
 */
export function parseCustomRules(raw: unknown): CustomRule[] {
  if (!Array.isArray(raw)) return [];
  const out: CustomRule[] = [];
  for (const item of raw.slice(0, MAX_CUSTOM_RULES)) {
    if (!item || typeof item !== 'object') continue;
    const r = item as Record<string, unknown>;
    const id = typeof r.id === 'string' && r.id.trim() ? r.id.trim() : null;
    const label = typeof r.label === 'string' && r.label.trim() ? r.label.trim().slice(0, 80) : null;
    if (!id || !label) continue;
    const phrases = Array.isArray(r.phrases)
      ? r.phrases
        .filter((p): p is string => typeof p === 'string')
        .map((p) => p.trim())
        .filter((p) => p.length >= MIN_PHRASE_LENGTH)
        .map((p) => p.slice(0, MAX_PHRASE_LENGTH))
        .slice(0, MAX_PHRASES_PER_RULE)
      : [];
    // A rule with no usable phrase can never match. Keeping it would put a row
    // on the screen that looks like it is protecting something and is not.
    if (phrases.length === 0) continue;
    out.push({
      id,
      label,
      phrases,
      enabled: r.enabled !== false, // absent means on
      createdAt: typeof r.createdAt === 'string' ? r.createdAt : new Date(0).toISOString(),
    });
  }
  return out;
}

/**
 * Which enabled rules this text breaks.
 *
 * Matching is a case-insensitive substring, with one refinement: when the
 * phrase begins and ends with a word character, it must land on word
 * boundaries. Without that, banning "fee" also blocks "coffee" and "feel", and
 * the rule would look broken rather than broad. A phrase containing spaces or
 * punctuation is matched as written.
 *
 * Returns labels, not ids: the label is what Jo wrote and what he will read in
 * the task, and an id in a violation string helps nobody.
 */
export function brokenRules(text: string, rules: CustomRule[]): string[] {
  const hit: string[] = [];
  for (const rule of rules) {
    if (!rule.enabled) continue;
    if (rule.phrases.some((p) => phraseAppears(text, p))) hit.push(rule.label);
  }
  return hit;
}

function phraseAppears(text: string, phrase: string): boolean {
  const p = phrase.trim();
  if (p.length < MIN_PHRASE_LENGTH) return false;
  const wordish = /^\w/.test(p) && /\w$/.test(p);
  if (!wordish) return text.toLowerCase().includes(p.toLowerCase());
  const escaped = p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  try {
    return new RegExp(`\\b${escaped}\\b`, 'i').test(text);
  } catch {
    // An escaped literal cannot fail to compile, but this runs on the send path
    // and a thrown RegExp here would stop a reply. Fall back to the plain test.
    return text.toLowerCase().includes(p.toLowerCase());
  }
}
