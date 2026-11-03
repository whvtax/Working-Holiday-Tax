'use client'

import { waUrl, type WaLang, type WaTopic } from '@/lib/wa'
import { trackGuideCta, trackWhatsApp } from '@/lib/analytics'

type Category = 'TFN' | 'ABN' | 'Tax Return' | 'Super' | 'Work Rights' | 'Medicare & Other'

/**
 * The block that closes every guide.
 *
 * Until now the 393 guide pages carried no conversion path at all, in any
 * language, while taking well over half of the site's organic clicks. A reader
 * finished an article and the only two links offered sent them sideways into
 * more free reading.
 *
 * It is deliberately category aware. Somebody who has just read about unfair
 * dismissal is usually not a tax prospect, and pitching them a tax review reads
 * as noise, so Work Rights gets a quieter, more honest close than Super does.
 *
 * Nothing here quotes a price, promises an amount, or manufactures urgency. The
 * pull is the true one: the guide explains the rule, and the rule lands
 * differently depending on facts only a person can weigh.
 */

interface Copy {
  eyebrow: string
  heading: string
  body: string
  cta: string
  under: string
}

const EN: Record<Category, Copy> = {
  'TFN': {
    eyebrow: 'Before you file',
    heading: 'The TFN is the easy part.',
    body: 'What it costs you is the weeks before it reached your employer, when tax came off at the top rate instead of fifteen. That does not correct itself. Tell us where you worked and we will tell you what your year actually looks like.',
    cta: 'Ask about your situation',
    under: 'Replies in about an hour.',
  },
  'ABN': {
    eyebrow: 'Before you file',
    heading: 'An ABN changes what your return has to say.',
    body: 'Invoiced income, business expenses and a GST position all sit differently to wages, and getting the split wrong is the most common reason a backpacker return gets reworked. Send us what you did and we will work out where you stand.',
    cta: 'Ask about your situation',
    under: 'Replies in about an hour.',
  },
  'Tax Return': {
    eyebrow: 'Before you file',
    heading: 'Anyone can press submit.',
    body: 'The work happens before that: your residency position, the weeks withheld at the wrong rate, the Medicare exemption, and the deductions that belong to the work you actually did. That is what decides the number.',
    cta: 'Message us on WhatsApp',
    under: 'Replies in about an hour.',
  },
  'Super': {
    eyebrow: 'Before you claim',
    heading: 'Most people have more than one fund.',
    body: 'Casual and seasonal work scatters super across accounts, and a DASP claim made from the wrong one, at the wrong time, or with the wrong paperwork gets held up or comes back short. We find all of them under your TFN and lodge it once.',
    cta: 'Ask about your super',
    under: 'Replies in about an hour.',
  },
  'Medicare & Other': {
    eyebrow: 'Worth checking',
    heading: 'The levy comes off by default.',
    // The closing sentence said twice over what the button already says, so
    // it is gone. Nothing else in this block changed.
    body: 'Whether you ever owed it depends on your passport rather than your visa. Some nationalities are entitled to Medicare and do pay it; others are not entitled and can be exempted, which needs a statement you have to apply for. People assume wrong in both directions.',
    cta: 'Check whether it applies to you',
    under: 'Replies in about an hour.',
  },
  'Work Rights': {
    eyebrow: 'While you are here',
    heading: 'Working holiday tax is the only thing we do.',
    body: 'If anything above touched your pay, your hours or your visa, it usually shows up in your tax return too. When you are ready to lodge, or if you just want to know where you stand, we are on WhatsApp.',
    cta: 'Ask us a question',
    under: 'Replies in about an hour. No obligation to go further.',
  },
}

