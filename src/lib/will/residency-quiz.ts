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
//     the same six Yes/No questions as the form on the site, one at a time.
//   - 4 or more of the 6 "Yes" (a majority, Jo 30 Oct): "Great, it looks like you count as an Australian tax
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
    'Do you hold a passport from an NDA country: UK, Germany, Japan, Chile, Finland, Israel, Norway or Turkey?',
  ],
  de: [
    'Hast du in diesem Steuerjahr 6 Monate oder länger in Australien gelebt?',
    'War dein gewöhnlicher Wohnsitz in Australien?',
    'Hast du vor, weiterhin in Australien zu leben?',
    'Hattest du eine fortlaufende Arbeit in Australien?',
    'Hast du persönliche oder familiäre Bindungen in Australien?',
    'Hast du einen Reisepass aus einem NDA-Land: Großbritannien, Deutschland, Japan, Chile, Finnland, Israel, Norwegen oder Türkei?',
  ],
  ja: [
    'その課税年度中に、オーストラリアに6か月以上住んでいましたか？',
    '普段の住まいはオーストラリアにありましたか？',
    '今後もオーストラリアに住み続ける予定はありますか？',
    'オーストラリアで継続的なお仕事がありましたか？',
    'オーストラリアに個人的なつながりやご家族のつながりはありますか？',
    'NDA対象国のパスポートを所持していますか？（イギリス、ドイツ、日本、チリ、フィンランド、イスラエル、ノルウェー、トルコ）',
  ],
};

export function quizQuestion(lang: QuizLang, step: number): string {
  const qs = Q[lang];
  return lang === 'ja' ? `${step + 1}/6：${qs[step]}` : `${step + 1}/6: ${qs[step]}`;
}

export function quizIntro(lang: QuizLang, now = new Date()): string {
  const { start, end } = lodgingYear(now);
  if (lang === 'de') return `Gute Frage! Es zählt nur das Steuerjahr, das wir einreichen, also 1. Juli ${start} bis 30. Juni ${end}. Zeit davor in Australien zählt nicht. Ein paar kurze Fragen helfen unserem Team bei der Prüfung: 6 schnelle Fragen, antworte einfach mit Ja oder Nein 😊\n\n${quizQuestion(lang, 0)}`;
  if (lang === 'ja') return `ご質問ありがとうございます！対象になるのは、今回申告する課税年度（${start}年7月1日〜${end}年6月30日）だけです。それより前にオーストラリアにいた期間は含まれません。チームが確認する際の参考にさせていただきますので、6つの質問に「はい」か「いいえ」でお答えください😊\n\n${quizQuestion(lang, 0)}`;
  return `Good question! Only the tax year we're lodging counts, 1 July ${start} to 30 June ${end}, so time in Australia before that doesn't count. A few quick questions will help our team review it: 6 in total, just answer Yes or No 😊\n\n${quizQuestion(lang, 0)}`;
}

export function quizAgain(lang: QuizLang, step: number): string {
  if (lang === 'de') return `Hier reicht ein Ja oder Nein 😊\n\n${quizQuestion(lang, step)}`;
  if (lang === 'ja') return `「はい」か「いいえ」でお答えください😊\n\n${quizQuestion(lang, step)}`;
  return `Just a Yes or No for this one 😊\n\n${quizQuestion(lang, step)}`;
}

/** Neutral closing line (3 Nov): Will never tells the customer whether they
 *  are or are not a resident, whatever the score. The same line for every
 *  score; the team decides, and `assessQuiz` says whether they need a task. */
export function quizResult(lang: QuizLang, _yes?: number): string {
  if (lang === 'de') return 'Danke dir für deine Antworten 😊 Unser Team berücksichtigt sie bei der Prüfung deiner Steuererklärung und meldet sich, falls noch etwas angepasst werden muss.';
  if (lang === 'ja') return 'ご回答ありがとうございます😊 チームが確定申告の確認の際にこの内容を考慮し、修正が必要な場合はご連絡いたします。';
  return 'Thanks for your answers 😊 Our team will take them into account when reviewing your return, and will get in touch if anything needs to be updated.';
}

