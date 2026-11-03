// ============================================================
// EXPENSES INTAKE (Jo, 3 Nov). Pure, no I/O.
//
// Evidence (72h export): customers saying they have no receipts but bank
// statements are fine, a receipt charge that was never disclosed, customers
// asked how every invoice relates to their work, the team chasing expenses
// over several rounds, and a form answer "No expenses" while the customer
// later listed many.
//
// expensesIntake(facts) returns ONE follow-up message in the customer's
// language. It never says anything is deductible, never invents a receipt fee
// (no such rule exists in the repo), and says a bank statement is fine. The
// only receipt rule quoted is the one already in the Library: up to $300 total,
// receipts are generally not required, but the customer shows how they
// calculated the amount.
// ============================================================

export type IntakeLang = 'en' | 'de' | 'ja';

export interface ExpensesFacts {
  lang?: string | null;
  /** The form answer about work expenses, if any. */
  formAnswer?: 'none' | 'some' | 'unknown' | null;
  /** The customer has since listed or mentioned expenses in chat. */
  listedInChat?: boolean;
  /** Number of expense related files or lines already received. */
  receivedCount?: number;
  /** The customer said they have no receipts. */
  saidNoReceipts?: boolean;
  /** The customer has said "none" / confirmed there are no expenses. */
  confirmedNone?: boolean;
  /** How many expenses prompts Will already sent (cap: one per intake). */
  promptsSent?: number;
}

export type ExpensesStep = 'ask_all' | 'no_receipts' | 'form_mismatch' | 'done' | 'skip';
export interface ExpensesIntake { step: ExpensesStep; message: string | null }

const L = (lang?: string | null): IntakeLang => {
  const l = (lang ?? 'en').toLowerCase();
  return l.startsWith('de') ? 'de' : l.startsWith('ja') ? 'ja' : 'en';
};

const MSG: Record<Exclude<ExpensesStep, 'done' | 'skip'>, Record<IntakeLang, string>> = {
  ask_all: {
    en: "Did you pay for anything yourself because of your work, for example a phone, tools, a uniform, a course or kilometres driven between work sites? Send them in one go, as receipts or as a bank statement with the payments highlighted. Both are fine, and \"none\" is a fine answer too. Just tell us what each item was for, and the team will go through them with you.",
    de: "Hast du etwas wegen deiner Arbeit selbst bezahlt, zum Beispiel ein Handy, Werkzeug, eine Uniform, einen Kurs oder gefahrene Kilometer zwischen Arbeitsorten? Schick alles auf einmal, als Belege oder als Kontoauszug mit markierten Zahlungen. Beides ist in Ordnung, und \"keine\" ist auch eine gute Antwort. Schreib kurz dazu, wofür jede Ausgabe war, das Team geht alles mit dir durch.",
    ja: "仕事のために自分で支払ったものはありますか。たとえばスマホ、道具、制服、講座、職場間で運転した距離などです。まとめて、領収書か、支払いに印をつけた銀行明細で送ってください。どちらでも大丈夫で、「なし」というお答えでも問題ありません。それぞれ何のための支出か一言添えていただければ、チームが一緒に確認します。",
  },
  no_receipts: {
    en: "No problem, a bank statement with the payments highlighted is fine. If your work expenses add up to $300 or less, receipts are generally not required, but we still need a list of the items and how you calculated the amount. What were the items?",
    de: "Kein Problem, ein Kontoauszug mit markierten Zahlungen reicht. Wenn deine arbeitsbezogenen Ausgaben zusammen 300 Dollar oder weniger betragen, sind Belege in der Regel nicht nötig, aber wir brauchen trotzdem eine Liste der Posten und wie du den Betrag berechnet hast. Was waren die Posten?",
    ja: "大丈夫です。支払いに印をつけた銀行明細で問題ありません。仕事関連の支出の合計が300ドル以下の場合、領収書は通常必要ありませんが、品目の一覧と金額の計算方法は必要です。どんな品目でしたか。",
  },
  form_mismatch: {
    en: "Thanks for the list! On the form you answered that you had no work expenses, so just to be sure: shall the team go through the items you mentioned? If yes, please send a receipt or a bank statement with each payment highlighted.",
    de: "Danke für die Liste! Im Formular hast du angegeben, dass du keine arbeitsbezogenen Ausgaben hattest. Damit alles stimmt: Soll das Team die genannten Posten durchgehen? Wenn ja, schick bitte jeweils einen Beleg oder einen Kontoauszug mit markierter Zahlung.",
    ja: "リストをありがとうございます。フォームでは仕事関連の支出は「なし」とご回答でしたので、念のため確認です。お書きいただいた品目をチームが確認してよろしいですか。よろしければ、それぞれの領収書か、支払いに印をつけた銀行明細を送ってください。",
  },
};

export function expensesIntake(f: ExpensesFacts): ExpensesIntake {
  const lang = L(f.lang);
  if (f.confirmedNone) return { step: 'done', message: null };
  // ONE follow-up: never a second round of the same ask (the team chased in several rounds).
  if ((f.promptsSent ?? 0) >= 1) return { step: 'skip', message: null };
  if (f.saidNoReceipts) return { step: 'no_receipts', message: MSG.no_receipts[lang] };
  if (f.formAnswer === 'none' && f.listedInChat) return { step: 'form_mismatch', message: MSG.form_mismatch[lang] };
  if ((f.receivedCount ?? 0) > 0) return { step: 'done', message: null };
  return { step: 'ask_all', message: MSG.ask_all[lang] };
}
