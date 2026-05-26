import type { Metadata } from 'next'
import Link from 'next/link'
import { WA_URL, SITE_URL } from '@/lib/constants'
import { NextStep } from '@/components/ui/NextStep'
import { Accordion } from '@/components/ui/Accordion'

export const metadata: Metadata = {
  title: 'スーパー受取（DASP） - ワーキングホリデー オーストラリア',
  description: 'オーストラリアを離れた後、積み立てたスーパーアニュエーションを受け取り。給与の12%がスーパーに積み立てられています。DASP申請をすべてサポート。',
  keywords: [
    'DASP スーパー 受取',
    'Departing Australia Superannuation Payment 日本語',
    'スーパー 還付 ワーキングホリデー',
    'オーストラリア 帰国 スーパー',
    'スーパー 受取 417ビザ',
    'スーパー 受取 462ビザ',
    'バックパッカー スーパー 返金',
    'WHM スーパーアニュエーション 申請',
    'オーストラリア 年金 返金',
  ],
  alternates: {
    canonical: `${SITE_URL}/ja/superannuation`,
    languages: {
      'en-AU': `${SITE_URL}/superannuation`,
      'de': `${SITE_URL}/de/superannuation`,
      'ja': `${SITE_URL}/ja/superannuation`,
      'x-default': `${SITE_URL}/superannuation`,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: `${SITE_URL}/ja/superannuation`,
    siteName: 'Working Holiday Tax',
    title: 'スーパー受取（DASP） - ワーキングホリデー オーストラリア',
    description: 'オーストラリアのスーパーをDASPで受け取り。すべて代行します。',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'スーパー受取（DASP） - ワーキングホリデー オーストラリア',
    description: 'オーストラリアを離れる際、スーパーを受け取り。',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

const faqs = [
  {
    question: '数年前にオーストラリアを離れました。今からでもスーパーを申請できますか？',
    answer: 'はい。スーパー受取に期限はありません。残高がすでにATOに移管されていても、取り戻すことができます。',
  },
  {
    question: '複数の雇用主で働いていました。スーパー口座も複数ありますか？',
    answer: '複数の雇用主で働いた場合、複数のスーパー口座を持っている可能性があります。すべて見つけて、まとめてから申請をお手伝いします。',
  },
  {
    question: 'スーパーが受け取れるまでどのくらいかかりますか？',
    answer: 'スーパー受取（DASP）は通常、申請承認から2〜4週間以内に支払われます。お金は直接あなたの銀行口座に振り込まれます。',
  },
  {
    question: 'スーパーはオーストラリアの口座と海外口座、どちらに振り込めますか？',
    answer: 'スーパーは直接ご指定の銀行口座に振り込まれます。ご希望に応じて、オーストラリアの口座にも海外の口座にも振り込み手配が可能です。',
  },
  {
    question: 'ABNで働いていた場合もスーパーは受け取れますか？',
    answer: '通常は受け取れません。ABNでの業務（請負業者・個人事業主）の場合、一般的にスーパーは支払われません。スーパーは従業員として分類された場合にのみ支払われます。ABN請負業者として働く場合、希望すればご自身でスーパー積立を手配する必要があります。',
  },
]

const STEPS = [
  { n: '1', title: '状況を教えてください', body: 'ビザと業務のデータを送信してください。正しくご案内します。' },
  { n: '2', title: '書類を送信',          body: 'パスポート、TFN、スーパーファンドの情報のみ。素早く簡単です。' },
  { n: '3', title: 'すべて代行します',     body: 'すべて準備し、正しく申請します。' },
  { n: '4', title: 'スーパーを受け取り',   body: 'お金は直接ご指定の銀行口座に振り込まれます。' },
]

const TESTIMONIALS = [
  {
    name: "Liam O'Connor",
    from: 'アイルランド · WHV 417',
    quote: '複数の雇用主がいて、どうやってスーパーを取り戻すか分かりませんでした。Working Holiday Taxがすべて対応してくれて、無事に受け取れました。',
    amount: '$3,200',
    initials: 'L',
    bgColor: '#EAF6F1',
    textColor: '#0B5240',
  },
  {
    name: '鈴木 結衣',
    from: '日本 · WHV 417',
    quote: 'とても簡単なプロセスでした。すべて分かりやすく説明してくれて、スーパーを全額取り戻せました。日本に帰国後でも対応してくれて助かりました。',
    amount: '$4,100',
    initials: 'Y',
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
    { '@type': 'ListItem', position: 2, name: 'スーパー受取', item: `${SITE_URL}/ja/superannuation` },
  ],
}

export default function JapaneseSuperannuationPage() {
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
            <span aria-current="page">スーパー受取</span>
          </nav>

          <div className="max-w-[560px] lg:max-w-[700px]">

            <div className="inline-flex items-center gap-2 mb-3 lg:mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-forest-500 animate-pulse-dot" aria-hidden="true" />
              <span className="font-medium uppercase"
                style={{ fontSize:'10px', letterSpacing:'0.16em', color:'rgba(11,82,64,0.65)' }}>
                スーパー受取
              </span>
            </div>

            <h1 className="font-serif font-black text-ink"
              style={{
                fontSize:'clamp(24px,3.2vw,44px)',
                lineHeight:1.15,
                letterSpacing:'-0.02em',
                marginBottom:'10px',
              }}>
              <span style={{ display:'block' }}>スーパーを受け取る</span>
              <span style={{ display:'block', color:'#0B5240' }}>オーストラリアを離れる際に。</span>
            </h1>

            <p className="font-semibold text-ink"
              style={{ fontSize:'clamp(14px,1.5vw,17px)', letterSpacing:'-0.01em', marginBottom:'8px', lineHeight:1.5 }}>
              DASP申請プロセスをすべて代行します。
            </p>

            <p className="font-light"
              style={{
                fontSize:'clamp(13px,1.2vw,15px)',
                lineHeight:1.75,
                color:'rgba(10,15,13,0.58)',
                maxWidth:'44ch',
                marginBottom:'0',
              }}>
              ほとんどの場合、28日以内に支払われます。
            </p>

            <div className="hero-cta-pair flex flex-col gap-3 lg:flex-row lg:gap-4"
              style={{ marginTop:'24px', marginBottom:'20px', maxWidth:'480px' }}>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                className="btn-primary inline-flex justify-center"
                style={{ height:'54px', padding:'0 36px', fontSize:'15px', borderRadius:'100px', flex:'1', width:'100%' }}>
                スーパーを申請する →
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

      {/* ── WHAT IS SUPER? - Unique design: "Don't leave it behind" ───── */}
      <section className="super-intro-section">
        <div className="super-intro-container">
          <div className="super-intro-grid">

            {/* Left: Explainer */}
            <div className="super-intro-content">
              <p className="super-intro-eyebrow">あなた名義の隠れた資産</p>
              <h2 className="super-intro-heading">
                スーパーアニュエーションとは？
              </h2>
              <p className="super-intro-body">
                <strong>スーパーアニュエーション</strong>（略して&quot;スーパー&quot;）は、オーストラリアの年金制度です。法律により、雇用主は給与とは別に<strong>給与の12%</strong>をスーパーファンドに積み立てる義務があります。あなたが思っているよりも多くを稼いでいるのです。
              </p>
              <p className="super-intro-body">
                ワーキングホリデーメーカーは、オーストラリアを離れる際にこのお金を受け取ることができます。これを<strong>DASP（Departing Australia Superannuation Payment）</strong>と呼びます。
              </p>
              <p className="super-intro-body">
                受取金額には65%の税金がかかりますが、残りの35%は確実にあなたの財布に入ります。ほとんどのバックパッカーにとって、これは<strong>$2,000〜$5,000</strong>に相当する、知らなかった収入です。
              </p>
            </div>

            {/* Right: Visual - "Don't leave it behind" boarding pass */}
            <div className="super-intro-visual">
              <div className="super-boarding-card">
                <div className="super-boarding-header">
                  <span className="super-boarding-from">AUS</span>
                  <svg width="32" height="20" viewBox="0 0 32 20" fill="none" aria-hidden="true">
                    <path d="M2 10h28M22 4l8 6-8 6" stroke="#0B5240" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="super-boarding-to">帰国</span>
                </div>
                <div className="super-boarding-divider"></div>
                <div className="super-boarding-meta">
                  <div>
                    <p className="super-boarding-meta-label">乗客</p>
                    <p className="super-boarding-meta-value">あなた</p>
                  </div>
                  <div>
                    <p className="super-boarding-meta-label">状態</p>
                    <p className="super-boarding-meta-value super-boarding-status-warn">
                      スーパーを放置
                    </p>
                  </div>
                </div>
                <div className="super-boarding-amount-block">
                  <p className="super-boarding-amount-label">未受取スーパー</p>
                  <p className="super-boarding-amount">$2,000〜$5,000</p>
                </div>
              </div>
            </div>

          </div>

          {/* CTA strip to OUR service */}
          <div className="service-cta-strip">
            <div className="service-cta-text">
              <h3 className="service-cta-heading">スーパーを取り戻すお手伝いをします</h3>
              <p className="service-cta-sub">初回相談は無料。スーパーファンドの確認からDASP申請まで、すべてのプロセスを代行。お金をオーストラリアに置いていかないようサポートします。</p>
            </div>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="service-cta-button">
              スーパーを申請する →
            </a>
          </div>
        </div>
      </section>

      {/* ── CLARITY - THIS IS YOUR MONEY ──────────────────────────────────── */}
      <section className="py-10 lg:py-16" style={{ background: '#EEF7F2' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-xl mx-auto text-center reveal" style={{ marginBottom: '32px' }}>
            <span className="section-label center">あなたのお金です</span>
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.2, letterSpacing: '-0.02em', maxWidth: '26ch', marginTop: '8px', marginBottom: '0', textWrap: 'balance' }}>
              スーパーはあなたのものです。申請するだけで受け取れます。
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 mb-8 lg:mb-10 reveal delay-1">
            {[
              {
                icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="9" stroke="currentColor" strokeWidth="1.4"/><path d="M11 7v4.5l3 2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>,
                title: '雇用主が積み立てます',
                body: 'オーストラリアの法律により、雇用主は給与とは別にスーパーを積み立てます。',
              },
              {
                icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true"><rect x="3" y="6" width="16" height="12" rx="2.5" stroke="currentColor" strokeWidth="1.4"/><path d="M7 6V5a4 4 0 018 0v1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><path d="M9 12l2 2 3.5-3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>,
                title: 'これはあなたのお金',
                body: 'オーストラリアで働いている間にスーパーが積み立てられ、帰国時に受け取ることができます。',
              },
              {
                icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true"><path d="M11 3v18M3 11h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><circle cx="11" cy="11" r="9" stroke="currentColor" strokeWidth="1.4"/></svg>,
                title: '私たちが代わりに取り戻します',
                body: 'スーパーを見つけ、申請を準備し、提出します。処理が完了すると、お金が振り込まれます。',
              },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl flex flex-col" style={{ padding: '22px', boxShadow: '0 1px 3px rgba(0,0,0,.04), 0 2px 12px rgba(11,82,64,.06)' }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-forest-500" style={{ background: '#EAF6F1', marginBottom: '12px' }}>
                  {item.icon}
                </div>
                <p className="text-[13.5px] font-semibold text-ink" style={{ letterSpacing: '-0.01em', marginBottom: '6px' }}>{item.title}</p>
                <p className="text-[12.5px] font-light text-muted leading-[1.75]" style={{ maxWidth: '28ch' }}>{item.body}</p>
              </div>
            ))}
          </div>

          <div className="text-center reveal delay-3" style={{ marginTop: '28px' }}>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-medium transition-colors hover-forest-light"
              style={{ fontSize: '13.5px', color: '#0B5240' }}>
              スーパー受取資格を確認する →
            </a>
          </div>
        </div>
      </section>

      {/* ── EARLY SOCIAL PROOF ────────────────────────────────────────────── */}
      <section className="py-8 lg:py-10 bg-white">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-xl mx-auto text-center mb-8 reveal">
            <span className="section-label center">実績</span>
            <h2 className="font-serif font-black text-ink mt-2" style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
              ワーホリの皆さんが取り戻したスーパー
            </h2>
          </div>
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



      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-10 lg:py-16" style={{ background: '#EEF7F2' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-xl mx-auto text-center reveal" style={{ marginBottom: '48px' }}>
            <span className="section-label center">ご利用の流れ</span>
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.2, letterSpacing: '-0.02em', maxWidth: '22ch', marginTop: '8px', marginBottom: '8px', textWrap: 'balance' }}>
              4ステップで完了
            </h2>
            <p className="font-light text-muted" style={{ fontSize: '13.5px' }}>
              シンプル、ガイド付き、最初から最後まで
            </p>
          </div>

          <div className="reveal delay-1">
            <div className="hidden lg:block">
              <div className="relative flex items-start">
                <div className="absolute left-[calc(12.5%)] right-[calc(12.5%)] top-4 h-[2px]" style={{ background: 'linear-gradient(90deg, #C8EAE0 0%, #0B5240 30%, #0B5240 70%, #C8EAE0 100%)' }} aria-hidden="true" />
                {STEPS.map((s, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center px-5" style={{ zIndex: 1 }}>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-bold text-white mb-5 flex-shrink-0" style={{ background: '#0B5240', boxShadow: '0 0 0 4px #EEF7F2, 0 0 0 5px #C8EAE0' }}>
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
                <div key={i} className="flex gap-4" style={{ paddingBottom: i < STEPS.length - 1 ? '20px' : '0' }}>
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-bold text-white" style={{ background: '#0B5240' }}>{s.n}</div>
                    {i < STEPS.length - 1 && <div className="flex-1 w-px mt-2" style={{ minHeight: '20px', background: 'linear-gradient(180deg, #0B5240 0%, #C8EAE0 100%)' }} aria-hidden="true" />}
                  </div>
                  <div style={{ paddingTop: '3px' }}>
                    <p className="text-[13.5px] font-semibold text-ink" style={{ letterSpacing: '-0.01em', marginBottom: '4px' }}>{s.title}</p>
                    <p className="text-[12.5px] font-light text-muted leading-[1.75]">{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-10 reveal delay-2">
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ height: '52px', padding: '0 28px', fontSize: '14.5px', maxWidth: '300px', width: '100%' }}>
              スーパーを申請する →
            </a>
          </div>
        </div>
      </section>

      {/* ── ELIGIBILITY + WHAT YOU NEED ───────────────────────────────────── */}
      <section className="py-10 lg:py-16 bg-white">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <div className="reveal">
              <span className="section-label center lg:text-left">対象者</span>
              <h2 className="font-serif font-black text-ink mx-auto lg:mx-0 text-center lg:text-left" style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.2, letterSpacing: '-0.02em', maxWidth: '26ch', marginTop: '8px', marginBottom: '20px', textWrap: 'balance' }}>
                スーパー申請の条件<br />
                <em className="not-italic font-normal text-forest-400">オーストラリアを離れた方</em>
              </h2>
              <div className="space-y-0">
                {[
                  { label: 'ビザが失効または取り消し済み', body: 'オーストラリアを離れたらすぐに申請できます。待機期間はありません。' },
                  { label: '有効なオーストラリアのビザがない',   body: 'オーストラリアで別の有効なビザを保持していないこと。' },
                  { label: 'スーパー積立がある',           body: '雇用主が実際にスーパーを積み立てていることを確認してください。' },
                ].map((item, i) => (
                  <div key={i} style={{ paddingTop: '14px', paddingBottom: '14px', borderTop: '1px solid #EDF4F0' }}>
                    <div className="flex items-start gap-2 mb-1">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="flex-shrink-0 mt-0.5">
                        <circle cx="8" cy="8" r="7.5" fill="#EAF6F1" stroke="#C8EAE0" strokeWidth="0.5"/>
                        <path d="M5 8l2.5 2.5 4-4" stroke="#0B5240" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <p className="text-[13.5px] font-semibold text-ink" style={{ letterSpacing: '-0.01em' }}>{item.label}</p>
                    </div>
                    <p className="text-[12.5px] font-light text-muted leading-[1.75]" style={{ paddingLeft: '22px' }}>{item.body}</p>
                  </div>
                ))}
                <div style={{ borderTop: '1px solid #E2EFE9' }} />
              </div>
            </div>

            <div className="reveal delay-1 text-center lg:text-left">
              <span className="section-label center lg:text-left">必要なもの</span>
              <h2 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.2, letterSpacing: '-0.02em', maxWidth: '24ch', marginTop: '8px', marginBottom: '18px', textWrap: 'balance' }}>
                スーパー申請に必要なもの
              </h2>
              <div className="space-y-3.5 mb-5">
                {[
                  'パスポート情報',
                  'TFN（タックスファイルナンバー）',
                  'スーパーファンドの名称と会員番号',
                  'スーパーファンドの口座開設日',
                  '振込先銀行口座情報',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="flex-shrink-0 mt-0.5">
                      <circle cx="8" cy="8" r="7.5" fill="#EAF6F1" stroke="#C8EAE0" strokeWidth="0.5"/>
                      <path d="M5 8l2.5 2.5 4-4" stroke="#0B5240" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <p className="text-[13.5px] font-light text-body leading-[1.75]">{item}</p>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="py-10 lg:py-16" style={{ background: '#F4F9F6' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 lg:gap-10 items-start">

            <div className="text-center">
              <span className="section-label center">よくある質問</span>
              <h2 className="font-serif font-black text-ink"
                style={{ fontSize:'clamp(19px, 2.04vw, 26px)', lineHeight:1.2, letterSpacing:'-0.02em', marginTop:'10px', marginBottom:'12px' }}>
                スーパーに関するご質問
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
        heading="メディケアの対象ですか？"
        body="出身国によっては、メディケアの対象となるか、メディケア税の免除を受けられる可能性があります。"
        cta="メディケア対象を確認する →"
        href="/ja/medicare"
      />
    </>
  )
}
