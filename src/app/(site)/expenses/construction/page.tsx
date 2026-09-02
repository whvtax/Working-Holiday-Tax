import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/constants'
import { waUrl } from '@/lib/wa'
import { JobExpensesPage, type Section } from '@/components/expenses/JobExpensesPage'

export const metadata: Metadata = {
  "title": { absolute: "Construction Tax Deductions Australia: Tools, PPE, Ute" },
  "description": "What construction workers on a working holiday visa can claim: tools under and over $300, PPE and hi vis, White Card renewals and sun protection.",
  "keywords": [
    "construction worker tax deductions",
    "tradie tax deductions Australia",
    "White Card tax deductible",
    "tools tax deduction ATO",
    "PPE tax deduction construction",
    "backpacker construction tax return",
    "417 visa construction tax deductions",
    "ute tax deduction logbook"
  ],
  "alternates": {
    "canonical": "/expenses/construction",
    "languages": {
      "en-AU": "/expenses/construction",
      "de": "/de/expenses/construction",
      "ja": "/ja/expenses/construction",
      "x-default": "/expenses/construction"
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
    "url": `${SITE_URL}/expenses/construction`,
    "siteName": "Working Holiday Tax",
    "title": "Construction Tax Deductions Australia: Tools, PPE, Ute",
    "description": "Your tools, your PPE and your White Card renewal are deductible. Your first White Card and your ripped jeans are not."
  },
  "twitter": {
    "images": [
      `${SITE_URL}/og-image.png`
    ],
    "card": "summary_large_image",
    "title": "Construction Tax Deductions Australia: Tools, PPE, Ute",
    "description": "Your tools, your PPE and your White Card renewal are deductible. Your first White Card and your ripped jeans are not."
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

const WA = waUrl({ topic: 'expenses', lang: "en", detail: "Construction and site work" })

const UI = {
  "ctaLabel": "Message us on WhatsApp",
  "ctaSub": "Replies in about an hour.",
  "guaranteeHeading": "We start with a Tax Assessment that reviews your full situation and shows you your estimated outcome, so you know exactly where you stand before deciding whether to go ahead and lodge.",
  "guaranteeBody": "Site returns, ticket renewals and the ute argument are a weekly job here, and every client is on a 417 or a 462. Reviewed and signed off by a registered tax agent before it is lodged with the ATO.",
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
    "name": "Construction",
    "item": "/expenses/construction"
  }
]

const HERO = {
  "kicker": "Sites, labouring and trades",
  "h1lead": "Your tools are deductible.",
  "h1accent": "Your first White Card is not.",
  "lede": "Site work carries the longest deduction list of any backpacker job. The ute is usually not on it."
}

const SECTIONS: Section[] = [
  {
    "kind": "answer",
    "h2": "What can a construction worker claim on tax?",
    "paras": [
      "A construction worker can claim tools and equipment bought out of their own pocket, protective clothing and PPE, sun protection for outdoor site work, renewals of a White Card or operating ticket they already hold, the work related share of a phone plan, and self education related to the trade they already work in. Anything the employer supplied or reimbursed is off the list.",
      "The list is long because the job creates specific costs. Steel caps protect you from a dropped brick, sunscreen from six hours on an unshaded slab. That is the connection the deduction test looks for."
    ]
  },
  {
    "kind": "items",
    "h2": "The claims that belong to this work specifically",
    "intro": "The dollar thresholds below are about timing, not eligibility. Crossing $300 does not remove a deduction, it spreads it.",
    "items": [
      {
        "t": "Tools and equipment under $300 each",
        "d": "A drill, a grinder, a nail gun, a level, a tool belt. Each item costing $300 or less is deducted in full in the year you buy it. The test is per item, so a year of small purchases builds a real claim from receipts most people bin."
      },
      {
        "t": "Tools and equipment of $300 or more",
        "d": "Still deductible, spread across the effective life of the item rather than claimed at once. A concrete mixer or a compound saw sits here. The trap is buying several tools together as a set costing $300 or more, because the set is one asset even where each piece alone would have been under the threshold."
      },
      {
        "t": "PPE and protective clothing",
        "d": "Hi vis shirts and vests, steel capped boots, safety glasses, a helmet, earmuffs, work gloves, a dust mask. The ATO test is not whether the item is useful on site, but whether it protects you from a specific risk of injury."
      },
      {
        "t": "Sun protection for outdoor work",
        "d": "Sunscreen, a wide brim hat and sunglasses are deductible where the site work is outdoors. On a summer slab this is a recurring cost almost nobody keeps a receipt for."
      },
      {
        "t": "Renewing a White Card or an operating ticket",
        "d": "Renewing a card or ticket you already hold is deductible. Your first White Card is not, because that cost made you eligible for construction work at all. The same split applies to a first forklift ticket, EWP ticket or heavy vehicle permit."
      },
      {
        "t": "The work share of your phone and internet",
        "d": "If you use your own phone to call a supervisor, check plans, or take shift messages, the work related percentage of the plan is deductible. Claiming the whole bill on a phone you also live on will not stand up."
      },
      {
        "t": "Training that relates to the trade you already work in",
        "d": "A course that upgrades a skill or ticket you use now is deductible. A course aimed at a different occupation is not, even when it is construction related, because it builds a new qualification rather than maintaining the one earning your income."
      }
    ]
  },
  {
    "kind": "answer",
    "h2": "What has to sit behind a tool claim?",
    "paras": [
      "Every claim has to clear three tests. You paid for it, nobody reimbursed you, and it was spent earning the income you are declaring. On site that is the receipt for the drill, the boots and the ticket renewal.",
      "The record can be a receipt, an invoice, a bank statement or a phone photo carrying the amount, the date, the supplier and the item, kept five years. Where every work claim for the year totals $300 or less, no written evidence is required. That is a different $300 from the one deciding whether a saw is written off at once or across its life."
    ]
  },
  {
    "kind": "numbered",
    "h2": "When does the drive to site count?",
    "intro": "Home to a regular workplace is private travel, and a site is a workplace. One narrow exception exists, for bulky tools, and all three of these have to be true.",
    "steps": [
      "The tools are essential for the work you are doing that day.",
      "They are genuinely bulky: their size or weight is the reason a vehicle is needed, not convenience.",
      "There is nowhere secure to leave them at the site, so they have to travel home with you."
    ],
    "note": "If the site has a lockable shed, container or cage, or what you carry would fit in a normal bag, the trip stays an ordinary commute. If you do qualify, utes and panel vans with a carrying capacity of one tonne or more cannot use the cents per kilometre method, so a logbook is the only route for most who drive one."
  },
  {
    "kind": "traps",
    "h2": "What do construction workers get wrong?",
    "intro": "The wrong claims on a site return are usually clothing and the ute. The missed ones are receipts nobody kept for things that were plainly deductible.",
    "wrong": [
      {
        "t": "Ordinary clothes wrecked on site",
        "d": "Jeans, a t-shirt, a flannel, a hoodie. Normal wear and tear on conventional clothing is a private expense. The item has to protect you rather than merely survive the day."
      },
      {
        "t": "Your first White Card",
        "d": "The card you paid for before anyone would hire you is the cost of becoming eligible, which the ATO treats like a first drivers licence. Renewing it once you are working is deductible."
      },
      {
        "t": "The ute, as a matter of course",
        "d": "Owning a ute and driving it to site is not a deduction. All three bulky tool conditions above have to hold, and on most sites they do not, because there is somewhere to lock things up."
      },
      {
        "t": "Tools the employer supplied or paid for",
        "d": "If it came off the truck, out of the site container, or you were reimbursed for it, there is no cost left with you to claim."
      },
      {
        "t": "A course to get into a different trade",
        "d": "Study that would move you into a new occupation is not deductible, however clearly it is construction related."
      }
    ],
    "missed": [
      {
        "t": "The small tools, claimed one by one",
        "d": "People assume there is a threshold you have to reach before tools are worth claiming. There is not. Twelve purchases of $40 is $480 of deduction, and each is tested against $300 on its own."
      },
      {
        "t": "Anything over $300, written off entirely",
        "d": "People hear \"over $300\" and conclude the tool is not claimable. It is, across the effective life of the item. Dropping it loses the whole deduction rather than delaying part of it."
      },
      {
        "t": "Sunscreen and a hat on an outdoor site",
        "d": "Recognised for outdoor work and almost never claimed by tradesmen, who tend to think of sun protection as a farm thing. An unshaded slab in February is the same exposure."
      },
      {
        "t": "Laundering hi vis and protective gear",
        "d": "Washing deductible protective clothing is itself deductible at the ATO rate, $1 a load for work only loads or 50 cents mixed in with everything else. Past $150 for the year keep a simple diary."
      },
      {
        "t": "Ticket renewals paid for out of pocket",
        "d": "A White Card, a forklift ticket or an EWP renewal is easy to forget by July, especially when it was paid in cash on a Saturday course."
      }
    ]
  },
  {
    "kind": "answer",
    "h2": "Which parts come down to your own facts?",
    "paras": [
      "The bulky tools exception, first. What you carry, what the site offers for storage, and whether the tools were essential that day settle it. Two labourers on the same crew can land differently.",
      "Residency is worth more than every tool on the list. British, German and Japanese passport holders who were residents of Australia for tax purposes can carry the full tax free threshold under the Addy decision. It depends on your own circumstances and has to be reviewed properly."
    ]
  }
]

const FAQS = [
  {
    "question": "Can I claim my first White Card?",
    "answer": "No. The ATO treats a first White Card like a first drivers licence, as the cost of becoming eligible for the work rather than a cost of doing it.\n\nOnce you are working and the card needs renewing, the renewal is deductible. The same applies to a first forklift ticket or heavy vehicle permit."
  },
  {
    "question": "What tools can I claim as a construction worker?",
    "answer": "Any tool or equipment you bought yourself for site work, as long as your employer did not supply it or pay you back.\n\nItems of $300 or less each are claimed in full in the year you buy them, items above that across the effective life of the item. Several tools bought together as a set costing $300 or more make one asset."
  },
  {
    "question": "Can I claim my ute for driving to site?",
    "answer": "Only in a narrow case. Driving from home to a regular workplace is private travel, and a building site is a workplace.\n\nThe trip is deductible only where the tools you carry are essential that day, genuinely bulky, and cannot be stored securely on site. Utes and panel vans carrying a tonne or more are excluded from the cents per kilometre method, so a logbook is the only way to claim them."
  },
  {
    "question": "Are steel caps and hi vis deductible?",
    "answer": "Yes. Steel capped boots, hi vis, safety glasses, helmets, earmuffs and work gloves are deductible because they protect you from a specific risk of injury, which is the test the ATO applies.\n\nSun protection for outdoor site work is claimable on the same basis, and so is laundering the protective gear."
  },
  {
    "question": "My clothes get destroyed on site. Why can I not claim them?",
    "answer": "Because the ATO tests the item rather than what happened to it. Jeans, a t-shirt or a flannel are conventional clothing, and wear and tear on them is private however fast the job ruins them.\n\nTo be deductible the item needs a genuine protective function, or has to be a compulsory branded uniform."
  }
]

const GUIDES = [
  {
    "href": "/blog/white-card-australia-working-holiday",
    "label": "The White Card, and what it costs you",
    "desc": "How to get one, and why the first one is not a deduction."
  },
  {
    "href": "/blog/tools-equipment-under-300-instant-deduction-whv",
    "label": "The $300 instant deduction for tools and gear",
    "desc": "Why each item is tested on its own, and what a set does to the answer."
  },
  {
    "href": "/blog/construction-laborer-working-holiday-australia",
    "label": "Construction labouring on a working holiday",
    "desc": "What the work pays and what a site expects you to turn up with."
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
        path: '/expenses/construction',
        articleHeadline: "Construction Tax Deductions Australia: Tools, PPE, Ute",
        articleDescription: "Your tools, your PPE and your White Card renewal are deductible. Your first White Card and your ripped jeans are not.",
        inLanguage: "en-AU",
        WA, UI, crumbs: CRUMBS, hero: HERO, sections: SECTIONS, faqs: FAQS, guides: GUIDES, services: SERVICES,
      }}
    />
  )
}
