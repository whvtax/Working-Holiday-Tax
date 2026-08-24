import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/lib/constants'
import { MobileCta } from '@/components/ui/MobileCta'
import { WaLink } from '@/app/HomeWa'
import { waUrl } from '@/lib/wa'

export const metadata: Metadata = {
  "title": "飲食の経費控除：RSA、靴、制服、チップ",
  "description": "バー、カフェ、レストラン、キッチンで働く人が控除できるもの。RSAの更新、滑り止めの靴、コックコート、制服の洗濯を解説します。",
  "keywords": [
    "飲食 税金 控除 オーストラリア",
    "カフェ ワーホリ タックスリターン",
    "バーテンダー 控除 オーストラリア",
    "シェフ 控除 オーストラリア",
    "RSA 資格 控除",
    "仕事靴 控除 ATO",
    "チップ 課税 オーストラリア",
    "ワーホリ 飲食 税金"
  ],
  "alternates": {
    "canonical": "/ja/expenses/hospitality",
    "languages": {
      "en-AU": "/expenses/hospitality",
      "de": "/de/expenses/hospitality",
      "ja": "/ja/expenses/hospitality",
      "x-default": "/expenses/hospitality"
    }
  },
  "openGraph": {
    "images": [
      {
        "url": `${SITE_URL}/og-image.png`,
        "width": 1200,
        "height": 630,
        "alt": "Working Holiday Tax"
      }
    ],
    "type": "website",
    "locale": "ja_JP",
    "url": `${SITE_URL}/ja/expenses/hospitality`,
    "siteName": "Working Holiday Tax",
    "title": "飲食の経費控除：RSA、靴、制服、チップ",
    "description": "滑り止めの靴とコックコートは控除できます。店が指定する黒一色の服は控除できません。"
  },
  "twitter": {
    "images": [
      `${SITE_URL}/og-image.png`
    ],
    "card": "summary_large_image",
    "title": "飲食の経費控除：RSA、靴、制服、チップ",
    "description": "滑り止めの靴とコックコートは控除できます。店が指定する黒一色の服は控除できません。"
  },
  "robots": {
    "index": true,
    "follow": true,
    "googleBot": {
      "index": true,
      "follow": true,
      "max-snippet": -1,
      "max-image-preview": "large"
    }
  }
}

const WA = waUrl({ topic: 'expenses', lang: "ja", detail: "飲食、バー、キッチンの仕事" })

const UI = {
  "ctaLabel": "WhatsAppで相談する",
  "ctaSub": "約1時間で返信します。",
  "guaranteeHeading": "還付金が当社の料金を下回った場合は、差額を返金します。お客様が損をすることはありません。",
  "guaranteeBody": "4店舗、4通のインカムステートメント、4つのファンドに散ったスーパー。飲食では珍しくない1年で、お客様は全員417・462ビザの方です。申告書は、ATOへ提出する前に登録税理士が確認して承認します。",
  "faqHeading": "よくある質問",
  "guidesHeading": "次に読むと役に立つガイド",
  "otherJobs": "別の仕事の場合は、職種別の一覧へ。",
  "servicesLabel": "サイト内の関連ページ",
  "wrongLabel": "控除できないのに申告されがちなもの",
  "missedLabel": "控除できるのに申告されないもの",
  "disclaimer": "これは一般的な情報であり、個別の税務アドバイスではありません。何を控除できるかは、雇用主、手元の記録、実際の働き方によって変わります。当社にご依頼いただいた場合は、あなたの状況を一つずつ確認し、控除できるものはすべて申告し、できないものは申告しません。",
  "hubHref": "/ja/expenses"
}

const CRUMBS = [
  {
    "name": "ホーム",
    "item": "/ja"
  },
  {
    "name": "控除",
    "item": "/ja/expenses"
  },
  {
    "name": "飲食",
    "item": "/ja/expenses/hospitality"
  }
]

const HERO = {
  "kicker": "バー、カフェ、レストラン、キッチン",
  "h1lead": "滑り止めの靴は控除できます。",
  "h1accent": "黒一色の服はできません。",
  "lede": "控除リストが短いぶん、飲食の申告でお金が動くのは収入側です。複数の店舗、複数の源泉徴収率、複数のファンドに散ったスーパー。"
}

