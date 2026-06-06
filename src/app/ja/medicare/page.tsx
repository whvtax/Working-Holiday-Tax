import type { Metadata } from 'next'
import { GoogleRating } from '@/components/ui/GoogleRating'
import Link from 'next/link'
import { WA_URL, SITE_URL } from '@/lib/constants'
import { NextStep } from '@/components/ui/NextStep'

export const metadata: Metadata = {
  title: 'メディケア（Medicare）- ワーキングホリデー オーストラリア',
  description: 'ワーキングホリデー保持者のメディケア対象資格について理解。メディケア税の仕組みと免除証明書の取得をサポートします。',
  keywords: [
    'メディケア ワーキングホリデー オーストラリア',
    'メディケア レビー 免除',
    'メディケア レビー 免除 バックパッカー',
    'メディケア レビー 免除 ワーホリ',
    'メディケア 税 免除',
    'メディケア 税 還付',
    'メディケア 417ビザ',
    'メディケア 462ビザ',
    'RHCA オーストラリア 日本語',
    'オーストラリア 社会保険協定',
    '日豪 社会保険協定',
    'メディケア レビー 免除証明書',
    'メディケア 日本人 オーストラリア',
    'メディケア 税 2パーセント',
    'メディケア 税 タックスリターン',
    'メディケア 免除 還付金',
    'ワーホリ メディケア 税',
  ],
  alternates: {
    canonical: `${SITE_URL}/ja/medicare`,
    languages: {
      'en-AU': `${SITE_URL}/medicare`,
      'de': `${SITE_URL}/de/medicare`,
      'ja': `${SITE_URL}/ja/medicare`,
      'x-default': `${SITE_URL}/medicare`,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: `${SITE_URL}/ja/medicare`,
    siteName: 'Working Holiday Tax',
    title: 'メディケア（Medicare）- ワーキングホリデー オーストラリア',
    description: 'ワーキングホリデー保持者のメディケア対象資格について。',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'メディケア（Medicare）- ワーキングホリデー オーストラリア',
    description: 'メディケアとメディケア税について。',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

const faqs = [
  {
    question: 'メディケアに登録する必要がありますか？',
    answer: 'オーストラリアと社会保険協定（RHCA）を結んでいる国の出身者のみ必要です。対象外の場合は登録する必要はなく、代わりにタックスリターン時にメディケア税免除を申請するべきです。',
  },
  {
    question: 'メディケア税免除とは何ですか？',
    answer: 'メディケア対象外（ほとんどのワーキングホリデービザ保持者）の場合、タックスリターンでメディケア税の免除を受けることができます。タックスリターンサービスの一部としてすべて対応します。',
  },
  {
    question: '日本出身です。メディケアの対象になりますか？',
    answer: '日本はオーストラリアと社会保険協定（RHCA）を結んでいません。そのため、日本人のワーキングホリデーメーカーは通常、メディケアの対象になりません。代わりに、タックスリターンでメディケア税免除を申請する必要があります。私たちが代行します。',
  },
  {
    question: 'メディケア対象外でもレビーは支払う必要がありますか？',
    answer: '免除を申請すれば支払う必要はありません。メディケア対象外の場合、タックスリターンでメディケア税免除を申請することで、控除されなくなります。',
  },
  {
    question: 'プライベート医療保険は必要ですか？',
    answer: 'プライベート医療保険は、メディケアがカバーしない医療費をカバーします。メディケア対象外の方は、状況に応じてプライベート医療保険を検討すべきです。これはメディケア税とは別の話です。',
  },
  {
    question: 'ワーキングホリデービザはメディケア対象資格に影響しますか？',
    answer: 'はい。ほとんどのワーキングホリデービザ保持者は、社会保険協定締結国出身者を除き、メディケア対象外です。対象外の場合、タックスリターンの一部としてメディケア税免除を申請します。',
  },
  {
    question: 'メディケア税免除はタックスリターン還付金にどう影響しますか？',
    answer: 'メディケア税は課税所得の2%です。メディケア対象外なのに年間でメディケア税が課税されていた場合、免除申請によりタックスリターンから取り除かれます。結果として還付金が増える可能性があります。当社では対象資格を確認し、タックスリターン準備の一環として免除申請を行います。',
  },
  {
    question: 'オーストラリアとメディケア協定がある国はどこですか？',
    answer: 'オーストラリアは11カ国と社会保険協定（RHCA）を結んでいます。具体的には、イギリス、アイルランド、イタリア、スウェーデン、オランダ、ベルギー、フィンランド、ノルウェー、マルタ、スロベニア、ニュージーランドです。日本とドイツのワーホリ参加者はRHCAの対象外ですので、タックスリターンでメディケア税免除を申請するべきです。',
  },
]

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
    { '@type': 'ListItem', position: 2, name: 'メディケア', item: `${SITE_URL}/ja/medicare` },
  ],
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${SITE_URL}/ja/medicare#service`,
  name: 'メディケア税免除申請代行サービス',
  serviceType: 'Medicare Levy Exemption申請',
  description: 'オーストラリアのワーキングホリデーメーカー向けメディケア税（2%レビー）免除証明書の取得とタックスリターンでの適用。日本人はNDA国出身ですが、社会保険協定（RHCA）非締結のため通常メディケア対象外です。',
  provider: { '@id': `${SITE_URL}/#business` },
  areaServed: { '@type': 'Country', name: 'Australia' },
  audience: { '@type': 'Audience', audienceType: 'Working Holiday Maker (Subclass 417/462) - Medicare対象外' },
  inLanguage: 'ja',
}

export default function JapaneseMedicarePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-[68px] bg-white">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 pt-6 pb-8 lg:pt-16 lg:pb-16">

          <nav aria-label="パンくずリスト" className="flex items-center gap-2 mb-4 lg:mb-6"
            style={{ fontSize:'12px', color:'rgba(10,15,13,0.35)' }}>
            <Link href="/ja" className="transition-colors hover:text-forest-500">ホーム</Link>
            <span aria-hidden="true" style={{ color:'rgba(10,15,13,0.18)' }}>/</span>
            <span aria-current="page">メディケア</span>
          </nav>

          <div className="max-w-[560px] lg:max-w-[700px]">

            <div className="inline-flex items-center gap-2 mb-3 lg:mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-forest-500 animate-pulse-dot" aria-hidden="true" />
              <span className="font-medium uppercase"
                style={{ fontSize:'10px', letterSpacing:'0.16em', color:'rgba(11,82,64,0.65)' }}>
                メディケア
              </span>
            </div>

            <h1 className="font-serif font-black text-ink"
              style={{
                fontSize:'clamp(22px,2.9vw,40px)',
                lineHeight:1.2,
                letterSpacing:'-0.02em',
                marginBottom:'10px',
              }}>
              <span style={{ display:'block' }}>メディケアの対象資格を確認</span>
              <span style={{ display:'block', color:'#0B5240' }}>タックスリターンの前に。</span>
            </h1>

            <p className="font-semibold text-ink"
              style={{ fontSize:'clamp(14px,1.5vw,17px)', letterSpacing:'-0.01em', marginBottom:'8px', lineHeight:1.5 }}>
              対象資格を確認し、タックスリターンで正しく処理します。
            </p>

            <p className="font-light"
              style={{
                fontSize:'clamp(13px,1.2vw,15px)',
                lineHeight:1.75,
                color:'rgba(10,15,13,0.58)',
                maxWidth:'44ch',
                marginBottom:'0',
              }}>
              あなたの状況に何が当てはまるか調べます。
            </p>

            <div className="hero-cta-pair flex flex-col gap-3 lg:flex-row lg:gap-4"
              style={{ marginTop:'24px', marginBottom:'20px', maxWidth:'480px' }}>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                className="btn-primary inline-flex justify-center"
                style={{ height:'54px', padding:'0 36px', fontSize:'15px', borderRadius:'100px', flex:'1', width:'100%' }}>
                対象資格を確認する →
              </a>
              <a href="#how-it-works"
                className="inline-flex btn-ghost-dark justify-center"
                style={{ height:'52px', padding:'0 24px', fontSize:'15px', flex:'1', width:'100%' }}>
                手順を見る →
              </a>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-2 lg:flex lg:flex-row lg:flex-nowrap lg:items-center lg:gap-y-0 lg:gap-x-7">
              {['1,200名以上をサポート',<GoogleRating variant="pill" lang="ja" />,'45カ国以上に対応','返信時間 1時間以内'].map((t,i) => (
                <span key={i} className="inline-flex items-center gap-1.5 whitespace-nowrap"
                  style={{ fontSize:'12px', color:'rgba(10,15,13,0.45)' }}>
                  <svg width="12" height="12" viewBox="0 0 13 13" fill="none" aria-hidden="true"><circle cx="6.5" cy="6.5" r="6" fill="#EAF6F1" stroke="#C8EAE0" strokeWidth="0.5"/><path d="M4 6.5l2 2 3.5-3.5" stroke="#0B5240" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>{t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* ── WHAT IS MEDICARE? - Unique design: 2% Levy / Exemption motif ─ */}
      <section className="medicare-intro-section">
        <div className="medicare-intro-container">
          <div className="medicare-intro-grid">

            {/* Left: Explainer */}
            <div className="medicare-intro-content">
              <p className="medicare-intro-eyebrow">医療制度と2%レビー</p>
              <h2 className="medicare-intro-heading">
                メディケアとは？
              </h2>
              <p className="medicare-intro-body">
                <strong>メディケア（Medicare）</strong>はオーストラリアの公的医療制度です。割引医療サービスを提供しており、課税所得から自動的に控除される<strong>2%のメディケア税</strong>により部分的に資金提供されています。
              </p>
              <p className="medicare-intro-body">
                ほとんどのワーキングホリデービザ保持者は<strong>メディケアの対象外</strong>です。対象外の場合、レビーを支払う必要はなく、取り戻すことができます。
              </p>
              <p className="medicare-intro-body">
                <strong>メディケア税免除証明書</strong>を取得することで、レビーを免除できます。これはタックスリターン時に適用され、数百〜数千ドル節約できる可能性があります。
              </p>
            </div>

            {/* Right: Visual - Eligibility check card */}
            <div className="medicare-intro-visual">
              <div className="medicare-check-card">
                <div className="medicare-check-header">
                  <p className="medicare-check-title">2%レビーを支払っていますか？</p>
                  <p className="medicare-check-subtitle">ほとんどのワーホリは支払うべきではありません</p>
                </div>

                <div className="medicare-check-items">
                  <div className="medicare-check-item">
                    <div className="medicare-check-icon medicare-check-x">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                        <path d="M3.5 3.5l7 7M10.5 3.5l-7 7" stroke="#9A3412" strokeWidth="1.8" strokeLinecap="round"/>
                      </svg>
                    </div>
                    <div>
                      <p className="medicare-check-label">メディケア対象外</p>
                      <p className="medicare-check-desc">ほとんどの417 / 462ビザ保持者</p>
                    </div>
                  </div>

                  <div className="medicare-check-arrow">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M12 5v14M5 12l7 7 7-7" stroke="#2FA880" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>

                  <div className="medicare-check-item medicare-check-result">
                    <div className="medicare-check-icon medicare-check-v">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                        <path d="M3 7l3 3 5-6" stroke="#0B5240" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div>
                      <p className="medicare-check-label">免除を申請</p>
                      <p className="medicare-check-desc">年間支払った2%を取り戻せます</p>
                    </div>
                  </div>
                </div>

                <div className="medicare-check-savings">
                  <p className="medicare-check-savings-label">受け取れる可能性のある金額</p>
                  <p className="medicare-check-savings-amount">$500〜$2,000+</p>
                  <p className="medicare-check-savings-detail">収入に応じて変動</p>
                </div>
              </div>
            </div>

          </div>

          {/* CTA strip to OUR service */}
          <div className="service-cta-strip">
            <div className="service-cta-text">
              <h3 className="service-cta-heading">メディケア税免除を代行します</h3>
              <p className="service-cta-sub">初回相談は無料。対象資格を確認し、免除証明書を準備して、タックスリターンと一緒に正しく提出します。本来支払う必要のなかったレビーを取り戻しましょう。</p>
            </div>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="service-cta-button">
              免除対象を確認する →
            </a>
          </div>
        </div>
      </section>

      {/* ── SIMPLE DECISION ───────────────────────────────────────────────── */}
      <section className="py-10 lg:py-16" style={{ background: '#EEF7F2' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-xl mx-auto text-center reveal" style={{ marginBottom: '32px' }}>
            <span className="section-label center">2つのケース</span>
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.2, letterSpacing: '-0.02em', marginTop: '8px', marginBottom: '8px' }}>
              ビザと出身国によって、メディケア税を支払うか免除されるかが決まります。
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5 mb-8 lg:mb-10 reveal delay-1">
            <div className="bg-white rounded-2xl flex flex-col" style={{ padding: '20px', border: '1px solid #C8EAE0', boxShadow: '0 1px 4px rgba(0,0,0,.03)' }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ marginBottom: '12px', background: '#EAF6F1' }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <circle cx="10" cy="10" r="8" stroke="#0B5240" strokeWidth="1.4"/>
                  <path d="M7 10l2.5 2.5 4-4" stroke="#0B5240" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="text-[14px] font-bold text-ink" style={{ marginBottom: '6px' }}>RHCA締結国（社会保険協定）の出身者</p>
              <p className="text-[12.5px] font-light text-muted leading-[1.75]" style={{ maxWidth: '30ch', marginBottom: '10px' }}>
                メディケア対象の場合、タックスリターンで正しく処理し、必要以上に支払わないようにします。
              </p>
            </div>

            <div className="bg-white rounded-2xl flex flex-col" style={{ padding: '20px', border: '1px solid #C8EAE0', boxShadow: '0 1px 4px rgba(0,0,0,.03)' }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ marginBottom: '12px', background: '#FFFCF5' }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <circle cx="10" cy="10" r="8" stroke="#C47E10" strokeWidth="1.4"/>
                  <path d="M10 6v5M10 13.5v.5" stroke="#C47E10" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <p className="text-[14px] font-bold text-ink" style={{ marginBottom: '6px' }}>RHCA非締結国（例：日本）の出身者</p>
              <p className="text-[12.5px] font-light text-muted leading-[1.75]" style={{ maxWidth: '30ch', marginBottom: '10px' }}>
                メディケア対象外の場合、メディケア税免除をタックスリターンで正しく適用し、税金を払い過ぎないようにします。
              </p>
            </div>
          </div>

          <div className="text-center reveal delay-2" style={{ marginTop: '24px' }}>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-medium transition-colors hover-forest-light"
              style={{ fontSize: '13.5px', color: '#0B5240' }}>
              どちらに該当するか分からない方へ。確認します →
            </a>
          </div>
        </div>
      </section>

      {/* ── NOT SURE? - MAIN ENTRY POINT ──────────────────────────────────── */}
      <section className="py-8 lg:py-12" style={{ background: '#0B5240' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-[560px] mx-auto text-center">
            <p className="font-serif font-black text-white" style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: '10px' }}>
              メディケア対象資格について不明ですか？
            </p>
            <p className="font-light" style={{ fontSize: '14px', color: 'rgba(255,255,255,0.65)', marginBottom: '20px' }}>
              対象資格を確認し、正しく適用します。
            </p>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center font-semibold"
              style={{ height: '46px', padding: '0 24px', background: '#E9A020', color: '#1A2822', borderRadius: '100px', fontSize: '14px' }}>
              対象資格を確認する →
            </a>
          </div>
        </div>
      </section>

      {/* ── WHAT WE DO ────────────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-9 lg:py-14 bg-white">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-xl mx-auto text-center reveal" style={{ marginBottom: '32px' }}>
            <span className="section-label center">私たちが対応すること</span>
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.2, letterSpacing: '-0.02em', maxWidth: '26ch', marginTop: '8px', marginBottom: '0', textWrap: 'balance' }}>
              タックスリターンの一部として対応します
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-5 reveal delay-1">
            {[
              {
                title: '対象資格を確認',
                body: 'ビザと出身国を確認し、メディケア対象資格を判断します。',
              },
              {
                title: '正しい対応を適用',
                body: 'メディケア税または免除をタックスリターンで正しく適用します。',
              },
              {
                title: '不要な税金を防ぐ',
                body: '本来支払う必要のないメディケア税が控除されないようにします。',
              },
            ].map((item, i) => (
              <div key={i} className="rounded-2xl" style={{ padding: '20px', background: '#EEF7F2', border: '1px solid #C8EAE0' }}>
                <div className="flex items-center gap-2" style={{ marginBottom: '6px' }}>
                  <span className="flex-shrink-0 flex items-center justify-center" style={{ width:'18px', height:'18px', borderRadius:'50%', background:'#C8EAE0', border:'1px solid #A8D5C5' }}>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true"><path d="M2 5l2.5 2.5 3.5-4" stroke="#0B5240" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  <p className="text-[13.5px] font-semibold text-ink" style={{ letterSpacing: '-0.01em' }}>{item.title}</p>
                </div>
                <p className="text-[12.5px] font-light text-muted leading-[1.75]" style={{ maxWidth: '28ch', paddingLeft:'26px' }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MEDICARE LEVY EXEMPTION + VIDEO ───────────────────────────────── */}
      <section className="py-10 lg:py-16" style={{ background: '#EEF7F2' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-2xl mx-auto text-center reveal">
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.2, letterSpacing: '-0.02em', maxWidth: '24ch', marginTop: '8px', marginBottom: '8px', textWrap: 'balance' }}>
              メディケア税免除
            </h2>
            <p className="font-light text-muted mx-auto" style={{ fontSize: '13.5px', lineHeight: 1.75, maxWidth: '42ch', marginBottom: '28px' }}>
              メディケア対象外の場合、タックスリターンの前にメディケア税免除が必要になることがあります。
            </p>
            {/* Mobile: portrait 9/16, Desktop: landscape 16/9 */}
            <div className="reveal delay-1 rounded-2xl overflow-hidden mx-auto w-full">
              {/* Mobile only (portrait) */}
              <div className="block sm:hidden" style={{ aspectRatio: '9/16', maxWidth: '360px', margin: '0 auto' }}>
                <iframe
                  src="https://www.youtube.com/embed/oj7ZSOHAxJk"
                  title="メディケア税免除の説明"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
                />
              </div>
              {/* Desktop (landscape) */}
              <div className="hidden sm:block" style={{ aspectRatio: '16/9', maxWidth: '720px', margin: '0 auto' }}>
                <iframe
                  src="https://www.youtube.com/embed/oj7ZSOHAxJk"
                  title="メディケア税免除の説明"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── COMMON CONFUSION ─────────────────────────────────────────────── */}
      <section className="py-10 lg:py-16 bg-white">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-xl mx-auto text-center reveal" style={{ marginBottom: '28px' }}>
            <span className="section-label center">よくある質問</span>
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.2, letterSpacing: '-0.02em', maxWidth: '26ch', marginTop: '8px', textWrap: 'balance' }}>
              メディケアに関するよくある質問
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 reveal delay-1">
            {[
              { q: 'メディケアに登録する必要がありますか？', a: '対象となるRHCA締結国出身の場合のみ必要です。それ以外の場合はタックスリターンで免除を申請します。' },
              { q: 'なぜ税金にメディケア税が表示されますか？', a: 'メディケア・ステータスが正しく入力されていないと、レビーが表示されることがあります。タックスリターン時に修正します。' },
              { q: 'メディケアを使っていないのに、なぜレビーが控除されますか？', a: '免除を申請していない場合、ATOは自動的にレビーを控除します。私たちが正しい免除を申請し、過剰な支払いを防ぎます。' },
              { q: '旅行保険はメディケアの代わりになりますか？', a: 'いいえ。旅行保険とメディケアは別の制度です。メディケア対象外の場合、医療費は旅行保険に頼ることになります。' },
              { q: 'ワーキングホリデービザはメディケアに影響しますか？', a: 'はい。ほとんどのワーキングホリデービザ保持者は、RHCA締結国出身者を除きメディケア対象外です。タックスリターンでメディケア・ステータスが正しく適用されるようにします。' },
              { q: 'ワーキングホリデービザでメディケアカードを取得できますか？', a: '対象となるRHCA締結国出身の場合のみ可能です。それ以外の場合は、代わりにメディケア税免除を申請します。' },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl" style={{ padding: '16px', border: '1px solid #C8EAE0', boxShadow: '0 1px 2px rgba(0,0,0,.02)' }}>
                <p className="text-[13px] font-semibold text-ink" style={{ marginBottom: '6px' }}>{item.q}</p>
                <p className="text-[12.5px] font-light text-muted leading-[1.75]">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEXT STEP ─────────────────────────────────────────────────────── */}
      <NextStep
        eyebrow="次のステップ"
        heading="タックスリターンの準備ができました"
        body="メディケア・ステータスが正しく適用され、税金を払い過ぎないようにします。"
        cta="タックスリターンを依頼する →"
        href="/ja/tax-return"
      />
    </>
  )
}
