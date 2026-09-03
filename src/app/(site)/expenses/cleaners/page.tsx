import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/constants'
import { waUrl } from '@/lib/wa'
import { JobExpensesPage, type Section } from '@/components/expenses/JobExpensesPage'

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
  "guaranteeHeading": "If you get a refund and it comes to less than our fee, we refund the difference. If you owe tax instead, the fee covers our review and is not refundable.",
  "guaranteeBody": "Cleaning returns land on our desk every week, and every one of them belongs to somebody on a 417 or 462 visa. Reviewed and signed off by a registered tax agent before it is lodged with the ATO.",
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
    "name": "Cleaning",
    "item": "/expenses/cleaners"
  }
]

const HERO = {
  "kicker": "Houses, offices, end of lease and app work",
  "h1lead": "The drive between houses is the claim.",
  "h1accent": "Almost nobody makes it.",
  "lede": "Chemicals, gloves and uniform laundry at the ATO rate are all on the list too."
}

const SECTIONS: Section[] = [
  {
    "kind": "answer",
    "h2": "What can a cleaner claim on tax?",
    "paras": [
      "A cleaner can claim equipment and cleaning products bought out of their own pocket, protective gear such as gloves, an apron or steel caps, the laundering of a compulsory uniform or protective clothing, and travel between one cleaning job and the next in the same day. Anything a client or employer supplies or reimburses is excluded.",
      "Three houses in a day means two deductible legs of travel, and over a year that is normally the largest figure on the return."
    ]
  },
  {
    "kind": "items",
    "h2": "The claims that belong to this work specifically",
    "intro": "Most cleaning gear sits under $300, so it is claimed in full in the year you buy it rather than written off slowly.",
    "items": [
      {
        "t": "Travel between cleaning jobs",
        "d": "The drive from one house or office to the next once your day has started is travel between workplaces, not a commute, and it is deductible. Use the cents per kilometre method or a logbook."
      },
      {
        "t": "Equipment and cleaning products",
        "d": "Mops, buckets, scrapers, cloths, chemicals and consumables you buy yourself. Each item of $300 or less is claimed in full in the year of purchase. A starter kit bought together for $300 or more is one asset, written off across its life, even where each piece alone would have been under the threshold."
      },
      {
        "t": "Larger equipment of $300 or more",
        "d": "A commercial vacuum, a floor buffer, a pressure washer. Still deductible, spread across the effective life of the item."
      },
      {
        "t": "Protective gear",
        "d": "Gloves, an apron, safety glasses or a face shield for jobs with strong chemicals or dust, steel caps for site and commercial work. They qualify because they protect you from a hazard of the job."
      },
      {
        "t": "Laundering deductible work clothing",
        "d": "Washing a compulsory uniform or genuine protective clothing is claimable at the ATO rate: $1 a load of work items only, or 50 cents a load washed in with everything else. Past $150 of laundry claims for the year, keep a diary rather than an estimate."
      },
      {
        "t": "The work share of your phone",
        "d": "Real for anyone taking bookings, running an app or messaging clients about keys and access. Claim the work related percentage on a fair basis, not the whole plan."
      }
    ]
  },
  {
    "kind": "answer",
    "h2": "What does a cleaner have to keep?",
    "paras": [
      "Three tests behind every claim: you paid for it, nobody paid you back, and it went to earning the income you are declaring. For a cleaner that means the receipts for chemicals and gear, and a record of the dates, addresses and kilometres behind the driving.",
      "A receipt, an invoice, a bank statement or a phone photo showing the amount, the date, the supplier and the item, kept five years. Under $300 of work claims for the whole year, no written evidence is needed. That is a different $300 from the one deciding how a single vacuum is written off."
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
    "note": "Three or four addresses a day clears 5,000 kilometres faster than most cleaners expect, and past that the logbook usually wins, because it picks up fuel, insurance, registration, servicing, depreciation and loan interest."
  },
  {
    "kind": "traps",
    "h2": "What do cleaners get wrong?",
    "intro": "The wrong claims cluster around clothing and the first trip of the day. The missed ones are almost all travel.",
    "wrong": [
      {
        "t": "Plain black trousers and a plain polo",
        "d": "Even where a client or agency insists on a colour, conventional clothing is private. Bleach ruining it does not make it deductible."
      },
      {
        "t": "The first and last trip of the day",
        "d": "Home to the first job, and the last job home, are ordinary commuting. Only the legs in between are claimable, unless you meet the bulky equipment exception."
      },
      {
        "t": "Products and equipment the client supplies",
        "d": "If the house keeps the chemicals under the sink, or the company issues the gear, there is no cost with you to deduct. The same applies to anything you were reimbursed for."
      },
      {
        "t": "Treating an ABN as a licence to claim everything",
        "d": "Having an ABN does not turn private spending into a business expense. Your phone, your car and your clothes are still apportioned."
      },
      {
        "t": "Assuming cash jobs do not need declaring",
        "d": "Cleaning income is income whether it arrives by bank transfer, an app payout or an envelope."
      }
    ],
    "missed": [
      {
        "t": "The travel between jobs",
        "d": "Cleaners work three or four addresses a day and claim none of the driving, because it does not feel like a work trip. Note the date, the addresses and the kilometres as you go."
      },
      {
        "t": "Every bottle and cloth, one purchase at a time",
        "d": "Consumables are bought constantly and receipted almost never. A running photo of the receipt in a phone album is enough."
      },
      {
        "t": "Laundry, at a published rate",
        "d": "Washing protective clothing and a compulsory uniform is deductible at $1 or 50 cents a load, and almost nobody knows the rate exists."
      },
      {
        "t": "Gear bought while setting yourself up",
        "d": "Equipment and chemicals bought around the time you registered an ABN and began looking for clients are generally claimable, even though the first invoice came later. A long gap between purchase and first job weakens that, so keep the dates."
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
      "Sole trader or employee is the first fork. Private houses, end of lease jobs and app bookings through something like Airtasker are ABN income: you set the price, you invoice, nothing is withheld, no super is paid.",
      "Rostered onto sites and shifts by a cleaning company is employment under a TFN, tax withheld and super on top.",
      "A company that set your roster, supervised your work and supplied the products, then asked you to get an ABN, may be an employer wearing a contractor label.",
      "For a sole trader GST only becomes compulsory once cleaning turnover passes $75,000 in a year, which part time cleaning rarely approaches.",
      "Residency sits under all of it and is worth more than the whole deduction list: British, German and Japanese passport holders who were Australian residents for tax purposes can carry the full tax free threshold under the Addy decision."
    ]
  }
]

const FAQS = [
  {
    "question": "Can I claim the drive between cleaning jobs?",
    "answer": "Yes. Travelling from one cleaning job to the next in the same day is travel between workplaces, not commuting, and it is deductible on the cents per kilometre method or a logbook.\n\nThe first trip from home and the last trip home are not, unless you carry bulky equipment that cannot be stored securely at the sites."
  },
  {
    "question": "What cleaning equipment and products can I claim?",
    "answer": "Anything you bought yourself and were not reimbursed for: mops, buckets, scrapers, cloths, chemicals and consumables.\n\nItems of $300 or less each are claimed in full in the year you buy them. A commercial vacuum or floor buffer over $300 is deductible across its effective life."
  },
  {
    "question": "Can I claim my uniform and the cost of washing it?",
    "answer": "You can claim a required uniform your employer or client does not supply, and protective gear with a genuine safety function such as gloves, an apron or steel caps. Plain black trousers and a plain polo are not.\n\nWashing deductible work clothing is claimable at $1 a load for work only loads, or 50 cents a load mixed with everyday clothing, with a diary once claims pass $150 for the year."
  },
  {
    "question": "Do I need to register for GST as a cleaner with an ABN?",
    "answer": "Only once your turnover from cleaning work passes $75,000 in a year. That is the general sole trader threshold, not a cleaning rule, and part time cleaning rarely comes near it. Below it you invoice without a GST line."
  },
  {
    "question": "Am I a sole trader or an employee?",
    "answer": "Look at who controls the work, not what the paperwork calls you. If you set your price, choose which jobs to take and could send somebody else, that is sole trader work under an ABN.\n\nIf another business sets your roster, supervises you and supplies the products, that is employment however the contract is labelled, with tax and super due.\n\nPlenty of cleaners are both in one year."
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

/* Everything below the content is shared: the schema builders, the tokens and
   every section renderer live in JobExpensesPage, once, for all 21 job pages. */
export default function Page() {
  return (
    <JobExpensesPage
      content={{
        lang: 'en',
        path: '/expenses/cleaners',
        articleHeadline: "Cleaner Tax Deductions Australia: Gear, Laundry, Travel",
        articleDescription: "The drive between houses is usually the biggest claim on a cleaner return, and the one almost nobody makes.",
        inLanguage: "en-AU",
        WA, UI, crumbs: CRUMBS, hero: HERO, sections: SECTIONS, faqs: FAQS, guides: GUIDES, services: SERVICES,
      }}
    />
  )
}
