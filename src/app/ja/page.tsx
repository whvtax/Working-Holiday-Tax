import type { Metadata } from 'next'
import Link from 'next/link'
import { WA_URL, SITE_URL, AGENT_NAME } from '@/lib/constants'
import { CtaBand } from '@/components/ui/CtaBand'

// ─── METADATA - rich SEO + AI optimized for Japanese market ─────────────
export const metadata: Metadata = {
  title: 'ワーキングホリデー オーストラリア 税金・スーパー・TFN 専門',
  description:
    'オーストラリアのワーキングホリデー（417・462ビザ）専門の登録税理士。TFN申請、確定申告、スーパー受取（DASP）、ABN登録、すべてオンラインで完結します。',
  keywords: [
    'ワーキングホリデー オーストラリア 税金',
    'ワーホリ 税金 オーストラリア',
    'オーストラリア 確定申告 ワーホリ',
    'TFN 申請 オーストラリア',
    'ABN 登録 ワーホリ',
    'スーパーアニュエーション 受取',
    'DASP 申請',
    '417ビザ 税金',
    '462ビザ 税金',
    'オーストラリア 税金 還付',
    'ワーホリ 税金 戻る',
    'バックパッカー 税金 オーストラリア',
    'オーストラリア 税理士 日本語',
    'メディケア レビー 免除',
    'ワーホリ 帰国後 税金',
    'オーストラリア ワーホリ 確定申告 やり方',
  ],
  alternates: {
    canonical: `${SITE_URL}/ja`,
    languages: {
      'en-AU': SITE_URL,
      'de': `${SITE_URL}/de`,
      'ja': `${SITE_URL}/ja`,
      'x-default': SITE_URL,
    },
  },
}

