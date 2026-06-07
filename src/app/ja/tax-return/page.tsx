import type { Metadata } from 'next'
import { GoogleRating } from '@/components/ui/GoogleRating'
import { GoogleReviews } from '@/components/ui/GoogleReviews'
import Link from 'next/link'
import { WA_URL, SITE_URL } from '@/lib/constants'
import { NextStep } from '@/components/ui/NextStep'
import { Accordion } from '@/components/ui/Accordion'

export const metadata: Metadata = {
  title: 'オーストラリア タックスリターン 還付金 | ワーホリ専門・登録税理士監督',
  description: 'オーストラリア タックスリターン 還付金の手続きを、417・462ビザのワーキングホリデー専門のチームが登録税理士の監督のもとで日本語で完全代行。準備からATOへの提出まで、帰国後の日本からでもオンラインで完結します。',
  keywords: [
    // Refund-focused (primary)
    'オーストラリア タックスリターン 還付金',
    'オーストラリア タックスリターン',
    'ワーキングホリデー タックスリターン 還付',
    'ワーホリ タックスリターン 還付金',
    'ワーホリ タックスリターン',
    'ワーホリ 還付金',
    '417ビザ タックスリターン 還付',
    '462ビザ タックスリターン 還付',
    'バックパッカー タックスリターン 還付',
    'ワーホリ 還付金 いくら',
    'オーストラリア 税金 戻ってくる',
    'オーストラリア 税金 取り戻す',
    'WHV タックスリターン 還付',
    'タックスリターン 還付金 計算 オーストラリア',
    'オーストラリア 帰国後 還付金',
    'ワーホリ 帰国後 タックスリターン',
    'タックスリターン 帰国後 オーストラリア',
    'オーストラリア タックスリターン 日本から',
    // Adjacent / informational
    'オーストラリア タックスリターン ワーキングホリデー',
    'バックパッカー 税金 還付',
    '417ビザ タックスリターン',
    '462ビザ タックスリターン',
    'タックスリターン オーストラリア 日本語',
    'タックスリターン オーストラリア',
    'オーストラリア タックスリターン やり方',
    'オーストラリア タックスリターン 期限',
    'オーストラリア タックスリターン いつ',
    'タックスリターン 提出 ワーホリ',
    'タックスリターン 必要書類 ワーホリ',
    'オーストラリア 確定申告 ワーホリ',
    'オーストラリア 滞在後 税金 還付',
    '登録税理士 オーストラリア 日本語',
    '日豪租税条約 ワーホリ',
    'Notice of Assessment 日本語',
  ],
  alternates: {
    canonical: `${SITE_URL}/ja/tax-return`,
    languages: {
      'en-AU': `${SITE_URL}/tax-return`,
      'de': `${SITE_URL}/de/tax-return`,
      'ja': `${SITE_URL}/ja/tax-return`,
      'x-default': `${SITE_URL}/tax-return`,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: `${SITE_URL}/ja/tax-return`,
    siteName: 'Working Holiday Tax',
    title: 'オーストラリア タックスリターン 還付金 | ワーホリ専門・登録税理士監督',
    description: '417・462ビザのワーホリ専門。登録税理士の監督のもとで、タックスリターン還付金の手続きを日本語で代行。帰国後も対応。',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'オーストラリア タックスリターン 還付金 | ワーホリ専門',
    description: 'ワーホリのタックスリターン還付金を、日本語で完全代行。帰国後も対応。',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

const faqs = [
  {
    question: 'ワーホリのタックスリターン還付金とはどのような仕組みですか？',
    answer: '417・462ビザでオーストラリアで働くと、雇用主は毎回の給与から税金を源泉徴収します。会計年度末（6月30日）後にATO（オーストラリア税務署）へタックスリターンを提出すると、払いすぎていた分が還付金としてあなたに戻ってきます。還付金の金額は、所得、税務上の居住者ステータス、申告できる控除、雇用主がワーキングホリデーメーカー雇用主として登録されていたかなど、個人の状況によって大きく異なります。確認する唯一の方法は、タックスリターンを提出することです。',
  },
  {
    question: '短期間しか働いていない場合でもタックスリターンは必要ですか？',
    answer: 'はい、たとえ数週間のカジュアル業務でも、会計年度内（7月1日〜翌年6月30日）にオーストラリアで収入があった場合は提出が必要です。短期間勤務では多めに源泉徴収されていることが多く、タックスリターンが還付金を取り戻す唯一の方法となるケースが多いです。',
  },
  {
    question: '帰国後でもタックスリターンを提出して還付金を受け取れますか？',
    answer: 'はい、日本帰国後でも世界中どこからでも提出できます。登録税理士の監督のもとでオンラインで完結します。タックスリターン還付金はオーストラリアの銀行口座への振込のみ可能です（ATOのルールにより、海外口座への振込はできません）。帰国後でも数年遡って申請できるケースもあります。',
  },
  {
    question: '還付金がもらえるか、どうやって分かりますか？',
    answer: '年間で源泉徴収された税金が実際の納税額より多い場合、差額が還付されます。TFNなしの期間があった、間違った税率で源泉徴収された、業務関連の控除可能経費がある、会計年度の一部しか働いていない、などのケースでは還付金になることが多いです。登録税理士の監督のもとであなたの状況を確認し、正確に申告します。',
  },
  {
    question: 'ワーホリのタックスリターン還付金はいくらもらえますか？',
    answer: '還付金の金額は、収入、源泉徴収された税額、税務上の居住者ステータス、ビザの種類、申告可能な控除など、個人の状況によって大きく異なります。具体的な金額をお約束することはできませんが、当社では正確にタックスリターンを提出し、お客様が受け取るべき控除を漏れなく申告いたします。',
  },
  {
    question: '還付金はどのくらいの期間で振り込まれますか？',
    answer: 'タックスリターンを提出してから、ATOでの処理は通常7〜14営業日かかります。繁忙期や追加情報が必要な場合はそれ以上かかる場合もあります。処理完了後、ご指定の銀行口座に直接振り込まれます。',
  }
  ]

const DEDUCTIONS = [
  { title: '作業着・ユニフォーム', body: '安全靴、蛍光ベスト、シェフホワイト、雇用主指定のロゴ入りユニフォームなど。' },
  { title: '工具・機材',         body: '$300未満は即時控除可能。シェフナイフ、剪定鋏、デリバリーバッグ、職人の工具など。' },
  { title: 'ライセンス・資格',   body: 'RSA（アルコール提供）、White Card（建設業）、ホワイトワーキングチェックなど業務に必要なもの。' },
  { title: '洗濯・クリーニング', body: 'ユニフォームや保護用作業着の洗濯費用（自宅で洗う場合も対象）。' },
  { title: '業務関連の移動',     body: '現場間の移動、業務会議への移動など（自宅と通常職場間の通勤は除く）。' },
  { title: '電話・通信費',       body: '業務で使う携帯電話・インターネット料金の業務関連割合。' },
]

const STEPS = [
  { n: '1', title: 'ご相談・お問い合わせ',   body: '日本語でお気軽にご相談ください。ワーホリ タックスリターンに必要な情報を簡単にご案内します。' },
  { n: '2', title: '必要書類のご送付',       body: 'TFN、給与明細、控除関連の領収書などを送るだけ。日本からでも簡単に対応できます。' },
  { n: '3', title: 'ATOへ代理提出',          body: '控除を漏れなく申告し、タックスリターンをATOへ提出します。' },
  { n: '4', title: 'ATOからの結果通知',     body: '7〜14営業日でATOからの結果通知が届きます。還付金が発生する場合は、オーストラリアの銀行口座に振り込まれます。' },
]


const IconStar = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
    <path d="M6 1l1.35 2.73L10.5 4.2l-2.25 2.2.53 3.1L6 8.03 3.22 9.5l.53-3.1L1.5 4.2l3.15-.47z" fill="#E9A020"/>
  </svg>
)

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  inLanguage: 'ja',
  mainEntity: faqs.map(f => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: { '@type': 'Answer', text: f.answer },
  })),
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'ホーム', item: `${SITE_URL}/ja` },
    { '@type': 'ListItem', position: 2, name: 'タックスリターン', item: `${SITE_URL}/ja/tax-return` },
  ],
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'オーストラリアのタックスリターン申告方法（ワーキングホリデー）',
  description: 'オーストラリアのワーキングホリデーメーカーがタックスリターンを提出して還付金を受け取る手順。登録税理士の監督のもとで日本語で代行します。',
  inLanguage: 'ja',
  totalTime: 'P1D',
  estimatedCost: { '@type': 'MonetaryAmount', currency: 'AUD', value: '0' },
  supply: [
    { '@type': 'HowToSupply', name: 'TFN（タックスファイルナンバー）' },
    { '@type': 'HowToSupply', name: 'PAYG Payment Summary／Income Statement' },
    { '@type': 'HowToSupply', name: '業務関連経費の領収書' },
    { '@type': 'HowToSupply', name: '銀行口座情報（豪・日本のどちらでも可）' },
  ],
  step: STEPS.map((s, i) => ({
    '@type': 'HowToStep',
    position: i + 1,
    name: s.title,
    text: s.body,
    url: `${SITE_URL}/ja/tax-return#step-${i + 1}`,
  })),
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${SITE_URL}/ja/tax-return#service`,
  name: 'タックスリターン代行サービス',
  serviceType: 'タックスリターン申告',
  description: 'オーストラリアのワーキングホリデーメーカー向けタックスリターン代行。登録税理士の監督のもとで最大の還付金を取り戻します。平均還付額は約$2,800。',
  provider: { '@id': `${SITE_URL}/#business` },
  areaServed: { '@type': 'Country', name: 'Australia' },
  audience: { '@type': 'Audience', audienceType: 'Working Holiday Maker (Subclass 417/462)' },
  inLanguage: 'ja',
  offers: {
    '@type': 'Offer',
    priceCurrency: 'AUD',
    availability: 'https://schema.org/InStock',
    areaServed: 'AU',
  },
}

