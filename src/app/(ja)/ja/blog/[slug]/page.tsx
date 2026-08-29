/**
 * Japanese guide page. All template logic lives in LocaleGuidePage; this file
 * is the Japanese half of the config: strings, SEO data, and the CJK text
 * rules (denser characters, unspaced joining, ideographic punctuation). The
 * values reproduce the pre-merge Japanese page exactly (verified by
 * byte-comparing the built HTML of every /ja/blog page).
 */
import type { Metadata } from 'next'
import { catLabelJa } from '@/lib/category-labels'
import { formatGuideDateJa } from '@/lib/blog-dates'
import { getJapaneseGuide, jaCategoryMeta, blogUI } from '../data'
import {
  LocalizedGuidePage,
  buildGuideMetadata,
  localizedGuideStaticParams,
  type GuideLocaleConfig,
} from '@/components/blog/LocaleGuidePage'

/* Japanese text carries roughly twice the meaning per character, so the FAQ
   answer floor halves, and it runs unspaced, so blocks join with nothing. */
const FAQ_MIN_ANSWER_EN = 150
const FAQ_MIN_ANSWER_JA = 70
const isJa = (t: string) => /[぀-ヿ㐀-䶿一-鿿]/.test(t)

const cfg: GuideLocaleConfig = {
  locale: 'ja',
  basePath: '/ja',
  ogLocale: 'ja_JP',
  getGuide: getJapaneseGuide,
  categoryMeta: jaCategoryMeta,
  catLabel: catLabelJa,
  formatDate: formatGuideDateJa,
  englishOnlyNotice: blogUI.englishOnlyNotice,

  categoryKeywords: {
    'TFN': [
      'TFN 申請 ワーホリ',
      'タックスファイルナンバー 取得',
      'TFN 417ビザ',
      'TFN 462ビザ',
      'TFN タックスリターン 還付',
    ],
    'ABN': [
      'ABN 登録 ワーホリ',
      'Australian Business Number ワーホリ',
      'ワーホリ 個人事業主',
      'ABN 417ビザ',
      'ABN 462ビザ',
    ],
    'Tax Return': [
      'オーストラリア タックスリターン 還付金',
      'ワーホリ タックスリターン',
      'タックスリターン 還付 417ビザ',
      'タックスリターン 還付 462ビザ',
      'ワーホリ 帰国後 タックスリターン',
      'オーストラリア 確定申告 ワーホリ',
    ],
    'Super': [
      'スーパー 返金 オーストラリア',
      'DASP 申請',
      'スーパーアニュエーション 返金 ワーホリ',
      'Departing Australia Superannuation Payment',
      'スーパー 返金 417ビザ',
    ],
    'Work Rights': [
      'ワーホリ 労働者の権利 オーストラリア',
      'Fair Work オーストラリア ワーホリ',
      'ワーホリ 雇用条件',
      '417ビザ 労働条件',
      '462ビザ 労働条件',
    ],
    'Medicare & Other': [
      'メディケア 税 免除 ワーホリ',
      'メディケア ワーキングホリデー',
      'RHCA オーストラリア',
      'メディケア 免除 417ビザ',
      'メディケア 免除 462ビザ',
    ],
  },
  coreKeywords: [
    'オーストラリア タックスリターン 還付金',
    'オーストラリア ワーホリ 税金',
    'ワーキングホリデービザ オーストラリア',
    '417ビザ オーストラリア',
    '462ビザ オーストラリア',
    'バックパッカー 税金 オーストラリア',
    'WHM 税金',
    'WHV 税金',
  ],
  ldKeywords: (category) => [
    'Working Holiday Tax',
    'オーストラリア',
    '417ビザ',
    '462ビザ',
    category,
    'バックパッカー 税金',
  ],
  reviewedByDescription: 'Working Holiday Taxが作成した内容を確認し承認する登録税理士（registered tax agent）。',
  authorDescription: 'ワーキングホリデーメーカー（ビザサブクラス417・462）の税務サポートを専門とするオーストラリアのサービスです。',
  knowsAbout: [
    'オーストラリア税法',
    'ワーキングホリデービザ（サブクラス417・462）',
    'タックスファイルナンバー（TFN）',
    'オーストラリアビジネスナンバー（ABN）',
    'スーパーアニュエーション・DASP',
    'メディケア税',
    'フェアワーク（Fair Work Australia）',
  ],
  audienceName: 'オーストラリアのワーキングホリデービザ保持者（サブクラス417・462）',
  aboutThingName: 'オーストラリアのワーキングホリデービザ',
  serviceForCategory: {
    'TFN': {
      path: '/ja/tfn',
      label: 'TFNと申告フォームについて当社がすること',
      blurb: '番号の取得は無料で10分です。金額を左右するのは雇用主に出す申告フォームで、そこを当社が担当します。',
    },
    'ABN': {
      path: '/ja/abn',
      label: 'ABNで請求していた場合に当社がすること',
      blurb: '給与と請求による収入は課税の扱いも申告書での位置も異なります。この切り分けを正しく行うことが実際の作業です。',
    },
    'Tax Return': {
      path: '/ja/tax-return',
      label: 'すべてのタックスリターンで当社が確認すること',
      blurb: '税務上の居住区分、誤った税率で引かれていた期間、メディケア税の扱い、そして実際にした仕事に対応する控除。',
    },
    'Super': {
      path: '/ja/superannuation',
      label: '出国前にスーパーについて当社がすること',
      blurb: 'カジュアル勤務ではスーパーが複数のファンドに分散します。TFNからすべての口座を探し、正しい順序で一度に申請します。',
    },
    'Medicare & Other': {
      path: '/ja/medicare',
      label: 'メディケア税について当社がすること',
      blurb: 'メディケア税は自動的に引かれます。免除には自分で申請する証明書が必要で、ワーホリの申告で最も見落とされやすい項目です。',
    },
    'Work Rights': {
      path: '/ja/tax-return',
      label: 'すべてのタックスリターンで当社が確認すること',
      blurb: '給与や労働時間に関わることは、たいていタックスリターンにも表れます。',
    },
  },

  homeLabel: 'ホーム',
  blogLabel: 'ブログ',
  publishedLabel: '公開日 ',
  reviewedLabel: '確認日 ',
  readTimeLabel: (m) => `${m ?? ''}分で読めます`,
  whatsNextLabel: '次に読むもの',
  whatWeDoLabel: '当社がすること',
  viewAllLabel: (label) => `${label}の記事をすべて見る →`,
  aside: {
    label: 'このガイドについて',
    p1: '417・462ビザ保持者だけを専門に扱うWorking Holiday Taxチームが執筆し、ATOおよびFair Workの最新ガイダンスに基づいて確認しています。一般的な情報であり、個別の税務アドバイスではありません。',
    p2: '申告書は、ATOへ提出する前に登録税理士が確認し、承認します。',
  },

  styles: {
    h1: { lineHeight: 1.2, letterSpacing: '-0.02em' },
    leadLineHeight: 1.8,
    noticeLineHeight: 1.75,
    asideLabel: { fontSize: '13px', fontWeight: 700, color: '#0B5240', letterSpacing: '0.08em' },
    asideBodyLineHeight: 1.85,
    asideDateLineHeight: 1.7,
    relatedHeader: { fontSize: '13px', fontWeight: 700, color: '#0B5240', letterSpacing: '0.08em' },
    relatedTitleLineHeight: 1.45,
    relatedDescLineHeight: 1.8,
    serviceLabel: { fontSize: '13px', fontWeight: 700, color: '#0B5240', letterSpacing: '0.08em' },
  },

  faq: {
    minAnswer: (text) => (/[぀-ヿ㐀-䶿一-鿿]/.test(text) ? FAQ_MIN_ANSWER_JA : FAQ_MIN_ANSWER_EN),
    listAsSentence: (items) => {
      const cleaned = items.map(i => i.replace(/[;,.\s、。]+$/, '').trim()).filter(Boolean)
      if (cleaned.length === 0) return ''
      const japanese = /[぀-ヿ㐀-䶿一-鿿]/.test(cleaned.join(''))
      return japanese ? `${cleaned.join('、')}。` : `${cleaned.join('; ')}.`
    },
    trimToSentence: (text, max) => {
      if (text.length <= max) return text
      const slice = text.slice(0, max)
      const cut = Math.max(slice.lastIndexOf('. '), slice.lastIndexOf('。'), slice.lastIndexOf('! '), slice.lastIndexOf('? '))
      if (cut > max * 0.5) return slice.slice(0, cut + 1).trim()
      // A truncated Japanese answer ends with the ideographic full stop, not '.'.
      if (isJa(slice)) return `${slice.replace(/[\s、]+[^、。]*$/, '').trim()}。`
      return `${slice.replace(/\s+\S*$/, '').trim()}.`
    },
    joinBlocks: (a, b) => (isJa(a) || isJa(b) ? `${a}${b}` : `${a} ${b}`),
    colonCut: (out) => Math.max(out.lastIndexOf('. '), out.lastIndexOf('。')),
    terminalPunctuation: () => '。',
    endsWithPunctuation: /[.!?。！？]$/,
    headingColon: /[.:!?：。]$/,
  },
  howToNameMax: 30,
  isQuestionPost: (slug, title) => {
    // Original English question patterns from slug (titles are translated).
    const questionSlugPatterns = [
      'what-', 'when-', 'why-', 'can-', 'do-you-', 'does-', 'should-',
      'is-', 'are-', 'will-', 'has-', 'have-', 'how-many-', 'how-much-',
      'how-long-',
    ]
    if (questionSlugPatterns.some(p => slug.startsWith(p))) return true
    if (title.includes('？') || title.includes('?')) return true
    if (title.endsWith('か')) return true
    return false
  },
  orgEntities: [
    { match: /\bATO\b|Australian Taxation Office|オーストラリア税務署|オーストラリア国税局/, name: 'Australian Taxation Office', sameAs: 'https://www.ato.gov.au/' },
    { match: /Fair Work|フェアワーク/i, name: 'Fair Work Ombudsman', sameAs: 'https://www.fairwork.gov.au/' },
    { match: /\bABR\b|Australian Business Register/, name: 'Australian Business Register', sameAs: 'https://www.abr.gov.au/' },
    { match: /Services Australia|Medicare|メディケア/, name: 'Services Australia', sameAs: 'https://www.servicesaustralia.gov.au/' },
    { match: /Department of Home Affairs|内務省/, name: 'Department of Home Affairs', sameAs: 'https://www.homeaffairs.gov.au/' },
    { match: /myGov|MyGov/, name: 'myGov', sameAs: 'https://my.gov.au/' },
  ],
  placeEntities: [
    { match: /\bSydney\b|シドニー/, name: 'Sydney', sameAs: 'https://en.wikipedia.org/wiki/Sydney' },
    { match: /\bMelbourne\b|メルボルン/, name: 'Melbourne', sameAs: 'https://en.wikipedia.org/wiki/Melbourne' },
    { match: /\bBrisbane\b|ブリスベン/, name: 'Brisbane', sameAs: 'https://en.wikipedia.org/wiki/Brisbane' },
    { match: /\bPerth\b|パース/, name: 'Perth', sameAs: 'https://en.wikipedia.org/wiki/Perth' },
    { match: /\bAdelaide\b|アデレード/, name: 'Adelaide', sameAs: 'https://en.wikipedia.org/wiki/Adelaide' },
    { match: /\bDarwin\b|ダーウィン/, name: 'Darwin', sameAs: 'https://en.wikipedia.org/wiki/Darwin,_Northern_Territory' },
    { match: /\bCairns\b|ケアンズ/, name: 'Cairns', sameAs: 'https://en.wikipedia.org/wiki/Cairns' },
    { match: /\bCanberra\b|キャンベラ/, name: 'Canberra', sameAs: 'https://en.wikipedia.org/wiki/Canberra' },
    { match: /\bHobart\b|ホバート/, name: 'Hobart', sameAs: 'https://en.wikipedia.org/wiki/Hobart' },
    { match: /Gold Coast|ゴールドコースト/, name: 'Gold Coast', sameAs: 'https://en.wikipedia.org/wiki/Gold_Coast,_Queensland' },
  ],
  whvMention: /Working Holiday|417|462|WHV|ワーキングホリデー|ワーホリ/,
}

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return localizedGuideStaticParams()
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return buildGuideMetadata(cfg, (await params).slug)
}

export default async function JapaneseGuidePage({ params }: Props) {
  return <LocalizedGuidePage cfg={cfg} slug={(await params).slug} />
}
