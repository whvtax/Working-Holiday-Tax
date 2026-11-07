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
  title: 'オーストラリアのタックスリターン代行｜ワーホリ・帰国後も',
  description:
    'ワーホリ（417・462ビザ）のタックスリターン代行。帰国後の日本からも依頼でき、給与明細は不要です。ATOに提出される前に、オーストラリアの登録タックスエージェントが確認し、承認します。',
  keywords: [
    'タックスリターン 代行 オーストラリア',
    'オーストラリア タックスリターン 代行',
    'オーストラリア タックスリターン 帰国後 代行',
    'タックスリターン 代行 費用',
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
    title: 'オーストラリアのタックスリターン代行｜ワーホリ・帰国後も',
    description:
      '必要なのはパスポートとビザの情報、オーストラリアの口座、働いた時期と場所のおおよそだけ。ATOの記録から作成し、あなたが署名してから提出されます。還付金がある場合、ATOからの支払いは提出からおおむね14営業日が目安です。',
  },
  twitter: {
    images: [`${SITE_URL}/assets/og/og-tax-return.png`],
    card: 'summary_large_image',
    title: 'オーストラリアのタックスリターン代行｜ワーホリ・帰国後も',
    description: '帰国後の日本からも依頼できます。給与明細は不要。ATOに提出される前に、オーストラリアの登録タックスエージェントが確認し、承認します。',
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
    body: 'できあがった申告書を、数字ごとに説明したうえでお送りします。読んで署名いただくまで、ATOには何も提出されません。署名は電子的に行うので、地球の反対側からスマートフォンだけでも完結します。',
  },
  {
    n: '06',
    title: '提出',
    body: 'ATOに提出される前に、オーストラリアの登録タックスエージェントが確認し、承認します。提出そのものは数分で終わります。',
  },
  {
    n: '07',
    title: 'ATOが査定し、還付金を支払う',
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
    "body": "15%の税率は、雇用主がATOにワーキングホリデーメーカーの雇用主として登録していることが前提です。登録していなければ、15%ではなくより高い税率で源泉徴収しなければなりませんでした。"
  },
  {
    "label": "もともと払う必要のなかったメディケア税",
    "body": "2%のメディケア税は、何もしなければ査定の際に自動的に加算されます。メディケアの対象とならない方は多く、ご本人の事情によっては免除される場合があります。"
  },
  {
    "label": "誰も申告していなかった仕事の経費",
    "body": "靴、制服、道具、資格、現場間の移動などは、実際の仕事に関係していれば課税所得を減らせます。控除がどれだけ税額に効くかは、その年に適用される税率によって変わります。"
  },
  {
    "label": "税務上の居住区分",
    "body": "その年の事情によっては、裁判所の判断を踏まえて適用される税率が変わる場合があります。該当するかどうかは人によって異なり、最終的な判断はATOが行います。当社の確認の中で検討します。"
  }
]