const DE: Record<Category, Copy> = {
  'TFN': {
    eyebrow: 'Bevor du einreichst',
    heading: 'Die TFN ist der einfache Teil.',
    body: 'Teuer werden die Wochen davor, in denen dein Arbeitgeber zum Höchstsatz statt zu fünfzehn Prozent einbehalten hat. Das korrigiert sich nicht von selbst. Sag uns, wo du gearbeitet hast, und wir sagen dir, wie dein Jahr wirklich aussieht.',
    cta: 'Frag zu deiner Situation',
    under: 'Antwort in etwa einer Stunde.',
  },
  'ABN': {
    eyebrow: 'Bevor du einreichst',
    heading: 'Eine ABN verändert deine Steuererklärung.',
    body: 'Rechnungseinkommen, Betriebsausgaben und die GST-Frage funktionieren anders als Lohn. Eine falsche Aufteilung ist der häufigste Grund, warum eine Erklärung neu gemacht werden muss. Schick uns, was du gemacht hast.',
    cta: 'Frag zu deiner Situation',
    under: 'Antwort in etwa einer Stunde.',
  },
  'Tax Return': {
    eyebrow: 'Bevor du einreichst',
    heading: 'Absenden kann jeder.',
    body: 'Die Arbeit passiert davor: deine Steuerresidenz, die Wochen mit dem falschen Steuersatz, die Medicare-Befreiung und die Abzüge, die zu deiner echten Arbeit gehören. Das entscheidet über den Betrag.',
    cta: 'Schreib uns auf WhatsApp',
    under: 'Antwort in etwa einer Stunde.',
  },
  'Super': {
    eyebrow: 'Bevor du beantragst',
    heading: 'Die meisten haben mehr als einen Fonds.',
    body: 'Saison- und Gelegenheitsarbeit verteilt deine Super auf mehrere Konten. Ein DASP-Antrag vom falschen Konto, zum falschen Zeitpunkt oder mit den falschen Unterlagen wird verzögert oder fällt zu niedrig aus. Wir finden alle über deine TFN.',
    cta: 'Frag zu deiner Super',
    under: 'Antwort in etwa einer Stunde.',
  },
  'Medicare & Other': {
    eyebrow: 'Prüfenswert',
    heading: 'Die Levy wird standardmäßig abgezogen.',
    body: 'Ob du sie überhaupt geschuldet hast, hängt von deinem Pass ab, nicht von deinem Visum. Manche Nationalitäten haben Anspruch auf Medicare und zahlen die Levy; andere nicht und können befreit werden, wofür eine Bescheinigung nötig ist. Mit Annahmen liegt man hier in beide Richtungen oft falsch.',
    cta: 'Prüfen lassen, ob es für dich gilt',
    under: 'Antwort in etwa einer Stunde.',
  },
  'Work Rights': {
    eyebrow: 'Solange du hier bist',
    heading: 'Wir machen ausschließlich Working-Holiday-Steuer.',
    body: 'Wenn etwas davon deinen Lohn, deine Stunden oder dein Visum betrifft, taucht es meistens auch in deiner Steuererklärung auf. Wenn du so weit bist, oder einfach wissen willst, wo du stehst, sind wir auf WhatsApp.',
    cta: 'Stell uns eine Frage',
    under: 'Antwort in ca. einer Stunde. Ganz unverbindlich.',
  },
}

const JA: Record<Category, Copy> = {
  'TFN': {
    eyebrow: '申告の前に',
    heading: 'TFNの取得は簡単な部分です。',
    body: '負担になるのは、雇用主にTFNが届く前の期間です。15%ではなく最高税率で源泉徴収されていて、これは自動では戻りません。どこで働いたか教えていただければ、あなたの1年が実際どうなっているかお伝えします。',
    cta: '自分の状況を相談する',
    under: '約1時間で返信します。',
  },
  'ABN': {
    eyebrow: '申告の前に',
    heading: 'ABNがあると申告の内容が変わります。',
    body: '請求による収入、事業経費、GSTの扱いは給与とは別物です。この切り分けを誤ることが、ワーホリのタックスリターンをやり直す最も多い原因です。何をしたか送ってください。',
    cta: '自分の状況を相談する',
    under: '約1時間で返信します。',
  },
  'Tax Return': {
    eyebrow: '申告の前に',
    heading: '送信ボタンは誰でも押せます。',
    body: '大事なのはその前です。税務上の居住区分、誤った税率で引かれていた期間、メディケア税の免除、そして実際にした仕事に対応する控除。それが金額を決めます。',
    cta: 'WhatsAppで相談する',
    under: '約1時間で返信します。',
  },
  'Super': {
    eyebrow: '請求の前に',
    heading: '複数のファンドがある人がほとんどです。',
    body: 'カジュアルや季節労働では、スーパーが複数の口座に分散します。間違った口座から、間違ったタイミングで、書類が不足したままDASPを申請すると、遅れるか金額が不足します。TFNから全て探して一度で申請します。',
    cta: 'スーパーについて相談する',
    under: '約1時間で返信します。',
  },
  'Medicare & Other': {
    eyebrow: '確認する価値があります',
    heading: 'メディケア税は自動的に引かれます。',
    body: '実際に支払う義務があったかどうかは、ビザではなくパスポートで決まります。国籍によってメディケアの対象となり実際に支払う人もいれば、対象外で免除を受けられる人もいて、免除には証明書が必要です。思い込みで判断すると、どちらの方向でも外れることがあります。',
    cta: '対象かどうか確認する',
    under: '約1時間で返信します。',
  },
  'Work Rights': {
    eyebrow: '滞在中に',
    heading: 'ワーキングホリデーの税金だけを扱っています。',
    body: '給与、労働時間、ビザに関わることは、たいていタックスリターンにも表れます。申告の準備ができたとき、あるいは今の状況を知りたいときは、WhatsAppでどうぞ。',
    cta: '質問する',
    under: '約1時間で返信します。その先に進む義務はありません。',
  },
}

