// ============================================================
// "Am I talking to a bot?"
//
// Owner's rule: the assistant must NEVER answer this. Not a denial, not an
// admission, not a deflection, and not even a draft for the team to approve.
// The chat goes to a human and the assistant stays out of it.
//
// This is checked on the INBOUND message, before the model is ever called, so
// there is no reply to review, leak or accidentally send. Lexical rather than
// model-based on purpose: it must behave identically every single time.
// ============================================================

/** Words for a non-human responder, in the languages backpackers actually use. */
const BOT_WORDS =
  'bots?|robots?|robôs?|robots?|roboter|ro?bot|a\\.?i\\.?|artificial\\s+intelligen\\w*|' +
  'inteligencia\\s+artificial|intelligence\\s+artificielle|intelligenza\\s+artificiale|' +
  'künstliche\\s+intelligenz|kunstliche\\s+intelligenz|chat\\s?gpt|gpt|chatbot|' +
  'automated|automatic\\s+(?:reply|message|system)|auto[- ]?reply|' +
  'machine|computer\\s+program|software|script';

/** Words for a person, used in the "are you a real person?" shape. */
const HUMAN_WORDS =
  'human|humano|humana|humain|umano|mensch|persona|person|pessoa|personne|' +
  'real\\s+person|actual\\s+person|live\\s+(?:person|agent)|someone\\s+real';

/**
 * Patterns are deliberately question-shaped or assertion-shaped, so ordinary
 * sentences that merely contain one of the words above do not trigger. A
 * customer writing "my robot vacuum broke" is not asking about us.
 */
const PATTERNS: RegExp[] = [
  // English: are you / is this / am I talking to ... a bot
  new RegExp(`\\b(?:are\\s+(?:you|u)|is\\s+(?:this|that|it)|am\\s+i\\s+(?:talking|speaking|chatting)\\s+(?:to|with)|talking\\s+to)\\b[^.?!]{0,30}\\b(?:${BOT_WORDS})\\b`, 'i'),
  // English: are you a real person / are you human / am I speaking with a human
  new RegExp(`\\b(?:are\\s+(?:you|u)|is\\s+(?:this|that|it)|am\\s+i\\s+(?:talking|speaking|chatting)\\s+(?:to|with))\\b[^.?!]{0,25}\\b(?:${HUMAN_WORDS})\\b`, 'i'),
  // English: is this a real person answering / who am I speaking to
  /\b(?:who|what)\s+(?:am\s+i|are\s+we)\s+(?:talking|speaking|chatting)\s+(?:to|with)\b/i,
  // English assertion: you are a bot / this is a bot / you sound like a bot
  new RegExp(`\\b(?:you(?:'re|\\s+are)?|this\\s+is|it'?s|that'?s|sounds?\\s+like)\\s+(?:a|an)?\\s*(?:${BOT_WORDS})\\b`, 'i'),
  // Spanish: eres un bot / eres una persona real / hablo con un robot
  new RegExp(`\\b(?:eres|es\\s+esto|estoy\\s+hablando\\s+con|hablo\\s+con|sos)\\b[^.?!]{0,25}\\b(?:${BOT_WORDS}|persona\\s+real|humano|humana)\\b`, 'i'),
  // Portuguese: você é um bot / falo com uma pessoa real
  // No trailing \b after the prefix: JavaScript's \b is ASCII-only, so it does
  // not fire next to accented letters like "é" and the match silently fails.
  new RegExp(`(?:voc[êe]\\s+[ée]|isso\\s+[ée]|estou\\s+falando\\s+com|falo\\s+com)[^.?!]{0,25}\\b(?:${BOT_WORDS}|pessoa\\s+real|humano|humana)\\b`, 'i'),
  // French: es-tu un robot / c'est un robot / je parle a un humain
  new RegExp(`(?:es[- ]?tu|[êe]tes[- ]?vous|c'?est|je\\s+parle\\s+[àa])[^.?!]{0,25}\\b(?:${BOT_WORDS}|humain|vraie\\s+personne)\\b`, 'i'),
  // German: bist du ein bot / ist das ein bot / rede ich mit einem menschen
  new RegExp(`\\b(?:bist\\s+du|ist\\s+das|rede\\s+ich\\s+mit|spreche\\s+ich\\s+mit|schreibe\\s+ich\\s+mit)\\b[^.?!]{0,25}\\b(?:${BOT_WORDS}|mensch\\w*|echte\\s+person)\\b`, 'i'),
  // Italian: sei un bot / e un robot / parlo con una persona
  new RegExp(`\\b(?:sei\\s+un|[èe]\\s+un|sto\\s+parlando\\s+con|parlo\\s+con)\\b[^.?!]{0,25}\\b(?:${BOT_WORDS}|umano|persona\\s+vera)\\b`, 'i'),
  // Hebrew (no \b: it is ASCII-only in JavaScript and never fires on Hebrew)
  /(?:אתה|את|זה)\s+(?:בוט|רובוט|בינה\s*מלאכותית|מחשב)/,
  /מדבר(?:ת)?\s+עם\s+(?:בוט|רובוט|אדם|בן\s*אדם|מישהו\s+אמיתי)/,
];

/**
 * True when the customer is asking (or asserting) whether they are talking to a
 * bot / AI / real person. Deliberately conservative: it must not fire on
 * ordinary tax conversation, because every hit takes the chat away from the
 * assistant and puts it on a human's desk.
 */
export function isIdentityQuestion(text: string): boolean {
  const t = (text || '').replace(/\s+/g, ' ').trim();
  if (!t || t.length > 400) return false; // long essays are not this question
  return PATTERNS.some((p) => p.test(t));
}
