import { newLocaleLanguages } from '@/lib/locale-pages'
import type { Metadata } from 'next'
import { waUrl } from '@/lib/wa'
import { ContactView, type ContactCopy } from '@/components/wht/ContactBlocks'
import { Mark } from '@/components/wht/Type'
import { WA_NUMBER, EMAIL, SITE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'お問い合わせ：担当者が直接返信します',
  description: 'WhatsAppで送ってください。営業時間内ならだいたい1時間以内に担当者が返信します。myGovもIDも給与明細も必要ありません。',
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
      ...newLocaleLanguages('/contact'),
      'x-default': `${SITE_URL}/contact`,
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Working Holiday Tax Refund Australia' }],
    title: 'お問い合わせ｜Working Holiday Tax',
    description: 'WhatsAppが一番早い連絡方法です。営業時間内なら、だいたい1時間以内に担当者が返信します。',
    url: `${SITE_URL}/ja/contact`,
    type: 'website',
    siteName: 'Working Holiday Tax',
    locale: 'ja_JP',
  },
  twitter: {
    images: [`${SITE_URL}/og-image.png`],
    card: 'summary_large_image',
    title: 'お問い合わせ｜Working Holiday Tax',
    description: 'WhatsAppでメッセージを送ってください。だいたい1時間以内に担当者が返信します。',
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
    a: 'はい。むしろ業務の大きな部分がそれです。すでに終わった年度のタックスリターンは世界のどこからでも提出できますし、スーパーアニュエーションは出国してビザが失効した後でなければ請求できません。\n\n1点だけ先に。ATOはタックスリターンの還付金をオーストラリアの銀行口座にしか支払えませんが、スーパー（DASP）は海外の口座で受け取れます。オーストラリアの口座をすでに解約している場合は、その旨をお知らせください。',
  },
  {
    q: 'myGovのアカウントは必要ですか？',
    a: 'いりません。myGovにログインしたり、オーストラリアのIDを連携したり、どの書類がどれなのかを調べたりする必要は一切ありません。ATOとのやり取りはこちらで行います。\n\nすでに試して本人確認のところで止まってしまった方も、それで変わることはありません。',
  },
  {
    q: '給与明細（ペイスリップ）は必要ですか？',
    a: 'いりません。ご連絡の前に用意していただくものは何もありません。雇用主が源泉徴収して報告した内容はATOを通じて私たちに見えるので、手元に何も残っていなくても、そのままご連絡ください。',
    link: { href: '/ja/about', label: 'ATOの記録から始める理由' },
  },
  {
    q: 'この会社は信用できますか？',
    a: '申告書は、ATOへ提出する前に登録タックスエージェントが確認して承認します。ご同意いただく契約条件はクライアント規約にすべて掲載していますし、Googleのレビューは実際にお手伝いしたワーホリの方々によるものです。',
    link: { href: '/ja/client-agreement', label: 'クライアント規約を読む' },
  },
]

const FAQS = [
  {
    question: '返信はどのくらいで来ますか？',
    answer: '営業時間内、月曜から金曜の9時から18時であれば、だいたい1時間以内にご返信します。営業時間外にいただいたご連絡には、翌営業日の朝一番でお返事します。確認が必要な内容であれば、その旨をすぐお伝えします。',
  },
  {
    question: '質問するだけで料金はかかりますか？',
    answer: 'ご質問は無料で、決める前に何度でも聞いていただけます。サービス自体は定額制で、還付金に対する歩合ではありません。料金は作業を始める前にWhatsAppで必ずご確認いただきます。',
  },
  {
    question: '返信は何語で来ますか？',
    answer: 'あなたが書いた言語で返ってきます。日本語でも英語でも、ご自分の状況を一番説明しやすい言語でお書きください。',
  },
  {
    question: 'すぐに書類を送る必要がありますか？',
    answer: 'ありません。まずはご質問だけをお送りください。こちらでお答えし、進める価値のある作業があれば、その内容と料金を着手前にお伝えします。\n\n書類はその後、進めると決めていただいてからで、何をどのように安全に送ればよいかを具体的にご案内します。',
  },
  {
    question: '還付がなかった場合はどうなりますか？',
    answer: '当社の保証：還付金が当社の料金より少ない場合は、ATOの課税通知書（Notice of Assessment）の発行後に差額を返金します。還付がない場合、またはATOへの納税が発生した場合は、料金の全額をいただきます。すべてのワーホリの1年に還付が出るわけではありませんし、見込みが薄いのであれば、引き受けて期待させるより先にお伝えします。',
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
  description: 'WhatsAppでメッセージを送ってください。営業時間内なら、だいたい1時間以内に担当者が返信します。',
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

const copy: ContactCopy = {
  lang: 'ja',
  wa: WA,
  email: EMAIL,
  mailtoHref: `mailto:${EMAIL}?subject=%E3%82%A6%E3%82%A7%E3%83%96%E3%82%B5%E3%82%A4%E3%83%88%E3%81%8B%E3%82%89%E3%81%AE%E3%81%94%E8%B3%AA%E5%95%8F`,
  homeHref: "/ja",
  homeLabel: "ホーム",
  crumbsLabel: "パンくずリスト",
  crumbLabel: "お問い合わせ",
  kicker: "お問い合わせ",
  h1: <><Mark>WhatsApp</Mark>で相談する</>,
  lead: "メッセージを読んで返信するのは担当者です。営業時間内なら、だいたい1時間以内にお返事します。",
  ctaHero: "WhatsAppを開く →",
  hours: "月曜から金曜、9時から18時",
  blockersEyebrow: "送る前に",
  blockersTitle: "みなさんが最初に確認する4つのこと",
  blockers,
  otherEyebrow: "その他の方法",
  otherTitle: "WhatsAppが使いにくい場合は",
  otherIntro: "メールでもSNSでもご連絡いただけます。ただ、どちらも返信は遅くなります。",
  emailLabel: "メール",
  hoursTitle: "営業時間",
  faqEyebrow: "よくあるご質問",
  faqTitle: "その他によく聞かれること",
  faqs: FAQS,
  closingEyebrow: "準備ができたら、いつでも",
  closingTitle: "まず質問を送る。最初の一歩はそれだけです。",
  closingText: "どこで働いたか、だいたいの時期、そしてもう出国したかどうか。それだけ分かれば、何を追いかける価値があるかをお伝えできます。",
  ctaFooter: "WhatsAppで相談する →",
}

export default function JapaneseContactPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <ContactView t={copy} />
    </>
  )
}
