import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/lib/constants'
import { MobileCta } from '@/components/ui/MobileCta'
import { WaLink } from '@/app/(site)/HomeWa'
import { waUrl } from '@/lib/wa'

export const metadata: Metadata = {
  "title": { absolute: "Hospitality Tax Deductions Australia: RSA, Shoes, Uniform" },
  "description": "What bar, cafe, restaurant and kitchen staff can claim on an Australian tax return: RSA renewals, non slip shoes, chef whites and uniform laundry.",
  "keywords": [
    "hospitality tax deductions Australia",
    "bartender tax deductions",
    "waiter tax deductions Australia",
    "chef tax deductions Australia",
    "RSA certificate tax deductible",
    "can I claim my work shoes tax",
    "are tips taxable Australia",
    "working holiday hospitality tax"
  ],
  "alternates": {
    "canonical": "/expenses/hospitality",
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
    "locale": "en_AU",
    "url": `${SITE_URL}/expenses/hospitality`,
    "siteName": "Working Holiday Tax",
    "title": "Hospitality Tax Deductions Australia: RSA, Shoes, Uniform",
    "description": "Non slip shoes and chef whites are deductible. The all black outfit your venue insists on is not. What hospitality actually claims."
  },
  "twitter": {
    "images": [
      `${SITE_URL}/og-image.png`
    ],
    "card": "summary_large_image",
    "title": "Hospitality Tax Deductions Australia: RSA, Shoes, Uniform",
    "description": "Non slip shoes and chef whites are deductible. The all black outfit your venue insists on is not. What hospitality actually claims."
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

const WA = waUrl({ topic: 'expenses', lang: "en", detail: "Hospitality, bar and kitchen work" })

const UI = {
  "ctaLabel": "Message us on WhatsApp",
  "ctaSub": "Replies in about an hour.",
  "guaranteeHeading": "If your refund is less than our fee, we refund the difference, so you are never out of pocket.",
  "guaranteeBody": "Four venues, four income statements and super in four funds is the usual hospitality year here, and every client is on a 417 or a 462. Reviewed and signed off by a registered tax agent before it is lodged with the ATO.",
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
    "name": "Hospitality",
    "item": "/expenses/hospitality"
  }
]

const HERO = {
  "kicker": "Bars, cafes, restaurants and kitchens",
  "h1lead": "Your non slip shoes are deductible.",
  "h1accent": "The all black outfit is not.",
  "lede": "The list is short, so the money on a hospitality return usually sits on the income side: several venues, several withholding rates, super in several funds."
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
    "h2": "What can a bar, cafe or kitchen worker claim on tax?",
    "paras": [
      "Hospitality staff can claim protective non slip footwear, occupation specific clothing such as chef whites and checked chef trousers, the laundering of a compulsory uniform that carries an employer logo, renewals of an RSA or Food Safety Supervisor certificate, and kitchen tools bought out of their own pocket. Everything else in the wardrobe is ordinary clothing.",
      "Hospitality gives you little that is unique to the job. You are indoors, your employer supplies the equipment, and the clothing a venue asks for is usually clothing anybody could wear anywhere."
    ]
  },
  {
    "kind": "items",
    "h2": "The claims that belong to this work specifically",
    "intro": "Clothing carries an extra test on top of the general ones, and it is where nearly every hospitality dispute happens.",
    "items": [
      {
        "t": "Non slip, enclosed protective footwear",
        "d": "Deductible where you need it: a wet floor behind a bar, spills around a coffee machine, hot plates across a kitchen pass. They count as protective footwear rather than ordinary shoes because they do a specific safety job, whatever colour they are."
      },
      {
        "t": "Chef whites and checked chef trousers",
        "d": "Occupation specific clothing: it identifies you as a member of a particular trade and would look absurd anywhere else. That is a recognised category, separate from a branded uniform, and it is why a chef gets a clothing deduction and a waiter usually does not."
      },
      {
        "t": "Laundering a compulsory uniform with a logo",
        "d": "If your employer requires a uniform carrying their logo or a genuinely distinctive design, washing it is deductible at $1 a load of work items only, or 50 cents a load washed in with everything else. Past $150 of laundry claims for the year you need a diary rather than an estimate."
      },
      {
        "t": "Renewing an RSA or Food Safety Supervisor certificate",
        "d": "Renewing a certificate you already hold, while working in the role that needs it, is deductible. Your first one is not, on the same distinction the ATO applies to a first drivers licence."
      },
      {
        "t": "Knives and kitchen tools you bought yourself",
        "d": "A knife roll, your own chef knives, a thermometer, a mandoline. Each item costing $300 or less is claimed in full in the year you bought it. A set bought together for $300 or more is one asset, written off across its effective life, even if each piece would have been under $300 alone."
      },
      {
        "t": "Aprons, gloves and protective gear you paid for",
        "d": "Heat resistant gloves, cut resistant gloves, a protective apron. Deductible where they protect you from a hazard of the job and your employer did not supply them or pay you back."
      }
    ]
  },
  {
    "kind": "answer",
    "h2": "What has to sit behind a hospitality claim?",
    "paras": [
      "The same three tests as everywhere: the money was yours, nobody paid it back, and it went to earning the income you are declaring. In a venue that is the receipt for the shoes and the knife roll, the written uniform policy, and a laundry diary once the loads add up.",
      "Any record showing the amount, the date, the supplier and the item does the job, and it has to survive five years. A year of claims totalling $300 or less needs no written evidence. That is a different $300 from the one deciding whether a knife set is written off at once or over its life."
    ]
  },
  {
    "kind": "traps",
    "h2": "What do hospitality workers get wrong?",
    "intro": "The clothing rule catches everybody, because it feels unfair. The missed claims are quieter and usually about pay.",
    "wrong": [
      {
        "t": "The all black outfit the venue requires",
        "d": "Plain black trousers, a plain black shirt, plain black shoes with no logo. The ATO looks at what the item is, and conventional clothing is private whatever the dress code says."
      },
      {
        "t": "Your first RSA",
        "d": "The certificate you paid for before you had the job made you eligible to be hired, which is a private cost. Once you are working and it needs renewing, the renewal is deductible."
      },
      {
        "t": "Haircuts, grooming and makeup for a front of house standard",
        "d": "Personal grooming stays private even where a venue has a written standard for it."
      },
      {
        "t": "A meal on shift, or a drink after close",
        "d": "Staff meals and knock off drinks are private, whether you paid, got a discount, or were given them."
      },
      {
        "t": "Cash tips left off the return",
        "d": "This one runs the other way. Tips handed to you directly are taxable income even though nobody tracks them. Pooled tips and service charges paid through payroll are already in your income statement, but cash is yours to declare."
      }
    ],
    "missed": [
      {
        "t": "Laundering a logo uniform, all year",
        "d": "A few dollars a week that almost nobody claims, because washing a shirt does not feel like a tax matter. The ATO publishes the rate, so there is no estimating involved."
      },
      {
        "t": "The non slip shoes, because \"you cannot claim clothes\"",
        "d": "People read that hospitality clothing is not deductible, correctly, then apply it to protective footwear, incorrectly. Protective shoes are a different category and are claimable."
      },
      {
        "t": "A second or third employer withholding at the wrong rate",
        "d": "If a venue never got your Tax File Number Declaration, or is not registered with the ATO as an employer of working holiday makers, it withholds far more than 15 per cent. None of it is lost, but it only comes back on a return that brings every employer together."
      },
      {
        "t": "Super sitting in three different funds",
        "d": "Every venue pays 12 per cent super on top of your wages from the first dollar, with no minimum monthly earnings. Four casual jobs can leave four accounts, each charging fees, and most people only ever find one."
      },
      {
        "t": "A venue that unlawfully charged you for the uniform",
        "d": "Not a deduction. Deductions from your wages for uniforms, laundry, breakages or till shortages are almost always unlawful under the Fair Work Act, so that is money back rather than a tax claim."
      }
    ]
  },
  {
    "kind": "answer",
    "h2": "What has to be judged rather than looked up?",
    "paras": [
      "The clothing question, first. Whether an item is a compulsory uniform turns on how distinctive it is and whether the employer requires it. Whether footwear is protective turns on the hazard in your venue. A written uniform policy and a photograph usually settle it.",
      "The income side is where a professional view pays. Working holiday makers do not get the tax free threshold, so a venue that withholds as though you do leaves a bill behind. That changes if the Addy decision applies to you, which it can for British, German and Japanese passport holders who were Australian residents for tax purposes. It depends on your own circumstances and has to be reviewed properly."
    ]
  }
]

