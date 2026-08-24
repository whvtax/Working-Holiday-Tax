import type { Metadata } from 'next'
import Link from 'next/link'
import { MobileCta } from '@/components/ui/MobileCta'
import { WaLink } from '@/app/HomeWa'
import { waUrl } from '@/lib/wa'
import { WA_NUMBER, EMAIL, SITE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'お問い合わせ：担当者が直接返信します',
  description: 'WhatsAppで送ってください。営業時間内ならだいたい1時間以内に実在のスタッフが返信します。myGovもIDも給与明細も必要ありません。',
  keywords: [
    'Working Holiday Tax 問い合わせ',
    'ワーホリ 税金 相談 日本語',
    'バックパッカー 税金 サポート',
    'ワーキングホリデー 税金 相談',
    'オーストラリア タックスリターン 相談',
    'TFN 申請 サポート 日本語',
    'オーストラリア 税金 還付 相談',
    'スーパーアニュエーション 受取 相談',
    '帰国後 タックスリターン 日本から',
    'WhatsApp ワーホリ 税金 相談',
  ],
  alternates: {
    canonical: `${SITE_URL}/ja/contact`,
    languages: {
      'en-AU': `${SITE_URL}/contact`,
      'de': `${SITE_URL}/de/contact`,
      'ja': `${SITE_URL}/ja/contact`,
      'x-default': `${SITE_URL}/contact`,
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Working Holiday Tax Refund Australia' }],
    title: 'お問い合わせ｜Working Holiday Tax',
    description: 'WhatsAppが一番早い連絡方法です。営業時間内なら、だいたい1時間以内に実在のスタッフが返信します。',
    url: `${SITE_URL}/ja/contact`,
    type: 'website',
    siteName: 'Working Holiday Tax',
    locale: 'ja_JP',
  },
  twitter: {
    images: [`${SITE_URL}/og-image.png`],
    card: 'summary_large_image',
    title: 'お問い合わせ｜Working Holiday Tax',
    description: 'WhatsAppでメッセージを送ってください。だいたい1時間以内に実在のスタッフが返信します。',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' },
  },
}

const WA = waUrl({ topic: 'contact', lang: 'ja' })

/** メッセージを送るのをためらわせている、4つのこと。 */
const blockers: { q: string; a: string; link?: { href: string; label: string } }[] = [
  {
    q: 'すでにオーストラリアを出国していても対応できますか？',
    a: 'はい。むしろ業務の大きな部分がそれです。すでに終わった年度のタックスリターンは世界のどこからでも提出できますし、スーパーアニュエーションは出国してビザが失効した後でなければ請求できません。つまり出国後のほうが、やれることは減るどころか増えることが多いのです。1点だけ先に。ATOはタックスリターンの還付金をオーストラリアの銀行口座にしか支払えませんが、スーパー（DASP）は海外の口座で受け取れます。オーストラリアの口座をすでに解約している場合は、その旨をお知らせください。',
  },
  {
    q: 'myGovのアカウントは必要ですか？',
    a: 'いりません。myGovにログインしたり、オーストラリアのIDを連携したり、どの書類がどれなのかを調べたりする必要は一切ありません。ATOとのやり取りはこちらで行います。すでに試して本人確認のところで止まってしまった方も多いのですが、それによって私たちがお手伝いできるかどうかが変わることはありません。',
  },
  {
    q: '給与明細（ペイスリップ）は必要ですか？',
    a: 'いりません。ご連絡の前に用意していただくものは何もありません。雇用主が源泉徴収して報告した内容はATOを通じて私たちに見えるので、手元に何も残っていなくても、そのままご連絡ください。',
    link: { href: '/ja/about', label: 'ATOの記録から始める理由' },
  },
  {
    q: 'この会社は信用できますか？',
    a: 'ウェブサイトに対して当然の質問だと思います。申告書は、ATOへ提出する前に登録税理士（registered tax agent）が確認して承認します。ご同意いただく契約条件はクライアント規約にすべて掲載していますし、Googleのレビューは実際にお手伝いしたワーホリの方々によるものです。',
    link: { href: '/ja/client-agreement', label: 'クライアント規約を読む' },
  },
]

const FAQS = [
  {
    question: '返信はどのくらいで来ますか？',
    answer: '営業時間内、月曜から金曜の9時から18時（AEST/AEDT）であれば、だいたい1時間以内にご返信します。営業時間外にいただいたご連絡には、翌営業日の朝一番でお返事します。確認が必要な内容であれば、お待たせせずにその旨をすぐお伝えします。',
  },
  {
    question: '質問するだけで料金はかかりますか？',
    answer: 'ご質問は無料で、決める前に何度でも聞いていただけます。サービス自体は定額制で、還付金に対する歩合ではありません。料金は作業を始める前にWhatsAppで必ずご確認いただきます。',
  },
  {
    question: '返信は何語で来ますか？',
    answer: 'あなたが書いた言語で返ってきます。日本語でも英語でも、ご自分の状況を一番説明しやすい言語でお書きください。その言語でお返事します。この仕事の大半は、オーストラリアの税金に初めて触れる方に分かるように説明することです。母語でも十分ややこしい話ですから。',
  },
  {
    question: 'すぐに書類を送る必要がありますか？',
    answer: 'ありません。まずはご質問だけをお送りください。こちらでお答えし、進める価値のある作業があれば、その内容と料金を着手前にお伝えします。書類はその後、進めると決めていただいてからで、何をどのように安全に送ればよいかを具体的にご案内します。パスポートや銀行口座の情報を最初のメッセージに入れる必要はありません。',
  },
  {
    question: '還付がなかった場合はどうなりますか？',
    answer: '還付金が当社の料金を下回った場合は、差額を返金します。お客様が損をすることはありません。すべてのワーホリの1年に還付が出るわけではありませんし、見込みが薄いのであれば、引き受けて期待させるより先にお伝えします。',
  },
  {
    question: '日本に帰国した後でも対応してもらえますか？',
    answer: 'はい。日本に帰国された後にご連絡いただくお客様が最も多いくらいです。オーストラリアのタックスリターン、スーパーアニュエーションの請求、ATOに残っている手続きは、いずれも日本から完全オンラインで進められます。',
  },
]

const contactPageLd = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  '@id': `${SITE_URL}/ja/contact#webpage`,
  url: `${SITE_URL}/ja/contact`,
  name: 'お問い合わせ｜Working Holiday Tax',
  description: 'WhatsAppでメッセージを送ってください。営業時間内なら、だいたい1時間以内に実在のスタッフが返信します。',
  inLanguage: 'ja',
  isPartOf: { '@type': 'WebSite', '@id': `${SITE_URL}/#website` },
  about: { '@id': `${SITE_URL}/#business` },
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.contact-lead'] },
  mainEntity: {
    '@type': 'Organization',
    '@id': `${SITE_URL}/#business`,
    name: 'Working Holiday Tax',
    url: SITE_URL,
    email: EMAIL,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        telephone: `+${WA_NUMBER}`,
        email: EMAIL,
        areaServed: 'AU',
        availableLanguage: ['ja', 'en', 'de'],
        hoursAvailable: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '18:00',
        },
      },
    ],
  },
}

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'ホーム', item: `${SITE_URL}/ja` },
    { '@type': 'ListItem', position: 2, name: 'お問い合わせ', item: `${SITE_URL}/ja/contact` },
  ],
}

