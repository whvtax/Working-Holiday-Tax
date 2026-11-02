import { newLocaleLanguages } from '@/lib/locale-pages'
import type { Metadata } from 'next'
import Link from 'next/link'
import { GoogleRating } from '@/components/ui/GoogleRating'
import { GoogleReviewsServer } from '@/components/ui/GoogleReviewsServer'
import { MobileCta } from '@/components/ui/MobileCta'
import { SITE_URL } from '@/lib/constants'
import { waUrl } from '@/lib/wa'
import { WaButton } from '@/components/wht/WaButton'
import { Section } from '@/components/wht/Section'
import { Hero, heroStyles } from '@/components/wht/Hero'
import { Lead, Mark } from '@/components/wht/Type'
import { LinkButton } from '@/components/wht/Button'
import { Steps, LinkRows, blocks } from '@/components/wht/Blocks'
import { Crumb, PhotoFrame, PlainRows } from '@/components/wht/CoreBlocks'
import { Accordion } from '@/components/ui/Accordion'

// ─── METADATA ───────────────────────────────────────────────────────────
// このページが答えるのは「依頼したら何が起きるか」です。「自分でやらない
// 理由」はトップページが扱うので、ヒーロー、3つの数字、myGovとの比較は
// ここでは繰り返しません。料金は記載せず、当社自身が登録税理士であるとも
// 書きません。
export const metadata: Metadata = {
  // ルートレイアウトが " | Working Holiday Tax" を付与するため、
  // タイトルはモバイルの検索結果に収まる長さにしています。
  title: 'タックスリターン代行｜417・462ビザ',
  description:
    '必要な情報と振込先だけ。給与明細は不要です。ATOの記録から作成し、還付金がある場合、ATOからの支払いは提出からおおむね14営業日が目安です。',
  keywords: [
    'タックスリターン 代行 オーストラリア',
    'オーストラリア タックスリターン 申請',
    'ワーホリ タックスリターン 代行',
    'ワーホリ 帰国後 タックスリターン',
    'オーストラリア タックスリターン 日本から',
    '417ビザ タックスリターン 提出',
    '462ビザ タックスリターン 提出',
    'オーストラリア 還付金 いつ 入金',
    'タックスリターン 給与明細 なくした',
    'インカムステートメント ATO 取得',
    'オーストラリア 過去の年度 タックスリターン',
    'タックスリターン オーストラリア 日本語',
    'タックスリターン 流れ オーストラリア',
  ],
  alternates: {
    canonical: `${SITE_URL}/ja/tax-return`,
    languages: {
      'en-AU': `${SITE_URL}/tax-return`,
      de: `${SITE_URL}/de/tax-return`,
      ja: `${SITE_URL}/ja/tax-return`,
      ...newLocaleLanguages('/tax-return'),
      'x-default': `${SITE_URL}/tax-return`,
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/assets/og/og-tax-return.png`, width: 1200, height: 630, alt: 'ワーキングホリデーのタックスリターン代行' }],
    type: 'website',
    locale: 'ja_JP',
    url: `${SITE_URL}/ja/tax-return`,
    siteName: 'Working Holiday Tax',
    title: 'タックスリターン代行の流れ｜417・462ビザ',
    description:
      '必要な情報と還付金の振込先だけ。ATOの記録を確認して申告書を作成し、あなたが署名したうえで提出します。還付金がある場合、ATOからの支払いは提出からおおむね14営業日が目安です。',
  },
  twitter: {
    images: [`${SITE_URL}/assets/og/og-tax-return.png`],
    card: 'summary_large_image',
    title: 'タックスリターン代行の流れ｜417・462ビザ',
    description: '必要な情報と振込先だけ。給与明細は不要。還付金がある場合、ATOからの支払いは提出からおおむね14営業日が目安です。',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

// ─── COPY ───────────────────────────────────────────────────────────────

/** ご用意いただくもの。3つだけで、それ以上はありません。 */
const NEEDED = [
  {
    label: 'パスポートとビザの情報',
    body: 'どの国のパスポートで、どのサブクラスだったか。',
  },
  {
    label: 'オーストラリアの銀行口座',
    body: '還付金はオーストラリアの口座にのみ支払われます。解約済みの場合は最初に教えてください。',
  },
  {
    label: 'いつどこで働いたかのおおよそ',
    body: '町の名前、仕事の種類、だいたいの月。ATOの記録と突き合わせ、足りない部分は当社が埋めます。',
  },
]

/** 実際に進む順序。待ち時間もそのまま書いています。 */
const SEQUENCE = [
  {
    n: '01',
    title: 'ご相談',
    body: 'WhatsAppで、説明しやすい言語で書いてください。1年の様子をざっと教えていただければ、いまどういう状況かをお伝えします。作業を始める前に料金も確定します。',
  },
  {
    n: '02',
    title: '質問票、10分ほど',
    body: 'パスポートとビザの情報、銀行口座、働いた町と仕事の種類。あなたが記入する書類はこれだけです。当てはまらない項目は空欄のままで構いません。必要ならこちらから確認します。',
  },
  {
    n: '03',
    title: 'ATOの記録を開きます',
    body: 'あなたを報告したすべての雇用主、すべてのインカムステートメント、源泉徴収された金額、そして未提出のまま残っている過去の年度。忘れていた仕事や最高税率で引かれていた期間は、記憶の中ではなくここで見つかります。',
  },
  {
    n: '04',
    title: '金額を動かす判断',
    body: 'その年の居住区分、TFNが雇用主に届く前の期間、メディケア税をそもそも払う義務があったのか、そしてあなたの仕事で何が控除できるのか。ここが時間のかかる部分であり、費用をいただいているのもこの部分です。',
  },
  {
    n: '05',
    title: '内容を確認して署名',
    body: 'できあがった申告書を、数字ごとに説明したうえでお送りします。読んで署名いただくまで、ATOには何も送りません。署名は電子的に行うので、地球の反対側からスマートフォンだけでも完結します。',
  },
  {
    n: '06',
    title: '提出',
    body: '登録タックスエージェントが確認・承認したうえでATOに提出します。提出そのものは数分で終わります。',
  },
  {
    n: '07',
    title: 'ATOから入金',
    body: '還付金がある場合、ATOは提出からおおむね14営業日で、ご指定のオーストラリアの口座に支払うのが通例です。先にATOから確認が入った場合は当社が対応し、何を聞かれたのかもお伝えします。',
  },
]

/** 進める順番が変わる2つのルール。だから手順01より前に置いています。 */
/**
 * Where a working holiday refund comes from (Oct 2026). This page ranked around
 * 30 for "working holiday tax return" with nothing on it that explained why a
 * refund exists at all, which is the question the query carries. Every item is a
 * mechanism already stated elsewhere on the site; no amount is promised. The one
 * range sentence in the lede is the owner-approved wording.
 */
const REFUND_SOURCES = [
  {
    "label": "TFNが届く前に45%で取られていた期間",
    "body": "TFNが雇用主に届いておらず、申請中であることを申告書で伝えていない場合、雇用主は15%ではなく45%で源泉徴収しなければなりません。その間の給与はすべて取られすぎになり、調整できるのは申告を提出したときだけです。"
  },
  {
    "label": "申告書を出していない2つ目の仕事",
    "body": "雇用主ごとにTFN申告書（Tax File Number Declaration）が必要です。2つ目の仕事で出していないと、誰も気づかないあいだ45%で源泉徴収され、数か月続くことも珍しくありません。"
  },
  {
    "label": "ワーホリ雇用主として登録していない雇用主",
    "body": "15%の税率は、雇用主がATOにワーキングホリデーメーカーの雇用主として登録していることが前提です。登録していなければ、1ドル目から30%の非居住者の税率で源泉徴収しなければなりませんでした。"
  },
  {
    "label": "もともと払う必要のなかったメディケア税",
    "body": "2%のメディケア税は自動的に差し引かれます。日本を含め、メディケアの対象とならない国のパスポートは多く、正しい証明書があれば免除されます。"
  },
  {
    "label": "誰も申告していなかった仕事の経費",
    "body": "靴、制服、道具、資格、現場間の移動などは、実際の仕事に関係していれば課税所得を減らせます。控除がどれだけ税額に効くかは、その年に適用される税率によって変わります。"
  },
  {
    "label": "パスポートと税務上の居住者区分",
    "body": "パスポートや1年の過ごし方によっては、裁判所の判断により適用される税率が変わる場合があります。該当するかどうかは、当社の確認の中で判断します。"
  }
]

const RULES = [
  {
    label: '還付金はオーストラリアの口座にしか入りません',
    body: 'スーパーアニュエーション（DASP）は海外の口座でも受け取れますが、タックスリターンの還付金は受け取れません。オーストラリアの口座を解約する予定なら、還付金が入るまで待つか、事前に教えてください。',
  },
  {
    label: '過去の年度もまだ請求できます',
    body: '提出しないままの年度が、黙って消えるわけではありません。年度ごとに別の申告であり、別の還付です。古い年度から順に進めます。',
  },
]

// 55語を超える回答には空行を入れ、下のFAQは段落ごとに<p>を出す。faqLdは
// 元の文字列をそのまま使うので、構造化データは変わらない。
const FAQS = [
  {
    question: 'タックスリターンにはどれくらい時間がかかりますか？',
    answer:
      '質問票をいただいた日から、複雑でない1年であれば作成と確認に数日で、提出後、還付金がある場合はATOがおおむね14営業日で支払います。\n\n雇用主が5社ある年、ABNで請求した収入がある年、居住区分を根拠づける必要がある年は、当社側の作業が長くなります。どれに当たるのかは、こちらからお伝えします。',
  },
  {
    question: 'タックスリターンの提出期限はいつですか？',
    answer:
      '自分で提出する場合は、会計年度終了後の10月31日です。2025-26年度の申告は2026年10月31日が期限でした。期限を過ぎた年度も失われたわけではなく、いまからでも提出できます。',
  },
  {
    question: '給与明細は必要ですか？',
    answer:
      '必要ありません。給与として支払った雇用主は、インカムステートメントをATOに報告しており、申告書はその記録から組み立てます。明細をなくした、その会社がもう存在しない。どれもよくある出発点です。',
  },
  {
    question: '自分がやることは何ですか？',
    answer:
      '3つです。質問票に1回答えること、お送りする申告書を読むこと、そして署名すること。政府のアカウントを作る必要も、ATOの書式を読み解く必要もありません。提出は当社を通して行うためです。',
  },
  {
    question: '帰国後でも依頼できますか？',
    answer:
      'はい。当社が提出する申告のかなりの部分は、すでに日本に戻られた方のものです。質問票も署名も提出もすべてオンラインで完結します。\n\n唯一持ち帰れないのが還付金そのもので、ATOはオーストラリアの銀行口座にしか支払えません。スーパーアニュエーション（DASP）は海外の口座で受け取れます。オーストラリアの口座をすでに解約している場合は、最初のメッセージで教えてください。',
  },
  {
    question: '過去の年度を提出していない場合はどうなりますか？',
    answer:
      'いまからでも提出できます。年度ごとに独立した申告であり、独立した還付です。どの年度が未提出かはATOの記録で確認できます。\n\nワーキングホリデーの年度は、還付になる場合も、納税になる場合もあります。提出前に金額をお見せします。',
  },
  {
    question: '還付ではなく納税になった場合はどうなりますか？',
    answer:
      'まれにあります。多いのは、ABNで請求した収入があり、その分が源泉徴収されていなかった場合です。\n\n提出前にその金額をお見せし、どこから生じたのか、ATOにどんな支払い方法があるのかもあわせて説明します。あなたの署名なしに提出することはありません。',
  },
]

const GUIDES = [
  {
    href: '/ja/blog/how-to-lodge-tax-return-from-overseas',
    title: '帰国後の申告',
    desc: '日本からでもできること、そして見落とされがちな口座のルール。',
  },
  {
    href: '/ja/blog/tax-residency-working-holiday-makers',
    title: '税務上の居住者かどうか',
    desc: '手順04がチェックリストでは決まらない理由です。',
  },
  {
    href: '/ja/blog/tax-deductions-working-holiday-makers',
    title: '何が控除できるのか',
    desc: '一般論ではなく、仕事の種類ごとの控除です。',
  },
]

const WA_TR = waUrl({ topic: 'tax-return', lang: 'ja' })

export default function TaxReturnPageJA() {
  const webPageLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}/ja/tax-return#webpage`,
    url: `${SITE_URL}/ja/tax-return`,
    name: 'タックスリターン代行の流れ（417・462ビザ）',
    description:
      '417・462ビザのタックスリターンを提出するまでの流れ。ご用意いただくもの、当社が確認すること、署名の仕方、そして還付金が届く時期。',
    inLanguage: 'ja',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#business` },
    speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.hero-lede'] },
  }

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_URL}/ja/tax-return#service`,
    name: 'ワーキングホリデー向けタックスリターン代行',
    serviceType: 'タックスリターンの作成と提出',
    description:
      '417・462ビザ保持者のオーストラリアのタックスリターン。登録タックスエージェントが確認・承認したうえでATOに提出します。帰国後の日本からのご依頼にも対応します。',
    provider: { '@id': `${SITE_URL}/#business` },
    areaServed: { '@type': 'Country', name: 'オーストラリア' },
    audience: { '@type': 'Audience', audienceType: 'ワーキングホリデーメーカー（サブクラス417・462）' },
    availableLanguage: ['ja', 'en', 'de'],
    inLanguage: 'ja',
  }

  // 7つの手順を機械可読で。これはこのページ固有のスキーマです。
  // トップページはHowToを名乗りません。
  const howToLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    '@id': `${SITE_URL}/ja/tax-return#howto`,
    name: 'ワーキングホリデーのタックスリターンを提出するまでの流れ',
    description:
      '417・462ビザのタックスリターンを作成し提出するまでの順序。最初のメッセージから還付金の入金まで。',
    inLanguage: 'ja',
    totalTime: 'P14D',
    step: SEQUENCE.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.title,
      text: s.body,
    })),
  }

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: 'ja',
    mainEntity: FAQS.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'ホーム', item: `${SITE_URL}/ja` },
      { '@type': 'ListItem', position: 2, name: 'タックスリターン', item: `${SITE_URL}/ja/tax-return` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <div className={blocks.underHeader}>
        <Crumb home="ホーム" current="タックスリターン" label="Breadcrumb" href="/ja" />
        <Hero
          title={
            <>
              <span className={blocks.kicker}>タックスリターン代行｜申告書は登録タックスエージェントが確認して承認</span>
              必要な情報と、還付金の振込先だけ。 <Mark>あとは当社が進めます。</Mark>
            </>
          }
        >
          <div className="hero-lede">
            <Lead>給与明細も、myGovのアカウントも、読み解く書式もありません。質問票に1回答えて、1回署名するだけです。還付金がある場合、ATOからの支払いは提出からおおむね14営業日が目安です。</Lead>
          </div>
          <WaButton href={WA_TR} position="hero" topic="tax-return" lang="ja">WhatsAppで相談する</WaButton>
          <p className={heroStyles.note}>約1時間で返信します。</p>
          <GoogleRating variant="pill" lang="ja" />
        </Hero>
      </div>

      <PhotoFrame page="tax-return" locale="ja" />

      <Section tone="pale" eyebrow="還付金はどこから生まれるのか" title="ワーホリで還付金が生じることが多い理由" titleId="refund-title">
        <p className={`${blocks.text} ${blocks.muted}`}>還付金はバックパッカーであることへのご褒美ではありません。雇用主が源泉徴収した額と、本来払うべきだった額の差で、ワーホリの1年ではその差はたいてい下のような場所から生まれます。還付額は、どれが当てはまったかによって人それぞれ変わります。</p>
        <div className={blocks.cards}>
          {REFUND_SOURCES.map((r) => (
            <div key={r.label} className={blocks.card}>
              <h3 className={blocks.cardTitle}>{r.label}</h3>
              <p className={blocks.text}>{r.body}</p>
            </div>
          ))}
        </div>
        <p className={`${blocks.text} ${blocks.muted}`}>
          どれも自動ではなく、決めつけもしません。提出前に、ひとつずつATOの記録と照らし合わせて確認します。{' '}
          <Link href="/ja/calculator" className={blocks.textLink}>計算ツールで還付額の目安を見る</Link>。
        </p>
      </Section>

      <Section eyebrow="あなたの側" title="ご用意いただくもの" titleId="needed-title">
        <p className={`${blocks.text} ${blocks.muted}`}>3つだけで、これが全部です。</p>
        <PlainRows items={NEEDED} />
        <div className={`${blocks.palePanel} ${blocks.stack}`}>
          <p className={blocks.statement}>給与明細は必要ありません。</p>
          <p className={blocks.text}>給与として支払った雇用主は、あなたのTFNに紐づくインカムステートメントをすでにATOへ報告しています。申告書はそこから組み立てます。</p>
          <p className={blocks.text}>探す価値があるのは仕事に関する支出の領収書だけで、それも無い場合は、どんな仕事だったかを教えてください。</p>
        </div>
      </Section>

      <Section id="how-it-works" tone="pale" eyebrow="最初から最後まで" title="どんな順序で進むのか" titleId="sequence-title">
        <p className={`${blocks.text} ${blocks.muted}`}>手順は7つ。あなたの出番は、最初と、署名のときの2回だけです。</p>
        <Steps items={SEQUENCE} />
        <p className={`${blocks.text} ${blocks.muted}`}>
          収入の一部を給与ではなく請求で受け取っていた場合は{' '}
          <Link href="/ja/abn" className={blocks.textLink}>ABNで何が変わるか</Link>もご覧ください。
        </p>
      </Section>

      <Section title="2つのルールが、進める順番を変えます" titleId="rules-title">
        <div className={blocks.cards}>
          {RULES.map((r) => (
            <div key={r.label} className={`${blocks.palePanel} ${blocks.stack}`}>
              <h3 className={blocks.cardTitle}>{r.label}</h3>
              <p className={blocks.text}>{r.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="amber" title="当社の保証" titleId="guarantee-title">
        <p className={blocks.statement} style={{ color: 'var(--wht-ink)' }}>
          当社の保証：還付金が当社の料金より少ない場合は、ATOの課税通知書（Notice of Assessment）の発行後に差額を返金します。還付がない場合、またはATOへの納税が発生した場合は、料金の全額をいただきます。
        </p>
        <p className={blocks.text}>ATOから届く金額から差し引くことは一切ありません。金額は手順01の前にWhatsAppで確定するので、質問票が届く時点で交渉の余地は残っていません。</p>
      </Section>

      <Section tone="pale" title="ワーキングホリデーの税金だけを扱っています。" titleId="trust-title">
        <p className={blocks.text}>質問票も、確認する項目も、上の順序も、たった1種類のビザの1年のために組み立てたものです。</p>
        <GoogleReviewsServer lang="ja" />
        <p className={`${blocks.text} ${blocks.notice}`}>
          <strong>正規の窓口であれば、myGovのパスワードを尋ねることはありません。</strong>{' '}
          当社はどの手順でも尋ねません。上の流れに必要ないからです。それを尋ねてくるメッセージは、当社からのものではありません。
        </p>
      </Section>

      <Section title="依頼する前によく聞かれること" titleId="faq-title">
        {/* Accordion splits answers on a blank line; faqLd above uses the raw string. */}
        <Accordion items={FAQS} />
      </Section>

      <Section tone="pale" eyebrow="ガイド" title="難しい手順の詳しい版" titleId="guides-title">
        <LinkRows items={GUIDES} />
      </Section>

      <Section eyebrow="次のステップ" title="スーパーアニュエーションの受け取りを忘れずに" titleId="next-title">
        <p className={blocks.text}>オーストラリアで働いている間、雇用主は給与とは別にスーパーアニュエーションを積み立てています。完全に帰国するときに受け取ることができ、これは申告とは別の手続きです。</p>
        <LinkButton href="/ja/superannuation">スーパー受取の流れ →</LinkButton>
      </Section>

      <Section tone="forest" title="フォームではなく、メッセージから始めてください" titleId="cta-title">
        <p className={`${blocks.text} ${blocks.onForest}`}>働いた町、だいたいの月、そしてABNで請求したことがあるかどうか。それだけで、どの年度が未提出なのか、あなたの側の作業がどれくらいかをお伝えできます。2年前に帰国された方でも変わりません。</p>
        <WaButton href={WA_TR} position="section" topic="tax-return" lang="ja" tone="light">WhatsAppで相談する</WaButton>
        <p className={`${blocks.small} ${blocks.onForest}`}>約1時間で返信します。</p>
      </Section>

      <MobileCta href={WA_TR} lang="ja" topic="tax-return" />
    </>
  )
}
