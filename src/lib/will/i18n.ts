// ============================================================
// Lightweight language handling for the few messages Will sends
// WITHOUT the model (scheduler events like "questionnaire received").
// The live conversational path already replies natively via the model;
// this covers the deterministic auto-messages for the main markets.
// English is always a safe fallback.
// ============================================================

export type Lang = 'en' | 'de' | 'ja' | 'es' | 'fr' | 'it' | 'pt';
/** The seven codes a chat can be locked to, for the owner's language picker
 *  and the set_lang action (audit, 5 Sep). Same set as `Lang`, nothing new. */
export const LANGS: readonly Lang[] = ['en', 'de', 'ja', 'es', 'fr', 'it', 'pt'];

// Distinctive keyword lists per language, English included. English used to be
// undetectable (no list), which is why a chat that had drifted to the wrong
// language could never be pulled back: an English message returned "unknown" and
// left the stale wrong language in place. Now English is a first-class signal so
// a real English message can reclaim the conversation.
// The lists were thin for the Latin languages, so a normal Spanish, Portuguese
// or Italian opening message scored 0 or 1 and the customer stayed lang=null:
// every deterministic message they later received (questionnaire confirmation,
// ABN questions, review request, the "we check that in the review" answer) went
// out in English (audit, 4 Sep). These add the words those messages are
// actually made of. Accented forms are matched with lookarounds, not \b, which
// is ASCII-only in JavaScript and never fires next to á, ç, ê or ñ.
const W = (words: string) => new RegExp(`(?<![A-Za-zÀ-ÿ])(?:${words})(?![A-Za-zÀ-ÿ])`, 'gi');
const KEYWORDS: Record<Exclude<Lang, 'ja'>, RegExp> = {
  en: /\b(the|and|you|your|you're|youre|i'?m|i'?ve|don'?t|doesn'?t|can'?t|won'?t|isn'?t|please|thanks|thank|hello|hey|yeah|will|would|should|what|when|where|why|how|have|has|had|my|ask|friend|need|help|about|okay)\b/gi,
  de: W("und|nicht|ich|mich|mir|dein\\w*|mein\\w*|danke|guten|hallo|servus|kein\\w*|bitte|sehr|gerne|für|ist|sind|habe|hab|haben|kann|können|möchte|würde|wie|was|wann|wo|warum|über|während|steuer\\w*|rückerstattung|frage"),
  es: W("hola|buenas|gracias|por favor|usted|ustedes|para|pero|como|cómo|muy|reembolso|impuesto\\w*|donde|dónde|cuando|cuándo|que|qué|quiero|necesito|tengo|puedo|hacer|mi|una|los|las|del|declaración|devolución|pregunta"),
  fr: W("bonjour|salut|merci|vous|tu|avec|pour|oui|non|remboursement|impôt\\w*|bonsoir|s'il vous plaît|je|j'ai|est|sont|comment|quand|où|pourquoi|mon|ma|une|des|déclaration|question|voudrais|besoin"),
  it: W("ciao|buongiorno|grazie|prego|sono|molto|rimborso|imposta|tasse|dove|perche|perché|come|quando|vorrei|ho|posso|mio|mia|una|dei|dichiarazione|domanda|bisogno"),
  pt: W("ola|olá|bom dia|obrigad\\w*|voce|você|nao|não|imposto\\w*|reembolso|por favor|onde|porque|porquê|como|quando|quero|preciso|tenho|posso|meu|minha|uma|dos|declaração|pergunta|gostaria"),
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
export function detectLanguage(text: string): { lang: Lang | null; confident: boolean; enoughToSet?: boolean } {
  const t = (text || '').trim();
  if (!t) return { lang: null, confident: false };
  if (/[぀-ゟ゠-ヿ]/.test(t)) return { lang: 'ja', confident: true, enoughToSet: true }; // hiragana/katakana

  const scores = (Object.keys(KEYWORDS) as Exclude<Lang, 'ja'>[])
    .map((lang) => [lang, countMatches(KEYWORDS[lang], t)] as [Lang, number])
    .sort((a, b) => b[1] - a[1]);

  const [topLang, topScore] = scores[0];
  const runnerUp = scores[1]?.[1] ?? 0;
  if (topScore === 0) return { lang: null, confident: false };

  // A CLEAR non-English signal counts on its own. The English list is far
  // longer than every other (it has to be, to reclaim a chat), so a message
  // like "Ola, quero saber o preco" scored 1 for Portuguese and 0 for English
  // and stayed unconfident: the customer was never given a language, and every
  // deterministic message they later received went out in English (audit,
  // 4 Sep). One distinctive foreign hit with nothing competing is a real
  // signal; English still needs two, so a stray "ok" or "thanks" inside a
  // German conversation cannot flip it.
  //
  // It is deliberately only enough to SET a language that is not set yet
  // (`enoughToSet`), never to SWITCH one that is: switching still needs two
  // hits, so a "Danke!" or a "grazie" dropped into an English conversation
  // cannot move it. See handleIncomingInner, which is what reads these two.
  const clearForeign = topLang !== 'en' && topScore >= 1 && topScore > runnerUp;
  const confident = topScore >= 2 && topScore > runnerUp;
  return { lang: topLang, confident, enoughToSet: confident || clearForeign };
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
  // Jo, 4 Sep: "If you have a minute," is filler, and the playbook bans filler.
  // Two lines, then the link on its own. The first two lines are word for word
  // the body of the Meta template `review_request`; the link is here because
  // INSIDE the 24h window this goes as free text and the customer needs
  // something to tap, while outside it the template carries it as a button.
  en: `Thank you so much for trusting us with your tax return!\n\nWe'd really appreciate a quick Google review 🙏\n\n${REVIEW_LINK}`,
  de: `Vielen Dank, dass du uns deine Steuererklärung anvertraut hast!\n\nWir würden uns sehr über eine kurze Google-Bewertung freuen 🙏\n\n${REVIEW_LINK}`,
  ja: `確定申告をお任せいただき、本当にありがとうございました！\n\nGoogleに簡単なレビューをいただけると嬉しいです 🙏\n\n${REVIEW_LINK}`,
  es: `¡Muchas gracias por confiarnos tu declaración de impuestos!\n\nNos encantaría recibir una breve reseña en Google 🙏\n\n${REVIEW_LINK}`,
  fr: `Merci beaucoup de nous avoir confié ta déclaration d'impôts !\n\nUn petit avis Google nous ferait très plaisir 🙏\n\n${REVIEW_LINK}`,
  it: `Grazie mille per averci affidato la tua dichiarazione dei redditi!\n\nCi farebbe molto piacere ricevere una breve recensione su Google 🙏\n\n${REVIEW_LINK}`,
  pt: `Muito obrigado por confiares em nós com a tua declaração de impostos!\n\nAgradecíamos muito uma breve avaliação no Google 🙏\n\n${REVIEW_LINK}`,
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

/** "Payment received" + the questionnaire link, per language (Jo's English
 *  wording, no emoji). The automatic confirmation used to go out in English to
 *  everyone, in the middle of a German or Japanese conversation, at the single
 *  moment the customer is most invested (audit, 4 Sep). English lives under the
 *  Library key `payment_received`, the others under payment_received_<lang>. */
export const PAYMENT_RECEIVED_MSG: Record<Lang, string> = {
  en: 'Payment received!\n\nPlease fill out this quick form so we can start reviewing your situation:\n\nhttps://workingholidaytax.com.au/tax-form\n\nOnce you\'ve submitted it, we\'ll go through everything and get back to you within 24 hours.',
  de: 'Zahlung erhalten!\n\nBitte füll dieses kurze Formular aus, damit wir mit der Prüfung deiner Situation starten können:\n\nhttps://workingholidaytax.com.au/tax-form\n\nSobald du es abgeschickt hast, gehen wir alles durch und melden uns innerhalb von 24 Stunden bei dir.',
  ja: 'お支払いを確認しました。\n\nご状況の確認を始められるよう、こちらの簡単なフォームにご記入ください:\n\nhttps://workingholidaytax.com.au/tax-form\n\nご送信いただいたら、すべて確認のうえ24時間以内にご連絡します。',
  es: '¡Pago recibido!\n\nRellena este formulario rápido para que podamos empezar a revisar tu situación:\n\nhttps://workingholidaytax.com.au/tax-form\n\nEn cuanto lo envíes, revisamos todo y te respondemos en 24 horas.',
  fr: 'Paiement bien reçu !\n\nRemplis ce court formulaire pour que nous puissions commencer à examiner ta situation :\n\nhttps://workingholidaytax.com.au/tax-form\n\nDès que tu l\'as envoyé, nous passons tout en revue et revenons vers toi sous 24 heures.',
  it: 'Pagamento ricevuto!\n\nCompila questo breve modulo così possiamo iniziare a esaminare la tua situazione:\n\nhttps://workingholidaytax.com.au/tax-form\n\nUna volta inviato, controlliamo tutto e ti rispondiamo entro 24 ore.',
  pt: 'Pagamento recebido!\n\nPreenche este formulário rápido para podermos começar a analisar a tua situação:\n\nhttps://workingholidaytax.com.au/tax-form\n\nAssim que o enviares, vemos tudo e respondemos dentro de 24 horas.',
};

export function paymentReceivedMessage(lang?: string | null): string {
  const key = (lang && lang in PAYMENT_RECEIVED_MSG ? lang : 'en') as Lang;
  return PAYMENT_RECEIVED_MSG[key];
}

/** Is this OUT message the "payment received" confirmation drafted for
 *  approval by the screenshot path (proposedState PAID + the deterministic
 *  system line)? It answers its own trigger, the receipt, not whatever the
 *  customer typed afterwards, so a later draft written against the full
 *  conversation does not make it stale: it used to be discarded with the
 *  rest, the customer stayed unpaid and the open payment task pointed at a
 *  draft that no longer existed (audit, 5 Sep). `libraryBodies` are Jo's
 *  live payment_received Library texts, which may differ from the constants. */
export function isPaymentReceivedDraft(
  m: { body?: string | null; meta?: { proposedState?: string } | null },
  libraryBodies: readonly string[] = [],
): boolean {
  if (m.meta?.proposedState !== 'PAID') return false;
  const body = (m.body ?? '').trim();
  if (!body) return false;
  const head = body.slice(0, 40).toLowerCase();
  if (Object.values(PAYMENT_RECEIVED_MSG).some((t) => t.slice(0, 40).toLowerCase() === head)) return true;
  return libraryBodies.some((t) => t.trim() === body);
}

/** The Library key for this customer's language. */
export function paymentReceivedTemplateKey(lang?: string | null): string {
  const key = (lang && lang in PAYMENT_RECEIVED_MSG ? lang : 'en') as Lang;
  return key === 'en' ? 'payment_received' : `payment_received_${key}`;
}

/** The holding line sent half an hour after a handoff, when the customer is
 *  still waiting and nobody has answered yet. Was English only, so a German or
 *  Japanese customer waiting on a person got an English line in the middle of a
 *  German conversation (audit, 4 Sep). English lives under the Library key
 *  `handoff_holding`, the others under handoff_holding_<lang>. */
export const HANDOFF_HOLDING_MSG: Record<Lang, string> = {
  en: 'Thanks for that 😊 Let me look into it properly and come straight back to you.',
  de: 'Danke dir 😊 Ich schaue mir das in Ruhe an und melde mich gleich bei dir.',
  ja: 'ありがとうございます 😊 きちんと確認して、すぐにご連絡しますね。',
  es: 'Gracias 😊 Lo reviso bien y te respondo enseguida.',
  fr: 'Merci 😊 Je regarde ça correctement et je reviens vers toi tout de suite.',
  it: 'Grazie 😊 Lo controllo per bene e ti rispondo subito.',
  pt: 'Obrigado 😊 Vou ver isso com atenção e respondo-te já de seguida.',
};

export function handoffHoldingMessage(lang?: string | null): string {
  const key = (lang && lang in HANDOFF_HOLDING_MSG ? lang : 'en') as Lang;
  return HANDOFF_HOLDING_MSG[key];
}

/** The Library key for this customer's language: `handoff_holding` for English,
 *  `handoff_holding_<lang>` otherwise. Same names for the Meta templates. */
export function handoffHoldingTemplateKey(lang?: string | null): string {
  const key = (lang && lang in HANDOFF_HOLDING_MSG ? lang : 'en') as Lang;
  return key === 'en' ? 'handoff_holding' : `handoff_holding_${key}`;
}

/** The acknowledgement a PAID customer gets when their documents arrive
 *  (Jo's English wording, 28 Aug; the others are faithful renderings). This is
 *  the one post-payment auto-send that never got its language variants on
 *  3 and 4 Sep, so a customer just thanked in German for their questionnaire
 *  sent payslips and got "Perfect, got it all" back in English (audit, 5 Sep).
 *  English lives under the Library key `handoff_documents_after_payment`, the
 *  others under handoff_documents_after_payment_<lang>. */
export const DOCUMENTS_RECEIVED_MSG: Record<Lang, string> = {
  en: `Perfect, got it all, thank you 😊 Let me work through everything and I'll come back to you soon.`,
  de: 'Perfekt, alles angekommen, danke dir 😊 Ich gehe alles durch und melde mich bald wieder bei dir.',
  ja: '完璧です、すべて受け取りました、ありがとうございます 😊 全部確認して、近いうちにご連絡しますね。',
  es: 'Perfecto, lo tengo todo, gracias 😊 Lo reviso todo y te respondo pronto.',
  fr: "Parfait, j'ai tout reçu, merci 😊 Je passe tout en revue et je reviens vers toi bientôt.",
  it: 'Perfetto, ho ricevuto tutto, grazie 😊 Controllo tutto e ti rispondo presto.',
  pt: 'Perfeito, recebi tudo, obrigado 😊 Vou ver tudo com atenção e respondo em breve.',
};

export function documentsReceivedMessage(lang?: string | null): string {
  const key = (lang && lang in DOCUMENTS_RECEIVED_MSG ? lang : 'en') as Lang;
  return DOCUMENTS_RECEIVED_MSG[key];
}

/** The Library key for this customer's language: `handoff_documents_after_payment`
 *  for English (the key Jo already knows), `handoff_documents_after_payment_<lang>`
 *  otherwise. */
export function documentsReceivedTemplateKey(lang?: string | null): string {
  const key = (lang && lang in DOCUMENTS_RECEIVED_MSG ? lang : 'en') as Lang;
  return key === 'en' ? 'handoff_documents_after_payment' : `handoff_documents_after_payment_${key}`;
}

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

/** The automatic Medicare Levy Exemption message (MEDICARE_INFO job, 15 minutes
 *  after a questionnaire that said "No" to Medicare), per language. English is
 *  Jo's 4 Sep wording verbatim (APPROVED.medicare_exemption); the others are
 *  faithful renderings. It was the last post-form auto-send without a language
 *  variant, so a German or Japanese customer thanked in their own language got
 *  three English paragraphs asking them to go and apply (audit, 5 Sep).
 *  English lives under the Library key `medicare` (the key Jo already knows),
 *  the others under medicare_<lang>. Same Meta template names. No dashes,
 *  no prices, guard-clean. */
export const MEDICARE_MSG: Record<Lang, string> = {
  en: `Since you weren't covered by Medicare, you may be eligible to apply for a Medicare Levy Exemption.\n\nOnce you've submitted your application, send me a screenshot and we'll include the exemption in your tax return.\n\nIf Services Australia doesn't approve it, the levy still applies and you'll need to pay it.`,
  de: 'Da du nicht durch Medicare abgedeckt warst, kannst du möglicherweise eine Medicare Levy Exemption beantragen.\n\nSobald du deinen Antrag eingereicht hast, schick mir einen Screenshot und wir nehmen die Befreiung in deine Steuererklärung auf.\n\nWenn Services Australia den Antrag nicht genehmigt, gilt die Abgabe weiterhin und du musst sie bezahlen.',
  ja: 'Medicareに加入していなかったため、Medicare Levy Exemption（メディケア税免除）を申請できる可能性があります。\n\n申請を送信したら、スクリーンショットを送ってください。免除を確定申告に含めます。\n\nServices Australiaが承認しなかった場合、税金は引き続き適用され、お支払いいただく必要があります。',
  es: 'Como no estabas cubierto por Medicare, es posible que puedas solicitar la Medicare Levy Exemption.\n\nUna vez que hayas enviado tu solicitud, mándame una captura de pantalla y la incluiremos en tu declaración de impuestos.\n\nSi Services Australia no la aprueba, el Medicare Levy sigue aplicándose y tendrás que pagarlo.',
  fr: "Comme tu n'étais pas couvert par Medicare, il se peut que tu puisses demander la Medicare Levy Exemption.\n\nUne fois ta demande envoyée, il suffit de m'envoyer une capture d'écran et nous inclurons l'exemption dans ta déclaration d'impôts.\n\nSi Services Australia ne l'approuve pas, la Medicare Levy s'applique toujours et tu devras la payer.",
  it: "Dato che non eri coperto da Medicare, potresti avere diritto a richiedere la Medicare Levy Exemption.\n\nUna volta inviata la domanda, mandami uno screenshot e includeremo l'esenzione nella tua dichiarazione dei redditi.\n\nSe Services Australia non la approva, la Medicare Levy resta dovuta e dovrai pagarla.",
  pt: 'Como não estavas coberto pelo Medicare, é possível que possas pedir a Medicare Levy Exemption.\n\nAssim que tiveres enviado o pedido, manda-me uma captura de ecrã e incluiremos a isenção na tua declaração de impostos.\n\nSe a Services Australia não a aprovar, a Medicare Levy continua a aplicar-se e terás de a pagar.',
};

export function medicareMessage(lang?: string | null): string {
  const key = (lang && lang in MEDICARE_MSG ? lang : 'en') as Lang;
  return MEDICARE_MSG[key];
}

/** Library key (and Meta template name) for this language's Medicare message:
 *  `medicare` for English, `medicare_<lang>` for the rest. */
export function medicareTemplateKey(lang?: string | null): string {
  const key = (lang && lang in MEDICARE_MSG ? lang : 'en') as Lang;
  return key === 'en' ? 'medicare' : `medicare_${key}`;
}
