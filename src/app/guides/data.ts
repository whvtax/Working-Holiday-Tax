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

Anyone who holds a visa that permits work in Australia can apply. This includes holders of the Working Holiday Visa subclass 417 and the Work and Holiday Visa subclass 462. You can apply online through the ATO website either before or after arriving in Australia, as long as your visa has already been granted.

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

TFN applications for foreign passport holders are handled by the Australian Taxation Office (ATO). You apply directly through the ATO website and your TFN is sent to you by post within around 28 days of your application being approved. There is no in-person appointment required.

## What you need before you apply

Before starting your application, make sure you have your passport available. You will need your passport number, your date of birth, your visa details, and a residential address in Australia where the ATO can send your TFN by letter. If you have not yet found permanent accommodation, a hostel address works fine as long as you are confident you will still be there when the letter arrives.

You will also need a valid email address. The ATO will send you a confirmation when your application is received and another when it is processed.

## The application process step by step

You start the application on the ATO website by selecting the option for foreign passport holders. You then enter your personal details, your passport and visa information, and your Australian address. The form takes around 10 minutes to complete. Once submitted, you will receive a reference number by email confirming that your application is in progress.

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
    date: '22 July 2024',
    readTime: 4,
    ctaHeading: 'Apply for your TFN through us',
    ctaBody: 'We handle TFN applications for working holiday makers every day. We make sure your application is submitted correctly so there are no delays.',
    ctaLabel: 'Get started',
    ctaHref: '/tfn',
    body: `
After submitting your TFN application through the ATO website, most people receive their Tax File Number within 28 days. In practice, many applicants receive it sooner, sometimes within two weeks, though this depends on the ATO's current processing times and how busy they are at any given point.

## How your TFN is delivered

Your TFN is sent to you by post as a letter to the Australian address you provided in your application. The letter contains your TFN and some basic information about how to use it. It does not arrive by email or SMS. This is why it is important to provide an address where you are confident you will still be staying when the letter arrives.

If you are moving around a lot or staying in different hostels, try to use the address of somewhere you will be for at least a month. If you miss the letter, it can be difficult to retrieve, though the ATO does have a process to help you find your TFN if you lose it.

## What to do while you are waiting

You do not need to wait for your TFN before starting work. You can begin working immediately and inform your employer that your application is in progress. Keep the confirmation email the ATO sent you as evidence. Some employers will accept this and proceed with a lower withholding rate, while others will apply the maximum rate until your TFN is on file. Either way, any excess tax withheld can be recovered through your [tax return](/tax-return) at the end of the financial year.

While waiting, it is also worth setting up a myGov account online. You will eventually link it to the ATO to access your income statements and lodge your tax return, so getting that set up early saves time later.

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
    date: '5 August 2024',
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
    date: '19 August 2024',
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
    date: '2 September 2024',
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
    date: '16 September 2024',
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
    date: '30 September 2024',
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
    date: '14 October 2024',
    readTime: 3,
    ctaHeading: 'Returning to Australia?',
    ctaBody: 'Whether it is your first or second working holiday, we can help you get your tax sorted quickly. TFN applications, tax returns, super, and more.',
    ctaLabel: 'Get in touch',
    ctaHref: '/contact',
    body: `
No. Your Tax File Number is permanent. It does not expire, it does not change when your visa changes, and you do not need to apply for a new one when you return to Australia on a second working holiday visa. The same TFN you were issued the first time is the one you use for every subsequent visit.

## Where to find your TFN if you cannot remember it

