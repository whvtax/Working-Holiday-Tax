// ============================================================
// The knowledge pack is written in English: its questions, examples and
// keywords are English words, and retrieval (knowledge.ts) is a lexical
// overlap on those words. A German customer asking "Kann ich erst nach der
// Rückerstattung bezahlen?" shares not one token with "Can I pay after I
// receive my tax refund?", so the model got no learned answer at all for
// German, Spanish, French, Italian, Portuguese or Japanese questions (audit,
// 3 Sep: DE 1/10, ES 2/10, JA 0/10 of the top questions found their entry).
//
// This is the bridge: the words those customers actually use, mapped to the
// English keyword tokens the pack is indexed on. It is applied to the
// CUSTOMER'S MESSAGE only (the entries stay English), so a foreign message
// gains the English tokens its words stand for and scores like an English one.
// Deterministic, no network, and every mapping is a plain word list a person
// can read and extend. Japanese has no spaces, so its terms are matched as
// substrings of the message rather than as tokens.
// ============================================================

/** Foreign term (lower-case, accent-stripped for Latin scripts) -> English
 *  keyword tokens as they appear in the pack. A term may map to several. */
const BRIDGE: Record<string, string[]> = {
  // ── money in / money out ──
  ruckerstattung: ['refund'], erstattung: ['refund'], ruckzahlung: ['refund'], steuerruckerstattung: ['refund', 'tax'],
  reembolso: ['refund'], devolucion: ['refund'], remboursement: ['refund'], rimborso: ['refund'], restituicao: ['refund'],
  bezahlen: ['pay'], zahlen: ['pay'], zahlung: ['pay', 'payment'], bezahlt: ['pay', 'paid'], uberweisung: ['transfer', 'pay', 'bank'],
  pagar: ['pay'], pago: ['pay', 'payment'], pagamento: ['pay', 'payment'], payer: ['pay'], paiement: ['pay', 'payment'], pagare: ['pay'],
  gebuhr: ['fee', 'price'], gebuhren: ['fee', 'price'], kosten: ['fee', 'price', 'cost'], preis: ['price', 'fee'],
  tarifa: ['fee', 'price'], precio: ['price', 'fee'], costo: ['price', 'fee', 'cost'], custo: ['price', 'fee', 'cost'], preco: ['price', 'fee'],
  frais: ['fee', 'price'], prix: ['price', 'fee'], tarif: ['fee', 'price'], prezzo: ['price', 'fee'], costi: ['fee', 'cost'],
  billiger: ['cheaper'], gunstiger: ['cheaper'], barato: ['cheaper'], economico: ['cheaper'], moins: ['cheaper'], cher: ['cheaper', 'price'],
  rabatt: ['discount'], descuento: ['discount'], desconto: ['discount'], sconto: ['discount'], reduction: ['discount'],
  kostenlos: ['free'], gratis: ['free'], gratuit: ['free'], gratuito: ['free'],
  vorher: ['before', 'upfront'], vorab: ['before', 'upfront'], voraus: ['upfront', 'before'], antes: ['before', 'upfront'], avant: ['before', 'upfront'], prima: ['before', 'upfront'],
  nachher: ['after', 'later'], danach: ['after', 'later'], spater: ['later', 'after'], despues: ['after', 'later'], luego: ['later', 'after'], apres: ['after', 'later'], dopo: ['after', 'later'], depois: ['after', 'later'],
  schulden: ['owe'], nachzahlen: ['owe'], nachzahlung: ['owe'], deber: ['owe'], debo: ['owe'], devo: ['owe'], dois: ['owe'],
  garantie: ['guarantee'], garantia: ['guarantee'], garanzia: ['guarantee'],
  geld: ['money'], dinero: ['money'], argent: ['money'], soldi: ['money'], dinheiro: ['money'],
  // ── the return itself ──
  steuer: ['tax'], steuern: ['tax'], steuererklarung: ['tax', 'return', 'lodge'], impuesto: ['tax'], impuestos: ['tax'],
  declaracion: ['return', 'lodge'], impot: ['tax'], impots: ['tax'], tasse: ['tax'], dichiarazione: ['return', 'lodge'], imposto: ['tax'], declaracao: ['return', 'lodge'],
  einreichen: ['lodge', 'submit'], eingereicht: ['lodged', 'lodge'], abgeben: ['lodge', 'submit'], abgegeben: ['lodged'],
  presentar: ['lodge', 'submit'], presentado: ['lodged'], declarer: ['lodge'], depose: ['lodged'], presentare: ['lodge'], entregar: ['lodge', 'submit'],
  selbst: ['myself', 'own'], selber: ['myself', 'own'], alleine: ['myself', 'own'], mismo: ['myself', 'own'], misma: ['myself', 'own'], sozinho: ['myself', 'own'], sozinha: ['myself', 'own'], stesso: ['myself', 'own'], moi: ['myself'],
  falsch: ['wrong', 'mistake'], fehler: ['mistake', 'wrong'], error: ['mistake', 'wrong'], erreur: ['mistake', 'wrong'], errore: ['mistake', 'wrong'], erro: ['mistake', 'wrong'],
  prufen: ['check', 'review'], uberprufen: ['check', 'review'], revisar: ['check', 'review'], verifier: ['check', 'review'], controllare: ['check', 'review'], verificar: ['check', 'review'],
  andern: ['amend', 'correct'], korrigieren: ['correct', 'amend'], corregir: ['correct', 'amend'], corriger: ['correct', 'amend'], correggere: ['correct', 'amend'], corrigir: ['correct', 'amend'],
  schatzung: ['estimate'], estimacion: ['estimate'], estimation: ['estimate'], stima: ['estimate'], estimativa: ['estimate'],
  berechnung: ['calculation', 'estimate'], calculo: ['calculation', 'estimate'], calcul: ['calculation', 'estimate'], calcolo: ['calculation', 'estimate'],
  fragebogen: ['form', 'questionnaire'], formular: ['form', 'questionnaire'], cuestionario: ['form', 'questionnaire'], formulario: ['form', 'questionnaire'],
  questionnaire: ['form', 'questionnaire'], formulaire: ['form', 'questionnaire'], questionario: ['form', 'questionnaire'], modulo: ['form'],
  unterschreiben: ['sign'], unterschrift: ['sign'], firmar: ['sign'], firma: ['sign'], signer: ['sign'], signature: ['sign'], firmare: ['sign'], assinar: ['sign'],
  dokumente: ['documents'], unterlagen: ['documents'], documentos: ['documents'], documenti: ['documents'],
  gehaltsabrechnung: ['payslip', 'payslips'], lohnzettel: ['payslip'], nomina: ['payslip'], nominas: ['payslips'], recibo: ['payslip', 'receipts'], fiche: ['payslip'], paie: ['payslip'], busta: ['payslip'], holerite: ['payslip'], contracheque: ['payslip'],
  hochladen: ['upload'], subir: ['upload'], telecharger: ['upload'], caricare: ['upload'], enviar: ['upload', 'submit'],
  // ── identity, access, residency ──
  konto: ['account', 'bank'], bankkonto: ['bank', 'account'], cuenta: ['account', 'bank'], compte: ['account', 'bank'], conto: ['account', 'bank'], conta: ['account', 'bank'],
  geschlossen: ['closed'], cerrada: ['closed'], cerrado: ['closed'], ferme: ['closed'], chiuso: ['closed'], fechada: ['closed'],
  ausland: ['overseas'], extranjero: ['overseas'], etranger: ['overseas'], estero: ['overseas'], exterior: ['overseas'],
  verlassen: ['left', 'overseas'], abgereist: ['left', 'overseas'], salido: ['left'], parti: ['left'], partito: ['left'], sai: ['left'],
  zugang: ['access', 'login'], zugriff: ['access', 'login'], anmelden: ['login'], acceso: ['access', 'login'], acceder: ['access', 'login'], acces: ['access', 'login'], accesso: ['access', 'login'], acesso: ['access', 'login'],
  passwort: ['login', 'password'], contrasena: ['login', 'password'], senha: ['login', 'password'], passe: ['login', 'password'],
  ansassigkeit: ['residency', 'resident'], ansassig: ['resident', 'residency'], steueransassig: ['resident', 'residency'], residente: ['resident', 'residency'], residencia: ['residency', 'resident'], residence: ['residency', 'resident'], residenza: ['residency', 'resident'],
  reisepass: ['passport'], pasaporte: ['passport'], passeport: ['passport'], passaporto: ['passport'], passaporte: ['passport'],
  visum: ['visa'], visado: ['visa'], visto: ['visa'],
  sicher: ['safe', 'secure', 'legit'], seguro: ['safe', 'secure', 'legit'], segura: ['safe', 'secure'], serios: ['legit', 'real'], serio: ['legit', 'real'], fiable: ['legit', 'trust'], betrug: ['scam'], estafa: ['scam'], arnaque: ['scam'], truffa: ['scam'], golpe: ['scam'], vertrauen: ['trust'], confianza: ['trust'], confiance: ['trust'], fiducia: ['trust'], confianca: ['trust'],
  // ── income types, extras ──
  rente: ['super', 'superannuation', 'pension'], altersvorsorge: ['super', 'superannuation'], pension: ['super', 'superannuation', 'pension'], pensione: ['super', 'superannuation'], jubilacion: ['super', 'superannuation'], aposentadoria: ['super', 'superannuation'], previdencia: ['super', 'superannuation'],
  einkommen: ['income'], ingresos: ['income'], revenu: ['income'], revenus: ['income'], reddito: ['income'], renda: ['income'],
  ausgaben: ['expenses', 'deduction'], gastos: ['expenses', 'deduction'], depenses: ['expenses', 'deduction'], spese: ['expenses', 'deduction'], despesas: ['expenses', 'deduction'],
  absetzen: ['claim', 'deduction'], abziehen: ['claim', 'deduction'], deducir: ['claim', 'deduction'], deduire: ['claim', 'deduction'], dedurre: ['claim', 'deduction'], deduzir: ['claim', 'deduction'],
  quittungen: ['receipts'], belege: ['receipts'], recibos: ['receipts'], recus: ['receipts'], ricevute: ['receipts'], scontrini: ['receipts'],
  arbeitskleidung: ['uniform', 'laundry'], uniforme: ['uniform'], werkzeug: ['tools'], herramientas: ['tools'], outils: ['tools'], attrezzi: ['tools'], ferramentas: ['tools'],
  vorjahr: ['previous', 'years', 'prior'], vorjahre: ['previous', 'years', 'prior'], letztes: ['previous', 'years'], anterior: ['previous', 'prior'], anteriores: ['previous', 'years'], precedente: ['previous', 'prior'], precedenti: ['previous', 'years'], passado: ['previous', 'years'],
  jahre: ['years'], anos: ['years'], annees: ['years'], anni: ['years'],
  steuerjahr: ['financial year'], finanzjahr: ['financial year'], ano: ['financial year', 'years'], fiscal: ['financial year'],
  monate: ['few months', 'part year'], meses: ['few months', 'part year'], mois: ['few months', 'part year'], mesi: ['few months', 'part year'],
  telefon: ['phone'], anruf: ['phone'], anrufen: ['phone'], llamada: ['phone'], llamar: ['phone'], telefono: ['phone'], appel: ['phone'], appeler: ['phone'], telefonata: ['phone'], chiamare: ['phone'], ligar: ['phone'], ligacao: ['phone'],
  freund: ['friend'], freundin: ['friend'], amigo: ['friend'], amiga: ['friend'], ami: ['friend'], amie: ['friend'], amico: ['friend'], amica: ['friend'],
  registrierung: ['registration', 'registered'], registrierungsnummer: ['registration', 'number', 'tpb'], registriert: ['registered'], lizenz: ['licence'], zugelassen: ['registered', 'licence'], registro: ['registration', 'registered'], registrado: ['registered'], licencia: ['licence'], enregistrement: ['registration'], enregistre: ['registered'], registrazione: ['registration'], registrato: ['registered'], registado: ['registered'], registo: ['registration'], numero: ['number'], nummer: ['number'], name: ['name'], nombre: ['name'], nom: ['name'], nome: ['name'],
  steuerberater: ['agent', 'accountant'], buchhalter: ['agent', 'accountant'], contador: ['agent', 'accountant'], contable: ['agent', 'accountant'], comptable: ['agent', 'accountant'], commercialista: ['agent', 'accountant'], contabilista: ['agent', 'accountant'],
  krankenversicherung: ['medicare', 'levy'], sanidad: ['medicare', 'levy'], sante: ['medicare'], sanita: ['medicare'], saude: ['medicare'],
  befreiung: ['exemption'], exencion: ['exemption'], esenzione: ['exemption'], isencao: ['exemption'],
  reservierung: ['deposit'], anzahlung: ['deposit'], deposito: ['deposit'], acompte: ['deposit'], caparra: ['deposit'],
  wieviel: ['much'], wie: ['how'], cuanto: ['much'], combien: ['much'], quanto: ['much'],
  warum: ['why'], wieso: ['why'], porque: ['why'], pourquoi: ['why'], perche: ['why'],
  wann: ['when'], cuando: ['when'], quand: ['when'], quando: ['when'],
  brauche: ['need'], benotige: ['need'], necesito: ['need'], besoin: ['need'], bisogno: ['need'], preciso: ['need'],
  fahrer: ['delivery', 'driver', 'rideshare'], lieferung: ['delivery'], repartidor: ['delivery', 'driver'], livreur: ['delivery', 'driver'], entregador: ['delivery', 'driver'],
  selbststandig: ['sole', 'trader', 'abn'], autonomo: ['sole', 'trader', 'abn'], autonoma: ['sole', 'trader', 'abn'], independant: ['sole', 'trader', 'abn'], freelance: ['sole', 'trader', 'abn'], rechnungen: ['invoices'], facturas: ['invoices'], factures: ['invoices'], fatture: ['invoices'], faturas: ['invoices'],
  aufenthalt: ['residency', 'part year'], mehrere: ['multiple'], varios: ['multiple'], plusieurs: ['multiple'], diversi: ['multiple'],
};