const RULES = [
  {
    label: '還付金はオーストラリアの口座にしか入りません',
    body: 'スーパーアニュエーション（DASP）は海外の口座でも受け取れますが、タックスリターンの還付金は受け取れません。オーストラリアの口座を解約する予定なら、還付金が入るまで待つか、事前に教えてください。',
  },
  {
    label: '過去の年度もまだ提出できます',
    body: '提出しないままの年度が、黙って消えるわけではありません。年度ごとに別の申告であり、結果も年度ごとに別です。古い年度から順に進めます。',
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
    question: 'タックスリターンはいつまでに提出すればいいですか？',
    answer:
      '自分で提出する場合は、会計年度終了後の10月31日です。2025-26年度の申告は2026年10月31日が期限でした。期限を過ぎた年度も失われたわけではなく、いまからでも提出できます。2026-27年度（2026年7月1日から2027年6月30日）の期限は2027年10月31日です。10月31日までに登録タックスエージェントの顧客として登録されていた場合は、より遅い期限が適用されることがあります。',
  },
  {
    question: '給与明細は必要ですか？',
    answer:
      '必要ありません。給与として支払った雇用主は、インカムステートメントをATOに報告しており、申告書はその記録から組み立てます。明細をなくした、その会社がもう存在しない。どれもよくある出発点です。',
  },
  {
    question: '自分がやることは何ですか？',
    answer:
      '3つです。質問票に1回答えること、お送りする申告書を読むこと、そして署名すること。政府のアカウントを作る必要も、ATOの書式を読み解く必要もありません。ATOとのやり取りは当社が直接行います。',
  },
  {
    question: '帰国後でも依頼できますか？',
    answer:
      'はい。当社がお手伝いする申告のかなりの部分は、すでに日本に戻られた方のものです。質問票も署名も提出もすべてオンラインで完結します。\n\n唯一持ち帰れないのが還付金そのもので、ATOはオーストラリアの銀行口座にしか支払えません。スーパーアニュエーション（DASP）は海外の口座で受け取れます。オーストラリアの口座をすでに解約している場合は、最初のメッセージで教えてください。',
  },
  {
    question: '過去の年度を提出していない場合はどうなりますか？',
    answer:
      'いまからでも提出できます。年度ごとに独立した申告であり、結果も年度ごとに別です。どの年度が未提出かはATOの記録で確認できます。\n\nワーキングホリデーの年度は、還付になる場合も、納税になる場合もあります。提出前に金額をお見せします。',
  },
  {
    question: '還付ではなく納税になった場合はどうなりますか？',
    answer:
      'まれにあります。多いのは、ABNで請求した収入があり、その分が源泉徴収されていなかった場合です。\n\n提出前にその金額をお見せし、どこから生じたのか、ATOにどんな支払い方法があるのかもあわせて説明します。あなたの署名なしに提出されることはありません。',
  },
  {
    question: '日本の税理士にオーストラリアのタックスリターンを頼めますか？',
    answer:
      'オーストラリアで報酬を受けてタックスリターンを作成できるのは、TPB（Tax Practitioners Board）に登録されたタックスエージェントだけです。日本の税理士資格だけでは、オーストラリアの申告書を有料で扱うことはできません。登録の有無はTPBの公開登録簿で確認できます。\n\nWorking Holiday Taxは、オーストラリアの登録タックスエージェントの監督のもとで運営しています。ATOに提出される前に、オーストラリアの登録タックスエージェントが確認し、承認します。',
  },
  {
    question: '還付金を日本の銀行口座で受け取れますか？',
    answer:
      'いいえ。ATOはタックスリターンの還付金をオーストラリアの銀行口座に支払います。帰国後に提出する場合も同じです。\n\nオーストラリアの口座をすでに解約した場合や、解約する予定の場合は、最初のメッセージで教えてください。スーパーアニュエーション（DASP）は日本の口座でも受け取れます。',
  },
  {
    question: 'メディケア税の免除もタックスリターンで申請できますか？',
    answer:
      'はい。2%のメディケア税は、メディケアの対象とならない期間について免除を申請できます。必要なのはServices Australiaが発行するMedicare Entitlement Statementで、ATOはこの書類が届いてから申告書を提出するよう案内しています。\n\n日本は相互医療協定の対象国ではありませんが、免除になるかどうかはご本人の事情によって変わります。書類の手配は当社が行います。',
  },
  {
    question: '6月30日より前に完全帰国する場合、年度の途中で提出できますか？',
    answer:
      'できる場合があります。ATOによれば、6月30日より前にオーストラリアを永久に離れ、その後オーストラリア国内の所得（利子、配当、ロイヤリティを除く）がない場合は、年度が終わる前に紙の申告書で提出できます。早期提出の処理には50営業日かかります。\n\n条件に当てはまらない場合は、7月1日以降に通常どおり提出します。どちらの場合も日本から進められます。',
  },
  {
    question: '代行の料金はどう決まりますか？',
    answer:
      '定額で、還付額に対する割合ではありません。ATOから届く還付金から差し引くこともありません。料金は作業を始める前にWhatsAppで確定し、あとから変わることはありません。\n\n還付金が料金より少ない場合は、ATOの課税通知書（Notice of Assessment）の発行後に差額を返金する保証があります。保証の対象は、TFN所得のあるタックスリターンに限られます。',
  },
]

