import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/constants'
import { waUrl } from '@/lib/wa'
import { JobExpensesPage, type Section } from '@/components/expenses/JobExpensesPage'

export const metadata: Metadata = {
  "title": "Farm Work Tax Deductions in Australia",
  "description": "What farm hands and fruit pickers can claim on an Australian tax return: sun protection, picking gear, boots and travel between blocks.",
  "keywords": [
    "farm work tax deductions",
    "fruit picking tax deductions Australia",
    "fruit picker tax return",
    "backpacker farm work tax",
    "seasonal worker deductions ATO",
    "travel between farms tax deduction",
    "piece rate tax Australia",
    "417 second year farm work tax"
  ],
  "alternates": {
    "canonical": "/expenses/farm-work",
    "languages": {
      "en-AU": "/expenses/farm-work",
      "de": "/de/expenses/farm-work",
      "ja": "/ja/expenses/farm-work",
      "x-default": "/expenses/farm-work"
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
    "url": `${SITE_URL}/expenses/farm-work`,
    "siteName": "Working Holiday Tax",
    "title": "Farm Work Tax Deductions in Australia",
    "description": "Sun protection and travel between blocks are deductible. Your jeans and your hostel rent are not. What farm work actually claims."
  },
  "twitter": {
    "images": [
      `${SITE_URL}/og-image.png`
    ],
    "card": "summary_large_image",
    "title": "Farm Work Tax Deductions in Australia",
    "description": "Sun protection and travel between blocks are deductible. Your jeans and your hostel rent are not. What farm work actually claims."
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

const WA = waUrl({ topic: 'expenses', lang: "en", detail: "Farm work and fruit picking" })

const UI = {
  "ctaLabel": "Message us on WhatsApp",
  "ctaSub": "Replies in about an hour.",
  "guaranteeHeading": "If you get a refund and it comes to less than our fee, we refund the difference. If you owe tax instead, the fee covers our review and is not refundable.",
  "guaranteeBody": "A season of short farm jobs, several contractors and one return is a thing we untangle every week, for people on 417 and 462 visas and nobody else. Reviewed and signed off by a registered tax agent before it is lodged with the ATO.",
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
    "name": "Farm work",
    "item": "/expenses/farm-work"
  }
]

const HERO = {
  "kicker": "Farm work, orchards and packing sheds",
  "h1lead": "Sunscreen is a deduction.",
  "h1accent": "Your jeans never were.",
  "lede": "The claim list for picking, pruning and packing runs to about six items. Getting every short job of the season onto one return matters more."
}

const SECTIONS: Section[] = [
  {
    "kind": "answer",
    "h2": "What can a fruit picker or farm hand claim on tax?",
    "paras": [
      "A farm worker can claim sun protection used for outdoor work, protective gloves and boots, picking tools and equipment bought out of their own pocket, and the travel between two farms or blocks in the same working day. Everything on that list has to have been paid for by you, not reimbursed, and backed by a record.",
      "Sunscreen is a private expense for almost everyone in Australia. It is deductible for you because the job puts you under direct sun for hours, which the ATO treats as a work related exposure."
    ]
  },
  {
    "kind": "items",
    "h2": "The claims that belong to this work specifically",
    "intro": "Each has a condition attached, and the condition is what makes the claim survive.",
    "items": [
      {
        "t": "Sun protection: sunscreen, a wide brim hat, sunglasses",
        "d": "Deductible where the work exposes you to the sun, which covers picking, pruning, thinning, and packing in an open sided shed. Claim only the share you used for work."
      },
      {
        "t": "Protective gloves, gumboots and safety boots",
        "d": "Picking gloves, wet weather boots, steel caps for shed work. These qualify because they protect you from a specific hazard the job creates: thorns, sap, chemicals, dropped crates. Ordinary sturdy boots do not."
      },
      {
        "t": "Picking tools and equipment you bought yourself",
        "d": "Secateurs, snips, a picking bag or bucket harness, a head torch, knee pads. Each item costing $300 or less is claimed in full in the year you bought it. Above $300 you still claim it, across the effective life of the item."
      },
      {
        "t": "Travel between farms or blocks on the same day",
        "d": "Moving from one property, block or shed to another once your working day has started is deductible travel, worked out with the cents per kilometre method or a logbook. The first trip of the day is not part of it."
      },
      {
        "t": "Protective clothing with a genuine function",
        "d": "Wet weather gear for rain, chemical resistant overalls for spraying, a dust mask in a packing shed. The test is whether the item protects you from something the work does to you. A flannel that keeps you warm does not."
      },
      {
        "t": "The work share of your phone",
        "d": "Small, but real if you use your own phone for the job, taking shift times from a contractor. You claim the work related percentage on a fair basis, not the whole bill."
      }
    ]
  },
  {
    "kind": "answer",
    "h2": "What do you have to keep from a season?",
    "paras": [
      "Nothing is deductible unless three things hold: the money was yours, nobody gave it back, and it was spent earning the income on the return. In a season that is the roadhouse receipt for the sunscreen, the docket for the gloves, and a note of dates and kilometres whenever a contractor moved you between blocks.",
      "A receipt, an invoice, a bank statement or a phone photo carrying the amount, the date, the supplier and the item, kept five years. If your work claims for the whole year add up to $300 or less, no written evidence is needed. That is a different $300 from the one deciding whether a single item is written off at once or over its life."
    ]
  },
  {
    "kind": "traps",
    "h2": "What do farm workers get wrong?",
    "intro": "First, claims seasonal workers make every year and cannot support. Then the money nobody told them was there.",
    "wrong": [
      {
        "t": "Ordinary clothes destroyed by the job",
        "d": "Jeans, t-shirts, a flannel, a jumper for a five in the morning start. The ATO tests the item, not the intention, and normal clothing is private however fast the fruit stains kill it."
      },
      {
        "t": "Hostel rent and the working hostel bond",
        "d": "Where you slept during the season is a living expense, not a work expense, even when the hostel is the only accommodation for fifty kilometres and the farm arranged it."
      },
      {
        "t": "Food and drink during the day",
        "d": "Lunch on a farm is the same as lunch anywhere else. Meals only become deductible where travel your employer requires keeps you away from home overnight, which picking season does not usually meet."
      },
      {
        "t": "The drive from the hostel to the farm",
        "d": "That is a commute, whether you drive fifty kilometres of dirt road or walk. Only movement between work sites once the day has started is claimable."
      },
      {
        "t": "Getting yourself to the region in the first place",
        "d": "The flight or drive to Bundaberg, Mildura or Tully to look for work puts you where the job is, which is not a cost of earning income from it."
      }
    ],
    "missed": [
      {
        "t": "The sunscreen, the hat and the sunglasses",
        "d": "The most commonly missed claim in farm work. Almost nobody keeps a receipt for a $19 bottle of sunscreen bought at a roadhouse, and across a season it is not a small number."
      },
      {
        "t": "Every pair of gloves, one at a time",
        "d": "Picking gloves are consumable. Buying six pairs across a season is six deductible purchases, not one, and each is tested against $300 on its own."
      },
      {
        "t": "Travel between blocks in the same day",
        "d": "Common on larger properties and with contractors who move a crew around, and almost never claimed because it does not feel like a trip. Note the date and the kilometres as you go."
      },
      {
        "t": "A three week farm job that was forgotten entirely",
        "d": "A short stint, paid in a hurry by a labour hire contractor, is easy to leave off a return, and leaving income off is worse than missing a deduction."
      },
      {
        "t": "Tax withheld above 15 per cent by an unregistered employer",
        "d": "An employer registered with the ATO as an employer of working holiday makers withholds 15 per cent from your first dollar. One that is not registered has to withhold at the foreign resident rate, which starts above 30 per cent. The difference comes back when the return is lodged, and only then."
      }
    ]
  },
  {
    "kind": "answer",
    "h2": "What turns on how your season was structured?",
    "paras": [
      "Itinerant work or commuting is a question of fact. Sent between three properties by a contractor with no single base is a different position from driving to the same orchard for eleven weeks. How often the site changed, whether the job required the travel, and whether you had a fixed workplace decide it.",
      "Residency is bigger. It is a judgement, not a formula, and the Addy case in the High Court shows how much can hang on it. We take a position on it only after going through your year.",
      "Farm work also feeds a further visa, and that part is immigration rather than tax. Which industries, postcodes and dates count is set by the Department of Home Affairs and has changed more than once, so check the current official guidance or a registered migration agent before you rely on a job counting."
    ]
  }
]

const FAQS = [
  {
    "question": "Can I really claim sunscreen and a hat?",
    "answer": "Yes, where the work puts you in the sun, and farm work usually does. The ATO accepts sun protection as a work expense for outdoor workers because the exposure comes from the job.\n\nKeep the receipts and claim only the portion you used for work."
  },
  {
    "question": "I worked on three farms this year. Is that three tax returns?",
    "answer": "No. One return covers the whole financial year from 1 July to 30 June, no matter how many farms, contractors or labour hire companies paid you. Every employer reports your wages and the tax withheld to the ATO, and it all lands in one return.\n\nThe risk with a season of short jobs is a forgotten one."
  },
  {
    "question": "Does being paid per bin change my tax?",
    "answer": "No. Piece rate pay is wages, whether worked out per bin, per bucket, per tray or per kilo. Your employer reports the total and withholds tax the same way as an hourly rate.\n\nWhat it does change is your record keeping, because pay that swings day to day is harder to check against an income statement later."
  },
  {
    "question": "Can I claim the fuel driving to the farm every morning?",
    "answer": "No. The first trip of the day, from wherever you are living to the first farm, is ordinary commuting and is not deductible, however far it is.\n\nTravel between farms, blocks or sheds once your working day has started is deductible, worked out with the cents per kilometre method or a logbook."
  },
  {
    "question": "What if the farm never gave me payslips?",
    "answer": "Usually not a problem. Most employers report your pay to the ATO through Single Touch Payroll, so it appears as an income statement whether or not you received a payslip.\n\nIt still helps to note which farm, which dates and roughly what you were paid."
  }
]

const GUIDES = [
  {
    "href": "/blog/piece-rates-farm-work-working-holiday",
    "label": "Piece rates on farm work, and the floor underneath them",
    "desc": "How per bin pay works and what it still has to add up to."
  },
  {
    "href": "/blog/fruit-picking-jobs-working-holiday-australia",
    "label": "Fruit picking work in Australia",
    "desc": "Regions, seasons and what to check before you take the job."
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
        path: '/expenses/farm-work',
        articleHeadline: "Farm Work Tax Deductions in Australia",
        articleDescription: "Sun protection and travel between blocks are deductible. Your jeans and your hostel rent are not. What farm work actually claims.",
        inLanguage: "en-AU",
        WA, UI, crumbs: CRUMBS, hero: HERO, sections: SECTIONS, faqs: FAQS, guides: GUIDES, services: SERVICES,
      }}
    />
  )
}
