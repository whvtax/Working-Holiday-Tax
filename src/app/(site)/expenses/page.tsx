import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/constants'
import { waUrl } from '@/lib/wa'
import { JobExpensesPage, type Section } from '@/components/expenses/JobExpensesPage'

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
  "ctaSub": "Replies in about an hour.",
  "guaranteeHeading": "If your refund is less than our fee, we refund the difference, so you are never out of pocket for our service.",
  "guaranteeBody": "Working holiday tax is the only thing we do. Your return is reviewed and signed off by a registered tax agent before it is lodged with the ATO.",
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
  }
]

const HERO = {
  "kicker": "Working holiday visas 417 and 462",
  "h1lead": "Deductions are not one list.",
  "h1accent": "They are your list.",
  "lede": "Seven trades, each with its own claims, records, and things that get knocked back."
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
  "lede": "What belongs in that box, and what sits behind each claim, are settled before anything is typed.",
  "colLeft": "On myGov",
  "colRight": "With us",
  "close": "You will never log into myGov, link an ID, or work out which form is which. We deal with the ATO directly."
}

const MYGOV = [
  {
    "mygov": "The deduction box is blank. Nothing suggests what your trade can claim.",
    "us": "We start from the work you did, and go down the list that belongs to it."
  },
  {
    "mygov": "It accepts any figure you type, including one you could not evidence.",
    "us": "We tell you which claims need a receipt, which a bank statement will carry, and which will not hold."
  },
  {
    "mygov": "Nothing tells you that a fruit picker, a barista and a chippy do not claim the same things.",
    "us": "Seven lines of work, each with its own list and substantiation rule."
  },
  {
    "mygov": "Rent, food and getting yourself to work look claimable and are not.",
    "us": "We keep the claims that hold, so nothing has to be undone later."
  }
]

const SECTIONS: Section[] = [
  {
    "kind": "answer",
    "h2": "What can a working holiday maker claim on an Australian tax return?",
    "paras": [
      "You can claim what you spent to earn the income you are declaring, as long as you paid for it yourself and were not reimbursed. Nothing about a 417 or 462 visa restricts the list.",
      "What changes the list is the job. Sun protection is deductible for someone picking fruit in an open orchard and not for someone behind a bar."
    ]
  },
  {
    "kind": "occupations",
    "h2": "Which job did you actually do?",
    "intro": "Seven pages, each on what that trade claims and wrongly claims.",
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
        "line": "Equipment and chemicals, laundry rates, and the drive between houses."
      },
      {
        "href": "/expenses/labouring",
        "title": "Labour hire and warehouses",
        "line": "Several agencies, several income statements, and travel between sites in one day."
      },
      {
        "href": "/expenses/fifo",
        "title": "FIFO and camp work",
        "line": "Ticket renewals, PPE, and the Zone Tax Offset almost nobody on a roster qualifies for."
      }
    ]
  },
  {
    "kind": "numbered",
    "h2": "What has to be true before anything is deductible?",
    "intro": "Three tests, applied to every claim on every page here. Fail one and the claim fails, however work related it feels.",
    "steps": [
      "You paid for it yourself, and no employer or client reimbursed you.",
      "The expense was incurred in earning your income, not in getting yourself into a position to earn it, and is not private or domestic.",
      "You have a record that shows what you bought, when, from whom, and for how much."
    ],
    "note": "The second test does the damage. It is why your first White Card is not deductible but your renewal is."
  },
  {
    "kind": "answer",
    "h2": "What do you have to be able to show?",
    "paras": [
      "A receipt, an invoice or a bank statement showing the amount, the date, the supplier and what the item was. A photo on your phone counts, and you must be able to produce it for five years.",
      "If your total work related claims for the year come to $300 or less, you do not need written evidence for them. That concession is separate from the $300 rule for individual assets, which is about how a single item is written off."
    ]
  },
  {
    "kind": "note",
    "label": "Changing from 1 July 2026",
    "title": "A flat $1,000, or your actual costs. Not both.",
    "body": "From 1 July 2026 you can claim a flat $1,000 of work related expenses with no receipts, or your actual costs with full records. It is one or the other for the whole year: if your real expenses come to $1,400 and you take the flat amount, you have given up $400.\n\nThe choice first applies to the 2026-27 return, lodged from July 2027. The 2025-26 return most people are lodging now still runs on the old rules."
  },
  {
    "kind": "tables",
    "h2": "How are car expenses worked out?",
    "intro": "Two methods, one per car per year. Only work related driving counts either way, never the ordinary trip from home to one regular workplace.",
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
    "note": "Past about 5,000 work kilometres a year the logbook usually produces the bigger deduction, because it picks up fuel, insurance, registration, servicing, depreciation and loan interest."
  },
  {
    "kind": "traps",
    "h2": "What do people get wrong, whatever job they did?",
    "intro": "The first list turns a refund into an amended assessment. The second, the money nobody asks for, is more common and costs more.",
    "wrong": [
      {
        "t": "Plain clothing that a dress code requires",
        "d": "Black trousers, a plain polo, ordinary boots, jeans. Conventional clothing does not become a uniform because a manager insists on it."
      },
      {
        "t": "The first licence, ticket or certificate",
        "d": "A first White Card, a first RSA, a first forklift ticket. That cost made you eligible for the job, which is not a cost of doing it. Renewals, once you are working, are deductible."
      },
      {
        "t": "The drive from home to work",
        "d": "Ordinary commuting is private travel however far it is and however early the start. Travel between two workplaces in the same day is usually claimable."
      },
      {
        "t": "Anything you were paid back for",
        "d": "If an employer, agency or platform reimbursed you, or supplied the item, there is no cost sitting with you to deduct."
      },
      {
        "t": "Fines",
        "d": "Parking and speeding fines are never deductible, whatever you were doing when you got them."
      }
    ],
    "missed": [
      {
        "t": "Every item under $300, claimed in full",
        "d": "Boots, gloves, a hat, a head torch, a phone mount. Each item is tested on its own, so a year of small purchases adds up. Most people throw the receipts away."
      },
      {
        "t": "Items over $300, which are still deductible",
        "d": "Crossing $300 does not remove the deduction, it changes the timing. The cost is claimed across the effective life of the item instead of all at once. People hear \"over $300\" and stop."
      },
      {
        "t": "Laundering compulsory or protective work clothing",
        "d": "The ATO allows $1 per load of work items only, or 50 cents per load washed in with everything else. Past $150 of laundry claims for the year you need a diary rather than an estimate."
      },
      {
        "t": "Travel between two jobs on the same day",
        "d": "Two farms, two houses, two warehouses, two venues. That leg is work travel, not commuting, and for anyone working across sites it is often the largest deduction on the return."
      },
      {
        "t": "Weeks taxed at 45 per cent before the TFN landed",
        "d": "Not a deduction, but the same money. If an employer withheld at the top rate while your Tax File Number Declaration sat in a drawer, that comes back on the return. It does not come back on its own."
      }
    ]
  },
  {
    "kind": "answer",
    "h2": "Where does it depend on your own situation?",
    "paras": [
      "Whether your travel counts as itinerant work rather than commuting depends on how your week was structured: how often the site changed, whether there was one base, and whether your employer required the movement.",
      "Your residency for tax purposes is the other one, and it is worth more than every deduction on this page put together. It is a judgement, the same question the High Court ruled on in the Addy case. We take a position on it only after going through your year."
    ]
  }
]

