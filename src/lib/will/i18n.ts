// ============================================================
// Lightweight language handling for the few messages Will sends
// WITHOUT the model (scheduler events like "questionnaire received").
// The live conversational path already replies natively via the model;
// this covers the deterministic auto-messages for the main markets.
// English is always a safe fallback.
// ============================================================

export type Lang = 'en' | 'de' | 'ja' | 'es' | 'fr' | 'it' | 'pt';

/** Best-effort language detection from a customer message. Falls back to 'en'. */
export function detectLanguage(text: string): Lang | null {
  const t = (text || '').trim();
  if (!t) return null;
  if (/[぀-ゟ゠-ヿ]/.test(t)) return 'ja';           // hiragana/katakana => Japanese
  // Latin-script keyword heuristics (accents + distinctive function words).
  if (/\b(und|nicht|ich|danke|guten|hallo|kein|bitte|sehr|gerne|für|ist|über|während)\b/i.test(t)) return 'de';
  if (/\b(hola|gracias|por favor|usted|para|pero|cómo|muy|reembolso|impuesto|dónde)\b/i.test(t)) return 'es';
  if (/\b(bonjour|merci|vous|avec|pour|oui|remboursement|impôt|bonsoir|s'il vous plaît)\b/i.test(t)) return 'fr';
  if (/\b(ciao|grazie|prego|sono|molto|rimborso|imposta|dove|perché)\b/i.test(t)) return 'it';
  if (/\b(olá|obrigad\w*|você|não|imposto|reembolso|por favor|onde|porquê)\b/i.test(t)) return 'pt';
  return null; // unknown => let caller keep whatever it had (or English)
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
