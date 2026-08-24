import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/lib/constants'
import { MobileCta } from '@/components/ui/MobileCta'
import { WaLink } from '@/app/HomeWa'
import { waUrl } from '@/lib/wa'

export const metadata: Metadata = {
  "title": "オーストラリアの経費控除、職種別ガイド",
  "description": "何を控除できるかは、どんな仕事をしたかで決まります。ファーム、飲食、建設、デリバリー、清掃、派遣、FIFOの職種別リストと必要な記録。",
  "keywords": [
    "ワーホリ 税金 控除",
    "ワーキングホリデー 経費 控除",
    "オーストラリア 控除 バックパッカー",
    "ATO 控除 ワーキングホリデー",
    "タックスリターン 経費 オーストラリア",
    "キロメートル単価 控除",
    "417ビザ 税金 控除",
    "462ビザ 税金 控除"
  ],
  "alternates": {
    "canonical": "/ja/expenses",
    "languages": {
      "en-AU": "/expenses",
      "de": "/de/expenses",
      "ja": "/ja/expenses",
      "x-default": "/expenses"
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
    "url": `${SITE_URL}/ja/expenses`,
    "siteName": "Working Holiday Tax",
    "title": "オーストラリアの経費控除、職種別ガイド",
    "description": "フルーツピッカーとデリバリー配達員では、控除できるものが違います。自分の仕事を選んでください。"
  },
  "twitter": {
    "images": [
      `${SITE_URL}/og-image.png`
    ],
    "card": "summary_large_image",
    "title": "オーストラリアの経費控除、職種別ガイド",
    "description": "フルーツピッカーとデリバリー配達員では、控除できるものが違います。自分の仕事を選んでください。"
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

const WA = waUrl({ topic: 'expenses', lang: "ja", detail: "自分の職種で控除できるもの" })

const UI = {
  "ctaLabel": "WhatsAppで相談する",
  "ctaSub": "約1時間で返信します。",
  "guaranteeHeading": "還付金が当社の料金を下回った場合は、差額を返金します。お客様が損をすることはありません。",
  "guaranteeBody": "ワーキングホリデーの税金だけを専門にしています。申告書は、ATOへ提出する前に登録税理士が確認して承認します。",
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
  }
]

const HERO = {
  "kicker": "ワーキングホリデービザ 417 と 462",
  "h1lead": "控除リストは1つではありません。",
  "h1accent": "あなた専用のリストです。",
  "lede": "7つの職種。それぞれに固有の控除があり、固有の記録が要り、固有の落とし穴があります。"
}

/**
 * 誰もが抱えたまま来る反論を、控除に即して答える。
 *
 * トップページは一般論。ここでは各行が空欄の話でなければならない。どんな数字でも
 * 受け付け、何も提案せず、あなたがどの職種で働いたかも知らない。myGovが悪いとは
 * 書いていない。控除を記録するのが役割で、何を控除できたかを決めるわけではない。
 */
const MYGOV_UI = {
  "kicker": "自分でやる場合",
  "h2lead": "myGovの控除欄は1つだけ。",
  "h2accent": "あなたの職種が何を入れるかは知りません。",
  "lede": "その欄に何が入るのか、そして各控除に何の裏づけが要るのか。どちらも入力の前に決まります。",
  "colLeft": "myGovの場合",
  "colRight": "当社の場合",
  "close": "myGovにログインすることも、IDを連携することも、どの書類がどれかを調べることもありません。ATOとは当社が直接やり取りします。"
}

const MYGOV = [
  {
    "mygov": "控除欄は空欄のままで、あなたの職種で何が控除できるかの提案はありません。",
    "us": "実際にやった仕事から出発し、その仕事に対応する項目を順に見ていきます。"
  },
  {
    "mygov": "証明できない金額でも、入力すればそのまま受け付けられます。",
    "us": "領収書が要るもの、銀行明細で足りるもの、確認されたら通らないものを区別してお伝えします。"
  },
  {
    "mygov": "フルーツピッカーとバリスタと大工が同じものを控除するわけではないことは、どこにも書かれていません。",
    "us": "7つの職種それぞれに、独自の項目と独自の証明ルールがあります。"
  },
  {
    "mygov": "家賃、食費、通勤費は控除できそうに見えますが、できません。",
    "us": "通る控除を残し、通らないものは外します。後から取り消す事態を避けるためです。"
  }
]

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
    "h2": "ワーキングホリデーメーカーはタックスリターンで何を控除できますか？",
    "paras": [
      "申告する収入を得るために使ったお金は控除できます。条件は、自分で支払ったこと、そして払い戻しを受けていないことです。ワーキングホリデーメーカーの控除の範囲は他の人と同じで、417ビザや462ビザだからといって制限されることはありません。",
      "リストを変えるのは職種です。日焼け止めは屋外の果樹園で働く人には控除でき、バーカウンターの中の人には控除できません。携帯電話代はデリバリー配達員にとって本物の控除ですが、キッチンハンドにはほとんど関係ありません。一般的なアドバイスがここまでできないのは、あなたが何をしたかを知らないからです。"
    ]
  },
  {
    "kind": "occupations",
    "h2": "あなたが実際にやった仕事はどれですか？",
    "intro": "7つのページがあります。それぞれ、その職種が控除できるもの、間違えて申告しがちなもの、取りこぼしているものを中心に書いています。",
    "jobs": [
      {
        "href": "/ja/expenses/farm-work",
        "title": "ファームとフルーツピッキング",
        "line": "日焼け止め、収穫用具、同じ日にブロック間を移動した分の交通費。"
      },
      {
        "href": "/ja/expenses/hospitality",
        "title": "飲食とキッチン",
        "line": "RSAの更新、滑り止めの靴、コックコート、そして黒一色の服が制服にならない理由。"
      },
      {
        "href": "/ja/expenses/construction",
        "title": "建設",
        "line": "道具の300ドルルール、保護具、そして2枚目からしか使えないホワイトカード。"
      },
      {
        "href": "/ja/expenses/delivery-drivers",
        "title": "デリバリー",
        "line": "車や自転車の費用、携帯の仕事使用分、そして乗客を乗せた瞬間に変わるGSTのルール。"
      },
      {
        "href": "/ja/expenses/cleaners",
        "title": "清掃",
        "line": "道具と洗剤、洗濯の定額、そしてほとんど誰も申告しない現場間の移動。"
      },
      {
        "href": "/ja/expenses/labouring",
        "title": "派遣と倉庫",
        "line": "複数のエージェンシー、複数のインカムステートメント、1日に2現場を回る移動。"
      },
      {
        "href": "/ja/expenses/fifo",
        "title": "FIFOとキャンプ",
        "line": "チケット更新、保護具、そしてローター勤務ではほぼ該当しないZone Tax Offset。"
      }
    ]
  },
  {
    "kind": "numbered",
    "h2": "控除が認められる前提は何ですか？",
    "intro": "3つのテストが、このサイトのすべての控除に適用されます。1つでも外せば、どれだけ仕事に関係していても丸ごと認められません。",
    "steps": [
      "自分でお金を払っていて、雇用主や顧客から払い戻しを受けていないこと。",
      "収入を得る過程で生じた費用であること。収入を得られる立場になるための費用ではなく、私的な支出でもないこと。",
      "何を、いつ、どこで、いくらで買ったかが分かる記録があること。"
    ],
    "note": "厄介なのは2番目です。最初のホワイトカードが控除できず更新は控除できるのも、通勤が控除できず同じ日に2つの職場を移動する分は控除できるのも、これが理由です。"
  },
  {
    "kind": "answer",
    "h2": "何を証明できる必要がありますか？",
    "paras": [
      "領収書、請求書、または金額、日付、支払先、内容が分かる銀行明細です。スマホの写真でも構いませんが、5年間は提示できるようにしておく必要があります。",
      "例外が1つあります。その年の仕事関連の控除の合計が300ドル以下なら、書面の証拠は不要です。これは個々の資産に関する300ドルのルールとは別のもので、そちらは1点をどう償却するかという話です。"
    ]
  },
  {
    "kind": "note",
    "label": "2026年7月1日からの変更",
    "title": "定額1,000ドルか、実費か。両方は選べません。",
    "body": "2026年7月1日から、領収書なしで仕事関連経費を一律1,000ドル控除するか、記録をそろえて実費を控除するかを選べます。年単位でどちらか一方だけです。実費が1,400ドルなのに定額を選べば、400ドルを捨てることになります。この選択が最初に適用されるのは2026-27年度の申告で、提出は2027年7月以降です。いま多くの人が提出している2025-26年度の申告には、従来のルールが適用されます。"
  },
  {
    "kind": "tables",
    "h2": "車の経費はどう計算しますか？",
    "intro": "方法は2つあり、1台につき年に1つしか使えません。どちらの場合も対象になるのは仕事のための走行だけで、自宅から固定の職場への通勤は含まれません。",
    "tables": [
      {
        "label": "キロメートル単価方式",
        "rows": [
          [
            "2024-25年度と2025-26年度",
            "1kmあたり88セント"
          ],
          [
            "2026-27年度以降",
            "1kmあたり91セント"
          ],
          [
            "上限",
            "1台につき年5,000km"
          ],
          [
            "領収書",
            "不要。ただし走行距離の根拠は示す必要があります"
          ]
        ]
      },
      {
        "label": "運転日誌方式",
        "rows": [
          [
            "仕組み",
            "実際の維持費すべてに仕事使用の割合を掛けて控除します"
          ],
          [
            "記録期間",
            "連続12週間、5年間有効"
          ],
          [
            "上限",
            "なし。実際の仕事使用割合に従います"
          ],
          [
            "領収書",
            "控除するすべての支出に必要です"
          ]
        ]
      }
    ],
    "note": "年間およそ5,000km を超えると、通常は運転日誌のほうが控除額は大きくなります。定額ではなく、ガソリン、保険、登録費用、整備、減価償却、車のローン利息まで拾えるからです。"
  },
  {
    "kind": "traps",
    "h2": "職種を問わず、よくある間違いは何ですか？",
    "intro": "前半は、あとで修正申告につながるもの。後半は誰も請求しないもので、件数も損失も大きいのはこちらです。",
    "wrong": [
      {
        "t": "ドレスコードで指定された普通の服",
        "d": "黒いパンツ、無地のポロシャツ、普通の作業靴、ジーンズ。ATOが見るのは品物そのものであって、買った理由ではありません。誰がどこでも着られる服は、上司が指定したからといって制服にはなりません。"
      },
      {
        "t": "最初のライセンス、チケット、資格",
        "d": "最初のホワイトカード、最初のRSA、最初のフォークリフト免許。これらはその仕事に就く資格を得るための費用であって、仕事をするための費用ではありません。働き始めたあとの同じチケットの更新は控除できます。"
      },
      {
        "t": "自宅から職場への通勤",
        "d": "通常の通勤は私的な移動です。距離も出発時刻も渋滞も関係ありません。同じ日に2つの職場を移動するのはまったく別の話で、そちらは通常控除できます。"
      },
      {
        "t": "払い戻しを受けたもの",
        "d": "雇用主、エージェンシー、プラットフォームから払い戻された、あるいは現物で支給された場合、あなたの負担は残っていません。それを申告するのは同じ1ドルを二重に取ることです。"
      },
      {
        "t": "罰金",
        "d": "駐車違反もスピード違反も、何をしている最中でも控除できません。"
      }
    ],
    "missed": [
      {
        "t": "300ドル以下の品を1点ずつ全額",
        "d": "安全靴、手袋、帽子、ナイフケース、ヘッドライト、スマホホルダー。1点ずつ判定されるので、小さな買い物が1年分たまれば本物の控除になります。多くの人が領収書を捨てています。"
      },
      {
        "t": "300ドルを超えても控除はできる",
        "d": "300ドルを超えても控除がなくなるのではなく、タイミングが変わるだけです。耐用年数にわたって配分して控除します。「300ドル超」と聞いた時点であきらめる人が少なくありません。"
      },
      {
        "t": "制服や保護具の洗濯",
        "d": "ATOは仕事着だけの洗濯なら1回1ドル、私服と一緒なら1回50セントを認めています。年間の洗濯控除が150ドルを超えたら、概算ではなく簡単な記録が必要です。"
      },
      {
        "t": "同じ日に2つの仕事を移動した分",
        "d": "2つのファーム、2軒の家、2つの倉庫、2つの店。この区間は通勤ではなく業務移動で、複数現場で働く人にとっては申告全体で最大の控除になることも多いです。"
      },
      {
        "t": "TFNが届く前に45%で引かれた分",
        "d": "控除ではありませんが、同じお金です。Tax File Number Declarationが処理される前に最高税率で源泉徴収されていた分は、申告すれば戻ります。放っておいても戻りません。"
      }
    ]
  },
  {
    "kind": "answer",
    "h2": "あなた自身の事情で変わるのはどこですか？",
    "paras": [
      "明確な部分もあれば、あなたの事実関係を見て判断する部分もあります。移動が通勤ではなく巡回勤務にあたるかどうかは、1週間の働き方の実態で決まります。現場がどれだけ頻繁に変わるか、戻る拠点があるか、雇用主が移動を求めているか。同じ職種名でも結論が分かれます。",
      "もう1つは税務上の居住区分で、これはこのページのすべての控除を合わせたより大きな金額になります。ほとんどの人が見落とす細部で決まる判断であり、高等裁判所のAddy判決で争われたのもまさにこの問題です。どちらの方向にも間違えやすく、当社は1年の実態を確認してからでなければ立場を決めません。"
    ]
  }
]

