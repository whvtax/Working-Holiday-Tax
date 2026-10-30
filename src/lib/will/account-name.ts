// ============================================================
// THE ACCOUNT NAME, ONE ANSWER (11 Oct, full audit decision 4).
//
// Seven customers in one October week asked what name to put on the
// transfer; Neta was given a retired payee name by the model, Laura and Marta
// "Working Holiday Tax". A wrong name bounces the transfer or scares the
// customer off at the exact moment they are paying. So the answer is fixed
// text, in the customer's language, sent from the code the moment the
// question arrives (no model, no pause), and the Policy Guard refuses any
// draft that names the account differently. Jo's wording, 11 Oct: no
// explanation, just the name and the details.
// ============================================================
import type { Lang } from './i18n';

export const ACCOUNT_NAME = 'The Accounting Academy';

export const ACCOUNT_NAME_MSG: Record<Lang, string> = {
  en: `The account name is ${ACCOUNT_NAME}.\n\nBSB: 062692\nAccount: 81049952`,
  de: `Der Kontoname ist ${ACCOUNT_NAME}.\n\nBSB: 062692\nKonto: 81049952`,
  ja: `口座名義は ${ACCOUNT_NAME} です。\n\nBSB: 062692\n口座番号: 81049952`,
  es: `El nombre de la cuenta es ${ACCOUNT_NAME}.\n\nBSB: 062692\nCuenta: 81049952`,
  fr: `Le nom du compte est ${ACCOUNT_NAME}.\n\nBSB: 062692\nCompte: 81049952`,
  it: `Il nome del conto è ${ACCOUNT_NAME}.\n\nBSB: 062692\nConto: 81049952`,
  pt: `O nome da conta é ${ACCOUNT_NAME}.\n\nBSB: 062692\nConta: 81049952`,
};

export function accountNameMessage(lang?: string | null): string {
  const key = (lang && lang in ACCOUNT_NAME_MSG ? lang : 'en') as Lang;
  return ACCOUNT_NAME_MSG[key];
}

/** "What name do I put?", "Kontoname?", "口座名義は？", "the name doesn't
 *  match", "is it the right account?". Short messages only: a long message
 *  with this inside it goes to Will, who answers it all (the guard still
 *  holds the name right). */
const ACCOUNT_NAME_ASK = new RegExp([
  'account[- ]?(?:holder|owner)?\\s*name', 'name (?:of|on|for) the (?:bank )?account',
  // 21 Oct: "What's the name connected to this account?" went to Will's model, which
  // answered with the retired payee name (wrong). Any "name ... this account" is the fixed answer.
  'name (?:connected|linked|attached|associated|registered|tied|listed) (?:to|with|on) (?:this|that|the|my|your)? ?account',
  'name (?:on|for|with) (?:this|that|the) account', 'recipient(?:\'s)? name', 'payee(?:\'s)? name', 'beneficiary(?:\'s)? name',
  'what name', 'which name', 'whose name', 'name (?:do|should|can) i (?:put|use|write|enter|type)', 'name field', 'under what name', 'in whose name',
  'name (?:doesn\'?t|does not|didn\'?t|did not|don\'?t) match', 'different (?:company )?name', 'name (?:is|was) (?:not|different)', 'shows? (?:a )?different name', 'wrong name',
  'kontoname', 'kontoinhaber', 'empf[äa]nger(?:name)?', 'welcher name', 'auf welchen namen', 'name (?:stimmt|passt) nicht',
  '口座名義', '名義', '受取人', '宛名', '名前は',
  // Jo, 25 Oct (Sawada, +61 468): "アカウントネームはWorking Holiday Taxで
  // よろしかったですか？" went to the team. Katakana "account name", "口座名"
  // and "is the name Working Holiday Tax?" are the same question.
  'アカウント\\s*ネーム', 'アカウント名', '口座名', '振込先の?(?:名前|名)',
  '(?:name|名義|ネーム|名前|kontoname)[^.?!。？]{0,25}working\\s*holiday\\s*tax', 'working\\s*holiday\\s*tax[^.?!。？]{0,15}(?:で(?:よろしい|いい|大丈夫|合って)|as the (?:account )?name|for the (?:account )?name|als (?:konto)?name)',
  'nombre de (?:la )?cuenta', 'titular', 'a nombre de', 'nom du compte', 'titulaire', 'à quel nom', 'intestatario', 'nome del conto', 'nome da conta',
].join('|'), 'i');
const NOT_THIS = /\bmy name\b|\bfull name\b|\byour name\b|\bfirst name\b|\blast name\b|\bemployer\b|\bcompany name\b.*\babn\b/i;

export function isAccountNameQuestion(text: string): boolean {
  const t = (text || '').replace(/\s+/g, ' ').trim();
  if (!t || t.length > 220) return false;
  if (NOT_THIS.test(t) && !/account|konto|口座|cuenta|compte|conto|conta/i.test(t)) return false;
  return ACCOUNT_NAME_ASK.test(t);
}

/** Guard: a draft that names the account must name it right. */
const NAMES_THE_ACCOUNT = /account[- ]?(?:holder|owner)?\s*name|name (?:of|on|for) the (?:bank )?account|recipient(?:'s)? name|payee(?:'s)? name|beneficiary(?:'s)? name|registered under|kontoname|kontoinhaber|empfängername|口座名義|名義|nombre de (?:la )?cuenta|titular|nom du compte|titulaire|intestatario|nome del conto|nome da conta/i;
const WRONG_NAME_NEAR_ACCOUNT = /(?:simple tax services|working holiday tax|accounting academy services pty)[^.\n]{0,60}(?:account|konto|口座|cuenta|compte|conto|conta|transfer|überweis|振込)|(?:account[- ]?name|name (?:of|on|for) the account|recipient name|payee name|registered under|kontoname|kontoinhaber|口座名義|名義|nombre de la cuenta|titular|nom du compte|intestatario)[^.\n]{0,60}(?:simple tax services|working holiday tax|accounting academy services pty)/i;

/** Asking the CUSTOMER for their own account (for a refund) is not naming ours. */
const THEIR_ACCOUNT = /\b(?:send (?:me|us)|your (?:own )?(?:bank )?(?:account|details)|the account you (?:paid|sent|transferred) from|for the refund|refund (?:to|goes|lands)|deine kontodaten|dein konto|お客様の口座|あなたの口座|tu cuenta|ton compte|il tuo conto|a tua conta)\b/i;
export function namesAccountWrongly(text: string): boolean {
  const t = text || '';
  if (WRONG_NAME_NEAR_ACCOUNT.test(t)) return true;
  // 21 Oct: "<retired payee name> / Yes, those are the right details" slipped past the
  // rule above because the account word was missing. In a payment reply, the old
  // name is wrong whatever sentence it sits in, unless the correct name is there too.
  if (/simple tax services/i.test(t) && !t.includes(ACCOUNT_NAME) && /\b(?:bsb|account|transfer|pay|payment|bank|details|correct|right)\b/i.test(t)) return true;
  if (!NAMES_THE_ACCOUNT.test(t)) return false;
  if (THEIR_ACCOUNT.test(t) && !/account name is\b/i.test(t)) return false;
  return !t.includes(ACCOUNT_NAME);
}
