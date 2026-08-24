import type { Metadata } from 'next'
import Link from 'next/link'
import { GoogleReviews } from '@/components/ui/GoogleReviews'
import { ReviewsGate } from '@/components/ui/ReviewsGate'
import { Accordion } from '@/components/ui/Accordion'
import { MobileCta } from '@/components/ui/MobileCta'
import { WaLink } from '@/app/HomeWa'
import { waUrl } from '@/lib/wa'
import { SITE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: '運営者情報：417・462ビザ専門です',
  description: 'ワーホリの税金だけを扱っています。お客様は全員417または462ビザの方。最初の給与明細から帰りの飛行機まで、私たちが見ている1年の話です。',
  keywords: [
    'ワーホリ 税金 専門 オーストラリア',
    'バックパッカー 税金 サポート',
    'Working Holiday Tax とは',
    'Working Holiday Tax 怪しい',
    'Working Holiday Tax 口コミ',
    'ワーホリ 税金 専門家 417 462',
    'ワーキングホリデービザ 税金 相談',
    'バックパッカー タックスリターン 日本語',
  ],
  alternates: {
    canonical: `${SITE_URL}/ja/about`,
    languages: {
      'en-AU': `${SITE_URL}/about`,
      'de': `${SITE_URL}/de/about`,
      'ja': `${SITE_URL}/ja/about`,
      'x-default': `${SITE_URL}/about`,
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Working Holiday Tax Refund Australia' }],
    title: 'Working Holiday Taxについて',
    description: 'お客様は417・462ビザのワーホリの方だけ。最初の給与明細から帰りの飛行機まで、私たちが毎日見ている1年の話です。',
    url: `${SITE_URL}/ja/about`,
    type: 'website',
    siteName: 'Working Holiday Tax',
    locale: 'ja_JP',
  },
  twitter: {
    images: [`${SITE_URL}/og-image.png`],
    card: 'summary_large_image',
    title: 'Working Holiday Taxについて',
    description: 'ワーホリの税金だけを扱っています。お客様は全員417または462ビザの方です。',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

const WA = waUrl({ topic: 'general', lang: 'ja' })

/**
 * 英語版と同じ方針です。物語は読み手自身の1年であって、作られた会社の
 * 沿革ではありません。すべての文が文字どおり事実である必要があります。
 * 物語より実際の事実のほうが強い箇所には、推測を書かずにJOマーカーを
 * 残してあります。
 */
const chapters = [
  {
    stage: '最初の1週間',
    title: '2週間先までしか決まっていない計画で到着した',
    body: 'ホステル、SIMカード、銀行口座、そしてできるだけ早く仕事。TFN（タックスファイルナンバー）もリストのどこかにはあって、申請だけして、あとは目の前のことに追われた。オーストラリアの会計年度の仕組みを説明してくれる人は誰もいませんでした。説明する理由のある人がいなかったからです。',
  },
  {
    stage: '最初の給与明細',
    title: 'TFNが届く前に、最初の仕事が始まった',
    body: 'TFNが登録されていないと、雇用主はワーホリの通常の税率である15%ではなく、最も高い税率で源泉徴収することが義務づけられています。だから最初の数週間分は、半分近くが引かれています。職場の誰も説明しませんでした。それは雇用主の仕事ではないからです。この分は、自動で戻ってくるものではありません。誰かが請求しなければ、そのままです。',
  },
  {
    stage: 'クリスマスまでに',
    title: '雇用主は4つ、半分はカジュアル、誰も何も教えてくれない',
    body: 'ホステルの仕事、カフェ、3週間だけの倉庫、そして最後の給与明細をもらえないまま辞めた仕事。オーストラリアの会計年度が12月ではなく6月に終わることも、誰も言いませんでした。給与明細をなくしていても問題ありません。雇用主が報告した内容はATOを通じて私たちに見えるので、あなたの受信トレイではなく公式の記録から作業を始めます。',
  },
  {
    stage: '88日',
    title: 'やったのなら、そのためにかなり遠くまで行ったはずです',
    body: '西へ、北へ、聞いたこともない町からさらに3時間。宿泊費は受け取る前の給料から直接引かれ、給与明細も都市部のものとは形が違っていた。この期間について、みなさん一番自信がありません。そしてここは、チェックを入れて済ませるのではなく、きちんと見る必要が最も多い部分でもあります。',
  },
  {
    stage: '帰りの飛行機',
    title: 'あなたは帰り、お金は残った',
    body: 'スーパーアニュエーションは、オーストラリアを出国してビザが失効した後でなければ請求できません。だからあなたの分は、自分で選んだ覚えもないファンドにまだ残っています。最初の数週間に引かれすぎた税金も、ATOにそのままあります。空港でも、出国ゲートでも、働いた先の誰からも、そのことは言われません。',
  },
]

const faqs = [
  {
    question: 'どんな人を対象にしているのですか？',
    answer: 'ワーキングホリデーの方だけです。お客様は全員、417または462ビザでオーストラリアにいる方か、かつてそのビザで滞在して現在は帰国された方です。オーストラリアの居住者、学生ビザの方、就労ビザの方、法人のお客様はお受けしていません。つまりワーホリの1年は、たまに扱う案件ではなく、私たちが扱う唯一の案件です。',
  },
  {
    question: 'すでにオーストラリアを出国していても対応できますか？',
    answer: 'はい。むしろ業務の大きな部分がそれです。スーパーアニュエーションは出国してビザが失効した後でなければ請求できませんし、すでに終わった年度のタックスリターンはどこからでも提出できるので、すべてオンラインで完結します。',
  },
  {
    question: '給与明細（ペイスリップ）は必要ですか？',
    answer: 'いりません。雇用主が源泉徴収して報告した内容はATOを通じて私たちに見えるので、8か月前に辞めた職場の書類を探していただく必要はありません。お聞きした内容と雇用主の報告が食い違っている場合は、その差をこちらで処理します。',
  },
  {
    question: '結果的に還付がなかった場合はどうなりますか？',
    answer: '還付金が当社の料金を下回った場合は、差額を返金します。お客様が損をすることはありません。すべてのワーホリの1年に還付が出るわけではないので、見込みが薄いのであれば、引き受けて期待させるより先にお伝えします。',
  },
]

const aboutPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  '@id': `${SITE_URL}/ja/about#webpage`,
  url: `${SITE_URL}/ja/about`,
  name: 'Working Holiday Taxについて',
  description: 'ワーホリの税金だけを扱っています。お客様は全員417または462ビザの方です。',
  inLanguage: 'ja',
  mainEntity: { '@id': `${SITE_URL}/#business` },
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.about-lead'] },
}

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
    { '@type': 'ListItem', position: 2, name: '当社について', item: `${SITE_URL}/ja/about` },
  ],
}

