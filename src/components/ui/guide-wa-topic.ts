import { WA_NUMBER } from '@/lib/constants'
import { waUrl, type WaLang, type WaTopic } from '@/lib/wa'

/**
 * Which WhatsApp prefill a guide's category opens on. One table shared by the
 * closing CTA (GuideCta) and the mobile sticky bar on guide pages, so both
 * send the same opening message for the same guide. Plain module (no
 * 'use client') so server pages can call it.
 *
 * Oct 2026: the tax return is the core service, and a TFN or Work Rights
 * reader who taps is almost always asking about a refund, so those chats
 * open on the tax-return prefill.
 */
export const GUIDE_WA_TOPIC: Record<string, WaTopic> = {
  'TFN': 'tax-return',
  'ABN': 'abn',
  'Tax Return': 'tax-return',
  'Super': 'super',
  'Medicare & Other': 'medicare',
  'Work Rights': 'tax-return',
}

export function guideWaTopic(category: string | undefined): WaTopic {
  return (category && GUIDE_WA_TOPIC[category]) || 'guide'
}

/**
 * Dec 2026 (plan 3, r19 P1-A): problem prefills.
 *
 * A reader of a problem guide used to send the category opener plus the guide
 * title in brackets, which names nothing about their problem. For the guides
 * below the opening message names the problem instead, in the reader's own
 * language and voice. Only the message text changes: the GA4 `topic` still
 * comes from guideWaTopic(category), so tracking reports exactly what it did.
 *
 * WHT guide slugs are identical in all six languages, so one slug map serves
 * every language. Every myGov line keeps "myGov" in Latin letters, so Will's
 * myGov reassurance (MYGOV_TROUBLE_RE) matches it in every language.
 * Nothing here is a promise, a price or a claim about us: it is the customer
 * speaking.
 */
export type WaProblem =
  | 'mygov'
  | 'mygov-super'
  | 'past-years'
  | 'from-overseas'
  | 'refund-wait'
  | 'bank-closed'
  | 'amend'
  | 'no-tfn'
  | 'dasp-rejected'
  | 'dasp-stuck'
  | 'lost-super'
  | 'unpaid-super'

export const GUIDE_WA_PROBLEM: Record<string, WaProblem> = {
  // Existing guides (all six languages).
  'how-to-lodge-tax-return-from-overseas': 'from-overseas',
  'late-tax-return-penalty-working-holiday': 'past-years',
  'past-years-tax-returns-working-holiday': 'past-years',
  'amending-tax-return-australia': 'amend',
  'how-long-does-tax-refund-take-australia': 'refund-wait',
  'tax-return-without-tfn-australia': 'no-tfn',
  'dasp-rejected-what-to-do': 'dasp-rejected',
  'how-to-find-lost-superannuation': 'lost-super',
  'what-happens-to-unclaimed-super': 'lost-super',
  'super-employer-not-paying-what-to-do': 'unpaid-super',
  // New problem guides, plan 3 slug registry (r17 P1-1). The hub is mostly
  // read for the tax return, so it opens on the tax return myGov line.
  'mygov-problems-tax-return-super': 'mygov',
  'mygov-sms-code-not-received-overseas': 'mygov',
  'mygov-account-locked-out': 'mygov',
  'cant-link-ato-to-mygov': 'mygov',
  'myid-foreign-passport-working-holiday': 'mygov',
  'tax-return-without-mygov': 'mygov',
  'claim-super-without-mygov': 'mygov-super',
  'tax-refund-closed-australian-bank-account': 'bank-closed',
  'ato-tax-return-status-meaning': 'refund-wait',
  'dasp-online-application-problems': 'dasp-stuck',
  'visa-still-active-cant-claim-super': 'dasp-stuck',
}

type ProblemPhrases = Record<WaProblem, string>

const EN: ProblemPhrases = {
  'mygov':         'Hi, I can\'t access myGov. Can you help with my tax return?',
  'mygov-super':   'Hi, I can\'t access myGov. Can you help me claim my super back?',
  'past-years':    'Hi, I have not lodged my Australian tax return for one or more past years. Can you help?',
  'from-overseas': 'Hi, I have already left Australia and still need to do my Australian tax return. Can you help?',
  'refund-wait':   'Hi, I have a question about when my Australian tax refund will arrive.',
  'bank-closed':   'Hi, my Australian bank account is closed and I have a question about my tax refund.',
  'amend':         'Hi, my tax return has already been lodged and I think something in it is wrong. Can you check it?',
  'no-tfn':        'Hi, I worked without a TFN for part of the year and have a question about my tax return.',
  'dasp-rejected': 'Hi, my DASP claim was rejected and I would like to ask what to do next.',
  'dasp-stuck':    'Hi, my DASP online application will not go through and I would like to ask what to do.',
  'lost-super':    'Hi, I am not sure where all my super is and I would like to claim it back.',
  'unpaid-super':  'Hi, I think an employer did not pay my super and I would like to ask before I claim it back.',
}

