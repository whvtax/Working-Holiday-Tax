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
      'x-default': `${SITE_URL}/tfn`,
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'ワーキングホリデーのTFN申請' }],
    type: 'website',
    locale: 'ja_JP',
    url: `${SITE_URL}/ja/tfn`,
    siteName: 'Working Holiday Tax',
    title: 'TFN申請代行｜ワーホリの45%課税を止める',
    description:
      '番号は無料。無料でないのは、それがない期間です。417・462ビザのTFN申請を、一度で通るように準備して提出します。',
  },
  twitter: {
    images: [`${SITE_URL}/og-image.png`],
    card: 'summary_large_image',
    title: 'TFN申請代行｜ワーホリの45%課税を止める',
    description: '番号は無料。無料でないのは、それがない期間です。',
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

const FAILURE_POINTS = [
  {
    n: '01',
    title: '申請書の氏名が入国記録と一致していない',
    body: 'ATOは申請内容をビザの記録と照合します。ミドルネームの省略、更新したパスポート、姓名の順序の違いだけで、手作業の審査行きか差し戻しになります。',
  },
  {
    n: '02',
    title: '4週間後にその住所で郵便を受け取れない',
    body: 'TFNは国内住所宛ての手紙で届き、発行まで最大28日かかります。その間に移動してしまうと、手紙は置き去りになり、誰も転送してくれません。',
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
    body: 'ATOの目安は28日です。過ぎても通知は届かないため、当社から状況を確認し、結果をお知らせします。',
  },
  {
    title: '待っている間の対応を雇用主に伝えます',
    body: '申請の受付番号（reference number）を正しく伝えれば、待機中の最初の給与が最高税率になるのを防げます。',
  },
  {
    title: '空白期間分は年度末に取り戻します',
    body: 'すでに45%で引かれた分は、タックスリターンでしか戻りません。しかも、申告内容がそれを反映している場合だけです。',
  },
]

const FAQS = [
  {
    question: 'TFNの申請は自分でできますか。',
    answer:
      'ご自身でできますし、申請自体は無料の短いフォームです。費用をいただくのはその周りの作業です。申請内容を入国記録と突き合わせること、4週間後にも郵便を受け取れる住所を選ぶこと、最初の給与が45%にならないよう申請の受付番号を雇用主にお伝えすること、届かないときにATOへ照会すること、そしてすでに最高税率で引かれた分をタックスリターンで取り戻すことです。',
  },
  {
    question: 'TFNの申請はATOのサイトで無料です。何に対する費用ですか。',
    answer:
      '番号の取得自体は無料です。その点は必ず正直にお伝えします。お金がかかるのは空白期間のほうです。雇用主が番号を受け取るまでの給与は、15%ではなく45%で源泉徴収されます。費用は、その期間を一度で終わらせること、そしてすでに引かれた分を取り戻すことに対するものです。',
  },
  {
    question: 'TFNなしで働き始めると実際にどうなりますか。',
    answer:
      '雇用主は、タックスファイルナンバーを受け取るまで、ワーキングホリデーメーカーの15%（45,000ドルまで）ではなく最高税率の45%で源泉徴収する義務があります。番号を渡す期限は就労開始から28日です。時給25ドルの仕事なら、その期間の1時間ごとに約7.50ドルが、あなたではなくATOに渡っている計算になります。この金額は消えるわけではありませんが、戻る経路は年度後のタックスリターンだけで、しかも申告内容が正しく整理されている場合に限られます。',
  },
  {
    question: 'すでに数週間TFNなしで働いています。もう手遅れですか。',
    answer:
      'いいえ。ここで締め切られる期限はありません。今すぐ申請すれば、これ以降の給与に最高税率が適用されなくなります。すでに引かれすぎた分は、その年度のタックスリターンを提出したときに戻ります。ご連絡いただいた当日に申請の準備が整うことがほとんどですので、45%で働いた週数も併せてお知らせください。申告内容が変わります。',
  },
  {
    question: 'TFNが届くまでどのくらいかかりますか。',
    answer:
      'ATOはTFN申請を28日以内に処理すると案内しており、実際には多くのワーキングホリデーメーカーが2週間から4週間で受け取っています。申請書に記載したオーストラリアの住所宛ての手紙で届くため、この住所は多くの方が思うよりずっと重要です。待っている間に雇用主が必要とするのは、申請の受付番号です。',
  },
  {
    question: 'オーストラリアに着く前にTFNを申請できますか。',
    answer:
      'ワーキングホリデービザではできません。417・462ビザが有効な状態でオーストラリアに入国してから申請します。申請内容が入国とビザの記録と照合されるためです。さらに、手紙を受け取るためのオーストラリア国内の住所も必要になります。到着前に出された申請は、理由の説明もないまま止まってしまうことが最も多いパターンです。',
  },
  {
    question: 'セカンドビザのときにTFNを取り直す必要はありますか。',
    answer:
      'いいえ。タックスファイルナンバーは一度だけ発行され、生涯同じ番号を使います。セカンド・サードのワーキングホリデービザをまたいでも、ビザの種類が変わっても、一度オーストラリアを完全に離れても変わりません。番号を持っていないのではなく忘れてしまっただけであれば、それははるかに早く解決できる別の問題ですので、どちらに当たるかをお知らせください。',
  },
]

const GUIDES = [
  {
    href: '/ja/blog/what-happens-without-your-tfn',
    title: 'TFNなしで働くとどうなるか',
    desc: '45%の源泉徴収、28日の猶予、そして戻ってくる仕組み。',
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

// ─── SHARED INLINE STYLES ───────────────────────────────────────────────
const KICKER: CSSProperties = { fontSize: '10.5px', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 500 }
const BODY: CSSProperties = { fontSize: '15px', lineHeight: 1.85 }
const LEDE: CSSProperties = { fontSize: '16.5px', lineHeight: 1.9 }

export default function TFNPageJA() {
  const webPageLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}/ja/tfn#webpage`,
    url: `${SITE_URL}/ja/tfn`,
    name: 'TFN申請代行（ワーキングホリデー）',
    description:
      'TFNなしで働くことの費用、ワーキングホリデーのTFN申請が通らない理由、そして引かれすぎた分が戻る仕組み。',
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
      <section className="relative overflow-hidden pt-[68px]" style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #F2FAF7 100%)' }}>
        <div className="max-w-[820px] mx-auto px-5 md:px-8 pt-8 pb-11 lg:pt-12 lg:pb-14">

          <nav aria-label="Breadcrumb" className="flex items-center gap-2" style={{ fontSize: '13px', color: '#4C6459', marginBottom: '10px' }}>
            <Link href="/ja" className="inline-flex items-center transition-colors hover:text-forest-500" style={{ minHeight: '44px' }}>ホーム</Link>
            <span aria-hidden="true" style={{ color: '#CDE3DB' }}>/</span>
            <span aria-current="page">TFN申請</span>
          </nav>

          <p className="hero-animate" style={{ ...KICKER, color: '#16775C', marginBottom: '14px' }}>
            ワーキングホリデービザ 417・462
          </p>

          <h1 className="font-serif font-black text-ink hero-animate"
            style={{ fontSize: 'clamp(26px, 4.4vw, 38px)', lineHeight: 1.36, letterSpacing: '-0.01em', marginBottom: '16px' }}>
            <span style={{ display: 'block' }}>番号は無料です。</span>
            <span style={{ display: 'block', color: '#0B5240' }}>無料でないのは、それがない期間です。</span>
          </h1>

          <p className="hero-lede hero-animate-delay" style={{ ...LEDE, color: '#4C6459', maxWidth: '40ch', marginBottom: '26px' }}>
            雇用主が番号を受け取るまで、給与は15%ではなく45%で源泉徴収されます。
          </p>

          <div className="hero-animate-delay-2">
            <WaLink href={WA_TFN} position="hero" topic="tfn" lang="ja"
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

      {/* ── 2. 空白期間の代償 ────────────────────────────────────────────── */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-[820px] mx-auto px-5 md:px-8 reveal">

          <h2 className="font-serif font-black text-ink"
            style={{ fontSize: 'clamp(21px, 2.4vw, 28px)', lineHeight: 1.5, letterSpacing: '-0.01em', maxWidth: '26ch', marginBottom: '14px' }}>
            TFNが届く前に働き始めると、いくら失いますか。
          </h2>
          <p style={{ ...BODY, color: '#2A3C34', maxWidth: '44ch', marginBottom: '28px' }}>
            28日以内に雇用主へTFNを渡さないと、ワーキングホリデーの15%ではなく45%で源泉徴収されます。引かれすぎた税金は消えるわけではなく、6月30日以降にタックスリターンを提出すれば戻る場合があります。
          </p>

          <div className="grid gap-4 sm:grid-cols-3">
            <div style={{ borderTop: '2px solid #0B5240', paddingTop: '16px' }}>
              <p className="font-serif font-black text-forest-500" style={{ fontSize: '31px', lineHeight: 1, letterSpacing: '-0.02em', marginBottom: '10px' }}>45%</p>
              <p style={{ ...BODY, color: '#2A3C34' }}>TFNが未提出の間、15%ではなくこの税率で全額から源泉徴収されます。</p>
            </div>
            <div style={{ borderTop: '2px solid #0B5240', paddingTop: '16px' }}>
              <p className="font-serif font-black text-forest-500" style={{ fontSize: '31px', lineHeight: 1, letterSpacing: '-0.02em', marginBottom: '10px' }}>28日</p>
              <p style={{ ...BODY, color: '#2A3C34' }}>雇用主にTFNを渡す期限であり、ATOが発行にかける目安でもあります。</p>
            </div>
            <div style={{ borderTop: '2px solid #0B5240', paddingTop: '16px' }}>
              <p className="font-serif font-black text-forest-500" style={{ fontSize: '31px', lineHeight: 1, letterSpacing: '-0.02em', marginBottom: '10px' }}>申告1回</p>
              <p style={{ ...BODY, color: '#2A3C34' }}>誤った税率で引かれた分が戻る、唯一の経路です。</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. どこでつまずくか ──────────────────────────────────────────── */}
      <section className="py-12 lg:py-16" style={{ background: '#F5F9F7' }}>
        <div className="max-w-[820px] mx-auto px-5 md:px-8 reveal">

          <p style={{ ...KICKER, color: '#16775C', marginBottom: '12px' }}>自分でやる場合</p>
          <h2 className="font-serif font-black text-ink"
            style={{ fontSize: 'clamp(21px, 2.4vw, 28px)', lineHeight: 1.5, letterSpacing: '-0.01em', marginBottom: '14px' }}>
            ワーホリのTFN申請はなぜ通らないのですか。
          </h2>
          <p style={{ ...BODY, color: '#2A3C34', maxWidth: '44ch', marginBottom: '30px' }}>
            フォームは短く、たいていはそのまま通ります。問題が起きる場合はほぼ次の3つのどれかで、いずれも届かない手紙を待つ間、もう1か月45%で課税され続けることになりかねません。
          </p>

          <ol className="flex flex-col" style={{ gap: '22px' }}>
            {FAILURE_POINTS.map((s) => (
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

      {/* ── 4. 当社が行うこと ────────────────────────────────────────────── */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-[880px] mx-auto px-5 md:px-8 reveal">

          <p style={{ ...KICKER, color: '#16775C', marginBottom: '12px' }}>当社の作業</p>
          <h2 className="font-serif font-black text-ink"
            style={{ fontSize: 'clamp(21px, 2.4vw, 28px)', lineHeight: 1.5, letterSpacing: '-0.01em', marginBottom: '14px' }}>
            当社が行うこと
          </h2>
          <p style={{ ...BODY, color: '#4C6459', maxWidth: '44ch', marginBottom: '26px' }}>
            必要な情報をWhatsAppでお送りいただくだけです。以下はすべて当社側で行います。
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
            すでに番号をお持ちで、45%で引かれた期間を取り戻したい方は{' '}
            <Link href="/ja/tax-return" style={{ color: '#0B5240', fontWeight: 600, textDecoration: 'underline' }}>タックスリターンのページ</Link>
            をご覧ください。
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
            style={{ fontSize: 'clamp(21px, 2.4vw, 28px)', lineHeight: 1.5, letterSpacing: '-0.01em', maxWidth: '24ch', marginBottom: '14px' }}>
            いまどの段階かをお知らせください
          </h2>
          <p style={{ ...BODY, color: '#2A3C34', maxWidth: '42ch', marginBottom: '24px' }}>
            すでに入国しているか、仕事を始めているか、45%で支払われた給与がすでにあるか。この3点だけで、次に何をすべきかをお伝えできます。
          </p>
          <WaLink href={WA_TFN} position="section" topic="tfn" lang="ja"
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
            style={{ fontSize: 'clamp(21px, 2.4vw, 28px)', lineHeight: 1.5, letterSpacing: '-0.01em', marginBottom: '12px' }}>
            ワーキングホリデーの税金だけを扱っています。
          </h2>
          <p className="text-center mx-auto" style={{ ...BODY, color: '#2A3C34', maxWidth: '44ch', marginBottom: '28px' }}>
            提出するTFN申請は、すべて417・462ビザの方のものです。だからこそ、つまずく箇所はいつも同じ3つです。タックスリターンは登録税理士が確認・承認したうえでATOに提出します。
          </p>
          <GoogleReviews lang="ja" />
        </div>
      </section>

      {/* ── 8. よくある質問 ──────────────────────────────────────────────── */}
      <section className="py-12 lg:py-16" style={{ background: '#F5F9F7' }}>
        <div className="max-w-[820px] mx-auto px-5 md:px-8">
          <h2 className="font-serif font-black text-ink"
            style={{ fontSize: 'clamp(21px, 2.4vw, 28px)', lineHeight: 1.5, letterSpacing: '-0.01em', marginBottom: '20px' }}>
            相談前によく聞かれるTFNの質問
          </h2>

          <div className="flex flex-col" style={{ gap: '4px' }}>
            {FAQS.map((f, i) => (
              <details key={i} name="tfn-faq-ja" className="contact-faq-item">
                <summary className="contact-faq-summary">
                  <span style={{ flex: 1 }}>{f.question}</span>
                  <span className="contact-faq-plus" aria-hidden="true">+</span>
                </summary>
                <p className="contact-faq-answer" style={{ fontSize: '15px', lineHeight: 1.85 }}>{f.answer}</p>
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
            style={{ fontSize: 'clamp(21px, 2.4vw, 28px)', lineHeight: 1.5, letterSpacing: '-0.01em', marginBottom: '12px' }}>
            TFNと45%の期間をさらに詳しく
          </h2>
          <p style={{ ...BODY, color: '#4C6459', maxWidth: '44ch', marginBottom: '24px' }}>
            源泉徴収、待ち時間、受付番号について書いた3本のガイドです。
          </p>

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
        heading="45%で引かれた期間は申告で戻ります"
        body="番号が登録されたら、引かれすぎた分を取り戻すのはタックスリターンです。"
        cta="タックスリターンの流れ →"
        href="/ja/tax-return"
      />

      <MobileCta href={WA_TFN} lang="ja" topic="tfn" />
    </>
  )
}
