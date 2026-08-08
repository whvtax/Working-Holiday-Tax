import type { Metadata } from 'next'
import { GoogleReviews } from '@/components/ui/GoogleReviews'
import { GoogleRating } from '@/components/ui/GoogleRating'
import Link from 'next/link'
import { WA_URL, SITE_URL } from '@/lib/constants'
import { NextStep } from '@/components/ui/NextStep'
import { Accordion } from '@/components/ui/Accordion'
import { MobileCta } from '@/components/ui/MobileCta'

export const metadata: Metadata = {
  title: "ABN登録代行｜417・462ビザ（デリバリー・ライドシェア・ファーム）",
  description: "デリバリー、ライドシェア、ファーム請負にABNが必要ですか。実際の業務に合わせて正しく登録を代行し、発生する税金をわかりやすく説明。ワーホリが陥りがちな落とし穴も日本語で回避できます。",
  keywords: [
    'ABN 登録 オーストラリア',
    'ABN ワーキングホリデー',
    'ABN ワーホリ',
    'Australian Business Number 取得',
    'ABN 申請 オーストラリア',
    'ABN 申請 ワーホリ',
    'ワーホリ 個人事業主 オーストラリア',
    'ABN フリーランス',
    'ABN 417ビザ',
    'ABN 462ビザ',
    'ABN オンライン 登録',
    'ABN 必要 ワーホリ',
    'ABN タックスリターン',
    'ABN TFN 違い',
    'ABN Uber DoorDash',
    'ABN タックスリターン 還付金',
  ],
  alternates: {
    canonical: `${SITE_URL}/ja/abn`,
    languages: {
      'en-AU': `${SITE_URL}/abn`,
      'de': `${SITE_URL}/de/abn`,
      'ja': `${SITE_URL}/ja/abn`,
      'x-default': `${SITE_URL}/abn`,
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Working Holiday Tax Refund Australia' }],
    type: 'website',
    locale: 'ja_JP',
    url: `${SITE_URL}/ja/abn`,
    siteName: 'Working Holiday Tax',
    title: "ABN登録代行｜417・462ビザ（デリバリー・ライドシェア・ファーム）",
    description: '個人事業主として正しくABNを登録。登録税理士の監督のもとでサポートします。',
  },
  twitter: {
    images: [`${SITE_URL}/og-image.png`],
    card: 'summary_large_image',
    title: "ABN登録代行｜417・462ビザ（デリバリー・ライドシェア・ファーム）",
    description: '個人事業主として正しくABNを登録。登録税理士の監督のもとでサポートします。',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

const faqs = [
  {
    question: 'ABN登録は無料です。何に対する費用ですか。',
    answer: '登録自体は無料です。費用は、実際の業務内容に合った正しい登録、税務上いくら準備が必要かの説明、そして雇用主がスーパーや最低賃金の支払いを避けるためにABNを勧めている場合の警告に対するものです。',
  },
  {
    question: '普通のシフト勤務なのに雇用主からABNを求められました。正しいですか。',
    answer: 'たいていは正しくありません。勤務時間を指定され、指示を受け、道具も支給されるなら、それは雇用です。ABNだと源泉徴収もスーパーも労災もありません。登録前に求人の詳細をお送りいただければ、どちらに当たるか率直にお伝えします。',
  },
  { question: 'TFNとABNの両方を持つことはできますか？', answer: 'はい、両方持つことができます。多くのワーキングホリデーメーカーが両方を保有しています。TFNは雇用契約（給与所得）用、ABNは個人事業主としての請負業務用に使い分けます。同じ年度内に両方の収入があっても、1つのタックスリターンで一緒に申告できます。' },
  { question: 'TFNなしでABNを取得できますか？', answer: 'いいえ、ABNを申請する前に、まずTFN（タックスファイルナンバー）を取得する必要があります。TFNがあなたの本人確認の基礎となるからです。当社では、必要に応じてTFNとABNを同時に申請することも可能です。' },
  { question: 'GST（消費税）の登録は必要ですか？', answer: '年間売上（収入）が75,000ドルを超える場合のみGST登録が義務付けられています。ほとんどのワーキングホリデーメーカーはこの基準を超えないため、GST登録は不要です。ただし、Uber・DiDiなどの配車サービスドライバーは収入額に関わらずGST登録が必須です（フードデリバリーは75,000ドル基準が適用）。' },
  { question: 'オーストラリアを離れる時、ABNはどうなりますか？', answer: 'オーストラリアでの業務を終了する際は、ABNを取り消す必要があります。当社にご依頼いただければ、最終的なタックスリターン・スーパー受取（DASP）と合わせてABN取消も代行いたします。' },
  { question: 'ワーホリでABNは必要ですか？', answer: 'ABNが必要なのは、個人事業主や請負業者として働く場合のみです。例えば、Uberやフードデリバリー、フリーランス業務、PAYG雇用ではなくクライアントから直接支払いを受ける場合などです。通常の従業員として働くだけなら、TFNだけで十分です。' },
  { question: 'ABN収入はワーホリのタックスリターン還付金にどう影響しますか？', answer: 'ABN収入はPAYG給与とは扱いが異なります。源泉徴収が行われないため、税金分を自分で取り置く必要があります。タックスリターン提出時にはABN収入を別途申告し、関連する業務経費を控除として申請できます。' }
]

const STEPS = [
  { n: '1', title: 'お仕事内容のヒアリング', body: '業務の種類とビザの詳細をお知らせください。ABNが本当に必要かを含めてご案内します。' },
  { n: '2', title: '書類のご送付',           body: 'TFN番号とパスポート情報のみ。所要時間は数分です。' },
  { n: '3', title: 'ABRへ代理登録',          body: '当社が正しい業種コードでABRに代理申請を行います。' },
  { n: '4', title: 'ABN取得・業務開始',      body: 'ABNは通常即日〜24時間で発行され、すぐに請求書発行や業務を開始できます。' },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  inLanguage: 'ja',
  mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })),
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'ホーム', item: `${SITE_URL}/ja` },
    { '@type': 'ListItem', position: 2, name: 'ABN登録', item: `${SITE_URL}/ja/abn` },
  ],
}