export default function JapaneseTaxReturnPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-[68px]" style={{background:'linear-gradient(160deg,#fff 0%,#F7FBF9 100%)'}}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 pt-6 pb-8 lg:pt-14 lg:pb-14">

          <nav aria-label="パンくずリスト" className="flex items-center gap-2 mb-4 lg:mb-6"
            style={{ fontSize:'12px', color:'rgba(10,15,13,0.35)' }}>
            <Link href="/ja" className="transition-colors hover:text-forest-500">ホーム</Link>
            <span aria-hidden="true" style={{ color:'rgba(10,15,13,0.18)' }}>/</span>
            <span aria-current="page">タックスリターン</span>
          </nav>

          <div className="max-w-[560px] lg:max-w-[700px]">

            <div className="inline-flex items-center gap-2 mb-3 lg:mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-forest-500 animate-pulse-dot" aria-hidden="true" />
              <span className="font-medium uppercase"
                style={{ fontSize:'10px', letterSpacing:'0.16em', color:'rgba(11,82,64,0.65)' }}>
                タックスリターン
              </span>
            </div>

            <h1 className="font-serif font-black text-ink"
              style={{
                fontSize:'clamp(24px,3.2vw,44px)',
                lineHeight:1.15,
                letterSpacing:'-0.02em',
                marginBottom:'10px',
              }}>
              <span style={{ display:'block' }}>オーストラリア</span>
              <span style={{ display:'block', color:'#0B5240' }}>タックスリターン還付金、</span>
              <span style={{ display:'block' }}>おまかせください。</span>
            </h1>

            <p className="font-semibold text-ink"
              style={{ fontSize:'clamp(14px,1.5vw,17px)', letterSpacing:'-0.01em', marginBottom:'8px', lineHeight:1.5 }}>
              417・462ビザのWHVタックスリターンをATOへ完全代行いたします。
            </p>

            <p className="font-light"
              style={{
                fontSize:'clamp(13px,1.2vw,15px)',
                lineHeight:1.75,
                color:'rgba(10,15,13,0.58)',
                maxWidth:'48ch',
                marginBottom:'0',
              }}>
              通常24時間以内に提出。還付金の平均は約$2,800です。
            </p>

            <div className="hero-cta-pair flex flex-col gap-3 lg:flex-row lg:gap-4"
              style={{ marginTop:'24px', marginBottom:'20px', maxWidth:'480px' }}>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                className="btn-primary inline-flex justify-center"
                style={{ height:'54px', padding:'0 36px', fontSize:'15px', borderRadius:'100px', flex:'1', width:'100%' }}>
                タックスリターンを依頼する →
              </a>
              <a href="#how-it-works"
                className="inline-flex btn-ghost-dark justify-center"
                style={{ height:'52px', padding:'0 24px', fontSize:'15px', flex:'1', width:'100%' }}>
                申請の流れを見る →
              </a>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-2 lg:flex lg:flex-row lg:flex-nowrap lg:items-center lg:gap-y-0 lg:gap-x-7">
              {['350名以上をサポート',<GoogleRating key="rating" variant="pill" lang="ja" />,'45カ国以上に対応','1時間以内に返信'].map((t,i) => (
                <span key={i} className="inline-flex items-center gap-1.5 whitespace-nowrap"
                  style={{ fontSize:'12px', color:'rgba(10,15,13,0.45)' }}>
                  <svg width="12" height="12" viewBox="0 0 13 13" fill="none" aria-hidden="true"><circle cx="6.5" cy="6.5" r="6" fill="#EAF6F1" stroke="#C8EAE0" strokeWidth="0.5"/><path d="M4 6.5l2 2 3.5-3.5" stroke="#0B5240" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>{t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT IS A TAX RETURN? - Unique design: refund/money motif ─── */}
      <section className="taxret-intro-section">
        <div className="taxret-intro-container">
          <div className="taxret-intro-grid">

            {/* Left: Visual — money refund */}
            <div className="taxret-intro-visual">
              <div className="taxret-refund-card">
                <p className="taxret-refund-label">平均還付金額</p>
                <p className="taxret-refund-amount">$2,800</p>
                <p className="taxret-refund-detail">ワーキングホリデー実績</p>
                <div className="taxret-refund-stars">
                  {Array.from({length:5}).map((_,i) => (
                    <svg key={i} width="14" height="14" viewBox="0 0 12 12" aria-hidden="true">
                      <path d="M6 1l1.35 2.73L10.5 4.2l-2.25 2.2.53 3.1L6 8.03 3.22 9.5l.53-3.1L1.5 4.2l3.15-.47z" fill="#E9A020"/>
                    </svg>
                  ))}
                </div>
              </div>
              <div className="taxret-arrows">
                <div className="taxret-arrow-item">
                  <span>あなた</span>
                  <svg width="20" height="14" viewBox="0 0 20 14" fill="none" aria-hidden="true">
                    <path d="M1 7h18M14 2l5 5-5 5" stroke="#2FA880" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>ATO</span>
                </div>
                <div className="taxret-arrow-item taxret-arrow-back">
                  <span>あなた</span>
                  <svg width="20" height="14" viewBox="0 0 20 14" fill="none" aria-hidden="true">
                    <path d="M19 7H1M6 2L1 7l5 5" stroke="#0B5240" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>ATO</span>
                </div>
              </div>
            </div>

            {/* Right: Explainer */}
            <div className="taxret-intro-content">
              <p className="taxret-intro-eyebrow">多くのワーホリが還付金を受け取っています</p>
              <h2 className="taxret-intro-heading">
                タックスリターンとは？
              </h2>
              <p className="taxret-intro-body">
                <strong>タックスリターン</strong>（日本でいう確定申告）は、毎年の所得をATO（オーストラリア税務署）に申告する手続きです。年間の収入、源泉徴収された税金、控除可能な業務関連経費を照合し、最終的な納税額を確定させます。
              </p>
              <p className="taxret-intro-body">
                ワーキングホリデーメーカーの多くは<strong>年間で税金を払い過ぎている</strong>ため、差額が還付金として戻ってきます。当社で対応したワーホリの平均還付額は約<strong>$2,800</strong>。$1,000〜$5,000の還付になることも珍しくありません。
              </p>
              <p className="taxret-intro-body">
                オーストラリアの会計年度は<strong>7月1日〜翌年6月30日</strong>。提出期限は10月31日ですが、当社のように登録税理士の監督のもとで提出する場合は翌年5月まで延長されます。日本帰国後でも世界中どこからでも申請可能で、還付金はオーストラリア・日本どちらの口座でも受け取れます。
              </p>
            </div>

          </div>

          {/* CTA strip to OUR service */}
          <div className="service-cta-strip">
            <div className="service-cta-text">
              <h3 className="service-cta-heading">登録税理士の監督のもとで代理申告いたします</h3>
              <p className="service-cta-sub">初回相談は無料。ATOポータルや英語の書類と格闘する必要はありません。日本語ですべて完結し、最大の還付金を取り戻します。帰国後も対応可能です。</p>
            </div>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="service-cta-button">
              還付金を取り戻す →
            </a>
          </div>
        </div>
      </section>

      {/* ── SOLUTION ──────────────────────────────────────────────────────── */}
      <section className="py-10 lg:py-14" style={{ background: '#F5F9F7' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-xl mx-auto text-center reveal" style={{ marginBottom: '32px' }}>
            <span className="section-label center">当社のサービス</span>
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.2, letterSpacing: '-0.02em', maxWidth: '28ch', marginTop: '8px', marginBottom: '8px', textWrap: 'balance' }}>
              タックスリターンを最初から最後まで日本語で代行
            </h2>
            <p className="font-light text-muted mx-auto" style={{ fontSize: '13.5px', lineHeight: 1.75, maxWidth: '34ch' }}>
              書類仕事はゼロ。最大の還付金を取り戻すために必要な手続きをすべてお任せください。
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6" style={{ marginBottom:'28px', alignItems:'stretch' }}>
            {[
              { icon:<svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M10 2v8l5 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.4"/></svg>, title:'すべての収入を正確に申告', body:'複数の雇用主、ABN収入、現金払いの仕事も含めて、漏れなく集計します。' },
              { icon:<svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M3 10h14M10 3l7 7-7 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>, title:'登録税理士の監督のもとで代理提出', body:'TANを持つ登録税理士の監督の下、ATOに直接タックスリターンを提出します。' },
              { icon:<svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><rect x="2" y="2" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.4"/><path d="M7 10l2.5 2.5 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>, title:'すべての控除を漏れなく適用', body:'作業着、工具、ライセンス、メディケア税免除など、対象となる控除をすべて適用します。' },
              { icon:<svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.4"/><path d="M10 6v4.5l3 1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>, title:'日本語で安心サポート', body:'専門用語を使わず日本語でわかりやすくご案内。ATOからの問い合わせも当社が代理対応します。' },
            ].map((item,i) => (
              <div key={i} className="bg-white rounded-2xl flex gap-4"
                style={{ padding:'20px', boxShadow:'0 1px 3px rgba(0,0,0,.04), 0 2px 10px rgba(11,82,64,.05)' }}>
                <div className="flex items-center justify-center flex-shrink-0 text-forest-500"
                  style={{ width:'36px', height:'36px', minWidth:'36px', background:'#EAF6F1', borderRadius:'8px' }}>
                  {item.icon}
                </div>
                <div style={{ paddingTop:'2px' }}>
                  <p className="font-semibold text-ink" style={{ fontSize:'clamp(13px, 1.2vw, 14px)', letterSpacing:'-0.01em', marginBottom:'6px', lineHeight:1.35 }}>{item.title}</p>
                  <p className="font-light text-muted" style={{ fontSize:'clamp(12px, 1.1vw, 13px)', lineHeight:1.7 }}>{item.body}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center reveal delay-2" style={{ marginTop: '32px' }}>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              className="btn-primary inline-flex"
              style={{ height: '52px', padding: '0 28px', fontSize: '14.5px', maxWidth: '300px', width: '100%' }}>
              タックスリターンを依頼する →
            </a>
            <p style={{ marginTop: '10px', fontSize: '12px', color: '#8AADA3' }}>無料相談&nbsp;&bull;&nbsp;事前支払い不要</p>
          </div>
        </div>
      </section>

      {/* ── EARLY SOCIAL PROOF ────────────────────────────────────────────── */}
      <section className="py-8 lg:py-10 bg-white">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-xl mx-auto text-center mb-8 reveal">
            <span className="section-label center">お客様の声</span>
            <h2 className="font-serif font-black text-ink mt-2" style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
              ワーホリの皆さんが受け取った還付金
            </h2>
          </div>
          <p className="text-center font-medium text-muted" style={{ fontSize: '12px', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '16px', color: 'rgba(10,15,13,0.4)' }}>実際のワーホリの方々の還付金</p>
          <GoogleReviews lang="ja" />
        </div>
      </section>

      {/* ── COMPARISON ── */}
      <section className="py-10 lg:py-16" style={{ background:'#F5F9F7' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 reveal">
          <div className="max-w-xl mx-auto text-center mb-8 lg:mb-10">
            <span className="section-label center">かんたんな方法</span>
            <h2 className="font-serif font-black text-ink mx-auto"
              style={{ fontSize:'clamp(19px, 2.04vw, 26px)', lineHeight:1.1, letterSpacing:'-0.025em', marginTop:'10px' }}>
              タックスリターンには、もっと簡単な方法があります
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6 max-w-3xl lg:max-w-4xl mx-auto" style={{ alignItems:'stretch' }}>
            <div className="rounded-2xl" style={{ padding:'22px', background:'#fff', border:'1.5px solid #E2EFE9' }}>
              <p className="font-semibold text-muted" style={{ fontSize:'11px', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:'18px' }}>
                自分でタックスリターンを提出すると、ミスが起こりがちです
              </p>
              <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
                {['複雑なATOのフォームとシステム','受けられる控除を見逃しやすい','正しく行うには時間と手間がかかる','問題が起きてもサポートがない'].map((item,i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink:0, marginTop:'3px' }}><circle cx="8" cy="8" r="7.5" fill="#FEF3F0" stroke="#FBD0BB" strokeWidth="0.5"/><path d="M5.5 10.5l5-5M10.5 10.5l-5-5" stroke="#9A3412" strokeWidth="1.3" strokeLinecap="round"/></svg>
                    <p className="font-light text-muted" style={{ fontSize:'clamp(12px, 1.1vw, 13px)', lineHeight:1.75 }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl flex flex-col" style={{ padding:'22px', background:'#EAF6F1', border:'1.5px solid #C8EAE0' }}>
              <p className="font-semibold text-forest-500" style={{ fontSize:'11px', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:'18px' }}>
                当社のサポート付きタックスリターン
              </p>
              <div style={{ display:'flex', flexDirection:'column', gap:'12px', marginBottom:'24px', flex:'1' }}>
                {['最初から正しく対応','受けられる控除をすべて特定','ストレスも混乱もなし','どのステップでも手厚くサポート'].map((item,i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink:0, marginTop:'3px' }}><circle cx="8" cy="8" r="7.5" fill="#EAF6F1" stroke="#C8EAE0" strokeWidth="0.5"/><path d="M5 8l2.5 2.5 4-4" stroke="#0B5240" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <p className="font-semibold text-ink" style={{ fontSize:'clamp(12px, 1.1vw, 13px)', lineHeight:1.75 }}>{item}</p>
                  </div>
                ))}
              </div>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex"
                style={{ height:'50px', padding:'0 24px', fontSize:'14px', width:'100%', justifyContent:'center' }}>
                タックスリターンを始める →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── TAX RATES ────────────────────────────────────────────────────── */}
      <section className="py-10 lg:py-12 bg-white">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-xl mx-auto text-center reveal" style={{ marginBottom: '32px' }}>
            <span className="section-label center">税率</span>
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.2, letterSpacing: '-0.02em', marginTop: '8px', marginBottom: '8px', textWrap: 'balance' }}>
              オーストラリアで実際に支払う税金
            </h2>
            <p className="font-light text-muted mx-auto" style={{ fontSize: '13px', lineHeight: 1.75, maxWidth: '40ch' }}>
              税率はビザの種類と状況によって異なります。
            </p>
          </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-7 items-stretch">
              {[
                {
                  label: 'ワーキングホリデービザ保持者',
                  rows: [
                    ['$0 - $45,000', '15%'],
                    ['$45,001 - $135,000', '$6,750 + 30%'],
                    ['$135,001 - $190,000', '$33,750 + 37%'],
                    ['$190,001+', '$54,100 + 45%'],
                  ],
                },
                {
                  label: 'オーストラリア税務居住者',
                  rows: [
                    ['$0 - $18,200', '0%'],
                    ['$18,201 - $45,000', '16%'],
                    ['$45,001 - $135,000', '$4,288 + 30%'],
                    ['$135,001 - $190,000', '$31,288 + 37%'],
                    ['$190,001+', '$51,638 + 45%'],
                  ],
                },
              ].map((table, ti) => (
                <div key={ti} className="min-w-0 flex flex-col">
                  <h3 className="font-semibold text-ink mb-3 text-center" style={{ fontSize: '13px', letterSpacing: '-0.01em' }}>{table.label}</h3>
                  <div className="rounded-xl overflow-hidden flex-1" style={{ border: '1px solid #C8EAE0' }}>
                    <table className="w-full" style={{ borderCollapse: 'collapse', tableLayout: 'fixed' }}>
                      <thead>
                        <tr style={{ background: '#EAF6F1' }}>
                          <th className="text-left font-semibold text-ink" style={{ fontSize: '11px', padding: '8px 12px', letterSpacing: '0.02em', width: '55%' }}>課税所得</th>
                          <th className="text-left font-semibold text-ink" style={{ fontSize: '11px', padding: '8px 12px', letterSpacing: '0.02em', width: '45%' }}>税率</th>
                        </tr>
                      </thead>
                      <tbody>
                        {table.rows.map(([income, rate], i) => (
                          <tr key={i} style={{ borderTop: '1px solid #E2EFE9', background: i % 2 === 0 ? '#ffffff' : '#F5F9F7' }}>
                            <td className="font-light text-body" style={{ fontSize: '11.5px', padding: '8px 12px' }}>{income}</td>
                            <td className="font-medium text-ink" style={{ fontSize: '11.5px', padding: '8px 12px' }}>{rate}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-xl px-5 py-3 mx-auto" style={{ background: '#FFFCF5', border: '1.5px solid #E9A020', borderRadius: '12px', maxWidth: 'fit-content' }}>
              <p className="font-light text-body" style={{ fontSize: '12.5px', lineHeight: 1.6, textAlign: 'center' }}>
                雇用主がワーキングホリデー雇用主として登録されていない場合、15%ではなく30%で課税される可能性があります。
              </p>
            </div>
            <div className="text-center mt-8">
              <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center font-medium transition-all"
                style={{ fontSize: '14px', color: '#0B5240', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
                税金を払い過ぎていないか確認する →
              </a>
            </div>
        </div>
      </section>

      {/* ── DEDUCTIONS ────────────────────────────────────────────────────── */}
      <section className="py-10 lg:py-14" style={{ background: '#F5F9F7' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-xl mx-auto text-center reveal" style={{ marginBottom: '32px' }}>
            <span className="section-label center">控除可能な経費</span>
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.2, letterSpacing: '-0.02em', maxWidth: '26ch', marginTop: '8px', marginBottom: '8px', textWrap: 'balance' }}>
              業務関連の経費で還付金が増えます
            </h2>
            <p className="font-light text-muted mx-auto" style={{ fontSize: '13.5px', lineHeight: 1.75, maxWidth: '34ch' }}>
              思っているよりも多くの経費が控除できます。漏れがないよう、すべて確認します。
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5 reveal delay-1">
            {DEDUCTIONS.map((d, i) => (
              <div key={i} className="bg-white rounded-xl" style={{ padding: '16px 18px', border: '1px solid #E2EFE9', boxShadow: '0 1px 3px rgba(0,0,0,.03)' }}>
                <div className="flex items-center gap-2" style={{ marginBottom: '5px' }}>
                  <span className="flex-shrink-0 flex items-center justify-center" style={{ width:'18px', height:'18px', borderRadius:'50%', background:'#EAF6F1', border:'1px solid #C8EAE0' }}>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true"><path d="M2 5l2.5 2.5 3.5-4" stroke="#0B5240" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  <p className="text-[13px] font-semibold text-ink">{d.title}</p>
                </div>
                <p className="text-[12.5px] font-light text-muted leading-[1.75]" style={{ maxWidth: '30ch', paddingLeft:'26px' }}>{d.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 max-w-xl reveal delay-2">
            <div className="info-block">
              <p>個人的な経費、罰金、通勤費用は控除できません。</p>
            </div>
          </div>

          <div className="text-center mt-8 reveal delay-3">
            <p className="font-light text-muted mx-auto" style={{ fontSize: '14px', lineHeight: 1.75, maxWidth: '40ch', marginBottom: '16px' }}>
              何が控除できるか分からない方も大丈夫。すべて確認して、最大の還付金を取り戻します。
            </p>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              className="btn-primary inline-flex"
              style={{ height: '48px', padding: '0 28px', fontSize: '14px', maxWidth: '280px', width: '100%', marginLeft: 'auto', marginRight: 'auto' }}>
              タックスリターンを依頼する →
            </a>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-10 lg:py-12 bg-white">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-xl mx-auto text-center reveal" style={{ marginBottom: '48px' }}>
            <span className="section-label center">ご利用の流れ</span>
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.2, letterSpacing: '-0.02em', maxWidth: '22ch', marginTop: '8px', marginBottom: '8px', textWrap: 'balance' }}>
              4ステップで完了
            </h2>
            <p className="font-light text-muted" style={{ fontSize: '14px' }}>
              ご相談から還付金受け取りまで、日本語ですべて対応
            </p>
          </div>

          <div className="reveal delay-1">
            <div className="hidden lg:block">
              <div className="relative flex items-start">
                <div className="absolute left-[calc(12.5%)] right-[calc(12.5%)] top-4 h-px" style={{ background: 'linear-gradient(90deg, #C8EAE0 0%, #0B5240 30%, #0B5240 70%, #C8EAE0 100%)', zIndex: 0 }} aria-hidden="true" />
                {STEPS.map((s, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center px-5" style={{ zIndex: 1 }}>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-bold text-white mb-5 flex-shrink-0" style={{ background: '#0B5240', boxShadow: '0 0 0 4px #ffffff, 0 0 0 5px #C8EAE0' }}>
                      {s.n}
                    </div>
                    <p className="text-[14px] font-semibold text-ink mb-2 text-center" style={{ letterSpacing: '-0.01em' }}>{s.title}</p>
                    <p className="text-[12.5px] font-light text-muted leading-[1.75] text-center">{s.body}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:hidden flex flex-col">
              {STEPS.map((s, i) => (
                <div key={i} className="flex gap-4" style={{ paddingBottom: '20px' }}>
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-bold text-white" style={{ background: '#0B5240' }}>{s.n}</div>
                    {i < STEPS.length - 1 && <div className="flex-1 w-px mt-2 min-h-[20px]" style={{ background: 'linear-gradient(180deg, #0B5240 0%, #C8EAE0 100%)' }} aria-hidden="true" />}
                  </div>
                  <div className="pt-1">
                    <p className="text-[13.5px] font-semibold text-ink" style={{ letterSpacing: '-0.01em', marginBottom: '4px' }}>{s.title}</p>
                    <p className="text-[13px] font-light text-muted leading-[1.75]">{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-8 reveal delay-2">
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ height: '52px', padding: '0 32px', fontSize: '15px' }}>
              タックスリターンを依頼する →
            </a>
            <p style={{ marginTop: '10px', fontSize: '12px', color: '#8AADA3' }}>無料相談&nbsp;&bull;&nbsp;事前支払い不要</p>
          </div>
        </div>
      </section>

      {/* ── WHAT TO HAVE READY ── */}
      <section className="py-10 lg:py-14" style={{ background:'#F5F9F7' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 reveal">
          <div className="max-w-xl mx-auto">
            <div className="text-center mb-6 lg:mb-8">
              <span className="section-label center">必要なもの</span>
              <h2 className="font-serif font-black text-ink mt-2" style={{ fontSize:'clamp(19px, 2.04vw, 26px)', lineHeight:1.15, letterSpacing:'-0.025em' }}>
                ご準備いただくもの
              </h2>
            </div>
            <div className="space-y-0">
              {[{ n:'01', label:'TFN（タックスファイルナンバー）', hint:'あなたの納税者番号' }, { n:'02', label:'個人情報', hint:'パスポート・連絡先・住所' }, { n:'03', label:'銀行口座情報', hint:'還付金の振込先（豪・日本どちらも可）' }, { n:'04', label:'業務関連経費の領収書', hint:'控除を申請する場合のみ' }].map((item, i) => (
                <div key={i} className="flex items-center gap-3" style={{ paddingTop:'14px', paddingBottom:'14px', borderTop:'1px solid #EDF4F0' }}>
                  <div className="flex items-center justify-center font-serif font-black flex-shrink-0" style={{ width:'32px', height:'32px', borderRadius:'50%', background:'#EAF6F1', color:'#0B5240', fontSize:'13px', letterSpacing:'-0.02em' }}>
                    {item.n}
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-[13.5px] font-semibold text-ink" style={{ letterSpacing:'-0.005em', lineHeight:1.35 }}>{item.label}</p>
                    <p className="text-[12px] font-light text-muted" style={{ lineHeight:1.4, marginTop:'1px' }}>{item.hint}</p>
                  </div>
                </div>
              ))}
              <div style={{ borderTop:'1px solid #E2EFE9' }} />
            </div>
            <div className="text-center mt-8">
              <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex" style={{ height:'52px', padding:'0 36px', fontSize:'15px', maxWidth:'320px', width:'100%', justifyContent:'center' }}>
                タックスリターンを始める →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="py-10 lg:py-14 bg-white">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 lg:gap-8 items-start">

            <div className="text-center">
              <span className="section-label center">よくあるご質問</span>
              <h2 className="font-serif font-black text-ink"
                style={{ fontSize:'clamp(19px, 2.04vw, 26px)', lineHeight:1.2, letterSpacing:'-0.02em', marginTop:'10px', marginBottom:'12px' }}>
                タックスリターンに関するご質問
              </h2>
              <p className="font-light text-muted"
                style={{ fontSize:'13.5px', lineHeight:1.75, marginBottom:'24px' }}>
                掲載されていないご質問もお気軽にお問い合わせください。
              </p>
            </div>

            <div className="max-w-[700px]">
              <Accordion items={faqs} />
            </div>
          </div>
        </div>
      </section>


      {/* ── NEXT STEP ─────────────────────────────────────────────────────── */}
      <NextStep
        eyebrow="次のステップ"
        heading="スーパー受取（DASP）も忘れずに"
        body="オーストラリアで働いた期間中、雇用主は給与とは別に12%をスーパーに積み立てています。帰国時にDASPを通じて受取を申請できます。"
        cta="スーパー受取を確認する →"
        trustLine="数分で確認完了"
        href="/ja/superannuation"
      />
    </>
  )
}
