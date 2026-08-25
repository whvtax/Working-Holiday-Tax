import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/lib/constants'
import { MobileCta } from '@/components/ui/MobileCta'
import { WaLink } from '@/app/HomeWa'
import { waUrl } from '@/lib/wa'

export const metadata: Metadata = {
  "title": { absolute: "Delivery Driver Tax Deductions Australia: Car, Phone, GST" },
  "description": "What Uber Eats, DoorDash, Menulog and Amazon Flex riders can claim: car and bike running costs, the work share of a phone, bags and gear.",
  "keywords": [
    "delivery driver tax deductions Australia",
    "Uber Eats tax working holiday",
    "DoorDash tax Australia",
    "food delivery driver tax deductions",
    "cents per kilometre delivery driver",
    "delivery rider ABN working holiday",
    "GST rideshare threshold Australia",
    "bicycle delivery tax deduction"
  ],
  "alternates": {
    "canonical": "/expenses/delivery-drivers",
    "languages": {
      "en-AU": "/expenses/delivery-drivers",
      "de": "/de/expenses/delivery-drivers",
      "ja": "/ja/expenses/delivery-drivers",
      "x-default": "/expenses/delivery-drivers"
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
    "url": `${SITE_URL}/expenses/delivery-drivers`,
    "siteName": "Working Holiday Tax",
    "title": "Delivery Driver Tax Deductions Australia: Car, Phone, GST",
    "description": "Your kilometres and the work share of your phone are the whole game. Fines and the private leg never were."
  },
  "twitter": {
    "images": [
      `${SITE_URL}/og-image.png`
    ],
    "card": "summary_large_image",
    "title": "Delivery Driver Tax Deductions Australia: Car, Phone, GST",
    "description": "Your kilometres and the work share of your phone are the whole game. Fines and the private leg never were."
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

const WA = waUrl({ topic: 'expenses', lang: "en", detail: "Delivery driving and rideshare" })

const UI = {
  "ctaLabel": "Message us on WhatsApp",
  "ctaSub": "Replies in about an hour.",
  "guaranteeHeading": "If your refund is less than our fee, we refund the difference, so you are never out of pocket.",
  "guaranteeBody": "Platform riders on 417 and 462 visas are a large part of what we do, which is why the logbook question and the GST line get settled before the return is written. Reviewed and signed off by a registered tax agent before it is lodged with the ATO.",
  "faqHeading": "Questions people ask about this",
  "guidesHeading": "Worth reading next",
  "otherJobs": "A different job? Every occupation is here.",
  "servicesLabel": "Elsewhere on the site",
  "wrongLabel": "Claimed, and it should not have been",
  "missedLabel": "Not claimed, and it should have been",
  "disclaimer": "This is general information, not personal tax advice. What you can claim depends on your own employers, your own records, and how you actually worked. When you lodge with us we go through your situation line by line.",
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
    "name": "Delivery driving",
    "item": "/expenses/delivery-drivers"
  }
]

const HERO = {
  "kicker": "Uber Eats, DoorDash, Menulog, Amazon Flex",
  "h1lead": "Your kilometres are the deduction.",
  "h1accent": "Almost everything else is small.",
  "lede": "Cents per kilometre or a logbook, one per car per year. Choosing the wrong one is the most expensive mistake in the trade."
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
    "h2": "What can a delivery driver or rider claim on tax?",
    "paras": [
      "A delivery driver can claim the work related portion of running a car, bike or scooter, the work related share of a phone and data plan, parking paid while working, cleaning to keep a vehicle fit to carry food, and gear bought for the job such as a thermal bag, a phone mount, a helmet or hi vis. The private share of everything is excluded.",
      "Almost all of the value sits in the vehicle. A rider doing steady hours puts up kilometres no other backpacker job produces, and over a year the difference between the two methods is often larger than every other deduction combined."
    ]
  },
  {
    "kind": "items",
    "h2": "The claims that belong to this work specifically",
    "intro": "Everything here is apportioned. You claim the work share, and you need a fair basis for the number you used.",
    "items": [
      {
        "t": "Car running costs",
        "d": "Claimed through the cents per kilometre method or a logbook, compared below. The logbook works on your real running costs at a work use percentage, cents per kilometre on a flat rate."
      },
      {
        "t": "Bike, e-bike and scooter costs",
        "d": "Running, repair and maintenance costs are claimable at the work related share, along with a helmet, hi vis and lights. Bikes and scooters are not cars for tax purposes, so the cents per kilometre method does not apply and you claim actual costs apportioned instead."
      },
      {
        "t": "The work share of your phone and data",
        "d": "The whole job runs through an app, so the working percentage of your plan is a genuine deduction. Work out that percentage honestly over a representative period."
      },
      {
        "t": "Parking paid while working",
        "d": "The five dollars at a shopping centre while an order is bagged is deductible. Fines never are."
      },
      {
        "t": "Gear bought for the job",
        "d": "A thermal delivery bag, a phone mount, a charger, a bike lock, wet weather gear, a head torch. Each item costing $300 or less is deducted in full in the year you bought it."
      },
      {
        "t": "Cleaning the vehicle for the work",
        "d": "Keeping a car in a state fit to carry food, or a bike serviceable, is claimable at the work related share."
      }
    ]
  },
  {
    "kind": "tables",
    "h2": "How are car expenses worked out?",
    "intro": "Only work driving counts under either method, and for a rostered driver the run from home to the shop never does.",
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
    "note": "A steady rider passes 5,000 kilometres in a few months, and beyond that the logbook is normally the bigger claim: fuel, insurance, registration, servicing, depreciation and loan interest at your work percentage."
  },
  {
    "kind": "answer",
    "h2": "What does a rider need to be able to produce?",
    "paras": [
      "Every claim rests on three things: you paid, nobody paid you back, and the money went to earning the income you are declaring. For a rider that is a logbook or kilometre record, the phone bill behind your work percentage, and receipts for the bag, the mount and the gear.",
      "A receipt, an invoice, a bank statement or a phone photo showing the amount, the date, the supplier and the item all qualify, kept five years. Work claims totalling $300 or less across the year need no written evidence. That is a different $300 from the one deciding whether an item is written off at once or over its life."
    ]
  },
  {
    "kind": "note",
    "label": "The one that surprises people",
    "title": "Food delivery and passengers are not the same for GST.",
    "body": "If you only deliver food and parcels, GST registration is compulsory once your turnover passes $75,000 a year, which most riders never approach. The moment you carry a paying passenger, that threshold disappears.\n\nRide sourcing requires GST registration from the first fare, whatever you earn, and business activity statements with it. Anyone driving Uber Eats during the week and taking passenger trips on a Friday night has stepped over that line."
  },
  {
    "kind": "traps",
    "h2": "What do delivery drivers get wrong?",
    "intro": "The overstated claims here are bigger than in any other occupation, because the numbers are. So are the missed ones.",
    "wrong": [
      {
        "t": "The whole phone bill",
        "d": "Claiming one hundred per cent of a plan you also use for everything else is not defensible, and the ATO can test it against how the rest of the return looks."
      },
      {
        "t": "Fines",
        "d": "A parking ticket picked up while running an order upstairs is still not deductible. Neither is a speeding fine, however tight the drop off window was."
      },
      {
        "t": "Food bought while working",
        "d": "Your own dinner between drops is private."
      },
      {
        "t": "Every kilometre driven with the app open",
        "d": "The private leg of a trip does not become work travel because the app was running. An errand on the way to a drop off comes out of the claim, and for an employed driver the commute to the shop is out as well."
      },
      {
        "t": "Leaving small platform income off entirely",
        "d": "Uber, DoorDash and the rest report driver income to the ATO under the sharing economy reporting regime. Your earnings are already visible, so a few hundred dollars of weekend work left off a return is a mismatch, not a saving."
      }
    ],
    "missed": [
      {
        "t": "The logbook, when the logbook was clearly better",
        "d": "The cents per kilometre method caps out at 5,000 kilometres. A steady rider clears that easily, and everything past it is lost. Twelve weeks of logbook, kept once, is valid for five years."
      },
      {
        "t": "Interest, insurance, rego and depreciation",
        "d": "These are only available through the logbook method, and they are usually the reason it wins. People choose cents per kilometre because it is easier and never find out what the alternative paid."
      },
      {
        "t": "The thermal bag and the phone mount",
        "d": "Small, obvious, entirely deductible, and thrown out with the receipt. The same goes for a helmet, lights and wet weather gear."
      },
      {
        "t": "Costs incurred before the first delivery",
        "d": "Gear bought while you were setting up, around the time you registered the ABN and signed up to the platform, is generally claimable. The gap between buying and starting matters, so keep the dates."
      },
      {
        "t": "The whole return, by ABN riders who assume they owe rather than claim",
        "d": "No tax is withheld from platform payouts, so the money lands whole and people brace for a bill. Deductions against that income are what shrinks it, and they are most often left out."
      }
    ]
  },
  {
    "kind": "answer",
    "h2": "What depends on how you ride, not on the rules?",
    "paras": [
      "Uber Eats, DoorDash, Menulog and Amazon Flex engage riders as contractors: an ABN, nothing withheld, no super. A roster at one pizza shop that hands you a payslip is employment under a TFN. A shop that sets your shifts, supervises your work and supplies the bike, then asks you to register an ABN, may be an employer in disguise.",
      "Where the deductible driving starts follows from that. An employee's trip to the shop is private, and only shop to drop off counts. Under an ABN the driving is the work.",
      "Residency decides how the profit is taxed at all. British, German and Japanese passport holders who were residents of Australia for tax purposes can carry the full tax free threshold under the Addy decision. It depends on your own circumstances and has to be reviewed properly."
    ]
  }
]

const FAQS = [
  {
    "question": "Do I need an ABN to deliver for Uber Eats or DoorDash?",
    "answer": "Yes. Those platforms engage riders and drivers as contractors rather than employees, so an ABN is required before you can be paid.\n\nIt does not replace a TFN. Nothing is withheld from your payouts, so the income arrives whole and the tax is settled when the return is lodged."
  },
  {
    "question": "Which car expense method should I use?",
    "answer": "It depends on how far you drive and what the car costs to run. Cents per kilometre needs no receipts but caps at 5,000 work kilometres a year, and everything beyond that is lost.\n\nA logbook has no cap and picks up actual running costs at your work use percentage, for twelve continuous weeks of records and a receipt for every expense."
  },
  {
    "question": "Can I claim my phone bill?",
    "answer": "You can claim the work related percentage of your phone and data plan: the share used for the driver app, navigation and job messages.\n\nYou cannot claim the whole bill if you also use the phone for ordinary life, so you need a fair basis for the percentage and something to support it."
  },
  {
    "question": "Do I need to register for GST?",
    "answer": "For food and parcel delivery only, GST registration becomes compulsory once turnover passes $75,000 a year, and most part time riders never get close.\n\nCarrying paying passengers is different: that requires GST registration from the first dollar, whatever the turnover."
  },
  {
    "question": "I ride a bike, not a car. Can I claim anything?",
    "answer": "Yes. A bicycle or e-scooter is not a car for tax purposes, so the cents per kilometre method does not apply, but you can claim the work related share of running, repair and maintenance costs, plus a helmet, lights and hi vis.\n\nApportion between delivery riding and personal use on a fair basis."
  }
]

const GUIDES = [
  {
    "href": "/blog/uber-doordash-rideshare-abn-working-holiday",
    "label": "Uber, DoorDash and your ABN",
    "desc": "Why the platforms need one, and what changes the moment you have it."
  },
  {
    "href": "/blog/bicycle-motorcycle-vehicle-deductions-working-holiday",
    "label": "Bike, scooter and car deductions",
    "desc": "How each vehicle is treated, and which method suits which one."
  },
  {
    "href": "/blog/uber-eats-delivery-rider-working-holiday-australia",
    "label": "Delivery riding on a working holiday",
    "desc": "What the work actually pays once the costs come out."
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
  headline: "Delivery Driver Tax Deductions Australia: Car, Phone, GST",
  description: "Your kilometres and the work share of your phone are the whole game. Fines and the private leg never were.",
  url: `${SITE_URL}/expenses/delivery-drivers`,
  inLanguage: "en-AU",
  author: { '@type': 'Organization', name: 'Working Holiday Tax' },
  publisher: { '@type': 'Organization', name: 'Working Holiday Tax', url: SITE_URL },
}

const speakableSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/expenses/delivery-drivers#webpage`,
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.hero-sub'] },
  url: `${SITE_URL}/expenses/delivery-drivers`,
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
  margin: '0 0 16px',
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
                  {s.body.split('\n\n').map((para, j, arr) => (
                    <p key={j} style={{ ...ps, margin: j === arr.length - 1 ? 0 : ps.margin }}>{para}</p>
                  ))}
                </div>
              )}
            </div>
          </section>
        ))}

        {/* GUARANTEE + CTA */}
        <section style={{ background: '#0B5240', padding: '38px 0' }}>
          <div style={wrap}>
            <h2 style={{ ...h2s, color: '#fff', marginBottom: '16px' }}>{UI.guaranteeHeading}</h2>
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
                {/* Split on a blank line so a long answer reads as two short
                    paragraphs. faqSchema still uses the raw string. */}
                {f.answer.split('\n\n').map((para, j, arr) => (
                  <p key={j} style={{ ...ps, margin: j === arr.length - 1 ? 0 : ps.margin }}>{para}</p>
                ))}
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