If you kept the original letter the ATO sent you, your TFN will be on it. If you set up a myGov account during your first visit and linked it to the ATO, you can log back in and find your TFN there. You can also check any payslips, group certificates, or tax return documents from your first visit, as your TFN is usually printed on those.

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
    date: '28 October 2024',
    readTime: 3,
    ctaHeading: 'Need help with your tax while you are at it?',
    ctaBody: 'If you are tracking down your TFN, you might also be thinking about your tax return or super. We help working holiday makers sort all of it in one place.',
    ctaLabel: 'Get in touch',
    ctaHref: '/contact',
    body: `
Losing track of your Tax File Number is more common than you might think, especially for working holiday makers who have been in Australia a while and moved around a lot. The good news is there are several ways to find it without too much trouble.

## Check your original TFN letter

The ATO sent your TFN to you by post when your application was approved. If you kept that letter, it will have your TFN printed on it. Check any folders, emails, or documents from when you first arrived in Australia.

## Log in to myGov

If you set up a myGov account and linked it to the ATO during your time in Australia, you can log back in and find your TFN in your ATO profile. Go to myGov, log in with your credentials, open the ATO service, and navigate to your personal details. Your TFN will be displayed there.

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
    date: '11 November 2024',
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
    date: '25 November 2024',
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
    date: '9 December 2024',
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
    date: '23 December 2024',
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
    date: '6 January 2025',
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
    date: '3 February 2025',
    readTime: 3,
    ctaHeading: 'Leaving Australia soon?',
    ctaBody: 'We help working holiday makers wrap up their Australian tax obligations correctly before they leave, including lodging a final tax return and claiming back their super.',
    ctaLabel: 'Get everything sorted before you go',
    ctaHref: '/contact',
    body: `
When you finish working in Australia and are no longer carrying on a business or contracting activity, you should cancel your Australian Business Number (ABN). This is a simple process and helps keep the Australian Business Register accurate. It also ensures you are not left with any administrative obligations after you have left the country.

## How to cancel your ABN

