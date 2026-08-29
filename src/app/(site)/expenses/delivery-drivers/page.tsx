import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/constants'
import { waUrl } from '@/lib/wa'
import { JobExpensesPage, type Section } from '@/components/expenses/JobExpensesPage'

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
  "guaranteeHeading": "If your refund is less than our fee, we refund the difference, so you are never out of pocket for our service.",
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

/* Everything below the content is shared: the schema builders, the tokens and
   every section renderer live in JobExpensesPage, once, for all 21 job pages. */
export default function Page() {
  return (
    <JobExpensesPage
      content={{
        lang: 'en',
        path: '/expenses/delivery-drivers',
        articleHeadline: "Delivery Driver Tax Deductions Australia: Car, Phone, GST",
        articleDescription: "Your kilometres and the work share of your phone are the whole game. Fines and the private leg never were.",
        inLanguage: "en-AU",
        WA, UI, crumbs: CRUMBS, hero: HERO, sections: SECTIONS, faqs: FAQS, guides: GUIDES, services: SERVICES,
      }}
    />
  )
}