export type QuizSignal = 'consistent' | 'borderline' | 'mismatch';
export interface QuizAssessment {
  yes: number;
  signal: QuizSignal;
  /** True when the team should get a task to review the residency answer. */
  needsTeamTask: boolean;
  /** Internal note for the team task; never sent to the customer. */
  note: string;
}

/** Pure: what the quiz result means for the team. The form answer is "Working
 *  Holiday Maker" (the check is only sent to those). 4+ Yes contradicts it
 *  (mismatch), 2 or 3 Yes cannot be settled either way (borderline), 0 or 1
 *  Yes agrees with it. Mismatch and borderline both need a human look; Will
 *  never tells the customer which way it went. `formSaysWhm` false means the
 *  form already said resident, so a high score agrees with it. */
export function assessQuiz(answers: boolean[], formSaysWhm = true): QuizAssessment {
  const yes = answers.filter(Boolean).length;
  const high = yes >= 4;
  const low = yes <= 1;
  let signal: QuizSignal;
  if (formSaysWhm) signal = high ? 'mismatch' : low ? 'consistent' : 'borderline';
  else signal = high ? 'consistent' : low ? 'mismatch' : 'borderline';
  const needsTeamTask = signal !== 'consistent';
  const note = `Residency questions in chat: ${yes} of ${answers.length} Yes (${answers.map((x) => (x ? 'Y' : 'N')).join('')}). `
    + (signal === 'mismatch' ? 'The answers do not match the questionnaire answer. Please review the residency answer before lodging.'
      : signal === 'borderline' ? 'The answers are mixed. Please review the residency answer before lodging.'
      : 'The answers match the questionnaire answer.');
  return { yes, signal, needsTeamTask, note };
}

/** Yes / No / not sure (counted as No: a point has to genuinely apply).
 *  null when it is not an answer at all. */
export function parseYesNo(text: string): boolean | null {
  // "1/6: Ja" (a form-style answer that repeats the question number) counts as "Ja".
  const t = (text ?? '').trim().toLowerCase().replace(/^\(?\d\s*(?:\/|von|of|／)\s*6\)?\s*[:：.)\-]?\s*/u, '').replace(/[.!。！\s😊🙂👍👎]+$/u, '');
  // Jo, 25 Oct (Fua, +81 90): "はい、2025年2月14日から2026年2月11日まで
  // オーストラリアに滞在しておりましたので…" is a yes with the details. A long
  // answer still counts when it opens with the yes or the no.
  if (!t || t.length > 400) return null;
  if (t.length > 60 && !/^(?:yes|yeah|yep|no|nope|nah|ja|nein|はい|いいえ|ええ|いや)(?:[\s,.!、。！]|$)/iu.test(t)) return null;
  if (/^(?:no|nope|nah|not really|not quite|n|not sure|unsure|i don'?t know|don'?t know|no idea|maybe not|nein|nee|nö|eher nicht|nicht wirklich|kein|keine|wei[ßs] nicht|nicht sicher|いいえ|いえ|いや|ない|なかった|ありません|いません|ないです|違います|わかりません|分かりません)\b/iu.test(t)
    || /^(?:いいえ|いえ|ない|ありません|いません|わかりません|分かりません)/u.test(t) || /👎/u.test(text)) return false;
  if (/^(?:yes|yeah|yep|yup|y|sure|correct|definitely|of course|i do|i did|it was|ja|jap|jo|doch|genau|richtig|stimmt|klar|はい|ええ|うん|そうです|あります|ありました|います|いました)\b/iu.test(t)
    || /^(?:はい|ええ|うん|そうです|あります|ありました|います|いました)/u.test(t) || /👍/u.test(text)) return true;
  return null;
}

/** The last thing we sent is the residency check (any language). */
export function isResidencyCheck(body: string | null | undefined): boolean {
  const b = body ?? '';
  return /\/y8vwp4bf7\b/.test(b) && /(?:Working Holiday Maker|ワーキングホリデーメーカー)/.test(b);
}

/** Their reply asks, doubts or disagrees, so the six questions start. A plain
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
  if (answers.length >= 6) {
    const yes = answers.filter(Boolean).length;
    return { reply: quizResult(state.lang, yes), next: null, done: { yes, answers } };
  }
  return { reply: quizQuestion(state.lang, answers.length), next: { ...state, step: answers.length, answers } };
}
