import type { Metadata } from 'next'
import { GoogleRating } from '@/components/ui/GoogleRating'
import { GoogleReviews } from '@/components/ui/GoogleReviews'
import Link from 'next/link'
import { WA_URL, SITE_URL } from '@/lib/constants'
import { NextStep } from '@/components/ui/NextStep'
import { Accordion } from '@/components/ui/Accordion'

export const metadata: Metadata = {
  title: 'TFN（タックスファイルナンバー）申請 - ワーホリ オーストラリア 還付金の第一歩',
  description: 'TFN（タックスファイルナンバー）を最短で正しく取得。登録税理士の監督のもとで、ステップごとに丁寧にサポート。タックスリターン還付金を受け取るための第一歩。',
  keywords: [
    'TFN 申請 オーストラリア',
    'TFN 申請 ワーホリ',
    'TFN 取得 ワーホリ',
    'タックスファイルナンバー 取得',
    'タックスファイルナンバー 申請 オーストラリア',
    'ワーキングホリデー TFN',
    'ワーホリ TFN 取得方法',
    'TFN 417ビザ',
    'TFN 462ビザ',
    'TFN バックパッカー',
    'TFN ワーホリ 申請方法',
    'オーストラリア 税番号 日本語',
    'TFN オンライン 申請',
    'TFN タックスリターン 還付',
    'TFN 還付金 ワーホリ',
    'タックスファイルナンバー 還付金 取得',
    'TFN 申請 日数',
    'TFN 取得 何日',
    'TFN 渡航前 申請',
    'TFN 申請 必要書類',
  ],
  alternates: {
    canonical: `${SITE_URL}/ja/tfn`,
    languages: {
      'en-AU': `${SITE_URL}/tfn`,
      'de': `${SITE_URL}/de/tfn`,
      'ja': `${SITE_URL}/ja/tfn`,
      'x-default': `${SITE_URL}/tfn`,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: `${SITE_URL}/ja/tfn`,
    siteName: 'Working Holiday Tax',
    title: 'TFN申請 - ワーホリ オーストラリア 還付金の第一歩',
    description: 'TFN（タックスファイルナンバー）を最短で正しく取得。タックスリターン還付金を受け取るための第一歩。登録税理士の監督のもとでサポート。',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TFN申請 - ワーホリ オーストラリア',
    description: 'TFN（タックスファイルナンバー）を最短で正しく取得。タックスリターン還付金への第一歩。',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

const faqs = [
  { question: 'TFNを取得する前から働けますか？', answer: 'はい、TFNの到着を待たずにすぐに働き始めることができます。ただし、勤務開始から28日以内に雇用主にTFNを提出する必要があります。提出されるまで、雇用主は最高税率の45%で源泉徴収する義務があります。後日タックスリターンで取り戻せますが、到着前に申請しておくのがおすすめです。' },
  { question: '観光ビザでもTFNは取得できますか？', answer: 'いいえ、観光ビザでは取得できません。TFNを申請するには、就労許可のあるビザ（ワーキングホリデービザ417・462、学生ビザ、就労ビザなど）が必要です。' },
  { question: 'TFNを忘れてしまった場合はどうすればいいですか？', answer: 'ATOに直接問い合わせるか、過去のタックスリターンの控えや給与明細から確認できます。また、登録税理士の監督のもとでATO記録から取得することも可能です。' },
  { question: 'TFN Declaration（タックスファイルナンバー宣言書）とは？', answer: '新しい仕事を始める際に雇用主に提出する書類です。あなたのTFN、ビザステータス、税務区分を伝えることで、雇用主が正しい税率（ワーキングホリデーメーカーは15%）で源泉徴収できるようになります。' },
  { question: 'オーストラリア渡航前にTFNを申請できますか？', answer: 'TFNの申請はオーストラリア到着後、ワーキングホリデービザがアクティベートされてから行います。ATOからのTFN通知書を受け取るため、オーストラリア国内の郵送先住所が必要です。シェアハウスやホステルの住所でも問題ありません。' },
  { question: 'TFNとタックスリターン還付金の関係は？', answer: 'TFNはオーストラリアの税務記録すべてをあなたに紐付ける番号です。TFNを雇用主に提出していない場合、ワーホリ税率15%ではなく最高税率45%で源泉徴収されます。その分、タックスリターン提出時に大きな還付金として戻ってくることが多いです。' }
]

const STEPS = [
  { n: '1', title: 'ご相談・お問い合わせ',  body: 'ビザの種類など、基本情報をお知らせいただきます。ご相談は無料です。' },
  { n: '2', title: '書類のご送付',          body: 'パスポートと基本情報のみ。シンプルですぐに完了します。' },
  { n: '3', title: 'ATOへ代理申請',         body: '当社が必要書類を準備し、ATOに正しく申請を行います。' },
  { n: '4', title: 'TFNを受け取り',         body: 'ATOからTFNが発行され、28日以内にご指定の住所へ郵送されます。' },
]


const IconStar = () => (<svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="M6 1l1.35 2.73L10.5 4.2l-2.25 2.2.53 3.1L6 8.03 3.22 9.5l.53-3.1L1.5 4.2l3.15-.47z" fill="#E9A020"/></svg>)

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
    { '@type': 'ListItem', position: 2, name: 'TFN申請', item: `${SITE_URL}/ja/tfn` },
  ],
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'TFN（タックスファイルナンバー）の申請方法',
  description: 'オーストラリアのワーキングホリデーメーカーがTFN（タックスファイルナンバー）を申請する手順。登録税理士の監督のもとで日本語で代行します。',
  inLanguage: 'ja',
  totalTime: 'P28D',
  estimatedCost: { '@type': 'MonetaryAmount', currency: 'AUD', value: '0' },
  supply: [
    { '@type': 'HowToSupply', name: 'パスポート' },
    { '@type': 'HowToSupply', name: 'オーストラリア国内の郵便受取住所' },
    { '@type': 'HowToSupply', name: 'ワーキングホリデービザ（417または462）' },
  ],
  step: STEPS.map((s, i) => ({
    '@type': 'HowToStep',
    position: i + 1,
    name: s.title,
    text: s.body,
    url: `${SITE_URL}/ja/tfn#step-${i + 1}`,
  })),
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${SITE_URL}/ja/tfn#service`,
  name: 'TFN申請代行サービス',
  serviceType: 'タックスファイルナンバー申請',
  description: 'オーストラリアのワーキングホリデーメーカー向けTFN申請代行。登録税理士の監督のもとで日本語ですべて代行します。',
  provider: { '@id': `${SITE_URL}/#business` },
  areaServed: { '@type': 'Country', name: 'Australia' },
  audience: { '@type': 'Audience', audienceType: 'Working Holiday Maker (Subclass 417/462)' },
  inLanguage: 'ja',
}

export default function TFNPageJA() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-[68px]" style={{background:'linear-gradient(160deg,#fff 0%,#F7FBF9 100%)'}}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 pt-6 pb-8 lg:pt-14 lg:pb-14">

          <nav aria-label="パンくずリスト" className="flex items-center gap-2 mb-4 lg:mb-6"
            style={{ fontSize: '12px', color: 'rgba(10,15,13,0.35)' }}>
            <Link href="/ja" className="transition-colors hover:text-forest-500">ホーム</Link>
            <span aria-hidden="true" style={{ color: 'rgba(10,15,13,0.18)' }}>/</span>
            <span aria-current="page">TFN申請</span>
          </nav>

          <div className="max-w-[560px] lg:max-w-[700px]">

            <div className="inline-flex items-center gap-2 mb-3 lg:mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-forest-500 animate-pulse-dot" aria-hidden="true" />
              <span className="font-medium uppercase"
                style={{ fontSize: '10px', letterSpacing: '0.16em', color: 'rgba(11,82,64,0.65)' }}>
                TFN申請
              </span>
            </div>

            <h1 className="font-serif font-black text-ink"
              style={{ fontSize: 'clamp(24px,3.2vw,44px)', lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: '10px' }}>
              <span style={{ display: 'block' }}>TFNを取得して</span>
              <span style={{ display: 'block', color: '#0B5240' }}>初日から正しい税率で働く。</span>
            </h1>

            <p className="font-semibold text-ink"
              style={{ fontSize: 'clamp(14px,1.5vw,17px)', letterSpacing: '-0.01em', marginBottom: '8px', lineHeight: 1.5 }}>
              TFN申請をすべて代行。最短28日でお手元に届きます。
            </p>

            <p className="font-light"
              style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.75, color: 'rgba(10,15,13,0.58)', maxWidth: '48ch', marginBottom: '0' }}>
              TFNがないと、ワーホリの給料から最高税率の45%が源泉徴収されてしまいます。
            </p>

            <div className="hero-cta-pair flex flex-col gap-3 lg:flex-row lg:gap-4"
              style={{ marginTop: '24px', marginBottom: '20px', maxWidth: '480px' }}>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                className="btn-primary inline-flex justify-center"
                style={{ height: '54px', padding: '0 36px', fontSize: '15px', borderRadius: '100px', flex: '1', width: '100%' }}>
                TFNを申請する →
              </a>
              <a href="#how-to-apply"
                className="inline-flex btn-ghost-dark justify-center"
                style={{ height: '52px', padding: '0 24px', fontSize: '15px', flex: '1', width: '100%' }}>
                申請手順を見る →
              </a>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-2 lg:flex lg:flex-row lg:flex-nowrap lg:items-center lg:gap-y-0 lg:gap-x-7">
              {['350名以上をサポート', <GoogleRating key="rating" variant="pill" lang="ja" />, '45カ国以上に対応', '1時間以内に返信'].map((t, i) => (
                <span key={i} className="inline-flex items-center gap-1.5 whitespace-nowrap"
                  style={{ fontSize: '12px', color: 'rgba(10,15,13,0.45)' }}>
                  <svg width="12" height="12" viewBox="0 0 13 13" fill="none" aria-hidden="true"><circle cx="6.5" cy="6.5" r="6" fill="#EAF6F1" stroke="#C8EAE0" strokeWidth="0.5"/><path d="M4 6.5l2 2 3.5-3.5" stroke="#0B5240" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>{t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT IS A TFN? ───────────────────────────────────────────────── */}
      <section className="tfn-intro-section">
        <div className="tfn-intro-container reveal">
          <div className="tfn-intro-grid">

            <div className="tfn-intro-content">
              <h2 className="tfn-intro-heading">
                TFNとは？
              </h2>
              <p className="tfn-intro-body">
                <strong>TFN（タックスファイルナンバー）</strong>は、ATO（オーストラリア税務署）が発行する個人の納税者番号です。オーストラリアで合法的に働き、正しい税率で給料を受け取るために必要な9桁の番号です。
              </p>
              <p className="tfn-intro-body">
                TFNがないまま働くと、雇用主は法律により、収入額にかかわらず<strong>45%</strong>の最高税率で源泉徴収する義務を負います。
              </p>
              <p className="tfn-intro-body">
                TFNを取得すれば、ワーキングホリデーメーカーは年収45,000ドルまで<strong>15%</strong>のワーホリ税率が適用されます。週あたり数百ドルもの差になることもあります。
              </p>
            </div>

            <div className="tfn-intro-visual">
              <div className="tfn-comparison-card tfn-comparison-bad">
                <p className="tfn-comparison-label">TFNなし</p>
                <p className="tfn-comparison-rate">45%</p>
                <p className="tfn-comparison-detail">給料から源泉徴収</p>
              </div>
              <div className="tfn-comparison-divider">
                <div className="tfn-comparison-arrow">↓</div>
                <p className="tfn-comparison-savings">最大30%節約</p>
              </div>
              <div className="tfn-comparison-card tfn-comparison-good">
                <p className="tfn-comparison-label">TFNあり</p>
                <p className="tfn-comparison-rate">15%</p>
                <p className="tfn-comparison-detail">ワーホリ標準税率</p>
              </div>
            </div>

          </div>

          <div className="service-cta-strip">
            <div className="service-cta-text">
              <h3 className="service-cta-heading">TFN申請をすべて当社が代行</h3>
              <p className="service-cta-sub">WhatsAppでの無料相談から、確実かつ迅速に申請。通常1時間以内にご返信します。</p>
            </div>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="service-cta-button">
              TFNを申請する →
            </a>
          </div>
        </div>
      </section>

      {/* ── SOLUTION ─────────────────────────────────────────────────────── */}
      <section className="py-10 lg:py-16" style={{ background: '#F5F9F7' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 reveal">
          <div className="max-w-xl lg:max-w-2xl mx-auto text-center mb-8 lg:mb-10">
            <span className="section-label center">当社のサービス</span>
            <h2 className="font-serif font-black text-ink mx-auto"
              style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.2, letterSpacing: '-0.02em', marginTop: '10px', marginBottom: '10px' }}>
              TFN申請のすべてを当社が代行します
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6" style={{ marginBottom:'28px', alignItems:'stretch' }}>
            {[
              { icon:<svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M10 2v8l5 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.4"/></svg>, title:'一度で確実に完了', body:'提出前にすべての書類をチェックし、ミスや遅延を防ぎます。' },
              { icon:<svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M3 10h14M10 3l7 7-7 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>, title:'初日から正しい税率で', body:'TFNを早期に取得すれば、ワーホリ最高税率45%による源泉徴収を回避できます。' },
              { icon:<svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><rect x="2" y="2" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.4"/><path d="M7 10l2.5 2.5 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>, title:'面倒な書類仕事はゼロ', body:'英語のATOポータルや複雑な書類と格闘する必要はありません。すべて当社が代行します。' },
              { icon:<svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.4"/><path d="M10 6v4.5l3 1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>, title:'日本語でかんたん・スピーディ', body:'基本情報をお送りいただくだけで、TFN申請のすべてをお任せいただけます。' },
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

          <div className="text-center mt-6 lg:mt-10">
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex"
              style={{ height: '52px', padding: '0 36px', fontSize: '15px', maxWidth: '320px', width: '100%', marginLeft: 'auto', marginRight: 'auto' }}>
              TFNを申請する →
            </a>
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF ─────────────────────────────────────────────────── */}
      <section className="py-10 lg:py-14 bg-white">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 reveal">
          <div className="text-center mb-7 lg:mb-10">
            <span className="section-label center">お客様の声</span>
            <h2 className="font-serif font-black text-ink mx-auto"
              style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.15, letterSpacing: '-0.02em', marginTop: '10px', maxWidth: '34ch' }}>
              当社でTFNを取得したワーホリの皆さん
            </h2>
          </div>
          <GoogleReviews lang="ja" />
        </div>
      </section>

      {/* ── COMPARISON ───────────────────────────────────────────────────── */}
      <section className="py-10 lg:py-16" style={{ background: '#F5F9F7' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 reveal">
          <div className="max-w-xl mx-auto text-center mb-8 lg:mb-10">
            <span className="section-label center">かんたんな方法</span>
            <h2 className="font-serif font-black text-ink mx-auto"
              style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.2, letterSpacing: '-0.02em', marginTop: '10px' }}>
              自分で申請するより、登録税理士の監督のもとで任せる方が確実
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6 max-w-3xl lg:max-w-4xl mx-auto" style={{ alignItems: 'stretch' }}>
            <div className="rounded-2xl" style={{ padding: '22px', background: '#fff', border: '1.5px solid #E2EFE9' }}>
              <p className="font-semibold text-muted" style={{ fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '18px' }}>
                ATOで自分で申請する場合
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {['英語の複雑な政府書類と不明確な手順', '小さな入力ミスで申請が遅延・却下される', '問題が発生してもサポートを得られない', 'すべての判断を自分で行う必要がある'].map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: '3px' }}><circle cx="8" cy="8" r="7.5" fill="#FEF3F0" stroke="#FBD0BB" strokeWidth="0.5"/><path d="M5.5 10.5l5-5M10.5 10.5l-5-5" stroke="#9A3412" strokeWidth="1.3" strokeLinecap="round"/></svg>
                    <p className="font-light text-muted" style={{ fontSize: 'clamp(12px, 1.1vw, 13px)', lineHeight: 1.8 }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl flex flex-col" style={{ padding: '22px', background: '#EAF6F1', border: '1.5px solid #C8EAE0' }}>
              <p className="font-semibold text-forest-500" style={{ fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '18px' }}>
                当社のTFNサービスの場合
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px', flex: '1' }}>
                {['日本語でガイド付きのかんたんなプロセス', '提出前に当社が書類を確認', '一度で確実に申請が完了', '何かあればいつでも日本語でサポート'].map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: '3px' }}><circle cx="8" cy="8" r="7.5" fill="#EAF6F1" stroke="#C8EAE0" strokeWidth="0.5"/><path d="M5 8l2.5 2.5 4-4" stroke="#0B5240" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <p className="font-semibold text-ink" style={{ fontSize: 'clamp(12px, 1.1vw, 13px)', lineHeight: 1.8 }}>{item}</p>
                  </div>
                ))}
              </div>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex"
                style={{ height: '50px', padding: '0 24px', fontSize: '14px', width: '100%', justifyContent: 'center' }}>
                TFNを申請する →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section id="how-to-apply" className="py-10 lg:py-16" style={{ background: '#F5F9F7' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 reveal">
          <div className="max-w-xl mx-auto text-center mb-8 lg:mb-10">
            <span className="section-label center">ご利用の流れ</span>
            <h2 className="font-serif font-black text-ink mx-auto"
              style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.2, letterSpacing: '-0.02em', marginTop: '10px', marginBottom: '10px' }}>
              4ステップでTFNを取得
            </h2>
            <p className="font-light text-muted" style={{ fontSize: '13.5px', lineHeight: 1.75 }}>
              ご相談から発行まで、日本語ですべてサポートいたします。
            </p>
          </div>

          {/* Desktop */}
          <div className="hidden lg:block" style={{ marginBottom: '56px' }}>
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
                  <p className="font-semibold text-ink text-center" style={{ fontSize: '14px', marginBottom: '7px', letterSpacing: '-0.01em', lineHeight: 1.35 }}>{s.title}</p>
                  <p className="font-light text-muted text-center" style={{ fontSize: '12.5px', lineHeight: 1.75 }}>{s.body}</p>
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

          <div className="text-center mt-8 lg:mt-10">
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-primary"
              style={{ height: '52px', padding: '0 40px', fontSize: '15px', maxWidth: '320px', width: '100%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
              TFNを申請する →
            </a>
          </div>
        </div>
      </section>

      {/* ── WHAT TO HAVE READY ── */}

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="py-10 lg:py-14" style={{ background: '#F5F9F7' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 reveal">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 lg:gap-8 lg:items-center">

            <div className="text-center">
              <span className="section-label center">よくあるご質問</span>
              <h2 className="font-serif font-black text-ink"
                style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.2, letterSpacing: '-0.02em', marginTop: '10px', marginBottom: '12px' }}>
                TFNに関するご質問
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
        heading="TFNの取得後は？"
        body="個人事業主やフリーランス、配車・配達などで請負業務を行う場合は、正しく請求書を発行するためにABNの登録が必要です。"
        cta="ABNが必要か確認する →"
        href="/ja/abn"
      />
    </>
  )
}
