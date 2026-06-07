import type { Metadata } from 'next'
import { GoogleRating } from '@/components/ui/GoogleRating'
import { GoogleReviews } from '@/components/ui/GoogleReviews'
import Link from 'next/link'
import { WA_URL, SITE_URL } from '@/lib/constants'
import { NextStep } from '@/components/ui/NextStep'
import { Accordion } from '@/components/ui/Accordion'

export const metadata: Metadata = {
  title: 'スーパー受取（DASP） - ワーキングホリデー オーストラリア',
  description: 'オーストラリアを離れた後、積み立てたスーパーアニュエーションを返金として受け取り。給与の12%がスーパーに積み立てられています。DASP申請を完全代行します。',
  keywords: [
    // Refund-focused
    'スーパー 返金 オーストラリア',
    'スーパーアニュエーション 返金',
    'スーパーアニュエーション 返金 ワーホリ',
    'スーパー 返金 ワーホリ',
    'DASP 還付',
    'DASP 返金',
    'DASP 申請',
    'DASP 申請 日本',
    'ワーキングホリデー スーパー 返金',
    'スーパー 取り戻す オーストラリア',
    'オーストラリア スーパー 返金 帰国後',
    'スーパー 帰国後 返金',
    'スーパーアニュエーション 帰国後',
    '417ビザ スーパー 返金',
    '462ビザ スーパー 返金',
    'バックパッカー スーパー 返金',
    'スーパー 還付 ワーキングホリデー',
    // Adjacent
    'DASP スーパー 受取',
    'Departing Australia Superannuation Payment 日本語',
    'オーストラリア 帰国 スーパー',
    'スーパー 受取 417ビザ',
    'スーパー 受取 462ビザ',
    'WHM スーパーアニュエーション 申請',
    'オーストラリア 年金 返金',
    'スーパー受取 申請方法',
    'スーパー いくら戻る',
    'スーパー 返金 いくら',
    'スーパーアニュエーション 日本の口座',
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
    description: 'オーストラリアのスーパー受取をDASPで受け取り。ワーホリ専門のチームが登録税理士の監督のもとですべて代行します。',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'スーパー受取（DASP） - ワーキングホリデー オーストラリア',
    description: 'オーストラリアを離れる際、スーパーを返金として受け取り。',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

const faqs = [
  {
    question: '数年前にオーストラリアを離れました。今からでもDASPを申請できますか？',
    answer: 'はい、スーパーアニュエーション返金（DASP）の申請に明確な期限はありません。何年経っていても申請可能です。残高がスーパーファンドからATOへ移管されていても、そこから取り戻せます。当社が世界中どこからでも代理申請いたします。',
  },
  {
    question: '複数の雇用主で働きました。スーパー口座は複数ありますか？',
    answer: 'はい、複数の雇用主で働いた場合、それぞれが異なるスーパーファンドに積み立てている可能性があります。当社が代理ですべての口座を特定し、統合してから一括でDASP申請を行うため、漏れなくスーパー全額を取り戻せます。',
  },
  {
    question: 'DASP申請から振込までどのくらいかかりますか？',
    answer: '申請が承認されてから通常2〜4週間以内にお支払いされます。スーパーファンドからご指定の銀行口座（オーストラリアまたは日本）に直接振り込まれます。当社で申請進捗をモニタリングし、ご連絡いたします。',
  },
  {
    question: 'スーパーは日本の口座にも振り込めますか？',
    answer: 'はい、ご指定の銀行口座（オーストラリアまたは日本を含む海外口座）に直接振り込まれます。すでに日本に帰国された方も、日本の銀行口座で問題なく受け取れます。',
  },
  {
    question: '日本に帰国後でもスーパー受取（DASP）は申請できますか？',
    answer: 'はい、日本に帰国された後でも世界中どこからでも申請できます。当社が日本語ですべての手続きを代行し、スーパー受取は直接日本の銀行口座に振り込むことが可能です。何年経っていても申請可能です。',
  },
  {
    question: 'DASPスーパー受取には税金がかかりますか？',
    answer: 'はい、DASPの支払いには、ATOが定めた固定税率で課税され、振込前に源泉徴収されます。お受け取りになるのはこの税引き後の純額です。具体的な税率はビザの種類や支払われるスーパーの種類によって異なります。',
  }
]

const STEPS = [
  { n: '1', title: 'ご相談・お問い合わせ',  body: 'ビザの種類と勤務履歴を日本語でお知らせください。ご相談は無料です。' },
  { n: '2', title: '書類のご送付',          body: 'パスポート、TFN、スーパーファンド情報をお送りいただきます。' },
  { n: '3', title: 'DASP代理申請',          body: '当社がスーパーファンドとATOへ代理申請。65%課税後の純額を計算します。' },
  { n: '4', title: 'お振込でお受け取り',    body: '通常28日以内に、ご指定の口座（豪・日本どちらも可）にお振込みされます。' },
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

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'スーパー受取（DASP）の申請方法',
  description: 'オーストラリアを離れた後、積み立てたスーパーアニュエーションをDASP（Departing Australia Superannuation Payment）で受け取る手順。登録税理士の監督のもとで日本語で代行します。',
  inLanguage: 'ja',
  totalTime: 'P28D',
  estimatedCost: { '@type': 'MonetaryAmount', currency: 'AUD', value: '0' },
  supply: [
    { '@type': 'HowToSupply', name: 'パスポート' },
    { '@type': 'HowToSupply', name: 'TFN（タックスファイルナンバー）' },
    { '@type': 'HowToSupply', name: 'スーパーファンドの会員番号' },
    { '@type': 'HowToSupply', name: '銀行口座情報（豪・日本のどちらでも可）' },
  ],
  step: STEPS.map((s, i) => ({
    '@type': 'HowToStep',
    position: i + 1,
    name: s.title,
    text: s.body,
    url: `${SITE_URL}/ja/superannuation#step-${i + 1}`,
  })),
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${SITE_URL}/ja/superannuation#service`,
  name: 'スーパー受取（DASP）代行サービス',
  serviceType: 'Departing Australia Superannuation Payment申請',
  description: 'オーストラリアのワーキングホリデーメーカー向けスーパー受取（DASP）代行。複数のスーパーファンド特定からATOへの申請、海外口座への振込まで完全対応。',
  provider: { '@id': `${SITE_URL}/#business` },
  areaServed: { '@type': 'Country', name: 'Australia' },
  audience: { '@type': 'Audience', audienceType: 'Working Holiday Maker (Subclass 417/462) - 帰国予定者・帰国済み' },
  inLanguage: 'ja',
}

export default function JapaneseSuperannuationPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-[68px]" style={{background:'linear-gradient(160deg,#fff 0%,#F7FBF9 100%)'}}>
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
              <span style={{ display:'block' }}>スーパー受取（DASP）で</span>
              <span style={{ display:'block', color:'#0B5240' }}>積み立てたお金を取り戻す。</span>
            </h1>

            <p className="font-semibold text-ink"
              style={{ fontSize:'clamp(14px,1.5vw,17px)', letterSpacing:'-0.01em', marginBottom:'8px', lineHeight:1.5 }}>
              DASP（Departing Australia Superannuation Payment）をすべて代行いたします。
            </p>

            <p className="font-light"
              style={{
                fontSize:'clamp(13px,1.2vw,15px)',
                lineHeight:1.75,
                color:'rgba(10,15,13,0.58)',
                maxWidth:'44ch',
                marginBottom:'0',
              }}>
              通常28日以内に振込完了。日本帰国後の申請も日本語で完全サポートします。
            </p>

            <div className="hero-cta-pair flex flex-col gap-3 lg:flex-row lg:gap-4"
              style={{ marginTop:'24px', marginBottom:'20px', maxWidth:'480px' }}>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                className="btn-primary inline-flex justify-center"
                style={{ height:'54px', padding:'0 36px', fontSize:'15px', borderRadius:'100px', flex:'1', width:'100%' }}>
                スーパー受取を依頼する →
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
                <strong>スーパーアニュエーション</strong>（通称「スーパー」）は、オーストラリアの強制積立年金制度です。法律により、雇用主は給与とは別に<strong>給与の12%</strong>をスーパーファンドに積み立てる義務があります。つまり、給与明細に書かれている金額に加えて、見えないところで12%が積み立てられているのです。
              </p>
              <p className="super-intro-body">
                ワーキングホリデーメーカーは、オーストラリアを永久に離れる際に、積み立てられたスーパーを返金として受け取れます。この制度を<strong>DASP（Departing Australia Superannuation Payment）</strong>と呼びます。
              </p>
              <p className="super-intro-body">
                受取時には65%のDASP税が課されますが、税引後の純額（35%）でも、ワーホリのほとんどが<strong>$2,000〜$5,000</strong>を受け取っています。1年間フルタイムで働いた場合は、それ以上になることもあります。
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
              <h3 className="service-cta-heading">DASP申請を当社が代行いたします</h3>
              <p className="service-cta-sub">複数のスーパーファンドの特定からATOへの申請、海外口座への振込まで。日本帰国後の手続きも日本語で完全サポート。お金を取り残さないようお手伝いします。</p>
            </div>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="service-cta-button">
              スーパー受取を依頼する →
            </a>
          </div>
        </div>
      </section>

      {/* ── CLARITY - THIS IS YOUR MONEY ──────────────────────────────────── */}
      <section className="py-10 lg:py-16" style={{ background: '#F5F9F7' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-xl mx-auto text-center reveal" style={{ marginBottom: '32px' }}>
            <span className="section-label center">当社のサービス</span>
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.2, letterSpacing: '-0.02em', maxWidth: '26ch', marginTop: '8px', marginBottom: '0', textWrap: 'balance' }}>
              スーパーはあなたの財産。申請するだけで取り戻せます
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 mb-8 lg:mb-10 reveal delay-1">
            {[
              {
                icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true"><circle cx="9.5" cy="9.5" r="6.5" stroke="currentColor" strokeWidth="1.4"/><path d="M14.3 14.3L19 19" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>,
                title: '複数のスーパー口座をすべて特定',
                body: '複数の職場で働くと口座も複数に。すべて見つけ出し、取りこぼしを防ぎます。',
              },
              {
                icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="8.5" stroke="currentColor" strokeWidth="1.4"/><path d="M2.5 11h17M11 2.5c2.4 2.6 2.4 13.4 0 17M11 2.5c-2.4 2.6-2.4 13.4 0 17" stroke="currentColor" strokeWidth="1.2"/></svg>,
                title: '帰国後でも申請可能',
                body: 'DASPはすべてオンラインで申請し、海外の口座へお振込み。帰国から数年後でも対応します。',
              },
              {
                icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true"><path d="M11 2.5l7 2.5v5c0 4.5-3 7.6-7 9-4-1.4-7-4.5-7-9v-5l7-2.5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/><path d="M8 11l2 2 4-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>,
                title: 'あなたのお金、ATOのものではありません',
                body: '未申請のスーパーはいずれATOに移管されます。きちんとあなたの元へ戻します。',
              },
              {
                icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true"><rect x="4" y="3" width="14" height="16" rx="2" stroke="currentColor" strokeWidth="1.4"/><path d="M7.5 8.5h7M7.5 12h4.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>,
                title: 'DASP申請と税務までフルサポート',
                body: '出国時スーパー受取（DASP）の申請を準備し、源泉徴収税も正しく処理します。',
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
            <span className="section-label center">お客様の声</span>
            <h2 className="font-serif font-black text-ink mt-2" style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
              ワーホリの皆さんが取り戻したスーパー
            </h2>
          </div>
          <GoogleReviews lang="ja" />
        </div>
      </section>



      {/* ── COMPARISON ── */}
      <section className="py-12 lg:py-20" style={{ background:'#F5F9F7' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 reveal">
          <div className="max-w-xl mx-auto text-center mb-8 lg:mb-12">
            <span className="section-label center">かんたんな方法</span>
            <h2 className="font-serif font-black text-ink mx-auto"
              style={{ fontSize:'clamp(19px, 2.04vw, 26px)', lineHeight:1.1, letterSpacing:'-0.025em', marginTop:'10px' }}>
              スーパー受取には、もっと簡単な方法があります
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6 max-w-3xl lg:max-w-4xl mx-auto" style={{ alignItems:'stretch' }}>
            <div className="rounded-2xl" style={{ padding:'22px', background:'#fff', border:'1.5px solid #E2EFE9' }}>
              <p className="font-semibold text-muted" style={{ fontSize:'11px', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:'18px' }}>
                自分でスーパー（DASP）を申請すると、時間がかかり複雑になりがちです
              </p>
              <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
                {['複数または不明なスーパーファンドの特定','複雑なDASP書類とATOの要件','源泉徴収税の計算ミス','申請が遅れても助けがない'].map((item,i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink:0, marginTop:'3px' }}><circle cx="8" cy="8" r="7.5" fill="#FEF3F0" stroke="#FBD0BB" strokeWidth="0.5"/><path d="M5.5 10.5l5-5M10.5 10.5l-5-5" stroke="#9A3412" strokeWidth="1.3" strokeLinecap="round"/></svg>
                    <p className="font-light text-muted" style={{ fontSize:'clamp(12px, 1.1vw, 13px)', lineHeight:1.75 }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl flex flex-col" style={{ padding:'22px', background:'#EAF6F1', border:'1.5px solid #C8EAE0' }}>
              <p className="font-semibold text-forest-500" style={{ fontSize:'11px', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:'18px' }}>
                当社のサポート付きDASPサービス
              </p>
              <div style={{ display:'flex', flexDirection:'column', gap:'12px', marginBottom:'24px', flex:'1' }}>
                {['すべてのスーパーファンドを当社が特定','DASPを正しく作成・申請','源泉徴収税を正しく処理','入金まで責任を持ってサポート'].map((item,i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink:0, marginTop:'3px' }}><circle cx="8" cy="8" r="7.5" fill="#EAF6F1" stroke="#C8EAE0" strokeWidth="0.5"/><path d="M5 8l2.5 2.5 4-4" stroke="#0B5240" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <p className="font-semibold text-ink" style={{ fontSize:'clamp(12px, 1.1vw, 13px)', lineHeight:1.75 }}>{item}</p>
                  </div>
                ))}
              </div>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex"
                style={{ height:'50px', padding:'0 24px', fontSize:'14px', width:'100%', justifyContent:'center' }}>
                スーパーを申請する →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-10 lg:py-16" style={{ background: '#F5F9F7' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-xl mx-auto text-center reveal" style={{ marginBottom: '48px' }}>
            <span className="section-label center">ご利用の流れ</span>
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.2, letterSpacing: '-0.02em', maxWidth: '22ch', marginTop: '8px', marginBottom: '8px', textWrap: 'balance' }}>
              4ステップでスーパーを取り戻す
            </h2>
            <p className="font-light text-muted" style={{ fontSize: '13.5px' }}>
              ご相談から振込まで、日本語ですべて対応します
            </p>
          </div>

          <div className="reveal delay-1">
            <div className="hidden lg:block">
              <div className="relative flex items-start">
                <div className="absolute left-[calc(12.5%)] right-[calc(12.5%)] top-4 h-[2px]" style={{ background: 'linear-gradient(90deg, #C8EAE0 0%, #0B5240 30%, #0B5240 70%, #C8EAE0 100%)' }} aria-hidden="true" />
                {STEPS.map((s, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center px-5" style={{ zIndex: 1 }}>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-bold text-white mb-5 flex-shrink-0" style={{ background: '#0B5240', boxShadow: '0 0 0 4px #F5F9F7, 0 0 0 5px #C8EAE0' }}>
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

      {/* ── WHAT TO HAVE READY ── */}
      <section className="py-10 lg:py-16 bg-white">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 reveal">
          <div className="max-w-xl mx-auto">
            <div className="text-center mb-6 lg:mb-8">
              <span className="section-label center">必要なもの</span>
              <h2 className="font-serif font-black text-ink mt-2" style={{ fontSize:'clamp(19px, 2.04vw, 26px)', lineHeight:1.15, letterSpacing:'-0.025em' }}>
                ご準備いただくもの
              </h2>
            </div>
            <div className="space-y-0">
              {[{ n:'01', label:'パスポート', hint:'本人確認' }, { n:'02', label:'TFN（税務番号）', hint:'あなたの税務番号' }, { n:'03', label:'スーパーファンド情報', hint:'または当社が特定' }, { n:'04', label:'銀行口座', hint:'受取先（海外口座可）' }].map((item, i) => (
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
                スーパーを申請する →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="py-10 lg:py-16" style={{ background: '#F5F9F7' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 lg:gap-10 items-start">

            <div className="text-center">
              <span className="section-label center">よくあるご質問</span>
              <h2 className="font-serif font-black text-ink"
                style={{ fontSize:'clamp(19px, 2.04vw, 26px)', lineHeight:1.2, letterSpacing:'-0.02em', marginTop:'10px', marginBottom:'12px' }}>
                スーパーに関するご質問
              </h2>
              <p className="font-light text-muted"
                style={{ fontSize:'13.5px', lineHeight:1.75, marginBottom:'24px' }}>
                掲載されていないご質問もお気軽にお問い合わせください。
              </p>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                className="btn-primary inline-flex items-center justify-center"
                style={{ height:'48px', padding:'0 28px', fontSize:'14px', width:'100%', maxWidth:'220px' }}>
                今すぐご相談する →
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
