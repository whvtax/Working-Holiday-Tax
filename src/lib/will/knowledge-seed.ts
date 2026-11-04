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
    "intent": "process after the final review, signing and refund timing",
    "question": "What is the process now? Do I sign something after the final review? And how long until it is refunded?",
    "examples": [
      "What is the process now?",
      "Do I sign something after the final review?",
      "how long does it take to be refunded",
      "what happens after the invoice, do I need to sign",
      "what are the next steps after you send it for review"
    ],
    "answer": "Here is what happens next:\n\n1. Our team does a final review of your return.\n2. You then get an email with the return to sign online. Once you have signed, we lodge it with the ATO.\n3. After it is lodged, any refund is usually paid into your bank account within 14 business days.\n\nWe will message you here as each step is done.",
    "keywords": [
      "process",
      "sign",
      "signature",
      "final review",
      "refund",
      "how long",
      "next",
      "steps",
      "lodge"
    ],
    "tags": [
      "post-payment",
      "signature",
      "timeline"
    ],
    "lang": "en"
  },
  {
    "intent": "reportable fringe benefits on the income statement",
    "question": "My income statement shows reportable fringe benefits. Is that extra income?",
    "examples": [
      "what are reportable fringe benefits",
      "my employer statement has a fringe benefits amount",
      "is the fringe benefits figure taxed again",
      "there is a reportable amount on my income statement"
    ],
    "answer": "Reportable fringe benefits are usually benefits or salary packaging arranged through your employer. The amount is shown on your income statement and still gets reported in the return, so you do not need to do anything with it yourself. The team looks at it as part of the review and tells you if they need anything from you. The team confirms exactly what goes into the return when they review it, before anything is lodged.",
    "keywords": [
      "fringe",
      "benefits",
      "reportable",
      "income",
      "statement",
      "employer",
      "packaging"
    ],
    "tags": [
      "income",
      "review"
    ],
    "lang": "en"
  },
  {
    "intent": "receipts dated after 30 June belong to next year",
    "question": "Can I include receipts from after 30 June in this return?",
    "examples": [
      "my receipts are from July",
      "some purchases are from this month",
      "can I add recent receipts",
      "receipts from the new financial year"
    ],
    "answer": "The return we are preparing covers 1 July 2025 to 30 June 2026. Anything you paid for on or after 1 July 2026 belongs in next year's return, so it cannot go into this one. Please send the receipts and invoices dated inside the year we are preparing, and keep the newer ones for next time.",
    "keywords": [
      "receipts",
      "july",
      "30 june",
      "next year",
      "financial year",
      "dated",
      "after"
    ],
    "tags": [
      "expenses",
      "financial-year"
    ],
    "lang": "en"
  },
  {
    "intent": "income missing from the ATO record",
    "question": "One of my jobs is not listed in the income details you sent me. What should I do?",
    "examples": [
      "my other employer does not show up",
      "there is a job missing from the summary",
      "my employer has not reported my income yet",
      "HR said to check again"
    ],
    "answer": "What we see is what your employers have reported to the ATO so far. If a job is missing, the employer may not have reported it yet, so it is worth asking them directly whether they have finalised your income statement. In the meantime please send me your payslips or final payslip from that job. If more income appears later, the return is reopened and the team reviews it again before anything is lodged.",
    "keywords": [
      "missing",
      "employer",
      "income",
      "statement",
      "not listed",
      "payslip",
      "reported",
      "ato"
    ],
    "tags": [
      "income",
      "documents"
    ],
    "lang": "en"
  },
  {
    "intent": "return reopened because new income was added",
    "question": "Why is my return back in review and is the amount different now?",
    "examples": [
      "why was my return reopened",
      "the result changed",
      "you added more income",
      "is it still going to be lodged"
    ],
    "answer": "We reopened the return so that the extra income could be added. That changes the final result, so the team reviews it again and then sends you the updated figures to check and sign. Nothing is lodged before you have signed. I will message you here as soon as the new version is ready.",
    "keywords": [
      "reopened",
      "review",
      "income",
      "added",
      "changed",
      "result",
      "updated"
    ],
    "tags": [
      "status",
      "signature"
    ],
    "lang": "en"
  },
  {
    "intent": "sole trader and GST registration",
    "question": "Do I also have to pay GST or lodge GST returns for my ABN income?",
    "examples": [
      "I was self employed, do I owe GST",
      "is GST separate from my income tax",
      "do I need to register for GST",
      "what about GST on my ABN invoices"
    ],
    "answer": "GST is a separate matter from your income tax return. Whether you needed to be registered for GST depends on your situation, and the team checks that with your ABN details in the review. If you were not registered for GST, nothing extra is needed for that. Please send me your ABN invoices and records so we can look at it properly.",
    "keywords": [
      "gst",
      "abn",
      "registered",
      "sole trader",
      "separate",
      "invoices"
    ],
    "tags": [
      "abn",
      "gst"
    ],
    "lang": "en"
  },
  {
    "intent": "invoices show a foreign currency or unclear currency",
    "question": "Some of my invoices say USD. Does that matter?",
    "examples": [
      "my invoice has the wrong currency",
      "the invoice shows dollars but it is not clear which",
      "one invoice says USD instead of AUD",
      "currency on my ABN invoice"
    ],
    "answer": "Thanks for sending them. I noticed the currency on a couple of the invoices looks different from the rest. Can you confirm they were all paid to you in Australian dollars? If any were in another currency, tell me which ones and send the payment record so the team can check them.",
    "keywords": [
      "currency",
      "usd",
      "aud",
      "invoice",
      "dollars",
      "abn"
    ],
    "tags": [
      "abn",
      "documents"
    ],
    "lang": "en"
  },
  {
    "intent": "can you advise what to do with my super",
    "question": "Can you tell me what to do with my superannuation?",
    "examples": [
      "should I keep my super here",
      "what should I do with my super",
      "can you advise on my super fund",
      "my super is with a fund, can you help me move it"
    ],
    "answer": "We are not licensed financial advisers, so we cannot advise you on what to do with your super or how to manage it. Your super fund is the right place for questions about your account. For the tax return itself, I am happy to help: tell me when you would like to start.",
    "keywords": [
      "super",
      "superannuation",
      "advise",
      "fund",
      "financial",
      "advice"
    ],
    "tags": [
      "super"
    ],
    "lang": "en"
  },
  {
    "intent": "how much is the Medicare levy",
    "question": "How much is the Medicare levy?",
    "examples": [
      "what is the Medicare levy",
      "how much Medicare levy will I pay",
      "is the levy a percentage of my income",
      "how much does the Medicare exemption save"
    ],
    "answer": "The Medicare levy is generally 2 percent of taxable income, unless an exemption applies. Whether it applies to you is part of the review, so I cannot give you a figure before that. Once the team has been through your situation, you see the amount in your estimate.",
    "keywords": [
      "medicare",
      "levy",
      "percent",
      "2%",
      "exemption",
      "reduction",
      "how much"
    ],
    "tags": [
      "medicare"
    ],
    "lang": "en"
  },
  {
    "intent": "passport photo is closed or unreadable",
    "question": "My passport photo was rejected. What do you need?",
    "examples": [
      "why was my passport not accepted",
      "the passport photo is closed",
      "you cannot read my passport",
      "I sent my passport cover"
    ],
    "answer": "We need the open page with your photo and personal details, so we can confirm it is you. The cover or a closed passport does not work. Please take a clear photo of that page in good light, with all four corners visible, and send it through the secure form again.",
    "keywords": [
      "passport",
      "photo",
      "closed",
      "unreadable",
      "identity",
      "page",
      "verify"
    ],
    "tags": [
      "passport",
      "documents"
    ],
    "lang": "en"
  },
  {
    "intent": "form submitted without the bank document",
    "question": "Do you still need something from the bank?",
    "examples": [
      "I forgot to attach my bank statement",
      "the statement did not upload",
      "do I send the bank statement again",
      "which bank document did you want"
    ],
    "answer": "Yes, we still need an official document from your Australian bank showing your full name, BSB and account number. A bank statement, an account confirmation letter or a screenshot from the bank with all three details works. Please upload it through the secure form link so it stays in your file. If the upload fails, tell me and I will help.",
    "keywords": [
      "bank",
      "statement",
      "missing",
      "attach",
      "upload",
      "bsb",
      "document"
    ],
    "tags": [
      "bank",
      "documents"
    ],
    "lang": "en"
  },
  {
    "intent": "highlight ABN income in the bank statement",
    "question": "How do I show which payments are my ABN income?",
    "examples": [
      "how should I mark my ABN income",
      "can I send screenshots of the statement",
      "do I highlight the payments",
      "I cannot send a full statement"
    ],
    "answer": "Please send your bank statement as a PDF and highlight the payments that came from your ABN work, for example in yellow. If you cannot get a PDF, separate screenshots with the income highlighted are fine. Please include the work expenses you paid for yourself in another colour so we can match them to your receipts.",
    "keywords": [
      "highlight",
      "abn",
      "income",
      "statement",
      "screenshots",
      "yellow",
      "pdf"
    ],
    "tags": [
      "abn",
      "documents"
    ],
    "lang": "en"
  },
  {
    "intent": "many receipts sent, what happens next",
    "question": "I sent all my receipts. What now?",
    "examples": [
      "I have sent my invoices",
      "here are all my receipts",
      "I uploaded my expenses",
      "what do you do with the invoices"
    ],
    "answer": "Thank you, I have them. For the team to check each one, please tell me here in one line per item: what it was, how you used it for your work and that you paid for it yourself without being reimbursed. Anything you pay for privately or got back from your employer cannot go in. The team confirms exactly what goes into the return when they review it, before anything is lodged.",
    "keywords": [
      "receipts",
      "invoices",
      "expenses",
      "explain",
      "work",
      "related",
      "reimbursed",
      "one line"
    ],
    "tags": [
      "expenses",
      "documents"
    ],
    "lang": "en"
  },
  {
    "intent": "no kilometre record for work driving",
    "question": "My app does not show kilometres. How do I claim my car?",
    "examples": [
      "delivery app has no kilometres",
      "I do not have a logbook",
      "how do I work out my work kilometres",
      "the app only shows earnings"
    ],
    "answer": "That is common. Please send your earnings reports from the app and your car details: make, model, year and registration. For the kilometres, send a reasonable estimate of your work trips, and a short note on how you worked it out, for example a diary of typical trips. Trips between home and your regular workplace are private and cannot be claimed. The team confirms exactly what goes into the return when they review it, before anything is lodged.",
    "keywords": [
      "kilometres",
      "km",
      "logbook",
      "car",
      "delivery",
      "app",
      "estimate",
      "diary"
    ],
    "tags": [
      "expenses",
      "car"
    ],
    "lang": "en"
  },
  {
    "intent": "taxi or Uber rides during work hours",
    "question": "I paid for Uber rides for work. Can I claim them?",
    "examples": [
      "Uber to a work site",
      "I took taxis between jobs",
      "my employer does not cover my rides",
      "rides during my shift"
    ],
    "answer": "Rides between your home and your regular workplace are private, so they cannot be claimed. Rides you paid for yourself during work, for example between two work locations or to a job site, can be looked at if your employer did not pay them back. Please send the receipts and tell me for each ride where you went and why. The team confirms exactly what goes into the return when they review it, before anything is lodged.",
    "keywords": [
      "uber",
      "taxi",
      "rides",
      "travel",
      "work",
      "site",
      "receipts",
      "commute"
    ],
    "tags": [
      "expenses",
      "travel"
    ],
    "lang": "en"
  },
  {
    "intent": "drive in drive out to a remote work site",
    "question": "I drive to a mine site instead of flying. Can I claim that?",
    "examples": [
      "travel to a remote site",
      "fuel for driving to work",
      "I drive a long way to my roster",
      "petrol for the drive to the mine"
    ],
    "answer": "Travel between your home and your workplace counts as private travel, even when the distance is long, so it cannot be claimed. If you have other work-related expenses that you paid for yourself, send the receipts and the team looks at them in the review.",
    "keywords": [
      "drive",
      "mine",
      "remote",
      "site",
      "fuel",
      "petrol",
      "travel",
      "commute"
    ],
    "tags": [
      "expenses",
      "travel"
    ],
    "lang": "en"
  },
  {
    "intent": "bike or scooter rental for delivery work",
    "question": "I rented an e-bike for delivery work. Can I include it?",
    "examples": [
      "rental of a bike for Uber Eats",
      "I paid for a scooter for deliveries",
      "equipment hire for my ABN work",
      "can I claim my delivery bike"
    ],
    "answer": "Yes, costs of equipment you paid for yourself to earn your ABN income can be looked at. Please send the rental invoices or receipts for everything you paid, and anything else that helped you do the work. The team confirms exactly what goes into the return when they review it, before anything is lodged.",
    "keywords": [
      "bike",
      "e-bike",
      "scooter",
      "rental",
      "delivery",
      "abn",
      "equipment"
    ],
    "tags": [
      "abn",
      "expenses"
    ],
    "lang": "en"
  },
  {
    "intent": "duplicate income shown twice",
    "question": "The same income seems to appear twice. Is that a problem?",
    "examples": [
      "my wage is listed two times",
      "duplicate payslip",
      "income counted twice",
      "the same job shows up twice"
    ],
    "answer": "Thank you for flagging it. The team checks your income against the payslips and the figures from the ATO, and removes anything that is counted twice. If you can send the final payslip for that job, it helps us confirm the right total.",
    "keywords": [
      "duplicate",
      "twice",
      "income",
      "payslip",
      "double",
      "counted"
    ],
    "tags": [
      "income",
      "review"
    ],
    "lang": "en"
  },
  {
    "intent": "hardware store or supplies purchases",
    "question": "I bought tools and supplies at a hardware store. Can I claim them?",
    "examples": [
      "Bunnings receipts",
      "I bought materials for my trade",
      "tools from a hardware shop",
      "supplies I paid for myself"
    ],
    "answer": "Items you bought for your work and paid for yourself can be looked at. Please send the receipts and tell me whether everything was used for work only, and whether your employer paid any of it back. Anything used privately, even partly, needs to be split. The team confirms exactly what goes into the return when they review it, before anything is lodged.",
    "keywords": [
      "tools",
      "hardware",
      "bunnings",
      "supplies",
      "materials",
      "work",
      "personal"
    ],
    "tags": [
      "expenses"
    ],
    "lang": "en"
  },
  {
    "intent": "covered by Medicare for part of the year only",
    "question": "I only had Medicare for part of the year. What happens to the levy?",
    "examples": [
      "Medicare for a few months",
      "I had private health first",
      "partial year Medicare",
      "I was on Medicare from November"
    ],
    "answer": "Please give me the exact dates you were and were not covered by Medicare. The Medicare Entitlement Statement from Services Australia shows the period, and the team uses it in the review. We cannot apply to Services Australia for you. If you cannot get it, we can go ahead without it and the Medicare levy is then part of the return.",
    "keywords": [
      "medicare",
      "part",
      "year",
      "dates",
      "levy",
      "exemption",
      "statement"
    ],
    "tags": [
      "medicare"
    ],
    "lang": "en"
  },
  {
    "intent": "is there an extra fee for a lot of receipts",
    "question": "I have lots of receipts. Will that cost more?",
    "examples": [
      "is there an extra charge for many invoices",
      "do you charge per receipt",
      "I have 40 invoices",
      "more expenses, more fee?"
    ],
    "answer": "The fee is fixed: $220 for a TFN return and $385 with ABN income, GST included. Please send everything you have and the team goes through it. If anything unusual comes up, I will tell you here before doing any work that changes the price.",
    "keywords": [
      "extra",
      "fee",
      "receipts",
      "invoices",
      "many",
      "charge",
      "price"
    ],
    "tags": [
      "pricing",
      "expenses"
    ],
    "lang": "en"
  },
  {
    "intent": "how the amount payable was worked out",
    "question": "Can you show me how you worked out what I owe the ATO?",
    "examples": [
      "how did you get this figure",
      "what is the breakdown of my tax",
      "show me the working out",
      "why do I owe this amount"
    ],
    "answer": "Of course. The estimate is built from your total income, minus any work-related expenses, which gives your taxable income. Tax is worked out on that, including the Medicare levy where it applies. Then we take off the tax already withheld by your employers and any offsets. The result is the amount payable or the refund. The team sends the lines for your return in the estimate message, and I can go through any line with you.",
    "keywords": [
      "breakdown",
      "working out",
      "how",
      "tax",
      "payable",
      "taxable income",
      "withheld"
    ],
    "tags": [
      "estimate"
    ],
    "lang": "en"
  },
  {
    "intent": "total income includes both TFN and ABN",
    "question": "Is the income total TFN and ABN together?",
    "examples": [
      "is my ABN income included in the total",
      "where does this total income come from",
      "does the estimate include both jobs",
      "is that figure everything I earned"
    ],
    "answer": "Yes, the total income in your estimate combines your TFN income from employers and your ABN income. If you think a job or payment is missing from it, tell me and send the payslip or invoice, and the team checks it.",
    "keywords": [
      "total",
      "income",
      "tfn",
      "abn",
      "combined",
      "estimate"
    ],
    "tags": [
      "estimate",
      "abn"
    ],
    "lang": "en"
  },
  {
    "intent": "blurry or unreadable receipt photo",
    "question": "You said my receipt is not readable. What do I do?",
    "examples": [
      "my photo is blurry",
      "you cannot read my receipt",
      "can I resend the invoice",
      "the picture is too dark"
    ],
    "answer": "No problem. Please take the photo again in good light, flat on a table, so the date, shop name and amount are all clear. A screenshot of the order email or your bank statement showing the payment also works.",
    "keywords": [
      "blurry",
      "unreadable",
      "receipt",
      "photo",
      "resend",
      "clear"
    ],
    "tags": [
      "documents"
    ],
    "lang": "en"
  },
  {
    "intent": "Mietzimmer oder Unterkunft für die Arbeit",
    "question": "Ich habe ein Zimmer für die Arbeit gemietet. Kann ich das absetzen?",
    "examples": [
      "Miete für ein Zimmer bei der Arbeit",
      "Unterkunft wegen Job",
      "kein Mietvertrag vorhanden",
      "kann ich die Unterkunft für die Arbeit angeben"
    ],
    "answer": "Eine Unterkunft kann nur geprüft werden, wenn sie beruflich bedingt war, also nicht dort, wo du ohnehin wohnst, und wenn du sie selbst bezahlt hast. Dafür brauchen wir die vollständige Adresse, den Mietvertrag, einen Zahlungsnachweis und Rechnungen oder Quittungen. Schick mir, was du hast, dann sagt dir das Team, was möglich ist. Das Team prüft bei der Durchsicht genau, was in die Steuererklärung kommt, bevor etwas eingereicht wird.",
    "keywords": [
      "Miete",
      "Zimmer",
      "Unterkunft",
      "Mietvertrag",
      "Nachweis",
      "Arbeit",
      "absetzen"
    ],
    "tags": [
      "expenses",
      "documents"
    ],
    "lang": "de"
  },
  {
    "intent": "Umsatzsteuer GST bei ABN",
    "question": "Muss ich als Selbstständige auch Umsatzsteuer zahlen?",
    "examples": [
      "GST bei meiner ABN",
      "ich war selbstständig, muss ich GST zahlen",
      "ist GST etwas anderes als die Einkommensteuer",
      "muss ich mich für GST registrieren"
    ],
    "answer": "Die Umsatzsteuer (GST) ist eine eigene Sache neben deiner Einkommensteuererklärung. Ob du für GST registriert sein musstest, hängt von deiner Situation ab, das prüft das Team zusammen mit deiner ABN bei der Durchsicht. Wenn du nicht registriert warst, ist dafür nichts weiter nötig. Schick mir bitte deine ABN-Rechnungen und Unterlagen.",
    "keywords": [
      "GST",
      "Umsatzsteuer",
      "ABN",
      "selbstständig",
      "registriert",
      "Rechnungen"
    ],
    "tags": [
      "abn",
      "gst"
    ],
    "lang": "de"
  },
  {
    "intent": "ABN-Einnahmen im Kontoauszug markieren",
    "question": "Wie zeige ich euch, welche Zahlungen meine ABN-Einnahmen sind?",
    "examples": [
      "muss ich die Einnahmen markieren",
      "kann ich Screenshots vom Kontoauszug schicken",
      "ich bekomme keinen kompletten Kontoauszug",
      "wie markiere ich die Zahlungen"
    ],
    "answer": "Schick mir bitte deinen Kontoauszug als PDF und markiere die Zahlungen aus deiner ABN-Arbeit, zum Beispiel gelb. Wenn du kein PDF bekommst, sind einzelne Screenshots mit markierten Einnahmen in Ordnung. Ausgaben, die du selbst bezahlt hast, markierst du bitte in einer anderen Farbe, damit wir sie deinen Belegen zuordnen können.",
    "keywords": [
      "markieren",
      "gelb",
      "ABN",
      "Kontoauszug",
      "Screenshots",
      "Einnahmen",
      "PDF"
    ],
    "tags": [
      "abn",
      "documents"
    ],
    "lang": "de"
  },
  {
    "intent": "Einkommen fehlt in den ATO-Daten",
    "question": "Ein Job fehlt in den Angaben, die ihr mir geschickt habt. Was soll ich tun?",
    "examples": [
      "mein anderer Arbeitgeber ist nicht aufgeführt",
      "ein Job taucht nicht auf",
      "Arbeitgeber hat mein Einkommen noch nicht gemeldet",
      "HR sagt, ich soll nochmal nachsehen"
    ],
    "answer": "Wir sehen nur das, was deine Arbeitgeber bisher an das ATO gemeldet haben. Fehlt ein Job, hat der Arbeitgeber ihn vielleicht noch nicht gemeldet. Frag ihn bitte direkt, ob dein Income Statement abgeschlossen ist. Schick mir in der Zwischenzeit deine Lohnabrechnungen von diesem Job. Taucht später mehr Einkommen auf, öffnen wir die Erklärung noch einmal und das Team prüft sie neu, bevor etwas eingereicht wird.",
    "keywords": [
      "fehlt",
      "Arbeitgeber",
      "Einkommen",
      "gemeldet",
      "Lohnabrechnung",
      "ATO"
    ],
    "tags": [
      "income",
      "documents"
    ],
    "lang": "de"
  },
  {
    "intent": "Fahrten zwischen Wohnort und Arbeit",
    "question": "Kann ich die Fahrten zur Arbeit absetzen?",
    "examples": [
      "Benzin zur Arbeit",
      "ich fahre jeden Tag zur Baustelle",
      "Fahrkosten zur Arbeit",
      "Weg von zu Hause zum Arbeitsplatz"
    ],
    "answer": "Fahrten zwischen deinem Zuhause und deinem regulären Arbeitsplatz zählen als privat und können nicht abgesetzt werden. Anders ist es bei Fahrten während der Arbeit, zum Beispiel zwischen zwei Einsatzorten. Dafür brauche ich eine Übersicht deiner beruflichen Fahrten mit Datum, Zweck und ungefähren Kilometern. Das Team prüft bei der Durchsicht genau, was in die Steuererklärung kommt.",
    "keywords": [
      "Fahrten",
      "Kilometer",
      "Benzin",
      "Arbeit",
      "privat",
      "Fahrtenübersicht"
    ],
    "tags": [
      "expenses",
      "car"
    ],
    "lang": "de"
  },
  {
    "intent": "viele Belege geschickt",
    "question": "Ich habe alle meine Belege geschickt. Wie geht es weiter?",
    "examples": [
      "hier sind alle meine Rechnungen",
      "ich habe meine Ausgaben hochgeladen",
      "was passiert mit den Belegen",
      "Belege sind verschickt"
    ],
    "answer": "Danke, ich habe sie. Damit das Team jeden Beleg prüfen kann, schreib mir bitte hier pro Beleg eine Zeile: was es war, wie du es für deine Arbeit genutzt hast und dass du es selbst bezahlt hast, ohne Erstattung vom Arbeitgeber. Privates oder Erstattetes kann nicht angesetzt werden.",
    "keywords": [
      "Belege",
      "Rechnungen",
      "Ausgaben",
      "Erklärung",
      "beruflich",
      "Erstattung"
    ],
    "tags": [
      "expenses",
      "documents"
    ],
    "lang": "de"
  },
  {
    "intent": "Ausland Währung auf der Rechnung",
    "question": "Auf zwei Rechnungen steht USD. Ist das ein Problem?",
    "examples": [
      "falsche Währung auf der Rechnung",
      "Rechnung in Dollar, nicht klar welche",
      "USD statt AUD",
      "Währung bei meinen ABN-Rechnungen"
    ],
    "answer": "Danke fürs Schicken. Mir ist aufgefallen, dass bei ein paar Rechnungen eine andere Währung steht. Waren es alle australische Dollar? Falls etwas in einer anderen Währung bezahlt wurde, sag mir bitte welche Rechnungen und schick mir den Zahlungsnachweis, dann prüft das Team es.",
    "keywords": [
      "Währung",
      "USD",
      "AUD",
      "Rechnung",
      "ABN"
    ],
    "tags": [
      "abn",
      "documents"
    ],
    "lang": "de"
  },
  {
    "intent": "通勤の交通費やガソリン代",
    "question": "自宅から職場までのガソリン代は経費にできますか？",
    "examples": [
      "通勤でガソリンを使いました",
      "職場までの交通費は申告できますか",
      "車で通勤しています",
      "ガソリン代のレシートがあります"
    ],
    "answer": "自宅から通常の職場までの移動は私的な移動として扱われるため、基本的に経費にはできません。勤務中の移動、たとえば現場から現場への移動などは確認できる場合があります。その場合は、日付、目的、おおよその距離がわかる記録を送ってください。実際に何を申告に含めるかは、提出前にチームが確認します。",
    "keywords": [
      "ガソリン",
      "通勤",
      "交通費",
      "経費",
      "車",
      "移動"
    ],
    "tags": [
      "expenses",
      "car"
    ],
    "lang": "ja"
  },
  {
    "intent": "領収書を送った後の流れ",
    "question": "領収書を全部送りました。このあとどうなりますか？",
    "examples": [
      "領収書を送りました",
      "経費の書類をアップロードしました",
      "レシートは足りていますか",
      "送った書類はどうなりますか"
    ],
    "answer": "ありがとうございます、受け取りました。チームが一つずつ確認できるよう、項目ごとに一行で教えてください。何の費用か、仕事にどう使ったか、ご自身で支払い、雇用主から返金されていないか、の3点です。私的な支出や返金されたものは含められません。提出前にチームが内容を確認します。",
    "keywords": [
      "領収書",
      "経費",
      "レシート",
      "確認",
      "仕事",
      "返金"
    ],
    "tags": [
      "expenses",
      "documents"
    ],
    "lang": "ja"
  },
  {
    "intent": "ABN収入の銀行明細のマーク",
    "question": "ABNの収入がどれか、どう示せばいいですか？",
    "examples": [
      "入金をマークする必要がありますか",
      "明細のスクリーンショットでもいいですか",
      "全部の明細が出せません",
      "ABNの入金はどう示しますか"
    ],
    "answer": "銀行明細をPDFで送って、ABNの仕事で受け取った入金に黄色などでマークしてください。PDFが出せない場合は、入金部分にマークをつけたスクリーンショットを分けて送っていただいても大丈夫です。ご自身で支払った仕事の経費は、別の色でマークしていただくと領収書と照合しやすくなります。",
    "keywords": [
      "ABN",
      "銀行明細",
      "マーク",
      "入金",
      "スクリーンショット",
      "PDF"
    ],
    "tags": [
      "abn",
      "documents"
    ],
    "lang": "ja"
  },
  {
    "intent": "所得証明書に載っていない仕事",
    "question": "送っていただいた収入に、一つの仕事が載っていません。どうすればいいですか？",
    "examples": [
      "別の雇用主の収入が出ていません",
      "ATOに反映されていない仕事があります",
      "雇用主がまだ報告していないかもしれません",
      "収入が足りない気がします"
    ],
    "answer": "こちらで確認できるのは、雇用主がこれまでにATOへ報告した内容です。載っていない仕事がある場合は、雇用主がまだ報告していない可能性があります。雇用主に直接、Income Statementが確定しているか確認してください。それまでの間、その仕事の給与明細を送っていただけますか。あとから収入が追加された場合は、申告書を開き直し、チームが再度確認してから提出します。",
    "keywords": [
      "収入",
      "雇用主",
      "報告",
      "給与明細",
      "ATO",
      "載っていない"
    ],
    "tags": [
      "income",
      "documents"
    ],
    "lang": "ja"
  },
  {
    "intent": "GSTについて",
    "question": "ABNの仕事でGSTも払う必要がありますか？",
    "examples": [
      "GSTの登録は必要ですか",
      "個人事業主です。GSTは？",
      "GSTは所得税と別ですか",
      "ABNの請求書にGSTがあります"
    ],
    "answer": "GSTは所得税の申告とは別の話です。GSTの登録が必要だったかどうかは状況によるため、チームがABNの情報とあわせて確認します。GST登録をしていなかった場合は、そのための追加手続きは必要ありません。ABNの請求書や記録を送ってください。",
    "keywords": [
      "GST",
      "ABN",
      "登録",
      "個人事業主",
      "請求書"
    ],
    "tags": [
      "abn",
      "gst"
    ],
    "lang": "ja"
  },
  {
    "intent": "請求書の通貨",
    "question": "請求書の一部にUSDと書かれています。問題ですか？",
    "examples": [
      "通貨が違う請求書があります",
      "USDになっています",
      "豪ドルではない請求書",
      "通貨の表記が不明です"
    ],
    "answer": "ありがとうございます。いくつかの請求書で通貨の表記が他と違うようです。すべて豪ドルで受け取ったもので間違いないでしょうか。別の通貨で受け取ったものがあれば、どの請求書か教えて、入金の記録も送ってください。チームが確認します。",
    "keywords": [
      "通貨",
      "USD",
      "豪ドル",
      "請求書",
      "ABN"
    ],
    "tags": [
      "abn",
      "documents"
    ],
    "lang": "ja"
  },
  {
    "intent": "employer paid back part of the cost",
    "question": "My employer reimbursed part of what I spent. Can I still claim?",
    "examples": [
      "my work covered some of it",
      "I got money back from my boss",
      "partly reimbursed expense",
      "the company paid half"
    ],
    "answer": "Only what you paid yourself and were not paid back for can be looked at. If your employer reimbursed part of it, only the unreimbursed part can be considered. Please tell me how much you spent and how much you got back, and send the receipt. The team confirms exactly what goes into the return when they review it, before anything is lodged.",
    "keywords": [
      "reimbursed",
      "employer",
      "paid back",
      "partly",
      "claim",
      "expense"
    ],
    "tags": [
      "expenses"
    ],
    "lang": "en"
  },
  {
    "intent": "item used for both work and private",
    "question": "I use some of my things for both work and personal. Can I claim them?",
    "examples": [
      "my laptop is also for personal use",
      "mixed use phone and gear",
      "I use it at work and at home",
      "half work half personal"
    ],
    "answer": "Where something is used for both, only the work part can be looked at. Please send the receipt and tell me roughly how much of the use is for work, for example in a share of the week or the hours. A fair estimate that you can explain is what the team needs. The team confirms exactly what goes into the return when they review it, before anything is lodged.",
    "keywords": [
      "both",
      "private",
      "personal",
      "work",
      "mixed",
      "share",
      "part"
    ],
    "tags": [
      "expenses"
    ],
    "lang": "en"
  },
  {
    "intent": "laundry of a work uniform with no receipts",
    "question": "Can I claim washing my work uniform if I have no receipts?",
    "examples": [
      "I wash my nursing uniforms 2 or 3 times a week, usually with my other washing",
      "Can I claim laundry? I don't have receipts for that",
      "My last advisor did clothes washing without receipts",
      "Can I claim my washing too"
    ],
    "answer": "Washing a uniform is something we can look at when the uniform is protective or specific to your job. There are no receipts for laundry, so just tell me how many times a week you washed it, roughly which months, and whether it went in with your other washing. The team works out what can go in at the review, before anything is lodged. 😊",
    "keywords": [
      "laundry",
      "washing",
      "uniform",
      "scrubs",
      "no receipts",
      "clothes"
    ],
    "tags": [
      "expenses",
      "clothing"
    ],
    "lang": "en"
  },
  {
    "intent": "phone and home internet bills for work",
    "question": "How do I claim my phone and home internet for work?",
    "examples": [
      "My phone bill came to $312 and I used it about 40% for work",
      "I used my personal phone for mandatory online training and messages with my supervisor",
      "Can I claim part of my internet at home?",
      "My provider won't let me download the bills"
    ],
    "answer": "Thanks. For a phone or internet bill only the work part can be looked at. Please send the bills for the year (a PDF or clear screenshots are fine) and tell me roughly how much of the use was for work and what it was for, like calls with your supervisor or online training. If your provider won't let you download the bills, a bank statement with the payments highlighted works too. For home internet, the team looks at it together with your working from home hours. What goes in is confirmed at the review, before anything is lodged.",
    "keywords": [
      "phone",
      "internet",
      "bill",
      "percentage",
      "work use",
      "provider"
    ],
    "tags": [
      "expenses",
      "phone"
    ],
    "lang": "en"
  },
  {
    "intent": "tools bought for the job",
    "question": "Can I claim tools I bought myself for my job?",
    "examples": [
      "I bought my own tools, things like tweezers, scissors and shields",
      "I bought some tools when I first came over but it was with cash so I have nothing for it",
      "He needs to claim on tools etc, could you help with that too?",
      "Safety clothes and my own tools were a necessity on the job site"
    ],
    "answer": "Yes, we can look at tools you bought yourself for your job, as long as your employer didn't pay you back. Send a receipt, or a bank statement with the payment highlighted, and a short note on what each item is and how you used it at work. If you have no proof for some small items, send a list with roughly when you bought them. The team confirms what goes in at the review. 😊",
    "keywords": [
      "tools",
      "equipment",
      "bought",
      "own tools",
      "cash",
      "work gear"
    ],
    "tags": [
      "expenses",
      "tools"
    ],
    "lang": "en"
  },
  {
    "intent": "course needed to get the job or to move into other work",
    "question": "I did the course to get the job, or to improve my skills. Can I claim it?",
    "examples": [
      "I needed the tickets to get the job",
      "I also had to do courses to get a job in construction",
      "No, I had the job, they asked me to do the course",
      "To improve my skills and do other jobs onsite"
    ],
    "answer": "Thanks for explaining. Courses and tickets are looked at when you were already working in that job and the course relates directly to it. If you needed it to get the job, or it was to train for different work, the team looks at the details first. Were you already in the role when you did it, and did your employer pay you back? Send the receipt, or a bank statement with the payment highlighted. The team confirms what goes in at the review.",
    "keywords": [
      "course",
      "ticket",
      "to get the job",
      "training",
      "skills",
      "licence",
      "white card"
    ],
    "tags": [
      "expenses",
      "courses"
    ],
    "lang": "en"
  },
  {
    "intent": "travel to a second job, airport rides and Ubers for work",
    "question": "Can I claim Ubers or travel to a second job or to the airport for work?",
    "examples": [
      "Ubers to and from the airport to fly into and out of site and get home",
      "Had work safety clothes and boots, and also Ubers?",
      "I drive to my mine site instead of flying",
      "I don't have receipts, I only have bank screenshots for travel"
    ],
    "answer": "Travel from home to your usual workplace generally can't be claimed, including Ubers, buses and trains. Travel between two jobs on the same day, or between work sites during working hours, is something we look at. For each trip, tell me the date, where from and to, and why it was needed for work, and send the Uber receipts or a bank statement with the trips highlighted. If you drove your own car between sites, we would ask for a logbook instead. The team confirms what goes in at the review.",
    "keywords": [
      "uber",
      "taxi",
      "airport",
      "second job",
      "fly in fly out",
      "travel",
      "trips",
      "commute"
    ],
    "tags": [
      "expenses",
      "travel"
    ],
    "lang": "en"
  },
  {
    "intent": "no fuel receipts for driving",
    "question": "I didn't keep my petrol receipts. Can I still claim for driving?",
    "examples": [
      "Unfortunately not, I should have kept petrol receipts but I didn't",
      "If I had no receipts for fuel but did DoorDash, can I claim anything?",
      "I also have gas station receipts, do I need them?",
      "Drive in, drive out, so I drive to my mine site"
    ],
    "answer": "Fuel receipts aren't the main thing. For work trips in your own car we use kilometres: trips between work sites during working hours, written in a logbook (date, from, to, purpose, km) covering up to 5,000 km, at 88 cents per km. A screenshot of your notes app is fine. For delivery apps, send the app's yearly kilometre report and your earnings summary. Driving from home to your usual workplace can't go in. The team confirms what goes in at the review.",
    "keywords": [
      "fuel",
      "petrol",
      "receipts",
      "logbook",
      "kilometres",
      "doordash",
      "car"
    ],
    "tags": [
      "expenses",
      "car"
    ],
    "lang": "en"
  },
  {
    "intent": "can I claim the fee I paid an accountant or you",
    "question": "Can I claim the fee I paid for an accountant or for your service?",
    "examples": [
      "Can I claim the fee I paid for an accountant last year?",
      "Is the fee that I paid for this service tax deductible?",
      "I paid $169 for my previous tax return, can that go in?",
      "Can I deduct what I paid for my last tax return?"
    ],
    "answer": "A fee for having a tax return prepared can be claimed in the year you paid it, not the year the return is for. So a fee you paid before 1 July 2026 belongs in the 2025-26 return, and our fee, paid on or after 1 July 2026, belongs in next year's return. Keep our invoice. If you paid an accountant earlier, send me the invoice and the date you paid it and the team checks which year it falls in.",
    "keywords": [
      "accountant fee",
      "tax agent fee",
      "deductible",
      "previous tax return",
      "invoice",
      "claim fee"
    ],
    "tags": [
      "expenses",
      "fee"
    ],
    "lang": "en"
  },
  {
    "intent": "why do you ask for a note on each receipt",
    "question": "Why do you need a note about every receipt? Do I have to explain each one?",
    "examples": [
      "Here is how each item is directly related to my role",
      "I needed the tickets to get the job",
      "Do I need to explain every invoice?",
      "I don't have proof of payment for the rent"
    ],
    "answer": "Good question. For something to go in as a work expense, you need to have paid it yourself with no reimbursement, and it has to relate directly to earning your income. A short note for each item (what it is and why you needed it for the job) helps the team see that, together with the receipt or a bank statement showing the payment. Without proof of payment it is hard to include something, so send whatever you have. The team confirms what goes in at the review. 😊",
    "keywords": [
      "explain",
      "each receipt",
      "note",
      "why",
      "proof of payment",
      "directly related"
    ],
    "tags": [
      "expenses",
      "documents"
    ],
    "lang": "en"
  },
  {
    "intent": "work expenses section on the form for TFN only or ABN too",
    "question": "Is the work expenses section in the form only for my TFN jobs, or for ABN too?",
    "examples": [
      "Does work related expenses only refer to TFN?",
      "Where do I upload my Uber expenses?",
      "Should my ABN receipts go in the work related expenses upload?",
      "The form asks for receipts, is that for my ABN?"
    ],
    "answer": "That section of the form is for expenses from your employee jobs on a TFN. For ABN work, send your ABN income and expenses here in the chat after you've submitted the form: your app reports, invoices and receipts, and I'll make sure the team has them. 😊",
    "keywords": [
      "work related expenses",
      "form",
      "ABN receipts",
      "upload",
      "TFN only",
      "uber expenses"
    ],
    "tags": [
      "expenses",
      "form",
      "abn"
    ],
    "lang": "en"
  },
  {
    "intent": "laptop or equipment bought for work",
    "question": "Can I claim a laptop or other equipment I bought for work?",
    "examples": [
      "Laptop bought for office work",
      "I have many expenses with being a teacher, like phone bill, laptop, bag and clothing",
      "I bought a phone and rented a car for work, can these be included?",
      "I have invoices for work items, what else can be deducted?"
    ],
    "answer": "We can look at a laptop or other equipment if you bought it yourself and used it for your job. If you also used it privately, only the work part counts, so tell me roughly how it was used and send the receipt with the date you bought it. The team confirms what goes in at the review, before anything is lodged.",
    "keywords": [
      "laptop",
      "computer",
      "equipment",
      "bag",
      "bought for work",
      "invoice"
    ],
    "tags": [
      "expenses",
      "equipment"
    ],
    "lang": "en"
  },
  {
    "intent": "work subscriptions, memberships and registrations",
    "question": "Can I claim work subscriptions, apps or memberships?",
    "examples": [
      "Teaching resource site subscription $114.91",
      "Subscriptions such as gym and a work related course",
      "Teacher registration $95",
      "Union fees $637"
    ],
    "answer": "Subscriptions and memberships can be looked at when they were directly for your job, like a union, a professional registration or a resource site you use in your work. Personal ones, like a gym, are usually private costs unless they are directly part of your job. Send the invoice or a bank statement line for each one and a short note on how you used it. The team confirms what goes in at the review.",
    "keywords": [
      "subscription",
      "membership",
      "registration",
      "union",
      "gym",
      "teacher",
      "app"
    ],
    "tags": [
      "expenses",
      "subscriptions"
    ],
    "lang": "en"
  },
  {
    "intent": "rent or a room paid while working away",
    "question": "Can I claim rent or a room I paid for while working away?",
    "examples": [
      "And renting of the room $200 per week",
      "I don't have a rental agreement or proof of payment for the room",
      "Plus $200 a week for 11 weeks for the room, but I have no invoice or papers",
      "I have rent payment screenshots for a few months"
    ],
    "answer": "Everyday living costs like rent are usually private, so I can't promise anything on that. If the room was needed for work, for example because you had to stay near a remote site, tell me where, for how long and why, and send any proof of payment, like bank lines. The team looks at it at the review and tells you what can go in.",
    "keywords": [
      "rent",
      "room",
      "accommodation",
      "remote site",
      "living costs",
      "proof of payment"
    ],
    "tags": [
      "expenses",
      "accommodation"
    ],
    "lang": "en"
  },
  {
    "intent": "how to record working from home hours",
    "question": "How do I record my working from home hours?",
    "examples": [
      "I worked from home two days a week",
      "How many hours do I need to record?",
      "I'm a teacher, my last accountant did something for working from home",
      "Here is my working from home days PDF"
    ],
    "answer": "Keep it simple: a list with the date, start and finish time, and what you worked on each day. A spreadsheet, PDF or photo of your notes is fine, and a calendar or timesheet screenshot can back it up. If some of it is an estimate, tell me so, and the team checks it with you at the review. Send it here whenever it is ready. 😊",
    "keywords": [
      "working from home",
      "wfh",
      "hours",
      "diary",
      "log",
      "timesheet"
    ],
    "tags": [
      "expenses",
      "wfh"
    ],
    "lang": "en"
  },
  {
    "intent": "cash job to declare",
    "question": "I was paid cash for a small job. Do I declare it?",
    "examples": [
      "If I got paid cash for an odd job, when do I declare this?",
      "I worked a cash job for a few days doing landscaping and was paid about $600, which I deposited into my bank account",
      "I did some odd jobs that were paid in cash",
      "Do I need to put cash work in my return?"
    ],
    "answer": "Thanks for telling me. Income you were paid for work in Australia is income to declare, including cash. Send me roughly how much you were paid, which month and what the job was, and the team checks how it goes into your return before you sign. Nothing for you to work out yourself. 😊",
    "keywords": [
      "cash",
      "odd job",
      "undeclared",
      "declare",
      "paid in cash",
      "side job"
    ],
    "tags": [
      "income",
      "cash"
    ],
    "lang": "en"
  },
  {
    "intent": "do I need to do anything on the ATO or myGov",
    "question": "Do I need to do anything on the ATO website or myGov?",
    "examples": [
      "So I don't need to do anything on the ATO website?",
      "Can you lodge my tax return without me logging into myGov?",
      "Do I need to link the ATO to myGov before we start?"
    ],
    "answer": "No, there is nothing for you to do on the ATO website or in myGov. We deal with the ATO directly and lodge your return after you've signed, so you don't need to link anything or share a login. The only exception is a Medicare Entitlement Statement, which is done with Services Australia, and I'll guide you if it applies to you. 😊",
    "keywords": [
      "ATO website",
      "myGov",
      "link",
      "login",
      "nothing to do",
      "lodge directly"
    ],
    "tags": [
      "ato",
      "mygov"
    ],
    "lang": "en"
  },
  {
    "intent": "late lodgement penalty after 31 October",
    "question": "Will I get a late penalty if the return is lodged after 31 October?",
    "examples": [
      "Would I still get the late penalty fee if it was processed by you?",
      "It's already after 31 October, do I need to pay a fine as well?",
      "I need you to do my tax return, is that too late?",
      "Is there any penalty for these two financial years?"
    ],
    "answer": "It's not too late, we can still lodge it for you, and the sooner we start the better. Whether the ATO applies anything in your case is decided by the ATO and depends on your situation, so I can't say either way. It is part of the review, which starts once you've paid and sent the form. 😊",
    "keywords": [
      "penalty",
      "late",
      "fine",
      "31 October",
      "deadline",
      "too late"
    ],
    "tags": [
      "deadline",
      "lodgement"
    ],
    "lang": "en"
  },
  {
    "intent": "years never lodged and worried about penalties",
    "question": "I never lodged my earlier years. Can you help, and what about penalties?",
    "examples": [
      "I don't remember whether I lodged my tax returns in the previous two years",
      "I never filed a return because I forgot",
      "I stayed six months from February 2023, is there an additional fee for that year?",
      "I think the ATO might say I owe penalties for the years I didn't lodge"
    ],
    "answer": "Yes, we can help with years that were never lodged, on any visa and from anywhere. Each tax year is its own return with its own fee: $220 for TFN only, or $385 for a year with ABN income. Which tax years did you work in Australia, and was it TFN only or also an ABN? Anything about late lodgement is part of the review of your case, so I cannot predict it either way. 😊",
    "keywords": [
      "never lodged",
      "previous years",
      "back years",
      "penalties",
      "each year",
      "forgot"
    ],
    "tags": [
      "lodgement",
      "multiple years"
    ],
    "lang": "en"
  },
  {
    "intent": "does the refund include my superannuation",
    "question": "Does my refund include my superannuation?",
    "examples": [
      "What does this refund include? Also my paid in superannuation?",
      "I have super, I had hoped to keep it there as I'm hoping to return",
      "Do you also handle the super withdrawal after the tax return, or is that a separate fee?",
      "Can you do my superannuation as well?"
    ],
    "answer": "The refund we talk about here is your income tax refund only. Your superannuation is separate and is not part of it. Our superannuation (DASP) service isn't available at the moment, but we're happy to take care of your tax return. 😊",
    "keywords": [
      "super",
      "superannuation",
      "DASP",
      "refund include",
      "withdrawal"
    ],
    "tags": [
      "super"
    ],
    "lang": "en"
  },
  {
    "intent": "how to read the estimate",
    "question": "Can you explain the numbers in my estimate?",
    "examples": [
      "I am only getting 68 dollars back? This does not make sense, last year I got 700 back",
      "Why is it so little when I only worked half a year?",
      "That income must be a mistake, I was paid 40 dollars an hour, where did you get that from?",
      "Does your refund guarantee mean you will refund me the difference?"
    ],
    "answer": "Of course. The estimate starts from the income and tax already withheld that your employers reported to the ATO, then adds what we can include, like work expenses, and shows the result for the year. It depends on your own income, tax withheld and situation, so it can differ from other years or from friends. Tell me which line looks off. If something is missing or wrong (a job, hours, an expense), send it here and the team checks it before anything is lodged. You only sign once you're happy. 😊",
    "keywords": [
      "estimate",
      "explain",
      "numbers",
      "low",
      "income statement",
      "breakdown"
    ],
    "tags": [
      "estimate"
    ],
    "lang": "en"
  },
  {
    "intent": "side income that started after the tax year ended",
    "question": "I only just started Uber or ABN work. Does it go in this return?",
    "examples": [
      "TFN only, since I only started Uber Eats last week",
      "I do have an ABN, I started Uber Eats but only a few weeks before the tax year ended",
      "My ABN is brand new, I started this month",
      "I only began delivery work after my job finished"
    ],
    "answer": "The return we're preparing covers 1 July 2025 to 30 June 2026. Work you started after 30 June belongs in next year's return. If you earned ABN income before 30 June, even a little, it goes in this one. When did your last TFN job finish, and did you earn anything on the ABN before 1 July? Then I can tell you which option fits.",
    "keywords": [
      "just started",
      "new ABN",
      "uber eats",
      "after 30 June",
      "this week",
      "tax year"
    ],
    "tags": [
      "abn",
      "tax year"
    ],
    "lang": "en"
  },
  {
    "intent": "one of my jobs is not showing or the income looks wrong",
    "question": "One of my jobs isn't showing, or the income looks wrong. What do I do?",
    "examples": [
      "Can you confirm my farm income and the tax withheld have been included? I can send my payslips",
      "I don't have payslips or invoices for all of my ABN work",
      "That income must be a mistake, I didn't work a full 12 months",
      "One of my employers is missing from my income statement"
    ],
    "answer": "Thanks for flagging it. We start from what your employers reported to the ATO, and sometimes an employer's figures are missing or late. Please send your payslips or a payment summary for that job, with the employer's name and roughly the dates you worked there. The team matches it up and checks it before anything is lodged. If you had several jobs, tell me how many so we can tick each one off. 😊",
    "keywords": [
      "missing employer",
      "payslip",
      "income statement",
      "wrong income",
      "farm",
      "withheld"
    ],
    "tags": [
      "income",
      "documents"
    ],
    "lang": "en"
  },
  {
    "intent": "relationship status on the form when not married",
    "question": "I wasn't married while in Australia. Can I choose single on the form?",
    "examples": [
      "I was not married when I was in Australia, we had the same job, so can I just continue as single?",
      "We are not married but live together, which option do I choose?",
      "My boyfriend and I are a couple, single or married?",
      "Brilliant, I had no partner"
    ],
    "answer": "Thanks for asking. Answer the form with the situation you had during the year. If you're not sure, tell me the facts here, for example whether you were living together as a couple at the time, and I'll pass it on. The team confirms the right option at the review, before anything is lodged, so you don't need to work it out yourself. 😊",
    "keywords": [
      "single",
      "married",
      "partner",
      "de facto",
      "relationship",
      "couple"
    ],
    "tags": [
      "form",
      "partner"
    ],
    "lang": "en"
  },
  {
    "intent": "which address to put on the form",
    "question": "Which address do I put on the form if I've left Australia or had several addresses?",
    "examples": [
      "Since I've left Australia, which address should I give, my current one in Germany or my last one in Australia?",
      "I'm not sure about the address because I had more than one address this year",
      "Do I give the address on my TFN letter or where I worked?",
      "I don't have an Australian address anymore"
    ],
    "answer": "Use the last address you lived at in Australia, even if you've moved on since. If you had several, pick the most recent one. It doesn't have to match every workplace, and the team checks it at the review, so your best answer is fine. 😊",
    "keywords": [
      "address",
      "moved",
      "several addresses",
      "TFN letter",
      "last address",
      "form"
    ],
    "tags": [
      "form",
      "address"
    ],
    "lang": "en"
  },
  {
    "intent": "can I see the return before I pay",
    "question": "Can I see the return before I pay?",
    "examples": [
      "Is there any way to check what the return is first before paying and deciding to proceed?",
      "I'd like you to prepare and lodge it first, then I pay",
      "Do I get to review the return before it is officially lodged?",
      "Can you give me an estimate before I pay?"
    ],
    "answer": "I understand wanting to see it first. The review is the main work, so it starts once the fee is paid, and I can't give a figure before then. What you do get: the team sends you the estimate here, you can ask anything about it, and nothing is lodged until you've signed. 😊",
    "keywords": [
      "see the return",
      "before paying",
      "preview",
      "draft",
      "review first",
      "estimate"
    ],
    "tags": [
      "sales",
      "trust"
    ],
    "lang": "en"
  },
  {
    "intent": "why pay upfront, is this a scam",
    "question": "Why do I have to pay upfront? Can you verify it's not a scam?",
    "examples": [
      "Why do I have to pay upfront?",
      "Can you send the payment link, and can you verify it is not a scam?",
      "Never heard of this before, pay upfront?",
      "The replies made the company look like a scam"
    ],
    "answer": "Totally fair to check. The fee is paid first because the review of your situation is the work itself, and it is the same for everyone. We operate under the supervision of a registered tax agent, and every return is reviewed and signed off by a registered tax agent before it is lodged with the ATO. The agent details are in our client agreement: https://workingholidaytax.com.au/client-agreement. Your refund is paid by the ATO straight into your own Australian bank account, never through us, and nothing is lodged until you've signed. Happy to answer anything else before you decide. 😊",
    "keywords": [
      "scam",
      "upfront",
      "verify",
      "trust",
      "pay first",
      "safe"
    ],
    "tags": [
      "trust",
      "payment"
    ],
    "lang": "en"
  },
  {
    "intent": "are you a registered tax agent or on the TPB register",
    "question": "Are you registered tax agents? Are you on the TPB register?",
    "examples": [
      "Are you in the TPB register?",
      "Could you confirm your registered tax agent's name and TPB registration number?",
      "Are you guys registered tax agents?",
      "Please send an invoice with your business name, ABN and TPB registration number"
    ],
    "answer": "We operate under the supervision of a registered tax agent, and every return is reviewed and signed off by a registered tax agent before it is lodged with the ATO. You can find the agent details and registration in our client agreement: https://workingholidaytax.com.au/client-agreement. We send a tax invoice once your payment comes through. 😊",
    "keywords": [
      "TPB",
      "registered tax agent",
      "register",
      "agent name",
      "registration number",
      "supervision"
    ],
    "tags": [
      "trust",
      "agent"
    ],
    "lang": "en"
  },
  {
    "intent": "what is the password to open the signing document",
    "question": "What is the password to open the document to sign?",
    "examples": [
      "What is the password?",
      "It asks me for a password",
      "Password for the signing link",
      "The document to sign asks me to log in"
    ],
    "answer": "Xero may have created an account for the document you sign. Try the password 123456789. If it does not open, tap Forgot password on the login page and reset it by email, or send me a screenshot of what you see.",
    "keywords": [
      "password",
      "sign",
      "signing link",
      "document",
      "log in",
      "123456789"
    ],
    "tags": [
      "signature"
    ],
    "lang": "en"
  },
  {
    "intent": "the email with the document to sign has not arrived",
    "question": "I haven't got the email with the document to sign",
    "examples": [
      "I still have not got any email, can you please send it",
      "I didn't receive an email, what email address did you use?",
      "I didn't get an email",
      "I haven't gotten an email with an update"
    ],
    "answer": "No problem. Please check your spam or junk folder first, as the email can land there. If it isn't there, tell me which email address you'd like it at and I'll ask the team to send it again. Once you've signed, we lodge your return.",
    "keywords": [
      "email",
      "not received",
      "spam",
      "junk",
      "sign",
      "resend"
    ],
    "tags": [
      "signature",
      "email"
    ],
    "lang": "en"
  },
  {
    "intent": "I submitted the form but you did not receive it",
    "question": "Did you get the form I filled in?",
    "examples": [
      "Did you receive the form I filled in a few days ago?",
      "I filled in a form online, you didn't send it through this chat",
      "I got a form by email from a travel company that referred me to you, that's the one I filled in",
      "It's been submitted, did it arrive?"
    ],
    "answer": "Thanks for telling me. Please send me the full name and the email address you used in the form, and the team will match it to this chat. If you haven't paid yet, the form we work with is sent right after payment, so the next step is the fee and I can send the details. 😊",
    "keywords": [
      "form received",
      "submitted",
      "did you get",
      "filled in",
      "match",
      "email used"
    ],
    "tags": [
      "form"
    ],
    "lang": "en"
  },
  {
    "intent": "form link needs sending again",
    "question": "Can you send the form link again? It says it appears after payment",
    "examples": [
      "I'm going to fill the form in again and it says it will appear after payment, can it be sent over again?",
      "If I could please be sent the form",
      "Could you send that link again?",
      "I can't open the questionnaire"
    ],
    "answer": "Of course, I'll send it again here. If it still doesn't open or says it appears after payment, tell me what you see on the screen and I'll sort it out with the team. If you've already paid, there is no need to pay again. 😊",
    "keywords": [
      "form link",
      "resend",
      "questionnaire",
      "after payment",
      "cannot open",
      "again"
    ],
    "tags": [
      "form"
    ],
    "lang": "en"
  },
  {
    "intent": "I have paid, please send the form",
    "question": "I've paid, can you send me the form?",
    "examples": [
      "I've just completed the payment, could you let me know the next steps?",
      "I've attached my payment confirmation, what now?",
      "My banking app says the transfer completed, would you mind checking?",
      "I just sent the money with Wise, it should arrive on Friday"
    ],
    "answer": "Thanks! As soon as the payment shows in our account I'll send your form straight away. If you haven't yet, please send a screenshot of the bank or card receipt showing the payment is completed (an invoice screenshot isn't enough on its own). International transfers can take a few days to land. 😊",
    "keywords": [
      "paid",
      "payment done",
      "send the form",
      "receipt",
      "next steps",
      "wise"
    ],
    "tags": [
      "payment",
      "form"
    ],
    "lang": "en"
  },
  {
    "intent": "cannot send the selfie with the passport right now",
    "question": "I can't send the selfie with my passport right now. Can I send something else?",
    "examples": [
      "I'm just missing the selfie with the passport because I'm at the mine site, can I upload just the passport for now?",
      "I can't find my passport right now so I can't send a selfie, is a second form of ID okay?",
      "I've submitted a picture of my passport, I can send one of me with it when I'm home",
      "My passport is lost"
    ],
    "answer": "No problem. Send the passport photo page now, and the photo of you holding your passport as soon as you can, so your file keeps moving. If your passport is lost or you can't get to it, tell me and the team will check what else could work. We need it for the identity check before lodging. 😊",
    "keywords": [
      "selfie",
      "passport",
      "second ID",
      "lost passport",
      "identity check",
      "photo page"
    ],
    "tags": [
      "documents",
      "passport"
    ],
    "lang": "en"
  },
  {
    "intent": "customer says they have signed the return (German)",
    "question": "Ich habe unterschrieben, wie geht es jetzt weiter?",
    "examples": [
      "Ich habe unterschrieben",
      "Unterschrift ist erledigt",
      "Dokument unterschrieben, und jetzt?",
      "Ich bin fertig mit dem Unterschreiben"
    ],
    "answer": "Danke, ich habe es gesehen. Unser Team macht jetzt die letzte Prüfung und reicht deine Steuererklärung beim ATO ein. Sobald sie eingereicht ist, schreibe ich dir hier.",
    "keywords": [
      "signed",
      "signature",
      "sign",
      "lodged",
      "next",
      "done",
      "unterschrieben",
      "unterschrift",
      "erledigt",
      "eingereicht"
    ],
    "tags": [
      "signature",
      "lodgement"
    ],
    "lang": "de"
  },
  {
    "intent": "customer says they have signed the return (Japanese)",
    "question": "署名しました、このあとどうなりますか？",
    "examples": [
      "署名しました",
      "サイン完了しました",
      "書類への署名が終わりました",
      "署名できました、次は何をしますか"
    ],
    "answer": "ありがとうございます、確認しました。このあとチームが最終チェックを行い、タックスリターンをATOに提出します。提出が完了しましたら、こちらでお知らせします。",
    "keywords": [
      "signed",
      "signature",
      "sign",
      "lodged",
      "next",
      "done",
      "署名",
      "サイン",
      "提出",
      "完了"
    ],
    "tags": [
      "signature",
      "lodgement"
    ],
    "lang": "ja"
  },
  {
    "intent": "which name is on the bank account to pay (German)",
    "question": "Auf welchen Namen überweise ich, stimmt der Kontoname?",
    "examples": [
      "Wie ist der Account Name?",
      "Auf welchen Namen soll ich überweisen?",
      "Was soll ich als Empfänger eintragen?",
      "Der Name passt nicht, wer bekommt mein Geld?"
    ],
    "answer": "Der Kontoname ist The Accounting Academy, BSB 062692, Kontonummer 81049952. Manche Banken zeigen beim ersten Mal an einen neuen Empfänger eine Warnung an, das ist normal. Wenn dir ein anderer Name angezeigt wird, schick mir einen Screenshot, dann klären wir das gemeinsam.",
    "keywords": [
      "account",
      "name",
      "payee",
      "bsb",
      "accounting",
      "academy",
      "match",
      "kontoname",
      "empfänger",
      "überweisen",
      "konto",
      "name"
    ],
    "tags": [
      "payment"
    ],
    "lang": "de"
  },
  {
    "intent": "which name is on the bank account to pay (Japanese)",
    "question": "振込先の口座名義は何ですか？表示される名義は合っていますか？",
    "examples": [
      "口座名義を教えてください",
      "口座名義は何にしたらいいですか？",
      "名義が一致しません",
      "誰に支払うことになりますか"
    ],
    "answer": "口座名義は The Accounting Academy です。BSB 062692、口座番号 81049952 です。初めての送金先では、銀行が警告を表示することがありますが、これは通常の動作です。表示された名義が違う場合は、スクリーンショットを送ってください。こちらで一緒に確認します。",
    "keywords": [
      "account",
      "name",
      "payee",
      "bsb",
      "accounting",
      "academy",
      "match",
      "口座名義",
      "名義",
      "振込先",
      "受取人"
    ],
    "tags": [
      "payment"
    ],
    "lang": "ja"
  },
  {
    "intent": "customer paid less than the fee (German)",
    "question": "Ich habe weniger als die Gebühr bezahlt, reicht das?",
    "examples": [
      "Ich habe nur 200 statt 220 überwiesen",
      "Ich habe nur einen Teil bezahlt",
      "Ist ein kleinerer Betrag auch okay?",
      "Ich habe etwas weniger gezahlt"
    ],
    "answer": "Danke für die Überweisung. Die Gebühr für deine Option ist der volle genannte Betrag, deshalb muss der Rest noch bezahlt werden, bevor wir anfangen können. Ich schicke dir gern die Bankdaten noch einmal. Sobald der volle Betrag angekommen ist, schick mir den Screenshot, dann legen wir los.",
    "keywords": [
      "paid",
      "less",
      "partial",
      "amount",
      "fee",
      "short",
      "instalment",
      "bezahlt",
      "weniger",
      "teil",
      "betrag",
      "gebühr",
      "überwiesen"
    ],
    "tags": [
      "payment"
    ],
    "lang": "de"
  },
  {
    "intent": "customer paid less than the fee (Japanese)",
    "question": "料金より少ない金額を振り込んでしまいました、大丈夫ですか？",
    "examples": [
      "220ドルのところ200ドルを送ってしまいました",
      "一部だけ支払いました",
      "少なめの金額でも大丈夫ですか",
      "少し足りない金額を振り込みました"
    ],
    "answer": "お振込みありがとうございます。料金はお伝えした金額の全額です。残りのお支払いを確認でき次第、作業を始めます。ご希望でしたら、振込先をもう一度お送りします。",
    "keywords": [
      "paid",
      "less",
      "partial",
      "amount",
      "fee",
      "short",
      "instalment",
      "少ない",
      "一部",
      "金額",
      "料金",
      "不足"
    ],
    "tags": [
      "payment"
    ],
    "lang": "ja"
  },
  {
    "intent": "which documents to send after the form (German)",
    "question": "Welche Unterlagen soll ich nach dem Formular schicken?",
    "examples": [
      "Welche Unterlagen braucht ihr noch von mir?",
      "Braucht ihr meinen Reisepass?",
      "Was muss ich nachreichen?",
      "Was soll ich euch noch schicken?"
    ],
    "answer": "Nach dem Formular sind diese Unterlagen hilfreich: ein gut lesbares Foto der Passseite mit dem Foto, ein Kontoauszug von dem Konto, auf das die Rückerstattung gehen würde (falls du eines hast), Belege oder Kontoauszugszeilen für berufliche Ausgaben, die wir berücksichtigen sollen, und bei ABN Arbeit deine Rechnungen. Nicht jeder braucht alles. Schick einfach, was auf dich zutrifft, und unser Team sagt dir, falls noch etwas fehlt.",
    "keywords": [
      "documents",
      "passport",
      "bank",
      "statement",
      "receipts",
      "invoices",
      "send",
      "need",
      "unterlagen",
      "reisepass",
      "kontoauszug",
      "belege",
      "rechnungen",
      "nachreichen"
    ],
    "tags": [
      "documents",
      "paperwork"
    ],
    "lang": "de"
  },
  {
    "intent": "which documents to send after the form (Japanese)",
    "question": "フォームのあとに、どんな書類を送ればいいですか？",
    "examples": [
      "他に必要な書類はありますか？",
      "パスポートは必要ですか",
      "後から書類を送ってもいいですか",
      "何を送ればいいですか"
    ],
    "answer": "フォームのあとに送っていただくと役立つものは次のとおりです。パスポートの顔写真ページの鮮明な写真、還付金の振込先となる口座がある場合はその銀行明細、経費として確認してほしいものがあれば領収書または銀行明細の該当行、ABNでのお仕事がある場合は請求書です。すべてが必要な方ばかりではありませんので、当てはまるものをお送りください。不足があれば、チームからお知らせします。",
    "keywords": [
      "documents",
      "passport",
      "bank",
      "statement",
      "receipts",
      "invoices",
      "send",
      "need",
      "書類",
      "パスポート",
      "銀行明細",
      "領収書",
      "請求書"
    ],
    "tags": [
      "documents",
      "paperwork"
    ],
    "lang": "ja"
  },
  {
    "intent": "stay spans two financial years (German)",
    "question": "Ich war über zwei Steuerjahre in Australien, brauche ich zwei Steuererklärungen?",
    "examples": [
      "Mein Aufenthalt geht über zwei Steuerjahre",
      "Ich habe in zwei Finanzjahren gearbeitet",
      "Muss ich zweimal einreichen?",
      "Ich war über den 30. Juni hinaus dort"
    ],
    "answer": "Das Steuerjahr läuft vom 1. Juli bis zum 30. Juni. Wenn du vor und nach dem 30. Juni gearbeitet hast, ist jedes Steuerjahr eine eigene Steuererklärung mit eigener Gebühr. Sag mir ungefähr, wann du gearbeitet hast und ob nur mit TFN oder auch mit ABN, dann erkläre ich dir, was für dich gilt.",
    "keywords": [
      "two",
      "years",
      "financial",
      "30 june",
      "twice",
      "each",
      "return",
      "steuerjahr",
      "finanzjahr",
      "zweimal",
      "zwei",
      "juni"
    ],
    "tags": [
      "years",
      "pricing"
    ],
    "lang": "de"
  },
  {
    "intent": "stay spans two financial years (Japanese)",
    "question": "2つの税務年度にまたがって滞在していました、タックスリターンは2回必要ですか？",
    "examples": [
      "滞在が2つの年度にまたがっています",
      "2年度分働きました",
      "2回申告が必要ですか",
      "6月30日をまたいで働いていました"
    ],
    "answer": "税務年度は7月1日から6月30日までです。6月30日をまたいで働いていた場合は、それぞれの年度が別のタックスリターンになり、料金も年度ごとにかかります。おおよその勤務期間と、TFNのみか、ABNでの収入もあったかを教えていただければ、該当する内容をご説明します。",
    "keywords": [
      "two",
      "years",
      "financial",
      "30 june",
      "twice",
      "each",
      "return",
      "年度",
      "2回",
      "6月30日",
      "2年"
    ],
    "tags": [
      "years",
      "pricing"
    ],
    "lang": "ja"
  },
  {
    "intent": "customer cannot log in to online banking or has no Australian bank account (German)",
    "question": "Ich komme nicht in mein australisches Online Banking oder habe das Konto geschlossen, was tun?",
    "examples": [
      "Ich habe mein australisches Konto geschlossen",
      "Ich komme nicht mehr auf mein australisches Konto",
      "Kein australisches Konto mehr",
      "Ich kann nicht von meinem Konto bezahlen"
    ],
    "answer": "Kein Problem. Du kannst uns per Banküberweisung von jeder Bank bezahlen, auch von einem Konto im Ausland, oder wir schicken dir einen Link zur Kartenzahlung, falls das einfacher ist. Sag mir einfach, was dir lieber ist. Für die Rückerstattung selbst sagt dir unser Team, welche Angaben nötig sind, sobald die Steuererklärung vorbereitet ist.",
    "keywords": [
      "bank",
      "account",
      "login",
      "closed",
      "overseas",
      "card",
      "link",
      "pay",
      "konto",
      "geschlossen",
      "ausland",
      "karte",
      "zahlungslink",
      "online banking"
    ],
    "tags": [
      "payment",
      "bank"
    ],
    "lang": "de"
  },
  {
    "intent": "customer cannot log in to online banking or has no Australian bank account (Japanese)",
    "question": "オーストラリアの銀行にログインできない、または口座を閉鎖しました、どうすればいいですか？",
    "examples": [
      "オーストラリアの口座を閉鎖しました",
      "オーストラリアの銀行口座にログインできません",
      "もうオーストラリアの口座がありません",
      "自分の口座から支払えません"
    ],
    "answer": "問題ありません。お支払いは、海外の口座を含め、どの銀行からでも銀行振込でお受けできます。ご希望でしたら、カード払い用のリンクをお送りすることもできます。どちらがよいか教えてください。還付金の受け取りについては、タックスリターンの準備ができた段階で、必要な情報をチームからお伝えします。",
    "keywords": [
      "bank",
      "account",
      "login",
      "closed",
      "overseas",
      "card",
      "link",
      "pay",
      "口座",
      "閉鎖",
      "海外",
      "銀行",
      "カード"
    ],
    "tags": [
      "payment",
      "bank"
    ],
    "lang": "ja"
  },
  {
    "intent": "when will the team reply (German)",
    "question": "Wann seid ihr erreichbar und wann bekomme ich eine Antwort?",
    "examples": [
      "Wann kann ich euch erreichen?",
      "Wie sind eure Zeiten?",
      "Wann bekomme ich eine Antwort?",
      "Antwortet ihr auch am Wochenende?"
    ],
    "answer": "Dieser WhatsApp Chat ist der beste Weg, uns zu erreichen. Unser Team antwortet normalerweise innerhalb eines Werktags. Wenn es eilig ist, sag mir Bescheid, dann gebe ich es mit diesem Hinweis weiter.",
    "keywords": [
      "hours",
      "reply",
      "when",
      "available",
      "open",
      "weekend",
      "wait",
      "erreichen",
      "antwort",
      "zeiten",
      "wochenende",
      "erreichbar"
    ],
    "tags": [
      "service"
    ],
    "lang": "de"
  },
  {
    "intent": "when will the team reply (Japanese)",
    "question": "何時ごろ対応してもらえますか？返信はいつ頃になりますか？",
    "examples": [
      "返信はいつ頃になりますか？",
      "営業時間を教えてください",
      "土日も返信はありますか",
      "いつ連絡が取れますか"
    ],
    "answer": "こちらのWhatsAppが一番確実な連絡方法です。チームは通常1営業日以内にご返信します。お急ぎの場合はお知らせください。その旨を添えて担当者に伝えます。",
    "keywords": [
      "hours",
      "reply",
      "when",
      "available",
      "open",
      "weekend",
      "wait",
      "返信",
      "営業時間",
      "連絡",
      "土日"
    ],
    "tags": [
      "service"
    ],
    "lang": "ja"
  },
  {
    "intent": "ABN income was in an earlier tax year (German)",
    "question": "Meine ABN Arbeit war im letzten Jahr, gilt trotzdem der ABN Preis?",
    "examples": [
      "Ich hatte die ABN im Vorjahr",
      "ABN im letzten Finanzjahr",
      "Die Rechnungen sind von vor dem 1. Juli"
    ],
    "answer": "Die Gebühr hängt davon ab, welche Einkünfte die Steuererklärung umfasst. Jedes Steuerjahr ist eine eigene Steuererklärung: Die ABN Gebühr gilt für ein Jahr mit ABN Einkommen, die TFN Gebühr für ein Jahr nur mit Einkommen von Arbeitgebern. Sag mir, in welchen Jahren du gearbeitet hast und auf welcher Grundlage, dann bestätige ich dir die Gebühren für jedes Jahr.",
    "keywords": [
      "abn",
      "earlier",
      "previous",
      "last",
      "year",
      "price",
      "invoices",
      "abn",
      "vorjahr",
      "letzten",
      "finanzjahr",
      "rechnungen"
    ],
    "tags": [
      "pricing",
      "abn"
    ],
    "lang": "de"
  },
  {
    "intent": "ABN income was in an earlier tax year (Japanese)",
    "question": "ABNでの仕事は去年でした、ABN料金になりますか？",
    "examples": [
      "前の年度にABNで働いていました",
      "去年の年度にABNがありました",
      "請求書は7月1日より前のものです"
    ],
    "answer": "料金は、そのタックスリターンに含まれる収入の種類によって決まります。税務年度ごとに別のタックスリターンになり、ABNでの収入がある年度にはABN料金、雇用主からの収入のみの年度にはTFN料金が適用されます。どの年度に、どのような形で働いていたかを教えていただければ、各年度の料金をご案内します。",
    "keywords": [
      "abn",
      "earlier",
      "previous",
      "last",
      "year",
      "price",
      "invoices",
      "ABN",
      "去年",
      "前年",
      "年度",
      "請求書"
    ],
    "tags": [
      "pricing",
      "abn"
    ],
    "lang": "ja"
  },
  {
    "intent": "password for the signature document (German)",
    "question": "Was ist das Passwort, um das Dokument zum Unterschreiben zu öffnen?",
    "examples": [
      "Was ist das Passwort?",
      "Es fragt nach einem Passwort",
      "Passwort für den Link zum Unterschreiben"
    ],
    "answer": "Probier 123456789. Wenn es sich nicht öffnet, tippe auf der Anmeldeseite auf Passwort vergessen und setze es per E-Mail zurück, oder schick mir einen Screenshot.",
    "keywords": [
      "password",
      "sign",
      "signing",
      "documents",
      "xero",
      "login",
      "open",
      "link",
      "passwort",
      "unterschreiben",
      "dokument",
      "anmelden"
    ],
    "tags": [
      "signature",
      "process"
    ],
    "lang": "de"
  },
  {
    "intent": "password for the signature document (Japanese)",
    "question": "署名する書類を開くパスワードは何ですか？",
    "examples": [
      "パスワードは何ですか？",
      "パスワードを求められます",
      "署名リンクのパスワードを教えてください"
    ],
    "answer": "123456789 をお試しください。開かない場合は、ログイン画面の「パスワードをお忘れの方」からメールでリセットしてください。それでも開かない場合は、スクリーンショットを送ってください。",
    "keywords": [
      "password",
      "sign",
      "signing",
      "documents",
      "xero",
      "login",
      "open",
      "link",
      "パスワード",
      "署名",
      "書類",
      "ログイン"
    ],
    "tags": [
      "signature",
      "process"
    ],
    "lang": "ja"
  },
  {
    "intent": "is GST included in the fee (German)",
    "question": "Ist die GST in den 220 oder 385 Dollar enthalten?",
    "examples": [
      "Sind die 220 Dollar inklusive GST?",
      "Kommt die GST noch obendrauf?",
      "Ist das der Endpreis?"
    ],
    "answer": "Ja, die Gebühr enthält die GST. $220 oder $385 ist der Gesamtbetrag, es kommt nichts obendrauf. 😊",
    "keywords": [
      "gst",
      "included",
      "inclusive",
      "total",
      "top",
      "price",
      "fee",
      "gst",
      "inklusive",
      "endpreis",
      "obendrauf",
      "preis"
    ],
    "tags": [
      "pricing"
    ],
    "lang": "de"
  },
  {
    "intent": "is GST included in the fee (Japanese)",
    "question": "$220や$385にはGSTが含まれていますか？",
    "examples": [
      "GST込みの料金ですか？",
      "別途GSTがかかりますか？",
      "これが最終的な金額ですか"
    ],
    "answer": "はい、料金にはGSTが含まれています。$220または$385が合計金額で、追加の費用はかかりません。😊",
    "keywords": [
      "gst",
      "included",
      "inclusive",
      "total",
      "top",
      "price",
      "fee",
      "GST",
      "込み",
      "別途",
      "合計"
    ],
    "tags": [
      "pricing"
    ],
    "lang": "ja"
  },
  {
    "intent": "is this legit (German)",
    "question": "Ist das seriös? Ich bin etwas unsicher.",
    "examples": [
      "Ist das seriös?",
      "Woher weiß ich, dass das kein Betrug ist?",
      "Wie kann ich sicherstellen, dass ich nach der Zahlung eine Leistung bekomme?",
      "Ich habe euch im Internet gefunden, ist das echt?"
    ],
    "answer": "Das verstehe ich gut, es ist richtig, nachzufragen 😊\n\nWir arbeiten unter der Aufsicht eines registrierten australischen Tax Agent. Von einem registrierten australischen Tax Agent geprüft und freigegeben, bevor sie beim ATO eingereicht wird. Wir haben schon Hunderten Backpackern aus mehr als 45 Ländern geholfen.\n\nInstagram: https://www.instagram.com/workingholidaytax\nTikTok: https://www.tiktok.com/@workingholidaytax\nGoogle Bewertungen: https://maps.app.goo.gl/FEjqSy53apD32YuF6\nKundenvereinbarung: https://workingholidaytax.com.au/client-agreement",
    "keywords": [
      "legit",
      "real",
      "scam",
      "trust",
      "hesitant",
      "registered",
      "agent",
      "safe",
      "seriös",
      "betrug",
      "vertrauen",
      "echt",
      "sicher"
    ],
    "tags": [
      "objection",
      "legitimacy",
      "brand:wht"
    ],
    "lang": "de"
  },
  {
    "intent": "is this legit (Japanese)",
    "question": "これは本物ですか？少し不安です。",
    "examples": [
      "本当に信頼できますか？",
      "詐欺ではないですか？",
      "支払った後にきちんと対応してもらえますか？",
      "安全ですか？"
    ],
    "answer": "ご不安に思われるのは当然です、確認していただいて大丈夫です😊\n\n当社はオーストラリアの登録タックスエージェントの監督のもとで運営しております。ATOに提出される前に、オーストラリアの登録タックスエージェントが確認し、承認します。45か国以上の数百人のバックパッカーの方をサポートしてきました。\n\nInstagram: https://www.instagram.com/workingholidaytax\nTikTok: https://www.tiktok.com/@workingholidaytax\nGoogleの口コミ: https://maps.app.goo.gl/FEjqSy53apD32YuF6\nクライアント契約書: https://workingholidaytax.com.au/client-agreement",
    "keywords": [
      "legit",
      "real",
      "scam",
      "trust",
      "hesitant",
      "registered",
      "agent",
      "safe",
      "信頼",
      "詐欺",
      "本物",
      "安全"
    ],
    "tags": [
      "objection",
      "legitimacy",
      "brand:wht"
    ],
    "lang": "ja"
  },
  {
    "intent": "cannot access myGov or ATO (German)",
    "question": "Ich komme nicht in myGov oder kann das ATO nicht verknüpfen, könnt ihr trotzdem helfen?",
    "examples": [
      "Ich kann myGov nicht mit dem ATO verknüpfen",
      "Ich bin wieder in Deutschland und komme nicht mehr in mein ATO Konto",
      "Ich habe keine Digital-ID",
      "Ich bekomme beim Verknüpfen einen Fehler"
    ],
    "answer": "Genau dafür sind wir da 😊\n\nDu brauchst keinen myGov Zugang und gibst niemals Zugangsdaten weiter. Wir regeln alles direkt mit dem ATO, und eine Rückerstattung geht direkt auf dein australisches Bankkonto.\n\nDie einzige Ausnahme ist eine Medicare Levy Befreiung. Falls du eine brauchst, führen wir dich durch den Antrag.",
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
      "account",
      "mygov",
      "verknüpfen",
      "zugang",
      "digital",
      "login",
      "zugangsdaten"
    ],
    "tags": [
      "process",
      "ato"
    ],
    "lang": "de"
  },
  {
    "intent": "cannot access myGov or ATO (Japanese)",
    "question": "myGovにログインできない、ATOとリンクできない場合でも依頼できますか？",
    "examples": [
      "マイガブにログインできないので他の方法はないですか？",
      "myGovをATOにリンクできません",
      "オーストラリアの電話番号が使えなくてログインできません",
      "SMSが届かなくてmyGovに入れません"
    ],
    "answer": "まさにそのためのサービスです😊\n\nmyGovへのアクセスは必要ありませんし、ログイン情報をお知らせいただく必要もありません。ATOとのやり取りはすべて当社が直接行い、還付金がある場合は、オーストラリアの銀行口座に直接入金されます。\n\n唯一の例外は、Medicare Levy Exemption(メディケア課徴金の免除)です。必要な場合は、申請の流れをご案内します。",
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
      "account",
      "マイガブ",
      "myGov",
      "ログイン",
      "リンク",
      "ATO"
    ],
    "tags": [
      "process",
      "ato"
    ],
    "lang": "ja"
  },
  {
    "intent": "pay from overseas or third party (German)",
    "question": "Ich bin wieder zuhause. Kann ich von meinem Konto im Ausland bezahlen?",
    "examples": [
      "Kann ich von meinem deutschen Bankkonto bezahlen?",
      "Kann ich auch per Karte bezahlen?",
      "Kann ein Bekannter die Zahlung für mich übernehmen?",
      "Habt ihr eine IBAN?"
    ],
    "answer": "Die Zahlung kann von jedem Konto kommen, Hauptsache sie erreicht unser Konto. Eine Steuerrückerstattung wird weiterhin auf dein eigenes australisches Bankkonto ausgezahlt.\n\nWenn die Überweisung schwierig ist, schick uns deinen vollständigen Namen, dann schicken wir dir stattdessen einen Zahlungslink.",
    "keywords": [
      "wise",
      "pay from overseas",
      "friend paying",
      "transfer",
      "payment link",
      "nz account",
      "uk account",
      "who pays",
      "ausland",
      "bankkonto",
      "karte",
      "iban",
      "zahlungslink",
      "überweisung"
    ],
    "tags": [
      "pricing",
      "process"
    ],
    "lang": "de"
  },
  {
    "intent": "pay from overseas or third party (Japanese)",
    "question": "もうオーストラリアにいません。海外の口座から支払えますか？",
    "examples": [
      "日本の銀行口座から送金できますか？",
      "カードで支払えますか？",
      "友人に代わりに送ってもらえますか？",
      "海外の口座からでも大丈夫ですか"
    ],
    "answer": "お支払いは、当社の口座に届けば、どの口座からでも構いません。税金の還付金は、これまでどおり、ご本人名義のオーストラリアの銀行口座に入金されます。\n\n送金が難しい場合は、フルネームをお送りください。代わりに支払いリンクをお送りします。",
    "keywords": [
      "wise",
      "pay from overseas",
      "friend paying",
      "transfer",
      "payment link",
      "nz account",
      "uk account",
      "who pays",
      "海外",
      "日本",
      "口座",
      "カード",
      "送金",
      "支払いリンク"
    ],
    "tags": [
      "pricing",
      "process"
    ],
    "lang": "ja"
  },
  {
    "intent": "refund to a family member or friend's bank account (German)",
    "question": "Kann die Rückerstattung auf das Konto meiner Mutter, eines Bekannten oder auf mein deutsches Konto gehen?",
    "examples": [
      "Kann die Rückerstattung auf mein deutsches Konto gehen?",
      "Kann ich die Kontodaten meines Partners angeben?",
      "Kann das Geld auf das Konto eines Bekannten gehen?"
    ],
    "answer": "Die Rückerstattung muss auf ein aktives australisches Bankkonto auf deinen eigenen Namen gehen, sie kann nicht auf das Konto einer anderen Person gezahlt werden.\n\nWenn du keines mehr hast, funktioniert ein australisches Wise Konto auf deinen Namen (mit BSB und Kontonummer). Diese Angaben kommen in den Fragebogen, und die Rückerstattung landet dann dort.",
    "keywords": [
      "refund",
      "account",
      "mum",
      "mother",
      "friend",
      "partner",
      "family",
      "someone else",
      "name",
      "closed",
      "rückerstattung",
      "konto",
      "bekannter",
      "mutter",
      "deutsches konto"
    ],
    "tags": [
      "payment",
      "process"
    ],
    "lang": "de"
  },
  {
    "intent": "refund to a family member or friend's bank account (Japanese)",
    "question": "還付金を家族や友人の口座、または日本の口座に振り込んでもらえますか？",
    "examples": [
      "還付金を日本の口座で受け取れますか？",
      "友人の口座に入金してもらえますか？",
      "パートナーの口座情報を使えますか"
    ],
    "answer": "還付金は、ご本人名義の有効なオーストラリアの銀行口座に入金される必要があり、他の方の口座には振り込めません。\n\nもう口座をお持ちでない場合は、ご自身名義のWiseのオーストラリア口座(BSBと口座番号があるもの)でも大丈夫です。その情報をフォームに入力していただくと、還付金はそこに入金されます。",
    "keywords": [
      "refund",
      "account",
      "mum",
      "mother",
      "friend",
      "partner",
      "family",
      "someone else",
      "name",
      "closed",
      "還付",
      "口座",
      "友人",
      "日本の口座",
      "家族"
    ],
    "tags": [
      "payment",
      "process"
    ],
    "lang": "ja"
  },
  {
    "intent": "customer no longer has an Australian phone number (German)",
    "question": "Ich habe meine australische Nummer nicht mehr, was trage ich im Formular ein?",
    "examples": [
      "Ich habe keine australische Telefonnummer mehr",
      "Meine australische SIM Karte ist gekündigt",
      "Welche Nummer soll ich eintragen?",
      "Soll ich meine deutsche Nummer angeben?"
    ],
    "answer": "Kein Problem 😊 Bitte trag die australische Nummer ein, die du in Australien hattest, auch wenn sie nicht mehr aktiv ist. Das Formular braucht eine australische Handynummer, damit es durchgeht. Wir melden uns weiterhin hier auf WhatsApp bei dir.",
    "keywords": [
      "australian",
      "number",
      "phone",
      "sim",
      "old",
      "cancelled",
      "no longer",
      "form",
      "mobile",
      "telefonnummer",
      "australische",
      "handynummer",
      "sim",
      "formular"
    ],
    "tags": [
      "form",
      "phone"
    ],
    "lang": "de"
  },
  {
    "intent": "customer no longer has an Australian phone number (Japanese)",
    "question": "オーストラリアの電話番号がもうありません、フォームには何を入力しますか？",
    "examples": [
      "オーストラリアの電話番号が使えなくなりました",
      "オーストラリアのSIMは解約しました",
      "フォームの電話番号はどうすればいいですか",
      "日本の番号を入力してもいいですか"
    ],
    "answer": "大丈夫です😊 オーストラリアに滞在中に使っていたオーストラリアの電話番号を、今は使えなくても入力してください。フォームを送信するには、オーストラリアの携帯番号が必要です。ご連絡は、引き続きこのWhatsAppで行います。",
    "keywords": [
      "australian",
      "number",
      "phone",
      "sim",
      "old",
      "cancelled",
      "no longer",
      "form",
      "mobile",
      "電話番号",
      "オーストラリア",
      "SIM",
      "フォーム"
    ],
    "tags": [
      "form",
      "phone"
    ],
    "lang": "ja"
  },
  {
    "intent": "when does the tax owed have to be paid (German)",
    "question": "Bis wann muss ich die Steuer bezahlen, die ich schulde?",
    "examples": [
      "Wie zahle ich die Steuern an das ATO?",
      "Wann muss ich das ATO bezahlen?",
      "Bis wann muss das bezahlt werden?",
      "Wie kann ich die restlichen Steuern bezahlen?"
    ],
    "answer": "Du musst jetzt noch nichts bezahlen 😊 Das ATO legt das Fälligkeitsdatum fest, sobald deine Steuererklärung eingereicht ist. Innerhalb von 14 Tagen nach der Einreichung bekommst du vom ATO eine E-Mail mit der Zahlungsaufforderung und der Zahlungsweise. Falls sie nicht ankommt, schreib uns hier, dann schicken wir sie dir direkt im Chat.",
    "keywords": [
      "pay",
      "paid",
      "due",
      "date",
      "when",
      "owe",
      "ato",
      "deadline",
      "payable",
      "steuern",
      "zahlen",
      "ato",
      "fällig",
      "schulde",
      "bezahlen"
    ],
    "tags": [
      "post-payment",
      "ato",
      "payable"
    ],
    "lang": "de"
  },
  {
    "intent": "when does the tax owed have to be paid (Japanese)",
    "question": "追加で払う税金はいつまでに支払えばいいですか？",
    "examples": [
      "ATOへの支払いはどうすればいいですか？",
      "納税額はいつまでに払いますか？",
      "追加の税金はどこで払いますか",
      "支払期限はいつですか"
    ],
    "answer": "今は何もお支払いいただく必要はありません😊 支払期限は、タックスリターンが提出されたあとにATOが設定します。提出から14日以内に、ATOから支払いの案内と方法が書かれたメールが届きます。届かない場合は、こちらにメッセージをください。チャットで直接お送りします。",
    "keywords": [
      "pay",
      "paid",
      "due",
      "date",
      "when",
      "owe",
      "ato",
      "deadline",
      "payable",
      "納税",
      "支払い",
      "ATO",
      "期限",
      "払う"
    ],
    "tags": [
      "post-payment",
      "ato",
      "payable"
    ],
    "lang": "ja"
  },
  {
    "intent": "why pay first value (German)",
    "question": "Warum muss ich im Voraus bezahlen und was deckt die Gebühr ab?",
    "examples": [
      "Warum muss ich im Voraus bezahlen?",
      "Was genau ist in den 220 Dollar enthalten?",
      "Ist das nicht unüblich, vorher zu zahlen?"
    ],
    "answer": "Die $220 decken deine Steuererklärung nur mit TFN ab. Ein Spezialist prüft deine gesamte Situation, achtet darauf, dass nichts übersehen wird, worauf du Anspruch haben könntest, und erstellt und reicht dann alles online ein.\n\nEs ist eine feste Gebühr ohne Extras. Wenn deine Steuerrückerstattung niedriger ist als unsere Gebühr, erstatten wir dir die Differenz. Gibt es keine Rückerstattung, fällt die volle Gebühr an.",
    "keywords": [
      "pay",
      "upfront",
      "before",
      "cover",
      "fee",
      "extra",
      "included",
      "guarantee",
      "voraus",
      "gebühr",
      "vorher",
      "bezahlen",
      "enthalten"
    ],
    "tags": [
      "pricing",
      "objection"
    ],
    "lang": "de"
  },
  {
    "intent": "why pay first value (Japanese)",
    "question": "なぜ先に支払うのですか？$220には何が含まれますか？",
    "examples": [
      "なぜ先に支払いが必要なのですか？",
      "$220には何が含まれていますか？",
      "先払いは珍しいのではないですか"
    ],
    "answer": "$220には、TFNのみのタックスリターンが含まれます。専門のスタッフがあなたの状況全体を確認し、受け取れるはずのものを見逃していないかを確かめたうえで、タックスリターンを作成してオンラインで提出します。\n\n追加費用のない固定料金です。還付金が当社の料金より少ない場合は、その差額を返金いたします。還付がない場合は、料金全額をいただきます。",
    "keywords": [
      "pay",
      "upfront",
      "before",
      "cover",
      "fee",
      "extra",
      "included",
      "guarantee",
      "先払い",
      "先に",
      "料金",
      "含まれ"
    ],
    "tags": [
      "pricing",
      "objection"
    ],
    "lang": "ja"
  },
  {
    "intent": "super claim (German)",
    "question": "Könnt ihr mir bei meiner Superannuation (DASP) helfen?",
    "examples": [
      "Was ist mit meiner Superannuation?",
      "Bekomme ich meine Super auch zurück?",
      "Ist in der Rückerstattung auch meine Superannuation enthalten?"
    ],
    "answer": "Leider ist unser Superannuation Service (DASP) im Moment nicht verfügbar. Um deine Steuererklärung kümmern wir uns gerne. 😊",
    "keywords": [
      "dasp",
      "super",
      "superannuation",
      "withdrawal",
      "claim",
      "refund",
      "superannuation",
      "rente",
      "altersvorsorge",
      "dasp"
    ],
    "tags": [
      "pre-payment",
      "post-payment",
      "super"
    ],
    "lang": "de"
  },
  {
    "intent": "super claim (Japanese)",
    "question": "スーパーアニュエーション(DASP)の手続きもお願いできますか？",
    "examples": [
      "スーパーの払い戻しもお願いできますか？",
      "年金も一緒に戻りますか？",
      "還付金にスーパーは含まれますか"
    ],
    "answer": "申し訳ありませんが、スーパーアニュエーション(DASP)のサービスは現在ご利用いただけません。タックスリターンの手続きは、喜んでお手伝いします。😊",
    "keywords": [
      "dasp",
      "super",
      "superannuation",
      "withdrawal",
      "claim",
      "refund",
      "スーパー",
      "年金",
      "DASP"
    ],
    "tags": [
      "pre-payment",
      "post-payment",
      "super"
    ],
    "lang": "ja"
  },
  {
    "intent": "request for a phone call (German)",
    "question": "Können wir vor der Zahlung kurz telefonieren?",
    "examples": [
      "Kann ich euch anrufen?",
      "Kann man das kurz telefonisch besprechen?",
      "Ich möchte lieber mit einer Person sprechen"
    ],
    "answer": "Unser Service läuft komplett online, so bleibt er schnell und günstig.\n\nWir telefonieren nicht, beantworten aber gern alle Fragen direkt hier.",
    "keywords": [
      "call",
      "phone",
      "speak",
      "talk",
      "consultation",
      "zoom",
      "voice",
      "anrufen",
      "telefonieren",
      "telefonisch",
      "sprechen"
    ],
    "tags": [
      "process",
      "trust"
    ],
    "lang": "de"
  },
  {
    "intent": "request for a phone call (Japanese)",
    "question": "お支払い前に、電話で少しお話しできますか？",
    "examples": [
      "電話で相談できますか？",
      "通話で説明してもらえますか？",
      "担当の方と直接話したいです"
    ],
    "answer": "当社のサービスはすべてオンラインで行っており、そのおかげで迅速かつお手頃な料金でご提供できています。\n\nお電話は行っておりませんが、ご質問はこちらで喜んでお答えします。",
    "keywords": [
      "call",
      "phone",
      "speak",
      "talk",
      "consultation",
      "zoom",
      "voice",
      "電話",
      "通話",
      "相談"
    ],
    "tags": [
      "process",
      "trust"
    ],
    "lang": "ja"
  },
  {
    "intent": "medicare exemption (German)",
    "question": "Ich hatte kein Medicare, was ist die Medicare Levy Befreiung?",
    "examples": [
      "Ich hatte keine Krankenversicherung",
      "Was ist die Medicare Befreiung?",
      "Die Medicare Abgabe ist in der Berechnung, aber ich war nie beim Arzt"
    ],
    "answer": "Medicare gehört zu dem, was unser Team im Rahmen der Prüfung checkt und erledigt, überlass das also uns. Falls eine Befreiung für dich in Frage kommen könnte, führen wir dich durch, sobald deine Steuererklärung läuft.",
    "keywords": [
      "medicare",
      "levy",
      "exemption",
      "insurance",
      "hospital",
      "health",
      "medicare",
      "krankenversicherung",
      "befreiung",
      "abgabe"
    ],
    "tags": [
      "medicare",
      "process"
    ],
    "lang": "de"
  },
  {
    "intent": "medicare exemption (Japanese)",
    "question": "メディケアに加入していませんでした、Medicare Levy Exemption(課徴金の免除)とは何ですか？",
    "examples": [
      "医療税が入っていますが、保険には入っていませんでした",
      "メディケアの免除とは何ですか？",
      "病院に行ったことがありません"
    ],
    "answer": "メディケアについては、確認の一部としてチームが確認して対応しますので、お任せください。免除が当てはまる可能性がある場合は、タックスリターンの手続きが進んだ段階でご案内します。",
    "keywords": [
      "medicare",
      "levy",
      "exemption",
      "insurance",
      "hospital",
      "health",
      "メディケア",
      "医療税",
      "免除",
      "保険"
    ],
    "tags": [
      "medicare",
      "process"
    ],
    "lang": "ja"
  },
  {
    "intent": "foreign income with ABN price",
    "question": "I have an ABN and foreign income, is there a price for that?",
    "examples": [
      "foreign income and ABN",
      "overseas income plus Uber",
      "what do I pay with ABN and income from home"
    ],
    "answer": "Yes. With ABN income and foreign income to report, the TFN + ABN option is $495 (GST included), a fixed fee whatever the result. Shall I send the payment details?",
    "keywords": [
      "foreign income",
      "abn",
      "495",
      "overseas"
    ],
    "tags": [
      "pricing",
      "foreign",
      "abn"
    ],
    "lang": "en"
  },
  {
    "intent": "ABN number and GST",
    "question": "Do you need my ABN number or GST status?",
    "examples": [
      "do I send my ABN",
      "I am registered for GST",
      "what about GST"
    ],
    "answer": "Please send your ABN number and tell me if your ABN is registered for GST. The $385 covers your personal return including your ABN income; BAS or GST reporting is not included.",
    "keywords": [
      "abn number",
      "gst",
      "registered"
    ],
    "tags": [
      "abn",
      "gst"
    ],
    "lang": "en"
  },
  {
    "intent": "reply to a win-back saying they have not done their return",
    "question": "No I didn't",
    "examples": [
      "No I didn't",
      "Not yet",
      "nope still haven't done it",
      "haven't got round to it"
    ],
    "answer": "No problem, we can take care of it for you. It is $220 for a TFN only return ($385 if you also had ABN income). Did you earn any income through an ABN, or only as an employee? Once you tell me I'll send the next step.",
    "keywords": [
      "didn't",
      "not yet",
      "haven't",
      "sorted"
    ],
    "tags": [
      "winback"
    ],
    "lang": "en"
  },
  {
    "intent": "payment sent by international transfer",
    "question": "I sent the money with Wise, can you confirm",
    "examples": [
      "I paid with Wise, it says completed",
      "my bank says the transfer went through, can you check",
      "the money will arrive on Friday"
    ],
    "answer": "Thanks. An international transfer can take a few days to reach our account. I will confirm the payment as soon as it arrives, and a screenshot of the transfer helps.",
    "keywords": [
      "wise",
      "international transfer",
      "overseas transfer",
      "foreign currency"
    ],
    "tags": [
      "payment"
    ],
    "lang": "en"
  },
  {
    "intent": "customer says they have signed the return",
    "question": "I have signed, what happens now?",
    "examples": ["I signed it", "I've signed the document", "signed, what next", "done signing", "Ich habe unterschrieben", "署名しました"],
    "answer": "Thanks, we have seen it. Our team now does a final check and lodges your return with the ATO. We will message you here as soon as it is lodged.",
    "keywords": ["signed", "signature", "sign", "lodged", "next", "done"],
    "tags": ["signature", "lodgement"],
    "lang": "en"
  },
  {
    "intent": "which name is on the bank account to pay",
    "question": "Whose name will I see when I pay, is the account name correct?",
    "examples": ["what is the account name", "name does not match", "who am I paying", "is this the right account name", "Wie ist der Account Name?", "口座名義を教えてください"],
    "answer": "The account name is The Accounting Academy, BSB 062692, account 81049952. Some banks show a warning the first time you pay a new payee, that is normal. If the name you see is different, send me a screenshot and we will check it with you.",
    "keywords": ["account", "name", "payee", "bsb", "accounting", "academy", "match"],
    "tags": ["payment"],
    "lang": "en"
  },
  {
    "intent": "customer paid less than the fee",
    "question": "I paid less than the fee, is that enough?",
    "examples": ["I sent 180 instead of 220", "I only paid part", "is a smaller amount ok", "I paid a bit less", "Ich habe nur 200 statt 220 überwiesen", "220ドルのところ200ドルを送ってしまいました"],
    "answer": "Thanks for sending it. The fee for your option is the full amount we quoted, so the rest still needs to be paid before we can start. I can resend the bank details if you like. Once the full amount has arrived, send me the screenshot and we will begin.",
    "keywords": ["paid", "less", "partial", "amount", "fee", "short", "instalment"],
    "tags": ["payment"],
    "lang": "en"
  },
  {
    "intent": "which documents to send after the form",
    "question": "What documents do I need to send after the form?",
    "examples": ["what else do you need from me", "do you need my passport", "which documents", "what should I send you", "Welche Unterlagen braucht ihr noch von mir?", "他に必要な書類はありますか？"],
    "answer": "After the form, the useful things to send here are: a clear photo of your passport photo page, a bank statement for the account where the refund would go if there is one, receipts or bank statement lines for any work related expenses you want us to consider, and for ABN work your invoices. Not everyone needs all of these, so send what applies and our team will tell you if anything else is missing.",
    "keywords": ["documents", "passport", "bank", "statement", "receipts", "invoices", "send", "need"],
    "tags": ["documents", "paperwork"],
    "lang": "en"
  },
  {
    "intent": "stay spans two financial years",
    "question": "I was in Australia from February to the next year, do I need two returns?",
    "examples": ["my visa covers two tax years", "I worked in two financial years", "do I lodge twice", "stay over 30 June"],
    "answer": "The tax year runs from 1 July to 30 June, so if you worked before and after 30 June, each financial year is its own return with its own fee. Tell me roughly when you worked and whether it was TFN only or also an ABN, and I will explain what applies to you.",
    "keywords": ["two", "years", "financial", "30 june", "twice", "each", "return"],
    "tags": ["years", "pricing"],
    "lang": "en"
  },
  {
    "intent": "customer cannot log in to online banking or has no Australian bank account",
    "question": "I can't log in to my Australian bank or I closed the account, what do I do?",
    "examples": ["I closed my Australian account", "my Aussie bank login does not work", "no Australian bank anymore", "can't pay from my account", "Ich komme nicht mehr auf mein australisches Konto", "オーストラリアの銀行口座にログインできません"],
    "answer": "No problem. You can pay us by bank transfer from any bank, including an overseas account, or we can send a card payment link if that is easier. Tell me which you prefer. For the refund itself, our team will tell you what details are needed once the return is prepared.",
    "keywords": ["bank", "account", "login", "closed", "overseas", "card", "link", "pay"],
    "tags": ["payment", "bank"],
    "lang": "en"
  },
  {
    "intent": "when will the team reply",
    "question": "What hours are you available and when will I hear back?",
    "examples": ["how long until you reply", "when can I reach you", "are you open now", "do you reply on weekends", "Wann kann ich euch erreichen?", "返信はいつ頃になりますか？"],
    "answer": "This WhatsApp is the best way to reach us, and our team usually replies within one business day. If something is urgent, tell me and I will pass it on with that noted.",
    "keywords": ["hours", "reply", "when", "available", "open", "weekend", "wait"],
    "tags": ["service"],
    "lang": "en"
  },
  {
    "intent": "ABN income was in an earlier tax year",
    "question": "My ABN work was last year, does the ABN price apply?",
    "examples": ["I had an ABN in the previous year", "ABN last financial year", "the invoices are from before 1 July"],
    "answer": "The fee depends on what income the return covers. Each financial year is its own return, so the ABN fee applies to a year that has ABN income and the TFN fee to a year with employer income only. Tell me which years you worked and on what basis, and I will confirm the fees for each.",
    "keywords": ["abn", "earlier", "previous", "last", "year", "price", "invoices"],
    "tags": ["pricing", "abn"],
    "lang": "en"
  },
  {
    "intent": "customer no longer has an Australian phone number",
    "question": "I don't have my Australian number anymore, what do I put in the form?",
    "examples": ["I no longer have my Australian number", "my Aussie sim is cancelled", "I left Australia and lost my AU number", "what phone number do I enter, I don't have the old one", "what phone number do I enter in the form, I'm back home", "can I put my French number in the form", "I no longer have an Australian number, is it ok to leave the phone field empty?", "which phone number should I put in the form, I'm back home now", "my Australian SIM is gone, what number do I give you?", "does the form need an Australian mobile?"],
    "answer": "No worries 😊 Please write the Australian mobile number you had while you were in Australia, even if it is not active anymore. The form needs an Australian mobile number to go through. We will keep talking to you here on WhatsApp. If you don't remember it or never had one, tell me here and the team will sort the form out with you 😊",
    "keywords": ["australian", "number", "phone", "sim", "old", "cancelled", "no longer", "form", "mobile", "french number", "foreign number"],
    "tags": ["form", "phone"],
    "lang": "en"
  },
  {
    "intent": "when does the tax owed have to be paid",
    "question": "When does the tax I owe have to be paid?",
    "examples": ["When does that have to be paid by", "when do I need to pay the ATO", "what's the due date for the tax I owe", "how long do I have to pay it", "do I have to pay it now"],
    "answer": "Nothing to pay yet 😊 The ATO sets the due date once your return is lodged. Within 14 days of lodging you will receive an email from the ATO with the payment request and how to pay. If it has not arrived, message us here and we will send it to you directly in the chat.",
    "keywords": ["pay", "paid", "due", "date", "when", "owe", "ato", "deadline", "payable"],
    "tags": ["post-payment", "ato", "payable"],
    "lang": "en"
  },
  {
    "intent": "bank warns the payee details are incorrect or pauses the transfer",
    "question": "My bank says the bank details are incorrect / the name doesn't match and paused the transfer. What do I do?",
    "examples": ["Not sure why it won't let me send", "my bank says the details are incorrect", "the transfer is paused, it says the name doesn't match", "it says account name mismatch", "my bank flagged the payment", "confirmation of payee warning", "Meine Bank zeigt eine Warnung, der Kontoname stimmt nicht überein", "銀行で口座名義が一致しないという警告が出ます"],
    "answer": "No worries, those are definitely our details: The Accounting Academy, BSB 062692, account 81049952. Banks often show a warning or pause a first payment to a new payee as a security check, especially when the name typed doesn't match exactly. Make sure the account name is entered as The Accounting Academy, then you can go ahead. If your bank still holds it, they can release it for you in the app or by phone \ud83d\ude0a",
    "keywords": ["bank", "incorrect", "details", "paused", "blocked", "name", "match", "mismatch", "warning", "transfer", "payee"],
    "tags": ["pre-payment", "payment"],
    "lang": "en"
  },
  {
    "intent": "ATO payment plan for tax owed",
    "question": "Can I set up a payment plan with the ATO for the amount I owe?",
    "examples": ["I presume I can set up a payment plan to repay this", "can I pay the ATO in instalments?", "I can't pay the whole amount at once"],
    "answer": "The ATO offers payment plans once the payment request has been issued, and we will go through the options with you here in the chat. Within 14 days of lodging you will receive an email from the ATO with the payment request and how to pay. If it has not arrived, message us here and we will send it to you directly. 😊",
    "keywords": ["payment", "plan", "instalments", "owe", "ato", "repay", "afford"],
    "tags": ["post-payment", "ato"],
    "lang": "en"
  },
  {
    "intent": "cancel after the estimate shows no refund and get the fee back",
    "question": "If the estimate shows I'm not getting a refund, can I stop and get the $220 back?",
    "examples": ["if the preliminary assessment shows no refund can I choose not to proceed and get a full refund of the fee?", "can I cancel if there's no refund?", "do I get my money back if I'm not entitled to anything?"],
    "answer": "The guarantee works the other way round: if your refund is less than our fee, we refund the difference. If there's no refund, the full fee applies, because the review is the work. The team will walk you through the figures before anything is lodged. \ud83d\ude0a",
    "keywords": ["cancel", "refund", "fee", "back", "no", "refund", "estimate", "proceed", "stop"],
    "tags": ["pricing", "post-payment"],
    "lang": "en"
  },
  {
    "intent": "when the ATO notice of assessment or email arrives after lodging",
    "question": "When will I get the email or notice from the ATO after you've lodged my return?",
    "examples": ["when should I receive an email?", "how long until I hear from the ATO?", "I haven't received anything since you lodged", "when does the notice of assessment come?"],
    "answer": "The ATO usually processes it within about two weeks. If you're getting a refund, it goes straight to your bank account. If you owe tax, within 14 days of lodging you will receive an email from the ATO with the payment request and how to pay. If it has not arrived, message us here and we will send it to you directly in the chat. Nothing else to do on your side 😊",
    "keywords": ["notice", "assessment", "email", "ato", "lodged", "when", "receive", "hear", "inbox"],
    "tags": ["post-payment", "ato"],
    "lang": "en"
  },
  {
    "intent": "customer sent TFN or passport number in the chat",
    "question": "Here is my TFN / passport number (sent in the chat)",
    "examples": ["my TFN is 123 456 789", "here's my passport number", "do you need my TFN? it's..."],
    "answer": "Thanks, but please don't share your TFN or passport details here in the chat. They go straight into the secure form, which is the only place we collect them. \ud83d\ude0a",
    "keywords": ["tfn", "passport", "number", "chat", "secure", "form", "share", "send"],
    "tags": ["security", "post-payment"],
    "lang": "en"
  },
  {
    "intent": "tiny ABN income still means TFN + ABN",
    "question": "I barely made anything on Uber / DoorDash, do I really need the TFN + ABN option?",
    "examples": ["I only made two deliveries, does that count?", "my ABN income was like $20", "I don't have the app anymore, I made almost nothing on the ABN"],
    "answer": "Yes, even a small amount of ABN income has to be declared, so your return is the TFN + ABN option ($385). If you've already paid for the TFN option, it's just a top-up of the difference to the same account. For the figures, the platform's website or support can send you an earnings summary for the year. \ud83d\ude0a",
    "keywords": ["uber", "doordash", "abn", "small", "barely", "tiny", "top", "up", "165", "385", "declare"],
    "tags": ["pricing", "abn"],
    "lang": "en"
  },
  {
    "intent": "what information do you need from me before paying",
    "question": "What information do you need from me? Should I send my details now?",
    "examples": ["what do you need from me to get started?", "should I send my payslips now?", "what details do you need before I pay?"],
    "answer": "Nothing yet. \ud83d\ude0a Once the payment is through you get a short form that asks for everything we need, and you upload any documents there. If anything else comes up, we'll ask you here.",
    "keywords": ["information", "need", "details", "documents", "send", "now", "before", "start", "form"],
    "tags": ["process", "pre-payment"],
    "lang": "en"
  },
  {
    "intent": "can I review the return before it is lodged and where does the refund go",
    "question": "Can I check the return before you lodge it? Does the refund go to my own account?",
    "examples": ["do I get to see the return before lodging?", "will you lodge without my approval?", "does the refund come to you or to me?"],
    "answer": "Yes. You review and sign the return before we lodge anything, and the ATO pays your refund straight into your own Australian bank account, never through us. \ud83d\ude0a",
    "keywords": ["review", "sign", "before", "lodge", "approval", "refund", "account", "own", "directly"],
    "tags": ["process", "trust"],
    "lang": "en"
  },
  {
    "intent": "who prepares and signs the return, professional insurance",
    "question": "Who actually prepares and signs my return? Are you insured?",
    "examples": ["who signs off the return?", "do you have professional indemnity insurance?", "is a real accountant doing this?"],
    "answer": "Your return is prepared by our team and reviewed and signed off under a registered tax agent (details and registration are in our client agreement: https://workingholidaytax.com.au/client-agreement). You see and sign it yourself before it's lodged. \ud83d\ude0a",
    "keywords": ["who", "signs", "prepares", "insurance", "indemnity", "accountant", "registered", "agent"],
    "tags": ["trust", "pre-payment"],
    "lang": "en"
  },
  {
    "intent": "copy of the signed or lodged return",
    "question": "Can you send me a copy of my signed / lodged return?",
    "examples": ["can I get a copy of what was lodged?", "please send me the final return", "I'd like a copy of my tax return for my records"],
    "answer": "Of course. I've passed this to the team and they'll send you the lodged return as a PDF here. \ud83d\ude0a",
    "keywords": ["copy", "signed", "lodged", "return", "pdf", "records", "send"],
    "tags": ["post-payment"],
    "lang": "en"
  },
  {
    "intent": "refund has not arrived yet after lodgment",
    "question": "My return was lodged but I still haven't received my refund",
    "examples": ["it's been weeks and no refund", "where is my refund?", "the ATO hasn't paid me yet"],
    "answer": "The ATO usually pays within about two weeks of lodgment, but it can take longer while they check things on their side. If it's past two weeks, send us a quick message and the team will check the status with the ATO for you. \ud83d\ude0a",
    "keywords": ["refund", "not", "arrived", "received", "weeks", "where", "ato", "status", "waiting"],
    "tags": ["post-payment", "ato"],
    "lang": "en"
  },
  {
    "intent": "is GST included in the fee",
    "question": "Is GST included in the $220 / $385?",
    "examples": ["does the price include GST?", "do I pay GST on top?", "is that inclusive of GST?", "Sind die 220 Dollar inklusive GST?", "GST込みの料金ですか？"],
    "answer": "Yes, the fee includes GST. $220 or $385 is the total, nothing on top. \ud83d\ude0a",
    "keywords": ["gst", "included", "inclusive", "total", "on", "top", "price", "fee"],
    "tags": ["pricing"],
    "lang": "en"
  },
  {
    "intent": "waiting for money before paying",
    "question": "I'll pay once I get paid / I'm waiting on funds",
    "examples": ["I'll pay next week when I get my wages", "waiting for money to come in, then I'll transfer", "I'm a bit short right now, can I pay later?"],
    "answer": "No problem at all, there's no rush. Whenever you're ready, the details are above, and just send a screenshot once it's through. \ud83d\ude0a",
    "keywords": ["pay", "later", "waiting", "money", "funds", "wages", "week", "short", "rush"],
    "tags": ["pre-payment"],
    "lang": "en"
  },
  {
    "intent": "can a Wise, Revolut or other digital bank account receive the refund",
    "question": "Would a Wise (or Revolut, Up, etc.) account work for my tax refund?",
    "examples": [
      "can I use my Wise account for the refund?",
      "does the ATO pay into Revolut?",
      "I only have a Wise Australian account, is that ok for the form?",
      "will a digital bank account work for the tax refund?"
    ],
    "answer": "Yes, as long as it's an Australian account in your name with a BSB and account number that can receive AUD, so a Wise Australian account works fine. Just put those details in the form and the refund goes straight there. 😊",
    "keywords": ["wise", "revolut", "digital", "bank", "account", "refund", "bsb", "aud", "receive"],
    "tags": ["form", "process", "post-payment"],
    "lang": "en"
  },
  {
    "intent": "cannot or does not want to apply for the Medicare exemption",
    "question": "I can't do the Medicare exemption application, is that a problem?",
    "examples": [
      "I can't do that",
      "I won't be able to apply for the Medicare exemption",
      "I don't have time for the Medicare thing, can we skip it?",
      "the exemption application is too complicated for me"
    ],
    "answer": "No problem, we can go ahead without it. It just means the Medicare levy stays on your return. Is that ok with you?",
    "keywords": ["can't", "cannot", "medicare", "exemption", "apply", "skip", "won't", "unable"],
    "tags": ["medicare", "post-payment"],
    "lang": "en"
  },
  {
    "intent": "where to find the Medicare exemption form",
    "question": "Where do I find the Medicare Levy Exemption form? Is it part of the tax return?",
    "examples": [
      "where do I apply for the Medicare exemption?",
      "I've been searching all morning for the exemption form",
      "is the Medicare exemption part of my tax return?",
      "which website is the Medicare Entitlement Statement on?"
    ],
    "answer": "It's separate from the tax return. The Medicare Entitlement Statement is handled by Services Australia, not the ATO, and this is the page for it:\nhttps://www.servicesaustralia.gov.au/medicare-entitlement-statement\n\nOnce it's submitted, send us a screenshot and we'll include the exemption in your return. 😊",
    "keywords": ["where", "find", "medicare", "exemption", "form", "entitlement", "statement", "services", "australia", "apply", "link"],
    "tags": ["medicare", "post-payment"],
    "lang": "en"
  },
  {
    "intent": "asks us to confirm the bank details are our official account before paying",
    "question": "Before I transfer, can you confirm these bank details are the official account of The Accounting Academy and the same one Working Holiday Tax uses?",
    "examples": [
      "can you confirm the account details are official before I pay?",
      "is BSB 062692 account 81049952 really your account?",
      "please confirm this is the same account used by Working Holiday Tax for client payments",
      "I want to make sure I'm paying the right account",
      "is the payment of $385 for my TFN + ABN return for this financial year?"
    ],
    "answer": "Yes, confirmed. BSB 062692, account 81049952 is our business account, held under the name The Accounting Academy, and it's the account every Working Holiday Tax client pays into. The amount covers your full tax return for the year you're lodging. Once it's through, just send a screenshot and we'll get started. 😊",
    "keywords": ["confirm", "official", "account", "bank", "details", "same", "accounting", "academy", "before", "transfer", "legit"],
    "tags": ["payment", "trust"],
    "lang": "en"
  },
  {
    "intent": "worked across two financial years, two returns and two fees",
    "question": "I worked across two financial years. Do I need two returns, and what's the fee?",
    "examples": [
      "I worked May to December, is that one return or two?",
      "my work period straddles two tax years, do I need to lodge twice?",
      "I already paid for one year but my income is split across two financial years",
      "is there a discount if I lodge two years with you?",
      "how much for two tax returns?"
    ],
    "answer": "The Australian financial year runs from 1 July to 30 June, so income on both sides of 30 June means one tax return for each year, and each year has its own fee: $220 for a TFN return, or $385 if that year also has ABN income. The fee is the same for every year, and for TFN only returns the same guarantee applies to each return. Just let us know which years you worked and we'll take it from there. 😊",
    "keywords": ["two", "financial", "years", "returns", "both", "split", "straddle", "second", "fee"],
    "tags": ["pricing", "process"],
    "lang": "en"
  },
  {
    "intent": "estimate before paying",
    "question": "Can you tell me how much I'll get back before I pay? Can I get a free estimate first?",
    "examples": [
      "how much am I likely to get back before I pay?",
      "can I do the eligibility check before paying?",
      "I'd like to know how much I'm likely to get back before paying you any money",
      "can you give me a rough idea of my refund first?",
      "Kann ich vor der Zahlung schon wissen, wie viel ich zurückbekomme?",
      "支払い前に還付額の見積もりを出してもらえますか？"
    ],
    "answer": "That’s a really fair question!\n\nTo give you an estimate, we first need to review your full situation with the ATO, which is the main part of our service.\n\nIf your tax refund is less than our fee, we'll refund the difference. If there's no refund, our full fee applies. 😊",
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
      "found you on Instagram and wasn't sure if this is real",
      "Ist das seriös?",
      "本当に信頼できますか？"
    ],
    "answer": "Completely understand, it’s smart to check 😊\n\nWe operate under the supervision of a registered tax agent and have helped hundreds of backpackers from more than 45 countries.\n\nInstagram: https://www.instagram.com/workingholidaytax\nTikTok: https://www.tiktok.com/@workingholidaytax\nGoogle reviews: https://maps.app.goo.gl/FEjqSy53apD32YuF6\nClient agreement: https://workingholidaytax.com.au/client-agreement",
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
      "legitimacy",
      "brand:wht"
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
    "answer": "Of course. We operate under the supervision of a registered tax agent. You can find all the details, including the agent and registration, in our client agreement here: https://workingholidaytax.com.au/client-agreement",
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
    "answer": "Our fee is fixed, never a percentage of your refund.\n\nTFN only: $220 per year\nTFN + ABN: $385 per year\n\nOn the TFN only option, if your tax refund is less than our fee, we'll refund the difference. If there's no refund, our full fee applies. With ABN income the fee is fixed whatever the result.",
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
    "answer": "If your tax refund is less than our fee, we'll refund the difference. If there's no refund at all, or you have an amount to pay, our full fee applies, as the work is the same. The review is there to check that nothing you may be entitled to is overlooked.",
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
    "answer": "Payment is made upfront because the review and personal guidance are the main part of the service, and that's where our work starts. Once payment is received, we can start going through your situation properly. If your tax refund is less than our fee, we'll refund the difference. If there's no refund, our full fee applies.",
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
      "do you need my Medicare number?",
      "医療税が入っていますが、保険には入っていませんでした",
      "Ich hatte keine Krankenversicherung"
    ],
    "answer": "Medicare is one of the things our team checks and handles as part of the review, so leave that with us. If an exemption may apply to you, we walk you through it once your return is underway.",
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
    "intent": "started the return in myGov and wants advice on the correct tax treatment before lodging",
    "question": "I have already started my return in myGov but cannot lodge it because of residency, Addy, Medicare, employer statement or health insurance questions. Can you advise me on the correct treatment before lodging, and what do you charge?",
    "examples": [
      "I have already started my tax return through myGov but cannot lodge it because of residency and Medicare questions",
      "Do you have experience with the Addy decision and the double tax agreement, and could you advise me on the correct tax treatment before lodging?",
      "I need professional assistance with my tax return, determining my residency status, incomplete employer income statements and a private health insurance error. Could you provide an estimate of your fees?",
      "I started lodging in myGov but I am stuck, can you tell me what to do before I lodge?"
    ],
    "answer": "Thanks for the detailed message. These are exactly the situations we deal with for working holiday makers: tax residency, the Addy decision, the Medicare levy, health insurance and income statements that do not match. Our team reviews all of it as part of preparing your return, and it is reviewed and signed off by a registered tax agent before it is lodged with the ATO. We cannot give the tax treatment separately in advance, it is part of preparing the return for you.\n\nThe fee is $220 if your income was PAYG only, or $385 if you also had ABN income (GST included). If your refund turns out to be less than the fee, we refund the difference after your Notice of Assessment. If there is no refund, or you owe tax instead, the full fee applies.\n\nIf you would like to go ahead, I can send the payment details. In the meantime, please hold off lodging so we can prepare it properly.",
    "keywords": [
      "started",
      "mygov",
      "before lodging",
      "advise",
      "tax treatment",
      "residency",
      "addy",
      "double tax agreement",
      "employer income statement",
      "health insurance",
      "estimate",
      "fees"
    ],
    "tags": [
      "pricing",
      "residency",
      "brand:wht"
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
      "it won't let me submit the Medicare entitlement statement",
      "I couldn't link the service in myGov, any advice?",
      "the IHI service could not be registered at this time, I need to complete the MS003 form",
      "we are unable to process your request online due to technical difficulties, return to myGov",
      "I can't get the Medicare exemption to work, can you help?"
    ],
    "answer": "Unfortunately we can't help with anything that goes through Services Australia, so we can't get the Medicare exemption for you. We can still go ahead without it, but the Medicare levy will then be included in your tax return and will reduce the result. Is that OK with you?",
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
      "submit",
      "ms003",
      "mygov",
      "link",
      "linking",
      "registered",
      "technical",
      "difficulties"
    ],
    "tags": [
      "medicare",
      "handoff",
      "mygov"
    ],
    "lang": "en"
  },
  {
    "intent": "unsure about the Australian tax resident statement, worried about fines, did not tick it",
    "question": "I read the Australian tax resident part but I'm not sure I'm eligible and if I'm not there will be fines, so I chose not to. Should I change this?",
    "examples": [
      "I'm not sure if I'm eligible as an Australian tax resident, will there be fines if I'm not?",
      "I didn't tick the resident box because I'm scared of getting fined, should I change it?",
      "what happens if I choose the wrong residency option, is there a penalty?"
    ],
    "answer": "Thanks for checking before answering, that is the right approach 😊 Please have a look at page 3 of the questions again, where the explanation is. What part exactly is unclear? Let me know and I will help you go through it. Nothing is lodged without our team's review, so there is no pressure to get it perfect on your own.",
    "keywords": [
      "resident",
      "residency",
      "eligible",
      "fines",
      "fine",
      "penalty",
      "tick",
      "unsure",
      "change"
    ],
    "tags": [
      "tax-question",
      "residency",
      "brand:wht"
    ],
    "lang": "en"
  },
  {
    "intent": "tax residency question (already paid, form submitted)",
    "question": "Unsure if I should put Australian tax resident or working holiday? I've already paid and sent in the form.",
    "examples": [
      "I already paid, but I'm not sure if I should have selected resident or working holiday maker on the form",
      "now that I've submitted everything, was I meant to put Australian tax resident or WHM?",
      "I'm a paying client, which residency option applies to me?"
    ],
    "answer": "Good question. It depends on your individual circumstances, and the ATO makes the final decision, so our team reviews it carefully as part of preparing your return rather than guessing.\n\nNothing more is needed from you on this. If we need anything further, we'll message you here.",
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
      "select",
      "paid",
      "submitted",
      "page three"
    ],
    "tags": [
      "tax-question",
      "residency",
      "paid",
      "brand:wht"
    ],
    "lang": "en"
  },
  {
    "intent": "tax residency question",
    "question": "Am I an Australian resident for tax purposes? Which option should I choose on the form?",
    "examples": [
      "I'm trying to work out if I'm an Australian resident for tax purposes",
      "which should I select, Australian resident or working holiday maker?",
      "I'm unsure if I'm an aus tax resident",
      "オーストラリア居住者でやってもらってもいいですか？"
    ],
    "answer": "Yes, that's definitely one of the many things we check before we lodge your tax return, so leave that with us. 😊",
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
      "residency",
      "brand:wht"
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
    "answer": "Every situation is different, even on the same visa, as it depends on your income, tax withheld and residency.\n\nWe follow the ATO rules, check that nothing you may be entitled to is overlooked, and explain the calculation clearly.",
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
      "I don't have receipts for these",
      "Zählen Handy und Kleidung auch ohne Beleg?",
      "ケータイ代や服は領収書がなくても申請に含まれますか？"
    ],
    "answer": "Anything you used for work and paid for yourself, with no reimbursement, may be claimable. For example phone or internet, tools, uniform or protective clothing, courses, licences, union fees, kilometres between work sites, or working from home.\n\nAfter payment we ask for everything in one message and go through it with you.\n\nReviewed and signed off by a registered tax agent before it is lodged with the ATO.",
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
      "can you lodge all three years?",
      "Wie lange darf mein Aufenthalt in Australien zurückliegen?",
      "過去の年度のタックスリターンもお願いできますか？"
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
    "intent": "existing client wants another year done as well",
    "question": "Can you also do my other year (the 24/25 return) while you're at it?",
    "examples": [
      "I'd like to process the other year (24/25) with you also if we could get that done",
      "can you do last year's return too now that you have my details?",
      "while you're doing this one, can you also lodge my 2024-2025 return?",
      "I also need my previous year done, same as this one"
    ],
    "answer": "Yes, we can do that year as well.\n\nEach tax year is lodged as its own return, so it is a separate fee: $220 for TFN only, or $385 for TFN + ABN. The team will confirm which applies and send you the details once your current return is sorted.",
    "keywords": [
      "other",
      "year",
      "also",
      "as well",
      "previous",
      "last",
      "24/25",
      "2024",
      "2025",
      "another",
      "return",
      "too"
    ],
    "tags": [
      "process",
      "pricing",
      "post-payment"
    ],
    "lang": "en"
  },
  {
    "intent": "surprised to owe tax after the estimate",
    "question": "I normally get a refund, why does it say I owe money?",
    "examples": [
      "I'm not really sure how to proceed because I normally get back 2500 bucks",
      "how can I owe? I always get money back",
      "this can't be right, I've never had to pay before",
      "why is it showing tax owing instead of a refund?"
    ],
    "answer": "I understand, that is not what you were expecting, especially after refunds in past years.\n\nThe figure comes from what was declared for this year, and the team will go through exactly what was entered with you so you can see where it comes from and check everything is correct before anything is lodged.",
    "keywords": [
      "owe",
      "owing",
      "normally",
      "usually",
      "refund",
      "get back",
      "why",
      "expected",
      "pay",
      "bill"
    ],
    "tags": [
      "post-payment",
      "estimate",
      "objection"
    ],
    "lang": "en"
  },
  {
    "intent": "super claim",
    "question": "Can you help me claim my superannuation (DASP)?",
    "examples": [
      "I would like to claim my tax refund and apply for my super",
      "can you do my super refund?",
      "Was ist mit meiner Superannuation?",
      "スーパーアニュエーションの払い戻しもお願いできますか？"
    ],
    "answer": "Unfortunately our superannuation (DASP) service is not available at the moment. We're happy to take care of your tax return. 😊",
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
    "answer": "No problem, and we appreciate you being upfront 😊\n\nIt’s completely your call. With us, a specialist reviews your residency, deductions and Medicare, then prepares and lodges everything for you, all online.\n\nIf your tax refund is less than our fee, we'll refund the difference. If there's no refund, our full fee applies. If you want peace of mind that everything is done properly, we’d be happy to help.",
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
      "is this the full fee or are there extra charges?",
      "Warum muss ich im Voraus bezahlen?",
      "なぜ先に支払いが必要なのですか？"
    ],
    "answer": "The $220 covers your TFN only return. A specialist reviews your full situation, checks that nothing you may be entitled to is overlooked, then prepares and lodges everything online.\n\nIt’s one fixed fee with no extras. If your tax refund is less than our fee, we'll refund the difference. If there's no refund, our full fee applies.",
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
    "answer": "That’s a really fair question!\n\nYou could handle it yourself, but working holiday tax can quickly become complicated with residency, deductions and Medicare.\n\nWith us, a specialist reviews your full situation, checks that nothing you may be entitled to is overlooked, then prepares and lodges everything online.\n\nIf your tax refund is less than our fee, we'll refund the difference. If there's no refund, our full fee applies.",
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
      "value",
      "brand:wht"
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
    "answer": "Completely understand wanting the best value 😊 The fee is fixed at $220 for a TFN only return and is the same for everyone, so we can’t reduce it.\n\nIf your tax refund is less than our fee, we'll refund the difference. If there's no refund, our full fee applies.",
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
    "answer": "Unfortunately our superannuation (DASP) service is not available at the moment. We're happy to take care of your tax return. 😊",
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
    "answer": "No problem, we can look at it. It depends on where it's up to:\n\nIf you only started it and haven't lodged, we simply prepare and lodge it for you as a normal tax return: $220 (TFN only) or $385 (TFN + ABN), which covers our team's full review.\n\nIf it's already been lodged, we review it and fix anything that was missed. The fee is $330 with TFN or $440 with ABN (GST included), one price, and is for the review itself, whatever the result.\n\nWhich one is it for you?",
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
    "answer": "Yes, it’s included at no extra charge. If an exemption may apply to you, our team handles it as part of your return.",
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
      "it won't let me open the document to sign",
      "Was ist das Passwort?",
      "パスワードは何ですか？"
    ],
    "answer": "Xero may have created your account automatically. Try the password 123456789. If it doesn't work, tap \"Forgot password\" on the login page and reset it by email. If it still doesn't open, send me a screenshot.",
    "keywords": [
      "sign",
      "signing",
      "documents",
      "xero",
      "login",
      "log",
      "account",
      "link",
      "open",
      "password"
    ],
    "tags": [
      "process",
      "signing"
    ],
    "lang": "en"
  },
  {
    "intent": "refund to a family member or friend's bank account",
    "question": "Can my refund go to my mum's / my friend's / my partner's account?",
    "examples": [
      "can the refund go to my mum's account?",
      "I closed my account, can you send it to my friend's account instead?",
      "can I use my partner's bank details for the refund?",
      "kann die Rückerstattung auf das Konto meiner Mutter gehen?",
      "還付金を友人の口座に振り込んでもらえますか？",
      "Kann die Rückerstattung auf mein deutsches Konto gehen?",
      "還付金を日本の口座で受け取れますか？"
    ],
    "answer": "The refund has to go to an active Australian bank account in your own name, it can't be paid to someone else's account.\n\nIf you don't have one any more, a Wise Australian account in your name (with a BSB and account number) works. Those details go in the questionnaire and the refund lands there.",
    "keywords": ["refund", "account", "mum", "mother", "friend", "partner", "family", "someone else", "name", "closed"],
    "tags": ["payment", "process"],
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
    "answer": "An active Australian bank account in your own name is needed, because the refund is paid straight into it.\n\nIf yours is closed, a Wise Australian account in your name (with a BSB and account number) works too. Those details go in the questionnaire.",
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
    "intent": "asked for the account name before paying",
    "question": "What's the account name please?",
    "examples": [
      "do you need any more information before I send it over? what's the account name please",
      "what name is the bank account under?",
      "my bank is asking for the account name to send the payment",
      "what do I write as the account name?",
      "what should I put for the name?",
      "what name do I use for the transfer?",
      "what do I write in the name field?",
      "should I write Working Holiday Tax or something else?",
      "what's the recipient name?",
      "what name should show up on my end?"
    ],
    "answer": "The account name is The Accounting Academy.\n\nBSB: 062692\nAccount: 81049952",
    "keywords": [
      "account",
      "name",
      "bank",
      "transfer",
      "payment",
      "before",
      "pay"
    ],
    "tags": [
      "pricing",
      "process",
      "payment"
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
    "answer": "Yes, that's the correct account. The account name is The Accounting Academy.\n\nBSB: 062692\nAccount: 81049952",
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
    "answer": "If your tax refund is less than our fee, we'll refund the difference. If there's no refund, our full fee applies.\n\nFor example: if your refund comes to less than the fee, you only end up paying what the refund was and we refund the rest. If you have tax to pay instead, the fee covers the work completed, and whether to lodge is then your decision.",
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
      "fee"
    ],
    "lang": "en"
  },
  {
    "intent": "request for a phone call",
    "question": "Can we have a quick call before I pay?",
    "examples": [
      "could we arrange a quick call please?",
      "can I speak to someone on the phone first?",
      "I'd feel better talking to a real person",
      "Kann ich euch anrufen?",
      "電話で相談できますか？"
    ],
    "answer": "Our service is fully online, which helps us keep it quick and affordable.\n\nWe don’t do calls, but we’re happy to answer any questions right here.",
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
    "answer": "Absolutely! We’ll review your return, check the calculation and see whether anything needs to be amended.\n\nThe fee is $330 with TFN or $440 with ABN (GST included). It covers the review and, if it is needed, lodging the amended return, whatever the result.",
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
    "answer": "Yes, the whole process is online, wherever you are, and you don’t need an active Australian phone number.\n\nOnce you’re our client, we access your income and tax information directly through the ATO, then prepare and lodge your return.\n\nThe only thing you need is an active Australian bank account in your name, as any refund is paid directly into it by the ATO.",
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
    "answer": "Thanks for explaining everything so clearly. Yes, that's definitely one of the many things we check before we lodge your tax return, so leave that with us. 😊",
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
    "answer": "Sorry for the confusion. We no longer offer free eligibility checks. We now provide a full review with personal guidance for $220.\n\nIf your tax refund is less than our fee, we'll refund the difference. If there's no refund, our full fee applies.",
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
    "intent": "when will the signature document arrive",
    "question": "When will I get the document to sign so it can be sent out?",
    "examples": [
      "when do I get the document to sign?",
      "how long until I can sign and it gets lodged?",
      "when will you send the signature form?",
      "wann bekomme ich das Dokument zum Unterschreiben?"
    ],
    "answer": "The team is preparing your document to sign and will send it as soon as it's ready.",
    "keywords": [
      "signature",
      "sign",
      "document",
      "when",
      "arrive",
      "send",
      "lodge",
      "ready"
    ],
    "tags": [
      "process",
      "timing",
      "signature"
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
    "answer": "Protective or occupation specific clothing is what we look at, such as high visibility clothing, safety boots and scrubs.\n\nIf you bought everyday clothing like ordinary trousers, jeans, trainers or black pants, tell us whether it was compulsory at work or used for work purposes. What can be claimed is confirmed in the review, before anything is lodged.\n\nIf your total work-related expenses are $300 or less, receipts generally aren't required, but you still need to show how you calculated the amount.",
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
    "answer": "Travel between home and your regular workplace generally can't be claimed, including tolls, buses or Ubers.\n\nTravel directly between work sites during the day is something we look at. If you used your own car for these trips, they may be included. Please send a logbook covering up to 5,000 km. We use the cents per kilometre method: 88 cents per km, up to 5,000 km.",
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
    "answer": "Courses and licences are something we look at if you were already working in the role and they were directly related to that job. Union and professional membership fees too.\n\nSend us the receipt, or a bank statement with the payment highlighted if you can't find it. We'll check what can be included.",
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
      "I'm moving money from UK account to Australian may take a while",
      "Kann ich von meinem deutschen Bankkonto bezahlen?",
      "日本の銀行口座から送金できますか？"
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
    "answer": "The fee is $220 per year for a TFN only return, so there's one fee for each return we lodge.",
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
    "answer": "That may be part of the reason, but we'll need to review your full return to confirm what caused it.\n\nWe'll check the calculation and see whether anything needs amending.",
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
      "process",
      "brand:wht"
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
    "answer": "Once you've paid and completed the form, our team reviews everything and messages you here.\n\nAfter you've signed, we'll lodge your return with the ATO. Any refund usually arrives in your bank account within 14 business days.",
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
    "answer": "It really depends on a lot of factors, like your residency, your income, the tax already taken from your pay and your deductions.\n\nWe can only give you an estimate after a thorough review of your specific case, and that review starts once payment is made.",
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
    "answer": "No worries at all, we completely understand.\n\nJust make sure you're comparing the same level of service. With us, your full situation is reviewed and you receive personal guidance throughout, not just a submitted return.\n\nWe never ask for your myGov login details. If you need help in the future, we're always here.",
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
      "Can I use my home country number on the form?",
      "Ich habe keine australische Telefonnummer und Adresse mehr, was trage ich ein?",
      "オーストラリアの電話番号が使えなくなりました、フォームには何を入力しますか？"
    ],
    "answer": "Please enter the Australian phone number and address you used while you were living in Australia, even if the number is not active anymore. The form needs an Australian mobile number to go through.",
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
      "Am I too late to do my tax return?",
      "Until when can this be submitted?"
    ],
    "answer": "It's not too late, we can still lodge it for you 😊 Returns lodged by a registered tax agent usually have more time than lodging yourself. The sooner we start, the better.",
    "keywords": [
      "deadline",
      "cut off",
      "31 october",
      "15 may",
      "lodge",
      "late",
      "financial year",
      "due date",
      "until when"
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
    "answer": "I can see where the confusion might have come from. The current fee for a TFN only return is $220.\n\nThat covers the whole return: a proper review of your situation, then preparing and lodging everything with the ATO.",
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
      "process",
      "brand:wht"
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
    "answer": "Tax residency isn't decided by your visa or length of stay alone. It depends on your full circumstances, and the ATO makes the final decision.\n\nOur team reviews your status as part of preparing your return, because it can affect your tax result.",
    "keywords": ["residency test","resident","criteria","five tests","whm","how decided","qualify","questionnaire","assess"],
    "tags": ["residency","tax-question","boundary",
      "brand:wht"
    ],
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
    "answer": "Whether the tax free threshold applies to you is covered in the review of your case, which starts once payment is made. You don't have to work it out yourself. 😊",
    "keywords": ["tax free threshold","18200","18k","threshold","resident","non resident","eligible","residency"],
    "tags": ["residency","tax-question",
      "brand:wht"
    ],
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
    "tags": ["process","residency",
      "brand:wht"
    ],
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
      "Which one do I have?",
      "Was genau ist in der TFN + ABN Option enthalten?",
      "TFNとABNの違いは何ですか？"
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
    "answer": "Unfortunately we can't do that. You're required to declare all your income, from every source, within your tax return, however small the ABN amount was. That means the TFN + ABN option ($385) is the one that applies here, not the TFN-only option.\n\nPlease send us your full ABN earnings reports, such as Uber or delivery reports, plus any related expenses. We'll make sure everything is included correctly.",
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
    "answer": "No one can promise a refund before the review, and I would be careful with anyone who does. What we promise is a proper review of your residency, deductions and Medicare so you get everything you are entitled to. The outcome itself is decided by the ATO.",
    "keywords": ["definitely","guaranteed","refund","get back","money back","eligible","confirm","rebate","positive"],
    "tags": ["objection","pricing","fee"],
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
      "answer": "Yes, our team looks at that as part of the review, under the supervision of a registered tax agent: your tax residency and which rate applies to you, based on your own circumstances, before anything is lodged. The ATO makes the final decision.\n\nNothing gets lodged until that's been looked at properly.",
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
          "residency",
      "brand:wht"
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
          "owing",
      "brand:wht"
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
  },
  {
      "intent": "small abn income still declared",
      "question": "I only earned a tiny amount on my ABN (Uber, delivery, a one-off job). Does that still have to be declared, and does it put me on the $385 plan?",
      "examples": [
          "I only made $20 on Uber during that period, does that mean I need the 385 plan?",
          "I did one delivery shift on an ABN, is that even worth declaring?",
          "It was a really small amount on my ABN, can I just ignore it?",
          "ウーバーで20ドルだけ稼いだんですけど、385のプランになりますよね？"
      ],
      "answer": "Yes, any income you earned in Australia has to be declared, whatever the amount.\n\nABN income is covered by the TFN + ABN option, so that's the one that fits. Want me to send the details?",
      "keywords": [
          "abn",
          "uber",
          "delivery",
          "small",
          "tiny",
          "only",
          "amount",
          "20",
          "declare",
          "declared",
          "report",
          "include",
          "385",
          "plan",
          "option",
          "one",
          "off",
          "shift"
      ],
      "tags": [
          "abn",
          "declaration"
      ],
      "lang": "en"
  },
  {
      "intent": "is the service worth it for me",
      "question": "I might not get much back, so is your service even worth it for someone like me?",
      "examples": [
          "I don't think I'd benefit from your service in my situation",
          "I haven't lived here 6 months so I might owe tax anyway, is there any point?",
          "Would I actually gain anything by paying you?"
      ],
      "answer": "What you're paying for is a return that's complete and correct, and that's worth having either way.\n\nOur team goes through your whole situation before anything is lodged, so nothing is missed and nothing is guessed. Shall I send you the details?",
      "keywords": [
          "worth",
          "benefit",
          "point",
          "gain",
          "pointless",
          "not",
          "much",
          "back",
          "owe",
          "anyway",
          "service",
          "for",
          "me",
          "situation"
      ],
      "tags": [
          "objection"
      ],
      "lang": "en"
  },
  // ── 11 Oct 2026: from the full audit of 386 conversations (the 13 gaps that needed no new fact from Jo) ──
  {
    "intent": "what is an ABN, is it my super",
    "question": "What is an ABN? Is that my super?",
    "examples": [
      "what's an ABN?",
      "is ABN my superannuation?",
      "I don't know if I have an ABN",
      "what does ABN mean"
    ],
    "answer": "An ABN is an Australian Business Number, used for money you earned as a contractor or sole trader, like Uber, delivery apps or freelance work. It's not your super. If you only had wages from employers, you're TFN only.",
    "keywords": [
      "abn",
      "what is",
      "super",
      "contractor",
      "sole trader",
      "uber"
    ],
    "tags": [
      "pricing",
      "process"
    ],
    "lang": "en"
  },
  {
    "intent": "my payslip shows an ABN",
    "question": "My payslip has an ABN on it, does that mean I had ABN income?",
    "examples": [
      "there's an ABN number on my payslip",
      "my employer's ABN is on the payslip, is that the ABN option?",
      "payslip has ABN, which option am I"
    ],
    "answer": "The ABN on a payslip is your employer's number. If you got payslips and tax came out of your pay, you were on a TFN. ABN income is only when you invoiced someone yourself.",
    "keywords": [
      "payslip",
      "abn",
      "employer",
      "tfn",
      "which option"
    ],
    "tags": [
      "pricing",
      "process"
    ],
    "lang": "en"
  },
  {
    "intent": "transfer shows pending",
    "question": "I sent the money but it shows pending, what now?",
    "examples": [
      "I paid but it says pending",
      "the transfer is still processing",
      "sent it, bank says pending until tomorrow",
      "payment pending on my end"
    ],
    "answer": "Thanks, I can see it's on its way. Transfers can take up to a business day to clear. I'll send you the form the moment it lands, nothing else to do for now.",
    "keywords": [
      "pending",
      "processing",
      "transfer",
      "sent",
      "clear",
      "on its way"
    ],
    "tags": [
      "payment",
      "process"
    ],
    "lang": "en"
  },
  {
    "intent": "paid more than the fee by mistake",
    "question": "I paid $250 instead of $220, what happens to the extra?",
    "examples": [
      "I accidentally sent $250",
      "I transferred too much",
      "paid 240 instead of 220 by mistake",
      "overpaid the fee"
    ],
    "answer": "No problem, the team will return the difference to the account you paid from. Send me the account name, BSB and number for it and we'll sort it, and your return starts as normal.",
    "keywords": [
      "overpaid",
      "too much",
      "extra",
      "difference",
      "mistake",
      "250",
      "240"
    ],
    "tags": [
      "payment",
      "process"
    ],
    "lang": "en"
  },
  {
    "intent": "friend or partner got an estimate before paying, why did it change",
    "question": "My friend got an estimate first and paid after, why is it different for me?",
    "examples": [
      "my partner got the estimate before paying last year",
      "why did your business model change?",
      "my friend didn't have to pay upfront",
      "you used to do the estimate first"
    ],
    "answer": "You're right, we used to work that way. We changed it because the review itself is most of the work. What hasn't changed: if your refund is less than our fee, we refund the difference. So the result for you is the same. Shall we start?",
    "keywords": [
      "estimate first",
      "friend",
      "partner",
      "before paying",
      "changed",
      "used to",
      "upfront"
    ],
    "tags": [
      "objection",
      "pricing"
    ],
    "lang": "en"
  },
  {
    "intent": "the website calculator says I owe tax",
    "question": "The calculator on your site says I owe money, is it worth lodging?",
    "examples": [
      "your calculator shows I owe $849",
      "the calculator says $1 owing",
      "calculator result is negative, should I still lodge?",
      "your estimate tool says I have to pay"
    ],
    "answer": "The calculator is a rough guide. It doesn't know your residency, your Medicare position or your deductions, and that's usually where the number moves. The review looks at all of that properly, and you see the result before anything is lodged.",
    "keywords": [
      "calculator",
      "owe",
      "owing",
      "negative",
      "website",
      "tool",
      "estimate"
    ],
    "tags": [
      "objection",
      "pricing"
    ],
    "lang": "en"
  },
  {
    "intent": "is the estimate the final number",
    "question": "Is the estimate the final amount I'll get?",
    "examples": [
      "is that the final number?",
      "will the refund be exactly the estimate?",
      "can the amount still change?",
      "is the estimate definite"
    ],
    "answer": "The estimate is what the team calculated from your documents. It's confirmed when the return is reviewed and sent to you for signature, and the ATO issues the final figure after lodgement.",
    "keywords": [
      "estimate",
      "final",
      "exact",
      "change",
      "definite",
      "amount"
    ],
    "tags": [
      "process",
      "post-payment"
    ],
    "lang": "en"
  },
  {
    "intent": "do you have someone who speaks my language",
    "question": "Do you have someone who speaks French / German / Japanese?",
    "examples": [
      "can I write in German?",
      "do you speak French?",
      "is there someone Japanese on your team?",
      "can we do this in Spanish?",
      "puedo escribir en español?"
    ],
    "answer": "Of course, we can continue in your language right here. Everything is done by message and through the form, so just write the way that's easiest for you.",
    "keywords": [
      "speak",
      "language",
      "french",
      "german",
      "japanese",
      "spanish",
      "italian",
      "write in"
    ],
    "tags": [
      "process"
    ],
    "lang": "en"
  },
  {
    "intent": "just arrived or about to start work, no return yet",
    "question": "I just arrived / I'm about to start working, can I lodge now?",
    "examples": [
      "I just got to Australia, what do I do about tax?",
      "I start my first job next week, can you do my tax return?",
      "I don't have a TFN yet, can I lodge?",
      "I only arrived last month"
    ],
    "answer": "Not yet, there's nothing to lodge until the tax year ends on 30 June. For now keep your payslips and receipts for work gear, and message us after 1 July and we'll take it from there.",
    "keywords": [
      "just arrived",
      "about to start",
      "first job",
      "no tfn yet",
      "new",
      "lodge now"
    ],
    "tags": [
      "process",
      "not-yet"
    ],
    "lang": "en"
  },
  {
    "intent": "employer owes back-pay, wait or lodge",
    "question": "My employer underpaid me and is paying it back, should I wait before lodging?",
    "examples": [
      "I'm getting back-pay next month, should we wait?",
      "my boss still owes me wages, lodge now or later?",
      "Fair Work is recovering my pay, what about my tax return?"
    ],
    "answer": "Yes, wait until the back-pay is through. It changes what your employer reports to the ATO, and lodging before that means an amendment later. Message me when it's paid and we start straight away.",
    "keywords": [
      "back-pay",
      "backpay",
      "underpaid",
      "owes me",
      "wait",
      "fair work"
    ],
    "tags": [
      "process"
    ],
    "lang": "en"
  },
  {
    "intent": "UK or Irish citizen, Medicare exemption",
    "question": "I'm a UK / Irish citizen, should I apply for the Medicare exemption?",
    "examples": [
      "I'm from the UK, does the Medicare exemption apply to me?",
      "I'm Irish, wouldn't my Medicare exemption just be rejected?",
      "UK passport, do I pay the Medicare levy?",
      "reciprocal health agreement and the exemption"
    ],
    "answer": "Whether the Medicare levy exemption applies depends on your own circumstances, including your Medicare entitlement during the year. The team confirms your position in the review, nothing for you to apply for unless they say so.",
    "keywords": [
      "uk",
      "british",
      "irish",
      "ireland",
      "medicare",
      "exemption",
      "reciprocal",
      "levy"
    ],
    "tags": [
      "medicare",
      "post-payment"
    ],
    "lang": "en"
  },
  {
    "intent": "paid customer asks what to do now",
    "question": "Did you do my taxes? What am I supposed to do now?",
    "examples": [
      "so what happens now?",
      "is my tax return done?",
      "what do I need to do next?",
      "have you lodged it already?",
      "what's the next step from me"
    ],
    "answer": "Nothing from you right now. Your return isn't lodged yet: the team finishes the review, you get the estimate here, then a document to sign by email, and only after your signature is it lodged.",
    "keywords": [
      "what now",
      "next step",
      "done",
      "lodged",
      "what do i do",
      "nothing"
    ],
    "tags": [
      "process",
      "post-payment"
    ],
    "lang": "en"
  },
  {
    "intent": "customer changed phone number",
    "question": "I changed my number, is my old chat gone?",
    "examples": [
      "this is my new number, my old one is cancelled",
      "I'm writing from a new number, do you still have my details?",
      "new sim, same person",
      "my old WhatsApp number doesn't work anymore"
    ],
    "answer": "No problem at all. What was your old number? I'll link it so the team sees your whole history, and we carry on from here.",
    "keywords": [
      "new number",
      "changed my number",
      "old number",
      "new sim",
      "same person"
    ],
    "tags": [
      "process"
    ],
    "lang": "en"
  },
  {"intent": "working from home expenses claim", "question": "Can I claim working from home for my job?", "examples": ["I worked from home", "home office expenses", "wfh deduction", "I did some work from home", "working from home hours"], "answer": "For a working from home claim, we need proof of the hours. Please send a timesheet or diary for the year showing the date, start and finish time, and what you did each time you worked from home. Once we have it, we'll check the claim with you.", "keywords": ["home", "wfh", "work from home", "home office", "hours", "diary", "timesheet", "claim"], "tags": ["process", "expenses"], "lang": "en"},
  {"intent": "car expenses for work claim", "question": "Can I claim my car for work?", "examples": ["car expenses", "I used my car for work", "kilometres for work", "I drive for work", "claim the car", "logbook"], "answer": "We can look at car costs, but only for work trips. Trips between home and your usual workplace can't go in, but trips between work sites during working hours may be included. Please send a logbook of your work trips covering up to 5,000 km, with the date, where you went, why, and the kilometres for each trip. We use the cents per kilometre method: 88 cents per km, up to 5,000 km. Please also send the registration number (rego), when you bought the car, how much it cost, and the make and model.", "keywords": ["car", "vehicle", "kilometres", "km", "logbook", "drive", "driving", "fuel", "petrol", "trip", "commute"], "tags": ["process", "expenses"], "lang": "en"},
  {"intent": "rideshare or delivery app expenses", "question": "I drove for Uber or DoorDash. What do I send?", "examples": ["I drive for Uber", "DoorDash income", "Uber expenses", "delivery driver expenses", "Menulog earnings", "rideshare work"], "answer": "Please send your Uber, DoorDash or other app reports for the year here in the chat, and include the total kilometres you drove for the work. We'll check it against the expenses you're claiming.", "keywords": ["uber", "doordash", "deliveroo", "menulog", "rideshare", "delivery", "driver", "report", "kilometres", "km"], "tags": ["process", "expenses", "income"], "lang": "en"},
  {"intent": "rental car used for work", "question": "I rented a car for work. What do I send?", "examples": ["I hired a car for work", "rental car", "car hire for work", "I rented a scooter for work", "rented a bike for work"], "answer": "Please send the rental invoice or receipt, along with the dates you hired it and what it was used for. We'll check that the work part is the part you're claiming.", "keywords": ["rent", "rental", "hire", "hired", "car hire", "scooter", "bike", "moped", "invoice", "receipt"], "tags": ["process", "expenses"], "lang": "en"},
  {"intent": "no invoices or bank statements for work expenses", "question": "I don't have invoices or bank statements. Can I still claim my work expenses?", "examples": ["I have no invoices", "I don't have receipts", "no bank statements", "I lost my receipts", "I didn't keep records"], "answer": "We can look at your work expenses without invoices, up to $300 in total. Please list what you spent, roughly when, and what it was for, and we'll go from there. 😊", "keywords": ["invoice", "invoices", "receipt", "receipts", "records", "bank statement", "no proof", "lost", "300", "expenses"], "tags": ["process", "expenses"], "lang": "en"},
  {"intent": "work expenses intake after payment", "question": "I have work expenses. What do I send?", "examples": ["I have some expenses", "I want to claim my phone and car", "what do you need for my expenses", "I had expenses for work"], "answer": "Thanks! One quick thing on work expenses. I'll ask for everything in one go, so you only need to reply once.\n\nWhat did you spend on for work? For example phone or internet, a car or kilometres driven, a bike, scooter or rental car, tools, uniform or protective clothing, courses, licences, registrations or union fees, or working from home. Just tell me what applies. \"None\" is a fine answer.\n\nIf you used a car or have fuel receipts: were these trips from home to work, or between work sites or to another job during working hours? Trips from home to work and personal trips, like lunch runs, can't go in. Trips between work sites during working hours may be included. If they were between sites, please send a logbook (trip diary) covering up to 5,000 km, with the date, from, to, purpose and km (a screenshot of your notes app is fine). We use the cents per kilometre method: 88 cents per km, up to 5,000 km. Please also send the car's registration number (rego), when you bought it, how much it cost, and the make and model, and tell us whether you own it or rent it. For a rental car, send the rental invoices and the logbook. For rideshare or delivery, send the app's yearly km report and your earnings summary.\n\nWorking from home: a diary or timesheet with the dates and hours.\n\nPhone and internet: the bills, and roughly what percentage you use for work.\n\nClothing: tell us exactly what you bought. If it was everyday clothing, like jeans, trainers or black pants, let us know whether it was compulsory at work or used for work purposes. What can be claimed is confirmed in the review, before anything is lodged.\n\nTools, courses and licences: a receipt, or a bank statement with the item highlighted.\n\nNo receipts? A list of the items is fine, up to $300. Just tell us what the items were.", "keywords": ["expenses", "receipts", "car", "kilometres", "phone", "uniform", "tools", "diary", "claim", "work"], "tags": ["post-payment", "expenses", "process"], "lang": "en"},
  {"intent": "work expenses intake after payment (German)", "question": "Ich habe Arbeitsausgaben. Was muss ich schicken?", "examples": ["Ich habe Ausgaben", "Handy und Auto beruflich", "welche Belege braucht ihr"], "answer": "Danke! Noch kurz zu den Arbeitsausgaben. Ich frage alles auf einmal, damit du nur einmal antworten musst.\n\nWofür hast du beruflich Geld ausgegeben? Zum Beispiel Handy oder Internet, Auto oder gefahrene Kilometer, Fahrrad, Roller oder Mietwagen, Werkzeug, Uniform oder Schutzkleidung, Kurse, Lizenzen, Registrierungen oder Gewerkschaftsbeiträge, oder Arbeiten von zu Hause. Schreib einfach, was zutrifft. \"Nichts\" ist auch eine gute Antwort.\n\nFalls du ein Auto genutzt hast oder Tankbelege hast: Waren das Fahrten von zu Hause zur Arbeit, oder zwischen Arbeitsorten oder zu einem anderen Job während der Arbeitszeit? Fahrten von zu Hause zur Arbeit und private Fahrten, zum Beispiel in der Mittagspause, können wir nicht aufnehmen. Fahrten zwischen Arbeitsorten während der Arbeitszeit können möglicherweise aufgenommen werden. Wenn es Fahrten zwischen Arbeitsorten waren, schick uns bitte ein Fahrtenbuch für bis zu 5.000 km mit Datum, von, nach, Zweck und Kilometern (ein Screenshot deiner Notizen-App reicht). Wir nutzen die Cent-pro-Kilometer-Methode: 88 Cent pro km, bis zu 5.000 km. Schick uns außerdem das Kennzeichen (Rego) des Autos, wann du es gekauft hast, was es gekostet hat sowie Marke und Modell, und sag uns, ob es dir gehört oder gemietet war. Bei einem Mietwagen schick die Mietrechnungen und das Fahrtenbuch. Bei Fahrdiensten oder Lieferdiensten schick den Jahresbericht der App mit den Kilometern und deine Einnahmenübersicht.\n\nArbeiten von zu Hause: ein Tagebuch oder Stundenzettel mit Datum und Stunden.\n\nHandy und Internet: die Rechnungen und ungefähr, wie viel Prozent du davon beruflich nutzt.\n\nKleidung: schreib uns genau, was du gekauft hast. Bei Alltagskleidung, zum Beispiel Jeans, Turnschuhen oder schwarzen Hosen, sag uns bitte, ob sie bei der Arbeit vorgeschrieben waren oder für die Arbeit genutzt wurden. Was angesetzt werden kann, wird in der Prüfung bestätigt, bevor etwas eingereicht wird.\n\nWerkzeug, Kurse und Lizenzen: ein Beleg oder ein Kontoauszug mit markierter Zahlung.\n\nKeine Belege? Eine Liste der Posten reicht bis zu $300. Schreib uns einfach, um welche Posten es sich handelt.", "keywords": ["expenses", "receipts", "car", "kilometres", "phone", "uniform", "tools", "diary", "claim", "work", "ausgaben", "belege"], "tags": ["post-payment", "expenses", "process"], "lang": "de"},
  {"intent": "work expenses intake after payment (Japanese)", "question": "仕事の経費があります。何を送ればいいですか？", "examples": ["経費があります", "携帯と車を使いました", "領収書は必要ですか"], "answer": "ありがとうございます！仕事に関わる経費について、ひとつだけ確認させてください。一度で済むよう、まとめてお聞きします。\n\n仕事のためにどんなものにお金を使いましたか？たとえば、携帯電話やインターネット、車や走行距離、自転車・スクーター・レンタカー、工具、制服や保護具、講習・免許・登録料・組合費、在宅勤務などです。当てはまるものだけ教えてください。「なし」でも大丈夫です。\n\n車を使った場合や、ガソリンのレシートがある場合は、自宅から職場への移動でしたか？それとも、勤務時間中の現場間の移動や、別の仕事先への移動でしたか？自宅から職場への移動や、昼食の買い出しなどの私用の移動は含められません。勤務時間中の現場間の移動は、含められる可能性があります。現場間の移動の場合は、5,000kmまでの走行記録(ログブック)を、日付、出発地、目的地、目的、距離(km)を書いてお送りください(メモアプリのスクリーンショットで大丈夫です)。1キロあたりのセントで計算する方法を使います：1kmあたり88セント、5,000kmまでです。あわせて、車両登録番号(ナンバープレート)、購入時期、購入金額、メーカーと車種、所有かレンタルかも教えてください。レンタカーの場合は、レンタルの請求書と走行記録をお願いします。配車や配達の仕事の場合は、アプリの年間走行距離レポートと収入の概要をお送りください。\n\n在宅勤務：日付と時間がわかる日誌またはタイムシートをお願いします。\n\n携帯電話とインターネット：請求書と、仕事で使う割合のだいたいの目安を教えてください。\n\n衣類：購入したものを具体的に教えてください。ジーンズ、スニーカー、黒いパンツなどの普段着の場合は、仕事で着用が義務付けられていたか、仕事の目的で使用したかを教えてください。何を申告できるかは、提出前の確認で判断します。\n\n工具、講習、免許：領収書、または該当の支払いに印をつけた銀行明細をお願いします。\n\n領収書がない場合は、品目のリストで大丈夫です(合計$300まで)。どんな品目だったかを教えてください。", "keywords": ["expenses", "receipts", "car", "kilometres", "phone", "uniform", "tools", "diary", "claim", "work", "経費", "領収書"], "tags": ["post-payment", "expenses", "process"], "lang": "ja"},
  {"intent": "what can i claim before paying", "question": "What can I claim? What do you need from me for expenses?", "examples": ["what expenses can I claim", "which deductions are there", "what proof do you need for expenses", "can I claim my phone and car"], "answer": "Anything you used for work and paid for yourself, with no reimbursement, may be claimable. For example phone or internet, tools, uniform or protective clothing, courses, licences, union fees, kilometres between work sites, or working from home.\n\nAfter payment we ask for everything in one message and go through it with you.\n\nReviewed and signed off by a registered tax agent before it is lodged with the ATO.", "keywords": ["what can i claim", "expenses", "deductions", "receipts"], "tags": ["pre-payment", "expenses"], "lang": "en"},
  {"intent": "what can i claim before paying (German)", "question": "Was kann ich absetzen? Was braucht ihr für Ausgaben?", "examples": ["welche Ausgaben kann ich angeben", "welche Abzüge gibt es", "welche Belege braucht ihr"], "answer": "Alles, was du für die Arbeit genutzt und selbst bezahlt hast, ohne dass es dir erstattet wurde, kann möglicherweise geltend gemacht werden. Zum Beispiel Handy oder Internet, Werkzeug, Uniform oder Schutzkleidung, Kurse, Lizenzen, Gewerkschaftsbeiträge, Kilometer zwischen Arbeitsorten oder Arbeiten von zu Hause.\n\nNach der Zahlung fragen wir alles in einer einzigen Nachricht ab und gehen es gemeinsam mit dir durch.\n\nVon einem registrierten australischen Tax Agent geprüft und freigegeben, bevor sie beim ATO eingereicht wird.", "keywords": ["what can i claim", "expenses", "deductions", "receipts", "absetzen", "abzüge", "belege"], "tags": ["pre-payment", "expenses"], "lang": "de"},
  {"intent": "what can i claim before paying (Japanese)", "question": "何が経費として認められますか？経費には何が必要ですか？", "examples": ["どんな経費がありますか", "控除できるもの", "必要な証拠は何ですか"], "answer": "仕事で使い、ご自身で支払い、払い戻しを受けていないものは、申告できる可能性があります。たとえば、携帯電話やインターネット、工具、制服や保護具、講習、免許、組合費、現場間の移動距離、在宅勤務などです。\n\nお支払い後に、必要なものを一度のメッセージでまとめてお聞きし、一緒に確認していきます。\n\nATOに提出される前に、オーストラリアの登録タックスエージェントが確認し、承認します。", "keywords": ["what can i claim", "expenses", "deductions", "receipts", "経費", "控除"], "tags": ["pre-payment", "expenses"], "lang": "ja"},
  {"intent": "car trips home to work or between sites", "question": "I used my car for work. What do I send?", "examples": ["I drove to work", "I did a lot of kilometres", "I use my car for my job", "claim petrol"], "answer": "First, were these trips from home to work, or between work sites or to another job during working hours? Trips from home to work and personal trips, like lunch runs, can't go in. Trips between work sites during working hours may be included.\n\nIf they were between sites, please send a logbook (trip diary) covering up to 5,000 km, with the date, from, to, purpose and km (a screenshot of your notes app is fine). We use the cents per kilometre method: 88 cents per km, up to 5,000 km.\n\nPlease also send the car's registration number (rego), when you bought it, how much it cost, the make and model, and whether you own it or rent it. For a rental car, send the rental invoices and the logbook. For rideshare or delivery, send the app's yearly km report and your earnings summary.", "keywords": ["car", "kilometres", "km", "trip", "diary", "commute", "petrol", "fuel", "rental", "uber", "doordash"], "tags": ["expenses", "process"], "lang": "en"},
  {"intent": "expenses mentioned after ticking no expenses", "question": "I ticked no expenses in the form but I do have some", "examples": ["I forgot to add expenses", "I do have receipts actually", "I want to add my phone and tools", "I said no expenses but"], "answer": "No problem at all, just send them here. Tell me what you spent on for work, and send the receipts or a bank statement with the items highlighted. If you have no receipts, a list of the items is fine up to $300, just tell me what the items were. If any of it is a car expense or fuel receipts, tell me whether the trips were from home to work or between work sites.", "keywords": ["forgot", "expenses", "ticked", "form", "add", "receipts", "no expenses"], "tags": ["post-payment", "expenses"], "lang": "en"},
  {"intent": "customer asks for a refund of our fee", "question": "I want my fee refunded. How do I get it?", "examples": ["can I get my money back", "please refund me", "I'd like a refund of what I paid you", "when will I get my refund of the fee"], "answer": "Sorry to hear that. Please send me your full name, BSB and account number here. The refund is paid within 14 days of when we have your details.", "keywords": ["refund", "fee", "money back", "paid", "bsb", "account", "process"], "tags": ["post-payment", "refund-fee"], "lang": "en"},
  {"intent": "status of the refund of our fee", "question": "Where is the refund of your fee? It's been days", "examples": ["still waiting for my refund of the fee", "any update on my refund", "when does the money come back", "I haven't received my money back"], "answer": "Thanks for checking. Once we have your full name, BSB and account number, the refund is paid within 14 days. If you have already sent them and it has been more than 14 days, let me know and I will pass it straight to the team.", "keywords": ["refund", "fee", "waiting", "update", "status", "money back", "when"], "tags": ["post-payment", "refund-fee"], "lang": "en"},
  {"intent": "overseas and cannot log in to myGov or the ATO", "question": "I'm overseas and can't log in to myGov or the ATO", "examples": ["the ATO locked my account", "I keep trying to log in", "I called the ATO and they said", "my myGov is locked"], "answer": "You never need to sign in to myGov or the ATO for this, and please don't keep attempting it or call them, because repeated attempts from overseas can lock the account. We deal with the ATO directly. 😊", "keywords": ["mygov", "ato", "login", "locked", "overseas", "account", "log in", "call"], "tags": ["pre-payment", "post-payment", "ato"], "lang": "en"},
  {"intent": "owes tax after lodgement is it ready to pay", "question": "I owe tax. Is it ready to pay? How do I pay?", "examples": ["when do I pay the ATO", "is the notice ready", "how much do I have to pay", "where do I find what I owe", "Wie zahle ich die Steuern an das ATO?", "ATOへの支払いはどうすればいいですか？"], "answer": "Within 14 days of lodging you will receive an email from the ATO with the payment request and how to pay. If it has not arrived, message us here and we will send it to you directly in the chat. 😊", "keywords": ["owe", "pay", "notice", "ready", "due", "amount", "how to pay"], "tags": ["post-payment", "payable"], "lang": "en"},
  {"intent": "fuel receipts or a car expense mentioned", "question": "I have fuel receipts for work", "examples": ["I bought petrol for work", "I have my petrol receipts", "I drove for work and filled up", "can I claim fuel", "Ich habe Fahrten zu den Baustellen mit meinem eigenen Auto gemacht", "ガソリン代は経費にできますか？"], "answer": "Thanks! First, were these trips from home to work, or between work sites or to another job during working hours? Trips from home to work can't go in, but trips between work sites during working hours may be included.\n\nIf they were between sites, please send a logbook (trip diary) covering up to 5,000 km. We use the cents per kilometre method: 88 cents per km, up to 5,000 km. Please also send the car's registration number (rego), when you bought it, how much it cost, and the make and model.", "keywords": ["fuel", "petrol", "receipts", "car", "logbook", "rego", "kilometres", "88 cents", "5,000"], "tags": ["post-payment", "expenses", "car"], "lang": "en"},
  {"intent": "when is the difference refunded under the guarantee", "question": "When do I get the difference back if my refund is less than your fee?", "examples": ["when do you refund the difference", "how long until the guarantee refund", "the refund was less than your fee, what now"], "answer": "If your refund is less than our fee, we refund the difference after your Notice of Assessment. It is paid within 14 days of the Notice of Assessment. Please send your full name, BSB and account number here so we have them ready. This applies to TFN only returns we prepare. With ABN income, foreign income or a return that was already lodged, the fee is fixed whatever the result.", "keywords": ["guarantee", "difference", "notice of assessment", "refund", "14 days", "fee"], "tags": ["post-payment", "refund-fee", "guarantee"], "lang": "en"},
  {"intent": "does the guarantee apply with ABN or foreign income or an already lodged return", "question": "Does the guarantee apply to me with ABN or foreign income?", "examples": ["is there a guarantee with ABN", "guarantee for a return I already lodged", "guarantee with foreign income", "Was passiert, wenn meine Rückerstattung kleiner ist als eure Gebühr?", "還付金が料金より少なかった場合はどうなりますか？"], "answer": "The guarantee is for TFN only returns that we prepare and lodge: if your refund is less than our fee, we refund the difference, and if there is no refund or tax to pay, the full fee applies. With ABN income, foreign income, or a review of a return that was already lodged, the fee is fixed whatever the result.", "keywords": ["guarantee", "abn", "foreign income", "already lodged", "fixed fee"], "tags": ["pre-payment", "guarantee"], "lang": "en"},
  {"intent": "super withdrawal DASP availability or price", "question": "When will you offer DASP again? How much is it?", "examples": ["is the super refund available yet", "how much for the super withdrawal", "can you do my DASP now", "super refund when I leave"], "answer": "Unfortunately our superannuation (DASP) service is not available at the moment. We're happy to take care of your tax return. 😊", "keywords": ["dasp", "super", "superannuation", "withdrawal", "price", "available"], "tags": ["pre-payment", "post-payment", "super"], "lang": "en"},
  {"intent": "the ATO payment email did not arrive", "question": "I owe tax and the ATO email never arrived", "examples": ["I didn't get the email from the ATO", "where is the payment request", "no email about paying the ATO", "14 days passed and nothing came"], "answer": "Sorry about that. I have passed this on and the payment details will be sent to you directly here in this chat. 😊", "keywords": ["owe", "pay", "ato", "email", "did not arrive", "payment request", "how to pay"], "tags": ["post-payment", "payable"], "lang": "en"},
  {"intent": "can I talk to you in Japanese", "question": "日本語で相談できますか？", "examples": ["can I write in Japanese", "do you speak Japanese", "日本語で大丈夫ですか", "日本語で話せますか"], "answer": "はい、日本語でご相談いただけます。こちらで日本語でお答えしますし、必要に応じて担当者も対応します。お気軽にどうぞ。", "keywords": ["japanese", "日本語", "相談"], "tags": ["pre-payment", "post-payment", "language"], "lang": "ja"},
  {"intent": "everyday clothing bought for work", "question": "Can I claim my jeans, trainers or black pants for work?", "examples": ["I bought black pants for work", "I had to buy work shoes", "jeans for my job", "trainers for work"], "answer": "Thanks for telling me. Were they compulsory at work, or used for work purposes? Let me know and I will note your answer. What can be claimed is confirmed in the review, before anything is lodged.", "keywords": ["jeans", "trainers", "black pants", "clothing", "compulsory", "work purposes"], "tags": ["post-payment", "expenses"], "lang": "en"}
];
