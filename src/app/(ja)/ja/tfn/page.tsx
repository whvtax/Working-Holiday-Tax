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
import { LinkButton } from '@/components/wht/Button'
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
  title: 'TFN申請代行｜45%課税を防ぐ',
  description:
    '番号の取得自体は無料です。費用がかかるのは、TFNが雇用主に届く前の期間。15%ではなく45%で源泉徴収されます。一度で通す申請を代行します。',
  keywords: [
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
    'TFN タックスリターン 還付',
    'TFN 申請 却下',
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
    title: 'TFN申請代行｜ワーホリの45%課税を止める',
    description:
      '番号は無料。無料でないのは、それがない期間です。417・462ビザのTFN申請を、一度で通るように準備して提出します。',
  },
  twitter: {
    images: [`${SITE_URL}/assets/og/og-tfn.png`],
    card: 'summary_large_image',
    title: 'TFN申請代行｜ワーホリの45%課税を止める',
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
    body: '申請は、ビザが有効な状態で入国してからです。早すぎる申請は静かに止まり、気づくのは数週間後、45%で引かれ始めてからです。',
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
    body: '申請の受付番号（reference number）を正しく伝えれば、待機中の最初の給与が最高税率になるのを防げます。',
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
      'ご自身でできますし、申請自体は無料の短いフォームです。\n\n費用をいただくのはその周りの作業です。申請内容を入国記録と突き合わせること、4週間後にも郵便を受け取れる住所を選ぶこと、最初の給与が45%にならないよう申請の受付番号を雇用主にお伝えすることです。',
  },
  {
    question: 'TFNの申請はATOのサイトで無料です。何に対する費用ですか？',
    answer:
      '番号の取得自体は無料です。お金がかかるのは空白期間のほうで、雇用主が番号を受け取るまでの給与は、15%ではなく45%で源泉徴収されます。\n\n費用は、その期間を一度で終わらせること、そしてすでに引かれた分をタックスリターンで精算することに対するものです。',
  },
  {
    question: 'TFNなしで働き始めると実際にどうなりますか？',
    answer:
      '雇用主は、タックスファイルナンバーを受け取るまで、ワーキングホリデーメーカーの15%（45,000ドルまで）ではなく最高税率の45%で源泉徴収する義務があります。番号を渡す期限は就労開始から28日です。時給25ドルの仕事なら、1時間あたり約7.50ドルが、あなたではなくATOに渡ります。\n\nこの金額は消えるわけではありませんが、調整できるのは、年度後に正しく提出したタックスリターンだけです。実際に戻る額はその年の状況によって異なり、最終的な判断はATOが行います。',
  },
  {
    question: 'すでに数週間TFNなしで働いています。もう手遅れですか？',
    answer:
      'いいえ。今すぐ申請すれば、これ以降の給与に最高税率が適用されなくなります。すでに45%で引かれた分は、その年度のタックスリターンの中で調整を検討します。実際の結果はATOの判断によります。\n\nご連絡いただいた当日に申請の準備が整うことがほとんどですので、45%で働いた週数も併せてお知らせください。申告内容が変わります。',
  },
  {
    question: 'TFNが届くまでどのくらいかかりますか？',
    answer:
      'ATOはTFN申請を28日以内に処理すると案内しており、実際には多くのワーキングホリデーメーカーが2週間から4週間で受け取っています。申請書に記載したオーストラリアの住所宛ての手紙で届きます。待っている間に雇用主が必要とするのは、申請の受付番号です。',
  },
  {
    question: 'オーストラリアに着く前にTFNを申請できますか？',
    answer:
      'ワーキングホリデービザではできません。417・462ビザが有効な状態でオーストラリアに入国してから申請します。申請内容が入国とビザの記録と照合されるためです。さらに、手紙を受け取るためのオーストラリア国内の住所も必要になります。',
  },
  {
    question: 'セカンドビザのときにTFNを取り直す必要はありますか？',
    answer:
      'いいえ。タックスファイルナンバーは一度だけ発行され、生涯同じ番号を使います。セカンド・サードのワーキングホリデービザをまたいでも、ビザの種類が変わっても、一度オーストラリアを完全に離れても変わりません。\n\n番号を忘れてしまっただけであれば、もっと早く解決できる別の問題です。どちらに当たるかお知らせください。',
  },
]

