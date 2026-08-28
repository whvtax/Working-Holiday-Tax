// ============================================================
// "Nobody has answered me and I wrote you an essay."
//
// THE PROBLEM (Hannah, +61 431 681 318, 28 Aug 17:41). She wrote eight
// paragraphs: an overdue 2019-20 return, two employers she could not identify,
// advice the ATO gave her in 2020, and one direct question about the fee. Will
// read all of it, wrote a good reply, and correctly refused to send it, because
// the one thing she asked for is a price that only Jo can set.
//
// So the draft sat waiting for approval and she sat looking at a silent screen.
// The longer and more careful the message somebody writes, the worse that
// silence reads: they have just spent ten minutes explaining themselves and
// cannot tell whether it arrived, whether anyone read it, or whether they wrote
// to the wrong company.
//
// THE RULE JO CHOSE (28 Aug). If he has not answered within thirty minutes, the
// approved holding line goes out on its own. Only for the long, complicated
// messages, and only on Autopilot: in Approval mode nothing is ever sent
// without him, which is the whole point of that mode.
//
// WHY A THRESHOLD AND NOT A MODEL CALL. This decides whether to send a message
// to a customer, so it has to be predictable, explainable and testable. The
// model already had its say when it chose to hand off; this only asks a much
// smaller question: was this a big message?
// ============================================================

/** Substantial enough that silence is conspicuous. Hannah's was about 2,100. */
const MIN_CHARS = 400;
/** Someone who set out their situation in parts, rather than typing one line. */
const MIN_PARAGRAPHS = 3;
/** A shorter message can still be complicated: several questions in one go. */
const MIN_CHARS_IF_MULTI_QUESTION = 250;
const MIN_QUESTIONS = 2;

/**
 * Was this a long, complicated message?
 *
 * Deliberately answers "no" to anything borderline. A false yes sends a real
 * customer a holding line they did not need; that is a small cost, but it is
 * paid every time, and a chat full of unnecessary "let me look into that" is
 * how an assistant starts to feel automated.
 */
export function isLongComplicatedMessage(text: string | null | undefined): boolean {
  const body = (text ?? '').trim();
  if (!body) return false;

  // Attachments and the stand-ins written for them are not somebody writing an
  // essay, whatever their length. A burst of twelve photos must never look like
  // a carefully worded question.
  if (/^\s*[📷🎥🎤📄💟📍👤📎]\s*\[/.test(body)) return false;

  const paragraphs = body.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
  const questions = (body.match(/\?/g) ?? []).length;

  if (body.length >= MIN_CHARS && paragraphs.length >= MIN_PARAGRAPHS) return true;
  if (body.length >= MIN_CHARS_IF_MULTI_QUESTION && questions >= MIN_QUESTIONS) return true;
  return false;
}

/** How long the owner gets to answer it himself before the holding line goes. */
export const HANDOFF_ACK_DELAY_MS = 30 * 60 * 1000;