const FAQS = [
  {
    "question": "控除は自分で申告できますか。",
    "answer": "ご自身でできますし、提出は簡単な部分です。難しいのは控除欄が空欄のままで、あなたの職種について何も示さず、証明できない金額でもそのまま受け付けてしまうことです。どの費用が仕事から生じ、その裏づけに何が要るのかを見極めるのは、入力欄を埋める作業ではなく、あなたが実際に過ごした1年についての判断です。"
  },
  {
    "question": "ワーキングホリデーメーカーの控除はオーストラリア人より少ないですか？",
    "answer": "いいえ。417ビザや462ビザでも、控除のルールはオーストラリアで収入を得る他の人とまったく同じです。違うのは支出側ではなく収入側です。ワーキングホリデーメーカーの収入は非課税枠ではなく45,000ドルまで15%で課税されます。ただし居住区分によっては変わります。控除の計算方法は、同じ仕事をしている居住者とまったく同じです。"
  },
  {
    "question": "1年で4つの仕事をしました。リストは4つに分かれますか？",
    "answer": "申告は年度ごとに1回で、そのなかにすべての仕事のすべての控除が入ります。大事なのは、それぞれの支出が当時実際にやっていた仕事と結びついていることです。9月の倉庫仕事のために買った安全靴も、1月のファーム仕事のために買った日焼け止めも、同じ申告に入ります。雇用主が違っても分かれることはありません。"
  },
  {
    "question": "領収書をなくしてしまいました。",
    "answer": "領収書がない場合、金額、日付、支払先が分かる銀行やカードの明細で認められることが多く、そもそも明細しか残らない買い物もあります。どの支出が明細だけで通り、どれが通らないかは、買ったものと使い道を伺えば一つずつ判断できます。できないのは、数字を作って通ることを期待することです。"
  },
  {
    "question": "オーストラリア滞在中の家賃、食費、移動費は控除できますか？",
    "answer": "できません。住居費、食料品、移動の費用は私的な生活費であり、仕事のために地方の町へ移った場合でも変わりません。狭い例外は、雇用主の指示で自宅を離れて宿泊を伴う出張をした場合で、これは別のルールと別の記録が必要になります。"
  },
  {
    "question": "数か月しか働いていなくても控除する意味はありますか？",
    "answer": "たいていあります。短期でも実際の出費はありますし、控除は課税対象になる収入を減らします。ただし短い年度で金額が大きいのは控除よりも、Tax File Numberが雇用主に届く前に45%で引かれていた分と、居住区分が正しく申告されているかどうかであることが多いです。"
  }
]

