import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/constants'
import { waUrl } from '@/lib/wa'
import { JobExpensesPage, type Section } from '@/components/expenses/JobExpensesPage'

export const metadata: Metadata = {
  "title": { absolute: "FIFO Tax Deductions Australia: PPE, Tickets, Zone Offset" },
  "description": "What FIFO and camp workers can claim on an Australian tax return: PPE and tools, ticket renewals, medicals and the work share of a phone.",
  "keywords": [
    "FIFO tax deductions",
    "fly in fly out tax Australia",
    "zone tax offset FIFO",
    "FIFO camp accommodation tax",
    "high risk work licence tax deduction",
    "FIFO PPE tax deduction",
    "backpacker FIFO job tax",
    "remote site worker tax deductions"
  ],
  "alternates": {
    "canonical": "/expenses/fifo",
    "languages": {
      "en-AU": "/expenses/fifo",
      "de": "/de/expenses/fifo",
      "ja": "/ja/expenses/fifo",
      "x-default": "/expenses/fifo"
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
    "url": `${SITE_URL}/expenses/fifo`,
    "siteName": "Working Holiday Tax",
    "title": "FIFO Tax Deductions Australia: PPE, Tickets, Zone Offset",
    "description": "Camp food and the drive to the airport are not deductible. The Zone Tax Offset is probably not yours either. Here is what is."
  },
  "twitter": {
    "images": [
      `${SITE_URL}/og-image.png`
    ],
    "card": "summary_large_image",
    "title": "FIFO Tax Deductions Australia: PPE, Tickets, Zone Offset",
    "description": "Camp food and the drive to the airport are not deductible. The Zone Tax Offset is probably not yours either. Here is what is."
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

const WA = waUrl({ topic: 'expenses', lang: "en", detail: "FIFO and camp work" })

const UI = {
  "ctaLabel": "Message us on WhatsApp",
  "ctaSub": "Replies in about an hour.",
  "guaranteeHeading": "We start with a Tax Assessment that reviews your full situation and shows you your estimated outcome, so you know exactly where you stand before deciding whether to go ahead and lodge.",
  "guaranteeBody": "417 and 462 visas are the only tax work we take, so the zone offset, the residency position and the super sitting in three funds all get looked at together. Reviewed and signed off by a registered tax agent before it is lodged with the ATO.",
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
    "name": "FIFO",
    "item": "/expenses/fifo"
  }
]

const HERO = {
  "kicker": "Rosters, camps and remote sites",
  "h1lead": "The Zone Tax Offset is probably not yours.",
  "h1accent": "Here is what is.",
  "lede": "The camp room, the mess and the flight are the company's costs, not yours. What is left to you is PPE, ticket renewals, medicals and a phone."
}

const SECTIONS: Section[] = [
  {
    "kind": "answer",
    "h2": "What can a FIFO worker claim on tax?",
    "paras": [
      "A FIFO worker can claim PPE and protective clothing bought out of their own pocket and the laundering of it, tools and equipment, renewals of a ticket or licence they already hold, employer required medicals and drug and alcohol testing they paid for themselves, the work related share of a phone and internet, and training that relates to the job they already do.",
      "What is not on that list is everything that makes FIFO feel expensive. Your room in camp and your meals in the mess are booked and paid for by the company, and usually the flight to site too. A deduction only gives back money that left your own pocket."
    ]
  },
  {
    "kind": "items",
    "h2": "The claims that belong to this work specifically",
    "intro": "Everything here has the same condition: you paid for it, and stores did not issue it.",
    "items": [
      {
        "t": "PPE you bought yourself, and washing it",
        "d": "Overalls, steel capped boots, gloves, safety goggles, hearing protection, masks. Deductible because they protect you from a specific risk on site. Laundering them is claimable at the ATO rate, $1 a load for work only loads or 50 cents mixed with everything else."
      },
      {
        "t": "Tools and equipment",
        "d": "Anything you bought for the job that stores did not issue. Each item of $300 or less is claimed in full in the year of purchase, anything above that across the effective life of the item. A tool kit bought as a set for $300 or more is one asset."
      },
      {
        "t": "Renewing a ticket or licence you hold",
        "d": "A High Risk Work Licence, a Working at Heights ticket, a forklift ticket. Renewals are deductible once you are working in the role. The first one is not, on the same basis as a first White Card."
      },
      {
        "t": "Employer required medicals and testing",
        "d": "Many sites require a pre start medical and drug and alcohol testing as a condition of working. Where your employer requires it for a role you already hold and you paid yourself, it is deductible."
      },
      {
        "t": "The work share of your phone and internet",
        "d": "Checking a roster, submitting timesheets, completing mandatory online inductions. Claim the work related percentage on a fair basis, not the whole bill."
      },
      {
        "t": "Training that relates to the work you already do",
        "d": "A short course that keeps a current skill or ticket alive is deductible, and so is travel and accommodation where your employer requires you to attend away from your base. A first entry level certificate taken to become eligible for a role is not."
      }
    ]
  },
  {
    "kind": "note",
    "label": "The biggest FIFO tax myth",
    "title": "Working in a zone is not the same as living in one.",
    "body": "Since a change in the law in 2015, the Zone Tax Offset depends on where your normal residence is, not on where your roster takes you. That residence has to be inside a specified remote zone for more than 183 days of the income year.\n\nFlying in to work inside a zone while you live in Perth, Brisbane or Darwin between swings does not meet it. Camp is not your normal residence, because it is temporary and tied to the roster.\n\nFor most working holiday makers on a FIFO roster the offset does not apply."
  },
  {
    "kind": "answer",
    "h2": "What has to sit behind a FIFO claim?",
    "paras": [
      "A claim survives three questions. Did you pay for it? Were you paid back? Was it spent earning the income you are declaring? On a roster that is the receipt for the boots stores did not issue, the invoice for the medical, and the bill behind your phone percentage.",
      "Proof means the amount, the date, the supplier and the item, on a receipt, an invoice, a bank statement or a photo, kept five years. At $300 or less of work claims for the year, no written evidence is required. That is a different $300 from the one deciding whether a tool is written off at once or across its life."
    ]
  },
  {
    "kind": "traps",
    "h2": "What do FIFO workers get wrong?",
    "intro": "This trade has more confidently repeated misinformation than any other on the site.",
    "wrong": [
      {
        "t": "The Zone Tax Offset",
        "d": "The most commonly claimed thing a FIFO worker is not entitled to. It turns on where you normally live, not where you fly to, and camp does not count."
      },
      {
        "t": "Camp accommodation and meals",
        "d": "Your employer books and pays for the room and the mess, and at genuinely remote sites that is usually an exempt fringe benefit to them rather than income to you. Either way you never paid."
      },
      {
        "t": "The drive to the airport before a swing",
        "d": "That is ordinary commuting, however early the flight and however far you live from the terminal. The narrow bulky tools exception rarely applies to a camp services role, where there is either nothing bulky or somewhere secure to leave it."
      },
      {
        "t": "Relocating to Perth or Brisbane for the work",
        "d": "Flights, freight and temporary accommodation for a move you made to take up FIFO work are private relocation costs. Moving yourself into a position to earn income is not earning it."
      },
      {
        "t": "A first High Risk Work Licence",
        "d": "The ticket you paid for so you could be hired is a private cost. Renewing it while you are already working with it is deductible."
      }
    ],
    "missed": [
      {
        "t": "PPE bought out of pocket, and the laundry on it",
        "d": "Plenty of workers buy their own boots or gloves rather than wait for stores, then claim neither the gear nor the washing at the published rate."
      },
      {
        "t": "Medicals and drug and alcohol testing you paid for",
        "d": "Deductible where the employer requires it for a role you already hold, and almost never claimed, because it feels like a hurdle rather than a cost."
      },
      {
        "t": "The work share of phone and internet on swing",
        "d": "Rosters, timesheets and mandatory inductions all run through a personal device."
      },
      {
        "t": "Ticket renewals across a long roster year",
        "d": "A High Risk Work Licence or Working at Heights renewal paid for between swings is easy to lose track of by the end of the year."
      },
      {
        "t": "Superannuation left behind in several funds",
        "d": "FIFO pays well, so the super balance is larger than in most backpacker work. It sits there when you leave and has to be claimed as a Departing Australia Superannuation Payment once your visa has ceased."
      }
    ]
  },
  {
    "kind": "answer",
    "h2": "What is left open on a FIFO file?",
    "paras": [
      "The Zone Tax Offset is usually wrong rather than impossible. If your home base during the working holiday sat inside a specified zone, a rental in a remote town rather than a capital city, the question is live.",
      "The bulky tools exception matters more to a tradesperson flying in with a personal kit than to a camp services role. What you carried and what the site offered for storage settle it.",
      "Residency is the largest question on a FIFO file, because the sums are larger. British, German and Japanese passport holders who were residents of Australia for tax purposes can carry the full tax free threshold under the Addy decision. It depends on your own circumstances and has to be reviewed properly."
    ]
  }
]

const FAQS = [
  {
    "question": "Do FIFO workers get the Zone Tax Offset?",
    "answer": "Usually not, and this is the biggest misconception in FIFO tax. Since a 2015 change in the law, qualifying depends on your normal residence being inside a specified remote zone for more than 183 days of the year, not on where you work.\n\nLiving in a capital city between swings does not meet that test, and camp is not your normal residence."
  },
  {
    "question": "Can I claim my camp accommodation or meals?",
    "answer": "No. Your room and meals on site are arranged and paid for by your employer, and at genuinely remote sites that is usually treated as an exempt fringe benefit to them.\n\nBecause you never paid for the room or the food, there is no expense of yours to deduct."
  },
  {
    "question": "Can I claim the drive to the airport before my swing?",
    "answer": "No, in almost every case. The trip from home to the airport you fly out of is ordinary private commuting, however early the flight.\n\nThe narrow exception, where you must carry genuinely bulky and essential tools with nowhere secure to store them at work, rarely applies to a camp services role."
  },
  {
    "question": "Can I claim my High Risk Work Licence?",
    "answer": "You can claim renewing one you already hold. You cannot claim getting it for the first time, because that cost made you eligible for the role rather than doing a job you already had.\n\nIt is the same first versus renewal distinction the ATO applies to a construction White Card."
  },
  {
    "question": "What can I claim on phone and internet while on roster?",
    "answer": "The work related portion. If you use your own phone or internet to check your roster, submit timesheets or complete mandatory online inductions, that share of the bill is deductible.\n\nYou need a fair estimate of the percentage: a full bill on a device you also use for everything else will not stand up."
  }
]

const GUIDES = [
  {
    "href": "/blog/tools-equipment-under-300-instant-deduction-whv",
    "label": "The $300 instant deduction for tools and gear",
    "desc": "Why each item is tested on its own, and what a set does to the answer."
  },
  {
    "href": "/blog/1000-dollar-instant-deduction-rule-2026",
    "label": "The $1,000 instant deduction from 1 July 2026",
    "desc": "A flat claim with no receipts, or your actual costs. You only get one."
  },
  {
    "href": "/superannuation",
    "label": "Claiming your super when you leave Australia",
    "desc": "How DASP works, and what is withheld from it."
  }
]

const SERVICES = [
  {
    "href": "/tax-return",
    "label": "Tax return"
  },
  {
    "href": "/superannuation",
    "label": "Superannuation"
  },
  {
    "href": "/blog/tax-residency-working-holiday-makers",
    "label": "Tax residency"
  }
]

/* Everything below the content is shared: the schema builders, the tokens and
   every section renderer live in JobExpensesPage, once, for all 21 job pages. */
export default function Page() {
  return (
    <JobExpensesPage
      content={{
        lang: 'en',
        path: '/expenses/fifo',
        articleHeadline: "FIFO Tax Deductions Australia: PPE, Tickets, Zone Offset",
        articleDescription: "Camp food and the drive to the airport are not deductible. The Zone Tax Offset is probably not yours either. Here is what is.",
        inLanguage: "en-AU",
        WA, UI, crumbs: CRUMBS, hero: HERO, sections: SECTIONS, faqs: FAQS, guides: GUIDES, services: SERVICES,
      }}
    />
  )
}
