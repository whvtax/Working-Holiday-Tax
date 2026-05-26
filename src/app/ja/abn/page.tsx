import type { Metadata } from 'next'
import Link from 'next/link'
import { WA_URL, SITE_URL } from '@/lib/constants'
import { NextStep } from '@/components/ui/NextStep'
import { Accordion } from '@/components/ui/Accordion'

export const metadata: Metadata = {
  title: 'ABN登録 - ワーキングホリデー オーストラリア',
  description: '個人事業主として正しくABNを登録。ワーキングホリデー専門の登録税理士が、登録から税務まですべてサポートします。',
  keywords: [
    'ABN 登録 オーストラリア',
    'ABN ワーキングホリデー',
    'Australian Business Number 取得',
    'ABN 申請 オーストラリア',
    'ワーホリ 個人事業主 オーストラリア',
    'ABN フリーランス',
    'ABN 417ビザ',
    'ABN 462ビザ',
    'ABN オンライン 登録',
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
    type: 'website',
    locale: 'ja_JP',
    url: `${SITE_URL}/ja/abn`,
    siteName: 'Working Holiday Tax',
    title: 'ABN登録 - ワーキングホリデー オーストラリア',
    description: '個人事業主として正しくABNを登録。登録税理士がサポートします。',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

const faqs = [
  { question: 'TFNとABNの両方を持つことはできますか？', answer: 'はい。両方持つことができます。TFNは雇用契約用、ABNは個人事業主としての活動用に使い分けます。' },
  { question: 'TFNなしでABNを取得できますか？', answer: 'いいえ。ABNを申請する前に、まずTFNを取得する必要があります。' },
  { question: 'GST（消費税）の登録は必要ですか？', answer: '年間売上が75,000ドルを超える場合のみGST登録が必要です。ほとんどのワーキングホリデービザ保持者はGST登録の必要はありません。' },
  { question: 'オーストラリアを離れる時、ABNはどうなりますか？', answer: 'オーストラリアでの活動を終了する際、オンラインでABNを取り消すことができます。' },
  { question: 'ABN申請が却下されることはありますか？', answer: 'はい。申請内容が実際の業務実態と一致しない場合、遅延や却下の可能性があります。だからこそ、登録税理士を利用することをお勧めします。最初から正しく設定することで、後々の問題を防げます。' },
]

const MISTAKES = [
  { title: '雇用関係なのにABNで働く',                 body: '雇用主が働き方、時間、場所を指示している場合、ABNでの契約は適切ではない可能性があります。' },
  { title: '誤った業種を登録する',                     body: 'ABNの登録内容は、実際の業務の性質を正確に反映する必要があります。' },
  { title: '収入記録を残さない',                       body: '収入を記録し、税金分を別に取り分けておくことで、後々の問題を防げます。' },
  { title: 'タックスリターンを怠る',                           body: 'ABN収入はATOへの申告が必須です。' },
]

const STEPS = [
  { n: '1', title: 'お仕事の内容を教えてください',     body: '業務とビザの詳細をお知らせください。正しくご案内します。' },
  { n: '2', title: 'データを送信',                   body: 'TFNとパスポート情報のみ。素早く完了します。' },
  { n: '3', title: '登録を代行します',                 body: 'すべて準備し、正しく申請します。' },
  { n: '4', title: 'ABNを取得して活動開始',          body: 'ABNは通常1時間以内に発行され、すぐに請求書発行や業務開始ができます。' },
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

export default function ABNPageJA() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-[68px] bg-white">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 pt-6 pb-8 lg:pt-16 lg:pb-16">

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
              <span style={{ display: 'block' }}>ABNを登録して</span>
              <span style={{ display: 'block', color: '#0B5240' }}>個人事業主として働く。</span>
            </h1>

            <p className="font-semibold text-ink"
              style={{ fontSize: 'clamp(14px,1.5vw,17px)', letterSpacing: '-0.01em', marginBottom: '8px', lineHeight: 1.5 }}>
              ABNを最初から正しく設定します。
            </p>

            <p className="font-light"
              style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.75, color: 'rgba(10,15,13,0.58)', maxWidth: '48ch', marginBottom: '0' }}>
              初日からあなたのお仕事に合わせて正しくABNをセットアップします。
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
                手順を見る →
              </a>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-2 lg:flex lg:flex-row lg:flex-nowrap lg:items-center lg:gap-y-0 lg:gap-x-7">
              {['1,200名以上をサポート', '4.9★（300件以上のレビュー）', '45カ国以上に対応', '返信時間 1時間以内'].map((t, i) => (
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
        <div className="abn-intro-container">
          <div className="abn-intro-grid">

            <div className="abn-intro-content">
              <p className="abn-intro-eyebrow">個人事業主・フリーランス向け</p>
              <h2 className="abn-intro-heading">
                ABNとは？
              </h2>
              <p className="abn-intro-body">
                <strong>ABN（Australian Business Number）</strong>は、オーストラリア政府(ABR)が発行する11桁の事業者番号です。給与を受け取る通常の従業員ではなく、自分の事業として働く場合に必要となります。
              </p>
              <p className="abn-intro-body">
                ABNがあれば、<strong>クライアントに直接請求書を発行</strong>することができ、個人事業主（sole trader）やフリーランスとして合法的に働けます。ワーホリの方によくあるABN業務：Uber Eats・フードデリバリー、Uber配車サービス、ファーム請負作業、コンテンツ制作、清掃業、ヘアサロン業務委託など。
              </p>
              <p className="abn-intro-body">
                ABNはTFNの代わりではなく、それぞれ異なる役割を持っています。多くのワーキングホリデーメーカーは両方を持っています。TFNは雇用契約、ABNは個人事業として使い分けます。
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
                  <p className="abn-compare-title">従業員</p>
                  <p className="abn-compare-subtitle">TFNが必要</p>
                  <ul className="abn-compare-list">
                    <li>雇用主が給与計算</li>
                    <li>税金は自動的に源泉徴収</li>
                    <li>スーパー（年金）の支給あり</li>
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
                  <p className="abn-compare-title">個人事業主</p>
                  <p className="abn-compare-subtitle">ABNが必要</p>
                  <ul className="abn-compare-list">
                    <li>自分で請求書を発行</li>
                    <li>税金は自己管理</li>
                    <li>クライアントからのスーパーなし</li>
                  </ul>
                </div>

              </div>
            </div>

          </div>

          <div className="service-cta-strip">
            <div className="service-cta-text">
              <h3 className="service-cta-heading">ABN登録を正しく代行します</h3>
              <p className="service-cta-sub">WhatsAppでの無料相談から、あなたの業務に合わせた正しい設定でABNを登録。税務上の義務もわかりやすくご説明します。</p>
            </div>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="service-cta-button">
              ABNを登録する →
            </a>
          </div>
        </div>
      </section>

      {/* ── HOW WE HELP ──────────────────────────────────────────────────── */}
      <section className="py-10 lg:py-16 bg-white">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">

          <div className="max-w-xl mx-auto text-center mb-8 lg:mb-12">
            <span className="section-label center">私たちのサポート</span>
            <h2 className="font-serif font-black text-ink mx-auto"
              style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.2, letterSpacing: '-0.02em', maxWidth: '26ch', marginTop: '8px', marginBottom: '8px' }}>
              シンプルに、わかりやすく、最初から正しく。
            </h2>
            <p className="font-light text-muted"
              style={{ fontSize: 'clamp(12.5px,1.1vw,13.5px)', lineHeight: 1.75, maxWidth: '34ch', margin: '0 auto', color: 'rgba(10,15,13,0.5)' }}>
              シンプルに、わかりやすく、最初から正しく設定します。
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6" style={{ marginBottom: '28px', alignItems: 'stretch' }}>
            {[
              { n: '01', title: '正しい設定を選ぶお手伝い',          body: 'ABNが必要か迷っていますか？状況を確認し、明確にご案内します。' },
              { n: '02', title: 'ABNを正しく登録',                  body: 'あなたの業務に合うABNを登録します。遅延も問題もなしで。' },
              { n: '03', title: '初日から正しく設定',                body: 'すべて正確に処理されるので、すぐに問題なくお仕事を始められます。' },
            ].map((item, i) => (
              <div key={i} className="rounded-2xl flex flex-col"
                style={{ padding: '18px', background: '#F5F9F7', border: '1px solid #C8EAE0' }}>
                <span className="text-[10px] font-medium tracking-[0.12em] uppercase text-subtle block"
                  style={{ marginBottom: '10px' }}>{item.n}</span>
                <h3 className="font-semibold text-ink"
                  style={{ fontSize: 'clamp(13px,1.2vw,14px)', letterSpacing: '-0.01em', marginBottom: '6px', lineHeight: 1.4 }}>
                  {item.title}
                </h3>
                <p className="font-light text-muted leading-[1.75] flex-1"
                  style={{ fontSize: 'clamp(12px,1.1vw,13px)' }}>{item.body}</p>
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

      {/* ── COMMON MISTAKES ──────────────────────────────────────────────── */}
      <section className="py-10 lg:py-16" style={{ background: '#F5F9F7' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">

          <div className="max-w-xl mx-auto text-center mb-7 lg:mb-10">
            <span className="section-label center">よくあるミス</span>
            <h2 className="font-serif font-black text-ink mx-auto"
              style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.2, letterSpacing: '-0.02em', maxWidth: '28ch', marginTop: '8px', marginBottom: '8px' }}>
              ABNの設定ミスは<br /><em className="not-italic font-normal text-forest-400">後々の問題につながります</em>
            </h2>
            <p className="font-light text-muted mx-auto"
              style={{ fontSize: 'clamp(12.5px,1.1vw,13.5px)', lineHeight: 1.75, maxWidth: '38ch' }}>
              これらのミスは頻繁に起こり、申請の遅延や後の複雑な問題を引き起こします。
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5" style={{ alignItems: 'stretch' }}>
            {MISTAKES.map((m, i) => (
              <div key={i} className="rounded-xl flex flex-col"
                style={{ padding: '16px', background: '#FFFCF5', border: '1.5px solid #F0D99A', boxShadow: '0 1px 4px rgba(0,0,0,.03)' }}>
                <div className="flex items-center justify-center rounded-lg flex-shrink-0"
                  style={{ width: '28px', height: '28px', background: '#FDF0D5', border: '1px solid #F0D99A', marginBottom: '10px' }}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M6 2v4M6 8.5v.5" stroke="#C47E10" strokeWidth="1.8" strokeLinecap="round"/>
                  </svg>
                </div>
                <p className="font-semibold text-ink" style={{ fontSize: '13px', marginBottom: '5px', lineHeight: 1.4 }}>{m.title}</p>
                <p className="font-light text-muted leading-[1.75] flex-1" style={{ fontSize: '12px' }}>{m.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW TO REGISTER ──────────────────────────────────────────────── */}
      <section id="how-to-register" className="py-10 lg:py-16" style={{ background: '#EEF7F2' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">

          <div className="max-w-xl mx-auto text-center mb-8 lg:mb-14">
            <span className="section-label center">登録の流れ</span>
            <h2 className="font-serif font-black text-ink mx-auto"
              style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.2, letterSpacing: '-0.02em', maxWidth: '26ch', marginTop: '8px', marginBottom: '8px' }}>
              4ステップでABN取得
            </h2>
            <p className="font-light text-muted"
              style={{ fontSize: 'clamp(13px,1.2vw,14.5px)', lineHeight: 1.75 }}>
              最初から最後まで、ガイド付きの簡単なプロセス
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
                    style={{ width: '40px', height: '40px', background: '#0B5240', fontSize: '15px', marginBottom: '18px', boxShadow: '0 0 0 5px #EEF7F2, 0 0 0 6px #C8EAE0' }}>
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
                  <p className="font-semibold text-ink" style={{ fontSize: '13.5px', marginBottom: '3px', letterSpacing: '-0.01em', lineHeight: 1.35 }}>{s.title}</p>
                  <p className="font-light text-muted" style={{ fontSize: '12.5px', lineHeight: 1.75 }}>{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="py-10 lg:py-16" style={{ background: '#F4F9F6' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 lg:gap-10 items-start">

            <div className="text-center">
              <span className="section-label center">よくある質問</span>
              <h2 className="font-serif font-black text-ink"
                style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.2, letterSpacing: '-0.02em', marginTop: '10px', marginBottom: '12px' }}>
                ABNに関するご質問
              </h2>
              <p className="font-light text-muted"
                style={{ fontSize: '13.5px', lineHeight: 1.75, marginBottom: '24px' }}>
                その他のご質問はお気軽にお問い合わせください。
              </p>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                className="btn-primary inline-flex items-center justify-center"
                style={{ height: '48px', padding: '0 28px', fontSize: '14px', width: '100%', maxWidth: '240px' }}>
                今すぐ相談する →
              </a>
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
    </>
  )
}