const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  inLanguage: 'ja',
  mainEntity: [...blockers.map(b => ({ question: b.q, answer: b.a })), ...FAQS.map(f => ({ question: f.question, answer: f.answer }))]
    .map(f => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
}

const answerStyle = { fontSize: '15px', lineHeight: 1.85, color: '#2A3C34', fontWeight: 300 } as const

export default function JapaneseContactPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      {/* ── HERO ────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-[68px]" style={{ background: 'linear-gradient(160deg,#fff 0%,#F7FBF9 100%)' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 pt-5 pb-9 lg:pt-12 lg:pb-12">

          <nav aria-label="パンくずリスト" className="mb-5 lg:mb-6">
            <ol className="flex items-center gap-2" style={{ fontSize: '13px', color: '#4C6459' }}>
              <li><Link href="/ja" className="contact-breadcrumb-link">ホーム</Link></li>
              <li aria-hidden="true" style={{ color: '#CDE3DB' }}>/</li>
              <li aria-current="page" style={{ color: '#0B5240', fontWeight: 500 }}>お問い合わせ</li>
            </ol>
          </nav>

          <div className="max-w-[560px] mx-auto text-center">
            <div className="inline-flex items-center gap-2 mb-3 justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-forest-500" aria-hidden="true" />
              <span className="font-medium" style={{ fontSize: '11.5px', letterSpacing: '0.12em', color: '#0B5240' }}>
                お問い合わせ
              </span>
            </div>

            <h1 className="font-serif font-black text-ink"
              style={{ fontSize: 'clamp(26px,5vw,40px)', lineHeight: 1.3, letterSpacing: '-0.02em', marginBottom: '12px' }}>
              WhatsAppで相談する
            </h1>

            <p className="contact-lead mx-auto"
              style={{ fontSize: 'clamp(16px,1.4vw,17px)', lineHeight: 1.8, color: '#2A3C34', maxWidth: '34em', marginBottom: '22px' }}>
              メッセージを読んで返信するのは実在のスタッフです。営業時間内なら、だいたい1時間以内にお返事します。
            </p>

            <WaLink href={WA} position="hero" topic="contact" lang="ja"
              className="btn-primary w-full sm:w-auto inline-flex justify-center"
              style={{ minHeight: '56px', padding: '0 34px', fontSize: '16px', borderRadius: '100px', minWidth: '270px' }}>
              WhatsAppを開く →
            </WaLink>

            <p style={{ fontSize: '13.5px', color: '#4C6459', marginTop: '12px' }}>
              月曜から金曜、9時から18時
            </p>
          </div>
        </div>
      </section>

      {/* ── 送る前に確認されること ──────────────────────────────────────── */}
      <section className="py-11 lg:py-16" style={{ background: '#F5F9F7', borderTop: '1px solid #E2EFE9' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-[680px] mx-auto">
            <span className="section-label">送る前に</span>
            <h2 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(21px,2.6vw,29px)', lineHeight: 1.4, letterSpacing: '-0.02em', margin: '10px 0 20px' }}>
              みなさんが最初に確認する4つのこと
            </h2>

            <div className="flex flex-col" style={{ gap: '12px' }}>
              {blockers.map((b, i) => (
                <div key={i} className="rounded-2xl" style={{ padding: '18px', background: '#fff', border: '1.5px solid #E2EFE9' }}>
                  <h3 className="font-serif font-bold text-ink" style={{ fontSize: '17px', lineHeight: 1.5, letterSpacing: '-0.01em', marginBottom: '8px' }}>
                    {b.q}
                  </h3>
                  <p style={answerStyle}>{b.a}</p>
                  {b.link && (
                    <Link href={b.link.href}
                      style={{ display: 'inline-flex', alignItems: 'center', minHeight: '44px', fontSize: '14.5px', fontWeight: 500, color: '#0B5240', textDecoration: 'underline' }}>
                      {b.link.label} →
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── その他の連絡方法（あくまで補助） ────────────────────────────── */}
      <section className="py-11 lg:py-16 bg-white">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-[560px] mx-auto">
            <span className="section-label">その他の方法</span>
            <h2 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(21px,2.6vw,29px)', lineHeight: 1.4, letterSpacing: '-0.02em', margin: '10px 0 10px' }}>
              WhatsAppが使いにくい場合は
            </h2>
            <p style={{ ...answerStyle, marginBottom: '20px' }}>
              メールでもSNSでもご連絡いただけます。ただ、どちらも返信は遅くなります。日中スタッフが見ているのはWhatsAppです。
            </p>

            <address style={{ fontStyle: 'normal' }}>
              <a href={`mailto:${EMAIL}?subject=%E3%82%A6%E3%82%A7%E3%83%96%E3%82%B5%E3%82%A4%E3%83%88%E3%81%8B%E3%82%89%E3%81%AE%E3%81%94%E8%B3%AA%E5%95%8F`} className="contact-option-card">
                <div className="contact-option-icon" style={{ background: '#fff', border: '1px solid #E2EFE9' }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <rect x="2" y="5" width="20" height="14" rx="2" stroke="#0B5240" strokeWidth="1.8" />
                    <path d="M2.5 6.5L12 13.5l9.5-7" stroke="#0B5240" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="flex-1" style={{ minWidth: 0 }}>
                  <p className="contact-option-label">メール</p>
                  <p className="contact-option-detail" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{EMAIL}</p>
                </div>
                <svg width="16" height="16" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="contact-option-arrow">
                  <path d="M2.5 7h9M8.5 4l3 3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>

              <div className="grid grid-cols-2 gap-3" style={{ marginTop: '12px' }}>
                <a href="https://instagram.com/workingholidaytax" target="_blank" rel="noopener noreferrer" className="contact-option-card-small">
                  <div className="contact-option-icon-small" style={{ background: 'linear-gradient(45deg, #F58529 0%, #DD2A7B 50%, #8134AF 100%)', border: 'none' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                  </div>
                  <span className="contact-option-label-small">Instagram</span>
                </a>
                <a href="https://www.tiktok.com/@workingholidaytax" target="_blank" rel="noopener noreferrer" className="contact-option-card-small">
                  <div className="contact-option-icon-small" style={{ background: '#010101', border: 'none' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.79 1.52V6.76a4.85 4.85 0 01-1.02-.07z" fill="white" />
                    </svg>
                  </div>
                  <span className="contact-option-label-small">TikTok</span>
                </a>
              </div>
            </address>

            <div className="contact-hours-block">
              <p className="contact-hours-title">
                <span className="w-1.5 h-1.5 rounded-full inline-block mr-1.5" style={{ background: '#2FA880' }} aria-hidden="true" />
                営業時間
              </p>
              <p className="contact-hours-detail" style={{ fontSize: '14px', color: '#4C6459', lineHeight: 1.8 }}>
                月曜から金曜、9時から18時
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────────────── */}
      <section style={{ background: '#F5F9F7', paddingTop: '48px', paddingBottom: '48px' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-[680px] mx-auto">
          <div className="text-center mb-7">
            <span className="section-label center">よくあるご質問</span>
            <h2 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(21px,2.6vw,29px)', lineHeight: 1.4, letterSpacing: '-0.02em', marginTop: '10px' }}>
              その他によく聞かれること
            </h2>
          </div>

          <div className="flex flex-col" style={{ gap: '6px' }}>
            {FAQS.map((f, i) => (
              <details key={i} name="contact-faq" className="contact-faq-item" style={{ background: '#fff' }}>
                <summary className="contact-faq-summary" style={{ minHeight: '44px' }}>
                  <span style={{ flex: 1 }}>{f.question}</span>
                  <span className="contact-faq-plus" aria-hidden="true">+</span>
                </summary>
                <p className="contact-faq-answer" style={{ fontSize: '15px', lineHeight: 1.85 }}>{f.answer}</p>
              </details>
            ))}
          </div>
        </div>
        </div>
      </section>

      {/* ── 最後のCTA ───────────────────────────────────────────────────── */}
      <section style={{ background: '#0B5240', paddingTop: '48px', paddingBottom: '56px' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-[520px] mx-auto text-center">
            <p className="font-medium" style={{ fontSize: '11.5px', color: 'rgba(255,255,255,0.6)', letterSpacing: '0.12em', marginBottom: '12px' }}>
              準備ができたら、いつでも
            </p>
            <h2 className="font-serif font-black text-white" style={{ fontSize: 'clamp(21px,2.8vw,30px)', lineHeight: 1.4, letterSpacing: '-0.02em', marginBottom: '12px' }}>
              まず質問を送る。最初の一歩はそれだけです。
            </h2>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.8, marginBottom: '24px', fontWeight: 300 }}>
              どこで働いたか、だいたいの時期、そしてもう出国したかどうか。それだけ分かれば、何を追いかける価値があるかをお伝えできます。
            </p>
            <WaLink href={WA} position="footer" topic="contact" lang="ja"
              className="btn-primary w-full sm:w-auto"
              style={{ minHeight: '54px', padding: '0 32px', fontSize: '15px', minWidth: '260px' }}>
              WhatsAppで相談する →
            </WaLink>
          </div>
        </div>
      </section>

      <MobileCta href={WA} lang="ja" topic="contact" />
    </>
  )
}