const FAQS = [
  {
    "question": "Can I claim my black work shoes and trousers?",
    "answer": "Plain black clothing with no logo is not deductible, even where the dress code requires it, because the ATO treats it as ordinary clothing rather than a uniform.\n\nNon slip enclosed shoes are different. If you need them for a wet bar floor or a busy kitchen pass they are protective footwear and deductible whatever colour they are."
  },
  {
    "question": "Can I claim my RSA certificate?",
    "answer": "You can claim renewing an RSA you already hold while working in a role that requires it. The first one is not, because the ATO treats getting yourself qualified as a private cost, like a first drivers licence.\n\nA Food Safety Supervisor certificate follows the same rule."
  },
  {
    "question": "Are my tips taxable?",
    "answer": "Yes, all of them. Tips and service charges paid through payroll, including a pooled or tronc arrangement, are part of your wages, already taxed and on your income statement.\n\nCash handed to you directly is just as taxable but nobody tracks it, so keep a running note and declare the total."
  },
  {
    "question": "I work at three venues. Does that change my tax?",
    "answer": "Each venue is a separate employer with its own Tax File Number Declaration, withholding and income statement, and every one belongs on the same return.\n\nWorking holiday makers do not get a tax free threshold from any employer, so a venue that withholds as though you do leaves a bill behind."
  },
  {
    "question": "Do I get super on a casual hospitality job?",
    "answer": "Yes. Your employer pays 12 per cent super on top of your wages for casual work from your first dollar, with no minimum monthly earnings threshold.\n\nEach venue pays independently, so several jobs usually means more than one fund, worth tracking down before you leave Australia."
  }
]