const FR: Record<Category, Copy> = {
  'TFN': {
    eyebrow: 'Avant de déposer',
    heading: "Le TFN, c'est la partie facile.",
    body: "Ce qui coûte, ce sont les semaines avant qu'il arrive chez votre employeur, quand l'impôt est retenu au taux maximal au lieu de quinze pour cent. Cela ne se corrige pas tout seul. Dites-nous où vous avez travaillé et nous vous dirons où en est votre année.",
    cta: 'Poser une question sur ma situation',
    under: 'Réponse en environ une heure.',
  },
  'ABN': {
    eyebrow: 'Avant de déposer',
    heading: 'Un ABN change ce que votre tax return doit dire.',
    body: "Les revenus facturés, les frais professionnels et la GST ne se traitent pas comme un salaire, et une mauvaise répartition est la première raison pour laquelle la tax return d'un backpacker doit être refaite. Envoyez-nous ce que vous avez fait et nous verrons où vous en êtes.",
    cta: 'Poser une question sur ma situation',
    under: 'Réponse en environ une heure.',
  },
  'Tax Return': {
    eyebrow: 'Avant de déposer',
    heading: 'Tout le monde sait cliquer sur «\xa0Envoyer\xa0».',
    body: "Le vrai travail se fait avant\xa0: votre résidence fiscale, les semaines retenues au mauvais taux, l'exemption de la Medicare levy et les déductions qui correspondent au travail que vous avez réellement fait. C'est cela qui détermine le montant.",
    cta: 'Nous écrire sur WhatsApp',
    under: 'Réponse en environ une heure.',
  },
  'Super': {
    eyebrow: 'Avant de réclamer',
    heading: "La plupart des gens ont plus d'une caisse.",
    body: 'Le travail casual et saisonnier éparpille la super sur plusieurs comptes, et une demande de DASP faite depuis le mauvais compte, au mauvais moment ou avec les mauvais papiers prend du retard ou revient plus basse. Nous retrouvons toutes vos caisses grâce à votre TFN et déposons la demande une seule fois.',
    cta: 'Poser une question sur ma super',
    under: 'Réponse en environ une heure.',
  },
  'Medicare & Other': {
    eyebrow: 'À vérifier',
    heading: 'La levy est retenue par défaut.',
    body: "Savoir si vous la deviez vraiment dépend de votre passeport, pas de votre visa. Certaines nationalités ont droit à Medicare et la paient\xa0; d'autres n'y ont pas droit et peuvent être exemptées, ce qui exige une attestation qu'il faut demander. On se trompe dans les deux sens.",
    cta: 'Vérifier si cela vous concerne',
    under: 'Réponse en environ une heure.',
  },
  'Work Rights': {
    eyebrow: 'Pendant que vous êtes là',
    heading: "Les impôts des working holiday makers, c'est notre seul métier.",
    body: 'Si un point ci-dessus touche votre paie, vos heures ou votre visa, il se retrouve souvent dans votre tax return aussi. Quand vous serez prêt à déposer, ou si vous voulez simplement savoir où vous en êtes, nous sommes sur WhatsApp.',
    cta: 'Poser une question',
    under: "Réponse en environ une heure. Aucune obligation d'aller plus loin.",
  },
}

