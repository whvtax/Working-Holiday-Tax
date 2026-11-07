import { newLocaleLanguages } from '@/lib/locale-pages'
import type { Metadata } from 'next'
import Link from 'next/link'
import { GoogleRating } from '@/components/ui/GoogleRating'
import { GoogleReviewsServer } from '@/components/ui/GoogleReviewsServer'
import { MobileCta } from '@/components/ui/MobileCta'
import { SITE_URL } from '@/lib/constants'
import { waUrl } from '@/lib/wa'
import { Accordion } from '@/components/ui/Accordion'
import { WaButton } from '@/components/wht/WaButton'
import { Section } from '@/components/wht/Section'
import { Hero, heroStyles } from '@/components/wht/Hero'
import { Lead, Mark } from '@/components/wht/Type'
import { Figures, LinkRows, Steps, blocks } from '@/components/wht/Blocks'
import { Crumbs, PhotoBand, tb } from '@/components/wht/TfnAbnBlocks'

// ─── METADATA ───────────────────────────────────────────────────────────
// このページが扱うのは「TFNが雇用主に届くまでの期間の損失」です。
// 料金は一切記載しません。当社自身が登録税理士であるとは書きません。
export const metadata: Metadata = {
  // ルートレイアウトが " | Working Holiday Tax" を付与するため、
  // タイトルはモバイルの検索結果に収まる長さにしています。
  title: 'タックスファイルナンバー（TFN）申請｜ワーホリの取得方法と日数',
  description:
    'TFNは417・462ビザで入国後にATOへ無料で申請でき、最大28日で郵送されます。申請中と伝えれば28日間は通常の税率、それを過ぎると45%。届かない時の連絡先と、一度で通す準備まで。',
  keywords: [
    'タックスファイルナンバー 取得方法',
    'TFN 申請 オーストラリア',
    'TFN 申請 ワーホリ',
    'TFN 取得 ワーホリ',
    'タックスファイルナンバー 申請 オーストラリア',
    'ワーキングホリデー TFN',
    'TFN 417ビザ',
    'TFN 462ビザ',
    'TFN なし 45%',
    'TFN 28日 ルール',
    'TFN 申請 日数',
    'TFN 渡航前 申請',
    'TFN 申請 必要書類',
    'TFN 申請方法',
    'TFN 届かない',
    'TFN 住所変更',
    'TFN 必要なもの',
    'TFN申告書 申請中',
  ],
  alternates: {
    canonical: `${SITE_URL}/ja/tfn`,
    languages: {
      'en-AU': `${SITE_URL}/tfn`,
      de: `${SITE_URL}/de/tfn`,
      ja: `${SITE_URL}/ja/tfn`,
      ...newLocaleLanguages('/tfn'),
      'x-default': `${SITE_URL}/tfn`,
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/assets/og/og-tfn.png`, width: 1200, height: 630, alt: 'ワーキングホリデーのTFN申請' }],
    type: 'website',
    locale: 'ja_JP',
    url: `${SITE_URL}/ja/tfn`,
    siteName: 'Working Holiday Tax',
    title: 'タックスファイルナンバー（TFN）申請｜ワーホリの取得方法と日数',
    description:
      '番号は無料。無料でないのは、それがない期間です。417・462ビザのTFN申請を、一度で通るように準備します。',
  },
  twitter: {
    images: [`${SITE_URL}/assets/og/og-tfn.png`],
    card: 'summary_large_image',
    title: 'タックスファイルナンバー（TFN）申請｜ワーホリの取得方法と日数',
    description: '番号は無料。無料でないのは、それがない期間です。',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

// ─── COPY ───────────────────────────────────────────────────────────────

const FAILURE_POINTS = [
  {
    n: '01',
    title: '申請書の氏名が入国記録と一致していない',
    body: 'ATOは申請内容をビザの記録と照合します。ミドルネームの省略、更新したパスポート、姓名の順序の違いだけで差し戻しになります。',
  },
  {
    n: '02',
    title: '4週間後にその住所で郵便を受け取れない',
    body: 'TFNは国内住所宛ての手紙で届き、発行まで最大28日かかります。その間に移動してしまうと、誰も転送してくれません。',
  },
  {
    n: '03',
    title: 'ビザが有効になる前に申請してしまった',
    body: 'オンライン申請は、就労できるビザがパスポートに紐づき、オーストラリア国内にいる状態で使うものです。入国前や、ビザが有効になる前の申請は通らず、気づくのは数週間後、45%で引かれ始めてからです。',
  },
]

const WHAT_WE_DO = [
  {
    title: 'まずビザが有効かを確認します',
    body: '1分で終わる確認ですが、最も多い「無駄になった1か月」を防ぎます。',
  },
  {
    title: '入国記録との照合を先に行います',
    body: 'パスポート、姓名の順序、生年月日、ビザ発給内容。提出前にすべて突き合わせます。',
  },
  {
    title: '住所の問題を一緒に解決します',
    body: '4週間後に実際にどこにいるのか。農場やバン暮らしの場合にどうするかも含めてご相談します。',
  },
  {
    title: '止まっていれば当社が催促します',
    body: 'ATOの目安は28日です。過ぎても通知は届かないため、当社から状況を確認します。',
  },
  {
    title: '待っている間の対応を雇用主に伝えます',
    body: 'TFN申告書で「申請中」と記録してもらう方法と、28日の期限をお伝えします。受付番号はその証拠として見せるもので、TFNの欄には書きません。',
  },
  {
    title: '空白期間分は年度末のタックスリターンで精算します',
    body: 'すでに45%で引かれた分は、タックスリターンで精算するしかありません。しかも、申告内容がそれを反映している場合だけです。',
  },
]

// 55語を超える回答には空行を入れ、下のFAQは段落ごとに<p>を出す。faqLdは
// 元の文字列をそのまま使うので、構造化データは変わらない。
const FAQS = [
  {
    question: 'TFNの申請は自分でできますか？',
    answer:
      'ご自身でできますし、申請自体は無料の短いフォームです。\n\n費用をいただくのはその周りの作業です。申請内容を入国記録と突き合わせること、4週間後にも郵便を受け取れる住所を選ぶこと、最初の給与が45%にならないよう申請中であることを雇用主に正しく伝えることです。',
  },
  {
    question: 'TFNの申請はATOのサイトで無料です。何に対する費用ですか？',
    answer:
      '番号の取得自体は無料です。お金がかかるのは空白期間のほうで、申請中と伝えないまま働いた期間や、28日を過ぎても番号を渡せない期間の給与は、15%ではなく45%で源泉徴収されます。\n\n費用は、その期間を一度で終わらせること、そしてすでに引かれた分をタックスリターンで精算することに対するものです。',
  },
  {
    question: 'TFNなしで働き始めると実際にどうなりますか？',
    answer:
      'TFN申告書で申請中と伝えていれば、雇用主は就労開始から28日間、ワーキングホリデーの税率（45,000ドルまで15%）で源泉徴収します。28日を過ぎても番号を渡せない場合、または何も伝えていない場合は45%です。時給25ドルの仕事なら、1時間あたり約7.50ドルが、あなたではなくATOに渡ります。\n\nこの金額は消えるわけではありませんが、調整できるのは、年度後に正しく提出したタックスリターンだけです。実際に戻る額はその年の状況によって異なり、最終的な判断はATOが行います。',
  },
  {
    question: 'すでに数週間TFNなしで働いています。もう手遅れですか？',
    answer:
      'いいえ。今すぐ申請すれば、これ以降の給与に最高税率が適用されなくなります。すでに45%で引かれた分は、その年度のタックスリターンの中で調整を検討します。実際の結果はATOの判断によります。\n\nご連絡いただいた当日に申請の準備が整うことがほとんどですので、45%で働いた週数も併せてお知らせください。申告内容が変わります。',
  },
  {
    question: 'TFNが届くまでどのくらいかかりますか？',
    answer:
      'ATOはTFN申請を28日以内に処理すると案内しており、実際には多くのワーキングホリデーメーカーが2週間から4週間で受け取っています。申請書に記載したオーストラリアの住所宛ての手紙で届きます。待っている間は、TFN申告書で申請中であることを雇用主に伝えておきます。',
  },
  {
    question: '28日たってもTFNが届きません。どうすればいいですか？',
    answer:
      'ATOの個人向け窓口（13 28 61、平日8時から18時）に電話します。海外からは+61 2 6216 1111です。申請時の受付番号とパスポートを用意してください。英語が不安なら、無料の通訳サービスTIS National（13 14 50）で日本語の通訳を頼めます。\n\n28日の間に二重に申請しないでください。番号が遅れている間は、雇用主にもその旨を伝えます。当社にご依頼の場合は、当社からATOに状況を確認します。',
  },
  {
    question: 'TFNの申請後に住所が変わったら、どうなりますか？',
    answer:
      'TFNの手紙は申請書に書いた住所にしか届かず、転送はされません。引っ越す前、または28日を過ぎて届かない時点でATOに電話し、本人確認のうえ新しい住所に更新してもらいます。ファームやバンで暮らす予定なら、申請前に4週間後も受け取れる住所を決めておくのが確実です。',
  },
  {
    question: 'オーストラリアに着く前にTFNを申請できますか？',
    answer:
      'ワーキングホリデービザではできません。417・462ビザが有効な状態でオーストラリアに入国してから申請します。申請内容が入国とビザの記録と照合されるためです。さらに、手紙を受け取るためのオーストラリア国内の住所も必要になります。',
  },
  {
    question: 'TFNの申請には何が必要ですか？',
    answer:
      '必要なのは、パスポート、それに紐づいた有効なワーキングホリデービザ（417・462）、手紙を受け取れるオーストラリア国内の住所、連絡先です。オンライン申請なら、ATOに書類を郵送する必要はありません。氏名はビザの記録と同じ表記で入力してください。',
  },
  {
    question: 'セカンドビザのときにTFNを取り直す必要はありますか？',
    answer:
      'いいえ。タックスファイルナンバーは通常9桁の番号で、一度発行されると生涯同じ番号を使います。セカンド・サードのワーキングホリデービザをまたいでも、ビザの種類が変わっても、一度オーストラリアを完全に離れても変わりません。\n\n番号を忘れてしまっただけであれば、もっと早く解決できる別の問題です。どちらに当たるかお知らせください。',
  },
]

const GUIDES = [
  {
    href: '/ja/blog/can-you-start-work-without-a-tfn',
    title: 'TFNなしで働ける？28日ルール',
    desc: '届く前に働き始めるときの、雇用主への伝え方と税率。',
  },
  {
    href: '/ja/blog/how-long-does-it-take-to-get-a-tfn',
    title: 'TFNが届くまでの日数',
    desc: 'ATOの目安、実際の日数、そして催促すべきタイミング。',
  },
  {
    href: '/ja/blog/tfn-application-delayed',
    title: '28日過ぎても届かないとき',
    desc: '最初に確認することと、ATOへの連絡の仕方。',
  },
  {
    href: '/ja/blog/tfn-australian-address-no-fixed-address',
    title: '住所が決まっていない時のTFN申請',
    desc: 'ホステル、ファーム、キャンパーバンで暮らす場合の住所の選び方。',
  },
  {
    href: '/ja/blog/tax-file-number-declaration-form',
    title: 'TFN申告書の書き方',
    desc: '雇用主に出す書式と、申請中の欄の記入方法。',
  },
]

const HOW_TO_APPLY = [
  {
    n: '01',
    title: 'ワーホリビザを有効にして入国する',
    body: 'オンライン申請（Individual Auto-Registration）は、就労が認められたビザがパスポートに紐づき、オーストラリア国内にいる人だけが使えます。',
  },
  {
    n: '02',
    title: 'ATOの外国パスポート保持者向けページから申請する',
    body: 'ATOのサイトで「Foreign passport holders, permanent migrants and temporary visitors」を選び、オンライン申請に進みます。申請は無料です。',
  },
  {
    n: '03',
    title: 'パスポートとビザの情報、国内の住所を入力する',
    body: '氏名はビザの記録と同じ表記と順序で入力します。番号は郵送で届くため、4週間後も郵便を受け取れるオーストラリア国内の住所を書きます。',
  },
  {
    n: '04',
    title: '受付番号を控え、雇用主には申請中と伝える',
    body: '送信後に表示され確認メールにも届く受付番号は、TFNではありません。雇用主にはTFN申告書で申請中と伝え、28日以内に番号を渡します。',
  },
  {
    n: '05',
    title: '最大28日で届く。届かなければATOに連絡する',
    body: '28日の間はもう一度申請しないでください。過ぎても届かない場合は、受付番号を手元に置いてATOに電話します。',
  },
]

// ここにあったmyGovとの比較表は削除した。4行のいずれも、下の
// FAILURE_POINTSとWHAT_WE_DOがすでに述べている内容だった。残す価値のある
// 一行、「myGovにログインすることはありません」という約束は、
// WHAT_WE_DOセクションの末尾に移した。

const WA_TFN = waUrl({ topic: 'tfn', lang: 'ja' })

export default function TFNPageJA() {
  const webPageLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}/ja/tfn#webpage`,
    url: `${SITE_URL}/ja/tfn`,
    name: 'タックスファイルナンバー（TFN）申請｜ワーホリの取得方法と日数',
    description:
      '417・462ビザのTFN申請方法、必要なもの、届くまでの28日、届かない時の連絡先、45%の源泉徴収を避ける方法。',
    dateModified: '2026-11-05',
    inLanguage: 'ja',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#business` },
    speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.hero-lede'] },
  }

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_URL}/ja/tfn#service`,
    name: 'ワーキングホリデー向けTFN申請代行',
    serviceType: 'タックスファイルナンバー申請',
    description:
      '417・462ビザ保持者のTFN申請を、入国記録との照合と住所の確認まで済ませて準備します。雇用主へのTFN申告書の伝え方の案内と、28日を過ぎた場合のATOへの照会まで含みます。',
    provider: { '@id': `${SITE_URL}/#business` },
    areaServed: { '@type': 'Country', name: 'オーストラリア' },
    audience: { '@type': 'Audience', audienceType: 'ワーキングホリデーメーカー（サブクラス417・462）' },
    availableLanguage: ['ja', 'en', 'de', 'fr', 'it', 'es'],
    inLanguage: 'ja',
  }

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: 'ja',
    mainEntity: FAQS.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'ホーム', item: `${SITE_URL}/ja` },
      { '@type': 'ListItem', position: 2, name: 'TFN申請', item: `${SITE_URL}/ja/tfn` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      {/* ── 1. HERO ──────────────────────────────────────────────────────── */}
      {/* SEO (Oct 2026): the kicker sits inside the H1 so the heading carries the query words people type. */}
      <div className={blocks.underHeader}>
        <Crumbs homeHref="/ja" home="ホーム" current="TFN申請" />
        <Hero
          title={
            <>
              <span className={blocks.kicker}>タックスファイルナンバー（TFN）申請代行｜ワーホリ417・462ビザ</span>
            番号は無料です。<br />
            無料でないのは、<Mark>それがない期間</Mark>です。
            </>
          }
        >
          <div className="hero-lede">
            <Lead>
              TFN（タックスファイルナンバー）は、417・462ビザでオーストラリアに入国した後、ATOのサイトから無料で申請できます。番号は申請書に書いたオーストラリア国内の住所に郵送され、ATOの目安は最大28日です。雇用主に申請中と伝えれば28日間は通常の税率で、それを過ぎても番号がなければ45%で源泉徴収されます。
            </Lead>
          </div>
          <p className={heroStyles.note}>2026年11月更新。出典：オーストラリア税務局（ATO）</p>
          <WaButton href={WA_TFN} position="hero" topic="tfn" lang="ja">WhatsAppで相談する</WaButton>
          <p className={heroStyles.note}>約1時間で返信します。</p>
          <GoogleRating variant="pill" lang="ja" />
        </Hero>
        <PhotoBand page="tfn" locale="ja" />
      </div>

      <Section width="wide" title="TFNが届く前に働き始めると、いくら失いますか。" titleId="gap-title">
        <p className={blocks.text}>
          働き始めるときに雇用主へ出すTFN申告書（Tax File Number Declaration）で「申請中」と伝えれば、雇用主は就労開始から28日間、ワーキングホリデーの税率で源泉徴収します。28日を過ぎても番号を渡せない場合、または何も伝えていない場合は45%です。引かれすぎた税金は消えるわけではなく、6月30日以降にタックスリターンを提出すれば戻る場合があります。
        </p>
        <Figures
          items={[
            { figure: '無料', body: 'ATOへのTFN申請そのものに費用はかかりません。番号は一生同じです。' },
            { figure: '28日', body: 'ATOが発行にかける最大日数の目安です。雇用主に申請中と伝えた場合、通常の税率が使える期間も就労開始から28日です。' },
            { figure: '15%', body: 'ワーキングホリデーメーカーの税率。最初の45,000ドルまで、2026年7月1日以降も変わりません。' },
            { figure: '45%', body: '番号を雇用主に渡さず、申請中とも伝えていない場合、または28日を過ぎた場合の源泉徴収率です。' },
          ]}
        />
        <p className={`${blocks.small} ${blocks.muted}`}>
          出典：オーストラリア税務局（ATO）「Apply for a TFN」「Tax file number declarations」、ワーキングホリデーメーカー税率表。2026年11月時点。
        </p>
      </Section>

      <Section eyebrow="申請の流れ" title="タックスファイルナンバー（TFN）の取得方法：ワーホリの申請5ステップ" titleId="how-title">
        <p className={blocks.text}>
          ワーホリのTFN申請方法は、入国後にATOのサイトからオンラインで申請し、郵送で番号を受け取るという流れです。ATOへ書類を郵送する必要はありません。入国前にはできないため、到着後すぐに出せるよう準備しておきます。
        </p>
        <Steps items={HOW_TO_APPLY} />
        <WaButton href={WA_TFN} position="section" topic="tfn" lang="ja">入国済みならWhatsAppで準備を始める</WaButton>
      </Section>

      <Section tone="pale" eyebrow="自分でやる場合" title="ワーホリのTFN申請はなぜ通らないのですか。" titleId="fail-title">
        <p className={`${blocks.text} ${blocks.muted}`}>
          フォームは短いものです。つまずき方は3つあり、どれも45%の課税がもう1か月延びることにつながります。
        </p>
        <Steps items={FAILURE_POINTS} />
        <p className={`${blocks.text} ${blocks.muted}`}>
          申請がうまくいかない理由をさらに詳しく知りたい方は{' '}
          <Link href="/ja/blog/how-to-apply-for-a-tfn" className={tb.inlineLink}>TFN申請がうまくいかない理由</Link>
          を、28日を過ぎても番号が来ない方は{' '}
          <Link href="/ja/blog/tfn-application-delayed" className={tb.inlineLink}>TFNが届かないとき</Link>
          をご覧ください。
        </p>
      </Section>

      <Section eyebrow="当社の作業" title="当社が行うこと" titleId="work-title">
        <p className={`${blocks.text} ${blocks.muted}`}>
          必要な情報をWhatsAppでお送りいただくだけです。以下はすべて当社側で行います。
        </p>
        <div className={tb.pairs}>
          {WHAT_WE_DO.map(c => (
            <div key={c.title} className={blocks.palePanel}>
              <h3 className={blocks.cardTitle}>{c.title}</h3>
              <p className={blocks.text}>{c.body}</p>
            </div>
          ))}
        </div>
        <p className={blocks.statement}>
          myGovにログインすることも、IDを連携することも、どの書類がどれかを調べることもありません。ATOとは当社が直接やり取りします。
        </p>
        <p className={blocks.text}>
          すでに番号をお持ちで、45%で引かれた期間を精算したい方は{' '}
            <Link href="/ja/tax-return" className={tb.inlineLink}>タックスリターンのページ</Link>
            をご覧ください。
        </p>
      </Section>

      {/* The one amber band: the guarantee. */}
      <Section tone="amber" title="当社の保証" titleId="guarantee-title">
        <p className={blocks.statement} style={{ color: 'var(--wht-ink)' }}>
          当社の保証：還付金が当社の料金より少ない場合は、ATOの課税通知書（Notice of Assessment）の発行後に差額を返金します。還付がない場合、またはATOへの納税が発生した場合は、料金の全額をいただきます。この保証の対象は、TFN所得のあるタックスリターンに限られます。
        </p>
        <p className={blocks.text}>料金は定額制で、還付額に対する歩合ではありません。</p>
      </Section>

      <Section tone="pale" title="ワーキングホリデーの税金だけを扱っています。" titleId="trust-title">
        <p className={blocks.text}>
          当社が準備するTFN申請は、すべて417・462ビザの方のものです。当社は登録タックスエージェントの監督のもとで運営しており、タックスリターンは登録タックスエージェントが確認して承認してから、ATOに提出されます。ATOとのやり取りは当社が直接行います。
        </p>
        <GoogleReviewsServer lang="ja" />
      </Section>

      <Section title="相談前によく聞かれるTFNの質問" titleId="faq-title">
        {/* Accordion splits answers on a blank line; faqLd above uses the raw string. */}
        <Accordion items={FAQS} />
      </Section>

      <Section tone="pale" eyebrow="ガイド" title="TFNの申請と28日の期間をさらに詳しく" titleId="guides-title">
        <LinkRows items={GUIDES} />
      </Section>

      <Section eyebrow="関連サービス" title="TFNの次に必要になる手続き" titleId="next-title">
        <LinkRows
          items={[
            { href: '/ja/tax-return', title: 'タックスリターン', desc: '45%で引かれた期間も含め、年度末に1年分を精算します。' },
            { href: '/ja/abn', title: 'ABN登録', desc: '請負やデリバリーの仕事では、TFNとは別にABNが必要になることがあります。' },
            { href: '/ja/superannuation', title: 'スーパーアニュエーション（DASP）', desc: '帰国後に、働いた期間に積み立てられたスーパーの返金を請求します。' },
          ]}
        />
      </Section>

      {/* Closing CTA, forest band. */}
      <Section tone="forest" title="いまどの段階かをお知らせください" titleId="cta-title">
        <p className={`${blocks.text} ${blocks.onForest}`}>
          WhatsAppで次の3点を送ってください。入国日とビザの種類（417か462）、仕事をすでに始めているか（始めていれば開始日）、4週間後に郵便を受け取れる住所があるか。これだけで、今日申請できるか、何を先に直すかをお伝えします。
        </p>
        <WaButton href={WA_TFN} position="section" topic="tfn" lang="ja" tone="light">WhatsAppで相談する</WaButton>
        <p className={`${blocks.small} ${blocks.onForest}`}>約1時間で返信します。</p>
      </Section>

      <MobileCta href={WA_TFN} lang="ja" topic="tfn" />
    </>
  )
}