type Section =
  | { kind: 'answer'; h2: string; paras: string[] }
  | { kind: 'items'; h2: string; intro: string; items: { t: string; d: string }[] }
  | { kind: 'traps'; h2: string; intro: string; wrong: { t: string; d: string }[]; missed: { t: string; d: string }[] }
  | { kind: 'numbered'; h2: string; intro: string; steps: string[]; note?: string }
  | { kind: 'tables'; h2: string; intro: string; tables: { label: string; rows: string[][] }[]; note?: string }
  | { kind: 'occupations'; h2: string; intro: string; jobs: { href: string; title: string; line: string }[] }
  | { kind: 'note'; label: string; title: string; body: string }

const SECTIONS: Section[] = [
  {
    "kind": "answer",
    "h2": "バー、カフェ、キッチンで働く人は何を控除できますか？",
    "paras": [
      "控除できるのは、滑り止めの保護靴、コックコートやチェック柄のコックパンツのような職種特有の衣類、雇用主のロゴが入った必須制服の洗濯、RSAやFood Safety Supervisor資格の更新、そして自費で買ったキッチン道具です。それ以外のクローゼットの中身は普通の衣類です。",
      "飲食には、その仕事だけに固有のものがほとんどありません。屋内で働き、道具は雇用主が用意し、店が求める服装はたいてい誰がどこでも着られるものです。飲食の申告で金額が動くのは控除より、複数の雇用主にまたがる源泉徴収であることが多いです。"
    ]
  },
  {
    "kind": "items",
    "h2": "この仕事に固有の控除",
    "intro": "衣類には一般的な条件に加えてもう1つ条件があり、飲食のもめごとはほぼそこで起きます。",
    "items": [
      {
        "t": "滑り止めの、つま先が覆われた保護靴",
        "d": "必要とする現場なら控除できます。バックバーの濡れた床、コーヒーマシン周りの液体、キッチンのパスを横切って運ぶ熱い皿など。普通の靴ではなく保護靴として扱われるのは、具体的な安全上の役割を果たしているからで、色は関係ありません。"
      },
      {
        "t": "コックコートとチェック柄のコックパンツ",
        "d": "職種特有の衣類、つまり特定の職業の人だと分かる服で、他の場所で着れば場違いになるものです。ロゴ入り制服とは別に認められたカテゴリーで、シェフには衣類の控除があり、ウェイターには通常ないのはこのためです。"
      },
      {
        "t": "ロゴ入り必須制服の洗濯",
        "d": "雇用主がロゴ入り、または明確に識別できるデザインの制服を義務づけている場合、洗濯が控除できます。仕事着だけの洗濯なら1回1ドル、私服と一緒なら1回50セントです。年間の洗濯控除が150ドルを超えたら、概算ではなく簡単な記録が必要です。"
      },
      {
        "t": "RSAやFood Safety Supervisorの更新",
        "d": "すでに持っている資格を、その資格が必要な仕事に就いている状態で更新する費用は控除できます。最初の取得は控除できません。それは仕事に就く資格を得るための費用で、仕事をするための費用ではないからです。ATOは最初の運転免許にも同じ考え方を使います。"
      },
      {
        "t": "自費で買った包丁やキッチン道具",
        "d": "ナイフケース、自前の包丁、温度計、スライサー。1点300ドル以下なら購入年に全額控除できます。合計300ドル以上のセットとして買った場合は1つの資産として扱われ、個々の品が300ドル未満でも耐用年数にわたって配分します。"
      },
      {
        "t": "自費で買ったエプロン、手袋、保護具",
        "d": "耐熱手袋、耐切創手袋、保護用エプロン。仕事の危険から身を守るもので、雇用主が支給も払い戻しもしていない場合に控除できます。"
      }
    ]
  },
  {
    "kind": "answer",
    "h2": "飲食の控除には何の裏づけが要りますか？",
    "paras": [
      "テストはどこでも同じ3つです。自分のお金だったこと、返してもらっていないこと、申告する収入を得るために使ったこと。店舗なら、靴とナイフケースの領収書、制服規程の文書、そして洗濯が増えてきたときの回数のメモです。",
      "領収書、請求書、銀行明細、スマホの写真のいずれでも、金額、日付、支払先、内容が分かれば足ります。5年間は保管してください。その年の仕事関連の控除が合計300ドル以下なら、書面の証拠は不要です。ナイフセットを一度に償却するか耐用年数で配分するかを決める300ドルとは、別のルールです。"
    ]
  },
  {
    "kind": "traps",
    "h2": "飲食で働く人がよく間違えることは？",
    "intro": "衣類のルールは、理不尽に感じるからこそ全員が引っかかります。取りこぼしのほうは目立たず、経費より賃金にまつわるものが中心です。",
    "wrong": [
      {
        "t": "店が指定する黒一色の服",
        "d": "無地の黒いパンツ、無地の黒いシャツ、ロゴのない黒い靴。仕事のためだけに持っていて、自分では選ばず、それがないと帰されます。それでも関係ありません。ATOが見るのは品物であり、誰がどこでも着られる普段着はドレスコードが何と言おうと私的な支出です。"
      },
      {
        "t": "最初のRSA",
        "d": "仕事に就く前に払った資格の費用は、雇ってもらえる状態になるための費用であり私的なものです。働き始めて、続けるために更新が必要になった時点で更新費用は控除できます。"
      },
      {
        "t": "接客基準のための美容院、身だしなみ、化粧品",
        "d": "身だしなみは、店に文書化された基準があっても私的なままです。飲食において髪を切る費用が仕事の経費になるパターンはありません。"
      },
      {
        "t": "シフト中の食事や閉店後の1杯",
        "d": "まかないも閉店後の飲み物も私的です。自分で払っても、割引でも、無料でも同じです。仕事中に食べたからといって、食事が控除になることはありません。"
      },
      {
        "t": "申告から抜けた現金のチップ",
        "d": "これは逆方向の間違いです。直接手渡されたチップは、誰も記録していなくても課税対象の収入です。プールされたチップやサービス料が給与経由で支払われている場合はすでにインカムステートメントに入っていますが、現金は自分で申告するもので、任意ではありません。"
      }
    ],
    "missed": [
      {
        "t": "1年分の制服の洗濯",
        "d": "週に数ドルですが、シャツを洗うことが税金の話だと思う人がほとんどいないため、ほぼ誰も申告しません。1年分のシフトでは実際の金額になりますし、ATOが単価を公表しているので概算する必要もありません。"
      },
      {
        "t": "「服は無理」だと思って諦める滑り止めの靴",
        "d": "飲食の衣類は控除できないという正しい情報を読み、それを保護靴にまで誤って当てはめてしまう例です。保護靴は別のカテゴリーで、控除できます。"
      },
      {
        "t": "2つ目、3つ目の雇用主の誤った源泉徴収",
        "d": "店があなたのTax File Number Declarationを受け取っていない、またはワーキングホリデーメーカーの雇用主として登録していない場合、15%よりはるかに多く徴収されます。失われるわけではありませんが、すべての雇用主をまとめた申告をして初めて戻ります。"
      },
      {
        "t": "3つの基金に散らばったスーパーアニュエーション",
        "d": "どの店も最初の1ドルから給与とは別に12%のスーパーを払い、月額の最低基準もありません。カジュアルを4つ掛け持ちすれば口座が4つになり、それぞれ手数料がかかりますが、多くの人は1つしか見つけられません。"
      },
      {
        "t": "制服代を違法に天引きしていた店",
        "d": "控除の話ではありません。制服、洗濯、破損、レジの不足分などを賃金から差し引くのはFair Work Actのもとでほぼ違法で、これは税ではなく返金の問題です。"
      }
    ]
  },
  {
    "kind": "answer",
    "h2": "調べるのではなく判断が要るのはどこですか？",
    "paras": [
      "まず衣類です。ある品が必須制服かどうかは、どれだけ識別性があるか、雇用主が義務づけているかで決まります。靴が保護具かどうかは、あなたの店にある危険で決まります。制服規程の文書と品物の写真があれば、たいていどちらかに結論が出ます。",
      "専門家の目が効くのは収入側です。ワーキングホリデーメーカーには非課税枠がないので、非課税枠がある前提で源泉徴収した店は徴収が不足し、あとで納税額として跳ね返ります。ただしAddy判決が適用されるなら、その前提は変わります。イギリス、ドイツ、日本のパスポート保持者で税務上オーストラリア居住者だった人に起こりうることです。ご本人の状況によって決まるため、きちんと確認する必要があります。"
    ]
  }
]