const GUIDES = [
  {
    href: '/ja/blog/what-is-a-tax-agent',
    title: '登録タックスエージェントとは',
    desc: '日本の税理士との違いと、登録の確かめ方。',
  },
  {
    href: '/ja/blog/how-to-lodge-tax-return-from-overseas',
    title: '帰国後の申告',
    desc: '日本からでもできること、そして見落とされがちな口座のルール。',
  },
  {
    href: '/ja/blog/late-tax-return-penalty-working-holiday',
    title: '期限を過ぎた年度',
    desc: '10月31日を過ぎた申告の扱いと、ペナルティの考え方。',
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

/** 数字で確認するブロック。すべて適用日と出典名つき（2026年11月確認）。 */
const KEY_FIGURES = [
  {
    label: '所得税率：45,000ドルまで15%',
    body: '2026年7月1日から適用。2025-26年度から変わっていません。45,001ドルから135,000ドルは30%です。出典：ATO',
  },
  {
    label: '非課税枠はありません',
    body: 'ワーキングホリデーメーカーは非課税枠（tax-free threshold）を使えず、最初の1ドルから15%が適用されます。出典：ATO',
  },
  {
    label: 'TFNを雇用主に渡していない場合：45%',
    body: '申請中であることを雇用主に伝えていない場合、または28日を過ぎても番号を渡していない場合は、15%ではなく45%で源泉徴収されます。取られすぎた分を精算できるのはタックスリターンだけです。出典：ATO',
  },
  {
    label: 'メディケア税：課税所得の2%',
    body: 'メディケアの対象とならない期間は、Services Australiaが発行するMedicare Entitlement Statementで免除を申請できます。日本は相互医療協定（Reciprocal Health Care Agreement）の対象国ではありません。出典：ATO、Services Australia',
  },
  {
    label: '自分で提出する場合の期限：10月31日',
    body: '2025-26年度は2026年10月31日で、すでに過ぎています。2026-27年度は2027年10月31日です。期限後の年度も提出できます。出典：ATO',
  },
  {
    label: '還付金の振込先：オーストラリアの銀行口座',
    body: '海外から提出する場合も、還付金を受け取るにはオーストラリアの銀行口座が必要です。出典：ATO',
  },
]

const WA_TR = waUrl({ topic: 'tax-return', lang: 'ja' })

export default function TaxReturnPageJA() {
  const webPageLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}/ja/tax-return#webpage`,
    url: `${SITE_URL}/ja/tax-return`,
    name: 'オーストラリアのタックスリターン代行の流れ（417・462ビザ）',
    description:
      '417・462ビザのタックスリターンを提出するまでの流れ。ご用意いただくもの、当社が確認すること、署名の仕方、そして還付金が届く時期。',
    inLanguage: 'ja',
    dateModified: '2026-11-05',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#business` },
    speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.answer-first', '.hero-lede'] },
  }

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_URL}/ja/tax-return#service`,
    name: 'ワーキングホリデー向けタックスリターン代行',
    serviceType: 'タックスリターンの作成と提出',
    description:
      '417・462ビザ保持者のオーストラリアのタックスリターン。ATOに提出される前に、オーストラリアの登録タックスエージェントが確認し、承認します。帰国後の日本からのご依頼にも対応します。',
    provider: { '@id': `${SITE_URL}/#business` },
    areaServed: { '@type': 'Country', name: 'オーストラリア' },
    audience: { '@type': 'Audience', audienceType: 'ワーキングホリデーメーカー（サブクラス417・462）' },
    availableLanguage: ['ja', 'en', 'de', 'fr', 'it', 'es'],
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
              <span className={blocks.kicker}>オーストラリアのタックスリターン代行｜帰国後の日本からも対応</span>
              必要な情報と、還付金の振込先だけ。 <Mark>あとは当社が進めます。</Mark>
            </>
          }
        >
          <div className="hero-lede">
            <Lead>給与明細も、myGovのアカウントも、書式の読み解きも必要ありません。質問票に1回答えて、1回署名するだけです。還付金がある場合、ATOからの支払いは提出からおおむね14営業日が目安です。</Lead>
          </div>
          <WaButton href={WA_TR} position="hero" topic="tax-return" lang="ja">WhatsAppで相談する</WaButton>
          <p className={heroStyles.note}>約1時間で返信します。</p>
          <GoogleRating variant="pill" lang="ja" />
        </Hero>
      </div>

      <Section eyebrow="要点" title="ワーホリのタックスリターンは、帰国後でも依頼できます" titleId="answer-title">
        <div className="answer-first">
          <p className={blocks.text}>ワーキングホリデー（417・462ビザ）のオーストラリアのタックスリターンは、帰国後の日本からでも依頼できます。ご用意いただくのはパスポートとビザの情報、オーストラリアの銀行口座、働いた時期と場所のおおよそだけで、給与明細は不要です。申告書はATOの記録から作成し、ATOに提出される前に、オーストラリアの登録タックスエージェントが確認し、承認します。</p>
        </div>
        <p className={`${blocks.text} ${blocks.muted}`}>
          自分で提出する場合の期限は年度終了後の10月31日です。期限を過ぎた年度も、いまから提出できます。還付金はオーストラリアの銀行口座にのみ支払われます。年度ごとの期限と帰国後の扱いは
          <Link href="/ja/blog/tax-return-deadline-31-october-working-holiday" className={blocks.textLink}>タックスリターンはいつまでか</Link>
          にまとめています。
        </p>
      </Section>

      <PhotoFrame page="tax-return" locale="ja" />

      <Section tone="pale" eyebrow="数字で確認" title="ワーホリのタックスリターンに関わる数字（2026-27年度）" titleId="figures-title">
        <PlainRows items={KEY_FIGURES} />
        <p className={`${blocks.small} ${blocks.muted}`}>数字は適用日と出典名をあわせて記載しています。最終確認：2026年11月。</p>
      </Section>

      <Section eyebrow="還付金はどこから生まれるのか" title="ワーホリで還付金が生じることが多い理由" titleId="refund-title">
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
          どれも自動ではなく、決めつけもしません。提出前に、ひとつずつATOの記録と照らし合わせて確認します。TFNの45%については
          <Link href="/ja/tfn" className={blocks.textLink}>TFN申請</Link>、2%のメディケア税については
          <Link href="/ja/medicare" className={blocks.textLink}>メディケア税の免除</Link>をご覧ください。
          <Link href="/ja/calculator" className={blocks.textLink}>計算ツールで還付額の目安を見る</Link>。
        </p>
      </Section>

      <Section tone="pale" title="オーストラリアのタックスリターンは誰に頼めばいい？日本の税理士との違い" titleId="who-title">
        <p className={blocks.text}>日本でいう「税理士」に近い立場にあたるのが、オーストラリアではTPB（Tax Practitioners Board）に登録されたタックスエージェント（registered tax agent）です。ATOは、報酬を受けてタックスリターンを作成できるのは登録タックスエージェントだけだと案内しています。登録の有無はTPBの公開登録簿で確認できます。日本の税理士資格が、そのままオーストラリアで通用するわけではありません。</p>
        <p className={blocks.text}>Working Holiday Taxは、オーストラリアの登録タックスエージェントの監督のもとで運営しています。ATOに提出される前に、オーストラリアの登録タックスエージェントが確認し、承認します。ATOとのやり取りは当社が直接行います。料金は定額で、還付額に対する割合ではありません。</p>
        <p className={`${blocks.text} ${blocks.muted}`}>
          依頼先の選び方と役割の違いは<Link href="/ja/blog/what-is-a-tax-agent" className={blocks.textLink}>登録タックスエージェントの選び方</Link>で詳しく説明しています。
        </p>
        <WaButton href={WA_TR} position="section" topic="tax-return" lang="ja">WhatsAppで状況を伝える</WaButton>
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

      <Section id="how-it-works" tone="pale" eyebrow="進め方" title="どんな順序で進むのか" titleId="sequence-title">
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


      <Section title="タックスリターン代行の費用はどう決まるか" titleId="cost-title">
        <p className={blocks.text}>
          当社のタックスリターン代行の費用は定額で、還付額に対する割合で決まる歩合ではありません。還付が多くても少なくても料金は同じで、ATOから届く還付金から差し引くこともありません。
        </p>
        <p className={blocks.text}>
          料金は作業を始める前にWhatsAppで確定し、あとから追加されることはありません。代行を安さで比べるときは、金額だけでなく、歩合か定額か、還付金から差し引かれるか、還付が料金より少なかった場合にどうなるかもあわせて確認すると、実際の負担の違いが見えてきます。当社の場合は下の保証のとおりです。
        </p>
      </Section>

      <Section tone="amber" title="当社の保証" titleId="guarantee-title">
        <p className={blocks.statement} style={{ color: 'var(--wht-ink)' }}>
          当社の保証：還付金が当社の料金より少ない場合は、ATOの課税通知書（Notice of Assessment）の発行後に差額を返金します。還付がない場合、またはATOへの納税が発生した場合は、料金の全額をいただきます。この保証の対象は、TFN所得のあるタックスリターンに限られます。
        </p>
        <p className={blocks.text}>ATOから届く金額から差し引くことは一切ありません。料金は手順01の前にWhatsAppで確定するので、あとから変わることはありません。</p>
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
        <p className={`${blocks.text} ${blocks.onForest}`}>たとえば「2024年11月から2025年8月までワーホリでした。ケアンズのファームとメルボルンのカフェで働きました。ABNはありません。いまは日本にいます。」のような一文で十分です。</p>
        <WaButton href={WA_TR} position="section" topic="tax-return" lang="ja" tone="light">WhatsAppで相談する</WaButton>
        <p className={`${blocks.small} ${blocks.onForest}`}>約1時間で返信します。</p>
      </Section>

      <MobileCta href={WA_TR} lang="ja" topic="tax-return" />
    </>
  )
}
