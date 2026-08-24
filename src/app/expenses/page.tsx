import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/lib/constants'
import { MobileCta } from '@/components/ui/MobileCta'
import { WaLink } from '@/app/HomeWa'
import { waUrl } from '@/lib/wa'

export const metadata: Metadata = {
  "title": "Backpacker Tax Deductions, Job by Job",
  "description": "What you can claim depends on the work you did. Deduction lists for farm work, hospitality, construction, delivery, cleaning, labour hire and FIFO.",
  "keywords": [
    "backpacker tax deductions",
    "working holiday tax deductions",
    "what can backpackers claim on tax",
    "ATO deductions working holiday maker",
    "work related deductions Australia",
    "cents per kilometre method",
    "417 visa tax deductions",
    "462 visa tax deductions"
  ],
  "alternates": {
    "canonical": "/expenses",
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
    "locale": "en_AU",
    "url": `${SITE_URL}/expenses`,
    "siteName": "Working Holiday Tax",
    "title": "Backpacker Tax Deductions, Job by Job",
    "description": "A fruit picker and a delivery rider do not claim the same things. Find your line of work and see what actually applies."
  },
  "twitter": {
    "images": [
      `${SITE_URL}/og-image.png`
    ],
    "card": "summary_large_image",
    "title": "Backpacker Tax Deductions, Job by Job",
    "description": "A fruit picker and a delivery rider do not claim the same things. Find your line of work and see what actually applies."
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

const WA = waUrl({ topic: 'expenses', lang: "en", detail: "Deductions for my line of work" })

const UI = {
  "ctaLabel": "Message us on WhatsApp",
  "ctaSub": "Replies in about an hour. Ask anything first.",
  "guaranteeHeading": "If your refund is less than our fee, we refund the difference, so you are never out of pocket.",
  "guaranteeBody": "Working holiday tax is the only thing we do. Your return is prepared by our team, then reviewed and signed off by a registered tax agent before it is lodged with the ATO.",
  "faqHeading": "Questions people ask about this",
  "guidesHeading": "Worth reading next",
  "otherJobs": "A different job? Every occupation is here.",
  "servicesLabel": "Elsewhere on the site",
  "wrongLabel": "Claimed, and it should not have been",
  "missedLabel": "Not claimed, and it should have been",
  "disclaimer": "This is general information, not personal tax advice. What you can claim depends on your own employers, your own records, and how you actually worked. When you lodge with us we go through your situation line by line, so you claim everything you are entitled to and nothing you are not.",
  "hubHref": "/expenses"
}

const CRUMBS = [
  {
    "name": "Home",
    "item": "/"
  },
  {
    "name": "Deductions",
    "item": "/expenses"
  }
]

const HERO = {
  "kicker": "Working holiday visas 417 and 462",
  "h1lead": "Deductions are not one list.",
  "h1accent": "They are your list.",
  "lede": "Seven trades, each with its own claims, its own records, and its own things that get knocked back."
}

/**
 * The objection every lead arrives holding, answered about deductions.
 *
 * The homepage answers it in general terms. Here every row has to be about the
 * blank box: it takes any figure, it suggests nothing, and it does not know what
 * trade you worked in. Nothing here says myGov is bad. It records a claim. It
 * does not decide which claims you were entitled to make.
 */
const MYGOV_UI = {
  "kicker": "Doing it yourself",
  "h2lead": "myGov has one deductions box",
  "h2accent": "and no idea what your trade puts in it.",
  "lede": "What belongs in that box, and what has to sit behind each claim, are both settled before anything is typed.",
  "colLeft": "On myGov",
  "colRight": "With us",
  "close": "You will never log into myGov, link an ID, or work out which form is which. We deal with the ATO directly."
}

const MYGOV = [
  {
    "mygov": "The deduction box is blank and stays blank. Nothing suggests what your trade is allowed to claim.",
    "us": "We start from the work you actually did, and go down the list that belongs to it."
  },
  {
    "mygov": "It accepts any figure you type, including one you could not evidence if you were asked to.",
    "us": "We tell you which claims need a receipt, which a bank statement will carry, and which will not survive a look."
  },
  {
    "mygov": "Nothing tells you that a fruit picker, a barista and a chippy do not claim the same things.",
    "us": "Seven lines of work, each with its own list and its own substantiation rule."
  },
  {
    "mygov": "Rent, food and getting yourself to work look claimable and are not.",
    "us": "We keep the claims that hold and leave out the ones that do not, so nothing on the return has to be undone later."
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
    "h2": "What can a working holiday maker claim on an Australian tax return?",
    "paras": [
      "You can claim what you spent in order to earn the income you are declaring, as long as you paid for it yourself and were not reimbursed. Working holiday makers get the same deductions as anyone else. Nothing about a 417 or 462 visa restricts the list.",
      "What changes the list is the job. Sun protection is deductible for someone picking fruit in an open orchard and not for someone behind a bar. A phone plan is a real deduction for a delivery rider and almost nothing for a kitchen hand. This is the part generic advice cannot do, because it does not know what you did."
    ]
  },
  {
    "kind": "occupations",
    "h2": "Which job did you actually do?",
    "intro": "Seven pages, each written around what that particular trade claims, what it wrongly claims, and what it leaves behind.",
    "jobs": [
      {
        "href": "/expenses/farm-work",
        "title": "Farm work and fruit picking",
        "line": "Sun protection, picking gear, and travel between blocks in the same day."
      },
      {
        "href": "/expenses/hospitality",
        "title": "Hospitality and kitchens",
        "line": "RSA renewals, non slip shoes, chef whites, and why the all black outfit is not a uniform."
      },
      {
        "href": "/expenses/construction",
        "title": "Construction",
        "line": "The $300 tool rule, PPE, and the White Card that is only deductible the second time."
      },
      {
        "href": "/expenses/delivery-drivers",
        "title": "Delivery driving",
        "line": "Car and bike costs, the work share of your phone, and the GST rule that changes if you carry passengers."
      },
      {
        "href": "/expenses/cleaners",
        "title": "Cleaning",
        "line": "Equipment and chemicals, laundry rates, and the drive between houses that most cleaners never claim."
      },
      {
        "href": "/expenses/labouring",
        "title": "Labour hire and warehouses",
        "line": "Several agencies, several income statements, and travel between sites in one day."
      },
      {
        "href": "/expenses/fifo",
        "title": "FIFO and camp work",
        "line": "Ticket renewals, PPE, and the Zone Tax Offset almost nobody on a roster actually qualifies for."
      }
    ]
  },
  {
    "kind": "numbered",
    "h2": "What has to be true before anything is deductible?",
    "intro": "Three tests, applied to every claim on every page here. Fail one and the claim fails completely, however work related it feels.",
    "steps": [
      "You spent the money yourself, and your employer or client did not reimburse you for it.",
      "The expense was incurred in earning your income, not in getting yourself into a position to earn it, and it is not private or domestic.",
      "You have a record that shows what you bought, when, from whom, and for how much."
    ],
    "note": "The second test is the one that does the damage. It is why your first White Card is not deductible but your renewal is, and why the drive to work is not deductible but the drive between two jobs on the same day is."
  },
  {
    "kind": "answer",
    "h2": "What do you have to be able to show?",
    "paras": [
      "A receipt, an invoice or a bank statement, showing the amount, the date, the supplier and what the item was. A photo on your phone counts, and you need to be able to produce it for five years.",
      "There is one concession. If your total work related claims for the year come to $300 or less, you do not need written evidence for them, but you still have to be able to explain how you arrived at the figure. That concession is separate from the $300 rule for individual assets, which is about how a single item is written off rather than whether you need a receipt for it."
    ]
  },
  {
    "kind": "note",
    "label": "Changing from 1 July 2026",
    "title": "A flat $1,000, or your actual costs. Not both.",
    "body": "From 1 July 2026 you can claim a flat $1,000 of work related expenses with no receipts at all, or claim your actual costs with full records. It is one or the other for the whole year, so if your real expenses come to $1,400 and you take the flat amount, you have given up $400. The choice first applies to the 2026-27 return, lodged from July 2027. The return most people are lodging right now, for 2025-26, still runs on the old rules."
  },
  {
    "kind": "tables",
    "h2": "How are car expenses worked out?",
    "intro": "There are two methods, and you can only use one per car per year. Only work related driving counts either way, never your ordinary trip from home to a single regular workplace.",
    "tables": [
      {
        "label": "Cents per kilometre",
        "rows": [
          [
            "Rate, 2024-25 and 2025-26",
            "88c per km"
          ],
          [
            "Rate, 2026-27 onwards",
            "91c per km"
          ],
          [
            "Maximum",
            "5,000 km per car per year"
          ],
          [
            "Receipts",
            "Not required, but you must show how you worked out the kilometres"
          ]
        ]
      },
      {
        "label": "Logbook",
        "rows": [
          [
            "How it works",
            "You claim the work related percentage of every actual running cost"
          ],
          [
            "Logbook period",
            "12 continuous weeks, valid for five years"
          ],
          [
            "Maximum",
            "No cap. It follows your real work use percentage"
          ],
          [
            "Receipts",
            "Required for every expense claimed"
          ]
        ]
      }
    ],
    "note": "Past about 5,000 work kilometres a year the logbook usually produces the bigger deduction, because it picks up fuel, insurance, registration, servicing, depreciation and the interest on a car loan rather than a flat rate. It costs you twelve weeks of record keeping and a receipt for everything. Which one is worth it depends on how much you drive and what your car actually costs to run."
  },
  {
    "kind": "traps",
    "h2": "What do people get wrong, whatever job they did?",
    "intro": "These come up whatever the job. The first list is what turns a refund into an amended assessment. The second, the money nobody asks for, is more common and costs more.",
    "wrong": [
      {
        "t": "Plain clothing that a dress code requires",
        "d": "Black trousers, a plain polo, ordinary boots, jeans. The ATO looks at what the item is, not at why you bought it. Conventional clothing that anyone could wear anywhere does not become a uniform because a manager insists on it."
      },
      {
        "t": "The first licence, ticket or certificate",
        "d": "A first White Card, a first RSA, a first forklift ticket. That cost is what made you eligible for the job in the first place, which is not the same as a cost of doing the job. Renewals of the same ticket, once you are working, are deductible."
      },
      {
        "t": "The drive from home to work",
        "d": "Ordinary commuting is private travel however far it is, however early the start, and however heavy the traffic. Travel between two workplaces in the same day is a different thing entirely, and that one is usually claimable."
      },
      {
        "t": "Anything you were paid back for",
        "d": "If an employer, an agency or a platform reimbursed you, or supplied the item outright, there is no cost sitting with you to deduct. Claiming it anyway is claiming the same dollar twice."
      },
      {
        "t": "Fines",
        "d": "Parking and speeding fines are never deductible, whatever you were doing when you got them."
      }
    ],
    "missed": [
      {
        "t": "Every item under $300, claimed in full",
        "d": "Boots, gloves, a hat, a knife roll, a head torch, a phone mount. Each item is tested on its own, so a year of small purchases adds up to a real deduction. Most people throw the receipts away."
      },
      {
        "t": "Items over $300, which are still deductible",
        "d": "Crossing $300 does not remove the deduction, it changes the timing. The cost is claimed across the effective life of the item instead of all at once. People hear \"over $300\" and stop."
      },
      {
        "t": "Laundering compulsory or protective work clothing",
        "d": "The ATO allows $1 per load where the load is only work items, or 50 cents per load washed in with everything else. Once your laundry claims pass $150 for the year you need a simple diary rather than an estimate."
      },
      {
        "t": "Travel between two jobs on the same day",
        "d": "Two farms, two houses, two warehouses, two venues. That leg is work travel, not commuting, and for anyone working across sites it is often the largest single deduction on the return."
      },
      {
        "t": "Weeks taxed at 45 per cent before the TFN landed",
        "d": "Not a deduction, but the same money. If an employer withheld at the top rate while your Tax File Number Declaration was still in a drawer, that comes back on the return. It does not come back on its own."
      }
    ]
  },
  {
    "kind": "answer",
    "h2": "Where does it depend on your own situation?",
    "paras": [
      "Some of this is settled and some of it is a judgement about your own facts. Whether your travel counts as itinerant work rather than commuting depends on how your week was structured: how often the site changed, whether there was one base you returned to, and whether your employer required the movement. Two people on the same job title can land on different answers.",
      "Your residency for tax purposes is the other one, and it is worth more than every deduction on this page put together. British, German and Japanese passports can carry the full tax free threshold under the Addy decision, but only where the person was a resident of Australia for tax purposes. No day count settles that. It turns on what you did with your year."
    ]
  }
]

const FAQS = [
  {
    "question": "Can I not just do this myself on myGov?",
    "answer": "You can, and lodging really is the easy part. The difficulty with deductions is that the box is blank and stays blank. Nothing on the screen suggests what your trade is allowed to claim, nothing distinguishes a fruit picker from a delivery rider from a chippy, and nothing warns you that rent, groceries and getting yourself to work look claimable and are not. It will also accept any figure you type, including one you could not evidence if the ATO asked, which is the version that has to be undone later. Working out which costs came from earning your income, which of them need a receipt and which a bank statement will carry, is a judgement about the year you actually had rather than a field to fill in. You will never log into myGov, link an ID, or work out which form is which. We deal with the ATO directly."
  },
  {
    "question": "Do working holiday makers get fewer deductions than Australians?",
    "answer": "No. The deduction rules are the same for a 417 or 462 visa holder as they are for anyone else earning Australian income. The difference is on the income side, not the expense side: working holiday maker income is taxed at 15 per cent up to $45,000 rather than getting a tax free threshold, unless your residency position changes that. Your deductions are worked out exactly the way an Australian resident doing the same job would work them out."
  },
  {
    "question": "I did four different jobs in one year. Do I claim four separate lists?",
    "answer": "You lodge one return for the financial year and it carries every deduction from every job in it. What matters is that each expense is tied to work you were actually doing at the time. Boots bought for a warehouse job in September and sunscreen bought for a farm job in January both belong on the same return, and the fact that the employers were different does not split anything."
  },
  {
    "question": "What if I have lost the receipts?",
    "answer": "A bank or credit card statement showing the amount, the date and the supplier is usually accepted where a receipt is gone, and for many purchases that is all that ever existed. Under $300 of claims across the whole year, no written record is needed at all, only a sound basis for the figure. What you cannot do is invent a number and hope."
  },
  {
    "question": "Can I claim rent, food or travel while I was in Australia?",
    "answer": "No. Accommodation, groceries and the cost of getting around are private living expenses, and that stays true even when you moved to a regional town specifically to take a job. The narrow exception is travel your employer requires you to take that keeps you away from home overnight, which is a different rule and a different set of records."
  },
  {
    "question": "Is it worth claiming deductions if I only worked a few months?",
    "answer": "Usually yes. A short stint still involves real costs, and every dollar of deduction reduces the income the tax is calculated on. The bigger prize in a short year is often not the deductions at all, but the weeks taxed at 45 per cent before your Tax File Number reached the employer, and whether your residency position was reported correctly. Those two are worth more than a pair of boots."
  }
]

const GUIDES = [
  {
    "href": "/blog/tax-deductions-working-holiday-makers",
    "label": "Tax deductions for working holiday makers: the full list",
    "desc": "Every category, with what the ATO rejects and why."
  },
  {
    "href": "/blog/tools-equipment-under-300-instant-deduction-whv",
    "label": "The $300 instant deduction for tools and gear",
    "desc": "Why each item is tested on its own, and what a set does to the answer."
  },
  {
    "href": "/blog/1000-dollar-instant-deduction-rule-2026",
    "label": "The $1,000 instant deduction from 1 July 2026",
    "desc": "A flat claim with no receipts, or your actual costs. You only get one."
  }
]

const SERVICES = [
  {
    "href": "/tax-return",
    "label": "Tax return"
  },
  {
    "href": "/tfn",
    "label": "TFN"
  },
  {
    "href": "/tax-residency",
    "label": "Tax residency"
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
  headline: "Backpacker Tax Deductions, Job by Job",
  description: "A fruit picker and a delivery rider do not claim the same things. Find your line of work and see what actually applies.",
  url: `${SITE_URL}/expenses`,
  inLanguage: "en-AU",
  author: { '@type': 'Organization', name: 'Working Holiday Tax' },
  publisher: { '@type': 'Organization', name: 'Working Holiday Tax', url: SITE_URL },
}

const speakableSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/expenses#webpage`,
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.hero-sub'] },
  url: `${SITE_URL}/expenses`,
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
        lang={"en"}
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
              {HERO.h1lead}{' '}
              <span style={{ color: FOREST, fontStyle: 'italic' }}>{HERO.h1accent}</span>
            </h1>
            <p className="hero-sub" style={{ fontSize: '16.5px', lineHeight: 1.6, color: BODY, margin: 0 }}>
              {HERO.lede}
            </p>
            <Cta position="hero" />
          </div>
        </section>

        {/* THE OBJECTION, ANSWERED ABOUT DEDUCTIONS */}
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

            <p style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontSize: '18px', lineHeight: 1.45, fontWeight: 700, color: FOREST, margin: '22px 0 0' }}>
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
                lang={"en"}
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

      <MobileCta href={WA} lang={"en"} topic="expenses" />
    </>
  )
}
