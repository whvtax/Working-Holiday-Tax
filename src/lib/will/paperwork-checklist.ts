// ============================================================
// Paperwork checklist (3 Nov, wave 2).
//
// WHAT WAS HAPPENING
//   After payment and the questionnaire Will almost never asked for the
//   passport or ID, the bank statement for the account the money goes to
//   (with the work expenses highlighted), receipts, ABN invoices and the
//   period they cover, or the Medicare answer. The team then chased for days,
//   and a pile of photos was answered with "got it all" without saying what
//   the photo was or what was still missing.
//
// WHAT THIS MODULE IS
//   Pure functions only (no store, no clock, no network), so the scheduler and
//   the document-drop path can both call it and a test can pin every line.
//
//   buildPaperwork(facts)      what is still missing, in a fixed order
//   paperworkMessage(...)      ONE structured message asking only for that
//   classifyAttachment(...)    what a file appears to be (name, caption)
//   acknowledgeAttachments()   names what arrived and what is still missing
//
// RULES BAKED IN: no dashes (output passes stripDashes), no refund promise,
// no residency or tax-free-threshold conclusion, no mention of AI or bots, no
// "got it all" while anything is outstanding.
// ============================================================
import { stripDashes } from './text';

export type PaperworkLang = 'en' | 'de' | 'ja';
export type DocKind = 'id' | 'bank_statement' | 'receipts' | 'abn_invoices' | 'income_statement';
export type PaperworkItem = 'form' | 'id' | 'bank_statement' | 'income_statement' | 'abn_invoices' | 'expenses' | 'medicare';

export interface PaperworkFacts {
  lang?: string | null;
  /** 'TFN_ABN' asks for ABN invoices; anything else is TFN only. */
  income?: string | null;
  formComplete?: boolean;
  /** Count of files already received per kind (from tags, filenames or the team). */
  received?: Partial<Record<DocKind, number>>;
  /** The customer said whether they have work expenses (yes with receipts, or none). */
  expensesAnswered?: boolean;
  /** The Medicare question is settled (form answer, reply or exemption flow). */
  medicareAnswered?: boolean;
  /** The customer said every document of that kind is already sent. */
  declaredComplete?: Partial<Record<DocKind, boolean>>;
}

export function paperworkLang(raw: string | null | undefined): PaperworkLang {
  const l = (raw ?? '').toLowerCase().slice(0, 2);
  return l === 'de' || l === 'ja' ? l : 'en';
}

const has = (f: PaperworkFacts, k: DocKind) => (f.received?.[k] ?? 0) > 0 || f.declaredComplete?.[k] === true;

/** What is still missing, in the order we ask for it. Empty = nothing to ask. */
export function buildPaperwork(f: PaperworkFacts): PaperworkItem[] {
  const out: PaperworkItem[] = [];
  if (!f.formComplete) out.push('form');
  if (!has(f, 'id')) out.push('id');
  if (!has(f, 'bank_statement')) out.push('bank_statement');
  if (!has(f, 'income_statement')) out.push('income_statement');
  if (f.income === 'TFN_ABN' && !has(f, 'abn_invoices')) out.push('abn_invoices');
  if (!f.expensesAnswered && !has(f, 'receipts')) out.push('expenses');
  if (!f.medicareAnswered) out.push('medicare');
  return out;
}

const LINES: Record<PaperworkLang, Record<PaperworkItem, string>> = {
  en: {
    form: 'The questionnaire on the form link I sent',
    id: 'A clear photo of your passport photo page (or another photo ID)',
    bank_statement: 'A recent statement for the Australian bank account you want the return paid into. If you have work expenses, please highlight those lines. If the account is closed or you cannot log in, just tell me',
    income_statement: 'Your income statement or payslips from each employer, so we can check every job is included',
    abn_invoices: 'Your ABN invoices for the financial year (1 July to 30 June) with the dates they cover',
    expenses: 'Work expenses: tell me yes or no, and if yes send the receipts',
    medicare: 'Medicare: were you covered by Medicare in Australia this year, yes or no',
  },
  de: {
    form: 'Der Fragebogen ueber den Formular-Link, den ich dir geschickt habe',
    id: 'Ein gut lesbares Foto der Passseite mit deinem Bild (oder ein anderer Lichtbildausweis)',
    bank_statement: 'Ein aktueller Kontoauszug des australischen Kontos, auf das die Rueckzahlung gehen soll. Falls du Arbeitsausgaben hast, markiere diese Zeilen bitte. Ist das Konto geschlossen oder kommst du nicht rein, sag mir einfach Bescheid',
    income_statement: 'Dein Income Statement oder die Lohnabrechnungen jedes Arbeitgebers, damit wir pruefen koennen, dass jeder Job dabei ist',
    abn_invoices: 'Deine ABN-Rechnungen fuer das Steuerjahr (1. Juli bis 30. Juni) mit den Daten, die sie abdecken',
    expenses: 'Arbeitsausgaben: sag mir ja oder nein, und bei ja schick die Belege',
    medicare: 'Medicare: warst du dieses Jahr in Australien ueber Medicare versichert, ja oder nein',
  },
  ja: {
    form: '先ほどお送りしたフォームリンクのアンケート',
    id: 'パスポートの顔写真ページの鮮明な写真(または他の写真付き身分証)',
    bank_statement: '還付金の振込先にしたいオーストラリアの銀行口座の最近の取引明細。仕事の経費がある場合は、その行にマーカーをお願いします。口座を解約済み、またはログインできない場合はお知らせください',
    income_statement: '各雇用主のインカムステートメントまたは給与明細(すべての仕事が含まれているか確認するため)',
    abn_invoices: '会計年度(7月1日から6月30日)のABN請求書と、それぞれの対象期間がわかる日付',
    expenses: '仕事の経費: ある、ないをお知らせください。ある場合はレシートをお送りください',
    medicare: 'メディケア: 今年オーストラリアでメディケアの対象でしたか(はい、いいえ)',
  },
};

