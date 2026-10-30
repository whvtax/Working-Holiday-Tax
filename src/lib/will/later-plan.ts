// ============================================================
// "Thanks, I'll do it after work" (Jo, 21 Oct, +44 7479).
//
// She got the payment confirmation with the form button and answered
// "Okay thank you! Will complete this after work". Nobody replied: the word
// "will" kept it off the thank-you path, and the model read the rest as a
// polite closing and waited. A person answers that, in one line, and the line
// depends on where they are: the form link again if the form is what is
// waiting, "send a screenshot once it's done" if the payment is.
//
// Deterministic, like the thank-you line: no model call, their language.
// ============================================================
import type { CustomerState } from './state-machine';

/** A plan to do the thing later ("will complete this after work", "I'll do it
 *  tonight", "mache ich später", "後でやります"), with no question in it. */
const PLAN_RE = new RegExp([
  // en: a do-verb in the future, or a time word that defers it
  // A future do-verb is required; a time word alone ("I start work tomorrow")
  // is not a plan about us.
  "\\b(?:will|i'?ll|gonna|going to)\\s+(?:do|complete|fill|finish|send|pay|sort|get (?:it|this|that) (?:done|sorted))\\b",
  "\\b(?:do|complete|fill (?:it|this) (?:in|out)|finish|send|pay)\\s+(?:it|this|that|the form)?\\s*(?:after work|later(?: today| tonight)?|tonight|this (?:evening|arvo|afternoon|weekend)|tomorrow|when i get home|on the weekend)\\b",
  // de
  '\\b(?:mache|erledige|f[üu]lle|schicke|zahle|überweise)\\s+(?:ich|es|das)\\b[^.!?]{0,30}\\b(?:sp[äa]ter|heute abend|morgen|nach der arbeit|am wochenende)\\b',
  '\\b(?:sp[äa]ter|heute abend|morgen|nach der arbeit|am wochenende)\\b[^.!?]{0,30}\\b(?:mache|erledige|f[üu]lle|schicke)\\b',
  // ja
  '(?:後で|あとで|仕事(?:の)?(?:後|あと|終わったら)|今夜|今晩|明日|週末)[^。！？]{0,20}(?:やります|します|記入|送ります|入力|お支払い|振り込み|対応)',
  // es / fr / it / pt
  '\\blo (?:hago|completo|relleno|env[íi]o|pago) (?:m[áa]s tarde|despu[ée]s|esta noche|ma[ñn]ana)\\b',
  '\\bje (?:le|la) (?:fais|remplis|compl[èe]te|envoie) (?:plus tard|ce soir|demain|apr[èe]s le travail)\\b',
  '\\blo (?:faccio|compilo|completo|mando) (?:pi[ùu] tardi|stasera|domani|dopo il lavoro)\\b',
  '\\b(?:fa[çc]o|preencho|envio) (?:mais tarde|hoje [àa] noite|amanh[ãa]|depois do trabalho)\\b',
].join('|'), 'i');

/** Words that mean it is not just a plan: a problem, a question, a goodbye. */
const NOT_A_PLAN = /\b(?:but|problem|issue|can'?t|cannot|don'?t|didn'?t|not|help|how|what|where|why|which|wrong|error|cancel|elsewhere|someone else)\b|[?？]/i;

export function isLaterPlan(text: string | null | undefined): boolean {
  const t = (text ?? '').trim();
  if (!t || t.length > 200) return false;
  if (NOT_A_PLAN.test(t)) return false;
  return PLAN_RE.test(t);
}

const FORM_URL = 'https://workingholidaytax.com.au/start';

const FORM_LINE: Record<string, string> = {
  en: `No worries 😊 Here's the link whenever you're ready: ${FORM_URL}`,
  de: `Kein Problem 😊 Hier ist der Link, wann immer du so weit bist: ${FORM_URL}`,
  ja: `承知しました😊 ご都合のよいときに、こちらからご記入ください：${FORM_URL}`,
  es: `Sin problema 😊 Aquí tienes el enlace para cuando puedas: ${FORM_URL}`,
  fr: `Pas de souci 😊 Voici le lien pour quand tu seras prêt(e) : ${FORM_URL}`,
  it: `Nessun problema 😊 Ecco il link per quando sei pronto/a: ${FORM_URL}`,
  pt: `Sem problema 😊 Aqui está o link para quando puderes: ${FORM_URL}`,
};
const PAY_LINE: Record<string, string> = {
  en: "No rush at all 😊 Just send a screenshot once it's done.",
  de: 'Kein Stress 😊 Schick mir einfach einen Screenshot, sobald es erledigt ist.',
  ja: '急ぎませんので大丈夫です😊 お手続きが済みましたら、スクリーンショットをお送りください。',
  es: 'Sin prisa 😊 Envíame una captura cuando esté hecho.',
  fr: "Pas de rush 😊 Envoie-moi une capture quand c'est fait.",
  it: 'Nessuna fretta 😊 Mandami uno screenshot quando hai fatto.',
  pt: 'Sem pressa 😊 Envia-me uma captura quando estiver feito.',
};
const ANY_LINE: Record<string, string> = {
  en: 'No rush at all, whenever suits you 😊',
  de: 'Kein Stress, wann immer es dir passt 😊',
  ja: '急ぎませんので、ご都合のよいときで大丈夫です😊',
  es: 'Sin prisa, cuando te venga bien 😊',
  fr: 'Pas de rush, quand ça te convient 😊',
  it: 'Nessuna fretta, quando ti va bene 😊',
  pt: 'Sem pressa, quando te der jeito 😊',
};

/** The one line for "I'll do it later", by stage and language. */
export function laterPlanReply(state: CustomerState, lang?: string | null): string {
  const k = (lang ?? 'en').toLowerCase().slice(0, 2);
  const pick = (m: Record<string, string>) => m[k] ?? m.en;
  if (state === 'PAID' || state === 'FORM_PENDING') return pick(FORM_LINE);
  if (state === 'PRICE_SENT' || state === 'PAYMENT_PENDING') return pick(PAY_LINE);
  return pick(ANY_LINE);
}