const FAQS = [
  {
    "question": "Can I just claim deductions myself?",
    "answer": "You can, and lodging really is the easy part. The deductions box is blank and accepts any figure you type.\n\nWhich costs came from earning your income, and what sits behind each of them, is a judgement about the year you had, not a field to fill in."
  },
  {
    "question": "Do working holiday makers get fewer deductions than Australians?",
    "answer": "No. The deduction rules are the same for a 417 or 462 visa holder as for anyone else earning Australian income.\n\nThe difference is on the income side: working holiday maker income is taxed at 15 per cent up to $45,000 rather than getting a tax free threshold, unless your residency position changes that."
  },
  {
    "question": "I did four different jobs in one year. Do I claim four separate lists?",
    "answer": "You lodge one return for the financial year and it carries every deduction from every job. What matters is that each expense is tied to work you were doing at the time.\n\nBoots bought for a warehouse job in September and sunscreen bought for a farm job in January belong on the same return. Different employers do not split anything."
  },
  {
    "question": "What if I have lost the receipts?",
    "answer": "A bank or credit card statement showing the amount, the date and the supplier is usually accepted where a receipt is gone.\n\nUnder $300 of claims across the whole year, no written record is needed, only a sound basis for the figure. What you cannot do is invent a number and hope."
  },
  {
    "question": "Can I claim rent, food or travel while I was in Australia?",
    "answer": "No. Accommodation, groceries and the cost of getting around are private living expenses, even when you moved to a regional town for a job.\n\nThe narrow exception is travel your employer requires that keeps you away from home overnight, which runs on a different rule and different records."
  },
  {
    "question": "Is it worth claiming deductions if I only worked a few months?",
    "answer": "Usually yes. A short stint still involves real costs, and every dollar of deduction reduces the income the tax is calculated on.\n\nThe bigger prize in a short year is often not the deductions but the weeks taxed at 45 per cent before your Tax File Number reached the employer, and whether your residency position was reported correctly."
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
    "href": "/blog/tax-residency-working-holiday-makers",
    "label": "Tax residency"
  }
]

/* The hub renders through the same shared template as the seven job pages,
   plus the myGov comparison block, minus the "other jobs" link (this IS the
   page that link points at). */
export default function Page() {
  return (
    <JobExpensesPage
      content={{
        lang: 'en',
        path: '/expenses',
        articleHeadline: "Backpacker Tax Deductions, Job by Job",
        articleDescription: "A fruit picker and a delivery rider do not claim the same things. Find your line of work and see what actually applies.",
        inLanguage: "en-AU",
        WA, UI, crumbs: CRUMBS, hero: HERO, sections: SECTIONS, faqs: FAQS, guides: GUIDES, services: SERVICES,
        mygov: { ui: MYGOV_UI, rows: MYGOV },
        hubLink: false,
      }}
    />
  )
}