// du to the reader, "ihr" to us, like the DE phrases in wa.ts.
const DE: ProblemPhrases = {
  'mygov':         'Hallo, ich komme nicht mehr in mein myGov. Könnt ihr mir trotzdem bei meiner Steuererklärung helfen?',
  'mygov-super':   'Hallo, ich komme nicht mehr in mein myGov. Könnt ihr mir trotzdem helfen, meine Super zurückzubekommen?',
  'past-years':    'Hallo, ich habe für ein oder mehrere frühere Jahre noch keine Steuererklärung gemacht. Könnt ihr helfen?',
  'from-overseas': 'Hallo, ich bin schon aus Australien abgereist und muss noch meine Steuererklärung machen. Könnt ihr helfen?',
  'refund-wait':   'Hallo, ich habe eine Frage dazu, wann meine Steuerrückerstattung kommt.',
  'bank-closed':   'Hallo, mein australisches Bankkonto ist geschlossen und ich habe eine Frage zu meiner Steuerrückerstattung.',
  'amend':         'Hallo, meine Steuererklärung ist schon eingereicht, aber ich glaube, da stimmt etwas nicht. Könnt ihr sie prüfen?',
  'no-tfn':        'Hallo, ich habe eine Zeit lang ohne TFN gearbeitet und habe eine Frage zu meiner Steuererklärung.',
  'dasp-rejected': 'Hallo, mein DASP-Antrag wurde abgelehnt. Was kann ich jetzt tun?',
  'dasp-stuck':    'Hallo, mein DASP-Antrag geht online nicht durch. Was kann ich tun?',
  'lost-super':    'Hallo, ich weiß nicht genau, wo meine ganze Super liegt, und möchte sie zurückbekommen.',
  'unpaid-super':  'Hallo, ich glaube, ein Arbeitgeber hat meine Super nicht eingezahlt. Ich würde gern fragen, bevor ich sie zurückfordere.',
}

// です・ます; "myGov" in Latin letters.
const JA: ProblemPhrases = {
  'mygov':         'こんにちは。myGovにログインできません。タックスリターンについて相談できますか？',
  'mygov-super':   'こんにちは。myGovにログインできません。スーパーアニュエーションの請求について相談できますか？',
  'past-years':    'こんにちは。過去の年度のタックスリターンをまだ提出していません。相談できますか？',
  'from-overseas': 'こんにちは。すでにオーストラリアを出国しましたが、タックスリターンがまだです。相談できますか？',
  'refund-wait':   'こんにちは。タックスリターンの還付金がいつ届くかについて質問があります。',
  'bank-closed':   'こんにちは。オーストラリアの銀行口座を解約しました。タックスリターンの還付金について相談できますか？',
  'amend':         'こんにちは。提出済みのタックスリターンに間違いがあるかもしれません。確認をお願いできますか？',
  'no-tfn':        'こんにちは。TFNがない期間に働いていました。タックスリターンについて相談したいです。',
  'dasp-rejected': 'こんにちは。DASPの申請が却下されました。次にどうすればいいか相談したいです。',
  'dasp-stuck':    'こんにちは。DASPのオンライン申請が送信できません。どうすればいいか相談したいです。',
  'lost-super':    'こんにちは。自分のスーパーがどこにあるか分かりません。請求について相談したいです。',
  'unpaid-super':  'こんにちは。雇用主がスーパーを払っていなかったかもしれません。請求する前に相談したいです。',
}

// The customer writes "je" and says "vous" to us.
const FR: ProblemPhrases = {
  'mygov':         'Bonjour, je n’arrive plus à accéder à myGov. Pouvez-vous m’aider pour ma déclaration d’impôts australienne ?',
  'mygov-super':   'Bonjour, je n’arrive plus à accéder à myGov. Pouvez-vous m’aider à récupérer ma superannuation ?',
  'past-years':    'Bonjour, je n’ai pas déposé ma déclaration australienne pour une ou plusieurs années passées. Pouvez-vous m’aider ?',
  'from-overseas': 'Bonjour, j’ai déjà quitté l’Australie et je dois encore faire ma déclaration d’impôts australienne. Pouvez-vous m’aider ?',
  'refund-wait':   'Bonjour, j’ai une question sur le délai de mon remboursement d’impôts australien.',
  'bank-closed':   'Bonjour, mon compte bancaire australien est fermé et j’ai une question sur mon remboursement d’impôts.',
  'amend':         'Bonjour, ma déclaration a déjà été déposée et je pense qu’elle contient une erreur. Pouvez-vous la vérifier ?',
  'no-tfn':        'Bonjour, j’ai travaillé une partie de l’année sans TFN et j’ai une question sur ma déclaration.',
  'dasp-rejected': 'Bonjour, ma demande de DASP a été refusée. Que puis-je faire maintenant ?',
  'dasp-stuck':    'Bonjour, ma demande de DASP en ligne ne passe pas. Que puis-je faire ?',
  'lost-super':    'Bonjour, je ne sais pas où se trouve toute ma superannuation et j’aimerais la récupérer.',
  'unpaid-super':  'Bonjour, je pense qu’un employeur n’a pas versé ma superannuation. J’aimerais poser la question avant de la réclamer.',
}