const FAQS = [
  {
    "question": "黒い仕事靴とパンツは控除できますか？",
    "answer": "ロゴのない無地の黒い衣類は、店のドレスコードで指定されていても控除できません。ATOが制服ではなく普通の衣類として扱うためです。滑り止めでつま先が覆われた靴は別です。バックバーの濡れた床や忙しいキッチンのパスのために必要なら、保護靴として色に関係なく控除できます。"
  },
  {
    "question": "RSAの費用は控除できますか？",
    "answer": "すでに持っているRSAを、それが必要な仕事をしている状態で更新する費用は控除できます。最初の取得は控除できません。それは雇ってもらえる状態になるための費用であって、すでに就いている仕事をするための費用ではないからです。Food Safety Supervisor資格や最初の運転免許にも同じ区別が当てはまります。"
  },
  {
    "question": "チップは課税されますか？",
    "answer": "はい、すべてです。給与経由で支払われるチップやサービス料は、プールやトロンク方式であっても給与の一部で、すでに課税済みでインカムステートメントにも載っています。直接手渡される現金も同じく課税対象ですが、誰も記録していないので、簡単なメモを付けて自分で合計を申告する必要があります。"
  },
  {
    "question": "3店舗で働いています。税金は変わりますか？",
    "answer": "店ごとに別の雇用主で、それぞれにTax File Number Declaration、それぞれの源泉徴収、それぞれのインカムステートメントがあり、そのすべてが同じ1つの申告に入ります。ワーキングホリデーメーカーはどの雇用主からも非課税枠を受けられないので、非課税枠がある前提で源泉徴収した店は、還付ではなく納税額を残します。すべての店を正しい税率でまとめるのが、当社の仕事です。"
  },
  {
    "question": "カジュアルの仕事でもスーパーはもらえますか？",
    "answer": "はい。雇用主はカジュアルでも最初の1ドルから、給与とは別に12%のスーパーを支払います。月額の最低収入基準はありません。店ごとに独立して支払われるので、掛け持ちすると複数の基金に分散するのが普通です。オーストラリアを離れる前に探し出しておく価値があります。"
  }
]