const IT: Record<Category, Copy> = {
  'TFN': {
    eyebrow: 'Prima di presentare',
    heading: 'Il TFN è la parte facile.',
    body: "A costare sono le settimane prima che arrivi al datore di lavoro, quando le imposte vengono trattenute all'aliquota massima invece che al quindici per cento. Non si sistema da sola. Dicci dove hai lavorato e ti diciamo a che punto è il tuo anno.",
    cta: 'Chiedi della tua situazione',
    under: "Risposta in circa un'ora.",
  },
  'ABN': {
    eyebrow: 'Prima di presentare',
    heading: 'Con un ABN cambia quello che la tua tax return deve dire.',
    body: 'Redditi fatturati, spese di attività e GST funzionano in modo diverso dallo stipendio, e sbagliare la divisione è il motivo più frequente per cui la tax return di un backpacker va rifatta. Mandaci quello che hai fatto e capiamo a che punto sei.',
    cta: 'Chiedi della tua situazione',
    under: "Risposta in circa un'ora.",
  },
  'Tax Return': {
    eyebrow: 'Prima di presentare',
    heading: 'Premere invio lo sanno fare tutti.',
    body: "Il lavoro vero viene prima: la tua residenza fiscale, le settimane trattenute con l'aliquota sbagliata, l'esenzione dalla Medicare levy e le detrazioni che corrispondono al lavoro che hai davvero fatto. È questo che decide la cifra.",
    cta: 'Scrivici su WhatsApp',
    under: "Risposta in circa un'ora.",
  },
  'Super': {
    eyebrow: 'Prima di richiedere',
    heading: 'La maggior parte delle persone ha più di un fondo.',
    body: 'Il lavoro casual e stagionale sparge la super su più conti, e una richiesta DASP fatta dal conto sbagliato, al momento sbagliato o con i documenti sbagliati si blocca o torna più bassa. Troviamo tutti i fondi con il tuo TFN e presentiamo la richiesta una sola volta.',
    cta: 'Chiedi della tua super',
    under: "Risposta in circa un'ora.",
  },
  'Medicare & Other': {
    eyebrow: 'Da controllare',
    heading: 'La levy viene trattenuta di default.',
    body: 'Se la dovevi davvero dipende dal tuo passaporto, non dal visto. Alcune nazionalità hanno diritto a Medicare e la pagano; altre non ne hanno diritto e possono essere esentate, cosa che richiede un certificato da richiedere a parte. Si sbaglia in entrambe le direzioni.',
    cta: 'Verifica se vale per te',
    under: "Risposta in circa un'ora.",
  },
  'Work Rights': {
    eyebrow: 'Già che sei qui',
    heading: 'Ci occupiamo solo di tasse per chi è in working holiday.',
    body: 'Se quello che hai letto riguarda la tua paga, le tue ore o il tuo visto, di solito si ritrova anche nella tua tax return. Quando è il momento di presentarla, o se vuoi solo sapere a che punto sei, siamo su WhatsApp.',
    cta: 'Facci una domanda',
    under: "Risposta in circa un'ora. Nessun obbligo di andare oltre.",
  },
}

