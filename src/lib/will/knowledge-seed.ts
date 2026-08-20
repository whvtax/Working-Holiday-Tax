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
    "intent": "eligibility check request",
    "question": "Can you check if I'm eligible for a tax refund / can you help with my Working Holiday tax return?",
    "examples": [
      "could you do a tax eligibility check for me?",
      "I'm on a WHV and need help lodging my tax return",
      "can you do my aus tax return",
      "looking to complete my tax return"
    ],
    "answer": "Hey! 😊 Absolutely, we'd be happy to help. To get started, just fill out this quick 2 minute form and I'll review everything and come back to you:\nhttps://workingholidaytax.com.au/tax-form\nOur fee is $220 for a TFN tax return, and it only applies if you're eligible for a refund. If you have any questions along the way, just ask 🙌🏽",
    "keywords": [
      "eligibility",
      "tax",
      "return",
      "refund",
      "whv",
      "help",
      "lodge",
      "check"
    ],
    "tags": [
      "opening"
    ],
    "lang": "en"
  },
  {
    "intent": "estimate before paying",
    "question": "Can you tell me how much I'll get back before I pay? Can I get a free estimate first?",
    "examples": [
      "how much am I likely to get back before I pay?",
      "can I do the eligibility check before paying?",
      "I'd like to know how much I'm likely to get back before paying you any money",
      "can you give me a rough idea of my refund first?"
    ],
    "answer": "That's a really fair question 😊 Working out an accurate figure means a qualified specialist reviewing your full situation directly with the ATO, and that review is the heart of the service. So we ask for the fee upfront before we do that work. Once it's paid, we go through everything carefully and make sure you get back every dollar you're entitled to. And you're protected either way: if your refund ends up lower than our fee, we refund you the difference, so you are never out of pocket for our service.",
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
    "answer": "Completely understand, and it's smart to check 🙏 We're a genuine service and we operate under the supervision of a registered tax agent. You can see all the details here:\nhttps://workingholidaytax.com.au/client-agreement\nWe've helped hundreds of backpackers from 45+ countries get their Australian tax sorted properly, so you're in good hands 💙",
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
    "intent": "pricing",
    "question": "How much do you charge? Is it a flat fee or a percentage?",
    "examples": [
      "I'm looking for pricing",
      "how much do you charge for each tax return?",
      "is it a flat fee or %?"
    ],
    "answer": "Happy to explain 😊 It's a simple flat fee, never a percentage of your refund:\n$220 for a TFN tax return, or $385 if you also have ABN income.\nFor multiple years, it's $220 per year. You only pay if you're eligible for a refund, and if your refund is ever less than the fee, we refund the difference, so you're never out of pocket for our service.",
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
    "answer": "Great question, and no pressure at all 😊 You only pay if you're eligible for a refund and decide to go ahead. And there's a built in safety net: if your refund turns out to be less than our fee, we refund you the difference, so you can never end up out of pocket for our service. That way you've got nothing to lose by letting us check.",
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
    "answer": "Yes, absolutely, and this is exactly what we're here for 😊 You don't need access to your myGov or ATO account at all. Once you're added as our client, we access everything we need directly through the ATO and prepare and lodge your return for you. When it's approved, your refund is simply deposited straight into your bank account. So you can leave all the myGov and ATO side of things to us.",
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
    "answer": "Let me check that with the team and confirm what's possible for your situation, and I'll come right back to you 😊",
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
    "answer": "Good question 😊 It's simply an ATO requirement, to confirm that the refund is being paid into a bank account that belongs to you. Any recent statement that clearly shows your name, BSB and account number is perfect, that's all we need it for.",
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
    "answer": "Totally understandable, and thank you for checking 🙏 We need your passport only to verify your identity before we prepare and lodge your tax return. It's part of the required identity check and is used for that purpose only, your information is kept secure and private.",
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
    "answer": "Since you weren't covered by Medicare, you can apply for a Medicare Levy Exemption so you're not charged the Medicare Levy. It only takes a few minutes, and once you send me a screenshot of the application we can lodge your return straight away while it's being processed. Here's a short guide:\nhttps://youtu.be/oj7ZSOHAxJk?si=KDMFlLoR0jYdpulB\nJust a heads up: the exemption is decided by Services Australia, so if it isn't approved the ATO may still apply the levy.",
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
    "answer": "The IHI and Medicare Entitlement Statement are both handled by Services Australia, not by us, so that side of it sits with them directly and it isn't something I can log into or troubleshoot for you. What I can do is take care of everything on the tax return itself. Let me flag this with the team so someone can talk you through the best next step, and in the meantime I'll keep your return moving so nothing is held up.",
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
    "answer": "That's an important one, and it really depends on your individual circumstances, so it's part of what we review properly for you rather than something to guess at. On the form there's a short, clear explanation of who is considered an Australian resident for tax purposes to guide you. Once we review your full situation, we make sure your residency is assessed correctly so nothing you're entitled to is missed.",
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
    "answer": "I completely understand wanting it to be as high as possible, and I'll gladly walk you through the calculation number by number so it's fully clear. Everyone's situation is different, even on the same visa, because it depends on income, how much tax was withheld and residency. The figure is worked out strictly according to the ATO rules for your circumstances, and we always make sure nothing you're legitimately entitled to is missed.",
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
    "answer": "As a rule, anything you paid for that helped you earn your income can be claimed, things like tools, uniform, work-specific clothing, a phone used for work, or required courses. If you don't have receipts, a bank statement showing the payment usually works, and there are some items (like a small laundry amount) that can be claimed without a receipt. Send me whatever you have and I'll let you know exactly what we can include.",
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
    "answer": "Since you have ABN income, your return covers both your TFN and ABN income, and the fee for that is $385. To get started, could you send me:\n• What kind of work you did under the ABN\n• Your total ABN income (for rideshare/delivery, your full earnings reports)\n• Any invoices or records of that income\n• Any work-related expenses, with receipts or bank statements\nOnce it's all here I'll get straight to work on it 🙌",
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
    "answer": "Yes, we can. You can generally claim a tax refund for up to the last few years, and we're happy to prepare each outstanding year for you. The fee is $220 per year (or $385 for a year that also includes ABN income). Once I've reviewed your details I'll let you know which years you're eligible for and the estimated refund for each.",
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
    "answer": "Yes, we can help with your super refund (DASP) too 😊 We're currently focused on tax returns, so for the super claim please message us again in about a month and we'll be glad to sort it out for you. In the meantime, let's get your tax return moving.",
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
    "answer": "No problem at all, and I appreciate you being upfront 🙏 If you'd prefer to handle it on your own, the ATO and some not-for-profits offer free general guidance for that. Our service is a full paid service where a specialist reviews everything and prepares and lodges the return for you, with the guarantee that you're refunded the difference if your refund is less than our fee. If you'd like us to take care of it end to end, I'd be glad to help.",
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
    "answer": "You don't need to log into anything 😊 Once your return is lodged, the ATO deposits your refund directly into the bank account we've verified for you, usually within about 14 business days. We take care of the whole process for you.",
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
    "answer": "The $220 covers your full TFN tax return, start to finish: a specialist reviews your situation properly with the ATO, makes sure nothing you're entitled to is missed, and prepares and lodges everything for you. It's a single flat fee with no surprise extra charges. We ask for it upfront because the review itself is the work, and it's backed by our guarantee, if your refund is less than the fee, we refund the difference.",
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
    "intent": "referral from friend or social",
    "question": "A friend / Instagram / TikTok referred me.",
    "examples": [
      "a friend gave me your number",
      "I saw you on Instagram",
      "someone recommended you"
    ],
    "answer": "That's lovely to hear, thank you for reaching out 😊 We'd be glad to help you get your Australian tax sorted properly. Just fill out this quick 2 minute form and I'll review everything and get back to you:\nhttps://workingholidaytax.com.au/tax-form\nOur fee is $220 and only applies if you're eligible for a refund 🙌🏽",
    "keywords": [
      "friend",
      "referred",
      "recommended",
      "instagram",
      "tiktok",
      "social",
      "gave",
      "number"
    ],
    "tags": [
      "opening",
      "referral"
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
    "answer": "Totally fair to ask 😊 You could of course handle it on your own, but Working Holiday tax gets complicated fast: residency status, which deductions you're actually allowed, Medicare, and it's easy to leave money on the table or make a mistake. What you're paying for is a specialist who reviews your full situation, makes sure nothing you're entitled to is missed, and prepares and lodges everything for you, backed by our guarantee that if your refund is less than the fee we refund the difference. Most people get back more than they would have alone, with none of the stress.",
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
    "answer": "I completely understand wanting the best value 😊 The fee is a single flat $220 for a TFN return, and it's the same for everyone, so it isn't something I'm able to lower. What makes it low risk is the guarantee: you only pay if you're eligible for a refund, and if your refund ever comes to less than the fee we refund you the difference, so you are never out of pocket for our service. Your refund itself is always paid to you in full by the ATO, separately from our fee.",
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
    "answer": "Good question 😊 Your super (the DASP, Departing Australia Superannuation Payment) can only be claimed once you've actually left Australia and your visa has expired or been cancelled, so it's not something that can be done while you're still here. We're happy to help you with it when the time comes. For now, let's get your tax return sorted, that part we can do straight away.",
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
    "intent": "bank account number format for the form",
    "question": "Is the bank account number my card number or the account number? What bank details do you need?",
    "examples": [
      "is the bank account number the card number or the short account number?",
      "what bank details do you need exactly?",
      "do you need my card number?"
    ],
    "answer": "Not your card number 😊 What we need is the account itself: the full name on the account, your BSB, and your account number. That's the account your refund gets paid into, so it just needs to clearly belong to you. A recent bank statement showing those details is perfect.",
    "keywords": [
      "bank",
      "account",
      "number",
      "card",
      "bsb",
      "details",
      "which",
      "need"
    ],
    "tags": [
      "documents"
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
    "answer": "Happy to help you get this sorted 😊 Because you've already started the return yourself, this one works a little differently: the $220 fee is paid upfront, and then we review everything properly, work out the correct figures and make sure nothing's been missed. And you're protected: if we review it and you're not actually eligible for a refund, we refund the $220 in full. Let me pass your details to the team so we can take a proper look and come back to you.",
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
    "answer": "That's right, you don't need to send payslips 😊 Once you're our client we can see all of your income and tax information for the year directly through the ATO, so there's nothing for you to dig up or add manually. The only things we usually ask for are your ID, a bank statement, and any work-related expenses you'd like to claim.",
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
    "answer": "Yes, it's included 😊 If the Medicare Levy Exemption applies to your situation, we guide you through exactly what's needed as part of your return, at no extra charge. It's all covered by the single flat fee.",
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
    "intent": "return not showing as lodged on myGov after lodging",
    "question": "You said it's lodged but it still shows as not lodged on my myGov, why?",
    "examples": [
      "it's just showing as not lodged on my gov?",
      "my myGov still says nothing has been lodged",
      "why can't I see the return in my ATO account?"
    ],
    "answer": "No need to worry 😊 We lodge through our own registered tax agent systems, not through your personal myGov, so it can take a couple of days for your account to update on its side. Your return is lodged. If it still hasn't updated after 48 hours, just let me know and I'll check it for you.",
    "keywords": [
      "mygov",
      "not",
      "lodged",
      "showing",
      "ato",
      "account",
      "update",
      "still",
      "see"
    ],
    "tags": [
      "process",
      "mygov"
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
    "answer": "You don't need to create any account to sign 😊 The link should open straight to your documents. If it's asking you to log in, it's usually a small glitch with the link, so let me resend you a fresh one and it should open right up. Let me know if the new link works.",
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
    "intent": "form won't let me continue says correct tax paid",
    "question": "The form won't let me submit / it says because I'm on a working holiday visa I paid the correct tax and don't qualify.",
    "examples": [
      "it won't let me continue, it says because I'm on a working holiday visa I paid the correct tax",
      "the form says I don't qualify",
      "I got blocked on the residency question"
    ],
    "answer": "Thanks for flagging that, and please don't take the form's message as the final word 😊 Whether you're treated as a working holiday maker or as an Australian resident for tax purposes depends on your individual circumstances, and there's a short explanation on that step of the form to help you decide. It can make a real difference to your refund, so it's genuinely worth reading carefully. If you think it may apply to you but you're not sure, leave it with me and we'll review your situation properly rather than guessing.",
    "keywords": [
      "form",
      "won't",
      "continue",
      "submit",
      "correct",
      "tax",
      "paid",
      "qualify",
      "whv",
      "resident",
      "blocked"
    ],
    "tags": [
      "process",
      "residency",
      "handoff"
    ],
    "lang": "en"
  }
];