const GUIDES = [
  {
    "href": "/ja/blog/hospitality-award-working-holiday-makers",
    "label": "Hospitality Awardと本来もらえる時給",
    "desc": "カジュアル手当と割増、店側が間違えやすい点。"
  },
  {
    "href": "/ja/blog/uniform-laundry-deductions-illegal-australia",
    "label": "制服代やクリーニング代を給料から引かれたら",
    "desc": "違法な天引きの見分け方と、取り戻し方。"
  },
  {
    "href": "/ja/blog/tax-deductions-working-holiday-makers",
    "label": "ワーキングホリデーの控除リスト",
    "desc": "すべてのカテゴリーと、ATOが認めないもの。"
  }
]

const SERVICES = [
  {
    "href": "/ja/tax-return",
    "label": "タックスリターン"
  },
  {
    "href": "/ja/tfn",
    "label": "TFN"
  },
  {
    "href": "/ja/superannuation",
    "label": "スーパーアニュエーション"
  }
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map(f => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: { '@type': 'Answer', text: f.answer },
  })),
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: CRUMBS.map((b, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: b.name,
    item: `${SITE_URL}${b.item === '/' ? '' : b.item}`,
  })),
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: "飲食の経費控除：RSA、靴、制服、チップ",
  description: "滑り止めの靴とコックコートは控除できます。店が指定する黒一色の服は控除できません。",
  url: `${SITE_URL}/ja/expenses/hospitality`,
  inLanguage: "ja-JP",
  author: { '@type': 'Organization', name: 'Working Holiday Tax' },
  publisher: { '@type': 'Organization', name: 'Working Holiday Tax', url: SITE_URL },
}

const speakableSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/ja/expenses/hospitality#webpage`,
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.hero-sub'] },
  url: `${SITE_URL}/ja/expenses/hospitality`,
}