const bodyStyle = { fontSize: 'clamp(15px,1.2vw,16px)', lineHeight: 1.85, color: '#2A3C34', fontWeight: 300 } as const

export default function JapaneseAboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-[68px]" style={{ background: 'linear-gradient(160deg,#fff 0%,#F7FBF9 100%)' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 pt-6 pb-9 lg:pt-14 lg:pb-14">

          <nav aria-label="パンくずリスト" className="flex items-center gap-2 mb-4 lg:mb-6"
            style={{ fontSize: '13px', color: '#4C6459' }}>
            <Link href="/ja" className="transition-colors hover:text-forest-500" style={{ padding: '4px 0' }}>ホーム</Link>
            <span aria-hidden="true" style={{ color: '#CDE3DB' }}>/</span>
            <span aria-current="page" style={{ color: '#0B5240' }}>当社について</span>
          </nav>

          <div className="max-w-[680px]">
            <div className="inline-flex items-center gap-2 mb-3 lg:mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-forest-500" aria-hidden="true" />
              <span className="font-medium uppercase" style={{ fontSize: '10.5px', letterSpacing: '0.15em', color: '#0B5240' }}>
                当社について
              </span>
            </div>

            {/* JO: このページは「読み手自身の1年」として書いています。すべての文が
                事実であると言い切れる物語が、これしかないためです。実際の創業の
                いきさつをここに置きたい場合は、2〜3文いただければ差し替えます。 */}
            <h1 className="font-serif font-black text-ink"
              style={{ fontSize: 'clamp(25px,3.2vw,40px)', lineHeight: 1.25, letterSpacing: '-0.02em', marginBottom: '14px' }}>
              計画は持って来た。<br />税金の話は、誰もしなかった。
            </h1>

            <p className="about-lead text-ink"
              style={{ fontSize: 'clamp(16.5px,1.5vw,18px)', fontWeight: 500, lineHeight: 1.7, marginBottom: '12px' }}>
              私たちはワーホリの税金だけを扱っています。下の1年に心当たりがあるなら、オーストラリアにはまだ、あなたの名前のついたお金が残っているはずです。
            </p>

            <div className="flex flex-col gap-3 sm:flex-row" style={{ marginTop: '26px', maxWidth: '480px' }}>
              <WaLink href={WA} position="hero" topic="general" lang="ja"
                className="btn-primary inline-flex justify-center"
                style={{ minHeight: '54px', padding: '0 30px', fontSize: '15px', borderRadius: '100px', flex: '1', width: '100%' }}>
                なんでも聞いてください →
              </WaLink>
              <Link href="/ja/contact" className="inline-flex btn-ghost-dark justify-center"
                style={{ minHeight: '52px', padding: '0 24px', fontSize: '15px', flex: '1', width: '100%' }}>
                その他の連絡方法 →
              </Link>
            </div>
            <p style={{ fontSize: '13.5px', color: '#4C6459', marginTop: '12px' }}>
              返信するのは実在のスタッフです。営業時間内なら、だいたい1時間以内にお返事します。
            </p>
          </div>
        </div>
      </section>

      {/* ── ワーホリの1年 ─────────────────────────────────────────────────── */}
      <section className="py-11 lg:py-16" style={{ background: '#F5F9F7', borderTop: '1px solid #E2EFE9' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-[680px] mx-auto">

            <span className="section-label">ワーホリの1年</span>
            <h2 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(21px,2.6vw,30px)', lineHeight: 1.35, letterSpacing: '-0.02em', margin: '10px 0 16px' }}>
              私たちから見たワーホリの1年は、どんな形をしていますか？
            </h2>
            <p style={{ ...bodyStyle, marginBottom: '30px' }}>
              名前と地名が違うだけで、だいたいこの形です。417・462ビザのほぼ全員に、おおよそこの順番で5つのことが起きます。そのうち4つは、あとから取り戻せることが多いお金の話です。
            </p>

            <ol style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {chapters.map((c, i) => (
                <li key={i} style={{
                  position: 'relative',
                  paddingLeft: '20px',
                  paddingBottom: i === chapters.length - 1 ? 0 : '28px',
                  borderLeft: i === chapters.length - 1 ? 'none' : '1.5px solid #CDE3DB',
                  marginLeft: '4px',
                }}>
                  <span aria-hidden="true" style={{
                    position: 'absolute', left: '-6px', top: '6px', width: '10px', height: '10px',
                    borderRadius: '999px', background: '#16775C', border: '2px solid #F5F9F7',
                  }} />
                  <p className="font-medium" style={{ fontSize: '11.5px', letterSpacing: '0.1em', color: '#16775C', marginBottom: '6px' }}>
                    {c.stage}
                  </p>
                  <h3 className="font-serif font-bold text-ink" style={{ fontSize: 'clamp(17px,1.7vw,20px)', lineHeight: 1.5, letterSpacing: '-0.01em', marginBottom: '8px' }}>
                    {c.title}
                  </h3>
                  <p style={bodyStyle}>{c.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ── 私たちが存在する理由 ──────────────────────────────────────────── */}
      <section className="py-11 lg:py-16 bg-white">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-[680px] mx-auto">
            <span className="section-label">私たちが存在する理由</span>
            <h2 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(21px,2.6vw,30px)', lineHeight: 1.35, letterSpacing: '-0.02em', margin: '10px 0 16px' }}>
              なぜワーキングホリデーの方だけを扱うのですか？
            </h2>
            <p style={{ ...bodyStyle, marginBottom: '14px' }}>
              そこが唯一向き合っている年だからです。お客様は全員417または462ビザの方なので、あなたの還付額を左右する要素は、調べ直さなければならない珍しいケースではありません。毎日それを見ています。
            </p>
            <p style={{ ...bodyStyle, marginBottom: '14px' }}>
              一般の会計士がバックパッカーに会うのは、7月に、200件の普通の申告の合間に年に数回です。417・462の税率表、思い込みで済ませずきちんと確認すべき居住区分の判断、パスポート（国籍）で変わるメディケア免除、出国から11か月後に東京や大阪の自室から出すスーパーアニュエーションの請求。私たちにとっては、どれもごく普通の1日の仕事です。
            </p>
            <p style={bodyStyle}>
              送信ボタンを押すだけなら誰にでもできます。仕事はその前にあります。あなたの1年を洗い直し、手早く済む選択肢ではなく正しいほうを確かめ、そのうえで申告します。
            </p>

            {/* JO: 「なぜワーホリ専門なのか」の本当の答えだけは、こちらで書けません。
                ご自身の言葉で2〜3文いただければ、ちょうどここに入ります。 */}

            {/* JO: 旧版のこのページには「2020年から運営」という数字と、チームの写真の
                ように読めるストック画像がありました。裏取りできないため両方外して
                います。創業年をご確認いただき、実際の写真をいただければ戻します。 */}

            <div className="rounded-2xl" style={{ marginTop: '28px', padding: '20px', background: '#F2FAF7', border: '1.5px solid #C8EAE0' }}>
              <p className="font-serif font-bold text-ink" style={{ fontSize: '17px', lineHeight: 1.6, marginBottom: '8px' }}>
                還付金が当社の料金を下回った場合は、差額を返金します。お客様が損をすることはありません。
              </p>
              <p style={{ ...bodyStyle, fontSize: '15px' }}>
                すべてのワーホリの1年に還付が出るわけではありません。見込みが薄い場合は、そのこともお伝えします。決める前に、まず聞いてください。質問は無料で、返信するのは実在のスタッフです。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 連絡方法 ─────────────────────────────────────────────────────── */}
      <section className="py-11 lg:py-16" style={{ background: '#F5F9F7' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-[680px] mx-auto">
            <span className="section-label">ご連絡について</span>
            <h2 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(21px,2.6vw,30px)', lineHeight: 1.35, letterSpacing: '-0.02em', margin: '10px 0 16px' }}>
              どうやって連絡すればいいですか？
            </h2>
            <p style={{ ...bodyStyle, marginBottom: '14px' }}>
              WhatsAppです。ボットでも、チケット番号でも、「5〜7営業日お待ちください」という自動フォームでもありません。質問ひとつだけ送って、それで終わりにしても構いません。メッセージを送ったからといって、何かが決まるわけではありません。
            </p>
            <p style={{ ...bodyStyle, marginBottom: '22px' }}>
              始めるのにmyGovのアカウントも、オーストラリアのIDも、給与明細も必要ありませんし、オーストラリアに滞在中でも、帰国して2年経っていても、扱いは変わりません。返信が何語で来るか、そのあと何が起きるかは{' '}
              <Link href="/ja/contact" style={{ color: '#0B5240', textDecoration: 'underline' }}>お問い合わせページ</Link>{' '}
              にまとめています。
            </p>

            <WaLink href={WA} position="section" topic="general" lang="ja"
              className="btn-primary inline-flex justify-center w-full sm:w-auto"
              style={{ minHeight: '54px', padding: '0 32px', fontSize: '15px', borderRadius: '100px', minWidth: '260px' }}>
              WhatsAppで相談する →
            </WaLink>
          </div>
        </div>
      </section>

      {/* ── REVIEWS ──────────────────────────────────────────────────────── */}
      {/* Hidden entirely when the reviews feed is empty, so the heading
          never stands alone over blank space. */}
      <ReviewsGate>
        <section className="py-10 lg:py-14 bg-white">
          <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
            <div className="max-w-xl mx-auto text-center mb-8">
              <span className="section-label center">実際の声</span>
              <h2 className="font-serif font-black text-ink mt-2" style={{ fontSize: 'clamp(20px,2.04vw,26px)', lineHeight: 1.4, letterSpacing: '-0.02em' }}>
                ワーホリ参加者からのお声
              </h2>
            </div>
            <GoogleReviews lang="ja" />
          </div>
        </section>
      </ReviewsGate>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="py-11 lg:py-14" style={{ background: '#F5F9F7' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 lg:gap-8 lg:items-start">
            <div>
              <span className="section-label">よくあるご質問</span>
              <h2 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(20px,2.04vw,26px)', lineHeight: 1.4, letterSpacing: '-0.02em', marginTop: '10px', marginBottom: '10px' }}>
                メッセージを送る前によく聞かれること
              </h2>
              <p style={{ ...bodyStyle, marginBottom: '22px' }}>
                ほかにも気になることがあれば、WhatsAppで聞いてください。読むより早いです。
              </p>
            </div>
            <div className="max-w-[700px]">
              <Accordion items={faqs} />
            </div>
          </div>
        </div>
      </section>

      {/* ── 最後のCTA ────────────────────────────────────────────────────── */}
      <section style={{ background: '#0B5240', paddingTop: '48px', paddingBottom: '56px' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-[540px] mx-auto text-center">
            <p className="font-medium" style={{ fontSize: '11.5px', color: 'rgba(255,255,255,0.6)', letterSpacing: '0.12em', marginBottom: '12px' }}>
              準備ができたら、いつでも
            </p>
            <h2 className="font-serif font-black text-white" style={{ fontSize: 'clamp(21px,2.8vw,30px)', lineHeight: 1.4, letterSpacing: '-0.02em', marginBottom: '12px' }}>
              あなたの1年を聞かせてください
            </h2>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.8, marginBottom: '24px', fontWeight: 300 }}>
              どこで働いたか、だいたいの時期、そしてもう出国したかどうか。それだけ分かれば、何を追いかける価値があるかをお伝えできます。
            </p>
            <WaLink href={WA} position="footer" topic="general" lang="ja"
              className="btn-primary w-full sm:w-auto"
              style={{ minHeight: '54px', padding: '0 32px', fontSize: '15px', minWidth: '260px' }}>
              WhatsAppで相談する →
            </WaLink>
          </div>
        </div>
      </section>

      <MobileCta href={WA} lang="ja" topic="general" variant="neutral" />
    </>
  )
}
