// ============================================================
// A voice note, a sticker, or a WhatsApp event Meta could not render (error
// 131051 "Message type unknown") carries nothing Will can read. It used to
// become a handoff whose suggested reply said "send it again as text", for a
// person to click hours later. Will now says it itself, once, in the
// customer's language, and nobody has to touch it (30 Oct).
// ============================================================

/** One short line per language Will speaks. No dash, no mention of what we
 *  are, no promise. */
// Jo, 14 Nov: "text message" read as SMS ("Not on WhatsApp?"). Everything
// happens here on WhatsApp, so the ask says "type it here in the chat".
export const TEXT_ONLY_ASK: Record<string, string> = {
  en: 'Could you type that out for me here in the chat?',
  de: 'Könntest du mir das bitte hier im Chat schreiben?',
  ja: 'お手数ですが、こちらのチャットに文字で送っていただけますか？',
  es: '¿Podrías escribírmelo aquí en el chat?',
  fr: 'Tu peux me l\'écrire ici dans le chat ?',
  it: 'Puoi scrivermelo qui in chat?',
  pt: 'Podes escrever isso aqui no chat?',
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
