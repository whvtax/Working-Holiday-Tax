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

export const KNOWLEDGE_SEED: SeedKnowledge[] = [  {
    "intent": "eligibility check request",
    "question": "Can you check if I'm eligible for a tax refund / can you help with my Working Holiday tax return?",
    "examples": [
      "could you do a tax eligibility check for me?",
      "I'm on a WHV and need help lodging my tax return",
      "can you do my aus tax return",
      "looking to complete my tax return"
    ],
    "answer": "Hey! 😊 Absolutely, we'd be happy to help. To get started, fill out this quick 2 minute form and I'll review everything and come back to you:\nhttps://workingholidaytax.com.au/tax-form\nOur fee is $220 for a TFN return, and only applies if you're eligible for a refund. Any questions, just ask 🙌🏽",
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
    "answer": "That's a really fair question 😊 Working out an accurate figure means a specialist reviewing your full situation with the ATO, and that review is the heart of the service, so the fee comes first. And you're protected either way: if your refund ends up lower than our fee, we refund you the difference, so you are never out of pocket for our service.",
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
    "answer": "Completely understand, it's smart to check 🙏 We operate under the supervision of a registered tax agent, feel free to look us up before you decide:\n\nInstagram: https://www.instagram.com/workingholidaytax\nTikTok: https://www.tiktok.com/@workingholidaytax\nGoogle reviews: https://maps.app.goo.gl/FEjqSy53apD32YuF6\nClient agreement: https://workingholidaytax.com.au/client-agreement\n\nWe've helped hundreds of backpackers from 45+ countries, and if your refund is lower than our fee, we refund the difference.",
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
    "answer": "It's a simple flat fee, never a percentage of your refund 😊\n\n$220 for a TFN return, $385 if you also have ABN income, and $220 per year for multiple years.\n\nIf your refund is less than the fee, we refund the difference, so you're never out of pocket for our service.",
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
    "answer": "No pressure at all 😊 You only pay if you're eligible for a refund, and if it turns out to be less than our fee, we refund the difference, so you're never out of pocket for our service. Nothing to lose by letting us check.",
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
    "answer": "Yes, absolutely, this is exactly what we're here for 😊 You don't need myGov or ATO access, and you never give us any login details. Once you're our client we handle everything with the ATO directly, and your refund is deposited straight into your Australian bank account. The only exception is a Medicare Levy Exemption, which you apply for yourself, and we'll tell you if you need one.",
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
    "answer": "It's an ATO requirement 😊 The refund has to go into an account that belongs to you, so we need a recent statement showing your name, BSB and account number. That's all it's used for.",
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
    "answer": "Thanks for checking 🙏 Your passport is only used to verify your identity before we lodge your return, as part of the required identity check. It's kept secure and private.",
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
    "answer": "Since you weren't covered by Medicare, you can apply for a Medicare Levy Exemption so you're not charged the levy. It only takes a few minutes, here's a short guide:\nhttps://youtu.be/oj7ZSOHAxJk?si=KDMFlLoR0jYdpulB\nSend me a screenshot of the application and we'll lodge your return straight away. Just note the decision sits with Services Australia, so if it isn't approved the levy may still apply.",
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
    "answer": "The IHI and Medicare Entitlement Statement are handled by Services Australia, not by us, so that side sits with them directly and isn't something we can sort out for you. Let me flag it with the team so someone can talk you through the next step, and meanwhile I'll keep your return moving so nothing is held up.",
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
    "answer": "That's an important one, and it depends on your individual circumstances, so it's something we review properly rather than guess at. There's a short explanation on the form to guide you, and once we review your full situation we make sure your residency is assessed correctly.",
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
    "answer": "I understand wanting it as high as possible, and I'm glad to walk you through the calculation number by number. Every situation is different, even on the same visa: it depends on income, tax withheld and residency. The figure follows the ATO rules for your circumstances, and nothing you're legitimately entitled to is missed.",
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
    "answer": "Anything you paid for that helped you earn your income can generally be claimed: tools, uniform, work-specific clothing, a phone used for work, required courses. No receipt? A bank statement showing the payment usually works. Send me whatever you have and I'll tell you what we can include.",
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
    "answer": "Since you have ABN income, your return covers both TFN and ABN, and the fee is $385. Could you send me:\n• What kind of work you did under the ABN\n• Your total ABN income (for rideshare/delivery, your full earnings reports)\n• Any invoices or records of that income\n• Any work-related expenses, with receipts or bank statements\nOnce it's all here I'll get straight to work 🙌",
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
    "answer": "Yes, we can. Refunds can generally be claimed for the last few years, and the fee is $220 per year ($385 for a year with ABN income). Once I've reviewed your details I'll tell you which years you're eligible for and the estimated refund for each.",
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
    "answer": "Yes, we can help with your super refund (DASP) too 😊 It's separate from your tax return, claimed after you've left Australia permanently, with its own fee of $220. Happy to get your tax return moving first and sort the super out as well.",
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
    "answer": "No problem, and I appreciate you being upfront 🙏 If you'd rather handle it yourself, the ATO offers free general guidance. With us, a specialist reviews everything and prepares and lodges the return for you, and if your refund is less than our fee we refund the difference. If you'd like it taken care of end to end, I'd be glad to help.",
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
    "answer": "You don't need to log into anything 😊 Once your return is lodged, the ATO deposits your refund into the bank account we've verified for you, usually within about 14 business days.",
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
    "answer": "The $220 covers everything, start to finish: a specialist reviews your situation with the ATO, makes sure nothing you're entitled to is missed, and prepares and lodges it all. One flat fee, no extras, and if your refund is less than the fee, we refund the difference.",
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
    "answer": "That's lovely to hear, thank you 😊 Just fill out this quick 2 minute form and I'll review everything and get back to you:\nhttps://workingholidaytax.com.au/tax-form\nOur fee is $220 and only applies if you're eligible for a refund 🙌🏽",
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
    "answer": "Totally fair to ask 😊 You could of course handle it on your own, but Working Holiday tax gets complicated fast: residency, which deductions you're actually allowed, Medicare. It's easy to leave money on the table without knowing. With us, a specialist reviews your full situation and prepares and lodges everything, and if your refund is less than the fee we refund the difference.",
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
    "answer": "I understand wanting the best value 😊 The fee is a flat $220 for a TFN return, the same for everyone, so it's not something I can lower. But you only pay if you're eligible for a refund, and if it comes to less than the fee we refund you the difference, so you are never out of pocket for our service.",
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
    "intent": "bank account number format for the form",
    "question": "Is the bank account number my card number or the account number? What bank details do you need?",
    "examples": [
      "is the bank account number the card number or the short account number?",
      "what bank details do you need exactly?",
      "do you need my card number?"
    ],
    "answer": "Not your card number 😊 We need the account itself: the name on the account, BSB and account number. That's where your refund gets paid, so it just needs to clearly belong to you. A recent bank statement showing those details is perfect.",
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
    "answer": "Happy to help 😊 Because you've already started the return yourself, this works a little differently: the $220 is paid upfront, then we review everything, work out the correct figures and make sure nothing's been missed. If it turns out you're not eligible for a refund, we refund the $220 in full. Let me pass your details to the team.",
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
    "answer": "That's right, no payslips needed 😊 Once you're our client we see all your income and tax information directly through the ATO. All we usually ask for is your ID, a bank statement, and any work-related expenses you'd like to claim.",
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
    "answer": "No need to worry 😊 We lodge through our registered tax agent systems, not your personal myGov, so it can take a couple of days to show on your account. Your return is lodged. If it hasn't updated after 48 hours, let me know and I'll check.",
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
    "answer": "You don't need to create any account to sign 😊 The link should open straight to your documents. If it's asking you to log in, it's usually a glitch, so let me resend a fresh one.",
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
    "answer": "Thanks for flagging that, and don't take the form's message as the final word 😊 Whether you're treated as a working holiday maker or an Australian resident depends on your circumstances, and there's a short explanation on that step to help you decide. It can make a real difference to your refund. If you're not sure, leave it with me and we'll review it properly rather than guess.",
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
  },
  {
    "intent": "Australian bank account is required",
    "question": "I've closed my Australian bank account / I don't have one any more. Can you still do my tax return?",
    "examples": [
      "my Commonwealth account is already closed, can I still lodge and get the refund?",
      "I've left Australia and shut my bank account",
      "do I need an Australian bank account?"
    ],
    "answer": "An open Australian bank account is needed, because that's where the ATO deposits your refund. If yours is already closed, unfortunately we can't help with the return. If you can reopen it, or you still have another Australian account, just let me know and we'll get started 😊",
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
    "answer": "Yes, that's the right account 😊 It's registered under The Accounting Academy, so that's the name your bank shows. Go ahead with the transfer and send me a screenshot.",
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
    "answer": "If it's a TFN only return and you decide not to lodge, we refund the full $220, so you're not out of pocket.\n\nWhere there's ABN income as well the fee isn't refundable, but either way we go through everything properly so you know the figure is right.",
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
    "answer": "Our service is fully online, which is how we keep it quick and the fee low. If you'd rather speak to someone, we can arrange a consultation for $110. Otherwise I'm right here, so ask me anything you're unsure about.",
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
    "answer": "Absolutely. We'll review your return, check the calculation and see whether anything needs correcting or amending. The fee is $220. This one is a review of a return that's already been lodged, so the refund guarantee doesn't apply to it.",
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
    "answer": "No, never. You'll never give us your myGov or ATO login details. After payment you fill in a short, secure form with your basic details, your TFN, your work information and the bank account for your refund, and we handle the rest with the ATO.",
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
    "answer": "Yes, the whole process is online, from wherever you are, no Australian phone number needed. Once you're our client we access what we need directly through the ATO, including your income statement and tax withheld, and lodge your return. The one thing you do need is an open Australian bank account, because that's where the ATO deposits your refund.",
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
    "answer": "Completely understand, and that's the right thing to be careful about. We operate under the supervision of a registered tax agent, so your return is prepared properly and lodged correctly with the ATO: https://workingholidaytax.com.au/client-agreement\n\nYour refund, or any amount owing, comes straight from the ATO, so everything sits on your record the way it should.",
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
    "intent": "help registering an ABN",
    "question": "I need to register an ABN / I couldn't backdate the start date. Can you help, and does it cost more?",
    "examples": [
      "the ABN application won't let me put a start date more than 3 months ago",
      "I worked as a contractor but never registered an ABN",
      "since I have a TFN, is the price the same if I only need the ABN?"
    ],
    "answer": "No problem, we'll guide you through the ABN side of it, and it's included. It doesn't change what you pay: your tax return covers all your income, TFN and ABN together, which is $385 where there's ABN income.",
    "keywords": [
      "abn",
      "register",
      "registration",
      "backdate",
      "start",
      "date",
      "contractor",
      "sole",
      "trader"
    ],
    "tags": [
      "abn",
      "pricing",
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
    "answer": "Thanks for setting it out so clearly. Residency for tax purposes depends on your individual circumstances, so it isn't something to answer from a summary. It's one of the first things our team reviews as part of your return, and once we've been through your full situation we'll confirm where you stand.",
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
    "answer": "Of course. Each return is handled individually, so it's easiest if you each message me from your own number. The fee is $220 each for TFN only, or $385 each where there's also ABN income.",
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
    "answer": "Nothing complicated 😊 After payment you'll get a short form for your basic details, your TFN, your work information and the bank account for your refund. If anything else is needed, I'll ask you for it right here.",
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
    "answer": "Yes, of course. Once payment is received, we review everything and send you an estimate of your expected refund before anything is lodged.",
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
    "answer": "No worries at all 😊 Just send me a screenshot once you've paid and we'll get started straight away.",
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
    "answer": "That link is from before we changed how the service works, sorry about that, we no longer offer free eligibility checks. Now it's a full review with personal guidance for $220, and if your refund is less than that we refund the difference.",
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
    "answer": "Once it's lodged, your refund should arrive in your bank account within 14 business days.",
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
  {
    "intent": "wants to postpone or cancel after the work is done",
    "question": "Something came up, can I leave the return for now? (after the work is already done)",
    "examples": [
      "I'm flying home next week, can I leave my tax return and sort it when I'm back?",
      "can we pause this? I'll deal with it later",
      "I've decided not to lodge after all"
    ],
    "answer": "Of course, you can leave the lodgement until you're ready. The fee is still payable, though, as the work has already been done and we were only waiting for your signature.",
    "keywords": [
      "postpone",
      "leave",
      "later",
      "pause",
      "cancel",
      "emergency",
      "home",
      "wait"
    ],
    "tags": [
      "policy",
      "payment"
    ],
    "lang": "en"
  },
  {
    "intent": "personal small talk",
    "question": "Personal questions and small talk (where are you from, how old are you, etc.)",
    "examples": [
      "which part of England are you from?",
      "haha where are you based?",
      "are you in Australia yourself?"
    ],
    "answer": "Ha, I'll keep the mystery 😄 Anyway, is there anything else you'd like to know before we get started?",
    "keywords": [
      "where",
      "from",
      "personal",
      "old",
      "based",
      "name",
      "yourself"
    ],
    "tags": [
      "smalltalk",
      "tone"
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
    "answer": "Protective and occupation specific gear counts, so things like hi vis, safety boots and scrubs go in.\n\nPlain everyday clothing like ordinary trousers or t shirts can't be claimed. We can include the washing of your work clothes though, even without receipts.",
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
    "answer": "Trips between home and work aren't deductible, and that covers the tolls, buses and Ubers on the way in.\n\nTravel between different work sites during the day can be claimed. If that's you, tell me and we'll set up a simple logbook.",
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
    "answer": "Yes, we can claim the work related portion of it.\n\nJust tell me roughly what percentage of your phone use was for work, and send me your phone bills for the year.",
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
    "answer": "Yes, if you were already working in the role and the course or licence was needed for that job. Union and professional membership fees go in too.\n\nSend me the receipt, or a bank statement showing the payment if you can't find it.",
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
    "intent": "receipt wrong financial year",
    "question": "Does it matter what date is on my receipt?",
    "examples": [
      "it's a yearly expense, so paid again this year just don't have the invoice",
      "The invoices you need are the ones from when I arrived to Australia?",
      "Are these okay? (receipts from different years)",
      "Can I still put this one in even though I paid it last year?"
    ],
    "answer": "Yes, it needs to fall between 1 July and 30 June of the year we're lodging.\n\nAnything paid outside those dates belongs to a different tax year, so we can't include it in this one.",
    "keywords": [
      "receipt date",
      "financial year",
      "1 july",
      "30 june",
      "previous year",
      "invoice",
      "expenses",
      "which year"
    ],
    "tags": [
      "documents",
      "process"
    ],
    "lang": "en"
  },
  {
    "intent": "already paid but received invoice",
    "question": "I already paid you, so why have you sent me an invoice for the same amount?",
    "examples": [
      "Is that definitely the final number? And I've already paid?",
      "But I've paid already? Why is the invoice asking me to pay again?",
      "You sent me a Xero link, do I have to pay again?",
      "I got an invoice but I transferred the money yesterday"
    ],
    "answer": "No need to pay again, that's just your receipt for the fee you already sent. It's marked as paid on our side.\n\nThe refund figure is separate, that's what goes into your own bank account.",
    "keywords": [
      "invoice",
      "xero",
      "already paid",
      "pay twice",
      "receipt",
      "double charge",
      "fee",
      "payment"
    ],
    "tags": [
      "pricing",
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
    "answer": "Yes to both. It doesn't matter who sends it or where it comes from, as long as it reaches our account.\n\nYour refund still goes into your own account. If the transfer is tricky, send me your full name and I'll send you a payment link instead.",
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
    "answer": "Sorry, we do need an actual document showing your full name, BSB and account number. It's an ATO requirement so the refund lands in the right account.\n\nYour bank can usually email you one through their online chat or overseas support line, that's normally the quickest way.",
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
    "intent": "residency form wording usual home personal ties",
    "question": "What does 'usual home' or 'personal ties' actually mean on your residency questions?",
    "examples": [
      "Unsure on what my usual home would be is that the uk or where I'm living now",
      "I don't understand what that question on the form is asking",
      "I lived in Australia the whole time I worked so should I have ticked yes?",
      "What counts as personal ties?"
    ],
    "answer": "Your usual home means where you normally lived and thought of as home during that time.\n\nPersonal ties means family, close friends or a partner in Australia. Answer both for your actual situation and we'll confirm the rest in the review.",
    "keywords": [
      "usual home",
      "personal ties",
      "residency questionnaire",
      "tax residency form",
      "what does it mean",
      "questionnaire",
      "ticked yes"
    ],
    "tags": [
      "residency",
      "process"
    ],
    "lang": "en"
  },
  {
    "intent": "six months means 183 days",
    "question": "Does the '6 months in Australia' question mean 183 days in the financial year?",
    "examples": [
      "Is the 6 months counted from when I arrived or from July?",
      "I was only in Australia for about 5 months that year, does that mean I can't tick it?",
      "Does it mean 183 days between 1 July and 30 June?",
      "What period is the six months measured over?"
    ],
    "answer": "Yes, 183 days or more between 1 July and 30 June of that year.\n\nThat's only one of several residency tests though, so fewer days doesn't automatically rule you out. We confirm it properly during the review.",
    "keywords": [
      "183 days",
      "six months",
      "financial year",
      "residency test",
      "1 july",
      "30 june",
      "days in australia",
      "questionnaire"
    ],
    "tags": [
      "residency"
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
    "answer": "No, a screenshot showing the application has been submitted is enough for us to go ahead.\n\nJust note that if it isn't approved, the Medicare levy will still be payable.",
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
    "answer": "It's $220 per year for TFN income, so it's one fee for each year we lodge.\n\nI'll send you a single invoice covering all of them.",
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
    "intent": "abn application start date backdate",
    "question": "The ABN application won't let me put a start date more than 3 months ago. What date should I enter?",
    "examples": [
      "the online application does not allow me to enter a start date more than 3 months in the past",
      "I just try with 1/7/2025 and same issue",
      "would that be incorrect data? My visa started on the 27/9/2025",
      "Should I complete the form with the wrong date, or wait for your confirmation?"
    ],
    "answer": "Try 1 July of that financial year first. If the system won't take it, just submit with whatever earliest date it gives you.\n\nOnce the ABN comes through the start date can be moved back with the ATO. Tell me when you have it and we'll sort that part.",
    "keywords": [
      "abn",
      "start date",
      "backdate",
      "3 months",
      "registration",
      "1 july",
      "ato",
      "application"
    ],
    "tags": [
      "abn",
      "process"
    ],
    "lang": "en"
  },
  {
    "intent": "international income treaty gst questions",
    "question": "I worked remotely from Australia for an overseas company. Am I a foreign resident, which income is Australian source, and how does the tax treaty apply?",
    "examples": [
      "Am I considered a foreign resident for Australian tax purposes?",
      "Which of my freelance income is Australian-source?",
      "How does the double-tax treaty apply, and do I have an Australian permanent establishment?",
      "Do I need to register for GST, and are my services to the US company GST-free?"
    ],
    "answer": "Those depend entirely on your own circumstances and the treaty rules, so they're not something I can answer from a summary.\n\nWe work through residency, which income is Australian source and what you actually declare as part of your return. Reviewed and signed off by a registered tax agent.",
    "keywords": [
      "double tax treaty",
      "foreign resident",
      "australian source",
      "gst",
      "permanent establishment",
      "remote work",
      "overseas client",
      "contractor"
    ],
    "tags": [
      "residency",
      "abn"
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
    "answer": "That's usually what causes it. If an employer isn't registered they withhold at a different rate through the year, so it catches up at lodgement.\n\nWe can review the return, check the calculation and tell you whether it needs amending, plus how to stop it happening next year.",
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
    "answer": "You don't need to wait until you leave 😊\n\nThe Australian tax year runs 1 July to 30 June, so you can lodge for any financial year that has already finished, even while you're still here.",
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
    "answer": "Yes, you can still lodge. You don't need to have worked the full 12 months.\n\nAs long as the financial year has finished, we can lodge for the part of the year you worked.",
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
    "answer": "Once you've paid and filled out the form, we review everything and come back to you within 24 hours.\n\nAfter you've signed, we lodge it with the ATO and your refund should arrive in your bank account within 14 business days.",
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
    "intent": "confirm payment details before transferring",
    "question": "Are these the correct account details before I send the money?",
    "examples": [
      "Is this correct?",
      "Are these details correct",
      "Just checking these are your right bank details before I transfer",
      "Can you confirm the BSB and account number?"
    ],
    "answer": "Yes, those are the right details.\n\nAccount Name: Simple Tax Services, BSB: 062692, Account: 81049952.\n\nJust send me a screenshot once it's gone through and we'll get started.",
    "keywords": [
      "correct details",
      "bsb",
      "account number",
      "simple tax services",
      "confirm",
      "transfer",
      "payment",
      "screenshot"
    ],
    "tags": [
      "process",
      "trust"
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
    "answer": "That's definitely something we can check for you.\n\nIt depends on your individual situation, so we need to review your details properly before giving you an accurate answer. That's all included as part of the service once we get started.",
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
    "answer": "No worries at all, I completely understand.\n\nJust make sure you're comparing the same level of service. With us your situation is properly reviewed and you get personal guidance throughout, not just a return submitted.\n\nIf anything comes up, or you need a hand with a future year, we're here anytime.",
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
    "intent": "form questions refer to which period",
    "question": "The form asks if I plan to live in Australia. Do I answer for now, or for when I was there?",
    "examples": [
      "I live in Japan now so I answered no to planning to live in Australia, should I have said yes?",
      "I've already left, should I answer based on today or based on when I was working there?",
      "I said no to living in Australia because I'm home now, was that right?",
      "Which period do these residency questions refer to?"
    ],
    "answer": "The questions are all about your working holiday period, not where you are now.\n\nBeing back home is completely fine. Just answer based on your situation while you were living and working in Australia.",
    "keywords": [
      "form",
      "questions",
      "period",
      "while in australia",
      "left australia",
      "answer",
      "residency questions",
      "questionnaire"
    ],
    "tags": [
      "process",
      "residency"
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
    "answer": "Just enter the Australian phone number you used at the time, and the Australian address you lived at while you were there.\n\nThat's all we need for the form.",
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
    "answer": "There's no deadline on our side, you can start whenever you're ready.\n\nThe ATO deadline is 31 October for the previous financial year, or 15 May if you're using a registered tax agent. So as long as we've got time to review everything and lodge, you're all good.",
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
    "intent": "is my old tfn still valid",
    "question": "I got my TFN years ago and haven't been back since. Is it still valid or do I need a new one?",
    "examples": [
      "I applied for one many years ago and haven't been in Australia since. Would my TFN still be valid?",
      "Does a TFN expire if you leave Australia?",
      "I got my TFN on my first WHV, can I still use the same one?",
      "Do I need to apply for a new TFN for my second year?"
    ],
    "answer": "Good news, your TFN stays valid permanently. It doesn't expire, even if you haven't been in Australia for years.\n\nAnd once you're our client we deal with the ATO directly, so there's nothing you need to sort out first.",
    "keywords": [
      "tfn",
      "expire",
      "still valid",
      "old tfn",
      "new tfn",
      "years ago",
      "permanent",
      "reuse"
    ],
    "tags": [
      "process",
      "documents"
    ],
    "lang": "en"
  },
  {
    "intent": "tfn application not arrived",
    "question": "I applied for a TFN and it still hasn't come. Can you help me get it?",
    "examples": [
      "I would like to ask about my TFN",
      "I haven't received it after more than 28 days, what could I do?",
      "Can you help me apply for a TFN?",
      "My TFN application is taking ages, is there anything you can do?"
    ],
    "answer": "We help with tax returns once you already have your TFN. The application itself is handled directly by the ATO.\n\nIf it's been over 28 days, give the ATO a call on 13 28 61 from inside Australia, or +61 2 6216 1111 from overseas, and they'll check where it's at.",
    "keywords": [
      "tfn application",
      "apply for tfn",
      "28 days",
      "not received",
      "ato phone",
      "13 28 61",
      "waiting",
      "tax file number"
    ],
    "tags": [
      "process"
    ],
    "lang": "en"
  },
  {
    "intent": "update details with ato",
    "question": "Can you update my address or contact details with the ATO for me?",
    "examples": [
      "How can I update my TFN contact details with my new Australian address?",
      "I want to update my address so I can use it as a proof of address",
      "Can you change the address the ATO has for me?",
      "Can you update my phone number on my ATO record?"
    ],
    "answer": "Sorry, updating your details directly with the ATO isn't something I can do. That one goes through myGov, or you can call the ATO on 13 28 61.\n\nThe tax return side we can definitely help with, and the address we use goes on your form once you're a client.",
    "keywords": [
      "update address",
      "contact details",
      "change details",
      "proof of address",
      "ato",
      "mygov",
      "13 28 61",
      "record"
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
    "intent": "i already have my medicare entitlement statement",
    "question": "I already have my Medicare Entitlement Statement. Where do I send it?",
    "examples": [
      "I haven't entered any Medicare information yet, as I have a Medicare Entitlement Statement",
      "I've got my Medicare Entitlement Statement already, do you need it?",
      "Should I send you my MES now or later?",
      "Where do I upload my Medicare exemption certificate?"
    ],
    "answer": "Perfect, no problem at all!\n\nYou can upload it along with your other documents once you've filled out the form, and the team will make sure it's included in your return properly.",
    "keywords": [
      "medicare entitlement statement",
      "mes",
      "exemption",
      "upload",
      "already have",
      "certificate",
      "documents",
      "levy"
    ],
    "tags": [
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
    "answer": "We work entirely online, so there's no need to come in.\n\nOnce payment is made you fill out a quick form and upload your documents, then our team reviews everything and gets back to you within 24 hours.",
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
    "answer": "I can see where the confusion might have come from. The current fee for a TFN only return is $220.\n\nThat covers the whole return from start to finish, a proper review of your situation and lodging everything with the ATO. If your refund ends up less than $220, we'll refund the difference.",
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
    "answer": "Even a few months of work is worth doing a return for. If tax was withheld from your pay, some of that may come back to you.\n\nThere's also your residency status and Medicare to check, and that's all part of the review.",
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
    "intent": "overseas investments out of scope",
    "question": "I've got an investment back home as well. Can you include that?",
    "examples": [
      "I also have an investment back in the uk, unsure if this will be considered for tax purposes",
      "It's an investment ISA",
      "I have shares and a savings account in my home country, does that go in the return?",
      "I own a rental property back home, can you handle that too?"
    ],
    "answer": "Sorry, overseas investments like an ISA aren't something we deal with.\n\nFor a return with that in it, you'd be better off with someone who has experience with that type of tax return.",
    "keywords": [
      "investment",
      "isa",
      "shares",
      "overseas income",
      "home country",
      "foreign",
      "property",
      "out of scope"
    ],
    "tags": [
      "process",
      "objection"
    ],
    "lang": "en"
  }
];