const GUIDES = [
  {
    "href": "/blog/hospitality-award-working-holiday-makers",
    "label": "The Hospitality Award and what you should be paid",
    "desc": "Casual loading, penalty rates and where venues get it wrong."
  },
  {
    "href": "/blog/uniform-laundry-deductions-illegal-australia",
    "label": "Uniform and laundry costs taken out of your pay",
    "desc": "When a deduction from your wages is unlawful, and how to get it back."
  },
  {
    "href": "/blog/tax-deductions-working-holiday-makers",
    "label": "Tax deductions for working holiday makers: the full list",
    "desc": "Every category, with what the ATO rejects and why."
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
    "href": "/superannuation",
    "label": "Superannuation"
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
  headline: "Hospitality Tax Deductions Australia: RSA, Shoes, Uniform",
  description: "Non slip shoes and chef whites are deductible. The all black outfit your venue insists on is not. What hospitality actually claims.",
  url: `${SITE_URL}/expenses/hospitality`,
  inLanguage: "en-AU",
  author: { '@type': 'Organization', name: 'Working Holiday Tax' },
  publisher: { '@type': 'Organization', name: 'Working Holiday Tax', url: SITE_URL },
}

const speakableSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/expenses/hospitality#webpage`,
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.hero-sub'] },
  url: `${SITE_URL}/expenses/hospitality`,
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