const FRAME: Record<PaperworkLang, { intro: string; outro: string; one: string }> = {
  en: {
    intro: 'Thanks. To get your return ready I still need these, all in this chat:',
    one: 'Thanks. To get your return ready I still need one thing, in this chat:',
    outro: 'You can send them in any order, photos are fine. I will tell you what is still missing after each one.',
  },
  de: {
    intro: 'Danke. Damit deine Steuererklaerung fertig werden kann, brauche ich noch Folgendes, alles hier im Chat:',
    one: 'Danke. Damit deine Steuererklaerung fertig werden kann, brauche ich noch eine Sache, hier im Chat:',
    outro: 'Reihenfolge egal, Fotos sind in Ordnung. Nach jedem sage ich dir, was noch fehlt.',
  },
  ja: {
    intro: 'ありがとうございます。申告の準備のため、以下がまだ必要です。すべてこのチャットでお送りください。',
    one: 'ありがとうございます。申告の準備のため、あと1点必要です。このチャットでお送りください。',
    outro: '順番は問いません。写真で大丈夫です。1つ届くたびに、残りをお伝えします。',
  },
};

/** One structured message asking ONLY for what is missing. Null when nothing is. */
export function paperworkMessage(missing: PaperworkItem[], langRaw?: string | null): string | null {
  if (!missing.length) return null;
  const lang = paperworkLang(langRaw);
  const t = LINES[lang];
  const fr = FRAME[lang];
  const body = missing.length === 1
    ? t[missing[0]]
    : missing.map((m, i) => `${i + 1}. ${t[m]}`).join('\n');
  const head = missing.length === 1 ? fr.one : fr.intro;
  return stripDashes(`${head}\n\n${body}\n\n${fr.outro}`);
}

/** Convenience: facts in, message (or null) out. */
export function buildPaperworkMessage(f: PaperworkFacts): string | null {
  return paperworkMessage(buildPaperwork(f), f.lang);
}

// ------------------------------------------------------------
// Attachments
// ------------------------------------------------------------
export interface AttachmentInfo {
  /** The stored stand-in text, e.g. "📷 [Photo] caption" or "📄 [Document: name.pdf]". */
  text: string;
  /** Media kind when known (image, document, video). */
  mediaKind?: string | null;
}

export type Classified = { kind: DocKind | 'unknown'; label: string };

const RULES: Array<[DocKind, RegExp]> = [
  ['id', /passport|licen[cs]e|driver|visa grant|\bid\b|ausweis|reisepass|パスポート|免許|身分証/i],
  ['bank_statement', /statement|bank|commbank|anz|westpac|nab\b|account|kontoauszug|konto|取引明細|明細|銀行|口座/i],
  ['income_statement', /payslip|pay slip|income statement|payg|lohn|gehalt|abrechnung|給与|インカム|源泉/i],
  ['abn_invoices', /invoice|abn|rechnung|請求/i],
  ['receipts', /receipt|beleg|quittung|レシート|領収/i],
];