const GUIDES = [
  {
    "href": "/ja/blog/tax-deductions-working-holiday-makers",
    "label": "ワーキングホリデーの控除リスト",
    "desc": "すべてのカテゴリーと、ATOが認めないもの。"
  },
  {
    "href": "/ja/blog/tools-equipment-under-300-instant-deduction-whv",
    "label": "300ドル以下の道具は全額即時控除",
    "desc": "1点ずつ判定される理由と、セット購入で変わる点。"
  },
  {
    "href": "/ja/blog/1000-dollar-instant-deduction-rule-2026",
    "label": "1,000ドル定額控除の選び方",
    "desc": "実費といくらで損益が分かれるか、記録は何が要るか。"
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
    "href": "/ja/blog/tax-residency-working-holiday-makers",
    "label": "税務上の居住区分"
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
  headline: "オーストラリアの経費控除、職種別ガイド",
  description: "フルーツピッカーとデリバリー配達員では、控除できるものが違います。自分の仕事を選んでください。",
  url: `${SITE_URL}/ja/expenses`,
  inLanguage: "ja-JP",
  author: { '@type': 'Organization', name: 'Working Holiday Tax' },
  publisher: { '@type': 'Organization', name: 'Working Holiday Tax', url: SITE_URL },
}

const speakableSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/ja/expenses#webpage`,
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.hero-sub'] },
  url: `${SITE_URL}/ja/expenses`,
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

        {/* 反論への回答、控除に即して */}
        <section style={secSunk}>
          <div style={wrap}>
            <p style={kickerS}>{MYGOV_UI.kicker}</p>
            <h2 style={h2s}>
              <span style={{ display: 'block', color: BODY, fontWeight: 400 }}>{MYGOV_UI.h2lead}</span>
              <span style={{ display: 'block' }}>{MYGOV_UI.h2accent}</span>
            </h2>
            <p style={{ ...ps, color: MUTED, marginBottom: '20px' }}>{MYGOV_UI.lede}</p>

            <div style={{ background: '#fff', border: '1px solid #CDE3DB', borderRadius: '14px', overflow: 'hidden' }}>
              {MYGOV.map((row, i) => (
                <div key={i} className="grid md:grid-cols-2" style={{ borderTop: i === 0 ? 'none' : `1px solid ${HAIR}` }}>
                  <div style={{ padding: '15px 18px' }}>
                    <p style={{ fontSize: '10.5px', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 500, color: MUTED, margin: '0 0 5px' }}>
                      {MYGOV_UI.colLeft}
                    </p>
                    <p style={{ ...ps, margin: 0, overflowWrap: 'break-word' }}>{row.mygov}</p>
                  </div>
                  <div className="border-t md:border-t-0 md:border-l" style={{ padding: '15px 18px', background: '#F2FAF7', borderColor: HAIR }}>
                    <p style={{ fontSize: '10.5px', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 500, color: FOREST, margin: '0 0 5px' }}>
                      {MYGOV_UI.colRight}
                    </p>
                    <p style={{ ...ps, margin: 0, color: INK, fontWeight: 500, overflowWrap: 'break-word' }}>{row.us}</p>
                  </div>
                </div>
              ))}
            </div>

            <p style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontSize: '17px', lineHeight: 1.75, fontWeight: 700, color: FOREST, margin: '22px 0 0' }}>
              {MYGOV_UI.close}
            </p>
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