// The customer says "voi" to us, like the IT phrases in wa.ts.
const IT: ProblemPhrases = {
  'mygov':         'Ciao, non riesco più ad accedere a myGov. Potete aiutarmi lo stesso con la mia dichiarazione dei redditi australiana?',
  'mygov-super':   'Ciao, non riesco più ad accedere a myGov. Potete aiutarmi lo stesso a riavere la mia superannuation?',
  'past-years':    'Ciao, non ho presentato la dichiarazione dei redditi australiana per uno o più anni passati. Potete aiutarmi?',
  'from-overseas': 'Ciao, ho già lasciato l’Australia e devo ancora fare la dichiarazione dei redditi australiana. Potete aiutarmi?',
  'refund-wait':   'Ciao, ho una domanda sui tempi del mio rimborso fiscale australiano.',
  'bank-closed':   'Ciao, il mio conto bancario australiano è chiuso e ho una domanda sul mio rimborso fiscale.',
  'amend':         'Ciao, la mia dichiarazione è già stata presentata ma credo che ci sia un errore. Potete controllarla?',
  'no-tfn':        'Ciao, ho lavorato per un periodo senza TFN e ho una domanda sulla mia dichiarazione dei redditi.',
  'dasp-rejected': 'Ciao, la mia richiesta DASP è stata respinta. Cosa posso fare adesso?',
  'dasp-stuck':    'Ciao, la mia richiesta DASP online non va a buon fine. Cosa posso fare?',
  'lost-super':    'Ciao, non so dove sia finita tutta la mia superannuation e vorrei riaverla.',
  'unpaid-super':  'Ciao, credo che un datore di lavoro non mi abbia versato la super. Vorrei chiedervi prima di richiederla.',
}

// Neutral Spanish: the reader is not addressed, so no usted or vosotros.
const ES: ProblemPhrases = {
  'mygov':         'Hola, no puedo entrar a myGov y necesito ayuda con mi declaración de impuestos en Australia.',
  'mygov-super':   'Hola, no puedo entrar a myGov y necesito ayuda para recuperar mi superannuation.',
  'past-years':    'Hola, no presenté mi declaración de impuestos en Australia de uno o más años anteriores y necesito ayuda.',
  'from-overseas': 'Hola, ya me fui de Australia y todavía tengo que hacer mi declaración de impuestos australiana.',
  'refund-wait':   'Hola, tengo una consulta sobre cuándo llega mi devolución de impuestos en Australia.',
  'bank-closed':   'Hola, mi cuenta bancaria australiana está cerrada y tengo una consulta sobre mi devolución de impuestos.',
  'amend':         'Hola, mi declaración ya se presentó y creo que tiene un error. Me gustaría que alguien la revise.',
  'no-tfn':        'Hola, trabajé un tiempo sin TFN y tengo una consulta sobre mi declaración de impuestos.',
  'dasp-rejected': 'Hola, me rechazaron la solicitud de DASP y quiero saber qué puedo hacer ahora.',
  'dasp-stuck':    'Hola, mi solicitud de DASP en línea no se puede enviar y quiero saber qué hacer.',
  'lost-super':    'Hola, no sé dónde está toda mi superannuation y quiero recuperarla.',
  'unpaid-super':  'Hola, creo que un empleador no me pagó la super y quiero consultarlo antes de reclamarla.',
}

export const PROBLEM_PHRASES: Record<WaLang, ProblemPhrases> = { en: EN, de: DE, ja: JA, fr: FR, it: IT, es: ES }

export function guideWaProblem(slug: string | undefined): WaProblem | undefined {
  return slug ? GUIDE_WA_PROBLEM[slug] : undefined
}

/**
 * The prefilled WhatsApp link for a guide CTA. A guide with a mapped problem
 * opens on that problem's message (no title appended); every other guide keeps
 * today's message: the category opener plus the guide title. Pair it with
 * guideWaTopic(category) for tracking, which is unchanged.
 */
export function guideWaUrl({
  category,
  slug,
  lang = 'en',
  title,
}: {
  category: string | undefined
  slug?: string
  lang?: WaLang
  title?: string
}): string {
  const problem = guideWaProblem(slug)
  const text = problem ? (PROBLEM_PHRASES[lang] ?? PROBLEM_PHRASES.en)[problem] : undefined
  if (text) return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`
  return waUrl({ topic: guideWaTopic(category), lang, detail: title })
}
