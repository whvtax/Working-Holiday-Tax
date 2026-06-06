export type Category =
 | "TFN"
 | "ABN"
 | "Tax Return"
 | "Super"
 | "Work Rights"
 | "Medicare & Other";

export interface Guide {
 slug: string;
 title: string;
 description: string;
 category: Category;
 date: string;
 readTime: number;
 body: string;
}

export const guides: Guide[] = [
 // ─── TFN ───────────────────────────────────────────────────────────────────
 {
 slug: "what-is-a-tfn",
 title: "What is a TFN? Tax File Number guide for working holiday makers in Australia",
 description:
 "A Tax File Number (TFN) is your personal tax ID in Australia. What it is, why working holiday makers on 417 and 462 visas need one, and how it affects your pay and tax return.",
 category: "TFN",
 date: "1 July 2024",
 readTime: 5,
 body: `
A Tax File Number (TFN) is a unique 9-digit identifier issued by the Australian Taxation Office (ATO) to every person who earns income in Australia. You need one because, without it, your employer is legally required to withhold tax at 45% instead of the 15% working holiday maker rate. The TFN is permanent, free, and stays with you for life.

Every worker in Australia needs a TFN, whether they are a citizen, a permanent resident, or a backpacker on a working holiday visa. The ATO uses it to track your income, your tax payments, and any refunds you may be owed.

## Why does a TFN matter from day one?

The TFN determines how much tax your employer withholds from your pay. As a working holiday maker with a TFN on file, the rate that applies to your wages is 15%. Without one, your employer must withhold at 45%, the top marginal rate.

The difference adds up fast:

- Weekly wage of $1,000: extra $320 withheld every week without a TFN
- Weekly wage of $1,500: extra $480 withheld every week without a TFN
- Over three months of full-time work, that is thousands of dollars sitting with the ATO instead of in your bank account

You can recover the excess at tax time, but you lose access to that money in the meantime.

## What does the ATO use your TFN for?

The ATO uses your TFN as the link between you and every part of your financial life in Australia. It is required to:

- Lodge your [annual tax return](/tax-return) at the end of each financial year
- Access your [superannuation](/superannuation) account and claim it when you leave
- Open certain Australian bank accounts at the correct (non-withholding) rate
- Receive any tax refunds you are entitled to

Every other tax obligation, including a tax return, a super claim, or an ABN registration, connects back to your TFN.

## Who can apply for a TFN in Australia?

Any visa holder with the right to work in Australia can apply for a TFN. This includes:

- Working Holiday Visa subclass 417
- Work and Holiday Visa subclass 462
- Student visas with work rights
- Most temporary skilled work visas

The application is free, takes around 10 minutes, and is processed within 28 days. Our team handles the entire application on your behalf so you do not need to deal with the paperwork yourself.

## How do you give your TFN to your employer?

Once you receive your TFN, complete a Tax File Number Declaration form for each employer you work for. This form tells your employer what tax rate to apply to your wages and is the legal document that triggers the correct 15% rate.

Submit the form promptly. Until your employer has it on file, they must withhold at the highest rate, regardless of your visa type. This includes every employer you work for, even casual and short-term roles.

## What happens if you have already started work without a TFN?

Apply for your TFN as soon as possible and let your employer know your application is in progress. Show them the confirmation email from the ATO if you have it. Once your TFN is registered with them, the correct tax rate applies to all future pay.

Any tax overpaid before your TFN was on file can be reclaimed when you lodge your [tax return](/tax-return) at the end of the financial year. You do not permanently lose that money, as long as you lodge a return before the deadline.

[Get in touch with our team](/contact) to apply for your TFN under the supervision of a registered tax agent or to fix any issues with an existing application.
 `,
 },
 {
 slug: "how-to-apply-for-a-tfn",
 title: "How to apply for a TFN in Australia (working holiday maker guide)",
 description:
 "Step-by-step guide to applying for a Tax File Number (TFN) as a working holiday maker on a 417 or 462 visa. Application process, ID required, processing time and what to do while you wait.",
 category: "TFN",
 date: "7 July 2024",
 readTime: 4,
 body: `
To apply for a Tax File Number (TFN) as a working holiday maker, you submit an online application directly to the Australian Taxation Office (ATO). The application is free, takes around 10 minutes to complete, and your TFN arrives by post within 28 days. You can apply as soon as your working holiday visa is granted, even before you arrive in Australia, as long as you have a valid Australian postal address.

## Who processes your TFN application?

TFN applications for foreign passport holders are processed by the Australian Taxation Office (ATO). After approval, your TFN is sent to you by post within 28 days, often sooner during quiet processing periods.

## What you need before you apply

To complete your TFN application, you need:

- Your passport (number, date of birth, and visa details)
- A valid Australian residential address where the ATO can post your TFN letter
- A valid email address to receive application confirmations

If you have not yet found permanent accommodation, a hostel address works fine, as long as you are confident you will still be there when the letter arrives. You will receive two emails from the ATO: one confirming receipt of your application and another when it has been processed.

## How the TFN application process works step by step

Once you submit your application, the ATO sends a reference number by email confirming the application is in progress. Keep this reference number, as it is the easiest way to follow up if anything goes wrong.

Your TFN itself arrives as a letter posted to your Australian address within 28 days. Store this letter somewhere safe. The ATO can help you retrieve a forgotten TFN later, but it is much easier to keep the original on hand.

## Can you start work before your TFN arrives?

Yes. You can start working before your TFN arrives, but inform your employer that your application is in progress and show them the ATO confirmation email if you can. Technically, employers are required to withhold tax at 45% until they have your TFN on file, but some accept the confirmation email and apply a lower rate.

Any excess tax withheld during the waiting period can be recovered when you lodge your [tax return](/tax-return) at the end of the financial year.

## What to do once your TFN arrives

When your TFN letter arrives:

1. Complete a Tax File Number Declaration form for each employer you work for
2. Return the form to your employer promptly
3. Confirm the correct 15% working holiday maker tax rate is applied on your next payslip

Each employer needs their own Tax File Number Declaration form. Providing your TFN to one employer does not automatically share it with others.

[Get in touch with our team](/contact) to apply for your TFN under the supervision of a registered tax agent or to fix any issues with an existing application.
 `,
 },
 {
 slug: "how-long-does-it-take-to-get-a-tfn",
 title: "How long does it take to get a TFN in Australia? (2025-26 guide)",
 description:
 "Most TFN applications are processed within 28 days by the ATO. What working holiday makers can expect, what to check if it is taking longer, and how to work in the meantime.",
 category: "TFN",
 date: "15 July 2024",
 readTime: 4,
 body: `
A TFN application in Australia is processed within 28 days by the Australian Taxation Office (ATO). In practice, many applicants receive their Tax File Number within two weeks, though the exact timing depends on the ATO's current workload. Your TFN arrives as a letter posted to your Australian address. There is no email or SMS delivery.

## How is your TFN delivered?

Your TFN arrives as a physical letter posted to the Australian address you provided in your application. The letter contains your 9-digit TFN and basic information about how to use it.

Important points to know about delivery:

- The TFN is never sent by email or SMS, only by post
- It is mailed to the Australian address listed on your application
- If you move before the letter arrives, it may be delivered to your old address
- The ATO can resend the TFN if the letter is lost, but only after verifying your identity

If you are moving between hostels, use the address of somewhere you will be for at least four weeks to give the letter time to arrive.

## What can you do while waiting for your TFN?

You do not need to wait for your TFN before starting work. You can begin working immediately and inform your employer that your application is in progress.

Until your employer has your TFN on file, the standard rule is that they must withhold tax at 45%. Some employers accept the ATO confirmation email as evidence the application is underway and may apply a lower rate, although this is at their discretion.

Any excess tax withheld during the waiting period can be recovered when you lodge your [tax return](/tax-return) at the end of the Australian financial year.

## What if 28 days pass and your TFN has not arrived?

If more than 28 days have passed and your TFN letter has not arrived, take these steps:

1. Re-check the address you provided was correct (typos in postcode, suburb, or street number are the most common cause of delays)
2. Confirm the date the ATO acknowledged your application (the 28 days starts from then, not the day you clicked submit)
3. [Get in touch with our team](/contact) by phone with your reference number from the confirmation email

In most cases, delays are caused by incorrect address details or a lost letter. The ATO can confirm whether your TFN has been issued and arrange to resend it if necessary.

## What to do after your TFN arrives

Once you have your TFN, give it to your employer immediately with a completed Tax File Number Declaration form. This is the document that triggers the correct 15% working holiday maker tax rate on your wages going forward.

Your TFN is also required to lodge your [tax return](/tax-return) and access your [superannuation](/superannuation) account when you leave Australia.
 `,
 },
 {
 slug: "can-you-start-work-without-a-tfn",
 title: "Can you start work in Australia without a TFN? Working holiday rules explained",
 description:
 "You can start a job before you receive your TFN, but tax is withheld at 45% until you provide one. What working holiday makers should know about the 28-day rule and how to avoid losing pay.",
 category: "TFN",
 date: "16 July 2024",
 readTime: 4,
 body: `
Yes, you can legally start work in Australia without a TFN. There is no law that prevents you from being employed before your Tax File Number is issued. However, your employer is required by law to withhold tax at 45% (the top marginal rate) until you provide both your TFN and a completed Tax File Number Declaration form.

## What happens to your tax without a TFN?

Without a TFN on file, your employer must withhold tax at the top marginal rate of 45%. This is not optional. It is a legal requirement the employer must follow to remain compliant with the ATO.

The 45% rate applies from your very first shift and continues until you provide your TFN. For a working holiday maker who would otherwise pay 15% tax, this means an extra 30 cents is withheld from every dollar you earn during the waiting period.

## Does the overpaid tax come back to you?

Yes. The excess tax withheld before your TFN was registered can be reclaimed when you lodge your [tax return](/tax-return) at the end of the Australian financial year. The ATO reconciles what you actually owed against what was withheld, and refunds the difference to your Australian bank account.

The catch is timing. You do not permanently lose the money, but you lose access to it for months until tax time. For backpackers working on tight budgets, that delay is a real inconvenience.

## What is the practical advice?

To minimise the period of higher withholding:

- Apply for your TFN as early as possible, ideally before your first day of work
- If you have already started without one, apply immediately and tell your employer the application is in progress
- Show your employer the ATO confirmation email as evidence
- Provide your TFN and a Tax File Number Declaration form to your employer the moment your TFN arrives

Processing typically takes up to 28 days, so the earlier you apply, the less time you spend losing the extra 32%.

## What about cash in hand work?

If you are being paid cash in hand, the TFN question is handled differently because no formal payroll exists. For more on how that works and the tax implications, see our article on [cash in hand work in Australia](/blog/can-your-employer-pay-you-cash-in-hand).

[Get in touch with our team](/contact) to apply for your TFN under the supervision of a registered tax agent or to fix any issues with an existing application.
 `,
 },
 {
 slug: "what-happens-without-your-tfn",
 title: "Tax withheld at 45%? What happens if your employer does not have your TFN",
 description:
 "Without a TFN, Australian employers must withhold tax at the top marginal rate of 45%. What it means for working holiday makers, when you can claim back the overpaid tax, and how to fix it fast.",
 category: "TFN",
 date: "23 July 2024",
 readTime: 4,
 body: `
If your employer does not have your Tax File Number on file, they must withhold tax at 45% under Australian tax law. This is the highest marginal tax rate and applies from your first shift until you provide your TFN along with a completed Tax File Number Declaration form. Your employer has no discretion on this. The obligation comes from the ATO.

## How does this affect your take-home pay?

The standard working holiday maker tax rate is 15%. When your employer withholds at 45% instead, the difference comes straight out of your pocket in the short term.

Example impact at different weekly wages:

- Weekly wage of $1,000: extra $320 withheld each week
- Weekly wage of $1,500: extra $480 withheld each week
- Weekly wage of $2,000: extra $640 withheld each week

Over a few weeks, that gap becomes significant. You do not permanently lose the money, but you will not see it again until you lodge your [tax return](/tax-return) and the ATO refunds the excess.

## What should you do right now?

The fix is straightforward and time-sensitive:

1. Apply for your TFN if you have not already done so
2. Once you receive it, complete a Tax File Number Declaration form
3. Give the form to your employer immediately
4. The correct 15% rate then applies to all future pay

If your application is still in progress, show your employer the ATO confirmation email. Some employers will adjust the withholding rate once they see the application is underway, though they are not legally required to.

## Will you get the overpaid tax back?

Yes. The excess tax withheld during the period before your TFN was on file is credited against your tax liability when you lodge your [annual tax return](/tax-return). The ATO calculates the difference between what you actually owed and what was withheld, then refunds the amount to your Australian bank account.

The deadline is 31 October following the end of each financial year (1 July to 30 June). If you lodge under the supervision of a registered tax agent, the deadline can be extended.

## Giving your TFN to multiple employers

If you work for more than one employer during your time in Australia, each one needs your TFN separately. Providing it to one employer does not automatically share it with others. Submit a Tax File Number Declaration form to every employer you work for, including casual and short-term roles.

[Get in touch with our team](/contact) to apply for your TFN under the supervision of a registered tax agent or to fix any issues with an existing application.
 `,
 },
 {
 slug: "tfn-vs-abn-difference",
 title: "TFN vs ABN: the difference for working holiday makers in Australia",
 description:
 "TFN is your personal tax ID for employment income. ABN is for self-employed or contractor work. Which one working holiday makers on 417 and 462 visas need, and when you might need both.",
 category: "TFN",
 date: "31 July 2024",
 readTime: 5,
 body: `
A Tax File Number (TFN) is your personal tax identifier used when you are employed and earning wages. An Australian Business Number (ABN) is a business identifier used when you operate as a sole trader or independent contractor and invoice clients for your work. Most working holiday makers in standard employment need only a TFN. You need an ABN only if you are running your own business or contracting independently. Many backpackers end up holding both.

## What is a TFN used for?

A TFN is your personal tax identifier. Every individual in Australia who earns income needs one, regardless of whether they are employed or self-employed. The ATO uses your TFN to link your income to you and determine the correct tax rate.

You need a TFN when:

- You are working as an employee on a payroll
- Your employer is deducting PAYG tax from your wages
- Your employer is paying superannuation contributions on your behalf
- You are lodging a tax return at the end of the financial year

This covers the vast majority of working holiday makers in hospitality, retail, farm work as an employee, warehouses, and similar roles.

## What is an ABN used for?

An ABN is an 11-digit number issued to businesses and sole traders. It is used when you are operating as an independent contractor rather than an employee.

You need an [ABN](/abn) when:

- You are invoicing clients for your services
- You set your own hours and methods of work
- You use your own equipment and tools
- You take on financial risk for the work
- You are responsible for setting aside your own tax and super

ABNs are common among working holiday makers doing gig economy work, freelance work, certain piece-rate farm arrangements, and any work where the business asks you to invoice them rather than putting you on the payroll.

## Can you have a TFN and an ABN at the same time?

Yes. Many working holiday makers hold both simultaneously. Your TFN is always required because it is your personal tax identifier. You use your ABN only when invoicing for contractor work. The two numbers serve different purposes, and holding both is normal if your situation involves both employment and contracting.

## How do you work out which one applies to you?

The key question is whether the business paying you is treating you as an employee or a contractor:

- **Employee**: They put you on the payroll, deduct PAYG tax, pay super on top of your wages, and direct how you work. You need a TFN.
- **Contractor**: They ask you to invoice them, you set aside your own tax and super, and you control how the work is done. You need an [ABN](/abn).

If you are unsure which situation applies, our article on [the difference between employees and contractors in Australia](/blog/employee-vs-contractor-australia) goes into the legal tests in more detail.

[Get in touch with our team](/contact) to apply for your TFN under the supervision of a registered tax agent or to fix any issues with an existing application.
 `,
 },
 {
 slug: "apply-for-tfn-before-arriving",
 title: "Can you apply for a TFN before arriving in Australia? Working holiday guide",
 description:
 "For most working holiday visa holders, you must be in Australia before applying for a TFN. What you can prepare in advance, what documents you need, and when to apply for the fastest processing.",
 category: "TFN",
 date: "20 August 2024",
 readTime: 4,
 body: `
Yes, you can apply for an Australian Tax File Number (TFN) before you arrive in Australia, as long as your working holiday visa has already been granted. The ATO allows foreign passport holders to submit a TFN application online from overseas, provided they have a valid Australian postal address where the TFN letter can be sent. Applying early means your TFN may arrive around the same time you do, avoiding the period of 45% tax withholding that applies before your TFN is registered with your employer.

## Why is applying for a TFN early worth it?

Applying for your TFN before arriving means it can be processed while you are still travelling or preparing for your trip. By the time you start your first job, your TFN may already be waiting for you, allowing your employer to apply the correct 15% working holiday maker tax rate from day one.

The benefits in numbers:

- Application takes around 10 minutes online
- Processing time is up to 28 days
- Apply one month before arrival and your TFN may be there when you land
- Avoids weeks of 45% withholding that would otherwise be reclaimed only at tax time

## What do you need to apply from overseas?

To apply for an Australian TFN from outside Australia, you need:

- A valid Australian working holiday visa that has already been granted (not just applied for)
- Your passport number, visa details, and date of birth
- A valid Australian postal address where the ATO can send your TFN letter
- A valid email address for application confirmations

The address requirement is the main complication. The ATO sends your TFN as a physical letter to an Australian address. If you have booked accommodation for your first weeks in Australia, you can use that address. A hostel address works fine if you can reliably receive mail there.

If you do not yet have a confirmed Australian address, it may be easier to wait until you arrive and have somewhere to stay before applying.

## What if your visa changes or is cancelled?

If your visa situation changes between applying for your TFN and arriving in Australia, [get in touch with our team](/contact) to update your details. Your TFN itself is permanent and does not expire even if your visa does. However, the records on file with the ATO should reflect your current visa status.

## What to do after you arrive in Australia

Once you are in Australia and have started work:

1. Provide your TFN to each employer you work for
2. Complete a Tax File Number Declaration form for each employer
3. Confirm the correct 15% rate appears on your next payslip

Your TFN is also required to lodge your [tax return](/tax-return) at the end of the financial year and to access your [superannuation](/superannuation) when you leave Australia.
 `,
 },
 {
 slug: "tfn-application-delayed",
 title: "TFN application delayed in Australia? What working holiday makers can do",
 description:
 "If your TFN has not arrived 28 days after applying, the ATO may have flagged your application or sent it to the wrong address. How to check status, follow up, and what to ask your employer in the meantime.",
 category: "TFN",
 date: "24 August 2024",
 readTime: 4,
 body: `
If your TFN has not arrived after 28 days, the most common causes are an address error in your application or a letter lost in the post. Before contacting the ATO, check the address you submitted, confirm the 28 days have actually passed (counted from when the ATO received your application, not when you clicked submit), and look for the letter at any older addresses if you have moved.

## What is the first thing to check?

Address issues are the most common cause of delayed TFN delivery. Start there:

- Pull up the confirmation email you received when you submitted your application
- Compare the address it shows against where you are currently staying
- Check for typos in street name, postcode, suburb, or unit number
- If you have moved since applying, ask anyone at your previous address whether the letter arrived there

A single character error (a wrong postcode digit, for example) is enough to send the letter to the wrong area or have it returned to the ATO as undeliverable.

## Have 28 days actually passed?

The 28-day processing window starts from the date the ATO received your application, not the date you submitted it. Online applications are usually received the same day, but it is worth confirming on your confirmation email before assuming there is a problem.

If you applied less than 28 days ago, the application is still within the normal processing window.

## How to follow up on a delayed TFN

If 28 days have passed, your address was correct, and no letter has arrived:

1. [Get in touch with our team](/contact) - we follow up directly with the ATO on your behalf
2. Have your application reference number ready (from the confirmation email)
3. We verify your identity and chase the application through to resolution
4. If your TFN was already issued but the letter was lost, we arrange for it to be reissued securely

Following up with the ATO yourself involves long phone wait times and an identity verification process that requires Australian-specific documents. Our team handles this directly, often resolving delays within a few business days.

## Can you continue working during the delay?

Yes. While you are waiting, you can continue working. Let your employer know your TFN is on the way and show them the ATO confirmation email. Once your TFN is resolved, give it to your employer immediately with a completed Tax File Number Declaration form. Any overpaid tax from the waiting period can be reclaimed through your [tax return](/tax-return).
 `,
 },
 {
 slug: "do-you-need-new-tfn-second-visa",
 title:
 "Do you need a new TFN for a second working holiday visa in Australia?",
 description:
 "No. Your TFN is permanent and stays with you for life, even between visa renewals. What working holiday makers should do when returning to Australia on a 2nd or 3rd working holiday visa.",
 category: "TFN",
 date: "9 September 2024",
 readTime: 3,
 body: `
No, you do not need a new Tax File Number when you return to Australia on a second working holiday visa. Your TFN is permanent. It does not expire when your visa expires and it does not change when your visa changes. The same 9-digit TFN you were issued the first time is the one you use on every subsequent visit to Australia.

## Where can you find your TFN if you cannot remember it?

The TFN you were issued during your first visit is recorded in several places:

- The original letter the ATO posted to you when your application was approved
- Any payslips or income statements from your first Australian employer
- Group certificates or PAYG summaries from previous years
- Past Australian [tax returns](/tax-return) you lodged
- Correspondence from the ATO

If none of those options work, [get in touch with our team](/contact) by phone and request your TFN. You will need to verify your identity using your passport details and other personal information.

## What do you need to do when you start work again?

Even though your TFN is the same, each new employer needs their own copy:

- Provide your TFN to every new employer
- Complete a fresh Tax File Number Declaration form for each employer
- A previous employer holding your TFN does not carry over to the next one

Each employer needs their own declaration form on file to apply the correct 15% working holiday maker tax rate to your wages.

## What about your superannuation from your first visit?

If you had super contributions made during your first visit and withdrew them using the Departing Australia Superannuation Payment (DASP) process, that account was effectively closed. Any new super contributions from your second visit will go into a new fund.

If you did not withdraw your super from your first visit, those funds may still be sitting in the original fund or with the ATO as unclaimed money. See our article on [finding lost or unclaimed super](/blog/how-to-find-lost-superannuation) for how to locate it.

## How do tax returns work on your return visit?

Your tax obligations on your second visit work exactly the same way as the first:

- The financial year runs from 1 July to 30 June
- You must lodge a [tax return](/tax-return) for any year you earned income in Australia
- The 15% working holiday maker rate applies to your earnings, provided your employers have your TFN on file
- The standard deadline is 31 October, or later if you use a registered tax agent
 `,
 },
 {
 slug: "how-to-find-lost-tfn",
 title: "How to find your TFN if you lost or forgot it (Australia)",
 description:
 "Lost your TFN? Check old payslips, your income statement, prior tax returns, or your myGov account. Step-by-step guide for working holiday makers to recover their TFN without contacting the ATO.",
 category: "TFN",
 date: "13 September 2024",
 readTime: 3,
 body: `
To find a lost Tax File Number, start with documents you may already have (the original ATO letter, payslips, payment summaries, or past tax returns). Your TFN is permanent and does not change, so the same number you were issued originally is the one you still hold. If you cannot find it in your records, our team can retrieve it for you under the supervision of a registered tax agent.

## How to find your TFN at home

Start with documents you already have:

- The original TFN letter posted to you by the ATO when your application was approved
- Payslips, payment summaries, or income statements from any Australian employer
- Past [tax return](/tax-return) documents (your TFN appears on every return)
- Any letters or notices from the ATO

If you saved emails, scanned documents, or kept paperwork from previous work in Australia, your TFN is almost certainly in one of those records.

## How to retrieve a lost TFN

If you cannot find your TFN in any of your records, [get in touch with our team](/contact). We work under the supervision of a registered tax agent and can retrieve your TFN on your behalf through our direct channels with the ATO.

To help us, please have ready:

- Your full legal name (as on your passport)
- Your date of birth
- Your passport number (and the passport you held when you first applied, if different)
- Your residential address history in Australia
- Any other personal identification details

Retrieving a TFN as an individual involves long ATO phone wait times and an identity verification process that often requires Australian-specific documents most backpackers no longer have access to from overseas. Going under the supervision of a registered tax agent is faster and more reliable.

## How to keep your TFN safe in future

Once you have your TFN back, store it somewhere secure to avoid this happening again:

- Save it in a password manager
- Store a scanned copy in encrypted cloud storage
- Save it in a locked notes app on your phone
- Keep a paper copy in a secure location separate from your passport

Avoid emailing your TFN to yourself in plain text or storing it in unsecured documents. Your TFN is a sensitive piece of personal identification, and protecting it is important even after you leave Australia.
 `,
 },

 // ─── ABN ───────────────────────────────────────────────────────────────────
 {
 slug: "what-is-an-abn",
 title: "What is an ABN? Australian Business Number guide for working holiday makers",
 description:
 "An Australian Business Number (ABN) is required for working holiday makers operating as contractors or sole traders. How to know if you need one, what it does, and what happens without one.",
 category: "ABN",
 date: "16 September 2024",
 readTime: 5,
 body: `
An Australian Business Number (ABN) is an 11-digit identifier issued to businesses and sole traders operating in Australia. As a working holiday maker, you need an ABN if you are working as an independent contractor (invoicing the business for your services) rather than as an employee (on a payroll). Most working holiday makers in standard employment do not need an ABN. The ABN registration is free, takes around 15 minutes online, and most applications are processed immediately.

## What is the difference between an employee and a contractor?

The need for an ABN comes down to whether you are an employee or a contractor:

- **Employee**: The business pays you a regular wage, deducts PAYG tax from your pay, and pays superannuation on top of your wages. You need a [TFN](/tfn), not an ABN.
- **Contractor**: The business asks you to invoice them for your work, does not deduct tax, and does not pay super on your behalf. You need an ABN.

The label your employer uses does not necessarily reflect the legal reality. The substance of the arrangement (how you are paid, who controls your hours, who provides equipment) is what determines whether you are legally an employee or a contractor.

## Why are ABNs common among working holiday makers?

Several types of work that backpackers commonly do are structured as contracting arrangements rather than employment:

- Piece-rate fruit picking and harvest work through labour hire companies
- Gig economy work through platforms like Uber Eats, DoorDash, and Hireup
- Freelance creative, technical, or trade work
- Some hospitality and cleaning roles where the worker is contracted, not employed
- Tour guide work, photography, content creation

In each case, the business pays you against an invoice rather than a payslip, and an ABN is required.

## What happens if you work without an ABN when you need one?

If you invoice a business without quoting a valid ABN, the business is legally required to withhold 47% from your payment before sending you the rest. This is similar to what happens to a WHM employee without a TFN (where 45% is withheld). The withheld amount can be reclaimed when you lodge your [tax return](/tax-return), but you do not see it until then.

## How do you get an ABN?

The simplest way to get an ABN is to [register through our service](/abn). We handle the whole process for you:

1. Send us your details (we will let you know exactly what we need)
2. Our team prepares and lodges the registration on your behalf
3. Most ABNs are approved within 24 hours
4. You receive your ABN by email, ready to use

Registering an ABN involves describing your business activity in language the Australian Business Register accepts, choosing the right structure, and handling identity verification. Getting any of this wrong can put your application into a manual review queue that takes weeks. We do dozens of registrations every week and know exactly how to get them through first time.

## What are your tax obligations under an ABN?

When you are working as a sole trader with an ABN, you are responsible for managing your own tax:

- No tax is automatically withheld from your invoices
- You must set aside enough money to cover your tax bill
- All ABN income must be included in your annual [tax return](/tax-return)
- You may need to register for GST if your turnover exceeds $75,000 per year
- You may not receive superannuation contributions from your clients (you can pay your own if you choose)

The standard working holiday maker tax rate of 15% on the first $45,000 of earnings applies to your ABN income as well, but you must self-assess and pay it at tax time rather than having it deducted upfront.

[Get in touch with our team](/contact) for help registering an ABN, managing GST and BAS, or sorting out your end-of-year tax position correctly.
 `,
 },
 {
 slug: "how-to-register-for-an-abn",
 title: "How to register for an ABN in Australia (working holiday guide)",
 description:
 "Registering for an ABN is free and takes around 15 minutes online. Step-by-step guide for working holiday makers on 417 and 462 visas, what information you need, and common application pitfalls.",
 category: "ABN",
 date: "22 September 2024",
 readTime: 4,
 body: `
To register for an Australian Business Number (ABN) as a working holiday maker, [register through our service](/abn) and we handle the whole process for you. Our team prepares and lodges the application on your behalf, and most ABNs are approved within 24 hours. You receive your ABN by email, ready to use. You need a [Tax File Number (TFN)](/tfn) before we can register your ABN.

## What do you need before we register your ABN?

To register an ABN for you, we need:

- Your Tax File Number (we can [register your TFN](/tfn) first if you do not have one)
- Your full legal name as it appears on your passport
- Your contact details, including an Australian phone number and email
- An Australian address
- A description of the work you will be doing (for example, "fruit picking", "ride share driving", "freelance graphic design")
- The date you started or intend to start the work

If you do not have a TFN yet, we register both together so you are not waiting between steps.

## How does the ABN registration process work?

The process through our service is straightforward:

1. [Get in touch](/abn) and send us your details
2. We prepare the registration with the correct business activity description and structure
3. We lodge the application on your behalf
4. Most applications are approved within 24 hours
5. You receive your ABN by email, ready to quote on invoices

Self-registering an ABN involves describing your business activity in language the Australian Business Register accepts. Getting this wrong is one of the most common reasons applications go into a manual review queue that can take weeks. We do dozens of registrations every week and know exactly how to get them through first time.

## How do you use your ABN correctly on invoices?

Once you have your ABN, quote it on every invoice you issue. An invoice without a valid ABN allows the business paying you to legally withhold 47% of the payment.

Every invoice you send should include:

- Your name (and business name, if you trade under one)
- Your ABN
- The date of issue
- A description of the services provided
- The amount payable
- Your contact details

Keep a record of every invoice you issue and every payment you receive under your ABN. We declare it all in your [tax return](/tax-return) at the end of the financial year.

## When and how to cancel your ABN

When you finish your business activity in Australia, you should cancel your ABN. We handle the cancellation as part of wrapping up your Australian tax position before you leave. See our article on [cancelling your ABN when you leave Australia](/blog/how-to-cancel-your-abn) for what to think about before you go.

[Get in touch with our team](/contact) for help registering an ABN, managing GST and BAS, or sorting out your end-of-year tax position correctly.
 `,
 },
 {
 slug: "farm-work-and-abns",
 title: "Farm work and ABNs in Australia: what working holiday makers need to know",
 description:
 "Farm work is one of the most common reasons working holiday makers register for an ABN. When you need one, when you should be an employee instead, and what to watch out for with piece-rate contracts.",
 category: "ABN",
 date: "30 September 2024",
 readTime: 5,
 body: `
You usually need an Australian Business Number (ABN) for farm work in Australia if you are working through a labour hire company or being paid on a piece-rate basis as a contractor. You do not need an ABN if the farm is employing you directly on a payroll. Always confirm the arrangement before you start work, because the answer determines what tax, super, and entitlements apply to you.

## Why does farm work often involve an ABN?

Many Australian farms do not employ pickers, packers, and harvest workers directly. Instead, they use labour hire companies who supply workers on a contractor basis. In that arrangement:

- The labour hire company asks you to invoice for your hours or pieces picked
- No tax is withheld from your payment
- No superannuation is paid on top of your wages
- You need an [ABN](/abn) to invoice correctly

If the farm employs you directly, you are an employee and your [TFN](/tfn) is all you need.

Ask the farm or labour hire company directly how the arrangement is structured before your first shift. The answer determines everything that follows.

## How does piece-rate work?

Piece-rate work is common in fruit picking, where you are paid:

- Per bin filled
- Per kilogram harvested
- Per unit picked or packed

Piece-rate arrangements are often structured as contracting work, in which case you need an ABN. However, not all piece-rate work is contracting. Some farms run piece-rate as employment, where you are paid per piece but still on a payroll with tax and super handled by the farm. Do not assume piece-rate automatically means contractor. Ask the farm.

## What should you watch out for with farm work?

Be cautious if any of the following happen:

- The farm or labour hire company is vague about whether you are an employee or contractor
- You are pressured to get an ABN quickly without it being explained
- You are told you are a contractor but the work looks identical to that of employees who get super and leave
- Your hours are dictated, your tools are supplied, and you work exclusively for that business

These are signs of sham contracting, where a business misclassifies an employee as a contractor to avoid employment obligations. Sham contracting is illegal under Australian law. [Get in touch with our team](/contact) if you suspect this is happening to you.

## Tax obligations when you have an ABN for farm work

When you work under an ABN, you handle your own tax:

- No tax is withheld automatically from your payments
- You must set aside enough to cover your tax liability at the end of the year
- All ABN income must be declared in your [tax return](/tax-return)
- You may not receive superannuation contributions from labour hire companies
- The same 15% working holiday maker rate on the first $45,000 still applies

Keep records of every payment received and every invoice issued. Good record-keeping makes tax time much simpler.
 `,
 },
 {
 slug: "employee-vs-contractor-australia",
 title:
 "Employee vs contractor in Australia: what working holiday makers need to know",
 description:
 "The distinction between employee and contractor affects tax, super, leave and workplace rights. How working holiday makers can tell which one applies, and what to do if you have been misclassified.",
 category: "ABN",
 date: "4 October 2024",
 readTime: 5,
 body: `
The difference between an employee and a contractor in Australia comes down to the substance of the working arrangement, not the label. An employee works under the direction of an employer who deducts tax, pays superannuation, and provides leave. A contractor runs their own business, invoices clients, sets aside their own tax, and is generally not entitled to super from clients. The classification affects your tax, your super, your workplace rights, and whether you need an ABN.

## What are the key differences between employee and contractor?

The main practical differences:

- **Employee**: Paid wages by the hour or day, tax deducted by employer, super paid by employer on top, entitled to leave, uses a [TFN](/tfn), works under direction
- **Contractor**: Paid by invoice per task or project, no tax deducted, no super from clients (usually), no leave, needs an [ABN](/abn), works independently

The label your employer uses ("contractor", "subbie", "self-employed") does not determine your status. What matters is how the work actually operates.

## How can you tell which one you are?

The ATO and Fair Work Ombudsman look at multiple factors rather than any single test:

Indicators of employment:

- Paid hourly or daily
- Required to do the work personally
- Working exclusively for one business over an extended period
- Business provides your tools, equipment, and workspace
- Business directs when, where, and how you work
- You receive regular pay (weekly or fortnightly)

Indicators of contracting:

- Paid per task, project, or piece
- Free to subcontract or delegate the work
- Provide your own equipment
- Free to work for multiple clients at the same time
- Set your own hours and methods
- Issue invoices for completed work

No single factor is decisive. The overall picture is what matters.

## Why does this matter for working holiday makers?

The classification affects:

- **Tax**: Employees have tax withheld; contractors must set aside their own
- **Super**: Employees get 12% super on top of wages; contractors usually do not
- **Leave**: Employees accrue paid annual and sick leave; contractors do not
- **Workplace protections**: Employees are covered by Fair Work; contractors have fewer protections
- **Income at risk**: Contractors without a valid [ABN](/abn) have 47% withheld from invoices

If you are being treated as a contractor when the arrangement looks like employment, the business may be avoiding their obligation to pay you super and leave entitlements. This is called sham contracting, and it is illegal. [Get in touch with our team](/contact) and we can help you raise this through the right channels.

## Can you be both an employee and a contractor?

Yes. Many working holiday makers are employees at one job and contractors elsewhere. You use your [TFN](/tfn) for employment income and your [ABN](/abn) for contracting income, and you declare both on the same [tax return](/tax-return) at the end of the financial year.
 `,
 },
 {
 slug: "can-you-have-tfn-and-abn",
 title: "Can you have both a TFN and an ABN in Australia? (working holiday guide)",
 description:
 "Yes, working holiday makers can hold a TFN and an ABN at the same time, and many do. How the two numbers work together, when you need both, and how it affects your tax return.",
 category: "ABN",
 date: "8 October 2024",
 readTime: 3,
 body: `
Yes, you can hold a Tax File Number (TFN) and an Australian Business Number (ABN) at the same time, and many working holiday makers do. In fact, you must have a TFN before you can apply for an ABN. The TFN is your personal tax identifier used for employment, and the ABN is your business identifier used for contractor or sole trader work. Holding both is normal if you do both kinds of work.

## How do the TFN and ABN work together?

The two numbers serve different purposes and are used in different situations:

- Your **TFN** is for: employment income, tax returns, accessing your superannuation, opening certain bank accounts
- Your **ABN** is for: invoicing clients for contracted work, sole trader business income, claiming business expenses

You use them in parallel. Your employer uses your TFN to deduct PAYG tax from your wages. Your clients use your ABN on the invoices you issue.

Both income streams are declared in the same [tax return](/tax-return) at the end of the financial year.

## A common scenario for working holiday makers

Many working holiday makers end up with both. A typical example:

- You work part-time in a cafe as an employee, using your TFN, paid through the payroll
- On the side, you do some freelance photography, graphic design, or seasonal farm work as a contractor, invoicing under your ABN
- At tax time, both incomes are declared on the same return

This is entirely normal and legal. Most backpackers who do any contractor work alongside regular employment will be in this situation.

## Common mistake: using your ABN where your TFN belongs

A frequent error is quoting an ABN to an employer who should be treating you as an employee. This causes problems because:

- The employer pays you without deducting tax
- No superannuation is paid on your behalf
- You receive no leave entitlements
- You face a larger tax bill at year end than you expected

Only use your ABN when the work genuinely is contracting (see our article on [employee vs contractor](/blog/employee-vs-contractor-australia) for how to tell the difference). Otherwise, your TFN and a Tax File Number Declaration form are what you should provide.

## What are your tax obligations when you have both?

Holding both numbers means tracking both income streams:

- Your employer reports your employment income to the ATO through their payroll
- You are responsible for tracking and declaring all income earned under your ABN
- All income, from both sources, must be included in your [tax return](/tax-return)
- The 15% working holiday maker rate applies to combined earnings up to $45,000

Keep clear records of both throughout the year. Save your payslips, copy every invoice you send, and record every payment received. Tax time is much simpler when records are complete.

[Get in touch with our team](/contact) for help registering an ABN, managing GST and BAS, or sorting out your end-of-year tax position correctly.
 `,
 },
 {
 slug: "how-to-cancel-your-abn",
 title: "How to cancel your ABN when leaving Australia (working holiday makers)",
 description:
 "If you are leaving Australia and no longer running a business, the ATO expects you to cancel your ABN. How working holiday makers can cancel online, when to do it, and why it matters for your tax return.",
 category: "ABN",
 date: "9 October 2024",
 readTime: 3,
 body: `
You should cancel your Australian Business Number (ABN) when you leave Australia and are no longer carrying on a business or contracting activity. Our team handles the cancellation as part of wrapping up your Australian tax position before you go, so you do not need to deal with the paperwork yourself. Cancelling keeps your business records tidy and avoids any administrative complications down the line.

## How do you cancel your ABN?

The simplest way is to let us handle it as part of your departure tax package:

1. [Get in touch](/contact) before you leave Australia
2. We confirm everything tied to your ABN is wrapped up (returns lodged, invoices issued, payments collected)
3. We submit the cancellation on your behalf
4. The ABN is cancelled from the date you specify

We package the ABN cancellation together with your final tax return and any super claim, so everything is sorted in one go before you leave.

## Why should you cancel your ABN?

Leaving an ABN active when you are no longer using it is not a major legal risk, but it does cause issues:

- Correspondence may be sent to your old Australian address after you leave
- You may miss important notices about reporting obligations
- If you return to Australia later, you may need to reactivate the ABN or apply for a new one
- An open ABN can be a target for identity fraud if your details become known

Cancelling cleanly when you leave keeps your administrative life simple.

## What to do before cancelling your ABN

Before cancellation, make sure everything tied to your ABN is wrapped up:

- Lodge your [tax return](/tax-return) for any year you earned ABN income
- Issue any outstanding invoices to clients
- Collect any pending payments
- Lodge any required BAS statements if you were registered for GST
- Settle any final tax owed

If the financial year has not yet ended when you leave, we can lodge your tax return after 1 July from anywhere in the world. We help working holiday makers do this regularly.

## Do not forget to claim your super

If superannuation contributions were made in connection with employment work (separate from your ABN contracting), claim them back through the Departing Australia Superannuation Payment (DASP) process. See our article on [claiming your super when you leave Australia](/superannuation) for the steps.

ABN contractor work typically does not generate super contributions, but employment work in parallel often does.
 `,
 },
 {
 slug: "gst-and-abn-for-working-holiday-makers",
 title: "GST and ABN for working holiday makers: do you need to register?",
 description:
 "Most working holiday makers with an ABN do not need to register for GST - the threshold is $75,000 annual turnover. Exception: rideshare drivers must register regardless. How to work out if it applies to you.",
 category: "ABN",
 date: "10 October 2024",
 readTime: 4,
 body: `
Most working holiday makers with an ABN do not need to register for GST. The Goods and Services Tax (GST) registration threshold is $75,000 in annual turnover from business activities, and the vast majority of backpackers earn well below this during a single visit. The exception is rideshare and food delivery drivers, who must register for GST regardless of income level. If your ABN turnover stays under $75,000 and you are not in rideshare or delivery, you can ignore GST entirely.

## What is the GST registration threshold?

The GST registration threshold is based on annual turnover from your business activities, not your total income. The key numbers:

- Under $75,000 per year of ABN turnover: GST registration is **not required** for most activities
- $75,000 or more per year: GST registration is **mandatory** within 21 days of crossing the threshold
- Voluntary registration is available below the threshold, but rarely worthwhile for working holiday makers

Turnover means gross income from your business, before expenses. Employment income (paid via your TFN) does not count toward the threshold.

## What happens if you are not registered for GST?

If your ABN turnover stays below $75,000 and you are not in a rideshare or delivery role:

- You do not charge GST on your invoices
- You do not have to lodge BAS (Business Activity Statements) with the ATO
- Your only tax obligation under the ABN is to declare your income on your [annual tax return](/tax-return) and pay income tax on the net earnings
- You do not need to worry about quarterly GST reporting

This is the normal situation for almost all working holiday makers with an ABN.

## When does GST registration apply to you?

GST registration is required when:

- Your business turnover reaches or exceeds $75,000 in any 12-month period
- You drive for rideshare platforms (Uber, DiDi, Ola) regardless of income level
- You drive for food delivery platforms (Uber Eats, DoorDash, Menulog) regardless of income level
- You provide taxi services

If you are in rideshare or delivery, register for GST from day one, even if you only do a few trips. The platforms typically remind drivers about this, but the obligation sits with you.

## What if you have to register for GST?

If GST applies to you:

- Add 10% to your invoices and collect it from clients
- Lodge a BAS quarterly (or monthly for higher turnover)
- Remit the collected GST to the ATO
- You can claim back GST you paid on business expenses

We can handle BAS lodgement under the supervision of a registered tax agent and make this straightforward.

## What is the main tax obligation for most contractors?

For most working holiday makers with an [ABN](/abn), GST is not a concern. Your real obligations are simpler:

- Keep records of all income throughout the year
- Set aside enough to cover income tax (around 15-20% of net earnings is a safe starting point)
- Declare everything in your [tax return](/tax-return) at financial year end

[Get in touch with our team](/contact) for help registering an ABN, managing GST and BAS, or sorting out your end-of-year tax position correctly.
 `,
 },

 // ─── TAX RETURN ────────────────────────────────────────────────────────────
 {
 slug: "how-does-australian-tax-year-work",
 title: "How does the Australian tax year work for working holiday makers?",
 description:
 "The Australian financial year runs from 1 July to 30 June. Here is what that means for your tax return and when you need to lodge it.",
 category: "Tax Return",
 date: "23 October 2024",
 readTime: 5,
 body: `
The Australian financial year runs from 1 July to 30 June, not the calendar year. As a working holiday maker, you are required to lodge a tax return for any financial year in which you earned income in Australia. The deadline to lodge is 31 October following the end of the financial year. If you lodge under the supervision of a registered tax agent like our team, the deadline is extended automatically.

## What does the financial year mean for you?

All income earned between 1 July and 30 June is assessed as one financial year's worth of earnings:

- Arrived in Australia in October 2024 and worked through April 2025? All that income falls in the 2024-25 financial year (1 July 2024 to 30 June 2025).
- Started work in March 2024? Your income from March to June 2024 falls in the 2023-24 financial year. Income from July 2024 onwards falls in the next year.

At year-end, the [Australian Taxation Office (ATO)](https://www.workingholidaytax.com.au/tax-return) calculates your actual tax liability and compares it to what your employer withheld:

- More was withheld than owed = refund paid to your account
- Less was withheld than owed = you pay the difference

## When is the tax return deadline?

The standard deadline is 31 October following the end of the financial year:

- 2024-25 financial year (ends 30 June 2025) → deadline 31 October 2025
- 2025-26 financial year (ends 30 June 2026) → deadline 31 October 2026

If we lodge your return under the supervision of a registered tax agent, you qualify for an extended deadline, often until May the following year. This gives you breathing room if you missed October or your records are not yet complete.

## What if you left Australia before 30 June?

You can still lodge a tax return after leaving Australia. The process works exactly the same:

- The return can be lodged electronically from anywhere in the world
- Our team handles the entire process remotely on your behalf
- The refund is paid to your Australian bank account
- Keep your Australian bank account open until the refund clears

## What do you need to lodge your tax return?

To lodge your return, our team needs:

- Your Tax File Number (TFN)
- Income details from each employer you worked for
- Bank account details for the refund (Australian bank account)
- Any work-related expenses you want to claim as deductions
- Your passport details for identification

We can access your income statements directly through our tax agent portal, so you do not need to collect payslips from each employer yourself. See our article on [lodging a tax return from overseas](/blog/how-to-lodge-tax-return-from-overseas) for more detail on what we need.

[Get in touch with our team](/contact) to lodge your Australian tax return under the supervision of a registered tax agent and make sure every refund you are entitled to is claimed.
 `,
 },
 {
 slug: "backpacker-tax-rate-australia",
 title: "Backpacker tax rate Australia 2025-26: full breakdown for 417 & 462 visas",
 description:
 "The current backpacker tax rate in Australia for working holiday makers on 417 and 462 visas: 15% on the first $45,000, then resident-style brackets. How it affects your take-home pay and refund.",
 category: "Tax Return",
 date: "27 October 2024",
 readTime: 5,
 body: `
The backpacker tax rate in Australia is a flat 15% on the first $45,000 of income earned per financial year. This rate applies to all working holiday makers on a Working Holiday Visa (subclass 417) or Work and Holiday Visa (subclass 462). It is sometimes called the "working holiday maker tax rate" and it replaces the standard resident tax brackets that would otherwise apply. You must register your [TFN](/tfn) with each employer to qualify for the 15% rate, otherwise withholding defaults to 45%.

## How does the 15% rate work in practice?

The 15% rate is a flat rate. Every dollar of the first $45,000 you earn is taxed at the same rate:

- Weekly wage of $1,000 → $150 withheld → $850 in your account
- Weekly wage of $1,500 → $225 withheld → $1,275 in your account
- Weekly wage of $2,000 → $300 withheld → $1,700 in your account

You do not receive the tax-free threshold that Australian residents get. Australian residents pay no tax on their first $18,200, but working holiday makers pay 15% from the very first dollar.

## What happens if you earn more than $45,000?

Earnings above $45,000 are taxed at higher rates:

- $45,001 to $135,000: 30%
- $135,001 to $190,000: 37%
- Above $190,000: 45%

Very few working holiday makers reach these income levels during a single visit, but it is worth knowing if you are planning an extended stay with high-paying work in mining, construction, or specialist trades.

## How do you qualify for the 15% rate?

To have the 15% rate applied to your wages, you must:

1. Have a [TFN](/tfn) registered with your employer
2. Complete a Tax File Number Declaration form indicating you are a working holiday maker
3. Work for an employer who has registered with the ATO as an employer of working holiday makers

Registered employers are required to apply the correct rate. If your employer is not registered, the default withholding rate is 30% even with your TFN on file. If you are unsure whether your employer is registered, [get in touch with our team](/contact) and we will check for you.

## What can come back through your tax return?

A standard 15%-rate working holiday maker on the correct setup usually does not get a large refund, because the right amount has been withheld throughout the year. Refunds typically come from:

- Working without a TFN for part of the year (withheld at 45% instead of 15%)
- Periods where the wrong rate was applied (such as 30% with an unregistered employer)
- Eligible deductions for work-related expenses, tools, uniforms, and travel
- Mistakes on your Tax File Number Declaration form (such as claiming the tax-free threshold)

Most working holiday makers we see get a refund of between $1,000 and $3,000 when we lodge their [tax return](/tax-return) properly. The amount depends entirely on the specific circumstances of the year.
 `,
 },
 {
 slug: "how-to-lodge-tax-return-working-holiday",
 title: "How to lodge a working holiday tax return in Australia (step-by-step)",
 description:
 "Step-by-step guide to lodging a working holiday tax return in Australia. What you need, when to lodge, and how it is handled under the supervision of a registered tax agent for 417 and 462 visa holders - including from overseas.",
 category: "Tax Return",
 date: "29 October 2024",
 readTime: 6,
 body: `
To lodge a tax return in Australia as a working holiday maker, the simplest option is to work with our team under the supervision of a registered tax agent. We collect your details, access your income statements directly through our tax agent portal, prepare your return, and lodge it with the ATO on your behalf. The process works the same whether you are still in Australia or have already left, and using a registered agent gives you an extended lodgment deadline beyond the standard 31 October.

## What do you need to lodge a tax return?

To lodge your return through our service, we need:

- Your Tax File Number (TFN)
- Identification (passport details)
- Details of an Australian bank account for any refund
- Any work-related expenses you want to claim as deductions
- Details of any ABN or contractor income (if applicable)

We can access your income statements directly from the ATO system, so you do not need to collect payslips or PAYG summaries from each employer yourself.

## How does the lodgment process work?

When you lodge through our service:

1. You send us your details and any deduction receipts you want to claim
2. We pull your income statements from the ATO system
3. We prepare the return and review it for accuracy
4. We confirm the expected refund amount with you before lodging
5. We lodge the return with the ATO on your behalf
6. The ATO processes the return within two weeks and pays the refund to your bank account

You see and approve the figures before we lodge, so there are no surprises.

## What happens after you lodge?

After lodgment:

- The ATO processes the return (usually within two weeks)
- They compare what was withheld against what you actually owed
- Refund paid to your nominated Australian bank account
- Or, if you owe money, you receive a notice with a payment deadline

We monitor the lodgment status and let you know when the refund has been issued.

## What if you worked for multiple employers?

If you worked for more than one employer during the year, every employer's income must be reported on your return. When we lodge through our tax agent portal:

- We see every employer who reported income for you in the financial year
- We cross-check against any payslips you provide
- We flag any employers who have not yet finalised their reporting
- We wait until everything is finalised before lodging to avoid having to amend later

Self-lodging can miss employers if you forget one, which creates problems when the ATO notices and adjusts your return after the fact. Going through our service avoids that risk entirely.

For multi-employer returns, or for working holiday makers with both TFN and [ABN](/abn) income, the reconciliation work matters as much as the lodgment itself. [Get in touch with our team](/contact) to make sure every dollar is captured correctly.
 `,
 },
 {
 slug: "what-is-payg-payment-summary",
 title: "PAYG payment summary explained: what working holiday makers need to know",
 description:
 "A PAYG payment summary (now called Income Statement) shows your total earnings and tax withheld for the Australian financial year. How to find yours, what each section means, and how it is used in your working holiday tax return.",
 category: "Tax Return",
 date: "2 November 2024",
 readTime: 4,
 body: `
A PAYG payment summary, now known as an income statement, is the official record showing your total wages and total tax withheld by an employer during a financial year. It is the document used to lodge your [tax return](/tax-return). Employers report wages and withholding amounts to the ATO automatically through their payroll software, so the income statement is generated digitally rather than handed to you as a paper document. Working under the supervision of a registered tax agent, our team can access your income statements directly through the ATO system.

## How do income statements work now?

The old system of paper PAYG payment summaries was replaced with Single Touch Payroll (STP). Under STP:

- Employers report wages and withholding directly to the ATO with every pay run
- The data is consolidated into your income statement at year-end
- The statement is finalised by the employer between 14 July and 31 July
- Once finalised, your tax return can be lodged using that data

## How can you access your income statement?

Through our service, we access your income statement directly. You do not need to collect it from your employer or log into ATO systems yourself.

What we see in your records:

- Total gross wages from each employer
- Total tax withheld from each employer
- Each employer listed separately if you worked for more than one
- The finalisation status (in progress or finalised)

This is one of the main advantages of lodging under the supervision of a registered tax agent. We see everything the ATO sees, and we wait until all employer reports are finalised before lodging your return.

## What if an employer has not finalised their report?

If a financial year has ended and an employer's income statement is still showing as "in progress" past 31 July, it means they have not finalised their payroll reporting. We can:

- Contact the employer on your behalf to ask them to finalise
- Lodge with an estimate if the employer is unresponsive (then amend later if needed)
- Help you raise the issue with the ATO if the employer refuses to report

[Get in touch](/contact) if you need help chasing an employer who has not finalised their reporting.

## How is your income statement used to lodge?

When we prepare your return:

- We pull your income statements from the ATO system
- We cross-check the figures against any payslips you provide
- We identify any discrepancies (missing wages, incorrect withholding, missed employers)
- We flag and resolve issues before lodging

Lodging without this cross-check is risky. The income statements are usually accurate but not always, and any error becomes a problem for you to resolve with the ATO after the fact.
 `,
 },
 {
 slug: "tax-deductions-working-holiday-makers",
 title: "Tax deductions for working holiday makers in Australia: full guide",
 description:
 "What work-related tax deductions working holiday makers on 417 and 462 visas can claim in Australia. Uniforms, tools, vehicle expenses, training - the full list of what qualifies and what does not.",
 category: "Tax Return",
 date: "4 November 2024",
 readTime: 5,
 body: `
Working holiday makers in Australia can claim work-related tax deductions on their tax return, the same as Australian residents. Common deductions include uniforms and protective clothing, tools and equipment, travel between work sites, work-related phone use, and registered tax agent fees. To claim a deduction, the expense must be directly related to earning your income and you must have a record (receipt, bank statement, or diary note). Our team identifies eligible deductions when we prepare your [tax return](/tax-return).

## What work-related clothing can you claim?

Specific work clothing is deductible:

- Uniforms with a logo or distinct design required by your employer
- Protective clothing (steel-cap boots, hi-vis vests, sunscreen for outdoor work)
- Safety gear (gloves, hard hats, goggles)
- Laundry and dry-cleaning costs for the above items

What is **not** deductible:

- Generic clothing, even if you only wear it to work (black pants, white shirts for hospitality)
- Conventional business attire
- Plain clothes that happen to be required as a uniform

## What tools and equipment can you claim?

Tools you buy to do your job are deductible:

- Knife rolls, chef whites, and kitchen tools for hospitality
- Work boots and safety equipment for construction or farm work
- Tools for tradespeople (mechanics, builders, electricians)
- Camera and lighting equipment for content creators or photographers

Items costing under $300 each can be claimed in full in the year of purchase. Larger items must be depreciated over time. We work out the optimal treatment when we prepare your return.

## What travel expenses can you claim?

Travel rules for backpackers:

- **Deductible**: travel between different work sites on the same day
- **Deductible**: travel for work meetings or training away from your regular workplace
- **Not deductible**: travel between home and your regular workplace (this is private travel)

If you carry heavy or bulky equipment to work that cannot be left at the workplace, there may be exceptions. [Send us the details](/contact) and we will check.

## Can you claim phone and internet?

You can claim the work-related portion of:

- Mobile phone bills
- Home internet
- Devices used for work (laptops, tablets)

You need to work out the work-related percentage based on your actual usage. Keep a four-week diary of work versus personal use as evidence. We help you calculate a reasonable percentage when we prepare your return.

## Common deductions for working holiday makers

The most frequently claimed deductions for backpackers:

- Sun protection (sunscreen, sunglasses, sun hat) for outdoor workers
- Work boots and high-vis gear for farm and construction work
- Knife rolls and chef uniforms for kitchen work
- Phone use for staying in contact with employers and checking rosters
- Tax agent fees (yes, our fee for lodging your return is itself deductible)
- Working-from-home expenses for any remote contractor work
- Self-education expenses for courses directly relevant to your current work

## What you cannot deduct

- Personal expenses unrelated to earning income
- Meals (except when travelling away from home overnight for work)
- Costs reimbursed by your employer
- Travel between home and your regular workplace
- Generic clothing
- Expenses for getting your visa or visa-related travel

## What records do you need to keep?

For every deduction, you need a record:

- A receipt showing the date, supplier, item, and amount
- A bank or credit card statement showing the transaction
- A diary note (acceptable for small or routine expenses)

Without records, the deduction cannot be claimed even if the expense was genuinely work-related. Photograph receipts on your phone the day you receive them and email them to yourself or save them to cloud storage.
 `,
 },
 {
 slug: "do-you-need-to-lodge-tax-return-short-stay",
 title:
 "Do you need to lodge a working holiday tax return after a short stay in Australia?",
 description:
 "Worked in Australia for only a few weeks or months on a working holiday visa? Find out if you are required to lodge a tax return and how to claim back any overpaid tax.",
 category: "Tax Return",
 date: "7 November 2024",
 readTime: 4,
 body: `
Yes, you almost certainly need to lodge a tax return in Australia even if you only worked for a few weeks. The requirement to lodge does not depend on how long you stayed. It depends on whether you earned income during the Australian financial year. Working for two weeks creates the same lodgment obligation as working for two years. Lodging is also often worthwhile financially, because most working holiday makers get a refund.

## What is the general rule?

If you earned any wages in Australia during a financial year (1 July to 30 June), you are required to lodge a tax return for that year. This applies to:

- Two-week casual roles
- Single seasonal jobs
- Brief contractor work under an [ABN](/abn)
- Cash-in-hand work that should have been reported through PAYG

The ATO uses your tax return to calculate your actual tax liability and reconcile it against what was withheld from your wages.

## When might you not need to lodge?

There are limited circumstances where lodging is not required:

- You earned nothing in Australia during the financial year
- Your only Australian income was investment income (interest or dividends) under a small threshold, with correct withholding tax applied

For working holiday makers who worked in any wage-paying role, the lodgment requirement almost always applies. If you are unsure whether your situation requires lodgment, [send us a message](/contact) with the details and we will check.

## Why lodging is usually worth it even if you only worked a short time

Even when not strictly required, lodging often results in a refund. The most common reasons short-stay workers get a refund:

- Worked without a TFN on file for part of the time (withheld at 45% instead of 15%)
- Employer withheld at the foreign resident rate (30%) instead of the working holiday maker rate
- Periods where the wrong rate was applied due to incorrect Tax File Number Declaration form setup
- Eligible deductions for work-related clothing, tools, or travel

Not lodging means leaving any refund with the ATO. The amounts are often several hundred to several thousand dollars even for short stays.

## How to lodge after a short stay or from overseas

Even if you have already left Australia, lodging is straightforward through our service:

1. [Send us your details](/contact) (TFN, passport, employment dates)
2. We pull your income statements from the ATO system
3. We prepare and lodge the return remotely
4. The refund is paid to your Australian bank account

You do not need to come back to Australia. Keep your Australian bank account open until the refund clears.

The standard deadline is 31 October following the end of the financial year, but if you lodge through our team under the supervision of a registered tax agent, you qualify for the extended agent deadline.
 `,
 },
 {
 slug: "how-to-lodge-tax-return-from-overseas",
 title:
 "How to lodge an Australian tax return from overseas (UK, Germany, Japan)",
 description:
 "Left Australia and need to lodge your working holiday tax return? Complete guide for 417 and 462 visa holders lodging from the UK, Germany, Japan or anywhere else - online, under the supervision of a registered tax agent.",
 category: "Tax Return",
 date: "12 November 2024",
 readTime: 5,
 body: `
To lodge an Australian tax return from overseas after you have left, work under the supervision of a registered tax agent who can prepare and lodge the return remotely on your behalf. The entire process is done electronically, and any refund the ATO assesses is paid into your Australian bank account. Our team handles tax returns for working holiday makers all over the world, every week. You do not need to return to Australia, and the lodgment deadline is extended when you go under the supervision of a registered tax agent.

## How do you lodge from overseas through our service?

The process is fully remote:

1. [Send us your details](/contact): TFN, passport, employment dates, bank account
2. We pull your income statements from the ATO system
3. We prepare your return and confirm the expected refund with you
4. We lodge with the ATO on your behalf
5. The refund is paid to your Australian bank account, usually within two weeks

You do not need to navigate ATO online systems yourself. You do not need to come back to Australia.

## What do you need to lodge from overseas?

To lodge through our service, we need:

- Your Tax File Number (TFN)
- Identification (passport details)
- Details of an Australian bank account for the refund
- Any deduction receipts you have (we work with you on what is eligible)
- Details of any ABN or contractor income

If you have already closed your Australian bank account, [get in touch with our team](/contact) and we will discuss alternative arrangements for receiving the refund.

## What is the deadline to lodge from overseas?

The standard deadline is 31 October following the end of the financial year:

- 2024-25 financial year → standard deadline 31 October 2025
- Through our service under the supervision of a registered tax agent → deadline often extended into the following May

This means if you missed the October deadline, lodging through us still gives you time to do it without late penalties.

## What happens to your refund when you lodge from overseas?

If tax was overpaid during the year, the ATO refunds the difference:

- Paid into your Australian bank account
- Usually arrives within two weeks of lodgment
- Sometimes faster (a few business days)
- The payment is in Australian dollars

Keep your Australian bank account open until the refund clears. If you have already closed it, we work out alternative arrangements with you when we start the return.

## What if you owe money instead of receiving a refund?

In rare cases, if too little was withheld during the year (for example, with ABN income or where the tax-free threshold was incorrectly claimed), you may owe money instead of receiving a refund. If that happens:

- The ATO issues a notice with a payment deadline
- We can set up a payment plan if needed
- The amount must be paid before your tax obligations are considered resolved

Most working holiday makers receive a refund. Owing money is the exception, not the rule.
 `,
 },
 {
 slug: "what-is-a-tax-agent",
 title: "Registered tax agents for working holiday makers in Australia: full guide",
 description:
 "A registered tax agent is licensed by the Tax Practitioners Board (TPB) to prepare and lodge tax returns on your behalf. Why working holiday makers on 417 and 462 visas use tax agents, what they do, and how much they cost.",
 category: "Tax Return",
 date: "14 November 2024",
 readTime: 4,
 body: `
A registered tax agent is a tax professional authorised by the Tax Practitioners Board to prepare and lodge tax returns on behalf of clients. In Australia, anyone offering paid tax services must be TPB-registered. Working holiday makers benefit from using a registered tax agent for three main reasons: access to extended lodgment deadlines, complete handling of communication with the ATO, and identification of deductions that self-lodgers often miss.

## What does a registered tax agent actually do?

A registered tax agent handles your tax return end-to-end:

- Reviews your income and personal circumstances
- Accesses your income statements directly from the ATO system
- Identifies all deductions and offsets you are entitled to
- Prepares and reviews your return for accuracy
- Lodges the return with the ATO on your behalf
- Manages all communication with the ATO after lodgment
- Handles any audit, adjustment, or query that arises

If the ATO questions your return or runs an audit, your agent manages that process. You do not deal with the ATO directly.

## Why do working holiday makers benefit from using a tax agent?

There are several reasons:

- **Multiple employers**: If you worked for several employers during the year, the risk of errors when self-lodging is high. An agent gathers all income and cross-checks.
- **Overseas lodgment**: Lodging from outside Australia is harder without local infrastructure (Australian phone numbers, addresses, banking). An agent handles it all remotely.
- **Missed deductions**: Working holiday makers often miss deductions they are entitled to (work boots, uniforms, sun protection, phone use, tax agent fees themselves). An agent identifies them.
- **Extended deadline**: When you lodge through a registered agent, you qualify for an extended deadline beyond the standard 31 October cutoff, often into the following May.
- **No ATO admin**: You never need to navigate the ATO online portal yourself.

## How do you verify a tax agent is legitimate?

Always verify the agent is currently registered:

- [Check that anyone advising you is a registered tax agent](/contact)
- Confirm the agent's registration is active and not under suspension
- Verify the registration covers tax agent services (not just BAS services)
- Ask for the agent's TPB registration number upfront

Never engage someone who claims to be a tax agent but cannot provide a TPB registration number. The TPB register is the only authoritative source.

## How is our service supervised?

We operate under the supervision of a registered tax agent. Our registration details are listed on the TPB register and are available on request. When we lodge your return, it is done through the supervising tax agent's TPB number, which means you receive all the protections and benefits of working with a registered agent.

[Get in touch](/contact) with our team and we will share our registration details and explain how our process works.
 `,
 },
 {
 slug: "how-does-payg-withholding-work",
 title: "How does PAYG withholding work in Australia?",
 description:
 "PAYG withholding is how your employer collects tax from your wages before paying you. Here is how the system works.",
 category: "Tax Return",
 date: "24 November 2024",
 readTime: 4,
 body: `
PAYG (Pay As You Go) withholding is the system Australian employers use to deduct income tax from your wages before paying you. The withheld amount is paid directly to the ATO as a prepayment of your annual tax liability. For working holiday makers with their [TFN](/tfn) on file, the correct PAYG withholding rate is 15% on the first $45,000 of earnings. Without a TFN, the rate jumps to 45%.

## How does PAYG work for working holiday makers?

The PAYG process for a working holiday maker:

1. You provide your [TFN](/tfn) and complete a Tax File Number Declaration form
2. You declare your visa status as Working Holiday Maker on the form
3. Your employer applies the 15% rate to your gross wages
4. The withheld amount is paid by the employer to the ATO
5. At year-end, your tax return reconciles the total withheld against your actual tax liability

If you do not provide your TFN, your employer must withhold at 45%. The excess is recovered when you lodge your [tax return](/tax-return), but the money is locked up with the ATO until then.

## What appears on your payslip?

Every Australian payslip should show:

- **Gross pay**: total earnings before deductions
- **Tax withheld**: amount deducted as PAYG (should be 15% of gross for working holiday makers)
- **Super**: 12% super contribution your employer pays (not deducted from your pay)
- **Net pay**: amount that lands in your bank account

If you see 45% being withheld when you have provided your TFN, raise it with your employer immediately. If they cannot fix it, [send us your payslip](/contact) and we will work out the correct treatment.

## How does PAYG connect to your tax return?

At year-end, your employer finalises their payroll reporting:

- Total wages paid to you for the year are reported to the ATO
- Total PAYG tax withheld is reported to the ATO
- Both figures appear in your income statement
- We use these figures when we prepare your [tax return](/tax-return)

The ATO then compares:

- What you actually owed (calculated from your total income and visa status)
- What was withheld via PAYG throughout the year

If too much was withheld, you get a refund. If too little was withheld, you owe the difference.

## Common PAYG issues for working holiday makers

The most frequent problems we see:

- 45% withholding because TFN was not on file when work started
- 30% withholding because the employer was not registered with the ATO as an employer of working holiday makers
- Tax-free threshold incorrectly claimed on the Tax File Number Declaration form
- No PAYG withheld at all on cash-in-hand work
- Mixed PAYG and ABN income complicated by incorrect setup

If your payslip looks wrong or you suspect an error, [get in touch with our team](/contact). We work out what should have been withheld and recover any overpaid amount through your tax return.
 `,
 },
 {
 slug: "australian-financial-year-dates",
 title:
 "What is the Australian financial year and when does it start and end?",
 description:
 "Australia uses a financial year that runs from 1 July to 30 June, not the calendar year. Here is what that means for your tax.",
 category: "Tax Return",
 date: "25 November 2024",
 readTime: 3,
 body: `
The Australian financial year runs from 1 July to 30 June of the following calendar year. This is different from the calendar year and different from the tax year used in many other countries. The current financial year as of mid-2026 is 2025-26 (1 July 2025 to 30 June 2026). Knowing these dates matters for working holiday makers because all income earned in a financial year must be lodged together on one tax return.

## How are Australian financial years named?

Australian financial years span two calendar years, so they are named using both:

- **2024-25 financial year**: 1 July 2024 to 30 June 2025
- **2025-26 financial year**: 1 July 2025 to 30 June 2026
- **2026-27 financial year**: 1 July 2026 to 30 June 2027

When someone refers to "the current tax year" or "this financial year", they mean whichever year is currently in progress.

## Why do these dates matter for working holiday makers?

The dates determine which return your income falls under:

- Arrived November 2024, worked through May 2025: all income falls in the 2024-25 financial year. Lodge after 30 June 2025.
- Arrived May 2024, left August 2024: income spans two financial years. You need to lodge separate returns for 2023-24 (May-June 2024 income) and 2024-25 (July-August 2024 income).
- Arrived July 2025, worked through to June 2026: all income falls in the 2025-26 financial year. Lodge after 30 June 2026.

If your stay crosses 30 June, you will need to lodge two tax returns, one for each financial year. Our team handles this commonly.

## What are the key dates to remember?

- **30 June**: financial year ends
- **1 July**: new financial year begins, tax return lodgment window opens
- **14 July**: employers begin finalising income statements
- **31 July**: most income statements should be finalised by this date
- **31 October**: standard deadline to lodge your tax return
- **Extended (around May the following year)**: deadline if you lodge under the supervision of a registered tax agent like our team

Lodgment opens 1 July, but it is usually worth waiting until late July or early August so your employer's income statement is finalised. We monitor this for you when you lodge through our service.

## What about super and quarterly deadlines?

Superannuation contributions are paid quarterly:

- Q1 (Jul-Sep): due by 28 October
- Q2 (Oct-Dec): due by 28 January
- Q3 (Jan-Mar): due by 28 April
- Q4 (Apr-Jun): due by 28 July

These dates matter if you are checking that your employer has paid your [superannuation](/superannuation) correctly before you leave Australia.

[Get in touch with our team](/contact) to lodge your Australian tax return under the supervision of a registered tax agent and make sure every refund you are entitled to is claimed.
 `,
 },
 {
 slug: "cash-in-hand-tax-return",
 title:
 "Can you lodge a tax return if you worked cash in hand in Australia?",
 description:
 "Working cash in hand does not exempt you from your tax obligations. Here is what you need to declare and how to handle it.",
 category: "Tax Return",
 date: "27 November 2024",
 readTime: 4,
 body: `
Yes, you must lodge a tax return if you worked cash in hand in Australia. Cash payments are still taxable income, just like wages paid through a bank transfer. The only difference is that no PAYG tax was withheld at the time of payment, so you are responsible for declaring the income and paying any tax owed at the end of the financial year. Failing to declare cash income is tax evasion. Our team handles tax returns involving cash-in-hand work regularly.

## What does cash in hand work mean for your tax?

When you are paid cash in hand:

- No PAYG tax is withheld at the time of payment
- No record exists in the ATO's payroll reporting system
- You receive the full amount, but the tax liability is shifted to you
- You declare the income yourself on your tax return at year-end

This means you may owe tax at the 15% working holiday maker rate on the cash earnings, paid at lodgment rather than through PAYG.

## What records should you keep?

Without PAYG records, your own documentation is essential:

- Dates you worked (record each shift)
- Hours worked per shift
- Rate of pay agreed
- Amount received per payment
- Name and contact details of the person or business that paid you
- Any text messages, emails, or roster notifications confirming the work

Photograph or scan these records and save them somewhere secure. The ATO can request them up to five years later.

## What about superannuation on cash in hand work?

If you were an employee being paid cash (not a contractor under an [ABN](/abn)), your employer is still legally required to pay 12% superannuation on top of your wages. Many cash-paying employers do not. This is a serious breach of Australian employment law.

If you are owed unpaid super:

- Keep all records of your hours and wages
- [Get in touch with our team](/contact) and we can help raise the issue
- We work through the recovery process for our clients regularly

The amount recovered can be significant if you worked for several weeks or months.

## What if you were not given a payslip?

Working without payslips is unfortunately common in cash arrangements. To work around this:

- Use your own records as the basis for declaring income
- Be honest and consistent (estimate where exact figures are not available)
- Keep any evidence of the work (bank deposits showing the cash you deposited, text exchanges, photos at the workplace)

An honest return with slightly imprecise figures is much better than not lodging at all. The ATO is far more concerned about deliberate non-disclosure than minor estimation errors made in good faith.

## What does our service do with cash-in-hand income?

When you lodge through us:

- We declare the cash income at the correct 15% working holiday maker rate
- We work out exactly how much you owe (if any)
- We claim any work-related deductions to reduce the tax bill
- We can also help recover any unpaid super if you were an employee

[Send us your details](/contact) and we will work out the best way to handle your return, even if your records are incomplete.
 `,
 },

 // ─── SUPER ─────────────────────────────────────────────────────────────────
 {
 slug: "what-is-superannuation",
 title: "Superannuation in Australia: working holiday maker guide (2025-26)",
 description:
 "Superannuation is Australia's compulsory retirement savings system. Working holiday makers on 417 and 462 visas earn super from employers at 12% of pay and can claim it back when leaving Australia via DASP.",
 category: "Super",
 date: "29 November 2024",
 readTime: 5,
 body: `
Superannuation (super) is Australia's compulsory retirement savings system. Australian employers must contribute 12% of your ordinary time earnings into a super fund on top of your wages. Working holiday makers are entitled to receive super contributions just like Australian workers, and can claim the accumulated balance back when they permanently leave Australia through the Departing Australia Superannuation Payment (DASP) process. Our team handles DASP applications for working holiday makers from anywhere in the world.

## How much super does your employer contribute?

The current rate as of 2026 is 12% of your ordinary time earnings:

- The rate was 11.5% from 1 July 2024 to 30 June 2025
- The rate increased to 12% from 1 July 2025 and remains at 12%
- Super is paid **on top of** your wages, not deducted from them
- Example: earn $1,000 in a week → employer pays an additional $120 into your super fund

If your payslip shows super being deducted from your gross pay, that is incorrect. Super is always an additional cost to the employer.

## Which super fund do your contributions go into?

When you start a new job, your employer asks which fund to use:

- If you nominate a fund, contributions go there
- If you do not nominate, your employer uses the "stapled fund" rule (the fund attached to your TFN from previous Australian work)
- If you have no stapled fund (your first Australian job), the employer uses their default fund

For working holiday makers, the specific fund matters less than for permanent residents because you will withdraw the balance when you leave. What matters is that you can find and access the account at withdrawal time. Our team can locate accounts across multiple funds for you.

## Are all working holiday makers eligible for super?

Yes, in almost all employment cases:

- Employers must pay super for any employee earning wages (the $450/month threshold was removed in 2022)
- Super applies from your first dollar of earnings
- Both Working Holiday Visa (subclass 417) and Work and Holiday Visa (subclass 462) holders are eligible
- Working as a contractor under an [ABN](/abn) usually does not generate super contributions, with some exceptions

If you are unsure whether super is being paid for you, [send us your details](/contact) and we will check.

## How do you claim your super back when you leave Australia?

The process is called Departing Australia Superannuation Payment (DASP). The steps:

1. Your visa must have expired or been cancelled
2. You must have permanently left Australia
3. Apply for DASP through our service, which we lodge on your behalf
4. The fund (or the ATO if balance was transferred) pays out the balance

Important: DASP withdrawals are taxed at 65% of the taxable component for working holiday makers. This is higher than the 35% that applied before 2017. Despite the tax, claiming the super is still worthwhile because the alternative is leaving it behind permanently.

See our detailed article on [how the DASP process works](/blog/what-is-dasp-super-withdrawal) for a step-by-step explanation.
 `,
 },
 {
 slug: "how-much-super-should-employer-pay",
 title: "How much super should your employer pay in Australia? (12% in 2025-26)",
 description:
 "From 1 July 2025, Australian employers must contribute 12% of your ordinary earnings to your super fund. How working holiday makers can check what is owed and what to do if your employer is short.",
 category: "Super",
 date: "2 December 2024",
 readTime: 4,
 body: `
Your employer should be paying 12% of your ordinary time earnings into your super fund as of 2026. The rate increased from 11.5% to 12% on 1 July 2025 and has stayed at 12%. Super is paid on top of your wages, not deducted from them. The easiest way to verify your super is being paid correctly is to check your super fund account directly. If contributions are missing or incorrect, our team can help recover unpaid super on your behalf.

## What counts as ordinary time earnings?

Ordinary time earnings (OTE) form the base for super contributions:

- Regular wages for ordinary hours of work
- Some allowances (depending on the type)
- Commissions, bonuses, and loadings (in most cases)
- Annual leave loading (in most cases)

**Not** included in OTE:

- Overtime payments
- Reimbursements of expenses
- Genuine redundancy payments

For most working holiday makers working standard shifts, the 12% applies to the core of what you earn each pay period.

## How can you check your super is being paid?

There are two reliable ways:

1. **Check your super fund directly**: log into your fund account online and look at contribution history. Each employer contribution should appear with a date and amount.
2. **Cross-check against your payslip**: your payslip shows the super contribution as a line item. Compare it to what arrived in your fund.

Super is paid quarterly by most employers, not weekly with your wages. The deadlines are:

- Q1 (Jul-Sep) → paid by 28 October
- Q2 (Oct-Dec) → paid by 28 January
- Q3 (Jan-Mar) → paid by 28 April
- Q4 (Apr-Jun) → paid by 28 July

So a contribution for July might not appear in your fund until late October.

If you cannot find which fund holds your super, [get in touch with our team](/contact). We locate accounts across multiple funds and can confirm what has been paid for you.

## What if your employer is not paying super correctly?

If contributions are missing, late, or below the required rate, the issue must be addressed before you leave Australia:

- First, [check the contributions in your fund](#how-can-you-check-your-super-is-being-paid)
- Compare against the super line on your payslips
- Talk to your employer if there is a clear discrepancy (it may be an administrative error)
- If unresolved, our team can pursue the unpaid super through the Superannuation Guarantee Charge (SGC) process

The SGC is a formal recovery mechanism. We have helped working holiday makers recover thousands of dollars in unpaid super this way. [Send us your details](/contact) with your payslips and super statements and we will investigate.

## What records should you keep?

To support a super recovery claim:

- All payslips showing super line items
- Your super fund's contribution statements
- Employment dates and weekly hours
- Pay rates and gross earnings
- Employer name and ABN

The more complete the records, the easier the recovery process.
 `,
 },
 {
 slug: "what-is-dasp-super-withdrawal",
 title: "DASP explained: how to claim your super back after leaving Australia",
 description:
 "DASP (Departing Australia Superannuation Payment) is the official ATO process for working holiday makers on 417 and 462 visas to claim their super back after leaving Australia. How it works and what to prepare.",
 category: "Super",
 date: "5 December 2024",
 readTime: 5,
 body: `
DASP (Departing Australia Superannuation Payment) is the official process used by working holiday makers and other temporary visa holders to withdraw their accumulated Australian superannuation after leaving the country. To apply, your visa must have expired or been cancelled and you must be outside Australia. The DASP withholding tax rate for working holiday makers is 65% of the taxable component. Our team handles DASP applications end-to-end, from locating your super accounts to receiving the payment.

## Who can apply for DASP?

To qualify for DASP, you must:

- Have held a temporary Australian visa (working holiday visas subclass 417 and 462 are eligible)
- Have left Australia permanently (or at least with no immediate plan to return on the same visa)
- Have your visa expired or cancelled after departure
- Have super in an Australian super fund or held by the ATO

You generally cannot apply while still inside Australia on a valid working holiday visa. The application must be made after you have departed and your visa has ended.

## How do you apply for DASP?

Our team handles the entire DASP application for you:

1. [Send us your details](/superannuation): TFN, passport, visa dates, employment history
2. We locate all your super accounts (across multiple funds if needed)
3. We prepare and lodge the DASP application on your behalf
4. The super fund verifies your details and releases the payment
5. The funds are paid to your nominated bank account (anywhere in the world)

If your super was held in multiple funds, we lodge separate DASP applications for each. Alternatively, we can consolidate your super into one fund before applying to simplify the process.

## How long does DASP take to process?

Most DASP applications are processed within 28 days:

- Some applications process faster, sometimes within two weeks
- Complex cases (multiple funds, identity verification issues) can take longer
- The fund verifies your details, the ATO confirms your visa status, then payment is released

If 28 days pass without payment, our team chases the application directly. You do not need to follow up with the fund or ATO yourself.

## How much will you receive from DASP?

Your DASP payout depends on:

- The total contributions made by your employers (12% of your earnings throughout your stay)
- Any investment returns the fund has generated on those contributions
- The 65% DASP withholding tax for working holiday makers (applied to the taxable component)

The 65% tax rate is high, but the alternative is leaving the super behind permanently. The net amount, even after tax, is usually still a meaningful sum (often several thousand dollars depending on how long you worked).

See our article on [what tax is taken from your DASP](/blog/tax-on-super-withdrawal-backpacker) for a detailed breakdown of how the tax is calculated.

[Get in touch with our team](/contact) to handle your DASP application, locate every super fund holding your contributions, and receive your payment overseas.
 `,
 },
 {
 slug: "how-to-apply-for-super-back",
 title: "How to apply for your super back after leaving Australia (DASP guide)",
 description:
 "Step-by-step DASP application guide for working holiday makers: finding your super funds, gathering documents, submitting to each fund, and receiving the payment in your overseas bank account.",
 category: "Super",
 date: "13 December 2024",
 readTime: 6,
 body: `
To apply for your superannuation back after leaving Australia, work with our team who manages the entire Departing Australia Superannuation Payment (DASP) process end-to-end. We locate all your super accounts, prepare and lodge the applications on your behalf, and arrange payment to your nominated bank account anywhere in the world. The DASP withholding tax for working holiday makers is 65% of the taxable component, but after tax, the net amount is usually still substantial.

## Step 1: Find all your super accounts

The first step is identifying every super account that holds your contributions. Most working holiday makers have super spread across multiple funds because each employer may have used a different default fund.

We locate your super accounts by:

- Checking the funds you nominated to employers
- Cross-referencing TFN-linked accounts across the ATO system
- Identifying balances transferred to the ATO as unclaimed super

Once we have a complete picture, you can either apply for each fund separately through DASP or consolidate them into a single fund first. Consolidating simplifies the process (one application instead of many) but takes a few extra weeks upfront.

## Step 2: Gather your documents

To prepare your DASP application, we need:

- Your Tax File Number (TFN)
- Passport details (the passport you held when you worked in Australia)
- Visa grant and expiry dates
- Super fund name and member number for each fund
- Bank account details (Australian or overseas, your choice)

The bank account does **not** have to be Australian. International transfers are standard for DASP payments and we can pay into accounts in most countries.

## Step 3: We lodge the DASP application

Once we have your details, we handle the lodgment:

- Separate applications for each fund (if you have multiple)
- Identity and visa verification handled through our tax agent portal
- All correspondence with the fund and ATO managed by us
- You receive a reference number for tracking

You do not need to navigate ATO online services or contact the super funds yourself.

## Step 4: Receive your payment

After lodgment:

- The fund verifies your details (usually within 28 days)
- 65% DASP withholding tax is deducted from the taxable component
- The net amount is paid to your nominated bank account
- We notify you when the payment is released

International transfers can take a few additional business days to arrive, depending on your destination country and bank.

## What if you cannot find some of your super?

If you suspect super was paid for you but cannot find the account, we can investigate:

- Search across major funds using your TFN
- Check ATO records for transferred unclaimed super balances
- Identify any employers who may have failed to pay super and pursue the unpaid amounts

See our article on [finding lost superannuation](/blog/how-to-find-lost-superannuation) for more detail. We do this search as part of every DASP application we handle, to make sure no super is left behind.

[Get in touch with our team](/contact) to handle your DASP application, locate every super fund holding your contributions, and receive your payment overseas.
 `,
 },
 {
 slug: "how-long-does-dasp-take",
 title: "How long does DASP take? Super claim processing time for working holiday makers",
 description:
 "Most DASP applications are processed within 28 days. What affects the timeline, common reasons for delays, and what working holiday makers can do if their super claim is taking longer than expected.",
 category: "Super",
 date: "16 December 2024",
 readTime: 4,
 body: `
A DASP (Departing Australia Superannuation Payment) application is usually processed within 28 days of submission. In many cases the process is faster, particularly if your details are straightforward and the super fund has all the information needed to verify your identity and membership. Our team monitors every DASP application we lodge and chases up any delays directly with the fund.

## What happens after you submit a DASP application?

The process after lodgment:

1. The ATO verifies your visa and residency information
2. The application is forwarded to your super fund
3. The fund verifies your membership details and identity
4. The fund calculates the payable amount and applies the 65% DASP tax
5. The net payment is released to your nominated bank account

Each stage usually takes a few business days. The total timeline depends on how quickly the fund processes its side.

## What can cause DASP delays?

The most common causes of delay are:

- **Name mismatch**: the name on your application does not exactly match the name your super fund has on record
- **Date of birth mismatch**: a typo or format difference
- **Address discrepancies**: addresses recorded inconsistently across systems
- **Applying before visa expiry**: DASP applications while a valid working holiday visa is still active are usually rejected
- **Multiple member numbers in one fund**: rare but happens with very large funds

When you lodge through our service, we cross-check every detail against the fund's records before submitting, which avoids most of these issues from the start.

## What if 28 days pass without payment?

If your DASP application is taking longer than expected:

- Our team checks the status directly with the fund and the ATO
- We identify which stage the application is stuck at
- We follow up on your behalf and resolve any verification issues
- You do not need to contact the fund or ATO yourself

[Get in touch](/contact) at any point if you want a status update on your application.

## What if you applied for multiple funds?

If you had super in multiple funds and we lodged separate DASP applications for each:

- Each application has its own independent timeline
- One fund may pay out faster than another
- We track every application's reference number for you
- We notify you as each payment is released

Total time from first lodgment to last payment is usually four to six weeks, occasionally longer if any fund is slow to verify.

## What about international payment delays?

After the fund releases the payment, the international transfer can take additional time depending on your country and bank:

- Australian bank accounts: payment usually appears within 1-2 business days
- Major overseas banks (UK, US, EU): 2-5 business days
- Smaller or regional banks: up to 10 business days

Account currency conversion can also affect timing. If you want to receive the funds in a specific currency, let us know when we set up the application.
 `,
 },
 {
 slug: "tax-on-super-withdrawal-backpacker",
 title:
 "DASP tax rate: 65% on super withdrawal for working holiday makers explained",
 description:
 "A 65% withholding tax applies to DASP payments for working holiday makers (417 and 462 visa holders). How it is calculated, why it is higher than for other visa types, and what your net payout looks like.",
 category: "Super",
 date: "19 December 2024",
 readTime: 4,
 body: `
The tax on a DASP super withdrawal for working holiday makers is 65% of the taxable component. This rate applies specifically to holders of working holiday visas (subclass 417 and 462) and is higher than the rate applied to other temporary visa holders. The tax is withheld by the super fund or ATO before the payment is sent to you, so you receive the net amount. Despite the high rate, claiming your super is still worthwhile because the alternative is leaving the entire balance behind.

## What is the taxable component of your super?

Super payments are made up of two components:

- **Taxable component**: includes employer contributions and earnings on those contributions
- **Tax-free component**: includes any after-tax personal contributions (rare for working holiday makers)

For working holiday makers, the vast majority of the super balance is the taxable component, because all super is employer-paid. The tax-free component, if any, is paid out without withholding.

## What does the 65% rate mean in practice?

The 65% tax applies to the taxable component before payment:

- Super balance $2,000 (all taxable): you receive $700 after tax
- Super balance $5,000 (all taxable): you receive $1,750 after tax
- Super balance $10,000 (all taxable): you receive $3,500 after tax

The withholding is substantial, but the remaining 35% is still money that was paid on top of your wages by your employer. Without claiming, you receive nothing.

## Why is the rate higher for working holiday makers?

The 65% DASP rate was introduced in January 2017 as part of the broader "backpacker tax" reforms:

- Before 2017: 35% DASP rate
- From 1 January 2017: 65% for working holiday visa holders (subclass 417 and 462)
- Other temporary visa holders: still pay 35%

The government's reasoning was that the existing 15% working holiday maker income tax rate is already concessional, so a higher rate on the super withdrawal balances out the overall tax treatment.

## Is there any way to reduce the DASP tax?

For working holiday makers, the 65% rate is fixed:

- It is applied by the fund or ATO before payment
- There is no general mechanism to claim it back through a tax return
- Tax treaty exemptions do not apply to DASP

The practical step is to make sure no super is left behind. Even at 65%, claiming a small balance is better than abandoning it. [Get in touch with our team](/superannuation) and we identify all funds holding super for you, so the DASP claim captures every dollar.

[Get in touch with our team](/contact) to handle your DASP application, locate every super fund holding your contributions, and receive your payment overseas.
 `,
 },
 {
 slug: "what-happens-to-unclaimed-super",
 title: "Unclaimed super in Australia: what happens if working holiday makers never claim?",
 description:
 "Unclaimed superannuation does not disappear, but six months after leaving Australia it transfers to the ATO. How working holiday makers can claim it back years later through DASP.",
 category: "Super",
 date: "22 December 2024",
 readTime: 4,
 body: `
Unclaimed superannuation does not disappear. After a period of inactivity, the super fund transfers the balance to the ATO, where it is held against your Tax File Number as unclaimed money. You can still claim it through the standard DASP (Departing Australia Superannuation Payment) process even after it has been transferred. The 65% DASP withholding tax still applies. Our team handles claims for super held by both funds and the ATO.

## When does super become "unclaimed"?

A super fund is required to transfer your balance to the ATO when:

- The fund cannot contact you (mail returned, no response to communications)
- You have permanently left Australia and have not claimed within a defined period
- Your account has been inactive for several years
- A DASP application was attempted but could not be paid

Once transferred, the balance sits with the ATO as unclaimed super against your TFN. It does not disappear.

## Can you still claim it after it transfers to the ATO?

Yes. The DASP process still applies:

- You apply through the same DASP mechanism
- The 65% withholding tax for working holiday makers still applies
- The payment comes from the ATO instead of the fund
- The process and timeline are similar to claiming directly from a fund

Whether your super is sitting in a fund or with the ATO, our team handles both as part of one DASP application.

## How can you find out if your super has transferred to the ATO?

When we lodge a DASP application, we automatically:

- Search across funds using your TFN
- Check ATO records for any balance held as unclaimed super
- Identify every account associated with your TFN
- Lodge claims against all balances so nothing is left behind

You do not need to investigate this yourself. [Send us your details](/superannuation) and we run the full search.

## Does your super earn interest while held by the ATO?

The ATO does pay a small amount of interest on unclaimed super balances to roughly track inflation. However:

- Investment returns are minimal compared to what a fund would have generated
- The longer your super sits with the ATO, the more growth opportunity you miss
- This is a practical reason to claim sooner rather than later

## The bottom line for working holiday makers

Claim your super. It is your money, paid on top of your wages as part of your employment in Australia. Even after the 65% DASP tax, you receive 35% of the balance. For someone who worked for six months, this can be several thousand dollars. Most working holiday makers we help recover an amount well worth the application process.

[Get in touch with our team](/contact) to handle your DASP application, locate every super fund holding your contributions, and receive your payment overseas.
 `,
 },
 {
 slug: "can-you-withdraw-super-in-australia",
 title: "Can working holiday makers withdraw super while still in Australia?",
 description:
 "Generally, no - super is preserved until retirement age, except in very limited circumstances (severe financial hardship, compassionate grounds). Why working holiday makers must wait for DASP after leaving Australia.",
 category: "Super",
 date: "24 December 2024",
 readTime: 4,
 body: `
No, you cannot withdraw your superannuation while you are still in Australia on a valid working holiday visa. The Departing Australia Superannuation Payment (DASP) process is specifically designed for people who have permanently left Australia and whose visa has expired or been cancelled. You must depart first, then apply once outside Australia. Our team handles DASP applications remotely so you can claim from your home country.

## Why can you not access your super early?

Australian superannuation is designed as a long-term retirement savings system:

- Early access rules are strict and apply to all workers
- There is no general right to access super early because you are leaving Australia soon
- The DASP process is the only legal mechanism for temporary visa holders to withdraw

The rules exist to maintain the integrity of the super system. They apply equally to citizens, residents, and temporary visa holders.

## What are the conditions for DASP eligibility?

To qualify for DASP, you must meet all of the following:

- Have held a temporary Australian visa (working holiday visas 417 and 462 are eligible)
- Have permanently left Australia
- Your visa must have expired or been cancelled after departure
- You must apply from outside Australia

A DASP application submitted while you are still in Australia on a valid working holiday visa will be rejected.

## What should you do if you are leaving Australia soon?

Get organised before you go, then claim once you have left:

1. Collect your super fund details (fund name, member number, account number) before you leave
2. Confirm your bank account details for receiving the payment
3. Update your contact details with each fund (email address you will keep using)
4. After departure and visa expiry, [get in touch with our team](/superannuation) to lodge the DASP

We handle everything once you are outside Australia and your visa has ended.

## What about financial hardship?

There are compassionate grounds and severe financial hardship provisions in Australian super law, but they:

- Have very narrow eligibility criteria
- Are almost never available to working holiday visa holders in normal circumstances
- Require evidence of genuine hardship under strict definitions

Working holiday makers should plan around the DASP process rather than expecting early access.

## When can you actually apply for DASP?

The DASP window opens once both conditions are met:

- You have permanently left Australia
- Your working holiday visa has expired or been cancelled

For working holiday visas, this typically means:

- After visa expiry date (one year after grant, plus any extensions)
- After visa cancellation (if you cancel it early on departure)

See our detailed article on [how to apply for DASP](/blog/how-to-apply-for-super-back) for everything you need to do once you have left Australia.

[Get in touch with our team](/contact) to handle your DASP application, locate every super fund holding your contributions, and receive your payment overseas.
 `,
 },
 {
 slug: "how-to-find-lost-superannuation",
 title: "How to find lost super in Australia: working holiday maker tracking guide",
 description:
 "Working holiday makers often end up with super spread across multiple funds, or transferred to the ATO. How to track every dollar through myGov, ATO online services, and the super funds themselves.",
 category: "Super",
 date: "29 December 2024",
 readTime: 4,
 body: `
To find lost or unclaimed superannuation in Australia, work with our team. Under the supervision of a registered tax agent, we can search across all major super funds and ATO records using your Tax File Number to identify every account holding your super. Working holiday makers often accumulate super across multiple funds without realising it, and tracking down every account before lodging your DASP claim makes sure no money is left behind.

## Why does super get lost or spread across multiple accounts?

Most working holiday makers end up with super in more than one fund:

- Every employer may have used a different default fund when you did not nominate one
- Moving between jobs without choosing a single fund creates new accounts each time
- Changes of address mean funds lose contact and accounts become inactive
- Inactive accounts eventually transfer to the ATO as unclaimed super

For working holiday makers who move around frequently, this is a genuine risk. Catching it before you leave Australia is much simpler than recovering it from overseas.

## How do we track down all your super accounts?

Our team can run a comprehensive search using your TFN:

- Search across major Australian super funds
- Check ATO records for any balance held as unclaimed super
- Identify every account associated with your TFN
- Cross-reference against the employers you worked for

You receive a complete picture of every dollar of super held in your name, regardless of which fund it sits in or whether it has transferred to the ATO. [Get in touch](/superannuation) and we will run the search for you.

## What about consolidating multiple accounts?

If you have super spread across multiple funds, consolidating them into a single account before your DASP application simplifies the process:

- One DASP application instead of multiple
- One payment instead of several
- One verification process instead of many
- Less administrative back-and-forth

We can manage the consolidation before lodging your DASP claim, or lodge separate applications for each fund if that is faster. Either approach works. We pick the right one based on your specific accounts.

## Why should you not delay claiming?

Super held by the ATO earns minimal returns:

- Investment growth on lost super is much lower than active fund returns
- The longer you wait, the less the balance grows
- ATO records of older accounts can become harder to recover after several years
- Identity verification becomes harder once you have been gone for a long time

If you are planning to leave Australia soon or have already left, [get in touch with our team](/superannuation). We make sure every dollar of your super is identified and included in your DASP application.

## What records help us find your super?

The more we know about your employment history, the more complete the search. Useful information includes:

- All Australian employers you worked for (company names)
- Approximate employment dates for each job
- Any super fund names you remember being mentioned
- Any super fund letters or emails you received
- Your TFN (which we use to query records)

If you do not have all this, that is fine. We can still find most accounts using just your TFN and passport details.

[Get in touch with our team](/contact) to handle your DASP application, locate every super fund holding your contributions, and receive your payment overseas.
 `,
 },
 {
 slug: "how-to-choose-super-fund",
 title: "How to choose a super fund as a working holiday maker in Australia",
 description:
 "When you start a job in Australia, you can nominate where your super goes. What a super fund is, how fees affect your DASP payout, and what working holiday makers should look for when choosing.",
 category: "Super",
 date: "10 January 2025",
 readTime: 4,
 body: `
For working holiday makers, the choice of super fund matters less than it would for an Australian resident building retirement savings. You will be withdrawing your super through the DASP process when you leave Australia, so the priorities are simplicity and accessibility, not long-term investment performance. The simplest approach is to nominate one fund at your first job and stick with it for every subsequent role. Our team can help you choose and manage your super setup to make the eventual DASP claim straightforward.

## What is a superannuation fund?

A super fund is an investment vehicle that holds your retirement savings in Australia. Key facts:

- Your employer contributes 12% of your wages into the fund (on top of your pay, not deducted)
- The fund invests those contributions on your behalf
- The balance grows over time through contributions and investment returns
- For working holiday makers, the balance is claimed back through [DASP](/blog/what-is-dasp-super-withdrawal) when you leave

Australia has hundreds of different super funds. As a working holiday maker, you do not need to research them in detail.

## How should working holiday makers choose a fund?

Three practical considerations matter:

- **Online access**: a clear member portal where you can check your balance
- **Reputation for handling DASP**: some funds process DASP applications faster than others
- **Simple identity verification**: funds that handle international identity verification well

Large industry funds and major retail funds generally meet all three criteria. For working holiday makers, picking any well-known fund and using it consistently is the right approach.

## What happens if you do not nominate a fund?

If you do not nominate a fund when starting a job:

1. Your employer checks for a "stapled fund" (any fund linked to your TFN from previous work)
2. If you have a stapled fund, contributions go there
3. If not, the employer uses their default fund

This is fine in practice, but it can result in super accumulating across multiple funds if you work for several employers. The more funds, the more DASP applications you need later (or the more consolidation work to combine them).

## What is the simplest approach for working holiday makers?

The cleanest setup:

1. At your first job, nominate one fund (any major fund works)
2. At every subsequent job, give the same fund details on your super nomination form
3. All contributions end up in one place
4. When you leave Australia, one DASP application claims everything

If you have already accumulated super in multiple funds, we can help consolidate them or manage separate DASP applications. [Get in touch with our team](/superannuation) and we will work out the best path for your specific situation.

[Get in touch with our team](/contact) to handle your DASP application, locate every super fund holding your contributions, and receive your payment overseas.
 `,
 },

 // ─── WORK RIGHTS ────────────────────────────────────────────────────────────
 {
 slug: "minimum-wage-australia-2025-26",
 title: "Minimum wage in Australia 2025-26: working holiday maker rate explained",
 description:
 "Australia has one of the highest minimum wages in the world. The current national minimum wage for working holiday makers, how casual loading works, and what to check on your payslip.",
 category: "Work Rights",
 date: "19 January 2025",
 readTime: 4,
 body: `
The national minimum wage in Australia from 1 July 2025 is $24.95 per hour for permanent employees and $31.19 per hour for casual employees (which includes the 25% casual loading). This applies to all workers, including working holiday makers. However, most industries are covered by modern awards or enterprise agreements that set higher minimum rates than the national minimum, so the actual rate that applies to your role is usually higher than $24.95.

## How is the Australian minimum wage set?

The Fair Work Commission reviews the national minimum wage annually:

- The review happens in mid-year (June/July)
- Any increase takes effect from the first full pay period on or after 1 July
- The rate is announced as a per-hour figure
- The casual loading of 25% applies on top for casual employees

The minimum is reviewed yearly to keep pace with cost of living and economic conditions.

## What is the minimum wage by employment type?

For the 2025-26 financial year:

- Permanent full-time and part-time: $24.95 per hour
- Casual employees: $31.19 per hour (25% loading included)
- Weekly minimum (38 hours): $948.10 gross
- Annual minimum (full-time): $49,300

If you earn less than these rates, you are being underpaid.

## Why do most workers get a higher rate than the minimum?

Most jobs in Australia are covered by a modern award or enterprise agreement that sets industry-specific minimum rates higher than the national minimum:

- **Hospitality Industry (General) Award**: covers cafes, restaurants, hotels
- **General Retail Industry Award**: covers shops and retail
- **Horticulture Award**: covers fruit picking, harvesting, agricultural work
- **Building and Construction General On-site Award**: covers construction
- **Cleaning Services Award**: covers cleaners
- **Aged Care Award**: covers aged care workers

Each award has multiple classification levels with different rates based on experience and responsibility. Ask your employer which award covers your role and what classification you have been placed at.

## What about penalty rates?

In many industries, working outside ordinary hours attracts penalty rates:

- Saturday rates (often 125-150% of base)
- Sunday rates (often 150-200% of base)
- Public holiday rates (often 225-250% of base)
- Overtime rates after a certain number of hours

See our article on [penalty rates in Australia](/blog/penalty-rates-australia) for the full breakdown.

## What should you do if you are being paid less than the minimum?

If you suspect you are being underpaid:

1. Identify which award covers your role (ask your employer or check your contract)
2. Find the correct rate for your classification and work pattern
3. Compare against your payslips
4. Calculate the underpayment over the period it occurred
5. [Get in touch with our team](/contact) and we will help you raise the issue and recover what you are owed

Working holiday makers have the same rights as any other worker in Australia. There is no visa-based barrier to recovering underpaid wages.
 `,
 },
 {
 slug: "how-many-hours-can-you-work-on-whv",
 title: "How many hours can you work on a working holiday visa in Australia? (417 & 462)",
 description:
 "Working holiday visa holders can work unlimited hours per week - the 6-month per-employer restriction was relaxed in 2022 for certain sectors. Current rules for 417 and 462 visa holders.",
 category: "Work Rights",
 date: "27 January 2025",
 readTime: 4,
 body: `
There is no limit on how many hours per week a working holiday visa holder can work in Australia. You can work full-time, part-time, or casually. However, visa condition 8547 limits you to a maximum of 6 months with any one employer, unless you work in an exempt sector (agriculture, plant/animal cultivation, tourism/hospitality, health, aged/disability care, childcare, food processing, or natural disaster recovery anywhere in Australia, or in some northern regions for other industries). Outside these exemptions, you must change employers after 6 months or request written permission from the Department of Home Affairs to continue.

## How many hours can you work each week?

No weekly maximum applies under the visa rules:

- Full-time work (typically 38 hours per week) is allowed
- Overtime hours are allowed
- Multiple jobs are allowed
- No weekly hour cap from the Department of Home Affairs

The only practical limits come from:

- Fair Work rules on rest breaks and reasonable additional hours
- Your award or enterprise agreement (which may cap ordinary hours)
- Your own physical and mental capacity

## What is the 6-month employer limit (condition 8547)?

Visa condition 8547 applies to all working holiday visa holders:

- You can work for the same employer for a maximum of **6 months**
- The 6 months is counted in **calendar months** from your start date (not by hours worked)
- The condition is mandatory unless an exemption applies
- The condition resets when a new working holiday visa is granted

Breach of condition 8547 can lead to visa cancellation. The condition has been part of working holiday visa terms for many years.

## Which sectors are exempt from the 6-month limit?

You can work beyond 6 months with the same employer without permission if the work is in:

- **Plant and animal cultivation** (agriculture, horticulture)
- **Fishing and pearling**
- **Tree farming and felling**
- **Mining**
- **Construction**
- **Tourism and hospitality** (in any location)
- **Health, aged care, and disability care**
- **Childcare**
- **Food processing**
- **Natural disaster recovery work**
- **Different locations of the same employer** (no single location exceeding 6 months)

These exemptions cover most of the industries that working holiday makers commonly work in.

## How do you work beyond 6 months in a non-exempt sector?

If your role does not fall within an exemption, you can request written permission from the Department of Home Affairs:

1. Submit a written request before the 6 months ends
2. Demonstrate operational need or other compelling reasons
3. Continue working while the request is assessed
4. Receive a written decision

Permission is granted at the Department's discretion and is not guaranteed.

## What other visa requirements apply?

You still need to meet other visa conditions:

- Hold a valid working holiday visa (subclass 417 or 462)
- Your primary purpose for being in Australia must still be a holiday (work is secondary)
- All tax obligations apply (provide your [TFN](/tfn), lodge your [tax return](/tax-return))
- Super entitlements still apply for all paid work

## How does the 88-day rule fit in?

The 88-day specified work requirement for a second working holiday visa is separate from condition 8547:

- 88 days of specified work in a regional area during your first visa
- Specified work includes agriculture, fishing, mining, construction in eligible areas, tourism/hospitality in remote areas, and disaster recovery
- This is about visa eligibility for extension, not employer duration
- Many specified-work industries are also exempt from the 6-month rule

For a third working holiday visa, the requirement is 6 months (179 days) of specified work during the second visa.

## What does this mean for super?

Your superannuation entitlement is based on your earnings, not hours:

- Earn any wages → super must be paid at 12% on top
- The previous $450/month threshold was removed in 2022
- More hours generally means more earnings, which means more super
- See [how much super your employer should pay](/blog/how-much-super-should-employer-pay) for the calculation

If you are working long hours and unsure whether your super is being paid correctly, [send us your payslips](/contact) and we will check.
 `,
 },
 {
 slug: "penalty-rates-australia",
 title: "Penalty rates in Australia: working holiday maker entitlement guide",
 description:
 "Penalty rates are higher pay rates for working weekends, public holidays, and unsociable hours. What working holiday makers in hospitality, retail and farm work are entitled to, and how to check your payslip.",
 category: "Work Rights",
 date: "10 February 2025",
 readTime: 4,
 body: `
Penalty rates are higher pay rates that apply when employees work outside ordinary hours, including weekends, public holidays, evenings, and early mornings. They are set by modern awards and enterprise agreements and apply to most workers in Australia, including working holiday makers. Common rates: Saturday around 125-150%, Sunday around 175%, public holidays around 225-250% of your ordinary rate. The exact rate depends on the award covering your role.

## Why do penalty rates exist?

Penalty rates compensate workers for the inconvenience and social cost of working at less desirable times:

- Long-established feature of Australian employment law
- Enforced by the Fair Work Commission
- Set out in modern awards covering each industry
- Cannot be paid below the award minimum (no opt-out)

The principle: working on a Saturday night or Christmas Day is worth more than working on a Tuesday afternoon.

## What are common penalty rates in hospitality?

The Hospitality Industry (General) Award covers cafes, restaurants, hotels, and pubs. Typical rates for full-time and part-time employees:

- Weekday after 7pm: 110-115% of ordinary rate
- Saturday: 125% of ordinary rate
- Sunday: 175% of ordinary rate
- Public holiday: 225% of ordinary rate
- Overnight work (specific definitions apply): higher rates

Casual employees also receive a 25% casual loading on top of these rates. The exact figures depend on classification level and shift pattern.

## What are common penalty rates in retail?

The General Retail Industry Award covers most retail roles:

- Saturday: 125% of ordinary rate
- Sunday: 150% of ordinary rate
- Public holiday: 225% of ordinary rate
- Late nights: penalty depends on store closing times

## How do you work out what penalty rates apply to you?

The penalty rates depend on:

1. Which award or enterprise agreement covers your role (ask your employer or check your contract)
2. Your employment classification within that award
3. Whether you are casual, part-time, or full-time
4. The specific day, time, and shift length

If you are unsure about any of these, [get in touch with our team](/contact). We work out the correct rate for your shifts and check your payslips against what should have been paid.

## What should you do if you are not being paid penalty rates?

If you worked weekends or public holidays without receiving penalty rates, you have been underpaid:

1. Identify the correct rate for the shift (we can help calculate this)
2. Calculate the underpayment across all affected shifts
3. Raise the issue with your employer first (it may be a payroll error)
4. If unresolved, [get in touch with our team](/contact) and we will help recover the unpaid amounts

The same protections apply to working holiday makers as to Australian workers. There is no visa-based barrier to claiming penalty rates you are owed.

Any additional income earned through penalty rates is still subject to the 15% working holiday maker rate and must be declared in your [tax return](/tax-return).
 `,
 },
 {
 slug: "can-your-employer-pay-you-cash-in-hand",
 title: "Cash-in-hand pay in Australia: working holiday maker risks and rights",
 description:
 "Cash-in-hand payments are common in some industries but come with serious tax and visa implications. What working holiday makers should know - including how to make sure tax and super are still paid.",
 category: "Work Rights",
 date: "12 February 2025",
 readTime: 4,
 body: `
Yes, an employer can legally pay you in cash in Australia. There is no law that requires wages to be paid by bank transfer. However, the method of payment does not change any of the employer's obligations: they must still withhold the correct PAYG tax, pay 12% superannuation on top of your wages, provide you with payslips, and meet the minimum wage and award conditions. Cash payment is legal; underpayment, missing super, or no payslips is not. Our team helps recover unpaid super and resolve tax issues for working holiday makers paid cash.

## What employer obligations still apply with cash in hand?

Even when paying cash, your employer must:

- Withhold the correct PAYG tax (15% for working holiday makers with a TFN, 45% without)
- Pay 12% [superannuation](/superannuation) on top of your wages
- Provide you with a payslip for every pay period
- Meet minimum wage and award conditions
- Pay penalty rates for weekend, public holiday, and overnight work
- Comply with the National Employment Standards

Many cash-paying employers do not meet these obligations. Cash itself is legal, but it often comes packaged with non-compliance.

## What are your tax obligations when paid cash?

All cash income is taxable in Australia. You must:

- Declare all cash wages in your [tax return](/tax-return) at the end of the financial year
- Pay tax at the 15% working holiday maker rate (or 45% if no TFN was on file)
- Keep your own records of dates worked, hours, rates, and amounts received

The ATO has multiple ways of identifying undeclared income (bank deposits, third-party reports, audits). Penalties for tax evasion are serious. The right approach is to keep records and declare honestly. See our article on [cash in hand tax returns](/blog/cash-in-hand-tax-return) for detail.

## What about missing super on cash work?

If you are being paid cash and not receiving super:

- You are missing 12% of your wages in contributions you are legally entitled to
- This is illegal under Australian law (the obligation applies regardless of payment method)
- Our team can help recover unpaid super through the Superannuation Guarantee Charge (SGC) process

Many cash-paying employers skip super because there is no payslip trail. We have helped working holiday makers recover thousands in unpaid super even years after the work happened. [Send us your details](/contact) if you suspect unpaid super.

## What are the warning signs of a non-compliant cash arrangement?

Be cautious if your employer:

- Insists on cash without offering a bank transfer option
- Asks you not to mention the arrangement to anyone
- Refuses to provide payslips
- Pays below the minimum wage or award rate
- Skips super contributions
- Asks you to work without your TFN being noted

These are signs the employer may be operating outside the law, which puts you at risk of underpayment, missing super, and tax problems.

## What records should you keep?

When paid cash, your own records are your only protection:

- Date and hours of each shift
- Hourly rate agreed
- Amount received per pay period
- Employer name, address, and business name
- Any messages or rosters relating to the work
- Photos of yourself at the workplace (helps establish you worked there)

Keep these records somewhere secure. They support both your tax return and any future claim for underpayment or unpaid super.
 `,
 },
 {
 slug: "fair-work-act-working-holiday-makers",
 title:
 "Fair Work Act protections for working holiday makers in Australia",
 description:
 "The Fair Work Act is Australia's main workplace relations law. How it protects working holiday makers on 417 and 462 visas - minimum wage, leave, unfair dismissal, and how to raise a complaint.",
 category: "Work Rights",
 date: "17 February 2025",
 readTime: 4,
 body: `
The Fair Work Act 2009 is Australia's primary employment law. It applies to working holiday makers in exactly the same way it applies to Australian citizens. The Act establishes the National Employment Standards (NES), which guarantee 11 minimum entitlements including minimum wage, paid public holidays, annual leave, and protection from unfair dismissal. Working holiday makers have full coverage under the Act regardless of their visa status. Our team can help you understand your rights and address any issues with your employer.

## What does the Fair Work Act guarantee?

The Act establishes the National Employment Standards (NES), which are 11 minimum entitlements applying to all employees regardless of visa status:

1. Maximum weekly hours of work (38 hours plus reasonable additional hours)
2. Right to request flexible working arrangements
3. Parental leave provisions
4. Annual leave (4 weeks per year for permanent employees, casual loading instead for casuals)
5. Personal/carer's leave (10 days per year for permanent employees)
6. Community service leave (jury duty, emergency services volunteers)
7. Long service leave
8. Public holidays (paid for permanent employees, penalty rates for working them)
9. Notice of termination
10. Redundancy pay (for qualifying employees)
11. Fair Work Information Statement (must be provided by employers)

Plus the right to receive at least the national minimum wage or applicable award rate.

## How do the NES apply to working holiday makers in practice?

For backpackers, the most relevant entitlements are:

- **Minimum wage**: $24.95/hour for permanent employees, $31.19/hour for casuals (from 1 July 2025)
- **Public holidays**: penalty rates of around 225% when working, or paid base rate when not working (permanent only)
- **Notice of termination**: proper notice or payment in lieu when employment ends
- **Maximum weekly hours**: protection from being required to work unreasonable additional hours
- **Award rates**: most workers are covered by an award with rates higher than the minimum

Working holiday makers do not generally accumulate enough service to qualify for annual leave entitlements (you would need 12 months in one job), but the wage and condition protections all apply from day one.

## What is the Fair Work Ombudsman?

The Fair Work Ombudsman (FWO) is the government agency responsible for enforcing the Fair Work Act. The FWO:

- Investigates complaints from workers
- Mediates disputes between employees and employers
- Takes legal action against employers who breach the Act
- Provides translated resources for migrant workers
- Has run campaigns targeting industries with high non-compliance

If you believe your rights under the Fair Work Act are being breached, [get in touch with our team](/contact). We help working holiday makers identify what they are owed and raise the issue through the right channels.

## Does reporting an employer affect your visa?

No. The Australian Government has specific protections for temporary visa holders who report workplace breaches:

- The Workplace Justice Visa provision allows temporary visa holders to remain in Australia to pursue a workplace complaint
- Your visa status cannot be used against you for raising legitimate concerns
- The FWO has explicit protections for migrant workers
- Reporting underpayment or unsafe conditions is your right, not a risk

This means you can address workplace issues without fearing visa consequences. We help working holiday makers raise complaints regularly and have seen many successful outcomes.
 `,
 },
 {
 slug: "employer-not-paying-correctly",
 title:
 "Employer not paying correctly in Australia? Working holiday maker rights guide",
 description:
 "Underpayment is a serious issue in Australia. How working holiday makers can check if they have been underpaid, raise it with the employer, and report to Fair Work Ombudsman if needed.",
 category: "Work Rights",
 date: "19 February 2025",
 readTime: 4,
 body: `
If your employer is not paying you correctly in Australia, you have clear rights and options to recover what you are owed. Underpayment is unfortunately common, especially in hospitality, agriculture, and cleaning industries that employ many working holiday makers. The most effective approach is to first identify the correct rate, calculate the underpayment with records, raise it with the employer, and if unresolved, escalate through formal channels. Our team helps working holiday makers identify and recover underpaid wages every week.

## How do you check what you should be paid?

Before raising any concern, work out what you should actually be earning:

1. Identify the modern award or enterprise agreement covering your role
2. Find the rate for your specific classification and work pattern
3. Add any applicable penalty rates (weekends, public holidays, evenings)
4. Add casual loading (25%) if you are a casual employee
5. Compare against what your payslips show

If you do not know which award covers you or how to calculate the correct rate, [get in touch with our team](/contact). We do this calculation for working holiday makers regularly.

## How should you raise underpayment with your employer?

In many cases, underpayment is a mistake rather than deliberate. Start by raising it directly:

- Approach your employer or manager calmly with your records
- Point out the specific discrepancy (date, hours, what was paid vs what should have been paid)
- Reference the relevant award and rate
- Keep the conversation factual

Many employers will correct a genuine error once it is pointed out. If they refuse or become hostile, that is a signal the underpayment may be deliberate, and you should escalate.

## What if your employer refuses to fix it?

If raising it internally does not work:

1. [Get in touch with our team](/contact) and we will assess the situation
2. We help you organise the records and calculations needed for a formal complaint
3. We can guide you to the right reporting channel (Fair Work Ombudsman investigation, small claims, etc.)
4. We follow up with you through the recovery process

The Fair Work Ombudsman has broad powers, including ordering back-payment, requiring written commitments from employers, and prosecuting serious cases. Our role is to help you build a strong claim before lodgment.

## What records do you need to keep?

The stronger your records, the easier the recovery:

- Every payslip you received
- Your roster or shift records
- Employment contract or letter of offer
- Any communications with your employer about pay (texts, emails)
- A diary of hours actually worked (even rough notes help)
- Bank statements showing what was deposited

If you have no payslips, write down what you remember as accurately as you can. The Fair Work Ombudsman accepts good-faith records when the employer has failed to provide payslips.

## Is your visa at risk if you report your employer?

No. There are specific protections in place for temporary visa holders:

- The Workplace Justice Visa provision allows you to remain in Australia to pursue a complaint
- Your visa status cannot be used against you for making a legitimate complaint
- The Fair Work Ombudsman has explicit safeguards for migrant workers
- Reporting workplace breaches does not affect future visa applications

We have helped working holiday makers raise complaints without any visa consequences. The protections exist specifically because reporting is in the public interest.
 `,
 },
 {
 slug: "leave-entitlements-working-holiday-visa",
 title:
 "Sick leave & annual leave on a working holiday visa in Australia",
 description:
 "Working holiday makers are entitled to leave in Australia, but the amount depends on employment type. Full-time, part-time, and casual entitlements explained for 417 and 462 visa holders.",
 category: "Work Rights",
 date: "24 February 2025",
 readTime: 4,
 body: `
Working holiday makers in Australia are entitled to leave under the same rules as Australian workers, but the entitlements depend on whether you are employed as full-time, part-time, or casual. Full-time and part-time employees accrue 4 weeks of annual leave and 10 days of personal/carer's leave per year. Casual employees do not receive paid leave but get a 25% casual loading on top of their hourly rate to compensate. Most working holiday makers in casual roles do not accumulate significant leave entitlements because they tend to change jobs often.

## What do full-time and part-time employees get?

Permanent employees (full-time and part-time) accrue paid leave under the National Employment Standards (NES):

- **Annual leave**: 4 weeks per year of full-time service (pro-rated for part-time)
- **Personal/carer's leave**: 10 days per year of full-time service
- **Compassionate leave**: 2 days per occasion
- **Long service leave**: typically requires 7-10 years of service (not relevant for most working holiday makers)
- **Public holiday pay**: paid at base rate if you do not work, penalty rate if you do

If you leave a job before using your accrued annual leave, you are entitled to have it paid out in your final pay.

## What about casual employees?

Casual workers do not accrue paid leave. Instead, they receive:

- **25% casual loading** on top of the applicable award hourly rate
- This loading compensates for the lack of paid leave
- The casual minimum wage is $31.19/hour from 1 July 2025 (national minimum + 25%)
- Most working holiday makers in hospitality, retail, and farm work are casual

If you call in sick as a casual, you are not paid for that shift. The trade-off is the higher hourly rate.

## How do you tell which category you are in?

Check your letter of engagement or employment contract:

- It should explicitly state full-time, part-time, or casual
- If you have a fixed weekly schedule and consistent shifts, you may be part-time (even if the language says "casual")
- If your shifts vary week to week with no guaranteed minimum, you are probably genuinely casual

The classification matters because:

- Casuals miss out on paid leave (but get the loading)
- Permanents miss out on the loading (but get paid leave)
- Misclassification can mean you are underpaid

If your classification looks wrong on paper, [get in touch with our team](/contact) and we will help work out whether you are owed extra pay.

## How is leave taxed?

Annual leave, when taken or paid out, is taxed in the same way as ordinary wages:

- The 15% working holiday maker rate applies
- Leave payouts at the end of employment are included in your final payslip
- All leave payments must be declared in your [tax return](/tax-return) for the year received

If you receive a leave payout, expect it to appear in the income statement we pull when preparing your tax return.

## What about long service leave?

Long service leave (LSL) entitlements typically require 7-10 years with a single employer and are very rare for working holiday makers. Most backpackers will not accumulate LSL. If somehow you have, the entitlement is paid out on departure and treated as taxable income.
 `,
 },
 {
 slug: "what-is-a-tax-invoice",
 title: "Tax invoice in Australia: what working holiday makers with an ABN need to issue",
 description:
 "If you are working as a contractor with an ABN in Australia, you must issue tax invoices to get paid. What a tax invoice must legally include and how to format one as a sole trader on a working holiday visa.",
 category: "Work Rights",
 date: "2 March 2025",
 readTime: 4,
 body: `
A tax invoice is a document a supplier issues to a buyer to request payment for goods or services. As a working holiday maker with an [ABN](/abn) operating as a contractor, you need to issue tax invoices to the businesses paying you. A valid tax invoice must include your name (or business name), your ABN, the date, a description of services, and the total amount. Issuing invoices without an ABN allows the business to legally withhold 45% of the payment.

## When is a tax invoice required?

You must issue a tax invoice when:

- The sale is worth $82.50 or more (including GST)
- The buyer requests one
- Most business clients require an invoice to process payment through their accounts system

Even when not strictly required, issuing invoices is good practice:

- Creates a clear record of what was agreed
- Documents what was delivered and when
- Supports your tax return at year-end
- Resolves payment disputes faster

## What must a valid tax invoice include?

For working holiday makers under the $75,000 GST threshold, a valid invoice must show:

- Your name (and business name, if you trade under one)
- Your ABN
- The date of the invoice
- A description of the services or goods provided
- The total amount payable
- A note that GST does not apply (or that the total is GST-free)
- Your contact details

If you are registered for GST (uncommon for working holiday makers), additional requirements apply including showing the GST amount separately.

## Why does quoting your ABN matter?

The "no-ABN withholding rule" applies if you invoice without a valid ABN:

- The business must withhold 45% of the payment
- You receive only 53% upfront
- The withheld amount can be reclaimed in your tax return, but you wait until year-end

Always quote your ABN on every invoice. If you do not have one yet, [register through our service](/abn) before you start invoicing. We typically get ABNs approved within 24 hours.

## How should you keep invoice records?

Keep a copy of every invoice you issue:

- A simple spreadsheet listing each invoice (date, client, amount, paid status)
- PDF copies of each invoice in cloud storage
- Bank statements showing each payment received

When we lodge your [tax return](/tax-return), we use these records to calculate your contractor income accurately. Without them, we have to estimate, which is less accurate and harder to defend if the ATO queries the return.

## What about invoices and superannuation?

ABN contractor work typically does not generate super contributions from the client. This is one of the trade-offs of contracting:

- Employees: client pays 12% super on top of wages
- Contractors: client pays only what the invoice says

If you are doing employee-like work but invoicing as a contractor, you may be a victim of sham contracting and entitled to super. See our article on [employee vs contractor](/blog/employee-vs-contractor-australia) for how to tell the difference.

[Get in touch with our team](/contact) if you have wage, super, or workplace issues - we handle the tax and super side and coordinate with Fair Work where needed.
 `,
 },
 {
 slug: "can-you-work-for-multiple-employers",
 title: "Working for multiple employers on a working holiday visa: tax & visa rules",
 description:
 "Yes - working holiday makers in Australia can work for more than one employer at the same time. What it means for tax (the 15% rate applies to each employer), super, and the 6-month visa rule.",
 category: "Work Rights",
 date: "9 March 2025",
 readTime: 3,
 body: `
Yes, working holiday visa holders in Australia can work for multiple employers simultaneously. There is no visa restriction on the number of jobs you can have. Each new employer needs your [TFN](/tfn) and a Tax File Number Declaration form, otherwise they must withhold tax at 45%. The 15% working holiday maker tax rate applies to your combined income up to $45,000 per financial year. All employers must pay 12% superannuation on top of your wages, often into different super funds.

## What do you need for each employer?

For every employer, you must provide:

- Your TFN (the same number for all jobs)
- A completed Tax File Number Declaration form
- Selection of Working Holiday Maker as your residency status
- Selection of "No" for the tax-free threshold question

Providing your TFN to one employer does not automatically cover the others. Until each employer has a declaration form on file, they must withhold tax at 45% from their portion of your wages.

## What are the tax implications of multiple jobs?

Working multiple jobs creates a few specific considerations:

- Each employer withholds 15% from their portion of your wages (correct for working holiday makers)
- Your total earnings across all jobs are taxed at 15% up to $45,000
- Above $45,000, the higher tax brackets kick in
- Combined income is calculated on your annual [tax return](/tax-return)

Because the working holiday maker rate is flat at 15%, multiple jobs do not create the same tax complications they would for an Australian resident (whose progressive tax brackets are sensitive to total income).

## What about super from multiple employers?

Each employer is independently required to pay super:

- 12% of your earnings with each employer (from 1 July 2025)
- Paid into a super fund (often the same one if you nominate it, otherwise different funds)
- All contributions must appear in your super accounts within the quarterly deadlines

Working multiple jobs means super may end up in multiple funds. Before you leave Australia, our team consolidates these or lodges separate DASP applications for each fund. See our article on [finding lost superannuation](/blog/how-to-find-lost-superannuation) for more.

## What records should you keep across multiple jobs?

When working multiple jobs:

- Keep payslips from every employer
- Note start and end dates with each
- Save copies of Tax File Number Declaration forms
- Save any super statements
- Track super fund details for each employer

When we prepare your [tax return](/tax-return), we pull income statements from every employer through our tax agent portal. Your records help us cross-check and catch any errors.

## Are there any practical limits to multiple jobs?

While there is no legal limit, practical considerations include:

- Your physical and mental capacity to work many shifts
- Scheduling conflicts between employers
- The Fair Work Act's "reasonable additional hours" provision
- Whether your visa primary purpose (holiday) is still being met

For tax and super purposes, multiple jobs are perfectly fine. Many working holiday makers work two or three casual jobs in hospitality alongside a weekend role or seasonal work.

[Get in touch with our team](/contact) if you have wage, super, or workplace issues - we handle the tax and super side and coordinate with Fair Work where needed.
 `,
 },
 {
 slug: "full-time-part-time-casual-australia",
 title:
 "Full-time vs part-time vs casual in Australia: working holiday maker guide",
 description:
 "Your employment classification affects pay rates, leave entitlements, and tax. What full-time, part-time, and casual mean in Australia for working holiday makers on 417 and 462 visas.",
 category: "Work Rights",
 date: "13 March 2025",
 readTime: 4,
 body: `
In Australia, employees are classified as full-time, part-time, or casual. Each classification has different entitlements: full-time and part-time employees accrue paid leave (annual leave, sick leave) and receive a base hourly rate. Casual employees receive a 25% loading on top of the base rate to compensate for no paid leave. The 15% working holiday maker tax rate applies to all three classifications. The classification matters because it affects your weekly pay, your job security, and your leave entitlements.

## What is full-time employment?

Full-time employees:

- Work a regular pattern, typically 38 ordinary hours per week
- Have a guaranteed schedule
- Receive the full set of leave entitlements under the National Employment Standards
- Get 4 weeks of annual leave per year
- Get 10 days of personal/carer's leave per year
- Receive the base hourly rate (no casual loading)
- Have the most job security

Few working holiday makers are in full-time employment because the visa is intended for shorter-term work and travel.

## What is part-time employment?

Part-time employees:

- Work fewer than 38 ordinary hours per week
- Have a regular, agreed schedule
- Receive the same entitlements as full-time employees on a pro-rata basis
- Accrue annual leave and sick leave at the pro-rata rate
- Receive the base hourly rate (no casual loading)
- Have schedule certainty week to week

Part-time work is more common for working holiday makers than full-time, but still less common than casual.

## What is casual employment?

Casual employees:

- Work on an as-needed basis without a guaranteed schedule
- Receive **no annual leave** or sick leave accruals
- Receive a **25% casual loading** on top of the base hourly rate
- Can typically refuse or accept shifts (subject to reasonable notice)
- May or may not be offered shifts week to week
- Have less job security but more flexibility

Casual is the most common arrangement for working holiday makers, particularly in hospitality, retail, and harvest work. Make sure the 25% loading is included in your rate. The casual minimum from 1 July 2025 is $31.19/hour (national minimum + 25%).

## How can you tell which one you are?

Check your employment contract or letter of engagement:

- It should explicitly state full-time, part-time, or casual
- A fixed weekly schedule suggests part-time (not casual)
- "Permanent" usually means full-time or part-time, not casual
- Variable shifts week to week typically mean casual
- A 25% loading on your hourly rate is a casual indicator

If your classification looks wrong, [get in touch with our team](/contact). We help working holiday makers identify misclassification and recover any underpaid amounts.

## How does each classification affect your tax?

The 15% working holiday maker tax rate applies to all three:

- Full-time wages: 15% withheld
- Part-time wages: 15% withheld
- Casual wages (including loading): 15% withheld

All income, regardless of classification, must be declared in your [tax return](/tax-return). Our team handles tax returns covering any combination of these arrangements.
 `,
 },

 // ─── MEDICARE & OTHER ────────────────────────────────────────────────────────
 {
 slug: "what-is-medicare-working-holiday-makers",
 title: "Medicare for working holiday makers in Australia: who is covered?",
 description:
 "Medicare is Australia's public health insurance system. Most working holiday makers on 417 and 462 visas are not covered - exceptions apply for citizens of countries with a Reciprocal Health Care Agreement.",
 category: "Medicare & Other",
 date: "14 March 2025",
 readTime: 4,
 body: `
Medicare is Australia's universal public health insurance scheme that provides citizens and permanent residents with free or subsidised healthcare. Working holiday makers (subclass 417 and 462) are generally **not** eligible for Medicare unless their home country has a Reciprocal Health Care Agreement (RHCA) with Australia. Without coverage, you pay the full cost of medical appointments and treatment. You are also entitled to a Medicare Levy exemption on your tax return, saving you 2% of your taxable income. Our team applies this exemption when lodging your return.

## Are working holiday makers covered by Medicare?

Generally, no:

- Holders of working holiday visas 417 and 462 are not eligible for Medicare
- The exception is citizens of countries with a Reciprocal Health Care Agreement
- Without coverage, you are treated as a private patient
- You pay the full cost of GP visits, specialist appointments, prescriptions, and hospital treatment

The 11 countries with an RHCA covering working holiday makers are listed in our article on [Medicare agreements with Australia](/blog/countries-with-medicare-agreement-australia).

## What does no Medicare coverage cost you in practice?

Healthcare costs without Medicare:

- GP consultation: $80 to $120 per visit
- Specialist appointment: $200 to $500+ per visit
- Prescriptions: full retail price (often $20 to $80+)
- Emergency department visit: free in public hospitals (but follow-up may be charged)
- Public hospital admission: variable, can be expensive
- Ambulance: often hundreds of dollars (depends on state)

Given these costs, comprehensive travel and health insurance is essential. Most working holiday visa applications require you to have health insurance as a visa condition.

## What is the Medicare Levy exemption?

The Medicare Levy is a 2% tax applied to the taxable income of Australian residents to fund Medicare. Working holiday makers who are not eligible for Medicare are entitled to claim an exemption:

- Saves you 2% of your taxable income
- On $30,000 of earnings, the exemption is worth $600
- Must be claimed correctly on your [tax return](/tax-return)
- Not automatic, must be applied at lodgment

Our team applies this exemption automatically when we prepare your return. If you have already lodged without claiming the exemption, we can amend the return to recover the levy paid.

## How can you get healthcare as a working holiday maker?

Options for healthcare coverage:

- **Private travel/health insurance**: essential for non-RHCA countries (often a visa condition)
- **RHCA enrolment**: if your country qualifies, enrol in Medicare for limited coverage
- **Out-of-pocket**: for incidental costs, pay the full fee

Our team can apply the Medicare Levy exemption regardless of whether you took out private insurance. The exemption is based on your Medicare eligibility, not on whether you bought private cover.

For more on RHCA countries and what they cover, see our article on [Medicare agreements with Australia](/blog/countries-with-medicare-agreement-australia).

[Get in touch with our team](/contact) for help with any tax, super, or workplace question during your time in Australia.
 `,
 },
 {
 slug: "countries-with-medicare-agreement-australia",
 title: "Reciprocal Health Care Agreement countries with Australia (full list 2025-26)",
 description:
 "Australia has Reciprocal Health Care Agreements with 11 countries (UK, Ireland, Italy, Sweden, Netherlands, Belgium, Finland, Norway, Malta, Slovenia, New Zealand). What working holiday makers from each country get.",
 category: "Medicare & Other",
 date: "22 March 2025",
 readTime: 4,
 body: `
Australia has Reciprocal Health Care Agreements (RHCAs) with 11 countries: the United Kingdom, Republic of Ireland, New Zealand, Sweden, Netherlands, Finland, Norway, Belgium, Slovenia, Malta, and Italy. Citizens of these countries holding a valid working holiday visa may be entitled to limited Medicare benefits during their stay. Citizens of all other countries are not eligible for Medicare and must rely on private health insurance.

## Which countries have an RHCA with Australia?

The 11 countries with a Reciprocal Health Care Agreement:

- United Kingdom
- Republic of Ireland
- New Zealand
- Sweden
- Netherlands
- Finland
- Norway
- Belgium
- Slovenia
- Malta
- Italy

If your country is not on this list (for example, France, Germany, Spain, Canada, USA, Japan, South Korea, Taiwan, Hong Kong), you are not eligible for Medicare under an RHCA.

## What do the RHCA agreements cover?

Coverage under an RHCA is limited:

- Medically necessary treatment (conditions that arise during your visit and cannot wait until you return home)
- GP visits at the Medicare-subsidised rate
- Some public hospital treatment
- Some prescription medications at the PBS subsidised rate

What is **not** covered:

- Pre-existing conditions in most cases
- Dental treatment
- Optometry and glasses
- Most specialist visits
- Private hospital treatment
- Ambulance services in most states
- Cosmetic or elective procedures

The specific entitlements vary between agreements. Even with an RHCA, comprehensive private health insurance is usually a good idea.

## How do you enrol in Medicare under an RHCA?

If your country has an RHCA with Australia, enrolment is done in person at a Services Australia office (previously known as Centrelink/Medicare offices). You need:

- Your passport
- Your working holiday visa (electronic confirmation or grant letter)
- Proof of citizenship from the RHCA country (if not the same as your passport country)

You receive a Medicare card that allows you to access the covered services. The card is valid for the duration of your eligible visa.

## What does an RHCA mean for the Medicare Levy?

If you are enrolled in Medicare under an RHCA, the Medicare Levy treatment becomes more complex:

- You may not be entitled to the full 2% exemption
- Partial exemption may apply depending on your enrolment status and time in Australia
- The rules are nuanced and depend on your specific circumstances

When we prepare your [tax return](/tax-return), we work out the correct Medicare Levy position for your specific situation. Some RHCA enrollees get full exemption, some get partial, and some get none. The right answer depends on factors like the dates of your Medicare enrolment and the agreement terms.

[Get in touch with our team](/contact) before lodging if you are unsure about your Medicare Levy entitlement.
 `,
 },
 {
 slug: "medicare-levy-working-holiday-makers",
 title: "Medicare levy exemption for working holiday makers in Australia",
 description:
 "The Medicare levy is a 2% tax that funds Australia's healthcare system. Most working holiday makers on 417 and 462 visas are exempt - how to claim the exemption on your tax return.",
 category: "Medicare & Other",
 date: "31 March 2025",
 readTime: 4,
 body: `
The Medicare Levy is a 2% tax applied to the taxable income of Australian residents to fund the Medicare system. Most working holiday makers are not eligible for Medicare and are therefore entitled to claim a full exemption from the Medicare Levy on their tax return. The exemption is not automatic and must be applied correctly when lodging. Our team applies the Medicare Levy exemption automatically when we prepare your [tax return](/tax-return), saving you 2% of your taxable income.

## What is the Medicare Levy?

The Medicare Levy is a 2% tax on taxable income:

- Applied to the taxable income of Australian residents
- Collected alongside income tax
- Appears as a separate line on your tax assessment
- Helps fund the Medicare healthcare system

For Australian residents, the levy is automatic. For working holiday makers, the position depends on whether you are eligible for Medicare.

## Do working holiday makers pay the Medicare Levy?

Most working holiday makers are exempt:

- If you are not eligible for Medicare, you can claim a **full exemption** (no levy paid)
- If you are partially eligible (RHCA enrolment for part of the year), you may claim a **partial exemption**
- If you are fully eligible (rare for working holiday makers), you pay the full 2%

Most working holiday makers fall into the first category and pay no Medicare Levy at all.

## How much does the exemption save you?

The 2% exemption is meaningful at typical working holiday maker income levels:

- Annual earnings of $15,000 → save $300
- Annual earnings of $25,000 → save $500
- Annual earnings of $35,000 → save $700
- Annual earnings of $45,000 → save $900

This is money that goes into your refund instead of into general revenue. If you have lodged a previous return without claiming the exemption, our team can amend it to recover the levy paid.

## How does the Medicare Levy exemption get claimed?

The exemption requires:

1. A Medicare Levy Exemption Certificate (in most cases)
2. Correct completion of the Medicare Levy section of your return
3. Evidence supporting your non-Medicare eligibility (passport, visa)

Our team handles all of this when we prepare your return. We obtain the Medicare Levy Exemption Certificate on your behalf where required.

## What if your country has an RHCA with Australia?

The position is more nuanced for citizens of the 11 RHCA countries (UK, Ireland, New Zealand, Sweden, Netherlands, Finland, Norway, Belgium, Slovenia, Malta, Italy):

- If you enrolled in Medicare under your RHCA, you may not be fully exempt
- Partial exemption may apply depending on enrolment dates
- Full exemption may still apply if you did not enrol
- The rules depend on your specific circumstances

We work out the correct treatment for your situation when preparing your [tax return](/tax-return). [Get in touch with our team](/contact) if you are unsure about your specific position.

## What if you have already lodged without claiming the exemption?

If you lodged a previous return and paid the Medicare Levy when you should have been exempt:

1. The amount can usually be recovered through an amendment
2. Amendments can typically be made for up to two years after the original lodgment
3. Our team handles amendments for working holiday makers

[Send us your previous returns](/contact) and we will check whether you are owed a refund of the Medicare Levy paid.
 `,
 },
 {
 slug: "tax-file-number-declaration-form",
 title:
 "TFN declaration form: how working holiday makers complete it correctly",
 description:
 "The TFN declaration form is what you give your employer when starting a new job in Australia. How working holiday makers should complete it - including the working holiday maker box that sets you to the 15% rate.",
 category: "Medicare & Other",
 date: "2 April 2025",
 readTime: 4,
 body: `
A Tax File Number Declaration form is the form you complete and give to your employer when you start a new job in Australia. It tells your employer your TFN, your residency status for tax purposes, and whether you have a study loan. The employer uses this information to determine your tax rate. For working holiday makers, the critical answers are: select "Working Holiday Maker" for residency and "No" for the tax-free threshold. Getting the form right ensures the correct 15% rate is applied from your first payslip.

## Why does the Tax File Number Declaration form matter?

Without this form on file, your employer cannot apply the correct tax rate:

- Default withholding without the form: 45% (the top rate)
- Correct withholding for working holiday makers: 15%
- The difference is $320 per week on $1,000 of earnings
- The excess is reclaimed only at tax time, months later

Submitting the form promptly when you start work is one of the most important things you can do to ensure your pay is correct from day one.

## How should working holiday makers fill in the form?

The critical sections for working holiday makers:

- **Full name, date of birth, address**: personal details (use your Australian address)
- **TFN**: enter your 9-digit Tax File Number
- **Residency**: select **Working Holiday Maker** (not Australian Resident, not Foreign Resident)
- **Tax-free threshold**: select **No** (the threshold is for residents, not working holiday makers)
- **HELP/VSL debt**: usually **No** for working holiday makers (unless you have an Australian study loan)
- **Other questions**: complete honestly based on your circumstances

The Working Holiday Maker selection is what triggers the 15% rate. Selecting "Foreign Resident" by mistake causes 30% to be applied. Selecting "Australian Resident" and "Yes" to tax-free threshold causes the wrong rate plus a future tax debt.

## Where do you get the form?

The form is provided by your employer:

- Your employer should give you a copy when you start work
- Some employers provide it digitally through their onboarding system
- Some use a printed paper version

Once you complete it, you hand it back to your employer (not to the ATO). They keep it on file and use it to set up your payroll.

## What if you do not have your TFN yet?

You can still start work without your TFN, but the temporary setup needs adjusting:

1. Apply for your [TFN](/tfn) immediately if you have not done so
2. Show your employer the TFN application reference number
3. Complete the Tax File Number Declaration form with the reference number
4. Update the form with your actual TFN once it arrives (within 28 days)

Until your TFN is on file, the 45% rate may apply. See our article on [TFN reference numbers](/blog/tfn-reference-number-before-tfn-arrives) for what to do in the interim.

## What about a new job?

Every new employer needs their own Tax File Number Declaration form:

- Your TFN does not transfer between employers automatically
- A previous employer holding your form does not cover the new one
- Complete a new form for every job, including casual roles

If you have already started a new job and the form was filled in incorrectly, submit a corrected form to your employer. They update payroll going forward, and any excess tax is recovered through your [tax return](/tax-return).

## What if you suspect your form was filled in wrong?

If your payslip shows withholding at 45%, 30%, or any rate other than 15%, the form may have been completed incorrectly:

1. Check your copy of the form against the correct answers above
2. Submit a corrected form to your employer
3. [Get in touch with our team](/contact) to check your withholding and recover any overpaid amounts through your tax return
 `,
 },
 {
 slug: "what-does-tax-withheld-mean-payslip",
 title: "Tax withheld on your Australian payslip: what working holiday makers should check",
 description:
 "Tax withheld is the income tax your employer deducts from your wages each pay. How to check it is correct as a working holiday maker - your rate should be 15% on the first $45,000 if your TFN is filed properly.",
 category: "Medicare & Other",
 date: "7 April 2025",
 readTime: 3,
 body: `
Tax withheld on your payslip is the income tax your employer deducts from your gross wages before paying you the net amount. It is the PAYG withholding collected on behalf of the ATO. For working holiday makers, the correct withholding rate is 15% of your gross earnings up to $45,000. You can check by dividing the tax withheld by your gross pay - the result should be approximately 0.15. If it shows 30% or 45%, your Tax File Number Declaration form was completed incorrectly.

## What is tax withheld on your payslip?

Every Australian payslip should show three key figures:

- **Gross pay**: total earnings before any deductions
- **Tax withheld**: amount deducted as PAYG withholding tax
- **Net pay**: what actually goes into your bank account

The tax withheld is the amount your employer is paying to the ATO on your behalf as a prepayment of your annual tax liability. It is reconciled when you lodge your annual tax return.

## How can you check the tax withheld is correct?

For working holiday makers with your [TFN](/tfn) on file and the form correctly completed:

- Divide the tax withheld figure by the gross pay figure
- The result should be approximately 0.15 (15%)

Examples:

- Gross pay $1,000 → tax withheld should be around $150
- Gross pay $1,500 → tax withheld should be around $225
- Gross pay $2,000 → tax withheld should be around $300

If the result is significantly different from 15%, something is wrong.

## What can cause incorrect withholding?

Common reasons for the wrong rate being applied:

- **45% withheld**: Tax File Number Declaration form not yet received or processed
- **30% withheld**: Employer not registered as an employer of working holiday makers (uses the default foreign resident rate)
- **19% or lower**: Tax-free threshold incorrectly claimed (this will cause a tax debt at year-end)
- **No tax withheld**: Cash-in-hand work or PAYG setup completely missed

If your payslip shows the wrong rate, [get in touch with our team](/contact). We work out what was supposed to be withheld and recover any excess through your [tax return](/tax-return).

## What happens to the tax withheld?

The withheld amounts flow to the ATO:

- Your employer collects tax withheld from each pay
- They remit it to the ATO periodically (usually quarterly)
- At year-end, they finalise the total reported as your income statement
- Your tax return reconciles the total withheld against your actual liability
- The difference is refunded or owed

## Why you should keep your payslips

Save every payslip throughout the year:

- Lets you cross-check your income statement at tax time
- Resolves discrepancies between what was paid and what the ATO has on record
- Documents super line items separately from tax
- Supports any underpayment or tax claim
- Useful if your employer's records are incomplete when we prepare your return

Most modern payroll systems email payslips automatically. Set up an email folder to keep them organised.
 `,
 },
 {
 slug: "what-is-an-income-statement",
 title:
 "Income statement Australia: how working holiday makers access theirs through myGov",
 description:
 "An income statement (previously called Payment Summary or Group Certificate) shows total wages and tax withheld for the financial year. How working holiday makers find theirs through myGov and use it for their tax return.",
 category: "Medicare & Other",
 date: "20 April 2025",
 readTime: 3,
 body: `
An income statement is the digital record showing total wages paid to you by an employer and total tax withheld for the financial year. It replaced the old paper PAYG payment summary under Single Touch Payroll (STP). Your employer submits the data directly to the ATO through their payroll system, and income statements are finalised between 14 July and 31 July each year. Our team accesses your income statements directly through our tax agent portal when preparing your [tax return](/tax-return).

## How can you access your income statement?

Through our service, we access your income statements directly. You do not need to navigate ATO online services or chase your employer.

When we lodge your return, we see:

- Every employer who reported income for you in the financial year
- Total gross wages from each employer
- Total tax withheld from each employer
- Finalisation status (in progress or finalised)
- Super contributions paid

This is one of the main advantages of working under the supervision of a registered tax agent.

## When do income statements become available?

The annual cycle:

- 30 June: financial year ends
- 1 July: lodgment window opens
- 14 July: employers begin finalising income statements
- 31 July: most employers should have finalised
- Marked as "Tax Ready" once finalised

If your income statement still shows "Year-to-date" or "In Progress" past 31 July, the employer has not yet finalised. We monitor this and lodge once all reports are tax-ready.

## What if there is an error in your income statement?

Errors do happen. Common issues:

- Total wages do not match your payslips
- Tax withheld figure is incorrect
- Missing employer (worked there but no record exists)
- Wrong residency status applied (30% instead of 15%)

When we find a discrepancy, we contact the employer on your behalf to correct the reporting. If the employer is unresponsive, we can lodge with an estimate and amend later, or escalate the issue through formal channels.

## What if you worked for multiple employers?

All employers appear separately in the income statements section:

- Each employer has their own line in the data
- Total gross and total withheld are shown for each
- We pull all of them when preparing your return
- The combined totals are what appear in your [tax return](/tax-return)

Lodging without checking every employer is one of the most common self-lodgment errors. We always cross-check the full picture before lodging.

## What records should you keep?

Even though income statements are digital, keep your own copies:

- All payslips received throughout the year
- Annual summaries from your employers
- Bank statements showing wages deposited
- Any correspondence about pay rates or adjustments

These help us cross-check the income statement against what was actually paid, and resolve any discrepancies before lodgment.

[Get in touch with our team](/contact) for help with any tax, super, or workplace question during your time in Australia.
 `,
 },
 {
 slug: "what-is-the-ato",
 title: "The ATO explained: Australian Taxation Office for working holiday makers",
 description:
 "The ATO (Australian Taxation Office) is the government agency that collects tax in Australia. When working holiday makers deal with the ATO, what services it provides, and how to contact it from overseas.",
 category: "Medicare & Other",
 date: "23 April 2025",
 readTime: 3,
 body: `
The Australian Taxation Office (ATO) is the federal government agency responsible for administering Australia's tax system. For working holiday makers, the ATO is the entity that issues your TFN, receives wage and super reports from your employers, processes your tax return, and manages the DASP super withdrawal process. Most working holiday makers never need to deal with the ATO directly. Our team handles all ATO communication on your behalf, including from overseas.

## What does the ATO do?

The ATO is responsible for:

- Collecting income tax, GST, and other federal taxes
- Issuing Tax File Numbers (TFNs)
- Issuing Australian Business Numbers (ABNs) through the Australian Business Register
- Receiving employer wage and PAYG withholding reports
- Processing tax returns
- Managing the superannuation guarantee on behalf of workers
- Investigating tax compliance and recovery
- Operating the DASP (Departing Australia Superannuation Payment) system

For working holiday makers, the most relevant ATO functions are TFN issuance, tax return processing, and DASP super withdrawal.

## How does the ATO get information about you?

The ATO receives data about you automatically:

- Your employers report your wages and PAYG tax through their payroll software (Single Touch Payroll)
- Your super fund reports contributions made on your behalf
- Banks report interest paid on Australian accounts
- Share registries report dividends paid

When we lodge your [tax return](/tax-return), we cross-check the data the ATO already has against what your records show. The ATO usually has accurate information, but discrepancies happen and need to be resolved before lodgment.

## When might the ATO contact you?

Most working holiday makers never receive direct ATO contact. The ATO might reach out if:

- Additional information is needed to process your return
- A discrepancy is identified between what you reported and employer reports
- You owe tax that has not been paid
- A review or audit is initiated (rare for working holiday makers)
- A refund is held up due to identity verification

All legitimate ATO communications are either through your registered tax agent or by post to your registered address. **The ATO will never call demanding immediate payment, requesting payment in gift cards, or threatening arrest**. These calls are scams, and they target working holiday makers specifically. Hang up and [contact our team](/contact) if you receive one.

## How does our team handle ATO communication?

When you work with us:

- All ATO communication comes to us first
- We translate any issues into plain language
- We respond on your behalf
- We handle disputes, amendments, and follow-ups
- You do not need to call the ATO, log into ATO online services, or deal with paperwork yourself

This works even after you leave Australia. We have helped working holiday makers resolve ATO matters from every continent.

## What is the ATO's role in DASP super withdrawals?

When you claim your super through DASP:

- We lodge the application through our tax agent portal
- The ATO verifies your visa status
- The application is forwarded to your super fund
- The fund (or ATO, if the balance was transferred) releases the payment

If your super was held by the ATO as unclaimed super, the ATO pays you directly. Either way, our team manages the process end-to-end so you receive every dollar without dealing with the ATO yourself. [Get in touch](/superannuation) to start your DASP application.
 `,
 },
 {
 slug: "gross-pay-vs-net-pay-australia",
 title: "Gross pay vs net pay in Australia: working holiday maker payslip guide",
 description:
 "Gross pay is what you earn before deductions. Net pay (take-home) is what hits your bank account. How working holiday makers can use this to check your tax is being withheld correctly at the 15% rate.",
 category: "Medicare & Other",
 date: "10 May 2025",
 readTime: 3,
 body: `
Gross pay is the total amount you earn before any deductions. Net pay is what actually goes into your bank account after deductions. For working holiday makers, the main deduction is PAYG tax withholding at 15% of gross pay (with your TFN on file). Superannuation is not a deduction; it is paid by your employer on top of your gross wages, not from your wages. Tax returns and income statements always refer to gross pay, not net pay.

## How do gross and net pay appear on your payslip?

A standard Australian payslip shows:

- **Gross pay**: total earnings (hours × rate + allowances + penalty rates + overtime)
- **Tax withheld**: PAYG deducted from gross pay
- **Net pay**: gross pay minus tax withheld = what you receive
- **Super**: shown separately (paid by employer on top, not deducted from your pay)

Example for a working holiday maker:

- Gross pay: $1,000
- Tax withheld at 15%: $150
- Net pay: $850
- Super (12% on top): $120 paid to your fund

## Why is super not a deduction from gross pay?

This is a common point of confusion. Super is:

- Paid by your employer **on top of** your wages
- An additional cost to the employer, not a deduction from you
- Shown as a separate line item on your payslip
- Calculated as 12% of your gross wages (from 1 July 2025)

When you earn $1,000 in gross wages, you receive $850 in your bank account AND $120 goes into your super fund. Your gross pay does not change because of super.

If your payslip shows super being subtracted from your gross pay, that is incorrect. Raise it with your employer immediately, and [contact our team](/contact) if not resolved.

## Why does gross pay matter for tax?

Tax returns and income statements always use gross pay:

- When we declare your income for the year, we use the gross figure
- The ATO uses gross pay to calculate your tax liability
- Tax withheld is shown separately
- Net pay is irrelevant for tax purposes

So when you receive your income statement at year-end, the figure shown is your total gross wages, not what landed in your bank account.

## How can you check your gross pay calculation?

To verify your payslip:

1. Multiply your ordinary hours by your hourly rate
2. Add any penalty rates for weekend, public holiday, or evening shifts
3. Add any allowances (uniform, tool, travel)
4. Add any overtime hours at the correct rate
5. Compare against the gross figure on your payslip

If the figures do not match, raise it with your employer. The discrepancy may be a payroll error or an underpayment. [Get in touch with our team](/contact) if you need help working out the correct rate.
 `,
 },
 {
 slug: "do-working-holiday-makers-pay-tax-on-tips",
 title: "Tax on tips in Australia: do working holiday makers declare them?",
 description:
 "Yes - tips received as part of employment in Australia are taxable income, whether cash or electronic. How working holiday makers should record and declare tips on their tax return.",
 category: "Medicare & Other",
 date: "13 May 2025",
 readTime: 3,
 body: `
Yes, tips received in Australia are taxable income for working holiday makers. This applies whether the tip is paid in cash directly by a customer, distributed through a tronc system managed by your employer, or added to a bill and paid out via your payslip. Tips must be declared in your [tax return](/tax-return) at the 15% working holiday maker rate. If tips are paid through your employer's payroll, they are usually already included in your income statement. Cash tips paid directly need to be tracked and declared by you.

## How are tips treated for tax purposes?

The ATO treats all tips as assessable income:

- Subject to income tax at your applicable rate
- For working holiday makers: 15% on the first $45,000 of total earnings
- Tips received in any form count (cash, card, tronc distribution)
- The source (customer, employer, third party) does not change the tax treatment

Failing to declare tips is tax evasion, even if the amounts are small or the arrangement feels informal.

## What if your employer manages tips through payroll?

When tips are distributed by your employer (a "tronc" system):

- They are usually included in your gross wages on your payslip
- The employer withholds PAYG tax at the same time
- They appear in your annual income statement automatically
- No separate action is needed when we prepare your [tax return](/tax-return)

Check your payslips to see whether tips are shown as a separate line item or absorbed into your gross wages. If you are unsure, [send us your payslips](/contact) and we will work out the treatment.

## What if you receive cash tips directly?

Cash tips paid directly by customers and not handled through payroll are still taxable:

- The full amount must be declared
- No tax is withheld at the time of payment (you owe it at year-end)
- You are responsible for keeping records of cash tips received

Many working holiday makers in hospitality forget to declare cash tips. The ATO uses industry benchmarks and bank deposit analysis to identify likely undeclared tip income. Declaring tips honestly is the right approach, and at the 15% working holiday maker rate, the tax owed is manageable.

## How should you track cash tips?

Keep simple records throughout the year:

- A notebook or phone app showing daily cash tip totals
- Date, shift, and amount received
- Notes for any unusual situations (split tips, group tips)

You do not need to track every individual tip. A daily or weekly total is enough. When we prepare your return, we use this total alongside your wage income.

## What about super on tips?

Super treatment of tips depends on how they are paid:

- Tips paid through your employer's payroll: may be included in ordinary time earnings for super calculation
- Cash tips paid directly by customers: generally not subject to super obligations

The specifics depend on your award and how the employer classifies the tips. If you suspect your tips should have generated super contributions that were not paid, [get in touch with our team](/contact) and we will investigate.
 `,
 },
 {
 slug: "tax-obligations-after-leaving-australia",
 title:
 "Australian tax obligations after leaving: working holiday maker guide",
 description:
 "Leaving Australia does not end your tax obligations. Final tax return, DASP super claim, ABN cancellation - what working holiday makers must do after departing to stay compliant with the ATO.",
 category: "Medicare & Other",
 date: "15 May 2025",
 readTime: 4,
 body: `
Leaving Australia does not end your Australian tax obligations. If you earned income during an Australian financial year, you must lodge a tax return for that year. You also need to claim your superannuation through DASP, cancel any [ABN](/abn) you registered, and update your contact details. All of this can be done from overseas through our service. We help working holiday makers wrap up their Australian tax obligations from anywhere in the world.

## What do you still need to do after leaving Australia?

After leaving, three main obligations remain:

1. **Lodge your tax return** for any year you earned income
2. **Claim your superannuation** through the DASP process
3. **Cancel your ABN** if you registered one
4. **Update contact details** so any correspondence reaches you

Our team handles all four together as part of a "departure tax package" for working holiday makers.

## How do you lodge your tax return from overseas?

Through our service, the process is fully remote:

- Send us your details (TFN, passport, employment dates)
- We pull your income statements from the ATO system
- We prepare and lodge the return on your behalf
- Refund is paid to your Australian bank account

The standard deadline is 31 October following the financial year. Through our service under the supervision of a registered tax agent, the deadline is typically extended to May the following year.

Failing to lodge when required can result in penalties. The ATO has your income records from your employers and expects a return. See our article on [lodging a tax return from overseas](/blog/how-to-lodge-tax-return-from-overseas).

## How do you claim your superannuation?

If super contributions were made on your behalf, you can claim them through the Departing Australia Superannuation Payment (DASP) process:

- Available once your visa has expired and you have left Australia
- We lodge the application on your behalf
- 65% withholding tax applies to the taxable component
- Net amount is paid to your nominated bank account (Australian or overseas)

See our detailed article on [how to apply for DASP](/blog/how-to-apply-for-super-back) for the full process.

## How do you cancel your ABN?

If you registered for an [ABN](/abn):

- We cancel it as part of wrapping up your Australian tax position
- The cancellation takes effect from a specified date
- Keeps your business records tidy
- Prevents administrative issues if you ever return to Australia

See our article on [cancelling your ABN](/blog/how-to-cancel-your-abn) for what to wrap up before cancellation.

## What contact details should you update?

To make sure correspondence reaches you:

- Keep your email address current (and accessible from anywhere)
- Update your address on file (consider using an overseas address)
- Notify your super fund of your new contact details
- Make sure your bank account is still accessible

When you work with our team, we manage all of this. We become your point of contact for the ATO and super funds, so you do not need to track multiple agencies. [Get in touch](/contact) to start the process.

## How long should you keep your Australian bank account open?

Keep your Australian bank account open until:

- Any tax refund has been paid
- Any super withdrawal has been received (or arrange for overseas payment)
- Any final adjustments have been processed

Most working holiday makers can close their Australian account within 3-4 months of departure, but only after all payments have cleared. We let you know when it is safe to close.
 `,
 },
 {
 slug: "tax-residency-working-holiday-makers",
 title: "Are working holiday makers tax residents of Australia?",
 description:
 "Your tax residency status affects which tax rates apply to you. Most working holiday makers are non-residents for tax purposes, but the rules have nuances worth understanding.",
 category: "Tax Return",
 date: "24 May 2025",
 readTime: 5,
 body: `
No, working holiday makers (subclass 417 and 462 visa holders) are not Australian tax residents under the standard rules. However, since 2017, all working holiday maker income is taxed under a specific framework: a flat 15% rate on the first $45,000, regardless of whether you are technically a resident or non-resident. The tax-free threshold does not apply to working holiday makers in any case. The residency question matters less for working holiday wages than it does for other visa types, but it can affect deductions and investment income treatment.

## What is the working holiday maker tax framework?

Since 2017, working holiday visa holders are taxed under a separate framework:

- All wage income taxed at flat 15% up to $45,000 per year
- 30% on earnings from $45,001 to $135,000
- 37% on earnings from $135,001 to $190,000
- 45% on earnings above $190,000

This applies regardless of whether you are technically a tax resident or non-resident under the general rules. The 15% rate is set by working holiday maker legislation and operates independently of residency.

## Why does residency still matter in some situations?

Even though the flat rate applies to wages, your residency status can still affect:

- **Deductions**: some deductions are available only to residents
- **Investment income**: capital gains and investment income treatment varies
- **Foreign income**: whether you need to declare income earned outside Australia
- **Medicare Levy**: linked to Medicare eligibility, which is linked to residency

For most working holiday makers who only have Australian wage income and no significant investments, residency has minimal practical effect. For more complex situations (long stays, significant ties to Australia, foreign investment income), it matters more.

## Why does the tax-free threshold not apply?

Regardless of residency classification:

- Working holiday makers cannot claim the $18,200 tax-free threshold
- The 15% rate applies from the very first dollar
- This is set by working holiday maker legislation
- Selecting "No" to the tax-free threshold on your Tax File Number Declaration form is always correct for working holiday makers

If you incorrectly claimed the tax-free threshold, you may face a tax debt at year-end because too little tax was withheld. See our article on [the tax-free threshold for working holiday makers](/blog/tax-free-threshold-working-holiday-visa).

## What should you select at tax time?

When we lodge your [tax return](/tax-return):

- Residency selection: **Working Holiday Maker** (not Resident, not Foreign Resident)
- This triggers the 15% rate
- Activates the Medicare Levy exemption
- Applies the correct deduction rules

Self-lodgers sometimes select "Foreign Resident" or "Resident" by mistake, which causes the wrong rate to apply. We handle this correctly when we prepare your return.

## What if your circumstances are more complex?

Specific advice is worthwhile if any of the following apply:

- You have been in Australia for over 12 months continuously
- You have significant ties (long-term lease, Australian partner, business interests)
- You have foreign investment income
- You have residency-related questions about your home country tax

[Get in touch with our team](/contact) and we will work through your specific situation. Most working holiday makers do not need this level of analysis, but for complex cases, getting it right matters.
 `,
 },

 // ─── NEW: TFN ──────────────────────────────────────────────────────────────
 {
 slug: "how-to-update-address-with-ato",
 title: "How to update your address with the ATO (working holiday guide)",
 description:
 "If you move around Australia, keep your address current with the ATO. Your TFN letter, income statement and tax correspondence go to the address on file. How working holiday makers can update via myGov or by phone.",
 category: "TFN",
 date: "25 May 2025",
 readTime: 3,
 body: `
If you move to a new address in Australia, update it with the Australian Taxation Office (ATO) as soon as possible. The ATO sends your TFN letter and other important correspondence to the address on file. Through our service, we update your address with the ATO on your behalf so you do not miss critical mail or refund notifications. If you are still waiting for your TFN letter and have moved, getting the address updated quickly is the difference between receiving your TFN within 28 days and waiting much longer.

## Why does keeping your address updated matter?

The ATO uses the address on file for:

- Posting your TFN letter when first issued
- Sending tax assessments and notices
- Communicating about refunds or tax debts
- Sending DASP-related correspondence
- Identity verification confirmations

Missing any of these can delay your tax matters or cause complications later. Working holiday makers who move around frequently are particularly at risk.

## How do you update your address with the ATO?

The simplest way is through our service:

1. [Get in touch with our team](/contact)
2. Give us your new address
3. We update it with the ATO on your behalf under the supervision of a registered tax agent
4. Confirmation is sent back to us

You do not need to log into ATO online services or wait on hold. We handle it as part of managing your tax position.

## What address should you use if you move frequently?

For working holiday makers travelling between hostels or work placements:

- Use a stable address where you will reliably receive mail
- A friend's permanent residence is ideal if available
- A long-term hostel works if mail forwarding is reliable
- A postal address (PO Box) is also acceptable

Avoid using a temporary hostel address you will leave within a few weeks. Mail forwarding rarely works well between Australian hostels.

## Does your address affect your tax return?

Indirectly. Your tax return itself is lodged electronically and the refund is paid to your bank account. However:

- ATO notices about your return go to your address on file
- Identity verification letters go to your address
- Adjustment letters or audit notices go to your address

Keeping your address current ensures any communication reaches you promptly.

## What if you have already left Australia?

If you have departed Australia:

- We can update your address to your overseas address
- This ensures any post-departure correspondence reaches you
- Useful for refund follow-ups, super statements, and audit letters

[Send us your overseas address](/contact) and we will update it with the ATO and any super funds you have. This is part of our standard departure package for working holiday makers leaving Australia.
 `,
 },

 // ─── NEW: Tax Return ───────────────────────────────────────────────────────
 {
 slug: "what-is-a-tax-refund-australia",
 title:
 "What is a tax refund and how do you know if you are owed one in Australia?",
 description:
 "A tax refund is money the ATO pays back to you when you have paid more tax than you owed during the year. Most working holiday makers are owed one.",
 category: "Tax Return",
 date: "5 June 2025",
 readTime: 4,
 body: `
A tax refund is money the Australian Taxation Office (ATO) pays back to you when the tax withheld from your wages during the year exceeded your actual tax liability. Most working holiday makers receive a refund because their employer withheld more tax than needed (often during periods without a TFN, or due to working only part of the financial year). The refund is usually paid to your Australian bank account within two weeks of lodgment. Our team calculates your expected refund before lodging so you know what to expect.

## Why do most working holiday makers receive a refund?

Several factors typically result in a refund:

- Working only part of the financial year (your employer's withholding is based on a full-year estimate)
- Periods without a TFN on file (45% withheld instead of 15%)
- Periods with an unregistered employer (30% withheld instead of 15%)
- Eligible deductions reducing your taxable income
- Medicare Levy exemption (saves 2% of taxable income)

The longer you worked in a year and the more issues with withholding, the larger the typical refund.

## How do you know if you are owed a refund?

The only way to know exactly is to prepare a tax return:

- We pull your income statements from the ATO system
- Calculate your actual tax liability at the 15% rate
- Compare against what was withheld
- Add any eligible deductions and the Medicare Levy exemption
- Confirm the refund amount before lodging

As a rough estimate, most working holiday makers we lodge for receive between $1,000 and $3,000 in refunds. Some receive more, depending on length of stay, periods of higher withholding, and eligible deductions.

## When does the ATO pay your refund?

The timeline:

- Lodge electronically (we always do)
- ATO processes within two weeks in most cases
- Sometimes faster (a few business days)
- Refund paid directly to your nominated Australian bank account

Refunds during peak season (August/September) can take a few days longer. We monitor the lodgment status and let you know when the refund has been released.

## Can you get a refund after leaving Australia?

Yes. Lodging from overseas works exactly the same way through our service:

- We prepare and lodge the return remotely
- The refund is paid to your Australian bank account
- Keep that account open until the refund clears

If your Australian bank account is already closed, [get in touch with our team](/contact) and we will discuss alternative arrangements.

## How can you maximise your refund?

To get the largest legitimate refund:

- Lodge through our team to capture all eligible deductions
- Claim the Medicare Levy exemption (if not Medicare-eligible)
- Track work-related expenses throughout the year
- Keep receipts for uniforms, tools, work-related travel
- Save records of any unreimbursed work expenses

We identify deductions you might miss when self-lodging. The result is usually a meaningfully larger refund.
 `,
 },
 {
 slug: "how-long-does-tax-refund-take-australia",
 title: "How long does a working holiday tax refund take in Australia?",
 description:
 "Working holiday tax refunds are usually processed within 7-14 business days of lodgement with the ATO. What affects the timeline, what to do if yours is delayed, and how it works when you have already left Australia.",
 category: "Tax Return",
 date: "8 June 2025",
 readTime: 3,
 body: `
Most Australian tax refunds are processed and paid within two weeks of lodgment when the return is filed electronically. Through our service under the supervision of a registered tax agent, we lodge electronically so refunds typically arrive within 7-14 business days. Refunds during peak season (August-September) may take a few days longer. If your refund is taking longer than expected, our team follows up directly with the ATO.

## What is the typical refund timeline?

When we lodge your return:

- Day 0: Return lodged electronically
- Day 1-3: ATO receives and begins processing
- Day 7-14: Most refunds released to your bank account
- Day 14-21: Slower returns (peak season or complex cases) released

In quieter periods (October-June), refunds often arrive within a few business days. Peak periods (July-September) see slightly longer turnaround as the ATO processes the highest volume of returns.

## What affects how quickly you get your refund?

The main factors:

- **Lodgment method**: electronic through a tax agent is fastest (paper returns take 8+ weeks)
- **Time of year**: lodge early July or after mid-September for fastest processing
- **Income statement finalisation**: lodging before employer reports are finalised slows processing
- **Identity verification**: first-time lodgers may have additional checks
- **Discrepancies**: if your return data does not match ATO records, manual review adds time
- **Bank account details**: incorrect BSB/account numbers cause significant delays

We always wait until employer reports are tax-ready (after 14 July) and double-check bank details before lodging to avoid these delays.

## How do you check your refund status?

When you lodge through us:

- We monitor the ATO processing status
- We notify you when the return is finalised
- We confirm when the refund is released
- We follow up with the ATO if anything is delayed

You do not need to check the ATO portal yourself. We keep you updated through the process.

## What if your refund is taking longer than expected?

If 28 days have passed without payment, contact our team:

- We check the status directly through our tax agent portal
- We identify where the return is stuck
- We resolve any issues with the ATO on your behalf
- We confirm when payment will be released

Common reasons for delays we can resolve:

- Bank account details that need updating
- Identity verification queries
- Discrepancies that need clarification
- Manual review of larger refunds

[Get in touch](/contact) if your refund is delayed and we will investigate.

## What about refunds after leaving Australia?

If you have left Australia and lodged from overseas:

- The refund is paid to your nominated Australian bank account
- Same timeline applies (most within 2 weeks)
- If your Australian account is now closed, we can arrange alternative payment

Keep your Australian bank account open for at least 4-6 weeks after lodgment to ensure the refund clears before closing.
 `,
 },

 // ─── NEW: Super ────────────────────────────────────────────────────────────
 {
 slug: "super-for-casual-and-part-time-workers",
 title:
 "Super for casual and part-time work: working holiday maker entitlements in Australia",
 description:
 "Yes. Casual and part-time working holiday makers are entitled to superannuation regardless of hours worked. How the 12% rate applies, and what to do if your employer skips super contributions.",
 category: "Super",
 date: "9 June 2025",
 readTime: 4,
 body: `
Yes, casual and part-time workers in Australia are entitled to superannuation contributions from their employer. The $450 monthly earnings threshold was removed in July 2022, so super must now be paid on all wages from your very first dollar of earnings. This applies to working holiday makers in the same way as Australian workers. The current super rate is 12% of your ordinary time earnings (from 1 July 2025), paid on top of your wages.

## What is the current earnings threshold for super?

There is no longer a monthly earnings threshold:

- Before July 2022: super only payable if you earned $450+ in a calendar month
- From July 2022: super payable on all wages, from the first dollar
- Applies to all employees aged 18 or over
- Applies to under-18s who work more than 30 hours per week

This change benefited working holiday makers in particular, who often work irregular hours and might not have hit $450 in slow weeks.

## Does this apply to casual workers?

Yes, casual workers receive super just like permanent employees:

- One shift a week → super paid on those earnings
- Five shifts a week → super paid on those earnings
- Variable hours week to week → super paid on whatever you earned

Being casual does not exempt your employer from paying super. The hourly rate you receive (with 25% casual loading) is separate from the super obligation.

## What about part-time workers?

Same rules apply:

- Working 20 hours per week: 12% super paid on your wages
- Working 30 hours per week: 12% super paid on your wages
- Mix of regular and overtime: 12% on the ordinary time portion

The percentage of super is the same regardless of whether you are part-time, full-time, or casual. Only the absolute dollar amount differs (because your wages differ).

## How can you check your employer is paying super?

Several ways:

- Check your payslip (super should appear as a line item, separate from wages)
- Log into your super fund and view contribution history
- Track contributions against the quarterly payment deadlines (28 October, 28 January, 28 April, 28 July)

If contributions are missing or below 12% of your wages, [get in touch with our team](/contact). We can investigate and pursue recovery through the Superannuation Guarantee Charge (SGC) process.

## Can you claim your super back when you leave Australia?

Yes. Through the Departing Australia Superannuation Payment (DASP) process:

- Available after your visa expires and you have left Australia
- We handle the application on your behalf
- 65% withholding tax applies to the taxable component
- Net amount paid to your nominated bank account

Even small super balances from short stints of casual work are worth claiming. We aggregate balances from multiple funds in one DASP package. See our article on [how to apply for DASP](/blog/how-to-apply-for-super-back).

## What records help track your super?

Keep:

- Every payslip showing the super line item
- Quarterly super fund statements
- Notes of your start and end dates with each employer
- Employer ABNs (for any recovery claims)

When we manage your super and lodge your DASP claim, complete records make the process faster and more accurate.
 `,
 },

 // ─── NEW: Work Rights ──────────────────────────────────────────────────────
 {
 slug: "employer-asking-you-to-work-more-than-visa-allows",
 title:
 "Employer pressuring you to breach visa hours? Working holiday rights guide",
 description:
 "Working more than your visa allows can put your visa at risk. What the rules say for 417 and 462 visa holders, and what to do if your employer is pressuring you to breach them.",
 category: "Work Rights",
 date: "15 June 2025",
 readTime: 4,
 body: `
Working holiday visas come with specific conditions that limit how long you can work for the same employer (visa condition 8547, the 6-month limit) and require that your primary purpose in Australia remains a holiday. Breaching these conditions can lead to visa cancellation. If an employer pressures you into arrangements that breach your visa conditions, you have the right to refuse. Our team helps working holiday makers understand their visa work limits and navigate situations where employers want to keep them longer.

## What are the current work rules on a working holiday visa?

Three main visa work rules apply:

- **Condition 8547**: maximum 6 months with the same employer (unless exempt)
- **Primary purpose**: the visa is for a holiday, with work as secondary
- **Valid visa**: you must hold a current 417 or 462 visa to work
- **All Fair Work protections** apply regardless of visa status

The Fair Work Act provides that full-time employees should not regularly work more than 38 hours per week plus reasonable additional hours.

## How does the 6-month employer limit work?

Visa condition 8547 limits employment with a single employer:

- 6 months maximum with the same employer
- Counted in **calendar months** from your start date (not by hours)
- Applies regardless of full-time, part-time, or casual status
- Breach can result in visa cancellation
- The 6 months resets only with a new working holiday visa grant

The condition applies to all working holiday visa holders, but many sectors are exempt.

## Which sectors allow you to work past 6 months without permission?

You can work beyond 6 months with the same employer without permission if the work is in:

- Plant and animal cultivation (agriculture, horticulture)
- Fishing and pearling
- Tree farming and felling
- Mining
- Construction
- Tourism and hospitality (anywhere in Australia)
- Health, aged care, and disability care
- Childcare
- Food processing
- Natural disaster recovery work
- Different locations of the same employer (no single location exceeding 6 months)

If your work falls within these categories, you are automatically exempt and do not need to apply for permission.

## What if your sector is NOT exempt?

If your role does not fall within an exemption, you have three options:

1. **Change employers after 6 months**: cleanest approach
2. **Request written permission** from the Department of Home Affairs before the 6 months ends
3. **Move to a different position with a different employer**

A permission request is granted at the Department's discretion and is not guaranteed.

## What if your employer wants you to stay longer?

If your employer wants you to keep working beyond 6 months:

- Check whether the work is in an exempt sector (usually it is)
- If exempt, no action needed, you can continue
- If not exempt, the employer can support a permission request
- Until permission is granted, you must stop work at the 6-month mark
- Working without permission risks your visa

[Get in touch with our team](/contact) if you are unsure whether your work qualifies for an exemption.

## What should you do if pressured to work outside your visa?

You have the right to refuse work that breaches your visa:

- The visa conditions are legal limits, not negotiable
- Employers cannot force you to work beyond what your visa allows
- Document any pressure or requests in writing
- [Get in touch with our team](/contact) for advice if you feel pressured

It is illegal for employers to exploit visa holders. The Fair Work Act protects all workers in Australia regardless of visa status. Reporting issues does not affect your visa due to specific worker protections.

## What are the consequences of breaching condition 8547?

Working beyond 6 months without permission or exemption:

- Risk of visa cancellation
- Refusal of future Australian visa applications
- The employer may also face civil penalties
- Compliance is monitored through Department of Home Affairs checks

Even unintentional breaches can affect future visa outcomes. The 6 months is calculated strictly on calendar months, not work patterns.

## How can you extend your stay legitimately?

Options for legitimate extensions:

- **Second-year visa**: complete 88 days of specified work in a regional area
- **Third-year visa**: complete 6 months of specified work in a regional area during your second visa
- **Different visa class**: explore skilled or employer-sponsored visas

These are separate from "permission to work beyond 6 months" - they extend your stay, not your employer relationship.

## What about your tax position with one employer?

Working for the same employer (under exemption or with permission):

- Same 15% working holiday maker rate applies throughout
- Super continues to accumulate (12% on top of wages)
- All wages combine on your annual [tax return](/tax-return)
- No tax penalty for staying with one employer

Our team handles tax returns for working holiday makers in all employment configurations.
 `,
 },
 {
 slug: "farm-work-rights-working-holiday-australia",
 title:
 "Farm work rights in Australia for working holiday makers (417 & 462)",
 description:
 "Farm work is one of the most common jobs for working holiday makers. What you are legally entitled to - pay rates, conditions, accommodation rules, and how 88-day specified work counts toward your 2nd visa.",
 category: "Work Rights",
 date: "16 June 2025",
 readTime: 5,
 body: `
Working holiday makers doing farm work in Australia are entitled to the same workplace protections as Australian workers. This includes minimum wage (or higher under the Horticulture Award), safe working conditions, accurate payslips, and super at 12% on top of wages. Farm work has a history of wage theft and exploitation, so knowing your rights before you start is essential. Our team helps working holiday makers in farm work check their pay rates and recover any unpaid wages or super.

## What protections apply to farm work?

All workers in Australia are covered by the Fair Work Act, including:

- Minimum wage protections
- The relevant industry award (usually the Horticulture Award for farm work)
- Safe working conditions
- Workers compensation if you are injured at work
- Protection from exploitation regardless of visa status
- Right to receive accurate payslips

Your visa status does not reduce these protections.

## What is the Horticulture Award?

Most farm work is covered by the Horticulture Award, which sets minimum rates:

- Hourly minimum rates (above the national minimum in some classifications)
- Piece rate guidelines (paid per bin, per kilogram, per unit)
- Required top-up rules: piece rate workers must earn at least the hourly minimum
- Penalty rates for overtime, weekend, and public holiday work

Your employer must pay whichever is higher between the piece rate and the hourly minimum for any hour worked.

## How do piece rates and minimum pay interact?

Many farms pay by piece rate (per bin, per kilogram), which is legal under the Horticulture Award. However:

- Your hourly earnings must equal at least the casual minimum hourly rate
- For 2025-26, the casual minimum is around $31.19/hour including casual loading
- If piece rate earnings fall below this for any hour, the employer must top up your pay
- The top-up is a legal requirement, not optional

If you suspect your piece rate earnings consistently fall short of the hourly minimum, [get in touch with our team](/contact). We help working holiday makers recover top-up amounts they were owed.

## What about deductions from your pay?

Some farms deduct costs for accommodation, transport, or meals. This is only legal if:

- You agreed to it in writing in advance
- The amounts are reasonable and reflect actual costs
- Deductions never bring your pay below the minimum wage

Deductions that breach these conditions are illegal. We see this regularly in farm work and have helped recover overcharged amounts. [Send us your records](/contact) if you think you have been overcharged.

## What should you do if you suspect underpayment?

Steps if you are being paid incorrectly:

1. Keep detailed records (hours, dates, piece counts, pay received)
2. Compare against the Horticulture Award rates
3. Raise the issue with your employer with calm, factual evidence
4. If unresolved, [get in touch with our team](/contact) to escalate

Reports can be made without affecting your visa. The Workplace Justice Visa provision protects temporary visa holders pursuing complaints.

## What about super on farm work?

If you are an employee (not contractor) on a farm:

- Employer must pay 12% super on top of your wages
- Applies to all employees regardless of hours
- Super is paid quarterly into your nominated fund
- Can be claimed back through DASP when you leave Australia

Many farm employers skip super for working holiday makers. Our team can recover unpaid super through the formal Superannuation Guarantee Charge process. See our article on [farm work and ABNs](/blog/farm-work-and-abns) if you are unsure whether you are an employee or contractor.
 `,
 },

 // ─── NEW: Medicare & Other ─────────────────────────────────────────────────
 {
 slug: "what-is-superannuation-guarantee-charge",
 title:
 "SGC explained: when Australian employers underpay super for working holiday makers",
 description:
 "If your Australian employer fails to pay your super correctly, the ATO can charge them the Superannuation Guarantee Charge. What this means for working holiday makers and how unpaid super is recovered.",
 category: "Medicare & Other",
 date: "20 June 2025",
 readTime: 4,
 body: `
The Superannuation Guarantee Charge (SGC) is a penalty the ATO applies to employers who fail to pay their employees' super correctly or on time. If your employer has missed super payments, our team can help recover them through the SGC process. The penalty includes the unpaid super amount, 10% per year interest, and an admin fee, all of which become payable by the employer. This makes it expensive for employers to skip super, which is exactly the point of the rule.

## What triggers the SGC?

The SGC applies when an employer:

- Fails to pay the required super (12% of ordinary time earnings as of July 2025)
- Pays super late (after the quarterly deadline)
- Pays less than the required amount
- Pays into the wrong fund (in some cases)

The quarterly super deadlines are:

- Q1 (July-September): due by 28 October
- Q2 (October-December): due by 28 January
- Q3 (January-March): due by 28 April
- Q4 (April-June): due by 28 July

If an employer misses any of these, they are liable for the SGC.

## What does the SGC include?

The SGC is more expensive for employers than paying super on time. It includes:

- The original unpaid super amount (the "shortfall")
- An interest component of 10% per year on the shortfall
- An administration fee per employee per quarter

Unlike regular super contributions, the SGC is **not tax-deductible** for the employer. This makes deliberate non-payment a costly mistake.

## What happens to your super if the SGC is charged?

The recovery process protects you:

1. The ATO collects the SGC amount from the employer
2. The super portion is paid into your nominated fund (or held by the ATO if no fund details exist)
3. The interest component is also paid to you through your super
4. Your super position is restored as if the employer had paid on time

This means your super is eventually protected even when the employer initially failed to pay. The catch: it can take months or years for the SGC process to complete, so the earlier you raise unpaid super, the better.

## How do you know if your employer is behind on super?

Check your super fund balance regularly:

- Log into your super fund and review contribution history
- Cross-check against your payslips (the super line item)
- Look for any quarter with no contribution that should have one
- Compare what was paid against what your payslip says

[Get in touch with our team](/contact) and we can run this check for you across all funds linked to your TFN.

## How does our team help recover unpaid super?

Our SGC recovery process:

1. We gather evidence of unpaid super (payslips, super statements, employment dates)
2. We calculate the shortfall and interest amount
3. We lodge the recovery claim with the ATO
4. We follow up with the ATO and employer through the process
5. The SGC amount flows back to your super fund or you directly

We have helped working holiday makers recover thousands in unpaid super through the SGC process. This works even after you have left Australia. [Send us your details](/contact) if you suspect unpaid super.

## What records support an SGC claim?

The stronger your records, the faster the recovery:

- All payslips showing super line items (or showing super not paid)
- Employment dates and weekly hours
- Pay rates and gross earnings
- Employer name, ABN, and business address
- Any communication with the employer about super

If you cannot find all of these, we work with what you have. Even partial records can support a successful claim.
 `,
 },

 // ─── TFN - NEW ─────────────────────────────────────────────────────────────
 {
 slug: "tfn-reference-number-before-tfn-arrives",
 title:
 "TFN reference number: can working holiday makers work while waiting for the TFN?",
 description:
 "You applied for your TFN but it has not arrived. The TFN reference number lets working holiday makers start working at the correct rate during the 28-day wait. How to get it and use it with your employer.",
 category: "TFN" as const,
 date: "24 June 2025",
 readTime: 4,
 body: `
The TFN reference number is a temporary identifier issued by the Australian Taxation Office (ATO) the moment your TFN application is submitted online. It is not your TFN itself, but it proves the application is in progress and lets your employer set up your pay at the correct 15% rate while you wait for the actual TFN to arrive. As a working holiday maker, you can legally start work using only the reference number, provided you give it to your employer on day one.

## What is the TFN reference number?

The reference number is a temporary identifier you receive the moment you complete your TFN application:

- Appears on the confirmation screen at the end of the application
- Sent to the email address provided in the application
- Looks like a standard reference code (separate from your actual 9-digit TFN)
- Acts as proof that your application is in progress

Think of it as a receipt that tells your employer you have done the right thing and are waiting on the ATO to process your application.

## Can you legally start work using only the reference number?

Yes. As a working holiday maker, you can begin employment before your TFN arrives, as long as you give your employer the reference number and then provide your actual TFN once it is issued.

What your employer should do with the reference number:

- Note the reference number in their payroll system
- Apply the 15% working holiday maker tax rate from day one
- Update your record once your real TFN arrives

If you start work without providing either a TFN or a reference number, your employer is legally required to withhold tax at the top rate of 45% until a TFN is on file. The reference number prevents that from happening.

## How long before your actual TFN arrives?

The ATO typically processes TFN applications within 28 days. In practice, many working holiday makers receive theirs sooner, sometimes within two weeks. Key points:

- The TFN is sent by post to the Australian address on your application
- Use an address you will be staying at long enough to receive the letter
- Our team can follow up if 28 days pass without delivery

If you applied through our service, we keep a record of your reference number and can chase the application directly with the ATO on your behalf.

## What to do once your TFN arrives

As soon as your TFN arrives:

1. Give it to your employer immediately
2. They update your Tax File Number Declaration form with the correct number
3. From that point, your records are linked to your actual TFN rather than the temporary reference

If you have moved since applying or your mail has gone to an old address, [get in touch with our team](/contact) and we will arrange for your TFN to be reissued securely.

## Keep your reference number safe

Do not delete the confirmation email from your TFN application:

- The reference number may be needed if there are delays
- Useful if you are starting multiple jobs quickly
- Required if you need to follow up on the application

Once your TFN is issued, the reference number becomes irrelevant. But in the weeks before it arrives, it is genuinely useful for making sure your pay is processed at the correct 15% rate from your first shift.
 `,
 },
 {
 slug: "tax-free-threshold-working-holiday-visa",
 title:
 "Tax-free threshold and the working holiday visa: why it does not apply (and the trap)",
 description:
 "The Australian tax-free threshold sounds like it would save you money. For working holiday makers on 417 and 462 visas, claiming it actually creates a tax debt. Why this happens and how to fix your TFN declaration.",
 category: "TFN" as const,
 date: "25 June 2025",
 readTime: 4,
 body: `
No, working holiday makers cannot claim the tax-free threshold in Australia. The tax-free threshold is a $18,200 concession available only to Australian tax residents. Claiming it as a working holiday visa holder causes your employer to withhold less tax than you actually owe, which creates a tax debt at year-end instead of a refund. The correct setup on your Tax File Number Declaration form is: Working Holiday Maker for residency, and "No" to the tax-free threshold question.

## What is the tax-free threshold?

The tax-free threshold is a provision for Australian tax residents that lets the first $18,200 of income each financial year be received tax-free. It exists because Australia uses a progressive tax system, and residents with low incomes are given this concession to reduce their overall tax burden.

It is a genuine benefit, but it is designed for Australian residents only, not for temporary visa holders.

## Why working holiday makers cannot claim it

Working holiday makers are taxed under a separate, specific rate structure:

- A flat 15% rate applies to the first $45,000 of earnings
- This rate exists precisely because you are not a tax resident in the same way a permanent resident or citizen is
- The tax-free threshold is part of the resident rate system, which operates differently

When you claim the tax-free threshold as a working holiday maker, your employer withholds less tax than you actually owe. It looks like more money in your pocket each week, but it creates a gap between what was withheld and what the ATO expects you to have paid. That gap becomes a tax debt when you lodge your [tax return](/tax-return).

## What does the mistake look like in practice?

Imagine you earn $1,000 per week:

- With the correct 15% rate applied: $150 withheld, $850 in your account
- With the tax-free threshold incorrectly claimed: significantly less withheld (sometimes nothing at lower income levels)

At year-end, the ATO calculates what you actually owed based on your total income and visa status. If less was withheld than required, you owe the difference. What should have been a refund turns into a bill.

## How to fix it if you have already claimed the threshold

If you have already submitted a Tax File Number Declaration form claiming the threshold:

1. Submit a new TFN declaration form to your employer
2. Select Working Holiday Maker for residency
3. Select No for the tax-free threshold question
4. Your employer updates your payroll going forward

The tax already withheld at the wrong rate is reconciled when you lodge your [tax return](/tax-return) at the end of the financial year. The earlier you correct the form, the smaller the adjustment needed at year-end.

If you are not sure how your Tax File Number Declaration form was filled in or want us to check your withholding rate, [get in touch with our team](/contact) and we will review your payslips.

## The bottom line

Do not claim the tax-free threshold on a working holiday visa. It is not a benefit available to you, and claiming it creates a tax debt instead of saving you money. The correct setup is simple:

- Residency: Working Holiday Maker
- Tax-free threshold: No

Every payslip will then reflect the correct 15% rate, and there will be no surprise debt waiting at the end of the year.
 `,
 },

 // ─── WORK RIGHTS - NEW ─────────────────────────────────────────────────────
 {
 slug: "white-card-australia-working-holiday",
 title:
 "White Card Australia: construction certificate for working holiday makers",
 description:
 "Working in construction in Australia requires a White Card before your first day on site. What the course covers, what it costs (around $40-$120), how long it takes, and where to do it as a working holiday maker.",
 category: "Work Rights" as const,
 date: "2 July 2025",
 readTime: 4,
 body: `
A White Card (officially called the Construction Induction Training card) is mandatory for anyone working on a construction site in Australia. It proves you have completed workplace health and safety training and is a legal requirement, not optional. The course takes 4-8 hours, costs around $100, and the card is valid for life across most of Australia. No legitimate construction employer will let you start without one.

## What is a White Card?

The White Card is a nationally recognised safety credential:

- Confirms completion of Construction Induction Training
- Covers on-site hazards, emergency procedures, worker rights
- Required by Australian work health and safety law
- Issued by Registered Training Organisations (RTOs)
- Valid for life in most cases (no expiry)

The card does not qualify you to perform any specific trade. It is purely a safety credential that everyone on a construction site needs.

## Who needs a White Card?

Anyone performing construction work in Australia:

- Labourers, carpenters, plumbers, electricians
- Landscapers, scaffolders, painters
- Trades helpers and apprentices
- Anyone regularly visiting construction sites for work

If you are doing fruit picking, hospitality, or office work, you do not need one. But the moment someone offers you construction work, even short-term casual labouring, you need a White Card before your first shift.

## How do you get a White Card?

The process:

1. Find a Registered Training Organisation (RTO) offering the course
2. Complete the training (in-person or online, depending on state)
3. Pass the assessment
4. Receive your card within a few days

Typical details:

- Duration: 4-8 hours
- Cost: around $100 (varies by provider)
- Format: online or in-person classroom
- Issued by: nationally accredited RTOs

The cost is a [legitimate work-related tax deduction](/blog/tax-deductions-working-holiday-makers) when claimed correctly on your [tax return](/tax-return).

## Is the White Card valid across all states?

Generally yes:

- Nationally recognised across most of Australia
- A card issued in Queensland is valid in NSW, Victoria, SA, Tasmania, Northern Territory, ACT
- Western Australia has historically operated a separate system - confirm acceptance if heading there

If you plan to work in WA, check with your employer or training provider whether your existing card is recognised or if you need a WA-specific qualification.

## How long does the White Card last?

The White Card does not expire:

- Issued for life once you complete training through an RTO
- No renewal required in most states
- Carry the card to every construction job

Keep a photo of the card on your phone in case you lose the physical one.

## Can you claim the cost as a tax deduction?

Yes. If you completed the White Card course to qualify for or maintain construction employment:

- The course cost is deductible as a work-related expense
- Include it in your [tax return](/tax-return)
- Keep the receipt as evidence

Our team includes these training costs when we prepare your return. If you have multiple work-related certifications, we claim all of them.

[Get in touch with our team](/contact) if you have wage, super, or workplace issues - we handle the tax and super side and coordinate with Fair Work where needed.
 `,
 },
 {
 slug: "rsa-certificate-australia-working-holiday",
 title:
 "RSA certificate Australia: hospitality requirement for working holiday makers",
 description:
 "Working in a bar, pub, or bottle shop in Australia requires an RSA (Responsible Service of Alcohol) certificate. What the course involves, what it costs by state, and how to get one as a working holiday maker.",
 category: "Work Rights" as const,
 date: "5 July 2025",
 readTime: 4,
 body: `
A Responsible Service of Alcohol (RSA) certificate is legally required to serve, sell, or supply alcohol at any licensed venue in Australia. Hospitality is one of the most popular industries for working holiday makers, and most hospitality roles in pubs, bars, restaurants, and bottle shops require an RSA before you can start. The course typically takes 3-5 hours, costs around $90, and can be done online. Course costs are tax-deductible as work-related expenses.

## What is the RSA?

The RSA is a short certification course covering:

- Identifying signs of intoxication
- How to refuse service legally and safely
- Legal obligations of staff and venue operators
- Preventing alcohol-related harm
- Liquor licensing rules

Without an RSA, you cannot legally serve a drink at any licensed venue. Operating without one risks legal penalties for both you and the venue.

## Who needs an RSA?

Any working holiday maker working in a role that involves alcohol:

- Bar staff in pubs, hotels, clubs
- Waitstaff in licensed restaurants
- Bottle shop and liquor store employees
- Event staff serving alcohol
- Nightclub workers
- Cellar door staff in wineries

If your role does not involve alcohol service (e.g., kitchen work, cleaning, back-of-house), you may not need one, but most hospitality employers require it as a baseline anyway.

## How do you get an RSA?

The course is offered by Registered Training Organisations (RTOs):

1. Find an RTO offering RSA training in your state
2. Choose online or classroom format
3. Complete the course (3-5 hours typically)
4. Pass the assessment
5. Receive your RSA certificate

Typical costs are around $90, though they vary by state and provider. Some employers cover the cost when they hire you, so ask before paying yourself.

## Is the RSA valid in every state?

No, RSA certificates are state-specific:

- Issued at state level (NSW, Victoria, Queensland, etc.)
- Not automatically transferable between states
- A Victoria RSA may not be valid in Queensland
- Some states have mutual recognition agreements, others do not

If you plan to work in hospitality across multiple states, you may need to complete the course again in each state. Check with your training provider before paying for an interstate course.

## How long does an RSA last?

Validity varies by state:

- **New South Wales**: 5 years
- **Victoria**: 3 years
- **Queensland**: 3 years
- **Western Australia**: no expiry
- **South Australia**: no expiry
- **Tasmania**: 3 years
- **ACT**: 3 years
- **Northern Territory**: 3 years

Renewal is usually a short refresher course rather than the full original course.

## Can you claim the cost as a tax deduction?

Yes. If you completed the RSA course for hospitality employment:

- Course fee is a [work-related deduction](/blog/tax-deductions-working-holiday-makers)
- Include the cost in your [tax return](/tax-return)
- Keep your receipt

When we prepare your return, we include training certifications among your deductions. Most working holiday makers have at least one or two relevant courses that are deductible.

[Get in touch with our team](/contact) if you have wage, super, or workplace issues - we handle the tax and super side and coordinate with Fair Work where needed.
 `,
 },
 {
 slug: "wwcc-working-with-children-check-australia",
 title:
 "Working With Children Check (WWCC) for working holiday makers in Australia",
 description:
 "Working with children in Australia requires a WWCC (Working With Children Check) before you start. What it involves, application processing time, and how working holiday makers can apply state by state.",
 category: "Work Rights" as const,
 date: "18 July 2025",
 readTime: 4,
 body: `
A Working With Children Check (WWCC) is a background screening required for anyone working with children in Australia. If you plan to work in childcare, education, tutoring, sports coaching, youth programs, or as an au pair, you need a WWCC before starting. The check is managed at state level, costs around $80 (free for volunteers), and processing takes a few weeks. Start the application as early as possible to avoid delays before your first day.

## What is a Working With Children Check?

A WWCC is a risk assessment conducted by the relevant state government:

- Examines criminal history
- Reviews findings of inappropriate behaviour involving children
- Checks other relevant records
- Identifies people who pose unacceptable risk to children

Unlike a one-off police check, a WWCC is ongoing. Authorities continue monitoring your record after the check is issued, and can revoke a WWCC if new information emerges.

## Who needs a WWCC?

Anyone in a paid or volunteer role with regular contact with children:

- Childcare workers
- Teachers and teacher assistants
- Tutors and music teachers
- Sports coaches and instructors
- Camp workers and counsellors
- Youth program staff
- Au pairs and nannies
- After-school care workers

As a working holiday maker taking on any of these roles, you need a WWCC. Most employers will not let you start work without one.

## How do you apply for a WWCC?

The application process varies by state but generally:

1. Apply online through the relevant state authority
2. Pay the application fee (typically around $80 for paid workers, free for volunteers)
3. Attend an identity verification appointment (often at Australia Post)
4. Provide proof of identity documents
5. Wait for the check to be processed (usually a few weeks)

The exact process and fees vary by state:

- New South Wales: WWCC issued by Office of the Children's Guardian
- Victoria: Working with Children Check Victoria
- Queensland: Blue Card system
- Other states have their own equivalents

Plan ahead. Apply 4-6 weeks before you intend to start work to allow time for processing.

## Is the WWCC valid across states?

No, WWCCs are state-specific:

- Each state issues its own version
- Not automatically transferable between states
- Moving from NSW to Victoria → apply for a new check
- Always confirm with your employer and the new state's authority

If you plan to work with children across multiple states, factor the additional applications and fees into your planning.

## How long does a WWCC last?

Validity varies by state:

- Typically 3 to 5 years
- Some states issue checks valid for the full 5 years
- Renewal required before expiry to continue child-related work

## Are working holiday makers eligible?

Yes. Working holiday visa holders (subclass 417 and 462) can apply for a WWCC:

- The check requires identity verification
- An Australian address is typically needed
- A valid working holiday visa qualifies you for child-related work
- Start the process early to avoid delays

If you need help understanding what is required for your specific situation, [get in touch with our team](/contact). We help working holiday makers navigate the documentation requirements before their first day of work.
 `,
 },
 {
 slug: "public-holidays-australia-working-holiday",
 title:
 "Public holidays in Australia: pay rates for working holiday makers",
 description:
 "Public holidays in Australia come with penalty pay rates and different rules depending on employment type. Full list of national & state public holidays and what working holiday makers are entitled to.",
 category: "Work Rights" as const,
 date: "20 July 2025",
 readTime: 5,
 body: `
Public holidays in Australia attract higher pay rates for workers, typically 225-250% of your ordinary rate (double time and a quarter to double time and a half). Working holiday makers are entitled to the same public holiday penalty rates as Australian workers. There are national public holidays observed across the country (New Year's Day, Australia Day, ANZAC Day, Christmas Day, etc.) and additional state-specific public holidays. If your payslip does not show the higher rate for public holiday work, our team can help recover what you are owed.

## What are the national public holidays in Australia?

Public holidays observed across the entire country:

- **1 January**: New Year's Day
- **26 January**: Australia Day
- **Good Friday and Easter Monday**: dates vary each year
- **25 April**: ANZAC Day
- **25 December**: Christmas Day
- **26 December**: Boxing Day

The King's Birthday is also a national public holiday but is observed on different dates by state. In most states it falls on the second Monday in June, but Queensland and Western Australia observe it differently.

## What state-specific public holidays exist?

Each state and territory adds its own public holidays:

- **Victoria**: Melbourne Cup Day (first Tuesday in November), AFL Grand Final Friday
- **NSW**: Bank Holiday (first Monday in August, banks only)
- **Queensland**: Royal Queensland Show (the Ekka, Brisbane only)
- **South Australia**: Adelaide Cup Day, Proclamation Day
- **Western Australia**: WA Day (first Monday in June)
- **Tasmania**: Royal Hobart Show Day, Eight Hours Day

Labour Day falls on different dates in different states. As a working holiday maker moving between states, check the local public holiday calendar for wherever you are based.

## What pay rate applies on public holidays?

Public holiday penalty rates are among the highest in Australian employment:

- **Standard public holiday rate**: 225% of your ordinary rate (double time and a quarter)
- **Some awards**: 250% (double time and a half)
- **Casual employees**: the 25% casual loading is already in your base rate, so the public holiday rate calculation may be slightly different

Examples for a working holiday maker on a $25/hour ordinary rate:

- 225% public holiday rate: $56.25/hour
- 250% public holiday rate: $62.50/hour

These rates apply to **all hours worked** on the public holiday, including hours that would normally be regular shifts.

## Can your employer require you to work on a public holiday?

Under the Fair Work Act:

- Employers can **request** employees to work a public holiday
- Employees have the right to refuse if the request is unreasonable
- A refusal cannot be used as grounds for termination
- Reasonable requests consider business need, employee circumstances, and notice given

For casual workers, you can typically decline a public holiday shift without consequence. For permanent employees, refusing may have implications depending on the reasonableness of the request.

## What if you do not work on a public holiday?

For permanent employees (full-time and part-time):

- If a public holiday falls on a day you normally work, you receive your ordinary pay for that day off
- This is paid at your base rate (no penalty)
- This entitlement does not apply to casual employees

For casual employees:

- You are not paid for public holidays you do not work
- The 25% casual loading is intended to compensate for the lack of paid public holidays

## Is there overtime on top of public holiday rates?

Generally no. The public holiday rate is already at the maximum penalty level:

- Public holiday rate applies to all hours worked
- No additional overtime loading stacked on top
- Some specific awards may have nuances; the public holiday rate usually absorbs overtime

## What should you check on your payslip after a public holiday?

After a week with a public holiday:

- Confirm the public holiday rate is shown separately from regular hours
- Check the rate matches the award penalty (usually 225-250%)
- Verify the total hours worked on the public holiday are correctly counted
- Compare against your roster

If your pay does not reflect the correct public holiday rate, [get in touch with our team](/contact). We help working holiday makers recover penalty rate underpayments through the right channels.
 `,
 },
 {
 slug: "casual-shift-cancellation-rules-australia",
 title: "Can your employer cancel a casual shift in Australia? Working holiday rights",
 description:
 "As a casual worker in Australia, shifts can be cancelled - but employers must follow specific rules. Notice requirements, minimum payment entitlements, and what working holiday makers can do about repeated cancellations.",
 category: "Work Rights" as const,
 date: "24 July 2025",
 readTime: 4,
 body: `
Yes, your employer can cancel a casual shift in Australia, but there are rules. If a shift is cancelled with less than 24 hours notice and you had already made arrangements to attend, most awards require the employer to pay you a "minimum engagement" of 2-3 hours regardless. The exact rule depends on the award covering your industry. Our team helps working holiday makers check whether they have been underpaid for cancelled shifts and recover what they are owed.

## Can your employer cancel a casual shift?

Yes, but not without consequences:

- Employers may cancel shifts due to business needs
- Reasonable notice should be given
- Short-notice cancellations may trigger minimum payment obligations
- The exact rules depend on your award

You do not have a guaranteed right to every shift on the roster. Casual employment is by nature flexible, with shifts varying week to week.

## What is the minimum engagement payment?

Most modern awards include a minimum engagement period for casual employees:

- **Hospitality Industry (General) Award**: 2 hours minimum
- **General Retail Industry Award**: 3 hours minimum
- **Cleaning Services Award**: 3 hours minimum
- **Horticulture Award**: varies by classification

This means if your shift is cancelled with very short notice (or you arrive at work and are sent home immediately), you are generally entitled to payment for at least the minimum engagement hours.

The exact minimum varies by industry. [Get in touch with our team](/contact) to check the rule for your specific award.

## What if you are sent home early?

If you arrive at work and are sent home before completing your shift:

- The same minimum engagement rules apply
- Unless you have already worked the minimum (2-3 hours), the employer must pay up to it
- This applies even if business is slow or the workplace is unexpectedly closed

For example, on a 6-hour shift cancelled after 1 hour, you would still be paid for the full minimum engagement (typically 2-3 hours depending on award).

## Are casuals entitled to sick pay?

No. Casual employees do not receive paid sick leave:

- You are not paid for shifts you cannot attend due to illness
- The 25% casual loading is intended to compensate for the lack of paid leave
- Permanent employees accrue sick leave; casuals receive higher hourly rate instead

This is a fundamental trade-off of casual employment.

## Is there a minimum number of shifts per week?

No. Casual employment does not guarantee any number of shifts:

- Your employer is not required to roster you for a minimum number of hours
- Shifts depend on business need
- If shifts dry up, there is generally no legal remedy

Some long-term casuals can argue for conversion to permanent employment after a defined period, but this is uncommon for working holiday makers on shorter stays.

## What should you do if your shifts are being cancelled improperly?

If you are not receiving minimum engagement payments:

1. Keep records of your roster, original shift times, and cancellation notices
2. Note the time between cancellation notice and the scheduled shift
3. Compare what you were paid against the minimum engagement under your award
4. Raise it with your employer first
5. If unresolved, [get in touch with our team](/contact)

Our team helps working holiday makers calculate what was owed and recover the unpaid minimum engagement amounts.

## What records support a claim?

To support a claim for unpaid minimum engagement:

- Your roster showing the cancelled shifts
- Text messages, emails, or app notifications about cancellations
- The time and date of each cancellation notice
- Payslips showing what was paid
- The award and classification covering your role

The more complete the records, the easier the recovery.
 `,
 },
 {
 slug: "six-month-employer-rule-working-holiday-visa",
 title:
 "6-month employer rule on working holiday visa: 417 & 462 limits explained",
 description:
 "Working holiday visa holders are limited to 6 months with the same employer (with exceptions). What counts as the same employer, which sectors are exempt, and when you need to request permission.",
 category: "Work Rights" as const,
 date: "27 July 2025",
 readTime: 5,
 body: `
The 6-month employer rule (visa condition 8547) limits working holiday visa holders (subclass 417 and 462) to working for the same employer for a maximum of 6 calendar months. The rule is mandatory and remains in force in 2026. However, many sectors are exempt from this limit, including agriculture, tourism/hospitality, construction, mining, aged care, childcare, and natural disaster recovery. Outside these exemptions, you must change employers after 6 months or request written permission from the Department of Home Affairs. Our team helps working holiday makers understand whether their work qualifies for an exemption.

## What is the 6-month employer rule?

Visa condition 8547 applies to all working holiday makers (subclass 417 and 462):

- Maximum **6 months** working for the same employer
- Counted in **calendar months** from your start date
- Based on calendar time, not hours or days worked
- Breach can result in visa cancellation
- The 6 months resets only when a new working holiday visa is granted

The condition exists to keep the working holiday visa focused on travel and cultural exchange rather than long-term employment.

## What counts as the same employer?

The 6-month limit applies to the legal business entity (ABN), not just the physical workplace:

- **Same company, different branches**: usually counts as the same employer
- **Same company, different ABNs**: different employers
- **Franchises with different owners**: typically different employers
- **Labour hire arrangements**: the end user (where you actually work) is the employer
- **Self-employed/contractor**: each end client is treated as a separate employer

For contractors, if you provide services to a single end client, that client is your employer for the 6-month rule. Working with multiple clients lets you exceed 6 months without breaching the rule.

## Which work is exempt from the 6-month rule?

The Department of Home Affairs has approved several exemptions. You can work beyond 6 months without permission if your work is in:

- **Plant and animal cultivation** (agriculture, horticulture)
- **Fishing and pearling**
- **Tree farming and felling**
- **Mining**
- **Construction**
- **Tourism and hospitality** (anywhere in Australia)
- **Health, aged care, and disability care**
- **Childcare**
- **Food processing**
- **Natural disaster recovery work**
- **Different locations of the same employer** (where each location does not exceed 6 months)

These exemptions cover the majority of jobs that working holiday makers typically take, so for most backpackers the 6-month rule is not a practical issue.

## How do you work past 6 months in a non-exempt sector?

If your role does not fall within an exemption, you must:

1. **Submit a written permission request** before the 6 months ends
2. **Demonstrate** operational need or other compelling circumstances
3. **Wait for a written decision** (you can continue working while the request is pending)
4. **Stop work** if the request is denied

The Department has discretion to approve or deny permission. Common grounds for approval:

- You have applied for a new visa allowing full-time work
- Critical or priority sector with employer support
- Compelling operational reasons

## What happens if you breach condition 8547?

The Department actively monitors compliance. Breach can result in:

- Visa cancellation
- Refusal of future Australian visa applications
- Civil penalties on the employer
- Compliance issues for both employee and employer

Even unintentional breaches can affect future visa outcomes. The rule is strictly enforced.

## What about the 88-day specified work requirement?

The 88-day rule for a second-year visa is **separate** from condition 8547:

- 88 days of specified work in a regional area is required for second-year visa
- The work must be in approved industries and regional postcodes
- Most specified work industries are also exempt from the 6-month rule
- You can complete all 88 days with one employer in many cases

For a third working holiday visa, the requirement is 6 months (179 days) of specified work during your second visa.

## What does this mean for tax and super?

Working under the 6-month rule (or an exemption):

- Same 15% working holiday maker rate applies throughout
- Super continues to accumulate (12% on top of wages)
- All wages combine on your annual [tax return](/tax-return)
- Super from each employer accumulates in their nominated fund

For super accumulation, working for one employer for longer (where allowed) is helpful because it consolidates contributions into fewer funds. See our article on [finding lost superannuation](/blog/how-to-find-lost-superannuation).

## What practical steps should you take?

To stay compliant:

- Keep records of your start and end dates with each employer
- Check whether your work falls within an exempt sector
- If not exempt, plan to change employers before the 6-month mark
- Or submit a permission request before the 6 months ends
- Keep your employer ABN on your payslips to verify the legal entity

If you are unsure whether your work qualifies for an exemption, [get in touch with our team](/contact) and we will check the specifics of your situation.
 `,
 },

 // ─── GENERAL / PRACTICAL - NEW ────────────────────────────────────────────
 {
 slug: "opening-bank-account-australia-working-holiday",
 title: "How to open an Australian bank account as a working holiday maker",
 description:
 "Working holiday makers need an Australian bank account before their first pay arrives. Which banks accept WHV applicants, what documents you need (passport, visa, address), and when to close before leaving.",
 category: "Medicare & Other" as const,
 date: "4 August 2025",
 readTime: 5,
 body: `
Opening an Australian bank account is one of the first things to do when arriving in Australia. You need it to receive your wages, super contributions, and any tax refund from the ATO. The major banks (Commonwealth Bank, Westpac, ANZ, NAB) all offer accounts suitable for working holiday makers. You can typically pre-apply online before arriving and complete identity verification in person within the first few days. Keep the account open until your tax refund and super withdrawal have been paid - usually 3-4 months after departure.

## Which bank should you choose?

The four major Australian banks all work for working holiday makers:

- **Commonwealth Bank (CBA)**: largest branch and ATM network
- **Westpac**: second largest, good for international students
- **ANZ**: established expat services
- **NAB**: similar features to the others

All four offer:

- Free or low-fee transaction accounts for backpackers
- Online banking and apps
- Widespread ATM networks
- Visa or Mastercard debit cards
- Easy direct debit setup for employers

There is no major difference between them for everyday use. Pick whichever has a branch near where you are landing or staying.

## What documents do you need?

To open a bank account, you typically need:

- Your passport (must be valid)
- An Australian residential address (hostel or temporary address is usually fine)
- An Australian phone number (Australian SIM card is helpful)
- Proof of identity (passport plus another ID item)
- Your TFN (helpful but not required at opening)

Most major banks let you start the application online before arriving in Australia. Your account is partially set up and ready to activate when you land. You will need to visit a branch to complete identity verification in person.

## Are there monthly fees?

Most major Australian banks charge a monthly account fee of around $5:

- Often waived if you deposit a minimum amount each month (usually $2,000)
- Most working holiday makers receiving regular wages meet this threshold easily
- Many banks offer free accounts specifically for new arrivals or students

If you are not sure whether your account will meet the deposit threshold, ask the bank about fee-free options.

## What about international money transfer services?

Some working holiday makers use services like Wise (formerly TransferWise) for international transfers:

- Better exchange rates than banks for sending money home
- Useful for converting Australian dollars to your home currency
- Does NOT replace the need for an Australian bank account
- You still need a standard Australian account for wages, tax refunds, and super

Use both: an Australian bank for receiving wages and Australian government payments, and a transfer service for sending money home.

## When should you close your Australian bank account?

**Do not close it too early.** You need an active Australian bank account to receive:

- Your tax refund from the ATO (paid 2-6 weeks after lodgment)
- Your superannuation withdrawal through DASP (can take 4+ weeks)
- Any final wage payments from your employer
- Any unpaid super recovered through SGC

Both your [tax refund](/tax-return) and [DASP super withdrawal](/blog/what-is-dasp-super-withdrawal) can take weeks or months after you leave Australia to be processed. Premature closure causes serious complications.

The right approach:

1. Lodge your tax return and apply for DASP before leaving Australia
2. Keep your bank account open for 3-4 months after departure
3. Once all payments have cleared, transfer the balance home
4. Close the account

If you closed your account too early, [get in touch with our team](/contact) and we will arrange alternative payment for any pending refunds or super.

## A note on banking scams and fraud

The ATO and our team will never:

- Ask you to update your bank details via a text or email link
- Demand immediate payment in gift cards or crypto
- Threaten arrest or visa cancellation
- Call you out of the blue requesting personal information

Any communication asking you to click a link and enter banking information is a scam. If you receive a suspicious message claiming to be from the ATO or a tax agent, do not engage. [Get in touch with our team](/contact) if you are unsure whether something is legitimate.
 `,
 },
 {
 slug: "trs-tourist-refund-scheme-australia",
 title:
 "TRS Tourist Refund Scheme: claim 10% GST back when leaving Australia",
 description:
 "If you bought goods in Australia worth $300+ in one transaction, you can claim back the 10% GST at the airport before flying home. How the Tourist Refund Scheme works for working holiday makers leaving Australia.",
 category: "Medicare & Other" as const,
 date: "8 August 2025",
 readTime: 5,
 body: `
The Tourist Refund Scheme (TRS) allows you to claim back the 10% Goods and Services Tax (GST) on goods purchased in Australia before flying home. To qualify, the invoice must be $300+ from a single business (single ABN), purchased within 60 days of departure, and you must be carrying the goods with you. Claims are made at the airport before passing through customs. A $1,000 laptop refunds about $91 of GST. For working holiday makers leaving Australia, the TRS is worth using on significant purchases.

## What is the Tourist Refund Scheme?

The TRS is a Government program that lets departing travellers reclaim the GST paid on Australian goods they are taking home:

- Operated by the Australian Border Force
- Available at international airports and some seaports
- Refunds the 10% GST (and 14.5% Wine Equalisation Tax on wine)
- Available to all travellers, including working holiday makers

The program exists because GST is intended to be a consumption tax in Australia. If you are taking goods out of the country, the tax should not apply.

## Who can claim the TRS?

Any traveller departing Australia, including:

- Working holiday visa holders
- Tourists
- Australian residents going overseas (in some cases)
- International students returning home

The key requirement: you are leaving Australia and taking the goods with you.

## What purchases qualify for TRS?

To be eligible, your purchases must meet all of the following:

- Goods purchased from a **single business under a single ABN**
- Total invoice amount of **$300 or more** (including GST)
- Purchased **within 60 days** of your departure
- Goods are **available for inspection** at the airport
- Goods are **physical** (not services, hotels, or accommodation)

Most physical goods qualify:

- Electronics, cameras, phones, laptops
- Watches, jewellery, luggage
- Clothing, shoes, accessories
- Sporting goods, surfboards

What does NOT qualify:

- Services (massages, accommodation, tours)
- Consumables you have already used (food, opened drinks, used toiletries)
- Tobacco products
- GST-free items (some foods, medical items)
- Goods you have already mailed or shipped home

## What documents do you need to claim?

To make a claim, bring:

- Your **passport**
- Your **boarding pass or airline ticket** showing departure
- Original **tax invoices** for each purchase
- The **goods themselves**

The tax invoice must show:

- The seller's name and ABN
- The amount of GST paid (or the total including GST)
- A description of the goods
- The date of purchase

For invoices over $1,000, your full name must appear on the invoice. Ask the retailer to add your name to large invoices at purchase time.

## How do you make a TRS claim?

The process at the airport:

1. Arrive at the airport with extra time (allow at least 60 minutes for TRS)
2. Check in for your flight as normal
3. Take your hand luggage with the goods you are claiming through
4. Find the TRS facility (usually in the international terminal, after security)
5. Present your passport, boarding pass, and tax invoices
6. Show your goods for inspection
7. Receive your refund

Processing typically takes 15-30 minutes, depending on queue length. The MyTRS app allows pre-lodgment to speed things up at the airport.

## How is the refund paid?

You can choose how to receive your TRS refund:

- Credit card refund (most popular, usually appears within 5 business days)
- Direct deposit to an Australian or international bank account
- Cheque (slowest)

Australian credit cards are typically the fastest. If you have closed your Australian bank account, choose the credit card option.

## Is the TRS refund worth the effort?

On larger purchases, yes:

- $1,000 laptop → ~$91 GST refund
- $2,000 camera → ~$182 GST refund
- $500 watch → ~$45 GST refund
- $3,000 in electronics → ~$273 GST refund

If you spent significantly during your time in Australia, the total can add up to several hundred dollars. The 15-30 minutes at the airport is well spent for that return.

## What records should you keep?

Throughout your stay in Australia:

- Save every tax invoice from significant purchases
- Photograph receipts immediately (paper can fade)
- Group invoices by retailer (multiple purchases from the same business can be combined to reach $300)
- Keep invoices accessible in your hand luggage on departure

Combining purchases under the $300 threshold helps. Buying two $200 items from the same Apple Store qualifies (combined $400 invoice if billed together). The same purchases from different retailers do not combine.

The TRS process itself is done at the airport before you fly out, but the timing matters: once you have left Australia, you cannot lodge a TRS claim retroactively. If you also need to lodge your final [tax return](/tax-return) or claim your [super](/superannuation) before leaving, [get in touch with our team](/contact) so the whole departure picture is coordinated.
 `,
 },
 {
 slug: "transferring-money-overseas-australia-tax",
 title: "Do you pay tax on money you transfer out of Australia?",
 description:
 "Sending your savings home before leaving Australia? Here is what working holiday makers need to know about international transfers and Australian tax obligations.",
 category: "Tax Return" as const,
 date: "11 August 2025",
 readTime: 4,
 body: `
No, transferring money out of Australia does not create a tax obligation in itself. The transfer of funds from your Australian bank account to a bank account in your home country is a movement of money, not income. The ATO does not tax you for moving money. What matters for tax is the income you earned in Australia, which is taxable in the year it was received regardless of where you eventually spend it. Sort out your tax affairs and super withdrawal before you transfer everything home and close your Australian account.

## Is transferring money overseas taxable?

No. The transfer itself is not a taxable event:

- Sending Australian dollars to your home country = not income
- Converting AUD to your home currency = not income
- Transferring savings = not income
- The ATO does not tax money movement

What the ATO does tax is the **income you earned** in Australia. That income is taxable when received, not when you transfer it.

## What does the ATO actually care about?

The Australian tax system is interested in:

- Your wages earned in Australia (taxed at 15% for working holiday makers)
- Any contractor income earned under an [ABN](/abn)
- Investment income earned on Australian assets
- Tips and other employment income
- Cash-in-hand work (yes, still taxable)

When we lodge your [tax return](/tax-return), we declare your income and calculate the tax owed against what was withheld. The result is either a refund or a tax bill. Once that is sorted, what you do with the net amount (spend in Australia, transfer home, hold in your account) is up to you.

## Do you need to report large international transfers?

Two separate rules apply:

**For physical cash over $10,000 AUD:**
- Must be declared to the Australian Border Force at the airport
- Anti-money-laundering requirement, not a tax requirement
- No tax liability triggered by the declaration

**For electronic transfers:**
- Banks report large international transfers (typically over $10,000) to AUSTRAC automatically
- No action required from you
- Not a tax event

Neither of these creates new tax. They are reporting requirements for financial monitoring.

## What about income tax already paid in Australia?

If your employer withheld PAYG tax during the year, that tax has already been paid to the ATO:

- Your gross wages were taxed at 15% (assuming TFN on file, correct setup)
- The net amount went to your bank account
- That net amount is what you transfer home
- No second layer of Australian tax applies

If too much tax was withheld during the year (common for working holiday makers), you reclaim the excess through your [tax return](/tax-return). The refund is paid to your Australian bank account and can then be transferred home.

## Will you owe tax in your home country?

This depends on your home country's tax laws:

- Many countries have double-tax agreements with Australia
- These usually let you offset Australian tax paid against any home country liability
- Income earned in Australia is typically reportable in your home country
- The specific treatment varies by country

A tax adviser in your home country is the right person to ask about home country obligations. Many home countries treat Australian working holiday earnings differently from regular foreign income.

## What is the right order before leaving Australia?

The sequence to follow:

1. Lodge your Australian [tax return](/tax-return) (our team handles this)
2. Apply for your [superannuation withdrawal](/blog/what-is-dasp-super-withdrawal) through DASP
3. Cancel any [ABN](/abn) you registered
4. Wait for any tax refund and your super payment to arrive in your Australian account
5. Transfer everything home
6. Close your Australian bank account

Skipping or reordering these steps creates complications. Closing your bank account too early is the most common mistake - any tax refund and your super payment then have nowhere to go.

## What about money you brought into Australia?

Money you brought in with you when you arrived is not taxable:

- Pre-existing savings from your home country are yours
- Bringing them in is not income
- Transferring some of them back out is not a tax event

What is taxable is everything you earned in Australia during your stay. The distinction is between what you earned here (taxable) and what you brought in or hold in savings (not taxable).

[Get in touch with our team](/contact) to lodge your Australian tax return under the supervision of a registered tax agent and make sure every refund you are entitled to is claimed.
 `,
 },

 // ─── ABN ADVANCED - NEW ────────────────────────────────────────────────────
 {
 slug: "vehicle-logbook-abn-working-holiday",
 title:
 "Vehicle logbook for ABN income: working holiday makers' deduction guide",
 description:
 "If you use a car for work under your ABN, you may be able to claim vehicle expenses as a tax deduction. How the logbook method works for working holiday makers, what to record, and the 12-week minimum.",
 category: "ABN" as const,
 date: "12 August 2025",
 readTime: 5,
 body: `
If you work under an ABN and use a vehicle for business, you can claim vehicle expenses as tax deductions. The two methods are: cents-per-kilometre (88c/km, up to 5,000 km/year, no logbook needed) and the logbook method (claim actual expenses based on business-use percentage). Driving from your accommodation to a work site or between job sites counts as business travel. Driving from home to your regular workplace does not. Our team picks the method that gives you the largest legitimate deduction.

## Can you claim vehicle expenses with an ABN?

Yes, if the vehicle is used for genuine business purposes:

**Deductible business travel:**

- Driving between multiple job locations on the same day
- Travelling to purchase equipment or supplies for your business
- Travel from your accommodation to a temporary work site (variable locations)
- Travel for business meetings or client visits
- Travel for training directly related to your business

**Not deductible (personal travel):**

- Daily commute from home to a single regular workplace
- Personal trips
- Travel for non-business purposes
- The "first and last" trip of the day to/from your main work base

The key distinction: business travel needs a genuine business purpose. Personal travel does not, even if you take it after work.

## How does the cents-per-kilometre method work?

The simplest method for most working holiday makers:

- Set rate of **88 cents per kilometre** (current ATO rate)
- Claim up to **5,000 km per year**
- Maximum deduction: $4,400 per year (5,000 km × 88c)
- **No detailed logbook required**

To use this method, keep a simple record of your business trips:

- Date of each trip
- Estimated distance
- Purpose (e.g., "Drive to client site for installation")

This is the easiest method and works for most working holiday makers under an ABN doing occasional driving.

## How does the logbook method work?

The logbook method gives a larger deduction if you drive a lot for business:

1. Keep a logbook for a **continuous 12-week period**
2. Record every trip (business and personal) during the 12 weeks
3. Calculate the **business-use percentage**
4. Apply that percentage to total vehicle expenses for the year

For each trip in the logbook, record:

- Date
- Starting and ending odometer readings
- Total kilometres
- Destination
- Purpose of the trip

After 12 weeks, you know your business-use percentage. That percentage applies to **all vehicle expenses** for the year:

- Fuel
- Insurance
- Registration
- Servicing and maintenance
- Repairs
- Depreciation

Example: 60% business use × $8,000 total vehicle costs = $4,800 deductible.

The logbook is valid for **5 years** (or until your usage pattern changes significantly).

## Which method should you use?

It depends on your situation:

- Drive less than 5,000 km/year for business → cents per kilometre
- Drive a lot for business and own the vehicle → logbook method
- Mixed personal/business use → logbook method often gives bigger deduction
- Lease or finance the vehicle → logbook method captures more costs

When we prepare your [tax return](/tax-return), we calculate both methods and apply whichever gives the larger legitimate deduction.

## What records do you need to keep?

For both methods, keep:

- Receipts for all vehicle expenses (fuel, insurance, servicing, registration)
- Logbook or trip records (depending on method)
- Odometer readings at the start and end of the financial year
- Vehicle purchase invoice (if you bought it during the year)

Keep records for **5 years** from the date you lodge the return claiming the expenses.

## A practical note for working holiday makers

Many backpackers buy a car to travel and work around Australia. If you have an ABN and use the car for business:

- Trips to ABN work sites are deductible business travel
- Personal travel (sightseeing, road trips) is not deductible
- Mixed use requires the logbook method to claim accurately

The Sydney-to-Cairns road trip is personal. The drive from your hostel to a farm for ABN work is business. Keep them separate in your records.

[Get in touch with our team](/contact) before lodging if you want help working out which method maximises your deduction. We do this for ABN holders every week.
 `,
 },
 {
 slug: "small-business-tax-offset-working-holiday-abn",
 title:
 "Small business tax offset: can working holiday makers with an ABN claim it?",
 description:
 "If you earn income under an ABN as a sole trader, you may be entitled to the small business tax offset - a tax reduction of up to $1,000. How working holiday makers can claim it on their tax return.",
 category: "ABN" as const,
 date: "16 August 2025",
 readTime: 4,
 body: `
The small business tax offset is a tax concession for sole traders and partnerships that can reduce the tax owed on your business income by up to $1,000 per year. If you earned income under an ABN in Australia, you may be entitled to this offset. The current rate is a 16% discount on tax payable on business income (capped at $1,000). The offset is non-refundable, meaning it can reduce your tax to zero but cannot create a refund on its own. Our team applies all eligible offsets when we prepare your [tax return](/tax-return).

## What is the small business tax offset?

The small business tax offset (also called the unincorporated small business tax discount) is a concession for small business sole traders and partners:

- Reduces income tax payable on business income
- Current rate: 16% of tax payable on business income
- Maximum benefit: $1,000 per income year
- Applies to ABN sole trader and partnership income
- Non-refundable (can reduce tax to zero, no further benefit)

It exists to provide some tax relief to small business owners who do not have access to the lower company tax rates available to incorporated businesses.

## Who can claim the small business tax offset?

To qualify, you must:

- Be an **individual** taxpayer (sole trader or partner in a partnership)
- Have **aggregated annual turnover under $5 million** (almost no working holiday maker hits this)
- Have **business income** earned under an ABN
- Not be a company or trust

For working holiday makers operating under an ABN, the turnover requirement is essentially never an issue. The offset applies if you had ABN income at all.

## How much is the offset worth in practice?

Examples for working holiday makers:

- $5,000 ABN income → small business offset around $120 (16% of 15% tax on $5,000)
- $15,000 ABN income → small business offset around $360
- $30,000 ABN income → small business offset around $720
- Higher ABN income → capped at $1,000

The offset reduces the tax owed on the **business income portion** of your return, not your wage income.

## Can the offset be combined with other offsets?

Yes. Multiple offsets can apply to the same return:

- **Small business tax offset**: reduces tax on business income (max $1,000)
- **Low income tax offset**: reduces tax based on total income (see [low income tax offset article](/blog/low-income-tax-offset-working-holiday))
- **Medicare Levy exemption**: removes the 2% levy (most working holiday makers eligible)

Each is calculated separately and applied to your final tax position. Our team identifies and applies every eligible offset when preparing your return.

## What if you earned both ABN and TFN income?

Common for working holiday makers (employee work alongside contracting):

- Your wage income (TFN) is taxed at the 15% working holiday maker rate
- Your business income (ABN) is also taxed at the 15% working holiday maker rate
- Both are reported on a single tax return
- The small business offset applies only to the ABN income tax
- Other offsets and deductions apply across both

This interaction makes professional lodgment worthwhile. We have lodged returns for many working holiday makers with mixed income and know how to maximise the result.

## How do you claim the small business tax offset?

The offset is not automatic - it must be calculated and applied at lodgment:

- The ATO does not apply it for you automatically
- Self-lodgers often miss it
- Our team calculates and applies it for every eligible ABN holder
- [Get in touch](/abn) if you had ABN income and want to make sure you are claiming it

If you have already lodged a return without claiming the offset, we can amend the return to claim it retrospectively (typically up to two years after the original lodgment).

[Get in touch with our team](/contact) for help registering an ABN, managing GST and BAS, or sorting out your end-of-year tax position correctly.
 `,
 },
 {
 slug: "sole-trader-vs-company-australia-working-holiday",
 title:
 "Sole trader vs company in Australia: the right structure for working holiday makers",
 description:
 "Most working holiday makers operate as sole traders, but understanding the difference between a sole trader and a company helps you choose the right business structure for your income and tax situation.",
 category: "ABN" as const,
 date: "2 September 2025",
 readTime: 5,
 body: `
For working holiday makers, the choice between a sole trader and a company is almost always sole trader. A sole trader is an individual operating under their own name (with an ABN), where the business income flows directly to their personal tax return. A company is a separate legal entity with its own ABN, tax obligations, and significant administrative overhead. Working holiday makers earning typical amounts ($5,000 to $50,000 under an ABN) do not benefit from a company structure. Our team registers ABNs for working holiday makers as sole traders by default.

## What is a sole trader?

A sole trader is an individual running a business in their own name:

- No legal separation between you and the business
- Business income is your personal income
- Reported on your individual [tax return](/tax-return) at year-end
- You are personally liable for business debts
- Simple to register and operate

Working holiday makers registering an ABN to do subcontracting work are sole traders. You quote your ABN on invoices, the client pays you directly, and the income appears on your personal tax return.

## What is a company?

A company (Pty Ltd) is a separate legal entity:

- Has its own ABN
- Has its own tax obligations
- Pays company tax at a flat rate (25% for small companies)
- Owners receive salary or dividends, which they pay personal tax on
- Limited liability protects personal assets

Companies require:

- Registration with ASIC (Australian Securities and Investments Commission)
- Ongoing annual ASIC fees
- Separate financial accounts
- More complex tax returns
- Usually a dedicated accountant
- Director responsibilities and reporting

The administrative overhead is significant.

## Why are almost all working holiday makers sole traders?

For the scale of work most working holiday makers do, sole trader is the right structure:

- You are earning income for services you personally provide
- No employees or complex business operations
- Income is typically under $50,000 per year
- No need for asset protection beyond standard insurance
- No tax benefit from a company structure at this income level

A company makes sense when:

- Multiple owners share the business
- Personal liability is a major concern (some specialist trades)
- Income is high enough that tax savings outweigh running costs (typically $200,000+)
- The business has employees or significant assets

None of these typically apply to working holiday makers.

## How do the tax rates compare?

For a working holiday maker:

- **Sole trader**: 15% on the first $45,000 of business income (working holiday maker rate)
- **Company**: 25% on all business income (flat company tax rate)

At working holiday maker income levels, the sole trader rate is significantly lower. The 15% rate applies until $45,000, then 30% on $45,000-$135,000.

For a working holiday maker earning $30,000 under an ABN:

- As sole trader: $4,500 tax (15%)
- As company: $7,500 tax (25%)

Plus the company would have ongoing ASIC fees (~$300/year) and accounting costs. Sole trader is clearly better.

## What about personal liability?

As a sole trader, your personal assets are at risk if the business incurs debts or causes harm:

- For typical working holiday maker work (cleaning, hospitality, basic trades), this is a minimal risk
- Insurance can cover most liability risks at low cost
- The exposure is usually less than the cost of company maintenance

For working holiday makers doing risky specialist work (electrical, plumbing requiring licensing), a company might offer some protection. But these specialist trades usually require qualifications most working holiday makers do not have.

## How do you register as a sole trader?

The process is simple:

1. [Get in touch with our team](/abn)
2. Send us your details
3. We register your ABN as a sole trader (usually within 24 hours)
4. You start invoicing under your ABN

No ASIC registration is needed for sole traders. The ABN is all you need to operate.

## What about a partnership or trust?

Other business structures exist but are rarely relevant for working holiday makers:

- **Partnership**: two or more sole traders sharing business income; complex tax treatment
- **Trust**: a structure that holds assets/income on behalf of beneficiaries; mainly for asset protection
- **Company**: as described above

For working holiday makers, sole trader is the simple, correct answer in almost all cases. If your situation is unusual (significant capital, multiple business partners), [get in touch with our team](/abn) and we will discuss options.

[Get in touch with our team](/contact) for help registering an ABN, managing GST and BAS, or sorting out your end-of-year tax position correctly.
 `,
 },
 {
 slug: "profit-loss-vs-personal-services-income-australia",
 title:
 "Personal Services Income (PSI) vs business income: ABN rules for working holiday makers",
 description:
 "The ATO distinguishes between personal services income (PSI) and genuine business income. For working holiday makers with an ABN, getting this right affects what deductions you can claim and your tax return.",
 category: "ABN" as const,
 date: "3 September 2025",
 readTime: 5,
 body: `
The ATO distinguishes between two types of business income earned under an ABN: Personal Services Income (PSI) and genuine business profit-and-loss income. The difference matters because PSI rules restrict certain deductions that are otherwise available to businesses. For working holiday makers, almost all ABN income is PSI (because you are paid for your personal skills and labour). This is not a problem - the standard work-related deductions still apply. Our team identifies which rules apply when preparing your [tax return](/tax-return).

## What is Personal Services Income (PSI)?

PSI is income mainly from your own personal skills, effort, or expertise:

- Tradespeople paid for their labour
- Freelancers paid for their work
- Cleaners paid for their cleaning service
- Fruit pickers paid for their picking
- Consultants paid for their advice
- Anyone where the income comes from "you" personally rather than from goods or assets

For a carpenter working under an ABN for a construction company: the payment is for the carpenter's hours and skills. That is PSI.

## What is a profit-and-loss business?

A profit-and-loss business generates income through:

- Production of goods (manufacturing, baking, crafting)
- Use of business assets (rental income, leasing equipment)
- Employing others to do the work
- Selling products sourced from suppliers

The income is not primarily tied to the owner's personal effort. A bakery selling bread, a labour hire company employing pickers, or a rental property business all fall into this category.

## Why does the PSI distinction matter?

The PSI rules restrict certain deductions:

**Available with PSI:**
- Tools and equipment you personally use
- Work-related clothing and uniforms
- Travel between work sites
- Vehicle expenses for genuine business travel
- Self-education directly related to your work
- Phone and internet (work portion)

**NOT available with PSI (or restricted):**
- Salaries paid to associates (e.g., a partner or family member)
- Rent for premises if not strictly required for the work
- Some superannuation contributions for associates
- Certain home office expenses

The rules exist to prevent individuals from reducing tax by structuring personal employment as a "business" with elaborate deductions.

## How is PSI identified?

The ATO uses the **80% rule**: if more than 80% of your income comes from one client, your income is likely PSI. Other tests also apply:

- **Results test**: are you paid for a specific outcome rather than hours worked?
- **Unrelated clients test**: do you have multiple unrelated clients?
- **Employment test**: do you employ others to help with the work?
- **Business premises test**: do you operate from dedicated business premises?

Most working holiday makers fail all of these tests because the work is straightforward labour for one or few clients.

## How does PSI apply to working holiday makers?

For most working holiday makers under an ABN, the income is PSI:

- Farm work paid by piece rate: PSI
- Hospitality contracting: PSI
- Trade work for one main client: PSI
- Cleaning subcontracts: PSI
- Freelance services for occasional clients: PSI

This is normal and not a problem. The standard work-related deductions (tools, uniforms, vehicle use, training) still apply. Just some of the more elaborate business deductions are not available, which is fine because working holiday makers rarely have those types of expenses anyway.

## How does our team handle PSI?

When we prepare your [tax return](/tax-return):

- We assess whether your ABN income is PSI based on the ATO tests
- We apply the correct rules to your deductions
- We maximise all eligible work-related deductions
- We ensure compliance with PSI requirements

What is helpful is describing your work accurately:

- Who your main clients were
- How you were paid (hourly, piece rate, project)
- What equipment you provided
- Whether you employed anyone

[Send us these details](/contact) when we start your return and we will work out the correct treatment.
 `,
 },

 // ─── TAX RETURN ADVANCED - NEW ────────────────────────────────────────────
 {
 slug: "low-income-tax-offset-working-holiday",
 title:
 "What is the low income tax offset and can working holiday makers claim it?",
 description:
 "The low income tax offset can reduce your tax by up to $700 a year. Here is who qualifies, how it is calculated, and how it applies to working holiday visa holders.",
 category: "Tax Return" as const,
 date: "15 September 2025",
 readTime: 4,
 body: `
The Low Income Tax Offset (LITO) is a tax reduction available to individuals with taxable income below set thresholds. The maximum is $700 for taxable income up to $37,500, gradually reducing for incomes between $37,500 and $66,667. Whether working holiday makers can claim LITO depends on specific income and circumstances. Our team assesses every applicable offset when preparing your [tax return](/tax-return), so eligible LITO is applied automatically.

## What is the Low Income Tax Offset?

LITO is a tax-reduction concession built into Australian tax law:

- Reduces the tax payable on a return (not your taxable income)
- Maximum benefit: $700 per year
- Maximum applies to taxable income up to $37,500
- Reduces gradually for income $37,501 to $66,667
- Phases out completely at $66,667 and above
- Non-refundable (reduces tax to zero, no further refund)

The offset is automatic on standard resident tax returns. For working holiday makers, the position is more nuanced.

## How much LITO is available at different income levels?

For the 2025-26 tax year:

- Income up to $37,500: full $700 offset
- Income $37,501 - $45,000: gradually reducing
- Income $45,001 - $66,667: further reduction
- Income above $66,667: no LITO

The exact reduction calculation involves complex thresholds. When we prepare your return, we apply the correct amount based on your specific situation.

## Can working holiday makers claim LITO?

The position depends on:

- Your specific income level
- Your residency status for the financial year
- How the working holiday maker rules interact with the offset
- Whether you had any non-WHM income

This is one of the more complex aspects of working holiday maker tax. Some working holiday makers can claim partial LITO, some cannot. The rules have changed multiple times and continue to evolve.

When we prepare your tax return, we assess LITO eligibility based on your specific circumstances and apply whatever you are entitled to. Lodging without a tax agent often results in eligible offsets being missed.

## What is the difference between an offset and a deduction?

This distinction matters and is often confused:

**Deduction**: reduces your taxable income
- Earn $30,000, claim $1,000 deduction → taxed as if you earned $29,000
- Reduces tax by your marginal rate × deduction (e.g., $150 saved at 15%)

**Offset**: reduces the tax you owe
- Owe $4,500 in tax, $700 offset → pay $3,800
- Reduces tax dollar-for-dollar (the full $700)

Offsets are generally more valuable than deductions of the same dollar amount. A $700 LITO reduces your tax by $700, whereas a $700 deduction only saves $105 (at 15% rate).

## Can LITO be combined with other offsets?

Yes. Multiple offsets can apply to one return:

- LITO: based on total income
- [Small business tax offset](/blog/small-business-tax-offset-working-holiday-abn): for ABN income
- Medicare Levy exemption: for non-Medicare-eligible workers

Each is calculated separately and applied to reduce total tax payable. We apply every relevant offset when preparing your return.

## What happens if LITO would reduce your tax below zero?

LITO is non-refundable:

- If your tax owed is $500 and LITO is $700, your tax becomes $0
- The remaining $200 of LITO is NOT refunded to you
- Your overall refund comes from PAYG tax withheld throughout the year

The refund you receive is calculated as: total tax withheld minus your final tax liability (after offsets). LITO can help reduce the final liability, increasing your refund.

## How do we apply LITO when lodging your return?

Our process:

1. We calculate your total taxable income (wages + ABN income + other)
2. We assess your eligibility for LITO under current rules
3. We calculate the applicable LITO amount
4. We apply it alongside other eligible offsets
5. We show you the impact on your refund before lodging

[Get in touch with our team](/contact) if you want to know whether you qualify for LITO before lodging. We do this calculation for working holiday makers every week.
 `,
 },
 {
 slug: "appealing-ato-decision-australia",
 title: "Can you appeal an ATO decision in Australia?",
 description:
 "If you disagree with an ATO assessment or decision about your tax, you have the right to challenge it. Here is how the appeals process works for working holiday makers.",
 category: "Tax Return" as const,
 date: "20 September 2025",
 readTime: 4,
 body: `
Yes, you can appeal an ATO decision in Australia. If you receive a tax assessment or decision you disagree with, the formal objection process lets you challenge it. You must lodge a written objection within 60 days of the assessment (extensions are possible but harder). Working holiday makers have the same appeal rights as Australian taxpayers. Our team handles ATO objections for working holiday makers, including from overseas after departure.

## When would you appeal an ATO decision?

Common reasons to appeal:

- Tax assessment showing tax owed that you believe is incorrect
- A legitimate deduction was disallowed
- A penalty was applied unfairly
- Your residency status was misclassified
- Income amounts in the assessment do not match your records
- Refund was reduced or denied unexpectedly

Appeals are not for simple errors you made (those need an amendment, not an objection). Appeals are for situations where you disagree with an ATO position on the law or the facts.

## What is the formal objection process?

The first step in any appeal is a formal objection:

1. Written submission identifying the decision being challenged
2. Facts and arguments supporting your position
3. Supporting documentation attached
4. Must be lodged within **60 days** of the original assessment

The ATO reviews and issues a formal response:

- **Allow in full**: your position accepted
- **Allow in part**: partial agreement
- **Disallow**: rejected entirely

Processing typically takes up to 60 business days.

## What happens if your objection is unsuccessful?

If the ATO disallows your objection, escalation options include:

- **Administrative Appeals Tribunal (AAT)**: independent review body
- **Federal Court**: for matters of significant legal complexity
- **Inspector-General of Taxation**: for procedural complaints

For most working holiday makers, AAT review is the practical next step. Federal Court proceedings involve significant cost and are rarely worth pursuing for individual matters.

## Do interest and penalties accumulate during a dispute?

Yes. While the appeal is being decided:

- General Interest Charge (GIC) accrues on disputed amounts
- Penalties may continue
- The ATO may continue collection action unless paused

If your appeal succeeds, the GIC and penalties on the disputed portion may be waived. If it fails, you owe the original amount plus accumulated interest.

We can request deferment of collection while the appeal is pending.

## How do we handle ATO appeals for working holiday makers?

Our process:

1. Review the ATO decision and assess the legal basis for objection
2. Gather supporting documentation
3. Draft and lodge the formal objection within the 60-day window
4. Communicate with the ATO throughout the review
5. Receive the outcome and advise on next steps
6. Escalate to AAT if needed

This works from overseas. We have managed objections for working holiday makers from every continent.

## What should you do if you receive ATO correspondence?

Do not ignore it:

- Read the document carefully
- Note the date of the assessment
- Calculate when the 60-day window closes
- [Get in touch with our team](/contact) immediately if you disagree
- Send us a copy of the document

The 60-day window is strict. Missing it makes objections much harder.

If you are unsure whether the ATO is correct, send the correspondence to us before deciding. Sometimes the ATO is right and the best path is to accept the decision. We help you assess this properly.
 `,
 },
 {
 slug: "amending-tax-return-australia",
 title: "How to amend an Australian tax return after lodgement (working holiday guide)",
 description:
 "Lodged your working holiday tax return and noticed a mistake? You can amend a tax return with the ATO within set timeframes. How to do it, how long it takes, and how it affects your refund.",
 category: "Tax Return" as const,
 date: "22 September 2025",
 readTime: 4,
 body: `
Yes, you can amend a tax return after it has been lodged in Australia. Common reasons to amend: a deduction you forgot to claim, an income figure entered incorrectly, or a relevant offset you missed. The general time limit for amendments is **two years from the date the original assessment was issued**. Our team handles amendments for working holiday makers, including from overseas. Acting proactively to fix errors is much better than waiting for the ATO to identify the issue.

## Can you amend a lodged tax return?

Yes. Australian tax law allows you to request an amendment after a return has been assessed:

- Correct errors
- Add missing income
- Claim deductions you forgot
- Apply offsets you missed (LITO, small business, Medicare Levy exemption)
- Update figures that were entered incorrectly

The amendment process is formal and must be lodged in writing (cannot be done by phone).

## How long do you have to amend?

The standard time limits:

- **Individuals and small businesses**: 2 years from the date of original assessment
- **Other taxpayers**: 4 years
- **Fraud or evasion cases**: no time limit (ATO can amend any time)

For working holiday makers, the 2-year window means you have until two years after lodgment to make corrections. After that, amendments require special application and are harder to get approved.

## How do you lodge an amendment?

The process through our team:

1. [Get in touch](/contact) with the issue identified
2. Send us the original return and the correction needed
3. We prepare the amendment with supporting documentation
4. We lodge the amendment on your behalf
5. The ATO processes (usually a few weeks to a couple of months)
6. Any additional refund is paid to your nominated account

If you originally lodged through our team, we have your records and the amendment is straightforward. If you lodged elsewhere, we can still handle the amendment but need a copy of your original return.

## What happens to your refund during an amendment?

The outcome depends on whether the amendment increases or decreases the refund:

**If the amendment increases your refund:**
- The additional amount is paid to your bank account
- Processing takes a few weeks to a couple of months
- You receive the original refund plus the additional amount

**If the amendment reduces your refund:**
- The ATO issues a revised assessment
- You owe the difference back
- Usually due within 21 days of the revised assessment
- We can arrange a payment plan if needed

## Can the ATO amend your return?

Yes. The ATO can also initiate amendments:

- Time limit: 2 years for standard cases
- No time limit for fraud or evasion
- Notifies you of the amendment via assessment notice

If the ATO amends your return and you disagree, you can lodge an objection through the formal appeal process. See our article on [appealing ATO decisions](/blog/appealing-ato-decision-australia).

## What if you have already left Australia?

Amendments can be lodged from anywhere in the world:

- Our team manages the process remotely
- Your Australian bank account receives any additional refund
- The 2-year window still applies regardless of where you are

If you closed your Australian bank account, [send us your overseas account details](/contact) and we will arrange alternative payment.

## Common amendments we lodge for working holiday makers

Frequently corrected items:

- Medicare Levy exemption not claimed
- Work-related deductions overlooked (uniforms, tools, training courses)
- ABN income misreported or missed
- Tax withheld figures incorrect (employer reporting errors)
- Foreign income that should have been excluded
- Wrong residency status applied

Most amendments result in a larger refund. Self-lodgers miss eligible deductions and offsets that we routinely catch. If you lodged yourself and want a second opinion, [send us your previous return](/contact) and we will review it for free.
 `,
 },
 {
 slug: "ato-payment-plan-tax-debt-australia",
 title: "What to do if you cannot pay your tax bill in Australia",
 description:
 "Received a tax bill you cannot pay in full? The ATO offers payment arrangements for people who need more time. Here is how it works for working holiday makers.",
 category: "Tax Return" as const,
 date: "30 September 2025",
 readTime: 4,
 body: `
If you cannot pay your Australian tax bill in full by the due date, you can arrange a payment plan with the ATO to pay in instalments over time. Interest applies (at the General Interest Charge rate, currently around 11%), but this is much better than ignoring the debt, which leads to higher penalties and collection action. Our team helps working holiday makers arrange ATO payment plans, even after leaving Australia. Tax debts do not disappear when you leave the country.

## What is an ATO payment arrangement?

A payment arrangement is a formal agreement to pay a tax debt in instalments rather than as a single lump sum:

- You nominate weekly or fortnightly amounts you can afford
- The total debt must usually be cleared within 2 years
- Interest accrues on the outstanding balance
- The arrangement protects you from active collection action

The ATO generally accepts payment plans when:

- The debt is reasonable in size
- You demonstrate genuine inability to pay in full
- You have a stable income source
- You have not previously defaulted on arrangements

## When is your tax due?

Tax debts have specific due dates:

- **Tax owed from your return (lodged through a tax agent)**: usually 21 November
- **Self-lodged**: by the date shown on your assessment notice
- **Quarterly BAS obligations**: by the quarterly due dates
- **Late lodgment penalty starts**: 28 days after the lodgment due date

After the due date, the General Interest Charge starts compounding daily on unpaid amounts.

## How do you set up a payment arrangement?

Through our team:

1. [Get in touch](/contact) with details of your tax debt
2. We assess the amount and your ability to pay
3. We negotiate the payment plan with the ATO on your behalf
4. We confirm the schedule with you
5. The arrangement is set up and your payments begin

Through our service, we structure the arrangement to fit your specific situation:

- Weekly or fortnightly instalments
- Direct debit from your bank account
- Reasonable total period (usually 12-24 months)

We typically negotiate better terms than self-applicants because we understand what the ATO will accept.

## What if you leave Australia with an outstanding debt?

Tax debts do **not** disappear when you leave:

- The ATO can pursue debts internationally
- Significant outstanding amounts may affect future Australian visa applications
- The ATO can take action against any Australian assets you hold
- Bank accounts and investments remain accessible to the ATO

If you are planning to leave with a debt:

- Set up the payment plan before departure (much easier than from overseas)
- Use direct debit from your Australian bank account
- Keep that account open until the debt is cleared
- Have our team manage communications after you leave

## What penalties apply if you ignore a tax debt?

The ATO has multiple penalties for non-payment:

- **General Interest Charge (GIC)**: currently around 11% per year, compounding daily
- **Failure-to-lodge penalty**: $330 per 28 days late, up to $1,650 maximum
- **Tax Debt Disclosure**: large debts may be disclosed to credit reporting agencies
- **Director penalty notices** (for company tax debts)
- **Garnishee orders**: ATO can direct your employer to deduct tax from your wages

These penalties can sometimes be reduced or waived if you act early and demonstrate genuine hardship. Doing nothing always makes the situation worse.

## What is the most important thing to do?

Act early. The ATO is more flexible when you approach them proactively than when they have to chase you. Specifically:

1. Do not ignore an ATO bill
2. [Get in touch with our team](/contact) before the due date if you cannot pay
3. We can negotiate a payment plan
4. We can apply for penalty remission in some cases
5. We can arrange to defer collection if an appeal is pending

The worst outcome is silence followed by collection action. The best outcome is a structured plan that works within your budget.

## Can we apply for penalty remission?

Yes, in certain circumstances:

- First-time errors
- Genuine misunderstanding of obligations
- Serious illness or other extraordinary circumstances
- Substantial compliance with subsequent obligations

We apply for penalty remission when warranted. Even if not all penalties are removed, partial remission is often achievable.

[Get in touch with our team](/contact) as soon as you become aware of a tax debt. The earlier we act, the better the outcome.
 `,
 },

 // ─── WORK RIGHTS - BATCH 2 ─────────────────────────────────────────────────
 {
 slug: "piece-rates-farm-work-working-holiday",
 title:
 "Piece rates in farm work: pay rules for working holiday makers in Australia",
 description:
 "Piece rates are common in fruit picking and harvest work in Australia. How piece-rate pay works, the 2022 minimum-wage floor change, and what working holiday makers can do if underpaid.",
 category: "Work Rights" as const,
 date: "1 October 2025",
 readTime: 5,
 body: `
Piece rates are a payment system common in Australian farm work where you are paid per unit harvested (per kilogram, per bin, per tray) rather than per hour. Piece rates are legal under the Horticulture Award, but Australian law requires the resulting hourly rate to be at least the casual minimum wage ($31.19/hour from 1 July 2025). If your piece rate earnings fall below this for any hour, your employer must top up your pay to the minimum. Many working holiday makers in farm work are underpaid because employers fail to apply the top-up rule. Our team can review your records and recover what you are owed.

## What is a piece rate?

A piece rate pays you per unit of work, not per hour:

- Per kilogram of strawberries picked
- Per bin of apples filled
- Per tray of blueberries harvested
- Per row of crops weeded
- Per item packed

Piece rates are designed to reward productivity. Experienced pickers can earn significantly more than the hourly minimum. New pickers learning the technique often earn less initially.

## Is there a minimum wage guarantee with piece rates?

**Yes**. This is the most critical rule to understand:

- Piece rate workers must earn at least the casual minimum hourly rate
- For 2025-26, that minimum is $31.19/hour (national minimum + 25% casual loading)
- The minimum is calculated per pay period
- If your effective hourly rate falls below $31.19, the employer must top up

This rule applies to all piece rate work in Australia. It is not optional.

## How does the top-up calculation work?

At the end of each pay period:

1. Total piece rate earnings calculated
2. Total hours worked calculated
3. Earnings divided by hours = effective hourly rate
4. If below $31.19/hour, employer must top up

Example: $400 in piece rates over 20 hours = $20/hour effective. Below minimum. Employer must top up by $223.80 ($31.19 × 20 = $623.80 - $400) to reach the legal minimum.

If your employer is not applying this top-up, they are in breach of the Fair Work Act.

## What practices should you watch out for?

Common problems in farm work:

- **Undercounting**: weighing or counting your picking lower than actual
- **Unpaid sorting time**: making you sort or pack alongside picking without pay
- **Excessive deductions**: charging for accommodation, transport, or meals bringing pay below minimum
- **No top-up applied**: paying only the piece rate without the hourly minimum check
- **Pressure not to claim**: discouraging workers from raising concerns

Keep records of:

- Hours worked (start, finish, breaks)
- Pieces picked or tally tickets
- Weights or volumes recorded
- Deductions taken

## What should you do if you suspect underpayment?

To recover unpaid wages:

1. Calculate your earnings per pay period divided by hours worked
2. Compare against $31.19/hour (casual minimum for 2025-26)
3. Identify the shortfall
4. Raise the issue with your employer with evidence
5. If unresolved, [get in touch with our team](/contact)

Our team helps working holiday makers recover unpaid farm wages through the right channels. We have seen many cases where the top-up rule was ignored and significant amounts were recovered.

## What about tax and super on piece rate income?

Piece rate income is treated like any other employment income:

- PAYG tax withheld at 15% (with TFN on file)
- Super paid at 12% on top of gross earnings
- Reported in your annual income statement
- Included in your [tax return](/tax-return)

If you are working as an employee (not under an [ABN](/abn)), all of this should appear on your payslips. If anything is missing or incorrect, [send us your payslips](/contact) and we will check.
 `,
 },
 {
 slug: "labour-hire-agencies-working-holiday-australia",
 title:
 "Labour hire agencies for working holiday makers in Australia: rights & risks",
 description:
 "Labour hire agencies are a popular way to find work quickly in Australia, especially for farm work and construction. How they work, your rights as a labour-hire worker, and warning signs to avoid.",
 category: "Work Rights" as const,
 date: "6 October 2025",
 readTime: 5,
 body: `
Labour hire agencies are companies that recruit workers and place them with client businesses for a fee. For working holiday makers, they offer fast access to casual work in agriculture, hospitality, warehousing, construction, and manufacturing. When you register with an agency, you become an employee of the agency (not of the business you work for). Reputable agencies handle your tax and super correctly; less reputable ones may underpay or apply excessive deductions. Our team can check your payslips from any agency to make sure tax and super are being paid correctly.

## How does labour hire work?

When you register with a labour hire agency:

- You become an employee **of the agency**, not the client business
- The agency provides workers to client businesses for a fee
- You work at the client's location but are paid by the agency
- The agency manages your tax, super, and payroll

This means your payslip comes from the agency, not from the business where you actually work. The agency is your legal employer for all employment law purposes.

## What are the advantages?

For working holiday makers, the main advantages are:

- **Speed**: agencies often place workers within days of registration
- **Variety**: multiple clients across different industries
- **Paperwork handled**: tax and super managed by the agency
- **Useful for travellers**: easy to move between locations
- **Lower barrier to entry**: less interview process than direct hiring

If you need work urgently or have just arrived in a new area, an agency can get you working quickly.

## What are the risks of labour hire?

Quality varies significantly between agencies:

- **Reputable agencies**: pay correctly, comply with employment law, treat workers fairly
- **Less reputable agencies**: underpay, misclassify, apply excessive deductions

Common problems with poor-quality agencies:

- Charging for accommodation and transport at rates that bring effective pay below minimum wage (illegal)
- Misclassifying employees as contractors to avoid super and entitlements
- Failing to pay correct penalty rates
- Not providing payslips
- Withholding wages until "completion" of a placement

Before registering, check whether the agency is licensed. Several Australian states (Victoria, Queensland, South Australia, ACT) require labour hire agencies to hold a licence. Operating without one is illegal in those states.

## What are your rights as a labour hire worker?

The same rights apply whether you work directly for a business or through an agency:

- Minimum casual rate for your industry ($31.19/hour for 2025-26)
- Payslips within 24 hours of each pay
- Superannuation at 12% of gross earnings (from 1 July 2025)
- Safe working environment
- Penalty rates for weekend, public holiday, and overtime work
- Clear written terms before starting

If an agency tries to tell you that "different rules apply" because they are a labour hire company, that is incorrect. Standard Australian employment law applies fully.

## How do tax and super work through an agency?

As an employee of the agency:

- Provide your TFN and complete a Tax File Number Declaration form (selecting Working Holiday Maker)
- The agency withholds 15% PAYG tax
- The agency pays 12% super into your nominated fund
- Your income appears under the agency's name in your ATO records

Check your payslips to confirm:

- Tax withheld is approximately 15%
- Super line item shows 12% of gross
- Hours and rate match what you worked
- Your TFN is on file

If something looks wrong, [send us your payslips](/contact) and we will check the treatment.

## What if you suspect underpayment?

If you suspect the agency is underpaying you:

1. Keep all payslips and any agreement documents
2. Note your hours, rates, and any deductions taken
3. Calculate your effective hourly rate (total earnings ÷ total hours)
4. Compare against the minimum for your industry
5. [Get in touch with our team](/contact) for help recovering what you are owed

Our team has helped working holiday makers recover unpaid wages and super from agency arrangements. The same protections apply as for direct employment, and the agency cannot use your visa status against you for raising a complaint.

## How can you tell if an agency is reputable?

Signs of a reputable agency:

- Licensed in the relevant state
- Pays into a known super fund
- Provides clear, written terms before placement
- Issues professional payslips with all required information
- Has a long track record (look for online reviews)
- Pays on time consistently

If an agency seems evasive about basic details, that is a warning sign.
 `,
 },
 {
 slug: "how-to-read-a-payslip-australia-working-holiday",
 title: "How to read an Australian payslip: working holiday maker guide (2025-26)",
 description:
 "Your payslip contains everything you need to know about whether you are being paid correctly. What each section means - gross pay, PAYG, super, leave - and what working holiday makers should check every pay cycle.",
 category: "Work Rights" as const,
 date: "9 October 2025",
 readTime: 5,
 body: `
Every Australian payslip should show: gross pay, tax withheld (15% for working holiday makers with TFN on file), super contribution (12% paid on top of gross from 1 July 2025), and net pay (what lands in your bank). Australian employers are legally required to issue a payslip within 24 hours of paying your wages. Knowing how to read a payslip means you can spot errors early. Save every payslip in case you need them for your tax return or super claim. Our team can review your payslips if anything looks wrong.

## Why do payslips matter for working holiday makers?

Working holiday makers have specific tax and super rules:

- 15% tax rate (different from residents)
- Super at 12% (same as residents from 1 July 2025)
- Working Holiday Maker designation on your tax return
- Medicare Levy exemption when claiming

Your payslip is the evidence that your employer is applying these rules correctly. If they are not, the consequences include underpaid super, incorrect tax withholding, and tax return complications.

**Save every payslip.** Email them to yourself or save to cloud storage. You will need them for:

- Your annual [tax return](/tax-return)
- Your DASP super withdrawal claim
- Recovering any unpaid super
- Resolving disputes with employers

## What does gross pay show?

Gross pay is your total earnings before any deductions:

- Hours worked × hourly rate
- Plus penalty rates (weekend, public holiday, overtime)
- Plus allowances (uniform, tool, travel)
- Plus any bonuses or commissions

Example: 38 hours × $30/hour = $1,140 gross pay

Check this figure first. If hours or rate are wrong, everything else will be wrong too.

## What does PAYG tax withholding show?

PAYG = Pay As You Go. The tax your employer withholds and sends to the ATO:

- For working holiday makers with TFN on file: 15% of gross pay
- Should be approximately 15% of your gross figure
- Higher (30% or 45%) → form was completed incorrectly

Common reasons for incorrect withholding:

- Tax File Number Declaration form not yet processed (45%)
- Employer not registered as working holiday maker employer (30%)
- Wrong residency status selected on the form
- Tax-free threshold incorrectly claimed (too little withheld → future debt)

If your rate looks wrong, [get in touch with our team](/contact) and we will check.

## What does superannuation show?

Super should appear as a separate line item on your payslip:

- **12% of gross earnings** (from 1 July 2025)
- Paid **on top of** your wages, not deducted
- Paid into your nominated super fund
- Does not reduce your net pay

If super does not appear or the amount is below 12%, raise it with your employer. Common issues:

- No super at all (illegal for all employees)
- Calculated below 12% (employer using old rate)
- Paid quarterly rather than monthly (legal but means it appears in your fund 3 months later)
- Wrong fund nominated (super going somewhere you cannot access)

## What does net pay show?

Net pay = gross pay − tax withheld:

- This is what arrives in your bank account
- Super does NOT reduce net pay (it is paid separately)
- Should match what was deposited

Example: $1,140 gross − $171 tax (15%) = $969 net pay

## What about Year to Date (YTD) figures?

Most payslips include cumulative YTD figures:

- YTD gross pay (total earnings this financial year)
- YTD tax withheld
- YTD super (if shown)

Useful for:

- Tracking your annual income
- Estimating your tax return outcome
- Checking against your final income statement

## What should you check every pay cycle?

A quick payslip checklist:

- ✓ Hours worked match what you actually worked
- ✓ Hourly rate matches what was agreed
- ✓ Gross pay = hours × rate (plus any extras)
- ✓ Tax withheld is approximately 15%
- ✓ Super appears at 12% of gross
- ✓ Your name spelled correctly
- ✓ Your TFN appears on the payslip
- ✓ Net pay matches what was deposited

If anything looks wrong, address it immediately rather than waiting until tax time. Errors compound over time and become harder to fix later.

## What if you do not receive payslips?

Australian law requires payslips to be issued within 24 hours of each pay:

- No payslip = your employer is breaching the law
- Other entitlements may also be at risk
- Keep your own records as evidence
- [Get in touch with our team](/contact) for help

This is one of the strongest signs of an unreliable employer. Take the records you do have and get advice on next steps.
 `,
 },
 {
 slug: "wage-theft-working-holiday-australia",
 title:
 "Wage theft in Australia: recovery guide for working holiday makers",
 description:
 "Wage theft is unfortunately common in industries popular with backpackers. How to recognise underpayment, calculate what you are owed, and recover wages through Fair Work Ombudsman as a working holiday maker.",
 category: "Work Rights" as const,
 date: "12 October 2025",
 readTime: 5,
 body: `
Wage theft (being paid less than you are legally entitled to) is unfortunately common in industries popular with working holiday makers: hospitality, agriculture, cleaning, retail. Common forms include underpayment of minimum wage, missing penalty rates, unpaid super, excessive deductions, and unpaid trial shifts. The fix is to keep good records, raise the issue with your employer, and if unresolved, escalate through formal channels. Our team helps working holiday makers recover unpaid wages and super every week. Your visa is protected when raising legitimate workplace complaints.

## What counts as wage theft?

Wage theft includes many specific practices:

- **Below minimum wage**: paid less than the minimum casual rate ($31.19/hour for 2025-26)
- **Missing penalty rates**: weekend, public holiday, or overtime work paid at base rate
- **Unpaid super**: 12% super not being paid (or paid at lower rate)
- **Excessive deductions**: accommodation/transport charges that bring effective pay below minimum
- **Unpaid trial shifts**: working for free as a "trial" beyond the legally allowed unpaid time
- **Misclassification**: treating you as a contractor (under ABN) to avoid super and entitlements
- **Withheld wages**: pay not released for "completion" of placement
- **Off-the-books work**: cash payments with no payslip and no super

Some employers do these things deliberately; others through error. The result for you is the same: you are not receiving what you are legally owed.

## How do you recognise wage theft?

The simplest checks:

1. **Divide your pay by your hours**: if below the minimum casual rate, you are underpaid
2. **Check your super fund**: if no contributions appear after a quarter of work, super is not being paid
3. **Review penalty rates**: weekend and public holiday hours should pay 1.25x to 2.25x
4. **Compare deductions**: accommodation should be reasonable and disclosed in writing

For most working holiday makers in standard roles:

- 2025-26 minimum casual: $31.19/hour
- Sunday penalty (hospitality): around $54/hour
- Public holiday rate: around $70/hour
- Super: 12% of gross wages on top

If your numbers fall significantly below these, investigate further.

## What practical steps can you take?

When you suspect wage theft:

1. **Document everything**: payslips, rosters, communication with employer
2. **Calculate the shortfall**: compare what was paid against what was owed
3. **Raise it with your employer first**: calmly, with evidence
4. **If unresolved, escalate**: through formal channels
5. **Keep working** (if safe): continued employment makes claims stronger
6. **[Get in touch with our team](/contact)** for help building the claim

Underpayment can sometimes be resolved by employers correcting genuine errors. Where it cannot be resolved internally, formal complaint channels exist.

## What about unpaid super specifically?

Unpaid super is a specific category we handle frequently:

- 12% should appear in your fund within a quarter of being earned
- Quarterly deadlines: 28 Oct, 28 Jan, 28 Apr, 28 Jul
- If contributions never appear, your employer is in breach
- Recovery is through the Superannuation Guarantee Charge (SGC) process

We have helped working holiday makers recover thousands in unpaid super. The SGC system protects workers even when employers fail to pay. See our article on [the Superannuation Guarantee Charge](/blog/what-is-superannuation-guarantee-charge) for more.

## Will it affect your visa?

**No.** Reporting an employer for underpayment will not affect your working holiday visa:

- The Workplace Justice Visa provision protects temporary visa holders
- Your visa status cannot be used against you for legitimate complaints
- Immigration status is protected when raising workplace concerns in good faith
- Reporting does not affect future visa applications

The Australian government specifically created these protections to encourage underpaid workers to come forward. Many working holiday makers have raised complaints without any visa consequences.

## What records should you keep?

The strength of any wage theft claim depends on records:

- **Every payslip** received (save digital copies)
- **Your roster** showing scheduled hours
- **Your own diary** of actual hours worked
- **Any employment contract or letter of offer**
- **Communications** about pay or schedule (texts, emails)
- **Super fund statements** showing what was contributed
- **Bank statements** showing what was deposited

The more complete the records, the easier the recovery. Without records, the dispute becomes your word against the employer's. Photograph or scan everything as you receive it.

## How does our team help?

Our process for wage theft cases:

1. We review your records and calculate the shortfall
2. We identify the right channel for recovery (Fair Work, ATO for super, small claims)
3. We help prepare the formal complaint
4. We monitor the process and follow up
5. We make sure any tax implications of recovered amounts are handled correctly

If you have concerns about underpayment, [get in touch](/contact). Even if you have already left Australia, recovery is still possible.
 `,
 },

 // ─── TAX - BATCH 2 ─────────────────────────────────────────────────────────
 {
 slug: "backpacker-tax-history-australia",
 title: "The backpacker tax in Australia: what it is and how it has changed",
 description:
 "The backpacker tax has been one of the most debated tax policies in Australia. Here is the history, what rate applies today, and what it means for your working holiday.",
 category: "Tax Return" as const,
 date: "14 October 2025",
 readTime: 6,
 body: `
The "backpacker tax" is the informal name for the tax regime applied to working holiday visa holders (subclass 417 and 462). Currently, working holiday makers pay a flat 15% on the first $45,000 of income earned each financial year. The rate was introduced in 2017 after significant controversy and a major legal challenge by the UK in 2019. Our team handles tax returns for working holiday makers and applies the correct rate based on your specific circumstances.

## What is the current backpacker tax rate?

For working holiday visa holders (subclass 417 and 462):

- **15% on the first $45,000** of income
- **30% on income from $45,001 to $135,000**
- **37% on income from $135,001 to $190,000**
- **45% on income above $190,000**

In practice, the vast majority of working holiday makers earn below $45,000 in a single financial year, so the 15% rate is the one that applies to most.

There is no tax-free threshold for working holiday makers. The 15% rate applies from the very first dollar earned.

## What was the situation before 2017?

Before 1 January 2017, the tax treatment of working holiday makers depended on residency:

- **Tax resident**: standard progressive rates ($18,200 tax-free, then 19%, 32.5%, etc.)
- **Non-resident**: 32.5% from the first dollar of income

Many working holiday makers qualified as tax residents under the standard rules (extended stays, established residence patterns), which meant they paid little tax on lower incomes. The government considered this an unintended outcome and proposed reform.

## How did the 2017 changes happen?

In 2016, the government proposed a flat 32.5% tax on all working holiday maker income from the first dollar, treating all backpackers as non-residents regardless of their actual circumstances.

The proposal triggered massive industry backlash:

- Agricultural sector relies heavily on working holiday labour during harvest
- Farming groups warned of devastating impact on regional economies
- Tourism industry was concerned about deterring backpackers
- Working holiday maker numbers had already been falling

After extensive lobbying, the government compromised on a flat 15% rate effective 1 January 2017. The compromise also included:

- 65% DASP withholding tax on super for working holiday makers (up from 35%)
- The lower 35% DASP rate retained for student visa holders
- Specific provisions for treating working holiday maker income separately from residency rules

## What was the UK legal challenge in 2019?

In 2019, the backpacker tax faced a significant legal challenge:

- UK citizens on working holiday visas argued the rate was discriminatory
- The argument: applying a higher rate to British citizens than to comparable Australian residents violated the UK-Australia tax treaty
- The Full Federal Court of Australia ruled in favour of the UK claimants

This was a major decision because:

- It established that treaty non-discrimination protections applied to working holiday makers
- It raised questions about other treaty countries (Germany, Sweden, etc.)
- It forced the Australian government to reconsider the tax framework

The Australian government subsequently amended the legislation to address the court's ruling, and the current regime was put in place with specific provisions intended to comply with treaty obligations.

## What rate applies today?

The current 15% rate applies to working holiday makers regardless of passport nationality in most cases. Some specific nuances apply for certain treaty countries, but the rate is generally consistent:

- 15% applies from the first dollar of working holiday maker income
- No tax-free threshold
- Higher rates apply above $45,000 in line with the foreign resident scale
- Both subclass 417 and 462 visas are treated the same

## What does this mean for your tax return?

At year-end, when your employer's PAYG withholding at 15% is reconciled against your actual tax owed:

- Most working holiday makers receive a small refund (deductions and offsets reduce final liability)
- Some receive a larger refund (periods without TFN, wrong rate applied, etc.)
- Few owe additional tax (mainly if tax-free threshold was wrongly claimed)

The average tax refund for working holiday makers we lodge for is around $1,000 to $3,000. The exact amount depends on income, deductions, and individual circumstances.

## What about super withdrawal tax?

The 2017 changes also affected super withdrawal:

- DASP rate for working holiday makers increased to **65%** of the taxable component
- This was retained even after the UK legal challenge
- Most working holiday makers we help still consider DASP worthwhile because the net amount is meaningful

See our article on [tax on super withdrawal](/blog/tax-on-super-withdrawal-backpacker) for more.

## How does our team help with backpacker tax?

When you lodge through our service:

- We apply the 15% rate correctly to your income
- We identify all eligible deductions and offsets
- We claim the Medicare Levy exemption if applicable
- We handle any complications from periods with the wrong rate applied

[Get in touch with our team](/contact) to lodge your return correctly under the current backpacker tax regime.
 `,
 },
 {
 slug: "how-to-check-super-balance-working-holiday",
 title:
 "How to check your super balance in Australia: working holiday maker guide",
 description:
 "Knowing how much super you have accumulated matters - especially before leaving Australia. How working holiday makers can track their balance through myGov, super fund apps, and confirm employer contributions.",
 category: "Super" as const,
 date: "16 October 2025",
 readTime: 4,
 body: `
To check your superannuation balance as a working holiday maker, log into your super fund's online member portal using your member number and password. Your fund sends you these details when your account is opened. Super is paid quarterly by employers, so contributions appear in your fund within a few days of the quarterly deadlines (28 January, 28 April, 28 July, 28 October). If you have super across multiple funds or cannot find your account details, our team can locate every account associated with your TFN.

## Why does checking your super balance matter?

Super accumulates in a separate account that does not appear on your bank statements:

- It is paid by your employer on top of your wages
- It goes directly into your super fund
- Easy to forget about or lose track of
- Critical to know before you leave Australia

If you do not check, you may miss:

- Missing or underpaid contributions
- Multiple accounts across different funds
- Significant total balances you can withdraw before leaving

Most working holiday makers we help have accumulated more super than they realised - often several thousand dollars from a year of work.

## How is super paid by employers?

Australian employers pay super on a quarterly schedule:

- **Q1 (July-September)**: due by 28 October
- **Q2 (October-December)**: due by 28 January
- **Q3 (January-March)**: due by 28 April
- **Q4 (April-June)**: due by 28 July

Contributions appear in your fund within a few days of these dates. If a quarter has passed and nothing has appeared, your employer may not be paying what they owe.

## How do you access your super fund account?

When you started work, your employer asked for your super fund details:

- If you nominated a fund, contributions went there
- If you did not, an account was opened with the employer's default fund

Your fund sends member details when your account is opened:

- Member number
- Password or login details
- Welcome documents with account information
- Usually by email; sometimes by post

If you cannot find these details:

- Search your email for the fund's name (HostPlus, REST, AustralianSuper, etc.)
- Check your payslip for the fund name and number
- [Get in touch with our team](/contact) and we will locate the account

## How can you check your balance online?

Once you have your login:

1. Go to your super fund's website
2. Log in using your member number
3. View your current balance
4. Review contribution history (each employer contribution should be listed)
5. Check the dates contributions appeared

You can see exactly what each employer paid and when. This is critical for identifying missing or underpaid contributions.

## What if you do not know which fund you are with?

Common for working holiday makers who have changed jobs:

- Multiple employers may have opened different default funds
- Old super may have been transferred to the ATO as unclaimed money
- You may have super you did not know existed

Our team can locate every super account associated with your TFN:

- Search across all major Australian super funds
- Check ATO records for unclaimed super
- Identify every balance you can claim through DASP

[Send us your details](/superannuation) and we will run a comprehensive search. This is part of our standard DASP service.

## How can you check for unpaid super?

If contributions are missing from your fund:

1. Check the quarterly schedule (above) to confirm the timing is right
2. Compare against the super line item on your payslips
3. Raise the issue with your employer first
4. If unresolved, [get in touch with our team](/contact)

Our team can pursue unpaid super through the Superannuation Guarantee Charge (SGC) process. We have recovered significant unpaid super for working holiday makers, especially in hospitality and agriculture industries.

## What should you check before applying for DASP?

Before submitting your [DASP super withdrawal](/blog/what-is-dasp-super-withdrawal):

- Confirm all expected contributions have appeared
- Make sure the final quarter has been paid (if you left after a quarter's end)
- Locate any accounts you may have lost track of
- Recover any unpaid super before lodging DASP

We run this check as part of every DASP application we lodge. It ensures no money is left behind.

## What records help us check your super?

To help locate every account:

- Your TFN
- List of all Australian employers you worked for
- Approximate employment dates
- Any super fund letters or emails you remember
- Payslips showing super line items

Even with partial information, we can usually locate every account through the ATO records linked to your TFN.
 `,
 },

// ─── NEW POSTS - BATCH (27 articles) ─────────────────────────────────────

// ─── TFN ──────────────────────────────────────────────────────────────────
 {
 slug: "tfn-application-rejected",
 title: "TFN application rejected? What working holiday makers should do",
 description:
   "TFN applications can be rejected for visa mismatches, identity issues, or incorrect details. Common reasons working holiday makers get rejected and how to reapply successfully.",
 category: "TFN",
 date: "18 October 2025",
 readTime: 4,
 body: `
A Tax File Number (TFN) application can be rejected when the details on the application do not match the records held by the Department of Home Affairs or when identity verification fails. The most common causes are a passport number that does not match the one linked to your visa, an incorrect date of birth, or a name spelled differently to your passport. Until a valid TFN is issued, your employer must withhold tax at 45% instead of the 15% working holiday maker rate.

A rejection is not the end of the process. The application can be re-submitted once the issue is identified, and any tax overpaid in the meantime is recovered when your [tax return](/tax-return) is lodged at the end of the financial year.

## Why do TFN applications get rejected?

The ATO rejects applications when the identity details cannot be matched to a valid visa record. The most frequent reasons are:

- Passport number on the application does not match the one used for the visa grant
- Date of birth does not match Home Affairs records
- Name spelled differently to the passport (middle names, hyphens, accents)
- Visa has not yet been activated by entering Australia
- Previous TFN already exists from an earlier visa and the system flags a duplicate

The ATO does not always explain which field caused the rejection, which makes resolving it on your own difficult.

## What happens to your tax while you wait?

Every week without a valid TFN, your employer withholds tax at 45% instead of 15%. On a $1,000 weekly wage that is an extra $300 held back. The money is not lost, but it sits with the ATO until your tax return is lodged, sometimes a year or more later.

The faster a rejected application is resolved, the less of your wage gets locked up in over-withholding.

## How does our team handle a rejected TFN application?

When a TFN application we have lodged is rejected, our team:

- Contacts the ATO directly to identify the exact field that caused the rejection
- Cross-checks the details against your passport and visa grant notice
- Corrects the application and re-lodges it through our tax agent channel
- Tracks the new application to issuance and confirms the TFN with you

Tax agents have direct lines into the ATO that are not available to the public, which means rejections are resolved in days rather than the weeks it can take through general enquiry channels.

## How do you protect your TFN once it is issued?

Once your TFN is issued, treat it like a bank account number. Never share your TFN or passport details with anyone who is not a registered tax agent. People posing as accountants or "tax helpers" on social media and backpacker forums regularly steal TFNs and lodge fraudulent tax returns in someone else's name, sending the refund to their own bank account.

A registered tax agent has a TAN (Tax Agent Number) listed on the Tax Practitioners Board register. If you cannot verify the number, do not hand over your details. [Get in touch with our team](/contact) to lodge through a registered agent and keep your identity protected.
 `,
 },
 {
 slug: "tfn-identity-documents-required",
 title: "TFN application: which identity documents do working holiday makers need?",
 description:
   "A TFN application requires specific identity documents: your passport, working holiday visa grant notice, and an Australian address. Full list of what is accepted and common pitfalls to avoid.",
 category: "TFN",
 date: "22 October 2025",
 readTime: 4,
 body: `
A Tax File Number (TFN) application for a working holiday maker requires a valid passport, the visa grant notice for a subclass 417 or 462 visa, and an Australian residential address where the TFN letter can be delivered. The application also requires your full legal name exactly as it appears on your passport, your date of birth, and your country of citizenship.

Missing or mismatched documents are the leading cause of TFN application rejections, and a rejected application means weeks of tax withheld at 45% instead of 15%.

## What documents are required?

For a working holiday maker TFN application, the ATO needs:

- Valid passport (the same one used to enter Australia on your current visa)
- Visa grant notice or visa label confirming subclass 417 or 462
- Australian residential address (the TFN letter is posted here)
- Date of arrival in Australia on the current visa
- Country of citizenship and country of birth

The application also requires an email address and an Australian or international phone number for contact.

## What counts as a valid Australian address?

The Australian address can be any address where mail can be received reliably. This includes:

- A rental property or share house
- A hostel or short-term accommodation (with permission to receive mail)
- A friend or relative's address
- A workplace address (with employer permission)

The TFN letter is sent by post and cannot be redirected easily once issued. If you move before the letter arrives, [our team can update the address](/blog/how-to-update-address-with-ato) with the ATO on your behalf.

## What if your name on your passport contains special characters?

Names with hyphens, accents, apostrophes, or multiple middle names cause more rejections than any other identity issue. The TFN application must match the name on the visa grant character for character. If your passport reads "François Müller" and the application is submitted as "Francois Muller", the ATO may reject it as a mismatch.

When we lodge a TFN application through our service, we cross-check your name against your visa grant and passport before submission to prevent the mismatch.

## Why use our service instead of applying yourself?

The public TFN application form does not warn you about mismatches before submission. A wrong character, an out-of-date passport number, or an incorrect arrival date is only caught after the ATO rejects the application, weeks later. Our team verifies every detail against your passport and visa grant before lodgement, and we lodge through a tax agent channel that processes applications faster than the public route.

## What about TFN security?

Never share copies of your passport, visa grant, or TFN with anyone who is not a registered tax agent. Scammers regularly pose as "accountants" or "tax helpers" on backpacker forums, social media, and messaging apps to collect identity documents. Once they have your TFN and passport details, they can lodge a fraudulent tax return in your name and divert the refund to their own account. A registered tax agent is listed on the Tax Practitioners Board register with a TAN number. If you cannot verify the number, do not share your documents. [Apply for your TFN](/tfn-form) under the supervision of a registered tax agent to keep your identity protected.

[Get in touch with our team](/contact) to apply for your TFN under the supervision of a registered tax agent or to fix any issues with an existing application.
 `,
 },
 {
 slug: "tfn-security-protect-from-fraud",
 title: "TFN security: protecting your Tax File Number from fraud in Australia",
 description:
   "Your TFN is one of the most valuable pieces of personal information in Australia. How working holiday makers can keep it safe, what to do if it is compromised, and who is allowed to see it.",
 category: "TFN",
 date: "25 October 2025",
 readTime: 5,
 body: `
A Tax File Number (TFN) is a permanent, lifetime identifier issued by the Australian Taxation Office (ATO). Anyone who has your TFN, along with basic identity details, can lodge a tax return in your name, divert your refund to their own bank account, and create fraudulent ABN registrations linked to you. Working holiday makers are a frequent target because they are unfamiliar with Australian systems and often share documents with strangers met through hostels, social media, or backpacker forums.

Your TFN should be treated with the same care as a bank account number. Once it is compromised, the damage can take years to unwind.

## Who can legitimately ask for your TFN?

The ATO publishes a strict list of who can ask for your TFN. The list is short:

- Your employer (after you have started work, on a Tax File Number Declaration form)
- Your bank or financial institution (to apply the correct tax rate on interest)
- Your superannuation fund (to manage your retirement savings)
- Your registered tax agent (to lodge your tax return or manage ATO matters)
- Centrelink or government agencies administering payments you are entitled to

No one else has a legal right to ask for your TFN. Not a landlord, not a friend, not a recruitment agency, and certainly not someone in a Facebook group offering to "help with your tax".

## How TFN fraud actually works

The most common scam targeting working holiday makers follows the same pattern. A scammer posts in a backpacker Facebook group, WhatsApp community, or hostel noticeboard, offering to "lodge your tax return" or "claim your super" for a small fee. They ask for:

- A photo of your passport
- A photo of your visa grant
- Your TFN
- Your date of birth and Australian address
- Sometimes your bank account details

With these details, the scammer lodges a tax return in your name through the ATO portal, lists their own bank account as the refund destination, and disappears with the money. When the legitimate return is later lodged, the ATO flags it as a duplicate and the genuine refund is delayed by months while the fraud is investigated.

## Warning signs of a TFN scam

If the person offering to handle your tax cannot show you a TAN (Tax Agent Number) on the Tax Practitioners Board register, they are not a registered tax agent. Other red flags include:

- Asking for payment in cash, cryptocurrency, or gift cards
- Operating only through messaging apps with no business address
- Promising unusually large refunds with no review of your actual situation
- Asking for your account passwords or for you to share your screen
- Pressure to "act fast" or "before the deadline"

Legitimate tax agents have a registered business, a TAN number, a professional indemnity insurance policy, and never need your account passwords to lodge a return on your behalf.

## What to do if your TFN has been compromised

If you suspect your TFN has been shared with the wrong person or your details have been stolen, contact the ATO immediately on the official identity theft line and report it. The ATO can put a security marker on your account that requires additional verification before any return is processed. [Get in touch with our team](/contact) and we will help you report the breach, secure your account, and check whether any fraudulent returns or ABN registrations have been lodged in your name.

## How do we keep your TFN secure?

When you lodge through our service, your TFN and identity documents are handled under the supervision of a registered tax agent channel covered by professional indemnity insurance and bound by the Tax Practitioners Board code of conduct. We never operate through anonymous messaging apps, and our TAN number is publicly verifiable on the Tax Practitioners Board register.
 `,
 },
 {
 slug: "who-can-ask-for-your-tfn",
 title: "Who can legally ask for your TFN in Australia? (working holiday guide)",
 description:
   "Only a short list of organisations have the legal right to ask for your Tax File Number: the ATO, your employer, your bank, super fund, and Centrelink. What to do if someone else asks.",
 category: "TFN",
 date: "27 October 2025",
 readTime: 4,
 body: `
A Tax File Number (TFN) is a permanent identifier issued by the Australian Taxation Office (ATO). Under Australian privacy law, only a limited list of organisations has the legal right to request your TFN. Anyone outside that list asking for it should be refused, and any pressure to share it through social media, messaging apps, or in person should be treated as a fraud risk.

Knowing exactly who is allowed to ask, and what they are allowed to do with it, is the simplest defence against TFN-related identity theft.

## Who is legally allowed to ask for your TFN?

The Privacy (Tax File Number) Rule restricts TFN collection to a defined list:

- Your employer, once you have started work, on a Tax File Number Declaration form
- Banks and financial institutions, to apply the correct tax rate on interest
- Superannuation funds, to manage and identify your retirement account
- Registered tax agents, to lodge tax returns and manage ATO correspondence on your behalf
- Centrelink and Services Australia, if you are claiming a government payment
- The ATO itself

Each of these organisations must explain why they need it, store it securely, and use it only for the stated tax-related purpose.

## Who is not allowed to ask for your TFN?

The list of people who are not entitled to your TFN is much longer. These include:

- Landlords or real estate agents (even for rental applications)
- Phone or internet providers
- Insurance companies (other than for specific tax-related products)
- Friends, hostel staff, or fellow backpackers
- Recruitment agencies (the employer collects it after you are hired, not the agency)
- Anyone offering tax help who cannot show a registered tax agent number (TAN)

If a request for your TFN does not come from the list above, you are entitled to refuse. Refusing is not a criminal matter and cannot be used as grounds to deny you a service.

## When can an employer ask for your TFN?

An employer can ask for your TFN only after you have accepted the job and are completing onboarding paperwork. The request comes through a Tax File Number Declaration form, which is a standard ATO document. The employer uses the TFN to apply the correct working holiday maker tax rate of 15% and to report your income to the ATO. They cannot share your TFN with other employers, recruitment agencies, or third parties.

If you have not yet been formally hired and the employer or recruiter is asking for your TFN, that is a warning sign. See our article on [what is a Tax File Number Declaration form](/blog/tax-file-number-declaration-form) for details on what the form looks like and when to provide it.

## What are the red flags for requests that are almost always scams?

The most common TFN fraud targeting working holiday makers comes from messages like these:

- "Send me your TFN and passport and I will lodge your tax return for you"
- "Send me your TFN and I will check how much super you have"
- "I work for an accountant, send me a photo of your visa and TFN"
- "I can get you a bigger refund if you send me your TFN"

None of these are legitimate. Registered tax agents do not operate through anonymous Facebook accounts or WhatsApp numbers, they do not need your account passwords, and they never promise inflated refunds before reviewing your actual income.

## How do you verify a tax agent before sharing your TFN?

Every registered tax agent in Australia has a Tax Agent Number (TAN) listed on the public Tax Practitioners Board register. Before sharing your TFN with anyone offering tax services, verify their TAN number is current. If they cannot give you a TAN or the number does not match the business, do not share any documents.

[Our service](/tax-return) is delivered under the supervision of a registered tax agent. Our TAN number is publicly verifiable, and your TFN is handled through a secure tax agent channel rather than through email or messaging apps.

[Get in touch with our team](/contact) to apply for your TFN under the supervision of a registered tax agent or to fix any issues with an existing application.
 `,
 },
 {
 slug: "tfn-australian-address-no-fixed-address",
 title: "How to apply for a TFN with no fixed Australian address (working holiday)",
 description:
   "Many working holiday makers move between hostels, vans, and farm accommodation in their first weeks in Australia. How to apply for a TFN without a permanent address and where to have it sent.",
 category: "TFN",
 date: "29 October 2025",
 readTime: 4,
 body: `
A Tax File Number (TFN) application requires an Australian address where the TFN letter can be delivered, but this does not have to be a long-term rental. A hostel, a friend's house, a workplace, or even a backpacker mail-holding service can be used as long as mail can be received reliably for the four weeks following application. Many working holiday makers move frequently in their first months in Australia, and applying without a fixed address is more common than the ATO website suggests.

The bigger risk is choosing an address where mail goes missing. A lost TFN letter delays your correct tax rate and the start of any [tax refund](/blog/what-is-a-tax-refund-australia) you are owed.

## What does the ATO accept as an address?

The TFN application requires an Australian residential or postal address. The ATO accepts:

- A rental property, share house, or sublet
- A hostel or backpacker accommodation
- A friend or relative's residence
- A workplace address (with permission from your employer)
- A mail-holding service or PO Box (used by long-term travellers)

The ATO does not check whether you actually live at the address. What matters is that the TFN letter, sent by Australia Post, is collected and not returned to sender.

## Why a hostel address can be risky

Hostels are a common choice for first-time TFN applications, but they come with two risks. First, large hostels handle hundreds of pieces of mail and letters get lost, returned, or discarded. Second, if you check out before the letter arrives, the hostel rarely forwards it.

If a hostel address is the only option, ask the front desk in writing whether they will hold mail for you, and check daily once two weeks have passed since application. The standard ATO processing time is 28 days, but the letter usually arrives within 10 to 14 days.

## What if you move before the letter arrives?

Moving accommodation before your TFN letter arrives is one of the most common reasons working holiday makers never receive their TFN. Once the letter is posted to the old address, the ATO will not automatically resend it.

If you have moved, our team can update your address with the ATO and arrange for the TFN to be reissued or confirmed by other means. See our article on [updating your address with the ATO](/blog/how-to-update-address-with-ato) for more detail.

## How do you apply without a fixed address through our service?

When we lodge a TFN application through our service, we can use a verified address that holds mail securely for the duration of the application. Once the TFN is issued, we confirm it with you directly through our system, so you receive your TFN even if you have changed accommodation in the meantime. This removes the most common failure point in TFN applications for travellers who are still finding longer-term accommodation.

## How do you keep your TFN safe once it arrives?

A TFN letter is a high-value document. Once it arrives, do not leave it lying around in shared accommodation, do not photograph it for social media, and do not share it with anyone other than your employer, your bank, your super fund, or a registered tax agent. See our article on [protecting your TFN from fraud](/blog/tfn-security-protect-from-fraud) for the full list of who is allowed to ask for your TFN and who is not. [Get in touch with our team](/contact) to apply for your TFN under the supervision of a registered tax agent channel.
 `,
 },

// ─── ABN ──────────────────────────────────────────────────────────────────
 {
 slug: "abn-invoicing-requirements-australia",
 title: "How to write a tax invoice with an ABN in Australia (legal requirements)",
 description:
   "A tax invoice with an ABN must contain specific information to be legally valid in Australia. Required fields, GST rules, and a working holiday maker template you can copy.",
 category: "ABN",
 date: "30 October 2025",
 readTime: 4,
 body: `
A tax invoice issued under an Australian Business Number (ABN) must contain the supplier's name, the ABN, the date, a description of the goods or services, and the total amount payable. If the invoice is for more than $75 and the supplier is registered for GST, additional GST information is also required. If a working holiday maker provides services without quoting a valid ABN, the client is legally required to withhold 47% of the payment under the No-ABN withholding rule.

Getting the invoice right is not a formality. An invoice with missing or incorrect details can be rejected by the client, delay payment by weeks, or trigger an ATO compliance review.

## What every ABN invoice must contain

For invoices under $75 (excluding GST), the minimum required information is:

- The seller's name (your full legal name, the same as on your ABN registration)
- The seller's ABN
- The date of issue
- A description of the goods or services
- The total amount payable

For invoices of $75 or more (excluding GST), if you are not registered for GST, the same information applies. If you are registered for GST, the invoice must also include:

- The words "Tax Invoice" clearly displayed
- The GST amount (or a statement that the total includes GST)
- The buyer's name or ABN if the invoice is for $1,000 or more

Most working holiday makers with an ABN are not registered for GST because they earn well below the $75,000 turnover threshold. See our article on [GST and ABN for working holiday makers](/blog/gst-and-abn-for-working-holiday-makers) for when GST registration becomes required.

## What happens if your invoice does not show an ABN?

Under the No-ABN withholding rule, a business paying for goods or services from someone who does not quote an ABN is legally required to withhold 47% of the payment and remit it to the ATO. This applies even if you have a valid ABN but simply forgot to put it on the invoice.

The 47% withheld is recoverable when you lodge your [tax return](/tax-return) at the end of the financial year, but it sits with the ATO in the meantime. For a $2,000 invoice, that is $940 you lose access to until the return is processed.

## What are the common invoice mistakes that delay payment?

Even with all the required fields, clients regularly reject invoices for:

- Name on the invoice not matching the name registered against the ABN
- ABN with a typo (one wrong digit makes the ABN invalid on lookup)
- No invoice number for ongoing work (clients need a unique reference for each invoice)
- Date in the wrong format (Australian dates are DD/MM/YYYY, not MM/DD/YYYY)
- Bank account details missing, leaving the client unable to pay

The ABN on every invoice can be verified by the client through the public ABN Lookup tool. If the name and ABN do not match, the invoice will be rejected.

## How does our service handle ABN invoicing for working holiday makers?

When you register an ABN through our service, we set up your ABN registration so that the name, address, and business activity on your invoices match the official ATO record. We also provide guidance on the correct invoice format for your work type, whether that is farm contracting, hospitality, ride-share, delivery, trades, or other contractor work.

At tax time, we reconcile every invoice you issued during the year against the income reported by your clients to the ATO, making sure no income is missed and no over-withholding has occurred. See our article on [how to register for an ABN](/blog/how-to-register-for-an-abn) for how to get started, or [get in touch with our team](/contact) for direct help.
 `,
 },
 {
 slug: "abn-deductions-business-expenses",
 title: "ABN business expense deductions for working holiday makers in Australia",
 description:
   "Working holiday makers earning income under an ABN can claim work-related business expenses to reduce taxable income. Full list of what qualifies, what does not, and record-keeping rules for sole traders.",
 category: "ABN",
 date: "15 November 2025",
 readTime: 5,
 body: `
A working holiday maker earning income under an Australian Business Number (ABN) can deduct legitimate business expenses from their taxable income, reducing the amount of tax payable at the end of the financial year. Deductible expenses include tools, equipment, vehicle running costs for work travel, mobile phone use for business, protective clothing, and certain licences or training directly related to the work.

The rules for ABN deductions are different from the rules for PAYG employee deductions, and the records required are stricter. Without proper documentation, the ATO can disallow the claim during a review.

## What can a working holiday maker on an ABN claim?

The general rule is that an expense is deductible if it is directly related to earning your ABN income and you have a record to prove it. Common categories include:

- **Tools and equipment**: items required for the work, such as a chainsaw for tree work, a vacuum for cleaning contracting, or a delivery bag for courier work
- **Protective clothing and safety gear**: high-vis vests, steel-cap boots, gloves, hard hats
- **Vehicle running costs**: fuel, registration, insurance, and maintenance for kilometres driven specifically for work (private travel is not deductible)
- **Mobile phone and internet**: the work-related percentage of your usage
- **Licences and certifications**: White Card, RSA, and other industry tickets directly required by your work
- **Bank fees and merchant charges**: card payment fees on a business account
- **Professional services**: registered tax agent fees and bookkeeping costs

Items used for both work and private purposes can only be claimed at the work-related percentage. A phone used 60% for work means 60% of the bill is deductible.

## What records does the ATO require?

For every expense claimed, the ATO requires evidence of the cost and evidence that it was for work. The minimum is a receipt or tax invoice showing the supplier, the date, the amount, and a description of the item. For expenses claimed on an apportioned basis (phone, vehicle, internet), you also need a record of the work-use percentage, supported by a logbook or representative period of usage.

Without records, the deduction cannot be claimed, even if the expense was genuinely incurred.

## What cannot be claimed?

Some expenses look like they should be deductible but are not. The most common mistakes include:

- Travel from home to a regular workplace (this is private, not business)
- Clothing that is not specifically protective or branded uniform
- Food and drink during the working day (not deductible for ABN holders any more than for employees)
- Accommodation in your home base, even if you work from home
- Costs incurred before the ABN was registered

See our article on [vehicle expenses and logbooks](/blog/vehicle-logbook-abn-working-holiday) for the detailed rules on claiming car-related costs.

## Why do working holiday makers under-claim deductions?

The two main reasons working holiday makers leave deductions on the table are:

- Not keeping receipts because they did not realise the items were claimable
- Not understanding which costs qualify under ABN rules versus PAYG rules

A working holiday maker doing farm contracting work with their own equipment, for example, often has thousands of dollars of legitimate deductions sitting in faded receipts at the bottom of a backpack. Without an organised record, those deductions are lost at tax time.

## How does our service handle ABN deductions?

When we lodge your [tax return](/tax-return) at the end of the financial year, our team reviews your ABN income against your work type and identifies every deduction category you are entitled to claim. We help you compile the supporting records for each claim, apply the correct apportionment for shared-use items, and make sure the deduction is defensible if the ATO reviews the return.

For working holiday makers earning under an ABN, the difference between an unreviewed return and a properly prepared one is often several thousand dollars in tax. [Get in touch with our team](/contact) before the financial year ends to make sure your records are in order.
 `,
 },
 {
 slug: "uber-doordash-rideshare-abn-working-holiday",
 title: "Uber, DoorDash & rideshare for working holiday makers: ABN, GST and tax",
 description:
   "Rideshare and food delivery work is treated as contracting in Australia. Working holiday makers need an ABN (and GST registration for rideshare). How tax works when no PAYG is withheld, and what to set aside.",
 category: "ABN",
 date: "20 November 2025",
 readTime: 5,
 body: `
Working for Uber, DoorDash, or any rideshare or food delivery platform in Australia is classified as independent contracting rather than employment. This means a working holiday maker driving or delivering for these platforms must register an Australian Business Number (ABN), is responsible for their own tax obligations, and does not have tax withheld automatically by the platform. For rideshare specifically, GST registration is required from the first dollar earned, regardless of total turnover.

This is one of the most common areas where working holiday makers run into ATO trouble, because the rules are not what most people expect.

## Why is rideshare and delivery treated as contracting?

Uber, DoorDash, Menulog, and similar platforms classify their drivers and riders as independent contractors, not employees. The platform pays you for completed jobs, but it does not withhold tax, pay [superannuation](/superannuation), or take responsibility for your work conditions. This means:

- You need an [ABN](/abn) before you can work for the platform
- You are responsible for setting aside money for tax
- You can claim work-related deductions like vehicle costs, phone use, and equipment
- You will not receive a PAYG payment summary at the end of the year (you receive an annual statement from the platform instead)

See our article on [the difference between an employee and a contractor](/blog/employee-vs-contractor-australia) for more on how the classification works.

## What is the GST rule that catches most rideshare drivers?

For ordinary ABN work, GST registration is only required once your turnover passes $75,000 in a financial year. For rideshare driving (Uber, Ola, Didi, and similar passenger transport services), the rule is different: GST registration is required from the first dollar of income, no matter how little you earn.

Food delivery (Uber Eats, DoorDash, Menulog) is treated under the standard $75,000 GST threshold, not the rideshare rule. The distinction is important because it changes what you owe to the ATO and what records you need to keep.

If you are registered for GST and forget to lodge your Business Activity Statements, the ATO can backdate penalties and demand the GST component of every fare you have ever taken. For a driver working full-time for six months, this can be a debt of several thousand dollars.

## What deductions can rideshare and delivery workers claim?

Income earned through a rideshare or delivery platform is reduced by legitimate business expenses, which include:

- Vehicle running costs (fuel, servicing, registration, insurance, depreciation)
- Vehicle finance interest on loans
- Mobile phone and data for the work app
- Tolls and parking incurred during work
- Cleaning of the vehicle
- Delivery equipment (bag, helmet, bike maintenance for couriers)
- Commissions and service fees charged by the platform

Vehicle expenses can be claimed either on a per-kilometre basis or by tracking actual costs with a logbook. The logbook method usually gives a larger deduction for drivers working significant hours. See our article on [vehicle expenses and logbooks](/blog/vehicle-logbook-abn-working-holiday) for the detail.

## What income does the ATO see automatically?

Rideshare and delivery platforms report your annual earnings directly to the ATO under the Sharing Economy Reporting Regime. This means the ATO already knows how much you earned through Uber, DoorDash, or similar before you lodge your [tax return](/tax-return). Trying to under-report income from these platforms is one of the easiest ways to trigger an ATO audit, because the platform data is matched against your return automatically.

## How does our service handle rideshare and delivery income?

When you lodge through our service, our team handles the full picture for rideshare and delivery work:

- ABN registration with the correct business activity codes
- GST registration if you are driving rideshare (or if your delivery income approaches the $75,000 threshold)
- Quarterly BAS lodgements if you are GST-registered
- End-of-year tax return that reconciles platform statements with the ATO record
- Vehicle and equipment deductions calculated and substantiated for review

The penalties for getting rideshare tax wrong are significant, and the rules change regularly. [Get in touch with our team](/contact) before you start working for a platform so the registrations and records are in place from day one.
 `,
 },

// ─── TAX RETURN ───────────────────────────────────────────────────────────
 {
 slug: "tax-return-without-tfn-australia",
 title: "Can you lodge a tax return in Australia if you worked without a TFN?",
 description:
   "Working without a TFN means your employer withheld tax at 45% instead of 15%.",
 category: "Tax Return",
 date: "21 November 2025",
 readTime: 4,
 body: `
A working holiday maker who worked in Australia without a Tax File Number (TFN) can still lodge a tax return and recover the excess tax that was withheld. Without a TFN on file, employers are legally required to withhold tax at the top marginal rate of 45% instead of the 15% working holiday maker rate. The difference is recoverable, but the [tax return](/tax-return) cannot be lodged without obtaining a TFN first.

The longer the delay in applying for a TFN, the more complex the return becomes, because employers may have stopped reporting your income or may have incorrect details on file.

## How much extra tax is withheld without a TFN?

The difference between the no-TFN rate and the working holiday maker rate is substantial:

- With a TFN: 15% withheld on the first $45,000 of working holiday income
- Without a TFN: 45% withheld on every dollar from the first week

On a $1,000 weekly wage, that is $300 extra withheld every single week. Over a three-month period of full-time work, more than $3,500 has been withheld that you would never have paid with a TFN on file. This excess is fully recoverable when you lodge a tax return.

## What you need to do before you can lodge

A tax return cannot be lodged without a TFN. The first step is therefore [applying for a TFN](/tfn-form) if you do not already have one. Once the TFN is issued, the return can be lodged for any year in which you earned income, including past financial years if you missed lodging at the time.

If you have already left Australia, you can still apply for a TFN and lodge a return from overseas. See our article on [how to lodge a tax return from overseas](/blog/how-to-lodge-tax-return-from-overseas) for more detail.

## What records do you need?

To lodge a return covering work done without a TFN, our team needs:

- Your TFN (once issued)
- Your passport and visa details for the period worked
- Details of every employer you worked for, including business name and ABN if known
- Any payslips you kept showing the tax withheld
- An Australian bank account for the refund

Even if you have no payslips, the ATO holds records of income reported by employers under the Single Touch Payroll system. Through our tax agent portal we can access the ATO record of every employer who reported income for you in the financial year, including the gross pay and the tax withheld.

## What happens if an employer did not report your income?

Some employers, particularly in cash-in-hand industries, do not report income to the ATO. If you were paid cash without a TFN, the income may not appear on the ATO record. In this case the return is more complex, and the strategy depends on whether the employer should have been reporting and whether you have any records of your own. See our article on [cash in hand tax returns](/blog/cash-in-hand-tax-return) for the detailed rules.

## How does our service handle a return after working without a TFN?

When you lodge through our service after working without a TFN, our team:

- Applies for your TFN if you do not have one, through our [TFN application service](/tfn-form)
- Accesses the ATO income record once your TFN is active to identify every employer who reported income for you
- Reconciles the reported income against any payslips you provide to make sure nothing has been missed
- Lodges the return claiming the difference between the 45% no-TFN rate and the 15% working holiday maker rate

The refund for a year worked without a TFN is often several thousand dollars larger than a standard return because of the over-withholding. [Get in touch with our team](/contact) to lodge your return and recover the excess tax.

## What about identity protection?

If you worked without a TFN because you were uncertain about how the system works, do not be tempted to share your details with strangers offering tax help online. Backpacker Facebook groups, WhatsApp communities, and messaging apps are full of scammers who target working holiday makers who feel out of their depth. Never share your TFN, passport, or visa grant with anyone who is not a registered tax agent. A registered agent is listed on the Tax Practitioners Board register with a verifiable TAN number. If they cannot show you their TAN, do not hand over your documents.
 `,
 },
 {
 slug: "multiple-jobs-tax-return-working-holiday",
 title: "How to lodge a working holiday tax return with multiple employers in Australia",
 description:
 "Working holiday makers on 417 and 462 visas often work for several employers in one financial year - especially in hospitality, farm work and seasonal jobs. Here is how to combine everything into one tax return correctly.",
 category: "Tax Return",
 date: "23 November 2025",
 readTime: 4,
 body: `
A working holiday maker who has held multiple jobs during a financial year must report income from every employer on a single tax return. Each employer reports your wages and tax withheld separately to the ATO under the Single Touch Payroll system, and the [tax return](/tax-return) must reconcile against the combined total. Missing an employer, even one you only worked at for a week, creates a discrepancy that the ATO will pick up and correct after the return is lodged, often triggering a follow-up assessment.

Multiple jobs make a tax return more complex, but they also create more opportunities for refunds because of how the working holiday maker tax brackets apply across combined income.

## How does the ATO know about every employer?

Since Single Touch Payroll became universal in Australia, every employer is required to report your wages, tax withheld, and superannuation directly to the ATO each pay run. By the end of the financial year, the ATO has a complete record of:

- Every business that paid you wages and the dates of employment
- Total gross wages from each employer
- Total tax withheld from each employer
- Super contributions reported to each fund

When we lodge through our tax agent portal, we can see this combined record before we prepare your return. This means we identify employers you may have forgotten about (a one-week trial in a kitchen, a casual shift at a music festival, a temp agency job) and include them in the return.

## Why missing an employer causes problems

If you lodge a return that includes only some of your employers, the ATO compares your return against its Single Touch Payroll record and identifies the gap. The return is typically processed at the lower reported figure first, the refund is paid, and then weeks or months later the ATO issues an amended assessment adding the missing income. This often results in:

- A tax debt to repay, sometimes from a refund you have already spent
- Interest charged on the debt
- A general interest charge that compounds daily
- Potential penalties if the omission was substantial

It is much easier to lodge correctly the first time than to deal with an amended assessment after the fact.

## The tax bracket effect of multiple employers

When you have multiple employers, each one withholds tax based on the income they pay you, not your total income across all jobs. This means the tax-free thresholds and bracket rates can be applied multiple times during the year, leaving you under-withheld at the end of the year. Working holiday makers do not have a tax-free threshold, but the bracket effect still applies: at $45,000 of combined income, the rate jumps from 15% to 30%, and individual employers may not be withholding enough to cover the higher rate on combined earnings.

The opposite can also be true: working holiday makers without a TFN on file at one employer were withheld at 45%, generating a large refund once the combined income is assessed against the correct bracket structure.

## What records are useful when you have had multiple employers?

When you lodge through our service, you do not need to collect payslips from every employer. We access the ATO record directly to see what each employer reported. The records that are still useful are:

- Any payslips or final summaries you kept (helpful as a cross-check)
- Details of cash payments not reported through Single Touch Payroll
- Records of work-related expenses you incurred at each job
- Travel between work locations (potentially deductible in some cases)

## How does our service handle multi-employer returns?

For working holiday makers with multiple jobs in a financial year, our team:

- Accesses the full ATO income record through our tax agent portal
- Identifies every employer that reported income, including ones the worker may have forgotten
- Cross-checks the ATO record against any payslips and final summaries provided
- Waits until all employer reporting is finalised (some employers finalise late, which can trigger amendments if the return is lodged too early)
- Applies the correct working holiday maker rates across the combined income
- Identifies any work-related deductions across all jobs

[Get in touch with our team](/contact) to lodge a return that captures every employer cleanly the first time, avoiding amended assessments later.
 `,
 },
 {
 slug: "second-third-year-visa-tax-implications",
 title: "Tax implications of a second or third year working holiday visa in Australia",
 description:
   "Returning to Australia on a second or third year working holiday visa changes nothing about the tax rate but can change tax residency status,.",
 category: "Tax Return",
 date: "24 November 2025",
 readTime: 5,
 body: `
A working holiday maker on a second or third year visa is taxed at the same working holiday maker rates as on the first year visa: 15% on the first $45,000 of income. The visa year does not change the rate. What can change is your [tax residency](/blog/tax-residency-working-holiday-makers) status if your circumstances during the longer period in Australia have shifted, and there are practical differences in [superannuation](/superannuation), TFN, and [ABN](/abn) handling that catch working holiday makers off guard.

The biggest mistake on second and third year visa returns is assuming the tax situation is exactly the same as the first year. In several specific areas, it is not.

## What is the 15% rate still applies on every visa year?

The working holiday maker tax rate of 15% on the first $45,000 (and 30% above that, up to $135,000) applies whether you are on a first, second, or third year subclass 417 or 462 visa. The rate is tied to the visa subclass, not to how long you have been in the country. Returning to Australia for a second or third year does not move you onto resident tax rates unless your overall residency circumstances pass the ATO tax residency tests.

See our article on [the backpacker tax rate](/blog/backpacker-tax-rate-australia) for the full bracket structure.

## When tax residency can change on a second or third year

Tax residency for ATO purposes is not the same as immigration residency. A working holiday maker who has been in Australia continuously for an extended period, has set up a stable home, kept the same job for a long time, and built ongoing ties to Australia may pass the residency tests even on a working holiday visa. If residency status changes, the tax brackets change, the tax-free threshold of $18,200 may apply, and refunds can be substantially larger.

The residency tests are complex and case-specific. They take into account where you live, where you work, what assets you have, family ties, and intentions. See our article on [tax residency for working holiday makers](/blog/tax-residency-working-holiday-makers) for the detailed criteria. Our team reviews residency on every return where the working holiday maker has been in Australia long enough that the question realistically arises.

## Do you need a new TFN for a second or third year visa?

No. Your TFN is permanent and lifetime, and the same TFN applies on every visa year. See our article on [whether you need a new TFN on a second visa](/blog/do-you-need-new-tfn-second-visa) for the full detail.

## What about ABN and superannuation across visa years?

Both ABN and super carry across visa years:

- Your ABN remains active unless you cancel it. If you used an ABN during the first year visa, it can continue into the second year visa, but the business activity codes and registered details should be reviewed if your work type has changed.
- Your super contributions from the first year visa stay in the fund. They can either be left until you finally depart Australia for good (at which point a [DASP](/blog/what-is-dasp-super-withdrawal) is lodged), or, if you have already departed and returned on a new visa, the timing of DASP changes.

If you took DASP after your first visa and then returned to Australia on a second year visa, you cannot retroactively undo the DASP. The super that was withdrawn is gone, and new super contributions start fresh on the second visa.

## What is the 88-day and 179-day work requirements?

To qualify for a second year working holiday visa, you must have completed 88 days of specified work in a regional area during your first visa. For a third year visa, an additional 179 days are required during the second visa. These are immigration requirements, not tax requirements, but they create tax records because:

- Each employer must have your TFN on file
- The work is reported to the ATO under Single Touch Payroll
- Your payslips serve as evidence of the days worked for immigration purposes

Keeping clean records of every regional work employer is essential not just for tax but for the next visa application.

## How does our service handle second and third year visa returns?

For working holiday makers on a second or third year visa, our team:

- Reviews tax residency against the full period of time in Australia
- Reconciles income across the combined visa years if you have transitioned mid-financial-year
- Manages [DASP](/blog/what-is-dasp-super-withdrawal) timing across visa transitions
- Reviews ABN registrations and business activity codes for continued accuracy
- Identifies any deductions specific to regional work, including travel and accommodation in some cases

A second or third year visa return is rarely just a copy of the first year return. [Get in touch with our team](/contact) for a return that reflects the full picture.
 `,
 },

// ─── SUPER ────────────────────────────────────────────────────────────────
 {
 slug: "dasp-documents-required",
 title: "DASP documents required: working holiday maker checklist to claim super back",
 description:
   "A DASP application requires specific documents: proof your working holiday visa is no longer active, proof you have left Australia, ID, and your super fund details. Full checklist and how to gather them.",
 category: "Super",
 date: "28 November 2025",
 readTime: 4,
 body: `
A Departing Australia Superannuation Payment (DASP) application requires proof of identity, proof that your working holiday visa has expired or been cancelled, and proof that you have departed Australia. The specific documents are your passport, your visa grant or cancellation notice, and your departure record from the Department of Home Affairs. Without all three, the super fund will not release your superannuation.

The DASP process is one of the most documentation-heavy applications a working holiday maker faces, and missing or incorrect paperwork is the leading cause of delays that stretch a one-month application into six months.

## The three core requirements

To release a DASP, the super fund must confirm:

1. **Identity**: a certified copy of your passport (the same one used on the visa)
2. **Visa status**: official confirmation from the Department of Home Affairs that your visa has expired, been cancelled, or otherwise ceased
3. **Departure**: official confirmation that you have left Australia

Each fund has slightly different requirements for how these are documented, and some funds have additional requirements such as proof of address overseas or a tax declaration. The process must be repeated separately for each super fund you have contributions in.

## Passport and identity requirements

The passport used on your working holiday visa must be the one you provide for the DASP application. If you have renewed your passport since arriving in Australia, both passports must be provided to show the chain of identity. Certified copies are usually required, with the certification done by an Australian notary, a JP, or a designated official in your home country.

Some funds accept digital identity verification through services like ZipID or the ATO's own verification tools, which avoids the need for paper certification. We arrange digital verification where possible to speed up the application.

## Visa expiry or cancellation confirmation

The fund needs evidence from Home Affairs that your visa has ended. There are three common forms of evidence:

- Visa grant notice showing the expiry date (if the visa has already passed that date)
- Cancellation notice if the visa was cancelled before expiry
- VEVO (Visa Entitlement Verification Online) extract showing current visa status as expired

VEVO extracts are the most common because they show the live status, but they need to be generated after the visa has actually expired.

## Departure record

The Department of Home Affairs maintains a movement record of every entry into and exit from Australia. The DASP application requires evidence that you have departed Australia for the last time on your current visa. Funds typically accept:

- A movement record from Home Affairs
- A copy of your departure boarding pass plus passport exit stamp
- An entry stamp into another country dated after your Australian visa expiry

The departure must be after the visa expiry. Departing before the visa expires (a "fly-out and come back" pattern) does not trigger DASP eligibility.

## What goes wrong most often

The most common DASP rejections we see are:

- Passport details on the application do not match the super fund record
- Visa expiry date entered incorrectly
- Departure date before the visa expiry date
- Identity certification not accepted by the fund
- Application submitted to a fund where the worker has no balance (employer contributions went to a different fund)

The last point is particularly common: employers nominate the super fund, and a worker who had three employers may have super in three different funds. Each must be tracked down and applied for separately. See our article on [finding lost superannuation](/blog/how-to-find-lost-superannuation) for how we trace every fund.

## How does our service handle DASP documentation?

When we manage a DASP through our service, our team:

- Identifies every super fund that received contributions during your time in Australia
- Collects and verifies the identity documents required by each fund
- Pulls VEVO records and movement records on your behalf
- Lodges the application directly with each fund through the ATO DASP system
- Follows up with funds that fail to process within the standard timeframe
- Coordinates payment routing to your overseas bank account

The full process is handled end-to-end so you do not need to chase each fund individually. [Get in touch with our team](/contact) before you leave Australia, or once you have departed, to start your DASP application.
 `,
 },
 {
 slug: "dasp-tax-rate-65-percent-explained",
 title: "DASP 65% tax rate explained: why working holiday makers pay more on super",
 description:
   "The DASP withholding tax is 65% for working holiday makers (417 and 462 visa holders), much higher than the 35% rate for other visa types. Why this rule exists, what it applies to, and how it affects your payout.",
 category: "Super",
 date: "11 December 2025",
 readTime: 4,
 body: `
The Departing Australia Superannuation Payment (DASP) for a working holiday maker is taxed at 65% on the taxable component of the super balance. This rate was set by federal legislation in 2017 specifically for super contributions made while a person was on a subclass 417 or 462 working holiday visa. For all other temporary visa holders, the DASP tax rate is 35%. The higher rate is the single largest reason why the net DASP a working holiday maker receives is much smaller than the gross balance in their super account.

The rate cannot be reduced, avoided, or refunded. It is applied at the point of withdrawal and the net amount is paid to the worker.

## What does the 65% apply to?

The 65% applies to the **taxable component** of the super balance. Almost all super contributions for a working holiday maker fall into the taxable component, because they are:

- Employer contributions made under the [Superannuation Guarantee](/blog/what-is-superannuation-guarantee-charge) (currently 12% of wages)
- Investment earnings on those contributions

A small portion of some accounts may be non-taxable (for example, personal after-tax contributions, which are rare for working holiday makers). The non-taxable component is not subject to the 65% rate.

## Where did the 65% rate come from?

Before 2017, working holiday makers were taxed on DASP at the same rate as other temporary visa holders. The Working Holiday Maker Reform Package introduced in 2017 changed both the income tax rate (to 15% from the first dollar) and the DASP rate (to 65%). The reasoning given by the government was to balance the lower income tax rate against a higher tax on funds being taken out of the Australian super system.

The 65% rate applies regardless of how long the worker was in Australia, how much super was accumulated, or which fund the contributions went to.

## How much super does a working holiday maker typically have?

The amount of super contributed depends on wages and time worked. As a rough guide, on the current 12% Superannuation Guarantee rate:

- $20,000 of wages generates approximately $2,400 of super contributions
- $40,000 of wages generates approximately $4,800 of super contributions
- $60,000 of wages generates approximately $7,200 of super contributions

After the 65% DASP tax, the net amount received is:

- $2,400 gross → approximately $840 net
- $4,800 gross → approximately $1,680 net
- $7,200 gross → approximately $2,520 net

The exact figures depend on fund fees and investment returns during the time the money was held.

## Why claim DASP even at 65%?

Even at the 65% rate, claiming DASP is almost always worthwhile because the alternative is leaving the money behind. Super accounts that are never claimed are eventually transferred to the ATO as unclaimed monies. While the ATO holds these balances indefinitely, they do not grow with investment returns and are subject to the same DASP tax if claimed later. The 35% you receive now is better than nothing.

Working holiday makers who never claim their super are essentially making a gift to the Australian government. See our article on [what happens to unclaimed super](/blog/what-happens-to-unclaimed-super) for what happens to balances that are never withdrawn.

## Can you reduce the 65% in any way?

The 65% rate is set by federal law and cannot be reduced through deductions, offsets, or tax planning. The only way to receive a lower effective rate is if your account has a non-taxable component, which is unusual for working holiday makers. There is no legitimate strategy that reduces the rate.

Anyone claiming they can "get your super out at a lower tax rate" is either misunderstanding the law or running a scam. Be particularly careful with offers on social media or messaging apps to "handle your DASP at a discount". The same rules apply to whoever lodges the application: the 65% is withheld at the fund level before the payment is released. Sharing your super details with anyone who is not a registered tax agent puts you at serious risk of identity theft. See our article on [protecting your TFN from fraud](/blog/tfn-security-protect-from-fraud) for the warning signs.

## How does our service handle DASP?

When you lodge DASP through our service, our team:

- Identifies every super fund that received contributions
- Calculates the expected net payment after the 65% tax so you know what to expect
- Lodges each application directly with the fund through the official ATO DASP system
- Tracks payments and follows up where funds are slow to process
- Routes payment to your nominated overseas bank account

The 65% tax is unavoidable, but the rest of the process can be made fast and clean. [Get in touch with our team](/contact) to start your DASP application.
 `,
 },
 {
 slug: "super-multiple-funds-consolidation",
 title: "Multiple super funds: how working holiday makers can consolidate before DASP",
 description:
   "Working holiday makers often end up with super in three or four different funds because each employer nominates a different one. How to consolidate to one fund and the pros and cons before claiming DASP.",
 category: "Super",
 date: "21 December 2025",
 readTime: 4,
 body: `
A working holiday maker who has had multiple employers in Australia typically ends up with [superannuation](/superannuation) in multiple funds because each employer nominates their own default fund. Without active consolidation, a worker with four employers can end up with four separate super accounts, each charging monthly fees, and each requiring a separate DASP application when leaving the country. The fees alone can drain hundreds of dollars from a balance over a single year.

Consolidating super into a single fund while still in Australia simplifies the DASP process and stops the fees from eroding the balance.

## Why does multiple-fund super happen so often?

Australian super law gives employers the right to nominate a default super fund for new employees who do not actively choose their own. Most working holiday makers in their first job do not understand the choice they are being offered and accept the default. The next employer offers a different default. The result is:

- Employer 1: super goes to Fund A
- Employer 2: super goes to Fund B
- Employer 3: super goes to Fund C
- Employer 4: super goes to Fund D

The [Super Stapling](/blog/super-stapling-rule-australia) rule introduced in 2021 was meant to reduce this fragmentation by linking your super to a single "stapled" fund, but it does not work cleanly for working holiday makers because the stapling system often does not recognise the worker until well after their first employer contribution has gone to a different default fund.

## What is the cost of holding super in multiple funds?

Every super fund charges:

- An administration fee, typically $50 to $130 per year regardless of balance
- An asset-based fee, typically 0.5% to 1.5% of the balance per year
- Insurance premiums, which are deducted automatically unless cancelled

For a working holiday maker with $1,500 in each of four funds, the total annual fee load can be $400 to $600, which is a significant percentage of small balances. Insurance premiums alone can erode small balances to zero within a couple of years if not cancelled.

## Consolidating into a single fund

The recommended approach is to choose one super fund and direct all employers to pay into that fund using a Standard Choice form. Then, the balances from your other funds can be transferred (rolled over) into the chosen fund. This:

- Reduces total fees to a single administration fee
- Combines all balances so investment returns compound on the full amount
- Simplifies DASP at the end of your time in Australia (one application instead of four)
- Cancels duplicate insurance policies

See our article on [how to choose a super fund](/blog/how-to-choose-super-fund) for the criteria that matter for working holiday makers.

## Can you consolidate after leaving Australia?

Consolidating super after departure is much harder than doing it while in Australia. Most funds require online verification through Australian-issued credentials and an Australian phone number to authorise a rollover. If you have already left, the practical option is usually to lodge a separate [DASP application](/blog/what-is-dasp-super-withdrawal) with each fund rather than consolidating first.

## Tracing super you have lost track of

Working holiday makers regularly do not know which funds they have super with, especially after working many casual jobs. The ATO holds a register of every super account linked to a TFN, and our team can search this register to identify every fund holding your contributions. See our article on [how to find lost superannuation](/blog/how-to-find-lost-superannuation) for the detail.

## How does our service handle multiple-fund super?

When you lodge a DASP through our service, our team:

- Searches the ATO super register using your TFN to identify every fund holding contributions
- Confirms the balance and account details with each fund
- Lodges a separate DASP for each fund through the official ATO system
- Tracks payments from each fund and follows up where funds are slow
- Routes all payments to your nominated bank account

If you are still in Australia, we can also coordinate consolidation before DASP becomes relevant, which is often the better outcome for small balances. [Get in touch with our team](/contact) to start the process.

## What about warning on super consolidation?

Scammers regularly target working holiday makers with offers to "consolidate your super" or "find your lost super". Once they have your TFN and passport details, they can roll your super out of your real account and into one they control. Never share your TFN or passport details with anyone who is not a registered tax agent. A registered agent has a TAN number listed on the Tax Practitioners Board register. If they cannot show their TAN, do not hand over your documents.
 `,
 },
 {
 slug: "dasp-rejected-what-to-do",
 title: "DASP application rejected? What working holiday makers can do next",
 description:
   "DASP applications are rejected for visa status mismatches, identity issues, or missing departure records. Common reasons working holiday makers get rejected and how to fix it and resubmit.",
 category: "Super",
 date: "22 December 2025",
 readTime: 4,
 body: `
A Departing Australia Superannuation Payment (DASP) application can be rejected by the super fund or by the ATO for several reasons: the visa status has not yet shown as expired or cancelled, the departure record has not yet been recorded by the Department of Home Affairs, the identity documents do not match the fund's records, or the application has been lodged with a fund that does not hold any of your contributions. Each of these has a specific resolution path, and the resolution is much faster through a tax agent channel than through the public application route.

A rejected DASP is not lost. The money remains in the super fund, and the application can be re-lodged once the underlying issue is resolved.

## The most common rejection reasons

DASP applications fail for predictable reasons. From most to least common:

1. **Visa status not yet shown as expired in the system**. If you lodge DASP within a few days of your visa expiry, the Department of Home Affairs record may not have updated yet. The fund or ATO sees the visa as still active and rejects the application.
2. **No departure record on file**. The Home Affairs movement record does not show your departure yet, often because the airline data has not been processed.
3. **Identity mismatch**. Your passport details on the application do not match the super fund's record. This often happens when employers misspelled your name when setting up your super account.
4. **No balance in the fund**. The fund the application was lodged with does not hold any of your contributions. Your money is in a different fund.
5. **Certification issue with identity documents**. The fund does not accept the form of certification you used (for example, a non-approved certifier in your home country).
6. **Application form incomplete**. Missing signatures, missing bank details for the receiving account, or missing tax declaration.

## How do you identify which problem you have?

Super funds and the ATO do not always explain a rejection clearly. The notice may simply say the application has been declined or returned. Identifying which of the reasons above applies requires checking:

- Your VEVO record (Department of Home Affairs) for current visa status
- Your movement record (Home Affairs) for departure date
- The ATO super register for which funds actually hold your contributions
- The specific fund's identity requirements

Through our tax agent channel we can pull these records directly and identify the issue, usually within a day.

## What to do if the visa or departure record is not yet showing

If the rejection is because the visa expiry or departure has not yet been recorded by Home Affairs, the application simply needs to be re-lodged once the record updates. Movement records typically update within 7 to 14 days of departure. Visa expiry records update on the day after expiry. There is no fix for this other than waiting and re-lodging.

If after 30 days the record still has not updated, our team can contact Home Affairs directly to confirm and accelerate the record update.

## What to do if the fund holds no balance

If a fund rejects your application because there is no balance, your contributions went to a different fund. Many working holiday makers do not know which funds hold their super, particularly if they had several employers. The ATO super register lists every fund linked to your TFN, and we can search it on your behalf. See our article on [finding lost superannuation](/blog/how-to-find-lost-superannuation) for more detail.

Once the correct fund is identified, a fresh application is lodged with that fund.

## What to do if identity verification has failed

If the rejection relates to identity, the resolution depends on what failed:

- **Name mismatch**: the super fund needs to update the name on the account before the application can be re-lodged
- **Passport mismatch**: if you renewed your passport, both the old and new passport must be provided
- **Certification not accepted**: re-certify the documents through an accepted certifier (Australian notary, JP, or designated official)

Funds vary in what they accept, particularly for working holiday makers applying from overseas. Our team handles certification routing as part of the application.

## How does our service handle DASP rejections?

When a DASP we have lodged is rejected, our team:

- Identifies the specific reason for rejection from the fund or ATO
- Pulls the underlying records (VEVO, movement record, super register) to confirm the cause
- Corrects the underlying issue (waiting for record updates, fixing identity details, or moving the application to the correct fund)
- Re-lodges the application through the official ATO DASP system
- Tracks the new application to payment

For working holiday makers who have already left Australia, getting a rejection resolved from overseas without help is extremely difficult because the relevant agencies all operate on Australian business hours and require Australian phone numbers for verification. [Get in touch with our team](/contact) if your DASP has been rejected or is taking longer than two months without explanation.
 `,
 },
 {
 slug: "super-employer-not-paying-what-to-do",
 title: "Employer not paying super? What working holiday makers can do in Australia",
 description:
   "Employers are legally required to pay superannuation at 12% of your ordinary earnings. How working holiday makers can check unpaid super through myGov, report it to the ATO, and recover what is owed.",
 category: "Super",
 date: "29 December 2025",
 readTime: 5,
 body: `
Australian employers are legally required to pay [superannuation](/superannuation) into your nominated super fund at the current Superannuation Guarantee rate of 12% of your gross wages. The contributions must be paid at least every three months. If an employer does not pay, the worker can recover the unpaid amount through the ATO under the Superannuation Guarantee Charge regime, or through Fair Work claims for related wage breaches. Unpaid super is one of the most common employer breaches in Australia, particularly in hospitality, farm work, and construction.

For working holiday makers, every dollar of unpaid super is a dollar lost from the DASP payment when leaving Australia. Recovering it before departure is far easier than chasing it from overseas.

## How do you know if super has been paid?

Every employer must pay super to your nominated fund at least every three months, and the payment must appear on:

- Your super fund account statement
- The ATO super contribution record (visible through tax agent access)
- Your payslips, which must show the super accrued for each pay period

The most common pattern of underpayment is that the payslip shows super accruing, but the employer never actually transfers the money to the fund. The accrual on the payslip is not the same as the money arriving. The only proof of payment is the fund statement or the ATO record.

If three months have passed since the end of a quarter and no contributions have appeared in your fund for that quarter, the super is unpaid.

## What does the law say about unpaid super?

The Superannuation Guarantee (Administration) Act requires every employer to pay 12% of ordinary time earnings into super for every employee, including casual workers, by the quarterly deadline. The deadlines are:

- 1 July to 30 September → paid by 28 October
- 1 October to 31 December → paid by 28 January
- 1 January to 31 March → paid by 28 April
- 1 April to 30 June → paid by 28 July

If the employer misses a deadline, they owe not just the contribution but a Superannuation Guarantee Charge, which includes interest and an administration fee. The ATO can pursue the employer for the full amount and pay it into your super account on your behalf. See our article on [the Superannuation Guarantee Charge](/blog/what-is-superannuation-guarantee-charge) for the detail.

## How do you recover unpaid super?

The recovery process has three stages:

1. **Direct request to the employer**. Some employers genuinely missed a payment and will fix it once asked. Make the request in writing (email is best) and reference the specific quarters that are unpaid.
2. **Lodge an unpaid super enquiry with the ATO**. If the employer does not pay after a written request, the ATO can investigate and recover the contributions through the Superannuation Guarantee Charge process.
3. **Fair Work complaint for related wage breaches**. Unpaid super is often accompanied by other wage breaches (underpayment, missing payslips, no records). A Fair Work complaint can address the broader pattern.

The ATO recovery process is the most effective for super specifically, because the ATO has audit and enforcement powers that an individual worker does not have. The investigation can take several months, but once the ATO assesses the employer, the contributions are paid into your super account along with interest.

## What if the employer has gone out of business?

If the employer has gone into liquidation or simply closed up shop before paying super, recovery is still possible through the Superannuation Guarantee Charge process. The ATO becomes a creditor of the failed business and can recover contributions through the liquidation. In some cases the Fair Entitlements Guarantee, a federal government safety net, covers unpaid wages, but it does not cover super.

For working holiday makers, this can mean a delay of six to twelve months between leaving Australia and receiving the unpaid super, but the money is recoverable in most cases.

## Why this matters more for DASP

When you lodge DASP, only the super that is actually in your fund is paid out. Super that the employer has not paid is not in your fund, so it is not part of the DASP payment. If you leave Australia with unpaid super still owed, you have to choose between:

- Delaying DASP until the ATO recovers the contributions
- Lodging DASP now for what is in the fund and pursuing the rest separately

Resolving unpaid super before you depart Australia avoids this split process.

## How does our service handle unpaid super?

When you lodge a DASP through our service, our team:

- Reconciles the contributions that should have been paid (based on the wages reported to the ATO under Single Touch Payroll) against what is actually in your super funds
- Identifies any gaps where wages were reported but super was not paid
- Lodges unpaid super enquiries with the ATO on your behalf for any quarters where contributions are missing
- Coordinates DASP timing so that the maximum amount possible is included in your final payment
- Pursues unpaid super through the ATO even after you have left Australia

Unpaid super is often invisible to the worker until DASP is lodged and the numbers do not add up. [Get in touch with our team](/contact) to check whether your super contributions match what your employers were legally required to pay.

## What about warning on super claims?

Be cautious of anyone outside a registered tax agent offering to "chase your unpaid super" for a fee. Scammers regularly target working holiday makers with offers to investigate super, collect identity documents, and then either disappear or use the documents to commit identity fraud. Never share your TFN or super fund passwords with anyone who is not a registered tax agent. A registered agent has a TAN number listed on the Tax Practitioners Board register.
 `,
 },
 {
 slug: "super-stapling-rule-australia",
 title: "Super stapling rule: how it affects working holiday makers in Australia",
 description:
   "Super stapling links your superannuation to a single fund that follows you between employers. How it works for working holiday makers, what to do with your first job, and how to avoid multiple-fund mess.",
 category: "Super",
 date: "14 January 2026",
 readTime: 4,
 body: `
Super stapling is an Australian rule introduced in November 2021 that links each worker's [superannuation](/superannuation) to a single "stapled" fund. When you start a new job, the employer is required to check the ATO for your stapled fund and pay contributions there, instead of automatically defaulting to the employer's own preferred fund. The rule was designed to stop workers from ending up with multiple small super accounts as they change jobs.

For working holiday makers, super stapling reduces fragmentation but does not eliminate it. Most working holiday makers in their first Australian job do not yet have a stapled fund, so the first employer's default applies, and the stapling chain starts from there.

## How does stapling work?

When you start a new job, the employer asks you to nominate a super fund using a Standard Choice form. If you do not nominate one, the employer is required to:

1. Check the ATO database for your existing "stapled" fund
2. If a stapled fund exists, pay super to that fund
3. If no stapled fund exists, pay super to the employer's default fund

The stapled fund is normally the fund that holds your most recent active super balance. Once set, it follows you between employers until you actively choose a different fund.

## Why stapling does not work cleanly for working holiday makers

For Australian workers who entered the system as teenagers, stapling works as intended: their first super account is stapled, and every subsequent job pays into that fund. For working holiday makers, several practical issues reduce the effectiveness:

- **No prior super on arrival**. A working holiday maker arriving in Australia has no Australian super account, so the first employer's default fund applies.
- **Multiple defaults in quick succession**. Working holiday makers often change employers frequently in their first few months, and stapling does not update fast enough to catch up. The second and third employers may default to their own funds before the first contribution has been recorded as the stapled fund.
- **Cancelled accounts**. Small balances are sometimes transferred to the ATO as unclaimed monies, breaking the stapling chain.

The net result is that working holiday makers commonly still end up with super in two or three funds despite stapling.

## How do you use stapling to your advantage?

The best practical approach for a working holiday maker is to:

1. Choose a super fund actively from the first job, using the Standard Choice form
2. Nominate the same fund at every subsequent job, again using the Standard Choice form
3. Keep a record of the fund details so you can give them to every new employer

See our article on [how to choose a super fund](/blog/how-to-choose-super-fund) for the criteria that matter, particularly insurance options and low fees for small balances.

## What if your super has already been split between funds?

If you have already accumulated super in multiple funds, stapling does not retroactively combine them. The existing balances stay where they are unless you actively roll them over. See our article on [consolidating super across multiple funds](/blog/super-multiple-funds-consolidation) for how to bring them together before DASP.

## Stapling and DASP

When you lodge a DASP, every fund that holds contributions must be claimed separately. Stapling reduces the number of funds for working holiday makers who arrived after late 2021 and chose a single fund early on, but it does not eliminate the need to check every potential fund. The ATO super register lists every account linked to your TFN, and our team searches it before lodging DASP to make sure no fund is missed. See our article on [DASP documents required](/blog/dasp-documents-required) for the full DASP process.

## How does our service handle super stapling?

When you register a TFN with us or lodge a tax return that includes super contributions, we can:

- Identify your current stapled fund through the ATO record
- Confirm whether new employer contributions are going to the right place
- Search for all funds linked to your TFN so no contributions are lost
- Lodge DASP separately for every fund that holds a balance

For working holiday makers planning to stay in Australia for the full visa period and a possible second year, getting the stapling right early saves significant fees over time. [Get in touch with our team](/contact) to review your super setup.
 `,
 },

// ─── WORK RIGHTS ──────────────────────────────────────────────────────────
 {
 slug: "workplace-injury-working-holiday-rights",
 title: "Injured at work on a working holiday visa? Workers compensation rights in Australia",
 description:
   "Working holiday makers injured at work are covered by workers compensation in every Australian state, including for medical costs and lost wages. How to make a claim and what your employer must do.",
 category: "Work Rights",
 date: "20 January 2026",
 readTime: 5,
 body: `
A working holiday maker injured during the course of paid employment in Australia is entitled to make a workers compensation claim through the relevant state or territory scheme. Workers compensation covers medical treatment, rehabilitation, and a percentage of lost wages while you are unable to work. The right to claim does not depend on visa status, length of employment, or whether the employer has insurance in place. Every Australian state and territory requires employers to hold workers compensation insurance for every worker, including casual employees and working holiday makers.

A workplace injury on a working holiday visa is one of the most under-claimed entitlements, often because injured workers assume their visa or short employment history disqualifies them. It does not.

## What injuries are covered?

Workers compensation covers any injury or illness that arises out of, or in the course of, paid employment. This includes:

- Acute injuries (cuts, breaks, sprains, burns) from accidents at work
- Repetitive strain injuries from ongoing work activities
- Mental health conditions caused or aggravated by work
- Diseases contracted because of work (for example, skin conditions from chemical exposure)
- Injuries during work-related travel, in some cases including travel to and from work

The injury does not have to be the employer's fault. Workers compensation is a no-fault scheme: if the injury happened because of work, the claim is valid even if no one acted negligently.

## What does workers compensation cover?

The exact benefits vary by state, but generally cover:

- **Medical treatment**: doctor visits, hospital care, physiotherapy, prescriptions, and ongoing rehabilitation
- **Weekly wage payments**: typically 80% to 95% of your normal weekly wages for the period you cannot work (the percentage drops over time in some states)
- **Lump sum payment for permanent impairment**: if the injury results in lasting impairment
- **Travel expenses**: to and from medical appointments
- **Return-to-work support**: rehabilitation, retraining, and modified duties

The cover continues for as long as the injury affects your ability to work, subject to the state-specific maximum periods.

## What about Medicare and private health insurance?

Workers compensation pays for injury-related medical costs directly, separate from [Medicare](/medicare). This matters for working holiday makers because most are not eligible for Medicare under reciprocal health care arrangements (or have only partial cover). See our article on [Medicare coverage for working holiday makers](/blog/what-is-medicare-working-holiday-makers) for the detail.

For an injury that happens at work, workers compensation is the primary payer, and the worker should not be billed for treatment of that injury.

## How do you make a workers compensation claim?

The process varies by state but generally requires:

1. **Report the injury to the employer immediately**, in writing if possible
2. **See a doctor and obtain a workers compensation medical certificate**
3. **Lodge a claim with the employer's workers compensation insurer**, which the employer is required to forward to the insurer within a short timeframe (usually 5 working days)
4. **Provide ongoing medical certificates** if you continue to be unable to work

The employer cannot legally refuse to lodge a claim, and the insurer must respond within statutory timeframes. If the employer refuses to lodge or pressures you not to claim, this is itself a serious breach and can be reported to the state regulator and to Fair Work for the wider employment breach.

## What if the employer threatens you over a claim?

Some working holiday makers report being threatened with termination, deportation, or visa cancellation if they make a workers compensation claim. None of these threats are legitimate:

- Termination because of a workers compensation claim is unlawful in every state
- Visa cancellation is not triggered by a workers compensation claim
- An employer has no power over your visa status, regardless of what they say

If you are being pressured not to claim, Fair Work and the state workers compensation regulator can intervene. The protections are stronger than most working holiday makers realise.

## What if you are working as a contractor with an ABN?

Workers compensation for contractors is more complicated. Contractors working under an ABN are not automatically covered by the employer's workers compensation insurance. Some workers are classified as contractors when they should legally be employees, and reclassifying them can restore workers compensation cover. See our article on [the difference between an employee and a contractor](/blog/employee-vs-contractor-australia) for the rules.

If the work has the characteristics of employment (set hours, employer-provided equipment, supervised work, single client), the classification may be wrong, and a workers compensation claim is still possible.

## How does our service support injured workers?

While our team is not a workers compensation specialist, the tax and wage consequences of a workplace injury are within our service. For working holiday makers with a workplace injury, our team:

- Reviews any wage records to identify underpayments or unpaid super that often accompany injury cases
- Lodges your [tax return](/tax-return) on the lower income from the injury period (often resulting in a larger refund)
- Coordinates with workers compensation insurers if income from claim payments needs to be reported correctly
- Refers to specialist workers compensation lawyers where the injury is significant

A workplace injury rarely affects only one part of your finances. [Get in touch with our team](/contact) if you have been injured at work and need to understand the wider picture.
 `,
 },
 {
 slug: "unfair-dismissal-working-holiday-australia",
 title: "Unfair dismissal claims for working holiday makers in Australia",
 description:
   "Working holiday makers can make unfair dismissal claims through the Fair Work Commission, but eligibility depends on length of service and employer size. Eligibility rules, time limits, and how to apply.",
 category: "Work Rights",
 date: "23 January 2026",
 readTime: 5,
 body: `
A working holiday maker dismissed from a job in Australia can make an unfair dismissal claim through the Fair Work Commission, provided they meet the minimum employment period and the employer is large enough to fall under the unfair dismissal jurisdiction. The minimum employment period is 6 months for most employers and 12 months for small businesses (fewer than 15 employees). Visa status does not affect eligibility, but length of service and employer size do.

If the dismissal qualifies, the Fair Work Commission can order reinstatement, compensation (up to 26 weeks of pay), or both. Claims must be lodged within 21 days of dismissal.

## What counts as unfair dismissal?

Under the Fair Work Act, a dismissal is unfair if it was:

- **Harsh, unjust, or unreasonable**: the reason given was not valid, or the process was not fair
- **Not consistent with the Small Business Fair Dismissal Code** (for small employers)
- **A genuine redundancy that was not handled properly**

Common patterns of unfair dismissal include:

- Termination without warning for performance issues that were never raised
- Dismissal after raising safety concerns or workers compensation claims
- Dismissal based on discrimination (race, gender, age, pregnancy)
- Failure to follow a proper warning and improvement process
- Dismissal disguised as a "redundancy" when the role was actually filled by someone else

## Who is eligible to make a claim?

Eligibility requires three things:

1. **Minimum employment period completed**: 6 months for businesses with 15 or more employees, 12 months for small businesses
2. **Earnings below the high income threshold**: most working holiday makers are well below this
3. **Covered by an award, enterprise agreement, or earning under the high income threshold**: nearly all working holiday makers are covered

Casual employees can also make unfair dismissal claims if they were employed on a regular and systematic basis for the minimum period. The regular and systematic test focuses on the pattern of shifts, not the casual classification on paper.

## What protections apply during the minimum employment period?

Working holiday makers dismissed before completing the minimum employment period cannot make a standard unfair dismissal claim, but other protections still apply:

- **General Protections claim**: if the dismissal was because of a protected reason (raising a workplace right, making a complaint, discrimination), a claim can be made regardless of length of service
- **Anti-discrimination law**: state and federal anti-discrimination laws cover dismissals based on protected characteristics, with no minimum service period
- **Wage and entitlements claims**: any unpaid wages, leave, or super owed at the time of dismissal can be recovered separately through Fair Work or the ATO

The General Protections route is often more effective for working holiday makers because the minimum employment period does not apply.

## What are the time limits?

The most important deadline is the 21-day rule. An unfair dismissal application must be lodged with the Fair Work Commission within 21 calendar days of the dismissal taking effect. The Commission can grant extensions in exceptional circumstances, but the extensions are rare.

General Protections claims have similar time limits and should also be lodged quickly.

For a working holiday maker about to leave Australia, the 21-day window can be a real problem. If a dismissal happens in your final weeks in the country, getting advice and lodging a claim before you fly out is the practical priority.

## What can you recover?

If the Fair Work Commission finds the dismissal was unfair, it can order:

- Reinstatement to the job (rarely sought by working holiday makers near the end of their visa)
- Compensation up to 26 weeks of pay (capped at half the high income threshold)
- A combination of both

For most working holiday maker cases, the realistic outcome is compensation, often settled at conciliation before the matter goes to a full hearing.

## What about the wage and entitlements side?

Whether or not the dismissal was unfair, you are entitled to:

- All wages owed up to the date of dismissal
- Any accrued annual leave (for permanent employees)
- Any [unpaid super](/blog/super-employer-not-paying-what-to-do)
- Payment in lieu of notice if the contract required notice and none was given

These entitlements are separate from any unfair dismissal claim and can be pursued through Fair Work or, for super, through the ATO. See our article on [what to do if your employer is not paying you correctly](/blog/employer-not-paying-correctly) for the wage side.

## How does our service support dismissed workers?

The unfair dismissal process is handled by the Fair Work Commission and is best supported by specialist employment lawyers for the dismissal claim itself. Our team handles the tax and entitlements side that runs alongside any dismissal:

- Calculating unpaid wages, leave, and super owed at the date of dismissal
- Lodging your [tax return](/tax-return) for the year of dismissal, capturing the reduced income
- Pursuing unpaid super through the ATO if contributions are missing
- Coordinating DASP if you are leaving Australia after the dismissal

If you have been dismissed and are uncertain about the wider financial picture, [get in touch with our team](/contact) before you leave Australia.
 `,
 },
 {
 slug: "bullying-harassment-workplace-working-holiday",
 title: "Workplace bullying & harassment: rights for working holiday makers in Australia",
 description:
   "Bullying and sexual harassment at work are illegal in Australia and protected against by federal and state law. What working holiday makers can do, how to report, and what protections exist.",
 category: "Work Rights",
 date: "25 January 2026",
 readTime: 5,
 body: `
Workplace bullying, discrimination, and sexual harassment are illegal in Australia under the Fair Work Act and state and federal anti-discrimination laws. Working holiday makers have the same legal protections as Australian workers, with no exceptions based on visa status, length of service, or industry. The protections cover behaviour from employers, supervisors, co-workers, and even clients or customers in some cases.

Bullying and harassment of working holiday makers is consistently reported as more common in farm work, hospitality, and isolated work environments, often because workers feel they cannot speak up without risking their job or their visa. None of those risks are legitimate.

## What counts as workplace bullying?

Under the Fair Work Act, workplace bullying is defined as repeated unreasonable behaviour by an individual or group toward a worker that creates a risk to health and safety. The behaviour must be:

- **Repeated**: a single incident is not bullying under this definition (though it may be harassment or assault)
- **Unreasonable**: behaviour that a reasonable person would consider victimising, humiliating, threatening, or intimidating
- **A risk to health and safety**: causing or likely to cause psychological or physical harm

Examples include:

- Verbal abuse or aggressive shouting
- Public humiliation in front of co-workers or customers
- Isolation or exclusion from team activities
- Being given impossible deadlines or unreasonable workloads
- Spreading rumours or false allegations
- Unjustified criticism or threats

Reasonable management action carried out reasonably (genuine performance feedback, allocation of duties, lawful directions) is not bullying, even if the worker finds it unpleasant.

## What counts as sexual harassment?

Sexual harassment is any unwelcome sexual conduct that a reasonable person would consider offensive, humiliating, or intimidating. It includes:

- Unwelcome touching or physical contact
- Sexual jokes, comments, or innuendo
- Showing or sending sexual images
- Repeated unwelcome requests for dates
- Comments about appearance or body
- Stalking or following

Sexual harassment can be a single incident. The "repeated" requirement that applies to bullying does not apply to sexual harassment.

## What protections apply to working holiday makers?

The protections are identical to those for Australian workers:

- **Anti-bullying orders** through the Fair Work Commission, which can stop the behaviour and require workplace changes
- **General Protections claims** if you are dismissed or treated badly for raising a complaint
- **Anti-discrimination claims** under federal or state law, which can result in compensation and orders for change
- **Sexual harassment claims** under the Sex Discrimination Act, with no minimum service period

Visa status is not a relevant factor in any of these processes. An employer cannot use visa status, language barriers, or short-term employment to escape the legal obligations.

## What about threats of visa cancellation?

A common pattern reported by working holiday makers is being threatened with visa cancellation if they complain about bullying, harassment, or unsafe work. These threats are not legitimate. An employer has no power over your visa status:

- The Department of Home Affairs decides visa matters, not employers
- A workplace complaint does not trigger any visa review
- Making a workplace complaint is itself protected behaviour under the Fair Work Act
- Retaliation against you for complaining is an additional breach with its own remedies

If you are being threatened with visa consequences, document the threats (emails, text messages, recorded conversations where legal in your state) and report them to Fair Work along with the underlying complaint.

## How do you make a complaint?

The practical steps are:

1. **Document everything in writing**: dates, times, locations, what was said or done, and who else was present
2. **Report internally if it is safe to do so**: many employers have policies that should activate when a complaint is raised
3. **Contact Fair Work or the relevant anti-discrimination body**: even just for information about your options
4. **Consider an anti-bullying order if the behaviour is ongoing**: the Fair Work Commission can act quickly
5. **Get professional support**: workplace lawyers and union officials regularly handle these matters and many offer free initial consultations

If the behaviour involves physical assault, sexual assault, or stalking, also report to police. These are criminal matters separate from workplace law.

## What about the financial side?

Bullying and harassment often coexist with other employer breaches: underpayment, unpaid super, missing payslips, denial of breaks. A workplace where one set of laws is being broken is statistically much more likely to be breaching others. When you raise a complaint, also check:

- Whether you have been paid correctly (see our article on [employer not paying correctly](/blog/employer-not-paying-correctly))
- Whether your super contributions are up to date (see [unpaid super](/blog/super-employer-not-paying-what-to-do))
- Whether your payslips are accurate and complete
- Whether the right tax has been withheld

## How does our service support workers experiencing workplace mistreatment?

Our team focuses on the financial and tax consequences that often run alongside bullying and harassment cases:

- Reviewing payslips and ATO records for underpayment or unpaid super
- Lodging [tax returns](/tax-return) that capture every employer including ones you may have left in difficult circumstances
- Pursuing unpaid super through the ATO process
- Coordinating DASP if you are leaving Australia

For the bullying or harassment claim itself, the Fair Work Commission, state anti-discrimination bodies, and employment lawyers are the appropriate channels. [Get in touch with our team](/contact) if you need help with the financial side after leaving a workplace.
 `,
 },
 {
 slug: "unpaid-trial-shifts-australia-legal",
 title: "Unpaid trial shifts in Australia: are they legal for working holiday makers?",
 description:
   "Unpaid trial shifts are mostly illegal in Australia under Fair Work Act rules. When a brief trial is permitted, when you must be paid, and what working holiday makers can do if not paid.",
 category: "Work Rights",
 date: "26 January 2026",
 readTime: 4,
 body: `
Unpaid trial shifts in Australia are illegal in most circumstances. Under the Fair Work Act, if a worker is performing productive work that benefits the business, they must be paid at least the minimum wage or the relevant award rate, regardless of what the employer calls it. A brief, supervised demonstration of skills (typically under an hour) may be acceptable as a genuine trial, but anything longer or anything involving real customer service, food preparation, or other productive activity must be paid.

Working holiday makers are the most common target of illegal unpaid trial shifts, particularly in hospitality and retail. The trial shift is positioned as a hiring requirement, but in practice it is a free day of work for the employer.

## What does a legal trial actually look like?

A genuinely legal unpaid trial is:

- **Short**: usually no more than 30 to 60 minutes
- **Supervised**: an actual assessment of skills, not unsupervised work
- **Not productive**: the trial activity does not directly produce work output for paying customers
- **Necessary to assess the skill**: the employer needs to see you perform a specific skill that cannot be assessed at interview

Examples that may be legal:

- Demonstrating a particular knife technique under a chef's supervision for 30 minutes
- Performing a brief role-play of a customer interaction at an interview
- Completing a 20-minute typing test for an admin role

What is not legal:

- A full shift in a busy cafe making and serving coffees
- An eight-hour day on a farm picking produce
- An entire shift on a bar with the worker actually serving customers
- "Working a few hours to see if you fit in"

If you are doing real productive work, you must be paid.

## What does the Fair Work Ombudsman say?

The Fair Work Ombudsman has issued clear guidance that unpaid work trials longer than a brief skills demonstration are unlawful. The Ombudsman has taken action against numerous employers in hospitality, retail, and farm work for using unpaid trials to extract free labour. Penalties for the employer can include back-payment of all wages owed plus penalties of up to several thousand dollars per breach.

## How much should you be paid for a trial?

If a trial shift was unlawfully unpaid, you are owed wages at the relevant minimum rate for the hours worked. For most working holiday maker jobs:

- The minimum wage (currently $24.95 per hour as of July 2025)
- Or the higher award rate for the industry (hospitality, retail, agriculture all have their own awards)
- Plus casual loading (usually 25%) if you were a casual worker
- Plus penalty rates if the trial was on a weekend, evening, or public holiday

For a full eight-hour unpaid trial on a Saturday in hospitality, the wages owed can easily be over $250 once casual loading and penalty rates are applied. See our article on [penalty rates](/blog/penalty-rates-australia) for the detail.

## What if you were not hired after the trial?

The legal position is the same whether or not you were offered the job. The work was performed; the wages are owed. The Fair Work Ombudsman has recovered wages for many workers who completed unpaid trials and were not subsequently hired, on the basis that the trial itself constituted work for which payment was due.

## How do you recover unpaid trial wages?

The steps are:

1. **Request payment in writing**: email the employer with the date, hours worked, and the amount owed
2. **Calculate the correct amount**: using minimum wage or the award rate plus loadings
3. **Lodge a complaint with the Fair Work Ombudsman** if the employer refuses
4. **Make sure super was also accounted for**: if you were paid, super should have been paid too

The Fair Work Ombudsman can investigate, issue compliance notices, and pursue penalties against the employer. The process is free.

## How do you spot the pattern?

Employers who use unpaid trials often run similar patterns across multiple workers:

- "Come in for a trial shift on Saturday and we'll let you know"
- "Just work tonight and see if you fit in"
- "It's standard in hospitality, everyone does a trial"
- "We don't pay for trials but you'll get tips"

None of these statements change the legal position. If you are doing productive work, you must be paid.

## How does our service support trial shift recovery?

While Fair Work is the primary channel for recovering unpaid trial wages, the wages owed often connect to wider issues:

- Tax should have been withheld and a Tax File Number Declaration form completed (see our article on [tax file number declaration form](/blog/tax-file-number-declaration-form))
- Super should have been paid on the wages
- The work should have been reported to the ATO under Single Touch Payroll

When you lodge your [tax return](/tax-return) through our service, we identify any work that should have been reported to the ATO but was not, and any related super gaps. [Get in touch with our team](/contact) if you have completed unpaid trial shifts and want to understand your options.
 `,
 },
 {
 slug: "uniform-laundry-deductions-illegal-australia",
 title: "Uniform & laundry deductions from wages in Australia: legal or not?",
 description:
   "Employers in Australia can only deduct money from your wages in narrow legal circumstances. When uniform and laundry deductions are illegal, and how working holiday makers can recover deducted amounts.",
 category: "Work Rights",
 date: "29 January 2026",
 readTime: 4,
 body: `
Under the Fair Work Act, an employer can only deduct money from an employee's wages in very narrow circumstances: the deduction must be authorised by the employee in writing, must be principally for the employee's benefit, or must be required by law (such as PAYG tax). Deductions for uniform purchases, laundry charges, breakages, customer walk-outs, till shortages, or "training fees" are almost always illegal, regardless of what the employment contract says.

Working holiday makers in hospitality, retail, and farm work are routinely subjected to these illegal deductions, often because employers know the workers will not push back or report them.

## What deductions are actually legal?

The legal deductions an employer can take from your wages are:

- **PAYG tax**: required by law, calculated according to your TFN status and visa
- **Superannuation salary sacrifice**: only if you have signed up specifically for it
- **Court orders**: child support, garnishee orders
- **Union dues**: if you have signed up specifically
- **Employee-authorised payments**: things you have asked the employer to pay on your behalf in writing, such as a gym membership

These are the only categories. Anything else taken from your wages without your specific written authorisation is unlawful.

## What are the common illegal deductions?

The most common illegal deductions targeting working holiday makers are:

- **Uniform purchase**: the employer charges you for a uniform that is required for the job (legal position: the cost is the employer's, not yours)
- **Laundry charge**: a weekly or per-shift deduction for "laundering" your uniform
- **Breakages**: the cost of broken glasses, plates, or other items deducted from your wages
- **Till shortages**: cash register discrepancies deducted from staff wages collectively
- **Customer walk-outs**: deductions when customers leave without paying
- **Training fees**: a deduction or "bond" for time spent learning the job
- **Equipment**: deductions for tools, knives, or other equipment "loaned" to the worker
- **Notice not given**: deductions of unpaid wages because the worker did not give two weeks notice

Even if a contract or employee handbook lists these as deductions, the Fair Work Act overrides the contract. A clause in a contract authorising an illegal deduction is unenforceable.

## What is the test for whether a deduction is legal?

The Fair Work Act requires that a deduction be:

1. **Authorised in writing by the employee**, with the authorisation specifying the amount and the purpose, AND
2. **Principally for the employee's benefit**

The second test is critical. Even with written authorisation, a deduction that benefits the employer rather than the employee is not lawful. A laundry deduction benefits the employer (clean uniforms in a controlled state); it does not benefit the employee. A till shortage deduction benefits the employer; it does not benefit the employee.

The only deductions that pass the "principally for the employee's benefit" test are things like a salary sacrifice into super, a gym membership the employee chose, or a savings plan the employee asked to be set up.

## What about uniform "deposits" or "bonds"?

Some employers charge a uniform "deposit" or "bond" that is refundable when the uniform is returned. This is sometimes structured as a deduction from the first pay. The legal position is:

- The deposit is still a deduction from wages
- It must be authorised in writing
- It must pass the "benefit" test (which it typically does not)
- Even if otherwise lawful, the bond must be returned in full when the uniform is returned

Most uniform deposit schemes are unlawful, and the wages can be recovered.

## How do you recover illegal deductions?

The process is:

1. **Calculate the total amount deducted** across all pay periods
2. **Request repayment in writing** from the employer with a breakdown of the deductions
3. **Lodge a complaint with the Fair Work Ombudsman** if the employer refuses
4. **Provide payslips and bank records** as evidence

The Fair Work Ombudsman can recover the wages directly and pursue penalties against the employer. The process is free and the worker does not need a lawyer.

## Why this matters for tax

Illegal deductions reduce the gross wages reported on your payslip, which:

- Reduces the income reported to the ATO and the tax withheld
- Reduces the super contributions paid by the employer
- Creates a mismatch between what the employer paid in cash and what was reported

When you lodge your [tax return](/tax-return) through our service, we cross-check the wages reported to the ATO against your payslips to identify any pattern of under-reporting. Where deductions have been illegally taken, the recovery is pursued through Fair Work and the corrected wages feed into the tax assessment.

## How does our service support workers with illegal deductions?

When you lodge through our team, we:

- Review payslips for any deductions that appear unlawful
- Calculate the wages that should have been paid against what was actually paid
- Identify [unpaid super](/blog/super-employer-not-paying-what-to-do) connected to underpaid wages
- Refer Fair Work claims for the wage recovery (we do not lodge Fair Work claims directly, but we coordinate with the wage recovery)
- Lodge the [tax return](/tax-return) and DASP correctly based on the wages actually owed

[Get in touch with our team](/contact) if you suspect your employer has been deducting amounts from your wages that should not have been taken.
 `,
 },

// ─── MEDICARE & OTHER ─────────────────────────────────────────────────────
 {
 slug: "uk-medicare-reciprocal-agreement-australia",
 title: "UK-Australia Reciprocal Health Care Agreement: what British backpackers get",
 description:
   "British citizens on a working holiday visa are covered by the Reciprocal Health Care Agreement (RHCA) between the UK and Australia. What is included, what is not, and how to enrol on arrival.",
 category: "Medicare & Other",
 date: "3 February 2026",
 readTime: 5,
 body: `
British citizens on a working holiday visa in Australia are covered by the Reciprocal Health Care Agreement (RHCA) between the United Kingdom and Australia. The agreement allows British visitors to receive medically necessary treatment under [Medicare](/medicare), broadly equivalent to what an Australian resident receives in a public hospital setting. The cover does not extend to non-essential care, dental treatment, optical treatment, or treatment that can wait until the worker returns to the UK. Private health insurance is still strongly recommended to cover the gaps.

The RHCA is one of the most useful agreements available to working holiday makers, but it is also one of the most misunderstood. British travellers regularly assume it provides full UK-style NHS cover, which it does not.

## What is covered under the RHCA?

The agreement covers "medically necessary treatment" that cannot reasonably wait until you return to the UK. In practice, this means:

- Emergency hospital treatment (admission as a public patient)
- GP visits at the bulk-billed Medicare rate (though many GPs in Australia do not bulk-bill)
- Subsidised medicines on the Pharmaceutical Benefits Scheme (PBS)
- Out-patient hospital treatment
- Maternity care if pregnancy was not known about before arrival

The standard is "medically necessary", meaning treatment that a doctor considers needs to be provided before you would normally return home.

## What is not covered?

The RHCA explicitly excludes:

- Treatment booked or planned before travelling to Australia
- Elective surgery or treatment that can wait until you return home
- Dental treatment (except for limited public dental in some cases)
- Optical treatment, glasses, or contact lenses
- Physiotherapy, chiropractic, or other allied health unless part of in-patient hospital care
- Private hospital treatment
- Ambulance services in most states (ambulance is not Medicare-covered for anyone)
- Treatment in a private hospital or as a private patient in a public hospital
- Cosmetic procedures
- Treatment outside of Australia (for example, if you travel to New Zealand or Indonesia)

The exclusions are substantial, and most of the things working holiday makers actually need (dental, physio, glasses, ambulance) are not covered.

## How do you enrol in Medicare under the RHCA?

British citizens enrol in Medicare at a Services Australia (Medicare) office in person, presenting:

- A valid UK passport
- The working holiday visa grant notice
- A UK residential address (proof not always required)
- An Australian residential address

Enrolment is free and usually completed on the same day. A Medicare card is issued and posted to the Australian address within a few weeks. Until the card arrives, the enrolment record can be used at hospitals and bulk-billing GPs.

Enrolment should be done within the first few weeks of arriving in Australia. Some hospitals will provide emergency treatment without a Medicare number and bill the patient, with the option of reclaiming the cost later, but it is much smoother to be enrolled before any treatment is needed.

## How does the RHCA interact with the Medicare levy?

The [Medicare levy](/blog/medicare-levy-working-holiday-makers) is a tax of 2% on Australian residents' taxable income, used to fund Medicare. Working holiday makers are not Australian residents for tax purposes, so the Medicare levy generally does not apply. However, the levy interaction depends on how your tax residency is assessed. For most working holiday makers, no Medicare levy is paid even if Medicare is used.

## Why you still need private or travel insurance

The gaps in the RHCA mean that British working holiday makers should still have either travel insurance or Australian private health insurance for:

- Ambulance (not Medicare-covered in most states; can cost over $1,000 for a single ride)
- Dental emergencies
- Optical needs
- Repatriation home if seriously ill or injured
- Loss of personal items, trip cancellation, and travel-related risks
- Elective treatment

See our article on [travel insurance vs health insurance](/blog/travel-insurance-vs-health-insurance-working-holiday) for the difference between the two and which fills which gap.

## What happens if you need treatment that the RHCA does not cover?

If you need treatment not covered by the RHCA, you have three options:

1. **Pay out of pocket**, which can be very expensive for hospital care
2. **Claim through travel insurance**, if your policy covers the treatment
3. **Return to the UK for treatment**, if it can wait

Repatriation to the UK is the standard travel insurance fallback for serious injuries or illnesses that need ongoing care. Without travel insurance, the cost of repatriation can be tens of thousands of dollars.

## How does our service support British working holiday makers?

The Medicare and RHCA process is handled by Services Australia, not by our team directly. Where our service connects is on the tax side, where Medicare enrolment status affects:

- Whether the [Medicare levy](/blog/medicare-levy-working-holiday-makers) applies to your tax return
- How the Medicare Levy Surcharge applies (rarely relevant for working holiday makers)
- How private health insurance premiums interact with the tax system

When you lodge your [tax return](/tax-return) through our service, we account for your Medicare status correctly so the levy is either applied or excluded as it should be. [Get in touch with our team](/contact) if you are uncertain about how Medicare and the levy affect your tax position.
 `,
 },
 {
 slug: "german-european-health-insurance-australia-working-holiday",
 title: "Health insurance for German working holiday makers in Australia: what you need",
 description:
   "Germany does not have a Reciprocal Health Care Agreement with Australia, meaning German working holiday makers are not covered by Medicare. What cover you need, options, and how to enrol before travelling.",
 category: "Medicare & Other",
 date: "6 February 2026",
 readTime: 5,
 body: `
Germany does not have a Reciprocal Health Care Agreement with Australia. German working holiday makers are therefore not eligible for [Medicare](/medicare) and cannot rely on the Australian public health system for free or subsidised treatment. Any medical treatment received in Australia must be paid for through private health insurance, travel insurance, or out of pocket. This is one of the most significant practical differences between travelling to Australia as a German citizen and travelling as a British or Irish citizen.

Without proper insurance, a single hospital admission in Australia can cost tens of thousands of euros. German travellers regularly underestimate the gap because their experience with the German social health insurance system gives them no preparation for a country where treatment must be paid for upfront.

## Which countries have RHCAs with Australia?

Australia has Reciprocal Health Care Agreements with a limited list of countries. The current list is:

- United Kingdom
- Ireland
- New Zealand
- Sweden
- Netherlands
- Finland
- Norway
- Belgium
- Slovenia
- Malta
- Italy

Germany is not on the list. Neither is France, Spain, Austria, Switzerland, the United States, Canada, or Japan. See our article on [which countries have a Medicare agreement with Australia](/blog/countries-with-medicare-agreement-australia) for the full detail.

## What does this mean in practice?

Without RHCA cover, a German working holiday maker who needs medical treatment in Australia is treated as a private patient. The costs include:

- **GP visit**: typically $80 to $120 for a standard consultation
- **Specialist visit**: $200 to $400
- **Emergency room visit**: $400 to $800 for a non-admitted visit
- **Hospital admission**: $1,500 to $5,000 per day in a public hospital as a private patient
- **Surgery**: $10,000 to $100,000+ depending on procedure
- **Ambulance**: $400 to $1,500 per ride (also not Medicare-covered for anyone)
- **Prescription medicines**: full price (no PBS subsidy)

Treatment is provided regardless of ability to pay in genuine emergencies, but the bills follow afterwards. Australian hospitals routinely pursue overseas patients for unpaid bills through international debt collection.

## What insurance is required for the working holiday visa?

The German working holiday visa to Australia (subclass 462 for Germans under the Work and Holiday Programme) requires adequate health insurance for the duration of the stay as a condition of grant. The Department of Home Affairs does not specify a particular insurance product, but the cover must be:

- Valid for the full duration of the visa
- Cover at least basic medical treatment in Australia
- Cover repatriation if needed

In practice, most German working holiday makers meet this requirement through one of:

- A comprehensive travel insurance policy for the full visa duration
- Australian Overseas Visitors Health Cover (OVHC), purchased from an Australian private health fund
- A combination of both

The Australian OVHC option is broadly equivalent to Medicare cover and is purchased month-by-month or for the full visa period.

## Travel insurance vs Overseas Visitors Health Cover

The two options have different strengths:

**Travel insurance**:
- Covers a broader range of risks (cancellation, lost baggage, theft)
- Includes repatriation
- Usually has higher excess amounts
- Often excludes pre-existing conditions
- Limited duration (usually 12 months maximum)

**OVHC**:
- Specifically designed for medical cover in Australia
- Lower excess for routine medical visits
- Can include extras (dental, optical) for an additional premium
- Renewable indefinitely while in Australia
- Does not cover non-medical travel risks

Most German working holiday makers benefit from having both, particularly if they plan to travel within Australia or to nearby countries during the visa period.

## German statutory health insurance and travel cover

If you are insured under the German statutory health system (gesetzliche Krankenversicherung) before leaving Germany, your cover does not extend to Australia. The statutory system covers EU countries and a small number of treaty countries; Australia is not included. Some private German health insurance policies do include international travel cover, but this typically caps at 6 weeks per trip, which is insufficient for a working holiday visa.

The practical approach for most German travellers is:

- Suspend or maintain German statutory cover according to the Anwartschaftsversicherung rules
- Take out separate Australian or international travel/health cover for the visa period
- Reactivate German cover on return to Germany

This is a personal financial planning question rather than a tax one, but it is worth being aware of before departing Germany.

## How does this interact with the Medicare levy?

Because German working holiday makers are not eligible for Medicare, the [Medicare levy](/blog/medicare-levy-working-holiday-makers) does not apply to them. The 2% Medicare levy is charged to Australian residents who are eligible for Medicare, and working holiday makers are generally not in that category. The levy is therefore excluded from German working holiday makers' tax assessments.

## What about emergencies and repatriation?

In a genuine medical emergency, Australian hospitals provide treatment regardless of insurance status. The bill is presented afterwards. Without insurance, the costs can be catastrophic:

- A serious injury requiring hospital admission and surgery can result in bills over $100,000
- ICU treatment can run to $5,000 to $10,000 per day
- Air ambulance evacuation from a remote area can exceed $50,000
- Repatriation to Germany on a medical flight can exceed $80,000

Adequate travel or health insurance is not optional for a German working holiday maker in any practical sense. The visa condition exists for a reason.

## How does our service support German working holiday makers?

While we do not sell health insurance, the Medicare and insurance status affects:

- Whether the [Medicare levy](/blog/medicare-levy-working-holiday-makers) applies to your tax return (usually no for Germans)
- Whether private health insurance premiums interact with the tax system
- Your overall tax position in Australia

When you lodge your [tax return](/tax-return) through our service, we account for your Medicare status correctly so the levy is excluded if you are not eligible. [Get in touch with our team](/contact) if you are uncertain about how Medicare and the levy affect your German tax position.
 `,
 },
 {
 slug: "private-health-insurance-working-holiday-australia",
 title: "Do working holiday makers need private health insurance in Australia?",
 description:
   "Private health insurance is a visa condition for many working holiday visas and a practical necessity for travellers from countries without a Reciprocal Health Care Agreement. What cover to look for and average costs.",
 category: "Medicare & Other",
 date: "15 February 2026",
 readTime: 4,
 body: `
Private health insurance is a visa condition for many working holiday visas issued to Australia, particularly the subclass 462 Work and Holiday visa. The cover is also a practical necessity for working holiday makers from countries without a Reciprocal Health Care Agreement (RHCA) with Australia, including Germany, France, Spain, the United States, Canada, and Japan. For working holiday makers from RHCA countries (UK, Ireland, Netherlands, Sweden, and others), private cover supplements [Medicare](/medicare) by paying for the things Medicare does not cover.

The cost of private cover is modest compared with the cost of going without it. A single emergency hospital admission in Australia without insurance can exceed $20,000.

## Is private health insurance a visa condition?

The visa conditions vary by subclass and nationality:

- **Subclass 417 (Working Holiday)**: most nationalities are not required to have insurance as a strict visa condition, but it is strongly recommended
- **Subclass 462 (Work and Holiday)**: most agreements with Australia under this subclass require adequate health insurance for the duration of the visa, with the specific requirement varying by country

The Department of Home Affairs does not usually check insurance on entry, but a breach of a visa condition can be raised later, and going without insurance is risky regardless of the legal requirement.

## What types of insurance are available?

The two main options are travel insurance and Overseas Visitors Health Cover (OVHC).

**Travel insurance** is bought from a travel insurance provider, usually before leaving home or shortly after arrival. It covers:

- Emergency medical treatment in Australia
- Hospital admission
- Repatriation to home country
- Trip cancellation, lost baggage, theft, and other travel-related risks
- Personal liability in some cases

Coverage periods are usually capped at 12 to 18 months, with the option of extension.

**Overseas Visitors Health Cover (OVHC)** is bought from an Australian private health fund and provides cover similar to Medicare, plus optional extras. It covers:

- Public and private hospital treatment
- GP visits
- Specialist consultations
- Pharmaceuticals
- Optional extras: dental, optical, physiotherapy, chiropractic

OVHC can be renewed indefinitely while in Australia and is the better option for working holiday makers who plan to spend longer than 12 months and want comprehensive medical cover.

Most working holiday makers benefit from having both: travel insurance for the broader travel risks and OVHC for ongoing medical cover.

## How does cover differ for RHCA countries?

If you are from an RHCA country (UK, Ireland, Sweden, Netherlands, Finland, Norway, Belgium, Slovenia, Malta, Italy, New Zealand), you can enrol in [Medicare](/medicare) and use the Australian public system for medically necessary treatment. Private cover is therefore a top-up rather than a primary insurance.

For RHCA nationals, the main gaps that private cover fills are:

- Ambulance (not Medicare-covered)
- Dental
- Optical
- Physiotherapy and other allied health outside hospital care
- Repatriation if seriously ill or injured

For non-RHCA nationals (Germany, France, Spain, USA, Canada, Japan, and others), private cover is the only health insurance available and must be comprehensive.

## How much does it cost?

OVHC costs vary by fund and level of cover:

- Basic hospital cover for a single adult: $80 to $150 per month
- Comprehensive hospital cover: $150 to $250 per month
- Hospital plus extras: $200 to $350 per month

Travel insurance for a 12-month working holiday typically costs $400 to $1,200 depending on cover level, age, and the activities included (some adventure activities and farm work require additional cover).

## What about ambulance cover?

Ambulance services are not covered by Medicare in most Australian states. A single ambulance ride can cost $400 to $1,500. Both OVHC and most travel insurance policies include ambulance cover, but the level varies. Worth checking before relying on it.

In Queensland and Tasmania, ambulance services are provided free or at low cost to residents under state schemes. In other states, ambulance is a private cost regardless of nationality.

## Does private health insurance affect your tax?

For most working holiday makers, no. The Medicare Levy Surcharge, which applies to high-income Australian residents without private hospital cover, does not apply to working holiday makers because they are typically not tax residents. The 2% [Medicare levy](/blog/medicare-levy-working-holiday-makers) is also generally not applied to working holiday makers.

Some private health insurance premiums attract a government rebate, but the rebate is only available to Medicare-eligible Australian residents and does not apply to working holiday maker OVHC.

## What to look for in a policy

When choosing private health cover, check:

- **Excess**: the amount you pay out of pocket before the insurance kicks in
- **Waiting periods**: pre-existing conditions are often excluded for 12 months
- **Geographic coverage**: some policies only cover Australia, others cover travel within the region
- **Pregnancy and maternity**: usually excluded or subject to long waiting periods
- **Mental health**: cover varies significantly between policies
- **Adventure activities**: bungee jumping, scuba diving, skydiving may need additional cover
- **Farm work**: some policies exclude or limit cover for agricultural work

## How does our service support working holiday makers?

Our team does not sell health insurance directly, but health insurance status and Medicare eligibility affect your tax position. When you lodge your [tax return](/tax-return) through our service, we account for:

- Whether the Medicare levy applies (usually not for working holiday makers)
- Whether the Medicare Levy Surcharge applies (rarely)
- Any private health insurance rebate (rarely applicable to working holiday makers)

If you are uncertain about how your insurance status affects your tax, [get in touch with our team](/contact).
 `,
 },
 {
 slug: "emergency-medical-care-working-holiday-no-medicare",
 title: "Emergency medical care without Medicare in Australia: what backpackers should know",
 description:
   "Working holiday makers without Medicare cover can still receive emergency treatment in Australian public hospitals - but the cost is the patient's responsibility. Typical fees, what insurance covers, and what to expect.",
 category: "Medicare & Other",
 date: "16 February 2026",
 readTime: 5,
 body: `
A working holiday maker who is not covered by [Medicare](/medicare) or a Reciprocal Health Care Agreement (RHCA) can still receive emergency medical treatment in Australia. Public hospitals provide emergency care regardless of insurance or ability to pay, but the patient is billed afterwards as a private patient. The bills can run to thousands or tens of thousands of dollars depending on the treatment. For working holiday makers from non-RHCA countries (Germany, France, Spain, USA, Canada, Japan), private health insurance or comprehensive travel insurance is the only realistic way to manage the cost.

The most important practical knowledge for any working holiday maker is what number to call, where to go, and what your insurance will and will not cover before an emergency happens.

## What number do you call?

In any medical emergency in Australia, the number to call is **000** (zero zero zero). This is the equivalent of 999 in the UK or 112 in Germany. The 000 service connects to police, fire, and ambulance, and you specify which service you need.

For non-life-threatening situations, the **healthdirect** line on **1800 022 222** provides 24-hour telephone advice from registered nurses and can direct you to the right level of care.

For a GP after hours, the **National Home Doctor Service** on **13 SICK (137 425)** dispatches doctors to your accommodation in most metropolitan areas. The visit is bulk-billed for Medicare-eligible patients, and private patients pay around $100 to $150.

## What is covered if you have insurance?

The cover depends on your insurance type:

**OVHC (Australian private health insurance for visitors)** typically covers:

- Emergency department visits at public and private hospitals
- Hospital admission as a private patient
- Surgical treatment
- Inpatient pharmaceuticals
- Ambulance (varies by policy)
- Most diagnostic imaging and pathology

**Travel insurance** typically covers:

- Emergency medical and hospital treatment
- Repatriation if needed
- Ambulance
- Out-patient treatment in some cases
- Trip-related costs (cancellation, lost baggage)

**RHCA Medicare cover** (for UK, Irish, and other RHCA nationals) covers:

- Public hospital emergency treatment
- Subsidised GP visits at bulk-billing clinics
- Subsidised pharmaceuticals through the PBS
- See our article on [the UK-Australia Medicare reciprocal agreement](/blog/uk-medicare-reciprocal-agreement-australia) for the detail

What is rarely covered by any of these:

- Ambulance services (varies by state and policy)
- Repatriation home (Medicare/RHCA does not cover this; travel insurance usually does)
- Dental emergencies (limited cover under most policies)
- Mental health crises (limited cover and long waiting periods on many policies)

## What does emergency treatment cost without insurance?

For a non-RHCA working holiday maker without OVHC or travel insurance, typical bills include:

- **Emergency department visit, not admitted**: $400 to $800
- **Emergency department visit with overnight admission**: $1,500 to $5,000
- **Multi-day hospital admission with surgery**: $10,000 to $50,000
- **ICU admission**: $5,000 to $10,000 per day
- **Air ambulance from a remote area**: $20,000 to $80,000
- **International medical flight repatriation**: $50,000 to $150,000

These costs are not theoretical. Australian hospitals routinely pursue overseas patients for unpaid bills through international debt collection.

## What happens if you cannot pay?

Hospitals do not refuse emergency treatment because the patient cannot pay. The treatment happens, and the billing is dealt with afterwards. The options for patients who cannot pay include:

- **Negotiated payment plans** with the hospital, sometimes over years
- **Charity programmes** at some public hospitals
- **Travel insurance claims** if you have coverage
- **Embassy assistance** in extreme cases (some embassies can advance funds in genuine emergencies, but the funds must be repaid)

Going without insurance is not a viable strategy for any working holiday maker. The risk of catastrophic costs is real.

## Where to go: public vs private hospital

For an emergency, the choice is between a public hospital emergency department and a private hospital emergency department.

**Public hospital emergency departments** are free for Medicare-eligible patients (Australian residents and RHCA-country nationals enrolled in Medicare). Non-RHCA working holiday makers are billed as private patients at the public hospital, but the rates are generally lower than at private hospitals.

**Private hospital emergency departments** charge from the first minute and are more expensive across the board, but waiting times are often shorter and the facilities are usually more modern.

For most working holiday makers, the public hospital is the right choice for serious emergencies. The treatment quality is high, and the cost (even as a private patient) is more manageable.

## What to do after an emergency

If you have received emergency treatment in Australia:

1. **Keep every document**: discharge summary, medication list, scan results, bills
2. **Contact your insurer immediately**, ideally while still in hospital
3. **Document what happened** with dates, times, and treating staff
4. **Get receipts for everything**, including pharmacy purchases and follow-up appointments
5. **Lodge the insurance claim promptly**, with the supporting documents
6. **Keep copies of all correspondence** with hospitals, insurers, and embassies

If you are unable to work for an extended period because of the injury or illness, this also affects:

- Your wages and any [unpaid super](/blog/super-employer-not-paying-what-to-do)
- Your [tax return](/tax-return) for the financial year (often a larger refund because of reduced income)
- Your visa timing if the recovery extends past the visa expiry
- Your DASP eligibility if you have to leave earlier than planned

## How does our service support working holiday makers after a medical emergency?

While our team does not handle the medical care or insurance claims directly, the financial and tax consequences of a medical event are within our service:

- Reviewing wages and super for the period before and after the event
- Lodging the [tax return](/tax-return) on the reduced income (often resulting in a larger refund)
- Coordinating DASP timing if you have to leave Australia earlier than planned
- Reviewing any insurance payouts that may have tax implications

A medical emergency rarely affects only one part of your life. [Get in touch with our team](/contact) for help with the financial side after a medical event.
 `,
 },
 {
 slug: "travel-insurance-vs-health-insurance-working-holiday",
 title: "Travel insurance vs private health insurance for working holiday makers",
 description:
   "Travel insurance and Australian private health insurance cover different things. What working holiday makers actually need, when each one applies, and why both may be worth having.",
 category: "Medicare & Other",
 date: "21 February 2026",
 readTime: 5,
 body: `
Travel insurance and Australian private health insurance (specifically Overseas Visitors Health Cover, or OVHC) cover different things. Travel insurance is a broad policy bought from a travel insurance provider that covers medical emergencies plus trip-related risks like cancellation, lost baggage, and repatriation. OVHC is a domestic Australian health insurance product that covers medical and hospital treatment within Australia, similar to [Medicare](/medicare) but for non-residents. Working holiday makers often need both, particularly if they are from a country without a Reciprocal Health Care Agreement with Australia.

The choice between travel insurance and OVHC is not really either-or. The right answer for most working holiday makers is a combination that fills the gaps in each.

## What does travel insurance cover?

A comprehensive travel insurance policy typically covers:

- **Medical emergencies**: hospital treatment, surgery, doctor visits in Australia
- **Repatriation**: flying you home if seriously ill or injured
- **Trip cancellation**: refund of pre-paid travel costs if you cannot travel
- **Lost or stolen baggage**: replacement of essential items
- **Trip interruption**: costs if your travel is interrupted by illness or emergency
- **Personal liability**: if you accidentally injure someone or damage property
- **Emergency evacuation**: from remote areas, by air if needed
- **Cancellation of paid activities**: tours, accommodation, transport

Coverage periods are usually capped at 12 to 18 months, with renewal options for longer stays. Many policies also exclude or limit cover for:

- Pre-existing medical conditions
- High-risk activities (some adventure sports, scuba diving below certain depths, motorcycle riding without a licence)
- Work-related injuries (this is a critical gap for working holiday makers, see below)

## What does OVHC cover?

OVHC is purchased from an Australian private health fund and is structured like Medicare cover. A typical OVHC policy includes:

- **Public and private hospital admission**
- **Emergency department visits**
- **GP consultations** (usually with a small gap fee)
- **Specialist consultations**
- **Subsidised pharmaceuticals**
- **Diagnostic imaging and pathology**
- **Optional extras**: dental, optical, physiotherapy, chiropractic

OVHC is renewable indefinitely while in Australia and can be the primary cover for ongoing medical needs. The premiums are paid monthly or annually, and the cover starts on a chosen date.

OVHC typically does not cover:

- Repatriation home
- Travel within Australia or to nearby countries
- Trip cancellation
- Lost baggage or theft of personal items

## Why do working holiday makers often need both?

The reason both are usually appropriate is that each covers what the other does not:

- **Medical emergency in Sydney**: covered by both OVHC and travel insurance, but OVHC is typically faster to claim and has lower gaps
- **Repatriation to Germany after serious injury**: covered by travel insurance, not by OVHC
- **Lost passport in Cairns**: covered by travel insurance, not by OVHC
- **Theft of laptop and phone**: covered by travel insurance, not by OVHC
- **Routine GP visit for a respiratory infection**: covered by OVHC, partially by travel insurance with high excess
- **Trip to New Zealand or Bali during the working holiday**: covered by travel insurance, not by OVHC

For a working holiday maker staying for a full 12 months and travelling within Australia, having both fills nearly all the realistic gaps.

## The work-related injury gap

The single biggest insurance gap most travel insurance policies have for working holiday makers is **exclusion of work-related injuries**. Most travel insurance policies are designed for tourists, not for travellers earning wages. If you are injured while working at a farm, in hospitality, in construction, or in any other paid role, the travel insurance policy may refuse the claim.

Work-related injuries are instead covered by:

- **Workers compensation** through your employer (see our article on [workplace injury rights](/blog/workplace-injury-working-holiday-rights))
- **OVHC** for treatment costs not covered by workers compensation
- **Medicare** (for RHCA-country nationals enrolled in Medicare)

Always check the work-related exclusion in any travel insurance policy before assuming you are covered.

## Cost comparison

Approximate annual costs for a single working holiday maker:

- **OVHC, basic hospital only**: $1,000 to $1,800 per year
- **OVHC, hospital plus extras**: $1,800 to $4,000 per year
- **Comprehensive travel insurance, 12 months**: $400 to $1,200 per year
- **Combined OVHC and travel insurance**: $1,500 to $5,000 per year

The combined cost might seem high, but a single uninsured emergency can cost more than the lifetime cover.

## What to look for in either product

When choosing either type of insurance, check:

- **Excess**: how much you pay out of pocket before the insurance applies
- **Waiting periods**: pre-existing conditions, pregnancy, mental health
- **Geographic coverage**: Australia only or wider region
- **Activity exclusions**: adventure sports, working with animals, farm work
- **Work-related exclusions**: critical for working holiday makers
- **Repatriation cover and limits**
- **Mental health cover**
- **Dental and optical coverage**
- **Claims process**: how quickly claims are processed and paid

## How does insurance interact with tax?

For most working holiday makers, neither travel insurance nor OVHC affects your tax position:

- Premiums are not deductible against working holiday income
- Claim payouts are generally not taxable income
- The Medicare Levy Surcharge does not usually apply (working holiday makers are typically not Australian residents for tax)
- The private health rebate does not apply to OVHC for working holiday makers

When you lodge your [tax return](/tax-return) through our service, we account for your insurance status correctly so the levy is excluded where it should be. [Get in touch with our team](/contact) if you are uncertain about how your insurance affects your tax position.

## How does our service support working holiday makers?

Our team does not sell insurance, but we coordinate with the financial and tax implications of insurance and medical events:

- Reviewing how insurance status affects [Medicare levy](/blog/medicare-levy-working-holiday-makers) on your tax return
- Identifying tax interactions if you receive an insurance payout
- Coordinating DASP and tax timing if illness or injury affects your departure date

A working holiday maker's insurance setup is a personal decision, but the tax side connects to it. [Get in touch with our team](/contact) for help with the tax interactions.
 `,
 },

// ─── NEW POSTS - BATCH 2 (10 articles) ───────────────────────────────────

// ─── WORK RIGHTS - AWARDS ────────────────────────────────────────────────
 {
 slug: "hospitality-award-working-holiday-makers",
 title: "Hospitality Award (MA000009): pay rates for working holiday makers in Australia",
 description:
   "The Hospitality Award (MA000009) sets minimum pay rates, penalty rates, and conditions for most hospitality workers in Australia. What working holiday makers in pubs, hotels and clubs should be paid.",
 category: "Work Rights",
 date: "24 February 2026",
 readTime: 5,
 body: `
The Hospitality Industry (General) Award 2020, known as MA000009 or the Hospitality Award, is the modern award that sets minimum legal pay rates, classifications, penalty rates, allowances, and conditions for most workers in the Australian hospitality industry. The award applies to working holiday makers on the same terms as it applies to Australian workers. If you work in a hotel, motel, hostel, bar, nightclub, cafe attached to one of these venues, function centre, or caravan park, the Hospitality Award likely sets your minimum legal entitlements.

Most working holiday makers in hospitality are being underpaid relative to what the Hospitality Award requires, often by hundreds of dollars per week once penalty rates and casual loadings are correctly applied.

## What does the Hospitality Award cover?

The Hospitality Award covers employers and employees working in:

- Hotels, motels, serviced apartments, resorts
- Caravan parks and hostels
- Function centres and convention facilities
- Restaurants and bars that are part of a hotel or accommodation venue
- Nightclubs
- Casinos (in most cases)
- Labour hire companies placing workers in these venues

The award does **not** cover stand-alone restaurants, cafes, or fast food outlets that are not part of a hotel. These are covered by the [Restaurant Industry Award](/blog/restaurant-industry-award-working-holiday) or the Fast Food Industry Award instead.

## What classifications apply?

The Hospitality Award has six main grades, from Introductory level up to Level 6. Most working holiday makers fall into:

- **Introductory level**: first three months in the industry, no prior experience
- **Level 1 (HIE Grade 1)**: kitchen hand, room attendant, porter, glassy, food and beverage attendant without responsibility
- **Level 2 (HIE Grade 2)**: bar attendant with RSA, cook grade 1, waiter with responsibility
- **Level 3 (HIE Grade 3)**: cook grade 2, head waiter for small section, security officer

Each grade has a minimum hourly rate. After three months at Introductory level, the employer must move you to Level 1 automatically unless there is a genuine reason for further training.

## What are the minimum pay rates?

Minimum pay rates change every 1 July with the Annual Wage Review. The rates apply as the minimum hourly wage for full-time and part-time workers. Casual workers receive a casual loading of 25% on top of the base rate.

For a working holiday maker in a typical Level 1 role:

- Base hourly rate set by the Hospitality Award
- Casual loading of 25% on top
- Penalty rates for evenings, weekends, and public holidays
- Allowances for split shifts, meal breaks not provided, broken periods, and other circumstances

If you are being paid a flat rate "to cover everything", you are almost certainly being underpaid against the award.

## What penalty rates apply?

Hospitality work is one of the highest penalty rate industries in Australia. Casual employees under the Hospitality Award are entitled to penalty rates on top of the casual loading:

- **Saturday**: typically 25% loading on the base rate (plus the 25% casual loading)
- **Sunday**: typically 50% loading (plus the 25% casual loading)
- **Public holidays**: typically 125% loading (plus the 25% casual loading)
- **Evening work** (7pm to midnight): additional loading depending on grade
- **Midnight to 7am**: higher overnight loading

The exact percentages and start times are set in the current version of the award and vary slightly for different classifications. See our article on [penalty rates in Australia](/blog/penalty-rates-australia) for the general framework.

## What allowances apply under the Hospitality Award?

The award includes specific allowances on top of the hourly rate:

- **Meal allowance**: if working overtime without a meal break
- **Split shift allowance**: where a shift is broken by an unpaid period
- **Clothing or uniform allowance**: where the employer requires a uniform but does not provide it
- **Laundry allowance**: for washing employer-required uniforms
- **First aid allowance**: for designated first aid officers
- **Travel allowance**: in some circumstances for short-notice shift changes

These are paid in addition to the base rate. Many working holiday makers in hospitality are not paid the allowances they are entitled to.

## How does this affect your tax position?

If you have been underpaid against the Hospitality Award, the wages you should have received are higher than what was reported to the ATO. Recovering the underpayment increases:

- The taxable income on your [tax return](/tax-return)
- The [super contributions](/superannuation) the employer should have paid (12% of the corrected wages)
- The eventual DASP when you leave Australia

When we lodge through our tax agent portal, we review your payslips against the Hospitality Award rates for your classification and identify any pattern of underpayment. Pursuing the underpayment is handled through Fair Work; the tax and super consequences are handled through our service.

## How does our service support hospitality workers?

For working holiday makers in hospitality, our team:

- Cross-checks payslips against the Hospitality Award classification and rate
- Identifies underpaid wages, missing penalty rates, and missing allowances
- Reconciles ATO-reported income against what should have been paid
- Pursues [unpaid super](/blog/super-employer-not-paying-what-to-do) on the correct wages, not just the wages that were paid
- Lodges the [tax return](/tax-return) using the correct income figures

The Hospitality Award is one of the most complex modern awards in Australia and one of the most consistently breached. [Get in touch with our team](/contact) if you work in hospitality and want to make sure you are being paid what the award requires.
 `,
 },
 {
 slug: "horticulture-award-working-holiday-makers",
 title: "Horticulture Award (MA000028): farm work pay for working holiday makers",
 description:
   "The Horticulture Award (MA000028) sets minimum pay rates and conditions for farm work in Australia. What working holiday makers picking fruit, harvesting, or doing 88-day specified work should be paid.",
 category: "Work Rights",
 date: "26 February 2026",
 readTime: 5,
 body: `
The Horticulture Award 2020, known as MA000028, is the modern award that sets minimum legal pay rates, classifications, penalty rates, and conditions for farm work in Australia. The award applies to working holiday makers performing the 88 days of regional farm work required for a second year visa, as well as to anyone working in fruit and vegetable picking, packing, pruning, planting, or general farm labour. The award sets a minimum hourly rate that applies even where the worker is paid on a piece rate basis.

Farm work is one of the most underpaid industries in Australia. The Fair Work Ombudsman has run multiple national campaigns into horticulture underpayment, with consistent findings that most workers are paid below the award minimum.

## What does the Horticulture Award cover?

The award covers:

- Fruit picking and harvesting
- Vegetable picking and harvesting
- Pruning, planting, weeding, and other vine and tree work
- Packing fruit and vegetables in farm-based sheds
- General farm labour where the principal activity is horticulture
- Mushroom growing and harvesting
- Flower growing and cutting

The award does not cover broadacre cropping (wheat, barley), livestock work (cattle, sheep), or aquaculture, which are covered by separate awards.

## What is the minimum hourly rate guarantee?

The most important protection in the Horticulture Award for working holiday makers is the **minimum hourly rate guarantee**. Even where the worker is paid on a piece rate basis (paid per bin, per bucket, or per tray picked), the worker must be paid at least the equivalent of the minimum hourly rate for the time worked.

If your piece rate earnings for a day work out to less than the minimum hourly rate multiplied by your hours worked, the employer must top up the difference. Many farms do not pay this top-up, which is the most common underpayment pattern in horticulture.

See our article on [piece rates in farm work](/blog/piece-rates-farm-work-working-holiday) for the detail on how this protection is meant to operate.

## What classifications apply?

The Horticulture Award has five main classifications:

- **Level 1**: new employees during their first three months, no prior farm work experience
- **Level 2**: workers who have completed three months or have prior experience
- **Level 3**: skilled workers performing tasks requiring specialised knowledge
- **Level 4**: tractor operators, chemical applicators, and supervisors of small teams
- **Level 5**: leading hands and skilled supervisors

Most working holiday makers fall into Level 1 or Level 2. The classification does not depend on what the employer says it is; it depends on the actual work being performed.

## What penalty rates apply?

The Horticulture Award has more limited penalty rates than the [Hospitality Award](/blog/hospitality-award-working-holiday-makers), reflecting the seasonal nature of the work. The main penalty entitlements are:

- **Casual loading**: 25% on top of the base hourly rate
- **Public holidays**: a higher rate applies (or the day off without loss of pay for permanent employees)
- **Overtime**: above 38 hours per week or 304 hours per 8-week cycle, overtime rates apply
- **Saturday and Sunday**: in some classifications, a weekend loading applies

Working holiday makers often assume farm work has no penalty rates at all, which leads them to accept flat rates that breach the award.

## What allowances apply?

The award includes allowances for:

- **Travel between job sites**: if required to move between farms during a working day
- **Tool allowance**: where the employer requires the worker to provide their own tools
- **Living away from home allowance**: in some circumstances
- **Wet weather allowance**: where work continues in heavy rain
- **Cold storage allowance**: for work in refrigerated areas

These are paid on top of the base rate. They are routinely missed in farm payslips.

## How does the 88-day regional work requirement interact?

To qualify for a second year working holiday visa, you must complete 88 days of "specified work" in a regional area. Most farm work counts. The key tax and wage rules:

- Every day of farm work counts as a "day" regardless of how many hours you worked
- The work must be paid in line with the Horticulture Award (or another applicable award)
- Volunteer work generally does not count for the second visa (with limited exceptions for disaster recovery)
- The work must be reported to the ATO under Single Touch Payroll
- Your payslips serve as the immigration evidence

If you have done farm work that was paid under the award and properly reported to the ATO, the visa evidence is automatic. If the work was cash-in-hand or not properly reported, the visa evidence is much harder to establish, and Home Affairs may refuse the second visa.

## How does this affect your tax position?

Underpayment against the Horticulture Award means:

- Wages reported to the ATO are lower than they should have been
- [Super contributions](/superannuation) are calculated on the lower (incorrect) wages
- Your [DASP](/blog/what-is-dasp-super-withdrawal) payment is smaller than it should be

When we lodge through our tax agent portal, we review your payslips against the Horticulture Award rates and identify underpayments. Recovering the underpayment is handled through Fair Work; the tax and super consequences are handled through our service.

## How does our service support farm workers?

For working holiday makers in horticulture, our team:

- Cross-checks payslips against the Horticulture Award rates for your classification
- Identifies whether piece rate earnings met the minimum hourly rate guarantee
- Reconciles ATO-reported income against what should have been paid
- Identifies [unpaid super](/blog/super-employer-not-paying-what-to-do) on correctly-calculated wages
- Lodges the [tax return](/tax-return) using the correct income figures
- Identifies any work-related deductions specific to farm work (tools, protective gear, vehicle running costs for moving between farms)

Farm work is where the largest gaps between reported and correct wages typically exist. [Get in touch with our team](/contact) before you leave Australia to make sure your farm work earnings have been correctly accounted for.
 `,
 },
 {
 slug: "restaurant-industry-award-working-holiday",
 title: "Restaurant Industry Award (MA000119): pay for working holiday makers in cafés",
 description:
   "The Restaurant Industry Award (MA000119) covers stand-alone restaurants, cafes, and similar venues that are not part of a hotel. What working holiday makers as waitstaff, kitchen hands, and chefs should be paid.",
 category: "Work Rights",
 date: "27 February 2026",
 readTime: 4,
 body: `
The Restaurant Industry Award 2020, known as MA000119, is the modern award that sets minimum pay rates, classifications, penalty rates, and conditions for stand-alone restaurants, cafes, and similar food-service venues in Australia. The award applies to working holiday makers working as waiters, kitchen hands, baristas, bartenders, supervisors, and cooks in venues that are not part of a hotel or accommodation business. The pay rates and penalty rates differ from the [Hospitality Award](/blog/hospitality-award-working-holiday-makers), and the difference matters at the end of the week.

Working holiday makers in restaurants and cafes are often paid against the wrong award, or against no award at all. Identifying the correct award is the first step in checking whether you are being paid correctly.

## What does the Restaurant Industry Award cover?

The award covers employers and employees in:

- Stand-alone restaurants (not connected to a hotel)
- Cafes, coffee shops, and brunch venues
- Tea rooms
- Catering businesses
- Reception centres and function venues (not connected to a hotel)
- Take-away food businesses (in some cases)

The award does **not** cover:

- Restaurants inside hotels (covered by the [Hospitality Award](/blog/hospitality-award-working-holiday-makers))
- Fast food outlets (covered by the Fast Food Industry Award)
- Mobile food vans
- Workplaces covered by an enterprise agreement that overrides the award

If you are uncertain which award applies, see our article on [award classifications](/blog/award-classifications-working-holiday-australia) for the detailed test.

## What classifications apply?

The Restaurant Industry Award has six main grades:

- **Introductory**: first three months with no relevant experience
- **Level 1 (Food and Beverage Attendant Grade 1)**: setting tables, clearing tables, picking up glasses
- **Level 2 (Food and Beverage Attendant Grade 2)**: pouring drinks, taking orders, serving food, basic cooking
- **Level 3 (Food and Beverage Supervisor / Cook Grade 1)**: supervising small sections, basic cooking
- **Level 4 (Cook Grade 2)**: cooking with a wider range of techniques
- **Level 5 and 6**: chef de partie, head chef, restaurant manager

Most working holiday makers in front-of-house roles fall into Level 1 or Level 2. Baristas with experience typically sit at Level 2 or Level 3.

## What are the minimum pay rates?

Pay rates are set in the award and updated every 1 July. The structure includes:

- Base hourly rate by classification
- Casual loading of 25% on top for casual employees
- Penalty rates for weekends, evenings, and public holidays
- Allowances for specific working conditions

A casual Level 2 worker receives the Level 2 base rate plus the 25% casual loading as their standard hourly rate. Any work outside ordinary hours attracts additional penalty rates on top.

## What penalty rates apply?

The Restaurant Industry Award penalty rates for casual employees include:

- **Monday to Friday, 7pm to midnight**: typically a small evening loading
- **Saturday**: usually 50% loading (which includes the 25% casual loading rolled in, in some classifications)
- **Sunday**: usually 75% loading
- **Public holidays**: usually 150% loading
- **Midnight to 7am**: higher overnight loading

The exact percentages and start times are set in the current version of the award. Penalty rates in restaurants are slightly different from those in hotels, and the difference can be significant on a Sunday or public holiday shift.

## How is the Restaurant Industry Award different from the Hospitality Award?

The two awards cover overlapping types of work in different venue settings:

- A waiter in a hotel restaurant is covered by the **Hospitality Award**
- A waiter in a stand-alone restaurant next door is covered by the **Restaurant Industry Award**

The minimum pay rates, penalty rates, classification descriptions, and allowances are different between the two awards. The same job can be paid differently depending on the type of venue. Employers sometimes apply the wrong award to save money, and the difference adds up over a year of work.

## What allowances apply?

The award includes allowances for:

- **Meal allowance**: if working overtime without a break
- **Clothing or uniform allowance**: if the employer requires a uniform but does not provide one
- **Laundry allowance**: for washing employer-required uniforms
- **First aid allowance**: for designated first aid officers
- **Tools and equipment**: if you are required to provide your own (knives, for example)

## How does this affect your tax position?

If you have been paid against the wrong award, or below the correct award rate, the wages you should have received are higher than the wages reported to the ATO. Recovering the underpayment increases:

- The taxable income on your [tax return](/tax-return)
- The [super contributions](/superannuation) the employer should have paid
- Your eventual DASP when you leave Australia

When we lodge through our tax agent portal, we review your payslips against the Restaurant Industry Award rates for your classification.

## How does our service support restaurant and cafe workers?

For working holiday makers in restaurants and cafes, our team:

- Identifies the correct award (Restaurant, Hospitality, or Fast Food)
- Cross-checks payslips against the correct award classification and rate
- Identifies underpaid wages, missing penalty rates, and missing allowances
- Reconciles ATO-reported income against what should have been paid
- Pursues [unpaid super](/blog/super-employer-not-paying-what-to-do) on the correct wages
- Lodges the [tax return](/tax-return) using the correct income figures

Misapplied awards are one of the most consistent patterns of underpayment in hospitality. [Get in touch with our team](/contact) to check whether you are being paid against the right award.
 `,
 },
 {
 slug: "award-classifications-working-holiday-australia",
 title: "Australian modern awards: how to find the right one for your job",
 description:
   "Most working holiday makers are covered by a modern award that sets minimum pay and conditions. How to identify which of the 121 modern awards applies to your job and check your classification.",
 category: "Work Rights",
 date: "1 March 2026",
 readTime: 5,
 body: `
A modern award is a legal document set by the Fair Work Commission that establishes minimum pay rates, classifications, penalty rates, allowances, and conditions for an industry or occupation in Australia. Almost every working holiday maker job in Australia is covered by a modern award, and the award sets the minimum legal entitlements that apply regardless of what the employment contract says. Identifying the right award is the first step in checking whether you are being paid correctly.

There are over 120 modern awards covering different industries and occupations. Working out which one applies to your job depends on the type of business you work for, the duties you perform, and where your work fits within the award's classification structure.

## How are awards identified?

Each modern award has:

- A name (for example, "Hospitality Industry (General) Award 2020")
- A short reference code (MA000009 for Hospitality, MA000028 for Horticulture)
- A coverage clause that defines who the award applies to
- A classification structure that sets pay levels within the award

The Fair Work Ombudsman maintains the public list of awards and the rates that apply under each one.

## The three-step test for identifying your award

To work out which award applies, work through three questions:

1. **What industry does my employer operate in?** A hotel is in the accommodation/hospitality industry. A stand-alone cafe is in the restaurant industry. A fruit farm is in horticulture.
2. **What is the principal purpose of my work?** Even within the same industry, different roles can fall under different awards. A receptionist in a hotel might be covered by the Hospitality Award; an admin staff member at the same hotel head office might be covered by the Clerks Award.
3. **What classification within the award matches my duties?** Each award has a graded classification structure. The right classification depends on the actual work performed, not the job title.

## The most common awards for working holiday makers

The awards that apply to most working holiday maker jobs are:

- **[Hospitality Industry (General) Award - MA000009](/blog/hospitality-award-working-holiday-makers)**: hotels, motels, hostels, bars in hotels, function centres, caravan parks
- **[Restaurant Industry Award - MA000119](/blog/restaurant-industry-award-working-holiday)**: stand-alone restaurants, cafes, brunch venues
- **Fast Food Industry Award - MA000003**: fast food chains, take-away outlets, food courts
- **[Horticulture Award - MA000028](/blog/horticulture-award-working-holiday-makers)**: fruit picking, vegetable harvesting, packing, vine and tree work
- **General Retail Industry Award - MA000004**: retail shops, supermarkets, department stores
- **Pastoral Award - MA000035**: livestock work, broadacre cropping, shearing
- **Cleaning Services Award - MA000022**: contract cleaning, hotel cleaning by labour hire
- **Building and Construction General On-site Award - MA000020**: construction labouring, trades assistant work
- **Aged Care Award - MA000018**: support work in residential aged care

A working holiday maker who does three different jobs in a year may be covered by three different awards.

## What if my employer says no award applies?

This is almost always wrong. The legal default is that an award applies unless one of the following is true:

- The employer is covered by an **enterprise agreement** (a workplace-specific agreement that has been formally approved by the Fair Work Commission and overrides the award)
- You are in a **senior management role** above the highest classification in the award
- You are an **independent contractor** with a genuine ABN-based contract (see our article on [the difference between an employee and a contractor](/blog/employee-vs-contractor-australia))

If none of these applies, an award applies. Employers who insist "we don't follow the award" are almost always breaching the law.

## How do you find your classification?

Each award has a classification structure that defines the levels within the award. The classification depends on:

- The level of skill required for the duties
- The level of responsibility
- Whether you supervise others
- Years of experience in the industry (in some awards)

Job titles do not determine classification. A worker called a "manager" who actually does the same tasks as a Level 2 employee is classified at Level 2, not at a manager level. Employers cannot use a job title to push you into a lower-paid classification when your actual work fits a higher one.

## The Introductory level rule

Most awards have an Introductory level for workers in their first three months in the industry. After three months, you must be moved up automatically unless there is a genuine reason for further training. Many working holiday makers are kept at Introductory level for the entire visa period, which is a clear breach in most cases.

## What about the Better Off Overall Test (BOOT)?

If your employer has an enterprise agreement, the agreement must leave each employee Better Off Overall than under the relevant award. Where an enterprise agreement applies, it usually adopts the award structure but adds extras like higher base pay, extra leave, or improved penalty rates. An enterprise agreement that leaves workers worse off than the award is not legally enforceable.

## How does this affect your tax position?

If you have been classified wrongly or paid below your correct classification, the wages you should have received are higher than what was reported to the ATO. Recovering the underpayment increases:

- The taxable income on your [tax return](/tax-return)
- The [super contributions](/superannuation) the employer should have paid
- Your eventual DASP when you leave Australia

## How does our service support award reviews?

For every working holiday maker who lodges through our service, our team:

- Identifies the modern award that applies to each job
- Cross-checks payslips against the correct award classification and rate
- Identifies underpaid wages, missing penalty rates, and missing allowances
- Reconciles ATO-reported income against what should have been paid
- Lodges the [tax return](/tax-return) using the correct income figures

Award identification is the foundation of every wage recovery process. [Get in touch with our team](/contact) if you are uncertain which award covers your work or whether you have been paid correctly.
 `,
 },

// ─── TAX RETURN - PENALTIES & DEDUCTIONS ─────────────────────────────────
 {
 slug: "late-tax-return-penalty-working-holiday",
 title: "What is the penalty for lodging a late tax return as a working holiday maker?",
 description:
   "Lodging a tax return late triggers a Failure to Lodge penalty of one penalty unit ($330 as of 2025-26) for every 28 days the return is overdue, up to.",
 category: "Tax Return",
 date: "3 March 2026",
 readTime: 4,
 body: `
The ATO charges a Failure to Lodge (FTL) penalty of one penalty unit for every 28 days that a [tax return](/tax-return) is overdue, up to a maximum of five penalty units. As of the 2025-26 financial year, one penalty unit is $330, meaning the maximum FTL penalty is $1,650. The penalty applies whether or not you owe tax: a working holiday maker who is actually owed a refund can still receive a Failure to Lodge penalty for not lodging on time.

The penalty is rarely the largest cost of a late tax return. For working holiday makers, the bigger problem is usually a delayed refund and the cascading impact on DASP, second visa applications, and ATO compliance flags.

## When is a tax return due?

For working holiday makers lodging their own return, the deadline is 31 October following the end of the financial year (which runs 1 July to 30 June). A return for the 2024-25 financial year is therefore due by 31 October 2025.

Working holiday makers who lodge under the supervision of a registered tax agent have a later deadline. Tax agents can lodge for their clients up until late May of the following year, provided the client was registered with the agent before the standard 31 October deadline.

This extension is one of the practical advantages of lodging through a tax agent, particularly for working holiday makers who are still in Australia or who have only just left.

## How is the penalty calculated?

The Failure to Lodge penalty steps up every 28 days the return is overdue:

- 1 to 28 days late: 1 penalty unit = $330
- 29 to 56 days late: 2 penalty units = $444
- 57 to 84 days late: 3 penalty units = $666
- 85 to 112 days late: 4 penalty units = $888
- 113 days or more late: 5 penalty units = $1,650 (maximum)

The maximum penalty caps at $1,650 regardless of how late the return is.

## What if you are owed a refund?

A working holiday maker who is owed a refund can still receive a Failure to Lodge penalty for not lodging on time. The ATO position is that the obligation to lodge is independent of whether tax is owed. In practice, the ATO often does not apply the penalty for late refund returns from working holiday makers, but it has the legal right to do so, and the penalty has been applied in cases where the ATO views the lateness as deliberate or where there is a pattern of late lodgement across multiple years.

## What if you are owed nothing or you owe a small amount?

The Failure to Lodge penalty is the same regardless of whether you owe tax. A working holiday maker who would have had a zero tax outcome (no refund, no debt) can still be hit with the full $1,650 maximum penalty for a return that is more than 112 days overdue.

## When is interest charged on top?

If the late return results in a tax debt, the ATO also charges the **General Interest Charge** on the unpaid amount from the original due date. The General Interest Charge rate compounds daily and is currently set at a rate substantially above the cash rate. A small tax debt left unpaid for several years can grow significantly.

The General Interest Charge does not apply if the return results in a refund or a zero outcome.

## Can the penalty be remitted?

The ATO has discretion to remit (cancel or reduce) the Failure to Lodge penalty in some circumstances:

- Genuine illness or hospitalisation of the taxpayer at the time of the deadline
- Family bereavement
- Natural disaster or other event beyond the taxpayer's control
- ATO system or processing issues that prevented lodgement
- First-time late lodgement with otherwise clean compliance history

Remission must be specifically requested and supported by evidence. The remission rate for working holiday makers is generally higher when the request is made under the supervision of a registered tax agent than when made directly by the taxpayer.

## What about returns from years you have already left Australia?

Working holiday makers who have left Australia without lodging their final return are still liable for Failure to Lodge penalties on returns that should have been lodged. The ATO does not always actively pursue overseas working holiday makers for small penalty amounts, but the debt sits on the ATO record and can:

- Be netted off against future refunds (including the working holiday maker's own DASP payment in some cases)
- Block a future Australian visa application
- Be referred to international debt collection if the amount is large enough

Lodging late returns from overseas is generally still better than not lodging at all.

## How does this interact with second and third year visa applications?

Second and third year working holiday visa applications can be affected by an unresolved ATO compliance issue. If you have outstanding Failure to Lodge penalties, unlodged returns, or unpaid tax debts, the Department of Home Affairs may flag the application for additional review. Clearing the ATO position before applying for the next visa avoids this risk.

## How does our service handle late returns?

For working holiday makers with overdue tax returns, our team:

- Lodges every overdue return through our tax agent portal
- Requests remission of any Failure to Lodge penalty where there are grounds
- Reconciles the ATO record across multiple years to make sure no income has been missed
- Coordinates the [DASP](/blog/what-is-dasp-super-withdrawal) timing where relevant
- Pursues any refund owed from prior years (refund entitlements remain claimable for up to four years)

A late return is rarely beyond fixing. [Get in touch with our team](/contact) to bring your lodgements up to date and resolve any outstanding penalty position.
 `,
 },
 {
 slug: "understating-income-ato-penalty-working-holiday",
 title: "What are the ATO penalties for understating your income on a working holiday tax return?",
 description:
   "If the ATO finds that you have under-reported income on your tax return, administrative penalties range from 25% to 75% of the tax shortfall plus.",
 category: "Tax Return",
 date: "9 March 2026",
 readTime: 4,
 body: `
If the ATO finds that a [tax return](/tax-return) has under-reported income or over-claimed deductions, administrative penalties apply on the tax shortfall. The penalty range is 25% to 75% of the shortfall, depending on the level of fault, with an additional General Interest Charge accruing daily on the unpaid amount. Working holiday makers are a focus area for ATO data matching because their employment is short-term, their employers are often in cash-heavy industries, and the platforms they work through (Uber, DoorDash, Airtasker) report directly to the ATO.

The cost of a deliberate under-reporting can easily exceed the original tax saving by several multiples.

## How does the ATO know your real income?

Since Single Touch Payroll became universal, the ATO receives a direct feed of:

- Every wage payment from every employer
- Tax withheld from each pay run
- Super contributions paid (and not paid) to each fund

For ABN-based work, the ATO also receives:

- Payments from gig economy platforms (Uber, DoorDash, Airtasker, Menulog) under the Sharing Economy Reporting Regime
- Payments from contracting clients of more than $10,000 in many industries (taxable payments reporting)
- Bank account interest from your Australian bank
- Capital gains records from share platforms and crypto exchanges

By the time you lodge your return, the ATO already knows most of what you earned. Trying to omit income is therefore visible to the ATO almost immediately.

## What are the penalty rates?

The administrative penalty on a tax shortfall is set as a percentage of the additional tax that would have been payable if the return had been correct:

- **Failure to take reasonable care**: 25% of the shortfall
- **Recklessness**: 50% of the shortfall
- **Intentional disregard**: 75% of the shortfall

The category depends on how the ATO views the cause of the shortfall:

- "Failure to take reasonable care" is the lowest tier, applying where a careful taxpayer would have got it right (forgetting an employer, claiming deductions without records)
- "Recklessness" applies where the taxpayer made a decision knowing there was a substantial risk of being wrong
- "Intentional disregard" applies where the taxpayer deliberately omitted income or fabricated deductions

For working holiday makers, the most common penalty is the 25% "failure to take reasonable care" rate, applied because the worker forgot or could not access full employment records.

## What is the General Interest Charge?

On top of the administrative penalty, the ATO charges the General Interest Charge (GIC) on the unpaid tax from the original due date until the corrected amount is paid. The GIC rate is set quarterly and compounds daily. It is currently substantially higher than the cash rate.

A tax shortfall of $2,000 that is identified two years after the original return was lodged, with the 25% penalty applied, results in:

- Original shortfall: $2,000
- Administrative penalty: $500 (25% of shortfall)
- General Interest Charge for two years: approximately $400 (compounded daily)
- Total payable: approximately $2,900

For deliberate omissions with the 75% penalty, the total cost can be more than double the original shortfall.

## What triggers an ATO review?

The ATO uses data matching to identify discrepancies automatically. The most common triggers for working holiday maker reviews are:

- Reported income on the return is lower than the Single Touch Payroll record
- A platform (Uber, DoorDash, Airtasker) reported income that was not on the return
- A claimed deduction is far outside the average for the industry and income level
- An employer reported income that does not appear on the return at all
- The bank account where the refund is paid does not match the taxpayer's records

Most discrepancies are flagged automatically within weeks of lodgement. The review process is initiated by an ATO letter requesting more information, and the corrected assessment is usually issued within a few months.

## What happens if you cannot pay?

If you have left Australia and cannot pay the corrected amount immediately, the ATO can:

- Place a hold on any future refunds (including the next year's DASP if relevant)
- Apply the debt against any [DASP payment](/blog/what-is-dasp-super-withdrawal) you make
- Refer the debt to international debt collection
- Place a marker on your record that can affect future Australian visa applications

ATO debts do not disappear when you leave the country. The General Interest Charge continues to accrue on the unpaid amount.

## How do you avoid a shortfall penalty?

The reliable ways to avoid a shortfall penalty are:

- Include every employer for every job worked in the financial year (no matter how short)
- Include all ABN income, including gig economy platforms
- Only claim deductions that are directly related to earning income, with records to support each one
- Lodge under the supervision of a registered tax agent who has direct access to the ATO income record
- Wait until all employer Single Touch Payroll reporting is finalised before lodging (early-lodging risks amended assessments)

## How does our service handle ATO compliance risk?

When you lodge through our service, our team:

- Accesses the full ATO income record through our tax agent portal before preparing the return
- Cross-checks every employer's reported income against any payslips you provide
- Reconciles gig economy platform income against the Sharing Economy reporting feed
- Reviews every claimed deduction against industry norms and substantiation requirements
- Lodges only after all reporting is finalised to avoid the need for amendments

The defensibility of the return matters as much as the refund amount. A larger refund that triggers a 25% penalty and two years of interest is worth less than a smaller refund that holds up under any review. [Get in touch with our team](/contact) to lodge a return that gives you the right outcome without the compliance risk.

## A security note

Working holiday makers are targeted by tax fraud scams that promise inflated refunds in exchange for sharing TFN and passport details. These schemes typically inflate deductions or omit income to generate a larger initial refund, with the scammer taking a cut. When the ATO later identifies the discrepancy, the worker is left with the penalty and the General Interest Charge while the scammer has disappeared. Never share your TFN, passport, or login details with anyone who is not a registered tax agent on the Tax Practitioners Board register.
 `,
 },
 {
 slug: "tools-equipment-under-300-instant-deduction-whv",
 title: "Instant deduction for tools and equipment under $300 as a working holiday maker",
 description:
   "Tools and work equipment that cost less than $300 each can be claimed as an immediate tax deduction in the year of purchase.",
 category: "Tax Return",
 date: "15 March 2026",
 readTime: 4,
 body: `
The ATO allows an immediate deduction for individual tools, equipment, and assets that cost $300 or less and are used to earn income from employment. The deduction is taken in full in the financial year of purchase, rather than being depreciated over multiple years. For working holiday makers, this rule covers a wide range of work-related items: knives for kitchen work, picking equipment for farm work, tools for construction, work boots, high-vis vests, equipment bags, and many other items.

The $300 rule is one of the most commonly missed deductions in working holiday maker [tax returns](/tax-return), partly because workers do not realise the items qualify and partly because they have not kept the receipts.

## What does the $300 rule actually say?

The rule applies to assets used for income-producing purposes. Specifically:

- The asset must cost $300 or less (each, not in total)
- The asset must be used predominantly to earn assessable income
- The asset must not be part of a set of assets that together cost more than $300

If all three are met, the full cost of the asset can be deducted in the year of purchase. There is no need to depreciate the asset over multiple years.

## What kinds of items qualify?

Common items that qualify for working holiday makers include:

- **Hospitality**: kitchen knives, chef's whites, slip-resistant work shoes, aprons
- **Farm work**: picking buckets, secateurs, pruning shears, gardening gloves, work boots, high-vis shirts, sun hats
- **Construction**: steel-cap boots, hard hats, tool belts, hand tools (hammers, drills under $300), measuring tapes, work gloves
- **Cleaning**: vacuum bags, cleaning equipment, protective gloves
- **Rideshare and delivery**: delivery bags, phone holders, dash cams, bike accessories
- **Office work**: stationery, computer accessories under $300

The list is not exhaustive. Almost any work-related item under $300 that you bought during the financial year and used to do your job can be claimed.

## What counts as "predominantly for work"?

If an item is used both for work and personal purposes, the deduction is limited to the work-related percentage. For example:

- A pair of steel-cap boots used only for work: 100% deductible
- A pair of work boots also worn casually: only the work-related percentage deductible
- A backpack used to carry farm picking equipment: deductible if predominantly for that purpose
- A phone holder for rideshare driving: deductible if used predominantly for that purpose

For items that are used solely for work and would be impractical to use otherwise (high-vis, hard hats, chef's whites), 100% is straightforward.

## What about sets of assets?

The $300 rule does not apply if the asset is part of a set that together cost more than $300. The ATO uses a "set" definition that includes:

- Multiple items bought together for a single purpose (a knife set for a chef, for example)
- Multiple items bought separately but functioning as a set

If a chef buys a set of six kitchen knives for $450 in one purchase, no individual knife is treated as costing under $300, and the set must be depreciated over its effective life.

If the same chef buys one knife for $80, then a different knife for $90, then another for $100, each one is treated separately and each is fully deductible under the $300 rule.

## What records do you need?

For every deduction, the ATO requires evidence of:

- The cost (a receipt or tax invoice)
- The date of purchase
- The supplier
- A description of the item
- Evidence of work use (or the work-use percentage if mixed use)

Without records, the deduction cannot be claimed, regardless of how genuinely work-related the item was. The receipts can be paper or digital. The ATO accepts photos of receipts kept in a phone or cloud storage.

## What if you bought items in cash without keeping receipts?

If you have lost or never had a receipt, the ATO can sometimes accept alternative evidence:

- A bank or credit card statement showing the purchase
- A photograph of the item still in use
- A written record from the supplier confirming the purchase

The strength of alternative evidence varies. The most defensible deduction is one backed by an actual receipt.

## What about items that cost more than $300?

Items that cost more than $300 are not lost as deductions, but they must be depreciated over their effective life. For example:

- A $400 chainsaw used for tree work cannot be deducted in full in year one
- It can be deducted over the effective life set by the ATO (usually 3 to 5 years for hand tools and small power equipment)

There is also a new **$1,000 instant deduction rule** that applies from 1 July 2026 onwards, which raises the threshold for items that can be deducted immediately. See our article on [the $1,000 instant deduction rule](/blog/1000-dollar-instant-deduction-rule-2026) for the detail.

## How does this interact with the broader deduction rules?

The $300 rule applies to tools and equipment. Working holiday makers can also claim:

- **Protective clothing and footwear** under separate rules
- **Vehicle expenses** (see our article on [vehicle expenses and logbooks](/blog/vehicle-logbook-abn-working-holiday))
- **Phone and internet use** for work, on a percentage basis
- **Self-education** if directly related to your current work
- **Union dues, registrations, and licences** related to your work

See our article on [tax deductions for working holiday makers](/blog/tax-deductions-working-holiday-makers) for the broader framework.

## How does our service handle tool and equipment deductions?

When we lodge a [tax return](/tax-return) through our service, our team:

- Reviews every work-related purchase you have made during the year
- Identifies which items qualify under the $300 rule
- Applies the correct deduction (full immediate deduction or depreciation)
- Cross-checks the deduction against industry norms for your work type
- Substantiates each claim with the receipts and records you provide

Working holiday makers in trade-heavy and farm work often have several thousand dollars of legitimate tool and equipment deductions sitting in receipts that never make it onto the return. [Get in touch with our team](/contact) before the financial year ends to make sure your records are in place.
 `,
 },
 {
 slug: "1000-dollar-instant-deduction-rule-2026",
 title: "The new $1,000 instant deduction rule from 1 July 2026 for working holiday makers",
 description:
   "From 1 July 2026, working holiday makers can claim a $1,000 instant deduction for work-related expenses without receipts.",
 category: "Tax Return",
 date: "21 March 2026",
 readTime: 4,
 body: `
From 1 July 2026, a new $1,000 instant deduction rule applies to all Australian taxpayers, including working holiday makers. Under the rule, an individual can claim a flat $1,000 deduction for work-related expenses on their [tax return](/tax-return) without needing to substantiate each individual cost with receipts. The rule applies for the 2026-27 financial year onwards and replaces several existing simplified deduction methods. It does not apply retrospectively to 2025-26 or earlier returns.

For working holiday makers, the rule simplifies the claims process for routine work expenses, but it does not remove the need to keep records for any claim that goes above $1,000.

## How does the rule work?

From 1 July 2026, you can claim:

- A flat $1,000 deduction for work-related expenses without any receipts, OR
- The actual cost of work-related expenses with full receipts and records (no cap, just the actual costs)

You pick whichever gives a better result on your return. If your real work expenses total less than $1,000, the flat $1,000 deduction gives you the better outcome. If your real work expenses total more than $1,000, you claim the actual costs with full substantiation.

## What does the $1,000 cover?

The flat $1,000 covers the same categories of work-related expenses that would otherwise be claimed under the substantiation rules:

- Tools and equipment under $300 (see our article on [the $300 instant deduction rule](/blog/tools-equipment-under-300-instant-deduction-whv))
- Protective clothing and uniforms
- Laundry of uniforms
- Work-related phone and internet use
- Work-related vehicle use (under the cents-per-kilometre method)
- Self-education directly related to your current work
- Union dues, registrations, and licences
- Other work-related expenses

It does not cover non-work-related deductions like donations, investment expenses, or specific occupation-related claims that have their own rules.

## When does the rule start?

The $1,000 instant deduction applies from 1 July 2026. This means:

- The 2025-26 tax return (lodged in mid-2026) uses the **old rules** with substantiation required for all claims
- The 2026-27 tax return (lodged in mid-2027) is the **first return** where the $1,000 instant deduction applies
- Returns for prior years (2024-25 and earlier) cannot use the new rule

For working holiday makers, the rule will be most relevant for those still in Australia during the 2026-27 financial year, or those who worked in Australia during 2026-27 and lodge a return from overseas after that.

## When is the $1,000 flat deduction the better option?

The flat $1,000 is the better option when:

- Your actual work expenses for the year total less than $1,000
- You have lost or did not keep receipts for some of your expenses
- Your expenses are spread across many small purchases that are hard to substantiate
- You want a simpler return without the burden of compiling records

For most working holiday makers in routine roles (hospitality service, retail, cafe work), the flat $1,000 is likely to be either equal to or larger than the actual expenses, so it becomes the natural choice.

## When are actual costs the better option?

The actual cost method (with full receipts) is better when:

- Your work-related expenses are likely to exceed $1,000
- You work in a tools-heavy industry (construction, farm work with own equipment, mechanics)
- You use a vehicle extensively for work and would prefer the logbook method
- You have made a major work-related purchase during the year

A construction worker with $2,500 of work boots, tools, and protective equipment in a year would claim the $2,500 with full substantiation, not the $1,000 flat. A rideshare driver with $5,000 of vehicle and phone expenses would do the same.

## Can you mix the two methods?

No. You either take the flat $1,000 for the year, or you substantiate every work-related expense in full. You cannot take the flat $1,000 plus additional substantiated expenses on top.

This is the most important distinction to understand: the rule is "all or nothing" for the work-related expense category. If you have $1,200 of work-related expenses and take the $1,000 flat, you give up the extra $200. If you substantiate, you claim the full $1,200.

## What happens to the old simplified methods?

The new $1,000 rule replaces several existing simplified methods that were narrower in scope. The cents-per-kilometre method for vehicle deductions and the fixed-rate method for working-from-home deductions continue to apply, but they are absorbed into the $1,000 flat if you choose that route.

## How does this interact with the substantiation rules?

The $1,000 flat removes the substantiation requirement for the flat-rate amount. If you are claiming the flat $1,000, you do not need receipts, logbooks, or detailed records. You simply claim $1,000 on the work-related expenses line.

If you are claiming actual costs, every deduction must still be substantiated according to the existing rules:

- Receipts for individual expenses
- Logbook for vehicle use over the cents-per-kilometre threshold
- Diary records for phone and internet use percentages
- Records for self-education expenses

## How does the rule affect working holiday makers specifically?

The $1,000 rule is neutral on visa status. It applies to working holiday makers the same way it applies to Australian residents. The flat $1,000 reduces your taxable income, which at the 15% working holiday maker rate translates to a $150 reduction in tax. For workers at the 30% bracket (above $45,000), it translates to a $300 reduction.

For working holiday makers earning under $45,000, the flat $1,000 is worth approximately $150 to $200 in refund value.

## How does our service handle the new rule?

For returns from the 2026-27 financial year onwards, our team:

- Reviews your work expenses to determine whether the flat $1,000 or actual costs gives a better outcome
- Calculates both options and applies the larger deduction
- Where actual costs are higher, substantiates each claim against the ATO's substantiation rules
- Identifies any expenses that fall outside the work-related category and may need separate treatment

For most working holiday makers in routine roles, the flat $1,000 will be the simpler and equivalent (or larger) choice. For workers in trade, farm, and high-vehicle-use roles, actual costs will remain the larger deduction. [Get in touch with our team](/contact) to make sure the right method is applied to your situation.
 `,
 },
 {
 slug: "bicycle-motorcycle-vehicle-deductions-working-holiday",
 title: "Deductions for bicycles, motorcycles, and other vehicles for working holiday makers",
 description:
   "Vehicle deductions are not limited to cars.",
 category: "Tax Return",
 date: "22 March 2026",
 readTime: 5,
 body: `
The ATO rules for vehicle expense deductions apply to a wider range of vehicles than most working holiday makers realise. Bicycles used for food delivery, motorcycles used for rideshare or work travel, and other vehicles can all give rise to legitimate deductions where the vehicle is used to earn income. The methods for calculating the deduction differ between cars (with two specific methods) and other vehicles (with broader actual-cost rules), but the underlying principle is the same: costs that relate to earning income are deductible against that income.

Working holiday makers in delivery work, rideshare, and trades who use non-car vehicles routinely miss vehicle deductions because they assume only cars qualify. They do not.

## What vehicles can give rise to deductions?

The main categories are:

- **Cars** (defined by the ATO as motor vehicles designed to carry fewer than 9 people and less than 1 tonne load): two simplified methods apply (cents-per-kilometre and logbook)
- **Motorcycles** and scooters: actual-cost method applies, with proportional claim for work use
- **Bicycles** (including e-bikes): running costs and capital costs can be claimed for work use
- **Utility vehicles** over 1 tonne load capacity: actual-cost method applies
- **Vans and trucks**: actual-cost method applies

The deduction method depends on the vehicle classification.

## Bicycles for food delivery

A bicycle used for food delivery (Uber Eats, DoorDash, Menulog, Deliveroo) is an income-producing asset. Deductible costs include:

- The cost of the bicycle, claimed as depreciation over its effective life (typically 3 to 5 years)
- Repairs and maintenance (tyres, chains, brake pads, services)
- Cycling equipment used for the work (helmet, lights, lock, panniers)
- Insurance specifically covering the bicycle
- Registration if applicable (rare for bicycles)
- A proportion of running costs (cleaning supplies, replacement parts)

For an e-bike, the same costs apply plus electricity for charging, which can be claimed at a reasonable estimate of the work-related portion.

If the bicycle is used both for delivery work and personal transport, the deduction is limited to the work-related percentage. A bicycle used 80% for delivery and 20% for personal commuting would give an 80% deduction across all the costs above.

## Motorcycles for rideshare and work travel

A motorcycle used for rideshare (where the platform allows it) or for work travel between job sites is treated similarly to a bicycle:

- Purchase cost claimed as depreciation over the effective life
- Fuel and oil
- Registration and CTP insurance (the work-related portion)
- Comprehensive insurance (the work-related portion)
- Maintenance and repairs
- Tyres
- Riding gear specifically required for the work (jacket, gloves, helmet)
- Tolls and parking incurred during work

The deduction is calculated on an actual-cost basis with apportionment for work use. There is no cents-per-kilometre simplified method for motorcycles in the same way there is for cars.

## Cars: the two simplified methods

For cars (under 1 tonne load capacity, fewer than 9 passengers), the ATO provides two simplified methods:

1. **Cents-per-kilometre method**: a flat rate per work-related kilometre, up to 5,000 km per car per year. No detailed records of individual costs required, but a reasonable basis for the kilometre estimate must be kept (a few weeks of representative records is usually sufficient).

2. **Logbook method**: a 12-week logbook records the work-use percentage. That percentage is then applied to actual costs (fuel, services, registration, insurance, depreciation) for the year. The logbook is valid for 5 years before needing renewal.

The cents-per-kilometre method is simpler but capped at 5,000 km. For rideshare drivers and high-vehicle-use workers, the logbook method usually gives a larger deduction. See our article on [vehicle expenses and logbooks](/blog/vehicle-logbook-abn-working-holiday) for the detailed comparison.

## What about utes and tray-back vehicles?

Utility vehicles with a load capacity of more than 1 tonne (heavier work utes) are not classified as "cars" for ATO purposes. They are treated under the actual-cost rules:

- Actual fuel costs
- Actual maintenance and registration
- Actual insurance
- Actual depreciation

The cents-per-kilometre method does not apply to heavy utes. Working holiday makers in construction, farm work, or trades who use a heavy ute should track actual costs.

## What about cars that are not yours?

A car borrowed from a friend or rented occasionally for work is treated under different rules. If you pay for the use (rental fees, fuel contributions), those payments can be claimed at the work-related percentage. If the use is genuinely free, no deduction arises.

For a car you own with a partner or family member, the deduction is available on your share of the costs you actually paid.

## What records do you need?

The records depend on the method:

**Cents-per-kilometre method**:
- A reasonable estimate of work-related kilometres for the year
- Some supporting evidence of the basis for the estimate (a few weeks of representative kilometres, for example)
- Maximum 5,000 km per car per year

**Logbook method (cars)**:
- A 12-week logbook covering a representative period
- All receipts for fuel, services, registration, insurance for the year
- Records of depreciation
- The work-use percentage applied to total actual costs

**Actual-cost method (motorcycles, bicycles, heavy vehicles)**:
- Records of every cost claimed (receipts or bank statements)
- A reasonable basis for the work-use percentage (diary, schedule of work trips)
- Depreciation records for the vehicle

## What are the common deductions that working holiday makers miss?

The most frequently missed vehicle deductions are:

- Bicycle depreciation for delivery riders
- E-bike battery and charging costs
- Motorcycle riding gear required for the work
- Tolls during work trips (which add up significantly in Sydney, Melbourne, Brisbane)
- Parking fees during work activities
- Vehicle cleaning costs for rideshare drivers

Each of these is a legitimate deduction with the right records.

## How does this fit with the $1,000 instant deduction rule from 2026-27?

From 1 July 2026, the new $1,000 instant deduction rule applies. If your total work-related expenses (including vehicle costs) are under $1,000 for the year, the flat $1,000 may be the better option. If your vehicle expenses alone exceed $1,000, you continue to use the substantiated actual-cost or logbook methods to claim the full amount. See our article on [the $1,000 instant deduction rule](/blog/1000-dollar-instant-deduction-rule-2026) for the framework.

## How does our service handle vehicle deductions?

When we lodge a [tax return](/tax-return) through our service, our team:

- Identifies every vehicle used for income-producing purposes during the year
- Applies the correct method (cents-per-kilometre, logbook, or actual-cost) for each vehicle
- Calculates depreciation on bicycles, motorcycles, and other capital items
- Substantiates each claim against the ATO's substantiation rules
- Compares the result to the flat $1,000 instant deduction (from 2026-27) and applies the larger one

For working holiday makers in delivery, rideshare, trades, and any other vehicle-intensive role, the vehicle deduction is often the single largest claim on the return. [Get in touch with our team](/contact) to make sure every legitimate vehicle cost is being captured.
 `,
 },

// ─── SUPER ────────────────────────────────────────────────────────────────
 {
 slug: "dasp-vs-leaving-super-in-australia-pros-cons",
 title: "DASP or leave super in Australia? Pros and cons for working holiday makers",
 description:
   "Working holiday makers leaving Australia have to decide whether to claim DASP at 65% tax now or leave super in their fund. Pros, cons, and the 6-month rule that triggers ATO unclaimed super transfer.",
 category: "Super",
 date: "24 March 2026",
 readTime: 5,
 body: `
A working holiday maker leaving Australia can either claim their [superannuation](/superannuation) as a Departing Australia Superannuation Payment (DASP) at the 65% working holiday maker tax rate, or leave the super in the fund and consider claiming it at a later date. The choice has significant financial implications. For most working holiday makers who do not plan to return to Australia, claiming DASP is the better option, but the comparison depends on account fees, expected investment returns, the time horizon involved, and the chance of returning to Australia in the future.

This decision is one of the most consequential financial choices a working holiday maker makes, and the default for most workers should be to claim DASP rather than leave the money behind.

## What is the basic comparison?

If you have $5,000 of super in an Australian fund when you leave Australia:

**Option A: Claim DASP now**
- 65% tax on the taxable component
- Net payment: approximately $1,750 (assuming the entire balance is taxable component, which is typical)
- Payment lands in your overseas bank account within 28 days of application

**Option B: Leave the super in the fund**
- Account continues to accrue investment returns (positive or negative)
- Account is charged ongoing fees (administration and insurance premiums)
- Money is inaccessible from overseas unless DASP is claimed later
- If unclaimed, the fund eventually transfers the balance to the ATO as unclaimed monies
- The 65% DASP tax rate still applies whenever the money is eventually withdrawn

The 65% tax rate **follows you** regardless of when you claim. Waiting does not reduce the tax. See our article on [why DASP is taxed at 65%](/blog/dasp-tax-rate-65-percent-explained) for the detail.

## What happens to super left in the fund?

If you leave Australia without claiming DASP, your super does not disappear, but it does shrink. The forces working against the balance are:

- **Administration fees**: typically $50 to $130 per year regardless of balance
- **Insurance premiums**: deducted automatically unless you cancel cover (often $300 to $800 per year)
- **Asset-based fees**: 0.5% to 1.5% of the balance per year
- **No new contributions**: the balance does not grow from contributions while you are overseas

For a small balance (under $5,000), the combined fees can erode the balance to zero within a few years, particularly if insurance premiums are still being deducted.

The forces working in favour of the balance are:

- **Investment returns**: if the fund's investments perform well, the balance grows
- **Long time horizon**: over many years, investment compounding can outweigh fees on larger balances

For most working holiday maker balances (typically $2,000 to $10,000), the fee load tends to exceed the realistic investment return over the medium term.

## The ATO unclaimed super pathway

If you leave the super in the fund without making contributions or contact for a defined period, the fund transfers the balance to the ATO as "unclaimed super monies". The ATO holds the balance indefinitely but with these features:

- No investment returns while held by the ATO
- No fees deducted (the balance simply sits)
- Interest paid at a rate roughly aligned with inflation (low single digits)
- Still subject to the 65% DASP tax when eventually claimed

Money held by the ATO is safer from fees than money held by the fund, but the lack of investment returns means the real (inflation-adjusted) value erodes over time.

See our article on [what happens to unclaimed super](/blog/what-happens-to-unclaimed-super) for the detail.

## When does leaving the super make sense?

The case for leaving the super is strongest when:

- You are likely to return to Australia within a few years on another visa
- The balance is large enough that the fees are a small percentage
- The fund has consistently good investment returns
- Insurance premiums have been cancelled (so the balance is not being eroded by unwanted cover)
- You expect the 65% DASP tax rate to remain unchanged (it is set by legislation and could change either way)

In practice, very few of these conditions apply to the typical working holiday maker.

## When does claiming DASP make sense?

The case for claiming DASP is strongest when:

- You do not plan to return to Australia in the foreseeable future
- The balance is small (under $10,000), where fees would erode it
- You want certainty about the outcome (no risk of fee or rule changes)
- You can use the money productively now (debt repayment, savings, investment in your home country)
- You want to close out your Australian financial position cleanly

The 65% tax rate is high, but 35% of something is more than 100% of nothing. Working holiday makers who never claim their super end up making an unintended donation to the Australian government.

## Can you reverse the decision later?

Once you claim DASP, the decision is final for that money. You cannot re-deposit the funds back into a super account if you later return to Australia. New super contributions on a second visa start a fresh account.

If you leave the super in the fund and later decide to claim, our team can lodge DASP from overseas at any point after your visa expires. The 65% tax rate applies whenever the claim is made.

## What if you return to Australia on a new visa?

A working holiday maker who returns to Australia on a new visa (working holiday year 2, student visa, skilled visa, partner visa) can:

- Continue using the existing super account if it is still active
- Receive new employer contributions to that account
- Eventually claim DASP when they leave for the last time

Critically, the 65% WHM DASP rate **follows the worker** for any super accrued during a WHV period, even if subsequent contributions are under a different visa. This is one of the most misunderstood features of DASP and catches many returning travellers off guard.

## What is the practical decision framework?

For most working holiday makers leaving Australia without plans to return:

1. Make sure all super contributions from all employers are in identifiable funds (see our article on [super in multiple funds](/blog/super-multiple-funds-consolidation))
2. Cancel any unnecessary insurance policies on the accounts to stop fee erosion
3. Claim DASP within 12 months of departure, while bank details and contact details are still current
4. Receive the net payment to your overseas bank account

For working holiday makers planning to return within 2 to 3 years:

1. Consolidate super into a single fund with low fees
2. Cancel unnecessary insurance
3. Keep contact details and bank details up to date
4. Reassess at the time of the next departure

## How does our service handle the DASP decision?

When you engage our team for DASP, we:

- Identify every super fund holding your contributions
- Calculate the gross balance and the expected net payment after 65% tax
- Review the fee structure of each fund and the impact on retained balances
- Cancel unnecessary insurance to stop fee erosion if you choose to wait
- Lodge the DASP claim through the official ATO system when you decide to proceed
- Track the payment to your overseas bank account

The decision to claim DASP or wait is yours, but the financial picture should be clear before you make it. [Get in touch with our team](/contact) to understand exactly what your super position is and what each option would deliver.
 `,
 },

// ─── NEW POSTS - BATCH 3: JOBS (12 articles) ─────────────────────────────

// ─── FARM / AGRICULTURE ──────────────────────────────────────────────────
 {
 slug: "fruit-picking-jobs-working-holiday-australia",
 title: "Fruit picking jobs in Australia: working holiday visa guide & pay rates",
 description:
   "Fruit picking is the most common path to the 88 days of specified work required for a 2nd year working holiday visa. Pay rates, conditions, regions, seasonal calendars, and how to avoid common scams.",
 category: "Work Rights",
 date: "26 March 2026",
 readTime: 5,
 body: `
Fruit picking is the most common form of regional work performed by working holiday makers in Australia, and the standard route to the 88 days of specified work needed for a second year visa. Pickers harvest seasonal fruit (mangoes, bananas, citrus, stone fruit, berries, apples, grapes) across regional Australia, often working for labour hire companies or directly for farms. The work is covered by the [Horticulture Award](/blog/horticulture-award-working-holiday-makers), which sets minimum hourly pay rates and protections that apply even when the worker is paid on a piece rate basis.

Fruit picking is also one of the most underpaid areas of Australian work, with the Fair Work Ombudsman repeatedly identifying systemic underpayment in national campaigns. Understanding what you should be paid is the first step in not being one of the underpaid.

## What does fruit picking pay?

Pay for fruit picking comes in two main forms:

- **Hourly rate**: an hourly wage at or above the Horticulture Award minimum (around $25 to $32 per hour for casual workers depending on the year and classification)
- **Piece rate**: paid per bin, bucket, tray, or kilogram picked

The most important protection in the Horticulture Award is the **minimum hourly guarantee**. Even where you are paid on a piece rate, your earnings for each day worked must be at least the equivalent of the minimum hourly rate multiplied by the hours worked. If piece rates fall short, the employer is legally required to top up to the minimum hourly rate.

In practice, this top-up is one of the most consistently breached rules in Australian agriculture. See our article on [piece rates in farm work](/blog/piece-rates-farm-work-working-holiday) for the detail on how the protection is meant to operate.

## What are the main harvest regions and seasons?

Different fruits ripen at different times across different regions:

- **Mangoes**: Northern Territory, north Queensland (September to January)
- **Bananas**: Queensland year-round (peak December to May)
- **Strawberries**: Queensland (April to October), Victoria, Tasmania
- **Apples**: Tasmania, Victoria, NSW, Western Australia (February to May)
- **Citrus**: NSW Riverina, Victoria Sunraysia, South Australia (May to October)
- **Stone fruit**: Victoria, NSW, South Australia (November to March)
- **Wine grapes**: South Australia, Victoria, NSW (January to April)
- **Avocados**: Queensland (March to October), Western Australia
- **Berries**: Tasmania, Victoria, Queensland (varies by berry type)

The seasonal calendar drives a constant flow of pickers between regions. Following the harvest year-round is possible and is how many working holiday makers complete their 88 days quickly.

## What is required for the 88 days?

To count toward a second year visa, the work must be:

- Performed in a designated regional postcode
- Paid work (most volunteer work no longer counts, with limited exceptions)
- In an eligible industry (plant and animal cultivation, including fruit picking)
- Documented through payslips, employer letters, and ATO records

The 88 days are counted by calendar days worked, not by hours. A full day or a part day each count as one day, as long as the work was paid and the day was a normal working day.

## Are you an employee or a contractor?

This is one of the most consequential questions in fruit picking. Most fruit pickers should be classified as employees, with TFN withholding, super contributions, and the Horticulture Award rates applying. Some farms classify pickers as contractors with an ABN, which:

- Removes the employer obligation to pay super
- Removes the minimum hourly guarantee in the form it applies to employees
- Shifts the tax obligation to the picker
- Removes workers compensation cover in many cases

The classification depends on the facts of the work, not what the contract says. If the farm controls when, where, and how you work, supplies the tools and equipment, and you cannot send a substitute, you are most likely an employee even if the paperwork says contractor. See our article on [employee vs contractor](/blog/employee-vs-contractor-australia) for the test.

## What records should you keep?

For both tax and immigration purposes, keep:

- Every payslip from every farm or labour hire company
- Bank statements showing wages being paid
- A simple diary of days worked (date, farm name, hours)
- Photos of yourself at the worksite (helpful evidence for the visa)
- Receipts for any work-related expenses (boots, gloves, sun protection, tools)

These records support both the 88-day visa application and the [tax return](/tax-return) at the end of the financial year.

## What deductions can fruit pickers claim?

Working holiday makers in fruit picking can typically claim:

- Sun protection (hats, sunscreen, long-sleeve shirts)
- Work boots and protective footwear
- Gloves
- Picking equipment if provided by the worker (rare but possible)
- A share of vehicle running costs if moving between farms during a working day
- Mobile phone costs for the work-related percentage
- Accommodation costs in certain "away from home" circumstances

See our article on [tax deductions for working holiday makers](/blog/tax-deductions-working-holiday-makers) for the framework.

## What are the risks of unethical farms and labour hire?

Fair Work investigations have repeatedly found that some farms and labour hire companies in Australian agriculture systematically underpay working holiday makers. Common patterns include:

- Paying below the minimum hourly guarantee on piece rates
- Charging high fees for shared accommodation (which is sometimes illegal as a wage deduction)
- Withholding wages pending completion of the 88 days, then disputing the count
- Refusing to provide payslips
- Reporting only part of the wages to the ATO
- Using ABN classifications to avoid super and workers compensation

Choosing a farm or labour hire company with a track record of fair treatment matters as much as the wage rate on paper.

## How does our service support fruit pickers?

For working holiday makers doing fruit picking, our team:

- Reviews payslips against the Horticulture Award rates and the minimum hourly guarantee
- Identifies wage underpayments and missing super contributions
- Cross-checks the days reported to the ATO against your visa evidence
- Pursues [unpaid super](/blog/super-employer-not-paying-what-to-do) where contributions are missing
- Lodges the [tax return](/tax-return) capturing every employer correctly
- Coordinates DASP timing if you are leaving Australia after completing your work

Fruit picking generates more wage and super disputes than almost any other industry in Australia. [Get in touch with our team](/contact) before you leave Australia to make sure your earnings have been correctly accounted for.
 `,
 },
 {
 slug: "farm-hand-jobs-working-holiday-australia",
 title: "Farm hand jobs in Australia: pay, conditions & 2nd year visa eligibility",
 description:
   "Farm hand work covers a wide range of agricultural roles beyond fruit picking - livestock care, planting, fencing, and general farm labour. What working holiday makers should expect and how it counts for the 2nd year visa.",
 category: "Work Rights",
 date: "2 April 2026",
 readTime: 5,
 body: `
"Farm hand" is the general term used in Australia for workers performing a wide range of agricultural tasks: livestock care, planting, harvesting non-fruit crops, fencing, machinery operation, general property maintenance, and labour across the farm. The work is performed across both horticultural farms (covered by the [Horticulture Award](/blog/horticulture-award-working-holiday-makers)) and pastoral farms (covered by the Pastoral Award), with different pay rates and conditions applying depending on the type of work.

Farm hand roles are one of the main pathways to the 88 days of specified work needed for a second year working holiday visa, but the rules around what counts toward the 88 days, what award applies, and what pay you are entitled to are different from fruit picking.

## What does farm hand work involve?

The typical farm hand role can include:

- Livestock care (feeding, drenching, mustering, calving)
- Crop planting, weeding, and harvesting (non-fruit)
- Fencing, gate repair, water trough maintenance
- Tractor and machinery operation
- General property maintenance
- Animal husbandry
- Shearing shed support work
- Hay making and storage
- Dairy work

The exact tasks depend on the type of farm: a cattle station in the Northern Territory, a wheat farm in Western Australia, a dairy farm in Victoria, and a sheep station in South Australia all need farm hands, but the work looks different on each.

## What award applies?

The award depends on the principal activity of the farm:

- **Pastoral Award (MA000035)**: livestock, broadacre cropping (wheat, barley, oats), shearing
- **[Horticulture Award (MA000028)](/blog/horticulture-award-working-holiday-makers)**: fruit, vegetables, vines, tree crops
- **Dairy Award (MA000026)**: dairy farms

A worker on a mixed-enterprise farm (livestock and crops, for example) is generally covered by the award that matches the principal activity of the business. See our article on [award classifications](/blog/award-classifications-working-holiday-australia) for how to identify the right one.

## What does farm hand work pay?

Pay varies by award, classification, and experience:

- Casual rates under the Pastoral Award are around $26 to $34 per hour depending on classification and the year
- Casual rates under the Horticulture Award are around $25 to $32 per hour depending on classification and the year
- Permanent or live-in arrangements often include accommodation as part of the package (which can have tax implications)
- Overtime, weekend, and public holiday rates apply

Pay rates change every 1 July with the Annual Wage Review. The Fair Work Pay Calculator gives current rates for any award.

## Does farm hand work count toward the 88 days?

Most farm hand work counts toward the 88 days for a second year working holiday visa, provided:

- The work is performed in a designated regional postcode
- The work falls within the eligible "specified work" categories (plant and animal cultivation, including livestock and broadacre cropping)
- The work is paid
- The work is documented with payslips and reported to the ATO

Some farm-related activities do **not** count, including office work for an agricultural business, retail work selling farm produce, and most non-physical roles.

## What about live-in and accommodation arrangements?

Many farm hand roles include accommodation. This is common on cattle stations, sheep stations, and remote properties. The tax implications include:

- The value of provided accommodation may be considered a fringe benefit
- Some accommodation is provided "as part of the job" without tax consequence
- Where the worker pays rent (deducted from wages), the deduction must be lawful and properly documented
- Living-away-from-home allowances may apply in some circumstances

The rules are complex and depend on the specific arrangement. Our team reviews accommodation arrangements as part of preparing [tax returns](/tax-return) for farm hand workers.

## What about workers compensation on remote farms?

Workers compensation covers farm hands the same way it covers any employee. Each state and territory has a compulsory workers compensation scheme. Cattle stations and remote properties have higher than average rates of injury, and any injury during paid work is covered by the scheme regardless of distance from urban centres. See our article on [workplace injury rights](/blog/workplace-injury-working-holiday-rights) for the framework.

If you are classified as a contractor with an ABN rather than an employee, workers compensation coverage is more complex and may not apply automatically. The classification depends on the facts, not the contract. See our article on [employee vs contractor](/blog/employee-vs-contractor-australia).

## What deductions can farm hands claim?

Working holiday makers in farm hand roles can typically claim:

- Work boots and protective footwear (steel cap, waterproof)
- Work clothing (high-vis, protective gear, sun protection)
- Hat, sunglasses, sunscreen
- Gloves
- Tools provided by the worker (small hand tools, knives)
- A share of vehicle running costs for movement between work sites
- Mobile phone for work-related communications

See our article on [tax deductions for working holiday makers](/blog/tax-deductions-working-holiday-makers) for the framework, and the new [$1,000 instant deduction rule from 2026-27](/blog/1000-dollar-instant-deduction-rule-2026) for how this might apply.

## How does our service support farm hands?

For working holiday makers in farm hand roles, our team:

- Identifies the correct award (Pastoral, Horticulture, or Dairy)
- Cross-checks payslips against the correct classification and rate
- Reviews accommodation and live-in arrangements for tax implications
- Identifies [unpaid super](/blog/super-employer-not-paying-what-to-do) where contributions are missing
- Lodges the [tax return](/tax-return) capturing every employer correctly
- Coordinates documentation for second year visa applications

[Get in touch with our team](/contact) before you leave Australia to make sure your farm hand earnings and visa documentation are properly handled.
 `,
 },

// ─── HOSPITALITY ─────────────────────────────────────────────────────────
 {
 slug: "bartender-jobs-working-holiday-australia",
 title: "Bartender jobs in Australia on a working holiday visa: RSA, pay & tips",
 description:
   "Bartending is one of the most accessible hospitality roles for working holiday makers. RSA certificate requirements, Hospitality Award pay rates, penalty rates, and how tips are taxed in Australia.",
 category: "Work Rights",
 date: "9 April 2026",
 readTime: 5,
 body: `
Bartending is one of the most popular hospitality roles for working holiday makers in Australia. The work is widely available in cities, regional centres, and tourist destinations, and it typically pays better than entry-level kitchen or service work because of the penalty rates that apply to evening and weekend shifts. A Responsible Service of Alcohol (RSA) certificate is required before you can serve alcohol in Australia, and the pay rates are set by the [Hospitality Award](/blog/hospitality-award-working-holiday-makers) for bars in hotels, or the [Restaurant Industry Award](/blog/restaurant-industry-award-working-holiday) for bars in stand-alone restaurants.

Bartender earnings vary substantially based on whether penalty rates are correctly paid and whether the venue passes on tips. Both areas are sources of consistent underpayment.

## What does the work involve?

Bartender roles typically include:

- Serving beer, wine, cocktails, and spirits
- Operating the till and processing card payments
- Pouring drinks to standard recipes
- Cleaning the bar, glassware, and equipment
- Restocking the bar from coolrooms and storerooms
- Checking ID for age verification
- Refusing service to intoxicated patrons (a legal requirement)

The role overlaps with "food and beverage attendant" classifications in the relevant awards, and the classification level depends on whether you have an RSA and whether you take on additional responsibilities.

## What is an RSA and how do you get one?

A Responsible Service of Alcohol (RSA) certificate is a legal requirement to serve alcohol in Australia. The course covers:

- Australian alcohol laws and your responsibilities as a server
- Identifying intoxicated patrons
- Refusing service safely
- Age verification
- Harm minimisation

The course is run by accredited providers and takes 4 to 6 hours online or in person, typically costing $25 to $80. Each state and territory has its own RSA, with NSW, Victoria, Queensland, and other states issuing separate certificates. If you work across multiple states, you may need separate RSAs for each. Some states accept interstate RSAs after a top-up; others require you to start fresh.

See our article on [RSA certificate requirements](/blog/rsa-certificate-australia-working-holiday) for the detailed state-by-state rules.

## What does bartending pay?

Pay depends on the award, the classification, and the shift timing:

- Base casual hourly rate for a Level 2 hospitality worker (bar attendant with RSA): typically $30 to $35 per hour
- Saturday loading: typically 25% to 50% on top
- Sunday loading: typically 50% to 75% on top
- Public holiday loading: typically 125% to 150% on top
- Evening loading (after 7pm): additional percentage in many awards
- Overnight loading (midnight to 7am): higher rate

A casual bartender working a Friday and Saturday night shift can earn substantially more per hour than a weekday daytime worker. Many working holiday makers are unaware of how much higher their weekend hours should be paid.

## Should you be a Level 1 or Level 2?

The [Hospitality Award](/blog/hospitality-award-working-holiday-makers) typically classifies a bar attendant with an RSA as Level 2 ("Food and Beverage Attendant Grade 2"). A worker without an RSA who only carries glasses, clears tables, or restocks can be Level 1. Once you have an RSA and are actually serving alcohol, the Level 2 rate should apply.

Employers sometimes keep workers at Level 1 even after they have started serving alcohol. This is a classification breach and the underpayment can be recovered.

## What about tips?

Tipping in Australia is much less prevalent than in countries like the United States, because base wages are higher. Tips that customers leave are not part of legal wages; they are voluntary additional payments. The legal rules are:

- Tips are taxable income and must be declared on your tax return
- Cash tips kept by the worker are still taxable
- Tips pooled and distributed by the employer are taxable
- Tips do not count toward minimum wage compliance (the employer must pay award rates regardless of tips)

See our article on [tax on tips](/blog/do-working-holiday-makers-pay-tax-on-tips) for the detail.

## What are the common underpayment patterns in bartending?

The Fair Work Ombudsman has identified consistent underpayment patterns in Australian bars:

- Paying a flat hourly rate "to cover everything" with no penalty rates
- Classifying experienced bartenders at Level 1
- Refusing to pay the public holiday loading
- Cash payment with no payslip and no super
- Charging for uniform, breakages, or till shortages (all generally illegal - see [uniform and laundry deductions](/blog/uniform-laundry-deductions-illegal-australia))
- Unpaid set-up and clean-up time (work outside the rostered shift)

Each of these is recoverable if identified.

## What deductions can bartenders claim?

Working holiday makers in bartending roles can typically claim:

- RSA course fees (when paid by you, not reimbursed)
- Non-slip shoes if required by the venue
- Bartending equipment if provided by the worker (rare)
- A share of vehicle running costs for shifts in remote locations
- Mobile phone for work-related communications

The amounts are usually modest. See our article on [tax deductions for working holiday makers](/blog/tax-deductions-working-holiday-makers) for the framework.

## How does our service support bartenders?

For working holiday makers in bartending, our team:

- Identifies the correct award (Hospitality or Restaurant Industry)
- Cross-checks payslips against the correct classification and rate
- Reviews penalty rate application for weekend, evening, and public holiday shifts
- Identifies [unpaid super](/blog/super-employer-not-paying-what-to-do) on the correctly-calculated wages
- Reviews any tip income for tax purposes
- Lodges the [tax return](/tax-return) capturing every venue you worked at

Bartending generates substantial casual earnings and substantial penalty rate underpayments. [Get in touch with our team](/contact) to make sure your bar work has been correctly accounted for.
 `,
 },
 {
 slug: "barista-coffee-shop-working-holiday-australia",
 title: "Barista jobs in Australia on a working holiday visa: pay & training guide",
 description:
   "Australian coffee culture creates strong demand for skilled baristas. Hospitality Award pay rates, training requirements, and the best cities for working holiday makers looking for barista work.",
 category: "Work Rights",
 date: "11 April 2026",
 readTime: 5,
 body: `
Australia has one of the most developed coffee cultures in the world, and skilled baristas are in consistent demand across cafes, restaurants, and specialty coffee venues. Working holiday makers with prior barista experience often find work quickly, particularly in Melbourne, Sydney, and Brisbane. The work is covered by the [Restaurant Industry Award](/blog/restaurant-industry-award-working-holiday) for stand-alone cafes, or the [Hospitality Award](/blog/hospitality-award-working-holiday-makers) for hotel-based cafes. The classification level depends on your experience and the responsibility of the role.

Pay rates and conditions for baristas are well-defined under the awards, but many cafes pay below the correct level, particularly for trial periods and the first few weeks of employment.

## What does the work involve?

Barista roles typically include:

- Operating espresso machines and grinders
- Preparing coffee drinks (espresso, latte, cappuccino, flat white)
- Steaming milk to specification
- Making non-coffee drinks (tea, hot chocolate, iced drinks)
- Taking orders and processing payments
- Preparing simple food items in many cafes
- Cleaning equipment and maintaining the bar area
- Restocking supplies

Senior baristas may also train other staff, manage shifts, order coffee beans, and represent the cafe in latte art or barista competitions.

## What classification applies?

Under the [Restaurant Industry Award](/blog/restaurant-industry-award-working-holiday), a barista typically fits within:

- **Level 1 (Food and Beverage Attendant Grade 1)**: trainee or new barista with no experience, basic drinks
- **Level 2 (Food and Beverage Attendant Grade 2)**: experienced barista, full range of drinks, takes orders
- **Level 3**: senior barista, supervises smaller cafe sections, trains staff

The classification depends on the actual duties, not the job title. A worker with three months of experience preparing a full drinks range is at Level 2 regardless of whether the employer calls them a "junior barista". See our article on [award classifications](/blog/award-classifications-working-holiday-australia) for how to identify the right level.

## What does barista work pay?

Pay depends on the award, classification, and shift timing:

- Casual hourly rate for Level 2 in a stand-alone cafe: typically $30 to $34 per hour
- Saturday loading: typically 50% under the Restaurant Industry Award (lower in some classifications under the Hospitality Award)
- Sunday loading: typically 75% under the Restaurant Industry Award
- Public holiday loading: typically 150% under the Restaurant Industry Award
- Early morning loadings can apply in some classifications (depending on shift start time)

Cafe work often has earlier start times than other hospitality (5am to 7am opening shifts are common), which can attract higher rates in some awards.

## What about unpaid trial shifts?

Unpaid "trial shifts" are common in Australian cafes and almost always unlawful. A brief skills demonstration (5 to 30 minutes) may be acceptable, but a full shift of productive work must be paid at award rates. See our article on [unpaid trial shifts](/blog/unpaid-trial-shifts-australia-legal) for the detail.

Many working holiday makers complete unpaid trial shifts, do not get hired, and never recover the wages owed. The wages are recoverable through the Fair Work Ombudsman regardless of whether you were ultimately hired.

## Do baristas need certifications?

Most cafes do not require formal certifications for barista work. Some larger chains run their own in-house training programmes. Specific certifications that can be useful but are not legally required include:

- A coffee skills certificate from a recognised provider
- A food safety certificate (sometimes required by the employer)
- An RSA certificate if the cafe also serves alcohol (some cafes do for evening service)

Working holiday makers with prior barista experience from another country often find that Australian cafes value the experience and will hire without local certification.

## What are the common underpayment patterns in cafes?

The Fair Work Ombudsman has identified consistent issues in Australian cafes:

- Flat rates "to cover everything" with no penalty rates
- Unpaid trial shifts of full days
- Classification at Level 1 indefinitely despite full duties
- Charging for staff coffee, food, or uniform (generally illegal)
- Cash payment with no payslip and no super
- Refusing to pay for pre-opening set-up time
- Refusing to pay the public holiday loading

Cafes with one or two of these patterns usually have several. A wider audit through our service often identifies multiple issues across a single employment period.

## What deductions can baristas claim?

Working holiday makers in barista roles can typically claim:

- Non-slip work shoes
- Barista apron if not provided by the employer
- Barista training course fees (if paid by you)
- Tools provided by you (rare for baristas)
- A share of phone costs for shift communications
- A share of vehicle running costs for early morning shifts in remote areas (limited)

See our article on [tax deductions for working holiday makers](/blog/tax-deductions-working-holiday-makers) for the framework.

## How does our service support baristas?

For working holiday makers in barista roles, our team:

- Identifies the correct award and classification
- Cross-checks payslips against the correct rate for your experience level
- Reviews penalty rates for early morning, weekend, and public holiday shifts
- Identifies [unpaid super](/blog/super-employer-not-paying-what-to-do) on correctly-calculated wages
- Reviews any unpaid trial shifts for wage recovery
- Lodges the [tax return](/tax-return) capturing every cafe you worked at

Barista work in Australia generates strong casual earnings when the award is properly applied. [Get in touch with our team](/contact) to make sure your cafe work has been correctly handled.
 `,
 },
 {
 slug: "waiter-waitress-working-holiday-australia",
 title: "Waiter & waitress jobs in Australia on a working holiday visa",
 description:
   "Restaurant and cafe service work is one of the most common roles for working holiday makers. Pay rates under the Restaurant Industry Award, penalty rates, and how tips are taxed.",
 category: "Work Rights",
 date: "15 April 2026",
 readTime: 5,
 body: `
Waiter and waitress work (sometimes called food and beverage attendant work) is one of the most common roles for working holiday makers in Australia. The work is widely available across restaurants, cafes, hotels, and function venues, and it typically requires no formal qualifications beyond an RSA if alcohol service is involved. The pay rates are set by the [Restaurant Industry Award](/blog/restaurant-industry-award-working-holiday) for stand-alone restaurants or the [Hospitality Award](/blog/hospitality-award-working-holiday-makers) for hotel restaurants and function venues.

Waiting tables in Australia is paid significantly better than in many countries because the base wage is higher and tipping is not relied on for income. The trade-off is that getting the award rates correctly applied requires more attention than most workers realise.

## What does the work involve?

Waiter roles typically include:

- Greeting and seating guests
- Taking food and drink orders
- Serving food and drinks
- Clearing tables and resetting between customers
- Processing payments and cash handling
- Cleaning the dining area and restocking
- Coordinating with kitchen and bar staff

In smaller venues, the waiter role can include barista duties, bar service, and basic food preparation. The classification depends on the actual range of duties performed.

## What classification applies?

Under the [Restaurant Industry Award](/blog/restaurant-industry-award-working-holiday):

- **Introductory level**: first three months with no industry experience
- **Level 1 (Food and Beverage Attendant Grade 1)**: setting tables, clearing tables, picking up glasses, basic service
- **Level 2 (Food and Beverage Attendant Grade 2)**: taking orders, pouring drinks (with RSA), full service responsibilities
- **Level 3 (Food and Beverage Supervisor)**: supervising small sections, taking section responsibility

After three months at Introductory level, you must move to Level 1 automatically unless there is a genuine reason for further training. If you are doing the same work as Level 2 staff, you should be classified at Level 2 regardless of how long you have been in the role.

See our article on [award classifications](/blog/award-classifications-working-holiday-australia) for the detailed test.

## What does waiter work pay?

Pay depends on the classification, shift timing, and whether you are casual or permanent:

- Casual hourly rate for Level 2 in a stand-alone restaurant: typically $30 to $34 per hour (base plus 25% casual loading)
- Saturday loading: typically 50% under the Restaurant Industry Award
- Sunday loading: typically 75% under the Restaurant Industry Award
- Public holiday loading: typically 150% under the Restaurant Industry Award
- Evening loading after 7pm: applies in some classifications

Working a Friday and Saturday night dinner service can substantially increase weekly earnings if the penalty rates are correctly paid.

## What about tips?

Tipping in Australia is voluntary and far less prevalent than in many countries. The amounts are modest (10% is generous in most venues) and tips:

- Are taxable income and must be declared on the [tax return](/tax-return)
- Do not reduce the employer's obligation to pay award rates
- Are sometimes pooled and distributed by the employer

See our article on [tax on tips](/blog/do-working-holiday-makers-pay-tax-on-tips) for how tips are treated.

## What are the common underpayment patterns?

The Fair Work Ombudsman has identified consistent issues in restaurant service:

- Flat hourly rates with no penalty rates
- Keeping workers at Introductory level beyond three months
- Classifying experienced waiters at Level 1
- Refusing to pay public holiday loading
- Unpaid pre-shift set-up and post-shift clean-up time
- Charging for uniform purchases, laundry, or breakages (generally illegal - see [uniform deductions](/blog/uniform-laundry-deductions-illegal-australia))
- Cash payment with no payslip and no super
- Unpaid trial shifts of full evenings

Each of these is recoverable.

## What if you also work the bar?

Many waiters in smaller venues also serve drinks at the bar. Once you serve alcohol, you need an RSA certificate. The classification typically moves to Level 2 (or stays at Level 2 if you were already there) once alcohol service is part of the duties. See our article on [RSA certificates](/blog/rsa-certificate-australia-working-holiday) for the detail.

A waiter with an RSA who also covers the bar should be paid at Level 2 even if the employer assigned them to "waitressing" on the roster.

## What deductions can waiters claim?

Working holiday makers in waiter roles can typically claim:

- Non-slip work shoes
- Black work clothing if specifically required and not provided
- RSA certificate fees if you paid for it
- A share of phone costs for shift communications
- Limited vehicle costs in specific circumstances

Most waiter deductions are modest. See our article on [tax deductions](/blog/tax-deductions-working-holiday-makers) for the framework.

## How does our service support waiters?

For working holiday makers in waiter roles, our team:

- Identifies the correct award (Restaurant Industry or Hospitality)
- Cross-checks payslips against the correct classification and rate
- Reviews penalty rates for weekend, evening, and public holiday shifts
- Identifies missing pre-shift and post-shift time
- Identifies [unpaid super](/blog/super-employer-not-paying-what-to-do) where contributions are missing
- Reviews any tip income for the tax return
- Lodges the [tax return](/tax-return) capturing every venue

Waiter work generates substantial penalty rate value when properly classified. [Get in touch with our team](/contact) to make sure your restaurant work has been correctly handled.
 `,
 },
 {
 slug: "kitchen-hand-working-holiday-australia",
 title: "Kitchen hand jobs in Australia on a working holiday visa: pay & conditions",
 description:
   "Kitchen hand work is one of the most accessible entry points to Australian hospitality, with no formal qualifications required. Pay rates, typical duties, and how to find shifts as a working holiday maker.",
 category: "Work Rights",
 date: "19 April 2026",
 readTime: 4,
 body: `
Kitchen hand work is one of the most accessible entry points to the Australian hospitality industry for working holiday makers. No formal qualifications are required, the work is consistently available across restaurants, cafes, hotels, and pubs, and the pay rates are set by the [Restaurant Industry Award](/blog/restaurant-industry-award-working-holiday) or [Hospitality Award](/blog/hospitality-award-working-holiday-makers) depending on the venue. Kitchen hands typically work alongside chefs and cooks in the back-of-house area of food service venues, handling washing up, food preparation support, and general kitchen tasks.

The role is the lowest classification in most hospitality awards, but the penalty rates for evening and weekend work still apply, and working a busy Friday night dishwashing shift pays substantially more per hour than the headline base rate.

## What does the work involve?

Kitchen hand duties typically include:

- Washing dishes, pots, pans, and kitchen equipment
- Operating commercial dishwashers
- Basic food preparation (peeling, chopping, portioning)
- Receiving deliveries and stocking the cool room
- Cleaning kitchen surfaces, floors, and equipment
- Taking out kitchen rubbish
- Stocking and rotating ingredients
- Supporting chefs during service

The work is physical, fast-paced during service, and often involves long hours on your feet in a hot environment. It is also where most working holiday makers start when they arrive in Australia without prior hospitality experience.

## What classification applies?

Under the [Restaurant Industry Award](/blog/restaurant-industry-award-working-holiday), kitchen hands are usually:

- **Introductory level**: first three months with no industry experience
- **Level 1 (Kitchen Attendant Grade 1)**: dishwashing, basic cleaning, simple food prep
- **Level 2 (Kitchen Attendant Grade 2)**: more responsible food prep, working with chefs on specific stations

Under the [Hospitality Award](/blog/hospitality-award-working-holiday-makers), the classifications are similar with slightly different rate structures.

## What does kitchen hand work pay?

Pay rates for casual kitchen hands:

- Casual hourly rate for Level 1: typically $28 to $32 per hour (base plus 25% casual loading)
- Saturday loading: 25% to 50% on top depending on the award
- Sunday loading: 50% to 75% on top
- Public holiday loading: 125% to 150% on top
- Evening loadings can apply for shifts starting after 7pm

A casual kitchen hand working a Friday and Saturday night dinner service is earning substantially more than the base rate alone suggests.

## Why kitchen hand work is consistently underpaid

Kitchen hand work has some of the highest rates of underpayment in Australian hospitality. The Fair Work Ombudsman has identified consistent issues:

- Flat hourly rates "to cover everything" with no penalty rates
- Refusing to pay the public holiday loading
- Cash payment with no payslip and no super
- Unpaid pre-shift set-up time
- Unpaid post-shift clean-down time (kitchen hands often stay late to finish washing while service ends)
- Charging for staff meals (the employer providing meals is fine, but charging for them creates issues)
- Refusing to count rostered breaks accurately
- Misclassifying experienced kitchen hands at Level 1 indefinitely

The Fair Work Ombudsman has run multiple national campaigns into kitchen hand underpayment, with consistent findings that most workers are paid below the correct award rate.

## Workplace safety in kitchens

Kitchen work has higher than average rates of workplace injury:

- Cuts from knives and broken glassware
- Burns from ovens, fryers, and hot surfaces
- Slips on wet floors
- Back injuries from lifting heavy stock
- Repetitive strain from prolonged dishwashing

Every injury during paid kitchen work is covered by workers compensation. See our article on [workplace injury rights](/blog/workplace-injury-working-holiday-rights) for the framework. The employer cannot legally pressure you not to claim, and visa status does not affect your right to workers compensation.

## What deductions can kitchen hands claim?

Working holiday makers in kitchen hand roles can typically claim:

- Non-slip work shoes
- Work clothing or aprons if specifically required and not provided
- Knife sharpening if you provide your own knives
- A share of phone costs for shift communications

Deductions are usually modest for kitchen hands compared to other roles. See our article on [tax deductions](/blog/tax-deductions-working-holiday-makers) for the framework.

## How does progression from kitchen hand to other roles work?

Many working holiday makers start as kitchen hands and progress to:

- Kitchen Attendant Grade 2 with more food preparation responsibility
- Cook Grade 1 if they take on cooking duties on a station
- Front-of-house roles (waiter, bartender) once they have RSA training

Each step up is a classification change that should be reflected in the pay rate. If your duties have expanded but the pay has not, the underpayment is recoverable through Fair Work.

## How does our service support kitchen hands?

For working holiday makers in kitchen hand roles, our team:

- Identifies the correct award and classification
- Cross-checks payslips against the correct rate
- Reviews penalty rates for evening, weekend, and public holiday shifts
- Identifies pre-shift and post-shift unpaid time
- Identifies [unpaid super](/blog/super-employer-not-paying-what-to-do) where contributions are missing
- Reviews classification progression when duties have expanded
- Lodges the [tax return](/tax-return) capturing every venue

Kitchen hand work is one of the most consistently underpaid roles in Australian hospitality. [Get in touch with our team](/contact) to make sure your kitchen work has been correctly handled.
 `,
 },

// ─── CONSTRUCTION ─────────────────────────────────────────────────────────
 {
 slug: "construction-laborer-working-holiday-australia",
 title: "Construction labourer jobs in Australia: White Card, pay & working holiday rules",
 description:
   "Construction labouring is one of the highest-paying entry-level roles for working holiday makers in Australia. White Card requirements, typical hourly rates, and what to expect on a construction site.",
 category: "Work Rights",
 date: "29 April 2026",
 readTime: 5,
 body: `
Construction labouring is one of the highest-paying entry-level roles available to working holiday makers in Australia. The work involves general site labour, materials handling, demolition, site clean-up, and assisting tradespeople on residential and commercial building sites. A White Card (also called a Construction Induction Card) is legally required before stepping onto any construction site in Australia. The pay rates are set by the Building and Construction General On-site Award (MA000020), with classifications and allowances that take total earnings well above the general minimum wage.

Construction work also has some of the highest rates of injury in Australia, making workers compensation and the use of proper safety equipment particularly important.

## What does the work involve?

Construction labourer duties typically include:

- Carrying materials around the site
- Mixing and laying concrete
- Site clean-up and waste removal
- Demolition work
- Assisting tradespeople (carpenters, plumbers, electricians)
- Setting up and dismantling scaffolding
- Operating basic plant and equipment
- Earthworks support
- General trades assistant work

The work is physical, weather-exposed, and requires consistent attention to safety. Pay reflects the difficulty and risk of the work.

## What is the White Card requirement?

A White Card is legally required for every person working on a construction site in Australia. Without one, you cannot legally be on site, and the employer cannot legally have you there. The card:

- Is issued after completing the General Construction Induction course
- Takes 6 to 8 hours online or 1 day in person
- Costs $50 to $150 depending on the provider and state
- Is valid in every Australian state and territory once issued
- Does not expire (but lapses if you do not do construction work for 2 years)

See our article on [White Card requirements](/blog/white-card-australia-working-holiday) for the state-by-state detail.

The course covers basic construction safety, identifying hazards, using personal protective equipment (PPE), and your legal obligations as a worker on site.

## What does construction work pay?

Pay rates under the Building and Construction Award are substantially higher than general minimum wage:

- Casual hourly rate for Construction Worker Level 1 (CW1): typically $32 to $36 per hour
- Casual hourly rate for Construction Worker Level 2 (CW2 - basic skills): typically $33 to $37 per hour
- Casual hourly rate for Construction Worker Level 3 (CW3 - more experience): typically $34 to $39 per hour
- Saturday loading: typically 50% on top
- Sunday loading: typically 100% on top
- Public holiday loading: typically 150% on top
- Overtime: typically 50% to 100% loading
- Site allowances: industry allowance, leading hand allowance, height allowance, asbestos allowance

The site allowances are paid on top of the hourly rate and can substantially increase weekly earnings. The Industry Allowance is paid to every construction worker as compensation for working conditions and is one of the most consistently missed payments.

## What allowances apply?

The Building and Construction Award includes a long list of allowances:

- **Industry allowance**: paid to every construction worker, currently around $35 to $50 per week
- **Tool allowance**: where the worker provides their own tools
- **Site allowance**: in some major construction projects
- **Height allowance**: for work above certain heights
- **Wet weather allowance**: where work continues in heavy rain
- **First aid allowance**: for designated first aid officers
- **Travel allowance**: where the work site is far from home or the depot

Working holiday makers often receive only the base rate without any allowances, even though the allowances are mandatory under the award.

## What about workers compensation and construction injuries?

Construction has higher than average rates of injury in Australia. Workers compensation covers every paid construction worker, including working holiday makers, regardless of length of service. The cover includes:

- Medical treatment costs
- Weekly wage payments while you cannot work
- Lump sum payments for permanent impairment

See our article on [workplace injury rights](/blog/workplace-injury-working-holiday-rights) for the framework. The employer cannot legally pressure you not to claim, and visa status is not a relevant factor.

## Employee vs contractor in construction

Some construction work is performed by labourers under ABNs as independent contractors rather than employees. This can be legitimate (a true contractor) or illegitimate (an employee misclassified as a contractor to avoid super and workers comp).

If the work has the characteristics of employment (set hours, employer-provided tools, supervised work, no ability to substitute, no other clients), the classification is most likely wrong. See our article on [employee vs contractor](/blog/employee-vs-contractor-australia) for the test.

For working holiday makers, the cost of being misclassified as a contractor is substantial:

- No super contributions (12% of wages lost)
- No workers compensation cover for injuries
- No paid public holidays
- No casual loading
- No protections under the Building and Construction Award

If you have an ABN and work on construction sites, our team reviews whether the classification is correct as part of preparing your [tax return](/tax-return).

## What deductions can construction labourers claim?

Working holiday makers in construction can typically claim:

- Steel-cap work boots
- High-vis shirts and clothing
- Hard hat (if provided by you)
- Sun protection (sunscreen, sunglasses, hats for outdoor work)
- Tool belt and hand tools (under $300 each for instant deduction - see our article on [the $300 instant deduction](/blog/tools-equipment-under-300-instant-deduction-whv))
- Larger tools and equipment depreciated over time
- White Card course fee
- A share of vehicle running costs for travel to sites (commute is generally not deductible, but travel between sites is)

Construction work typically generates the largest work-related deductions of any working holiday maker role.

## How does our service support construction labourers?

For working holiday makers in construction, our team:

- Identifies the correct classification under the Building and Construction Award
- Cross-checks payslips against the correct rate plus allowances
- Identifies missing industry allowance and other site allowances
- Reviews any ABN classification for legitimacy
- Identifies [unpaid super](/blog/super-employer-not-paying-what-to-do) where contributions are missing
- Captures every legitimate tool and equipment deduction
- Lodges the [tax return](/tax-return) reflecting the full picture

Construction work generates strong earnings and strong deductions. [Get in touch with our team](/contact) to make sure both sides are properly captured.
 `,
 },

// ─── GIG ECONOMY ─────────────────────────────────────────────────────────
 {
 slug: "uber-eats-delivery-rider-working-holiday-australia",
 title: "Uber Eats & food delivery rider jobs in Australia: ABN & tax rules",
 description:
   "Food delivery on a bicycle, e-bike, or scooter is treated as contracting in Australia. ABN required, GST rules (not mandatory under $75k), and what working holiday makers need to set aside for tax.",
 category: "Work Rights",
 date: "12 May 2026",
 readTime: 5,
 body: `
Food delivery work for Uber Eats, DoorDash, Menulog, and similar platforms is one of the most flexible options available to working holiday makers in Australia. The work is performed on a bicycle, e-bike, motorcycle, scooter, or car, and the platform deposits earnings into the rider's bank account directly. From a tax perspective, food delivery is classified as **independent contracting**, which means a working holiday maker delivering for these platforms must have an [ABN](/abn), is responsible for their own tax obligations, and does not have tax withheld automatically. Unlike rideshare passenger transport, food delivery only requires GST registration if turnover exceeds $75,000 per year.

The combination of flexible hours and substantial deductions (vehicle costs, equipment, phone) makes delivery work more financially attractive than the headline per-hour earnings suggest, but only if the tax side is set up correctly from the start.

## What does the work involve?

Food delivery typically involves:

- Receiving orders through the platform app
- Travelling to the restaurant to collect the food
- Delivering the food to the customer
- Operating the platform app for ratings and earnings tracking
- Managing your own equipment (vehicle, delivery bag, phone)

Most riders work for multiple platforms simultaneously to maximise the number of orders available, switching between Uber Eats, DoorDash, and Menulog throughout a shift.

## ABN requirement

Every food delivery rider needs an [ABN](/abn) before they can sign up with the platform. The ABN is required because:

- The platform pays you as a contractor, not an employee
- No PAYG tax is withheld from your earnings
- You are responsible for your own tax obligations
- The platform reports your annual earnings to the ATO under the Sharing Economy Reporting Regime

Without an ABN, the platform cannot legally pay you, and you would face 47% withholding under the No-ABN withholding rule. See our article on [what is an ABN](/blog/what-is-an-abn) for the framework.

## GST: when does it apply?

For food delivery (Uber Eats, DoorDash, Menulog), GST registration is required only if your turnover from delivery work exceeds $75,000 in a financial year. Most working holiday maker delivery riders earn well below this threshold and do not need to register for GST. This is different from passenger rideshare (Uber, Ola, Didi), where GST registration is required from the first dollar earned regardless of turnover. See our article on [Uber driver rules](/blog/uber-driver-working-holiday-australia) for the rideshare differences.

If you are doing both food delivery and rideshare, the GST rules of rideshare apply to all your gig economy income from the first dollar.

## How is delivery income taxed?

Food delivery income is taxed at the [working holiday maker tax rates](/blog/backpacker-tax-rate-australia):

- 15% on the first $45,000
- 30% from $45,000 to $135,000
- Higher rates above $135,000

Because no tax is withheld from delivery earnings, you typically owe tax at the end of the financial year unless you have offsetting PAYG income with tax withheld. Setting aside 15% to 25% of every delivery payment into a separate account is a practical way to make sure the tax can be paid when the [tax return](/tax-return) is lodged.

## What deductions can delivery riders claim?

Delivery work generates substantial work-related deductions:

- **Bicycle**: depreciation over its effective life (3 to 5 years), repairs, maintenance, tyres, chains, brake pads
- **E-bike**: as above, plus electricity for charging (estimated)
- **Motorcycle or scooter**: fuel, registration, insurance (work portion), maintenance, depreciation
- **Car**: cents-per-kilometre method (up to 5,000 km) or logbook method (see our article on [vehicle expenses](/blog/vehicle-logbook-abn-working-holiday))
- **Delivery equipment**: bag, helmet, lights, lock, panniers
- **Mobile phone**: the work-related percentage of the bill plus the work-related percentage of the device cost
- **Phone holder, dash cam**, other vehicle accessories
- **Cleaning supplies** for the vehicle
- **Platform service fees** taken by Uber/DoorDash/Menulog

A typical part-time delivery rider can have $3,000 to $8,000 of legitimate deductions per year. Without these deductions, the taxable income is substantially overstated. See our article on [ABN deductions](/blog/abn-deductions-business-expenses) for the framework, and our article on [bicycle and vehicle deductions](/blog/bicycle-motorcycle-vehicle-deductions-working-holiday) for the vehicle-specific rules.

## What records do you need?

For every delivery rider, the records that matter are:

- The annual statement from each platform showing your gross earnings
- Bank statements showing platform deposits
- Receipts for every work-related expense (bicycle, equipment, phone, vehicle costs)
- A logbook or representative period for the work-use percentage of any shared-use items
- A diary of total kilometres travelled for delivery work

The platform reports your annual earnings to the ATO directly, so under-reporting income is one of the easiest ways to trigger an ATO review. The income side is fixed; the deduction side is where the optimisation happens.

## Workers compensation: is there any?

Delivery riders working as contractors with an ABN are **not** automatically covered by workers compensation. If you are injured during a delivery shift, the cover is more limited than it would be for an employee. Some platforms offer optional injury insurance products, and personal accident insurance can be purchased separately. The bicycle insurance side is a separate question.

See our article on [workplace injury rights](/blog/workplace-injury-working-holiday-rights) for the framework. The difference between employee and contractor cover is one of the trade-offs of gig economy work.

## How does our service support delivery riders?

For working holiday makers doing food delivery, our team:

- Registers your ABN with the correct business activity codes
- Reviews whether GST registration is required (rarely is)
- Reconciles platform statements with the ATO Sharing Economy data feed
- Identifies every legitimate work-related deduction (vehicle, equipment, phone, fees)
- Calculates the tax owed at the end of the year accurately
- Lodges the [tax return](/tax-return) with the full deduction picture

Delivery work without proper tax management often leads to a surprise tax bill at the end of the year. [Get in touch with our team](/contact) before you start (or as early as possible if you have already started) to set up the tax side correctly.
 `,
 },
 {
 slug: "uber-driver-working-holiday-australia",
 title: "Uber driver & rideshare jobs in Australia: ABN, GST & BAS for working holiday makers",
 description:
   "Rideshare driving in Australia requires an ABN, GST registration from the first dollar, and quarterly Business Activity Statements (BAS). Full tax setup guide for working holiday makers driving Uber, DiDi or Ola.",
 category: "Work Rights",
 date: "15 May 2026",
 readTime: 5,
 body: `
Driving for Uber, Ola, Didi, or any other rideshare passenger platform in Australia is treated as independent contracting and is subject to the strictest tax rules of any gig economy work. A working holiday maker driving rideshare must have an [ABN](/abn), must register for GST from the first dollar of fare income regardless of total turnover, and must lodge quarterly Business Activity Statements (BAS) to remit GST to the ATO. The GST rule for rideshare is different from food delivery: rideshare is GST-mandatory from dollar one; food delivery is not.

Working holiday makers who start rideshare without realising the GST and BAS requirements often build up significant GST debts to the ATO over their first months of driving. Setting up correctly from the start avoids that.

## What does rideshare driving involve?

Rideshare driving typically includes:

- Driving a passenger from a pickup location to a destination using the platform app
- Accepting and rejecting ride requests through the app
- Operating your own vehicle (Uber and Ola have specific vehicle requirements)
- Maintaining a passenger-friendly vehicle (cleanliness, condition)
- Following platform pricing (set by the platform, not the driver)
- Managing your own tax obligations

## What are the vehicle requirements?

Rideshare platforms have specific requirements for the vehicle you use, which typically include:

- A four-door sedan, hatchback, SUV, or wagon (usually no commercial vehicles)
- A maximum age limit (typically under 10 years from manufacture)
- Passenger comfort standards
- A current registration and roadworthy
- Comprehensive insurance (some platforms require an Uber-specific insurance product)
- A platform inspection of the vehicle

Working holiday makers without a suitable vehicle sometimes rent one through a rideshare-friendly rental scheme. The rental cost is a deduction against the income.

## What about state-by-state driver authorisation?

Most Australian states and territories require rideshare drivers to obtain a separate driver authorisation in addition to their normal driver's licence:

- NSW: Passenger Transport Authorisation (PTA)
- Victoria: Commercial Passenger Vehicle (CPV) accreditation
- Queensland: Driver Authorisation
- South Australia: General Passenger Transport Accreditation
- Western Australia: PTD authorisation
- ACT: Public Vehicle Licence

The process typically includes a police check, medical assessment, and a small fee. Working holiday makers can apply for these authorisations, but the rules are state-specific and can change.

## What is the GST rule that catches most rideshare drivers?

For ordinary ABN work, GST registration is only required once turnover passes $75,000 per year. For **rideshare driving specifically**, GST registration is required from the first dollar of fare income. This rule covers:

- Uber rides (passenger transport)
- Ola, Didi, and other rideshare platforms
- Any passenger transport for a fare

The rule does **not** apply to:

- Uber Eats and other food delivery (these follow the standard $75,000 threshold - see our article on [Uber Eats delivery](/blog/uber-eats-delivery-rider-working-holiday-australia))
- Logistics or parcel delivery (also follow the standard threshold)

If a driver does both rideshare and food delivery, the rideshare GST rule applies to all income from the first dollar.

## What does GST registration mean in practice?

Once registered for GST, the rideshare driver must:

- Add GST (1/11th of the fare) to every fare
- Lodge a quarterly Business Activity Statement (BAS) with the ATO
- Remit the GST collected to the ATO each quarter
- Claim GST credits on business expenses (fuel, services, parts, vehicle finance)

In practice for rideshare, the GST is built into the fare paid by the passenger, so the driver does not "add" GST to a quoted price. The platform reports the gross fare; the driver is responsible for remitting 1/11th to the ATO.

The net cost of GST after credits is typically 5% to 8% of fare income for an active rideshare driver, because most of the GST collected on fares is offset by GST credits on fuel and vehicle costs.

## What about quarterly BAS deadlines?

Business Activity Statements are due quarterly:

- Quarter 1 (July to September): due 28 October
- Quarter 2 (October to December): due 28 February
- Quarter 3 (January to March): due 28 April
- Quarter 4 (April to June): due 28 July

Lodgement under the supervision of a registered tax agent typically extends the deadline by 4 weeks. Missing a BAS lodgement triggers Failure to Lodge penalties similar to those for late tax returns. See our article on [late tax return penalties](/blog/late-tax-return-penalty-working-holiday) for the framework.

## What deductions can rideshare drivers claim?

Rideshare generates significant work-related deductions:

- **Vehicle running costs**: fuel, oil, services, repairs, tyres
- **Vehicle finance interest** (the work-related portion)
- **Registration and CTP insurance** (the work-related portion)
- **Comprehensive insurance** (the work-related portion)
- **Vehicle depreciation** (or rental cost if leased)
- **Tolls and parking** incurred during work
- **Mobile phone**: the work-related percentage of the bill plus device
- **Phone holder, dash cam, in-car accessories**
- **Cleaning of the vehicle**
- **Platform service fees** taken by Uber/Ola/Didi
- **Driver authorisation fees**

The two methods for vehicle deductions are cents-per-kilometre (capped at 5,000 km per car per year) and logbook (no cap, requires a 12-week logbook). For full-time rideshare drivers, the logbook method almost always gives a larger deduction. See our article on [vehicle expenses and logbooks](/blog/vehicle-logbook-abn-working-holiday) for the detail.

A full-time rideshare driver can have $20,000 to $40,000 of legitimate vehicle and equipment deductions per year. Without proper records and the right method, this is left on the table.

## How does our service support rideshare drivers?

For working holiday makers driving rideshare, our team:

- Registers your ABN with the correct rideshare business activity codes
- Registers you for GST from the start
- Lodges quarterly BAS through our tax agent portal
- Reconciles platform statements with the ATO data feed
- Identifies every legitimate work-related deduction (vehicle, equipment, fees)
- Calculates net GST liability with credits properly captured
- Lodges the [tax return](/tax-return) with the full picture

Rideshare is the most tax-heavy gig economy work for working holiday makers, and the difference between proper handling and going it alone can be thousands of dollars in penalties, missed credits, and over-paid tax. [Get in touch with our team](/contact) before you start driving (or as early as possible if you have already started) to set up the structure correctly.
 `,
 },

// ─── SEASONAL / TOURISM ──────────────────────────────────────────────────
 {
 slug: "ski-resort-jobs-working-holiday-australia",
 title: "Ski resort jobs in Australia on a working holiday visa (Victoria & NSW)",
 description:
   "Ski resort work in Australia runs from June to September across Victorian and NSW resorts. Pay rates, accommodation, lift passes, and how to apply as a working holiday maker for the winter season.",
 category: "Work Rights",
 date: "16 May 2026",
 readTime: 5,
 body: `
Australia's ski season runs from June through September, with major resorts in Victoria (Mount Hotham, Falls Creek, Mount Buller) and New South Wales (Thredbo, Perisher, Charlotte Pass) hiring large seasonal workforces every winter. Working holiday makers fill many of these roles, including lift operations, ski school assistance, hospitality, retail, accommodation, snowmaking, and grooming. Most ski resort jobs include on-mountain accommodation as part of the package, which simplifies the practical side of living on the mountain but adds complexity on the tax side.

Ski resort hiring opens in March and April each year, with most positions filled by June. Working holiday makers planning to work the ski season typically apply well in advance and need to be in Australia or able to arrive by the start of the season.

## What roles are available?

Major ski resort employers hire across:

- **Lift operations**: loading and unloading chairlifts, T-bars, and gondolas; managing queues
- **Ski and snowboard instruction**: requires certification (Australian Professional Snowsport Instructors qualifications or international equivalents)
- **Ski patrol**: requires medical and ski/board qualifications
- **Hospitality**: bars, restaurants, cafes, food courts (covered by the [Hospitality Award](/blog/hospitality-award-working-holiday-makers))
- **Accommodation**: housekeeping, reception, concierge in resort lodges
- **Retail**: hire shops, clothing stores, equipment fitting
- **Snowmaking**: overnight shifts producing artificial snow
- **Slope grooming**: overnight shifts on snow cats
- **Lessons admin and bookings**: office-based support roles
- **Ticketing**: resort entry and ticket sales

The classification under the relevant award depends on the role, not the fact that the resort is in a ski area.

## What does ski resort work pay?

Pay depends on the role and the award that covers it:

- Lift operations: typically covered by the Amusement, Events and Recreation Award or a specific enterprise agreement
- Hospitality: Hospitality Award applies, with base hourly rates plus penalty rates for evening, weekend, and public holiday work
- Ski instruction: covered by specific arrangements with the resort or ski school operator
- Snowmaking and grooming: overnight loadings typically apply
- Retail: Retail Industry Award applies

Casual rates with penalty rates can be substantially above the headline base figure, particularly for evening and weekend work. Weekends in ski season are the peak revenue periods, and casual workers often work most of their hours on Friday, Saturday, and Sunday.

## What about accommodation arrangements?

Most ski resort jobs include on-mountain or near-mountain accommodation as part of the package. The arrangements vary:

- Some resorts provide free or subsidised accommodation as a fringe benefit
- Others charge a weekly rent deducted from wages
- Some require workers to find their own accommodation, with limited support

The tax treatment depends on the arrangement:

- Genuinely free or subsidised accommodation as part of the job may be a tax-exempt fringe benefit
- Accommodation paid for through a wage deduction must be a lawful deduction (see our article on [uniform and laundry deductions](/blog/uniform-laundry-deductions-illegal-australia) for the test on what is lawful)
- Accommodation that is heavily subsidised below market value may have fringe benefits tax implications for the employer

When you lodge a [tax return](/tax-return) through our service, we review the accommodation arrangement and make sure the wages and deductions reflect the actual position.

## How does specified work and the second year visa?

Ski resort work can count toward the 88 days of specified work for a second year working holiday visa, but only if it falls within an eligible category and is in a designated regional postcode. The main eligible categories that ski resort work can fall under are:

- Tourism and hospitality in a designated remote or very remote area
- Some maintenance and construction work
- Some agricultural-adjacent work (less common at ski resorts)

Most ski resort areas in Australia are in designated regional postcodes, but not all. Verify the postcode and the work type before relying on ski work to qualify for the second year visa.

## What about workers compensation in snow sports?

Snow-related work has higher than average injury rates. Workers compensation covers every employee, including working holiday makers, for injuries during paid work. The cover includes:

- Snow injuries during instruction, patrol, or grooming
- Slips and falls in resort buildings
- Lifting injuries from gear hire
- Cold-related injuries

See our article on [workplace injury rights](/blog/workplace-injury-working-holiday-rights) for the framework.

## What deductions can ski resort workers claim?

Working holiday makers in ski resort roles can typically claim:

- Resort uniform if not provided
- Non-slip work footwear
- Sun protection (high altitude sun exposure is significant)
- Goggles or eyewear specifically for instructor or outdoor roles
- Ski or snowboard equipment if used directly for instruction work (with apportionment for any personal use)
- Course fees for ski/snowboard instructor qualifications
- A share of phone costs for work coordination
- Travel between mountain locations during the working day

Ski instructors with their own equipment can have substantial deductions. The personal-use apportionment is important: equipment used 60% for instruction and 40% for personal skiing is 60% deductible.

## How does our service support ski resort workers?

For working holiday makers in ski resort roles, our team:

- Identifies the correct award for each specific role
- Cross-checks payslips against the correct classification and rate
- Reviews accommodation arrangements for tax implications
- Identifies penalty rate underpayments for evening, weekend, and public holiday shifts
- Reviews any second-year visa eligibility based on the work and location
- Identifies legitimate deductions for instructor equipment and uniforms
- Lodges the [tax return](/tax-return) reflecting the full picture

Ski seasons generate concentrated earnings over a 3-to-4 month period, which often pushes workers into higher tax brackets if rest-of-year income is also present. [Get in touch with our team](/contact) to make sure your ski season has been properly handled.
 `,
 },

// ─── RETAIL ──────────────────────────────────────────────────────────────
 {
 slug: "supermarket-work-coles-woolworths-working-holiday",
 title: "Coles, Woolworths & ALDI jobs on a working holiday visa in Australia",
 description:
   "Australia's major supermarket chains hire working holiday makers for shelf stacking, checkout, deli, and night fill. Pay rates under the General Retail Industry Award, penalty rates, and how to apply.",
 category: "Work Rights",
 date: "23 May 2026",
 readTime: 5,
 body: `
Australia's major supermarket chains (Coles, Woolworths, ALDI, IGA, and Foodland) employ tens of thousands of casual workers across their store networks. Working holiday makers fill checkout, customer service, stocking, deli, bakery, and overnight replenishment roles in large numbers. The work is covered by the General Retail Industry Award (MA000004), which sets minimum hourly rates, penalty rates for weekend and evening shifts, and conditions for casual employees. Some supermarket chains have enterprise agreements that adjust the award rates, but the agreements must leave each worker better off overall than the award would.

Supermarket work is one of the most predictable and well-regulated entry-level jobs in Australia, but classification mistakes and missed penalty rates still happen regularly.

## What roles are available?

Major supermarket employers hire across:

- **Checkout operators**: scanning items, processing payments, customer service
- **Customer service**: returns, queries, gift cards, layby
- **Grocery filling and stocking**: shelf restocking during opening hours
- **Overnight replenishment**: stocking shelves after store close
- **Fresh departments**: deli, butcher, bakery, fruit and veg, seafood
- **Liquor (where applicable)**: requires an RSA certificate
- **Online order picking**: filling online orders for click-and-collect or home delivery
- **Receiving and warehouse**: dock work, stock receiving
- **Trolley collection**: in the carpark
- **Cleaning**: in-store cleaning during and after trading

Different roles have different classification levels under the General Retail Industry Award.

## What classifications apply?

The General Retail Industry Award has multiple levels:

- **Level 1**: general retail employees with standard duties
- **Level 2**: more experienced employees with broader duties
- **Level 3**: employees with delegated authority, training others
- **Higher levels**: supervisors and managers

Most working holiday makers in supermarket roles are Level 1 or Level 2. The level depends on the actual duties, not the job title.

## What does supermarket work pay?

Pay depends on the award (or enterprise agreement), classification, and shift timing:

- Casual hourly rate for Level 1 under the General Retail Award: typically $30 to $33 per hour (base plus 25% casual loading)
- Saturday loading: typically 25% on top
- Sunday loading: typically 50% on top
- Public holiday loading: typically 125% on top
- Evening loading after 6pm Monday to Friday: small loading
- Overnight loading after midnight: higher rate

Coles and Woolworths both have enterprise agreements that adjust these rates. The agreements generally provide better pay than the award. ALDI tends to apply the award more directly.

Working a Saturday, Sunday, and a weekday evening can substantially exceed the base hourly rate alone.

## The enterprise agreement difference

Both Coles and Woolworths operate under enterprise agreements that override the General Retail Award. The agreements typically:

- Set base rates slightly above the award
- Adjust the penalty rate structure (sometimes higher, sometimes lower than the award)
- Provide some additional benefits (uniforms, discounts)
- Apply different rules for breaks and overtime

The agreement must pass the Better Off Overall Test (BOOT), meaning each worker must be better off under the agreement than they would be under the award. If the agreement leaves workers worse off, it cannot be legally enforced.

For working holiday makers, the practical effect is that the actual pay structure at Coles or Woolworths is governed by the enterprise agreement, not the General Retail Award directly. The agreement is publicly available through the Fair Work Commission.

## How does overnight work and shift loading?

Many supermarkets run overnight replenishment shifts (typically 10pm to 6am). Overnight work attracts:

- Significantly higher shift loading rates
- Often a daily allowance
- In some agreements, additional rest day entitlements

Overnight roles are popular with working holiday makers because the pay per hour is substantially higher than daytime checkout work, and the shifts run continuously rather than in split patterns.

## Workers compensation

Supermarket work has typical retail injury patterns: back injuries from lifting, slips on wet floors, cuts in deli or bakery work, repetitive strain at checkouts. Workers compensation covers every employee for injuries during paid work. See our article on [workplace injury rights](/blog/workplace-injury-working-holiday-rights) for the framework.

## What deductions can supermarket workers claim?

Working holiday makers in supermarket roles can typically claim:

- Non-slip work shoes
- Specific work clothing if the employer requires items not provided
- Laundry of provided uniforms (where the employer does not provide the laundry service)
- A share of phone costs for shift coordination
- RSA certificate fees if you work in the liquor section
- Training course fees if directly related to the role

Deductions are usually modest for supermarket workers compared to trades or hospitality. See our article on [tax deductions for working holiday makers](/blog/tax-deductions-working-holiday-makers) for the framework.

## What about staff discounts and other benefits?

Staff discounts at supermarkets are typically:

- Not classified as taxable income (they are minor benefits)
- Not deductible as a "cost saved"
- Not part of award compliance (discounts do not count toward minimum wage)

The discounts are a non-taxable perk rather than a tax issue.

## What are the common issues at major supermarkets?

Despite the well-defined agreements, issues still arise:

- Missed penalty rates on public holidays (where the holiday falls on a regular working day)
- Classification at Level 1 indefinitely despite expanded duties
- Unpaid pre-shift set-up time
- Missing overnight loadings on shifts that crossed the trigger time
- Issues with leave loading for permanent staff transitioning from casual

Most of these are recoverable through the employer's HR process or, if that fails, through Fair Work.

## How does our service support supermarket workers?

For working holiday makers in supermarket roles, our team:

- Identifies whether the employer is under the award or an enterprise agreement
- Cross-checks payslips against the applicable agreement and classification
- Reviews penalty rates for weekend, evening, overnight, and public holiday shifts
- Identifies [unpaid super](/blog/super-employer-not-paying-what-to-do) where contributions are missing
- Lodges the [tax return](/tax-return) capturing every employer

Supermarket work is well-paid relative to many other entry-level options, but the classification and penalty rates still need to be checked. [Get in touch with our team](/contact) to make sure your supermarket work has been correctly handled.
 `,
 },

// ─── REMOTE / OUTBACK ─────────────────────────────────────────────────────
 {
 slug: "station-hand-cattle-station-working-holiday-australia",
 title: "Station hand & cattle station jobs in outback Australia for working holiday makers",
 description:
   "Cattle stations and remote outback properties hire working holiday makers for livestock work, mustering, fencing, and general property maintenance. Pay, conditions, accommodation, and 2nd year visa eligibility.",
 category: "Work Rights",
 date: "26 May 2026",
 readTime: 6,
 body: `
Cattle stations and remote outback properties in Northern Territory, Western Australia, Queensland, and South Australia hire working holiday makers each year for station hand work. The roles include livestock mustering, cattle handling, fencing, water trough maintenance, machinery operation, bore work, and general property maintenance across some of the most remote workplaces in Australia. Station hand work is covered by the Pastoral Award (MA000035), counts toward the 88 days of specified work for a second year visa, and almost always includes accommodation and meals as part of the package.

Station work is one of the most rewarding and one of the most demanding experiences available on a working holiday visa. The isolation, weather, and physical demands are substantial; the practical issues around tax, super, and pay can also be substantial because of the remoteness and the accommodation arrangements.

## What does station hand work involve?

Station hand duties typically include:

- Livestock mustering (on horseback, motorbike, helicopter support, or buggy)
- Cattle handling in yards (drafting, drenching, branding, vaccinating)
- Calving and newborn care
- Fencing construction and repair
- Bore and water infrastructure maintenance
- Tractor and machinery operation
- Property maintenance (sheds, yards, vehicles)
- Cooking for the team in larger stations (camp cook role)
- Bookkeeping and station administration (less common for working holiday makers)

The specific tasks depend on the type of station: a cattle station differs from a sheep station, and operations vary by region and size.

## Where are the major station areas?

The main cattle station regions are:

- **Northern Territory**: Barkly Tableland, Victoria River District, Top End
- **Western Australia**: Kimberley, Pilbara, mid-west, southern wheatbelt
- **Queensland**: Channel Country, north-west Queensland, Gulf Country
- **South Australia**: Far north, Eyre Peninsula

Each region has different climate patterns (wet and dry seasons in the north; hot summers and cooler winters in the south), which affects the timing of the work.

## What award applies?

Station hand work is covered by the Pastoral Award (MA000035), which sets minimum hourly rates, classifications, and conditions. The classifications include:

- **Farm and Livestock Hand Level 1**: new workers, basic tasks under supervision
- **Farm and Livestock Hand Level 2**: experienced workers with some autonomy
- **Farm and Livestock Hand Level 3**: skilled workers, machinery operation, supervised teams
- **Higher levels**: leading hands, head stockmen, station managers

Specific classifications also exist for sheep work (shearers, shed hands, classers), broadacre cropping operators, and other specialised roles.

## What does station work pay?

Pay structures on cattle stations vary widely:

- Hourly award rates (typically $26 to $34 per hour for casual workers depending on classification)
- All-found arrangements: a weekly rate that includes accommodation and meals
- Daily rates for specific musters or campaigns

The Pastoral Award sets the minimum hourly rate as the legal floor. Where accommodation and meals are provided, the value can be deducted from wages within strict limits set in the award. Many stations operate on enterprise agreements or individual arrangements that adjust the structure but must still pass the Better Off Overall Test against the award.

Some stations also offer bonuses for specific outcomes (cattle weight gain, calving rates, project completion), which form part of taxable income.

## What about accommodation and the "all-found" arrangement?

Most station hand roles include accommodation and meals as part of the package. This is the "all-found" arrangement common in rural Australia. The structure typically is:

- The station provides a room or share quarters in the homestead or staff accommodation
- Meals are provided in the station kitchen or as rations for remote camps
- A weekly rate is paid in cash for personal expenses

The tax treatment depends on the exact arrangement:

- The value of accommodation and meals may be considered a tax-exempt fringe benefit in many genuine remote station cases
- Where accommodation is "deducted" from wages, the deduction must be lawful and within the award limits
- Living-away-from-home allowances may apply for some classifications

The remoteness exemptions for fringe benefits tax often apply to cattle stations in genuinely remote areas, which can make the package more tax-efficient than the headline cash wage suggests.

## How does specified work and the second year visa?

Station hand work counts toward the 88 days of specified work for a second year working holiday visa, provided:

- The work is performed in a designated regional postcode (most cattle stations are)
- The work falls within the eligible "specified work" categories (animal cultivation, including livestock)
- The work is paid
- The work is documented with payslips and reported to the ATO

Most station areas are in eligible postcodes, and most station work fits the eligible categories. The key practical issue is making sure the work is properly documented for the immigration application.

## What about workers compensation in remote areas?

Workers compensation covers every employee on a cattle station, regardless of remoteness or length of service. The cover includes:

- Medical treatment costs (including air ambulance evacuation from remote areas)
- Weekly wage payments while you cannot work
- Lump sum payments for permanent impairment

Station work has higher injury rates than most industries because of:

- Animal handling injuries (kicks, crushing, falls from horseback)
- Vehicle and machinery incidents on rough terrain
- Heat-related illness in the wet/dry seasons
- Snake and other animal encounters
- Isolation that complicates emergency response

The Royal Flying Doctor Service and other remote medical services are sometimes the only access to care, and workers compensation covers the costs.

See our article on [workplace injury rights](/blog/workplace-injury-working-holiday-rights) for the framework.

## What deductions can station hands claim?

Working holiday makers in station roles can typically claim:

- Work boots (riding boots, work boots for yard work)
- Hat (akubra or similar protective hat for sun exposure)
- Work clothing (long-sleeve shirts, riding pants, sun protection)
- Gloves
- Personal tools (knife, leatherman, fencing tools if provided by worker)
- Saddle and tack if provided by worker for stock work
- Phone costs for the work-related portion

Station hands with their own gear (saddles, ropes, dogs in some cases) can have substantial deductions. The deductibility depends on whether the gear is principally for the work or for personal use.

## How does our service support station hands?

For working holiday makers in station hand roles, our team:

- Identifies the correct classification under the Pastoral Award
- Reviews accommodation and meal arrangements for tax implications
- Cross-checks payslips against the correct rate
- Reviews any remote area or fringe benefits adjustments
- Identifies [unpaid super](/blog/super-employer-not-paying-what-to-do) where contributions are missing
- Captures legitimate work-related deductions
- Coordinates documentation for second year visa applications
- Lodges the [tax return](/tax-return) capturing the full picture

Station work has unique tax complications because of the remoteness, the accommodation arrangements, and the often unstructured payment patterns. [Get in touch with our team](/contact) before you leave Australia to make sure your station work has been correctly handled.
 `,
 },

// ─── NEW POSTS - BATCH 4: SUPER RATE UPDATE ──────────────────────────────

 {
 slug: "super-rate-12-percent-2025-2026-increase",
 title: "Super rate 12% from July 2025: what it means for working holiday makers",
 description:
   "From 1 July 2025, the Superannuation Guarantee rate increased from 11.5% to 12%. How this affects working holiday maker pay, your DASP payout, and what to check on your payslip.",
 category: "Super",
 date: "29 May 2026",
 readTime: 4,
 body: `
From 1 July 2025, the Superannuation Guarantee (SG) rate that Australian employers must pay into employee super funds increased from 11.5% to 12% of ordinary time earnings. This is the final step in a scheduled series of increases that began in 2014 and is now complete: the rate stays at 12% from 2025-26 onwards. For working holiday makers, the change means slightly larger super contributions on every dollar earned, and a correspondingly larger [DASP](/blog/what-is-dasp-super-withdrawal) payment when leaving Australia.

The 0.5 percentage point increase looks small but adds up across a working holiday year. On $40,000 of wages, the difference between 11.5% and 12% is $200 of additional super contributions that flow through to the eventual DASP payment.

## What is the Superannuation Guarantee?

The Superannuation Guarantee is the minimum percentage of an employee's ordinary time earnings that an Australian employer must pay into a super fund. The rate is set by federal law and applies to almost every employee, including working holiday makers, regardless of visa status, length of employment, or whether the worker is casual, part-time, or full-time. See our article on [how much super your employer should be paying](/blog/how-much-super-should-employer-pay) for the underlying framework.

## The full history of rate increases

The Superannuation Guarantee rate has stepped up over more than a decade:

- 2013-14: 9.25%
- 2014-15 to 2020-21: 9.5%
- 2021-22: 10%
- 2022-23: 10.5%
- 2023-24: 11%
- 2024-25: 11.5%
- **2025-26 onwards: 12%** (final rate)

The rate now stays at 12%. There are no further increases scheduled, so a working holiday maker starting work in Australia from 1 July 2025 onwards receives the full 12% on every pay run.

## What this means in dollar terms

The difference of 0.5 percentage points compounds across a working holiday maker's earnings:

- **$20,000 of wages**: 11.5% = $2,300 super, 12% = $2,400 super → $100 more
- **$40,000 of wages**: 11.5% = $4,600 super, 12% = $4,800 super → $200 more
- **$60,000 of wages**: 11.5% = $6,900 super, 12% = $7,200 super → $300 more

After the 65% [DASP tax for working holiday makers](/blog/dasp-tax-rate-65-percent-explained), the worker receives 35% of the gross super. The net effect on DASP payment is therefore roughly:

- $20,000 of wages: $35 more in the pocket
- $40,000 of wages: $70 more in the pocket
- $60,000 of wages: $105 more in the pocket

The DASP tax of 65% is a much larger factor than the rate increase, but the rate increase still adds to the eventual payment.

## When does the new rate apply?

The 12% rate applies to ordinary time earnings paid on or after 1 July 2025. The trigger is the date of payment, not the date the work was performed. This means:

- Work performed in June 2025 but paid in July 2025: 12% applies
- Work performed in July 2025 but paid in early August 2025: 12% applies
- Quarterly payment for the April-June 2025 quarter, paid by 28 July 2025: 11.5% applies (the rate at the time the earnings accrued)

Employers handling quarterly super payments need to apply the correct rate to each quarter, which sometimes leads to under-payment when employers default to the new rate for old earnings.

## How do you check your employer is paying 12%?

The employer must show super accrual on your payslip and remit the contribution to your fund at least quarterly. To check the rate is correct:

1. Look at your payslip for the super amount shown
2. Divide that amount by your ordinary time earnings for the pay period
3. The result should be 12% (0.12) for any earnings from 1 July 2025 onwards

If the result is 11.5% or lower, the employer is using an outdated rate. Some payroll systems were slow to update and some employers manually set rates rather than relying on automatic updates. The underpayment is recoverable, and our team handles this as part of preparing the [tax return](/tax-return) or DASP application.

## What if you have worked across multiple rate periods?

A working holiday maker who started work before 1 July 2024 (at 11%) and continued into 2025-26 (at 12%) has had super paid at three different rates over the journey:

- Work in 2023-24: 11%
- Work in 2024-25: 11.5%
- Work in 2025-26: 12%

Each rate applies to the period when the wages were earned. Tracking the correct rate across rate changes is one of the technical issues that our team handles when reconciling super contributions during a DASP application. See our article on [unpaid super and what to do](/blog/super-employer-not-paying-what-to-do).

## Does the rate increase change anything else?

The 12% rate is the only number that changed. The other parts of the super system stayed the same:

- Super must still be paid at least quarterly
- Super must be paid on ordinary time earnings (not overtime, in most cases)
- The [DASP tax rate of 65%](/blog/dasp-tax-rate-65-percent-explained) for working holiday makers is unchanged
- The threshold rules for contributions (the old $450 monthly minimum was removed in 2022 and remains removed)
- The choice of super fund still rests with the employee through a Standard Choice form
- [Super stapling](/blog/super-stapling-rule-australia) still applies for new employment relationships

## What about the threshold change in 2022?

A related change worth knowing about: before July 2022, employers only had to pay super on monthly wages above $450. Since 1 July 2022, that threshold has been removed, and super is payable on every dollar of ordinary time earnings, no matter how small. This was a significant change for working holiday makers in casual hospitality, retail, and similar roles where individual pay periods were often below $450. Every dollar earned now generates super at 12%.

## How does our service handle the rate change?

When you lodge a DASP or [tax return](/tax-return) through our service, our team:

- Reconciles super contributions across rate change boundaries (10.5% to 11% to 11.5% to 12%)
- Identifies any pattern of under-rate payments by individual employers
- Pursues unpaid super through the ATO Superannuation Guarantee Charge process where contributions are missing
- Calculates the expected gross and net DASP payment based on the correct rates
- Lodges DASP applications with each fund holding contributions

The 12% rate is now the final settled level for the Superannuation Guarantee. Every working holiday maker working in Australia from July 2025 onwards should see this rate applied correctly. [Get in touch with our team](/contact) to make sure your super contributions reflect the rate that should have applied across every pay period of your time in Australia.
 `,
 },

// ─── NEW POSTS - BATCH 5: MONEY TRANSFER + TAX DEBT (2 articles) ─────────

 {
 slug: "bringing-money-into-australia-10000-reporting-threshold",
 title: "Bringing money into Australia: the $10,000 reporting threshold and what working holiday makers need to know",
 description:
   "Travellers can bring any amount of cash or transfer any amount into Australia, but movements of $10,000 or more must be reported to AUSTRAC.",
 category: "Tax Return",
 date: "1 June 2026",
 readTime: 4,
 body: `
A working holiday maker arriving in Australia can bring any amount of money into the country, in cash or via bank transfer. There is no legal limit on the amount you can bring, and the act of bringing money into Australia does not, by itself, trigger any tax. However, movements of physical currency of A$10,000 or more (or the foreign currency equivalent) must be reported to AUSTRAC, the Australian financial intelligence agency, on entry to Australia. International electronic transfers of A$10,000 or more are reported automatically by the bank or money service provider.

The reporting requirement exists to monitor financial flows for money laundering and proceeds of crime, not to tax legitimate savings. Working holiday makers regularly worry that bringing their savings into Australia will create a tax bill: it does not, provided the funds are legitimately earned savings.

## What is the $10,000 reporting rule?

Australia's anti-money laundering laws require that any movement of physical currency of A$10,000 or more (or the equivalent in another currency) into or out of Australia be reported to AUSTRAC. The report is submitted via the Cross-Border Movement Report, which can be lodged:

- At the airport on arrival or departure
- Online through AUSTRAC's reporting system
- At the border with cash declaration forms provided by Australian Border Force

The threshold applies to **physical currency** (notes and coins). It includes cash carried in person, in luggage, in mail, or sent through a courier. The rule is not specific to working holiday makers; it applies to every person entering or leaving Australia.

For electronic transfers, the same A$10,000 threshold triggers automatic reporting by the bank or money transfer service to AUSTRAC. You do not personally lodge anything; the bank handles the reporting.

## Does the reporting create a tax obligation?

No. The reporting itself does not create any tax liability. The Australian Taxation Office (ATO) and AUSTRAC are separate agencies with different roles:

- **AUSTRAC** monitors financial flows for money laundering, terrorism financing, and serious organised crime
- **The ATO** administers tax law

Bringing $25,000 of legitimate savings from Germany to start a working holiday is reported to AUSTRAC at the border, but no tax is triggered. The savings are pre-existing, were earned and taxed (where applicable) in your home country, and are not Australian-source income.

What can create a tax issue is if the money is **income that was earned in Australia but not declared**, or if it forms part of an arrangement that the ATO views as tax avoidance. For ordinary working holiday savings, there is no issue.

## What about bringing money in below $10,000?

If you bring less than A$10,000 (or equivalent), no reporting is required. The threshold is per movement, not per year, so:

- Bringing $9,000 in cash on arrival: no report needed
- Receiving a $9,000 international transfer to your Australian bank account: bank reports nothing
- Bringing $11,000 in cash: AUSTRAC report required
- Receiving a $15,000 international transfer: bank reports automatically

Splitting larger amounts deliberately to avoid the reporting threshold (called "structuring") is itself a criminal offence under the anti-money laundering laws. Sending $9,000 today and $9,000 tomorrow with the intention of avoiding the $10,000 report is a structured transaction and can attract penalties more serious than the original report would have. The simple position is: if your transfer is over $10,000, let the bank report it; the report does not harm you.

## Sending money out of Australia

The same rules apply in the opposite direction. Working holiday makers leaving Australia who transfer their savings, [DASP](/blog/what-is-dasp-super-withdrawal) payment, or [tax refund](/blog/what-is-a-tax-refund-australia) home are typically transferring amounts over A$10,000 by the end of their stay. The bank reports the outbound transfer automatically. Your tax obligation on the outbound transfer is covered in our article on [transferring money overseas](/blog/transferring-money-overseas-australia-tax).

## Bank account reporting and the ATO

Separately from AUSTRAC, Australian banks report customer interest income directly to the ATO. This means:

- If you open an Australian bank account with your TFN, the bank reports the interest to the ATO
- The ATO pre-fills your [tax return](/tax-return) with the bank interest amount
- The interest must be declared on the return regardless of the amount

If you open a bank account without providing your TFN, the bank withholds tax at the top rate on any interest paid, which is recoverable when you lodge the return.

## Practical guidance for working holiday makers

For most working holiday makers, the practical approach is:

1. **Bring the funds in legitimately** - cash declared at the border if over A$10,000, or international transfer through a regulated provider (bank, Wise, Revolut, OFX)
2. **Keep records of the source** - bank statements from your home country showing the savings before transfer
3. **Use a regulated money transfer service** - bank transfer or licensed remitter, not informal channels
4. **Open an Australian bank account quickly** - so the money can be received and held safely
5. **Provide the bank with your TFN** - once you have it, to avoid top-rate withholding on interest
6. **Keep the AUSTRAC declaration receipt** - if you declared cash at the border

The records matter less for the inbound side and more if the ATO ever asks where the money came from (rare for working holiday makers but possible).

## When the ATO might ask about transferred funds

The ATO has data-matching access to AUSTRAC reports and bank records. If you arrived with substantial funds and then have a tax return that does not match the lifestyle, the ATO might ask questions. The standard explanations are easy:

- The funds were pre-existing savings before arrival
- The funds were a gift from family
- The funds were proceeds from selling a vehicle, property, or investments before travel

Each of these is easy to substantiate with home-country bank statements. The issue only arises if the funds genuinely represent unreported Australian income, which is rare for working holiday makers but happens (cash-in-hand work that was never reported, for example).

## What about money-transfer scams?

Working holiday makers are regularly targeted by money-transfer scams. The most common patterns:

- "Send me your bank details and TFN so I can transfer you money"
- "I will give you a great exchange rate, just send the cash first"
- Romance scams that result in money being transferred to overseas accounts
- Fake job offers requiring upfront payment

For legitimate international transfers, use regulated providers (banks, Wise, Revolut, OFX). For exchanging cash, use licensed currency exchanges. Never transfer money based on promises made over messaging apps to people you have not met in person.

## How does our service support money-transfer questions?

While our team is not a money-transfer service, the tax side of international transfers is within our service. When you lodge through us, we:

- Account for any foreign-source income that needs to appear on the Australian [tax return](/tax-return)
- Reconcile bank interest reported by Australian banks against your declared income
- Coordinate any tax considerations for funds leaving Australia (see our article on [transferring money overseas](/blog/transferring-money-overseas-australia-tax))
- Identify the correct tax treatment of any tax-free transfers (legitimate savings, gifts, inheritances)

For most working holiday makers, bringing savings in is straightforward and tax-neutral. [Get in touch with our team](/contact) if you have specific concerns about how a transfer interacts with your tax position.
 `,
 },
 {
 slug: "ato-tax-debt-failure-to-pay-penalty-australia",
 title: "ATO penalties for unpaid tax debts: General Interest Charge and Failure to Pay",
 description:
   "If you have a tax debt to the ATO and do not pay by the due date, the General Interest Charge accrues daily and Failure to Pay penalties of $313 per.",
 category: "Tax Return",
 date: "6 June 2026",
 readTime: 4,
 body: `
The Australian Taxation Office (ATO) charges interest and penalties on tax debts that are not paid by the due date. The General Interest Charge (GIC) compounds daily on the unpaid amount at a rate substantially above the cash rate. Separately, a Failure to Pay penalty of one penalty unit ($330 in 2025-26) can apply for every 28 days the debt remains unpaid, up to a maximum of five units ($1,650 per year per debt). The penalties are independent of the Failure to Lodge penalties that apply for [late tax returns](/blog/late-tax-return-penalty-working-holiday).

For working holiday makers, tax debts most often arise from [ABN](/abn) income with tax not withheld during the year, from amended assessments after a return is lodged, or from BAS obligations for [rideshare drivers](/blog/uber-driver-working-holiday-australia) who did not remit GST.

## When does a tax debt arise?

A tax debt to the ATO can arise from:

- A [tax return](/tax-return) showing a balance owing (rather than a refund)
- An amended assessment after the original return was lodged, increasing the tax payable
- An unpaid Business Activity Statement (BAS) for GST-registered ABN holders
- An unpaid pay-as-you-go (PAYG) instalment for ABN holders with substantial income
- A penalty assessment for late lodgement or understated income (see our article on [understating income penalties](/blog/understating-income-ato-penalty-working-holiday))
- A failed Departing Australia Superannuation Payment (DASP) that resulted in tax being clawed back

The debt is shown on the Notice of Assessment issued by the ATO after the return or statement is processed, with a due date for payment.

## What is the General Interest Charge?

The General Interest Charge (GIC) is the daily compounding interest the ATO applies to unpaid tax. The rate is set quarterly and is substantially higher than the cash rate. As of 2025-26, the GIC rate is around 11% per year, compounded daily.

The GIC applies from the original due date of the debt until the debt is paid in full. Even a small initial debt grows quickly:

- $1,000 tax debt unpaid for 1 year: approximately $115 of GIC added
- $1,000 tax debt unpaid for 3 years: approximately $370 of GIC added
- $3,000 tax debt unpaid for 2 years: approximately $700 of GIC added

The GIC continues to accrue regardless of where you are in the world. Leaving Australia does not pause it.

## What is the Failure to Pay penalty?

Separately from the GIC, the ATO can apply a Failure to Pay penalty. The penalty is one penalty unit ($330 in 2025-26) for every 28 days the debt remains unpaid, capped at five units ($1,650 per year per debt).

The Failure to Pay penalty is applied less consistently than the GIC. The ATO may apply it where:

- The debt is substantial
- There is a pattern of non-payment
- The taxpayer has not engaged with the ATO about the debt
- The debt is the result of deliberate under-reporting (in which case higher penalties also apply)

For working holiday makers, the GIC is the more reliable concern. The Failure to Pay penalty is sometimes waived if the underlying issue is resolved.

## How does this differ from the late lodgement penalty?

The two penalty systems are independent:

- **Failure to Lodge (FTL)**: applied when a [tax return](/tax-return) is filed late. $330 per 28 days, max $1,650. See our article on [late tax return penalties](/blog/late-tax-return-penalty-working-holiday).
- **Failure to Pay (FTP) + GIC**: applied when a tax debt is not paid by the due date. $330 per 28 days plus daily interest at around 11% per year.

A working holiday maker who lodges late AND pays late can be hit with both penalty systems on the same debt. The total cost can substantially exceed the original tax owing.

## When is a tax debt due?

For an individual lodging under the supervision of a registered tax agent, the standard payment deadline is 21 days after the Notice of Assessment is issued (which is usually within a few weeks of lodgement). For self-lodgers, the payment deadline is typically by the 21st of November following the end of the financial year.

For BAS debts, the payment is due on the same date the BAS is due, which is 28 days after the end of the quarter for most lodgers.

## What if you cannot pay the full amount?

The ATO offers payment plans for taxpayers who cannot pay the full debt immediately:

- Short-term plans (under 12 months): generally available on request, with the GIC continuing to accrue
- Long-term plans (over 12 months): require more documentation and may require interest to be paid separately
- Hardship arrangements: for taxpayers in genuine financial difficulty

Engaging with the ATO early generally results in better outcomes than ignoring the debt and waiting for collection action.

See our article on [payment plans for tax debt](/blog/ato-payment-plan-tax-debt-australia) for the detail.

## What happens if you leave Australia with an unpaid tax debt?

A working holiday maker who leaves Australia with an unpaid tax debt is still liable for the debt. The ATO can:

- Continue charging GIC daily on the unpaid amount
- Apply Failure to Pay penalties for ongoing non-payment
- Offset the debt against any future Australian refunds or DASP payments
- Refer the debt to international debt collection in some cases
- Place a marker on your record that affects future Australian visa applications

Australia has tax treaties with many countries that allow mutual collection of tax debts, though the practical application varies. The most direct consequence is that any subsequent return to Australia (on a working holiday extension, student visa, or skilled visa) will encounter the unresolved debt.

## What about a DASP refund netted against the debt?

When you lodge a [DASP](/blog/what-is-dasp-super-withdrawal) application, the ATO has the right to offset any outstanding tax debt against the super payment. This means:

- A working holiday maker leaving Australia with a $2,000 unpaid tax debt and a $4,000 gross DASP entitlement
- DASP tax of 65% applies, reducing the gross to approximately $1,400 net
- The $1,400 net is then offset against the $2,000 debt
- The worker receives no DASP payment, and a debt of $600 remains

For workers with substantial tax debts, the DASP can effectively be lost to the debt offset. Resolving the debt before leaving usually gives a better outcome.

## Can the GIC or Failure to Pay penalty be remitted?

The ATO has discretion to remit (reduce or cancel) the GIC and Failure to Pay penalty in some circumstances:

- Genuine hardship that prevented payment
- ATO administrative error that caused or contributed to the debt
- Circumstances beyond the taxpayer's control (illness, natural disaster, family emergency)
- First-time non-payment with otherwise clean compliance history

Remission requests must be made specifically and supported by evidence. The remission rate is generally higher for requests lodged under the supervision of a registered tax agent than for direct requests.

## How does our service support tax debt situations?

For working holiday makers with tax debts, our team:

- Calculates the exact debt position including GIC and any penalties accrued
- Negotiates payment plans with the ATO where the full amount cannot be paid immediately
- Requests remission of GIC and Failure to Pay penalties where there are grounds
- Coordinates DASP timing to manage the offset risk
- Lodges any outstanding returns or BAS to make sure the debt position is complete
- Resolves the debt position before departure to avoid the cascading effect on future Australian visas

Tax debts grow quickly under the GIC. Resolving them early is significantly cheaper than waiting. [Get in touch with our team](/contact) if you have an outstanding ATO debt or are concerned about how an upcoming return might create one.
 `,
 },
];

export const categories: Category[] = [
 "TFN",
 "ABN",
 "Tax Return",
 "Super",
 "Work Rights",
 "Medicare & Other",
];

// ─── Category metadata for SEO hub pages ────────────────────────────────────

export interface CategoryMeta {
 category: Category;
 slug: string;
 title: string;
 description: string;
 intro: string;
 faq: { question: string; answer: string }[];
 relatedServicePath?: string;
 relatedServiceLabel?: string;
}

export const categoryMeta: CategoryMeta[] = [
 {
 category: "TFN",
 slug: "tfn",
 title: "TFN Blog Articles for Working Holiday Makers in Australia",
 description:
 "Everything you need to know about the Tax File Number (TFN) as a working holiday maker. How to apply, processing times, and what to do if things go wrong.",
 intro: `A Tax File Number (TFN) is the 9-digit identifier issued by the Australian Taxation Office (ATO) to every person who earns income in Australia. As a working holiday maker, you need a TFN before you start work, otherwise your employer must withhold tax at 45% instead of the 15% working holiday rate. These articles cover everything from applying for your first TFN to handling delays, lost numbers, and second-visa returns.`,
 faq: [
 {
 question: "Do working holiday makers need a TFN in Australia?",
 answer:
 "Yes. Every working holiday maker who earns income in Australia needs a Tax File Number. Without a TFN registered with your employer, they are legally required to withhold tax at the top rate of 45%, instead of the 15% working holiday maker rate.",
 },
 {
 question: "How long does it take to get a TFN?",
 answer:
 "The Australian Taxation Office processes TFN applications within 28 days. Your TFN is sent to your Australian postal address as a letter. Many applicants receive it within two weeks.",
 },
 {
 question: "Is the TFN application free?",
 answer:
 "Yes. Applying for a TFN is free. There is no government fee. The online application takes around 10 minutes.",
 },
 {
 question: "Can you start working in Australia without a TFN?",
 answer:
 "Yes, you can start work without a TFN, but your employer must withhold tax at 45% until you provide one. The excess tax can be claimed back when you lodge your annual tax return.",
 },
 ],
 relatedServicePath: "/tfn",
 relatedServiceLabel: "Apply for your TFN",
 },
 {
 category: "TFN",
 slug: "abn",
 title: "ABN Blog Articles for Working Holiday Makers in Australia",
 description:
 "Everything you need to know about the Australian Business Number (ABN) for backpackers. When you need one, how to register, and what it means for your tax.",
 intro: `An Australian Business Number (ABN) is an 11-digit identifier used when you operate as a sole trader or independent contractor in Australia. You need an ABN if a business is paying you to invoice them rather than putting you on the payroll. These articles cover registration, when an ABN is the right choice, and how working under an ABN affects your tax, super, and entitlements.`,
 faq: [
 {
 question: "Do working holiday makers need an ABN in Australia?",
 answer:
 "You need an ABN if you are working as an independent contractor or sole trader, meaning you invoice for your work rather than being on a payroll. Most working holiday makers in standard employment do not need an ABN.",
 },
 {
 question: "How much does it cost to get an ABN?",
 answer:
 "Registering for an ABN through the Australian Business Register is free. Any service that charges you for the registration itself is marking up a free government process.",
 },
 {
 question: "What is the difference between a TFN and an ABN?",
 answer:
 "A TFN is your personal tax identifier required for all workers. An ABN is required only if you are operating as a contractor or sole trader. Many working holiday makers hold both.",
 },
 {
 question: "Can you have a TFN and an ABN at the same time?",
 answer:
 "Yes. Many working holiday makers hold both simultaneously, using the TFN for employment income and the ABN for contractor work.",
 },
 ],
 relatedServicePath: "/abn",
 relatedServiceLabel: "Register for your ABN",
 },
 {
 category: "ABN",
 slug: "tax-return",
 title: "Tax Return Blog Articles for Working Holiday Makers",
 description:
 "Everything you need to know about lodging your Australian tax return as a working holiday maker. Refunds, deductions, deadlines, and what to claim.",
 intro: `The Australian financial year runs from 1 July to 30 June, and every working holiday maker who earned income during that period is required to lodge a tax return. Most backpackers get a refund because their employer withheld more tax than required. These articles cover deadlines, deductions, what to do when you have left Australia, and how to handle complications.`,
 faq: [
 {
 question: "When do working holiday makers need to lodge a tax return?",
 answer:
 "The Australian financial year ends on 30 June. You must lodge your tax return between 1 July and 31 October that year. If you lodge under the supervision of a registered tax agent, the deadline can be extended.",
 },
 {
 question: "Do working holiday makers get a tax refund?",
 answer:
 "Most working holiday makers receive a tax refund because their employer withheld more tax than was actually owed. The refund is paid to your Australian bank account, usually within two weeks of lodging.",
 },
 {
 question:
 "Can you lodge an Australian tax return after leaving the country?",
 answer:
 "Yes. You can lodge your tax return from anywhere in the world. We can manage the process remotely under the supervision of a registered tax agent. Keep your Australian bank account open until the refund is paid.",
 },
 {
 question: "What can working holiday makers claim as deductions?",
 answer:
 "Common deductions include work-related travel, tools, uniforms, work boots, sun protection for outdoor workers, phone use for work, and tax agent fees. Each deduction requires a record showing the expense and its connection to your work.",
 },
 ],
 relatedServicePath: "/tax-return",
 relatedServiceLabel: "Lodge your tax return",
 },
 {
 category: "Tax Return",
 slug: "super",
 title: "Superannuation Blog Articles for Working Holiday Makers",
 description:
 "Everything you need to know about Australian superannuation as a backpacker. How super works, how to claim it when you leave, and how to find lost super.",
 intro: `Superannuation (super) is Australia's compulsory retirement savings system. Your employer pays 12% of your wages into a super fund on top of your pay (effective 1 July 2025). When you leave Australia at the end of your working holiday, you can withdraw your super through the Departing Australia Superannuation Payment (DASP) process. These articles cover how super works, how to track it, and how to claim it.`,
 faq: [
 {
 question: "Do working holiday makers get superannuation in Australia?",
 answer:
 "Yes. Every working holiday maker is entitled to superannuation contributions from their employer. The current rate is 12% of your ordinary time earnings (effective 1 July 2025), paid on top of your wages directly into a super fund.",
 },
 {
 question:
 "How do working holiday makers claim their super when leaving Australia?",
 answer:
 "You claim your super through the Departing Australia Superannuation Payment (DASP) process, available once your visa has expired or been cancelled and you have left the country. The payment is taxed at 65% for working holiday makers.",
 },
 {
 question: "How much tax is taken from super withdrawals?",
 answer:
 "The DASP tax rate for working holiday makers is 65% of the taxable component of your super balance. This is higher than the 35% rate that applied before 2017.",
 },
 {
 question: "How do you find lost or unclaimed super?",
 answer:
 "You can find lost super by linking your TFN to your account through our service, contacting the Australian Taxation Office, or working under the supervision of a registered tax agent who can search across all funds.",
 },
 ],
 relatedServicePath: "/superannuation",
 relatedServiceLabel: "Claim your super",
 },
 {
 category: "Super",
 slug: "work-rights",
 title: "Work Rights Blog Articles for Working Holiday Makers",
 description:
 "Everything you need to know about your work rights in Australia as a backpacker. Minimum wage, awards, payslips, public holidays, and what to do about wage theft.",
 intro: `Working holiday makers in Australia have the same legal rights at work as Australian citizens. The Fair Work Ombudsman enforces minimum wages, conditions, and protections under industry awards. These articles cover what you are entitled to, how to read your payslip, how to spot underpayment, and what to do if your employer breaks the rules.`,
 faq: [
 {
 question:
 "What is the minimum wage for working holiday makers in Australia?",
 answer:
 "The national minimum wage in Australia is $24.95 per hour for full-time and part-time employees (effective 1 July 2025). Casual employees receive a 25% loading on top, bringing the casual minimum to $31.19 per hour. Most workers are covered by industry awards that set higher rates.",
 },
 {
 question: "Are working holiday makers entitled to public holiday pay?",
 answer:
 "Yes. If you work on a public holiday, you are entitled to penalty rates, usually 225% of your ordinary rate (double time and a quarter). If you do not work, you may be entitled to your base rate, depending on your employment type.",
 },
 {
 question: "What should you do if your employer underpays you?",
 answer:
 "First, raise the issue calmly with your employer and present your records. If the issue is not resolved, our team can help you escalate through the right channels. Working holiday makers have the same protections as Australian workers and your visa is protected when raising legitimate complaints.",
 },
 {
 question: "Do casual workers get paid sick leave in Australia?",
 answer:
 "No. Casual employees in Australia are not entitled to paid sick leave. The casual loading (a 25% premium on the base hourly rate) is intended to compensate for the absence of leave entitlements.",
 },
 ],
 },
 {
 category: "Work Rights",
 slug: "medicare-and-other",
 title: "Medicare and General Tax Blog Articles for Working Holiday Makers",
 description:
 "Medicare, the Medicare Levy, tourist refund scheme, and other general articles for working holiday makers navigating tax and benefits in Australia.",
 intro: `Working holiday makers face a range of tax and administrative questions outside the core areas of TFN, ABN, tax returns, and super. These articles cover Medicare access, the Medicare Levy and Medicare Levy Surcharge, claiming GST back on goods you take home, and other general topics that affect backpackers living and working in Australia.`,
 faq: [
 {
 question: "Do working holiday makers pay the Medicare Levy?",
 answer:
 "No. Working holiday makers are not eligible for Medicare and are not required to pay the 2% Medicare Levy. Our team can apply for a Medicare Levy Exemption Certificate to confirm this on your tax return.",
 },
 {
 question: "Can working holiday makers use Medicare?",
 answer:
 "Only nationals of countries with a Reciprocal Health Care Agreement with Australia (including the UK, Ireland, Italy, Belgium, the Netherlands, Sweden, Norway, Finland, Malta, Slovenia, and New Zealand) can enrol in Medicare for limited cover. All other working holiday makers should hold private health insurance.",
 },
 {
 question:
 "Can working holiday makers claim GST back on goods they take home?",
 answer:
 "Yes. The Tourist Refund Scheme allows you to claim back the 10% GST on goods over $300 (per supplier) that you purchased within 60 days of departure and carry out of Australia. Claims are made at the airport before you fly.",
 },
 {
 question: "Do working holiday makers need private health insurance?",
 answer:
 "Yes for most. Private health insurance is a visa condition for many working holiday visas and is essential for backpackers who are not covered by a Reciprocal Health Care Agreement with Australia.",
 },
 ],
 relatedServicePath: "/medicare",
 relatedServiceLabel: "Check your Medicare status",
 },
];

export function getCategoryMeta(category: Category): CategoryMeta | undefined {
 return categoryMeta.find((c) => c.category === category);
}

export function getCategoryBySlug(slug: string): CategoryMeta | undefined {
 return categoryMeta.find((c) => c.slug === slug);
}

export function getGuideBySlug(slug: string): Guide | undefined {
 return guides.find((g) => g.slug === slug);
}

export function getGuidesByCategory(category: Category): Guide[] {
 return guides.filter((g) => g.category === category);
}

export function getCategoryColor(category: Category): {
 bg: string;
 text: string;
 border: string;
} {
 switch (category) {
 case "TFN":
 return { bg: "#EAF6F1", text: "#0B5240", border: "#C8EAE0" };
 case "ABN":
 return { bg: "#FDF0D5", text: "#7A4A00", border: "#E9A020" };
 case "Tax Return":
 return { bg: "#F0F4FF", text: "#2D3A8C", border: "#A5B4FC" };
 case "Super":
 return { bg: "#F5F0FF", text: "#5B21B6", border: "#C4B5FD" };
 case "Work Rights":
 return { bg: "#FEF3F0", text: "#9A3412", border: "#FDBA74" };
 case "Medicare & Other":
 return { bg: "#F0FAFA", text: "#0E7490", border: "#67E8F9" };
 }
}
