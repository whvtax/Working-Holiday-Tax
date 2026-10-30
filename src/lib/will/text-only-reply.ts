// ============================================================
// A voice note, a sticker, or a WhatsApp event Meta could not render (error
// 131051 "Message type unknown") carries nothing Will can read. It used to
// become a handoff whose suggested reply said "send it again as text", for a
// person to click hours later. Will now says it itself, once, in the
// customer's language, and nobody has to touch it (30 Oct).
// ============================================================

/** One short line per language Will speaks. No dash, no mention of what we
 *  are, no promise. */
export const TEXT_ONLY_ASK: Record<string, string> = {
  en: 'Could you send that as a text message?',
  de: 'Könntest du das bitte als Textnachricht schicken?',
  ja: 'テキストメッセージで送っていただけますか？',
  es: '¿Podrías enviarlo como mensaje de texto?',
  fr: 'Tu peux l\'envoyer en message texte ?',
  it: 'Puoi inviarlo come messaggio di testo?',
  pt: 'Podes enviar isso como mensagem de texto?',
};

export function textOnlyAsk(lang?: string | null): string {
  const key = (lang ?? 'en').toLowerCase().slice(0, 2);
  return TEXT_ONLY_ASK[key] ?? TEXT_ONLY_ASK.en;
}

/** Kinds of attachment that carry no readable text. */
const UNREADABLE_MEDIA_KINDS = new Set(['audio', 'voice', 'sticker']);

/** Should this inbound note be answered with the "send it as text" line? Voice
 *  notes and stickers, and a bodiless event Meta marked unsupported / unknown
 *  (including error 131051). Not a deleted message, not a reaction, not a photo
 *  or document (those are read or collected elsewhere). */
export function needsTextOnlyAsk(opts: {
  media?: { kind?: string } | null;
  undecoded?: { type?: string; errorCode?: number | null } | null;
  revoked?: boolean;
  reaction?: boolean;
}): boolean {
  if (opts.revoked || opts.reaction) return false;
  if (opts.media) return UNREADABLE_MEDIA_KINDS.has((opts.media.kind ?? '').toLowerCase());
  const u = opts.undecoded;
  if (!u) return true; // no media, no event detail: the voice note default
  return u.errorCode === 131051 || u.type === 'unsupported' || u.type === 'unknown' || u.type === 'audio' || u.type === 'voice' || u.type === 'sticker';
}