const ES: Record<Category, Copy> = {
  'TFN': {
    eyebrow: 'Antes de presentar',
    heading: 'El TFN es la parte fácil.',
    body: 'Lo que cuesta son las semanas antes de que llegue a tu empleador, cuando el impuesto se retiene a la tasa máxima en lugar del quince por ciento. Eso no se corrige solo. Cuéntanos dónde trabajaste y te decimos en qué punto está tu año.',
    cta: 'Consúltanos sobre tu situación',
    under: 'Respuesta en aproximadamente una hora.',
  },
  'ABN': {
    eyebrow: 'Antes de presentar',
    heading: 'Un ABN cambia lo que tiene que decir tu tax return.',
    body: 'Los ingresos facturados, los gastos del negocio y la GST se tratan distinto que un sueldo, y repartirlos mal es la razón más común por la que hay que rehacer la tax return de un backpacker. Cuéntanos qué hiciste y vemos en qué punto estás.',
    cta: 'Consúltanos sobre tu situación',
    under: 'Respuesta en aproximadamente una hora.',
  },
  'Tax Return': {
    eyebrow: 'Antes de presentar',
    heading: 'Enviar el formulario lo hace cualquiera.',
    body: 'El trabajo está antes: tu residencia fiscal, las semanas retenidas a la tasa equivocada, la exención de la Medicare levy y las deducciones que corresponden al trabajo que realmente hiciste. Eso es lo que define el monto.',
    cta: 'Escríbenos por WhatsApp',
    under: 'Respuesta en aproximadamente una hora.',
  },
  'Super': {
    eyebrow: 'Antes de reclamar',
    heading: 'La mayoría tiene más de un fondo.',
    body: 'El trabajo casual y de temporada reparte la super en varias cuentas, y un reclamo de DASP hecho desde la cuenta equivocada, en el momento equivocado o con los documentos equivocados se retrasa o sale por menos. Encontramos todas con tu TFN y presentamos la solicitud una sola vez.',
    cta: 'Consulta sobre tu super',
    under: 'Respuesta en aproximadamente una hora.',
  },
  'Medicare & Other': {
    eyebrow: 'Vale la pena revisar',
    heading: 'La levy se retiene por defecto.',
    body: 'Si realmente la debías depende de tu pasaporte, no de tu visa. Algunas nacionalidades tienen derecho a Medicare y la pagan; otras no lo tienen y pueden quedar exentas, lo que exige un certificado que hay que solicitar. Es habitual equivocarse en ambos sentidos.',
    cta: 'Comprobar si aplica en tu caso',
    under: 'Respuesta en aproximadamente una hora.',
  },
  'Work Rights': {
    eyebrow: 'Ya que estás aquí',
    heading: 'Solo nos dedicamos a los impuestos de working holiday.',
    body: 'Si algo de lo anterior afectó tu sueldo, tus horas o tu visa, normalmente también aparece en tu tax return. Cuando quieras presentarla, o simplemente saber en qué punto estás, estamos en WhatsApp.',
    cta: 'Haznos una pregunta',
    under: 'Respuesta en aproximadamente una hora. Sin ninguna obligación de seguir adelante.',
  },
}

const COPY: Partial<Record<WaLang, Record<Category, Copy>>> & { en: Record<Category, Copy> } = { en: EN, de: DE, ja: JA, fr: FR, it: IT, es: ES }

const TOPIC: Record<Category, WaTopic> = {
  // Oct 2026: the tax return is the core service, and a TFN or Work Rights
  // reader who taps is almost always asking about a refund, so those chats
  // open on the tax-return prefill.
  'TFN': 'tax-return',
  'ABN': 'abn',
  'Tax Return': 'tax-return',
  'Super': 'super',
  'Medicare & Other': 'medicare',
  'Work Rights': 'tax-return',
}

export function GuideCta({
  category,
  slug,
  lang = 'en',
  title,
}: {
  category: Category
  slug: string
  lang?: WaLang
  title?: string
}) {
  const c = COPY[lang]?.[category] ?? COPY.en[category] ?? COPY.en['Tax Return']
  const topic = TOPIC[category] ?? 'guide'
  const href = waUrl({ topic, lang, detail: title })

  const onTap = () => {
    try { navigator.vibrate?.(10) } catch { /* unsupported */ }
    trackGuideCta({ slug, category, lang, position: 'guide-end' })
    trackWhatsApp({ position: 'guide-end', topic, lang })
  }

  return (
    <aside className="guide-cta" aria-labelledby={`guide-cta-${slug}`}>
      <p className="guide-cta-eyebrow">{c.eyebrow}</p>
      <p className="guide-cta-heading" id={`guide-cta-${slug}`}>{c.heading}</p>
      <p className="guide-cta-body">{c.body}</p>
      {/* The under line centers under the button, not under the card. */}
      <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', maxWidth: '100%' }}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="guide-cta-btn"
        onClick={onTap}
      >
        <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2a10 10 0 0 0-8.7 15l-1.3 4.7 4.8-1.3A10 10 0 1 0 12 2Zm5.5 14.2c-.2.6-1.2 1.2-1.7 1.2-.4 0-1 .1-3.3-.9-2.8-1.2-4.5-4-4.6-4.2-.1-.2-1.1-1.4-1.1-2.7s.7-1.9.9-2.2c.2-.2.5-.3.6-.3h.5c.2 0 .4 0 .6.4l.8 2c.1.2.1.4 0 .5l-.3.5-.4.4c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.2.1.4.1.6-.1l.8-1c.2-.2.3-.2.6-.1l2 .9c.3.1.4.2.5.3.1.2.1.7-.1 1.3Z" />
        </svg>
        {c.cta}
      </a>
      <p className="guide-cta-under">{c.under}</p>
      </div>
    </aside>
  )
}
