import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/lib/constants'
import { MobileCta } from '@/components/ui/MobileCta'
import { WaLink } from '@/app/HomeWa'
import { waUrl } from '@/lib/wa'

export const metadata: Metadata = {
  "title": "建設の経費控除：道具、保護具、ホワイトカード",
  "description": "建設現場で働く人が控除できるもの。300ドル以下と300ドル超の道具、保護具、ホワイトカードの更新、日焼け対策、ユートが対象になる狭い条件。",
  "keywords": [
    "建設 税金 控除 オーストラリア",
    "ホワイトカード 控除",
    "工具 控除 ATO",
    "保護具 控除 建設",
    "ワーホリ 建設 タックスリターン",
    "417ビザ 建設 控除",
    "ユート 控除 運転日誌",
    "現場 経費 オーストラリア"
  ],
  "alternates": {
    "canonical": "/ja/expenses/construction",
    "languages": {
      "en-AU": "/expenses/construction",
      "de": "/de/expenses/construction",
      "ja": "/ja/expenses/construction",
      "x-default": "/expenses/construction"
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
    "url": `${SITE_URL}/ja/expenses/construction`,
    "siteName": "Working Holiday Tax",
    "title": "建設の経費控除：道具、保護具、ホワイトカード",
    "description": "道具、保護具、ホワイトカードの更新は控除できます。最初のホワイトカードと破れたジーンズはできません。"
  },
  "twitter": {
    "images": [
      `${SITE_URL}/og-image.png`
    ],
    "card": "summary_large_image",
    "title": "建設の経費控除：道具、保護具、ホワイトカード",
    "description": "道具、保護具、ホワイトカードの更新は控除できます。最初のホワイトカードと破れたジーンズはできません。"
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

const WA = waUrl({ topic: 'expenses', lang: "ja", detail: "建設と現場作業" })

const UI = {
  "ctaLabel": "WhatsAppで相談する",
  "ctaSub": "約1時間で返信します。",
  "guaranteeHeading": "還付金より料金のほうが高くついたら、差額は返金します。持ち出しにはなりません。",
  "guaranteeBody": "現場の申告、資格の更新、ユートをめぐる線引き。どれもここでは毎週の仕事で、お客様は全員417・462ビザの方です。申告書は当社のチームが作成し、ATOへ提出する前に登録税理士が確認して承認します。",
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
    "name": "建設",
    "item": "/ja/expenses/construction"
  }
]

const HERO = {
  "kicker": "現場、労務、職人仕事",
  "h1lead": "道具は控除できます。",
  "h1accent": "最初のホワイトカードはできません。",
  "lede": "現場仕事の控除リストは、ワーホリの仕事のなかで最も長いものです。そのなかでユートだけは、たいていあなたの控除になりません。"
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
    "h2": "建設作業員は何を控除できますか？",
    "paras": [
      "控除できるのは、自費で買った道具や機材、保護衣類と保護具、屋外現場のための日焼け対策、すでに持っているホワイトカードや操作資格の更新、携帯電話代の仕事使用分、そして今すでに就いている職種に関係する自己研鑽です。雇用主が支給または払い戻したものは対象外です。",
      "リストが長いのは、この仕事が具体的な費用を生むからです。安全靴は落ちてきたブロックから、ヘルメットは頭上の危険から、日焼け止めは日陰のないスラブでの6時間から守ります。控除の判定が探しているのはまさにこの結びつきで、だからこのサイトの職種のなかで現場作業は控除合計が最も大きくなりがちです。"
    ]
  },
  {
    "kind": "items",
    "h2": "この仕事に固有の控除",
    "intro": "以下の金額の線引きは、控除できるかどうかではなくタイミングの話です。300ドルを超えても控除は消えず、配分されるだけです。",
    "items": [
      {
        "t": "1点300ドル以下の道具と機材",
        "d": "ドリル、グラインダー、ネイルガン、水平器、腰袋、のみのセット。1点300ドル以下なら購入年に全額控除します。1点ごとに判定されるので、1年分の小さな買い物が、多くの人がレジで捨てる領収書からまとまった控除を作ります。"
      },
      {
        "t": "1点300ドル以上の道具と機材",
        "d": "こちらも控除できますが、一度にではなく耐用年数にわたって配分します。コンクリートミキサーやしっかりした卓上丸のこがここに入ります。落とし穴は、合計300ドル以上のセットとしてまとめ買いした場合で、1点ずつなら300ドル未満でもセット全体が1つの資産として扱われます。"
      },
      {
        "t": "保護具と保護衣類",
        "d": "高視認性のシャツやベスト、安全靴、保護メガネ、ヘルメット、イヤーマフ、作業手袋、防塵マスク。ATOが見るのは現場で役に立つかどうかではなく、具体的な負傷リスクから身を守る機能があるかどうかです。"
      },
      {
        "t": "屋外作業のための日焼け対策",
        "d": "日焼け止め、つばの広い帽子、サングラスは、現場が屋外なら他の屋外職と同じ根拠で控除できます。真夏のスラブでは本物の、しかも繰り返し発生する費用ですが、領収書を取っておく人はほとんどいません。"
      },
      {
        "t": "ホワイトカードや操作資格の更新",
        "d": "すでに持っているカードや資格を、現場に入っている状態で更新する費用は控除できます。最初のホワイトカードは控除できません。それは建設の仕事に就く資格を得るための費用だからです。最初のフォークリフト、高所作業車、大型車の資格にも同じ区別が当てはまります。"
      },
      {
        "t": "携帯電話とインターネットの仕事使用分",
        "d": "自分の携帯で職長に連絡する、図面を確認する、シフトの連絡を受けるなら、契約の仕事使用割合が控除できます。割合の根拠は公正で正直なものにしてください。私生活にも使う携帯で全額を申告しても通りません。"
      },
      {
        "t": "今の職種に関係する研修",
        "d": "今使っている技能や資格を高める講座は控除できます。別の職種に移るための講座は、建設関連であっても控除できません。今の収入を生んでいる資格を維持するのではなく、新しい資格を作るものだからです。"
      }
    ]
  },
  {
    "kind": "answer",
    "h2": "道具の控除には何の裏づけが要りますか？",
    "paras": [
      "どの控除も3つのテストを通ります。自分で支払ったこと、払い戻されていないこと、申告する収入を得るために使ったことです。現場なら、ドリル、安全靴、資格更新の領収書を、ダッシュボードに置き去りにせず手元に残すことです。",
      "記録は領収書でも請求書でも銀行明細でもよく、金額、日付、支払先、内容が分かれば足ります。スマホの写真で構いません。5年間は保管してください。その年の仕事関連の控除が合計300ドル以下なら書面の証拠は不要ですが、金額の根拠は説明できる必要があります。丸のこを一度に償却するか耐用年数で配分するかを決める300ドルとは、別のルールです。"
    ]
  },
  {
    "kind": "numbered",
    "h2": "現場までの運転が控除になるのはどんなときですか？",
    "intro": "自宅から通常の職場までの運転は私的な移動で、現場も職場です。例外はかさばる道具の1つだけで、次の3つが同時に成り立つ必要があります。",
    "steps": [
      "その道具がその日の作業に不可欠であること。",
      "本当にかさばること。つまり大きさや重さが車を必要とする実際の理由であって、単に便利だからではないこと。",
      "現場に安全に置いておける場所がなく、持ち帰らざるを得ないこと。"
    ],
    "note": "現場に施錠できる小屋、コンテナ、ケージがある場合、または持ち物が普通のバッグに収まる場合、その移動は通常の通勤のままです。例外に当てはまる場合でも、積載量1トン以上のユートやバンはキロメートル単価方式をまったく使えないため、多くの人にとって運転日誌が唯一の方法になります。"
  },
  {
    "kind": "traps",
    "h2": "建設で働く人がよく間違えることは？",
    "intro": "誤って申告されるのはたいてい衣類とユートです。取りこぼされるのは、明らかに控除できたのに誰も領収書を残さなかったものです。",
    "wrong": [
      {
        "t": "現場で駄目になった普段着",
        "d": "ジーンズ、Tシャツ、ネルシャツ、パーカー。現場が駄目にしますし、仕事のために買ったものですが、どちらも関係ありません。普段着の通常の摩耗は私的な支出です。切創、日光、騒音、粉じん、衝撃から身を守る品でなければならず、1日耐えるだけでは足りません。"
      },
      {
        "t": "最初のホワイトカード",
        "d": "雇ってもらえるようになる前に払ったカードは、その職業に就く資格を得るための費用で、ATOは最初の運転免許と同じように扱います。働き始めてからの更新は別で、控除できます。"
      },
      {
        "t": "ユートを当然のように",
        "d": "ユートを所有して現場へ運転すること自体は控除になりません。上記のかさばる道具の3条件がすべて必要で、施錠できる保管場所がある多くの現場では成り立ちません。この業種で最も過大に申告される項目です。"
      },
      {
        "t": "雇用主が支給または支払った道具",
        "d": "トラックから出てきたもの、現場コンテナのもの、払い戻されたものは、あなたの負担が残っていません。道具を使う人と、道具の代金を払った人は別です。"
      },
      {
        "t": "別の職種に移るための講座",
        "d": "新しい職業に移るための学習は、どれだけ建設に関係していても控除できません。既存の稼得能力を維持するのではなく、新しい稼得能力を作るものだからです。"
      }
    ],
    "missed": [
      {
        "t": "小さな道具を1点ずつ",
        "d": "一定額を超えないと道具は申告する価値がないと思われがちですが、そんな基準はありません。40ドルの買い物が12回なら480ドルの控除で、それぞれが個別に300ドルの基準で判定されます。"
      },
      {
        "t": "300ドル超をまるごと諦める",
        "d": "「300ドル超」と聞いて、その道具は控除できないと結論づける人が意外と多くいます。控除はできます。耐用年数にわたって配分するだけです。落としてしまうと、一部を先送りするどころか控除全体を失います。"
      },
      {
        "t": "屋外現場での日焼け止めと帽子",
        "d": "屋外作業では認められているのに、職人にはほとんど申告されません。日焼け対策はファームの話だと思われがちですが、2月の日陰のないスラブも同じ曝露です。"
      },
      {
        "t": "高視認性ウェアや保護具の洗濯",
        "d": "控除できる保護衣類の洗濯自体も控除でき、ATOの単価は仕事着だけなら1回1ドル、私服と一緒なら50セントです。年間150ドルを超えたら簡単な記録を付けてください。"
      },
      {
        "t": "自費で払った資格の更新",
        "d": "ホワイトカード、フォークリフト、高所作業車の更新は7月には忘れがちで、とくに土曜午前の講習で現金払いだった場合はなおさらです。"
      }
    ]
  },
  {
    "kind": "answer",
    "h2": "あなたの事実だけで決まるのはどこですか？",
    "paras": [
      "まず、かさばる道具の例外です。何を運んだか、現場がどんな保管を用意していたか、その日その道具が不可欠だったかで決まります。同じクルーの2人でも結論が分かれますし、実際に確認される控除なので、説明できるようにしておいてください。",
      "講座も同じ構図です。今の技能の維持なのか、新しい職業への準備なのかは、案内ではなく今の役割で決まります。",
      "税務上の居住区分は、リストのどの道具より価値があります。イギリス、ドイツ、日本のパスポート保持者で税務上オーストラリア居住者だった人は、Addy判決のもとで満額の非課税枠を受けられる可能性があります。現場仕事は1つの住所に長く落ち着く形になりやすく、この問いが現実になるパターンです。"
    ]
  }
]

const FAQS = [
  {
    "question": "最初のホワイトカードは控除できますか？",
    "answer": "できません。ATOは最初のホワイトカードを最初の運転免許と同じように、仕事をするための費用ではなく仕事に就く資格を得るための費用として扱います。すでに現場で働いていて、続けるために更新が必要になった時点で、更新費用は控除できます。最初のフォークリフト資格や大型車の許可にも同じ理屈が当てはまります。"
  },
  {
    "question": "建設作業員はどんな道具を控除できますか？",
    "answer": "現場のために自分で買った道具や機材はすべてです。ただし雇用主が支給も払い戻しもしていないことが条件です。会社の道具を使っている日がある場合、その分まで自分の控除にはできません。中古で買ったものや、こわれて買い替えたものも、支払った記録があれば同じように扱えます。"
  },
  {
    "question": "現場へ行くユートは控除できますか？",
    "answer": "狭い場合に限られます。自宅から通常の職場への運転は私的な移動で、その職場が建設現場でも変わりません。控除できるのは、運ぶ道具がその日不可欠で、本当にかさばり、現場に安全に保管できない場合だけです。ほとんどのユートやバンは積載量が1トン以上あるためキロメートル単価方式の対象外で、控除するなら運転日誌しかありません。"
  },
  {
    "question": "安全靴や高視認性ウェアは控除できますか？",
    "answer": "はい。安全靴、高視認性のシャツやベスト、保護メガネ、ヘルメット、イヤーマフ、作業手袋などの保護具は、現場の具体的な負傷リスクから身を守るため控除できます。これがATOの判断基準です。屋外現場の日焼け対策も同じ根拠で控除でき、保護具の洗濯も同様です。"
  },
  {
    "question": "現場で服が駄目になります。なぜ控除できないのですか？",
    "answer": "ATOが見るのは、その服に何が起きたかではなく品物そのものだからです。ジーンズ、Tシャツ、ネルシャツは誰がどこでも着られる普段着で、その通常の摩耗は仕事がどれだけ早く駄目にしても私的な費用です。控除できるようになるのは、上記の保護具のように本物の保護機能がある場合か、ロゴ入りの必須制服である場合です。"
  }
]

const GUIDES = [
  {
    "href": "/ja/blog/white-card-australia-working-holiday",
    "label": "ホワイトカードと、その費用",
    "desc": "取得方法と、最初の1枚が控除にならない理由。"
  },
  {
    "href": "/ja/blog/tools-equipment-under-300-instant-deduction-whv",
    "label": "300ドル以下の道具は全額即時控除",
    "desc": "1点ずつ判定される理由と、セット購入で変わる点。"
  },
  {
    "href": "/ja/blog/construction-laborer-working-holiday-australia",
    "label": "ワーホリの建設現場の仕事",
    "desc": "賃金の目安と、現場が持参を求めるもの。"
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
  headline: "建設の経費控除：道具、保護具、ホワイトカード",
  description: "道具、保護具、ホワイトカードの更新は控除できます。最初のホワイトカードと破れたジーンズはできません。",
  url: `${SITE_URL}/ja/expenses/construction`,
  inLanguage: "ja-JP",
  author: { '@type': 'Organization', name: 'Working Holiday Tax' },
  publisher: { '@type': 'Organization', name: 'Working Holiday Tax', url: SITE_URL },
}

const speakableSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/ja/expenses/construction#webpage`,
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.hero-sub'] },
  url: `${SITE_URL}/ja/expenses/construction`,
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
