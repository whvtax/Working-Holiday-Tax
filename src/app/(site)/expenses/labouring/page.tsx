import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/constants'
import { waUrl } from '@/lib/wa'
import { JobExpensesPage, type Section } from '@/components/expenses/JobExpensesPage'

export const metadata: Metadata = {
  "title": { absolute: "Labour Hire and Warehouse Tax Deductions Australia" },
  "description": "What labourers placed by staffing agencies can claim: protective gear per host site, ticket renewals, tools, and travel between sites in the same day.",
  "keywords": [
    "labour hire tax deductions",
    "warehouse job tax deductions Australia",
    "labour hire agency tax working holiday",
    "staffing agency tax deductions Australia",
    "general labourer tax deductions Australia",
    "travel between job sites deduction ATO",
    "forklift licence tax deductible",
    "backpacker warehouse job tax"
  ],
  "alternates": {
    "canonical": "/expenses/labouring",
    "languages": {
      "en-AU": "/expenses/labouring",
      "de": "/de/expenses/labouring",
      "ja": "/ja/expenses/labouring",
      "x-default": "/expenses/labouring"
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
    "url": `${SITE_URL}/expenses/labouring`,
    "siteName": "Working Holiday Tax",
    "title": "Labour Hire and Warehouse Tax Deductions Australia",
    "description": "Two agencies is two income statements. Two sites in one day is a deduction almost nobody claims."
  },
  "twitter": {
    "images": [
      `${SITE_URL}/og-image.png`
    ],
    "card": "summary_large_image",
    "title": "Labour Hire and Warehouse Tax Deductions Australia",
    "description": "Two agencies is two income statements. Two sites in one day is a deduction almost nobody claims."
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

const WA = waUrl({ topic: 'expenses', lang: "en", detail: "Labour hire and warehouse work" })

const UI = {
  "ctaLabel": "Message us on WhatsApp",
  "ctaSub": "Replies in about an hour.",
  "guaranteeHeading": "We start with a Tax Assessment that reviews your full situation and shows you your estimated outcome, so you know exactly where you stand before deciding whether to go ahead and lodge.",
  "guaranteeBody": "Pulling four agencies and a forgotten single shift into one return is ordinary work here, and every client is on a 417 or a 462. Reviewed and signed off by a registered tax agent before it is lodged with the ATO.",
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
    "name": "Labour hire",
    "item": "/expenses/labouring"
  }
]

const HERO = {
  "kicker": "Warehouses, removals, landscaping, events",
  "h1lead": "Two agencies is two income statements.",
  "h1accent": "Two sites is a deduction.",
  "lede": "A forgotten agency costs more than any missing receipt, and one return has to carry every one of them."
}

const SECTIONS: Section[] = [
  {
    "kind": "answer",
    "h2": "What can a labourer placed by an agency claim on tax?",
    "paras": [
      "A labour hire worker can claim protective gear required by the host role, renewals of an operating ticket they already hold, tools bought out of their own pocket, travel between two worksites in the same day, and the work related share of a phone. What is claimable follows the job you were doing that day, not the title on the agency contract.",
      "A week in a chilled warehouse, a week on a landscaping crew and a weekend on an event bump out create three different sets of costs."
    ]
  },
  {
    "kind": "items",
    "h2": "The claims that belong to this work specifically",
    "intro": "Each of these follows the host role. Ask what the site required, not what the agency called you.",
    "items": [
      {
        "t": "Travel between two sites in the same day",
        "d": "One warehouse in the morning and a different site in the afternoon is travel between workplaces, and deductible. The first trip from home is still a commute."
      },
      {
        "t": "Protective gear the host site required",
        "d": "Steel capped boots, gloves, hi vis, safety glasses, hearing protection, a cut resistant sleeve. Deductible where the item protects you from an identifiable risk on that job and you paid for it yourself."
      },
      {
        "t": "Renewing a forklift, EWP or other operating ticket",
        "d": "Renewing a ticket you already hold and use for the work is deductible. The first one is not, on the same principle that keeps a first White Card private."
      },
      {
        "t": "Tools and equipment you bought yourself",
        "d": "Anything you bought and were not reimbursed for is deductible: $300 or less claimed in full in the year of purchase, more than that claimed across the effective life of the item."
      },
      {
        "t": "Cold storage and weather specific protective clothing",
        "d": "A freezer jacket for chilled or frozen warehouse work, wet weather gear for outdoor landscaping. These are protective rather than conventional clothing because they exist to protect you from a condition the work puts you in."
      },
      {
        "t": "The work share of your phone",
        "d": "Agencies run on messages: shift offers at six in the morning, site addresses, timesheets. The work related percentage of your plan is deductible where you use your own phone for it."
      }
    ]
  },
  {
    "kind": "answer",
    "h2": "What do you need to keep across placements?",
    "paras": [
      "One claim, three tests: you paid, nobody reimbursed you, and it was spent earning the income you are declaring. Across placements that is receipts for the boots and gloves you bought, the ticket renewal, and a note of dates, sites and distances behind the travel.",
      "The record can be a receipt, an invoice, a bank statement or a phone photo showing the amount, the date, the supplier and the item, kept five years. Work claims of $300 or less for the whole year need no written evidence. That is a different $300 from the one deciding whether a piece of gear is written off at once or over its life."
    ]
  },
  {
    "kind": "traps",
    "h2": "What do labour hire workers get wrong?",
    "intro": "The wrong claims are mostly clothing and commuting. The missed ones are almost all about the number of employers, which is where labour hire loses people money.",
    "wrong": [
      {
        "t": "Work pants and boots with no protective feature",
        "d": "Plain work trousers, a t-shirt, ordinary boots that are simply sturdy. Conventional clothing is private however heavy the work and however fast it wears out."
      },
      {
        "t": "The commute to a single regular site",
        "d": "If an agency places you at the same warehouse for two months, the drive there is ordinary commuting, not itinerant travel. What makes travel deductible is moving between workplaces, not that an agency sent you."
      },
      {
        "t": "Gear the agency issued",
        "d": "Most agencies supply hi vis and sometimes boots. If it was issued to you or reimbursed, there is no cost left to claim."
      },
      {
        "t": "A first ticket, treated as a work cost",
        "d": "The forklift licence you paid for so an agency would put you forward is a cost of becoming eligible, not a cost of the work. Renewals once you are placed are deductible."
      },
      {
        "t": "Assuming the agency has dealt with your tax",
        "d": "An agency withholds tax and reports your wages. It does not lodge your return, claim your deductions, or check whether the other two agencies got your details right."
      }
    ],
    "missed": [
      {
        "t": "An income statement from a forgotten agency",
        "d": "Three weeks with an agency in March, one shift in a different state in June, and the return goes in without them. Worse than a missed deduction, because it means an amendment later."
      },
      {
        "t": "Travel between two sites in one day",
        "d": "Common with agencies moving a crew, and almost never claimed because somebody else decided the movement. It is still deductible travel between workplaces."
      },
      {
        "t": "Boots and gloves bought yourself between placements",
        "d": "Gear bought so you could take the next job is paid for in a hurry and never receipted. Each item under $300 is a full deduction in the year you bought it."
      },
      {
        "t": "A ticket renewal paid in cash",
        "d": "Forklift and EWP renewals are cheap enough to forget by July, and deductible once you are already working with the ticket."
      },
      {
        "t": "Weeks withheld at the wrong rate",
        "d": "A new agency that has not processed your Tax File Number Declaration, or is not registered with the ATO as an employer of working holiday makers, withholds well above 15 per cent. It comes back on the return that brings every agency together."
      }
    ]
  },
  {
    "kind": "answer",
    "h2": "Which parts turn on how your year ran?",
    "paras": [
      "How itinerant the work was decides how much travel is deductible, and it is a question of fact rather than a rule. How often the site changed, whether one base kept pulling you back and whether the agency required the movement all feed in. Two people at the same agency can end up with very different travel claims.",
      "Every agency is a separate employer with its own Tax File Number Declaration, withholding relationship and income statement. Working holiday makers do not get a tax free threshold from any of them, so the risk is a rate applied wrongly, or an employer missing from the return.",
      "Residency sits under all of it. British, German and Japanese passport holders who were residents of Australia for tax purposes can carry the full tax free threshold under the Addy decision, worth more than every deduction on this page. It depends on your own circumstances and has to be reviewed properly."
    ]
  }
]

const FAQS = [
  {
    "question": "I am registered with three agencies. Does that change my tax?",
    "answer": "Each agency is legally a separate employer, with its own Tax File Number Declaration, withholding and income statement. All of them go into one return.\n\nYour wages are taxed at the working holiday maker rate rather than against a tax free threshold, so the real risk is one agency being left out."
  },
  {
    "question": "Can I claim travel between different job sites?",
    "answer": "Usually yes. Travel between two separate work locations, a warehouse in the morning and a different site in the afternoon, is deductible in a way your trip from home to one regular workplace is not.\n\nHow much qualifies depends on how itinerant the pattern is, so note the dates, the sites and the distances."
  },
  {
    "question": "How is labouring different from construction for tax?",
    "answer": "The tests are identical, the items are not. Building site work usually requires a White Card and standard site PPE. General labour hire covers warehouses, removals, landscaping, production lines and events, where the gear follows the host role and a White Card is often not needed.\n\nIf your placements are on building sites, the construction page goes further."
  },
  {
    "question": "Can I claim a forklift licence?",
    "answer": "You can claim renewing one you already hold and use for the work. Getting the ticket in the first place is not deductible, because the ATO treats qualifying for work as a private cost.\n\nAn EWP ticket, a White Card and a drivers licence all fall the same way."
  },
  {
    "question": "I only did a handful of shifts. Is it worth claiming anything?",
    "answer": "Usually yes, provided you paid for the things yourself and were not reimbursed. Even a few shifts can involve boots, gloves, a ticket renewal or travel between sites, and every dollar of deduction reduces the income the tax is calculated on.\n\nThe test does not change with the number of shifts."
  }
]

const GUIDES = [
  {
    "href": "/blog/labour-hire-agencies-working-holiday-australia",
    "label": "Labour hire agencies and how they work",
    "desc": "Who your employer actually is when an agency places you."
  },
  {
    "href": "/blog/white-card-australia-working-holiday",
    "label": "The White Card, and what it costs you",
    "desc": "How to get one, and why the first one is not a deduction."
  },
  {
    "href": "/blog/tools-equipment-under-300-instant-deduction-whv",
    "label": "The $300 instant deduction for tools and gear",
    "desc": "Why each item is tested on its own, and what a set does to the answer."
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
        path: '/expenses/labouring',
        articleHeadline: "Labour Hire and Warehouse Tax Deductions Australia",
        articleDescription: "Two agencies is two income statements. Two sites in one day is a deduction almost nobody claims.",
        inLanguage: "en-AU",
        WA, UI, crumbs: CRUMBS, hero: HERO, sections: SECTIONS, faqs: FAQS, guides: GUIDES, services: SERVICES,
      }}
    />
  )
}