/* Tokens kept local so this page does not depend on shared CSS being finished. */
const INK = '#080F0D'
const BODY = '#2A3C34'
const MUTED = '#4C6459'
const FOREST = '#0B5240'
const HAIR = '#E2EFE9'
const SUNKEN = '#F5F9F7'
const WARN = '#B54708'

const wrap: React.CSSProperties = { maxWidth: '720px', margin: '0 auto', padding: '0 20px' }
const h2s: React.CSSProperties = {
  fontFamily: 'var(--font-serif), Georgia, serif',
  fontSize: 'clamp(23px, 5.6vw, 30px)',
  lineHeight: 1.22,
  letterSpacing: '-0.02em',
  fontWeight: 700,
  color: INK,
  margin: '0 0 14px',
}
const h3s: React.CSSProperties = {
  fontSize: '16px',
  lineHeight: 1.35,
  fontWeight: 700,
  color: INK,
  margin: '0 0 6px',
}
const ps: React.CSSProperties = { fontSize: '15px', lineHeight: 1.62, color: BODY, margin: '0 0 14px' }
const secLight: React.CSSProperties = { background: '#fff', padding: '34px 0' }
const secSunk: React.CSSProperties = { background: SUNKEN, padding: '34px 0' }
const kickerS: React.CSSProperties = {
  fontSize: '11px',
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  fontWeight: 600,
  color: FOREST,
  margin: '0 0 10px',
}

function Cta({ position }: { position: 'hero' | 'inline' | 'section' }) {
  return (
    <div style={{ margin: '18px 0 0' }}>
      <WaLink
        href={WA}
        position={position}
        topic="expenses"
        lang={"ja"}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '52px',
          padding: '0 28px',
          background: FOREST,
          color: '#fff',
          borderRadius: '999px',
          fontSize: '16px',
          fontWeight: 600,
          textDecoration: 'none',
        }}
      >
        {UI.ctaLabel}
      </WaLink>
      <p style={{ fontSize: '13.5px', lineHeight: 1.5, color: MUTED, margin: '10px 0 0', textAlign: 'center' }}>
        {UI.ctaSub}
      </p>
    </div>
  )
}