// ─── ICONS - relevant per service ───────────────────────────────────────
const IconTFN     = () => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><rect x="2" y="2" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.4"/><line x1="6" y1="7.5" x2="14" y2="7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/><line x1="6" y1="10.5" x2="11" y2="10.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/><line x1="6" y1="13.5" x2="9" y2="13.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>)
const IconABN     = () => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M3 8l7-5 7 5v9a1 1 0 01-1 1H4a1 1 0 01-1-1V8z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/><path d="M7.5 17v-6h5v6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>)
const IconReturn  = () => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M10 2v12M6 10l4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/><path d="M3 16v1a1 1 0 001 1h12a1 1 0 001-1v-1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>)
const IconSuper   = () => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.4"/><path d="M10 5.5v4l2.5 1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>)
const IconMedicare = () => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M10 17.5s-6-3.5-6-8.5a3 3 0 016-2 3 3 0 016 2c0 5-6 8.5-6 8.5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/><line x1="10" y1="7" x2="10" y2="12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/><line x1="7.5" y1="9.5" x2="12.5" y2="9.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>)
const IconStar    = () => (<svg width="13" height="13" viewBox="0 0 12 12" aria-hidden="true"><path d="M6 1l1.35 2.73L10.5 4.2l-2.25 2.2.53 3.1L6 8.03 3.22 9.5l.53-3.1L1.5 4.2l3.15-.47z" fill="#E9A020"/></svg>)
const CheckIcon   = () => (<svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true"><circle cx="6.5" cy="6.5" r="6" fill="#EAF6F1" stroke="#C8EAE0" strokeWidth="0.5"/><path d="M3.5 6.5l2 2 3.5-3.5" stroke="#0B5240" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>)

// ─── TESTIMONIALS - backpacker reviews ─────────────────────────────────
const TESTIMONIALS = [
  { name: '佐藤 健太',  from: '日本 · WHV 417',     quote: '何から始めればいいか分からなかったのですが、丁寧に説明してくれて、知らなかった還付金まで取り戻してくれました。',          amount: '$4,100', initials: 'K' },
  { name: 'Anna Larsen',   from: 'ノルウェー · WHV 417', quote: 'TFNと確定申告をすぐに対応してくれました。何も心配する必要がありませんでした。',                                    amount: '$2,450', initials: 'A' },
  { name: "Liam O'Connor", from: 'アイルランド · WHV 417', quote: '雇い主が何社もあって、どうしたらいいか分かりませんでした。すべて代行してくれて、本当に楽でした。',                amount: '$3,200', initials: 'L' },
]

const STEPS = [
  { n: '1', title: '状況を教えてください',         body: 'TFN、ABN、確定申告、スーパー、何が必要か最初からご案内します。' },
  { n: '2', title: '必要な情報を送るだけ',         body: '簡単なチェックリストのみ。複雑な書類は不要です。' },
  { n: '3', title: 'すべてお任せください',         body: '書類作成から申請まで、最後まで代行します。' },
  { n: '4', title: 'お金が戻ってきます',           body: '還付金は直接あなたの口座に振り込まれます。' },
]

const SERVICES = [
  { n: '01', href: '/ja/tfn',            icon: <IconTFN />,      title: 'TFN申請',         desc: '初日から正しい税率で働くために必要なタックスファイルナンバーを取得します。' },
  { n: '02', href: '/ja/abn',            icon: <IconABN />,      title: 'ABN登録',         desc: '個人事業主として働き、正しく請求書を発行するためのABNを登録します。' },
  { n: '03', href: '/ja/tax-return',     icon: <IconReturn />,   title: '確定申告',         desc: '年次確定申告を提出し、受け取るべき最大の還付金を確実に取得します。' },
  { n: '04', href: '/ja/superannuation', icon: <IconSuper />,    title: 'スーパー受取',     desc: 'オーストラリアを離れる際、積み立てたスーパーを受け取ります（DASP）。' },
  { n: '05', href: '/ja/medicare',       icon: <IconMedicare />, title: 'メディケア免除',   desc: '対象外の場合、メディケア・レビー免除を申請します。' },
]

const FAQS = [
  {
    question: 'サービスの料金はいくらですか？',
    answer: '初回相談とお見積もりは無料です。料金はサービスごとに定額制で、確定申告の場合は還付金から差し引くこともできます。事前のお支払いは不要です。作業を始める前に必ず料金をご確認いただきます。',
  },
  {
    question: '返信はどのくらいで来ますか？',
    answer: '営業時間内（月〜金、9時〜18時 AEST）は通常1時間以内にご返信します。営業時間外のお問い合わせには、翌朝一番にご対応いたします。',
  },
  {
    question: '帰国後でも対応してもらえますか？',
    answer: 'はい。すでにオーストラリアを離れたワーキングホリデーメーカーの方の確定申告やスーパー受取（DASP）にも対応しています。すべてオンラインで完結し、還付金はオーストラリアまたは海外の口座にお振込みできます。',
  },
  {
    question: 'ワーキングホリデーメーカーの税率はいくらですか？',
    answer: 'ワーキングホリデーメーカーは、年収45,000ドルまでは一律15%、45,001〜135,000ドルは30%、135,001〜190,000ドルは37%、190,001ドル以上は45%の税率が適用されます。基礎控除（タックスフリーのしきい値）はありません。雇用主にTFNを提供しない場合、45%の源泉徴収となります。',
  },
  {
    question: '確定申告だけのサービスですか？',
    answer: 'いいえ。TFN申請、ABN登録、確定申告、スーパー受取（DASP）、メディケア・レビー免除まで、ワーキングホリデーメーカーに必要なすべてのサービスをご提供しています。',
  },
]

export default function JapaneseHomePage() {

  // ─── Schema.org for Japanese page ───
  const webPageLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}/ja/#webpage`,
    url: `${SITE_URL}/ja`,
    name: 'ワーキングホリデー オーストラリア 税金・スーパー・TFN 専門',
    description: 'オーストラリアのワーキングホリデー専門の登録税理士。TFN、確定申告、スーパー、ABNまで、すべてお任せください。',
    inLanguage: 'ja',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#business` },
  }

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_URL}/ja/#service`,
    name: 'ワーキングホリデー向け税務サービス（オーストラリア）',
    description: 'オーストラリアのワーキングホリデービザ保持者向け税務サービス。',
    provider: { '@id': `${SITE_URL}/#business` },
    areaServed: 'AU',
    inLanguage: 'ja',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '300',
      bestRating: '5',
      worstRating: '1',
    },
  }

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: 'ja',
    mainEntity: FAQS.map(f => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-[68px] bg-white">
        <div className="max-w-5xl mx-auto px-5 md:px-8 lg:px-10 pt-12 pb-10 lg:pt-14 lg:pb-12 text-center">

          <div className="inline-flex items-center gap-2 mb-4 lg:mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-forest-500 animate-pulse-dot" aria-hidden="true" />
            <span className="font-medium uppercase" style={{ fontSize: '10px', letterSpacing: '0.18em', color: 'rgba(11,82,64,0.65)' }}>ワーキングホリデービザ専門</span>
          </div>

          <h1 className="font-serif font-black text-ink mx-auto"
            style={{ fontSize: 'clamp(22px, 5vw, 42px)', lineHeight: 1.15, letterSpacing: '-0.025em', marginBottom: '14px' }}>
            <span style={{ display: 'block' }}>オーストラリアの税金で迷っていますか？</span>
            <span style={{ display: 'block', color: '#0B5240' }}>すべてお任せください。</span>
          </h1>

          <p className="font-light mx-auto"
            style={{ fontSize: '16px', lineHeight: 1.7, color: 'rgba(10,15,13,0.55)', maxWidth: '34ch', marginBottom: '10px' }}>
            TFN・ABN・確定申告・スーパー。<br />すべて私たちが代行します。
          </p>

          <div style={{ marginTop: '24px', marginBottom: '16px' }} className="lg:mt-8 lg:mb-4">
            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              className="btn-primary inline-flex"
              style={{ height: '52px', padding: '0 36px', fontSize: '15px', borderRadius: '100px', maxWidth: '320px', width: '100%', marginLeft: 'auto', marginRight: 'auto' }}>
              確定申告を始める →
            </a>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-2 lg:flex lg:flex-row lg:flex-nowrap lg:justify-center lg:items-center lg:gap-y-0 lg:gap-x-7 mx-auto">
            {['1,200名以上をサポート', '4.9★（300件以上のレビュー）', '45カ国以上に対応', '返信時間 1時間以内'].map((label, i) => (
              <span key={i} className="inline-flex items-center gap-1.5 whitespace-nowrap"
                style={{ fontSize: '12px', color: 'rgba(10,15,13,0.5)' }}>
                <CheckIcon />{label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY US ───────────────────────────────────────────────────────── */}
      <section className="py-12 lg:py-24" style={{ background: '#F5F9F7' }}>
        <div className="max-w-5xl mx-auto px-5 md:px-8 lg:px-10 text-center">

          <span className="section-label center">選ばれる理由</span>

          <h2 className="font-serif font-black text-ink mx-auto"
            style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.12, letterSpacing: '-0.025em', maxWidth: '24ch', marginTop: '10px', marginBottom: '10px' }}>
            ワーキングホリデー専門だからできること。
          </h2>

          <p className="font-light text-muted mx-auto"
            style={{ fontSize: 'clamp(14px, 1.5vw, 16px)', lineHeight: 1.7, maxWidth: '36ch', marginBottom: '32px', textAlign: 'center' }}>
            私たちのゴールはひとつ。<br />あなたの還付金を最大化すること。
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-10" style={{ marginBottom: '36px' }}>
            {[
              { title: 'ワーホリ税務の専門家。',     body: 'ワーキングホリデーの税務だけを扱っているので、最大限の還付金を取り戻す方法を熟知しています。' },
              { title: 'ATO登録税理士。',           body: 'ATO（オーストラリア国税局）のルールに完全準拠し、登録税理士が監督します。' },
              { title: 'わかりやすいサポート。',     body: '専門用語を使わず、ステップごとに丁寧にご案内します。' },
              { title: 'すべて代行します。',         body: '書類もストレスも不要。最初から最後まで、すべてお任せください。' },
            ].map((item, i) => (
              <div key={i} className="pt-4 lg:pt-6 text-center" style={{ borderTop: '1px solid #E2EFE9' }}>
                <h3 className="font-semibold text-ink" style={{ fontSize: 'clamp(13px, 1.2vw, 13.5px)', marginBottom: '6px', lineHeight: 1.35 }}>{item.title}</h3>
                <p className="font-light text-muted leading-[1.7]" style={{ fontSize: 'clamp(12px, 1.1vw, 13px)' }}>{item.body}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '8px' }} className="lg:mt-4">
            <Link href="#how-it-works" className="btn-ghost-dark inline-flex" style={{ height: '44px', padding: '0 24px', fontSize: '13.5px' }}>
              確定申告を始める →
            </Link>
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF ─────────────────────────────────────────────────── */}
      <section className="py-12 lg:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-5 md:px-8 lg:px-10">

          <div className="text-center" style={{ marginBottom: '28px' }}>
            <span className="section-label center">お客様の声</span>
            <h2 className="font-serif font-black text-ink mx-auto"
              style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em', marginTop: '10px', maxWidth: '26ch' }}>
              ワーホリの皆さんが受け取った還付金。
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl flex flex-col"
                style={{ padding: '18px', boxShadow: '0 1px 4px rgba(0,0,0,.04), 0 4px 20px rgba(11,82,64,.06)' }}>
                <div className="flex gap-0.5" style={{ marginBottom: '10px' }}>
                  {Array.from({ length: 5 }).map((_, si) => <IconStar key={si} />)}
                </div>
                <p className="font-light text-body flex-1 line-clamp-3 lg:line-clamp-none"
                  style={{ fontSize: '13px', lineHeight: 1.7, marginBottom: '12px' }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center justify-between" style={{ paddingTop: '10px', borderTop: '1px solid #E2EFE9' }}>
                  <div className="flex items-center gap-2">
                    <div className="rounded-full flex items-center justify-center font-bold flex-shrink-0"
                      style={{ width: '30px', height: '30px', fontSize: '11px', background: '#EAF6F1', color: '#0B5240' }}>{t.initials}</div>
                    <div>
                      <p className="font-semibold text-ink" style={{ fontSize: '12px', lineHeight: 1.2 }}>{t.name}</p>
                      <p className="text-subtle" style={{ fontSize: '10.5px', marginTop: '1px' }}>{t.from}</p>
                    </div>
                  </div>
                  <span className="font-serif font-black text-forest-500 flex-shrink-0"
                    style={{ fontSize: 'clamp(18px, 2vw, 22px)', letterSpacing: '-0.03em' }}>{t.amount}</span>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '28px', paddingTop: '24px', borderTop: '1px solid #E2EFE9' }}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 lg:gap-8">
              {[
                { n: '4.9★',    l: '300件以上のレビュー' },
                { n: '1,200+',  l: 'サポート実績' },
                { n: '< 1時間', l: '返信時間' },
                { n: '100%',    l: 'すべてオンライン、書類不要' },
              ].map((s, i) => (
                <div key={i} className="text-center py-2 lg:py-3">
                  <p className="font-serif font-black text-forest-500"
                    style={{ fontSize: 'clamp(18px, 2.8vw, 28px)', letterSpacing: '-0.03em', lineHeight: 1 }}>{s.n}</p>
                  <p className="text-subtle"
                    style={{ fontSize: 'clamp(11px, 1.1vw, 12.5px)', marginTop: '5px', lineHeight: 1.4 }}>{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-12 lg:py-24" style={{ background: '#F4F9F6' }}>
        <div className="max-w-5xl mx-auto px-5 md:px-8 lg:px-10">

          <div className="text-center" style={{ marginBottom: '36px' }}>
            <span className="section-label center">ご利用の流れ</span>
            <h2 className="font-serif font-black text-ink mx-auto"
              style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em', marginTop: '10px', marginBottom: '10px', maxWidth: '26ch' }}>
              4ステップで還付金を受け取れます
            </h2>
            <p className="font-light text-muted mx-auto"
              style={{ fontSize: 'clamp(14px, 1.4vw, 16px)', lineHeight: 1.7, maxWidth: '34ch', marginBottom: '4px' }}>
              <em className="not-italic text-forest-400">シンプルな手続きで、最大の還付金を。</em>
            </p>
          </div>

          {/* Desktop 4-step horizontal */}
          <div className="hidden lg:block" style={{ marginBottom: '56px' }}>
            <div className="relative flex items-start">
              <div className="absolute left-[calc(12.5%)] right-[calc(12.5%)] top-5 h-[2px]"
                style={{ background: 'linear-gradient(90deg, #C8EAE0 0%, #0B5240 25%, #0B5240 75%, #C8EAE0 100%)' }}
                aria-hidden="true" />
              {STEPS.map((s, i) => (
                <div key={i} className="flex-1 flex flex-col items-center px-4" style={{ zIndex: 1 }}>
                  <div className="rounded-full flex items-center justify-center font-bold text-white flex-shrink-0"
                    style={{ width: '40px', height: '40px', background: '#0B5240', fontSize: '15px', marginBottom: '20px', boxShadow: '0 0 0 5px #fff, 0 0 0 6px #C8EAE0' }}>
                    {s.n}
                  </div>
                  <p className="font-semibold text-ink text-center"
                    style={{ fontSize: '14px', marginBottom: '8px', lineHeight: 1.3 }}>{s.title}</p>
                  <p className="font-light text-muted text-center"
                    style={{ fontSize: '12.5px', lineHeight: 1.7 }}>{s.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile vertical */}
          <div className="lg:hidden flex flex-col" style={{ marginBottom: '32px' }}>
            {STEPS.map((s, i) => (
              <div key={i} className="flex gap-4" style={{ paddingBottom: i < STEPS.length - 1 ? '24px' : '0' }}>
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="rounded-full flex items-center justify-center font-bold text-white"
                    style={{ width: '30px', height: '30px', background: '#0B5240', fontSize: '13px', flexShrink: 0 }}>
                    {s.n}
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className="flex-1 w-px mt-2"
                      style={{ minHeight: '22px', background: 'linear-gradient(180deg, #0B5240 0%, #C8EAE0 100%)' }}
                      aria-hidden="true" />
                  )}
                </div>
                <div style={{ paddingTop: '3px' }}>
                  <p className="font-semibold text-ink" style={{ fontSize: '14px', marginBottom: '4px' }}>{s.title}</p>
                  <p className="font-light text-muted" style={{ fontSize: '13px', lineHeight: 1.7 }}>{s.body}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center" style={{ marginTop: '8px' }}>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              className="btn-primary inline-flex"
              style={{ height: '52px', padding: '0 36px', fontSize: '15px', maxWidth: '320px', width: '100%', marginLeft: 'auto', marginRight: 'auto' }}>
              確定申告を始める →
            </a>
            <p style={{ marginTop: '10px', fontSize: '12px', color: '#2FA880' }}>
              無料相談&nbsp;&bull;&nbsp;事前のお支払い不要&nbsp;&bull;&nbsp;親身なサポート
            </p>
          </div>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────────────────────── */}
      <section className="py-12 lg:py-24" style={{ background: '#EEF7F2' }}>
        <div className="max-w-5xl mx-auto px-5 md:px-8 lg:px-10">

          <div className="text-center" style={{ marginBottom: '28px' }}>
            <span className="section-label center">サービス一覧</span>
            <h2 className="font-serif font-black text-ink mx-auto"
              style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em', marginTop: '10px', marginBottom: '10px', maxWidth: '26ch' }}>
              ワーキングホリデーの税務をトータルサポート<br />
              <em className="not-italic font-normal text-forest-400">オーストラリアで。</em>
            </h2>
            <p className="font-light text-muted mx-auto"
              style={{ fontSize: 'clamp(13px, 1.3vw, 15px)', textAlign: 'center', lineHeight: 1.7, maxWidth: '40ch' }}>
              最初の仕事から最後の還付金まで。<br />すべて私たちにお任せください。
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-4">
            {SERVICES.map((s) => (
              <Link key={s.href} href={s.href}
                className="group bg-white rounded-2xl flex flex-col transition-all hover:shadow-lg"
                style={{ padding: '18px', boxShadow: '0 1px 3px rgba(0,0,0,.04), 0 2px 12px rgba(11,82,64,.06)' }}>
                <span className="font-medium uppercase text-subtle" style={{ fontSize: '10px', letterSpacing: '0.1em', marginBottom: '10px' }}>{s.n}</span>
                <span className="w-8 h-8 rounded-lg flex items-center justify-center text-forest-500 bg-forest-50 transition-all group-hover:bg-forest-500 group-hover:text-white flex-shrink-0"
                  style={{ marginBottom: '10px' }}>{s.icon}</span>
                <h3 className="font-semibold text-ink service-card-title" style={{ fontSize: '13.5px', marginBottom: '5px' }}>{s.title}</h3>
                <p className="font-light text-muted leading-[1.65] flex-1" style={{ fontSize: '12px', marginBottom: '12px' }}>{s.desc}</p>
                <span className="flex items-center gap-1.5 font-medium text-forest-600 transition-all group-hover:gap-3" style={{ fontSize: '12px' }}>
                  詳しく見る →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="py-12 lg:py-20 bg-white">
        <div className="max-w-[820px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="text-center mb-8">
            <span className="section-label center">よくあるご質問</span>
            <h2 className="font-serif font-black text-ink mx-auto"
              style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em', marginTop: '10px' }}>
              すぐにわかる答え
            </h2>
          </div>

          <div className="flex flex-col" style={{ gap: '4px' }}>
            {FAQS.map((f, i) => (
              <details key={i} name="ja-home-faq" className="contact-faq-item">
                <summary className="contact-faq-summary">
                  <span style={{ flex: 1 }}>{f.question}</span>
                  <span className="contact-faq-plus" aria-hidden="true">+</span>
                </summary>
                <p className="contact-faq-answer">{f.answer}</p>
              </details>
            ))}
          </div>

          <p className="text-center" style={{ marginTop: '28px', fontSize: '14px', color: '#587066' }}>
            その他のご質問は <Link href="/ja/contact" style={{ color: '#0B5240', fontWeight: 600, textDecoration: 'underline' }}>こちらからお問い合わせください</Link>
          </p>
        </div>
      </section>

      <CtaBand
        eyebrow="今すぐ始める"
        heading="オーストラリアの税金、"
        headingEm="海外からでも対応します。"
        sub={<>TFN、確定申告、スーパー、ABNまで<span className="hidden sm:inline">、</span><br className="sm:hidden" />すべてワンストップで対応します。</>}
        primaryLabel="確定申告を始める"
        trustLine=""
        clipTop
      />
    </>
  )
}
