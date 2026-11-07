import { newLocaleLanguages } from '@/lib/locale-pages'
import type { Metadata } from 'next'
import Link from 'next/link'
import { waUrl } from '@/lib/wa'
import { AboutView, type AboutCopy } from '@/components/wht/AboutBlocks'
import { Mark } from '@/components/wht/Type'
import { blocks } from '@/components/wht/Blocks'
import { SITE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: '運営者情報：417・462ビザ専門です',
  description: 'ワーホリの税金だけを扱っています。お客様は全員417または462ビザの方。最初の給与明細から帰りの飛行機まで、私たちが見ている1年の話です。',
  keywords: [
    'ワーホリ 税金 専門 オーストラリア',
    'バックパッカー 税金 サポート',
    'Working Holiday Tax とは',
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
      ...newLocaleLanguages('/about'),
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
    body: 'ホステル、SIMカード、銀行口座、そしてできるだけ早く仕事。TFN（タックスファイルナンバー）もリストのどこかにはありました。オーストラリアの会計年度の仕組みを説明してくれる人は誰もいませんでした。',
  },
  {
    stage: '最初の給与明細',
    title: 'TFNが届く前に、最初の仕事が始まった',
    body: 'TFNが登録されていないと、雇用主は通常の税率ではなく、最も高い税率で源泉徴収することが義務づけられています。だから最初の数週間分は、半分近くが引かれています。\n\nこの分は、自動で戻ってくるものではありません。',
  },
  {
    stage: 'クリスマスまでに',
    title: '雇用主は4つ、半分はカジュアル、誰も何も教えてくれない',
    body: 'ホステルの仕事、カフェ、3週間だけの倉庫、そして最後の給与明細をもらえないまま辞めた仕事。オーストラリアの会計年度は、12月ではなく6月に終わります。\n\n給与明細をなくしていても問題ありません。雇用主が報告した内容は、ATOを通じて私たちに見えます。',
  },
  {
    stage: '88日',
    title: '88日をやり遂げたなら、そのためにかなり遠くまで行ったはずです',
    body: '西へ、北へ、聞いたこともない町からさらに3時間。\n\n宿泊費は受け取る前の給料から直接引かれ、給与明細も都市部のものとは形が違っていて、この期間についてはみなさん一番自信がありません。',
  },
  {
    stage: '帰りの飛行機',
    title: 'あなたは帰国し、手続きだけが残った',
    body: 'スーパーアニュエーションは、オーストラリアを出国してビザが失効した後でなければ請求できません。だからあなたの分は、自分で選んだ覚えもないファンドに預けられたままの場合があります。最初の数週間に引かれた税金も、精算されていないことがあります。',
  },
]

