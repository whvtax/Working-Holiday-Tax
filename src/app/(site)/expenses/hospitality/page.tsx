import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/constants'
import { waUrl } from '@/lib/wa'
import { JobExpensesPage, type Section } from '@/components/expenses/JobExpensesPage'

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
  "guaranteeHeading": "If you get a refund and it comes to less than our fee, we refund the difference. If you owe tax instead, the fee covers our review and is not refundable.",
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

/* Everything below the content is shared: the schema builders, the tokens and
   every section renderer live in JobExpensesPage, once, for all 21 job pages. */
export default function Page() {
  return (
    <JobExpensesPage
      content={{
        lang: 'en',
        path: '/expenses/hospitality',
        articleHeadline: "Hospitality Tax Deductions Australia: RSA, Shoes, Uniform",
        articleDescription: "Non slip shoes and chef whites are deductible. The all black outfit your venue insists on is not. What hospitality actually claims.",
        inLanguage: "en-AU",
        WA, UI, crumbs: CRUMBS, hero: HERO, sections: SECTIONS, faqs: FAQS, guides: GUIDES, services: SERVICES,
      }}
    />
  )
}
