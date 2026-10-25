// ============================================================
// THE RESIDENCY CHECK, IN THE CHAT (Jo, 22 Oct, Alexandra +44 7479).
//
// After the questionnaire, a UK / German / Japanese customer who ticked
// "Working Holiday Maker" gets the residency double-check (RESIDENCY_CHECK).
// Alexandra answered with a question ("I lived in Australia 6 months in Feb
// 2023 and 4 months this year, would that count as 6 months or more?") and
// nobody answered: a residency question is one Will must not decide alone.
//
// Jo's flow:
//   - Only when they ASK or are UNSURE after the check. "Yes, still correct"
//     closes the topic.
//   - Will says the questions are about the tax year being lodged, then asks
//     the same five Yes/No questions as the form on the site, one at a time.
//   - 4 or 5 "Yes": "Great, it looks like you count as an Australian tax
//     resident. Please fill out the questionnaire again with the correct
//     details." Fewer: "Great, you're a Working Holiday Maker. The team will
//     take it from here."
//
// Pure functions here; the conversation state lives in a setting
// (residency_quiz:<customerId>) and the glue is in service.ts.
// ============================================================

export type QuizLang = 'en' | 'de' | 'ja';
export interface QuizState { step: number; answers: boolean[]; startedAt: string; lang: QuizLang }

export const residencyQuizKey = (customerId: string) => `residency_quiz:${customerId}`;
/** An unfinished quiz is forgotten after two days. */
export const QUIZ_TTL_MS = 48 * 60 * 60 * 1000;
/** The check counts as "just sent" for a week. */
export const CHECK_WINDOW_MS = 7 * 24 * 60 * 60 * 1000;
const FORM_URL = 'https://workingholidaytax.com.au/tax-form';

export function quizLang(lang: string | null | undefined): QuizLang {
  return lang === 'de' || lang === 'ja' ? lang : 'en';
}

/** The tax year being lodged now: 1 July of last year to 30 June of this one
 *  from July onwards, one year earlier before July. */
export function lodgingYear(now = new Date()): { start: number; end: number } {
  const y = now.getFullYear();
  const end = now.getMonth() >= 6 ? y : y - 1;
  return { start: end - 1, end };
}

const Q: Record<QuizLang, string[]> = {
  en: [
    'During that tax year, did you live in Australia for 6 months or more?',
    'Was your usual home in Australia?',
    'Do you plan to continue living in Australia?',
    'Did you have ongoing work in Australia?',
    'Do you have personal or family ties in Australia?',
  ],
  de: [
    'Hast du in diesem Steuerjahr 6 Monate oder länger in Australien gelebt?',
    'War dein gewöhnlicher Wohnsitz in Australien?',
    'Hast du vor, weiterhin in Australien zu leben?',
    'Hattest du eine fortlaufende Arbeit in Australien?',
    'Hast du persönliche oder familiäre Bindungen in Australien?',
  ],
  ja: [
    'その課税年度中に、オーストラリアに6か月以上住んでいましたか？',
    '普段の住まいはオーストラリアにありましたか？',
    '今後もオーストラリアに住み続ける予定はありますか？',
    'オーストラリアで継続的なお仕事がありましたか？',
    'オーストラリアに個人的なつながりやご家族のつながりはありますか？',
  ],
};

export function quizQuestion(lang: QuizLang, step: number): string {
  const qs = Q[lang];
  return lang === 'ja' ? `${step + 1}/5：${qs[step]}` : `${step + 1}/5: ${qs[step]}`;
}

export function quizIntro(lang: QuizLang, now = new Date()): string {
  const { start, end } = lodgingYear(now);
  if (lang === 'de') return `Gute Frage! Es zählt nur das Steuerjahr, das wir einreichen, also 1. Juli ${start} bis 30. Juni ${end}. Zeit davor in Australien zählt nicht. Lass uns das kurz zusammen durchgehen: 5 schnelle Fragen, antworte einfach mit Ja oder Nein 😊\n\n${quizQuestion(lang, 0)}`;
  if (lang === 'ja') return `ご質問ありがとうございます！対象になるのは、今回申告する課税年度（${start}年7月1日〜${end}年6月30日）だけです。それより前にオーストラリアにいた期間は含まれません。一緒に確認しましょう。5つの質問に「はい」か「いいえ」でお答えください😊\n\n${quizQuestion(lang, 0)}`;
  return `Good question! Only the tax year we're lodging counts, 1 July ${start} to 30 June ${end}, so time in Australia before that doesn't count. Let's check it together: 5 quick questions, just answer Yes or No 😊\n\n${quizQuestion(lang, 0)}`;
}

export function quizAgain(lang: QuizLang, step: number): string {
  if (lang === 'de') return `Hier reicht ein Ja oder Nein 😊\n\n${quizQuestion(lang, step)}`;
  if (lang === 'ja') return `「はい」か「いいえ」でお答えください😊\n\n${quizQuestion(lang, step)}`;
  return `Just a Yes or No for this one 😊\n\n${quizQuestion(lang, step)}`;
}

