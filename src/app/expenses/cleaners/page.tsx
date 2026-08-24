import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/lib/constants'
import { MobileCta } from '@/components/ui/MobileCta'
import { WaLink } from '@/app/HomeWa'
import { waUrl } from '@/lib/wa'

export const metadata: Metadata = {
  "title": { absolute: "Cleaner Tax Deductions Australia: Gear, Laundry, Travel" },
  "description": "What cleaners can claim on an Australian tax return: equipment and chemicals, protective gear, uniform laundry at the ATO rate, and the drive between jobs.",
  "keywords": [
    "cleaner tax deductions Australia",
    "cleaning equipment tax deduction ATO",
    "house cleaner tax ABN",
    "commercial cleaner tax deductions",
    "travel between cleaning jobs deduction",
    "uniform laundry deduction rate ATO",
    "working holiday cleaner tax",
    "Airtasker cleaning tax Australia"
  ],
  "alternates": {
    "canonical": "/expenses/cleaners",
    "languages": {
      "en-AU": "/expenses/cleaners",
      "de": "/de/expenses/cleaners",
      "ja": "/ja/expenses/cleaners",
      "x-default": "/expenses/cleaners"
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
    "url": `${SITE_URL}/expenses/cleaners`,
    "siteName": "Working Holiday Tax",
    "title": "Cleaner Tax Deductions Australia: Gear, Laundry, Travel",
    "description": "The drive between houses is usually the biggest claim on a cleaner return, and the one almost nobody makes."
  },
  "twitter": {
    "images": [
      `${SITE_URL}/og-image.png`
    ],
    "card": "summary_large_image",
    "title": "Cleaner Tax Deductions Australia: Gear, Laundry, Travel",
    "description": "The drive between houses is usually the biggest claim on a cleaner return, and the one almost nobody makes."
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

const WA = waUrl({ topic: 'expenses', lang: "en", detail: "Cleaning work" })

const UI = {
  "ctaLabel": "Message us on WhatsApp",
  "ctaSub": "Replies in about an hour.",
  "guaranteeHeading": "If your refund is less than our fee, we refund the difference, so you are never out of pocket.",
  "guaranteeBody": "Cleaning returns land on our desk every week, and every one of them belongs to somebody on a 417 or 462 visa. Reviewed and signed off by a registered tax agent before it is lodged with the ATO.",
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
  },
  {
    "name": "Cleaning",
    "item": "/expenses/cleaners"
  }
]

const HERO = {
  "kicker": "Houses, offices, end of lease and app work",
  "h1lead": "The drive between houses is the claim.",
  "h1accent": "Almost nobody makes it.",
  "lede": "Chemicals, gloves and uniform laundry at the ATO rate are all on the list too, and the gear adds up faster than people expect."
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
    "h2": "What can a cleaner claim on tax?",
    "paras": [
      "A cleaner can claim equipment and cleaning products bought out of their own pocket, protective gear such as gloves, an apron, safety glasses or steel caps, the laundering of a compulsory uniform or protective clothing, and the travel between one cleaning job and the next in the same day. Anything a client or employer supplies or reimburses is excluded.",
      "Cleaning is unusual because the work moves. Three houses in a day means two deductible legs of travel, and over a year that is normally the largest single figure on the return."
    ]
  },
  {
    "kind": "items",
    "h2": "The claims that belong to this work specifically",
    "intro": "Most cleaning gear sits well under $300, which means it is claimed in full in the year you buy it rather than written off slowly.",
    "items": [
      {
        "t": "Travel between cleaning jobs",
        "d": "The drive from one house or office to the next once your day has started is travel between workplaces, not a commute, and it is deductible. It is worked out with the cents per kilometre method or a logbook. The first trip of the day, and the last one home, stay private."
      },
      {
        "t": "Equipment and cleaning products",
        "d": "Mops, buckets, wringers, scrapers, blades, cloths, chemicals and consumables you buy yourself. Each item of $300 or less is claimed in full in the year of purchase. A starter kit bought together for $300 or more is treated as one asset and written off across its life, even where each piece alone would have been under the threshold."
      },
      {
        "t": "Larger equipment of $300 or more",
        "d": "A commercial vacuum, a floor buffer, a pressure washer. Still deductible, spread across the effective life of the item rather than claimed at once."
      },
      {
        "t": "Protective gear",
        "d": "Gloves, an apron, safety glasses or a face shield for jobs with strong chemicals or dust, steel caps for site and commercial work. These qualify because they protect you from a hazard of the job rather than because you happen to wear them at work."
      },
      {
        "t": "Laundering deductible work clothing",
        "d": "Washing a compulsory uniform or genuine protective clothing is claimable at the ATO rate: $1 a load where the load is only work items, or 50 cents a load washed in with everything else. Past $150 of laundry claims for the year, keep a simple diary rather than an estimate."
      },
      {
        "t": "The work share of your phone",
        "d": "Real for anyone taking bookings, running an app or messaging clients about access and keys. Claim the work related percentage on a fair basis, not the whole plan."
      }
    ]
  },
  {
    "kind": "answer",
    "h2": "What does a cleaner have to keep?",
    "paras": [
      "Three tests behind every claim: you paid for it, nobody paid you back, and it went to earning the income you are declaring. For a cleaner that means the receipts for chemicals and gear, and a record of the dates, addresses and kilometres behind the driving.",
      "A receipt, an invoice, a bank statement or a phone photo showing the amount, the date, the supplier and the item all count, and they have to last five years. Under $300 of work claims for the whole year, no written evidence is needed. That is a different $300 from the one deciding how a single vacuum is written off."
    ]
  },
  {
    "kind": "tables",
    "h2": "How are car expenses worked out?",
    "intro": "Two methods, one per car per year. For a cleaner only the legs between jobs count, never the run from home to the first house.",
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
    "note": "Three or four addresses a day clears 5,000 kilometres faster than most cleaners expect, and past that point the logbook usually wins, because it picks up fuel, insurance, registration, servicing, depreciation and the interest on a car loan instead of a flat rate."
  },
  {
    "kind": "traps",
    "h2": "What do cleaners get wrong?",
    "intro": "The wrong claims cluster around clothing and the first trip of the day. The missed ones are almost all travel.",
    "wrong": [
      {
        "t": "Plain black trousers and a plain polo",
        "d": "Even where a client or agency insists on a colour, conventional clothing is private. It does not become a uniform because somebody requires it, and it does not become deductible because bleach ruined it."
      },
      {
        "t": "The first and last trip of the day",
        "d": "Home to the first job, and the last job home, are ordinary commuting. Only the legs in between are claimable, unless you meet the bulky equipment exception, which needs the gear to be essential, genuinely bulky, and impossible to store securely at any of the workplaces."
      },
      {
        "t": "Products and equipment the client supplies",
        "d": "If the house you clean keeps the chemicals under the sink, or the company issues the gear, there is no cost with you to deduct. The same applies to anything you were reimbursed for."
      },
      {
        "t": "Treating an ABN as a licence to claim everything",
        "d": "Having an ABN does not turn private spending into a business expense. Your phone, your car and your clothes are still apportioned, and the personal share still comes out."
      },
      {
        "t": "Assuming cash jobs do not need declaring",
        "d": "Cleaning income is income whether it arrives by bank transfer, an app payout or an envelope. Leaving it off does not make it invisible, it makes the return wrong."
      }
    ],
    "missed": [
      {
        "t": "The travel between jobs",
        "d": "Cleaners work three or four addresses a day and claim none of the driving, because it does not feel like a work trip. Note the date, the addresses and the kilometres as you go, and it becomes the biggest deduction on the return."
      },
      {
        "t": "Every bottle and cloth, one purchase at a time",
        "d": "Consumables are bought constantly and receipted almost never. A running photo of the receipt in a phone album is enough, and over a year it is a real figure."
      },
      {
        "t": "Laundry, at a published rate",
        "d": "Washing protective clothing and a compulsory uniform is deductible at $1 or 50 cents a load, and almost nobody knows the rate exists."
      },
      {
        "t": "Gear bought while setting yourself up",
        "d": "Equipment and chemicals bought around the time you registered an ABN and began looking for clients are generally claimable, even though the first invoice came later. A long gap between the purchase and the first job weakens that, so keep the dates."
      },
      {
        "t": "Weeks withheld at the wrong rate by a cleaning company",
        "d": "If a company never received your Tax File Number Declaration, or is not registered with the ATO as an employer of working holiday makers, far more than 15 per cent came out. It comes back on the return and not before."
      }
    ]
  },
  {
    "kind": "answer",
    "h2": "What changes depending on who you clean for?",
    "paras": [
      "Sole trader or employee is the first fork, and it decides everything after it. Private houses, end of lease jobs and app bookings through something like Airtasker are ABN income: you set the price, you invoice, nothing is withheld, no super is paid. Rostered onto sites and shifts by a cleaning company is employment under a TFN, tax withheld and super on top. Both in one year is normal, and both go on one return.",
      "A company that set your roster, supervised your work and supplied the products, then asked you to get an ABN, may be an employer wearing a contractor label. Worth checking before you accept the paperwork.",
      "For a sole trader GST only becomes compulsory once cleaning turnover passes $75,000 in a year, which part time cleaning rarely approaches. Residency sits under all of it and is worth more than the whole deduction list: British, German and Japanese passport holders who were Australian residents for tax purposes can carry the full tax free threshold under the Addy decision."
    ]
  }
]

const FAQS = [
  {
    "question": "Can I claim the drive between cleaning jobs?",
    "answer": "Yes. Travelling from one cleaning job to the next in the same day is travel between workplaces rather than commuting, and it is deductible using the cents per kilometre method or a logbook. What is not deductible is the first trip from home to your first job and the last trip home, unless you are carrying genuinely bulky equipment that is essential to the work and cannot be stored securely at any of the sites."
  },
  {
    "question": "What cleaning equipment and products can I claim?",
    "answer": "Anything you bought yourself and were not reimbursed for: mops, buckets, wringers, scrapers, blades, cloths, chemicals and consumables. Items costing $300 or less each are claimed in full in the year you buy them. Larger items such as a commercial vacuum or a floor buffer are still deductible, spread across the effective life of the item instead of claimed at once."
  },
  {
    "question": "Can I claim my uniform and the cost of washing it?",
    "answer": "You can claim a required uniform your employer or client does not supply, and protective gear with a genuine safety function such as gloves, an apron, safety glasses or steel caps. You cannot claim plain black trousers or a plain polo, even where cleaning is the only reason you own them. Washing deductible work clothing is claimable at $1 a load for work only loads, or 50 cents a load when mixed with everyday clothing, with a simple diary once claims pass $150 for the year."
  },
  {
    "question": "Do I need to register for GST as a cleaner with an ABN?",
    "answer": "Only once your turnover from cleaning work passes $75,000 in a year. That is the general threshold for any sole trader rather than a cleaning specific rule, and most people cleaning part time, privately or through an app never come near it. Below the threshold you simply invoice without a GST line."
  },
  {
    "question": "Am I a sole trader or an employee?",
    "answer": "Look at who controls the work, not at what the paperwork calls you. If you set your own price, choose which jobs to take and could send somebody else in your place, that is sole trader work under an ABN. If another business sets your roster, supervises you and supplies the products, that is employment however the contract is labelled, and tax and super should be coming with it. Plenty of cleaners are both across one year, and both belong on the same return."
  }
]

const GUIDES = [
  {
    "href": "/blog/abn-deductions-business-expenses",
    "label": "Business expenses when you work under an ABN",
    "desc": "What a sole trader can deduct, and where the line sits."
  },
  {
    "href": "/blog/tools-equipment-under-300-instant-deduction-whv",
    "label": "The $300 instant deduction for tools and gear",
    "desc": "Why each item is tested on its own, and what a set does to the answer."
  },
  {
    "href": "/blog/tax-deductions-working-holiday-makers",
    "label": "Tax deductions for working holiday makers: the full list",
    "desc": "Every category, with what the ATO rejects and why."
  }
]

const SERVICES = [
  {
    "href": "/abn",
    "label": "ABN"
  },
  {
    "href": "/tfn",
    "label": "TFN"
  },
  {
    "href": "/tax-return",
    "label": "Tax return"
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
  headline: "Cleaner Tax Deductions Australia: Gear, Laundry, Travel",
  description: "The drive between houses is usually the biggest claim on a cleaner return, and the one almost nobody makes.",
  url: `${SITE_URL}/expenses/cleaners`,
  inLanguage: "en-AU",
  author: { '@type': 'Organization', name: 'Working Holiday Tax' },
  publisher: { '@type': 'Organization', name: 'Working Holiday Tax', url: SITE_URL },
}

const speakableSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/expenses/cleaners#webpage`,
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.hero-sub'] },
  url: `${SITE_URL}/expenses/cleaners`,
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

      <MobileCta href={WA} lang={"en"} topic="expenses" />
    </>
  )
}