function Bullets({ label, colour, items }: { label: string; colour: string; items: { t: string; d: string }[] }) {
  return (
    <div style={{ marginTop: '22px' }}>
      <p style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: colour, margin: '0 0 12px' }}>
        {label}
      </p>
      {items.map((it, i) => (
        <div key={i} style={{ borderTop: `1px solid ${HAIR}`, padding: '13px 0' }}>
          <p style={h3s}>{it.t}</p>
          <p style={{ ...ps, margin: 0 }}>{it.d}</p>
        </div>
      ))}
    </div>
  )
}

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />

      <main style={{ background: '#fff' }}>

        {/* HERO */}
        <section style={{ background: 'linear-gradient(160deg,#fff 0%,#F2FAF7 100%)', paddingTop: '68px' }}>
          <div style={{ ...wrap, paddingTop: '18px', paddingBottom: '34px' }}>
            <nav aria-label="Breadcrumb" style={{ marginBottom: '18px' }}>
              <ol style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', listStyle: 'none', margin: 0, padding: 0, fontSize: '13px', color: MUTED }}>
                {CRUMBS.map((b, i) => (
                  <li key={i} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    {i > 0 && <span aria-hidden="true" style={{ color: '#CDE3DB' }}>/</span>}
                    {i === CRUMBS.length - 1 ? (
                      <span aria-current="page" style={{ color: FOREST, fontWeight: 500 }}>{b.name}</span>
                    ) : (
                      <Link href={b.item} style={{ color: MUTED, minHeight: '44px', display: 'inline-flex', alignItems: 'center' }}>{b.name}</Link>
                    )}
                  </li>
                ))}
              </ol>
            </nav>

            <p style={kickerS}>{HERO.kicker}</p>
            <h1
              style={{
                fontFamily: 'var(--font-serif), Georgia, serif',
                fontSize: 'clamp(30px, 8.2vw, 46px)',
                lineHeight: 1.08,
                letterSpacing: '-0.03em',
                fontWeight: 700,
                color: INK,
                margin: '0 0 14px',
              }}
            >
              {HERO.h1lead}
              <span style={{ color: FOREST }}>{HERO.h1accent}</span>
            </h1>
            <p className="hero-sub" style={{ fontSize: '16.5px', lineHeight: 1.6, color: BODY, margin: 0 }}>
              {HERO.lede}
            </p>
            <Cta position="hero" />
          </div>
        </section>

        {/* BODY SECTIONS */}
        {SECTIONS.map((s, i) => (
          <section key={i} style={i % 2 === 0 ? secLight : secSunk}>
            <div style={wrap}>
              {s.kind === 'answer' && (
                <>
                  <h2 style={h2s}>{s.h2}</h2>
                  {s.paras.map((p, j) => (
                    <p key={j} style={{ ...ps, margin: j === s.paras.length - 1 ? 0 : ps.margin }}>{p}</p>
                  ))}
                </>
              )}

              {s.kind === 'items' && (
                <>
                  <h2 style={h2s}>{s.h2}</h2>
                  <p style={ps}>{s.intro}</p>
                  {s.items.map((it, j) => (
                    <div key={j} style={{ borderTop: `1px solid ${HAIR}`, padding: '15px 0' }}>
                      <p style={h3s}>{it.t}</p>
                      <p style={{ ...ps, margin: 0 }}>{it.d}</p>
                    </div>
                  ))}
                </>
              )}

              {s.kind === 'traps' && (
                <>
                  <h2 style={h2s}>{s.h2}</h2>
                  <p style={{ ...ps, margin: 0 }}>{s.intro}</p>
                  <Bullets label={UI.wrongLabel} colour={WARN} items={s.wrong} />
                  <Bullets label={UI.missedLabel} colour={FOREST} items={s.missed} />
                </>
              )}

              {s.kind === 'numbered' && (
                <>
                  <h2 style={h2s}>{s.h2}</h2>
                  <p style={ps}>{s.intro}</p>
                  <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {s.steps.map((t, j) => (
                      <li key={j} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', background: '#fff', border: `1px solid ${HAIR}`, borderRadius: '12px', padding: '14px 16px' }}>
                        <span aria-hidden="true" style={{ flex: '0 0 26px', width: '26px', height: '26px', borderRadius: '999px', background: FOREST, color: '#fff', fontSize: '13px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{j + 1}</span>
                        <span style={{ fontSize: '15px', lineHeight: 1.55, color: BODY }}>{t}</span>
                      </li>
                    ))}
                  </ol>
                  {s.note && <p style={{ ...ps, marginTop: '16px', marginBottom: 0 }}>{s.note}</p>}
                </>
              )}

              {s.kind === 'tables' && (
                <>
                  <h2 style={h2s}>{s.h2}</h2>
                  <p style={ps}>{s.intro}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {s.tables.map((t, j) => (
                      <div key={j} style={{ background: '#fff', border: `1px solid ${HAIR}`, borderRadius: '14px', overflow: 'hidden' }}>
                        <p style={{ fontSize: '15px', fontWeight: 700, color: FOREST, margin: 0, padding: '13px 16px', borderBottom: `1px solid ${HAIR}` }}>{t.label}</p>
                        <div style={{ overflowX: 'auto' }}>
                          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <tbody>
                              {t.rows.map((r, k) => (
                                <tr key={k} style={{ borderTop: k ? `1px solid ${HAIR}` : 'none' }}>
                                  <th scope="row" style={{ textAlign: 'left', fontSize: '13.5px', fontWeight: 600, color: INK, padding: '11px 16px', width: '46%' }}>{r[0]}</th>
                                  <td style={{ fontSize: '13.5px', color: BODY, padding: '11px 16px' }}>{r[1]}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ))}
                  </div>
                  {s.note && <p style={{ ...ps, marginTop: '16px', marginBottom: 0 }}>{s.note}</p>}
                </>
              )}

              {s.kind === 'occupations' && (
                <>
                  <h2 style={h2s}>{s.h2}</h2>
                  <p style={ps}>{s.intro}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {s.jobs.map((jb, j) => (
                      <Link key={j} href={jb.href} style={{ display: 'block', background: '#fff', border: `1px solid ${HAIR}`, borderRadius: '12px', padding: '15px 16px', textDecoration: 'none', minHeight: '44px' }}>
                        <span style={{ display: 'block', fontSize: '16px', fontWeight: 700, color: FOREST, marginBottom: '4px' }}>{jb.title}</span>
                        <span style={{ display: 'block', fontSize: '15px', lineHeight: 1.5, color: BODY }}>{jb.line}</span>
                      </Link>
                    ))}
                  </div>
                </>
              )}

              {s.kind === 'note' && (
                <div style={{ background: '#FDF0D5', border: '1px solid #F9D88A', borderLeft: '4px solid #E9A020', borderRadius: '12px', padding: '18px 18px' }}>
                  <p style={{ fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, color: WARN, margin: '0 0 8px' }}>{s.label}</p>
                  <p style={{ ...h3s, marginBottom: '8px' }}>{s.title}</p>
                  <p style={{ ...ps, margin: 0 }}>{s.body}</p>
                </div>
              )}
            </div>
          </section>
        ))}

        {/* GUARANTEE + CTA */}
        <section style={{ background: '#0B5240', padding: '38px 0' }}>
          <div style={wrap}>
            <h2 style={{ ...h2s, color: '#fff', marginBottom: '12px' }}>{UI.guaranteeHeading}</h2>
            <p style={{ fontSize: '15px', lineHeight: 1.62, color: 'rgba(255,255,255,0.78)', margin: 0 }}>
              {UI.guaranteeBody}
            </p>
            <div style={{ marginTop: '18px' }}>
              <WaLink
                href={WA}
                position="section"
                topic="expenses"
                lang={"ja"}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '52px',
                  padding: '0 28px',
                  background: '#E9A020',
                  color: '#1A2822',
                  borderRadius: '999px',
                  fontSize: '16px',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                {UI.ctaLabel}
              </WaLink>
              <p style={{ fontSize: '13.5px', lineHeight: 1.5, color: 'rgba(255,255,255,0.6)', margin: '10px 0 0', textAlign: 'center' }}>
                {UI.ctaSub}
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section style={secLight}>
          <div style={wrap}>
            <h2 style={h2s}>{UI.faqHeading}</h2>
            {FAQS.map((f, i) => (
              <div key={i} style={{ borderTop: `1px solid ${HAIR}`, padding: '16px 0' }}>
                <h3 style={{ ...h3s, marginBottom: '8px' }}>{f.question}</h3>
                <p style={{ ...ps, margin: 0 }}>{f.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* GUIDES */}
        <section style={secSunk}>
          <div style={wrap}>
            <h2 style={h2s}>{UI.guidesHeading}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {GUIDES.map((g, i) => (
                <Link key={i} href={g.href} style={{ display: 'block', background: '#fff', border: `1px solid ${HAIR}`, borderRadius: '12px', padding: '15px 16px', textDecoration: 'none', minHeight: '44px' }}>
                  <span style={{ display: 'block', fontSize: '15px', fontWeight: 700, color: FOREST, marginBottom: '3px' }}>{g.label}</span>
                  <span style={{ display: 'block', fontSize: '15px', lineHeight: 1.5, color: BODY }}>{g.desc}</span>
                </Link>
              ))}
            </div>

            <p style={{ ...kickerS, marginTop: '24px' }}>{UI.servicesLabel}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {SERVICES.map((s, i) => (
                <Link key={i} href={s.href} style={{ display: 'inline-flex', alignItems: 'center', minHeight: '44px', padding: '0 16px', background: '#fff', border: `1px solid ${HAIR}`, borderRadius: '999px', fontSize: '15px', fontWeight: 600, color: FOREST, textDecoration: 'none' }}>
                  {s.label}
                </Link>
              ))}
            </div>
            <p style={{ ...ps, marginTop: '18px', marginBottom: 0 }}>
              <Link href={UI.hubHref} style={{ color: FOREST, textDecoration: 'underline' }}>{UI.otherJobs}</Link>
            </p>
          </div>
        </section>

        {/* DISCLAIMER */}
        <section style={{ ...secLight, paddingBottom: '52px' }}>
          <div style={wrap}>
            <p style={{ fontSize: '13.5px', lineHeight: 1.62, color: MUTED, margin: 0 }}>{UI.disclaimer}</p>
          </div>
        </section>

      </main>

      <MobileCta href={WA} lang={"ja"} topic="expenses" />
    </>
  )
}
