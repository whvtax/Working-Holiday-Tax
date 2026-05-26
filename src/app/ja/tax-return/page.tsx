import type { Metadata } from 'next'
import Link from 'next/link'
import { WA_URL, SITE_URL } from '@/lib/constants'
import { NextStep } from '@/components/ui/NextStep'
import { Accordion } from '@/components/ui/Accordion'

export const metadata: Metadata = {
  title: 'タックスリターン - ワーキングホリデー オーストラリア',
  description: 'オーストラリアのタックスリターンで還付金を受け取り。準備から提出までオンラインですべてお任せ。最大の還付金を取り戻します。',
  keywords: [
    'オーストラリア タックスリターン ワーキングホリデー',
    'ワーホリ タックスリターン',
    'バックパッカー 税金 還付',
    '417ビザ タックスリターン',
    '462ビザ タックスリターン',
    'タックスリターン オーストラリア 日本語',
    'ワーホリ 還付金 最大化',
    'オーストラリア 滞在後 税金 還付',
    'タックスリターン オーストラリア',
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
    title: 'タックスリターン - ワーキングホリデー オーストラリア',
    description: 'オーストラリアのタックスリターンで還付金を受け取り。最大の還付金を取り戻します。',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'タックスリターン - ワーキングホリデー オーストラリア',
    description: 'オーストラリアのタックスリターン。すべてお任せください。',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

const faqs = [
  {
    question: '短期間しか働いていない場合でもタックスリターンは必要ですか？',
    answer: 'はい。オーストラリアで収入があった場合、たとえ短期間の労働でもタックスリターンが必要になる可能性があります。',
  },
  {
    question: 'タックスリターンをしない場合どうなりますか？',
    answer: '申告義務があるのに提出しない場合、ATO（オーストラリア税務署）から罰金やその他の措置を受ける可能性があります。',
  },
  {
    question: 'オーストラリアを離れた後でもタックスリターンできますか？',
    answer: 'はい。オーストラリアを離れた後、海外からでもタックスリターンを提出できます。',
  },
  {
    question: '還付金がもらえるか、どうやって分かりますか？',
    answer: '年間を通じて必要以上に税金を支払った場合、還付金を受け取れます。間違った税率が適用されていた場合や、控除可能な経費がある場合によく起こります。登録税理士に依頼することで、申告が正しく行われ、受け取るべき還付を逃さないようにできます。',
  },
  {
    question: 'タックスリターンが完了したことはどうやって分かりますか？',
    answer: '申告が処理されると、ATOからNotice of Assessment（賦課決定通知書）が送られます。これが最終結果を示す公式な確認書類となります。',
  },
]

const DEDUCTIONS = [
  { title: '作業着・ユニフォーム',           body: '安全靴、蛍光ベスト、規定のユニフォームなど、保護具や指定の作業着。' },
  { title: '工具・機材',                    body: '仕事のために購入し、使用した工具や機材。' },
  { title: 'ライセンス・資格',              body: 'RSA、White Cardなどの仕事関連のライセンス。' },
  { title: '洗濯・クリーニング',            body: '作業着の洗濯やクリーニング費用。' },
  { title: '業務関連の移動',                body: '勤務地間の移動（通勤は除く）。' },
  { title: '寄付金',                       body: 'オーストラリア登録のチャリティ団体への寄付。' },
]

const STEPS = [
  { n: '1', title: '状況を教えてください', body: '収入と業務内容のデータを送信してください。正しくご案内します。' },
  { n: '2', title: '書類を送信',          body: '給与明細と基本情報のみ。素早く簡単です。' },
  { n: '3', title: 'すべて代行します',     body: 'タックスリターンを準備し、正しく提出します。' },
  { n: '4', title: '還付金を受け取り',     body: '還付金は7〜14営業日以内に、ご指定の銀行口座に直接振り込まれます。' },
]

const TESTIMONIALS = [
  {
    name: 'Anna Larsen',
    from: 'ノルウェー · WHV 417',
    quote: 'タックスリターンを最初から最後まで代行してくれました。何が控除できるか全く分からなかったのですが、予想以上に多く戻ってきました。',
    amount: '$2,450',
    initials: 'A',
    bgColor: '#FDF0D5',
    textColor: '#7A4A00',
  },
  {
    name: '山田 太郎',
    from: '日本 · WHV 417',
    quote: 'とても分かりやすく説明してくれて、最大限の還付金を受け取れるようにしてくれました。日本人の方にもおすすめです。',
    amount: '$4,100',
    initials: 'T',
    bgColor: '#EAF6F1',
    textColor: '#0B5240',
  },
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

export default function JapaneseTaxReturnPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-[68px] bg-white">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 pt-6 pb-8 lg:pt-16 lg:pb-16">

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
              <span style={{ display:'block' }}>タックスリターンで</span>
              <span style={{ display:'block', color:'#0B5240' }}>還付金を最大化。</span>
            </h1>

            <p className="font-semibold text-ink"
              style={{ fontSize:'clamp(14px,1.5vw,17px)', letterSpacing:'-0.01em', marginBottom:'8px', lineHeight:1.5 }}>
              ATOへの手続きをすべて代行します。
            </p>

            <p className="font-light"
              style={{
                fontSize:'clamp(13px,1.2vw,15px)',
                lineHeight:1.75,
                color:'rgba(10,15,13,0.58)',
                maxWidth:'44ch',
                marginBottom:'0',
              }}>
              ほとんどのタックスリターンは24時間以内に提出します。
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
                手順を見る →
              </a>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-2 lg:flex lg:flex-row lg:flex-nowrap lg:items-center lg:gap-y-0 lg:gap-x-7">
              {['1,200名以上をサポート','4.9★（300件以上のレビュー）','45カ国以上に対応','返信時間 1時間以内'].map((t,i) => (
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

            {/* Left: Visual - money refund */}
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
              <p className="taxret-intro-eyebrow">多くのWHM保持者は還付金を受け取れます</p>
              <h2 className="taxret-intro-heading">
                タックスリターンとは？
              </h2>
              <p className="taxret-intro-body">
                <strong>タックスリターン</strong>（日本でいう確定申告）は、あなたとATO（オーストラリア税務署）の間で行う年次の精算です。年間の収入と控除可能な経費を申告し、給与から源泉徴収済みの税金（ペイメント・サマリー/PAYG）と照合します。
              </p>
              <p className="taxret-intro-body">
                ほとんどのワーキングホリデーメーカーは<strong>年間で税金を払い過ぎています</strong>。その場合、ATOから差額が還付されます。数千ドルになることも珍しくありません。
              </p>
              <p className="taxret-intro-body">
                オーストラリアの会計年度は<strong>7月1日〜6月30日</strong>。タックスリターンは毎年7月1日〜10月31日に提出します。オーストラリアを離れた後でも、世界のどこからでも申請可能です。還付金はオーストラリアの口座にも海外の口座にも振り込み可能です。
              </p>
            </div>

          </div>

          {/* CTA strip to OUR service */}
          <div className="service-cta-strip">
            <div className="service-cta-text">
              <h3 className="service-cta-heading">タックスリターンを準備し、代行で提出します</h3>
              <p className="service-cta-sub">初回相談は無料。書類もATOポータルもストレスも不要です。還付金を最大化し、すべてオンラインで完結します。オーストラリアを離れた後でも対応可能です。</p>
            </div>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="service-cta-button">
              還付金を受け取る →
            </a>
          </div>
        </div>
      </section>

      {/* ── SOLUTION ──────────────────────────────────────────────────────── */}
      <section className="py-10 lg:py-16" style={{ background: '#EEF7F2' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-xl mx-auto text-center reveal" style={{ marginBottom: '32px' }}>
            <span className="section-label center">私たちのサービス</span>
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.2, letterSpacing: '-0.02em', maxWidth: '28ch', marginTop: '8px', marginBottom: '8px', textWrap: 'balance' }}>
              タックスリターンを最初から最後まで代行し、最大の還付金を取り戻します
            </h2>
            <p className="font-light text-muted mx-auto" style={{ fontSize: '13.5px', lineHeight: 1.75, maxWidth: '34ch' }}>
              ストレスも混乱もなく、正しく提出されたタックスリターンと、最大の還付金をお届けします。
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 reveal delay-1">
            {[
              {
                icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M4 10l4.5 4.5 7.5-9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.4"/></svg>,
                title: '税務状況をしっかり確認',
                body: '収入、控除、税務上のステータスをすべて確認し、正しく反映します。',
              },
              {
                icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><rect x="2" y="2" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.4"/><line x1="6" y1="8" x2="14" y2="8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/><line x1="6" y1="11.5" x2="11" y2="11.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>,
                title: 'タックスリターンを正しく提出',
                body: 'すべて準備し、ATOに直接代行で提出します。',
              },
              {
                icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.4"/></svg>,
                title: '最大の還付金を取り戻す',
                body: 'すべての控除可能な経費を見つけ、受け取るべき還付金を最大化します。',
              },
              {
                icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M10 2C5.58 2 2 5.58 2 10s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8z" stroke="currentColor" strokeWidth="1.4"/><path d="M10 6v4.5l3 2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>,
                title: 'ストレスも混乱もなし',
                body: 'データを送るだけ。あとは私たちが対応します。ATOポータルも書類も不要です。',
              },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl flex gap-3" style={{ padding: '22px', boxShadow: '0 1px 3px rgba(0,0,0,.04), 0 2px 12px rgba(11,82,64,.06)' }}>
                <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 text-forest-500" style={{ background: '#EAF6F1' }}>
                  {item.icon}
                </div>
                <div>
                  <p className="text-[13.5px] font-semibold text-ink" style={{ letterSpacing: '-0.01em', marginBottom: '6px' }}>{item.title}</p>
                  <p className="text-[13px] font-light text-muted leading-[1.75]">{item.body}</p>
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
            <p style={{ marginTop: '10px', fontSize: '12px', color: '#8AADA3' }}>2分で完了&nbsp;&bull;&nbsp;事前のお支払い不要</p>
          </div>
        </div>
      </section>

      {/* ── EARLY SOCIAL PROOF ────────────────────────────────────────────── */}
      <section className="py-8 lg:py-10 bg-white">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-xl mx-auto text-center mb-8 reveal">
            <span className="section-label center">実績</span>
            <h2 className="font-serif font-black text-ink mt-2" style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
              ワーホリの皆さんが受け取った還付金
            </h2>
          </div>
          <p className="text-center font-medium text-muted" style={{ fontSize: '12px', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '16px', color: 'rgba(10,15,13,0.4)' }}>実際のワーホリの方々の還付金</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6 max-w-3xl lg:max-w-4xl mx-auto reveal delay-1">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 flex flex-col" style={{ boxShadow: '0 1px 3px rgba(0,0,0,.04), 0 4px 20px rgba(11,82,64,.07)', border: '1px solid #E2EFE9' }}>
                <div className="flex gap-0.5" style={{ marginBottom: '10px' }}>
                  {Array.from({ length: 5 }).map((_, si) => <IconStar key={si} />)}
                </div>
                <p className="text-[13px] font-light text-body leading-[1.85] flex-1" style={{ marginBottom: '14px' }}>&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid #E2EFE9' }}>
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-[12px] font-bold flex-shrink-0" style={{ background: t.bgColor, color: t.textColor }}>{t.initials}</div>
                    <div>
                      <p className="text-[12.5px] font-semibold text-ink">{t.name}</p>
                      <p className="text-[11.5px] text-subtle mt-0.5">{t.from}</p>
                    </div>
                  </div>
                  <span className="font-serif font-black text-forest-500" style={{ fontSize: '17px', letterSpacing: '-0.03em' }}>{t.amount}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPARISON ────────────────────────────────────────────────────── */}
      <section className="py-10 lg:py-16" style={{ background: '#F4F9F6' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-xl mx-auto text-center mb-10 reveal">
            <span className="section-label center">選ばれる理由</span>
            <h2 className="font-serif font-black text-ink mt-2" style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
              タックスリターンでお金を取り逃さないために
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6 max-w-3xl lg:max-w-4xl mx-auto reveal delay-1">
            <div className="rounded-2xl" style={{ padding: '18px 20px', background: '#fff', border: '1px solid #E2EFE9' }}>
              <p className="text-[12px] font-semibold tracking-[0.08em] uppercase text-muted mb-4">自分でATOに提出</p>
              <div className="space-y-3">
                {[
                  'わかりにくいATO書類とシステム',
                  '控除可能な経費を見逃しやすい',
                  '正確に提出するのに時間と労力がかかる',
                  '問題発生時のサポートなし',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="flex-shrink-0 mt-0.5">
                      <circle cx="8" cy="8" r="7.5" fill="#FEF3F0" stroke="#FBD0BB" strokeWidth="0.5"/>
                      <path d="M5.5 10.5l5-5M10.5 10.5l-5-5" stroke="#9A3412" strokeWidth="1.3" strokeLinecap="round"/>
                    </svg>
                    <p className="text-[13px] font-light text-muted leading-[1.75]">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl" style={{ padding: '18px 20px', background: '#EAF6F1', border: '1px solid #C8EAE0' }}>
              <p className="text-[12px] font-semibold tracking-[0.08em] uppercase text-forest-500 mb-4">私たちのサービス</p>
              <div className="space-y-3">
                {[
                  '最初から正しく完了',
                  'すべての控除可能な経費を発見',
                  'ストレスも混乱もなし',
                  '各ステップで実際のサポートあり',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="flex-shrink-0 mt-0.5">
                      <circle cx="8" cy="8" r="7.5" fill="#EAF6F1" stroke="#C8EAE0" strokeWidth="0.5"/>
                      <path d="M5 8l2.5 2.5 4-4" stroke="#0B5240" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <p className="text-[13px] font-semibold text-ink leading-[1.75]">{item}</p>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '20px' }}>
                <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                  className="btn-primary inline-flex"
                  style={{ height: '46px', padding: '0 20px', fontSize: '13.5px', maxWidth: '240px', width: '100%' }}>
                  タックスリターンを依頼する →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TAX RATES ────────────────────────────────────────────────────── */}
      <section className="py-10 lg:py-14 bg-white">
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
      <section className="py-10 lg:py-16" style={{ background: '#EEF7F2' }}>
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
      <section id="how-it-works" className="py-10 lg:py-14 bg-white">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-xl mx-auto text-center reveal" style={{ marginBottom: '48px' }}>
            <span className="section-label center">ご利用の流れ</span>
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.2, letterSpacing: '-0.02em', maxWidth: '22ch', marginTop: '8px', marginBottom: '8px', textWrap: 'balance' }}>
              4ステップで完了
            </h2>
            <p className="font-light text-muted" style={{ fontSize: '14px' }}>
              シンプル、ガイド付き、最初から最後まで
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

          <div className="text-center mt-10 reveal delay-2">
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ height: '52px', padding: '0 32px', fontSize: '15px' }}>
              タックスリターンを依頼する →
            </a>
            <p style={{ marginTop: '10px', fontSize: '12px', color: '#8AADA3' }}>2分で完了&nbsp;&bull;&nbsp;事前のお支払い不要</p>
          </div>
        </div>
      </section>

      {/* ── TIMING + DOCUMENTS ───────────────────────────────────────────── */}
      <section className="py-10 lg:py-16" style={{ background: '#F4F9F6' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

            <div className="reveal text-center lg:text-left">
              <span className="section-label center lg:text-left">スケジュール</span>
              <h2 className="font-serif font-black text-ink mt-2 mb-6" style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
                還付金を受け取るタイミング
              </h2>
              <div className="space-y-0">
                {[
                  { label: '私たちの準備',     body: 'タックスリターンは24時間以内に準備します。' },
                  { label: 'ATOの処理',       body: 'ATOは通常7〜14営業日以内にタックスリターンを処理します。繁忙期はそれより長くなる場合があります。' },
                  { label: '最終結果',         body: '処理が完了すると、還付金は直接あなたのオーストラリアの銀行口座に振り込まれます。' },
                ].map((item, i) => (
                  <div key={i} style={{ paddingTop: '14px', paddingBottom: '14px', borderTop: '1px solid #EDF4F0' }}>
                    <p className="text-[13px] font-semibold text-ink" style={{ letterSpacing: '-0.01em', marginBottom: '4px' }}>{item.label}</p>
                    <p className="text-[13px] font-light text-muted leading-[1.85]">{item.body}</p>
                  </div>
                ))}
                <div style={{ borderTop: '1px solid #E2EFE9' }} />
              </div>
            </div>

            <div className="reveal delay-1 text-center lg:text-left">
              <span className="section-label center lg:text-left">必要なもの</span>
              <h2 className="font-serif font-black text-ink mt-2 mb-6" style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
                始めるために必要なもの
              </h2>
              <div className="space-y-0">
                {[
                  { n: '01', label: 'TFN（タックスファイルナンバー）',  hint: 'あなたの個人税番号' },
                  { n: '02', label: '個人情報',                       hint: '住所と携帯電話番号' },
                  { n: '03', label: 'オーストラリアの銀行口座',         hint: '還付金の振込先' },
                  { n: '04', label: '業務経費の領収書',                hint: '控除可能な経費用' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3" style={{ paddingTop: '14px', paddingBottom: '14px', borderTop: '1px solid #EDF4F0' }}>
                    <div className="flex items-center justify-center font-serif font-black flex-shrink-0" style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#EAF6F1', color: '#0B5240', fontSize: '13px', letterSpacing: '-0.02em' }}>
                      {item.n}
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-[13.5px] font-semibold text-ink" style={{ letterSpacing: '-0.005em', lineHeight: 1.4 }}>{item.label}</p>
                      <p className="text-[12px] font-light text-muted" style={{ lineHeight: 1.45, marginTop: '1px' }}>{item.hint}</p>
                    </div>
                  </div>
                ))}
                <div style={{ borderTop: '1px solid #E2EFE9' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="py-10 lg:py-16 bg-white">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 lg:gap-10 items-start">

            <div className="text-center">
              <span className="section-label center">よくある質問</span>
              <h2 className="font-serif font-black text-ink"
                style={{ fontSize:'clamp(19px, 2.04vw, 26px)', lineHeight:1.2, letterSpacing:'-0.02em', marginTop:'10px', marginBottom:'12px' }}>
                タックスリターンに関するご質問
              </h2>
              <p className="font-light text-muted"
                style={{ fontSize:'13.5px', lineHeight:1.75, marginBottom:'24px' }}>
                その他のご質問はお気軽にお問い合わせください。
              </p>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                className="btn-primary inline-flex items-center justify-center"
                style={{ height:'48px', padding:'0 28px', fontSize:'14px', width:'100%', maxWidth:'220px' }}>
                今すぐ相談する →
              </a>
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
        heading="スーパー（年金）を残さないで"
        body="オーストラリアで働いている間、雇用主は給与とは別にスーパーに積み立てています。帰国時にそれを受け取ることができます。"
        cta="スーパー受取資格を確認する →"
        trustLine="数分で確認完了"
        href="/ja/superannuation"
      />
    </>
  )
}