const GUIDES = [
  {
    href: '/ja/blog/what-happens-without-your-tfn',
    title: 'TFNなしで働くとどうなるか',
    desc: '45%の源泉徴収、28日の猶予、そして精算される仕組み。',
  },
  {
    href: '/ja/blog/tfn-reference-number-before-tfn-arrives',
    title: '申請の受付番号',
    desc: '手紙が届くまでの間に雇用主へ伝えるもの。',
  },
  {
    href: '/ja/blog/how-long-does-it-take-to-get-a-tfn',
    title: 'TFNにかかる日数',
    desc: 'ATOの目安、実際の日数、そして催促すべきタイミング。',
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
    name: 'TFN申請代行（ワーキングホリデー）',
    description:
      'TFNなしで働くことの費用、ワーキングホリデーのTFN申請が通らない理由、そして引かれすぎた分が精算される仕組み。',
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
      '417・462ビザ保持者のTFN申請を準備・提出します。雇用主に伝える受付番号の案内、ATOへの照会まで含みます。',
    provider: { '@id': `${SITE_URL}/#business` },
    areaServed: { '@type': 'Country', name: 'オーストラリア' },
    audience: { '@type': 'Audience', audienceType: 'ワーキングホリデーメーカー（サブクラス417・462）' },
    availableLanguage: ['ja', 'en', 'de'],
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
              <span className={blocks.kicker}>TFN申請代行｜ワーホリ417・462ビザ</span>
            番号は無料です。<br />
            無料でないのは、<Mark>それがない期間</Mark>です。
            </>
          }
        >
          <div className="hero-lede">
            <Lead>
              雇用主が番号を受け取るまで、給与は15%ではなく45%で源泉徴収されます。
            </Lead>
          </div>
          <WaButton href={WA_TFN} position="hero" topic="tfn" lang="ja">WhatsAppで相談する</WaButton>
          <p className={heroStyles.note}>約1時間で返信します。</p>
          <GoogleRating variant="pill" lang="ja" />
        </Hero>
        <PhotoBand page="tfn" locale="ja" />
      </div>

      <Section width="wide" title="TFNが届く前に働き始めると、いくら失いますか。" titleId="gap-title">
        <p className={blocks.text}>
          28日以内に雇用主へTFNを渡さないと、ワーキングホリデーの15%ではなく45%で源泉徴収されます。引かれすぎた税金は消えるわけではなく、6月30日以降にタックスリターンを提出すれば戻る場合があります。
        </p>
        <Figures
          items={[
            { figure: '45%', body: 'TFNが未提出の間、15%ではなくこの税率で全額から源泉徴収されます。' },
            { figure: '28日', body: '雇用主にTFNを渡す期限であり、ATOが発行にかける目安でもあります。' },
            { figure: '申告1回', body: '誤った税率で引かれた分を調整できる、唯一の経路です。' },
          ]}
        />
      </Section>

      <Section tone="pale" eyebrow="自分でやる場合" title="ワーホリのTFN申請はなぜ通らないのですか。" titleId="fail-title">
        <p className={`${blocks.text} ${blocks.muted}`}>
          フォームは短いものです。つまずき方は3つあり、どれも45%の課税がもう1か月延びることにつながります。
        </p>
        <Steps items={FAILURE_POINTS} />
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
          当社の保証：還付金が当社の料金より少ない場合は、ATOの課税通知書（Notice of Assessment）の発行後に差額を返金します。還付がない場合、またはATOへの納税が発生した場合は、料金の全額をいただきます。
        </p>
        <p className={blocks.text}>料金は定額制で、還付額に対する歩合ではありません。</p>
      </Section>

      <Section tone="pale" title="ワーキングホリデーの税金だけを扱っています。" titleId="trust-title">
        <p className={blocks.text}>
          提出するTFN申請は、すべて417・462ビザの方のものです。タックスリターンは登録タックスエージェントが確認・承認したうえでATOに提出します。
        </p>
        <GoogleReviewsServer lang="ja" />
      </Section>

      <Section title="相談前によく聞かれるTFNの質問" titleId="faq-title">
        {/* Accordion splits answers on a blank line; faqLd above uses the raw string. */}
        <Accordion items={FAQS} />
      </Section>

      <Section tone="pale" eyebrow="ガイド" title="TFNと45%の期間をさらに詳しく" titleId="guides-title">
        <LinkRows items={GUIDES} />
      </Section>

      <Section eyebrow="次のステップ" title="45%で引かれた期間は申告で精算します" titleId="next-title">
        <p className={blocks.text}>番号が登録されたら、引かれすぎた分を調整するのはタックスリターンです。</p>
        <div className={blocks.stack}>
          <LinkButton href="/ja/tax-return" size="md">タックスリターンの流れ →</LinkButton>
        </div>
      </Section>

      {/* Closing CTA, forest band. */}
      <Section tone="forest" title="いまどの段階かをお知らせください" titleId="cta-title">
        <p className={`${blocks.text} ${blocks.onForest}`}>
          すでに入国しているか、仕事を始めているか、45%で支払われた給与がすでにあるか。この3点だけで、次に何をすべきかをお伝えできます。
        </p>
        <WaButton href={WA_TFN} position="section" topic="tfn" lang="ja" tone="light">WhatsAppで相談する</WaButton>
        <p className={`${blocks.small} ${blocks.onForest}`}>約1時間で返信します。</p>
      </Section>

      <MobileCta href={WA_TFN} lang="ja" topic="tfn" />
    </>
  )
}
