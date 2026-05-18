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
 ctaHeading: string;
 ctaBody: string;
 ctaLabel: string;
 ctaHref: string;
}

export const guides: Guide[] = [
 // ─── TFN ───────────────────────────────────────────────────────────────────
 {
 slug: "what-is-a-tfn",
 title: "What is a TFN and why do you need one in Australia?",
 description:
 "A Tax File Number is the first thing you need when you start working in Australia. Without one, your employer must withhold nearly half your pay.",
 category: "TFN",
 date: "1 July 2024",
 readTime: 5,
 ctaHeading: "Get your TFN sorted the right way",
 ctaBody:
 "We help working holiday makers apply for their TFN correctly and quickly, supervised by a registered tax agent. Fully online, most applications submitted within 24 hours.",
 ctaLabel: "Start your TFN application",
 ctaHref: "/tfn",
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
 `,
 },
 {
 slug: "how-to-apply-for-a-tfn",
 title: "How to apply for a TFN as a working holiday maker",
 description:
 "Applying for a TFN in Australia is straightforward and free. Here is exactly how to do it as a working holiday visa holder.",
 category: "TFN",
 date: "8 July 2024",
 readTime: 4,
 ctaHeading: "Want us to handle your TFN application?",
 ctaBody:
 "We take care of the entire process for you, supervised by a registered tax agent. No confusing forms, no ATO portals. Just send us your details and we handle the rest.",
 ctaLabel: "Apply for your TFN with us",
 ctaHref: "/tfn",
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
 `,
 },
 {
 slug: "how-long-does-it-take-to-get-a-tfn",
 title: "How long does it take to get a TFN in Australia?",
 description:
 "Most TFN applications are processed within 28 days. Here is what to expect and what to do while you wait.",
 category: "TFN",
 date: "15 July 2024",
 readTime: 4,
 ctaHeading: "Apply for your TFN through us",
 ctaBody:
 "We handle TFN applications for working holiday makers every day. We make sure your application is submitted correctly so there are no delays.",
 ctaLabel: "Get started",
 ctaHref: "/tfn",
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
 title: "Can you start work in Australia without a TFN?",
 description:
 "Yes, you can start work without a TFN, but there are real financial consequences. Here is what you need to know before your first shift.",
 category: "TFN",
 date: "22 July 2024",
 readTime: 4,
 ctaHeading: "Get your TFN application in today",
 ctaBody:
 "The sooner you apply, the sooner the correct tax rate applies to your wages. We handle the process for working holiday makers every day.",
 ctaLabel: "Start your TFN application",
 ctaHref: "/tfn",
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

If you are being paid cash in hand, the TFN question is handled differently because no formal payroll exists. For more on how that works and the tax implications, see our blog article on [cash in hand work in Australia](/blog/can-your-employer-pay-you-cash-in-hand).
 `,
 },
 {
 slug: "what-happens-without-your-tfn",
 title: "What happens if your employer does not have your TFN?",
 description:
 "If your employer does not hold your TFN, they must withhold tax at 45%. Here is exactly what that means for your pay and how to fix it.",
 category: "TFN",
 date: "29 July 2024",
 readTime: 4,
 ctaHeading: "Need help with your TFN application?",
 ctaBody:
 "We handle TFN applications for working holiday makers and make sure everything is submitted correctly so you can start earning at the right tax rate as soon as possible.",
 ctaLabel: "Apply for your TFN",
 ctaHref: "/tfn",
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

The deadline is 31 October following the end of each financial year (1 July to 30 June). If you lodge through a registered tax agent, the deadline can be extended.

## Giving your TFN to multiple employers

If you work for more than one employer during your time in Australia, each one needs your TFN separately. Providing it to one employer does not automatically share it with others. Submit a Tax File Number Declaration form to every employer you work for, including casual and short-term roles.
 `,
 },
 {
 slug: "tfn-vs-abn-difference",
 title: "TFN vs ABN - what is the difference and which one do you need?",
 description:
 "A TFN and an ABN are two different things that serve different purposes. Here is how to work out which one applies to your situation.",
 category: "TFN",
 date: "5 August 2024",
 readTime: 5,
 ctaHeading: "Not sure what you need?",
 ctaBody:
 "We help working holiday makers work out exactly what they need based on their situation, whether that is a TFN, an ABN, or both. Get in touch and we will point you in the right direction.",
 ctaLabel: "Ask us what you need",
 ctaHref: "/contact",
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

If you are unsure which situation applies, our blog article on [the difference between employees and contractors in Australia](/blog/employee-vs-contractor-australia) goes into the legal tests in more detail.
 `,
 },
 {
 slug: "apply-for-tfn-before-arriving",
 title: "Can you apply for a TFN before arriving in Australia?",
 description:
 "Yes, in most cases you can apply for a TFN before you land in Australia. Here is how it works and what you need.",
 category: "TFN",
 date: "12 August 2024",
 readTime: 4,
 ctaHeading: "Let us handle your TFN application",
 ctaBody:
 "Whether you are already in Australia or still planning your trip, we can take care of your TFN application so it is one less thing to think about when you arrive.",
 ctaLabel: "Start your TFN application",
 ctaHref: "/tfn",
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
 title: "What to do if your TFN application is delayed",
 description:
 "If your TFN has not arrived after 28 days, here is what to check and how to follow up with the ATO.",
 category: "TFN",
 date: "19 August 2024",
 readTime: 4,
 ctaHeading: "Need help sorting your TFN?",
 ctaBody:
 "We deal with TFN applications every day and know how to handle delays and complications. Get in touch and we will help you work out what is going on.",
 ctaLabel: "Get in touch",
 ctaHref: "/contact",
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
 "Do you need a new TFN if you return to Australia on a second working holiday visa?",
 description:
 "No. Your TFN is permanent and stays with you for life. Here is what you do need to do when you return.",
 category: "TFN",
 date: "26 August 2024",
 readTime: 3,
 ctaHeading: "Returning to Australia?",
 ctaBody:
 "Whether it is your first or second working holiday, we can help you get your tax sorted quickly. TFN applications, tax returns, super, and more.",
 ctaLabel: "Get in touch",
 ctaHref: "/contact",
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

If you did not withdraw your super from your first visit, those funds may still be sitting in the original fund or with the ATO as unclaimed money. See our blog article on [finding lost or unclaimed super](/blog/how-to-find-lost-superannuation) for how to locate it.

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
 title: "How to find your TFN if you have lost or forgotten it",
 description:
 "Lost your TFN? There are several ways to find it without contacting the ATO. Here is where to look first.",
 category: "TFN",
 date: "2 September 2024",
 readTime: 3,
 ctaHeading: "Need help with your tax while you are at it?",
 ctaBody:
 "If you are tracking down your TFN, you might also be thinking about your tax return or super. We help working holiday makers sort all of it in one place.",
 ctaLabel: "Get in touch",
 ctaHref: "/contact",
 body: `
To find a lost Tax File Number, start with documents you may already have (the original ATO letter, payslips, payment summaries, or past tax returns). Your TFN is permanent and does not change, so the same number you were issued originally is the one you still hold. If you cannot find it in your records, our team can retrieve it for you as registered tax agents.

## How to find your TFN at home

Start with documents you already have:

- The original TFN letter posted to you by the ATO when your application was approved
- Payslips, payment summaries, or income statements from any Australian employer
- Past [tax return](/tax-return) documents (your TFN appears on every return)
- Any letters or notices from the ATO

If you saved emails, scanned documents, or kept paperwork from previous work in Australia, your TFN is almost certainly in one of those records.

## How to retrieve a lost TFN

If you cannot find your TFN in any of your records, [get in touch with our team](/contact). We are registered tax agents and can retrieve your TFN on your behalf through our direct channels with the ATO.

To help us, please have ready:

- Your full legal name (as on your passport)
- Your date of birth
- Your passport number (and the passport you held when you first applied, if different)
- Your residential address history in Australia
- Any other personal identification details

Retrieving a TFN as an individual involves long ATO phone wait times and an identity verification process that often requires Australian-specific documents most backpackers no longer have access to from overseas. Going through a registered tax agent is faster and more reliable.

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
 title: "What is an ABN and do you need one on a working holiday visa?",
 description:
 "An ABN is required if you are working as a contractor in Australia. Here is how to know if you need one and what happens if you work without one.",
 category: "ABN",
 date: "9 September 2024",
 readTime: 5,
 ctaHeading: "Register your ABN today",
 ctaBody:
 "We handle ABN registrations for working holiday makers every day. Fully online, straightforward, and done correctly the first time.",
 ctaLabel: "Register your ABN",
 ctaHref: "/abn",
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
 `,
 },
 {
 slug: "how-to-register-for-an-abn",
 title: "How to register for an ABN in Australia as a backpacker",
 description:
 "Registering for an ABN is free and takes around 15 minutes online. Here is exactly how to do it as a working holiday visa holder.",
 category: "ABN",
 date: "16 September 2024",
 readTime: 4,
 ctaHeading: "Want us to register your ABN for you?",
 ctaBody:
 "We handle ABN registrations for working holiday makers and make sure everything is set up correctly. Get in touch and we will take care of it.",
 ctaLabel: "Register your ABN with us",
 ctaHref: "/abn",
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

When you finish your business activity in Australia, you should cancel your ABN. We handle the cancellation as part of wrapping up your Australian tax position before you leave. See our blog article on [cancelling your ABN when you leave Australia](/blog/how-to-cancel-your-abn) for what to think about before you go.
 `,
 },
 {
 slug: "farm-work-and-abns",
 title: "Farm work and ABNs - what you need to know before you start",
 description:
 "Farm work is one of the most common reasons working holiday makers need an ABN. Here is how it works and what to watch out for.",
 category: "ABN",
 date: "23 September 2024",
 readTime: 5,
 ctaHeading: "Need an ABN for your farm work?",
 ctaBody:
 "We help working holiday makers register for an ABN and understand their tax obligations before they start work. Get in touch and we will sort it out for you.",
 ctaLabel: "Register your ABN",
 ctaHref: "/abn",
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
 "What is the difference between being an employee and a contractor in Australia?",
 description:
 "The distinction between employee and contractor affects your tax, your super, and your workplace rights. Here is how to tell which one you are.",
 category: "ABN",
 date: "30 September 2024",
 readTime: 5,
 ctaHeading: "Not sure which category you fall into?",
 ctaBody:
 "We help working holiday makers understand their work situation and get their tax set up correctly whether they are employed, contracting, or doing both.",
 ctaLabel: "Get in touch",
 ctaHref: "/contact",
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
- **Super**: Employees get 11.5% super on top of wages; contractors usually do not
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
 title: "Can you have both a TFN and an ABN at the same time?",
 description:
 "Yes, and many working holiday makers do. Here is how the two numbers work together and when you need both.",
 category: "ABN",
 date: "7 October 2024",
 readTime: 3,
 ctaHeading: "Need an ABN alongside your TFN?",
 ctaBody:
 "We handle ABN registrations for working holiday makers and can help you understand how the two work together for your specific situation.",
 ctaLabel: "Register your ABN",
 ctaHref: "/abn",
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

Only use your ABN when the work genuinely is contracting (see our blog article on [employee vs contractor](/blog/employee-vs-contractor-australia) for how to tell the difference). Otherwise, your TFN and a Tax File Number Declaration form are what you should provide.

## What are your tax obligations when you have both?

Holding both numbers means tracking both income streams:

- Your employer reports your employment income to the ATO through their payroll
- You are responsible for tracking and declaring all income earned under your ABN
- All income, from both sources, must be included in your [tax return](/tax-return)
- The 15% working holiday maker rate applies to combined earnings up to $45,000

Keep clear records of both throughout the year. Save your payslips, copy every invoice you send, and record every payment received. Tax time is much simpler when records are complete.
 `,
 },
 {
 slug: "how-to-cancel-your-abn",
 title: "How to cancel your ABN when you leave Australia",
 description:
 "If you are leaving Australia and no longer running a business, you should cancel your ABN. Here is how to do it and why it matters.",
 category: "ABN",
 date: "14 October 2024",
 readTime: 3,
 ctaHeading: "Leaving Australia soon?",
 ctaBody:
 "We help working holiday makers wrap up their Australian tax obligations correctly before they leave, including lodging a final tax return and claiming back their super.",
 ctaLabel: "Get everything sorted before you go",
 ctaHref: "/contact",
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

If superannuation contributions were made in connection with employment work (separate from your ABN contracting), claim them back through the Departing Australia Superannuation Payment (DASP) process. See our blog article on [claiming your super when you leave Australia](/superannuation) for the steps.

ABN contractor work typically does not generate super contributions, but employment work in parallel often does.
 `,
 },
 {
 slug: "gst-and-abn-for-working-holiday-makers",
 title: "GST and ABN - do working holiday makers need to register for GST?",
 description:
 "Most working holiday makers with an ABN do not need to register for GST. Here is how to work out whether it applies to you.",
 category: "ABN",
 date: "21 October 2024",
 readTime: 4,
 ctaHeading: "Not sure about your GST obligations?",
 ctaBody:
 "We help working holiday makers understand exactly what they need to do with their ABN and tax obligations. Get in touch and we will point you in the right direction.",
 ctaLabel: "Ask us about GST",
 ctaHref: "/contact",
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

A registered tax agent can handle BAS lodgement and make this straightforward.

## What is the main tax obligation for most contractors?

For most working holiday makers with an [ABN](/abn), GST is not a concern. Your real obligations are simpler:

- Keep records of all income throughout the year
- Set aside enough to cover income tax (around 15-20% of net earnings is a safe starting point)
- Declare everything in your [tax return](/tax-return) at financial year end
 `,
 },

 // ─── TAX RETURN ────────────────────────────────────────────────────────────
 {
 slug: "how-does-australian-tax-year-work",
 title: "How does the Australian tax year work for working holiday makers?",
 description:
 "The Australian financial year runs from 1 July to 30 June. Here is what that means for your tax return and when you need to lodge it.",
 category: "Tax Return",
 date: "28 October 2024",
 readTime: 5,
 ctaHeading: "Ready to lodge your tax return?",
 ctaBody:
 "We handle Australian tax returns for working holiday makers from anywhere in the world. Get in touch and we will take care of the whole process for you.",
 ctaLabel: "Start your tax return",
 ctaHref: "/tax-return",
 body: `
The Australian financial year runs from 1 July to 30 June, not the calendar year. As a working holiday maker, you are required to lodge a tax return for any financial year in which you earned income in Australia. The deadline to lodge is 31 October following the end of the financial year. If you lodge through a registered tax agent like our team, the deadline is extended automatically.

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

If we lodge your return as your registered tax agent, you qualify for an extended deadline, often until May the following year. This gives you breathing room if you missed October or your records are not yet complete.

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

We can access your income statements directly through our tax agent portal, so you do not need to collect payslips from each employer yourself. See our blog article on [lodging a tax return from overseas](/blog/how-to-lodge-tax-return-from-overseas) for more detail on what we need.
 `,
 },
 {
 slug: "backpacker-tax-rate-australia",
 title: "What is the backpacker tax rate in Australia and how does it work?",
 description:
 "Working holiday makers pay a flat 15% tax rate on their Australian earnings. Here is exactly how it works and what it means for your take-home pay.",
 category: "Tax Return",
 date: "4 November 2024",
 readTime: 5,
 ctaHeading: "Want to make sure you are being taxed correctly?",
 ctaBody:
 "We check working holiday makers tax situations every day and make sure the right rate is being applied. Get in touch and we will take a look.",
 ctaLabel: "Check your tax situation",
 ctaHref: "/tax-return",
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
 title: "How to lodge a tax return in Australia as a working holiday maker",
 description:
 "Lodging an Australian tax return is simpler than it sounds. Here is a step-by-step walkthrough of the whole process.",
 category: "Tax Return",
 date: "11 November 2024",
 readTime: 6,
 ctaHeading: "Let us lodge your tax return for you",
 ctaBody:
 "We handle Australian tax returns for working holiday makers every day. We take care of the whole process and make sure everything is correct before we lodge.",
 ctaLabel: "Start your tax return",
 ctaHref: "/tax-return",
 body: `
To lodge a tax return in Australia as a working holiday maker, the simplest option is to use a registered tax agent like our team. We collect your details, access your income statements directly through our tax agent portal, prepare your return, and lodge it with the ATO on your behalf. The process works the same whether you are still in Australia or have already left, and using a registered agent gives you an extended lodgment deadline beyond the standard 31 October.

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
 `,
 },
 {
 slug: "what-is-payg-payment-summary",
 title: "What is a PAYG payment summary and how do you use it?",
 description:
 "A PAYG payment summary shows your total earnings and tax withheld for the year. Here is what it is and how to access yours.",
 category: "Tax Return",
 date: "18 November 2024",
 readTime: 4,
 ctaHeading: "Need help with your tax return?",
 ctaBody:
 "We help working holiday makers lodge their Australian tax returns correctly, including making sure all income and withholding amounts are accurate.",
 ctaLabel: "Start your tax return",
 ctaHref: "/tax-return",
 body: `
A PAYG payment summary, now known as an income statement, is the official record showing your total wages and total tax withheld by an employer during a financial year. It is the document used to lodge your [tax return](/tax-return). Employers report wages and withholding amounts to the ATO automatically through their payroll software, so the income statement is generated digitally rather than handed to you as a paper document. As your registered tax agent, our team can access your income statements directly through the ATO system.

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

This is one of the main advantages of lodging through a registered tax agent. We see everything the ATO sees, and we wait until all employer reports are finalised before lodging your return.

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
 title: "What tax deductions can working holiday makers claim in Australia?",
 description:
 "Working holiday makers can claim work-related deductions just like any other worker. Here is what qualifies and what does not.",
 category: "Tax Return",
 date: "25 November 2024",
 readTime: 5,
 ctaHeading: "Make sure you claim everything you are entitled to",
 ctaBody:
 "We review your situation carefully before lodging your return to make sure all eligible deductions are included. Get in touch and we will take a look.",
 ctaLabel: "Start your tax return",
 ctaHref: "/tax-return",
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
 "Do you need to lodge a tax return if you only worked for a short time in Australia?",
 description:
 "Even if you only worked for a few weeks, you may be required to lodge a tax return. Here is how to work out whether you need to.",
 category: "Tax Return",
 date: "2 December 2024",
 readTime: 4,
 ctaHeading: "Not sure if you need to lodge?",
 ctaBody:
 "We help working holiday makers work out whether they need to lodge a return and take care of the process if they do. Get in touch and we will give you a straight answer.",
 ctaLabel: "Ask us if you need to lodge",
 ctaHref: "/contact",
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

The standard deadline is 31 October following the end of the financial year, but if you lodge through our team as your registered tax agent, you qualify for the extended agent deadline.
 `,
 },
 {
 slug: "how-to-lodge-tax-return-from-overseas",
 title:
 "How to lodge an Australian tax return from overseas after you leave",
 description:
 "Leaving Australia does not mean you can skip your tax return. Here is how to lodge from anywhere in the world.",
 category: "Tax Return",
 date: "9 December 2024",
 readTime: 5,
 ctaHeading: "Lodge your Australian tax return from wherever you are",
 ctaBody:
 "We lodge Australian tax returns for working holiday makers from all over the world. Send us your details and we handle everything remotely.",
 ctaLabel: "Lodge your return with us",
 ctaHref: "/tax-return",
 body: `
To lodge an Australian tax return from overseas after you have left, work with a registered tax agent who can prepare and lodge the return remotely on your behalf. The entire process is done electronically, and your refund is paid to your Australian bank account. Our team handles tax returns for working holiday makers all over the world, every week. You do not need to return to Australia, and the lodgment deadline is extended when you go through a registered tax agent.

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
- Through our service as your registered tax agent → deadline often extended into the following May

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
 title: "What is a tax agent and why should working holiday makers use one?",
 description:
 "A registered tax agent prepares and lodges tax returns on your behalf. Here is what they do and why using one makes sense for working holiday makers.",
 category: "Tax Return",
 date: "16 December 2024",
 readTime: 4,
 ctaHeading: "Work with a registered tax agent",
 ctaBody:
 "We are supervised by a registered tax agent and handle Australian tax returns for working holiday makers from around the world. Get in touch and we will take care of your return.",
 ctaLabel: "Start your tax return",
 ctaHref: "/tax-return",
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
 date: "23 December 2024",
 readTime: 4,
 ctaHeading: "Want to make sure your withholding is correct?",
 ctaBody:
 "We check working holiday makers tax situations and make sure the right amount has been withheld. If there is an error, we sort it out through your tax return.",
 ctaLabel: "Check your tax situation",
 ctaHref: "/tax-return",
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
- **Super**: 11.5% super contribution your employer pays (not deducted from your pay)
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
 date: "30 December 2024",
 readTime: 3,
 ctaHeading: "Ready to lodge for this financial year?",
 ctaBody:
 "We handle Australian tax returns for working holiday makers wherever they are in the world. Get in touch and we will take care of everything.",
 ctaLabel: "Start your tax return",
 ctaHref: "/tax-return",
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
- **Extended (around May the following year)**: deadline if you lodge through a registered tax agent like our team

Lodgment opens 1 July, but it is usually worth waiting until late July or early August so your employer's income statement is finalised. We monitor this for you when you lodge through our service.

## What about super and quarterly deadlines?

Superannuation contributions are paid quarterly:

- Q1 (Jul-Sep): due by 28 October
- Q2 (Oct-Dec): due by 28 January
- Q3 (Jan-Mar): due by 28 April
- Q4 (Apr-Jun): due by 28 July

These dates matter if you are checking that your employer has paid your [superannuation](/superannuation) correctly before you leave Australia.
 `,
 },
 {
 slug: "cash-in-hand-tax-return",
 title:
 "Can you lodge a tax return if you worked cash in hand in Australia?",
 description:
 "Working cash in hand does not exempt you from your tax obligations. Here is what you need to declare and how to handle it.",
 category: "Tax Return",
 date: "6 January 2025",
 readTime: 4,
 ctaHeading: "Had cash in hand work? We can help.",
 ctaBody:
 "We help working holiday makers handle tax returns that involve cash in hand income. Get in touch and we will guide you through what needs to be declared.",
 ctaLabel: "Get in touch",
 ctaHref: "/contact",
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

If you were an employee being paid cash (not a contractor under an [ABN](/abn)), your employer is still legally required to pay 11.5% superannuation on top of your wages. Many cash-paying employers do not. This is a serious breach of Australian employment law.

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
 title: "What is superannuation and are working holiday makers eligible?",
 description:
 "Superannuation is Australia's compulsory retirement savings system. Working holiday makers are eligible and can claim it back when they leave.",
 category: "Super",
 date: "13 January 2025",
 readTime: 5,
 ctaHeading: "Ready to claim your super back?",
 ctaBody:
 "We help working holiday makers apply for their superannuation through the DASP process. Get in touch and we will take care of the whole application.",
 ctaLabel: "Claim your super",
 ctaHref: "/superannuation",
 body: `
Superannuation (super) is Australia's compulsory retirement savings system. Australian employers must contribute 11.5% of your ordinary time earnings into a super fund on top of your wages. Working holiday makers are entitled to receive super contributions just like Australian workers, and can claim the accumulated balance back when they permanently leave Australia through the Departing Australia Superannuation Payment (DASP) process. Our team handles DASP applications for working holiday makers from anywhere in the world.

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

See our detailed blog article on [how the DASP process works](/blog/what-is-dasp-super-withdrawal) for a step-by-step explanation.
 `,
 },
 {
 slug: "how-much-super-should-employer-pay",
 title: "How much super should your employer be paying you?",
 description:
 "From 1 July 2024, employers must contribute 11.5% of your earnings to your super fund. Here is how to check you are getting what you are owed.",
 category: "Super",
 date: "20 January 2025",
 readTime: 4,
 ctaHeading: "Not sure if your super is being paid correctly?",
 ctaBody:
 "We help working holiday makers check their super situation and make sure they receive everything they are entitled to. Get in touch and we will take a look.",
 ctaLabel: "Check your super",
 ctaHref: "/superannuation",
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
 title: "What is DASP and how does the super withdrawal process work?",
 description:
 "DASP stands for Departing Australia Superannuation Payment. It is the official process for claiming your super back after you leave Australia.",
 category: "Super",
 date: "27 January 2025",
 readTime: 5,
 ctaHeading: "Ready to apply for your DASP?",
 ctaBody:
 "We help working holiday makers through the DASP application process from start to finish. Get in touch and we will handle it for you.",
 ctaLabel: "Claim your super back",
 ctaHref: "/superannuation",
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

See our blog article on [what tax is taken from your DASP](/blog/tax-on-super-withdrawal-backpacker) for a detailed breakdown of how the tax is calculated.
 `,
 },
 {
 slug: "how-to-apply-for-super-back",
 title: "How to apply for your superannuation back after leaving Australia",
 description:
 "A step-by-step walkthrough of the DASP application process, from finding your super funds to receiving the payment in your account.",
 category: "Super",
 date: "3 February 2025",
 readTime: 6,
 ctaHeading: "Let us handle your DASP application",
 ctaBody:
 "We manage DASP applications for working holiday makers every day. Get in touch and we will take care of the whole process so you get your super back without the hassle.",
 ctaLabel: "Claim your super with us",
 ctaHref: "/superannuation",
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

See our blog article on [finding lost superannuation](/blog/how-to-find-lost-superannuation) for more detail. We do this search as part of every DASP application we handle, to make sure no super is left behind.
 `,
 },
 {
 slug: "how-long-does-dasp-take",
 title: "How long does a DASP application take to process?",
 description:
 "Most DASP applications are processed within 28 days. Here is what affects the timeline and what to do if yours is taking longer.",
 category: "Super",
 date: "10 February 2025",
 readTime: 4,
 ctaHeading: "Want us to manage your DASP application?",
 ctaBody:
 "We handle DASP applications for working holiday makers and keep track of the process so you do not have to. Get in touch and we will take it from here.",
 ctaLabel: "Get started",
 ctaHref: "/superannuation",
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
 "What tax is taken from your super when you withdraw it as a backpacker?",
 description:
 "A 65% withholding tax applies to DASP payments for working holiday makers. Here is how it works and what it means for your payout.",
 category: "Super",
 date: "17 February 2025",
 readTime: 4,
 ctaHeading: "Want to understand your super entitlements?",
 ctaBody:
 "We explain your super situation clearly and help you through the DASP process so you get everything you are entitled to. Get in touch and we will take a look.",
 ctaLabel: "Talk to us about your super",
 ctaHref: "/superannuation",
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
 `,
 },
 {
 slug: "what-happens-to-unclaimed-super",
 title: "What happens to your super if you never claim it?",
 description:
 "Unclaimed superannuation does not disappear, but it does transfer to the ATO. Here is what happens and how to claim it back.",
 category: "Super",
 date: "24 February 2025",
 readTime: 4,
 ctaHeading: "Claim your super before it transfers to the ATO",
 ctaBody:
 "We help working holiday makers claim their superannuation through DASP before or after it transfers to the ATO. Get in touch and we will handle the application.",
 ctaLabel: "Claim your super",
 ctaHref: "/superannuation",
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
 `,
 },
 {
 slug: "can-you-withdraw-super-in-australia",
 title: "Can you withdraw your super while still in Australia?",
 description:
 "Generally, you cannot access your super while on a working holiday visa in Australia. Here is why, and what your options are.",
 category: "Super",
 date: "3 March 2025",
 readTime: 4,
 ctaHeading: "Planning to leave Australia soon?",
 ctaBody:
 "We help working holiday makers claim their super through the DASP process once they have left. Get in touch and we will make sure you receive everything you are entitled to.",
 ctaLabel: "Plan your super claim",
 ctaHref: "/superannuation",
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

See our detailed blog article on [how to apply for DASP](/blog/how-to-apply-for-super-back) for everything you need to do once you have left Australia.
 `,
 },
 {
 slug: "how-to-find-lost-superannuation",
 title: "How to find lost or unclaimed superannuation in Australia",
 description:
 "Super can end up in multiple funds or with the ATO without you realising it. Here is how to track down every dollar.",
 category: "Super",
 date: "10 March 2025",
 readTime: 4,
 ctaHeading: "Need help tracking down your super?",
 ctaBody:
 "We help working holiday makers find and claim all their superannuation from funds and the ATO. Get in touch and we will help you locate everything.",
 ctaLabel: "Find your super",
 ctaHref: "/superannuation",
 body: `
To find lost or unclaimed superannuation in Australia, work with our team. As registered tax agents, we can search across all major super funds and ATO records using your Tax File Number to identify every account holding your super. Working holiday makers often accumulate super across multiple funds without realising it, and tracking down every account before lodging your DASP claim makes sure no money is left behind.

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
 `,
 },
 {
 slug: "how-to-choose-super-fund",
 title: "What is a superannuation fund and how do you choose one?",
 description:
 "When you start a job in Australia, you can nominate where your super goes. Here is what a super fund is and how to choose one as a working holiday maker.",
 category: "Super",
 date: "17 March 2025",
 readTime: 4,
 ctaHeading: "Questions about your super?",
 ctaBody:
 "We help working holiday makers understand their super situation and make sure they claim everything they are entitled to when they leave. Get in touch and we will help.",
 ctaLabel: "Talk to us about your super",
 ctaHref: "/superannuation",
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
 `,
 },

 // ─── WORK RIGHTS ────────────────────────────────────────────────────────────
 {
 slug: "minimum-wage-australia-2025-26",
 title: "What is the minimum wage in Australia for 2025-26?",
 description:
 "Australia has one of the highest minimum wages in the world. Here is the current rate and what it means for working holiday makers.",
 category: "Work Rights",
 date: "24 March 2025",
 readTime: 4,
 ctaHeading: "Need help with your tax on top of understanding your rights?",
 ctaBody:
 "We help working holiday makers sort their TFN, tax return, and super so everything is taken care of. Get in touch and we will help.",
 ctaLabel: "Get your tax sorted",
 ctaHref: "/tax-return",
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

See our blog article on [penalty rates in Australia](/blog/penalty-rates-australia) for the full breakdown.

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
 title: "How many hours can you work per week on a working holiday visa?",
 description:
 "Working holiday visa holders were previously limited to 6 months with one employer. Here is what the current rules actually say.",
 category: "Work Rights",
 date: "31 March 2025",
 readTime: 4,
 ctaHeading: "Sorted on work rules? Let us sort your tax.",
 ctaBody:
 "We help working holiday makers handle their TFN, tax return, and super in one place. Get in touch and we will take care of everything.",
 ctaLabel: "Get your tax sorted",
 ctaHref: "/tax-return",
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
 title: "What are penalty rates and are you entitled to them in Australia?",
 description:
 "Penalty rates are higher pay rates for working weekends, public holidays, and unsociable hours. Here is what they are and whether they apply to you.",
 category: "Work Rights",
 date: "7 April 2025",
 readTime: 4,
 ctaHeading: "Getting paid correctly? Make sure your tax is too.",
 ctaBody:
 "We help working holiday makers make sure their tax is handled correctly so everything earned ends up in the right hands. Get in touch and we will sort it.",
 ctaLabel: "Get your tax sorted",
 ctaHref: "/tax-return",
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
 title: "Can your employer pay you cash in hand in Australia?",
 description:
 "Cash in hand payments are common in some industries, but they come with tax obligations and rights implications. Here is what you need to know.",
 category: "Work Rights",
 date: "14 April 2025",
 readTime: 4,
 ctaHeading: "Had cash in hand work? We can help with your tax return.",
 ctaBody:
 "We help working holiday makers handle tax returns that include cash income. Get in touch and we will guide you through what to declare and how.",
 ctaLabel: "Sort your tax return",
 ctaHref: "/tax-return",
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

The ATO has multiple ways of identifying undeclared income (bank deposits, third-party reports, audits). Penalties for tax evasion are serious. The right approach is to keep records and declare honestly. See our blog article on [cash in hand tax returns](/blog/cash-in-hand-tax-return) for detail.

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
 "What is the Fair Work Act and how does it protect working holiday makers?",
 description:
 "The Fair Work Act is Australia's main workplace relations law. Here is how it protects you as a working holiday maker.",
 category: "Work Rights",
 date: "21 April 2025",
 readTime: 4,
 ctaHeading: "Get your tax sorted alongside your work rights",
 ctaBody:
 "We help working holiday makers handle all their Australian tax obligations, from TFN applications to tax returns and super claims. Get in touch and we will help.",
 ctaLabel: "Get started",
 ctaHref: "/contact",
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
 "What to do if your employer is not paying you correctly in Australia",
 description:
 "Underpayment is a serious issue in Australia. Here is what to do if you believe you are not being paid what you are owed.",
 category: "Work Rights",
 date: "28 April 2025",
 readTime: 4,
 ctaHeading: "Get everything else in order while you sort your pay",
 ctaBody:
 "We help working holiday makers handle their tax obligations so that side of things is taken care of regardless of what is happening with their employment situation.",
 ctaLabel: "Get your tax sorted",
 ctaHref: "/contact",
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
 "Are you entitled to sick leave and annual leave on a working holiday visa?",
 description:
 "Working holiday makers are entitled to leave in Australia, but how much depends on how you are employed. Here is what the rules say.",
 category: "Work Rights",
 date: "5 May 2025",
 readTime: 4,
 ctaHeading: "Know your rights, and know your tax too",
 ctaBody:
 "We help working holiday makers handle all their Australian tax obligations. Get in touch and we will take care of your TFN, tax return, and super.",
 ctaLabel: "Get your tax sorted",
 ctaHref: "/tax-return",
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
 title: "What is a tax invoice and when do you need to issue one?",
 description:
 "If you are working as a contractor with an ABN, you will need to issue tax invoices to get paid. Here is what a tax invoice must include.",
 category: "Work Rights",
 date: "12 May 2025",
 readTime: 4,
 ctaHeading: "Need an ABN to start issuing invoices?",
 ctaBody:
 "We handle ABN registrations for working holiday makers and make sure everything is set up correctly. Get in touch and we will sort it.",
 ctaLabel: "Register your ABN",
 ctaHref: "/abn",
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

If you are doing employee-like work but invoicing as a contractor, you may be a victim of sham contracting and entitled to super. See our blog article on [employee vs contractor](/blog/employee-vs-contractor-australia) for how to tell the difference.
 `,
 },
 {
 slug: "can-you-work-for-multiple-employers",
 title: "Can you work for multiple employers at the same time in Australia?",
 description:
 "Yes, working holiday makers can work for more than one employer simultaneously. Here is what to keep in mind for tax and visa purposes.",
 category: "Work Rights",
 date: "19 May 2025",
 readTime: 3,
 ctaHeading:
 "Working multiple jobs? Make sure your tax is set up correctly.",
 ctaBody:
 "We help working holiday makers with multiple employers make sure their tax situation is correct and their return includes all sources of income.",
 ctaLabel: "Get your tax sorted",
 ctaHref: "/tax-return",
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

Working multiple jobs means super may end up in multiple funds. Before you leave Australia, our team consolidates these or lodges separate DASP applications for each fund. See our blog article on [finding lost superannuation](/blog/how-to-find-lost-superannuation) for more.

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
 `,
 },
 {
 slug: "full-time-part-time-casual-australia",
 title:
 "What is the difference between full time, part time, and casual work in Australia?",
 description:
 "Your employment classification affects your pay rate, your leave entitlements, and your tax. Here is what each one means.",
 category: "Work Rights",
 date: "26 May 2025",
 readTime: 4,
 ctaHeading: "Whatever your work situation, we can sort your tax.",
 ctaBody:
 "We help working holiday makers handle their tax obligations regardless of how they are employed. Get in touch and we will take care of the details.",
 ctaLabel: "Get started",
 ctaHref: "/contact",
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
 title: "What is Medicare and are working holiday makers covered?",
 description:
 "Medicare is Australia's public health insurance system. Most working holiday makers are not covered, but there are exceptions.",
 category: "Medicare & Other",
 date: "2 June 2025",
 readTime: 4,
 ctaHeading: "Sorted on Medicare? Get your tax sorted too.",
 ctaBody:
 "We help working holiday makers handle their TFN, tax return, and super so all their Australian obligations are taken care of.",
 ctaLabel: "Get your tax sorted",
 ctaHref: "/tax-return",
 body: `
Medicare is Australia's universal public health insurance scheme that provides citizens and permanent residents with free or subsidised healthcare. Working holiday makers (subclass 417 and 462) are generally **not** eligible for Medicare unless their home country has a Reciprocal Health Care Agreement (RHCA) with Australia. Without coverage, you pay the full cost of medical appointments and treatment. You are also entitled to a Medicare Levy exemption on your tax return, saving you 2% of your taxable income. Our team applies this exemption when lodging your return.

## Are working holiday makers covered by Medicare?

Generally, no:

- Holders of working holiday visas 417 and 462 are not eligible for Medicare
- The exception is citizens of countries with a Reciprocal Health Care Agreement
- Without coverage, you are treated as a private patient
- You pay the full cost of GP visits, specialist appointments, prescriptions, and hospital treatment

The 11 countries with an RHCA covering working holiday makers are listed in our blog article on [Medicare agreements with Australia](/blog/countries-with-medicare-agreement-australia).

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

For more on RHCA countries and what they cover, see our blog article on [Medicare agreements with Australia](/blog/countries-with-medicare-agreement-australia).
 `,
 },
 {
 slug: "countries-with-medicare-agreement-australia",
 title: "Which countries have a Medicare agreement with Australia?",
 description:
 "Australia has Reciprocal Health Care Agreements with several countries, giving their citizens access to some Medicare benefits. Here is the full list.",
 category: "Medicare & Other",
 date: "9 June 2025",
 readTime: 4,
 ctaHeading: "Need help with your Australian tax return?",
 ctaBody:
 "We help working holiday makers lodge their Australian tax return correctly, including making sure any Medicare levy exemption is applied. Get in touch and we will handle it.",
 ctaLabel: "Start your tax return",
 ctaHref: "/tax-return",
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
 title: "What is the Medicare levy and do working holiday makers pay it?",
 description:
 "The Medicare levy is a 2% tax that funds Australia's healthcare system. Most working holiday makers are exempt. Here is how to claim the exemption.",
 category: "Medicare & Other",
 date: "16 June 2025",
 readTime: 4,
 ctaHeading:
 "Make sure your tax return includes the Medicare levy exemption.",
 ctaBody:
 "We handle tax returns for working holiday makers and make sure all entitlements, including the Medicare levy exemption, are correctly applied.",
 ctaLabel: "Start your tax return",
 ctaHref: "/tax-return",
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
 "What is a tax file number declaration form and how do you fill it in?",
 description:
 "The tax file number declaration form is what you give to your employer when you start a new job. Here is what it is and how to complete it correctly.",
 category: "Medicare & Other",
 date: "23 June 2025",
 readTime: 4,
 ctaHeading: "Starting a new job? Make sure your whole tax setup is right.",
 ctaBody:
 "We help working holiday makers apply for their TFN and make sure they are set up correctly for tax from day one. Get in touch and we will help.",
 ctaLabel: "Get your TFN sorted",
 ctaHref: "/tfn",
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

Until your TFN is on file, the 45% rate may apply. See our blog article on [TFN reference numbers](/blog/tfn-reference-number-before-tfn-arrives) for what to do in the interim.

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
 title: "What does tax withheld mean on your payslip in Australia?",
 description:
 "Tax withheld is the income tax your employer deducts from your wages before paying you. Here is how to check it is correct.",
 category: "Medicare & Other",
 date: "30 June 2025",
 readTime: 3,
 ctaHeading: "Not sure your payslip looks right?",
 ctaBody:
 "We check working holiday makers tax situations and help make sure the right amounts are being applied. Get in touch and we will take a look.",
 ctaLabel: "Check your tax situation",
 ctaHref: "/contact",
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
 "What is an income statement in Australia and how do you access yours?",
 description:
 "An income statement shows your total wages and tax withheld for the year. Here is how to find yours and what to do with it.",
 category: "Medicare & Other",
 date: "7 July 2025",
 readTime: 3,
 ctaHeading: "Ready to lodge your tax return?",
 ctaBody:
 "We handle the entire tax return process for working holiday makers, including checking your income statements are correct. Get in touch and we will sort it out.",
 ctaLabel: "Start your tax return",
 ctaHref: "/tax-return",
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

This is one of the main advantages of working with a registered tax agent.

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

- Total wages don't match your payslips
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
 `,
 },
 {
 slug: "what-is-the-ato",
 title: "What is the ATO and what does it do?",
 description:
 "The ATO is the Australian Taxation Office, the government agency responsible for collecting taxes. Here is what it does and when you will deal with it.",
 category: "Medicare & Other",
 date: "14 July 2025",
 readTime: 3,
 ctaHeading: "Let us handle your dealings with the ATO",
 ctaBody:
 "We manage Australian tax returns for working holiday makers and deal with the ATO on our clients behalf. Get in touch and we will take care of everything.",
 ctaLabel: "Get your tax sorted",
 ctaHref: "/tax-return",
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
 title: "What is the difference between gross pay and net pay in Australia?",
 description:
 "Gross pay is what you earn before deductions. Net pay is what you actually receive. Here is how the two relate to your tax situation.",
 category: "Medicare & Other",
 date: "21 July 2025",
 readTime: 3,
 ctaHeading: "Make sure your net pay is correct",
 ctaBody:
 "We help working holiday makers check their tax situation and make sure the right amounts are being deducted. Get in touch and we will take a look.",
 ctaLabel: "Check your tax situation",
 ctaHref: "/contact",
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
 title: "Do working holiday makers need to pay tax on tips in Australia?",
 description:
 "Yes, tips received as part of your employment in Australia are taxable income. Here is how they are treated and what you need to declare.",
 category: "Medicare & Other",
 date: "28 July 2025",
 readTime: 3,
 ctaHeading: "Need help declaring all your income correctly?",
 ctaBody:
 "We make sure working holiday makers tax returns include all income sources correctly. Get in touch and we will take care of your return.",
 ctaLabel: "Start your tax return",
 ctaHref: "/tax-return",
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
 "What happens to your Australian tax obligations after you leave the country?",
 description:
 "Leaving Australia does not end your tax obligations there. Here is what you still need to do after you depart.",
 category: "Medicare & Other",
 date: "4 August 2025",
 readTime: 4,
 ctaHeading: "Leaving or already left Australia?",
 ctaBody:
 "We help working holiday makers wrap up their Australian tax obligations from anywhere in the world. Tax returns, super claims, and everything in between.",
 ctaLabel: "Get everything sorted",
 ctaHref: "/contact",
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

The standard deadline is 31 October following the financial year. Through our service as your registered tax agent, the deadline is typically extended to May the following year.

Failing to lodge when required can result in penalties. The ATO has your income records from your employers and expects a return. See our blog article on [lodging a tax return from overseas](/blog/how-to-lodge-tax-return-from-overseas).

## How do you claim your superannuation?

If super contributions were made on your behalf, you can claim them through the Departing Australia Superannuation Payment (DASP) process:

- Available once your visa has expired and you have left Australia
- We lodge the application on your behalf
- 65% withholding tax applies to the taxable component
- Net amount is paid to your nominated bank account (Australian or overseas)

See our detailed blog article on [how to apply for DASP](/blog/how-to-apply-for-super-back) for the full process.

## How do you cancel your ABN?

If you registered for an [ABN](/abn):

- We cancel it as part of wrapping up your Australian tax position
- The cancellation takes effect from a specified date
- Keeps your business records tidy
- Prevents administrative issues if you ever return to Australia

See our blog article on [cancelling your ABN](/blog/how-to-cancel-your-abn) for what to wrap up before cancellation.

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
 date: "11 August 2025",
 readTime: 5,
 ctaHeading: "Not sure about your tax residency status?",
 ctaBody:
 "We help working holiday makers understand their tax situation and make sure the correct rates are applied. Get in touch and we will give you a straight answer based on your circumstances.",
 ctaLabel: "Get in touch",
 ctaHref: "/contact",
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

If you incorrectly claimed the tax-free threshold, you may face a tax debt at year-end because too little tax was withheld. See our blog article on [the tax-free threshold for working holiday makers](/blog/tax-free-threshold-working-holiday-visa).

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
 title: "How to update your address with the ATO in Australia",
 description:
 "If you move around Australia, keeping your address up to date with the ATO is important. Your TFN letter and any tax correspondence goes to the address on file.",
 category: "TFN",
 date: "18 August 2025",
 readTime: 3,
 ctaHeading: "Need help with your TFN or tax return?",
 ctaBody:
 "We handle everything for working holiday makers - from TFN applications to tax returns - supervised by a registered tax agent.",
 ctaLabel: "Get help from our team",
 ctaHref: "/tfn",
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
3. We update it with the ATO on your behalf as your registered tax agent
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
 date: "25 August 2025",
 readTime: 4,
 ctaHeading: "Find out how much you are owed",
 ctaBody:
 "We calculate your refund and lodge your tax return correctly. Most working holiday makers receive a refund. Let us handle it for you.",
 ctaLabel: "Start your tax return",
 ctaHref: "/tax-return",
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
 title: "How long does it take to get a tax refund in Australia?",
 description:
 "Most tax refunds in Australia are processed within two weeks of lodgement. Here is what affects the timeline and what to do if yours is taking longer.",
 category: "Tax Return",
 date: "1 September 2025",
 readTime: 3,
 ctaHeading: "Get your tax return lodged quickly",
 ctaBody:
 "We lodge your return electronically through our registered tax agent. Most refunds arrive within two weeks of lodgement.",
 ctaLabel: "Start your tax return",
 ctaHref: "/tax-return",
 body: `
Most Australian tax refunds are processed and paid within two weeks of lodgment when the return is filed electronically. Through our service as your registered tax agent, we lodge electronically so refunds typically arrive within 7-14 business days. Refunds during peak season (August-September) may take a few days longer. If your refund is taking longer than expected, our team follows up directly with the ATO.

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
 "Are casual and part-time workers entitled to superannuation in Australia?",
 description:
 "Yes. Casual and part-time workers are entitled to superannuation in Australia regardless of how many hours they work, as long as they meet the earnings threshold.",
 category: "Super",
 date: "8 September 2025",
 readTime: 4,
 ctaHeading: "Claim your super before you leave",
 ctaBody:
 "We help working holiday makers claim their superannuation back through the DASP process. Fully online, handled by our registered team.",
 ctaLabel: "Start your super claim",
 ctaHref: "/superannuation",
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

Even small super balances from short stints of casual work are worth claiming. We aggregate balances from multiple funds in one DASP package. See our blog article on [how to apply for DASP](/blog/how-to-apply-for-super-back).

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
 "What to do if your employer asks you to work more hours than your visa allows",
 description:
 "Working more than your visa allows can put your visa at risk. Here is what the rules say and what to do if your employer is pressuring you to breach them.",
 category: "Work Rights",
 date: "15 September 2025",
 readTime: 4,
 ctaHeading: "Questions about your tax and visa situation?",
 ctaBody:
 "We help working holiday makers navigate their tax obligations correctly. Get in touch for straightforward advice.",
 ctaLabel: "Talk to our team",
 ctaHref: "/tax-return",
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
 "Your work rights during farm work in Australia on a working holiday visa",
 description:
 "Farm work is one of the most common jobs for working holiday makers. Here is what you are legally entitled to, including pay rates, conditions, and protections.",
 category: "Work Rights",
 date: "22 September 2025",
 readTime: 5,
 ctaHeading: "Need help with your tax after farm work?",
 ctaBody:
 "Farm work income is taxed like any other work in Australia. We handle your tax return correctly so you get back everything you are owed.",
 ctaLabel: "Start your tax return",
 ctaHref: "/tax-return",
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

Many farm employers skip super for working holiday makers. Our team can recover unpaid super through the formal Superannuation Guarantee Charge process. See our blog article on [farm work and ABNs](/blog/farm-work-and-abns) if you are unsure whether you are an employee or contractor.
 `,
 },

 // ─── NEW: Medicare & Other ─────────────────────────────────────────────────
 {
 slug: "what-is-superannuation-guarantee-charge",
 title:
 "What is the Superannuation Guarantee Charge and what does it mean for you?",
 description:
 "If your employer fails to pay your super correctly, the ATO can charge them the Superannuation Guarantee Charge. Here is how it works and what it means for your super.",
 category: "Medicare & Other",
 date: "29 September 2025",
 readTime: 4,
 ctaHeading: "Make sure your super is paid before you leave",
 ctaBody:
 "We help working holiday makers track and claim their superannuation correctly before they leave Australia.",
 ctaLabel: "Start your super claim",
 ctaHref: "/superannuation",
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
 "What is a TFN reference number and can you work before your TFN arrives?",
 description:
 "You applied for your TFN but it has not arrived yet. Here is what a reference number is, how to use it, and what your employer needs to know.",
 category: "TFN" as const,
 date: "6 October 2025",
 readTime: 4,
 ctaHeading: "Need help with your TFN application?",
 ctaBody:
 "We handle TFN applications for working holiday makers every day. Fast, simple, and supervised by a registered tax agent.",
 ctaLabel: "Apply for your TFN with us",
 ctaHref: "/tfn-form",
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
 "Can working holiday makers claim the tax-free threshold in Australia?",
 description:
 "The tax-free threshold sounds like it would save you money. For working holiday makers, claiming it actually creates a tax debt. Here is why.",
 category: "TFN" as const,
 date: "13 October 2025",
 readTime: 4,
 ctaHeading: "Want to make sure your tax is set up correctly?",
 ctaBody:
 "We review your tax situation and fix anything that is not right. Talk to our team before the end of the financial year.",
 ctaLabel: "Talk to our team on WhatsApp",
 ctaHref: "/tfn-form",
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
 "What is a White Card and do you need one on a working holiday visa?",
 description:
 "If you want to work in construction in Australia, you need a White Card before your first day on site. Here is what it is, how to get it, and what it costs.",
 category: "Work Rights" as const,
 date: "20 October 2025",
 readTime: 4,
 ctaHeading: "Questions about working in Australia?",
 ctaBody:
 "Our team helps working holiday makers understand their rights and obligations. Talk to us on WhatsApp any time.",
 ctaLabel: "Talk to our team on WhatsApp",
 ctaHref: "/contact",
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
 `,
 },
 {
 slug: "rsa-certificate-australia-working-holiday",
 title:
 "What is an RSA certificate and do you need one to work in hospitality in Australia?",
 description:
 "Working in a bar, pub, or bottle shop in Australia requires an RSA certificate. Here is what the course involves, what it costs, and how to get one as a working holiday maker.",
 category: "Work Rights" as const,
 date: "27 October 2025",
 readTime: 4,
 ctaHeading: "Questions about working rights on a working holiday visa?",
 ctaBody:
 "Our team is available on WhatsApp to help you understand what you need before you start a new job in Australia.",
 ctaLabel: "Talk to our team on WhatsApp",
 ctaHref: "/contact",
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
 `,
 },
 {
 slug: "wwcc-working-with-children-check-australia",
 title:
 "What is a Working With Children Check and do you need one on a working holiday visa?",
 description:
 "If you want to work with children in Australia, a WWCC is required before you start. Here is what it involves, how long it takes, and how to apply as a working holiday maker.",
 category: "Work Rights" as const,
 date: "3 November 2025",
 readTime: 4,
 ctaHeading: "Questions about working rights on a working holiday visa?",
 ctaBody:
 "Our team helps working holiday makers understand what is required before starting work in Australia. Talk to us on WhatsApp.",
 ctaLabel: "Talk to our team on WhatsApp",
 ctaHref: "/contact",
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
 "Public holidays in Australia: what working holiday makers need to know",
 description:
 "Public holidays in Australia come with higher pay rates and different rules depending on your employment type. Here is everything working holiday makers need to know.",
 category: "Work Rights" as const,
 date: "10 November 2025",
 readTime: 5,
 ctaHeading: "Think your pay is not right?",
 ctaBody:
 "We help working holiday makers check whether they are being paid correctly. Talk to our team on WhatsApp.",
 ctaLabel: "Talk to our team on WhatsApp",
 ctaHref: "/contact",
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
 title: "Can your employer cancel your casual shift in Australia?",
 description:
 "As a casual worker in Australia, your shifts can be cancelled, but your employer must follow specific rules. Here is what the law says and what you are entitled to.",
 category: "Work Rights" as const,
 date: "17 November 2025",
 readTime: 4,
 ctaHeading: "Think your rights are not being respected?",
 ctaBody:
 "We help working holiday makers understand their entitlements. Talk to our team on WhatsApp if something does not seem right.",
 ctaLabel: "Talk to our team on WhatsApp",
 ctaHref: "/contact",
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
 "The 6-month rule: how long can you work for the same employer on a working holiday visa?",
 description:
 "Working holiday visa holders are limited to six months with the same employer. Here is what the rule means, what counts as the same employer, and what exceptions exist.",
 category: "Work Rights" as const,
 date: "24 November 2025",
 readTime: 5,
 ctaHeading: "Questions about your working holiday visa conditions?",
 ctaBody:
 "Our team helps working holiday makers understand their visa obligations. Talk to us on WhatsApp.",
 ctaLabel: "Talk to our team on WhatsApp",
 ctaHref: "/contact",
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

For super accumulation, working for one employer for longer (where allowed) is helpful because it consolidates contributions into fewer funds. See our blog article on [finding lost superannuation](/blog/how-to-find-lost-superannuation).

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
 title: "How to open a bank account in Australia as a working holiday maker",
 description:
 "You need an Australian bank account before your first pay arrives. Here is which banks to consider, what documents you need, and when to close the account before you leave.",
 category: "Medicare & Other" as const,
 date: "1 December 2025",
 readTime: 5,
 ctaHeading: "Need help getting set up in Australia?",
 ctaBody:
 "Our team helps working holiday makers with TFN, tax, and general financial set-up from day one. Talk to us on WhatsApp.",
 ctaLabel: "Talk to our team on WhatsApp",
 ctaHref: "/contact",
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
 "The Tourist Refund Scheme: how to claim GST back on purchases before leaving Australia",
 description:
 "If you bought goods in Australia worth $300 or more, you may be able to claim back the 10% GST before you fly home. Here is how the TRS works and what you need to claim.",
 category: "Medicare & Other" as const,
 date: "8 December 2025",
 readTime: 5,
 ctaHeading: "Questions about tax and money before leaving Australia?",
 ctaBody:
 "Our team helps working holiday makers get everything sorted before departure. Talk to us on WhatsApp.",
 ctaLabel: "Talk to our team on WhatsApp",
 ctaHref: "/contact",
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
 `,
 },
 {
 slug: "transferring-money-overseas-australia-tax",
 title: "Do you pay tax on money you transfer out of Australia?",
 description:
 "Sending your savings home before leaving Australia? Here is what working holiday makers need to know about international transfers and Australian tax obligations.",
 category: "Tax Return" as const,
 date: "15 December 2025",
 readTime: 4,
 ctaHeading: "Leaving Australia and want to get your finances sorted?",
 ctaBody:
 "We help working holiday makers with tax returns, super withdrawals, and everything else before departure. Talk to us on WhatsApp.",
 ctaLabel: "Talk to our team on WhatsApp",
 ctaHref: "/tax-return",
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
4. Wait for your tax refund and super payment to arrive in your Australian account
5. Transfer everything home
6. Close your Australian bank account

Skipping or reordering these steps creates complications. Closing your bank account too early is the most common mistake - your tax refund and super payment then have nowhere to go.

## What about money you brought into Australia?

Money you brought in with you when you arrived is not taxable:

- Pre-existing savings from your home country are yours
- Bringing them in is not income
- Transferring some of them back out is not a tax event

What is taxable is everything you earned in Australia during your stay. The distinction is between what you earned here (taxable) and what you brought in or hold in savings (not taxable).
 `,
 },

 // ─── ABN ADVANCED - NEW ────────────────────────────────────────────────────
 {
 slug: "vehicle-logbook-abn-working-holiday",
 title:
 "Vehicle expenses and logbooks for working holiday makers with an ABN",
 description:
 "If you use a car for work under your ABN, you may be able to claim vehicle expenses as a tax deduction. Here is how the logbook method works and what you need to record.",
 category: "ABN" as const,
 date: "22 December 2025",
 readTime: 5,
 ctaHeading: "Working under an ABN and want to maximise your deductions?",
 ctaBody:
 "Our team helps ABN holders prepare accurate tax returns with all relevant deductions applied. Talk to us on WhatsApp.",
 ctaLabel: "Talk to our team on WhatsApp",
 ctaHref: "/abn-form",
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
 "What is the small business tax offset and can working holiday makers claim it?",
 description:
 "If you earn income under an ABN as a sole trader, you may be entitled to the small business tax offset - a tax reduction of up to $1,000. Here is how it works.",
 category: "ABN" as const,
 date: "29 December 2025",
 readTime: 4,
 ctaHeading:
 "Working under an ABN and want to claim every offset you are entitled to?",
 ctaBody:
 "We prepare tax returns for ABN holders and make sure every available offset is applied. Talk to our team on WhatsApp.",
 ctaLabel: "Talk to our team on WhatsApp",
 ctaHref: "/abn-form",
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
 `,
 },
 {
 slug: "sole-trader-vs-company-australia-working-holiday",
 title:
 "Sole trader vs company in Australia: what is the difference for working holiday makers?",
 description:
 "Most working holiday makers operate as sole traders, but understanding the difference between a sole trader and a company helps you make informed decisions about your business structure.",
 category: "ABN" as const,
 date: "5 January 2026",
 readTime: 5,
 ctaHeading: "Questions about your business structure or ABN?",
 ctaBody:
 "We help working holiday makers with ABN applications and business tax. Talk to our team on WhatsApp.",
 ctaLabel: "Talk to our team on WhatsApp",
 ctaHref: "/abn-form",
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
 `,
 },
 {
 slug: "profit-loss-vs-personal-services-income-australia",
 title:
 "What is the difference between a profit and loss business and personal services income in Australia?",
 description:
 "The ATO distinguishes between personal services income and genuine business income. For working holiday makers with an ABN, understanding this distinction can affect your tax.",
 category: "ABN" as const,
 date: "12 January 2026",
 readTime: 5,
 ctaHeading:
 "Working under an ABN and unsure how your income is classified?",
 ctaBody:
 "Our team helps ABN holders understand their tax obligations and lodge accurate returns. Talk to us on WhatsApp.",
 ctaLabel: "Talk to our team on WhatsApp",
 ctaHref: "/abn-form",
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
 date: "19 January 2026",
 readTime: 4,
 ctaHeading:
 "Want to make sure you are claiming every offset you are entitled to?",
 ctaBody:
 "We prepare tax returns for working holiday makers and apply every relevant offset automatically. Talk to our team on WhatsApp.",
 ctaLabel: "Start your tax return with us",
 ctaHref: "/tax-return",
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
 date: "26 January 2026",
 readTime: 4,
 ctaHeading: "Dealing with an ATO issue and not sure what to do?",
 ctaBody:
 "Our team helps working holiday makers navigate ATO matters including assessments and disputes. Talk to us on WhatsApp.",
 ctaLabel: "Talk to our team on WhatsApp",
 ctaHref: "/tax-return",
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
 title: "Can you amend a tax return after it has been lodged in Australia?",
 description:
 "Lodged your tax return and realised you made a mistake? Here is how to amend a return, how long you have, and what happens to your refund while the amendment is processed.",
 category: "Tax Return" as const,
 date: "2 February 2026",
 readTime: 4,
 ctaHeading: "Think your tax return might have an error?",
 ctaBody:
 "We review and amend tax returns for working holiday makers. Talk to our team on WhatsApp before the ATO gets in touch.",
 ctaLabel: "Talk to our team on WhatsApp",
 ctaHref: "/tax-return",
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

If the ATO amends your return and you disagree, you can lodge an objection through the formal appeal process. See our blog article on [appealing ATO decisions](/blog/appealing-ato-decision-australia).

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
 date: "9 February 2026",
 readTime: 4,
 ctaHeading: "Dealing with a tax debt and unsure what to do?",
 ctaBody:
 "Our team helps working holiday makers manage ATO obligations including payment arrangements. Talk to us on WhatsApp.",
 ctaLabel: "Talk to our team on WhatsApp",
 ctaHref: "/tax-return",
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
- **Failure-to-lodge penalty**: $313 per 28 days late, up to $1,565 maximum
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
 "Piece rates in farm work: how are working holiday makers paid for harvest work?",
 description:
 "Piece rates are common in fruit picking and harvest work in Australia. Here is how they work, what the minimum pay rules are, and what to do if you are underpaid.",
 category: "Work Rights" as const,
 date: "16 February 2026",
 readTime: 5,
 ctaHeading: "Questions about your pay or tax as a farm worker?",
 ctaBody:
 "Our team helps working holiday makers in agriculture understand their pay, tax, and super obligations. Talk to us on WhatsApp.",
 ctaLabel: "Talk to our team on WhatsApp",
 ctaHref: "/contact",
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
 "Labour hire agencies in Australia: what working holiday makers need to know",
 description:
 "Labour hire agencies are a popular way to find work quickly in Australia. Here is how they work, what your rights are, and what to watch out for before signing up.",
 category: "Work Rights" as const,
 date: "23 February 2026",
 readTime: 5,
 ctaHeading:
 "Working through a labour hire agency and unsure about your tax or super?",
 ctaBody:
 "Our team helps working holiday makers understand their obligations regardless of how they find work. Talk to us on WhatsApp.",
 ctaLabel: "Talk to our team on WhatsApp",
 ctaHref: "/contact",
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
 title: "How to read a payslip in Australia as a working holiday maker",
 description:
 "Your payslip contains everything you need to know about whether you are being paid correctly. Here is what each section means and what to check every pay cycle.",
 category: "Work Rights" as const,
 date: "2 March 2026",
 readTime: 5,
 ctaHeading: "Think something on your payslip looks wrong?",
 ctaBody:
 "Our team helps working holiday makers check whether their tax and super are being applied correctly. Talk to us on WhatsApp.",
 ctaLabel: "Talk to our team on WhatsApp",
 ctaHref: "/contact",
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
 "Wage theft in Australia: what working holiday makers can do if they are underpaid",
 description:
 "Wage theft is unfortunately common in industries popular with backpackers. Here is how to recognise it, what your options are, and how to recover what you are owed.",
 category: "Work Rights" as const,
 date: "9 March 2026",
 readTime: 5,
 ctaHeading: "Think you have been underpaid?",
 ctaBody:
 "Our team helps working holiday makers understand their pay and tax entitlements. Talk to us on WhatsApp and we can point you in the right direction.",
 ctaLabel: "Talk to our team on WhatsApp",
 ctaHref: "/contact",
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

We have helped working holiday makers recover thousands in unpaid super. The SGC system protects workers even when employers fail to pay. See our blog article on [the Superannuation Guarantee Charge](/blog/what-is-superannuation-guarantee-charge) for more.

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
 date: "16 March 2026",
 readTime: 6,
 ctaHeading: "Want to make sure you are paying the right tax rate?",
 ctaBody:
 "We handle tax returns for working holiday makers every day and make sure the correct rate is applied. Talk to our team on WhatsApp.",
 ctaLabel: "Start your tax return with us",
 ctaHref: "/tax-return",
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

See our blog article on [tax on super withdrawal](/blog/tax-on-super-withdrawal-backpacker) for more.

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
 "How to check your superannuation balance as a working holiday maker",
 description:
 "Knowing how much super you have accumulated is important - especially before you leave Australia. Here is how to track your balance and make sure your employer is paying correctly.",
 category: "Super" as const,
 date: "23 March 2026",
 readTime: 4,
 ctaHeading: "Ready to withdraw your super before leaving Australia?",
 ctaBody:
 "We handle DASP super withdrawal applications for working holiday makers. Our team manages the entire process. Talk to us on WhatsApp.",
 ctaLabel: "Talk to our team on WhatsApp",
 ctaHref: "/superannuation",
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
 intro: `A Tax File Number (TFN) is the 9-digit identifier issued by the Australian Taxation Office (ATO) to every person who earns income in Australia. As a working holiday maker, you need a TFN before you start work, otherwise your employer must withhold tax at 45% instead of the 15% working holiday rate. These blog articles cover everything from applying for your first TFN to handling delays, lost numbers, and second-visa returns.`,
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
 category: "ABN",
 slug: "abn",
 title: "ABN Blog Articles for Working Holiday Makers in Australia",
 description:
 "Everything you need to know about the Australian Business Number (ABN) for backpackers. When you need one, how to register, and what it means for your tax.",
 intro: `An Australian Business Number (ABN) is an 11-digit identifier used when you operate as a sole trader or independent contractor in Australia. You need an ABN if a business is paying you to invoice them rather than putting you on the payroll. These blog articles cover registration, when an ABN is the right choice, and how working under an ABN affects your tax, super, and entitlements.`,
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
 category: "Tax Return",
 slug: "tax-return",
 title: "Tax Return Blog Articles for Working Holiday Makers",
 description:
 "Everything you need to know about lodging your Australian tax return as a working holiday maker. Refunds, deductions, deadlines, and what to claim.",
 intro: `The Australian financial year runs from 1 July to 30 June, and every working holiday maker who earned income during that period is required to lodge a tax return. Most backpackers get a refund because their employer withheld more tax than required. These blog articles cover deadlines, deductions, what to do when you have left Australia, and how to handle complications.`,
 faq: [
 {
 question: "When do working holiday makers need to lodge a tax return?",
 answer:
 "The Australian financial year ends on 30 June. You must lodge your tax return between 1 July and 31 October that year. If you lodge through a registered tax agent, the deadline can be extended.",
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
 "Yes. You can lodge your tax return from anywhere in the world. A registered tax agent can manage the process remotely. Keep your Australian bank account open until the refund is paid.",
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
 category: "Super",
 slug: "super",
 title: "Superannuation Blog Articles for Working Holiday Makers",
 description:
 "Everything you need to know about Australian superannuation as a backpacker. How super works, how to claim it when you leave, and how to find lost super.",
 intro: `Superannuation (super) is Australia's compulsory retirement savings system. Your employer pays 12% of your wages into a super fund on top of your pay (effective 1 July 2025). When you leave Australia at the end of your working holiday, you can withdraw your super through the Departing Australia Superannuation Payment (DASP) process. These blog articles cover how super works, how to track it, and how to claim it.`,
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
 "You can find lost super by linking your TFN to your account through our service, contacting the Australian Taxation Office, or working with a registered tax agent who can search across all funds.",
 },
 ],
 relatedServicePath: "/superannuation",
 relatedServiceLabel: "Claim your super",
 },
 {
 category: "Work Rights",
 slug: "work-rights",
 title: "Work Rights Blog Articles for Working Holiday Makers",
 description:
 "Everything you need to know about your work rights in Australia as a backpacker. Minimum wage, awards, payslips, public holidays, and what to do about wage theft.",
 intro: `Working holiday makers in Australia have the same legal rights at work as Australian citizens. The Fair Work Ombudsman enforces minimum wages, conditions, and protections under industry awards. These blog articles cover what you are entitled to, how to read your payslip, how to spot underpayment, and what to do if your employer breaks the rules.`,
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
 category: "Medicare & Other",
 slug: "medicare-and-other",
 title: "Medicare and General Tax Blog Articles for Working Holiday Makers",
 description:
 "Medicare, the Medicare Levy, tourist refund scheme, and other general blog articles for working holiday makers navigating tax and benefits in Australia.",
 intro: `Working holiday makers face a range of tax and administrative questions outside the core areas of TFN, ABN, tax returns, and super. These blog articles cover Medicare access, the Medicare Levy and Medicare Levy Surcharge, claiming GST back on goods you take home, and other general topics that affect backpackers living and working in Australia.`,
 faq: [
 {
 question: "Do working holiday makers pay the Medicare Levy?",
 answer:
 "No. Working holiday makers are not eligible for Medicare and are not required to pay the 2% Medicare Levy. our team can apply for a Medicare Levy Exemption Certificate to confirm this on your tax return.",
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
 relatedServiceLabel: "Sort your Medicare position",
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