const LABEL: Record<PaperworkLang, Record<DocKind | 'unknown', string>> = {
  en: { id: 'your ID', bank_statement: 'a bank statement', receipts: 'a receipt', abn_invoices: 'an ABN invoice', income_statement: 'an income statement or payslip', unknown: 'a file' },
  de: { id: 'dein Ausweis', bank_statement: 'ein Kontoauszug', receipts: 'ein Beleg', abn_invoices: 'eine ABN-Rechnung', income_statement: 'ein Income Statement oder eine Lohnabrechnung', unknown: 'eine Datei' },
  ja: { id: '身分証', bank_statement: '銀行の取引明細', receipts: 'レシート', abn_invoices: 'ABN請求書', income_statement: 'インカムステートメントまたは給与明細', unknown: 'ファイル' },
};

/**
 * What a file appears to be, from its filename and the customer's caption only.
 * A bare photo is 'unknown': nothing here reads the picture, so we never claim to.
 */
export function classifyAttachment(a: AttachmentInfo, langRaw?: string | null): Classified {
  const lang = paperworkLang(langRaw);
  const hint = (a.text ?? '').replace(/^(?:📷 \[Photo\]|🎥 \[Video\]|📄 \[Document)/, ' ');
  for (const [kind, re] of RULES) if (re.test(hint)) return { kind, label: LABEL[lang][kind] };
  return { kind: 'unknown', label: LABEL[lang].unknown };
}

const ACK: Record<PaperworkLang, {
  recv: (labels: string) => string; ask: string; none: string; done: string; unsure: string;
}> = {
  en: {
    recv: (l) => `Thanks, I have received ${l}.`,
    unsure: 'I cannot tell what the photo shows yet, so please reply with a word on what it is (for example passport, bank statement or receipt).',
    ask: 'Still missing:',
    none: 'That covers everything I need from you for now. The team will review it and I will update you here.',
    done: '',
  },
  de: {
    recv: (l) => `Danke, ich habe ${l} erhalten.`,
    unsure: 'Ich sehe noch nicht, was das Foto zeigt. Antworte bitte kurz, was es ist (zum Beispiel Pass, Kontoauszug oder Beleg).',
    ask: 'Es fehlt noch:',
    none: 'Damit habe ich fuer den Moment alles von dir. Das Team schaut es sich an und ich melde mich hier.',
    done: '',
  },
  ja: {
    recv: (l) => `${l}を受け取りました。ありがとうございます。`,
    unsure: '写真の内容がまだ判別できません。何の書類か一言で返信してください(例: パスポート、銀行明細、レシート)。',
    ask: 'まだ必要なもの:',
    none: '今のところ必要なものはすべて揃っています。チームが確認し、ここでご連絡します。',
    done: '',
  },
};

/**
 * The reply to a burst of files from a customer who has paid. Names what each
 * appears to be, counts repeats, says honestly when it cannot tell, and lists
 * only what is still missing. `missingAfter` should already exclude the kinds
 * just received (use buildPaperwork on facts updated with receivedCounts()).
 */
export function acknowledgeAttachments(
  files: AttachmentInfo[], missingAfter: PaperworkItem[], langRaw?: string | null,
): string | null {
  if (!files.length) return null;
  const lang = paperworkLang(langRaw);
  const a = ACK[lang];
  const t = LINES[lang];
  const counts = receivedCounts(files, lang);
  const parts: string[] = [];
  for (const [k, n] of Object.entries(counts) as Array<[DocKind | 'unknown', number]>) {
    parts.push(n > 1 ? `${n} x ${LABEL[lang][k]}` : LABEL[lang][k]);
  }
  const named = lang === 'ja' ? parts.join('、') : parts.join(', ');
  const lines = [a.recv(named)];
  if (counts.unknown) lines.push(a.unsure);
  if (missingAfter.length) {
    lines.push(`${a.ask}\n${missingAfter.map((m, i) => `${i + 1}. ${t[m]}`).join('\n')}`);
  } else if (!counts.unknown) {
    lines.push(a.none);
  }
  return stripDashes(lines.join('\n\n'));
}

/** Per-kind counts of a burst (unknown kept apart). */
export function receivedCounts(files: AttachmentInfo[], langRaw?: string | null): Partial<Record<DocKind | 'unknown', number>> {
  const out: Partial<Record<DocKind | 'unknown', number>> = {};
  for (const f of files) {
    const c = classifyAttachment(f, langRaw);
    out[c.kind] = (out[c.kind] ?? 0) + 1;
  }
  return out;
}

/** Fold a burst into facts so buildPaperwork reflects what just arrived. */
export function applyAttachments(f: PaperworkFacts, files: AttachmentInfo[]): PaperworkFacts {
  const received = { ...(f.received ?? {}) };
  for (const [k, n] of Object.entries(receivedCounts(files, f.lang))) {
    if (k !== 'unknown') received[k as DocKind] = (received[k as DocKind] ?? 0) + (n ?? 0);
  }
  return { ...f, received };
}
