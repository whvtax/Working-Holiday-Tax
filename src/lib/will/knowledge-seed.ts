// Curated starter knowledge pack for Will's brain, mined from real customer
// conversations. Content only (what customers ask + an approved professional
// answer); the team's own phrasing/tone was never copied. The approved
// messages, security and boundaries in the playbook always take precedence.
// Loaded via POST /api/will/knowledge { action: 'import_starter' }.
export interface SeedKnowledge {
  intent: string;
  question: string;
  examples: string[];
  answer: string;
  keywords: string[];
  tags: string[];
  lang: string;
}

export const KNOWLEDGE_SEED: SeedKnowledge[] = [
  {
    "intent": "estimate before paying",
    "question": "Can you tell me how much I'll get back before I pay? Can I get a free estimate first?",
    "examples": [
      "how much am I likely to get back before I pay?",
      "can I do the eligibility check before paying?",
      "I'd like to know how much I'm likely to get back before paying you any money",
      "can you give me a rough idea of my refund first?"
    ],
    "answer": "That’s a really fair question!\n\nTo give you an estimate, we first need to review your full situation with the ATO, which is the main part of our service.\n\nIf you get a refund and it comes to less than our fee, we refund you the difference. If you owe tax instead of getting a refund, the fee covers our review either way and isn’t refundable 😊",
    "keywords": [
      "estimate",
      "before",
      "pay",
      "free",
      "how",
      "much",
      "back",
      "upfront",
      "quote"
    ],
    "tags": [
      "objection",
      "pricing"
    ],
    "lang": "en"
  },
  {
    "intent": "is this legit",
    "question": "Is this real / legit? I'm a bit hesitant.",
    "examples": [
      "I am a little hesitant if this is real",
      "is this legit?",
      "found you on Instagram and wasn't sure if this is real"
    ],
    "answer": "Completely understand, it’s smart to check 😊\n\nWe operate under the supervision of a registered tax agent and have helped hundreds of backpackers from more than 45 countries.\n\nInstagram: https://www.instagram.com/workingholidaytax\nTikTok: https://www.tiktok.com/@workingholidaytax\nGoogle reviews: https://maps.app.goo.gl/FEjqSy53apD32YuF6\nClient agreement: https://workingholidaytax.com.au/client-agreement\n\nIf you get a refund and it comes to less than our fee, we refund you the difference. If you owe tax instead of getting a refund, the fee covers our review either way and isn’t refundable.",
    "keywords": [
      "legit",
      "real",
      "scam",
      "trust",
      "hesitant",
      "registered",
      "agent",
      "safe"
    ],
    "tags": [
      "objection",
      "legitimacy"
    ],
    "lang": "en"
  },
  {
    "intent": "registered agent details",
    "question": "Who is your registered tax agent? Can I have the name and TPB registration number?",
    "examples": [
      "Can you tell me the full name and TPB number of the registered tax agent lodging my return?",
      "What is your tax agent number?",
      "Are you registered with the Tax Practitioners Board?",
      "Who actually lodges the return, are they licensed?"
    ],
    "answer": "Yes, absolutely! We operate under the supervision of a registered tax agent. You can find all the details, including the agent and registration, in our client agreement here: https://workingholidaytax.com.au/client-agreement",
    "keywords": [
      "tpb",
      "registration",
      "registered",
      "agent",
      "number",
      "licence",
      "license",
      "practitioner",
      "name",
      "lodges",
      "who"
    ],
    "tags": [
      "objection",
      "legitimacy"
    ],
    "lang": "en"
  },
  {
    "intent": "pricing",
    "question": "How much do you charge? Is it a flat fee or a percentage?",
    "examples": [
      "I'm looking for pricing",
      "how much do you charge for each tax return?",
      "is it a flat fee or %?"
    ],
    "answer": "Our fee is fixed, never a percentage of your refund.\n\nTFN only: $220 per year\nTFN + ABN: $385 per year\n\nIf you get a refund and it comes to less than the fee, we refund you the difference. If you owe tax instead of getting a refund, the fee covers our review either way and isn’t refundable.",
    "keywords": [
      "price",
      "pricing",
      "cost",
      "fee",
      "charge",
      "flat",
      "percentage",
      "how",
      "much"
    ],
    "tags": [
      "pricing"
    ],
    "lang": "en"
  },
  {
    "intent": "fee if refund is small",
    "question": "Do I have to pay the fee even if my refund is small or I'm not sure it's worth it?",
    "examples": [
      "if my refund would be low, do I have to pay just to find out?",
      "what if my refund is not even that much, might not be worth it",
      "do I pay 220 automatically?"
    ],
    "answer": "If you get a refund and it comes to less than our fee, we refund you the difference. If you owe tax instead of getting a refund, the fee covers our review either way and isn’t refundable.",
    "keywords": [
      "fee",
      "small",
      "refund",
      "worth",
      "low",
      "pay",
      "automatically",
      "guarantee"
    ],
    "tags": [
      "objection",
      "pricing"
    ],
    "lang": "en"
  },
  {
    "intent": "cannot access myGov or ATO",
    "question": "I can't access myGov or link the ATO / I've left Australia / I don't have an Australian number or ID. Can you still help?",
    "examples": [
      "I can't link myGov to the ATO",
      "I'm back in my country and can't access my ATO account",
      "I can't get a digital ID",
      "do you offer a service that doesn't involve me accessing my ATO account?"
    ],
    "answer": "That’s exactly what we’re here for 😊\n\nYou don’t need myGov access and never share any login details. We handle everything directly with the ATO, and any refund goes straight into your Australian bank account.\n\nThe only exception is a Medicare Levy Exemption. If you need one, we’ll guide you through the application.",
    "keywords": [
      "mygov",
      "ato",
      "link",
      "access",
      "id",
      "digital",
      "passport",
      "overseas",
      "left",
      "account"
    ],
    "tags": [
      "process",
      "access"
    ],
    "lang": "en"
  },
  {
    "intent": "pay after refund",
    "question": "Can I pay after I receive my tax refund?",
    "examples": [
      "is it not possible to pay after I receive my tax return?",
      "can I do the payment after the tax return is in?"
    ],
    "answer": "Payment is made upfront because the review and personal guidance are the main part of the service, and that's where our work starts. Once payment is received, we can start going through your situation properly. And if you get a refund and it comes to less than our fee, we refund you the difference. If you owe tax instead of getting a refund, the fee covers our review either way and isn't refundable.",
    "keywords": [
      "pay",
      "after",
      "refund",
      "later",
      "afterwards",
      "receive"
    ],
    "tags": [
      "payment"
    ],
    "lang": "en"
  },
  {
    "intent": "why bank statement",
    "question": "Why do you need my bank statement? Which statement do you need?",
    "examples": [
      "was I meant to send the bank statement for the whole tax year?",
      "why do you need a bank statement?"
    ],
    "answer": "It’s an ATO requirement to make sure your tax refund goes directly into an account in your name.\n\nWe need a document showing your full name, BSB and account number.",
    "keywords": [
      "bank",
      "statement",
      "why",
      "need",
      "account",
      "verify"
    ],
    "tags": [
      "documents"
    ],
    "lang": "en"
  },
  {
    "intent": "why passport",
    "question": "Why do you need my passport? I'm not comfortable sharing it.",
    "examples": [
      "I'm not super comfortable submitting my passport, is there a reason you need it?"
    ],
    "answer": "Your passport is only used for the required identity check before we lodge your return.\n\nIt’s kept secure and deleted as soon as your identity has been verified.",
    "keywords": [
      "passport",
      "identity",
      "why",
      "need",
      "verify",
      "id",
      "secure",
      "comfortable"
    ],
    "tags": [
      "documents",
      "trust"
    ],
    "lang": "en"
  },
  {
    "intent": "medicare exemption",
    "question": "I didn't have Medicare / what is the Medicare Levy Exemption?",
    "examples": [
      "I never signed up for Medicare",
      "what's the Medicare Levy Exemption?",
      "do you need my Medicare number?"
    ],
    "answer": "Since you weren’t covered by Medicare, you can apply for a Medicare Levy Exemption.\n\nhttps://youtu.be/oj7ZSOHAxJk?si=KDMFlLoR0jYdpulB\n\nSend us a screenshot once submitted and we can lodge your return. Approval is decided by Services Australia, and if it isn’t approved, the levy may still apply.",
    "keywords": [
      "medicare",
      "levy",
      "exemption",
      "ihi",
      "mes",
      "cover",
      "health"
    ],
    "tags": [
      "process",
      "medicare"
    ],
    "lang": "en"
  },
  {
    "intent": "IHI or Medicare Entitlement Statement trouble (do not troubleshoot)",
    "question": "I'm getting an error applying for the IHI / Medicare Entitlement Statement / the exemption form won't submit.",
    "examples": [
      "I need to apply for an IHI before I can link this",
      "I get a Forbidden error applying for the IHI",
      "the exemption form keeps taking me back to the same page",
      "it won't let me submit the Medicare entitlement statement"
    ],
    "answer": "Your IHI and Medicare Entitlement Statement are handled directly by Services Australia, so unfortunately we can’t help with that part.\n\nPlease try again on a computer, as that usually works.",
    "keywords": [
      "ihi",
      "medicare",
      "citizen",
      "entitlement",
      "statement",
      "services",
      "australia",
      "forbidden",
      "error",
      "submit"
    ],
    "tags": [
      "medicare",
      "handoff",
      "mygov"
    ],
    "lang": "en"
  },
  {
    "intent": "tax residency question",
    "question": "Am I an Australian resident for tax purposes? Which option should I choose on the form?",
    "examples": [
      "I'm trying to work out if I'm an Australian resident for tax purposes",
      "which should I select, Australian resident or working holiday maker?",
      "I'm unsure if I'm an aus tax resident"
    ],
    "answer": "This is a very important question and can make a big difference to your tax refund. It depends on your individual circumstances, so we check it carefully rather than guess.\n\nThere’s a short explanation in the form to guide you, and we’ll confirm your tax residency after reviewing your full situation.",
    "keywords": [
      "resident",
      "residency",
      "tax",
      "purposes",
      "australian",
      "whm",
      "holiday",
      "maker",
      "which",
      "select"
    ],
    "tags": [
      "tax-question",
      "residency"
    ],
    "lang": "en"
  },
  {
    "intent": "refund lower than expected",
    "question": "Why is my refund so low? My friend got more / can you do it as an Australian resident?",
    "examples": [
      "can you send me a breakdown of why it's that much? I expected more",
      "my friend got 3000 back on the same visa",
      "have you done it as an Australian tax resident?"
    ],
    "answer": "Every situation is different, even on the same visa, as it depends on your income, tax withheld and residency.\n\nWe follow the ATO rules, make sure nothing you’re entitled to is missed, and explain the calculation clearly.",
    "keywords": [
      "low",
      "refund",
      "breakdown",
      "expected",
      "more",
      "friend",
      "resident",
      "calculation",
      "why"
    ],
    "tags": [
      "objection",
      "refund"
    ],
    "lang": "en"
  },
  {
    "intent": "work-related expenses",
    "question": "What can I claim as work-related expenses? I don't have all my receipts.",
    "examples": [
      "what would be claimable?",
      "can I claim laundry, work from home, phone?",
      "I don't have receipts for these"
    ],
    "answer": "Expenses directly related to earning your income may be claimable, such as tools, uniforms, protective clothing, work use of your phone and courses related to your current job.\n\nIf you don’t have a receipt, send us a bank statement with the payment highlighted in yellow. We’ll check what can be included.",
    "keywords": [
      "expenses",
      "claim",
      "deduction",
      "receipts",
      "laundry",
      "phone",
      "uniform",
      "tools",
      "work-related",
      "deductible"
    ],
    "tags": [
      "deductions"
    ],
    "lang": "en"
  },
  {
    "intent": "abn income",
    "question": "I have ABN income (e.g. Uber / food delivery). What do you need?",
    "examples": [
      "I worked uber with my ABN",
      "I have both TFN and ABN income",
      "I earned money on my ABN"
    ],
    "answer": "Since you also have ABN income, the fee for your TFN + ABN return is $385.\n\nPlease send us:\n• The type of work you did under your ABN\n• Your total ABN income\n• Invoices or income records\n• For rideshare or delivery work, your full earnings reports\n• Work-related expenses, with receipts or bank statements\n\nOnce we have everything, we’ll get started.",
    "keywords": [
      "abn",
      "uber",
      "income",
      "delivery",
      "rideshare",
      "sole",
      "trader",
      "invoices",
      "385"
    ],
    "tags": [
      "process",
      "abn",
      "pricing"
    ],
    "lang": "en"
  },
  {
    "intent": "multiple years",
    "question": "Can you do previous years / back years too?",
    "examples": [
      "I didn't do my return from a previous year",
      "I have missed returns from before",
      "can you lodge all three years?"
    ],
    "answer": "Yes, absolutely! We can help with previous years.\n\nTFN only: $220 per year\nTFN + ABN: $385 per year\n\nOnce payment is made and we’ve reviewed your details, we’ll confirm which years need to be lodged and provide an estimate for each.",
    "keywords": [
      "previous",
      "years",
      "back",
      "old",
      "missed",
      "multiple",
      "prior",
      "lodge",
      "three"
    ],
    "tags": [
      "process",
      "pricing"
    ],
    "lang": "en"
  },
  {
    "intent": "super claim",
    "question": "Can you help me claim my superannuation (DASP)?",
    "examples": [
      "I would like to claim my tax refund and apply for my super",
      "can you do my super refund?"
    ],
    "answer": "Yes, we can help with your super refund (DASP) too 😊 It's a separate service from your tax return, claimed after you've left Australia permanently, with its own fee that we confirm with you when the time comes. Happy to get your tax return moving first and sort the super out as well.",
    "keywords": [
      "super",
      "superannuation",
      "dasp",
      "claim",
      "refund",
      "pension"
    ],
    "tags": [
      "super"
    ],
    "lang": "en"
  },
  {
    "intent": "planning to lodge myself",
    "question": "I might lodge it myself, can you just give me guidance / an estimate?",
    "examples": [
      "I want to know if I'm eligible and then lodge it myself",
      "can I just get an estimate then do it myself?"
    ],
    "answer": "No problem, and we appreciate you being upfront 😊\n\nIt’s completely your call. With us, a specialist reviews your residency, deductions and Medicare, then prepares and lodges everything for you, all online.\n\nIf you get a refund and it comes to less than our fee, we refund you the difference. If you owe tax instead of getting a refund, the fee covers our review either way and isn’t refundable. If you want peace of mind that everything is done properly, we’d be happy to help.",
    "keywords": [
      "myself",
      "lodge",
      "own",
      "guidance",
      "estimate",
      "diy",
      "mygov"
    ],
    "tags": [
      "objection"
    ],
    "lang": "en"
  },
  {
    "intent": "how does the money reach me",
    "question": "Once it's lodged, how does my refund reach me if I can't log into the ATO?",
    "examples": [
      "how does my money reach me if I can't log into my ATO?",
      "does the amount just go into my aus bank automatically?"
    ],
    "answer": "Once your return is lodged, any refund is paid directly by the ATO into your verified Australian bank account, usually within 14 business days.",
    "keywords": [
      "money",
      "reach",
      "refund",
      "deposit",
      "bank",
      "account",
      "how",
      "receive",
      "lodged"
    ],
    "tags": [
      "process"
    ],
    "lang": "en"
  },
  {
    "intent": "why pay first value",
    "question": "Why do I need to pay upfront / what does the $220 cover?",
    "examples": [
      "what does the $220 cover?",
      "why would I pay before I know the amount?",
      "is this the full fee or are there extra charges?"
    ],
    "answer": "The $220 covers your TFN only return from start to finish. A specialist reviews your full situation, checks that nothing you’re entitled to is missed, then prepares and lodges everything online.\n\nIt’s one fixed fee with no extras. If you get a refund and it comes to less than our fee, we refund you the difference. If you owe tax instead of getting a refund, the fee covers our review either way and isn’t refundable.",
    "keywords": [
      "upfront",
      "pay",
      "first",
      "cover",
      "220",
      "full",
      "extra",
      "charges",
      "why"
    ],
    "tags": [
      "objection",
      "pricing"
    ],
    "lang": "en"
  },
  {
    "intent": "why use an agency instead of doing it myself",
    "question": "Why should I go through an agency instead of just doing my tax return myself?",
    "examples": [
      "why should I pay you instead of lodging it on my own?",
      "what's the benefit of using you rather than doing it myself?",
      "can't I just do this myself for free?"
    ],
    "answer": "That’s a really fair question!\n\nYou could handle it yourself, but working holiday tax can quickly become complicated with residency, deductions and Medicare.\n\nWith us, a specialist reviews your full situation, makes sure nothing you’re entitled to is missed, then prepares and lodges everything online.\n\nIf you get a refund and it comes to less than our fee, we refund you the difference. If you owe tax instead of getting a refund, the fee covers our review either way and isn’t refundable.",
    "keywords": [
      "why",
      "agency",
      "agent",
      "myself",
      "own",
      "benefit",
      "worth",
      "instead",
      "pay"
    ],
    "tags": [
      "objection",
      "value"
    ],
    "lang": "en"
  },
  {
    "intent": "request for a discount",
    "question": "Can you take some money off / give me a discount on the fee?",
    "examples": [
      "would you take any money off that for helping me?",
      "any chance of a discount?",
      "can you do it cheaper?"
    ],
    "answer": "Completely understand wanting the best value 😊 The fee is fixed at $220 for a TFN only return and is the same for everyone, so we can’t reduce it.\n\nIf you get a refund and it comes to less than our fee, we refund you the difference. If you owe tax instead of getting a refund, the fee covers our review either way and isn’t refundable.",
    "keywords": [
      "discount",
      "cheaper",
      "money",
      "off",
      "reduce",
      "lower",
      "deal",
      "price"
    ],
    "tags": [
      "objection",
      "pricing"
    ],
    "lang": "en"
  },
  {
    "intent": "superannuation while still in Australia",
    "question": "Can I claim my superannuation back while I'm still in Australia / before my visa ends?",
    "examples": [
      "can I already get my super back while I'm still here?",
      "I leave in October, can I claim super now?",
      "how do I get my super refund before I go home?"
    ],
    "answer": "Good question 😊 Your super (DASP) can only be claimed once you've left Australia and your visa has ended, so it can't be done while you're still here. We're happy to help when the time comes. For now, let's get your tax return sorted.",
    "keywords": [
      "super",
      "superannuation",
      "dasp",
      "still",
      "here",
      "leave",
      "visa",
      "expire",
      "before",
      "claim"
    ],
    "tags": [
      "super",
      "process"
    ],
    "lang": "en"
  },
  {
    "intent": "already started or lodged the return myself",
    "question": "I already tried to do my return myself and I'm not sure I did it right. Can you check or fix it?",
    "examples": [
      "I tried to lodge my own tax return but only got $1.60 back, can you check it?",
      "I started it myself and I'm not sure I filled it in correctly",
      "I already did it on my own but something looks wrong"
    ],
    "answer": "No problem, we can look at it. It depends on where it's up to:\n\nIf you only started it and haven't lodged, we simply prepare and lodge it for you as a normal tax return: $220 (TFN only) or $385 (TFN + ABN), with the usual guarantee that if your refund comes to less than the fee, we refund the difference.\n\nIf it's already been lodged, we review it and fix anything that was missed. Since it's a review rather than a fresh return, the refund guarantee doesn't apply and the fee ($220 TFN only, $385 with ABN income) is non-refundable regardless of the outcome.\n\nWhich one is it for you?",
    "keywords": [
      "already",
      "myself",
      "started",
      "tried",
      "lodged",
      "own",
      "check",
      "fix",
      "wrong",
      "mistake"
    ],
    "tags": [
      "handoff",
      "pricing",
      "process"
    ],
    "lang": "en"
  },
  {
    "intent": "do you need my payslips",
    "question": "The form didn't ask for my payslips, is that right? Do you need them?",
    "examples": [
      "the form doesn't ask for my payslips, is that correct?",
      "do you need me to send my payslips?",
      "where do I upload my income details?"
    ],
    "answer": "That’s right, no payslips needed. Once you’re our client, we can see the income and tax information reported to the ATO.\n\nWe usually only need your ID, a bank statement and any work-related expenses you’d like us to check.",
    "keywords": [
      "payslip",
      "payslips",
      "income",
      "form",
      "need",
      "upload",
      "ato",
      "details"
    ],
    "tags": [
      "process",
      "documents"
    ],
    "lang": "en"
  },
  {
    "intent": "is Medicare exemption included in the fee",
    "question": "Is the Medicare Levy Exemption included in the price?",
    "examples": [
      "is the price included the Medicare levy exemption?",
      "does the $220 cover the Medicare exemption too?",
      "do you charge extra for the Medicare part?"
    ],
    "answer": "Yes, it’s included at no extra charge. If a Medicare Levy Exemption may apply, we’ll let you know and guide you through the application as part of your return.",
    "keywords": [
      "medicare",
      "levy",
      "exemption",
      "included",
      "price",
      "fee",
      "cover",
      "extra",
      "220"
    ],
    "tags": [
      "medicare",
      "pricing"
    ],
    "lang": "en"
  },
  {
    "intent": "signing documents link asks me to log in",
    "question": "The link to sign my documents is asking me to log in / create an account. What do I do?",
    "examples": [
      "do I have to create a Xero account to sign the documents?",
      "the signing link keeps asking me to log in",
      "it won't let me open the document to sign"
    ],
    "answer": "It looks like you may have accidentally created a Xero account. If it asks for a password, try 123456789.\n\nIf that doesn’t work, log in using the email address you gave us, select “Forgot password” and reset it. You should then be able to open and sign the documents.",
    "keywords": [
      "sign",
      "signing",
      "documents",
      "xero",
      "login",
      "log",
      "account",
      "link",
      "open"
    ],
    "tags": [
      "process",
      "signing"
    ],
    "lang": "en"
  },
  {
    "intent": "Australian bank account is required",
    "question": "I've closed my Australian bank account / I don't have one any more. Can you still do my tax return?",
    "examples": [
      "my Commonwealth account is already closed, can I still lodge and get the refund?",
      "I've left Australia and shut my bank account",
      "do I need an Australian bank account?"
    ],
    "answer": "An active Australian bank account in your name is required because any refund is paid directly into it by the ATO.\n\nIf your account is closed and you don’t have another Australian account, unfortunately we can’t assist.",
    "keywords": [
      "bank",
      "account",
      "closed",
      "commonwealth",
      "australian",
      "refund",
      "deposit",
      "shut"
    ],
    "tags": [
      "blocker",
      "process",
      "refund"
    ],
    "lang": "en"
  },
  {
    "intent": "bank transfer shows a different account name",
    "question": "The account name doesn't match when I try to transfer the payment. Is that right?",
    "examples": [
      "I'm trying to transfer the money but the account name is not the same",
      "my bank shows a different company name, is this the right account?",
      "the name doesn't match, should I still send it?"
    ],
    "answer": "Yes, that’s the correct account. It’s registered under The Accounting Academy, which is why your bank shows that name.\n\nYou can go ahead with the transfer and send us a screenshot once it’s complete.",
    "keywords": [
      "account",
      "name",
      "transfer",
      "match",
      "different",
      "bank",
      "payment",
      "accounting",
      "academy"
    ],
    "tags": [
      "payment",
      "process"
    ],
    "lang": "en"
  },
  {
    "intent": "tax payable instead of a refund",
    "question": "What happens if I end up owing tax instead of getting a refund?",
    "examples": [
      "what happens if I have tax payable rather than a refund?",
      "I think I owe money, is the fee still charged?",
      "what if the result is $0 or I have to pay?",
      "I have an ABN and I owe the ATO, do I get the fee back?",
      "if after the check I still can't get a refund, is the money I paid gone?"
    ],
    "answer": "If it turns out you owe money instead of getting a refund, whether to lodge is your decision. Lodging is your own legal obligation and responsibility, but if you decide not to go ahead, we won’t lodge it for you.\n\nEither way, the service fee, $220 or $385, covers the review we carry out and is non-refundable.",
    "keywords": [
      "owe",
      "payable",
      "pay",
      "tax",
      "refund",
      "nothing",
      "zero",
      "guarantee",
      "fee",
      "lodge",
      "abn",
      "non refundable"
    ],
    "tags": [
      "pricing",
      "guarantee"
    ],
    "lang": "en"
  },
  {
    "intent": "request for a phone call",
    "question": "Can we have a quick call before I pay?",
    "examples": [
      "could we arrange a quick call please?",
      "can I speak to someone on the phone first?",
      "I'd feel better talking to a real person"
    ],
    "answer": "Our service is fully online, which helps us keep it quick and affordable.\n\nIf you’d prefer a call, we can arrange a consultation for $110. Otherwise, we’re happy to answer any questions here.",
    "keywords": [
      "call",
      "phone",
      "speak",
      "talk",
      "consultation",
      "zoom",
      "voice"
    ],
    "tags": [
      "process",
      "trust"
    ],
    "lang": "en"
  },
  {
    "intent": "review or amend a return already lodged",
    "question": "I lodged my return myself and the result looks wrong. Can you check it?",
    "examples": [
      "I lodged through the ATO and ended up owing money, can you review it?",
      "can you check whether my return was done correctly?",
      "another agent did it and I think it's wrong, can it be amended?"
    ],
    "answer": "Absolutely! We’ll review your return, check the calculation and see whether anything needs to be amended.\n\nThe review fee is $220 and is non-refundable.",
    "keywords": [
      "amend",
      "amendment",
      "review",
      "already",
      "lodged",
      "wrong",
      "correct",
      "check",
      "mistake"
    ],
    "tags": [
      "process",
      "pricing"
    ],
    "lang": "en"
  },
  {
    "intent": "do you need my login details",
    "question": "Do I have to give you my myGov or ATO login details?",
    "examples": [
      "do I need to give you any passwords?",
      "so I just pay and don't hand over any login details?",
      "how do I send you my TFN securely?"
    ],
    "answer": "A registered tax agent will never ask for your myGov login details.\n\nAfter payment, you’ll complete a short, secure form with your basic details, TFN, work information and Australian bank account details. We’ll then handle everything directly with the ATO.",
    "keywords": [
      "login",
      "details",
      "secure",
      "mygov",
      "ato",
      "tfn",
      "safe",
      "access",
      "password"
    ],
    "tags": [
      "security",
      "process",
      "trust"
    ],
    "lang": "en"
  },
  {
    "intent": "whole process from overseas",
    "question": "I've already left Australia. Can the whole thing be done online from where I am now?",
    "examples": [
      "I'm back in Japan now, can you still do it?",
      "can the process be completed online while I'm in Italy?",
      "I no longer have my Australian phone number, is that a problem?"
    ],
    "answer": "Yes, the whole process is online, wherever you are, and you don’t need an Australian phone number.\n\nOnce you’re our client, we access your income and tax information directly through the ATO, then prepare and lodge your return.\n\nThe only thing you need is an active Australian bank account in your name, as any refund is paid directly into it by the ATO.",
    "keywords": [
      "overseas",
      "abroad",
      "left",
      "home",
      "japan",
      "germany",
      "italy",
      "korea",
      "online",
      "remote",
      "phone",
      "number"
    ],
    "tags": [
      "process",
      "access"
    ],
    "lang": "en"
  },
  {
    "intent": "worried about visa or PR record",
    "question": "I don't want a dodgy return on my record in case I apply for PR. How is it actually done?",
    "examples": [
      "I don't want anything wrong on my file in case I apply for PR",
      "will this affect my visa?",
      "how do I know it's being done properly?"
    ],
    "answer": "Completely understand, it’s smart to be careful!\n\nWe operate under the supervision of a registered tax agent, and every return is reviewed and lodged with the ATO.\n\nhttps://workingholidaytax.com.au/client-agreement\n\nAny refund or tax owing is handled directly through the ATO and recorded on your account.",
    "keywords": [
      "pr",
      "visa",
      "permanent",
      "residency",
      "record",
      "dodgy",
      "proper",
      "correctly",
      "immigration"
    ],
    "tags": [
      "trust",
      "process"
    ],
    "lang": "en"
  },
  {
    "intent": "asked for a residency ruling on their own facts",
    "question": "Here are my dates, addresses and jobs. Am I an Australian resident for tax purposes?",
    "examples": [
      "I was in Adelaide 4 months and Melbourne 5 months, can I claim I'm an Australian resident?",
      "based on my situation, would I be treated as a resident?",
      "I'd like your opinion on my residency before I decide"
    ],
    "answer": "Thanks for explaining everything so clearly. Tax residency depends on your individual circumstances, so we can’t confirm it from a short summary.\n\nIt’s one of the first things we check in the review, and we’ll confirm your status after reviewing your full situation.",
    "keywords": [
      "resident",
      "residency",
      "tax",
      "purposes",
      "claim",
      "opinion",
      "assess",
      "situation",
      "dates"
    ],
    "tags": [
      "residency",
      "tax-question",
      "boundary"
    ],
    "lang": "en"
  },
  {
    "intent": "two people applying together",
    "question": "My partner and I both need tax returns. Can you do both?",
    "examples": [
      "we are two people who worked in Australia, can you do both returns?",
      "me and my girlfriend both need to lodge",
      "can you handle both of us together?"
    ],
    "answer": "Of course 😊\n\nEach return is handled separately, so each of you will need to message us from your own number.",
    "keywords": [
      "both",
      "two",
      "partner",
      "couple",
      "friend",
      "together",
      "each",
      "us"
    ],
    "tags": [
      "process",
      "pricing"
    ],
    "lang": "en"
  },
  {
    "intent": "what do you need from me to start",
    "question": "What details and documents do you need to get started?",
    "examples": [
      "what do you need from me?",
      "what information and documents will you need once we start?",
      "what details do you need to start this process?"
    ],
    "answer": "After payment, you’ll receive a short form asking for your basic details, TFN, work information and Australian bank account details.\n\nIf we need anything else, we’ll ask you here.",
    "keywords": [
      "documents",
      "details",
      "need",
      "information",
      "start",
      "form",
      "payslips",
      "tfn"
    ],
    "tags": [
      "process"
    ],
    "lang": "en"
  },
  {
    "intent": "estimate after paying before lodging",
    "question": "Will I see the refund estimate before anything is lodged?",
    "examples": [
      "will you send an estimate on what you think the return will be?",
      "do I get to see the number before you lodge it?",
      "can I see the estimate first?"
    ],
    "answer": "Yes, of course!\n\nOnce payment is received, we review everything and send you an estimate before anything is lodged.",
    "keywords": [
      "estimate",
      "before",
      "lodge",
      "see",
      "number",
      "expected",
      "refund"
    ],
    "tags": [
      "process",
      "trust"
    ],
    "lang": "en"
  },
  {
    "intent": "will pay after payday",
    "question": "I'll pay once I've been paid / after payday.",
    "examples": [
      "ok I will once I've been paid",
      "I'll sort the payment after my payday",
      "can I pay next week when my wages come in?"
    ],
    "answer": "No worries at all!\n\nJust send us a screenshot once payment is complete, and we’ll get started straight away.",
    "keywords": [
      "payday",
      "wages",
      "paid",
      "later",
      "week",
      "when",
      "salary"
    ],
    "tags": [
      "payment",
      "process"
    ],
    "lang": "en"
  },
  {
    "intent": "arrived with an old free eligibility check link",
    "question": "I have your link for a free eligibility check, should I fill it out?",
    "examples": [
      "should I go in here and fill out the eligibility check?",
      "I got a free check link from a video about you",
      "your site said free eligibility test"
    ],
    "answer": "Sorry for the confusion. We no longer offer free eligibility checks. We now provide a full review with personal guidance for $220.\n\nIf you get a refund and it comes to less than our fee, we refund you the difference. If you owe tax instead of getting a refund, the fee covers our review either way and isn’t refundable.",
    "keywords": [
      "free",
      "eligibility",
      "check",
      "link",
      "test",
      "checker",
      "old"
    ],
    "tags": [
      "pricing",
      "process"
    ],
    "lang": "en"
  },
  {
    "intent": "when does the refund arrive",
    "question": "Once it's lodged, when does the money actually arrive?",
    "examples": [
      "how long until I get the refund after you lodge it?",
      "when will the money hit my account?",
      "how long does the ATO take to pay?"
    ],
    "answer": "Once your return is lodged, any refund is usually paid into your bank account within 14 business days.",
    "keywords": [
      "when",
      "arrive",
      "long",
      "money",
      "account",
      "days",
      "ato",
      "lodged"
    ],
    "tags": [
      "process",
      "timing"
    ],
    "lang": "en"
  },

  // ══════════════════════════════════════════════════════════════════════
  // Mined 28 Aug 2026 from the full conversation export: 112 conversations,
  // 1,388 messages, read end to end.
  //
  // WHAT THESE ARE. Every one of them is a question a real customer asked
  // that Will had no Library answer for, and where the TEAM's own reply is on
  // record in the export. The answers are Jo's stated policy, shortened to the
  // three line rule; nothing here was invented, and where the team never
  // answered a question it was left OUT and reported to him instead.
  //
  // WHAT IS DELIBERATELY MISSING. Five recurring questions are NOT here
  // because the team answered them two or three different ways in different
  // conversations: what happens to the fee when the customer OWES tax, whether
  // DASP/super is offered and at what price, whether a closed Australian bank
  // account is a blocker, whether the free eligibility check still exists, and
  // data deletion requests. Shipping a guess on any of those would make Will
  // confidently wrong about money. They are waiting on one decision each.
  // ══════════════════════════════════════════════════════════════════════
  {
    "intent": "claim work clothing footwear laundry",
    "question": "Can I claim the clothes and shoes I bought for work?",
    "examples": [
      "Is it not classed as ppe?",
      "I would've bought a plain black t shirt for work before I was given the company uniform",
      "I did recently buy another pair of shoes for work",
      "things like scrubs, washing (of scrubs)",
      "I had bought several outfits for work, trousers, T-shirts, a sweater, and shoes"
    ],
    "answer": "Protective or occupation specific clothing may be claimable, such as hi-vis clothing, safety boots and scrubs.\n\nEveryday clothing like ordinary trousers or T shirts can't be claimed, even if you wear it to work.\n\nIf your total work-related expenses are $300 or less, receipts generally aren't required, but you still need to show how you calculated the amount.",
    "keywords": [
      "work clothing",
      "uniform",
      "ppe",
      "scrubs",
      "boots",
      "footwear",
      "laundry",
      "washing",
      "deduction",
      "receipts"
    ],
    "tags": [
      "documents",
      "process"
    ],
    "lang": "en"
  },
  {
    "intent": "claim travel to work tolls fuel",
    "question": "Can I claim my travel to work, tolls, fuel, buses or Ubers?",
    "examples": [
      "Can I not get any tolls back because it was to get to work?",
      "Would transport on bus and train be a work expense?",
      "I was driving to work for a few months so maybe diesel?",
      "all I have for work was my RSA that I had to pay for and busses to work",
      "I had also rented a scooter to get around"
    ],
    "answer": "Travel between home and your regular workplace generally can't be claimed, including tolls, buses or Ubers.\n\nTravel directly between work sites during the day may be claimable. If you used your own car for these trips, prepare a simple record showing approximately how many work-related kilometres you travelled during the year and how you calculated the total, up to 5,000 kilometres.",
    "keywords": [
      "travel",
      "tolls",
      "commute",
      "uber",
      "fuel",
      "bus",
      "train",
      "logbook",
      "work sites",
      "deduction"
    ],
    "tags": [
      "documents",
      "process"
    ],
    "lang": "en"
  },
  {
    "intent": "claim phone work use",
    "question": "Can I claim my phone if I use it for work?",
    "examples": [
      "I suppose using my phone for checking my roster and communication about work etc",
      "Can I claim my phone bill?",
      "Would I be able to claim back money spent on using my phone at work?",
      "Do I need to send my phone bills?"
    ],
    "answer": "Yes, we can claim the work-related portion.\n\nPlease tell us approximately what percentage of your phone use was for work and send us your phone bills for the year.",
    "keywords": [
      "phone",
      "mobile",
      "phone bill",
      "internet",
      "percentage",
      "work use",
      "roster",
      "deduction"
    ],
    "tags": [
      "documents",
      "process"
    ],
    "lang": "en"
  },
  {
    "intent": "claim courses licences union fees",
    "question": "Can I claim my RSA, White Card, tickets, licence or union fees?",
    "examples": [
      "I completed my RSA I will have to find the receipt of the certificate though",
      "I was working at the time and needed the tickets required for my job",
      "Tickets being the tickets courses for operating machines",
      "things like AHPRA, ANF (union)"
    ],
    "answer": "Courses and licences may be claimable if you were already working in the role and they were directly related to that job. Union and professional membership fees may also be claimed.\n\nSend us the receipt, or a bank statement with the payment highlighted if you can't find it. We'll check what can be included.",
    "keywords": [
      "rsa",
      "white card",
      "tickets",
      "course",
      "certificate",
      "licence",
      "union fees",
      "membership",
      "training",
      "receipt"
    ],
    "tags": [
      "documents",
      "process"
    ],
    "lang": "en"
  },
  {
    "intent": "pay from overseas or third party",
    "question": "I'm not in Australia any more. Can I pay from my overseas account, or can a friend send it for me?",
    "examples": [
      "Can I send from UK with wise ?",
      "I do not have any money on my australian bank account, is it possible to send it from my nz account?",
      "Can I send the money to my friend who is still in Australia and he will send it from his account?",
      "I'm moving money from UK account to Australian may take a while"
    ],
    "answer": "Payment can come from any account, as long as it reaches ours. Any tax refund will still be paid into your own Australian bank account.\n\nIf the transfer is difficult, send us your full name and we'll send you a payment link instead.",
    "keywords": [
      "wise",
      "pay from overseas",
      "friend paying",
      "transfer",
      "payment link",
      "nz account",
      "uk account",
      "who pays"
    ],
    "tags": [
      "pricing",
      "process"
    ],
    "lang": "en"
  },
  {
    "intent": "cannot access banking app for statement",
    "question": "I can't get into my Australian banking app to download a statement. Can I just give you my BSB and account number?",
    "examples": [
      "I don't have access to my bank statement as I can't get on my banking app due to no longer having my Ozzy number to verify",
      "How should I go about this on the form ?",
      "For some reason I can't get to my bank statements",
      "My phone won't let me make calls abroad so I can't verify"
    ],
    "answer": "Sorry, but we do need an official bank document showing your full name, BSB and account number.\n\nIt's an ATO requirement to make sure any refund goes into the correct account.\n\nYour bank can usually email this through online chat or its overseas support line, which is normally the quickest option.",
    "keywords": [
      "bank statement",
      "banking app",
      "bsb",
      "account number",
      "cant access",
      "australian number",
      "verification",
      "ato requirement"
    ],
    "tags": [
      "documents",
      "process"
    ],
    "lang": "en"
  },
  {
    "intent": "medicare exemption approval before lodging",
    "question": "Do I have to wait for my Medicare exemption to be approved before you lodge?",
    "examples": [
      "I have submitted and I've sent the screenshot like you said?",
      "Do you need the approval letter or is the confirmation enough?",
      "How long will the exemption take to come back?",
      "Can you lodge while the exemption is still processing?"
    ],
    "answer": "No, you don't need to wait. A screenshot confirming the application was submitted is enough for us to proceed.\n\nIf Services Australia doesn't approve it, the Medicare levy may still apply.",
    "keywords": [
      "medicare levy exemption",
      "screenshot",
      "submitted",
      "approved",
      "lodge",
      "waiting",
      "application",
      "levy"
    ],
    "tags": [
      "process"
    ],
    "lang": "en"
  },
  {
    "intent": "fee for multiple tax years",
    "question": "I have more than one year to lodge. How much is that?",
    "examples": [
      "I haven't done a tax return in a couple of years. I have 3 to do now including this year",
      "How much would it be for two years?",
      "Do I pay separately for each year?",
      "Is it cheaper if I do them all together?"
    ],
    "answer": "The fee is $220 per TFN only year, so there's one fee for each return we lodge.",
    "keywords": [
      "multiple years",
      "back years",
      "two years",
      "three years",
      "per year",
      "fee",
      "invoice",
      "220"
    ],
    "tags": [
      "pricing"
    ],
    "lang": "en"
  },
  {
    "intent": "employer not registered whm employer",
    "question": "One of my employers wasn't registered as a working holiday maker employer, so they withheld tax at a different rate and now I owe money. Can anything be done?",
    "examples": [
      "one of them wasn't registered as a 'working holiday maker employer' with the ATO, so they withheld tax at a different rate",
      "I ended up owing money, which surprised me since I understood the WHM rate is a flat 15%",
      "My return's already been lodged, is there anything that can be done now?",
      "Can you check whether the amount owing is correct?"
    ],
    "answer": "That may be part of the reason, but we'll need to review your full return to confirm what caused it.\n\nWe'll check the calculation, see whether anything needs amending.",
    "keywords": [
      "working holiday maker employer",
      "not registered",
      "withheld",
      "wrong rate",
      "owing tax",
      "amend",
      "review",
      "employer"
    ],
    "tags": [
      "objection",
      "process"
    ],
    "lang": "en"
  },
  {
    "intent": "australian tax year dates and when i can lodge",
    "question": "Do I have to wait until I leave Australia to lodge, and when does the Australian tax year run?",
    "examples": [
      "Is anything required now or only when I leave Australia for good?",
      "am I right in saying it starts on the 1st of July and ends on the 30th of June?",
      "I'm still here on my visa, is it too early to do my tax return?",
      "Do I need to wait until my visa ends before I can lodge?"
    ],
    "answer": "You don't need to wait until you leave. The Australian financial year runs from 1 July to 30 June, so you can lodge for any year that has already finished, even while you're still in Australia.",
    "keywords": [
      "tax year",
      "financial year",
      "1 july",
      "30 june",
      "when to lodge",
      "still in australia",
      "leave australia",
      "too early"
    ],
    "tags": [
      "process"
    ],
    "lang": "en"
  },
  {
    "intent": "only worked part of the financial year",
    "question": "I only worked part of the year, can I still lodge a return?",
    "examples": [
      "Is it possible considering I haven't worked the full year?",
      "I only started in February, can I still do a return for that year?",
      "I was only employed for a few months of that financial year, does that count?",
      "Do I need to have worked the whole 12 months?"
    ],
    "answer": "Yes, absolutely!\n\nYou don't need to have worked for the full 12 months. Once the financial year has ended, we can lodge your return for the income you earned during that year.",
    "keywords": [
      "part year",
      "partial",
      "few months",
      "full year",
      "12 months",
      "lodge",
      "financial year",
      "eligible"
    ],
    "tags": [
      "process"
    ],
    "lang": "en"
  },
  {
    "intent": "timeline after payment",
    "question": "Once I've paid, what happens next and how long does the whole thing take?",
    "examples": [
      "How long will it take when the payment is done?",
      "The invoice has been paid, do you have a timeline?",
      "what is my next step?",
      "How long until I hear back after I send the money?"
    ],
    "answer": "Once you've paid and completed the form, we'll review everything and get back to you within 24 hours.\n\nAfter you've signed, we'll lodge your return with the ATO. Any refund usually arrives in your bank account within 14 business days.",
    "keywords": [
      "how long",
      "timeline",
      "next step",
      "after payment",
      "24 hours",
      "14 business days",
      "sign",
      "lodge"
    ],
    "tags": [
      "process"
    ],
    "lang": "en"
  },
  {
    "intent": "how much tax do i owe on my income",
    "question": "I earned about this much, how much tax do I owe or will I get anything back?",
    "examples": [
      "I have been working three months on ABN and earned 26000 dollars by the 30th of June. How much tax do I owe.",
      "My income is more than 100.000. Is it still possible i can get tax return?",
      "My year-to-date income was $70,710.34, and my taxes were $14,193.00.",
      "I earned over the threshold this year, does that change anything?"
    ],
    "answer": "That's definitely something we can check for you.\n\nIt depends on your individual circumstances, so we'll need to review your full details before confirming. It's all included in the service.",
    "keywords": [
      "how much tax",
      "owe",
      "income",
      "earned",
      "tax bracket",
      "high income",
      "abn income",
      "calculate"
    ],
    "tags": [
      "pricing",
      "process"
    ],
    "lang": "en"
  },
  {
    "intent": "comparing with another accountant",
    "question": "I'm getting a quote from another accountant, or I've found someone else.",
    "examples": [
      "I'm also going to meet with another accountant later this week and will cross check fees",
      "hey thanks found someone else",
      "I've been quoted less elsewhere, why should I use you?",
      "I want to shop around before I decide"
    ],
    "answer": "No worries at all, we completely understand.\n\nJust make sure you're comparing the same level of service. With us, your full situation is reviewed and you receive personal guidance throughout, not just a submitted return.\n\nA registered tax agent will never ask for your myGov login details, and neither will we. If you need help in the future, we're always here.",
    "keywords": [
      "another accountant",
      "compare",
      "cheaper",
      "quote",
      "shop around",
      "elsewhere",
      "fees",
      "found someone else"
    ],
    "tags": [
      "pricing",
      "objection"
    ],
    "lang": "en"
  },
  {
    "intent": "form wants australian phone and address i no longer have",
    "question": "The form asks for an Australian phone number and address and I don't have them any more. What do I put?",
    "examples": [
      "I don't have an Australian phone number and I can't enter an address, what should I do?",
      "I've left Australia and my Australian number is dead, what do I enter?",
      "I don't live at my old Australian address any more, what should I put?",
      "Can I use my home country number on the form?"
    ],
    "answer": "Just enter the Australian phone number and address you used while you were living in Australia.",
    "keywords": [
      "australian phone number",
      "address",
      "form",
      "no longer",
      "left australia",
      "old number",
      "what to enter",
      "fields"
    ],
    "tags": [
      "process",
      "documents"
    ],
    "lang": "en"
  },
  {
    "intent": "lodgement deadline",
    "question": "Is there a deadline for paying and getting my tax return lodged?",
    "examples": [
      "What is the deadline for officially making the payment and submitting the application?",
      "Is there a cut off date I need to have my tax return done by?",
      "How long do I have to lodge my return for last financial year?",
      "Am I too late to do my tax return?"
    ],
    "answer": "If you lodge through us, your deadline may be extended until 15 May.",
    "keywords": [
      "deadline",
      "cut off",
      "31 october",
      "15 may",
      "lodge",
      "late",
      "financial year",
      "due date"
    ],
    "tags": [
      "process"
    ],
    "lang": "en"
  },
  {
    "intent": "form and documents come after payment",
    "question": "Should I fill in your form or send my documents over now?",
    "examples": [
      "Should I go in here and fill it out?",
      "Can I send you my tax documents? Thank you",
      "does this mean I make the payment first and then upload my documents?",
      "I'll have it completed this evening as I don't have my passport with me at the moment"
    ],
    "answer": "Not just yet. Once the fee is paid we'll send you a short form, and you upload your documents with it.\n\nJust send a screenshot of the payment and I'll get the form link over to you straight away.",
    "keywords": [
      "form",
      "questionnaire",
      "fill it out",
      "send documents",
      "upload",
      "before paying",
      "order",
      "next step"
    ],
    "tags": [
      "process",
      "documents"
    ],
    "lang": "en"
  },
  {
    "intent": "in person appointment",
    "question": "Can I come in and see you? What's your availability and what should I bring?",
    "examples": [
      "I would be happy to come in and discuss all of the above. Please let me know your availability",
      "Do you have an office I can visit?",
      "Can I book an appointment to go through this in person?",
      "Whereabouts are you based, can I drop my documents in?"
    ],
    "answer": "Our service is fully online, so there's no need to come in. After payment, you'll complete a quick form and upload your documents.\n\nOur team will review everything and get back to you within 24 hours.",
    "keywords": [
      "come in",
      "appointment",
      "office",
      "in person",
      "visit",
      "availability",
      "bring",
      "online"
    ],
    "tags": [
      "process"
    ],
    "lang": "en"
  },
  {
    "intent": "i was quoted a different price",
    "question": "I thought the fee was cheaper than that. Why is it $220?",
    "examples": [
      "I understood the fee to be lower, so could you please explain why it is $220?",
      "Your website said a different price, has it gone up?",
      "My friend paid less than that last year, why is mine more?",
      "I saw a lower number somewhere, which one is right?"
    ],
    "answer": "I can see where the confusion might have come from. The current fee for a TFN only return is $220.\n\nThat covers the whole return from start to finish, a proper review of your situation and lodging everything with the ATO. If you get a refund and it's less than $220, we top up the difference.",
    "keywords": [
      "price",
      "fee",
      "different price",
      "cheaper",
      "confusion",
      "220",
      "gone up",
      "quote"
    ],
    "tags": [
      "pricing",
      "objection"
    ],
    "lang": "en"
  },
  {
    "intent": "short stay worth lodging",
    "question": "I was only in Australia a few months and barely worked. Is it even worth doing a tax return?",
    "examples": [
      "I only stayed about 4 months and worked about 3, should I even lodge?",
      "Can I check whether I need one lodging?",
      "that was only a few weeks before the tax year ended so wouldn't be too much on there",
      "I only did a couple of months of farm work, is it worth it?"
    ],
    "answer": "Even if you only worked for a few months, it may still be worth lodging. If tax was withheld, you may be entitled to some of it back.",
    "keywords": [
      "short stay",
      "few months",
      "only worked",
      "worth it",
      "small income",
      "need to lodge",
      "barely",
      "part year"
    ],
    "tags": [
      "process"
    ],
    "lang": "en"
  },
  {
    "intent": "how tax residency is decided what makes me a resident",
    "question": "How do you decide if I'm an Australian resident for tax? What makes me a resident?",
    "examples": [
      "What would I need to show to be considered an Australian tax resident?",
      "What do I need to do or tell you to be treated as a resident?",
      "I lived in the same place and same job the whole time, does that make me a resident?",
      "You said I'm classified as a WHM, how do I know which one I actually am?",
      "What makes someone a resident for tax purposes?"
    ],
    "answer": "Tax residency isn't decided by your visa or length of stay alone. The ATO uses several tests based on your full circumstances, and meeting any one of them may make you an Australian resident for tax purposes.\n\nThe questionnaire guides you through these tests, and we confirm your status during the review because it can significantly affect your tax result.",
    "keywords": ["residency test","resident","criteria","five tests","whm","how decided","qualify","questionnaire","assess"],
    "tags": ["residency","tax-question","boundary"],
    "lang": "en"
  },
  {
    "intent": "tax free threshold eligibility",
    "question": "Do I get the $18,200 tax-free threshold?",
    "examples": [
      "Just wondered if I am eligible for the $18k tax free threshold",
      "I have family in Australia, I think that still qualifies me for the tax free threshold",
      "I earned over $45,001, can I still claim the threshold?",
      "Am I entitled to the tax free threshold as a backpacker?"
    ],
    "answer": "That's a great question!\n\nWhether the tax-free threshold applies depends on your tax residency and individual circumstances. That's exactly what we check in the review, and we'll confirm where you stand after reviewing your full situation.",
    "keywords": ["tax free threshold","18200","18k","threshold","resident","non resident","eligible","residency"],
    "tags": ["residency","tax-question"],
    "lang": "en"
  },
  {
    "intent": "redo or resubmit the form after a mistake",
    "question": "I think I answered something on the form wrong. Can I fill it out again?",
    "examples": [
      "I clicked the incorrect part, can I redo it?",
      "I put yes but think I should have put no, do I need to do it again?",
      "I filled it out as a WHM by mistake, how do I fix it?",
      "Sorry I got the residency question wrong, can I resubmit?",
      "I've filled it in wrong, what do I do?"
    ],
    "answer": "No problem at all!\n\nPlease complete the questionnaire again with the correct answers.",
    "keywords": ["form","questionnaire","mistake","wrong","redo","resubmit","fill again","correct","edit"],
    "tags": ["process","residency"],
    "lang": "en"
  },
  {
    "intent": "difference between tfn and abn",
    "question": "What's the difference between a TFN and an ABN? I'm not sure which one I worked under.",
    "examples": [
      "What does TFN or ABN mean? 😂",
      "I'm unsure what that means",
      "On my payslips it just states ABN",
      "I just worked on a TFN I believe, but I'm not certain",
      "Which one do I have?"
    ],
    "answer": "A TFN is used for regular employment, such as hospitality, farm work or hotels.\n\nAn ABN is used when you work for yourself, such as Uber, delivery, Airtasker or freelancing.",
    "keywords": ["tfn","abn","difference","what does it mean","which one","employee","contractor","self employed","payslip"],
    "tags": ["process"],
    "lang": "en"
  },
  {
    "intent": "must declare all abn income cannot do tfn only",
    "question": "I only earned a little through my ABN. Can I just do a TFN-only return to keep it cheaper, or does small ABN income not need declaring?",
    "examples": [
      "I don't have much money so I want to stay on the TFN only",
      "I understood the ABN only had to be declared up to a limit of $5,000",
      "It was only a few weeks of Uber Eats before the tax year ended so it wouldn't be much",
      "I did a few shifts under my ABN then moved to TFN, does that small bit count?",
      "Can we leave the ABN part off?"
    ],
    "answer": "All income earned in Australia must be declared, including ABN income, even if it was a small amount or only a few weeks of work. Your TFN and ABN income are included in one return.\n\nPlease send us your full ABN earnings reports, such as Uber or delivery reports, plus any related expenses. We'll make sure everything is included correctly.",
    "keywords": ["abn","declare","all income","tfn only","small","5000","uber","385","must report","leave off"],
    "tags": ["abn","process","pricing"],
    "lang": "en"
  },
  {
    "intent": "am I guaranteed a refund will I definitely get money back",
    "question": "Will I definitely get a refund? Can you confirm I'll get money back before I pay?",
    "examples": [
      "Will I definitely get tax back?",
      "What happens if you can't get the return into positive figures?",
      "I'm not sure if I'll get a refund, can you check it first?",
      "My coworkers got around $1000 back, would mine be similar?",
      "Am I guaranteed a rebate?"
    ],
    "answer": "Whether you're due a refund, and how much, depends on your individual situation. That's exactly what we check in the review, so we can't confirm anything beforehand.",
    "keywords": ["definitely","guaranteed","refund","get back","money back","eligible","confirm","rebate","positive"],
    "tags": ["objection","pricing","guarantee"],
    "lang": "en"
  },
  {
    "intent": "deduct the fee from my refund instead of paying upfront",
    "question": "Can you just take your fee out of my refund instead of me paying upfront?",
    "examples": [
      "I thought you would just deduct it from the tax return",
      "Isn't it possible to deduct the amount during the transfer?",
      "Can the fee come out of my refund when it comes through?",
      "I don't feel comfortable paying upfront, can you take it from the return?"
    ],
    "answer": "Unfortunately not. Any refund is paid directly by the ATO into your own Australian bank account and never passes through us, so the fee must be paid separately upfront.",
    "keywords": ["deduct","take from refund","out of my refund","upfront","pay first","fee","before refund"],
    "tags": ["payment","objection","pricing"],
    "lang": "en"
  },
  {
      "intent": "assess residency before lodging",
      "question": "Can your registered tax agent assess whether I was an Australian tax resident (or the Addy case / UK treaty position) before my return is lodged?",
      "examples": [
          "Before I book or pay, can you confirm your agent can specifically assess whether I was a tax resident during this period?",
          "Could the Australia UK treaty non discrimination principle from the Addy case apply to my return rather than the 15% working holiday maker rate?",
          "I would like the residency position assessed before my return is lodged",
          "I lived in the same place and worked for the same employer for five months, could I be treated as a resident instead of a WHM?"
      ],
      "answer": "Yes, that's exactly what our tax agent assesses as part of the review: your tax residency and whether the working holiday maker rate actually applies to you, based on your own circumstances, before anything is lodged.\n\nNothing gets lodged until that's been looked at properly.",
      "keywords": [
          "residency",
          "resident",
          "assess",
          "assessed",
          "addy",
          "treaty",
          "non",
          "discrimination",
          "whm",
          "rate",
          "15%",
          "before",
          "lodged",
          "lodge",
          "employer",
          "same",
          "accommodation",
          "reconsider",
          "uk",
          "citizen"
      ],
      "tags": [
          "tax-question",
          "residency"
      ],
      "lang": "en"
  },
  {
      "intent": "visa switch or tax bill mid year",
      "question": "I switched from a working holiday visa to a bridging visa this year and now I have a large tax bill. Have you dealt with this before?",
      "examples": [
          "This tax year I switched from a WHV to a bridging visa waiting for visa 820 and my tax bill is $4,200",
          "I changed visas during the year and now I owe tax, is something wrong?",
          "Have you had experience with people switching between visas resulting in a large tax bill?",
          "I did my taxes myself and it says I owe money"
      ],
      "answer": "Yes, we see this a lot. A visa change during the year can change how each part of the year is taxed, and that's exactly what our team reviews properly rather than leaving it to the automatic calculation.\n\nIf you'd like us to take it on, the next step is the option that suits you and we'll get started.",
      "keywords": [
          "visa",
          "switched",
          "switch",
          "bridging",
          "820",
          "partner",
          "tax",
          "bill",
          "owe",
          "owing",
          "large",
          "changed",
          "mid",
          "year",
          "experience",
          "dealt"
      ],
      "tags": [
          "tax-question",
          "owing"
      ],
      "lang": "en"
  },
  {
      "intent": "receipts and documents sent for deductions",
      "question": "How do I claim work clothes and tools? Here are my receipts. Do I send them here or through the form?",
      "examples": [
          "How does it work with claiming work clothes expenses in your form, do I send them into this chat or the form online?",
          "I've attached my receipts for boots, work pants and tools",
          "Here are my invoices from Bunnings and Supercheap Auto for tools",
          "Can I claim these? sending the receipts now"
      ],
      "answer": "Perfect, got them, they're on your file now. Either way works, here in the chat or through the form.\n\nOur team reviews what can be claimed as part of your return, so you don't need to work that out yourself.",
      "keywords": [
          "receipts",
          "receipt",
          "invoice",
          "invoices",
          "claim",
          "claiming",
          "clothes",
          "clothing",
          "boots",
          "tools",
          "work",
          "expenses",
          "deduction",
          "deductions",
          "send",
          "attach",
          "attached",
          "chat",
          "form"
      ],
      "tags": [
          "documents",
          "deductions"
      ],
      "lang": "en"
  }
];

