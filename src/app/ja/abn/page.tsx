import type { Metadata } from 'next'
import type { CSSProperties } from 'react'
import Link from 'next/link'
import { GoogleRating } from '@/components/ui/GoogleRating'
import { GoogleReviews } from '@/components/ui/GoogleReviews'
import { MobileCta } from '@/components/ui/MobileCta'
import { NextStep } from '@/components/ui/NextStep'
import { SITE_URL } from '@/lib/constants'
import { waUrl } from '@/lib/wa'
import { WaLink } from '@/app/HomeWa'

// ─── METADATA ───────────────────────────────────────────────────────────
// このページが扱うのは「収入の切り分け」です。ABNがタックスリターンの
// 中身をどう変えるか。料金は記載せず、当社自身が登録税理士であるとも
// 書きません。
export const metadata: Metadata = {
  // ルートレイアウトが " | Working Holiday Tax" を付与するため、
  // タイトルはモバイルの検索結果に収まる長さにしています。
  title: 'ABN登録｜ワーホリの税金が変わる点',
  description:
    'ABNはタックスリターンの中身を変えます。源泉徴収なしの請求収入、必要経費、GSTの扱い、そして「本当に個人事業主だったのか」という問い。',
  keywords: [
    'ABN 登録 オーストラリア',
    'ABN ワーホリ',
    'ABN ワーキングホリデー',
    'ABN 申請 オーストラリア',
    'ワーホリ 個人事業主 オーストラリア',
    'ABN 417ビザ',
    'ABN 462ビザ',
    'ABN タックスリターン',
    'ABN TFN 違い',
    'ABN 必要 ワーホリ',
    'ABN 経費 ワーホリ',
    'GST 75000ドル ABN',
    'Uber ABN GST 登録',
    '雇用 個人事業主 違い オーストラリア',
  ],
  alternates: {
    canonical: `${SITE_URL}/ja/abn`,
    languages: {
      'en-AU': `${SITE_URL}/abn`,
      de: `${SITE_URL}/de/abn`,
      ja: `${SITE_URL}/ja/abn`,
      'x-default': `${SITE_URL}/abn`,
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'ワーキングホリデーのABN登録' }],
    type: 'website',
    locale: 'ja_JP',
    url: `${SITE_URL}/ja/abn`,
    siteName: 'Working Holiday Tax',
    title: 'ABNで何が変わるか｜ワーホリのタックスリターン',
    description:
      'ABNは仕事を変えません。変えるのはタックスリターンです。請求収入、必要経費、GST、そして雇用か個人事業主かという問い。',
  },
  twitter: {
    images: [`${SITE_URL}/og-image.png`],
    card: 'summary_large_image',
    title: 'ABNで何が変わるか｜ワーホリのタックスリターン',
    description: 'ABNは仕事を変えません。変えるのはタックスリターンです。',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

// ─── ICONS ──────────────────────────────────────────────────────────────
const IconWhatsApp = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ flexShrink: 0 }}>
    <path d="M12 2a10 10 0 0 0-8.7 15l-1.3 4.7 4.8-1.3A10 10 0 1 0 12 2Zm5.5 14.2c-.2.6-1.2 1.2-1.7 1.2-.4 0-1 .1-3.3-.9-2.8-1.2-4.5-4-4.6-4.2-.1-.2-1.1-1.4-1.1-2.7s.7-1.9.9-2.2c.2-.2.5-.3.6-.3h.5c.2 0 .4 0 .6.4l.8 2c.1.2.1.4 0 .5l-.3.5-.4.4c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.2.1.4.1.6-.1l.8-1c.2-.2.3-.2.6-.1l2 .9c.3.1.4.2.5.3.1.2.1.7-.1 1.3Z" />
  </svg>
)

// ─── COPY ───────────────────────────────────────────────────────────────