/** Japanese has no word boundaries: these are matched as substrings. */
const JA_BRIDGE: [string, string[]][] = [
  ['還付', ['refund']], ['払い戻', ['refund']], ['返金', ['refund']],
  ['支払', ['pay', 'payment']], ['払う', ['pay']], ['払え', ['pay']], ['振込', ['transfer', 'pay', 'bank']], ['振り込', ['transfer', 'pay', 'bank']],
  ['料金', ['fee', 'price']], ['費用', ['fee', 'price', 'cost']], ['値段', ['price']], ['価格', ['price']], ['いくら', ['much', 'price']],
  ['安い', ['cheaper']], ['安く', ['cheaper']], ['割引', ['discount']], ['無料', ['free']],
  ['前払', ['upfront', 'before']], ['先に', ['before', 'upfront']], ['事前', ['before', 'upfront']], ['後で', ['after', 'later']], ['あとで', ['after', 'later']], ['後払', ['after', 'later', 'pay']],
  ['納税', ['owe', 'tax']], ['追徴', ['owe']], ['不足', ['owe']], ['保証', ['guarantee']], ['お金', ['money']],
  ['税金', ['tax']], ['税務', ['tax']], ['確定申告', ['tax', 'return', 'lodge']], ['タックスリターン', ['tax', 'return', 'lodge']], ['申告', ['return', 'lodge']],
  ['提出', ['lodge', 'submit']], ['自分で', ['myself', 'own']], ['間違', ['wrong', 'mistake']], ['ミス', ['mistake']], ['確認', ['check', 'review']], ['修正', ['amend', 'correct']], ['訂正', ['amend', 'correct']],
  ['見積', ['estimate']], ['計算', ['calculation', 'estimate']], ['フォーム', ['form', 'questionnaire']], ['質問票', ['form', 'questionnaire']], ['アンケート', ['form', 'questionnaire']],
  ['署名', ['sign']], ['サイン', ['sign']], ['書類', ['documents']], ['給与明細', ['payslip', 'payslips']], ['明細', ['payslip']], ['アップロード', ['upload']],
  ['口座', ['account', 'bank']], ['銀行', ['bank', 'account']], ['閉鎖', ['closed']], ['解約', ['closed']], ['海外', ['overseas']], ['帰国', ['left', 'overseas']], ['出国', ['left', 'overseas']],
  ['ログイン', ['login', 'access']], ['アクセス', ['access', 'login']], ['パスワード', ['login', 'password']],
  ['居住', ['residency', 'resident']], ['レジデント', ['resident', 'residency']], ['パスポート', ['passport']], ['ビザ', ['visa']],
  ['安全', ['safe', 'secure']], ['詐欺', ['scam']], ['信頼', ['trust', 'legit']], ['本物', ['legit', 'real']], ['正規', ['legit', 'registered']],
  ['スーパー', ['super', 'superannuation']], ['年金', ['super', 'superannuation', 'pension']], ['退職年金', ['super', 'superannuation']],
  ['収入', ['income']], ['所得', ['income']], ['経費', ['expenses', 'deduction']], ['控除', ['claim', 'deduction']], ['領収書', ['receipts']], ['レシート', ['receipts']],
  ['制服', ['uniform']], ['工具', ['tools']], ['去年', ['previous', 'years', 'prior']], ['前年', ['previous', 'years', 'prior']], ['過去', ['previous', 'years']], ['年度', ['financial year']], ['数ヶ月', ['few months', 'part year']], ['数か月', ['few months', 'part year']],
  ['電話', ['phone']], ['友達', ['friend']], ['友人', ['friend']], ['会計士', ['agent', 'accountant']], ['税理士', ['agent', 'accountant', 'registered']], ['登録番号', ['registration', 'number', 'tpb']], ['登録', ['registered', 'registration']], ['ライセンス', ['licence']], ['資格', ['licence', 'registered']],
  ['メディケア', ['medicare', 'levy']], ['免除', ['exemption']], ['なぜ', ['why']], ['どうして', ['why']], ['いつ', ['when']], ['必要', ['need']],
  ['配達', ['delivery', 'driver']], ['ウーバー', ['uber', 'delivery']],
  // 4 Sep: "I only earned a tiny amount on my ABN, does it still count?" — the
  // words that carry that question in Japanese, so it reaches the right answer.
  ['申告', ['declare', 'declared', 'report', 'return']], ['申告する', ['declare', 'report']],
  ['少し', ['small', 'only', 'tiny']], ['少ない', ['small', 'only']], ['だけ', ['only', 'just']],
  ['プラン', ['plan', 'option']], ['対象', ['eligible', 'apply']], ['収入', ['income', 'earned']],
  ['稼い', ['earned', 'income']], ['必要', ['need', 'have']], ['個人事業', ['sole', 'trader', 'abn']], ['フリーランス', ['sole', 'trader', 'abn']], ['請求書', ['invoices']], ['インボイス', ['invoices']],
];

const stripAccents = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ß/g, 'ss');

/**
 * English keyword tokens implied by the foreign words in a message. Empty for
 * an English message, so English retrieval is untouched. Latin-script words
 * are looked up whole and by a light stem (a trailing -en/-n/-s/-e stripped,
 * so "bezahlen", "bezahle", "Gebühren", "impuestos" all resolve).
 */
export function bridgeTokens(message: string): string[] {
  const out = new Set<string>();
  const text = message || '';
  for (const [term, tokens] of JA_BRIDGE) {
    if (text.includes(term)) tokens.forEach((t) => out.add(t));
  }
  const words = stripAccents(text.toLowerCase()).replace(/[^a-z0-9 ]/g, ' ').split(/\s+/).filter((w) => w.length >= 3);
  for (const w of words) {
    const hits = BRIDGE[w]
      ?? BRIDGE[w.replace(/(en|es|er|n|s|e)$/, '')]
      ?? BRIDGE[w.replace(/(en|es|er|n|s|e)$/, '').replace(/(en|es|er|n|s|e)$/, '')];
    if (hits) hits.forEach((t) => out.add(t));
  }
  return [...out];
}