const faqs = [
  {
    question: 'どんな人を対象にしているのですか？',
    answer: 'ワーキングホリデーの方だけです。お客様は全員、417または462ビザでオーストラリアにいる方か、かつてそのビザで滞在して現在は帰国された方です。オーストラリアの永住者や市民権をお持ちの方、学生ビザの方、就労ビザの方、法人のお客様はお受けしていません。',
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
    answer: '当社の保証：還付金が当社の料金より少ない場合は、ATOの課税通知書（Notice of Assessment）の発行後に差額を返金します。還付がない場合、またはATOへの納税が発生した場合は、料金の全額をいただきます。この保証の対象は、TFN所得のあるタックスリターンに限られます。すべてのワーホリの1年に還付が出るわけではないので、見込みが薄いのであれば、引き受けて期待させるより先にお伝えします。',
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

const copy: AboutCopy = {
  lang: 'ja',
  wa: WA,
  homeHref: "/ja",
  homeLabel: "ホーム",
  crumbsLabel: "パンくずリスト",
  crumbLabel: "当社について",
  kicker: "当社について",
  h1: (
    <>
      計画は持って来ました。<br />税金の話は、<Mark>誰もしてくれませんでした。</Mark>
    </>
  ),
  lead: "私たちはワーホリの税金だけを扱っています。下の1年に心当たりがあるなら、税金とスーパーの状況を見直してみる価値があるかもしれません。",
  ctaHero: "なんでも聞いてください →",
  contactHref: "/ja/contact",
  contactLabel: "その他の連絡方法 →",
  replyNote: "返信するのは担当者です。営業時間内なら、だいたい1時間以内にお返事します。",
  yearEyebrow: "ワーホリの1年",
  yearTitle: "私たちから見たワーホリの1年は、どんな形をしていますか？",
  yearIntro: "417・462ビザのほぼ全員に、おおよそこの順番で5つのことが起きます。そのうち4つは、あとから調整できることが多いお金の話です。",
  chapters,
  whyEyebrow: "私たちが存在する理由",
  whyTitle: "なぜワーキングホリデーの方だけを扱うのですか？",
  whyParas: [
    "お客様は全員417または462ビザの方なので、あなたの還付額を左右する要素は、調べ直さなければならない珍しいケースではありません。毎日それを見ています。",
    "一般の会計士がバックパッカーに会うのは、7月に、200件の普通の申告の合間に、年に数回あるかどうかです。",
    "417・462の税率表、思い込みで済ませずきちんと確認すべき居住区分の判断、個々の事情で変わるメディケア免除、出国から11か月後に東京や大阪の自室から出すスーパーアニュエーションの請求。私たちにとっては、どれもごく普通の1日の仕事です。",
    "送信ボタンを押すだけなら誰にでもできます。仕事はその前にあります。あなたの1年を洗い直し、手早く済む選択肢ではなく正しいほうを確かめ、そのうえで申告書を準備します。",
    "Working Holiday Taxは登録タックスエージェントの監督のもとで運営されており、申告書はATOへ提出する前に登録タックスエージェントが確認して承認します。",
  ],
  guarantee: "当社の保証：還付金が当社の料金より少ない場合は、ATOの課税通知書（Notice of Assessment）の発行後に差額を返金します。還付がない場合、またはATOへの納税が発生した場合は、料金の全額をいただきます。この保証の対象は、TFN所得のあるタックスリターンに限られます。",
  guaranteeNote: "すべてのワーホリの1年に還付が出るわけではありません。見込みが薄い場合は、そのこともお伝えします。",
  talkEyebrow: "ご連絡について",
  talkTitle: "どうやって連絡すればいいですか？",
  talkP1: "WhatsAppです。チケット番号も、「5から7営業日お待ちください」という自動返信もありません。質問ひとつだけ送って、それで終わりにしても構いません。",
  talkP2: (
    <>
      始めるのにmyGovのアカウントも、オーストラリアのIDも、給与明細も必要ありませんし、オーストラリアに滞在中でも、帰国して2年経っていても同じです。返信が何語で来るか、そのあと何が起きるかは{' '}
      <Link href="/ja/contact" className={blocks.textLink}>お問い合わせページ</Link>{' '}
      に、申告の進め方は{' '}
      <Link href="/ja/tax-return" className={blocks.textLink}>タックスリターンの流れ</Link>{' '}
      にまとめています。
    </>
  ),
  ctaSection: "WhatsAppで相談する →",
  reviewsEyebrow: "実際の声",
  reviewsTitle: "ワーホリ参加者からのお声",
  faqEyebrow: "よくあるご質問",
  faqTitle: "メッセージを送る前によく聞かれること",
  faqIntro: "ほかにも気になることがあれば、WhatsAppで聞いてください。読むより早いです。",
  faqs,
  closingEyebrow: "準備ができたら、いつでも",
  closingTitle: "あなたの1年を聞かせてください",
  closingText: "どこで働いたか、だいたいの時期、そしてもう出国したかどうか。それだけ分かれば、何を追いかける価値があるかをお伝えできます。",
  ctaFooter: "WhatsAppで相談する →",
}

export default function JapaneseAboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <AboutView t={copy} />
    </>
  )
}