const THE_SPLIT = [
  {
    n: '01',
    title: '源泉徴収がないので、税金はあとから残ります',
    body: '給与は税金が引かれた状態で届きますが、請求書はそうではなく、税金は年度末に一度に精算します。給与の半分は還付に見え、請求書の半分はその逆です。',
  },
  {
    n: '02',
    title: '控除は「必要経費」に変わり、ルールも変わります',
    body: '被雇用者は仕事関連の支出を控除し、個人事業主は事業の費用を差し引きます。範囲は広く、求められる記録は厳しくなります。',
  },
  {
    n: '03',
    title: 'GSTは手続きではなく、選んだ立場です',
    body: 'ほとんどのワーホリの方は売上75,000ドルの基準に届かないため、本来は登録しないのが自然です。例外がライドシェアです。立場を間違えると、不要なBASの義務が生じるか、必要な登録が抜けます。',
  },
  {
    n: '04',
    title: 'そもそも個人事業主だったのかどうか',
    body: 'この問いが他の3つを決めます。本当に請負だったかどうかは書類上の名目ではなく指揮命令で決まり、実態は雇用なのにABNで働くことが、ワーホリの申告をやり直す最も多い原因です。',
  },
]

const WHAT_WE_DO = [
  {
    title: '取得前に、そもそも必要かを確認します',
    body: '本来は雇用だった仕事のためにABNを登録している方が少なくありません。これはフォームではなく、会話で決めることです。',
  },
  {
    title: '実際の業務内容に合わせて登録します',
    body: '登録した事業内容は、GST、控除、申告まで付いて回ります。',
  },
  {
    title: '取り分けておく金額をお伝えします',
    body: '請求収入に対して年度末にいくらかかるかの目安です。請求書を見て驚かないために。',
  },
  {
    title: '残しておくべき記録をお伝えします',
    body: 'あなたの仕事で控除を実際に裏づける記録はどれか、逆にもう集めなくていい領収書はどれか。',
  },
  {
    title: 'GSTの立場は意識的に決めます',
    body: 'ルールが求めるから登録する、求めないから登録しない。なんとなく、にはしません。',
  },
  {
    title: '両方の収入を1つの申告にまとめます',
    body: '請求収入にかかる税金と、給与から引かれすぎていた分は、同じ申告の中で差し引きされます。',
  },
]

