export type Category = 'TFN' | 'ABN' | 'Tax Return' | 'Super' | 'Work Rights' | 'Medicare & Other'

export interface Guide {
  slug: string
  title: string
  description: string
  category: Category
  date: string
  readTime: number
  body: string
  ctaHeading: string
  ctaBody: string
  ctaLabel: string
  ctaHref: string
}

export const guides: Guide[] = [
  // ─── TFN ───────────────────────────────────────────────────────────────────
  {
    slug: 'what-is-a-tfn',
    title: 'What is a TFN and why do you need one in Australia?',
    description: 'A Tax File Number is the first thing you need when you start working in Australia. Without one, your employer must withhold nearly half your pay.',
    category: 'TFN',
    date: '1 July 2024',
    readTime: 5,
    ctaHeading: 'Get your TFN sorted the right way',
    ctaBody: 'We help working holiday makers apply for their TFN correctly and quickly, supervised by a registered tax agent. Fully online, most applications submitted within 24 hours.',
    ctaLabel: 'Start your TFN application',
    ctaHref: '/tfn',
    body: `
A Tax File Number (TFN) is a unique 9-digit number issued by the Australian Taxation Office (ATO). It is your permanent identifier in the Australian tax system and stays with you for life. Whether you work in Australia once for a few months or return multiple times over the years, your TFN never changes and never expires.

Every worker in Australia needs one, regardless of whether they are a citizen, a permanent resident, or an international visitor on a working holiday visa. The ATO uses it to track your income, your tax payments, and any credits or refunds you may be eligible for.

## Why your TFN matters from day one

Without a TFN registered with your employer, they are required by Australian law to withhold tax at the top rate of 47%. That is nearly half of everything you earn, gone before it reaches your bank account. As a working holiday maker with a TFN, the rate that applies to your income is 15%, which is significantly lower.

The difference adds up quickly. On a weekly wage of $1,000, the gap between 47% withholding and 15% withholding is $320 every single week. Over a few months of work, that is thousands of dollars that should be in your pocket.

## What the ATO uses your TFN for

Your TFN is not just about pay. The ATO links it to every aspect of your financial life while you are in Australia. It is required when you lodge your [annual tax return](/tax-return) at the end of the financial year, when you access your [superannuation](/superannuation) account, and when you open certain Australian bank accounts. It is also used to identify you if the ATO ever needs to contact you about your tax affairs.

Think of it as the foundation of your financial identity in Australia. Every other obligation, whether that is a tax return, a super claim, or an ABN registration, connects back to it.

## Who can apply for a TFN

Anyone who holds a visa that permits work in Australia can apply. This includes holders of the Working Holiday Visa subclass 417 and the Work and Holiday Visa subclass 462. Our team handles the application on your behalf — get in touch and we will take care of everything.

The application is free. There is no government fee and no cost involved. The process is entirely online and takes around 10 minutes to complete. Most applicants receive their TFN within 28 days, though it sometimes arrives sooner depending on the ATO's processing times.

## Giving your TFN to your employer

Once you receive your TFN, you will need to complete a Tax File Number Declaration form for each employer you work for. This is the document that tells your employer what tax rate to apply to your wages. Make sure you submit it promptly. Until your employer has it on file, they are required to withhold at the highest rate regardless of your visa type.

This applies to every employer, including casual and part-time roles. Even if you are only working a few shifts somewhere, you should still provide your TFN.

## What if you have already started work without a TFN

Apply as soon as possible and let your employer know it is on the way. Once your TFN is registered with them, the correct tax rate will apply going forward. Any overpaid tax from the period before your TFN was registered can be reclaimed through your [tax return](/tax-return) at the end of the financial year. You will not permanently lose that money as long as you lodge a return before the deadline.
    `,
  },
  {
    slug: 'how-to-apply-for-a-tfn',
    title: 'How to apply for a TFN as a working holiday maker',
    description: 'Applying for a TFN in Australia is straightforward and free. Here is exactly how to do it as a working holiday visa holder.',
    category: 'TFN',
    date: '8 July 2024',
    readTime: 4,
    ctaHeading: 'Want us to handle your TFN application?',
    ctaBody: 'We take care of the entire process for you, supervised by a registered tax agent. No confusing forms, no ATO portals. Just send us your details and we handle the rest.',
    ctaLabel: 'Apply for your TFN with us',
    ctaHref: '/tfn',
    body: `
Applying for a Tax File Number (TFN) in Australia is one of the first things you should do when you arrive. The process is free, entirely online, and takes around 10 minutes. As a working holiday maker, there are a few things worth knowing before you start.

## Who processes your TFN application

TFN applications for foreign passport holders are processed by the Australian Taxation Office (ATO). Your TFN is sent to you by post within around 28 days of the application being approved.

## What you need before you apply

Before starting your application, make sure you have your passport available. You will need your passport number, your date of birth, your visa details, and a residential address in Australia where the ATO can send your TFN by letter. If you have not yet found permanent accommodation, a hostel address works fine as long as you are confident you will still be there when the letter arrives.

You will also need a valid email address. The ATO will send you a confirmation when your application is received and another when it is processed.

## The application process step by step

Once an application is submitted, you receive a reference number by email confirming it is in progress.

Your TFN itself will arrive as a letter to your Australian address within 28 days. Keep this letter in a safe place. While the ATO can help you retrieve your TFN later if you lose it, it is much easier to have it on hand.

## Can you start work before your TFN arrives

Yes. You can begin working before your TFN arrives, but you should inform your employer that your application is in progress. If you can, show them the confirmation email from the ATO as evidence. Some employers will use a lower withholding rate in the meantime, though technically they are required to withhold at 47% until they have your TFN on file. Any excess tax withheld during this period can be recovered through your [tax return](/tax-return).

## Once your TFN arrives

When your TFN letter arrives, fill in a Tax File Number Declaration form for each employer you work for and return it to them promptly. This is what triggers the correct 15% working holiday maker tax rate on your wages. Once your employer has that form, you should see the correct amount being withheld from your next pay.

Your TFN also opens the door to lodging a [tax return](/tax-return) and accessing your [superannuation](/superannuation) when you are ready to leave Australia.
    `,
  },
  {
    slug: 'how-long-does-it-take-to-get-a-tfn',
    title: 'How long does it take to get a TFN in Australia?',
    description: 'Most TFN applications are processed within 28 days. Here is what to expect and what to do while you wait.',
    category: 'TFN',
    date: '15 July 2024',
    readTime: 4,
    ctaHeading: 'Apply for your TFN through us',
    ctaBody: 'We handle TFN applications for working holiday makers every day. We make sure your application is submitted correctly so there are no delays.',
    ctaLabel: 'Get started',
    ctaHref: '/tfn',
    body: `
After a TFN application is submitted, most people receive their Tax File Number within 28 days. In practice, many applicants receive it sooner, sometimes within two weeks, though this depends on the ATO's current processing times and how busy they are at any given point.

## How your TFN is delivered

Your TFN is sent to you by post as a letter to the Australian address you provided in your application. The letter contains your TFN and some basic information about how to use it. It does not arrive by email or SMS. This is why it is important to provide an address where you are confident you will still be staying when the letter arrives.

If you are moving around a lot or staying in different hostels, try to use the address of somewhere you will be for at least a month. If you miss the letter, it can be difficult to retrieve, though the ATO does have a process to help you find your TFN if you lose it.

## What to do while you are waiting

You do not need to wait for your TFN before starting work. You can begin working immediately and inform your employer that your application is in progress. Keep the confirmation email the ATO sent you as evidence. Some employers will accept this and proceed with a lower withholding rate, while others will apply the maximum rate until your TFN is on file. Either way, any excess tax withheld can be recovered through your [tax return](/tax-return) at the end of the financial year.

## What if 28 days pass and nothing arrives

If more than 28 days have passed since you submitted your application and you have not received a letter, the first step is to check that the address you provided was correct. If the address was correct, you can contact the ATO directly by phone to follow up on your application. Have your reference number from the confirmation email ready.

In most cases, delays are caused by incorrect address details or a letter that was lost in the post. The ATO can confirm whether your TFN has been issued and, if necessary, arrange for it to be sent again.

## After your TFN arrives

Once you have your TFN, provide it to your employer immediately along with a completed Tax File Number Declaration form. This is what ensures the correct 15% tax rate is applied to your wages going forward. Your TFN is also required for lodging your [tax return](/tax-return) and accessing your [superannuation](/superannuation).
    `,
  },
  {
    slug: 'can-you-start-work-without-a-tfn',
    title: 'Can you start work in Australia without a TFN?',
    description: 'Yes, you can start work without a TFN, but there are real financial consequences. Here is what you need to know before your first shift.',
    category: 'TFN',
    date: '22 July 2024',
    readTime: 4,
    ctaHeading: 'Get your TFN application in today',
    ctaBody: 'The sooner you apply, the sooner the correct tax rate applies to your wages. We handle the process for working holiday makers every day.',
    ctaLabel: 'Start your TFN application',
    ctaHref: '/tfn',
    body: `
Yes, you can legally start work in Australia without a TFN. There is no law that prevents you from being employed before you have one. However, there is a significant financial consequence that most working holiday makers do not fully appreciate until they see their first payslip.

## What happens to your tax without a TFN

When you do not have a TFN on file with your employer, Australian law requires them to withhold tax at the top marginal rate of 47%. This is not something your employer chooses to do. It is a legal requirement they must follow to remain compliant with the ATO. It applies from your very first shift until the day you provide them with your TFN and a completed Tax File Number Declaration form.

For a working holiday maker who would otherwise pay 15% tax on their earnings, this means an extra 32 cents is withheld from every dollar you earn during that period.

## Does the overpaid tax come back to you

Yes, it can. Any tax that was overpaid during the period before your TFN was registered with your employer can be reclaimed when you lodge your [tax return](/tax-return) at the end of the Australian financial year. The ATO reconciles what you actually owed against what was withheld and refunds the difference.

This means you do not permanently lose the money, but you do lose access to it for potentially several months while you wait for tax time. For backpackers working on tight budgets, that is a real inconvenience.

## The practical advice

Apply for your TFN as early as possible, ideally before you start your first job. If you are already working without one, apply immediately and inform your employer that your application is in progress. Show them the confirmation email from the ATO as evidence. Processing typically takes up to 28 days, so the sooner you apply, the less time you spend losing that extra 32%.

Once your TFN arrives, give it to your employer immediately along with a Tax File Number Declaration form. From that point forward, the correct 15% rate will apply to your wages.

## What about cash in hand work

If you are being paid cash in hand, the TFN question is handled differently. For more on how that works and the tax implications, see our guide on [cash in hand work in Australia](/guides/can-your-employer-pay-you-cash-in-hand).
    `,
  },
  {
    slug: 'what-happens-without-your-tfn',
    title: 'What happens if your employer does not have your TFN?',
    description: 'If your employer does not hold your TFN, they must withhold tax at 47%. Here is exactly what that means for your pay and how to fix it.',
    category: 'TFN',
    date: '29 July 2024',
    readTime: 4,
    ctaHeading: 'Need help with your TFN application?',
    ctaBody: 'We handle TFN applications for working holiday makers and make sure everything is submitted correctly so you can start earning at the right tax rate as soon as possible.',
    ctaLabel: 'Apply for your TFN',
    ctaHref: '/tfn',
    body: `
When your employer does not have your Tax File Number on file, Australian tax law requires them to withhold tax at the top rate of 47%. This is not discretionary. Your employer has no choice in the matter. The obligation to withhold at the highest rate applies from your very first shift and continues until you provide your TFN along with a completed Tax File Number Declaration form.

## How this affects your take-home pay

The standard working holiday maker tax rate is 15%. When your employer withholds at 47% instead, the difference comes directly out of your pocket in the short term. On weekly earnings of $1,000, that is an extra $320 per week being held back. On $1,500 per week, it is nearly $500.

Over a few weeks, that gap becomes significant. It does not mean you lose that money permanently, but it does mean you will not see it until you lodge your [tax return](/tax-return) and the ATO refunds the excess.

## What to do if this is happening to you right now

The fix is straightforward. Apply for your TFN as soon as possible if you have not already done so. Once you receive it, complete a Tax File Number Declaration form and give it to your employer immediately. From that point forward, the correct rate will apply to your wages.

If your application is still in progress, show your employer the confirmation email you received from the ATO when you submitted your application. Some employers will adjust the withholding rate once they can see the application is underway, though technically they are not required to do so.

## Will you get the overpaid tax back

Yes. The excess tax withheld during the period before your TFN was on file will be credited against your tax liability when you lodge your [annual tax return](/tax-return). The ATO calculates the difference between what you actually owed and what was withheld, and refunds that amount to your bank account. You simply need to make sure you lodge a return before the deadline, which is 31 October following the end of each financial year.

## Giving your TFN to multiple employers

If you work for more than one employer during your time in Australia, each one needs your TFN separately. Providing it to one employer does not automatically share it with the others. Submit a Tax File Number Declaration form to every employer you work for, including casual and short-term roles.
    `,
  },
  {
    slug: 'tfn-vs-abn-difference',
    title: 'TFN vs ABN - what is the difference and which one do you need?',
    description: 'A TFN and an ABN are two different things that serve different purposes. Here is how to work out which one applies to your situation.',
    category: 'TFN',
    date: '5 August 2024',
    readTime: 5,
    ctaHeading: 'Not sure what you need?',
    ctaBody: 'We help working holiday makers work out exactly what they need based on their situation, whether that is a TFN, an ABN, or both. Get in touch and we will point you in the right direction.',
    ctaLabel: 'Ask us what you need',
    ctaHref: '/contact',
    body: `
A Tax File Number and an Australian Business Number are two entirely different things that serve different purposes in the Australian tax system. Many working holiday makers confuse them or assume they need one when they actually need the other. The simplest way to understand the difference is to think about how you are being paid and what kind of work you are doing.

## What a TFN is for

A Tax File Number is your personal tax identifier. Every individual in Australia who earns income needs one, regardless of whether they are employed or self-employed. It is the number that links your income to you in the ATO's system and determines how much tax is withheld from your wages.

If you are working as an employee, meaning your employer pays you a regular wage, deducts tax before paying you, and pays superannuation on your behalf, then a TFN is what you need. This covers the vast majority of working holiday makers working in hospitality, retail, farm work as employees, warehouses, and similar roles.

## What an ABN is for

An Australian Business Number is an 11-digit number issued to businesses and sole traders. It is used when you are operating as an independent contractor rather than an employee. If you are invoicing clients for your work, setting your own hours, using your own equipment, and taking on financial risk, you are likely operating as a contractor and you will need an [ABN](/abn) to do that correctly.

ABNs are common among working holiday makers doing gig economy work, freelance work, piece-rate farm work under a labour hire arrangement, or any work where the business paying you asks you to invoice them rather than putting you on the payroll.

## Can you have both at the same time

Yes. Many working holiday makers hold both a TFN and an ABN simultaneously. Your TFN is always required because it is your personal tax identifier. You then use your ABN when invoicing for contractor work. The two numbers are used in different contexts and having both is entirely normal if your situation involves both employment and contracting.

## How to work out which one applies to you

The key question is whether the business paying you is treating you as an employee or a contractor. If they are putting you on their payroll, deducting PAYG tax from your wages, and paying superannuation on top of your wage, you are an employee and your TFN is the relevant number. If they are asking you to invoice them and you are responsible for setting aside your own tax, you need an [ABN](/abn).

If you are unsure which situation you are in, our guide on [the difference between employees and contractors in Australia](/guides/employee-vs-contractor-australia) goes into more detail.
    `,
  },
  {
    slug: 'apply-for-tfn-before-arriving',
    title: 'Can you apply for a TFN before arriving in Australia?',
    description: 'Yes, in most cases you can apply for a TFN before you land in Australia. Here is how it works and what you need.',
    category: 'TFN',
    date: '12 August 2024',
    readTime: 4,
    ctaHeading: 'Let us handle your TFN application',
    ctaBody: 'Whether you are already in Australia or still planning your trip, we can take care of your TFN application so it is one less thing to think about when you arrive.',
    ctaLabel: 'Start your TFN application',
    ctaHref: '/tfn',
    body: `
Yes, if you have already been granted your working holiday visa, you can apply for a Tax File Number before you arrive in Australia. The ATO allows foreign passport holders to submit a TFN application online as long as they have a valid visa that permits work in Australia.

## Why applying early is worth it

Applying before you arrive gives your TFN time to be processed while you are still travelling or preparing for your trip. By the time you start your first job, your TFN may already be waiting for you, which means you can give it to your employer immediately and avoid any period of higher tax withholding.

The application takes around 10 minutes and processing typically takes up to 28 days. If you apply a month before you arrive, there is a good chance your TFN will arrive around the same time you do.

## What you need to apply from overseas

You need a valid Australian working holiday visa that has already been granted, not just applied for. You also need your passport number, your visa details, and a valid Australian address where the ATO can send your TFN by post.

The address requirement is the main complication for people applying from overseas. The ATO sends your TFN as a physical letter to an Australian address. If you have already booked accommodation for your first weeks in Australia, you can use that address. A hostel address works fine as long as you can receive mail there.

If you do not yet have a confirmed Australian address, it may be easier to wait until you arrive and have somewhere to stay before submitting your application.

## What happens if your visa changes or is cancelled

If your visa situation changes between when you apply for your TFN and when you arrive in Australia, contact the ATO to update your details. Your TFN itself is permanent and does not expire even if your visa does, but the information on file with the ATO should reflect your current situation.

## After you arrive

Once you are in Australia and have started work, provide your TFN to each employer you work for along with a completed Tax File Number Declaration form. This is what triggers the correct working holiday maker tax rate on your wages. Your TFN is also what you will need later to lodge your [tax return](/tax-return) and access your [superannuation](/superannuation).
    `,
  },
  {
    slug: 'tfn-application-delayed',
    title: 'What to do if your TFN application is delayed',
    description: 'If your TFN has not arrived after 28 days, here is what to check and how to follow up with the ATO.',
    category: 'TFN',
    date: '19 August 2024',
    readTime: 4,
    ctaHeading: 'Need help sorting your TFN?',
    ctaBody: 'We deal with TFN applications every day and know how to handle delays and complications. Get in touch and we will help you work out what is going on.',
    ctaLabel: 'Get in touch',
    ctaHref: '/contact',
    body: `
Most TFN applications are processed within 28 days. If that time has passed and your letter has not arrived, there are a few things to check before contacting the ATO.

## Check your address first

The most common reason for a delayed TFN is a problem with the Australian address provided in the application. If there was a typo in the street name, postcode, or unit number, the letter may have been sent to the wrong address or returned to the ATO as undeliverable. Go back to the confirmation email you received when you submitted your application and double-check the address that was recorded.

If the address was correct and you have simply moved since submitting the application, the letter may have been delivered to your old address. In that case, contact whoever is currently at that address to see if the letter arrived there.

## Check that 28 days have actually passed

The 28-day processing window starts from the date your application was received by the ATO, not the date you submitted it. Online applications are generally received the same day, but it is worth confirming the date on your confirmation email before assuming there is a problem.

## Contact the ATO directly

If 28 days have passed, the address was correct, and no letter has arrived, contact the ATO by phone. Have your reference number from the confirmation email ready, along with your passport number and visa details. The ATO can check the status of your application and tell you whether your TFN has been issued.

If your TFN has already been issued but the letter was lost, the ATO can arrange for your TFN to be provided to you through a verified process. They will not simply read it out over the phone to an unverified caller, so be prepared to verify your identity.

## Continuing to work during the delay

While you are waiting, you can continue working. Let your employer know your TFN is on the way and show them your application confirmation email. Once your TFN is resolved, give it to your employer immediately with a completed Tax File Number Declaration form, and any overpaid tax from the waiting period can be reclaimed through your [tax return](/tax-return).
    `,
  },
  {
    slug: 'do-you-need-new-tfn-second-visa',
    title: 'Do you need a new TFN if you return to Australia on a second working holiday visa?',
    description: 'No. Your TFN is permanent and stays with you for life. Here is what you do need to do when you return.',
    category: 'TFN',
    date: '26 August 2024',
    readTime: 3,
    ctaHeading: 'Returning to Australia?',
    ctaBody: 'Whether it is your first or second working holiday, we can help you get your tax sorted quickly. TFN applications, tax returns, super, and more.',
    ctaLabel: 'Get in touch',
    ctaHref: '/contact',
    body: `
No. Your Tax File Number is permanent. It does not expire, it does not change when your visa changes, and you do not need to apply for a new one when you return to Australia on a second working holiday visa. The same TFN you were issued the first time is the one you use for every subsequent visit.

## Where to find your TFN if you cannot remember it

If you kept the original letter the ATO sent you, your TFN will be on it. You can also check any payslips, group certificates, or tax return documents from your first visit, as your TFN is usually printed on those.

If none of those options work, you can contact the ATO directly by phone and request your TFN. You will need to verify your identity using your passport details and other personal information.

## What you do need to do when you start work again

Even though your TFN is the same, you still need to provide it to each new employer you work for along with a completed Tax File Number Declaration form. Your TFN being on record with a previous employer does not carry over to a new one. Each employer needs their own declaration form on file to apply the correct tax rate to your wages.

## What about your superannuation from your first visit

If you had superannuation contributions made during your first visit and you withdrew them when you left Australia using the DASP process, that account was effectively closed. Any new super contributions from your second visit will go into a new fund. If you did not withdraw your super from your first visit, those funds may still be sitting there. See our guide on [finding lost or unclaimed super](/guides/how-to-find-lost-superannuation) for more on how to locate them.

## Lodging a tax return for your return visit

Your tax obligations work exactly the same way on your second visit. At the end of the financial year, you need to lodge a [tax return](/tax-return) with the ATO covering any income earned during that year. The same 15% working holiday maker rate applies to your earnings, provided you have provided your TFN to your employers.
    `,
  },
  {
    slug: 'how-to-find-lost-tfn',
    title: 'How to find your TFN if you have lost or forgotten it',
    description: 'Lost your TFN? There are several ways to find it without contacting the ATO. Here is where to look first.',
    category: 'TFN',
    date: '2 September 2024',
    readTime: 3,
    ctaHeading: 'Need help with your tax while you are at it?',
    ctaBody: 'If you are tracking down your TFN, you might also be thinking about your tax return or super. We help working holiday makers sort all of it in one place.',
    ctaLabel: 'Get in touch',
    ctaHref: '/contact',
    body: `
Losing track of your Tax File Number is more common than you might think, especially for working holiday makers who have been in Australia a while and moved around a lot. The good news is there are several ways to find it without too much trouble.

## Check your original TFN letter

The ATO sent your TFN to you by post when your application was approved. If you kept that letter, it will have your TFN printed on it. Check any folders, emails, or documents from when you first arrived in Australia.

## Check your payslips or payment summaries

Your TFN is often printed on payslips, payment summaries, and income statements from your Australian employers. If you have any of those documents saved, check them for your TFN.

## Check your tax return documents

If you lodged a tax return during your time in Australia, your TFN will appear on the return itself and on any correspondence from the ATO related to that return. Check any saved PDFs or printed copies of past returns.

## Contact the ATO

If none of the above options work, you can contact the ATO directly by phone and request your TFN. You will need to verify your identity, which typically means providing your full name, date of birth, address history, and passport number. The ATO will not provide your TFN to someone who cannot be verified as the account holder, so have those details ready.

Once you have your TFN again, store it somewhere secure. A password manager, a locked notes app, or a scanned copy stored in cloud storage are all good options that will save you the trouble of searching for it again in the future.
    `,
  },

  // ─── ABN ───────────────────────────────────────────────────────────────────
  {
    slug: 'what-is-an-abn',
    title: 'What is an ABN and do you need one on a working holiday visa?',
    description: 'An ABN is required if you are working as a contractor in Australia. Here is how to know if you need one and what happens if you work without one.',
    category: 'ABN',
    date: '9 September 2024',
    readTime: 5,
    ctaHeading: 'Register your ABN today',
    ctaBody: 'We handle ABN registrations for working holiday makers every day. Fully online, straightforward, and done correctly the first time.',
    ctaLabel: 'Register your ABN',
    ctaHref: '/abn',
    body: `
An Australian Business Number (ABN) is an 11-digit identifier issued to businesses and sole traders operating in Australia. It is used when you are working as an independent contractor rather than as an employee. Whether or not you need one as a working holiday maker depends entirely on how the businesses paying you have structured the arrangement.

## The difference between employment and contracting

If a business pays you a regular hourly or daily wage, deducts tax from your pay before it reaches you, and makes superannuation contributions on your behalf, you are an employee. You do not need an ABN in this situation. Your [TFN](/tfn) is the relevant number and your employer handles your tax obligations on your behalf.

If a business asks you to invoice them for your work, does not deduct tax before paying you, and does not contribute to your super, you are likely being treated as a contractor. In that case, you need an [ABN](/abn) to invoice correctly and to meet your own tax obligations.

## Why ABNs are common among working holiday makers

Certain types of work that are popular among backpackers are commonly structured as contracting arrangements rather than employment. Piece-rate fruit picking and harvest work through labour hire companies, gig economy work through platforms that operate in Australia, freelance creative or technical work, and some hospitality and cleaning roles are all examples where an ABN may be required.

## What happens if you work without an ABN when you need one

If you invoice a business without quoting an ABN, that business is required by law to withhold 47% of the payment before remitting the rest to you. This is similar to what happens when you work as an employee without a TFN. The money is not lost permanently, but you will not see it until you can sort out the administrative situation.

## How to get an ABN

ABN applications are made through the Australian Business Register website. The process is free and takes around 15 minutes. You will need your TFN, your contact details, and information about the type of work you will be doing. Most applications are processed immediately.

## Tax obligations when you have an ABN

When you are working as a sole trader with an ABN, you are responsible for setting aside your own tax. No one withholds it for you automatically. You will need to include all income earned under your ABN in your [tax return](/tax-return) at the end of the financial year. Depending on your income level, you may also need to consider registering for GST.
    `,
  },
  {
    slug: 'how-to-register-for-an-abn',
    title: 'How to register for an ABN in Australia as a backpacker',
    description: 'Registering for an ABN is free and takes around 15 minutes online. Here is exactly how to do it as a working holiday visa holder.',
    category: 'ABN',
    date: '16 September 2024',
    readTime: 4,
    ctaHeading: 'Want us to register your ABN for you?',
    ctaBody: 'We handle ABN registrations for working holiday makers and make sure everything is set up correctly. Get in touch and we will take care of it.',
    ctaLabel: 'Register your ABN with us',
    ctaHref: '/abn',
    body: `
Registering for an Australian Business Number (ABN) is straightforward and there is no government fee involved. The application is made through the Australian Business Register (ABR) website and most applications are processed on the spot or within a few days.

## What you need before you apply

You will need your Tax File Number (TFN) before you can apply for an ABN. If you do not have one yet, you will need to [apply for your TFN](/tfn) first and wait for it to arrive. You will also need your contact details, your Australian address, and a description of the business activity you will be carrying out. For most working holiday makers, this will be something like seasonal harvest work, freelance services, or gig economy work.

## The application process

Go to the ABR website and select the option to apply for a new ABN as a sole trader. Work through the form, entering your personal details, your TFN, your business activity, and the date you started or intend to start your business activities. The form is straightforward and takes around 15 minutes.

Once submitted, most applications are approved immediately and your ABN is displayed on screen. You will also receive a confirmation by email. Some applications are put into a review queue and take a few business days, but this is less common.

## Using your ABN correctly

Once you have your ABN, you need to quote it on every invoice you issue. An invoice without an ABN allows the business paying you to legally withhold 47% of the payment. Make sure every invoice you send includes your ABN, your name, the services provided, the date, and the amount.

Keep a record of all income you earn under your ABN. You are responsible for declaring it all in your [tax return](/tax-return) at the end of the financial year and for setting aside enough to cover your tax liability throughout the year.

## Cancelling your ABN when you leave

When you are finished working in Australia and no longer carrying on a business, you should cancel your ABN through the ABR website. This is a simple process and ensures the ABR's records stay accurate. See our guide on [cancelling your ABN when you leave Australia](/guides/how-to-cancel-your-abn) for more detail.
    `,
  },
  {
    slug: 'farm-work-and-abns',
    title: 'Farm work and ABNs - what you need to know before you start',
    description: 'Farm work is one of the most common reasons working holiday makers need an ABN. Here is how it works and what to watch out for.',
    category: 'ABN',
    date: '23 September 2024',
    readTime: 5,
    ctaHeading: 'Need an ABN for your farm work?',
    ctaBody: 'We help working holiday makers register for an ABN and understand their tax obligations before they start work. Get in touch and we will sort it out for you.',
    ctaLabel: 'Register your ABN',
    ctaHref: '/abn',
    body: `
Farm work is one of the most popular types of work for working holiday makers in Australia, particularly for those seeking to complete the 88 days of specified work required for a second or third visa. It is also one of the areas where the question of ABNs and employment arrangements comes up most frequently.

## Why farm work often involves an ABN

Many farms and agricultural operations do not employ pickers, packers, and harvest workers directly. Instead, they contract with labour hire companies who supply workers on a contractor basis. If you are working through a labour hire company and being asked to invoice for your hours or paid on a piece-rate basis per kilogram picked, you are likely being treated as a contractor and will need an [ABN](/abn).

In other situations, farms do employ workers directly as employees. In that case, you do not need an ABN and your [TFN](/tfn) is the relevant number. The key is to ask the farm or labour hire company directly how the arrangement is structured before you start work.

## The piece-rate arrangement

Piece-rate work is common in fruit picking, where you are paid per bin, per kilogram, or per unit picked rather than per hour. This type of arrangement is often structured as contracting work. If the arrangement requires you to have an ABN and issue invoices, then you need to register for one before you start.

Do not assume that because you are being paid per piece you automatically need an ABN. Some farms run piece-rate arrangements as employment. Ask before you assume.

## What to watch out for

Be cautious of arrangements where the farm or labour hire company is vague about whether you are an employee or a contractor, or where they pressure you to get an ABN quickly without explaining why. Sham contracting, where a business treats someone as a contractor to avoid employment obligations when they are actually an employee, is illegal in Australia. If something does not feel right about how the arrangement is being explained to you, seek advice before proceeding.

## Tax when you have an ABN for farm work

When you work under an ABN, no tax is withheld from your payments automatically. You are responsible for setting aside money to cover your tax liability and declaring all income in your [tax return](/tax-return) at the end of the financial year. Make sure you keep records of every payment you receive and every invoice you issue.
    `,
  },
  {
    slug: 'employee-vs-contractor-australia',
    title: 'What is the difference between being an employee and a contractor in Australia?',
    description: 'The distinction between employee and contractor affects your tax, your super, and your workplace rights. Here is how to tell which one you are.',
    category: 'ABN',
    date: '30 September 2024',
    readTime: 5,
    ctaHeading: 'Not sure which category you fall into?',
    ctaBody: 'We help working holiday makers understand their work situation and get their tax set up correctly whether they are employed, contracting, or doing both.',
    ctaLabel: 'Get in touch',
    ctaHref: '/contact',
    body: `
Whether you are classified as an employee or an independent contractor in Australia has significant implications for your tax obligations, your right to superannuation, and your workplace protections. The distinction is not always obvious, and it is not determined simply by what a business calls you or what you agree to. It is determined by the actual nature of the working arrangement.

## The key differences

An employee works under the direction and control of their employer. The employer tells them when to work, how to do the work, and where to do it. The employer deducts tax from wages before paying the employee, makes superannuation contributions on top of the wage, and provides entitlements such as leave. The employee uses their [TFN](/tfn) and does not need an [ABN](/abn).

A contractor operates their own business, takes on work from clients, sets their own methods, and often works for multiple clients at the same time. They invoice clients for their work, receive the full amount without tax deducted, and are responsible for setting aside their own tax. They need an [ABN](/abn) to operate correctly and are generally not entitled to super from the businesses they work for, though there are exceptions.

## How to tell which one you are

The ATO looks at several factors rather than just the label applied to the arrangement. Indicators of employment include being paid by the hour or day, being required to do the work personally, working exclusively for one business for an extended period, and having the business provide your tools and equipment.

Indicators of contracting include being paid per task or project, being free to subcontract the work to someone else, providing your own equipment, and being able to work for multiple clients at the same time.

## Why this matters for working holiday makers

If you are being treated as a contractor when the arrangement actually looks more like employment, the business may be avoiding their obligation to pay your [superannuation](/superannuation) and employment entitlements. This is called sham contracting and it is illegal. If you suspect this is happening, you can seek advice from the Fair Work Ombudsman.

On the other hand, if you genuinely are a contractor and you are not quoting your ABN on invoices, the businesses paying you will withhold 47% of every payment. Getting your classification right matters for your take-home pay and for your tax obligations at the end of the year.
    `,
  },
  {
    slug: 'can-you-have-tfn-and-abn',
    title: 'Can you have both a TFN and an ABN at the same time?',
    description: 'Yes, and many working holiday makers do. Here is how the two numbers work together and when you need both.',
    category: 'ABN',
    date: '7 October 2024',
    readTime: 3,
    ctaHeading: 'Need an ABN alongside your TFN?',
    ctaBody: 'We handle ABN registrations for working holiday makers and can help you understand how the two work together for your specific situation.',
    ctaLabel: 'Register your ABN',
    ctaHref: '/abn',
    body: `
Yes, you can absolutely hold both a Tax File Number and an Australian Business Number at the same time. In fact, you need a TFN before you can even apply for an ABN, so by definition, anyone with an ABN also has a TFN.

## How the two numbers work together

Your TFN is your personal tax identifier. It is used for your employment income, your tax return, and your superannuation. Your ABN is your business identifier. It is used when you are operating as a sole trader or contractor and invoicing clients for your work.

If you are working as an employee at one job and contracting on the side, you use your TFN for the employment income and your ABN for the contracting income. Both are declared in the same [tax return](/tax-return) at the end of the financial year.

## A common scenario for working holiday makers

Many working holiday makers end up with both. You might work in a cafe as an employee, using your TFN and being paid through the payroll, and also do some freelance photography, graphic design, or seasonal farm work as a contractor, invoicing under your ABN. This is entirely normal and legal.

## Do not use your ABN where your TFN should be used

One common mistake is quoting an ABN to an employer who should be treating you as an employee. This can create complications because the employer may then pay you without deducting tax, leaving you with a tax liability you were not expecting at the end of the year. Make sure you understand whether each work arrangement is employment or contracting before deciding which number to use.

## Tax obligations when you have both

All income from both sources must be declared in your [tax return](/tax-return). Your employer will report your employment income to the ATO through their payroll system, and you are responsible for tracking and declaring any income earned under your ABN. Keep clear records of both throughout the year so that lodging your return is straightforward.
    `,
  },
  {
    slug: 'how-to-cancel-your-abn',
    title: 'How to cancel your ABN when you leave Australia',
    description: 'If you are leaving Australia and no longer running a business, you should cancel your ABN. Here is how to do it and why it matters.',
    category: 'ABN',
    date: '14 October 2024',
    readTime: 3,
    ctaHeading: 'Leaving Australia soon?',
    ctaBody: 'We help working holiday makers wrap up their Australian tax obligations correctly before they leave, including lodging a final tax return and claiming back their super.',
    ctaLabel: 'Get everything sorted before you go',
    ctaHref: '/contact',
    body: `
When you finish working in Australia and are no longer carrying on a business or contracting activity, you should cancel your Australian Business Number (ABN). This is a simple process and helps keep the Australian Business Register accurate. It also ensures you are not left with any administrative obligations after you have left the country.

## How to cancel your ABN

Cancelling your ABN is a straightforward process that our team can handle for you. Contact us before you leave Australia and we will make sure your ABN is properly closed along with all other tax obligations.

The cancellation takes effect from the date you provide and your ABN will be listed as cancelled from that point forward.

## Why you should cancel it

Leaving an ABN active when you are no longer using it is not a major legal risk, but it can cause administrative complications. If the ABR sends correspondence to your Australian address after you have left, you may miss important notices. There is also a risk of confusion if you ever return to Australia, as you would need to reactivate the same ABN or apply for a new one depending on your circumstances.

Cancelling it cleanly when you leave keeps everything tidy.

## Before you cancel

Make sure you have lodged your [tax return](/tax-return) for any financial years in which you earned income under your ABN. If the financial year has not yet ended when you leave, you will need to lodge a return after the year closes on 30 June. This can be done from overseas and is something we help with regularly.

Also check whether you have any outstanding invoices to issue or payments to collect before cancelling. Once your ABN is cancelled, issuing invoices under it is no longer correct.

## Claiming your super before you go

If you had superannuation contributions made in connection with your contracting work, do not forget to [apply for your super back](/superannuation) using the DASP process before or after leaving Australia.
    `,
  },
  {
    slug: 'gst-and-abn-for-working-holiday-makers',
    title: 'GST and ABN - do working holiday makers need to register for GST?',
    description: 'Most working holiday makers with an ABN do not need to register for GST. Here is how to work out whether it applies to you.',
    category: 'ABN',
    date: '21 October 2024',
    readTime: 4,
    ctaHeading: 'Not sure about your GST obligations?',
    ctaBody: 'We help working holiday makers understand exactly what they need to do with their ABN and tax obligations. Get in touch and we will point you in the right direction.',
    ctaLabel: 'Ask us about GST',
    ctaHref: '/contact',
    body: `
GST, or Goods and Services Tax, is a 10% tax applied to most goods and services sold in Australia. Businesses that earn more than $75,000 per year from their business activities are required to register for GST. For the vast majority of working holiday makers, this threshold is unlikely to be reached during a single visit, which means GST registration is generally not required.

## The $75,000 threshold

The GST registration threshold is based on your annual turnover from business activities, not your total income. If you earn under $75,000 per year from your contracting or freelance work, you are not required to register for GST. You can choose to register voluntarily, but there is rarely a good reason to do so at income levels typical of working holiday makers.

## What happens if you are not registered for GST

If you are not registered for GST, you simply do not charge it on your invoices and you do not need to lodge BAS (Business Activity Statements) with the ATO. Your tax obligations are limited to declaring your income in your [annual tax return](/tax-return) and paying income tax on your net earnings.

## When GST might apply

If you are doing high-volume contracting work that pushes your earnings toward or above $75,000 in a year, you will need to register for GST. In that case, you add 10% to your invoices, collect it from your clients, and remit it to the ATO quarterly through a BAS.

Rideshare and food delivery drivers who use platforms operating in Australia are an exception. These drivers are required to register for GST regardless of their income level, even if they earn well under the $75,000 threshold. If you are doing rideshare or delivery work, check the specific rules that apply to your platform.

## Your main tax obligation as a contractor

For most working holiday makers with an [ABN](/abn), the primary tax obligation is straightforward. Keep records of your income throughout the year, set aside enough to cover your income tax, and declare everything in your [tax return](/tax-return) at the end of the financial year. GST is an additional layer that most will not need to think about.
    `,
  },

  // ─── TAX RETURN ────────────────────────────────────────────────────────────
  {
    slug: 'how-does-australian-tax-year-work',
    title: 'How does the Australian tax year work for working holiday makers?',
    description: 'The Australian financial year runs from 1 July to 30 June. Here is what that means for your tax return and when you need to lodge it.',
    category: 'Tax Return',
    date: '28 October 2024',
    readTime: 5,
    ctaHeading: 'Ready to lodge your tax return?',
    ctaBody: 'We handle Australian tax returns for working holiday makers from anywhere in the world. Get in touch and we will take care of the whole process for you.',
    ctaLabel: 'Start your tax return',
    ctaHref: '/tax-return',
    body: `
Australia's financial year runs from 1 July to 30 June. This is different from the calendar year and different from the tax year used in most European countries, which can catch working holiday makers off guard when they first arrive.

## What the financial year means for you

Every income you earn between 1 July and 30 June of the following year is assessed together as one financial year's worth of earnings. If you arrived in Australia in October 2024 and worked through to April 2025, all of that income falls within the 2024-25 financial year, which runs from 1 July 2024 to 30 June 2025.

At the end of each financial year, you are required to lodge a tax return with the ATO declaring all income earned during that period. The ATO then calculates your actual tax liability for the year and compares it to what was already withheld from your wages. If more was withheld than you owed, the difference is refunded to you. If less was withheld, you will owe the difference.

## When the tax return deadline is

The deadline for lodging a tax return is 31 October following the end of the financial year. So for the 2024-25 financial year, which ends on 30 June 2025, the deadline to lodge your return is 31 October 2025.

If you are using a [registered tax agent](/guides/what-is-a-tax-agent) to lodge your return, you may be entitled to a later deadline. Tax agents have extended lodgment dates for their clients, which can give you additional time if you need it.

## What if you left Australia before 30 June

If you left Australia before the end of the financial year, you are still required to lodge a tax return covering the income you earned during that year. The good news is that the return can be lodged online from anywhere in the world, so being back in your home country is no barrier. You can also appoint a tax agent to lodge on your behalf while you are overseas.

## What you need to lodge your return

You will need your income statements from each employer you worked for, your TFN, and an Australian bank account for any refund to be paid into. If you no longer have an Australian bank account, there are ways to arrange the refund, which your tax agent can help with. See our guide on [lodging a tax return from overseas](/guides/how-to-lodge-tax-return-from-overseas) for more detail.
    `,
  },
  {
    slug: 'backpacker-tax-rate-australia',
    title: 'What is the backpacker tax rate in Australia and how does it work?',
    description: 'Working holiday makers pay a flat 15% tax rate on their Australian earnings. Here is exactly how it works and what it means for your take-home pay.',
    category: 'Tax Return',
    date: '4 November 2024',
    readTime: 5,
    ctaHeading: 'Want to make sure you are being taxed correctly?',
    ctaBody: 'We check working holiday makers tax situations every day and make sure the right rate is being applied. Get in touch and we will take a look.',
    ctaLabel: 'Check your tax situation',
    ctaHref: '/tax-return',
    body: `
Working holiday makers in Australia pay a flat tax rate of 15% on all income earned up to $45,000 per year. This is known as the backpacker tax or the working holiday maker tax rate and it applies specifically to people holding a Working Holiday Visa (subclass 417) or a Work and Holiday Visa (subclass 462).

## How the 15% rate works in practice

The 15% rate is a flat rate, which means every dollar you earn is taxed at the same rate up to $45,000. You do not receive a tax-free threshold the way Australian residents do. Australian residents can earn up to $18,200 before paying any income tax, but that threshold does not apply to working holiday makers. Your first dollar of earnings is taxed at 15%, as is your last.

On weekly earnings of $1,000, this means $150 is withheld and $850 reaches your account. On $1,500 per week, $225 is withheld. These are straightforward calculations because the flat rate removes the complexity of different tax brackets applying to different slices of income.

## What if you earn more than $45,000

Earnings above $45,000 are taxed at 32.5% up to $120,000, and higher rates apply above that. Very few working holiday makers reach these income levels during a single visit, but it is worth knowing if you are planning an extended stay with high-paying work.

## Qualifying for the 15% rate

To have the 15% rate applied, you must have registered your [TFN](/tfn) with your employer and completed a Tax File Number Declaration form indicating that you are a working holiday maker. Without this, your employer will withhold at 47%. You also need to be working for an employer who has registered with the ATO as an employer of working holiday makers. Registered employers are required to apply the correct rate.

## Does anything come back through the tax return

The 15% rate is a flat tax and there is generally no automatic refund for working holiday makers the way there sometimes is for residents. However, if your employer withheld too much for any reason, for example if they used the wrong rate during a period before your TFN was on file, then yes, a [tax return](/tax-return) will result in a refund of the overpaid amount.
    `,
  },
  {
    slug: 'how-to-lodge-tax-return-working-holiday',
    title: 'How to lodge a tax return in Australia as a working holiday maker',
    description: 'Lodging an Australian tax return is simpler than it sounds. Here is a step-by-step guide to the whole process.',
    category: 'Tax Return',
    date: '11 November 2024',
    readTime: 6,
    ctaHeading: 'Let us lodge your tax return for you',
    ctaBody: 'We handle Australian tax returns for working holiday makers every day. We take care of the whole process and make sure everything is correct before we lodge.',
    ctaLabel: 'Start your tax return',
    ctaHref: '/tax-return',
    body: `
Lodging an Australian tax return as a working holiday maker is a requirement if you earned income in Australia during the financial year. The financial year runs from 1 July to 30 June and the deadline to lodge your return is 31 October. If you use a registered tax agent, you may qualify for a later deadline.

## What you need before you start

You will need your Tax File Number, your income statements from all employers you worked for during the year, and the details of an Australian bank account for any refund. A registered tax agent can access your income statements directly and prepare everything on your behalf.

If you have already left Australia, a registered tax agent can lodge on your behalf from anywhere in the world.

## The three ways to lodge

The second option is to use a registered tax agent. A tax agent handles the preparation and lodgment on your behalf, which is particularly useful if you had multiple employers, worked as both an employee and a contractor, or are not sure whether your income has been reported correctly. Using an agent also comes with an extended lodgment deadline.

The third option is to use an online tax service that connects directly to the ATO on your behalf, which is similar to using a tax agent but often faster.

## What happens after you lodge

The ATO processes your return and calculates whether the tax withheld from your wages throughout the year matches your actual tax liability. If more was withheld than you owed, the difference is refunded to your nominated Australian bank account, usually within two weeks of lodgment. If you owe more than was withheld, you will receive a notice with a payment deadline.

## What if you worked for multiple employers

If you worked for more than one employer during the year, all of their income reports need to be included in your return. A registered tax agent will gather all of these and make sure nothing is missed.
    `,
  },
  {
    slug: 'what-is-payg-payment-summary',
    title: 'What is a PAYG payment summary and how do you use it?',
    description: 'A PAYG payment summary shows your total earnings and tax withheld for the year. Here is what it is and how to access yours.',
    category: 'Tax Return',
    date: '18 November 2024',
    readTime: 4,
    ctaHeading: 'Need help with your tax return?',
    ctaBody: 'We help working holiday makers lodge their Australian tax returns correctly, including making sure all income and withholding amounts are accurate.',
    ctaLabel: 'Start your tax return',
    ctaHref: '/tax-return',
    body: `
A PAYG payment summary, now more commonly referred to as an income statement, is a document that shows the total wages you were paid by an employer during the financial year and the total amount of tax that was withheld from those wages. It is the key document you need to lodge your [tax return](/tax-return).

## How income statements work now

Employers now report wages and withholding amounts directly to the ATO through their payroll software throughout the year. This information is recorded in the ATO system and is accessible to registered tax agents who can use it to prepare your return.

## How to access your income statement

Your registered tax agent can access your income statements directly through the ATO system and will wait until all employer reports are finalised before lodging your return.

If you had multiple employers, each one will appear separately. Make sure you review all of them.

## What if an employer has not submitted their report

If a financial year has ended and your income statement is still showing as in progress well after lodgment season has opened, it may mean your employer has not yet finalised their payroll reporting. Contact your employer and ask them to finalise it. If they are unresponsive, you can contact the ATO for assistance.

## Using your income statement to lodge

When your return is prepared by a registered tax agent, they will cross-check your income statements against your own payslip records and flag any discrepancies before lodging.
    `,
  },
  {
    slug: 'tax-deductions-working-holiday-makers',
    title: 'What tax deductions can working holiday makers claim in Australia?',
    description: 'Working holiday makers can claim work-related deductions just like any other worker. Here is what qualifies and what does not.',
    category: 'Tax Return',
    date: '25 November 2024',
    readTime: 5,
    ctaHeading: 'Make sure you claim everything you are entitled to',
    ctaBody: 'We review your situation carefully before lodging your return to make sure all eligible deductions are included. Get in touch and we will take a look.',
    ctaLabel: 'Start your tax return',
    ctaHref: '/tax-return',
    body: `
Working holiday makers in Australia can claim work-related deductions on their tax return, just like Australian residents can. The same rules apply regardless of your visa status. If you spent money to earn income and the expense was directly related to your work, it may be deductible.

## Work-related clothing and uniforms

If your employer required you to wear a specific uniform, protective clothing, or safety gear that you paid for yourself, that cost is generally deductible. Generic clothing, including black pants and white shirts commonly worn in hospitality, is not deductible even if you wear it only for work. The clothing must be specific to the job.

## Tools and equipment

If you purchased tools or equipment that you used to earn income, such as a knife roll for kitchen work or safety boots for construction, the cost may be deductible. Items under a certain threshold can be claimed in full in the year of purchase. Larger items need to be depreciated over time.

## Travel expenses

Travel between different work locations on the same day can be deductible. Travel between your home and your regular workplace is generally not deductible, as this is considered private travel. However, if you have an unusual work arrangement, such as having to carry heavy equipment to work, there may be exceptions worth exploring.

## Phone and internet

If you used your personal phone or internet connection for work purposes, such as communicating with employers, checking rosters, or doing administrative tasks related to your [ABN](/abn) contracting work, a portion of the cost may be deductible. You will need to estimate the work-related percentage based on your actual usage.

## What you cannot deduct

Personal expenses, meals unless you are travelling away from home overnight for work, and costs that were reimbursed by your employer are not deductible. You also cannot deduct the cost of getting to and from your regular workplace.

## Keeping records

The ATO requires you to have records for any deduction you claim. Receipts, bank statements, and diary notes are all acceptable. Without records, you cannot claim the deduction even if the expense was genuinely work-related.
    `,
  },
  {
    slug: 'do-you-need-to-lodge-tax-return-short-stay',
    title: 'Do you need to lodge a tax return if you only worked for a short time in Australia?',
    description: 'Even if you only worked for a few weeks, you may be required to lodge a tax return. Here is how to work out whether you need to.',
    category: 'Tax Return',
    date: '2 December 2024',
    readTime: 4,
    ctaHeading: 'Not sure if you need to lodge?',
    ctaBody: 'We help working holiday makers work out whether they need to lodge a return and take care of the process if they do. Get in touch and we will give you a straight answer.',
    ctaLabel: 'Ask us if you need to lodge',
    ctaHref: '/contact',
    body: `
Whether you need to lodge a tax return in Australia does not depend on how long you were there. It depends on whether you earned income during the Australian financial year and how much tax was withheld relative to what you actually owe.

## The general rule

If you earned any income in Australia during a financial year, you are generally required to lodge a tax return for that year. This applies whether you worked for two weeks or two years. The ATO uses the return to calculate your actual tax liability and to reconcile it against what your employer withheld from your wages.

## When you might not need to lodge

There are limited circumstances where you do not need to lodge. If your only Australian income was from interest or dividends under a certain threshold, and the correct withholding tax was applied, you may not be required to lodge. However, for working holiday makers earning wages, the requirement to lodge almost always applies.

## Why lodging is worth it even when you are unsure

Even if you are not strictly required to lodge, doing so may result in a refund. If your employer withheld at the highest rate for any period because you did not have your [TFN](/tfn) on file, or if there were other errors in your withholding, a tax return is how you get that money back. Not lodging means leaving it with the ATO.

## Lodging for a short stay from overseas

If you have already left Australia, you can still lodge your return. A registered tax agent can submit it on your behalf from anywhere in the world. You will need your TFN, your income statements, and an Australian bank account or an arrangement for payment of any refund.

The deadline to lodge is 31 October following the end of the financial year. Using a registered tax agent may give you additional time beyond that deadline.
    `,
  },
  {
    slug: 'how-to-lodge-tax-return-from-overseas',
    title: 'How to lodge an Australian tax return from overseas after you leave',
    description: 'Leaving Australia does not mean you can skip your tax return. Here is how to lodge from anywhere in the world.',
    category: 'Tax Return',
    date: '9 December 2024',
    readTime: 5,
    ctaHeading: 'Lodge your Australian tax return from wherever you are',
    ctaBody: 'We lodge Australian tax returns for working holiday makers from all over the world. Send us your details and we handle everything remotely.',
    ctaLabel: 'Lodge your return with us',
    ctaHref: '/tax-return',
    body: `
Leaving Australia does not end your tax obligations there. If you earned income in Australia during the financial year, you are required to lodge a tax return regardless of whether you are still in the country. The good news is that the entire process can be done online from anywhere in the world.

## Your options for lodging from overseas

The second and generally easier option is to appoint a registered tax agent to lodge on your behalf. You provide the agent with your details and they take care of the preparation and lodgment from their end. This means you do not need to navigate the ATO's online systems yourself, and you also benefit from the extended lodgment deadline that tax agents receive.

## What you need regardless of the method

You need your Tax File Number, your income statements from all Australian employers, and details of an Australian bank account for any refund. If you have closed your Australian bank account, speak to your tax agent about alternative arrangements. Some agents can assist with redirecting refunds through other means.

## The deadline

The standard deadline to lodge is 31 October following the end of the financial year. For the 2024-25 year, which ends 30 June 2025, the deadline is 31 October 2025. Registered tax agents have extended deadlines for their clients, so using an agent gives you more time if needed.

## What happens to your refund

If tax was overpaid during the year, the ATO will refund the difference to your nominated bank account. If you still have an Australian account open, the refund arrives there, usually within two weeks of the return being processed. If you need the refund sent elsewhere, your agent can advise on options.
    `,
  },
  {
    slug: 'what-is-a-tax-agent',
    title: 'What is a tax agent and why should working holiday makers use one?',
    description: 'A registered tax agent prepares and lodges tax returns on your behalf. Here is what they do and why using one makes sense for working holiday makers.',
    category: 'Tax Return',
    date: '16 December 2024',
    readTime: 4,
    ctaHeading: 'Work with a registered tax agent',
    ctaBody: 'We are supervised by a registered tax agent and handle Australian tax returns for working holiday makers from around the world. Get in touch and we will take care of your return.',
    ctaLabel: 'Start your tax return',
    ctaHref: '/tax-return',
    body: `
A registered tax agent is a professional who is authorised by the Tax Practitioners Board (TPB) to prepare and lodge tax returns on behalf of clients. In Australia, tax agents must meet qualification and experience requirements and maintain their registration through continuing professional development. The TPB maintains a public register of all registered tax agents so you can verify anyone you are considering working with.

## What a tax agent does for you

A tax agent reviews your income and circumstances, identifies any deductions or offsets you are entitled to, prepares your return, and lodges it with the ATO on your behalf. They handle the communication with the ATO and can respond to any queries or issues that arise after lodgment. If you are audited or the ATO raises questions about your return, your agent manages that process.

## Why working holiday makers benefit from using one

For working holiday makers, there are several reasons to use a registered tax agent rather than lodging yourself. If you had multiple employers during the year, your income picture is more complex and the risk of making errors is higher. If you are lodging from overseas after leaving Australia, navigating the ATO's online systems without Australian residency can be complicated. If you are unsure what deductions you are entitled to, an agent will identify things you might have missed.

There is also the extended lodgment deadline. When you lodge through a registered tax agent, you benefit from the agent's extended deadline, which gives you more time beyond the standard 31 October cutoff.

## How to verify a tax agent is legitimate

Check the TPB's public register at tpb.gov.au before engaging anyone to lodge your return. The register shows whether a person or company is currently registered, what their registration covers, and any disciplinary history. You should never use someone who claims to be a tax agent but cannot provide a TPB registration number.

We operate under the supervision of a registered tax agent. Our details are listed on the TPB register and available on request.
    `,
  },
  {
    slug: 'how-does-payg-withholding-work',
    title: 'How does PAYG withholding work in Australia?',
    description: 'PAYG withholding is how your employer collects tax from your wages before paying you. Here is how the system works.',
    category: 'Tax Return',
    date: '23 December 2024',
    readTime: 4,
    ctaHeading: 'Want to make sure your withholding is correct?',
    ctaBody: 'We check working holiday makers tax situations and make sure the right amount has been withheld. If there is an error, we sort it out through your tax return.',
    ctaLabel: 'Check your tax situation',
    ctaHref: '/tax-return',
    body: `
PAYG stands for Pay As You Go. PAYG withholding is the system by which employers in Australia deduct income tax from their employees wages before paying them, and then remit those amounts to the ATO on the employee's behalf. It is essentially a prepayment of your annual tax liability, collected gradually throughout the year rather than in one lump sum at tax time.

## How it works for working holiday makers

When you provide your [TFN](/tfn) and a Tax File Number Declaration form to your employer, your employer uses that information to determine what rate to apply to your wages. For working holiday visa holders, the correct rate is 15% on income up to $45,000 per year. Your employer deducts this amount from each pay, keeps a record of it, and periodically remits it to the ATO.

If you do not provide your TFN and declaration form, your employer must withhold at the highest rate of 47%. The excess is then reconciled at the end of the year through your [tax return](/tax-return).

## What appears on your payslip

Your payslip should show your gross earnings for the pay period, the amount of tax withheld, and your net pay which is the amount that actually reaches your bank account. Check your payslip carefully to make sure the withholding rate looks correct. If 47% is being taken out when you have provided your TFN, raise it with your employer immediately.

## How it connects to your tax return

At the end of the financial year, your employer finalises their payroll reporting and reports the total wages paid to you and the total tax withheld to the ATO. This information is recorded in the ATO system. When you lodge your tax return, the ATO compares your actual tax liability for the year against the total withheld through PAYG. Any difference is either refunded to you or collected from you depending on whether too much or too little was withheld.
    `,
  },
  {
    slug: 'australian-financial-year-dates',
    title: 'What is the Australian financial year and when does it start and end?',
    description: 'Australia uses a financial year that runs from 1 July to 30 June, not the calendar year. Here is what that means for your tax.',
    category: 'Tax Return',
    date: '30 December 2024',
    readTime: 3,
    ctaHeading: 'Ready to lodge for this financial year?',
    ctaBody: 'We handle Australian tax returns for working holiday makers wherever they are in the world. Get in touch and we will take care of everything.',
    ctaLabel: 'Start your tax return',
    ctaHref: '/tax-return',
    body: `
Australia's financial year runs from 1 July to 30 June of the following calendar year. This is different from the calendar year (1 January to 31 December) and different from the tax year used in many other countries. Understanding these dates is important for knowing when you need to lodge your tax return and which income falls into which year.

## How financial years are named

Australian financial years are named using both years they span. The year running from 1 July 2024 to 30 June 2025 is called the 2024-25 financial year. The year from 1 July 2025 to 30 June 2026 is the 2025-26 financial year. When someone refers to the current tax year, they mean whichever financial year is currently in progress.

## Why it matters for working holiday makers

If you arrive in Australia in, say, November 2024 and work through to May 2025, all of your income from that period falls within the 2024-25 financial year. You would lodge a tax return for that year after 30 June 2025, with a deadline of 31 October 2025.

If you arrived in May 2024 and left in August 2024, your income spans two financial years. The income earned before 30 June 2024 falls into the 2023-24 year and the income earned from 1 July 2024 onwards falls into the 2024-25 year. You would need to lodge a separate return for each year.

## Key dates to remember

The financial year ends on 30 June each year. The tax return lodgment window opens on 1 July. The standard deadline to lodge is 31 October. If you use a registered tax agent, you may qualify for an extended deadline beyond 31 October.

Superannuation guarantee contributions for the current quarter must be paid by employers within 28 days of the end of each quarter, with the final quarter deadline being 28 July. This is relevant if you are checking that your employer has paid your [superannuation](/superannuation) correctly.
    `,
  },
  {
    slug: 'cash-in-hand-tax-return',
    title: 'Can you lodge a tax return if you worked cash in hand in Australia?',
    description: 'Working cash in hand does not exempt you from your tax obligations. Here is what you need to declare and how to handle it.',
    category: 'Tax Return',
    date: '6 January 2025',
    readTime: 4,
    ctaHeading: 'Had cash in hand work? We can help.',
    ctaBody: 'We help working holiday makers handle tax returns that involve cash in hand income. Get in touch and we will guide you through what needs to be declared.',
    ctaLabel: 'Get in touch',
    ctaHref: '/contact',
    body: `
Yes, you can and must lodge a tax return if you worked cash in hand in Australia. Cash in hand payments do not exempt you from your tax obligations. All income earned in Australia is taxable, regardless of the form in which it was received. Failing to declare cash income is tax evasion, which carries serious penalties.

## What cash in hand work means for your tax

When you work cash in hand, your employer typically does not deduct tax from your payment before giving it to you. This means no PAYG withholding has occurred. The full responsibility for paying tax on that income falls on you, and the way you do that is by declaring it in your [tax return](/tax-return) at the end of the financial year.

## What records you should keep

Even when being paid in cash, you should keep your own records. Note the dates you worked, the hours, the rate of pay, and the amounts received. If the employer pays you weekly, keep a record of each payment. If you have text messages, emails, or roster notifications that confirm you worked and what you were paid, keep those too. These records are what allow you to accurately declare your income and defend the amount if the ATO ever asks questions.

## What about superannuation for cash in hand work

If you were employed (not contracting) and were paid cash in hand, your employer was still required to pay [superannuation](/superannuation) on top of your wages at the 11.5% rate. Many employers who pay cash in hand do not do this. While it is difficult to chase up after the fact, it is worth knowing your rights. The Fair Work Ombudsman and the ATO both have processes for reporting employers who fail to meet their super obligations.

## What if you were not given a payslip

Working without payslips is common in cash in hand arrangements. This makes it harder to verify exactly what you were paid, which is why keeping your own records throughout is so important. If you are unsure of the exact figures, use your best estimate and be consistent. An honest return with slightly imprecise figures is far better than not lodging at all.
    `,
  },

  // ─── SUPER ─────────────────────────────────────────────────────────────────
  {
    slug: 'what-is-superannuation',
    title: 'What is superannuation and are working holiday makers eligible?',
    description: 'Superannuation is Australia\'s compulsory retirement savings system. Working holiday makers are eligible and can claim it back when they leave.',
    category: 'Super',
    date: '13 January 2025',
    readTime: 5,
    ctaHeading: 'Ready to claim your super back?',
    ctaBody: 'We help working holiday makers apply for their superannuation through the DASP process. Get in touch and we will take care of the whole application.',
    ctaLabel: 'Claim your super',
    ctaHref: '/superannuation',
    body: `
Superannuation, commonly called super, is Australia's compulsory retirement savings system. Employers are required to contribute a percentage of their employees' wages into a superannuation fund on top of the wages themselves. These contributions grow over time in a fund that is designed to provide retirement income.

For working holiday makers, super works slightly differently because you are unlikely to retire in Australia. The good news is that you can claim your accumulated superannuation back after you permanently leave Australia using a process called DASP.

## How much super your employer contributes

As of 1 July 2024, employers are required to contribute 11.5% of your ordinary time earnings into a superannuation fund. This rises to 12% from 1 July 2025. This contribution is paid on top of your wages. It is not deducted from your pay. If you earn $1,000 in a week, your employer also pays $115 (or $120 from July 2025) into your super fund on top of that.

## Which super fund your contributions go into

When you start a new job, your employer will ask you which super fund you want to use. If you do not nominate one, your employer will use their default fund or your stapled fund if you already have one from a previous job in Australia. It does not matter much which fund your money goes into as a working holiday maker, since you will be withdrawing it when you leave. What matters is that you can find and access the account when you are ready to claim.

## Are all working holiday makers eligible

Yes, as long as you were employed by an Australian employer who was required to pay super on your behalf. Employers must pay super for employees who are 18 or older and earn at least $450 in a calendar month. That threshold was removed in 2022, so now super must be paid from the first dollar of earnings regardless of the amount. If you worked as a contractor under an [ABN](/abn), super obligations depend on the specifics of your arrangement.

## How to claim your super back

The process for claiming superannuation after leaving Australia is called DASP, which stands for Departing Australia Superannuation Payment. See our detailed guide on [how the DASP process works](/guides/what-is-dasp-super-withdrawal) for a step-by-step explanation.
    `,
  },
  {
    slug: 'how-much-super-should-employer-pay',
    title: 'How much super should your employer be paying you?',
    description: 'From 1 July 2024, employers must contribute 11.5% of your earnings to your super fund. Here is how to check you are getting what you are owed.',
    category: 'Super',
    date: '20 January 2025',
    readTime: 4,
    ctaHeading: 'Not sure if your super is being paid correctly?',
    ctaBody: 'We help working holiday makers check their super situation and make sure they receive everything they are entitled to. Get in touch and we will take a look.',
    ctaLabel: 'Check your super',
    ctaHref: '/superannuation',
    body: `
From 1 July 2024, Australian employers are required to contribute 11.5% of an employee's ordinary time earnings into their superannuation fund. This rate is legislated to increase to 12% from 1 July 2025 as part of a schedule to reach 12% and stay there. Understanding this rate matters because super is paid in addition to your wages, not deducted from them, and many working holiday makers do not realise they are entitled to it.

## What counts as ordinary time earnings

Ordinary time earnings include your regular wages for ordinary hours of work. They generally also include certain allowances and loadings. Overtime payments are not always included, though the rules can be complex depending on your award or agreement. In most practical situations for working holiday makers working standard shifts, the 11.5% applies to the core of what you are paid.

## How to check your super is being paid

The most reliable way to check is to contact your super fund directly. Each contribution your employer makes should appear in your account with a date and amount.

If you are unsure which fund holds your super or need help tracking contributions, our team can assist.

## What if your employer is not paying

If you believe your employer has not been paying super or has been paying less than the required rate, you can report it to the ATO. The ATO has a process for investigating unpaid super, known as the Superannuation Guarantee, and can pursue employers who fail to meet their obligations. You can also contact the Fair Work Ombudsman.

Keep records of your employment, including your payslips, your employment start and end dates, and your approximate earnings. This information is what supports a super underpayment complaint.
    `,
  },
  {
    slug: 'what-is-dasp-super-withdrawal',
    title: 'What is DASP and how does the super withdrawal process work?',
    description: 'DASP stands for Departing Australia Superannuation Payment. It is the official process for claiming your super back after you leave Australia.',
    category: 'Super',
    date: '27 January 2025',
    readTime: 5,
    ctaHeading: 'Ready to apply for your DASP?',
    ctaBody: 'We help working holiday makers through the DASP application process from start to finish. Get in touch and we will handle it for you.',
    ctaLabel: 'Claim your super back',
    ctaHref: '/superannuation',
    body: `
DASP stands for Departing Australia Superannuation Payment. It is the formal process through which temporary residents, including working holiday visa holders, can withdraw their accumulated superannuation after leaving Australia permanently. It is available to anyone who held a temporary visa, has left Australia, and has no intention of returning as a permanent resident or citizen.

## Who can apply for DASP

To apply, you must have held a temporary Australian visa (which includes working holiday visas subclass 417 and 462), have left Australia, and have had your visa expire or be cancelled after leaving. You cannot apply while you are still inside Australia on a valid working holiday visa in most circumstances.

## How to apply

To apply for DASP, you will need your TFN, your super fund details including the fund name and member number, your visa information, and a bank account to receive the payment. Our team handles the entire application process for you.

If you had super in multiple funds, you need to apply for each one separately or consolidate them into one fund before applying. Consolidating first makes the process simpler.

## How long does DASP take

Most DASP applications are processed within 28 days. Some applications take longer if additional information is required or if there are complications with the fund verifying your details. The ATO will notify you of the outcome and arrange payment once the application is approved.

## How much will you receive

The amount you receive depends on how much was contributed to your fund and how long it has been invested. Be aware that a withholding tax applies to DASP payments for working holiday makers. See our guide on [what tax is taken from your DASP](/guides/tax-on-super-withdrawal-backpacker) for a full explanation of the rate and how it is calculated.
    `,
  },
  {
    slug: 'how-to-apply-for-super-back',
    title: 'How to apply for your superannuation back after leaving Australia',
    description: 'A step-by-step guide to the DASP application process, from finding your super funds to receiving the payment in your account.',
    category: 'Super',
    date: '3 February 2025',
    readTime: 6,
    ctaHeading: 'Let us handle your DASP application',
    ctaBody: 'We manage DASP applications for working holiday makers every day. Get in touch and we will take care of the whole process so you get your super back without the hassle.',
    ctaLabel: 'Claim your super with us',
    ctaHref: '/superannuation',
    body: `
Applying for your superannuation back through the DASP process involves a few steps, but it is entirely manageable once you know what is needed. Here is how to go through it from start to finish.

## Step one: Find all your super funds

Before applying, you need to know which fund or funds hold your super. If you worked for multiple employers, contributions may be spread across different funds. Our team can identify all your super accounts and make sure your DASP application covers every dollar you are owed.

If you find multiple accounts, you can either apply for each one separately through DASP or consolidate them into a single fund before applying. Consolidating first simplifies the process because you only need to submit one application.

## Step two: Gather your documents

You will need your TFN, your passport details, your visa grant and expiry dates, your super fund name and member number, and a bank account in the country where you want the funds to be paid. The account does not need to be an Australian account. International transfers are standard for DASP payments.

## Step three: Submit your application

Our team manages the entire DASP application process, including separate applications for each fund if you have multiple accounts.

Once submitted, you will receive a reference number. The ATO sends your application to your super fund, which then verifies the details and processes the payment. This typically takes up to 28 days.

## Step four: Receive your payment

Once processed, the super fund pays the amount directly to the bank account you nominated, after deducting the applicable withholding tax. The withholding tax rate for working holiday makers is currently 65% of the taxable component. See our guide on [tax on super withdrawals](/guides/tax-on-super-withdrawal-backpacker) for a full breakdown of how this is calculated.

## What if you cannot find some of your super

If you believe super was paid on your behalf but you cannot locate the fund, see our guide on [finding lost superannuation](/guides/how-to-find-lost-superannuation). Our team can help track down every account before your DASP application is submitted.
    `,
  },
  {
    slug: 'how-long-does-dasp-take',
    title: 'How long does a DASP application take to process?',
    description: 'Most DASP applications are processed within 28 days. Here is what affects the timeline and what to do if yours is taking longer.',
    category: 'Super',
    date: '10 February 2025',
    readTime: 4,
    ctaHeading: 'Want us to manage your DASP application?',
    ctaBody: 'We handle DASP applications for working holiday makers and keep track of the process so you do not have to. Get in touch and we will take it from here.',
    ctaLabel: 'Get started',
    ctaHref: '/superannuation',
    body: `
Most DASP applications are processed and paid within 28 days of submission. In many cases, the process is faster, particularly if your details are straightforward and your super fund has all the information they need to verify your identity and membership.

## What happens after you submit

Once a DASP application is submitted, the ATO verifies your visa and residency information and then forwards the application to your super fund. The fund then processes it from their end, verifying your membership details and calculating the payable amount. Once both sides have completed their checks, the payment is released to the bank account you nominated.

## What can cause delays

The most common causes of delay are discrepancies in your personal details. If the name on your application does not exactly match the name the super fund holds on record, or if your address or date of birth is recorded differently, the fund may need to contact you to clarify. Make sure all the details you enter in your application match what your employer submitted to the fund when they set up your account.

Another common cause of delay is applying before your visa has expired or been cancelled. DASP applications submitted while a valid working holiday visa is still active will generally be rejected. Make sure you apply after your visa has expired.

## What to do if 28 days have passed

If more than 28 days have passed since you submitted and you have not received payment or heard from the ATO, contact the ATO directly with your application reference number. They can check the status and identify where the application is in the process. If the delay is on the fund's side, the ATO can follow up on your behalf.

## Applying for multiple funds

If you had super in more than one fund and have applied for each separately, the timelines for each application are independent. One may be processed faster than another depending on the fund. Keep track of each reference number separately.
    `,
  },
  {
    slug: 'tax-on-super-withdrawal-backpacker',
    title: 'What tax is taken from your super when you withdraw it as a backpacker?',
    description: 'A 65% withholding tax applies to DASP payments for working holiday makers. Here is how it works and what it means for your payout.',
    category: 'Super',
    date: '17 February 2025',
    readTime: 4,
    ctaHeading: 'Want to understand your super entitlements?',
    ctaBody: 'We explain your super situation clearly and help you through the DASP process so you get everything you are entitled to. Get in touch and we will take a look.',
    ctaLabel: 'Talk to us about your super',
    ctaHref: '/superannuation',
    body: `
When working holiday makers withdraw their superannuation through the DASP process, a withholding tax of 65% applies to the taxable component of the payment. This is the tax rate that applies specifically to holders of working holiday visas (subclass 417 and 462) and is higher than the rate that applies to other temporary visa holders.

## What the taxable component is

Most super payments consist of two components: a taxable component and a tax-free component. The taxable component includes employer contributions and the earnings on those contributions. For most working holiday makers, the majority of the super balance is taxable. The tax-free component, if any, passes through without withholding.

## What 65% means in practice

If your super fund holds $2,000 and it is all in the taxable component, you will receive $700 after the 65% withholding tax. If your balance is $5,000, you will receive $1,750. The withholding tax is substantial, but the remaining amount is still money that was contributed on your behalf as part of your employment and would otherwise sit unclaimed in the fund.

## Why the rate is higher for working holiday makers

The 65% rate was introduced specifically for working holiday visa holders as part of the backpacker tax changes that came into effect in January 2017. The government's view is that this rate is appropriate given the concessional tax treatment working holiday makers already receive on their income through the 15% working holiday maker tax rate.

## Is there any way to reduce the tax

For most working holiday makers, the 65% rate is fixed and cannot be reduced through the standard DASP process. The tax is withheld by the fund before the payment is made, so you receive the net amount directly. There is no mechanism to lodge a return to claim any of the withholding back in most cases.

Make sure you claim your super rather than leaving it unclaimed. Even after the withholding tax, the amount you receive is money that was earned as part of your employment in Australia.
    `,
  },
  {
    slug: 'what-happens-to-unclaimed-super',
    title: 'What happens to your super if you never claim it?',
    description: 'Unclaimed superannuation does not disappear, but it does transfer to the ATO. Here is what happens and how to claim it back.',
    category: 'Super',
    date: '24 February 2025',
    readTime: 4,
    ctaHeading: 'Claim your super before it transfers to the ATO',
    ctaBody: 'We help working holiday makers claim their superannuation through DASP before or after it transfers to the ATO. Get in touch and we will handle the application.',
    ctaLabel: 'Claim your super',
    ctaHref: '/superannuation',
    body: `
If you leave Australia and never apply for your superannuation through the DASP process, the money does not stay in your super fund indefinitely. After a period of inactivity, the fund is required to transfer unclaimed super to the ATO, where it sits as a government-held balance against your TFN.

## When does super become unclaimed

Super funds are required to report and transfer unclaimed super balances to the ATO under specific conditions. For temporary residents who have departed Australia, funds transfer unclaimed balances to the ATO typically after the fund has been unable to pay the DASP or after the account has been inactive for a defined period.

## Can you still claim it after it transfers to the ATO

Yes. Once your super has been transferred to the ATO, you can still claim it. The ATO holds the balance and you can request payment through the same DASP process. The main difference is that you are now claiming from the ATO directly rather than from a super fund.

The withholding tax still applies. The ATO deducts the 65% rate from the taxable component before paying you, just as a fund would have done.

## How to find out if your super has transferred to the ATO

Our team can identify all super held in your name, including any amounts transferred to the ATO, and make sure your withdrawal application covers everything.

## Does the balance earn interest while held by the ATO

No. Super transferred to the ATO as unclaimed super does not earn investment returns. This is a practical reason to claim your super sooner rather than later, as the balance will not grow while it sits with the government.

## The message for working holiday makers

Claim your super. It is your money, earned as part of your employment in Australia. Even after the 65% withholding tax, you will receive the remaining 35%, which is worth claiming regardless of the amount.
    `,
  },
  {
    slug: 'can-you-withdraw-super-in-australia',
    title: 'Can you withdraw your super while still in Australia?',
    description: 'Generally, you cannot access your super while on a working holiday visa in Australia. Here is why, and what your options are.',
    category: 'Super',
    date: '3 March 2025',
    readTime: 4,
    ctaHeading: 'Planning to leave Australia soon?',
    ctaBody: 'We help working holiday makers claim their super through the DASP process once they have left. Get in touch and we will make sure you receive everything you are entitled to.',
    ctaLabel: 'Plan your super claim',
    ctaHref: '/superannuation',
    body: `
Generally, no. Working holiday visa holders cannot access their superannuation while they are still in Australia on a valid visa. The DASP process, which is the mechanism through which working holiday makers claim their super, is specifically designed for people who have permanently departed Australia and whose visa has expired or been cancelled.

## Why you cannot access it early

Superannuation in Australia is designed as a long-term retirement savings vehicle. The rules around early access are strict and apply to all workers, not just temporary visa holders. There is no general right to access your super early simply because you are leaving the country soon.

## The condition for DASP eligibility

To be eligible for DASP, you must have left Australia and your visa must no longer be valid. Applying from within Australia while your working holiday visa is still active will result in your application being rejected. You need to have departed first.

## What about leaving soon

If you know you are leaving Australia in a few weeks, the best approach is to get organised before you go rather than trying to apply while you are still there. Make sure you have your super fund details, your member number, and the bank account details for where you want the funds sent. Once you have left and your visa expires, you can submit the DASP application and the process can proceed.

## What about financial hardship

There are compassionate grounds and severe financial hardship provisions that allow some Australians to access their super early, but these provisions do not typically apply to working holiday makers in normal circumstances. The specific conditions are narrow and unlikely to apply to most temporary residents.

See our detailed guide on [how to apply for DASP](/guides/how-to-apply-for-super-back) for everything you need to do once you have left Australia.
    `,
  },
  {
    slug: 'how-to-find-lost-superannuation',
    title: 'How to find lost or unclaimed superannuation in Australia',
    description: 'Super can end up in multiple funds or with the ATO without you realising it. Here is how to track down every dollar.',
    category: 'Super',
    date: '10 March 2025',
    readTime: 4,
    ctaHeading: 'Need help tracking down your super?',
    ctaBody: 'We help working holiday makers find and claim all their superannuation from funds and the ATO. Get in touch and we will help you locate everything.',
    ctaLabel: 'Find your super',
    ctaHref: '/superannuation',
    body: `
It is surprisingly easy for working holiday makers to accumulate super across multiple funds without realising it. Every time you start a new job, if you do not nominate an existing super fund, your employer may create a new account for you with their default fund. Over the course of a year working multiple jobs, this can result in several small balances spread across different funds.

## Why super goes missing

Super becomes classified as lost when a fund cannot contact a member — because they have changed address, left the country, or moved between jobs without updating their details. The fund will eventually transfer the balance to the ATO, where it sits as unclaimed money. It does not disappear, but it does require action to retrieve.

For working holiday makers who move around frequently, this is a genuine risk. Catching it before you leave Australia is far simpler than trying to recover it from overseas.

## Tracking down your accounts

If you have worked for multiple employers in Australia, there is a good chance super has been paid into more than one fund. The key is having your TFN linked to each account — this is what allows a registered tax agent to identify all super held in your name across all funds and with the ATO.

Before you leave Australia, it is worth having a tax agent run a comprehensive check to make sure nothing has been missed. Submitting a [DASP withdrawal](/guides/what-is-dasp-super-withdrawal) without knowing all your accounts means leaving money behind.

## Consolidating multiple accounts

If you have super spread across multiple funds, consolidating them into a single account simplifies everything. Instead of submitting multiple DASP applications, you deal with one fund and one process. A tax agent can manage this consolidation for you and ensure all balances are transferred correctly before your withdrawal application is submitted.

## Do not leave without checking

Super held by the ATO earns no investment returns while it sits there. The sooner you claim it, the better. If you are planning to leave Australia soon, get in touch with our team and we will make sure every dollar of your super is identified and included in your withdrawal application.
    `,
  },
  {
    slug: 'how-to-choose-super-fund',
    title: 'What is a superannuation fund and how do you choose one?',
    description: 'When you start a job in Australia, you can nominate where your super goes. Here is what a super fund is and how to choose one as a working holiday maker.',
    category: 'Super',
    date: '17 March 2025',
    readTime: 4,
    ctaHeading: 'Questions about your super?',
    ctaBody: 'We help working holiday makers understand their super situation and make sure they claim everything they are entitled to when they leave. Get in touch and we will help.',
    ctaLabel: 'Talk to us about your super',
    ctaHref: '/superannuation',
    body: `
A superannuation fund is an investment vehicle that holds your retirement savings in Australia. Your employer contributes 11.5% of your wages into a super fund on your behalf, and those contributions are invested by the fund until you are eligible to access them. In Australia, there are hundreds of different super funds to choose from, ranging from large industry funds to retail funds operated by banks and financial institutions.

## How to choose a fund as a working holiday maker

As a working holiday maker, the choice of fund matters less than it would for someone building retirement savings over decades. You will be withdrawing your super through DASP when you leave, so the primary considerations are access and simplicity rather than long-term investment performance.

A good approach is to choose a fund that has a straightforward online member portal, a good reputation for responding to queries, and experience dealing with DASP claims. Large industry funds such as those that cater to particular industries are generally well set up for this.

## What happens if you do not nominate a fund

If you start a job and do not nominate a super fund, your employer will check whether you already have a super account linked to your TFN (called a stapled fund) and use that. If there is no stapled fund, they will pay contributions to their default fund. This is fine in practice, but it can result in you accumulating super across multiple funds if you work for several employers. The more funds you have, the more DASP applications you need to submit later.

## Keeping things simple

If you are starting your first job in Australia, nominate a fund from the start and stick with it for all your jobs. Whenever you start a new job, provide the same fund details on your super nomination form. This keeps all your contributions in one place and makes your eventual DASP claim much simpler.
    `,
  },

  // ─── WORK RIGHTS ────────────────────────────────────────────────────────────
  {
    slug: 'minimum-wage-australia-2024-25',
    title: 'What is the minimum wage in Australia for 2024-25?',
    description: 'Australia has one of the highest minimum wages in the world. Here is the current rate and what it means for working holiday makers.',
    category: 'Work Rights',
    date: '24 March 2025',
    readTime: 4,
    ctaHeading: 'Need help with your tax on top of understanding your rights?',
    ctaBody: 'We help working holiday makers sort their TFN, tax return, and super so everything is taken care of. Get in touch and we will help.',
    ctaLabel: 'Get your tax sorted',
    ctaHref: '/tax-return',
    body: `
As of 1 July 2024, the national minimum wage in Australia is $24.10 per hour. This applies to all employees, including working holiday makers, unless a higher rate is specified by a modern award or enterprise agreement that applies to your industry or role. In many industries, the award rate is actually higher than the minimum wage.

## How the minimum wage is set

The Fair Work Commission reviews the national minimum wage each year and announces any increase effective from the first full pay period on or after 1 July. The increase announced in mid-2024 applied from 1 July 2024. Future increases follow the same annual process.

## Award rates and why they often apply instead

Most workers in Australia are covered by a modern award rather than just the national minimum wage. Awards set minimum pay rates for specific industries and occupations, and those rates are generally higher than the national minimum. Common awards that cover working holiday makers include the Hospitality Industry (General) Award, the Retail Award, the Horticulture Award, and the Building and Construction General On-site Award.

If you work in hospitality, your minimum rate under the award will be higher than $24.10 per hour. If you work in fruit picking, the Horticulture Award sets minimum rates for that work. Ask your employer which award applies to your role, and check that the rate you are being paid meets the minimum for that award.

## Penalty rates

In many industries, working on weekends, public holidays, or outside ordinary hours attracts higher rates known as penalty rates. See our guide on [penalty rates in Australia](/guides/penalty-rates-australia) for a full explanation.

## What to do if you are being paid less

If you believe you are being paid below the minimum wage or award rate for your work, you can contact the Fair Work Ombudsman. They investigate underpayment complaints and have the power to require employers to back-pay workers who have been underpaid. Working holiday makers have the same rights in this area as any other worker in Australia.
    `,
  },
  {
    slug: 'how-many-hours-can-you-work-on-whv',
    title: 'How many hours can you work per week on a working holiday visa?',
    description: 'Working holiday visa holders were previously limited to 6 months with one employer. Here is what the current rules actually say.',
    category: 'Work Rights',
    date: '31 March 2025',
    readTime: 4,
    ctaHeading: 'Sorted on work rules? Let us sort your tax.',
    ctaBody: 'We help working holiday makers handle their TFN, tax return, and super in one place. Get in touch and we will take care of everything.',
    ctaLabel: 'Get your tax sorted',
    ctaHref: '/tax-return',
    body: `
There is no restriction on how many hours per week a working holiday visa holder can work. You can work full time, part time, or casually, and the number of hours you work each week is not capped by your visa conditions.

## The employer time limit that used to apply

Working holiday visa holders used to be limited to working for the same employer for no more than 6 months. This restriction was lifted in December 2022. As of that change, there is no longer a time limit on how long you can work for a single employer. You can work for the same employer for your entire stay in Australia if both parties agree.

## What has not changed

You are still required to have a valid working holiday visa to work in Australia. Visa conditions still require that your primary purpose for being in Australia is a holiday, with work as a secondary activity. This is a visa classification distinction rather than a practical restriction on how much you work.

You are also still required to meet tax obligations for any income you earn, including providing your [TFN](/tfn) to your employer and lodging a [tax return](/tax-return) at the end of the financial year.

## The 88 days rule for a second visa

If you are aiming to qualify for a second or third working holiday visa, you still need to complete 88 days of specified work in a regional area of Australia during your first visa. The specified work categories include agriculture, fishing, mining, construction in certain areas, and bushfire recovery work. This requirement relates to visa eligibility, not to how many hours or weeks you can work in total.

## Superannuation and hours worked

Your entitlement to [superannuation](/superannuation) is based on your earnings, not your hours. As long as you earn income and your employer is required to pay super, you are entitled to the 11.5% contribution regardless of how many hours you work.
    `,
  },
  {
    slug: 'penalty-rates-australia',
    title: 'What are penalty rates and are you entitled to them in Australia?',
    description: 'Penalty rates are higher pay rates for working weekends, public holidays, and unsociable hours. Here is what they are and whether they apply to you.',
    category: 'Work Rights',
    date: '7 April 2025',
    readTime: 4,
    ctaHeading: 'Getting paid correctly? Make sure your tax is too.',
    ctaBody: 'We help working holiday makers make sure their tax is handled correctly so everything earned ends up in the right hands. Get in touch and we will sort it.',
    ctaLabel: 'Get your tax sorted',
    ctaHref: '/tax-return',
    body: `
Penalty rates are higher pay rates that apply when employees work outside of ordinary hours, including on weekends, public holidays, evenings, and early mornings. They are set out in modern awards and enterprise agreements and apply to most employees in Australia, including working holiday makers.

## Why penalty rates exist

Penalty rates compensate workers for the inconvenience and social cost of working at times that are generally less desirable, such as Saturday nights, Sundays, and public holidays. They are a long-established feature of Australian employment law and are enforced by the Fair Work Commission.

## Common penalty rates in hospitality

In the hospitality industry, which employs a large number of working holiday makers, penalty rates under the Hospitality Industry (General) Award include higher rates for Saturday work, Sunday work (typically 175% of the ordinary rate for full-time and part-time employees), and public holidays (typically 225% of the ordinary rate). Casual employees receive an additional casual loading on top of these rates.

## How to find out what penalty rates apply to you

Ask your employer which modern award or enterprise agreement covers your employment. Once you know the award, you can look up the specific penalty rates that apply to your role and working pattern on the Fair Work Ombudsman website. The website has a pay calculator that can help you work out your correct rate for any given shift.

## What to do if you are not being paid penalty rates

If you are working weekends or public holidays and are not receiving penalty rates when they should apply, this is underpayment. You can raise it with your employer first, and if that does not resolve it, contact the Fair Work Ombudsman. Working holiday makers have the same rights as any other worker in Australia and are entitled to all award minimums including penalty rates.

Remember that any additional income you earn through penalty rates is still subject to tax at the 15% working holiday maker rate and should be declared in your [tax return](/tax-return).
    `,
  },
  {
    slug: 'can-your-employer-pay-you-cash-in-hand',
    title: 'Can your employer pay you cash in hand in Australia?',
    description: 'Cash in hand payments are common in some industries, but they come with tax obligations and rights implications. Here is what you need to know.',
    category: 'Work Rights',
    date: '14 April 2025',
    readTime: 4,
    ctaHeading: 'Had cash in hand work? We can help with your tax return.',
    ctaBody: 'We help working holiday makers handle tax returns that include cash income. Get in touch and we will guide you through what to declare and how.',
    ctaLabel: 'Sort your tax return',
    ctaHref: '/tax-return',
    body: `
An employer can legally pay you in cash in Australia. There is no law that requires wages to be paid by bank transfer. However, cash payments do not exempt either you or your employer from your respective legal obligations, and there are important things to be aware of before accepting this kind of arrangement.

## Your employer's obligations still apply

Even when paying cash, your employer is still required to deduct the correct amount of tax from your wages (or apply the correct PAYG withholding rate), pay [superannuation](/superannuation) contributions on your behalf, provide you with payslips, and comply with the minimum wage and award conditions that apply to your work. The method of payment does not change any of these obligations.

Many employers who pay cash do not meet these obligations. They may pay below minimum wage, skip superannuation, and provide no payslips. This is not a feature of cash payments itself but a common pattern of non-compliance that tends to accompany them.

## Your tax obligations when paid cash in hand

All cash income is taxable in Australia. You are required to declare it in your [tax return](/tax-return) at the end of the financial year. The ATO has ways of identifying undeclared income and the penalties for tax evasion are serious. Keeping your own records of what you were paid and declaring it honestly is always the right approach.

## Missing superannuation

If your employer is paying you cash and not paying superannuation, you are missing out on 11.5% of your wages in super contributions that you are legally entitled to. The ATO has a process for reporting employers who fail to pay super and can pursue them for the outstanding amounts.

## When cash arrangements raise concerns

If an employer is insisting on cash and asking you not to mention the arrangement to anyone, that is a sign that the arrangement may not be compliant. Protect yourself by keeping your own records of hours worked, rates agreed, and amounts received.
    `,
  },
  {
    slug: 'fair-work-act-working-holiday-makers',
    title: 'What is the Fair Work Act and how does it protect working holiday makers?',
    description: 'The Fair Work Act is Australia\'s main workplace relations law. Here is how it protects you as a working holiday maker.',
    category: 'Work Rights',
    date: '21 April 2025',
    readTime: 4,
    ctaHeading: 'Get your tax sorted alongside your work rights',
    ctaBody: 'We help working holiday makers handle all their Australian tax obligations, from TFN applications to tax returns and super claims. Get in touch and we will help.',
    ctaLabel: 'Get started',
    ctaHref: '/contact',
    body: `
The Fair Work Act 2009 is the primary piece of legislation governing employment relationships in Australia. It sets out the rights and obligations of employers and employees across most of the private sector and applies to working holiday makers in exactly the same way it applies to any other worker in Australia.

## What the Fair Work Act guarantees

The Act establishes the National Employment Standards (NES), which are 11 minimum entitlements that apply to all employees regardless of their visa status. These include the right to receive at least the national minimum wage, maximum weekly hours of work, the right to request flexible working arrangements in some circumstances, parental leave provisions (not directly relevant to most working holiday makers), annual leave, personal and carer's leave, community service leave, long service leave, public holidays, notice of termination, and protection from unfair dismissal.

## How the National Employment Standards apply to you

As a working holiday maker, the most practically relevant NES entitlements are the minimum wage, the right to public holidays (including penalty rates), and notice of termination. You are entitled to receive proper notice or payment in lieu if your employment is ended, and you are entitled to be paid correctly for work on public holidays.

## The Fair Work Ombudsman

The Fair Work Ombudsman (FWO) is the government agency responsible for enforcing the Fair Work Act. If you believe your rights under the Act are being breached, you can lodge a complaint with the FWO online. The FWO investigates complaints, mediates disputes, and where necessary takes legal action against employers who fail to comply.

The FWO also provides resources specifically for working holiday makers, including translated materials in multiple languages, and has run campaigns targeting industries where non-compliance with working holiday maker rights has been identified.

## Visa status and reporting

One concern working holiday makers sometimes have is whether reporting an employer to the FWO will affect their visa. The FWO has a Workplace Justice Visa provision that allows temporary visa holders to remain in Australia for the purposes of pursuing a workplace complaint, protecting them from being forced to leave before a matter is resolved.
    `,
  },
  {
    slug: 'employer-not-paying-correctly',
    title: 'What to do if your employer is not paying you correctly in Australia',
    description: 'Underpayment is a serious issue in Australia. Here is what to do if you believe you are not being paid what you are owed.',
    category: 'Work Rights',
    date: '28 April 2025',
    readTime: 4,
    ctaHeading: 'Get everything else in order while you sort your pay',
    ctaBody: 'We help working holiday makers handle their tax obligations so that side of things is taken care of regardless of what is happening with their employment situation.',
    ctaLabel: 'Get your tax sorted',
    ctaHref: '/contact',
    body: `
Underpayment of wages is unfortunately common in Australia, particularly in industries that employ large numbers of working holiday makers such as hospitality, agriculture, and cleaning. If you believe you are being paid less than you are entitled to, there are clear steps you can take to address it.

## Start by checking what you should be paid

Before raising a concern, make sure you know what you should be earning. Identify the modern award or enterprise agreement that covers your work, find the rate for your specific classification and working pattern, and calculate what you should have received based on your hours and shifts. The Fair Work Ombudsman website has a pay calculator that makes this straightforward.

## Raise it with your employer first

In many cases, underpayment is a mistake rather than deliberate. Raise the issue with your employer or manager calmly and with your records ready. Point out the discrepancy between what you received and what the award says you should have received. Many employers will correct a genuine error once it is pointed out.

## Contact the Fair Work Ombudsman

If raising it internally does not resolve the issue, contact the Fair Work Ombudsman. You can lodge a complaint online through their website. The FWO will investigate the complaint and work to recover any underpaid amounts. They have broad powers including the ability to require back payment and to impose penalties on employers who have underpaid workers.

## Keep records throughout

The more records you have, the stronger your position. Keep copies of your payslips, your rosters, any employment contract or letter of offer, and any communications with your employer about pay. If you do not have payslips, write down your hours, dates, and rates from memory as accurately as you can. These records are what the FWO will rely on in any investigation.

## Your visa is protected

If you are concerned that making a complaint might affect your visa, the Fair Work Ombudsman has a Workplace Justice Visa provision that protects temporary visa holders pursuing a workplace rights matter from being required to leave Australia during that process.
    `,
  },
  {
    slug: 'leave-entitlements-working-holiday-visa',
    title: 'Are you entitled to sick leave and annual leave on a working holiday visa?',
    description: 'Working holiday makers are entitled to leave in Australia, but how much depends on how you are employed. Here is what the rules say.',
    category: 'Work Rights',
    date: '5 May 2025',
    readTime: 4,
    ctaHeading: 'Know your rights, and know your tax too',
    ctaBody: 'We help working holiday makers handle all their Australian tax obligations. Get in touch and we will take care of your TFN, tax return, and super.',
    ctaLabel: 'Get your tax sorted',
    ctaHref: '/tax-return',
    body: `
Working holiday makers in Australia are entitled to the same leave provisions as any other employee, but the entitlements depend heavily on whether you are employed as a casual, part-time, or full-time worker.

## Full-time and part-time employees

If you are employed as a full-time or part-time employee, you accrue annual leave at the rate of 4 weeks per year of full-time service (pro-rated for part-time). You also accrue personal and carer's leave (commonly called sick leave) at 10 days per year of full-time service. These entitlements are set by the National Employment Standards and apply to all employees regardless of visa type.

If you leave a job before using your accrued annual leave, you are entitled to have it paid out to you. This is sometimes called a leave loading payout and should appear in your final pay.

## Casual employees

Casual workers are not entitled to annual leave or sick leave in the same way. Instead, casual employees receive a 25% casual loading on their hourly rate, which is intended to compensate for the lack of leave entitlements. If you are hired as a casual, your rate should be at least 25% higher than the equivalent full-time rate under the applicable award.

## How to work out which category you are in

Check your letter of engagement or employment contract if you were given one, or ask your employer. If you are on the payroll with regular shifts and a set schedule, you may be permanent part-time rather than casual, even if the terminology used is loose. The classification matters for your leave rights.

## Leave accrual and tax

Annual leave when taken or paid out is taxed in the same way as ordinary wages. Any annual leave payout you receive when leaving a job should be declared in your [tax return](/tax-return) for the year it was received.
    `,
  },
  {
    slug: 'what-is-a-tax-invoice',
    title: 'What is a tax invoice and when do you need to issue one?',
    description: 'If you are working as a contractor with an ABN, you will need to issue tax invoices to get paid. Here is what a tax invoice must include.',
    category: 'Work Rights',
    date: '12 May 2025',
    readTime: 4,
    ctaHeading: 'Need an ABN to start issuing invoices?',
    ctaBody: 'We handle ABN registrations for working holiday makers and make sure everything is set up correctly. Get in touch and we will sort it.',
    ctaLabel: 'Register your ABN',
    ctaHref: '/abn',
    body: `
A tax invoice is a document that a supplier issues to a buyer to request payment for goods or services. As a working holiday maker working as a contractor with an [ABN](/abn), you will need to issue tax invoices to the businesses paying you in order to receive payment correctly and to maintain the records required for your [tax return](/tax-return).

## When a tax invoice is required

If you make a sale of goods or services worth $82.50 or more (including GST), you are required to issue a tax invoice if the buyer requests one. For most contracting arrangements, the business paying you will need a tax invoice to process the payment through their accounts system. Even when not strictly required by law, issuing invoices is good practice because it creates a clear record of what was agreed, what was delivered, and what was paid.

## What a tax invoice must include

A valid tax invoice must include your business name (or your name if you are a sole trader), your ABN, the date of the invoice, a description of the goods or services provided, the total amount payable, and an indication of whether the price includes GST or whether GST is applicable separately.

If you are not registered for GST, which is the case for most working holiday makers earning under $75,000 per year, you do not add GST to your invoices. Simply include your ABN and a note that no GST applies, or that the total is GST-free.

## Why quoting your ABN on invoices matters

If you issue an invoice without an ABN, the business receiving it is required by law to withhold 47% of the payment before remitting the rest to you. This is called the no-ABN withholding rule. To avoid this, always quote your ABN on every invoice.

## Keeping copies of your invoices

Keep a copy of every invoice you issue. These are the records you need to declare your contracting income accurately in your tax return. A simple spreadsheet or a folder of PDF invoices is sufficient. The ATO may ask to see them if your return is queried.
    `,
  },
  {
    slug: 'can-you-work-for-multiple-employers',
    title: 'Can you work for multiple employers at the same time in Australia?',
    description: 'Yes, working holiday makers can work for more than one employer simultaneously. Here is what to keep in mind for tax and visa purposes.',
    category: 'Work Rights',
    date: '19 May 2025',
    readTime: 3,
    ctaHeading: 'Working multiple jobs? Make sure your tax is set up correctly.',
    ctaBody: 'We help working holiday makers with multiple employers make sure their tax situation is correct and their return includes all sources of income.',
    ctaLabel: 'Get your tax sorted',
    ctaHref: '/tax-return',
    body: `
Yes, working holiday visa holders can legally work for more than one employer at the same time in Australia. There is no restriction on the number of employers you can have simultaneously. Many working holiday makers work multiple jobs, particularly in hospitality, where casual work across different venues is common.

## What you need to do for each employer

Each employer you work for needs your [TFN](/tfn) and a completed Tax File Number Declaration form. Providing your TFN to one employer does not automatically cover you with another. Until you have submitted a declaration form to each employer individually, they are required to withhold tax at 47% from the wages they pay you.

## Tax implications of multiple jobs

Having multiple jobs can affect your overall tax position. Each employer withholds tax based on your earnings from that employer alone, without knowing what you are earning from others. Because the working holiday maker rate is a flat 15%, this is less of an issue than it would be for a resident with a progressive tax scale. Each employer should simply withhold 15% from your earnings with them.

At the end of the financial year, all income from all employers is combined in your [tax return](/tax-return). The ATO receives income reports from each employer. Make sure you review all of them before lodging.

## Superannuation from multiple employers

Each employer who pays you wages is separately required to make [superannuation](/superannuation) contributions on your behalf. This means you may accumulate super across multiple funds. When you are ready to leave Australia, you can consolidate these funds before applying for DASP or apply for each separately.
    `,
  },
  {
    slug: 'full-time-part-time-casual-australia',
    title: 'What is the difference between full time, part time, and casual work in Australia?',
    description: 'Your employment classification affects your pay rate, your leave entitlements, and your tax. Here is what each one means.',
    category: 'Work Rights',
    date: '26 May 2025',
    readTime: 4,
    ctaHeading: 'Whatever your work situation, we can sort your tax.',
    ctaBody: 'We help working holiday makers handle their tax obligations regardless of how they are employed. Get in touch and we will take care of the details.',
    ctaLabel: 'Get started',
    ctaHref: '/contact',
    body: `
In Australia, employees are classified as full-time, part-time, or casual. Each classification carries different entitlements and different pay structures. Understanding which one applies to you matters for knowing what you should be paid and what you are entitled to.

## Full-time employment

Full-time employees work a regular pattern of hours, typically 38 ordinary hours per week. They receive the full set of leave entitlements under the National Employment Standards, including 4 weeks of annual leave per year and 10 days of personal and carer's leave. They receive the base hourly rate without a casual loading. Full-time employment provides the most job security and the broadest entitlements.

## Part-time employment

Part-time employees work fewer than 38 ordinary hours per week on a regular, agreed schedule. They receive the same entitlements as full-time employees on a pro-rata basis, including annual leave, sick leave, and other NES entitlements. Their pay is calculated at the same base rate as full-time employees for the same award, not reduced simply because they work fewer hours.

## Casual employment

Casual employees do not have a fixed schedule and are engaged on an as-needed basis. They do not receive annual leave or personal and carer's leave accruals. In exchange, they receive a 25% casual loading on top of the applicable award rate. This loading is the compensation for the lack of leave entitlements and the uncertainty of hours.

Casual work is the most common arrangement for working holiday makers, particularly in hospitality and retail. Make sure you know whether you are classified as casual and that the 25% loading is included in your rate.

## Tax is the same regardless

Your working holiday maker tax rate of 15% applies to all income regardless of your employment classification. All income from any of these arrangements must be declared in your [tax return](/tax-return).
    `,
  },

  // ─── MEDICARE & OTHER ────────────────────────────────────────────────────────
  {
    slug: 'what-is-medicare-working-holiday-makers',
    title: 'What is Medicare and are working holiday makers covered?',
    description: 'Medicare is Australia\'s public health insurance system. Most working holiday makers are not covered, but there are exceptions.',
    category: 'Medicare & Other',
    date: '2 June 2025',
    readTime: 4,
    ctaHeading: 'Sorted on Medicare? Get your tax sorted too.',
    ctaBody: 'We help working holiday makers handle their TFN, tax return, and super so all their Australian obligations are taken care of.',
    ctaLabel: 'Get your tax sorted',
    ctaHref: '/tax-return',
    body: `
Medicare is Australia's universal public health insurance scheme. It provides Australian citizens and permanent residents with access to a range of healthcare services either free of charge or at a subsidised rate, including visits to general practitioners, specialist appointments, and hospital treatment as a public patient.

## Are working holiday makers covered by Medicare?

Generally, no. Holders of working holiday visas (subclass 417 and 462) are not eligible for Medicare coverage unless their home country has a Reciprocal Health Care Agreement (RHCA) with Australia. Without coverage, you are treated as a private patient for healthcare in Australia, which means you pay the full cost of medical appointments, prescriptions, and hospital treatment.

## What this means in practice

If you are not covered and you see a GP in Australia, you will typically pay around $80 to $120 for a standard consultation. Emergency treatment at a public hospital is generally available to everyone, including non-Medicare holders, but subsequent costs may apply depending on the situation.

Given the potential costs, it is strongly recommended that working holiday makers obtain comprehensive travel and health insurance before arriving in Australia. Most working holiday visa applications require you to have health insurance as a condition of the visa.

## The Medicare levy exemption

When you lodge your [tax return](/tax-return) in Australia, there is a section about the Medicare levy, which is a 2% levy applied to taxable income to fund the Medicare system. Working holiday makers who are not eligible for Medicare are entitled to claim an exemption from this levy. This exemption can be applied through a registered tax agent when lodging your return. Not claiming this exemption when you are entitled to it means paying a levy for a service you cannot access.

For more on which countries have an RHCA with Australia, see our guide on [Medicare agreements with Australia](/guides/countries-with-medicare-agreement-australia).
    `,
  },
  {
    slug: 'countries-with-medicare-agreement-australia',
    title: 'Which countries have a Medicare agreement with Australia?',
    description: 'Australia has Reciprocal Health Care Agreements with several countries, giving their citizens access to some Medicare benefits. Here is the full list.',
    category: 'Medicare & Other',
    date: '9 June 2025',
    readTime: 4,
    ctaHeading: 'Need help with your Australian tax return?',
    ctaBody: 'We help working holiday makers lodge their Australian tax return correctly, including making sure any Medicare levy exemption is applied. Get in touch and we will handle it.',
    ctaLabel: 'Start your tax return',
    ctaHref: '/tax-return',
    body: `
Australia has Reciprocal Health Care Agreements (RHCAs) with a number of countries. Citizens of these countries who hold a valid working holiday visa may be entitled to access some Medicare benefits during their stay. The level of coverage varies between agreements and does not provide full Medicare access in most cases, but it does cover medically necessary treatment in some circumstances.

## Countries with an RHCA with Australia

As of the current date, Australia has reciprocal health care agreements with the United Kingdom, Republic of Ireland, New Zealand, Sweden, Netherlands, Finland, Norway, Belgium, Slovenia, Malta, and Italy. Citizens of these countries may be eligible for limited Medicare benefits during their stay in Australia.

## What the agreements cover

Coverage under an RHCA is typically limited to medically necessary treatment. This means treatment for conditions that arise during your visit and that cannot reasonably wait until you return home. It generally covers visits to a GP and some public hospital treatments. It does not cover pre-existing conditions, dental treatment, specialist visits in all cases, or private hospital costs.

The specific details of what is covered depend on which agreement applies to your country. Check with Services Australia for the precise entitlements under your country's agreement.

## How to enrol in Medicare under an RHCA

If your country has an RHCA with Australia, you can enrol in Medicare at a Services Australia (formerly Centrelink) office by presenting your passport, visa, and proof of citizenship. You will receive a Medicare card that allows you to access the covered services.

## The Medicare levy

If you are enrolled in Medicare under an RHCA and therefore eligible for some Medicare benefits, you may not be entitled to claim the full Medicare levy exemption on your [tax return](/tax-return). The rules around the levy and exemptions can be complex depending on your specific situation. A registered tax agent can help you work out the correct position for your circumstances.
    `,
  },
  {
    slug: 'medicare-levy-working-holiday-makers',
    title: 'What is the Medicare levy and do working holiday makers pay it?',
    description: 'The Medicare levy is a 2% tax that funds Australia\'s healthcare system. Most working holiday makers are exempt. Here is how to claim the exemption.',
    category: 'Medicare & Other',
    date: '16 June 2025',
    readTime: 4,
    ctaHeading: 'Make sure your tax return includes the Medicare levy exemption.',
    ctaBody: 'We handle tax returns for working holiday makers and make sure all entitlements, including the Medicare levy exemption, are correctly applied.',
    ctaLabel: 'Start your tax return',
    ctaHref: '/tax-return',
    body: `
The Medicare levy is a 2% tax applied to the taxable income of Australian residents to help fund the Medicare healthcare system. It is collected alongside income tax and appears as a separate line on your tax assessment. For most Australian residents, it is simply part of their tax obligation and they do not need to think about it separately.

For working holiday makers, the situation is different. If you are not eligible for Medicare, which is the case for most working holiday visa holders whose home country does not have a Reciprocal Health Care Agreement with Australia, you are entitled to an exemption from the Medicare levy. Paying it when you are not entitled to Medicare would mean contributing to a service you cannot access.

## How to claim the Medicare levy exemption

The exemption is not automatic and must be applied correctly when lodging your return. A registered tax agent will handle this as part of preparing your tax return, making sure the 2% levy is not applied to your income.

If you lodge your return without claiming the exemption when you are entitled to it, you will pay an unnecessary 2% on your taxable income. On a year's earnings of $30,000, that is $600 that should be in your account instead of with the ATO.

## What if your country has a Medicare agreement with Australia

If you are from the UK, Ireland, New Zealand, or another country with a Reciprocal Health Care Agreement, your situation is different. You may be entitled to some Medicare benefits and may not be fully exempt from the levy. The rules are more nuanced in this case and it is worth getting specific advice based on your country of origin and your enrolment status.

## Including the exemption in your return

When you lodge your [tax return](/tax-return), there is a section that asks about your Medicare levy status. Make sure this is completed correctly. If you are using a registered tax agent, they will handle this as part of the lodgment process.
    `,
  },
  {
    slug: 'tax-file-number-declaration-form',
    title: 'What is a tax file number declaration form and how do you fill it in?',
    description: 'The tax file number declaration form is what you give to your employer when you start a new job. Here is what it is and how to complete it correctly.',
    category: 'Medicare & Other',
    date: '23 June 2025',
    readTime: 4,
    ctaHeading: 'Starting a new job? Make sure your whole tax setup is right.',
    ctaBody: 'We help working holiday makers apply for their TFN and make sure they are set up correctly for tax from day one. Get in touch and we will help.',
    ctaLabel: 'Get your TFN sorted',
    ctaHref: '/tfn',
    body: `
A Tax File Number Declaration form is a form you complete and give to your employer when you start a new job in Australia. It is the document that tells your employer your TFN, your residency status for tax purposes, and whether you have a study and training support loan. Your employer uses this information to determine how much tax to withhold from your wages.

## Why the form matters

Without this form on file, your employer cannot apply the correct tax rate to your wages. Until they have it, they are required to withhold at the maximum rate of 47%. Submitting the form promptly when you start work is one of the most important things you can do to make sure the correct 15% working holiday maker rate applies from your first pay.

## How to fill it in as a working holiday maker

The form asks for your full name, date of birth, home address in Australia, and your TFN. For the residency section, working holiday visa holders should select the option indicating that they are a working holiday maker. This is the key selection that tells your employer to apply the 15% rate rather than the resident rates.

The form also asks whether you have a HELP or VSL debt from Australian study. For most working holiday makers, the answer is no.

## Where to get the form

Your employer should provide you with the form when you start work. Once completed, you give it to your employer rather than sending it to the ATO yourself. Your employer keeps it on file and uses the information to set up your payroll correctly.

## What if you change jobs

You need to complete a new Tax File Number Declaration form for every employer you work for. Your TFN does not transfer from one employer to another automatically. Give a new form to each employer from day one.
    `,
  },
  {
    slug: 'what-does-tax-withheld-mean-payslip',
    title: 'What does tax withheld mean on your payslip in Australia?',
    description: 'Tax withheld is the income tax your employer deducts from your wages before paying you. Here is how to check it is correct.',
    category: 'Medicare & Other',
    date: '30 June 2025',
    readTime: 3,
    ctaHeading: 'Not sure your payslip looks right?',
    ctaBody: 'We check working holiday makers tax situations and help make sure the right amounts are being applied. Get in touch and we will take a look.',
    ctaLabel: 'Check your tax situation',
    ctaHref: '/contact',
    body: `
Tax withheld on your payslip refers to the amount of income tax your employer has deducted from your gross wages before paying you the net amount. It is the PAYG withholding amount collected by your employer on behalf of the ATO. When you look at your payslip, you will typically see your gross earnings, the tax withheld, and your net pay, which is the amount deposited into your account.

## How to check the tax withheld is correct

For working holiday visa holders, the correct withholding rate is 15% of your gross earnings for income up to $45,000 per year. To check whether your employer is applying the right rate, divide the tax withheld figure on your payslip by your gross earnings figure. The result should be approximately 0.15 or 15%.

If the result is significantly higher than 15%, your employer may be using the wrong rate. The most common reason for this is that your Tax File Number Declaration form has not been received and processed, causing the employer to apply the default 47% rate. If that is the case, speak to your employer and make sure they have your form on file.

## What happens to the tax withheld

Your employer collects the tax withheld amounts from each pay and remits them to the ATO periodically. At the end of the financial year, your employer finalises their payroll reporting and reports the total wages paid to you and the total tax withheld. This appears as your income statement in the ATO system. When you lodge your [tax return](/tax-return), the ATO calculates your actual tax liability and refunds any excess withholding, or collects any shortfall.

## Keep your payslips

Keep copies of your payslips throughout the year. They are useful for checking your income statement figures at tax time and for resolving any discrepancies between what you were paid and what the ATO has on record.
    `,
  },
  {
    slug: 'what-is-an-income-statement',
    title: 'What is an income statement in Australia and how do you access yours?',
    description: 'An income statement shows your total wages and tax withheld for the year. Here is how to find yours and what to do with it.',
    category: 'Medicare & Other',
    date: '7 July 2025',
    readTime: 3,
    ctaHeading: 'Ready to lodge your tax return?',
    ctaBody: 'We handle the entire tax return process for working holiday makers, including checking your income statements are correct. Get in touch and we will sort it out.',
    ctaLabel: 'Start your tax return',
    ctaHref: '/tax-return',
    body: `
An income statement is the digital record that shows the total wages your employer paid you during a financial year and the total amount of tax withheld. It has replaced the old paper PAYG payment summary. Your employer submits this information directly to the ATO through their payroll system, and a registered tax agent can access it on your behalf to prepare your return.

## How to access your income statement

A registered tax agent can access all your income statements directly through the ATO system and will confirm that all employer reports are finalised and accurate before lodging your return.

## When do income statements become available

Employers have until 14 July each year to finalise their income statements for the previous financial year. This means that in early July, many income statements will still show as in progress. Wait until they are marked as tax ready before lodging your return, as the figures may still be updated.

## What to do if there is an error in your income statement

If the income or tax withheld figures in your income statement do not match your payslips, contact your employer first and ask them to correct the data. If the employer is unresponsive or you have already left Australia, contact the ATO. They can assist with correcting employer reporting errors.

## What if you had multiple employers

All your employers will appear separately in the income statements section. Make sure you review all of them before lodging your [tax return](/tax-return). The total of all income and all withholding across all employers is what appears in your return.
    `,
  },
  {
    slug: 'what-is-the-ato',
    title: 'What is the ATO and what does it do?',
    description: 'The ATO is the Australian Taxation Office, the government agency responsible for collecting taxes. Here is what it does and when you will deal with it.',
    category: 'Medicare & Other',
    date: '14 July 2025',
    readTime: 3,
    ctaHeading: 'Let us handle your dealings with the ATO',
    ctaBody: 'We manage Australian tax returns for working holiday makers and deal with the ATO on our clients behalf. Get in touch and we will take care of everything.',
    ctaLabel: 'Get your tax sorted',
    ctaHref: '/tax-return',
    body: `
The Australian Taxation Office (ATO) is the federal government agency responsible for administering Australia's tax system. It collects income tax, goods and services tax, and other federal taxes, and it manages programs such as the superannuation guarantee on behalf of workers.

## What the ATO does that affects working holiday makers

As a working holiday maker, your main interactions with the ATO relate to your Tax File Number, your income tax, and your superannuation. The ATO issues TFNs, receives income reports from your employers, processes your tax return, and oversees the DASP process through which you can withdraw your super after leaving Australia.

## How the ATO receives information about you

Your employers report your wages and tax withholding to the ATO throughout the year through their payroll software. Your super fund reports your contribution history to the ATO. When you lodge a tax return, you are confirming and supplementing this information. The ATO uses all of this data to assess whether the right amount of tax has been paid.

## When the ATO might contact you

The ATO may contact you if they need additional information to process your tax return, if they identify a discrepancy between what you have reported and what your employer has reported, or if they are conducting a review or audit of your return. All communications from the ATO are either through your registered tax agent or by post to your registered address. The ATO will never contact you by phone demanding immediate payment or threatening arrest. If you receive a call like that, it is a scam.

## How to contact the ATO

A registered tax agent can handle all communications with the ATO on your behalf, including from overseas.
    `,
  },
  {
    slug: 'gross-pay-vs-net-pay-australia',
    title: 'What is the difference between gross pay and net pay in Australia?',
    description: 'Gross pay is what you earn before deductions. Net pay is what you actually receive. Here is how the two relate to your tax situation.',
    category: 'Medicare & Other',
    date: '21 July 2025',
    readTime: 3,
    ctaHeading: 'Make sure your net pay is correct',
    ctaBody: 'We help working holiday makers check their tax situation and make sure the right amounts are being deducted. Get in touch and we will take a look.',
    ctaLabel: 'Check your tax situation',
    ctaHref: '/contact',
    body: `
Gross pay is the total amount you earn before any deductions are made. Net pay is what you actually receive in your bank account after deductions. The main deduction for most employees is income tax withholding, though superannuation is sometimes misunderstood in this context.

## How gross and net pay appear on your payslip

Your payslip will show your gross earnings for the pay period, which is calculated as your hours worked multiplied by your hourly rate (plus any allowances, penalty rates, or overtime). It will then show the deductions made, with income tax withholding being the primary one. The result after subtracting deductions is your net pay.

## Superannuation is not a deduction from gross pay

A common point of confusion is superannuation. Superannuation is not deducted from your gross pay. It is paid by your employer in addition to your gross wages. Your gross pay and net pay figures do not change because of super. Super is a separate obligation your employer meets on top of your wages. This is why you earn $1,000 in wages AND receive $115 (or whatever the applicable rate is) in super contributions at the same time.

## Why gross pay matters for tax

Your tax return and your income statement both refer to your gross pay, not your net pay. When you declare your income for the year, you declare the gross figure. The tax withheld is shown separately. The ATO uses both figures to calculate whether the right amount of tax was paid.

## Checking your gross pay calculation

If you want to verify your payslip, multiply your ordinary hours by your hourly rate. Add any penalty rates for weekend or public holiday shifts. Add any allowances. The total should match the gross figure on your payslip. If it does not, raise it with your employer.
    `,
  },
  {
    slug: 'do-working-holiday-makers-pay-tax-on-tips',
    title: 'Do working holiday makers need to pay tax on tips in Australia?',
    description: 'Yes, tips received as part of your employment in Australia are taxable income. Here is how they are treated and what you need to declare.',
    category: 'Medicare & Other',
    date: '28 July 2025',
    readTime: 3,
    ctaHeading: 'Need help declaring all your income correctly?',
    ctaBody: 'We make sure working holiday makers tax returns include all income sources correctly. Get in touch and we will take care of your return.',
    ctaLabel: 'Start your tax return',
    ctaHref: '/tax-return',
    body: `
Yes, tips received in Australia are taxable income. It does not matter whether the tip is paid in cash directly by a customer, distributed through a tronc system managed by your employer, or added to a bill and paid out to staff. All tips are income and must be declared in your [tax return](/tax-return).

## How tips are treated by the ATO

The ATO treats tips received in the course of your employment as assessable income. They are subject to income tax at the same rate as your wages. For working holiday makers, that means tips are taxed at 15% like any other employment income up to $45,000 per year.

## When your employer handles tips

If your employer collects tips and distributes them to staff, those amounts may already be included in your income reporting if the employer treats them as part of wages. Check your payslips and income statement to see whether tips are included in the figures reported by your employer. If they are, they are already captured in your return. If they are not, you need to include them separately.

## When you receive cash tips directly

If customers tip you directly in cash and that money goes straight into your pocket without passing through your employer's payroll, it is still taxable income. Keep a record of cash tips received so you can include an accurate figure in your return. Many people underestimate or completely forget to declare tips, but the obligation exists regardless of how informal the arrangement feels.

## Superannuation and tips

Tips that are paid through your employer's payroll system may be included in the earnings base on which super is calculated, depending on how they are classified. Cash tips paid directly by customers are generally not subject to superannuation obligations on your employer's part, as they fall outside the ordinary pay structure.
    `,
  },
  {
    slug: 'tax-obligations-after-leaving-australia',
    title: 'What happens to your Australian tax obligations after you leave the country?',
    description: 'Leaving Australia does not end your tax obligations there. Here is what you still need to do after you depart.',
    category: 'Medicare & Other',
    date: '4 August 2025',
    readTime: 4,
    ctaHeading: 'Leaving or already left Australia?',
    ctaBody: 'We help working holiday makers wrap up their Australian tax obligations from anywhere in the world. Tax returns, super claims, and everything in between.',
    ctaLabel: 'Get everything sorted',
    ctaHref: '/contact',
    body: `
Leaving Australia does not end your Australian tax obligations. If you earned income during an Australian financial year, you are required to lodge a tax return for that year regardless of whether you are still in the country. There are also super and administrative obligations worth being aware of before and after you leave.

## Lodging your tax return from overseas

Your [tax return](/tax-return) can be lodged from anywhere in the world through a registered tax agent. The deadline is 31 October following the end of the financial year in which you earned the income. If you use a registered tax agent, you may qualify for an extended deadline.

Do not assume that because you have left Australia you no longer need to file. The ATO has your income records from your employers and will be expecting a return. Failing to lodge when required can result in penalties.

## Claiming your superannuation

If superannuation contributions were made on your behalf during your time in Australia, you can apply for them back through the DASP process once your visa has expired and you have left the country. This can be done from overseas and does not require you to return to Australia. See our detailed guide on [how to apply for DASP](/guides/how-to-apply-for-super-back) for the full process.

## Cancelling your ABN

If you registered for an [ABN](/abn) during your time in Australia, cancel it through the Australian Business Register website once you are no longer carrying on business activities. This is a simple process and keeps the records accurate.

## Stay in contact with your tax agent

If you are using a registered tax agent, they can handle all communications with the ATO on your behalf after you leave. Make sure they have your current email address and preferred contact method before you depart.

## Updating your address with the ATO

If you have a registered address with the ATO in Australia, consider asking your tax agent to update it to an overseas address so any correspondence reaches you.
    `,
  },
  {
    slug: 'tax-residency-working-holiday-makers',
    title: 'Are working holiday makers tax residents of Australia?',
    description: 'Your tax residency status affects which tax rates apply to you. Most working holiday makers are non-residents for tax purposes, but the rules have nuances worth understanding.',
    category: 'Tax Return',
    date: '11 August 2025',
    readTime: 5,
    ctaHeading: 'Not sure about your tax residency status?',
    ctaBody: 'We help working holiday makers understand their tax situation and make sure the correct rates are applied. Get in touch and we will give you a straight answer based on your circumstances.',
    ctaLabel: 'Get in touch',
    ctaHref: '/contact',
    body: `
A Tax File Number Declaration form is what you give to each employer when you start work. It tells them your TFN, your residency status for tax purposes, and how much tax to withhold from your wages. Without it on file, your employer must apply the highest withholding rate of 47% regardless of your visa type.

## The working holiday maker tax framework

Since 2017, the Australian government has applied a specific tax framework to working holiday visa holders (subclass 417 and 462) that operates independently of the general residency rules. All income earned by working holiday makers is taxed at a flat rate of 15% up to 45,000 dollars per year. This applies whether you are technically a tax resident or non-resident under the general rules.

This means that for most practical purposes, the question of tax residency has less impact on your wages than it would for someone on a different visa. The 15% rate applies to your employment income either way.

## Why residency still matters in some situations

Despite the flat rate applying to wages, your residency status can still affect other aspects of your tax position. It can affect whether certain deductions are available to you, how investment income is treated if you have any, and whether you need to declare foreign income in your Australian tax return.

## The tax-free threshold does not apply

Regardless of how residency is classified, working holiday makers are not entitled to the tax-free threshold. Australian residents can earn up to 18,200 dollars before paying income tax. Working holiday makers pay 15% from the first dollar of earnings. This is set by the working holiday maker legislation and applies universally to this visa category.

## What to do at tax time

When you lodge your [tax return](/tax-return), you will be asked about your residency status. For working holiday visa holders, the correct selection is that you are a working holiday maker. This triggers the correct tax treatment. Using a [registered tax agent](/guides/what-is-a-tax-agent) ensures this is handled correctly and that no incorrect thresholds are accidentally applied.

## If your circumstances are more complex

If you have been in Australia for an extended period, have significant ties to Australia such as a long-term lease or a partner who is a resident, or have income from sources beyond employment, your residency position may be worth exploring further. These situations are less common for typical working holiday makers but do arise, and in those cases specific advice is the right approach.
    `,
  },

  // ─── NEW: TFN ──────────────────────────────────────────────────────────────
  {
    slug: 'how-to-update-address-with-ato',
    title: 'How to update your address with the ATO in Australia',
    description: 'If you move around Australia, keeping your address up to date with the ATO is important. Your TFN letter and any tax correspondence goes to the address on file.',
    category: 'TFN',
    date: '18 August 2025',
    readTime: 3,
    ctaHeading: 'Need help with your TFN or tax return?',
    ctaBody: 'We handle everything for working holiday makers — from TFN applications to tax returns — supervised by a registered tax agent.',
    ctaLabel: 'Get help from our team',
    ctaHref: '/tfn',
    body: `
If you move to a new address in Australia, you should update it with the [Australian Taxation Office (ATO)](https://www.ato.gov.au) as soon as possible. The ATO sends your TFN letter and any other important tax correspondence to the address on file. If that address is wrong, you could miss documents that matter.

## Why keeping your address updated matters

Your TFN is delivered by post to the address you provided on your application. If you have already moved, the letter will not follow you. Beyond the TFN itself, the ATO may send notices, assessments, or refund information to your address on file. Missing these can cause delays in getting your tax refund.

## How to update your address with the ATO

The easiest way to update your address is to contact a registered tax agent who can update your details with the ATO on your behalf.

A registered tax agent can also update your address with the ATO on your behalf if you are unable to do so directly.

## What address to use if you move frequently

If you are travelling between hostels or work placements, consider using a reliable address — such as a friend's place, a long-term hostel, or a postal address — rather than a temporary one. This reduces the risk of missing important correspondence.

## Does this affect your tax return?

Not directly. Your tax return is lodged electronically and your refund is paid into your bank account, not sent by post. However, any ATO notices or adjustment letters will go to the address on file, so it is still worth keeping it current. You can update your address at any time through the [ATO's online services](https://www.ato.gov.au/individuals-and-families/your-tax-return/how-to-lodge-your-tax-return).
    `,
  },

  // ─── NEW: Tax Return ───────────────────────────────────────────────────────
  {
    slug: 'what-is-a-tax-refund-australia',
    title: 'What is a tax refund and how do you know if you are owed one in Australia?',
    description: 'A tax refund is money the ATO pays back to you when you have paid more tax than you owed during the year. Most working holiday makers are owed one.',
    category: 'Tax Return',
    date: '25 August 2025',
    readTime: 4,
    ctaHeading: 'Find out how much you are owed',
    ctaBody: 'We calculate your refund and lodge your tax return correctly. Most working holiday makers receive a refund. Let us handle it for you.',
    ctaLabel: 'Start your tax return',
    ctaHref: '/tax-return',
    body: `
A tax refund is the money the [Australian Taxation Office (ATO)](https://www.ato.gov.au) pays back to you when the tax withheld from your wages during the year was more than your actual tax liability. In simple terms — if your employer took out too much tax, you get the difference back.

## Why most working holiday makers get a refund

Your employer withholds tax from every pay based on an estimate of what you will earn over a full year. But many working holiday makers do not work the full financial year, earn varying amounts across different jobs, or stop working partway through. This means the estimate is usually higher than your actual tax obligation — and you end up overpaying throughout the year.

When you lodge your [tax return](/tax-return), the ATO calculates what you actually owed and compares it to what was withheld. If you paid more than you owed, the difference is refunded to your bank account.

## How to know if you are owed a refund

The best way to know is to lodge a tax return. The ATO will calculate your position based on your income, the tax withheld, and any deductions or offsets you are entitled to. A registered tax agent can check your income and withholding figures directly through the ATO system.

As a general guide, if you earned under $45,000 as a working holiday maker and had tax withheld at 15%, you are likely owed a refund. The exact amount depends on your total income, how long you worked, and whether any deductions apply.

## When does the ATO pay your refund?

The [ATO](https://www.ato.gov.au/individuals-and-families/your-tax-return) typically processes returns and issues refunds within two weeks of lodgement if submitted electronically. If you use a registered tax agent, they may lodge on your behalf and the refund goes directly to your nominated bank account.

## Can you get a refund after leaving Australia?

Yes. You can lodge an Australian tax return from overseas and receive your refund into an Australian bank account or have it transferred internationally. The financial year runs from 1 July to 30 June, and returns can be lodged from 1 July onwards. There is no requirement to be in Australia to claim your refund.
    `,
  },
  {
    slug: 'how-long-does-tax-refund-take-australia',
    title: 'How long does it take to get a tax refund in Australia?',
    description: 'Most tax refunds in Australia are processed within two weeks of lodgement. Here is what affects the timeline and what to do if yours is taking longer.',
    category: 'Tax Return',
    date: '1 September 2025',
    readTime: 3,
    ctaHeading: 'Get your tax return lodged quickly',
    ctaBody: 'We lodge your return electronically through our registered tax agent. Most refunds arrive within two weeks of lodgement.',
    ctaLabel: 'Start your tax return',
    ctaHref: '/tax-return',
    body: `
Once you lodge your Australian tax return electronically, the [ATO](https://www.ato.gov.au) typically processes it and issues your refund within two weeks. In many cases it is faster — sometimes within a few days. However, several factors can affect this timeline.

## What affects how quickly you get your refund

The main factor is how you lodge. Lodging through a registered tax agent is the fastest method and typically results in processing within two to three weeks. Paper returns take significantly longer, often eight weeks or more.

The time of year also matters. The ATO receives a large volume of returns shortly after 1 July when the new financial year begins. Lodging early in July or waiting until later in the year tends to result in faster processing than lodging during the peak period in August and September.

If your return is selected for a manual review or if there are discrepancies between your return and information the ATO holds — such as income that does not match your employer's records — processing will take longer.

## How to check your refund status

If you lodged through a registered tax agent, they can check the progress of your return on your behalf and let you know when it has been processed.

## What if your refund is taking longer than expected?

If it has been more than 28 days since you lodged and you have not received your refund, you can contact the [ATO on 13 28 61](https://www.ato.gov.au/about-ato/contact-us) to follow up. Make sure your bank account details on file with the ATO are correct, as an incorrect BSB or account number will delay or redirect your payment.

## Refunds after leaving Australia

If you have already left Australia, your refund will be deposited into the Australian bank account you nominated on your tax return. If that account is now closed, contact the ATO to update your details before the refund is processed.
    `,
  },

  // ─── NEW: Super ────────────────────────────────────────────────────────────
  {
    slug: 'super-for-casual-and-part-time-workers',
    title: 'Are casual and part-time workers entitled to superannuation in Australia?',
    description: 'Yes. Casual and part-time workers are entitled to superannuation in Australia regardless of how many hours they work, as long as they meet the earnings threshold.',
    category: 'Super',
    date: '8 September 2025',
    readTime: 4,
    ctaHeading: 'Claim your super before you leave',
    ctaBody: 'We help working holiday makers claim their superannuation back through the DASP process. Fully online, handled by our registered team.',
    ctaLabel: 'Start your super claim',
    ctaHref: '/superannuation',
    body: `
Casual and part-time workers in Australia are entitled to superannuation contributions from their employer, provided they meet the minimum earnings threshold. This applies to working holiday makers just as it does to any other worker.

## What is the earnings threshold?

From 1 July 2022, the minimum monthly earnings threshold for superannuation was removed entirely. This means that regardless of how many hours you work or how much you earn in a given month, your employer must pay super on your earnings if you are 18 or over. Previously there was a $450 per month threshold, but this no longer applies.

The current super rate is 11.5% of your ordinary time earnings, paid on top of your wage. This is set by the [ATO](https://www.ato.gov.au/individuals-and-families/super-for-individuals-and-families/super/growing-and-keeping-track-of-your-super/how-much-super-your-employer-must-pay) and increases incrementally each year.

## Does this apply to casual workers?

Yes. Being casual does not exempt your employer from paying super. Whether you work one shift a week or five, your employer is required to contribute to your super fund based on your earnings. The same rules apply to part-time workers.

## How to check your employer is paying super

You can check your super balance by contacting your super fund directly. Your payslip should also show the super contribution amount your employer is paying. If you need help tracking your balance, our team can assist.

If you believe your employer is not paying your super correctly, you can report it to the [ATO](https://www.ato.gov.au/individuals-and-families/super-for-individuals-and-families/super/unpaid-super) or contact the [Fair Work Ombudsman](https://www.fairwork.gov.au) for guidance on your rights.

## Can you claim your super back when you leave Australia?

Yes. As a working holiday maker, you are entitled to claim your superannuation back when you leave Australia permanently through the [Departing Australia Superannuation Payment (DASP)](https://www.ato.gov.au/individuals-and-families/super-for-individuals-and-families/super/withdrawing-and-using-your-super/departing-australia-superannuation-payment-dasp) process. Tax is withheld on the payment, but the remaining amount is paid to you directly.
    `,
  },

  // ─── NEW: Work Rights ──────────────────────────────────────────────────────
  {
    slug: 'employer-asking-you-to-work-more-than-visa-allows',
    title: 'What to do if your employer asks you to work more hours than your visa allows',
    description: 'Working more than your visa allows can put your visa at risk. Here is what the rules say and what to do if your employer is pressuring you to breach them.',
    category: 'Work Rights',
    date: '15 September 2025',
    readTime: 4,
    ctaHeading: 'Questions about your tax and visa situation?',
    ctaBody: 'We help working holiday makers navigate their tax obligations correctly. Get in touch for straightforward advice.',
    ctaLabel: 'Talk to our team',
    ctaHref: '/tax-return',
    body: `
Working holiday visas in Australia come with conditions that limit how long you can work for the same employer. Breaching these conditions can affect your visa. If your employer is asking you to work more than the rules allow, it is important to understand your rights.

## What are the work hour rules on a working holiday visa?

The Working Holiday Visa (subclass 417) and the Work and Holiday Visa (subclass 462) allow you to work for any employer in Australia, but there is a condition: you cannot work for the same employer for more than six months without written permission from the Department of Home Affairs.

There is no weekly hour limit for most working holiday makers. The restriction is about duration with a single employer, not the number of hours per week. However, under [Fair Work](https://www.fairwork.gov.au) rules, full-time employees should not regularly work more than 38 hours per week plus reasonable additional hours.

## What counts as the same employer?

The six-month limit applies to working for the same employer at the same location. Moving to a different branch or location of the same business may still count as the same employer depending on the circumstances. If you are unsure, check with the [Department of Home Affairs](https://immi.homeaffairs.gov.au) or seek advice before continuing.

## What to do if your employer is pressuring you

You have the right to refuse work that would breach your visa conditions. Your employer cannot force you to work beyond what your visa allows. If you feel pressured, document the request in writing and consider contacting the [Fair Work Ombudsman](https://www.fairwork.gov.au/contact-us) anonymously. They provide free advice and can investigate employer conduct.

You should also be aware that it is illegal for an employer to exploit visa holders. The [Fair Work Act](https://www.fairwork.gov.au/about-us/legislation) protects all workers in Australia regardless of visa status.

## Can you extend the six-month period?

In some circumstances, you can apply to the Department of Home Affairs for permission to continue working for the same employer beyond six months. This is uncommon but possible. Check the [Department of Home Affairs website](https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/work-holiday-417) for current guidance.
    `,
  },
  {
    slug: 'farm-work-rights-working-holiday-australia',
    title: 'Your work rights during farm work in Australia on a working holiday visa',
    description: 'Farm work is one of the most common jobs for working holiday makers. Here is what you are legally entitled to, including pay rates, conditions, and protections.',
    category: 'Work Rights',
    date: '22 September 2025',
    readTime: 5,
    ctaHeading: 'Need help with your tax after farm work?',
    ctaBody: 'Farm work income is taxed like any other work in Australia. We handle your tax return correctly so you get back everything you are owed.',
    ctaLabel: 'Start your tax return',
    ctaHref: '/tax-return',
    body: `
Farm work — including fruit picking, harvesting, and other agricultural work — is one of the most common types of employment for working holiday makers in Australia. It also has a history of wage theft and poor conditions. Understanding your legal rights before you start is essential.

## What are you entitled to as a farm worker?

All workers in Australia, including those on working holiday visas, are covered by the [Fair Work Act](https://www.fairwork.gov.au/about-us/legislation). This means you are entitled to at least the national minimum wage, safe working conditions, and protection from exploitation.

For most farm work, the relevant award is the [Horticulture Award](https://www.fairwork.gov.au/employment-conditions/awards/awards-list), which sets minimum pay rates for piece work (paid per bin or kilogram) and hourly work. Your employer must pay whichever is higher — the piece rate or the minimum hourly rate.

## Piece rates and minimum pay

Many farms pay by piece rate — per bin picked, per kilogram harvested. This is legal, but your total pay for any hour must equal at least the minimum hourly rate under the Horticulture Award. If you are picking slowly on a bad day and your piece rate earnings fall below minimum wage for that hour, your employer must top up your pay.

If you are unsure what rates apply to your work, check the [Fair Work Ombudsman's pay calculator](https://calculate.fairwork.gov.au) or call them on 13 13 94.

## Deductions from your pay

Some employers deduct costs for accommodation, transport, or meals from your wages. This is only legal if you have agreed to it in writing and the deductions are reasonable. Deductions that bring your pay below the minimum wage are illegal. The [Fair Work Ombudsman](https://www.fairwork.gov.au/pay-and-wages/deducting-pay-and-wages) provides clear guidance on what deductions are permitted.

## What to do if you are not being paid correctly

Keep records of your hours, your pay slips, and any written agreements about deductions. If you believe you are being underpaid, contact the [Fair Work Ombudsman](https://www.fairwork.gov.au/contact-us). Reports can be made anonymously and your visa status will not be used against you for making a complaint.

The ATO also has a [tip-off line](https://www.ato.gov.au/about-ato/contact-us/report-tax-evasion-or-crime) if your employer is paying cash in hand without reporting it properly.
    `,
  },

  // ─── NEW: Medicare & Other ─────────────────────────────────────────────────
  {
    slug: 'what-is-superannuation-guarantee-charge',
    title: 'What is the Superannuation Guarantee Charge and what does it mean for you?',
    description: 'If your employer fails to pay your super correctly, the ATO can charge them the Superannuation Guarantee Charge. Here is how it works and what it means for your super.',
    category: 'Medicare & Other',
    date: '29 September 2025',
    readTime: 4,
    ctaHeading: 'Make sure your super is paid before you leave',
    ctaBody: 'We help working holiday makers track and claim their superannuation correctly before they leave Australia.',
    ctaLabel: 'Start your super claim',
    ctaHref: '/superannuation',
    body: `
The Superannuation Guarantee Charge (SGC) is a penalty the [Australian Taxation Office (ATO)](https://www.ato.gov.au/businesses-and-organisations/super-for-employers/paying-super-contributions/superannuation-guarantee-charge) applies to employers who fail to pay their employees' superannuation correctly or on time.

## What triggers the SGC?

The SGC applies when an employer does not pay the required super contributions — currently 11.5% of ordinary time earnings — by the quarterly due date. The charge is more expensive than simply paying the super on time, which is designed to discourage non-payment.

The SGC includes the unpaid super amount, an interest component of 10% per year, and an administration fee. Unlike regular super contributions, SGC payments are not tax-deductible for the employer, making it a costly penalty.

## What happens to your super if the SGC is charged?

If your employer is charged the SGC because they did not pay your super, the [ATO](https://www.ato.gov.au) collects the charge from the employer and then distributes the super portion to your nominated super fund. This means your super is eventually protected even if your employer initially failed to pay it.

## How do you know if your employer is behind on super?

Check your super fund balance regularly by contacting your fund directly or asking our team to check on your behalf. Super is paid quarterly, so if several months pass with no contributions appearing, it may be a sign that your employer has not paid.

You can also report suspected non-payment to the [ATO](https://www.ato.gov.au/individuals-and-families/super-for-individuals-and-families/super/unpaid-super). The ATO investigates these reports and can pursue employers on your behalf.

## Does this affect your DASP claim?

If your employer owes you super that has not yet been paid, it may not appear in your super fund when you apply for your [Departing Australia Superannuation Payment (DASP)](/guides/what-is-dasp-super-withdrawal). Make sure all contributions are showing in your account before you submit your DASP claim. If contributions are missing, report them to the ATO before you leave.
    `,
  },

  // ─── TFN – NEW ─────────────────────────────────────────────────────────────
  {
    slug: 'tfn-reference-number-before-tfn-arrives',
    title: 'What is a TFN reference number and can you work before your TFN arrives?',
    description: 'You applied for your TFN but it has not arrived yet. Here is what a reference number is, how to use it, and what your employer needs to know.',
    category: 'TFN' as const,
    date: '6 October 2025',
    readTime: 4,
    ctaHeading: 'Need help with your TFN application?',
    ctaBody: 'We handle TFN applications for working holiday makers every day. Fast, simple, and supervised by a registered tax agent.',
    ctaLabel: 'Apply for your TFN with us',
    ctaHref: '/tfn-form',
    body: `
When you apply for a Tax File Number online through the ATO, you do not have to sit and wait 28 days before you can start working. The ATO issues a reference number immediately upon submission of your application. This number is not your TFN, but it proves that your application is in progress and allows your employer to set up your pay in the meantime.

## What is the TFN reference number?

The reference number is a temporary identifier you receive the moment you complete your TFN application online. It usually appears on the confirmation screen at the end of the application and is also sent to the email address you provided. It looks like a standard reference code and is separate from your actual nine-digit TFN.

Think of it as a receipt. It tells your employer and the ATO that you have done the right thing and are waiting on the system to process your application.

## Can you legally start work using only the reference number?

Yes. As a working holiday maker, you are entitled to begin employment before your TFN arrives, provided you supply your employer with the reference number and then give them your actual TFN as soon as it is issued. Your employer should note the reference number in their payroll system and apply the correct 15% working holiday maker tax rate from day one.

The key thing is not to delay providing the reference number. If you start work and give your employer nothing at all, they are legally required to withhold tax at the highest rate of 47% until a TFN is on file. The reference number prevents that from happening.

## How long before the actual TFN arrives?

The ATO typically processes TFN applications within 28 business days. In practice, many working holiday makers receive theirs sooner, sometimes within two weeks. The TFN is sent by mail to the Australian address you provided on your application, so make sure that address is somewhere you will actually be staying and can collect post.

You can also call the ATO on 13 28 61 approximately seven days after submitting your application to ask whether your TFN has been issued. Have your reference number ready when you call.

## What to do once your TFN arrives

As soon as your TFN arrives in the post, give it to your employer immediately. They will complete or update your Tax File Number Declaration form with the correct number. From that point, everything is linked properly in the ATO's system and your tax records are attached to your actual TFN rather than the temporary reference.

If you have changed address since applying, or if your mail has gone to a property you have already left, contact the ATO to update your details and request that your TFN be reissued.

## Keep your reference number safe

Do not throw away the confirmation email from your TFN application. The reference number may be needed if there are any delays or if you need to follow up with the ATO. It is also useful if you are starting multiple jobs quickly and need to provide something to each employer before the TFN arrives.

Once your TFN is issued, the reference number becomes irrelevant. But in the weeks before it arrives, it is genuinely useful for making sure your pay is processed at the right rate from the start.
    `,
  },
  {
    slug: 'tax-free-threshold-working-holiday-visa',
    title: 'Can working holiday makers claim the tax-free threshold in Australia?',
    description: 'The tax-free threshold sounds like it would save you money. For working holiday makers, claiming it actually creates a tax debt. Here is why.',
    category: 'TFN' as const,
    date: '13 October 2025',
    readTime: 4,
    ctaHeading: 'Want to make sure your tax is set up correctly?',
    ctaBody: 'We review your tax situation and fix anything that is not right. Talk to our team before the end of the financial year.',
    ctaLabel: 'Talk to our team on WhatsApp',
    ctaHref: '/tfn-form',
    body: `
When you start a new job in Australia and fill in your Tax File Number Declaration form, you will be asked whether you want to claim the tax-free threshold. For most working holiday visa holders, the answer is no. Claiming it is one of the most common and costly mistakes backpackers make when they first arrive.

## What is the tax-free threshold?

The tax-free threshold is a provision for Australian tax residents that allows the first $18,200 of income earned each financial year to be received completely tax-free. It exists because Australia uses a progressive tax system, and residents with low incomes are given this concession to reduce their overall tax burden.

It is a genuine benefit, but it is designed for Australian residents, not for temporary visa holders on working holiday visas.

## Why working holiday makers cannot claim it

Working holiday makers are taxed under a separate and specific rate structure. The flat 15% rate that applies to your income exists precisely because you are not a tax resident in the same way a permanent resident or citizen is. The tax-free threshold is part of the resident rate system, which operates differently.

When you claim the tax-free threshold as a working holiday maker, your employer withholds less tax than you actually owe. It looks like more money in your pocket each week, but it creates a gap between what has been withheld and what the ATO expects you to have paid by the end of the year. That gap becomes a tax debt when you lodge your [tax return](/tax-return).

## What the mistake looks like in practice

Imagine you earn $1,000 per week. With the correct 15% working holiday maker rate applied, your employer withholds $150 in tax. If the tax-free threshold has been incorrectly claimed, your employer may withhold significantly less, sometimes nothing at all at lower income levels.

At the end of the financial year, the ATO calculates what you actually owed based on your total income and your visa status. If there is a shortfall, you are required to pay the difference. What should have been a refund turns into a bill.

## How to fix it if you have already claimed the threshold

Submit a new TFN declaration form to your employer with the correct answer. Select Working Holiday Maker for the residency question and No for the tax-free threshold question. Your employer will update their payroll going forward.

The tax already paid at the wrong rate will be reconciled when you lodge your return at the end of the financial year. The earlier you correct the form, the smaller the adjustment needed at year end.

## The bottom line

Do not claim the tax-free threshold on a working holiday visa. It is not a benefit available to you and claiming it creates problems rather than solving them. The correct setup is simple: select Working Holiday Maker for residency and No for the threshold. Every payslip will then reflect the correct 15% rate, and there will be no surprise debt waiting at the end of the year.
    `,
  },

  // ─── WORK RIGHTS – NEW ─────────────────────────────────────────────────────
  {
    slug: 'white-card-australia-working-holiday',
    title: 'What is a White Card and do you need one on a working holiday visa?',
    description: 'If you want to work in construction in Australia, you need a White Card before your first day on site. Here is what it is, how to get it, and what it costs.',
    category: 'Work Rights' as const,
    date: '20 October 2025',
    readTime: 4,
    ctaHeading: 'Questions about working in Australia?',
    ctaBody: 'Our team helps working holiday makers understand their rights and obligations. Talk to us on WhatsApp any time.',
    ctaLabel: 'Talk to our team on WhatsApp',
    ctaHref: '/contact',
    body: `
If you are planning to work on a construction site in Australia, whether that is building, civil works, landscaping, or any hands-on trade role, you need a White Card before you step foot on site. It is a legal requirement, not a suggestion, and no legitimate employer will allow you to start without one.

## What is a White Card?

The White Card, officially called the Construction Induction Training card, is a certification that proves you have completed workplace health and safety training relevant to the construction industry. It was introduced to reduce the rate of injuries and fatalities on Australian construction sites, which historically have been among the most dangerous work environments in the country.

The card confirms that you understand on-site hazards, emergency procedures, your rights and responsibilities as a worker, and how to identify and report unsafe conditions. It does not qualify you to perform any specific trade — it is purely a safety credential that is required of everyone working on a construction site.

## Who needs one?

Anyone who performs construction work in Australia. This includes labourers, carpenters, plumbers, electricians, landscapers, scaffolders, and anyone else working on a site. It also applies to people who regularly visit construction sites as part of their job.

As a working holiday maker, if you are doing fruit picking, hospitality, or office work, you do not need a White Card. But if someone offers you construction work, even short-term casual labouring, you will need one before you start.

## How to get a White Card

You complete a short training course through a registered training organisation (RTO). The course can be done in person or online, depending on the state you are in. It typically takes between four and eight hours and covers the core safety content required by Australian law.

The cost is around $100, though prices vary between providers. Once you complete the course and pass the assessment, your White Card is issued, usually within a few days.

## Is the White Card valid across all states?

Generally yes. The White Card is nationally recognised across most of Australia, meaning a card issued in Queensland is valid for work in New South Wales, Victoria, and elsewhere. However, Western Australia has historically operated a separate system, so it is worth confirming acceptance if you are heading there.

## How long does it last?

The White Card does not expire. Once issued, it is valid for life, provided you received it through a registered training organisation. Keep it safe and carry it to any construction job.

## Can you claim the cost as a tax deduction?

Yes. If you completed the White Card course to qualify for or maintain employment in construction, the course cost is a legitimate [work-related tax deduction](/guides/tax-deductions-working-holiday-makers). Keep your receipt and include it when you lodge your [tax return](/tax-return).
    `,
  },
  {
    slug: 'rsa-certificate-australia-working-holiday',
    title: 'What is an RSA certificate and do you need one to work in hospitality in Australia?',
    description: 'Working in a bar, pub, or bottle shop in Australia requires an RSA certificate. Here is what the course involves, what it costs, and how to get one as a working holiday maker.',
    category: 'Work Rights' as const,
    date: '27 October 2025',
    readTime: 4,
    ctaHeading: 'Questions about working rights on a working holiday visa?',
    ctaBody: 'Our team is available on WhatsApp to help you understand what you need before you start a new job in Australia.',
    ctaLabel: 'Talk to our team on WhatsApp',
    ctaHref: '/contact',
    body: `
Hospitality is one of the most popular industries for working holiday makers in Australia. Bars, pubs, restaurants, nightclubs, and bottle shops are almost always hiring, the hours suit a flexible lifestyle, and the pay can be good. But if you want to serve or sell alcohol, you need a Responsible Service of Alcohol certificate, known as an RSA, before you start.

## What is the RSA?

The RSA is a short certification course that trains workers in the responsible service of alcohol. It is a legal requirement across Australia for anyone involved in selling, serving, or supplying alcohol. The course covers how to identify signs of intoxication, how to refuse service, the legal obligations of staff and venue operators, and how to prevent alcohol-related harm.

Without an RSA, you cannot legally serve a drink at a licensed venue.

## Who needs it?

Any working holiday maker who wants to work in a role that involves alcohol service. This includes bar staff, waitstaff in licensed restaurants, bottle shop employees, and event staff serving alcohol. If you are applying for a job at a pub or bar and do not have an RSA, your application will likely not proceed.

## How to get an RSA

You complete a course through a registered training provider. The course can be done online or in a classroom. The online version typically takes three to five hours. The cost is around $90, though this varies by state and provider. Some employers will cover the cost if they are hiring you, so it is worth asking before you pay.

## Is it valid in every state?

RSA certificates are issued at a state level, and they are not automatically recognised in other states. A certificate obtained in Victoria may not be valid for work in Queensland. If you plan to work in hospitality across multiple states, you may need to complete the course again in each new state.

## How long does it last?

This varies by state. In some states the RSA does not expire, while in others it must be renewed every few years. Confirm the validity period with your provider when you complete the course.

## Can you claim the cost as a tax deduction?

Yes. If you completed the RSA course to obtain or maintain employment in hospitality, it qualifies as a [work-related deduction](/guides/tax-deductions-working-holiday-makers). Keep your receipt and include it in your [tax return](/tax-return).
    `,
  },
  {
    slug: 'wwcc-working-with-children-check-australia',
    title: 'What is a Working With Children Check and do you need one on a working holiday visa?',
    description: 'If you want to work with children in Australia, a WWCC is required before you start. Here is what it involves, how long it takes, and how to apply as a working holiday maker.',
    category: 'Work Rights' as const,
    date: '3 November 2025',
    readTime: 4,
    ctaHeading: 'Questions about working rights on a working holiday visa?',
    ctaBody: 'Our team helps working holiday makers understand what is required before starting work in Australia. Talk to us on WhatsApp.',
    ctaLabel: 'Talk to our team on WhatsApp',
    ctaHref: '/contact',
    body: `
If you are planning to work with children in Australia — whether in childcare, education, tutoring, sports coaching, or youth programmes — you will almost certainly need a Working With Children Check before you start. It is a background screening process designed to protect children, and it is a legal requirement across all Australian states and territories.

## What is a Working With Children Check?

A WWCC is a risk assessment conducted by the relevant government authority in each state. It examines factors including your criminal history, any findings of inappropriate behaviour involving children, and other relevant records. The purpose is to identify people who pose an unacceptable risk to children before they are placed in roles involving regular contact with minors.

Unlike a simple police check, the WWCC is an ongoing assessment. Your record continues to be monitored after the check is issued, meaning authorities can revoke a WWCC if new information comes to light.

## Who needs one?

Anyone in a paid or volunteer role that involves direct contact with children on a regular basis. Common roles include childcare workers, teachers and teacher assistants, tutors, sports coaches, camp workers, youth programme staff, and au pairs.

As a working holiday maker taking on any of these roles, you will need a WWCC. Most employers will not let you start without one.

## How to apply

The application process is managed at a state level, so the exact steps differ depending on where you are. In most states, you apply online, pay the application fee (typically around $80 for paid workers, free for volunteers), and then attend an identity verification appointment at a participating outlet such as Australia Post.

Processing times vary, but most applications are decided within a few weeks.

## Is it valid across states?

No. Each state issues its own WWCC and they are not automatically transferable. If you move from New South Wales to Victoria, you will generally need to apply for a new check. Always confirm with your employer and the relevant state authority.

## How long does it last?

Typically between three and five years depending on the state. After expiry, you must renew before continuing in child-related work.

## A note for working holiday makers

Working holiday visa holders are eligible to apply for a WWCC in Australia. Because the check involves identity verification and address confirmation, start the process as early as possible to avoid delays before your first day of work.
    `,
  },
  {
    slug: 'public-holidays-australia-working-holiday',
    title: 'Public holidays in Australia: what working holiday makers need to know',
    description: 'Public holidays in Australia come with higher pay rates and different rules depending on your employment type. Here is everything working holiday makers need to know.',
    category: 'Work Rights' as const,
    date: '10 November 2025',
    readTime: 5,
    ctaHeading: 'Think your pay is not right?',
    ctaBody: 'We help working holiday makers check whether they are being paid correctly. Talk to our team on WhatsApp.',
    ctaLabel: 'Talk to our team on WhatsApp',
    ctaHref: '/contact',
    body: `
Public holidays in Australia are paid differently from regular working days, and as a working holiday maker you are entitled to the same penalty rates as any other worker. Understanding how public holidays work is important for making sure you are paid correctly and for knowing your rights if your employer asks you to work on one.

## National public holidays

Australia has a set of public holidays that apply across the entire country regardless of which state you are in. These include New Year's Day on 1 January, Australia Day on 26 January, Good Friday and Easter Monday which vary each year, ANZAC Day on 25 April, Christmas Day on 25 December, and Boxing Day on 26 December.

The King's Birthday is also a national public holiday, but the date on which it is observed varies by state. In most states it falls in June, but in Western Australia and Queensland it is observed at different times of the year.

## State-specific public holidays

In addition to the national holidays, each state and territory has its own public holidays. Melbourne Cup Day is a public holiday in Victoria but not elsewhere. The Royal Queensland Show (the Ekka) is a public holiday in Brisbane. Labour Day falls on different dates in different states.

As a working holiday maker moving between states, check the specific public holidays for wherever you are currently based. The Fair Work website maintains an up-to-date list by state.

## What pay rate applies on public holidays?

If you work on a public holiday, you are generally entitled to a penalty rate on top of your normal hourly wage. The exact rate depends on your award, but in most industries the public holiday rate is 225% of your ordinary rate — double time and a quarter. This applies to both full-time and casual employees.

## What if you are asked not to work on a public holiday?

Under the Fair Work Act, employers can request employees to work on a public holiday, but employees have the right to refuse if the request is unreasonable. A refusal cannot be used as grounds for termination.

## Do you get a day off in lieu?

If a public holiday falls on one of your regular working days and you do not work, you are entitled to take that day off with ordinary pay. If you do work, you are paid at the penalty rate.

## Overtime on public holidays

Because public holidays already attract the maximum penalty rate, there is generally no additional overtime loading for hours beyond your normal shift on that day. The public holiday rate applies to all hours worked.

## Keeping track of what you are owed

On any week with a public holiday, check your payslip carefully. The public holiday rate should appear separately from your regular hours. If you believe you have been underpaid, contact [Fair Work Australia](https://www.fairwork.gov.au) or reach out to our team.
    `,
  },
  {
    slug: 'casual-shift-cancellation-rules-australia',
    title: 'Can your employer cancel your casual shift in Australia?',
    description: 'As a casual worker in Australia, your shifts can be cancelled, but your employer must follow specific rules. Here is what the law says and what you are entitled to.',
    category: 'Work Rights' as const,
    date: '17 November 2025',
    readTime: 4,
    ctaHeading: 'Think your rights are not being respected?',
    ctaBody: 'We help working holiday makers understand their entitlements. Talk to our team on WhatsApp if something does not seem right.',
    ctaLabel: 'Talk to our team on WhatsApp',
    ctaHref: '/contact',
    body: `
Most working holiday makers in Australia work as casual employees. Casual work offers flexibility for both worker and employer, but it also comes with specific rules around shift cancellations and minimum pay. Knowing these rules means you are less likely to lose income unnecessarily.

## Can a casual shift be cancelled?

Yes, but not without consequences. Under Australian workplace law, if an employer cancels a casual shift, they should give the employee reasonable notice. If a shift is cancelled with less than 24 hours notice and you had already made arrangements to attend, you are generally entitled to payment for a minimum number of hours.

## What is the minimum shift payment?

In most industries covered by a Modern Award, the minimum engagement for a casual employee is two to three hours. This means that if you arrive at work and your employer sends you home immediately, or if your shift is cancelled with very short notice, you are generally entitled to payment for those minimum hours regardless.

The exact minimum varies by industry and the award that covers your role. The Fair Work website has a pay calculator that lets you check the specific rules for your industry.

## What if you are sent home early?

If you are mid-shift and your employer asks you to leave early, the same minimum engagement rules apply. Unless you have already worked more than the minimum number of hours, your employer must pay you up to that minimum.

## Are you entitled to sick pay if you cannot come in?

No. Casual employees in Australia are not entitled to paid sick leave. You receive a higher hourly rate than permanent employees — the casual loading — which compensates for the absence of leave entitlements. If you cannot attend a shift due to illness, you are not paid for that shift.

## No minimum number of shifts per week

Your employer is not required to guarantee you a certain number of shifts each week. Casual employment means you work when the business needs you. If shifts dry up, there is generally no legal remedy unless you can demonstrate you have become a de facto regular employee over a long period.

## Practical steps if your shifts are being cancelled

Keep a record of your roster, any communications about shift changes, and the notice period given. If you are not receiving your minimum engagement payment after a short-notice cancellation, raise it directly with your employer. If that does not resolve it, you can lodge a complaint with [Fair Work Australia](https://www.fairwork.gov.au) at no cost.
    `,
  },
  {
    slug: 'six-month-employer-rule-working-holiday-visa',
    title: 'The 6-month rule: how long can you work for the same employer on a working holiday visa?',
    description: 'Working holiday visa holders are limited to six months with the same employer. Here is what the rule means, what counts as the same employer, and what exceptions exist.',
    category: 'Work Rights' as const,
    date: '24 November 2025',
    readTime: 5,
    ctaHeading: 'Questions about your working holiday visa conditions?',
    ctaBody: 'Our team helps working holiday makers understand their visa obligations. Talk to us on WhatsApp.',
    ctaLabel: 'Talk to our team on WhatsApp',
    ctaHref: '/contact',
    body: `
One of the visa conditions that catches many working holiday makers off guard is the six-month rule. Working holiday visa subclass 417 and 462 holders are generally limited to working for any single employer for a maximum of six months. Exceeding this limit without permission is a breach of your visa conditions and can have serious consequences.

## What does the six-month rule mean in practice?

Once you have worked for an employer for a combined total of six months, you must stop working for them unless you have applied for and received specific permission to continue. The six months do not have to be consecutive. If you work for an employer for three months, leave, and return later, the time you worked before still counts toward your six-month limit with that employer.

The rule is a condition of the visa itself, administered by the Department of Home Affairs. A breach can affect your ability to extend your visa or return to Australia in the future.

## What counts as the same employer?

A single employer is generally defined by their ABN. If a business operates multiple venues or locations under the same ABN, working across those locations may still count toward the same six-month limit. Two businesses with different ABNs are generally considered different employers.

Franchise arrangements can be complicated. If two franchise locations are operated by different owners with different ABNs, they are likely considered different employers. But if the same owner operates multiple sites under a single ABN, it is likely the same employer for visa purposes.

## Can you get an extension?

Yes. In certain circumstances you can apply to the Department of Home Affairs for permission to continue working with the same employer beyond six months. These exceptions are generally granted for shortage occupations or regional work where the employer can demonstrate a genuine need.

You must apply before the six months is up. Working beyond the limit without approval is still a breach, even if you intend to apply.

## What about the second-year visa extension?

The six-month rule is separate from the 88-day regional work requirement. You can complete your 88 days with a single employer in a regional area, and the six-month rule still applies to your total time with them. If your employer wants to keep you beyond six months, seek an extension if necessary.

## Practical tips for staying compliant

Keep a record of the dates you start and finish with each employer. A simple note in your phone with employer name, start date, and end date is enough. If you are unsure whether two businesses count as the same employer, check the ABN on your payslips.
    `,
  },

  // ─── GENERAL / PRACTICAL – NEW ────────────────────────────────────────────
  {
    slug: 'opening-bank-account-australia-working-holiday',
    title: 'How to open a bank account in Australia as a working holiday maker',
    description: 'You need an Australian bank account before your first pay arrives. Here is which banks to consider, what documents you need, and when to close the account before you leave.',
    category: 'Medicare & Other' as const,
    date: '1 December 2025',
    readTime: 5,
    ctaHeading: 'Need help getting set up in Australia?',
    ctaBody: 'Our team helps working holiday makers with TFN, tax, and general financial set-up from day one. Talk to us on WhatsApp.',
    ctaLabel: 'Talk to our team on WhatsApp',
    ctaHref: '/contact',
    body: `
Opening an Australian bank account is one of the first things you should do after arriving. Your employer will need your Australian bank details to process your pay, your superannuation will be deposited into a fund account, and any tax refund from the ATO will be sent to an Australian account. Getting this set up early makes everything else simpler.

## Which bank should you choose?

The three largest banks in Australia are Commonwealth Bank, Westpac, and ANZ. All three are well-established, have widespread ATM networks, and offer standard transaction accounts suitable for working holiday makers. There is no significant difference between them in terms of basic functionality. The best one is whichever is most convenient for your location.

Some working holiday makers also use international accounts like Wise for sending money home at better exchange rates. For receiving Australian wages and dealing with the ATO, a standard Australian bank account is recommended.

## What documents do you need?

To open a bank account you will typically need your passport, an Australian residential address, and an Australian phone number. Your TFN is useful to provide but is not usually required at the time of opening. You can give it to the bank after it arrives in the post.

Most banks allow you to start the application online before arriving in Australia, meaning your account can be partially set up and ready to activate when you land. You will still need to visit a branch in person at some point to complete identity verification.

## Are there monthly fees?

Most major Australian banks charge a monthly account fee of around $5. This fee is typically waived if you deposit a minimum amount each month, usually around $2,000. For most working holiday makers receiving a regular wage, this threshold is easy to meet.

## When should you close your Australian bank account?

Do not close it too early. You need an active Australian bank account to receive your [tax refund](/tax-return) from the ATO and your [superannuation withdrawal](/guides/what-is-dasp-super-withdrawal) through the DASP process. Both can take weeks or months after you leave Australia to be processed.

Leave the account open until all outstanding payments have been received. Once your tax refund and super have arrived, transfer the balance home and close the account.

## A note on fraud and scams

The ATO will never ask you to update your bank details via a text message or email link. Any communication asking you to click a link and enter your banking information should be treated as a scam. If in doubt, call the ATO directly on 13 28 61.
    `,
  },
  {
    slug: 'trs-tourist-refund-scheme-australia',
    title: 'The Tourist Refund Scheme: how to claim GST back on purchases before leaving Australia',
    description: 'If you bought goods in Australia worth $300 or more, you may be able to claim back the 10% GST before you fly home. Here is how the TRS works and what you need to claim.',
    category: 'Medicare & Other' as const,
    date: '8 December 2025',
    readTime: 5,
    ctaHeading: 'Questions about tax and money before leaving Australia?',
    ctaBody: 'Our team helps working holiday makers get everything sorted before departure. Talk to us on WhatsApp.',
    ctaLabel: 'Talk to our team on WhatsApp',
    ctaHref: '/contact',
    body: `
Most working holiday makers spend a significant amount on goods during their time in Australia. Electronics, outdoor gear, clothing, cameras — these purchases often include GST, which is the 10% goods and services tax applied to most products sold in Australia. What many backpackers do not realise is that you may be able to claim that GST back before you leave the country through the Tourist Refund Scheme.

## What is the Tourist Refund Scheme?

The Tourist Refund Scheme, known as TRS, is a programme run by the Australian Border Force that allows tourists and certain visa holders to claim a refund of the GST paid on goods purchased in Australia. It is designed for people who are leaving the country and taking the goods with them.

## Who can claim?

Any person departing Australia by air or sea can apply, including working holiday visa holders. The key requirement is that you are leaving and taking the goods with you.

## What purchases qualify?

To be eligible, the following conditions must be met: you must have purchased the goods from a single business under a single ABN, the total invoice amount including GST must be at least $300, the purchase must have been made within 60 days of your departure, the goods must be available for inspection at the airport, and the goods must be physical goods rather than services.

Most physical goods qualify: electronics, cameras, luggage, clothing, and watches. Consumables such as food, alcohol, and tobacco are generally excluded.

## What documents do you need?

You need your passport, your airline ticket or boarding pass, and the original tax invoice for each purchase. The tax invoice must clearly show the seller's ABN, the amount of GST paid, and a description of the goods. If the invoice total exceeds $1,000, your full name must appear on it.

Keep all receipts from significant purchases throughout your time in Australia.

## How to make a claim

Claims are made at the TRS facility at the international airport before you pass through customs. You show your goods, present your documents, and complete the claim. Processing takes around 15 minutes.

Refunds can be paid to an Australian bank account, an international bank account, or as a credit to your payment card. You can also pre-lodge your claim through the MyTRS portal online before arriving at the airport.

## Is the refund worth the effort?

On larger purchases, absolutely. A $1,000 laptop includes around $91 in GST. A $500 camera includes around $45. If you bought several significant items during your time in Australia, the total refund can add up meaningfully.
    `,
  },
  {
    slug: 'transferring-money-overseas-australia-tax',
    title: 'Do you pay tax on money you transfer out of Australia?',
    description: 'Sending your savings home before leaving Australia? Here is what working holiday makers need to know about international transfers and Australian tax obligations.',
    category: 'Tax Return' as const,
    date: '15 December 2025',
    readTime: 4,
    ctaHeading: 'Leaving Australia and want to get your finances sorted?',
    ctaBody: 'We help working holiday makers with tax returns, super withdrawals, and everything else before departure. Talk to us on WhatsApp.',
    ctaLabel: 'Talk to our team on WhatsApp',
    ctaHref: '/tax-return',
    body: `
One of the most common questions working holiday makers ask before leaving Australia is whether they need to worry about tax on the money they send home. The short answer is that the act of transferring money out of Australia does not itself create a tax obligation, but the income that money came from may have tax consequences.

## Is transferring money overseas taxable?

No, the transfer itself is not a taxable event. Sending money from an Australian bank account to a bank account in your home country is a movement of funds, not income. The ATO does not tax you simply because you moved money.

What the ATO cares about is the income you earned in Australia. That income is taxable in the year it was received, regardless of whether you spend it in Australia or send it overseas.

## Do you need to report large transfers?

If you carry more than $10,000 AUD in physical cash in or out of Australia, you are required to declare it to the Australian Border Force. This is an anti-money-laundering requirement, not a tax requirement, and does not trigger any tax liability on its own.

## What about income tax already paid in Australia?

If tax was withheld from your pay, that tax has already been paid. When you transfer your net savings home, you are transferring money that has already been through the Australian tax system. There is no second layer of tax.

If you overpaid tax during the year, you can reclaim the excess through your [tax return](/tax-return). Any refund can be paid into your Australian bank account and then transferred home.

## Will you owe tax at home?

That depends on the tax laws of your own country and whether it has a tax treaty with Australia. Many countries have double-tax agreements with Australia that allow you to offset Australian tax already paid against any liability at home. A tax adviser in your home country is the right person to ask.

## Practical tip before leaving

Sort out your Australian tax affairs before you transfer everything home and close your account. You need an active Australian bank account to receive your [tax refund](/tax-return) and your [superannuation withdrawal](/guides/what-is-dasp-super-withdrawal). Close the account too early and you may not be able to receive these payments without significant complications.
    `,
  },

  // ─── ABN ADVANCED – NEW ────────────────────────────────────────────────────
  {
    slug: 'vehicle-logbook-abn-working-holiday',
    title: 'Vehicle expenses and logbooks for working holiday makers with an ABN',
    description: 'If you use a car for work under your ABN, you may be able to claim vehicle expenses as a tax deduction. Here is how the logbook method works and what you need to record.',
    category: 'ABN' as const,
    date: '22 December 2025',
    readTime: 5,
    ctaHeading: 'Working under an ABN and want to maximise your deductions?',
    ctaBody: 'Our team helps ABN holders prepare accurate tax returns with all relevant deductions applied. Talk to us on WhatsApp.',
    ctaLabel: 'Talk to our team on WhatsApp',
    ctaHref: '/abn-form',
    body: `
If you are working under an ABN in Australia and using a vehicle to travel to job sites, deliver goods, or carry out business activities, the cost of that vehicle use may be deductible. For working holiday makers operating as sole traders, understanding how to claim vehicle expenses correctly can reduce your tax bill meaningfully at the end of the financial year.

## Can you claim vehicle expenses with an ABN?

Yes, provided the vehicle is used for genuine business purposes. Driving from your accommodation to a work site, travelling between multiple job locations in a single day, and driving to purchase equipment or supplies for your business are all potentially deductible. Driving from home to a single regular workplace and back is generally considered personal travel and is not deductible.

## The cents per kilometre method

The simplest method is the cents per kilometre approach. You claim a set rate for each kilometre driven for business purposes. The current ATO rate is 88 cents per kilometre. You can claim up to 5,000 kilometres per year using this method without needing a detailed logbook.

To use this method, keep a record showing how you calculated the kilometres claimed — a note recording each work trip, the distance, and the purpose is sufficient.

## The logbook method

If you drive more than 5,000 kilometres for business in a year, or if you want to claim actual vehicle expenses such as fuel, insurance, and maintenance, you need to keep a logbook.

A valid logbook must be kept for a continuous period of at least 12 weeks and must record every trip during that period. Each entry must include the date, start and end odometer readings, total kilometres, destination, and the purpose of the trip.

After the 12-week period, you calculate the proportion of business use versus total use. That percentage is applied to your total vehicle expenses for the year. For example, if 60% of your kilometres were for business and total vehicle costs were $8,000, you can claim $4,800.

## What records to keep

The logbook and all vehicle expense receipts must be kept for five years from the date you lodge the tax return in which the claims appear.

## A practical note for working holiday makers

Many backpackers buy a car to travel and work around Australia. If that car is also used for legitimate business travel under your ABN, some running costs may be deductible. But only the business-use proportion qualifies. The road trip from Melbourne to Cairns is personal travel. The drive to a farm for your first day of ABN work is business travel. Keep them separate in your records.
    `,
  },
  {
    slug: 'small-business-tax-offset-working-holiday-abn',
    title: 'What is the small business tax offset and can working holiday makers claim it?',
    description: 'If you earn income under an ABN as a sole trader, you may be entitled to the small business tax offset — a tax reduction of up to $1,000. Here is how it works.',
    category: 'ABN' as const,
    date: '29 December 2025',
    readTime: 4,
    ctaHeading: 'Working under an ABN and want to claim every offset you are entitled to?',
    ctaBody: 'We prepare tax returns for ABN holders and make sure every available offset is applied. Talk to our team on WhatsApp.',
    ctaLabel: 'Talk to our team on WhatsApp',
    ctaHref: '/abn-form',
    body: `
If you have been working as a sole trader under an ABN in Australia, there is a tax offset you may be entitled to that many working holiday makers never claim. The small business tax offset can reduce the tax you owe by up to $1,000 per year and is applied on top of any other deductions or offsets you might be eligible for.

## What is the small business tax offset?

The small business tax offset, also called the unincorporated small business tax discount, is a concession available to sole traders and partners in small business partnerships. It reduces the income tax payable on business income by a set percentage, with a maximum benefit of $1,000 per income year.

The offset is non-refundable, meaning it can reduce your tax payable to zero but cannot generate a refund on its own.

## Who can claim it?

Your business must have an aggregated annual turnover of less than $5 million. For working holiday makers operating as sole traders, this threshold is almost never an issue. The offset applies to the tax payable on your ABN income portion of the return, not your employee income under a TFN.

You must be an individual taxpayer, not a company or trust. As a sole trader, you meet this requirement automatically.

## How much is the offset worth?

For recent tax years, eligible sole traders have been able to claim a 16% discount on the tax payable on their business income, capped at $1,000. Your [tax agent](/guides/what-is-a-tax-agent) will calculate the exact amount when preparing your return.

## Can it be combined with the low income tax offset?

Yes. The small business tax offset applies to the business income component of your return, while the [low income tax offset](/guides/low-income-tax-offset-working-holiday) applies based on total income. Both can be applied to the same tax return, reducing your total tax liability from both directions.

## What if you earned both ABN and TFN income?

If you worked as both an employee (TFN) and a sole trader (ABN) during the same financial year, you lodge a combined [tax return](/tax-return) including both income streams. The small business tax offset applies only to the ABN income portion. This interaction is one of the reasons using a tax agent is worthwhile when your income comes from multiple sources.
    `,
  },
  {
    slug: 'sole-trader-vs-company-australia-working-holiday',
    title: 'Sole trader vs company in Australia: what is the difference for working holiday makers?',
    description: 'Most working holiday makers operate as sole traders, but understanding the difference between a sole trader and a company helps you make informed decisions about your business structure.',
    category: 'ABN' as const,
    date: '5 January 2026',
    readTime: 5,
    ctaHeading: 'Questions about your business structure or ABN?',
    ctaBody: 'We help working holiday makers with ABN applications and business tax. Talk to our team on WhatsApp.',
    ctaLabel: 'Talk to our team on WhatsApp',
    ctaHref: '/abn-form',
    body: `
If you are working under an ABN in Australia, you are almost certainly operating as a sole trader. But you may have heard people talking about different business structures. Understanding the distinction is useful, even if the choice for most working holiday makers is straightforward.

## What is a sole trader?

A sole trader is an individual who runs a business in their own name. There is no legal separation between you and the business. The income you earn is your personal income, reported on your individual tax return at the end of the financial year.

As a working holiday maker registering for an ABN to work as a subcontractor, you are a sole trader. You are personally responsible for the business, its debts, and its tax obligations.

## What is a company?

A company is a separate legal entity. It has its own ABN and its own tax obligations, separate from the individuals who own it. A company pays company tax at a flat rate (currently 25% for small businesses), and the owners pay income tax on any salary or dividends they receive from it.

Companies involve significantly more administrative overhead — registration with ASIC, ongoing annual fees, separate financial accounts, and in most cases a dedicated accountant.

## Why almost all working holiday makers are sole traders

For the scale of work most working holiday makers do, a sole trader structure is entirely appropriate. You are earning income for services you personally provide. There is no reason to introduce the complexity of a company structure.

A company makes sense when there are multiple owners, when there is a need to limit personal liability, or when income is large enough that tax savings outweigh the running costs. For a working holiday maker earning a few thousand to tens of thousands under an ABN, none of these apply.

## Tax rates compared

As a sole trader on a working holiday visa, your ABN income is taxed at the [working holiday maker rate](/guides/backpacker-tax-rate-australia) of 15% on the first $45,000. A company pays 25%. For working holiday makers, the sole trader structure often results in a lower effective tax rate before any offsets are applied.

## Personal liability

As a sole trader, your personal assets are at risk if the business incurs debts or causes harm. For most working holiday makers doing straightforward subcontracting work, this is not a meaningful risk.

## The practical takeaway

Register for an ABN as an individual, operate as a sole trader, and lodge your income through your personal tax return at the end of the year. If your situation is unusual, speak to a [tax agent](/guides/what-is-a-tax-agent) before making any decisions.
    `,
  },
  {
    slug: 'profit-loss-vs-personal-services-income-australia',
    title: 'What is the difference between a profit and loss business and personal services income in Australia?',
    description: 'The ATO distinguishes between personal services income and genuine business income. For working holiday makers with an ABN, understanding this distinction can affect your tax.',
    category: 'ABN' as const,
    date: '12 January 2026',
    readTime: 5,
    ctaHeading: 'Working under an ABN and unsure how your income is classified?',
    ctaBody: 'Our team helps ABN holders understand their tax obligations and lodge accurate returns. Talk to us on WhatsApp.',
    ctaLabel: 'Talk to our team on WhatsApp',
    ctaHref: '/abn-form',
    body: `
If you are working under an ABN in Australia, the ATO makes a distinction between two types of business income that can affect how your tax is calculated. Understanding whether your income is personal services income or genuine business profit and loss income matters when you lodge your tax return.

## What is personal services income?

Personal services income (PSI) is income you earn mainly from your own personal skills, effort, or expertise rather than from the sale of goods or the use of business assets. If you are a tradesperson, freelancer, cleaner, fruit picker, or anyone else who is paid for work they personally perform, your income is likely PSI.

For example, if you work as a carpenter under an ABN and a construction company pays you for your hours on site, that payment is personal services income. The money comes from your skills, not from a product you made or sold.

## What is a profit and loss business?

A genuine profit and loss business earns income through the production of goods, the use of assets, or by employing other people to do the work. The business itself generates income independently of the owner's personal involvement.

A bakery selling bread, a company manufacturing products, or a labour hire business — these earn income that is not primarily tied to the owner's personal effort.

## Why does the distinction matter?

The PSI rules affect which deductions you can claim. Under PSI rules, some deductions that would otherwise be available to a business — such as certain rent and salary deductions — may not be claimable. The rules exist to prevent individuals from reducing their tax by structuring personal employment-like arrangements as businesses.

If more than 50% of your income comes from your personal efforts and skills, your income is likely PSI and the PSI rules will apply.

## How does this apply to working holiday makers?

Most working holiday makers earning income under an ABN are earning PSI. Farm work, hospitality, trade work, cleaning, and most freelance services are all PSI. This is not a problem — it simply means certain business deductions are not available, while the standard deductions for tools, equipment, and work-related expenses still are.

## What to do with this information

When you lodge your [tax return](/tax-return) with a [tax agent](/guides/what-is-a-tax-agent), they will assess whether your ABN income is PSI or profit and loss and apply the correct rules. What is helpful is knowing this distinction exists and describing your business activities accurately when discussing your return with your agent.
    `,
  },

  // ─── TAX RETURN ADVANCED – NEW ────────────────────────────────────────────
  {
    slug: 'low-income-tax-offset-working-holiday',
    title: 'What is the low income tax offset and can working holiday makers claim it?',
    description: 'The low income tax offset can reduce your tax by up to $700 a year. Here is who qualifies, how it is calculated, and how it applies to working holiday visa holders.',
    category: 'Tax Return' as const,
    date: '19 January 2026',
    readTime: 4,
    ctaHeading: 'Want to make sure you are claiming every offset you are entitled to?',
    ctaBody: 'We prepare tax returns for working holiday makers and apply every relevant offset automatically. Talk to our team on WhatsApp.',
    ctaLabel: 'Start your tax return with us',
    ctaHref: '/tax-return',
    body: `
When you lodge your Australian tax return, certain offsets can reduce the amount of tax you owe. One of the most commonly applicable for working holiday makers is the low income tax offset, known as LITO. It can reduce your tax payable by up to $700 per year and is applied when you lodge your return if you meet the income threshold.

## What is the low income tax offset?

The low income tax offset is a tax reduction available to individuals whose taxable income falls below a set threshold. It directly reduces the amount of tax you owe rather than reducing your taxable income. If you owe $1,000 in tax and are entitled to a $500 LITO, you pay $500.

The maximum offset is $700, which applies to taxable income up to $37,500. For income between $37,500 and $45,000, the offset reduces gradually. For income above $66,667, no offset is available.

## Can working holiday makers claim it?

This is where it gets nuanced. The LITO is available to individuals based on their income level, but there are specific rules around how it interacts with the working holiday maker tax rate. Whether it applies and in what amount depends on your specific income, visa status, and how your return is prepared.

A registered [tax agent](/guides/what-is-a-tax-agent) will assess your eligibility and apply the offset correctly. This is one of the reasons having a tax agent prepare your return can result in a better outcome than lodging yourself.

## What is the difference between an offset and a deduction?

A tax deduction reduces your taxable income. If you earn $30,000 and claim $1,000 in deductions, you are taxed as if you earned $29,000. A tax offset directly reduces the tax you owe. If your tax bill is $4,500 and you have a $700 offset, you pay $3,800.

Offsets are generally more valuable than deductions of the same dollar amount because they reduce your tax bill dollar for dollar.

## Can it be combined with other offsets?

Yes. The LITO can be combined with other offsets, including the [small business tax offset](/guides/small-business-tax-offset-working-holiday-abn) if you also earned income under an ABN. Each offset is calculated separately and then applied to reduce total tax payable.

## What if your income is very low?

If your taxable income is low enough that the offset would reduce your tax liability to zero, the remaining offset is not refunded. Offsets reduce your tax to zero at most. The refund you receive comes from the gap between tax withheld throughout the year and what you actually owe after all calculations.
    `,
  },
  {
    slug: 'appealing-ato-decision-australia',
    title: 'Can you appeal an ATO decision in Australia?',
    description: 'If you disagree with an ATO assessment or decision about your tax, you have the right to challenge it. Here is how the appeals process works for working holiday makers.',
    category: 'Tax Return' as const,
    date: '26 January 2026',
    readTime: 4,
    ctaHeading: 'Dealing with an ATO issue and not sure what to do?',
    ctaBody: 'Our team helps working holiday makers navigate ATO matters including assessments and disputes. Talk to us on WhatsApp.',
    ctaLabel: 'Talk to our team on WhatsApp',
    ctaHref: '/tax-return',
    body: `
Receiving an unexpected tax bill or an assessment you disagree with from the ATO can be stressful, particularly if you are far from home. The good news is that the Australian tax system provides a formal process for challenging ATO decisions, and working holiday makers have the same rights as any other taxpayer.

## When would you appeal an ATO decision?

Common reasons include receiving a tax assessment that appears incorrect based on your income and visa status, having a legitimate deduction disallowed, being told you owe tax that you do not believe you owe, or receiving a penalty you think has been applied unfairly.

Appeals must be based on facts, documents, and arguments grounded in the relevant legislation. If you have evidence that the ATO has made an error, you have a right to put that case forward.

## The objection process

The first step is to lodge a formal objection — a written submission to the ATO explaining why you believe the decision is wrong, with supporting documentation. You must lodge your objection within a set time limit, usually 60 days from the date of the assessment, though extensions can be requested.

The ATO will review your objection and issue a formal response, either allowing it in full, in part, or disallowing it. This process can take up to 60 business days.

## If the objection is unsuccessful

If your objection is disallowed, you can escalate to the Administrative Appeals Tribunal or the Federal Court. These are independent bodies that can review the ATO's decision. For most working holiday makers, the objection process at the ATO level is the appropriate step — tribunal and court proceedings involve more complexity and cost.

## Penalties and interest during a dispute

Interest may continue to accumulate on the disputed amount while the case is being reviewed. Depending on the outcome, this interest may ultimately be waived if the decision goes in your favour.

## The role of a tax agent in disputes

A registered [tax agent](/guides/what-is-a-tax-agent) can prepare and lodge a formal objection on your behalf and communicate with the ATO throughout the process. For working holiday makers who have already left Australia, having a tax agent manage the process remotely is often the most practical solution.

If you receive correspondence from the ATO that you are unsure about, do not ignore it. The time limits for objections are strict.
    `,
  },
  {
    slug: 'amending-tax-return-australia',
    title: 'Can you amend a tax return after it has been lodged in Australia?',
    description: 'Lodged your tax return and realised you made a mistake? Here is how to amend a return, how long you have, and what happens to your refund while the amendment is processed.',
    category: 'Tax Return' as const,
    date: '2 February 2026',
    readTime: 4,
    ctaHeading: 'Think your tax return might have an error?',
    ctaBody: 'We review and amend tax returns for working holiday makers. Talk to our team on WhatsApp before the ATO gets in touch.',
    ctaLabel: 'Talk to our team on WhatsApp',
    ctaHref: '/tax-return',
    body: `
Making a mistake on a tax return is more common than people realise. You might have forgotten to include a deduction, entered an income figure incorrectly, or missed a relevant offset. Lodging a return is not final — Australian tax law allows you to amend a return after it has been submitted, and doing so proactively is far better than waiting for the ATO to find a problem.

## Can you amend a lodged return?

Yes. You can request an amendment to a tax return that has already been assessed. The amendment process allows you to correct errors, add missing information, or update figures that were entered incorrectly.

The general time limit for requesting an amendment is two years from the date the original assessment was issued for individuals and small businesses.

## How to lodge an amendment

If you lodged your original return through a registered tax agent, the agent can lodge the amendment on your behalf — usually the simplest approach, as they already have your records.

Amendments must be lodged in writing and cannot be submitted verbally or by phone.

## What happens to your refund during an amendment?

If you already received a refund and the amendment reduces the refund amount, the ATO will issue a revised assessment showing the amount to repay.

If your amendment increases the refund you are owed, the additional amount will be paid to your nominated bank account once the amendment is processed. Processing times are generally a few weeks to a couple of months.

## Can the ATO amend your return?

Yes. The ATO has the right to amend a tax assessment for up to two years after the original assessment in standard cases. If fraud is suspected, there is no time limit. If you receive a notice advising that the ATO has amended your assessment, review it carefully and contact a tax agent if you disagree.

## Practical advice for working holiday makers

If you have already lodged your return but later realise an error — even if you have left Australia — you can still request an amendment. Your tax agent can manage the process remotely. Keep your Australian bank account open until all tax matters are finalised, as any additional refund will be paid to that account.
    `,
  },
  {
    slug: 'ato-payment-plan-tax-debt-australia',
    title: 'What to do if you cannot pay your tax bill in Australia',
    description: 'Received a tax bill you cannot pay in full? The ATO offers payment arrangements for people who need more time. Here is how it works for working holiday makers.',
    category: 'Tax Return' as const,
    date: '9 February 2026',
    readTime: 4,
    ctaHeading: 'Dealing with a tax debt and unsure what to do?',
    ctaBody: 'Our team helps working holiday makers manage ATO obligations including payment arrangements. Talk to us on WhatsApp.',
    ctaLabel: 'Talk to our team on WhatsApp',
    ctaHref: '/tax-return',
    body: `
Not everyone gets a tax refund at the end of the financial year. If you underpaid tax during the year — perhaps because your employer withheld at the wrong rate or because you had unwithheld ABN income — you may end up owing money to the ATO. If the amount is more than you can pay immediately, there are options available.

## What is an ATO payment arrangement?

A payment arrangement is an agreement to pay a tax debt in instalments over time rather than in a single lump sum. The ATO offers this as a formal option for individuals who owe tax but cannot pay the full amount by the due date.

Interest applies to payment arrangements, as the debt is being deferred, but the rate is generally lower than the penalty interest charged on debts that are simply ignored. Acting proactively is always better than doing nothing.

## When is tax due?

Any tax debt from your tax return is generally due by 21 November of that tax year if you lodged through a tax agent, or by the date shown on your assessment notice if you lodged yourself. Debts not paid by the due date begin to accrue the ATO's general interest charge, which compounds daily.

## How to set up a payment arrangement

A registered tax agent can set up a payment arrangement with the ATO on your behalf. Talk to our team and we will make sure the arrangement is structured in a way that works for your situation.

You nominate how much you can pay per week or fortnight and the arrangement is structured accordingly. The ATO typically requires the debt to be paid within a reasonable period, usually under two years.

## What if you leave Australia before paying?

Leaving Australia with an outstanding tax debt does not extinguish it. The ATO can pursue debts internationally, and significant outstanding amounts may create complications if you apply for another Australian visa in the future.

If you are planning to leave before your tax return is finalised, ensure you have an Australian bank account available and a tax agent who can manage communications on your behalf after you depart.

## Penalties for late payment

The ATO charges a general interest charge on unpaid tax, compounding daily. If a tax return is lodged late, a failure-to-lodge penalty may also apply — currently $313 for every 28 days the return is overdue, up to a maximum of $1,565.

These penalties can be reduced or waived in certain circumstances. A tax agent can assist with applying for penalty remission if your situation warrants it.

## The most important thing

Do not ignore a tax debt. The ATO has broad powers to recover amounts owed, and debts do not disappear after you leave Australia. Contact a tax agent or the ATO directly to discuss your situation and set up an arrangement before the due date passes.
    `,
  },

  // ─── WORK RIGHTS – BATCH 2 ─────────────────────────────────────────────────
  {
    slug: 'piece-rates-farm-work-working-holiday',
    title: 'Piece rates in farm work: how are working holiday makers paid for harvest work?',
    description: 'Piece rates are common in fruit picking and harvest work in Australia. Here is how they work, what the minimum pay rules are, and what to do if you are underpaid.',
    category: 'Work Rights' as const,
    date: '16 February 2026',
    readTime: 5,
    ctaHeading: 'Questions about your pay or tax as a farm worker?',
    ctaBody: 'Our team helps working holiday makers in agriculture understand their pay, tax, and super obligations. Talk to us on WhatsApp.',
    ctaLabel: 'Talk to our team on WhatsApp',
    ctaHref: '/contact',
    body: `
Farm work and harvest work are among the most common jobs taken on by working holiday makers in Australia, particularly for those completing their 88 days of regional work to qualify for a second-year visa. One of the most confusing aspects of agricultural employment is the way pay is calculated. Unlike most other jobs in Australia, farm work often uses a system called piece rates rather than an hourly wage.

## What is a piece rate?

A piece rate is a payment system where you are paid per unit of work completed rather than per hour worked. In fruit picking, for example, you might be paid per kilogram of strawberries picked, per bin of apples filled, or per tray of blueberries harvested. The faster and more efficiently you work, the more you earn.

Piece rates are legal in Australia and are used across the horticulture industry. They are designed to reflect productivity — experienced pickers can earn significantly more than the hourly minimum because they can move faster through the crop.

## Is there a minimum wage guarantee?

Yes, and this is critical to understand. Under Australian law, a piece rate arrangement must still result in the worker earning at least the minimum casual hourly rate for every hour worked. This is known as the piece rate minimum.

The way it works in practice: at the end of each pay period, your employer calculates your total earnings from piece rates and divides by your total hours worked. If the result is below the minimum casual rate — currently $30.12 per hour for adults — the employer is required to top up your pay to reach that minimum.

If your employer is not doing this top-up, they are in breach of the Fair Work Act and underpaying you.

## How are piece rates set?

Piece rates must be set at a level that allows a competent worker working at a normal pace to earn at least the minimum wage. This is called the award piece rate. In reality, rates vary significantly between farms and between crops, and not all employers set their rates correctly.

Before starting a piece rate job, ask the employer what the rate per unit is and how many units an average worker picks per hour. This gives you a rough idea of what you will earn and whether the rate is reasonable.

## What to watch out for

Several practices in the agricultural sector are problematic and worth knowing about. Some employers undercount the weight or volume of what you pick, reducing your effective pay. Some require you to sort or pack alongside picking without paying for that additional time. Some apply deductions for accommodation or transport that bring your effective hourly rate below the minimum.

Keep your own records. Note the time you start and finish each day, and keep any weight or tally tickets you receive. These records are essential if you later need to dispute your pay.

## What if you think you have been underpaid?

If you believe your piece rate earnings divided by your hours worked came out below the minimum wage, you are entitled to make a complaint. You can contact [Fair Work Australia](https://www.fairwork.gov.au) directly, and the process is free and confidential. Fair Work investigates underpayment complaints in the agricultural sector regularly and can recover unpaid wages on your behalf.

Underpayment in farm work is unfortunately common. Knowing your rights is the first step to protecting them.

## Tax and super on piece rate income

Piece rate income is treated the same as any other employment income for tax and superannuation purposes. Your employer must withhold tax at the correct working holiday maker rate of 15% and pay superannuation on top of your gross earnings. If you are working under a TFN, check your payslips to confirm both are being applied correctly. At the end of the financial year, this income forms part of your [tax return](/tax-return).
    `,
  },
  {
    slug: 'labour-hire-agencies-working-holiday-australia',
    title: 'Labour hire agencies in Australia: what working holiday makers need to know',
    description: 'Labour hire agencies are a popular way to find work quickly in Australia. Here is how they work, what your rights are, and what to watch out for before signing up.',
    category: 'Work Rights' as const,
    date: '23 February 2026',
    readTime: 5,
    ctaHeading: 'Working through a labour hire agency and unsure about your tax or super?',
    ctaBody: 'Our team helps working holiday makers understand their obligations regardless of how they find work. Talk to us on WhatsApp.',
    ctaLabel: 'Talk to our team on WhatsApp',
    ctaHref: '/contact',
    body: `
Labour hire agencies are companies that recruit workers and then place them with client businesses for a fee. For working holiday makers, they can be a quick way to find casual work in industries like agriculture, hospitality, warehousing, construction, and manufacturing. But there are important things to understand before you sign up with one.

## How does labour hire work?

When you register with a labour hire agency, you become an employee of the agency, not of the business where you actually do the work. The client business tells the agency how many workers they need and for how long. The agency provides those workers and handles their pay, tax, and super on behalf of the client.

From a practical standpoint, you show up at a worksite that belongs to a third-party business, but your payslip comes from the agency. The agency is your legal employer.

## What are the advantages?

For working holiday makers, the main advantage is speed. Agencies often have multiple clients and can place workers quickly, sometimes within a day or two of registering. If you need work urgently or are new to an area and do not have local connections, an agency can help you get started.

Agencies also handle all the paperwork. You provide your TFN and bank details to the agency, and they manage tax withholding and super payments. This can simplify things if you are moving between locations frequently.

## What are the risks?

Labour hire agencies vary enormously in quality. Reputable agencies pay correctly, comply with Australian employment law, and treat workers fairly. Less reputable ones underpay, misclassify workers, apply excessive deductions for accommodation or transport, or operate in ways that exploit people who do not know their rights.

Some agencies, particularly in the agricultural sector, charge workers for accommodation and transport and then subtract those costs from wages in ways that bring the effective hourly rate below the legal minimum. This practice is illegal but unfortunately still occurs.

Before registering with an agency, check whether they are licensed. Several states in Australia now require labour hire agencies to hold a licence, and operating without one is illegal. You can check licence status through the relevant state authority.

## Your rights as a labour hire worker

Your rights as a worker are the same whether you work directly for a business or through an agency. You are entitled to be paid at least the minimum casual rate for your industry, to receive payslips within 24 hours of each pay, to have superannuation paid at 11.5% of your gross earnings, and to work in a safe environment.

You are also entitled to be told clearly what your hourly rate is before you start work, and to receive a copy of any agreement you sign with the agency.

## Tax and super through a labour hire agency

Because you are an employee of the agency, your tax is withheld under PAYG and your super is paid by the agency into whichever super fund you nominate. Make sure you give the agency your correct TFN and select Working Holiday Maker on your TFN declaration form — the same rules apply as with any other employer.

Check your payslips to confirm that the correct 15% working holiday maker tax rate is being applied and that super is being paid. If something looks wrong, contact us or reach out to [Fair Work Australia](https://www.fairwork.gov.au).
    `,
  },
  {
    slug: 'how-to-read-a-payslip-australia-working-holiday',
    title: 'How to read a payslip in Australia as a working holiday maker',
    description: 'Your payslip contains everything you need to know about whether you are being paid correctly. Here is what each section means and what to check every pay cycle.',
    category: 'Work Rights' as const,
    date: '2 March 2026',
    readTime: 5,
    ctaHeading: 'Think something on your payslip looks wrong?',
    ctaBody: 'Our team helps working holiday makers check whether their tax and super are being applied correctly. Talk to us on WhatsApp.',
    ctaLabel: 'Talk to our team on WhatsApp',
    ctaHref: '/contact',
    body: `
Every employer in Australia is legally required to issue a payslip within 24 hours of paying your wages. Your payslip is not just a receipt — it is a record of your pay, tax, and super for every single pay period, and it is one of the most important documents you will receive while working in Australia. Knowing how to read it means you can spot errors before they become serious problems.

## Why payslips matter for working holiday makers

Working holiday makers are in a specific tax situation that differs from Australian residents and regular employees. Your tax rate, your super entitlements, and the way your income is reported all have their own rules. A payslip lets you verify that your employer is applying those rules correctly. If they are not, the consequences can include underpaid super, incorrect tax withholding, and complications at tax return time.

Keep every payslip you receive. Store them somewhere safe — email them to yourself or save them to cloud storage. You will need them when you lodge your [tax return](/tax-return) and when you apply for your [superannuation withdrawal](/guides/what-is-dasp-super-withdrawal) before leaving Australia.

## Gross pay

Gross pay is your total earnings before any deductions. It should reflect the hours you worked multiplied by your agreed hourly rate, plus any penalty rates for overtime, weekend work, or public holidays. If you worked 38 hours at $30 per hour, your gross pay should be $1,140.

Check this figure first. If your hours or rate look wrong, the rest of the payslip will be wrong too.

## PAYG tax withholding

PAYG stands for Pay As You Go. This is the tax your employer withholds from your pay and sends to the ATO on your behalf. As a working holiday maker on a subclass 417 or 462 visa, this should be 15% of your gross pay for income up to $45,000.

If your payslip shows a tax amount that is significantly higher or lower than 15%, check how you filled in your TFN declaration form. A common cause of incorrect withholding is selecting the wrong residency status on that form.

## Superannuation

Super should appear on your payslip as a separate line item. Your employer is required to pay 11.5% of your gross earnings into your nominated super fund. Critically, super is paid on top of your wages — it is not deducted from your pay. It is an additional cost to the employer.

If super does not appear on your payslip at all, or if the amount looks low, raise it with your employer immediately. Unpaid super is unfortunately common, particularly in industries like hospitality and agriculture.

## Net pay

Net pay is what actually lands in your bank account after tax has been withheld. It is your gross pay minus PAYG withholding. Super does not reduce your net pay — it is paid separately to your fund.

## Year to date figures

Most payslips include a YTD (Year to Date) column showing cumulative gross pay, tax withheld, and sometimes super paid for the financial year so far. This is useful for tracking your total income at any point during the year and for estimating your likely tax return outcome.

## What to check every pay cycle

Each time you receive a payslip, check the following: the hours worked match what you actually worked, the gross pay is correct at your agreed rate, tax is being withheld at 15%, super appears and is calculated at 11.5% of gross, and your name and TFN are correctly recorded. If anything looks wrong, address it immediately rather than waiting until tax time.
    `,
  },
  {
    slug: 'wage-theft-working-holiday-australia',
    title: 'Wage theft in Australia: what working holiday makers can do if they are underpaid',
    description: 'Wage theft is unfortunately common in industries popular with backpackers. Here is how to recognise it, what your options are, and how to recover what you are owed.',
    category: 'Work Rights' as const,
    date: '9 March 2026',
    readTime: 5,
    ctaHeading: 'Think you have been underpaid?',
    ctaBody: 'Our team helps working holiday makers understand their pay and tax entitlements. Talk to us on WhatsApp and we can point you in the right direction.',
    ctaLabel: 'Talk to our team on WhatsApp',
    ctaHref: '/contact',
    body: `
Wage theft — being paid less than you are legally entitled to — is one of the most common issues faced by working holiday makers in Australia. It occurs across many industries but is particularly prevalent in hospitality, agriculture, cleaning, and retail. Knowing how to recognise it and what to do about it is essential knowledge for anyone working in Australia on a WHV.

## What counts as wage theft?

Wage theft covers a range of practices. Being paid below the minimum wage for your industry is the most obvious form. But it also includes not being paid penalty rates for weekend, evening, or public holiday work, having super not paid or paid at a lower rate than 11.5%, having excessive deductions taken from your pay for accommodation, transport, or uniforms that bring your effective rate below minimum wage, not being paid for trial shifts, and being misclassified as a contractor when you are actually an employee.

Some employers do these things deliberately. Others underpay because of genuine administrative errors. Either way, the result is the same: you are not receiving what you are legally owed.

## How to recognise if it is happening to you

The simplest check is your payslip. Divide your total pay by your total hours. If the result is below the minimum casual rate for your industry, you are being underpaid. For most working holiday makers in standard roles, the minimum casual adult rate is $30.12 per hour, though some industries and awards have higher rates.

Also check whether super is being paid. Log into your super fund account and look for employer contributions. Super is paid quarterly, so allow some time after starting a job before expecting to see it. If contributions never appear after several months of work, they may not be being paid.

If you are not receiving payslips at all, that is itself a breach of the law and a red flag that other things may also be wrong.

## What you can do

The first step is to raise the issue directly with your employer. Sometimes underpayment is a genuine error and can be corrected quickly. Keep the conversation calm and factual — refer to your records of hours worked and the applicable minimum rates.

If the employer does not respond appropriately, you can lodge a complaint with [Fair Work Australia](https://www.fairwork.gov.au). This is free, confidential, and available to all workers in Australia regardless of visa status. Fair Work has the power to investigate, recover unpaid wages, and impose penalties on employers who have done the wrong thing.

You can also contact the ATO regarding unpaid super specifically. The ATO has a dedicated unpaid super reporting tool and actively pursues employers who fail to meet their superannuation obligations.

## Will it affect your visa?

Reporting an employer for underpayment will not affect your working holiday visa. The Australian government has made specific provisions to encourage underpaid workers to come forward without fear of visa consequences. Your immigration status is protected when you make a complaint about a workplace rights issue in good faith.

## Keep your records

The most important thing you can do throughout your time in Australia is keep records. Save every payslip, note the hours you work, and keep any messages or contracts from your employer. These records are what make it possible to pursue an underpayment claim if one arises. Without them, it becomes your word against your employer's.

Wage theft is not a grey area. If you were not paid what you were legally owed, you have a right to recover it. The systems exist to help you do that.
    `,
  },

  // ─── TAX – BATCH 2 ─────────────────────────────────────────────────────────
  {
    slug: 'backpacker-tax-history-australia',
    title: 'The backpacker tax in Australia: what it is and how it has changed',
    description: 'The backpacker tax has been one of the most debated tax policies in Australia. Here is the history, what rate applies today, and what it means for your working holiday.',
    category: 'Tax Return' as const,
    date: '16 March 2026',
    readTime: 6,
    ctaHeading: 'Want to make sure you are paying the right tax rate?',
    ctaBody: 'We handle tax returns for working holiday makers every day and make sure the correct rate is applied. Talk to our team on WhatsApp.',
    ctaLabel: 'Start your tax return with us',
    ctaHref: '/tax-return',
    body: `
If you are on a working holiday visa in Australia, you may have heard the term backpacker tax. It refers to the specific tax rate that applies to income earned by working holiday makers, and it has been the subject of significant political and legal controversy over the past decade. Understanding the history helps you understand why the current system works the way it does.

## What is the backpacker tax?

The backpacker tax is the informal name for the tax regime that applies to holders of working holiday visas, specifically subclass 417 and 462. Rather than being taxed under the standard Australian resident progressive scale, working holiday makers are taxed at a flat rate of 15% on their first $45,000 of income earned in Australia each financial year.

Income above $45,000 is taxed at 30% up to $135,000, and at higher rates beyond that. In practice, the vast majority of working holiday makers earn below $45,000 in a single financial year, so the 15% flat rate is the one that applies to most people.

## The history: a decade of controversy

Before 2017, working holiday makers who were considered tax residents of Australia were taxed under the standard progressive resident rates, which meant no tax on the first $18,200 and then increasing rates above that. Those who were considered non-residents were taxed at 32.5% from the first dollar of income.

In 2016, the Australian government proposed introducing a flat 32.5% tax on all working holiday maker income from the first dollar, treating all backpackers as non-residents regardless of their actual residency circumstances. The announcement triggered significant backlash from the agricultural industry, which relies heavily on working holiday labour during harvest season. Farming groups warned that the rate would deter backpackers from coming to Australia and devastate regional economies dependent on that workforce.

After extensive lobbying and debate, the rate was legislated at 15% from 1 January 2017. The compromise also included changes to the superannuation tax applied to departing working holiday makers, which was set at 65% for backpackers and 35% for students — a separate and still controversial measure.

## A legal challenge from the UK

In 2019, the backpacker tax faced a significant legal challenge. The United Kingdom argued that applying a higher tax rate to British citizens on working holiday visas than to Australian residents constituted discrimination under the UK-Australia tax treaty. The Full Federal Court of Australia agreed and ruled in favour of the UK claimants.

The case attracted attention from working holiday makers of multiple nationalities and raised questions about whether the tax could be applied to citizens of other countries that had similar non-discrimination clauses in their tax treaties with Australia. The Australian government subsequently amended the legislation to address the court's ruling, and the current regime was put in place with specific provisions that sought to comply with treaty obligations.

## What rate applies today?

As of the current financial year, working holiday makers on subclass 417 and 462 visas are taxed at 15% on income up to $45,000. This rate applies regardless of passport nationality in most circumstances. Income above $45,000 is taxed at higher rates in line with the non-resident scale.

The rate is applied from the first dollar of income. There is no tax-free threshold for working holiday makers. This is different from Australian residents, who pay no tax on the first $18,200 they earn.

## What this means for your tax return

At the end of the financial year, your employer's PAYG withholding at 15% should broadly match what you owe. Depending on deductions, offsets, and the exact amount withheld throughout the year, you may receive a refund or owe a small additional amount. Most working holiday makers who have the correct rate applied throughout the year and who have legitimate deductions to claim receive a refund when they lodge.

The average tax refund for working holiday makers who lodge through a registered tax agent is around $2,500, though this varies significantly depending on income, deductions, and individual circumstances.
    `,
  },
  {
    slug: 'how-to-check-super-balance-working-holiday',
    title: 'How to check your superannuation balance as a working holiday maker',
    description: 'Knowing how much super you have accumulated is important — especially before you leave Australia. Here is how to track your balance and make sure your employer is paying correctly.',
    category: 'Super' as const,
    date: '23 March 2026',
    readTime: 4,
    ctaHeading: 'Ready to withdraw your super before leaving Australia?',
    ctaBody: 'We handle DASP super withdrawal applications for working holiday makers. Our team manages the entire process. Talk to us on WhatsApp.',
    ctaLabel: 'Talk to our team on WhatsApp',
    ctaHref: '/superannuation',
    body: `
Every working holiday maker who has been employed in Australia is entitled to superannuation contributions from their employer. That money accumulates in a super fund account throughout your time in the country, and when you leave Australia, you can apply to withdraw it. Before you do, you need to know how much is there — and checking your balance is simpler than most people expect.

## Why checking your super matters

Superannuation is paid by your employer in addition to your wages. You do not see it on your bank statement — it goes directly into your super fund account. This means it is easy to lose track of how much has been paid, or even whether it has been paid at all.

Employers are required to pay super on a quarterly basis. The payment dates are 28 January, 28 April, 28 July, and 28 October. Contributions made on those dates will typically appear in your super account within a few days. If months pass without any contributions appearing, your employer may not be paying what they owe.

Checking your balance regularly means you can catch problems early — while you are still in the country and can take action.

## Your super fund account

When you started work in Australia, your employer should have asked you for your super fund details. If you had an existing fund, contributions went there. If you did not nominate a fund, your employer was required to open a default fund account on your behalf.

Your super fund will have sent you a member number and login details when your account was opened, either by email or post. If you did not receive these, contact your fund directly — they can verify your identity and provide your account details.

Once you have your login, you can view your current balance, see a history of contributions, and confirm that payments have been arriving at the expected intervals.

## What if you do not know which fund you are with?

This is common, especially for working holiday makers who have changed jobs and may have had multiple super fund accounts opened for them. If you are unsure which fund or funds hold your super, a registered tax agent can assist you in locating all accounts associated with your TFN.

It is worth doing this well before you plan to leave Australia. Tracking down super fund details from overseas is possible but significantly more complicated, and delays can affect when your [DASP withdrawal](/guides/what-is-dasp-super-withdrawal) is processed.

## Checking for unpaid super

If you log into your super fund and find that contributions have not been appearing, first check the quarterly payment schedule. If a quarter has passed and nothing has arrived, raise it with your employer first. If the employer does not resolve it, you can report unpaid super to the ATO, which investigates these cases and can recover missing contributions on your behalf.

Unpaid super is unfortunately common in industries like hospitality and agriculture. Catching it early gives you the best chance of recovering what you are owed before you leave.

## Before you apply for DASP

Before submitting your [Departing Australia Superannuation Payment](/guides/what-is-dasp-super-withdrawal) application, make sure all contributions have arrived in your account. Super is paid quarterly, so if you leave shortly after a quarter ends, the final contribution from that quarter may not yet appear in your account. Submit your DASP application only once all expected contributions are showing — otherwise, you may leave money behind that is difficult to recover later.
    `,
  },
]

export const categories: Category[] = ['TFN', 'ABN', 'Tax Return', 'Super', 'Work Rights', 'Medicare & Other']

export function getGuideBySlug(slug: string): Guide | undefined {
  return guides.find(g => g.slug === slug)
}

export function getGuidesByCategory(category: Category): Guide[] {
  return guides.filter(g => g.category === category)
}

export function getCategoryColor(category: Category): { bg: string; text: string; border: string } {
  switch (category) {
    case 'TFN':          return { bg: '#EAF6F1', text: '#0B5240', border: '#C8EAE0' }
    case 'ABN':          return { bg: '#FDF0D5', text: '#7A4A00', border: '#E9A020' }
    case 'Tax Return':   return { bg: '#F0F4FF', text: '#2D3A8C', border: '#A5B4FC' }
    case 'Super':        return { bg: '#F5F0FF', text: '#5B21B6', border: '#C4B5FD' }
    case 'Work Rights':  return { bg: '#FFF0F0', text: '#991B1B', border: '#FCA5A5' }
    case 'Medicare & Other': return { bg: '#F0FAFA', text: '#0E7490', border: '#67E8F9' }
  }
}
