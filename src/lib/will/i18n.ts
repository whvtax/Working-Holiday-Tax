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

/** "We've received your questionnaire" confirmation, per language (Jo's
 *  wording, 3 Sep: two lines, one emoji, "soon" rather than a 24-hour promise).
 *  No prices, no currency, no dashes: passes the policy guard unchanged. */
export const FORM_RECEIVED_MSG: Record<Lang, string> = {
  en: "Great, we've received your questionnaire! ✅\nWe'll now go through everything and get back to you soon.",
  de: 'Super, wir haben deinen Fragebogen erhalten! ✅\nWir gehen jetzt alles durch und melden uns bald bei dir.',
  ja: 'ありがとうございます、アンケートを受け取りました！✅\nこれから内容をすべて確認し、近日中にご連絡します。',
  es: '¡Genial, hemos recibido tu cuestionario! ✅\nAhora revisaremos todo y te responderemos pronto.',
  fr: 'Super, nous avons bien reçu ton questionnaire ! ✅\nNous allons tout examiner et revenir vers toi bientôt.',
  it: 'Ottimo, abbiamo ricevuto il tuo questionario! ✅\nOra controlleremo tutto e ti risponderemo a breve.',
  pt: 'Ótimo, recebemos o teu questionário! ✅\nVamos analisar tudo e responder em breve.',
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
 *  is marked lodged (scheduler REVIEW_REQUEST job), as FREE TEXT on purpose:
 *  it follows the lodged confirmation by an hour, so Jo keeps it out of Meta's
 *  template library (Jo, 3 Sep). Three lines, no blank line between them, "we"
 *  not "I", and the review link on the line straight after the 🙏, exactly as
 *  Jo laid it out (evening version, shorter).
 *  No prices, no currency, no dashes: passes the policy guard unchanged. */
const REVIEW_LINK = 'https://maps.app.goo.gl/UnFaHWjv1dTvqrKz8';
export const REVIEW_REQUEST_MSG: Record<Lang, string> = {
  en: `Thank you so much for trusting us with your tax return!\nIf you have a minute, we'd really appreciate a quick Google review 🙏\n${REVIEW_LINK}`,
  de: `Vielen Dank, dass du uns deine Steuererklärung anvertraut hast!\nWenn du eine Minute hast, würden wir uns sehr über eine kurze Google-Bewertung freuen 🙏\n${REVIEW_LINK}`,
  ja: `確定申告をお任せいただき、本当にありがとうございました！\nもしよろしければ、Googleに簡単なレビューをいただけると嬉しいです 🙏\n${REVIEW_LINK}`,
  es: `¡Muchas gracias por confiarnos tu declaración de impuestos!\nSi tienes un minuto, te agradeceríamos mucho una breve reseña en Google 🙏\n${REVIEW_LINK}`,
  fr: `Merci beaucoup de nous avoir confié ta déclaration d'impôts !\nSi tu as une minute, un petit avis Google nous ferait très plaisir 🙏\n${REVIEW_LINK}`,
  it: `Grazie mille per averci affidato la tua dichiarazione dei redditi!\nSe hai un minuto, ti saremmo molto grati per una breve recensione su Google 🙏\n${REVIEW_LINK}`,
  pt: `Muito obrigado por confiares em nós com a tua declaração de impostos!\nSe tiveres um minuto, agradecíamos muito uma breve avaliação no Google 🙏\n${REVIEW_LINK}`,
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

/** Objection #7 ("that's something we check as part of the review"), per
 *  language. This is the SAFE ANSWER to any pre-payment question that invites
 *  a personal tax determination (residency, Medicare, deductions, "will I get
 *  money back?"). When the model's own draft slips into advice and the guard
 *  stops it, the engine sends this instead of opening a task (Jo, 3 Sep: the
 *  Kay case, "so you think there is a big chance I will get money back?").
 *  English is the approved wording verbatim; the others are faithful
 *  renderings, no prices, no figures, no dashes, guard-clean. */
export const PROFESSIONAL_QUESTION_MSG: Record<Lang, string> = {
  en: "That's definitely something we can check for you. It depends on your individual situation, so we'd need to review your details properly before giving you an accurate answer. That's all included as part of the service once we get started.",
  de: 'Das können wir auf jeden Fall für dich prüfen. Es hängt von deiner individuellen Situation ab, deshalb müssen wir deine Angaben erst richtig durchgehen, bevor wir dir eine genaue Antwort geben können. Das ist alles Teil des Service, sobald wir loslegen.',
  ja: 'それはもちろん確認できます。個々の状況によって異なるため、正確なお答えをするには、まずお客様の詳細をきちんと確認する必要があります。それはすべて、開始後のサービスに含まれています。',
  es: 'Eso es algo que sin duda podemos revisar por ti. Depende de tu situación individual, así que necesitamos revisar bien tus datos antes de darte una respuesta precisa. Todo eso está incluido en el servicio una vez que empecemos.',
  fr: "C'est tout à fait quelque chose que nous pouvons vérifier pour toi. Cela dépend de ta situation personnelle, donc nous devons d'abord examiner tes informations correctement avant de te donner une réponse précise. Tout cela fait partie du service une fois que nous commençons.",
  it: 'È sicuramente qualcosa che possiamo verificare per te. Dipende dalla tua situazione individuale, quindi dobbiamo prima esaminare bene i tuoi dati prima di darti una risposta precisa. È tutto incluso nel servizio una volta che iniziamo.',
  pt: 'Isso é algo que podemos verificar para ti, sem dúvida. Depende da tua situação individual, por isso precisamos de analisar bem os teus dados antes de te dar uma resposta exata. Está tudo incluído no serviço assim que começarmos.',
};

export function professionalQuestionMessage(lang?: string | null): string {
  const key = (lang && lang in PROFESSIONAL_QUESTION_MSG ? lang : 'en') as Lang;
  return PROFESSIONAL_QUESTION_MSG[key];
}

/** The three ABN questions sent right after the questionnaire confirmation to
 *  a TFN + ABN customer, per language (Jo's English wording, 3 Sep; the others
 *  are faithful renderings). English lives under the Library key `req_abn`
 *  (the key Jo already knows), the others under req_abn_<lang>. Same Meta
 *  template names when he creates them. No prices, no dashes, one bullet style. */
export const REQUEST_ABN_MSG: Record<Lang, string> = {
  en: 'A few quick questions about your ABN income:\n\n• What type of work did you do?\n• Do you have any invoices or records of your ABN income?\n• Did you have any work-related expenses that you can provide proof of payment for?',
  de: 'Ein paar kurze Fragen zu deinem ABN-Einkommen:\n\n• Welche Art von Arbeit hast du gemacht?\n• Hast du Rechnungen oder Aufzeichnungen über dein ABN-Einkommen?\n• Hattest du berufliche Ausgaben, für die du Zahlungsbelege vorlegen kannst?',
  ja: 'ABN収入についていくつか簡単な質問があります：\n\n• どのような仕事をしましたか？\n• ABN収入の請求書や記録はありますか？\n• 支払いの証明を提出できる仕事関連の経費はありましたか？',
  es: 'Unas preguntas rápidas sobre tus ingresos con ABN:\n\n• ¿Qué tipo de trabajo hiciste?\n• ¿Tienes facturas o registros de tus ingresos con ABN?\n• ¿Tuviste gastos relacionados con el trabajo de los que puedas aportar comprobante de pago?',
  fr: "Quelques questions rapides sur tes revenus ABN :\n\n• Quel type de travail as-tu fait ?\n• As-tu des factures ou des relevés de tes revenus ABN ?\n• As-tu eu des dépenses liées au travail pour lesquelles tu peux fournir une preuve de paiement ?",
  it: 'Qualche domanda veloce sul tuo reddito ABN:\n\n• Che tipo di lavoro hai svolto?\n• Hai fatture o registrazioni del tuo reddito ABN?\n• Hai avuto spese legate al lavoro per cui puoi fornire una prova di pagamento?',
  pt: 'Algumas perguntas rápidas sobre o teu rendimento com ABN:\n\n• Que tipo de trabalho fizeste?\n• Tens faturas ou registos do teu rendimento com ABN?\n• Tiveste despesas relacionadas com o trabalho para as quais possas apresentar comprovativo de pagamento?',
};

export function requestAbnMessage(lang?: string | null): string {
  const key = (lang && lang in REQUEST_ABN_MSG ? lang : 'en') as Lang;
  return REQUEST_ABN_MSG[key];
}

/** Library key (and Meta template name) for this language's ABN questions:
 *  `req_abn` for English, `req_abn_<lang>` for the rest. */
export function requestAbnTemplateKey(lang?: string | null): string {
  const key = (lang && lang in REQUEST_ABN_MSG ? lang : 'en') as Lang;
  return key === 'en' ? 'req_abn' : `req_abn_${key}`;
}