You cancel your ABN through the Australian Business Register (ABR) website. Log in using your myGovID credentials, navigate to your ABN record, and select the option to cancel. You will be asked for the date your business activity ceased, which is typically the date of your last invoice or your last day of contracting work.

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
    date: '17 February 2025',
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
    date: '3 March 2025',
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
    date: '17 March 2025',
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
    date: '31 March 2025',
    readTime: 6,
    ctaHeading: 'Let us lodge your tax return for you',
    ctaBody: 'We handle Australian tax returns for working holiday makers every day. We take care of the whole process and make sure everything is correct before we lodge.',
    ctaLabel: 'Start your tax return',
    ctaHref: '/tax-return',
    body: `
Lodging an Australian tax return as a working holiday maker is a requirement if you earned income in Australia during the financial year. The financial year runs from 1 July to 30 June and the deadline to lodge your return is 31 October. If you use a registered tax agent, you may qualify for a later deadline.

## What you need before you start

You will need your Tax File Number, your income statements from all employers you worked for during the year, and the details of an Australian bank account for any refund. Your income statements are made available by employers through the ATO system and can be accessed through myGov. If you do not have a myGov account, you will need to set one up and link it to the ATO.

If you have already left Australia, you can still access myGov online from overseas. All you need is your TFN and your login credentials.

## The three ways to lodge

The first option is to lodge yourself through myGov. Once you have linked your ATO account, you can access the myTax lodgment tool, which pre-fills a lot of your information from your employer's reports. You review the pre-filled data, make any corrections, and submit.

The second option is to use a registered tax agent. A tax agent handles the preparation and lodgment on your behalf, which is particularly useful if you had multiple employers, worked as both an employee and a contractor, or are not sure whether your income has been reported correctly. Using an agent also comes with an extended lodgment deadline.

The third option is to use an online tax service that connects directly to the ATO on your behalf, which is similar to using a tax agent but often faster.

## What happens after you lodge

The ATO processes your return and calculates whether the tax withheld from your wages throughout the year matches your actual tax liability. If more was withheld than you owed, the difference is refunded to your nominated Australian bank account, usually within two weeks of lodgment. If you owe more than was withheld, you will receive a notice with a payment deadline.

## What if you worked for multiple employers

If you worked for more than one employer during the year, all of their income reports will appear in your myGov account once they have been submitted. Make sure you review all of them carefully for accuracy before lodging, and include all income sources in your return.
    `,
  },
  {
    slug: 'what-is-payg-payment-summary',
    title: 'What is a PAYG payment summary and how do you use it?',
    description: 'A PAYG payment summary shows your total earnings and tax withheld for the year. Here is what it is and how to access yours.',
    category: 'Tax Return',
    date: '7 April 2025',
    readTime: 4,
    ctaHeading: 'Need help with your tax return?',
    ctaBody: 'We help working holiday makers lodge their Australian tax returns correctly, including making sure all income and withholding amounts are accurate.',
    ctaLabel: 'Start your tax return',
    ctaHref: '/tax-return',
    body: `
A PAYG payment summary, now more commonly referred to as an income statement, is a document that shows the total wages you were paid by an employer during the financial year and the total amount of tax that was withheld from those wages. It is the key document you need to lodge your [tax return](/tax-return).

## How income statements work now

Until a few years ago, employers were required to provide a physical PAYG payment summary to each employee at the end of the financial year. This has been replaced by a digital system. Employers now report wages and withholding amounts directly to the ATO through their payroll software throughout the year. This information is then made available to you through your myGov account linked to the ATO.

## How to access your income statement

Log in to myGov and open the ATO service. Navigate to the income statements section. You will see a summary for each employer you worked for during the financial year. The status of each statement will show as either in progress or tax ready. You should wait until all statements are marked as tax ready before lodging your return, as the figures may still be updated by your employer until that point.

If you had multiple employers, each one will appear separately. Make sure you review all of them.

## What if an employer has not submitted their report

If a financial year has ended and your income statement is still showing as in progress well after lodgment season has opened, it may mean your employer has not yet finalised their payroll reporting. Contact your employer and ask them to finalise it. If they are unresponsive, you can contact the ATO for assistance.

## Using your income statement to lodge

When you lodge through the myTax tool in myGov, most of the information from your income statements is pre-filled automatically. Review it carefully to make sure it matches your own records of what you were paid. If anything looks incorrect, address it before you submit your return.
    `,
  },
  {
    slug: 'tax-deductions-working-holiday-makers',
    title: 'What tax deductions can working holiday makers claim in Australia?',
    description: 'Working holiday makers can claim work-related deductions just like any other worker. Here is what qualifies and what does not.',
    category: 'Tax Return',
    date: '14 April 2025',
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
    date: '21 April 2025',
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

If you have already left Australia, you can still lodge your return online. The return can be submitted from anywhere in the world through myGov or through a registered tax agent. You will need your TFN, your income statements, and an Australian bank account or an arrangement for payment of any refund.

The deadline to lodge is 31 October following the end of the financial year. Using a registered tax agent may give you additional time beyond that deadline.
    `,
  },
  {
    slug: 'how-to-lodge-tax-return-from-overseas',
    title: 'How to lodge an Australian tax return from overseas after you leave',
    description: 'Leaving Australia does not mean you can skip your tax return. Here is how to lodge from anywhere in the world.',
    category: 'Tax Return',
    date: '28 April 2025',
    readTime: 5,
    ctaHeading: 'Lodge your Australian tax return from wherever you are',
    ctaBody: 'We lodge Australian tax returns for working holiday makers from all over the world. Send us your details and we handle everything remotely.',
    ctaLabel: 'Lodge your return with us',
    ctaHref: '/tax-return',
    body: `
Leaving Australia does not end your tax obligations there. If you earned income in Australia during the financial year, you are required to lodge a tax return regardless of whether you are still in the country. The good news is that the entire process can be done online from anywhere in the world.

## Your options for lodging from overseas

The first option is to lodge through the ATO's myTax system via myGov. You will need a myGov account and you will need to have it linked to the ATO. If you set this up while you were in Australia, you can simply log back in from overseas. If you never set it up, the process of creating and verifying a myGov account from overseas can be more complicated, though it is possible.

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
    date: '4 March 2025',
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
    slug: 'what-is-mygov',
    title: 'What is myGov and do you need it to lodge your tax return?',
    description: 'myGov is the Australian government\'s online portal for accessing services including the ATO. Here is what it is and how it fits into your tax obligations.',
    category: 'Tax Return',
    date: '10 March 2025',
    readTime: 4,
    ctaHeading: 'Prefer to leave the ATO portal to us?',
    ctaBody: 'We handle the lodgment process for working holiday makers so you do not need to navigate myGov yourself. Get in touch and we will take care of it.',
    ctaLabel: 'Let us lodge for you',
    ctaHref: '/tax-return',
    body: `
myGov is the Australian government's online services portal. It allows individuals to access a range of government services in one place, including the ATO, Medicare, Centrelink, and various state government services. For working holiday makers, the main reason to use myGov is to link your ATO account so you can view your income statements and lodge your tax return.

## Setting up a myGov account

Creating a myGov account requires an Australian email address, a mobile number for verification, and a way to verify your identity. Identity verification is typically done by linking an existing government account, such as your ATO record, using details that match what the agency holds on file. This is the step that can be tricky for working holiday makers who are setting up myGov for the first time without other linked accounts.

## Linking the ATO to your myGov account

Once your myGov account is created, you need to link the ATO service to it. This is done by providing your TFN and answering some questions based on your ATO records, such as your registered address or income amounts. Once linked, you can access your income statements and use the myTax lodgment tool directly from your myGov account.

## Do you need myGov to lodge your tax return

If you want to lodge your return yourself, yes, myGov is effectively the way to do it. The ATO's myTax tool, which is the self-lodgment option, is accessed through myGov.

If you are using a registered tax agent, you do not need to use myGov at all. Your agent lodges on your behalf through their own professional tax software and you do not need to navigate the portal. This is one of the practical advantages of using an agent, particularly if you are lodging from overseas and find the myGov setup process complicated.

## Accessing your income statements

Your employers report your wages and tax withholding to the ATO throughout the year. That information appears in your myGov account under the ATO service once it has been finalised. You can check whether all your employer reports are marked as tax ready before lodging your return.
    `,
  },
  {
    slug: 'how-does-payg-withholding-work',
    title: 'How does PAYG withholding work in Australia?',
    description: 'PAYG withholding is how your employer collects tax from your wages before paying you. Here is how the system works.',
    category: 'Tax Return',
    date: '24 March 2025',
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

At the end of the financial year, your employer finalises their payroll reporting and reports the total wages paid to you and the total tax withheld to the ATO. This appears as your income statement in your myGov account. When you lodge your tax return, the ATO compares your actual tax liability for the year against the total withheld through PAYG. Any difference is either refunded to you or collected from you depending on whether too much or too little was withheld.
    `,
  },
  {
    slug: 'australian-financial-year-dates',
    title: 'What is the Australian financial year and when does it start and end?',
    description: 'Australia uses a financial year that runs from 1 July to 30 June, not the calendar year. Here is what that means for your tax.',
    category: 'Tax Return',
    date: '1 April 2025',
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
    date: '8 April 2025',
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
    date: '11 November 2024',
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
    date: '18 November 2024',
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

The most reliable way to check is to log in to your super fund's online portal and look at your contribution history. Each contribution your employer makes should appear there with a date and amount. If you have not set up online access to your fund, contact the fund directly using the contact details on your membership card or on the fund's website.

Alternatively, you can see your super contributions through myGov once you have linked your ATO account. The ATO receives super contribution data from funds and displays it against your record.

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
    date: '2 December 2024',
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

Applications are made through the ATO's online DASP application system. You will need your TFN, your super fund details including the fund's name and your member number, your visa grant and expiry information, and a bank account in your home country or any country where you can receive an international transfer.

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
    date: '16 December 2024',
    readTime: 6,
    ctaHeading: 'Let us handle your DASP application',
    ctaBody: 'We manage DASP applications for working holiday makers every day. Get in touch and we will take care of the whole process so you get your super back without the hassle.',
    ctaLabel: 'Claim your super with us',
    ctaHref: '/superannuation',
    body: `
Applying for your superannuation back through the DASP process involves a few steps, but it is entirely manageable once you know what is needed. Here is how to go through it from start to finish.

## Step one: Find all your super funds

Before you apply, you need to know which fund or funds hold your super. If you worked for multiple employers, you may have contributions spread across different funds. Log in to myGov and check the ATO section for a summary of your super accounts. This will show you all funds that have received contributions in your name.

If you find multiple accounts, you can either apply for each one separately through DASP or consolidate them into a single fund before applying. Consolidating first simplifies the process because you only need to submit one application.

## Step two: Gather your documents

You will need your TFN, your passport details, your visa grant and expiry dates, your super fund name and member number, and a bank account in the country where you want the funds to be paid. The account does not need to be an Australian account. International transfers are standard for DASP payments.

## Step three: Submit your application

Applications are made through the DASP online application system on the ATO website. Work through the form, entering your personal details, visa information, and super fund details. If you are applying for multiple funds, you will complete a separate application for each one.

Once submitted, you will receive a reference number. The ATO sends your application to your super fund, which then verifies the details and processes the payment. This typically takes up to 28 days.

## Step four: Receive your payment

Once processed, the super fund pays the amount directly to the bank account you nominated, after deducting the applicable withholding tax. The withholding tax rate for working holiday makers is currently 65% of the taxable component. See our guide on [tax on super withdrawals](/guides/tax-on-super-withdrawal-backpacker) for a full breakdown of how this is calculated.

## What if you cannot find some of your super

If you believe super was paid on your behalf but you cannot locate the fund, use the ATO's lost super search tool through myGov or contact the ATO directly. See our guide on [finding lost superannuation](/guides/how-to-find-lost-superannuation) for more on this.
    `,
  },
  {
    slug: 'how-long-does-dasp-take',
    title: 'How long does a DASP application take to process?',
    description: 'Most DASP applications are processed within 28 days. Here is what affects the timeline and what to do if yours is taking longer.',
    category: 'Super',
    date: '30 December 2024',
    readTime: 4,
    ctaHeading: 'Want us to manage your DASP application?',
    ctaBody: 'We handle DASP applications for working holiday makers and keep track of the process so you do not have to. Get in touch and we will take it from here.',
    ctaLabel: 'Get started',
    ctaHref: '/superannuation',
    body: `
Most DASP applications are processed and paid within 28 days of submission. In many cases, the process is faster, particularly if your details are straightforward and your super fund has all the information they need to verify your identity and membership.

## What happens after you submit

Once you submit your DASP application through the ATO's online system, the ATO verifies your visa and residency information and then forwards the application to your super fund. The fund then processes it from their end, verifying your membership details and calculating the payable amount. Once both sides have completed their checks, the payment is released to the bank account you nominated.

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
    date: '13 January 2025',
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
    date: '27 January 2025',
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

Log in to myGov and check the ATO section. Any super that has been transferred to the ATO will appear there. You can also use the ATO's lost super search tool to find balances held both in funds and by the ATO against your TFN.

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
    date: '10 February 2025',
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
    date: '24 February 2025',
    readTime: 4,
    ctaHeading: 'Need help tracking down your super?',
    ctaBody: 'We help working holiday makers find and claim all their superannuation from funds and the ATO. Get in touch and we will help you locate everything.',
    ctaLabel: 'Find your super',
    ctaHref: '/superannuation',
    body: `
It is surprisingly easy for working holiday makers to accumulate super across multiple funds without realising it. Every time you start a new job, if you do not nominate an existing super fund, your employer may create a new account for you with their default fund. Over the course of a year working multiple jobs, this can result in several small balances spread across different funds.

## Using myGov to find your super

The most reliable way to find all your super accounts is to log in to myGov and check the ATO section. The ATO has visibility over all super fund accounts linked to your TFN. You will see a list of accounts and their approximate balances. Any super that has been transferred to the ATO as unclaimed super will also appear here.

## Using the ATO's lost super search tool

If you cannot access myGov or want to supplement it, the ATO also has a lost super search tool accessible through their website. You will need your TFN and some personal details to use it. The tool searches across all registered funds and the ATO's own holdings.

## Consolidating multiple accounts

If you find super spread across multiple funds, you can consolidate it into a single account before applying for DASP. This simplifies the withdrawal process because you only need to submit one application. Consolidation is done through myGov by selecting which accounts to transfer into your chosen fund.

Be aware that consolidating closes the other accounts. Make sure there are no insurance or other benefits attached to those accounts that you would lose by closing them. For most working holiday makers, the accounts are straightforward accumulation accounts without additional features.

## What if you cannot find the fund's contact details

Every super fund registered in Australia can be found through the ATO's super fund lookup tool or through the APRA register of superannuation funds. If you know the fund name but need their contact details, these tools will help you locate them.
    `,
  },
  {
    slug: 'how-to-choose-super-fund',
    title: 'What is a superannuation fund and how do you choose one?',
    description: 'When you start a job in Australia, you can nominate where your super goes. Here is what a super fund is and how to choose one as a working holiday maker.',
    category: 'Super',
    date: '10 March 2025',
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
    date: '1 July 2024',
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
    date: '15 July 2024',
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
    date: '29 July 2024',
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
    date: '12 August 2024',
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
    date: '26 August 2024',
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
    date: '9 September 2024',
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
    date: '23 September 2024',
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
    date: '7 October 2024',
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
    date: '21 October 2024',
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

At the end of the financial year, all income from all employers is combined in your [tax return](/tax-return). The ATO receives income reports from each employer and all of them will appear in your myGov account. Make sure you review all of them before lodging.

## Superannuation from multiple employers

Each employer who pays you wages is separately required to make [superannuation](/superannuation) contributions on your behalf. This means you may accumulate super across multiple funds. When you are ready to leave Australia, you can consolidate these funds before applying for DASP or apply for each separately.
    `,
  },
  {
    slug: 'full-time-part-time-casual-australia',
    title: 'What is the difference between full time, part time, and casual work in Australia?',
    description: 'Your employment classification affects your pay rate, your leave entitlements, and your tax. Here is what each one means.',
    category: 'Work Rights',
    date: '4 November 2024',
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
    date: '18 November 2024',
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

When you lodge your [tax return](/tax-return) in Australia, there is a section about the Medicare levy, which is a 2% levy applied to taxable income to fund the Medicare system. Working holiday makers who are not eligible for Medicare are entitled to claim an exemption from this levy. This is done by completing a Medicare Levy Exemption Certification through the ATO before lodging your return. Not claiming this exemption when you are entitled to it means paying a levy for a service you cannot access.

For more on which countries have an RHCA with Australia, see our guide on [Medicare agreements with Australia](/guides/countries-with-medicare-agreement-australia).
    `,
  },
  {
    slug: 'countries-with-medicare-agreement-australia',
    title: 'Which countries have a Medicare agreement with Australia?',
    description: 'Australia has Reciprocal Health Care Agreements with several countries, giving their citizens access to some Medicare benefits. Here is the full list.',
    category: 'Medicare & Other',
    date: '2 December 2024',
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
    date: '16 December 2024',
    readTime: 4,
    ctaHeading: 'Make sure your tax return includes the Medicare levy exemption.',
    ctaBody: 'We handle tax returns for working holiday makers and make sure all entitlements, including the Medicare levy exemption, are correctly applied.',
    ctaLabel: 'Start your tax return',
    ctaHref: '/tax-return',
    body: `
The Medicare levy is a 2% tax applied to the taxable income of Australian residents to help fund the Medicare healthcare system. It is collected alongside income tax and appears as a separate line on your tax assessment. For most Australian residents, it is simply part of their tax obligation and they do not need to think about it separately.

For working holiday makers, the situation is different. If you are not eligible for Medicare, which is the case for most working holiday visa holders whose home country does not have a Reciprocal Health Care Agreement with Australia, you are entitled to an exemption from the Medicare levy. Paying it when you are not entitled to Medicare would mean contributing to a service you cannot access.

## How to claim the Medicare levy exemption

The exemption is not automatic. You need to apply for a Medicare Levy Exemption Certification through the ATO before you can claim it on your tax return. The certification confirms your visa status and your ineligibility for Medicare. Once you have it, you include it with your tax return lodgment and the 2% levy is not applied to your income.

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
    date: '30 December 2024',
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

Your employer should provide you with the form when you start work. If they do not, you can download it from the ATO website. Once completed, you give it to your employer rather than sending it to the ATO yourself. Your employer keeps it on file and uses the information to set up your payroll correctly.

## What if you change jobs

You need to complete a new Tax File Number Declaration form for every employer you work for. Your TFN does not transfer from one employer to another automatically. Give a new form to each employer from day one.
    `,
  },
  {
    slug: 'what-does-tax-withheld-mean-payslip',
    title: 'What does tax withheld mean on your payslip in Australia?',
    description: 'Tax withheld is the income tax your employer deducts from your wages before paying you. Here is how to check it is correct.',
    category: 'Medicare & Other',
    date: '13 January 2025',
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

Your employer collects the tax withheld amounts from each pay and remits them to the ATO periodically. At the end of the financial year, your employer finalises their payroll reporting and reports the total wages paid to you and the total tax withheld. This appears as your income statement in myGov. When you lodge your [tax return](/tax-return), the ATO calculates your actual tax liability and refunds any excess withholding, or collects any shortfall.

## Keep your payslips

Keep copies of your payslips throughout the year. They are useful for checking your income statement figures at tax time and for resolving any discrepancies between what you were paid and what the ATO has on record.
    `,
  },
  {
    slug: 'what-is-an-income-statement',
    title: 'What is an income statement in Australia and how do you access yours?',
    description: 'An income statement shows your total wages and tax withheld for the year. Here is how to find yours and what to do with it.',
    category: 'Medicare & Other',
    date: '27 January 2025',
    readTime: 3,
    ctaHeading: 'Ready to lodge your tax return?',
    ctaBody: 'We handle the entire tax return process for working holiday makers, including checking your income statements are correct. Get in touch and we will sort it out.',
    ctaLabel: 'Start your tax return',
    ctaHref: '/tax-return',
    body: `
An income statement is the digital record that shows the total wages your employer paid you during a financial year and the total amount of tax withheld. It has replaced the old paper PAYG payment summary. Your employer submits this information directly to the ATO through their payroll system, and it then appears in your myGov account linked to the ATO.

## How to access your income statement

Log in to myGov and open the ATO service. Navigate to the income and employment section, then income statements. You will see a record for each employer who paid you during the financial year. Each record will show a status of either in progress, meaning your employer has not yet finalised the data, or tax ready, meaning the data is finalised and accurate.

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
    date: '10 February 2025',
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

The ATO may contact you if they need additional information to process your tax return, if they identify a discrepancy between what you have reported and what your employer has reported, or if they are conducting a review or audit of your return. All communications from the ATO are either through myGov messages or by post to your registered address. The ATO will never contact you by phone demanding immediate payment or threatening arrest. If you receive a call like that, it is a scam.

## How to contact the ATO

You can contact the ATO by phone on 13 28 61 for general tax enquiries, or through your myGov account for written queries. If you are overseas, you can also contact them through the ATO's international call number.
    `,
  },
  {
    slug: 'gross-pay-vs-net-pay-australia',
    title: 'What is the difference between gross pay and net pay in Australia?',
    description: 'Gross pay is what you earn before deductions. Net pay is what you actually receive. Here is how the two relate to your tax situation.',
    category: 'Medicare & Other',
    date: '24 February 2025',
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
    date: '10 March 2025',
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
    date: '24 March 2025',
    readTime: 4,
    ctaHeading: 'Leaving or already left Australia?',
    ctaBody: 'We help working holiday makers wrap up their Australian tax obligations from anywhere in the world. Tax returns, super claims, and everything in between.',
    ctaLabel: 'Get everything sorted',
    ctaHref: '/contact',
    body: `
Leaving Australia does not end your Australian tax obligations. If you earned income during an Australian financial year, you are required to lodge a tax return for that year regardless of whether you are still in the country. There are also super and administrative obligations worth being aware of before and after you leave.

## Lodging your tax return from overseas

Your [tax return](/tax-return) can be lodged online from anywhere in the world, either through myGov or through a registered tax agent. The deadline is 31 October following the end of the financial year in which you earned the income. If you use a registered tax agent, you may qualify for an extended deadline.

Do not assume that because you have left Australia you no longer need to file. The ATO has your income records from your employers and will be expecting a return. Failing to lodge when required can result in penalties.

## Claiming your superannuation

If superannuation contributions were made on your behalf during your time in Australia, you can apply for them back through the DASP process once your visa has expired and you have left the country. This can be done from overseas and does not require you to return to Australia. See our detailed guide on [how to apply for DASP](/guides/how-to-apply-for-super-back) for the full process.

## Cancelling your ABN

If you registered for an [ABN](/abn) during your time in Australia, cancel it through the Australian Business Register website once you are no longer carrying on business activities. This is a simple process and keeps the records accurate.

## Keeping access to myGov

If possible, keep your myGov account active and accessible after you leave. It is where your income statements appear and where you can track the progress of any DASP application. Make sure the email address linked to your account is one you will continue to access after departing.

## Updating your address with the ATO

If you have a registered address with the ATO in Australia, consider updating it to an overseas address so any correspondence reaches you. This can be done through myGov or by contacting the ATO directly.
    `,
  },
  {
    slug: 'tax-residency-working-holiday-makers',
    title: 'Are working holiday makers tax residents of Australia?',
    description: 'Your tax residency status affects which tax rates apply to you. Most working holiday makers are non-residents for tax purposes, but the rules have nuances worth understanding.',
    category: 'Tax Return',
    date: '15 April 2025',
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