const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${SITE_URL}/ja/abn#service`,
  name: 'ABN登録代行サービス',
  serviceType: 'Australian Business Number登録',
  description: 'オーストラリアのワーキングホリデーメーカー向けABN登録代行。個人事業主として正しい業種コードで登録します。',
  provider: { '@id': `${SITE_URL}/#business` },
  areaServed: { '@type': 'Country', name: 'Australia' },
  audience: { '@type': 'Audience', audienceType: 'Working Holiday Maker (Subclass 417/462), Sole Trader' },
  inLanguage: 'ja',
}

export default function ABNPageJA() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-[68px]" style={{background:'linear-gradient(160deg,#fff 0%,#F7FBF9 100%)'}}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 pt-6 pb-8 lg:pt-14 lg:pb-14">

          <nav aria-label="パンくずリスト" className="flex items-center gap-2 mb-4 lg:mb-6"
            style={{ fontSize: '12px', color: 'rgba(10,15,13,0.35)' }}>
            <Link href="/ja" className="transition-colors hover:text-forest-500">ホーム</Link>
            <span aria-hidden="true" style={{ color: 'rgba(10,15,13,0.18)' }}>/</span>
            <span aria-current="page">ABN登録</span>
          </nav>

          <div className="max-w-[560px] lg:max-w-[700px]">

            <div className="inline-flex items-center gap-2 mb-3 lg:mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-forest-500 animate-pulse-dot" aria-hidden="true" />
              <span className="font-medium uppercase"
                style={{ fontSize: '10px', letterSpacing: '0.16em', color: 'rgba(11,82,64,0.65)' }}>
                ABN登録
              </span>
            </div>

            <h1 className="font-serif font-black text-ink"
              style={{ fontSize: 'clamp(24px,3.2vw,44px)', lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: '10px' }}>
              <span style={{ display: 'block' }}>仕事にABNが必要ですか。</span>
              <span style={{ display: 'block', color: '#0B5240' }}>正しく登録を代行します。</span>
            </h1>

            <p className="font-semibold text-ink"
              style={{ fontSize: 'clamp(14px,1.5vw,17px)', letterSpacing: '-0.01em', marginBottom: '8px', lineHeight: 1.5 }}>
              ABN登録を最初から正しく代行。通常24時間以内に発行されます。
            </p>

            <p className="font-light"
              style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.75, color: 'rgba(10,15,13,0.58)', maxWidth: '48ch', marginBottom: '0' }}>
              Uber・DoorDash・ファーム請負・コンテンツ制作など、個人事業主として働くなら必須の番号です。
            </p>

            <div className="hero-cta-pair flex flex-col gap-3 lg:flex-row lg:gap-4"
              style={{ marginTop: '24px', marginBottom: '20px', maxWidth: '480px' }}>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                className="btn-primary inline-flex justify-center"
                style={{ height: '54px', padding: '0 36px', fontSize: '15px', borderRadius: '100px', flex: '1', width: '100%' }}>
                ABNを登録する →
              </a>
              <a href="#how-to-register"
                className="inline-flex btn-ghost-dark justify-center"
                style={{ height: '52px', padding: '0 24px', fontSize: '15px', flex: '1', width: '100%' }}>
                登録手順を見る →
              </a>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-2 lg:flex lg:flex-row lg:flex-nowrap lg:items-center lg:gap-y-0 lg:gap-x-7">
              {['信頼と実績のサポート', <GoogleRating key="rating" variant="pill" lang="ja" />, '世界中のワーホリに対応', '1時間以内に返信'].map((t, i) => (
                <span key={i} className="inline-flex items-center gap-1.5 whitespace-nowrap"
                  style={{ fontSize: '12px', color: 'rgba(10,15,13,0.45)' }}>
                  <svg width="12" height="12" viewBox="0 0 13 13" fill="none" aria-hidden="true"><circle cx="6.5" cy="6.5" r="6" fill="#EAF6F1" stroke="#C8EAE0" strokeWidth="0.5"/><path d="M4 6.5l2 2 3.5-3.5" stroke="#0B5240" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>{t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT IS AN ABN? ──────────────────────────────────────────────── */}
      <section className="abn-intro-section">
        <div className="abn-intro-container reveal">
          <div className="abn-intro-grid">

            <div className="abn-intro-content">
              <p className="abn-intro-eyebrow">個人事業主・請負業務・フリーランス向け</p>
              <h2 className="abn-intro-heading">
                ABNとは？
              </h2>
              <p className="abn-intro-body">
                <strong>ABN（Australian Business Number）</strong>は、オーストラリア政府のABR（Australian Business Register）が発行する11桁の事業者番号です。給与をもらう従業員ではなく、自分の事業として働く方に必要です。
              </p>
              <p className="abn-intro-body">
                ABNがあれば、<strong>クライアントに直接請求書を発行</strong>でき、個人事業主（Sole Trader）として合法的に活動できます。ワーホリでよくあるABN業務：Uber Eats・フードデリバリー、Uber・DiDi配車サービス、ファーム請負作業（ピッキング・パッキング）、ヘアサロン・ネイル業務委託、コンテンツ制作、清掃業など。
              </p>
              <p className="abn-intro-body">
                ABNはTFNの代わりではなく、それぞれ役割が異なります。多くのワーホリが両方を保有し、TFNは雇用契約、ABNは請負業務と使い分けています。
              </p>
            </div>

            <div className="abn-intro-visual">
              <div className="abn-compare-grid">

                <div className="abn-compare-card abn-compare-employee">
                  <div className="abn-compare-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <circle cx="12" cy="7" r="4" stroke="#587066" strokeWidth="1.6"/>
                      <path d="M4 21v-1a6 6 0 016-6h4a6 6 0 016 6v1" stroke="#587066" strokeWidth="1.6" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <p className="abn-compare-title">従業員（雇用契約）</p>
                  <p className="abn-compare-subtitle">TFNを使用</p>
                  <ul className="abn-compare-list">
                    <li>雇用主が給与計算</li>
                    <li>税金は自動で源泉徴収</li>
                    <li>スーパー（年金）支給あり</li>
                  </ul>
                </div>

                <div className="abn-compare-card abn-compare-contractor">
                  <div className="abn-compare-badge">あなた</div>
                  <div className="abn-compare-icon abn-compare-icon-active">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M3 9l9-6 9 6v11a1 1 0 01-1 1H4a1 1 0 01-1-1V9z" stroke="#0B5240" strokeWidth="1.6" strokeLinejoin="round"/>
                      <path d="M9 21V12h6v9" stroke="#0B5240" strokeWidth="1.6" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <p className="abn-compare-title">個人事業主（請負）</p>
                  <p className="abn-compare-subtitle">ABNを使用</p>
                  <ul className="abn-compare-list">
                    <li>自分で請求書を発行</li>
                    <li>税金は自己管理</li>
                    <li>原則スーパーなし</li>
                  </ul>
                </div>

              </div>
            </div>

          </div>

          <div className="service-cta-strip">
            <div className="service-cta-text">
              <h3 className="service-cta-heading">ABN登録を当社が代行いたします</h3>
              <p className="service-cta-sub">今すぐ受給資格をチェック。業務内容に合わせた正しい業種コードで登録。GSTやBASなどの税務義務もわかりやすくご説明します。</p>
            </div>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="service-cta-button">
              ABNを登録する →
            </a>
          </div>
        </div>
      </section>

      {/* ── HOW WE HELP ──────────────────────────────────────────────────── */}
      <section className="py-10 lg:py-14 bg-white">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 reveal">

          <div className="max-w-xl mx-auto text-center mb-8 lg:mb-10">
            <span className="section-label center">当社のサービス</span>
            <h2 className="font-serif font-black text-ink mx-auto"
              style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.2, letterSpacing: '-0.02em', maxWidth: '26ch', marginTop: '8px', marginBottom: '8px' }}>
                ABNを最初から正しく設定します
            </h2>
            <p className="font-light text-muted"
              style={{ fontSize: '13.5px', lineHeight: 1.75, maxWidth: '34ch', margin: '0 auto', color: 'rgba(10,15,13,0.5)' }}>
              登録だけでなく、請求書の発行方法や税金分の取り分けまで日本語でアドバイス。
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6" style={{ marginBottom:'28px', alignItems:'stretch' }}>
            {[
              { icon:<svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M10 2v8l5 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.4"/></svg>, title:'ABNが本当に必要か判断', body:'不要なのにABNを登録する人は少なくありません。まず業務内容を確認し、正直にお伝えします。' },
              { icon:<svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M3 10h14M10 3l7 7-7 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>, title:'業務に合った内容で登録', body:'ライドシェア、配達、フリーランス、請負など、実際の働き方に合わせてABNを正しく登録します。' },
              { icon:<svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><rect x="2" y="2" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.4"/><path d="M7 10l2.5 2.5 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>, title:'GSTは必要な場合だけ', body:'年間売上75,000ドルのGST基準が当てはまるかをお伝えし、不要な登録を避けます。' },
              { icon:<svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.4"/><path d="M10 6v4.5l3 1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>, title:'初日から請求書発行OK', body:'ABRに準拠したABNをすぐに有効化。受け取り後すぐに請求書発行・業務を開始できます。' },
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

          <div className="text-center mt-6 lg:mt-8">
            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              className="btn-primary inline-flex"
              style={{ height: '52px', padding: '0 36px', fontSize: '15px', maxWidth: '320px', width: '100%' }}>
              ABNを登録する →
            </a>
            <p style={{ marginTop: '10px', fontSize: '12px', color: 'rgba(10,15,13,0.4)' }}>
              オーストラリア政府(ABR)準拠
            </p>
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF ── */}
      <section className="py-10 lg:py-14 bg-white">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 reveal">
          <div className="text-center mb-7 lg:mb-10">
            <span className="section-label center">お客様の声</span>
            <h2 className="font-serif font-black text-ink mx-auto"
              style={{ fontSize:'clamp(19px, 2.04vw, 26px)', lineHeight:1.15, letterSpacing:'-0.025em', marginTop:'10px', maxWidth:'34ch' }}>
              当社でABNを登録したワーホの皆さん
            </h2>
          </div>
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
              ABN登録には、もっと簡単な方法があります
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6 max-w-3xl lg:max-w-4xl mx-auto" style={{ alignItems:'stretch' }}>
            <div className="rounded-2xl" style={{ padding:'22px', background:'#fff', border:'1.5px solid #E2EFE9' }}>
              <p className="font-semibold text-muted" style={{ fontSize:'11px', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:'18px' }}>
                自分でABNを登録すると、高くつくミスにつながりがちです
              </p>
              <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
                {['本来は従業員なのにABNを登録してしまう','誤った業種で登録してしまう','収入記録や税金の取り分けの仕組みがない','タックスリターンでABN収入の申告を忘れる'].map((item,i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink:0, marginTop:'3px' }}><circle cx="8" cy="8" r="7.5" fill="#FEF3F0" stroke="#FBD0BB" strokeWidth="0.5"/><path d="M5.5 10.5l5-5M10.5 10.5l-5-5" stroke="#9A3412" strokeWidth="1.3" strokeLinecap="round"/></svg>
                    <p className="font-light text-muted" style={{ fontSize:'clamp(12px, 1.1vw, 13px)', lineHeight:1.75 }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl flex flex-col" style={{ padding:'22px', background:'#EAF6F1', border:'1.5px solid #C8EAE0' }}>
              <p className="font-semibold text-forest-500" style={{ fontSize:'11px', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:'18px' }}>
                当社のサポート付きABNサービス
              </p>
              <div style={{ display:'flex', flexDirection:'column', gap:'12px', marginBottom:'24px', flex:'1' }}>
                {['ABNが本当に必要かをまず確認','正しい業種コードで登録','記録の取り方と税金の取り分けを明確にご案内','タックスリターンまで一貫してサポート'].map((item,i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink:0, marginTop:'3px' }}><circle cx="8" cy="8" r="7.5" fill="#EAF6F1" stroke="#C8EAE0" strokeWidth="0.5"/><path d="M5 8l2.5 2.5 4-4" stroke="#0B5240" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <p className="font-semibold text-ink" style={{ fontSize:'clamp(12px, 1.1vw, 13px)', lineHeight:1.75 }}>{item}</p>
                  </div>
                ))}
              </div>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex"
                style={{ height:'50px', padding:'0 24px', fontSize:'14px', width:'100%', justifyContent:'center' }}>
                ABNを登録する →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW TO REGISTER ──────────────────────────────────────────────── */}
      <section id="how-to-register" className="py-10 lg:py-14" style={{ background: '#F5F9F7' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 reveal">

          <div className="max-w-xl mx-auto text-center mb-8 lg:mb-10">
            <span className="section-label center">ご利用の流れ</span>
            <h2 className="font-serif font-black text-ink mx-auto"
              style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.2, letterSpacing: '-0.02em', maxWidth: '26ch', marginTop: '8px', marginBottom: '8px' }}>
              4ステップでABNを取得
            </h2>
            <p className="font-light text-muted"
              style={{ fontSize: '13.5px', lineHeight: 1.75 }}>
              ご相談から発行まで、日本語ですべて対応します
            </p>
          </div>

          {/* Desktop */}
          <div className="hidden lg:block" style={{ marginBottom: '48px' }}>
            <div className="relative flex items-start">
              <div className="absolute left-[calc(12.5%)] right-[calc(12.5%)] top-5 h-[2px]"
                style={{ background: 'linear-gradient(90deg, #C8EAE0 0%, #0B5240 20%, #0B5240 80%, #C8EAE0 100%)' }}
                aria-hidden="true" />
              {STEPS.map((s, i) => (
                <div key={i} className="flex-1 flex flex-col items-center px-3" style={{ zIndex: 1 }}>
                  <div className="rounded-full flex items-center justify-center font-bold text-white flex-shrink-0"
                    style={{ width: '40px', height: '40px', background: '#0B5240', fontSize: '15px', marginBottom: '18px', boxShadow: '0 0 0 5px #F5F9F7, 0 0 0 6px #C8EAE0' }}>
                    {s.n}
                  </div>
                  <p className="font-semibold text-ink text-center"
                    style={{ fontSize: '14px', marginBottom: '7px', letterSpacing: '-0.01em', lineHeight: 1.35 }}>{s.title}</p>
                  <p className="font-light text-muted text-center"
                    style={{ fontSize: '12.5px', lineHeight: 1.75 }}>{s.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile */}
          <div className="lg:hidden flex flex-col" style={{ marginBottom: '28px', gap: '0' }}>
            {STEPS.map((s, i) => (
              <div key={i} className="flex gap-3.5" style={{ paddingBottom: i < STEPS.length - 1 ? '18px' : '0' }}>
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="rounded-full flex items-center justify-center font-bold text-white"
                    style={{ width: '28px', height: '28px', background: '#0B5240', fontSize: '12px', flexShrink: 0 }}>
                    {s.n}
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className="flex-1 mt-1.5"
                      style={{ width: '1px', minHeight: '18px', background: 'linear-gradient(180deg, #0B5240 0%, #C8EAE0 100%)' }}
                      aria-hidden="true" />
                  )}
                </div>
                <div style={{ paddingTop: '3px' }}>
                  <p className="font-semibold text-ink" style={{ fontSize: '14px', marginBottom: '3px', letterSpacing: '-0.01em', lineHeight: 1.35 }}>{s.title}</p>
                  <p className="font-light text-muted" style={{ fontSize: '12.5px', lineHeight: 1.75 }}>{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT TO HAVE READY ── */}

      {/* ── RELATED GUIDES (internal links to supporting blog content) ─────── */}
      <section className="py-10 lg:py-14">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="text-center mb-6">
            <span className="section-label center">関連記事</span>
            <h2 className="font-serif font-black text-ink"
              style={{ fontSize:'clamp(19px, 2.04vw, 26px)', lineHeight:1.1, letterSpacing:'-0.025em', marginTop:'10px' }}>
              ABNに関するガイド
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-[900px] mx-auto">
            {[
              { href: '/ja/blog/what-is-an-abn', label: 'ABNとは？ワーホリでABNが必要なケースを徹底解説' },
              { href: '/ja/blog/how-to-register-for-an-abn', label: 'ABN登録方法：オーストラリアで個人事業主になるステップ' },
              { href: '/ja/blog/employee-vs-contractor-australia', label: '従業員と請負業者（コントラクター）の違いとは？' },
              { href: '/ja/blog/gst-and-abn-for-working-holiday-makers', label: 'GST（消費税）登録は必要？ABN保持者の判断基準' },
              { href: '/ja/blog/sole-trader-vs-company-australia-working-holiday', label: '個人事業主（Sole Trader）と法人（Company）の違い' },
              { href: '/ja/blog/uber-doordash-rideshare-abn-working-holiday', label: 'Uber・DoorDash・配車サービスで働く：ABNと税金のルール' },
            ].map((g) => (
              <Link
                key={g.href}
                href={g.href}
                className="block rounded-xl border border-ink/10 p-4 text-[13.5px] font-light text-ink leading-[1.5] transition-colors hover:border-forest-500 hover:text-forest-500"
              >
                {g.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="py-10 lg:py-14" style={{ background: '#F5F9F7' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 reveal">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 lg:gap-8 lg:items-center">

            <div className="text-center">
              <span className="section-label center">よくあるご質問</span>
              <h2 className="font-serif font-black text-ink"
                style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.2, letterSpacing: '-0.02em', marginTop: '10px', marginBottom: '12px' }}>
                ABNに関するご質問
              </h2>
              <p className="font-light text-muted"
                style={{ fontSize: '13.5px', lineHeight: 1.75, marginBottom: '24px' }}>
                掲載されていないご質問もお気軽にお問い合わせください。
              </p>
            </div>

            <div className="max-w-[700px]">
              <Accordion items={faqs} />
            </div>
          </div>
        </div>
      </section>

      {/* ── NEXT STEP ────────────────────────────────────────────────────── */}
      <NextStep
        eyebrow="次のステップ"
        heading="次はタックスリターンです"
        body="会計年度末には、タックスリターンを提出してABN収入を申告する必要があります。"
        cta="タックスリターンを依頼する →"
        href="/ja/tax-return"
      />
      <MobileCta href={WA_URL} lang="ja" />
    </>
  )
}