/** Jo's two endings, word for word in English. */
export function quizResult(lang: QuizLang, yes: number): string {
  const resident = yes >= 4;
  if (lang === 'de') return resident
    ? `Super, es sieht so aus, als würdest du als steuerlich ansässig in Australien gelten 😊 Bitte füll den Fragebogen noch einmal mit den richtigen Angaben aus: ${FORM_URL}`
    : 'Super, du bist steuerlich ein Working Holiday Maker, deine Angabe bleibt also so 😊 Das Team kümmert sich ab hier um alles.';
  if (lang === 'ja') return resident
    ? `ありがとうございます！オーストラリアの税務上の居住者に該当するようです😊 お手数ですが、正しい内容でもう一度アンケートにご記入ください：${FORM_URL}`
    : 'ありがとうございます！税務上はワーキングホリデーメーカーに該当しますので、ご回答はそのままで大丈夫です😊 この後はチームが対応いたします。';
  return resident
    ? `Great, it looks like you count as an Australian tax resident 😊 Please fill out the questionnaire again with the correct details: ${FORM_URL}`
    : "Great, you're a Working Holiday Maker for tax, so your answer stays as it is 😊 The team will take it from here.";
}

/** Yes / No / not sure (counted as No: a point has to genuinely apply).
 *  null when it is not an answer at all. */
export function parseYesNo(text: string): boolean | null {
  const t = (text ?? '').trim().toLowerCase().replace(/[.!。！\s😊🙂👍👎]+$/u, '');
  // Jo, 25 Oct (Fua, +81 90): "はい、2025年2月14日から2026年2月11日まで
  // オーストラリアに滞在しておりましたので…" is a yes with the details. A long
  // answer still counts when it opens with the yes or the no.
  if (!t || t.length > 400) return null;
  if (t.length > 60 && !/^(?:yes|yeah|yep|no|nope|nah|ja|nein|はい|いいえ|ええ|いや)(?:[\s,.!、。！]|$)/iu.test(t)) return null;
  if (/^(?:no|nope|nah|not really|not quite|n|not sure|unsure|i don'?t know|don'?t know|no idea|maybe not|nein|eher nicht|nicht wirklich|wei[ßs] nicht|nicht sicher|いいえ|いや|ない|ありません|いません|ないです|違います|わかりません|分かりません)\b/iu.test(t)
    || /^(?:いいえ|ない|ありません|いません|わかりません|分かりません)/u.test(t) || /👎/u.test(text)) return false;
  if (/^(?:yes|yeah|yep|yup|y|sure|correct|definitely|of course|i do|i did|it was|ja|jap|jo|genau|richtig|stimmt|klar|はい|ええ|うん|そうです|あります|います)\b/iu.test(t)
    || /^(?:はい|ええ|うん|そうです|あります|います)/u.test(t) || /👍/u.test(text)) return true;
  return null;
}

/** The last thing we sent is the residency check (any language). */
export function isResidencyCheck(body: string | null | undefined): boolean {
  const b = body ?? '';
  return /\/tax-residency\b/.test(b) && /(?:Working Holiday Maker|ワーキングホリデーメーカー)/.test(b);
}

/** Their reply asks, doubts or disagrees, so the five questions start. A plain
 *  "yes, still correct" does not. */
export function startsQuiz(text: string): boolean {
  const t = (text ?? '').trim();
  if (!t) return false;
  if (/^(?:yes|yep|yeah|correct|still correct|that'?s (?:still )?correct|all good|ja|richtig|stimmt|passt|はい|正しいです|大丈夫です)\b[^?？]*$/iu.test(t)
    && !/\b(?:but|aber|not sure|nicht sicher)\b|でも|けど/iu.test(t)) return false;
  return /[?？]/.test(t)
    || /\b(?:not sure|unsure|don'?t know|no idea|confused|maybe|not correct|incorrect|wrong|no|nope|actually|would (?:that|it) (?:count|mean)|does (?:that|it) count|nicht sicher|wei[ßs] nicht|keine ahnung|vielleicht|falsch|nein|eigentlich)\b/iu.test(t)
    || /わから|分から|不安|どう|違|いいえ|かもしれ/u.test(t);
}

export function readQuiz(raw: unknown, now = Date.now()): QuizState | null {
  const q = raw as QuizState | null;
  if (!q || typeof q !== 'object' || typeof q.step !== 'number' || !Array.isArray(q.answers)) return null;
  if (now - new Date(q.startedAt).getTime() > QUIZ_TTL_MS) return null;
  return q;
}

/** One step: what to send and what to store next (null = quiz over). */
export function quizStep(state: QuizState, text: string): { reply: string; next: QuizState | null; done?: { yes: number; answers: boolean[] } } | 'not_an_answer' {
  const a = parseYesNo(text);
  if (a === null) return 'not_an_answer';
  const answers = [...state.answers, a];
  if (answers.length >= 5) {
    const yes = answers.filter(Boolean).length;
    return { reply: quizResult(state.lang, yes), next: null, done: { yes, answers } };
  }
  return { reply: quizQuestion(state.lang, answers.length), next: { ...state, step: answers.length, answers } };
}