// 55語を超える回答には空行を入れ、下のFAQは段落ごとに<p>を出す。faqLdは
// 元の文字列をそのまま使うので、構造化データは変わらない。
const FAQS = [
  {
    question: '自分で申告することはできますか。',
    answer:
      'ご自身でできますし、1年間がすべて給与だけだったのなら簡単です。\n\nABNが入った時点で簡単ではなくなります。給与と請求収入の境界線をどこに引くのか、そもそも請負だったのか、どの費用を請求収入から差し引き、その裏づけに何を残すのか、そしてGSTの登録が必要だったのか。いずれも入力欄ではなく、あなたの1年についての判断です。',
  },
  {
    question: 'ABNがあると、タックスリターンはどう変わりますか。',
    answer:
      '給与は税金が引かれた状態で支払われ、雇用主がインカムステートメントをATOに提出するため、この部分はおおむね自動的に整合します。\n\nABNで請求した収入は税引き前で入金され、事業収入として申告し、証拠を示せる費用の分だけ圧縮できます。そこにGSTの扱いと、「本当に請負だったのか」という問いが重なり、それでも両方が1つの申告に載ります。',
  },
  {
    question: '普通のシフト勤務なのに雇用主からABNを求められました。正しいですか。',
    answer:
      'たいていは正しくありません。登録する前に確認する価値があります。シフトを組まれ、作業方法を指示され、道具を支給され、早く帰らされることがあるなら、書類上の名目がどうであれ、実態としては被雇用者として扱われています。\n\nABNに切り替えることでコストはあなたに移ります。源泉徴収なし、スーパーアニュエーションなし、労災保険なし、最低賃金や割増賃金の保護もなしです。何かを承諾する前に求人の詳細をお送りください。',
  },
  {
    question: 'ワーキングホリデービザでGSTの登録は必要ですか。',
    answer:
      '年間売上が75,000ドルに達する場合、またはライドシェアを運転する場合だけです。ほとんどのワーキングホリデーメーカーはこの金額に届きません。UberやDiDiなどタクシー・配車サービスを提供する方は、どれだけ少額であっても最初の1回の乗車からGST登録が必要です。\n\nフードデリバリーや宅配の配達員にこのルールは適用されず、75,000ドルの基準になります。登録すると四半期ごとのBAS（事業活動報告）の提出義務が付いてきます。',
  },
  {
    question: 'TFNとABNの両方を持つことはできますか。',
    answer:
      'できますし、請負で働くワーキングホリデーメーカーの多くは最終的に両方を持っています。タックスファイルナンバーは被雇用者としてのあなたを、ABNは個人事業主としてのあなたをカバーします。\n\n申告が2つに分かれるわけではありません。1つの申告が1つの年度をカバーし、その中で両方を報告します。ABNの申請はTFNと照合されるため、TFNが先に必要です。',
  },
  {
    question: 'ABNの必要経費として何が控除できますか。',
    answer:
      'その収入を得るためにかかった費用です。私用と兼用のものは正直に按分します。\n\n配達員であれば、きちんと記録した走行距離、自転車や車の維持費、携帯電話と通信費、保険、装備、そしてプラットフォームが差し引いた手数料が中心になります。建設現場の下請けであれば、工具、保護具、現場間の移動です。\n\n含まれないのは、オーストラリアへの渡航費、自宅から1か所の職場への通常の通勤、そして記録を示せないものすべてです。',
  },
  {
    question: 'オーストラリアを離れるとき、ABNはどうなりますか。',
    answer:
      '事業をやめた時点で取り消します。ABNが有効なままだと、ATOから見て事業を続けており、義務も続いている状態に見えるためです。\n\n取り消しても、働いた年度の申告義務がなくなるわけではなく、同じ期間の雇用収入から生じるスーパーアニュエーションの受け取りにも影響しません。帰国が近い場合は早めにお知らせください。取り消し、申告、スーパー申請の順番が重要になります。',
  },
]

const GUIDES = [
  {
    href: '/ja/blog/employee-vs-contractor-australia',
    title: '雇用か、個人事業主か',
    desc: 'ATOが実際に使う判断基準と、間違った側にいる代償。',
  },
  {
    href: '/ja/blog/abn-deductions-business-expenses',
    title: 'ABNの必要経費',
    desc: '個人事業主が仕事の種類ごとに何を控除できるか、必要な記録まで。',
  },
  {
    href: '/ja/blog/gst-and-abn-for-working-holiday-makers',
    title: 'GSTとABN',
    desc: '75,000ドルの基準、ライドシェアの例外、登録すると何が生じるか。',
  },
]

// ここにあったmyGovとの比較表は削除した。4行はそれぞれTHE_SPLITと
// WHAT_WE_DOの繰り返しで、請負か雇用かの行にいたっては独立した
// セクションがある。「myGovにログインすることはありません」という約束は、
// WHAT_WE_DOセクションの末尾に移した。

const WA_ABN = waUrl({ topic: 'abn', lang: 'ja' })

// ─── SHARED INLINE STYLES ───────────────────────────────────────────────
const KICKER: CSSProperties = { fontSize: '10.5px', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 500 }
const BODY: CSSProperties = { fontSize: '15px', lineHeight: 1.85 }
const LEDE: CSSProperties = { fontSize: '16.5px', lineHeight: 1.9 }

