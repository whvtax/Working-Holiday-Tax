// ============================================================
// Lightweight language handling for the few messages Will sends
// WITHOUT the model (scheduler events like "questionnaire received").
// The live conversational path already replies natively via the model;
// this covers the deterministic auto-messages for the main markets.
// English is always a safe fallback.
// ============================================================

export type Lang = 'en' | 'de' | 'ja' | 'es' | 'fr' | 'it' | 'pt';

// Distinctive keyword lists per language, English included. English used to be
// undetectable (no list), which is why a chat that had drifted to the wrong
// language could never be pulled back: an English message returned "unknown" and
// left the stale wrong language in place. Now English is a first-class signal so
// a real English message can reclaim the conversation.
const KEYWORDS: Record<Exclude<Lang, 'ja'>, RegExp> = {
  en: /\b(the|and|you|your|you're|youre|i'?m|i'?ve|don'?t|doesn'?t|can'?t|won'?t|isn'?t|please|thanks|thank|hello|hey|yeah|will|would|should|what|when|where|why|how|have|has|had|my|ask|friend|need|help|about|okay)\b/gi,
  de: /\b(und|nicht|ich|danke|guten|hallo|kein|bitte|sehr|gerne|für|ist|über|während)\b/gi,
  es: /\b(hola|gracias|por favor|usted|para|pero|cómo|muy|reembolso|impuesto|dónde)\b/gi,
  fr: /\b(bonjour|merci|vous|avec|pour|oui|remboursement|impôt|bonsoir|s'il vous plaît)\b/gi,
  it: /\b(ciao|grazie|prego|sono|molto|rimborso|imposta|dove|perché)\b/gi,
  pt: /\b(olá|obrigad\w*|você|não|imposto|reembolso|por favor|onde|porquê)\b/gi,
};

function countMatches(re: RegExp, t: string): number {
  const m = t.match(re);
  return m ? m.length : 0;
}

/**
 * Best-effort language detection from a customer message.
 *
 * Returns the most likely language AND whether the read is CONFIDENT. Confidence
 * is the whole point: a single stray foreign word ("dove", "para", "sono") must
 * never be enough to claim, or switch, the conversation language. Only a clear
 * signal (Japanese script, or at least two distinctive keyword hits with a lead
 * over every other language) is confident. The caller only ever acts on a
 * confident read, so an ambiguous message leaves the established language alone.
 */
export function detectLanguage(text: string): { lang: Lang | null; confident: boolean } {
  const t = (text || '').trim();
  if (!t) return { lang: null, confident: false };
  if (/[぀-ゟ゠-ヿ]/.test(t)) return { lang: 'ja', confident: true }; // hiragana/katakana

  const scores = (Object.keys(KEYWORDS) as Exclude<Lang, 'ja'>[])
    .map((lang) => [lang, countMatches(KEYWORDS[lang], t)] as [Lang, number])
    .sort((a, b) => b[1] - a[1]);

  const [topLang, topScore] = scores[0];
  const runnerUp = scores[1]?.[1] ?? 0;
  if (topScore === 0) return { lang: null, confident: false };
  return { lang: topLang, confident: topScore >= 2 && topScore > runnerUp };
}

/** "We've received your questionnaire" confirmation, per language. No prices,
 *  no currency, no dashes: passes the policy guard unchanged. */
export const FORM_RECEIVED_MSG: Record<Lang, string> = {
  en: "Perfect, we've received your questionnaire! ✅ We'll now go through everything and get back to you within 24 hours. 😊",
  de: 'Perfekt, wir haben deinen Fragebogen erhalten! ✅ Wir schauen uns jetzt alles an und melden uns innerhalb von 24 Stunden bei dir. 😊',
  ja: 'ありがとうございます、アンケートを受け取りました！✅ これから内容を確認し、24時間以内にご連絡します。😊',
  es: '¡Perfecto, hemos recibido tu cuestionario! ✅ Ahora revisaremos todo y te responderemos en un plazo de 24 horas. 😊',
  fr: 'Parfait, nous avons bien reçu ton questionnaire ! ✅ Nous allons tout examiner et revenir vers toi sous 24 heures. 😊',
  it: 'Perfetto, abbiamo ricevuto il tuo questionario! ✅ Ora controlleremo tutto e ti risponderemo entro 24 ore. 😊',
  pt: 'Perfeito, recebemos o teu questionário! ✅ Vamos analisar tudo e responder dentro de 24 horas. 😊',
};

export function formReceivedMessage(lang?: string | null): string {
  const key = (lang && lang in FORM_RECEIVED_MSG ? lang : 'en') as Lang;
  return FORM_RECEIVED_MSG[key];
}

/** The Library key holding this language's copy of the confirmation above.
 *  Every one of them is seeded (seed.ts), so the scheduler sends the OWNER'S
 *  current wording and the constants here are only a fallback for a store that
 *  cannot be read. Unknown languages fall back to English, same as the message. */
export function formReceivedTemplateKey(lang?: string | null): string {
  const key = (lang && lang in FORM_RECEIVED_MSG ? lang : 'en') as Lang;
  return `form_received_${key}`;
}

/** The Google review request, per language. Sent ONCE, 1 hour after a customer
 *  is marked lodged (scheduler REVIEW_REQUEST job). Two short paragraphs, then
 *  the review link on its own line. No full stop before the 🙏 (Jo, 31 Aug). No
 *  prices, no currency, no dashes: passes the policy guard unchanged. */
const REVIEW_LINK = 'https://maps.app.goo.gl/UnFaHWjv1dTvqrKz8';
export const REVIEW_REQUEST_MSG: Record<Lang, string> = {
  en: `Great, glad everything went smoothly! Thanks so much for trusting me with your tax return. I really appreciate it!\n\nIf you have a minute, I'd really appreciate a short Google review. It would help us a lot 🙏\n\n${REVIEW_LINK}`,
  de: `Super, ich freue mich, dass alles reibungslos geklappt hat! Vielen Dank, dass du mir deine Steuererklärung anvertraut hast. Das weiß ich wirklich zu schätzen!\n\nWenn du eine Minute hast, würde ich mich sehr über eine kurze Google-Bewertung freuen. Das würde uns sehr helfen 🙏\n\n${REVIEW_LINK}`,
  ja: `すべてスムーズに進んでよかったです！確定申告をお任せいただき、本当にありがとうございました。とても感謝しています！\n\nもしよろしければ、Googleに短いレビューをいただけるととても嬉しいです。私たちにとって大きな助けになります 🙏\n\n${REVIEW_LINK}`,
  es: `¡Genial, me alegra que todo haya ido bien! Muchas gracias por confiarme tu declaración de impuestos. ¡Lo aprecio de verdad!\n\nSi tienes un minuto, te agradecería mucho una breve reseña en Google. Nos ayudaría muchísimo 🙏\n\n${REVIEW_LINK}`,
  fr: `Super, je suis ravi que tout se soit bien passé ! Merci beaucoup de m'avoir confié ta déclaration d'impôts. Je l'apprécie vraiment !\n\nSi tu as une minute, un petit avis Google me ferait très plaisir. Ça nous aiderait énormément 🙏\n\n${REVIEW_LINK}`,
  it: `Ottimo, sono felice che sia andato tutto liscio! Grazie mille per avermi affidato la tua dichiarazione dei redditi. Lo apprezzo davvero!\n\nSe hai un minuto, ti sarei molto grato per una breve recensione su Google. Ci aiuterebbe tantissimo 🙏\n\n${REVIEW_LINK}`,
  pt: `Ótimo, fico feliz que tenha corrido tudo bem! Muito obrigado por confiares em mim com a tua declaração de impostos. Agradeço imenso!\n\nSe tiveres um minuto, agradecia muito uma breve avaliação no Google. Ajudaria-nos bastante 🙏\n\n${REVIEW_LINK}`,
};

export function reviewRequestMessage(lang?: string | null): string {
  const key = (lang && lang in REVIEW_REQUEST_MSG ? lang : 'en') as Lang;
  return REVIEW_REQUEST_MSG[key];
}

/** The Library key holding this language's copy of the review request. Seeded
 *  per language (seed.ts); the constant above is the fallback. */
export function reviewRequestTemplateKey(lang?: string | null): string {
  const key = (lang && lang in REVIEW_REQUEST_MSG ? lang : 'en') as Lang;
  return `review_request_${key}`;
}
