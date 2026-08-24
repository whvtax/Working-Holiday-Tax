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
    body: 'Die Arbeit passiert davor: dein steuerlicher Wohnsitz, die Wochen mit dem falschen Steuersatz, die Medicare-Befreiung und die Abzüge, die zu deiner echten Arbeit gehören. Das entscheidet über den Betrag.',
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
    body: 'Ob du sie überhaupt geschuldet hast, hängt von deinem Pass ab, nicht von deinem Visum. Deutsche Pässe fallen in der Regel nicht unter ein Abkommen, sodass die Befreiung meist möglich ist. Dafür brauchst du eine Bescheinigung, die du selbst beantragen musst, und fast niemand tut das.',
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
    body: '実際に支払う義務があったかどうかは、ビザではなくパスポートで決まります。日本のパスポートは通常、協定の対象外なので、免除を受けられる場合がほとんどです。免除には自分で申請する証明書が必要で、ほとんどの人が申請していません。',
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

const COPY: Record<WaLang, Record<Category, Copy>> = { en: EN, de: DE, ja: JA }

const TOPIC: Record<Category, WaTopic> = {
  'TFN': 'tfn',
  'ABN': 'abn',
  'Tax Return': 'tax-return',
  'Super': 'super',
  'Medicare & Other': 'medicare',
  'Work Rights': 'guide',
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