export default function ABNPageJA() {
  const webPageLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}/ja/abn#webpage`,
    url: `${SITE_URL}/ja/abn`,
    name: 'ABNで何が変わるか（ワーキングホリデー）',
    description:
      'ABNがワーキングホリデーのタックスリターンをどう変えるか。源泉徴収なしの請求収入、必要経費、GSTの立場、そして雇用か個人事業主かという判断。',
    inLanguage: 'ja',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#business` },
    speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.hero-lede'] },
  }

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_URL}/ja/abn#service`,
    name: 'ワーキングホリデー向けABN登録代行',
    serviceType: 'オーストラリアビジネスナンバー登録',
    description:
      '実態として請負で働く417・462ビザ保持者向けのABN登録。GSTの扱い、必要な記録、税務上の影響を登録前に整理します。',
    provider: { '@id': `${SITE_URL}/#business` },
    areaServed: { '@type': 'Country', name: 'オーストラリア' },
    audience: { '@type': 'Audience', audienceType: '個人事業主として働くワーキングホリデーメーカー（サブクラス417・462）' },
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
      { '@type': 'ListItem', position: 2, name: 'ABN登録', item: `${SITE_URL}/ja/abn` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      {/* ── 1. HERO ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-[68px]" style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #F2FAF7 100%)' }}>
        <div className="max-w-[820px] mx-auto px-5 md:px-8 pt-8 pb-11 lg:pt-12 lg:pb-14">

          <nav aria-label="Breadcrumb" className="flex items-center gap-2" style={{ fontSize: '13px', color: '#4C6459', marginBottom: '10px' }}>
            <Link href="/ja" className="inline-flex items-center transition-colors hover:text-forest-500" style={{ minHeight: '44px' }}>ホーム</Link>
            <span aria-hidden="true" style={{ color: '#CDE3DB' }}>/</span>
            <span aria-current="page">ABN登録</span>
          </nav>

          <p className="hero-animate" style={{ ...KICKER, color: '#16775C', marginBottom: '14px' }}>
            ワーキングホリデービザ 417・462
          </p>

          <h1 className="font-serif font-black text-ink hero-animate"
            style={{ fontSize: 'clamp(26px, 4.4vw, 38px)', lineHeight: 1.36, letterSpacing: '-0.01em', marginBottom: '16px' }}>
            <span style={{ display: 'block' }}>ABNは仕事を変えません。</span>
            <span style={{ display: 'block', color: '#0B5240' }}>変えるのはタックスリターンです。</span>
          </h1>

          <p className="hero-lede hero-animate-delay" style={{ ...LEDE, color: '#4C6459', maxWidth: '40ch', marginBottom: '26px' }}>
            源泉徴収のない収入、必要経費、GSTの立場。その3つの下にもう1つ、あなたは本当に個人事業主だったのかという問いがあります。
          </p>

          <div className="hero-animate-delay-2">
            <WaLink href={WA_ABN} position="hero" topic="abn" lang="ja"
              className="btn-primary inline-flex items-center justify-center gap-2"
              style={{ height: '54px', padding: '0 30px', fontSize: '15.5px', borderRadius: '100px', maxWidth: '330px', width: '100%' }}>
              <IconWhatsApp />
              WhatsAppで相談する
            </WaLink>
            <p style={{ fontSize: '13.5px', color: '#4C6459', marginTop: '12px' }}>
              約1時間で返信します。
            </p>
          </div>

          <div className="flex" style={{ marginTop: '20px' }}>
            <GoogleRating variant="pill" lang="ja" />
          </div>
        </div>
      </section>

      {/* ── 2. 収入の切り分け ────────────────────────────────────────────── */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-[820px] mx-auto px-5 md:px-8 reveal">

          <p style={{ ...KICKER, color: '#16775C', marginBottom: '12px' }}>収入の切り分け</p>
          <h2 className="font-serif font-black text-ink"
            style={{ fontSize: 'clamp(21px, 2.4vw, 28px)', lineHeight: 1.5, letterSpacing: '-0.01em', maxWidth: '26ch', marginBottom: '16px' }}>
            ABNを持つと、申告の何が変わりますか。
          </h2>
          {/* 「その両方を突き合わせる1つの申告です」は、下のリスト最後の項目と
              ページ末のNextStepがすでに言っている。 */}
          <p style={{ ...BODY, color: '#2A3C34', maxWidth: '44ch', marginBottom: '30px' }}>
            変わるのは4つで、しかも互いに影響し合います。
          </p>

          <ol className="flex flex-col" style={{ gap: '22px' }}>
            {THE_SPLIT.map((s) => (
              <li key={s.n} className="flex gap-4">
                <span className="font-serif font-black flex-shrink-0"
                  style={{ fontSize: '15px', color: '#16775C', width: '28px', paddingTop: '4px' }}
                  aria-hidden="true">{s.n}</span>
                <div>
                  <h3 className="font-semibold text-ink" style={{ fontSize: '16px', lineHeight: 1.6, marginBottom: '6px' }}>{s.title}</h3>
                  <p style={{ ...BODY, color: '#2A3C34' }}>{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── 3. 注意 ──────────────────────────────────────────────────────── */}
      <section className="py-12 lg:py-16" style={{ background: '#F5F9F7' }}>
        <div className="max-w-[820px] mx-auto px-5 md:px-8 reveal">

          <h2 className="font-serif font-black text-ink"
            style={{ fontSize: 'clamp(21px, 2.4vw, 28px)', lineHeight: 1.5, letterSpacing: '-0.01em', maxWidth: '28ch', marginBottom: '16px' }}>
            雇用主に言われたという理由でABNを登録すべきですか。
          </h2>
          <p style={{ ...BODY, color: '#2A3C34', maxWidth: '44ch', marginBottom: '16px' }}>
            誰かが仕事の中身を見るまでは、登録すべきではありません。実態は雇用なのにABNにすると、スーパーアニュエーションが積み立てられず、税金も源泉徴収されず、労災保険の対象から外れ、最低賃金や割増賃金の枠組みの外に出て、そのすべてがあなたの負担になります。ファーム、飲食、清掃、建設現場ではよくあることです。
          </p>
          <p style={{ ...BODY, color: '#2A3C34', maxWidth: '44ch', marginBottom: '22px' }}>
            判断の基準は書類ではなく指揮命令です。働く時間を誰が決めるか、進め方を誰が指示するか、道具を誰が用意するか、うまくいかなかったときのリスクを誰が負うか。答えが相手を指しているなら、ABNは適切な手段ではありません。
          </p>

          <div className="rounded-[12px] flex gap-3" style={{ padding: '16px 18px', background: '#FDF0D5', border: '1px solid #F9D88A' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: '2px' }}>
              <path d="M12 2L2 22h20L12 2z" stroke="#B8770C" strokeWidth="1.8" strokeLinejoin="round" />
              <line x1="12" y1="10" x2="12" y2="15" stroke="#B8770C" strokeWidth="1.8" strokeLinecap="round" />
              <line x1="12" y1="18" x2="12.01" y2="18" stroke="#B8770C" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <p style={{ ...BODY, color: '#2A3C34' }}>
              <strong style={{ color: '#080F0D' }}>登録する前に、その仕事の内容をお送りください。</strong>
              作業の中身、誰が何を用意するか、どう支払われると言われているか。どちらに当たるかをお伝えします。
            </p>
          </div>
        </div>
      </section>

      {/* ── 4. 当社が行うこと ────────────────────────────────────────────── */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-[880px] mx-auto px-5 md:px-8 reveal">

          <p style={{ ...KICKER, color: '#16775C', marginBottom: '12px' }}>当社の作業</p>
          <h2 className="font-serif font-black text-ink"
            style={{ fontSize: 'clamp(21px, 2.4vw, 28px)', lineHeight: 1.5, letterSpacing: '-0.01em', marginBottom: '16px' }}>
            当社が行うこと
          </h2>
          <p style={{ ...BODY, color: '#4C6459', maxWidth: '44ch', marginBottom: '26px' }}>
            登録そのものは無料で、数分で終わります。それがいくらの負担になるかを決めるのは、その前と後にあることです。
          </p>

          <div className="grid gap-3 sm:grid-cols-2">
            {WHAT_WE_DO.map((c) => (
              <div key={c.title} className="rounded-[12px]" style={{ padding: '16px 18px', background: '#F5F9F7', border: '1px solid #E2EFE9' }}>
                <h3 className="font-semibold text-ink" style={{ fontSize: '16px', lineHeight: 1.6, marginBottom: '6px' }}>{c.title}</h3>
                <p style={{ ...BODY, color: '#2A3C34' }}>{c.body}</p>
              </div>
            ))}
          </div>

          <p className="font-serif" style={{ fontSize: '17px', lineHeight: 1.75, color: '#0B5240', marginTop: '22px', maxWidth: '36ch', fontWeight: 700 }}>
            myGovにログインすることも、IDを連携することも、どの書類がどれかを調べることもありません。ATOとは当社が直接やり取りします。
          </p>

          <p style={{ ...BODY, color: '#4C6459', marginTop: '18px', maxWidth: '44ch' }}>
            ABNもTFNもまだお持ちでない場合は{' '}
            <Link href="/ja/tfn" style={{ color: '#0B5240', fontWeight: 600, textDecoration: 'underline' }}>TFNが先</Link>
            です。ABNの申請はTFNと照合されます。
          </p>
        </div>
      </section>

      {/* ── 5. 保証 ──────────────────────────────────────────────────────── */}
      <section className="py-11 lg:py-14" style={{ background: '#0B5240' }}>
        <div className="max-w-[780px] mx-auto px-5 md:px-8 text-center reveal">
          <p style={{ ...KICKER, color: '#F9D88A', marginBottom: '14px' }}>当社の保証</p>
          <p className="font-serif font-black text-white mx-auto"
            style={{ fontSize: 'clamp(21px, 2.8vw, 28px)', lineHeight: 1.6, letterSpacing: '-0.01em', maxWidth: '24ch' }}>
            還付金が当社の料金を下回った場合は、差額を返金します。お客様が損をすることはありません。
          </p>
          <p className="mx-auto" style={{ ...BODY, color: 'rgba(255,255,255,0.72)', maxWidth: '40ch', marginTop: '16px' }}>
            料金は定額制で、還付額に対する歩合ではありません。
          </p>
        </div>
      </section>

      {/* ── 6. CTA ───────────────────────────────────────────────────────── */}
      <section className="py-12 lg:py-16" style={{ background: '#F5F9F7' }}>
        <div className="max-w-[780px] mx-auto px-5 md:px-8 reveal">
          <h2 className="font-serif font-black text-ink"
            style={{ fontSize: 'clamp(21px, 2.4vw, 28px)', lineHeight: 1.5, letterSpacing: '-0.01em', marginBottom: '16px' }}>
            その仕事の内容を教えてください
          </h2>
          <p style={{ ...BODY, color: '#2A3C34', maxWidth: '42ch', marginBottom: '24px' }}>
            誰に請求書を出すことになるのか、何をするのか、道具は誰が用意するのか。それだけあれば、そもそもABNが必要な話かどうかをお伝えできます。
          </p>
          <WaLink href={waUrl({ topic: 'abn', lang: 'ja', tier: 'tfn-abn' })} position="section" topic="abn" lang="ja" tier="tfn-abn"
            className="btn-primary inline-flex items-center justify-center gap-2"
            style={{ height: '54px', padding: '0 30px', fontSize: '15.5px', borderRadius: '100px', maxWidth: '330px', width: '100%' }}>
            <IconWhatsApp />
            WhatsAppで相談する
          </WaLink>
          <p style={{ fontSize: '13.5px', color: '#4C6459', marginTop: '12px' }}>
            約1時間で返信します。
          </p>
        </div>
      </section>

      {/* ── 7. 信頼 ──────────────────────────────────────────────────────── */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-[1000px] mx-auto px-5 md:px-8 reveal">
          <h2 className="font-serif font-black text-ink text-center"
            style={{ fontSize: 'clamp(21px, 2.4vw, 28px)', lineHeight: 1.5, letterSpacing: '-0.01em', marginBottom: '16px' }}>
            ワーキングホリデーの税金だけを扱っています。
          </h2>
          <p className="text-center mx-auto" style={{ ...BODY, color: '#2A3C34', maxWidth: '44ch', marginBottom: '28px' }}>
            だからこそ、同じABNの形を何度も見ています。ファームの請負契約、配達プラットフォーム、全員を下請け扱いにする建設現場。
          </p>
          <GoogleReviews lang="ja" />
        </div>
      </section>

      {/* ── 8. よくある質問 ──────────────────────────────────────────────── */}
      <section className="py-12 lg:py-16" style={{ background: '#F5F9F7' }}>
        <div className="max-w-[820px] mx-auto px-5 md:px-8">
          <h2 className="font-serif font-black text-ink"
            style={{ fontSize: 'clamp(21px, 2.4vw, 28px)', lineHeight: 1.5, letterSpacing: '-0.01em', marginBottom: '20px' }}>
            相談前によく聞かれるABNの質問
          </h2>

          <div className="flex flex-col" style={{ gap: '4px' }}>
            {FAQS.map((f, i) => (
              <details key={i} name="abn-faq-ja" className="contact-faq-item">
                <summary className="contact-faq-summary">
                  <span style={{ flex: 1 }}>{f.question}</span>
                  <span className="contact-faq-plus" aria-hidden="true">+</span>
                </summary>
                {/* 空行で区切り、長い回答を短い段落として出す。上のfaqLdは
                    元の文字列をそのまま使っている。 */}
                {f.answer.split('\n\n').map((para, j) => (
                  <p key={j} className="contact-faq-answer" style={{ fontSize: '15px', lineHeight: 1.85 }}>{para}</p>
                ))}
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. ガイド ────────────────────────────────────────────────────── */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-[1000px] mx-auto px-5 md:px-8 reveal">
          <p style={{ ...KICKER, color: '#16775C', marginBottom: '12px' }}>ガイド</p>
          <h2 className="font-serif font-black text-ink"
            style={{ fontSize: 'clamp(21px, 2.4vw, 28px)', lineHeight: 1.5, letterSpacing: '-0.01em', marginBottom: '20px' }}>
            請負、必要経費、GSTをさらに詳しく
          </h2>
          {/* リード文は下に並ぶ3枚のカードを列挙していただけ。カードが担う。 */}

          <div className="grid gap-3 sm:grid-cols-3">
            {GUIDES.map((g) => (
              <Link key={g.href} href={g.href}
                className="group bg-white rounded-[12px] transition-all hover:shadow-lg"
                style={{ padding: '16px 18px', border: '1px solid #E2EFE9', display: 'block' }}>
                <h3 className="font-semibold text-ink" style={{ fontSize: '15px', marginBottom: '4px', lineHeight: 1.6 }}>{g.title}</h3>
                <p style={{ fontSize: '13px', lineHeight: 1.8, color: '#4C6459' }}>{g.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <NextStep
        eyebrow="次のステップ"
        heading="どちらの収入も1つの申告に載ります"
        body="給与所得と請求収入は、同じ年度の同じタックスリターンに載せます。切り分けがきちんと行われるかどうかは、そこで決まります。"
        cta="タックスリターンの流れ →"
        href="/ja/tax-return"
      />

      <MobileCta href={WA_ABN} lang="ja" topic="abn" />
    </>
  )
}
